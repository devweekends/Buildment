---
artifact: critique
course: career-brand
artifact_under_review: courses/career-brand (65 chapters, course.yaml) and packages/learning-ui/src/canvas/career-m*/data.ts (126 canvases)
reviewer: critic-b (blind)
review_type: slop | continuity (with accuracy against the dossier, tone and care, and honesty checks)
version: 1
---

# Critique B: career-brand, full draft

Reviewed blind. I read the critic role, the scorecard, the anti-slop checklist, the defect severities, template 11, the authoring standards, the brief, `research.md` and `research-platforms.md`. I read all 65 chapters in full and every learner-facing string in the 126 canvas `data.ts` files. I did not open `context-packs/`, `module-briefs/`, `interaction-map.yaml`, `canvas-specs/`, `assessment-plan.md`, `run-log.md`, `decision-log.md` or the `spec.md` files. I did read `roadmap-confirmation.md` (needed for dimension 19).

## Checks run

- Course audit: `node agent-ip/scripts/audit-course.mjs courses/career-brand` reports 65 chapters, 76,476 prose words, "Needs work: 0".
- Dashes and symbols: every character in the 65 chapters, 126 canvas files and `course.yaml` is ASCII. No U+2013 or U+2014. No AI attribution found.
- Sentence length (prose, code and props removed): 5,975 sentences, mean 12.5 words, 246 over 25 words (4.1 percent).
- Quizzes: 73 MCQs. Correct position 0/1/2/3 = 18/18/19/18. The correct option is the longest by characters in 18 of 73. No question has the correct option 10 percent or more longer than the longest wrong one. 37 predictions, all two-option (correct first in 19, second in 18).
- Dossier trace: I searched the text for every row of both "Unverified claims" tables (220 and 2,600 characters, 2X and 21X, 18 percent, 2.9 times, 23.8 million, Fortune 500, first hour, link penalty, 7.4 seconds as a fact, speed multiples). None is asserted as fact, except the AI speed figures noted in B21.
- Platform facts: "checked 2026-10" appears 73 times. The three-versus-five notes conflict is surfaced honestly.
- Arithmetic rechecked: 186 - 7 = 179 minutes; 540 / 179 = about 3 weeks; 412 - 57 = 355; (820 - 95) / 820 = 0.884; 9 to 1 sessions; 10 to 6 = 40 percent; 5 hours = 300 minutes; 6,300 to 6,100 = 3 percent. All correct.
- Cross-references: every "chapter N.M" and "gate N.M" resolves. Course 13 and course 7 claims match the repo. Course 14 does not exist in `courses/` (see B3).
- Not run: canvas text QA (needs a running app), canvas unit tests, the blind answer-key check.

## Scorecard

| Dimension | Score | Note |
|---|---|---|
| 1 Outcome alignment | 4 | All nine brief outcomes map to a module and a gate (outside lens). Gate 6.8 and 9.6 close the baseline loop opened in 1.6. |
| 2 Domain specificity | 5 | Named fictional fellows with sourced numbers, windows and shares in every chapter; no "a company" actors. Skew to database latency is logged as B15. |
| 3 Depth over coverage | 4 | Eight kit parts taught with method, not tips (outside lens). Module 3 is dense for non-backend fellows. |
| 4 Prose quality | 3 | Plain and short (mean 12.5 words), but internal words leak (B13), jargon is undefined (B12), and boilerplate repeats in every gate and quiz (B16, B14). |
| 5 Chapter structure | 4 | Scene, concept beats, check, build, gate on every module (outside lens). |
| 6 Interaction purpose | 4 | Canvases sort, drag and step, and each carries one claim (outside lens). Predictions are all binary (B24). |
| 7 Assessment quality | 4 | Positions balanced, no length cue, rubrics specific (outside lens). A few number cues, binary predicts and find-the-gap items (B24, B43). |
| 8 Difficulty calibration | 4 | Support fades from Areej's cards to the learner's own (outside lens). |
| 9 Cognitive load | 4 | Beats stay short; Build chapters reach 3,200 words and strain phone readers (B40) (outside lens). |
| 10 Prerequisite integrity | 4 | Terms mostly taught before use; flag names and several technical words are not (B11, B12). |
| 11 Technical accuracy | 4 | Facts match dossier rows and carry dates. One taxonomy error (B1), two over-strong statements (B8, B9), one Premium claim the dossier contradicts (B10). |
| 12 Production-grade coverage | 4 | Adapted to the showcase bar: demo controls, secrets, permission, privacy (outside lens). |
| 13 Security and integrity | 4 | Privacy line before every one of the five AI drills, written option for each, no VPN advice, no secrets in examples (outside lens). |
| 14 Accessibility | 4 | Captions, no autoplay, tap-or-drag, text paths; not tested in a browser (outside lens). |
| 15 IP protection | 4 | No sponsor site; one possible sponsor-adjacent example (B25) (outside lens). |
| 16 Variant distinctiveness | 5 | Not applicable: no variants in the first cohort (scored 5 by convention, excluded from the second average). |
| 17 Continuity | 3 | Six contradictions inside Areej's own facts and the capstone rubric (B1, B2, B4, B6, B7, B22), plus a duplicate name (B28). |
| 18 Learner agency and curiosity | 4 | Predict, sort, choose own work or Areej's; every mentor reply asks one real question (outside lens). |
| 19 Instructor alignment | not scored | `roadmap-confirmation.md` is `status: pending`; no instructor has signed (B5). |
| 20 Interactive canvas quality | 4 (provisional) | Judged from learner strings only (126 canvases, clear one-claim titles, limits stated). No canvas QA report exists in `qa/`, so this cannot be confirmed (outside lens). |
| 21 Explanatory depth | 4 | Audit passes; folds hold mechanism, worked example, limits and sources (outside lens). Duplicate re-explanation costs some depth per word (B14). |
| 22 Visual explanation quality | 4 | Canvases argue; about a fifth of the 47 flowcharts only chain a list the next paragraph repeats (B19) (outside lens). |

