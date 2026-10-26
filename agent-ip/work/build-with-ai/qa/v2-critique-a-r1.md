---
artifact: critique
course: build-with-ai (v2)
round: 1
critic: A (second model family)
scorecard_average: 4.90
s1: 0
s2: 1
s3: 3
---

## Scorecard

| # | Dimension | Score | Note |
|---|---|---|---|
| 1 | Outcome alignment | 5 | Every chapter serves an explicit observable outcome (O1 to O17); practice and capstone tasks map directly to demonstrable portfolio artifacts. |
| 2 | Domain specificity | 5 | Examples and operational realities are tuned specifically for Gaza fellows: phone screens, intermittent power cuts, weak data, local clinics and cafes, and real programs (GSoC, Outreachy, LFX). |
| 3 | Depth over coverage | 5 | Prioritizes deep engineering and judgment fundamentals (why assistants default to common answers, the Outbox pattern, Redis versus Valkey licensing, row versus column stores) over superficial syntax tours. |
| 4 | Prose quality | 5 | Calm, clear, and direct prose adhering to plain English standards; short sentences under 20 words; no filler, hype, or promotional buzzwords. |
| 5 | Chapter structure | 5 | Learn chapters follow the beats standard (visual first, at most 70 visible words per beat, GoDeeper folds for mechanism, trade-offs, and failure modes, predict before, transfer check after). |
| 6 | Interaction purpose | 5 | Interactions require active cognitive reasoning (predicting deltas, sorting claims by evidential status) rather than passive clicking. |
| 7 | Assessment quality | 5 | Assessment keys are unambiguous; distractors reflect authentic learner misconceptions; option lengths and key positions (0, 1, 2, 3) are evenly distributed. |
| 8 | Difficulty calibration | 5 | Scaffolding fades progressively from fully worked traces in early modules to independent synthesis, decision records, and defense scenarios in modules 10 and 11. |
| 9 | Cognitive load | 5 | Extraneous load is minimized; technical terms receive immediate glossary definitions and concrete physical anchors. |
| 10 | Prerequisite integrity | 5 | Foundational concepts (Git, pull requests, relational schemas, personal access tokens) precede advanced architectural patterns (Outbox pattern, MCP lockdown, prompt injection). |
| 11 | Technical accuracy | 5 | Faithfully verified against research dossier parts A, B, and C (licensing histories, Prometheus versus VictoriaMetrics, SQLite WAL single-writer limits, AWS Cost Explorer CLI parameters). |
| 12 | Production-grade coverage | 5 | Covers authentication, fine-grained tokens, race conditions, partial failure, and idempotent event processing with genuine engineering rigor. |
| 13 | Security and integrity | 5 | Rigorous handling of token boundaries, fine-grained scopes, prompt injection in MCP issue tools, and cost API safeguards. |
| 14 | Accessibility | 5 | Mobile-first formatting, touch targets of at least 44px, text alternatives, token-based contrast, and keyboard navigation. |
| 15 | IP protection | 5 | Guides problem-solving structure and trade-off evaluation while withholding capstone solutions. |
| 16 | Variant distinctiveness | not applicable, no variants | Single canonical course track without multi-product variant branching. |
| 17 | Continuity | 4 | Narrative arcs (Yara and Qasir, Khaled, Rana, Manar, Yazan) are consistent, but Chapter 01.08 references an orphan canvas slug missing from the canvas deliverable bundle. |
| 18 | Learner agency and curiosity | 5 | Centers learner decision-making, questioning default answers, and personal ownership of code and public content. |
| 19 | Instructor alignment | cannot be scored, G2B pending | Pre-signoff draft pending G2B instructor review per curriculum roadmap status. |
| 20 | Interactive canvas quality | 4 | Pure TypeScript primitive models are clean and tested, but manifest parity between chapter embeds and the canvas bundle has one gap. |
| 21 | Explanatory depth | 5 | Fully passes prose-depth audit; every GoDeeper fold details mechanisms, trade-offs, failure modes, and primary source citations. |
| 22 | Visual explanation quality | 5 | Diagrams argue rather than restate prose; topologies clearly demarcate state boundaries, failure points, and event paths. |

## Defects

### S1

None.

### S2

- **ID**: A-1
  - **File path**: `courses/build-with-ai/01-ai-as-an-enabler/01.08-plenty-of-ai-few-strong-projects.md`
  - **Location**: Heading `## Weighing the two projects`
  - **Observation**: The chapter embeds `<InteractiveCanvas slug="big-app-or-understood-app" />` and instructs the learner: "Change the weights below and watch which project comes out ahead. Try to find the settings where Khaled's store wins. <InteractiveCanvas slug="big-app-or-understood-app" /> The canvas started with the weights a typical reviewer might use, and Yara's slice led by 44 points to 23." However, `canvases.md` contains no implementation or specification for `big-app-or-understood-app` (it is mentioned in `writer-pack-v2.md` line 143 only as an architectural model reference for factor renderers: `renderers/factor/types.ts; model big-app-or-understood-app/data.ts`).
  - **Why it matters**: Per the interactive canvas contract, every canvas slug embedded in course markdown must resolve to an active spec and data implementation in the canvas package. Invoking an unbundled or orphan slug triggers an unhandled component error or a broken fallback in the course reader, halting interactive learning on that chapter.
  - **Required fix**: Bundle `packages/learning-ui/src/canvas/big-app-or-understood-app/data.ts` and its `spec.md` into the canvas package, or update Chapter 01.08 to replace the canvas tag with a reviewed static comparison table and trace if 01.08 is intended to remain purely prose-first.

### S3

