import { randomBytes } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../../src/app.js";
import { prisma } from "../../src/db/prisma.js";
import { createSession } from "../../src/services/auth/session.js";
import { PROCTORED_RULE } from "../../src/shared/api/integrity.js";
import { completeChapter, createCourseFixture, QUIZ_CONFIG } from "../helpers/fixtures.js";

// A proctored quiz is the strict kind: its questions are not sent before Start (or after
// the attempt is locked) and the server counts the times the learner left the quiz
// screen. A normal quiz behaves as it always did.

const app = createApp();
let fx: Awaited<ReturnType<typeof createCourseFixture>>;
let mentorToken = "";
let strangerToken = "";
let strangerId = "";

beforeAll(async () => {
  fx = await createCourseFixture();
  await completeChapter(fx.enrollment.id, fx.chapterA.id);
  mentorToken = (await createSession(fx.mentor.id)).sessionToken;
  const stranger = await prisma.user.create({
    data: { email: `stranger-${fx.tag}@test.local`, role: "MENTEE", emailVerified: new Date() },
  });
  strangerId = stranger.id;
  strangerToken = (await createSession(stranger.id)).sessionToken;
});

afterAll(async () => {
  await prisma.session.deleteMany({ where: { userId: strangerId } });
  await prisma.user.delete({ where: { id: strangerId } });
  await fx.cleanup();
});

const bearer = (token: string) => ({ Authorization: `Bearer ${token}` });
const learner = () => bearer(fx.learnerToken);
const eventId = () => randomBytes(9).toString("base64url");
const setProctored = (proctored: boolean) => prisma.chapter.update({ where: { id: fx.chapterB.id }, data: { proctored } });

const quizState = () => request(app).get(`/api/v1/chapters/${fx.chapterB.id}/quiz`).set(learner());
const blockState = (headers: Record<string, string> = learner()) =>
  request(app).get(`/api/v1/blocks/${fx.quizChapterBlocks[0]!.id}/state`).set(headers);
const openAttempt = () => request(app).post(`/api/v1/chapters/${fx.chapterB.id}/integrity`).set(learner());
const begin = (attemptId: string, headers = learner()) =>
  request(app).post(`/api/v1/integrity/attempts/${attemptId}/begin`).set(headers);
const submit = () =>
  request(app)
    .post(`/api/v1/chapters/${fx.chapterB.id}/quiz/submit`)
    .set(learner())
    .send({ answers: fx.quizChapterBlocks.map((block) => ({ blockId: block.id, selected: ["b"] })) });

/** Leave events `secondsAgo` seconds in the past (the server clamps times far from the attempt). */
const leave = (type: "TAB_HIDDEN" | "WINDOW_BLUR" | "FULLSCREEN_EXIT", secondsAgo: number) => ({
  id: eventId(),
  type,
  at: new Date(Date.now() - secondsAgo * 1000).toISOString(),
});
const postEvents = (attemptId: string, events: unknown[]) =>
  request(app).post(`/api/v1/integrity/attempts/${attemptId}/events`).set(learner()).send({ events });

const PROMPT = QUIZ_CONFIG.prompt;

describe("a normal quiz", () => {
  beforeAll(async () => {
    await setProctored(false);
  });

  it("sends its questions at once, with no gate and no lock", async () => {
    const state = await quizState();
    expect(state.body.data).toMatchObject({ proctored: false, started: true });
    const block = await blockState();
    expect(block.status).toBe(200);
    expect(JSON.stringify(block.body)).toContain(PROMPT);

    const attempt = await openAttempt();
    expect(attempt.body.data).toMatchObject({ proctored: false, questionsShown: true, locked: false, leaves: 0 });
  });

  it("never locks, however often the learner leaves", async () => {
    const { attemptId } = (await openAttempt()).body.data;
    const res = await postEvents(attemptId, [leave("TAB_HIDDEN", 100), leave("TAB_HIDDEN", 60), leave("TAB_HIDDEN", 20), leave("TAB_HIDDEN", 2)]);
    expect(res.body.data).toMatchObject({ accepted: 4, leaves: 0, locked: false });
    expect((await blockState()).status).toBe(200);
  });
});

describe("a proctored quiz before Start", () => {
  beforeAll(async () => {
    await setProctored(true);
  });

  it("reports itself as proctored and not started, with no question content", async () => {
    const res = await quizState();
    expect(res.status).toBe(200);
    expect(res.body.data).toMatchObject({ proctored: true, started: false });
    expect(res.headers["cache-control"]).toBe("no-store");
    expect(JSON.stringify(res.body)).not.toContain(PROMPT);
  });

  it("refuses each question's state to the learner, the signed-out and strangers", async () => {
    for (const headers of [learner(), bearer(strangerToken), {}]) {
      const res = await blockState(headers);
      expect(res.status).toBe(403);
      expect(res.body.error?.code ?? res.body.code).toBe("QUIZ_NOT_STARTED");
      expect(JSON.stringify(res.body)).not.toContain(PROMPT);
    }
  });

  it("lets the course mentor read the questions to check them", async () => {
    const res = await blockState(bearer(mentorToken));
    expect(res.status).toBe(200);
    expect(JSON.stringify(res.body)).toContain(PROMPT);
  });

  it("keeps the questions out of the chapter reader payload", async () => {
    const res = await request(app).get(`/api/v1/courses/${fx.course.slug}/chapters/chapter-b`).set(learner());
    expect(res.status).toBe(200);
    expect(res.body.data.chapter).toMatchObject({ readerMode: "QUIZ", proctored: true });
    expect(JSON.stringify(res.body)).not.toContain(PROMPT);
  });

  it("takes no submitted answers before Start", async () => {
    expect((await submit()).status).toBe(403);
    const openQuestion = await prisma.block.create({
      data: { id: `blk-oq-${fx.tag}`, chapterId: fx.chapterB.id, type: "OPEN_QUESTION", order: 9, config: { prompt: "Why?", minWords: 0 } },
    });
    try {
      const res = await request(app).post(`/api/v1/blocks/${openQuestion.id}/respond`).set(learner()).send({ text: "Because." });
      expect(res.status).toBe(403);
      expect(await prisma.response.count({ where: { blockId: openQuestion.id } })).toBe(0);
    } finally {
      await prisma.block.delete({ where: { id: openQuestion.id } });
    }
  });

  it("opens an attempt that says the questions are not shown yet", async () => {
    const res = await openAttempt();
    expect(res.body.data).toMatchObject({ attempt: 1, proctored: true, questionsShown: false, locked: false, leaves: 0 });
  });

  it("does not count leaving the screen before Start", async () => {
    const { attemptId } = (await openAttempt()).body.data;
    const res = await postEvents(attemptId, [leave("TAB_HIDDEN", 100), leave("TAB_HIDDEN", 60), leave("TAB_HIDDEN", 20)]);
    expect(res.body.data).toMatchObject({ leaves: 0, locked: false });
  });
});

