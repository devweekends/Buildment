---
artifact: critique
course: build-with-ai
artifact_under_review: content/import/build-with-ai/ (40 chapters, course.yaml) and the 22 canvases in frontend/src/canvas/<slug>/ (data.ts, spec.md)
reviewer: critic B
review_type: slop | continuity | technical (factual accuracy against the dossier)
lens: slop, continuity and factual accuracy against the dossier
version: 1
scorecard_average: 4.29 (21 scored dimensions; dimension 19 not scorable)
blocking_defects: 4 (S1: 0, S2: 4)
recommendation: revise
---

# Critique: Learn and Build with AI (build-with-ai), critic B

Reviewed on 2026-10-24 against `research.md` (dossier), `00-course-brief.md`, `curriculum-roadmap.md`, `decision-log.md`, `agent-ip/00-principles.md`, `03-authoring-standards.md` and `06-quality-gates.md`. Nothing in the course was edited. While looking for the cast table I also opened `context-packs/writer-pack.md`; I used it only to confirm cast canon, not to judge intent.

## What I ran (all read-only)

| Check | Result |
|---|---|
| U+2013 and U+2014 in 40 chapters, `course.yaml`, 22 `data.ts` and 22 `spec.md` | 0 found. The only non-ASCII character in the whole set is the letter e with acute (29 times, "cafe") |
| Links, `MustRead`, `InterestingRead`, `RealWorldEvent` | 0 in chapters |
| Forbidden phrases from `03-authoring-standards.md` (delve, leverage, seamless, robust, powerful, landscape, key takeaways, and others) | 0 |
| Sentences over 30 words in learner-facing prose (outside tables and fences) | 10; plus 10 more in quiz stems, options, explanations and open-question prompts (listed in S3-15) |
| Tool census against the allowed list | Only allowed tools named. One product outside the list: "Word files" (2.5 quiz) |
| Quiz option length (68 MCQs) | Correct option strictly longest in 0 of 68; longest or tied in 3. Key positions 0 to 3: 15, 19, 19, 15 |
| Terms defined twice (GlossaryTerm, BigWordAlert, Key words) | 3 repeats (S3-11) |
| Arithmetic recomputed | Every factor total (1.5, 2.3, 5.4), the 243-setting claims, the 5.2 hours maths, the 5.7, 6.4 and 6.5 sums, the subnet, percentage and lab-minute figures all check out, except the learning share in S2-2 |
| Cross-references to course 9 module 7 | Correct: "predicts likely words from patterns" is in 07.02, and "rough numbers, find the source, solve it another way" is in 07.04 |
| Chapter titles and minutes against `course.yaml` | 40 of 40 match; 995 minutes |
| `node agent-ip/scripts/audit-course.mjs content/import/build-with-ai` | "Needs work: 0"; prose 1,252 to 2,117 words per Learn, Read and Build chapter; gates 765 to 1,027 |
| Line endings | 16 chapters use CRLF, 24 use LF (S3-18) |

## Scorecard

Dimension 19 cannot be scored: `roadmap-confirmation.md` does not exist and the roadmap says G2B is pending (`critic.md`: "cannot be scored unless the roadmap confirmation record exists"). It is left out of the average and is a gate blocker on its own. Dimension 20 is scored from specs, data files and chapter agreement; no canvas QA report or reader test was available to me.

