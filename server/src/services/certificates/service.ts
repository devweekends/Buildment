import type { Certificate, Prisma } from "../../generated/prisma/index.js";
import { env } from "../../config/env.js";
import { prisma } from "../../db/prisma.js";
import {
  CERTIFICATE_CODE_PATTERN,
  CertificateSettingsSchema,
  linkedInAddToProfileUrl,
  linkedInShareUrl,
  type CertificateEligibility,
  type CertificateEvidence,
  type CertificateSettings,
  type CertificateView,
  type MyCertificateState,
} from "../../shared/lib/certificates.js";
import type { CapstoneCheckPayload } from "../../shared/blocks/capstone-check/schema.js";
import type { SessionUser } from "../../types/auth.js";
import { BadRequestError, ConflictError, ForbiddenError, NotFoundError, UnauthorizedError } from "../../utils/errors.js";
import { requireCourseById } from "../teach/access.js";
import { newCertificateCode } from "./code.js";

// Certificates for passed tracks. A learner is eligible when every chapter is complete
// and every capstone check in the course has a mentor-approved review. The AI result
// alone never qualifies anyone. Issued certificates keep snapshots of the names and
// titles so a later course rename never changes one.

function settingsFor(course: { certificate: Prisma.JsonValue | null }): CertificateSettings | null {
  if (!course.certificate) return null;
  const parsed = CertificateSettingsSchema.safeParse(course.certificate);
  return parsed.success ? parsed.data : null;
}

export function toCertificateView(certificate: Certificate, organization: string): CertificateView {
  const verifyUrl = `${env.APP_URL}/verify/${certificate.code}`;
  return {
    code: certificate.code,
    recipientName: certificate.recipientName,
    title: certificate.title,
    program: certificate.program,
    organization,
    issuerName: certificate.issuerName,
    issuerTitle: certificate.issuerTitle,
    skills: certificate.skills,
    issuedAt: certificate.issuedAt.toISOString(),
    revokedAt: certificate.revokedAt?.toISOString() ?? null,
    revokedReason: certificate.revokedAt ? certificate.revokedReason : null,
    evidence: (certificate.evidence as CertificateEvidence[] | null) ?? [],
    verifyUrl,
    imageUrl: `${verifyUrl}/opengraph-image`,
    linkedInAddUrl: linkedInAddToProfileUrl({
      name: certificate.title,
      organizationId: env.CERTIFICATE_LINKEDIN_ORG_ID,
      organizationName: organization,
      issuedAt: certificate.issuedAt,
      certUrl: verifyUrl,
      certId: certificate.code,
    }),
    linkedInShareUrl: linkedInShareUrl(verifyUrl),
  };
}

type EnrollmentForCertificate = {
  id: string;
  userId: string | null;
  courseId: string;
  completedAt: Date | null;
  percentComplete: number;
};

/** Eligibility plus the evidence the certificate will list. */
export async function certificateEligibility(
  enrollment: EnrollmentForCertificate,
  settings: CertificateSettings | null
): Promise<CertificateEligibility & { evidence: CertificateEvidence[] }> {
  if (!settings) return { offered: false, eligible: false, missing: [], evidence: [] };
  const missing: string[] = [];
  if (!enrollment.completedAt && enrollment.percentComplete < 100) missing.push("Finish every chapter in the track.");

  const capstones = await prisma.block.findMany({
    where: { type: "CAPSTONE_CHECK", archivedAt: null, chapter: { courseId: enrollment.courseId, archivedAt: null } },
    select: { id: true, chapter: { select: { title: true } } },
    orderBy: [{ chapter: { order: "asc" } }, { order: "asc" }],
  });
  const evidence: CertificateEvidence[] = [];
  for (const block of capstones) {
    const approved = enrollment.userId
      ? await prisma.response.findFirst({
          where: { blockId: block.id, userId: enrollment.userId, review: { verdict: "APPROVED" } },
          orderBy: { attempt: "desc" },
          select: { payload: true },
        })
      : null;
    if (!approved) {
      missing.push(`Get your mentor's approval on the capstone in "${block.chapter.title}".`);
      continue;
    }
    const payload = approved.payload as Partial<CapstoneCheckPayload>;
    evidence.push({
      chapterTitle: block.chapter.title,
      repoUrl: payload.repoUrl ?? "",
      liveUrl: payload.liveUrl ?? null,
      commitSha: payload.commitSha ?? null,
      percent: typeof payload.percent === "number" ? payload.percent : null,
    });
  }
  return { offered: true, eligible: missing.length === 0, missing, evidence };
}

