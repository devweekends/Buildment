import type { StateMachineSpec } from "../renderers/state-machine/types";

// Course: data-engineering (course 15), chapter 9.2 "DAGs, dependencies and schedules".
// One run of Mizan's pipeline for 12 March, drawn as six tasks. land times out
// once and is retried; a permanent error in publish would skip every task
// after it. The task names, upstream tasks and the wait of 1 second come from
// the small runner built in chapter 9.4. See spec.md.
export const pipelineDagRetry: StateMachineSpec = {
  kind: "state-machine",
  title: "One run of the pipeline as a graph",
  purpose: "Step through one run of six tasks and see what a retry, a failure and a skipped task look like.",
  summary:
    "Six tasks run for 12 March. extract_registry and land have no upstream task. land times out once, waits 1 second and succeeds on its second attempt with 135 rows. publish waits for land, dbt_build waits for extract_registry and publish, checks waits for dbt_build, and report waits for checks. If publish failed for good, a retry would not help, so dbt_build, checks and report would be skipped and the exit code would be 1.",
  states: [
    { id: "extract", name: "extract_registry", sub: "no upstream", col: 0, row: 0 },
    { id: "dbt", name: "dbt_build", sub: "needs 2 tasks", col: 1, row: 0 },
    { id: "checks", name: "checks", sub: "needs dbt_build", col: 2, row: 0 },
    { id: "land", name: "land", sub: "no upstream", col: 0, row: 1 },
    { id: "publish", name: "publish", sub: "needs land", col: 1, row: 1 },
    { id: "report", name: "report", sub: "needs checks", col: 2, row: 1 },
  ],
  edges: [
    { from: "extract", to: "dbt", label: "if ok" },
    { from: "land", to: "publish", label: "if ok" },
    { from: "publish", to: "dbt", label: "ok" },
    { from: "dbt", to: "checks", label: "if ok" },
    { from: "checks", to: "report", label: "ok" },
    { from: "land", to: "land", label: "retry" },
  ],
  steps: [
    {
      state: "extract",
      edge: 0,
      title: "Two tasks have nothing upstream",
      note: "extract_registry and land wait for nothing, so either could start. The runner takes them in the order of its task table: extract_registry first. It finishes first, and dbt_build still has to wait for publish.",
      chips: ["run date: 2026-03-12", "upstream: none"],
    },
    {
      state: "land",
      edge: 5,
      tone: "warn",
      outcome: "timeout",
      title: "land fails once with a timeout",
      note: "land reads the upload folder, and the disk is busy, so the read times out. A timeout is a temporary problem: it may not happen again. The runner writes a retry line in the log and waits 1 second.",
      chips: ["status: retry", "attempt 1 of 3"],
    },
    {
      state: "land",
      edge: 5,
      tone: "good",
      outcome: "ok on try 2",
      title: "The retry works",
      note: "After the wait, land runs again and succeeds. It lands 135 good rows for 12 March, the busy day after M05's connection came back, and sends 2 bad rows to quarantine.",
      chips: ["wait: 1 s", "attempt 2 of 3", "135 rows"],
    },
    {
      state: "publish",
      edge: 1,
      title: "publish starts because land succeeded",
      note: "publish needs land. Land is ok, so publish runs: it replaces each phone number with a key and writes the shared files. Had land stayed failed, publish would never start.",
      chips: ["upstream: land ok", "135 rows"],
    },
    {
      state: "dbt",
      edge: 2,
      title: "dbt_build waits for both of its tasks",
      note: "dbt_build needs extract_registry and publish. Both are ok, so it runs dbt build. A task starts only when every upstream task has succeeded, so it waits for the slower of the two.",
      chips: ["upstream: 2 of 2 ok"],
    },
    {
      state: "checks",
      edge: 3,
      title: "checks runs after the build",
      note: "checks looks at freshness, volume and schema, and writes one log line for each. A failed check makes this task fail, which stops the report.",
      chips: ["freshness", "volume", "schema"],
    },
    {
      state: "report",
      edge: 4,
      tone: "good",
      outcome: "all 6 ok",
      title: "report builds the page",
      note: "report builds site/index.html. Its upstream list holds dbt_build and checks, but checks already waits for dbt_build, so the picture draws only the arrow from checks. All six tasks are ok and the exit code is 0.",
      chips: ["exit code: 0"],
    },
    {
      state: "publish",
      tone: "bad",
      outcome: "failed, no retry",
      title: "Now a permanent error in publish",
      note: "Imagine publish stopped with a plain error, such as a value the code cannot read. Running it again would fail the same way, so the runner does not retry it. It writes a failed line and stops this path.",
      chips: ["status: failed", "retries: none"],
    },
    {
      state: "dbt",
      edge: 2,
      tone: "warn",
      outcome: "skipped",
      title: "Everything after publish is skipped",
      note: "dbt_build, checks and report are marked skipped. They do not run on half-built data. extract_registry and land keep their ok status, and the exit code is 1, so a scheduler or a person can see that the run failed.",
      chips: ["dbt_build: skipped", "checks: skipped", "report: skipped"],
    },
  ],
  tryThis: [
    "Before the last two steps, predict which tasks still run if publish fails for good. Then check: only the tasks before it keep their ok status, and all three after it are skipped.",
    "Steps 2 and 3 show the same task twice. Count the log lines land writes in this run: one retry line and one ok line.",
    "Find a task with two arrows pointing at it. Why does dbt_build start later than extract_registry finishes?",
  ],
  limits:
    "This is one run for one date, drawn as six boxes. Real schedulers can run independent tasks at the same time and keep a history of every run, which the picture leaves out. The wait of 1 second and the three attempts are the defaults of the small runner in chapter 9.4; Airflow and Dagster use their own settings.",
};
