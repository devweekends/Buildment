import type { TableStepsSpec } from "../renderers/table-steps/types";

// Course: data-engineering (course 15), chapter 4.3 "Grain, facts and
// dimensions: the star schema". The same nine price reports of market M02
// (flour, rice and cooking oil on 3, 4 and 5 March, seed-7 data) are shown at
// three grains: one report, one market and day, one market and week. Adding up
// loses detail that adding up again cannot bring back.
export const chooseTheGrain: TableStepsSpec = {
  kind: "table-steps",
  title: "The same data at three grains",
  purpose: "Add nine price reports up to days and then to a week, and see which questions each grain can still answer.",
  summary:
    "Nine price reports for market M02 are added up to three daily costs of 32.0, 33.0 and 33.0 shekels, and then to one weekly average of 32.67. Each step answers fewer questions: after the daily grain nobody can read the price of flour, and after the weekly grain nobody can read the cheapest day. The fact table keeps one row per report so every coarser view can be built from it.",
  tables: [
    {
      id: "reports",
      title: "grain: one report (M02)",
      columns: [
        { key: "report_id", label: "report_id" },
        { key: "day", label: "day" },
        { key: "item", label: "item" },
        { key: "price", label: "price", align: "right" },
      ],
      rows: [
        { report_id: "r-000273", day: "3 Mar", item: "flour", price: "7.5" },
        { report_id: "r-000227", day: "3 Mar", item: "rice", price: "7.0" },
        { report_id: "r-000200", day: "3 Mar", item: "oil", price: "17.5" },
        { report_id: "r-000370", day: "4 Mar", item: "flour", price: "8.0" },
        { report_id: "r-000325", day: "4 Mar", item: "rice", price: "7.0" },
        { report_id: "r-000332", day: "4 Mar", item: "oil", price: "18.0" },
        { report_id: "r-000448", day: "5 Mar", item: "flour", price: "8.0" },
        { report_id: "r-000408", day: "5 Mar", item: "rice", price: "7.0" },
        { report_id: "r-000459", day: "5 Mar", item: "oil", price: "18.0" },
      ],
    },
    {
      id: "days",
      title: "grain: one market and day",
      columns: [
        { key: "day", label: "day" },
        { key: "reports", label: "reports", align: "right" },
        { key: "cost", label: "cost of 3 items", align: "right" },
      ],
      rows: [
        { day: "3 Mar", reports: 3, cost: "32.0" },
        { day: "4 Mar", reports: 3, cost: "33.0" },
        { day: "5 Mar", reports: 3, cost: "33.0" },
      ],
    },
    {
      id: "week",
      title: "grain: one market and week",
      columns: [
        { key: "iso_week", label: "iso_week", align: "right" },
        { key: "days", label: "days", align: "right" },
        { key: "average", label: "average cost", align: "right" },
      ],
      rows: [{ iso_week: 10, days: 3, average: "32.67" }],
    },
    {
      id: "questions",
      title: "can the grain answer it?",
      columns: [
        { key: "question", label: "question" },
        { key: "report", label: "report" },
        { key: "day", label: "day" },
        { key: "week", label: "week" },
      ],
      rows: [
        { question: "Flour price, 4 Mar", report: "yes", day: "no", week: "no" },
        { question: "Cost on 4 Mar", report: "yes", day: "yes", week: "no" },
        { question: "Cheapest day", report: "yes", day: "yes", week: "no" },
        { question: "Week 10 average", report: "yes", day: "yes", week: "yes" },
      ],
    },
  ],
  steps: [
    {
      title: "Nine price reports, one row each",
      note: "Market M02 sent flour, rice and cooking oil prices on three days. At this grain one row is one price report, so every price is still visible.",
      views: [{ table: "reports" }],
      chips: ["9 rows", "one row = one report"],
    },
    {
      title: "Add up to one row per market and day",
      note: "Adding the three prices of each day gives 32.0, 33.0 and 33.0 shekels. Nine rows became three. Nothing is wrong, but the single prices are no longer in this table.",
      views: [
        { table: "reports", highlight: [0, 1, 2], tone: "warn" },
        { table: "days", rows: [0], highlight: [0] },
      ],
      chips: ["9 rows to 3", "7.5 + 7.0 + 17.5 = 32.0"],
    },
    {
      title: "A question the daily grain cannot answer",
      note: "What did flour cost on 4 March? The daily row says only 33.0 for the three items together. Rice and oil could have been any prices that add up to 33.0.",
      views: [
        { table: "days", highlight: [1], tone: "warn" },
        { table: "questions", rows: [0], highlight: [0], tone: "warn" },
      ],
      chips: ["33.0 hides three prices"],
      tone: "warn",
    },
    {
      title: "Add up again to one row per market and week",
      note: "The average of the three daily costs is 32.67. Three rows became one. The week row is correct, and it answers only questions about the week.",
      views: [{ table: "week", highlight: [0] }],
      chips: ["3 rows to 1", "(32.0 + 33.0 + 33.0) / 3"],
    },
    {
      title: "You cannot split the week back into days",
      note: "Which day was cheapest? The weekly row has no days. Many different weeks give the same average of 32.67, so the detail cannot be rebuilt from it.",
      views: [
        { table: "week", highlight: [0], tone: "bad" },
        { table: "questions", highlight: [2, 3], tone: "bad" },
      ],
      chips: ["week row: no day, no item"],
      tone: "bad",
      outcome: "Detail lost",
    },
    {
      title: "Keep the finest grain you will need",
      note: "From nine report rows you can build the daily and weekly tables at any time. The other way round is impossible. This is why Mizan's fact table has one row per accepted price report.",
      views: [
        { table: "reports", highlight: [0, 1, 2, 3, 4, 5, 6, 7, 8], tone: "good" },
        { table: "questions", highlight: [0, 1, 2, 3], tone: "good" },
      ],
      chips: ["grain: one report", "all four questions answered"],
      tone: "good",
      outcome: "Build up, never down",
    },
  ],
  tryThis: [
    "Before step 3, predict whether the daily table can tell you the price of flour on 4 March. Check your answer at step 3.",
    "Imagine the week had 5 days with the same average of 32.67. Name two different sets of daily costs that give it.",
    "Find the step where a question first becomes impossible to answer. Was it the first add-up or the second?",
  ],
  limits:
    "Nine reports and three items keep the picture small, and the daily cost covers only three of the twelve items. The real basket has twelve items, and the fact table also keeps who reported and when. Coarser tables are still useful: they are quick to read and small to store, so many teams keep both, as long as the finest grain stays.",
};
