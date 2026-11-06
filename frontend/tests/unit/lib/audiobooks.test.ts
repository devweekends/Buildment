import { describe, expect, it } from "vitest";
import {
  bookListening,
  buildAudiobook,
  chapterTitleFromSlug,
  formatBookLength,
  formatPlayerClock,
  manifestTracks,
  resumeTarget,
  type BookState,
} from "../../../src/lib/audiobooks";
import { coverPalette, coverSvg, layoutTitle } from "../../../src/lib/audiobook-cover";
import { COURSE_CATEGORY_INFO, categoryFromParam } from "../../../src/lib/course-categories";
import { COURSE_CATEGORIES } from "../../../src/shared/domain/enums";

const BASE = "https://audio.example.com";
const MANIFEST = {
  version: 1,
  chapters: {
    "2-1-set-the-scene": { file: "02.01-set-the-scene.mp3", minutes: 2, bytes: 1 },
    "1-10-wrap-up": { file: "01.10-wrap-up.mp3", minutes: 1.5, bytes: 1 },
    "1-2-roles-and-expectations": { file: "01.02-roles-and-expectations.mp3", minutes: 4, bytes: 1 },
    "1-3-broken": { file: "../evil.sh", minutes: 2, bytes: 1 },
    "1-4-empty": { file: "01.04-empty.mp3", minutes: 0, bytes: 1 },
  },
};
const COURSE = { slug: "collaboration", title: "Collaboration", description: null, category: "SOFT_SKILLS" as const, subcategory: null };

describe("manifestTracks", () => {
  it("keeps playable chapters in course order with part and chapter numbers", () => {
    const tracks = manifestTracks(MANIFEST, BASE, "collaboration");
    expect(tracks.map((t) => t.slug)).toEqual(["1-2-roles-and-expectations", "1-10-wrap-up", "2-1-set-the-scene"]);
    expect(tracks[0]).toMatchObject({ title: "Roles and expectations", part: 1, chapter: 2, src: `${BASE}/collaboration/01.02-roles-and-expectations.mp3` });
    expect(tracks[2]).toMatchObject({ part: 2, chapter: 1 });
  });

  it("returns nothing for a missing or broken manifest", () => {
    expect(manifestTracks(null, BASE, "x")).toEqual([]);
    expect(manifestTracks({ chapters: {} }, BASE, "x")).toEqual([]);
    expect(manifestTracks("<html>Not Found</html>", BASE, "x")).toEqual([]);
  });

  it("reads titles from slugs", () => {
    expect(chapterTitleFromSlug("3.2-why-caches-help")).toBe("Why caches help");
  });
});

describe("buildAudiobook", () => {
  const tracks = manifestTracks(MANIFEST, BASE, "collaboration");

  it("groups tracks into parts and uses the course outline for titles", () => {
    const book = buildAudiobook(COURSE, tracks, {
      modules: [
        { order: 1, title: "How good teams work", chapters: [{ order: 2, title: "Roles, and expectations" }] },
        { order: 2, title: "Feedback", chapters: [] },
      ],
    })!;
    expect(book.author).toBe("Zeeshan Adil");
    expect(book.totalMinutes).toBeCloseTo(7.5);
    expect(book.tracks[0]!.title).toBe("Roles, and expectations");
    expect(book.tracks[1]!.title).toBe("Wrap up");
    expect(book.parts).toEqual([
      { number: 1, title: "How good teams work", firstTrack: 0, trackCount: 2, minutes: 5.5 },
      { number: 2, title: "Feedback", firstTrack: 2, trackCount: 1, minutes: 2 },
    ]);
  });

  it("has no book without audio", () => {
    expect(buildAudiobook(COURSE, [])).toBeNull();
  });
});

