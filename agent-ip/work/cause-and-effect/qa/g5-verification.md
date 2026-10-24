---
artifact: qa-report
course: cause-and-effect
gate: G5 (two critique rounds done; human review required before publish)
date: 2026-10-23
---

# Verification report: cause-and-effect

## Structure
- 8 modules, 47 chapters, 1,130 minutes from chapter frontmatter (about 19 hours, `estimatedHours: 19`).
- Graded items: 110 (multiple-choice questions and predictions). Open questions: gates 1 to 7, the review in gate 8.5 and the capstone. Canvases: 23, one in every Learn chapter (agent-ip v0.4, interactive-first); 22 on the existing sequence, state-machine and factor renderers, and one custom model-backed canvas (`order-pile-stock-flow`, 6.3) with its own model test.
- `content:validate:source --course cause-and-effect`: 47 of 47 OK.
- `content:audit --course cause-and-effect`: 0 errors, 0 warnings.
- `agent-ip/scripts/audit-course.mjs content/import/cause-and-effect` (main, with the PR #40 fixes and the v0.4 interactive rule): Needs work 0. Every set-the-scene, teaching and capstone chapter has at least 1,200 prose words and a diagram; every gate at least 700; every Learn chapter an interactive element; every quiz chapter five questions.
- No em or en dashes. No company, product or AI tool names, no links.

## Research (G1)
`research.md`: 59 sourced claims from 34 sources, 16 unverified and kept out of learner-facing text. Its outline changes were applied before the roadmap. Critic B checked every method claim against the dossier in both rounds; the five whys origin, the Strathern wording of the saying about targets, the just culture limit and the avoided stories (aircraft armour, cobra bounty, Washington Monument) follow it.

## Critique (G5)
Two blind critics on a smaller review model, from the same model family as the drafters (risk R1).

| Round | Critic A (pedagogy, assessment) | Critic B (slop, continuity, accuracy) |
|---|---|---|
| 1 | 0 S1, 6 S2, 18 S3; average 3.69; revise | 0 S1, 5 S2, 15 S3; average 3.9; revise |
| 2 | 24 of 24 fixed or partly fixed; new 0 S1, 1 S2, 5 S3; average 4.08 | 20 of 20 fixed or partly fixed; new 0 S1, 0 S2, 10 S3; average 4.1, every scored dimension at 4 or above |

The round 2 S2 (gate 5.6, a case whose facts contradicted its intended cause) and the round 2 S3 items were fixed in round 3, together with the v0.4 interactive elements. agent-ip allows two critique rounds before a human decision (`agents/orchestrator.md`), so no third critic round was run: **the scorecard averages after round 2 (4.08 and 4.1) are below the 4.3 pass line, and a human reviewer must decide whether the round 3 fixes meet it.** Reports: `critique-a.md`, `critique-b.md`, `critique-a-r2.md`, `critique-b-r2.md`.

## Blind answer-key review
`agent-ip/scripts/blind-keys.mjs`, keyless batches, a separate review agent that saw only questions and options.

| Run | Items | Matched |
|---|---|---|
| Draft | 105 | 105 |
| After revision round 1 | 110 | 109 (3.1 predict had two defensible answers; rewritten) |
| After round 3 | 110 | 110 |

Low or medium confidence items were checked in their chapters: all but one are predicts whose case sits in the prose just above. The quiz item 4.6 Q2 lacked the fact that separates a hook from a rebuild; the costs were added.

## Canvases
- Frontend canvas tests: 12 files, 185 tests passed, including the label-fit and label-overlap checks for every state machine and sequence at phone and desktop widths, and the `order-pile-stock-flow` model tests. Frontend typecheck clean; eslint on `src/canvas` and `tests/unit/canvas` clean.
- Every canvas has a `spec.md` on template 14A with its teaching claim and limits. Each chapter puts a predict before its canvas and a transfer question after it.

## Import and click-through
- Imported into a scratch PostgreSQL 16 database on drive C (D: was short of space earlier): 8 modules, 47 chapters, 128 blocks.
- Signed in as mentee1@buildment.dev and enrolled from the catalog. All 47 chapter pages returned 200 with no render error.
- At 375px: the custom 6.3 canvas (chart, cards, three sliders, switch; the switch changes the highest pile from 36 to 12 orders), and the 6.2 loop canvas in dark mode. No sideways scroll.
- At desktop width in the light theme: 1.2 knowledge check answered right ("Correct! Well done", +100%, every option explained) and wrong ("Wrong answer", every option explained); after a reload the chapter and the curriculum both show 1 of 2 checkpoints, so progress is saved.
- Harness limits, not course problems: clicks and scrolling under the emulated phone viewport often missed, so answers were clicked at desktop width; on `localhost` the shared browser held another app's `__Secure-` session cookie, so the preview ran on 127.0.0.1.

## Found on the way (for the IP and platform owners)
- `server/scripts/import-course.ts` strips `ChapterRecap` from every `-checklist.md` gate, while agent-ip (`02-course-architecture.md`) puts the recap in the gate. Following the IP therefore shows learners no recap at all. Needs an owner decision.
- `audit-course.mjs` counts `StateMachine` as an interactive element, but in MDX `StateMachine` renders a static `MermaidDiagram`. This course uses registered canvases instead.
- `TraceRequest` always shows an actor badge (default "API"), so it does not suit non-technical courses as written.
