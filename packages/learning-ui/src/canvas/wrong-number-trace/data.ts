import type { SequenceSpec } from "../renderers/sequence/types";

// Course: data-engineering (course 15), chapter 1.2 "What a data engineer does".
// Omar's weekly line for market M02 reads 203.50 shekels. Hala traces it back
// through four stages: the report, the tested tables, the pipeline and the
// phone form. The cause in this trace is a rerun that added Tuesday's rows a
// second time. Numbers: last week 135.65; Monday 135.00 and Tuesday 136.00
// for M02; the query adds up the days and divides by the days with data, so
// (135.00 + 136.00 + 136.00) / 2 = 203.50 and the right figure is
// (135.00 + 136.00) / 2 = 135.50. Tuesday's upload holds 99 reports, stored
// twice as 198 rows. See spec.md.
export const wrongNumberTrace: SequenceSpec = {
  kind: "sequence",
  title: "Trace a wrong number back to the stage that broke",
  purpose: "Follow Omar's wrong number from the report back to its cause, and see which role checks which stage.",
  summary:
    "Omar's report shows 203.50 shekels for market M02 where about 135.50 is right. The analytics engineer finds that the table holds Tuesday twice, so the query is not at fault. The data engineer counts 198 stored rows against 99 uploaded reports. The backend developer confirms the phone form sent each report once. The job log shows that a rerun after a power cut added Tuesday's rows a second time. The job is fixed, the tables are rebuilt and the report shows 135.50.",
  actors: [
    { name: "Report", sub: "Omar, analyst" },
    { name: "Models", sub: "analytics eng" },
    { name: "Pipeline", sub: "data engineer" },
    { name: "Phone form", sub: "backend dev" },
  ],
  steps: [
    {
      from: 0,
      to: 1,
      label: "why 203.50?",
      title: "Start at the number Omar sees",
      note: "Omar's report shows 203.50 shekels for M02. Last week it showed 135.65. The first question is which stage broke, not who is to blame. The analyst checks that the report shows what the table says, then asks the models.",
      chips: ["report: 203.50", "last week: 135.65"],
    },
    {
      from: 1,
      to: 1,
      label: "check the rows",
      tone: "warn",
      outcome: "rows doubled",
      title: "The analytics engineer reads the table",
      note: "The query is right and its checks pass: it adds up each day's prices and divides by the days that have data. But the table holds Tuesday twice. 135.00 + 136.00 + 136.00 = 407.00, and 407.00 / 2 days = 203.50. The rows under the query are wrong.",
      chips: ["Mon 135.00", "Tue 136.00 twice", "407.00 / 2 = 203.50"],
    },
    {
      from: 1,
      to: 2,
      label: "rows per day?",
      title: "Ask the pipeline where the extra rows came from",
      note: "The models use whatever the pipeline stores. The analytics engineer asks the data engineer to count the stored rows for each upload day.",
    },
    {
      from: 2,
      to: 2,
      label: "count stored rows",
      tone: "warn",
      title: "The data engineer counts rows against the form",
      note: "Tuesday's upload folder holds 198 rows. The phone form's own log says 99 reports were uploaded that day. 198 is exactly 2 x 99, so the whole day is stored twice.",
      chips: ["stored: 198", "uploaded: 99"],
    },
    {
      from: 2,
      to: 3,
      label: "sent it twice?",
      title: "Rule out the source",
      note: "Before blaming its own job, the pipeline checks the stage upstream. The data engineer asks Karam, who built the phone form, whether the form sent Tuesday's reports twice.",
    },
    {
      from: 3,
      to: 2,
      label: "once, 99 lines",
      tone: "good",
      outcome: "source ok",
      title: "The source is fine",
      note: "Karam checks the form's server log. 99 lines arrived on Tuesday, each report once. The phone form is not at fault, so the search comes back to the pipeline.",
      chips: ["form sent: 99, once each"],
    },
    {
      from: 2,
      to: 2,
      label: "read the job log",
      tone: "bad",
      outcome: "the cause",
      title: "A rerun added the day a second time",
      note: "The job log shows that Tuesday's job wrote the rows and was then stopped by a power cut. Hala ran it again, and the job added the rows a second time instead of replacing them. No single row is wrong; the day is simply there twice.",
      chips: ["power cut", "second run", "added, not replaced"],
    },
    {
      from: 2,
      to: 1,
      label: "replace the day",
      title: "Fix the stage that broke, then rebuild",
      note: "The data engineer removes the extra copy and changes the job so that a rerun replaces the day. The analytics engineer rebuilds the tables. You build this kind of job in module 6.",
      chips: ["rerun gives the same result"],
    },
    {
      from: 1,
      to: 0,
      label: "135.50 now",
      tone: "good",
      outcome: "fixed",
      title: "The number comes back to normal",
      note: "The report now shows (135.00 + 136.00) / 2 = 135.50, close to last week's 135.65. Each role checked or fixed its own stage, in order, and nobody had to guess.",
      chips: ["report: 135.50"],
    },
  ],
  tryThis: [
    "Before step 2, predict what the table behind the report holds. Then check your guess at step 2.",
    "Find the first step where you can see the number is wrong in the data and not in the code. Which role is at that step?",
    "Imagine the phone form had sent Tuesday twice. At step 6 the backend developer would find 198 lines. Which role would fix it, and what would change at step 7?",
  ],
  limits:
    "This is one trace with one cause. Real wrong numbers can have several causes, and on a small team one person may do all four jobs. A repeated day is only one way to get a wrong number, and how far it moves a figure depends on the query. Here the query divides by the days with data and the week had only two, so one repeated day lifts the figure by half.",
};