Average over the 21 scored dimensions: 4.00 (3.95 if dimension 16 is excluded as not applicable). This is below the 4.3 bar. Two dimensions are at 3 (4 and 17). There are zero S1 and five S2 defects, so the gate does not pass.

## Defects

Order is by importance. Paths are relative to `<repo>` = `D:/Projects - Community/buildment-brand`. Line numbers refer to the files as read.

### S1

None. I found no fabricated statistic presented as fact, no dishonest growth tactic, no unsafe privacy instruction, no sponsor website named or described, no real person or real personal site, and no dash or attribution.

### S2

- **B1.** location: `courses/career-brand/02-your-career-arc-document/02.03-every-role-with-proof.md` line 69; `courses/career-brand/06-a-resume-that-reads-as-you/06.03-bullets-with-ownership.md` line 94; `packages/learning-ui/src/canvas/career-m2-found-vs-team/data.ts` (limits); against `courses/career-brand/03-honest-numbers-and-proof-of-work/03.02-from-a-number-to-a-claim-card.md` line 23.
  observation: Three places teach "Leaving out the team's part so that yours looks bigger is embellishment" and "So is leaving out the lead's part so your own looks bigger". In 03.02 the same act is "A line that leaves out the bigger machines, so that the whole gain looks like yours, is an omission." The same sentences in 02.03 and 06.03 define omission as "leaving something out to mislead".
  why it matters: Dossier C1 (S29) separates fabrication, embellishment (inflating) and omission (leaving out to mislead). A learner is told both answers for the same act, and the 03.02 quiz (Kenan) depends on the correct one. This is the course's central honesty vocabulary.
  required fix: Call it omission in 02.03, 06.03 and the canvas. Keep "when it is meant to mislead". Drop "even when every word you wrote is true" or tie it to intent.

- **B2.** location: `courses/career-brand/04-a-strong-project-in-the-ai-era/04.02-when-building-is-fast.md` lines 107 and 117 and the log table ("Week 2, Tuesday"); `.../04.05-plan-your-project.md` line 90; `.../05-show-your-work-so-people-look/05.04-a-short-demo-of-the-core.md` line 81; `.../05.06-build-your-showcase.md` lines 70, 81, 83.
  observation: Raqim Stock is a plan only ("The page shows what the finished page will hold, not results she already has", "You will not build the project in this course", "Raqim Stock is not launched"). Yet Areej has a dated AI-use log with a bug found and fixed ("This is the bug from her log, and a reader can ask to see the test"; "Areej met this in her AI-use log ... ran the same test again, and the count was right"), and a demo account whose checklist is ticked: "Her checklist has all six boxes ticked." The same chapter's rule is "Tick a box only when it is true."
  why it matters: Honesty lens. A worked example gives Areej finished work and verified controls that the course says do not exist, models ticking boxes for a plan, and has no ledger row (R1 to R7, G1) behind the bug. It teaches the exact blur the course fights.
  required fix: Either make Raqim Stock started (state the week, add a ledger row, say the demo exists), or label the log line and the six ticks as "planned" and show them unticked. Keep the 90-second storyboard as a plan.

- **B3.** location: `courses/career-brand/06-a-resume-that-reads-as-you/06.03-bullets-with-ownership.md` line 98; `.../06.06-write-your-resume.md` line 161; `.../09-capstone-your-kit-defended/09.02-from-feedback-to-your-next-step.md` line 147; `.../03-honest-numbers-and-proof-of-work/03.03-proof-for-each-kind-of-work.md` line 29; `.../09.01-set-the-scene.md` line 99; `.../09.06-checklist.md` line 108.
  observation: The text names specific content of another course: `Course 14, "The Founder Interview", module 3, "Every resume line survives five whys"`, `chapter 7.2, teaches reading feedback critically`, and `has a module on honest numbers that covers finding numbers you never looked at`. It also says "If you have not, take it next." No course 14 folder exists in `courses/`; the title appears only in this course. (Course 13 and course 7 claims do check out.)
  why it matters: A learner is sent to a module title and chapter number nobody can verify, and the capstone ends by pointing to a course that may not be in the catalogue. These are invented specifics inside a course that sells verifiability.
  required fix: Remove module and chapter numbers and titles. Refer to "the Founder Interview course" only if the sponsor confirms it will be published, otherwise cut the pointers. Remove "take it next" until it exists.

