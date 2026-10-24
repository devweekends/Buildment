import { describe, expect, it } from "vitest";
import { computeNullAverage, describeNullChange, nullAverageTrap, nullCounts } from "@buildment/learning-ui/canvas/null-average-trap/data";
import { defaultValues } from "@buildment/learning-ui/canvas/renderers/slider/model";

const start = defaultValues(nullAverageTrap);
const stats = (values: Record<string, number>) => computeNullAverage(values).stats.map((s) => s.value);

describe("null-average-trap model", () => {
  it("starts with 20 flour reports, 5 with no price, missing left as NULL", () => {
    expect(start).toEqual({ reports: 20, missing: 5, asZero: 0 });
    expect(nullCounts({ reports: 20, missing: 5, asZero: 0 })).toEqual({
      rowCount: 20,
      withPrice: 15,
      priceCount: 15,
      average: 8,
      averageLeftAsNull: 8,
      averageTurnedIntoZero: 6,
    });
    expect(stats(start)).toEqual(["8.00", "20", "15"]);
  });

  it("turning missing into 0 drags the average to 6.00 and makes COUNT(price) equal COUNT(*)", () => {
    expect(stats({ ...start, asZero: 1 })).toEqual(["6.00", "20", "20"]);
  });

  it("with 10 missing: 4.00 as 0, still 8.00 as NULL with COUNT(price) at 10", () => {
    expect(stats({ ...start, missing: 10, asZero: 1 })).toEqual(["4.00", "20", "20"]);
    expect(stats({ ...start, missing: 10, asZero: 0 })).toEqual(["8.00", "20", "10"]);
  });

  it("gives NULL, never 0 or NaN, when no row has a price", () => {
    const none = { reports: 10, missing: 10, asZero: 0 };
    expect(stats(none)).toEqual(["NULL", "10", "0"]);
    expect(computeNullAverage(none).bars?.[1]?.display).toBe("NULL");
    expect(stats({ ...none, asZero: 1 })).toEqual(["0.00", "10", "10"]);
  });

  it("handles the maximum inputs and never counts more missing rows than rows", () => {
    expect(stats({ reports: 40, missing: 10, asZero: 1 })).toEqual(["6.00", "40", "40"]);
    expect(stats({ reports: 40, missing: 0, asZero: 1 })).toEqual(["8.00", "40", "40"]);
    expect(nullCounts({ reports: 5, missing: 9, asZero: 0 }).withPrice).toBe(0);
  });

  it("describes a change in words", () => {
    expect(describeNullChange(start, { ...start, asZero: 1 })).toBe(
      "Turning missing prices into 0: AVG(price) went from 8.00 to 6.00, COUNT(*) stayed at 20, and COUNT(price) went from 15 to 20. Each false 0 pulls the average below the true price of 8.00.",
    );
    expect(describeNullChange(start, { ...start, missing: 10 })).toBe(
      "Changing the number of reports with no price: AVG(price) stayed at 8.00, COUNT(*) stayed at 20, and COUNT(price) went from 15 to 10. The average still equals the true price, because NULL rows are skipped, but COUNT(price) is lower than COUNT(*).",
    );
    expect(describeNullChange(start, start)).toBe("Nothing changed.");
  });
});
