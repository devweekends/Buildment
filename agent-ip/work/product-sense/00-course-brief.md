---
artifact: course-brief
course: product-sense
working_title: "Product Sense for Engineers: UI, UX and Work People Remember"
version: 1
status: accepted by sponsor (G0), from the sponsor's intake on 2026-10-25
owner: Zeeshan (architect and sponsor)
target_publish: after G2B sign-off and human review
---

# Course brief: product-sense (course 18)

Source of intake: the sponsor's request of 2026-10-25, in their words: "amazing product thinking ui and ux as engineer ... and also skills and tools and like claude code design things you can use, presentation of them on your web linkedin resume case studies, very interesting crisp demos attention grabbing elements non ai-ish making the ai slop go away and all, how to research learn understand and know whats better and best and average and mind blowing".

**Final title:** Product Sense for Engineers: UI, UX and Work People Remember
**Slug:** `product-sense`

## Why this course exists

Fellows can now build a working app in a weekend with AI tools. So can everyone else. The apps look the same: a purple gradient hero, three bordered cards with an icon in a tinted square, pill badges, and copy that says "seamless" and "powerful". A reviewer who opens ten portfolios in a morning remembers none of them. Fellows also build features nobody asked for, skip the empty and error states, and show their work as a GitHub link nobody runs.

The scarce skill is product sense: knowing which problem is worth solving, shaping a screen so the important thing is seen first, handling the moments when things go wrong, judging what is average and what is excellent, and showing the work so a busy person sees its value in seconds. This course teaches that skill to engineers, with AI tools as helpers and the engineer's own judgment as the final call.

## One sentence

Fellows learn to think about users and problems before features, apply UI and UX fundamentals that make an app clear and kind to use, build taste by studying and critiquing real products, remove the generic "AI-made" look from their screens and copy, use AI design tools as several opinions under their own judgment, and present their work in a crisp demo and a case study that people remember.

## Where it sits (overlap check, 2026-10-25)

