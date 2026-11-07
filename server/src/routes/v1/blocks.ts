import { Router } from "express";
import * as blocks from "../../controllers/blocks.js";
import * as aiInterview from "../../controllers/ai-interview.js";
import * as capstone from "../../controllers/capstone.js";
import { authenticate, optionalAuth } from "../../middlewares/authenticate.js";
import { userRateLimit } from "../../middlewares/rate-limit.js";
import { validate } from "../../middlewares/validate.js";
import { aiInterviewAnswerBody, aiInterviewSessionBody, aiInterviewStartBody } from "../../validations/ai.js";
import { respondBody, respondParams } from "../../validations/blocks.js";
import { capstoneCheckBody, capstoneSendBody } from "../../validations/capstone.js";
import { validateParams } from "../../middlewares/validate.js";

const router = Router();

// optionalAuth, not authenticate: the service answers 404 for an unknown block
// before 401, which the quiz client relies on to fall back to local grading.
router.post(
  "/:blockId/respond",
  optionalAuth,
  validate({ params: respondParams, body: respondBody }),
  userRateLimit({
    scope: "respond",
    max: 40,
    keyFrom: (req) => req.params.blockId as string,
    message: "Too many submissions — wait a minute and try again.",
  }),
  blocks.respond
);

// Config + the caller's latest answer; anonymous callers get the config only.
router.get("/:blockId/state", optionalAuth, validateParams(respondParams), blocks.state);

// AI interview: the learner talks to an interviewer that runs on their own OpenRouter key.
// Every call after "start" reaches OpenRouter, so answers and finishes are limited per learner.
const aiInterviewLimit = (scope: string, max: number) =>
  userRateLimit({
    scope,
    max,
    windowMs: 10 * 60_000,
    keyFrom: (req) => req.params.blockId as string,
    message: "You are going a little fast. Wait a few minutes and carry on.",
  });
router.post("/:blockId/ai-interview/start", authenticate, validate({ params: respondParams, body: aiInterviewStartBody }), aiInterviewLimit("ai-interview-start", 10), aiInterview.start);
router.post("/:blockId/ai-interview/answer", authenticate, validate({ params: respondParams, body: aiInterviewAnswerBody }), aiInterviewLimit("ai-interview-answer", 60), aiInterview.answer);
router.post("/:blockId/ai-interview/finish", authenticate, validate({ params: respondParams, body: aiInterviewSessionBody }), aiInterviewLimit("ai-interview-finish", 10), aiInterview.finish);
router.post("/:blockId/ai-interview/abandon", authenticate, validate({ params: respondParams, body: aiInterviewSessionBody }), aiInterviewLimit("ai-interview-abandon", 20), aiInterview.abandon);

// Capstone checks: GitHub reads and an AI grade on the platform key. The service also
// enforces the per-day limits in the database; these stop bursts before any work starts.
router.get("/:blockId/capstone", authenticate, validateParams(respondParams), capstone.state);
router.post(
  "/:blockId/capstone/check",
  authenticate,
  validate({ params: respondParams, body: capstoneCheckBody }),
  userRateLimit({ scope: "capstone-check", max: 5, windowMs: 10 * 60_000, keyFrom: (req) => req.params.blockId as string, message: "Wait a few minutes before you check again." }),
  capstone.check
);
router.post("/:blockId/capstone/send", authenticate, validate({ params: respondParams, body: capstoneSendBody }), capstone.send);

export default router;
