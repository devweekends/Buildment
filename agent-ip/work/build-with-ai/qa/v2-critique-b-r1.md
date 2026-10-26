---
artifact: critique
course: build-with-ai (v2)
round: 1
critic: B (slop and red-team lens)
scorecard_average: 3.8
s1: 1
s2: 7
s3: 17
s4: 8
---

# Critique B, round 1: build-with-ai v2 (54 chapters, 45 canvas data files)

Scope and method. I read all 54 chapters, all 45 canvas data files and the model types, and dossier parts A, B and C against them. I also ran counts by script over the chapters (quiz option length and position, cue words in options, sentence length, repeated phrases, dashes). Findings that come from a script say so. The average covers 20 dimensions: 16 (variant distinctiveness) is not applicable, no variants, and 19 (instructor alignment) cannot be scored, G2B pending. Zero em or en dashes were found in the chapters or the canvases, and no AI attribution.

## Scorecard

| # | Dimension | Score | Note |
|---|---|---|---|
| 1 | Outcome alignment | 4 | Every module maps to an outcome in the brief and has a quiz and a gate. Outcome 2 ("name what puts an engineer in the group that does more with AI") is answered with claims the dossier does not carry (B-8). |
| 2 | Domain specificity | 5 | Phone-first paths, fallbacks, Gaza-aware program rules, US data labelled as US. Examples belong to this learner. |
| 3 | Depth over coverage | 4 | Module 6 and module 8 go deep. Module 9 (9.5 in particular) carries too many tools for one chapter (B-25). |
| 4 | Prose quality | 4 | Plain and short: of about 5,100 sentences, 2 body sentences pass 30 words and 180 pass 25 (script). Weakened by template repetition and a few idioms (B-10, B-11). |
| 5 | Chapter structure | 4 | Hook, beats, predict, quick check, sources, next line are all present and consistent. |
| 6 | Interaction purpose | 4 | Canvases carry one claim each. Several predicts restate the answer in the prompt (B-9). |
| 7 | Assessment quality | 3 | Option length is well controlled, but the keys are guessable by form (B-7, B-9) and four keys are wrong, ambiguous or rest on an unstated fact (B-2, B-5, B-6, B-15). |
| 8 | Difficulty calibration | 4 | Support fades from worked example to provided case to own project. Gates ask 150 to 300 words on a phone, which is heavy but has speech input. |
| 9 | Cognitive load | 4 | Folds absorb most of the load. 9.5 and 6.4 pack two or three decisions each (B-25). |
| 10 | Prerequisite integrity | 4 | Terms are defined at first use. "Transaction" in 6.3 is in place before 6.5. |
| 11 | Technical accuracy | 3 | Licence table, TSDB and benchmark content are sound. Four engineering statements overreach or err (B-2, B-3, B-4, B-18). |
| 12 | Production-grade coverage | 4 | Reads as secrets, least access, revoke first, read-only, tests, logs. Appropriate for a mindset course. |
| 13 | Security and integrity | 3 | Token and secret advice is strong. The voice-cloning rule contradicts itself across chapter, canvas, quiz and gate (B-1). Key exposure unconfirmed (B-20). |
| 14 | Accessibility | 4 | Diagram titles and legends exist; text carries the claim. |
| 15 | IP protection | 4 | No canvas reveals the capstone solution. Mentor keys sit in learner-facing files; confirm they are hidden (B-20). |
| 16 | Variant distinctiveness | n/a | Not applicable, no variants. |
| 17 | Continuity | 3 | One name reused in four or five roles per module, near-identical names, one provided case that contradicts itself, a wrong id range (B-5, B-12, B-14, B-24). |
| 18 | Learner agency and curiosity | 4 | Real choices with a stated condition that would change them. |
| 19 | Instructor alignment | n/a | Cannot be scored, G2B pending. |
| 20 | Interactive canvas quality | 4 | Counts I re-computed are right (see What works). Overreach in the cache and voice canvases and gaps in two pickers (B-1, B-4, B-18). |
| 21 | Explanatory depth | 4 | Mechanism, trade-off and failure present in folds. |
| 22 | Visual explanation quality | 3 | Many Mermaid diagrams restate the paragraph or the fold table beneath them, and two misuse arrows (B-19). |

