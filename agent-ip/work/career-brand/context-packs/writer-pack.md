---
artifact: context-pack
course: career-brand
for: chapter-writer
version: 1
---

# Writer pack: Your Career Brand: Resume, LinkedIn, Personal Site and Proof of Work

You write the chapters (and the canvas `data.ts` files) for the modules you are assigned. Read this whole file first. Paths are relative to the repo root `<repo>`.

## 1. What to read, in this order

1. Your module brief: `agent-ip/work/career-brand/module-briefs/NN-*.md`. It is your chapter brief: outcome, minutes, beat plan, worked example, folds, sources, Build template, gate parts.
2. `agent-ip/work/career-brand/module-briefs/00-areej-and-cast.md`: the provided fellow Areej and every scene person. **Use these facts and numbers exactly.** Never invent a new fact about Areej; if your chapter needs one the canon lacks, define it once, keep it small and consistent, and list it in your report.
3. Your chapters in `agent-ip/work/career-brand/interaction-map.yaml`: beat by beat, the heading, claim, visual, slug, playable beat and where the predict sits. Where the map and the module brief differ, **the map wins** (it records its changes in `changes_to_module_briefs`).
4. Your canvas specs: `agent-ip/work/career-brand/canvas-specs/career-m<N>-*.md`. Each holds the final data as JSON.
5. Your parts of `agent-ip/work/career-brand/assessment-plan.md`: the quiz chapter (section 3), the quick checks (section 4), the predicts (section 5), the gate (section 6), the drill (section 7) and, for module 9, the capstone (section 8). It fixes each item's skill, scenario seed, **key position and key length**. Follow those exactly. If a predict tied to a canvas must change to match the canvas data, keep the planned key position and relative length.
6. `courses/career-brand/course.yaml`: exact file names, titles, goals and minutes for your module.
7. Format references (read, do not copy content):
   - A beats Learn chapter and a beats Read chapter: `courses/system-design/28-the-system-design-interview/28.03-follow-up-probes-and-how-to-answer-them.md` and `28.01-set-the-scene-45-minutes-one-blank-board.md`.
   - A quiz chapter: `courses/build-with-ai/` (any `*-quiz.md`).
   - A gate with an AI drill and a mentor-key `modelAnswer`: `C:/Users/Zeeshan/AppData/Local/Temp/claude/D--Projects---Community/c2002107-df25-498a-ba6f-41bd3b7d09ed/scratchpad/fi/courses/founder-interviews/02-impact-with-honest-numbers/02.06-checklist.md` (course 14, not merged yet).
   - A practice (Build) chapter: `courses/build-with-ai/06-share-the-work/06.05-capstone-your-project-start.md`.
8. Skim `agent-ip/03-authoring-standards.md` (Audience: the fellowship; Visual-first Learn chapters; Forbidden patterns) and `agent-ip/04-interactive-playbook.md` (Option-length hygiene, QUIZ, PREDICT, OPEN_QUESTION).

For a claim about research or a platform, open the source row in `agent-ip/work/career-brand/research.md` (S IDs) or `research-platforms.md` (P IDs) and use its **Phrase it this way** wording. Never state anything in their **Unverified claims** tables as fact (no "six seconds", no "75 percent rejected by ATS", no AI speed multiples, no LinkedIn character limits stated as numbers: tell learners to trust the counter on screen).

## 2. Voice and care (Gaza fellows, English second language, phones)

