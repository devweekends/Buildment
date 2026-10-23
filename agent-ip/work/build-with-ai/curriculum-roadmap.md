---
artifact: curriculum-roadmap
course: build-with-ai
version: 1
status: draft (G2A); G2B instructor sign-off pending
owner: curriculum-architect
instructors_reviewed: []
drafted_before_roadmap: true
research: research.md (G1, accepted 2026-10-24 with all 16 outline changes applied)
---

# Curriculum roadmap: Learn and Build with AI: An Enabler, Not a Replacement

> **G2B is pending.** Chapters were drafted before instructor sign-off, on the sponsor's standing instruction (see `decision-log.md`), as with courses 3 to 10. If instructors change this roadmap, the chapters will be revised to match.

## In one paragraph
A practical course on using AI as an enabler, not a threat and not a replacement. Fellows see what an AI tool does not know and which calls stay theirs; pick tools by the job and keep their work in files they own; learn a topic deeply from five angles, with recall and spaced review instead of rereading; turn sources into audio for learning on the go, then read them and check what the audio got wrong; keep structured notes; run small daily labs (study, build, break one part on purpose, write) and log them on GitHub; plan a strong project over six months with a large share of learning, one new area a week and open-source projects studied within their licences; and share weekly progress honestly. The running example is Yara, a fellow building a link shortener over six months. The capstone is the real start of the fellow's own project, or a provided case, walked through with a mentor in five minutes.

## Learner and entry prerequisites
- **Learner:** Gaza fellowship fellows building careers in tech, mixed backgrounds, second-language English, mostly on phones with weak data and power cuts.
- **Prior knowledge:** plain English reading and everyday phone use. Course 9 module 7 (Thinking with AI) helps and is referred back to. Modules 1 to 3 need no coding; modules 4 and 5 assume a tech project and a little terminal use, with a provided case at every task for fellows who cannot run tools yet.
- **Time:** about 21 hours: about 16.6 hours of chapters (995 minutes) and about 4 to 5 hours of short daily labs over two weeks for the capstone.
- **Entry diagnostic:** none graded; the predict in 1.1 sets the tone.

## Where it sits
After course 9 (whose module 7 teaches checking one AI answer) and before course 8 (building AI systems) and the system design course. It does not repeat course 9's five-part instructions or three checks, and it does not teach how AI works inside.

## Outcomes
| # | Outcome (observable verb) | Evidence |
|---|---|---|
| O1 | Explain what an AI tool does not know in a task, name the calls a person must make and own, and say how AI use can help or harm learning | Quizzes in 1.2 to 1.5; gate 1; mixed review 6.4 |
| O2 | Choose a tool by its job, check its free access and terms, keep work in owned files, and decide what never to paste | Quiz 2.5; gate 2 (toolkit page) |
| O3 | Learn a topic from five angles, test themselves with recall, and space reviews | Quiz 3.7; gate 3; capstone notes page |
| O4 | Turn sources into audio, read the sources after, check summaries against them, and keep structured notes in their own words | Quiz 3.7; gate 3; capstone notes page |
| O5 | Plan and run a daily lab with an AI chat, break one part on purpose, and log it on GitHub | Quiz 4.6; gate 4; capstone lab log |
| O6 | Write a six-month plan with a large learning share, one area a week, checked resources and open source used within its licence | Quiz 5.6; gate 5; capstone plan |
| O7 | Explain every part of their project and its trade-offs without notes | Chapter 5.4; capstone walk-through |
| O8 | Turn weekly progress into an honest public write-up for more than one platform, with an AI-use line | Chapter 6.2 and 6.3; capstone write-up |

## Shape
| Part | Focus | Modules | Minutes | Evidence at the end |
|---|---|---|---|---|
| 1 | Think straight about AI | 1 to 2 | 275 | A task split into AI help and your calls; a toolkit page |
| 2 | Learn deeply | 3 | 180 | One topic from five angles, a recall test, a notes page |
| 3 | Build | 4 to 5 | 310 | Lab day 1 on GitHub; month 1 of a six-month plan |
| 4 | Share and capstone | 6 | 230 | The capstone package and the five-minute walk-through |

## Module and chapter sequence
Minutes are each chapter's `estimatedMinutes`. Total: 995 minutes, about 16.6 hours of chapters, plus about 4.5 hours of daily labs (lab days 2 to 10, about 30 minutes each) between gate 4 and the capstone. `estimatedHours: 21`, one hour over the requested 12 to 20 because G1 added an evidence chapter (1.4); open decision 2 (five lab days) would bring it to about 19.

