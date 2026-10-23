# Platform needs: variants and personalization

**Status:** draft for the platform team and instructors
**Architecture update (2026-10-23):** Section 1's proposal to create a separate `Course` row
per variant is superseded. The agreed direction is one course with shared content, variant
changes, and immutable learner releases. See `docs/12-course-variants-and-publishing.mdx`.
**Scope:** what buildment must add so the multi-vendor marketplace family (six variants) and the personalization layer (`personalization-layer.md`) can run with a real cohort
**Basis:** the code in this repository as read on 2026-10-20. Every "exists today" line names the file it comes from. Where something was looked for and not found, it says "not found".

**Sizes:** S is up to 2 developer days, M is 3 to 7 days, L is more than 7 days. Sizes include tests and docs, not content work.

A note on the importer: `server/scripts/import-course.ts` with `--course <slug>` support and the `course.yaml` manifest in `server/scripts/course-source.ts` exist in the working copy at the time of writing but are **not committed** (the committed importer hard-codes `content/import/multi-vendor-marketplace`). Everything below that relies on importing more than one course assumes that change lands first.

## Summary

| # | Need | Size | Blocks |
|---|---|---|---|
| 1 | Variant courses as separate Course rows, linked as a family | S | Importing any variant |
| 2 | Fellow project choice record and setup step | M | Personalization in the app |
| 3 | Seat cap enforcement and the assignment draw | M (script), L (with admin UI) | Starting a cohort with variants |
| 4 | Placeholders in chapter text and block prompts | M | Chapters that use the fellow's project name |
| 5 | Fellow choices shown to mentors | S | Mentor review with context |
| 6 | One example pack per variant, data-driven showcase | S | Variant catalog pages and seed chapters |
| 7 | InteractiveCanvas slot and registered SVG components | M, plus S to M per canvas | Any variant chapter that uses a canvas |
| 8 | Smaller gaps: mentor ownership, Pathment allocations, family reports | S to M each | Scale, not launch |

## 1. How variant courses relate: separate Course rows with a family link

### Exists today

- `server/prisma/schema.prisma`: `Course` has a unique `slug`, `title`, `projectGoal` and a single `mentorId`. `Module` and `Chapter` belong to one course (`@@unique([courseId, order])`, `@@unique([courseId, slug])`). `Enrollment` is unique per `(courseId, userId)`. There is no field that groups courses or marks one as a variant of another (not found).
- Progress, gating, reports and the review queue are all scoped by course: `server/src/services/chapters/reader.ts` (`loadCourseGate`, `syllabusForEnrollment`), `server/src/services/teach/reports.ts`, `server/src/services/teach/reviews.ts` (`block: { chapter: { courseId } }`).
- `server/scripts/course-source.ts` (added in this PR) reads `content/import/<slug>/course.yaml` with `slug`, `title`, `description`, `projectGoal`, `difficulty`, `estimatedHours`, `coverUrl` and `modules`. No family or variant field.
- The catalog lists courses ordered by title (`server/src/services/catalog/catalog.ts`), one card each.

### Gap

Nothing tells the platform that six courses are one family, which one is the general course, or which variant a course is. The catalog would show six unrelated cards, and the choice step (need 2) has nothing to group by.

### Options considered

- **Separate Course rows per variant (recommended).** Each variant is imported from its own `content/import/<variant-course-slug>/` folder. Every existing per-course mechanism (gating, progress, reports, review queue filter, mentees roster, Pathment allocations) works unchanged. Variants really do differ in chapters, data model and hero feature, so separate chapter sets are the honest model. Cost: shared chapters are duplicated across six folders. That duplication belongs to the authoring pipeline (variant chapters are derived from the general course and checked by `variant-diff.md`), not the platform.
- **One course with variant tracks.** Would need a variant tag on `Module` or `Chapter` and a filter in the syllabus, the gate, progress counts (`percentComplete`, `chaptersCompleted`), block sync, reports and the review queue. Every one of those is course-scoped today. Size L, and a regression risk across the whole learner path. Not recommended.

