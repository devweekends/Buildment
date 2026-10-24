import type { SliderResult, SliderSpec, SliderValues } from "../renderers/slider/types";

// Course: data-engineering (course 15), chapter 9.3 "Retries, failures and backfills in an orchestrator".
// A task fails because something it needs is down for a while. It tries again
// after a wait that doubles each time. The defaults are the chapter's first
// example: an outage of 20 minutes, 3 retries, a first wait of 5 minutes. See spec.md.

export type OutageInputs = {
  /** How long the thing the task needs stays down, counted from the first attempt, in minutes. */
  outageMinutes: number;
  /** Retries after the first attempt, 0 to 5. */
  retries: number;
  /** The wait before the first retry, in minutes. Each later wait is double the one before. */
  firstWaitMinutes: number;
};

export type OutageOutcome = {
  /** Minutes after the first attempt at which each attempt starts. Attempt 1 is at minute 0. */
  attemptTimes: number[];
  /** Attempts made, counting the one that worked or the last one that failed. */
  attempts: number;
  succeeded: boolean;
  /** The minute of the attempt that worked, or of the last attempt when the task gave up. */
  finishMinutes: number;
  /** Minute of the last retry when the waits double. */
  lastRetryDoubling: number;
  /** Minute of the last retry when every wait is the same as the first. */
  lastRetryConstant: number;
};

/**
 * Attempt k (counting from 0) starts after the waits w, 2w, 4w ... have passed,
 * so at w x (2^k - 1) minutes. An attempt works when the outage is over:
 * its start time is at least the outage length.
 */
export function attemptTimes(retries: number, firstWaitMinutes: number): number[] {
  return Array.from({ length: retries + 1 }, (_, k) => firstWaitMinutes * (2 ** k - 1));
}

export function retryOutcome({ outageMinutes, retries, firstWaitMinutes }: OutageInputs): OutageOutcome {
  const times = attemptTimes(retries, firstWaitMinutes);
  const workedAt = times.findIndex((t) => t >= outageMinutes);
  const succeeded = workedAt !== -1;
  const attempts = succeeded ? workedAt + 1 : times.length;
  return {
    attemptTimes: times,
    attempts,
    succeeded,
    finishMinutes: times[attempts - 1]!,
    lastRetryDoubling: times[times.length - 1]!,
    lastRetryConstant: firstWaitMinutes * retries,
  };
}

function inputsFrom(values: SliderValues): OutageInputs {
  return {
    outageMinutes: values.outageMinutes ?? 20,
    retries: values.retries ?? 3,
    firstWaitMinutes: values.firstWaitMinutes ?? 5,
  };
}

export function formatMinutes(minutes: number): string {
  return `${minutes.toLocaleString("en-US")} min`;
}

export function computeOutage(values: SliderValues): SliderResult {
  const inputs = inputsFrom(values);
  const o = retryOutcome(inputs);
  const covers = (minute: number) => minute >= inputs.outageMinutes;
  const scale = Math.max(1, inputs.outageMinutes, o.lastRetryDoubling, o.lastRetryConstant);

  return {
    stats: [
      { label: "Attempts made", value: `${o.attempts}`, detail: `of ${inputs.retries + 1} allowed` },
      {
        label: "Task succeeded",
        value: o.succeeded ? "yes" : "no",
        detail: o.succeeded ? `on attempt ${o.attempts}` : `outage lasts ${formatMinutes(inputs.outageMinutes)}`,
      },
      {
        label: "Finish time",
        value: formatMinutes(o.finishMinutes),
        detail: o.succeeded ? "when the task worked" : "when the task gave up",
      },
    ],
    bars: [
      { label: "Outage ends at", value: inputs.outageMinutes, display: formatMinutes(inputs.outageMinutes) },
      {
        label: "Last retry, waits double",
        value: o.lastRetryDoubling,
        display: formatMinutes(o.lastRetryDoubling),
        tone: covers(o.lastRetryDoubling) ? "good" : "bad",
      },
      {
        label: "Last retry, same wait",
        value: o.lastRetryConstant,
        display: formatMinutes(o.lastRetryConstant),
        tone: covers(o.lastRetryConstant) ? "good" : "bad",
      },
    ],
    barMax: scale,
    summary: o.succeeded
      ? `The task works on attempt ${o.attempts} at minute ${o.finishMinutes}, after the outage ended at minute ${inputs.outageMinutes}.`
      : `The task makes ${o.attempts} attempts and gives up at minute ${o.finishMinutes}, before the outage ends at minute ${inputs.outageMinutes}.`,
  };
}

