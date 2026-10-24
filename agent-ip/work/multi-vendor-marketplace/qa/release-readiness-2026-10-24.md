---
artifact: variant-release-readiness
course: multi-vendor-marketplace
date: 2026-10-24
status: five-variants-ready
---

# Multi-vendor Marketplace release readiness

## Course identity

The repository is one shared **Multi-vendor Marketplace** course. A learner sees one catalog entry, chooses or receives a variant, and the immutable release resolves that variant's curriculum. The published database row keeps the legacy slug `freshmarket-multi-vendor-marketplace-v3`; that slug identifies the existing course and learner history, not the course identity. The repository target remains that slug, so the release updates the same course ID. The configured instructor is `devweekends@gmail.com`.

`repositoryPublish` is `true`, and all six tracks are in `availableVariantSlugs`: grocery, services, handmade, home-kitchens, digital-goods and books.

## Variant readiness

| Variant | Product | Authored modules | Resolved chapters | Effective FreshMarket findings | Available |
|---|---|---:|---:|---:|---:|
| grocery | FreshMarket | 26 shared modules | legacy baseline | legacy editorial debt | Yes |
| services | SkillSlot | 23 | 149 | 0 | Yes |
| handmade | Ghurza | 23 | 109 | 0 | Yes |
| home-kitchens | Sufra | 23 | 132 | 0 | Yes |
| digital-goods | Midad | 22 | 90 | 0 | Yes |
| books | Hamesh | 23 | 105 | 0 | Yes |

Each new variant has its own resolved path from introduction through capstone. The shared modules still used by the new tracks are the project skeleton, config, authentication, login and deploy. Their FreshMarket passages are adapted with exact replacements, and the lessons that replacement could not reach use full variant override files.

## Checks run in this pass

| Check | Result |
|---|---|
| `pnpm --dir server content:validate:source --course multi-vendor-marketplace` | Pass: 1,201 chapters, 0 failed |
| `pnpm --dir server content:audit --course multi-vendor-marketplace --strict` | Pass: 0 errors, 0 warnings across 26 module dirs |
| `pnpm exec tsx scripts/audit-marketplace-inheritance.ts` | Pass for release: 0 effective findings and 0 variant-authored references in all five new tracks |
| `node agent-ip/scripts/audit-variant-repetition.mjs courses/multi-vendor-marketplace/variants` | Pass: 0 paragraphs of 45 or more words repeated |
| `node agent-ip/scripts/audit-course.mjs` per variant tree | Pass: 0 findings for services, handmade, home-kitchens, digital-goods and books |
| `pnpm --dir server courses:package:check` | Pass: 3,731,715 bytes, 26 shared modules, 23 handmade, 22 digital-goods, 23 books, 23 services, 23 home-kitchens |
| `pnpm --dir server courses:check` | Pass: 10 opted-in course packages validated |
| Server typecheck | Pass |
| `git diff --check` | Pass |

The engineering claims in the lessons are authored against the roadmap, but no separate variant reference build was executed. The owner requested that reference builds be deferred, so that remains an explicit exception rather than a passed gate.

## Editorial exception

`repositoryEditorialAudit: advisory` remains on this course. The legacy FreshMarket baseline still has 362 editorial findings, mostly inherited prose and formatting debt in the shared grocery chapters. The five new variant paths audit clean, but the publisher reports the baseline findings under the recorded exception. Clearing that debt is a separate editorial pass over the shared FreshMarket chapters and should not be described as finished.

## What the shared model does

The shared source is the base curriculum. A variant resolves its own path in this order:

1. `moduleOrder` selects the modules in the variant path.
2. `omitLessonKeys` removes shared lessons from the modules that remain.
3. A full override `file` replaces the shared lesson.
4. Exact `replacements` adapt a shared lesson's text.
5. `%%product.name%%` resolves at read time to the learner's product name.

The inheritance audit applies the first four before judging a passage, so a shared sentence that a variant replaces or omits is not counted against that learner.

## Instructor reconfirmation

AQIB and ASIF approved the five roadmaps according to the course owner; approval dates and signatures were not supplied. The authored paths are post-approval refinements and need instructor reconfirmation at the variant gate. The owner deferred separate variant reference builds.

## Environment note

The relevant database tests use the disposable PostgreSQL container `buildment-multivariant-test-20261024` with `NODE_ENV=test`, because the session shell sets `NODE_ENV=production`. The container is stopped.
