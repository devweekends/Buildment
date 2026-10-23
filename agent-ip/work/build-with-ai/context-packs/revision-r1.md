---
artifact: context-pack
course: build-with-ai
for: chapter-writer (revision round 1)
version: 1
---

# Revision round 1: build-with-ai

Two blind critics reviewed the draft: `../qa/critique-a.md` (pedagogy and assessment, average 3.82, 9 S2) and `../qa/critique-b.md` (slop, continuity, accuracy, average 4.29, 4 S2). Both say **revise**. The blind key check matched 94 of 94 keys. Read both critiques in full, then this pack. This pack is the orchestrator's decision on every defect: where it differs from a critic's suggested fix, follow this pack. Fix every S2 and S3 defect located in your module, plus the course-wide rules below. The writer pack (`writer-pack.md`) still applies.

## A. Canonical facts (every module must match these exactly)

### Yara's calendar and plan (fixes B S2-3, B S2-2, A S3-10, B S3-9)

- **She writes her six-month plan in her week 1**, before any lab, after building nothing yet. Chapter 5.2 tells how she wrote it (looking back is fine: "In her first week, Yara worked out whether six months fits"). Never "before Yara wrote her plan" after labs have happened.
- **Her plan order** (12 areas, one new area at a time, a new-area week then a build-and-review week, 24 weeks):

  | Month | Weeks | Areas |
  |---|---|---|
  | 1 | 1 to 4 | An API (week 1), a database (week 3) |
  | 2 | 5 to 8 | Containers (week 5), caching (week 7) |
  | 3 | 9 to 12 | Short codes (week 9), click counts (week 11) |
  | 4 | 13 to 16 | Tests (week 13), a simple web page (week 15) |
  | 5 | 17 to 20 | Rate limits (week 17), logs (week 19) |
  | 6 | 21 to 24 | Safety against harmful links (week 21), deploy (week 23) |

- **Her first slice (chapter 1.5)** is built in weeks 1 to 2 (about 16 hours): save a link, open it by its short code, show a "link not found" page, and keep a click count the simplest way, as a number saved in the database. Chapter 5.4's question is how to count clicks later, when there are many (month 3, week 11), so 5.4 says "the simple counter from her first slice will not be enough when many people click".
- **Caching (chapter 3.3)** is her week 7 area. Her five angles on caching happen in week 7. The "build or teach" angle is lab days 3 and 4 (log where each answer came from; stop the cache). Do not give her a separate "tiny cache in the app's memory" lab.
- **Her lab log starts in week 5** (containers), and the ten lab days run over 17 days in weeks 5 to 7:

  | Day | Lab |
  |---|---|
  | 1 | Run Qasir with the app, a database and a cache in containers (week 5) |
  | 2 | Save and read short links in the database (first try failed with no shape, chapter 4.2; redone the next evening) |
  | 3 | Make the log say where each answer came from: the cache or the database |
  | 4 | Stop the cache on purpose, then the database |
  | 5 | Give cached links an expiry time and watch an old link load from the database again |
  | 6 | Power cut after the study part; wrote what she had |
  | 7 | Compare two expiry times (reading and notes only) |
  | 8 | Restart all parts and check that links survive: the database keeps them, the cache starts empty |
  | 9 | Read one open-source link shortener in order: README, run it, one folder |
  | 10 | Review the weeks; update the notes page; draft the write-up |

