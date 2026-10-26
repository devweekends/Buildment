---
artifact: module-brief
course: career-brand
module: 08-writing-and-distribution
version: 1
owner: curriculum-architect
roadmap_version: 1
roadmap_confirmed: false (G2B pending; drafted before sign-off on the sponsor's instruction)
canon: 00-areej-and-cast.md
---

# Module 8: Writing and distribution

## Outcome
The learner can write a post about their own work (the problem, what they tried, the numbers, what they would change) in plain words and test it with a say-it-back test; publish on a page they own first and share copies with a "first published at" line and a canonical link where the platform supports one; and plan a small, clean website made theirs by specifics. They have one post, a plan for about ten channels and a website plan (O8).

## Why this module exists
The sponsor: blogs about your work, one piece across about ten channels, a clean blog-style personal website that is clearly not AI-made, so a visitor can read your articles and judge how good you are. The case study already exists (module 5); this module adds the post, the distribution and the home for both.

## Prerequisites
Module 5 (case-study-shape, lasting-links), module 3 (claim-card), module 6 (empty-sentence-edit), module 1 (cheap-writing).

## Cross-links and limits
- Course 13, "Learn and Build with AI": turning a week of commits into an article and saying when AI helped; link in 8.2; do not repeat it.
- Never teach as fact: Google "penalises" duplicate content (U-I3); Hashnode or Substack canonical settings (U-I1); that detectors are reliable or humanisers make text safe (U-I2); that DEV, Medium, Hashnode or Substack are reachable from Gaza (U-K5); that registrars or Netlify serve Gaza-based customers (U-K2).
- Never teach: humaniser tools, beating detectors, hiding AI use, paid domains as required, a specific static site generator without testing one deploy first.
- The sponsor's own website is never named, linked or described, including as an example of a personal site.
- Every platform fact carries "checked 2026-10; if your screen differs, follow your screen".
- Credits: Google Search Central; the US General Services Administration's Digital.gov plain language guides; the IndieWeb community for POSSE.

## Chapters
| # | Chapter | stepType | Min | Requires | Introduces | Evidence |
|---|---|---|---|---|---|---|
| 8.1 | Set the scene | Read | 10 | case-study-shape | writing-failure | none |
| 8.2 | A post about your own work | Learn (beats) | 20 | writing-failure, claim-card | work-post, say-it-back | quick check |
| 8.3 | Publish once, share in about ten places | Learn (beats) | 25 | work-post | posse, canonical-link | quick check |
| 8.4 | A website that is clearly yours | Learn (beats) | 20 | posse | own-site | quick check |
| 8.5 | Write your post and publishing plan | Build | 55 | work-post, say-it-back, posse, canonical-link | none | post and channel plan |
| 8.6 | Plan your website | Build | 35 | own-site | none | website plan |
| 8.7 | Writing and distribution | Check | 10 | own-site | none | quiz |
| 8.8 | Checklist and learning log | Gate | 30 | say-it-back | none | say-it-back result, published link |

## 8.1 Set the scene (Read, 10 min, stepType Read)
Outcome: introduce writing and distribution through Diala. LearningObjectives for the module.

| Beat | Heading | What the picture shows | Visual |
|---|---|---|---|
| 1 | Her best post, gone | Diala's post about cutting CI from 22 to 9 minutes lives on one blogging platform; she loses access to her account; the post and her resume link vanish | Watch-only scene, illustrated allowed |
| 2 | A website nobody believes | Her template site: "I am a passionate DevOps engineer who loves solving problems", stock photos, no dates, no numbers | Watch-only scene |

- Everyday question: "What would you change first: where the post lives, or what the website says?"
- Facts: canon 8.1. Do not name a real platform as the one she lost. Mark: fictional.

## 8.2 A post about your own work (Learn, 20 min, stepType Learn, format: beats)
Outcome: write a post about real work in plain words and test it by asking someone to say it back.

| # | Heading | Claim the picture must show | Visual | GoDeeper fold |
|---|---|---|---|---|
| B1 | A visitor judges you by your writing | A visitor reads one post and forms a view of how its author thinks: the problem, the test, the trade-off | Watch-only scene | Google's people-first guidance asks whether content gives original information or analysis and shows first-hand expertise [P42]; that is also what a founder looks for (module 1). |
| B2 | Problem, what I tried, numbers, change | The four-part spine of a post, each part filled with Areej's load test | Static MermaidDiagram | Areej's post (canon): the problem, the test set-up, the before and after (820 ms to 95 ms p95), the stale-data trade-off, what she would change. Every number comes from the ledger. |
| B3 (predict before; PLAYABLE) | Start where the reader's question is | The learner drags post parts (project history, the problem, the result, the set-up) into order; a reader's question bubble shows whether the opening answers "why should I keep reading?" | Playable canvas (sorter primitive) | Course method: open with the problem and the result, then how you know. No data claims a specific opening length. |
| B4 | Plain words, short sentences | A long sentence breaking into three short ones; "conduct an analysis of" becoming "analyse" | Watch-only scene | Digital.gov's plain language guides: shorter words, short sections, active voice and present tense are easier to understand; avoid hidden verbs [P46] (government guidance, not a trial). Phrase: "Write the way you would explain it to a colleague who is tired. Short words, active verbs, one idea per sentence." Misconception: "Plain means childish." |
| B5 | The say-it-back test | A classmate repeats the post in their own words; the gap between what was written and what was heard lights up | Watch-only scene | Paraphrase testing suits short documents; plan to test at least twice [P46]. Areej's result (canon). Phrase: "Then ask someone to say it back to you. If they cannot, rewrite." |
| B6 | Say when AI helped | The post's last line: "I used an AI tool to restructure my notes into sections; every number and decision is mine and I checked each one." | Static picture | Google: fact-check AI-generated content, add value, and consider saying how content was created [P41]. Course 13, "Learn and Build with AI", for turning a week of commits into an article and saying when AI helped. |

- Predict before B3: "A busy reader opens your post. Which opening keeps them: the history of the project, or the problem and the result?"
- Quick check: choose the post outline with all four parts.
- Worked example: Areej's post plan (canon), and Diala's lost post rebuilt in four parts (22 to 9 minutes; no new numbers).

## 8.3 Publish once, share in about ten places (Learn, 25 min, stepType Learn, format: beats)
Outcome: publish on your own page first, then share copies with a "first published at" line and a canonical link where supported.

| # | Heading | Claim the picture must show | Visual | GoDeeper fold |
|---|---|---|---|---|
| B1 | Your own page is the original | Your page at the centre; LinkedIn, DEV, Medium and others as doors pointing back to it | Static MermaidDiagram | POSSE: "Publish (on your) Own Site, Syndicate Elsewhere" (IndieWeb wiki, a community practice, not research) [P45]. Phrase: "Your own page is the one you control. LinkedIn, DEV and Medium can change their rules or lock your account. Keep the original on a page of yours, and use the other places to bring readers to it." |
| B2 (predict before) | Search picks one copy; no penalty | The same article on three sites; Google marks one as the version it shows, which may be another site's copy | Watch-only scene | You state a preference by redirects or `rel="canonical"` (strong signals) or a sitemap (weak); "a hint, not a rule" [P37, P38]. For syndicated copies Google says canonical is not recommended and partners should block indexing [P39, P40]; a fellow cannot make a platform do that. Without any preference a site "will likely do just fine" [P37]. Medium's help says duplicate content "may be penalized" [P44]; Google describes choosing a version: say "Google picks one version and may pick the other site's copy" (U-I3). Phrase: "...Google calls this a hint, not a rule, so expect it to help, not to be guaranteed." |
| B3 | Where a canonical field exists | DEV's `canonical_url` front matter field; Medium's "originally published elsewhere" setting; LinkedIn with a short version and a link | Static picture | DEV editor guide front matter `canonical_url` [P43]; Medium sets it automatically on import or manually under advanced settings, author only [P44]; LinkedIn's article SEO page describes only an SEO title and description, no canonical field read [P25]. Hashnode and Substack settings are unverified (U-I1): use the "first published at" line. All checked 2026-10. |
| B4 (PLAYABLE) | Map your ten channels | The learner drags channels onto a map around their own page; each shows its version (full copy with canonical, short version with link, link only, personal message) and a warning on any copy with no link home | Playable canvas (block-map primitive) | Areej's ten channels (canon). Try each platform on your phone before the gate; access from Gaza is not confirmed for DEV, Medium and others (U-K5). Which ten is open decision 19. |
| B5 | One honest line on every copy | "First published at [your site]" with a link at the top of a copy | Static picture | Phrase: "At the top or bottom of every copy, write one honest line: 'First published at [your site].' with a link. Readers use it even if search engines do not." Cross-posting is for readers, not a ranking trick. |

- Predict before B2: "You publish the same article on your site and on two platforms. What does Google do with the copies?" (penalises you, or picks one version to show).
- Quick check: a platform has no canonical field: choose what to do.
- Worked example: Areej's channel plan (canon).

## 8.4 A website that is clearly yours (Learn, 20 min, stepType Learn, format: beats)
Outcome: plan a small, clean site on a free static host and make it yours with specifics.

| # | Heading | Claim the picture must show | Visual | GoDeeper fold |
|---|---|---|---|---|
| B1 | A few pages are enough | A site map: home, work, writing, about, contact | Static MermaidDiagram | Phrase: "A personal site is a few pages: who you are, what you built, one case study, how to reach you. A free static host is enough." |
| B2 (predict before) | Specifics make it yours | A template page beside a specific one: real screenshots, a date on every post, a number with a source, an honest mistake | Watch-only scene | Google does not ban AI content but warns against pages "without adding value", asks you to fact-check AI content and suggests disclosing how it was made [P41]; its people-first page asks for original information, first-hand expertise and bylines, and warns against deceptive authorship [P42]. Detectors misclassify non-native English [P52], so passing one is not a goal. Phrase: "Make it yours by being specific: your number, your screenshot, your mistake." |
| B3 (PLAYABLE) | Swap generic for specific | The learner toggles site elements (stock photo or real screenshot; "passionate problem solver" or the USP line with a proof; no dates or dated posts; "loves coding" or the football notebook line); a meter shows what a visitor learns | Playable canvas (beat-choice toggles) | Course method supported by the originality questions above. Misconception: "Use a humaniser to beat AI detectors." |
| B4 | A free static host, checked | Two host cards with their limits and the check date | Static picture | GitHub Pages: a static host from a repository; site up to 1 GB, soft 100 GB a month, soft 10 builds an hour; not for commercial transactions or SaaS; custom domain optional [P48, P49]. Cloudflare Pages free: 500 builds a month, 20,000 files, 25 MiB per asset [P50]. Vercel Hobby: personal, non-commercial only [P51]. GitHub's trade controls page does not name Palestine and has an appeal route if a user is flagged in error [P57]. A free `github.io` or `pages.dev` address is enough; no paid domain (open decision 20). Pick one static site generator and test one deploy before recommending it. All checked 2026-10. |
| B5 | Small, dated and alive | The site with a "last updated" date; the post's original lives here | Static picture | The site is the home in the POSSE map (8.3) and the base for the resume links (6.5). A site that is never updated looks abandoned; one small update a month is enough (course suggestion). |

- Predict before B2: "What makes a visitor believe you wrote your site yourself?" (it passes an AI detector, or it has specifics only you have).
- Quick check: choose the home page line that shows first-hand work.
- Worked example: Areej's website plan (canon); Diala's template line rewritten with her CI result.

## 8.5 Write your post and publishing plan (Build, 55 min, stepType Build)
Artifact: one post about the learner's own work (own preferred; Areej's allowed, open decision 1) and a channel plan.

