# Agent IP decision log

## 2026-10-23: Audit fixes, canvas layout rules and a blind answer-key script (v0.4.1)

**Status:** Draft for delivery lead and reviewer sign-off under `09-review-and-governance.md`.

**Problem:** Building courses 9 (logic-building) and 10 (cause-and-effect) exposed four gaps.
1. `scripts/audit-course.mjs` flagged every chapter of every course in the repository (course 8: 79 of 79). It did not count ```mermaid fences as diagrams, although the importer renders them as `MermaidDiagram`; its ```diagram count searched text with code fences already removed, so it never matched; and it required 700 prose words in quiz chapters, which must hold activities only (`04-interactive-playbook.md`).
2. `10-interactive-canvases.md` said a state machine grid may be 3 by 3. On a phone the rows sit 150px apart in a 340px picture, so only two rows fit, and labels collided in ways the registry test did not catch. Course 9 shipped two such collisions to its first phone check.
3. The blind answer-key check (`05-assessment-and-motivation.md`) had no tool, so courses 8 and 9 each wrote their own.
4. The prose minimums do not fit short soft-skills courses, and courses record different exceptions.

**Decision:**
1. Fix the audit: count ```mermaid and ```diagram fences, and skip the prose minimum for `*-quiz.md` chapters. The thresholds themselves do not change. Course 8 goes from 79 to 35 flagged chapters; the remaining flags are real.
2. State the phone layout rules for state machines (two rows, three-character labels across a row, no diagonal beside a parallel arrow) and enforce two of them in `frontend/tests/unit/canvas/registry.test.ts` (row at most 1, no overlapping edge labels). Every registered canvas passes; the course 9 collision fails the new test.
3. Add `scripts/blind-keys.mjs` (extract keyless batches, compare answers) and point the answer-key check at it.
4. Open `proposals/2026-10-23-prose-minimums-by-course-type.md`. No threshold changes until it is decided.

**Platform impact:** Test and script changes only; no reader or importer behaviour changes.

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
