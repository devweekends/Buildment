import "server-only";
import { cache } from "react";
import { ApiError } from "@/lib/api-client";
import { serverApiFetch } from "@/lib/api-server";
import type { CertificateView } from "@/shared/lib/certificates";

/** Public lookup, never with the visitor's session. Null for an unknown id. */
export const loadCertificate = cache(async (code: string): Promise<CertificateView | null> => {
  try {
    const result = await serverApiFetch<{ certificate: CertificateView }>(`/api/v1/certificates/verify/${encodeURIComponent(code)}`, { token: null });
    return result.certificate;
  } catch (error) {
    if (error instanceof ApiError && error.status < 500) return null;
    throw error;
  }
});

export function issuedOn(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export function issuerLine(certificate: Pick<CertificateView, "issuerName" | "issuerTitle" | "organization">): string {
  return certificate.issuerTitle ? `${certificate.issuerName}, ${certificate.issuerTitle}` : certificate.issuerName;
}
