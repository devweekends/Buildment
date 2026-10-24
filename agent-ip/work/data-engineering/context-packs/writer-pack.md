---
artifact: context-pack
course: data-engineering
for: chapter-writer
version: 1
---

# Writer pack: Data Engineering (course 15)

Read this whole file before writing. It replaces chapter briefs and the interaction map (G2C was skipped on the sponsor's instruction; see `../decision-log.md`). Paths below are relative to the repository root `<repo>` (the orchestrator gives you the real folder).

- **The plan:** `courses/data-engineering/course.yaml`. Write exactly the files, titles and goals listed there for your modules. Minutes per chapter are in `agent-ip/work/data-engineering/curriculum-roadmap.md`.
- **The facts:** `agent-ip/work/data-engineering/research.md`. Every claim about a tool, a version, a standard, a law, an incident or the job market must match the dossier, phrased the way its "Phrase it this way" lines say. Never state a claim its unverified table marks as false or unverified, except to correct it as a myth. Cite findings in your report, not in the chapter.
- **The code:** `agent-ip/work/data-engineering/reference-build/` holds the reference project `mizan-prices` with `REFERENCE.md` (commands, real outputs, seed-7 counts, test names) and every test file. Build chapters take their commands, interfaces, expected output and acceptance tests from it, exactly. Never invent an output, a count or a version.
- **The format:** look at `courses/building-habits/02-starting-a-habit/` (a scene, a teaching chapter with a canvas, a quiz chapter and a gate) and `courses/ai-engineering-interview/05-evaluation/05.05-build-a-regression-eval.md` (a build chapter with commands and acceptance tests). Skim `agent-ip/03-authoring-standards.md` (voice, forbidden patterns), `agent-ip/04-interactive-playbook.md` (budgets, option-length hygiene, quiz and predict rules), `agent-ip/10-interactive-canvases.md` (renderers, copy blocks) and `agent-ip/agents/chapter-writer.md`.

## 1. What this course is

Fellows learn data engineering by building one pipeline on their own laptop, chapter by chapter, with no cloud account and no paid service, then a second one in the capstone. The running example is **Mizan**, a small fictional NGO whose volunteers record food prices at eight markets with a phone form that uploads when the connection returns. The course goes deep on SQL and modelling, then makes the pipeline correct: safe reruns, late data, duplicates, backfills, schema change, tests, orchestration and privacy. Streaming and cluster engines are taught as ideas with small models.

- Open every chapter with a concrete person, a number and a moment at Mizan (or the module's side case), never a definition.
- Teach the mechanism, show it working on a worked example with the reasoning shown, then show the near miss: the query or job that looks right and is wrong.
- Every Learn chapter ends with something the learner can try on their own Mizan data today.
- Wrong answers are welcome; every option is explained kindly.

## 2. Learner and voice

- Gaza fellowship fellows aiming at data and backend work, remote or freelance. Arabic first, English second. Most read on phones with weak, expensive data and power cuts; build work is on a laptop.
- Plain English. Short sentences (aim under 20 words, never over 30). Common words. No idioms or figures of speech: say the literal thing ("in well under a second", not "in a blink"). Define every new term on first use with `GlossaryTerm` or in a plain sentence. Never define the same term twice in the course: refer back ("the grain you met in 4.3").
- Calm, direct, senior-engineer voice. No hype, no exclamation marks.
- Real-feeling, respectful settings: remote teams across time zones, freelance clients, NGOs, small shops, clinics, schools, power and connection cuts, studying while working. Hardship is ordinary background, never drama. No politics or war as case material.
- All people, organisations and data are fictional and synthetic; say so once in each set-the-scene chapter. Prices in shekels (ILS); freelance pay in dollars.

## 3. Hard rules (any violation fails review)

- **No em dashes or en dashes anywhere** (U+2014, U+2013): prose, options, code comments, canvas data. Use a colon, a comma or two sentences. Ranges: "3 to 5".
- **No employer, recruiter or commercial cloud vendor names.** Open-source tools are fine: DuckDB, Parquet, dbt Core, SQLite, PostgreSQL, Airflow, Dagster, Kafka, Spark, Iceberg, Delta Lake, Debezium, pytest, Python. GitHub and GitHub Actions only in 1.4, 11.4, 11.5 and the capstone. Say "a cloud warehouse that charges by data scanned", never a product name.
- **No links**, and no `MustRead` or `InterestingRead` blocks. At most one `RealWorldEvent` per module, only from the allowed incidents in section 8, in the dossier's careful wording.
- **No invented numbers about the real world.** Case numbers belong to the case ("in this example"). Tool behaviour only as the dossier or the reference build shows it. Never a fixed compression ratio, speed-up or size threshold (dossier unverified table).
- **Versions** exactly as pinned: Python 3.11 or later, DuckDB 2.0.0, dbt-core 1.12.6 with dbt-duckdb 1.11.0, pytest 9.1.1. Say "checked in October 2026" once where a version matters.
- **Withhold the solution.** Build chapters give the task, the interface (signature and docstring), constraints, the full acceptance test file, the expected output, one progressive hint and one "if you are stuck" check. They never show the implementation, except files marked "given in full" in section 6.
- **No AI or tool attribution. No slop:** no "In today's world", "It is important to note", "delve", "leverage" (verb), "seamless", "robust", "powerful", "landscape", "game-changer", "Let's dive in", "key takeaways", "unlock", "journey", "supercharge", "best practice" without a reason, unsupported superlatives.
- **Check every sum, row count and SQL result twice.** A case must support the conclusion the chapter draws. SQL shown in prose must be valid DuckDB SQL (or SQLite where the chapter says so).

## 4. Chapter file format and budgets

Path: `courses/data-engineering/<module-dir>/<file>` exactly as in course.yaml. Frontmatter:

```yaml
---
title: "<exact title from course.yaml>"
module: <n>
lesson: <n>
stepType: Read | Learn | Build | Check | Gate
summary: "<one or two plain sentences>"
estimatedMinutes: <minutes from the roadmap>
---
```

`NN.01-set-the-scene.md` is Read; teaching chapters are Learn; files with `build` in the name, `13.02`, `13.03` and `13.04` are Build; `*-quiz.md` is Check; `*-checklist.md` is Gate.

agent-ip prose minimums apply in full, counted by `agent-ip/scripts/audit-course.mjs` over **paragraphs only** (headings, lists, numbered steps, tables, block quotes, components and code fences do not count).

| Chapter type | Prose words (paragraphs) | Diagram | Interactive | Assessments |
|---|---|---|---|---|
| Set the scene (Read) | 1,200 or more | one ```mermaid | optional | one predict |
| Teaching (Learn) | 1,200 or more | one ```mermaid | one `<InteractiveCanvas>` (required) | one predict before the canvas, one or two quiz MCQs after (at most 3 in total) |
| Build | 1,200 or more | one ```mermaid | none | none, or one predict; no open question |
| Quiz (Check) | none: activities only | none | none | exactly **five** quiz MCQs |
| Gate | 700 or more | none | none | one openquestion |

Every chapter: at most 6 top-level components and 25 JSX tags. Aim for about 1,300 to 1,500 prose words in scene, teaching and build chapters and 800 to 1,000 in gates, so edits do not drop a chapter under the line. Write long by explaining: the mechanism, a second short example, the near miss and how to spot it, what to do on a small laptop or when the power cuts. Paragraphs of two to five short sentences.

**Components.** `LearningObjectives` (prop `objectives={[...]}`) only in set-the-scene chapters. `ChapterRecap` (prop `points={[...]}`) only in gates. `BigWordAlert` (props `term`, `plainEnglish`, `whyItMatters`) at most once per chapter, for the module's central term in its scene or a new load-bearing term in a teaching chapter; never in gates or quizzes. `GlossaryTerm` (props `term`, `definition`) for other new words on first use. At most two `Callout`s (`type="tip" | "warning" | "note"`, `title`). Code goes in fenced blocks with a language (`sql`, `python`, `bash`, `powershell`, `yaml`, `text` for output). No raw HTML or SVG.

**Mermaid on phones:** `flowchart TD` or `flowchart LR` with at most 7 nodes, short node text, quote any label with punctuation (`A["stg_price_reports"]`). `erDiagram` is allowed in module 4 (at most 4 entities). Introduce the diagram in prose before, say what to notice after. The diagram must argue something different from the canvas.

### Set the scene (Read)
A short story at Mizan that shows the module's problem with real numbers; why it matters for the job; what the module covers. One `BigWordAlert` for the central term. `LearningObjectives` once. A `## Key words` table (Word, Plain English) of four to six words and a `## What is in this module` table (Chapter, You will practise). One ```mermaid diagram of the case. One predict. End with a `**Next:**` line.

### Teaching chapter (Learn)
Hook (a person, a number, a moment), the idea in plain words, how it really works (from the dossier), the predict, one or two sentences sending the learner to the canvas, `<InteractiveCanvas slug="<slug>" />` on its own line, then a paragraph that names **What this shows**, **Try this**, **What changed** and **Limits of the model** in plain prose (as in `courses/building-habits/02-starting-a-habit/02.02-start-small.md`). Then a worked example with SQL or code and its real result, a ```mermaid diagram, where people go wrong (the near miss), the trade-off and its alternative (when would you choose differently?), a short "try it on your data" paragraph, one or two quiz MCQs under `## Check your understanding` on a **new** case, and a `**Next:**` line.

### Build chapter
Hook (what the pipeline cannot do yet and what goes wrong without it), the outcome, where the repository is now, the design decision and its alternative, a ```mermaid diagram of what you are adding, the task as numbered steps with the interface, the constraints, the acceptance test file **in full** in a ```python block (copied from the reference build), the commands to run (PowerShell for Windows and bash for macOS and Linux where they differ), the expected output in a ```text block (from REFERENCE.md), one failure test to try on purpose ("delete one batch file and rerun: the test should fail with ..."), `## If you are stuck` (one progressive hint, then one diagnostic), and `## Commit your work` (a commit message suggestion). Explain in prose why each acceptance test exists. No implementation code for the files the learner writes.

### Quiz chapter (Check)
Activities only: five ```quiz MCQ fences and nothing else after the frontmatter. At least two items give a small table, a query or three to four stated facts and ask which result, plan or fix the facts support; each wrong option fails because of a different stated fact. Modules 2, 3, 7, 8, 10 and 11 include at least one **"check the AI's answer"** item: a short AI answer in single quotes inside the question (a query, a design or an explanation that sounds reasonable) with one mistake the course teaches against (for example `COUNT(price)` where `COUNT(*)` is meant, "add DISTINCT to fix the double count", "exactly once is guaranteed", "hashing the phone number anonymises it", "append is fine because the job only runs once"). Never write "skip it" or "skip to".

### Gate
Follow `courses/building-habits/02-starting-a-habit/02.06-checklist.md`: intro sentence, `## Module N checklist` (five or six honest items, including "I answered the checks in chapters N.2 to N.4 and finished the quiz in N.x"; module 1 has no quiz; build modules include "My tests for chapter N.x pass"), `## Learning log` (four numbered questions about how they think and work), a task section, `## How your mentor will read it` with a rubric table (each criterion with Met, Partly and Not yet and an observable threshold), a **Pass rule**, the follow-up step (the mentor replies with one or two questions; the learner answers in writing or a voice note), the openquestion, `<ChapterRecap points={[...]} />` (four or five points), `## All boxes ticked?`, `**Next:**`. To reach 700 prose words, explain in paragraphs: what the task is for, a strong answer about a fictional person (in prose), a weak answer and why it is weak, the provided case for anyone without their own data, and how the mentor will read it. No `BigWordAlert`, `GlossaryTerm`, `Callout`, diagram, canvas, predict or quiz in a gate.

## 5. Running example canon (keep these facts everywhere)

The exact counts, dates, codes, names and outputs come from `reference-build/REFERENCE.md` (seed 7). Use them; never round them or make up new ones. Fixed story facts:

- **Mizan**: a small NGO that publishes a weekly food-basket report for families and partner community kitchens. 8 markets (M01 to M08), 12 items (I01 to I12), 28 days of data from 1 March 2026 (seed 7).
- **People:** **Hala** (26, junior data engineer, works part time and remotely for Mizan, freelances on the side, plans her work around the power hours at home). **Omar** (programme officer, reads the weekly report, not technical). **Yasmin** (volunteer coordinator, owns the registry of markets and volunteers). **Karam** (volunteer backend developer who built the phone form and the registry app on SQLite). Volunteers appear only by id (V01 to V12) in prose; their synthetic names and phone numbers live in the raw data and never in a report.
- **Sources:** JSON-lines uploads in `data/raw/uploads/upload_date=YYYY-MM-DD/batch-NN.jsonl`; `data/raw/items.csv`; the registry `data/raw/registry.db` (SQLite: `markets`, `volunteers`); `data/raw/market_history.csv`; `data/raw/market_contacts.csv` (two contacts for one market: the fan-out drill).
- **Incidents in the data:** M05's volunteer had no connection from 9 to 11 March, so those reports arrive in the 12 March upload; about 8 percent of reports arrive 1 to 3 days late; about 3 percent are sent twice (same `report_id`); a few bad rows (price 0 or below, or no item code); true repeats (same market, item and day, a new report_id and a new price) must be kept; from 15 March the form adds a `unit` field; M03 moved from Harbour to Hill on 12 March; M06 changed opening days on 20 March; V07 changed phone number on 15 March; V11 left on 22 March and was hard-deleted from the registry.
- **Zones:** `data/raw` and `lake/restricted` hold personal data (restricted); `lake/shared` and the warehouse hold pseudonymised data only (`volunteer_key`, an HMAC of the phone number with a secret in the `MIZAN_KEY` environment variable); `lake/quarantine` holds rows that broke the contract.
- **Warehouse:** `warehouse.duckdb`, built by the dbt project in `transform/`: `stg_price_reports`, `stg_markets`, `stg_volunteers`, seed `items`, snapshot `snap_markets`, `dim_market`, `dim_item`, `dim_date`, `fct_price_report` (grain: one accepted price report, one `report_id`), `mart_weekly_basket` (grain: one market and one ISO week).
- **Report:** `site/index.html`, plain HTML that opens on a phone.

Side cases (quizzes, examples, gates) use other settings so the learner transfers the idea: a clinic's appointment list, a school's attendance sheet, a solar shop's battery readings, a freelance client's online orders, a water delivery round, a bakery's sales, a pharmacy's stock. Every quiz actor has a name, a place and a number.

## 5B. Notes from the reference build (read `REFERENCE.md` section 0 in full)

- **Install path:** the virtual environment must live at a short path such as `C:\devenv` (or the project at `C:\de\mizan`). At a long path, `pip` or `uv` may install without error, but dbt crashes on its first parse because one dependency file passes the Windows 260-character limit. The install check is `dbt parse` (or `python scripts/check_setup.py` plus `dbt parse`), never only `dbt --version`, which works even when the install is broken.
- **Numbers depend on `--days`.** Quote counts for the default 28 days unless a chapter says otherwise (the late-data tests use 16 days). Seed-7, 28-day facts: 2,712 lines, 2,633 distinct reports, 2,620 accepted, 211 late, 79 duplicate sends, 13 bad rows (9 price, 4 missing item), 31 true repeats, 140 of 224 market-days with all 12 items, M05 outage: 37 lines on 12 March for 9 to 11 March (34 distinct good reports).
- **Time zones:** `reported_at` ends in `Z`; DuckDB reads it as a timestamp with time zone, and casting to a date uses the machine's time zone. `land.py` converts to plain UTC once. A good near-miss for 5.5 or 8.2.
- **The form change is by upload date:** a report made on 14 March and uploaded on 16 March already has `unit`.
- **Chapter versions:** in 5.5 `land_uploads` has no contract; in 8.5 bad rows go to quarantine. In 7.5 `stg_price_reports` filters bad rows with one `where` line; from 8.5 landing quarantines them. Say so where it matters.
- **Pseudonyms:** V07 has two `volunteer_key` values because the key is made from the phone and the phone changed (use it in 11.3: a pseudonym tied to a changing attribute splits one person in two). V11's hard delete is invisible to watermark extraction (a test documents it).
- **Quarantine holds personal data** (full raw rows), so it is restricted, and retention (11.5) deletes old quarantine partitions too.
- **Late dimensions:** the lookback covers late facts, not late dimension changes; a market change found late needs a backfill (a test documents it).
- **dbt keys:** in dbt, surrogate keys are hashes (`dbt_scd_id`, `md5(item_code)`); in the 4.5 prototype they are integers. The first snapshot version of each market starts at 1900-01-01. Explain why where each appears.
- **Computing a number yourself:** you may run the reference build to get a number for a canvas or an example. Copy `reference-build/mizan-prices` to `C:/Users/Zeeshan/bm-de-scratch/ref-<your writer letter>/` and use the existing environment `C:/de/venv/Scripts/python.exe` (set `PYTHONUTF8=1`). Never install anything, never edit the reference build itself.

## 5A. Name pools (quiz and side characters; grep the course before using any name)

- Writer A (modules 1, 2): Adam, Salma, Tareq, Reem, Bilal, Nadia, Fadi, Asma
- Writer B (modules 3, 4): Tamer, Sara, Iyad, Lama, Mazen, Ruba, Anas, Hiba
- Writer C (modules 5, 6): Karim, Manar, Wael, Sana, Jamal, Duaa, Osama, Rana
- Writer D (modules 7, 8): Majd, Layla, Fares, Aya, Mustafa, Shahd, Nabil, Ola
- Writer E (modules 9, 10): Zaid, Hanan, Basel, Rawan, Saeed, Noor, Ammar, Dalia
- Writer F (modules 11, 12): Yahya, Lubna, Hatem, Mais, Khalil, Rasha, Ibrahim, Doaa
- Writer G (module 13): Ziad, Nour, Samer, Hadeel, Raed, Alaa, and the five capstone scenario people in section 10

(Rana and Fadi appear as market contacts inside the `join-fan-out` canvas; that is fine.)

## 6. Files given in full in chapters (everything else is withheld)

`make_source.py`, `requirements.txt`, `scripts/check_setup.py` (1.4); `tests/conftest.py` (2.5, with a short explanation); `scripts/index_experiment.py` (3.5); `pipeline/paths.py` (5.5); `contracts/price_reports.yml` (8.5, as the example contract); `transform/profiles.yml`, `transform/dbt_project.yml` and one worked model (`dim_date` or `stg_markets`) (7.5); `.github/workflows/ci.yml` (11.5). Every acceptance test file is given in full in its build chapter. SQL drills: give the question and the expected result; never the solution SQL. For dbt models other than the worked one: give the model name, grain, columns, the YAML tests and the acceptance test.

## 7. Assessments

MCQ fence:
````
```quiz
type: mcq
question: "<a case that needs reasoning, not recall>"
options:
  - "<option>"
  - "<option>"
  - "<option>"
  - "<option>"
correct: <0-based index>
explanations:
  - "<why right or wrong, standalone>"
  - "..."
  - "..."
  - "..."
```
````
- Four options, one explanation per option in order; the right one starts with "Right."; wrong ones say kindly what was missed and why.
- **Option length (both ways):** the correct option is never more than 10 percent longer than the longest wrong option. In a quiz chapter it is the strictly longest in at most one of five, and the strictly shortest in at most one of five. Across your teaching-chapter MCQs, keep the correct option neither always long nor always short. Same level of detail in every option.
- **Position:** use each position 0 to 3 at least once per quiz chapter; across your modules no position holds more than 35 percent of correct answers.
- No "all of the above", no joke options, no "Which is NOT". Every key follows from a rule taught in the course, a query result or arithmetic; opinion goes to an open question. Where two answers could both help, the facts in the stem make one clearly better.
- Blind re-answer each MCQ yourself after writing it. An independent blind review on another model family follows (`agent-ip/scripts/blind-keys.mjs`).
- Double-quote YAML strings; single quotes inside; backslash-escape any double quote inside a string; always quote strings with colons. SQL inside a question goes in single quotes or as plain words, never a code fence.

Predict fence: exactly two options with `id` and `label`, `correctOptionId`, `explanation`, `allowRetry: true`; the correct label never longer than the other; correct first in about half your predicts; in at least a third of predicts the intuitive answer is the right one.

Open question fence (gates and 13.4):
````
```openquestion
prompt: "<what to write, with the parts to include>"
required: true
minWords: <honest minimum>
allowSpeechInput: true
allowUrl: true
urlRequired: false
urlLabel: "Repository or voice note link (optional)"
urlHint: "A link your mentor can open without signing in."
modelAnswer: "Mentor key for <provided case>: ... Model answer for a different case: ..."
```
````
Recording-only submissions (12.6, 13.4) use `minWords: 0` with `urlRequired: true` and a recording link label. Rubrics go into the `modelAnswer` after the key so mentors see them.

## 8. Allowed real-world events (one per module at most, dossier wording only)

- The 2020 case in England where test results were lost because a spreadsheet format held about 65,000 rows (failure mode 1): a format has limits; count rows between stages.
- The 1999 spacecraft lost to a unit mismatch, pound-force seconds instead of newton-seconds (failure mode 3): units belong in names or contracts.
- A public audit data site where corrections were new full records, so one audit appears several times (failure mode 5): know which version is current; deduplicate on a business key.
- Unnamed: a code-hosting company's 2017 database deletion where backups had failed silently (failure mode 4), and a DNS company's 2017 leap-second bug (failure mode 6). Never name the companies.
`<RealWorldEvent title="..." when="..." summary="..." lesson="..." />`, no link.

## 9. Canvases (agent-ip v0.4, interactive-first)

Every Learn chapter teaches through its **registered canvas**: a predict before it, the copy paragraph after it, and a quiz item later that transfers the claim to a new case. You build each canvas as **data plus a spec** (no new React code):

- Read `agent-ip/10-interactive-canvases.md` (Reusable renderers, The copy blocks) and the renderer types in `packages/learning-ui/src/canvas/renderers/<renderer>/types.ts`.
- Models to copy: **table-steps** `packages/learning-ui/src/canvas/join-fan-out/` (new in this course: small HTML tables stepped through, rows marked, added and dropped); **slider** `retry-backoff-jitter/`, `llm-token-cost/`, `streak-or-done-count/` with tests in `frontend/tests/unit/canvas/`; **sequence** `review-without-blame-steps/`, `mcp-tool-call/`; **state machine** `five-whys-chain/`, `huda-review-loop/`; **factor** `weighted-matrix-two-offers/`, `which-habit-first/`.
- Create `packages/learning-ui/src/canvas/<slug>/data.ts` (typed with the renderer's spec type, `export const <camelName>: <Kind>Spec`, a header comment naming the course and chapter, title, purpose, summary or intro, steps or inputs in this course's plain English, `tryThis` whose first line matches your predict, honest `limits` of at least two sentences) and `spec.md` on template 14A (copy the shape of `join-fan-out/spec.md`).
- **Slider canvases:** `compute` and `describeChange` are pure functions exported from `data.ts`; also export the core model function. Arithmetic only, from stated case numbers or a stated toy rule; say in `limits` that it is a simple illustration, never present a toy rule as measured fact. One to three stats, at most four bars, no NaN at any slider corner. Write `frontend/tests/unit/canvas/<slug>.test.ts` with at least four tests (defaults, the "try this" values, an edge, describeChange), modelled on `retry-backoff-jitter.test.ts`; import the data from `@buildment/learning-ui/canvas/<slug>/data`.
- **table-steps:** at most 5 columns and 10 rows per table, at most 2 tables per step, step titles of 60 characters or fewer, short cell values (a phone shows about 45 characters across a table). Mark rows with `highlight` (tone accent by default; warn, bad or good only when they mean it) and `dropped`; grow a result table with `rows`. Every number must be checked (sums, counts, window results).
- **State machines:** grid at most 3 columns by 2 rows; state names at most 18 characters; edge labels at most 14 characters, and at most 3 characters on an arrow between two states in the same column; no diagonal beside a parallel arrow. **Sequences:** two to four actors, arrow labels at most 18 characters. **Factor:** two or three options, three to five criteria, two to four weight levels; the winner must change when the learner changes the weight the chapter asks about.
- **Do not edit** `registry.ts`, any `slugs.ts` or `package.json`: the orchestrator registers every slug after you report and runs the registry, label-fit and model tests, and sends back any failure.
- Names, numbers and facts in the canvas match the chapter exactly. No dashes, idioms or brand names in canvas text.

| Ch. | Slug | Renderer | Teaching claim (the canvas must make this visible) |
|---|---|---|---|
| 1.2 | `wrong-number-trace` | sequence | A wrong number in a report is traced back stage by stage (report, tested tables, pipeline, source app) to where it broke; each role owns one stage. Actors: Omar's report (analyst), models (analytics engineer), pipeline (data engineer), phone form (backend). The cause in this trace: a rerun appended a day twice. |
| 1.3 | `batch-freshness` | slider | Batch freshness is bounded by the schedule interval plus run time; if the decision only needs data by a deadline, a slower schedule is enough. Inputs: run every N hours, run takes M minutes, decision needs data within D hours. Stats: worst-case age of the data, meets the need (yes or no), runs per day. Pure arithmetic. |
| 2.2 | `join-fan-out` | table-steps | **Already built** by the orchestrator: use it as is and write the chapter to match its numbers (M02 on 3 March: 3 reports, 24.5 shekels, 2 contacts, 6 rows, 49.0). |
| 2.3 | `null-average-trap` | slider | Turning missing prices into 0 drags an average down, and `COUNT(*)` counts rows while `COUNT(price)` counts values. Inputs: reports, reports with no price, treat missing as 0 (0 or 1). Stats: AVG, COUNT(*), COUNT(price); bars compare the two averages. Fixed true price stated. |
| 2.4 | `cte-steps` | table-steps | A long query read as named steps: filter bad rows, keep the basket items, sum per market and day; each CTE's result is a small table you can check. Row counts change at each step. |
| 3.2 | `row-number-dedupe` | table-steps | `ROW_NUMBER() OVER (PARTITION BY report_id ORDER BY uploaded_at DESC)` numbers each copy; keeping `rn = 1` keeps one row per report; RANK keeps ties, ROW_NUMBER does not. |
| 3.3 | `moving-average-frame` | slider | A wider frame smooths more and reacts later; without `PARTITION BY market` the frame mixes two markets at the boundary. Inputs: frame size in rows, partition by market (0 or 1). Bars: the moving average on four chosen days for one market from a fixed price series stated in the data. |
| 3.4 | `index-or-scan` | slider | An index helps when a query picks few rows; when it reads most of the table, a full scan reads less in total. Toy rule stated: index cost = log2(rows) + matching rows x 3 page reads; scan cost = rows / 100 pages. Inputs: rows (thousands), share of rows matching (%). Stats: pages read with index, without, the cheaper plan. |
| 4.2 | `oltp-or-star` | factor | The app's normalised tables win for fast single-record changes and no repeated data; a star schema wins for simple, fast reporting and history. Options: normalised app schema, star schema. Criteria: quick single-row updates, no repeated values, simple report queries, keeping history. The winner flips with the weight on report queries. |
| 4.3 | `choose-the-grain` | table-steps | The same Mizan data at three grains (one report, one market and day, one market and week): each grain answers some questions and loses others; once you add up, you cannot get the detail back. |
| 4.4 | `scd2-market-move` | table-steps | M03 moves from Harbour to Hill on 12 March: type 1 overwrites and rewrites history (old reports now say Hill); type 2 adds a new row with valid_from and valid_to, and each report joins to the version valid on its date. |
| 5.2 | `row-vs-column-read` | slider | A columnar file lets a query read only the columns it needs; a row layout reads every column. Toy rule: equal-width columns. Inputs: columns in the table, columns the query uses, rows (millions). Stats: data read in row layout and in column layout (MB, illustrative), share skipped. |
| 5.3 | `partition-file-size` | slider | Finer partitions let a one-week query skip more files but create many small files. Inputs: partition by (0 none, 1 day, 2 day and market), days of data, rows per day. Stats: number of files, average rows per file, files a one-week query reads. Toy sizes stated. |
| 5.4 | `lake-warehouse-lakehouse` | factor | The right design depends on what matters: a lake wins on cheap raw storage and open files, a warehouse on fast governed SQL, a lakehouse on open files plus safe updates. Options: lake, warehouse, lakehouse. Criteria: cheap raw storage, fast SQL and access control, open file formats, safe updates and schema changes. |
| 6.2 | `elt-zones-flow` | sequence | One price report moves from the phone to raw (restricted, personal data kept), to the lake's shared zone (phone replaced by a key, name dropped), to the warehouse; transformation happens after loading (ELT). Actors: phone form, restricted zone, shared zone, warehouse. |
| 6.3 | `rerun-append-vs-overwrite` | slider | Append doubles rows on every rerun; overwriting the day's partition or merging on report_id keeps the same result however many times the job runs. Inputs: times the job ran for one day (1 to 4), write mode (0 append, 1 overwrite partition, 2 merge on key). Stats: rows in the table, duplicate rows, the day's total price. Rows per day from the case. |
| 6.4 | `cdc-watermark` | table-steps | Watermark extraction picks rows with updated_at after the last run and moves the watermark; it catches V07's phone change but cannot see V11's hard delete, which log-based change capture would. |
| 7.2 | `dbt-build-order` | state-machine | `ref()` turns models into a graph, and dbt builds in dependency order: sources, staging, marts; when a staging model fails, the models that depend on it are skipped. Six states in a 3 by 2 grid. |
| 7.3 | `what-tests-catch` | slider | Each test checks one written assumption: duplicates break `unique`, missing keys break `relationships`; a wrong but plausible price passes every test. Inputs: duplicate rows, orphan rows (no market), wrong prices that look normal. Stats: tests failing, bad rows caught, bad rows not caught. |
| 7.4 | `snapshot-sees-runs` | table-steps | A snapshot records the state it finds at each run; two changes between runs leave one history row, so the middle state is lost. |
| 8.2 | `late-data-lookback` | slider | A lookback of N days catches reports up to N days late, at the cost of reprocessing N days on every run. Inputs: lookback days (0 to 5). Fixed lateness counts from the seed-7 data (from REFERENCE.md). Stats: late reports caught, late reports missed, days reprocessed per run. |
| 8.3 | `dedupe-key-choice` | table-steps | Deduplicating on the full row misses resends with a new uploaded_at; on (market, item, day) it deletes real repeats; on report_id it removes only true duplicates. |
| 8.4 | `schema-change-path` | state-machine | A batch with a new field goes through the contract check: an added optional field is accepted and old rows get NULL; a missing required field stops the batch for a fix, then a backfill reruns the affected days. |
| 9.2 | `pipeline-dag-retry` | state-machine | The pipeline as a graph of tasks: extract, land, publish, dbt build, checks, report. `land` fails once with a timeout and is retried; a permanent error in `publish` would skip everything downstream. |
| 9.3 | `retry-backoff-outage` | slider | Exponential backoff covers a longer outage with few attempts; a retry never fixes a bad input. Inputs: outage length (minutes), retries (0 to 5), first wait (minutes, doubling). Stats: attempts made, succeeded (yes or no), finish time. |
| 10.2 | `partition-offsets` | sequence | Events with the same key go to the same partition, so their order holds there; a consumer that crashes before committing its offset reads the last events again. Actors: producer, partition 0, consumer, database. |
| 10.3 | `delivery-guarantees` | slider | Commit before processing loses a message on a crash (at most once); process before commit repeats it (at least once); an idempotent sink makes the repeat harmless. Inputs: commit order (0 commit first, 1 process first), crash point (0 none, 1 before processing, 2 after processing), idempotent sink (0 or 1). Stats: messages lost, rows duplicated, final rows. |
| 10.4 | `one-machine-or-cluster` | slider | Column pruning and compression shrink what one machine must read; a cluster adds start-up and coordination time, so it pays off only above a size that you measure. Toy rule stated with illustrative speeds. Inputs: data size (GB), share of columns read (%), machines in the cluster. Stats: time on one machine, time on the cluster, the faster choice. |
| 11.2 | `volume-check-threshold` | slider | A volume check with a tolerance catches a missing batch, but too tight a tolerance raises alarms on normal days. Fixed 14-day row series in the data with one day missing a batch. Input: tolerance (%). Stats: real problems caught, false alarms. |
| 11.3 | `hash-is-not-anonymous` | slider | A plain hash of a phone number can be reversed by trying every possible number; a secret key makes that impossible while the key stays secret. Inputs: unknown digits (5 to 9), secret key (0 or 1). Rate from dossier finding 33 (ten million hashes in 11.3 seconds on a laptop). Stats: possible numbers, time to try them all, reversible (yes or no). |
| 11.4 | `ci-blocks-bad-change` | sequence | A pull request that renames a column runs CI: sample data is generated, dbt build runs, a test fails, and the change is blocked before it reaches main. Actors: Hala's branch, CI runner, dbt tests, main branch. |
| 12.2 | `sql-round-steps` | sequence | A strong SQL answer: clarify the grain and edge cases, write the query in steps, test ties and NULLs on a tiny example, explain the cost. Actors: interviewer, candidate. Arrow labels at most 18 characters. |
| 12.3 | `modelling-round-steps` | state-machine | The four modelling steps (business process, grain, dimensions, facts), with a step back to the grain when a new question does not fit. |
| 12.4 | `design-round-choice` | factor | For a design question, the choice between a daily batch, hourly micro-batch and streaming flips with how fresh the data must be, the cost and the team's skills. |

## 10. Module notes

Finding numbers refer to `research.md` → Findings by topic. Build chapters follow `reference-build/REFERENCE.md` exactly.

**Module 1 (writer A).** 1.1 Omar sees the basket cost for M02 jump by half in one week; nobody can say whether prices rose or the data broke. What the course builds (show the whole pipeline in the mermaid). 1.2 (findings 1, 2, 3, 4) the role and its neighbours in the dossier's phrasing; what postings ask for in the dossier's phrasing, with "a sample, not a census"; honest note that many postings ask for about three years and the course cannot promise a job. 1.3 (findings 1, 22) the lifecycle as a map, credited to Reis and Housley in one line; batch versus streaming at a glance; freshness as a requirement you ask about. 1.4 build: short-path project folder (finding 17: the Windows long-path trap), virtual environment, `requirements.txt`, the one-time download size (finding 6), `check_setup.py`, `make_source.py` with its seed-7 summary, first commit, and the three warm-ups from REFERENCE.md as the entry check with the repair note. 1.5 gate: explain the role and the pipeline (provided case: Adam, who freelances for a bakery that wants daily sales numbers).

**Module 2 (writer A).** 2.1 the doubled M02 total (the fan-out story, solved in 2.2). 2.2 joins and row counts (inner, left, anti-join with LEFT JOIN and IS NULL; fan-out); the canvas is built. 2.3 NULL rules in COUNT, SUM and AVG; COALESCE traps; double counting after joins; COUNT DISTINCT as a symptom, not a fix; conditional aggregation with FILTER or CASE. 2.4 CTEs: name each step, check row counts per step, when a CTE helps and when a temporary table is clearer. 2.5 build: conftest views and drills d01 to d05 from REFERENCE.md. 2.6 quiz with one AI check. 2.7 gate: explain a double-counting bug and its fix (provided case: Salma's clinic report counts each appointment twice after a join to doctors).

**Module 3 (writer B).** 3.1 duplicates and a slow query in the same week. 3.2 ROW_NUMBER, RANK and DENSE_RANK; dedupe with QUALIFY or a CTE; tie breaking (finding 5: interviewers probe ties). 3.3 LAG for week over week, running totals, frames (ROWS versus RANGE in plain words), PARTITION BY. 3.4 (findings 9, 26) reading a DuckDB plan (`EXPLAIN`, `EXPLAIN ANALYZE`) and SQLite `EXPLAIN QUERY PLAN`: SCAN versus SEARCH USING INDEX; why analytical engines rely on scans and statistics more than indexes; never claim a fixed speed-up. 3.5 build: drills d06 to d10 and the index experiment. 3.6 quiz with one AI check. 3.7 gate: explain a plan to a teammate (provided case: Tamer's slow attendance query).

**Module 4 (writer B).** 4.1 Karam's registry tables and why Omar's weekly question needs five joins. 4.2 (finding 29) OLTP versus OLAP, normalisation only as far as it explains the trade-off (no normal-form definitions: the dossier has no source). 4.3 (finding 27) Kimball's four steps credited; grain first; facts, dimensions, surrogate keys; star versus snowflake; an `erDiagram` of Mizan's star. 4.4 (finding 28) types 1, 2 and 3 in plain words; type 2 with valid_from, valid_to and is_current; joining facts to the right version. 4.5 build: `schema.sql`, `load_prototype.sql` and the tests. 4.6 quiz. 4.7 gate: defend a grain and a history choice (provided case: Hiba's school, where a student changes class mid-term).

**Module 5 (writer C).** 5.1 a folder of tiny files from a partner's export. 5.2 (findings 11, 12) row versus column layout, row groups, column chunks, pages, statistics, dictionary encoding; use `parquet_metadata()` output from REFERENCE.md if present; never a ratio. 5.3 (findings 8, 13) hive partitions, choosing the key by the queries you expect, the small-files problem, row-group size is approximate, Zstd versus Snappy as a trade-off to measure. 5.4 (finding 24) lakes, warehouses, lakehouses; what Iceberg and Delta add (snapshots, schema evolution, atomic commits) at concept level. 5.5 build: `paths.py` given, `land_uploads` with tests. 5.6 quiz. 5.7 gate: defend a partitioning choice with numbers (provided case: Wael's solar shop readings).

**Module 6 (writer C).** 6.1 a rerun after a power cut appended 12 March twice. 6.2 (findings 30, 32) ETL versus ELT in the dossier's phrasing (not "ELT replaced ETL"); raw, staging and marts; zones and where personal data may go; pseudonymisation introduced here, depth in 11.3. 6.3 (finding 30) idempotency defined as "running it twice gives the same result as running it once"; append versus overwrite partition versus merge; the rerun test. 6.4 (finding 25) query-based change capture with a watermark versus log-based (Debezium credited); what each misses (hard deletes, clock problems as reasoning, not cited fact). 6.5 build: `pseudonymise.py`, `extract_registry.py`, `runlog.py` with tests, including the test that documents the missed delete. 6.6 quiz. 6.7 gate: explain why your ingestion is safe to rerun (provided case: Karim's daily export of a pharmacy's sales).

**Module 7 (writer D).** 7.1 Hala's 300-line SQL file. 7.2 (findings 15, 16) dbt models, `ref` and `source`, materializations (view, table, incremental), staging and marts, the graph; versions as pinned with the note on dbt v2 (finding 15, careful wording). 7.3 (findings 16, 31) generic data tests, singular tests, unit tests, model contracts, docs; "tests check the assumptions you wrote". 7.4 (finding 16) snapshots (what they see and miss) and incremental models with `unique_key`. 7.5 build: the dbt project from REFERENCE.md, one worked model given in full. 7.6 quiz with one AI check. 7.7 gate: one test that protects you and one problem it would miss (provided case: Layla's online shop orders model).

**Module 8 (writer D).** 8.1 the M05 connection cut: three days arrive on 12 March. 8.2 (finding 22) event time versus processing time credited to Akidau; lookback windows; watermarks in one paragraph as the streaming version; the cost of lookback. 8.3 (finding 30) business keys, resends versus real repeats, choosing the dedupe key. 8.4 (findings 30, 31) backfills by date range, why idempotency makes them safe; additive versus breaking schema changes; contracts (Open Data Contract Standard credited). 8.5 build: contract, quarantine, lookback, backfill script, and the tests (including the "lookback 0 misses M05" test). 8.6 quiz with one AI check. 8.7 gate: incident note for a late batch (provided case: Fares's clinic bookings that arrived two days late).

**Module 9 (writer E).** 9.1 the pipeline runs only when Hala remembers; one week nobody ran it. 9.2 (findings 18, 19) DAGs, dependencies, schedules (data-aware timing), cron and Windows Task Scheduler; idempotent tasks make schedules safe. 9.3 (findings 18, 19) transient versus permanent failures, retries with backoff, timeouts, alerting, backfills; how Airflow (DAGs, tasks, retries, catchup) and Dagster (assets, partitions, schedules) express the same ideas; Airflow is built for Linux (Windows through WSL2 or containers), Dagster installs on Windows as an optional stretch. 9.4 build: `runner.py` and `build_report.py` with tests, scheduling commands shown. 9.5 quiz. 9.6 gate: runbook entry for a failed run (provided case: Hanan's nightly school report job).

**Module 10 (writer E).** 10.1 a solar partner asks for live battery readings; does Mizan need streaming? 10.2 (finding 20) the log, topics, partitions, keys, ordering per partition, consumer groups, offsets. 10.3 (finding 21) delivery semantics in the dossier's phrasing; exactly-once inside Kafka versus end to end; idempotent sinks ("effectively once" as a plain explanation, labelled). 10.4 (finding 23) Spark's driver, executors, partitions, shuffles in plain words; the COST paper credited; measure first; DuckDB larger-than-memory and the memory limit (finding 10); no size threshold. 10.5 quiz with one AI check. 10.6 gate: written streaming-or-batch decision (provided case: Basel's water-tank level sensors).

**Module 11 (writer F).** 11.1 a two-week-old wrong report and a phone number found in a shared spreadsheet. 11.2 (finding 31) freshness, volume, schema and distribution checks; thresholds and alert fatigue; observability as a practice (no "five pillars"). 11.3 (findings 32, 33, 34) minimisation, purpose limitation and retention (ICRC handbook credited by title), pseudonymisation versus anonymisation (GDPR article 4(5), recital 26), why an unsalted hash is reversible, HMAC with a secret, access by zone; one kind sentence that local law and a data protection adviser decide real cases. 11.4 (findings 35, 36) cost (scanned bytes, partition pruning, selecting columns), governance (owners, lineage, catalogue) and version control and CI for data. 11.5 build: `checks.py`, `retention.py`, `ci.yml` with tests. 11.6 quiz with one AI check. 11.7 gate: a short data protection note for Mizan (provided case: Lubna's NGO collecting aid registration forms).

**Module 12 (writer F).** 12.1 the loop in the dossier's phrasing (finding 5): SQL, Python, modelling, design, project story; practising alone, with a friend, recording yourself. 12.2 the SQL round: clarify, write in steps, test ties and NULLs on a tiny example, explain. 12.3 the modelling round: Kimball's four steps aloud, grain first. 12.4 the design round (failure modes unprompted: late data, reruns, backfills, privacy) and the project story with numbers from their own Mizan pipeline; one paragraph on explaining AI-assisted work honestly (open decision 8). 12.5 five drills (two SQL, one modelling, one design, one story). 12.6 gate: a recorded mock answer (`minWords: 0`, recording link required) with a written fallback.

## 11. Capstone (module 13, writer G)

The fellow builds a second pipeline from scratch in one of five scenarios, with the patterns from the course, and **writes their own small seeded generator** for it (following `make_source.py` as the pattern), so every portfolio has different data. 13.1 presents the five scenarios, each with a short brief (who uses the report and what decision it supports), a data spec table (sources and fields, rough volumes, the quirks the generator must produce: late rows, duplicates, one schema change, one dimension change, personal fields), the hardest constraint and the hero output:

1. **Aid distribution** (Raed, a programme officer at a fictional relief kitchen network): household registrations and parcel handouts at distribution points; hardest constraint: duplicate registrations and household personal data.
2. **Clinic appointments** (Hadeel, a clinic manager): bookings, check-ins and no-shows; hardest constraint: sensitive health data and status changes.
3. **Solar and power readings** (Samer, a technician for small shops): battery and panel readings every 15 minutes; hardest constraint: late and out-of-order readings.
4. **School attendance** (Nour, a head teacher): daily attendance by class; hardest constraint: classes and calendars that change mid-term.
5. **Freelance shop orders** (Alaa, a freelance client with an online shop): orders, refunds and edits; hardest constraint: updated and deleted records.

13.2 build the pipeline (generator, landing, zones, dbt models with tests, runner with backfill); 13.3 quality, privacy design, report, README and runbook; 13.4 record the five-minute defence (`minWords: 0`, recording link required) with the defence questions; 13.5 course gate with `## Your data engineering toolkit` (one line per skill) and "look back at your answer in gate 1.5: what would you explain differently now?". Must-haves and a rubric (Met, Partly, Not yet) for each: runs from a clean folder with one command, tests pass, the stated grain, a type 2 dimension, idempotent reruns, late data and duplicates handled, a schema change absorbed, personal data never past the restricted zone, a report, README and runbook. The 13.4 `modelAnswer` holds a mentor key with what to listen for in each scenario and the defence questions (grain, idempotency, privacy, what changes at a hundred times the data). Include a ```mermaid diagram in 13.1 to 13.3 (the scenario flow, the build order, the quality and privacy flow).

## 12. Before you hand back

- Every file in your modules exists with the exact title, `stepType` and the roadmap minutes.
- Zero U+2014 and U+2013 characters, in chapters and canvas files.
- Every sum, count, query result and canvas number checked twice; every MCQ blind re-answered; option lengths and positions checked against section 7.
- From `server/` in the mirror folder the orchestrator names: `node node_modules/tsx/dist/cli.mjs scripts/validate-course-source.ts --course data-engineering` and `node node_modules/tsx/dist/cli.mjs scripts/audit-course-structure.ts --course data-engineering` with no errors or warnings in your files (unregistered canvas slugs fail validation until the orchestrator registers them; report them, do not edit the registry).
- From the repo root: `node agent-ip/scripts/audit-course.mjs courses/data-engineering` with no flags on your chapters.
- From `frontend/` in the mirror: `node node_modules/vitest/vitest.mjs run tests/unit/canvas/<slug>.test.ts` for each slider canvas you made.
- Edit only your module folders, your canvas folders and your canvas tests. No git commands. Do not install packages.
- Report: files written, canvas slugs and renderers, prose words per chapter from the audit, correct-option positions and longest or shortest counts per quiz, any dossier claim you were unsure how to phrase, any mismatch with the reference build.
