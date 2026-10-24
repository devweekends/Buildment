import type { StateMachineSpec } from "../renderers/state-machine/types";

// Course: data-engineering (course 15), chapter 7.2 "Models, refs and layers in dbt".
// A slice of Mizan's dbt project: six of its 13 nodes. ref() draws the arrows,
// dbt builds in the order the arrows allow, and a failed model makes the
// models that depend on it skip while an independent model still builds.
// See spec.md.
export const dbtBuildOrder: StateMachineSpec = {
  kind: "state-machine",
  title: "How dbt builds models in order",
  purpose: "Follow the arrows that ref() draws, see the order dbt builds in, and see what is skipped when one model fails.",
  summary:
    "The lake sources feed stg_price_reports and stg_markets. dim_market needs stg_markets. fct_price_report needs stg_price_reports and dim_market. mart_weekly_basket needs fct_price_report. If stg_markets fails because the registry files are missing, dim_market, fct_price_report and mart_weekly_basket are skipped, and stg_price_reports is still built.",
  states: [
    { id: "sources", name: "Lake sources", sub: "files, not built", col: 0, row: 0 },
    { id: "stgPrice", name: "stg_price_reports", sub: "one row per report", col: 1, row: 0 },
    { id: "fct", name: "fct_price_report", sub: "needs 2 parents", col: 2, row: 0 },
    { id: "stgMarkets", name: "stg_markets", sub: "one row per market", col: 0, row: 1 },
    { id: "dimMarket", name: "dim_market", sub: "via the snapshot", col: 1, row: 1 },
    { id: "mart", name: "mart_weekly_basket", sub: "built last", col: 2, row: 1 },
  ],
  edges: [
    { from: "sources", to: "stgPrice", label: "src" },
    { from: "sources", to: "stgMarkets", label: "src" },
    { from: "stgPrice", to: "fct", label: "ref" },
    { from: "stgMarkets", to: "dimMarket", label: "ref" },
    { from: "dimMarket", to: "fct", label: "ref" },
    { from: "fct", to: "mart", label: "ref" },
  ],
  steps: [
    {
      state: "sources",
      edge: 0,
      title: "Start with the files dbt does not build",
      note: "The lake holds three sources: reports, markets and volunteers. A model reads one with source(), shown here as src. This picture is a slice of the project: 6 of its 13 nodes (3 sources, 1 seed, 1 snapshot and 8 models).",
      chips: ["source() = src", "not built by dbt"],
    },
    {
      state: "stgPrice",
      edge: 0,
      title: "Build stg_price_reports",
      note: "This model reads only a source, so nothing has to be built before it. It keeps one row for each report_id.",
      chips: ["parents: none"],
    },
    {
      state: "stgMarkets",
      edge: 1,
      title: "Build stg_markets",
      note: "It also reads only a source. Neither staging model needs the other, so dbt may build them in either order.",
      chips: ["parents: none", "either order"],
    },
    {
      state: "dimMarket",
      edge: 3,
      title: "dim_market waits for stg_markets",
      note: "dim_market is built from the snapshot of stg_markets, so it comes after it. Each ref() is an arrow, and dbt never builds a model before its parents.",
      chips: ["ref('stg_markets') through the snapshot"],
    },
    {
      state: "fct",
      edge: 4,
      title: "fct_price_report has two parents here",
      note: "It uses ref() for stg_price_reports and for dim_market (and for dim_item, which is not drawn). It starts only when every parent is built.",
      chips: ["2 parents drawn", "waits for both"],
    },
    {
      state: "mart",
      edge: 5,
      tone: "good",
      outcome: "built in order",
      title: "mart_weekly_basket is built last",
      note: "Every arrow points forward and none returns, so dbt always finds an order. The reader never has to write that order down.",
      chips: ["no circles allowed"],
    },
    {
      state: "stgMarkets",
      tone: "bad",
      outcome: "fails",
      title: "Another day: the registry files are missing",
      note: "Nobody ran the registry extraction. stg_markets cannot read its source and fails with: No files found that match the pattern.",
      chips: ["stg_markets: ERROR"],
    },
    {
      state: "dimMarket",
      tone: "warn",
      outcome: "skipped",
      title: "dim_market is skipped",
      note: "dim_market needs stg_markets, so dbt does not try to build it. Yesterday's table is still in the warehouse, but it was not rebuilt, so it is stale.",
      chips: ["parent failed", "table is stale"],
    },
    {
      state: "fct",
      tone: "warn",
      outcome: "skipped",
      title: "fct_price_report is skipped",
      note: "One of its two parents failed, so it is skipped too. A failure travels down every arrow that leaves the model that failed.",
      chips: ["1 parent failed"],
    },
    {
      state: "mart",
      tone: "warn",
      outcome: "skipped",
      title: "mart_weekly_basket is skipped",
      note: "The weekly report would be built from a stale fact table, so dbt refuses to build it. A skipped model is a warning, not a result.",
      chips: ["3 models skipped"],
    },
    {
      state: "stgPrice",
      tone: "good",
      outcome: "still built",
      title: "stg_price_reports does not depend on it",
      note: "Its arrow does not pass through stg_markets, so it built normally. A failure stops the models that depend on it, not the whole project.",
      chips: ["independent branch"],
    },
  ],
  tryThis: [
    "Before step 8, predict which models dbt skips if stg_markets fails. Check your answer at steps 8 to 10.",
    "Find the model with two parents. What must happen before it can start?",
    "Name the one model that still builds at step 11, and say which arrow it does not have.",
  ],
  limits:
    "This is a slice of the project with threads set to 1. dbt build also runs the tests of each model, and a failing test skips the models that depend on it in the same way. With more threads, dbt builds independent models at the same time, and the order of independent models can differ between runs.",
};
