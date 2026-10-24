import { describe, expect, it } from "vitest";
import { computeTests, describeTestsChange, testOutcome, whatTestsCatch } from "@buildment/learning-ui/canvas/what-tests-catch/data";
import { defaultValues } from "@buildment/learning-ui/canvas/renderers/slider/model";

const start = defaultValues(whatTestsCatch);

describe("what-tests-catch model", () => {
  it("starts with the chapter 7.3 example: 10 duplicates, 4 rows with no market and 6 wrong prices", () => {
    expect(start).toEqual({ duplicates: 10, orphans: 4, wrongPrices: 6 });
    expect(testOutcome({ duplicates: 10, orphans: 4, wrongPrices: 6 })).toEqual({ failing: 2, flagged: 14, missed: 6, badRows: 20 });
    const result = computeTests(start);
    expect(result.stats.map((s) => s.value)).toEqual(["2 of 3", "14", "6"]);
    expect(result.summary).toBe("2 of 3 tests fail and they point at 14 rows, but 6 rows with a wrong price are not flagged by any test.");
  });

  it("the try-this values: no wrong prices flags all 14, and only wrong prices leaves every test green", () => {
    const noWrong = computeTests({ ...start, wrongPrices: 0 });
    expect(noWrong.stats.map((s) => s.value)).toEqual(["2 of 3", "14", "0"]);
    expect(noWrong.summary).toBe("2 of 3 tests fail and they point at all 14 rows that are bad.");

    const onlyWrong = computeTests({ duplicates: 0, orphans: 0, wrongPrices: 6 });
    expect(onlyWrong.stats.map((s) => s.value)).toEqual(["0 of 3", "0", "6"]);
    expect(onlyWrong.summary).toBe("All 3 tests pass, yet 6 rows with a wrong price are in the table.");
  });

  it("handles the minimum: a clean table passes every test", () => {
    const clean = computeTests({ duplicates: 0, orphans: 0, wrongPrices: 0 });
    expect(clean.stats.map((s) => s.value)).toEqual(["0 of 3", "0", "0"]);
    expect(clean.summary).toBe("The table has no bad rows, and all 3 tests pass.");
  });

  it("handles the maximum: 40 of each kind still fails only 2 tests", () => {
    expect(testOutcome({ duplicates: 40, orphans: 40, wrongPrices: 40 })).toEqual({ failing: 2, flagged: 80, missed: 40, badRows: 120 });
    const bars = computeTests({ duplicates: 40, orphans: 40, wrongPrices: 40 }).bars ?? [];
    expect(bars.map((b) => b.display)).toEqual(["40 flagged", "40 flagged", "40 missed"]);
  });

  it("one kind of fault fails one test, and a wrong price alone fails none", () => {
    expect(testOutcome({ duplicates: 2, orphans: 0, wrongPrices: 0 }).failing).toBe(1);
    expect(testOutcome({ duplicates: 0, orphans: 2, wrongPrices: 0 }).failing).toBe(1);
    expect(testOutcome({ duplicates: 0, orphans: 0, wrongPrices: 2 }).failing).toBe(0);
  });

  it("describes a change in words", () => {
    expect(describeTestsChange(start, start)).toBe("Nothing changed.");
    expect(describeTestsChange(start, { ...start, wrongPrices: 0 })).toBe(
      "Changing the wrong prices: 2 of 3 tests still fail, and they point at all 14 rows that are bad.",
    );
    expect(describeTestsChange(start, { duplicates: 0, orphans: 0, wrongPrices: 6 })).toBe(
      "Changing several inputs: no test fails, yet 6 rows with a wrong price stay in the table. A test checks a rule you wrote, and a normal-looking price breaks none of them.",
    );
    expect(describeTestsChange(start, { ...start, duplicates: 0 })).toBe(
      "Changing the duplicates: 1 of 3 tests now fail (before: 2). They point at 4 rows, and 6 rows with a wrong price still pass every test.",
    );
  });
});