| # | Dimension | Score | Note |
|---|---|---|---|
| 1 | Outcome alignment | 5 | Every chapter maps to O1 to O8; gates and the capstone give evidence for each |
| 2 | Domain specificity | 4 | Yara, Qasir, the cache lab and the disclosure cases are specific; supporting settings repeat too much (S3-12) |
| 3 | Depth over coverage | 4 | Seventeen habits in about 21 hours; each is taught with a worked case, but modules 4 and 5 carry several ideas each |
| 4 | Prose quality | 4 | Clear and calm, no hype or fear. Template voice, a repeated antithesis device, idioms and a few long sentences (S3-13 to S3-15) |
| 5 | Chapter structure | 5 | Hook, idea, worked example, diagram, predict, canvas, mistakes, check, bridge, held in all 22 Learn chapters |
| 6 | Interaction purpose | 4 | Each Learn chapter has one predict and one canvas carrying a single claim; predicts mix intuitive and cautious keys |
| 7 | Assessment quality | 4 | Option lengths and key positions are balanced (scripted). Several quiz stems use long semicolon lists (S3-15) |
| 8 | Difficulty calibration | 4 | Support fades from worked cases to provided cases; module 5 jumps in jargon (S3-16) |
| 9 | Cognitive load | 4 | One main idea per chapter; 4.5 (Git, five-part entry, secrets, near miss) and 5.4 (trade-off, explain-back, SQL injection) are full |
| 10 | Prerequisite integrity | 4 | Course 9 references are accurate. API, endpoint, pull request, virtualisation, framework are used without definition (S3-16) |
| 11 | Technical accuracy | 4 | `docker compose ...`, `restart: unless-stopped` and Git commands are correct and match S54 to S56. One date-stamped Docker claim is not in the dossier (S2-1); outputs are not from a run (S3-7) |
| 12 | Production-grade coverage | 5 | Not applicable: there is no software product |
| 13 | Security and integrity | 5 | Secrets, stranger test, rotate a pushed key, no real data in posts, GitHub push protection described without over-reliance |
| 14 | Accessibility | 4 | Scored from source only: plain English, mermaid limited in size, every canvas has a `summary`. Not tested at 375px or with a screen reader |
| 15 | IP protection | 5 | No capstone solution or internal rubric; keys sit in `modelAnswer` and quiz fields as on the other courses |
| 16 | Variant distinctiveness | 5 | Not applicable: the brief declares no variants |
| 17 | Continuity | 3 | Yara's calendar contradicts the plan the course teaches (S2-3), the learning share does not reconcile (S2-2), and six smaller slips (S3-8 to S3-10) |
| 18 | Learner agency and curiosity | 4 | Provided cases hide real mistakes (fake book, pushed password, hidden AI help); predicts invite a guess |
| 19 | Instructor alignment | not scored | G2B pending; no confirmation record |
| 20 | Interactive canvas quality | 4 | All 22 canvases agree with their chapters on numbers; no em or en dashes; limits stated. A few idioms in step notes (S3-14); no QA report seen |
| 21 | Explanatory depth | 5 | Audit passes with margin; mechanism, trade-off, worked example and failure mode in each Learn chapter |
| 22 | Visual explanation quality | 4 | One mermaid per chapter with a "what to notice" paragraph; a few mostly restate the paragraph before them (1.1, 1.4, 3.5) |

Average over the 21 scored dimensions: 90 / 21 = **4.29**, below the 4.3 threshold. Dimension 17 is at 3 and there are four S2 defects, so the gate does not open.

## Defects

### S1
None found. I looked for wrong, unsafe or leaking content: no real secret, no key, no answer key in learner prose, no unsafe command, no claim from the dossier's "Do not say" table (checked by search: no learning styles, 10 percent, 21 days, 10,000 hours, 19 percent, EEG preprint, "40 to 60 minutes", handwriting claim). Every item under "Unverified claims" is either absent or phrased as the dossier asks.

### S2

**S2-1. A date-stamped Docker claim that the dossier does not contain**
- location: `04-daily-labs/04.03-plan-a-lab-with-ai.md`, "Worked example: reading the plan that came back", paragraph "**Is each command current?**": "Checked on 2026-10-24, it calls `docker-compose`, with a hyphen, Compose v1: the old version, first released in 2014 ... the `version:` line ... is obsolete and only produces a warning." Repeated in `frontend/src/canvas/plan-a-lab-with-ai/data.ts`, step "Check each command in the docs" ("Docker's documentation (checked 2026-10-24) calls docker-compose, with a hyphen, the old Compose v1 from 2014") and in `04.07-checklist.md`, `modelAnswer`, "I checked docker compose up -d in Docker's docs; the plan had the old docker-compose form."
- observation: The dossier's Docker sources are S52 to S57 (licence, Windows requirements, `docker stop`, `docker compose stop`, restart policies, Play with Docker). None says anything about Compose v1, its release year, or the `version:` line. The chapters nevertheless claim a check on the dossier date. The commands themselves (`docker compose up -d`, `stop`, `start`) are correct for Compose v2.
- why it matters: The brief requires every claim about a named tool to be backed by the dossier with an access date. A "checked" stamp that no one recorded is the kind of claim that fails when a learner opens the page, and it is repeated in three places including a mentor key.
- required fix: Have the technical validator read the Docker pages, add them to the dossier with source IDs and the access date, and keep only what is verified. If it is not verified before publish, remove "Checked on 2026-10-24", "first released in 2014" and the `version:` sentence, and say only that old guides use `docker-compose` and the supported form is `docker compose` (as the course uses it).

