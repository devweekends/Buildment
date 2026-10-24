---
artifact: curriculum-roadmap
course: data-engineering
course_number: 15
version: 1
status: draft
owner: curriculum-architect
inputs: [00-course-brief.md, research.md]
instructors_reviewed: []
g2b_signoff: pending
drafted_before_roadmap: true
---

# Curriculum roadmap: Data Engineering: Build Reliable Data Pipelines on Your Laptop

## In one paragraph
Fellows learn data engineering by building one real pipeline on their own laptop, chapter by chapter, with no cloud account and no paid service. The running example is Mizan, a small fictional NGO whose volunteers record food prices at eight markets with a phone form that uploads when the connection returns. Fellows turn those raw JSON uploads, a CSV item list and a small SQLite registry into Parquet files, a tested star schema in DuckDB built with dbt Core, an orchestrated daily run with retries and backfills, and a weekly price report that opens on a phone. On the way they meet the problems real pipelines have: late uploads, duplicate submissions, a new field in week three, a market that moves, personal data that must not spread, and a rerun that must not double count. SQL and data modelling take the front half of the course because research shows they are named in most postings and are the gate in interviews. Streaming, cluster engines and web schedulers are taught as ideas with small models, not installed. The course ends with interview practice and a capstone: a second pipeline in a different domain, chosen from five scenarios, defended in a recorded walkthrough. G2B instructor sign-off is **pending**: chapters were drafted before sign-off on the sponsor's standing instruction (`decision-log.md`), so instructors confirm a drafted shape and any change they ask for will be made in the chapters.

## Learner and entry prerequisites
- Learner: Gaza fellowship fellows aiming at data engineering, analytics engineering or data-heavy backend work, remote or freelance. English is a second language. Most read on a phone with weak, expensive internet and power cuts; build work needs a laptop.
- Prior knowledge: Python basics (functions, lists, dictionaries, loops, files, pip, running a script); SQL basics (`SELECT`, `WHERE`, `GROUP BY`, `ORDER BY`, one simple join); Git basics (commit, push).
- Entry check: chapter 1.4 ends with a setup check script and three short SQL and Python warm-ups. A fellow who cannot do them is pointed to a repair path (open decision 3).
- Equipment: a laptop (Windows, macOS or Linux, about 4 GB of memory) with Python 3.11 or later. One install of about 41 MB download (about 121 MB on disk, research finding 6) while internet is available; after that every practical step runs offline. Reading, canvases and quizzes work on a phone.
- Time: about 10 to 12 hours a week for 5 to 6 weeks.

## Outcomes
| # | Outcome (observable verb) | Evidence |
|---|---|---|
| O1 | Explain what a data engineer does and how the role differs from analyst, data scientist, analytics engineer and backend engineer | Gate 1.5; interview story in 12.4 and the capstone defence |
| O2 | Write and debug analytical SQL: joins without fan-out, aggregation without double counting, CTEs, window functions; read a query plan | Builds 2.5 and 3.5 pass their tests; quizzes 2.6, 3.6 and 12.5; gates 2.7 and 3.7 |
| O3 | Model data for analysis: state the grain, design a star schema, keep history with a type 2 slowly changing dimension | Build 4.5; quiz 4.6; gate 4.7 modelling answer; modelling round 12.3 |
| O4 | Build a batch pipeline that is idempotent, loads incrementally, handles late and duplicate records, absorbs a schema change and can be backfilled | Builds 5.5, 6.5 and 8.5 pass their tests; quizzes 6.6 and 8.6; gates 6.7 and 8.7 |
| O5 | Store data as partitioned Parquet with sensible file sizes, and explain lakes, warehouses and lakehouses | Build 5.5; quiz 5.6; gate 5.7 |
| O6 | Transform data as code with models, tests, contracts and docs, and orchestrate the run with dependencies, retries and backfills | Builds 7.5 and 9.4; quizzes 7.6 and 9.5; gates 7.7 and 9.6 |
| O7 | Reason about streaming: logs, partitions, offsets, ordering, delivery guarantees, and when a cluster is worth it | Quiz 10.5; gate 10.6 written design |
| O8 | Protect data quality and people's data: checks, monitoring, pseudonymisation, retention, cost, version control and CI | Build 11.5; quiz 11.6; gate 11.7 |
| O9 | Defend a pipeline and a data model in an interview with numbers and trade-offs | Quiz 12.5; gate 12.6 recorded mock answer; capstone defence 13.4 |

