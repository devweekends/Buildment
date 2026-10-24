import { describe, expect, it } from "vitest";
import {
  computeRead,
  describeReadChange,
  formatMb,
  readCosts,
  rowVsColumnRead,
} from "@buildment/learning-ui/canvas/row-vs-column-read/data";
import { defaultValues } from "@buildment/learning-ui/canvas/renderers/slider/model";

const start = defaultValues(rowVsColumnRead);

describe("row-vs-column-read model", () => {
  it("starts with the chapter 5.2 table: 10 columns, 3 used, 2 million rows", () => {
    expect(start).toEqual({ columns: 10, used: 3, rowsMillions: 2 });
    expect(readCosts({ columns: 10, used: 3, rowsMillions: 2 })).toEqual({
      usedColumns: 3,
      rowMb: 160,
      columnMb: 48,
      skippedMb: 112,
      skippedPercent: 70,
    });
    expect(computeRead(start).stats.map((s) => s.value)).toEqual(["160 MB", "48 MB", "70%"]);
  });

  it("try this 1: using every column leaves nothing to skip", () => {
    const cost = readCosts({ columns: 10, used: 10, rowsMillions: 2 });
    expect(cost.rowMb).toBe(160);
    expect(cost.columnMb).toBe(160);
    expect(cost.skippedPercent).toBe(0);
    expect(computeRead({ ...start, used: 10 }).summary).toContain("nothing is skipped");
  });

  it("try this 2: 1 column of 40 skips 97.5 percent", () => {
    const cost = readCosts({ columns: 40, used: 1, rowsMillions: 2 });
    expect(cost.skippedPercent).toBe(97.5);
    expect(cost.rowMb).toBe(640);
    expect(cost.columnMb).toBe(16);
  });

  it("try this 3: doubling the rows doubles both sizes and keeps the share", () => {
    const cost = readCosts({ columns: 10, used: 3, rowsMillions: 4 });
    expect(cost.rowMb).toBe(320);
    expect(cost.columnMb).toBe(96);
    expect(cost.skippedPercent).toBe(70);
  });

  it("clamps a query that uses more columns than the table has", () => {
    const cost = readCosts({ columns: 2, used: 5, rowsMillions: 0.1 });
    expect(cost.usedColumns).toBe(2);
    expect(cost.rowMb).toBe(1.6);
    expect(cost.columnMb).toBe(1.6);
    expect(cost.skippedPercent).toBe(0);
  });

  it("shows large sizes in GB and keeps every corner finite", () => {
    expect(formatMb(32000)).toBe("32 GB");
    expect(formatMb(48)).toBe("48 MB");
    const biggest = computeRead({ columns: 40, used: 40, rowsMillions: 100 });
    expect(biggest.stats[0]!.value).toBe("32 GB");
    for (const columns of [2, 40]) {
      for (const used of [1, 40]) {
        for (const rowsMillions of [0.1, 100]) {
          const result = computeRead({ columns, used, rowsMillions });
          for (const stat of result.stats) expect(stat.value).not.toMatch(/NaN|Infinity|undefined/);
          for (const bar of result.bars ?? []) expect(Number.isFinite(bar.value)).toBe(true);
        }
      }
    }
  });

  it("describes a change in words", () => {
    expect(describeReadChange(start, { ...start, used: 10 })).toBe(
      "Changing the number of columns the query uses: the row layout reads 160 MB (before: 160 MB), the column layout reads 160 MB (before: 48 MB), and the share not read goes from 70% to 0%. The query now uses every column, so a column layout has nothing to skip.",
    );
    expect(describeReadChange(start, { ...start, rowsMillions: 4 })).toBe(
      "Changing the number of rows: the row layout reads 320 MB (before: 160 MB), the column layout reads 96 MB (before: 48 MB), and the share not read stays at 70%. The share depends on how many columns the query uses, not on how many rows there are.",
    );
    expect(describeReadChange(start, start)).toBe("Nothing changed.");
  });
});
