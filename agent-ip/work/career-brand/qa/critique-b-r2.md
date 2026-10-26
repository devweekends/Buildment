---
artifact: critique
course: career-brand
artifact_under_review: courses/career-brand (65 chapters, course.yaml) and packages/learning-ui/src/canvas/career-m*/data.ts (126 canvases)
reviewer: critic-b (blind)
review_type: slop | continuity (with accuracy against the dossier, tone and care, honesty, internal production words)
version: 2
---

# Critique B, round 2: career-brand, revised draft

Reviewed blind. I re-read my round 1 report, then all 65 revised chapters in full and every learner-facing string in the 126 canvas `data.ts` files (extracted by script, code comments excluded). I checked facts against `research.md` and `research-platforms.md`. I did not open `context-packs/`, `module-briefs/`, `interaction-map.yaml`, `canvas-specs/`, `assessment-plan.md`, `run-log.md`, `decision-log.md` or `qa/revision-1-brief.md`. Paths below are relative to `<repo>` = `D:/Projects - Community/buildment-brand`. Chapter paths are shortened to the chapter file name (for example `03.05`) and live under `courses/career-brand/<module folder>/`.

## Checks run

- Course audit: `node agent-ip/scripts/audit-course.mjs courses/career-brand` reports 65 chapters, 77,064 prose words, "Needs work: 0".
- Characters: every character in the 65 chapters, 126 canvas files and `course.yaml` is ASCII (script, line by line). No U+2013 or U+2014. No AI or tool attribution (the only hit for "Anthropic" is the named research team in `04.02`, which the dossier credits).
- `course.yaml`: all 65 lesson files exist and every lesson title matches the chapter front matter.
- Sentence length (prose only, code, tables, quotes in blocks and props removed): 4,355 sentences, mean 12.8 words, 174 over 25 words (4.0 percent, round 1 said 4.1). Not improved.
- Quizzes and predictions: 73 quiz blocks and 37 predict blocks by `grep`. My parser read 60 quizzes (the rest use a layout it skipped) and 32 predicts: correct position 15/14/16/15; every predict has exactly two options; in 7 of 60 quizzes the correct option is the only one with a digit or a bracket (round 1: 9 of 73, so unchanged). Option lengths in the "find the complete one" items were equalised on purpose.
- Dossier trace: platform numbers (3 or 5 notes, 100 test users and 7 days, 13 months, 22 percent, 50 percent, 4,600 people, 482 people, 4,226 sections, 6.9 million sessions, 52 engineers, 344 invitees) all match a dossier row. The unverified table (six seconds, 75 percent, 2.9 times, 18 percent, 23.8 million, Fortune 500, speed multiples) is not asserted as fact anywhere, except the quiz item noted at B9.
- Arithmetic rechecked: 186 - 7 = 179; 540 / 179 = 3.0; 412 - 57 = 355; (820 - 95) / 820 = 0.884; 5 h to 1.5 h = 70 percent and 3.3 times; 30 of 210 = one seventh; 99.9 percent of 43,200 = 43.2 minutes; 38 to 12 and 50 to 20 minutes; 18 + 7 + 14 = 39; 16 + 4 = 20 of 24; 23 + 10 = 33; 15 + 20 + 25 + 15 + 15 = 90; 9 to 1 sessions; 90 to 18 over three months = 30 to 6 a month. All correct.
- Cross-references: every "chapter N.M" and "gate N.M" resolves. Course 13 ("Learn and Build with AI") and course 7 ("Professional & Business Communication") exist in `courses/`. "The Founder Interview" does not (see B3).
- Total of `estimatedMinutes`: 1,810 minutes (30.2 hours), matches `estimatedHours: 30`.
- Not run: canvas text QA (needs a running app), canvas unit tests, a browser pass for accessibility, and any check that `modelAnswer` fields are mentor-only in the product. Dimension 20 is therefore still provisional.

## Scorecard

