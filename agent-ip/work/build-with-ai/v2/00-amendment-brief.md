---
artifact: course-brief-amendment
course: build-with-ai
amends: 00-course-brief.md (version 1)
sponsor_working_title: "Fear Less, Build More: Winning With AI as an Engineer"
version: 2
status: accepted
owner: Zeeshan (architect, human sponsor)
target_publish: after G2B instructor sign-off and G7 delivery lead approval
---

# Course brief amendment (v2): build-with-ai

Source of intake: the sponsor's request of 2026-10-25 for "course 17" ("rich, practical and confidence-building"), followed the same day by the sponsor's decision, after reading course 13, to merge it into course 13: "this is good we can merge what i was talking about in it". So this is an **amendment to course 13**, not a new course. Version 1 of the brief (`../00-course-brief.md`) still holds for everything this amendment does not change.

The sponsor listed seven areas: fear versus reality, growing fast, using AI with judgment, the toolbelt for showing and shipping, content the human way, where humans still win, and a 30-day capstone. This amendment adds them to course 13 as new modules and chapters, without repeating what course 13 already teaches. The research dossier v2 (G1) checks every new claim before the amended roadmap.

**Course title:** kept as "Learn and Build with AI: An Enabler, Not a Replacement" (open decision for instructors: a subtitle change). **Slug:** kept as `build-with-ai`. The sponsor's working title for the new material, "Fear Less, Build More", is used as a theme line in the new module 1 chapters only; "Winning" is dropped because it promises an outcome the course cannot guarantee.

## One sentence

(Amended course.) Fellows keep everything course 13 already gave them (AI as an enabler, a toolkit with rules, learning deeply, daily labs, a six-month project, sharing honestly) and add: they replace fear of AI with an evidence-based picture of what AI changes and what it does not, learn to use AI with judgment (slow down, compare several AI answers, question the common default, give context), use a toolbelt of AI tools to ship and show their work honestly, and carry out the first 30 days of their six-month plan as an "AI advantage" plan inside the existing capstone, ending in a shipped demo, one published piece of content and a short defence.

## Learner

- **Who:** Dev Weekends fellows in Gaza, mostly early-career software engineers (backend, frontend, mobile, data), aiming at remote work with international teams, founders and clients.
- **Prior knowledge:** as in v1. The new modules build on course 13's existing chapters (privacy before you paste, tools by job, learning with AI, daily labs, the six-month plan, sharing honestly) and refer back to them instead of teaching them again. The judgment module assumes the learner can write code and use Git and GitHub.
- **Language:** Arabic first, English second. Plain English, short sentences (about 20 words or fewer), every term explained on first use, no idioms.
- **Device and connection:** mostly phones on weak, expensive data, with power cuts; a laptop part of the time. Light pages, no autoplay video or audio, progress saved often. Every tool step has a browser path and a fallback.
- **Time available:** about 1 hour a day for 4 to 5 weeks of chapters, then the 30-day plan (about 1 hour a day) that overlaps with the last weeks.
- **Motivation:** many are anxious that AI will take the jobs they are training for. They see headlines about layoffs and demos that look like magic. They want to know what is true, and what to do about it.
- **What they will do with the result:** keep the research and context habits for every technical decision; keep shipping public work with the toolbelt; follow their 30-day plan and then plan the next one.

## Outcome

By the end, the learner can:

