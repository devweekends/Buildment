# SkillSlot M15 availability-engine draft QA

Date: 2026-10-24. Scope: `courses/multi-vendor-marketplace/variants/services/15-availability-engine-api/`, 12 lessons, plus the `skill-slot-block-claims` canvas. This note documents authored-draft checks and the reference implementation contract. It is not a G5/G6 approval.

## Reference contract carried by the lessons

The learner implementation has one pure `server/src/modules/availability/engine.js` with `expandWindows`, `candidateStarts`, `blocksFor`, `candidateIsFree`, `passesBookingWindow` and a `planStarts` composition. It uses the M5 `localToUtc` helper for provider-local rule boundaries, then steps in 15-minute absolute UTC blocks. Intervals are half open. Service duration and buffer are both occupied. The same `blocksFor` helper must feed display filtering and the later checkout writer.

A repository adapter loads active TimeOff overlapping the complete expanded UTC range and SlotClaims within that range, scoped to one provider. A public `GET /providers/:id/availability` validates that the active service belongs to the listed provider and returns sorted UTC `Z` starts plus `generatedAt`, without private blocker details. A GET is advisory; checkout must repeat validation and write unique claims atomically. An invalid dated rule produces a provider-facing issue, while an unexpected engine or database failure stays visible rather than becoming an empty slot list.

The learner commits `docs/availability-decisions.md` with the endpoint sample, exact notice/horizon conventions, test commands, runtime versions, and a short transition-date trace. The module's code excerpts depend on the M6/M13 model names and routes being mapped through one adapter; they are not a checked-in executable SkillSlot reference build.

## Checks completed

- The agent-IP course audit reports zero flags for all 12 lessons. Read, Learn and Build lessons have at least 1,200 prose words; the checklist gate has 744. The quiz has five interactions. Every non-gate instructional lesson has a diagram, and both Learn lessons include an interactive element.
- All 12 source files pass `parseLesson` and `validateParsedLesson`; no en dash or em dash appears.
- A duplicate-paragraph scan found no identical paragraphs of at least 45 words among 169 long paragraphs in M15.
- Quiz answer-length review found the correct answer longest in one of four MCQs, below the G5 half-or-more defect threshold.
- The registered block-claims canvas passes pure model and reader-render tests. The focused frontend plus registry run passed 168 tests; frontend typecheck and shared sync check passed. It shows five required blocks for a 60-minute service with a 15-minute buffer and an existing 09:45 collision.
- Technical primitives were checked against [Luxon DateTime](https://moment.github.io/luxon/api-docs/index.html), [MongoDB query behavior](https://www.mongodb.com/docs/manual/tutorial/query-documents/), [MongoDB unique indexes](https://www.mongodb.com/docs/manual/core/index-unique/), [Mongoose lean queries](https://mongoosejs.com/docs/tutorials/lean.html), and the [Node test runner](https://nodejs.org/api/test.html).

## Open gates and integration risks

- The M6 data models and M13 provider-rule API need a consistent adapter mapping for `weekday`, local rule boundaries, zone, active status, TimeOff UTC intervals and SlotClaim block starts. The snippets state the intended contract; an executable reference build and end-to-end route tests are still required.
- The product must choose and test a coordinated write policy for provider rule or TimeOff edits racing checkout. The unique SlotClaim key resolves competing client holds but does not itself coordinate a provider edit.
- The public route's seven provider-local dates and the absolute booking horizon have distinct bounds. The learner's decision note and UI copy must use the same policy as the implementation.
- Reader visual, mobile, dark-theme, keyboard and screen-reader review of the canvas, independent technical and pedagogical critics, the executable reference build, and human G5/G6 approval are still open. Keep the services variant unavailable.
