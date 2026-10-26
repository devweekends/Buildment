---
artifact: research-dossier
course: career-brand
version: 1
status: draft
owner: research
sources_checked: 2026-10-25
scope: topics A to F in full; topics G to K are in research-platforms.md
---

# Research dossier: career-brand (course 16)

This is a decision aid for the course "Your Career Brand: Proof of Work, Resume, LinkedIn and Writing". It is not a literature review and it contains no learner-facing prose. Every factual claim carries a source ID such as [S12] that points to the source table. "Phrase it this way" lines show how a chapter can say the thing in plain words without naming a person. Dates in the form 2026-10-25 are the date the page was checked.

How to read confidence labels: **high** means a primary source was read and the claim is stated at the strength the source states it. **medium** means a primary source was read only at abstract level, or the source is first-party but narrow. **low** means a company claim, a search summary, or a secondary source. Where a page could not be opened, the table says "search summary only" and the claim is kept at low confidence.

Scope note: this file covers topics A to F (what founders look for, AI-written materials, honest metrics and measurement, strong projects, showcasing, resume). Topics G to K (LinkedIn, outreach and comments, writing and distribution, the career arc document, access from Gaza) are in `research-platforms.md`. The cross-cutting sections at the end of this file (learner, constraints, failure modes, what not to teach, credits, source table, unverified claims, open questions, handoff) are written for the whole course.

## Learner and context

Source of the learner facts: the accepted course brief (`work/career-brand/00-course-brief.md`), not external research. Outside sources cannot confirm anything about these learners; they only tell us what the readers on the other side do.

- **Who:** Dev Weekends fellows in Gaza, early career to mid level, aiming at remote work with international teams, founders and clients. Mostly engineers (backend, frontend, mobile, data), some product, design and operations.
- **Already know:** at least one job, internship, freelance gig, study project or volunteer role; usually a resume draft and a LinkedIn account; Git and GitHub. No training in writing, branding or measuring impact.
- **Language and device:** Arabic first, English second. Mostly phones, weak and expensive data, power cuts. Pages must be light, progress saved often, no autoplay video.
- **Time:** about 5 to 6 hours a week for about 5 weeks.
- **What hurts today:** they apply and hear nothing. Their best work is invisible: a GitHub link nobody runs, a resume full of "responsible for", numbers they cannot defend.
- **What they must be able to do after:** show real, shipped, measured work in seconds, defend every number ("how was that measured?", "what was your part?"), and walk into the founder interview (course 14) with proof ready.
- **What the evidence adds about the reader on the other side:** readers have more applications than time [S8]; fluent writing is now cheap and carries less signal [S13, S14]; nobody can reliably tell AI-assisted text from human text, and detectors misjudge non-native English [S16, S17]; developers' public traces are read for activity and collaboration [S1, S2]. Together these say: arrange checkable proof so it is seen first, and write plainly.
- **Not known and not researched here:** how remote founders weigh an applicant's location or nationality (see open questions).

## Domain model and vocabulary

The "domain" is the hiring conversation between a fellow's kit and a reader (founder, hiring manager, recruiter, client, or a tool that sorts applications).

**Actors:** the fellow (author of the kit); the reader (founder or hiring manager, who is short of time); the screener (a recruiter or a person sorting many applications); the software that sorts or searches (an applicant tracking system); the stranger who tries a demo; the mentor who reviews the kit; the AI interviewer (existing block from earlier courses).

**Core objects:** the career arc document (source of truth about roles and proof); the proof-of-work inventory (list of work with its evidence); the claim ledger (each public claim pointing to its evidence); the project plan; the resume; the profile; the case study; the post; the website plan; the recorded walkthrough.

**Lifecycle of a claim:** work done -> evidence found (log, dashboard, bill, test, user quote) -> claim written with before, after, window, source and the fellow's share -> claim placed in the kit -> claim questioned by a reader -> claim defended or corrected.

**Invariants:**
1. No claim without a source the fellow can name.
2. Ownership is stated as "I did" and "the team did", never blurred.
3. Anything shown publicly is reachable without setup and safe for a stranger.
4. The kit never depends on one platform.

**Plain-English vocabulary for writers** (adapt, do not copy):

| Term | Plain definition |
|---|---|
| Proof of work | Something a stranger can open and check: a running project, a case study with numbers, a merged contribution. |
| Claim ledger | A table with one row per claim in the kit: the line, its number, where the number came from, and how to re-check it. Course method. |
| Baseline | The number before the change. A result with no baseline means little. |
| Window | The period the number covers (for example the 14 days after launch). |
| Your share | The part you did, said separately from what the team did. |
| p50, p95, p99 | The time that 50, 95 or 99 out of 100 requests were at or below. p95 means 1 request in 20 was slower [S31]. |
| SLI, SLO, SLA | The measurement, the target for it, and a contract with consequences if missed [S31]. |
| Core Web Vitals | Google's three page experience measures: loading (LCP), responsiveness (INP), layout shift (CLS) [S34]. |
| Query plan | The database's chosen way to run a query, shown by EXPLAIN [S38]. |
| Applicant tracking system (ATS) | Software employers use to collect, store, search and sort applications. Employers set its rules; people make the decisions [S23, S24, S76]. |
| Demo account | A login that anyone may use, with fake data, small rights and a reset [S65, S66]. |
| Deployable unit | A project packaged so it runs the same elsewhere, for example a container [S75]. |
| Cold start (two-sided) | A platform has no value until both sides are present, so neither side joins [S54]. |
| Single-player mode | A way to use a product that is useful with no other users [S55]. |
| Appetite | The time you decide a problem deserves, before you shape the solution [S59]. |
| Community cloud | In the standard definition, shared infrastructure for a specific group with shared concerns [S56]. |

## Hard constraints

These shape the course architecture. Each has the evidence behind it.

**1. Every public claim must be checkable by the fellow who makes it.** Fluent writing no longer signals effort or ability [S13, S14]; people cannot reliably detect AI text [S16]; resume deception includes embellishment and omission, not only invention [S29]; the interviewer will ask "how was that measured?". So the architecture is evidence first: the proof-of-work inventory and claim ledger are built before any prose, and every later artifact (resume, profile, post, case study) is generated from the ledger. The honest sentence "I did not measure that, and here is how I would" is always allowed.

**2. The reader gives seconds, so evidence order and access matter more than polish.** Employers who publish how they hire report more applications than they can read closely [S8], the popular "six seconds" figure is untraceable [S5], and demos that sleep, expire or ask for sign-up lose the reader [S61, S67]. So the architecture needs a "ten second test" and a "stranger test" as gates, and a base layer of the showcase that survives free-tier limits (a static case study with a recording), with the live demo as a bonus.

**3. Phone, weak data, power cuts, Arabic-first, and measurement tools that need a laptop.** The measurement topic (k6, Locust, Lighthouse, EXPLAIN) assumes a computer and tools. Every measurement activity needs a no-install path (read a supplied dashboard export, answer the six reading questions) and a "bring your own number" path from a real job. Chapters stay short; downloads optional; no autoplay video [brief].

**4. AI help is allowed for editing and structure; numbers, ownership and judgment cannot be generated.** AI editing that fixes errors helped hiring in one large study [S12]; AI-written fluency has lost signal [S13, S14]; detectors misjudge non-native English [S17]. So the course teaches an "empty sentence" edit pass on fellows' own drafts, requires an AI-use log for projects, and offers a written option for every AI practice (brief). It never teaches tuning text to sound like or unlike a model, and never relies on a detector.

**5. Platform facts, free tiers and access change, and some services may not be available from Gaza.** Free tiers sleep, expire or restrict commercial use [S67, S68, S69]; Google sign-in has verification limits [S63]; topic K covers regional availability (see `research-platforms.md`). So every tool or platform claim is dated, marked "verify before publish", and each showcase step has an alternative that does not depend on a single service.

## Findings by topic

### A. What founders and hiring managers look for, fast

#### What the evidence says

**A1. The first look is short, but nobody has a trustworthy number for how short.** The popular claims are "six seconds" and "7.4 seconds". They come from a hiring-site company's eye-tracking work in 2012 and a 2018 follow-up. A recruiting-industry critique reports that the 2018 report does not say how many recruiters took part, what jobs were involved or how long the resumes were, and reads more like a guide to making resumes easy to scan than a measurement [S5]. The 7.4 second figure, as described by the same sources, is about the time to decide whether to keep reading, not time spent judging qualifications [S4, S5]. The honest, sourced version of "the first look is short" comes from employers describing their own volume. One company that hires programmers says it gets "way too many applications" to review work from all of them, so it screens first by cover letter and resume, then gives a small work test to only about 1 to 3 percent of applicants [S8]. A second company says its application review looks first at whether the candidate tailored the application and whether they have tried the product or read its public handbook [S9]. Both are single-company statements about their own process, so they are examples, not rules.

**A2. A stronger resume helps, but the effect is not equal for everyone.** In the best-known callback study, researchers sent fictitious resumes to newspaper job ads in two US cities. White-sounding names got about 50 percent more callbacks than African-American-sounding names. For white names a higher-quality resume produced about 30 percent more callbacks, and for African-American names the gain was far smaller [S6]. The study is from 2004 and about US newspaper ads, so it should not be used to predict anything about remote hiring today. What it supports is narrow and useful: resume quality does move callbacks, and a kit cannot fix every kind of bias. The course should not promise that a better kit will erase bias against a name, a place or a passport. No study found for this dossier measures the effect for applicants from Palestine (see open questions).

**A3. Developers are judged from their traces, and the people doing the judging know it.** A qualitative interview study of open source maintainers found that they look up strangers' profiles and activity history, and form views of expertise from a person's activity across projects and their collaboration with well-regarded projects [S1]. I could read only the abstract and a search summary of this paper, not the full text, so the exact interview count and the finer findings are unchecked. An IEEE Software article makes a related point: public traces such as open source work, social sites and knowledge-sharing sites could help people without a formal degree, but interpreting those signals is the hardest part, and developers know their traces are visible and may shape them [S2]. A 2024 preprint interviewing 15 recruiters in three countries reports that they valued information on languages and commit frequency but also wanted project popularity and history [S3]. I could not open that preprint, so this is a search summary only, low confidence. One more caution from a company that hires programmers: open source contribution is not possible for everyone because many capable programmers lack the time, and commercial code from past jobs is usually private and hard to attribute to one person [S8]. That is why shipped, runnable personal work and written explanations of work done at a job (with permission) both matter.

