---
artifact: course-brief
course: build-with-ai
working_title: "Learn and Build with AI: An Enabler, Not a Replacement"
version: 1
status: accepted by sponsor (G0), from the sponsor's intake on 2026-10-23
owner: Zeeshan (architect and sponsor)
target_publish: after G2B sign-off and human review
---

# Course brief: build-with-ai (course 13)

## Why this course exists

Fellows hear two loud stories about AI. One says AI does everything and will replace people. The other says AI is a threat to avoid. Both stories lead to the same result: fellows either hand their thinking to a chat tool or refuse a tool that could make them faster. The sponsor sees a third path. AI lacks a lot of context, data and obvious local facts, so people still make the calls. Used well, AI makes searching, research, learning, visualising and building much faster. Yet very few people turn that speed into strong projects. The scarce skill is now to build a very good project and to understand every part of it.

This course teaches that third path: how to learn deeply with AI, how to run daily labs and build a strong project over months, and how to share the work honestly.

## One sentence

Fellows learn to treat AI as an enabler: they use AI tools to learn a topic from several angles, plan and run daily labs posted to GitHub, build a project they fully understand over a six-month plan, and share weekly progress honestly, while they keep the decisions, the checking and the credit for themselves.

## Where it sits (overlap check, 2026-10-23)

| Course | What it already teaches about AI | How course 13 relates |
|---|---|---|
| 9, Think Clearly (`logic-building`), module 7 "Thinking with AI: ask well, check always" | Why AI can sound sure and be wrong; clear instructions in five parts; checking an answer three ways; when not to use AI | **Before course 13.** Course 13 assumes these habits and refers back to them in one or two sentences; it does not teach the five-part instruction or the three checks again. It moves from "check one answer" to "use AI across weeks of learning and building". |
| 8, AI Engineering Interview (`ai-engineering-interview`) | How to build AI systems: RAG, agents, evaluation, production, and how to defend them in interviews | **After course 13.** Course 13 does not teach how AI works inside or how to build AI products. It teaches how to use AI tools as a learner and builder of any project. A fellow who finishes 13 has the learning and project habits that course 8's capstone and interview deep dive assume. |
| 10, Why Things Happen (`cause-and-effect`) | Testing causes, debugging step by step | Course 13's "break it on purpose" lab habit reuses the one-change-at-a-time idea in one sentence; no overlap in content. |
| System design course (in progress, `system-design`) | System design concepts and labs | Course 13 uses a small URL shortener lab as its running example of a daily lab. It teaches the lab habit, not system design. |

Position: course 13 sits **between course 9 and course 8**, and before the system design course: the "how to learn and build" course of the tech track.

## Learner

- **Who:** Gaza fellowship fellows building careers in tech, many aiming at remote work, from mixed backgrounds.
- **Prior knowledge:** plain English reading; everyday phone and computer use. Course 9 module 7 helps and is referred to, not required. Modules 1 to 3 need no coding. Modules 4 and 5 assume the fellow is starting a tech project and can use a terminal a little; every task there has a provided case for fellows who cannot run tools yet.
- **Language:** Arabic first, English second. Short sentences, common words, every term defined on first use.
- **Device and connection:** mostly phones, weak or expensive data, power cuts; some have a laptop part of the time. Light pages, no images, every interaction saves on its own. Audio and downloads are always optional and their size is stated.
- **Time available:** about 20 hours: about 16 hours of chapters (1 hour a day over 3 to 4 weeks) and about 5 hours of short daily labs over two weeks for the capstone. (At G2A and G5 this became about 22 hours; see `curriculum-roadmap.md`.)
- **Motivation:** build a portfolio project that gets them hired; stop feeling that AI makes them useless; learn faster on a phone between power cuts.
- **What they will do with the result:** a six-month project plan they follow after the course, a public GitHub lab log, and a habit of weekly write-ups that recruiters and clients can see.

## Outcome

By the end, the learner can:

1. **Explain** what an AI tool does not know in a given task (context, private data, local and recent facts, the obvious) and **name** the decisions a person must make and own.
2. **Choose** an AI tool by the job it does, **check** its current free access and terms, keep their work in files they own, and **decide** what they must never paste or upload.
3. **Learn** a topic from several angles with AI (plain explanation, picture, worked example, failure case, build or teach) and **test** themselves with retrieval and spaced review instead of rereading.
4. **Turn** sources into an audio overview for listening on the go, **read** the sources after, **check** AI summaries against the source, and **keep** structured notes in their own words.
5. **Plan and run** a daily lab with an AI chat: study, build, see it run, break one part on purpose, and **log** it on GitHub.
6. **Write** a six-month project plan with a large share of learning time, one new area per week, weekly resources they checked exist, and open-source projects they studied and reused within their licences.
7. **Explain** every part of their project, including the trade-offs, without notes (the explain-back rule).
8. **Turn** weekly progress into an honest public write-up adapted for more than one platform, saying what AI helped with.

