import type { Prisma } from "../../generated/prisma/index.js";
import { prisma } from "../../db/prisma.js";
import {
  REWARDS,
  REWARD_BY_ID,
  XP_BOOST_DURATION_MS,
  type RewardId,
  type RewardKind,
} from "../../shared/gamification/rewards.js";
import { BadRequestError, NotFoundError } from "../../utils/errors.js";
import { creditBalance, spendCredits } from "./credits.js";
import { gamificationFeatures } from "./flags.js";

// The rewards marketplace: list what the learner can spend Build Credits on, and buy an item.
// Spending records a negative CreditEntry and decrements the cached balance; it never touches XP or
// the career ladder. Cosmetic unlocks are owned once; consumables are held as a quantity.

type Tx = Prisma.TransactionClient;

type CatalogReward = (typeof REWARDS)[number];

function isCosmetic(reward: CatalogReward): reward is Extract<CatalogReward, { kind: "cosmetic" }> {
  return reward.kind === "cosmetic";
}

function isConsumable(reward: CatalogReward): reward is Extract<CatalogReward, { kind: "consumable" }> {
  return reward.kind === "consumable";
}

export type RewardsView = {
  balance: number;
  active: string | null;
  /** Remaining ms of an active ×2 XP boost (0 when none). */
  xpBoostUntil: string | null;
  rewards: Array<{
    id: string;
    label: string;
    price: number;
    kind: RewardKind;
    /** Cosmetic: the visual kind shown on Dot. */
    visual?: string;
    /** Consumable: the mechanic it feeds. */
    effect?: string;
    /** Cosmetic: owned once. Consumable: number held. */
    owned: boolean;
    /** Consumable: quantity held (0 for cosmetics). */
    quantity: number;
  }>;
};

export async function listRewards(userId: string): Promise<RewardsView | null> {
  if (!gamificationFeatures().credits) return null;
  const [user, owned, inventory] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId }, select: { activeCosmetic: true, xpBoostUntil: true } }),
    prisma.unlockedCosmetic.findMany({ where: { userId }, select: { cosmetic: true } }),
    prisma.rewardInventory.findMany({ where: { userId } }),
  ]);
  const ownedSet = new Set(owned.map((row) => row.cosmetic));
  const qty = new Map(inventory.map((row) => [row.rewardId, row.quantity]));
  return {
    balance: await creditBalance(userId),
    active: user?.activeCosmetic ?? null,
    xpBoostUntil:
      user?.xpBoostUntil && user.xpBoostUntil.getTime() > Date.now() ? String(user.xpBoostUntil.getTime()) : null,
    rewards: REWARDS.map((reward) => {
      const held = qty.get(reward.id) ?? 0;
      return {
        id: reward.id,
        label: reward.label,
        price: reward.price,
        kind: reward.kind,
        visual: isCosmetic(reward) ? reward.visual : undefined,
        effect: isConsumable(reward) ? reward.effect : undefined,
        owned: isCosmetic(reward) ? ownedSet.has(reward.id) : held > 0,
        quantity: held,
      };
    }),
  };
}

/** Equip an owned cosmetic (or clear it with `null`). Returns the new active id. */
export async function setActiveReward(userId: string, rewardId: string | null): Promise<string | null> {
  return prisma.$transaction(async (tx) => {
    if (rewardId !== null) {
      const reward = REWARD_BY_ID.get(rewardId as RewardId);
      if (!reward || !isCosmetic(reward)) throw new BadRequestError("Only permanent cosmetics can be equipped");
      const owned = await tx.unlockedCosmetic.findUnique({ where: { userId_cosmetic: { userId, cosmetic: rewardId } }, select: { id: true } });
      if (!owned) throw new BadRequestError("Buy this reward before equipping it");
    }
    await tx.user.update({ where: { id: userId }, data: { activeCosmetic: rewardId } });
    return rewardId;
  });
}

export type PurchaseResult = { balance: number; owned: boolean; quantity: number };