async function loadLearnerEnrollment(courseSlug: string, user: SessionUser | undefined) {
  if (!user) throw new UnauthorizedError();
  const course = await prisma.course.findUnique({ where: { slug: courseSlug }, select: { id: true, certificate: true } });
  if (!course) throw new NotFoundError("Course not found");
  const enrollment = await prisma.enrollment.findUnique({
    where: { courseId_userId: { courseId: course.id, userId: user.id } },
    select: { id: true, userId: true, courseId: true, completedAt: true, percentComplete: true, certificate: true },
  });
  if (!enrollment) throw new ForbiddenError("You are not enrolled in this course.");
  return { course, enrollment, settings: settingsFor(course) };
}

export async function getMyCertificate(courseSlug: string, user: SessionUser | undefined): Promise<MyCertificateState> {
  const { enrollment, settings } = await loadLearnerEnrollment(courseSlug, user);
  const { evidence: _evidence, ...eligibility } = await certificateEligibility(enrollment, settings);
  const learner = await prisma.user.findUnique({ where: { id: user!.id }, select: { name: true } });
  return {
    eligibility,
    certificate: enrollment.certificate ? toCertificateView(enrollment.certificate, settings?.organization ?? "Dev Weekends") : null,
    suggestedName: learner?.name ?? null,
  };
}

const NAME = /^[\p{L}\p{M}][\p{L}\p{M}' .-]{1,79}$/u;

/** Issue once per enrollment. The learner confirms the name exactly as it should appear. */
export async function claimCertificate(courseSlug: string, user: SessionUser | undefined, input: { recipientName: string }): Promise<CertificateView> {
  const { course, enrollment, settings } = await loadLearnerEnrollment(courseSlug, user);
  if (!settings) throw new NotFoundError("This course does not offer a certificate.");
  if (enrollment.certificate) return toCertificateView(enrollment.certificate, settings.organization);
  const recipientName = input.recipientName.trim().replace(/\s+/g, " ");
  if (!NAME.test(recipientName)) throw new BadRequestError("Write your name as it should appear, using letters, spaces, hyphens or apostrophes.", "CERTIFICATE_NAME");
  const eligibility = await certificateEligibility(enrollment, settings);
  if (!eligibility.eligible) throw new ConflictError(eligibility.missing[0] ?? "This certificate is not ready yet.", "CERTIFICATE_NOT_ELIGIBLE");

  for (let tries = 0; tries < 5; tries++) {
    try {
      const certificate = await prisma.certificate.create({
        data: {
          code: newCertificateCode(settings),
          userId: user!.id,
          courseId: course.id,
          enrollmentId: enrollment.id,
          recipientName,
          program: settings.program,
          title: settings.title,
          issuerName: settings.issuer.name,
          issuerTitle: settings.issuer.title ?? null,
          skills: settings.skills,
          evidence: eligibility.evidence as unknown as Prisma.InputJsonValue,
        },
      });
      return toCertificateView(certificate, settings.organization);
    } catch (error) {
      const code = (error as { code?: string; meta?: { target?: unknown } }).code;
      if (code !== "P2002") throw error;
      // Another tab issued it first: return that one. Otherwise the random code collided; draw again.
      const existing = await prisma.certificate.findUnique({ where: { enrollmentId: enrollment.id } });
      if (existing) return toCertificateView(existing, settings.organization);
    }
  }
  throw new ConflictError("Could not issue the certificate. Try again.");
}

/** Public, no sign-in. Unknown codes are a plain 404 so ids cannot be probed for details. */
export async function getPublicCertificate(code: string): Promise<CertificateView> {
  if (!CERTIFICATE_CODE_PATTERN.test(code)) throw new NotFoundError("Certificate not found");
  const certificate = await prisma.certificate.findUnique({ where: { code }, include: { course: { select: { certificate: true } } } });
  if (!certificate) throw new NotFoundError("Certificate not found");
  return toCertificateView(certificate, settingsFor(certificate.course)?.organization ?? "Dev Weekends");
}

/** Mentors of the course and platform admins can revoke, with a reason shown on the verify page. */
export async function revokeCertificate(user: SessionUser, code: string, reason: string): Promise<CertificateView> {
  const certificate = await prisma.certificate.findUnique({ where: { code }, include: { course: { select: { id: true, certificate: true } } } });
  if (!certificate) throw new NotFoundError("Certificate not found");
  await requireCourseById(user, certificate.course.id, "SUBMISSION_EVALUATOR");
  const trimmed = reason.trim();
  if (trimmed.length < 3) throw new BadRequestError("Give a short reason.");
  const updated = await prisma.certificate.update({
    where: { id: certificate.id },
    data: { revokedAt: certificate.revokedAt ?? new Date(), revokedReason: trimmed.slice(0, 500), revokedById: user.id },
  });
  return toCertificateView(updated, settingsFor(certificate.course)?.organization ?? "Dev Weekends");
}
