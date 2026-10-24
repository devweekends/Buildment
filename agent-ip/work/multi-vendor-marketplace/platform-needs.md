# Platform needs: one marketplace course with complete product variants

**Status:** active implementation record, 2026-10-24.
**Decision:** One `Course.id`, one catalog entry, one instructor, and an immutable release with a curriculum per variant. See `docs/12-course-variants-and-publishing.mdx` and `agent-ip/decision-log.md`.

## Current platform

- `server/src/shared/lib/course-tracks.ts` defines the six marketplace products and their visual themes. A learner's `Enrollment.variantSlug` records the selected or assigned product.
- The backend release model in `server/src/services/courses/releases.ts` stores a curriculum per variant. It pins a started learner to an immutable release, so future changes preserve progress and feedback.
- `server/src/services/teach/publish-course-release.ts` supports shared lessons, full or exact-text variant lesson overrides, variant-only modules, explicit lesson omissions, and a complete per-variant `moduleOrder`. The release stores one resolved curriculum per variant and the reader selects it from the learner's track.
- `server/src/services/courses/track.ts` and `variant-assignment.ts` honor the course's `availableVariantSlugs` setting. FreshMarket lists only `grocery` while other tracks lack lessons. Historical choices remain readable.
- Repository source lives only in `courses/multi-vendor-marketplace/`; drafts and QA live in `agent-ip/work/multi-vendor-marketplace/`. The source manifest targets the existing database slug `freshmarket-multi-vendor-marketplace-v3`. The publisher refuses to create a second course when that target is missing.
- The configured instructor is `devweekends@gmail.com` in `courses/publishing.yaml`.

## Work still needed before enabling each variant

1. **Variant curriculum structure.** Implemented: the manifest, ZIP worker, release writer, preview and strict source audit support variant-only modules, lesson omissions and a per-variant `moduleOrder`. The remaining work for SkillSlot, Ghurza, Sufra, Midad and Hamesh is content and review, not structure.
2. **Resolved variant lessons.** Author the product-specific tasks, data models, build steps, tests, assessments, production evidence and capstones in `courses/multi-vendor-marketplace/variants/<slug>/`. For a shared lesson, write the common spine once and use `%%product.name%%` or exact `replacements` where the sentence applies to every product or changes by product. Author a full variant file when the flow changes. Link variant files to stable keys in the manifest.
3. **Publication gate.** Validate the entire resolved learner path for each variant, including reader routing, sequential progress, resume links, previews, assignment and release pinning. Audit effective content after `moduleOrder`, omissions, overrides and replacements. Enable the slug in `availableVariantSlugs` only after this and agent-IP G5/G6 review. A roadmap and a product-name token do not count as a completed track.
4. **Reference consistency.** Seven FreshMarket mismatches remain in `qa/reference-consistency.md`. The owner requested that separate variant reference builds be deferred, so the normal reference-build gate is open rather than passed.
5. **Editorial quality.** FreshMarket currently has 362 course-audit findings. Publication has an explicit advisory exception; the findings still need revisions and re-review. Existing punctuation and quiz-feedback format use a narrow `legacySourceAudit` compatibility exception during stable-key adoption.

## One-course learner contract

A learner sees the generic **Multi-vendor Marketplace** course, then selects an available variant or receives one through assignment. The choice determines the variant's actual curriculum, not just its name and colors. The variant locks when the learner starts. Existing work stays on its original release. The catalog must not show six separate marketplace courses, and the publisher must not create a duplicate FreshMarket row.
