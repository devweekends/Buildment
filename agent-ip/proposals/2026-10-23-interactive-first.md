# Proposal: interactive-first courses

**Status:** Approved by the architect on 2026-10-23 and applied as IP v0.4 (see `decision-log.md`). Delivery lead and second-reviewer sign-off pending.
**Raised by:** Zeeshan (architect, human sponsor), while planning the system design course.
**IP version:** v0.3 draft; this proposal would make it v0.4.

## Problem

The IP treats interactive canvases as occasional enrichment: at most one per chapter and two per module, used only when nothing simpler works. In practice our learners understand a system faster when they can play with it: push traffic up and watch a queue explode, cut the network and see two leaders, skew a clock and watch the order of events flip. Explorable explanations of this kind (for example the Raft visualisation, and recent learn-by-playing experiments from large learning products) teach the behaviour, not just the vocabulary. With two canvases per module, a 27-module system design course would have at most 54 simulations for about 135 ideas, and most ideas would be taught by prose alone.

## Change

Make interaction the default teaching move, while keeping every guard that stops it becoming decoration.

1. **Every Learn chapter teaches through at least one interactive element** the learner manipulates or steps through and sees change: a registered canvas or one of the existing interactive diagrams (`StateMachine`, `TraceRequest`, step-through `Steps`). Read (set-the-scene) chapters may open with one. Quiz and gate chapters still have none.
2. **Density:** per chapter, at most one primary canvas plus one small step-through or toggle; the per-module cap of two canvases is removed. The other density budgets (callouts, quizzes, open questions) are unchanged. Two high-effort interactions are still never back to back.
3. **The teaching contract stays and becomes mandatory everywhere:** predict before playing, "what changed" in words after, a transfer check (quiz, code exercise or build) later in the chapter or module. Slider use never counts as completion.
4. **Motion is allowed when it is the model moving** (messages travelling, queues filling, clocks drifting), with Play, Pause, Step and Reset, nothing auto-playing, and a reduced-motion path. This replaces the narrower "motion only for a state change" wording.
5. **Reuse before custom.** A course plans its interactive elements on a small set of reusable renderers and a shared seeded simulation core, so most canvases are data plus a spec. The system design course's `work/system-design/03-simulation-kit.md` is the first such kit. A custom component needs a written reason.
6. **The audit enforces it.** `scripts/audit-course.mjs` reports any Learn chapter with no interactive element as a defect.

## Files that change if approved

- `README.md` (non-negotiables, interactive canvases section), `00-principles.md` where it describes components.
- `04-interactive-playbook.md` → Custom interactive canvases, Placement matrix, Density budgets.
- `10-interactive-canvases.md` → When to use a canvas, Motion, Placement and density; add the kit and simulation core.
- `agents/interaction-designer.md`, `agents/interactive-canvas-builder.md`, `agents/chapter-writer.md`, `agents/critic.md`, `agents/course-auditor.md`.
- `scripts/audit-course.mjs`.
- `decision-log.md`, version bump to v0.4.
- The `buildment-course-builder` agent wrapper (outside the repository) gets one line saying interactive-first is the house standard and pointing to these files.

## Risks and how we hold them

| Risk | Hold |
|---|---|
| Build cost: many more canvases | Reusable renderers; data-only canvases; build the kit first and prove it on one sample chapter at G3 |
| Phone performance and data use | Kit size budget (60 KB gzipped), server-rendered first frame, no charting library, check at 375px on a mid-range phone |
| Illusion of understanding | Predict, explain the delta, transfer check; critics fail any canvas whose claim the learner could not state |
| Inaccurate models | Pure, tested models with stated limits; the technical validator checks each rule against the research dossier |
| Decoration creep | "If the chapter is not stronger with it, remove it" stays the acceptance test |

## Requested review

- Delivery lead: confirm interactive-first is the standard for all new courses, and whether existing courses are upgraded when next edited.
- Second reviewer: check the density change, the motion rule and the audit rule for conflicts with the rest of the IP.

No published course or platform behaviour changes until this is approved.
