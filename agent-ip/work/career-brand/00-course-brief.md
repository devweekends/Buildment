---
artifact: course-brief
course: career-brand
working_title: "Your Career Brand: Resume, LinkedIn, Personal Site and Proof of Work"
version: 1
status: accepted
owner: Zeeshan (architect, human sponsor)
target_publish: after G2B instructor sign-off and G7 delivery lead approval
---

# Course brief: career-brand

Source of intake: the sponsor's request of 2026-10-25 for course 16 of the fellowship pipeline, "very nice, structured, very heavy, good". It is the companion to course 14, "The Founder Interview" (ownership, impact, telling your story, the AI interviewer). Course 14 is the interview. This course builds the proof and the profile that come before it.

**Final title:** Your Career Brand: Resume, LinkedIn, Personal Site and Proof of Work (renamed on 2026-10-26 at the sponsor's request, so the catalog name shows the resume, LinkedIn and personal site; first chosen as "Your Career Brand: Proof of Work, Resume, LinkedIn and Writing")
**Slug:** `career-brand`

## One sentence

Fellows build a finished, honest career kit (a career arc document, a proof-of-work inventory with measured numbers, one strong project plan, a resume, a LinkedIn profile, a case study, a blog post with a publishing plan, and a website plan) that lets a founder or hiring manager see real, shipped, measured work in seconds, and they defend the kit in a short recorded walkthrough or with the AI interviewer.

## Learner

- **Who:** Dev Weekends fellows in Gaza, early career to mid level, aiming at remote work with international teams, founders and clients. Mostly engineers (backend, frontend, mobile, data), with some product, design and operations fellows.
- **Prior knowledge:** at least one job, internship, freelance gig, study project or volunteer role, and usually a resume draft and a LinkedIn account. Can use Git and GitHub. No training in writing, personal branding or measuring impact is assumed.
- **Language:** Arabic first, English second. Plain English, short sentences, every term explained on first use.
- **Device and connection:** mostly phones on weak, expensive data, with power cuts. Light pages, no autoplay video, progress saved often.
- **Time available:** about 5 to 6 hours a week for about 5 weeks.
- **Motivation:** they apply and hear nothing back. Their best work is invisible: a GitHub link nobody runs, a resume full of "responsible for", numbers they cannot defend.
- **What they will do with the result:** send the resume and profile with real applications and outreach, publish the post and the case study, start the project, and walk into course 14's founder interview with proof ready.

## Outcome

By the end, the learner can:

1. Say what a founder or hiring manager checks in the first seconds of a profile, and arrange their own material so real, shipped, measured work is seen first.
2. Write a career arc document (values, pillars, strengths, something human and interesting, and every role with what they did and the proof) that later feeds the resume, profile, outreach and posts.
3. Turn work into honest numbers: find the source (dashboards, logs, database, bills, load tests, time saved), state before, after, window, source and their share, and defend how each number was measured.
4. Choose and plan one strong project for the AI era, using an idea filter that favours real use or written depth over two-sided apps nobody uses.
5. Make work easy to see: a deployable unit, instant access (sign in with Google or a full demo account), and a short demo of the core.
6. Write a structured, plain, non-AI-sounding resume with owned bullets, honest results and links, and tailor it to one role.
7. Build a LinkedIn profile (headline, about, featured, experience) and use it well: posts, useful comments, outreach messages, and honest ways to grow an audience.
8. Write a case study and a blog post about their own work, plan publishing it across about ten channels, and plan a clean personal website.
9. Defend the whole kit: answer "how was that measured?" and "what was your part?" in a recorded walkthrough or the AI interviewer, and act on the feedback.

## Demo

In five minutes a mentor can open the learner's kit (resume, LinkedIn profile, case study, post, project plan) and the learner can pick any line and show where its number came from.

## Product scope

The "product" of this course is the learner's career kit, built piece by piece:

- **Must have:** the career arc document, the proof-of-work inventory with honest metrics, one strong project plan, a resume, a LinkedIn profile, one case study, one blog post and a plan for publishing it across channels, a website plan, and a recorded walkthrough or an AI interview defence.
- **Should have:** the project started and deployed with a demo account; the post published on at least one channel; a tailored resume for one real posting.
- **Out of scope:** see Non-goals.

## Production bar

Not a software course, so the production-grade checklist in `00-principles.md` does not apply as written. Its spirit applies to the showcase module: anything a fellow shows must be deployed, reachable without setup, safe for a stranger to try (demo data, no real secrets, limits on a public demo), and measurable.

## Practice and the AI interviewer

- Reuse the existing `AI_INTERVIEW` block (PR #62, updated in #68): learner-supplied OpenRouter key, context pasted in (`resume`, `project`, `resume-and-project`), dictation, probes on how a number was measured, strengths-first feedback, five named weak points. No new AI component is built in this course; where a future "input, generated question, score, follow-ups" block would help, the decision log says so.
- **Every AI practice has a written option** that completes the same gate, for fellows without a key or credit.
- Teaching and practice are separate: teach in Learn chapters, then practise in a separate practice chapter that builds one piece of the kit. Some early modules have no lab.

## Variants

Variants are not planned for the first cohort (as in course 14). Five possible directions, by the kind of work the fellow shows:

1. Backend and infrastructure engineers (proof from dashboards, load tests, migrations, uptime).
2. Frontend and mobile engineers (proof from page speed, crash rates, app store data, design handoffs).
3. Data and AI engineers (proof from evaluation numbers, pipeline run times, cost per run).
4. Product designers (proof from usability tests, task completion, design decisions).
5. Freelancers on client platforms (proof from client results, repeat work and reviews).
6. Operations and non-engineering roles (proof from time saved, error counts, process changes).

## Constraints

- **Platform names:** LinkedIn, GitHub and other platforms are the subject of the course and may be named, with features checked against official help pages and dated "checked 2026-10". No real people's profiles, no named founders or investors, no company case studies presented as fact; scenarios are fictional composites, marked once per scene chapter.
- **The sponsor's own website** is never named, linked or described.
- **No em or en dashes. No AI attribution.**
- **Honesty:** never invent numbers, ownership or reach. "I did not measure that, and here is how I would" beats a made-up figure. No growth hacks that break platform rules (engagement pods, bought followers, automation tools that violate terms).
- **Privacy:** learners never paste personal identifiers, client secrets, private company data or other people's details into the AI interviewer, and they ask before using employer data or dashboards in public.
- **agent-ip v0.5.3:** Learn chapters in beats with a playable visual; audits pass; blind key check on a second model family; two critic rounds; length and position bias checks.

## Non-goals

- Interview technique itself (course 14), salary negotiation, visa and contract law.
- Basic professional English, email etiquette and first LinkedIn basics (course 7 covers them; this course goes deeper and cross-links).
- Building the project itself in code (the course plans it, sets the bar and the showcase; the build happens in the fellow's own time or other courses).
- Paid advertising, design tools in depth, video editing in depth.

## Success signals

- Every fellow finishes with a complete kit a mentor can review in under 30 minutes.
- Every number in the resume and profile has a source the fellow can name.
- The AI interviewer flags fewer "unsupported number" and "vague ownership" points between the first drill and the capstone.
- Fellows report more replies to applications and outreach in the month after the course (tracked by mentors, not promised).
