import type { StateMachineSpec } from "../renderers/state-machine/types";

// Data Engineering course, chapter 12.3 "The data modelling round".
// Ibrahim practises with Rasha, who plays the interviewer, on a water delivery
// round run by Doaa. He follows Kimball's four steps aloud (business process,
// grain, dimensions, facts). A new question about failed orders does not fit
// a table with one row per delivery stop, so he steps back to the grain. See
// spec.md.
export const modellingRoundSteps: StateMachineSpec = {
  kind: "state-machine",
  title: "The four modelling steps, with a step back",
  purpose: "Follow a practice modelling round through the four steps, and see why a question that does not fit sends you back to the grain.",
  summary:
    "Ibrahim names the business process, a water delivery round. He says the grain: one row is one delivery stop. He lists the dimensions: customer, driver, date and product. He picks the facts: bottles delivered, empties collected and the amount charged. Then Rasha asks which customers ordered but got no delivery. A table with one row per stop has no row for a failed order, so the question does not fit. Ibrahim steps back to the grain and changes it to one row per order line with a status. The facts and dimensions still hold, the question now fits, and he says the model aloud in two sentences.",
  states: [
    { id: "process", name: "Business process", sub: "what happens", col: 0, row: 0 },
    { id: "grain", name: "Grain", sub: "one row is...", col: 1, row: 0 },
    { id: "dims", name: "Dimensions", sub: "who, what, when", col: 2, row: 0 },
    { id: "facts", name: "Facts", sub: "numbers to add", col: 2, row: 1 },
    { id: "fit", name: "Does it fit?", sub: "the next question", col: 1, row: 1 },
    { id: "aloud", name: "Say it aloud", sub: "two sentences", col: 0, row: 1 },
  ],
  edges: [
    { from: "process", to: "grain", label: "then" },
    { from: "grain", to: "dims", label: "described by" },
    { from: "dims", to: "facts", label: "add" },
    { from: "facts", to: "fit", label: "new question" },
    { from: "fit", to: "grain", label: "no" },
    { from: "fit", to: "aloud", label: "yes" },
  ],
  steps: [
    {
      state: "process",
      title: "Name the business process",
      note: "Ibrahim practises with Rasha, who plays the interviewer. The task: model the data of a water delivery round run by Doaa. Drivers take bottled water to homes and shops and bring back empty bottles. He names one process: delivering an order.",
      chips: ["process: delivering water"],
    },
    {
      state: "grain",
      edge: 0,
      title: "Say the grain first",
      note: "One row is one delivery stop: one customer, one visit, one day. He says it as a full sentence before he draws anything, because every later choice depends on it.",
      chips: ["one row = one delivery stop"],
    },
    {
      state: "dims",
      edge: 1,
      title: "List the dimensions",
      note: "Customer, driver, date and product describe each stop. Each becomes a small table with its own key. The date is a dimension too, so a report can group by week.",
      chips: ["customer", "driver", "date", "product"],
    },
    {
      state: "facts",
      edge: 2,
      title: "Pick the facts",
      note: "Bottles delivered, empties collected and the amount charged are numbers that are true for one stop. They can be added up across stops. A number that is not true at the grain, such as a customer's monthly bill, does not belong here.",
      chips: ["bottles delivered", "empties collected", "amount charged"],
    },
    {
      state: "fit",
      edge: 3,
      tone: "warn",
      outcome: "does not fit",
      title: "A new question arrives",
      note: "Rasha asks: which customers ordered water but got no delivery? A table with one row for every stop that happened has no row for an order that failed. The model cannot answer, and a patch would hide the problem.",
      chips: ["failed orders have no stop row"],
    },
    {
      state: "grain",
      edge: 4,
      title: "Step back to the grain",
      note: "Ibrahim does not add a column to the stop table. He changes the grain: one row is one order line, with a status of delivered, failed or cancelled. Then he checks the dimensions and the facts again.",
      chips: ["one row = one order line", "status"],
    },
    {
      state: "facts",
      title: "Check the facts at the new grain",
      note: "Bottles ordered is true for every row. Bottles delivered is 0 for a failed line, and so is the amount charged. Every fact is still true at the new grain, and the dimensions need only a driver assigned instead of a driver who drove.",
      chips: ["bottles ordered", "bottles delivered: 0 if failed"],
    },
    {
      state: "fit",
      edge: 3,
      tone: "good",
      outcome: "fits now",
      title: "The question fits now",
      note: "A failed order is a row with status failed, so a count by customer answers Rasha's question. The same table still answers the old questions about bottles and money.",
      chips: ["status = failed"],
    },
    {
      state: "aloud",
      edge: 5,
      tone: "good",
      outcome: "model stated",
      title: "Say the model aloud in two sentences",
      note: "The fact table has one row per order line. Each row says which customer, product, day and driver, with the bottles ordered, the bottles delivered and the amount charged. Two plain sentences show that he understands the model.",
    },
  ],
  tryThis: [
    "Before step 5, predict which of the four steps the question will send Ibrahim back to. Is it the facts, the dimensions or the grain?",
    "At step 6, count the changes Ibrahim made to the dimensions. Why did a change of grain need so few?",
    "Invent a new question for the order-line table that does not fit, and say which step you would go back to.",
  ],
  limits:
    "This is a small practice case with one new question. Real models meet many questions, and some need a second fact table at a different grain instead of a change to the first. The four steps are a way to think aloud, not a guarantee that a model is right.",
};
