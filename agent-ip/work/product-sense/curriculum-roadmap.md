---
artifact: curriculum-roadmap
course: product-sense
version: 1
status: draft (G2A); G2B instructor sign-off pending
owner: curriculum-architect
instructors_reviewed: []
drafted_before_roadmap: true
research: research.md (G1, accepted 2026-10-25 with 16 outline changes)
---

# Curriculum roadmap: Product Sense for Engineers: UI, UX and Work People Remember

> **G2B is pending.** Chapters are drafted before instructor sign-off, on the sponsor's standing instruction (see `decision-log.md`), as with courses 3 to 17. If instructors change this roadmap, the chapters will be revised to match.

## In one paragraph
A practical course in product sense for engineers. Fellows learn to start from the problem and the job a person hires an app for, to cut scope to fit the time and to say how they will know it worked. They learn the UI fundamentals that decide what a person sees first (hierarchy, type, space, colour and measured contrast) and the UX fundamentals that decide whether people finish (empty, loading and error states, forms, access, small screens, motion with a reason, a first run that reaches value fast). They build taste: a four-level scale with criteria, why defaults look generic, how to study real products and write critiques, and which popular rules fail a check. They learn to spot the generic AI-made look in screens and words and replace it with real content and a point of view, and to use AI design tools as several opinions under their own judgment. Finally they present work: a demo that works with the sound off, a case study page that passes a 10-second skim, and one-click access for reviewers. The running example is Maryam, a fellow whose study-group app Halaqa grows through the course. The capstone is a redesign of the fellow's own project (or the provided Wasel print-shop app) from the generic look to work people remember, defended with the AI interviewer or in writing.

## Learner and entry prerequisites
- **Learner:** Dev Weekends fellows in Gaza, early-career engineers aiming at remote work; second-language English; mostly on phones with weak data and power cuts.
- **Prior knowledge:** has built or is building one small app. Reading basic HTML and CSS helps in modules 2 and 3; every task has a phone path and the provided Wasel project.
- **Time:** about 26 hours (1,582 minutes of chapters) over about five weeks.
- **Entry diagnostic:** none graded; the scene in 1.1 asks what the learner would cut first.

## Where it sits
After course 13 (`build-with-ai`: tools by job, privacy, owned files, honest AI use), which it refers back to in one sentence. Beside course 16 (career brand: the words and numbers of a resume, profile and case study) and course 17 (the general AI toolbelt). Course 18 owns how the work looks, how it behaves and how it is shown. It reuses course 14's AI interviewer pattern for the capstone defence.

## Outcomes
| # | Outcome (observable verb) | Evidence |
|---|---|---|
| O1 | Frame a problem before a feature: the job, the appetite and scope cut, one goal and one signal | Practice 1.6 (one-page brief); quiz 1.7; gate 1 |
| O2 | Apply hierarchy, type, spacing and colour, and measure contrast against WCAG 2.2 AA | Practice 2.6 (one screen fixed, before and after); quiz 2.7 |
| O3 | Design empty, loading and error states, forms people finish, accessible and phone-first screens, purposeful motion and a first run that reaches value fast | Practice 3.7 (unhappy paths of one flow); quiz 3.8 |
| O4 | Judge quality on a four-level scale with criteria, critique real products and check popular rules against evidence | Practice 4.6 (critique log); quiz 4.7 |
| O5 | Spot the generic AI-made look in screens and words, and replace it with real content and a point of view | Practice 5.5 (de-slop one page); quiz 5.6 |
| O6 | Use AI design tools as several opinions, check each point, and decide with a reason | Practice 6.4 (three-opinion critique); quiz 6.5 |
| O7 | Present work: a muted-first 60 to 90 second demo, a case study that passes a 10-second skim, one-click access | Chapters 7.2 to 7.4; capstone 7.6 and 7.7 |
| O8 | Defend each change: its reason and what was given up | Course gate 7.8 (AI interviewer or written defence) |

## Shape
| Part | Focus | Modules | Minutes | Evidence at the end |
|---|---|---|---|---|
| 1 | Think product first | 1 | 212 | A one-page product brief |
| 2 | UI and UX fundamentals | 2 to 3 | 449 | One screen fixed; one flow's unhappy paths |
| 3 | Taste and the generic look | 4 to 5 | 399 | A critique log; one page de-slopped |
| 4 | Tools, presenting, capstone | 6 to 7 | 522 | A three-opinion critique; the capstone package and defence |

