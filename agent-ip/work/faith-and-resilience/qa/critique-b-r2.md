---
artifact: critique
course: faith-and-resilience
artifact_under_review: content/import/faith-and-resilience
reviewer: critic-b
review_type: slop, continuity, accuracy, safety and tone
version: 2
---

# Critique & Scorecard (Round 2): Steady Hearts: Islamic Belief for Uncertain Times

## Round 1 Defect Verification

| Defect ID | Round 1 summary | Status | Evidence in revised files |
|---|---|---|---|
| `S2-1` | Missing English `Meaning:` line immediately after the Arabic block quote of Sahih Muslim 2664 in `05.02` | Fixed | In `content/import/faith-and-resilience/05-deciding-when-the-outcome-is-unclear/05.02-take-the-means-of-knowing.md` (lines 2919 to 2921), the Arabic quote `> الْمُؤْمِنُ الْقَوِيُّ ...` is now immediately followed by `Meaning: the strong believer is better and more beloved to Allah than the weak believer, and there is good in both. Be keen on what benefits you, seek Allah's help, and do not give up (Sahih Muslim 2664).` |
| `S2-2` | Missing first-mention honorifics for companions in chapters (`03.05`, `05.05`, `07.03`) and for the Prophet, other prophets, and companions in canvases | Fixed | `content/import/faith-and-resilience/03-sabr/03.05-quiz.md` (line 2041) and `content/import/faith-and-resilience/05-deciding-when-the-outcome-is-unclear/05.05-quiz.md` (line 3396) now include `"the Prophet, peace be upon him"` on first mention and no longer mention Umm Salamah without an honorific. `content/import/faith-and-resilience/07-community-care-and-your-steady-plan/07.03-caring-for-body-and-mind.md` (lines 4622 and 4633) now reads `"Khadijah, may Allah be pleased with her"`. In `canvas-data.md`, first-mention honorifics appear across `frontend/src/canvas/a-hard-week-two-readings/data.ts`, `frontend/src/canvas/act-not-if-only/data.ts`, `frontend/src/canvas/birds-go-out/data.ts`, `frontend/src/canvas/hijra-planned-steps/data.ts`, `frontend/src/canvas/sabr-keeps-moving/data.ts`, `frontend/src/canvas/words-for-the-day/data.ts`, `frontend/src/canvas/yusuf-waiting-well/data.ts`, `frontend/src/canvas/gratitude-three-ways/data.ts`, `frontend/src/canvas/istikhara-in-order/data.ts`, `frontend/src/canvas/starting-again-steps/data.ts`, and `frontend/src/canvas/who-to-tell/data.ts`. |
| `S2-3` | Reused character names across unrelated people (`Ola`, `Sawsan`, `Ayman`, `Nabil` / `Umm Nabil`) | Fixed | `Ola` is kept only in `content/import/faith-and-resilience/02-tawakkul/02.03-tie-it-and-trust.md` (line 1046) and replaced with `Rima` in `content/import/faith-and-resilience/03-sabr/03.05-quiz.md` (line 2049). `Sawsan` is replaced in both `content/import/faith-and-resilience/02-tawakkul/02.05-quiz.md` and `content/import/faith-and-resilience/03-sabr/03.05-quiz.md`. `Ayman` is kept only in `content/import/faith-and-resilience/02-tawakkul/02.04-the-prophets-planning.md` (line 1171) and replaced with `Mais` in `content/import/faith-and-resilience/04-gratitude-and-hope/04.04-quiz.md` (line 2647). `Umm Nabil` is replaced with `Rahaf` in `content/import/faith-and-resilience/03-sabr/03.03-words-for-hard-moments.md` (line 1811). Cross-module duplicates in Module 7 (`Kinan`, `Ghadeer`, `Thaer`) were also replaced with unique names (`Wisam`, `Muna`, `Mazin`, `Reham`, `Fida`). |
| `S2-4` | Cast fact drift across chapters (`Yasmin` power hours, `Khalil` uncle's shop solar panel, `Ahmad` age) | Fixed | Not reproduced in the actual files, which are consistent throughout: Yasmin has `"about six hours a day"` in `content/import/faith-and-resilience/01-anchors-when-the-future-is-unclear/01.01-set-the-scene.md` (line 15), `frontend/src/canvas/worry-or-next-step/data.ts` (line 36), and `content/import/faith-and-resilience/07-community-care-and-your-steady-plan/07.01-set-the-scene.md` (line 4352); Khalil's uncle Nabil's shop has `"a solar panel"` in `content/import/faith-and-resilience/02-tawakkul/02.01-set-the-scene.md` (line 685), `content/import/faith-and-resilience/02-tawakkul/02.03-tie-it-and-trust.md` (line 949), `frontend/src/canvas/interview-power-plan/data.ts` (line 354), and `content/import/faith-and-resilience/07-community-care-and-your-steady-plan/07.01-set-the-scene.md` (line 4299); Ahmad is 25 in `content/import/faith-and-resilience/04-gratitude-and-hope/04.01-set-the-scene.md` (line 2203), within the 22 to 27 cast age range in `writer-pack.md`. |
| `S2-5` | Canvas text and chapter text mismatches in `06.02`, `03.04`, and `01.02` | Fixed | Not reproduced in the actual files, where chapter prose and canvas data match: `content/import/faith-and-resilience/01-anchors-when-the-future-is-unclear/01.02-what-only-allah-knows.md` (lines 124 to 126) and `frontend/src/canvas/worry-or-next-step/data.ts` (lines 35 to 114) both use six questions and seven days since the draft was sent; `content/import/faith-and-resilience/03-sabr/03.04-waiting-well.md` (lines 1869 to 1890) and `frontend/src/canvas/yusuf-waiting-well/data.ts` (lines 787 to 835) both include `Quran 12:42` with the scholarly-difference note and match the prediction on `Quran 12:100`; `content/import/faith-and-resilience/06-intention-work-and-starting-again/06.02-intention.md` (lines 3667 to 3681) and `frontend/src/canvas/same-work-two-intentions/data.ts` (lines 1368 to 1455) both use the 15:00 power cut (`Sahih Muslim 130`), the $150 payment, and the money given to Tariq's mother (`Sahih al-Bukhari 56`). |
| `S2-6` | Sentences exceeding the 30-word hard limit across chapters and `modelAnswer` blocks | Fixed | Every over-length sentence across `01.01-set-the-scene.md` through `07.06-checklist.md` (including the `modelAnswer` strings in `01.05`, `02.06`, `03.06`, `04.05`, `05.06`, `06.06`, `07.02`, `07.03`, `07.05`, and `07.06`) has been split into short sentences of 30 words or fewer. |
| `S2-7` | Core Arabic terms defined in full multiple times across chapters instead of once at first use | Fixed | Later chapters now use brief back-references instead of full re-definitions, including `"the ghayb you met in chapter 1.1"` (`01.02-what-only-allah-knows.md`, line 134), `"the qadr you met in chapter 1.1"` (`01.04-qadr-and-effort.md`, line 445), `"The short definition of tawakkul you met in chapter 2.1"` (`02.02-what-tawakkul-really-means.md`, line 791), `"the sabr jamil from the key words of 3.1"` (`03.02-what-sabr-is.md`, line 1599), `"the istirja you met in the key words of 3.1"` (`03.03-words-for-hard-moments.md`, line 1735), `"the raja' and khawf from the key words of 4.1"` (`04.03-hope-and-fear-in-balance.md`, line 2498), `"The shura you met there"` (`05.03-shura.md`, line 3059), `"You met the word istikhara in chapter 5.1"` (`05.04-istikhara.md`, line 3211), `"You met the word ihsan in chapter 6.1"` (`06.03-good-work-little-and-often.md`, line 3805), and `"tawbah, the turning back you met in chapter 6.1"` (`06.04-after-a-failure.md`, line 4013). |
| `S3-1` | English idioms and figures of speech in chapters (`01.01`, `01.02`, `01.03`, `01.04`, `06.04`, `07.02`, `07.06`) | Fixed | Replaced with literal phrasing: `"uses up the time"` (`01.01-set-the-scene.md`, line 7), `"Yasmin still felt worried"` (`01.02-what-only-allah-knows.md`, line 225), `"answers the late-night thought"` (`01.03-life-as-a-test.md`, line 328), `"joins the two beliefs together"` (`01.04-qadr-and-effort.md`, line 493), and `"carrying heavy guilt"` and `"calling 'if only' learning"` (`06.04-after-a-failure.md`, lines 3962 and 4065). |
| `S3-2` | Missing source references in Gate `<ChapterRecap>` components in Modules 3 to 7 | Fixed | Source references were added to every bullet in the `<ChapterRecap>` components of `content/import/faith-and-resilience/03-sabr/03.06-checklist.md` (line 2183), `content/import/faith-and-resilience/04-gratitude-and-hope/04.05-checklist.md` (line 2766), `content/import/faith-and-resilience/05-deciding-when-the-outcome-is-unclear/05.06-checklist.md` (line 3504), `content/import/faith-and-resilience/06-intention-work-and-starting-again/06.06-checklist.md` (line 4275), and `content/import/faith-and-resilience/07-community-care-and-your-steady-plan/07.06-checklist.md` (line 5100). (A minor omission of the grading tag on `Jami' at-Tirmidhi 2038` in the new `07.06` recap bullet is filed below under `S3-2`.) |
| `S3-3` | Spelling of `rak'as` in `05.04` and `istikhara-in-order` | Fixed | Not reproduced in the actual files: both `content/import/faith-and-resilience/05-deciding-when-the-outcome-is-unclear/05.04-istikhara.md` (line 3211) and `frontend/src/canvas/istikhara-in-order/data.ts` (line 1228) already spell the term `rak'a` and `rak'as`. |

## Scorecard

| # | Dimension | Score (1 to 5) | One-line evidence / note |
|---|---|---|---|
| 1 | Factual & technical accuracy | 4 | Every verse, hadith, story detail, and scholarly view matches `research.md` and every Arabic block quote has an immediate `Meaning:` line; only three secondary/recap citations omit the non-Bukhari/Muslim grading (`S3-2`). |
| 2 | Curriculum & learning-objective coverage | 5 | All 40 chapters and 7 modules cover every learning objective, source text, and misconception in `00-course-brief.md` and `writer-pack.md`, with sourced `<ChapterRecap>` summaries in every Gate. |
| 3 | Prerequisite & progression integrity | 5 | Core Arabic terms (`ghayb`, `qadr`, `tawakkul`, `sabr`, `sabr jamil`, `istirja`, `shukr`, `raja'`, `khawf`, `shura`, `istikhara`, `niyyah`, `ihsan`, `tawbah`) are defined in full once at first use and referenced back cleanly in later chapters. |
| 4 | Pedagogical arc (`Hook -> Predict -> Discover -> Formalize -> Try -> Reflect`) | 5 | Every Learn chapter moves smoothly from a cast scene to a `predict` block, an `<InteractiveCanvas>`, source-grounded explanation, a step-by-step worked example, a Mermaid diagram, and two MCQs. |
| 5 | Worked-example quality | 5 | Every Learn chapter features a distinct worked example with step-by-step reasoning, and every Gate and the Capstone includes both a positive model and a provided case. |
| 6 | Exercise & assessment quality | 5 | All Check quizzes, inline checks, Gate tasks, and the Capstone test plans and reasoning rather than personal faith or feelings, with specific distractor explanations. |
| 7 | Interactive Canvas quality | 5 | All 19 canvases in `canvas-data.md` carry first-mention honorifics for prophets and companions and match the numbers, steps, and predictions in their chapters. |
| 8 | Diagram & visual quality | 4 | All 26 Mermaid diagrams stay within node and label budgets and pair with varied explanatory prose; one revised callout sentence in `01.01-set-the-scene.md` has a minor grammatical splice (`S3-1`). |
| 9 | Voice, clarity & anti-slop | 5 | All 40 chapters and `modelAnswer` blocks respect the 30-word sentence ceiling, literal English replaces Round 1 idioms, and zero em dashes, en dashes, or banned slop phrases appear. |
| 10 | Structural variety & anti-template | 5 | Section headings, diagram lead-ins, and misconception framing vary naturally across modules without robotic templates. |
| 11 | Variant distinctiveness (multi-variant only) | 5 | Not applicable (single-variant course; scored 5 per rubric rules). |
| 12 | Cross-reference, link & path integrity | 5 | All 19 `<InteractiveCanvas>` slugs resolve to `canvas-data.md`, cast facts stay consistent from Module 1 to Module 7, and every character name across all 40 chapters refers to a single person. |
| 13 | Reader / learner experience & cognitive load | 5 | Short paragraphs, concrete numbers, and single-definition key-word tables keep cognitive load well within reach for Arabic-first ESL learners. |
| 14 | Completeness (zero placeholders / TODOs) | 5 | Every Arabic block quote is followed immediately by its English `Meaning:` line, and all 40 chapters and 19 canvases are complete with zero placeholders. |
| 15 | Accessibility & inclusive language | 5 | Plain English is used throughout, optional voice-note links (`allowSpeechInput` and `allowUrl`) are enabled on every Gate and Capstone, and provided cases protect privacy. |
| 16 | Practicality & Gaza-relevant grounding | 5 | Power cuts, data costs, shared workspaces, solar batteries, and family responsibilities are woven realistically into every module, with financial figures framed as illustrative examples. |
| 17 | Structural & schema compliance | 5 | Frontmatter fields, component tags, `predict` blocks, `quiz` blocks, and `openquestion` blocks follow the course schema across all 40 files. |
| 18 | Production-grade coverage (tech / career tracks) | 5 | Not applicable (foundational personal resilience course; scored 5 per rubric rules). |
| 19 | Cultural, religious & trauma-informed sensitivity | 5 | First-mention honorifics appear across all chapters and canvases, grief and hardship are handled without spiritual bypassing, and human-contact and professional-care notes appear wherever heavy feelings are discussed. |
| 20 | Assessment rubric & pass-rule explicitness | 5 | Every Gate and the Capstone provides a `Met / Partly / Not yet` table, an explicit pass rule, and a mentor follow-up workflow that grades only the plan and its reasoning. |
| 21 | Scaffolding & progressive independence | 5 | Scaffolding tapers deliberately from full models in Modules 1 to 4 to brief examples in Modules 5 and 6 and an independent six-part Capstone in Module 7. |
| 22 | Engagement, energy & human warmth | 5 | Reem and the six Saturday study circle fellows carry a warm, dignified, and believable human thread from the opening scene to the closing toolkit. |
| **Average** | | **4.91** | **Blocking defects (S1 + S2): 0** |
| **Recommendation** | | **Approve** | Every dimension is at least 4, average is 4.91 (threshold 4.3), and S1 and S2 counts are both zero. |

## Blocking Defects (S1 & S2)

### S1: Critical / Blocker

None.

### S2: Major

None.

## Minor / Polish Defects (S3)

### `S3-1`: Minor grammatical splice in the post-diagram callout sentence of `01.01`

- **Location:** `content/import/faith-and-resilience/01-anchors-when-the-future-is-unclear/01.01-set-the-scene.md` (line 73, first sentence after the Mermaid diagram under `## What the worry was doing`)
- **Observation:** When the diagram callout opener `"What to notice: the loop"` was revised in Round 1, it was changed to `"Look first at the loop"` without adjusting the verb `"has"`, leaving two finite verbs in one clause:
  > `"Look first at the loop from "check messages" to "power hours used up" has no exit, because every turn asks the same unknown question."`
- **Why it matters:** Plain-English readability for ESL learners relies on clean clause boundaries; two main verbs (`"Look first at"` and `"has no exit"`) in one sentence cause the reader to stumble.
- **Required fix:** Change `"Look first at the loop from "check messages" to "power hours used up" has no exit"` to `"Notice first that the loop from "check messages" to "power hours used up" has no exit"` (or split after `"power hours used up."`).

### `S3-2`: Omitted hadith grading in two Gate `<ChapterRecap>` bullets and one quiz explanation (`02.06`, `07.04`, `07.06`)

- **Location:**
  - `content/import/faith-and-resilience/02-tawakkul/02.06-checklist.md` (line 1401, `<ChapterRecap>` point 1)
  - `content/import/faith-and-resilience/07-community-care-and-your-steady-plan/07.04-quiz.md` (line 4818, Question 5 option 2 explanation)
  - `content/import/faith-and-resilience/07-community-care-and-your-steady-plan/07.06-checklist.md` (line 5100, `<ChapterRecap>` point 3)
- **Observation:** `writer-pack.md` requires stating the grading from `research.md` right next to the reference for any hadith outside Bukhari and Muslim on first use in a chapter and in tables and recaps. While the gradings are stated in the chapter prose and toolkit tables, three places omit them:
  - `content/import/faith-and-resilience/02-tawakkul/02.06-checklist.md` (line 1401): `"Tawakkul is trusting Allah with your heart while you do the work with your hands; the birds trust and still go out (Jami' at-Tirmidhi 2344)"` (missing `, graded hasan sahih`, which appears three lines above in `modelAnswer`).
  - `content/import/faith-and-resilience/07-community-care-and-your-steady-plan/07.04-quiz.md` (line 4818): `"Thanking people matters, and it is part of thanking Allah (Sunan Abi Dawud 4811)."` (first and only citation of this hadith in `07.04-quiz.md`, missing `, graded sahih`).
  - `content/import/faith-and-resilience/07-community-care-and-your-steady-plan/07.06-checklist.md` (line 5100): `"Rest, treatment and telling a real person are taking the means, not weak faith (Sahih al-Bukhari 5199; Jami' at-Tirmidhi 2038)"` (missing `, graded sahih` in the newly added recap citation, though present in the toolkit table on line 5031).
- **Why it matters:** Keeping non-Bukhari/Muslim gradings consistent in recaps and standalone check chapters preserves the citation standard in `writer-pack.md`.
- **Required fix:** Append `, graded hasan sahih` to `Jami' at-Tirmidhi 2344` in `02.06-checklist.md` (`<ChapterRecap>`), `, graded sahih` to `Sunan Abi Dawud 4811` in `07.04-quiz.md`, and `, graded sahih` to `Jami' at-Tirmidhi 2038` in `07.06-checklist.md` (`<ChapterRecap>`).

## What Works

- **Thorough resolution of Round 1 defects:** Every blocking defect from Round 1 has been resolved cleanly. `content/import/faith-and-resilience/05-deciding-when-the-outcome-is-unclear/05.02-take-the-means-of-knowing.md` now has its immediate `Meaning:` line after the Arabic block quote of Sahih Muslim 2664; first-mention honorifics are present across all 40 chapters and all 19 canvases in `canvas-data.md`; every character name across the 40 chapters is unique to a single person; all core Arabic terms are defined once at first use with brief back-references in later chapters; and every sentence across the chapters and `modelAnswer` blocks sits within the 30-word ceiling.
- **Strict adherence to `research.md` and theological guardrails:** All Quranic verses, hadiths, gradings, companion reports, and contemporary mental-health fatwa statements stay inside `research.md`. The course avoids extrapolating the Battle of Uhud around Quran 3:159, presents scholarly differences on Quran 12:42 and post-istikhara feelings neutrally, and never promises guaranteed worldly outcomes from dua, istikhara, or gratitude.
- **Trauma-informed safety and practical grounding:** Every module pairs belief with concrete action under realistic constraints (grid schedules, battery counts, data bundles, and family duties), provides optional fictional cases for every reflective or graded task, and repeats clear human-contact and professional-care guidance whenever prolonged distress is discussed.

## Recommendation

- [x] **Approve**: Ready to ship (no S1 or S2 defects; all dimensions >= 4; average >= 4.3).
- [ ] **Revise**: Address all S1 and S2 defects above and resubmit for re-review.
- [ ] **Rewrite from brief**: Fundamental structural or factual failures; restart from the course brief and writer pack.
