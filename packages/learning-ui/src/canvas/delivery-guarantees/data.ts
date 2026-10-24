import type { SliderResult, SliderSpec, SliderValues } from "../renderers/slider/types";

// Course: data-engineering (course 15), chapter 10.3 "Delivery guarantees and the exactly-once myth".
// A consumer reads a batch of 10 battery readings, does its work (writes the
// rows) and saves its position. Which step comes first, where it crashes and
// whether the sink is safe to repeat decide what is lost or doubled. The
// defaults are the chapter's first example: save first, crash before the work.
// See spec.md.

/** Readings in the batch. A toy size, the same in every run. */
export const BATCH = 10;

export type DeliveryInputs = {
  /** 0: save the position first, then do the work. 1: do the work first, then save the position. */
  workFirst: number;
  /** 0: no crash. 1: crash before the work. 2: crash after the work. */
  crash: number;
  /** 0: the sink adds a row every time. 1: the sink keeps one row per reading id. */
  safeToRepeat: number;
};

export type DeliveryOutcome = {
  /** How many times the batch is worked on. */
  timesWorked: number;
  /** Readings that never reach the table. */
  lost: number;
  /** Rows in the table beyond one per reading. */
  duplicates: number;
  /** All rows in the table. */
  finalRows: number;
  /** The name of the guarantee this order gives. */
  guarantee: "at most once" | "at least once" | "effectively once";
};

/**
 * Toy rule. Saving the position first means a crash before the work leaves the
 * batch marked as read but never written: it is lost. Doing the work first means
 * a crash after the work, before the position is saved, makes the consumer read
 * the batch again and write it a second time. A sink that keeps one row per
 * reading id turns the second write into a replace, so no row doubles.
 */
export function deliver({ workFirst, crash, safeToRepeat }: DeliveryInputs): DeliveryOutcome {
  const saveFirst = workFirst === 0;
  let timesWorked = 1;
  if (saveFirst && crash === 1) timesWorked = 0;
  if (!saveFirst && crash === 2) timesWorked = 2;

  const distinct = timesWorked === 0 ? 0 : BATCH;
  const finalRows = safeToRepeat === 1 ? distinct : timesWorked * BATCH;
  const guarantee = saveFirst ? "at most once" : safeToRepeat === 1 ? "effectively once" : "at least once";
  return { timesWorked, lost: BATCH - distinct, duplicates: finalRows - distinct, finalRows, guarantee };
}

function inputsFrom(values: SliderValues): DeliveryInputs {
  return { workFirst: values.workFirst ?? 0, crash: values.crash ?? 1, safeToRepeat: values.safeToRepeat ?? 0 };
}

const CRASH_WORDS = ["no crash", "a crash before the work", "a crash after the work"];

function planText(i: DeliveryInputs): string {
  const order = i.workFirst === 0 ? "saves its position first" : "does the work first";
  const sink = i.safeToRepeat === 1 ? "a sink that keeps one row per reading" : "a sink that adds a row every time";
  return `the consumer ${order}, with ${CRASH_WORDS[i.crash]} and ${sink}`;
}

export function computeDelivery(values: SliderValues): SliderResult {
  const inputs = inputsFrom(values);
  const o = deliver(inputs);
  const note =
    inputs.crash === 0
      ? `With no crash, every order gives the same result.`
      : o.lost > 0
        ? `${o.lost} readings were marked as read but never written.`
        : o.duplicates > 0
          ? `The batch was written twice, so ${o.duplicates} rows are doubled.`
          : `Every reading is in the table exactly once.`;

  return {
    stats: [
      { label: "Readings lost", value: `${o.lost}`, detail: `of ${BATCH} sent` },
      { label: "Duplicate rows", value: `${o.duplicates}`, detail: "same reading twice" },
      { label: "Rows in the table", value: `${o.finalRows}`, detail: o.guarantee },
    ],
    bars: [
      { label: "Readings sent", value: BATCH, display: `${BATCH}` },
      { label: "Rows in the table", value: o.finalRows, display: `${o.finalRows}`, tone: o.finalRows === BATCH ? "good" : undefined },
      { label: "Readings lost", value: o.lost, display: `${o.lost}`, tone: o.lost > 0 ? "bad" : undefined },
      { label: "Duplicate rows", value: o.duplicates, display: `${o.duplicates}`, tone: o.duplicates > 0 ? "bad" : undefined },
    ],
    barMax: 2 * BATCH,
    summary: `${planText(inputs)}: ${o.lost} lost, ${o.duplicates} duplicate rows and ${o.finalRows} rows in the table. ${note}`,
  };
}

