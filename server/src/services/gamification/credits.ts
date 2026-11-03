import type { Prisma } from "../../generated/prisma/index.js";
import { prisma } from "../../db/prisma.js";

// Build Credits: a permanent, spendable currency earned from verified behaviour (course completion,
// weekly league promotion), held separately from lifetime XP. The `CreditEntry` ledger is the source
// of truth; `User.buildCredits` is a cache. Earns are keyed (`@@unique([userId, sourceKey])`) so a
// retry or a recompute never pays twice, exactly like the XP ledger.

export const COURSE_COMPLETED_CREDITS = 90;
export const LEAGUE_PROMOTION_CREDITS = 45;

export const creditKeys = {
  courseCompleted: (courseId: string) => `course:complete:${courseId}`,
  leaguePromotion: (weekStart: string) => `league:promotion:${weekStart}`,
} as const;

type Db = Prisma.TransactionClient | typeof prisma;

/** Pay one idempotent credit award. Returns true if it was newly earned (false on a duplicate). */
export async function earnCredits(tx: Db, userId: string, sourceKey: string, amount: number): Promise<boolean> {
  const existing = await tx.creditEntry.findUnique({ where: { userId_sourceKey: { userId, sourceKey } }, select: { id: true } });
  if (existing) return false;
  await tx.creditEntry.create({ data: { userId, source: sourceKey.split(":")[0]!, sourceKey, amount } });
  await tx.user.update({ where: { id: userId }, data: { buildCredits: { increment: amount } } });
  return true;
}

/** The learner's current spendable balance (the cache; the ledger is authoritative). */
export async function creditBalance(userId: string, db: Db = prisma): Promise<number> {
  const user = await db.user.findUnique({ where: { id: userId }, select: { buildCredits: true } });
  return Math.max(0, user?.buildCredits ?? 0);
}

/**
 * Spend credits idempotently: checks the balance, records a negative ledger row (keyed so a retry
 * never double-spends) and decrements the cache. Never lets the balance go negative. Returns the
 * resulting balance (unchanged if there weren't enough credits).
 */
export async function spendCredits(db: Db, userId: string, sourceKey: string, amount: number): Promise<number> {
  const balance = await creditBalance(userId, db);
  if (amount <= 0 || balance < amount) return balance;
  const existing = await db.creditEntry.findUnique({ where: { userId_sourceKey: { userId, sourceKey } }, select: { id: true } });
  if (existing) return balance;
  await db.creditEntry.create({ data: { userId, source: sourceKey.split(":")[0]!, sourceKey, amount: -amount } });
  return (await db.user.update({ where: { id: userId }, data: { buildCredits: { decrement: amount } }, select: { buildCredits: true } })).buildCredits;
}