- **Where her log lives (chapter 4.5):** days 1 to 3 were notes on her phone (day 2's failed first try had no note at all); on day 4 she moved them into `qasir-labs` and from then on wrote each entry straight into the repository. The 4.3 canvas's last step says the plan goes into her phone notes as the start of lab day 1.
- **Her learning share is 60%, about 115 of 192 hours, and the sum is shown once in 5.2 and once in 6.5:** 96 hours to learn the 12 areas plus 19 hours of spaced review and reading open source (which is learning) = 115; 48 hours to build the areas plus 29 hours for joining the parts, writing up and bad weeks = 77. 115 + 77 = 192. Chapter 5.7 must not say "two thirds".
- **"AI makes building faster than learning" is Yara's assumption, not a fact** (B S2-4). Say "Yara expects AI to shorten building more than learning; that is why her plan gives building 4 hours an area and learning 8. Her hours log will test it." Never state it as a fact, never in a recap, and mentor keys accept any reason that uses the fellow's own estimates. Keep the "felt faster, measured slower" sentence (dossier D) as the reason to log hours.

### Other cast facts
- **Dina (1.3)** checked timetable A against three things; name all three in the prose (the hall hours, the coaches, and that the youngest team must finish by 17:00), matching the canvas.
- **Yaman (module 2)** has only his phone's browser at home and a shared laptop at the clinic desk; say so the same way in 2.3, 2.5 and 2.6.
- **Lina (3.2)** reads the explanation three times (match the canvas). In 3.1 she *starts* to keep own-words pages; 3.6 says she kept pasting AI summaries from habit for the first weeks.
- **Salma (6.1)**: change her project from a football pitch booking app to a shuttle bus timetable for a university, so she no longer mirrors Shahd (4.7).
- **Ibrahim's fake book (6.5)**: invented author name that is clearly not a real person, for example "by A. Example".

### Terms defined once (fixes B S3-11, A S3-4, B S3-16)
Define each at first use with a `GlossaryTerm`, then refer back. First uses: **API** and **endpoint** (2.2, where "API key" is defined: define API there), **sycophancy** as "the agreeing habit" (2.2; every later chapter refers back in a few words, never repeats the sentence "AI assistants tend to agree with the user, even when the user is wrong"), **framework** (2.3), **virtualisation** (2.3, as "a setting that lets a computer run another computer inside it"), **Docker** and **terminal** (4.1, before first use), **rate limits**, **deploy** (5.1), **pull request**, **issues** (5.5). Remove the Key words rows that repeat a BigWordAlert ("Free tier" in 2.1, "Trade-off" in 5.1) and the 5.1 "Explain-back rule" row (refer back to 1.5 in prose).

## B. Course-wide rules for this round

1. **Predicts (A S2-5).** Keep a predict only when a learner's naive guess could really be wrong and the chapter has not yet said the answer. For each of your predicts: move any paragraph that gives the answer to *after* the predict, or rewrite the predict as a real prediction about something not yet narrated, or cut it (a Learn chapter must still have one predict before its canvas). No "should" or "is it worth it" predicts: those go in the prose as "which would you do first, and why". No straw-man options. In about half of your predicts the correct label is the longer one (never more than 10% longer). The canvas `tryThis` first line must not restate the predict question: make it an instruction that points at the step or setting that answers it, with the observation.
2. **MCQ cues (A S2-6).** Every option in an item has the same sentence shape: either every option carries a reason ("because...", "since...", "as...") or none does. Across your quiz items, the key is the longest option in about a third (never 10% or more longer than the longest wrong one), the shortest in about a third and in the middle otherwise. Put a plausible half-right reason on at least one distractor per item. Keep the 0 to 3 position spread.
3. **Near-copy items (A S3-5).** Rewrite every item that repeats the chapter's own worked example or rule list as a new case with a small table or three to four facts that were not narrated in the chapter.
4. **Spaced retrieval (A S2-7).** In 03.07, 04.06 and 05.06, replace one item with a fresh-case item from an earlier module (start the stem with "Review from module N:"). 06.04 is reshuffled (section C, module 6).
5. **Sentences over 30 words (B S3-15, A S3-4):** split every one in prose, stems, prompts and explanations. For "four facts" stems, put the facts as "1) ... 2) ..." inside the question.
6. **Idioms and superlatives (B S3-14, B S3-17):** apply the rewrites the critics list; no "stand out", "raised the floor", "narrow corner", "crack", "fall apart", "hidden in plain sight", "fresh eyes", "the hard way", "catch him out", "keeps the thread", "the most useful", "the best free teacher", "the fastest one". Search your files for each.
7. **Voice template (B S3-13, A S3-9):** keep "What to notice ... The takeaway" for at most two diagrams in your module; vary the rest (a question, one plain sentence, a contrast). In "Where it goes wrong", give some chapters two or three mistakes, or one worked failure, instead of always four. Cut at least half of your "It is not X. It is Y." sentences to a plain statement. Rebuild any diagram the critics say restates the paragraph so that it argues something the prose does not (a contrast, a fork, a loop, a before and after).
8. **Repeated settings (B S3-12):** in your module, at most one print and copy shop case, at most one sports club or booking case, and "a café with internet" at most once. Replace the others with settings from the writer pack's list (clinic desk, school, NGO office, university course, bootcamp, freelance marketplace, small online shop) or new ones: a pharmacy, a tailor, a water delivery round, a library, a sewing workshop.
9. **Unsourced general claims (B S3-5):** tie them to the course's case or label them as the course's view; no "hundreds of people", no "many people can now produce a demo in a weekend" as a fact.
10. **Made-up names and outputs (B S3-7):** mark every invented package, project, book or log output as made up for this example, at its first appearance. Passwords in examples are `example-password`.
11. **Open questions:** set-the-scene open questions become `required: false` (A S3-1). In gates and the capstone, replace any invitation to answer by voice note *instead of* writing with: "You can dictate your answer with your phone's microphone, and you may add a voice note link as well" (A S3-8). Every gate pass rule adds: "and your reply to the mentor's follow-up question answers it with evidence" (A S3-6).
12. **Rubric counts (A S3-6):** every Met and Partly cell names a count or an observable threshold ("three of four", "every row", "at least two").
13. **Fading support (A S2-9):** see your module's list.
14. **Keep everything that passes now:** prose minimums (1,200 and 700), one diagram per non-gate chapter, five MCQs per quiz, no em or en dashes, the allowed tool list and dated feature claims, `ChapterRecap` only in gates.

## C. Per-module defect lists (both critiques; locations are in the reports)

**Module 1** (01.01 to 01.06; canvases `ai-missing-context`, `who-makes-the-call`, `answers-or-hints`, `big-app-or-understood-app`):
- A S2-5 predicts in 01.02, 01.03 (straw men); B S3-10 Dina's three checks; B S3-3 Claude 18+ in the 1.1 Key words; B S3-5 weekend-demo claims in 1.1 and 1.5; B S3-14 idioms in 1.1, 1.4, 1.5 ("stand out" in titles: change the 1.5 summary and diagram node, but **not** the chapter title in course.yaml); A S3-5 01.05 item 2 (one option dominates: give the candidates a real trade-off); A S3-6 canvas `ai-missing-context` classification ("hosting already paid" and "cash at the counter" must sit in the kind the chapter defines); B S4 01.02 EBU and BBC wording (outdated information belongs to the 20% with major accuracy problems); A S3-9 and B S3-13 diagrams in 1.1, 1.3, 1.4; A S3-12: add one line in 1.1: "If you are stuck, or something outside the course makes study hard, talk to your mentor or the fellowship coordinator." (the delivery lead adds the coordinator's name); 1.5 first slice per section A; rule 6 and 7.
- 01.06 gate: rubric counts; pass rule adds the follow-up reply; voice-note wording. Gate time becomes 30 minutes.

