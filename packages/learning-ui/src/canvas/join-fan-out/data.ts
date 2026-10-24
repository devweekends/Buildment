import type { TableStepsSpec } from "../renderers/table-steps/types";

// Course: data-engineering (course 15), chapter 2.2 "Joins and what they do to row counts".
// A join to a table with two rows for one key multiplies the fact rows, so a
// sum after the join counts each price twice.
export const joinFanOut: TableStepsSpec = {
  kind: "table-steps",
  title: "Why did market M02's total double?",
  purpose: "Step through a join to see how a second row for one key multiplies the rows you add up.",
  summary:
    "Three price reports for market M02 are joined to a contacts table that has two rows for M02. The join returns six rows, and the total price goes from 24.5 to 49.0 shekels. Joining to one row per market fixes it.",
  tables: [
    {
      id: "reports",
      title: "reports (M02, 3 March)",
      columns: [
        { key: "report_id", label: "report_id" },
        { key: "item", label: "item" },
        { key: "price", label: "price", align: "right" },
      ],
      rows: [
        { report_id: "r-000141", item: "I01 flour", price: 4.5 },
        { report_id: "r-000142", item: "I02 rice", price: 8.0 },
        { report_id: "r-000143", item: "I05 oil", price: 12.0 },
      ],
    },
    {
      id: "contacts",
      title: "market_contacts",
      columns: [
        { key: "market_code", label: "market" },
        { key: "contact", label: "contact" },
      ],
      rows: [
        { market_code: "M01", contact: "Salem" },
        { market_code: "M02", contact: "Rana" },
        { market_code: "M02", contact: "Fadi" },
      ],
    },
    {
      id: "joined",
      title: "reports JOIN market_contacts",
      columns: [
        { key: "report_id", label: "report_id" },
        { key: "price", label: "price", align: "right" },
        { key: "contact", label: "contact" },
      ],
      rows: [
        { report_id: "r-000141", price: 4.5, contact: "Rana" },
        { report_id: "r-000141", price: 4.5, contact: "Fadi" },
        { report_id: "r-000142", price: 8.0, contact: "Rana" },
        { report_id: "r-000142", price: 8.0, contact: "Fadi" },
        { report_id: "r-000143", price: 12.0, contact: "Rana" },
        { report_id: "r-000143", price: 12.0, contact: "Fadi" },
      ],
    },
    {
      id: "totals",
      title: "SUM(price) for M02",
      columns: [
        { key: "query", label: "query" },
        { key: "rows", label: "rows", align: "right" },
        { key: "total", label: "total", align: "right" },
      ],
      rows: [
        { query: "reports only", rows: 3, total: 24.5 },
        { query: "after the join", rows: 6, total: 49.0 },
        { query: "one contact per market", rows: 3, total: 24.5 },
      ],
    },
  ],
  steps: [
    {
      title: "Start with three reports",
      note: "Market M02 sent three price reports on 3 March. Added up, they come to 24.5 shekels. This is the number Omar expects to see.",
      views: [
        { table: "reports", highlight: [0, 1, 2] },
        { table: "totals", rows: [0], highlight: [0] },
      ],
      chips: ["3 rows", "SUM = 24.5"],
    },
    {
      title: "The contacts table has two rows for M02",
      note: "Hala joins the reports to market_contacts to show who to call. Look at the key: M02 appears twice, because the market has two contacts.",
      views: [
        { table: "reports" },
        { table: "contacts", highlight: [1, 2], tone: "warn" },
      ],
      chips: ["market_code = M02", "2 matching rows"],
      tone: "warn",
    },
    {
      title: "Each report matches both contacts",
      note: "A join returns one row for every pair of rows that match. The first report matches Rana and Fadi, so it appears twice.",
      views: [
        { table: "reports", highlight: [0] },
        { table: "joined", rows: [0, 1], highlight: [0, 1], tone: "warn" },
      ],
      chips: ["1 report x 2 contacts = 2 rows"],
      tone: "warn",
    },
    {
      title: "Three reports become six rows",
      note: "Every report repeats once per contact. Nothing is wrong with any single row, but the result has six rows where you had three.",
      views: [{ table: "joined", highlight: [0, 1, 2, 3, 4, 5], tone: "warn" }],
      chips: ["3 x 2 = 6 rows"],
      tone: "warn",
      outcome: "6 rows",
    },
    {
      title: "The sum counts every price twice",
      note: "SUM(price) adds all six rows, so the total doubles to 49.0. This is fan-out: the join multiplied the rows before the sum ran.",
      views: [
        { table: "joined" },
        { table: "totals", rows: [0, 1], highlight: [1], tone: "bad" },
      ],
      chips: ["SUM = 49.0", "expected 24.5"],
      tone: "bad",
      outcome: "Doubled",
    },
    {
      title: "Join to one row per key",
      note: "Reduce the contacts to one row per market before the join (or join after you add up the prices). Each report matches once, and the total is right again.",
      views: [{ table: "totals", highlight: [2], tone: "good" }],
      chips: ["one row per market_code", "SUM = 24.5"],
      tone: "good",
      outcome: "Fixed",
    },
  ],
  tryThis: [
    "Before step 3, predict how many rows the join returns. Then check your answer at step 4.",
    "Imagine M02 had three contacts. How many rows would the join return, and what would the total be?",
    "Find the step where the problem starts. Is it the join, or the sum after it?",
  ],
  limits:
    "Three reports and three contacts keep the picture small. Real tables have thousands of rows, and fan-out hides there because the extra rows look normal. The fix shown (one row per key before joining) is one option; aggregating before the join is another.",
};
