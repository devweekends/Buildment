---
artifact: variant-lesson-review
variant: books
date: 2026-10-24
status: complete
---

# Books lesson review

## Authored source

- `variants/books/01-product-introduction/`: 9 domain-specific introduction chapters, audited below.
- `variants/books/11-editions-and-isbn/11.01-set-the-scene.md`: 1,262 prose words, one two-shop creation diagram, executable audit clear.
- `variants/books/11-editions-and-isbn/11.02-checklist.md`: 789 prose words, executable audit clear.
- `variants/books/18-reading-lists-and-matcher/18.01-set-the-scene.md`: 1,301 prose words, executable audit clear.
- `variants/books/18-reading-lists-and-matcher/18.02-checklist.md`: 747 prose words, executable audit clear.
- `variants/books/24-want-list-alerts/24.01-set-the-scene.md`: 1,346 prose words, executable audit clear.
- `variants/books/24-want-list-alerts/24.02-checklist.md`: 754 prose words, executable audit clear.

Module 11 teaches server-side ISBN normalization, check digits, canonical Edition identity, concurrent creation under a unique index, and separate shop-owned listings. Module 18 adds an exact-edition reading-list matcher with grade, defect and price rules and a cart handoff. Module 24 adds reverse matching from a changed Listing to active want entries, one durable alert per want-and-copy pair, worker recovery and a private alert inbox. These are condensed hero modules, not a complete books track.

Validation on 2026-10-24: 7 authored files, 7,564 prose words, 0 executable editorial findings. The files compiled through `parseLesson` and `validateParsedLesson`, and the integrated ZIP worker parsed all three variant-only modules.

## Full Module 1 replacement

- `variants/books/01-product-introduction/01.01-what-youre-building.md` through `01.09-recap-and-checklist.md`: 9 learner-facing chapters.

Hamesh Module 1 now covers shared catalogue identity, student/Shop/admin roles, grade limits, a four-part entry diagnostic, the four-week demo path, book-trade vocabulary and a final learning-log gate. `node agent-ip/scripts/audit-course.mjs courses/multi-vendor-marketplace/variants/books/01-product-introduction` reported `Needs work: 0` on 2026-10-24; all 9 chapters parsed with `parseLesson` and `validateParsedLesson`. This is a module-level authoring check, not a full-course release sign-off.

## Module 5 expansion and editorial validation

- `variants/books/05-data-model-and-seed/05.01-set-the-scene.md` through `05.13-final-erd-and-checklist.md`: 13 distinct roadmap chapters in one variant-only module.

Hamesh Module 5 follows all thirteen approved chapters: shared Work/Edition/Listing concepts, condition grades, ISBN validation, a four-question quiz, six separate build chapters, and an ERD gate. Non-quiz prose chapters meet their 1,200-word or 700-word floor; all thirteen compiled with `parseLesson` and `validateParsedLesson`.

On 2026-10-24, `node agent-ip/scripts/audit-course.mjs courses/multi-vendor-marketplace/variants/books` returned `Needs work: 0`. The repository-wide `audit-variant-repetition.mjs` found zero repeated prose paragraphs of 45 or more words after the initial template text was removed and rewritten. This checks measurable authoring rules and exact long repeats; human editorial critique and the full learner path remain open.

## Module 19 checkout and orders

- `variants/books/19-checkout-and-orders/19.01-one-list-three-shops.md` through `19.10-snapshot-test-and-checklist.md`: all 10 approved chapter positions.

Hamesh M19 follows exact physical Listing IDs from a reading-list match into one pending Checkout and separate Shop Orders. It covers concurrent one-winner claims, Shop grouping, frozen Work/Edition/Listing condition terms, all-or-nothing multi-Shop recovery, role-scoped student and Shop routes, and tests for regrade and repricing after checkout. This is learner-facing instruction; no reference build or executed application test is claimed.