- Plain English. Short sentences (aim under 20 words, never over 30). Common words. Define each new term on first use (in the beat text or with `GlossaryTerm`). No idioms ("stand out from the crowd", "nail it", "red flag", "low-hanging fruit"): say the literal thing.
- Why before what: open each chapter with a person and a moment the learner recognises, then the idea.
- Calm, practical, respectful. Fellows have built real things under hard conditions; write as if they have not yet learned to show it, not as if they lack experience. Hardship (power cuts, weak data, a shared room) is ordinary background, never drama. Never ask a learner to share personal hardship.
- Honesty is taught as the strategy that survives "how was that measured?", not as a lecture. Every model answer and worked example uses numbers with a source, or an honest "not measured, here is how I would".
- Privacy in every gate with a drill, one line before the fence: never paste your full name, phone, email, address, ID numbers, passwords, keys, client or employer names, private company data or other people's details; use roles ("a logistics client", "my team lead").
- Platforms (LinkedIn, GitHub, Google sign-in, DEV, Medium, static hosts) may be named where the chapter is about them, with "checked 2026-10" on any limit or feature. No real people's profiles, no named founders or investors, no company case studies as fact. **Never name, link or describe the sponsor's own website**, and never use a real personal site as an example. People and teams are fictional; say so once in each set-the-scene chapter.
- Cross-link by name, never repeat: course 14 "The Founder Interview" (defending numbers and stories aloud), course 7 "Professional & Business Communication" (basic LinkedIn and outreach etiquette), course 13 "Learn and Build with AI" (from a week of commits to an article; saying when AI helped).

## 3. Hard rules (any one fails review)

- **No em dashes (U+2014) or en dashes (U+2013) anywhere**, including canvas data and comments. Ranges: "3 to 4".
- No AI or tool attribution. No slop: "In today's world", "It is important to note", "delve", "landscape", "leverage", "seamless", "robust", "game-changer", "unlock", "journey", "level up", "supercharge", "Let's dive in", "key takeaways". No unsupported superlatives.
- No links in chapters (no URLs). No `MustRead`, `InterestingRead`, `RealWorldEvent` blocks.
- Check every number and sum twice. Percentages come with their before and after counts where the chapter teaches them.
- Quiz and predict hygiene: an explanation for every option (the right one starts with "Right."; wrong ones say kindly what was missed, each standing alone); same level of detail in every option; the key never more than 10 percent longer than the longest wrong option; positions and lengths as the assessment plan assigns them; no "all of the above", no "Which is NOT", no joke options; quiz actors have a name, role and concrete project, never the scene person's exact case. Re-answer each item blind yourself after writing it.
- YAML in fences: double-quote every string; single quotes inside; quote anything with a colon.

## 4. Chapter files and frontmatter

Path: `courses/career-brand/<module-dir>/<file>` exactly as in course.yaml.

```yaml
---
title: "<exact title from course.yaml>"
module: <n>
lesson: <n>
stepType: Read | Learn | Build | Check | Gate
format: beats            # Read and Learn chapters only
summary: "<one or two plain sentences>"
estimatedMinutes: <minutes from course.yaml>
---
```

`NN.01-set-the-scene.md` is Read; teaching chapters are Learn; practice chapters are Build; `*-quiz.md` are Check; `*-checklist.md` are Gate.

### Read (set the scene), `format: beats`
One or two sentences, then one or two beats (`## heading` of 8 words or fewer, the visual first on its own line, then at most 70 words, then `GoDeeper` folds). Include a `GoDeeper` titled "What this module does" (the chapters and the piece of the kit the module builds) and one titled "Sources" if any claim needs one. Say the people are fictional. A set-the-scene chapter may ask "what do you notice?" in everyday words (a predict with two options, or nothing); never a question about a mechanism the module has not taught. End with a `**Next:**` line.

### Learn, `format: beats`
- One or two sentences of setting, then **4 to 8 beats** as the interaction map lists them.
- **Each beat:** `## Heading` (8 words or fewer) → the visual first (`<InteractiveCanvas slug="..." />` on its own line, or a ```mermaid fence) → at most **70 words** saying what the learner just saw and why it matters (nothing the picture does not show) → one or more `<GoDeeper title="...">` folds with the mechanism, the worked example step by step, trade-offs, failure modes, the honest alternative, and how to apply it to your own kit today.
- **Totals:** 300 to 700 visible words (outside folds, fences and components); **at least 900 including folds** (aim 1,100 to 1,400 so edits do not drop below). At most 40 JSX tags. No `BigWordAlert`. At most 3 assessment blocks in total: the **predict** right before the beat the map names, and **one or two quick-check quiz MCQs** under a final `## Quick check` heading (they come from assessment plan section 4).
- At least one beat is the playable one the map names. Where a beat's canvas plays a story, say in the text what to watch; where it is playable, say what to touch.
- A fold titled "Sources" at the end names the ideas' origins in plain words (researchers as the dossier's Credits table allows, at most two or three per chapter; platform help pages with "checked 2026-10"). No URLs.
- Mermaid on phones: `flowchart TD`, at most 7 nodes, short labels, quote labels with punctuation.
- End with a `**Next:**` line.