- **B4.** location: `courses/career-brand/09-capstone-your-kit-defended/09.01-set-the-scene.md` lines 79 and 91; `.../09.06-checklist.md` lines 44 to 82.
  observation: 09.01 says "The review has five parts" (Evidence, Ownership, Clarity, Access and safety, Defence) and "The other four parts are at least Partly". 09.06 marks six parts (adds Part 6: Comparison and next step) and says "Parts 2, 3, 4, 5 and 6 are at least Partly."
  why it matters: This is the pass rule of the capstone. A mentor and a learner can read two different rubrics.
  required fix: Use one list. Either fold Part 6 into Defence in 09.06, or state six parts in 09.01.

- **B5.** location: `agent-ip/work/career-brand/roadmap-confirmation.md`.
  observation: `**G2B is pending.** No instructor has reviewed or signed the roadmap yet.` The draft follows the recommendations until an instructor decides otherwise.
  why it matters: Dimension 19 cannot be scored. G2B is a hard prerequisite for G3 to G5, so this draft cannot close G5 whatever the other scores.
  required fix: Obtain two instructor signatures, apply any changes, then re-score dimension 19. This is a process blocker, not a writing defect.

### S3

- **B6.** location: `courses/career-brand/02-your-career-arc-document/02.02-values-pillars-and-what-makes-you-different.md` line 52; `.../02.05-write-your-career-arc.md` line 104.
  observation: 02.02: `Pillar 3: "I am careful with data and secrets." Its proofs are replacing a leaked key and turning on push protection. The second proof is asking permission before she used a company chart in public.` 02.05: `The leaked key and the permission she asked for before using the company chart became pillar 3.`
  why it matters: 02.02 lists three items for two proofs, and the first two are one incident. The chapter's own rule is "Two proofs from different places show a habit." Pillar 3 breaks it in the very chapter that teaches it.
  suggested fix: Match 02.02 to 02.05: proof 1 is the key revocation with push protection, proof 2 is asking before using the chart.

- **B7.** location: `.../02.04-the-human-part-and-asking-others.md` line 97; `packages/learning-ui/src/canvas/career-m2-where-detail-helps/data.ts` (limits); `.../07-linkedin/07.02-your-profile-field-by-field.md` line 77; `.../07.05-rebuild-your-profile.md` table; `.../08-writing-and-distribution/08.04-a-website-that-is-clearly-yours.md` and `08.06-plan-your-website.md` line 68.
  observation: 02.04: `Areej uses the notebook line once, in her About section on LinkedIn. She does not repeat it in her resume, her case study or her messages.` Then her LinkedIn About (07.02, 07.05) and her website About (08.04, 08.06: `This is where a personal detail belongs, once.`) both use it.
  why it matters: The course tells fellows that a detail used in several places "becomes a slogan" and then models two uses.
  suggested fix: Choose one place for Areej (LinkedIn About) and give the website About a different true line, or change 02.04 to "once per page".

- **B8.** location: `.../01-what-a-reader-sees-first/01.02-the-first-look-is-short.md` line 29 (heading) and line 40; `.../01.06-checklist.md` line 113.
  observation: Heading: `## The famous six seconds has no source`. Body: `It traces back to a hiring-site company's eye-tracking studies.` The recap says "no reliable source".
  why it matters: The dossier says the figure is untraceable beyond one company's study with an undisclosed sample. "No source" is false and the Mermaid diagram right below shows the source. Overstating the debunk is the same habit the course teaches against.
  suggested fix: "The famous six seconds comes from one company's study" or "has no reliable source", and use it in the summary too.

- **B9.** location: `.../06-a-resume-that-reads-as-you/06.02-strongest-proof-first.md` line 88 and the predict explanation; `.../06.07-quiz.md` question 3.
  observation: `A consultant tried to trace the figure. It came from a 2012 sales pitch by a company that sold resume tools and closed in 2013. No study stood behind it.` and `The 75 percent figure traces to a 2012 sales pitch ... with no study behind it.`
  why it matters: The dossier rates the sources (S76, S77) low to medium and says the consultant's original was not opened. The chapter states it as settled fact.
  suggested fix: "One consultant who traced it reports that it came from ..." and keep "nobody has a sourced figure".

- **B10.** location: `.../07-linkedin/07.01-set-the-scene.md` line 19 and the first fold.
  observation: `He pays for one month of Premium, which lets him personalise as many invitations as he likes.` and `It raised the number of personalised invitations Amjad could write.`
  why it matters: Dossier G2 notes LinkedIn's own pages disagree (one says Premium is unlimited, another lists 300 in source row P27). The chapter picks one without a date or a hedge, in a course that teaches "trust the page on your screen".
  suggested fix: "Premium raises the number of personalised invitations" with "checked 2026-10; your screen may differ".

