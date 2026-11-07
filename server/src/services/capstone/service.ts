import type { Prisma, CapstoneCheck } from "../../generated/prisma/index.js";
import { capstoneCheckAvailable, env } from "../../config/env.js";
import { prisma } from "../../db/prisma.js";
import {
  CapstoneCheckConfigSchema,
  CapstoneSubmitSchema,
  type CapstoneCheckPayload,
} from "../../shared/blocks/capstone-check/schema.js";
import type {
  AutomatedCheckResult,
  CapstoneCheckState,
  CapstoneCheckView,
  CapstoneMentorView,
  CapstoneReport,
} from "../../shared/blocks/capstone-check/report.js";
import { blockDefinitions } from "../../shared/blocks/definitions.js";
import type { SessionUser } from "../../types/auth.js";
import { AppError, BadRequestError, ConflictError, NotFoundError } from "../../utils/errors.js";
import { logger } from "../../utils/logger.js";
import { loadBlockForSubmission } from "../blocks/access.js";
import { assertEnrollmentChapter } from "../courses/releases.js";
import { notifyMentorPendingReview } from "../notifications/events.js";
import { dispatchNotification } from "../notifications/service.js";
import { adjustEnrollmentPendingReviews, lockEnrollmentVariant, recomputeChapterProgress, recordBlockStats } from "../progress/compute.js";
import { runAutomatedChecks } from "./automated.js";
import { GitHubApiError, githubRepoSource, parseRepoUrl, type CapstoneRepoSource } from "./github.js";
import { anthropicGrader, costMicroUsd, GraderError, recomputeReport, type GraderModel } from "./grade.js";
import { gradeWithModel } from "./run-grade.js";
import { assertLearnerMayCheck, remainingChecksToday, reserveModelCall, STALE_CHECK_MESSAGE, STALE_CHECK_MS } from "./limits.js";
import { fetchPublicPage, type PublicPage } from "./safe-fetch.js";

// The capstone check pipeline (docs/16-capstone-checker-and-certificates.mdx):
//   start -> QUEUED -> RUNNING -> automated checks -> (stop, reuse, or AI grade) -> DONE | FAILED
// A DONE check reaches the mentor queue as a PENDING_REVIEW Response when the AI says it
// is complete, or when the learner asks. The AI never approves; the mentor's Review does.

export type CapstoneDeps = {
  source?: CapstoneRepoSource;
  fetchPage?: (url: string) => Promise<PublicPage>;
  grader?: GraderModel;
  /** Tests run the pipeline inline instead of after the response. */
  inline?: boolean;
};

const unavailable = (message: string, code: string) => new AppError(message, 503, code);

async function loadCapstoneBlock(blockId: string, user: SessionUser | undefined) {
  const { block, enrollment, learner } = await loadBlockForSubmission(blockId, user, (found) => {
    if (found.type !== "CAPSTONE_CHECK") throw new NotFoundError("Block not found");
  });
  const config = CapstoneCheckConfigSchema.safeParse(block.config);
  if (!config.success) throw unavailable("This capstone check is not set up yet.", "CAPSTONE_UNAVAILABLE");
  return { block, enrollment, learner, config: config.data };
}

/** The learner's view never carries integrity flags; those are for the mentor. */
function learnerReport(report: CapstoneReport | null): CapstoneReport | null {
  if (!report) return null;
  const { integrityFlags: _flags, ...rest } = report;
  return rest;
}

function toView(check: CapstoneCheck): CapstoneCheckView {
  return {
    id: check.id,
    attempt: check.attempt,
    status: check.status,
    repoUrl: check.repoUrl,
    liveUrl: check.liveUrl,
    commitSha: check.commitSha,
    createdAt: check.createdAt.toISOString(),
    finishedAt: check.finishedAt?.toISOString() ?? null,
    automated: (check.automated as AutomatedCheckResult[] | null) ?? [],
    report: learnerReport((check.report as CapstoneReport | null) ?? null),
    error: check.error,
    sentToMentor: check.responseId !== null,
    reused: check.reusedFromId !== null,
  };
}

export function toMentorView(check: CapstoneCheck): CapstoneMentorView {
  return {
    ...toView(check),
    report: (check.report as CapstoneReport | null) ?? null,
    model: check.model,
    inputTokens: check.inputTokens,
    outputTokens: check.outputTokens,
    costUsd: check.costMicroUsd / 1_000_000,
    packId: check.packId,
    packVersion: check.packVersion,
  };
}

