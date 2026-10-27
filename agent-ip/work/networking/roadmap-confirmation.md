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
| | Second instructor | Waived by the sponsor (decision log, 2026-10-24) | |

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

- [x] At least two instructors approved: waived by a sponsor exception; the sponsor's approval completes G2B (decision log, 2026-10-24)
- [x] Every open decision resolved or explicitly deferred
- [x] Requested changes applied and re-confirmed (none requested)
- [ ] Delivery lead recorded the result

**Sign-off:** Zeeshan (architect, human sponsor), 2026-10-24.

**Consequence:** G2B is complete under the sponsor exception. G2C may start from roadmap v3. The delivery lead's record is still open.

## 2026-10-27: Addendum, modules 10 to 12 (Part 2)

**Artifact:** `02b-roadmap-addendum-modules-10-12.md` v0.3, after two rounds of the pedagogy and technical critiques (`qa/g2a-addendum-critique-pedagogy.md`, `qa/g2a-addendum-critique-technical.md`; both "pass with changes" in round 2, no blockers, every round 2 major applied).

**Sponsor direction (2026-10-27, in their words):** "fit them in wherever you think they seem best", "Like module and chapter, you can define", and "When done, can you please make it run so I can see it?"

**Decision:** the sponsor delegated placement and structure, so the recommendations on open decisions 13 to 21 are taken as the sponsor's decisions under that delegation. The sponsor sees the result in the preview and may revise any of them; a revision reopens only the affected chapters.

**Sign-off:** Zeeshan (architect, human sponsor), by delegation, 2026-10-27. G2C may start for modules 10 to 12.
