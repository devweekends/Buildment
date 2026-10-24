---
artifact: critique
course: build-with-ai
artifact_under_review: content/import/build-with-ai/ (40 chapters, course.yaml) and the 22 canvases in frontend/src/canvas/<slug>/ (data.ts, spec.md)
reviewer: critic B
review_type: slop | continuity | technical (factual accuracy against the dossier)
lens: slop, continuity and factual accuracy against the dossier
round: 2
version: 2
scorecard_average: 4.43 (21 scored dimensions; dimension 19 not scorable)
blocking_defects: 0 (new S1: 0, new S2: 0, new S3: 3)
recommendation: approve (from this lens), with the three new S3 fixes tracked before publish
---

# Critique, round 2: Learn and Build with AI (build-with-ai), critic B

Reviewed on 2026-10-24 against the dossier (now with S118 and S119), the brief, the roadmap, the decision log and the agent-ip rules. This is a fresh read of the files on disk after the writers' revision; I did not open anything under `context-packs/` and edited no course file. I re-read all 40 chapters and the 22 canvas `data.ts` files, using scripts for the repeatable checks.

## What I ran (all read-only)

| Check | Result |
|---|---|
| U+2013 and U+2014 in 40 chapters, `course.yaml`, 22 `data.ts` and 22 `spec.md` | 0 found |
| Links, `MustRead`, `InterestingRead`, `RealWorldEvent`, forbidden phrases | 0 |
| Sentences over 30 words in learner-facing prose (outside tables and fences) | 5 (round 1: 10); quiz stems and prompts: 1 (round 1: about 10) |
| Idioms from round 1 (stand out, raised the floor, narrow corner, first crack, plain sight, fresh eyes, hard way, catch him out, and others) in chapters and canvases | 0 left |
| Terms defined twice (GlossaryTerm, BigWordAlert, Key words) | 0 (round 1: 3) |
| Tool census | Only allowed tools. "Word files" is gone |
| Line endings | 40 of 40 LF (round 1: 16 CRLF) |
| Quiz option length (68 MCQs) | Correct option strictly longest in 23 (round 1: 0); key positions 16, 18, 19, 15 |
| Arithmetic recomputed | Every factor total, the 81-setting claims, the 5.2 hours maths (192 hours; 96 + 19 = 115; 48 + 29 = 77; 115 / 192 is about 60 percent), the one-month case (19 and 13 hours, 2 areas), the 5.4 totals (40 and 21; 21 to 20; 26 to 15) all check out |
| Docker claims in 4.3, its canvas and 4.7 against the dossier | Now sourced: S118 (Compose v1, 2014, `docker compose` for v2) and S119 (`version:` obsolete) |
| Cross-references to course 9 module 7 | Still correct |
| Titles and minutes against `course.yaml` | 40 of 40; 995 minutes |
| `node agent-ip/scripts/audit-course.mjs content/import/build-with-ai` | "Needs work: 0"; Learn, Read and Build chapters 1,244 to 2,222 prose words; gates 823 to 1,046 |

## Yara's calendar, checked end to end

| Point | Where | Agrees? |
|---|---|---|
| Plan written in week 1, before any lab | 5.1, 5.2, 5.3 table note, 6.5 Part 1 | Yes |
| Order: API (week 1), database (3), containers (5), caching (7), short codes (9), click counts (11), tests (13), web page (15), rate limits (17), logs (19), safety (21), deploy (23) | 5.3 table and 6.5 table are identical; 5.1 lists the same order | Yes |
| Caching is week 7 | 3.3, 3.3 canvas, 4.1, 5.3, 5.4, 6.5 | Yes |
| Containers are week 5, so Qasir already runs in Docker at week 7 | 4.1, 6.5 Part 3 | Yes |
| Lab log starts in week 7, ten lab days over 17 days, weeks 7 to 9 | 4.1, 6.5 | Yes, but 5.2 says week 5 (new S3-N1) |
| Lab days: 1 containers, 3 log source, 4 stop cache then database, 5 expiry time, 6 power cut, 9 read shortlane | 4.2, 4.4, 4.5, 6.5 table, 5.5, canvases | Yes; day 5 "expiry time" now matches 4.5's next step |
| Click counts week 11, decision made in week 11 | 5.3, 5.4 | Yes |
| Short codes week 9, shortlane reused in week 9 after reading on lab day 9 | 5.5, canvas `reuse-open-source-safely` | Yes |
| The 60 percent sum | 5.2, 5.7, 6.5, canvas default 60 | Yes: 96 + 19 = 115 learning, 48 + 29 = 77 building, 192 total |
| Day 2 failed first try, phone notes for days 1 to 3, moved to the repository on day 4 | 4.2, 4.3 canvas (last step), 4.5, 6.5 | Yes |
| First slice built in her first two weeks with a short code and a click count | 1.5 against the schedule above | Partly (new S3-N2) |