| Dimension | Score | Note |
|---|---|---|
| 1 Outcome alignment | 4 | Nine outcomes map to nine modules and gates. Gate 6.8 and 9.6 close the baseline loop opened in 1.6. The rubrics now agree (B4 fixed). |
| 2 Domain specificity | 5 | Named fictional fellows, sourced numbers and windows in every chapter. One thread still carries most of it (B15 open). |
| 3 Depth over coverage | 4 | Eight kit parts taught with method. Modules 3.4 and 3.5 reach past the dossier's scope (B46). |
| 4 Prose quality | 4 | Production words ("beat", "canvas") are gone, jargon is glossed, boilerplate is down. Template voice remains (B52) and one production phrase remains (B47). Was 3. |
| 5 Chapter structure | 4 | Scene, concept beats, check, build, gate on every module. |
| 6 Interaction purpose | 4 | Canvases sort, drag and step; each carries one claim. Predicts are all binary (B24). |
| 7 Assessment quality | 4 | Positions balanced, lengths equalised, rubrics specific, 9.5 rewritten. Number cues, binary predicts and count-the-parts items remain (B24, B51). |
| 8 Difficulty calibration | 4 | Support fades from Areej's cards to the learner's own. |
| 9 Cognitive load | 4 | Beats are short. Build chapters reach 3,250 words, now with longer time estimates. 3.4 and 3.5 are dense for non-backend fellows (B46). |
| 10 Prerequisite integrity | 4 | The five flags are now defined at first use (1.6) and "pillar", "seeded", "staging", "callback" are glossed. One use of "parser" precedes its gloss. |
| 11 Technical accuracy | 4 | Taxonomy, Premium and 75 percent claims fixed. One unsourced claim stated as fact (B45), one flat statement left in a quiz (B9), one cause overstated in a table (B54). |
| 12 Production-grade coverage | 4 | Adapted to the showcase bar: demo controls, secrets, permission, privacy. |
| 13 Security and integrity | 4 | Privacy line before each AI drill, written option for each, no secrets in examples, no VPN advice. Not verified that `modelAnswer` is mentor-only. |
| 14 Accessibility | 4 | Captions, no autoplay, tap-or-drag, text paths. Not tested in a browser. |
| 15 IP protection | 5 | No sponsor site named. The community cloud example is a sponsor decision (B25). |
| 16 Variant distinctiveness | 5 | Not applicable: no variants in the first cohort (scored 5 by convention, excluded from the second average). |
| 17 Continuity | 4 | The six contradictions in Areej's facts and the capstone rubric are fixed. Remaining: near-identical names (B28), unverifiable course pointers (B3), small slips (B49, B50). Was 3. |
| 18 Learner agency and curiosity | 4 | Predict, sort, choose own work or Areej's; mentor replies ask one real question. |
| 19 Instructor alignment | not scored | G2B is a decided process item (B5). |
| 20 Interactive canvas quality | 4 (provisional) | Judged from learner strings only. The one title mismatch is fixed. No canvas QA report exists, so this cannot be confirmed. |
| 21 Explanatory depth | 4 | Folds hold mechanism, worked example, limits and sources; duplicate re-explanation is down. |
| 22 Visual explanation quality | 4 | 50 diagrams, as before. About a fifth still chain a list the next paragraph repeats (B19). |

Average over the 21 scored dimensions: 4.14 (4.10 if dimension 16 is excluded as not applicable). Round 1 was 4.00 (3.95). This is still below the 4.3 bar. No dimension is at 3. There are zero S1 and one open S2 (the residual of B3), so the gate does not pass yet.

## Round 1 defects: status

Quotes are short and taken from the revised files.

