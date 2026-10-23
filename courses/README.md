# Course source

Each `courses/<slug>/` folder is one versioned course source package. Use `course.yaml`
and numbered module folders containing numbered Markdown lessons. FreshMarket is a
legacy exception: its metadata is still in `server/src/shared/lib/seed-data.ts`.
Draft writing, research, reviews, and QA belong in `agent-ip/work/<slug>/`.
Moving existing source packages here does not approve or publish them; the
application database records publication separately.

## Current courses

The **FreshMarket — Multi-Vendor Grocery Marketplace** course lives in
`multi-vendor-marketplace/` (385 lessons across 26 modules).

For local development, load it into a development database:

```bash
pnpm db:seed          # ensures mentor + mentee users exist
pnpm content:import   # upserts Course / Module / Chapter / Block rows
pnpm content:validate # compiles every chapter's MDX (fast sanity check)
```

`content:import` is a legacy seeder that writes course rows directly. Use the
mentor review and publish flow for a live course; do not run the seeder against
the production database to update a published course.

The importer transforms lessons in memory and stores the result in the database.
There is no second generated course tree in the repository.

## Repository publishing

[`publishing.yaml`](publishing.yaml) names `devweekends@gmail.com` as the instructor
who owns repository-managed courses. After CI and the frontend deployment pass
on `main`, the course workflow binds existing course records to that instructor.
The former owner keeps course-creator access. The instructor account must already
exist, have a verified email, have the Mentor or Admin role, and have ZIP import
access. Configure the `COURSE_DATABASE_URL` GitHub Actions secret with the
production database URL; the workflow will stop with an error until it is set.

Course publication is explicit. Add `repositoryPublish: true` to a reviewed
course's `course.yaml` in the approved PR. The workflow validates every opted-in
package, then creates and publishes a new course or applies an immutable release
to an existing one. It uses the same ZIP import and update services as the mentor
workspace, so learner progress stays pinned to its prior release. A rerun with
unchanged content skips the update preview and does not create another release.
Courses without this field
remain available as source packages but are not automatically published.

`cause-and-effect` is the first opted-in course. The other manifest-backed courses
still need to pass their course audits before publication; `system-design` is a
sample package that also needs its missing chapters and structure completed.

Run `pnpm --dir server courses:check` before merging. This validates each
opted-in package without database access. FreshMarket needs a `course.yaml`
before it can opt in; it is still included in the instructor ownership binding.

## More than one course

Each folder here is one course. The content scripts take `--course <slug>` (the folder name) and
default to `multi-vendor-marketplace`. Run them from `server/`:

```bash
pnpm content:validate:source --course decision-making
pnpm content:audit --course decision-making
pnpm content:import --course decision-making
```

A new course needs a `course.yaml` with its catalog metadata and the planned modules and lessons;
the audit fails when the lesson files and the plan disagree. The full process for building a course
(brief, roadmap, writing, critique, publish) is the course factory in [`agent-ip/`](../agent-ip/README.md).

## What the import does

- **Course** → `Course` record (title, slug, description, …)
- **Module folders** (`01-introduction/`, …) → `Module` rows
- **Lesson files** (`01.01-what-youre-building.md`, …) → `Chapter` rows with MDX in `Chapter.source`
- **` ```quiz` blocks** → real `<Quiz>` / `<OpenQuestion>` interactive blocks (answers in server-only `Block.config`)
- **Reserved quiz stubs** → mini self-check questions become optional `<OpenQuestion>` blocks
- **MDX safety** → braces and angle brackets in prose are escaped so technical writing renders correctly

## Viewing the course

1. `pnpm dev`
2. Log in as a seeded mentee (e.g. `mentee1@buildment.dev` via the dev login link on `/login`)
3. Open **Dashboard** → **FreshMarket — Multi-Vendor Grocery Marketplace**

## Import a ZIP from the mentor workspace

On **Your courses**, choose **Import course ZIP**. Include `course.yaml` and the
numbered module folders with their lesson Markdown files. `COURSE-OUTLINE.md` is
optional. These files can be at the archive root or inside one course folder.
Use the manifest format in `decision-making/course.yaml`; its slug must be unique.
Do not include dependencies, images, system metadata folders, or executable files.

The browser posts the ZIP bytes as `application/zip` to
`POST /api/v1/teach/courses/import` through the existing frontend API proxy. The
endpoint requires the same signed-in, verified instructor access as the other
mentor endpoints and returns `{ success: true, data: { courseSlug } }` on success.
Validation errors use the standard API envelope with details in `errors`.

Limits are 5 MB uploaded, 20 MB expanded, and 1,000 archive entries. Imports run
one at a time per API process. The shared source validator and strict structure
audit run before any database writes. A successful import creates a new draft
course and draft chapters owned by the importing instructor. Review and publish
chapters and the course through the existing editor. Existing slugs return 409;
imports never replace an existing course or learner history.

The original parser and validators remain in `server/scripts/`. The separate
`server/scripts/zip-import/worker.ts` reuses them through the existing production
`tsx` dependency. Heroku includes these scripts; the container image also copies
the shared schemas and MDX helpers they need. Runtime validation uses a bounded child process
(15 seconds), then an atomic Postgres transaction (10 seconds). Temporary files
are removed when the request finishes; no persistent filesystem, new service,
config variable, or database migration is required on Heroku. Deploy the API and
frontend changes together using the existing deployment workflow.


### Quiz flow content

Quiz reader mode accepts only top-level `Quiz`, `OpenQuestion`, `Predict`, and
`CodeExercise` activities after import transforms their YAML fences. Frontmatter
and the author-facing H1/banner are removed during import. Do not include ordinary
paragraphs, headings, lists, recaps, checklists, learning logs, callouts, videos,
or diagrams in the remaining quiz body. Put instructions in the activity prompt
and move teaching content into a standard lesson. The authoring convention keeps
Predict activities in standard lessons, even though the Quiz reader supports them.

`*-quiz.md` or `stepType: Quiz` selects Quiz flow. `stepType: Check` on its own
does not. Both source validation (including ZIP imports) and chapter publishing
reject mixed lesson content in Quiz flow.
