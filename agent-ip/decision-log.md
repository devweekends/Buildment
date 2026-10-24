# Agent IP decision log

## 2026-10-24: Load released courses into the scratch database through the repository publisher

**Status:** Correction to the pre-PR checklist.

**Problem:** `06-quality-gates.md` and the technical validator asked for `content:import` before every pull request. Since releases became the publishing path, `content:import` refuses a course that has a release or learner work. A module 11 update to the AI Engineering Interview course hit this. The writer then loaded the update through the publisher into a database that still held an older `content:import` copy. The release listed old and new versions of seven chapters side by side, and the reader served the old blocks. A fresh database with a single publish gave the right 13 modules and 90 chapters.

**Decision:** Use `content:import` only for a course that has never been released. Load a released course through the repository publisher (`courses:publish`), limited to that course for a local run, into a fresh scratch database. The publisher needs the instructor from `courses/publishing.yaml` as a verified mentor or admin with ZIP import access in that database.

**Evidence:** Module 11 of `ai-engineering-interview` (devweekends/Buildment#64). The mixed database showed 97 lessons where the course has 90. The fresh database showed 90, and the quiz click-through scored 4/5 as answered.

**Review:** Delivery lead pending.

## 2026-10-24: Audit the resolved variant content of one shared course

**Status:** Correction to the release framing and the inheritance audit. This is not a readiness claim.

**Problem:** The readiness notes and the inheritance audit treated the shared source as "the FreshMarket course" and judged raw shared files. That misstates the product. The repository is one **Multi-vendor Marketplace** course. A learner's selected or assigned variant resolves that learner's curriculum from the shared modules, the variant order, omissions, overrides and replacements. The database slug `freshmarket-multi-vendor-marketplace-v3` is a legacy identifier, not the course identity.

**Decision:** Audit the effective per-variant path. Apply `moduleOrder`, `omitLessonKeys`, full override files and exact replacements before judging a passage. Report inherited shared lessons, replacement-adapted lessons, effective findings and variant-authored references separately. A raw shared passage that a variant replaces or omits is not a defect for that learner. A passage that survives resolution and still names another product is. A variant-authored comparison to the shared example is allowed; presenting the reference product as the learner's own is not. Update `03-authoring-standards.md`, `06-quality-gates.md`, `platform-needs.md` and the readiness report to state this model.

**Evidence:** `server/scripts/audit-marketplace-inheritance.ts` now applies the resolution steps. With no replacements yet, the effective findings are unchanged: 182 of 255 for services, 187 of 246 for handmade, 161 of 217 for home kitchens, 180 of 249 for digital goods and 194 of 265 for books. The same run lists 25, 11, 19, 6 and 12 variant-authored references for editorial review. All five tracks remain unavailable.

## 2026-10-24: Link the payment and lifecycle modules without releasing a variant

**Status:** Work in progress. The five variant learner paths are still incomplete, so none of the new tracks is selectable. This entry records authored content and checks; it is not a G5 or G6 pass.

**Decision:** Link only modules whose lesson sequence is complete and whose source passes the structure audit. This pass adds SkillSlot M9 booking authorization, Midad M19 payment, Hamesh M20 payment, Ghurza M20 payment, and Sufra M22 kitchen acceptance and lifecycle. SkillSlot M9 replaces inherited shared module 08 in the module order. The other modules sit at their roadmap positions. Keep `availableVariantSlugs: [grocery]` and `repositoryPublish: false`. Do not open a mergeable publishing pull request while the inheritance gate reports thousands of grocery-specific inherited lessons.

**Evidence:** `courses:package:check` produces a 2,177,743-byte package with 26 shared modules and 7, 7, 7, 9 and 10 own modules for handmade, digital goods, books, services and home kitchens. Source validation passes 672 of 672 chapters. The strict structure audit reports 0 errors and 0 warnings. The repetition audit reports 0 repeated paragraphs. The per-variant `audit-course.mjs` runs report 0 findings. The inheritance audit still reports 182 of 255, 187 of 246, 161 of 217, 180 of 249 and 194 of 265 inherited shared lessons with FreshMarket details for services, handmade, home kitchens, digital goods and books.

**Open gates:** The shared shop, product, catalogue, cart, cache and deploy modules still carry grocery content for every variant. Several later modules remain unwritten, including SkillSlot cancellation and rescheduling, Midad download limits and refunds, Hamesh collection and holds, Ghurza tracking and deploy, and Sufra live tracking and deploy. The new lessons are post-approval refinements, so AQIB and ASIF must reconfirm their sequences. Reference builds remain deferred at the owner's request.

## 2026-10-24: Keep FreshMarket as one course and release variants when complete

**Status:** The course owner reports that AQIB and ASIF approved the five variant roadmaps; dates and signed comments were not supplied. The owner requested one Multi-vendor Marketplace course with a product-specific curriculum for each learner's chosen or assigned track.

**Decision:** Keep the existing course ID and learner releases. Adopt stable keys for the 385 FreshMarket lessons and target the existing published slug from the repository package. Name the catalog course Multi-vendor Marketplace. Make grocery selectable now; keep services, handmade, home kitchens, digital goods, and books unavailable until their full learner paths are authored and reviewed. Do not treat roadmap text or `%%product.name%%` replacement as completed variant content. Preserve historical variant selections and progress.

**Open gates:** The five variant lesson paths and reference builds do not exist in this repository. The FreshMarket editorial audit reports 362 findings, and seven reference consistency topics remain open. The owner requested that reference builds be deferred for now, so this is a recorded exception to the normal variant gate, not a passing G5/G6 result. `repositoryEditorialAudit: advisory` records the owner's requested exception for this existing course update, but `repositoryPublish` remains false until the completed variant release is reviewed. Existing quiz explanations and punctuation use `legacySourceAudit` during stable-key adoption.

## 2026-10-24: Publish existing course inventory with visible editorial exceptions (v0.4.6)

**Status:** The user explicitly requested that all existing courses appear on the platform after seeing that only one course was opted in.

**Decision:** Opt in all nine manifest-backed packages. Keep the course audit required by default; mark the eight packages with known editorial findings as `repositoryEditorialAudit: advisory` so the release reports those findings while technical source and strict structure checks remain mandatory. Present `system-design` as a five-hour, two-topic lab because only its sample lessons exist. The existing FreshMarket course stays live and its legacy database slug is bound to the configured instructor. A future content revision should clear the audit findings and remove each exception.

**Platform impact:** The backend release publishes the nine opted-in packages and preserves the existing FreshMarket listing. No new database secret or migration is needed. The course PR must show the remaining audit debt so a merge is an informed publication decision.

## 2026-10-23: Repository course publication and instructor binding (v0.4.5)

**Status:** Requested by the user; course-level human review remains required.

**Decision:** The instructor configured in `courses/publishing.yaml` owns repository-managed courses. Existing owners retain course-creator access. A reviewed `courses/<slug>/course.yaml` opts in with `repositoryPublish: true`. CI validates opted-in packages; the backend release phase runs migrations and publishes them through the ZIP import and immutable release services using its existing `DATABASE_URL`. Packages without the flag are not auto-published. FreshMarket needs a manifest before it can opt in.

**Platform impact:** Add the publishing command to the backend release phase and include the root course source in the deployed backend. Bind existing course records to the configured instructor when the release runs. No extra production database secret is needed. The legacy direct-row seeder remains for development only.

## 2026-10-23: One course source tree (v0.4.4)

**Status:** Requested by the user; review and publication gates still apply.

**Decision:** `courses/<slug>/` is the canonical repository location for course source packages. Draft chapters and review evidence stay in `agent-ip/work/<slug>/`. The existing course packages move from `content/import/` without changing their publication status. The importer reads `courses/` directly and transforms lessons in memory; generated MDX is not committed in a second tree. A repository folder does not itself publish a course to learners.

**Platform impact:** Update source paths in scripts, tests and documentation; remove the committed `content/transformed/` output. Existing dashboard ZIP import and database publication remain separate workflows. Repository CI publication still requires implementation.

## 2026-10-23: Canonical final course location (v0.4.3)

**Status:** Requested by the user.

**Decision:** All final courses and variants belong in `content/import/<slug>/` so CI can consume them. Drafts, research, reviews, and QA remain in `agent-ip/work/<slug>/`. Replace the previous `courses/` destination and conditional import-folder instruction. Review drafts first, then assemble and validate the final import package on the course PR branch.

**Platform impact:** Instruction update only; existing course files are not moved and no publishing workflow is added. Historical logs retain their recorded paths. Agents must reconcile legacy sources when continuing those courses.

## 2026-10-23: Lessons from building the AI interview course (v0.4.2)

**Status:** Draft for delivery lead and reviewer sign-off under `09-review-and-governance.md`.

**Problem:** Building and reviewing the AI engineering interview course (PR #34) found mistakes the IP did not prevent. The correct prediction was the first option in 33 of 35 blocks, yet `content:audit` gave 0 warnings, because nothing checked position and the platform does not shuffle options. The routing table and decision log named specific models and their vendor. The blind answer-key check ran on a model from the drafters' family. Chapter 5.5 showed a guessed test count (18 deselected; a real run gives 38), and a 7.3 snippet needed LangGraph 1.2 under a `>=1.0` pin. Idioms such as "on vibes" reached the prose. Two builders shared one worktree and one overwrote the other's roadmap. The writer pack named local machine paths.

**Decision:** `content:audit` warns once per course when one position holds 70% or more of the correct answers (6 or more predictions, or 6 or more multiple-choice questions), documented in `04-interactive-playbook.md` → Option-length hygiene. Committed work files name models by role (`01-agent-system.md` → Model policy, `agents/orchestrator.md` → Model routing). A same-family re-answer does not check the keys, and the PR says who checked them (`05-assessment-and-motivation.md` → Answer-key check, `agents/assessment-designer.md`, `06-quality-gates.md` → Before a pull request). Expected output is copied from a real run at the pinned versions, and pins cover every snippet (`agents/technical-validator.md`, `06-quality-gates.md` → Technical validation checklist). Plain English lists the idioms with rewrites (`03-authoring-standards.md`). One coordinator per course branch (`agents/orchestrator.md` → Rules, `09-review-and-governance.md` → Pull requests). Context packs use path placeholders (`agents/orchestrator.md` → Context pack rules).

**Platform impact:** The audit check is new code in `server/scripts/audit-course-structure.ts`, with tests. On existing courses it raises one new warning: `multi-vendor-marketplace` has the correct prediction first in 20 of 21. No course content changes in this change.

**Review:** Delivery lead and one additional reviewer pending.

## 2026-10-23: Audit fixes, canvas layout rules and a blind answer-key script (v0.4.1)

**Status:** Draft for delivery lead and reviewer sign-off under `09-review-and-governance.md`.

**Problem:** Building courses 9 (logic-building) and 10 (cause-and-effect) exposed four gaps.
1. `scripts/audit-course.mjs` flagged every chapter of every course in the repository (course 8: 79 of 79). It did not count ```mermaid fences as diagrams, although the importer renders them as `MermaidDiagram`; its ```diagram count searched text with code fences already removed, so it never matched; and it required 700 prose words in quiz chapters, which must hold activities only (`04-interactive-playbook.md`).
2. `10-interactive-canvases.md` said a state machine grid may be 3 by 3. On a phone the rows sit 150px apart in a 340px picture, so only two rows fit, and labels collided in ways the registry test did not catch. Course 9 shipped two such collisions to its first phone check.
3. The blind answer-key check (`05-assessment-and-motivation.md`) had no tool, so courses 8 and 9 each wrote their own.
4. The prose minimums do not fit short soft-skills courses, and courses record different exceptions.

**Decision:**
1. Fix the audit: count ```mermaid and ```diagram fences, and skip the prose minimum for `*-quiz.md` chapters. The thresholds themselves do not change. Course 8 goes from 79 to 35 flagged chapters; the remaining flags are real.
2. State the phone layout rules for state machines (two rows, three-character labels across a row, no diagonal beside a parallel arrow) and enforce two of them in `frontend/tests/unit/canvas/registry.test.ts` (row at most 1, no overlapping edge labels). Every registered canvas passes; the course 9 collision fails the new test.
3. Add `scripts/blind-keys.mjs` (extract keyless batches, compare answers) and point the answer-key check at it.
4. Open `proposals/2026-10-23-prose-minimums-by-course-type.md`. No threshold changes until it is decided.

**Platform impact:** Test and script changes only; no reader or importer behaviour changes.

**Review:** Delivery lead and one additional reviewer pending.

## 2026-10-23: Interactive-first courses (IP v0.4)

**Status:** Approved by the architect (human sponsor) on 2026-10-23. Delivery lead and one additional reviewer pending under `09-review-and-governance.md`. Proposal: `proposals/2026-10-23-interactive-first.md`.

**Problem:** Canvases were capped at one per chapter and two per module and treated as enrichment. A system design course with about 135 ideas that move over time (traffic, replicas, clocks, partitions) could only animate a few of them, and learners understand these systems faster by pushing them than by reading.

**Decision:** Every Learn chapter teaches through at least one interactive element the learner manipulates or steps through, with predict before, "what changed" after and a transfer check. Per chapter: one primary canvas plus one small step-through or toggle; no per-module cap. Motion is allowed when it is the model moving, with Play, Pause, Step and Reset and a reduced-motion path. Time-based canvases build on a shared seeded simulation core (`frontend/src/canvas/sim/`) and reusable kit renderers, starting with `timeline`. The audit flags a Learn chapter with no interactive element.

**Files changed:** `README.md`, `00-principles.md`, `04-interactive-playbook.md`, `10-interactive-canvases.md`, `agents/interaction-designer.md`, `agents/interactive-canvas-builder.md`, `agents/chapter-writer.md`, `agents/critic.md`, `agents/course-auditor.md`, `scripts/audit-course.mjs`. The `buildment-course-builder` agent wrapper (outside the repository) now points to this rule.

**Platform impact:** New shared code under `frontend/src/canvas/sim/` and `renderers/timeline/`, proven by the system design sample chapters 8.4 and 10.6. Existing courses: the audit now reports 33 Learn chapters in `ai-engineering-interview` with no interactive element. Recommendation for the delivery lead: upgrade existing courses when each chapter is next edited, not in one sweep.

**Review:** Delivery lead and one additional reviewer pending.

## 2026-10-21: Architect requirements written into the IP

**Status:** Draft for delivery lead and reviewer sign-off under `09-review-and-governance.md`.

**Problem:** Several decisions the architect had made lived only in conversations and PR descriptions: the fellowship audience, the dash and attribution ban, the personalization rules, the reference builds, the canvas renderers, assessment checks, readability, quiz integrity, pre-PR checks and the PR process. Agents could not follow rules that were not written down.

**Decision:** Add each one to the document that owns its topic, update the affected agent prompts, and map every requirement in `11-architect-requirements.md` (sections 8 to 17). Correct two statements that disagreed with the code: the audit's option-length warning is 10%, not 1.25 times, and quiz chapters cannot hold a `ChapterRecap`.

**Platform impact:** None in this change. The seat cap and draw and a mentor follow-up thread remain platform gaps. Integrity signals and camera snapshots shipped in PR #23, and the `%%product.name%%` rules in PR #21.

**Review:** Delivery lead and one additional reviewer pending.

## 2026-10-21 — HLD diagrams and system-design canvases

**Status:** Draft for delivery lead and reviewer sign-off under `09-review-and-governance.md`. Proposal: `proposals/2026-10-21-hld-visuals.md`.

**Problem:** The IP defaulted to static SVG for conceptual architecture. That can lead agents to upload pictures of high-level designs without explaining request paths, public/private boundaries, or the effects of load and failure. A DNS → load balancer → private servers example exposed the ambiguity.

**Decision:** Use `MermaidDiagram` first for HLD topology and request paths. Keep static SVG for compositions Mermaid cannot make legible. Plan a separate registered, deterministic `InteractiveCanvas` when learners must vary conditions and observe a causal outcome; if no honest model is feasible, document a worked trace and the reason. Require the HLD diagram and canvas decision in module briefs, interaction maps, chapter briefs, and review.

**Platform impact:** Existing Mermaid and canvas slots support this instruction. Each new canvas still requires a coded and reviewed slug; the IP does not claim a generic authorable canvas editor exists.

**Review:** Delivery lead and one additional reviewer pending. No published course structure changes in this IP update.
