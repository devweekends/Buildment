# Review and Governance

This document defines how the team reviews the IP and the courses, who signs off, how feedback is handled, and how the system changes over time.

## Why governance matters

A course is a product with a public promise. If the review process is informal, the quality bar becomes whatever the last reviewer happened to notice. Governance makes the bar explicit, repeatable, and visible.

It also protects the IP. The methodology, the critique rubric, the variant map, and the answer keys are internal assets. Review access is need-to-know.

## The review board

| Role | Responsible for | Can block? |
|---|---|---|
| **Delivery lead** | Scope, schedule, final publish decision | Yes |
| **Subject-matter expert** | Domain accuracy, production realism | Yes |
| **Instructor panel** (2+ mentors) | Confirm the curriculum roadmap, sequence, hours, and capstone before writing; re-confirm material roadmap changes | Yes |
| **Editor** | Voice, structure, prose quality, anti-slop | Yes |
| **Simulation reviewer** | Model correctness, teaching clarity, visual simplicity, and SVG accessibility/security of interactive canvases | Yes |
| **Course auditor** | Prose depth, component density, interaction budget, diagram coverage, and chapter structure | Yes |
| **Platform engineer** | Import, rendering, blocks, deployment | Yes |
| **Learner advocate** | Prerequisite realism, time budget, frustration points | Yes |
| **Curriculum architect** | Outcomes, evidence, sequencing | Yes |

A review needs at least three roles for the sample chapter and full draft. The G2B roadmap review requires at least two instructors; the delivery lead's approval cannot substitute for theirs. The delivery lead signs publish.

## Review cadence

| Point | What is reviewed | Time |
|---|---|---|
| G0 | Brief and scope | Before research |
| G1 | Research dossier | Before architecture |
| G2A | Curriculum roadmap | Before instructor review |
| G2B | Instructor roadmap confirmation | Before the blueprint and before any chapter |
| G2C | Blueprint, skill graph, timeline, project brief | Before writing |
| G3 | Interaction map, assessment plan, one sample chapter, canvas specs if any, course audit | Before the full draft |
| G4 | Full draft, module by module | During writing |
| G5 | Technical and pedagogical QA, including canvas QA and full course audit | Before variants |
| G6 | Variant roadmaps, variants, and diff report | Before publish |
| G7 | Publish package | Final |

The sample chapter is the most important review. If it is wrong, every chapter will repeat the mistake.

At G5 and G7, the reviewer also checks option hygiene: no quiz, prediction, or knowledge check may make the correct option the longest by default, and no set may have the correct option longest in half or more of its questions. This is an S2 defect because it lets a learner pass without understanding the concept.

## How to give feedback

Every comment has four parts:

1. **Location.** The exact chapter, section, or line.
2. **Observation.** What is on the page, not what you assume was intended.
3. **Why it matters.** The standard it violates, or the learner harm it causes.
4. **Required fix or a question.** Be specific enough that the writer knows what to change.

Weak feedback:

> "This section feels a bit flat."

Strong feedback:

> "The quiz in 03.05 asks 'What is a hold?' immediately after the definition. That measures recall, not the concurrency decision the outcome requires. Replace it with a scenario: two buyers, one seat, one hold. The learner should choose the response and explain why."

## Feedback severity

Use the defect severity from `06-quality-gates.md`:

- **S1:** wrong, unsafe, broken, or IP-leaking. Blocks everything.
- **S2:** teaches the wrong thing, misaligned assessment, missing prerequisite. Blocks publish.
- **S3:** clarity, consistency, polish. Fix before publish or track explicitly.
- **S4:** optional improvement. May defer.

Do not mix severities in one comment. A typo and a broken security lesson are not the same conversation.

## Disagreement resolution

1. The writer responds with evidence, not preference.
2. If the critic and writer disagree, the orchestrator runs a third blind review from a different model family.
3. If the disagreement persists, the human review board decides.
4. The decision and its rationale go into the decision log.

No one wins an argument by repeating it. The artifact and the evidence decide.

## Versioning

- The IP has a version in `README.md`.
- Each course has a version in its brief.
- Each artifact has a version in its frontmatter.
- Each published course has a changelog.

A change to a principle, a gate, or a template is a version bump. A typo fix is not. When a course is republished, record what changed and why.

## Change control

### Changing the IP

1. Propose the change in a pull request or a written proposal.
2. State which problem it solves and which course or artifact exposed it.
3. Update the affected documents in the same change.
4. Update the version and the decision log.
5. Get sign-off from the delivery lead and one other reviewer.

Do not leave two competing rules in the folder. If a rule is replaced, remove the old one or mark it explicitly superseded.

### Pull requests

Course and IP changes reach `main` through pull requests on `devweekends/Buildment`.

- **Check the pipeline.** The architect keeps the order and status of the fellowship courses in `buildment-course-pipeline.md`, a planning file in the architect's local workspace, outside this repository. Ask the architect (Zeeshan) for the current copy and read it before starting a course; tell him when a course changes status.
- **One branch, one coordinator.** A course has one branch and one orchestrator at a time. Continue an existing branch instead of opening a parallel one (`agents/orchestrator.md` → Rules).
- **Small logical commits.** One change per commit, with a message that says what changed and why. No catch-all commit.
- **No attribution, no dashes.** No AI or tool attribution, and no em or en dashes, in commits or PR text (`03-authoring-standards.md` → Forbidden patterns).
- **Verify first.** Run `06-quality-gates.md` → Before a pull request and list the results in the PR.
- **Request both reviewers,** `asifrazadev` and `AQIB-NAWAB` (except whichever of them opened the PR), through the REST endpoint:

  ```bash
  gh api -X POST repos/devweekends/Buildment/pulls/<n>/requested_reviewers \
    -f 'reviewers[]=AQIB-NAWAB' -f 'reviewers[]=asifrazadev'
  ```

  Read `requested_reviewers` in the response. GitHub sometimes drops a reviewer without an error; re-request any missing reviewer on their own.
