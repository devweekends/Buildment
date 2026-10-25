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
const putCamera = (attemptId: string, status: "ON" | "DECLINED" | "UNAVAILABLE", headers = learner()) =>
  request(app).put(`/api/v1/integrity/attempts/${attemptId}/camera`).set(headers).send({ status });
/** The learner turned the camera on in the browser, then pressed Start. */
const start = async (attemptId: string) => {
  await putCamera(attemptId, "ON");
  return begin(attemptId);
};
const submit = () =>
  request(app)
    .post(`/api/v1/chapters/${fx.chapterB.id}/quiz/submit`)
    .set(learner())
    .send({ answers: fx.quizChapterBlocks.map((block) => ({ blockId: block.id, selected: ["b"] })) });

/** Leave events `secondsAgo` seconds in the past (the server clamps times far from the attempt). */
const leave = (type: "TAB_HIDDEN" | "WINDOW_BLUR" | "FULLSCREEN_EXIT" | "CAMERA_LOST", secondsAgo: number) => ({
  id: eventId(),
  type,
  at: new Date(Date.now() - secondsAgo * 1000).toISOString(),
});
const postEvents = (attemptId: string, events: unknown[]) =>
  request(app).post(`/api/v1/integrity/attempts/${attemptId}/events`).set(learner()).send({ events });

const PROMPT = QUIZ_CONFIG.prompt;
/** The attempt the learner started in the Start test; later tests keep using it so no page is "reopened". */
let liveAttempt = "";
const heartbeat = (attemptId: string, headers = learner()) =>
  request(app).post(`/api/v1/integrity/attempts/${attemptId}/heartbeat`).set(headers);
const latestAttempt = () =>
  prisma.integrityAttempt.findFirstOrThrow({ where: { enrollmentId: fx.enrollment.id, chapterId: fx.chapterB.id }, orderBy: { attempt: "desc" } });
/** Pretend the last camera proof was `seconds` ago. */
const ageHeartbeat = (attemptId: string, seconds: number) =>
  prisma.integrityAttempt.update({ where: { id: attemptId }, data: { cameraLiveAt: new Date(Date.now() - seconds * 1000) } });

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

describe("the camera", () => {
  it("must be live before the quiz can start, and nothing starts without it", async () => {
    const attempt = (await openAttempt()).body.data;
    expect(attempt.camera).toMatchObject({ required: true, enabled: false, status: "NOT_REQUESTED" });

    const refused = await begin(attempt.attemptId);
    expect(refused.status).toBe(403);
    expect(refused.body.code ?? refused.body.error?.code).toBe("CAMERA_REQUIRED");
    expect((await blockState()).status).toBe(403);

    for (const status of ["DECLINED", "UNAVAILABLE"] as const) {
      await putCamera(attempt.attemptId, status);
      expect((await begin(attempt.attemptId)).status).toBe(403);
    }
    expect(await prisma.integrityAttempt.findUniqueOrThrow({ where: { id: attempt.attemptId }, select: { questionsShownAt: true } })).toEqual({ questionsShownAt: null });
  });

  it("is kept on the device: no stills are stored unless the course opted in", async () => {
    const attempt = (await openAttempt()).body.data;
    expect((await putCamera(attempt.attemptId, "ON")).body.data.status).toBe("ON");
    const still = await request(app)
      .post(`/api/v1/integrity/attempts/${attempt.attemptId}/snapshots`)
      .set({ ...learner(), "Content-Type": "image/jpeg" })
      .send(Buffer.concat([Buffer.from([0xff, 0xd8, 0xff, 0xe0]), Buffer.alloc(2000, 7)]));
    expect(still.status).toBe(403);
    expect(await prisma.integritySnapshot.count({ where: { attemptId: attempt.attemptId } })).toBe(0);
    await putCamera(attempt.attemptId, "UNAVAILABLE");
  });

  it("is not asked of a normal quiz", async () => {
    await setProctored(false);
    try {
      const attempt = (await openAttempt()).body.data;
      expect(attempt.camera.required).toBe(false);
      expect((await putCamera(attempt.attemptId, "ON")).body.data.status).toBe("NOT_REQUESTED");
    } finally {
      await setProctored(true);
    }
  });
});

describe("Start", () => {
  it("sends the questions only to the learner who started, and only that attempt's owner can start it", async () => {
    const { attemptId } = (await openAttempt()).body.data;
    expect((await begin(attemptId, bearer(strangerToken))).status).toBe(404);
    expect((await blockState()).status).toBe(403);

    expect((await start(attemptId)).body.data).toEqual({ questionsShown: true });
    expect((await begin(attemptId)).status).toBe(200);
    liveAttempt = attemptId;

    const state = await quizState();
    expect(state.body.data).toMatchObject({ proctored: true, started: true });
    const block = await blockState();
    expect(block.status).toBe(200);
    expect(JSON.stringify(block.body)).toContain(PROMPT);
    expect(block.headers["cache-control"]).toBe("no-store");
  });
});

