# Agent IP decision log

## 2026-10-23: Lessons from building the AI interview course

**Status:** Draft for delivery lead and reviewer sign-off under `09-review-and-governance.md`.

**Problem:** Building and reviewing the AI engineering interview course (PR #34) found mistakes the IP did not prevent. The correct prediction was the first option in 33 of 35 blocks, yet `content:audit` gave 0 warnings, because nothing checked position and the platform does not shuffle options. The routing table and decision log named specific models and their vendor. The blind answer-key check ran on a model from the drafters' family. Chapter 5.5 showed a guessed test count (18 deselected; a real run gives 38), and a 7.3 snippet needed LangGraph 1.2 under a `>=1.0` pin. Idioms such as "on vibes" reached the prose. Two builders shared one worktree and one overwrote the other's roadmap. The writer pack named local machine paths.

**Decision:** `content:audit` warns once per course when one position holds 70% or more of the correct answers (6 or more predictions, or 6 or more multiple-choice questions), documented in `04-interactive-playbook.md` → Option-length hygiene. Committed work files name models by role (`01-agent-system.md` → Model policy, `agents/orchestrator.md` → Model routing). A same-family re-answer does not check the keys, and the PR says who checked them (`05-assessment-and-motivation.md` → Answer-key check, `agents/assessment-designer.md`, `06-quality-gates.md` → Before a pull request). Expected output is copied from a real run at the pinned versions, and pins cover every snippet (`agents/technical-validator.md`, `06-quality-gates.md` → Technical validation checklist). Plain English lists the idioms with rewrites (`03-authoring-standards.md`). One coordinator per course branch (`agents/orchestrator.md` → Rules, `09-review-and-governance.md` → Pull requests). Context packs use path placeholders (`agents/orchestrator.md` → Context pack rules).

**Platform impact:** The audit check is new code in `server/scripts/audit-course-structure.ts`, with tests. On existing courses it raises one new warning: `multi-vendor-marketplace` has the correct prediction first in 20 of 21. No course content changes in this change.

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
