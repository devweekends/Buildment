# Proposal: visual-first Learn chapters (beats)

**Status:** Approved by the architect on 2026-10-23 after reviewing a prototype, and applied as IP v0.5 (see `decision-log.md`). Delivery lead and second-reviewer sign-off pending.
**Raised by:** Zeeshan (architect, human sponsor).
**IP version:** v0.4; this makes it v0.5.

## Problem

v0.4 made courses interactive-first, but kept the v0.3 rule that a concept chapter needs at least 1,200 prose words and treats components as checkpoints inside the prose. The first two system design chapters (8.4 and 10.6) followed the rules exactly and came out as long walls of text with a form-heavy canvas in the middle. The architect's verdict: "these sort of text makes human attention loose fast; followed by visuals is better" and "interactive elements are super super bad". The canvases opened with rows of number cards and control boxes, the picture was small and below the fold, and nothing moved until the learner stepped through.

A prototype of 10.6 rebuilt as five beats (a big moving picture you can touch, then two or three short sentences, then a "Go deeper" fold) was approved on 2026-10-23 as the direction for every chapter.

## Change

1. **A Learn chapter is a sequence of beats.** Four to eight beats. Each beat is a short heading, one visual, then at most 70 words of visible text that explain what the learner just saw, then an optional `GoDeeper` fold with the full explanation, sources, code and edge cases.
2. **The picture leads.** The visual is the first thing in a beat and fills the content width. It moves on its own while on screen when the idea involves time or flow, loops, freezes while the learner presses, and shows its final frame under reduced motion. The learner changes it by touching the picture (dragging a band, a marker, a dial) rather than through a panel of form controls; at most two controls sit outside the picture. Numbers live in the picture next to what they describe; no rows of summary cards.
3. **Depth is folded, not dropped.** Visible text in a Learn chapter is 300 to 700 words. Visible text plus `GoDeeper` text is at least 900 words, so a careful learner and an interview candidate still get the full mechanism, trade-offs, failure modes and sources.
4. **The teaching contract stays.** A predict before the beat that shows the key surprise, and a quick check after. One assessment instrument per chapter for the predict, at most two quick-check questions.
5. **Budgets for Learn chapters change.** One visual per beat (up to eight `InteractiveCanvas` or diagram tags), at most 40 JSX tags, at most 3 assessment interactions. `BigWordAlert` is not used in Learn chapters; terms are defined in the beat text or in `GlossaryTerm`.
6. **Other chapter types keep their rules.** Read (set-the-scene) chapters are one or two beats. Build, Check and Gate chapters are unchanged.
7. **Platform pieces.** A `GoDeeper` block (a fold with a title and MDX children), a `BeatFrame` for canvases (the picture first, one hint line, the model's limits in a small fold), and a reusable animated `scene` renderer (actors, messages that travel between them, a timestamp or position strip, waits and verdicts) that many courses can use.
8. **The audit enforces it.** For Learn chapters it counts beats, visible words per beat and per chapter, and total depth including folds.

## Files that change

`README.md`, `00-principles.md`, `02-course-architecture.md`, `03-authoring-standards.md`, `04-interactive-playbook.md`, `06-quality-gates.md`, `07-research-and-sources.md`, `08-templates.md`, `10-interactive-canvases.md`, `agents/chapter-writer.md`, `agents/interaction-designer.md`, `agents/interactive-canvas-builder.md`, `agents/critic.md`, `agents/course-auditor.md`, `agents/orchestrator.md`, `scripts/audit-course.mjs`, `decision-log.md`, and the `buildment-course-builder` agent wrapper outside the repository.

## Risks and how we hold them

| Risk | Hold |
|---|---|
| Shallow chapters | Total depth of at least 900 words including folds; critics check that the folds hold the mechanism, trade-offs and failure modes |
| Build cost of several visuals per chapter | The reusable `scene` renderer and the kit renderers; most beat visuals are data |
| Motion that distracts | Motion only when it is the model moving; it pauses off screen and under reduced motion |
| Learners skip the folds | Assessments and gates still test the mechanism, so the folds matter |
| Existing courses | They keep passing until next edited; the audit applies beat rules only to chapters marked `format: beats` in frontmatter, which every new Learn chapter uses |