**S2-2. Yara's learning share does not follow from her own numbers**
- location: `05-a-project-worth-six-months/05.02-why-strong-projects-take-months.md`, "Worked example: does six months fit?": "Suppose she spends 60% of them learning, as her plan does"; the predict prompt ("still spending 60% of the time learning"); the paragraph after the canvas ("with 60% of the time spent learning"). Also `06-share-the-work/06.05-capstone-your-project-start.md`, "Part 1: the six-month plan": "She gives learning about 60 percent of her time, about 115 hours"; `05.07-checklist.md`: "Learning is two thirds of the work on her areas"; and the `share` default of 60 in `frontend/src/canvas/six-month-hours-split/data.ts`.
- observation: Yara's plan is 96 learning hours and 48 building hours for the areas, out of 192. That is 50 percent of all hours, or 67 percent of area hours (the figure 5.7 uses). The text says 60 percent "as her plan does", which matches neither. In the capstone, 60 percent is 115 learning hours, which is 19 more than her areas need, and leaves 77 building hours against 48 needed; the same chapter says the other 48 hours pay for review, joining the parts, writing and bad weeks. The three statements do not reconcile.
- why it matters: This is the model that learners and mentors compare against, and the capstone rubric asks for "a learning share with a reason". A fellow who copies Yara's sum cannot reproduce 60 percent. The writer pack required every sum to be checked twice and the canvas to match the chapter.
- required fix: Pick one definition and use it in 5.2, the predict, the canvas default, 5.7 and 6.5. Either state Yara's share as 50 percent of all hours (and set the canvas default to 50), or say explicitly that she plans 60 percent because about 19 of the 48 spare hours are review, which is learning (96 + 19 = 115), and show that sum. Re-check the one-month example (19 learning hours, 2 areas) under the chosen share.

**S2-3. Yara's calendar breaks the rules her own plan teaches**
- location: `05.03-a-weekly-plan.md` (table: caching month 2, containers and tests month 3, click counts month 4; "Her week 7: caching, in month 2"); `06.05-capstone-your-project-start.md`, "Part 2" ("her week 7") and the Part 3 table (day 1 containers, day 5 "Count clicks for each link", day 8 "A first test for short codes", day 9 "Read one open-source link shortener", all in 17 days, with the week 7 write-up built from days 3 and 4); `04.01`, `04.03`, `04.04` (lab day 1 runs "three containers"); `01.05` ("each link has a click count", built in her first two weeks, with whole-number counts explained) against `05.04` ("Click counts are a month 4 area in her plan"); `03.03` canvas `five-angles-on-caching`, step "Angle 5: build it" ("In her lab she builds a tiny cache in the app's memory", actor "Her lab / qasir-labs") against `04.02` ("She has never seen this happen") and `04.01` (lab day 1 starts Qasir with a cache container, as if for the first time).
- observation: The plan says one new area at a time, learned before it is built, with containers in month 3 and click counts in month 4. The worked example then shows Yara running containers on lab day 1, counting clicks on day 5 and testing on day 8, inside the same fortnight as her week 7 caching area. 1.5 already has a working click counter; 5.4 treats click counting as a later design decision. 3.3 gives her a cache lab before the log that starts at lab day 1.
- why it matters: The capstone tells fellows what a passing log looks like. A mentor who applies the Part 3 rubric ("at most one new area a week") to Yara's own example would fail it. The inconsistency also weakens the explain-back message, since Yara builds areas the plan says she has not learned yet.
- required fix: Write Yara's calendar once (for example: she starts the plan before module 3, module 3 happens in her weeks 5 to 7, the lab log starts when she reaches caching) and align all sites to it. Either move the plan order to match the labs (containers early) or relabel the early labs as warm-up labs inside the current area. In 3.3 make the tiny cache part of the same lab history, and in 1.5 say the first slice counts clicks in the simplest way (a number in the database) so 5.4's question is about how to count later.

