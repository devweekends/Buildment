---
artifact: module-brief
course: career-brand
module: 03-honest-numbers-and-proof-of-work
version: 1
owner: curriculum-architect
roadmap_version: 1
roadmap_confirmed: false (G2B pending; drafted before sign-off on the sponsor's instruction)
canon: 00-areej-and-cast.md
---

# Module 3: Honest numbers and proof of work

## Outcome
The learner can write any result as a claim card (metric, before, after, window, source, their share, what else changed), name where the proof for each kind of work lives, answer six questions about a number on a dashboard they did not set up (including percentiles, windows and uptime as minutes), plan a before-and-after measurement they control, and has a proof-of-work inventory and claim ledger with at least three claim cards (one from their own work) and one honest "not measured, here is how I would" (O3).

## Why this module exists
Hard constraint 1: every public claim must be checkable by the fellow who makes it. The ledger built here is the source of every number in the resume, profile, case study and post. The sponsor's bad example, "helped grow the business 50 percent", is the module's opening contrast.

## Prerequisites
Module 2 role cards (each result and where its proof lives). Entry: work-history.

## Cross-links and limits
- Course 14, "The Founder Interview": module 2 ("Impact with honest numbers") teaches "a number needs a before", finding your numbers and "how much was yours"; module 3 teaches defending a line through a why chain. Here, 3.2's "needs a before" beat is a short recap for fellows who took course 14, and the module goes further (claim cards, the ledger, reading dashboards, measuring). Defending aloud stays in course 14: link it in 3.2 and 3.8, by name.
- Never teach as fact: "quantified bullets get more interviews" or any callback percentage for numbers on resumes [S45, unverified]; "automation removes 80 percent of task time" [S44]; "MFA stops 99.9 percent of compromises"; any AI speed multiple.
- Teach the reading and the before-and-after claim, not performance engineering (what not to teach). One honest number, not a platform.
- Privacy hard rule: ask before using employer dashboards publicly; remove names by default (open decision 8).
- Credits: the Google SRE authors' book and workbook [S31, S33]; Henle, Dineen and Duffy for resume deception [S29]; the PostgreSQL, k6 and web.dev documentation teams where a tool is shown.
- Every tool fact dated "checked 2026-10" (PostgreSQL 18 docs, k6 v2.3.0, Lighthouse 13.5.0, Locust 2.47.0 [S85]); tool use is optional, never required.

## Chapters
| # | Chapter | stepType | Min | Requires | Introduces | Evidence |
|---|---|---|---|---|---|---|
| 3.1 | Set the scene | Read | 10 | role-cards | number-doubt | none |
| 3.2 | From a number to a claim card | Learn (beats) | 25 | number-doubt | claim-card | quick check |
| 3.3 | Proof for each kind of work | Learn (beats) | 25 | claim-card | proof-sources, permission-rule | quick check |
| 3.4 | Reading a dashboard you did not set up | Learn (beats) | 25 | claim-card | dashboard-reading | quick check |
| 3.5 | Measure it yourself, before and after | Learn (beats) | 25 | dashboard-reading | controlled-measurement | quick check |
| 3.6 | Build your proof inventory and claim ledger | Build | 80 | claim-card, proof-sources, dashboard-reading, controlled-measurement | claim-ledger | inventory and ledger |
| 3.7 | Honest numbers and proof of work | Check | 10 | claim-ledger | none | quiz |
| 3.8 | Checklist and learning log | Gate | 50 (45 written) | claim-ledger | none | drill or written defence |

## 3.1 Set the scene (Read, 10 min, stepType Read)
Outcome: introduce honest numbers through Tawfiq. LearningObjectives for the module.

| Beat | Heading | What the picture shows | Visual |
|---|---|---|---|
| 1 | Seventy percent of what? | His resume line "made the nightly pipeline 70 percent faster"; a hiring manager's three questions appear one by one: of what, over which days, was it you? | Watch-only scene, illustrated allowed |
| 2 | The same week, bigger machines | A timeline of that week: 5 hours to 1.5 hours on one night; the platform team's move to larger machines the same week; his own join step, 50 minutes to 20 minutes in the job logs | Watch-only scene |

- Everyday question: "Which part of the change can Tawfiq honestly call his?"
- Facts: canon 3.1 (5 h to 1.5 h is 70 percent; 50 to 20 minutes is his step). Mark: fictional.

## 3.2 From a number to a claim card (Learn, 25 min, stepType Learn, format: beats)
Outcome: write a number as a claim card; see why "helped grow the business 50 percent" fails every part; know that embellishing and leaving out to mislead both count as deception.

| # | Heading | Claim the picture must show | Visual | GoDeeper fold |
|---|---|---|---|---|
| B1 | "Helped grow the business 50 percent" | The sentence under a magnifier; each part of an empty claim card lights up as missing: of what, before, after, when, source, your part | Watch-only scene | Researchers measure three forms of resume deception: fabrication, embellishment and omission [S29] (summary of the abstract). Phrase: "Embellishing and leaving things out to mislead are both forms of resume deception that researchers measure. 'Rounding up' is not a safe middle ground." |
| B2 | A percent needs its starting number | Two bars both "up 12 percent": one from 10 to 11.2 users, one from 10,000 to 11,200 | Watch-only scene | A well-known resume formula from a former hiring head asks for what you accomplished, measured how, by doing what, and warns that a percentage alone misleads [S25] (practitioner, low confidence; do not name the author). Short recap for fellows who took course 14, "The Founder Interview", module 2. |
| B3 (predict before; PLAYABLE) | Fill the claim card | A claim card with seven fields (metric, before, after, window, source, your share, what else changed); the learner fills Tawfiq's card from snippets; the card shows which parts a reader can now check; verdict "Checkable" or "Missing: window" and so on | Playable canvas (card filler on the sorter primitive) | Phrase: "A number is a claim with five parts: what, before, after, window and source. If you cannot name the source, do not print the number." The course adds two parts: your share, and what else changed. Tawfiq's honest card: his join step, 50 to 20 minutes, from the job logs; the 70 percent belongs to the whole team and the bigger machines. |
| B4 | What else changed in the window | A window on a timeline with other events inside it (bigger machines; a front-end release) | Watch-only scene | A single before-and-after cannot separate your change from everything else that changed (season, traffic, other releases); a comparison you control upgrades the claim [S43] (secondary, low confidence: present as reasoning, not research). Areej writes the 20 May front-end release into her card and shows traffic was about 3 percent lower (6,300 and 6,100 requests). |
| B5 | One row per claim: the ledger | Claim cards stack into a table; each line of a resume draws a thread to one row | Static MermaidDiagram (claim lifecycle: work, evidence, claim card, placed in the kit, questioned, defended or corrected) | The claim ledger is course method: the line, its number, where it came from, how to re-check it. Every later module draws from it. |
| B6 | "Not measured" is a complete answer | A card whose result field reads "Not measured; here is how I would" with Areej's plan | Static picture | Phrase: "'I did not measure that, and here is how I would' is a complete and honest sentence." Optional, with its caveat (open decision 16): lab studies found truth tellers give more checkable details than liars (meta-analysis of 20 studies) [S30]; this is lab research on accounts of events, not resumes, so use it only as a reason to prefer checkable claims. |

- Predict before B3: "Tawfiq's pipeline went from 5 hours to 1.5 hours the week the machines got bigger. What should his claim card's result be?" (the 70 percent, or his step from 50 to 20 minutes with the machines named).
- Quick check: choose the complete card among three; name the missing field in the others.
- Worked example: Areej's report claim card (canon wording, exactly).

## 3.3 Proof for each kind of work (Learn, 25 min, stepType Learn, format: beats)
Outcome: match each kind of work to its proof source and ask before using employer data in public.

| # | Heading | Claim the picture must show | Visual | GoDeeper fold |
|---|---|---|---|---|
| B1 | Every kind of work leaves a trace | A map: work types on the left, traces on the right (dashboards, logs, database counts, bills, pull requests, test runs, timing sheets, chat counts) | Static MermaidDiagram | The sponsor's list of sources: cloud and database dashboards, code written or cleaned up, security work, performance work, migrations, automations and hours saved, response times, uptime, users handled, before-and-after load tests. |
| B2 (predict before; PLAYABLE) | Match the work to its proof | The learner sorts eight work items (a slow query fixed, a messy module cleaned up, a leaked key fixed, a data migration, an automation, a service's uptime, users handled, a cloud bill cut) onto proof sources; each match explains itself | Playable canvas (sorter primitive) | Examples: query fix: plan pair and latency chart; cleanup: the pull request and the test run before and after; leaked key: the revocation and the push protection setting, never the key; migration: row counts and error counts before and after; automation: a timing sheet; uptime: the service level dashboard; users: database counts or analytics; cost: the bill or cost report. |
| B3 | Security proof shows the fix, not the secret | Areej's leaked key story as three cards: found, revoked and replaced, prevented (push protection, `.env.example`); the key itself is blurred | Watch-only scene | Deleting a file does not remove a pushed key from history; rotate and revoke; restarting the app does not revoke a stolen credential [S66]; push protection blocks known formats before a push but does not undo an earlier leak [S83]. Phrase: "Never put a real key in your code. If a key was ever pushed, assume it is stolen and replace it." |
| B4 | Time saved is net, not gross | A bar: gross minutes saved, minus the time the task still takes, minus upkeep, equals net | Watch-only scene | Course method, from low-confidence vendor arithmetic [S44]: frequency x time per task x people, minus what the automation still needs; time the task as it is done today and use the median, because people recall low. Areej: 6 minutes saved x 31 invoices = 186 minutes a week; minus 7 minutes of upkeep = 179, about 3 hours a week. |
| B5 | Cost comes from the bill | A cost report filtered by one service for one month | Static picture | Costs come from the bill or the cost report, for a stated period, filtered by service or tag. Example tool: AWS Cost Explorer shows up to 13 months and refreshes at least every 24 hours (checked 2026-10) [S41]. No cloud account needed to learn the rule. |
| B6 | Ask before you show employer data | A short permission message to a lead; the reply; the chart with the company and table names removed | Watch-only scene | Hard rule (brief, research C design implication 4). Provide a permission note the learner can adapt, for example: "May I show the p95 chart of the report endpoint in my portfolio, with the company name, table names and any customer data removed?" When in doubt, keep the number private (open decision 8). Areej's lead said yes with names removed (canon). |

- Predict before B2: "Where would proof that you fixed a leaked key live?" (the key itself, or the revocation and the protection setting).
- Quick check: match two work items to their proof.
- Worked example: Areej's four roles mapped to their proof sources (canon).
- Course 14, "The Founder Interview", module 2 ("Find your numbers") covers finding numbers you never looked at; here the focus is the proof per kind of work and permission.

## 3.4 Reading a dashboard you did not set up (Learn, 25 min, stepType Learn, format: beats)
Outcome: answer six questions about any number; read p50, p95 and p99; see why averages hide slow requests, percentiles do not average, and uptime percentages hide minutes.

| # | Heading | Claim the picture must show | Visual | GoDeeper fold |
|---|---|---|---|---|
| B1 | Six questions for any number | A dashboard tile with six question tags around it | Static picture | The six questions (course method from the sources): what exactly it measures, including what counts as an error [S31, S32]; which statistic (mean, median, p95) and whether it is a per-server number that was averaged [S31, S42]; over what window and aggregation interval [S31, S33]; where the data comes from and how late it can be [S41]; what else changed in the window; who owns the dashboard and whether the number may be used publicly. |
| B2 (predict before; PLAYABLE) | Averages hide slow requests | Dots of request times around 50 ms; the learner drags a slider that makes 1 request in 20 twenty times slower; the average line barely moves while the p95 line jumps; verdict "Average looks calm" | Playable canvas (slider renderer or picture-slider primitive) | The SRE book's example: most requests about 50 ms, 5 percent twenty times slower, and an average-based alert misses it [S31]; a 100 ms average at 1,000 requests per second can still mean 1 percent take about 5 seconds [S32]. Phrase: "Averages hide slow requests. Say p95 or p99 and say over what window." |
| B3 | p50, p95 and p99 in plain words | 100 requests lined up from fastest to slowest with markers at the 50th, 95th and 99th | Static picture | p50 is the middle experience; p95 means 1 request in 20 was slower than this; p99 means 1 in 100 [S31]. Track failed and successful requests separately, because a fast error flatters the numbers [S32]. |
| B4 | The window changes the number | The same traffic shown as a per-second rate and a one-minute average, which look very different | Watch-only scene | A number means something only with its aggregation interval [S31]; service level objectives use a window, with a four-week rolling window as a general default [S33]. SLI (the measurement), SLO (the target), SLA (a contract with consequences); quick test: if nothing happens when it is missed, it is an SLO [S31]. |
| B5 | Percentiles do not average | Three servers' p95 values averaged into a wrong number; bucket counts added first, giving the right one | Watch-only scene | Averaging per-server 95th percentiles is statistically nonsensical; histograms aggregate correctly because you sum the buckets first [S42]. A fellow who sees "average p95 across servers" asks how it was computed. |
| B6 | Uptime percent is downtime minutes | A dial from 99 to 99.99 percent; the downtime per 30 days shrinks: about 7.2 hours, 3.6 hours, 43 minutes, 4.3 minutes | Watch-only scene (or a second playable dial if the budget allows) | Arithmetic, course method: 30 days is 43,200 minutes; 1 percent is 432 minutes (7.2 hours); 0.5 percent 216 minutes (3.6 hours); 0.1 percent about 43 minutes; 0.01 percent about 4.3 minutes. 100 percent is the wrong target and each extra nine costs more [S33]; error budget example: 3,000 failed requests allowed in 3 million at 99.9 percent [S33]. Misconception: "99.9 percent means almost never down." |

- Predict before B2: "Most requests take 50 ms. Then 1 in 20 become twenty times slower. What happens to the average?" (it jumps, or it moves only a little).
- Quick check: a tile says "average response time 120 ms"; which question to ask first.
- Worked example: Areej answers the six questions for her lead's tile "report endpoint p95, 14 days": the time from request to response at the API; p95; 14 days before and after; the team's monitoring, owned by her lead (she asked him how it is collected rather than guessing); the 20 May release; public only with names removed.

## 3.5 Measure it yourself, before and after (Learn, 25 min, stepType Learn, format: beats)
Outcome: plan a measurement you control (same script, data and machine), with a no-install path.

| # | Heading | Claim the picture must show | Visual | GoDeeper fold |
|---|---|---|---|---|
| B1 | Control the test, not the calendar | "Last month versus this month" with five other changes inside, beside "same script, same data, same machine" with one change | Watch-only scene | Say what else changed, and prefer a test you control over comparing months (research C, before-and-after is a weak design [S43]). |
| B2 (predict before) | Same script, same data, same machine | Areej's k6 runs: the threshold `p(95)<200` fails at 820 ms, then passes at 95 ms after the cache; everything else stays fixed | Watch-only scene | In k6, `p(95)<200` on `http_req_duration` means 95 percent of requests finish under 200 ms, and the run exits non-zero if not [S35]; `http_req_duration` is sending plus waiting plus receiving, without DNS and connection set-up [S46]; a closed model lets the test ease off when the server slows ("coordinated omission"), so Areej used an open model with a constant arrival rate [S36]. Keep the script. Locust: the docs read show median and requests per second; check the installed version before teaching percentiles there (open decision 13). Caveats Areej states: a laptop, not production; cached lists up to 30 seconds old. |
| B3 | A query plan pair | Two plans side by side: sequential scan, actual time 3,840 ms; index scan, actual time 46 ms | Static picture | `EXPLAIN` shows the planner's chosen plan with estimated cost; `EXPLAIN ANALYZE` runs the query and adds real timings, so wrap writes in a transaction and roll back; cost units are arbitrary, not milliseconds (PostgreSQL 18 docs, checked 2026-10) [S38]. Areej ran it on a staging copy with the same data volume (canon). |
| B4 (PLAYABLE) | One audit run can mislead | The learner taps "run" five times on a page audit; scores scatter run to run; the median of five settles; verdict "One run: weak proof" | Playable canvas (picture with a run button; data-driven noise from a fixed seed) | Lighthouse results vary with network, hardware and page nondeterminism; its docs recommend several runs and the median, and say the median of 5 is about twice as stable as one run [S40]. Core Web Vitals: LCP 2.5 s or less, INP 200 ms or less, CLS 0.1 or less, at the 75th percentile of page loads; field data from real users is authoritative, lab tools cannot measure INP (page updated 2024-10-31, checked 2026-10) [S34]. Misconception: "A Lighthouse 98 is proof my site is fast." |
| B5 | Time it as it is done today | A two-week timing sheet; the median per invoice before (7 minutes) and after (1 minute) | Watch-only scene | Areej's arithmetic (canon): about 31 invoices a week; 186 minutes gross; 179 net of upkeep; about 3 hours a week; the 9 build hours pay back in about 3 weeks. |
| B6 | No laptop? Read the export | A phone showing Areej's supplied dashboard export with the six questions beside it | Static picture | The no-install path (hard constraint 3): read a supplied export and answer the six questions; or bring a number from a real job, with permission. Running k6, Lighthouse or EXPLAIN is optional. |

- Predict before B2: "Areej's p95 drops from 820 ms to 95 ms after the cache. What must stay the same for her to say the cache did it?"
- Quick check: choose the fair test design among three.
- Worked example: Areej's load test set-up and results, exactly as in canon.

## 3.6 Build your proof inventory and claim ledger (Build, 80 min, stepType Build)
Artifact (private): (a) the proof-of-work inventory, every work item from the arc's role cards with its evidence type, where it lives and its status (have it, can get it, not measured); (b) the claim ledger.

Ledger template (a table the learner copies): ID; draft kit line; metric; before; after; window; source (where, and how to re-check); my share; what else changed; permission (public-ok, redacted, private); status (ready, needs source, honest gap).

Steps: copy results from the role cards; for each, find the source (3.3); answer the six questions for any dashboard number (3.4); write the card; write at least one honest gap with "how I would measure"; optionally run one controlled measurement (3.5) or use the no-install path.

AI on own material: paste your own notes (no secrets, no client or customer names) and ask the tool to place them in the ledger columns and list empty or vague fields. The tool never fills a number, a window or a share. Do every percentage and subtraction yourself and check it. Add the AI-use line.

Areej path: her raw notes and her supplied dashboard export (text and one redacted image in the chapter) become her seven rows and one gap (canon): R1 query plan pair; R2 report p95; R3 invoice time saved (net); R4 sign-up duplicates (412, 57, 355); R5 double bookings (9 to 1, with the sessions caveat); R6 leaked key (no number; checkable through the revocation and the protection setting); R7 load test p95; G1 customers' invoice timing. Learners may build their ledger mostly from Areej's rows but need at least one row of their own (open decision 1).

Acceptance criteria:
- At least three complete claim cards (every field filled or marked "not measured"), at least one from the learner's own work.
- At least one honest gap with a concrete "how I would measure".
- Every number has a source and a way to re-check it; every window is stated.
- The permission column is filled; nothing marked private is in a draft public line.
- Arithmetic is correct (check percentages from before and after).

Hint: start with the row where you already know where the proof lives. If you are stuck: write the gap line first; it is a complete row. Prose must reach 1,200 words: why the ledger, one failure (a "90 percent faster" with no source, which Areej deletes), how to re-check, privacy.

## 3.7 Honest numbers and proof of work (Check, 10 min, stepType Check)
Five MCQs, skills not recall:
1. A claim lacks a window and a source; choose the complete claim card.
2. A tile shows "average response time 120 ms"; choose the most useful next question.
3. A dashboard averages three servers' p95 values; choose what is wrong and what to ask for instead.
4. Choose the before-and-after design that supports "my change did it".
5. **Check the AI's answer:** an AI tool says Areej's script saves "7 minutes x 31 invoices = 217 minutes a week". Choose what it got wrong (gross, not net: the 1 minute check per invoice and the upkeep remain, so about 179 minutes).

## 3.8 Checklist and learning log (Gate, 50 min with the drill, 45 written, stepType Gate)
Checklist:
- My ledger has at least three complete claim cards, one from my own work.
- It has at least one honest gap with how I would measure.
- Every number has a source I can name and a window.
- The permission column is filled, and I asked before using any employer data publicly.
- I removed names, secrets and contact details before pasting into the AI interviewer.
- I finished the AI drill, or wrote the written option.

Learning log:
1. Which claim card was hardest to complete, and what was missing?
2. Which number did you drop or change after the six questions? (Or: why Areej deleted "improved speed by 90%".)
3. What else changed in the window of your strongest claim?
4. Which measurement will you run or ask for next?

Written task (openquestion, text, minWords 100, allowSpeechInput true): paste your strongest claim card and say how a stranger could re-check it. Optional section "If you did not finish the AI drill": defend two ledger rows in writing: source, window, your share and what else changed (about 150 words).

Rubric parts:
| Part | Met | Partly | Not yet |
|---|---|---|---|
| Claim card complete | All seven fields filled or honestly marked | One or two fields missing | A bare number |
| Re-checkable source | A stranger could re-check from the description | Source named but not how to re-check | No source |
| Ownership | Learner's share stated apart from the team's | Share blurred | "We" only |
| Honest gap | One gap with a concrete measurement plan | Gap with no plan | None |
| Defence (drill or written) | Drill finished, or two rows defended with all four parts | Partial | Missing |

Pass rule: every part at least Partly, and "Claim card complete" and "Re-checkable source" Met. Mentor follow-up: one to three questions on the strongest claim.

AI drill (aiinterview): `context: project` (paste the top three claim cards), `focus: [impact, five-whys]`, `maxTurns: 8`, `whyDepth: 4`, `required: false`. Opening question idea: "Take your strongest number. How did you measure it, and over what time?" Rubric intent: probe source, window, share and what else changed; reward "I did not measure that"; flag invented precision. Fallback: written section; no VPN. Course 14, "The Founder Interview", for practising the same defence aloud.

ChapterRecap: claim card, proof per kind, six questions, a test you control, the ledger as source.