## Format (agent-ip v0.5.3)
Learn chapters are beats (`format: beats`): four to six beats, each opening with a visual, at most 70 visible words, depth in `GoDeeper` folds, a predict before the key beat and one or two quiz questions after the last. Every Learn chapter has at least one playable canvas, built on the specimen kit (a small screen drawn from data: compare versions, drag along a ladder, tap to spot problems, skim for ten seconds) or the sorter. Read chapters are one or two beats. Teaching and practice are separate: every module ends its teaching with a **Practice** chapter (Build, prose rules) that produces one piece of the capstone and is read by a mentor, then a quiz, then a gate.

## Module and chapter sequence
Minutes are each chapter's `estimatedMinutes`. Total 1,582 minutes, about 26 hours: `estimatedHours: 26`. The first draft said 22; critic A measured the visible text and the practice load (G5 round 1, A-08) and the minutes were raised to an honest estimate. That is six hours over the requested 20; open decision 2 offers ways back.

### Module 1: Think product first (212 min)
| # | Chapter | One-line outcome | Type | Min | Playable canvas |
|---|---|---|---|---|---|
| 1.1 | Set the scene: fourteen features, three users | Maryam's Halaqa does everything and nobody uses it | Read | 15 | scene picture |
| 1.2 | Start from the problem, not the feature | A request is a feature; underneath is a problem you can check | Learn | 25 | `product-m1-problem-or-feature` (sorter) |
| 1.3 | The job people hire your app for | The same app looks different for different jobs | Learn | 25 | `product-m1-two-jobs` (compare) |
| 1.4 | Fit the scope to the time, say no to the rest | Fixed time, variable scope; scope hammering | Learn | 25 | `product-m1-scope-hammer` (sorter) |
| 1.5 | Know if it worked | One goal, one signal you can watch, a 3 to 5 person check | Learn | 25 | `product-m1-signal-or-count` (sorter) |
| 1.6 | Practice: a one-page product brief | Job, appetite, cut list, goal and signal for your project | Build | 50 | none |
| 1.7 | Thinking product first | Five graded cases | Check | 12 | none |
| 1.8 | Checklist and learning log | Gate 1 | Gate | 35 | none |

### Module 2: See it first: hierarchy, type, space and colour (212 min)
| # | Chapter | One-line outcome | Type | Min | Playable canvas |
|---|---|---|---|---|---|
| 2.1 | Set the scene: ten links, one morning | A reviewer skims; nothing stands out | Read | 15 | scene picture |
| 2.2 | One thing first: visual hierarchy | Size, weight, contrast and the squint test | Learn | 25 | `product-m2-squint-test` (compare with blur) |
| 2.3 | Type that reads on a phone | Body size, line height, line length, few sizes | Learn | 25 | `product-m2-type-ladder` (ladder) |
| 2.4 | Space does the grouping | Space inside smaller than space between | Learn | 25 | `product-m2-spacing-groups` (ladder, built) |
| 2.5 | Colour with a job, contrast you can measure | 4.5:1, 3:1, never colour alone | Learn | 25 | `product-m2-contrast-ladder` (ladder, literal colours) |
| 2.6 | Practice: fix one screen | Before and after with a reason per change | Build | 50 | none |
| 2.7 | Hierarchy, type, space and colour | Five graded cases | Check | 12 | none |
| 2.8 | Checklist and learning log | Gate 2 | Gate | 35 | none |

### Module 3: Kind to use: states, forms, access, motion and the first run (237 min)
| # | Chapter | One-line outcome | Type | Min | Playable canvas |
|---|---|---|---|---|---|
| 3.1 | Set the scene: a blank screen on weak data | Is it loading, empty or broken? | Read | 15 | scene picture |
| 3.2 | Empty, loading, error: the states nobody draws | Four states per screen; say what is happening | Learn | 25 | `product-m3-four-states` (compare) |
| 3.3 | Forms people finish | Visible labels, errors near the cause, check on leave | Learn | 25 | `product-m3-form-spot` (spot) |
| 3.4 | Everyone can use it: access and small screens | Targets, focus, text alternatives, phone first, right to left | Learn | 25 | `product-m3-tap-targets` (ladder) |
| 3.5 | Motion with a reason | Motion shows change; respect reduced motion | Learn | 25 | `product-m3-motion-with-a-job` (compare, motion) |
| 3.6 | The first run and the moment it clicks | Value before tours; teach inside the screen | Learn | 25 | `product-m3-first-run` (compare) |
| 3.7 | Practice: the unhappy paths of one flow | States, errors and first run for one flow | Build | 50 | none |
| 3.8 | States, forms, access, motion and the first run | Five graded cases | Check | 12 | none |
| 3.9 | Checklist and learning log | Gate 3 | Gate | 35 | none |