### Proposed minimal change

1. Add two nullable fields to `Course`: `familySlug String?` and `variantSlug String?`, with `@@unique([familySlug, variantSlug])`. FreshMarket gets `familySlug: multi-vendor-marketplace`, `variantSlug: grocery`.
2. Add `family` and `variant` (optional) to `CourseManifestSchema` in `server/scripts/course-source.ts`; `upsertCourse` in `import-course.ts` writes them.
3. Catalog: when published courses share a `familySlug`, show one family card that opens a page listing the variants. Existing single courses are unaffected.
4. Commit the `--course` importer change first.

**Size: S.**

## 2. Fellow project choice record and setup step

### Exists today

- `Enrollment` (`server/prisma/schema.prisma`) has lifecycle, source, status, progress counters and timestamps. It has no field for learner choices or free-form metadata (not found).
- Enrollments are created in five places:
  - `server/src/services/enrollment/create-self-enrollment.ts` (catalog self-enrol);
  - `server/src/services/invites/invites.ts` (invite accept, `upsert`);
  - `server/src/services/teach/invites.ts` (mentor adds a learner directly);
  - `server/src/services/integrations/pathment/create-pathment-enrollment.ts` (Pathment, possibly before the user has an account: `PENDING_ACCOUNT`, `userId` null);
  - `server/src/services/enrollment/resolve-learn-enrollment.ts` (mentor preview enrollment).
- Frontend: the catalog detail page (`frontend/src/app/(learn)/(main)/catalog/[courseSlug]/page.tsx`) shows one "Enroll" button that posts `selfEnrollInCourseAction`; the checkout page (`frontend/src/app/(learn)/courses/[courseSlug]/checkout/page.tsx`) is a payment stub. There is no step between enrolling and reading (not found).
- There is no cohort model (not found). "Cohort" in `teach/mentees.ts` and `teach/reports.ts` means all enrollments of one course.

### Gap

There is nowhere to store variant preference, style, project name, slug and accent, and no screen to collect them. It also cannot be a plain set of columns on `Enrollment`: an undecided fellow has no variant yet, and with separate Course rows (need 1) there is no enrollment until the draw picks the variant course.

### Proposed minimal change

A new model, linked to the enrollment once the enrollment exists:

```prisma
enum ProjectChoiceStatus { PREFERENCE SEATED LOCKED }
enum ProjectChoiceSource { CHOSEN DRAWN SWAPPED ADMIN }

model FellowProjectChoice {
  id                String              @id @default(cuid())
  cohortKey         String?             // e.g. "mvm-2026-11"; null for self-serve learners outside a cohort
  familySlug        String              // "multi-vendor-marketplace"
  userId            String
  user              User                @relation(fields: [userId], references: [id], onDelete: Cascade)
  enrollmentId      String?             @unique
  enrollment        Enrollment?         @relation(fields: [enrollmentId], references: [id], onDelete: SetNull)
  variantSlug       String?             // null while undecided
  styleSlug         String?             // fresh | bold-street | editorial | night-market | heritage | clean-pro
  secondVariantSlug String?
  secondStyleSlug   String?
  seat              Int?                // 1..cap once seated; null while a preference
  projectName       String?
  projectNameKey    String?             // lower case, spaces removed, for uniqueness
  projectSlug       String?
  accentHex         String?
  accentHexLight    String?             // Night market fellows who ship light mode
  status            ProjectChoiceStatus @default(PREFERENCE)
  source            ProjectChoiceSource @default(CHOSEN)
  lockedAt          DateTime?
  createdAt         DateTime            @default(now())
  updatedAt         DateTime            @updatedAt

  @@unique([cohortKey, userId])
  @@unique([cohortKey, variantSlug, styleSlug, seat])
  @@unique([cohortKey, projectNameKey])
  @@index([familySlug, cohortKey, status])
}
```

Shared, pure code in `server/src/shared/personalization/` (copied to the frontend by `server/scripts/sync-shared.mjs`, which CI checks):