// ---- Learner endpoints ------------------------------------------------------------

export async function loadCapstoneState(blockId: string, userId: string): Promise<CapstoneCheckState> {
  const [checks, limits, reviewed] = await Promise.all([
    prisma.capstoneCheck.findMany({ where: { blockId, userId }, orderBy: { createdAt: "desc" }, take: 20 }),
    remainingChecksToday(userId, blockId),
    prisma.response.findFirst({
      where: { blockId, userId, review: { isNot: null } },
      orderBy: { attempt: "desc" },
      select: { review: { select: { verdict: true, feedback: true, score: true, createdAt: true, reviewer: { select: { name: true } } } } },
    }),
  ]);
  const review = reviewed?.review;
  return {
    checks: checks.map(toView),
    remainingToday: limits.remaining,
    dailyLimit: limits.dailyLimit,
    available: capstoneCheckAvailable,
    decision: review
      ? { verdict: review.verdict, feedback: review.feedback, score: review.score, reviewerName: review.reviewer.name, createdAt: review.createdAt.toISOString() }
      : null,
  };
}

export async function getCapstoneState(blockId: string, user: SessionUser | undefined): Promise<CapstoneCheckState> {
  const { learner } = await loadCapstoneBlock(blockId, user);
  return loadCapstoneState(blockId, learner.id);
}

export async function startCapstoneCheck(
  input: { blockId: string; user: SessionUser | undefined; body: unknown },
  deps: CapstoneDeps = {}
): Promise<CapstoneCheckView> {
  if (!capstoneCheckAvailable && !deps.grader) {
    throw unavailable("Capstone checks are not switched on yet. Your mentor can still review your work.", "CAPSTONE_UNAVAILABLE");
  }
  const { block, enrollment, learner, config } = await loadCapstoneBlock(input.blockId, input.user);
  const parsed = CapstoneSubmitSchema.safeParse(input.body);
  if (!parsed.success) throw new BadRequestError(parsed.error.issues[0]?.message ?? "Check the links and try again.", "CAPSTONE_INVALID");
  const liveRule = config.rubric.submission.liveUrl;
  if (liveRule === "required" && !parsed.data.liveUrl) throw new BadRequestError("Add the live link to your site.", "CAPSTONE_LIVE_URL_REQUIRED");
  const liveUrl = liveRule === "none" ? null : (parsed.data.liveUrl ?? null);

  const check = await prisma.$transaction(async (tx) => {
    await assertLearnerMayCheck(tx, learner.id, block.id);
    const attempt = (await tx.capstoneCheck.count({ where: { blockId: block.id, userId: learner.id } })) + 1;
    return tx.capstoneCheck.create({
      data: {
        blockId: block.id,
        userId: learner.id,
        enrollmentId: enrollment.id,
        attempt,
        repoUrl: parsed.data.repoUrl,
        liveUrl,
        packId: config.rubric.pack,
        packVersion: config.rubric.version,
      },
    });
  });

  if (deps.inline) {
    await runCapstoneCheck(check.id, deps);
  } else {
    setImmediate(() => {
      runCapstoneCheck(check.id, deps).catch((error) => logger.error({ err: error, checkId: check.id }, "capstone check crashed"));
    });
  }
  const fresh = await prisma.capstoneCheck.findUniqueOrThrow({ where: { id: check.id } });
  return toView(fresh);
}

export async function sendCapstoneToMentor(input: { blockId: string; user: SessionUser | undefined; checkId: string }): Promise<CapstoneCheckView> {
  const { learner } = await loadCapstoneBlock(input.blockId, input.user);
  const check = await prisma.capstoneCheck.findFirst({ where: { id: input.checkId, blockId: input.blockId, userId: learner.id } });
  if (!check) throw new NotFoundError("Check not found");
  if (check.status !== "DONE" || !check.report) throw new ConflictError("Wait for the check to finish first.", "CAPSTONE_NOT_DONE");
  await queueForMentor(check.id);
  return toView(await prisma.capstoneCheck.findUniqueOrThrow({ where: { id: check.id } }));
}

// ---- Mentor queue -----------------------------------------------------------------

/**
 * Put a finished check in front of the mentor. One pending item per learner per block:
 * a newer check replaces the one already waiting, so the queue shows the latest work.
 */
