# Run log: ai-engineering-interview

| Date | Phase | Artifact | Agent | Model | Status | Notes |
|---|---|---|---|---|---|---|
| 2026-10-22 | G0 Brief | `00-course-brief.md` | Orchestrator from sponsor intake | drafting model | draft | From pipeline section 8 and the sponsor request |
| 2026-10-22 | G2A Roadmap | `curriculum-roadmap.md`, `content/import/ai-engineering-interview/course.yaml` | Curriculum architect (orchestrator session) | drafting model | draft, G2B pending | 12 modules, 79 chapters, 52 hours, 4 canvases |
| 2026-10-22 | G2C skipped | `context-packs/writer-pack.md` | Orchestrator | drafting model | done | Replaces chapter briefs; sponsor instruction |
| 2026-10-22 | G1 Research | `research.md` | Research (earlier run of this course build) | drafting model | draft, not reviewed | 108 sourced claims, 15 unverified; versions checked on PyPI 2026-10-22. Kept as the dossier of record; not checked line by line against the chapters |
| 2026-10-22 | Canvases | `frontend/src/canvas/{rag-hybrid-rerank,retrieval-metrics-at-k,agent-react-loop,langgraph-reducer-merge}` | Interactive canvas builder (orchestrator session) | drafting model | done | 81 canvas tests pass; ReAct canvas moved to the sequence renderer after the phone check |
| 2026-10-22 | G4 Draft | 79 chapters in `content/import/ai-engineering-interview/` | Six chapter writers in parallel (modules 1-2, 3-4, 5-6, 7-8, 9-10, 11-12) | drafting model | draft | Build chapters verified against scratch reference implementations |
| 2026-10-22 | G5 checks | `qa/g5-verification.md` | Blind answer-key reviewers (3 batches), orchestrator | review model, drafting model | done, human review pending | 119 of 119 keys matched blind; 4 items reworded; validate 79/79, audit 0/0, import and click-through on a scratch database |
| 2026-10-24 | G1 Research (module 11) | `research-inference.md` | Research agent | review model | accepted by the orchestrator; human review pending | 41 primary sources; corrected the waste figures (61.8% to 79.6% older systems, 3.7% vLLM, from the paper's chart) and noted FP8 KV halving is arithmetic |
| 2026-10-24 | G2A Roadmap amendment | `curriculum-roadmap.md` module 11, `course.yaml` | Orchestrator | drafting model | draft, G2B pending | 11 chapters, about 6.6 hours, 8 canvases; modules 11 and 12 renumbered to 12 and 13 |
