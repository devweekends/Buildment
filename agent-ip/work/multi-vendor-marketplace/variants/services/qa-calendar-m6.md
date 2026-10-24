# SkillSlot M6 calendar model and seed draft QA

Date: 2026-10-24. Scope: 14 lessons in `courses/multi-vendor-marketplace/variants/services/06-calendar-data-model-and-seed/`. This is an authored-draft check, not a passing G5/G6 review.

## Reference contract

The module's learner project uses existing `server/src/modules/` conventions. User holds authentication identity; Profile holds the viewer IANA zone. One Provider per User has a working IANA zone. Service stores provider ownership, whole-15-minute duration and buffer, integer minor-unit price and policy. AvailabilityRule stores recurring provider-local weekday and wall time; TimeOff stores a resolved dated UTC interval. SlotClaim stores one scalar UTC 15-minute block and has a real unique `{ providerId: 1, blockStartAt: 1 }` MongoDB index. Booking has its own UTC appointment, participant/order references, purchase snapshot and state history. CartItem is an unreserved request; Order is one provider's checkout share.

The seed specification uses five `Asia/Gaza` providers and clients in `Asia/Gaza`, `Europe/Berlin` and `Asia/Qatar`, with stable local fixture identities, rules, time off and an inspectable historical booking. The learner's deliverables are model files, a repeatable development seed, index and model tests, `docs/seed-fixtures.md` and `docs/erd.md`. Code excerpts are mapped to the existing learner project; this repository does not yet contain a checked-in executable SkillSlot reference build.

## Checks completed

- Agent-IP audit reports zero flags across all 14 lessons. All non-quiz/non-gate chapters exceed 1,200 prose words; the gate exceeds 700. Every non-gate instructional lesson includes a diagram; the two Learn lessons use request traces.
- All 14 files passed `parseLesson` and `validateParsedLesson`. No en dash or em dash appears.
- A duplicate-paragraph scan found no identical paragraphs of at least 45 words across 202 long paragraphs.
- The four MCQs were checked for answer-length clues; after correction, the correct option is longest in fewer than half.
- Primary documentation used for model and index claims: [Mongoose schemas and indexes](https://mongoosejs.com/docs/guide.html), [Mongoose validation](https://mongoosejs.com/docs/validation.html), [MongoDB unique indexes](https://www.mongodb.com/docs/manual/core/index-unique/), [MongoDB transactions](https://www.mongodb.com/docs/manual/core/transactions/), [MongoDB embedding](https://www.mongodb.com/docs/manual/data-modeling/embedding/), and [Luxon DateTime](https://moment.github.io/luxon/api-docs/index.html).

## Open integration and human gates

- The executable reference models, seed, real database index tests, route/authorization tests and cross-module field mapping still need to be built and run. Schema snippets alone cannot prove an index exists or a multi-block booking is atomic.
- M13 must enforce provider rule overlap and provider-zone change policy. M19 must enforce the complete claim-set transaction, provider edit race policy and Order/Booking ownership. Payment and cancellation state transitions remain later-module work.
- Independent technical and pedagogical critics, reader/accessibility review, reference consistency, and human G5/G6 approval are not recorded. Keep the services track unavailable until the complete path and those gates pass.
