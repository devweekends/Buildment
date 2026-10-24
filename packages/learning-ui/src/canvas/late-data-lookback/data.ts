import type { SliderResult, SliderSpec, SliderValues } from "../renderers/slider/types";

// Course: data-engineering (course 15), chapter 8.2 "Event time, processing time
// and late data". The counts are the seed-7 data with the default 28 days
// (python make_source.py): 211 of 2,633 reports first arrive after the day they
// were made, 76 of them 1 day later, 69 two days later and 66 three days later.
// 35 of the 211 are Market M05's outage (12, 12 and 11). See spec.md.

/** Late reports by how many days after the report day they first arrived: 1, 2 and 3 days. */
export const LATE_BY_DAYS = [76, 69, 66] as const;
/** The M05 outage reports (9 to 11 March, uploaded on 12 March) by the same lateness. */
export const M05_BY_DAYS = [12, 12, 11] as const;
export const TOTAL_REPORTS = 2633;
export const TOTAL_LATE = 211;
export const TOTAL_M05 = 35;

export type LookbackOutcome = {
  caught: number;
  missed: number;
  m05Caught: number;
  m05Missed: number;
  /** The newest report day plus the days before it that every run reads again. */
  daysRead: number;
  /** Caught reports in each lateness group (1, 2 and 3 days). */
  caughtByGroup: number[];
};

/**
 * A run reads the reports dated from (newest report date minus N days) onwards.
 * A report that first arrives k days after it was made falls inside that window
 * when k is at most N. So a lookback of N catches every group of lateness 1 to N
 * and misses the rest. Each run reads N + 1 days.
 */
export function lookbackOutcome(lookbackDays: number): LookbackOutcome {
  const n = Math.max(0, Math.floor(lookbackDays));
  const caughtByGroup: number[] = LATE_BY_DAYS.map((count, index) => (index + 1 <= n ? count : 0));
  const caught = caughtByGroup.reduce((sum: number, count: number) => sum + count, 0);
  const m05Caught = M05_BY_DAYS.reduce((sum: number, count: number, index: number) => sum + (index + 1 <= n ? count : 0), 0);
  return { caught, missed: TOTAL_LATE - caught, m05Caught, m05Missed: TOTAL_M05 - m05Caught, daysRead: n + 1, caughtByGroup };
}

function lookbackFrom(values: SliderValues): number {
  return values.lookbackDays ?? 0;
}

export function computeLookback(values: SliderValues): SliderResult {
  const n = lookbackFrom(values);
  const out = lookbackOutcome(n);
  const share = Math.round((100 * out.caught) / TOTAL_LATE);
  const dayWord = n === 1 ? "day" : "days";

  return {
    stats: [
      { label: "Late reports caught", value: `${out.caught} of ${TOTAL_LATE}`, detail: `${share} percent of the late reports` },
      { label: "Late reports missed", value: String(out.missed), detail: `${out.m05Missed} of M05's ${TOTAL_M05} outage reports` },
      { label: "Days read each run", value: String(out.daysRead), detail: n === 0 ? "only the newest day" : `the newest day and ${n} earlier ${dayWord}` },
    ],
    bars: LATE_BY_DAYS.map((count, index) => {
      const caught = out.caughtByGroup[index] ?? 0;
      return {
        label: `${index + 1} ${index === 0 ? "day" : "days"} late`,
        value: caught,
        display: `${caught} of ${count}`,
        tone: caught === count ? ("good" as const) : ("bad" as const),
      };
    }),
    barMax: LATE_BY_DAYS[0],
    summary:
      out.missed === 0
        ? `A lookback of ${n} ${dayWord} catches all ${TOTAL_LATE} late reports, and each run reads ${out.daysRead} days.`
        : `A lookback of ${n} ${dayWord} catches ${out.caught} of the ${TOTAL_LATE} late reports and misses ${out.missed}, and each run reads ${out.daysRead} ${out.daysRead === 1 ? "day" : "days"}.`,
  };
}

export function describeLookbackChange(before: SliderValues, after: SliderValues): string {
  const a = lookbackFrom(before);
  const b = lookbackFrom(after);
  if (a === b) return "Nothing changed.";
  const x = lookbackOutcome(a);
  const y = lookbackOutcome(b);
  const extraDays = y.daysRead - x.daysRead;
  const dayWord = Math.abs(extraDays) === 1 ? "day" : "days";

  if (b > a) {
    const gained = y.caught - x.caught;
    const read = `each run now reads ${Math.abs(extraDays)} more ${dayWord}`;
    if (gained === 0) {
      return `Raising the lookback from ${a} to ${b} catches no new late reports, because no report in this data is more than 3 days late, but ${read}. That is cost without benefit.`;
    }
    return `Raising the lookback from ${a} to ${b} catches ${gained} more late reports (${y.caught} of ${TOTAL_LATE} now), and ${read}.`;
  }
  const lost = x.caught - y.caught;
  const read = `each run reads ${Math.abs(extraDays)} fewer ${dayWord}`;
  if (lost === 0) {
    return `Lowering the lookback from ${a} to ${b} loses no late reports in this data, and ${read}.`;
  }
  return `Lowering the lookback from ${a} to ${b} misses ${lost} more late reports (${y.missed} of ${TOTAL_LATE} missed now), and ${read}.`;
}

export const lateDataLookback: SliderSpec = {
  kind: "slider",
  title: "How many late reports a lookback catches",
  purpose: "Choose how many days back each run reads again, and see how many of the late reports are caught and what each run costs.",
  intro:
    "In the seed-7 data with 28 days, 211 of 2,633 reports first arrive after the day they were made: 76 arrive 1 day late, 69 arrive 2 days late and 66 arrive 3 days late. The lookback starts at 0, where each run reads only the newest day. Predict how many a lookback of 1 day catches, then change it.",
  inputs: [{ id: "lookbackDays", label: "Lookback", min: 0, max: 5, step: 1, default: 0, unit: "days" }],
  compute: computeLookback,
  describeChange: describeLookbackChange,
  barsTitle: "Late reports caught, by how late they were",
  tryThis: [
    "Move the lookback from 0 to 1 day. It catches 76 of the 211 late reports, about a third, and misses 135.",
    "Set the lookback to 3. All 211 are caught, including the 35 reports from the M05 outage, and each run reads 4 days.",
    "Set the lookback to 5. The result does not improve, and each run reads 6 days. No report in this data is later than 3 days.",
  ],
  limits:
    "A report counts as late when its first upload is on a later day than the day it was made, and a lookback of N catches a report that is N days late or less. The counts are from one set of generated data in which no report is later than 3 days, so the benefit stops at 3. Real delays have no such limit, and the cost shown, days read, is the only cost the model counts.",
};
