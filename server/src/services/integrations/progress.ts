import { prisma } from "../../db/prisma.js";
import { NotFoundError } from "../../utils/errors.js";
import type { AuthenticatedOrganization } from "../../types/auth.js";
import { releaseForEnrollment } from "../courses/releases.js";

type ChapterProgressRow = {
  chapterId: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  blocksCompleted: number;
  blocksTotal: number;
  score: number;
  maxScore: number;
  timeSpentSeconds: number;
  startedAt: Date | null;
  completedAt: Date | null;
};

function iso(value: Date | null) {
  return value?.toISOString() ?? null;
}

function chapterStatus(progress: ChapterProgressRow | undefined) {
  return progress?.status ?? "NOT_STARTED";
}

function chapterProgressPercent(progress: ChapterProgressRow | undefined) {
  if (!progress) return 0;
  if (progress.status === "COMPLETED") return 100;
  return progress.blocksTotal > 0
    ? Math.round((100 * progress.blocksCompleted) / progress.blocksTotal)
    : 0;
}

/** Course and chapter progress for one organization learner, in the organization API shape. */
export async function getLearnerProgress(
  org: AuthenticatedOrganization,
  input: { courseId: string; learnerEmail: string }
) {
  const { courseId } = input;
  const learnerEmail = input.learnerEmail.trim().toLowerCase();

  const enrollment = await prisma.enrollment.findFirst({
    where: {
      organizationId: org.id,
      courseId,
      OR: [{ learnerProfile: { email: learnerEmail } }, { user: { email: learnerEmail } }],
    },
    select: {
      id: true,
      lifecycle: true,
      status: true,
      percentComplete: true,
      totalScore: true,
      maxScore: true,
      pendingReviews: true,
      startedAt: true,
      lastActiveAt: true,
      completedAt: true,
      releaseId: true,
      variantSlug: true,
      course: {
        select: {
          id: true,
          slug: true,
          title: true,
          familySlug: true,
          modules: {
            where: { archivedAt: null },
            orderBy: { order: "asc" },
            select: {
              id: true,
              title: true,
              order: true,
              chapters: {
                where: { archivedAt: null, publishedAt: { not: null } },
                orderBy: { order: "asc" },
                select: { id: true, title: true, order: true },
              },
            },
          },
          chapters: {
            where: { moduleId: null, archivedAt: null, publishedAt: { not: null } },
            orderBy: { order: "asc" },
            select: { id: true, title: true, order: true },
          },
        },
      },
      chapterProgress: {
        select: {
          chapterId: true,
          status: true,
          blocksCompleted: true,
          blocksTotal: true,
          score: true,
          maxScore: true,
          timeSpentSeconds: true,
          startedAt: true,
          completedAt: true,
        },
      },
    },
  });
  if (!enrollment) throw new NotFoundError("Enrollment not found");

  const pinnedRelease = await releaseForEnrollment(
    enrollment.course.id,
    { releaseId: enrollment.releaseId, variantSlug: enrollment.variantSlug },
    enrollment.course.familySlug
  );
  const moduleSource = pinnedRelease?.modules ?? enrollment.course.modules;
  const progressByChapter = new Map<string, ChapterProgressRow>(
    enrollment.chapterProgress.map((progress) => [progress.chapterId, progress])
  );

  const makeChapterReport = (chapter: { id: string; title: string; order: number }, module: { id: string; title: string } | null) => {
    const progress = progressByChapter.get(chapter.id);
    const status = chapterStatus(progress);
    return {
      id: chapter.id,
      title: chapter.title,
      order: chapter.order,
      module_id: module?.id ?? null,
      module_title: module?.title ?? null,
      status,
      completed: status === "COMPLETED",
      progress_percent: chapterProgressPercent(progress),
      blocks_completed: progress?.blocksCompleted ?? 0,
      blocks_total: progress?.blocksTotal ?? 0,
      score: progress?.score ?? 0,
      max_score: progress?.maxScore ?? 0,
      time_spent_seconds: progress?.timeSpentSeconds ?? 0,
      started_at: iso(progress?.startedAt ?? null),
      completed_at: iso(progress?.completedAt ?? null),
    };
  };

  const modules = moduleSource.map((module) => {
    const moduleChapters = module.chapters.map((chapter) => makeChapterReport(chapter, module));
    const completedChapters = moduleChapters.filter((chapter) => chapter.completed).length;
    const progressPercent = moduleChapters.length
      ? Math.round(moduleChapters.reduce((sum, chapter) => sum + chapter.progress_percent, 0) / moduleChapters.length)
      : 0;
    const status = moduleChapters.length > 0 && completedChapters === moduleChapters.length
      ? "COMPLETED"
      : moduleChapters.some((chapter) => chapter.status !== "NOT_STARTED")
        ? "IN_PROGRESS"
        : "NOT_STARTED";
    return {
      id: module.id,
      title: module.title,
      order: module.order,
      status,
      progress_percent: progressPercent,
      completed_chapters: completedChapters,
      total_chapters: moduleChapters.length,
      time_spent_seconds: moduleChapters.reduce((sum, chapter) => sum + chapter.time_spent_seconds, 0),
      chapters: moduleChapters,
    };
  });
  const unassignedChapters = pinnedRelease
    ? []
    : enrollment.course.chapters.map((chapter) => makeChapterReport(chapter, null));
  const flatChapters = [...modules.flatMap((module) => module.chapters), ...unassignedChapters];
  const inProgressChapter = flatChapters.find((chapter) => chapter.status === "IN_PROGRESS");
  const currentChapter = inProgressChapter ?? flatChapters.find((chapter) => !chapter.completed);
  const completedChapters = flatChapters.filter((chapter) => chapter.completed).length;
  const totalStudySeconds = flatChapters.reduce((sum, chapter) => sum + chapter.time_spent_seconds, 0);
  const completed = enrollment.lifecycle === "COMPLETED" || enrollment.status === "COMPLETED";
  const overallProgress = enrollment.percentComplete;

  return {
    enrollment_id: enrollment.id,
    course_id: courseId,
    course_slug: enrollment.course.slug,
    course_title: enrollment.course.title,
    learner_email: learnerEmail,
    lifecycle: enrollment.lifecycle,
    enrollment_status: enrollment.status,
    status: completed ? "COMPLETED" : overallProgress > 0 ? "IN_PROGRESS" : "NOT_STARTED",
    overall_progress: overallProgress,
    completed_lessons: completedChapters,
    total_lessons: flatChapters.length,
    completed_chapters: completedChapters,
    total_chapters: flatChapters.length,
    total_modules: modules.length,
    total_score: enrollment.totalScore,
    max_score: enrollment.maxScore,
    pending_reviews: enrollment.pendingReviews,
    time_spent_seconds: totalStudySeconds,
    started_at: iso(enrollment.startedAt),
    last_active_at: iso(enrollment.lastActiveAt),
    completed_at: iso(enrollment.completedAt),
    current_chapter: currentChapter
      ? {
          id: currentChapter.id,
          title: currentChapter.title,
          module_id: currentChapter.module_id,
          module_title: currentChapter.module_title,
          status: currentChapter.status,
          progress: currentChapter.progress_percent,
        }
      : null,
    modules,
    unassigned_chapters: unassignedChapters,
    completed,
    report_generated_at: new Date().toISOString(),
  };
}