**Module 2** (02.01 to 02.06; canvases `before-you-paste`, `pick-a-tool-for-the-job`, `keep-work-in-your-files`):
- B S3-1 rename "while this course was being written" in 2.1: say "in July 2026" or refer to 2.4; B S3-4 deleting chats (tool-specific wording) and remove "with a legal team"; B S3-3 Gemini Notebook age in 2.3; B S4 "Word files" in 02.05 item 2 (say "document files"); B S4 Perplexity "no country page found"; A S2-5 predicts in 02.01, 02.02; A S3-5 02.02 item 1 and 02.04 item 2 near-copies; A S2-6 cues in 02.05 items 1, 3, 5; section A terms (API, endpoint, the agreeing habit, framework, virtualisation; remove the "Free tier" key-words row); Yaman's devices; rule 8 (print shop).
- 02.06 gate: rubric counts; follow-up in pass rule; voice-note wording. Gate time becomes 40 minutes.

**Module 3** (03.01 to 03.08; canvases `close-it-and-recall`, `five-angles-on-caching`, `ai-quiz-partner`, `listen-then-read`, `note-page-lifecycle`):
- B S3-1 rename wording in 3.1; B S3-2 feature claims (ChatGPT diagrams, Arabic audio, phone download); B S3-3 Gemini Notebook age in 3.5; B S3-8 Lina facts; A S3-3 cognitive load: keep Lina's networking exam as her case but cut technical depth (one sentence of subnetting detail at most), and make the 3.2 try-it an everyday topic, not password hashing; canvas `five-angles-on-caching` step "Angle 5" per section A (lab days 3 and 4, not a memory cache); A S2-5 predicts in 03.01, 03.04, 03.05, 03.06; A S3-5 03.02 item 2; 03.07: one review item from module 1 or 2 (rule 4); A S4 03.07 item 1 "in his case".
- 03.08 gate (A S2-3): rename the row "AI checked" to "Checked against a source": Met when an AI output **or** the fellow's own picture or summary is checked against a named source (3.4, a lecture page, a book page); give the provided topic a short printed AI answer to check (an AI "review plan" with one wrong gap); A S3-13: accept a claim checked from an audio overview or a text-to-speech summary, when audio is available; rubric counts ("Notes page: Met when all template parts are present in own words; Partly when one or two parts are missing"). Gate time 45 minutes.