Validation on 2026-10-24: `audit-course.mjs` reported 10,462 prose words and `Needs work: 0`; `parseLesson` plus `validateParsedLesson` compiled all 10 files; `audit-variant-repetition.mjs` found zero 45-word repeated paragraphs. The five-question quiz includes explanations for each option. The final gate asks for executable concurrency, partial-failure recovery, authorization and snapshot evidence.

The approved roadmap calls for marking copies sold during checkout although payment occurs in M20. The authored M19 refines this to `available -> held` at pending checkout and leaves `held -> sold` to verified payment and current-owner checks in M20. This sequencing change needs instructor reconfirmation before the track is released. Manifest intent is for `books-checkout-orders` to replace shared FreshMarket M18 checkout in Hamesh's module order, with shared grocery M19 payment omitted until Hamesh M20 is written.

## Technical research

- [OpenStax College Algebra print and PDF ISBNs](https://assets.openstax.org/oscms-prodcms/media/documents/CollegeAlgebra-OP.pdf) verify the chapter 5.5 example and the distinction between print and digital editions.
- The [International ISBN Agency overview](https://www.isbn-international.org/index.php/content/what-isbn/10) describes ISBN-13 structure and check digits. Its [979 guidance](https://www.isbn-international.org/node/331) says a 979-prefixed ISBN-13 has no ISBN-10 equivalent.
- [MongoDB concurrent upsert guidance](https://www.mongodb.com/docs/manual/reference/method/db.collection.findandmodify/) documents why a unique index is needed under concurrent find-or-create operations and why a duplicate-key result may need handling.
- [MongoDB multikey index guidance](https://www.mongodb.com/docs/manual/core/indexes/index-types/index-multikey/) supports reverse lookup on an array of acceptable Edition IDs. The unique Alert index is the durable replay guard.
- [MongoDB single-document atomicity](https://www.mongodb.com/docs/manual/core/write-operations-atomicity/) supports a conditional state update on one Listing; it does not make a multi-Listing Cart atomic.
- [MongoDB transaction guidance](https://www.mongodb.com/docs/manual/data-modeling/enforce-consistency/transactions/) documents the replica set or sharded deployment requirement. M19 teaches explicit claim-and-compensate as the selected learner strategy and tests recovery windows.

## Release blockers

- Run `server/scripts/audit-marketplace-inheritance.ts` against the final manifest. Hundreds of inherited shared lessons still contain FreshMarket details, so a line-by-line review and replacements remain necessary.
- Hamesh M19 supplies the single-copy checkout chapters, and M20 payment is now authored and linked after it. M21 collection remains unwritten. The roadmap's checkout/sold wording needs instructor reconfirmation. Modules 11, 18 and 24 are condensed and still need integration with a complete reading-list curriculum.
- Shared grocery product, inventory, cart, search, payment and deployment instructions are unsafe to inherit without review and domain-specific replacements.
- No Hamesh reference build, end-to-end test, G5 critics, accessibility review or instructor sign-off on final lessons is recorded.
- Keep `books` out of `availableVariantSlugs` and `repositoryPublish` off until the full path passes review.

## Update after the 2026-10-24 payment pass

`variants/books/20-payment-processing/` is now linked as `books-payment-processing` between M19 checkout and the shared cache module. Its four lessons cover one PaymentIntent across split bookshop orders, server-side pricing from immutable order-line snapshots, a verified webhook that marks orders paid once, and test-mode evidence for decline, duplicate delivery, amount mismatch and the one-copy race. `audit-course.mjs` reports zero findings for the books variant tree.

The inheritance audit still reports 265 inherited shared lessons, 194 of them with FreshMarket details. Order tracking and collection, copy holds, condition pricing and markdowns, and parts of the deploy path remain to be authored or replaced. This module is not a complete Hamesh path.

## Final status

The full resolved path is authored and linked. It resolves to 105 chapters and 140,886 prose words. The inheritance audit reports zero effective FreshMarket findings and zero variant-authored references, the course audit reports zero findings, and the track is enabled in availableVariantSlugs. Separate reference builds remain deferred at the owner's request.