**S2-4. "AI shortens building a lot and learning only a little" is asserted as fact and sits inside the rubric keys**
- location: `05.02`, "Most of the time is learning": "Because AI speeds up the two jobs very differently ... So AI shortens building a lot and learning only a little", and the diagram nodes "Building: far fewer hours" and "Learning: a few fewer hours"; `05.07-checklist.md`, `ChapterRecap` point 1 ("because AI shortens building far more than learning"); `06.05`, Part 1 ("AI makes the building faster, but it does not make the learning much faster") and its `modelAnswer` ("AI speeds building more than learning").
- observation: The dossier contains no source for either half of this claim. Its section D says "Feeling faster is not being faster", reports the METR result with METR's own correction, and tells writers not to present a speed figure as a current fact about AI. The chapter itself turns to that point two sections later ("In one careful study, experienced developers felt faster with AI but were slower"), so it states a speed-up as fact and then warns against trusting a speed-up. The unit numbers (8 and 4 hours) are labelled as Yara's guesses; the cause given for them is not.
- why it matters: The claim carries the central argument for six months and is repeated in the recap and in mentor keys, so a fellow can lose marks for not repeating an unsupported statement. It also moves toward the hype the brief rules out.
- required fix: Present it as Yara's assumption ("she expects ... and her hours log will test it"), remove "because AI shortens building far more than learning" from the recap, and change the mentor keys to accept any reason that uses the learner's own estimates. Keep the METR-safe sentence as the reason to measure.

### S3

**S3-1. The rename is dated to the writing of the course**
- location: `02-your-ai-toolkit/02.01-set-the-scene.md`, "Why this matters for your career": "one well-known tool changed its name and its free limits during the few months this course was being written"; `03.01-set-the-scene.md`, same heading: "one of the tools in this module changed its name while this course was being written".
- observation: The dossier dates the rename to 16 July 2026 and the limit change to 2 September 2026; the research and drafting are dated 2026-10-24. The rename did not happen during the writing.
- why it matters: A learner who checks the date finds a small untruth in a course about checking claims. 2.4 gives the correct dates.
- required fix: Say "in 2026" or point to chapter 2.4, and keep the dates only there. Fix the same wording in the roadmap ("During research alone").

**S3-2. Feature claims that go beyond the dossier**
- location: `03.03-one-topic-five-angles.md`, "Five angles, five questions", second angle: "chat assistants such as Gemini, ChatGPT and Claude can draw a simple diagram"; `03.05-listen-then-read.md`, "What a source notebook adds, and what it does not": "It can make the audio in many languages, including Arabic", and "The web version has a download option for the audio"; `04.05` "If you only have a phone, GitHub's website lets you create or edit a file in the browser and commit it there".
- observation: The dossier supports diagrams for Claude (S29) and in Gemini Guided Learning replies (S16), nothing for ChatGPT. Hard constraint 4 says chapters must not promise an Arabic version of a feature; S10 lists Arabic as an output language but nothing confirms Arabic audio, and the roadmap lists it as open decision 5. U3 says the phone-browser download is untested, yet the worked example has Lina download on a phone (the fallback sentence is there). The GitHub web-editing statement has no dossier source.
- why it matters: These are the exact promises the sponsor's guard rails forbid.
- required fix: Say "ask any chat assistant for a diagram as text, or use the diagram it draws if it can" and keep the Claude-with-age sentence. For audio: "the output language list includes Arabic; set it and check what you get", and keep "try the download; if it fails, use the fallback". Add "at the time of writing" to the GitHub web-editing sentence or drop it.

**S3-3. Age rules are not stated where a tool is suggested**
- location: `01.01-set-the-scene.md`, Key words: "At the time of writing, Gemini, ChatGPT and Claude are examples" (Claude, no age); `03.05-listen-then-read.md`, "What a source notebook adds" and the worked example (Gemini Notebook suggested, no age line); `02.03-jobs-not-tools.md`, "Is it allowed at my age?" (lists Claude, ChatGPT, Gemini, GitHub, LinkedIn, not Gemini Notebook).
- observation: Dossier A1: Gemini Notebook is for people above the age of consent, with some features 18 or over; risk R6 and roadmap decision 6 are about under-18 fellows. Claude is named once without its age.
- why it matters: The course correctly gives ages everywhere else, so these gaps look like omissions rather than a design choice.
- required fix: Add "Claude is for people aged 18 or over" to the 1.1 key word, and add "Gemini Notebook is for people above the age of consent where they live, so check; the fallback is a chat assistant with your text pasted in" to 2.3 and 3.5.

**S3-4. "Deleting the chat does not remove any copy" is too broad, and one detail is invented**
- location: `02.02-before-you-paste.md`, "Where a paste can go": "Deleting the chat in your account does not reach back into the company's systems to remove every copy" and the diagram node "You cannot pull it back"; same section, "A large company with a legal team reached the same conclusion".
- observation: The dossier is tool-specific. Gemini says reviewed chats are kept up to three years and are not deleted when you delete your activity (S15); Claude says deleted chats leave back-end storage within 30 days (S28); ChatGPT Temporary Chats are kept up to 30 days (S21). The Samsung source (S108) says nothing about a legal team.
- why it matters: An absolute statement about every tool is a claim a learner can disprove in one settings page.
- required fix: "may not remove every copy; Google says, for example, that reviewed Gemini chats are kept even after you delete your activity." Delete "with a legal team".

