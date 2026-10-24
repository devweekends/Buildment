import type { SequenceSpec } from "../renderers/sequence/types";

// Data Engineering course, chapter 12.2 "The SQL round".
// A practice SQL round about a bakery chain's sales. Mais (the candidate)
// clarifies the grain, ties and NULLs, writes the query in named steps, tests
// it on eight rows she writes by hand, and explains the cost. Khalil (the
// interviewer) then probes one edge. The query and the eight rows are the ones
// worked in the chapter and run in DuckDB 2.0.0. See spec.md.
export const sqlRoundSteps: SequenceSpec = {
  kind: "sequence",
  title: "A strong SQL answer, step by step",
  purpose: "Follow one practice SQL round from the question to the follow-up, and see which moves come before any code is written.",
  summary:
    "Khalil asks for the best-selling product of each branch in March. Mais does not start typing. She asks what one row means, whether the quantity can be NULL and what to do on a tie. She says the plan, writes the query in named steps, tests it on eight rows she writes by hand, and explains the cost. Khalil then asks about a branch with no March sales, and she answers with a left join from the branches table.",
  actors: [
    { name: "Interviewer", sub: "Khalil" },
    { name: "Candidate", sub: "Mais" },
  ],
  steps: [
    {
      from: 0,
      to: 1,
      label: "asks the question",
      title: "The question is short and vague",
      note: "Khalil says: for each branch of a bakery chain, show the product that sold the most units in March. The table is sales with branch, product, sold_on and qty. Nothing is said about ties or missing values.",
      chips: ["sales(branch, product, sold_on, qty)"],
    },
    {
      from: 1,
      to: 0,
      label: "asks first",
      title: "Mais clarifies before she writes",
      note: "She asks what one row is, whether qty can be NULL, and what to show if two products tie. Each question names a way the query could go wrong. This takes under a minute and costs nothing.",
      chips: ["grain", "NULL qty?", "ties?"],
    },
    {
      from: 0,
      to: 1,
      label: "answers",
      title: "Khalil gives the rules",
      note: "One row is one sale. qty is NULL when the till did not record it. If two products tie, show both. Mais repeats the three rules back, so both agree before any code exists.",
      chips: ["one row = one sale", "tie: show both"],
    },
    {
      from: 1,
      to: 1,
      label: "says the plan",
      title: "The plan comes in one sentence",
      note: "Add up qty for each branch and product in March, rank the products inside each branch from the biggest total, and keep rank 1. Saying it aloud lets Khalil correct her before she types.",
      chips: ["sum", "rank()", "rank = 1"],
    },
    {
      from: 1,
      to: 1,
      label: "writes in steps",
      title: "The query is written in named steps",
      note: "One step adds up the totals, one ranks them, and the last step keeps rank 1. The dates are written as on or after 1 March and before 1 April, so a sale late on 31 March is not lost.",
      chips: ["totals", "ranked", "final select"],
    },
    {
      from: 1,
      to: 1,
      label: "tests a tiny case",
      tone: "good",
      outcome: "ties and NULL checked",
      title: "She tests on eight rows she writes by hand",
      note: "North has a tie at 200 units, one product with only a NULL qty, and Centre has a sale in April that must not count. South has one sale, in February. Mais works out the expected answer by hand first, then compares.",
      chips: ["North: 2 rows (tie)", "Centre: 1 row", "South: none"],
    },
    {
      from: 1,
      to: 0,
      label: "explains the cost",
      title: "She explains what the query costs",
      note: "It reads the March rows once, adds them up and sorts inside each branch. An index on sold_on helps only if March is a small share of the table. EXPLAIN would show whether the engine reads the whole table.",
      chips: ["one pass", "sort per branch", "EXPLAIN"],
    },
    {
      from: 0,
      to: 1,
      label: "probes one edge",
      title: "Khalil asks one follow-up",
      note: "What if a branch had no sales in March at all? The follow-up is not a trick. He wants to see whether she can find the row that is missing from the result.",
      chips: ["South has no March sales"],
    },
    {
      from: 1,
      to: 0,
      label: "answers the probe",
      tone: "good",
      outcome: "edge handled",
      title: "She starts from the branches table",
      note: "A branch with no sales has no rows to rank, so it disappears from the result. Mais starts from the list of branches and left joins the top products, so South appears with NULL in the product column.",
      chips: ["branches LEFT JOIN top", "South: NULL"],
    },
  ],
  tryThis: [
    "Before step 2, predict the first thing Mais does. Is it a line of SQL or a question?",
    "At step 6, change one thing in your head: use row_number instead of rank. Which row of North would the answer lose, and what did Mais say about ties?",
    "At step 9, ask which of the three questions in step 2 would have led you to this edge sooner.",
  ],
  limits:
    "This is one practice round with a friendly interviewer. Real interviewers vary in how much they answer, how fast they move and which follow-up they choose. The steps are a habit to practise, not a script: if the interviewer says the data is clean, you still check the one assumption you cannot see.",
};
