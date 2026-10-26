## Scorecard

| # | Dimension | Score | Evidence |
|---|---|:---:|---|
| 1 | Outcome alignment | 4 | Modules 4 and 5 directly build toward O4 (project plan) and O5 (deployable showcase and case study). |
| 2 | Domain specificity | 4 | Context is grounded in Gaza fellows' constraints (phone-first, power cuts, free tier hosting limits). |
| 3 | Depth over coverage | 4 | Chooses one user, one core flow, and one metric over broad portfolio apps. |
| 4 | Prose quality | 4 | Writing uses short, plain sentences, clear transitions, and avoids AI clichés or forbidden punctuation. |
| 5 | Chapter structure | 4 | Consistently follows the beat sequence: heading, visual, visible text under 70 words, and deep folds. |
| 6 | Interaction purpose | 3 | Canvas `career-m4-project-page` is a form-filling chip exercise; `career-m5-stranger-path` counts taps rather than latency. |
| 7 | Assessment quality | 2 | S2 defect in 05.01 names the wrong character and context; 04.04 predict quizzes the preceding sentence; 04.02 predict leaks study numbers. |
| 8 | Difficulty calibration | 4 | Scope cuts and timeboxing provide desirable challenge without confusing junior developers. |
| 9 | Cognitive load | 4 | Limits each beat to a single mechanism or trade-off; separates planning from building. |
| 10 | Prerequisite integrity | 4 | Builds directly on the claim card concepts introduced in Module 3 before planning project metrics. |
| 11 | Technical accuracy | 3 | In 04.07, `minWords: 90` on a URL/audio submission breaks platform delivery; 05.04 contains an arithmetic sum error. |
| 12 | Production-grade coverage | 4 | Thoroughly addresses containerization, OAuth consent scopes, demo sandboxing, and nightly database resets. |
| 13 | Security and integrity | 2 | 04.07 leaks internal mentor grading rules in `modelAnswer`; 04.05 advises pasting plans into AI before sanitization warnings. |
| 14 | Accessibility | 4 | Preserves responsive narrow viewBoxes, phone readability, and provides audio/written alternative paths. |
| 15 | IP protection | 4 | Exposes evaluation frameworks while withholding completed project implementations. |
| 16 | Variant distinctiveness | 4 | Course baseline handles engineering cleanly; variant specializations are tracked in the roadmap for future cohorts. |
| 17 | Continuity | 3 | 05.01 mistakenly references Sireen and an interviewer from Module 4 instead of Moath; 04.05 claims an 8-part template follows 5 steps. |
| 18 | Learner agency and curiosity | 4 | Fellows choose between their own problem, an open-source contribution, or Areej's repair path. |
| 19 | Instructor alignment | 3 | Roadmap status remains draft/G2B pending; canvas in 04.03 implements 8 ideas and 3 bins against the roadmap's 5 ideas. |
| 20 | Interactive canvas quality | 3 | `career-m5-stranger-path` models taps instead of server wake latency; `career-m4-project-page` acts as a form. |
| 21 | Explanatory depth | 4 | GoDeeper folds provide empirical study limits, citations, OWASP security mechanics, and trade-offs. |
| 22 | Visual explanation quality | 3 | Beat 2 in 04.01 uses a canvas to show an interview dialogue rather than a technical system or state model. |

**Scorecard Average: 3.59 / 5.00** *(Fails quality threshold: requires minimum 4 on every dimension, average at least  4.3, and zero S1/S2 defects).*

---

## Defects

### S1 : Blocker

- `courses/career-brand/04-a-strong-project-in-the-ai-era/04.07-checklist.md` | `urlHint: "An audio link your mentor can open without signing in. Audio only is fine."` | The block specifies `minWords: 90` while allowing URL-based voice note submissions. Under the platform specification in `rules.md`, link-only submissions require `minWords: 0`; any higher value keeps a URL-only submission in draft mode, preventing it from ever reaching the mentor. | Change `minWords: 90` to `minWords: 0` when `allowUrl: true` is configured for audio submission, or enforce separate input blocks for written text and audio links.
- `courses/career-brand/04-a-strong-project-in-the-ai-era/04.07-checklist.md` | `"Do not accept these. 'Small businesses' as the first user. A baseline with no source. A promised result written as a fact before launch"` | Internal grading instructions, rejection criteria, and mentor flags (`unsupported number`, `vague ownership`) are embedded directly into `modelAnswer`, which is accessible to learners as a reference answer, violating the rule that internal rubrics are server-side only. | Move all grading rules, rejection conditions, and mentor flagging instructions into the server-side rubric configuration, leaving only the clean exemplar response in `modelAnswer`.

---

### S2 : Major