- **ID**: A-2
  - **File path**: `courses/build-with-ai/01-ai-as-an-enabler/01.02-why-ai-looks-bigger.md`
  - **Location**: Heading `## A launch claim meets an outside test`
  - **Observation**: Beat 1 embeds `<InteractiveCanvas slug="claim-type-sorter-devin" />`. In `canvases.md` line 491, `claimTypeSorterDevin` is exported as a `SceneSpec` (`kind: "scene"`), which is an automated, timed watch-only animation rather than an interactive component. The prose text reads: "In March 2024, a company launched Devin as 'the first AI software engineer'..." without indicating that the visual above it is an automated playback scene.
  - **Why it matters**: Learners on mobile touchscreens need clear affordances between watch-only animation loops and touch-playable controls, preventing interaction confusion and false defect reports.
  - **Required fix**: Add a brief label or prompt directly above or within the beat visual (for example: "Watch the sequence below:") to clarify that this beat visual is an animated scene, distinguishing it from the touch-interactive sorter canvas in Beat 2.

- **ID**: A-3
  - **File path**: `courses/build-with-ai/08-grow-fast-go-deep/08.04-go-deep-with-a-team.md`
  - **Location**: Heading `## Three ways to spend three months`
  - **Observation**: Under the table of programs, the text notes for Google Summer of Code (GSoC): "The 2026 table lists West Bank and Gaza at $900, $1,800 and $3,600 for small, medium and large projects [B71]". In the subsequent `GoDeeper` fold (`a fellow in Gaza and the missing facts`), it notes: "we could not confirm whether fellows in Gaza can receive payments from GSoC, LFX or Outreachy". While the transparency is commendable, the chapter does not provide an immediate, concrete contingency or practical banking/payment alternative for Gaza fellows if international wires or PayPal fail, beyond asking "ask the program's contact address".
  - **Why it matters**: Payment delivery to the Palestinian territories (especially Gaza under active conflict and bank destruction) is a critical friction point. Leaving this as a general caveat without pointing fellows to local mentorship networks, university escrow contacts, or fellow alumni advice leaves the learner with actionable uncertainty in a high-stakes decision.
  - **Required fix**: Expand the note in `GoDeeper` to advise fellows to consult the fellowship coordinator or fellow alumni before applying, and to specify community project contribution as the primary fallback where stipend receipt cannot be verified in advance.

- **ID**: A-4
  - **File path**: `courses/build-with-ai/10-share-the-human-way/10.05-authenticity-and-authorship.md`
  - **Location**: Heading `## Test claims about AI detectors`
  - **Observation**: In the GoDeeper fold, the text states: "Liang and colleagues tested seven detectors on 91 essays that non-native English speakers wrote for an English exam. On average, the detectors called 61.22% of those real essays AI-made, and at least one detector flagged 97.8% of them. Essays by US eighth graders were judged almost perfectly. This was a small pilot study, and most of the detectors were built on an older model. Even so, the lesson is plain: a real second-language writer can be falsely flagged." However, in Quick check 1 (Question 1) explanation, the text phrases it more broadly: "Detectors have flagged most of a group of real second-language essays, so a score can be wrong."
  - **Why it matters**: A novice second-language reader could interpret the quick check explanation as meaning detectors fail on most second-language essays generally, rather than reflecting the specific 2023 pilot study sample of 91 TOEFL essays. Maintaining precise epistemic calibration is central to this course's methodology.
  - **Required fix**: Qualify the feedback explanation in Quick check 1 to explicitly reference the study sample: "In a 2023 study, detectors flagged most of a sample of real second-language essays, so a score can be wrong."

## What works

1. **Exemplary Pedagogy and Tone**:
   The course navigates the sensitive topic of AI disruption and job market shifts with exceptional maturity. It completely rejects hype and panic, grounding every assertion in verified labour data and empirical research (dossier parts A, B, and C). The framing for Gaza fellows is compassionate, practical, and empowering: it neither makes unrealistic promises about employment nor trivializes the real drop in entry-level hiring, focusing steadfastly on the habits that distinguish engineers who own their work.

2. **Visual-First Beats Architecture**:
   The transition to visual-first concept chapters is executed with remarkable discipline. Beats consistently open with purposeful diagrams or interactive canvases, limit visible text to under 70 plain words, and fold deep mechanisms, trade-offs, and failure modes into rich `GoDeeper` containers. The cognitive arc from predict block to interactive visual to transfer check creates genuine conceptual engagement.

3. **Rigorous Assessment Design**:
   The multiple-choice questions across quizzes and checks represent a masterclass in assessment design. Questions test contextual reasoning on fresh scenarios rather than rote recall. Distractors embody realistic practitioner errors without trickery. Option lengths are tightly controlled, correct answers are evenly spread across positions 0, 1, 2, and 3, and explanatory feedback is instructive and respectful.

4. **Technical Currency and Nuance**:
   The technical chapters in Module 6 (database tradeoffs, Redis versus Valkey licensing, metrics architectures, and the Outbox pattern) and Module 9 (fine-grained tokens, prompt injection risks, and AWS billing policies) avoid simplistic dogmatism. They teach how context dictates the right technical decision, honoring the realities of open-source licensing changes and system boundaries.

5. **Anti-Slop and Language Hygiene**:
   Prose is entirely free of corporate jargon, generic filler ("plays a crucial role", "delve", "seamless"), and AI attribution boilerplate. Sentences are concise, active, and tailored for second-language English readers without condescension.

## Recommendation

Revise. The course cannot pass Gate G2A until the single S2 defect (A-1: orphan canvas slug `big-app-or-understood-app` in Chapter 01.08) is remediated. All scorable dimensions exceed the threshold (average 4.90 >= 4.30, with zero scores below 4), but G2A policy strictly requires zero S1 and S2 defects. Once Defect A-1 is resolved and the minor S3 polish items are addressed, the curriculum will be in exemplary shape for G2B instructor sign-off.