### Build (practice chapter), no `format`
- **At least 1,200 prose words** in paragraphs (headings, lists, tables, block quotes and fences do not count; aim 1,400 to 1,700). At most 6 top-level components, 25 JSX tags, 3 assessment blocks.
- Shape: why this piece of the kit matters now and what it feeds later; the template the learner fills (a table or a fenced plain-text template they copy into their own notes); a worked example on Areej's material, explained in prose step by step; **how to use AI on your own material** (paste your own career arc or ledger rows and ask it to restructure, shorten or find gaps; never to add numbers, ownership or experience; then the empty-sentence edit pass); the path for fellows with no work yet or no laptop (Areej's material, the no-install path); common mistakes and how to spot them; acceptance criteria as a short checklist; where to keep it (private notes, not public) and what the next module uses from it.
- One `openquestion` at most, only if the module brief asks for a submission here (9.3 and 9.4 do, with `minWords: 0` so a link alone is accepted). Otherwise the gate collects the evidence.
- No canvas in a Build chapter.

### Quiz (Check)
Activities only: exactly **five** ```quiz MCQ fences after the frontmatter and nothing else. Items, keys, positions and lengths from assessment plan section 3. Never an ```aiinterview fence.

### Gate
Order, as in the course 14 gate reference:
1. One intro sentence.
2. `## Module N checklist`: five or six honest items, including "I finished the quick checks in chapters N.2 to N.x and the quiz in N.y".
3. `## Learning log`: four numbered questions about how they think and act; personal ones offer Areej's case ("or use Areej's ...").
4. `## Your task: ...`: the evidence to write, explained in paragraphs: what it is for, a strong answer from a fictional fellow (in prose), a weak answer and why it fails "how was that measured?" or "what was your part?", Areej's case for anyone who prefers it.
5. `## How your mentor will read it`: rubric parts with Met, Partly and Not yet and observable thresholds, the **Pass rule**, then the follow-up step (the mentor replies with one or two questions; the learner answers in writing or a voice note).
6. For gates with a drill (1.6, 3.8, 5.8, 6.8): `## Practice with the AI interviewer`: one paragraph on what the drill does (asks an opening question about your own pasted material, follows up on how each number was measured and what your part was, ends with strengths, what to do better, named flags and next steps, including one thing to measure or build next); one paragraph on how to use it ("I did not measure that" and "that was not my decision" are good answers; the feedback is practice, not a hiring decision, and can be wrong; it gives no score, so read the level word on each note); the privacy line; and "If you do not have a key or credit, the written task below completes this gate." Then the ```aiinterview fence exactly as assessment plan section 7 gives it (keys allowed: `title`, `opening`, `focus`, `context`, `maxTurns`, `whyDepth`, `required`, `rubric`; `required: false`; the rubric one double-quoted line).
7. `## Written task`: one sentence, then the single `openquestion` from assessment plan section 6 (for drill gates its prompt includes the marked optional written-option part, and asks drill users for one piece of feedback they will act on and why).
8. `<ChapterRecap points={[...]} />` (four or five points), `## All boxes ticked?`, `**Next:**`.

**At least 700 prose words** in paragraphs (aim 850 to 1,000). No canvas, diagram, `BigWordAlert`, `GlossaryTerm`, `Callout`, predict or quiz in a gate. The `openquestion` uses `required: true`, an honest `minWords`, `allowSpeechInput: true`, `allowUrl: true`, `urlRequired: false`, `urlLabel: "Voice note link (optional)"`, `urlHint: "An audio link your mentor can open without signing in. Audio only is fine."`, and a `modelAnswer` that starts "Mentor key for Areej: ..." (what to accept, what not to accept, which of the five flags apply: vague ownership, unsupported number, pseudo-story, invented reason risk, jargon without explanation), then "Model answer for a different case: ...".