**Module 4** (04.01 to 04.07; canvases `daily-lab-loop`, `plan-a-lab-with-ai`, `url-shortener-stop-a-part`, `lab-log-commit-push`):
- B S2-1 Docker: the claims are now verified and in the dossier as S118 and S119; keep them with "(checked 2026-10-24)" and remove nothing, but make sure the wording matches: Compose v1 "first released in 2014", the supported forms today are Compose v2 and v5 (say "newer versions use `docker compose`"), and the `version:` line "is obsolete and only produces a warning".
- Section A: lab log calendar (week 5 start, days 1 to 10), log location story (days 1 to 3 on the phone), 4.3 canvas last step; B S3-7 `shortlink-cache-helper`, `print-queue` and the 04.04 log lines and timings marked as made up for this example ("invented for this example, not measured"); B S4 password string; A S3-3 cut 04.04 to cache then database, with the restart policy as a one-line note, and keep only the commands needed; A S3-5 04.02 item 2, 04.04 item 2 near-copies, 04.05 item 1 key wording (the `.gitignore` detail must match the chapter's commands); 04.06: one review item from module 2 or 3 (rule 4); define Docker and terminal in 4.1; A S2-9: say in 4.1 that from this module the examples give less step-by-step help on purpose, because the learner now has the habits.
- 04.07 gate (A S2-4): keep the lab rubric for the own-lab route and add a second four-row rubric for Shahd's provided log (rows: problems found, habit named for each, fix works, day 3 rewritten with a prediction; Met: four of four problems found and fixed; Partly: three; the password problem is a must-meet row); rubric counts; follow-up in pass rule. Gate time 50 minutes (it includes lab day 1).

**Module 5** (05.01 to 05.07; canvases `six-month-hours-split` (orchestrator-owned: do not edit), `week-plan-check-resources`, `two-options-trade-off`, `reuse-open-source-safely`):
- Section A in full: plan order table, week 1 plan writing in 5.2, the 60% sum in 5.2, the assumption wording (B S2-4) in 5.2 and the 5.7 recap and key, click counts in 5.4 (simple counter from the first slice; the decision is for month 3), caching week 7 in 5.3.
- B S3-19: say "one new area at a time" everywhere; say once in 5.3 that the sponsor's wish for a new area every week becomes a new area every second week at 8 hours a week, and that a fellow with more hours can learn and build one area in one week.
- A S3-3: in 5.4 move SQL injection into a short `Callout` and rename the "five angles" list to "five questions about a decision"; A S2-5 predicts in 05.02 (the worked example above gives the answer: move it after the predict), 05.03, 05.05; A S3-5 05.04 item 1 (not microservices; a decision this course taught); A S2-6 05.06 item 4 ("The database, because" pattern); 05.06: one review item from module 3 or 4 (rule 4); A S2-9: 5.3 shows the first two steps of the weekly plan in full and the rest as a skeleton with "what a good answer contains"; one quiz item in 05.06 is a no-hint transfer to a project outside link shorteners; B S3-15 long sentences in 5.1, 5.2, 5.5, 5.7; section A terms (rate limits, deploy, pull request, issues).
- 05.07 gate: rubric counts; mentor key accepts any reason based on the fellow's own estimates; follow-up in pass rule. Gate time 40 minutes.

**Module 6** (06.01 to 06.06; canvases `commits-to-article`, `disclose-ai-help`):
- 06.05 capstone (A S2-1, S2-2, S3-6, S3-7, S3-11; B S2-2, S2-3, S2-4):
  - Add a sixth rubric row **Walk-through**: Met: explains the part the mentor picks, its trade-off and one failure without notes; Partly: explains with prompts; Not yet: cannot say what the part does. Put it in the pass rule. For the provided route, the explain-back is about the fellow's **own** improved plan and notes page (for example "defend your learning share and one resource you dropped"), not Ibrahim's code. A fellow on weak data does the walk-through as a short voice note answering the mentor's chosen question.
  - Provided route part 5: the honest post plus a version of about 100 words for a second platform; add it to the mentor key.
  - List Ibrahim's problems explicitly in the key: required (no lab breaks anything; day 6 commits a database password; days 7 to 10 have no notes; the fake book; the post hides AI help); credited extras (any others the case contains).
  - State exactly what the provided route produces (a plan for the five angles, not performed; three recall questions, not a result; the notes page for one named lab from the case's information) and a realistic time.
  - Yara's worked example: section A calendar, plan, sum and lab table; show parts 1 and 3 in full and parts 2, 4 and 5 as outlines with "what a good answer contains" (fading, and so the package cannot be copied).
  - B S4: DEV label "at the time of writing"; fake book author per section A.
- 06.04 (A S2-7, B S3-12): five items in shuffled module order, covering all six modules, with at least one item needing two habits at once (for example a client log that holds a key and an AI summary to verify); replace the "index slows down saving" case; keep "check the AI's output" in at least one item.
- 06.01: Salma's project (section A); A S2-9: say that the capstone gives an outline, not a full example, on purpose; A S2-5 predict; B S3-14 idioms.
- 06.03: B S3-6 "most rules" (Medium and DEV ask you to use their label too); A S3-5 06.03 item 1 wording (closing paragraph vs summary); A S2-5 predict.
- 06.02: A S3-5 item 2 near-copy; the AI-video and book-reading sentences labelled as the course's advice.
- 06.06 gate (30 minutes): drop the weak example (fading); add a rubric row "Look back" (the gate 1 answer compared with now, at least one call they would now keep for themselves); A S3-12 the same stuck-or-wellbeing line as 1.1; rubric counts; follow-up in pass rule.

## D. When you finish

Run the writer pack's section 10 checks on your files (audit, validate, structure audit, no dashes), re-run the label-fit check on any canvas you changed, and report: what you fixed per defect id, anything you decided not to fix and why, the new MCQ keys per chapter, and the new prose words per chapter. Do not edit `registry.ts`, `slugs.ts`, `course.yaml` or another module's files. No git commands that change anything.
