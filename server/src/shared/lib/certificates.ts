import { z } from "zod";

// Completion certificates (docs/16-capstone-checker-and-certificates.mdx). A course opts in
// with a `certificate` block in course.yaml; the API issues one per passed enrollment and
// the public page /verify/<code> shows it to anyone.

export const CertificateSettingsSchema = z
  .object({
    /** The programme line, for example "Dev Weekends Mentorship". */
    program: z.string().trim().min(1).max(120).default("Dev Weekends Mentorship"),
    /** The track title on the certificate and in LinkedIn's Name field. */
    title: z.string().trim().min(1).max(120),
    /** Short track code used in the public id, for example L2 in DW-L2-7K3F9QXM. */
    code: z.string().regex(/^[A-Z0-9]{1,6}$/, "Use 1 to 6 capital letters or digits"),
    /** The programme's organisation, shown on the certificate. LinkedIn's issuer is always Edorax. */
    organization: z.string().trim().min(1).max(120).default("Dev Weekends"),
    /** Prefix of the public id. */
    prefix: z.string().regex(/^[A-Z]{2,4}$/).default("DW"),
    /**
     * Who signs the certificate. Leave the name out to use the course's trainer, the instructor
     * name the catalog shows for the course.
     */
    issuer: z
      .object({
        name: z.string().trim().min(1).max(120).optional(),
        title: z.string().trim().min(1).max(120).optional(),
      })
      .strict()
      .default({}),
    skills: z.array(z.string().trim().min(1).max(60)).max(12).default([]),
  })
  .strict();

export type CertificateSettings = z.infer<typeof CertificateSettingsSchema>;

export type CertificateEvidence = {
  chapterTitle: string;
  repoUrl: string;
  liveUrl: string | null;
  commitSha: string | null;
  percent: number | null;
};

export type CertificateView = {
  code: string;
  recipientName: string;
  title: string;
  program: string;
  organization: string;
  issuerName: string;
  issuerTitle: string | null;
  skills: string[];
  issuedAt: string;
  revokedAt: string | null;
  revokedReason: string | null;
  evidence: CertificateEvidence[];
  verifyUrl: string;
  imageUrl: string;
  linkedInAddUrl: string;
  linkedInShareUrl: string;
};

/** The organisation LinkedIn lists as the issuer: the platform that issues and verifies certificates. */
export const LINKEDIN_ISSUER_NAME = "Edorax";

export type CertificateEligibility = {
  /** False when the course has no certificate block. */
  offered: boolean;
  eligible: boolean;
  /** What is still needed, in plain words. */
  missing: string[];
};

export type MyCertificateState = {
  eligibility: CertificateEligibility;
  certificate: CertificateView | null;
  suggestedName: string | null;
};

/** Crockford base32 without I, L, O, U: easy to read aloud and type. */
export const CERTIFICATE_CODE_ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
export const CERTIFICATE_CODE_PATTERN = /^[A-Z]{2,4}-[A-Z0-9]{1,6}-[0-9A-HJKMNP-TV-Z]{8}$/;

/**
 * LinkedIn's Add to profile form, pre-filled as a Licence or certification.
 * With an organisation id LinkedIn links the issuer page; without it the name is free text.
 */
export function linkedInAddToProfileUrl(input: {
  name: string;
  organizationId?: string | null;
  organizationName: string;
  issuedAt: Date;
  certUrl: string;
  certId: string;
}): string {
  const params = new URLSearchParams({ startTask: "CERTIFICATION_NAME", name: input.name });
  if (input.organizationId) params.set("organizationId", input.organizationId);
  else params.set("organizationName", input.organizationName);
  params.set("issueYear", String(input.issuedAt.getUTCFullYear()));
  params.set("issueMonth", String(input.issuedAt.getUTCMonth() + 1));
  params.set("certUrl", input.certUrl);
  params.set("certId", input.certId);
  return `https://www.linkedin.com/profile/add?${params.toString()}`;
}

/** LinkedIn's share dialog for a post with the verify link; the page's Open Graph image shows. */
export function linkedInShareUrl(url: string): string {
  return `https://www.linkedin.com/sharing/share-offsite/?${new URLSearchParams({ url }).toString()}`;
}