| ID | Status | Evidence |
|---|---|---|
| B1 | FIXED | `02.03`: "is omission, when it is meant to mislead". `06.03`: "Leaving out the lead's part so that your own looks bigger is omission." Canvas `career-m2-found-vs-team` agrees with `03.02` ("is an omission"). |
| B2 | FIXED | `04.02`: "Week 2, Tuesday (planned)" and "Once Areej has built her stock tool, she plans to answer like this". `05.06`: "all six boxes planned and none ticked, because nothing is built yet". |
| B3 | PARTLY FIXED | Module numbers, chapter numbers and titles are gone. Still there: `02.03` and `06.08` name "course 14, "The Founder Interview""; `09.01` says "If you have not, take it next."; "The Founder Interview" appears in 12 files (15 times) and no such course exists in `courses/`. Stays S2 until the sponsor confirms it will be published. |
| B4 | FIXED | `09.01`: "The review has six parts" and "Parts 2 to 6 are at least Partly". `09.06` lists six parts with the same pass rule. |
| B5 | DECIDED | G2B pending, process item. |
| B6 | FIXED | `02.02`: "It has two proofs from two places. In Campus Board she replaced a leaked key and turned on push protection. At her internship she asked her lead...". Matches `02.05`. |
| B7 | FIXED | `02.04`: "Areej uses the notebook line once on each page... once in the About page of her website." Matches `07.05`, `08.04`, `08.06`. |
| B8 | FIXED | `01.02` heading "The six seconds comes from one company's study"; `01.06` recap "has no reliable source". |
| B9 | PARTLY FIXED | `06.02`: "One consultant who traced the figure reports that it came from a 2012 sales pitch". But `06.07` q3 explanation still says flatly "The 75 percent story traces to a sales pitch, not a study." |
| B10 | FIXED | `07.01`: "which raised the number of personalised invitations he could send (checked 2026-10; your screen may differ)". |
| B11 | FIXED | `01.06` now defines the five flags with examples; `09.02` repeats them; later gates say "the five flags from gate 1.6". |
| B12 | FIXED | `02.05` "10,000 seeded events (demo data made up on purpose)"; `02.03` "A staging database is a private copy"; `01.03` "A callback is a reply that asks for an interview"; "preprint" and "population-level" glossed in `01.04`, `06.04`. One residual: "the parser cannot read" in `06.02` body comes before the gloss in the next fold. |
| B13 | FIXED | No "beat" or "canvas" as a production word in any chapter or canvas string; now "the next picture", "the section called ...". |
| B14 | PARTLY FIXED | The AI sections are short cross-references ("The rule from chapter 2.5 applies unchanged"). Still repeated: "Every learner has at least one study or volunteer role." in `02.03`, `02.05` and canvas `career-m2-volunteer-full`; the "If you have no work yet, or no laptop" section in all eight Build chapters. |
| B15 | OPEN | "Areej" in 51 of 65 files; "4.6 s" in 28 chapters; the long index bullet in 5. Waed (module 6) is still the only non-backend worked thread. |
| B16 | PARTLY FIXED | "In this made-up case" now opens 27 quiz stems (was 42); "Areej is a fictional fellow" is down from 18 to 11 and the gate closing line is no longer one sentence repeated. The strong-answer and weak-answer scaffold is in all nine gates and "a reader can check/ask/look" appears 67 times (was about 79). |
| B17 | FIXED | 0 raw `mermaid` fences; "What to notice", "The takeaway" and "Hint:" wrappers gone from `06.06`. |
| B18 | FIXED | `06.06` mapping table now has rows for R1 and R2, R3, R7, R6, R4, R5 and Education. |
| B19 | PARTLY FIXED | `01.03` diagram now contrasts two paths and the fold no longer re-narrates it. The count is still 50; `08.04` "Where each visitor goes next" and similar list-style diagrams are unchanged. |
| B20 | FIXED | Canvas `career-m4-run-the-filter`: "Run eight ideas through the filter". |
| B21 | FIXED | `04.02` describes the four studies by direction with no speed percentages. The "55 percent" figure appears only as the wrong claim in `04.06` q5. |
| B22 | FIXED | `05.08`: "She chose the written option this time; no reason is needed." |
| B23 | FIXED | `06.01`: "from 90 in the three months before to 18 in the three months after"; bullet names the daily check and the team's part. |
| B24 | PARTLY FIXED | Two of the three unknowable-fact predicts (`06.02`, `07.03`) were replaced; `04.02` still asks for the quiz score before the picture. All predicts have two options with a straw-man wrong one; 7 of 60 quizzes still give the correct option the only digit or bracket. |
| B25 | DECIDED | Community cloud example kept at the sponsor's request. |
| B26 | FIXED | `05.03` heading "A demo login that opens every core feature"; "small rights, and the owner's real rights stay out". |
| B27 | FIXED | The sentence about Areej's equipment is gone from the `03.05` Sources fold. |
| B28 | PARTLY FIXED | The exact repeat is gone (one Ghaith, in `04.06`). Near-identical names remain: Mounir (`07.02`), Munir (`04.06`), Moin (`07.06`); Wissam (`06.07`), Wesam (`09.05`); Rim (`04.06`), Rimas (`09.03`); Ghazi, Ghaith, Ghaida; Sireen and Shereen. |
| B29 | PARTLY FIXED | An always-visible line now sits in `01.01` and `01.06`: "the wellbeing coordinator is reachable by phone. Your instructors give you the name." No placeholder for the name and number, and nothing in `09.06`. |
| B30 | OPEN | 4.0 percent of sentences are over 25 words; for example `08.08` (a 76-word channel list), `03.02` (66 words), `06.06` (56 words). |
| B31 | PARTLY FIXED | "busts 99.95 percent" is gone and the p95 gloss is now "finish within". Left: "Linger here." (`05.04`), "A rule of thumb for any detail" (`02.04`), "moves on" (7 uses), "gold-plated extras" and "end of the day" in canvases. |
| B32 | PARTLY FIXED | `02.02`, `03.02`, `04.02` and `09.04` openings changed. `02.05` still has the heading "The nine parts" then "The arc has nine parts." |
| B33 | PARTLY FIXED | "Gaza" and the "It does not name Palestine" line are gone; `08.03` now says "from where you are". Still present: "applicants from Palestine" in `01.03` and canvas `career-m1-kit-bias-note`, and `08.04` "GitHub's page on trade controls lists the places where it restricts service, so read it for where you are". |
| B34 | FIXED | `09.01` and `09.06`: "The stranger test was run and reported at gate 5.8." |
| B35 | FIXED | `02.07` Part 4: "There is no minimum number of items." |
| B36 | FIXED | `08.06`: "It is one page with the headings in the template below." |
| B37 | DECIDED | Two shared pictures kept; the sentence naming the other chapter is gone from `03.04`. |
| B38 | DECIDED | Recaps and learning logs stay. |
| B39 | FIXED | `03.02`: "They cover six parts of a claim card, because "before and after" asks for two parts at once." Canvas now says "chapter 3.5". |
| B40 | FIXED | `07.05` is now 80 minutes (was 65) and `09.03` is 50 (was 40). Total still 30 hours. |
| B41 | FIXED | `01.04` predict: "Could not reliably tell them apart". Canvas: "Not reliably told apart". |
| B42 | PARTLY FIXED | `01.04` now credits by finding, with names only in Sources (three). Still too many names: `07.04` Sources has seven and the body names three teams; `02.04` Sources has six; `06.05` has four; `05.02` Sources names five hosting vendors. |
| B43 | FIXED | `09.05` rewritten: five new cases where the learner picks the gap that matters most, with plausible distractors. |
| B44 | FIXED | `02.01` glosses "pillar": "What repeats is her first pillar: a strength you can back with proof." |

