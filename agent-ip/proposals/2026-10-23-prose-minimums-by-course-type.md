---
artifact: proposal
status: open, for delivery lead and instructor decision
date: 2026-10-23
exposed_by: courses decision-making, logic-building, cause-and-effect
---

# Proposal: prose minimums by course type

## Problem

The IP sets one prose minimum for every course: 1,200 prose words for a concept or build chapter and 700 for a checkpoint or gate (`README.md` → Non-negotiables, `02-course-architecture.md` → Prose depth and component budget, `scripts/audit-course.mjs`). Those numbers were set for the flagship engineering course, where a chapter is two to four focused hours.

The fellowship's soft-skills and foundation courses are short (8 to 20 hours, `02-course-architecture.md` → Time budget) and written for second-language readers on phones (`03-authoring-standards.md` → Audience: the fellowship). With the audit fixed to count Mermaid diagrams and to skip quiz chapters (decision log, 2026-10-23), it still flags:

| Course | Chapters | Below the prose minimum |
|---|---|---|
| decision-making (course 3) | 36 | 36 |
| logic-building (course 9) | 50 | every teaching chapter and gate |

Course 9 recorded its own exception (700 to 1,000 words per teaching chapter) as an open instructor decision. Course 10 (cause-and-effect) is being written to the full 1,200 and 700, which will show what that costs a learner. Without a rule, each course decides for itself, and the audit cannot tell an accepted exception from thin writing.

A second ambiguity: the audit treats a set-the-scene chapter (`stepType: Read`) as a concept chapter (1,200 words and a diagram), while `02-course-architecture.md` names only concept, build, checkpoint and gate chapters.

## Options

1. **Keep one rule.** Every course meets 1,200 and 700. Cost: a 14-hour soft-skills course becomes about 55,000 words, much of it read on a phone in a second language.
2. **Set the minimum in the brief.** The course brief states a prose minimum per chapter type within a band the IP allows (for example 700 to 1,200 for concept chapters in a short course), the roadmap repeats it for instructor sign-off at G2B, and `audit-course.mjs` reads it from `course.yaml`. Thin writing is still caught; the number is decided once, in the open.
3. **Course-type defaults.** Flagship engineering keeps 1,200 and 700; short courses and soft-skills courses default to, for example, 800 and 450, with the brief allowed to raise them.

For set-the-scene chapters, either name them as a chapter type with their own minimum (for example 500 words and no diagram requirement) or require them to meet the concept minimum.

## Recommendation

Option 2, with option 3's numbers as the default band, and a named set-the-scene type. It keeps the rule strict where the brief does not argue otherwise, and turns today's silent exceptions into recorded decisions.

## Not changed by this proposal

No rule changes until the delivery lead and one other reviewer sign off (`09-review-and-governance.md` → Change control). Until then the audit keeps 1,200 and 700, and courses that use a lower number record it as an exception in their decision log.
