import { describe, expect, it } from "vitest";
import { batchFreshness, computeFreshness, describeFreshnessChange, freshness } from "@buildment/learning-ui/canvas/batch-freshness/data";
import { defaultValues } from "@buildment/learning-ui/canvas/renderers/slider/model";

const start = defaultValues(batchFreshness);

describe("batch-freshness model", () => {
  it("starts with Yasmin's case: a run every 6 hours that takes 30 minutes, data needed within 24 hours", () => {
    expect(start).toEqual({ runEveryHours: 6, runMinutes: 30, needWithinHours: 24 });
    expect(freshness({ runEveryHours: 6, runMinutes: 30, needWithinHours: 24 })).toEqual({
      gapHours: 6,
      queued: false,
      worstCaseAgeHours: 6.5,
      meetsNeed: true,
      runsPerDay: 4,
    });
    expect(computeFreshness(start).stats.map((s) => s.value)).toEqual(["6.5 h", "Yes", "4"]);
  });

  it("a daily run misses a 24 hour need by the run time, and a 36 hour need makes it enough", () => {
    const daily = { ...start, runEveryHours: 24 };
    expect(computeFreshness(daily).stats.map((s) => s.value)).toEqual(["24.5 h", "No", "1"]);
    const relaxed = { ...daily, needWithinHours: 36 };
    expect(computeFreshness(relaxed).stats.map((s) => s.value)).toEqual(["24.5 h", "Yes", "1"]);
  });

  it("makes a run wait for the last one when it takes longer than the gap", () => {
    const f = freshness({ runEveryHours: 1, runMinutes: 120, needWithinHours: 24 });
    expect(f.queued).toBe(true);
    expect(f.gapHours).toBe(2);
    expect(f.worstCaseAgeHours).toBe(4);
    expect(f.runsPerDay).toBe(12);
    expect(computeFreshness({ runEveryHours: 1, runMinutes: 120, needWithinHours: 24 }).stats[0]!.detail).toBe("runs wait for each other");
  });

  it("handles the minimum inputs: every hour, 5 minutes, needed within 1 hour", () => {
    const result = computeFreshness({ runEveryHours: 1, runMinutes: 5, needWithinHours: 1 });
    expect(result.stats.map((s) => s.value)).toEqual(["1.08 h", "No", "24"]);
    expect(result.bars?.[0]?.tone).toBe("bad");
  });

  it("handles the maximum inputs: every 24 hours, 120 minutes, needed within 48 hours", () => {
    const result = computeFreshness({ runEveryHours: 24, runMinutes: 120, needWithinHours: 48 });
    expect(result.stats.map((s) => s.value)).toEqual(["26 h", "Yes", "1"]);
    expect(result.barMax).toBe(48);
  });

  it("describes a change in words", () => {
    expect(describeFreshnessChange(start, { ...start, runEveryHours: 24 })).toBe(
      "Changing the time between runs: the worst-case age rose from 6.5 h to 24.5 h. Against a need of 24 hours, the plan met it before and misses it now. Runs per day went from 4 to 1.",
    );
    const daily = { ...start, runEveryHours: 24 };
    expect(describeFreshnessChange(daily, { ...daily, needWithinHours: 36 })).toBe(
      "Changing the need: the worst-case age stayed at 24.5 h. Against a need of 36 hours, the plan missed it before and meets it now. Runs per day stayed at 1.",
    );
    expect(describeFreshnessChange(start, start)).toBe("Nothing changed.");
  });
});
