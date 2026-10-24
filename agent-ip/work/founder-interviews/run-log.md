# Run log: founder-interviews

| Date | Phase | Artifact | Agent | Model | Status | Notes |
|---|---|---|---|---|---|---|
| 2026-10-24 | G0 Brief | `00-course-brief.md` | Orchestrator from sponsor intake | drafting model | accepted by sponsor | Sponsor asked for a founder interview course practised with an AI interviewer on each learner's own key |
| 2026-10-24 | G1 Research | `research.md` | Research agent with web search | drafting model | accepted | 68 sourced claim rows, 20 unverified claims, 11 open questions; two interruptions by rate limits, resumed from the saved file |
| 2026-10-24 | G2A Roadmap | `curriculum-roadmap.md`, `course.yaml` | Curriculum architect (orchestrator session) | drafting model | draft, G2B pending | 7 modules, 41 chapters, 975 minutes |
| 2026-10-24 | G2C skipped | `context-packs/writer-pack.md` | Orchestrator | drafting model | done | Replaces chapter briefs and the interaction map; sponsor instruction |
| 2026-10-24 | G4 Draft | 41 chapters, 19 canvases | Four chapter writers in parallel (modules 1 and 2, 3 and 4, 5 and 6, 7) | smaller drafting-family model | draft | validate 41/41, structure audit 0 errors and 0 warnings, agent-ip audit Needs work 0 (46,183 prose words), 574 canvas tests; one network interruption, writers resumed |
| 2026-10-24 | G5 blind keys | `qa/blind-keys/` | Blind key reviewer | second model family | 93 of 95 matched | Mismatches: 3.4 predict, 4.3 first item |
| 2026-10-24 | G5 round 1 | `qa/critique-a.md`, `qa/critique-b.md` | Two blind critics | smaller drafting-family model (both; the second family reached its usage limit) | revise | A: 7 S2, 16 S3, average 3.71. B: 2 S2, 21 S3, average 3.86 |
| 2026-10-24 | Revision 1 | `qa/revision-1-brief.md` | The same four writers | smaller drafting-family model | in progress | Roadmap, course.yaml and decision log updated by the orchestrator |
