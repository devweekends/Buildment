---
artifact: module-brief
course: career-brand
module: 04-a-strong-project-in-the-ai-era
version: 1
owner: curriculum-architect
roadmap_version: 1
roadmap_confirmed: false (G2B pending; drafted before sign-off on the sponsor's instruction)
canon: 00-areej-and-cast.md
---

# Module 4: A strong project in the AI era

## Outcome
The learner can explain why a working app alone proves less when building is fast, what still counts (a real user, a measured result, decisions with reasons, an AI-use log), test an idea with the four-question idea filter, say when a small open source contribution is the better path, and has a one-page project plan with an appetite, one user, one core flow, one number to move with its measurement, and a first real user milestone (O4).

## Why this module exists
The sponsor: "AI makes building faster, so the bar is higher; you are the product." Two-sided apps rarely get users; pick projects where real use is possible, or go deep and show the depth in writing. The plan comes before the showcase (module 5) and the resume (module 6) so both can point to it. The project is planned, not built, in this course (non-goal).

## Prerequisites
Module 3 (claim-card, controlled-measurement), module 1 (cheap-writing).

## Cross-links and limits
- Course 13, "Learn and Build with AI": the six-month weekly learning plan (link in 4.4), saying when AI helped (link in 4.2), and its URL shortener daily lab (link in 4.3 for the deep-dive example). Do not repeat them.
- Never teach as fact: any AI speed multiple ("AI makes you 2x or 10x faster", "AI makes developers slower") [S26, S27, S48, S49]; "most side projects never get a user" or "90 percent of startups fail" (unverified); METR's late-2025 numbers (do not quote them at all [S27]).
- The community cloud is one illustrative idea that passes the filter, using the standard definition, never presented as the sponsor's project, never linked to or describing the sponsor's website (open decision 3).
- Open source is optional (open decision 15).
- Credits: the METR research team; Peng and colleagues, and Cui and colleagues; the Anthropic research team (describe, do not rank) [S26, S28, S48, S49]; Evans and Schmalensee for critical mass [S54].

## Chapters
| # | Chapter | stepType | Min | Requires | Introduces | Evidence |
|---|---|---|---|---|---|---|
| 4.1 | Set the scene | Read | 10 | claim-ledger | weekend-app-trap | none |
| 4.2 | When building is fast, what still counts | Learn (beats) | 20 | weekend-app-trap, cheap-writing | ai-era-evidence, ai-use-log | quick check |
| 4.3 | The idea filter, and where open source fits | Learn (beats) | 25 | ai-era-evidence | idea-filter, two-sided-trap, open-source-path | quick check |
| 4.4 | Plan it with a time box | Learn (beats) | 20 | idea-filter | appetite-plan | quick check |
| 4.5 | Plan your project | Build | 70 | idea-filter, appetite-plan, ai-use-log | none | project plan |
| 4.6 | A strong project in the AI era | Check | 10 | appetite-plan | none | quiz |
| 4.7 | Checklist and learning log | Gate | 30 | idea-filter | none | filter run, first real user |

## 4.1 Set the scene (Read, 10 min, stepType Read)
Outcome: introduce strong projects through Sireen. LearningObjectives for the module.

| Beat | Heading | What the picture shows | Visual |
|---|---|---|---|
| 1 | A ride app in one weekend | Sireen's app screens appear fast; the map shows no drivers and no riders; the sign-up counter stays at zero | Watch-only scene, illustrated allowed |
| 2 | "How does the matching work?" | In an interview she scrolls through code she did not write and cannot explain | Watch-only scene |

- Everyday question: "What would have made her project more convincing than more features?"
- Facts: canon 4.1. Mark: fictional.

## 4.2 When building is fast, what still counts (Learn, 20 min, stepType Learn, format: beats)
Outcome: explain why studies of AI coding tools disagree and speed is not understanding, and name what still counts.

| # | Heading | Claim the picture must show | Visual | GoDeeper fold |
|---|---|---|---|---|
| B1 | Studies of AI coding tools disagree | Four study cards with different results side by side: faster on one small task; more tasks done in company experiments; slower for experienced developers on their own code; a follow-up too weak to size | Watch-only scene (card register) | One small task (an HTTP server) finished 55.8 percent faster with the tool [S48, abstract]; three company field experiments, 4,867 developers, about 26 percent more tasks completed, larger gains for less experienced developers [S49, summary]; 16 experienced developers on their own repositories took 19 percent longer with early-2025 tools, after forecasting a 24 percent speedup and still believing afterwards they were about 20 percent faster [S26]; the late-2025 follow-up called its data very weak evidence [S27]: do not quote its numbers. Phrase: "Studies of AI coding tools disagree because they measure different tasks, people and tools. Do not promise a speed number. Promise a record of what you checked." |
| B2 (predict before) | Speed is not understanding | Two groups learning a new library: the AI-assisted group a little faster (not significant) but scoring 50 percent on a quiz against 67 percent, with the biggest gap on debugging | Watch-only scene | A randomised trial with 52 mostly junior engineers [S28]; limits: small, immediate test, a chat sidebar not an agent, one library; people who asked the AI for explanations scored higher, in tiny subgroups (not causal). A reader who asks "how does this part work?" will probe understanding (course 14, "The Founder Interview"). |
| B3 | A working app alone proves less | A pile of near-identical weekend apps; one stands out because it carries a user, a number and a written decision | Watch-only scene | Labelled inference, not a measured finding: if anyone can generate a working app in a weekend, a working app proves less (from B1, B2 and module 1's cheap-writing evidence). What remains hard to fake: a real person who used it, a measured result, decisions with reasons, a record of what was checked, honest labelling of what AI wrote. "You are the product": the reader judges how you think and check, not the code volume. |
| B4 (PLAYABLE) | What still counts on a project page | A project page; the learner toggles evidence on and off (a real user, a measured result, a decision with its reason, a bug found and fixed, an AI-use log, a written explanation of the hardest part); a panel of reader questions turns from "no answer" to "answered" | Playable canvas (beat-choice toggles on the picture) | Research D design implications 1 and 4: the plan template and "what I understood" evidence (a short explanation of the hardest part and one bug found and fixed). |
| B5 | The AI-use log | One log line: date, what I asked, what I used, what I checked, one thing it got wrong; Areej's example (an AI-suggested stock update without a transaction; two sales at once broke the count; she wrapped it in a transaction) | Static picture | The contributor stays responsible for AI-assisted output [S52]. Course 13, "Learn and Build with AI", covers saying when AI helped in public writing. Misconception: "If AI wrote it, I do not need to understand it" [S28]. |

- Predict before B2: "Engineers learned a new library, some with AI help. On a quiz right after, how did the AI group do?" (better, about the same, or worse).
- Quick check: which evidence best shows you understood code an AI drafted.
- Worked example: Sireen's project page before (screens only) and the evidence it lacks.

## 4.3 The idea filter, and where open source fits (Learn, 25 min, stepType Learn, format: beats)
Outcome: test an idea against four questions and decide when an open source contribution is the better path.

| # | Heading | Claim the picture must show | Visual | GoDeeper fold |
|---|---|---|---|---|
| B1 | Four questions before you build | A filter with four gates: useful to one person or a small known group on day one; a result you can measure; depth you can explain in writing; no need for two sides at once | Static MermaidDiagram | Course method (brief; research D design implication 2). |
| B2 (predict before) | Why two-sided apps stall | A loop: no drivers, so no riders join; no riders, so no drivers join | Static MermaidDiagram (a cycle) | A new two-sided platform must reach critical mass on both sides at once [S54] (Evans and Schmalensee, summary). That such side projects usually get no users is a reasonable inference; no data counts side projects (unverified). Phrase: "Two-sided apps need both sides to show up at the same time. That is why a small tool that is useful to one person usually beats a marketplace with no sellers." |
| B3 | Useful with one user | A tool that works for one person alone; Sireen's reshaped idea: a school bus pickup schedule for one driver she knows and 14 families | Watch-only scene | A practitioner essay argues many network products started with a "single-player mode" useful without other users [S55] (essay, low to medium confidence). A small known group on day one is the second safe shape. |
| B4 (PLAYABLE) | Run five ideas through the filter | The learner drags five ideas through the four gates: a ride-sharing app (fails: two sides), a community cloud for a defined small group (passes), a URL shortener deep dive written up (passes on written depth), a clone of a famous app (fails: nothing measurable, no user), a small documentation fix in an open source library (passes: real users, merged change); each gate explains its verdict | Playable canvas (sorter or state-machine renderer) | Community cloud: NIST defines it as infrastructure reserved for a specific group with shared concerns [S56]; volunteer computing is a working precedent (BOINC lets people donate spare computing; about 30 science projects use it [S57]). It passes if it starts with a defined small group, a real workload and a measurable result (jobs run, compute hours, cost avoided). Phrase: "A community cloud, in the standard definition, is infrastructure shared by a group with a common purpose. That is a small, real, testable idea." One example, not the sponsor's project. URL shortener: real use may be small, so the strength is depth in writing (what breaks under load, measured), as a blog post (module 8); course 13 runs a URL shortener lab. |
| B5 | When open source is the better path | A path: find an issue labelled for newcomers, check the project is maintained, read CONTRIBUTING, open an issue first, make a small docs or test fix | Static MermaidDiagram | GitHub's help suggests issues labelled `good first issue` or `help wanted`, checking activity (for example the Pulse page) and opening an issue before large work (checked 2026-10) [S51]; documentation, translations, triage and review count; start small; read CONTRIBUTING; you stay responsible for AI-assisted output [S52]; newcomers face many barriers, many social [S53]. Not possible for everyone (time, private work code) [S8], so it is optional. Misconception: "You must contribute to famous open source to be taken seriously." |

- Predict before B2: "Sireen's app needs drivers and riders. Which side joins first?"
- Quick check: choose the idea that passes all four questions.
- Worked example: Areej's Raqim Stock through the filter (canon: one real user, stockouts, reorder logic, no two sides), and the docs fix she kept for later.

## 4.4 Plan it with a time box (Learn, 20 min, stepType Learn, format: beats)
Outcome: shape a project around an appetite in weeks, one user, one core flow, one number and a first real user milestone.

| # | Heading | Claim the picture must show | Visual | GoDeeper fold |
|---|---|---|---|---|
| B1 | Fix the time, flex the scope | A fixed box of weeks; scope cards fit inside or fall out | Watch-only scene | Shape Up separates an estimate from an appetite: decide how much time the problem deserves, then shape a solution that fits, fixed time and variable scope [S59]. Phrase: "Fix a time box first, then fit the scope to it." Course 13, "Learn and Build with AI", for the six-month weekly learning plan around a project. |
| B2 (predict before; PLAYABLE) | Set the appetite, watch scope fall | The learner drags the appetite (2 to 12 weeks at 5 hours a week); feature cards that no longer fit fall out in order of least value; verdict "Fits" or "Too much" | Playable canvas (slider renderer or rail-slider primitive) | Areej: 6 weeks x 5 hours = 30 hours; supplier ordering, multiple shops and a mobile app fall out; the core flow stays. |
| B3 | One user, one flow, one number | A plan card with three slots filled for Areej: the shop owner; record a sale, stock goes down, a warning appears; stockouts per month | Static picture | The number has a baseline from a source (the owner's notebook: 5 stockouts in August and September 2025). SMART objectives come from a 1981 management article and were meant as a writing aid, not a rule [S60] (secondary sources only; optional mention). |
| B4 | Plan how you will measure it | A small timeline: baseline from the notebook; the tool logs each stockout; compare two months after; note what else changed (season, a new supplier) | Static MermaidDiagram | Ties to the claim card (3.2) and the fair test (3.5): the plan is a future claim card. |
| B5 | The first real user milestone | A flag at week 3: the owner records one real week of sales | Watch-only scene | Phrase: "A project that was fast to build proves less than a project someone used. Find one real user before you build the second feature." |

- Predict before B2: "Areej has 6 weeks at 5 hours a week. Which feature should go first when time runs short?"
- Quick check: choose the scope that fits a 4-week, 4-hour appetite.
- Worked example: Areej's appetite, flow, number and milestone (canon).

## 4.5 Plan your project (Build, 70 min, stepType Build)
Artifact: a one-page project plan (own; Areej's plan is the worked example).

Template (copy into a document): title; user and use (who, doing what, on day one); the filter (four answers, each with a reason); appetite (weeks x hours a week); one core flow; out of scope (at least two items); the number to move (baseline, its source, how it will be measured after, what else might change); first real user milestone with a date; AI-use log (the five columns); what you will show (demo account or sign-in, a short demo, README, case study later; detail comes in module 5); risks (two).

Open source alternative: a plan for a first contribution instead (project, why it is maintained, the issue, the first small step, how you will know it helped).

AI on own material: ask a tool to challenge the plan against the four questions, list risks and suggest cuts that fit the appetite. It may not choose the user, invent a baseline or promise a speed. Log the session in the AI-use log.

No-idea path: start from a problem you or a small group you know has (the AI interviewer's next steps also suggest building "around your own needs"); adapt the shape of Areej's plan to that problem. The plan is own (open decision 1); a learner may submit a plan modelled closely on Areej's shape for their own context.

Acceptance criteria:
- Passes all four filter questions with reasons (or is an open source plan).
- The appetite is a number of weeks and hours; the scope fits it.
- One user, one core flow, at least two out-of-scope items.
- The number has a baseline source, or a plan to get the baseline first.
- A first real user milestone with a date.
- An AI-use log template is present.

Hint: if your idea fails the two-sided question, shrink it to one side you know (Sireen's bus schedule). If you are stuck: list three annoying tasks people near you repeat every week; pick the one with a number. Prose must reach 1,200 words: why each section exists, one failure (Sireen's first plan), and how the plan becomes a showcase later.

## 4.6 A strong project in the AI era (Check, 10 min, stepType Check)
Five MCQs:
1. Choose the idea among four that passes all four filter questions.
2. A two-sided idea: choose the reshape that is useful to one person or a small known group on day one.
3. Given 6 weeks at 4 hours a week, choose the scope that fits.
4. Choose the evidence that best shows a learner understood code an AI drafted.
5. **Check the AI's answer:** an AI tool says "AI makes developers 55 percent faster, so you can build a marketplace in a week". Choose the problems (one small task in one study; studies disagree; a marketplace needs both sides at once).

## 4.7 Checklist and learning log (Gate, 30 min, stepType Gate)
Checklist:
- My plan answers all four filter questions with reasons.
- It has an appetite, one user, one core flow and an out-of-scope list.
- The number has a baseline source or a plan to get one.
- I named my first real user and a date.
- My AI-use log template is ready.

Learning log:
1. Which filter question did your first idea fail, and how did you change it?
2. Who is your first real user, and how will you reach them?
3. What did you cut to fit the appetite? (Or: what Areej cut.)
4. What will you write in the AI-use log the first time you use AI on this project?

Written task (openquestion, text, minWords 100, allowSpeechInput true): run your idea through the four questions in writing and name your first real user (about 120 words).

Rubric parts:
| Part | Met | Partly | Not yet |
|---|---|---|---|
| Filter applied | All four questions answered with reasons | Some answered, or no reasons | Not applied |
| First real user | A specific person or small known group the learner can reach | A vague group ("small businesses") | None |
| Number and measurement | Baseline source and a measurement plan | Number without a source or plan | No number |
| Scope fits the appetite | Scope and hours consistent | Slightly over | No appetite |

Pass rule: every part at least Partly, and "Filter applied" and "First real user" Met. No AI drill. Mentor follow-up: one question on the first user. ChapterRecap: what counts now, the filter, the time box.
