import { randomUUID } from "node:crypto";
import { prisma } from "../../db/prisma.js";
import type { Prisma } from "../../generated/prisma/index.js";
import {
  INTEGRITY_INFO_EVENTS,
  INTEGRITY_LEAVE_EVENTS,
  INTEGRITY_LIMITS,
  PROCTORED_RULE,
  countLeaveIncidents,
  type IntegrityAttemptSession,
  type IntegrityCameraStatus,
  type IntegrityEventInput,
  type IntegrityEventsResult,
} from "../../shared/api/integrity.js";
import type { SessionUser } from "../../types/auth.js";
import { BadRequestError, ForbiddenError, NotFoundError, TooManyRequestsError } from "../../utils/errors.js";
import { requireBlockSubmissionAccess } from "../enrollment/api-learn-access.js";
import { requireCourseById } from "../teach/access.js";
import { cameraPhotosAvailable, snapshotStore, SNAPSHOT_PREFIX } from "./snapshot-store.js";

// The learner's side of quiz integrity. Every call here is best effort from the
// browser's point of view: a failure must never stop the quiz, so the client
// ignores errors and the server keeps each write small and idempotent.

const FLAG_TYPES = { notIn: [...INTEGRITY_INFO_EVENTS] };
/** Browser clocks drift and events are buffered offline, so `at` is clamped to the attempt. */
const CLOCK_SLACK_MS = 2 * 60 * 1000;

async function countFlags(attemptId: string): Promise<number> {
  return prisma.integrityEvent.count({ where: { attemptId, type: FLAG_TYPES } });
}

/**
 * Separate times the learner left the quiz screen since they pressed Start. Time spent
 * on the start card is not part of the attempt, and the server's own receive time is
 * used (browser clocks drift).
 */
async function countLeaves(attemptId: string, since: Date | null, db: Pick<typeof prisma, "integrityEvent"> = prisma): Promise<number> {
  if (!since) return 0;
  const events = await db.integrityEvent.findMany({
    where: { attemptId, type: { in: [...INTEGRITY_LEAVE_EVENTS] }, receivedAt: { gte: since } },
    select: { type: true, at: true },
  });
  return countLeaveIncidents(events);
}

/**
 * The attempt a learner is on now: 1 + their highest multiple-choice attempt in the
 * chapter. Only quiz answers count, so submitting an open question or code exercise
 * in the same chapter does not start a new proctored attempt.
 */
async function currentAttemptNumber(enrollmentId: string, chapterId: string): Promise<number> {
  const submitted = await prisma.response.aggregate({
    _max: { attempt: true },
    where: { enrollmentId, status: { not: "DRAFT" }, block: { chapterId, type: "QUIZ" } },
  });
  return (submitted._max.attempt ?? 0) + 1;
}

export type QuizAttemptGate = {
  /** The learner pressed Start on the attempt they are on. */
  started: boolean;
  /** That attempt reached PROCTORED_RULE.limit. */
  locked: boolean;
  /** The chapter is finished, so its questions can be reviewed without a new attempt. */
  completed: boolean;
};

/** Where a learner stands with a proctored quiz chapter: the attempt they are on, and whether the chapter is done. */
export async function quizAttemptGate(enrollmentId: string, chapterId: string): Promise<QuizAttemptGate> {
  const attemptNumber = await currentAttemptNumber(enrollmentId, chapterId);
  const [attempt, progress] = await Promise.all([
    prisma.integrityAttempt.findUnique({
      where: { enrollmentId_chapterId_attempt: { enrollmentId, chapterId, attempt: attemptNumber } },
      select: { questionsShownAt: true, lockedAt: true },
    }),
    prisma.chapterProgress.findUnique({
      where: { enrollmentId_chapterId: { enrollmentId, chapterId } },
      select: { completedAt: true },
    }),
  ]);
  return { started: Boolean(attempt?.questionsShownAt), locked: Boolean(attempt?.lockedAt), completed: Boolean(progress?.completedAt) };
}

/**
 * Whether a proctored quiz chapter's questions may be sent to this learner now: they
 * pressed Start on this attempt and it is not locked, or the chapter is finished.
 * A normal quiz is never gated, so callers pass the chapter's own `proctored` flag.
 */
export async function quizQuestionsVisible(enrollmentId: string, chapter: { id: string; proctored: boolean }): Promise<boolean> {
  if (!chapter.proctored) return true;
  const gate = await quizAttemptGate(enrollmentId, chapter.id);
  return gate.completed || (gate.started && !gate.locked);
}

/**
 * The server-side door for a proctored quiz's questions. Enrolled learners need the
 * gate above; someone without an enrollment must be on the course team (a mentor
 * checking their course). Everyone else, signed out included, gets nothing.
 */
