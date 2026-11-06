import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../../src/app.js";
import { prisma } from "../../src/db/prisma.js";
import { createCourseFixture } from "../helpers/fixtures.js";

const app = createApp();
let fx: Awaited<ReturnType<typeof createCourseFixture>>;

beforeAll(async () => {
  fx = await createCourseFixture();
});
afterAll(async () => {
  await prisma.courseRating.deleteMany({ where: { courseId: fx.course.id } });
  await fx.cleanup();
});

const learner = () => ({ Authorization: `Bearer ${fx.learnerToken}` });

describe("/api/v1/courses/:courseSlug/rating", () => {
  it("refuses a rating before the course is complete", async () => {
    const res = await request(app)
      .put(`/api/v1/courses/${fx.course.slug}/rating`)
      .set(learner())
      .send({ rating: 5, review: "Great course." });
    expect(res.status).toBe(403);
  });

  it("accepts one editable rating and updates the catalog aggregate", async () => {
    await prisma.enrollment.update({
      where: { id: fx.enrollment.id },
      data: { status: "COMPLETED" },
    });

    const invalid = await request(app)
      .put(`/api/v1/courses/${fx.course.slug}/rating`)
      .set(learner())
      .send({ rating: 6 });
    expect(invalid.status).toBe(400);

    const created = await request(app)
      .put(`/api/v1/courses/${fx.course.slug}/rating`)
      .set(learner())
      .send({ rating: 5, review: "Clear, practical, and worth the time." });
    expect(created.status).toBe(200);
    expect(created.body.data).toMatchObject({ rating: 5, review: "Clear, practical, and worth the time." });

    const mine = await request(app).get(`/api/v1/courses/${fx.course.slug}/rating`).set(learner());
    expect(mine.body.data.rating).toMatchObject({ rating: 5 });

    const catalog = await request(app).get(`/api/v1/catalog/${fx.course.slug}`);
    expect(catalog.body.data).toMatchObject({ ratingAverage: 5, ratingCount: 1 });

    const reviews = await request(app).get(`/api/v1/catalog/${fx.course.slug}/reviews`);
    expect(reviews.status).toBe(200);
    expect(reviews.body.data).toMatchObject({ count: 1, average: 5 });
    expect(reviews.body.data.items[0]).toMatchObject({ rating: 5, reviewer: "Test L." });

    // Editing must replace, not add a second rating.
    const updated = await request(app)
      .put(`/api/v1/courses/${fx.course.slug}/rating`)
      .set(learner())
      .send({ rating: 3, review: null });
    expect(updated.status).toBe(200);

    const after = await request(app).get(`/api/v1/courses/${fx.course.slug}/rating`).set(learner());
    expect(after.body.data.rating).toMatchObject({ rating: 3, review: null });

    const catalogAfter = await request(app).get(`/api/v1/catalog/${fx.course.slug}`);
    expect(catalogAfter.body.data).toMatchObject({ ratingAverage: 3, ratingCount: 1 });
  });

  it("remembers a dismissed prompt so the full card does not return", async () => {
    const res = await request(app)
      .post(`/api/v1/courses/${fx.course.slug}/rating/dismiss`)
      .set(learner());
    expect(res.status).toBe(200);

    const overview = await request(app)
      .get(`/api/v1/courses/${fx.course.slug}/overview`)
      .set(learner());
    expect(overview.body.data.ratingDismissed).toBe(true);
  });

  it("rejects an unverified learner", async () => {
    const res = await request(app)
      .put(`/api/v1/courses/${fx.course.slug}/rating`)
      .set({ Authorization: `Bearer ${fx.unverifiedToken}` })
      .send({ rating: 4 });
    expect(res.status).toBe(403);
  });
});