**A4. Certifications: there is no good evidence for software hiring, and the course must say so.** I searched for field experiments on certificates and software callbacks. I found registry entries for studies in design or early stages, and no published result I could read. The closest read evidence is a well-known field experiment on degrees, not certificates: a business degree from a for-profit online school got about 22 percent fewer callbacks than one from a non-selective public institution, and in health jobs the penalty was smaller where an external quality indicator such as a licence was required [S7]. That tells us the reputation of the issuer matters to employers in that setting. It does not tell us what a cloud or course certificate does for a software job. A company that hires programmers states plainly that it prefers seeing the real work over credentials or puzzles [S8]. This is the author's stated practice, not a measurement.

**A5. Founders and hiring teams describe "impact" and "ownership" in terms of what you did and how you talk about it.** Two employer handbooks are first-party and readable. One lists what its first interview looks for: proactivity, directness, good communication, an awareness of the impact of the candidate's work, and evidence of iteration [S9]. It does not define ownership and does not say how it is scored. The company with the take-home test says it wants to see good code, a sound thought process and skill applied to realistic problems, and that gold-plated extras can hurt while simpler solutions that meet the requirements scored well [S8]. A third handbook says its interviews use behavioral questions scored against company values, and the values it lists include results and iteration, as reported by a search summary [S11]. These are employer self-descriptions. None is a validated predictor of job performance, and each is from one company. The pattern is consistent, though: say what you changed, how you know, and what you would do next, in plain writing.

#### What the evidence does not show

- It does not show that recruiters give any resume "six seconds". It does not show GitHub stars or green squares predict anything about hiring.
- It does not show that certificates help or hurt software applicants.
- It does not show how remote founders hiring from Gaza read these signals.
- Founders writing about hiring are a small, self-selected set of voices. The YC essay on hiring a first engineer, for example, treats GitHub as a place to find people for cold outreach, not as a way to judge them [S10].

#### Phrase it this way

- "Nobody has a reliable number for how long a reader looks at a resume. What employers do tell us is that they receive far more applications than they can read closely, so the first look is quick and your best proof must be easy to find."
- "Founders who write about hiring say they would rather see something you built than a list of courses. That is their stated practice, not a law."
- "People who judge developers online look at what you actually did, over time, and who you worked with. They can also tell when a profile was arranged to look good, so keep it real."
- "We could not find a study that shows what a certificate does for a software job. Use it as a small line, and let shipped work be the headline."
- "Hiring teams that publish how they hire describe wanting to see your thinking: what you changed, how you know, and what you would do next."

#### Misconceptions to correct

| Myth | Correction |
|---|---|
| "Recruiters spend six seconds on a resume." | Not a measured fact about all recruiters. Origin is a company study with undisclosed sample and a critique says it measures the decision to keep reading [S4, S5]. |
| "Certificates get you hired." | No software-specific evidence found. Issuer reputation matters in the degree study [S7]. |
| "Hiring managers can check your GitHub contributions graph." | Evidence is about reading activity history and collaboration, not a count of squares [S1, S2]. |
| "A better resume removes bias." | Quality helped unevenly in the classic callback study [S6]. |

#### Design implications for the course

1. Teach the "decide in seconds" idea as an arrangement habit (best proof first, one link, no scavenger hunt), not as a statistic.
2. Give fellows a "ten second test" exercise: a partner opens the profile and says what they saw. This is course method, labeled as such.
3. A certificates line is optional and small. Do not spend a chapter on certificates.
4. Add a short honest note that a kit does not remove every bias, and that mentors can help choose where to apply.

---

### B. AI-written application materials

#### What the evidence says

**B1. Writing help that fixes errors can raise hiring.** A field experiment on an online labor market with nearly half a million jobseekers gave treated jobseekers algorithmic help on their resumes. The treated group was hired about 8 percent more often, with no sign that employers were less satisfied with the hires [S12]. Limits: it was one platform, the tool suggested fixes to common errors and did not write new text (the published version calls it nongenerative), and two authors consult for or received funding from the platform [S12]. The sensible reading is that clear, error-free writing helps and the help in this study was editing, not invention.

**B2. When everyone can write a fluent, tailored letter, writing alone says less.** Two independent economics papers study the same kind of platform after it launched an AI cover-letter tool. One reports that the link between how closely a cover letter matched the job post and the employer's callback fell by 51 percent after the tool arrived, that the tool raised match and callbacks for those who had access, and that employers shifted toward other signals including past work history [S14]. The other reports that, before LLMs, employers paid more to workers with more customized applications and that this premium is absent afterwards, and from a model it estimates that in a world where writing carries no signal the top fifth of workers by ability would be hired 19 percent less and the bottom fifth 14 percent more [S13]. Read at abstract level only. The 19 and 14 percent figures come from a model counterfactual, not from observed hiring, and the data are from one freelancing platform. What a chapter can say is the direction: the more fluent writing is cheap, the more weight moves to things a reader can check, such as shipped work and history.

**B3. People cannot reliably tell AI-written self-descriptions from human ones.** Six experiments with 4,600 participants found people could not reliably detect AI-written profile and self-presentation text in professional, hospitality and dating contexts. They relied on cues like first-person pronouns, contractions and family topics, which are unreliable and can be exploited [S16]. A separate experiment found that when readers were told a profile was AI-written they trusted the host less, but only in a mixed set where some profiles were human-written, which the authors call the "Replicant Effect" [S15]. Both read at abstract or summary level only. Survey claims from resume-service companies say between roughly one in five and more than half of hiring managers would reject or disfavor a candidate who used AI. Those two figures conflict with each other and come from vendors who sell resume services [S22]. They are company claims and go in the unverified table.

**B4. Detectors flag non-native English writing.** A study of several widely used GPT detectors found they misclassified more than half of TOEFL essays written by non-native speakers as AI-generated (average false positive rate reported as 61 percent), while accurately classifying US eighth-grade essays [S17]. The authors caution against using such detectors in evaluative settings. This is directly relevant to the learners, who write English as a second language: a fellow who writes plain, careful English may look "AI-like" to a detector, and a hiring screen that relies on a detector may penalize them. Note that I could read only the abstract and press coverage; the 61 percent figure comes from press coverage of the paper.

**B5. AI screeners may prefer AI-written resumes.** A preprint reports that in simulated hiring pipelines across 24 occupations, LLMs shortlisted resumes written by the same model more often than equally qualified human-written resumes, with a self-preference range of 67 to 82 percent in the abstract (other versions report different figures) [S21]. It is simulated, it has not gone through archival peer review, and it does not show how employers actually screen. One large applicant tracking system states it never uses AI to rate candidates or auto-reject applications [S23]. So the honest lesson is not "write like a model to pass the filter". It is that a resume tuned to sound like a model has no information in it, and the course should not teach fellows to tune toward machine style.

**B6. Vocabulary that marks LLM text exists, changes by model era, and proves nothing about one document.** A study of over 15 million biomedical abstracts found style words whose use jumped after LLMs appeared, and estimated that at least 13.5 percent of 2024 abstracts were processed with LLMs (a lower bound, up to about 40 percent in some subcorpora) [S18]. A second research line found words such as "realm", "intricate", "showcasing" and "pivotal" had stayed rare for years and then surged from 2023 in computer science abstracts, and that its method works at population level and should not be read as a verdict on a single paper [S19]. A volunteer-written guide on spotting AI text in an encyclopedia lists patterns: inflated significance, vague attributions to unnamed "experts", trailing "-ing" phrases that add shallow analysis, "not just X, but also Y", overuse of lists of three, promotional adjectives, and heavy bold and emoji. The same guide warns that word lists date quickly, that humans judge poorly (it cites accuracy near chance), and that detector scores are not proof [S20]. I read the first part of that page only (about 100,000 of 251,000 characters). It is a secondary source, used here for orientation.

#### What the evidence does not show

- No peer-reviewed experiment I could find measures how evaluators actually treat applications they believe are AI-written. A registry entry describes one such study in development [S22].
- It does not show that using AI to help write is dishonest. It shows that generic text carries little information and that detection is unreliable in both directions.
- It does not show a "safe" list of words. A single word is weak evidence.

#### Phrase it this way

- "Writing help that fixes mistakes has been linked to more hires in one large study. The help in that study corrected errors. It did not invent claims."
- "When anyone can produce a smooth cover letter in a minute, a smooth letter proves less. Readers lean on things they can check: what you built, what the numbers were, who vouches for it."
- "Nobody can reliably tell if a profile was written with AI, not even the people who try. So the question is not 'will they catch me'. The question is 'does this say anything only I could say'."
- "AI detectors often wrongly flag English written by non-native speakers. If someone tells you your plain English 'sounds like AI', that is a known weakness of the tools, not a verdict on you."
- "Check your own draft for the habits that make text empty: big claims with no number, 'experts say' with no expert, three adjectives where one fact would do."

#### Misconceptions to correct

| Myth | Correction |
|---|---|
| "Recruiters can spot AI text in seconds." | One vendor survey says a third can; experiments show people are near chance [S16, S20, S22]. |
| "Use these ten words and you will be flagged." | Word lists date, and one word proves nothing [S19, S20]. |
| "Sound more like ChatGPT to pass the robot." | Evidence is simulated and not about real ATS behavior; a major ATS says it does not use AI to reject [S21, S23]. |
| "AI detectors are fair checkers." | They misjudge non-native English [S17]. |

#### Design implications for the course

1. Teach an "empty sentence" edit pass on the fellow's own draft, with patterns and no fixed list of banned words. Keep the pass about information content, not "sounding human".
2. Allow AI help for editing and structure, but require every number, claim and name to come from the fellow's own evidence (the proof-of-work inventory). A "claim ledger" check: for every line, point at the source.
3. Warn fellows once that detectors misjudge their English, and tell them what to do if a screen says "AI" (offer the working document, drafts and the evidence behind the claim).
4. The AI interviewer practice can probe "where did this line come from?", which tests ownership of the text.

### C. Honest metrics: faking, checkable claims, and how to measure

#### What the evidence says about faking and checkable claims

**C1. Resume misrepresentation is a studied behavior with three forms.** Researchers built and validated a measure of intentional resume deception with three dimensions: fabrication (inventing), embellishment (inflating) and omission (leaving out to mislead). In a survey of working adults who had recently searched for jobs, higher resume fraud was related to personality and moral-identity traits and predicted lower job performance and more workplace deviance, beyond deceptive behavior in interviews [S29]. I read this from a search summary of the abstract, not the full text. What this gives the course is vocabulary and a clear line: embellishment and omission count as deception when intended to mislead, not only outright invention. That is useful because fellows often think "rounding up" is not lying.

