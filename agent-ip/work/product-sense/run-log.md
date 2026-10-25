# Run log: product-sense

| Date | Phase | Artifact | Agent | Model | Status | Notes |
|---|---|---|---|---|---|---|
| 2026-10-25 | G0 Brief | `00-course-brief.md` | Orchestrator from sponsor intake | drafting model | accepted by sponsor | Overlap checked with courses 13, 14, 16 and 17 |
| 2026-10-25 | G1 Research | `research.md`, `research-part-a.md`, `research-part-b.md` | Two research agents with web search | smaller drafting-family model | accepted | 86 and 82 sourced rows; 19 and 24 unverified; 16 outline changes |
| 2026-10-25 | Canvas kit | `packages/learning-ui/src/canvas/models/ui-specimen.ts`, `primitives/specimen-beats.tsx`, `primitives/ui-specimen-svg.tsx` | Orchestrator (interaction designer and canvas builder) | drafting model | done | Compare, ladder, spot and skim beats; 9 model and render tests; two model canvases (2.4, 5.2) checked in the reader at 375px |
| 2026-10-25 | G2A Roadmap | `curriculum-roadmap.md`, `courses/product-sense/course.yaml` | Curriculum architect (orchestrator session) | drafting model | draft, G2B pending | 7 modules, 53 chapters, 1,295 minutes, 22 hours |
| 2026-10-25 | G2C skipped | `context-packs/writer-pack.md` | Orchestrator | drafting model | done | Replaces chapter briefs; sponsor instruction |
| 2026-10-25 | G4 Draft | 53 chapters, 49 canvases (data and spec) | Seven chapter writers in parallel, one per module | smaller drafting-family model | draft | validate 53/53, structure audit 0 errors 0 warnings, `audit-course.mjs` no flags; orchestrator registered 49 slugs |
| 2026-10-25 | Preview | scratch database, 7 modules, 53 chapters, 136 blocks | Orchestrator | drafting model | done | Shown to the sponsor in the browser pane; found the skim page readable before Start (fixed: blur and cover) and wide fold tables at a 304px pane (to check at 375px) |
| 2026-10-25 | G5 round 1 | `qa/critique-a.md`, `qa/critique-b.md`, `qa/blind-keys/` | Critic A (drafting family), critic B and blind keys (second family) | see routing.yaml | done | Bias script: 82 MCQs, key strict longest 2%, strict shortest 23%, none over 10% longer; 25 predicts, correct first 56%, correct label never longer |
| 2026-10-25 | G5 round 1 result | `qa/critique-a.md`, `qa/critique-b.md`, `qa/blind-keys/` | Critic A, critic B, blind keys | see routing.yaml | revise | A: 3.70, 9 S2; B: 4.59, 3 S1; blind keys 107 of 107 |
| 2026-10-25 | Revision 1 | 54 chapters, 82 canvases; `qa/revision-1-brief.md` | Seven revisers, one per module | smaller drafting-family model | done | Capstone split; 26 hours; bias balanced (key longest 24%, shortest 24%, "because" 16% vs 17%, predict longer 52%) |
| 2026-10-26 | G5 round 2 | `qa/critique-a-r2.md`, `qa/critique-b-r2.md`, `qa/blind-keys-r2/` | Critic A, critic B (smaller second-family model), blind keys | see routing.yaml | A approve with conditions | A: 4.32, 0 S1, 0 S2, 12 S3, 7 S4; blind keys 107 of 107 |
| 2026-10-26 | Click-through | `qa/g5-verification.md` | Orchestrator | drafting model | done | 375px and desktop, light and dark; RTL anchor and dark-mode tint bugs found and fixed in the kit |
| 2026-10-26 | Round 3 fixes | targeted items from critique A round 2 | One fix writer | smaller drafting-family model | running | No third critique round |