| Course | What it already teaches | How course 18 relates |
|---|---|---|
| 13, Learn and Build with AI (`build-with-ai`, merged) | Basic AI tools by job, privacy before pasting, two tools per job with a fallback, owned files, honest AI-use lines | **Before course 18.** Course 18 refers back to these habits in one sentence and does not reteach them. It follows course 13's sponsor decision on naming tools (decision log, 2026-10-23 and 2026-10-24). |
| 16, Your Career Brand (`career-brand`, in progress) | Resume, LinkedIn profile, case study and blog post wording, measured numbers, instant access, a website plan | **Beside course 18.** Course 16 owns the words and the numbers. Course 18 owns how the work looks and plays: the visual layout of a case study page, the demo video, what a reviewer sees first, and the before and after. Cross-link, never repeat. |
| 17, Fear Less, Build More (`ai-advantage`, in progress) | AI judgment and the general AI toolbelt | **Beside course 18.** Course 18 covers only design-specific AI tools (design skills, visual generation, AI critique) and cross-links the general toolbelt. |
| 14, The Founder Interview (`founder-interviews`, PR #66) | Ownership, impact, the AI interviewer | The capstone defence reuses the same `aiinterview` block and its written fallback pattern. |
| 9, Think Clearly (`logic-building`) module 7 | Checking one AI answer | Referred to in one sentence. |

## Learner

- **Who:** Dev Weekends fellows in Gaza, early-career engineers (web, mobile, backend moving to full stack) aiming at remote work. Some product and design-curious fellows.
- **Prior knowledge:** has built or is building at least one small app (a course project, a freelance job or a side project). Basic HTML and CSS reading helps but is not required for modules 1, 4 and 7. No design training assumed.
- **Language:** Arabic first, English second. Plain English, short sentences, every term defined on first use.
- **Device and connection:** mostly phones on weak, expensive data, with power cuts; some have a laptop part of the time. Light pages, small images, no autoplay video. Canvases draw small UI pictures in SVG, never screenshots. Every task has a phone path.
- **Time available:** about 20 hours over about four weeks.
- **Motivation:** their apps look like everyone else's; reviewers do not open their links; they want work that gets remembered and remote clients who trust their judgment.
- **What they will do with the result:** a redesigned project with before and after, a critique log habit, a case study page and a 60 to 90 second demo they send with applications.

## Outcome

By the end, the learner can:

1. **Frame** a product problem before a feature: who it is for, the job they are trying to get done, the scope that fits the time, the trade-off, how success will be measured, and what to say no to.
2. **Apply** UI fundamentals: visual hierarchy, typography, spacing and alignment, colour and contrast that pass accessibility checks.
3. **Design** for real use: empty, loading and error states, forms that are easy to complete, accessible and mobile-first screens, motion used with restraint, and a first run that reaches a valuable moment fast.
4. **Judge** quality: research real products, compare them, write critiques, and place work on a scale of average, good, best and remarkable with reasons.
5. **Spot and remove** the generic AI-made look in UI and copy, and replace it with editorial layout, real content as the visual, and a point of view.
6. **Use** AI design tools (design skills in coding agents, visual generation, AI critique) as several opinions, and decide with their own judgment, with a fallback when a tool is unavailable.
7. **Present** work: a crisp demo that shows the core in 60 to 90 seconds, a case study page that passes a 10-second skim, and instant access for reviewers.
8. **Defend** a redesign: explain each change, its reason and its trade-off, with the AI interviewer or in writing.

## Demo

In five minutes the fellow shows a mentor their capstone: the before and after screenshots of their own project, the critique log that led to each change, the case study page, and the 60 to 90 second demo. The mentor points at one change and asks "why this, and what did you give up?", and the fellow answers without notes.

## Product scope

The "product" is the learner's redesigned project and its presentation, built piece by piece:

- **Must have:** a one-page product brief (module 1); a fixed screen (modules 2 and 3); a critique log of real products (module 4); a de-slopped screen and copy (module 5); a three-opinion AI critique with the learner's decision (module 6); the capstone package (before and after, critique log, case study page, 60 to 90 second demo) with a defence by the AI interviewer or in writing.
- **Should have:** a running example that grows through the course; a mixed review before the capstone; one provided project for fellows without their own.
- **Teaching and practice are separate:** every module teaches in Learn chapters, then practises in its own practice chapter that produces one piece of the capstone.

## Production bar

Not a code production bar. The equivalent bar:

- Every graded key follows from a rule taught in the course, a standard (for example WCAG contrast ratios), or arithmetic, and is re-answered blind by a second model family.
- Taste is taught with criteria and reasons, never as "the course says so". Opinion goes to open questions; graded items test criteria applied to evidence.
- Every claim about accessibility, usability research, product methods and named tools is backed by the research dossier, with access dates for tool facts.
- **Tools are named, features are not promised** (course 13's sponsor decision): tools as examples "at the time of writing" with a check date, two per job, with a fallback, and what is reachable from Gaza as the dossier states it.
- No invented statistics. Scenario numbers are labelled as the scenario's own.
- `content:validate:source`, `content:audit`, `agent-ip/scripts/audit-course.mjs`, canvas tests, import on a scratch database and a click-through at 375px and desktop, light and dark.

## Practice and the AI interviewer

- The capstone defence reuses the existing `aiinterview` block (PR #62, updated in #68): the learner's own OpenRouter key, `context: project`, focus on `case-study` and `best-technical`. No new AI component is built in this course.
- **Every AI step has a written option** that completes the same gate, for fellows without a key or credit. Nobody needs a key, a laptop or a public profile to finish.

## Variants

None for the first cohort. Fellows redesign their own project; a provided project covers fellows without one. Possible later directions: web apps, mobile apps, developer tools and APIs, data dashboards.

## Constraints

- **Stack:** the buildment reader and existing blocks; agent-ip v0.5.3: Learn chapters in beats (`format: beats`) with at least one playable visual each; canvases in `packages/learning-ui/src/canvas` with a 14A spec and tests where they compute. Reuse renderers and the beat primitives (BeatFrame, BeatChoice, BeatSegmented, Sorter, PictureSlider) before building anything new.
- **Budget:** about 20 hours.
- **Tool names:** follow course 13's sponsor decision (named as examples, dated, two per job, a fallback, the web path first, Gaza reach only as the dossier states it).
- **Real products:** chapters may name widely known public products as examples to study, describing only what anyone can see on their public pages, dated; no screenshots of real products in the course; no mockery of a named company or person.
- **Legal and privacy:** no real people's work shown as theirs; learners redesign their own work or the provided project; no client or employer screens shown publicly without permission.
- **No em or en dashes. No AI attribution** in the course's own commits or PR. (Learners still say when AI helped, as course 13 teaches.)
- **No new generic AI practice component:** the sponsor wants that later (backlog note).

## Non-goals

- Not a Figma or design-tool course; no tool tours.
- Not a frontend framework or CSS course; CSS appears only as small examples where it explains a rule.
- Not resume, LinkedIn or blog writing (course 16), not interview technique (course 14), not the general AI toolbelt (courses 13 and 17).
- Not branding, logo design, illustration or video editing in depth.
- Not user research at scale (surveys, analytics platforms, A/B testing statistics); the course teaches small, honest checks.
- No ranking of tools or "the best tool".

## Success signals

- Capstone before and after pairs show changes with written reasons, not only new colours.
- Critique logs name criteria and evidence, not "I like it".
- Case study pages pass a 10-second skim by a mentor who has never seen the project.
- Demos show the core value in the first 15 seconds.
- Mentor review time per capstone stays near 20 minutes with the rubric.
