---
artifact: context-pack
course: product-sense
for: chapter-writer
version: 1
---

# Writer pack: Product Sense for Engineers: UI, UX and Work People Remember

Read this whole file before writing. It replaces the chapter briefs (G2C was skipped on the sponsor's instruction; see `../decision-log.md`). Paths are relative to the repository root `<repo>` (the worktree named in your task). The test copy `<scratch>` is also named in your task.

- **The plan** is `courses/product-sense/course.yaml`: write exactly the files, titles and goals listed there for your module.
- **The roadmap** is `../curriculum-roadmap.md` (minutes, outcomes, canvases, practice outputs, capstone).
- **The dossier** is `../research.md` (accepted outline changes) plus `../research-part-a.md` and `../research-part-b.md`. Every claim about accessibility, usability, product methods, AI tools and presenting work must match the dossier, phrased the way its "Phrase it this way" notes say. Never state anything in its "Do not say" lists, its myth table as fact, or its UNVERIFIED tables. Cite source IDs (for example [A1], [B29]) in a `GoDeeper` titled "Sources" at the end of each Learn chapter.
- **Format models** (copy the format, never the content):
  - Learn chapter in beats: `courses/system-design/01-thinking-like-a-system-designer/01.02-requirements-first.md`.
  - Read chapter in beats: `courses/system-design/01-thinking-like-a-system-designer/01.01-set-the-scene-launch-day.md`.
  - Quiz: `courses/build-with-ai/04-daily-labs/04.06-quiz.md`. Gate: `courses/build-with-ai/04-daily-labs/04.07-checklist.md`. Build chapter with an open question and a rubric: `courses/build-with-ai/06-share-the-work/06.05-capstone-your-project-start.md`.
- **Canvas models:** `packages/learning-ui/src/canvas/product-m2-spacing-groups/data.ts` (ladder), `packages/learning-ui/src/canvas/product-m5-spot-the-slop/data.ts` (spot), `packages/learning-ui/src/canvas/sysdesign-m1-requirement-sorter/data.ts` and its `spec.md` (sorter and the spec format). Types: `packages/learning-ui/src/canvas/models/ui-specimen.ts` (screens and blocks) and `packages/learning-ui/src/canvas/primitives/specimen-beats.tsx` (the four beat configs). Factories: `packages/learning-ui/src/canvas/primitives/canvas-factories.tsx`.
- Skim `agent-ip/03-authoring-standards.md` ("Visual-first Learn chapters", plain English, forbidden patterns) and `agent-ip/04-interactive-playbook.md` ("Option-length hygiene", quiz and predict rules).

## 1. What this course is

Product sense for engineers. Anyone can now build an app in a weekend with AI tools, and most of those apps look the same and solve no clear problem. The course teaches: start from the problem and the job; shape what a person sees first; design the moments when things go wrong; judge quality with reasons; remove the generic AI-made look; use AI design tools as opinions you check; and present work so a busy person sees its value fast.

- Open every chapter with a concrete case from the learner's world, never a definition. **Why before what:** show the problem that makes the rule necessary, then the rule, then the details.
- **Show, do not tell.** This is a UI course: every Learn beat that can show a screen shows a screen (a specimen canvas), not a paragraph about a screen.
- **Taste is criteria and evidence, never "the course says so".** Say what a design is trying to do, whether it does it, and where you see it.
- **Default versus choice** (dossier B, finding 1): never call gradients, Inter, cards or icons wrong in themselves. The question is always "did you choose it, and why, for this product?"
- Calm and respectful. No mockery of any real company, person or tool. Wrong answers are welcome; every option is explained kindly.

## 2. Learner and voice

- Dev Weekends fellows in Gaza, early-career engineers aiming at remote work. Arabic first, English second. Most read on phones with weak, costly data and power cuts.
- Plain English. Short sentences (aim under 20 words, never over 30). Common words. No idioms or figures of speech; say the literal thing. Define every new term on first use with `GlossaryTerm` (props `term`, `definition`), never twice in the course: refer back instead ("the squint test from 2.2").
- Settings from their world: a university library room, a print and copy shop, a café with internet, a freelance client, a small online shop, a clinic desk, a sports club, a coding bootcamp. Arabic names of every gender. Dollars for freelance pay, shekels for local prices.
- Hardship only as ordinary background (weak data, a power cut), never for drama. No politics or war as case material. Never ask a learner to share personal hardship.

### Cast (keep every fact consistent; grep the course before adding a name)

| Person | Modules | Canon |
|---|---|---|
| **Maryam** | 1, 2, 3, 4 (brief), 6, 7 | The running example. A fellow who studies software on her own and freelances a little. Her app is **Halaqa** (Arabic for "study circle"): university students find or start a small study group for a course, with a time, a place (a library room, online or a café) and seats left. She built version 1 in two weekends with an AI coding tool. It has **14 features** (group search, create group, chat, file sharing, polls, voice rooms, streaks, badges, a leaderboard, profile themes, dark mode, calendar sync, notifications, an AI summary of notes) and **3 weekly users** (herself and two friends). In module 1 she finds the job: "When an exam is a few days away and I am stuck on a topic, I want to find two or three classmates to revise with tonight or tomorrow, so that I do not study alone." Her appetite: **12 hours over two weeks**. Her goal: a student joins a study group for an upcoming exam. Her signal: in a check with 5 classmates, how many join a group in their first visit, and how long it takes (her first check: 2 of 5; after the redesign: 4 of 5, in about 2 minutes). |
| **Nadia** | 2 | A team lead at a small remote company (fictional) who reviews ten fellows' project links one morning before a call. |
| **Bashar** | 3 | Maryam's classmate. Opens Halaqa on weak data in the library and sees a blank screen. |
| **Huda and Saeed** | 4 | Two fellows who disagree about a screen: Huda says "it looks fine", Saeed says "it looks cheap", and neither can say why. |
| **Sami and Karam** | 5, 7 (capstone) | Sami owns **Wasel**, a print and copy shop near the university gate. His nephew Karam built Wasel's order app in one evening with an AI tool. See section 8 for Wasel's canon. |
| **Dalia** | 7 | A product manager at a remote startup (fictional) who opens Maryam's first case study, hits a login wall, and finds a demo video that says nothing with the sound off. |

Other people in quizzes and examples come from your own name pool (section 10). A name belongs to the earliest module that uses it. Products in examples are fictional unless named in section 3A.

## 3. Hard rules (any violation fails review)

- **No em dashes or en dashes anywhere** (U+2014, U+2013): prose, options, explanations, canvas data, specs. Use a colon, a comma or two sentences. Ranges: "60 to 90 seconds".
- **No links** in chapters, and no `MustRead`, `InterestingRead` or `RealWorldEvent` blocks. Name a source or a tool; do not link it.
- **No AI or tool attribution** for the course text itself.
- **No slop in our own words:** no "In today's world", "It is important to note", "delve", "landscape", "game-changer", "Let's dive in", "key takeaways", "unlock", "journey", "supercharge", "harness", "seamless", "elevate", "revolutionize", "powerful" (except when quoting a bad example in a canvas or a quiz). No unsupported superlatives.
- **No invented statistics about the real world.** Numbers belong to the case ("in Maryam's check"). Research findings only as the dossier states them. **Never** the attention myths: "6 seconds", "goldfish", "85% watched muted", "the first 3 seconds" (dossier B, D6).
- **Check every sum, every contrast ratio and every case twice.** Contrast ratios come from the WCAG formula (`contrastRatio()` in `models/ui-specimen.ts`), never from memory.
- **Standards with levels:** WCAG 2.2 AA is the course's bar; say "AAA" whenever a rule is AAA. Touch targets: "aim for about 44 to 48; the AA floor is 24, and only with spacing" [A4, A16, A38, A39]. "Large text" means at least 18 point, or 14 point bold [A1].
- **Evidence labels:** in each fold, say what kind of rule it is: a standard, research, a heuristic (rule of thumb) or practice (dossier A).

### 3A. Naming tools and real things (course 13's sponsor decision)

- **You may name:** Claude, Claude Code, claude.ai skills and artifacts, ChatGPT, OpenAI Codex, Gemini, Gemini Canvas, Google Antigravity, Google Stitch, v0 (by Vercel), Figma (Starter, Figma Make), GitHub, GitHub Pages, Vercel, Netlify, Cloudflare Pages, LinkedIn, OBS Studio, ScreenToGif, HandBrake, the built-in screen recorders on Android, iPhone and Windows, Tailwind CSS, Bootstrap, shadcn/ui, Material Design, Apple's Human Interface Guidelines, WCAG, GOV.UK and its Design System, Nielsen Norman Group (NN/g) as a source, Shape Up (a free book from Basecamp). Name no other product.
- **Real people** appear only in "Sources" folds as authors (Nielsen, Christensen, Ryan Singer, Luke Wroblewski, Kate Kaplan and others in the dossier). Ira Glass's "taste gap" only as a paraphrase, credited, in a fold.
- **Real products as examples:** GOV.UK is the one real product described (its Design System's reasons for labels, hints and errors [A74], and its design principles [A75], checked 2026-10-25). Every other example is fictional. Learners study real products of their own choosing in module 4.
- **Tools as examples of a job, two per job, never a ranking:** write "at the time of writing (checked 2026-10-25)" once per chapter where a tool fact appears. Never promise a feature, a limit, a price or a country.
- **Tool facts you may state** (dossier B, C1 and C2; all checked 2026-10-25):
  - Claude Code needs a paid or Console account; the free Claude plan does not include it; it runs on a laptop. Its `frontend-design` skill is one example of a design skill [B4, B29].
  - A skill is a folder with one `SKILL.md` file of instructions; Claude Code, Codex and Antigravity all use this layout [B28, B33, B40]. Skills also work on the free claude.ai plan by uploading the folder [B30]. Claude is 18 or over.
  - OpenAI Codex is listed on ChatGPT's Free and Go plans (limits not stated) [B34]. ChatGPT is 13 or over, with a guardian's permission under 18.
  - Antigravity says it is available at no charge with weekly limits; it runs on desktop systems; ages and countries are not stated [B38, B39].
  - Stitch (a Google Labs design canvas) and v0 (Vercel; builds Next.js, Tailwind and shadcn/ui apps) turn prompts into screens; Figma Starter includes Figma Make "with limitations" and Figma AI is 18 or over [B42, B46, B47, B50, B51]. **None of these four has a confirmed Palestine entry:** write "check whether it opens for you", never "it works in Gaza".
  - Fallbacks that list Palestine: Claude artifacts and Gemini Canvas on the web (Gemini 13 or over) [B31, B44]; and always a paper or plain-text path.
  - Vercel's free Hobby plan is for personal, non-commercial use; paid client work counts as commercial [B49]. GitHub Pages needs a public repository on a free plan, serves static sites and is not for running a business [B78, B79].
  - LinkedIn plays some feed videos muted; Featured can hold posts, links and uploaded media [B66, B69]. Wording of LinkedIn and resume text belongs to course 16: link to it in one sentence, do not teach it.
- **Privacy, one sentence where it matters:** never paste a client's or employer's screens or data into an AI tool, or show them publicly, without permission (course 13 teaches the full habit; refer to it).

## 4. Chapter formats and budgets

Path: `courses/product-sense/<module-dir>/<file>` exactly as in course.yaml. Frontmatter:

```yaml
---
title: "<exact title from course.yaml>"
module: <n>
lesson: <n>
stepType: Read | Learn | Build | Check | Gate
format: beats            # Read and Learn chapters only
summary: "<one or two plain sentences>"
estimatedMinutes: <minutes from the roadmap>
---
```

`NN.01-set-the-scene.md` is Read; the chapters with a canvas in the roadmap are Learn; `*-practice-*.md` and the capstone are Build; `*-quiz.md` are Check; `*-checklist.md` are Gate.

### Learn chapters (beats, agent-ip v0.5)

Measured by `agent-ip/scripts/audit-course.mjs`:

- One or two sentences of situation, then **four to six beats**. A beat is a `## heading` of **eight words or fewer** that states what the picture shows, then **a visual first** (`<InteractiveCanvas slug="..." />` or `<MermaidDiagram title="..." chart={`...`} legend="..." />` on its own line), then **at most 70 words** in two to four short sentences that say what the learner just saw, then an optional `<GoDeeper title="Go deeper: ...">` fold with the mechanism, trade-offs, failure modes, a worked example and edge cases.
- **Visible words 300 to 700; visible plus folds at least 900.** Write long by explaining in folds, not by padding.
- **At least one playable canvas** (the roadmap's canvas). You may add one or two more specimen or sorter canvases where something changes or can be compared; use `MermaidDiagram` for fixed relationships (a flow, a loop, a decision). A beat's text must never explain something its picture does not show.
- **Teaching contract:** one `predict` fence right before the beat that shows the key surprise; then, as the last section, `## Quick check` with **one or two** quiz MCQs on a new case that transfers the claim. At most 3 assessments in all. Then the `GoDeeper title="Sources"` fold.
- At most 40 JSX tags. **No `BigWordAlert`, no `Callout` overload** (at most one), `GlossaryTerm` for new words.
- Mermaid in `MermaidDiagram` on phones: `flowchart TD` (or `LR` for three nodes or fewer), at most 7 nodes, short node text, quote labels with punctuation, no dashes.
- **Never ask before you teach:** a predict or quiz must be answerable from earlier chapters, everyday intuition or what the picture shows.

### Read chapters (set the scene, beats)

`format: beats`, **one or two beats**. A short story told in plain words (the module's case), the first beat opening with a visual (a specimen canvas of the scene, slug `product-m<N>-scene`, a compare of two or three versions; or a `MermaidDiagram`). Folds hold the rest of the story, why it matters for a fellow's career, and a table `| Chapter | You will practise |` of what the module covers. One predict or one short open question in everyday words only (`prompt`, `required`, `minWords` 20 to 30, `allowSpeechInput`, `modelAnswer`), never about a mechanism the module has not taught. End with a `**Next:**` line.

### Practice chapters (Build, prose rules)

Counted over **paragraphs only**: at least **1,200 prose words**; at most 6 top-level components and 25 JSX tags; one diagram (a ```mermaid fence of the steps or of how this output feeds the capstone); at most one canvas (optional). Layout:

1. What you make, and why it matters (the job of this output in the capstone).
2. The steps, as short numbered steps with a sentence of reasoning after each in a paragraph.
3. **A worked example on Maryam's Halaqa**, told in prose, with the reasoning, including one choice she got wrong first and fixed.
4. **The provided Wasel case** (section 8) for anyone without a project, with the facts written in full so it can be done on a phone.
5. A rubric table: three to five criteria, each with **Met / Partly / Not yet** and an observable threshold; a bold **Pass rule:** no part Not yet and at most one Partly.
6. `## How your mentor will read it` in prose: what they look for first, the common weak answer, and the one follow-up question they usually ask.
7. One `openquestion` (below), then a `**Next:**` line.

### Quiz chapters (Check)

Activities only: exactly **five** quiz MCQs and nothing else after the frontmatter. At least two items give a small table or three to four stated facts and ask which conclusion or next step the facts support; each wrong option fails because of a different stated fact. At least one item shows a short AI critique or AI-made copy in single quotes and asks for the mistake in it or the right next check.

### Gates

As in `04.07-checklist.md` of course 13: intro sentence; `## Module N checklist` (five or six honest items, including "I answered the questions in chapters N.2 to N.X, finished the practice in N.Y and the quiz in N.Z"); `## Learning log` (four numbered questions about how they think); a short section on what changed (the gate asks how the learner now thinks; the work itself was in the practice chapter); `## How your mentor will read it`; one openquestion with a rubric and pass rule (no part Not yet, at most one Partly); `<ChapterRecap points={[...]} />` (four or five points for the module); `## All boxes ticked?`; `**Next:**`. **At least 700 prose words** in paragraphs. No `GlossaryTerm`, `Callout`, diagram, canvas, predict or quiz in a gate.

## 5. Assessments

MCQ fence:
````
```quiz
type: mcq
question: "<a case that needs reasoning, not recall>"
options:
  - "<option>"
  - "<option>"
  - "<option>"
  - "<option>"
correct: <0-based index>
explanations:
  - "<why right or wrong, standalone>"
  - "..."
  - "..."
  - "..."
```
````
- Four options; one explanation per option in order; the right one starts with "Right."; wrong ones say kindly what was missed.
- **Length and position (courses 12 and 14 gave answers away by length):** the correct option is never more than 10% longer than the longest wrong option; across a quiz chapter it is the strict longest in **at most one** of five and the strict shortest in at least one; same level of detail in every option. Use each position 0 to 3 at least once per quiz chapter; never the same position more than twice in a row in your module.
- No "all of the above", no joke options, no "Which is NOT". **Opinion goes to open questions:** a key must follow from a rule taught here, a standard, the dossier or arithmetic. "Remarkable" is never a graded key.
- Blind re-answer each MCQ yourself after writing it. An independent blind review follows (`agent-ip/scripts/blind-keys.mjs`, a second model family).
- Double-quote YAML strings; single quotes inside; quote strings with colons.

Predict fence: exactly two options with `id` and `label`, `prompt`, `correctOptionId`, `explanation`, `allowRetry: true`; the correct label never longer than the other; correct first in about half of your predicts; in at least a third of them the intuitive answer is right.

Open question fence (practice, gates, capstone):
````
```openquestion
prompt: "<what to write, with the parts to include>"
required: true
minWords: <honest minimum>
allowSpeechInput: true
allowUrl: true
urlRequired: false
urlLabel: "Link (optional)"
urlHint: "<what link fits: a screenshot folder, a repository, a case study page>"
modelAnswer: "Mentor key for Wasel: <what must be present, what is acceptable, the common wrong answer>. Model answer for a different case: <a short strong answer about a fictional person>."
```
````

## 6. Canvases on the specimen kit

Every Learn chapter has the roadmap's playable canvas; you build it (and any extra canvas) as **data plus a spec, no new component code**:

- Create `packages/learning-ui/src/canvas/<slug>/data.ts` exporting `export const <camelCaseSlug>: CustomCanvasSpec = { kind: "custom", title, purpose, limits, component: make...Canvas({...}) }`, with a header comment naming the course and chapter. Import types with `import type`, and only the factory from `../primitives/canvas-factories`.
- Create `packages/learning-ui/src/canvas/<slug>/spec.md` in the format of `sysdesign-m1-requirement-sorter/spec.md`: course and chapter, renderer and reason, claim, model, cards or versions, inputs, what changes, what the learner should notice, accessibility, limits, sources.
- **Factories:** `makeSpecimenCompareCanvas` (two to four versions of one screen; two versions show as a switch, three or four as pills), `makeSpecimenLadderCanvas` (three to six versions along a rail the learner drags), `makeSpecimenSpotCanvas` (tap the parts with a problem; optional fixed version after), `makeSpecimenSkimCanvas` (see a page for N seconds, then answer), `makeSorterCanvas` (cards into two to four buckets, with a reason for every wrong bucket).
- **Screens** (`SpecScreen` in `models/ui-specimen.ts`): `alt` (one sentence for screen readers), `frame` (`phone` default, `browser`, `none`), `width` (default 300), `gap`, `background` (`card`, `muted`, `ink`, `glow` for the generic look only, `paper` for literal colours), and `blocks`. Block kinds: `text`, `button`, `field`, `image` (art: photo, chart, list, map, receipt, blank), `box` (children, fill, border, shadow), `row` (children side by side), `icon` (glyph, optional tinted `tile`), `pill`, `pills`, `divider`, `space`, `spinner`, `skeleton`, `nav`, `stat`, `progress`. Any block may have an `id` (needed for spot targets) and a `motion` (`bounce`, `pulse`, `spin`, `ping`; off under reduced motion). A compare version may set `blur: true` (the squint test). Text may set a literal `color` only on a `paper` screen, for contrast lessons; compute every ratio with `contrastRatio()` and put the number in the verdict.
- **Phone limits:** verdict text at most 30 characters; compare button labels at most 10 characters (four pills must fit a 375px row); ladder `ends` at most 8 characters each and `caption` at most 22; spot target labels at most 22; a screen at most about 520 units tall; text size at least 11; at most about 12 blocks on a screen. Short real content beats long filler.
- **Tones:** `good`, `warn`, `bad` only when they mean that; `accent` for neutral states.
- **Sorter:** two to four buckets (label at most 15 characters, a short `sub`), six to nine cards (text about 60 characters or fewer), and a reason for every wrong bucket.
- Tool names in canvases only as the chapter uses them. Names, numbers and facts in canvases match the chapter exactly. No dashes, no idioms.
- **Do not edit** `registry.ts`, any `slugs.ts` or `packages/learning-ui/package.json`. The orchestrator registers every slug, runs the canvas tests and the phone label check, and sends failures back.

### Planned canvases (the playable one per Learn chapter)

| Ch | Slug | Factory | Teaching claim |
|---|---|---|---|
| 1.2 | `product-m1-problem-or-feature` | sorter | A request names a feature; underneath is a problem you can check. Buckets such as Problem, Feature, Guess. Cards from Halaqa requests ("add voice rooms", "nobody finds a group before the exam"). |
| 1.3 | `product-m1-two-jobs` | compare | The same app changes shape for a different job: Halaqa's home for "find a group tonight before an exam" (tonight's groups, seats left, one Join button) against "keep a weekly study habit" (a calendar and streaks). |
| 1.4 | `product-m1-scope-hammer` | sorter | Fixed time, variable scope: Maryam's 14 features into Must have, Nice to have, Not now for a 12-hour appetite, with scope-hammering reasons [A76]. |
| 1.5 | `product-m1-signal-or-count` | sorter | A signal you can watch someone do beats a count that grows anyway: "4 of 5 classmates joined a group in their first visit" against "1,000 page views" [A30]. |
| 2.2 | `product-m2-squint-test` | compare (4: as built, squinted, fixed, squinted) | With everything bold and the same size, nothing comes first; squinting shows it. One clear first thing survives the blur [A69]. |
| 2.3 | `product-m2-type-ladder` | ladder | Body text from 11 to 20 on a phone: too small strains, about 16 with line height 1.5 reads, very large pushes content off the screen [A32, A36, A50]. |
| 2.4 | `product-m2-spacing-groups` | ladder | Built. Space inside a group smaller than space between groups. |
| 2.5 | `product-m2-contrast-ladder` | ladder (paper, literal colours) | Grey body text from #999999 (2.85:1, fails) through #777777 (4.48:1, fails by a hair) and #767676 (4.54:1, passes AA) to #595959 and #000000; compute each [A1, A87]. |
| 3.2 | `product-m3-four-states` | compare (Empty, Loading, Error, Full) | Every screen has four states; a blank or a bare spinner tells the person nothing [A21, A22, A23]. |
| 3.3 | `product-m3-form-spot` | spot with after | Halaqa's create-group form: placeholder-only labels, an error shown only by a red border, "Invalid input", a tiny button; then the fixed form [A25, A74, A23, A26]. |
| 3.4 | `product-m3-tap-targets` | ladder | Target size from 16 to 48: below the AA floor of 24, the AA floor with spacing, the comfortable 44 to 48 [A4, A16, A38, A39]. |
| 3.5 | `product-m3-motion-with-a-job` | compare (3: Everything moves, Shows a change, Reduced motion) | Decorative bounce and pulse distract; one motion that shows a change helps; under reduced motion the change is said in words [A43, A6, A18]. |
| 3.6 | `product-m3-first-run` | compare (3: Tour first, Empty and stuck, Value first) | A four-step tour before any value, a blank first screen, and a first screen with tonight's groups and one Join button [A62, A22]. |
| 4.2 | `product-m4-four-levels` | sorter (4 buckets) | The course's scale with checkable criteria per level (dossier A, 4.3). "Remarkable" cards name a choice and its reason. |
| 4.3 | `product-m4-default-or-choice` | compare | A screen left on framework defaults against the same screen with three named choices (type, one colour with a job, real content) [A49, B3]. |
| 4.4 | `product-m4-critique-or-opinion` | sorter | A critique names what you see, the rule and the evidence; "I like it" and "make it pop" are opinions [A31]. |
| 4.5 | `product-m4-rule-or-myth` | sorter (Supported, Misread, Unsupported) | Popular rules checked against evidence: 3 clicks, seven items in a menu, golden ratio, blue means trust, thumb maps, F-pattern as a goal, five users find everything [A20, A53 to A59, A68]. |
| 5.2 | `product-m5-spot-the-slop` | spot | Built. |
| 5.3 | `product-m5-hundred-products` | sorter (Anyone could say it, Only this product) | Cut sentences a hundred products could say; keep specific ones: a price, a time, a thing a user did [B5, B3]. |
| 5.4 | `product-m5-point-of-view` | compare (3: Card grid, Real content, One bold choice) | Real content as the visual and one bold choice make a page memorable; boldness spent everywhere is noise [B3, B5]. |
| 6.2 | `product-m6-vague-or-briefed` | compare (3: Vague prompt, Brief and checklist, Plus real content) | A vague prompt gets the most common answer; a specific brief and a skill checklist, then real content, move the result away from the default [B5, B8]. |
| 6.3 | `product-m6-check-the-critique` | sorter (Check a rule, Ask a person, Not useful) | Each AI critique point becomes a check against a rule, a question for a person, or nothing [B19, B53 to B56]. |
| 7.2 | `product-m7-demo-storyboard` | compare (2 or 3) | A demo as a tour (login, settings, every menu) against one story (the result first, one user, one job), shown as a storyboard with timestamps and on-screen captions [B63, B64, B66]. |
| 7.3 | `product-m7-skim-before` and `product-m7-skim-after` | skim, 10 seconds each | A case study that hides the result below a long intro fails a 10-second skim; a page with the result and the job at the top passes [B58, B59, B60]. |
| 7.4 | `product-m7-one-click-access` | compare (3: Login wall, Guest access, Video fallback) | A reviewer stops at a login wall; a guest button or demo mode opens the core; a short video and screenshots cover a demo that is down [B83]. |

Read chapters may add `product-m<N>-scene` (a compare of the scene's screen). Any extra canvas you add takes the prefix `product-m<N>-`.

## 7. Module notes

**Module 1, Think product first.** 1.1 Maryam's Halaqa: 14 features, 3 weekly users; she asks "what would you cut first?" 1.2 a request is a feature; ask "what problem would this solve, for whom, when?"; check the problem by asking about the last time it happened, not "would you use it?" (course practice; no source claims more); Shape Up's "What's really going wrong?" [A27]. 1.3 the job: progress a person wants in a situation [A29]; the course template "When I ..., I want to ..., so that ..." (label it the course's template); a job is not a persona or a feature list; the milkshake example only as the dossier states it. 1.4 appetite before design, fixed time and variable scope, scope hammering questions, nice-to-haves marked and usually not built, compare to what the person has now [A27, A76]; saying no with a reason: the item, who it affects, what happens without it, what we do instead (course template). 1.5 one goal, one signal you can watch someone do, counted in a 3 to 5 person check; ratios over raw counts; failure signals such as giving up; HEART named only as the source the habit is adapted from [A30]; five users find most big problems of one group per round, then fix and test again; it finds problems and does not prove a design is good [A20]. 1.6 practice: the one-page brief (job, who, the situation, appetite, cut list with reasons, goal and signal, the first 3 to 5 person check planned). 1.7 quiz. 1.8 gate.

**Module 2, See it first.** 2.1 Nadia skims ten links; nothing stands out. 2.2 hierarchy from size, weight, contrast, position and grouping; no more than three sizes; the most important thing largest; the squint test [A69]; F-pattern is a failure, not a goal [A68]; minimalist means relevant only [A67]. 2.3 body 16 px or more on the web as a start, line height about 1.5, comfortable line length (Butterick 45 to 90 characters, as practice), few sizes; let users scale text to 200% [A15, A32 to A36, A50]; Arabic: check with a native reader on a real phone (course rule, no source). 2.4 proximity: less space inside a group than between groups; one spacing step and its multiples; the 8-point grid is Material's convention, not universal [A40, A90, A64]. 2.5 colour with a job (one accent for the main action, semantic colours with a word); WCAG 1.4.3, 1.4.11, 1.4.1; the formula; ratios computed; contrast passing does not make a design good; check light and dark [A1 to A3, A17, A38, A65]. 2.6 practice: fix one screen (hierarchy, type, space, contrast), before and after, a numbered reason for every change. 2.7 quiz. 2.8 gate.

**Module 3, Kind to use.** 3.1 Bashar's blank screen in the library. 3.2 four states (the course's frame): empty with a learning cue and a way to start; loading by time (nothing under 1 s, show activity for 2 to 10 s, say how long over 10 s; skeletons only change how the wait feels); error near the cause, plain, specific, with a next step, keeping the person's input; never "No results" while loading [A21 to A24]. 3.3 forms: visible labels above fields, no placeholder as label, hints, errors in words next to the field, check when the person leaves the field and clear the error as soon as it is fixed, one column, fewer fields [A25, A26, A63, A64, A74, A7, A8]; WCAG does not mention placeholders (say so plainly). 3.4 access: keyboard, visible focus, text alternatives (empty alt for decoration), never colour alone, targets 44 to 48 (AA floor 24 with spacing), start from the small screen then check the large one; thumb-zone maps are weak evidence; right to left: direction in HTML and start/end in CSS [A4, A5, A10, A11, A16, A38 to A39, A59 to A61, A78, A79]. 3.5 motion shows change, never decorates; `prefers-reduced-motion`; WCAG 2.2.2 (A) and 2.3.3 (AAA); short transitions [A6, A18, A42, A43]. 3.6 the first run: show the valuable thing as soon as possible; teach inside the screen, not in a tour; "aha moment" is a goal a team picks, not a finding [A22, A62, A73]. 3.7 practice: the unhappy paths of one flow (empty, loading, error, form errors, first run). 3.8 quiz. 3.9 gate.

**Module 4, Taste.** 4.1 Huda and Saeed disagree. 4.2 the four-level scale with criteria (dossier A, 4.3): average works on the happy path with defaults unchanged; good passes the standards (contrast, labels, focus, targets, states); best adds clear hierarchy by the squint test, only relevant content, consistent spacing, recoverable errors, a 3 to 5 person check with fixes made; remarkable is all of that plus a choice that fits the job, with a reason a reader can name. Taste grows by making many small things and critiquing them (Glass paraphrase, critique against objectives) [A31, A72]; attractive designs can hide problems in testing [A58]. 4.3 defaults are good starts for everyone, which is why unchanged defaults look like everyone else; change something on purpose and know why; do not blame frameworks [A49 to A52, B3, B10]. 4.4 collect screens of one task in three products, compare on the same task and the same rules, write: what I see, the rule it follows or breaks, what the maker says (GOV.UK as the example of a maker that writes its reasons) [A31, A66, A74, A75]; date every observation; never guess a company's reasons. 4.5 the myth table (dossier A, "What not to teach"): judging evidence is part of taste. 4.6 practice: critique log of three products. 4.7 quiz. 4.8 gate.

**Module 5, Make the AI slop go away.** 5.1 Sami and Karam; Wasel's page could sell anything. Define "slop" with Merriam-Webster's 2025 word of the year definition [B15]. 5.2 the generic look as defaults nobody chose: glows and gradients, uniform cards, pill clusters, ornamental icons, template chrome (eyebrow labels, arrows, numbered markers), fade-ins on every section, as listed in two AI companies' own guidance [B1, B3, B5, B6]; why tools converge (common training pages, vague prompts, the same component kits) with the AIES study's limit stated [B8, B9, B10]; "a default is a choice you did not make". 5.3 copy: no banned word list (it dates fast [B21, B24]); cut any sentence a hundred products could say; replace it with a price, a time, a thing a user did, a thing you gave up; button labels say what happens ("Upload a file", not "Get started") [B3, B5]; never teach detecting AI text by words [B21]. 5.4 replace with real content as the visual, an editorial layout (a clear reading order, type doing the work, few boxes), and one bold choice ("spend your boldness in one place" [B3]); the quality floor still applies (contrast, focus, reduced motion). 5.5 practice: de-slop one page, screen and words, a reason for every element kept. 5.6 quiz. 5.7 gate.

**Module 6, AI design tools under your judgment.** 6.1 Maryam asks three AIs to critique Halaqa's create-group screen; they disagree. 6.2 design skills and agents: a skill is a written checklist the agent follows (`SKILL.md`); two tools per job with the facts in 3A; the brief that moves output away from the default (audience, real content, type, one colour with a job, section count, one primary action, references) [B2, B5, B8]; tools still make weak hierarchy and spacing, and their stated design reasons were missing from the screen about a quarter of the time in one study, so check in the browser [B8, B9]; course 13's privacy habit in one sentence. 6.3 AI as a critic: NN/g's warning [B19]; judges favour the first answer and their own output; a panel from different families did better in one study [B53 to B56]; the method (same screenshot, same rubric, three tools, swap order, ask for questions and evidence, check each point against a rule or a person, decide and say why), labelled the course's inference. 6.4 practice: a three-opinion critique of one screen with decisions. 6.5 quiz. 6.6 gate.

**Module 7, Present the work, and capstone.** 7.1 Dalia: a login wall and a demo that says nothing with the sound off. 7.2 a demo is one story: one person, one job, the result early; works muted (on-screen words, large UI, captions); short; recording paths (phone recorders, Windows Snipping Tool, OBS Studio), checking file size before upload, the arithmetic in dossier B, D2 labelled as arithmetic; 60 to 90 seconds and "value in the first 15 seconds" are the course's targets [B58, B63 to B66, B70 to B75]. 7.3 the case study page: result first, then the problem and job, your role, the choices and what you gave up, before and after with what changed and how you know; reviewers are often not designers; most viewing time is at the top; the 10-second skim is the course's target; words and numbers belong to course 16 (one sentence) [B58 to B62]. 7.4 one-click access: guest login or demo mode, a fallback chain (video, screenshots, README), where people look (a site, LinkedIn Featured, the first lines of a resume, as course 16 writes them), hosting terms (Vercel Hobby non-commercial, GitHub Pages public), check the link every week [B49, B66, B69, B78, B79, B83]. 7.5 mixed review: five MCQs, one fresh case from each of modules 1, 2 or 3, 4, 5, 6 and 7 (choose five). 7.6 capstone (section 8). 7.7 course gate and defence (section 9).

## 8. Wasel, the provided project (canon)

Wasel is a print and copy shop near the university gate, owned by **Sami**. Open 8 am to 6 pm. Prices: black and white 0.50 shekels a page, colour 2 shekels a page, binding 5 shekels. Orders sent before noon are ready by 4 pm. In exam weeks it gets about 30 to 40 orders a day (the case's own number). Its customers are mostly students printing assignments. The job (course template, 30 words, revision 1): "When an assignment is due tomorrow and I have no printer, I want to send a file by phone and collect it, so that I do not miss the deadline." Sami's nephew **Karam** built the order app in one evening with an AI tool. Its three screens:

1. **Landing page:** a purple glow behind "Revolutionize your printing experience", an "AI-powered" pill, "Seamless, powerful and effortless.", a glowing "Get started" button, three identical cards with tinted icon tiles ("Fast", "Secure", "Smart"), and, at the bottom in small grey text, the prices, the 4 pm promise and the opening hours (as in `product-m5-spot-the-slop`).
2. **Order form:** fields with placeholders only ("File", "Copies", "Colour?", "Pickup time"), no hints, a small "Submit" button, errors shown only as a red border, and one message "Invalid input" at the top.
3. **Order status:** a spinner with no words that never ends on a slow connection, "No orders" shown while orders are still loading, and "Something went wrong" when the upload fails, with the file lost.

Use these facts exactly. Practice chapters each use the part of Wasel their module teaches; the capstone uses all three screens.

## 9. Capstone (7.6) and defence (7.7)

**7.6, Build, 150 minutes, at least 1,200 prose words.** The fellow redesigns their own project or Wasel and hands in four parts, built mostly from their practice outputs: (1) before and after screenshots of at least three screens, each change numbered; (2) a critique log: for each change, what was wrong, the rule or evidence, the change, what was given up, and at least one AI critique point checked and one rejected with a reason; (3) a case study page that passes a 10-second skim by someone who has never seen the project, with one-click access and a fallback; (4) a 60 to 90 second demo that works muted and is captioned, or a storyboard when recording is not possible. Teach it with Maryam's Halaqa as the worked example, include a ```mermaid diagram of how the practice outputs become the four parts, a rubric (four rows, Met / Partly / Not yet), the pass rule, and the openquestion (`minWords: 250`, `allowUrl: true`, `urlRequired: false`) whose `modelAnswer` starts with the mentor key for Wasel. Private submission is accepted; public posting is the fellow's choice.

**7.7, Gate, 45 minutes, at least 700 prose words.** Course checklist across all modules; `## Your product sense toolkit` (one line per habit); the learning log including "look back at your answer in 1.1: what would you cut now?"; then the defence: one `aiinterview` fence and one required written defence `openquestion` that completes the gate for everyone.

````
```aiinterview
title: Defend your redesign
opening: "Pick one change you made in your redesign. What was wrong before, what did you change, and what did you give up?"
focus: [case-study, best-technical]
context: project
maxTurns: 8
whyDepth: 2
required: false
rubric: "<what a strong defence shows: the problem in the person's words, the rule or evidence, the change, the trade-off named, an honest 'I did not test that' over an invented number>"
```
````

Explain before the fence, in plain words: it uses the learner's own OpenRouter key set in Settings, may cost a little credit, sends the text they type to the AI provider (so no client data or private details), and is optional; the written defence below it is always accepted. The written defence asks for three changes, each with its reason and what was given up (`minWords: 150`).

## 10. Name pools (one per module; grep the course before using a name)

- Module 1: **Adel, Rawan, Jad, Sireen, Mazen, Ghadeer**.
- Module 2: **Fares, Yasmin, Laith, Abeer, Qusai, Hiba**.
- Module 3: **Reem, Anwar, Dana, Samir, Lubna, Tariq**.
- Module 4: **Mais, Walid, Rand, Hazem, Nisreen, Omar**.
- Module 5: **Nour, Ehab, Bayan, Ziyad, Razan, Hamza**.
- Module 6: **Alaa, Shadi, Haneen, Osama, Tala, Mohannad**.
- Module 7: **Iyad, Farah, Sufian, Manar, Khalil, Rahaf**.

## 11. Before you hand back

- Every file in your module exists with the exact title, type and the roadmap minutes; every planned canvas has `data.ts` and `spec.md`.
- Zero U+2014 and U+2013 characters in your chapters, canvas data and specs.
- Every sum, ratio and case checked twice; every MCQ blind re-answered; option lengths and key positions checked.
- **Source checks** (the worktree has no installed packages; use the test copy): copy your module folder into the test copy, then run the validators there:
  - `rm -rf "<scratch>/courses/product-sense/<module-dir>" && cp -r "<repo>/courses/product-sense/<module-dir>" "<scratch>/courses/product-sense/"`
  - from `<scratch>/server`: `node node_modules/tsx/dist/cli.mjs scripts/validate-course-source.ts --course product-sense` and `node node_modules/tsx/dist/cli.mjs scripts/audit-course-structure.ts --course product-sense`
  - An "unknown canvas slug" error for your own new slug is expected (the orchestrator registers it). Errors for other modules' missing folders are expected. Fix every other error or warning in your files.
- From `<repo>`: `node agent-ip/scripts/audit-course.mjs courses/product-sense` with no flags on your chapters.
- Edit only your module folder and your canvas folders. No git commands that change anything. Do not install packages.
- Report: files written; for each Learn chapter its beats, visible words and depth from the audit; for each other chapter its prose words; canvases created (slug, export name, factory); and anything in the dossier you could not follow.
