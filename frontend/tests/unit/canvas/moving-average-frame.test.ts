import { describe, expect, it } from "vitest";
import {
  CHOSEN_DAYS,
  computeFrame,
  describeFrameChange,
  frameRows,
  movingAverage,
  movingAverageFrame,
  rowsFromOtherMarket,
  trail,
} from "@buildment/learning-ui/canvas/moving-average-frame/data";
import { defaultValues } from "@buildment/learning-ui/canvas/renderers/slider/model";

const start = defaultValues(movingAverageFrame);

describe("moving-average-frame model", () => {
  it("starts with a 3-row frame and the partition on", () => {
    expect(start).toEqual({ frame: 3, partition: 1 });
    expect(computeFrame(start).stats.map((s) => s.value)).toEqual(["25.00", "27.50", "0"]);
    expect(computeFrame(start).bars!.map((b) => b.display)).toEqual(["0.00", "0.50", "0.50", "0.50"]);
  });

  it("matches the try-this values", () => {
    expect(trail(7, true, 7)).toBeCloseTo(1.5);
    expect(trail(3, true, 7)).toBeCloseTo(0.5);
    expect(movingAverage(7, false, 1)).toBeCloseTo(166 / 7);
    expect(computeFrame({ frame: 7, partition: 0 }).stats[0]!.value).toBe("23.71");
    for (const partition of [0, 1]) {
      for (const day of CHOSEN_DAYS) expect(trail(1, partition === 1, day)).toBe(0);
    }
  });

  it("builds the frame from the right rows", () => {
    expect(frameRows(3, true, 1)).toEqual([25.0]);
    expect(frameRows(3, false, 1)).toEqual([24.5, 23.0, 25.0]);
    expect(frameRows(7, false, 1)).toHaveLength(7);
    expect(rowsFromOtherMarket(7, false)).toBe(6);
    expect(rowsFromOtherMarket(7, true)).toBe(0);
  });

  it("handles the edges: smallest and largest frames, both partition settings, and the bar scale", () => {
    let largest = 0;
    for (const frame of [1, 2, 3, 4, 5, 6, 7]) {
      for (const partition of [0, 1]) {
        const result = computeFrame({ frame, partition });
        for (const stat of result.stats) expect(stat.value).not.toMatch(/NaN|Infinity/);
        for (const bar of result.bars!) {
          expect(Number.isFinite(bar.value)).toBe(true);
          largest = Math.max(largest, bar.value);
        }
      }
    }
    expect(largest).toBeLessThan(2);
    expect(computeFrame({ frame: 7, partition: 0 }).stats[2]!.detail).toBe("the window crosses into M02");
  });

  it("describes a change in words", () => {
    expect(describeFrameChange(start, start)).toBe("Nothing changed.");
    expect(describeFrameChange({ frame: 7, partition: 1 }, { frame: 3, partition: 1 })).toBe(
      "A narrower frame (7 to 3 rows) moves the day 7 trail from 1.50 to 0.50: fewer rows follow the price more closely.",
    );
    expect(describeFrameChange({ frame: 7, partition: 1 }, { frame: 7, partition: 0 })).toBe(
      "Without PARTITION BY market, day 1 now includes 6 rows of M02, so its average goes from 25.00 to 23.71.",
    );
  });
});
