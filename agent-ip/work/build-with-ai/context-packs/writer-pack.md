---
artifact: context-pack
course: build-with-ai
for: chapter-writer
version: 1
---

# Writer pack: Learn and Build with AI: An Enabler, Not a Replacement

Read this whole file before writing. It replaces the chapter briefs for this course (G2C was skipped on the sponsor's instruction; see `../decision-log.md`). Paths are relative to the repository root `<repo>` (the worktree named in your task).

- **The plan** is `courses/build-with-ai/course.yaml`: write exactly the files, titles and goals listed there for your modules.
- **The roadmap** is `../curriculum-roadmap.md` (minutes, outcomes, canvases, gate evidence).
- **The research dossier** is `../research.md`. Every claim about learning science, about AI errors and about a named tool must match the dossier, phrased the way its "Phrase it this way" notes say. Never state a claim it lists as unverified or under "Do not say". Section 3A of this pack is the short version for tools.
- **Format models** (course 10, same platform, same rules): a scene `content/import/cause-and-effect/04-root-causes/04.01-set-the-scene.md`; a Learn chapter with a canvas `04.05-causes-not-culprits.md`; a quiz `04.06-quiz.md`; a gate `04.07-checklist.md`; the capstone `content/import/cause-and-effect/08-learning-from-what-went-wrong/08.04-capstone-investigate-a-problem.md`. Copy their file format, not their content.
- **Canvas models:** sequence `packages/learning-ui/src/canvas/laptop-charging-detective/` and state machine `packages/learning-ui/src/canvas/five-whys-chain/` and factor `packages/learning-ui/src/canvas/weak-strong-fixes/` (each a `data.ts` and a `spec.md`), and the renderer types in `packages/learning-ui/src/canvas/renderers/*/types.ts`.
- Skim `agent-ip/03-authoring-standards.md` (voice, plain English, forbidden patterns) and `agent-ip/04-interactive-playbook.md` (budgets, option-length hygiene, quiz and predict rules).

## 1. What this course is

A practical course on using AI as an **enabler**: not a threat to avoid and not a replacement for the person. AI lacks context, private data, local and recent facts and the obvious things nobody wrote down, so people make the calls. Used well, AI makes searching, learning, visualising and building much faster, yet few people turn that into strong projects. The scarce skill is building a very good project and understanding every part of it.

- Open every chapter with a concrete case or mistake, never a definition.
- Teach the habit, show it working on a full worked example with the reasoning, then show where it goes wrong.
- **Teach habits that survive tool changes.** Tools are examples of a job; the habit is the lesson.
- Calm and balanced: no hype ("AI will change everything"), no fear ("AI will take your job"). Both stories are the module 1 problem.
- Wrong answers are welcome; every option is explained kindly.

## 2. Learner and voice

- Gaza fellowship fellows building careers in tech, mixed backgrounds. Arabic first, English second. Most read on phones with weak, expensive data and power cuts; some have a laptop part of the time.
- Plain English. Short sentences (aim under 20 words, never over 30). Common words. No idioms or figures of speech; say the literal thing. Define every new term on first use (`GlossaryTerm` or the module's `BigWordAlert`), and never define the same term twice in the course: refer back ("the fluency trap you met in 3.2").
- Everyday settings: study, freelance clients, small shops and NGOs, family, a shared solar charging point, a café with internet, a phone with little data left. Arabic names of every gender. Dollars for freelance pay, shekels for local prices.
- Hardship may appear as ordinary background (a power cut ends a lab early; audio downloaded at night when data is cheaper), never as a joke or for drama. Never ask a learner to share personal hardship; every personal prompt offers a provided case.
- No politics or war as case material.

### Cast (keep every fact consistent; grep the course before adding a name)

| Person | Modules | Canon |
|---|---|---|
| **Yara** | 1, 3 (brief), 4, 5, 6 | The running example. A fellow who studies software on her own, about 8 hours a week for her project on top of course time. Old laptop she charges in the evening; phone for audio and reading. Her six-month project is **Qasir** (Arabic for "short"), a link shortener with click counts for small shops and NGOs that share links in group chats. Its 12 areas (module 5): an API, a database, short codes, caching, containers, tests, rate limits, click counts, a simple web page, logs, deploy, safety against harmful links. Her lab repository is `qasir-labs` on GitHub. Lab day 1 runs the app with a database and a cache in containers; lab day 4 stops the cache on purpose (module 4). |
| **Khaled** | 1, 5 | Hands everything to AI. Built an online store in one weekend with an AI coding assistant; in a job interview he could not explain why prices were stored as text. Module 5 opens with that interview. |
| **Rana** | 1 | Refuses AI because she fears it will replace her. Spent three evenings reading a long library manual that an AI tool could have summarised and pointed into in minutes. Not mocked: her worry is reasonable, her conclusion is the problem. |
| **Ahmad** | 2 | Kept a month of study in one free chat tool's history and nowhere else; when the free plan changed and his account became hard to reach, he had no copy. (Fictional; never say a real tool deleted anyone's history.) |
| **Mahmoud** | 2 | Freelance web developer. Pasted a client's customer list (names and phone numbers) into a chat tool to clean it, without asking the client. |
| **Lina** | 3 | Studies computer networks for an exam. Understood every AI explanation of subnetting and still failed the practice test. Learns with audio overviews of her lecture notes. |
| **Fadi** | 4 | Watched about 30 hours of system design videos in a month and could not explain what a cache is for. |
| **Salma** | 6 | Kept a careful GitHub lab log for two months that nobody saw. |
| **Hani** | 6 | Posted an article that an AI wrote almost entirely, with a fact about his own project that was wrong. |
| **Ibrahim** | 6 (capstone provided case) | Wants to build a small queue app for a community clinic. |

Other people in quizzes and examples come from your own name pool (section 9). A name belongs to the earliest module that uses it.

## 3. Hard rules (any violation fails review)

- **No em dashes or en dashes anywhere** (U+2014, U+2013): prose, options, explanations, canvas data, specs. Use a colon, a comma or two sentences. Ranges: "30 to 45 minutes".
- **No links** in chapters, and no `MustRead`, `InterestingRead` or `RealWorldEvent` blocks (same as courses 8 to 10). Name a tool or a source; do not link it.
- **No AI or tool attribution** for the course text itself. (Teaching learners to disclose their own AI use is different and required in module 6.)
- **No slop:** no "In today's world", "It is important to note", "delve", "landscape", "game-changer", "Let's dive in", "key takeaways", "unlock", "journey", "supercharge", "harness the power". No unsupported superlatives ("the best tool"): say "one good option".
- **No invented statistics about the real world.** Numbers belong to the case ("in this example", "Yara's plan says"). Research findings only as the dossier states them.
- **Check every sum and every case twice.** A case must support the conclusion the chapter draws.
- **No hype and no fear.** Never "AI will replace developers" and never "AI is useless". Never claim a study shows more than the dossier says.

### 3A. Naming tools (sponsor decision; read before you name any product)

- You **may** name: Gemini Notebook (always as "Gemini Notebook, called NotebookLM until July 2026" at its first mention in a chapter), Gemini, ChatGPT, Claude, Microsoft Copilot, Perplexity, GitHub, GitHub Codespaces, Microsoft OneNote, Obsidian, Joplin, Docker, LinkedIn, DEV, Hashnode, Medium. Name nothing else.
- **Name tools as examples of a job**, never as the answer: "a chat assistant such as Gemini, ChatGPT or Claude"; "a source notebook such as Gemini Notebook". Always list more than one where more than one exists. No ranking, no "the best".
- **Never promise a feature, a limit, a price, a length or a country.** Write "at the time of writing" once per chapter where a feature is described, and teach the learner to check the tool's own help page. Example: "At the time of writing (checked 2026-10-24), Gemini Notebook can turn your sources into an audio overview, a spoken discussion of them. Check its help page for what it can do today." **Never give a length in minutes for an audio overview** (no source supports the sponsor's "40 to 60 minutes"; the longest option may be English only). Say "short or long; check what your tool offers today".
- **Always give a fallback** for when a tool is unavailable, blocked, out of free use or changed: another tool of the same kind, or the habit done by hand.
- **Free access and Gaza:** follow section 3B (from the dossier). Never say a tool "works in Gaza" or "is banned in Gaza" beyond what the dossier states with its date.