export function describeDeliveryChange(before: SliderValues, after: SliderValues): string {
  const a = inputsFrom(before);
  const b = inputsFrom(after);
  const changed: string[] = [];
  if (a.workFirst !== b.workFirst) changed.push("the order of the two steps");
  if (a.crash !== b.crash) changed.push("where the crash happens");
  if (a.safeToRepeat !== b.safeToRepeat) changed.push("the sink");
  if (changed.length === 0) return "Nothing changed.";
  const x = deliver(a);
  const y = deliver(b);
  const moved = changed.length === 1 ? `Changing ${changed[0]}` : "Changing several inputs";
  const result = `lost went from ${x.lost} to ${y.lost}, duplicate rows from ${x.duplicates} to ${y.duplicates}, and rows in the table from ${x.finalRows} to ${y.finalRows}`;
  let why: string;
  if (y.lost > 0) why = "The position was saved before the work, so the crash left a batch that is marked as read but was never written.";
  else if (y.duplicates > 0) why = "The work was done before the position was saved, so after the crash the batch was read and written again.";
  else if (b.crash === 0) why = "Nothing crashed, so each reading was written once.";
  else if (b.safeToRepeat === 1 && b.workFirst === 1 && b.crash === 2) why = "The batch was written twice, but the sink keeps one row per reading, so the second write replaced the first.";
  else why = "Nothing was lost, and the batch was written once.";
  return `${moved}: ${result}. ${why}`;
}

export const deliveryGuarantees: SliderSpec = {
  kind: "slider",
  title: "What a crash does to a batch of readings",
  purpose: "Choose whether the consumer saves its position or does the work first, where it crashes and whether the sink is safe to repeat, and see what is lost or doubled.",
  intro:
    "A consumer reads a batch of 10 battery readings. It must write them to a table and save its position. Here it saves the position first and crashes before it writes anything. Predict what happens to the batch, then change the order, the crash and the sink.",
  inputs: [
    { id: "workFirst", label: "Work first: 0 no, 1 yes", min: 0, max: 1, step: 1, default: 0, unit: "" },
    { id: "crash", label: "Crash: 0 no, 1 early, 2 late", min: 0, max: 2, step: 1, default: 1, unit: "" },
    { id: "safeToRepeat", label: "Safe to repeat: 0 no, 1 yes", min: 0, max: 1, step: 1, default: 0, unit: "" },
  ],
  compute: computeDelivery,
  describeChange: describeDeliveryChange,
  barsTitle: "Readings and rows",
  tryThis: [
    "Leave the defaults: the position is saved first and the crash comes before the work. All 10 readings are lost and the table has 0 rows. This is at most once.",
    "Set work first to 1. The crash before the work now loses nothing, because the position was not saved. Then set the crash to late (2): the batch is written twice, so the table has 20 rows and 10 are duplicates. This is at least once.",
    "With work first 1 and the late crash, set safe to repeat to 1. The table has 10 rows again. Now set work first back to 0 with the early crash: the safe sink does not bring back the 10 lost readings.",
  ],
  limits:
    "This is a simple illustration with one batch of 10 readings and one crash. Real consumers handle many batches, can crash in the middle of one, and a safe sink needs a real key for each reading, such as its id. Exactly-once between Kafka topics uses transactions, which this toy does not show.",
};