export async function assertProctoredQuestionsVisible(
  user: SessionUser | undefined,
  chapter: { id: string; courseId: string },
  enrollmentId: string | null,
): Promise<void> {
  if (!user) throw new ForbiddenError("Sign in and start the quiz to see its questions.", "QUIZ_NOT_STARTED");
  if (enrollmentId) {
    if (await quizQuestionsVisible(enrollmentId, { id: chapter.id, proctored: true })) return;
    throw new ForbiddenError("Start the quiz to see its questions.", "QUIZ_NOT_STARTED");
  }
  try {
    await requireCourseById(user, chapter.courseId, "SUBMISSION_EVALUATOR");
  } catch {
    throw new ForbiddenError("Enroll and start the quiz to see its questions.", "QUIZ_NOT_STARTED");
  }
}

/** Opens (or resumes, after a reload or power cut) the proctored attempt for a quiz chapter. */
export async function openIntegrityAttempt(user: SessionUser | undefined, chapterId: string): Promise<IntegrityAttemptSession> {
  const chapter = await prisma.chapter.findUnique({
    where: { id: chapterId, archivedAt: null },
    select: { id: true, courseId: true, readerMode: true, proctored: true, course: { select: { integritySnapshots: true } } },
  });
  if (!chapter || chapter.readerMode !== "QUIZ") throw new NotFoundError("Quiz chapter not found");
  const proctored = chapter.proctored;
  const enrollment = await requireBlockSubmissionAccess(chapter.courseId, user);

  const attemptNumber = await currentAttemptNumber(enrollment.id, chapterId);
  const cameraEnabled = chapter.course.integritySnapshots && cameraPhotosAvailable();

  const attempt = await prisma.integrityAttempt.upsert({
    where: { enrollmentId_chapterId_attempt: { enrollmentId: enrollment.id, chapterId, attempt: attemptNumber } },
    create: { enrollmentId: enrollment.id, chapterId, attempt: attemptNumber },
    update: { lastSeenAt: new Date() },
    select: { id: true, attempt: true, cameraStatus: true, startedAt: true, questionsShownAt: true, lockedAt: true },
  });
  const completed = proctored
    ? Boolean((await prisma.chapterProgress.findUnique({
        where: { enrollmentId_chapterId: { enrollmentId: enrollment.id, chapterId } },
        select: { completedAt: true },
      }))?.completedAt)
    : true;
  const leaves = proctored ? await countLeaves(attempt.id, attempt.questionsShownAt) : 0;

  return {
    attemptId: attempt.id,
    attempt: attempt.attempt,
    startedAt: attempt.startedAt.toISOString(),
    proctored,
    questionsShown: !proctored || completed || (Boolean(attempt.questionsShownAt) && !attempt.lockedAt),
    leaves,
    locked: Boolean(attempt.lockedAt),
    flagCount: await countFlags(attempt.id),
    camera: {
      enabled: cameraEnabled,
      status: attempt.cameraStatus,
      intervalSeconds: INTEGRITY_LIMITS.snapshotIntervalSeconds,
      width: INTEGRITY_LIMITS.snapshotWidth,
      height: INTEGRITY_LIMITS.snapshotHeight,
      retentionDays: INTEGRITY_LIMITS.retentionDays,
    },
  };
}

async function requireOwnAttempt(user: SessionUser | undefined, attemptId: string) {
  if (!user) throw new ForbiddenError("Sign in to continue.");
  const attempt = await prisma.integrityAttempt.findUnique({
    where: { id: attemptId },
    select: {
      id: true,
      startedAt: true,
      cameraStatus: true,
      lockedAt: true,
      questionsShownAt: true,
      chapter: { select: { proctored: true } },
      enrollment: { select: { userId: true, course: { select: { integritySnapshots: true } } } },
    },
  });
  if (!attempt || attempt.enrollment.userId !== user.id) throw new NotFoundError("Quiz attempt not found");
  return attempt;
}

/** The learner pressed Start: from now on this chapter's questions are sent. Calling it again changes nothing. */
export async function beginIntegrityAttempt(user: SessionUser | undefined, attemptId: string): Promise<{ questionsShown: boolean }> {
  const attempt = await requireOwnAttempt(user, attemptId);
  // A locked attempt stays locked: pressing Start again must not hand its questions back.
  if (attempt.lockedAt) return { questionsShown: false };
  await prisma.integrityAttempt.updateMany({ where: { id: attempt.id, questionsShownAt: null }, data: { questionsShownAt: new Date() } });
  return { questionsShown: true };
}

function clampTime(value: string, earliest: Date, now: Date): Date {
  const at = new Date(value);
  if (Number.isNaN(at.getTime())) return now;
  if (at.getTime() < earliest.getTime() - CLOCK_SLACK_MS || at.getTime() > now.getTime() + CLOCK_SLACK_MS) return now;
  return at;
}

/**
 * Appends a batch of events. Rows are inserted, never rewritten, so concurrent
 * flushes cannot lose each other's events. The attempt row is locked while the
 * cap is checked, and `clientId` makes a retried batch a no-op.
 */
