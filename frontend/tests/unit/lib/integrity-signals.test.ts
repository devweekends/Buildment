import { describe, expect, it } from "vitest";
import { IntegrityQueue, LeaveCounter, countWords, expectedReadingMs, isFastAnswer, proctoredKeyAction, screenshotCombo } from "@/lib/integrity/signals";
import { PROCTORED_RULE, countLeaveIncidents } from "@/shared/api/integrity";

class MemoryStorage {
  data = new Map<string, string>();
  getItem(key: string) {
    return this.data.get(key) ?? null;
  }
  setItem(key: string, value: string) {
    this.data.set(key, value);
  }
  removeItem(key: string) {
    this.data.delete(key);
  }
}

const key = (overrides: Partial<{ key: string; code: string; metaKey: boolean; shiftKey: boolean }>) => ({
  key: "",
  code: "",
  metaKey: false,
  shiftKey: false,
  ...overrides,
});

describe("screenshotCombo", () => {
  it("names the screenshot shortcuts the browser can see", () => {
    expect(screenshotCombo(key({ key: "PrintScreen" }))).toBe("PrintScreen");
    expect(screenshotCombo(key({ key: "S", code: "KeyS", metaKey: true, shiftKey: true }))).toBe("Win+Shift+S");
    expect(screenshotCombo(key({ key: "#", code: "Digit3", metaKey: true, shiftKey: true }))).toBe("Cmd+Shift+3");
    expect(screenshotCombo(key({ key: "5", metaKey: true, shiftKey: true }))).toBe("Cmd+Shift+5");
  });

  it("ignores ordinary typing", () => {
    expect(screenshotCombo(key({ key: "s" }))).toBeNull();
    expect(screenshotCombo(key({ key: "S", shiftKey: true }))).toBeNull();
    expect(screenshotCombo(key({ key: "3", metaKey: true }))).toBeNull();
  });
});

describe("reading pace", () => {
  it("expects slow, careful reading", () => {
    expect(expectedReadingMs(180, 1)).toBe(62_000);
  });

  it("flags only answers far faster than reading time", () => {
    // 3 questions of 60 words: about 66 seconds to read; under ~23 seconds is flagged.
    expect(isFastAnswer(10_000, 180, 3)).toBe(true);
    expect(isFastAnswer(30_000, 180, 3)).toBe(false);
    expect(isFastAnswer(1_000, 0, 3)).toBe(false);
  });

  it("counts words across whitespace", () => {
    expect(countWords("  What is   2 + 2?\n A) 4 ")).toBe(7);
    expect(countWords("   ")).toBe(0);
  });
});

describe("IntegrityQueue", () => {
  it("keeps events across reloads until the server confirms them", () => {
    const storage = new MemoryStorage();
    const queue = new IntegrityQueue("q", storage);
    const first = queue.add("attempt-1", "TAB_HIDDEN", { meta: { awayMs: 3000 } });
    queue.add("attempt-1", "CAMERA_OFF");

    const reloaded = new IntegrityQueue("q", storage);
    expect(reloaded.size).toBe(2);
    expect(reloaded.pendingFlags("attempt-1")).toBe(1);

    const batch = reloaded.nextBatch();
    expect(batch?.attemptId).toBe("attempt-1");
    expect(batch?.events[0]).toMatchObject({ id: first.id, type: "TAB_HIDDEN", meta: { awayMs: 3000 } });
    expect(batch?.events[0]).not.toHaveProperty("attemptId");

    reloaded.ack(batch!.events.map((event) => event.id));
    expect(reloaded.size).toBe(0);
    expect(storage.data.has("q")).toBe(false);
  });

  it("sends one attempt at a time and gives every event a unique id", () => {
    const queue = new IntegrityQueue("q", null);
    queue.add("old", "WINDOW_BLUR");
    queue.add("new", "COPY_BLOCKED");
    queue.add("old", "PASTE_BLOCKED");
    const batch = queue.nextBatch()!;
    expect(batch.attemptId).toBe("old");
    expect(batch.events.map((event) => event.type)).toEqual(["WINDOW_BLUR", "PASTE_BLOCKED"]);
    expect(new Set(batch.events.map((event) => event.id)).size).toBe(2);
  });

  it("survives unreadable storage", () => {
    const storage = new MemoryStorage();
    storage.setItem("q", "{not json");
    expect(new IntegrityQueue("q", storage).size).toBe(0);
  });
});

const press = (key: string, extra: Partial<{ ctrlKey: boolean; metaKey: boolean; altKey: boolean }> = {}) => ({
  key,
  metaKey: false,
  shiftKey: false,
  ...extra,
});

describe("proctoredKeyAction", () => {
  it("stops printing", () => {
    expect(proctoredKeyAction(press("p", { ctrlKey: true }))).toBe("PRINT_BLOCKED");
    expect(proctoredKeyAction(press("P", { metaKey: true }))).toBe("PRINT_BLOCKED");
  });

  it("stops reload and back", () => {
    expect(proctoredKeyAction(press("F5"))).toBe("NAVIGATION_BLOCKED");
    expect(proctoredKeyAction(press("r", { ctrlKey: true }))).toBe("NAVIGATION_BLOCKED");
    expect(proctoredKeyAction(press("ArrowLeft", { altKey: true }))).toBe("NAVIGATION_BLOCKED");
    expect(proctoredKeyAction(press("[", { metaKey: true }))).toBe("NAVIGATION_BLOCKED");
  });

  it("leaves typing alone", () => {
    expect(proctoredKeyAction(press("p"))).toBeNull();
    expect(proctoredKeyAction(press("r"))).toBeNull();
    expect(proctoredKeyAction(press("ArrowLeft"))).toBeNull();
    expect(proctoredKeyAction(press("a", { ctrlKey: true }))).toBeNull();
  });
});

describe("LeaveCounter", () => {
  const at = (seconds: number) => 1_700_000_000_000 + seconds * 1000;

  it("warns on the first two times the learner leaves and reaches the limit on the third", () => {
    const counter = new LeaveCounter();
    expect(counter.add(at(0))).toEqual({ leaves: 1, limitReached: false, warningsLeft: 2 });
    expect(counter.add(at(60))).toEqual({ leaves: 2, limitReached: false, warningsLeft: 1 });
    expect(counter.add(at(120))).toEqual({ leaves: 3, limitReached: true, warningsLeft: 0 });
    expect(PROCTORED_RULE.limit).toBe(3);
  });

  it("counts blur, hidden and full screen exit from one Alt+Tab once", () => {
    const counter = new LeaveCounter();
    expect(counter.add(at(0))).not.toBeNull();
    expect(counter.add(at(1))).toBeNull();
    expect(counter.add(at(2))).toBeNull();
    expect(counter.leaves).toBe(1);
  });

  it("starts from what the server knows after a reload or a new attempt", () => {
    const counter = new LeaveCounter(2);
    expect(counter.add(at(0))?.limitReached).toBe(true);
    counter.reset(0);
    expect(counter.leaves).toBe(0);
    expect(counter.add(at(0))?.leaves).toBe(1);
  });

  it("agrees with the count the server makes from the stored events", () => {
    const times = [0, 1, 2, 60, 61, 130];
    const counter = new LeaveCounter();
    for (const time of times) counter.add(at(time));
    const stored = times.map((time) => ({ type: "TAB_HIDDEN" as const, at: at(time) }));
    expect(counter.leaves).toBe(countLeaveIncidents(stored));
  });
});
