import type { TableStepsSpec } from "../renderers/table-steps/types";

// Course: data-engineering (course 15), chapter 4.4 "Slowly changing
// dimensions". Market M03 moves from Harbour to Hill on 12 March (seed-7 data,
// registry history). Four flour reports (10 to 13 March) are joined to the
// market under type 1 (overwrite) and type 2 (a new row with dates). Keys 3 and
// 4 match the prototype in chapter 4.5.
export const scd2MarketMove: TableStepsSpec = {
  kind: "table-steps",
  title: "M03 moves to Hill: type 1 and type 2",
  purpose: "Step through a market that changes area and compare overwriting the old value with adding a new dated row.",
  summary:
    "Market M03 moves from Harbour to Hill on 12 March. Four flour reports were made on 10, 11, 12 and 13 March. Type 1 overwrites the area, so all four reports say Hill and Harbour shows none. Type 2 adds a second dimension row with dates, and each report joins to the version valid on its day, so two reports belong to Harbour and two to Hill. Joining on the market code alone matches each report to both versions and doubles the rows.",
  tables: [
    {
      id: "facts",
      title: "reports (M03, flour)",
      columns: [
        { key: "report_id", label: "report_id" },
        { key: "day", label: "day" },
        { key: "price", label: "price", align: "right" },
      ],
      rows: [
        { report_id: "r-000895", day: "10 Mar", price: "8.5" },
        { report_id: "r-000958", day: "11 Mar", price: "8.5" },
        { report_id: "r-001073", day: "12 Mar", price: "8.5" },
        { report_id: "r-001138", day: "13 Mar", price: "8.5" },
      ],
    },
    {
      id: "t1-before",
      title: "type 1 dimension, before",
      columns: [
        { key: "market_code", label: "market_code" },
        { key: "area", label: "area" },
      ],
      rows: [{ market_code: "M03", area: "Harbour" }],
    },
    {
      id: "t1-after",
      title: "type 1 dimension, after the move",
      columns: [
        { key: "market_code", label: "market_code" },
        { key: "area", label: "area" },
      ],
      rows: [{ market_code: "M03", area: "Hill" }],
    },
    {
      id: "result1",
      title: "type 1: reports by area",
      columns: [
        { key: "area", label: "area" },
        { key: "reports", label: "reports", align: "right" },
      ],
      rows: [
        { area: "Harbour", reports: 0 },
        { area: "Hill", reports: 4 },
      ],
    },
    {
      id: "t2-before",
      title: "type 2 dimension, before",
      columns: [
        { key: "market_key", label: "key", align: "right" },
        { key: "area", label: "area" },
        { key: "valid_from", label: "valid_from" },
        { key: "valid_to", label: "valid_to" },
        { key: "is_current", label: "current" },
      ],
      rows: [{ market_key: 3, area: "Harbour", valid_from: "2026-03-01", valid_to: null, is_current: "yes" }],
    },
    {
      id: "t2-after",
      title: "type 2 dimension, after the move",
      columns: [
        { key: "market_key", label: "key", align: "right" },
        { key: "area", label: "area" },
        { key: "valid_from", label: "valid_from" },
        { key: "valid_to", label: "valid_to" },
        { key: "is_current", label: "current" },
      ],
      rows: [
        { market_key: 3, area: "Harbour", valid_from: "2026-03-01", valid_to: "2026-03-12", is_current: "no" },
        { market_key: 4, area: "Hill", valid_from: "2026-03-12", valid_to: null, is_current: "yes" },
      ],
    },
    {
      id: "facts2",
      title: "type 2: fact rows with a market key",
      columns: [
        { key: "report_id", label: "report_id" },
        { key: "day", label: "day" },
        { key: "market_key", label: "market_key", align: "right" },
      ],
      rows: [
        { report_id: "r-000895", day: "10 Mar", market_key: 3 },
        { report_id: "r-000958", day: "11 Mar", market_key: 3 },
        { report_id: "r-001073", day: "12 Mar", market_key: 4 },
        { report_id: "r-001138", day: "13 Mar", market_key: 4 },
      ],
    },
    {
      id: "result2",
      title: "type 2: reports by area",
      columns: [
        { key: "area", label: "area" },
        { key: "reports", label: "reports", align: "right" },
      ],
      rows: [
        { area: "Harbour", reports: 2 },
        { area: "Hill", reports: 2 },
      ],
    },
    {
      id: "fanout",
      title: "join on market_code only",
      columns: [
        { key: "report_id", label: "report_id" },
        { key: "day", label: "day" },
        { key: "area", label: "area" },
      ],
      rows: [
        { report_id: "r-000895", day: "10 Mar", area: "Harbour" },
        { report_id: "r-000895", day: "10 Mar", area: "Hill" },
        { report_id: "r-000958", day: "11 Mar", area: "Harbour" },
        { report_id: "r-000958", day: "11 Mar", area: "Hill" },
        { report_id: "r-001073", day: "12 Mar", area: "Harbour" },
        { report_id: "r-001073", day: "12 Mar", area: "Hill" },
        { report_id: "r-001138", day: "13 Mar", area: "Harbour" },
        { report_id: "r-001138", day: "13 Mar", area: "Hill" },
      ],
    },
  ],
  steps: [
    {
      title: "Four reports, and a market about to move",
      note: "Market M03 is in the Harbour area. Four flour reports were made on 10, 11, 12 and 13 March. On 12 March the market moves to Hill.",
      views: [{ table: "facts" }, { table: "t1-before", highlight: [0] }],
      chips: ["4 reports", "move on 12 March"],
    },
    {
      title: "Type 1: overwrite the old value",
      note: "Type 1 changes the area in the same row. The row now says Hill, and the word Harbour is gone from the dimension.",
      views: [
        { table: "t1-before", dropped: [0] },
        { table: "t1-after", highlight: [0], tone: "warn" },
      ],
      chips: ["1 row", "Harbour replaced by Hill"],
      tone: "warn",
    },
    {
      title: "Type 1 rewrites history",
      note: "Every report now joins to Hill, including the two made on 10 and 11 March, while M03 was still in Harbour. A report of Harbour prices for those days finds nothing.",
      views: [
        { table: "facts", highlight: [0, 1], tone: "bad" },
        { table: "result1", highlight: [0, 1], tone: "bad" },
      ],
      chips: ["Harbour: 0", "Hill: 4"],
      tone: "bad",
      outcome: "History rewritten",
    },
    {
      title: "Type 2: end the old row and add a new one",
      note: "Type 2 keeps the Harbour row and gives it an end date, 12 March (the end date itself is not included). A new row for Hill starts on 12 March with a new key, 4.",
      views: [
        { table: "t2-before", dropped: [0] },
        { table: "t2-after", highlight: [0, 1] },
      ],
      chips: ["2 rows", "new key 4"],
    },
    {
      title: "Each report takes the key valid on its day",
      note: "The reports of 10 and 11 March fall from 2026-03-01 up to, but not including, 2026-03-12, so they get key 3. The reports of 12 and 13 March start on or after 2026-03-12, so they get key 4.",
      views: [
        { table: "facts2", highlight: [0, 1, 2, 3] },
        { table: "t2-after", highlight: [0, 1] },
      ],
      chips: ["valid_from <= day < valid_to"],
    },
    {
      title: "Type 2 keeps the history",
      note: "Counting reports by area now gives Harbour 2 and Hill 2. A report of Harbour prices for 10 and 11 March still finds them.",
      views: [{ table: "result2", highlight: [0, 1], tone: "good" }],
      chips: ["Harbour: 2", "Hill: 2"],
      tone: "good",
      outcome: "History kept",
    },
    {
      title: "Near miss: join on the market code alone",
      note: "If the join ignores the dates, every report matches both versions of M03. Four reports become eight rows, and any sum doubles, as in the fan-out of chapter 2.2.",
      views: [{ table: "fanout", highlight: [0, 1, 2, 3, 4, 5, 6, 7], tone: "bad" }],
      chips: ["4 reports x 2 versions = 8 rows"],
      tone: "bad",
      outcome: "8 rows",
    },
  ],
  tryThis: [
    "Before step 3, predict how many reports type 1 counts for Harbour. Check your answer at step 3.",
    "At step 5, imagine the move happened on 13 March instead. Which reports would get key 4?",
    "Find the step where history is lost and the step where it is kept. What does the second one cost in extra rows?",
  ],
  limits:
    "Four reports and one market keep the picture small. The dates here are whole days, so a change at 09:00 on 12 March counts for the whole of that day. A type 2 dimension also needs a rule for the first row of each market: in this prototype the dates come from the registry history, which a pipeline that only starts watching later may not have.",
};
