---
artifact: context-pack
course: build-with-ai (v2 amendment)
for: chapter-writer
version: 1
---

# Writer pack v2: Learn and Build with AI, the "fear less, build more" amendment

Read this whole file before writing. It replaces the chapter briefs for v2 (G2C skipped on the sponsor's standing instruction; see `../decision-log.md`). Paths are relative to the repository root `<repo>` named in your task.

- **The plan** is `courses/build-with-ai/course.yaml`: write exactly the files, titles and goals listed there for your chapters. Do not edit `course.yaml`.
- **The roadmap** is `../curriculum-roadmap.md` (v2): minutes, outcomes, canvases, gate evidence, capstone.
- **The research dossier v2** is `../v2/research.md` (index) and its parts `../v2/research-part-a.md` (fear and evidence, accountability), `-b.md` (common answers, asking several, the four engineering cases, growing fast) and `-c.md` (tools, voice, CLIs, cost, critique, content, detectors, commits). Every real-world claim must match the dossier, phrased no stronger than its "Phrase it this way" notes and "Facts writers may state". Never state anything a part lists under "Do not say" or "Unverified claims". Cite claim ids (A21, B31, C26) in each chapter's "Sources" fold. The v1 dossier `../research.md` still holds for v1 topics.
- **The v1 writer pack** `writer-pack.md` (same folder) holds the course voice, the v1 cast, the v1 tool facts and the gate, quiz and capstone formats. Read its sections 1 to 5 and 9. Where this pack differs, this pack wins.

## 1. What v2 is, and the tone

The sponsor asked for material that is "rich, practical and confidence-building" for fellows who are anxious that AI will take the jobs they are training for. v2 adds it to course 13, which already teaches AI as an enabler, tools by job, learning deeply, daily labs, a six-month project and sharing honestly. Never repeat those; refer back by chapter number ("the privacy check from 2.2").

- **Honest, then encouraging.** State real harm plainly (fewer entry-level openings in some fields in US data, A21, A31), then show what the learner can do. Never "AI will replace developers", never "AI is useless", never "you will be fine". No hype words, no fear words.
- **Why before what.** Open every chapter with a concrete case from the learner's world (a fellow, a freelance client, a small team), then the idea, then the details.
- **Realistic over analogies.** Real tools, real commands, real numbers from the dossier, real engineering cases. Analogies rarely.
- **Habits over tools.** Tools are examples "at the time of writing (checked 2026-10-25)", two per job where two exist, with a browser path and a fallback.

## 2. Hard rules (any violation fails review)

All v1 hard rules (v1 pack section 3) apply: no em or en dashes anywhere (U+2014, U+2013), including canvas data, specs and comments; no links in chapters and no `MustRead`, `InterestingRead` or `RealWorldEvent` blocks; no slop words; no invented real-world statistics (numbers in a case are "in this example"); check every sum twice; plain English, sentences under 20 words where you can and never over 30; no idioms; define every new term once (`GlossaryTerm`), never twice in the course (grep first).

v2 additions:

- **Read the claim type.** When you state a figure, say what kind it is: a prediction, a company's own claim, a vendor's benchmark, or an independent measurement, with its date and its sample where the dossier gives one ("in a 2025 study of 5,179 support agents").
- **US data is US data.** Say "in US data" for BLS, Indeed, Stanford and Gallup figures. No source predicts one person's future.
- **Vendor numbers are labelled.** VictoriaMetrics, Valkey, Redis and AWS numbers are "the project says" or "the vendor says", never facts about speed.
- **Disputed stories** (Devin, Builder.ai, Just Walk Out, "95% of AI projects fail") appear only in the dossier's neutral, dated wording, marked as disputed.
- **Real companies and people** appear only as the dossier states them, with dates. Fictional people and companies are named as fictional where a reader could think they are real ("a fictional delivery startup").
- **Paid or card-gated steps are optional** and always have a free path: voice cloning (C25 to C28), cloud cost on a live account (C49, C50), Claude Design (C3), Copilot code review (C56).
- **Voice: own voice only.** Cloning is an optional demonstration with consent, disclosure and the scam risk; the default path records the learner's own voice.
- **Detectors:** never teach how to evade an AI detector. Teach showing authorship (C68 to C70).
- **Never fake activity.** No backdated commits, bought stars, engagement pods or invented metrics, ever, even "to test" (C63 to C67).
- **Ages:** some tools need 18 or older (Claude, ElevenLabs); always give a second tool.
- **Respect:** neutral settings (clinics, schools, NGOs, cafés, small shops, freelance marketplaces, study groups); no politics or war as case material; hardship only as ordinary background; never ask a learner to share personal hardship; every personal prompt offers a provided case.

## 3. Chapter formats

Frontmatter as v1, plus `format: beats` on every new Learn and Read chapter:

```yaml
---
title: "<exact title from course.yaml>"
module: <n>
lesson: <n>
stepType: Read | Learn | Build | Check | Gate
format: beats            # only on new Learn and Read chapters
summary: "<one or two plain sentences>"
estimatedMinutes: <minutes from the roadmap>
---
```

### 3A. New Learn chapters: beats (agent-ip v0.5)

Format model (copy the format, not the content): `courses/system-design/01-thinking-like-a-system-designer/01.02-requirements-first.md`. Rules in `agent-ip/03-authoring-standards.md` → Visual-first Learn chapters, and `agent-ip/10-interactive-canvases.md` → Beat visuals.

- One or two sentences of situation before the first beat (the hook: a person, a decision, a cost).
- **Four to eight beats.** Each beat is `## Heading` (eight words or fewer, saying what the picture shows), then **the visual first** on its own line, then **at most 70 words** of visible text in two to four short sentences explaining what the learner just saw, then an optional `<GoDeeper title="Go deeper: ...">` fold with the mechanism, trade-offs, failure modes, numbers, tables and edge cases.
- **The visual** is `<InteractiveCanvas slug="..." />` (the roadmap's playable canvas, or a scene you write), or a `<MermaidDiagram title="..." chart={\`flowchart TD ...\`} legend="..." />` when the relationship is fixed. Mermaid on phones: `flowchart TD` (or `LR` for three nodes or fewer), at most 7 nodes, short labels, quote labels with punctuation. Every chapter has at least one Mermaid diagram that argues something the canvases do not.
- **Visible text 300 to 700 words** (outside folds, fences and component props). **Depth at least 900 words** including folds. Depth is folded, not dropped: the mechanism, the trade-offs, the failure modes and the sources live in the folds.
- **The teaching contract:** one `predict` right before the beat that shows the key surprise (inside the section, after the beat's text, like the model chapter's "Sort Hana's list" beat); then `## Quick check` with one or two `quiz` MCQs on a **new case** that transfers the claim. At most 3 assessment fences in total.
- **At least one playable beat:** the roadmap's playable canvas for the chapter. Other beats may use scenes (watch-only) or Mermaid.
- Budget: at most 40 JSX tags, no `BigWordAlert`, at most one `Callout`, `GlossaryTerm` for new terms.
- A last fold `<GoDeeper title="Sources">` listing the dossier ids and the named sources in words (no links), and saying which people and companies are fictional.
- End with a `**Next:**` line pointing to the next chapter in course.yaml.

### 3B. New Read chapters (set the scene): beats

Format model: `courses/system-design/01-thinking-like-a-system-designer/01.01-set-the-scene-launch-day.md`. One or two beats, each opening with a visual (usually a scene canvas you write, or a Mermaid diagram of the case), at most 70 visible words per beat. Folds tell the story in full (300 to 600 words), list what the module covers as a table (Chapter, You will practice), and define four to six key words in plain English. End with one `openquestion` (minWords 20 to 30, `prompt`, `required`, `minWords`, `allowSpeechInput`, `modelAnswer` only) or one predict, **in everyday words only: never ask about a mechanism the module has not taught yet**. Then `**Next:**`.

### 3C. Practice chapters (Build)

The sponsor's rule: teaching and practice are separate. A practice chapter holds the hands-on task for the Learn chapters before it, and teaches nothing new. Prose rules (not beats): at least **1,200 prose words** in paragraphs (headings, lists, tables, fences and components do not count, so explain in paragraphs), at most 6 top-level components and 25 JSX tags, one ```mermaid diagram of the steps, and at most 3 assessments. Layout:

1. A short opening: what you will do and why it matters (a fellow's case).
2. `## Before you start`: what you need, the browser path and the fallback, and the privacy check (refer to 2.2; never paste secrets, client data or other people's personal data).
3. `## The steps`: numbered steps, each followed by a paragraph explaining what to look for and the common mistake.
4. `## A worked example`: a fictional fellow doing the task in full, in prose, with the reasoning.
5. `## The provided case`: a complete case for anyone without a project, a laptop or an account. Always available.
6. `## What to hand in` and the `openquestion` (required, honest `minWords`, `allowSpeechInput: true`, `allowUrl: true`, `urlRequired: false`, `urlHint`), whose `modelAnswer` starts with "Mentor key for <provided case>: ..." (what must be present, what is acceptable, the common wrong answer), then a model answer for a different fictional case.
7. `## How your mentor will read it`: a rubric table (three to five criteria, Met, Partly, Not yet, each with an observable threshold), a bold **Pass rule**, and the follow-up step (the mentor replies with one or two questions; the learner answers in writing or a voice note).
8. `**Next:**`.

### 3D. Quiz chapters (Check)

As v1 (v1 pack section 4 and 4A): activities only, exactly **five** ```quiz MCQs and nothing else after the frontmatter. At least one "check the AI's output" item (a short AI answer in single quotes inside the question; the learner picks the mistake or the right next check). At least two items give a small table or three or four stated facts and ask which conclusion or next step the facts support; each wrong option fails because of a different stated fact. Keys test reading and reasoning, **never recalling a percentage or a date**.

### 3E. Gates

As v1 (v1 pack section 4, "Gate" and "Gate rubric"): at least 700 prose words, checklist, learning log, task, `## How your mentor will read it` with the rubric and pass rule, the openquestion with a mentor key for the provided case, `<ChapterRecap points={[...]} />`, `## All boxes ticked?`, `**Next:**`. The checklist names the module's chapters and quiz by their new numbers.

## 4. Assessments and the bias rules (courses 12 and 14 failed these)

MCQ and predict fences as in the v1 pack section 5. Four options, one explanation per option in order, the right one starting "Right.", wrong ones kind. No "all of the above", no "Which is NOT".

**Option length and position, checked by script on your files:**

- The correct option is **never** more than 10% longer than the longest wrong option.
- In any set of five (a quiz chapter), the correct option is the strictly longest in **at most one** item and the strictly shortest in **at most one** item. Across your whole assignment, aim for the key to be the longest in about a quarter of items and the shortest in about a quarter, not never and not always.
- Write all four options at the same level of detail: if one is a full sentence, all are.
- **Positions:** in each quiz chapter use positions 0, 1, 2 and 3 each at least once; never the same position more than twice in a row anywhere in your files. In-chapter quick checks: vary positions across your chapters.
- **Predicts:** two options; the correct label is not longer than the other; the correct option is first in about half of your predicts; in at least a third of them the intuitive answer is right (do not make "be cautious" or "do not trust AI" the answer every time; sometimes using the AI is the right call).
- Opinion goes to open questions. A graded key must follow from this course, the dossier or arithmetic.
- Blind re-answer each item yourself after writing it, without looking at the key. An independent model of another family re-answers every key later.

## 5. Canvases (interaction design for v2)

Every new Learn chapter has its roadmap playable canvas (table below). You write each one as **data plus a spec, no new component code**:

- `packages/learning-ui/src/canvas/<slug>/data.ts`: a header comment naming the course and chapter ("Course 13 v2, chapter 6.3: ..."); the config as an exported UPPER_SNAKE constant typed with the primitive's config type; and the registry spec as an exported camelCase constant named after the slug. Pattern:

```ts
import type { CustomCanvasSpec } from "../registry";
import type { ContextPickerConfig } from "../models/context-picker";
import { makeContextPickerCanvas } from "../primitives/canvas-factories";

// Course 13 v2, chapter 6.3: the fastest database depends on the workload.
export const FASTEST_DATABASE_DEPENDS: ContextPickerConfig = { /* ... */ };

export const fastestDatabaseDepends: CustomCanvasSpec = {
  kind: "custom",
  title: "...",
  purpose: "...",
  limits: "...",
  component: makeContextPickerCanvas(FASTEST_DATABASE_DEPENDS),
};
```

- `packages/learning-ui/src/canvas/<slug>/spec.md` on template 14A (`agent-ip/08-templates.md`): teaching claim, why a canvas, model (and the dossier ids behind every rule), rendering (the primitive), copy, edge cases, accessibility, acceptance criteria, placement.
- **Primitive types** (read the model file before writing data; every field's length limit is in its comment):
  - context picker: `models/context-picker.ts`, `makeContextPickerCanvas` (2 to 4 factors of 2 or 3 choices, 2 to 5 options, ordered rules, first match wins, a fallback, a start context; every option must be reachable).
  - flip deck: `models/flip-deck.ts`, `makeFlipDeckCanvas` (2 or 3 verdicts, 4 to 8 cards, each with a source line).
  - commit story: `models/commit-story.ts`, `makeCommitStoryCanvas` (exactly two histories of the same work).
  - word sampler: `models/word-sampler.ts`, `makeWordSamplerCanvas` (1 to 3 contexts, illustrative weights, labelled as illustrative in `limits`).
  - sorter: `models/sorter.ts`, `makeSorterCanvas`; model `sysdesign-m1-requirement-sorter/data.ts` (2 to 4 buckets, 6 to 8 cards, a `why` for every wrong bucket).
  - factor renderer (`kind: "factor"`): `renderers/factor/types.ts`; model `big-app-or-understood-app/data.ts`. Put the checked totals in the spec.
  - state machine (`kind: "state-machine"`): `renderers/state-machine/types.ts`; model `who-makes-the-call/data.ts`; grid at most 3 columns by 2 rows, edge labels at most 14 characters, at most 3 characters on an edge between two states in the same column.
- **Scenes** for watch-only beats (optional, any number): `kind: "scene"`, `renderers/scene/types.ts`; model `sysdesign-m1-constraints/data.ts`. Name extra scene slugs `<chapter-playable-slug>-<word>` or another unused kebab name; grep `server/src/shared/canvas/slugs.ts` first.
- **Reuse** is welcome: `sysdesign-m14-outbox-crash` (chapter 6.5) is already registered.
- **Do not edit** `registry.ts` or any `slugs.ts`: the orchestrator registers every slug after you report and runs the tests.
- Names, numbers and facts in a canvas match the chapter exactly. Theme-safe copy only; no colours in data. No em or en dashes.

| Ch | Slug | Primitive | Teaching claim (the one claim the canvas must make legible) |
|---|---|---|---|
| 1.2 | `claim-type-sorter` | sorter | Before you believe a claim about AI, ask what kind it is: a prediction, a company's or vendor's own claim, or an independent measurement (A10 to A16, A21, A29, A51). A twist card: an official projection (BLS) is also a prediction. |
| 1.3 | `fear-versus-data` | flip deck | Some fears are not supported (replacing all developers), some are (harder entry-level hiring in AI-exposed jobs in US data), some are partly true or out of date (the 19% slower result). Verdicts: "Data supports it", "Partly", "Data does not". Six cards, each with a source line from part A. |
| 1.7 | `who-the-smaller-team-keeps` | factor | A smaller team keeps the person who gives context, checks output, owns the result and works with others. Only when raw output alone matters does the fastest paster win (A34, A36 to A40, A46, A64). Three fictional teammates. |
| 5.2 | `first-or-researched-answer` | context picker | Only the primary page fixes an outdated fact; your context makes an answer fit you; a second assistant alone can repeat the same old answer. Use the Hacktoberfest 2026 rule change (B69) and a GSoC eligibility question (B70, B71) or similar dossier facts. |
| 5.3 | `agreement-is-not-proof` | sorter | Disagreement between assistants shows where to check; agreement on a fact that matters still needs the primary page; agreement on low-stakes wording can stand as a draft (B12, B15, B16). Buckets such as "Check the source now" and "Fine as a draft". |
| 6.2 | `likely-next-word` | word sampler | A model picks likely words, so the common option comes out most of the time; adding your context changes the odds; the fix is the question, not a setting (B1, B2, B5, B6). Two contexts; weights illustrative. |
| 6.3 | `fastest-database-depends` | context picker | The fastest database depends on the job (transactions or analytics), the writers (one or many), the machine and the budget (B44 to B56). Options among PostgreSQL, SQLite, DuckDB, ClickHouse and one write-optimised (LSM) store, only where the dossier supports the rule. |
| 6.4 | `metrics-store-context` and `cache-choice-context` | context picker (two) | Prometheus on one server is single node by design; long retention or several servers points to remote storage or VictoriaMetrics (B17 to B28). Redis or Valkey depends on the licence you need, whether you offer it as a service, Redis 8 features and managed price (B29 to B41). The playable beat may be either; both are registered. |
| 6.5 | `outbox-or-not` | context picker | Use the outbox when the database change and the event must both happen or neither; it gives at-least-once delivery so consumers must be idempotent; other cases want a direct publish, CDC, or listen to yourself (B57 to B63). Also embed `sysdesign-m14-outbox-crash` as one beat. |
| 8.2 | `adopt-a-tool-loop` | state machine | Adopt a tool fast and safely: docs first, a tiny lab, explain it back, then use it; refuse "adopt from a post" and "ship code you cannot explain". |
| 8.3 | `shows-thinking-or-noise` | sorter | Public work that shows thinking (a series with a log, a small tool someone uses, a write-up of a failure) beats noise (forty tutorial clones, a fork with no changes) (B78). |
| 8.4 | `which-team-project-fits` | context picker | Which time-boxed team project fits depends on your hours, whether you need a stipend and whether you are new to open source; every verdict says "read its rules page" (B67 to B74). Include a community project you join yourself. |
| 8.5 | `trust-or-erode` | sorter | Habits that build trust in a team that uses AI (small pull requests you can explain, written updates with blockers, asking early) against habits that erode it (B75 to B77). |
| 9.2 | `pick-a-visual-tool` | context picker | The kind of visual tool depends on the job (a diagram, a screen design, a short video), whether you can pay and whether you have a laptop; every pick has a free path or fallback (C1 to C13). |
| 9.3 | `short-lesson-loop` | state machine | A short lesson on demand: ask for a plan, take the lesson, let it quiz you, check one claim against a source; refuse "paste the summary as notes" (C14 to C18; v1 3.4, 3.5). |
| 9.4 | `voice-use-check` | sorter | Your own voice with a label is fine; anything with someone else's voice needs their explicit consent; some uses are never fine (C25 to C38). |
| 9.5 | `least-access-picker` | context picker | Give a CLI or connector the least access the task needs: read-only for reading, write on one repository for a pull request, a billing view that also shows invoices, and some tasks stay with a person (C39 to C55). |
| 9.6 | `act-on-feedback` | sorter | AI critique is a list of claims to test: fix now, test first, or reject with a reason (C56 to C58). |
| 10.4 | `useful-or-bait` | sorter | Useful, real content earns attention honestly; bait and fake engagement break platform rules and fade (C59 to C66). |
| 10.5 | `detector-myths` | flip deck | AI detectors are unreliable and flag second-language writers; authorship is shown by drafts, real stories and checked facts (C68 to C71). |
| 10.6 | `dump-or-story` | commit story | One dump commit hides the work; small meaningful commits show the steps a reviewer can follow; a squash merge keeps one commit on main, so the pull request carries the story (C67, C72 to C76). Yara's Qasir week. |
| 11.2 | `who-leads-this-call` | sorter | Three buckets: "AI drafts, you decide", "You lead, AI helps", "People only" (A62, A64, v1 1.5). |
| 11.3 | `own-the-incident` | state machine | Owning a mistake when AI was involved: notice, stop the harm, tell the people affected, fix, write it down; refuse "blame the AI" (A56, A58 to A62). |
| 11.4 | `use-ai-or-not` | context picker | Stakes, whether you are learning the skill, private data and whether you can check the result decide whether to use AI, use it as a tutor only, anonymise first, or do it yourself (v1 1.6, 2.2; A62). |

## 6. Cast (keep every fact consistent; grep the course before adding a name)

v1 cast stays (v1 pack section 2). **Yara** and her project **Qasir** (link shortener for small shops and NGOs, about 8 hours a week, old laptop, phone for reading) are the running example in modules 5, 6 and 10. **Rana** (refused AI out of fear) reappears in 1.2 and 1.3: her worry came from headlines. **Ibrahim** (clinic queue app) is the capstone's provided case.

New v2 people (fictional), each owned by one module:

| Person | Module | Canon |
|---|---|---|
| Rawan | 1 | A team lead at a small fictional software agency whose team went from five to three engineers; she explains in 1.7 who she kept and why. |
| Hadi | 5 | Developer at a small fictional agency who picked a library from one fast AI answer; it turned out unmaintained and he lost a week (5.1). |
| Munir and Tala | 6 | Two teams that asked "which cache should we use?" and both got Redis: Tala's two-person team building an internal tool (Redis is fine), Munir's fictional company that sells hosted caching to customers (the licence matters) (6.1, 6.4). |
| Laith and Mira | 8 | A year after the course: Laith has forty tutorial repositories; Mira spent twelve weeks on a team open-source project (8.1). |
| Bashar | 9 | Built a good study-group timer that nobody understood from its one-line README (9.1). |
| Lujain | 9 | Provided case for the demo kit (9.7): a fellow with only a phone. |
| Zaid | 10 | Wrote a post with AI help that a classmate called "AI-made"; his drafts and notes showed it was his (10.5). |
| Jawad | 11 | Worked at a fictional clinic booking service whose AI reminder message sent the wrong time to patients; he answered for it (11.1, 11.3). |

## 7. Name pools (one per writer; grep before you use a name)

- Module 1 writer: Omar, Sana, Mazen, Dalia, Khalil.
- Module 5 writer: Razan, Suhaib, Leen, Fares, Aya.
- Module 6 writer: Ayman, Rahaf, Qusai, Dima, Nabeel.
- Module 8 writer: Yazan, Hanan, Osama, Ruwa, Faisal.
- Module 9 writer: Nabil, Shatha, Murad, Ghada, Wisam.
- Module 10 writer: Alaa, Wafa, Samir, Haya, Anwar.
- Module 11 writer: Manar, Sami, Bayan, Ehab, Rima.

## 8. Module notes

**Module 1 (new 1.2, 1.3, 1.7, 1.9; revise 1.1, 1.8, 1.10).** 1.2: why AI looks bigger: CEO predictions (A10, as a prediction with its date), launches and later scrutiny (A12, A13), disputed stories in neutral words (A14 to A16), the "95%" headline (A51), and why fluent text feels true (A18 to A20); the "read the claim" checklist (prediction or measurement, vendor or independent, sample and country, what counts as success, who gains). 1.3: three honest layers: the fear is common (A1, A5, A8) and partly grounded (A21, A31); much of it comes from prediction and marketing; overall displacement is not found (A21, A23, A24, A29) and studies show real gains on suited tasks (A34, A36, A37), with the 19% result marked out of date (A38, A39). 1.7: fewer people doing more (A43 to A50, with the reversals A43, A52, A53 and no company handing all software to AI); who gains speed (novices, A34) versus who a smaller team keeps (context, checking, ownership, team work: A40, A56, A58, A64); "this is easier for you now than ever" framed as access to explanations, troubleshooting, research and double-checking (v1 module 3 habits), not a promise. 1.9: quiz. Revisions: 1.1 gets one paragraph in Rana's section on the headlines behind her fear and new rows in its module table; keep its other text. 1.8 gets one paragraph linking to 1.7. 1.10 gate adds a first part: one claim about AI and jobs the fellow has heard, checked (what kind of claim, what the evidence says, its limits), with a provided claim; update the checklist numbers (chapters 1.2 to 1.8, quiz 1.9) and the rubric.

**Module 5 (new, all chapters).** The method: research before you ask (read the primary page, write down your context and constraints), ask two assistants (two tools per job, v1 2.3), compare (disagreement shows where to check; agreement is not proof because models share errors, B15), check claims on primary pages (rules pages, docs, licence files, release notes, with the date), and ask what was left out ("What did you leave out? What would change your answer? What is the strongest case against it?" is the course's method, not a research finding; sycophancy B7 to B9 explains why to ask it neutrally). Yara's example: she wants to join an open-source program; a fast answer says "four pull requests in October gets you a T-shirt" (out of date, B69) and "GSoC is only for students" (wrong, B70); the primary pages show the 2026 rules and the stipend table with a West Bank and Gaza row (B71), and that payment access is not confirmed (say so). Practice 5.4: a one-page decision record (question, my context, first answer, assistant A, assistant B, where they disagreed, primary pages read with dates, what was left out, my decision and what would change it). Provided case: a fictional fellow choosing between two free hosting options for a portfolio site, with two AI answers and two excerpted "rules pages" written in the case (fictional, labelled). Gate 5.6 asks for the record.

**Module 6 (new, all chapters).** 6.2: why the common answer (B1 to B11): ranked likely words, tuning that narrows answers, popularity preference measured for libraries and languages (say "measured for code libraries; the same tendency is a reasonable warning for databases", B6), old knowledge, agreement bias; no temperature lesson (B2); the fix is the question and the context. 6.3: fastest database by job, with ClickBench and TPC as "one benchmark for one kind of query" (B55, B56). 6.4: Prometheus or VictoriaMetrics, Redis or Valkey, each with a "when each wins" table; the Redis licence timeline is the opening story (7.2 and earlier BSD; 7.4 to 7.8 RSALv2 or SSPLv1; 8 and later adds AGPLv3, B29 to B31; Valkey from 7.2.4 under BSD, B34); vendor numbers labelled; Tala's team and Munir's company. 6.5: Outbox: the dual-write problem, the outbox steps, at-least-once and idempotent consumers, Kafka transactions do not include your database (B61), and the alternatives (B62); link to the system design course for depth. Practice 6.6: take one default in your project (a database, cache, queue, framework or host) and write a "when each wins" table with the context that changed the answer and the primary pages read. Provided case: Yara's Qasir needs a place to keep click events for a weekly report; the case gives the AI's default and Qasir's numbers. Gate 6.8.

**Module 8 (new, no practice chapter).** 8.2: adopt a tool in days with the loop; tie to v1 daily labs (module 4) and the five angles (3.3). 8.3: build more to show: series (a weekly lab series, v1 4.5), small products someone uses, repositories with a README that explains decisions; noise (tutorial clones, forks with no changes); public work is "evidence others can check", never a hiring promise (B78). 8.4: go deep with a team: GSoC, Outreachy and LFX as time-boxed programs with a dated rules table (length, stipend, eligibility in the program's words, B70 to B74), each program's AI rule (B67, B68): explain and edit every AI-assisted contribution; a community project you join yourself is always an option; Hacktoberfest 2026 does not count pull requests (B69). 8.5: habits that build trust (code review practice B75, psychological safety B76, written async updates B77), with AI in the loop: never send a pull request you cannot explain; link to courses 5 and 6 by name. Gate 8.7: a public-work plan and a team-project plan with the program's AI rule.

**Module 9 (new).** Teach jobs, not product names; every tool "at the time of writing (checked 2026-10-25)", two per job, a fallback. 9.2: visuals and demos: chat assistants that draw a diagram or a small page (Claude artifacts are template based now and Claude Design is a paid preview, C1 to C3; Gemini Canvas; Codex inside ChatGPT with limits, C6), diagram as text (Mermaid), a short screen recording (OBS, laptop only); motion graphics tools (Remotion with its licence terms, Motion Canvas, Manim) named as options only, no install lab (C12, C13). Keep videos short and small for weak connections. 9.3: short lessons on demand: ask for "a 15-minute lesson on X with a plan, three checks and the sources to read", then check one claim; Gemini Notebook audio and study modes as in v1 3.5 (refer back; recheck facts with C14 to C18). 9.4: your voice: record your own voice by default; cloning only your own voice as an optional, paid demonstration (C25 to C28), consent (C27), disclosure (C35 to C38), the scam and voice-ID risk (C30 to C34). 9.5: CLIs and connectors: GitHub CLI commands (`gh issue list`, `gh issue create`, `gh pr create`, `gh pr comment`, `gh pr review`) with a fine-grained token limited to one repository and an expiry (C39 to C42); MCP and the GitHub MCP server's read-only mode; instructions hidden in an issue (C43 to C45); cloud cost: AWS Cost Explorer CLI costs one cent per request, budgets alert but do not stop spending, the billing read-only policy also shows invoices and payment details, Google Cloud's trial needs a payment method (C46 to C50); the hands-on part uses a supplied sample cost report written into the chapter; secrets: revoke first (C53 to C55). 9.6: AI critique against a rubric, then test each point; sycophancy means ask for "the three weakest points" and still decide yourself; Copilot code review is not on the Free plan (C56 to C58); link course 16 for resume and LinkedIn critique. Practice 9.7: a demo kit for your project (a visual, a short lesson or README section, one `gh` workflow with least access, and three critique points accepted or rejected with reasons); provided case: Lujain's phone-only study-group timer. Gate 9.9.

**Module 10 (new 10.4 to 10.9; revise 10.1).** 10.4: what spreads (useful and emotionally real content, C59), how much is luck (C60), platform rules against fake engagement (C63 to C65), fake stars help briefly and attract suspicion (C66); do not say LinkedIn demotes engagement bait (C61, C62); link course 16 for LinkedIn and blog mechanics. 10.5: AI help without the AI look: keep your own voice, opinions and real stories; AI as an editor that asks questions (v1 10.2); detectors are unreliable and flag second-language writers (C68, C69); common tells as a self-editing list, signs not proof (C70); show authorship (drafts, notes, the real story, the checked fact). 10.6: keep it human: small real commits, messages that say why, the pull request as the story on squash-merge projects (C72 to C76); never fake activity or metrics; a commit graph is weak proof because dates can be set (C67). Practice 10.7: one post from your own commits with AI as editor, the AI-use line from 10.3 and the authorship evidence; provided case: a fictional fellow's week of commits and notes given in the chapter. Gate 10.9. Revise 10.1's module table and objectives only.

**Module 11 (new 11.1 to 11.4 and 11.7; revise 11.5, 11.6, 11.8 and 7.4).** 11.2: judgment, context and taste: who leads which call (link v1 1.5 "You make the call" and module 6). 11.3: accountability cases in dossier words with dates: Mata v. Avianca (A56), Moffatt v. Air Canada (A58), the July 2025 database deletion during a code freeze, data later recovered (A59, A60), EU AI Act Article 14 (A62); owning a mistake. 11.4: when not to use AI: high stakes you cannot check, a skill you are trying to learn (v1 1.6), private data (v1 2.2), and when the result cannot be checked. 11.5 mixed review: rewrite it as five fresh cases that span the course, at least two from v2 modules (keep any v1 item that still fits). 11.6 capstone: keep the five parts and Ibrahim's case; add part 6 exactly as the roadmap's capstone section says (the first 30 days carried out: one researched decision, a shipped demo, the write-up published as the piece of content), extend the rubric with one row for part 6 and the provided case with a decision and a demo described in text; raise `estimatedMinutes` to 150. 11.7 defend your work (Build, prose rules): explain the defence; the `aiinterview` fence (format below), and the written defence `openquestion` that completes the same step for anyone without a key (minWords 200). 11.8 course gate: update the checklist and the toolkit lines for v2 habits, add "your next 30 days" to the learning log, and the look back at gate 1 (now 1.10). 7.4: add one paragraph pointing to modules 5 and 6.

The `aiinterview` fence for 11.7 (do not add other keys; the importer refuses unknown keys):

````
```aiinterview
title: "Defend your project and one decision"
opening: "<first question, under 600 characters>"
focus: [best-technical, five-whys, impact]
context: project
maxTurns: 10
whyDepth: 3
required: false
rubric: "<what a strong defence shows; probes; stop rules (accept 'I do not know' and 'I did not measure that'); judge features, not length; flag names: vague ownership, unsupported number, pseudo-story, invented reason risk, jargon without explanation; kind and direct tone>"
```
````

Look at `courses/founder-interviews/01-stories-you-owned/01.06-checklist.md` on branch `content/founder-interviews` (worktree `D:/Projects - Community/buildment-founder`) for a working example of the fence next to its written option.

## 9. Where a generic AI practice block would help

The sponsor will build a generic AI practice component later; do not build or imitate one. In your report, list the places in your chapters where it would help (for example "6.6: generate a new default question from the learner's stack, score the 'when each wins' table, ask follow-ups").

## 10. Before you hand back

- Every file in your assignment exists with the exact title, `estimatedMinutes` from the roadmap and `format: beats` where required.
- Zero U+2014 and U+2013 in your chapters, canvas data and specs: `grep -c $'\u2014\|\u2013' <files>`.
- From `<repo>`: `node agent-ip/scripts/audit-course.mjs courses/build-with-ai` with no flags on your chapters.
- Bias check on your chapters: `node C:/Users/Zeeshan/bm-aiadv-scripts/bias-check.mjs <your module folder>` (from `C:/Users/Zeeshan/bm-aiadv/server`, after copying your files with `powershell.exe -NoProfile -ExecutionPolicy Bypass -File C:/Users/Zeeshan/bm-aiadv-scripts/sync.ps1`); fix any FILE or OVER10 line.
- Source validation (same folder): `node node_modules/tsx/dist/cli.mjs scripts/validate-course-source.ts --course build-with-ai` with no errors in your files.
- Edit only your chapter files and your canvas folders. No git commands that change anything. Do not install packages or start servers.
- Report: files written; per chapter, the audit numbers (beats, visible and fold words, or prose words); canvases created (slug, export names, primitive); the bias-check lines for your files; places a generic AI practice block would help; and anything in the dossier you could not follow.
