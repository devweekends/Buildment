---
artifact: variant-lesson-review
variant: handmade
date: 2026-10-24
status: incomplete
---

# Handmade lesson review

## Authored source

- `variants/handmade/01-product-introduction/`: 7 domain-specific introduction chapters, audited below.
- `variants/handmade/22-custom-requests/22.01-set-the-scene.md`: 1,217 prose words, one private-request flow diagram, executable audit clear.
- `variants/handmade/22-custom-requests/22.02-checklist.md`: 703 prose words, executable audit clear.
- `variants/handmade/23-quotes-and-deposits/23.01-set-the-scene.md`: 1,260 prose words, executable audit clear.
- `variants/handmade/23-quotes-and-deposits/23.02-checklist.md`: 792 prose words, executable audit clear.
- `variants/handmade/24-production-and-balance/24.01-set-the-scene.md`: 1,211 prose words, executable audit clear.
- `variants/handmade/24-production-and-balance/24.02-checklist.md`: 791 prose words, executable audit clear.

The custom-request lesson defines party-scoped API queries, a limited state machine, photo access, cross-workshop and cross-buyer tests, and a stale-tab failure path. Modules 23 and 24 continue through immutable quote versions, server-priced deposits, production evidence, buyer approval, a separate balance payment, shipping and stage-based refund. All three modules are condensed versions of the roadmap's hero sequence. They are not a complete handmade track.

Validation on 2026-10-24: 7 authored files, 7,351 prose words, 0 executable editorial findings. The files compiled through `parseLesson` and `validateParsedLesson`, and the integrated ZIP worker parsed all three variant-only modules.

## Full Module 1 replacement

- `variants/handmade/01-product-introduction/01.01-what-youre-building.md` through `01.07-working-rhythm-recap-and-checklist.md`: 7 learner-facing chapters.

Ghurza Module 1 now covers maker credit, accurate craft descriptions, finished Piece versus future commission, product scope, entry check and a recoverable working rhythm. The final checklist asks for actor and copy evidence before coding. `node agent-ip/scripts/audit-course.mjs courses/multi-vendor-marketplace/variants/handmade/01-product-introduction` reported `Needs work: 0` on 2026-10-24; all 7 chapters parsed with `parseLesson` and `validateParsedLesson`. This is a module-level authoring check, not a full-course release sign-off.

## Module 5 expansion and editorial validation

- `variants/handmade/05-data-model-and-seed/05.01-set-the-scene.md` through `05.13-final-erd-recap-and-checklist.md`: 13 distinct roadmap chapters in one variant-only module.

Ghurza Module 5 follows all thirteen approved chapter positions: three framing chapters, ownership, craft fields, two sale paths, a four-question quiz, five separate model/seed builds, and an ERD gate. Non-quiz prose chapters meet their 1,200-word or 700-word floor; all thirteen compiled with `parseLesson` and `validateParsedLesson`.

On 2026-10-24, `node agent-ip/scripts/audit-course.mjs courses/multi-vendor-marketplace/variants/handmade` returned `Needs work: 0`. The repository-wide `audit-variant-repetition.mjs` found zero repeated prose paragraphs of 45 or more words after the initial template text was removed and rewritten. This checks measurable authoring rules and exact long repeats; human editorial critique and the full learner path remain open.

## Module 19 checkout: sold exactly once

- `variants/handmade/19-checkout-sold-once/19.01-set-the-scene.md` through `19.15-recap-and-checklist.md`: all 15 approved roadmap chapters in sequence.

The module teaches one-off Piece claims through a conditional single-document update, expiry and stale-release ownership, all-or-nothing handling for a Cart spanning Workshops, pending split Orders, agreed-term snapshots, scoped buyer and maker routes, concurrent-buyer verification, and immutability after catalog edits. It distinguishes a time-limited pending hold from a paid sale. It does not claim to implement payment, refund, or a reference application build.

