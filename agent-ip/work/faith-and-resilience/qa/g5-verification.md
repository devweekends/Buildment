---
artifact: qa-report
course: faith-and-resilience
gate: G5 (two critique rounds done; human review, G2B and a qualified scholar's review required before publish)
date: 2026-10-24
---

# Verification report: faith-and-resilience

## Structure
- 7 modules, 40 chapters, 945 minutes from chapter frontmatter (`estimatedHours: 16`).
- Graded items: 94 (68 multiple-choice questions, 26 predictions). Open questions: 8 (every gate and the capstone). Diagrams: 27 Mermaid diagrams, one in every non-gate, non-quiz chapter. Canvases: 19, one in every Learn chapter, all on existing renderers (see `canvas-qa.md`). Arabic: 45 lines, each copied from the dossier.
- `content:validate:source --course faith-and-resilience`: 40 of 40 OK.
- `content:audit --course faith-and-resilience`: 0 errors, 0 warnings.
- `agent-ip/scripts/audit-course.mjs courses/faith-and-resilience`: Needs work 0 (saved in `course-audit.txt`); 50,671 prose words; every scene, Learn and capstone chapter at least 1,200, every gate at least 700, every quiz chapter five questions, every Learn chapter interactive.
- No em or en dashes; no links, company or product names, or AI attribution.

## Sources (G1 and every chapter)
- `research.md`: 67 verses and 54 hadith checked on quran.com, sunnah.com and dorar.net; Arabic compared by script with the source text; 6 sayings rejected, 2 disputed hadith held for the scholar.
- Script checks on the final chapters and canvas data: all 92 distinct verse and hadith references appear in the dossier; all 45 Arabic lines match the dossier character for character (after NFC normalisation); every non-Bukhari, non-Muslim hadith carries its grading at first mention in each chapter.

## Critique (G5)
Critic A: a separate agent on a smaller model of the drafting family. Critic B: an agent on a second model family. Neither saw the writers' rationale.

| Round | Critic A (pedagogy, assessment) | Critic B (slop, continuity, accuracy, safety and tone) |
|---|---|---|
| 1 | 0 S1, 7 S2, 14 S3; average 3.95; revise | 0 S1, 7 S2, 3 S3; average 4.73; revise |
| 2 | 0 S1, 0 S2, 5 S3; average 4.18 (4.24 without dimension 19); revise (narrow) | 0 S1, 0 S2, 2 S3; average 4.91; approve |

- Round 1's main defects (critic A): answer keys guessable by form (about 51 percent without reading the stem), repeated key positions across check chapters, predicts answered by the text above them, recall items, two keys on disputed ground (Quran 12:42 and the istikhara follow-up), and a mixed review that was one case per module. Critic A's round 2 re-run of its guessing script scored 26 percent (chance is 25 percent).
- Several critic B round 1 findings did not reproduce (it named files and slugs that do not exist); each finding was verified before assignment, see `revision-1.md`.
- After round 2, round 3 fixed the remaining S3 items (scene predicts, form tells, four near-ambiguous distractors, long stems, two missing gradings, one grammar slip) without a third critic round, as `agents/orchestrator.md` allows two rounds before a human decision.
- **Critic A's round 2 average (4.18) is below the 4.3 pass line.** Dimension 19 (instructor alignment) is 3 only because G2B and the scholar's review are not recorded; without it the average is 4.24. A human reviewer must decide whether the round 3 fixes meet the bar.

Reports: `critique-a.md`, `critique-b.md`, `revision-1.md`, `critique-a-r2.md`, `critique-b-r2.md`.

## Blind answer-key review
`agent-ip/scripts/blind-keys.mjs`, keyless batches, answered by an agent on a second model family that saw only questions and options.

| Run | Items | Matched | Notes |
|---|---|---|---|
| Draft (`blind-keys-r0/`) | 94 | 94 | |
| After revision 1 (`blind-keys-r1/`) | 94 | 93 | 1.2 predict ambiguous ("leave him nothing to do"); reworded |
| After round 3 (`blind-keys-r2/`) | 94 | 94 | one medium-confidence item (6.3 predict); its facts are in the stem |

**No person has re-answered the keys.** The PR asks a reviewer for a human key check.

## Import and click-through
- Imported into a scratch PostgreSQL 16 on drive C (a fresh database, because the importer refuses a course that already has learner work): 7 modules, 40 chapters, 116 blocks.
- Signed in as mentee1@buildment.dev through the seeded dev-login route and enrolled from the catalog page. All 40 chapter pages returned 200 with full content and no render error.
- At 375px: chapter 2.3's slider canvas in the dark theme (moving the power bank slider changed "Short by 3 min" to "Covered, 57 min to spare"); chapter 3.4's state machine in the light theme (one overflowing label found and fixed); chapter 3.3's Arabic block quotes. No sideways scroll.
- At desktop width, light theme: chapter 1.4 quiz 1 answered right ("Correct! Well done", +100%, every option explained) and quiz 2 answered wrong ("Wrong answer", every option explained). After a reload both results were still shown and the chapter showed 1 of 2 checkpoints, so progress is saved.
- No console errors on the checked pages after sign-in.
- Harness limits, not course problems: the browser pane was hidden, so screenshots needed a scroll-wheel nudge to repaint; preview servers were started from the shell because the preview tool's server limit was used by other sessions.

## Found on the way (for the platform and IP owners)
- **Arabic in block quotes renders left-aligned and small,** with the block quote's quote marks at the line ends, because the reader sets no `dir="auto"` on block quotes or paragraphs. The text itself reads in the right order. A small reader change (`dir="auto"` on `blockquote` and `p`, and a slightly larger font for Arabic) would serve Arabic-first learners; it is outside this course PR.
- `content:import` refuses to update a course that has learner work, so a local click-through locks the scratch database; a second import needs a fresh database.

## Pending before publishing
- **G2B:** at least two instructors sign the roadmap (`curriculum-roadmap.md` → Confirmation).
- **A qualified Islamic scholar** reviews the roadmap and every chapter with the 23-item checklist in `research.md` and roadmap open decisions 3 to 7 and 12 to 14.
- **A human key check** of the 94 graded items, and a human decision on critic A's round 2 average.
