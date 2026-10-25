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
| 2026-10-24 | Revision 1 | `qa/revision-1-brief.md` | The same four writers | smaller drafting-family model | done | validate 41/41, structure audit clean, agent-ip audit Needs work 0, 671 frontend tests; merged PR #68 and used its two-box context and flags |
| 2026-10-24 | Paused | `CONTINUE.md` | Orchestrator | drafting model | stopped at the user's request | Round 2 critics stopped before writing; round 2 blind key batches extracted, not answered |
| 2026-10-25 | Resume | branch | Orchestrator | drafting model | done | Merged origin/main (PR #68 merged): validate 41/41, audits clean, 2,932 frontend tests |
| 2026-10-25 | G5 blind keys r2 | `qa/blind-keys-r2/` | Blind key reviewer | second model family | 91 of 95 matched | 2.3 Q2 reviewer letter slip (its note describes the key); 4.3 and 5.2 predicts need the paragraph or canvas above (recorded); 3.3 predict stem sharpened |
| 2026-10-25 | G5 round 2 | `qa/critique-a-r2.md`, `qa/critique-b-r2.md` | Critic A (smaller drafting-family model), critic B (second model family) | as listed | revise (targeted) | A: 4.09, 0 S1, 0 S2, 6 S3, 4 S4. B: 3.86, 0 S1, 0 S2, 3 S3, 1 S4 new, some round 1 items partly fixed |
| 2026-10-25 | Residual pass | chapters, course.yaml | Editor agent (smaller drafting-family model) and orchestrator | as listed | done | No third critique round; residuals recorded in the decision log for human review |
| 2026-10-25 | Module 5 extension | 5.5 to 5.7, quiz 5.8, gate 5.9, 3 canvases | Writer C (smaller drafting-family model) | as listed | done | Sponsor request: the technical founder; `context-packs/technical-founder-brief.md` |
| 2026-10-25 | Module 5 review | `qa/critique-m5.md` | Blind critic | second model family | revise | 3.5; S2: idempotent retries overstated, missing checklist areas, gate rubric, demo safety, no canvas QA report; fixed by writer C |
| 2026-10-25 | G5 blind keys r3 | `qa/blind-keys-r3/` | Blind key reviewer | second model family | 100 of 104 matched | 3.3 and 4.4 stems clarified; 4.3 and 6.5 recorded |
| 2026-10-25 | G5 checks | `qa/g5-verification.md`, `qa/canvas-qa.md` | Orchestrator | drafting model | done, human review required | validate 44/44, audits clean, 2,947 tests, import 44 chapters and 134 blocks, click-through at 375px light and dark and desktop light and dark |
