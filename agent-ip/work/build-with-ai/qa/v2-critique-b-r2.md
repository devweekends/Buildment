---
artifact: critique
course: build-with-ai (v2)
round: 2
critic: B (slop and red-team lens)
scorecard_average: 4.05
s1: 0
s2: 0
s3: 5
s4: 4
round1_status: fixed 29, partly 3, open 1
---

# Critique B, round 2: build-with-ai v2

Method. Blind re-review of `critic-r2/chapters.md` and `canvases.md` against my round 1 report. I re-read every changed passage, re-ran the quiz and predict scripts on the new files, and checked 6.3, 6.4, 6.5, 9.4 and 9.7 for new defects. Zero em or en dashes in the chapters or canvases. Scoring excludes dimensions 16 (n/a, no variants) and 19 (cannot be scored, G2B pending).

## Scorecard

| # | Dimension | R1 | R2 | Note |
|---|---|---|---|---|
| 1 | Outcome alignment | 4 | 4 | The "group that does more with AI" claims are now sourced and hedged (B-8). |
| 2 | Domain specificity | 5 | 5 | Unchanged. |
| 3 | Depth over coverage | 4 | 4 | The cloud material in 9.5 is now an optional fold. |
| 4 | Prose quality | 4 | 4 | Repeated frames mostly gone (B-10). "check" still appears about 700 times. |
| 5 | Chapter structure | 4 | 4 | Unchanged. |
| 6 | Interaction purpose | 4 | 4 | Predicts no longer hand over the answer by label length (B-9). |
| 7 | Assessment quality | 3 | 4 | Form cues removed (counts below). One new loose item in 6.4 (N-1). |
| 8 | Difficulty calibration | 4 | 4 | Unchanged. |
| 9 | Cognitive load | 4 | 4 | 9.5 lighter. |
| 10 | Prerequisite integrity | 4 | 4 | Unchanged. |
| 11 | Technical accuracy | 3 | 4 | SQLite, idempotent consumer, Valkey and picker defects fixed. |
| 12 | Production-grade coverage | 4 | 4 | Unchanged. |
| 13 | Security and integrity | 3 | 4 | One voice rule everywhere. Key exposure (B-20) still to confirm. |
| 14 | Accessibility | 4 | 4 | Unchanged. |
| 15 | IP protection | 4 | 4 | Held at 4 pending the B-20 check. |
| 16 | Variant distinctiveness | n/a | n/a | No variants. |
| 17 | Continuity | 3 | 4 | Cases, ids and numbers fixed. Khaled/Khalil and Hanan remain (B-12). |
| 18 | Learner agency and curiosity | 4 | 4 | Unchanged. |
| 19 | Instructor alignment | n/a | n/a | G2B pending. |
| 20 | Interactive canvas quality | 4 | 4 | Cache, voice, metrics and database pickers repaired. |
| 21 | Explanatory depth | 4 | 4 | 6.5 now explains why check, act, record fails. |
| 22 | Visual explanation quality | 3 | 4 | Two bad diagrams replaced. Three list-style diagrams remain (B-19). |

Average of the 20 scored dimensions: 4.05, below the 4.3 threshold. No dimension is below 4. No S1 or S2 remains.

## Round 1 defects: status

