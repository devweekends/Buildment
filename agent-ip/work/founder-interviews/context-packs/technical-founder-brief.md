---
artifact: chapter-brief
course: founder-interviews
for: chapter-writer (writer C)
version: 1
source: sponsor request of 2026-10-25
---

# Brief: the technical founder (module 5 extension)

The sponsor asked on 2026-10-25 for the course to cover the technical side of founder interviews: "case studies and why of something, why did you choose it and why did not you choose that, and why is technically correct or not technically correct", "definitely good demos", and the difference between a CEO founder, who checks values, impact and personality and "can detect" empty answers, and a technical founder, who also checks the technical side. The sponsor gave a list of architecture areas to check your own work against, with the rule "tell the truth, not conventional but rational".

The writer pack (`writer-pack.md`) still applies in full: voice, care, hard rules (no dashes, no company, product or brand names, no links), the chapter format and budgets, the assessment rules, the canvas rules, and the checks before you hand back. The revision decisions in `../qa/revision-1-brief.md` also apply (form balance, one person per name, phone-friendly rubric lists, the course pass rule, glosses on first use).

## What changes in module 5

Module 5 becomes "Technical depth and the technical founder". New layout (module dir stays `05-your-best-technical-work`):

| File | Title | Type | Min |
|---|---|---|---|
| `05.01-set-the-scene.md` | Set the scene | Read | 20 (keep) |
| `05.02-choosing-the-story.md` | Choosing the story | Learn | 30 (keep) |
| `05.03-the-founder-version.md` | The founder version | Learn | 30 (keep) |
| `05.04-the-engineer-version.md` | The engineer version | Learn | 30 (keep) |
| `05.05-why-this-and-not-that.md` | Why this and not that | Learn | 30 (new) |
| `05.06-check-your-work-area-by-area.md` | Check your work area by area | Learn | 30 (new) |
| `05.07-a-demo-they-can-open.md` | A demo they can open | Learn | 30 (new) |
| `05.08-quiz.md` | The best technical thing you did | Check | 10 (renamed from 05.05) |
| `05.09-checklist.md` | Checklist and learning log | Gate | 40 (renamed from 05.06) |

Rename the quiz and gate files with `git mv`-free moves (plain `mv`; the orchestrator commits) and update their frontmatter `lesson` numbers, every "5.5" and "5.6" reference inside module 5 (the checklist line "finished the quiz in 5.5", "Next:" lines and so on), and the 5.4 "Next:" line so it leads to 5.5. The orchestrator updates course.yaml, the roadmap and the decision log.

## The three new chapters

Use writer C's name pool and keep one person per name (grep the course first). Yazan stays the recurring person; add **one technical founder** character for these chapters, described not named ("the technical founder of a four-person team building a booking system for small gyms"), who probes the way the sponsor describes. Every example must be honest: strong answers include "I did not test that" with what the learner would check first.

**5.5 Why this and not that.** Hook: Yazan meets two founders in one week. The CEO founder asks what changed for merchants and how he knows; the technical founder asks "Why a background job and not a nightly run? Why that database? What would make you change it?". Teach the two kinds of founder plainly (both check honesty; the technical one also checks whether the choice was technically sound), then the shape of a choice that holds under "why not that?":
1. **The requirement it served** (what had to be true: merchants ask any time, same-day numbers).
2. **What you compared and rejected, and why** (the nightly run gave old numbers).
3. **Chosen on the need, not on habit or fashion.** "It is what I knew" is an honest answer when true, and it is better said plainly than dressed up; then say whether it fit the need.
4. **How hard it is to undo** (reversibility: what a change would cost, and how locked in you are to one provider).
5. **When you would revisit it** (a trigger: a size, a cost or a new need at which the choice should be looked at again).
6. **A short decision note** written at the time (two or three lines: need, options, choice, why, revisit when) as the habit that makes this easy.
Give the alternatives at each layer in generic words only, never product names: a relational database or a document store or a key-value store; a message queue or an event stream; full-text search inside the database or a separate search service; a cache inside the app, a shared cache or the edge of a content network; serverless functions, containers or virtual machines; build, buy or use open source; a managed service or one you run yourself. Teach "technically correct or not" honestly: sometimes the answer is "that choice was wrong for this need, and this is what I would change". Canvas `why-not-that-choice` (sequence; actors: Technical founder, Candidate, Decision note): the founder asks "why not X?" and the steps show a choice that holds (need, rejected option, undo cost, revisit trigger) against one that breaks ("it is popular", "everyone uses it"). Each step note ends with a question the next step answers.

