import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { issuedOn, issuerLine, loadCertificate } from "./certificate-data";

// The share image for a certificate: LinkedIn shows it under a post with the verify
// link, and the verify page offers it as a download. Same document as the page:
// white ground, ink type, one hairline rule, the Dev Weekends mark in black and white.

export const size = { width: 1200, height: 627 };
export const contentType = "image/png";
export const alt = "Dev Weekends certificate";

const INK = "#0A0F2C";
const MUTED = "#46507A";
const LINE = "#DCE0F2";

/** Google Fonts serves TrueType to a client without a modern user agent, which Satori can read. */
async function googleFont(family: string, weight: number, text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`)).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    const response = await fetch(url);
    return response.ok ? await response.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function Image({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const certificate = await loadCertificate(code);
  const wordmark = await readFile(join(process.cwd(), "public/brand/dw/dw-wordmark-black.png")).catch(() => null);

  if (!certificate) {
    return new ImageResponse(<div style={{ display: "flex", width: "100%", height: "100%", background: "#fff", alignItems: "center", justifyContent: "center", fontSize: 40, color: INK }}>Certificate not found</div>, size);
  }

  const name = certificate.recipientName;
  const line = issuerLine(certificate);
  const date = issuedOn(certificate.issuedAt);
  const verify = certificate.verifyUrl.replace(/^https?:\/\//, "");
  const skills = certificate.skills.join(", ");
  const bodyText = `completed ${certificate.title} in the ${certificate.program} ${skills} ${line} ${certificate.organization} ${date} ${verify} Issued Verify ${certificate.code} // CERTIFICATE OF COMPLETION Skills: WITHDRAWN`;
  const [heading, body, bold] = await Promise.all([
    googleFont("Unbounded", 700, name),
    googleFont("DM+Sans", 400, bodyText),
    googleFont("DM+Sans", 700, bodyText),
  ]);
  const fonts = [
    ...(heading ? [{ name: "Unbounded", data: heading, weight: 700 as const, style: "normal" as const }] : []),
    ...(body ? [{ name: "DM Sans", data: body, weight: 400 as const, style: "normal" as const }] : []),
    ...(bold ? [{ name: "DM Sans", data: bold, weight: 700 as const, style: "normal" as const }] : []),
  ];
  const nameSize = name.length > 26 ? 52 : name.length > 18 ? 64 : 76;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#F6F7FB", padding: 28, fontFamily: "DM Sans" }}>
        <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", background: "#FFFFFF", border: `1px solid ${LINE}`, padding: "44px 56px", color: INK }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {wordmark ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={`data:image/png;base64,${wordmark.toString("base64")}`} width={96} height={70} alt="" />
              ) : (
                <div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>Dev Weekends</div>
              )}
              <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 10 }}>
                {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                  <div key={day} style={{ display: "flex", width: 9, height: day < 5 ? 6 : 10, background: "#0A0A0A", opacity: day < 5 ? 0.32 : 1 }} />
                ))}
              </div>
            </div>
            <div style={{ display: "flex", fontSize: 18, color: MUTED, letterSpacing: 1 }}>{certificate.code}</div>
          </div>

          <div style={{ display: "flex", marginTop: 34, fontSize: 16, color: MUTED, letterSpacing: 3 }}>{"// CERTIFICATE OF COMPLETION"}</div>
          <div style={{ display: "flex", marginTop: 10, fontFamily: "Unbounded", fontWeight: 700, fontSize: nameSize, letterSpacing: -2, lineHeight: 1.05 }}>{name}</div>
          <div style={{ display: "flex", flexWrap: "wrap", marginTop: 18, fontSize: 28, lineHeight: 1.3, maxWidth: 940 }}>
            <span>completed&nbsp;</span>
            <span style={{ fontWeight: 700 }}>{certificate.title}</span>
            <span>&nbsp;in the {certificate.program}</span>
          </div>
          {skills ? <div style={{ display: "flex", marginTop: 12, fontSize: 20, color: MUTED, maxWidth: 980 }}>{`Skills: ${skills}`}</div> : null}

          <div style={{ display: "flex", marginTop: "auto", borderTop: `1px solid ${INK}`, paddingTop: 16, justifyContent: "space-between", fontSize: 19 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: 700 }}>{line}</span>
              <span style={{ color: MUTED }}>{certificate.organization}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: 700 }}>{date}</span>
              <span style={{ color: MUTED }}>Issued</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <span style={{ fontWeight: 700 }}>{verify}</span>
              <span style={{ color: MUTED }}>{certificate.revokedAt ? "WITHDRAWN" : "Verify"}</span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined }
  );
}
