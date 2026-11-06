import type { PrismaClient } from "../../generated/prisma/index.js";
import { lifecycleForSignedInEnrollment } from "./lifecycle.js";
import { couponUnlocksContent, discountedAmountCents, redeemCouponUsage } from "../coupons/issue.js";

/** After verified signup/login, attach pending Pathment enrollments for the same email. */
export async function linkLearnerProfileToUser(db: PrismaClient, userId: string, email: string) {
  const normalized = email.trim().toLowerCase();
  const profile = await db.learnerProfile.findUnique({ where: { email: normalized } });
  if (!profile) return;

  await db.learnerProfile.update({
    where: { id: profile.id },
    data: { userId, linkedAt: new Date() },
  });

  const pending = await db.enrollment.findMany({
    where: {
      learnerProfileId: profile.id,
      userId: null,
    },
    include: { course: true, couponUsage: true },
  });

  for (const enrollment of pending) {
    await db.$transaction(async (tx) => {
      const coupon = enrollment.couponUsage?.status !== "CANCELLED" ? enrollment.couponUsage : null;
      const lifecycle = coupon && couponUnlocksContent(coupon.percentOff)
        ? "ACTIVE"
        : lifecycleForSignedInEnrollment(enrollment.course.pricingType);
      await tx.enrollment.update({
        where: { id: enrollment.id },
        data: { userId, lifecycle, status: lifecycle === "ACTIVE" ? "IN_PROGRESS" : enrollment.status, startedAt: lifecycle === "ACTIVE" ? new Date() : null },
      });
      if (lifecycle === "PAYMENT_REQUIRED") {
        const amountCents = coupon
          ? discountedAmountCents(enrollment.course.priceCents, coupon.percentOff)
          : enrollment.course.priceCents;
        await tx.payment.upsert({
          where: { enrollmentId: enrollment.id },
          create: { enrollmentId: enrollment.id, amountCents, currency: enrollment.course.currency, status: "PENDING" },
          update: coupon ? { amountCents, status: "PENDING", provider: null, paidAt: null } : {},
        });
      } else if (coupon) {
        await tx.payment.updateMany({ where: { enrollmentId: enrollment.id, status: "PENDING" }, data: { amountCents: 0, status: "SUCCEEDED", provider: "coupon", paidAt: new Date() } });
        await redeemCouponUsage(tx, enrollment.id);
      }
    });
  }
}