## Demo

In five minutes the fellow walks a mentor through their capstone: the six-month plan and this week's learning plan, the GitHub lab log with at least ten lab days, one lab where they broke a part on purpose and explained what happened, one page of their structured notes, and their public write-up with its AI disclosure line. The mentor then asks them to explain one part of the project without notes.

## Product scope

There is no software product. Read as **course scope**:

- **Must have:** the roadmap's modules; a case opening every module; a gate with checklist, learning log, an open question and a rubric from module 1; a quiz in every module except the first and the last; a registered canvas in every Learn chapter (agent-ip v0.4); the capstone with a provided case; "check the AI's output" items in at least four quizzes.
- **Should have:** a running example that grows through the course (one fellow's six-month project with a URL shortener lab inside it); a mixed review before the capstone.
- **Out of scope:** see Non-goals.

## Production bar

Not a code production bar. The equivalent bar:

- Every graded key follows from a habit or rule taught in the course, or from arithmetic, and is re-answered blind by an independent reviewer.
- Every claim about learning science (retrieval, spacing, interleaving, fluency illusions, note-taking), about AI errors, and about each named tool is backed by the research dossier, with access dates for tool facts.
- **Tools are named, features are not promised.** Chapters name tools as examples "at the time of writing" and teach the job and the habit; they never promise a feature, a limit or a price that may change, and always offer a fallback.
- No invented statistics. Scenario numbers are labelled as the scenario's own.
- `content:validate:source`, `content:audit` and `agent-ip/scripts/audit-course.mjs` results recorded; import and a click-through at 375px and desktop, light and dark.

## Variants

Not applicable: a foundation course has no product to vary. Learners choose their own project; the provided capstone case covers fellows without a project or a laptop. Project tracks (web app, data, mobile) can follow later as an instructor decision.

## Constraints

- **Stack:** the buildment reader and existing blocks; canvases on the registered renderers (sequence, state machine, factor, slider), each with a spec on template 14A and tests where it computes.
- **Budget:** about 20 hours, the top of the soft-skills band and well under a short tech course. Chapters meet the full agent-ip prose minimums (1,200 and 700 words).
- **Platform limits:** state machine grids at most 3 columns by 2 rows; no canvas in gates or quizzes; catalog categories are only tech and soft-skills.
- **Tool names (sponsor decision):** earlier courses avoided product names. This course is about tools, so the sponsor decided to name them (NotebookLM, Gemini, ChatGPT, Claude, GitHub, OneNote and others). Recorded in `decision-log.md`. The research dossier checks each tool's current features, free availability and access from Gaza, with access dates.
- **Legal and privacy:** no real people's work shown as theirs unless sourced; neutral topics only (no politics or war as case material); never ask fellows to share personal hardship; teach what not to paste into AI tools (client data, passwords and keys, other people's personal data).
- **Honesty:** the course teaches saying when AI helped, and the course itself follows the fellowship rule of no AI attribution in its own commits and PRs (that rule is about the people who own the work, not about learners' disclosure).

## Non-goals

- **Not how AI works inside** (no transformers, training or tokens beyond one plain sentence): course 8.
- **Not building AI products** (RAG, agents, evaluation): course 8.
- **Not prompt engineering as a subject.** Clear instructions are course 9 module 7; this course adds only the instructions specific to tutoring, planning and source-grounded tools.
- **Not a coding course or a system design course.** The URL shortener lab is an example of the lab habit; the course does not teach Docker, databases or caching beyond what the lab example needs.
- **Not a review of which AI tool is best.** No rankings; tools are examples of jobs.
- **Not a writing or video production course.** Sharing the work covers one honest weekly write-up and how to adapt it, not marketing or audience growth.

## Success signals

- Gate answers show decisions the fellow made, not decisions handed to a tool.
- Capstone lab logs show a part broken on purpose and explained, not only happy paths.
- Fellows explain their project's trade-offs without notes in the five-minute walk-through.
- Mentors see weekly write-ups continue after the course, with an AI disclosure line.
- Mentor review time per capstone stays near 20 minutes with the rubric.