Tally: 26 fixed, 12 partly fixed, 2 open, 4 decided.

## Defects

New defects only. Order is by importance. IDs continue the round 1 series.

### S1

None. I found no fabricated statistic presented as fact, no unsafe privacy instruction, no sponsor website named, no real person, and no dash or attribution.

### S2

None new. B3 (above) is the one S2 still open.

### S3

- **B45.** location: `03.03` (heading `The sum, and why people recall low`, and "use the median, because people remember a task as quicker than it was"); `03.05` ("She did not guess from memory, because people remember a task as quicker than it was."); canvas `career-m3-time-saved-net` limits ("People recall task times as shorter than they are").
  observation: A behavioural claim is stated as fact in three chapters and a canvas. The dossier traces it to `S44`, "vendor and consultant blogs on automation ROI", rated low, with the note "because people recall low".
  why it matters: This is the only place in the course where a low-confidence vendor claim is taught as a plain fact, in a course that teaches "who measured it?". A sharp learner can ask the question the course taught and get no answer.
  suggested fix: Say "A timer beats memory, which is easy to bend" or "practitioner advice says people recall tasks as quicker", and drop it from the heading.

- **B46.** location: `03.04` ("An SLI, a service level indicator ... An SLO ... An SLA", "It also gives an error budget idea: at 99.9 percent, 3,000 failed requests are allowed in 3 million", the histogram paragraph); `03.05` ("A closed test model waits for each simulated user ... This is called coordinated omission.", the Locust version, "Google's Core Web Vitals are judged on real users' page loads, at the 75th percentile").
  observation: Two Learn chapters teach about a dozen performance-engineering terms beyond the six questions, p50/p95/p99 and the before-and-after claim.
  why it matters: The dossier's "What not to teach" says "Deep load-testing, tracing or cost optimization. Teach the reading and the before/after claim, not performance engineering." These two chapters are also where non-backend fellows (design, product, operations) are most likely to stall, and the words are used once and never again.
  suggested fix: Keep the six questions, the percentile line, "average hides slow requests", "percentiles do not average", and the nines table. Move SLI/SLO/SLA, error budget, coordinated omission, open and closed models and Core Web Vitals into one optional fold, or cut them.

