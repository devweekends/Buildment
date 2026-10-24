import type { StateMachineSpec } from "../renderers/state-machine/types";

// Course: data-engineering (course 15), chapter 8.4 "Backfills and schema evolution".
// A batch goes through the contract check. A new optional field (the unit field
// from 15 March) is accepted and earlier rows get NULL. A batch that loses a
// required field (an example: price) is stopped, the source is fixed, and a
// backfill reruns the affected days. See spec.md.
export const schemaChangePath: StateMachineSpec = {
  kind: "state-machine",
  title: "What happens when the batch changes shape",
  purpose: "Follow two batches through the contract check: one with a new field, and one that lost a required field.",
  summary:
    "A new batch is checked against the contract. An added optional field, like unit from 15 March, is accepted and the older rows get NULL for it. A batch that is missing a required field, like price in this example, is stopped and nothing is written. The source is fixed, then a backfill reruns the affected days, and the batch lands.",
  states: [
    { id: "batch", name: "New batch", sub: "one upload day", col: 0, row: 0 },
    { id: "check", name: "Contract check", sub: "shape and rules", col: 1, row: 0 },
    { id: "landed", name: "Landed", sub: "rows in the lake", col: 2, row: 0 },
    { id: "stopped", name: "Batch stopped", sub: "nothing written", col: 0, row: 1 },
    { id: "fixed", name: "Source fixed", sub: "form corrected", col: 1, row: 1 },
    { id: "backfill", name: "Backfill", sub: "rerun the days", col: 2, row: 1 },
  ],
  edges: [
    { from: "batch", to: "check", label: "sent" },
    { from: "check", to: "landed", label: "new field ok" },
    { from: "check", to: "stopped", label: "stop" },
    { from: "stopped", to: "fixed", label: "fix" },
    { from: "fixed", to: "backfill", label: "resend" },
    { from: "backfill", to: "landed", label: "ok" },
  ],
  steps: [
    {
      state: "batch",
      edge: 0,
      title: "15 March: the batch has a new field",
      note: "From the upload of 15 March, every line has a unit field: kg, litre, tray of 30 or pack. The 14 earlier days of files do not have it.",
      chips: ["new field: unit", "14 earlier days without it"],
    },
    {
      state: "check",
      edge: 1,
      title: "The contract check compares the batch",
      note: "The contract lists nine required fields and one optional field, unit, which exists since 15 March. Every required field is present, so the shape is fine.",
      chips: ["9 required fields present"],
    },
    {
      state: "landed",
      tone: "good",
      outcome: "accepted",
      title: "An added optional field is accepted",
      note: "The batch lands with the unit column. Reading all the files together fills NULL for the days before 15 March, so no old file is rewritten. Nothing breaks and nobody has to fix anything.",
      chips: ["unit kept", "older days: NULL"],
    },
    {
      state: "batch",
      title: "Another day: a batch without price",
      note: "In this example, an update of the phone form drops the price field by mistake. The next upload arrives, and every line lacks it.",
      chips: ["example", "required field gone"],
      tone: "warn",
    },
    {
      state: "check",
      edge: 0,
      title: "The check finds the missing field",
      note: "The batch has no price, and price is required. Hala's check looks at the shape before it looks at any row, so it needs only the list of columns.",
      chips: ["price: required"],
      tone: "warn",
    },
    {
      state: "stopped",
      edge: 2,
      tone: "bad",
      outcome: "stopped",
      title: "The whole batch is stopped",
      note: "The check raises: required field(s) missing from the batch: price. Nothing is written, so the lake keeps its earlier days and no wrong row gets in.",
      chips: ["nothing written", "clear message"],
    },
    {
      state: "fixed",
      edge: 3,
      title: "Karam fixes the form at the source",
      note: "The fix belongs to the owner of the phone form. A pipeline cannot guess a missing price. Karam restores the field, and the phones send the reports again.",
      chips: ["fix at the source"],
    },
    {
      state: "backfill",
      edge: 4,
      title: "Backfill the days that were stopped",
      note: "Hala reruns the stopped days with the backfill command. Each day lands again, and a day that landed before is replaced, not added twice.",
      chips: ["rerun by date range", "safe to rerun"],
    },
    {
      state: "landed",
      edge: 5,
      tone: "good",
      outcome: "totals match",
      title: "The days land and the totals match",
      note: "The fact table has the same rows as if nothing had gone wrong. A backfill is safe because a rerun gives the same result as the first run.",
      chips: ["same result on a rerun"],
    },
  ],
  tryThis: [
    "At step 3, say why the earlier days did not need to be rewritten. Which setting fills NULL for them?",
    "At step 6, check what is in the lake. Why is stopping the batch better than writing it without a price?",
    "Name one more change to the phone form that would be accepted, and one that would be stopped.",
  ],
  limits:
    "The unit field is from the seed-7 data. The missing price is an example, and real forms break in other ways, such as a renamed field or a changed type. Here the contract has one version, and a renamed field would be a breaking change that a team agrees with the source owner. The picture shows one batch at a time.",
};