- `styles.ts`: the six styles with default tokens and the backgrounds each accent is checked against (from `personalization-layer.md`, section 3.3);
- `contrast.ts`: the WCAG contrast function, used by both the setup form (live feedback) and the API (refusal);
- `project-name.ts`: the name rule (`^[\p{L}\p{N}][\p{L}\p{N} '’-]{1,23}$` with the `u` flag), apostrophe normalisation to `’`, the uniqueness key, the reserved reference names.

Screens and endpoints:

- **Preference form** (cohort mode): a family page, for example `/families/multi-vendor-marketplace/choose`, posting to `POST /api/v1/families/:familySlug/preferences`. Creates or updates the fellow's `PREFERENCE` row. No enrollment is created here; the draw (need 3) does that.
- **Project setup** (after a seat exists, and for self-serve learners): `/courses/[courseSlug]/setup`, with `GET` and `PUT /api/v1/courses/:courseSlug/project`. Edits name, slug, accent and, before lock, style. Refuses edits after `lockedAt` except by an admin.
- **Self-serve learners outside a cohort** enrol as today through `createSelfEnrollment`, then land on the setup page. `cohortKey` is null, so no cap applies (PostgreSQL treats nulls as distinct in unique indexes).
- **Soft gate, not a hard gate:** the course home shows a "Set up your project" card until the name is set. `learnAccessDenial` in `resolve-learn-enrollment.ts` is not changed; the reader works without a choice by using fallbacks (need 4). A hard gate can be added later as a course flag if instructors want it.
- **Pathment fellows** who arrive as `PENDING_ACCOUNT` (no `userId`) make their choice after the account is linked (`server/src/services/enrollment/link-learner-profile.ts`), since the choice row needs a user.

**Size: M.**

## 3. Seat cap enforcement and the assignment draw

### Exists today

- No cap on enrollments per course for self-serve or invites (not found).
- The only seat cap in the code is organisational: `OrganizationCourse.maxEnrollments` and `currentEnrollments` (`server/prisma/schema.prisma`), consumed by `consumeEnrollmentSlot` from `server/src/services/integrations/allocation.ts` during Pathment enrollment. It is a useful precedent, but it counts seats per organisation per course, not per variant and style.
- No draw, lottery or assignment tool (not found).

### Gap

Nothing stops a third fellow taking a variant and style combination, and nothing runs the draw described in `personalization-layer.md`, section 4.

### Proposed minimal change

