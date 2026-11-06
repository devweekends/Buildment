// GENERATED from server/src/shared — do not edit here. Run `pnpm sync-shared` in server/.
import type { GradeResult } from "../types";
import type { CapstoneCheckConfig, CapstoneCheckPayload } from "./schema";

// The AI result is advisory. The Response exists once a finished check is sent to the
// mentor (services/capstone/service.ts), so it always waits for a human verdict.
export function gradeCapstoneCheck(_config: CapstoneCheckConfig, payload: CapstoneCheckPayload): GradeResult {
  return { score: payload.percent, maxScore: 100, isCorrect: null, status: "PENDING_REVIEW" };
}
