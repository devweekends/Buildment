---
artifact: context-pack
course: career-brand
for: research
version: 1
---

# Research pack: career-brand (course 16)

You are the research agent for a buildment course. Read, in `<repo>/agent-ip/`: `agents/research.md` (your role), `07-research-and-sources.md` (source hierarchy and the dossier template), and `work/career-brand/00-course-brief.md` (the brief). You may read `work/ai-engineering-interview/research.md` headings for format only. Do not read any chapter drafts.

You produce a **decision aid**, not a literature review: what is safe to say in plain words, what is a myth, how a chapter should phrase it, and what the course must not claim. Every factual claim gets a source ID like [S12] and a row in the source table (claim, source, type, date checked, confidence). Read the sources: say "full text" or "abstract only" in the table, and never claim more than you read. Quotes under 15 words, only where exact wording matters. Prefer primary sources: peer-reviewed studies, official platform help pages and docs, standards (NIST, RFCs, W3C), first-party engineering write-ups. Company marketing numbers ("profiles with a photo get 21 times more views") are recorded with low confidence and marked "company claim". Popular numbers with no traceable primary source (for example "recruiters look at a resume for six seconds", "75 percent of resumes are rejected by ATS") go in the **Unverified claims** table with what can be said instead.

The learners: Gaza fellows, English second language, on phones, aiming at remote work with international founders and teams. The course must never teach dishonest tactics, and must not name or describe the sponsor's own website. The course may name platforms (LinkedIn, GitHub, Google sign-in, writing platforms) because they are the subject; record the date you checked each feature. Founders and investors may be named in the dossier as sources, but each finding must also say how a chapter phrases it without the name ("founders who write about hiring say...").

## Questions to answer

**A. What founders and hiring managers look for, fast.** Studies of how recruiters and hiring managers read resumes and profiles (eye-tracking, callback studies, surveys; say who ran each and its limits). How developers are evaluated from GitHub and online traces (for example research on activity traces and signals in developer hiring). Certifications versus shipped work: any evidence on how much certifications matter for software hiring. What "impact", "ownership" and "how you build and talk about it" look like in founders' and hiring managers' own writing.

**B. AI-written application materials.** Evidence on AI writing help for resumes and cover letters (effects on hiring, on signal value when everyone uses it), on how readers react to text they think is AI-written, and on vocabulary that marks LLM text (excess-vocabulary studies). What can honestly be said about "AI fluff" and how to avoid it.

**C. Honest metrics.** Research on faking and impression management in applications, on how specific, checkable claims are judged, and on resume fraud. Then the measurement side, from official docs: percentiles and latency (p50, p95, p99), uptime and SLOs, load testing before and after (for example k6 or Locust docs), page performance (Core Web Vitals, Lighthouse), database query plans (EXPLAIN), cloud cost dashboards, how to estimate hours saved by an automation, and what "before, after, window, source, your share" needs. How to read numbers you did not set up (dashboards your team already has).

**D. Strong projects in the AI era.** Evidence on how AI coding tools change speed (randomized studies, with their settings and limits, including results that went the other way), and what that means for what a project must show now. Open source contribution as a signal and how newcomers start (official GitHub docs, research on newcomer barriers). The chicken-and-egg problem of two-sided platforms (economics literature) and why such side projects rarely get real users. The idea of a community cloud (NIST definition, volunteer computing examples) as an example of a strong, usable project idea. How to plan a project in a structured way (scope, milestones, a measurable goal).

**E. Showcasing so people look.** Evidence on friction and drop-off from sign-up and account creation; official docs for Sign in with Google and OAuth; safe demo or guest accounts (security guidance: seeded data, limits, resets, no real secrets); deployable units (containers, one-click deploy, free hosting tiers and their limits, checked with dates); short demo videos (research on video length and engagement); README guidance.

**F. Resume.** Structure and length evidence; what applicant tracking systems really do (myth versus fact); tailoring to a posting; links to live demos, case studies and writing; bullet shape with ownership and results.

**G. LinkedIn.** From LinkedIn's official help pages, with dates: headline and About length limits, Featured section, experience entries, custom profile URL, Open to Work, connection request notes and their limits, creator features as they are now. LinkedIn's own engineering or help writing on how the feed ranks posts (say what is first-party and what is folklore). The weak ties field experiment run on LinkedIn. What the User Agreement and community policies forbid (automation, engagement pods, fake engagement). Honest audience growth: what evidence exists, and what is only advice.

**H. Outreach and comments.** Any evidence on reply rates for short, specific, personalized messages versus templates; what is only practitioner advice. How to write a useful comment.

**I. Writing and distribution.** Canonical URLs and cross-posting (Google Search Central docs; which writing platforms let you set a canonical URL, checked with dates); the POSSE idea (publish on your own site, syndicate elsewhere); plain language guidance (official plain language guidelines); case study structure for engineering work; personal website options (static site generators, free hosting), and what makes a site feel hand-made and not AI-made.

**J. The career arc document.** Any evidence-based exercises for finding strengths and values (for example reflected best self), and what makes a personal "pillar" or unique strength credible. Keep this short: the document is mostly course method.

**K. Access from Gaza.** Whether LinkedIn, GitHub Pages, common free hosting tiers, domain registration, OpenRouter and Sign in with Google are available to users in Palestine, as far as official pages say (with dates), and what to do when a service is not.

## Output

Write `<repo>/agent-ip/work/career-brand/research.md` with the dossier template from `07-research-and-sources.md`, plus these sections: **Findings by topic** (A to K, each with "Phrase it this way" lines for writers and the misconceptions to correct), **Hard constraints** (three to five), **Failure modes** (how fellows' kits fail, sourced where possible), **What not to teach**, **Credits** (how chapters credit researchers; at most two or three names per chapter, no founders or investors by name), **Source table**, **Unverified claims** (with what to say instead), **Open questions for instructors**, and the handoff YAML. Aim for about 10,000 to 15,000 words; depth on A to G matters most. Save the file every time you finish a topic, so an interruption loses nothing.

Rules: no em dashes (U+2014) or en dashes (U+2013) anywhere; use commas, colons or "to". Do not invent statistics, studies, quotes or features. If you cannot find a source, say so. Do not use git. Report at the end: number of sources, number of unverified claims, the five findings that should most shape the course, and anything you could not check.