1. **Separate** fear from evidence: explain why AI looks more capable than it is (marketing, demos, how people read fluent text), and state what current labour data, studies and company behaviour show, with the limits of that evidence.
2. **Explain** why "fewer people doing more work" is a more accurate picture than "AI replaces engineers", and **name** what puts an engineer in the group that does more with AI.
3. **Slow down to understand:** research before asking, put the same question to two or more AI assistants, compare the answers, validate the claims against primary sources, and push for the full picture ("now tell me what you left out").
4. **Explain** why an AI assistant tends to give the common first answer (models produce likely text, and the most common option dominates what they learned from), and **change** the answer by giving context: workload, scale, team, cost, licence.
5. **Defend** a context-dependent technical choice in at least one of four researched cases: a time series database (Prometheus or VictoriaMetrics), a cache (Redis or Valkey), "the fastest database" for a stated workload, and the Outbox pattern for sending events to Kafka.
6. **Grow fast** with judgment: learn and adopt a new tool or topic quickly, build more public work (products, series, repositories), plan a deep, collaborative project of about six months, and name the soft skills that let them stand in a team that ships with AI.
7. **Use** an AI toolbelt to show and ship: visuals and demos, listening and short lessons, voice narration in their own voice with consent and disclosure, CLIs and connectors (GitHub CLI, a cloud cost view with read-only access), and AI critique of their own work turned into fixes.
8. **Create** content that people find useful, with AI help, that still sounds like them: real stories and opinions, a commit history built in meaningful steps, and no fake activity or metrics.
9. **Decide** where a human must lead (judgment, context, taste, ownership, trust, relationships, accountability) and when not to use AI at all.
10. **Carry out and defend** the first 30 days of their six-month plan as an AI advantage plan: one deep project or series, a shipped demo, one published piece of content, and a short defence with the AI interviewer or in writing. This extends course 13's capstone (the six-month plan, weekly learning plan, lab log, notes page, write-up and five-minute walkthrough); it does not compete with it.

## Demo