- **B11.** location: `.../01-what-a-reader-sees-first/01.06-checklist.md` line 80; `.../03-honest-numbers-and-proof-of-work/03.08-checklist.md` line 82; `.../05.08-checklist.md` line 76; `.../06.08-checklist.md` line 82; defined only at `.../09-capstone-your-kit-defended/09.02-from-feedback-to-your-next-step.md` (list of five flags).
  observation: Four gates say `The five flags are vague ownership, unsupported number, pseudo-story, invented reason risk, and jargon without explanation.` with no definition. "Pseudo-story" and "invented reason risk" are first explained in chapter 9.2. Gate 1.6 makes them the baseline the learner copies into a log.
  why it matters: The learner must record flags in module 1 and compare them in module 6 without knowing two of the five terms. Second-language readers get five terms and no gloss.
  suggested fix: Put the five one-line definitions (with the examples from 9.2) in 1.6 and link back from each later gate.

- **B12.** location: `.../02.05-write-your-career-arc.md` line 135 (`same 10,000 seeded events`); `.../02.03-every-role-with-proof.md` line 33 (`my laptop copy of a staging database`); `.../01.03-what-they-look-for.md` (`got about 22 percent fewer callbacks`); `.../05.03-let-them-in-with-one-click.md` (`a throttled, seeded, low-rights demo`); `.../06.02-strongest-proof-first.md` line 124 (`characters the parser cannot read`); `.../06.04-drafting-with-ai-and-the-empty-sentence-edit.md` (`A preprint reports`, `population-level finding`).
  observation: Used and never defined: "seeded" (19 uses), "staging" (13), "callbacks" (7, first in 01.03), "field experiment" (6), "throttled", "parser", "preprint", "population-level".
  why it matters: The standard is "define jargon on first use". These words carry the argument in the passage where they appear.
  suggested fix: One plain gloss at first use each (for example "callback: the employer replies and asks for an interview"), or use a GlossaryTerm.

- **B13.** location: `.../01.04-when-writing-is-cheap.md` lines 41 and 61 and 99 (`as the first beat showed`, `The next beats show why`, `Here is the rewrite from the canvas`); `.../03.02-from-a-number-to-a-claim-card.md` line 67 (`gets its own picture in the next beat`); `.../03.04-reading-a-dashboard.md` line 11 (`beat 3 shows it`); `.../05.03-let-them-in-with-one-click.md` line 91 (`the next beat shows the controls one by one`); `.../05.04-a-short-demo-of-the-core.md` line 67 (`which the next beat explains`); `.../07.02-your-profile-field-by-field.md` line 25 (`which beat 6 covers`); `.../09.02-from-feedback-to-your-next-step.md` line 34 (`Beat 4 shows how.`); canvases `career-m3-claim-card` (`the next beat`) and `career-m5-demo-login` (`the controls in the next beat`).
  observation: Internal production words in learner text: "beat" (numbered and unnumbered), "canvas".
  why it matters: Learners see section headings, not beats. "Beat 6" is unfindable and "beat" is also used as a verb in the p95 gloss, which is confusing for second-language readers.
  suggested fix: "the next picture", "the section called ...", or a chapter number. Search the 126 canvas `limits` strings too.

- **B14.** location: `.../02.03-every-role-with-proof.md` line 169 and `.../02.05-write-your-career-arc.md` line 159 (`Every learner has at least one study or volunteer role.`); `.../06.03-bullets-with-ownership.md` (reuses canvas `career-m2-found-vs-team` and repeats `Areej's report fix had seven steps. She did four`); `.../03.03-proof-for-each-kind-of-work.md` and `.../05.03-let-them-in-with-one-click.md` (`If a key was ever pushed, assume it is stolen and replace it.`); the sections "How to use AI on your own material" and "If you have no work yet, or no laptop" in 02.05, 03.06, 05.06, 06.06, 07.05, 08.05, 08.06, 09.03.
  observation: The same explanation is rewritten in eight Build chapters with the same four-step shape, and some paragraphs are identical.
  why it matters: Duplicate explanation (anti-slop checklist) and extra reading on phones. The AI rule ("restructure, never add") is taught well in 02.05 and then re-taught eight times.
  suggested fix: Teach the rule once (02.05), then use a two-line reminder with a link. Keep only the chapter-specific prompt.

- **B15.** location: whole course. Counts: `Areej` in 51 of 65 files; `4.6 s to 0.41` in 25 chapters; `820 ms to 95` in 15; the long bullet `by finding a full-table scan and adding a composite index` verbatim in 03.02, 03.06, 06.03, 06.04, 06.06.
  observation: One result carries the whole thread. Fellows who are designers, mobile, data or operations people meet only Ruqaya (one scene) and Waed (module 6) outside database latency.
  why it matters: The brief names backend, frontend, mobile, data, product, design and operations fellows. The k6, EXPLAIN, p95 and index vocabulary is also the hardest part for those fellows.
  suggested fix: Add one more fully worked thread outside backend (for example a design usability result or an operations time-saved result) and vary the quoted bullet. Keep Areej's report as the anchor, not the only example.

