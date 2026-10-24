# SkillSlot M19 holds and checkout draft QA

Date: 2026-10-24. Scope: the 12 approved-roadmap chapters in `courses/multi-vendor-marketplace/variants/services/19-holds-and-checkout/`. This is source-draft QA, not a passing G5/G6 review or an executable reference-build claim.

## Cross-module contract

M19 replaces grocery checkout in the SkillSlot module order. A cart is an unreserved proposal. A successful checkout creates one CheckoutAttempt, one pending Order per provider, one held Booking per cart line, and one unique SlotClaim per 15-minute occupied provider block. The whole multi-provider set commits or aborts in one MongoDB transaction. M15's `blocksFor(startMs,durationMinutes,bufferMinutes)` is used both to filter offers and to insert claims. An offer read is advisory; the unique `{providerId, blockStartAt}` index decides exclusive ownership. The route returns a common ten-minute hold deadline and does not charge a card.

M13 provider schedule edits write `Provider.scheduleRevision` on the Provider document. M19 extends Provider with `calendarFence`; checkout increments it inside the transaction, then re-reads listed status, Service terms, rules and TimeOff. Both workflows write the same Provider document, forcing a conflict and fresh validation when a provider edit races a checkout. Sorted Provider ID order limits cross-provider lock-order variation. The lesson explicitly keeps transaction callbacks free of external payment calls and irreversible notifications. An expired unpaid attempt releases exact claims through a payment-safe state transition, while Booking and Order snapshots remain. M20 must resolve payment-pending and late-success outcomes before production readiness.

CheckoutAttempt has unique `{clientId, checkoutId}` and a versioned canonical intent fingerprint. A same-ID retry returns original records and deadline; changed intent is a 409. Per-client HoldQuota counters use a contended document write in the checkout and release transactions; a shared rate limiter controls new attempts. A repeat retrieval does not consume a new-hold allowance. Purchase snapshots preserve price, duration, buffer, policy, zone and UTC obligations. Tests specified include twenty different clients on one start (one 201, nineteen 409), an overlapping-start variant, two-provider late abort, schedule-edit race, idempotent lost-response recovery, quota concurrency and expiry idempotence.

## Source checks completed

- Agent-IP `audit-course.mjs` reports zero flags for all 12 chapters. Ten Read/Learn/Build chapters meet the 1,200-prose-word floor; the Gate has 749 counted prose words; the quiz has five interactions. Non-quiz chapters have diagrams, and all Learn chapters include request traces.
- All 12 files pass `parseLesson` and `validateParsedLesson` in the server importer. Quiz MCQs have one explanation per choice and the correct choice is not the longest in a majority of questions.
- A scan of 159 paragraphs of at least 45 words found no exact duplicate across the module. No en dash or em dash appears in the source files.
- Technical claims were checked against the primary [MongoDB transaction production guide](https://www.mongodb.com/docs/manual/core/transactions-production-consideration/), [MongoDB unique index guide](https://www.mongodb.com/docs/manual/core/index-unique/), [MongoDB TTL index guide](https://www.mongodb.com/docs/manual/core/index-ttl/) and [Mongoose transaction guide](https://mongoosejs.com/docs/transactions.html). The lessons distinguish transaction atomicity, unique-key contention, potentially stale reads and delayed TTL deletion.

## Open integration and human gates

- The SkillSlot reference application does not yet implement these routes, migration, unique indexes, background release, shared rate limiter or payment-aware state machine. Code excerpts and test instructions in chapters are not a running build. Run the tests on a replica set with indexes verified before any availability claim is marketed as ready.
- M20 services payment must create and reconcile the external payment operation after the database hold; handle trusted webhooks, expiry racing a payment, late success and refund or recovery policy. The inherited grocery payment module is not a valid substitute.
- Independent technical and pedagogical critics, learner accessibility review and instructor G5/G6 approval remain open. Keep the services variant unavailable until the complete module path and reference build pass those gates.