**C2. Checkable details are what truthful accounts tend to contain, in lab studies.** A meta-analysis of 20 studies (N = 1,532) on the "verifiability approach" found that truth tellers gave more details that could be checked than liars (effect size g = 0.42), while unverifiable details did not separate the two groups. The authors say replication and field studies are needed, and a study about lying on occupation found the approach did not discriminate [S30]. This is lab research on statements about events, not on resumes, and a search summary only. The responsible use is as a design idea for the course: a claim with a named source is easy to defend and easy for a reader to check, and a claim nobody can check invites doubt. It is not evidence that specific claims win jobs. I looked for a controlled study showing that numbers on a resume raise evaluators' ratings and found only vendor advice that cites no study [S45]. That claim goes in the unverified table.

**C3. Numbers need a baseline to mean anything.** A well-known resume formula from a former hiring head at a large tech company asks for three parts in a bullet: what you accomplished, measured by what, and how you did it, and notes that a percentage alone misleads because 12 percent of a small number is small [S25]. It is a practitioner formula (from a 2014 post), not research; the search summary I read confirms the idea but I did not open the original post.

#### Measurement, from official documentation

Each item below is a fact from a vendor or project page that the course can teach, with its date.

**Percentiles, not averages.** The Google SRE book explains that averages hide slow requests: in its example most requests take about 50 ms but 5 percent are 20 times slower, and an average-based alert misses the change. High percentiles such as the 99th approximate worst-case behavior and the median shows the typical case [S31]. A second chapter warns that a 100 ms average at 1,000 requests per second can still mean 1 percent of requests take about 5 seconds [S32]. In plain words for the course: p50 is the middle experience, p95 means 1 request in 20 was slower than this, p99 means 1 in 100.

**The window and aggregation change the number.** The same SRE chapter shows a per-second rate and a one-minute average can differ sharply, so a number is only meaningful with its aggregation interval [S31]. The SRE workbook adds that service level objectives (SLOs) use a window, and recommends a four-week rolling window as a general default [S33].

**SLI, SLO, SLA.** An SLI is the measurement (for example the share of requests under 300 ms), an SLO is the target for it, and an SLA is a contract with consequences if missed. The quick test in the SRE book is to ask what happens if the objective is missed: if nothing, it is an SLO [S31].

**Uptime as time.** The SRE workbook says 100 percent is the wrong target because change causes outages and each extra nine costs more [S33]. The course can add simple arithmetic (course method, not from a source): over a 30 day month, 99 percent allows about 7.2 hours of downtime, 99.5 percent about 3.6 hours, 99.9 percent about 43 minutes, and 99.99 percent about 4.3 minutes. Error budget is the complement of the SLO, for example 3,000 failed requests allowed in 3 million at 99.9 percent [S33].

**Four signals.** If you can measure only four things for a user-facing service: latency, traffic, errors and saturation. Track failed and successful request latency separately, because a fast error flatters the average [S32].

**Percentiles do not average.** Averaging per-server 95th percentile values gives "statistically nonsensical" results; histograms aggregate correctly because you sum the bucket counts first [S42]. A fellow reading a dashboard that shows an average of p95 across servers should ask how it was computed.

**Load testing.** In k6 a threshold such as `p(95)<200` on `http_req_duration` means 95 percent of requests must finish under 200 ms, and the run fails with a non-zero exit code if not [S35]. `http_req_duration` is sending plus waiting plus receiving time and excludes DNS and connection setup [S46]. A closed workload model, where each virtual user waits for its last request to finish, lets the test ease off when the server slows ("coordinated omission"), so results can understate the load and hide degradation. An open model with a fixed arrival rate keeps the load constant [S36]. Locust's quickstart and headless pages list requests, failures, average, minimum, maximum and median per request and requests per second. They describe users and spawn rate as the main settings, and do not describe other percentile columns [S37, S47]. Before teaching percentile columns in Locust, check your installed version (open question). For a before-and-after claim, run the same test script, the same data and the same machine class on both sides, and keep the script.

**Page performance.** Core Web Vitals today are LCP (loading, good at 2.5 s or less), INP (responsiveness, 200 ms or less) and CLS (layout shift, 0.1 or less), assessed at the 75th percentile of page loads, separately for mobile and desktop; INP replaced FID. Field data from real users is the authoritative measure; lab data from tools like Lighthouse is for development and cannot measure INP (page last updated 2024-10-31; checked 2026-10-25) [S34]. Lighthouse results vary from run to run for many reasons (local network, client hardware, page nondeterminism), and its own documentation recommends several runs and the median; it says the median of 5 runs is about twice as stable as one run [S40]. Lighthouse is an open-source audit tool, run from DevTools, the command line or PageSpeed Insights [S39]. A single screenshot of a score is therefore weak proof.

**Database query plans.** In PostgreSQL, EXPLAIN shows the planner's chosen plan with estimated costs, rows and width. EXPLAIN ANALYZE actually runs the query and adds real timings, so for INSERT, UPDATE, DELETE or MERGE wrap it in a transaction and roll back. Cost units are arbitrary (conventionally disk page fetches), are not milliseconds and are not comparable to real time. Documentation page checked is for PostgreSQL 18 (checked 2026-10-25) [S38]. A good proof pair is the plan before and after an index, with actual time and the row counts.

**Cloud cost.** AWS Cost Explorer shows up to 13 months of history, refreshes at least every 24 hours, with some data arriving later, and uses the same dataset as the cost and usage reports; the user interface is free and API requests cost $0.01 per paginated request (checked 2026-10-25) [S41]. For fellows who do not have a cloud account, the correct statement is: costs come from the bill or cost report, for a stated period, filtered by service or tag.

**Time saved by an automation.** I found no authoritative standard. Vendor blogs agree on the arithmetic (frequency times time per task times number of people), say to subtract what the automation still demands (build, review, fixes, maintenance), and say to time the task as it is done today, using the median, because people recall low [S44]. All are low-confidence vendor sources. The course can teach the arithmetic as its own method and require the "net, not gross" and "measured baseline" parts.

**Before-and-after is a weak design.** A single group observed twice cannot separate your change from everything else that changed (season, traffic, other releases). Secondary writing on experimentation says an unaffected comparison group upgrades the claim [S43]. In course terms: say what else changed in the window, and prefer a test you control (same load script, same data) over comparing last month with this month.

#### Reading numbers you did not set up

Course method built from the sources above. For any number on a dashboard a fellow did not create, they should be able to answer, in writing:

1. What is it measuring exactly (the definition, including what counts as an error)? [S31, S32]
2. Which percentile or statistic is it (mean, median, p95)? Is it a per-server number that was averaged? [S31, S42]
3. Over what window and with what aggregation interval? [S31, S33]
4. Where does the data come from, and how late can it be? [S41]
5. What else changed in the window?
6. Who owns the dashboard, and did they say the number may be used publicly?

#### What the evidence does not show

- Nothing found shows that quantified bullets win more interviews [S45].
- No source I found measures how often recruiters check claims. Surveys about background checks are from vendors and are not used here.
- Lab results on detecting lies do not transfer cleanly to resumes [S30].

#### Phrase it this way

- "Embellishing and leaving things out to mislead are both forms of resume deception that researchers measure. 'Rounding up' is not a safe middle ground."
- "A number is a claim with five parts: what, before, after, window and source. If you cannot name the source, do not print the number."
- "Averages hide slow requests. Say p95 or p99 and say over what window."
- "I did not measure that, and here is how I would" is a complete and honest sentence.
- "My share" is part of the number: say what you did and what the team did.

#### Misconceptions to correct

| Myth | Correction |
|---|---|
| "Faster average response time means users are happier." | Averages hide the slow tail [S31, S32]. |
| "A Lighthouse 98 is proof my site is fast." | Scores vary run to run, and field data is the authoritative measure [S34, S40]. |
| "Higher EXPLAIN cost means slower in milliseconds." | Cost units are arbitrary and not time [S38]. |
| "99.9 percent uptime means almost never down." | It allows about 43 minutes per 30 days (arithmetic). |
| "Numbers on a resume get more interviews." | Unverified; no controlled study found [S45]. |

#### Design implications for the course

1. The "claim card" (metric, before, after, window, source, your share, what else changed) is the central exercise of this topic. It is course method and is labeled as such.
2. Include a very small "measure it yourself" lab per variant (a k6 or Locust run, a Lighthouse median of five, an EXPLAIN pair), with the script kept as proof. Offer a no-install path for fellows who cannot run tools: reading a provided dashboard export and answering the six questions.
3. Give a template for the honest "not measured" sentence.
4. Teach "ask before using employer dashboards publicly" as a hard rule (matches brief privacy constraint).

---

### D. Strong projects in the AI era

#### What the evidence says

**D1. Studies of AI coding tools disagree, and the disagreement is the finding.** Four sources, all with narrow settings:

- A controlled experiment gave developers a task of writing an HTTP server in JavaScript as fast as possible. The group with GitHub Copilot finished 55.8 percent faster [S48]. Abstract only. One small, well-defined task from early 2023.
- Three field experiments inside large companies, pooled over 4,867 developers, found a 26.08 percent increase in completed tasks for developers given the tool, with a standard error of 10.3 percent, and larger gains for less experienced developers. The companies ran the experiments as part of normal operations. The paper is in Management Science; the sample count differs between versions (5,114 in an earlier draft) [S49]. Search summary only.
- A randomized trial of 16 experienced open source developers on their own large repositories (246 real issues, averaging about two hours) found they took 19 percent longer with early-2025 tools (mainly Cursor Pro with Claude 3.5 and 3.7 Sonnet). They had forecast a 24 percent speedup and still believed afterwards that AI had sped them up by about 20 percent. The authors say they do not claim AI slows most developers, and that self-reports of speedup can be very inaccurate [S26].
- The same group tried again with late-2025 tools. It reported changes in task time of about minus 18 percent for returning developers (interval minus 38 to plus 9) and minus 4 percent for new recruits (minus 15 to plus 9), which secondary write-ups describe as speedups of roughly 18 and 4 percent with intervals that include no effect. It judged the data "very weak evidence" because many developers refused to work without AI, pay changed, developers withheld tasks, and time was hard to log with several agents running. It says developers were probably more sped up than in early 2025 but that it cannot size the effect [S27]. The sign convention in the page I read was not fully clear to me, so the course should not quote these numbers at all.

What to say: results depend on the task, the developer's experience, the codebase and the tool, and the best study of experienced developers on their own code is explicitly out of date and replaced by an unreliable follow-up. The course must not claim "AI makes you 10 times faster" or "AI makes you slower".