- **B16.** location: whole course. Counts: `In this made-up case` opens 42 of 73 quiz stems; `Here is a strong answer from a fictional fellow` / `Here is a weak answer` / `Look at the shape of` appear in all nine gates; `That reply is part of the gate, so look out for it after you submit.` appears 8 times; `Areej is a fictional fellow, and her numbers are illustrative.` appears 18 times verbatim; "a reader can check/ask" appears about 79 times.
  observation: The scaffolding is the same in every module and the refrain "a reader could ask about it" is the answer to most questions.
  why it matters: Template voice (anti-slop). It lets a learner pass by the pattern (see B24) and tires readers.
  suggested fix: Disclose "fictional" once per module. Vary quiz stems. Keep gate structure but change the wording of the strong and weak answers' commentary and the closing line.

- **B17.** location: `.../06.06-write-your-resume.md` lines 24, 33, 161; `.../08-writing-and-distribution/08.05-write-your-post.md` line 26; `.../08.06-plan-your-website.md` line 52.
  observation: Raw ` ```mermaid ` fences in three Build chapters while every other chapter uses `<MermaidDiagram>`. 06.06 also has `What to notice: the ledger comes first ...`, `The takeaway: write the bullets first, then the outline ...` and `Hint: if you get stuck, write the three strongest bullets first.`
  why it matters: The raw fences probably render as code, not a diagram. The labelled "What to notice / The takeaway" voice is not used anywhere else.
  suggested fix: Convert to the component with a title and legend, and delete the "What to notice / takeaway / Hint" wrappers.

- **B18.** location: `.../06.06-write-your-resume.md` (mapping table after "Worked example: Areej writes her resume").
  observation: The text says `Every line that carries a number or a result needs a row` and describes seven bullets, but Areej's table has four rows (report, invoice, key, education). The Campus Board, club migration and double-booking bullets are missing.
  why it matters: The worked example does not pass its own acceptance test ("Every line maps to a ledger row").
  suggested fix: Add the R4, R5 and R7 rows.

- **B19.** location: examples `.../07-linkedin/07.03-posts-and-comments.md` ("Four parts of a short post"), `.../07.04-outreach-and-honest-growth.md` ("Four parts of a short message", "Whom to write to first"), `.../08.04-a-website-that-is-clearly-yours.md` ("A five-page personal site", "Free static hosts, checked 2026-10"), `.../03.03-proof-for-each-kind-of-work.md` ("Where a cost figure comes from"), `.../05.05-the-case-study.md` ("From what happened to what I would change"); `.../01.03-what-they-look-for.md` line 100.
  observation: A script comparing each flowchart's labels with the paragraph under it finds 29 of 47 `MermaidDiagram` blocks with at least 60 percent label overlap and 10 at 0.9 to 1.0. In 01.03 the fold re-narrates the picture: `The diagram shows the order on a one-page resume. Your name and links come first. Then come ...`
  why it matters: Anti-slop: a diagram that restates the prose. These are chains of the same list, with no change, loop or contrast. (The loop in "The two-sided waiting loop" does argue and is fine.)
  suggested fix: Cut the list diagrams and keep the sentence, or replace each with a sorter or a before and after that the learner changes.

- **B20.** location: `packages/learning-ui/src/canvas/career-m4-run-the-filter/data.ts` line 85.
  observation: `title: "Run five ideas through the filter"`, while the chapter heading (04.03 line 111) says "Run eight ideas through the filter" and the canvas has eight cards.
  why it matters: Learner-facing title contradicts the picture and the chapter.
  suggested fix: Change to "Run eight ideas through the filter".

- **B21.** location: `.../04-a-strong-project-in-the-ai-era/04.02-when-building-is-fast.md` (Study 1 to 3 fold: `55.8 percent faster`, `about 26 percent more tasks`, `19 percent longer`, `24 percent faster`); `.../04.06-quiz.md` question 5 (`AI makes developers 55 percent faster`).
  observation: The chapter quotes four speed figures from AI-tool studies, with hedges.
  why it matters: `research.md` "What not to teach" lists "Specific speed multiples for AI coding tools" and asks chapters to say only "studies disagree, record what you checked". The canvas `career-m4-studies-disagree` already does this by direction only. Learners may repeat "19 percent slower" or "55 percent faster" as facts.
  suggested fix: Describe each study by direction and setting without percentages, or keep one figure with its limits and drop the rest.

- **B22.** location: `.../05-show-your-work-so-people-look/05.08-checklist.md` line 40; `.../09-capstone-your-kit-defended/09.04-defend-your-kit.md` line 103.
  observation: 05.08: `Her request to the AI interviewer was refused in this drill, so she took the written option.` 09.04: `Areej pasted her resume and her case study with contact details removed, and used path A.` No explanation in between.
  why it matters: A new fact about Areej appears late and is reversed with no cause. A reader may also read it as a hint about access from Gaza.
  suggested fix: Explain it in one neutral sentence (for example "her connection dropped") or remove the refusal from Areej and give it to a generic learner.

- **B23.** location: `.../06-a-resume-that-reads-as-you/06.01-set-the-scene.md` (Waed's counts), `06.03`, `06.04`, canvases `career-m6-adjectives-or-fact`, `career-m6-duty-vs-bullet`, `career-m6-empty-phrases`, `career-m6-missing-tracker`.
  observation: `Built a shared delivery tracker that cut missed delivery confirmations from about 30 to 6 a month (team tracker, three months before and after).` This is the model bullet, but it has "about 30" (the count comes from a tracker, so it should be exact), no "what else changed", and no statement of her share or the team's.
  why it matters: 03.02 says `A rise of 12 percent is not "about 15 percent".` and the claim card needs all seven parts. The chapter's own example fails its method, and it appears in five chapters.
  suggested fix: Give an exact count, name what else changed, and add her part and the team's part to the card and the bullet.

- **B24.** location: all 37 `predict` blocks; quizzes `.../01.04-when-writing-is-cheap.md` (Farhan), `.../07-linkedin/07.02-your-profile-field-by-field.md` (Mounir), `.../07.06-quiz.md` (Noura), `.../08-writing-and-distribution/08.07-quiz.md` (Lubaba); predicts in `06.02`, `07.03`, `04.02`.
  observation: Every prediction has two options and a straw-man wrong option, for example `The paragraph about being motivated` (01.01) or `A friendly note, the same for every founder, with a link to the sender's services` (07.01). In 9 of 73 quizzes the correct option is the only one with a number or a bracket. Three predictions ask for facts a learner cannot know (the 75 percent figure in 06.02, what LinkedIn's page says about links in 07.03, the quiz scores in 04.02).
  why it matters: Anti-slop: "a quiz where the correct answer is the only plausible option". A learner can pass by choosing the sourced, specific one without understanding.
  suggested fix: Add a third plausible option to predicts, put numbers or brackets in at least one distractor, and keep recall-only predictions for facts the picture will show.