export function describeOutageChange(before: SliderValues, after: SliderValues): string {
  const a = inputsFrom(before);
  const b = inputsFrom(after);
  const changed: string[] = [];
  if (a.outageMinutes !== b.outageMinutes) changed.push("the outage length");
  if (a.retries !== b.retries) changed.push("the number of retries");
  if (a.firstWaitMinutes !== b.firstWaitMinutes) changed.push("the first wait");
  if (changed.length === 0) return "Nothing changed.";
  const x = retryOutcome(a);
  const y = retryOutcome(b);
  const moved = changed.length === 1 ? `Changing ${changed[0]}` : "Changing several inputs";
  const earlier = a.retries === 0 || x.lastRetryDoubling === y.lastRetryDoubling ? "" : ` (before: minute ${x.lastRetryDoubling})`;
  const reach =
    b.retries === 0
      ? "with no retries the task has one attempt"
      : `the last retry now starts at minute ${y.lastRetryDoubling}${earlier}`;
  if (y.succeeded) {
    const attempt = y.attempts === 1 ? "the first attempt" : `attempt ${y.attempts}`;
    return `${moved}: ${reach}. The outage ends at minute ${b.outageMinutes}, so the task works on ${attempt}.`;
  }
  return `${moved}: ${reach}. The outage still lasts until minute ${b.outageMinutes}, so all ${y.attempts} attempts fail and the task gives up.`;
}

export const retryBackoffOutage: SliderSpec = {
  kind: "slider",
  title: "Will the retries outlast the outage?",
  purpose: "Change the outage length, the number of retries and the first wait, and see whether a task whose waits double gets through.",
  intro:
    "A task fails at minute 0 because something it needs is down for 20 minutes. It may retry 3 times. The first wait is 5 minutes and each wait is double the one before. Predict whether the task gets through, then move the sliders.",
  inputs: [
    { id: "outageMinutes", label: "Outage length", min: 0, max: 120, step: 5, default: 20, unit: "min" },
    { id: "retries", label: "Retries allowed", min: 0, max: 5, step: 1, default: 3, unit: "retries" },
    { id: "firstWaitMinutes", label: "First wait", min: 1, max: 15, step: 1, default: 5, unit: "min" },
  ],
  compute: computeOutage,
  describeChange: describeOutageChange,
  barsTitle: "Minutes after the first attempt",
  tryThis: [
    "Leave the defaults. The waits are 5, 10 and 20 minutes, so the retries start at minutes 5, 15 and 35. The 20-minute outage is over by minute 35, so the task works on attempt 4. Three retries with the same 5-minute wait would end at minute 15 and fail.",
    "Raise the outage to 40 minutes. The last retry starts at minute 35, so all 4 attempts fail and the task gives up. Now raise the retries to 4: the new retry starts at minute 75 and works.",
    "Set the outage to 0. The first attempt works, so there is no retry at all. A retry only helps a task that fails because of something that goes away by itself.",
  ],
  limits:
    "This is a simple illustration with one outage that starts at the first attempt and ends at a known minute. Real outages end at times nobody knows, real runners add a small random part to each wait, and many failures never end by themselves. A retry cannot fix a bad input: if the data is wrong, every attempt fails the same way, whatever the sliders say.",
};
