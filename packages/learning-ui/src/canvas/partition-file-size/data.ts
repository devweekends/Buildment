import type { SliderResult, SliderSpec, SliderValues } from "../renderers/slider/types";

// Course: data-engineering (course 15), chapter 5.3 "Partitions, file sizes
// and compression". A toy count of files: no partitions is one file, a folder
// per day is one file per day, a folder per day and market is one file per day
// and market. The defaults are a Mizan-sized month: 28 days, about 100 rows a
// day, 8 markets. See spec.md.

/** Markets in the toy model, as at Mizan. */
export const MARKETS = 8;

/** Days in the query that asks for one week. */
export const WEEK_DAYS = 7;

export type PartitionInputs = {
  /** 0: no partitions. 1: one folder per day. 2: one folder per day and market. */
  partitionBy: number;
  /** Days of data in the lake. */
  days: number;
  /** Rows that arrive each day. */
  rowsPerDay: number;
};

export type PartitionCounts = {
  files: number;
  totalRows: number;
  rowsPerFile: number;
  /** Files a query for the last seven days opens. */
  weekFiles: number;
  /** Rows those files hold, which the query has to read. */
  weekRows: number;
};

function level(partitionBy: number): 0 | 1 | 2 {
  return partitionBy >= 2 ? 2 : partitionBy >= 1 ? 1 : 0;
}

/**
 * One file per partition, and every row lands in exactly one file.
 * None: 1 file. Day: one file per day. Day and market: one file per day and
 * market, so days x 8. A week query opens only the folders of its days when
 * the data is partitioned by day; with no partitions it opens the one file
 * and reads every row in it.
 */
export function partitionCounts({ partitionBy, days, rowsPerDay }: PartitionInputs): PartitionCounts {
  const mode = level(partitionBy);
  const weekDays = Math.min(WEEK_DAYS, days);
  const totalRows = days * rowsPerDay;
  const files = mode === 0 ? 1 : mode === 1 ? days : days * MARKETS;
  const weekFiles = mode === 0 ? 1 : mode === 1 ? weekDays : weekDays * MARKETS;
  return {
    files,
    totalRows,
    rowsPerFile: totalRows / files,
    weekFiles,
    weekRows: mode === 0 ? totalRows : weekDays * rowsPerDay,
  };
}

function inputsFrom(values: SliderValues): PartitionInputs {
  return {
    partitionBy: values.partitionBy ?? 1,
    days: values.days ?? 28,
    rowsPerDay: values.rowsPerDay ?? 100,
  };
}

export function formatCount(count: number): string {
  return count.toLocaleString("en-US", { maximumFractionDigits: 1 });
}

const LAYOUT_NAMES = ["no partitions", "one folder per day", "one folder per day and market"];

export function computePartitions(values: SliderValues): SliderResult {
  const inputs = inputsFrom(values);
  const counts = partitionCounts(inputs);
  const name = LAYOUT_NAMES[level(inputs.partitionBy)]!;

  return {
    stats: [
      { label: "Files in the lake", value: formatCount(counts.files), detail: `${formatCount(counts.totalRows)} rows in all` },
      { label: "Average rows per file", value: formatCount(counts.rowsPerFile), detail: name },
      { label: "Files a week query opens", value: formatCount(counts.weekFiles), detail: `reads ${formatCount(counts.weekRows)} rows` },
    ],
    bars: [
      { label: "Files in the lake", value: counts.files, display: formatCount(counts.files) },
      { label: "Files a week query opens", value: counts.weekFiles, display: formatCount(counts.weekFiles) },
    ],
    barMax: counts.files,
    summary: `With ${name}, ${formatCount(counts.totalRows)} rows sit in ${formatCount(counts.files)} files of ${formatCount(counts.rowsPerFile)} rows on average. A query for one week opens ${formatCount(counts.weekFiles)} of them and reads ${formatCount(counts.weekRows)} rows.`,
  };
}

export function describePartitionChange(before: SliderValues, after: SliderValues): string {
  const a = inputsFrom(before);
  const b = inputsFrom(after);
  const changed: string[] = [];
  if (level(a.partitionBy) !== level(b.partitionBy)) changed.push("the partition level");
  if (a.days !== b.days) changed.push("the days of data");
  if (a.rowsPerDay !== b.rowsPerDay) changed.push("the rows per day");
  if (changed.length === 0) return "Nothing changed.";
  const x = partitionCounts(a);
  const y = partitionCounts(b);
  const moved = changed.length === 1 ? `Changing ${changed[0]}` : "Changing several inputs";
  const files = x.files === y.files ? `the lake stays at ${formatCount(y.files)} files` : `the lake goes from ${formatCount(x.files)} files to ${formatCount(y.files)}`;
  const average =
    x.rowsPerFile === y.rowsPerFile
      ? `the average stays at ${formatCount(y.rowsPerFile)} rows per file`
      : `the average goes from ${formatCount(x.rowsPerFile)} to ${formatCount(y.rowsPerFile)} rows per file`;
  const week =
    x.weekFiles === y.weekFiles
      ? `a one-week query still opens ${formatCount(y.weekFiles)} files`
      : `a one-week query opens ${formatCount(y.weekFiles)} files instead of ${formatCount(x.weekFiles)}`;
  return `${moved}: ${files}, ${average}, and ${week}. Finer partitions let a query skip more files, and they also make each file smaller.`;
}

export const partitionFileSize: SliderSpec = {
  kind: "slider",
  title: "Finer partitions: fewer files read, more files made",
  purpose: "Choose how the lake is partitioned and watch the number of files, the rows in each file and the files a one-week query has to open.",
  intro:
    "Mizan's lake holds 28 days of data, about 100 rows a day, and 8 markets. Hala can write one folder per day, or one folder per day and market. Omar's weekly report asks for the last 7 days of every market. Predict how many files that query opens when Hala partitions by day and market, then move the sliders.",
  inputs: [
    { id: "partitionBy", label: "0 none, 1 day, 2 day+market", min: 0, max: 2, step: 1, default: 1, unit: "" },
    { id: "days", label: "Days of data", min: 1, max: 365, step: 1, default: 28, unit: "days" },
    { id: "rowsPerDay", label: "Rows per day", min: 100, max: 200000, step: 100, default: 100, unit: "rows" },
  ],
  compute: computePartitions,
  describeChange: describePartitionChange,
  barsTitle: "Files",
  tryThis: [
    "Leave 28 days and 100 rows a day, and switch from 1 (day) to 2 (day and market). The lake goes from 28 files to 224, the average falls from 100 rows to 12.5 rows per file, and the week query opens 56 files instead of 7.",
    "Switch to 0 (none). There is one file, so the week query opens just 1 file, but that file holds all 2,800 rows and the query reads every one of them.",
    "Go back to 1 (day) and raise the rows per day to about 100,000. Now each daily file holds 100,000 rows, and a folder per day is a layout worth skipping files for. At 2 (day and market) the same data gives files of 12,500 rows.",
  ],
  limits:
    "This is a simple illustration that counts files. It assumes every day has data for every market, one file per partition, and rows that spread evenly, so real counts differ: Mizan's own lake has 222 day-and-market files, not 224, because market M05 had no upload on two days. It ignores row groups, the size of each file in bytes and how fast any engine reads a file.",
};