- `courses/career-brand/05-show-your-work-so-people-look/05.01-set-the-scene.md` | `"What would have made Sireen's project more convincing to the interviewer than more features?"` | The chapter scenario is about Moath (a frontend developer) showing a demo link to a founder who bounces off a sleeping server, but the predict prompt copy-pastes Sireen (from Module 4) and an interviewer. This breaks assessment alignment and narrative continuity. | Change the prompt to: `"What would have made Moath's demo more convincing to the founder than a complex setup?"`.
- `courses/career-brand/04-a-strong-project-in-the-ai-era/04.04-plan-it-with-a-time-box.md` | `"The core flow goes in. Supplier orders do not fit, so they are cut for later."` | The paragraph directly preceding the predict interaction explicitly reveals the answer. Asking which feature is cut immediately after stating that supplier orders are cut tests short-term recall of the preceding sentence rather than application. | Move the predict interaction before Beat 1, or present a novel scenario where learners evaluate which of two candidate features belongs outside the core journey.
- `courses/career-brand/04-a-strong-project-in-the-ai-era/04.07-checklist.md` | `"Her material gives no hours per feature, so for her case accept the one core flow inside about 30 hours with the three cuts."` | The prompt and rubric require learners to calculate feature hours against their timebox, but the provided fellow (Areej) gives no feature hour estimates. Fellows using the provided repair path cannot fulfill the required submission criteria. | Add explicit estimated hours for Areej's core flow (e.g., 18 hours for sale recording and alerts) in 04.05 so her plan fully demonstrates the required calculation.
- `courses/career-brand/04-a-strong-project-in-the-ai-era/04.01-set-the-scene.md` | `prompt: "What would have made Sireen's project more convincing to the interviewer than more features?"` | Placing a predict block at the end of a Read (set-the-scene) chapter violates "Never ask before you teach" by testing module conclusions before teaching the concepts, and breaches the beat contract where predict precedes the surprise beat in Learn chapters. | Remove the predict block from 04.01 and replace it with an informal reflection prompt ("What do you notice?"), placing the prediction in 04.02 before the project page beat.
- `courses/career-brand/04-a-strong-project-in-the-ai-era/04.02-when-building-is-fast.md` | `"Tap a chip, then the field it fills. Six chips are evidence a reader can ask about."` | The roadmap specifies a playable beat where learners "Toggle evidence on a project page; see which reader questions you can still answer". The implementation is a form-filling chip exercise, which violates the standard that pictures should act as systems rather than forms. | Update the canvas interaction so learners toggle evidence elements on and off to observe the live impact on an interviewer's question list.
- `courses/career-brand/05-show-your-work-so-people-look/05.02-nobody-will-run-your-code.md` | `"The picture counts taps, not seconds. We have no reliable number for how long a founder will wait, and the costs in the picture are made up."` | The primary technical friction taught in 05.01 and 05.02 is a 60-second idle spin-down delay on free web services. Modeling this friction purely as user "taps" contradicts the technical mechanism, where the user does not tap but waits through latency. | Rebalance the canvas patience meter to account for both wall-clock latency (seconds waited during cold boot) and interaction friction (clicks/form fields).
- `courses/career-brand/04-a-strong-project-in-the-ai-era/04.05-plan-your-project.md` | `"Paste your plan and ask it to challenge you. Here is a prompt you can copy."` | Learners are instructed to paste their full project plans into commercial AI tools before reaching the privacy warning. Because project plans contain details about local businesses and real contacts in Gaza, this sequencing creates data leakage risks. | Move the sanitization instructions (anonymizing names, removing local business identifiers, omitting private metrics) before the prompt copy block.
- `courses/career-brand/04-a-strong-project-in-the-ai-era/04.02-when-building-is-fast.md` | `"Engineers learned a new library, some with AI help. How did the AI group score on a quiz right after?"` | The correct option label (`"Lower: about 50 percent against 67 percent"`) contains the exact empirical percentages from the study before the beat reveals them. This allows learners to identify the correct answer through test-wiseness rather than conceptual prediction. | Rephrase the options qualitatively (e.g., `"Lower, scoring worse on debugging questions"` vs `"Higher, assisted by faster library lookup"`).

---

### S3 : Minor