### Module 1: AI as an enabler, not a replacement (145 min)
| # | Chapter | One-line outcome | Type | Min | Canvas |
|---|---|---|---|---|---|
| 1.1 | Set the scene | Three fellows, three stories about AI | Read | 20 | none |
| 1.2 | What AI does not know | Name the missing context in a task | Learn | 25 | `ai-missing-context` (sequence) |
| 1.3 | You make the call | AI proposes; a person decides and owns | Learn | 25 | `who-makes-the-call` (state machine) |
| 1.4 | AI can help or harm your learning | Answers weaken practice; hints and guidance help | Learn | 25 | `answers-or-hints` (state machine) |
| 1.5 | Plenty of AI, few strong projects | Why an understood project beats a big one | Learn | 25 | `big-app-or-understood-app` (factor) |
| 1.6 | Checklist and learning log | One task split into AI help and your calls | Gate | 25 | none |

### Module 2: Your AI toolkit and its rules (130 min)
| # | Chapter | One-line outcome | Type | Min | Canvas |
|---|---|---|---|---|---|
| 2.1 | Set the scene | A lost month of chats; a pasted client file | Read | 20 | none |
| 2.2 | Before you paste: privacy and checking | What never goes in; the training setting; check before use | Learn | 25 | `before-you-paste` (state machine) |
| 2.3 | Jobs, not tools | Two example tools per job; does it open here, at my age, on my phone? | Learn | 25 | `pick-a-tool-for-the-job` (factor) |
| 2.4 | Habits that outlast any tool | Own files, saved prompts, a fallback | Learn | 25 | `keep-work-in-your-files` (sequence) |
| 2.5 | Your AI toolkit | Five graded cases with an AI check | Check | 10 | none |
| 2.6 | Checklist and learning log | Your toolkit page | Gate | 25 | none |

### Module 3: Learn deeply with AI (180 min)
| # | Chapter | One-line outcome | Type | Min | Canvas |
|---|---|---|---|---|---|
| 3.1 | Set the scene | Understood every explanation, failed the test | Read | 20 | none |
| 3.2 | The fluency trap | Recall from memory finds the gaps | Learn | 25 | `close-it-and-recall` (state machine) |
| 3.3 | One topic, five angles | Explain, picture, example, failure, build | Learn | 25 | `five-angles-on-caching` (sequence) |
| 3.4 | Make the AI quiz you | Questions instead of answers, mixed and spaced | Learn | 25 | `ai-quiz-partner` (sequence) |
| 3.5 | Listen to meet it, read to learn it | Audio overview, then the source, then a check | Learn | 25 | `listen-then-read` (sequence) |
| 3.6 | Notes you own, in your own words | Notebook, sections, pages in files you own | Learn | 25 | `note-page-lifecycle` (state machine) |
| 3.7 | Learning with AI | Five graded cases with an AI check | Check | 10 | none |
| 3.8 | Checklist and learning log | One topic from five angles, recall test, notes page | Gate | 25 | none |

### Module 4: Daily labs (155 min)
| # | Chapter | One-line outcome | Type | Min | Canvas |
|---|---|---|---|---|---|
| 4.1 | Set the scene | Watching videos versus running labs | Read | 20 | none |
| 4.2 | The shape of a daily lab | Study, build, break, write in 30 to 45 minutes | Learn | 25 | `daily-lab-loop` (state machine) |
| 4.3 | Plan a lab with an AI chat | Ask for a plan, cut it, check commands and packages | Learn | 25 | `plan-a-lab-with-ai` (sequence) |
| 4.4 | Watch it run, then break it | Stop one part of a URL shortener and explain | Learn | 25 | `url-shortener-stop-a-part` (sequence) |
| 4.5 | The lab log on GitHub | Daily entries, clear commits, a pre-push check | Learn | 25 | `lab-log-commit-push` (state machine) |
| 4.6 | Daily labs | Five graded cases with an AI check | Check | 10 | none |
| 4.7 | Checklist and learning log | Lab day 1 on GitHub, or the provided log reviewed | Gate | 25 | none |

### Module 5: A project worth six months (155 min)
| # | Chapter | One-line outcome | Type | Min | Canvas |
|---|---|---|---|---|---|
| 5.1 | Set the scene | A weekend app and one interview question | Read | 20 | none |
| 5.2 | Why strong projects still take months | Hours, weeks and the learning share | Learn | 25 | `six-month-hours-split` (slider, built) |
| 5.3 | A weekly plan, one area at a time | Weekly areas and resources you checked exist | Learn | 25 | `week-plan-check-resources` (sequence) |
| 5.4 | Slow down for trade-offs | Compare two options; explain before you keep | Learn | 25 | `two-options-trade-off` (factor) |
| 5.5 | Learn from open source | Find, read in order, reuse within the licence | Learn | 25 | `reuse-open-source-safely` (state machine) |
| 5.6 | Planning a strong project | Five graded cases with an AI check | Check | 10 | none |
| 5.7 | Checklist and learning log | Month 1 of the six-month plan, week by week | Gate | 25 | none |