Average of the 20 scored dimensions: 3.8. Dimensions at 3: 7, 11, 13, 17, 22. A single S1 (B-1) blocks.

## Defects

### S1

**B-1. The voice rule is contradicted in the chapter, the canvas, a quiz key and the gate, and the key rewards cloning a client's voice.**
- Files: `courses/build-with-ai/09-the-ai-toolbelt/09.04-your-voice-your-consent.md` (fold "Go deeper: the rule behind each bucket"; Quick check, first question (Wisam's ad)); `packages/learning-ui/src/canvas/voice-use-check/data.ts`; `09.09-checklist.md`; `09.08-quiz.md`.
- Observation. The fold says "This course goes further than that rule. Clone only your own voice." and two sentences later "If a real project needs another person's voice, you need that person's yes, in writing." The quiz question about Wisam's ad (cloned from a 30-second clip of the shop owner) has the key "Get the owner's written yes, then make the ad and label it". The canvas sorts "A classmate's voice, cloned for your group's demo video." into "Needs a yes", with the reason "With her explicit yes, and a label, it can be allowed", and "A teacher's voice made to say a joke in the class chat." with "Even a joke needs the teacher's clear yes first." The gate checklist says "I clone only my own voice and only if I choose to". The 9.08 quiz, by contrast, keys "Ask the owner to record the script, and tell him where it will run" for the same kind of case. The writer pack's hard rules say "Voice: own voice only" and that any hard-rule violation fails review. Dossier C (phrase-it-this-way) says "Do not clone anyone else, even a friend, even as a joke."
- Why it matters. A learner is graded for cloning a third party, including a client, from a short clip, which the course itself says it does not teach. For under-18 and freelance fellows the consent route (written, scoped, labelled) is the harder path and the course gives no template for it. The same cases get opposite keys in 9.04 and 9.08.
- Required fix. Pick one rule and apply it everywhere: own voice or a labelled stock voice only. Move "classmate", "public clip" and "teacher joke" cards to a fourth bucket "Not in this course: use your own recording", or to "Never" with a reason. Rewrite the 9.04 key so the best option is "Ask the owner to record the script" (add it to the options) and delete the "written yes" key. Remove the sentence "you need that person's yes, in writing" or label it "outside this course".

### S2

**B-2. A quiz key and its explanation say two writers "rule out" SQLite, which is stronger than the dossier and the course's own worked example.**
- File: `06-context-changes-the-answer/06.03-the-fastest-database-depends.md`, Quick check, first question (Dima's bakery).
- Observation. Facts: "the till and the phone app save orders at the same time", 60 orders a day, one rented server. The explanation for the SQLite option is "Fact 1 rules this out. SQLite allows one writer at a time, and two programs saving at the same moment point to a client and server database." The stem never says the writers are on different machines. Dossier B52 and B53 say SQLite WAL allows readers and one writer at a time, fits low writer concurrency, and that "many programs send SQL over a network or many concurrent writers" suggest client/server. Two writers and 60 orders a day is inside that fit. Chapter 6.6 picks SQLite for a three-user tool with 40 loans a day.
- Why it matters. An expert can defend SQLite, so the key is not unambiguous. It also teaches a false rule about SQLite, in a module whose point is fairness to every option.
- Required fix. State in the stem that the till and the phone app are on different machines and reach the data over a network (or raise the writers to many), and change the explanation to "points to" with the B53 wording. Keep the key PostgreSQL.

**B-3. The idempotent-consumer example for a payment re-creates the dual-write problem the chapter teaches against.**
- File: `06.05-the-outbox-pattern.md`, beat "Consumers must expect repeats" (diagram "An idempotent consumer") and quiz question 2.
- Observation. The flow is: seen before? no, then "Do the work: charge the customer", then "Record e-1001 as handled". The key is "Record each event id it has handled, and skip an id that it has seen before". If the consumer crashes after charging and before recording, the event is delivered again and the customer is charged twice. That is the same two-step gap as save-then-publish.
- Why it matters. This is a money example. A learner who copies the diagram ships a double charge, and the chapter has just shown the crash table that explains why.
- Required fix. Show the consumer recording the event id and doing its effect in one database transaction, or passing the event id to the payment provider as an idempotency key. Add one sentence: "check, act, then record" has the same crash gap. Reword the key to "Record each handled event id in the same transaction as the charge, or send the id as an idempotency key, and skip ids already seen".

**B-4. The cache canvas and a quiz explanation state an absolute about Valkey that the dossier does not support.**
- Files: `packages/learning-ui/src/canvas/cache-choice-context/data.ts` (first and third rules); `06.04-two-defaults-worth-questioning.md`, Quick check question 2 explanation.
- Observation. Rule 1 says "Only Redis has these types. Read its licences against selling it as a service." Rule 3 says "Valkey forked at Redis 7.2.4 and lacks them." The quiz explanation says "Valkey would not have them." Dossier B32 and B34 support only: Redis 8 folded these modules into core, and Valkey forked at 7.2.4, so what Redis added after is "not a Valkey feature". No source checks whether Valkey offers JSON, search or probabilistic types as separate modules, which I believe it does through add-on module projects; the dossier did not look.
- Why it matters. This is the one place where Valkey is described as unable, on a claim nobody checked, and the module promises fairness. Learners are told to read the project's own page; the course should not skip that for Valkey.
- Required fix. Replace with "Redis 8 ships these types in core (B32). Valkey forked before them (B34). Check whether the Valkey modules you need exist; this course did not." Change "lacks them" and "would not have them" to "does not ship them in its core".

**B-5. The provided case in 9.7 contradicts itself, and the mentor key relies on the contradiction.**
- Files: `09-the-ai-toolbelt/09.07-practice-a-demo-kit.md` (section "The provided case", openquestion modelAnswer); repeated in `09.09-checklist.md`.
- Observation. The case says "There is no server. Each phone opens the page and runs its own countdown, and the group starts the round together by writing 'go' in the chat." Critique point four reads "Replace the page with a server so that all phones share one timer. The group uses one phone on the table." The mentor key says "point 4 reject, the group uses one phone and a server adds work". The gate repeats "Rounds has no server: each phone runs its own countdown". If every phone runs its own timer, the group uses several phones, and drift between them is a real reason to accept the point.
- Why it matters. Two mentors cannot grade "reject" consistently when the stated fact is false inside the case.
- Required fix. Make the case consistent (one phone on the table, or several phones and a stated reason a server is still not worth it) and re-word point four and the key to use that one fact.

**B-6. A quiz key asserts a fact the stem does not give.**
- File: `11-where-humans-still-win/11.03-ownership-trust-accountability.md`, Quick check question 2 (Bayan).
- Observation. The stem says a price rule showed a price 10 percent too low to 62 customers "and she fixed and tested it the same day". The key is "On Monday 62 customers saw a price too low. I shipped the rule untested. It is fixed." Nothing says the original rule was untested.
- Why it matters. The graded answer makes the learner confess to a failing the stem does not state, and it teaches that a first line should include blame the writer cannot know.
- Required fix. Add "she shipped it without testing it where it runs" to the stem, or change the key's second sentence to a stated fact such as "I have fixed and tested it."

**B-7. Quiz keys can be guessed from form, without reading the case.**
- Files: all 89 quiz fences (counts by script). Worst examples: `06.07-quiz.md` question 3; `01.03-what-the-data-shows.md` Quick check question 1; `08.06-quiz.md` question 3; `11.05-quiz.md` and its summary.
- Observation. Option length and position are well controlled (key longest in 20 of 89, shortest in 19, none more than 10 percent longer than the longest wrong option, positions 20, 24, 22, 23). The problem is form. In 21 of 89 items exactly one option has no "because", "since" or "so" clause, and in 19 of those 21 that option is the key. Across the set 64 percent of wrong options carry a reason clause (172 of 267) against 25 percent of keys (22 of 89). Absolute words (never, always, every, any, all, only, nothing, certain, proves) appear in 33 percent of wrong options (87 of 267) and 12 percent of keys (11 of 89). Words about checking, reading or testing a page appear in 38 percent of keys (34 of 89) and 15 percent of wrong options; where exactly one option has such a word, it is the key in 19 of 33. Specific cases: in 6.07 question 3 the key is "Keep Prometheus: memory is no pain, and the saving is an untested claim" while the others read "Switch now, because a saving of 7 times is certain whenever a vendor publishes it", "Ignore it, because every number that a vendor publishes about its own product is false" and "Move to Thanos, because one server that holds 40 services needs a global view". In 8.06 question 3 two options begin "The community project," and one of them is the key. The 11.05 summary says "one needs two habits at once", which points at the only compound option ("Get the key replaced and check the summary against the log, as both failed").
- Why it matters. This is "The guesser" in the red-team list. A learner who has seen two quizzes can pass the rest by form. It also makes the quiz test the paragraph above rather than reasoning on a new case.
- Required fix. Rewrite wrong options in the same grammatical shape as the key (all with a reason clause, or none), and make each wrong option fail because of a different stated fact. Remove strawman absolutes ("every number ... is false", "certain whenever"). Make the correct choice "use the AI answer as a draft" or "no check needed" in several items so "check the page" is not always right. Take "one needs two habits at once" out of the 11.05 summary. Re-run the cue counts after the rewrite.

**B-8. Confident claims about employers, reviewers and the learner's standing that the dossier does not carry, aimed at anxious readers.**
- Files: `01-ai-as-an-enabler/01.01-set-the-scene.md`; `01.08-plenty-of-ai-few-strong-projects.md`; `01.07-fewer-people-more-work.md`; `11.08-checklist.md`.
- Observation. 1.1: "Refusing the tool does not protect her career. It makes her slower than people who use the tool well". 1.1: "A reviewer who sees ten quick stores in one week will remember the one fellow who could explain why each part works the way it does." 1.8: "Reviewers differ, but most of them check the same few things" and "So reviewers, interviewers and clients look for what is still hard". 1.7 summary: "why this is easier for you to build now than ever", the heading "Why this is easier for you than ever", and "It suggests that a fellow who builds these habits now is not behind most workers." 11.8 toolkit row: "Be the one a smaller team keeps". The dossier says speed gains depend on the task and the 19 percent result is out of date (A38, A39), so "slower" is not supported either way; it holds no data on how reviewers choose (U11, U13 and B78 are weak); and part A says never "you will be fine" and not to tie the top group to speed or seniority.
- Why it matters. These are claims about how other people judge the reader, stated as fact. The 11.8 line also frames the course as a contest for seats, which the module takes care to avoid elsewhere ("not a hiring rule").
- Required fix. Replace "makes her slower" with the dossier's task-dependent wording. Mark the reviewer paragraphs as "in this example" or "the course's view", delete "most of them" and "will remember", and cite B78 with its limits if kept. Drop "than ever" and the "not behind most workers" sentence (Pew counts AI use at work, not these habits). Change the toolkit row to "Habits teams value: give context, check, own the result, work well with others (US employers, A33)".

### S3

**B-9. In the predicts, the correct label is the shorter one in nearly every case, and the wrong label often carries an absolute.**
- Files: the 28 `predict` fences (script). Examples: `09.06-let-ai-critique-your-work.md` ("Run one test with that date" against "Change the code now, the assistant is probably right"); `06.03-the-fastest-database-depends.md` ("To DuckDB" against "It stays on SQLite, as the simplest"); `06.02-why-you-get-the-common-answer.md` ("Redis still leads every time"); `09.05-clis-and-connectors.md` ("Yes, the tool obeys any text it reads").
- Observation. The correct label is strictly shorter in 24 of 28, equal in 3, longer in 1 (10.3). The pack rule "the correct label is not longer than the other" produced a shortest-wins pattern. Wrong labels include "every time", "at every setting", "any text", "GitHub only shows real work". Some prompts hand over the answer: 1.7 says Rawan "cares most about checking the result, owning it and giving the AI context", then asks who comes out ahead.
- Fix. Write both labels at equal length and hedging, keep absolutes out of the wrong one, and keep the prompt from stating the weights or the reason.

**B-10. Template repetition across chapters.**
- Files: all Build and Gate chapters, and the Learn chapter openings.
- Observation. The sentence frame "After you submit, the mentor replies with one or two short questions. For example: ... A good reply points to something you can show" (or "A reply with evidence points at something real") appears in 10 chapters (1.10, 5.4, 5.6, 6.6, 6.8, 8.7, 9.7, 9.9, 10.7, 10.9). Seven gates repeat the same arc: "Here is what a strong answer looks like, told about a fictional fellow", a worked case, "Look at the shape of ...", "A weak answer looks different". "The common mistake is" opens a sentence 33 times. "What to notice" plus "The takeaway" is a fixed pair in 5 chapters. The word "check" appears about 700 times and "a reader can check" about 20. At least 17 chapters carry a "(a fictional case)" style tag in the first lines. 43 of 89 quiz stems use "Name ... 1) ... 2) ... Which conclusion do the facts support?".
- Why it matters. It reads as one voice on repeat. Second-language readers get no variation, and it matches the authoring standard's "voice sounds like a template".
- Fix. Keep the structure the pack requires but vary the wording per module, give each gate a different closing sentence, drop "(a fictional case)" from openings (the Sources fold says it), and cap the stem template at about a third of the items.

**B-11. Idioms and phrasal verbs a second-language reader will stumble on.**
- Quotes: "comes out ahead" (1.7 predict, 1.8 beat text, 7.4 predict and beat text), "stay in charge of it" (1.1 BigWordAlert), "How smooth text slips past you" (1.2 diagram title), "Some also pulled back" and "After a backlash" (1.7), "rules this out" (many explanations), "The habit pays you back anyway" (10.6), "with AI in the loop" (8.7), "a second opinion that wants to please you" (9.6).
- Fix. Replace with "wins", "keep control", "is not noticed", "some reduced the plan", "excludes", "helps you later", "when AI is part of the work", "an opinion that tries to agree with you".

**B-12. Names reused in several roles inside one module, near-identical names, and one muddled opening.**
- Files: module 6 (Ayman is Munir's colleague in 6.1, a class-project student in 6.2, the cousin of a print-shop owner in 6.3 and a library volunteer in 6.6; Rahaf is the attendance-app builder in 6.2 and the hosted-cache employee in 6.7 question 1, which is Munir's role; Munir is a booking-service developer in 6.7 question 4); module 8 (Hanan has five different jobs across 8.2, 8.3, 8.4, 8.6 and 8.7; Osama, Yazan and Faisal three to five each; Ruwa is a fellow in 8.4 and the reviewer in 8.5); module 11 (Rima is the clinic manager in 11.1 and 11.3 and a developer in 11.4 question 2; Sami and Bayan change roles); module 1 (Khaled in 1.1 and Khalil in 1.7, 1.9 and 1.10).
- Observation on 6.1: the opening says "each asked an AI assistant", then the fold says "A colleague named Ayman asked the same assistant the same question", so the reader cannot tell whether Munir or Ayman checked the licence.
- Fix. Give each person one role per module, rename Khalil, and rewrite the 6.1 fold so the person who asks is the person who checks.

**B-13. A 2025 study is stated as current in two places.**
- Files: `08.02-learn-adopt-research-fast.md` fold "Go deeper: where AI helps in each step" ("In one careful study, experienced developers felt faster with AI but were slower. Later tools may be better."); `11.06-capstone-your-project-start.md`, worked example part 1 (same sentence).
- Observation. Chapter 1.3 correctly says the 19 percent result is from 16 people in early 2025 and METR calls it out of date. These two give no sample, no date, no out-of-date label, and cite only v1 ids. Part A says never "Experienced developers are 19% slower with AI".
- Fix. Use the 1.3 wording: "In a 2025 trial of 16 developers ... METR now calls it out of date" or drop the sentence and keep the advice to measure your own hours.

**B-14. Citation hygiene.**
- 9.3 Sources fold cites "(C14 to C18 note)" for the 15-minute-lesson method. In dossier C, C14 and C15 are Manim and OBS; the listening and study-mode ids are C17 to C21. The writer pack carries the same wrong range.
- 10.3 states "Medical journal editors say that an AI tool cannot be listed as an author." and "Hashnode and LinkedIn put the responsibility on you ... and we found no label rule." Neither is in dossier parts A, B or C, and 10.3 has no Sources fold. 10.1 cites a 2013 study on GitHub as a hiring signal with no id (8.3 gives v1 S105).
- Fix. Correct the range to C17 to C21, add a Sources fold to 10.3 with ids (or remove the two statements), and add the v1 id in 10.1.

**B-15. A predict whose two labels differ by one ambiguous word.**
- File: `05.02-research-before-you-ask.md`, predict before "Give the assistant your facts". Labels: "Fits her better, old rule may stay" (key) and "Fits her better, old rule is fixed".
- Observation. "Is fixed" can mean "has been corrected" or "stays unchanged". A second-language reader can read the wrong label as the right idea.
- Fix. Use "old rule has been corrected" against "old rule may still be inside".

**B-16. Route 2 of gate 5.6 asks for "four problems" but the record has about seven.**
- File: `05.06-checklist.md`, "The provided record" and the mentor key.
- Observation. Problem 3 in the key bundles agreement taken as proof, pages without dates, no claim table and the missing withdrawal fee; problem 4 bundles an empty left-out part and a missing condition. The rubric says "All four problems found".
- Fix. List the four problems exactly (as 10.9 does), or change the rubric to "at least four of the seven".

**B-17. Two keys rest on the course's own judgement rather than on stated facts.**
- 11.3 Quick check question 1 (Ehab's reply): the key "Own it, replace the claim today, and say what he will check next" beats a full refund, but the explanation says a refund "answers a different problem". A refund can be a fair answer.
- 9.6 Quick check question 1 (Ghada's "slow" page): the key is "Reject it, with the reason that it loads fast" against "Test it first". The page loaded in 1 second "on her phone"; the course's audience is on weak data, so a test on a slow connection is also defensible.
- Fix. Add a stated fact that rules out the other option (for example "the client did not ask for a refund"; "she tested on weak data and it still loaded in 2 seconds"), or move these to open questions.

**B-18. Two pickers omit a factor that the quizzes and the dossier treat as decisive.**
- `metrics-store-context`: rule 1 sends any "Several" servers to "Thanos/Mimir" and the diagram in 6.4 lists VictoriaMetrics among the options past one node; dossier B25 describes a VictoriaMetrics cluster with replication. Rule 2 sends "Downsampling" to "VM Enterprise" with no mention that other tools also offer it. "Several servers" is also treated as "needs a global view".
- `fastest-database-depends`: "Big totals" has no size factor, so "totals on a server" always returns ClickHouse, while chapter 6.6's provided case (4.7 million rows) and 6.7 question 2 (30 tickets a day) teach that scale decides.
- Fix. Add "need one view across servers" and a rows-per-day factor, and say in the reason text that other tools also cover multi-node and downsampling.

**B-19. Diagrams that restate the text beneath them, and two that misuse arrows.**
- 11.2, "Share who do not plan to hand each task to AI": five percentages drawn as a flowchart with arrows A to B to C, which reads as a sequence. 5.2 "Yara's five lines of context" restates the sentence under it. 6.5 "The price of the outbox" repeats the sentence beneath it and the fold table. 9.3 "The check, in three boxes" and 9.6 "A critique log in three lines" restate their paragraphs.
- Fix. Show the 11.2 figures as a ranked list or bar, and cut or re-purpose the others so each diagram argues something the words do not.

**B-20. Mentor keys sit in the learner-facing chapter files.**
- Observation. Every openquestion `modelAnswer` begins "Mentor key for ..." and lists, for the provided cases, the full set of problems (for example 11.6 lists (a) to (h)). If the reader renders `modelAnswer` after submission, a learner can read the key and copy it, and the provided-case passes become copy-and-paste.
- Fix. Confirm in the importer that `modelAnswer` is mentor-only for gates and practice chapters. If it is shown, split the mentor key from the model answer for a different case.

**B-21. The AI interview step asks for a personal key and says nothing about cost, source or availability.**
- File: `11.07-defend-your-work.md`, "Before you start". "The interviewer needs a key that you add yourself in the block. ... The block tells you where to add it."
- Why it matters. An API key usually bills by use. The chapter does not say who issues it, whether it can cost money, or whether it opens from Gaza. It does say the written defence "completes the same step", which is good.
- Fix. Add one sentence: the key is optional, may cost money, set a spending limit or skip it, and no part of the pass depends on it.

**B-22. A phone feature the dossier says to leave out is used as a fact in a key.**
- File: `09.02-visuals-and-demos.md`, Quick check question 1. Explanation: "A phone recorder is free and works on a phone alone." Dossier C U9: "A phone's built-in screen recorder works on any fellow's phone ... Not researched. Leave out numbers; teach 'check the size first'."
- Fix. Say "most phones have a screen recorder; check yours" and keep the paper-sketch fallback in the key.

**B-23. "Both reports are true" overstates what the dossier says about Devin.**
- File: `01.02-why-ai-looks-bigger.md`, first beat. "Both reports are true. They answer different questions." Dossier A12 and A13: the launch number is a vendor claim not independently verified, and the Answer.AI trial is "not a controlled study".
- Fix. "Both are reports of what someone saw on their own test. They answer different questions."

**B-24. Qasir's click numbers disagree between chapters.**
- 6.6 provided case: "about 90,000 clicks a week". 11.6 Yara's decision context: "the few hundred clicks a day from chapter 7.4". 7.4 says "a busy link gets a few hundred clicks a day". The 11.6 use treats a per-link figure as the whole load. 90,000 a week is about 12,900 a day.
- Fix. Use one set of numbers, or say "a busy link" in 11.6.

**B-25. 9.5 packs too many tools into one 25-minute chapter.**
- File: `09.05-clis-and-connectors.md`: five gh commands, fine-grained tokens, GH_TOKEN, MCP, read-only and lockdown modes, prompt injection, AWS Cost Explorer, AWS Budgets and plans, Google Cloud and Azure trials, GitGuardian numbers, secrets. The folds are rich but this is the densest chapter in the set.
- Fix. Move the cloud cost beat to a short optional chapter or to a fold with a "skip if you have no account" label.

### S4

**B-26.** Module 10 asks fellows to publish on LinkedIn, DEV, Medium and Hashnode with no line on each platform's minimum age or availability, while modules 5 and 9 give both. The private-draft route is stated, which helps. Add one sentence.

**B-27.** `11.03-ownership-trust-accountability.md` fold: "Most involve people without lawyers (1,275), and 879 involve lawyers" sums to 2,154, not 2,217. Dossier A57 says the party counts use a filter and may not equal the total; the chapter drops that caveat.

**B-28.** Perplexity is named in 5.3 and 5.4 with no support in the v2 dossier (age, access from Gaza, free use). The text does say "Check that each one opens for you".

**B-29.** 1.3 diagram: "18% say AI will likely end their job within 5 years". A5 says "very or somewhat likely ... because of AI or automation". Add "or automation" and "likely or somewhat likely".

**B-30.** 6.5 Sources: "the system design course's canvas for chapter 14.4". Dossier B63 names the file, not a chapter. Verify the number.

**B-31.** The Sources folds in 5.2 and 5.3 are single semicolon chains of 77 to 84 words. Fine for reviewers; break them up if learners see them.

**B-32.** 1.9 question 5 reuses the disputed Builder.ai figures (700, about 15, hundreds of contractors, last CEO denies) under "Company Q". Part A says not to use the 700 number. It is framed as disputed, but a real story with its numbers in a fictional wrapper may be read as the real one. Change the numbers.

**B-33.** 6.2 beat heading "Popular choices win, even when others fit" is stronger than the study (up to 45 percent of unneeded cases; "often"). The body is careful. Change the heading to "Popular choices are picked often".

## What works

- The disputed stories are told in the dossier's neutral dated wording and marked as disputed: Builder.ai, Just Walk Out, the 95 percent headline, Devin (1.2).
- Real harm is stated plainly and not softened: "This is the strongest evidence of harm to people like you, so it is stated without softening" (1.3), with US-data labels, the Stanford limits, and "This course found no data on the labour market in Gaza".
- Vendor numbers are labelled everywhere I checked (VictoriaMetrics, Valkey, Redis, Momento, AWS price, Veracode, Anthropic, GitGuardian), and 6.4 says "None of these claims is independent".
- The Redis licence table matches B29 to B31 exactly. The TSDB and database sections state when each option wins and name the limits (ClickBench, SQLite WAL, LSM trade, Prometheus single node).
- Gaza handling is honest. 8.4 and 8.6 say the payment path is unconfirmed, list the embargo rule, tell the learner to ask the program in writing, and add a quiz item for it.
- Safety habits are right in 9.5: least access, expiry, revoke first, read-only, do not run the cost command on a live account without accepting the cent a request, and a sample report as the default.
- Own-voice default, the "no fake activity" rule, and 10.6's "we also found no source on whether employers can detect a faked history, so we do not claim that they can".
- Every figure I recomputed is right: Rawan's totals 48, 38, 32; Omar leads in 3 of 243 settings, ties in 4, and Mazen never leads (brute force); 7.4's "exactly one of 81 settings" for the cache counter; Yara's 192, 115 and 77 hours; the 11.4 count of 16 contexts (4, 6, 3, 3); the 10.6 line totals (410 plus 38 equals 448); Aya's break-even at 100 dollars; 9.8's 240 minus 170.
- Option length and position are controlled, and every quiz uses all four positions.
- Provided cases let a phone-only learner finish every module. The AI interview has a written route that completes the same step.
- No promise about any one person's future appears in a chapter that is not caught by B-8, and most chapters say so in words.

## Recommendation

Revise. One S1 blocks the gate (B-1, the voice rule), and seven S2 defects need fixes before publish: three engineering statements (B-2, B-3, B-4), two keys with a factual flaw (B-5, B-6), the guessable quiz form (B-7), and the unsupported claims aimed at anxious readers (B-8). Fix B-1 and B-8 in the chapter text and canvases, rewrite the quiz options for B-7 across the seven Check chapters and the in-chapter quick checks, then re-run the cue counts. Round 2 should re-review only the changed items plus 6.3, 6.4, 6.5, 9.4 and 9.7. Scores that would rise after these fixes: dimensions 7, 11, 13 and 17 to 4, and 22 to 4 once the diagrams are cut or recast. I did not rewrite any chapter or canvas.
