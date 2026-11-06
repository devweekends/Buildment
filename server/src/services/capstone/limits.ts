import type { Prisma } from "../../generated/prisma/index.js";
import { env } from "../../config/env.js";
import { prisma } from "../../db/prisma.js";
import { TooManyRequestsError } from "../../utils/errors.js";
import { startOfUtcDay } from "../ai/chapter-qa/usage.js";

// Capstone limits, counted from CapstoneCheck rows so they hold across restarts and
// replicas. Learner checks are limited per block per day (GitHub calls); AI grades are
// limited platform-wide per day (the Anthropic bill). Reused results cost nothing and
// do not count against the platform budget.

const COOLDOWN_MS = 60_000;
/** A check runs in about a minute; one still running after this was lost to a restart. */
export const STALE_CHECK_MS = 5 * 60_000;
export const STALE_CHECK_MESSAGE = "This check was interrupted. Press Check again.";

export async function remainingChecksToday(userId: string, blockId: string, now = new Date()) {
  const used = await prisma.capstoneCheck.count({ where: { userId, blockId, createdAt: { gte: startOfUtcDay(now) } } });
  return { remaining: Math.max(0, env.CAPSTONE_LEARNER_DAILY_LIMIT - used), dailyLimit: env.CAPSTONE_LEARNER_DAILY_LIMIT };
}

/** Run inside the transaction that creates the check, under a per-learner-per-block lock. */
export async function assertLearnerMayCheck(tx: Prisma.TransactionClient, userId: string, blockId: string, now = new Date()) {
  await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${`capstone:${userId}:${blockId}`}))`;
  await tx.capstoneCheck.updateMany({
    where: { userId, blockId, status: { in: ["QUEUED", "RUNNING"] }, createdAt: { lt: new Date(now.getTime() - STALE_CHECK_MS) } },
    data: { status: "FAILED", finishedAt: now, error: STALE_CHECK_MESSAGE },
  });
  const running = await tx.capstoneCheck.count({ where: { userId, blockId, status: { in: ["QUEUED", "RUNNING"] } } });
  if (running) throw new TooManyRequestsError("A check is already running. Wait for it to finish.");
  const today = await tx.capstoneCheck.count({ where: { userId, blockId, createdAt: { gte: startOfUtcDay(now) } } });
  if (today >= env.CAPSTONE_LEARNER_DAILY_LIMIT) {
    throw new TooManyRequestsError(`You have used your ${env.CAPSTONE_LEARNER_DAILY_LIMIT} checks for today. Try again tomorrow.`);
  }
  const recent = await tx.capstoneCheck.count({ where: { userId, blockId, createdAt: { gte: new Date(now.getTime() - COOLDOWN_MS) } } });
  if (recent) throw new TooManyRequestsError("Wait a minute before you check again.");
}

/** Claim one AI grade from today's platform budget. False when the budget is spent. */
export async function reserveModelCall(checkId: string, now = new Date()): Promise<boolean> {
  return prisma.$transaction(async (tx) => {
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext('capstone-ai'))`;
    const used = await tx.capstoneCheck.count({ where: { aiCalled: true, createdAt: { gte: startOfUtcDay(now) } } });
    if (used >= env.CAPSTONE_GLOBAL_DAILY_LIMIT) return false;
    await tx.capstoneCheck.update({ where: { id: checkId }, data: { aiCalled: true } });
    return true;
  });
}
