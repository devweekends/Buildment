import { describe, expect, it } from "vitest";
import {
  breakEvenPercent,
  cheaperPlan,
  computeIndexOrScan,
  describeIndexChange,
  indexOrScan,
  indexPages,
  matchingRows,
  scanPages,
} from "@buildment/learning-ui/canvas/index-or-scan/data";
import { defaultValues } from "@buildment/learning-ui/canvas/renderers/slider/model";

const start = defaultValues(indexOrScan);

describe("index-or-scan model", () => {
  it("starts with 200 thousand rows and 0.1 percent matching: the index reads 618 pages, the scan 2,000", () => {
    expect(start).toEqual({ thousands: 200, percent: 0.1 });
    expect(matchingRows(200, 0.1)).toBe(200);
    expect(indexPages(200, 0.1)).toBeCloseTo(617.61, 1);
    expect(scanPages(200)).toBe(2000);
    expect(computeIndexOrScan(start).stats.map((s) => s.value)).toEqual(["618", "2,000", "Index"]);
  });

  it("matches the try-this values", () => {
    expect(computeIndexOrScan({ thousands: 200, percent: 12.5 }).stats.map((s) => s.value)).toEqual(["75,018", "2,000", "Full scan"]);
    expect(cheaperPlan(200, 0.3)).toBe("index");
    expect(cheaperPlan(200, 0.4)).toBe("scan");
    expect(breakEvenPercent(200)).toBeCloseTo(0.33, 2);
    expect(computeIndexOrScan({ thousands: 1000, percent: 0.1 }).stats.map((s) => s.value)).toEqual(["3,020", "10,000", "Index"]);
  });

  it("handles the corners: smallest and largest table and share", () => {
    for (const thousands of [10, 1000]) {
      for (const percent of [0.1, 100]) {
        const result = computeIndexOrScan({ thousands, percent });
        for (const stat of result.stats) expect(stat.value).not.toMatch(/NaN|Infinity/);
        for (const bar of result.bars!) expect(Number.isFinite(bar.value)).toBe(true);
      }
    }
    expect(computeIndexOrScan({ thousands: 10, percent: 100 }).stats[2]!.value).toBe("Full scan");
    expect(computeIndexOrScan({ thousands: 10, percent: 0.1 }).stats[2]!.value).toBe("Index");
    expect(breakEvenPercent(10)).toBeGreaterThan(0);
  });

  it("describes a change in words", () => {
    expect(describeIndexChange(start, start)).toBe("Nothing changed.");
    expect(describeIndexChange(start, { ...start, percent: 12.5 })).toBe(
      "Changing the share of matching rows from 0.1% to 12.5%: the index now reads 75,018 pages and the full scan 2,000, so the full scan is cheaper instead of the index. The break-even point of this rule is near 0.33%.",
    );
    expect(describeIndexChange(start, { ...start, thousands: 1000 })).toBe(
      "Changing the table size from 200,000 to 1,000,000 rows: the index reads 3,020 pages and the full scan 10,000. The index is still the cheaper plan.",
    );
  });
});