describe("Start", () => {
  it("sends the questions only to the learner who started, and only that attempt's owner can start it", async () => {
    const { attemptId } = (await openAttempt()).body.data;
    expect((await begin(attemptId, bearer(strangerToken))).status).toBe(404);
    expect((await blockState()).status).toBe(403);

    expect((await begin(attemptId)).body.data).toEqual({ questionsShown: true });
    expect((await begin(attemptId)).status).toBe(200);

    const state = await quizState();
    expect(state.body.data).toMatchObject({ proctored: true, started: true });
    const block = await blockState();
    expect(block.status).toBe(200);
    expect(JSON.stringify(block.body)).toContain(PROMPT);
    expect(block.headers["cache-control"]).toBe("no-store");
    expect((await openAttempt()).body.data).toMatchObject({ questionsShown: true, locked: false });
  });
});

describe("the leave rule", () => {
  it("warns twice, then locks the attempt on the third time the learner leaves", async () => {
    const { attemptId } = (await openAttempt()).body.data;

    // Blur, hidden and full screen exit from one Alt+Tab are one incident.
    const first = await postEvents(attemptId, [leave("WINDOW_BLUR", 100), leave("TAB_HIDDEN", 99), leave("FULLSCREEN_EXIT", 98)]);
    expect(first.body.data).toMatchObject({ leaves: 1, locked: false });

    // Blocked actions are notes for the mentor, never an incident.
    const blocked = await postEvents(attemptId, [
      { id: eventId(), type: "COPY_BLOCKED", at: new Date().toISOString() },
      { id: eventId(), type: "PRINT_BLOCKED", at: new Date().toISOString() },
      { id: eventId(), type: "NAVIGATION_BLOCKED", at: new Date().toISOString() },
    ]);
    expect(blocked.body.data).toMatchObject({ leaves: 1, locked: false });

    const second = await postEvents(attemptId, [leave("TAB_HIDDEN", 60)]);
    expect(second.body.data).toMatchObject({ leaves: 2, locked: false });
    expect((await blockState()).status).toBe(200);

    const third = await postEvents(attemptId, [leave("WINDOW_BLUR", 20)]);
    expect(third.body.data).toMatchObject({ leaves: PROCTORED_RULE.limit, locked: true });
    const row = await prisma.integrityAttempt.findUniqueOrThrow({ where: { id: attemptId }, select: { lockedAt: true } });
    expect(row.lockedAt).not.toBeNull();
  });

  it("holds the questions back again once locked, and Start cannot undo it", async () => {
    const attempt = (await openAttempt()).body.data;
    expect(attempt).toMatchObject({ locked: true, questionsShown: false, leaves: PROCTORED_RULE.limit });
    expect((await blockState()).status).toBe(403);
    expect((await quizState()).body.data.started).toBe(false);
    expect((await begin(attempt.attemptId)).body.data).toEqual({ questionsShown: false });
    expect((await blockState()).status).toBe(403);
  });

  it("still takes the locked attempt's answers so they can be handed in, then asks for a new Start", async () => {
    const res = await submit();
    expect(res.status).toBe(200);
    expect(res.body.data).toMatchObject({ score: 0, maxScore: 2 });

    const next = (await openAttempt()).body.data;
    expect(next).toMatchObject({ attempt: 2, proctored: true, questionsShown: false, locked: false, leaves: 0 });
    expect((await blockState()).status).toBe(403);
    await begin(next.attemptId);
    expect((await blockState()).status).toBe(200);
  });

  it("shows the mentor which attempt was locked", async () => {
    const res = await request(app).get(`/api/v1/teach/courses/${fx.course.slug}/mentees/${fx.enrollment.id}`).set(bearer(mentorToken));
    const attempts = res.body.data.integrity as Array<{ attempt: number; locked: boolean; counts: Record<string, number> }>;
    expect(attempts.find((attempt) => attempt.attempt === 1)).toMatchObject({ locked: true });
    expect(attempts.find((attempt) => attempt.attempt === 2)).toMatchObject({ locked: false });
    expect(attempts.find((attempt) => attempt.attempt === 1)?.counts).toMatchObject({ PRINT_BLOCKED: 1, NAVIGATION_BLOCKED: 1 });
  });
});

describe("a finished proctored chapter", () => {
  it("can be reviewed without a new Start", async () => {
    await completeChapter(fx.enrollment.id, fx.chapterB.id);
    expect((await quizState()).body.data.started).toBe(true);
    expect((await blockState()).status).toBe(200);
  });
});