| Id | Sev | Status | Evidence |
|---|---|---|---|
| B-1 | S1 | fixed | 9.4 fold now reads "So the course never asks you to clone a classmate, a teacher, a client or a speaker in a public video." The canvas bucket "Fine, labelled / Record instead / Never" has no consent route and comments say "One rule everywhere: own voice only". The Wisam quiz key is "Ask the owner to record the script, and tell him where it runs", matching 9.8 and the 9.9 checklist. The 9.4 predict now has "Ask the classmate to record the script herself" as the key. |
| B-2 | S2 | fixed | The 6.3 stem now says "two separate machines that reach the data over the network"; the explanation cites SQLite's guidance and that WAL needs every program on one machine (B52, B53). |
| B-3 | S2 | fixed | New diagram "Two safe paths and one trap"; the text says "Check, act, then record leaves the same crash gap". The fold explains it step by step. The key is "Save the id with the charge in one transaction, or hand the provider the id to drop repeats". It adds "this course did not check any provider". |
| B-4 | S2 | fixed | Canvas reasons now read "Redis 8 has these types in core; Valkey forked before them ... check for a Valkey module". "Only Redis has these types" is gone, and the chapter says "this course did not check". |
| B-5 | S2 | fixed | The case now says "The page runs on one phone, which the group puts on the table"; the mentor keys and the 9.9 kit use the same fact. |
| B-6 | S2 | fixed | The stem now says "She had not tested the rule where it runs", so the key's "I shipped the rule untested" follows from it. The name is now Manar. |
| B-7 | S2 | fixed | Script on 89 items: correct option has a reason clause in 2 of 89, wrong options in 11 of 267 (was 22 of 89 and 172 of 267). The unique-no-reason cue is gone (1 item). Absolutes in keys 1, in wrong options 13 (was 11 and 87). Check-words: unique option is the key in 8 of 23 (was 19 of 33). Stem word-overlap picks the key 14 of 57, which is chance. Length still controlled (key longest 18, shortest 15, none over 10 percent). 11.05 summary no longer says "two habits at once"; the 8.6 pair is reworded. Residual: see N-2. |
| B-8 | S2 | fixed | 1.1: "Studies find that on tasks that suit AI, people often finish more and faster with it, though the result depends on the task". "In this example, a reviewer ... may remember". 1.8: "In this course's view, reviewers check a few things in common". The 1.7 section is "Why it is easier to start now"; the "not behind most workers" sentence and "Be the one a smaller team keeps" are gone (toolkit row: "Habits teams value"). |
| B-9 | S3 | fixed | Predicts: correct label shorter in 18 of 28, equal in 4, longer in 6 (was 24, 3, 1). Absolutes in wrong labels: 2 (was about 5). |
| B-10 | S3 | partly | "A good reply points to" 10 to 2; "The common mistake is" 33 to 0; "Look at the shape of" 4 to 0; "(a fictional case)" opening tag 17 chapters to 2; numbered-fact stems 43 to 16 of 89. "check" is still about 699 occurrences. |
| B-11 | S3 | fixed | "stay in charge", "slips past", "pulled back", "backlash", "rules this out", "pays you back", "in the loop", "wants to please" are all gone. Three "comes out ahead" remain (N-2). |
| B-12 | S3 | partly | Fixed: Ayman is one person in module 6 and 6.1 no longer has the second asker; Rahaf and Munir roles are right in 6.7; Ruwa is one person in 8.3 to 8.7; Rima and Sami roles are consistent. Open: Khaled (1.1) and Khalil (1.7, 1.9, 1.10) are still near-identical names in one module; Hanan still has four unrelated roles in 8.2, 8.3, 8.4 and 8.6. |
| B-13 | S3 | fixed | 8.2 and 11.6 now read "In a 2025 trial with 16 experienced developers, they felt faster with AI but took longer. Its authors now call the result out of date [A38, A39]". |
| B-14 | S3 | fixed | 9.3 cites "C17 to C21". 10.3 has a Sources fold (S106, S107, S58 and C71, S59 and C72, S60, S61 and C63). 10.1 names S105 with its limits. |
| B-15 | S3 | fixed | Labels are now "Fits her; old rule may still be inside" and "Fits her; old rule is likely corrected". |
| B-16 | S3 | fixed | The key now says "seven problems; at least four must be found" and the rubric reads "At least four of the seven problems found". |
| B-17 | S3 | fixed | The Ehab reply item became Sami's report with the manager's question in the stem. The Ghada item says "She tested the page on a weak mobile connection, and it loaded in 2 seconds", which settles test against reject. |
| B-18 | S3 | fixed | Metrics picker has "One view across" and a VM cluster option; rule reasons say "Other tools also offer downsampling". The database picker has a "Data size" factor and small-table rules; the 6.3 predict and table were updated to match. |
| B-19 | S3 | partly | The 11.2 chain became a canvas ("who-leads-this-call-survey") and the 6.5 cost diagram now compares direct publish with the outbox. Still list-style: 5.2 "Yara's five lines of context", 9.3 "The check, in three boxes", 9.6 "A critique log in three lines". |
| B-20 | S3 | open | 14 openquestion fields still begin "Mentor key for ..." in the learner-facing files, and the importer behaviour is not confirmed in anything I can see. Needs a one-line confirmation that `modelAnswer` is mentor-only. |
| B-21 | S3 | fixed | 11.7: "The interview is optional, and no part of the pass depends on it ... The block uses OpenRouter ... Using a key can cost money, so set a spending limit on it or skip the interview." |
| B-22 | S3 | fixed | Explanation now reads "Most phones have a screen recorder, so check yours. If yours has none, use labelled screenshots ...". |
| B-23 | S3 | fixed | "Both are reports of what someone saw on their own test". |
| B-24 | S3 | fixed | 11.6: "a busy link gets a few hundred clicks a day (chapter 7.4) while across all links Qasir records about 90,000 a week". |
| B-25 | S3 | fixed | Cloud material is in a fold titled "Optional: only if you have a cloud account", with the note that it can be skipped. |
| B-26 | S4 | fixed | 10.7 now has the minimum-age paragraph with the private-draft route. (LinkedIn 16 is in C63; see N-2 for Hashnode.) |
| B-27 | S4 | fixed | "The party counts use a filter, so they need not add up to the total." |
| B-28 | S4 | fixed | Perplexity no longer appears. |
| B-29 | S4 | fixed | Diagram label now "18% say AI or automation will likely end their job within 5 years (very or somewhat likely)". |
| B-30 | S4 | fixed | 6.5 Sources now attributes "chapter 14.4 of that course, whose number was checked in its course fold". I cannot check the other course. |
| B-31 | S4 | fixed | 5.2 and 5.3 Sources folds are now short lists. |
| B-32 | S4 | fixed | "Company Q" now uses 900 and 30 and says "Company Q is fictional, and so are the reports". |
| B-33 | S4 | fixed | Heading now "Popular choices are picked often". |

