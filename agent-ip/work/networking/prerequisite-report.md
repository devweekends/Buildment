---
artifact: prerequisite-report
course: networking
roadmap_estimates_provided: true
roadmap_confirmed: true
core_hours: 41.8
slow_path_hours: 54.1
stretch_hours: 8
cycles_found: 0
dangling_requirements: 0
entry_prerequisites: [terminal-basics, js-basics, git-basics]
---

# Prerequisite report: networking

## Checks

`tools/gen_graph.py` reads the chapter rows from `02-curriculum-roadmap.md`, joins them with each chapter's `requires`, `introduces`, `reinforces` and `evidence`, and writes `skill-graph.yaml` and `timeline.yaml`. On 2026-10-24 it reported:

- 76 chapters, 59 taught concepts, 3 entry prerequisites, 118 edges.
- Cycles: 0. Every concept is introduced exactly once.
- Dangling requirements: 0. Every `requires` and `reinforces` points to a concept introduced in an earlier chapter, or to an entry prerequisite.
- Core hours: 41.8, which fits the brief's short-course budget of about 40 (band 30 to 60). Slow path 54.1 hours.

Rerun after any roadmap or chapter change: `python agent-ip/work/networking/tools/gen_graph.py agent-ip/work/networking`.

## Entry prerequisites and the diagnostic

| Entry skill | Diagnostic question (`skill-graph.yaml`) | If missing |
|---|---|---|
| Terminal basics | Print the files in this folder | Do the shell part of 1.3 before 1.2 |
| JavaScript basics | What does `[1, 2, 3].map(n => n * 2)` return? | A 30-minute refresher before 2.5; Foundations learners may use the read-and-answer alternative |
| Git basics | Clone a repository and push one commit | Challenge 0 shows every Git step |
| (taught, not required) Binary | What is 13 in binary? | No repair: 2.2 teaches it; a right answer skips the first drill set |

## Repair path

Targeted, never the whole course:

- Binary and bit positions: the `[addr: bits]` drills in 2.2, linked from any failed drill in 2.3, 3.2 and 3.5.
- JavaScript bit operators: the `>>> 0` step in 2.5, linked from failing tests in 3.7, 3.8 and 4.6.
- A failed code exercise: the reference helper unlocks after three attempts, so 3.8, 4.6 and 6.6 never depend on a failed earlier exercise.
- A failed challenge part: `toolkit/restore.sh N.P` rebuilds the reference network at the end of that part.
- Lab environment: the setup checker's five named failures (1.2).

## Stretch path

S1 to S6 in the roadmap, about 8 hours. Each adds evidence (a Wireshark reading, a tunnel, an MTU experiment, a traceroute script, an IPv6 lab network, the learner's own router pages), not busywork. S2 and S5 are untested in the lab and must be run before they are written.

## Stall risks

| Chapter | Risk | Mitigation |
|---|---|---|
| 1.2 | Docker Desktop or WSL 2 will not install or start (memory, virtualisation off, Windows edition) | Checker with named failures and fixes; WSL 2 path; Foundations level; state requirements before 1.2 |
| 2.3, 3.2, 3.5 | Binary and prefix arithmetic | Unassisted drills with instant feedback; spaced repeats in checks; the first look at NAT in 2.4 keeps the payoff in view |
| 3.7, 3.8 | Signed 32-bit results in JavaScript | `>>> 0` taught in 2.5; edge cases in the spec; helper unlock |
| 4.7 | First router: forwarding off or a missing route, both silent | Mid-point check; tests that name the missing piece; hint ladder |
| 6.7 | nft syntax errors (a one-line ruleset failed in the orchestrator's own test, dossier 5.6) | Gapped ruleset file with the structure given; `nft -c` check before applying |
| 7.6 | dnsmasq options and the per-namespace resolver file | Gapped config; tested recipe (dossier 5.6) |
| 8.2 to 8.5 | Open capstone after gapped challenges | Start from the learner's own earlier scripts; per-part tests and restore points; week 4 is light |

## Assumptions to verify before G4

- Novice timings (decision 12).
- The lab on macOS and on WSL 2 without Docker Desktop (decision 1).
- The bind-mount flow from a Windows checkout (decision log).
