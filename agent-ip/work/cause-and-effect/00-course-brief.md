---
artifact: course-brief
course: cause-and-effect
working_title: "Why Things Happen: Cause, Effect and Systems Thinking"
version: 1
status: accepted by sponsor (G0)
owner: Zeeshan (architect and sponsor)
target_publish: after G2B sign-off and human review
---

# Course brief: cause-and-effect (course 10)

## Why this course exists

A search of every fellowship course (2026-10-23) found cause and effect taught as a module in only one place: module 4 of course 9 (Think Clearly), at a beginner level. The soft-skills courses 3 to 7 mention it only in passing. The sponsor asked for the topic to be built well, as a full course around cause and effect and the related domain: testing causes, root causes, problem solving, systems and consequences.

## One sentence

Fellows learn to find out why things really happen: tell a cause from a coincidence, test a cause fairly, dig past symptoms to root causes, solve problems step by step, see feedback loops in a system, and think through the consequences of a decision before acting.

## Where it sits

Course 10 in the pipeline numbering. Best taken after course 9 (Think Clearly), whose module 4 introduces correlation gently, and before or alongside course 3 (Decision-Making), which covers choosing between options rather than diagnosing causes. Course 8 (AI engineering) fellows use the same habits for debugging, evaluation and incident reviews.

## Learner
- **Who:** Gaza fellowship fellows building careers in tech and remote work, from mixed backgrounds.
- **Prior knowledge:** plain English reading and simple arithmetic. Course 9 helps but is not required; the first two modules repeat what is needed.
- **Language:** Arabic first; English as a second language. Short sentences, common words, every term defined on first use.
- **Device and connection:** mostly phones, weak or expensive data, power cuts. Light pages, no images, every interaction saves on its own.
- **Time available:** about 18 hours, for example 1 hour a day over 3 to 4 weeks.
- **Motivation:** stop fixing the same problem again and again; give clients and teams clear explanations of what went wrong; make better calls with data.
- **What they will do with the result:** debug code and systems in the tech courses, write incident reviews, explain problems to clients, and judge claims and data at work.

## Outcome
By the end, the learner can:
1. **Draw** a chain of causes for a problem, and **separate** a direct cause from contributing causes.
2. **Test** a claimed cause for a hidden third factor, reverse cause, chance and selection.
3. **Design** a fair test or small experiment that changes one thing and compares with a group that did not change.
4. **Find** a root cause with the five whys and a fishbone diagram, and **state** it as a process cause rather than a person to blame.
5. **Solve** a problem step by step: describe it exactly, list possible causes, test the cheapest likely one first, and split the problem in half.
6. **Draw** reinforcing and balancing loops and **find** the bottleneck in a process.
7. **Predict** second-order effects and the side effects of targets before a decision.
8. **Run** a short review after something goes wrong, without blame, and **write** what will change.

## Demo
In five minutes the fellow walks a mentor through their capstone investigation: the exact problem description, the cause map, the root cause with its evidence, the fair test of the fix, and one side effect they plan to watch.

## Product scope
Not applicable as written: there is no software product. Read as **course scope**:
- **Must have:** the 8 modules in the roadmap; a puzzle or case opening every module; a gate with checklist, learning log and (from module 2) an open question; a quiz from module 2; the capstone; "check the AI's answer" questions in at least four quizzes.
- **Should have:** two canvases on existing renderers (five whys chain, step-by-step fault finding); a Mermaid diagram in every module (cause chains, fishbones, loops).
- **Out of scope:** see Non-goals.

## Production bar
Not applicable as a code production bar. The equivalent bar:
- Every graded key follows from a rule taught in the course or from arithmetic, and is re-answered blind by an independent reviewer.
- Every factual claim about methods (five whys, fishbone diagrams, A/B tests, feedback loops, bottlenecks, blameless reviews) is backed by the research dossier.
- No invented statistics. Scenario numbers are labelled as the scenario's own.
- `content:validate:source`, `content:audit` and `agent-ip/scripts/audit-course.mjs` results recorded; import and a click-through at 375px and desktop, light and dark.

## Variants
Not applicable: a foundation course has no product to vary. Scenario packs (tech support, small business, study) can follow later as an instructor decision.

## Constraints
- **Stack:** the buildment reader and existing blocks; canvases only on the registered renderers (sequence, state machine, factor), each with a spec and QA report.
- **Budget:** about 18 hours core, inside the soft-skills band of 8 to 20 hours. Chapters meet the full agent-ip prose minimums (1,200 and 700 words), which sets the hours.
- **Platform limits:** state machine grids at most 3 columns by 2 rows; one canvas per chapter, none in gates or quizzes; catalog categories are only tech and soft-skills.
- **Legal or privacy:** no real companies, people or incidents presented as fact unless sourced in the dossier; neutral topics only (no politics, religion or war); never ask fellows to share personal hardship.

## Non-goals
- **No statistics course:** no formulas, p-values or regression. Chance and samples are taught in plain words.
- **No formal causal inference** (causal graphs as notation, counterfactual maths).
- **No full systems-dynamics modelling or simulation software.**
- **No tool-specific quality methods** (Six Sigma belts, certification content).
- **No decision frameworks in depth:** course 3 covers choosing; this course covers diagnosing.

## Success signals
- Gate answers show causes stated as processes, not people.
- Capstones include evidence for the root cause and a fair test, not only a guess.
- Mentors see fellows use "and then what?" and fair tests in later courses and projects.
- Mentor review time per capstone stays near 15 minutes with the rubric.
