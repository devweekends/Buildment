---
artifact: variant-lesson-review
variant: digital-goods
date: 2026-10-24
status: complete
---

# Digital goods lesson review

## Authored source

- `variants/digital-goods/01-introduction/01.01-what-youre-building.md`: 1,294 prose words, one payment-to-link diagram, executable audit clear.
- `variants/digital-goods/13-previews-and-private-files/13.01-set-the-scene.md`: 1,341 prose words, executable audit clear.
- `variants/digital-goods/13-previews-and-private-files/13.02-checklist.md`: 800 prose words, executable audit clear.
- `variants/digital-goods/20-instant-fulfilment/20.01-set-the-scene.md`: 1,281 prose words, one idempotent-fulfilment diagram, executable audit clear.
- `variants/digital-goods/20-instant-fulfilment/20.02-checklist.md`: 797 prose words, executable audit clear.
- `variants/digital-goods/21-library-and-downloads/21.01-set-the-scene.md`: 1,329 prose words, executable audit clear.
- `variants/digital-goods/21-library-and-downloads/21.02-checklist.md`: 731 prose words, executable audit clear.

Module 13 separates public previews from authenticated raw files and keeps private storage metadata out of the catalogue. Module 20 makes the paid order line the unit of access, protects the effect with a unique grant key, handles partial crashes and duplicate deliveries, and keeps the browser success page read-only. Module 21 adds an active-license check, fixed file version, persistent link limit and time-limited private URL. This is a condensed Midad hero path, not a complete digital-goods track.

Validation on 2026-10-24: 7 authored files, 7,573 prose words, 0 executable editorial findings. The files compiled through `parseLesson` and `validateParsedLesson`, and the integrated ZIP worker parsed all three variant-only modules.

## Full Module 1 replacement

- `variants/digital-goods/01-product-introduction/01.01-what-youre-building.md` through `01.07-recap-and-checklist.md`: 7 learner-facing chapters.

Midad Module 1 now includes the approved product, actor, scope, entry diagnostic and weak-connection working sequence plus a conventional final learning-log gate. The new module replaces inherited FreshMarket onboarding. `node agent-ip/scripts/audit-course.mjs courses/multi-vendor-marketplace/variants/digital-goods/01-product-introduction` reported `Needs work: 0` on 2026-10-24; all 7 chapters parsed with `parseLesson` and `validateParsedLesson`. This is a module-level authoring check, not a full-course release sign-off.

## Module 5 expansion and editorial validation

- `variants/digital-goods/05-data-model-and-seed/05.01-set-the-scene.md` through `05.07-recap-and-checklist.md`: 7 distinct roadmap chapters in one variant-only module.

Midad Module 5 follows the approved seven-chapter sequence: ownership and entitlement chains, link trap, Studio/Product, ProductFile, Cart/Checkout/Order, License/DownloadGrant, and a seeded ERD gate. All six prose chapters are 1,240 to 1,255 words and the gate is 1,074 words. All seven compiled with `parseLesson` and `validateParsedLesson`.

On 2026-10-24, `node agent-ip/scripts/audit-course.mjs courses/multi-vendor-marketplace/variants/digital-goods` returned `Needs work: 0`. The repository-wide `audit-variant-repetition.mjs` found zero repeated prose paragraphs of 45 or more words after the initial template text was removed and rewritten. This checks measurable authoring rules and exact long repeats; human editorial critique and the full learner path remain open.

## Module 18 checkout authoring

- `variants/digital-goods/18-checkout-and-orders/18.01-set-the-scene.md` through `18.05-order-routes-and-checklist.md`: five distinct roadmap chapters covering one pending Checkout, per-Studio Orders, immutable option snapshots, server repricing, local transaction/recovery, scoped reads and a gate.

The five files parsed and validated; the chapter audit returned `Needs work: 0` and the repetition audit returned zero repeated long paragraphs. These are learner instructions and acceptance tests, not a recorded working Midad reference build or verified Stripe integration.

## Technical research

- [MongoDB transaction guidance](https://www.mongodb.com/docs/manual/data-modeling/enforce-consistency/transactions/) confirms multi-document transactions require a replica set or sharded cluster. [Stripe idempotent requests](https://docs.stripe.com/api/idempotent_requests) documents safe provider retries with a stable key.
- [Stripe Payment Intents](https://docs.stripe.com/payments/payment-intents) and [webhook guidance](https://docs.stripe.com/webhooks) support provider-confirmed payment and signature checking; a browser redirect is not sufficient fulfillment evidence.
- [Mongoose schema and index guidance](https://mongoosejs.com/docs/guide.html) supports the model and timestamp declarations used in Module 5; database index existence is verified separately.
- [MongoDB unique indexes](https://www.mongodb.com/docs/manual/core/index-unique/) support one grant per paid order line even when two handlers race.
- [Cloudinary media access control](https://cloudinary.com/documentation/control_access_to_media) distinguishes public, private and authenticated media and documents time-limited private download URLs. A signed URL already issued is a bearer capability until its expiry.

## Release blockers

- Run `server/scripts/audit-marketplace-inheritance.ts` against the final manifest. Hundreds of inherited shared lessons still contain FreshMarket details, so a line-by-line review and replacements remain necessary.
- Refund/revocation modules and several other product-specific lessons are not authored. Modules 13 and 20 to 21 are condensed and lack the roadmap's full sequence of exercises and reviews.
- Shared grocery stock, cart, fulfillment and shipping instructions are unsafe to inherit without line-by-line review and replacements.
- No Midad reference build, end-to-end test, G5 critics, accessibility review or instructor sign-off on final lessons is recorded.
- Keep `digital-goods` out of `availableVariantSlugs` and `repositoryPublish` off until the full path passes review.

## Update after the 2026-10-24 payment pass

`variants/digital-goods/19-payment-processing/` is now linked as `digital-goods-payment-processing` between M18 checkout and M20 fulfilment. Its five lessons cover test mode and Payment Intents, webhooks and verified events, the server-priced intent route, signature verification on the raw body, and test-mode gate evidence. M18 no longer leads to a missing payment module. `audit-course.mjs` reports zero findings for the digital-goods variant tree.

The inheritance audit still reports 249 inherited shared lessons, 180 of them with FreshMarket details. Download limits and seats under concurrency, refunds and revocation, and parts of the deploy path remain to be authored or replaced, and the shared shop, product, catalogue, cart and cache modules still carry grocery content. This module is not a complete Midad path.

## Final status

The full resolved path is authored and linked. It resolves to 90 chapters and 118,520 prose words. The inheritance audit reports zero effective FreshMarket findings and zero variant-authored references, the course audit reports zero findings, and the track is enabled in availableVariantSlugs. Separate reference builds remain deferred at the owner's request.
