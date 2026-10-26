---
artifact: module-brief-canon
course: career-brand
version: 1
owner: curriculum-architect
roadmap_version: 1
roadmap_confirmed: false (G2B pending; drafted before sign-off on the sponsor's instruction, see roadmap-confirmation.md)
---

# Canon: Areej (the provided fellow) and the scene cast

Every writer uses these facts exactly. Do not add a number, a company, a date or a person that is not here; if a chapter needs one, ask the orchestrator to add it here first so parallel writers stay consistent. All people and organisations are fictional. Mark that once per chapter where they appear ("Areej is a fictional fellow; her numbers are illustrative"). Numbers below were checked by hand; the arithmetic is shown.

## Areej

### Who she is
- A full-stack developer in Gaza, final year of a software engineering degree, aiming at remote work with a small international team.
- Stack: JavaScript and TypeScript, Node.js with Express, PostgreSQL, React. Git and GitHub daily.
- Works mostly on a phone and a shared family laptop; she plans laptop work for hours when the power is on. Never use this as drama; one mention in 3.5 (why the no-install path exists) is enough.
- Free accounts only: LinkedIn Basic, GitHub Free. No paid AI key until module 3; she then pays for a small OpenRouter credit (if a reader asks how; the course never requires it). When her key fails in one drill (gate 5.8) she uses the written option. Do not say why the key failed beyond "the request was refused"; never suggest a VPN.

### Her four roles

**1. Internship, six months (February to July 2025), back-office team of a parcel delivery company called Darb Parcels.**
- Team: a lead engineer (her internship lead, called "her lead"; never named), two other developers, Areej.
- The slow orders report. Operations staff open a daily orders report page many times a day. The query behind it filtered the `orders` table (about 2.4 million rows) by status and creation date and sorted by date.
- What she did: she found the query in the database's slow query log, ran `EXPLAIN ANALYZE`, saw a sequential scan over the whole table, proposed a composite index on `(status, created_at)`, and wrote the migration. Her lead reviewed it and scheduled it for a low-traffic hour. It shipped on 15 May 2025.
- Proof pair 1 (query plan, her laptop copy of a staging database with the same data volume): before, a sequential scan, execution time 3,840 ms; after, an index scan, execution time 46 ms. Cost units in the plan are not milliseconds; she quotes only the "actual time" figures [S38].
- Proof pair 2 (team dashboard, owned by her lead): p95 response time of the report endpoint, 14 days before (1 to 14 May 2025) 4.6 s; 14 days after (16 to 29 May 2025) 0.41 s. Request count on the endpoint in the two windows: 6,300 and 6,100 (about 3 percent lower after, so traffic did not explain the change).
- What else changed in the window: a front-end release on 20 May that did not touch the report endpoint. She says so in the claim card.
- Her share: finding the query, the plan, the index choice and the migration. The team's share: review, scheduling, the deploy.
- Permission: she asked her lead before using the chart publicly. Answer: yes, with the company name and real table and column names removed, and no customer data. So in public she writes "a parcel delivery company's back office" and uses the redacted chart. In private material (her arc, her ledger) the name Darb Parcels appears.
- Claim card wording (the model for 3.2 and 6.3): "Cut the p95 of the orders report endpoint from 4.6 s to 0.41 s (14 days before and after, team dashboard) by finding a full-table scan and adding a composite index; I found and fixed it, my lead reviewed and scheduled the release."

**2. Freelance, a small print shop called Raqim Print (owner: "the shop owner", never named), since September 2024, a few hours a month.**
- The invoice script. The owner's assistant copied each order from the order spreadsheet into an invoice template by hand. Areej wrote a Node.js script that turns spreadsheet rows into PDF invoices and a monthly summary. It took her 9 hours to build.
- Baseline (she timed it with the assistant, two weeks, 10 working days, before the script): 64 invoices, median 7 minutes each.
- After (two weeks after the script): 61 invoices, median 1 minute each (checking the PDF).
- Upkeep: about 30 minutes a month of her time fixing the template when the owner changes it (about 7 minutes a week).
- Arithmetic (show it in 3.5): about 31 invoices a week (64 and 61 over two weeks each, so 32 and about 30.5 a week; use 31). Gross saving 6 minutes x 31 = 186 minutes a week. Net of upkeep: 186 minus 7 = 179 minutes, about 3 hours a week. The 9 build hours are paid back in about 3 weeks (9 x 60 = 540 minutes; 540 / 179 is about 3.0).
- Claim wording: "Saved the shop about 3 hours a week of manual invoicing, net of upkeep (median time per invoice 7 minutes to 1 minute, timed over two weeks before and two weeks after)."
- Her share: all of it; the owner chose the invoice fields.
- **The honest gap:** she never measured whether customers received invoices sooner. Her "not measured" line: "I did not measure whether customers got invoices sooner. To find out, I would ask the owner for the order and invoice timestamps for two weeks and compare the median gap with the spreadsheet history."

**3. Volunteer, a youth coding club (Saturday sessions for teenagers), organiser team member since 2023.**
- The sign-up migration. Sign-ups lived in three shared spreadsheets edited by three organisers. Areej built a small web form backed by a database and migrated the old data.
- Migration numbers: 412 rows across the three sheets; 57 duplicates found and merged; 355 unique sign-ups imported (412 minus 57 = 355). She checked the import by counting rows per session before and after.
- Error count: double-booked session seats, counted by Areej from the organisers' group chat: 9 in the term before the form, 1 in the term after.
- What else changed: the club also cut sessions from three a week to two in the second term, so fewer bookings could clash. She says this and does not claim the whole drop.
- Hosting detail for module 5: her first deploy used a free hosted database that the host deletes 30 days after creation (Render free Postgres, checked 2026-10 [S67]); she noticed the date and moved the data before it expired. Use this only in 5.2.
- Her share: the form, the database and the migration; the organisers chose the fields and tested it.

**4. Study project, a four-person university team API called Campus Board (a campus events board), Node.js, Express, PostgreSQL. Spring 2025.**
- The leaked key (small security fix). She found an email-service API key committed in an early commit by a teammate. Deleting the file would not remove it from the history, so she revoked the key and created a new one, moved secrets to environment variables, added a `.env.example` with placeholder values, and turned on the code host's push protection [S66, S83]. Her share: noticed and fixed it; the teammate agreed and reviewed.
- The cache and the load test. The events list endpoint was slow under load. A teammate wrote the endpoint; Areej added an in-memory cache with a 30-second expiry and wrote a k6 test.
- Test set-up, identical before and after: the same k6 script, an open model with a constant arrival rate of 50 requests per second for 2 minutes, the same seeded database (10,000 events), the same laptop, a threshold `p(95)<200` on `http_req_duration` [S35, S36, S46].
- Results: before, p95 820 ms, threshold failed; after, p95 95 ms, threshold passed. Error rate under 1 percent in both runs.
- Caveats she states: a laptop, not production; cached lists can be up to 30 seconds old.
- Claim wording: "Cut the events endpoint's p95 from 820 ms to 95 ms under a constant 50 requests per second (same k6 script, data and laptop before and after) by adding a 30-second cache; I wrote the cache and the test, a teammate wrote the endpoint."

### Her career arc material (module 2)
- **Values:** honest numbers; finishing what she starts; teaching what she learns (the club).
- **Pillars (each with two proofs):**
  1. "I make slow things fast, and I measure it": the report query (4.6 s to 0.41 s p95) and the cache (820 ms to 95 ms p95).
  2. "I automate boring work for small teams": the invoice script (about 3 hours a week saved, net) and the sign-up form (57 duplicates removed, 9 double bookings to 1, with the caveat).
  3. "I am careful with data and secrets": the key rotation and push protection; asking permission before using the dashboard chart.
- **What makes her different (her USP line):** "A full-stack developer who measures before and after, and writes it down."
- **Skills shown by examples:** hard (PostgreSQL query plans, indexing, Node.js, k6); soft (explaining the index to her lead in writing; working with a non-technical shop owner); leadership (training two new club organisers on the form); initiative (found the slow query without being asked; found the leaked key).
- **Human detail:** since she was 12 she has kept a notebook of football match statistics; it is where she learned that an average can hide the one bad match. Used in 2.4 and, once, in her About section (7.5). Never more.
- **Reflected best-self asks (2.4):** her internship lead ("you found the slow query before anyone asked"), the shop owner ("you explained the script so my assistant could use it"), a club organiser ("you trained the new organisers patiently"). What repeats: she finds a problem, fixes it and explains it.
- **Gaps she lists:** no production uptime numbers of her own; has not led a team; the project has no real user yet.

### Her project plan (module 4)
- **Idea:** Raqim Stock, a small stock and invoice tool for the print shop owner: record paper and ink stock, record each sale, warn when a paper type falls below its reorder level, and keep the invoice export.
- **The number to move:** stockouts (a paper type running out before it is reordered). Baseline from the owner's notebook: 5 stockouts in the last two months (August and September 2025). Measurement plan: the tool logs each stockout; compare stockouts per month over the two months after launch with the baseline, and note what else changed (season, a new supplier).
- **Why it passes the filter:** one real user on day one (the owner); a measurable result (stockouts); depth she can write about (reorder levels and stock updates that must not double-count); no two sides needed. Later: two other print shops she knows (a small known group).
- **Appetite:** 6 weeks at about 5 hours a week (about 30 hours). One user type (the owner). One core flow: record a sale, stock goes down, a warning appears below the reorder level. Out of scope for the appetite: supplier ordering, multiple shops, a mobile app.
- **First real user milestone:** the owner records one real week of sales in the tool by the end of week 3.
- **AI-use log template line:** "date, what I asked the AI, what I used, what I checked, one thing it got wrong". Example entry: "AI suggested a stock update without a transaction; I tested two sales at once and saw the count go wrong; I wrapped it in a transaction."
- **What she will show:** a seeded demo account (fake shop, fake stock), a 90-second demo starting with the low-stock warning, a README in reader order, and the case study later.
- **Open source path she considered and rejected for now:** a documentation fix in the PDF library her invoice script uses; she keeps it as a later small step.

### Her showcase and case study (module 5)
- **Case study:** the slow orders report (internship), public version with names removed. Title: "From 4.6 seconds to 0.41: fixing a slow report with one index". Sections: the problem and who felt it (operations staff opening the report many times a day); numbers before (p95 4.6 s, 14 days, team dashboard; the plan's 3,840 ms); what she did and what the team did; numbers after (0.41 s, 14 days; 46 ms); what else changed (the 20 May front-end release; traffic about 3 percent lower); what she would do differently (add a slow-query alert so the next one is found sooner); where to see it (the redacted chart and the before and after plans as images).
- **Showcase plan (for Raqim Stock, the planned project):** deployable unit (a container with a one-command start and a README); access by a seeded demo account that can do everything (fake shop data, no real email or payments, a nightly reset, rate limits, no real keys in the repository, a visible "this is a demo" line); Sign in with Google considered and kept for later, asking only for name, email and profile; demo storyboard of 90 seconds (low-stock warning first, then recording a sale, then the invoice); base layer: the case study page and a screenshot that work if the demo is asleep.
- **Stranger test (on the case study page, using a classmate's phone):** time to first useful screen 8 seconds; the two questions the stranger asked: "was this production or a test copy?" and "what did your lead do?". Both answers go into the gate 5.8 written option.

### Her old resume (gate 1.6 baseline and 6.4)
- Two pages. Top: an objective paragraph an AI tool wrote ("Highly motivated and passionate full-stack developer seeking to leverage cutting-edge technologies in a dynamic environment"). Then a skills block of 22 technologies. Then Experience with three bullets: "Worked on backend performance" (internship), "Improved speed by 90%" (internship; she cannot say of what, over which days, or measured how), "Responsible for leveraging cutting-edge technologies to drive seamless performance improvements across robust backend systems" (internship). Freelance and volunteer work are missing. Campus Board is one line with no link. Links: a GitHub profile URL at the bottom of page 2.
- Her ten-second test (gate 1.6, a classmate on a phone): "a long paragraph about being passionate, then a list of tools". Her best proof was not seen.
- Learners without their own resume may run gate 1.6 on this resume.

### Her resume (module 6)
- One page. Order: name and links line; a two-line summary written from her USP; Experience (internship first, then freelance); Projects (Campus Board); Volunteer; Skills (one line); Education.
- Links (labelled): "Case study: a slow report from 4.6 s to 0.41 s"; "Campus Board load test (GitHub)"; LinkedIn profile.
- Sample bullets (use exactly):
  - "Cut the p95 of a daily orders report from 4.6 s to 0.41 s (14 days before and after) by finding a full-table scan and adding a composite index; my lead reviewed and scheduled the release."
  - "Saved a print shop about 3 hours a week of manual invoicing, net of upkeep, with a Node.js invoice script (median 7 to 1 minute per invoice, timed two weeks before and after)."
  - "Revoked and replaced a leaked email-service key, moved secrets to environment variables and turned on push protection for a four-person team repository."
- Her old bullet for the empty-sentence edit (6.4): "Responsible for leveraging cutting-edge technologies to drive seamless performance improvements across robust backend systems." The edit leaves nothing checkable, so she replaces it with the first sample bullet.
- Tailoring example (6.5, 6.6): a posting for a backend developer at a small logistics software startup that asks for PostgreSQL performance work. She moves the report bullet first, moves Campus Board above Volunteer, and changes the summary to start with "Backend-leaning full-stack developer". She does not copy the posting's words.
- Baseline drill (1.6), her old resume: flags "vague ownership" on "worked on backend performance" and "unsupported number" on "improved speed by 90%". At gate 6.8 the new resume draws no "unsupported number" flag; one "jargon without explanation" flag on "composite index", which she keeps for engineering readers and explains in the case study.

### Her LinkedIn (module 7)
- Headline: "Full-stack developer (Node.js, PostgreSQL). I make slow pages fast and measure it."
- About: two short paragraphs: what she does and for whom, two proofs with numbers, the football notebook line, what she is looking for. No character count is quoted anywhere (U-G1).
- Featured: the case study link, the Campus Board repository link, later her post.
- Experience: Darb Parcels appears only as "a parcel delivery company" if she does not want the name public; otherwise accurate organisation name as LinkedIn asks [P5]. Instructor note: the chapter shows the redacted wording.
- Outreach drafts (7.5): (1) a person she once knew: her former teaching assistant, now a backend engineer abroad, asking one specific question about query performance work; (2) a moderately weak tie: an engineer two connections away who commented on a post about PostgreSQL; (3) a founder she reaches through a useful comment first, then a message after the founder accepts her request.
- Notes budget: she plans for three personalised notes a month and counts them [P9, P10].
- Four-week rhythm: one post a week (week 1 the index story, week 2 the cache test, week 3 a short "what I got wrong" about the stale cache, week 4 the published blog post), five useful comments a week; she logs replies and profile views for eight weeks.

### Her writing and website (module 8)
- Post: "Same script, same data: what a 30-second cache did to our p95" (the Campus Board load test). About 800 words. Parts: the problem, the test set-up, the before and after, the stale-data trade-off, what she would change (test against a copy of production data, not only seeded data). AI-use line: "I used an AI tool to restructure my notes into sections; every number and decision is mine and I checked each one."
- Say-it-back test: her classmate repeats it as "she made the list faster by keeping a copy for 30 seconds, and proved it with the same test before and after". Good enough; she adds one sentence on why the copy can be stale.
- Channel plan (about ten): (1) her own site first (the original); (2) DEV with `canonical_url` set; (3) Medium with "originally published elsewhere" set; (4) a short LinkedIn post linking to the original; (5) LinkedIn Featured; (6) the Campus Board repository README (a "read the write-up" link); (7) her GitHub profile README; (8) the coding club's group chat (a link, with the organisers' agreement); (9) her fellows' cohort chat (a link); (10) a personal message to her former teaching assistant, who asked about load testing. Each copy carries "First published at [her site]". Hashnode and Substack are not used (their canonical settings are unverified, U-I1).
- Website plan: a free static host with a `github.io` address (GitHub Pages, checked 2026-10); pages: home (who she is, the USP line, two proofs), work (the case study, Campus Board), writing (the post), about (the football notebook, the club), contact (email only); no template stock photos; real screenshots and dates; built with one static site generator she tests first.

### Her capstone (module 9)
- Kit check: 14 numbers across the resume and profile, all mapped to 7 ledger rows; one honest gap line.
- Defence: full AI interview with resume-and-project context (the resume and the case study, contact details removed). Flags: none for "unsupported number"; one "vague ownership" on "we deployed it", which she fixes to "my lead deployed it after my migration passed review". Next step from the feedback: measure the honest gap (ask the shop owner for timestamps).

## The scene cast
One person per set-the-scene chapter, all fictional; mark once per scene. Numbers are illustrative.

| Scene | Person | Facts to use |
|---|---|---|
| 1.1 | **Bashar**, backend engineer, two years at a small software agency (remote) | Sent 60 applications in six weeks, no replies. His resume is two pages: an AI-written objective paragraph at the top, then a skills block of 28 technologies, then "responsible for backend services". His best work (he moved a slow nightly import into a queue and it stopped timing out) is on page 2. GitHub link at the very bottom; 31 repositories, mostly tutorial copies. A founder opens it on a phone: the first screen shows his name, the objective paragraph and half the skills block. Do not give a number of seconds. |
| 2.1 | **Ruqaya**, product designer, three years (an agency, then freelance) | In a first call a founder asks "what are you best at, and how would I know?" She lists tools. Afterwards she asks three past colleagues for a time she did well; all three describe her turning messy user research into one clear page. That becomes her first pillar. |
| 3.1 | **Tawfiq**, data engineer at an e-commerce analytics company | His resume says "made the nightly pipeline 70 percent faster". It went from 5 hours to 1.5 hours (70 percent) on one night, the week the platform team moved the pipeline to larger machines. His own change, rewriting one join step, took that step from 50 minutes to 20 minutes, which he can show from the job logs. The hiring manager asks: 70 percent of what, over which days, and was it you? |
| 4.1 | **Sireen**, mobile developer (Flutter) | Built a ride-sharing app in a weekend with an AI coding tool. No drivers and no riders signed up. In an interview she was asked how the matching works and could not explain the code. Later she reshapes the idea: a pickup schedule for her cousin's school bus run, one driver she knows and 14 families, useful on day one. |
| 5.1 | **Moath**, frontend developer (React) | Sent a founder a GitHub link to his recipe app. The founder did not clone it. The demo link was on a free tier that spins down when idle and took about a minute to wake [S67], then asked for a sign-up with email confirmation. The founder closed the tab. No number of seconds for the founder's patience. |
| 6.1 | **Waed**, operations coordinator on an NGO's logistics team | Resume lines: "Responsible for coordinating shipments"; a summary an AI tool wrote: "Dynamic, results-driven professional who leverages cross-functional synergies." Her real work: she built a shared tracker that cut missed delivery confirmations from about 30 a month to 6 a month, counted from the team's tracker over three months before and three after. It is not on her resume. |
| 7.1 | **Amjad**, freelance developer (WordPress and Laravel) | Headline "Passionate developer \| Lifelong learner". He paid for one month of Premium, which lets members personalise unlimited invitations [P9], and sent 40 identical notes to founders he did not know; LinkedIn's policy forbids using invitations to send promotional messages to people you do not know [P23], and his invitations were restricted for about a week [P10]. He also joined a group that agreed to like each other's posts, which the policy forbids [P23]. No replies. His rewritten headline (7.2 worked example): "Freelance web developer (Laravel, WordPress). I fix slow client sites and show the numbers." No numbers are given for his work. |
| 8.1 | **Diala**, DevOps engineer | Wrote a strong post about cutting her team's CI pipeline from 22 minutes to 9 minutes. It lived only on one blogging platform; when she lost access to her account there, the post went with it, and her resume link broke. Her personal website came from a template: "I am a passionate DevOps engineer who loves solving problems", stock photos, no dates, no numbers. |
| 9.1 | **Ismail**, QA engineer | His resume says "reduced escaped bugs by 40 percent". His mentor picks that line. He opens his ledger: escaped bugs per release, counted from the bug tracker, 10 per release over five releases before and 6 per release over five releases after (10 to 6 is 40 percent). His share: he introduced a regression checklist; the team also started code review in the same period, so he says the drop is shared. |

## Do not use
- Names already used in courses 13 and 14 (for example Yara, Ibrahim, Samer, Yazan, Nour, Shahd, Heba). Supporting characters stay unnamed ("her lead", "the shop owner", "a founder").
- Any real company, founder, investor or real person's profile. Platforms (LinkedIn, GitHub, DEV, Medium, Google) may be named with "checked 2026-10".
- The sponsor's own website, in any form.

## Additions during revision 1 (2026-10-26)

Facts defined by chapter writers and revisers, recorded here so later edits stay consistent.

- **Areej's project plan hours (4.4, 4.5, 4.7):** appetite 30 hours. Recording stock and sales 12 hours, the low-stock warning inside that flow 6 hours, tests, README and demo data 5 hours: 23 of 30. Cuts: supplier orders 10 hours, a second shop 14 hours, a mobile app 20 hours; any one would push the plan past 30. Raqim Stock is a plan: her AI-use log, the bug she expects to find and her demo checklist are always described as planned.
- **Areej's channel plan row 10 (8.3, 8.8):** a public forum thread about load testing, replacing a private message.
- **Areej's second ten-second test (7.5, 7.7):** a different classmate, a phone and a ten-second timer remembered "Node.js and PostgreSQL", "makes slow things fast" and the report going from 4.6 seconds to under half a second; they asked what "p95" means, so she adds a few plain words after the first "p95".
- **Areej's 3.8 written defence:** R2 is the strongest card and G1 the honest gap; R3 (invoice script) uses her timing sheet, 10 working days each side, 186 minus 7 gives 179 minutes; R7 (load test) uses the same k6 script at a constant 50 requests a second for 2 minutes on the same laptop.
- **Waed's tracker bullet (6.1, 6.3, 6.4 and four canvases):** 90 missed delivery confirmations in the three months before (30 a month) and 18 in the three months after (6 a month), from the team tracker; in the same months the team began a short daily check of open shipments; her part is the tracker and the count, the team's part is filling it in daily and running the check.
- **Names:** the module 8 gate fellow is Jawdat (renamed from Ghaith, who stays in 4.6).
