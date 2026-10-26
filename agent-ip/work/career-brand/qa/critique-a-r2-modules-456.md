# Critic A : Round 2 Review

## 1. Status of Round 1 Defects

*Note: Per instructions, rejected items ("minWords above 0 traps voice notes", "the mentor key in modelAnswer is visible to learners", "the 4.2 slot card is a form", "the access test is shifted to fellows", and "02.04 is cut off") require no status and are omitted.*

### Major Defects (S2)

1. **Persona mismatch in 05.01 predict interaction**
   - **Status:** FIXED
   - **File:** `courses/career-brand/05-show-your-work-so-people-look/05.01-set-the-scene.md`
   - **Verbatim Evidence:** `prompt: "Look at both pictures. What do you notice about what the founder met?"`

2. **Predict interaction in 04.04 spoils the answer before Beat 1**
   - **Status:** FIXED
   - **File:** `courses/career-brand/04-a-strong-project-in-the-ai-era/04.04-plan-it-with-a-time-box.md`
   - **Verbatim Evidence:** `prompt: "Areej has 6 weeks at 5 hours a week, and time runs short. Which feature is cut first?"`

3. **Missing hour calculation for Areej's plan in 04.07**
   - **Status:** FIXED
   - **File:** `courses/career-brand/04-a-strong-project-in-the-ai-era/04.07-checklist.md`
   - **Verbatim Evidence:** `"Her in-scope guesses are 18 hours for the core flow, with the low-stock warning inside it, and 5 hours for tests, a README and demo data. That is 23 hours inside about 30."`

4. **Premature predict block in 04.01 violating "Never ask before you teach"**
   - **Status:** FIXED
   - **File:** `courses/career-brand/04-a-strong-project-in-the-ai-era/04.01-set-the-scene.md`
   - **Verbatim Evidence:** `prompt: "Sireen's app runs, and the interviewer asks one question about it. What do you notice about her answer?"`

5. **Stranger path canvas models taps instead of latency in 05.02**
   - **Status:** OPEN
   - **File:** `courses/career-brand/05-show-your-work-so-people-look/05.02-nobody-will-run-your-code.md`
   - **Verbatim Evidence:** `"The picture counts taps, not seconds. We have no reliable number for how long a founder will wait, and the costs in the picture are made up."`

6. **Pasting plan into AI before privacy/sanitization warning in 04.05**
   - **Status:** FIXED
   - **File:** `courses/career-brand/04-a-strong-project-in-the-ai-era/04.05-plan-your-project.md`
   - **Verbatim Evidence:** `"Before you paste anything, remove names, the names of local businesses and any private numbers. Use roles such as \"a print shop owner\", and paste only numbers that the person agreed you may share."`

7. **Predict option in 04.02 leaks empirical percentages before beat reveals them**
   - **Status:** FIXED
   - **File:** `courses/career-brand/04-a-strong-project-in-the-ai-era/04.02-when-building-is-fast.md`
   - **Verbatim Evidence:** `label: "Lower, most clearly on debugging questions"` (paired with `label: "Higher, because the help let them learn faster"`)

---

### Minor Defects (S3) & Polish (S4)

8. **Canvas implements 8 ideas and 3 bins vs roadmap's 5 ideas in 04.03**
   - **Status:** OPEN
   - **File:** `courses/career-brand/04-a-strong-project-in-the-ai-era/04.03-the-idea-filter.md`
   - **Verbatim Evidence:** `"Eight ideas, three bins. For each card, ask which question the idea fails first, or whether it passes all four."`

9. **Open source template 8 parts vs 5 steps confusion in 04.05**
   - **Status:** FIXED
   - **File:** `courses/career-brand/04-a-strong-project-in-the-ai-era/04.05-plan-your-project.md`
   - **Verbatim Evidence:** `"Parts 1 to 5 follow the five steps in chapter 4.3. Parts 6 to 8 add the number, the time box and the AI-use log."`

10. **Implausibly reckless quiz distractors (real admin credentials) in 05.03**
    - **Status:** FIXED
    - **File:** `courses/career-brand/05-show-your-work-so-people-look/05.03-let-them-in-with-one-click.md`
    - **Verbatim Evidence:** `"Try the demo with the shared login below. It is a sample shop with fake data and low rights, and it resets every night"`

11. **Arithmetic sum error in demo storyboard in 05.04**
    - **Status:** FIXED
    - **File:** `courses/career-brand/05-show-your-work-so-people-look/05.04-a-short-demo-of-the-core.md`
    - **Verbatim Evidence:** `"The sum is 15 + 20 + 25 + 15 + 15 = 90 seconds. The picture shows only the three core frames, which cost 15, 20 and 15 seconds."`

