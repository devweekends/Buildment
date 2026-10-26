---
artifact: critique
course: build-with-ai (v2)
round: 2
critic: A (second model family)
scorecard_average: 5.00
s1: 0
s2: 0
s3: 0
fixed: 4
partly: 0
open: 0
---

## Scorecard

| # | Dimension | Score | Note |
|---|---|---|---|
| 1 | Outcome alignment | 5 | Every chapter directly advances an observable outcome from O1 to O17. Build tasks, demo kits, and capstone requirements map cleanly to verifiable portfolio evidence. |
| 2 | Domain specificity | 5 | Examples and operational realities are calibrated for Gaza fellows: mobile-first touchscreen workflows, intermittent power cuts, weak mobile data, local community clinics and cafes, and concrete fellowship pathways (GSoC, Outreachy, LFX). |
| 3 | Depth over coverage | 5 | Selects core engineering fundamentals and explores them deeply: why assistants output common defaults, database workload trade-offs, Redis versus Valkey licensing history, row versus columnar metrics storage, and the Outbox pattern. |
| 4 | Prose quality | 5 | Direct, calm plain English adhering to authoring standards. Sentences are concise (under 20 words); writing is free of hype, filler, and corporate jargon. |
| 5 | Chapter structure | 5 | Learn chapters follow the beats format: visual first, at most 70 visible words per beat, GoDeeper containers for deep mechanisms and trade-offs, predict blocks before canvases, and transfer checks after canvases. |
| 6 | Interaction purpose | 5 | Canvases require genuine cognitive reasoning: predicting deltas, evaluating workload trade-offs, and sorting claims by evidential quality rather than passive interaction. |
| 7 | Assessment quality | 5 | Keys are unambiguous and verified. Distractors target authentic conceptual errors. Option lengths are balanced, and correct answers are evenly spread across positions 0, 1, 2, and 3. Explanations are instructive and respectful. |
| 8 | Difficulty calibration | 5 | Scaffolding fades purposefully from fully worked step-by-step traces in early modules to independent synthesis, decision records, and capstone defense in modules 10 and 11. |
| 9 | Cognitive load | 5 | Extraneous cognitive load is eliminated. New technical terms receive immediate physical anchors and clear glossary definitions. |
| 10 | Prerequisite integrity | 5 | Conceptual dependencies are respected: Git workflows and pull request basics precede squash-merge histories; personal access tokens precede MCP security boundaries and prompt injection defenses. |
| 11 | Technical accuracy | 5 | Rigorously verified against research dossier parts A, B, and C: licensing timelines, SQLite WAL single-writer constraints, VictoriaMetrics versus Prometheus storage architectures, and AWS Cost Explorer API parameters. |
| 12 | Production-grade coverage | 5 | Covers real production failure modes: token boundary leaks, race conditions, partial database writes, distributed clock drift, and idempotent webhook processing. |
| 13 | Security and integrity | 5 | Exemplary security discipline: immediate credential revocation, fine-grained token scopes with strict expiry dates, MCP read-only server boundaries, and prompt-injection mitigations. |
| 14 | Accessibility | 5 | Mobile-first layout, minimum 44px touch targets, token-based contrast, keyboard accessibility, and text alternatives for visual models. |
| 15 | IP protection | 5 | Teaches analytical frameworks and evaluation models while withholding capstone solutions, requiring genuine learner synthesis. |
| 16 | Variant distinctiveness | not applicable, no variants | Single canonical course track without multi-product variant branching. |
| 17 | Continuity | 5 | Narrative consistency across characters (Yara, Khaled, Rana, Manar, Yazan, Hanan, Osama, Ruwa, Murad, Ghada, Wisam, Nabil, Salma, Hani, Haya, Samir, Alaa, Jawad, Bayan, Sami, Ehab, Ibrahim) is maintained. All canvas slugs resolve to verified data exports in canvases.md. |
| 18 | Learner agency and curiosity | 5 | Centers learner agency: interrogating default answers, measuring empirical workloads, owning decisions, and defending choices against explicit rubrics. |
| 19 | Instructor alignment | cannot be scored, G2B pending | Pre-signoff draft pending G2B instructor review per curriculum roadmap guidelines. |
| 20 | Interactive canvas quality | 5 | All canvas specifications in canvases.md are mathematically sound, bounded, responsive, and paired with clear interactive hints and transfer feedback. |
| 21 | Explanatory depth | 5 | Fully passes prose-depth audit. GoDeeper folds detail causal mechanisms, trade-offs, worked traces, failure modes, and dated primary sources. |
| 22 | Visual explanation quality | 5 | Mermaid diagrams and interactive canvases argue and clarify causal relationships rather than restating narrative prose. Topology diagrams show clear public-private boundaries and event flows. |

## Defects

### S1

None.

### S2

None.

### S3

None.

### Status of Round 1 Defects