**S3-5. General claims about fast building have no source**
- location: `01.01`, "Why this matters for your career": "AI coding tools have made it much faster, and many people can now produce a working demo in a weekend"; `01.05`, "Building fast is no longer rare": "A few years ago, a fellow who could build a working online store in a weekend had a rare skill. AI coding tools have changed that"; `05.01`, "Why this matters for your career": "An AI coding assistant can help almost anyone produce a working app in a weekend ... Hundreds of people can show one."
- observation: Real-world generalisations with no dossier source, and "Hundreds of people" reads as a figure. The dossier's only speed evidence is METR, with the warning in S2-4.
- why it matters: It is the sponsor's thesis, but the brief says chapters teach no invented statistics and no claim beyond the dossier.
- required fix: Tie each sentence to the course's case ("In this course's example, Khaled's store ran by Sunday") or label it as the sponsor's observation; remove "Hundreds".

**S3-6. "Your own line already meets most rules"**
- location: `06.03-say-when-ai-helped.md`, "The rules where you post", last paragraph.
- observation: The paragraph before says Medium requires a label and DEV offers three tags. A line in the text is not a label. "Most rules" is not in the dossier.
- why it matters: Hani's quiz (Tamer, Medium) tests the opposite: label and line are both needed.
- required fix: "Your own line is a good start, but Medium and DEV also ask you to use their label, so read each help page."

**S3-7. Invented names and outputs are written as checked facts**
- location: `04.03`, "Check before you install": "Yara searched the official package site for shortlink-cache-helper. Nothing by that name exists. The AI invented it."; `04.03` quiz 1 ("A package called print-queue has years of releases and a busy source repository"); `04.04`, "Watch it run first": "All the timings in this chapter are this lab's own example numbers, from one codespace on one evening", plus the log lines `GET /k7Qa 302 source=cache 4ms` and `POST /links 500`.
- observation: `shortlane` in 5.5 is correctly labelled "a made-up name", but these are not. A learner can search for `print-queue` and find a different real package, and "from one codespace on one evening" reads as a measured run. Qasir has no reference build, so the quality gates' rule that shown outputs come from a real run is not met.
- why it matters: A real package with the same name makes the "check" in the quiz contradict itself, and an invented measurement presented as real is a small version of the fabricated-citation problem the course teaches.
- required fix: Mark `shortlink-cache-helper`, `quick-print-queue-pro` and `print-queue` as made-up names; say the timings and log lines are "invented for this example"; ask the technical validator to run a minimal compose file and either record the real outputs or keep the "invented" label.

**S3-8. Lina's story contradicts itself between 3.2 and its canvas, and between 3.1 and 3.6**
- location: `03.02-the-fluency-trap.md`, "Lina closes the explanation": "She reads them once and rates herself 4 out of 5"; canvas `close-it-and-recall/data.ts`, edge "read 3 times" and step "It feels known" ("Each reading is faster than the last. By the third ..."). And `03.01`, "What Lina changes": "she keeps one notes page per topic, in her own words" against `03.06`, "Fourteen tidy pages": four weeks in, every page is a pasted AI summary.
- observation: Reads once versus three times; own-words pages versus fourteen pasted summaries in a chapter that sits after her change of method.
- why it matters: Both are number and fact mismatches between a chapter and its canvas or its module opening, which the continuity checklist names.
- required fix: Make 3.2 and the canvas agree (either "reads them three times" or one reading). In 3.1 say she starts to keep own-words pages; in 3.6 say she kept pasting summaries from habit for the first weeks.

**S3-9. Yara's log history differs between 4.2, 4.3 and 4.5**
- location: `04.02`, "Worked example: planning lab day 3" ("Yara tries lab day 2 again ... ends with a written entry"); `04.05`, "Notes nobody could read": "Day 2 had no note at all" and "from lab day 4 she wrote each one straight into her repository"; canvas `plan-a-lab-with-ai/data.ts`, last step: "The final plan goes into her qasir-labs repository as the start of her lab day 1 entry".
- observation: Day 2 has a written entry in 4.2 and none in 4.5; the log is phone notes until day 4 in 4.5, but a repository entry for day 1 in the 4.3 canvas; 4.5's commit list shows ".env to .gitignore" as a separate commit while the four commands commit it together.
- why it matters: It is the log the capstone later shows as ten repository entries from day 1.
- required fix: Choose one story (for example: days 1 to 3 on the phone, rewritten into the repository on day 4) and align 4.2, the 4.3 canvas step, 4.5 and the 6.5 table.

