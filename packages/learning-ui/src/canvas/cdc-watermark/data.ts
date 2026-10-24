import type { TableStepsSpec } from "../renderers/table-steps/types";

// Course: data-engineering (course 15), chapter 6.4 "Incremental loads and
// change data capture". Three runs of the registry extract (seed 7): run 1 on
// 14 March reads all 12 volunteers, run 2 on 16 March reads only V07, whose
// phone changed on 15 March at 08:30, and run 3 on 23 March reads nothing,
// because V11 was deleted on 22 March and a deleted row has no updated_at. Only
// three of the volunteers are shown. See spec.md.
export const cdcWatermark: TableStepsSpec = {
  kind: "table-steps",
  title: "A watermark sees a change, and misses a delete",
  purpose: "Step through three runs of the registry extract and see which changes a watermark finds and which one it cannot.",
  summary:
    "Run 1 reads all 12 volunteers and saves the watermark 2026-03-01 00:00. After V07 changes phone on 15 March, run 2 reads only that row and moves the watermark to 2026-03-15 08:30. After V11 is deleted on 22 March, run 3 reads no rows, because a deleted row has no updated_at, so the lake still lists V11. A change log records the delete.",
  tables: [
    {
      id: "src14",
      title: "registry.volunteers, 14 March (3 of 12)",
      columns: [
        { key: "volunteer_id", label: "id" },
        { key: "market_code", label: "market" },
        { key: "updated_at", label: "updated_at" },
      ],
      rows: [
        { volunteer_id: "V06", market_code: "M06", updated_at: "2026-03-01 00:00" },
        { volunteer_id: "V07", market_code: "M07", updated_at: "2026-03-01 00:00" },
        { volunteer_id: "V11", market_code: "M03", updated_at: "2026-03-01 00:00" },
      ],
    },
    {
      id: "src16",
      title: "registry.volunteers, 16 March (3 of 12)",
      columns: [
        { key: "volunteer_id", label: "id" },
        { key: "market_code", label: "market" },
        { key: "updated_at", label: "updated_at" },
      ],
      rows: [
        { volunteer_id: "V06", market_code: "M06", updated_at: "2026-03-01 00:00" },
        { volunteer_id: "V07", market_code: "M07", updated_at: "2026-03-15 08:30" },
        { volunteer_id: "V11", market_code: "M03", updated_at: "2026-03-01 00:00" },
      ],
    },
    {
      id: "src23",
      title: "registry.volunteers, 23 March (2 of 11)",
      columns: [
        { key: "volunteer_id", label: "id" },
        { key: "market_code", label: "market" },
        { key: "updated_at", label: "updated_at" },
      ],
      rows: [
        { volunteer_id: "V06", market_code: "M06", updated_at: "2026-03-01 00:00" },
        { volunteer_id: "V07", market_code: "M07", updated_at: "2026-03-15 08:30" },
      ],
    },
    {
      id: "state",
      title: "state/registry_watermarks.json",
      columns: [
        { key: "after", label: "after" },
        { key: "watermark", label: "volunteers" },
      ],
      rows: [
        { after: "nothing yet", watermark: "no watermark" },
        { after: "run 1", watermark: "2026-03-01 00:00" },
        { after: "run 2", watermark: "2026-03-15 08:30" },
        { after: "run 3", watermark: "2026-03-15 08:30" },
      ],
    },
    {
      id: "lake",
      title: "lake/shared/registry/volunteers",
      columns: [
        { key: "volunteer_id", label: "id" },
        { key: "market_code", label: "market" },
        { key: "updated_at", label: "updated_at" },
        { key: "run", label: "run", align: "right" },
      ],
      rows: [
        { volunteer_id: "V06", market_code: "M06", updated_at: "2026-03-01 00:00", run: 1 },
        { volunteer_id: "V07", market_code: "M07", updated_at: "2026-03-01 00:00", run: 1 },
        { volunteer_id: "V11", market_code: "M03", updated_at: "2026-03-01 00:00", run: 1 },
        { volunteer_id: "V07", market_code: "M07", updated_at: "2026-03-15 08:30", run: 2 },
      ],
    },
    {
      id: "changelog",
      title: "change log (log-based capture)",
      columns: [
        { key: "when", label: "when" },
        { key: "change", label: "change" },
        { key: "volunteer_id", label: "id" },
      ],
      rows: [
        { when: "15 Mar 08:30", change: "update", volunteer_id: "V07" },
        { when: "22 Mar", change: "delete", volunteer_id: "V11" },
      ],
    },
  ],
  steps: [
    {
      title: "Run 1 reads every row",
      note: "The first run has no watermark, so it asks for all the rows. On 14 March the registry holds 12 volunteers; the table shows three. The run writes them to the shared zone as one file.",
      views: [
        { table: "src14", highlight: [0, 1, 2] },
        { table: "lake", rows: [0, 1, 2], highlight: [0, 1, 2] },
      ],
      chips: ["no watermark yet", "12 rows read"],
    },
    {
      title: "Then it saves the watermark",
      note: "After the file exists, the run saves the biggest updated_at it saw: 2026-03-01 00:00. File first, watermark second. If the power fails between the two, the next run reads the same rows again, which does no harm.",
      views: [
        { table: "state", rows: [0, 1], highlight: [1] },
        { table: "lake", rows: [0, 1, 2] },
      ],
      chips: ["watermark = 2026-03-01 00:00"],
    },
    {
      title: "15 March: V07 gets a new phone number",
      note: "Yasmin updates V07 in the registry, and the registry app stamps that row with updated_at 2026-03-15 08:30. No other row changes.",
      views: [{ table: "src16", highlight: [1], tone: "warn" }],
      chips: ["V07 updated_at moved"],
      tone: "warn",
    },
    {
      title: "Run 2 asks only for newer rows",
      note: "Run 2 asks for rows where updated_at is after the watermark. Only V07 matches, so one row is written and the watermark moves to 2026-03-15 08:30.",
      views: [
        { table: "src16", highlight: [1] },
        { table: "lake", rows: [0, 1, 2, 3], highlight: [3], tone: "good" },
      ],
      chips: ["updated_at > watermark", "1 row read"],
      tone: "good",
      outcome: "1 row",
    },
    {
      title: "22 March: V11 leaves",
      note: "V11 leaves the project, and the registry app deletes the row. The row is gone, and so is its updated_at.",
      views: [{ table: "src16", dropped: [2], caption: "V11 deleted on 22 March" }],
      chips: ["row deleted"],
      tone: "warn",
    },
    {
      title: "Run 3 finds nothing",
      note: "Run 3 asks for rows newer than 2026-03-15 08:30. A deleted row cannot match, so 0 rows are read, and the lake still lists V11 as a volunteer.",
      views: [
        { table: "src23" },
        { table: "lake", rows: [0, 1, 2, 3], highlight: [2], tone: "bad" },
      ],
      chips: ["0 rows read", "V11 still in the lake"],
      tone: "bad",
      outcome: "missed",
    },
    {
      title: "A change log records the delete",
      note: "Log-based capture reads the database's own record of changes, so the delete is an event of its own. It costs more to set up and puts some load on the source.",
      views: [{ table: "changelog", highlight: [1], tone: "good" }],
      chips: ["delete event for V11"],
      tone: "good",
      outcome: "seen",
    },
  ],
  tryThis: [
    "Before step 6, predict how many rows run 3 reads. Then check the chip.",
    "Find the step where the delete happens. Which column would have to change for a watermark to see it?",
    "Look at steps 1 and 2. Why does the run save the watermark after writing the file, and not before?",
  ],
  limits:
    "Three volunteers keep the picture small, and the times are shown to the minute. A real registry has more rows and more changes between runs. The model does not show a clock that runs behind, or two changes with the same timestamp, which are further ways a watermark can miss a row.",
};
