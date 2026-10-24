import type { TableStepsSpec } from "../renderers/table-steps/types";

// Course: data-engineering (course 15), chapter 2.4 "CTEs and queries you can
// read". A toy basket of three items (I01 flour, I02 rice, I05 cooking oil) for
// two markets on 4 and 5 March 2026. Four steps of one query, each with a
// row count: 10 rows, then 8 after dropping bad rows, 6 after keeping basket
// items, 3 after adding up per market and day. The totals are 33.0, 25.5 and
// 7.5; the last two are not full baskets. See spec.md.
export const cteSteps: TableStepsSpec = {
  kind: "table-steps",
  title: "A long query, read as named steps",
  purpose: "Step through a query written as named steps and watch the row count change at each one.",
  summary:
    "Ten price reports go in. The step called good drops two bad rows and leaves 8. The step called basket keeps the three basket items and leaves 6. The step called day_total adds up per market and day and leaves 3 rows: 33.0 for M02 on 4 March, and 25.5 and 7.5 for M04. The two M04 totals hold only 2 and 1 items, so they are not full baskets. Checking the row count at every step finds this.",
  tables: [
    {
      id: "reports",
      title: "reports (raw)",
      columns: [
        { key: "id", label: "id" },
        { key: "market", label: "market" },
        { key: "day", label: "day" },
        { key: "item", label: "item" },
        { key: "price", label: "price", align: "right" },
      ],
      rows: [
        { id: "r1", market: "M02", day: "4 Mar", item: "I01", price: 8.0 },
        { id: "r2", market: "M02", day: "4 Mar", item: "I02", price: 7.0 },
        { id: "r3", market: "M02", day: "4 Mar", item: "I09", price: 23.0 },
        { id: "r4", market: "M02", day: "4 Mar", item: "I05", price: 18.0 },
        { id: "r5", market: "M04", day: "4 Mar", item: "I01", price: 7.5 },
        { id: "r6", market: "M04", day: "4 Mar", item: "I02", price: 0.0 },
        { id: "r7", market: "M04", day: "4 Mar", item: null, price: 4.0 },
        { id: "r8", market: "M04", day: "4 Mar", item: "I05", price: 18.0 },
        { id: "r9", market: "M04", day: "5 Mar", item: "I01", price: 7.5 },
        { id: "r10", market: "M04", day: "5 Mar", item: "I09", price: 24.0 },
      ],
    },
    {
      id: "good",
      title: "good",
      columns: [
        { key: "id", label: "id" },
        { key: "market", label: "market" },
        { key: "day", label: "day" },
        { key: "item", label: "item" },
        { key: "price", label: "price", align: "right" },
      ],
      rows: [
        { id: "r1", market: "M02", day: "4 Mar", item: "I01", price: 8.0 },
        { id: "r2", market: "M02", day: "4 Mar", item: "I02", price: 7.0 },
        { id: "r3", market: "M02", day: "4 Mar", item: "I09", price: 23.0 },
        { id: "r4", market: "M02", day: "4 Mar", item: "I05", price: 18.0 },
        { id: "r5", market: "M04", day: "4 Mar", item: "I01", price: 7.5 },
        { id: "r8", market: "M04", day: "4 Mar", item: "I05", price: 18.0 },
        { id: "r9", market: "M04", day: "5 Mar", item: "I01", price: 7.5 },
        { id: "r10", market: "M04", day: "5 Mar", item: "I09", price: 24.0 },
      ],
    },
    {
      id: "basket",
      title: "basket",
      columns: [
        { key: "id", label: "id" },
        { key: "market", label: "market" },
        { key: "day", label: "day" },
        { key: "item", label: "item" },
        { key: "price", label: "price", align: "right" },
      ],
      rows: [
        { id: "r1", market: "M02", day: "4 Mar", item: "I01", price: 8.0 },
        { id: "r2", market: "M02", day: "4 Mar", item: "I02", price: 7.0 },
        { id: "r4", market: "M02", day: "4 Mar", item: "I05", price: 18.0 },
        { id: "r5", market: "M04", day: "4 Mar", item: "I01", price: 7.5 },
        { id: "r8", market: "M04", day: "4 Mar", item: "I05", price: 18.0 },
        { id: "r9", market: "M04", day: "5 Mar", item: "I01", price: 7.5 },
      ],
    },
    {
      id: "day_total",
      title: "day_total",
      columns: [
        { key: "market", label: "market" },
        { key: "day", label: "day" },
        { key: "items", label: "items", align: "right" },
        { key: "total", label: "total", align: "right" },
      ],
      rows: [
        { market: "M02", day: "4 Mar", items: 3, total: 33.0 },
        { market: "M04", day: "4 Mar", items: 2, total: 25.5 },
        { market: "M04", day: "5 Mar", items: 1, total: 7.5 },
      ],
    },
    {
      id: "counts",
      title: "rows at each step",
      columns: [
        { key: "step", label: "step" },
        { key: "rows_in", label: "in", align: "right" },
        { key: "rows_out", label: "out", align: "right" },
      ],
      rows: [
        { step: "good", rows_in: 10, rows_out: 8 },
        { step: "basket", rows_in: 8, rows_out: 6 },
        { step: "day_total", rows_in: 6, rows_out: 3 },
      ],
    },
  ],
  steps: [
    {
      title: "Start with ten raw price reports",
      note: "Hala wants the cost of a small basket, flour (I01), rice (I02) and cooking oil (I05), for each market and day. The raw table has 10 rows. Two are bad: r6 has a price of 0 and r7 has no item code. Two more are eggs (I09), which are not in this basket.",
      views: [{ table: "reports" }],
      chips: ["10 rows"],
    },
    {
      title: "Step good: drop the bad rows",
      note: "The first named step keeps rows with a price above 0 and an item code. r6 and r7 are dropped. You can check this step alone: 10 rows go in and 8 come out.",
      views: [{ table: "reports", dropped: [5, 6], tone: "bad" }, { table: "good" }],
      chips: ["10 rows in", "8 rows out"],
    },
    {
      title: "Step basket: keep the three basket items",
      note: "The second step reads good, not the raw table. It keeps I01, I02 and I05. The two eggs rows, r3 and r10, drop out: 8 rows go in and 6 come out.",
      views: [{ table: "good", dropped: [2, 7] }, { table: "basket" }],
      chips: ["8 rows in", "6 rows out"],
    },
    {
      title: "M02 on 4 March: three items add up to 33.0",
      note: "The third step groups basket by market and day. M02 on 4 March has three rows, 8.0 + 7.0 + 18.0, so the first result row is 33.0 with 3 items.",
      views: [
        { table: "basket", highlight: [0, 1, 2] },
        { table: "day_total", rows: [0], highlight: [0] },
      ],
      chips: ["8.0 + 7.0 + 18.0 = 33.0"],
    },
    {
      title: "M04 adds up too, on two days",
      note: "M04 on 4 March has two basket rows, 7.5 + 18.0 = 25.5. M04 on 5 March has one, 7.5. The query returns all three groups: 6 rows go in and 3 come out.",
      views: [
        { table: "basket", highlight: [3, 4, 5] },
        { table: "day_total", rows: [0, 1, 2], highlight: [1, 2] },
      ],
      chips: ["7.5 + 18.0 = 25.5", "7.5 = 7.5"],
    },
    {
      title: "The items column shows a total that is not a basket",
      note: "25.5 and 7.5 look like cheap baskets. They are not. M04 has only 2 items on 4 March, because its rice price was bad, and 1 item on 5 March, because it reported only flour from the basket. A total is a basket cost only when every item is there, and the count per group shows it.",
      views: [{ table: "day_total", highlight: [1, 2], tone: "warn" }],
      chips: ["items: 3, 2, 1", "expected: 3"],
      tone: "warn",
      outcome: "incomplete",
    },
    {
      title: "Check every step by its row count",
      note: "Because each step has a name, you can look at its result and its count alone: 10, 8, 6, 3. When a total looks wrong, find the first step whose count you cannot explain. In this example every count has a reason.",
      views: [{ table: "counts", highlight: [0, 1, 2], tone: "good" }],
      chips: ["10 to 8 to 6 to 3"],
      tone: "good",
      outcome: "counts explained",
    },
  ],
  tryThis: [
    "Before step 2, predict how many rows reach the last step if two rows are bad and two are eggs. Check your answer at step 3.",
    "At step 6, change the question: what would the query return if r6 had a good price? Which market and day would then have 3 items?",
    "Find the step where a total stops being trustworthy. Which column shows it, and which step would you change to keep only full baskets?",
  ],
  limits:
    "Ten rows and a basket of three items keep the picture small. The real basket has 12 items and the real tables have thousands of rows, so you check counts with a query and not by eye. A named step is a way to read and check a query, not a promise that it runs faster, and the example does not say how to handle repeated prices for one item: you meet that in the drill.",
};