**5.6 Check your work area by area.** Hook: the technical founder asks "What happens at fifty times today's traffic?" and "What happens when the payment provider is down?". Teach a checklist the learner runs on their own project before the interview, and the rule: tell the truth, rational not conventional; for each area say what you did, what you did not do, and what you would check first. Group the sponsor's areas into about nine plain questions, each with one or two short examples (gloss terms on first use with `GlossaryTerm`, at most five glosses in the chapter; put the full checklist in one table with columns Area, Question to ask yourself, Example):
- **Correctness:** errors handled, input checked (injection kept out), the business rule right, two requests at the same time (lost updates, double processing), time zones and clock changes, how it is tested (unit, integration, end to end, load).
- **Performance:** indexes, slow queries and one query per row in a loop, memory and connections, typical against slowest responses (explain p50 and p99 in plain words: the middle request against the slowest one in a hundred).
- **Scale:** the fifty times test, when you hit the wall and how you would know, caching and what happens when it expires, queues for slow work, cold starts.
- **Security:** who can log in and who can see what (least access), how sessions and tokens end, where secrets live and how they are changed, rate limits, cookie settings, dependency updates, sensitive data, one customer never seeing another's data, AI prompts that could leak data.
- **Reliability:** timeouts, retries with waits that grow, what happens when a service you depend on is down, a single point of failure, backups and a restore you have actually tested.
- **Data and async work:** safe changes to the database shape, one source of truth, jobs that can run twice without harm (idempotent), messages that fail again and again, order of messages.
- **Observability:** logs, metrics, traces, alerts that fire for real problems only.
- **Operations:** how you release and roll back, feature flags, the same settings in test and production, what you do in an incident.
- **Cost and compliance:** what grows with users (storage, compute, data leaving the provider, log volume), how long data is kept and how it is deleted on request, who did what and when.
Make clear nobody covers all of these in a small project, and an honest "I did not do X; the first thing I would check is Y, because Z" is a strong answer; a long list of patterns you did not need is a weak one ("used patterns against needed patterns"). Canvas `fifty-times-test` (slider): inputs today's busiest minute (requests per minute), a multiplier (1 to 50) and whether slow work goes through a queue (0 or 1); the data fixes the capacity of four parts of Yazan's report system (the web server, the database connections, the report workers, a third-party email service's rate limit); outputs: each part's load as a percent of its capacity in bars, which part hits its limit first, and a sentence. Arithmetic only on stated numbers; limits say it is a toy model and that a real answer comes from a load test. Write `frontend/tests/unit/canvas/fifty-times-test.test.ts` with at least four tests (defaults, the try-this values, an edge, describeChange).

**5.7 A demo they can open.** Hook: a founder has ten minutes between calls, opens the fellow's link, meets a sign-up form that needs an email confirmation, and closes the tab. Teach: a link to code alone asks the founder to install and run it, which few will do; a deployed version they can open; a guest or demo login with sample data instead of a sign-up wall (or a one-step sign-in); a two-minute screen recording that shows the core flow, not the login screen or the colour settings; a short page or readme that says what the project does, what you built, the key choices, and an honest list of what is not done; keep secrets and real user data out of the demo. Projects with two kinds of users (for example a driver and a rider) need sample data or two demo accounts so one person can see both sides. Canvas `demo-they-can-open` (sequence; actors: Founder, Your link, Your app): one path where the founder meets the sign-up wall and leaves, and one where a guest login and sample data take them to the core flow in under two minutes. Each step note ends with a question the next step answers.

Each new chapter: Learn layout from the writer pack (hook, idea, predict before the canvas, canvas with two or three sentences under it and no totals, worked weak and strong example, a ```mermaid diagram that argues something the canvas does not, a varied mistakes section, try it on your own project today, one or two MCQs on a new case, Next line), 1,300 to 1,500 prose words, one BigWordAlert at most, no research claims except as the dossier allows (these are practice advice: label them "course checklist" or "practice advice", never research).

## Changes to existing module 5 files

- `05.01`: add one short paragraph that names the two kinds of founder and says the module ends with three chapters for the technical founder. Update the "What is in this module" table with the three new chapters.
- `05.08-quiz.md` (renamed): replace two of the five items with items on 5.5 to 5.7 (one "why not that" item, one area or demo item), keeping the form balance and position spread, and keep one interleaved item from an earlier module.
- `05.09-checklist.md` (renamed): keep four rubric parts; make the engineer version part require one "why not that" answer (need, rejected option, undo cost, revisit trigger) and one honest area check (the fifty times test or "what happens when X is down"); add a link to a demo as optional. Extend the drill rubric (keep it under 1,600 characters) with probes for alternatives at a layer, the fifty times test, a dependency being down, who can see whose data, and the instruction to accept "I did not test that" with what they would check first. Mentor key and Partly and Not yet examples updated for Hadeel (Line C: images made smaller and loaded later, the clinic list kept in the browser for an hour, rejected the two-week rewrite, the closed-clinic case fixed with a server check; she did not load-test; she would check how the booking server handles a busy Monday morning first) and a different case.
- `02-impact-with-honest-numbers/02.03-find-your-numbers.md`: in the list of where evidence lives, add load test results, uptime, and typical against slowest response times (p50 and p99, glossed once here if 5.6 has not defined them; keep one definition in the course) as technical sources. One or two sentences only; keep everything else.

## Checks before you report

The writer pack's section 10 checks, with the new slugs unregistered until the orchestrator registers them. Report files written and renamed, the three canvas slugs, prose words per chapter, the quiz form measures, and any claim you were unsure of.
