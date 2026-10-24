import { describe, expect, it } from "vitest";
import {
  ROWS_PER_DAY,
  computeVolume,
  describeVolumeChange,
  formatDays,
  runVolumeCheck,
  volumeCheckThreshold,
} from "@buildment/learning-ui/canvas/volume-check-threshold/data";
import { defaultValues } from "@buildment/learning-ui/canvas/renderers/slider/model";

const start = defaultValues(volumeCheckThreshold);

describe("volume-check-threshold model", () => {
  it("starts at the reference default: tolerance 50%, the missing batch caught, no false alarms", () => {
    expect(start).toEqual({ tolerance: 50 });
    const run = runVolumeCheck(50);
    const day24 = run.days[9]!;
    expect(day24.day).toBe(24);
    expect(day24.rows).toBe(37);
    expect(day24.average).toBeCloseTo(97.571, 3);
    expect(day24.line).toBe(48.8);
    expect(run.caught).toBe(true);
    expect(run.falseAlarmDays).toEqual([]);
    expect(computeVolume(start).stats.map((s) => s.value)).toEqual(["Yes", "0", "48.8 rows"]);
  });

  it("uses 14 days, the seed-7 counts from 15 to 28 March, with 37 on 24 March", () => {
    expect(ROWS_PER_DAY).toHaveLength(14);
    expect(ROWS_PER_DAY[9]).toBe(37);
    expect(ROWS_PER_DAY[0]).toBe(97);
    expect(ROWS_PER_DAY[13]).toBe(111);
    // The first day has nothing to compare with, so it can never alarm.
    expect(runVolumeCheck(0).days[0]!.alarm).toBe(false);
  });

  it("tolerance 0 raises false alarms on 16, 18 and 20 March and still catches the problem", () => {
    const run = runVolumeCheck(0);
    expect(run.caught).toBe(true);
    expect(run.falseAlarmDays).toEqual([16, 18, 20]);
    expect(run.days[9]!.line).toBe(97.6);
    expect(computeVolume({ tolerance: 0 }).stats[1]!.detail).toBe("on 16, 18 and 20 March");
  });

  it("matches the hand-checked result for every tolerance step", () => {
    // Worked out by hand with the same rule as the reference check_volume: line = average of up to 7 earlier days x (1 - tolerance).
    const expected: Record<number, { caught: boolean; falseDays: number[] }> = {
      0: { caught: true, falseDays: [16, 18, 20] },
      5: { caught: true, falseDays: [20] },
      10: { caught: true, falseDays: [] },
      30: { caught: true, falseDays: [] },
      60: { caught: true, falseDays: [] },
      65: { caught: false, falseDays: [] },
      90: { caught: false, falseDays: [] },
    };
    for (const [tolerance, want] of Object.entries(expected)) {
      const run = runVolumeCheck(Number(tolerance));
      expect(run.caught, `${tolerance}% caught`).toBe(want.caught);
      expect(run.falseAlarmDays, `${tolerance}% false alarms`).toEqual(want.falseDays);
    }
  });

  it("65% lets the missing batch through: the line is 34.2 and 37 rows is above it", () => {
    const result = computeVolume({ tolerance: 65 });
    expect(result.stats[0]!.value).toBe("No");
    expect(result.stats[2]!.value).toBe("34.2 rows");
    expect(result.summary).toContain("goes unnoticed");
  });

  it("handles the maximum tolerance without odd numbers", () => {
    const result = computeVolume({ tolerance: 90 });
    expect(result.stats[2]!.value).toBe("9.8 rows");
    for (const bar of result.bars ?? []) expect(Number.isFinite(bar.value)).toBe(true);
  });

  it("formats the false alarm dates", () => {
    expect(formatDays([])).toBe("none");
    expect(formatDays([20])).toBe("20 March");
    expect(formatDays([16, 18, 20])).toBe("16, 18 and 20 March");
  });

  it("describes a change in words", () => {
    expect(describeVolumeChange(start, start)).toBe("Nothing changed.");
    expect(describeVolumeChange({ tolerance: 0 }, { tolerance: 10 })).toBe(
      "Raising the tolerance from 0% to 10% lowers the alarm line on 24 March from 97.6 to 87.8 rows. False alarms fall from 3 to 0. The missing batch is still caught.",
    );
    expect(describeVolumeChange({ tolerance: 60 }, { tolerance: 65 })).toBe(
      "Raising the tolerance from 60% to 65% lowers the alarm line on 24 March from 39 to 34.2 rows. False alarms stay at 0. The missing batch is no longer caught: 37 rows is now above the line.",
    );
    expect(describeVolumeChange({ tolerance: 10 }, { tolerance: 0 })).toContain("False alarms rise from 0 to 3");
  });
});