The course 13 walkthrough stays (plan, weekly plan, lab log, notes, write-up). In the same five minutes the fellow also shows: the first 30 days of the plan carried out, in the lab log; the shipped demo (a link that opens on a phone, or a short recording); the published piece of content; one decision from the plan researched with two AI assistants and primary sources, with the context that changed the answer; and a short defence (the AI interviewer's transcript and feedback, or the written defence). The mentor then asks one "why not the other option?" question about the decision.

## Product scope

There is no software product to build in the course itself. Read as **course scope**:

- **Must have:** the roadmap's modules; a case opening every module; Learn chapters in beats with at least one playable canvas each (agent-ip v0.4 and v0.5); separate practice chapters after the teaching chapters they practise (sponsor rule: teach, then practise in its own chapter or module; some chapters need no lab); a quiz in every teaching module with "check the AI's output" items; a gate with checklist, learning log, open question and rubric in every module; the capstone with a provided case for fellows without a project, a laptop or a public profile.
- **Should have:** a running cast that grows through the course; a mixed review before the capstone; the existing AI interview block for the capstone defence, with a written option.
- **Out of scope:** see Non-goals.

## Production bar

Not a code production bar. The equivalent bar:

- Every claim about jobs, labour data, studies, company behaviour, AI model behaviour, databases, caches, the Outbox pattern and every named tool is backed by the research dossier with an access date. Contested evidence is taught as contested.
- **Honest, not hype, not fear.** The course never says "AI will replace developers" and never says "AI is useless". Where evidence shows real harm (for example fewer entry-level openings in some fields), the course says so plainly and then shows what the learner can do.
- **Tools follow course 13's sponsor decision:** named as examples "at the time of writing" with a check date, two per job where two exist, a browser path and a fallback, never promising features, limits or prices, and noting what is reachable from Gaza as the dossier states it.
- **Engineering examples are fair.** Each database, cache and pattern comparison states when each option wins, cites primary sources (project docs, licences, benchmarks with their conditions), and avoids "X is faster" without a workload.
- Every graded key follows from the course or from arithmetic, is re-answered blind by a model of a different family, and passes the option length and position checks.
- `content:validate:source`, `content:audit`, `agent-ip/scripts/audit-course.mjs`, canvas tests, a scratch import and a click-through at 375px and desktop, light and dark.

## Variants

Not applicable: a mindset and practice course has no product to vary. Learners choose their own deep project or series for the capstone; the provided case covers fellows without one. Tracks (backend, frontend, data) can follow later as an instructor decision.

## Constraints

- **Stack:** the buildment reader and existing blocks; canvases in `packages/learning-ui/src/canvas` on the shared renderers and primitives (scene, sorter, factor, sequence, state machine), with new shared primitives only where several chapters and later courses can reuse them; the existing `aiinterview` block (merged in #62 and #68) for the defence.
- **Budget:** course 13 is 22 hours. The new material adds about 18 to 21 hours of chapters; the 30 days of the plan overlap with the lab days already counted. The amended roadmap states the exact figure and gives instructors a way to make some new modules optional.
- **Platform limits:** no canvas in gates or quizzes; quiz chapters hold activities only; the catalog categories are tech and soft-skills; the AI interview needs the learner's own OpenRouter key, so every step that uses it has a written path that completes the step.
- **No new generic AI practice component.** The sponsor wants that built later. The decision log records where it would help.
- **Legal and ethics:** voice cloning only of the learner's own voice, with consent, disclosure and fraud risks taught; never paste secrets or client data into a chat; read-only cloud access first; no fake activity, stars, followers or metrics; no real person shown as doing something unless sourced.
- **Respect:** neutral settings; no politics or war as case material; hardship only as ordinary background; never ask a fellow to share personal hardship.

## Cross-links (link, do not repeat)

- **Inside this course (course 13's existing chapters):** tools by job, privacy before you paste, learning with AI, listen then read, daily labs, a six-month project plan, slow down for trade-offs, sharing honestly with an AI-use line. New chapters refer back to them by number.
- **Course 16, Your Career Brand** (`career-brand`, in progress): resume, LinkedIn, case study, blog, publishing across channels.
- **Course 14, The Founder Interview** (`founder-interviews`): telling stories you owned, honest numbers, five whys, the AI interviewer.
- **Course 8, Cracking the AI Engineering Interview** (`ai-engineering-interview`): how LLMs work, building AI systems.
- **Course 9, Think Clearly** (`logic-building`): checking one AI answer, clear instructions, reasoning.
- **Courses 5 and 6** (collaboration; ownership): soft skills for a team that ships.
- **The system design course** (`system-design`): deeper treatment of time series data, caching and the Outbox pattern.

## Non-goals

- **Not how LLMs work inside** beyond one plain picture of "the model picks likely next words": course 8.
- **Not a second copy of course 13's existing chapters.** Where new material touches privacy, tools by job, listening, labs, the six-month plan or disclosure, it links back and adds only what is new.
- **Not resume, LinkedIn or blog mechanics:** course 16.
- **Not a system design course:** the database, cache and Outbox cases teach "context changes the answer", with links to the system design course for depth.
- **Not a ranking of AI tools** and not a promise of any tool's features.
- **Not a growth-hacking course:** content is taught as useful, honest work; virality is described honestly, never promised.
- **Not career or financial advice for a specific person.** Labour data is described as data, with its limits.

## Success signals

- Gate answers show decisions with context, not first answers pasted from a tool.
- Practice chapters show two or more AI answers compared and at least one claim checked against a primary source.
- Capstones ship a real demo and a real piece of content, with a commit history built in meaningful steps.
- Fellows answer "why not the other option?" about their own decision without notes.
- Fellows report less fear and a concrete next 30 days (learning log in the final gate).

## Where the new material goes (proposal for the amended roadmap)

| Sponsor area | Where it lands in course 13 |
|---|---|
| 1. Fear versus reality | Module 1, three new Learn chapters before "what AI does not know", plus a quiz (module 1 had none) |
| 3. Judgment (the heart) | Two new modules after daily labs: "Slow down to understand" and "Context changes the right answer"; the existing "slow down for trade-offs" chapter links to them |
| 2. Grow fast | A new module after the six-month project: learn and adopt fast, build more to show, go deep with a team, soft skills |
| 4. The toolbelt | A new module after "grow fast", before sharing |
| 5. Content the human way | The sharing module grows: three new Learn chapters, a practice chapter, its own quiz and gate |
| 6. Where humans still win | A new final module that also holds the mixed review, the capstone and the course gate |
| 7. The 30-day plan | Inside the existing capstone: the first 30 days of the six-month plan, carried out, plus a defence chapter |

Module and file numbers change. Course 13 has never been released (`repositoryPublish` is not set), so no learner history depends on the old paths; every lesson gets a stable `key` in `course.yaml` from this version on.
