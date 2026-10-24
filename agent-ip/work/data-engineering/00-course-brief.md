---
artifact: course-brief
course: data-engineering
working_title: "Data Engineering: Build Reliable Data Pipelines on Your Laptop"
version: 1
status: accepted by sponsor (G0), from the sponsor's request of 2026-10-24
owner: Zeeshan (architect and sponsor)
target_publish: after G2B sign-off, G6 for capstone variants, and human review
---

# Course brief: data-engineering (course 15)

## Why this course exists

The sponsor asked for "one more good course on data engineering". Data engineering is a large share of remote technical work: teams everywhere need people who can move data from where it is created to where it is used, keep it correct, and explain what they built. No fellowship course teaches it. Course 8 (AI engineering interview) touches Python services and evaluation, and the system design course touches storage and streams at a distance, but neither teaches SQL in depth, data modelling, pipelines, file formats, transformation as code, orchestration or data quality.

The course teaches the job by doing it: every fellow builds one small, real data pipeline on their own laptop, chapter by chapter, with no cloud account and no paid service, and then builds a second one in a different domain for the capstone.

## One sentence

Fellows learn the core of data engineering (SQL in depth, data modelling, batch pipelines that survive late and duplicate data, Parquet, a local warehouse in DuckDB, transformation as code with tests, orchestration, streaming basics, data quality and responsible handling of personal data) by building a working pipeline from raw files to a published report, and they finish ready for data engineering interviews.

## Where it sits

Course 15, tech track, Medium. Prerequisites: basic Python and basic SQL (see Learner). It pairs with course 8 (interview craft) and course 13 (learning and building with AI). It does not depend on any other fellowship course.

## Learner
- **Who:** Gaza fellowship fellows building careers in tech, many aiming at remote work with international teams, freelance clients and NGOs.
- **Prior knowledge (entry prerequisites):** Python basics (variables, functions, lists, dictionaries, loops, reading a file, installing a package with pip, running a script from a terminal); SQL basics (`SELECT`, `WHERE`, `GROUP BY`, `ORDER BY`, a simple join); Git basics (clone, commit, push). An entry check in module 1 points anyone missing a prerequisite to a short repair path.
- **Language:** Arabic first, English second. Short sentences, common words, every term and idiom explained the first time.
- **Device and connection:** mostly phones on weak or expensive data, with power cuts. Reading, canvases and quizzes must work on a phone. Build work needs a laptop (Windows, macOS or Linux, about 4 GB of memory). After a one-time install while internet is available (size stated in the course), every practical step runs offline.
- **Time available:** about 10 to 12 hours a week for 5 to 6 weeks, in sessions of 1 to 3 hours.
- **Motivation:** a first data engineering or analytics engineering job, remote or freelance work for clients and NGOs, and confidence in data interviews.
- **What they will do with the result:** a portfolio repository they can show and explain, and interview answers grounded in work they really did.

## Outcome
By the end, the learner can:
1. **Explain** what a data engineer does and how the role differs from data analyst, data scientist, analytics engineer and backend engineer.
2. **Write and debug** analytical SQL: joins, aggregation without double counting, CTEs, window functions, and read a query plan to explain why a query is slow.
3. **Model** data for analysis: choose the grain, design a star schema, and keep history with a slowly changing dimension.
4. **Build** a batch pipeline that is idempotent, loads incrementally, handles late and duplicate records, survives a schema change and can be backfilled.
5. **Store** data in Parquet with sensible partitioning and file sizes, and explain lakes, warehouses and lakehouses in plain words.
6. **Transform** data as code with models, tests and documentation, and schedule the pipeline with retries and dependencies.
7. **Reason about** streaming: logs, topics, partitions, consumer offsets, ordering, and what "exactly once" really means.
8. **Protect** data quality and people's data: tests, contracts, monitoring, schema evolution, PII minimisation and pseudonymisation, cost awareness, version control and CI.
9. **Defend** a pipeline design and a data model in an interview, with numbers and trade-offs.

## Demo
In five minutes the fellow runs their capstone pipeline from a clean folder: raw CSV and JSON land as Parquet, tested models build in DuckDB, a late batch and a duplicate are handled, a backfill reruns one day without double counting, a schema change is absorbed, and the report updates. They then answer follow-up questions on grain, idempotency, privacy and what they would change at a hundred times the data.