12. **Low-stock alert framed as optional add-on vs core flow in 04.04**
    - **Status:** FIXED
    - **File:** `courses/career-brand/04-a-strong-project-in-the-ai-era/04.04-plan-it-with-a-time-box.md`
    - **Verbatim Evidence:** `"The core flow, with its low-stock alert inside it, is a guess of 18 hours. A CSV export is 7 and a second shop is 14."`

13. **Time constraint in 04.03 quiz prompt not tested by distractors**
    - **Status:** FIXED
    - **File:** `courses/career-brand/04-a-strong-project-in-the-ai-era/04.03-the-idea-filter.md`
    - **Verbatim Evidence:** `"Start a rewrite of the part he finds hard to follow, which would take weeks, and send it as one large pull request when it is done"`

14. **Quiz question in 04.06 bundles AI speedup claim with two-sided marketplace failure**
    - **Status:** FIXED
    - **File:** `courses/career-brand/04-a-strong-project-in-the-ai-era/04.06-quiz.md`
    - **Verbatim Evidence:** `"That figure came from one small task in one study, and other studies found different results, so it cannot promise a week"`

15. **Promise that 5.3 explains secret injection into containers is unfulfilled**
    - **Status:** OPEN
    - **File:** `courses/career-brand/05-show-your-work-so-people-look/05.02-nobody-will-run-your-code.md`
    - **Verbatim Evidence:** `"And it does not put your secrets in a safe place, so never build a real key into the box (chapter 5.3 explains why)."`

16. **Beat 2 canvas in 04.01 depicts interview dialogue rather than a technical system**
    - **Status:** OPEN
    - **File:** `courses/career-brand/04-a-strong-project-in-the-ai-era/04.01-set-the-scene.md`
    - **Verbatim Evidence:** `"Weeks later, Sireen shows the app in an interview. The interviewer asks, \"How does the matching work?\" She opens the code and scrolls."`

17. **Hosting providers kept anonymous in prose but named in sources in 05.02**
    - **Status:** OPEN
    - **File:** `courses/career-brand/05-show-your-work-so-people-look/05.02-nobody-will-run-your-code.md`
    - **Verbatim Evidence:** `"The hosting limits come from each provider's own plan page (Render, GitHub Pages, Vercel, Cloudflare Pages and Netlify), all checked 2026-10 and likely to change."`

---

## 2. New Defects

### Defect 1 (S2 : Major): Gate task in 04.07 locks out fellows pursuing the Open Source contribution track
- **Location:** `courses/career-brand/04-a-strong-project-in-the-ai-era/04.07-checklist.md`
- **Verbatim Quote:** `"every part is at least Partly, and \"Filter applied\" and \"First real user\" are Met."`
- **Observation:** Chapters 4.3 and 4.5 explicitly establish an open-source track as an equivalent route ("The third route is a plan for a first open source contribution instead of a project. It is optional..."), providing a distinct 8-part template with no end-user, no baseline metric, and no core flow. However, the gate task in 04.07 requires applying the four filter questions, naming a first real user, providing a baseline metric, and calculating core flow hours, with the pass rule strictly mandating that "First real user" and "Filter applied" be "Met".
- **Why It Matters:** A fellow following the curriculum's endorsed open-source track cannot pass the module gate without fabricating a user and project metrics.
- **Required Fix:** Provide an explicit open-source rubric variant and acceptance criteria in 04.07 (e.g. evaluating issue selection, contributing guide compliance, and maintainer interaction plan).

---

### Defect 2 (S2 : Major): Predict option label in 04.04 gives away the correct answer via self-justifying phrasing
- **Location:** `courses/career-brand/04-a-strong-project-in-the-ai-era/04.04-plan-it-with-a-time-box.md`
- **Verbatim Quote:** `label: "Supplier ordering, which the core flow does not need"`
- **Observation:** The predict interaction asks which feature is cut first when time runs short. Option `supplier` is phrased as `"Supplier ordering, which the core flow does not need"`, while distractor `warning` is phrased as `"The low-stock warning, since it is the last step of the flow"`. Stating in the correct option's label that the core flow does not need it gives away the answer through test-wiseness.
- **Why It Matters:** Learners pick the correct option simply because it states it is unneeded, bypassing the pedagogical challenge.
- **Required Fix:** Neutralize the option labels to name the features objectively without embedding the justification (e.g., `"Supplier ordering"` vs `"Low-stock warning"`).

---

