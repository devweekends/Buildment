---
artifact: proposal
status: open, for the architect, delivery lead and one reviewer
date: 2026-10-26
exposed_by: the networking course (challenge template) and the system design course
---

# Proposal: course repositories live with the instructor, created by the agent

## Problem

Hands-on courses need code outside the platform:
- **A learner template:** a public repository learners copy with "Use this template".
- **A reference build:** private; the answer key and mentor help (`02-course-architecture.md`, Reference builds).

Today this is unclear in three ways:
- the reference builds are all in one personal repository (`AQIB-NAWAB/buildment-courses`);
- templates are planned ad hoc;
- drafts sit inside the Buildment repository's work areas.

The architect said (2026-10-26) that Buildment cannot host all of this code: the repositories belong in the instructor's own GitHub, and the agent should create them.

## Proposal

1. **Owner.** Each course's repositories are created in the GitHub account or organisation of the course's instructor. The course manifest names it (`course.yaml`: `repositories.owner`; default: the owner behind `courses/publishing.yaml`). Buildment hosts only the course text and links.
2. **Two repositories per hands-on course:**
   - `<owner>/<course>-challenges`: public, marked as a template, holding the starter code learners copy.
   - `<owner>/<course>-reference`: private, holding the solutions and the answer-key checks.
3. **The agent creates them** with `agent-ip/scripts/create-course-repo.sh <owner> <name> <source-dir> <public|private> [template]`, under the instructor's GitHub login. If the agent's login cannot create repositories for that owner, it stops and asks the instructor to run the script.
4. **The source is drafted in the work area**, tested in the course lab, then pushed. After the first push the instructor's repository is the source of truth. The work-area copy is deleted or kept only as a small snapshot with a pointer, so Buildment does not carry two versions.
5. **Chapters link only to the public template.** The reference repository is never linked from a chapter (`00-principles.md`, What we reveal and what we withhold).
6. **The audit** checks that every `challenges/...` path a chapter mentions exists in the template repository at the commit the course pins.

## Platform impact

None for the reader. One script, `create-course-repo.sh`. It is drafted in the networking course's `tools/` folder and moves to `agent-ip/scripts/` when this proposal is approved.

## Not changed by this proposal

No IP rule changes until sign-off under `09-review-and-governance.md`. Existing reference builds stay where they are until each course is next edited.
