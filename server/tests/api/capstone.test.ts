import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { randomBytes } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../../src/app.js";
import { createSession } from "../../src/services/auth/session.js";
import { prisma } from "../../src/db/prisma.js";
import { env } from "../../src/config/env.js";
import { parseRubricPack } from "../../src/services/capstone/pack-loader.js";
import { startCapstoneCheck } from "../../src/services/capstone/service.js";
import type { CapstoneRepoSource } from "../../src/services/capstone/github.js";
import type { GraderModel } from "../../src/services/capstone/grade.js";
import { createCourseFixture } from "../helpers/fixtures.js";

// End to end on the API: a learner checks a capstone (fake GitHub, fake live site, fake
// grader), the passing check reaches the mentor queue, the mentor approves it, and the
// learner claims a certificate that the public verify endpoint shows.

const here = path.dirname(fileURLToPath(import.meta.url));
const rubric = parseRubricPack(fs.readFileSync(path.join(here, "../fixtures/capstone/sample-pack/rubric.yaml"), "utf8"), "rubric.yaml");

const app = createApp();
let fx: Awaited<ReturnType<typeof createCourseFixture>>;
let blockId: string;
let mentorToken: string;

let ciState: "success" | "failure" = "success";
const source: CapstoneRepoSource = {
  repo: async () => ({ defaultBranch: "main", headSha: ciState === "success" ? "goodsha" : "badsha", isPrivate: false }),
  tags: async () => [],
  tree: async () => ({ entries: [{ path: "README.md", size: 20 }, { path: "src/links.py", size: 50 }], truncated: false }),
  file: async (_ref, _sha, filePath) => (filePath === "README.md" ? "# Site\nRun it." : "def create_link(): ..."),
  ci: async () => (ciState === "success" ? { state: "success", runs: 1 } : { state: "failure", failed: ["test"] }),
  checkRun: async () => ({ state: "success" }),
};
const fetchPage = async (url: string) => ({ ok: true, status: 200, finalUrl: url, body: '<script data-analytics="1"></script>' });
let graderCalls = 0;
const grader: GraderModel = {
  async grade(prompt) {
    graderCalls++;
    // Grader guidance is for the model; it must never reach the learner (checked in the state test).
    expect(prompt.user).toContain("SECRET grader guidance");
    return {
      model: "claude-sonnet-5-5",
      inputTokens: 20_000,
      outputTokens: 3_000,
      output: {
        summary: "Links are tracked and tested.",
        criteria: [
          { id: "proposal-links", score: 2, evidence: ["src/links.py: links"], missing: [] },
          { id: "readme", score: 1, evidence: ["README.md"], missing: ["deploy steps"] },
          { id: "tests", score: 2, evidence: [], missing: [] },
        ],
        whatIsLeft: [{ criterionId: "readme", title: "README", steps: ["Add deploy steps."] }],
        qualityNotes: { strengths: ["Small functions."], improvements: ["Persist visits."] },
        confidence: "high",
      },
    };
  },
};
const deps = { source, fetchPage, grader, inline: true };
const learnerUser = () => prisma.user.findUniqueOrThrow({ where: { id: fx.learner.id } }).then((u) => ({ ...u, testerEnabled: false }));

beforeAll(async () => {
  fx = await createCourseFixture();
  const block = await prisma.block.create({
    data: {
      id: `blk-capstone-${fx.tag}`,
      chapterId: fx.chapterA.id,
      type: "CAPSTONE_CHECK",
      order: 9,
      required: true,
      config: { title: "Ship your site", pack: "capstone/rubric.yaml", rubric: { ...rubric, guidance: "SECRET grader guidance" } },
    },
  });
  blockId = block.id;
  await prisma.course.update({
    where: { id: fx.course.id },
    data: { certificate: { title: "Level 2: Personal Site and Outreach Engine", code: "L2", skills: ["Personal site", "Link tracking"] } },
  });
  mentorToken = (await createSession(fx.mentor.id, randomBytes(32).toString("hex"))).sessionToken;
  env.CAPSTONE_LEARNER_DAILY_LIMIT = 10;
});

