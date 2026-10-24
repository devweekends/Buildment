import type { TableStepsSpec } from "../renderers/table-steps/types";

// Course: data-engineering (course 15), chapter 3.2 "Window functions: ranking
// and deduplication". Seven upload lines are numbered with ROW_NUMBER per
// report_id and cut to one line per report. Then eight markets that tie on a
// flour price show why RANK keeps both tied rows and ROW_NUMBER keeps one.
// Rows come from the seed-7, 28-day Mizan data (sends of r-000019, r-000020,
// r-000147 and r-000174; flour prices on 8 March).
export const rowNumberDedupe: TableStepsSpec = {
  kind: "table-steps",
  title: "ROW_NUMBER keeps one line per report",
  purpose: "Step through the numbering that keeps the newest send of each report, then see how RANK and ROW_NUMBER treat a tie.",
  summary:
    "Seven upload lines hold four reports, and three reports were sent twice. ROW_NUMBER with PARTITION BY report_id and ORDER BY uploaded_at DESC gives the newest send number 1. Keeping number 1 leaves four lines. A second example ranks eight markets by flour price: RANK keeps both tied markets at rank 1, and ROW_NUMBER keeps one.",
  tables: [
    {
      id: "sends",
      title: "upload lines (1 and 2 March)",
      columns: [
        { key: "report_id", label: "report_id" },
        { key: "market", label: "market" },
        { key: "item", label: "item" },
        { key: "price", label: "price", align: "right" },
        { key: "uploaded", label: "uploaded" },
      ],
      rows: [
        { report_id: "r-000019", market: "M04", item: "I07", price: "3.0", uploaded: "1 Mar 10:10" },
        { report_id: "r-000020", market: "M02", item: "I06", price: "4.0", uploaded: "1 Mar 09:56" },
        { report_id: "r-000020", market: "M02", item: "I06", price: "4.0", uploaded: "1 Mar 12:39" },
        { report_id: "r-000147", market: "M06", item: "I07", price: "3.5", uploaded: "2 Mar 11:27" },
        { report_id: "r-000147", market: "M06", item: "I07", price: "3.5", uploaded: "2 Mar 14:16" },
        { report_id: "r-000174", market: "M03", item: "I10", price: "37.5", uploaded: "2 Mar 12:14" },
        { report_id: "r-000174", market: "M03", item: "I10", price: "37.5", uploaded: "2 Mar 14:15" },
      ],
    },
    {
      id: "numbered",
      title: "ROW_NUMBER per report_id, newest first",
      columns: [
        { key: "report_id", label: "report_id" },
        { key: "uploaded", label: "uploaded" },
        { key: "rn", label: "rn", align: "right" },
      ],
      rows: [
        { report_id: "r-000019", uploaded: "1 Mar 10:10", rn: 1 },
        { report_id: "r-000020", uploaded: "1 Mar 12:39", rn: 1 },
        { report_id: "r-000020", uploaded: "1 Mar 09:56", rn: 2 },
        { report_id: "r-000147", uploaded: "2 Mar 14:16", rn: 1 },
        { report_id: "r-000147", uploaded: "2 Mar 11:27", rn: 2 },
        { report_id: "r-000174", uploaded: "2 Mar 14:15", rn: 1 },
        { report_id: "r-000174", uploaded: "2 Mar 12:14", rn: 2 },
      ],
    },
    {
      id: "kept",
      title: "WHERE rn = 1",
      columns: [
        { key: "report_id", label: "report_id" },
        { key: "market", label: "market" },
        { key: "item", label: "item" },
        { key: "price", label: "price", align: "right" },
        { key: "uploaded", label: "uploaded" },
      ],
      rows: [
        { report_id: "r-000019", market: "M04", item: "I07", price: "3.0", uploaded: "1 Mar 10:10" },
        { report_id: "r-000020", market: "M02", item: "I06", price: "4.0", uploaded: "1 Mar 12:39" },
        { report_id: "r-000147", market: "M06", item: "I07", price: "3.5", uploaded: "2 Mar 14:16" },
        { report_id: "r-000174", market: "M03", item: "I10", price: "37.5", uploaded: "2 Mar 14:15" },
      ],
    },
    {
      id: "ties",
      title: "flour (I01), 8 March, cheapest first",
      columns: [
        { key: "market", label: "market" },
        { key: "price", label: "price", align: "right" },
        { key: "rank", label: "rank", align: "right" },
        { key: "dense_rank", label: "dense_rank", align: "right" },
        { key: "row_number", label: "row_number", align: "right" },
      ],
      rows: [
        { market: "M04", price: "7.5", rank: 1, dense_rank: 1, row_number: 1 },
        { market: "M07", price: "7.5", rank: 1, dense_rank: 1, row_number: 2 },
        { market: "M01", price: "8.0", rank: 3, dense_rank: 2, row_number: 3 },
        { market: "M02", price: "8.0", rank: 3, dense_rank: 2, row_number: 4 },
        { market: "M08", price: "8.0", rank: 3, dense_rank: 2, row_number: 5 },
        { market: "M03", price: "8.5", rank: 6, dense_rank: 3, row_number: 6 },
        { market: "M06", price: "8.5", rank: 6, dense_rank: 3, row_number: 7 },
        { market: "M05", price: "9.0", rank: 8, dense_rank: 4, row_number: 8 },
      ],
    },
  ],
  steps: [
    {
      title: "Seven lines, four reports",
      note: "The phone form uploaded seven lines. Three reports were sent twice: r-000020, r-000147 and r-000174. Counting lines gives 7, but only 4 different reports exist.",
      views: [{ table: "sends" }],
      chips: ["7 lines", "4 report_ids"],
    },
    {
      title: "PARTITION BY report_id makes one group per report",
      note: "The window function works inside a group of lines that share a report_id. These two lines are the group for r-000020. Every other report is its own group.",
      views: [{ table: "sends", highlight: [1, 2] }],
      chips: ["group: r-000020", "2 lines"],
    },
    {
      title: "ORDER BY uploaded_at DESC puts the newest first",
      note: "Inside each group, ROW_NUMBER counts 1, 2, 3 from the newest send. For r-000020 the 12:39 send is number 1 and the 09:56 send is number 2. A report sent once is always number 1.",
      views: [{ table: "numbered", highlight: [1, 2] }],
      chips: ["12:39 gets 1", "09:56 gets 2"],
    },
    {
      title: "Number 1 is the line to keep",
      note: "WHERE rn = 1 keeps the first line of each group and drops the rest. Four lines stay and three are dropped.",
      views: [{ table: "numbered", highlight: [0, 1, 3, 5], tone: "good", dropped: [2, 4, 6] }],
      chips: ["keep 4", "drop 3"],
      tone: "good",
    },
    {
      title: "One line per report",
      note: "Now the number of lines equals the number of different report_ids. On the full 28 days the same query turns 2,712 lines into 2,633 reports.",
      views: [{ table: "kept", highlight: [0, 1, 2, 3], tone: "good" }],
      chips: ["4 lines", "4 report_ids"],
      tone: "good",
      outcome: "4 reports",
    },
    {
      title: "A tie: two markets at 7.5 shekels",
      note: "A different question: which market had the cheapest flour on 8 March? M04 and M07 both reported 7.5. Two rows with the same value in the ORDER BY column are a tie.",
      views: [{ table: "ties", highlight: [0, 1] }],
      chips: ["M04 = 7.5", "M07 = 7.5"],
    },
    {
      title: "RANK gives both tied rows number 1",
      note: "RANK gives tied rows the same number and then skips ahead: 1, 1, 3, 3, 3, 6, 6, 8. DENSE_RANK does not skip: 1, 1, 2, 2, 2, 3, 3, 4. WHERE rank = 1 keeps two rows.",
      views: [{ table: "ties", highlight: [0, 1], tone: "warn" }],
      chips: ["rank = 1: 2 rows"],
      tone: "warn",
      outcome: "2 winners",
    },
    {
      title: "ROW_NUMBER never repeats, so it keeps one",
      note: "ROW_NUMBER counts 1, 2, 3 and so on with no repeats, so WHERE row_number = 1 keeps one row. Which of the two tied markets gets 1 depends on the ORDER BY, so add a second sort column such as market_code.",
      views: [{ table: "ties", highlight: [0], tone: "good" }],
      chips: ["row_number = 1: 1 row"],
      tone: "good",
      outcome: "1 winner",
    },
  ],
  tryThis: [
    "Before step 7, predict how many rows WHERE rank = 1 keeps for flour on 8 March. Check your answer at step 7.",
    "At step 3, imagine r-000020 had been sent three times. Which numbers would its three lines get?",
    "Find the step where seven lines become four. Is it the numbering or the filter that removes lines?",
  ],
  limits:
    "Seven lines and eight markets keep the picture small. Real tables have thousands of groups and ties that you did not expect. In this data no two sends of one report have the same uploaded_at, so ROW_NUMBER is stable by luck; with a tie the database would still keep one line but choose which one for you.",
};