### Module 4: Taste: know average from remarkable (212 min)
| # | Chapter | One-line outcome | Type | Min | Playable canvas |
|---|---|---|---|---|---|
| 4.1 | Set the scene: it looks fine | Two fellows, one screen, no words for why | Read | 15 | scene picture |
| 4.2 | Average, good, best, remarkable | A scale with criteria; the top level is a reasoned choice | Learn | 25 | `product-m4-four-levels` (sorter) |
| 4.3 | Why defaults look generic | Frameworks give everyone the same start | Learn | 25 | `product-m4-default-or-choice` (compare) |
| 4.4 | Study real products: collect, compare, critique | See, rule, evidence; not "I like it" | Learn | 25 | `product-m4-critique-or-opinion` (sorter) |
| 4.5 | Popular rules that fail a check | 3 clicks, seven items, golden ratio, thumb maps | Learn | 25 | `product-m4-rule-or-myth` (sorter) |
| 4.6 | Practice: a critique log of three products | Same task, same rules, dated observations | Build | 50 | none |
| 4.7 | Judging quality | Five graded cases | Check | 12 | none |
| 4.8 | Checklist and learning log | Gate 4 | Gate | 35 | none |

### Module 5: Make the AI slop go away (187 min)
| # | Chapter | One-line outcome | Type | Min | Playable canvas |
|---|---|---|---|---|---|
| 5.1 | Set the scene: a shop page made in one evening | Wasel's page could sell anything | Read | 15 | scene picture |
| 5.2 | The generic look: defaults you did not choose | Glows, icon tiles, card grids, pill clusters | Learn | 25 | `product-m5-spot-the-slop` (spot, built) |
| 5.3 | Words anyone could write | Cut what a hundred products could say | Learn | 25 | `product-m5-hundred-products` (sorter) |
| 5.4 | Real content, an editorial layout, a point of view | Content as the visual, one bold choice | Learn | 25 | `product-m5-point-of-view` (compare) |
| 5.5 | Practice: de-slop one page | Every element earns its place, with a reason | Build | 50 | none |
| 5.6 | Spotting and removing the generic look | Five graded cases | Check | 12 | none |
| 5.7 | Checklist and learning log | Gate 5 | Gate | 35 | none |

### Module 6: AI design tools under your judgment (162 min)
| # | Chapter | One-line outcome | Type | Min | Playable canvas |
|---|---|---|---|---|---|
| 6.1 | Set the scene: three AIs, three opinions | They disagree; who decides? | Read | 15 | scene picture |
| 6.2 | Design skills and agents that build screens | A skill is a checklist; a brief beats a vague prompt | Learn | 25 | `product-m6-vague-or-briefed` (compare) |
| 6.3 | AI as a critic: several opinions, then you decide | Questions, not verdicts; check each point | Learn | 25 | `product-m6-check-the-critique` (sorter) |
| 6.4 | Practice: a three-opinion critique | Same screen and rubric to three tools, your decisions | Build | 50 | none |
| 6.5 | Using AI design tools well | Five graded cases | Check | 12 | none |
| 6.6 | Checklist and learning log | Gate 6 | Gate | 35 | none |

### Module 7: Present the work, and capstone (360 min)
| # | Chapter | One-line outcome | Type | Min | Playable canvas |
|---|---|---|---|---|---|
| 7.1 | Set the scene: the link nobody opened | A login wall and a silent video | Read | 15 | scene picture |
| 7.2 | A demo that shows the core in 60 to 90 seconds | Story, not tour; works muted; captions | Learn | 25 | `product-m7-demo-storyboard` (compare) |
| 7.3 | A case study page that passes the skim | Result first; problem, role, choices, trade-off | Learn | 25 | `product-m7-skim-before` and `product-m7-skim-after` (skim) |
| 7.4 | Show it where people look, open in one click | Guest access, fallback chain, hosting terms | Learn | 25 | `product-m7-one-click-access` (compare) |
| 7.5 | Mixed review: which fix first? | Fresh cases from every module | Check | 15 | none |
| 7.6 | Capstone, part 1: before and after, and the critique log | Screens and a reason and a cost for every change | Build | 105 | none |
| 7.7 | Capstone, part 2: the case study page and the demo | A page that passes the skim, one-click access, a muted-first demo | Build | 105 | none |
| 7.8 | Course checklist and your defence | AI interviewer or written defence | Gate | 45 | none |

