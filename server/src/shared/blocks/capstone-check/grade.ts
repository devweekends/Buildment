import type { GradeResult } from "../types.js";
import type { CapstoneCheckConfig, CapstoneCheckPayload } from "./schema.js";

// The AI result is advisory. The Response exists once a finished check is sent to the
// mentor (services/capstone/service.ts), so it always waits for a human verdict.
export function gradeCapstoneCheck(_config: CapstoneCheckConfig, payload: CapstoneCheckPayload): GradeResult {
  return { score: payload.percent, maxScore: 100, isCorrect: null, status: "PENDING_REVIEW" };
}
