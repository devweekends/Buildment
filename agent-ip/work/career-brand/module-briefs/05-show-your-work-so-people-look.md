---
artifact: module-brief
course: career-brand
module: 05-show-your-work-so-people-look
version: 1
owner: curriculum-architect
roadmap_version: 1
roadmap_confirmed: false (G2B pending; drafted before sign-off on the sponsor's instruction)
canon: 00-areej-and-cast.md
---

# Module 5: Show your work so people look

## Outcome
The learner can plan a deployable unit with a README in reader order, choose instant access (Sign in with Google with only name, email and profile, or a demo account that is safe for a stranger), plan a 60 to 120 second demo of the core, keep links working when free tiers sleep or expire, and structure a case study from a ledger row. They have one case study, a showcase plan for one project and a stranger test result (O5).

## Why this module exists
Hard constraint 2: the reader gives seconds, so access matters more than polish; demos that sleep, expire or ask for sign-up lose the reader. The case study is the base layer that survives free-tier limits, which is why it sits here (before the resume links to it). The production bar of the brief applies in spirit: anything shown is deployed or reachable without setup, safe for a stranger, and measurable.

## Prerequisites
Module 3 (claim-ledger), module 4 (appetite-plan), module 1 (first-look-order).

## Cross-links and limits
- Course 14, "The Founder Interview", chapter 5.7 ("A demo they can open"): link in 5.2; this module goes further (deployable unit, access, safety, lasting links, case study).
- Never teach as fact: "sign-up walls lose 18 percent of visitors" (a company statistic about shopping carts [S61]); "keep the demo under 6 minutes because engagement drops" (lecture-video research [S74]); "MFA stops 99.9 percent of compromises"; "23.8 million secrets leaked in 2024" as fact (a vendor count [S82]).
- Every hosting and Google fact is dated "checked 2026-10" and marked "verify before publish". Access from Gaza for Google sign-in and hosts is not confirmed (U-K2, U-K3): test early, ask the mentor, never use a VPN.
- Building the project is out of scope; the learner plans the showcase. A deployed demo is a should-have.
- Credits: OWASP cheat sheets [S65, S66]; Google's SRE book for the postmortem shape [P47]. Hosting vendors are named only in the tool step, with a date.

## Chapters
| # | Chapter | stepType | Min | Requires | Introduces | Evidence |
|---|---|---|---|---|---|---|
| 5.1 | Set the scene | Read | 10 | first-look-order | nobody-runs-it | none |
| 5.2 | Nobody will run your code | Learn (beats) | 25 | nobody-runs-it | deployable-unit, reader-readme, lasting-links | quick check |
| 5.3 | Let them in with one click | Learn (beats) | 25 | deployable-unit | instant-access, safe-demo-account | quick check |
| 5.4 | A short demo of the core | Learn (beats) | 20 | instant-access | short-demo | quick check |
| 5.5 | The case study: a postmortem for a success | Learn (beats) | 25 | claim-ledger | case-study-shape | quick check |
| 5.6 | Build your showcase | Build | 75 | case-study-shape, deployable-unit, instant-access, short-demo, lasting-links | stranger-test | case study, showcase plan, stranger test |
| 5.7 | Show your work so people look | Check | 10 | stranger-test | none | quiz |
| 5.8 | Checklist and learning log | Gate | 50 (45 written) | stranger-test | none | stranger test, drill or written |

## 5.1 Set the scene (Read, 10 min, stepType Read)
Outcome: introduce showcasing through Moath. LearningObjectives for the module.

| Beat | Heading | What the picture shows | Visual |
|---|---|---|---|
| 1 | A GitHub link nobody opens | The founder receives the link; the README starts with install commands; the founder moves on without cloning | Watch-only scene, illustrated allowed |
| 2 | A minute to wake, then a sign-up | The demo link shows a loading screen while the free service wakes, then a sign-up form with email confirmation; the tab closes | Watch-only scene |

- Everyday question: "What would have let the founder see the app straight away?"
- Facts: canon 5.1. No number of seconds for the founder's patience. Mark: fictional.

## 5.2 Nobody will run your code (Learn, 25 min, stepType Learn, format: beats)
Outcome: ship a deployable unit with a README in reader order, and keep links working in six months.

| # | Heading | Claim the picture must show | Visual | GoDeeper fold |
|---|---|---|---|---|
| B1 | Nobody will clone and run it | The steps a reader would need (clone, install, set variables, start a database) and the reader dropping off at the first one | Watch-only scene | A company that hires programmers screens by cover letter and resume first and looks at work later [S8]. A demo link alone can be asleep, expired or empty, so add a recording and a measured result (research E misconceptions). |
| B2 | A deployable unit runs the same anywhere | One box (a container) moving from a laptop to a server unchanged, started by one command | Static picture | Docker's docs describe a container as an isolated process with everything it needs, which should behave the same on a laptop and in the cloud [S75]. The course asks for a one-command start written in the README, not deep container skills. |
| B3 (predict before; PLAYABLE) | The stranger's path to a first screen | A link leads to a first useful screen; the learner toggles obstacles (a sleeping demo, a sign-up wall) and fixes (a static case study page, a screenshot first, a demo login); the path and a verdict update ("Lost at sign-up", "Useful screen first") | Playable canvas (state-machine renderer or block-map primitive) | Render's free web service spins down after 15 minutes without traffic and takes about a minute to wake (checked 2026-10, verify before publish) [S67]. Phrase: "Reviewers give you seconds, not minutes. If they have to make an account, many will leave. Let them in with one click or a ready demo login." |
| B4 | A README in reader order | A README whose sections line up in order: what it is, a screenshot or short demo link, try it in a minute, how it was measured, what is not done | Static picture | GitHub's README guidance: what the project does, why it is useful, how to start, where to get help, who maintains it; GitHub looks in `.github`, the root, then `docs`, and truncates beyond 500 KiB; a repository named like your username shows its README on your profile [S72]. A study of READMEs found many lack the project's purpose and status [S73]. Phrase: "Your README is the first page of your project. Say what it is, show it, tell how to try it in a minute, and say what is not finished." |
| B5 | Links that still work in six months | A calendar: a free database deleted on day 30 (14 days' grace) and the resume link breaking; beside it a static case study page and a short recording that still open | Watch-only scene | Free-tier snapshot (checked 2026-10, verify before publish) [S67 to S71]: Render free Postgres 1 GB, expires 30 days after creation with a 14-day grace; GitHub Pages up to 1 GB, soft 100 GB a month, not for running a business, e-commerce or commercial SaaS; Vercel Hobby personal, non-commercial only; Cloudflare Pages free 500 builds a month; Netlify free 300 credits a month with a hard limit. So the resume points to something that lasts: a static case study plus a recording, with the live demo as a bonus. Areej moved her club data before the 30-day deletion (canon). Phrase: "Free hosting plans sleep, expire and change their rules. Check the plan page the week you publish, and keep a screenshot and a short recording as a backup." |

- Predict before B3: "Moath's demo is on a free plan that sleeps when idle. What does the founder see first?"
- Quick check: choose the README opening that lets a reader try the project in a minute.
- Worked example: Areej's README outline for Raqim Stock (canon showcase plan). Course 14, "The Founder Interview", chapter 5.7, for the interview side of "a demo they can open".

## 5.3 Let them in with one click (Learn, 25 min, stepType Learn, format: beats)
Outcome: choose instant access and make a demo account safe for a stranger.

| # | Heading | Claim the picture must show | Visual | GoDeeper fold |
|---|---|---|---|---|
| B1 | Every extra step is a door to leave | Two paths: sign-up, confirm email, fill a profile, then the app; or one button straight in | Watch-only scene | Course rule from the brief: instant access. Shoppers report forced account creation as one reason they leave a checkout (a company claim about carts [S61]); do not quote a number for demos. |
| B2 | Sign in with Google, smallest request | A consent screen that asks only for name, email address and profile picture, with no warning and no test-user list | Static picture | Google's docs: sign-in returns an ID token; sign-in (authentication) is separate from asking for Google data later; new web apps should enable FedCM (checked 2026-10) [S62]. OAuth 2.0: the app never sees the Google password; a short-lived code is exchanged for tokens [S64]. While an app is in testing, up to 100 test users can be listed and authorisations expire after 7 days, except when the app asks only for name, email and profile, which need no test list and have no warning or expiry; an unverified app needing sensitive scopes is capped at 100 new users [S63]. Whether set-up works from Gaza is not verified (U-K3): test early, ask the mentor. Misconception: "Sign in with Google needs a long approval." |
| B3 (predict before) | A demo login that can do everything | A "Try the demo" button opens the full app on a fake shop with fake stock | Watch-only scene | The demo account lets a stranger try every core feature; the safety comes from the data and rights around it, not from hiding features. |
| B4 (PLAYABLE) | Remove a control, see the risk | A checklist of controls around the demo account; the learner switches one off at a time and the picture shows what a stranger could then do (real data exposed, a paid API called, spam sent, a key found in the repository, the data left broken) | Playable canvas (beat-choice toggles on a picture) | The demo checklist (course method from OWASP): seeded fake data with no real person's information; low rights that cannot reach real email, SMS, payments or paid APIs; spending and rate limits on any paid service; a scheduled reset; no real keys in the repository, only an example env file; a visible "this is a demo" line. OWASP: throttle guessing and tie lockout to the account; allow passphrases; check against breached lists; MFA is the best single defence against password attacks; no front-end logins for service accounts [S65]; keep secrets out of code, rotate and revoke, least privilege, be careful with environment variables in logs [S66]. Phrase: "A demo login is a door that strangers will push on. Give it fake data, small rights, and a reset." Misconception: "A shared password in the README is fine." |
| B5 | When you cannot deploy at all | A static case study page with screenshots and a short recording, opened on a phone | Static picture | The no-hosting path (research E design implication 2): a case study page plus a recording counts as a showcase. |

- Predict before B3: "A shared demo login is printed in the README. What has to be true for that to be safe?"
- Quick check: choose which missing control is the most dangerous for a given demo.
- Worked example: Areej's demo account plan for Raqim Stock (canon: fake shop, no real email or payments, nightly reset, rate limits, example env file, demo label; Google sign-in kept for later with basic scopes).

## 5.4 A short demo of the core (Learn, 20 min, stepType Learn, format: beats)
Outcome: plan a 60 to 120 second demo that starts with the result, shows the core, has captions and offers a screenshot first.

| # | Heading | Claim the picture must show | Visual | GoDeeper fold |
|---|---|---|---|---|
| B1 | Start with the result | Frame one of a storyboard shows the payoff (Areej's low-stock warning), not a logo | Watch-only scene | Course method: the first seconds show what the product does for the user. |
| B2 (predict before; PLAYABLE) | Cut the filler, keep the core | Storyboard frames (logo intro, sign-up, settings tour, the warning, recording a sale, the invoice); the learner drags them in and out; a running-time bar shows the total and turns to "Within 60 to 120 seconds" | Playable canvas (sorter primitive with a time bar) | The sponsor: "a short demo of the core, beautiful part, not filler". 60 to 120 seconds is course method. A study of MOOC lecture videos found engagement fell as videos got longer [S74]; it is about lectures, so it supports "short" in general, not a demo length. |
| B3 | Show the hard part, not a tour | The demo lingers on the one thing that was hard to build (the stock count staying right when two sales arrive) | Watch-only scene | A tour of menus proves little; the core flow and one hard detail invite the reader's question. |
| B4 | Captions, because many watch muted | A captioned frame on a phone with the sound off | Static picture | Viewers may watch without sound (course method); captions are also an accessibility rule. |
| B5 | Screenshot first on weak data | A page with a screenshot and a "watch the 90-second demo (size stated)" link; no autoplay | Static picture | Light pages: no autoplay, state the size, give a text path (authoring standards). Many readers and fellows are on weak, costly data. |

- Predict before B2: "Which frame should open a 90-second demo of Raqim Stock?"
- Quick check: choose the storyboard that fits the rules.
- Worked example: Areej's 90-second storyboard (canon).

## 5.5 The case study: a postmortem for a success (Learn, 25 min, stepType Learn, format: beats)
Outcome: structure a case study from a ledger row.

| # | Heading | Claim the picture must show | Visual | GoDeeper fold |
|---|---|---|---|---|
| B1 | A postmortem, but for a success | Incident report fields (summary, impact, root cause, resolution, lessons) lined up beside case study sections (problem, numbers before, what I did, numbers after, what I would change) | Static MermaidDiagram | Google's SRE book example postmortem fields and its blameless style [P47], used as an analogy only; no standard for portfolio case studies was found. Phrase: "A case study is a postmortem for a success. It says what was wrong, what it cost, what you changed and how you know it worked. Google's engineers write incident reports in this shape, and so can you." |
| B2 (PLAYABLE) | Build it from a ledger row | The learner drags Areej's ledger fields (R1 and R2) into case study slots; empty slots stay flagged | Playable canvas (card filler on the sorter primitive) | Section order (course method adapted from the postmortem): the problem and who felt it; numbers before with source and window; what I did and decided, and what the team did; numbers after, same source and window; what else changed; what I would do differently; where to see it. |
| B3 (predict before) | Your part and the team's, in writing | The case study section split: found, planned, chose, wrote (Areej); reviewed, scheduled, deployed (her lead) | Watch-only scene | The stranger in Areej's test asked "what did your lead do?" (canon); the case study should answer before anyone asks. |
| B4 | What you would do differently | A section with Areej's answer: a slow-query alert so the next one is found sooner | Static picture | Hiring teams that publish their process look for evidence of iteration [S9]; saying what you would change shows it. |
| B5 | Permission and removed names | The chart with the company and table names blurred and a line "shared with permission" | Static picture | The rule from 3.3: ask first; remove names; no customer data. Areej's public title uses "a parcel delivery company". |
| B6 | It still works when the demo sleeps | The case study page opens on a phone with images of the before and after plans and the chart; no login, no wake-up | Watch-only scene | The case study is the showcase's base layer (5.2). It also becomes a website page (module 8) and a resume link (module 6). |

- Predict before B3: "A reader wants to know what Areej's lead did. Where should the case study answer that?"
- Quick check: choose which section a given sentence belongs in.
- Worked example: Areej's case study, title and sections exactly as in canon.

## 5.6 Build your showcase (Build, 75 min, stepType Build)
Artifacts:
1. One case study (own work if the learner may show it; otherwise Areej's, open decision 1), using the 5.5 section template, every number from the ledger, permission respected.
2. A showcase plan for one project (the module 4 plan or an existing project): deployable unit and one-command start; access path (demo account or Google sign-in with basic scopes); the demo account checklist; a 60 to 120 second storyboard; the base layer (case study page, screenshot, recording); a README outline in reader order.
3. A stranger test: someone who has not seen it opens the case study link on a phone with no help (any link that opens without a login, such as a repository README, works). Record the time to the first useful screen and the two questions they asked.

Templates: the case study outline; a showcase plan table (part, my plan, done or planned); the demo checklist with tick boxes; a stranger test record (date, who, device, time to first useful screen, what they understood, two questions).

AI on own material: paste one ledger row and ask the tool to place it in the case study outline and to list questions a stranger would ask; it adds no number, result or credit. Check every sentence against the ledger.

Areej path: her case study and showcase plan (canon) to study; learners without showable work submit her case study with their own showcase plan for their module 4 project, and still run a stranger test on it.

Acceptance criteria:
- The case study has every section, and every number appears in the ledger.
- Ownership is split; permission and removed names are respected.
- The showcase plan covers all five parts; the demo checklist is complete or each gap is named.
- The stranger test is recorded with a time and two questions.
- No real key, secret or customer data anywhere.

Hint: write "numbers before" and "numbers after" first; the rest of the case study hangs on them. If you are stuck on hosting: use the no-hosting path; the case study page counts. Prose must reach 1,200 words: why each artifact, a failure (Moath's path), the safety reasoning, how to run the stranger test fairly.

## 5.7 Show your work so people look (Check, 10 min, stepType Check)
Five MCQs:
1. Choose the README opening that lets a stranger try the project in a minute.
2. A demo account lacks one control; choose the most dangerous gap.
3. Choose the Google sign-in request that avoids test-user limits and verification.
4. Choose the resume link most likely to still work in six months.
5. **Check the AI's answer:** an AI tool suggests committing the `.env` file "so reviewers can run the project". Choose what is wrong (secrets in a repository; a pushed key must be revoked and replaced; use an example env file and a safe demo account).

## 5.8 Checklist and learning log (Gate, 50 min with the drill, 45 written, stepType Gate)
Checklist:
- My case study has every section and every number is in my ledger.
- I asked permission or removed names for anything from an employer or client.
- My showcase plan covers the deployable unit, access, demo account checklist, demo storyboard and base layer.
- I ran the stranger test on a phone and recorded the time and two questions.
- No real keys or customer data appear anywhere.
- I finished the AI drill or wrote the written option.

Learning log:
1. What did the stranger understand first, and what did they miss?
2. Which demo control would you have forgotten without the checklist?
3. What did your case study say about your part that your old resume did not? (Or: Areej's.)
4. If your demo is asleep tomorrow, what will a reader still see?

Written task (openquestion, text, minWords 100, allowSpeechInput true): report your stranger test (time to first useful screen, what they understood, the two questions). Optional section "If you did not finish the AI drill": answer the two questions the stranger raised and this probe: "What would you do differently, and why?" (about 150 words). Areej's key was refused in this drill, so her written option is the worked example (canon: "was this production or a test copy?", "what did your lead do?").

Rubric parts:
| Part | Met | Partly | Not yet |
|---|---|---|---|
| Case study complete | All sections; numbers match the ledger | A section missing or a number not in the ledger | No case study |
| Stranger test | Time, what was understood and two questions recorded | Partly recorded | Not run |
| Safety | Demo checklist complete or gaps named; no secrets or private data | One unnamed gap | Secrets or private data present |
| Defence (drill or written) | Drill finished, or both questions and the probe answered | Partial | Missing |

Pass rule: every part at least Partly; "Safety" must be Met. Mentor follow-up: one to three questions on the case study.

AI drill (aiinterview): `context: project` (paste the case study, names removed), `focus: [case-study, best-technical]`, `maxTurns: 8`, `whyDepth: 3`, `required: false`. Opening question idea: "Walk me through your case study. What was the problem, and how do you know your change fixed it?" Rubric intent: probe numbers before and after, what else changed, the learner's part, and the alternative they rejected. Fallback: written section; no VPN.

ChapterRecap: nobody runs your code; one click in; a safe demo; a short demo; a case study that survives.