**S3-10. Two smaller cast slips**
- location: `01.03-you-make-the-call.md`, "Where it goes wrong": "A real check names the facts you tested against, as Dina's three checks did", while the prose earlier names only two checks (hall hours and coaches); the third, "the youngest team must finish by 17:00", exists only in canvas `who-makes-the-call`. And `02.03` quiz 1 and `02.05` quiz 3 (Yaman "only has his phone's browser") against the `02.06` `modelAnswer` ("Yaman, 16, a clinic desk volunteer with a phone and a laptop at the clinic").
- observation: Small cast facts that disagree between a chapter and its canvas, and between two chapters.
- why it matters: The continuity check names cast facts and chapter-to-canvas agreement; a reader looking for "three checks" finds two.
- required fix: Name the third check in 1.3's prose (or say "her checks"); give Yaman the same devices in all three places.

**S3-11. Terms defined twice**
- location: `02.01`: `BigWordAlert` "Free tier" and the Key words row "Free tier" (two wordings); `05.01`: `BigWordAlert` "Trade-off" and the Key words row "Trade-off"; `05.01` Key words "Explain-back rule" repeats the `GlossaryTerm` from 1.5.
- observation: The writer pack says never to define the same term twice.
- why it matters: Extra reading for second-language readers and a signal of template filling.
- required fix: Remove the Key words rows for "Free tier" and "Trade-off" and the repeated explain-back row (or keep only the row and drop the alert).

**S3-12. Settings and examples repeat across the course**
- location: print and copy shop: 21 lines in 11 chapters (1.2, 2.1, 2.2, 2.3, 2.5, 4.3, 5.2, 5.6, 6.1, 6.2, 6.3, with six different people); sports club and booking: Dina (1.3, 1.6), Mahmoud (2.2), Shahd (4.7, "two football pitches", booking app), Lama (5.4, 5.6), Salma (6.1, "two football pitches", booking API); "uncle's shop" in 2.6 (Hiba), 5.5 (Adam), 6.1 to 6.3 (Hani); "index slows down saving" in 2.4 (Ahmad), 3.3 quiz 1 (Odai) and 6.4 quiz 3 (Firas, in a review meant to be "fresh"); "a cafe with internet" as a stock phrase in 12 chapters; Bilal's online shop in four chapters of module 1 (1.2, 1.4, 1.5, 1.6); the sentence "AI assistants tend to agree with the user, even when the user is wrong" or a near copy 8 times (2.2 twice, 2.5 twice, 3.3 twice, 4.3, 5.4).
- observation: The writer pack asked for varied settings and a clinic desk, school, NGO office, sports club, print shop, marketplace, university course, bootcamp, small online shop to be spread out.
- why it matters: Shahd (4.7) and Salma (6.1) are nearly the same project. Repetition makes cases easier to guess and the module look templated.
- required fix: Move at least half of the print-shop and sports-club cases to the other listed settings, rename or reshape Shahd or Salma's project, replace the 6.4 index case with a new one, name the sycophancy idea once with a short definition and refer back to it.

**S3-13. The voice reads as a template**
- location: "What to notice: ... The takeaway: ..." closes the diagram paragraph in 29 and 28 places; "## Where it goes wrong" with "The first mistake ... The fourth mistake" appears in all 22 Learn chapters (17 have exactly four); the device "It is not X. It is Y." (for example 3.6 "That is why an AI summary is not your note. It is the AI's recall of the topic", 4.7 "The wrong half is not a weakness. It is the most useful line in her entry", 6.5 "It is not a test you finish and forget. It is ...") 17 times in a scripted search; gates repeat "The mentor then replies with one or two short questions. For example: ..." and "Compare it with a weak answer" in the same shape.
- observation: Each device is fine alone; used in every chapter they make the voice predictable and match the "AI-style triple" and template patterns in the anti-slop list.
- why it matters: The slop checklist lists "A voice that sounds like a template".
- required fix: Keep "what to notice" for the diagrams that need it and vary the rest; give some chapters two or three mistakes, or one worked failure instead of a list; cut at least half of the "not X, it is Y" sentences to a plain statement.

