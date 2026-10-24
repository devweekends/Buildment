-- Quiz questions are sent only after the learner presses Start.
ALTER TABLE "IntegrityAttempt" ADD COLUMN "questionsShownAt" TIMESTAMP(3);
