# Run log: networking

| Date | Phase | Agent role | Model role | Artifact | Status |
|---|---|---|---|---|---|
| 2026-10-24 | G0 | orchestrator | drafting model | `00-course-brief.md` v1 | draft, awaiting sponsor acceptance with the roadmap |
| 2026-10-24 | G1 | research | bulk model | `01-research-dossier.md` v1 | drafted: 67 sources, unverified claims marked |
| 2026-10-24 | G1 | orchestrator | drafting model | dossier section 5.5, environment test on Docker Desktop for Windows | passed; four open questions closed |
| 2026-10-24 | G1 | curriculum-architect | drafting model | `01-research-dossier.md` v1 | accepted for the roadmap; human acceptance at G2B with the roadmap |
| 2026-10-24 | G2A | curriculum-architect | drafting model | `02-curriculum-roadmap.md` v1 | drafted |
| 2026-10-24 | G2A | critic (pedagogy), critic (technical) | bulk model | `qa/g2a-critique-pedagogy.md`, `qa/g2a-critique-technical.md` | round 1: 1 S1, 22 S2; revise |
| 2026-10-24 | G2A | orchestrator | drafting model | dossier 5.6, second environment test | passed; NAT port behaviour corrected |
| 2026-10-24 | G2A | curriculum-architect | drafting model | `02-curriculum-roadmap.md` v2, `qa/g2a-response-round1.md` | revised |
| 2026-10-24 | G2A | critic (pedagogy), critic (technical) | bulk model | `qa/g2a-critique-pedagogy-r2.md`, `qa/g2a-critique-technical-r2.md` | round 2: 0 S1, 3 S2 between them; revise narrowly |
| 2026-10-24 | G2A | orchestrator | drafting model | dossier 5.7, third environment test; RFC 1930 and 3849 sourced | passed |
| 2026-10-24 | G2A | curriculum-architect | drafting model | `02-curriculum-roadmap.md` v3 | ready for G2B |
| 2026-10-24 | G2B | sponsor | human | `roadmap-confirmation.md` | approved by the sponsor; second instructor pending |
| 2026-10-24 | G2B | sponsor | human | decision log: sponsor exception | G2B complete; G2C may start |
| 2026-10-24 | G2C | curriculum-architect, prerequisites-timeline, project-designer | drafting model | `03-blueprint.md`, `04-project-brief.md`, `skill-graph.yaml`, `timeline.yaml`, `prerequisite-report.md` | drafted; checks pass |
| 2026-10-24 | G2C | curriculum-architect | bulk model | `module-briefs/01` to `09` | drafted; not yet reviewed; paused for the weekend (`HANDOFF.md`) |
| 2026-10-25 | G2C | orchestrator | drafting model | roadmap v3.1, dossier S70 to S76, `tools/check_briefs.py` | detail fixes; briefs match the roadmap (76 of 76) |
| 2026-10-25 | G2C | curriculum-architect | bulk model | `module-briefs/01` to `09` aligned to v3.1 | ready for sponsor review |
| 2026-10-26 | G2C | sponsor | human | blueprint, project brief, skill graph, timeline, module briefs | signed off; G3 may start |
| 2026-10-26 | G3 | interaction-designer, assessment-designer | bulk model | `interaction-map.yaml`, `assessment-plan.yaml`, briefs aligned to v0.5.3 | done; checker passes |
| 2026-10-26 | G3 | orchestrator | drafting model | dossier 5.8 (fourth lab test), canvas spec | done |
| 2026-10-26 | G3 | interactive-canvas-builder | bulk model | `net-m2-byte-bits`, `net-m2-address-bits`, `net-m2-address-drill` | built; 39 model tests; text QA clean light and dark |
| 2026-10-26 | G3 | chapter-writer | bulk model | chapter 2.2 (beats) | drafted; audit clean |
| 2026-10-26 | G3 | critic A, critic B | review models from other families (Gemini 3.8 Flash, GPT-OSS 120B) | `qa/g3-critique-A-round1.md`, `qa/g3-critique-B-round1.md`, `qa/g3-critique-A-round2.md` | round 2 average 4.41, no dimension below 4; remaining S2 fixed after round 2 |
| 2026-10-26 | G3 | answer-key check | review model from another family (Gemini 3.8 Flash) | blind keys on chapter 2.2 | 3 of 3 matched, three times |
| 2026-10-26 | G3 | sponsor | human | interaction map, assessment plan, canvases, sample chapter 2.2 | signed off; G4 starts with module 1 |
| 2026-10-26 | G4 | orchestrator, bulk model | drafting and bulk models | challenge template (lab image, challenges 0 and 1), real recordings | built and run in the lab; all tests pass |
| 2026-10-26 | G4 | interactive-canvas-builder | bulk model | packet canvases (7), broadcast scene, replay canvases (3) | tests pass (canvas suite 3,005); text QA clean light and dark |
| 2026-10-26 | G4 | chapter-writer | bulk model | module 1 chapters 1.1 to 1.8 | audit clean; blind keys 16 of 16 (Gemini 3.8 Flash); orchestrator fixes in 1.1 and 1.4 |

## 2026-10-26 G5 review

- Blind answer-key check (review model, same family as the drafting model): 143 of 144 keys matched. The one mismatch (1.3) needs context the chapter teaches (the lab runs as root); the key is right.
- Three critic passes over modules 1 to 3, 4 to 6 and 7 to 9 (pedagogy, assessment, facts, slop), fixing S1 to S3 defects in place: S1 3, S2 12, S3 about 60. Audit "Needs work: 0", fence check clean, every chapter renders, every code exercise solution passes its tests.
- Risk: the critics share a model family with the drafting model, so this review is less independent than the routing table asks. A cross-family review is still owed before the next major edit.
- Open, labelled in the text: macOS commands unverified; the captive portal is a model; the 3.9 silence reason is not recorded.