### 3B. Tool facts from the dossier

From `../research.md` (all checked 2026-10-24; source ids in brackets). Write the access date as "(checked 2026-10-24)" or "at the time of writing" and never state these as permanent.

- **Renamed and re-limited during research:** NotebookLM became Gemini Notebook on 16 July 2026 [S1]; its limits became compute-based, refreshing every five hours, on 2 September 2026 [S6]; Gemini app limits also refresh every five hours up to a weekly limit [S14]; Play with Docker shut down on 1 March 2026 [S57]. Use these as the course's proof that tools change. Never state a number of sources, minutes, messages or hours as something the learner can rely on.
- **Availability (web):** Gemini Notebook, the Gemini web app, ChatGPT and Claude list "Palestine" by name on their supported-places pages [S2, S12, S18, S25]. **Apps are the weak point:** the Gemini Notebook mobile app does not list Palestine [S8]; the Gemini Android app download list does not either [S17]. Microsoft Copilot and Perplexity: unclear [S31, U9]. GitHub's trade controls page does not restrict Palestine [S35]. Teach: "open the web version in your phone's browser; if a tool does not open, use the fallback". Never write "download the app" without the browser path.
- **Ages:** Claude 18 or over [S26]; ChatGPT 13 or over with a guardian's permission under 18 [S22]; Gemini 13 or over [S13]; GitHub 13 or over [S42]; LinkedIn 16 or over [S61]. Always give two tools per job so an under-18 fellow has one.
- **Gemini Notebook:** answers from the sources you add; audio overviews in several formats, short or long, can be focused with a prompt; output in many languages including Arabic; the longest length and the interactive (talk back) mode are English only [S3, S10]; Google says audio overviews "may contain inaccuracies" [S3]; it also makes study guides, flashcards, quizzes and mind maps [S11]. Download for offline listening is in the app, which is not listed for Palestine; on the web there is a download option [S3, S8]. Say: "check the size before you download" (never state a size).
- **Chat assistants (Gemini, ChatGPT, Claude, Copilot):** all have free use [S14, S20, S29, S31]. Tutoring modes at the time of writing: Gemini Guided Learning [S16], ChatGPT study mode ("can make mistakes") [S19]. Claude can make a small diagram or page next to the chat, called an artifact [S29]. Fallback for all of them: any chat assistant with "do not give me the answer; ask me one question at a time".
- **Privacy defaults:** many free tools use chats to improve their models unless you change a setting: ChatGPT "Improve the model for everyone" [S21]; Gemini "Keep Activity", with a subset of chats read by human reviewers and kept up to three years [S15]; Claude "Model Improvement" [S27]; Perplexity "AI data retention" [S34]; GitHub Copilot Free [S44]; LinkedIn "Data for Generative AI Improvement" [S62]. Google says "Please don't enter confidential information" [S15]. Teach one habit: "assume a person may read it; find the training setting in any tool you use". Never build a quiz key on a setting's menu name.
- **GitHub:** free account with unlimited public repositories [S36]; Codespaces, a computer in the browser that includes Docker, with limited free hours each month (say "check your usage page", never a number); without a payment method it stops when the hours run out, so you cannot be charged by accident [S37, S38]; push protection tries to block secrets in public repositories, but do not rely on it [S39]; public means others can view and fork it, which is not a licence to reuse [S42].
- **Docker:** Docker Desktop is free for personal use [S52] but needs a fairly strong laptop (8 GB of memory and virtualisation on Windows) [S53]; the browser path is Codespaces. `docker compose stop <service>` stops a container without removing it, and `docker compose start <service>` starts it again [S55]. In plain words, stopping asks the program to shut down and forces it after a short wait [S54]. The Qasir lab sets `restart: unless-stopped`, so a stopped container stays stopped until you start it [S56].
- **Notes:** OneNote is free and works offline, syncing later [S45, S46]; Obsidian is free and keeps notes as plain Markdown files in a folder you own [S48, S49]; Joplin is free, open source and offline first [S50, S51]. Fallback: a folder of plain text files or a paper notebook. The structure matters more than the app.
- **Sharing platforms:** Medium requires a label on AI-assisted stories and limits undisclosed AI writing [S58]; DEV lets authors mark posts Hand Written, AI-Assisted or Fully Autonomous [S59]; Hashnode and LinkedIn put the responsibility on the author [S60, S61]. Write first as a Markdown file in your own GitHub repository, then adapt.
- **Learning and AI evidence (module 1.4, module 3):** use only the "Phrase it this way" wording in dossier sections B and C, and the "Facts writers may state" list. Never cite the MIT EEG preprint, METR's 19% as a current fact, learning styles, "10% of what you read", "21 days to a habit" or "10,000 hours" (dossier "Do not say").
- **Six months and five angles:** "about six months" and "one new area a week" are **the sponsor's planning rules**; "five angles" is **the course's method** built on supported parts (own-words explanation, pictures with words, worked examples, retrieval, spacing). Say so plainly; never "research shows".

