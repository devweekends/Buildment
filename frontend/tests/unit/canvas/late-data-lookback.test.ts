import { describe, expect, it } from "vitest";
import {
  LATE_BY_DAYS,
  M05_BY_DAYS,
  TOTAL_LATE,
  TOTAL_M05,
  computeLookback,
  describeLookbackChange,
  lateDataLookback,
  lookbackOutcome,
} from "@buildment/learning-ui/canvas/late-data-lookback/data";
import { defaultValues } from "@buildment/learning-ui/canvas/renderers/slider/model";

const start = defaultValues(lateDataLookback);

describe("late-data-lookback model", () => {
  it("uses the seed-7 counts: 76, 69 and 66 late reports, 211 in all, 35 from the M05 outage", () => {
    expect([...LATE_BY_DAYS]).toEqual([76, 69, 66]);
    expect(LATE_BY_DAYS.reduce((a, b) => a + b, 0)).toBe(TOTAL_LATE);
    expect(TOTAL_LATE).toBe(211);
    expect([...M05_BY_DAYS]).toEqual([12, 12, 11]);
    expect(M05_BY_DAYS.reduce((a, b) => a + b, 0)).toBe(TOTAL_M05);
  });

  it("starts with a lookback of 0: nothing caught, every late report missed, one day read", () => {
    expect(start).toEqual({ lookbackDays: 0 });
    expect(lookbackOutcome(0)).toMatchObject({ caught: 0, missed: 211, m05Caught: 0, m05Missed: 35, daysRead: 1 });
    expect(computeLookback(start).stats.map((s) => s.value)).toEqual(["0 of 211", "211", "1"]);
  });

  it("the try-this values: 1 day catches 76, 3 days catch all 211 including M05, 5 days add cost only", () => {
    expect(lookbackOutcome(1)).toMatchObject({ caught: 76, missed: 135, m05Caught: 12, m05Missed: 23, daysRead: 2 });
    expect(lookbackOutcome(2)).toMatchObject({ caught: 145, missed: 66, m05Caught: 24, m05Missed: 11, daysRead: 3 });
    expect(lookbackOutcome(3)).toMatchObject({ caught: 211, missed: 0, m05Caught: 35, m05Missed: 0, daysRead: 4 });
    expect(lookbackOutcome(5)).toMatchObject({ caught: 211, missed: 0, daysRead: 6 });
    const three = computeLookback({ lookbackDays: 3 });
    expect(three.stats.map((s) => s.value)).toEqual(["211 of 211", "0", "4"]);
    expect(three.summary).toBe("A lookback of 3 days catches all 211 late reports, and each run reads 4 days.");
  });

  it("handles the edges: negative and fractional input is clamped, and the bars share one scale", () => {
    expect(lookbackOutcome(-2).daysRead).toBe(1);
    expect(lookbackOutcome(2.9).caught).toBe(145);
    const result = computeLookback({ lookbackDays: 2 });
    expect(result.barMax).toBe(76);
    expect((result.bars ?? []).map((b) => b.display)).toEqual(["76 of 76", "69 of 69", "0 of 66"]);
  });

  it("describes a change in words", () => {
    expect(describeLookbackChange(start, start)).toBe("Nothing changed.");
    expect(describeLookbackChange(start, { lookbackDays: 1 })).toBe(
      "Raising the lookback from 0 to 1 catches 76 more late reports (76 of 211 now), and each run now reads 1 more day.",
    );
    expect(describeLookbackChange({ lookbackDays: 3 }, { lookbackDays: 5 })).toBe(
      "Raising the lookback from 3 to 5 catches no new late reports, because no report in this data is more than 3 days late, but each run now reads 2 more days. That is cost without benefit.",
    );
    expect(describeLookbackChange({ lookbackDays: 3 }, { lookbackDays: 1 })).toBe(
      "Lowering the lookback from 3 to 1 misses 135 more late reports (135 of 211 missed now), and each run reads 2 fewer days.",
    );
  });
});