export async function queueForMentor(checkId: string): Promise<void> {
  const created = await prisma.$transaction(async (tx) => {
    const check = await tx.capstoneCheck.findUniqueOrThrow({ where: { id: checkId }, include: { block: { select: { id: true, chapterId: true, config: true } } } });
    if (check.responseId) return null;
    const report = check.report as CapstoneReport;
    const payload: CapstoneCheckPayload = {
      checkId: check.id,
      repoUrl: check.repoUrl,
      liveUrl: check.liveUrl,
      commitSha: check.commitSha,
      percent: report.percent,
      completed: report.completed,
    };
    await lockEnrollmentVariant(tx, check.enrollmentId);
    await assertEnrollmentChapter(tx, check.enrollmentId, check.block.chapterId);

    const pending = await tx.response.findFirst({ where: { blockId: check.blockId, userId: check.userId, status: "PENDING_REVIEW" } });
    if (pending) {
      await tx.capstoneCheck.updateMany({ where: { responseId: pending.id }, data: { responseId: null } });
      await tx.response.update({
        where: { id: pending.id },
        data: { payload: payload as unknown as Prisma.InputJsonValue, score: report.percent, maxScore: 100, submittedAt: new Date() },
      });
      await tx.capstoneCheck.update({ where: { id: check.id }, data: { responseId: pending.id } });
      return null;
    }

    const config = CapstoneCheckConfigSchema.parse(check.block.config);
    const graded = blockDefinitions.CAPSTONE_CHECK.grade(config, payload);
    const attempt = (await tx.response.count({ where: { blockId: check.blockId, userId: check.userId } })) + 1;
    const response = await tx.response.create({
      data: {
        blockId: check.blockId,
        userId: check.userId,
        enrollmentId: check.enrollmentId,
        attempt,
        status: graded.status,
        payload: payload as unknown as Prisma.InputJsonValue,
        score: graded.score,
        maxScore: graded.maxScore,
        isCorrect: graded.isCorrect,
      },
    });
    await tx.capstoneCheck.update({ where: { id: check.id }, data: { responseId: response.id } });
    await recordBlockStats(tx, { blockId: check.blockId, status: graded.status, isCorrect: graded.isCorrect });
    await adjustEnrollmentPendingReviews(tx, check.enrollmentId, 1);
    await recomputeChapterProgress(tx, check.enrollmentId, check.block.chapterId);
    return response.id;
  });
  if (created) await dispatchNotification(() => notifyMentorPendingReview(created));
}

// ---- Pipeline ---------------------------------------------------------------------

/** A complete check, or one with an integrity flag, goes to the mentor without waiting for the learner. */
const needsMentor = (report: CapstoneReport) => report.completed || (report.integrityFlags?.length ?? 0) > 0;

function defaultGrader(): GraderModel {
  return anthropicGrader({
    apiKey: env.ANTHROPIC_API_KEY!,
    model: env.CAPSTONE_MODEL,
    maxOutputTokens: env.CAPSTONE_MAX_OUTPUT_TOKENS,
    effort: env.CAPSTONE_EFFORT,
  });
}

const sameAutomated = (a: AutomatedCheckResult[], b: AutomatedCheckResult[]) =>
  a.length === b.length && a.every((item, index) => item.id === b[index]!.id && item.status === b[index]!.status);

const FAILURE_MESSAGES: Record<GraderError["code"], string> = {
  REFUSED: "The AI grader could not grade this one. Send it to your mentor and they will review it by hand.",
  TRUNCATED: "The AI grader ran out of room on this repo. Try again, or send it to your mentor.",
  BAD_OUTPUT: "The AI grader gave an answer we could not read. Try again in a few minutes.",
  UNAVAILABLE: "The AI grader is not available right now. Try again later.",
};