## 4. Chapter file format and budgets

Path: `courses/build-with-ai/<module-dir>/<file>` exactly as in course.yaml. Frontmatter:

```yaml
---
title: "<exact title from course.yaml>"
module: <n>
lesson: <n>
stepType: Read | Learn | Build | Check | Gate
summary: "<one or two plain sentences>"
estimatedMinutes: <minutes from the roadmap>
---
```

`NN.01-set-the-scene.md` is Read; teaching chapters are Learn; `06.05-capstone-your-project-start.md` is Build; `*-quiz.md` (including the mixed review `06.04-quiz.md`) are Check; `*-checklist.md` is Gate.

**agent-ip prose minimums apply in full** (`02-course-architecture.md` → Prose depth), counted by `agent-ip/scripts/audit-course.mjs` over **paragraphs only**: headings, lists, numbered steps, tables, block quotes, components and fences do not count.

| Chapter type | Prose words (paragraphs) | Diagram | Interactive | Assessments |
|---|---|---|---|---|
| Set the scene (Read) | 1,200 or more | one ```mermaid | none | one predict or one short openquestion |
| Teaching (Learn) | 1,200 or more | one ```mermaid | its registered canvas (section 6) | one predict before the canvas, one or two quiz MCQs after (at most 3 in total) |
| Capstone (Build) | 1,200 or more | one ```mermaid | none | the capstone openquestion only |
| Quiz (Check) | none: activities only | none | none | exactly **five** quiz MCQs (the mixed review 6.4 too) |
| Gate | 700 or more | none | none | one openquestion |

Every chapter: at most 6 top-level components and 25 JSX tags in total.

**Recaps and definitions:** `ChapterRecap` goes in the module gate only, never in a scene, teaching, quiz or capstone chapter. `LearningObjectives` goes in the set-the-scene chapter only. `BigWordAlert` is for the module's central term in its set-the-scene chapter, and at most once in a teaching chapter for a new, load-bearing term. Write long by **explaining**, not padding: more worked reasoning, a second short example, the common mistake and how to spot it, what to do next. Paragraphs of two to five short sentences.

### Set the scene (Read)
A case told as a short story that shows the module's problem; why it matters for a fellow's career; what the module covers. One `BigWordAlert` (props `term`, `plainEnglish`, `whyItMatters`) for the central term. `LearningObjectives` (`items={[...]}`) once. A `## Key words` table (Word, Plain English) of four to six words and a `## What is in this module` table (Chapter, You will practice). One ```mermaid diagram of the case. One predict or one short openquestion (minWords 20 to 30, with a provided alternative). End with a `**Next:**` line.