**S3-14. Idioms and figures of speech without a plain rewrite**
- location: "stand(s) out" in 1.1 ("makes you stand out"), 1.4 (Next line), 1.5 (summary, diagram node, recap), 3.1; "AI raised the floor for building. Understanding is what is left above it" (1.5, after the first diagram); "Khaled's store won only in a narrow corner" (1.5, after the canvas); "the first crack" and "to fall apart" (5.1 summary and text); "hidden in plain sight" (6.1 predict explanation); "with fresh eyes" (6.1); "the hard way" (6.3); "Problems ... catch him out" (canvas `answers-or-hints` step "Kinan's test, alone"); "They pay for things the area estimates leave out" (5.2); "keeps the thread" (4.2).
- observation: The standards list idioms such as "a result you cannot reproduce is a rumour" as past failures.
- why it matters: These phrases are hard for second-language readers and add nothing the plain version lacks.
- required fix: Rewrite each: "is easy to notice", "building became easier; understanding is still the hard part", "only in one narrow setting of the weights", "the first problem", "easy to miss", "with a stranger's eyes" or "as a stranger would", "by making the mistake", "causes problems", "cover things".

**S3-15. Sentences over 30 words**
- location (prose): `01.06` Module 1 checklist item 1 (32); `02.06` mentor reply paragraph (38); `05.01` line 7 (31) and the paragraph "What is still rare is a person who can open their own project and explain every part of it: ..." (39); `05.02` "A chat assistant can explain caching clearly, and you met the problem ..." (36) and "They pay for things the area estimates leave out: ..." (41); `05.05` "If your laptop is not strong enough, GitHub Codespaces gives you a computer in the browser; ..." (33); `05.07` "Her 12 areas need about 8 hours of learning ..." (33); `06.05` item 3 of the five parts (33); `06.06` checklist item 1 (31). Quiz and prompt text: `06.03` quiz 2 stem (56), `06.05` open-question prompt (48 and 32), `06.04` quiz 2 stem (42), `03.07` quiz 4 stem (42) and quiz 3 stem (39), `04.05` quiz 1 stem (35), `03.07` quiz 5 explanation (33).
- observation: The writer pack and standards say never over 30 words.
- why it matters: Second-language readers on phones; the long ones are the stems and prompts they must understand to answer.
- required fix: Split each at the colon or semicolon. For the "Four facts:" stems, put the facts in a short numbered list inside the question text.

**S3-16. Undefined jargon**
- location: "API" (used alone from 5.1 onward and never defined; only "API key" is, in 2.2), "endpoint" (6.2 quiz, 6.5), "pull request" (5.5), "virtualisation" (2.3 and 4.4: "a setting called virtualisation on Windows"), "framework" (2.3 onward), "rate limits" and "deploy" (5.1 list of 12 areas), "issues" on GitHub (5.5).
- observation: The brief says every term is defined on first use.
- why it matters: Fellows may not code yet; module 5 assumes only a little terminal use.
- required fix: Add a one-line `GlossaryTerm` at first use for each, or replace with a plain phrase ("a setting in your computer that lets it run virtual machines").

**S3-17. Unsupported superlatives**
- location: `04.03`, after the diagram: "The AI is one of four sources, and it is the fastest one"; `05.05`, opening: "Open source projects are one of the best free teachers a fellow has"; `02.01`, "Why this matters": "the record of what he got wrong, which is the most useful part of any study"; `03.06`: "The most important rule is simple".
- observation: Forbidden pattern "An unsupported superlative".
- why it matters: Small, but a rule of the standards.
- required fix: "the quickest of the four to produce a draft", "a good free teacher", "a useful part of any study", "An important rule".

