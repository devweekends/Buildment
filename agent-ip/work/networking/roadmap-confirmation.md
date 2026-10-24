---
artifact: roadmap-confirmation
course: networking
roadmap_version: 3
date: 2026-10-24
facilitator: orchestrator
---

# Roadmap confirmation: networking

## Instructors

| Name | Role | Decision | Comments |
|---|---|---|---|
| Zeeshan | Architect (human sponsor) | Approve | "I approve the networking roadmap v3 and accept the recommendations on the 12 open decisions." (2026-10-24) |
| | Second instructor | Pending | |

## Decisions on open questions

Every recommendation in the roadmap was accepted as written.

| # | Decision | Resolution | Owner |
|---|---|---|---|
| 1 | Build environment | Pinned Ubuntu 24.04 image with `--privileged` as the default; Linux and WSL 2 with `sudo` also supported; macOS and WSL 2 runs before the blueprint is locked | Course engineering |
| 2 | Network lab platform change | Approved as a new lab family in three slices; slice 1 ships before module 3's chapters are written | Course engineering |
| 3 | `[addr]`, `[packet]` and three `[timeline]` models | Approved; `[addr]` first | Interactive canvas builder |
| 4 | `[replay]` for phone readers | Approved | Interactive canvas builder |
| 5 | Overlap with system design module 3 | This course is the prerequisite; system design module 3 keeps its performance topics and links here | Curriculum architect |
| 6 | Overlap with the Linux course | Namespaces used as a tool here; the Linux course explains them and reuses challenges 2 and 4 | Curriculum architect |
| 7 | Course order | Networking, Linux, Kubernetes, AWS | Sponsor |
| 8 | Completion without a laptop | Foundations level and full course, as specified | Delivery lead |
| 9 | Gate format and mentor time | Written, voice or diagram; learners carry on; review within three days | Delivery lead |
| 10 | IPv6 | After the capstone, no core build; build in stretch S5 | Curriculum architect |
| 11 | Fictional public addresses | Documentation ranges only, with a visible note | All writers |
| 12 | Time estimates | Pilot one chapter of each type with five learners before the blueprint | Prerequisites/timeline |

## Required changes

None requested.

## Outcome

- [ ] At least two instructors approved (one of two: the sponsor approved; a second instructor is still needed under `02-course-architecture.md`)
- [x] Every open decision resolved or explicitly deferred
- [x] Requested changes applied and re-confirmed (none requested)
- [ ] Delivery lead recorded the result

**Sign-off:** Zeeshan (architect, human sponsor), 2026-10-24.

**Consequence:** G2B is complete once a second instructor approves and the delivery lead records the result. Until then, no blueprint, sample chapter or general course is written, unless the sponsor records an explicit exception in the decision log.
