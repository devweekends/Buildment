# Proposal: the visual lab module, one per challenge

**Status:** Proposal only. Nothing in `agent-ip/` has been changed to apply it. The first module that follows it, `courses/system-design/30-visual-lab-design-a-url-shortener/`, passes today's audits without any rule change. Delivery lead and one additional reviewer sign-off pending.
**Raised by:** Zeeshan (architect, human sponsor), feedback of 2026-10-25.
**IP version:** v0.5.3; this would make it v0.6.

## Problem

Labs so far are one beat inside a chapter (chapters 2.5, 4.9 and 20.6 each embed a board next to prose). That gives the learner a small board in a narrow column, with its settings crowding the page, and a lab that scores only capacity, p99, availability and cost. The architect's feedback was three things. A system design challenge should have its board as its own module, with its own page. The board should have its component palette on the left and its settings in a dark drawer that opens only when a component's hover icon is clicked, as the reference product does. And a lab should say whether a design passes all checks, functional and non-functional, and let the learner watch the system behave: traffic, saturation and failures.

## Change

1. **A visual lab module is a module of its own.** One per challenge, placed after the challenge's case-study module, named `NN-visual-lab-<challenge>` (for example `30-visual-lab-design-a-url-shortener`). Its title starts with "Visual lab:". It is followed, later, by a code lab module for the same challenge. The module holds five chapters, in this order: a Read chapter that sets the scene and lists the checks (set-the-scene in the file name, so the structure audit finds it), the Build chapter that holds the board (`stepType: Build`, `format: beats`, a `<Lab slug="..." />` that sits in its own beat), a Learn chapter that reads each failure as a lesson, a `-quiz.md` chapter, and a `-checklist.md` Gate chapter.
2. **A lab spec carries a challenge.** `HldLabSpec` gains an optional `challenge`: the peak load, the scenarios (named faults such as "the cache dies"), and the checks. A check is functional (a request can travel a chain of roles, in order) or non-functional (one number from one scenario against a limit, or whether queued work is fully counted after its consumer dies). Every check lists its measured value, its target and, when it fails, its reason. A lab with no challenge is scored on its four targets as non-functional checks, so existing labs keep working.
3. **The spec records how targets were tuned.** `spec.md` for a challenge lists every check with its scenario and limit, a table of designs run through the model (the starting board, a reference design and one variant per check that should fail), how the targets compare with what a real run of the paired code lab measured, and which of that lab's checks the board cannot model.
4. **The board layout is fixed.** Palette on the left. Settings only in a dark drawer, closed by default, opened from a small icon that shows on hover or focus (always on touch), one drawer at a time, closed by Escape, a bottom sheet on a phone. Run plays the scenarios on the board and then lists every check as pass or fail.
5. **The audit stays as it is.** The module needs `type: mcq` quiz fences, a `*-checklist.md` with a learning log, and a set-the-scene chapter, which the structure audit already demands; `Lab` stays in `restore-block-tags.ts`. The beats audit holds the Build chapter to the same beat rules as other chapters: each beat opens with a visual (`<Lab>` counts), 70 words or fewer visible, the rest in folds.

## Evidence

The URL shortener module built on this shape: 11 checks (3 functional, 8 non-functional) over four scenarios, targets tuned against the model and compared with the paired Docker code lab's measured numbers (`system-design-labs`, lab 1, `visual-lab-contract.md`). The model needed small honest additions to score it: a worker batch size, queueing wait and cost per component, inline click writes for a design with no queue, and a "consumers down" note. 64 lab unit tests pass, and the structure audit and the beats audit pass with no flags.

## Files that would change if accepted

`02-course-architecture.md` (the module type and where it sits), `04-interactive-playbook.md` (the `<Lab>` tag in a Build chapter), `08-templates.md` (the five-chapter module template), `agents/chapter-writer.md` and `agents/interactive-canvas-builder.md` (when to author a challenge), and `06-quality-gates.md` (a click-through of the board at 375 px and desktop, light and dark, one passing and one failing design).

## Risks and how we hold them

| Risk | Hold |
|---|---|
| A board with eleven checks overwhelms a beginner | The board starts with a small working design, every check is listed before the first Run with its target, and a failure names the part and the number |
| Model numbers read as real numbers | Targets compare shapes; the spec and the Read chapter say the milliseconds are model units and cite what the real stack measured |
| The module sits after the capstone | Chapter slugs use module order, so inserting a module in the middle would renumber published chapters; a release can reorder later |
| A hard-coded check list drifts from the code lab | The spec maps every check to the contract's check id and lists what the board does not model |