### Module 6: Share the work honestly, and capstone (230 min)
| # | Chapter | One-line outcome | Type | Min | Canvas |
|---|---|---|---|---|---|
| 6.1 | Set the scene | A quiet repository and a post that was mostly AI | Read | 20 | none |
| 6.2 | From a week of commits to an article | One write-up, adapted for two more platforms | Learn | 25 | `commits-to-article` (sequence) |
| 6.3 | Say when AI helped | An honest AI-use line and the rules where you post | Learn | 25 | `disclose-ai-help` (state machine) |
| 6.4 | Mixed review: which habit first? | Fresh cases from every module | Check | 15 | none |
| 6.5 | Capstone: the start of a strong project | The five-part capstone package | Build | 120 | none |
| 6.6 | Course checklist and your AI-as-enabler toolkit | Final checks, toolkit, look back at gate 1 | Gate | 25 | none |

## Gate evidence at a glance
| Module | Gate evidence (open question with a Met / Partly / Not yet rubric, a pass rule and a mentor key) |
|---|---|
| 1 | One real or provided task split into what AI can help with, what it does not know, and the calls that stay yours |
| 2 | A toolkit page: one tool per job with its free access checked and dated, a fallback, where work is saved, and three privacy rules |
| 3 | One topic learned from five angles, a recall test with the gaps found, and one notes page |
| 4 | Lab day 1: plan, what ran, what was broken on purpose and why, and the GitHub link; or a review of a provided lab log |
| 5 | Month 1 of the six-month plan, week by week, with checked resources and one open-source project to study |
| 6 | Course gate: final checklist, the habits toolkit, and a look back at the gate 1 answer |

## Capstone (6.5, Build, 120 minutes plus the daily labs)
The fellow hands in five parts for **their own project**, or for **a provided case** (always available, so nobody needs a laptop, a project or a public profile):
1. **A six-month plan:** the project in one sentence, the areas month by month, hours a week, the learning share and why.
2. **This week's learning plan:** the area, resources an AI suggested that the fellow checked exist (with how), five angles, and the recall test.
3. **A GitHub lab log with at least ten lab days** over at least two weeks, started at gate 4, with one lab where a part was broken on purpose and explained.
4. **One page of structured notes** in their own words, linked from the log.
5. **One public write-up** of a week of progress, adapted for a second platform, with an honest AI-use line.

Provided case: **Ibrahim**, a fellow who wants to build a small clinic queue app; the case gives his messy one-month plan, a ten-day lab log with three problems (no break step, a pasted secret, labs with no notes), an AI-written plan with a fake book, and a draft post that hides AI help. The fellow writes the improved plan, reviews the log, writes the notes page for one lab, and writes the post honestly (not published).

**Five-minute demo:** the plan and this week, the log and the broken-on-purpose lab, the notes page, the write-up and its AI line; then the mentor picks one part of the project for the fellow to explain without notes.

## Variants
None. Fellows choose their own project; the provided case covers fellows without one.

## Out of scope
How AI works inside; building AI products (course 8); prompt engineering as a subject (course 9 module 7); Docker, databases or caching beyond the lab example; rankings of tools; marketing and audience growth.

## Open decisions for instructors
1. **Tool names in learner text.** The sponsor decided to name tools. During research alone, NotebookLM was renamed Gemini Notebook and its limits changed. Who rechecks the tool chapter (2.3) and the dated facts each term?
6. **Fellows under 18.** Claude is 18+, LinkedIn 16+, ChatGPT needs a guardian's permission under 18. Are any fellows under 18? Chapters always give two tools per job.
7. **Testing from Gaza.** Two or three fellows should open each named tool on a phone in Gaza before publish; the dossier could not settle the mobile apps, Copilot and Perplexity.
2. **Daily lab time.** The capstone asks for ten lab days of about 30 minutes, about 4.5 hours beyond the chapters. Keep, or accept five lab days?
3. **Public posting.** The capstone write-up is public by default with a private option. Should mentors require public posting, or leave it to each fellow?
4. **Category.** `tech` (see the decision log). Instructors may prefer `soft-skills` if the course is offered to non-technical fellows.
5. **Arabic audio.** Fellows may make audio overviews in Arabic and read English sources. Is that encouraged?

## Confirmation
G2B: pending. At least two instructors sign `roadmap-confirmation.md` (template 1B) before the chapters are treated as final.