## Scorecard

Dimension 19 still cannot be scored: `roadmap-confirmation.md` does not exist and G2B is pending. It is left out of the average. Dimension 20 is scored from specs, data files and chapter agreement; I have seen no canvas QA report.

| # | Dimension | Score | Note |
|---|---|---|---|
| 1 | Outcome alignment | 5 | Every chapter maps to O1 to O8; gates and capstone give the evidence |
| 2 | Domain specificity | 5 | Qasir, the cache lab and the disclosure cases are specific; settings now vary (pharmacy, library, shuttle bus, tailor, sewing workshop, clinic) |
| 3 | Depth over coverage | 4 | Seventeen habits in about 21 hours; modules 4 and 5 still carry several ideas each, though the capstone and 5.3 now thin out their worked steps on purpose |
| 4 | Prose quality | 4 | Calm, specific, no hype or fear; the antithesis device is down to one use; five long sentences remain (S3-N3) |
| 5 | Chapter structure | 5 | Hook, idea, worked example, diagram, predict, canvas, mistakes, check, bridge, in all 22 Learn chapters |
| 6 | Interaction purpose | 4 | Predicts now ask a more informative question (for example the capital letters in 4.2, the second question in 3.4); canvases carry one claim each |
| 7 | Assessment quality | 4 | Balanced positions; option-length tell has crept back (S4-2); stems are shorter and numbered |
| 8 | Difficulty calibration | 4 | Support fades on purpose from module 4 (stated in 4.1 and 5.3) |
| 9 | Cognitive load | 4 | One main idea per chapter; 4.5 and 5.4 are still full |
| 10 | Prerequisite integrity | 5 | API, endpoint, framework, virtualisation, rate limits, deploy, issues, terminal, Docker are now defined at first use |
| 11 | Technical accuracy | 4 | Compose v2 commands, restart policy, `.gitignore` limits and the S118 and S119 claims are correct and sourced; outputs are labelled "invented"; the validator's own run is not in my lens |
| 12 | Production-grade coverage | 5 | Not applicable: no software product |
| 13 | Security and integrity | 5 | Secrets, stranger test, rotate a pushed key, example-password in place of a realistic one |
| 14 | Accessibility | 4 | Scored from source only: plain English, short diagrams, canvas summaries; not tested at 375px |
| 15 | IP protection | 5 | No capstone solution; keys sit in `modelAnswer` as on the other courses |
| 16 | Variant distinctiveness | 5 | Not applicable: the brief declares no variants |
| 17 | Continuity | 4 | Yara's calendar is unified and the sums reconcile; one week-5 versus week-7 slip and the first-slice question remain |
| 18 | Learner agency and curiosity | 4 | Provided cases hide real mistakes; the gates now offer two routes with their own tables |
| 19 | Instructor alignment | not scored | G2B pending |
| 20 | Interactive canvas quality | 4 | Numbers, weeks and lab days agree with the chapters; try-this lines now point to steps; no QA report seen |
| 21 | Explanatory depth | 5 | Mechanism, trade-off, worked example and failure case in every Learn chapter; audit passes with margin |
| 22 | Visual explanation quality | 4 | Diagrams now introduce a question the learner answers (3.4, 4.1, 5.3, 6.2); a few still lean on the paragraph before them |

Average over the 21 scored dimensions: 93 / 21 = **4.43**. Every scored dimension is 4 or higher, the average is above 4.3, and there are no S1 or S2 defects. Dimension 19 remains a separate gate blocker.

## Round 1 defects and their status

Counts: **26 fixed, 4 partly fixed, 0 not fixed** (30 items: 4 S2, 19 S3, 7 S4).

