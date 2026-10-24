import type { SequenceSpec } from "../renderers/sequence/types";

// Data Engineering course, chapter 11.4 "Cost, governance and CI for data".
// Hala renames the price column in stg_price_reports and opens a pull
// request. CI makes the 10-day sample (933 distinct reports, 961 lines), runs
// the pipeline, and the first dbt build stops on a test that still names the
// old column: PASS=23, ERROR=1, SKIP=15. The runner stops at the first failing
// date and exits with 1, so the later steps never run and the change cannot
// reach main. Every number comes from running the reference build. See spec.md.
export const ciBlocksBadChange: SequenceSpec = {
  kind: "sequence",
  title: "CI stops a renamed column before main",
  purpose: "Follow one pull request through an automatic run on sample data, see where a rename breaks, and see why main stays safe.",
  summary:
    "Hala renames price to price_ils in one staging model and opens a pull request. The CI runner installs the pinned packages on a clean machine, makes 10 days of sample data and runs the pipeline. On the first date, dbt build stops on a test that still names the price column, and 15 later nodes are skipped. The run exits with 1, the remaining steps do not run, and the pull request shows a failed check, so main is unchanged. Hala renames the column in the test file too, pushes again, and all 39 dbt nodes pass.",
  actors: [
    { name: "Branch", sub: "Hala's change" },
    { name: "CI runner", sub: "clean machine" },
    { name: "dbt tests", sub: "inside the run" },
    { name: "Main", sub: "what is live" },
  ],
  steps: [
    {
      from: 0,
      to: 1,
      label: "open pull request",
      title: "Hala opens a pull request",
      note: "On her branch she renamed price to price_ils in stg_price_reports.sql, so that the name says the currency. She pushes and opens the pull request. The push starts CI by itself. Main has not changed.",
      chips: ["stg_price_reports.sql", "price to price_ils"],
    },
    {
      from: 1,
      to: 1,
      label: "install packages",
      title: "A clean machine installs the pinned packages",
      note: "The runner starts empty. It installs from requirements.txt and runs check_setup.py. Nothing from Hala's laptop is used, so a package that only her laptop had would fail here.",
      chips: ["pip install -r requirements.txt", "check_setup.py"],
    },
    {
      from: 1,
      to: 1,
      label: "make sample data",
      title: "The sample data is made, the same every time",
      note: "make_source.py writes 10 days from seed 7: 933 distinct reports in 961 lines. A fixed seed means the same rows on every run, so a red result is about the change, not about the data.",
      chips: ["--days 10 --seed 7", "933 reports", "961 lines"],
    },
    {
      from: 1,
      to: 2,
      label: "run the pipeline",
      title: "The pipeline runs for the first date",
      note: "The runner backfills 1 to 10 March. For 1 March, landing and publishing pass. Then dbt build starts, with its tests inside the run.",
      chips: ["backfill 2026-03-01 to 2026-03-10", "land: ok", "publish: ok"],
    },
    {
      from: 2,
      to: 2,
      label: "1 test errors",
      tone: "bad",
      outcome: "ERROR",
      title: "A test still names the old column",
      note: "The not_null test on price in staging.yml cannot find the column: Binder Error, Referenced column price not found. The result is 23 passed, 1 error and 15 skipped, because every model and test that depends on the staging model is skipped.",
      chips: ["not_null_stg_price_reports_price", "PASS=23 ERROR=1 SKIP=15"],
    },
    {
      from: 2,
      to: 1,
      label: "exit code 1",
      tone: "bad",
      outcome: "run failed",
      title: "The runner stops and reports failure",
      note: "The backfill stops at the first failing date and exits with 1. The CI runner marks the step failed, so the steps after it never run: the fast tests and the dbt build on their own.",
      chips: ["dbt_build=failed", "checks=skipped", "report=skipped"],
    },
    {
      from: 1,
      to: 3,
      label: "check failed",
      tone: "good",
      outcome: "merge blocked",
      title: "The pull request cannot reach main",
      note: "The pull request shows a red cross. With the check set as required, the merge button stays off. Main still has the working column name, and Omar's report is untouched.",
      chips: ["required check: ci", "main unchanged"],
    },
    {
      from: 0,
      to: 1,
      label: "push the fix",
      title: "Hala fixes every place that names the column",
      note: "She renames price in staging.yml and in every model that reads it, then pushes. CI starts again from the clean machine, with the same sample data.",
      chips: ["staging.yml", "fct_price_report.sql"],
    },
    {
      from: 1,
      to: 3,
      label: "green, merge",
      tone: "good",
      outcome: "merged",
      title: "All checks pass and the change is merged",
      note: "The backfill finishes for all 10 dates and dbt build ends with PASS=39. The green check lets Hala merge. A green run means the tests she wrote still hold; it does not prove the new column is right.",
      chips: ["PASS=39", "ci: green"],
    },
  ],
  tryThis: [
    "Before step 1, predict whether the run is green or red when a test still names a column that was renamed. Check your guess at step 5.",
    "At step 6, count how many steps of the CI file never ran, and ask which of them would have caught a change that fails nothing but the report.",
    "At step 9, ask what the green result still cannot tell you about the new column.",
  ],
  limits:
    "This is one change on 10 days of synthetic data, run in the order of the reference workflow. Real hosted CI adds queueing, caching and settings for required checks that differ between services. A run that passes only shows that the tests you wrote still hold; it cannot find a problem nobody wrote a test for.",
};