## Practice chapters (teaching and practice are separate)
Each practice chapter is a Build chapter: the task, a worked example on Maryam's Halaqa, the provided Wasel case for anyone without a project, a rubric (Met, Partly, Not yet) and one mentor-read open question. Its output becomes one part of the capstone:

| Practice | Output | Capstone part |
|---|---|---|
| 1.6 | One-page product brief | Case study: problem and job |
| 2.6 | One screen, before and after, a reason per change | Before and after screenshots |
| 3.7 | States, errors and first run for one flow | Before and after screenshots |
| 4.6 | Critique log of three products | Critique log |
| 5.5 | One page de-slopped, screen and words | Before and after; critique log |
| 6.4 | Three AI critiques, checked, with decisions | Critique log |

## Capstone (7.6 and 7.7, Build, 105 minutes each)
The fellow redesigns **their own project**, or **Wasel** (provided: a print and copy shop's order app made in one evening with an AI tool, in the generic look), and hands in four parts:
1. **Before and after screenshots** of at least three screens, each change numbered.
2. **A critique log**: for each change, what was wrong, the rule or evidence, the change, and what was given up; at least one AI critique point checked and one rejected with a reason.
3. **A case study page** that passes a 10-second skim by someone who has never seen the project: the result first, then problem, role, choices, trade-offs; one-click access (guest login or demo mode) with a fallback.
4. **A 60 to 90 second demo** that works with the sound off, shows the core value early and is captioned; a storyboard is accepted when recording is not possible.

**Defence (7.8):** the existing AI interviewer (`aiinterview`, `context: project`, focus `case-study` and `best-technical`, the learner's own OpenRouter key, `required: false`), or the written defence, which is always available and completes the gate: three changes, each with its reason and what was given up.

## Gate evidence at a glance
Every gate: checklist, learning log, and an open question with a Met / Partly / Not yet rubric, a pass rule (no part Not yet, at most one Partly) and a mentor key for the provided case. Gates ask what the learner changed in their own thinking; the practice chapter holds the work.

## Variants
None for the first cohort. Fellows redesign their own project; the Wasel project covers fellows without one.

## Out of scope
Design-tool tours (Figma), CSS or framework teaching beyond small examples, resume and LinkedIn wording (course 16), interview technique (course 14), the general AI toolbelt (courses 13 and 17), user research at scale, branding, illustration and video editing in depth, ranking tools.

## Open decisions for instructors
1. **Ages.** Several design tools are 18+ (Claude, Figma AI, reportedly Stitch). Are all fellows 18 or over? Chapters always give a second tool and a paper path.
2. **Time.** 26 hours against the requested 20. Ways back: merge 3.5 (motion) into 3.4 and 4.5 (myths) into 4.4 (about 50 minutes); make two practice chapters optional for fellows on the provided case (about 100 minutes); or keep 26 hours over five weeks.
3. **Public or private.** Must the capstone case study and demo be public, or may a fellow show them privately to a mentor? Draft: private is accepted.
4. **Field test from Gaza.** Two fellows open Stitch, v0, a claude.ai skills upload, Figma Starter, GitHub Pages and a LinkedIn video upload on a phone before publish; the dossier could not confirm access for several.
5. **Real products.** Chapters name only GOV.UK as a real example (the only one the dossier opened). Learners pick real products to study themselves. Keep this rule?
6. **Arabic typography.** No source gives Arabic sizes or line lengths. Who gives a native-reader review of the right-to-left beat in 3.4?
7. **Client work on free hosting.** Vercel Hobby forbids paid work. Should 7.4 steer fellows with client projects to GitHub Pages or a paid host?
8. **AI interviewer key.** The defence uses the learner's own OpenRouter key and may cost credit; the written defence is always accepted. Confirm.
9. **Timing on phones.** Learn chapters are estimated at 25 minutes, practice at 50. Time two Learn chapters, one practice and capstone part 1 with fellows before publish.

## Confirmation
G2B: pending. At least two instructors sign `roadmap-confirmation.md` (template 1B) before the chapters are treated as final.