| ID | Round 1 defect | Status | Evidence (location) |
|---|---|---|---|
| S2-1 | Docker "checked 2026-10-24" claim not in the dossier | Fixed | Dossier S118 and S119 added; `04.03` "What the docs say" and "Two official sources changed the plan" now match them; canvas `plan-a-lab-with-ai` step 4 and `04.07` model answer agree |
| S2-2 | 60 percent learning share did not reconcile | Fixed | `05.02` "Worked example": 96 + 19 = 115, 48 + 29 = 77, total 192, "about 60%"; same sum in `05.07` and `06.05` Part 1; canvas default 60 |
| S2-3 | Yara's calendar broke the plan's own rules | Fixed | One table in `05.03` and `06.05`; log starts week 7 (`04.01`, `06.05`); containers week 5; `03.03` build angle now uses lab days 3 and 4; click-count decision in week 11 (`05.04`). Two residuals are filed as new S3-N1 and S3-N2 |
| S2-4 | "AI shortens building more than learning" asserted as fact | Fixed | `05.02` "Yara's guess": "This is her assumption, and she treats it as one"; hours-log test diagram; `05.07` recap point 3 now says feeling faster is not being faster; `06.05` key accepts any reason that uses the learner's estimates |
| S3-1 | Rename dated to "while this course was being written" | Fixed | `02.01` "In July 2026 ... in September ... (checked 2026-10-24)"; `03.01` "changed its name in 2026, as chapter 2.4 showed" |
| S3-2 | Feature claims beyond the dossier (diagrams, Arabic audio, phone download, GitHub web edit) | Fixed | `03.03` second angle (Claude artifact with age; Gemini Guided Learning replies; "if it can draw one"); `03.05` "output languages includes Arabic; set the language and check" and "Try it in your phone's browser; if it fails, use the fallback"; `04.05` "at the time of writing". The GitHub web-editing fact itself is still not in the dossier (S4-3) |
| S3-3 | Age rules missing where tools were suggested | Fixed | `01.01` key word "Claude (18 or over)"; `02.03` and `03.05` state the Gemini Notebook age rule and the fallback |
| S3-4 | Deleting a chat "does not remove any copy"; invented legal team | Fixed | `02.02` "may not remove every copy. Google says, for example ... reviewed Gemini chats are kept"; diagram node "May stay after you delete"; "legal team" removed |
| S3-5 | Unsourced "fast building" generalisations | Partly fixed | `01.01` and `05.01` now say "In the course's view" and tie to Khaled; "Hundreds" removed. `01.05` "Building fast is no longer rare" still says speed "is now within reach of anyone with an AI coding assistant" |
| S3-6 | "Your own line already meets most rules" | Fixed | `06.03` "Your own line is a good start, but Medium and DEV also ask you to use their label" |
| S3-7 | Invented names and outputs written as checked facts | Fixed | `04.03` "(a name invented for this example)", quiz "The package names in this question are made up"; `04.04` and `06.05` "invented for this example, not measured"; canvas limits say the same |
| S3-8 | Lina: read once versus three times; own-words pages versus pasted summaries | Fixed | `03.02` "reads them three times"; canvas edge "read 3 times"; `03.01` "starts to keep ... Old habits are slow to change"; `03.06` "three of the fourteen are" her own |
| S3-9 | Yara's log history differed across 4.2, 4.3 canvas, 4.5 | Fixed | `04.02` (phone notes), `04.03` canvas last step ("phone notes"), `04.05` ("on lab day 4 she rewrote those three days ... moved them into her repository"), `06.05` |
| S3-10 | Dina's "three checks" only in the canvas; Yaman's devices | Fixed | `01.03` names the three facts before the predict and again in "Where it goes wrong"; Yaman has the same two devices in `02.03`, `02.05` and `02.06` |
| S3-11 | Terms defined twice | Fixed | No term appears in two places (scripted); "Free tier", "Trade-off" and "Explain-back rule" rows removed from Key words |
| S3-12 | Repeated settings and examples | Partly fixed | Print shop 11 chapters down to 6, sports club to 1 (Shahd), uncle's shop to aunt's workshop, index example only in 2.4, Bilal down to one chapter (1.4). Print and copy shop still appears in 1.2, 2.1, 2.2, 6.1, 6.2 and 6.3; "a cafe with internet" in 4 chapters |
| S3-13 | Template voice | Partly fixed | "What to notice" 29 to 12; "fourth mistake" lists 17 to 2; "not X, it is Y" 17 to 1. All 22 Learn chapters still end with a "Where it goes wrong" section, and the six gates keep one frame ("The mentor then replies ...") |
| S3-14 | Idioms | Fixed | Searches for every round 1 idiom return 0 in chapters and canvases |
| S3-15 | Sentences over 30 words | Partly fixed | 5 prose and 1 stem left (S3-N3) |
| S3-16 | Undefined jargon | Fixed | Glossary terms for API, endpoint, framework, virtualisation, rate limits, deploy, issues, terminal and Docker at first use |
| S3-17 | Unsupported superlatives | Fixed | "the fastest one", "one of the best free teachers", "the most useful part of any study" and "The most important rule" are gone |
| S3-18 | Mixed line endings | Fixed | 40 of 40 files LF |
| S3-19 | Planning rule worded three ways | Fixed | "one new area at a time" in 5.1 to 5.7, 6.5 and 6.6; `05.03` explains the sponsor's wish for a weekly area as alternate weeks at 8 hours |
| S4-1 | "Word files" | Fixed | `02.05` "document files" |
| S4-2 | DEV label without date in 6.5 | Fixed | `06.05` "at the time of writing" |
| S4-3 | "Martin Keller" a possibly real name | Fixed | No longer in the chapter |
| S4-4 | Realistic password string | Fixed | `04.07` "example-password", labelled as shown in place of her real one |
| S4-5 | EBU sentence attached outdated information to the wrong figure | Fixed | `01.02` now separates "nearly half" from "about one answer in five ... major accuracy problems, including out-of-date information" |
| S4-6 | Perplexity "pages did not say" | Fixed | `02.03` "for Perplexity we found no country page at all" |
| S4-7 | Unsourced "lists of good projects" | Fixed | Sentence removed from `05.05` |