## Course shape
| Week | Focus | Modules | Hours | Evidence at the end |
|---|---|---|---|---|
| 1 | The job, the workspace, SQL in depth | 1, 2, 3 | 10.8 | Workspace and raw data; SQL drills pass |
| 2 | Data modelling; files and storage | 4, 5 | 9.0 | Star schema prototype; Parquet landing |
| 3 | Batch ingestion; transformation as code | 6, 7 | 10.2 | Incremental pseudonymised ingestion; dbt project builds and tests |
| 4 | Late data, backfills, orchestration | 8, 9 | 9.8 | Pipeline survives late data and a backfill; scheduled run publishes the report |
| 5 | Streaming and scale; quality and responsibility; interviews | 10, 11, 12 | 10.8 | Checks, retention and CI; recorded mock answer |
| 6 | Capstone | 13 | 8.3 | Second pipeline, report, runbook and recorded defence |

Total from chapter estimates: 3,530 minutes, about 59 hours (`estimatedHours: 59` in `course.yaml`).

## Module and chapter sequence
Types: Read (set the scene), Learn (concept, with a canvas), Build (laptop work with acceptance tests), Check (graded quiz), Gate (checklist, learning log and mentor-reviewed answer).

### Module 1: The data engineer's job and your workspace (155 min)
| # | Chapter | One-line outcome | Type | Min |
|---|---|---|---|---|
| 1.1 | Set the scene | See Mizan's weekly price report go wrong and what the course will build | Read | 15 |
| 1.2 | What a data engineer does | Tell the data engineer's job from analyst, scientist, analytics engineer and backend work | Learn | 35 |
| 1.3 | The map of a pipeline | Place each part of a pipeline on the lifecycle and tell batch from streaming needs | Learn | 35 |
| 1.4 | Set up your workspace and make the raw data | Install the pinned stack, generate Mizan's raw files and pass the setup check | Build | 40 |
| 1.5 | Checklist and learning log | Explain the role and the pipeline you will build | Gate | 30 |

### Module 2: SQL in depth: joins and aggregation (245 min)
| # | Chapter | One-line outcome | Type | Min |
|---|---|---|---|---|
| 2.1 | Set the scene | See a report where one market's total doubled overnight | Read | 15 |
| 2.2 | Joins and what they do to row counts | Predict the rows a join returns and spot fan-out from duplicate keys | Learn | 35 |
| 2.3 | Aggregation traps: NULLs and double counting | Aggregate without losing or doubling values; count the right thing | Learn | 35 |
| 2.4 | CTEs and queries you can read | Break a long query into named steps you can test one by one | Learn | 35 |
| 2.5 | Build: SQL drills on the raw data | Write SQL in DuckDB that passes the drill tests | Build | 75 |
| 2.6 | SQL joins and aggregation | Graded scenarios | Check | 20 |
| 2.7 | Checklist and learning log | Explain a double-counting bug and its fix | Gate | 30 |

### Module 3: SQL in depth: window functions and query plans (245 min)
| # | Chapter | One-line outcome | Type | Min |
|---|---|---|---|---|
| 3.1 | Set the scene | See duplicate uploads and a slow query in the same week | Read | 15 |
| 3.2 | Window functions: ranking and deduplication | Keep the latest row per key with ROW_NUMBER and handle ties | Learn | 35 |
| 3.3 | Running totals, moving averages and frames | Compute week-over-week change and moving averages with the right frame | Learn | 35 |
| 3.4 | Query plans and indexes | Read a plan and say when an index helps and when a scan is right | Learn | 35 |
| 3.5 | Build: SQL drills with windows and plans | Deduplicate, rank and compare weeks; measure a plan before and after an index | Build | 75 |
| 3.6 | Window functions and query plans | Graded scenarios | Check | 20 |
| 3.7 | Checklist and learning log | Explain a query plan to a teammate | Gate | 30 |