- **B47.** location: `05.04` ("This is a rule of this platform's authoring standards, not a research finding."); `09.02` ("The platform keeps a flag only when its quote really appears in your answers." and "The platform checks only that the quote appears in your answer."); canvas `career-m9-tap-the-flag` limits.
  observation: Learner text refers to internal documents and to how the product validates flags.
  why it matters: "Authoring standards" is a production document the learner never sees; the second is a product internal that can change without the course changing.
  suggested fix: `05.04`: "This is a rule for this course, not a research finding." `09.02` and the canvas: "The interviewer may be wrong, and it cannot see your ledger."

- **B48.** location: `08.08` Part 3 ("Met: You list 8 to 12 channels ... You tried each channel on your phone, with a date." "Partly: You list fewer than 8 channels"); `09.06` Part 4 ("Met: At least five public links open on a phone").
  observation: Both rubrics set a count that the chapters say is optional. `08.03` says "About ten is a guide. Fewer is fine if you can reach them." and that access to DEV and Medium "is not confirmed". `09.01` and `09.06` say a live website and a published post are "noted but not required".
  why it matters: A fellow who cannot reach platforms or cannot publish does everything the chapters allow and is marked Partly. This is the care rule the course keeps elsewhere.
  suggested fix: Met means every channel or link the learner lists is complete and was opened on a phone, with no minimum count.

- **B49.** location: `02.02` ("The events list was slow when many people used it.") against `02.05` ("her project has no real user yet"); `08.02` says "slow under load".
  observation: Areej's study project is described as used by many people and as having no real user.
  why it matters: It is Areej's own facts, in the module that teaches "say only what is true".
  suggested fix: `02.02`: "The events list was slow under a load test." Keep `02.05`.

- **B50.** location: `01.06` and `02.07`, `04.07`, `07.07` ("one question"); `03.08`, `05.08`, `06.08`, `09.06` ("one to three questions"); `08.08` ("one or two questions"); `09.01` ("Your mentor's one to three follow-up questions are answered").
  observation: The gate promise changes from module to module. `01.06` says "one question at most".
  why it matters: A learner who trusts module 1 is surprised in module 3. A mentor has three different rules.
  suggested fix: One rule for all gates, for example "one question, and a second only if the first is unclear".

- **B51.** location: `03.07` q1 (seven parts), `04.02` quick check (Umaima, five log parts), `07.03` quick check (Nuwar, four post parts), `08.02` quick check (Wajeeh, four post parts).
  observation: Each asks "which option has all N parts?". The correct option is the only one with every label, and lengths are equalised (for example 153, 153, 154, 153 in `07.03`), so the answer comes from counting labels, not from judgment.
  why it matters: Anti-slop: "a quiz that tests the paragraph above". `09.05` shows the better form (which missing item matters most).
  suggested fix: Give each option all the labels and make one content wrong, or ask which single missing part would stop a reader checking the claim.

