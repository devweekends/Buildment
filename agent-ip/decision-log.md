# Agent IP decision log

## 2026-10-24: Never ask before you teach (IP v0.5.3)

**Status:** Draft for delivery lead and reviewer sign-off under `09-review-and-governance.md`.

**Problem:** The architect found that set-the-scene chapters asked learners about things the module had not taught yet (time to first byte before handshakes, a cache stampede before caching patterns, a design sketch before the building blocks).

**Decision:** Every question must be answerable from earlier chapters or everyday intuition. Set-the-scene chapters show the problem and ask at most an everyday "what do you notice?" question; mechanism predictions move to the Learn chapter that teaches them.

**Files changed:** `03-authoring-standards.md`, `work/system-design/context-packs/module-writer-brief.md`.

**Review:** Delivery lead and one additional reviewer pending.

## 2026-10-23: Two visual registers and a text QA check (IP v0.5.2)

**Status:** Draft for delivery lead and reviewer sign-off under `09-review-and-governance.md`.

**Problem:** The architect compared five versions of the launch-day canvas (the card style, a Gemini 4 Argon version in the card style, and Gemini versions in bold, illustrated and sleek styles). They chose the card style for core concepts and the illustrated style for other beats, and rejected versions where text was "merged with some shapes". Nothing in the IP said which style to use when, and no check caught a label crossed by a line or spilling out of its card: the geometry tests only cover scene actors and tags.

**Decision:** Name two visual registers in `10-interactive-canvases.md` (card style by default and for core concepts; illustrated for story beats), with a reference canvas for each. Add `scripts/canvas-text-qa.js`, a browser check that lists labels touching other labels, lines or shapes, or running out of their card or the picture, and require an empty result at every sampled state in the QA checklist and the canvas builder role. Allow soft gradients in the illustrated register only.

**Files changed:** `10-interactive-canvases.md`, `agents/interactive-canvas-builder.md`, `scripts/canvas-text-qa.js` (the in-page check), `scripts/canvas-text-qa.mjs` (a headless runner on Playwright and the installed Edge that drives every canvas through its states and reports).

**Platform impact:** None. The check runs in a browser on the existing `/workspace/canvases` preview page.

**Review:** Delivery lead and one additional reviewer pending.

## 2026-10-23: Every Learn chapter has a playable beat (IP v0.5.1)

**Status:** Draft for delivery lead and reviewer sign-off under `09-review-and-governance.md`.

**Problem:** The first Module 1 and Module 2 chapters of the system design course were written with scenes only: short animations the learner watches. The roadmap promised things to play with (drag users onto a server, sort requirements, tap blocks), and the architect asked for interactive elements "where you can kind of play with them". Nothing in the IP or the audit required a chapter to have one.

**Decision:** A Learn chapter in beats format needs at least one playable beat: a visual the learner drags or taps and sees respond. Scenes stay for the other beats. Reusable playables are built as data-driven primitives. The audit flags a beats Learn chapter whose canvases are all scenes (`no playable`), by reading each slug's `data.ts`.

**Files changed:** `03-authoring-standards.md`, `10-interactive-canvases.md`, `scripts/audit-course.mjs`.

**Platform impact:** None; custom canvases already exist. System design Modules 1 and 2 gain playables before import.

**Review:** Delivery lead and one additional reviewer pending.

## 2026-10-23: Visual-first Learn chapters in beats (IP v0.5)

**Status:** Approved by the architect (human sponsor) on 2026-10-23 after reviewing a prototype of chapter 10.6. Delivery lead and one additional reviewer pending. Proposal: `proposals/2026-10-23-visual-first-chapters.md`.

**Problem:** The first two chapters written under v0.4 followed the 1,200-prose-word rule and read as walls of text, and their canvases opened with rows of number cards and control panels above a small, still picture. The architect's review: long text loses attention fast, visuals first is better, and the interactive elements were "super super bad".

**Decision:** A Learn chapter (`format: beats`) is four to eight beats. Each beat is a short heading, one visual first (full width, moving on its own when the idea moves, changed by touching the picture, numbers and a verdict inside it), at most 70 visible words that explain it, and an optional `GoDeeper` fold for the mechanism, trade-offs, failure modes, sources and code. 300 to 700 visible words per chapter and at least 900 including folds. A predict before the key beat and one or two quick-check questions at the end. Budgets: one visual per beat, at most 40 JSX tags, 3 assessment interactions, no `BigWordAlert`. Beat visuals play while on screen and loop, replacing v0.4's "nothing plays until Play" for this kind of visual. Build, Check and Gate chapters keep the prose rules.