export async function recordIntegrityEvents(
  user: SessionUser | undefined,
  attemptId: string,
  events: IntegrityEventInput[],
): Promise<IntegrityEventsResult> {
  const attempt = await requireOwnAttempt(user, attemptId);
  const now = new Date();

  const proctored = attempt.chapter.proctored;
  let lockedAt = attempt.lockedAt;
  let leaves = 0;

  const accepted = await prisma.$transaction(async (tx) => {
    const [locked] = await tx.$queryRaw<Array<{ eventCount: number }>>`
      SELECT "eventCount" FROM "IntegrityAttempt" WHERE id = ${attemptId} FOR UPDATE`;
    const room = Math.max(0, INTEGRITY_LIMITS.eventsPerAttempt - (locked?.eventCount ?? 0));
    // A second screen is a state, not an action: one row per attempt, whatever the browser sends.
    let hasSecondScreen = events.some((event) => event.type === "SECOND_SCREEN")
      && (await tx.integrityEvent.count({ where: { attemptId, type: "SECOND_SCREEN" } })) > 0;
    const deduped = events.filter((event) => {
      if (event.type !== "SECOND_SCREEN") return true;
      if (hasSecondScreen) return false;
      hasSecondScreen = true;
      return true;
    });
    const kept = deduped.slice(0, room);
    const created = kept.length
      ? await tx.integrityEvent.createMany({
          data: kept.map((event) => ({
            attemptId,
            clientId: event.id,
            type: event.type,
            at: clampTime(event.at, attempt.startedAt, now),
            blockId: event.blockId ?? null,
            meta: (event.meta ?? undefined) as Prisma.InputJsonValue | undefined,
          })),
          skipDuplicates: true,
        })
      : { count: 0 };
    await tx.integrityAttempt.update({
      where: { id: attemptId },
      data: {
        eventCount: { increment: created.count },
        droppedEvents: { increment: deduped.length - kept.length },
        lastSeenAt: now,
      },
    });
    // The one rule for a proctored quiz: the server counts the times the learner left the quiz
    // screen and locks the attempt at the limit. The browser only shows warnings.
    if (proctored && attempt.questionsShownAt) {
      leaves = await countLeaves(attemptId, attempt.questionsShownAt, tx);
      if (!lockedAt && leaves >= PROCTORED_RULE.limit) {
        lockedAt = now;
        await tx.integrityAttempt.update({ where: { id: attemptId }, data: { lockedAt } });
      }
    }
    return created.count;
  });

  return { accepted, flagCount: await countFlags(attemptId), leaves, locked: Boolean(lockedAt) };
}

/** Records the learner's camera choice. Ignored when the course has snapshots off. */
export async function setIntegrityCamera(
  user: SessionUser | undefined,
  attemptId: string,
  status: Exclude<IntegrityCameraStatus, "NOT_REQUESTED">,
): Promise<{ status: IntegrityCameraStatus }> {
  const attempt = await requireOwnAttempt(user, attemptId);
  if (!attempt.enrollment.course.integritySnapshots) return { status: "NOT_REQUESTED" };
  const updated = await prisma.integrityAttempt.update({
    where: { id: attemptId },
    data: { cameraStatus: status, lastSeenAt: new Date() },
    select: { cameraStatus: true },
  });
  return { status: updated.cameraStatus };
}

function isJpeg(bytes: Buffer): boolean {
  return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
}

/** Stores one low-resolution camera still in private storage. */
export async function saveIntegritySnapshot(
  user: SessionUser | undefined,
  attemptId: string,
  bytes: Buffer,
): Promise<{ id: string; takenAt: string }> {
  const attempt = await requireOwnAttempt(user, attemptId);
  if (!attempt.enrollment.course.integritySnapshots || !cameraPhotosAvailable()) {
    throw new ForbiddenError("Camera snapshots are off for this course.", "SNAPSHOTS_DISABLED");
  }
  if (attempt.cameraStatus !== "ON") throw new ForbiddenError("Turn the camera on first.", "CAMERA_NOT_ON");
  if (!bytes.length || bytes.length > INTEGRITY_LIMITS.snapshotMaxBytes || !isJpeg(bytes)) {
    throw new BadRequestError("Send one small JPEG image.", "INVALID_SNAPSHOT");
  }

  const latest = await prisma.integritySnapshot.findFirst({
    where: { attemptId },
    orderBy: { takenAt: "desc" },
    select: { takenAt: true },
  });
  const tooSoon = latest && Date.now() - latest.takenAt.getTime() < INTEGRITY_LIMITS.snapshotMinGapSeconds * 1000;
  const count = await prisma.integritySnapshot.count({ where: { attemptId } });
  if (tooSoon || count >= INTEGRITY_LIMITS.snapshotsPerAttempt) {
    throw new TooManyRequestsError("Snapshot skipped. The next one is due later.");
  }

  const takenAt = new Date();
  const key = `${SNAPSHOT_PREFIX}${takenAt.toISOString().slice(0, 10)}/${attemptId}/${randomUUID().replaceAll("-", "")}.jpg`;
  await snapshotStore().put(key, bytes);
  const [snapshot] = await prisma.$transaction([
    prisma.integritySnapshot.create({ data: { attemptId, storageKey: key, bytes: bytes.length, takenAt }, select: { id: true } }),
    prisma.integrityAttempt.update({ where: { id: attemptId }, data: { snapshotCount: { increment: 1 }, lastSeenAt: takenAt } }),
  ]);
  return { id: snapshot.id, takenAt: takenAt.toISOString() };
}