### Module 4: Data modelling (270 min)
| # | Chapter | One-line outcome | Type | Min |
|---|---|---|---|---|
| 4.1 | Set the scene | See why the app's tables make the weekly report hard | Read | 15 |
| 4.2 | OLTP and OLAP: two jobs, two designs | Choose a normalised or a dimensional design for a workload | Learn | 35 |
| 4.3 | Grain, facts and dimensions: the star schema | State the grain first and design facts and dimensions around it | Learn | 35 |
| 4.4 | Slowly changing dimensions | Choose type 1 or type 2 history and join facts to the right version | Learn | 35 |
| 4.5 | Build: design and prototype Mizan's star schema | Write the schema and load the dimensions with SQL; tests check the grain | Build | 100 |
| 4.6 | Data modelling | Graded scenarios | Check | 20 |
| 4.7 | Checklist and learning log | Defend a grain and a history choice | Gate | 30 |

### Module 5: Files and storage (270 min)
| # | Chapter | One-line outcome | Type | Min |
|---|---|---|---|---|
| 5.1 | Set the scene | See a folder of a thousand tiny files that nobody can query fast | Read | 15 |
| 5.2 | Rows, columns and Parquet | Explain how columnar files and their statistics let engines skip data | Learn | 35 |
| 5.3 | Partitions, file sizes and compression | Choose a partition key and file size for the queries you expect | Learn | 35 |
| 5.4 | Lakes, warehouses and lakehouses | Explain each one and what an open table format adds | Learn | 35 |
| 5.5 | Build: land the raw files as Parquet | Write a landing job that turns one upload day into partitioned Parquet, safely rerunnable | Build | 100 |
| 5.6 | Files and storage | Graded scenarios | Check | 20 |
| 5.7 | Checklist and learning log | Defend a partitioning choice with numbers | Gate | 30 |

### Module 6: Batch ingestion (290 min)
| # | Chapter | One-line outcome | Type | Min |
|---|---|---|---|---|
| 6.1 | Set the scene | See a rerun after a power cut double a week of prices | Read | 15 |
| 6.2 | ETL, ELT and data zones | Place each step and each piece of personal data in the right zone | Learn | 35 |
| 6.3 | Idempotent jobs and safe reruns | Make a job give the same result however many times it runs | Learn | 35 |
| 6.4 | Incremental loads and change data capture | Load only what changed with a watermark, and know what that misses | Learn | 35 |
| 6.5 | Build: incremental, pseudonymised ingestion | Pseudonymise volunteers, extract the registry incrementally and log every run | Build | 120 |
| 6.6 | Batch ingestion | Graded scenarios | Check | 20 |
| 6.7 | Checklist and learning log | Explain why your ingestion is safe to rerun | Gate | 30 |

### Module 7: Transformation as code (320 min)
| # | Chapter | One-line outcome | Type | Min |
|---|---|---|---|---|
| 7.1 | Set the scene | See a SQL file nobody dares to change | Read | 15 |
| 7.2 | Models, refs and layers in dbt | Organise SQL into staging and mart models that build in dependency order | Learn | 35 |
| 7.3 | Tests, contracts and docs | Write tests for the assumptions you rely on and know what they cannot catch | Learn | 35 |
| 7.4 | Snapshots and incremental models | Keep history with a snapshot and process only new rows with an incremental model | Learn | 35 |
| 7.5 | Build: the Mizan dbt project | Build staging, the snapshot, the star schema and tests with dbt Core | Build | 150 |
| 7.6 | Transformation as code | Graded scenarios | Check | 20 |
| 7.7 | Checklist and learning log | Explain one test that saved you and one it would miss | Gate | 30 |