## Product scope
The "product" is the learner's own pipeline repository.
- **Must have:** ingestion of raw CSV and JSON from a small realistic source; Parquet landing area with partitions; a DuckDB warehouse with staging, a star schema and at least one slowly changing dimension; transformations with tests and documentation; an orchestrated run with retries and a backfill; handling of late data, duplicates and one schema change; PII handled by design; a small published report; tests and a CI workflow; a README and a short runbook.
- **Should have:** a canvas in every Learn chapter; a mentor-reviewed open question at every gate; SQL drills and interview practice; a choice of capstone scenarios so fellows build different projects.
- **Out of scope:** see Non-goals.

## Production bar (data version of `00-principles.md`)
The general production bar is written for web products. For a data pipeline the course reads it as:
- authentication and authorization: who may read raw PII, and a pseudonymised layer for everyone else;
- data model with schema evolution: a star schema, a slowly changing dimension and one handled schema change;
- validated input and consistent errors: input checks and quarantine of bad rows, with clear failure messages;
- background work: the scheduled, retried, dependency-ordered pipeline run;
- storage: Parquet files with partitions;
- query optimisation justified by a measurement: a query plan and a before and after timing;
- abuse protection on public surfaces: not applicable (no public service); replaced by access rules on PII;
- tests at more than one level: unit tests on Python code, data tests on models, one end-to-end pipeline test;
- CI: a workflow that runs the tests on a small sample;
- structured logs: a run log with row counts and timings;
- README and runbook; seed data from a provided generator; the report readable on a phone.

## Variants
The general course uses one running example. For the capstone, fellows build a second pipeline in a different domain so portfolios differ. Candidate directions (each with a different source, hardest constraint, data model and report): aid distribution (duplicates and PII), clinic appointments (sensitive health data and no-shows), solar or power readings (late and out-of-order readings, time series), school attendance (slowly changing classes and calendars), market prices (units and currencies that change). Full variant courses under the 4-of-6 uniqueness contract follow `agents/variant-producer.md`: a variant intake answered by the sponsor or instructors, variant roadmaps confirmed at G6, and no variant chapters before that. The decision is logged in `decision-log.md`.

## Constraints
- **Stack:** Python 3.11 or later, DuckDB, Parquet, a transformation-as-code tool and a test runner, all open source and installable with pip; versions and install size checked by research. Orchestration and streaming taught with one open-source example each and a small hands-on model that runs without extra installs; heavy tools (cluster engines, message brokers, web schedulers) are explained, not installed, unless research shows a light install.
- **Platform:** the buildment reader and existing blocks; canvases on the registered renderers (sequence, state machine, factor, slider, timeline), each with a 14A spec, and a new renderer only if a claim truly needs one (logged). The platform's code runner is JavaScript only, so Python work is taught as build-it-locally steps with exact commands, expected output and acceptance tests.
- **Budget:** about 55 to 60 hours core (short-course band, 30 to 60 hours). Chapters meet the full agent-ip prose minimums (1,200 and 700 prose words).
- **Names:** open-source tool names are fine as examples; no employer or recruiting company names; no commercial cloud vendor names unless research shows a need (logged).
- **Care rules:** respectful, real-feeling scenarios (remote teams, freelance clients, NGOs, small shops, clinics, schools, power and connectivity cuts); no politics or war as case material; all people and organisations fictional; personal data in examples is synthetic.
- **Legal and IP:** no copied text from documentation or books; short quotations only where the dossier allows; licences of every tool stated.

## Non-goals
- No cloud provider setup, no paid warehouse, no managed service accounts.
- No machine learning or model training; no BI tool tutorials.
- No installation of a cluster engine or message broker in the core path.
- No deep database internals beyond what explains a query plan, an index, columnar storage and compression.
- No vendor certification preparation.

## Success signals
- Gate answers show reasoning with grain, keys and row counts, not tool names alone.
- Capstone repositories run from a clean folder with one command and pass their own tests.
- Fellows can explain idempotency, late data and backfills with their own pipeline as the example.
- Mentor review time per capstone stays near 20 minutes with the rubric.