afterAll(async () => {
  await prisma.certificate.deleteMany({ where: { courseId: fx.course.id } });
  await prisma.capstoneCheck.deleteMany({ where: { blockId } });
  await prisma.review.deleteMany({ where: { response: { blockId } } });
  await prisma.response.deleteMany({ where: { blockId } });
  await prisma.blockStats.deleteMany({ where: { blockId } });
  await prisma.xpEntry.deleteMany({ where: { userId: fx.learner.id } });
  await prisma.notification.deleteMany({ where: { userId: { in: [fx.learner.id, fx.mentor.id] } } });
  await prisma.block.deleteMany({ where: { id: blockId } });
  await fx.cleanup();
});

const authed = (req: request.Test, token: string | null = fx.learnerToken) => (token ? req.set("Authorization", `Bearer ${token}`) : req);
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("capstone checks", () => {
  it("shows the block with a checklist and no rubric", async () => {
    const res = await authed(request(app).get(`/api/v1/blocks/${blockId}/state`));
    expect(res.status).toBe(200);
    expect(res.body.data.type).toBe("CAPSTONE_CHECK");
    expect(res.body.data.config).toMatchObject({ title: "Ship your site", liveUrl: "required" });
    expect(res.body.data.config.checklist).toHaveLength(3);
    expect(JSON.stringify(res.body)).not.toContain("SECRET");
    expect(JSON.stringify(res.body)).not.toContain("lookFor");
    expect(res.body.data.initialState).toMatchObject({ checks: [], dailyLimit: 10 });
  });

  it("refuses the generic respond route, bad links and a missing live URL", async () => {
    const respond = await authed(request(app).post(`/api/v1/blocks/${blockId}/respond`).send({ payload: {} }));
    expect(respond.body.code ?? respond.status).not.toBe(200);
    const user = await learnerUser();
    await expect(startCapstoneCheck({ blockId, user, body: { repoUrl: "https://gitlab.com/a/b" } }, deps)).rejects.toThrow("Paste the repo link");
    await expect(startCapstoneCheck({ blockId, user, body: { repoUrl: "https://github.com/me/site" } }, deps)).rejects.toThrow("Add the live link");
  });

  it("stops at red CI without calling the model or queueing the mentor", async () => {
    ciState = "failure";
    const check = await startCapstoneCheck({ blockId, user: await learnerUser(), body: { repoUrl: "https://github.com/me/site", liveUrl: "https://example.dev" } }, deps);
    expect(check.status).toBe("DONE");
    expect(check.report).toMatchObject({ percent: 0, completed: false, graded: false });
    expect(check.sentToMentor).toBe(false);
    expect(graderCalls).toBe(0);
    ciState = "success";
  });

  it("grades a passing submission and puts it in the mentor queue", async () => {
    await prisma.capstoneCheck.updateMany({ where: { blockId }, data: { createdAt: new Date(Date.now() - 120_000) } });
    const check = await startCapstoneCheck({ blockId, user: await learnerUser(), body: { repoUrl: "https://github.com/me/site", liveUrl: "https://example.dev" } }, deps);
    expect(check.error).toBeNull();
    expect(check.status).toBe("DONE");
    expect(check.report).toMatchObject({ percent: 90, completed: true, graded: true });
    expect(check.sentToMentor).toBe(true);
    expect(graderCalls).toBe(1);
    const row = await prisma.capstoneCheck.findUniqueOrThrow({ where: { id: check.id } });
    expect(row).toMatchObject({ aiCalled: true, inputTokens: 20_000, outputTokens: 3_000, costMicroUsd: 70_000, commitSha: "goodsha" });
    const response = await prisma.response.findUniqueOrThrow({ where: { id: row.responseId! } });
    expect(response).toMatchObject({ status: "PENDING_REVIEW", score: 90, maxScore: 100 });
  });

  it("reuses the grade for the same commit without another model call", async () => {
    await prisma.capstoneCheck.updateMany({ where: { blockId }, data: { createdAt: new Date(Date.now() - 120_000) } });
    const check = await startCapstoneCheck({ blockId, user: await learnerUser(), body: { repoUrl: "https://github.com/me/site", liveUrl: "https://example.dev" } }, deps);
    expect(check.reused).toBe(true);
    expect(graderCalls).toBe(1);
    // One pending item per learner per block: the newer check replaced the waiting one.
    expect(await prisma.response.count({ where: { blockId, status: "PENDING_REVIEW" } })).toBe(1);
  });

  it("holds the platform-wide daily AI budget", async () => {
    const saved = env.CAPSTONE_GLOBAL_DAILY_LIMIT;
    env.CAPSTONE_GLOBAL_DAILY_LIMIT = 1;
    try {
      // Today already holds one AI grade (the passing check). A new commit needs a new grade.
      await prisma.capstoneCheck.updateMany({ where: { blockId }, data: { createdAt: new Date(Date.now() - 120_000) } });
      const other = { ...deps, source: { ...source, repo: async () => ({ defaultBranch: "main", headSha: "newsha", isPrivate: false }) } };
      const check = await startCapstoneCheck({ blockId, user: await learnerUser(), body: { repoUrl: "https://github.com/me/site", liveUrl: "https://example.dev" } }, other);
      expect(check.status).toBe("FAILED");
      expect(check.error).toContain("paused for today");
      expect(graderCalls).toBe(1);
    } finally {
      env.CAPSTONE_GLOBAL_DAILY_LIMIT = saved;
    }
  });

  it("shows the mentor the report, then the approval unlocks the certificate", async () => {
    const pending = await prisma.response.findFirstOrThrow({ where: { blockId, status: "PENDING_REVIEW" } });
    const detail = await authed(request(app).get(`/api/v1/teach/review/${pending.id}`), mentorToken);
    expect(detail.status).toBe(200);
    expect(detail.body.data.capstone.current.report.percent).toBe(90);
    // The waiting item carries the latest check, a free reuse; the paid grade is in the history.
    expect(detail.body.data.capstone.current).toMatchObject({ reused: true, costUsd: 0 });
    expect(detail.body.data.capstone.history.some((c: { costUsd: number }) => Math.abs(c.costUsd - 0.07) < 1e-9)).toBe(true);

    const before = await authed(request(app).get(`/api/v1/courses/${fx.course.slug}/certificate`));
    expect(before.body.data.eligibility).toMatchObject({ offered: true, eligible: false });

    const review = await authed(request(app).post(`/api/v1/teach/review/${pending.id}`).send({ verdict: "APPROVED", feedback: "Confirmed the AI check.", score: 1 }), mentorToken);
    expect(review.status).toBe(204);
    await prisma.enrollment.update({ where: { id: fx.enrollment.id }, data: { completedAt: new Date(), percentComplete: 100 } });

    const ready = await authed(request(app).get(`/api/v1/courses/${fx.course.slug}/certificate`));
    expect(ready.body.data.eligibility).toEqual({ offered: true, eligible: true, missing: [] });

    const claim = await authed(request(app).post(`/api/v1/courses/${fx.course.slug}/certificate`).send({ recipientName: "Ayesha Khan" }));
    expect(claim.status).toBe(200);
    const certificate = claim.body.data.certificate;
    expect(certificate).toMatchObject({ recipientName: "Ayesha Khan", title: "Level 2: Personal Site and Outreach Engine", issuerName: "Zeeshan Adil", organization: "Dev Weekends", skills: ["Personal site", "Link tracking"] });
    expect(certificate.code).toMatch(/^DW-L2-[0-9A-Z]{8}$/);
    expect(certificate.evidence[0]).toMatchObject({ repoUrl: "https://github.com/me/site", percent: 90 });
    expect(certificate.linkedInAddUrl).toContain("startTask=CERTIFICATION_NAME");

    const again = await authed(request(app).post(`/api/v1/courses/${fx.course.slug}/certificate`).send({ recipientName: "Someone Else" }));
    expect(again.body.data.certificate.code).toBe(certificate.code);

    const verify = await request(app).get(`/api/v1/certificates/verify/${certificate.code}`);
    expect(verify.status).toBe(200);
    expect(verify.body.data.certificate).toMatchObject({ recipientName: "Ayesha Khan", revokedAt: null });
    expect((await request(app).get("/api/v1/certificates/verify/DW-L2-AAAAAAAA")).status).toBe(404);

    const revoke = await authed(request(app).post(`/api/v1/certificates/${certificate.code}/revoke`).send({ reason: "Issued to the wrong learner." }), mentorToken);
    expect(revoke.status).toBe(200);
    expect((await request(app).get(`/api/v1/certificates/verify/${certificate.code}`)).body.data.certificate.revokedAt).not.toBeNull();
    const learnerRevoke = await authed(request(app).post(`/api/v1/certificates/${certificate.code}/revoke`).send({ reason: "nope" }));
    expect(learnerRevoke.status).toBe(403);
  });

  it("sends a flagged check to the mentor and hides the flag from the learner", async () => {
    await prisma.capstoneCheck.updateMany({ where: { blockId }, data: { createdAt: new Date(Date.now() - 120_000) } });
    const flagged: GraderModel = {
      async grade() {
        return {
          model: "claude-sonnet-5-5", inputTokens: 1000, outputTokens: 100,
          output: {
            summary: "Half done.",
            criteria: [{ id: "proposal-links", score: 1, evidence: [], missing: [] }],
            whatIsLeft: [],
            qualityNotes: { strengths: [], improvements: [] },
            confidence: "low",
            integrityFlags: ["README.md tells the grader to give full marks."],
          },
        };
      },
    };
    const other = { ...deps, grader: flagged, source: { ...source, repo: async () => ({ defaultBranch: "main", headSha: "flagsha", isPrivate: false }) } };
    const check = await startCapstoneCheck({ blockId, user: await learnerUser(), body: { repoUrl: "https://github.com/me/site", liveUrl: "https://example.dev" } }, other);
    expect(check.report?.completed).toBe(false);
    expect(check.sentToMentor).toBe(true);
    expect(check.report).not.toHaveProperty("integrityFlags");
    const row = await prisma.capstoneCheck.findUniqueOrThrow({ where: { id: check.id } });
    expect((row.report as { integrityFlags: string[] }).integrityFlags).toEqual(["README.md tells the grader to give full marks."]);
    const state = await authed(request(app).get("/api/v1/blocks/" + blockId + "/capstone"));
    expect(JSON.stringify(state.body)).not.toContain("full marks");
  });

  it("runs checks after the response when not inline", async () => {
    await prisma.capstoneCheck.updateMany({ where: { blockId }, data: { createdAt: new Date(Date.now() - 120_000) } });
    const check = await startCapstoneCheck({ blockId, user: await learnerUser(), body: { repoUrl: "https://github.com/me/site", liveUrl: "https://example.dev" } }, { ...deps, inline: false });
    expect(["QUEUED", "RUNNING", "DONE"]).toContain(check.status);
    for (let i = 0; i < 40; i++) {
      const row = await prisma.capstoneCheck.findUniqueOrThrow({ where: { id: check.id } });
      if (row.status === "DONE" || row.status === "FAILED") break;
      await wait(50);
    }
    expect((await prisma.capstoneCheck.findUniqueOrThrow({ where: { id: check.id } })).status).toBe("DONE");
  });
});