### Defect 3 (S2 : Major): Inconsistent classification of invoice export as core flow vs out-of-scope add-on
- **Location:** `courses/career-brand/04-a-strong-project-in-the-ai-era/04.05-plan-your-project.md`
- **Verbatim Quote:** `"She guesses 12 hours for recording stock and sales and keeping the invoice export. The low-stock warning sits inside the flow, and she guesses 6 hours for it."`
- **Observation:** In 04.04, the core flow is strictly defined as three steps: `"record a sale, stock goes down, a warning appears"`, and CSV export is treated as an optional add-on feature outside the core flow (estimated at 7 hours). In 04.05 and 04.07, Areej's worked example suddenly incorporates `"keeping the invoice export"` into the 12-hour sale recording component of the core flow itself.
- **Why It Matters:** Blurring the boundary between the non-negotiable core flow and modular secondary features contradicts the core teaching of Chapter 4.4, confusing fellows on what belongs inside a strict single-flow timebox.
- **Required Fix:** Consistently maintain invoice/CSV export as an out-of-scope secondary feature across all chapters, keeping the core flow strictly limited to sale recording, inventory deduction, and low-stock alerting.

---

### Defect 4 (S3 : Minor): Exemplar answers in 04.07 omit tests and README hours from in-scope budget calculation
- **Location:** `courses/career-brand/04-a-strong-project-in-the-ai-era/04.07-checklist.md`
- **Verbatim Quote:** `"I guess 10 hours for the loan record and 6 for the overdue list, which is 16 hours. Out of scope: reader accounts, text reminders, a mobile app."`
- **Observation:** In 04.05, the plan template explicitly mandates budgeting non-feature engineering overhead in Part 5: `"Hours guessed: the flow __, tests and README __, total __"`. In 04.07, however, the model answer for Khalid calculates only feature steps (10h + 6h = 16h), omitting tests and documentation. Similarly, Mayar's model answer calculates only 12h + 6h = 18h.
- **Why It Matters:** Fellows are taught in 04.05 that production-grade planning requires budgeting tests and README into the timebox, but 04.07 exemplar answers model skipping these essential overhead allocations.
- **Required Fix:** Update Khalid's and Mayar's exemplar budgets in 04.07 to explicitly allocate hours for tests, README, and demo data (e.g., 10h flow + 6h list + 3h tests/README = 19h).

---

### Defect 5 (S3 : Minor): Beat 5 visual in 04.02 does not illustrate the five log line components taught in the prose
- **Location:** `courses/career-brand/04-a-strong-project-in-the-ai-era/04.02-when-building-is-fast.md`
- **Verbatim Quote:** `"A log line has five parts, in a fixed order: the date, what I asked, what I used, what I checked, and one thing it got wrong."`
- **Observation:** Beat 5's visual is a high-level binary flowchart showing whether to check AI code or paste it. The visible text underneath introduces the five specific columns of an AI-use log line in a fixed order and gives Areej's transaction update example. Under the beat standards, visible text must not introduce new concepts that the visual does not show.
- **Why It Matters:** Learners see a generic branching decision diagram while the prose immediately lectures on tabular column schemas not present in the artwork.
- **Required Fix:** Replace the generic decision flowchart with a diagram or structured card visual displaying the five columns of the AI log schema.

---

### Defect 6 (S3 : Minor): Beat 2 text in 05.05 states "Six sections" while GoDeeper and template define seven parts
- **Location:** `courses/career-brand/05-show-your-work-so-people-look/05.05-the-case-study.md`
- **Verbatim Quote:** `"A case study is built from ledger rows. Tap a snippet, then the section it fills, or drag it. Six sections take six snippets."`
- **Observation:** Beat 2 visible text asserts that the case study contains `"Six sections"`. However, the GoDeeper immediately below is titled `"<GoDeeper title=\"The seven parts, in order\">"` and details seven distinct sections (Problem, Numbers before, What I/team did, Numbers after, What else changed, What to do differently, Where to see it). Furthermore, the template in 05.06 lists all seven sections.
- **Why It Matters:** Fellows are presented with contradictory structural counts within the same page, causing confusion when drafting their own case study outlines.
- **Required Fix:** Reconcile the canvas text and data in 05.05 to reflect the seven standard case study sections.

---

### Defect 7 (S3 : Minor): Beat 2 in 05.04 claims "Only the order changed" when filler frames are actually eliminated
- **Location:** `courses/career-brand/05-show-your-work-so-people-look/05.04-a-short-demo-of-the-core.md`
- **Verbatim Quote:** `"Move the warning, the sale and the invoice up, and all three fit. No frame got shorter. Only the order changed."`
- **Observation:** Beat 2 states that moving the core frames up makes everything fit without shortening any frames because `"Only the order changed"`. In reality, the filler frames (logo, sign-up, settings tour) totaling 55 seconds must be completely cut to fit the 90-second budget alongside the 50 seconds of core frames, as confirmed in the GoDeeper ("The logo intro is gone. The sign-up is gone... The settings tour is gone").
- **Why It Matters:** Claiming that changing the order alone resolved the time conflict teaches a magical view of time management rather than ruthless feature cutting.
- **Required Fix:** Reword the visible beat text to state clearly that moving core frames up pushes filler frames past the 90-second cut line, forcing them out of the storyboard.