Totals: fixed 29, partly 3 (B-10, B-12, B-19), open 1 (B-20).

## New defects introduced by the revision

### S1
None.

### S2
None.

### S3

**N-1. 6.4 quick check, question 2 (the study group's cache) is loose.**
- File: `06-context-changes-the-answer/06.04-two-defaults-worth-questioning.md`.
- Observation. The key is "Use the answer for the working choice and pick the tool it knows". The stem never says which tool the group knows, so "Switch to Valkey", "Choose Redis" and "Pick Redis 8" are all defensible picks for an "either" case. The explanation for the key also says "No further check is needed", while the module's habit is to read the licence page and date it (it then adds "noting which version they install and the date they read its licence page"). The wording "the tool it knows" is garbled.
- Why it matters. A key that rests on an unstated fact is the same flaw as B-6, and the item now mostly rewards the one non-committal option.
- Fix. Add a stated fact ("the group already uses Redis at school"), make the key "Keep Redis; nothing here calls for a switch", and cut "No further check is needed".

### S4

**N-2.** Residual and small. (a) Option punctuation: where exactly one option has a comma, semicolon or colon, it is the key in 18 of 27 items (chance would be about 7). (b) "comes out ahead" remains three times (1.8, 7.4). (c) "check" saturation, about 700. (d) 10.7 gives "GitHub and Hashnode ask for 13 or over"; GitHub is C73, Hashnode's age is not in dossiers A to C.

**N-3.** 9.7 case, critique point four still includes the sentence "The group uses one phone on the table" inside the assistant's quoted point, so the assistant undercuts its own advice. Either move that fact to the case description or drop it.

**N-4.** 6.3 question 1 now states "two separate machines that reach the data over the network" and the first option repeats "over the network", so the item has become easy. Keep the fix; lower the giveaway by dropping the repeated phrase from the option.

## What works now

- One voice rule everywhere (chapter, canvas, quiz, gate), and the 9.4 predict is the right shape: the course never asks you to clone anyone else.
- The idempotent-consumer fix is correct and honest about its limits ("this course did not check any provider").
- The quiz rewrite removed the reason-clause giveaway cleanly without breaking length or position control: positions are unchanged and well spread, and no key is more than 10 percent longer than the longest wrong option.
- The pickers now carry the factors the quizzes rely on (data size, one view across servers), and their reasons say what the course did not compare.
- The anxious-reader language is now sourced or marked as the course's view, and the 1.7 reassurance is gone.
- Citation fixes landed, including a real Sources fold for 10.3.

## Recommendation

Revise lightly, then approve. There is no S1 or S2. The average is 4.05 against the 4.3 threshold, held down by one open item and a handful of S3 and S4 items. To pass: confirm B-20 (mentor keys hidden), fix N-1, rename Khalil or Khaled and give Hanan one role, recast the three list diagrams (B-19), and vary the "check" vocabulary in a few chapters. With those done I would score 7, 17 and 22 at 5 only if the importer check is clean; otherwise the average stays near 4.1. This is the second round, so any item left open goes to a human.