## New defects

### S1
None. Searches for "Do not say" items (learning styles, 10 percent, 21 days, 10,000 hours, 19 percent, EEG, 40 to 60 minutes, handwriting) find only refutations. No real secret, no unsafe command.

### S2
None.

### S3

**S3-N1. The lab log starts in week 5 in one chapter and week 7 in two others**
- location: `05-a-project-worth-six-months/05.02-why-strong-projects-take-months.md`, "Feeling faster is not being faster": "From week 5, when her lab log starts, that line goes at the end of every lab log entry". Against `04.01-set-the-scene.md`, "Yara's month" ("In week 7 of her six-month plan, her new area was caching, and she started a lab log. Since week 5, when containers were her area, Qasir has run with Docker") and `06.05`, Part 3 ("Her log began in week 7").
- observation: Week 5 is when she started using containers; week 7 is when the lab log began.
- why it matters: Calendar facts are the continuity spine of modules 3 to 6, and this is the only remaining disagreement about when the log begins.
- required fix: Change 5.2 to "From week 7, when her lab log starts", or to "once her lab log starts in week 7".

**S3-N2. The first slice (weeks 1 and 2) already holds work that the plan schedules for weeks 3, 9 and 11**
- location: `01-ai-as-an-enabler/01.05-plenty-of-ai-few-strong-projects.md`, opening ("Yara shows the first slice of Qasir, built in her first two weeks ... it saves the link with a short code ... each link keeps a click count in the simplest way: a number saved in the database"); schedule in `05.03` and `06.05` (database week 3, short codes week 9, click counts week 11). Related: `01.05` "Building fast is no longer rare" says speed "is now within reach of anyone with an AI coding assistant".
- observation: `05.04` explains the click counter ("the simple counter from her first slice will not be enough when many people click"), which settles the click-count part. Nothing says the slice was a quick first version that the plan later replaces area by area, and the database and short-code parts are unexplained.
- why it matters: A careful reader or mentor sees "one new area at a time, learned before it is built" next to a slice that skips ahead, and cannot tell which is the model.
- required fix: Add one sentence in 1.5 or 5.1: the first slice was a rough weekend-style start with AI help; the plan then learns and rebuilds each area in order. Reword "anyone with an AI coding assistant" as "many people" tied to Khaled's case.

