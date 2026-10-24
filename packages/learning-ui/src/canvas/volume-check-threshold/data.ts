import type { SliderResult, SliderSpec, SliderValues } from "../renderers/slider/types";

// Data Engineering course, chapter 11.2 "Data quality: checks and monitoring".
// Fourteen upload days of Mizan's seed-7 data (15 to 28 March, rows received
// per day, good rows plus quarantined rows). On 24 March the first batch of
// the day never arrived, so only the second batch's 37 rows came in. The real
// count that day was 94. The check is the one the learner builds in 11.5: a day
// raises an alarm when its rows are below the average of the 7 days before it
// times (1 minus the tolerance). Only a drop raises an alarm. See spec.md.

/** Rows received per upload day, 15 to 28 March. The 10th value (24 March) has the missing batch. */
export const ROWS_PER_DAY: readonly number[] = [97, 93, 99, 96, 97, 90, 105, 99, 97, 37, 92, 92, 97, 111];

/** The first day of the series is 15 March. */
export const FIRST_DAY_OF_MONTH = 15;

/** Index of the day with the missing batch (24 March). */
export const MISSING_INDEX = 9;

/** How many earlier days the average looks back over. */
export const WINDOW_DAYS = 7;

export type DayResult = {
  /** Day of the month, 15 to 28. */
  day: number;
  rows: number;
  /** Average of the earlier days in the window, or null for the first day. */
  average: number | null;
  /** Rows below this raise an alarm, rounded to one decimal, or null for the first day. */
  line: number | null;
  alarm: boolean;
};

export type VolumeRun = {
  days: DayResult[];
  /** True when the missing-batch day raised an alarm. */
  caught: boolean;
  /** Days of the month with an alarm, other than the missing-batch day. */
  falseAlarmDays: number[];
};

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

/** Runs the check on every day of the series for one tolerance (0 to 100, in percent). */
export function runVolumeCheck(tolerancePercent: number, rows: readonly number[] = ROWS_PER_DAY): VolumeRun {
  const tolerance = tolerancePercent / 100;
  const days: DayResult[] = rows.map((value, index) => {
    const earlier = rows.slice(Math.max(0, index - WINDOW_DAYS), index);
    if (earlier.length === 0) {
      return { day: FIRST_DAY_OF_MONTH + index, rows: value, average: null, line: null, alarm: false };
    }
    const average = earlier.reduce((sum, n) => sum + n, 0) / earlier.length;
    const line = round1(average * (1 - tolerance));
    return { day: FIRST_DAY_OF_MONTH + index, rows: value, average, line, alarm: value < line };
  });
  const caught = days[MISSING_INDEX]!.alarm;
  const falseAlarmDays = days.filter((d, index) => d.alarm && index !== MISSING_INDEX).map((d) => d.day);
  return { days, caught, falseAlarmDays };
}

function toleranceFrom(values: SliderValues): number {
  return values.tolerance ?? 50;
}

function formatRows(value: number): string {
  return value.toLocaleString("en-US", { maximumFractionDigits: 1 });
}

/** "16, 18 and 20 March", or "none" for no days. */
export function formatDays(days: number[]): string {
  if (days.length === 0) return "none";
  const list = days.length === 1 ? String(days[0]) : `${days.slice(0, -1).join(", ")} and ${days[days.length - 1]}`;
  return `${list} March`;
}

