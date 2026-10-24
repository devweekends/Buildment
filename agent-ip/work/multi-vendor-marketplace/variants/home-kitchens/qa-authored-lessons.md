---
artifact: variant-lesson-review
variant: home-kitchens
date: 2026-10-24
status: incomplete
---

# Sufra lesson review

## Authored source

`courses/multi-vendor-marketplace/variants/home-kitchens/01-introduction/` contains seven Sufra-specific lessons on the product, cook and diner journeys, scope, date diagnostic, four-week demos and working-rhythm gate. `05-data-model-and-seed/` contains nine lessons on stockless dishes, kitchen ownership, dated windows with embedded claims, one-interval carts, split order snapshots, seven-day sample seed, quiz and ERD gate. `09-kitchen-api/` contains six lessons on owned profiles, service areas, local weekly rules, named zones, date-specific pause and ownership tests. `14-delivery-windows-and-cutoffs/` contains nine lessons on dated windows, cutoffs, exceptions and fake clocks. `15-browse-by-window-api/` contains six lessons on window-first eligibility, joined kitchens and dishes, per-dish cutoffs, filters, pagination and query-plan evidence. `17-cart-api/` contains six lessons on a private one-interval cart, current cutoff checks, explicit window-change review, per-kitchen load and ownership tests. `19-checkout-capacity-and-orders/` contains nine lessons on atomic claims, durable compensation across kitchens, holds, split orders and race tests. `20-payment-processing/` contains nine lessons on one PaymentIntent, signed event inbox, a decision quiz, confirmation of two kitchen claims, late-success recovery, share-based refunds and replay tests. `21-async-jobs-and-queues/` contains eight lessons on a separate worker, scheduled dated windows, delayed hold expiry, scoped cook alerts, restart recovery and a decision quiz. All nine authored module chapter audits report zero findings. The added checks and gates are post-approval refinements awaiting AQIB and ASIF reconfirmation.

The Build path uses an idempotent dated-window upsert that leaves existing holds alone, a per-dish cutoff bounded by the general window cutoff, closure that preserves paid promises, and injected-clock tests one second before, at, and after the cutoff. The quiz asks learners to distinguish cutoff, capacity, retry, and closure outcomes.

## Technical verification and sources

