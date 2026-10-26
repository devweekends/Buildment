---
artifact: proposal
status: open, for the architect, delivery lead and one reviewer
date: 2026-10-26
exposed_by: the networking course (G4 written by seven parallel writers in about 35 minutes)
---

# Proposal: task tiers, one packet runner, and a learning loop

Quality comes first. Cost matters only among choices that keep the quality bar.

## 1. Task tiers

Every task in a course run gets a tier. The routing table (`work/<slug>/routing.yaml`) names the model role per tier, never a model or vendor name.

| Tier | Work | Who |
|---|---|---|
| Judgment | roadmap, blueprint, interaction design, new renderer or lab design, S1 and S2 fixes, final G5 acceptance | the strongest model role available |
| Bulk | chapters from a brief packet, canvas data from a schema, challenge scripts, critic passes | any cheaper model role, any family; several in parallel, one packet each |
| Mechanical | renames, registration, format fixes, building packets | a script first; the cheapest model only when a script cannot do it |
| Verify | audits, tests, renders, lab runs, answer-key comparison | scripts only: a model reading code is not verification |

**Quality floor.** Bulk and mechanical output never ships on its own. It must pass `course-check.mjs` and the lab runs, and then get a review from another model family where one is available, or else a judgment-tier review recorded as a risk.

## 2. One runner for any command-line model

`agent-ip/scripts/swarm/run-packet.sh <packet> <task> <done-file> --cli codex|claude|agy [--model NAME]` runs a packet (a task file, `in/` inputs, an `out/` folder) on any installed command-line agent. It closes stdin, waits out usage limits from the tool's own message, resumes a half-finished packet, and stops with a clear line when a login needs renewing. Packets keep each writer's context small, which is the main token saving: a writer reads its module's brief, facts and examples, not the repository.

## 3. A learning loop

After each gate, the run log records for each tier and task type: how many items it produced, how many defects review found by severity, and how many it had to redo. If a bulk task type keeps producing S1 or S2 defects (for example two runs in a row), it moves up a tier for the next course. If a judgment task type is routinely clean, it may be tried one tier down on a single module first.

## Evidence from the networking course

- Seven parallel bulk writers drafted modules 3 to 9 in about 35 minutes; each passed the audit before review.
- Three bulk critic passes fixed S1 3, S2 12 and S3 about 60 defects; the defects that mattered most (a wrong CGNAT claim, ambiguous keys) were facts and assessment, which supports keeping a review from another family.
- Scripts found what reading missed: 15 chapters the importer rejected, 54 strict structure errors, a published code exercise that cannot pass in the grading sandbox.

## Not changed by this proposal

No rule changes until sign-off under `09-review-and-governance.md`. The existing model policy in `01-agent-system.md` stands; this proposal adds the tier table, the runner and the loop.