export function computeVolume(values: SliderValues): SliderResult {
  const tolerance = toleranceFrom(values);
  const run = runVolumeCheck(tolerance);
  const missing = run.days[MISSING_INDEX]!;
  const falseCount = run.falseAlarmDays.length;
  const average = missing.average ?? 0;
  const line = missing.line ?? 0;

  return {
    stats: [
      {
        label: "Missing batch caught",
        value: run.caught ? "Yes" : "No",
        detail: run.caught ? "24 March raises an alarm" : "24 March passes the check",
      },
      {
        label: "False alarms",
        value: String(falseCount),
        detail: falseCount === 0 ? "no normal day alarms" : `on ${formatDays(run.falseAlarmDays)}`,
      },
      {
        label: "Alarm line, 24 March",
        value: `${formatRows(line)} rows`,
        detail: `${tolerance}% below the average`,
      },
    ],
    bars: [
      { label: "Usual (7-day average)", value: average, display: formatRows(round1(average)) },
      { label: "Alarm line", value: line, display: formatRows(line), tone: run.caught ? undefined : "warn" },
      { label: "Rows that arrived", value: missing.rows, display: formatRows(missing.rows), tone: "bad" },
    ],
    barMax: 120,
    summary: run.caught
      ? `At a tolerance of ${tolerance}%, the alarm line on 24 March is ${formatRows(line)} rows, so the 37 rows that arrived raise an alarm. False alarms on normal days: ${falseCount}.`
      : `At a tolerance of ${tolerance}%, the alarm line on 24 March is only ${formatRows(line)} rows, so the 37 rows that arrived pass and the missing batch goes unnoticed. False alarms on normal days: ${falseCount}.`,
  };
}

export function describeVolumeChange(before: SliderValues, after: SliderValues): string {
  const a = toleranceFrom(before);
  const b = toleranceFrom(after);
  if (a === b) return "Nothing changed.";
  const x = runVolumeCheck(a);
  const y = runVolumeCheck(b);
  const lineBefore = formatRows(x.days[MISSING_INDEX]!.line ?? 0);
  const lineNow = formatRows(y.days[MISSING_INDEX]!.line ?? 0);
  const direction = b > a ? "Raising" : "Lowering";
  const effect = b > a ? "lowers" : "raises";
  const first = `${direction} the tolerance from ${a}% to ${b}% ${effect} the alarm line on 24 March from ${lineBefore} to ${lineNow} rows.`;

  const fa = x.falseAlarmDays.length;
  const fb = y.falseAlarmDays.length;
  let second: string;
  if (fb < fa) second = `False alarms fall from ${fa} to ${fb}.`;
  else if (fb > fa) second = `False alarms rise from ${fa} to ${fb}, because ordinary days that fall a little below the average now cross the line.`;
  else second = `False alarms stay at ${fb}.`;

  let third: string;
  if (x.caught && !y.caught) third = "The missing batch is no longer caught: 37 rows is now above the line.";
  else if (!x.caught && y.caught) third = "The missing batch is caught now: 37 rows is below the line.";
  else third = x.caught ? "The missing batch is still caught." : "The missing batch is still not caught.";

  return `${first} ${second} ${third}`;
}

export const volumeCheckThreshold: SliderSpec = {
  kind: "slider",
  title: "Where should the volume alarm sit?",
  purpose: "Change the tolerance of a volume check and see when it catches a missing batch and when it raises an alarm on a normal day.",
  intro:
    "Mizan's pipeline received these rows on 14 upload days, 15 to 28 March. On 24 March the first batch of the day never arrived, so only 37 rows came in. The check compares each day with the average of the 7 days before it. Predict what a tolerance of 0% does, then move the slider.",
  inputs: [{ id: "tolerance", label: "Tolerance below the average", min: 0, max: 90, step: 5, default: 50, unit: "%" }],
  compute: computeVolume,
  describeChange: describeVolumeChange,
  barsTitle: "Rows on 24 March",
  tryThis: [
    "Set the tolerance to 0%. An alarm now fires on any day below the average, so 16, 18 and 20 March raise false alarms as well as the real problem.",
    "Set the tolerance to 10%. The false alarms disappear and the missing batch is still caught. Every normal day sits within 10% of its average.",
    "Set the tolerance to 65%. The alarm line drops to 34.2 rows, below the 37 that arrived, so the missing batch passes the check.",
  ],
  limits:
    "This is a simple illustration with one real problem in 14 days, so it cannot tell you the best tolerance for another dataset. A series with bigger normal swings, such as weekends or holidays, needs a wider tolerance or a comparison with the same weekday. The check also looks only at drops, so a large spike never raises an alarm here.",
};
