---
artifact: variant-release-readiness
course: multi-vendor-marketplace
date: 2026-10-24
status: five-variants-not-ready
---

# Multi-vendor Marketplace release readiness

## Course identity

The published database course is `freshmarket-multi-vendor-marketplace-v3`. The repository source remains `courses/multi-vendor-marketplace/`. Its manifest targets that existing slug, so a repository release updates the same course ID and keeps existing learner history. The configured instructor is `devweekends@gmail.com`. The catalog title is **Multi-vendor Marketplace**; the available product track is **FreshMarket grocery**.

`repositoryPublish` is `false` and `availableVariantSlugs` is `[grocery]`. Those two settings stay unchanged until every new track has a complete learner path and passes the inheritance gate.

## Variant gate

| Variant | Roadmap confirmation | Authored variant modules in the manifest | Selectable for new learners |
|---|---|---:|---:|
| grocery / FreshMarket | Existing published course | 26 shared modules, 385 shared lessons | Yes |
| services / SkillSlot | AQIB and ASIF, owner-reported; date not supplied | 9 modules, 93 lessons | No |
| handmade / Ghurza | AQIB and ASIF, owner-reported; date not supplied | 7 modules, 46 lessons | No |
| home-kitchens / Sufra | AQIB and ASIF, owner-reported; date not supplied | 10 modules, 76 lessons | No |
| digital-goods / Midad | AQIB and ASIF, owner-reported; date not supplied | 7 modules, 30 lessons | No |
| books / Hamesh | AQIB and ASIF, owner-reported; date not supplied | 7 modules, 42 lessons | No |

The five roadmaps have distinct domain models, build steps, and capstones. A product-name replacement in the grocery lessons cannot teach those flows. `availableVariantSlugs: [grocery]` prevents new learner choice and random assignment to the unfinished tracks. Historical selections and pinned releases remain unchanged.

## What this pass changed

- **SkillSlot M9 authorization** (9 lessons) is linked as `services-booking-authorization` and replaces inherited shared module 08 in the SkillSlot module order. Its quiz option lengths were rebalanced and all eight non-quiz lessons were expanded past the prose threshold. The course audit reports zero findings for the SkillSlot variant tree.
- **Midad M19 payment** (5 lessons) is authored and linked as `digital-goods-payment-processing` between M18 checkout and M20 fulfilment. M18 no longer leads to a missing payment module. The module adds the verified-webhook path, server-priced PaymentIntent, and test-mode evidence.
- **Hamesh M20 payment** (4 lessons) is authored and linked as `books-payment-processing` after M19 checkout. It covers one PaymentIntent across split bookshop orders, server-side pricing from snapshots, an idempotent verified webhook, double submit, and the one-copy race.
- **Ghurza M20 payment** (5 lessons) is authored and linked as `handmade-payment-processing` after M19 sold-once checkout. It covers holds turning into sales, one payment across workshop orders, expired holds, and late-success refund.
- **Sufra M22 kitchen acceptance and order lifecycle** (7 lessons) is completed and linked as `home-kitchens-order-lifecycle` after M21 async jobs. It covers guarded transitions, the acceptance deadline, reject/release/refund, and the kitchen board.
- These are post-approval refinements. AQIB and ASIF approved the roadmaps according to the course owner, but approval dates and signatures were not supplied. The new lessons need instructor reconfirmation at the variant gate.

## Checks run in this pass

All commands were run on the live tree on 2026-10-24.

