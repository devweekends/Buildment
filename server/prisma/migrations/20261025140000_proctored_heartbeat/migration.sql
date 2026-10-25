-- A proctored quiz sends its questions only while the browser keeps proving a live camera,
-- and reopening the page mid-attempt counts as leaving.
ALTER TABLE "IntegrityAttempt" ADD COLUMN "cameraLiveAt" TIMESTAMP(3);
ALTER TYPE "IntegrityEventType" ADD VALUE IF NOT EXISTS 'PAGE_RELOAD';