## 5. Canvases: you write the `data.ts`

For every slug your chapters use whose folder does not exist yet, create `packages/learning-ui/src/canvas/<slug>/data.ts` and `spec.md` (copy the canvas spec file's content into `spec.md`). The spec's JSON is the data: copy it exactly unless the chapter needs a wording fix (then change both, and keep under the length limits). Do not edit `registry.ts`, `package.json`, any `slugs.ts` or anything outside your canvas folders: the orchestrator registers every slug and runs the checks after you report.

- **Scene:** `import type { SceneSpec } from "../renderers/scene/SceneCanvas";` then `export const <camelCaseOfSlug>: SceneSpec = { kind: "scene", title, purpose, limits, hint?, scene: {...} };`. Model: `packages/learning-ui/src/canvas/sysdesign-m28-silent-boxes/data.ts`.
- **Sorter:** model `packages/learning-ui/src/canvas/sysdesign-m28-answer-sorter/data.ts` (`makeSorterCanvas`, `CustomCanvasSpec`).
- **Phrase fixer / budget stack / slot card:** model `packages/learning-ui/src/canvas/career-m6-empty-phrases/data.ts`, `career-m1-first-look/data.ts`, `career-m3-claim-card/data.ts` (`makePhraseFixerCanvas`, `makeBudgetStackCanvas`, `makeSlotCardCanvas` from `../primitives/canvas-factories`; config types from `../primitives/<name>`; export the config arrays as named constants too).
- The export name is the slug in camelCase (`career-m1-sixty-sent` → `careerM1SixtySent`). A header comment names the course, chapter and beat. No dashes, no hex colours, no brand names except a platform the beat is about.
- If a slug's folder already exists (`career-m1-first-look`, `career-m3-claim-card`, `career-m6-empty-phrases`), update its data to the revised spec.
- Reused canvases from other courses (`sysdesign-m17-same-average`, `sysdesign-m17-slo-window`) need no folder; just use the slug.

## 6. Before you hand back

- Every file in your modules exists with the exact title and minutes.
- From `<repo>`: `node agent-ip/scripts/audit-course.mjs courses/career-brand` shows no flags on your chapters other than unregistered-canvas effects (a Learn chapter whose canvases are not registered yet may show "no interactive"; that is expected).
- From `<repo>/server`: `node node_modules/tsx/dist/cli.mjs scripts/validate-course-source.ts --course career-brand` and `node node_modules/tsx/dist/cli.mjs scripts/audit-course-structure.ts --course career-brand`: no errors in your files except "unknown canvas slug" for slugs not registered yet.
- A scan of your files for U+2013 and U+2014 finds nothing (`node -e` with a regex, or `grep`).
- No git commands that change anything. Do not install packages.
- Report: files written, slugs created, prose or visible and depth words per chapter from the audit, any fact you added to Areej's canon, and any claim you were unsure how to phrase.

## 7. Lessons from the module 1 sample (G3)

- **Read `courses/career-brand/01-what-a-reader-sees-first/` first** (1.2 is the model Learn chapter, 1.5 the model quiz, 1.6 the model gate). Match its quality and format.
- In Learn chapters put the `**Next:**` line at the end of the last beat, before `## Quick check` ("Do the quick check below, then go to chapter N.x."). After the quiz it would count as a beat with no visual.
- For a Mermaid beat use the `<MermaidDiagram title="..." chart={`...`} legend="..." />` tag, not a ```mermaid fence: the beats audit strips fences before checking that a beat opens with a visual.
- A quiz chapter cannot hold other text, so mark fictional actors inside the first stem ("In this made-up case, ...").
- One quick check per Learn chapter, as the assessment plan says, even where the interaction map lists two.
- When the canon quotes a slop word on purpose (for example Areej's old objective paragraph), quote it as her old text and say so.
