import { describe, expect, it } from "vitest";
import { INTEGRITY_LEAVE_EVENTS, PROCTORED_RULE, countLeaveIncidents } from "../../src/shared/api/integrity.js";

const at = (seconds: number) => new Date(1_700_000_000_000 + seconds * 1000);

describe("countLeaveIncidents", () => {
  it("counts nothing for no events", () => {
    expect(countLeaveIncidents([])).toBe(0);
  });

  it("treats the events of one Alt+Tab as one incident", () => {
    expect(countLeaveIncidents([
      { type: "WINDOW_BLUR", at: at(0) },
      { type: "TAB_HIDDEN", at: at(1) },
      { type: "FULLSCREEN_EXIT", at: at(2) },
    ])).toBe(1);
  });

  it("counts separate incidents apart, whatever order the events arrive in", () => {
    const events = [
      { type: "TAB_HIDDEN" as const, at: at(120) },
      { type: "TAB_HIDDEN" as const, at: at(0) },
      { type: "FULLSCREEN_EXIT" as const, at: at(60) },
    ];
    expect(countLeaveIncidents(events)).toBe(3);
  });

  it("anchors the window at the first event, so a long absence is not stretched into one incident forever", () => {
    const gap = PROCTORED_RULE.incidentWindowSeconds;
    expect(countLeaveIncidents([{ type: "TAB_HIDDEN", at: at(0) }, { type: "TAB_HIDDEN", at: at(gap - 1) }])).toBe(1);
    expect(countLeaveIncidents([{ type: "TAB_HIDDEN", at: at(0) }, { type: "TAB_HIDDEN", at: at(gap) }])).toBe(2);
  });

  it("ignores blocked actions and camera notes, and bad times", () => {
    expect(countLeaveIncidents([
      { type: "COPY_BLOCKED", at: at(0) },
      { type: "PASTE_BLOCKED", at: at(30) },
      { type: "CONTEXT_MENU_BLOCKED", at: at(60) },
      { type: "PRINT_BLOCKED", at: at(90) },
      { type: "NAVIGATION_BLOCKED", at: at(120) },
      { type: "CAMERA_OFF", at: at(150) },
      { type: "TAB_HIDDEN", at: "not a date" },
    ])).toBe(0);
  });

  it("only leaving the screen counts", () => {
    expect([...INTEGRITY_LEAVE_EVENTS].sort()).toEqual(["CAMERA_LOST", "FULLSCREEN_EXIT", "TAB_HIDDEN", "WINDOW_BLUR"]);
  });

  it("locks on the third incident: two warnings, then submit", () => {
    expect(PROCTORED_RULE.limit).toBe(PROCTORED_RULE.warnings + 1);
  });
});
