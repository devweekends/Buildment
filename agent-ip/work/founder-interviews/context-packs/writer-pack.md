---
artifact: context-pack
course: founder-interviews
for: chapter-writer
version: 1
---

# Writer pack: The Founder Interview: Ownership, Impact and Your Story

Read this whole file before writing. It replaces the chapter briefs for this course (G2C was skipped on the sponsor's instruction; see `../decision-log.md`). The plan is `courses/founder-interviews/course.yaml`: write exactly the files, titles and goals listed there for your modules. The roadmap is `../curriculum-roadmap.md` (minutes, outcomes, gate evidence, the AI drills). The research dossier is `../research.md`: **every claim about research, a researcher or what founders do must match the dossier, phrased the way its "Phrase it this way" lines say**; never state a claim it marks unverified (its U1 to U20 table), except to correct it as a myth. Look at `courses/cause-and-effect/04-root-causes/` (`04.01`, `04.03`, `04.06`, `04.07`) for the exact file format of a scene, a teaching chapter with a canvas, a quiz chapter and a gate; that course is the quality bar. Skim `agent-ip/03-authoring-standards.md` (voice, forbidden patterns), `agent-ip/04-interactive-playbook.md` (budgets, option-length hygiene, quiz and predict rules) and `agent-ip/agents/chapter-writer.md`. For the AI interview fence read `docs/13-ai-interview.mdx` (the authoring section).

## 1. What this course is

A practical course for fellows applying to startups and small remote teams, where the interviewer is often the founder or the person they will work for. These interviews are usually free conversations, and every answer is followed by "why?", "how?" and "how do you know?" until the fellow's real decisions show. The course teaches answer qualities that survive any question, not a list of questions to memorise:

1. **One real time:** a story about one episode, not a description of yourself or of what you usually do.
2. **Your own part:** "I" for what you did, "we" for the team, and the line between them clear.
3. **The decision:** the options you had, what mattered then, why you chose, what happened, what you would change.
4. **An honest number:** a before, an after, a time window, a source and your share, or "I did not measure that" with how you would.
5. **The real reason:** the reason you had at the time, including "that was not my decision", never a tidy reason invented afterwards.

Every chapter teaches one of these, or how to use them in a case question, a technical story or a strength and weakness answer.

- Open every chapter with a concrete person and moment, never a definition.
- Teach the idea, show it working on a full worked example with the reasoning shown (a weak answer, why it fails under the next "why", and a stronger answer), then show where people go wrong.
- Every chapter ends with something the learner can do today with their own resume and projects.
- Wrong answers are welcome; every option is explained kindly.

## 2. Learner, voice and care

- Gaza fellowship fellows applying to startups and small remote teams for engineering, product, design and operations roles, early career to mid level. Arabic first; English as a second language. Most read on phones with weak, expensive data.
- Plain English. Short sentences (aim under 20 words, never over 30). Common words. No idioms or figures of speech ("nail the interview", "sell yourself", "think on your feet", "on the spot", "red flag" are all out): say the literal thing. Define every new term on first use.
- **Calm and practical.** Interviews can be stressful; never shame, never use fear ("they will catch you"). The honesty rule is taught as the strategy that survives the next "why", not as a moral lecture.
- **Hardship is ordinary background, never drama.** Power hours, weak internet, a shared room on a video call, a gap in work: mention them as facts of the week, with a practical answer. Never describe war, damage or loss. Never make light of it. Never ask a learner to explain a gap caused by hardship; if a gap comes up, the course gives one calm sentence a fellow can use and moves on.
- **Never ask a learner to share personal hardship.** Every personal prompt offers the provided fellow, Hadeel (section 5). Learning log questions about the learner's own work always say "or use Hadeel's".
- **Privacy.** Learners never paste their full name, phone, email, address, ID numbers, client or employer names, passwords, keys, private company data or other people's details into the AI interviewer. They use roles: "a logistics client", "my team lead". Every gate says this in one line before the drill.
- **The fellows' strengths are real.** Many have built things under hard conditions with little support. Do not write as if they lack experience; write as if they have not yet learned to show it.

## 3. Hard rules (any violation fails review)

- **No em dashes or en dashes anywhere** (U+2014, U+2013), including canvas data. Use a colon, a comma or two sentences. Ranges: "18 to 254".
- **No real company, product, app, brand, founder or investor names**, and no real websites. Say "a payments startup", "a code hosting site", "a notes app", "an AI chat tool", "a job board". The dossier names founders' essays for reviewers only; in chapters use its wording: "Founders who write about hiring say...". Fictional founders and hiring managers are not named either: call them "the founder" or "the hiring manager", with a one-line description of the team ("the founder of a six-person team building an inventory app for small shops").
- **No links**, and no `MustRead`, `InterestingRead` or `RealWorldEvent` blocks.
- **No politics or war as case material.**
- **Researchers only as the dossier's Credits table allows**, in plain words ("Researchers led by Adrian Bangerter recorded real interviews..."), at most two or three names per chapter. Taiichi Ohno may be named as "an engineer at a large Japanese car maker" (as course 10 does); never name the company. STAR is "a common answer shape that interview trainers call STAR", never research and never with an inventor.
- **No invented statistics about the real world.** Numbers belong to the case ("in this example"). Research numbers only as the dossier gives them, with the study's context (for example "in one study of 62 recorded interviews, about a quarter of answers were real stories"). Never: "six seconds on a resume", "55/38/7", "interviewers decide in 30 seconds", resume-lie percentages, accent-penalty percentages.
- **Honesty in every model answer.** No worked example, model answer or mentor key may contain a number without a source, or ownership the person did not have. Strong answers include honest gaps.
- **No AI or tool attribution. No slop:** no "In today's world", "It is important to note", "delve", "landscape", "game-changer", "Let's dive in", "key takeaways", "unlock", "journey", "level up", "supercharge", "crush it", "stand out from the crowd".
- **Check every number and every sum twice.** A case must support the conclusion the chapter draws. Percentages: say the before and after counts too where the chapter teaches them.

## 4. Chapter file format and budgets

Path: `courses/founder-interviews/<module-dir>/<file>` exactly as in course.yaml. Frontmatter:

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

`NN.01-set-the-scene.md` is Read; teaching chapters are Learn; `07.04-capstone-full-interview.md` is Build; `*-quiz.md` and `07.03-quiz.md` are Check; `*-checklist.md` is Gate.

**agent-ip prose minimums apply in full**, counted by `agent-ip/scripts/audit-course.mjs` over **paragraphs only**: headings, lists, numbered steps, tables, block quotes, components and fences do not count.

| Chapter type | Prose words (paragraphs) | Diagram | Assessments |
|---|---|---|---|
| Set the scene (Read) | 1,200 or more | one ```mermaid | one predict or one short openquestion |
| Teaching (Learn) | 1,200 or more | one ```mermaid, plus the canvas | one predict before the canvas, one or two quiz MCQs after it (at most 3 assessments in total) |
| Capstone (Build) | 1,200 or more | one ```mermaid | the capstone openquestion and the full AI interview |
| Quiz (Check) | none: activities only | none | exactly **five** quiz MCQs (`07.03-quiz.md` also five) |
| Gate | 700 or more | none | the AI drill and one openquestion |

Every chapter: at most 6 top-level components and 25 JSX tags in total. Aim for about 1,300 to 1,500 prose words in scene, teaching and capstone chapters and about 800 to 1,000 in gates, so edits do not drop a chapter under the line.

**Recaps and definitions:** `ChapterRecap` goes in the module gate only. `LearningObjectives` goes in the set-the-scene chapter only. `BigWordAlert` (props `term`, `plainEnglish`, `whyItMatters`) is for the module's central term in its set-the-scene chapter, and at most once in a teaching chapter for a new, load-bearing term. Never define the same term twice in the course: after its first definition, refer back ("the pseudo-story you met in 1.2"). Write long by **explaining**, not padding: more worked reasoning, the weak answer and the follow-up question that breaks it, a second short example from another role (engineering, product, design, operations), the common mistake and how to spot it, what to do with your own resume. Paragraphs of two to five short sentences.

**Interview dialogue** is written as short block quotes or as prose with quotation marks, never as long scripts. Keep any one quoted answer under about 80 words. Block quotes do not count as prose words, so the explanation around them must carry the chapter.

### Set the scene (Read)
A case told as a short story that shows the module's problem: an interview moment, the question, the answer, the follow-up, and where it went wrong. Why it matters for founder and small-team interviews. What the module covers. One `BigWordAlert` for the central term. `LearningObjectives` (`items={[...]}`) once. A `## Key words` table (Word, Plain English) of four to six words and a `## What is in this module` table (Chapter, You will practise). One ```mermaid diagram of the case. One predict or one short openquestion (minWords 20 to 30, with a provided alternative; set-the-scene open questions use only `prompt`, `required`, `minWords`, `allowSpeechInput`, `modelAnswer`). Say once that the people and teams are fictional. End with a `**Next:**` line.

### Teaching chapter (Learn)
Hook (a person and an interview moment), the idea in plain words, what the research found (as the dossier phrases it), the predict, the canvas, what the canvas showed, a full worked example with the reasoning step by step (weak answer, the follow-up that breaks it, stronger answer), a ```mermaid diagram that argues a relationship (introduced in prose before, explained after), where people go wrong, a short "try it on your own resume today" paragraph, one or two quiz MCQs under `## Check your understanding` on a **new** case, then a `**Next:**` line. At most one `BigWordAlert`; `GlossaryTerm` (props `term`, `definition`) for other new words on first use; at most two `Callout`s.

Mermaid on phones: `flowchart TD`, at most 7 nodes, short node text, quote any label with punctuation. Label edges with plain words ("why?", "how do you know?", "next").

### Quiz chapter (Check)
Activities only: five ```quiz MCQ fences and nothing else after the frontmatter. Modules 1, 2, 3 and 5 include at least one **"check the AI's answer"** question: show a short AI answer in single quotes inside the question, sounding reasonable, with one mistake this course teaches against (for example "add a percentage to sound concrete", "say 'I led' to sound stronger", "name perfectionism as your weakness", "say the reason that sounds most strategic", "use the technical terms so they know you are senior"); the learner picks the mistake or the better advice. Never write "skip it" or "skip to". Never put an ```aiinterview fence in a quiz chapter: the importer refuses it.

### Gate
Use the cause-and-effect gate layout (`04.07-checklist.md`) with one added section for the AI drill. Order:

1. Intro sentence.
2. `## Module N checklist` (five or six honest items, including "I answered the questions in chapters N.2 to N.4, and finished the quiz in N.5").
3. `## Learning log` (four numbered questions about how they think and act; personal ones say "or use Hadeel's").
4. A task section (`## Your task: ...`) that explains the evidence to write.
5. `## How your mentor will read it` with a rubric table (each criterion with Met, Partly and Not yet and an observable threshold), then a **Pass rule**, then the follow-up step (the mentor replies with one or two follow-up questions, often a "why"; the learner answers in writing or a voice note).
6. `## Practice with the AI interviewer`: one paragraph on what the drill does (it asks one opening question, follows your answer with "why" and "how do you know", then moves to a second topic, and ends with strengths and weaknesses with a fix each); one paragraph on how to use it (answer as you would in a real interview; "I did not measure that" and "that was not my decision" are good answers; its feedback is practice, not a hiring decision, and can be wrong); the privacy line (section 2); and one sentence: "If you do not have a key, the written task below completes this gate." Then the ```aiinterview fence (section 6).
7. `## Written task` with one sentence, then the openquestion. The written task asks for the same evidence the drill practises and is the fallback for everyone without a key. If the learner did the drill, the prompt also asks for the one piece of feedback they will act on and why (or why they disagree with it).
8. `<ChapterRecap points={[...]} />` (four or five points), `## All boxes ticked?`, `**Next:**`.

To reach 700 prose words, explain in paragraphs: what the task is for, a strong answer from a fictional fellow (in prose), a weak answer and why it is weak under the next "why", the provided case (Hadeel) for anyone who prefers it, and how the mentor will read it. No `BigWordAlert`, `GlossaryTerm`, `Callout`, diagram, canvas, predict or quiz in a gate.

The gate `modelAnswer` holds the **mentor key** for Hadeel's case first ("Mentor key for Hadeel: ..."), what to accept and what not to accept (name the five flags where they apply, section 6), then a model answer for a different case.

## 4A. Rules carried over from earlier critique rounds

- **Quiz items test the skill on evidence.** In each quiz chapter at least two items give a short interview exchange or three to four stated facts and ask which answer, rewrite or next step the facts support; each wrong option fails because of a different stated fact. No item repeats an item or predict elsewhere in the course. The key's wording is not in the stem and is not a sentence from the chapter. Every quiz actor has a name, a role and a concrete project. Wrong options are mistakes a learner would really make (a polished but vague answer, a number with no before, "we" throughout, a strategic-sounding invented reason); an AI answer sounds reasonable.
- **Predicts are not always the cautious or surprising option.** In at least a third of your predicts the intuitive answer is the right one, or both options are plausible.
- **No unsupported superlatives** ("the best way", "the most common mistake"): say "a common mistake", "a strong choice". Exception: the dossier's finding that pseudo-stories were the most frequent answer type in one study, phrased as such.
- **Vary roles and settings.** Use engineering, product, design and operations work, and freelance, internship, volunteer and study projects: a clinic booking app, a bakery's order form, a school timetable sheet, a delivery dashboard, a support inbox, a translation agency's file workflow, a charity shop's stock sheet, a university club's event sign-up, a small online shop's checkout.
- **Cast.** The recurring people keep their facts (section 5). A name belongs to the earliest module that uses it. New names come only from your own name pool. Grep the whole course before you use any name.

## 5. Cast and the provided fellow

All people and teams are fictional; say so once in each set-the-scene chapter. Dollars for freelance and startup pay and prices; no local currency needed.

| Module | Person | Facts to keep |
|---|---|---|
| 1 | **Samer** | 26, backend developer. For 14 months he worked at a small courier company (team of four developers) on a delivery tracking dashboard used by the dispatch staff. Applying to a six-person startup building an inventory app for small shops. In his first founder interview every answer was "we" and "usually": "We usually fix issues fast"; "we built a dashboard". When the founder asked "What exactly did you do?", he listed the team's work. His own part, which he never said: he noticed that drivers were calling dispatch about addresses, built the address check on the order screen, and chose to flag bad addresses rather than block the order. |
| 2 | **Leen** | 28, operations coordinator for a small online shop that sells handmade goods abroad (team of five). Introduced a packing checklist and a new shelf layout. Her resume says "made packing 50 percent faster". The founder asked "50 percent faster from what?" and she had no before number: the 50 came from a feeling. The honest version (worked in 2.2 and 2.4): the shop's order sheet has the time each order was marked packed. A packing day is about 20 orders. Over the four weeks before the change a packing day took about 3 hours; over the four weeks after, about 2 hours. From 3 hours to 2 is a third less time, not 50 percent. In the same month the shop stopped selling large glass lamps, which took the longest to pack, so not all of the change was the checklist. |
| 3 | **Karam** | 25, frontend developer, one year at a small web agency. Resume line: "Led the redesign of the checkout page, increasing conversion by 20 percent." Under the founder's whys: the designer led the redesign and he built it; the 20 percent came from his manager's slide and he does not know how it was measured; he gave a tidy reason ("to reduce friction in the funnel") that was not his reason at the time (his manager asked him to). The honest rewrite is worked in 3.3 and 3.4. |
| 4 | **Mais** | 27, two years in quality testing at a software company, applying for a product role at a small team running a food delivery app. Case question in 4.1: "Repeat orders fell from about 40 percent of customers to about 30 percent over two months. You start next week. What would you do?" She gave ten ideas in two minutes and no decision. Worked properly across 4.2 to 4.4. |
| 5 | **Yazan** | 29, backend developer at a payments startup (team of eight) for 18 months. Best technical work: the monthly merchant report took about 40 minutes to build and timed out for the largest merchants; he moved it to a background job that builds the report in parts and emails a link when it is ready. In 5.1 he lost the founder in jargon ("async worker", "idempotent retries", "queue") and then could not answer the engineer's "why not just run it at night?". The founder version and the engineer version are worked in 5.3 and 5.4. Facts: before, about 40 minutes and 9 timeouts in the last month for the 12 largest merchants; after, the largest report took about 6 minutes and there were no timeouts in the next two months; he chose the background job over a nightly run because merchants asked for reports at any time and some needed same-day numbers; failure case: if the job stops halfway, it restarts from the last finished part, and a report is never emailed twice (he tested this by stopping the job by hand). |
| 6 | **Nour** | 24, product designer, freelance for two years (12 small clients). On a video call from a shared room she said "my weakness is that I am a perfectionist", then froze when the hiring manager asked for an example. Her real strength: turning messy client feedback into one clear set of changes (evidence: three clients came back for more work; one wrote that her summaries saved them a meeting). Her real weakness: she shows work late, after polishing it, so changes come late (example: a sign-up screen she spent three days on before showing it; the client had already changed the plan); her plan: show a rough version within one day. |
| 7 | **Tala** | 26, mobile developer, reads her first and her last practice interview feedback side by side in 7.1. First drill flags: vague ownership, pseudo-story, unsupported number. Last drill: one unsupported number left; the feedback praised a long answer that had no number at all (the feedback's own mistake, which she spots). |

**The provided fellow: Hadeel.** For learners who prefer not to use their own work, every gate and the capstone use one provided fellow whose material continues across the course. Every writer uses this canon exactly.

- **Who:** 24, frontend developer, applying to small remote teams.
- **Internship (6 months, remote):** a five-person team (the founder, two developers, a designer, a part-time support person) building a clinic booking web app used by 6 small clinics.
  - **Line A:** "Built the patient booking page of a clinic booking app used by 6 clinics." Her part: built the page from the designer's screens; after watching three patients struggle with one long form on a phone at one clinic, she proposed splitting it into three short steps, and the designer agreed. The team's part: the backend and the clinic dashboard were built by others.
  - **Line B:** "Added text-message reminders; missed appointments fell from 18 percent to 11 percent." The founder decided to add reminders; Hadeel built them and chose to send them at 18:00 the day before rather than the morning of the visit, because the clinics said many patients missed early slots. The other developer chose the text-message service. Numbers: from the clinics' booking records (she counted missed appointments out of all appointments with the other developer's help, two months before and two months after). In the second month, two of the six clinics also started phoning patients. In the four clinics that did not phone, missed appointments fell from 18 percent to 12 percent, so she says "about 6 points in the clinics that only had the reminders".
  - **Line C (her best technical work, module 5):** "Cut the booking page's load time from about 6 seconds to about 2 seconds on a low-cost phone." Measured: 10 loads on the team's cheapest test phone on a slow connection, before and after; she reports the middle value. What she did: made the clinic photos smaller and loaded them after the form, and kept the clinic list in the browser for one hour so it was not fetched on every visit. Why not rewrite the page with another framework: about two weeks of work against two days, for a problem that was mostly images. Why not a server change: the backend developer was busy with the reminders. What happens if a clinic changes its hours: the saved list could show old hours for up to an hour; once a patient booked a slot after a clinic had closed early; she and the backend developer added a check at booking time on the server.
  - **Line D (weak, for the module 3 audit):** "Improved team productivity with better processes." She cannot defend it. Rewrite: "Wrote a short test checklist we used before each release for my last three months."
- **Freelance (4 months, after the internship):** "Built an online order form and a stock sheet for a family bakery." Impact is an honest gap: she did not count orders. The owner said phone calls at busy times dropped, which is the owner's words, not a number. Her plan: "I would count form orders and phone orders for two weeks."
- **Volunteer:** "Taught basic spreadsheet skills to 12 students at a community centre, in 8 weekly sessions."
- **Strength with evidence (module 6):** finding why pages are slow on cheap phones (Line C; afterwards the founder asked her to check the clinic dashboard too).
- **Weakness with a plan (module 6):** she waits too long before asking for help. Example: she spent two days stuck on a time-zone bug in the booking form before asking the backend developer, who found it in an hour. Plan: after two hours stuck, write down what she tried and ask; she has done this on the bakery work.
- **Her case for gate 4** (a founder's question, not her own work): "Our online tutoring service gets about 300 new sign-ups a month. Last month it got 200. Last month we also started asking for a phone number on the sign-up form. About 80 percent of visitors are on phones. What would you do?"
- **Capstone:** her full resume (lines A to D, freelance, volunteer), a provided transcript of a full AI practice interview with its feedback (writer D writes it; the feedback makes one mistake, section 9), and the story bank she builds from it.

## 5A. Name pools (quiz and side characters)

- Writer A (modules 1 and 2): Adam, Salma, Tareq, Reem, Bilal, Nadia, Fadi, Asma
- Writer B (modules 3 and 4): Tamer, Sara, Iyad, Lama, Mazen, Ruba, Anas, Hiba
- Writer C (modules 5 and 6): Karim, Manar, Wael, Sana, Jamal, Duaa, Osama, Rana
- Writer D (module 7): Majd, Layla, Fares, Aya, Mustafa, Shahd, Nabil, Ola

## 6. Assessments and the AI drill

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
- **Option length:** the correct option is never longer than the longest wrong option; in a quiz chapter it is the strictly longest in at most one of five, and the shortest in at least one. Same level of detail in every option. Use each position 0 to 3 at least once per quiz chapter.
- No "all of the above", no joke options, no "Which is NOT".
- Every key follows from a quality taught in the course or from arithmetic. Opinion goes to open questions. Where two answers could both work, the facts in the stem must make one clearly better.
- Blind re-answer each MCQ yourself after writing it. An independent blind review follows (`agent-ip/scripts/blind-keys.mjs`).
- Double-quote YAML strings; single quotes inside; always quote strings with colons.

Predict fence: exactly two options with `id` and `label`, `correctOptionId`, `explanation`; the correct label never longer than the other; correct first in about half your predicts.

Open question fence (gates and capstone):
````
```openquestion
prompt: "<what to write, with the parts to include>"
required: true
minWords: <honest minimum>
allowSpeechInput: true
allowUrl: true
urlRequired: false
urlLabel: "Voice note link (optional)"
urlHint: "An audio link your mentor can open without signing in. Audio only is fine."
modelAnswer: "Mentor key for Hadeel: ... Model answer for a different case: ..."
```
````

AI interview fence (gates and the capstone only):
````
```aiinterview
title: "<short title>"
opening: "<the first question, under 300 characters, plain words>"
focus: [<module focus>, <second focus>]
context: <project | resume | none>
maxTurns: 10
whyDepth: 3
required: false
rubric: "<server-only notes, see below>"
```
````
- Keys allowed: `title`, `opening`, `focus`, `context`, `maxTurns`, `whyDepth`, `required`, `rubric`. Any other key fails the import. `required` is always `false`. Focus values: `ownership`, `impact`, `five-whys`, `resume`, `best-technical`, `storytelling`, `case-study`, `strengths-weaknesses`.
- The drill settings per gate are fixed in section 8. Write the opening question and the rubric.
- **The rubric** (one double-quoted string, about 600 to 1,200 characters, no line breaks inside) tells the interviewer what a strong interview shows and what to probe. It always contains, in your own words for the module: (1) what a strong answer shows for this module's quality; (2) probes to use: ask for one specific time when the answer describes habits; ask "What was your part?" when the answer says "we"; ask "How do you know?" or "Where does that number come from?" after any number; on technical answers ask "Why this and not another way?" and "What happens if it fails?"; (3) stop rules: accept "I did not measure that", "I don't know" and "that was not my decision" as full answers, reply briefly and ask what they would do or measure next; never push the learner to guess a number or invent an example; (4) scoring: judge features, not length; an honest gap with a plan to measure scores higher than an unsourced number; quote the learner's words as evidence; (5) the five flags to use by name when they apply: **vague ownership**, **unsupported number**, **pseudo-story**, **invented reason risk** (a reason that appears only after probing and contradicts an earlier answer), **jargon without explanation**; (6) tone: kind and direct, feedback about the answer, not the person; when the evidence is thin, suggest in the next steps how the learner could get it, for example a small project built around a need of their own, without naming a specific project idea.

## 7. Canvases (agent-ip v0.4, interactive-first)

Every Learn chapter teaches through one **registered canvas** that the learner steps through or changes and sees change: a predict before it, a paragraph on "what changed" after it, and a quiz item later that transfers the claim to a new case. Predicts and quizzes do not count as the element. You build each canvas as **data plus a spec on an existing renderer** (no new React code):

- Read `agent-ip/10-interactive-canvases.md` (Reusable renderers, The copy blocks, Placement and density) and the renderer types in `packages/learning-ui/src/canvas/renderers/<renderer>/types.ts`.
- Models to copy: state machine `packages/learning-ui/src/canvas/five-whys-chain/` and `huda-review-loop/`; sequence `laptop-charging-detective/` and `review-without-blame-steps/`; factor `weighted-matrix-two-offers/` and `choose-an-anchor/`; slider `retry-backoff-jitter/`, `fewer-temptations/` and `llm-token-cost/` (and their tests in `frontend/tests/unit/canvas/`).
- Create `packages/learning-ui/src/canvas/<slug>/data.ts` (typed with the renderer's spec type, a header comment naming the course and chapter, `title`, `purpose`, `summary` or `intro` for screen readers, steps or inputs in this course's plain English, `tryThis` with the first line matching your predict, honest `limits`) and `packages/learning-ui/src/canvas/<slug>/spec.md` on template 14A (`agent-ip/08-templates.md` → 14A: teaching claim, why a canvas, model, rendering, controls, visualisation, copy, edge cases, accessibility, acceptance criteria, build plan).
- **Slider canvases:** `compute` and `describeChange` are pure functions exported from `data.ts`; also export the core model function so it can be unit tested. Arithmetic only, from stated case numbers; say in `limits` that it is a simple illustration. Write `frontend/tests/unit/canvas/<slug>.test.ts` with at least four tests (defaults, the "try this" values, an edge, and describeChange), modelled on `retry-backoff-jitter.test.ts`.
- **State machines:** grid at most 3 columns by 2 rows; state names at most 18 characters; edge labels at most 14 characters, and at most 3 characters on an arrow between two states in the same column; no diagonal beside a parallel arrow. **Sequences:** two to four actors, arrow labels at most 18 characters. **Factor:** two or three options, three to five criteria, two to four weight levels; the result must change when the learner changes the weight the chapter asks about.
- **Do not edit** `packages/learning-ui/src/canvas/registry.ts`, `packages/learning-ui/package.json` or any `slugs.ts`: the orchestrator registers every slug after you report, runs the registry, label-fit and model tests, and sends back any failure.
- In the chapter: the predict comes first, one or two sentences send the learner to step through, `<InteractiveCanvas slug="<slug>" />` on its own line, then a paragraph naming What this shows, Try this, What changed and Limits of the model (as in `04.03-five-whys.md`). The chapter still teaches the claim in prose; the canvas is not the only path. The Mermaid diagram argues something different from the canvas.
- Names, numbers and facts in the canvas match the chapter exactly. No dashes, idioms or brand names in canvas text.

| Chapter | Slug | Renderer | Teaching claim (the canvas must make this visible) |
|---|---|---|---|
| 1.2 | `story-or-usually` | state machine | Three kinds of answer to "Tell me about a time...": a self-description ("I am hard working"), a pseudo-story ("whenever a client complained, I...") and a story (one time, one problem, what I did, what happened). Each weaker kind draws the probe "Can you give me one example?" and costs a turn; a story carries its own evidence. Steps follow Samer from "we usually fix issues fast" to his address-check story. Dossier finding 5. |
| 1.3 | `my-part-team-part` | sequence | Under "What exactly did you do?", an answer that only says "we" gets the same question again, and borrowed credit breaks at the second probe; an answer that names the team's work and then "my part was..." moves the interview forward. Actors: Founder, Samer, and Samer's notes (what he really did). |
| 1.4 | `samer-decision-weights` | factor | A decision story names the options and what mattered at the time; change how much one factor mattered and the choice changes, which is why the answer must say what mattered then. Samer's options for bad addresses: block the order, flag it for dispatch, or fix addresses by hand each morning; criteria such as orders lost, driver calls saved, build time, dispatch work. Raising the weight of "no lost orders" should make "flag" win; raising "build time" may change it. |
| 2.2 | `percent-from-what` | slider | The same percentage can mean very different results: a percentage needs the before and after counts and the time window. Inputs: the before value, the after value, weeks measured. Outputs: percent change, the absolute change, and a plain sentence ("from 2 to 8 sign-ups is 300 percent but only 6 people"). Leen's packing hours as the default (3 hours to 2 hours a packing day is 33 percent less time, not 50). Arithmetic only. |
| 2.3 | `find-your-numbers` | sequence | When you never measured, the evidence often already exists: a count from the database, the logs and API call counts, analytics, a bill, the support inbox, time records. Actors: You, The data (database and logs), The people (support inbox, users, the client), and Your notes. Steps: ask one question per source and write the number with where it came from; one source gives nothing and becomes an honest gap. Use one developer example (a fellow, for example Bilal, who counts failed payments in the logs and API calls before and after his fix, and checks the cloud bill) and the course's honesty rule: query only data you are allowed to see, and never paste it into the AI interviewer. |
| 2.4 | `how-much-was-yours` | slider | The change you can claim is the change minus what happened without you. Inputs: before rate, after rate, the change in a comparison group that did not get your work (in Hadeel's case, two clinics also started phoning patients; use a separate case in the chapter, for example Leen's shop, with a comparison: the other half of orders packed the old way that month). Outputs: total change, change seen without your work, the part you can claim. Arithmetic only; limits say a comparison is a hint, not proof. |
| 3.2 | `resume-line-why-chain` | state machine | A why chain on a resume line ends at a decision you made or a fact you checked; a broken chain ends at blame, at a single guessed cause, or at a reason you cannot support. Use the dossier's worked chain on "Reduced app load time by 40 percent" (finding 4), told by a side character from your pool, and a last step showing Karam's chain breaking at the second why. |
| 3.3 | `tidy-reason-breaks` | sequence | A tidy reason invented afterwards ("to reduce friction in the funnel") holds at the first why and contradicts itself at the third; the real reason from the time ("my manager asked me to, and here is what I decided inside that") holds all the way down. Actors: Founder, Karam, What Karam knew then. |
| 3.4 | `resume-line-audit` | state machine | Every resume line passes five checks in order: what I did, why, what happened, how I know, what I would change. A line that fails a check is rewritten, not defended. Steps audit Karam's checkout line and end with the honest rewrite ("Built the redesigned checkout page from the designer's screens; I do not know how the 20 percent was measured"), and one step shows a line kept as it is. |
| 4.2 | `clarify-the-case` | sequence | One to three clarifying questions and spoken assumptions change the answer: Mais asks whether the drop is in new or returning customers and whether anything changed two months ago, learns that delivery fees rose then, and her answer narrows. Actors: Founder, Mais, The facts. |
| 4.3 | `case-options-weights` | factor | Two or three real options compared on cost, time, risk and what you learn; the winner depends on what matters most this month. Mais's options: lower the delivery fee for returning customers, ask ten lost customers why, or add a loyalty discount. Changing the weight of "time this month" or "cost" should change the winner. |
| 4.4 | `decide-and-measure` | slider | Decide before you look at the result: say the number you will watch, its baseline, and the line that would make you change course. Inputs: baseline repeat rate (30 percent), the result after four weeks, the line you set in advance. Output: keep, change course, or "too close to call: keep watching". Arithmetic only; limits say real results move up and down, so a small change can be noise. |
| 5.2 | `choose-technical-story` | factor | The best technical story to tell is the one where you made a real decision and can explain it five whys deep, not the one with the newest tools. Options: Yazan's report job, a team project with impressive tools where he wrote the tests, a weekend project. Criteria: your own decision, you can explain five whys deep, a measured result or honest gap, recent, impressive tools. Raising "impressive tools" makes the weaker story win, which is the trap. |
| 5.3 | `founder-version-first` | sequence | Give the founder version first (the problem in user terms, what you built in one sentence, the key choice, the result), then let the listener ask for depth. Steps contrast Yazan's jargon answer, where the founder stops following, with his founder version, where the founder asks a business question that leads to the next step. Actors: Founder, Yazan. |
| 5.4 | `engineer-depth-ladder` | state machine | An engineer goes down a ladder of follow-ups: what you built, why this way, why not the other way, what happens if it fails, how you tested it, what you would change. Each step needs a decision or a test you can name. Yazan's report job, including "why not just run it at night?" and "what if the job stops halfway?". |
| 6.2 | `broad-to-narrow-strength` | state machine | A broad strength ("I am a good designer") cannot be checked; a narrow one ("I turn messy client feedback into one clear list of changes") can, with a recent example and what someone else said or saw. People judge narrow skills more accurately than broad ones (dossier finding 7). Steps follow Nour from broad to narrow to evidence. |
| 6.3 | `weakness-answer-choice` | factor | Compare three weakness answers: the humblebrag ("I am a perfectionist"), a real weakness with no plan, and a real weakness with an example and a plan. Criteria: honest, matters for the work, shows what you do about it, feels safe to say. Raising "feels safe to say" makes the humblebrag win, which is why people choose it; in the one direct study, readers preferred the real weakness (dossier finding 7). |
| 6.4 | `time-to-think` | sequence | On a video call, saying "Let me think for a moment" and asking "Do you mean...?" costs seconds and saves the answer; rushing into the wrong question costs the answer. Actors: Hiring manager, Nour. One step shows a weak connection and how to ask for the question again. |
| 7.2 | `feedback-to-next-project` | state machine | Read feedback critically: check each flag against your own words in the transcript, keep the flags the transcript supports, question the ones it does not (AI feedback can praise long answers and agree with you), find the gap in your story bank, and plan how to fill it, for example a small project built around a need of your own. |

## 8. Module notes

Section numbers such as "finding 5" refer to `../research.md` → Findings by topic. Its **Phrase it this way** lines are the wording to follow; its **Credits** table says how to name people; its **Unverified claims** table lists what never appears as fact.

**Module 1, Stories you owned (writer A).** 1.1 Samer's first founder interview: free conversation, many follow-ups, "we" and "usually" (findings 1 and 3: planned interviews predict better than free conversations; many founder interviews are free conversations; what founders who write about hiring say they probe; you cannot change their method, but you can give the evidence a good scoring guide would look for). Also in 1.1, briefly: how the course practises (the AI interviewer on your own key, the written task that completes every gate, the privacy rule, and that your questions and answers are saved for you and your mentor), and that the interviewer's feedback can be wrong. 1.2 (finding 5) stories versus pseudo-stories versus self-descriptions, the 23 percent study in its context; tell one time; keep the background short. 1.3 (findings 3 and 5) "I" and "we": the founder's "So what did you do?"; borrowing is a kind of faking researchers name; end to end as the whole path (noticed, decided, built, shipped, checked after); if you only owned the middle, say so and own that part fully. 1.4 (findings 2 and 5) the decision at the centre: the options, what mattered then, what happened, how you know, what you would change; credit STAR as trainers' shape, spend most words on what you did and why; a story where something went wrong and you changed course is a strong story. 1.5 quiz with one AI check. 1.6 gate: one owned story (own or Hadeel's Line A).
- **Gate 1 drill:** title "Something you owned", focus `[ownership, storytelling]`, context `project`, maxTurns 10, whyDepth 3. Opening, for example: "Tell me about one piece of work you owned from start to finish. What was the problem, and what was your part?"

**Module 2, Impact with honest numbers (writer A).** 2.1 Leen's "50 percent faster" and the founder's "from what?". 2.2 (finding 6) a number needs a before, an after, a time window and a source; percentages without a base invite "from what?"; never "always quantify". 2.3 **Find your numbers** (sponsor request; course method, no research claim): many fellows never ran a query or looked at their logs or bills, so they do not know their impact. Where the evidence lives, for technical and business work: a count from the database (orders, sign-ups, records processed), logs and API call counts (errors, failed payments, response times), analytics (visits, finished sign-ups), bills (cloud cost before and after, hours of paid tools), the support inbox (complaints a week), time records (hours spent before and after), and people's words (what a client or user said, as words, not a number). Business impact (money, users, time) and technical impact (speed, errors, cost) both count; say which. Rules: ask your lead before you query data, only use data you are allowed to see, never paste private data into the AI interviewer, and write each number with its source. If you cannot get the number now, it becomes an honest gap. 2.4 (finding 6) attribution: how much was yours (other changes, the season, the team), a comparison when you have one; estimates labelled as estimates with how you got them; "I did not measure that, and here is what I would measure"; why honesty is the strategy that survives the next why (lie detection near chance, phrased as the dossier says), never fear. 2.5 quiz with one AI check. 2.6 gate: two stories from the bank with honest numbers or gaps (own or Hadeel's Lines B and the bakery).
- **Gate 2 drill:** title "What changed because of your work", focus `[impact, ownership]`, context `project`, maxTurns 10, whyDepth 3. Opening, for example: "Pick one piece of your work that made a difference. What changed because of it, and how do you know?"

**Module 3, Every resume line survives five whys (writer B).** 3.1 Karam's checkout line. 3.2 (finding 4) the why chain: from factory problem-solving (Ohno as allowed), used by founders on your resume; it finds one chain, real problems have several causes; stop at a decision you made or a fact you checked; five is a habit, not a rule; chains that end at blame or a guess. 3.3 (finding 4) people explain their own choices with reasons that sound right (as the dossier phrases Nisbett and Wilson), hindsight bias (Fischhoff as allowed); write down what you knew and wanted at the time; "that was not my decision" and "my lead asked me to, and inside that I decided..." are strong answers; never invent. 3.4 the resume line audit: what I did, why, what happened, how I know, what I would change; rewrite lines that fail; keep lines short and specific; the strongest, most specific line first (U1 phrasing, never "six seconds"). 3.5 quiz with one AI check. 3.6 gate: the audited resume and one line defended through four whys (own or Hadeel's Lines A to D, with D rewritten).
- **Gate 3 drill:** title "Your resume, line by line", focus `[resume, five-whys]`, context `resume`, maxTurns 12, whyDepth 5. Opening, for example: "Pick the line on your resume you are proudest of. What exactly did you do?" The privacy line matters most here: remove names, contact details and client names before pasting.

**Module 4, Case questions aloud (writer B).** 4.1 Mais's ten ideas. 4.2 (findings 2 and 9) a case question is a "what would you do if" question; it tests how you think; clarify (one to three questions about the goal, users, time and constraints), say assumptions aloud, ask for a short pause to think; these are practice advice from interview coaches and this course, not research. 4.3 (finding 9) two or three options, not ten; cost, time, risk and what you give up; no named consulting frameworks. 4.4 (finding 9) decide in one sentence, the number you would watch, its baseline, the result that would change your mind, the assumption that matters most and how to check it; lead with the recommendation. 4.5 quiz (no AI check required; one is welcome). 4.6 gate: one case worked aloud (Hadeel's tutoring case, or a case from a team the learner wants to join, described without names).
- **Gate 4 drill:** title "A problem the team has now", focus `[case-study, impact]`, context `none`, maxTurns 10, whyDepth 3. Opening, for example: "Our small online tutoring service got 300 new sign-ups a month on average. Last month it got 200. You start next week. How would you work out what to do?" (Hadeel's case.)

**Module 5, The best technical thing you did (writer C).** 5.1 Yazan's jargon and the engineer's "why not just run it at night?". 5.2 choosing the story (finding 10): your own decision, five whys deep, recent, a measured result or an honest gap; the shiniest tools are a trap; non-engineers choose the most technical decision they made (a designer's prototype test, an operations person's spreadsheet automation). 5.3 (finding 10) the curse of knowledge (credit as the dossier allows), people overestimate how clear their writing is, which matters in a text interview; the founder version in under a minute: the problem in user terms, what you built in one sentence, the key choice, the result; founders who write about hiring say they turn away candidates who cannot explain their project plainly. The tapping study only without numbers (open decision 11), or leave it out. 5.4 the engineer version (sponsor request): "why this and not that?", "what happens if it fails?", "what if ten times more users come?", "how did you test it?", "what would you do differently?"; answer with the decision you made and the test you ran; "I did not test that" is honest and leads to how you would; let the engineer pull you deeper instead of saying everything at once. 5.5 quiz with one AI check. 5.6 gate: the founder version and the engineer version (own or Hadeel's Line C).
- **Gate 5 drill:** title "The best technical thing you did", focus `[best-technical, five-whys]`, context `project`, maxTurns 10, whyDepth 4. Opening, for example: "What is the best technical thing you have done? Explain it first the way you would to me, a founder who does not write code."

**Module 6, Strengths, weaknesses and how you come across (writer C).** 6.1 Nour's "perfectionist" on a video call. 6.2 (finding 7) people judge themselves more accurately on narrow, checkable skills than broad ones; strengths narrow, with a recent example and what someone else said or saw; the Dunning-Kruger correction as the dossier phrases it, at most one paragraph. 6.3 (finding 7) the humblebrag study in its context (written answers by students); a real weakness that matters for the work, an example, what you are doing about it; acceptable worked weaknesses are skill and habit weaknesses (asking for help late, showing work late, underestimating testing time), never health, family or hardship. 6.4 (finding 8 and 12) first impressions start early and colour the first answers (no seconds figure); video calls can lower ratings, so test your camera, light and sound and have a plan for a weak connection; accent: one plain paragraph as the dossier phrases it, then what the learner controls; nerves are normal and nervous candidates did as well in the job; "Let me think for a moment", "Do you mean...?", short sentences, one idea per sentence. 6.5 quiz. 6.6 gate: one strength with evidence and one real weakness with a plan (own or Hadeel's).
- **Gate 6 drill:** title "Strengths and weaknesses", focus `[strengths-weaknesses, storytelling]`, context `none`, maxTurns 10, whyDepth 3. Opening, for example: "What is one real strength you bring to a small team? Tell me about one time it showed."

**Module 7, The full interview (writer D).** 7.1 Tala's first and last feedback side by side: what changed (flags fell), what the feedback got wrong (praised a long answer with no number), and what she does next. 7.2 reading feedback critically (finding 11, learner wording): AI tools tend to agree with you and to like long answers; check every flag against your own words; ask your mentor when you disagree; compare the same flags across drills; find the gap in your story bank (for example no story with a number, or no story you owned end to end); fill it honestly: measure something you can measure now, ask a past lead or client for a fact, or, if you have no owned end-to-end story, build a small project around a real need of your own or of people near you, and own it from the problem to after it ships. The course never gives the project idea; it gives the questions to find one (what do you or people near you do by hand every week, what breaks, what would you check first). 7.3 mixed review: five fresh answers from all six modules; which quality is missing. 7.4 the capstone (section 9). 7.5 course gate: checklist across the course, `## Your interview kit` (one line per tool: one time, my part, the decision, an honest number, the real reason, the case shape, the two technical versions, a strength and a weakness with evidence, time to think), the learning log including "look back at the story you wrote in gate 1: what would you change now?", and an openquestion: the plan for your next real interview (which three stories you will lead with, the weakest resume line and what you did about it, and the one gap you are filling), with a short rubric. No AI drill in 7.5 (the capstone holds the full interview).

## 9. Capstone (7.4, Build, 80 minutes)

The fellow builds **their own story bank and audited resume and runs one full practice interview**, or uses **Hadeel's provided material**, always available so nobody has to share their own resume. The chapter teaches the four parts with a worked example on a different fellow (from writer D's pool), includes a ```mermaid diagram (how the parts feed the defence), a rubric with Met, Partly and Not yet per line and a pass rule, the defence questions, the full AI interview, and the open question with `minWords: 250`:

1. **The story bank:** five owned stories, one short paragraph each: the time, your part, the decision, the number with its source or the honest gap, what you would change. At least one story is your best technical work (both versions) and at least one shows a weakness and what you did about it.
2. **The audited resume:** each line checked (what, why, result, how you know); the two weakest lines rewritten, with the old and the new line.
3. **One full practice interview:** the AI interview below (all eight focus areas, your resume as context with names removed), or the written version: answers to six provided questions (one per focus area of modules 1 to 6) with the two follow-up whys you expect for each and your answers.
4. **Reading the feedback:** which flags appeared, one you agree with and what you will change, one you question and why, and one gap in the story bank with a plan to fill it.

The **defence** (five minutes with a mentor, after submission): the mentor picks one resume line and one story and asks four whys on each. Defence questions: Which part of this was yours alone? Where does that number come from? Why that option and not the other? What would you do differently? What did the feedback get wrong?

**Hadeel's provided material** in the chapter: her resume (Lines A to D, freelance, volunteer, from section 5) and a short provided transcript of a full practice interview (about eight exchanges, in block quotes) with its feedback (strengths, weaknesses with fixes, next steps). The provided feedback makes **one mistake**: it praises her long, careful answer about the bakery work as "strong impact" although it has no number and the honest gap was the right answer to keep; or it accepts the 18 to 11 percent claim without the attribution she gave. Choose one; the mentor key names it.

- **Capstone drill:** title "Full practice interview", focus `[ownership, impact, five-whys, resume, best-technical, storytelling, case-study, strengths-weaknesses]`, context `resume`, maxTurns 20, whyDepth 3, required false, with a rubric that covers all five qualities, the case shape, the two technical versions and the five flags.

The `modelAnswer` holds the mentor key for Hadeel's case (her five stories, the two weakest lines and their rewrites, the feedback's mistake, what to accept) and then a model answer for a different fellow.

## 10. Before you hand back

- Every file in your modules exists with the exact title and the roadmap minutes.
- Zero U+2014 and U+2013 characters, in chapters and in canvas files.
- Every number and case checked twice; every MCQ blind re-answered.
- From `server/`: `node node_modules/tsx/dist/cli.mjs scripts/validate-course-source.ts --course founder-interviews` and `node node_modules/tsx/dist/cli.mjs scripts/audit-course-structure.ts --course founder-interviews` with no errors or warnings in your files. (Unregistered canvas slugs will fail validation until the orchestrator registers them; report them, do not edit the registry.)
- From the repo root: `node agent-ip/scripts/audit-course.mjs courses/founder-interviews` with no flags on your chapters (Learn chapters will show no interactive element until registration; that is expected).
- From `frontend/`: `node node_modules/vitest/vitest.mjs run tests/unit/canvas/<slug>.test.ts` for each slider canvas you made.
- Edit only your module folders, your canvas folders and your canvas tests. No git commands that change anything. Do not install packages. Use the node commands above.
- Report: files written, canvas slugs and renderers, prose words per chapter from the audit, any dossier claim you were unsure how to phrase.