**S3-N3. Six sentences still run over 30 words**
- location (prose): `05.02` first paragraph ("In her first week, before she had built anything, Yara asked a chat assistant, such as Gemini or ChatGPT, a simple question ...", 32 words); `06.01` "What this module asks of you" ("Chapter 6.4 is a mixed review: five new cases from across the course ...", 32) and "The capstone shows only part of one in full ..." (31); `06.03` after the canvas ("Notice the step people forget: step 5 ...", 34); `06.05` Part 4 line in the Ibrahim list ("His week 1 learning plan: each resource kept, dropped or replaced ...", 44). Stem: `04.05` quiz 1 ("Mo'men, a freelancer, finishes lab day 6 ...", 35).
- observation: Down from about 20 in round 1; these six are the last ones my script finds outside table cells and mentor keys.
- why it matters: Second-language readers on phones; the 44-word line is part of the capstone task.
- required fix: Split each at its colon or semicolon.

### S4 (listed; fix if cheap)
- **S4-1.** `01.02` predict: the option "Sending the orders by email" does not match the first plan's "email confirmations"; align the words with the canvas ("each order is emailed to the shop").
- **S4-2.** Quiz option length: the correct option is now strictly the longest in 23 of 68 questions (34 percent), and in 2 of 5 in `02.05`, `03.07` and `05.06`. The gaps are under 10 percent, so no audit warning, but the tell is back; shorten the key or lengthen two distractors per item.
- **S4-3.** `04.05` "GitHub's website also lets you create or edit a file in the browser" now has "at the time of writing" but no dossier source; add one or drop it.
- **S4-4.** `04.01` "Yara's notes from her ten lab days have more 'no' arrows than 'yes' arrows, and those are the days she remembers best" is an invented detail; drop the second clause.
- **S4-5.** `04.03` Yara's saved prompt says "Level: beginner, new to containers", but containers were her week 5 area and the lab is in week 7; use "new to caching" or "beginner".
- **S4-6.** The name Asma is used for a library volunteer (`01.02`) and a bootcamp student (`01.04`); use a different name in one.
- **S4-7.** Six gates still share one closing frame ("The mentor then replies with one or two short questions ..."); vary two of them.

## What works

- **Every round 1 accuracy and overclaim problem is closed.** The Docker facts now trace to S118 and S119; the rename dates are exact; the privacy claims name the tool that supports them; the feature statements no longer promise a diagram, an Arabic audio or a phone download; age rules appear wherever a tool is suggested.
- **The 60 percent sum is now a visible sum.** 96 + 19 = 115 and 48 + 29 = 77 appear in 5.2, 5.7 and 6.5, and the one-month case and the canvas default agree with them.
- **The AI-speed claim is honest.** It is Yara's assumption, tested by her hours log and followed by the METR-safe sentence; the capstone key accepts any reason built on the learner's own estimates.
- **Yara's calendar is a single table.** Weeks, areas, lab days, the day 2 failed try, the power cut, the expiry-time lab, the week 9 reading and reuse of shortlane all line up across 1.5, 3.3, 4.x, 5.x, 6.5 and eight canvases.
- **Better teaching, not only cleaner text.** Predicts now carry a real guess (capital letters in a short code, the second quiz question exposing a faulty rule, which part of the routine keeps the week going), the library example in 3.2 gives a recall test every reader can do, and the capstone and 5.3 fade their worked steps on purpose.
- **Voice is much less templated.** Repeated devices fell by half or more, idioms are gone, jargon is defined, and Docker, terminal, API and endpoint are explained where first used.
- **Clean on every scripted check:** no dashes, no links, no forbidden phrases, no duplicated definitions, LF line endings, balanced key positions, titles and minutes unchanged.

## Recommendation

**Approve from this lens.** There are no S1 or S2 defects, every scored dimension is at least 4, and the average is 4.43. Before publish, fix the three new S3 items (the week 5 versus week 7 sentence, the first-slice note, and the six long sentences) or track them explicitly, and clear the S4 items if cheap. Dimension 19 is still unscored: the gate cannot close until two instructors sign `roadmap-confirmation.md`. The technical validator's own run (canvas QA, import and the click-through) is outside this review.
