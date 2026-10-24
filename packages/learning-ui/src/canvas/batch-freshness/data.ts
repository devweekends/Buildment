import type { SliderResult, SliderSpec, SliderValues } from "../renderers/slider/types";

// Course: data-engineering (course 15), chapter 1.3 "The map of a pipeline".
// Yasmin reads the daily table of reports that did not arrive and needs data
// that is no more than 24 hours old. Hala runs the batch job every 6 hours and
// a run takes 30 minutes. Pure arithmetic, no measured numbers. See spec.md.

export type FreshnessInputs = {
  /** How often a run starts, in hours. */
  runEveryHours: number;
  /** How long one run takes, in minutes. */
  runMinutes: number;
  /** The oldest the data may be when someone uses it, in hours. */
  needWithinHours: number;
};

export type Freshness = {
  /** Time from the start of one run to the start of the next. A run cannot start before the last one ends. */
  gapHours: number;
  /** True when a run takes longer than the chosen interval, so runs wait for each other. */
  queued: boolean;
  /** The oldest the data can be just before a new run finishes, in hours. */
  worstCaseAgeHours: number;
  meetsNeed: boolean;
  runsPerDay: number;
};

/**
 * The data in the table was taken when the last finished run started. Just
 * before the next run finishes, that data is one gap plus one run time old.
 * If a run takes longer than the interval, the next run starts when the last
 * one ends, so the gap is the run time.
 */
export function freshness({ runEveryHours, runMinutes, needWithinHours }: FreshnessInputs): Freshness {
  const runHours = runMinutes / 60;
  const gapHours = Math.max(runEveryHours, runHours);
  const worstCaseAgeHours = gapHours + runHours;
  return {
    gapHours,
    queued: runHours > runEveryHours,
    worstCaseAgeHours,
    meetsNeed: worstCaseAgeHours <= needWithinHours,
    runsPerDay: 24 / gapHours,
  };
}

function inputsFrom(values: SliderValues): FreshnessInputs {
  return {
    runEveryHours: values.runEveryHours ?? 6,
    runMinutes: values.runMinutes ?? 30,
    needWithinHours: values.needWithinHours ?? 24,
  };
}

/** Up to two decimals, no trailing zeros: 6.5, 24, 24.08. */
export function fmt(n: number): string {
  return String(Number(n.toFixed(2)));
}

export function computeFreshness(values: SliderValues): SliderResult {
  const inputs = inputsFrom(values);
  const f = freshness(inputs);
  const age = `${fmt(f.worstCaseAgeHours)} h`;
  const verdict = f.meetsNeed ? "meets" : "misses";

  return {
    stats: [
      {
        label: "Worst-case age",
        value: age,
        detail: f.queued ? "runs wait for each other" : `${fmt(f.gapHours)} h gap + ${inputs.runMinutes} min run`,
      },
      { label: "Meets the need", value: f.meetsNeed ? "Yes" : "No", detail: `needs ${fmt(inputs.needWithinHours)} h or less` },
      { label: "Runs per day", value: fmt(f.runsPerDay), detail: "each run uses time and power" },
    ],
    bars: [
      { label: "Worst-case age (h)", value: f.worstCaseAgeHours, display: age, tone: f.meetsNeed ? "good" : "bad" },
      { label: "Needed within (h)", value: inputs.needWithinHours, display: `${fmt(inputs.needWithinHours)} h` },
    ],
    barMax: Math.max(f.worstCaseAgeHours, inputs.needWithinHours),
    summary: `With a run every ${fmt(inputs.runEveryHours)} hours that takes ${inputs.runMinutes} minutes, the data can be up to ${age} old, which ${verdict} the need of ${fmt(inputs.needWithinHours)} hours. That is ${fmt(f.runsPerDay)} runs a day.`,
  };
}

export function describeFreshnessChange(before: SliderValues, after: SliderValues): string {
  const a = inputsFrom(before);
  const b = inputsFrom(after);
  const changed: string[] = [];
  if (a.runEveryHours !== b.runEveryHours) changed.push("the time between runs");
  if (a.runMinutes !== b.runMinutes) changed.push("the run time");
  if (a.needWithinHours !== b.needWithinHours) changed.push("the need");
  if (changed.length === 0) return "Nothing changed.";
  const x = freshness(a);
  const y = freshness(b);
  const what = changed.length === 1 ? `Changing ${changed[0]}` : "Changing several inputs";
  const move = y.worstCaseAgeHours > x.worstCaseAgeHours ? "rose" : y.worstCaseAgeHours < x.worstCaseAgeHours ? "fell" : "stayed";
  const age =
    move === "stayed"
      ? `at ${fmt(y.worstCaseAgeHours)} h`
      : `from ${fmt(x.worstCaseAgeHours)} h to ${fmt(y.worstCaseAgeHours)} h`;
  const earlier = x.meetsNeed ? "met" : "missed";
  const now = y.meetsNeed ? "meets" : "misses";
  const need = fmt(b.needWithinHours);
  const runs =
    x.runsPerDay === y.runsPerDay
      ? `Runs per day stayed at ${fmt(y.runsPerDay)}.`
      : `Runs per day went from ${fmt(x.runsPerDay)} to ${fmt(y.runsPerDay)}.`;
  return `${what}: the worst-case age ${move} ${age}. Against a need of ${need} hours, the plan ${earlier} it before and ${now} it now. ${runs}`;
}

export const batchFreshness: SliderSpec = {
  kind: "slider",
  title: "How old can batch data get?",
  purpose: "Change how often the job runs, how long a run takes and how fresh the data must be, and see whether a slower schedule is enough.",
  intro:
    "Yasmin, the volunteer coordinator, reads a daily table of the reports that have not arrived. She needs data that is no more than 24 hours old. Hala runs the batch job every 6 hours and a run takes 30 minutes. Predict how old the data can get, then change the schedule.",
  inputs: [
    { id: "runEveryHours", label: "Run every", min: 1, max: 24, step: 1, default: 6, unit: "h" },
    { id: "runMinutes", label: "A run takes", min: 5, max: 120, step: 5, default: 30, unit: "min" },
    { id: "needWithinHours", label: "Data needed within", min: 1, max: 48, step: 1, default: 24, unit: "h" },
  ],
  compute: computeFreshness,
  describeChange: describeFreshnessChange,
  barsTitle: "Worst-case age against the need, in hours",
  tryThis: [
    "Set run every to 24 hours, so the job runs once a day. The worst-case age rises from 6.5 hours to 24.5 hours and misses the 24 hour need by half an hour, because the run time counts too.",
    "Now raise the need to 36 hours. Once a day is enough: 24.5 hours is within 36, and the job runs 1 time a day instead of 4.",
    "Set run every to 1 hour and a run takes 120 minutes. A run takes longer than the gap, so each run waits for the last one: the gap is 2 hours, the worst-case age is 4 hours and the job runs 12 times a day.",
  ],
  limits:
    "This is a simple illustration of one idea: in batch, the age of the data is bounded by the gap between runs plus the run time. It assumes every run succeeds, that a run takes the same time each day, and that the data is taken when a run starts. It says nothing about late reports, which can make a fresh table incomplete, or about the cost of running more often on a small laptop.",
};
