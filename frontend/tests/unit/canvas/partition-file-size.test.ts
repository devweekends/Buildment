import { describe, expect, it } from "vitest";
import {
  computePartitions,
  describePartitionChange,
  partitionCounts,
  partitionFileSize,
} from "@buildment/learning-ui/canvas/partition-file-size/data";
import { defaultValues } from "@buildment/learning-ui/canvas/renderers/slider/model";

const start = defaultValues(partitionFileSize);

describe("partition-file-size model", () => {
  it("starts with a month of 28 daily folders and 100 rows a day", () => {
    expect(start).toEqual({ partitionBy: 1, days: 28, rowsPerDay: 100 });
    expect(partitionCounts({ partitionBy: 1, days: 28, rowsPerDay: 100 })).toEqual({
      files: 28,
      totalRows: 2800,
      rowsPerFile: 100,
      weekFiles: 7,
      weekRows: 700,
    });
    expect(computePartitions(start).stats.map((s) => s.value)).toEqual(["28", "100", "7"]);
  });

  it("try this 1: day and market gives 224 files of 12.5 rows and a week query opens 56", () => {
    const counts = partitionCounts({ partitionBy: 2, days: 28, rowsPerDay: 100 });
    expect(counts.files).toBe(224);
    expect(counts.rowsPerFile).toBe(12.5);
    expect(counts.weekFiles).toBe(56);
    expect(counts.weekRows).toBe(700);
    expect(computePartitions({ ...start, partitionBy: 2 }).stats.map((s) => s.value)).toEqual(["224", "12.5", "56"]);
  });

  it("try this 2: no partitions is one file that the week query reads in full", () => {
    const counts = partitionCounts({ partitionBy: 0, days: 28, rowsPerDay: 100 });
    expect(counts.files).toBe(1);
    expect(counts.rowsPerFile).toBe(2800);
    expect(counts.weekFiles).toBe(1);
    expect(counts.weekRows).toBe(2800);
  });

  it("try this 3: 100,000 rows a day gives large daily files, or 12,500 rows with markets", () => {
    expect(partitionCounts({ partitionBy: 1, days: 28, rowsPerDay: 100000 }).rowsPerFile).toBe(100000);
    expect(partitionCounts({ partitionBy: 2, days: 28, rowsPerDay: 100000 }).rowsPerFile).toBe(12500);
  });

  it("covers every day when there are fewer than 7, and keeps every corner finite", () => {
    expect(partitionCounts({ partitionBy: 2, days: 3, rowsPerDay: 100 }).weekFiles).toBe(24);
    expect(partitionCounts({ partitionBy: 1, days: 1, rowsPerDay: 100 }).weekFiles).toBe(1);
    expect(partitionCounts({ partitionBy: 2, days: 365, rowsPerDay: 200000 }).files).toBe(2920);
    for (const partitionBy of [0, 1, 2]) {
      for (const days of [1, 365]) {
        for (const rowsPerDay of [100, 200000]) {
          const result = computePartitions({ partitionBy, days, rowsPerDay });
          for (const stat of result.stats) expect(stat.value).not.toMatch(/NaN|Infinity|undefined/);
          for (const bar of result.bars ?? []) expect(Number.isFinite(bar.value)).toBe(true);
        }
      }
    }
  });

  it("describes a change in words", () => {
    expect(describePartitionChange(start, { ...start, partitionBy: 2 })).toBe(
      "Changing the partition level: the lake goes from 28 files to 224, the average goes from 100 to 12.5 rows per file, and a one-week query opens 56 files instead of 7. Finer partitions let a query skip more files, and they also make each file smaller.",
    );
    expect(describePartitionChange(start, { ...start, rowsPerDay: 200 })).toBe(
      "Changing the rows per day: the lake stays at 28 files, the average goes from 100 to 200 rows per file, and a one-week query still opens 7 files. Finer partitions let a query skip more files, and they also make each file smaller.",
    );
    expect(describePartitionChange(start, start)).toBe("Nothing changed.");
  });
});
