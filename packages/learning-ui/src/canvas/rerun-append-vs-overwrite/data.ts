import type { SliderResult, SliderSpec, SliderValues } from "../renderers/slider/types";

// Course: data-engineering (course 15), chapter 6.3 "Idempotent jobs and safe
// reruns". The day is Mizan's upload folder for 4 March 2026 (seed 7): 100
// lines, 100 different report_ids, no bad rows, prices adding up to 1,241.0
// shekels. The write modes are append, replace the day's partition and merge on
// report_id. See spec.md.

/** Lines in the upload folder for 4 March. */
export const DAY_ROWS = 100;

/** The prices of those 100 lines added up, in shekels. */
export const DAY_TOTAL = 1241;

export const MODE_NAMES = ["append", "replace the day", "merge on report_id"];

export type RerunInputs = {
  /** How many times the job ran for this one day. */
  runs: number;
  /** 0 append, 1 replace the day's partition, 2 merge on report_id. */
  mode: number;
};

export type TableState = {
  rows: number;
  duplicates: number;
  totalPrice: number;
};

function modeIndex(mode: number): 0 | 1 | 2 {
  return mode >= 2 ? 2 : mode >= 1 ? 1 : 0;
}

/**
 * Append adds the day's 100 rows on every run, so a table that should hold 100
 * rows holds 100 x runs, 100 x (runs - 1) of them duplicates, and the day's
 * total price is multiplied by the runs. Replace and merge give the same table
 * after one run or four: 100 rows, no duplicates, the same total.
 */
export function tableAfterRuns({ runs, mode }: RerunInputs): TableState {
  const times = Math.max(1, Math.round(runs));
  if (modeIndex(mode) === 0) {
    return { rows: DAY_ROWS * times, duplicates: DAY_ROWS * (times - 1), totalPrice: DAY_TOTAL * times };
  }
  return { rows: DAY_ROWS, duplicates: 0, totalPrice: DAY_TOTAL };
}

function inputsFrom(values: SliderValues): RerunInputs {
  return { runs: values.runs ?? 2, mode: values.mode ?? 0 };
}

export function formatRows(rows: number): string {
  return rows.toLocaleString("en-US");
}

export function formatShekels(total: number): string {
  return total.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

export function computeRerun(values: SliderValues): SliderResult {
  const inputs = inputsFrom(values);
  const state = tableAfterRuns(inputs);
  const name = MODE_NAMES[modeIndex(inputs.mode)]!;
  const times = Math.max(1, Math.round(inputs.runs));
  const append = tableAfterRuns({ runs: times, mode: 0 });
  const replace = tableAfterRuns({ runs: times, mode: 1 });
  const merge = tableAfterRuns({ runs: times, mode: 2 });

  return {
    stats: [
      { label: "Rows for 4 March", value: formatRows(state.rows), detail: `should be ${formatRows(DAY_ROWS)}` },
      { label: "Duplicate rows", value: formatRows(state.duplicates), detail: state.duplicates === 0 ? "none" : `${formatRows(state.duplicates)} extra copies` },
      { label: "Day's total price", value: formatShekels(state.totalPrice), detail: `shekels, should be ${formatShekels(DAY_TOTAL)}` },
    ],
    bars: [
      { label: "Append", value: append.rows, display: formatRows(append.rows), tone: append.duplicates > 0 ? "bad" : undefined },
      { label: "Replace the day", value: replace.rows, display: formatRows(replace.rows) },
      { label: "Merge on report_id", value: merge.rows, display: formatRows(merge.rows) },
    ],
    barMax: DAY_ROWS * 4,
    summary: `After ${times} ${times === 1 ? "run" : "runs"} with ${name}, the table holds ${formatRows(state.rows)} rows for 4 March, ${formatRows(state.duplicates)} of them duplicates, and the day's prices add up to ${formatShekels(state.totalPrice)} shekels.`,
  };
}

export function describeRerunChange(before: SliderValues, after: SliderValues): string {
  const a = inputsFrom(before);
  const b = inputsFrom(after);
  const changed: string[] = [];
  if (Math.round(a.runs) !== Math.round(b.runs)) changed.push("the number of runs");
  if (modeIndex(a.mode) !== modeIndex(b.mode)) changed.push("the write mode");
  if (changed.length === 0) return "Nothing changed.";
  const x = tableAfterRuns(a);
  const y = tableAfterRuns(b);
  const moved = changed.length === 1 ? `Changing ${changed[0]}` : "Changing several inputs";
  const now = `the table holds ${formatRows(y.rows)} rows for 4 March, ${formatRows(y.duplicates)} of them duplicates, and the total price is ${formatShekels(y.totalPrice)} shekels`;
  const was = `before: ${formatRows(x.rows)} rows and ${formatShekels(x.totalPrice)} shekels`;
  const why =
    modeIndex(b.mode) === 0
      ? "Append adds the whole day again on every run."
      : "The job replaces or merges the day, so a rerun leaves the same table.";
  return `${moved}: ${now} (${was}). ${why}`;
}

export const rerunAppendVsOverwrite: SliderSpec = {
  kind: "slider",
  title: "Run the job again: append, replace or merge",
  purpose: "Change how many times the job ran for one day and how it writes, and watch the rows, the duplicates and the day's total price.",
  intro:
    "Mizan's uploads for 4 March hold 100 reports, and their prices add up to 1,241.0 shekels. Hala's job crashes after it has written the data, so she runs it again. Predict how many rows the table holds after two runs in the append mode and after two runs in the replace mode, then move the sliders.",
  inputs: [
    { id: "runs", label: "Times the job ran", min: 1, max: 4, step: 1, default: 2, unit: "times" },
    { id: "mode", label: "0 append, 1 replace, 2 merge", min: 0, max: 2, step: 1, default: 0, unit: "" },
  ],
  compute: computeRerun,
  describeChange: describeRerunChange,
  barsTitle: "Rows for 4 March after this many runs",
  tryThis: [
    "Leave the runs at 2 and the write mode on 0 (append). The table holds 200 rows, 100 of them duplicates, and the day's total price is 2,482.0 shekels. Switch the write mode to 1 (replace): 100 rows, no duplicates, 1,241.0 shekels.",
    "Set the runs to 4, then switch the write mode to 1 (replace) or 2 (merge). The table drops from 400 rows to 100, with no duplicates, and the total returns to 1,241.0. The result is the same however many times the job runs.",
    "Switch between 1 and 2 with 3 runs. Nothing changes, because here the job writes the whole day each time. The two differ when a rerun brings only some of a day's rows, which this model does not show.",
  ],
  limits:
    "This is a simple illustration with one day of 100 rows that never changes between runs. It does not show a job that crashes half way, rows that change between runs, or what a merge costs on a large table. Replace and merge give the same table here only because every run writes the whole day.",
};