---

### Defect 8 (S3 : Minor): Predict interaction before Beat 3 in 05.05 tests recall of facts stated in the preceding two beats
- **Location:** `courses/career-brand/05-show-your-work-so-people-look/05.05-the-case-study.md`
- **Verbatim Quote:** `prompt: "Areej's lead reviewed and released her change. How should her case study treat that?"`
- **Observation:** Beat 1 GoDeeper explicitly explains that the case study includes what she did and what the team did. Beat 2 visible text and GoDeeper emphasize splitting what she did from what the team did and rejecting blurred "we" statements. Placing a predict question immediately before Beat 3 asking whether to leave the lead out or split the work tests short-term recall of already-disclosed material rather than eliciting a genuine prediction.
- **Why It Matters:** Breaches the authoring rule against quizzes testing paragraphs directly above and degrades the predictive engagement contract into trivial recall.
- **Required Fix:** Position the predict question earlier in the chapter before the team split is explained, or test an applied trade-off scenario (such as how to document when a senior engineer overrules an index choice).

---

## 3. Scorecard

| # | Dimension | Score | Evidence |
|---|---|:---:|---|
| 1 | Outcome alignment | 4 | Projects and showcases strictly drive toward O4 (project plan) and O5 (deployable showcase); 04.07 gate open-source gap prevents a 5. |
| 2 | Domain specificity | 5 | Exemplary grounding in Gaza fellows' technical realities (phone notes, weak data, power cuts, free-tier spin-downs). |
| 3 | Depth over coverage | 4 | Deeply explores a single user, single flow, and single measured metric rather than generic multi-page portfolios. |
| 4 | Prose quality | 4 | Plain, direct English tailored for ESL learners; short sentences, active verbs, and zero prohibited punctuation. |
| 5 | Chapter structure | 4 | Standard beat format strictly observed across Learn chapters; Read, Build, and Check steps cleanly separated. |
| 6 | Interaction purpose | 4 | Interactive card sorters directly practice scoping cuts and case study organization, producing tangible planning evidence. |
| 7 | Assessment quality | 3 | Major improvements in distractors and persona alignment, but 04.07 locks out open source, 04.04 leaks via label, and 05.05 tests recall. |
| 8 | Difficulty calibration | 4 | Appetite-based timeboxing and single-player problem filters provide desirable difficulty without cognitive confusion. |
| 9 | Cognitive load | 4 | Exactly one hard technical concept per beat; background research and worked models partitioned into GoDeeper folds. |
| 10 | Prerequisite integrity | 4 | Connects module 3 claim ledger mechanics directly to module 5 case study synthesis and module 4 metric planning. |
| 11 | Technical accuracy | 4 | Demo storyboard arithmetic corrected to 90s; container isolation and OAuth scopes accurately presented. |
| 12 | Production-grade coverage | 4 | Thoroughly addresses containerization, OAuth FedCM scopes, rate limiting, nightly database resets, and `.env.example`. |
| 13 | Security and integrity | 4 | Privacy sanitization instructions now precede AI copy-paste prompts; OWASP secret management cheat sheets integrated. |
| 14 | Accessibility | 4 | Captioned demos required, text fallbacks provided, and screenshot-first light page pattern protects bandwidth-limited users. |
| 15 | IP protection | 4 | Imparts decision-making and verification frameworks while withholding full capstone project implementations. |
| 16 | Variant distinctiveness | 4 | Distinguishes solo product building from open-source repair paths across engineering contexts. |
| 17 | Continuity | 3 | Resolved persona errors, but core flow vs export bundling remains inconsistent and 05.05 contradicts its own section count. |
| 18 | Learner agency and curiosity | 4 | Learners retain genuine agency to choose their own project, adopt the open-source track, or build on Areej's repair model. |
| 19 | Instructor alignment | 4 | Course team confirmed voice note and server-side rubric handling; curriculum reflects instructor-approved roadmap. |
| 20 | Interactive canvas quality | 3 | Canvases render cleanly, but `career-m4-run-the-filter` still uses 8 ideas instead of 5 and `career-m5-stranger-path` counts taps. |
| 21 | Explanatory depth | 4 | GoDeeper folds provide empirical study limits, citations, OWASP security mechanics, and trade-offs. |
| 22 | Visual explanation quality | 3 | Beat 5 in 04.02 uses a generic branching diagram that fails to illustrate the 5-column log schema taught in the prose. |

**Scorecard Average: 3.86 / 5.00** *(Fails quality threshold: requires minimum 4 on every dimension and average at least 4.3).*