- **Check before pushing again.** Before pushing more commits to a PR, check it has not merged (`gh pr view <n> --json state,mergedAt`). If it has, open a new PR from a fresh branch off `main`.

### Changing a published course

- **Content fix** (typo, broken link, wrong command): normal review, patch version.
- **Structural change** (new chapter, reordered module, changed outcome): full gate review.
- **Roadmap change** (outcome, module order, capstone, or variant direction): re-run G2A/G2B with the instructor panel; do not patch the blueprint silently.
- **Canvas change** (model, teaching claim, or visualisation): re-run the canvas QA and the chapter review; a canvas whose claim changed is a new teaching artifact, even if the layout is the same.
- **Variant change** (new domain, new hero feature): treat as a new variant, confirm the variant roadmap, and run G2A–G6.
- **Emergency fix** (security or broken deploy): apply, notify the delivery lead, and document within 24 hours.

## Approval matrix

| Change | Writer | Critic | Curriculum architect | Instructors | Delivery lead |
|---|---|---|---|---|---|
| Typo or formatting | ✓ | | | | |
| Chapter rewrite | ✓ | ✓ | | | |
| Chapter/audit restructure | ✓ | ✓ | ✓ | | |
| New chapter | ✓ | ✓ | ✓ | | |
| New module | ✓ | ✓ | ✓ | ✓ | |
| New interactive canvas | | ✓ | ✓ | | ✓ |
| Canvas model or teaching-claim change | | ✓ | ✓ | | ✓ |
| Curriculum roadmap | | | ✓ | ✓ | ✓ |
| Roadmap change after confirmation | | | ✓ | ✓ | ✓ |
| New course | ✓ | ✓ | ✓ | ✓ | ✓ |
| New variant | ✓ | ✓ | ✓ | ✓ | ✓ |
| IP principle change | | | ✓ | | ✓ |

## IP protection

The following are internal and must not appear in learner-facing content:

- the agent prompts and orchestration logic;
- the critique rubric and scorecard;
- the curriculum roadmap and instructor confirmation record (internal planning artifacts);
- canvas QA reports and model test evidence (internal); the learner-facing canvas and its explanation are public;
- the variant map and differentiation strategy;
- the full capstone solution;
- hidden tests and answer keys;
- private company data, credentials, or URLs.

Access to `agent-ip/` is limited to the course team. Published courses contain the learner-facing artifacts, not the factory.

## Post-launch review

Within two weeks of launch, review:

- completion rate by module;
- the chapters with the most support questions;
- the chapters the course audit still flags for thin prose or component density;
- the assessments with the highest failure or lowest discrimination;
- the builds with the most environment failures;
- the open questions with the most generic answers;
- whether learners can defend the capstone;
- whether the variants produce distinct portfolios;
- mentor time per learner.

Within one month, update the course and the IP if a pattern appears. A single learner's problem may be personal; three learners with the same problem is a course defect.

## Feedback by type of person

Each group sees the course differently, so collect and act on their feedback separately.

| Who | What they tell us | How we collect it | Who acts on it |
|---|---|---|---|
| Learners | Confusing chapters, wrong answer keys, time per chapter, what they would cut | Reader feedback, quiz statistics, a short end-of-module question | Course owner; answer-key defects within a week |
| Mentors | Where open answers are weak, where learners ask for help, review load | Review queue notes, help inbox themes | Course owner and assessment designer |
| Instructors | Sequence, outcomes, time budget, what is missing | Roadmap confirmation and post-launch review | Curriculum architect |
| IP owners and the architect | Patterns across courses that should become rules | Review of agent output and critiques | IP change, see Changing the IP |
| Partners and employers | Whether graduates can do the job | Interviews after placement | Course brief for the next version |

## Continuing a course

A course is not finished at launch.

- **New versions.** Fixes from post-launch review go into a new version (see Versioning). Learners already enrolled keep their progress.
- **Follow-up courses.** Each course names its natural next course: for a variant, the specialisation course on its hardest constraint; for a soft-skills course, the next course in the series.
- **New modules.** A module added later goes through the same roadmap confirmation as the original course.

## How the IP learns

The agents follow this IP; the IP improves from the review of their output. When the architect or an IP owner corrects the same kind of mistake twice, it becomes a rule here, with an example, in the same change that fixes the course. The architect has final say on the IP; IP owners maintain it day to day.

## The governance promise

Final course and variant packages live exclusively in `content/import/<slug>/`; drafts, reviews, and QA live in `agent-ip/work/<slug>/`. Enforce `README.md` → Work areas at publish review. CI must consume the approved final package from the reviewed revision, never a draft directory or `courses/`.

The system is working when:

- a reviewer can point to the standard, not just an opinion;
- a writer knows what "done" means before starting;
- a defect is fixed at the brief, not patched in the prose;
- a variant is approved because it is different, not because it is finished;
- a published course can be traced from learner outcome back to research, blueprint, critique, and sign-off.