### Teaching chapter (Learn)
Hook (a case or a mistake), the idea in plain words, a full worked example with the reasoning step by step, a ```mermaid diagram that argues a relationship (introduced in prose before, explained after; it must argue something different from the canvas), the predict, then the canvas, then "what it showed" in prose, where the habit goes wrong, one or two quiz MCQs under `## Check your understanding` on a **new** case that transfers the canvas claim, then a `**Next:**` line. At most one `BigWordAlert`; `GlossaryTerm` (props `term`, `definition`) for other new words; at most two `Callout`s.

Mermaid on phones: `flowchart TD` (or `LR` for three nodes or fewer), at most 7 nodes, short node text, quote any label with punctuation, no em or en dashes.

### Quiz chapter (Check)
Activities only: exactly five ```quiz MCQ fences and nothing else after the frontmatter. Every quiz chapter has at least one **"check the AI's output"** item: a short AI answer, plan or summary in single quotes inside the question, and the learner picks the mistake in it or the right next check. Never write "skip it" or "skip to".

### Gate
Layout as in `04.07-checklist.md`: intro sentence, `## Module N checklist` (five or six honest items, including "I answered the questions in chapters N.2 to N.X, and finished the quiz in N.Y"), `## Learning log` (four numbered questions about how they think and work), a task section, `## How your mentor will read it`, the openquestion, `<ChapterRecap points={[...]} />` (four or five points for the module), `## All boxes ticked?`, `**Next:**`. To reach 700 prose words, explain in paragraphs: what the task is for, what a strong answer looks like (a short worked example about a fictional person, in prose), a weak answer and why it is weak, the provided case for anyone who prefers not to use their own work, and how the mentor will read it. No `BigWordAlert`, `GlossaryTerm`, `Callout`, diagram, canvas, predict or quiz in a gate.

**Gate rubric (every gate):** a small table, each criterion (three to five) with three levels **Met, Partly, Not yet** and an observable threshold; a bold **Pass rule** line (for example "passes when no part is Not yet and at least three parts are Met"); and the follow-up step (the mentor replies with one or two questions, the learner answers in writing or a voice note). The openquestion's `modelAnswer` **starts with a mentor key for the provided case** ("Mentor key for <case>: ...", what must be present, what is acceptable, the common wrong answer), then gives a model answer for a different fictional case.

## 4A. Rules learned from course 10's critique rounds (apply from the first draft)

- **Quiz items test the habit on evidence.** In each quiz chapter at least two items give a small table or three to four stated facts and ask which conclusion, tool or next step the facts support; each wrong option fails because of a different stated fact. No item repeats an item or predict elsewhere in the course. The key's wording is not in the stem and is not a sentence from the chapter. Every quiz actor has a name, a place or role and a number. Wrong options are mistakes a learner of this course would really make; an AI answer in a question sounds reasonable.
- **Predicts are not always the cautious option.** In at least a third of your predicts the intuitive answer is the right one, or both options are plausible. Do not make "do not trust AI" the right answer every time: sometimes using the AI is the right call.
- **Opinion goes to open questions.** A graded key must follow from a habit taught in this course, from the dossier, or from arithmetic. "Which tool is best" is never graded.
- **Plain words.** No idioms ("game plan", "rabbit hole", "low-hanging fruit", "on the go" is fine only once and explained as "while you walk, wait or do chores"). Define "rule of thumb" at its first use. No sentence over 30 words.
- **Vary settings.** Do not reuse course 10's settings for the same kind of problem (home bakery, family grocery deliveries, a laptop that will not charge). Use: a clinic desk, a school, a café with internet, a sports club, an NGO office, a print and copy shop, a freelance marketplace, a university course, a coding bootcamp, a small online shop.

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
- Four options, one explanation per option in order; the right one starts with "Right."; wrong ones say kindly what was missed.
- **Option length:** the correct option is never longer than the longest wrong option; in a quiz chapter it is the strictly longest in at most one of five. Same level of detail in every option. Use each position 0 to 3 at least once per quiz chapter, and do not put the key in the same position more than twice in a row anywhere.
- No "all of the above", no joke options, no "Which is NOT".
- Blind re-answer each MCQ yourself after writing it. An independent blind review follows (`agent-ip/scripts/blind-keys.mjs`).
- Double-quote YAML strings; single quotes inside; always quote strings with colons.