describe("the leave rule", () => {
  it("warns twice, then locks the attempt on the third time the learner leaves", async () => {
    const attemptId = liveAttempt;

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
    await putCamera(attempt.attemptId, "ON");
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
    await start(next.attemptId);
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

describe("the camera heartbeat", () => {
  it("sends questions only while the browser keeps proving a live camera", async () => {
    const attempt = await latestAttempt();
    expect(attempt.attempt).toBe(2);
    await heartbeat(attempt.id).expect(200);
    expect((await blockState()).status).toBe(200);
    expect((await quizState()).body.data.started).toBe(true);

    // The beats stop (page closed, camera gone, network down): the questions are withheld again.
    await ageHeartbeat(attempt.id, PROCTORED_RULE.cameraFreshSeconds + 5);
    const lapsed = await blockState();
    expect(lapsed.status).toBe(403);
    expect(JSON.stringify(lapsed.body)).not.toContain(PROMPT);
    expect((await quizState()).body.data.started).toBe(false);
    await prisma.integrityAttempt.update({ where: { id: attempt.id }, data: { cameraLiveAt: null } });

    // The next beat brings them back.
    await heartbeat(attempt.id).expect(200);
    expect((await blockState()).status).toBe(200);
  });

  it("is refused before Start, for a stranger, and when the camera is not on", async () => {
    const attempt = await latestAttempt();
    expect((await heartbeat(attempt.id, bearer(strangerToken))).status).toBe(404);
    await putCamera(attempt.id, "UNAVAILABLE");
    expect((await heartbeat(attempt.id)).status).toBe(403);
    // Losing the camera hides the questions at once, without waiting for the beat to lapse.
    expect((await blockState()).status).toBe(403);
    await putCamera(attempt.id, "ON");
    await heartbeat(attempt.id).expect(200);
    expect((await blockState()).status).toBe(200);
  });
});

describe("reloading the page mid-attempt", () => {
  it("counts as leaving, takes the camera away and sends no question until the camera is proven again", async () => {
    const before = await latestAttempt();
    const reopened = await openAttempt();
    expect(reopened.body.data.attemptId).toBe(before.id);
    expect(reopened.body.data).toMatchObject({ leaves: 1, locked: false, questionsShown: false, camera: { status: "NOT_REQUESTED" } });
    expect(await prisma.integrityEvent.count({ where: { attemptId: before.id, type: "PAGE_RELOAD" } })).toBe(1);

    // Nothing the browser remembers helps: no question content, no state, no heartbeat.
    const refused = await blockState();
    expect(refused.status).toBe(403);
    expect(JSON.stringify(refused.body)).not.toContain(PROMPT);
    expect((await quizState()).body.data.started).toBe(false);
    expect((await heartbeat(before.id)).status).toBe(403);
    expect((await begin(before.id)).status).toBe(403);

    // Through the gate again: camera on, Start.
    expect((await start(before.id)).body.data).toEqual({ questionsShown: true });
    expect((await blockState()).status).toBe(200);
  });

  it("locks the attempt on the third reload or reopened tab, each counted once", async () => {
    const attempt = await latestAttempt();
    // Two reopens within a moment are one incident; a later one is another.
    await prisma.integrityEvent.updateMany({ where: { attemptId: attempt.id, type: "PAGE_RELOAD" }, data: { at: new Date(Date.now() - 60_000) } });
    const second = await openAttempt();
    const secondAgain = await openAttempt();
    expect(second.body.data.leaves).toBe(2);
    expect(secondAgain.body.data.leaves).toBe(2);

    await prisma.integrityEvent.updateMany({ where: { attemptId: attempt.id, type: "PAGE_RELOAD", at: { gt: new Date(Date.now() - 30_000) } }, data: { at: new Date(Date.now() - 30_000) } });
    const third = await openAttempt();
    expect(third.body.data).toMatchObject({ leaves: PROCTORED_RULE.limit, locked: true, questionsShown: false });
    expect((await blockState()).status).toBe(403);
    expect((await submit()).status).toBe(200);
  });
});

describe("a finished proctored chapter", () => {
  it("can be reviewed without a new Start", async () => {
    await completeChapter(fx.enrollment.id, fx.chapterB.id);
    expect((await quizState()).body.data.started).toBe(true);
    expect((await blockState()).status).toBe(200);
  });
});