export async function purchaseReward(userId: string, rewardId: string): Promise<PurchaseResult> {
  const reward = REWARD_BY_ID.get(rewardId as RewardId);
  if (!reward) throw new NotFoundError("Unknown reward");

  return prisma.$transaction(async (tx) => {
    // A cosmetic is a one-time unlock: if it's already owned, re-buying is a no-op. Check ownership
    // before spending — the credit spend is idempotent on `rewards:buy:<id>`, so a second attempt
    // would silently record nothing yet still return a phantom lower balance if we computed it
    // up front. Short-circuit instead so the returned balance always matches the real one.
    if (isCosmetic(reward)) {
      const existing = await tx.unlockedCosmetic.findUnique({ where: { userId_cosmetic: { userId, cosmetic: rewardId } }, select: { id: true } });
      if (existing) return { balance: await creditBalance(userId, tx), owned: true, quantity: 0 };
    }

    const balance = await creditBalance(userId, tx);
    if (balance < reward.price) throw new BadRequestError("Not enough Build Credits");

    if (isCosmetic(reward)) {
      // A cosmetic is bought exactly once, so a stable key is correct and idempotent.
      const remaining = await spendCredits(tx, userId, `rewards:buy:${rewardId}`, reward.price);
      await tx.unlockedCosmetic.create({ data: { userId, cosmetic: rewardId } });
      return { balance: remaining, owned: true, quantity: 0 };
    }

    // Consumables can be bought repeatedly, so each purchase MUST record its own spend. The spend
    // key is idempotent, so a *stable* key would silently skip the charge on every buy after the
    // first while the inventory still incremented — a free item. Increment first to get this
    // purchase's ordinal, then spend against a per-unit key (`rewards:buy:<id>:<n>`) so the Nth buy
    // charges exactly once.
    const row = await tx.rewardInventory.upsert({
      where: { userId_rewardId: { userId, rewardId } },
      create: { userId, rewardId, quantity: 1 },
      update: { quantity: { increment: 1 } },
      select: { quantity: true },
    });
    const remaining = await spendCredits(tx, userId, `rewards:buy:${rewardId}:${row.quantity}`, reward.price);
    return { balance: remaining, owned: true, quantity: row.quantity };
  });
}

/**
 * Activate a consumable. Currently only the ×2 XP boost is manually activated (it starts a timed
 * window on `User.xpBoostUntil`); the league shield is consumed automatically at the Monday reset.
 * Returns the remaining quantity and (for an XP boost) the boost-until instant.
 */
export async function useReward(
  userId: string,
  rewardId: string
): Promise<{ quantity: number; xpBoostUntil: Date | null }> {
  const reward = REWARD_BY_ID.get(rewardId as RewardId);
  if (!reward || !isConsumable(reward)) throw new NotFoundError("Unknown consumable");

  return prisma.$transaction(async (tx) => {
    const held = await tx.rewardInventory.findUnique({ where: { userId_rewardId: { userId, rewardId } }, select: { quantity: true } });
    if (!held || held.quantity <= 0) throw new BadRequestError("Buy this item before using it");

    if (reward.effect === "xp_boost") {
      const until = new Date(Date.now() + (reward.durationMs ?? XP_BOOST_DURATION_MS));
      await tx.user.update({ where: { id: userId }, data: { xpBoostUntil: until } });
      await decrementInventory(tx, userId, rewardId);
      return { quantity: Math.max(0, held.quantity - 1), xpBoostUntil: until };
    }

    // Shield is passive (auto-consumed at the reset); there is nothing to activate here.
    throw new BadRequestError("This reward can't be activated manually");
  });
}

/** True while the learner holds an unexpired ×2 XP boost. */
export async function hasActiveXpBoost(userId: string, now: Date = new Date()): Promise<boolean> {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { xpBoostUntil: true } });
  return !!user?.xpBoostUntil && user.xpBoostUntil.getTime() > now.getTime();
}

async function decrementInventory(tx: Tx, userId: string, rewardId: string): Promise<void> {
  await tx.rewardInventory.updateMany({ where: { userId, rewardId, quantity: { gt: 0 } }, data: { quantity: { decrement: 1 } } });
  await tx.rewardInventory.deleteMany({ where: { userId, rewardId, quantity: { lte: 0 } } });
}