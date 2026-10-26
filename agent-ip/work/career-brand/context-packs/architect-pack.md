---
artifact: context-pack
course: career-brand
for: curriculum-architect
version: 1
---

# Architect pack: career-brand (course 16)

You are the curriculum architect. Read, in `<repo>/agent-ip/`: `agents/curriculum-architect.md` (your role), `02-course-architecture.md` (time budget, course shape, chapter anatomy), `03-authoring-standards.md` (Visual-first Learn chapters, Audience: the fellowship, forbidden patterns), `04-interactive-playbook.md` (placement matrix, density budgets, QUIZ, PREDICT, OPEN_QUESTION), `05-assessment-and-motivation.md`, `08-templates.md` sections 1A (Curriculum roadmap) and 2 (Course blueprint), and the course inputs: `work/career-brand/00-course-brief.md`, `work/career-brand/research.md` and `work/career-brand/research-platforms.md`. For the AI interview block read `<repo>/docs/13-ai-interview.mdx`. For the shape of a recent roadmap in this pipeline, skim `work/ai-engineering-interview/curriculum-roadmap.md` (structure only).

## Task 1 (now): the curriculum roadmap

Write `work/career-brand/curriculum-roadmap.md` on template 1A, and `courses/career-brand/course.yaml` (the plan: modules, lesson files, titles and goals). Stop after these two files. Do not write the blueprint or any chapter.

### What the sponsor asked for (cover all of it; research and structure it well)

1. What founders and hiring managers look for, fast: a profile they can scan quickly, real impact, how you build things and how you talk about them, some certifications (they matter less than shipped work), a clean, structured, non-AI-sounding resume with no "AI fluff", case studies, honest metrics, ownership.
2. Honest metrics and proof of work: real numbers instead of made-up ones ("helped grow the business 50%" is the bad example). Sources of proof: cloud or database dashboards, code written or cleaned up, security work, performance work, migrations, automations and the hours they saved, response times, uptime, users or products handled, before-and-after load tests. How each number was measured, and how to defend it in an interview (cross-link course 14, "The Founder Interview", instead of repeating it).
3. A career arc document first: a brainstorming document before the resume. Core values, USPs and main pillars; strong areas; hard, soft, leadership and initiative skills; something interesting about you (sports, films, cartoons); what you did in each role in detail, with proof. It becomes the data AI can later use to draft the resume, LinkedIn, outreach emails and comments.
4. Strong projects in the AI era: AI makes building faster, so the bar is higher ("you are the product"). Open source versus a strong project; plan a project with a structured plan. Example of a strong idea: a community cloud, where a community or a company pools spare compute servers for its people. Gotchas: two-sided apps (a ride app with drivers and riders) rarely get real users; pick projects where real use is possible, or go deep and show the depth in writing (a URL shortener deep dive written up as a blog post).
5. Showcasing so people actually look: a GitHub link alone is not enough because nobody will run your code; ship a deployable unit; instant access (sign in with Google, or a guest or demo account that can do everything); a short demo of the core, beautiful part, not filler.
6. Resume: structure, bullets with ownership and honest results, links (live demo, case study, writing), tailoring.
7. LinkedIn: headline, about, featured links, experience, posting, commenting well, outreach messages, growing an audience with real strategies.
8. Writing and distribution: blogs about your work; publishing one piece across about ten channels; a personal website that is a clean blog-style site, clearly not AI-made; a well-defined case study for each project; a visitor can read your articles and judge how good you are. Never name, link or describe the sponsor's own website.
9. AI practice (bring your own key): the existing AI interview block asks about the learner's own work from their career arc and resume, gives feedback and follow-ups that push for better proof, and recommends what to build or measure next. Every exercise has a written option.

### Structure rules (from the sponsor)

- **Teaching and practice are separate.** Teach in Learn chapters, then practise in a separate practice chapter (stepType `Build`) in the same module that builds one piece of the kit. Some early modules need no practice chapter at all (module 1 is diagnosis: no lab).
- **The learner builds real artifacts as the course goes**, so the capstone is a finished kit: the career arc document, the proof-of-work inventory with honest metrics, one strong project plan, a resume, a LinkedIn profile, one case study, one blog post with a plan for publishing it across channels, and a website plan. It is defended in a short recorded walkthrough or the AI interview block.
- **Order matters:** evidence before prose. The career arc document and the proof inventory come before the resume, profile and writing, because every later artifact is drawn from them (dossier hard constraint 1). The project and showcase modules come before the resume so the resume can link to them.
- Each module: a set-the-scene Read chapter (`NN.01-set-the-scene.md`, a story), Learn chapters (beats), the practice chapter where the module has one, a quiz chapter (`NN.xx-quiz.md`, activities only, five MCQs, titled by topic without "Quiz:"), and a gate (`NN.xx-checklist.md`, "Checklist and learning log"). Gates hold the AI drill (where the module has one) plus a written task that completes the gate for anyone without a key. The final module holds the full AI interview on the learner's kit and the capstone.
- **Learn chapters are visual-first beats** (v0.5): four to eight beats, 300 to 700 visible words, at least 900 with folds, a predict before the key beat, one or two quiz questions at the end, at least one playable visual. Plan for about 20 to 30 minutes each. Practice (Build) chapters need 1,200 or more prose words; gates 700 or more.
- **Cross-links:** course 14 for defending numbers and stories in an interview; course 7 ("Professional & Business Communication") for basic LinkedIn and outreach etiquette; course 13 ("Learn and Build with AI") for turning a week of commits into an article and saying when AI helped. Refer to them by name; do not repeat their content.
- **A provided fellow.** Every practice chapter, gate and the capstone needs a provided fellow whose material continues across the course, for learners who have no paid work yet or who prefer not to share their own. Give the fellow a name not used in courses 13 or 14 (grep `courses/` and `agent-ip/work/` before choosing), a role (for example a full-stack developer with an internship, freelance work, a study project and a volunteer role), and real-feeling proof sources across the course: a slow query fixed and measured, an automation that saved hours, a migration, a small security fix, a before-and-after load test, an honest gap with a plan, and one project idea that passes the idea filter. Say in the roadmap which kit parts must be the learner's own and which may use the provided fellow (an open decision for instructors).
- **Cast:** one fictional person per set-the-scene chapter, varied roles (backend, frontend, mobile, data, design, operations, freelance), all fictional and marked once per scene.

### Time budget

The brief allows about 5 to 6 hours a week for about 5 weeks. Aim for 25 to 30 hours in total, including practice chapters and gates; say how many hours with every AI drill and on the written path. Cut breadth before depth.

### Open decisions

List the decisions instructors must settle (start from the dossiers' open questions, and add the provided fellow's own-work rule, AI drill settings per gate, the community cloud example, which kit parts must be published versus private, and the pass rule).

## Task 2 (later, after the orchestrator commits the roadmap): the blueprint

The orchestrator will message you. Do not start it now.

## Rules

- No em dashes (U+2014) or en dashes (U+2013) anywhere; ranges are "3 to 4".
- Every claim you put in the roadmap must match the dossiers; never state a claim they list as unverified.
- Module and lesson `key`s in `course.yaml` (stable kebab-case, unique), per `03-authoring-standards.md` → Stable lesson identity. Do not set `repositoryPublish`. `category: soft-skills` or `tech` (choose and say why), `difficulty`, `estimatedHours`.
- Do not use git. Use absolute paths.
- Report: the module and chapter counts, hours with and without AI drills, the provided fellow, the open decisions, and anything in the sponsor's list you could not fit.