- **B52.** location: all 73 quiz blocks (correct explanation opens "Right."), all 37 predict blocks (`explanation: "Right. ..."`); also "Notice what/that ..." (21), "Here is ..." (41), "A reader will ask / asks" (17).
  observation: 110 of 110 correct-answer explanations begin with the same word. Wrong-answer explanations never do.
  why it matters: Template voice. It reads as a stamp, and a learner who gets a retry sees the pattern before the content.
  suggested fix: Drop "Right." (the interface already marks it correct) and start with the reason.

### S4

- **B53.** location: `05.08` lines 72 to 76.
  observation: The third bullet carries instructions: `- "If the demo is asleep tomorrow, what will a reader still see?" You answer in writing or in a voice note. Watch for that reply after you submit, because your answer to it completes the gate.`
  why it matters: A sentence meant for the whole list is inside one bullet and may render as a question.
  suggested fix: End the list after the question and put "You answer in writing or in a voice note..." as its own paragraph.

- **B54.** location: `06.06` mapping table, row "Double-booked seats fell from 9 to 1", column "My share": "Part of the drop came from the club's change from three sessions a week to two".
  observation: The cell holds a cause statement, not her share, and it says the sessions change did cause part of the drop. `02.03` and `03.02` say only that it "could have reduced clashes".
  why it matters: The model table overstates what the evidence shows, in the chapter that checks every line.
  suggested fix: "Mine: the form and the migration. Not mine: the club cut sessions from three a week to two, which may explain part of the drop."

- **B55.** location: `03.07` q1 ("A banner release landed in the middle of the window"); canvas `career-m3-what-else-changed` ("A front-end release lands on 20 May"); `01.04` ("a clear letter alone will not carry an application").
  observation: Phrasal verbs that a second-language reader may not know: "landed", "lands", "carry an application".
  why it matters: These sit next to the key fact (when the change happened), so a misread costs the point.
  suggested fix: "was released", "goes out on 20 May", "will not win an application".

- **B56.** location: `01.02` heading `## The six seconds comes from one company's study` and diagram title "Where the six seconds comes from".
  observation: A plural number with a singular verb.
  why it matters: Second-language readers will stop on the heading of the chapter's key correction.
  suggested fix: "The six-second figure comes from one company's study".

## What works

- Honest method, now applied without the earlier blur: omission is taught in one voice (`02.03`, `03.02`, `06.03`, the canvas), Raqim Stock is a plan everywhere ("(planned)", "none ticked"), Waed's bullet has exact counts and the team's part, and the capstone has one list of six parts.
- Care: a written option and a privacy line before each AI drill, "I did not measure that" accepted in every rubric, no VPN advice, hardship never dramatised, a human detail that is optional and ungraded, and the refusal story for Areej now has a neutral line ("no reason is needed").
- Source discipline against the dossier: every platform fact carries "checked 2026-10"; the three-versus-five notes conflict is shown; speed multiples and the unverified table are absent as facts; the six-second and 75 percent corrections use the dossier's wording.
- Clean text: ASCII throughout, no dashes, no forbidden words outside bad examples, mean sentence 12.8 words, `course.yaml` matching all 65 chapters.
- Reuse of the baseline: 1.6 defines the five flags once, 6.8 and 9.6 compare against them, and every "chapter N.M" resolves.
- `09.05` is now a model for the other quizzes: one case from each module, a gap that matters, plausible distractors.

## Recommendation

**Revise (light).** Zero S1 and zero new S2. One S2 remains from round 1: the "course 14" and "take it next" pointers (B3 residual). The average is 4.14, below 4.3, with no dimension at 3. Clear B3, then the eight new S3 items (B45 to B52), then close the round 1 partly-fixed items that change what a learner is told (B9, B33, B42) and the still-open B15, B24 and B30. A third pass should re-run canvas text QA and the canvas tests so dimension 20 can be confirmed, and should confirm that `modelAnswer` fields are mentor-only.

```yaml
artifact: critique
course: career-brand
artifact_under_review: courses/career-brand
lens: slop | continuity (with accuracy, tone and honesty)
scorecard_average: 4.14
blocking_defects: 1   # zero S1, one S2 (B3 residual)
recommendation: revise
```