- The 14.05 pure cutoff function was extracted into an isolated JavaScript run. A 13:00 window with 90 minutes of prep and a 20-minute travel buffer gave a maqluba cutoff at 11:10; the faster dish retained the 12:00 general cutoff. One second before was accepted, and the cutoff instant was rejected. This is example verification, not a Sufra reference build or database integration test.
- M19's capacity and compensation examples are researched against official MongoDB atomicity and transaction guidance, plus Stripe's PaymentIntent and idempotency references. The M19 race script is a learner exercise; it has not yet run against a complete Sufra build, so its claimed winner count is a test target rather than observed evidence.
- All 35 JavaScript code fences across the nine authored Sufra modules passed `node --check` syntax parsing. This does not verify database behavior, route integration, or the learner reference build.
- M17's 7,092 prose words passed the local agent-IP chapter audit with zero findings. Its route, revision and authorization scenarios remain learner test targets because the complete Sufra reference build is absent.
- M20's nine chapters passed the local agent-IP chapter audit with zero findings, including the three-question payment decision quiz and an open replay prompt. Official Stripe documentation was checked for raw-body signature verification, PaymentIntent state, idempotent requests and partial refunds. No live Stripe test-mode or Sufra webhook integration run is claimed.
- M21's eight chapters and 8,371 prose words passed the local agent-IP chapter audit with zero findings. Official BullMQ docs were checked for Job Schedulers, delayed jobs, stable job IDs and idempotent processors. No running Redis worker, provider integration or Sufra restart test is claimed.
- M9's area-code, weekly-rule and IANA-zone helper examples passed six isolated Node assertions, including normalization, duplicate rejection, schedule overlap, fractional capacity and raw-offset rejection. These are example-level checks, not a running Kitchen API.
- M15's aggregation structure follows [MongoDB `$lookup` pipeline guidance](https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/), [early `$match` guidance](https://www.mongodb.com/docs/manual/reference/operator/aggregation/match/), and [`$dateSubtract` reference](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateSubtract/). There is no local MongoDB server or complete Sufra reference build in this workspace, so the aggregation's output and `explain()` plan remain learner test targets, not observed results.
- [MongoDB's atomicity guide](https://www.mongodb.com/docs/manual/core/write-operations-atomicity/) and [unique-index documentation](https://www.mongodb.com/docs/manual/core/index-unique/) support the guarded window update and retry design.
- [MongoDB's transaction guidance](https://www.mongodb.com/docs/manual/core/transactions/) documents the alternative to the approved compensating release path, and [MongoDB TTL guidance](https://www.mongodb.com/docs/manual/core/index-ttl/) says TTL deletion is not immediate.
- [Stripe's PaymentIntent reference](https://docs.stripe.com/api/payment_intents) and [idempotent request reference](https://docs.stripe.com/api/idempotent_requests) support one payment path per prepared attempt and stable retry keys.
- [Stripe's webhook guide](https://docs.stripe.com/webhooks) requires the raw body for signature verification, and [webhook recovery guidance](https://docs.stripe.com/events/manage-webhook-endpoints) covers duplicate delivery and retries.
- [Stripe's refund creation reference](https://docs.stripe.com/api/refunds/create) supports an amount in the smallest currency unit and partial refunds up to the remaining refundable amount.
- [BullMQ Job Schedulers](https://docs.bullmq.io/guide/job-schedulers/) and [repeat options](https://docs.bullmq.io/guide/job-schedulers/repeat-options) support the recurring UTC generation example, while [delayed jobs](https://docs.bullmq.io/guide/jobs/delayed) and [idempotent jobs](https://docs.bullmq.io/patterns/idempotent-jobs) inform expiry and notification retries.
- [Mongoose `findOneAndUpdate` documentation](https://mongoosejs.com/docs/tutorials/findoneandupdate.html) describes update behavior and the need to account for an unindexed upsert race.
- [Luxon's API reference](https://moment.github.io/luxon/api-docs/index.html) documents zone-based conversion used in the local schedule examples.
- [MDN's `Temporal.ZonedDateTime` guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/ZonedDateTime) explains how a named zone differs from a fixed offset across rule changes.

## Release blockers

- The "Window fill and cutoff" canvas is registered and linked in 14.02. Its model unit tests and frontend typecheck passed in platform work. A reader integration and accessibility review are still required before release, and its M26 rush-mode use remains open.
- M1, M5, M9, M14, M15, M17, M19, M20 and M21 alone are not the Sufra path. The roadmap's cook and diner interfaces, cook acceptance, live timeline, and deployment modules still need complete domain-specific learner chapters and integrated QA. Grocery-specific inherited lessons cannot be assumed safe.
- No complete Sufra reference build, MongoDB concurrency test, end-to-end learner walkthrough, G5 critics, accessibility review, or instructor sign-off on the final authored lessons is recorded.
- Keep home-kitchens unavailable for selection and repository publication until the whole variant passes the course release gates.

## Update after the 2026-10-24 lifecycle pass

`variants/home-kitchens/22-kitchen-acceptance-and-lifecycle/` is now complete and linked as `home-kitchens-order-lifecycle` after M21 async jobs. Its seven lessons cover the acceptance problem, the order state machine, guarded transitions with sequenced timeline events, the acceptance deadline, reject/release/refund, and the kitchen board. The two earlier lessons were expanded past the prose threshold, and `audit-course.mjs` reports zero findings for the home-kitchens variant tree.

The inheritance audit still reports 217 inherited shared lessons, 161 of them with FreshMarket details. The live order tracking hero module, later hardening, refunds and the deploy path remain to be authored or replaced, and the shared shop, product, dashboard, photo, storefront and cache modules still carry grocery content. This module is not a complete Sufra path.
