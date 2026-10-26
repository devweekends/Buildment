# Proposal: lessons from building course 16 (career-brand)

**Status:** proposal for delivery lead and reviewer sign-off under `09-review-and-governance.md`. Nothing here changes a rule until it is accepted.
**Evidence:** the course 16 build on branch `content/career-brand` (PR #71): `agent-ip/work/career-brand/qa/` and `decision-log.md` (D11, D15).

## 1. A second-family critic must quote, and the quotes must be checked

**What happened.** The first whole-course review by the second model family, run headless through a command-line agent that read files with its own tools, returned a confident report with 41 defects. A script found that none of seven sampled quotes existed and that most file names were invented: the agent had read only part of a 1 MB bundle. The same model, given the material through standard input in three per-module chunks and told that every defect must copy at least eight words verbatim, produced reports whose quotes were 85 to 100 percent verifiable, and its findings were useful.

**Proposed rule** (`06-quality-gates.md` → Critic lenses, and `agents/critic.md`): every defect quotes the artifact verbatim (eight or more words) with its path; the orchestrator checks every quote by script and drops defects whose quotes are not found. Give a headless reviewer its material in chunks small enough to read whole (about one third of a 65-chapter course), not as files it must open itself.

## 2. Re-run the length and position check after every revision

**What happened.** The assessment plan balanced key positions and lengths, and the first draft met it (predict keys strictly longest in 16 of 37). After one revision round the predict keys were strictly longest in 20 of 37, over the IP's "half or more of a set" line, because revisers lengthened keys to make them precise.

**Proposed rule** (`06-quality-gates.md` → Revision loop): after each revision round, re-run the option-length and position check on the whole course and re-extract the blind key batches for any changed item.

## 3. Production words are slop in learner text

**What happened.** Both critics found "beat", "the next beat", "canvas", "canon", "module brief" and "platform authoring rule" in chapters and canvas strings. Learners see headings and pictures, not beats.

**Proposed rule** (`03-authoring-standards.md` → Forbidden patterns): no production vocabulary in learner text (beat, fold, canvas, spec, brief, canon, dossier, interaction map). A course's canvas test can scan every learner-facing string for these words, as `frontend/tests/unit/canvas/career-brand-canvases.test.ts` does.

## 4. One test runs every primitive's data check over a course's slugs

**What happened.** The phrase fixer, budget stack, slot card and sorter each have a data check (label lengths, reasons, ids). Writers ran them while drafting, but revisions later pushed three strings over the limits; only a course-wide test caught them.

**Proposed rule** (`10-interactive-canvases.md` → QA): each course with data-driven canvases adds one test that runs the matching check function over every one of its slugs.

## 5. Platform note (not an IP rule)

`server/scripts/audit-course-structure.ts` finds predict fences with a pattern that expects `\n` line endings, so a chapter saved with Windows line endings skips the predict checks. Worth a small fix in the platform.