- `courses/career-brand/04-a-strong-project-in-the-ai-era/04.03-the-idea-filter.md` | `"Eight ideas, three bins. For each card, ask which question the idea fails first, or whether it passes all four."` | The roadmap explicitly specifies running 5 ideas through the filter (ride app, community cloud, URL shortener deep dive, clone, open-source fix). Expanding the canvas to 8 ideas and 3 bins alters the planned cognitive scope without roadmap confirmation. | Align the canvas data model with the 5 ideas confirmed in the curriculum roadmap, or log an approved roadmap amendment.
- `courses/career-brand/04-a-strong-project-in-the-ai-era/04.05-plan-your-project.md` | `"It follows the five steps in chapter 4.3. Part 6 is your number: a merged change is a result a reader can see."` | The template contains 8 numbered parts, but the text states that it follows the "five steps in chapter 4.3". This confuses learners mapping their draft to the 5 contribution steps from 4.3. | Clarify that items 1 to 5 align with the contribution workflow in 4.3, while items 6 to 8 adapt project measurement, appetite, and AI logging to open source.
- `courses/career-brand/05-show-your-work-so-people-look/05.03-let-them-in-with-one-click.md` | `"Use the shop owner's real admin login, so reviewers see real bookings and real customers"` | Distractors 0 and 3 suggest publishing real administrative credentials and personal private data in a public open-source README. These options are implausibly reckless, reducing the diagnostic value of the quiz. | Replace extreme distractors with realistic near-misses, such as a shared demo account with administrative write privileges on persistent storage.
- `courses/career-brand/05-show-your-work-so-people-look/05.04-a-short-demo-of-the-core.md` | `"The sum is 15 plus 20 plus 25 plus 15"` | The calculation omits the 15-second invoice export frame mentioned earlier in the paragraph (15 + 20 + 15), resulting in a sum of four numbers equaling 75 rather than the stated 90-second total. | Correct the formula to include all five storyboard segments: `"The sum is 15 plus 20 plus 15 plus 25 plus 15 = 90 seconds"`.
- `courses/career-brand/04-a-strong-project-in-the-ai-era/04.04-plan-it-with-a-time-box.md` | `"The core flow is a guess of 10 hours, an alert is 12 and an export is 15."` | In 04.04, the low-stock alert is framed as an optional add-on feature outside the core flow. In 04.05 and 04.07, the alert/warning is defined as step 3 of the non-negotiable core flow itself. | Adjust the 04.04 budgeting example so the core flow encompasses the alert, using secondary features (like CSV export or multi-shop support) as the modular add-ons.
- `courses/career-brand/04-a-strong-project-in-the-ai-era/04.03-the-idea-filter.md` | `"He has about three hours this week. Which plan is a safe way to start?"` | The prompt establishes a specific time constraint ("about three hours this week"), but the distractors fail on general open-source etiquette rather than time management. | Introduce a distractor that directly tests time scoping, such as attempting a multi-file architecture refactor within a three-hour window.
- `courses/career-brand/04-a-strong-project-in-the-ai-era/04.06-quiz.md` | `"The tool replies: 'Yes. AI makes developers 55 percent faster, so a week is enough.' What is wrong with this answer?"` | The prompt isolates an AI speedup claim, but the correct answer bundles both study limitations and two-sided market failure, creating an unfocused assessment item. | Separate the assessment of AI productivity claims from two-sided marketplace viability.
- `courses/career-brand/05-show-your-work-so-people-look/05.02-nobody-will-run-your-code.md` | `"never build a real key into the box (chapter 5.3 explains why)."` | Chapter 5.2 promises that 5.3 will explain why and how not to build keys into container boxes, but 5.3 focuses exclusively on Git commits and `.env.example`, omitting container secret injection mechanics. | Add a brief note in 5.3 explaining runtime container environment variable injection (`-e` flags or cloud service environment settings).
- `courses/career-brand/04-a-strong-project-in-the-ai-era/04.01-set-the-scene.md` | `"She opens the code and scrolls. An AI tool wrote it, and she cannot explain it."` | The canvas in Beat 2 depicts a conversational interview exchange rather than modeling technical flow, system boundaries, or state transitions, functioning as decorative art. | Reconfigure the canvas to model the divergence between code syntax execution and the developer's underlying mental model.

---

### S4 : Polish

- `courses/career-brand/05-show-your-work-so-people-look/05.02-nobody-will-run-your-code.md` | `"The hosting limits come from each provider's own plan page (Render, GitHub Pages, Vercel, Cloudflare Pages and Netlify)"` | Free tier hosting services are kept anonymous as "one host" in the beat prose, but are explicitly named in the sources fold, creating inconsistent naming conventions. | Name the hosting providers directly in the prose alongside their "checked 2026-10" verification dates.

---

## What Works

- **Grounded Technical Realism:** The lessons candidly address the operational limitations of free-tier infrastructure (cold-start spin downs, database expiration, OAuth verification scopes) and teach fellows how to design showcases that remain resilient when live demos sleep.
- **Evidence-First Project Scoping:** The four-question idea filter and the appetite-based timebox enforce rigorous engineering hygiene, steering learners away from superficial clones and unviable two-sided marketplaces toward measurable, single-player utilities.
- **Honest AI Integration Standards:** The five-column AI-use log and the critical treatment of developer productivity research teach learners to take personal ownership of their code, emphasizing debugging competence and verified testing over automated output volume.

---

## Recommendation

**Revise.** The curriculum possesses exceptional pedagogical framing, realistic constraints, and strong domain relevance for fellows seeking remote work. However, publication is blocked by two S1 defects (`minWords: 90` breaking audio submissions and mentor grading criteria leaked in `modelAnswer`) and eight S2 defects (notably persona misalignment in 05.01, premature assessment in 04.01, and missing hour estimates in the provided fellow's plan). These must be resolved before proceeding through the quality gate.
