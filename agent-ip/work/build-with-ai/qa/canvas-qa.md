---
artifact: canvas-qa
course: build-with-ai
template: 14B (one report for all 22 canvases)
date: 2026-10-24
---

# Canvas QA: build-with-ai

Every Learn chapter teaches through one registered canvas (agent-ip v0.4). Twenty-one are data on the shared renderers (sequence, state machine, factor) with no new code; one (`six-month-hours-split`) is a slider model with its own tests. Each has a `spec.md` on template 14A next to its `data.ts`.

## The canvases

| Ch | Slug | Renderer | Title | Teaching claim (from the spec) |
|---|---|---|---|---|
| 1.2 | `ai-missing-context` | sequence | Same question, with and without the facts | An AI answer is only as good as the context it gets: the same question gives a generic answer, adding facts only you know changes it, and some facts the AI still cannot know, so you check them with people and official pages |
| 1.3 | `who-makes-the-call` | state-machine | Who makes the call? | AI can draft options; a person checks, decides and owns the result |
| 1.4 | `answers-or-hints` | state-machine | Answers or hints: same AI, two results | The same AI used two ways: asking for answers raises practice scores but leaves you weaker alone; asking for hints and checking your own steps keeps the learning |
| 1.5 | `big-app-or-understood-app` | factor | A big app or an understood app? | Khaled's big store built in a weekend loses to Yara's small, understood Qasir slice on what a reviewer checks; only when "Number of features" matters most, and the other checks matter only a little, does the big app win |
| 2.2 | `before-you-paste` | state-machine | Before you paste: Mahmoud's club job | Before anything goes into an AI tool, a short check decides what may go in: keys and passwords never; anything a stranger should not read is made safe (names, numbers and keys replaced with made-up ones) or not pasted; then you send, and you check the answer before you use it |
| 2.3 | `pick-a-tool-for-the-job` | factor | Which kind of tool for this job? | The right kind of tool depends on the job: with every need weighted the same, the chat assistant leads; when "stays inside my sources" matters most, the source notebook wins; when "finds recent pages" matters most, the search tool with sources wins |
| 2.4 | `keep-work-in-your-files` | sequence | Where does Ahmad's work live? | Work kept only in a tool's chat history is lost when the tool changes; work copied into your own notes and repository survives the next change |
| 3.2 | `close-it-and-recall` | state-machine | Close it and recall | Reading a clear explanation feels like knowing; closing it and recalling from a blank page shows the gaps; re-studying only the gaps, then recalling again days later, is what builds memory |
| 3.3 | `five-angles-on-caching` | sequence | Five angles on caching | Each of five angles on one topic (a plain explanation in your own words, a picture, a worked example, a failure case, building or teaching it) catches a gap the others miss |
| 3.4 | `ai-quiz-partner` | sequence | Explain it, or quiz me? | When you ask the AI to quiz you one question at a time and wait for your answer, you do the recall; when you ask it to explain, it does the work |
| 3.5 | `listen-then-read` | sequence | Listen first, then read and check | Sources first: trusted sources go into a source notebook; the audio overview is for listening while you walk or wait; then you read the sources; then you check one claim the audio made against the page and find a detail it got wrong or left out |
| 3.6 | `note-page-lifecycle` | state-machine | A note page grows up | A note page grows up: captured, rewritten in your own words, linked to a lab, reviewed weekly |
| 4.2 | `daily-lab-loop` | state-machine | One lab day, in four parts | A lab day has four parts, study, build, break one thing and write, in about 30 to 45 minutes; when the build gets stuck you loop back to a smaller step instead of running past your time, and a power cut ends the day at "write what you have", which still counts as a lab day |
| 4.3 | `plan-a-lab-with-ai` | sequence | Planning lab day 1 with an AI chat | Ask an AI chat for a structured lab plan with your goal, time, level, tools and what to break; then cut it to your time and check each command against the official docs and each package on the official package site |
| 4.4 | `url-shortener-stop-a-part` | sequence | Stop one part of Qasir and watch | Breaking one part on purpose shows what it is for |
| 4.5 | `lab-log-commit-push` | state-machine | From a lab entry to GitHub | One lab entry becomes a commit and a push in a fixed order: write the entry, check for secrets, commit with a clear message, push |
| 5.2 | `six-month-hours-split` | slider | How many areas fit in your plan? | AI makes building an area faster, but it does not make learning it much faster, so a strong project needs enough total weeks and a large share of them spent learning |
| 5.3 | `week-plan-check-resources` | sequence | Yara's caching week: ask, check, then plan | An AI is a fast way to find what to learn in a week, but its list becomes a plan only after each item is checked to exist and be current: one item in six here is a book that does not exist, it looks as real as the others, and its author is a real writer, so only a search for the title itself settles it |
| 5.4 | `two-options-trade-off` | factor | Where should Qasir count clicks? | An AI's confident default is often right for a different project: the cache counter it suggests wins only when "fast under many clicks" matters most and everything else matters little, which describes heavy traffic; Yara's weights, set by her project's facts, pick counting in the database |
| 5.5 | `reuse-open-source-safely` | state-machine | Reuse open-source code, within the licence | Reusing open-source code safely is a sequence: find a project, check its licence first, check its health, read it in order (README, run it, one folder), reuse only within the licence, and credit it; copying from a project with no licence is refused, and so is replacing the licence notice with a thank-you |
| 6.2 | `commits-to-article` | sequence | From Salma's week 6 log to two posts | A week of lab logs becomes a short article in your own voice: you draft from the log, the AI edits and asks questions, you check every fact against your repository, then you adapt the post for two other platforms without changing a fact |
| 6.3 | `disclose-ai-help` | state-machine | Before you publish: say when AI helped | Before you publish, list what AI did, write an AI-use line with three parts (the tool, what it did, what you checked), check the rules of the place where you post, then publish; "all my own work" is refused when it is not true, and a mistake found later is corrected in the open |