### Module 8: Late data, duplicates, backfills and schema change (320 min)
| # | Chapter | One-line outcome | Type | Min |
|---|---|---|---|---|
| 8.1 | Set the scene | See uploads arrive three days late after a connection cut | Read | 15 |
| 8.2 | Event time, processing time and late data | Choose a lookback window and know what it costs and misses | Learn | 35 |
| 8.3 | Duplicates and the keys that remove them | Choose the business key that removes true duplicates and keeps real repeats | Learn | 35 |
| 8.4 | Backfills and schema evolution | Rerun a past range safely and absorb an added field without breaking | Learn | 35 |
| 8.5 | Build: survive late data, duplicates, a new field and a backfill | Prove with tests that reruns, late batches and the new field keep the numbers right | Build | 150 |
| 8.6 | Late data and backfills | Graded scenarios | Check | 20 |
| 8.7 | Checklist and learning log | Write the incident note for a late batch | Gate | 30 |

### Module 9: Orchestration (270 min)
| # | Chapter | One-line outcome | Type | Min |
|---|---|---|---|---|
| 9.1 | Set the scene | See a pipeline that runs only when Hala remembers | Read | 15 |
| 9.2 | DAGs, dependencies and schedules | Draw a pipeline as a DAG and choose a schedule | Learn | 35 |
| 9.3 | Retries, failures and backfills in an orchestrator | Tell transient from permanent failures and map them to Airflow and Dagster ideas | Learn | 35 |
| 9.4 | Build: a small scheduler and the published report | Run the whole pipeline as a DAG with retries, a backfill command and a phone-friendly report | Build | 135 |
| 9.5 | Orchestration | Graded scenarios | Check | 20 |
| 9.6 | Checklist and learning log | Write the runbook entry for a failed run | Gate | 30 |

### Module 10: Streaming and scale (175 min)
| # | Chapter | One-line outcome | Type | Min |
|---|---|---|---|---|
| 10.1 | Set the scene | See a request for live solar readings and decide if it needs streaming | Read | 15 |
| 10.2 | Logs, topics, partitions and offsets | Trace events through a partitioned log and a consumer's offsets | Learn | 35 |
| 10.3 | Delivery guarantees and the exactly-once myth | Say what at-most-once, at-least-once and exactly-once mean and make a sink safe to repeat | Learn | 35 |
| 10.4 | When one machine is not enough | Decide between one machine and a cluster with numbers, not habit | Learn | 35 |
| 10.5 | Streaming and scale | Graded scenarios | Check | 20 |
| 10.6 | Checklist and learning log | A written streaming-or-batch decision | Gate | 35 |

### Module 11: Data quality and responsibility (290 min)
| # | Chapter | One-line outcome | Type | Min |
|---|---|---|---|---|
| 11.1 | Set the scene | See a report that was wrong for two weeks and a phone number in a shared file | Read | 15 |
| 11.2 | Data quality: checks and monitoring | Add freshness, volume and schema checks with thresholds that do not cry wolf | Learn | 35 |
| 11.3 | Personal data: minimise, pseudonymise, retain | Explain why a plain hash is not anonymous and design a privacy-safe flow | Learn | 35 |
| 11.4 | Cost, governance and CI for data | Cut scanned data, name owners and run tests on every change | Learn | 35 |
| 11.5 | Build: checks, retention and CI | Add monitoring checks, a retention job and a CI workflow on sample data | Build | 120 |
| 11.6 | Data quality and responsibility | Graded scenarios | Check | 20 |
| 11.7 | Checklist and learning log | A short data protection note for Mizan | Gate | 30 |

### Module 12: Interview preparation (180 min)
| # | Chapter | One-line outcome | Type | Min |
|---|---|---|---|---|
| 12.1 | Set the scene | See what each interview round asks and how to practise alone or with a friend | Read | 15 |
| 12.2 | The SQL round | Clarify, write, test edge cases and explain a SQL answer aloud | Learn | 35 |
| 12.3 | The data modelling round | Run the four modelling steps aloud, grain first | Learn | 35 |
| 12.4 | The pipeline design round and your project story | Answer a design question with failure modes, and tell your project story with numbers | Learn | 35 |
| 12.5 | Interview drills | Graded SQL, modelling and design scenarios | Check | 25 |
| 12.6 | Checklist and learning log | A recorded mock answer | Gate | 35 |

