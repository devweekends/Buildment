-- Proctored quizzes are a separate, strict kind of quiz chapter.
ALTER TABLE "Chapter" ADD COLUMN "proctored" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "CourseChapterDraft" ADD COLUMN "proctored" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "IntegrityAttempt" ADD COLUMN "lockedAt" TIMESTAMP(3);
ALTER TYPE "IntegrityEventType" ADD VALUE IF NOT EXISTS 'PRINT_BLOCKED';
ALTER TYPE "IntegrityEventType" ADD VALUE IF NOT EXISTS 'NAVIGATION_BLOCKED';