describe("listening progress", () => {
  const book = buildAudiobook(COURSE, manifestTracks(MANIFEST, BASE, "collaboration"))!;

  it("starts a new book at chapter one", () => {
    expect(resumeTarget(book, undefined)).toEqual({ index: 0, at: 0, finished: false });
    expect(bookListening(book, undefined)).toMatchObject({ started: false, fraction: 0, leftMinutes: 7.5 });
  });

  it("resumes the chapter heard last, mid-way", () => {
    const state: BookState = {
      track: "1-10-wrap-up",
      at: 1,
      tracks: { "1-2-roles-and-expectations": { p: 240, d: 240, done: true }, "1-10-wrap-up": { p: 30, d: 90 } },
    };
    expect(resumeTarget(book, state)).toEqual({ index: 1, at: 30, finished: false });
    const listening = bookListening(book, state);
    expect(listening.listenedMinutes).toBeCloseTo(4.5);
    expect(listening.leftMinutes).toBeCloseTo(3);
    expect(listening.doneCount).toBe(1);
  });

  it("moves on to the next unfinished chapter once the last one was finished", () => {
    const state: BookState = { track: "1-10-wrap-up", at: 1, tracks: { "1-10-wrap-up": { p: 90, d: 90, done: true } } };
    expect(resumeTarget(book, state)).toEqual({ index: 2, at: 0, finished: false });
  });

  it("starts again from the top when every chapter is done", () => {
    const tracks = Object.fromEntries(book.tracks.map((t) => [t.slug, { p: 1, d: 1, done: true }]));
    const state: BookState = { track: "2-1-set-the-scene", at: 1, tracks };
    expect(resumeTarget(book, state)).toEqual({ index: 0, at: 0, finished: true });
    expect(bookListening(book, state)).toMatchObject({ finished: true, leftMinutes: 0, fraction: 1 });
  });

  it("ignores a position in the first or last seconds", () => {
    const state: BookState = { track: "1-2-roles-and-expectations", at: 1, tracks: { "1-2-roles-and-expectations": { p: 2, d: 240 } } };
    expect(resumeTarget(book, state).at).toBe(0);
    state.tracks["1-2-roles-and-expectations"] = { p: 238.5, d: 240 };
    expect(resumeTarget(book, state).at).toBe(0);
  });
});

describe("formatting", () => {
  it("writes book lengths and clocks", () => {
    expect(formatBookLength(0.2)).toBe("1 min");
    expect(formatBookLength(45)).toBe("45 min");
    expect(formatBookLength(60)).toBe("1 h");
    expect(formatBookLength(200)).toBe("3 h 20 min");
    expect(formatPlayerClock(65)).toBe("1:05");
    expect(formatPlayerClock(3729)).toBe("1:02:09");
    expect(formatPlayerClock(Number.NaN)).toBe("0:00");
  });
});

describe("covers", () => {
  it("wraps long titles into at most four lines without breaking words", () => {
    const { lines } = layoutTitle("Collaboration, Feedback & Conflict Resolution");
    expect(lines.length).toBeLessThanOrEqual(4);
    expect(lines.join(" ")).toBe("Collaboration, Feedback & Conflict Resolution");
  });

  it("is the same for the same course and escapes text", () => {
    const input = { slug: "collaboration", title: "A <b> & C", author: "Zeeshan Adil", label: "Teamwork & Collaboration" };
    expect(coverSvg(input)).toBe(coverSvg(input));
    expect(coverSvg(input)).toContain("&lt;b&gt;");
    expect(coverSvg(input)).toContain("TEAMWORK &amp; COLLABORATION");
    expect(coverSvg(input)).not.toContain("<b>");
    expect(coverPalette("collaboration")).toEqual(coverPalette("collaboration"));
  });
});

describe("course categories", () => {
  it("has a shelf for every category, Cloud and DevOps included", () => {
    expect(COURSE_CATEGORY_INFO.map((c) => c.value).sort()).toEqual([...COURSE_CATEGORIES].sort());
    expect(categoryFromParam("cloud-devops")).toBe("CLOUD_DEVOPS");
  });
});
