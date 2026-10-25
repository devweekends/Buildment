import { randomBytes } from "node:crypto";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../../src/app.js";
import { prisma } from "../../src/db/prisma.js";
import { PROCTORED_RULE, type IntegrityEventType } from "../../src/shared/api/integrity.js";
import { completeChapter, createCourseFixture } from "../helpers/fixtures.js";

// The server is the source of truth for the two-warning rule. These tests send what
// each real signal produces (window blur, focus loss, full screen exit, tab hide,
// camera loss) and check the counter the learner is shown and the lock.

const app = createApp();
let fx: Awaited<ReturnType<typeof createCourseFixture>>;

beforeAll(async () => {
  fx = await createCourseFixture();
  await completeChapter(fx.enrollment.id, fx.chapterA.id);
  await prisma.chapter.update({ where: { id: fx.chapterB.id }, data: { proctored: true } });
});

afterAll(async () => {
  await fx.cleanup();
});

// Handing the answers in ends the attempt, so every test starts on a fresh one.
afterEach(async () => {
  await submit().expect(200);
});

const learner = () => ({ Authorization: `Bearer ${fx.learnerToken}` });
const eventId = () => randomBytes(9).toString("base64url");
const at = (secondsAgo: number) => new Date(Date.now() - secondsAgo * 1000).toISOString();
const event = (type: IntegrityEventType, secondsAgo: number) => ({ id: eventId(), type, at: at(secondsAgo) });
const post = (attemptId: string, events: unknown[]) =>
  request(app).post(`/api/v1/integrity/attempts/${attemptId}/events`).set(learner()).send({ events });

/** A started attempt: camera live, Start pressed. */
async function startedAttempt() {
  const { attemptId } = (await request(app).post(`/api/v1/chapters/${fx.chapterB.id}/integrity`).set(learner())).body.data;
  await request(app).put(`/api/v1/integrity/attempts/${attemptId}/camera`).set(learner()).send({ status: "ON" }).expect(200);
  await request(app).post(`/api/v1/integrity/attempts/${attemptId}/begin`).set(learner()).expect(200);
  return attemptId as string;
}

const submit = () =>
  request(app)
    .post(`/api/v1/chapters/${fx.chapterB.id}/quiz/submit`)
    .set(learner())
    .send({ answers: fx.quizChapterBlocks.map((block) => ({ blockId: block.id, selected: ["b"] })) });

describe("each leave and return counts once", () => {
  it("counts a blur, then a second and a third leave a few seconds apart, and locks on the third", async () => {
    const attemptId = await startedAttempt();

    // Window blur (switched to another app), then back.
    const first = await post(attemptId, [event("WINDOW_BLUR", 60)]);
    expect(first.body.data).toMatchObject({ leaves: 1, locked: false });

    // Back for a few seconds, then away again: a new incident, not part of the first.
    const second = await post(attemptId, [event("WINDOW_BLUR", 54)]);
    expect(second.body.data).toMatchObject({ leaves: 2, locked: false });

    const third = await post(attemptId, [event("WINDOW_BLUR", 48)]);
    expect(third.body.data).toMatchObject({ leaves: PROCTORED_RULE.limit, locked: true });
    expect((await request(app).get(`/api/v1/blocks/${fx.quizChapterBlocks[0]!.id}/state`).set(learner())).status).toBe(403);
  });

  it("counts blur, tab hide and full screen exit of one Alt+Tab as one leave", async () => {
    const attemptId = await startedAttempt();
    const res = await post(attemptId, [event("WINDOW_BLUR", 60), event("TAB_HIDDEN", 59.6), event("FULLSCREEN_EXIT", 59)]);
    expect(res.body.data).toMatchObject({ leaves: 1, locked: false });
  });

  it("counts every signal type the browser and the desktop app send, one leave each", async () => {
    const attemptId = await startedAttempt();
    const types: IntegrityEventType[] = ["TAB_HIDDEN", "FULLSCREEN_EXIT"];
    let expected = 0;
    for (const [index, type] of types.entries()) {
      const res = await post(attemptId, [event(type, 80 - index * 20)]);
      expected += 1;
      expect(res.body.data).toMatchObject({ leaves: expected, locked: false });
    }
    // Losing the camera is a leave too.
    const camera = await post(attemptId, [event("CAMERA_LOST", 10)]);
    expect(camera.body.data).toMatchObject({ leaves: 3, locked: true });
  });

  it("does not count a retried batch twice", async () => {
    const attemptId = await startedAttempt();
    const batch = [event("TAB_HIDDEN", 30)];
    expect((await post(attemptId, batch)).body.data.leaves).toBe(1);
    expect((await post(attemptId, batch)).body.data.leaves).toBe(1);
  });

  it("counts a leave sent in the same batch as other events, in any order", async () => {
    const attemptId = await startedAttempt();
    const res = await post(attemptId, [
      event("FULLSCREEN_EXIT", 20),
      event("WINDOW_BLUR", 100),
      event("COPY_BLOCKED", 50),
      event("TAB_HIDDEN", 60),
    ]);
    expect(res.body.data).toMatchObject({ leaves: 3, locked: true });
  });

  it("keeps the face checks and blocked actions as notes that never count", async () => {
    const attemptId = await startedAttempt();
    const res = await post(attemptId, [
      event("NO_FACE", 90),
      event("MULTIPLE_FACES", 70),
      event("PRINT_BLOCKED", 50),
      event("NAVIGATION_BLOCKED", 30),
    ]);
    expect(res.body.data).toMatchObject({ accepted: 4, leaves: 0, locked: false });
    expect(res.body.data.flagCount).toBe(4);
  });

  it("returns the count again when the page reopens, and a reload counts as a leave, so it cannot reset the warnings", async () => {
    const attemptId = await startedAttempt();
    await post(attemptId, [event("TAB_HIDDEN", 60)]);
    await post(attemptId, [event("WINDOW_BLUR", 40)]);
    const reopened = await request(app).post(`/api/v1/chapters/${fx.chapterB.id}/integrity`).set(learner());
    // The reload itself is the third leave, so the attempt locks and shows no question.
    expect(reopened.body.data).toMatchObject({ attemptId, leaves: 3, locked: true, questionsShown: false });
  });
});
