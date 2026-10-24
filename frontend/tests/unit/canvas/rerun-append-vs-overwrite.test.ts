import { describe, expect, it } from "vitest";
import {
  computeRerun,
  describeRerunChange,
  rerunAppendVsOverwrite,
  tableAfterRuns,
} from "@buildment/learning-ui/canvas/rerun-append-vs-overwrite/data";
import { defaultValues } from "@buildment/learning-ui/canvas/renderers/slider/model";

const start = defaultValues(rerunAppendVsOverwrite);

describe("rerun-append-vs-overwrite model", () => {
  it("starts with two appended runs of 4 March: 200 rows, 100 duplicates, 2,482.0 shekels", () => {
    expect(start).toEqual({ runs: 2, mode: 0 });
    expect(tableAfterRuns({ runs: 2, mode: 0 })).toEqual({ rows: 200, duplicates: 100, totalPrice: 2482 });
    expect(computeRerun(start).stats.map((s) => s.value)).toEqual(["200", "100", "2,482.0"]);
  });

  it("one run is correct in every mode", () => {
    for (const mode of [0, 1, 2]) {
      expect(tableAfterRuns({ runs: 1, mode })).toEqual({ rows: 100, duplicates: 0, totalPrice: 1241 });
    }
  });

  it("try this 2: four appended runs make 400 rows, and replace or merge bring back 100", () => {
    expect(tableAfterRuns({ runs: 4, mode: 0 })).toEqual({ rows: 400, duplicates: 300, totalPrice: 4964 });
    expect(tableAfterRuns({ runs: 4, mode: 1 })).toEqual({ rows: 100, duplicates: 0, totalPrice: 1241 });
    expect(tableAfterRuns({ runs: 4, mode: 2 })).toEqual({ rows: 100, duplicates: 0, totalPrice: 1241 });
  });

  it("try this 3: replace and merge agree for any number of runs", () => {
    for (const runs of [1, 2, 3, 4]) {
      expect(tableAfterRuns({ runs, mode: 1 })).toEqual(tableAfterRuns({ runs, mode: 2 }));
    }
  });

  it("shows the three bars and keeps every corner finite", () => {
    const result = computeRerun({ runs: 3, mode: 1 });
    expect(result.bars!.map((b) => b.display)).toEqual(["300", "100", "100"]);
    expect(result.barMax).toBe(400);
    for (const runs of [1, 4]) {
      for (const mode of [0, 1, 2]) {
        const corner = computeRerun({ runs, mode });
        for (const stat of corner.stats) expect(stat.value).not.toMatch(/NaN|Infinity|undefined/);
        expect(corner.summary).not.toMatch(/NaN|Infinity|undefined/);
      }
    }
  });

  it("describes a change in words", () => {
    expect(describeRerunChange(start, { ...start, runs: 4 })).toBe(
      "Changing the number of runs: the table holds 400 rows for 4 March, 300 of them duplicates, and the total price is 4,964.0 shekels (before: 200 rows and 2,482.0 shekels). Append adds the whole day again on every run.",
    );
    expect(describeRerunChange(start, { ...start, mode: 1 })).toBe(
      "Changing the write mode: the table holds 100 rows for 4 March, 0 of them duplicates, and the total price is 1,241.0 shekels (before: 200 rows and 2,482.0 shekels). The job replaces or merges the day, so a rerun leaves the same table.",
    );
    expect(describeRerunChange(start, start)).toBe("Nothing changed.");
  });
});
