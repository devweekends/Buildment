# SkillSlot M20 payment and confirmation draft QA

Date: 2026-10-24. Scope: the 11 approved-roadmap chapters in `courses/multi-vendor-marketplace/variants/services/20-payment-and-confirmation/`. This is authored-source QA, not an executable payment integration or a passing human G5/G6 review.

## Payment and calendar contract

M20 uses one Stripe PaymentIntent for the M19 CheckoutAttempt total across provider Orders. Amount and currency come only from immutable Booking charged allocations and provider Order snapshots. A durable PaymentAttempt with a unique checkout reference and stable external idempotency key is written before Stripe creation. Stripe calls remain outside MongoDB transaction callbacks. The raw-body webhook signature is verified before event acceptance; event IDs are durable and unique; conditional local transitions make duplicate and out-of-order delivery safe. A timely trusted success atomically pays provider Orders, confirms Bookings and SlotClaims, releases active-hold quota once, and writes notification outbox records.

Expiry first moves the attempt to a resolving state and cancels or retrieves an existing PaymentIntent outside the database transaction. It releases exact claims only after an authoritative unpaid disposition. Uncertain or processing payment leaves claims live. A card decline keeps the original hold and deadline so the client may retry an allowed method. A late success after release enters reconciliation, never a paid Booking without claims.

SkillSlot deliberately uses **line-by-line late-success recovery** for a multi-provider checkout. Recoverable Bookings re-claim their original blocks under the Provider fence and become confirmed. Lost lines become refund pending for their immutable charged allocations, with durable per-Booking RefundRecords and idempotent Stripe partial refunds outside the database transaction. Each provider Order records retained and refunded amounts; the one original PaymentIntent remains the total charge. The client is told which appointments were restored and which refunds are pending or complete. This policy is explicit and differs from an all-or-nothing late refund policy.

## Source checks completed

- Agent-IP `audit-course.mjs` reports zero flags across all 11 chapters. Nine Read/Learn/Build chapters meet the 1,200 counted prose-word floor; the Gate has 717 counted prose words; the quiz has five interactions. Non-quiz chapters include diagrams, and both Learn chapters include request traces.
- All 11 files pass server `parseLesson` and `validateParsedLesson`. Quiz MCQs have one explanation per choice and balanced option lengths. No en dash or em dash appears.
- A scan of 140 paragraphs of at least 45 words found no exact duplicate within M20.
- Technical claims were checked against primary [Stripe PaymentIntent API](https://docs.stripe.com/api/payment_intents), [Stripe idempotent requests](https://docs.stripe.com/api/idempotent_requests), [Stripe webhooks](https://docs.stripe.com/webhooks), [Stripe cancellation](https://docs.stripe.com/api/payment_intents/cancel), [Stripe partial refunds](https://docs.stripe.com/api/refunds/create), [Stripe testing](https://docs.stripe.com/testing), and [Mongoose transactions](https://mongoosejs.com/docs/transactions.html). The lessons distinguish provider status from local state and keep external calls outside retryable database transactions.

## Open integration and human gates

- The SkillSlot reference build does not yet implement Stripe routes, event store, payment and refund workers, payment UI, provider settlement, or tests. Lesson snippets and test instructions are not a running integration. Test-mode evidence must be produced by an executable application before readiness can be claimed.
- Payment method eligibility for a ten-minute hold, Stripe Connect or other provider payout strategy, production observability and support procedures need product and technical review. The source names these boundaries rather than assuming that one client charge automatically settles providers.
- Independent technical and pedagogical critics, learner accessibility review and instructor G5/G6 approval remain open. Keep the services variant unavailable until its entire path and reference build pass those gates.