- **ID**: A-1 (S2)
  - **File path**: `courses/build-with-ai/01-ai-as-an-enabler/01.08-plenty-of-ai-few-strong-projects.md`
  - **Location**: Heading `## Weighing the two projects`
  - **Status**: Fixed.
  - **Observation in round 1**: The chapter embedded `<InteractiveCanvas slug="big-app-or-understood-app" />`, which was flagged as missing from the canvas deliverable bundle.
  - **Verification in round 2**: The canvas data file is fully implemented and exported in `canvases.md` (lines 601 to 640) under `export const bigAppOrUnderstoodApp: FactorSpec`. The five evaluation factors ("Simple to build", "Fast to write", "Can explain every line", "Safe against bad inputs", "Working now") and their weights precisely match the text of Chapter 01.08, yielding Khaled's 23 points versus Yara's 44 points. Component resolution is fully verified.

- **ID**: A-2 (S3)
  - **File path**: `courses/build-with-ai/01-ai-as-an-enabler/01.02-why-ai-looks-bigger.md`
  - **Location**: Heading `## A launch claim meets an outside test`
  - **Status**: Fixed.
  - **Observation in round 1**: The visual `claim-type-sorter-devin` is a watch-only automated scene animation, but the beat visual lacked an explicit visual cue distinguishing it from touch-interactive canvases.
  - **Verification in round 2**: In `canvases.md` line 823, the `claimTypeSorterDevin` specification defines `hint: "Watch: it plays on its own. Press Replay to see it again."`. Per the `BeatFrame` layout contract in `10-interactive-canvases.md`, this hint is rendered directly beneath the animation visual, giving learners on mobile touchscreens immediate notice that the visual is an automated playback scene.

- **ID**: A-3 (S3)
  - **File path**: `courses/build-with-ai/08-grow-fast-go-deep/08.04-go-deep-with-a-team.md`
  - **Location**: Heading `## Three ways to spend three months` (GoDeeper fold: `Go deeper: a fellow in Gaza and the missing facts`)
  - **Status**: Fixed.
  - **Observation in round 1**: The text noted uncertainty regarding stipend disbursement to fellows in Gaza without providing a concrete operational contingency.
  - **Verification in round 2**: The chapter text in lines 3687 to 3688 now explicitly instructs the fellow: "Before you apply, also ask the fellowship coordinator and past participants whether payment reached them. If the stipend path cannot be confirmed, your first fallback is a community project that you join yourself. It needs no stipend, no application and no one's approval." This gives learners a clear verification step and a viable, unblocked fallback.

- **ID**: A-4 (S3)
  - **File path**: `courses/build-with-ai/10-share-the-work-the-human-way/10.05-ai-help-without-the-ai-look.md`
  - **Location**: Heading `## Check your understanding` (Quick check 1 explanation)
  - **Status**: Fixed.
  - **Observation in round 1**: The quick check explanation stated that detectors flagged most of a group of real second-language essays without referencing the specific pilot study sample size.
  - **Verification in round 2**: Line 6087 now explicitly qualifies the finding: "In a 2023 study, detectors flagged most of a sample of 91 real second-language essays, so a score can be wrong." This matches the research dossier citation (C69) and preserves epistemic precision.

## What works

1. **Exemplary Pedagogy and Tone**:
   The course handles AI capabilities, workplace disruption, and entry-level hiring shifts with remarkable clarity and balance. It rejects both panic and promotional hype, anchoring every claim in verified empirical data and labour statistics (dossier parts A, B, and C). The framing for Gaza fellows is practical, realistic, and empowering: it makes no false promises about employment while providing concrete habits that allow engineers to demonstrate genuine technical ownership.

2. **Visual-First Beats Architecture**:
   The transition to visual-first beats is executed with thorough discipline across all Learn chapters. Each beat opens with a purpose-built diagram or interactive canvas, limits visible text to under 70 plain words, and moves deep mechanisms, trade-offs, and failure modes into structured GoDeeper folds. The pedagogical cycle of predict block, interactive canvas, and transfer check provides active cognitive engagement.

3. **Rigorous Assessment Design**:
   The multiple-choice questions throughout quizzes and checks maintain exceptionally high standards. Questions assess applied reasoning in realistic new scenarios rather than rote recall of facts. Distractors reflect authentic engineering misconceptions. Correct answer positions are evenly distributed across 0, 1, 2, and 3, option lengths are balanced, and explanatory feedback is clear and instructive.

4. **Technical Depth and Contextual Reasoning**:
   The curriculum avoids dogmatic rules. In Module 6 (database selections, Redis versus Valkey licensing changes, Prometheus versus VictoriaMetrics, and the Outbox pattern) and Module 9 (fine-grained access tokens, prompt injection risks in issue triage, and AWS billing policy scopes), the text demonstrates how project context dictates technical choices.

5. **Anti-Slop and Language Hygiene**:
   The prose adheres strictly to plain English standards for second-language readers. Sentences are concise and active. The text is entirely free of corporate jargon, generic filler phrases, and AI boilerplate.

## Recommendation

Pass Gate G2A. All 20 scorable dimensions achieve a score of 5, producing a scorecard average of 5.00 (exceeding the 4.30 threshold, with no dimension below 4). The single S2 defect from round 1 (A-1) is verified resolved, and all three S3 polish items (A-2, A-3, A-4) are verified fixed. Zero S1, S2, or S3 defects remain across the curriculum additions and interactive canvas implementations. The package is ready for G2B instructor confirmation.
