import { isRegisteredBlockType } from "../../shared/blocks/definitions.js";
import { prisma } from "../../db/prisma.js";
import { ForbiddenError, NotFoundError, NotImplementedError } from "../../utils/errors.js";
import type { SessionUser } from "../../types/auth.js";
import { requireBlockSubmissionAccess } from "../enrollment/api-learn-access.js";
import { bypassProgressGatingForEmail } from "../auth/seed-access.js";
import { ChapterLockedError, assertChapterUnlocked } from "../progress/gate.js";
import { quizQuestionsVisible } from "../integrity/attempts.js";

// The checks every learner write to a block goes through: the block exists, the
// caller is a verified learner enrolled in its course, and its chapter is unlocked.

const QUIZ_STEP_TYPES: ReadonlySet<string> = new Set(["QUIZ", "OPEN_QUESTION", "PREDICT", "CODE"]);

export async function loadBlockForSubmission(
  blockId: string,
  user: SessionUser | undefined,
  /** Runs after the block is found and before access is checked, for type-specific refusals. */
  beforeAccess?: (block: { type: string; chapter: { readerMode: string } }) => void
) {
  const block = await prisma.block.findUnique({
    where: { id: blockId },
    include: { chapter: { select: { archivedAt: true, id: true, courseId: true, readerMode: true, proctored: true, course: { select: { familySlug: true, variantFamily: true } } } } },
  });
  if (!block || block.archivedAt || block.chapter.archivedAt) throw new NotFoundError("Block not found");
  if (!isRegisteredBlockType(block.type)) {
    throw new NotImplementedError(`Block type ${block.type} has no grader yet`);
  }
  beforeAccess?.(block);

  const enrollment = await requireBlockSubmissionAccess(block.chapter.courseId, user);
  const learner = user!;

  try {
    await assertChapterUnlocked({
      courseId: block.chapter.courseId,
      enrollmentId: enrollment.id,
      chapterId: block.chapter.id,
      bypassLocking: bypassProgressGatingForEmail(learner.email),
    });
  } catch (error) {
    if (error instanceof ChapterLockedError) {
      throw new ForbiddenError("This chapter is locked. Finish the previous chapter first.", "CHAPTER_LOCKED");
    }
    throw error;
  }

  // A proctored quiz takes no answer before Start, or after the attempt was locked.
  if (block.chapter.readerMode === "QUIZ" && block.chapter.proctored && QUIZ_STEP_TYPES.has(block.type)
      && !(await quizQuestionsVisible(enrollment.id, block.chapter))) {
    throw new ForbiddenError("Start the quiz to answer its questions.", "QUIZ_NOT_STARTED");
  }

  return { block, enrollment, learner };
}
