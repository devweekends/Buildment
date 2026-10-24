import type { TableStepsSpec } from "../renderers/table-steps/types";

// Course: data-engineering (course 15), chapter 7.4 "Snapshots and incremental models".
// A snapshot records the state it finds at each run. If market M03 changes twice
// between two runs, the history keeps one new row and the middle state is lost.
// The second change (13 March) is an example added for this walkthrough: the
// seed-7 data has only the move from Harbour to Hill on 12 March. See spec.md.
export const snapshotSeesRuns: TableStepsSpec = {
  kind: "table-steps",
  title: "Why does the history skip a state?",
  purpose: "Step through two changes that happen between two snapshot runs, and see which version the history loses.",
  summary:
    "Market M03 moves from Harbour to Hill on 12 March and, in this example, to Old Town on 13 March. The snapshot runs on 11 March and on 14 March. It sees Harbour, then Old Town, so Hill is never recorded, and the reports of 12 March join the Harbour version. A run on every day would record all three.",
  tables: [
    {
      id: "registry",
      title: "What the registry app showed",
      columns: [
        { key: "day", label: "day" },
        { key: "area", label: "area" },
        { key: "updated", label: "updated_at" },
      ],
      rows: [
        { day: "1 Mar", area: "Harbour", updated: "1 Mar 00:00" },
        { day: "12 Mar", area: "Hill", updated: "12 Mar 09:00" },
        { day: "13 Mar", area: "Old Town", updated: "13 Mar 10:00" },
      ],
    },
    {
      id: "run1",
      title: "snap_markets after the 11 March run",
      columns: [
        { key: "area", label: "area" },
        { key: "from", label: "valid_from" },
        { key: "to", label: "valid_to" },
      ],
      rows: [{ area: "Harbour", from: "1 Mar", to: null }],
    },
    {
      id: "run2",
      title: "snap_markets after the 14 March run",
      columns: [
        { key: "area", label: "area" },
        { key: "from", label: "valid_from" },
        { key: "to", label: "valid_to" },
      ],
      rows: [
        { area: "Harbour", from: "1 Mar", to: "13 Mar" },
        { area: "Old Town", from: "13 Mar", to: null },
      ],
    },
    {
      id: "daily",
      title: "snap_markets if it ran every day",
      columns: [
        { key: "area", label: "area" },
        { key: "from", label: "valid_from" },
        { key: "to", label: "valid_to" },
      ],
      rows: [
        { area: "Harbour", from: "1 Mar", to: "12 Mar" },
        { area: "Hill", from: "12 Mar", to: "13 Mar" },
        { area: "Old Town", from: "13 Mar", to: null },
      ],
    },
    {
      id: "facts",
      title: "M03 reports and the version they join",
      columns: [
        { key: "day", label: "reported" },
        { key: "truth", label: "market was in" },
        { key: "joined", label: "joins to" },
      ],
      rows: [
        { day: "11 Mar", truth: "Harbour", joined: "Harbour" },
        { day: "12 Mar", truth: "Hill", joined: "Harbour" },
        { day: "13 Mar", truth: "Old Town", joined: "Old Town" },
      ],
    },
  ],
  steps: [
    {
      title: "Run 1 on 11 March: one version",
      note: "The registry says M03 is in Harbour, and it has said so since 1 March. The first snapshot run writes one row. Its valid_to is empty, because this is the current version.",
      views: [
        { table: "registry", rows: [0], highlight: [0] },
        { table: "run1", highlight: [0] },
      ],
      chips: ["1 row", "valid_to = NULL"],
    },
    {
      title: "12 March: the registry changes to Hill",
      note: "Yasmin updates the registry at 09:00. The app keeps only its newest row, so Harbour is gone from the app. Nobody has run the snapshot yet, so the history still says Harbour.",
      views: [
        { table: "registry", rows: [0, 1], highlight: [1] },
        { table: "run1" },
      ],
      chips: ["no snapshot run today"],
    },
    {
      title: "13 March: it changes again",
      note: "In this example, M03 moves once more, to Old Town, at 10:00. The registry now says Old Town. The snapshot has still not run since 11 March.",
      views: [
        { table: "registry", rows: [0, 1, 2], highlight: [2], tone: "warn" },
        { table: "run1" },
      ],
      chips: ["2 changes", "0 runs in between"],
      tone: "warn",
    },
    {
      title: "Run 2 on 14 March sees one change",
      note: "A snapshot compares the row it finds now with its last saved row. It finds Old Town, newer than Harbour, so it closes Harbour on 13 March and adds Old Town.",
      views: [
        { table: "registry", rows: [2], highlight: [2] },
        { table: "run2", highlight: [0, 1] },
      ],
      chips: ["Harbour closed 13 Mar", "Old Town added"],
    },
    {
      title: "Hill never reaches the history",
      note: "The history has two rows for three real versions. Hill lasted a day, and it was between two runs, so nothing remembers it. A snapshot cannot be rebuilt later, because the registry no longer holds Hill.",
      views: [
        { table: "daily", highlight: [1], tone: "bad" },
        { table: "run2" },
      ],
      chips: ["3 real versions", "2 rows saved"],
      tone: "bad",
      outcome: "Hill lost",
    },
    {
      title: "Reports of 12 March join the wrong version",
      note: "A report is joined to the version that was valid on its date. On 12 March the history says Harbour, which is valid until 13 March. The reports of 12 March are filed under the wrong area.",
      views: [{ table: "facts", highlight: [1], tone: "bad" }],
      chips: ["12 Mar: Hill joined to Harbour"],
      tone: "bad",
      outcome: "Wrong area",
    },
    {
      title: "Run the snapshot more often than changes happen",
      note: "A run on each of the three days would record all three versions. A daily run is the usual choice. It still cannot see two changes inside one day, so the history is never more exact than the run schedule.",
      views: [{ table: "daily", highlight: [0, 1, 2], tone: "good" }],
      chips: ["3 rows", "run at least daily"],
      tone: "good",
      outcome: "3 versions",
    },
  ],
  tryThis: [
    "Before step 4, predict how many rows the history will hold after the 14 March run. Then check step 4.",
    "Find the step where the change to Hill is first lost, and say what would have saved it.",
    "Imagine the snapshot ran only on Sundays. Which changes in a week would it keep?",
  ],
  limits:
    "Three versions and one market keep the picture small, and the second change is an example added for this walkthrough, because the seed-7 data has only the move from Harbour to Hill. Real snapshots hold many rows, and a changed row is found by comparing updated_at or the checked columns. This shows the timestamp strategy only.",
};