**S3-18. Mixed line endings in the chapter files**
- location: CRLF in `02.02` to `02.05`, `03.01` to `03.08`, `04.01`, `04.03`, `04.06`, `04.07`; LF in the other 24 chapters and in `course.yaml`.
- observation: Half the files were written on a different line-ending setting.
- why it matters: Importers that split on `\n` or match ` ```quiz\n ` can mis-parse CRLF files. This did not stop `audit-course.mjs` but is a risk for `content:import` and for diffs.
- required fix: Normalise all chapter files to LF and re-run `content:validate:source` and `content:import`.

**S3-19. The planning rule is worded three ways**
- location: `05.03` ("The weekly rule in this course is one new area a week"), `05.07` checklist and recap ("one new area a week"), `06.06` toolkit ("one new area at a time"); decision log row of 2026-10-24 (read as "one new area at a time, step by step").
- observation: The labels are present and correct (sponsor's planning rule, not research), but 5.3 then plans a new area only every second week, so "one new area a week" is not what Yara does.
- why it matters: The brief asks for this rule to be labelled as the sponsor's. Calling it "a week" and then using alternate weeks invites the question "which is it?".
- required fix: Use "one new area at a time" everywhere, and say once that the sponsor's wish for a weekly new area becomes alternate weeks at 8 hours a week, with a note that a fellow with more hours can learn and build the same area in one week.

### S4 (listed, no separate fix needed now)
- `02.05` quiz 2 names "Word files" (a product outside the allowed list); use "document files".
- `06.05` worked example names the DEV label without "at the time of writing" (the label is dated in 6.2 and 6.3).
- `06.05` Ibrahim's book "by Martin Keller (2022)" uses a possibly real person's name; use an obviously invented name.
- `04.07` and `04.04` show a realistic password string `Pitch2026club`; use `example-password` so secret scanners do not flag the repository.
- `01.02`: the EBU and BBC sentence adds "including out-of-date information" to the "nearly half had a significant problem" figure; the dossier attaches outdated information to the 20 percent with major accuracy problems.
- `02.03`: "For Microsoft Copilot and Perplexity, their pages did not say either way"; for Perplexity the dossier found no country page at all.
- `05.05`: "People also keep lists of good projects on a topic" has no dossier source (harmless).

## What works

- **Accuracy against the dossier is strong.** Every study (Bastani, Kestin, the Nigeria trial, Tutor CoPilot, Lee, the fluent-lecturer and Harvard studies, retrieval, spacing, interleaving, generation effect, note-taking and its replication, listening versus reading, the 2013 GitHub interview study, package hallucination, insecure code, fabricated citations, METR, disclosure standards) is stated with the dossier's wording and its limits. "Hype" and "fear" readings are both refuted in 1.4. The "five angles" and the reading order are labelled as the course's own, "six months" as the sponsor's rule, and the rule of thumb for spacing as not a law.
- **Tool handling follows the sponsor's guard rails.** Only allowed tools; Gemini Notebook always with its former name at first mention; "at the time of writing" or a date on feature statements; two tools per job; a browser path and a fallback at nearly every step; no audio length in minutes; ChatGPT's setting is the only one named; no ranking (the "kinds of tool" canvas is clearly labelled illustrative).
- **Numbers are checked.** All three factor canvases give the totals the prose quotes, and the "wins at exactly one setting" claim in 5.4 is true (verified over 81 settings). The hours, subnet, percentage and lab-minute figures all add up. The six-month hours canvas matches 5.2 exactly at 1 month, 6 months at 20 percent and at 80 percent.
- **Technical content is sound where it counts.** The Compose v2 commands, service names (`app`, `cache`, `db`), `restart: unless-stopped` behaviour, `.gitignore` limits, the "deleting the file is not enough" explanation, the cache-then-database behaviour, parameterised queries, longest-prefix routing, and the salt and hash explanation are correct.
- **Safety teaching is concrete.** The stranger test, made-up rows, a placeholder for a key, rotating a pushed key, a pre-push check and keeping clients' details out of posts are each shown on a case, and the wrong options are mistakes a learner would really make.
- **No fabricated studies, no invented statistics beyond the S3-5 sentences, no hardship prompts, no politics or war, and every personal task offers a provided case.**
- **Provided cases hide real mistakes** (a fake book, a pushed password, hidden AI help, three new areas in a week) so the capstone cannot be done by copying.
- **Quiz hygiene.** Balanced option lengths, spread positions, explanations that name the missed fact; the "check the AI's output" items test habits (run it, open the link, read the docs, find a listing) and not menus.

## Recommendation

**Revise.** The course is close: accuracy to the dossier, tool guard rails, safety teaching and depth are strong, and no S1 was found. It does not pass G5 as it stands: the average is 4.29 (below 4.3), continuity is at 3, and four S2 defects (an unrecorded Docker check, a learning share that does not reconcile, Yara's calendar, and an unsupported causal claim in the rubric keys) block the gate. Dimension 19 also remains unscored until two instructors sign `roadmap-confirmation.md`.

Suggested order of work: S2-3 (calendar, touches 1.5, 3.3, 4.x, 5.x, 6.5), then S2-2 and S2-4 together in 5.2, 5.7 and 6.5, then S2-1 with the technical validator, then the S3 items by file. Re-review the changed sections only, plus the canvases and quiz items they touch, after one round.