**D2. Speed is not understanding, and a hiring reader will probe understanding.** A randomized trial with 52 mostly junior engineers learning a new Python library found the AI-assisted group finished about two minutes faster (not statistically significant) and scored 50 percent on a follow-up quiz versus 67 percent for the hand-coding group (a significant gap, largest on debugging questions). Participants who asked AI conceptual questions or asked for explanations scored higher than those who delegated code to it, though those subgroups were tiny (2 to 7 people) and not causal. Limits: small sample, immediate rather than long-term testing, a chat-sidebar tool and not an agent, one library [S28]. A separate industry report reaches a systems-level conclusion: AI acts mainly as an amplifier of the existing strengths or dysfunctions of an organization [S50] (search summary, the report's findings pages were not opened).

**What this means for a project.** If anyone can generate a working app in a weekend, a working app alone proves less (this is an inference from D1, D2 and B2, not a measured finding). What remains hard to fake, and what the course can ask for, is: a real person who used it, a measured result, decisions with reasons, a record of what was checked (tests, a failure you found and fixed), and honest labeling of what AI wrote and what the fellow understood. A reader who asks "how does this part work?" should get a real answer, which links directly to course 14's interview.

**D3. Open source contribution is a recognized way in, but not the only one.** GitHub's official help suggests finding issues labeled `good first issue` or `help wanted`, browsing topics, checking whether a project is actively maintained (for example via its Pulse page), and considering opening an issue before large work (checked 2026-10-25) [S51]. A guide on open source contribution says to start small, that documentation, translations, triage and review count as contributions, to read the CONTRIBUTING file first, and to open early drafts; it also says the contributor stays responsible for AI-assisted output [S52]. The research on barriers: a mixed-method study with 36 developers from 14 projects, plus a literature review, organized 58 barriers for newcomers including 13 social barriers, a period that "frequently leads to dropout" [S53] (abstract and summary only). Practical reading: the first contribution is hard mostly for social and orientation reasons, so a small documentation or test fix with an issue discussion beforehand is a sound first step. The company that uses take-home tests notes that open source is not possible for everyone and that private work code is hard to show [S8], so open source should be an option and not a requirement in the course.

**D4. Two-sided platforms stall because of the cold-start problem, so a marketplace-style side project usually has no users.** The economics literature on platforms says a new two-sided platform must reach critical mass on both sides at once, and one paper formalizes this with the idea that a platform has to cross a frontier of participation on both sides to launch [S54] (abstract read through a search summary). An influential practitioner essay argues that many network products got going through a single-player mode, a standalone use that does not need other users (examples: private photo storage, time-shifted television) [S55]. The claim "most such side projects never get real users" is a reasonable inference from the cold-start argument, but I found no data that counts side projects, so the course should state it as an inference, not a statistic (see unverified claims). The practical filter that follows: choose an idea that is useful with one user, or with a small known group, on day one.

**D5. "Community cloud" is a defined term and a usable project idea.** NIST defines a community cloud as cloud infrastructure reserved for exclusive use by a specific group of consumers from organizations with shared concerns (mission, security requirements, policy, compliance), owned, managed and operated by one or more of them, a third party or both, on or off premises [S56] (definition read from NIST's glossary page; the SP 800-145 PDF text was not readable in my tool). Volunteer computing is a working precedent for pooling spare capacity from many contributors to serve shared goals: the BOINC project says it lets people donate spare computing to science, with about 30 science projects using it (home page checked 2026-10-25) [S57], and its 2004 design paper describes public-resource computing and notes that SETI@home started in 1999 and ran on about a million computers by then [S58] (search summary only). As a course example, a community cloud passes the filter if it starts with a defined small group, a real workload, and a measurable result (jobs run, hours of compute used, cost avoided). This is a design suggestion drawn from the definitions, not a claim that any particular group built one. It must be presented as "one example of an idea that fits the filter", not as the sponsor's project.

**D6. Plan the project with a time box and a measurable goal.** Shape Up (a first-party book from a software company) separates an estimate from an appetite: decide how much time the problem deserves, then shape a solution that fits, with fixed time and variable scope [S59]. SMART objectives (specific, measurable, assignable, realistic, time-related) come from a 1981 management article by Doran, which I could verify only through secondary sources, and one source says the author called it a writing aid and not a rigid rule [S60]. For fellows with 5 to 6 hours a week, an appetite of a few weeks, one user type, one core flow and one number to move is a defensible shape. The specific "idea filter" in the brief is course method.

#### What the evidence does not show

- No evidence that any particular project type, such as a portfolio clone or a to-do app, helps or hurts hiring.
- No evidence from remote-hiring contexts about how readers weigh AI-assisted code. The reader-reaction work in topic B is about text, not code.
- Nothing on how often side projects get users.

#### Phrase it this way

- "Studies of AI coding tools disagree because they measure different tasks, people and tools. Do not promise a speed number. Promise a record of what you checked."
- "A project that was fast to build proves less than a project someone used. Find one real user before you build the second feature."
- "Two-sided apps need both sides to show up at the same time. That is why a small tool that is useful to one person usually beats a marketplace with no sellers."
- "A community cloud, in the standard definition, is infrastructure shared by a group with a common purpose. That is a small, real, testable idea."
- "Fix a time box first, then fit the scope to it."

#### Misconceptions to correct

| Myth | Correction |
|---|---|
| "AI makes everyone twice as fast." | Mixed evidence; one trial on experienced developers found slower, with forecast and belief both wrong [S26, S27]. |
| "AI makes developers slower." | That trial's authors say they do not claim it; its follow-up is unreliable [S26, S27]. |
| "If AI wrote it, I do not need to understand it." | Debugging understanding was where the learning gap was largest in one trial [S28]. |
| "Build a marketplace, users will come." | Critical mass on both sides is the hard part [S54]. |
| "You must contribute to famous open source to be taken seriously." | Not required; small docs and test fixes count, and some employers say open source is not possible for everyone [S8, S52]. |

#### Design implications for the course

1. Project plan template with: user and use, appetite in weeks, one measurable goal, one-user-first rule, an AI-use log (what AI did, what I checked, one thing it got wrong), and a "first real user" milestone.
2. The idea filter: useful to one person or a small known group on day one; shows measured results; can be explained in writing; avoids needing two sides to exist at once.
3. A short, optional open source path with a safe first step (docs or test fix, discuss in an issue first), alongside a no-open-source path.
4. Teach "what I understood" evidence: a short written explanation of the hardest part, and one bug found and fixed.

---

### E. Showcasing so people look

#### What the evidence says

**E1. Forced sign-up costs visitors, but the best numbers are company claims.** A usability research company reports that 18 percent of online shoppers who abandoned a cart said the site wanted them to create an account (list last updated 2025-09-22; sample size, method and date of the underlying survey are not shown on the page I read) [S61]. That is about checkout, not demos, and it is a company claim. I found no peer-reviewed study of sign-up friction for portfolio demos. The course may say "extra steps lose visitors, and shoppers say account creation is one reason they leave" and must not give a number as a law for demos. The brief already commits the course to instant access: sign in with Google, or a ready demo account.

**E2. Sign in with Google is a documented, standard route.** Google's documentation describes it as letting users sign in with their Google Account, returning an ID token for sign-in; it separates sign-in (authentication) from asking for Google data later (authorization), and says new web apps should enable FedCM (checked 2026-10-25) [S62]. OAuth 2.0 is a standard (RFC 6749, 2012, updated by later RFCs including RFC 9700) in which the application never sees the user's Google password: the browser is sent to the authorization server, a short-lived code comes back, and the app exchanges it for tokens [S64]. For the course, the practical limits are on Google's consent screen page: while an app is in testing mode, up to 100 test users can be listed and their authorizations expire after 7 days, except when the app asks only for name, email and profile (openid, userinfo.email, userinfo.profile), which need no test list and have no warning or 7 day expiry. In production any Google user can authorize; verification is needed for sensitive or restricted scopes, and an unverified app that needs them is capped at 100 new users over the project's lifetime [S63]. So a demo that asks only for name, email and profile avoids the verification trap. Whether this works from Gaza is topic K (see `research-platforms.md`).

**E3. A demo account must be safe for a stranger, and security guidance says how.** OWASP's authentication guidance sets expectations that matter for a shared demo login: throttle guessing attempts and tie lockout to the account, not the source address; allow long passphrases; check passwords against breached lists; MFA is the best single defense against password attacks; and do not give front-end logins to internal service accounts [S65]. Its secrets guidance says to keep secrets out of source code and repositories, rotate and revoke (restarting the app does not revoke a stolen credential), give each job the least privilege, and treat environment variables with caution because they can leak into logs and dumps [S66]. From these the course can derive a demo checklist (course method, labeled as such): the demo runs on seeded fake data with no real person's information; the demo account has limited rights and cannot reach real email, SMS, payments or paid APIs; spending and rate limits are set on any paid service; the data resets on a schedule; the repository holds no real keys (only an example env file); and the page says plainly that it is a demo.

**E4. A deployable unit means a README that works, plus a container or a one-command start.** Docker's docs describe a container as an isolated process with all the files it needs, and say a container that runs on a developer's machine should behave the same in the cloud [S75]. GitHub's README guidance: say what the project does, why it is useful, how to get started, where to get help and who maintains it; GitHub shows a README from `.github`, the root or `docs` (in that order of checking) and truncates content beyond 500 KiB; a README in a repository named like your username shows on your profile [S72]. A study that annotated 4,226 README sections from 393 repositories found "what" and "how" information most common and that many READMEs lack the purpose and status of the project [S73]. Course use: the README answers, in this order, what it is, a screenshot or short demo link, how to try it in under a minute, how it was measured, and what is not done.

**E5. Free hosting tiers have limits that break demos. All checked 2026-10-25, and all must be marked "verify before publish".**

| Service | Limits that matter for a demo | Source |
|---|---|---|
| Render free web service | Spins down after 15 minutes without traffic and takes about a minute to wake; 750 instance hours per month per workspace; no persistent disk; free Postgres is 1 GB and expires 30 days after creation with a 14 day grace period before deletion; outbound mail ports blocked | [S67] |
| GitHub Pages | Site up to 1 GB; soft 100 GB per month bandwidth; soft 10 builds per hour; not for running a business, e-commerce or commercial SaaS; not for sensitive transactions | [S68] |
| Vercel Hobby | Free; personal, non-commercial use only; included usage such as 100 GB fast data transfer and 1,000,000 function invocations per month; limits reset after a wait of up to 30 days when exceeded | [S69] |
| Cloudflare Pages Free | 500 builds per month; 20,000 files per site; 25 MiB maximum per asset; 100 projects | [S70] |
| Netlify Free (credit based) | 300 credits per month with a hard limit; a production deploy costs 15 credits, 1 GB of bandwidth costs 20 | [S71] |

Two lessons the course can teach from the table. First, a demo that sleeps for a minute is bad for a visitor who gives you ten seconds, so a static front end or a short wake-up note matters. Second, a free tier that expires (a database that disappears after 30 days) will break a link in a resume months later, so the resume link should point to something that lasts, such as a static case study page plus a screen recording, with the live demo as a bonus. Commercial-use rules also mean a fellow who earns money from a project should read the plan terms.

**E6. Short demo videos: shorter is better, up to a point, and the research is about teaching.** A study of 6.9 million video watching sessions on one MOOC platform found that engagement was close to complete for videos shorter than 6 minutes and fell as videos got longer, with the authors advising shorter segments [S74]. I could confirm this only from summaries, not from the paper's text. It is about lecture videos, not demos. Course use: a demo is 60 to 120 seconds (course method), starts with the result, and has captions, since viewers may watch without sound. Many fellows are on weak, costly data, so link to a screenshot first and offer video as optional. No autoplay (matches brief).

#### What the evidence does not show

- No evidence on what length of demo video wins interviews. The only data are lecture videos.
- No evidence from peer-reviewed work on how much demo friction costs. The 18 percent figure is a company claim about shopping carts [S61].
- Free tier limits change often. Everything in the table is a dated snapshot.

#### Phrase it this way

- "Reviewers give you seconds, not minutes. If they have to make an account, many will leave. Let them in with one click or a ready demo login."
- "A demo login is a door that strangers will push on. Give it fake data, small rights, and a reset."
- "Never put a real key in your code. If a key was ever pushed, assume it is stolen and replace it."
- "Free hosting plans sleep, expire and change their rules. Check the plan page the week you publish, and keep a screenshot and a short recording as a backup."
- "Your README is the first page of your project. Say what it is, show it, tell how to try it in a minute, and say what is not finished."

#### Misconceptions to correct

| Myth | Correction |
|---|---|
| "Free hosting is permanent." | Plans expire databases, sleep services and restrict commercial use [S67, S68, S69]. |
| "A demo link is enough proof." | It can be asleep, expired or empty; add a recording and a measured result. |
| "Sign in with Google needs a long approval." | Asking only for name, email and profile avoids test-user and verification limits [S63]. |
| "A shared password in the README is fine." | Only if it is a throttled, seeded, low-rights demo account with no real data [S65, S66]. |

#### Design implications for the course

1. Showcase module includes a "stranger test": a classmate opens the link on a phone with no help and reports the time to first useful screen.
2. Offer two instant access paths (Google sign-in with minimal scopes, or a seeded demo login) and a no-hosting path (case study page plus recording) for fellows who cannot deploy.
3. The demo safety checklist above is a gate item. It is the "safe for a stranger" part of the brief's production bar.
4. Free-tier table is marked "verify before publish" and re-checked at G5.

---

### F. Resume

#### What the evidence says

**F1. Length and structure: the only data are from a resume-service company.** A resume-writing company ran a simulated screening with 482 professionals who recruit or hire. Half the resumes were one page (350 to 500 words) and half two pages (700 to 850 words), each pair with similar content. Of the 7,712 resumes the participants selected, 5,375 (about 70 percent) were two pages. Two-page resumes were preferred 1.4 times as often at entry level, 2.6 times at mid level and 2.9 times at managerial level. The authors say it is only a simulation and that recruiters may not know their own preference; the page does not address the company's own interest [S80]. It is not peer reviewed. The sensible reading is narrow: a second page did not hurt in this simulation when there was content to fill it. It does not show that long resumes win. The course should teach "include what is proven and relevant, in order of strength, and cut the rest" and treat page count as a result of that, not a rule. For most fellows (early career to mid level) that will usually mean one page, which is a course recommendation and not a research finding.

**F2. Applicant tracking systems: what is fact and what is myth.**

- *Myth:* "75 percent of resumes are rejected by robots before a human sees them." An HR consultant tried to trace it and found it came from a 2012 sales pitch by a resume-optimization company that went out of business in 2013, with no study behind it [S76, S77]. An ATS vendor's blog repeats the same account [S76]. I did not open the consultant's original post.
- *Fact, first-party:* A major ATS company states it never uses AI to rate candidates or auto-reject applications, that its AI is meant to assist recruiters, and that human recruiters and hiring teams make decisions (blog post dated 2025-01-08) [S23].
- *Fact, research:* A Harvard Business School and Accenture study of employers in the US, UK and Germany reports that more than 90 percent of employers using recruitment software rely on it for a first cut or ranking (94 percent for middle-skills roles, 92 percent for high-skills), that these systems use "negative" filters, and gives as one example a filter that ranks down candidates out of work about six months [S24]. This is an employer survey, mostly of firms using such software, so it does not describe a two-person startup that reads applications from an inbox. Both statements can be true: tools sort and filter by rules that employers set; the rules and the decisions are people's.
- *Fact, parsing:* When a resume is uploaded, the system tries to read it into fields. One ATS's help page says a resume may fail to import if it lacks enough information, has a non-standard file type or contains characters the parser cannot read [S78], and lists accepted uploads as Word (.doc, .docx), PDF, RTF and plain text, up to 100 MB [S79]. The same page tells employers who want portfolios or large files to ask for a link to a third-party site, which supports putting links in the resume [S79]. Layout advice found online (avoid columns, text boxes and graphics) is mostly from resume-service blogs; I did not find it in first-party help pages, so the course should present it as a cautious habit, not a rule from the vendor.
- *Not supported:* "Keyword stuffing", hidden white text or copying the posting into the resume. The course rule (see Hard constraints) is that these are dishonest or useless, and no source I read says they work.

**F3. Tailoring to a posting: modest, plausible, thinly evidenced.** I found no controlled study isolating resume tailoring. A resume-service company reports a field study of 7,287 application submissions with interview rates of 10.7 percent with no cover letter, 12.5 percent with a generic one and 16.4 percent with a tailored one [S81]; it is a vendor result about cover letters (search summary only, low confidence). One company that publishes its hiring process says reviewers look at whether the application was tailored and whether the candidate tried the product or read its public handbook [S9]. Against this, two economics papers show that a polished, tailored-looking letter lost its predictive power once AI tools made it cheap [S13, S14]. Reading these together (inference): tailoring still earns attention when it is real, meaning it changes which evidence comes first and shows you looked at the employer's work, and earns nothing when it is a paste of the posting's words.

**F4. Links to live demos, case studies and writing.** No study measures this. What is known: an ATS vendor suggests asking for a link when files are large [S79]; a company that hires programmers screens first by cover letter and resume and looks at work later [S8]; and demos are fragile (topic E). The course rule is to put two or three stable links, labeled by what the reader gets ("Case study: cut report time from 12 to 3 minutes") and to test them on a phone.

**F5. Bullet shape: ownership plus result plus method.** A practitioner formula from a former hiring head at a large tech company asks for: what was accomplished, measured how, by doing what [S25]. The course adds two parts that come from the honest-metrics topic: the baseline (before and after, over what window) and your share (what you did, what the team did). A bullet that works: action verb, what you owned, the change in a measured thing with before and after, the method in a few words. Employers who write about hiring list awareness of impact and proactivity [S9] and sound thought process [S8] but none of these sources defines a bullet format. The format is course method.

#### What the evidence does not show

- Nothing found shows an ideal length, a best template or a best file format.
- Nothing found shows how much ATS parsing errors cost candidates in practice.
- Nothing found shows that quantified bullets, or tailored resumes, raise callbacks in software hiring [S45].

#### Phrase it this way

- "There is no proven right length. Put your strongest proof first and cut anything that does not help this reader."
- "The story that most resumes are thrown out by a robot has no source. What is true is that some employers use software to sort and filter, and people set the rules and make the decisions."
- "Send a simple file that a program can read: text you can select, normal headings, a standard format. Put your links as plain text as well as clickable."
- "Tailoring means changing what goes first, not copying their words. If you cannot back a line with proof, take it out."
- "A bullet says what you owned, what changed, how you know, and what part was yours."

#### Misconceptions to correct

| Myth | Correction |
|---|---|
| "One page only, always." | The only data are a company simulation that favored two pages [S80]; no peer-reviewed rule. |
| "75 percent of resumes never reach a human." | Traced to a defunct company's 2012 sales pitch with no study [S76, S77]. |
| "Add the posting's keywords in white text." | Dishonest and unsupported; the course must not teach it. |
| "ATS tools score you with AI and reject you." | A major vendor says it never does; but employer-set filters and rankings are common [S23, S24]. |
| "A fancy template shows skill." | A parser may not read it; simple is safer [S78]. |

#### Design implications for the course

1. Resume chapter teaches evidence order (proof first), a bullet recipe with a baseline and "my share", a plain file, and an "ATS-plain" check (select all and paste into a text editor: is the order and wording intact?). That check is course method.
2. Tailoring exercise: take one real posting and change three things (first bullets, project order, summary line), each backed by a claim ledger entry. No keyword copying.
3. Links exercise: two or three stable links with plain-language labels, tested on a phone.
4. The resume ends with a "claim ledger": every line pointing to a source in the proof-of-work inventory, so the AI interviewer can probe it.

---

### G to K

LinkedIn, outreach and comments, writing and distribution, the career arc document, and access from Gaza: see research-platforms.md.

## Existing courses and gaps

Scanned by search only, with no syllabi read in full, so this is orientation and low confidence [S84, S86].

- **What exists:** resume-writing courses built around "ATS-proof" resumes with keyword tailoring, master resumes and formatting for parsers; a short paid course on building a GitHub profile (about 4 sections, 57 minutes by its listing); general portfolio and personal branding courses aimed at designers and clients; a specialization on using AI tools to write profiles and content.
- **What they appear to omit:** the evidence side. No listing I saw covers turning work into defensible numbers (baseline, window, source, your share), reading dashboards you did not set up, planning a project that gets a real user, or defending the kit under questioning. None appeared to address English as a second language, phones and weak data, or detectors flagging non-native writing.
- **Where they are probably wrong:** many are organized around beating an ATS with keywords. The evidence in this dossier says the "robot rejects 75 percent" story has no source [S76, S77], that a major ATS says it does not auto-reject with AI [S23], and that tailored writing lost signal once AI made it cheap [S13, S14]. Teaching keyword matching as the main strategy is therefore weak. (This is an inference from titles and module summaries, not from reading the courses.)
- **Do not copy structure.** The gap is "proof first, then profile", not another template course.

## Technical landscape

Versions and limits checked on 2026-10-25. Mark all of these "verify before publish" and re-check at G5.

| Item | State checked | Source |
|---|---|---|
| PostgreSQL docs | EXPLAIN page is for PostgreSQL 18 (18.6 docs) | [S38] |
| Locust | 2.47.0 on PyPI, uploaded 2026-10-21 | [S85] |
| Lighthouse | 13.5.0 on npm (latest tag) | [S85] |
| k6 | v2.3.0 published 2026-09-21 (GitHub releases API) | [S85] |
| Core Web Vitals | LCP, INP, CLS; INP replaced FID; page updated 2024-10-31 | [S34] |
| AWS Cost Explorer | 13 months of history, 24 hour refresh, UI free, API $0.01 per paginated request | [S41] |
| Sign in with Google | ID token for sign-in; FedCM advised for new web apps | [S62] |
| OAuth 2.0 | RFC 6749 (2012), updated by RFC 8252, 8996 and 9700 | [S64] |
| Free hosting limits | see table in topic E | [S67] to [S71] |
| Docker | container docs page; no version needed for the course | [S75] |

Licences and traps to state plainly in chapters: Vercel Hobby is personal and non-commercial only [S69]; GitHub Pages is not for running a business or e-commerce [S68]; Render free Postgres is deleted after its grace period [S67]; Netlify free has a hard credit limit [S71]. Tools such as k6, Locust and Lighthouse are open source; check each licence before recommending a bundled install (not checked here).

## Production failure modes

How a fellow's kit fails. I have no data on fellows' kits, so these are composites derived from the sources. Each is marked with its basis.

1. **The unsupported number.** A bullet says "improved performance by 40 percent" and the fellow cannot say before, after, window or source. Basis: honest-metrics topic [S29, S31, S33]; the interviewer's two standard questions (brief).
2. **The average that hides the tail.** "Average response time 120 ms" with no percentile. Basis: [S31, S32].
3. **The lucky screenshot.** One Lighthouse run offered as proof; a re-run gives a different score. Basis: [S40].
4. **The before-and-after that is really the calendar.** Last month versus this month with other releases and traffic changes in between. Basis: [S43] (secondary).
5. **The sleeping or expired demo.** A free-tier link takes about a minute to wake or the database is gone after 30 days. Basis: [S67].
6. **The leaked key.** A key pushed to a public repository stays exposed after the file is deleted from the latest version; the code host's push protection blocks known formats before the push but does not undo an earlier leak [S83]. A security company reports 23.8 million new secrets on public GitHub in 2024 (company claim, low confidence) [S82]. Rotate and revoke; restarting an app does not revoke stolen credentials [S66].
7. **The unsafe demo account.** Shared password with real data, no throttling, access to paid APIs. Basis: [S65, S66].
8. **The sign-up wall.** A demo that needs an account and an email confirmation before showing anything. Basis: [S61] (company claim), brief.
9. **The two-sided app with no users.** A marketplace or matching app that needs both sides to exist. Basis: [S54, S55].
10. **The AI project nobody can explain.** A working app whose author cannot answer how a part works. Basis: [S28], and the interview in course 14.
11. **The empty sentence.** Inflated significance, unnamed "experts", three adjectives in place of one fact. Basis: [S20] (secondary), [S13, S14].
12. **The "AI-sounding" false alarm.** A fellow's plain, careful English is flagged by a detector or by a reader's guess. Basis: [S17, S16].
13. **The keyword-stuffed resume.** The posting's words pasted in; no sourced evidence for it working, and it removes information. Basis: [S76, S77] for the myth; no source supports the tactic.
14. **The resume nobody can open or parse.** Image-only file, odd characters, unusual file type. Basis: [S78, S79].
15. **The blurred ownership.** "We built" written as "I built"; a team dashboard presented as personal. Basis: [S29] (embellishment counts as deception); course rule on "your share".
16. **The private data in public.** Employer dashboards, client names or secrets shown in a case study or recording without permission. Basis: brief privacy constraint; [S66].
17. **The video that needs data.** A long demo on a weak connection. Basis: [S74] (lecture video context) and the brief.

## What not to teach

- **Interview technique, salary negotiation, visa and contract law** (course 14 and brief non-goals).
- **Basic professional English and first LinkedIn basics** (course 7).
- **Building the project in code.** The course plans, sets the bar and teaches showcase.
- **Any claim of what "the six second rule", "75 percent ATS rejection" or "everyone uses ATS" mean** (unverified; see table).
- **Keyword stuffing, white text, copying postings, fake experience, inflated numbers, bought followers, engagement pods, automation that breaks platform rules** (dishonest or against terms; see `research-platforms.md` for platform rules).
- **AI detection as a skill.** The evidence says people and detectors are unreliable and biased against non-native English [S16, S17]. Teach editing your own drafts, not judging others'.
- **A fixed list of "AI words" to avoid.** Word lists date by model era [S19, S20].
- **Specific speed multiples for AI coding tools.** Evidence is mixed and the best experienced-developer study is out of date and was replaced by an unreliable follow-up [S26, S27].
- **Certification shopping.** No evidence found; at most a small line in the resume.
- **Deep load-testing, tracing or cost optimization.** Teach the reading and the before/after claim, not performance engineering. A fellow needs one honest number, not a platform.
- **Paid advertising, design tools in depth, video editing in depth** (brief).
- **Founder and investor opinions as facts.** Quote practices as "a company that publishes its hiring process says".

## Credits

Rule: a chapter credits at most two or three researchers or organizations by name, in plain words, with a link. No founders or investors are named; companies that publish hiring practices are described without names ("a software company that publishes how it hires"). The dossier source table keeps the names for traceability.

| Chapter theme | Credit these | Do not name |
|---|---|---|
| How profiles and activity are read | Marlow, Dabbish and Herbsleb (CSCW 2013); Capiluppi, Serebrenik and Singer (IEEE Software 2013) [S1, S2] | Specific company hiring pages |
| AI-written application materials | Wiles, Munyikwa and Horton (editing help and hires) [S12]; Galdin and Silbert, and Cui, Dias and Ye (writing as a signal) [S13, S14] | Specific platforms where studies were run, unless a chapter needs it |
| Detecting AI text | Jakesch, Hancock and Naaman (people cannot tell) [S16]; Liang and colleagues (detectors and non-native writers) [S17] | Vendors who sell detectors or surveys |
| Honest metrics | The Google SRE authors' published book and workbook [S31, S33]; Henle, Dineen and Duffy (resume deception) [S29] | Employer names for example numbers |
| AI and project speed | The METR research team [S26, S27]; Peng and colleagues, and Cui and colleagues [S48, S49]; the Anthropic research team [S28] (describe, do not rank) | Any individual developer from the studies |
| Platforms and two-sided cold start | Evans and Schmalensee [S54] | Founders who wrote practitioner essays |
| Showcase and demos | OWASP cheat sheets [S65, S66]; the PostgreSQL, k6, Locust and web.dev documentation teams where a tool is shown | Hosting vendors in credits (name them in the tool step only, with a date) |
| Resume | The Greenhouse support articles for file facts [S78, S79]; the HBS and Accenture hidden workers report [S24] | Resume-service companies (use their data only as "a resume company's simulation") |

## Source table

All pages were checked on 2026-10-25 unless noted. "Read" says what I actually read: **full text** (read through the fetch tool, which returns a model summary of the page, so quotes were not taken from it), **abstract** (abstract or landing page only), **summary** (a search-result summary only, page not opened or not openable). I never claim more than that. Confidence: high, medium, low as defined at the top.

| ID | Claim supported | Source | Type | Read | Confidence |
|---|---|---|---|---|---|
| S1 | Maintainers form impressions of strangers from activity history and collaboration with high-status projects | Marlow, Dabbish, Herbsleb, "Impression Formation in Online Peer Production: Activity Traces and Personal Profiles in GitHub", CSCW 2013, doi 10.1145/2441776.2441792 | Peer-reviewed, qualitative | summary | medium |
| S2 | Public online traces can help people without degrees; interpreting them is hard; developers know traces are visible | Capiluppi, Serebrenik, Singer, "Assessing technical candidates on the social web", IEEE Software 30(1) 2013, https://bura.brunel.ac.uk/handle/2438/7042 | Peer-reviewed | abstract | medium |
| S3 | 15 recruiters in three countries valued language and commit data but wanted popularity and history | UFMG preprint on recruiters and GitHub data (LATAM 2024), https://homepages.dcc.ufmg.br/~figueiredo/publications/latam2024preprint.pdf | Preprint | summary (page could not be opened) | low |
| S4 | The 2018 eye-tracking figure of 7.4 seconds and 2012 figure of six seconds | The Ladders eye-tracking studies 2012 and 2018 (original PDF not retrievable); described in S5 | Company study | not opened | low |
| S5 | The 2018 report does not disclose sample or job types; reads as guidance; figure is about deciding to keep reading | ERE Media, "Is the 6 second resume scan a myth?", https://www.ere.net/articles/is-the-6-second-resume-scan-a-myth | Industry analysis | full text | medium |
| S6 | White names got about 50% more callbacks; quality raised callbacks 30% for white names, far less for Black names; Boston and Chicago newspaper ads | Bertrand, Mullainathan, "Are Emily and Greg More Employable than Lakisha and Jamal?", NBER w9873, https://www.nber.org/papers/w9873 | Field experiment | abstract | high |
| S7 | For-profit online business degree got 22% fewer callbacks; effect smaller with licence requirement | Deming, Yuchtman, Abulafi, Goldin, Katz, AER 106(3) 2016, NBER w20528, https://www.nber.org/papers/20528 | Field experiment | abstract | high |
| S8 | Screens by cover letter and resume; 3-5 hour assignment to 1-3% of applicants; open source and prior code not feasible for everyone; avoids puzzles | 37signals / Basecamp, "Hiring programmers with a take-home test", 2020-04-28, https://signalvnoise.com/svn3/hiring-programmers-with-a-take-home-test/ | First-party employer writing | full text | medium (one company) |
| S9 | Talent interview looks for proactivity, directness, communication, awareness of impact, iteration; checks tailoring and product use; paid work-sample day | PostHog handbook, hiring process, https://posthog.com/handbook/people/hiring-process | First-party employer handbook | full text | medium (one company) |
| S10 | The first-engineer essay treats GitHub as a sourcing channel, not as an assessment method | Y Combinator blog, "How to Hire Your First Engineer", 2018-08-21, https://www.ycombinator.com/blog/how-to-hire-your-first-engineer | First-party essay | full text | medium |
| S11 | Interviews are values-based and behavioural | GitLab handbook, hiring, https://handbook.gitlab.com/handbook/hiring/ | First-party handbook | summary | low |
| S12 | Algorithmic writing help raised hiring about 8%; no drop in employer satisfaction; non-generative tool; one platform; authors' platform ties | Wiles, Munyikwa, Horton, Management Science 2025, NBER w30886, https://www.nber.org/papers/w30886 | Field experiment | abstract | medium |
| S13 | Customization premium absent after LLMs; model counterfactual of 19% and 14% | Galdin, Silbert, "Making Talk Cheap: Generative AI and Labor Market Signaling", arXiv 2511.08785 | Working paper | abstract | medium |
| S14 | Correlation between letter alignment and callbacks fell 51% after AI tool; employers shifted to other signals | Cui, Dias, Ye, "Signaling in the Age of AI: Evidence from Cover Letters", arXiv 2509.25054 | Working paper | abstract | medium |
| S15 | Replicant Effect: distrust of AI-labelled profiles only in mixed sets | Jakesch, French, Ma, Hancock, Naaman, CHI 2019, https://sml.stanford.edu/publications/2019/ai-mediated-communication-how-profile-generation-ai-affects-perceived | Peer-reviewed experiments | abstract | medium |
| S16 | People could not reliably detect AI-written self-presentations; six experiments, N=4,600; flawed heuristics | Jakesch, Hancock, Naaman, PNAS 120(11) 2023, arXiv 2206.07271 | Peer-reviewed experiments | abstract | high |
| S17 | GPT detectors misclassified non-native English essays; average false positive rate 61.22% reported in press coverage | Liang, Yuksekgonul, Mao, Wu, Zou, Patterns 2023, arXiv 2304.02819 | Peer-reviewed | abstract plus press summary | medium |
| S18 | Excess-vocabulary method; at least 13.5% of 2024 biomedical abstracts LLM-processed | Kobak, Gonzalez-Marquez, Horvat, Lause, Science Advances 11(27) 2025, arXiv 2406.07016 | Peer-reviewed | abstract | high |
| S19 | Words such as realm, intricate, showcasing, pivotal surged from 2023; method is population-level | Liang et al., arXiv 2404.01268 and 2403.07183 | Peer-reviewed / preprint | summary | medium |
| S20 | Patterns of AI-written text; humans poor at detection; word lists date | Wikipedia, "Signs of AI writing", first 100,000 of 251,000 characters | Secondary, volunteer-written | partial full text | low to medium (orientation only) |
| S21 | LLMs favour their own resumes in simulated screening; interventions cut bias by over half; non-archival | Xu, Li, Jiang, arXiv 2509.00462 v4 (AIES 2025) | Preprint | abstract | low to medium |
| S22 | Vendor surveys of hiring managers' views on AI applications; one registered experiment in development | TopResume survey (2025), CV Genius survey (2024), AEA registry trial 13527 | Company surveys; registry | summary | low (company claim) |
| S23 | Major ATS says it never uses AI to rate or auto-reject; humans decide | Greenhouse, "How does Greenhouse use AI?", 2025-01-08, https://my.greenhouse.com/blogs/how-does-greenhouse-use-ai-heres-everything-candidates-need-to-know | First-party vendor blog | full text | medium |
| S24 | Over 90% of employers using recruitment software use it for first cut or ranking; negative filters such as a six-month gap | Fuller et al., "Hidden Workers: Untapped Talent", HBS and Accenture 2021; HBS Working Knowledge summary https://www.library.hbs.edu/working-knowledge/how-to-tap-the-talent-automated-hr-platforms-miss | Employer survey | full text of summary page | medium |
| S25 | Bullet formula: accomplished X as measured by Y by doing Z; percentages need a baseline | Laszlo Bock, "My Personal Formula for a Winning Resume", LinkedIn 2014 (original not opened) | Practitioner | summary | low |
| S26 | RCT, 16 developers, 246 issues, 19% longer with AI; forecast 24% faster; limits | METR, 2025-07-10, https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/ | First-party research | full text | high |
| S27 | Follow-up data unreliable; selection and measurement problems; probably more speedup now but unsized | METR, 2026 update, https://metr.org/blog/2026-02-24-uplift-update/ (a later redesign post is dated 2026-03-06 per a search summary) | First-party research | full text | medium |
| S28 | 52 engineers; quiz 50% vs 67%; speed gain not significant; interaction patterns | Anthropic, "How AI assistance impacts the formation of coding skills", https://www.anthropic.com/research/AI-assistance-coding-skills (date not shown in the text I read) | First-party research | full text | medium |
| S29 | Resume deception has fabrication, embellishment and omission; related to traits and lower performance | Henle, Dineen, Duffy, J. Business and Psychology 34:87-106, 2019 | Peer-reviewed survey studies | summary | medium |
| S30 | Truth tellers give more verifiable details (g=0.42, 20 studies, N=1,532); lab-based; mixed replication | Palena, Caso, Vrij, Nahari, J. Applied Research in Memory and Cognition 2021 | Meta-analysis | summary | medium |
| S31 | Percentiles vs averages; SLI/SLO/SLA; aggregation windows | Google SRE book, "Service Level Objectives", https://sre.google/sre-book/service-level-objectives/ | First-party engineering book | full text | high |
| S32 | Four golden signals; mean hides tail; histogram buckets | Google SRE book, "Monitoring Distributed Systems", https://sre.google/sre-book/monitoring-distributed-systems/ | First-party | full text | high |
| S33 | Error budgets; four-week rolling window default; 100% wrong target | Google SRE workbook, "Implementing SLOs", https://sre.google/workbook/implementing-slos/ | First-party | full text | high |
| S34 | Core Web Vitals, thresholds, 75th percentile, field vs lab; page updated 2024-10-31 | web.dev, "Web Vitals", https://web.dev/articles/vitals | First-party docs | full text | high |
| S35 | k6 thresholds p(95)<200; pass/fail exit code | Grafana k6 docs, thresholds | Official docs | full text | high |
| S36 | Open vs closed workload; coordinated omission | Grafana k6 docs, open vs closed models | Official docs | full text | high |
| S37 | Locust quickstart statistics, users, spawn rate | Locust docs, quickstart | Official docs | full text | high |
| S38 | EXPLAIN, ANALYZE executes query; cost units arbitrary; PostgreSQL 18 | PostgreSQL 18 docs, "Using EXPLAIN", https://www.postgresql.org/docs/current/using-explain.html | Official docs | full text | high |
| S39 | Lighthouse is an open-source audit tool run in DevTools, CLI, PageSpeed Insights | Chrome for Developers, Lighthouse overview | Official docs | full text | high |
| S40 | Lighthouse variability sources; use median of several runs | Lighthouse repository, docs/variability.md | Official docs | full text | high |
| S41 | AWS Cost Explorer: 13 months, 24 hour refresh, API charge | AWS docs, Cost Explorer | Official docs | full text | high |
| S42 | Quantiles from histograms; averaging quantiles is nonsensical | Prometheus docs, "Histograms and summaries" | Official docs | full text | high |
| S43 | Single-group before-and-after cannot separate cause from seasonality or other changes | Secondary experimentation writing (bytepawn, atticusli, metricgate) as summarized in search | Practitioner | summary | low |
| S44 | Time saved = frequency x time x people minus what automation still costs; use median baseline | Vendor and consultant blogs on automation ROI, as summarized in search | Practitioner | summary | low |
| S45 | Advice that numbers raise ratings is vendor advice with no study | Resume vendor pages, as summarized in search | Practitioner | summary | low |
| S46 | k6 http_req_duration definition | Grafana k6 docs, built-in metrics reference | Official docs | full text | high |
| S47 | Locust headless output columns | Locust docs, running without the web UI | Official docs | full text | high |
| S48 | Copilot group finished an HTTP server task 55.8% faster | Peng et al., arXiv 2302.06590 (2023) | Preprint RCT | abstract | medium |
| S49 | 26.08% more tasks completed over 3 field experiments, 4,867 developers | Cui, Demirer, Jaffe, Musolff, Peng, Salz, Management Science 2025, SSRN 4945566 | Peer-reviewed field experiments | summary | medium |
| S50 | AI acts as an amplifier of organization strengths and weaknesses | DORA, "State of AI-assisted Software Development" 2025, https://dora.dev/research/ai | Industry research | summary | low to medium |
| S51 | GitHub guidance on finding issues to contribute to | GitHub Docs, "Finding ways to contribute to open source on GitHub" | Official docs | full text | high |
| S52 | Start small, non-code contributions count, read CONTRIBUTING | Open Source Guides, "How to contribute", https://opensource.guide/how-to-contribute/ | Community guide (GitHub-hosted) | full text | medium |
| S53 | 58 barriers incl. 13 social; interviews with 36 developers from 14 projects | Steinmacher, Conte, Gerosa, Redmiles, CSCW 2015 | Peer-reviewed | summary | medium |
| S54 | Two-sided platforms face a critical mass hurdle on both sides | Evans, Schmalensee, "Failure to Launch: Critical Mass in Platform Businesses", Review of Network Economics 9(4) 2010 | Peer-reviewed | summary | medium |
| S55 | Single-player mode helped adoption of network products | Chris Dixon, "Designing products for single and multiplayer modes", 2010-06-12, https://cdixon.org/2010/06/12/designing-products-for-single-and-multiplayer-modes/ | Practitioner essay | full text | low to medium |
| S56 | NIST community cloud definition | NIST SP 800-145, via https://csrc.nist.gov/glossary/term/community_cloud | Standard | glossary page (PDF text unreadable) | high |
| S57 | BOINC lets people donate spare computing; about 30 projects | BOINC home page, https://boinc.berkeley.edu/ | First-party | full text | medium |
| S58 | Public-resource computing design; SETI@home from 1999, about a million computers | Anderson, "BOINC: A System for Public-Resource Computing and Storage", 2004 | Peer-reviewed workshop paper | summary | medium |
| S59 | Appetite versus estimate; fixed time, variable scope | Basecamp, Shape Up, chapter 3 | First-party book | full text | medium |
| S60 | SMART objectives originate in a 1981 article | Doran, Management Review 70(11) 1981 (via secondary sources) | Practitioner | summary | low |
| S61 | 18% of abandoners cited forced account creation | Baymard Institute, cart abandonment statistics (updated 2025-09-22) | Company research | full text | low (company claim) |
| S62 | Sign in with Google returns an ID token; FedCM advised | Google for Developers, Sign in with Google for web | Official docs | full text | high |
| S63 | Testing mode limits; basic scopes exempt; 100 new user cap when unverified | Google Cloud help, OAuth consent screen / app publishing, https://support.google.com/cloud/answer/15549945 | Official docs | full text | high |
| S64 | OAuth 2.0 roles and authorization code flow; status | IETF RFC 6749 | Standard | full text (first 100,000 of 186,000 characters) | high |
| S65 | Throttling, lockout, passphrases, breached-password checks, MFA | OWASP Authentication Cheat Sheet | Standards body guidance | full text | high |
| S66 | Keep secrets out of code; rotation; least privilege; env var caution | OWASP Secrets Management Cheat Sheet | Standards body guidance | full text | high |
| S67 | Render free: 15 minute spin-down, 750 hours, Postgres 30 day expiry | Render docs, free tier limits | Official docs | full text | high (volatile) |
| S68 | GitHub Pages limits and content restrictions | GitHub Docs, GitHub Pages limits | Official docs | full text | high (volatile) |
| S69 | Vercel Hobby non-commercial; included usage; page last updated 2026-09-14 | Vercel docs, Hobby plan | Official docs | full text | high (volatile) |
| S70 | Cloudflare Pages free limits | Cloudflare docs, Pages limits | Official docs | full text | high (volatile) |
| S71 | Netlify free plan 300 credits, hard limit | Netlify docs, credit-based plans | Official docs | full text | high (volatile) |
| S72 | README guidance and display rules | GitHub Docs, "About READMEs" | Official docs | full text | high |
| S73 | README content categories; many lack purpose and status | Prana, Treude, Thung, Atapattu, Lo, Empirical Software Engineering 24(3) 2018 | Peer-reviewed | abstract and summary | medium |
| S74 | Engagement near complete under 6 minutes and falls as video lengthens (MOOC lecture videos, 6.9 million sessions) | Guo, Kim, Rubin, "How Video Production Affects Student Engagement", Learning at Scale 2014 | Peer-reviewed | summary (PDF unreadable) | medium |
| S75 | Containers are isolated and portable | Docker docs, "What is a container?" | Official docs | full text | high |
| S76 | The 75% claim traces to a defunct company; ATS software is configured and decided by people | HiringThing blog, "Applicant Tracking Systems Aren't Excluding Job Applicants, People Are" | Vendor blog | full text | low to medium |
| S77 | Consultant traced the 75% claim to a 2012 sales pitch with no study | Christine Assaf's investigation, as described by secondary sources | Practitioner | summary | low to medium |
| S78 | Reasons a resume may fail to import | Greenhouse support, "Why didn't the candidate's resume import correctly?" | First-party help | full text | high |
| S79 | Accepted upload formats, 100 MB, links for portfolios | Greenhouse support, supported formats for resumes, cover letters and other uploads | First-party help | full text | high (volatile) |
| S80 | 482 professionals; 70% of selections two-page; by seniority 1.4, 2.6, 2.9 | ResumeGo, "One or two page resumes" study, https://www.resumego.net/research/one-or-two-page-resumes/ | Company simulation | full text | low (company claim) |
| S81 | Interview rates 10.7%, 12.5%, 16.4% by cover letter type, 7,287 submissions | ResumeGo, cover letter study | Company field study | summary | low (company claim) |
| S82 | 23.8 million new secrets on public GitHub in 2024 | GitGuardian, State of Secrets Sprawl 2025 | Company report | summary | low (company claim) |
| S83 | Push protection blocks known secrets before push; page silent on remediation | GitHub Docs, about push protection | Official docs | full text | high |
| S84 | Existing courses focus on ATS-proof resumes and tailoring | Coursera listings (Board Infinity resume course; job search with AI course; SkillsBooster specialization) | Course listings | summary | low |
| S85 | Latest versions on 2026-10-25: Locust 2.47.0, Lighthouse 13.5.0, k6 v2.3.0 | PyPI JSON, npm registry, GitHub releases API | Registries | full text | high (volatile) |
| S86 | A short paid course on GitHub portfolios exists | Udemy, "GitHub Portfolio Professional" listing | Course listing | summary | low |

## Unverified claims (do not use as fact in learner-facing text)

| Claim as often stated | Why unverified | What to say instead |
|---|---|---|
| "Recruiters spend six seconds (or 7.4 seconds) on a resume" | Company eye-tracking with undisclosed sample; critique says it measures the decision to keep reading [S4, S5] | "Employers say they get more applications than they can read closely, so the first look is quick." |
| "75 percent of resumes are rejected by ATS before a human sees them" | Traced to a defunct company's sales pitch, no study [S76, S77] | "Some employers use software to sort and filter by rules they set; people make the decisions." |
| "99 percent of Fortune 500 companies use an ATS" | Quoted via a report that cites a vendor; I did not trace the original [S24] | "Large employers commonly use applicant tracking software." |
| "Quantified bullets get more interviews" or "resumes with numbers get X percent more callbacks" | Vendor advice, no controlled study found [S45] | "A number with a baseline and a source is easier to check and defend." |
| "Two-page resumes get 2.9 times more interest" | Company simulation, not peer reviewed [S80] | "There is no proven right length." |
| "Tailored cover letters bring 50 percent more interviews" | Vendor study, cover letters not resumes [S81] | "Real tailoring means changing the order of your evidence." |
| "80 percent of hiring managers distrust AI content", "19.6 percent would reject", "57 percent less likely to hire", "a third can spot AI in 20 seconds" | Vendor surveys, conflicting figures [S22] | "Surveys disagree; experiments show people are close to chance at telling." |
| "Hiring managers spend under 30 seconds on obviously AI-written letters" and "68 percent can identify AI content (HBR)" | Traced to no primary source in my search [S22] | Omit. |
| "42 percent of hiring managers prioritise real-world problem solving over certificates" and "73 percent prefer a strong portfolio", attributed to Stack Overflow | Not found in the survey's own pages; repeated by low-quality sites | "Companies that publish their hiring say they prefer seeing real work; no study measures certificates for software jobs." |
| "AI makes developers X times faster" (any multiple) | Mixed evidence, small samples, settings differ [S26, S27, S48, S49] | "Studies disagree; record what you checked." |
| "Most side projects never get a single user" or "90 percent of startups fail" | No data counted for side projects; failure rates not traced | "Two-sided apps need both sides at once, which is why they stall [S54]." |
| "Engagement drops after 6 minutes, so keep your demo under 6 minutes" | Finding is about lecture videos [S74] | "Keep the demo to one or two minutes and start with the result." |
| "Sign-up walls lose 18 percent of visitors" | Company statistic about shopping carts [S61] | "Extra steps lose some visitors; let them in with one click." |
| "Greenhouse fails to parse files over 2.5 MB" | Only third-party blogs; not in the vendor article I read [S78, S79] | "Keep the file small, plain and in a standard format." |
| "MFA stops 99.9 percent of account compromises" | Cited secondhand inside OWASP guidance to a vendor analysis [S65] | "Multi-factor authentication is the best single defense against password attacks, per OWASP." |
| "Automation removes 80 percent of the task time" | Assumption in a vendor calculator [S44] | "Measure the time before; subtract what you still do." |
| "23.8 million secrets leaked on GitHub in 2024" | Security-vendor count [S82] | "Leaked keys are common; use push protection and rotate." |
| "ATS reads columns badly, text boxes break parsing" | Resume-service claims, not vendor documentation | "Keep the layout simple and check by pasting into a text editor." |
| "AI-screening prefers AI-written resumes in the real market" | Simulated pipelines, non-archival [S21] | "Do not write like a model to pass a filter." |
| "LinkedIn profile claims (photo views, etc.)" | Company claims; outside topics A to F | See research-platforms.md. |

## Open questions for instructors

1. **Location and name bias.** The classic callback study shows quality helps unevenly [S6], and no study found measures applicants from Palestine. How much should the course say, and should mentors help choose where to apply?
2. **Employer data.** Many fellows' best numbers sit on employer dashboards. Is there a standard permission note fellows can send ("may I show the p95 chart with names removed?")? The brief says ask first; the wording and escalation are open.
3. **Laptops.** Which fellows have a laptop for k6, Locust, Lighthouse or EXPLAIN? Is the no-install path (a supplied dashboard export and reading questions) the default for everyone?
4. **Certificates.** No software-specific evidence found. Does the sponsor want certificates mentioned at all, given fellows may hold some?
5. **AI-use policy.** How much AI help is allowed in the kit, and is disclosure required in the project README ("AI-use log")? Mentors need one rule.
6. **Language.** Is the kit English only, or should fellows keep an Arabic summary for local mentors? Detectors misjudge non-native English [S17]; should mentors be told never to use detectors on fellows' work?
7. **Locust percentile columns.** The docs pages I read show median only. Someone should check the installed version's statistics tab before teaching p95 in Locust.
8. **Hosting choice.** Which free tiers are reachable and acceptable from Gaza (topic K)? Until known, the plan keeps a static case study as the base layer.
9. **Open source path.** Is a small docs-or-test contribution a "should have" or an optional stretch for fellows with limited time?
10. **The community cloud example.** Is it fine to use it as one illustrative idea that passes the filter, given the sponsor's context, or should the example be replaced by a neutral one?
11. **Verifiability analogy.** The lab research on checkable details [S30] is not about resumes. Is it acceptable as an explanatory idea with an honest caveat, or should it be dropped?
12. **Re-check schedule.** Free-tier limits, Google consent screen rules and tool versions should be re-checked at G5 and before each publish. Who owns that?

## Handoff

```yaml
artifact: research-dossier
course: career-brand
version: 1
sources_checked: 2026-10-25
scope: topics A to F; topics G to K in research-platforms.md
hard_constraints:
  - every public claim is checkable by the fellow who makes it (claim ledger before prose)
  - the reader gives seconds, so evidence order and instant access matter (ten second test, stranger test, static base layer)
  - phone, weak data, power cuts, Arabic first; measurement needs a no-install path
  - AI help allowed for editing; numbers, ownership and judgment cannot be generated; detectors are unreliable and biased against non-native English
  - platform facts, free tiers and regional access change; everything dated and verify before publish; never depend on one platform
out_of_scope:
  - interview technique, salary negotiation, visa and contract law
  - basic professional English and first LinkedIn basics (course 7)
  - building the project in code
  - AI detection as a skill, AI word blacklists, AI speed multiples
  - certificate shopping, keyword stuffing, white text, engagement pods, bought followers, rule-breaking automation
  - deep performance engineering, paid advertising, design and video editing in depth
open_questions:
  - location and name bias, and what mentors should say
  - standard permission wording for using employer dashboards
  - laptop access and the default no-install path
  - certificates: mention or not
  - AI-use policy and disclosure
  - English only or Arabic summary; no detectors on fellows' work
  - Locust percentile columns in the installed version
  - hosting choice after topic K
  - open source path as should-have or stretch
  - community cloud as the illustrative example
  - verifiability analogy: keep or drop
  - owner of the G5 re-check
```