### Module 13: Capstone: a second pipeline, defended (500 min)
| # | Chapter | One-line outcome | Type | Min |
|---|---|---|---|---|
| 13.1 | Set the scene: choose your scenario | Pick one of five scenarios and read the brief, must-haves and rubric | Read | 20 |
| 13.2 | Build the pipeline | Ingest, land, model, test and orchestrate the new source | Build | 240 |
| 13.3 | Quality, privacy, report and runbook | Add checks, the privacy design, the report, a README and a runbook | Build | 150 |
| 13.4 | Record your defence | Record a five-minute walkthrough and answer follow-up questions | Build | 50 |
| 13.5 | Checklist and learning log | Final checks and a look back at your first pipeline | Gate | 40 |

## Gate evidence at a glance
Every gate has a checklist, a learning log (four questions), a mentor-reviewed open question with a rubric (Met, Partly, Not yet) and a pass rule, and a follow-up step where the learner answers the mentor's one or two questions. Build gates also ask for the repository link and the test output.

## Capstone
Fellows build a second pipeline from scratch, in a different domain, using the same patterns. Five scenarios, each with its own source, hardest constraint, data model and report (synthetic data from a provided generator configuration):
1. **Aid distribution:** parcel distributions recorded at distribution points; hardest constraint: duplicate registrations and personal data of households.
2. **Clinic appointments:** bookings, check-ins and no-shows at small clinics; hardest constraint: sensitive health data and status changes over time.
3. **Solar and power readings:** readings from batteries and panels at small shops; hardest constraint: late and out-of-order readings in a time series.
4. **School attendance:** daily attendance by class; hardest constraint: classes and calendars that change during the term (slowly changing dimensions).
5. **Freelance shop orders:** orders, refunds and edits from a small online shop client; hardest constraint: updated and deleted records (change data capture).

Five-minute demo: run from a clean folder, show the late batch and duplicate handled, rerun a day without double counting, show the schema change absorbed, open the report, then answer questions on grain, idempotency, privacy and what changes at a hundred times the data.

## Variants
The five capstone scenarios differ on source, hardest constraint, data model, report and demo, so fellows' portfolios differ. They are scenarios inside the general course's capstone, not separate variant courses. Full variant courses (a whole course per domain under the 4-of-6 uniqueness contract) are proposed in `capstone-variants.md` and follow `agents/variant-producer.md`: a variant intake answered by the sponsor or instructors, variant roadmaps confirmed at G6, and no variant chapters before that.

## Out of scope
Cloud accounts and paid warehouses; installing Spark, Kafka, Flink, Airflow, Kubernetes, Docker or Terraform; table-format hands-on (Iceberg, Delta); BI tools; machine learning; database internals beyond plans, indexes and columnar storage; the dbt platform and semantic layer; salary or hiring statistics.

## Open decisions for instructors
1. dbt version: pin dbt Core 1.12 with dbt-duckdb 1.11 (stable, supported to 2027-07-15), with the project written so it also runs on the new dbt OSS v2 (research finding 14). Confirm.
2. Naming the hosted CI service (GitHub Actions) in module 11, since fellows already keep portfolios on GitHub. Confirm or ask for generic wording.
3. Repair path for fellows who fail the 1.4 entry check: point to course 13's labs and a short Python and SQL refresher, or add a module 0?
4. Fallback for laptops that cannot install the stack (no internet window, locked machine): an instructor-provided folder of wheels (`pip install --no-index --find-links`, tested in research) or a shared lab machine?
5. Real public incidents (a spreadsheet row limit that lost test results in 2020, a unit mismatch that lost a spacecraft in 1999) appear as short real-world events. Confirm the tone, especially for the health-data incident.
6. Privacy chapter: the course uses EU and UK texts and the ICRC humanitarian handbook. Should a data protection practitioner review 11.3?
7. Time: 57 hours is inside the short-course band. Is 5 to 6 weeks at 10 to 12 hours realistic for this cohort?
8. Interview module: include a practice on explaining AI-assisted work, since some postings mention it?
9. Capstone scenarios: are these five the right domains for the fellows and partners you serve?
10. Answers in Arabic: may gate and capstone answers be written or recorded in Arabic?

## Confirmation
To be recorded in `roadmap-confirmation.md` by at least two instructors (template `08-templates.md` 1B).