1. **Cap in the database.** The unique index `@@unique([cohortKey, variantSlug, styleSlug, seat])` from need 2 makes a third seat impossible as long as `seat` is limited to 1 and 2. Add a `CHECK (seat IS NULL OR (seat >= 1 AND seat <= 2))` constraint in the migration SQL (Prisma does not model check constraints). Seating a fellow is "insert with seat 1; on unique violation try seat 2; on unique violation the combination is full". Concurrent requests cannot both win.
2. **Draw script first, UI later.** `server/scripts/draw-project-seats.ts --cohort <key> --seed <seed> [--apply]`:
   - reads all `PREFERENCE` rows for the cohort (or a CSV exported from a form, for the first cohort if need 2's form is not ready);
   - runs rounds 1 to 3 exactly as `personalization-layer.md` section 4.3 describes, with a seeded shuffle as the only tie-breaker;
   - without `--apply`, prints the result and a summary table (fellows per variant, per style, pairs) for the witness;
   - with `--apply`, in one transaction per fellow: sets `variantSlug`, `styleSlug`, `seat`, `status: SEATED`, `source`, and creates the enrollment in the variant's Course (reusing the logic of `createSelfEnrollment` with `source: DIRECT`, or the Pathment path where the cohort comes through Pathment), then links `enrollmentId`.
   - Deterministic: same seed and same input give the same output. The script prints its own version hash.
3. **Swaps and lock** are small admin endpoints or script commands: `move` (into a free seat), `swap` (two fellows, both confirmations recorded), `lock` (sets `lockedAt` and `status: LOCKED` for the cohort). Each runs in a transaction, so the unique index keeps the cap true after every step.
4. **Later (L):** an admin screen showing the 36-combination board, the draw dry run, swaps and the lock button.

**Size: M for the constraint, script and swap commands; L with the admin board.**

## 4. Placeholders in chapter text and block prompts

### Exists today

- `Chapter.source` is the draft MDX and `Chapter.compiled` is the publish snapshot (`server/prisma/schema.prisma`). Despite the name, `compiled` holds MDX source, not compiled code: `publishChapter` in `server/src/services/teach/chapters.ts` runs `compile()` from `@mdx-js/mdx` only as a check (`collectPublishProblems`), then stores `compiled: chapter.source`. The importer does the same (`compiled: lesson.source` in `server/scripts/import-course.ts`).
- The reader compiles on every request: `loadChapterReader` in `server/src/services/chapters/reader.ts` returns `content.compiled ?? content.source` as `source`, and `ChapterMdx` in `frontend/src/mdx/compile.tsx` renders it with `MDXRemote` (next-mdx-remote-client) as a server component. No caching of the rendered chapter was found in the reader route, `frontend/src/mdx/` or `frontend/src/blocks/`.
- `loadChapterReader` already resolves the learner's enrollment (`requireBlockSubmissionAccess`) before it reads the chapter.
- Block prompts, options and explanations are not in the MDX. They live in `Block.config` and reach the browser through `loadBlockState` in `server/src/services/blocks/state.ts`, which strips secrets with `sanitizeBlockConfig` (`server/src/utils/sanitize-block-config.ts`; secret keys: `correct`, `correctOptionId`, `correctOptionIds`, `rubric`, `sampleAnswer`, `hiddenTests`, `tests`, `solution`). `loadBlockState` does not look up the enrollment today.
- The importer escapes `{`, `}` and `<` in prose to HTML entities (`escapeMdxProse` in `import-course.ts`). It does not touch `%`.
- Heading ids come from heading text: `slugify(text)` in `frontend/src/mdx/components.tsx`, used by `HeadingNoteButton` to store `HeadingNote.headingId`.
- The general course names "FreshMarket" 454 times across `content/import/multi-vendor-marketplace/`, and its first chapter already tells fellows the name is a placeholder (`01-introduction/01.01-what-youre-building.md`).
- No placeholder mechanism exists (not found).

### Gap

A chapter cannot say "your Daal Darbar dashboard" or put the fellow's slug into a code sample. Every variant would otherwise hard-code its reference name, as FreshMarket does today.

### Proposed minimal change

1. **Token syntax: `%%name%%`.** Inert in Markdown and MDX, and untouched by the importer's escaping. `{{project.name}}` is not usable: MDX parses `{...}` as a JavaScript expression (it compiles, then fails at render), and the importer would turn the braces into entities in prose anyway.
2. **A closed set of tokens**, each with a fallback:

   | Token | Value | Fallback (no choice yet, mentor preview, anonymous) |
   |---|---|---|
   | `%%project.name%%` | project name | the variant's reference name, for example FreshMarket |
   | `%%project.slug%%` | project slug | the reference slug, for example `freshmarket` |
   | `%%project.accent%%` | accent hex | the style default accent, or Clean pro blue |
   | `%%style.name%%` | style name | "your brand style" |
   | `%%style.headingFont%%` | heading font | Inter |
   | `%%style.bodyFont%%` | body font | Inter |

   Fallback reference names live in `server/src/shared/personalization/` keyed by `variantSlug` (need 1).
3. **Substitute at read time, never in storage.** One pure function, `applyProjectTokens(text, values)`, in the shared folder:
   - in `loadChapterReader`, on `source` just before it is returned, using the choice linked to the already-resolved enrollment;
   - in `loadBlockState`, on string fields of the sanitized config (a deep walk like `sanitizeBlockConfig`), after looking up the caller's enrollment for the block's course;
   - in `loadReviewDetail` (`server/src/services/teach/reviews.ts`) and the AI draft (`server/src/services/teach/ai/review-draft.ts`), with the fellow's values, so the mentor reads the prompt the fellow saw.

   Because stored `source`, `compiled` and `Block.config` never change, block `sourceHash` and `version`, block sync and the publish snapshot are unaffected, and the same published chapter serves every fellow. Since the reader already compiles per request, substitution adds no new rendering cost. If a render cache is ever added, it must be keyed by enrollment.
4. **Safety by the name rule.** The project name and slug rules (need 2) exclude every character that means something to Markdown, MDX, JSX or JavaScript strings (`{ } < > [ ] * _ # | \ " &` and the plain apostrophe, which is stored as `’`). So the substitution is plain text and is safe in prose, in JSX string attributes and inside code fences, with no escaping step.
5. **Validation at import and publish.** Add to `collectPublishProblems` (`teach/chapters.ts`) and to `server/scripts/validate-course-source.ts`:
   - reject unknown tokens;
   - reject tokens in headings (heading ids, and so `HeadingNote` rows, would differ per fellow);
   - reject tokens in `Chapter.title`, `Chapter.summary` and course metadata (these appear in navigation, the catalog and emails, outside the reader);
   - reject tokens in any block config key in the secret list, so grading never depends on personalization;
   - compile the chapter once with fallbacks and once with a longest-legal test name, to catch layout or syntax surprises.
6. **Authoring rule** (for `agent-ip/03-authoring-standards.md`): use `%%project.name%%` where the sentence is about the fellow's own product ("open your %%project.name%% vendor dashboard"); keep the reference name where the text is about the shared example (screenshots, the example pack). Do not put tokens in images, alt text that describes a reference screenshot, or diagrams.

**Size: M.**

## 5. Fellow choices shown to mentors

### Exists today

- `loadReviewQueue` in `server/src/services/teach/reviews.ts` returns items with `id`, `attempt`, `submittedAt`, `learnerLabel`, `courseTitle`, `chapterTitle` (`ReviewQueueItem` in `server/src/shared/api/teach.ts`). It can filter by course.
- `loadReviewDetail` returns `ReviewDetailView`: learner, course, chapter title, question, answer, history.
- `Response.enrollmentId` is a plain string with an index; there is no Prisma relation from `Response` to `Enrollment` (`server/prisma/schema.prisma`).
- The roster is `loadCourseMentees` in `server/src/services/teach/mentees.ts`; the pages are `frontend/src/app/(teach)/review/page.tsx`, `frontend/src/app/(teach)/review/[responseId]/page.tsx`, `frontend/src/app/(teach)/courses/[courseSlug]/mentees/page.tsx` and `.../mentees/[enrollmentId]/page.tsx`.
- Nothing about variant, style or project name is shown anywhere (not found).

### Gap

Mentors cannot see which project a submission belongs to, so feedback stays generic and the brand checks in `personalization-layer.md` section 6 have no data.

### Proposed minimal change

1. Add `project: { variantSlug, styleSlug, projectName, projectSlug, accentHex } | null` to `ReviewQueueItem`, `ReviewDetailView` and the roster row type.
2. In `loadReviewQueue`, collect the `enrollmentId`s of the pending responses and load their choices in one extra query (no schema change needed). In `loadCourseMentees`, include the choice through the new `Enrollment` relation from need 2.
3. Render a one-line chip (style name, project name, a swatch with the hex value and its contrast ratio) in the four pages above.
4. The review queue already filters by course, and each variant is its own course (need 1), so "filter by variant" comes for free.

**Size: S.**

## 6. One example pack per variant, and a data-driven showcase

### Exists today

- FreshMarket's seed data is specified in chapter prose: `content/import/multi-vendor-marketplace/05-data-model-and-seed/05.14-seed-script-scaffold.md` (4 users, 2 stores, 10 to 20 products, written by the fellow in `server/scripts/seed.js`).
- Showcase screenshots live in `frontend/public/showcase/multi-vendor-marketplace/` (22 PNG files, 5.9 MB in total; the four `freshmarket-*-hd.png` files are 1.1 to 1.4 MB each). Chapters reference them by absolute path, for example `/showcase/multi-vendor-marketplace/storefront.png`.
- `frontend/src/components/learn/course-project-showcase.tsx` hard-codes three FreshMarket screens and returns nothing unless `courseSlug === "multi-vendor-marketplace"`.
- `frontend/src/mdx/components.tsx` has no `img` entry, so Markdown images in chapters render as plain `<img>` at full file size. (The showcase component uses `next/image`, which resizes.)
- No asset upload or storage service was found in `server/src` (searching for upload, Cloudinary, S3 and blob found only course description text in `server/src/shared/lib/seed-data.ts`). `Course.coverUrl` is the only course-level media field.

### Gap

Each variant needs its own seed data and sample images (a grocery product photo is wrong for a books marketplace), and its own showcase. Today the showcase is hard-wired to one slug and there is no home for downloadable packs.

### Proposed minimal change

1. **Packs live outside buildment.** One public repository (for example `marketplace-example-packs`) with a folder per variant, tagged per cohort. Chapters link to the tagged download. No platform storage needed. Each pack holds:
   - `seed.json`: vendors, stores and 20 to 30 listings with the variant's own fields (ISBN and condition for books, lead time for handmade, slot capacity for home-kitchens, licence type for digital-goods, milestones for services);
   - `images/`: WebP, about 800px wide, under 80 KB each, own photos or CC0 with a `LICENSES.md`;
   - a "lite" option without images that generates neutral SVG placeholders locally, for fellows on metered data;
   - a size budget of 3 MB per pack, shown next to the download link;
   - brand-neutral content, so it looks right under all six styles.
2. **Showcase from data.** Add `showcase` entries (`src`, `label`, `title`, `description`) to `course.yaml`, store them in a new `Course.showcase Json?` written by the importer, and make `CourseProjectShowcase` render from that instead of the hard-coded list and slug check.
3. **Variant screenshots** go in `frontend/public/showcase/<variant-course-slug>/` as WebP under 150 KB, and new chapters reference those. Optionally add an `img` entry to the component map that sets `loading="lazy"`, `decoding="async"` and width and height.

**Size: S** (platform part). Building six packs is content work, outside this estimate.

## 7. InteractiveCanvas and inline SVG

### Exists today

- `agent-ip/04-interactive-playbook.md` and `agent-ip/10-interactive-canvases.md` state there is no generic canvas slot and no generic inline SVG component. The code agrees:
  - `InteractiveCanvas` is not in `MDX_COMPONENT_NAMES` (`server/src/shared/mdx/component-allowlist.ts`) or in `mdxComponents` (`frontend/src/mdx/components.tsx`);
  - `frontend/src/canvas/` does not exist (not found).
- Unknown tags are refused at publish (`collectUnknownComponents` in `publishChapter`, `server/src/services/teach/chapters.ts`) and at import (`server/scripts/validate-course-source.ts` calls the same check). In the reader, an unknown tag renders an "This block is not supported" callout instead of failing (`withUnknownComponentFallback` in `frontend/src/mdx/compile.tsx`).
- Static diagrams can go through `VisualDiagram` (image URL). `MermaidDiagram`, `StateMachine` and `EntityDiagram` are allowlisted and all render through `MermaidDiagram`.

### What the variants depend on

- **Each variant needs its own canvases.** The uniqueness contract says "reusing the same canvas with different labels is a reskin". So the six variants need different causal models: for example stock reservation for grocery, milestone escrow for services, made-to-order lead time for handmade, slot capacity for home-kitchens, download entitlements for digital-goods, edition matching for books. Every one of them needs the registry; none can ship as a chapter element without it.
- **Server-side slug validation.** The publish and import checks run on the server, but the registry in `10-interactive-canvases.md` is frontend code (`frontend/src/canvas/registry.ts`). The server needs the list of registered slugs too. Mirror the allowlist pattern: a slug list in `server/src/shared/canvas/slugs.ts` (synced to the frontend), and a frontend test that the registry and the list match, like the existing allowlist test the comment in `component-allowlist.ts` describes.
- **Canvases stay neutral and personal data stays out.** A canvas renders in buildment's reader with buildment's theme tokens and receives only its slug. It never gets the fellow's style, accent or project name. This keeps canvases inside the design language in `10-interactive-canvases.md` and the rule that a canvas never receives learner data. Personalization tokens (need 4) must be rejected inside canvas props by the validator.
- **Entity diagrams need no new work.** Each variant's data model can be shown with the existing `EntityDiagram`. A registered SVG component is only needed for theme-aware static figures that Mermaid cannot draw (for example a home-kitchens delivery-zone map).

### Proposed minimal change

Follow the contract in `10-interactive-canvases.md`, "Platform integration", steps 1 to 7:

1. `InteractiveCanvas` in the allowlist and the component map;
2. `frontend/src/canvas/registry.ts` mapping slug to component, `<InteractiveCanvas slug="..." />` in MDX, an unknown slug rendering a safe fallback;
3. the shared slug list above, checked at publish and import;
4. a preview route for reviewers;
5. the same registry mechanism for registered SVG figures (`<SvgFigure slug="..." />`), never raw `<svg>` in MDX.

**Size: M** for the slot, registry, validation and preview route. Each canvas is then **S to M** (model, tests, component, spec).

## 8. Smaller gaps

| Gap | Exists today | Proposed change | Size |
|---|---|---|---|
| One mentor per course | `Course.mentorId` is a single user; `mentoredCoursesWhere` in `server/src/services/teach/access.ts` returns `{ mentorId: user.id }` for non-admins, so a mentor sees only courses they own | One mentor per variant course fits a 60-fellow cohort (about 10 fellows each). If mentors must cover several variants, add a `CourseMentor` join table and widen `mentoredCoursesWhere` | M, only if needed |
| Pathment allocations per variant | `OrganizationCourse` allocations and `consumeEnrollmentSlot` are per course | If the cohort arrives through Pathment, the organisation needs an allocation on each of the six variant courses; the draw must call the Pathment path so allocations are counted | S (configuration and a draw option) |
| Importer mentor | `upsertCourse` in `import-course.ts` assigns the first user with role `MENTOR` and creates the course as `PUBLISHED` | Add `mentorEmail` to `course.yaml`; consider importing variant courses as `DRAFT` until the G6 and G7 gates pass | S |
| Family-wide reports | `server/src/services/teach/reports.ts` reports one course at a time | A family view across six variants (progress by variant and by style). Not needed for launch | M, later |
| Fellow sees their choice | Nothing in the course header shows it (not found) | Show project name and style in the course home header and the setup page | S, part of need 2 |

## 9. Suggested order of work

1. **Commit the `--course` importer and add the family link** (need 1, S). Without it, no variant can be imported at all.
2. **Add `FellowProjectChoice` with the cap index and check constraint, plus the draw script** (needs 2 and 3, data model and script parts first). The first cohort can submit preferences through a simple form or the coordinator's sheet; the script imports the CSV, runs the draw and creates enrollments. This is the minimum to start a cohort on six variants.
3. **Show choices to mentors** (need 5, S). Cheap, and it makes the cohort manageable from the first week.
4. **Placeholders** (need 4, M). Needed before importing any variant chapter that uses tokens. Chapters written before this lands should keep the reference name; the fallbacks mean nothing breaks if tokens arrive first.
5. **InteractiveCanvas registry** (need 7, M). Can run in parallel with steps 2 to 4 by a second developer. It must land before any variant chapter that uses a canvas is published.
6. **Data-driven showcase and pack links** (need 6, S). Before the variant catalog pages go live.
7. **In-app preference form, setup page and swap commands** (rest of needs 2 and 3, M). Replaces the sheet for the second cohort.
8. **Later:** admin draw board (L), `CourseMentor` if needed (M), family-wide reports (M).
