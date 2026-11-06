import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CircleAlert, CircleCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { SITE_NAME } from "@/lib/site";
import { issuedOn, issuerLine, loadCertificate } from "./certificate-data";

// Public certificate page: anyone with the link can confirm a certificate is real.
// The artwork matches the share image (opengraph-image.tsx) so a LinkedIn post and the
// page it opens look like the same document.

type Props = { params: Promise<{ code: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const certificate = await loadCertificate(code);
  if (!certificate) return { title: "Certificate not found", robots: { index: false } };
  const title = `${certificate.recipientName}: ${certificate.title}`;
  const description = `${certificate.organization} certificate ${certificate.code}, issued ${issuedOn(certificate.issuedAt)}.`;
  return {
    title,
    description,
    // Verify pages are for people who have the link, not for search results.
    robots: { index: false, follow: false },
    openGraph: { title, description, type: "website", siteName: SITE_NAME, url: certificate.verifyUrl },
    twitter: { card: "summary_large_image", title, description },
  };
}

function WeekBars({ size = 8 }: { size?: number }) {
  const weekday = Math.round(size * 0.58);
  return (
    <span aria-hidden className="flex items-end gap-[3px]" style={{ height: size }}>
      {[0, 1, 2, 3, 4, 5, 6].map((day) => (
        <span key={day} className="block w-[7px] bg-[#0A0A0A]" style={{ height: day < 5 ? weekday : size, opacity: day < 5 ? 0.32 : 1 }} />
      ))}
    </span>
  );
}

export default async function VerifyCertificatePage({ params }: Props) {
  const { code } = await params;
  const certificate = await loadCertificate(code);
  if (!certificate) notFound();
  const revoked = certificate.revokedAt !== null;

  return (
    <main className="min-h-dvh bg-background px-4 py-8 text-foreground sm:px-6 sm:py-12">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center justify-between gap-4 text-sm">
          <Link href="/" className="font-heading text-base font-bold tracking-tight">{SITE_NAME}</Link>
          <span className="text-muted-foreground">Certificate check</span>
        </div>

        <div
          className={revoked ? "flex items-start gap-3 border border-destructive/40 bg-destructive/10 p-4 text-sm" : "flex items-start gap-3 border border-ok bg-ok-soft p-4 text-sm"}
          role="status"
        >
          {revoked ? <CircleAlert className="mt-0.5 size-5 shrink-0 text-destructive" /> : <CircleCheck className="mt-0.5 size-5 shrink-0 text-ok" />}
          <p className="leading-6">
            {revoked
              ? `This certificate was withdrawn on ${issuedOn(certificate.revokedAt!)}.${certificate.revokedReason ? ` Reason: ${certificate.revokedReason}` : ""}`
              : `This certificate is genuine. ${certificate.organization} issued it to ${certificate.recipientName} on ${issuedOn(certificate.issuedAt)}.`}
          </p>
        </div>

        {/* The document itself. White, one hairline border, square corners, ink type. */}
        <article className="border border-[#DCE0F2] bg-white p-6 text-[#0A0F2C] sm:p-10" aria-label="Certificate">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/dw/dw-wordmark-black.png" alt="Dev Weekends" width={82} height={60} className="h-[60px] w-[82px]" />
              <WeekBars />
            </div>
            <p className="font-mono text-xs tracking-wide text-[#46507A]">{certificate.code}</p>
          </div>

          <p className="mt-10 font-mono text-xs uppercase tracking-[0.18em] text-[#46507A]">{"// Certificate of completion"}</p>
          <h1 className="mt-3 font-heading text-3xl font-bold leading-tight tracking-[-0.035em] sm:text-5xl">{certificate.recipientName}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-7 sm:text-xl">
            completed <span className="font-bold">{certificate.title}</span> in the {certificate.program}, including a capstone project reviewed by a mentor.
          </p>
          {certificate.skills.length > 0 ? (
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#46507A]">Skills: {certificate.skills.join(", ")}</p>
          ) : null}

          <div className="mt-10 grid gap-6 border-t border-[#0A0F2C] pt-5 text-sm sm:grid-cols-3">
            <div>
              <p className="font-bold">{issuerLine(certificate)}</p>
              <p className="text-[#46507A]">{certificate.organization}</p>
            </div>
            <div>
              <p className="font-bold">{issuedOn(certificate.issuedAt)}</p>
              <p className="text-[#46507A]">Issued</p>
            </div>
            <div className="sm:text-right">
              <p className="break-all font-bold">{certificate.verifyUrl.replace(/^https?:\/\//, "")}</p>
              <p className="text-[#46507A]">Verify</p>
            </div>
          </div>
        </article>

        {!revoked ? (
          <div className="flex flex-wrap gap-3">
            <a href={certificate.linkedInAddUrl} target="_blank" rel="noreferrer noopener" className={buttonVariants()}>
              Add to LinkedIn
            </a>
            <a href={certificate.linkedInShareUrl} target="_blank" rel="noreferrer noopener" className={buttonVariants({ variant: "outline" })}>
              Share a post
            </a>
            <a href={`/verify/${certificate.code}/opengraph-image`} download={`${certificate.code}.png`} className={buttonVariants({ variant: "outline" })}>
              Download image
            </a>
          </div>
        ) : null}

        {certificate.evidence.length > 0 ? (
          <section className="space-y-2">
            <h2 className="text-sm font-semibold">Capstone work</h2>
            <ul className="divide-y border bg-card text-sm">
              {certificate.evidence.map((item) => (
                <li key={`${item.chapterTitle}-${item.repoUrl}`} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <span>{item.chapterTitle}</span>
                  <span className="flex flex-wrap gap-x-4 gap-y-1">
                    <a href={item.repoUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-2">
                      {item.repoUrl.replace("https://github.com/", "")}
                    </a>
                    {item.liveUrl ? (
                      <a href={item.liveUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-2">
                        Live site
                      </a>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <p className="text-xs leading-5 text-muted-foreground">
          {SITE_NAME} issues and hosts this certificate for {certificate.organization}. The capstone was checked automatically and approved by a mentor.
        </p>
      </div>
    </main>
  );
}
