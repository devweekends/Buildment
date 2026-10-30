import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import {
  isPushToBranch,
  pushTouchesCourses,
  verifyGithubSignature,
} from "../../../../src/services/content/github-push.js";

describe("github content push helpers", () => {
  it("accepts only the main branch ref", () => {
    expect(isPushToBranch("refs/heads/main")).toBe(true);
    expect(isPushToBranch("refs/heads/feature")).toBe(false);
    expect(isPushToBranch(undefined)).toBe(false);
  });

  it("detects course path changes", () => {
    expect(
      pushTouchesCourses({
        ref: "refs/heads/main",
        commits: [{ modified: ["README.md", "courses/foo/bar.md"] }],
      })
    ).toBe(true);
    expect(
      pushTouchesCourses({
        ref: "refs/heads/main",
        head_commit: { added: ["courses/new-course/course.yaml"] },
      })
    ).toBe(true);
    expect(
      pushTouchesCourses({
        ref: "refs/heads/main",
        commits: [{ modified: ["docs/readme.md"] }],
      })
    ).toBe(false);
  });

  it("verifies GitHub sha256 signatures", () => {
    const secret = "test-secret";
    const body = Buffer.from(JSON.stringify({ ok: true }), "utf8");
    const digest = createHmac("sha256", secret).update(body).digest("hex");
    expect(verifyGithubSignature(body, `sha256=${digest}`, secret)).toBe(true);
    expect(verifyGithubSignature(body, `sha256=${digest.slice(0, -1)}a`, secret)).toBe(false);
    expect(verifyGithubSignature(body, undefined, secret)).toBe(false);
  });
});