## Model
- Sequence and state-machine canvases have no numeric model; their steps were checked against the chapter text by both critics in two rounds (names, numbers, order).
- The three factor canvases: every total quoted in a chapter or a `tryThis` line was recomputed by the writers (all weight settings for `big-app-or-understood-app` and `two-options-trade-off`) and again by critic A in round 1 (11 totals, all matched).
- `six-month-hours-split`: 10 model tests (default, one month, 20% and 80% learning share, three months, the corners of the ranges, non-numbers, and three "What changed" sentences). The default and the learning-share sum match chapters 5.2, 5.7 and 6.5.

## Teaching
- Every canvas has a predict before it in its chapter, a paragraph on what it showed after it, and a transfer MCQ on a new case later in the chapter.
- The first `tryThis` line points at the step or setting that answers the chapter's predict, without restating the question (round 1 fix).
- Every canvas states its limits in `limits`; scores in factor canvases are labelled the course's illustrative judgement.

## Visual, accessibility and mobile
- `frontend/tests/unit/canvas/registry.test.ts`: every slug registered on both sides, a spec next to every canvas, every sequence and state machine fits a phone (labels inside the picture, no overlapping edge labels, state machine grids at most 3 by 2), factor weights and scores on their scales, slider inputs well formed and finite at every corner.
- Full canvas suite: 26 files, 358 tests passed (2026-10-24).
- In the reader at 375px in the dark theme: `six-month-hours-split` (cards, bars, three sliders; the Months slider moved with the keyboard Home key to 1 month, giving 32 hours, 2 of 12 areas ready and the "What changed" sentence) and `url-shortener-stop-a-part` (narrow sequence layout, Step 1 of 8, Back, Next, Play, step chips). No horizontal scroll (page width 375).
- Known on phones: three-character labels on edges inside one column ("you", "own" in `who-makes-the-call`, "run" in `before-you-paste`, "go" in `lab-log-commit-push`) sit close to their pills, as in course 10's `five-whys-chain`.

## Technical
- Frontend typecheck clean; eslint on `src/canvas` and `tests/unit/canvas` clean.
- No em or en dashes and LF line endings in all 44 canvas files.

## Defects and limits
- Eighteen of the 22 canvases are step-throughs: the learner moves through the steps but cannot change the outcome. This is the design of the shared sequence and state-machine renderers, which agent-ip allows ("manipulates or steps through"). Critic A (round 2, O-5) suggests letting the learner choose a step in four canvases that model a choice; that needs a renderer change and is left for the platform owner.
- Only two canvases were opened in the reader at 375px; the other twenty rely on the registry phone-fit tests.
