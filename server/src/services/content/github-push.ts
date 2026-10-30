import { createHmac, timingSafeEqual } from "node:crypto";

export type GithubPushCommit = {
  added?: string[];
  modified?: string[];
  removed?: string[];
};

export type GithubPushPayload = {
  ref?: string;
  commits?: GithubPushCommit[];
  head_commit?: GithubPushCommit | null;
};

/** True when the push landed on the given branch (default main). */
export function isPushToBranch(ref: string | undefined, branch = "main"): boolean {
  return ref === `refs/heads/${branch}`;
}

function pathsFromCommit(commit: GithubPushCommit | null | undefined): string[] {
  if (!commit) return [];
  return [...(commit.added ?? []), ...(commit.modified ?? []), ...(commit.removed ?? [])];
}

/** True when any path in the push touches the courses/ tree. */
export function pushTouchesCourses(payload: GithubPushPayload): boolean {
  const paths = [
    ...pathsFromCommit(payload.head_commit),
    ...(payload.commits ?? []).flatMap((commit) => pathsFromCommit(commit)),
  ];
  return paths.some((path) => path === "courses" || path.startsWith("courses/"));
}

export function verifyGithubSignature(rawBody: Buffer, signatureHeader: string | undefined, secret: string): boolean {
  if (!signatureHeader?.startsWith("sha256=")) return false;
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const given = signatureHeader.slice("sha256=".length);
  try {
    const expectedBuf = Buffer.from(expected, "utf8");
    const givenBuf = Buffer.from(given, "utf8");
    return expectedBuf.length === givenBuf.length && timingSafeEqual(expectedBuf, givenBuf);
  } catch {
    return false;
  }
}