Validation on 2026-10-24: `audit-course.mjs` reported 16,730 prose words and `Needs work: 0` across all 15 files; `parseLesson` plus `validateParsedLesson` parsed all 15; `audit-variant-repetition.mjs` found zero repeated paragraphs of 45 or more words across the variants. The quiz has five questions with one explanation per option and mixed correct positions. The gate asks for executable one-winner, expired-hold stale-release, split-Order rollback, authorization and immutable-snapshot evidence. This is lesson-source validation, not evidence that learners ran a reference build.

Manifest intent: `handmade-checkout-sold-once` takes the position of inherited shared M18 checkout in the Ghurza learning path. Shared M19 grocery payment is omitted, and the authored Ghurza M20 payment module now follows checkout. Number 19 on the Ghurza chapter is its variant roadmap number, not a claim that the FreshMarket M19 lesson applies.

## Technical research

- [Mongoose schema and reference guidance](https://mongoosejs.com/docs/guide.html) supports the model skeleton; a reference by itself does not enforce same-workshop credit.
- [MongoDB single-document atomicity](https://www.mongodb.com/docs/manual/core/write-operations-atomicity/) supports a conditional status update on the request document. Messages remain separate and may need retry after a crash between writes.
- [MongoDB transactions](https://www.mongodb.com/docs/manual/data-modeling/enforce-consistency/transactions/) confirms the replica set or sharded deployment requirement for multi-document transactions. The Ghurza M19 learner path selects claim-and-compensate and names its recovery obligations.
- [MongoDB findAndModify reference](https://www.mongodb.com/docs/manual/reference/method/db.collection.findandmodify/) documents the single-document update/return behavior; the lesson directs learners to verify the actual API return mode used in their stack.
- [Stripe Payment Intents](https://docs.stripe.com/payments/payment-intents) and [webhook guidance](https://docs.stripe.com/webhooks) support the two separate, verified payments and replay tests. [Stripe's Refund API](https://docs.stripe.com/api/refunds/create) supports a partial refund up to the unrefunded captured amount.

## Release blockers

- Run `server/scripts/audit-marketplace-inheritance.ts` against the final manifest. Hundreds of inherited shared lessons still contain FreshMarket details, so a line-by-line review and replacements remain necessary.
- Modules 22 to 24 are condensed; the roadmap's individual build steps, quizzes, interactive lead-time/cancellation canvases and integration with the rest of the course still need to be expanded and reviewed.
- The Ghurza module order uses custom Modules 22 to 24 in place of FreshMarket's M22 queues, M23 deploy and M24 stock reservations. Their learning outcomes must be taught at the roadmap's Ghurza M25 to M27 or earlier; renumbering alone does not preserve them.
- Ghurza M19 replaces inherited grocery checkout in the intended manifest order, and Ghurza M20 payment is now authored and linked after it. Shared grocery product, cart, shipping, cache and deployment chapters have not been reviewed or replaced for this domain. Inheritance is unsafe by default.
- No handmade reference build, end-to-end commission test, G5 critics, accessibility review or instructor sign-off on final lessons is recorded. The user's roadmap approval report does not establish those gates.
- Keep `handmade` out of `availableVariantSlugs` and `repositoryPublish` off until the full path and reference consistency are reviewed.

## Update after the 2026-10-24 payment pass

`variants/handmade/20-payment-processing/` is now linked as `handmade-payment-processing` between M19 sold-once checkout and the M22 to M24 commission path. Its five lessons cover the difference between paid, held and sold, one PaymentIntent across workshop orders, the verified webhook that sells held pieces, expired holds, and a late-success refund. `audit-course.mjs` reports zero findings for the handmade variant tree.

The inheritance audit still reports 246 inherited shared lessons, 187 of them with FreshMarket details. Order tracking and collection, the later deploy and hardening path, and the shared shop, product, catalogue and cart modules remain to be authored or replaced. This module is not a complete Ghurza path.