Parts: a title that names the result; the four-part spine (problem, what I tried, numbers with sources from the ledger, what I would change); an AI-use line if AI helped; a say-it-back record (who, what they said back, what you changed). Suggested length about 600 to 1,000 words (course suggestion).

Channel plan template: channel; version (full copy with canonical, short version with link, link only, personal message); link line ("first published at" or canonical set); checked on my phone on (date); planned date. About ten rows; the first row is the learner's own page (or a repository README until the site exists).

AI on own material: paste your ledger row or case study and notes; ask the tool to propose sections and a title and to point out long sentences; do the say-it-back test with a person, not a tool; add no number the ledger does not hold.

Areej path: write Areej's post from canon facts if you have no work you may publish; still make your own channel plan.

Should-have: publish on at least one channel. Not required.

Acceptance criteria:
- All four parts present; every number is in the ledger.
- Plain language: short sentences and active verbs; no empty sentences (6.4 checklist).
- The AI-use line is present if AI helped.
- A say-it-back record and one change made from it.
- About ten channels, each with a version and a link line; no reliance on unverified canonical settings.

Hint: write the "numbers" part first from your ledger, then the problem. If you are stuck: turn your case study into a post by cutting the context and keeping one decision. Prose must reach 1,200 words: why this spine, plain language, POSSE in practice, one failure (Diala's lost post).

## 8.6 Plan your website (Build, 35 min, stepType Build)
Artifact: a website plan (own). Deploying it is optional.

Template: pages (home, work, writing, about, contact) with what goes on each; which case study and which post go where; the host chosen, with its check date and the limit that matters most; the "what makes it mine" list (at least four specifics); the rule that originals live here first; an update plan; privacy (contact by email only; no phone number or home address).

AI on own material: ask the tool to turn your arc's lines into a page outline; the words on the page stay yours.

Areej path: her plan (canon) as the worked example.

Acceptance criteria: five pages planned with content; a free host chosen with a check date; at least four specifics; privacy rule stated; no paid domain needed.

Prose must reach 1,200 words: why few pages, why specifics, hosting limits, keeping links stable.

## 8.7 Writing and distribution (Check, 10 min, stepType Check)
Five MCQs:
1. Choose the post opening that starts where the reader's question is.
2. The same article is on three sites: choose what Google does.
3. A platform has no canonical setting: choose the honest way to share there.
4. Choose the home page element that shows first-hand work.
5. **Check the AI's answer:** an AI tool advises "run your site text through a humaniser so detectors do not flag it". Choose what is wrong (detectors misjudge second-language writers; humanisers do not add information; specifics and checked facts make a site yours).

## 8.8 Checklist and learning log (Gate, 30 min, stepType Gate)
Checklist:
- My post has the four parts and every number is in my ledger.
- I ran the say-it-back test and changed something because of it.
- My channel plan has about ten channels, each with a link line, and I tried them on my phone.
- My website plan has five pages, a host with a check date and at least four specifics.
- If I published, the copy says where it was first published.

Learning log:
1. What did your listener say back, and what did you change?
2. Which channel matters most for the readers you want, and why?
3. What on your website plan could only you have written? (Or: Areej's.)
4. What would you write about next?

Written task (openquestion, text, minWords 100, allowSpeechInput true): record the say-it-back result and the change you made; add the link to a published copy if there is one (about 120 words).

Rubric parts:
| Part | Met | Partly | Not yet |
|---|---|---|---|
| Post | Four parts, numbers from the ledger, plain words | A part missing or a number without a source | No post |
| Say-it-back | Done, with a change made | Done, no change | Not done |
| Channel plan | About ten channels with versions and link lines | Fewer, or link lines missing | None |
| Website plan | Five pages, host with check date, four specifics | Partly | None |

Pass rule: every part at least Partly; "Post" must be Met. No AI drill. Mentor follow-up: one question on the post. ChapterRecap: write about real work, own the original, share with a link home, a small site that is yours.