| Check | Result |
|---|---|
| `pnpm --dir server courses:package:check` | Pass: 2,177,743 bytes, 26 shared modules, handmade 7, digital-goods 7, books 7, services 9, home-kitchens 10 |
| `pnpm --dir server content:validate:source --course multi-vendor-marketplace` | Pass: 672 of 672 chapters, 0 failed |
| `pnpm --dir server content:audit --course multi-vendor-marketplace --strict` | Pass: 0 errors, 0 warnings across 26 module dirs |
| `node agent-ip/scripts/audit-variant-repetition.mjs courses/multi-vendor-marketplace/variants` | Pass: 0 paragraphs of 45 or more words repeated |
| `pnpm exec tsx scripts/audit-marketplace-inheritance.ts` | Fails the release condition: 182, 187, 161, 180 and 194 grocery-specific inherited lessons remain in services, handmade, home-kitchens, digital-goods and books respectively |
| `node agent-ip/scripts/audit-course.mjs` per variant tree | Pass for all five authored variant trees: 0 findings each |
| Server and frontend typecheck | Pass |
| Relevant server tests (`course-tracks`, `course-variant-assignment`, `course-variant-package`, `repository-course-publish`) | Pass: 24 tests |
| Relevant frontend canvas tests (SkillSlot time and block claims, Sufra window fill and cutoff) | Pass: 14 tests |
| `pnpm --dir server sync-shared:check` | Pass: frontend shared copy in sync |
| `git diff --check` | Pass |

The `audit-course.mjs` pass covers the authored variant folders only. It does not audit the inherited shared lessons, and it is not a G5 pass for the whole course.

## Inheritance evidence

The inheritance audit counts shared lessons a variant still inherits after overrides and omissions, then flags those whose raw text names FreshMarket or grocery details.

| Variant | Inherited shared lessons | Flagged with FreshMarket details | Released |
|---|---:|---:|---:|
| services | 255 | 182 | No |
| handmade | 246 | 187 | No |
| home-kitchens | 217 | 161 | No |
| digital-goods | 249 | 180 | No |
| books | 265 | 194 | No |

A zero lexical finding would only start the review. Today every variant still fails the condition for release. The flagged files are concentrated in the shared project skeleton, MongoDB rationale, config, authentication, authorization, vendor store, product management, catalogue, cart, cache and deploy modules. Many are carry-over modules whose prose still names FreshMarket or grocery examples rather than the variant product.

## Remaining blocker by variant

- **services / SkillSlot:** the payment and authorization modules exist, but the provider profile, practice setup, services API, portfolio, booking UI, cart, bookings agenda, cancellation and rescheduling, cache, async jobs, deploy and pricing paths still inherit grocery lessons or have no variant module. The roadmap's full 28-module sequence is not present.
- **handmade / Ghurza:** M19 checkout, M20 payment and the M22 to M24 commission path exist. Order tracking and collection, the later deploy and hardening path, and the shared shop, product, catalogue and cart modules still carry grocery content.
- **home-kitchens / Sufra:** M22 lifecycle is complete, but the live order tracking hero module, later hardening, refunds and deploy path are missing. The shared shop, product, dashboard, photo, storefront and cache modules still carry grocery content.
- **digital-goods / Midad:** M18 checkout leads to M19 payment and M20 fulfilment. Download limits and seats under concurrency, refunds and revocation, and parts of the deploy path are still missing, and the shared shop, product, catalogue, cart and cache modules still carry grocery content.
- **books / Hamesh:** M19 checkout leads to M20 payment. Order tracking and collection, copy holds, condition pricing and markdowns, and parts of the deploy path are still missing, and the shared shop, product, photo, catalogue, cart and cache modules still carry grocery content.

## Completion requirement for each remaining track

Author its roadmap-specific learner path under `courses/multi-vendor-marketplace/variants/<slug>/`, link each replacement by stable lesson key, add any required variant-only modules and assessments, check the capstone and production evidence, run source, structure, editorial and reference consistency review, then include the slug in `availableVariantSlugs`. The course title and one course ID remain shared. A learner who selects or receives a released variant must see its own build instructions, data model, checks, and capstone from start to finish.

The ZIP and immutable release format now supports variant-only modules, explicit lesson omissions, and a complete per-variant module order. The five tracks still need their full roadmap-specific content and review before publication.

## Environment note

The disposable PostgreSQL container `buildment-multivariant-test-20261024` on port 54329 supplied the scratch database for the relevant tests. The tests passed with `NODE_ENV=test` because the session shell sets `NODE_ENV=production`, which otherwise makes the driver require TLS. The container is stopped after this pass; the earlier release rehearsal records remain in the decision log.
