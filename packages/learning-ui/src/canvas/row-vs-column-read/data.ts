import type { SliderResult, SliderSpec, SliderValues } from "../renderers/slider/types";

// Course: data-engineering (course 15), chapter 5.2 "Rows, columns and Parquet".
// A toy rule with equal-width columns: a row layout reads every column of every
// row, a column layout reads only the columns the query uses. The defaults are
// a Mizan-sized table that has grown: 10 columns, a query that needs 3, and
// 2 million rows. See spec.md.

/** Bytes per value in the toy model. Every column is the same width. */
export const BYTES_PER_VALUE = 8;

export type ReadInputs = {
  /** Columns in the table. */
  columns: number;
  /** Columns the query uses. Never more than the table has. */
  used: number;
  /** Rows in the table, in millions. */
  rowsMillions: number;
};

export type ReadCosts = {
  /** Columns the query really uses: the smaller of used and columns. */
  usedColumns: number;
  /** Data read by a row layout, in MB (illustrative). */
  rowMb: number;
  /** Data read by a column layout, in MB (illustrative). */
  columnMb: number;
  /** Data the column layout does not read, in MB. */
  skippedMb: number;
  /** Share of the table the column layout does not read, 0 to 100. */
  skippedPercent: number;
};

function round(value: number, places: number): number {
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
}

/**
 * Row layout: rows x columns x 8 bytes. Column layout: rows x used columns x
 * 8 bytes. One million rows of one 8-byte column is 8 MB. The share skipped
 * is (columns - used) / columns, so it does not depend on the number of rows.
 */
export function readCosts({ columns, used, rowsMillions }: ReadInputs): ReadCosts {
  const usedColumns = Math.max(1, Math.min(used, columns));
  const rowMb = round(rowsMillions * columns * BYTES_PER_VALUE, 2);
  const columnMb = round(rowsMillions * usedColumns * BYTES_PER_VALUE, 2);
  return {
    usedColumns,
    rowMb,
    columnMb,
    skippedMb: round(rowMb - columnMb, 2),
    skippedPercent: round(((columns - usedColumns) / columns) * 100, 1),
  };
}

function inputsFrom(values: SliderValues): ReadInputs {
  return {
    columns: values.columns ?? 10,
    used: values.used ?? 3,
    rowsMillions: values.rowsMillions ?? 2,
  };
}

/** MB below 1,000, otherwise GB with up to one decimal. */
export function formatMb(mb: number): string {
  if (mb >= 1000) return `${(mb / 1000).toLocaleString("en-US", { maximumFractionDigits: 1 })} GB`;
  return `${mb.toLocaleString("en-US", { maximumFractionDigits: 1 })} MB`;
}

export function formatPercent(percent: number): string {
  return `${percent.toLocaleString("en-US", { maximumFractionDigits: 1 })}%`;
}

export function computeRead(values: SliderValues): SliderResult {
  const inputs = inputsFrom(values);
  const cost = readCosts(inputs);
  const everyColumn = cost.usedColumns === inputs.columns;

  return {
    stats: [
      { label: "Row layout reads", value: formatMb(cost.rowMb), detail: `all ${inputs.columns} columns` },
      { label: "Column layout reads", value: formatMb(cost.columnMb), detail: `${cost.usedColumns} of ${inputs.columns} columns` },
      { label: "Not read", value: formatPercent(cost.skippedPercent), detail: `${formatMb(cost.skippedMb)} skipped` },
    ],
    bars: [
      { label: "Row layout", value: cost.rowMb, display: formatMb(cost.rowMb) },
      { label: "Column layout", value: cost.columnMb, display: formatMb(cost.columnMb) },
      { label: "Skipped", value: cost.skippedMb, display: formatMb(cost.skippedMb) },
    ],
    barMax: cost.rowMb,
    summary: everyColumn
      ? `The query uses every one of the ${inputs.columns} columns, so both layouts read ${formatMb(cost.rowMb)} and nothing is skipped.`
      : `A table of ${inputs.columns} columns and ${inputs.rowsMillions.toLocaleString("en-US")} million rows: the row layout reads ${formatMb(cost.rowMb)}, the column layout reads ${formatMb(cost.columnMb)} because the query uses ${cost.usedColumns} columns, so ${formatPercent(cost.skippedPercent)} is not read.`,
  };
}

export function describeReadChange(before: SliderValues, after: SliderValues): string {
  const a = inputsFrom(before);
  const b = inputsFrom(after);
  const changed: string[] = [];
  if (a.columns !== b.columns) changed.push("the number of columns in the table");
  if (a.used !== b.used) changed.push("the number of columns the query uses");
  if (a.rowsMillions !== b.rowsMillions) changed.push("the number of rows");
  if (changed.length === 0) return "Nothing changed.";
  const x = readCosts(a);
  const y = readCosts(b);
  const moved = changed.length === 1 ? `Changing ${changed[0]}` : "Changing several inputs";
  const rowPart = `the row layout reads ${formatMb(y.rowMb)} (before: ${formatMb(x.rowMb)})`;
  const columnPart = `the column layout reads ${formatMb(y.columnMb)} (before: ${formatMb(x.columnMb)})`;
  const share =
    y.skippedPercent === x.skippedPercent
      ? `the share not read stays at ${formatPercent(y.skippedPercent)}`
      : `the share not read goes from ${formatPercent(x.skippedPercent)} to ${formatPercent(y.skippedPercent)}`;
  const tail =
    y.usedColumns === b.columns
      ? " The query now uses every column, so a column layout has nothing to skip."
      : " The share depends on how many columns the query uses, not on how many rows there are.";
  return `${moved}: ${rowPart}, ${columnPart}, and ${share}.${tail}`;
}

export const rowVsColumnRead: SliderSpec = {
  kind: "slider",
  title: "Rows or columns: how much does a query read?",
  purpose: "Change the columns in the table, the columns the query uses and the number of rows, and compare what a row layout and a column layout must read.",
  intro:
    "Imagine Mizan's price table after a few years: 10 columns and 2 million rows, all the same width. Omar's question needs only 3 columns. A row layout reads whole rows. A column layout reads only the columns the query uses. Predict how much of the table the column layout can skip, then move the sliders.",
  inputs: [
    { id: "columns", label: "Columns in the table", min: 2, max: 40, step: 1, default: 10, unit: "columns" },
    { id: "used", label: "Columns the query uses", min: 1, max: 40, step: 1, default: 3, unit: "columns" },
    { id: "rowsMillions", label: "Rows in the table", min: 0.1, max: 100, step: 0.1, default: 2, unit: "million" },
  ],
  compute: computeRead,
  describeChange: describeReadChange,
  barsTitle: "Data read, in MB (illustrative)",
  tryThis: [
    "Leave 10 columns and 2 million rows. With the query using 3 columns, the row layout reads 160 MB and the column layout reads 48 MB, so 70% is not read. Now raise the columns used to 10: both layouts read 160 MB and nothing is skipped.",
    "Set the table to 40 columns and the query to 1 column. The column layout reads one fortieth of the row layout, so 97.5% is not read.",
    "Go back to 10 columns and 3 used, then double the rows from 2 to 4 million. Both numbers double, but the share not read stays at 70%.",
  ],
  limits:
    "This is a simple illustration, not a measurement. It gives every column the same width of 8 bytes per value, and it ignores compression, the statistics that let an engine skip blocks, and the cost of opening files. A query that looks up one whole record needs every column, so a column layout does not help it.",
};
