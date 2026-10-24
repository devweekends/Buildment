import type { TableStepsSpec } from "../renderers/table-steps/types";

// Course: data-engineering (course 15), chapter 8.3 "Duplicates and the keys that remove them".
// Five lines for one market and one day, in a small example (not the seed-7 data):
// one report sent twice, and two oil reports that are both real. Three keys give
// three different results. See spec.md.
//
// Checks: whole row keeps 5 lines, sum 8 + 8 + 7 + 18 + 19 = 60. Market, item and
// day keeps the newest line of each item: 8 + 7 + 19 = 34. report_id keeps the newest
// line of each report: 8 + 7 + 18 + 19 = 52, which is the right answer.
export const dedupeKeyChoice: TableStepsSpec = {
  kind: "table-steps",
  title: "Which key removes the resend and keeps the repeat?",
  purpose: "Remove duplicates three ways on the same five lines, and see which key keeps exactly the reports that are real.",
  summary:
    "Five lines arrive for one market and day. Four are different reports, and one report was sent twice. Removing duplicates on the whole row keeps all five lines and counts flour twice. Removing them on market, item and day drops a real second oil report. Removing them on report_id keeps four lines and a sum of 52.",
  tables: [
    {
      id: "lines",
      title: "Lines for one market on one day",
      columns: [
        { key: "report_id", label: "report_id" },
        { key: "item", label: "item" },
        { key: "price", label: "price", align: "right" },
        { key: "sent", label: "sent" },
      ],
      rows: [
        { report_id: "r-000501", item: "I01 flour", price: 8.0, sent: "09:10" },
        { report_id: "r-000501", item: "I01 flour", price: 8.0, sent: "11:40" },
        { report_id: "r-000502", item: "I02 rice", price: 7.0, sent: "09:10" },
        { report_id: "r-000503", item: "I05 oil", price: 18.0, sent: "09:10" },
        { report_id: "r-000504", item: "I05 oil", price: 19.0, sent: "12:30" },
      ],
    },
    {
      id: "totals",
      title: "Lines kept and their sum",
      columns: [
        { key: "key", label: "key" },
        { key: "kept", label: "kept", align: "right" },
        { key: "sum", label: "sum", align: "right" },
        { key: "result", label: "result" },
      ],
      rows: [
        { key: "whole row", kept: 5, sum: 60.0, result: "flour twice" },
        { key: "market, item, day", kept: 3, sum: 34.0, result: "repeat lost" },
        { key: "report_id", kept: 4, sum: 52.0, result: "right" },
      ],
    },
  ],
  steps: [
    {
      title: "Five lines, four real reports",
      note: "The first two lines are one report, r-000501, sent twice. The two oil lines have different report_ids and different prices. They are two real reports, because the volunteer priced oil again in the afternoon.",
      views: [{ table: "lines", highlight: [0, 1], tone: "warn" }],
      chips: ["5 lines", "4 reports", "1 resend", "1 real repeat"],
    },
    {
      title: "Key 1: the whole row",
      note: "Two rows are duplicates when every column matches. The resend was sent at 11:40, not 09:10, so the rows differ in one column. Nothing is removed, and flour is added twice.",
      views: [
        { table: "lines", highlight: [0, 1], tone: "warn" },
        { table: "totals", rows: [0], highlight: [0], tone: "bad" },
      ],
      chips: ["5 kept", "sum 60.0"],
      tone: "bad",
      outcome: "Resend kept",
    },
    {
      title: "Key 2: market, item and day",
      note: "Keep the newest line for each item in this market on this day. The resend of flour is removed, which is right. The 09:10 oil line is removed too, and that was a real report.",
      views: [
        { table: "lines", rows: [0, 1, 2, 3, 4], dropped: [0, 3], highlight: [3], tone: "bad" },
        { table: "totals", rows: [0, 1], highlight: [1], tone: "bad" },
      ],
      chips: ["3 kept", "sum 34.0"],
      tone: "bad",
      outcome: "Real report lost",
    },
    {
      title: "Key 3: report_id",
      note: "Keep the newest line for each report_id. Only the older copy of r-000501 is removed. Both oil reports stay, because their ids differ.",
      views: [
        { table: "lines", rows: [0, 1, 2, 3, 4], dropped: [0], highlight: [0], tone: "good" },
        { table: "totals", rows: [0, 1, 2], highlight: [2], tone: "good" },
      ],
      chips: ["4 kept", "sum 52.0"],
      tone: "good",
      outcome: "Right",
    },
    {
      title: "Compare the three keys",
      note: "The right key is the one the source gives to each real event. Here the phone form makes a report_id for each report and keeps it when it sends the report again. The other two keys describe the content or the place, not the report.",
      views: [{ table: "totals", highlight: [2], tone: "good" }],
      chips: ["4 reports expected", "52.0 expected"],
      tone: "good",
      outcome: "Use report_id",
    },
  ],
  tryThis: [
    "Before step 2, predict how many lines the whole-row key keeps. Check your answer at step 2.",
    "Find the line that key 2 drops by mistake, and say why the price of that report still matters.",
    "Imagine the phone form gave a resend a new report_id. Which of the three keys would catch it, and what would it also remove?",
  ],
  limits:
    "Five lines in one market and one day keep the picture small, and these lines are an example, not rows from the seed-7 data. Real resends can differ in more than the sent time. The newest line is kept here because a resend is the latest word from the source, which is a rule you choose, not a law.",
};