**Files changed:** `README.md`, `00-principles.md`, `02-course-architecture.md`, `03-authoring-standards.md` (owns the beat rules), `04-interactive-playbook.md`, `06-quality-gates.md`, `07-research-and-sources.md`, `08-templates.md`, `10-interactive-canvases.md` (Beat visuals, layout, motion, QA, component library), `agents/chapter-writer.md`, `agents/interaction-designer.md`, `agents/interactive-canvas-builder.md`, `agents/critic.md`, `agents/course-auditor.md`, `agents/orchestrator.md`, `scripts/audit-course.mjs`. The `buildment-course-builder` agent wrapper points to the beat rules.

**Platform impact:** a `GoDeeper` MDX block, a `BeatFrame` for beat canvases, and a reusable animated `scene` renderer, proven by the rebuilt system design chapters 8.4 and 10.6. Existing courses are unaffected until a chapter is next edited, because the audit applies beat rules only to chapters marked `format: beats`.

**Review:** Delivery lead and one additional reviewer pending.

## 2026-10-23: Interactive-first courses (IP v0.4)

**Status:** Approved by the architect (human sponsor) on 2026-10-23. Delivery lead and one additional reviewer pending under `09-review-and-governance.md`. Proposal: `proposals/2026-10-23-interactive-first.md`.

**Problem:** Canvases were capped at one per chapter and two per module and treated as enrichment. A system design course with about 135 ideas that move over time (traffic, replicas, clocks, partitions) could only animate a few of them, and learners understand these systems faster by pushing them than by reading.

**Decision:** Every Learn chapter teaches through at least one interactive element the learner manipulates or steps through, with predict before, "what changed" after and a transfer check. Per chapter: one primary canvas plus one small step-through or toggle; no per-module cap. Motion is allowed when it is the model moving, with Play, Pause, Step and Reset and a reduced-motion path. Time-based canvases build on a shared seeded simulation core (`frontend/src/canvas/sim/`) and reusable kit renderers, starting with `timeline`. The audit flags a Learn chapter with no interactive element.

**Files changed:** `README.md`, `00-principles.md`, `04-interactive-playbook.md`, `10-interactive-canvases.md`, `agents/interaction-designer.md`, `agents/interactive-canvas-builder.md`, `agents/chapter-writer.md`, `agents/critic.md`, `agents/course-auditor.md`, `scripts/audit-course.mjs`. The `buildment-course-builder` agent wrapper (outside the repository) now points to this rule.

**Platform impact:** New shared code under `frontend/src/canvas/sim/` and `renderers/timeline/`, proven by the system design sample chapters 8.4 and 10.6. Existing courses: the audit now reports 33 Learn chapters in `ai-engineering-interview` with no interactive element. Recommendation for the delivery lead: upgrade existing courses when each chapter is next edited, not in one sweep.

**Review:** Delivery lead and one additional reviewer pending.

## 2026-10-21: Architect requirements written into the IP

**Status:** Draft for delivery lead and reviewer sign-off under `09-review-and-governance.md`.

**Problem:** Several decisions the architect had made lived only in conversations and PR descriptions: the fellowship audience, the dash and attribution ban, the personalization rules, the reference builds, the canvas renderers, assessment checks, readability, quiz integrity, pre-PR checks and the PR process. Agents could not follow rules that were not written down.

**Decision:** Add each one to the document that owns its topic, update the affected agent prompts, and map every requirement in `11-architect-requirements.md` (sections 8 to 17). Correct two statements that disagreed with the code: the audit's option-length warning is 10%, not 1.25 times, and quiz chapters cannot hold a `ChapterRecap`.

**Platform impact:** None in this change. The seat cap and draw and a mentor follow-up thread remain platform gaps. Integrity signals and camera snapshots shipped in PR #23, and the `%%product.name%%` rules in PR #21.

**Review:** Delivery lead and one additional reviewer pending.

## 2026-10-21 — HLD diagrams and system-design canvases

**Status:** Draft for delivery lead and reviewer sign-off under `09-review-and-governance.md`. Proposal: `proposals/2026-10-21-hld-visuals.md`.

**Problem:** The IP defaulted to static SVG for conceptual architecture. That can lead agents to upload pictures of high-level designs without explaining request paths, public/private boundaries, or the effects of load and failure. A DNS → load balancer → private servers example exposed the ambiguity.

**Decision:** Use `MermaidDiagram` first for HLD topology and request paths. Keep static SVG for compositions Mermaid cannot make legible. Plan a separate registered, deterministic `InteractiveCanvas` when learners must vary conditions and observe a causal outcome; if no honest model is feasible, document a worked trace and the reason. Require the HLD diagram and canvas decision in module briefs, interaction maps, chapter briefs, and review.

**Platform impact:** Existing Mermaid and canvas slots support this instruction. Each new canvas still requires a coded and reviewed slug; the IP does not claim a generic authorable canvas editor exists.

**Review:** Delivery lead and one additional reviewer pending. No published course structure changes in this IP update.