- **B25.** location: `.../04.03-the-idea-filter.md` line 123 and the canvas `career-m4-run-the-filter` card `A community cloud for a defined small group with a real workload`.
  observation: `Picture a community, or a company, that pools its spare servers so its own people can run jobs on them.` The dossier (open question 10) asked whether this example fits the sponsor's context; no answer is recorded in the course.
  why it matters: The brief says the sponsor's own website is never named, linked or described. This example may read as the sponsor's product.
  suggested fix: Ask the sponsor. If in doubt, swap for a neutral shared-resource idea (a school's shared printer queue).

- **B26.** location: `.../05.03-let-them-in-with-one-click.md` lines 71 and 81; `.../05.06-build-your-showcase.md` line 81; canvas `career-m5-demo-login`.
  observation: Heading `A demo login that can do everything` and `The account can do everything the owner can do inside the app. It cannot send real email or take real payments`, against checklist item `Low rights: cannot reach real email, SMS, payments or paid services`.
  why it matters: "Can do everything" and "low rights" contradict each other. A second-language reader may build a demo with full rights.
  suggested fix: "A demo login that opens every core feature, with small rights" and say "the owner's real rights stay out".

- **B27.** location: `.../03.05-measure-it-yourself.md` line 131.
  observation: In a Sources fold: `Areej's equipment is mentioned once, as a plain fact.`
  why it matters: This is the writer's rationale leaking into learner text (and reads oddly next to the dignity of the hardship rule).
  suggested fix: Delete the sentence.

- **B28.** location: `.../04.06-quiz.md` question 1 (`Ghaith is a web developer`) and `.../08.08-checklist.md` (`Ghaith is a Python developer`); also `Mounir` (07.02), `Munir` (04.06), `Moin` (07.06); `Wissam` (06.07) and `Wesam` (09.05); `Ghazi`, `Ghaith`, `Ghaida`.
  observation: One exact repeat for two people, and several near-identical names across about 70 scene names.
  why it matters: Continuity and readability: names are the main memory aid for second-language readers.
  suggested fix: Rename one Ghaith, and keep names visibly different (different first letters) inside one module.

- **B29.** location: `.../01-what-a-reader-sees-first/01.01-set-the-scene.md` lines 55 and 57.
  observation: `talk to the course's wellbeing contact. This is a named person, not a form or a bot, and you can reach them by phone. ... Your instructors give you the name and the way to reach them.` The only place is a collapsed fold in chapter 1.1; no name and no number appear anywhere in the course.
  why it matters: The standard requires a named coordinator and a way to reach them that works on a phone. The text says "named" and names no one, once, in a fold, before the hardest chapters (1.6, 9.6).
  suggested fix: Add a placeholder filled per cohort (name, WhatsApp or phone) in an always-visible line in 1.1, and repeat one line in 1.6 and 9.6.

### S4

- **B30.** location: whole course; examples `.../09-capstone-your-kit-defended/09.04-defend-your-kit.md` (`The questions are: how was it measured, what was your part and the team's, ...` 47 words), `.../09.03-assemble-your-kit.md` (`The night before she sent her kit to her mentor, she did what this chapter asks you to do: ...` 38 words), `.../06.06-write-your-resume.md` (`You know how to order a resume by strength of proof (chapter 6.2), ...` 44 words), `.../04.07-checklist.md` (42 words).
  observation: 246 sentences exceed 25 words (4.1 percent). About 32 non-quoted prose sentences exceed 32 words, mostly in Build and gate chapters.
  suggested fix: Split into two or three sentences, or turn the six-item lists into a list.

- **B31.** location: `.../03.04-reading-a-dashboard.md` line 107 (`busts 99.95 percent`); `.../02.04-the-human-part-and-asking-others.md` (heading `A rule of thumb for any detail`); `.../05.04-a-short-demo-of-the-core.md` (`Linger here.`); canvases `career-m7-headline-parts` (`Rockstar developer`), `career-m8-plain-words` (`end of the day`), `career-m1-handbook-cards` (`gold-plated extras`); the p95 gloss `the time that 95 of every 100 requests beat` (01.04, 03.02, 03.04, 08.02); `moves on` used 9 times for "leaves".
  observation: Idioms and phrasal verbs that second-language readers may not know.
  suggested fix: "breaks", "a general guide", "Stay on this", "boast", "finish faster than" for the gloss, "leaves".

- **B32.** location: `.../02.05-write-your-career-arc.md` (heading `The nine parts` then `The arc has nine parts.`); `.../03.02-...` (`"Helped grow the business 50 percent"` then `Take the sentence ...`); `.../04.02-...` (`Studies of AI coding tools disagree` then `Watch four studies of AI coding tools answer in turn.`); `.../09.04-...` (`Fix one thing` then `After the defence, fix one thing the feedback named.`); `.../02.02-...` (`A pillar is a strength with proof` then `A pillar is a strength you can prove.`).
  observation: A heading repeated as the first sentence (forbidden pattern).
  suggested fix: Start with the point the heading does not make.

- **B33.** location: `.../08-writing-and-distribution/08.03-publish-once-share-in-ten-places.md` (`Access to DEV, Medium and other platforms from Gaza is not confirmed.`); canvas `career-m8-canonical-fields`; `.../08.04-a-website-that-is-clearly-yours.md` (`It does not name Palestine.`); against `.../05.02-nobody-will-run-your-code.md` (`we have not confirmed which work from where you are`).
  observation: Gaza and Palestine are named in access notes and a sanctions page, but "from where you are" is used elsewhere.
  why it matters: The facts match the dossier, but naming the place and a trade-controls page raises anxiety and is inconsistent.
  suggested fix: Use "from where you are" everywhere in learner text and keep the sanctions detail in the mentor notes.

- **B34.** location: `.../09.06-checklist.md` line 82 (`The stranger test passed on a phone at gate 5.8.`); `.../05.08-checklist.md` Part 2.
  observation: The 5.8 gate only requires the test to be reported (Met = time, understanding and two questions stated). 09.06 and 09.01 say "passed".
  suggested fix: "was run and reported at gate 5.8".

- **B35.** location: `.../02.07-checklist.md` Part 4.
  observation: `Met: At least two items are named as private, each with a reason of a few words.`
  why it matters: A fellow with fewer private items is pushed to over-mark or invent one.
  suggested fix: "Every item that is private has a reason", with no minimum.

- **B36.** location: `.../08.06-plan-your-website.md` ("It has seven parts") and its template.
  observation: The template shows more than seven labelled groups (host, limit, checked on, address, pages, which case study, specifics, originals rule, update plan, privacy, test page).
  suggested fix: Say "one page of notes with these headings" or number the headings.

- **B37.** location: `.../03.04-reading-a-dashboard.md` (canvases `sysdesign-m17-same-average` and `sysdesign-m17-slo-window`; Sources: `Service A and service B use the same made-up numbers as a system design chapter in this platform.`).
  observation: Two canvases come from another course and the learner text names that other chapter.
  why it matters: Cross-course dependency; a change there changes this chapter, and the learner may not have taken it.
  suggested fix: Copy the two canvases under `career-m3-*` slugs, drop the sentence.

- **B38.** location: the nine `ChapterRecap` blocks (for example `.../03.08-checklist.md`) and the four "Learning log" prompts in each gate.
  observation: The recap repeats the chapter in five bullets, and the log asks open reflection questions ("Which of your pillars is strongest, and what makes it strong?") that no one reads.
  why it matters: Anti-slop: "key takeaways that repeat the chapter" and "an open question used as generic reflection".
  suggested fix: Keep the log but tie each prompt to a file the mentor sees, or cut the recaps.

- **B39.** location: `.../03.02-from-a-number-to-a-claim-card.md` line 17 and `packages/learning-ui/src/canvas/career-m3-what-else-changed/data.ts` line 10.
  observation: `A reader asks five short questions ... Together they cover six parts of a claim card`; the canvas says `A comparison you control (module 3.5) is stronger.`
  suggested fix: Say how five questions map to six parts in one clause, and write "chapter 3.5" (it is a chapter, not a module).

- **B40.** location: `.../07-linkedin/07.05-rebuild-your-profile.md` (`estimatedMinutes: 65`, 3,264 words) and `.../09-capstone-your-kit-defended/09.03-assemble-your-kit.md` (`estimatedMinutes: 40`, 3,259 words).
  observation: One Build chapter asks for a rebuilt profile, three outreach drafts, five comments and a plan in 65 minutes; the other asks for an index, a number map, a privacy check and a link check in 40.
  why it matters: Realistic reading plus writing time on a phone with power cuts is longer. The sum of estimates (29.75 hours) hides this.
  suggested fix: Raise the estimates or split 07.05 into two sittings with a stated break point.

- **B41.** location: `.../01-what-a-reader-sees-first/01.04-when-writing-is-cheap.md` (predict, `About as well as picking at random`).
  observation: The dossier wording is "could not reliably detect". The chapter and the canvas say "about as well as guessing".
  suggested fix: Use "could not reliably tell them apart".

- **B42.** location: `.../01.04-when-writing-is-cheap.md` and `.../07.04-outreach-and-honest-growth.md`.
  observation: 01.04 credits Wiles, Munyikwa and Horton; Jakesch, Hancock and Naaman; Liang (7 names). 07.04 credits Flynn and Lake; Brooks, Gino and Schweitzer; Rajkumar and Aral (7 names).
  why it matters: Dossier credit rule: at most two or three researchers or organisations per chapter.
  suggested fix: Credit by finding and put the names in the Sources fold only.

- **B43.** location: `.../09-capstone-your-kit-defended/09.05-quiz.md` questions 1 and 2.
  observation: Three of the four options in each are "The source is given ... Nothing is missing here."
  why it matters: Quizzes test the paragraph above; they ask a learner to find the one absent part in a short stem.
  suggested fix: Replace with a case where two parts are missing and the learner must choose which matters most.

- **B44.** location: `.../02-your-career-arc-document/02.01-set-the-scene.md` and the module 1 gate `.../01-what-a-reader-sees-first/01.06-checklist.md`.
  observation: 02.01 says `What repeats is her first pillar` before 2.2 defines "pillar"; 01.01 to 01.06 name the flags before defining them.
  suggested fix: Add a 6-word gloss at first use.

## What works

- Honest method, consistently applied: the claim card (metric, before, after, window, source, share, what else changed), the ledger as the only source of numbers, and "I did not measure that, and here is how I would" as a complete answer that every mentor rubric accepts. Areej's numbers hold together everywhere I checked (windows 1 to 14 and 16 to 29 May, 6,300 and 6,100, 179 minutes net, 355 imports).
- Source discipline against the dossier: platform facts carry a check date, conflicts (three or five notes) are shown, unverified rows are absent as facts, Hashnode and Substack are handled with the "first published at" line, and the pods rule uses the dossier's own wording. Preferred phrasing from "Phrase it this way" lines is used almost word for word.
- Care: a privacy sentence and a written option before each of the five AI drills; every drill is optional; "I did not measure that" is accepted; no VPN workaround; no Premium, paid domain or paid key needed; hardship is never dramatised; the human detail is optional and ungraded; mentors answer with one question.
- Clean text: ASCII throughout, no dashes, no forbidden words outside quoted bad examples, only one three-sentence repeat in 65 files, mean sentence 12.5 words.
- Quiz balance: correct positions are even and there is no length cue. Gate rubrics (Met, Partly, Not yet) are specific enough for two reviewers, and each gate gives a strong and a weak sample answer.
- The worked example of AI misuse in 02.05 (`led a team of five`, `five years of experience`) is exactly the right failure to show.
- Structure: the module 1 baseline is used again in 6.8 and 9.6, and every "chapter N.M" reference resolves.

## Recommendation

**Revise.** Zero S1 defects, five S2 defects (B1 to B5), average 4.00 (below 4.3), two dimensions at 3. Fix the S2 items first: the omission/embellishment contradiction, the Raqim Stock claims, the unverifiable course 14 pointers and the five-versus-six parts rule; get the G2B signatures so dimension 19 can be scored. Then clear the S3 items that change what a learner is told (B6 to B11, B22, B23, B26, B29) and the template and duplicate-text items (B14 to B17). A second critic round should re-score dimensions 4, 17 and 19, and run the canvas text QA and unit tests so dimension 20 can be confirmed.

```yaml
artifact: critique
course: career-brand
artifact_under_review: courses/career-brand
lens: slop | continuity (with accuracy, tone and honesty)
scorecard_average: 4.00
blocking_defects: 5   # zero S1, five S2
recommendation: revise
```