Predict fence: exactly two options with `id` and `label`, `prompt`, `correctOptionId`, `explanation`; the correct label never longer than the other; correct first in about half your predicts.

Open question fence (gates and capstone):
````
```openquestion
prompt: "<what to write, with the parts to include>"
required: true
minWords: <honest minimum>
allowSpeechInput: true
allowUrl: true
urlRequired: false
urlLabel: "Link (optional)"
urlHint: "<what link fits: a GitHub repository, a notes page, a voice note>"
modelAnswer: "Mentor key for <provided case>: ... Model answer for a different case: ..."
```
````
Set-the-scene open questions use only `prompt`, `required`, `minWords`, `allowSpeechInput`, `modelAnswer`.

## 6. Canvases (agent-ip v0.4, interactive-first)

Every Learn chapter has exactly one registered canvas, named in the roadmap. **You build the canvas for each of your Learn chapters as data plus a spec, no new code**, except 5.2 (`six-month-hours-split`), which is already built: read its `data.ts` and `spec.md` and match every number.

For each canvas:
- Create `packages/learning-ui/src/canvas/<slug>/data.ts`, typed with the renderer's spec type, exporting a camelCase constant named after the slug (for example `aiMissingContext`). Header comment naming the course and chapter. `title`, `purpose`, `summary` for screen readers, steps with `title` and `note` in the course's plain English, `tryThis` whose **first line matches your predict**, honest `limits`.
- Create `packages/learning-ui/src/canvas/<slug>/spec.md` on template 14A (`agent-ip/08-templates.md`): teaching claim, why a canvas, model, rendering, copy, edge cases, accessibility, acceptance criteria, placement.
- Layout rules. **Sequence:** two to four actors, arrow labels under about 18 characters, five to eight steps. **State machine:** grid at most 3 columns by 2 rows (col 0 to 2, row 0 to 1); edge labels at most 14 characters; at most 3 characters on an edge between two states in the same column; no diagonal edge beside a parallel edge in a square of four cells. **Factor:** two or three options, three to five criteria, weight levels from the spec, scores on the scale; put the checked totals in the spec.
- Tones: `good`, `warn` or `bad` only when the step means it.
- **Do not edit** `packages/learning-ui/src/canvas/registry.ts` or any `slugs.ts`: the orchestrator registers every slug after you report, runs the registry tests (which check label fit on a phone) and sends back any failure.
- In the chapter: the predict comes first, one sentence sends the learner to step through, `<InteractiveCanvas slug="<slug>" />` on its own line, then a paragraph on what it showed, and later a quiz item that transfers the claim to a new case. The canvas must not repeat a question the chapter already answered. The chapter still teaches the claim in prose (the canvas is not the only path).
- Names, numbers and facts in the canvas match the chapter exactly. No em or en dashes, no idioms. Tool names in canvases only as the chapter uses them; prefer the kind of tool ("chat assistant", "source notebook").