export async function runCapstoneCheck(checkId: string, deps: CapstoneDeps = {}): Promise<void> {
  const claimed = await prisma.capstoneCheck.updateMany({ where: { id: checkId, status: "QUEUED" }, data: { status: "RUNNING", startedAt: new Date() } });
  if (claimed.count !== 1) return;
  const check = await prisma.capstoneCheck.findUniqueOrThrow({ where: { id: checkId }, include: { block: { select: { config: true } } } });
  const config = CapstoneCheckConfigSchema.parse(check.block.config);
  const source = deps.source ?? githubRepoSource({ token: env.GITHUB_TOKEN });
  const fetchPage = deps.fetchPage ?? ((url: string) => fetchPublicPage(url));
  const finish = (data: Prisma.CapstoneCheckUpdateInput) =>
    prisma.capstoneCheck.update({ where: { id: checkId }, data: { finishedAt: new Date(), ...data } });

  let automated: AutomatedCheckResult[] = [];
  try {
    const ref = parseRepoUrl(check.repoUrl);
    if (!ref) throw new BadRequestError("That is not a GitHub repo link.");
    const run = await runAutomatedChecks(config.rubric, { ref, liveUrl: check.liveUrl }, { source, fetchPage });
    automated = run.results;
    const commitSha = run.repo?.commitSha ?? null;

    if (run.stopped || !run.repo) {
      const report = recomputeReport(config.rubric, automated, null);
      await finish({ status: "DONE", commitSha, automated: automated as unknown as Prisma.InputJsonValue, report: report as unknown as Prisma.InputJsonValue, percent: report.percent, completed: report.completed });
      return;
    }

    const previous = await prisma.capstoneCheck.findFirst({
      where: { id: { not: checkId }, blockId: check.blockId, userId: check.userId, commitSha, packId: check.packId, packVersion: check.packVersion, status: "DONE", OR: [{ aiCalled: true }, { reusedFromId: { not: null } }] },
      orderBy: { createdAt: "desc" },
    });
    if (previous?.report && sameAutomated((previous.automated as AutomatedCheckResult[]) ?? [], automated)) {
      const report = previous.report as unknown as CapstoneReport;
      await finish({ status: "DONE", commitSha, automated: automated as unknown as Prisma.InputJsonValue, report: report as unknown as Prisma.InputJsonValue, percent: report.percent, completed: report.completed, reusedFromId: previous.reusedFromId ?? previous.id, model: previous.model });
      if (needsMentor(report)) await queueForMentor(checkId);
      return;
    }

    if (!(await reserveModelCall(checkId))) {
      await finish({ status: "FAILED", commitSha, automated: automated as unknown as Prisma.InputJsonValue, error: "AI checks are paused for today. Your automated results are saved. Try again tomorrow." });
      return;
    }

    const grader = deps.grader ?? defaultGrader();
    const { call, report } = await gradeWithModel({ config, repoUrl: check.repoUrl, liveUrl: check.liveUrl, automatedRun: run, source, grader, maxInputTokens: env.CAPSTONE_MAX_INPUT_TOKENS });
    await finish({
      status: "DONE",
      commitSha,
      automated: automated as unknown as Prisma.InputJsonValue,
      report: report as unknown as Prisma.InputJsonValue,
      percent: report.percent,
      completed: report.completed,
      model: call.model,
      inputTokens: call.inputTokens,
      outputTokens: call.outputTokens,
      costMicroUsd: costMicroUsd(call.model, call.inputTokens, call.outputTokens),
    });
    if (needsMentor(report)) await queueForMentor(checkId);
  } catch (error) {
    const grader = error instanceof GraderError ? error : null;
    if (!grader) logger.warn({ err: error, checkId }, "capstone check failed");
    const usage = grader?.usage ?? { inputTokens: 0, outputTokens: 0 };
    const model = env.CAPSTONE_MODEL;
    await finish({
      status: "FAILED",
      automated: automated as unknown as Prisma.InputJsonValue,
      error: grader ? FAILURE_MESSAGES[grader.code] : error instanceof GitHubApiError || error instanceof BadRequestError ? error.message : "Something went wrong while checking. Try again in a few minutes.",
      ...(usage.inputTokens ? { model, inputTokens: usage.inputTokens, outputTokens: usage.outputTokens, costMicroUsd: costMicroUsd(model, usage.inputTokens, usage.outputTokens) } : {}),
    });
  }
}

/** A restart drops in-process work; mark checks that never finished so the learner can retry. */
export async function failStaleCapstoneChecks(now = new Date()): Promise<number> {
  const result = await prisma.capstoneCheck.updateMany({
    where: { status: { in: ["QUEUED", "RUNNING"] }, createdAt: { lt: new Date(now.getTime() - STALE_CHECK_MS) } },
    data: { status: "FAILED", finishedAt: now, error: STALE_CHECK_MESSAGE },
  });
  return result.count;
}