| Ch | Slug | Renderer | Teaching claim (the canvas must make this one claim legible) |
|---|---|---|---|
| 1.2 | `ai-missing-context` | sequence | An AI answer is only as good as the context it gets: the same question gives a generic answer, and adding facts only you know (users, budget, weak data, the client's server) changes it; some facts the AI still cannot know, so you check. Actors: You, Chat assistant, Your project facts. |
| 1.3 | `who-makes-the-call` | state machine | AI can draft options; a person checks, decides and owns the result. The machine refuses "AI decides" and "ship unchecked" (rejected edges). States such as Question, Options drafted, Checked, Decided, Owned. |
| 1.4 | `answers-or-hints` | state machine | The same AI used two ways: asking for answers raises practice scores but leaves you weaker alone; asking for hints and checking your own steps keeps the learning. Two rows: an answers path (Ask for answer, Copy, Exam alone) and a hints path (Ask for a hint, Try it yourself, Exam alone). Ground it in the Bastani study only as the dossier phrases it (C1); the canvas's own steps are a fellow's example, not study data. |
| 1.5 | `big-app-or-understood-app` | factor | Khaled's big store built in a weekend against Yara's small, understood Qasir slice, on what a reviewer checks (works, can explain it, handles a failure, trade-offs written down, number of features). Only when "number of features" matters most does the big app win. |
| 2.3 | `pick-a-tool-for-the-job` | factor | The right kind of tool depends on the job. Options: chat assistant, source notebook, search with sources. Criteria such as "stays inside my sources", "explains with pictures", "finds recent pages", "talks it through with me". When "stays inside my sources" matters most, the source notebook wins; when recent pages matter, search with sources wins. Scores are the course's illustrative judgement, stated in limits. |
| 2.4 | `keep-work-in-your-files` | sequence | Work kept only in a tool's chat history is lost when the tool changes; work copied into your own notes and repository survives. Ahmad and Yara's way side by side, or one story with a turn. Actors: You, Chat tool, Your notes, Your repository. |
| 2.2 | `before-you-paste` | state machine | A short check before anything goes into an AI tool: would I be fine if a stranger read this? If not, remove names, numbers and keys, or do not paste; then send; then check the answer before use. Rejected edges: pasting a password or key; sending a client file without permission. |
| 3.2 | `close-it-and-recall` | state machine | Reading a clear explanation feels like knowing; closing it and recalling shows the gaps; re-studying only the gaps, then recalling again, is what builds memory. Lina's subnetting. |
| 3.3 | `five-angles-on-caching` | sequence | Each of five angles on one topic (plain explanation, picture, worked example, failure case, build or teach) catches a gap the others miss. Yara learning caching for Qasir. Actors: Yara, Chat assistant, Her notes (or Her lab). |
| 3.4 | `ai-quiz-partner` | sequence | When you ask the AI to quiz you one question at a time and wait for your answer, you do the recall; when you ask it to explain, it does the work. Ends with a review planned for later days. |
| 3.5 | `listen-then-read` | sequence | Sources first: trusted sources go into a source notebook, the audio overview is for listening while you walk or wait, then you read the sources, then you check one claim the audio made against the page and find a detail it got wrong or left out. Lina. |
| 3.6 | `note-page-lifecycle` | state machine | A note page grows up: captured, rewritten in your own words, linked to a lab, reviewed weekly. Rejected: pasting an AI summary as the note. |
| 4.2 | `daily-lab-loop` | state machine | A lab day has four parts: study, build, break, write; "stuck" loops back to a smaller step; a power cut ends the day at "write what you have". Yara's lab day. |
| 4.3 | `plan-a-lab-with-ai` | sequence | Ask an AI chat for a structured lab plan (goal, time, level, what to break), then cut it to your time, and check each command against the official docs; one command in the plan is out of date. Yara planning lab day 1. |
| 4.4 | `url-shortener-stop-a-part` | sequence | Breaking one part on purpose shows what it is for: Qasir with app, cache and database containers (`restart: unless-stopped`); a short link works from the cache; `docker compose stop cache`; links still work but every request goes to the database (slower in this lab); the cache is started again; the database is stopped; the app returns an error for new links. Actors: Browser, App, Cache, Database. Timings are this lab's own example numbers, labelled as such. |
| 4.5 | `lab-log-commit-push` | state machine | One lab entry becomes a commit and a push: write the entry, check for secrets, commit with a clear message, push. Rejected: committing a file with a password or key. |
| 5.2 | `six-month-hours-split` | slider | Already built. |
| 5.3 | `week-plan-check-resources` | sequence | A week, one new area: ask the AI for three videos, one book chapter and two articles on caching; check each exists (one book does not exist); study, lab, note, short write-up. |
| 5.4 | `two-options-trade-off` | factor | A real Qasir decision: where to count clicks (count in the database on every click, or add to a counter in the cache and save to the database every minute). Criteria such as "simple to build", "fast under many clicks", "no clicks lost if a part stops", "easy to explain". The AI's default suggestion wins only on one weighting; Yara's weights for her project pick the other. |
| 5.5 | `reuse-open-source-safely` | state machine | Find a project, check its licence and activity, read it in order (README, run it, one folder), reuse only within the licence with credit. Rejected: copying code from a repository with no licence. |
| 6.2 | `commits-to-article` | sequence | A week of lab logs becomes a short article in your own voice: you draft from the log, the AI edits and asks questions, you check every fact against your repository, then adapt the post for two other platforms. |
| 6.3 | `disclose-ai-help` | state machine | Before you publish: note what AI did, write the AI-use line, check the place's rules, publish. Rejected: "all my own work" when it is not. |

## 7. Module notes

**Module 1, AI as an enabler.** 1.1 Three fellows: Khaled (everything to AI), Rana (refuses it), Yara (third path). Central term: **enabler** (BigWordAlert: a tool that makes your work faster or possible, while you stay in charge). 1.2 what an AI tool does not know: your context (users, budget, deadlines), your private data, local and recent facts, the obvious things nobody wrote down; and why it still answers confidently (refer to course 9 module 7 in one sentence, do not re-teach). 1.3 you make the call: AI can draft, search, explain, compare; a person decides, checks and is accountable; "human in the loop" in plain words; coexist. 1.4 AI can help or harm your learning: the Bastani study (answers versus a hint-only tutor), the Harvard physics tutor, the Nigeria trial, Tutor CoPilot, each in the dossier's words with its limits; the pattern (AI helps when it makes the learner think) stated as a synthesis of several studies; no hype, no fear; this is why module 3's habits exist. 1.5 plenty of AI, few strong projects: building fast is no longer rare; reviewers and interviewers ask "why"; understanding is the skill; the explain-back rule introduced lightly (module 5 develops it). 1.6 gate: one task from the fellow's study or work (or the provided case: a fellow asked to build a small donation tracker for an NGO) split into what AI can help with, what it does not know, and the calls that stay theirs.

**Module 2, Your AI toolkit and its rules.** 2.1 Ahmad and Mahmoud. Central term: **free tier** (what a tool lets you do without paying, and that it can change). 2.2 before you paste (first, before any tool is opened): what never goes in (passwords, keys, client data without permission, other people's personal data, private documents); "would I be fine if a stranger read this?"; find the training setting in any tool you use (section 3B; teach the habit, not a menu tour); the Samsung 2023 case as the dossier states it; checking output: refer to course 9's three checks in one sentence, then add what is new here: check code by running it, check a command against official docs, check a link by opening it. 2.3 jobs, not tools: a table of jobs (learn from your sources, tutor and quiz, search with links, run a lab, keep notes, share) with two example tools per job, the access date, and the three-question check "does it open here, at my age, on my device?"; free access and availability are checked by the learner on the tool's own pages. 2.4 habits that outlast any tool: the rename of NotebookLM and the end of Play with Docker as the proof; keep work in files you own (notes, a repository, plain text or Markdown); save prompts that worked in your notes; copy important chats out; have a fallback tool and a no-AI fallback; recheck a tool's access each term. 2.5 quiz. 2.6 gate: the fellow's toolkit page.

**Module 3, Learn deeply with AI.** 3.1 Lina. Central term: **retrieval practice** (recalling from memory to learn, not only to test). 3.2 the fluency trap, shown not told: the learner reads a clear AI-style explanation in the chapter, rates how well they understand it (predict), then recalls it with the text out of sight and compares; fluent lecturer and Harvard active-learning findings in the dossier's words; rereading and highlighting rated low; recall shows the gaps. 3.3 five angles: plain explanation, a picture (ask the AI to draw a diagram of the idea, then check it against your source), a worked example, a failure case ("what breaks?"), build or teach it; Yara and caching. 3.4 make the AI quiz you: ask for one question at a time, wait for your answer, hints before answers; mix two similar topics in one practice (interleaving, with its limits); space reviews ("come back after a few days, then after a week or two" as the course's rule of thumb, per the dossier). 3.5 listen to meet it, read to learn it: choose trusted sources, put them in a source notebook (web version), make an audio overview to listen to while you walk, wait or do chores (focus it with a prompt; check the size before you download), then read the sources, then check one claim against the page; listening and reading are about equal overall, reading at your own pace helps with hard parts (dossier B); the "listen first, then read" order is the course's design. Fallback: a chat assistant's spoken-style summary read by the phone's own text-to-speech, or no audio at all. 3.6 notes you own, in your own words: one notebook per project, a section per area, a page per topic with a fixed template (the five angles, open questions, links to labs); own words; files you own and can export; OneNote, Obsidian, Joplin or paper as examples; pen or keyboard matters less than what you write (dossier B, do not say handwriting is better); an AI summary is not your note. 3.7 quiz. 3.8 gate.

**Module 4, Daily labs.** 4.1 Fadi and Yara. Central term: **lab** (a small, safe practice build you run, change and break to learn how something works). 4.2 the shape: about 30 to 45 minutes: study (10), build (15 to 20), break one thing on purpose (5 to 10), write (5 to 10); small enough to finish; what to do when stuck or when the power goes. 4.3 plan with an AI chat: what to tell it (goal, time, level, tools you have, what you want to break), cut its plan to your time, check commands against official docs; versions change; **check before you install**: find any package the AI suggests on the official package site and check it is real, used and maintained (package hallucination, dossier D). 4.4 watch it run, then break it: Qasir in containers (app, cache, database); stopping a container with `docker compose stop <service>` explained in one plain line per the dossier; predict before; what each failure shows; for fellows without a strong laptop: GitHub Codespaces in the browser; for fellows with only a phone: the provided log, where they predict and then read what happened. Never mention Play with Docker except as an example of a tool that closed. Do not teach Docker in depth: name the commands, explain what they do in one line, nothing more. 4.5 the lab log on GitHub: a repository with one folder or file per day; each entry: goal, what I did, what broke, what I learned, what AI helped with; commit messages that say what changed; a **pre-push checklist** (no keys or passwords, no `.env`, no one else's personal data, the entry says what AI helped with); GitHub's push protection per the dossier, not relied on; if a key is ever pushed, treat it as stolen: cancel it and make a new one (course advice); public or private. 4.6 quiz. 4.7 gate: lab day 1, or the provided log.

**Module 5, A project worth six months.** 5.1 Khaled's interview. Central term: **trade-off** (what you gain and what you give up when you choose one option). 5.2 why months: hours a week times weeks; most of the time is learning; AI speeds building more than learning; the six-month rule is the sponsor's planning rule, not a research finding (say so plainly); feeling faster is not being faster, so measure your hours (dossier D, without the 19%); a daily habit takes weeks to months to feel automatic (dossier H); match `six-month-hours-split` exactly (8 hours a week, 4 weeks a month, 12 areas, 8 learning and 4 building hours per area, all Yara's own planning numbers). 5.3 a weekly plan: month themes, one new area a week, step by step; ask the AI what to learn (videos, books, articles) and check each exists and is current; the weekly plan has a required "I checked it exists" column (how: found it in a library or bookshop listing, opened the video, opened the article); a fake book in the AI list (fabricated citations, dossier D). 5.4 slow down for trade-offs: compare options with your own constraints; attack the decision from more than one angle; the explain-back rule: do not keep any AI-written part you cannot explain line by line; insecure or outdated AI code per the dossier. 5.5 open source: find projects (GitHub search and topics, lists), signs of health, read in order, licences in four cases only (MIT, Apache 2.0, GPL, none: no licence means you may read and learn but not copy), public is not the same as open source, credit in your README and write-up; the reading order is the course's advice. 5.6 quiz. 5.7 gate: month 1 of the plan.

**Module 6, Share the work honestly, and capstone.** 6.1 Salma and Hani. Central term: **building in public** (sharing your work and what you learn as you go, not only the finished result). 6.2 from commits to an article: a weekly write-up kept first as a Markdown file in the fellow's own repository, from the lab log (what I built, what broke, what I learned, what is next); AI as an editor that asks questions and fixes grammar, not the author; check every fact against the repository; adapt for two other platforms (length, format) per the dossier; AI can help with a short video script or with reading a book, as the dossier allows. 6.3 say when AI helped: why (trust, journal and platform rules per the dossier); the three-part AI-use line: which tool, what it did, what you checked; "you are responsible for every sentence, whoever drafted it"; privacy of others in posts. 6.4 mixed review: five MCQs, one fresh case per module 1 to 5 (no new content). 6.5 capstone (section 8). 6.6 course gate: checklist across all habits, `## Your AI-as-enabler toolkit` (one line per habit), the learning log including "look back at your gate 1 answer: which calls would you now keep for yourself?", and an openquestion (minWords 80) on what they will do in the next four weeks of their plan, with a mentor key.

## 8. Capstone (6.5, Build, 120 minutes plus the daily labs)

The fellow hands in five parts for **their own project**, or for **Ibrahim's provided case** (always available, so nobody needs a laptop, a project or a public profile). Teach the five parts with a worked example on **Yara's Qasir** (her plan, her week, her log with the cache lab, her notes page, her post), include a ```mermaid diagram of how the five parts connect, a rubric table (five rows, Met / Partly / Not yet), a pass rule, defence questions for the five-minute walk-through, and the openquestion with `minWords: 250`, `allowUrl: true` (the GitHub repository link; urlRequired false so the provided case can be done without one).

1. **A six-month plan:** the project in one sentence, the areas month by month, hours a week, the learning share and why.
2. **This week's learning plan:** the area, resources an AI suggested that the fellow checked exist (and how), the five angles, and a recall test.
3. **A GitHub lab log with at least ten lab days** over at least two weeks, begun at gate 4, with one lab where a part was broken on purpose and explained.
4. **One page of structured notes** in their own words, linked from the log.
5. **One public write-up** of a week of progress, adapted for a second platform, with an honest AI-use line. Posting publicly is the fellow's choice; a private draft is accepted.

Ibrahim's provided case, written in full in the chapter: he wants a small queue app for a community clinic. The case gives his one-month plan (all building, no learning, eight areas in four weeks), an AI chat's suggested reading list for week 1 that includes one book that does not exist, a ten-day lab log in a small table with three problems (no lab breaks anything; day 6 commits a file with a database password; days 7 to 10 have no notes), and a draft post that says "I built this all myself" although the log shows an AI wrote the queue code. The fellow writes the improved six-month plan, this week's plan with the fake book caught, a review of the log with fixes, one notes page for one of his labs, and an honest version of the post. The mentor key goes in the `modelAnswer`.

## 9. Name pools (one per writer; grep the course before you use a name)

- Module 1 writer: **Dina, Majd, Reem, Bilal, Kinan, Asma**.
- Module 2 writer: **Aseel, Ziad, Hiba, Anas, Yaman, Nada**.
- Module 3 writer: **Noor, Samer, Layan, Odai, Maram, Tareq, Jana, Wael**.
- Module 4 writer: **Hala, Yousef, Raghad, Mo'men, Shahd, Iyad, Ruba, Karim**.
- Module 5 writer: **Duaa, Hamza, Lama, Saleh, Rasha, Adam, Malak, Nizar**.
- Module 6 writer: **Amira, Jamil, Sara, Tamer, Heba, Ola, Rami, Firas**.

## 10. Before you hand back

- Every file in your modules exists with the exact title and the roadmap minutes.
- Zero U+2014 and U+2013 characters in your chapters and canvas files.
- Every sum and case checked twice; every MCQ blind re-answered; option lengths checked.
- From `server/`: `node node_modules/tsx/dist/cli.mjs scripts/validate-course-source.ts --course build-with-ai` and `node node_modules/tsx/dist/cli.mjs scripts/audit-course-structure.ts --course build-with-ai` with no errors or warnings in your files (other writers' missing files may show; ignore those).
- From the repo root: `node agent-ip/scripts/audit-course.mjs courses/build-with-ai` with no flags on your chapters (it measures paragraph prose only).
- Edit only your module folders and your canvas folders. No git commands that change anything. Do not install packages. pnpm is broken here; use the node commands above.
- Report: files written, prose words per chapter from the audit, canvases created (slug, export name, renderer), and anything in the dossier you could not follow.
