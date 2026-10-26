# Round 2 Critique : Modules 7, 8 & 9 (Career Brand)

**Reviewer:** Critic A (Round 2)  
**Artifacts Under Review:** Modules 7, 8 & 9 (`courses/career-brand/07-linkedin`, `courses/career-brand/08-writing-and-distribution`)  
**Scope:** Review rules, Round 1 defect verification, New defects audit, 22-dimension scorecard.

---

## 1. Status of Round 1 Defects

*(Note: Per review instructions, rejected items requiring no status are omitted: "minWords above 0 traps voice notes", "the mentor key in modelAnswer is visible to learners", "02.04 is cut off", "the access test is shifted to fellows", and "the 4.2 slot card is a form".)*

### S2 Defects from Round 1

- **`courses/career-brand/07-linkedin/07.04-outreach-and-honest-growth.md`** : Contradictory staging metric (3,840 ms to 46 ms) violating canonical ledger row R2 (4.6 s to 0.41 s).  
  **Status: OPEN**  
  **Evidence:** The invented metric remains unchanged in the model outreach draft:  
  `courses/career-brand/07-linkedin/07.04-outreach-and-honest-growth.md`:  
  > `"My report query's execution time fell from 3,840 ms to 46 ms. I did not measure the cost on writes."`

- **`courses/career-brand/07-linkedin/07.06-quiz.md`** : Keyed headline answer contained raw metric ("under a second") contradicting 7.02 headline rule.  
  **Status: FIXED**  
  **Evidence:** Question 1 correct option was rewritten to omit raw metrics:  
  `courses/career-brand/07-linkedin/07.06-quiz.md`:  
  > `"Backend developer (Go, PostgreSQL). I make slow reports fast, and I show the logs behind each fix."`

- **`courses/career-brand/07-linkedin/07.02-your-profile-field-by-field.md`** : Beat 6 heading promised profile address while diagram and prose covered Open to Work.  
  **Status: FIXED**  
  **Evidence:** Beat 6 was retitled to align with the visual, and profile address was moved to a fold:  
  `courses/career-brand/07-linkedin/07.02-your-profile-field-by-field.md`:  
  > `"<MermaidDiagram title=\"Who sees Open to Work\" chart={`flowchart TD\n  O[\"Do you want people to see that you are looking?\"]"`  
  > `"<GoDeeper title=\"Your profile address and your photo\">\n\nYour profile address is the link people can type or tap."`

- **`courses/career-brand/07-linkedin/07.03-posts-and-comments.md`** : Prediction tested factual recall of LinkedIn help page before folklore was introduced.  
  **Status: FIXED**  
  **Evidence:** Prediction was reframed around evaluating unsourced claims given personalized feeds:  
  `courses/career-brand/07-linkedin/07.03-posts-and-comments.md`:  
  > `"A guide says posts with links get no reach, and names no source. The picture showed that each feed is built for one viewer. How should you treat the claim?"`

- **`courses/career-brand/07-linkedin/07.03-posts-and-comments.md`** : Quick check question tested verbatim recall of 4-part post list.  
  **Status: FIXED**  
  **Evidence:** Question now provides four distinct draft post outlines testing applied evaluation:  
  `courses/career-brand/07-linkedin/07.03-posts-and-comments.md`:  
  > `"Outline B: the report was late every Monday; now ready at 9:00, not 11:30 (delivery log, 8 Mondays each side); a log screenshot; next, a late alert"`

- **`courses/career-brand/07-linkedin/07.07-checklist.md`** : Four numbered learning log prompts uncollected and unassessed in `openquestion` block.  
  **Status: PARTLY FIXED**  
  **Evidence:** Prompt 1 (viewer memory comparison) is incorporated into the test comparison task, but prompts 2, 3, and 4 ("Your nervous draft", "Your folklore", "Your count") remain uncollected in the submission block and omitted from the grading rubric:  
  `courses/career-brand/07-linkedin/07.07-checklist.md`:  
  > `"1. **What was remembered:** What did the viewer remember this time, compared with module 1? Or use Areej's case: what did her classmate remember now, compared with her old resume?\n2. **Your nervous draft:** Which outreach draft are you most nervous to send, and what is the smallest version of it?"`

- **`curriculum-roadmap.md`** : G2B instructor sign-off pending.  
  **Status: OPEN**  
  **Evidence:** No confirmed instructor review or sign-off records were provided in the revision package.

- **`curriculum-roadmap.md`** : 7.02 interactive playable canvas replaced with chip categorization widget instead of editable profile preview.  
  **Status: OPEN**  
  **Evidence:** The playable beat in 7.02 remains a chip-tapping exercise rather than an editable phone preview:  
  `courses/career-brand/07-linkedin/07.02-your-profile-field-by-field.md`:  
  > `"Build Amjad's new headline. Tap a chip, then the part it fills: role, stack, or proof habit. Four of the chips fit no part, and the card says why."`

---

### S3 Defects from Round 1

- **`courses/career-brand/07-linkedin/07.01-set-the-scene.md`** : Predict placed inside Beat 2 after prose revealed the answer.  
  **Status: FIXED**  
  **Evidence:** The predict block was moved to Beat 1 under the canvas to observe what the picture shows:  
  `courses/career-brand/07-linkedin/07.01-set-the-scene.md`:  
  > `"prompt: \"Look at the picture again. What do you notice about the note that Amjad sends?\""`

- **`courses/career-brand/08-writing-and-distribution/08.01-set-the-scene.md`** : Predict placed below paragraph revealing answer.  
  **Status: FIXED**  
  **Evidence:** The predict block is now positioned directly beneath the canvas and before the explanatory text:  
  `courses/career-brand/08-writing-and-distribution/08.01-set-the-scene.md`:  
  > `"prompt: \"Look at Diala's site in the picture. What do you notice about it?\""`

- **`courses/career-brand/07-linkedin/07.06-quiz.md`** : Question 3 stem gave away the rule in parentheses.  
  **Status: FIXED**  
  **Evidence:** Parenthetical hint was removed from the question stem:  
  `courses/career-brand/07-linkedin/07.06-quiz.md`:  
  > `"Ahlam, a product designer, has three personalised notes left this month. She is already connected to a former teaching assistant, a former lead and a classmate she chats with."`

- **`courses/career-brand/07-linkedin/07.06-quiz.md`** : Option 1 repeated 7.03 textbook wording verbatim.  
  **Status: PARTLY FIXED**  
  **Evidence:** The text was slightly rephrased ("comes from LinkedIn", "avoid heavy promotion"), but continues to mirror the textbook phrasing rather than testing a scenario:  
  `courses/career-brand/07-linkedin/07.06-quiz.md`:  
  > `"None of these exact numbers comes from LinkedIn; its own advice is to be relevant, avoid heavy promotion and comment"`

- **`courses/career-brand/07-linkedin/07.06-quiz.md`** : Question 3 left the third note unspent without explanation.  
  **Status: FIXED**  
  **Evidence:** The keyed option now accounts for the complete budget:  
  `courses/career-brand/07-linkedin/07.06-quiz.md`:  
  > `"Message the three connections plainly, spend one note on the engineer and one on the founder after a useful comment, and keep the third"`

- **`courses/career-brand/07-linkedin/07.01-set-the-scene.md`** : Technical inaccuracy stating Premium allows unlimited personalized invitations.  
  **Status: FIXED**  
  **Evidence:** Revised to state Premium raised the number rather than granting unlimited invites:  
  `courses/career-brand/07-linkedin/07.01-set-the-scene.md`:  
  > `"He pays for one month of Premium, which raised the number of personalised invitations he could send (checked 2026-10; your screen may differ)."`

- **`courses/career-brand/07-linkedin/07.05-rebuild-your-profile.md`** : Mermaid diagram drew a linear waterfall misrepresenting data dependencies.  
  **Status: FIXED**  
  **Evidence:** Diagram was redesigned to show ledger feeding fields in parallel:  
  `courses/career-brand/07-linkedin/07.05-rebuild-your-profile.md`:  
  > `"<MermaidDiagram title=\"What feeds each field\" chart={`flowchart TD\n  L[\"Ledger and career arc\"] --> A[\"About\"]\n  L --> E[\"Experience\"]\n  L --> F[\"Featured\"]\n  A --> H[\"Headline, written last\"]"`

- **`courses/career-brand/08-writing-and-distribution/08.03-publish-once-share-in-ten-places.md`** : Contradiction between Beat 4 title ("Map ten channels") and visual/prose ("eight channels").  
  **Status: FIXED**  
  **Evidence:** Beat 4 was retitled and prose clarifies the canvas handles eight channels while two are in the table:  
  `courses/career-brand/08-writing-and-distribution/08.03-publish-once-share-in-ten-places.md`:  
  > `"## Map eight of your channels\n\n<InteractiveCanvas slug=\"career-m8-channel-versions\" />\n\nSort eight of Areej's channels."`

- **`courses/career-brand/08-writing-and-distribution/08.03-publish-once-share-in-ten-places.md`** : Row 10 in syndication table listed private direct message instead of syndication channel.  
  **Status: FIXED**  
  **Evidence:** Row 10 was replaced with a public forum thread on load testing:  
  `courses/career-brand/08-writing-and-distribution/08.03-publish-once-share-in-ten-places.md`:  
  > `"| 10 | A public forum thread about load testing | Short version | A short answer to the question, then the link, only where the forum allows links |"`

- **`courses/career-brand/07-linkedin/07.07-checklist.md`** : 150-word target caused overload for eight complex deliverables.  
  **Status: FIXED**  
  **Evidence:** Word target was raised to 200 words and aligned with `minWords: 120`:  
  `courses/career-brand/07-linkedin/07.07-checklist.md`:  
  > `"Then write about 200 words. Say what was seen first in module 1, and what was seen now. Say what you will change next, one thing only."`

---

### S4 Defects from Round 1

- **`courses/career-brand/07-linkedin/07.03-posts-and-comments.md`** : Repeated boilerplate disclaimer across Learn chapters.  
  **Status: FIXED**  
  **Evidence:** The boilerplate was removed from 07.03:  
  `courses/career-brand/07-linkedin/07.03-posts-and-comments.md`:  
  > `"Amjad wanted his posts to reach founders, and he tried shortcuts. In this chapter you learn what LinkedIn itself says about how posts travel"`

---

## 2. New Defects

### Defect 1 (S2 : Major)
- **Location:** `courses/career-brand/07-linkedin/07.07-checklist.md`
- **Observation:** Part 3 of the mentor rubric demands "Five comment drafts, each saying what it adds" for a "Met" mark, but the open question prompt does not instruct learners to include their comment drafts, nor does the model answer contain or grade them.
- **Why it matters:** Learners following the prompt and word budget will omit their comment drafts, causing mentors using the rubric to mark them "Partly" or "Not yet" for a requirement never asked of them in the prompt.
- **Evidence:**  
  `courses/career-brand/07-linkedin/07.07-checklist.md`:  
  > `"- **Met:** Three outreach drafts, each with one specific question and a note that fits the counter on your screen. Five comment drafts, each saying what it adds."`  
  Prompt in same file:  
  > `"Say whom your three outreach drafts go to, by kind of tie, and how many notes you plan for the month. Confirm in one sentence that you use no automation, send no promotional invitations to strangers and need no Premium. About 200 words."`
- **Required fix:** Remove "Five comment drafts, each saying what it adds" from Part 3 of the gate rubric, or explicitly add comment draft submission instructions to the prompt and adjust the word budget accordingly.

---

### Defect 2 (S2 : Major)
- **Location:** `courses/career-brand/07-linkedin/07.07-checklist.md`
- **Observation:** The gate prompt asks fellows only to state recipient tie types for their outreach drafts, but the grading rubric requires mentors to evaluate the full text and character counter fit of the drafts.
- **Why it matters:** Fellows and model answers (e.g. Kareem: *"My drafts go to a former lead, a classmate's brother two connections away, and a founder after a comment"*) only name the recipient tie types, making it impossible for a mentor to verify whether each draft has "one specific question" or "fits the counter on your screen".
- **Evidence:**  
  `courses/career-brand/07-linkedin/07.07-checklist.md`:  
  > `"Say whom your three outreach drafts go to, by kind of tie, and how many notes you plan for the month."`  
  And in rubric:  
  > `"- **Met:** Three outreach drafts, each with one specific question and a note that fits the counter on your screen."`
- **Required fix:** Explicitly align prompt instructions with the rubric by asking learners to paste the note version of their three outreach drafts, or adjust the rubric to evaluate recipient tie-type selection.

---

### Defect 3 (S3 : Minor)
- **Location:** `courses/career-brand/08-writing-and-distribution/08.04-a-website-that-is-clearly-yours.md`
- **Observation:** The site navigation diagram "Where each visitor goes next" omits the "About" page entirely, despite the prose explicitly defining a five-page site architecture.
- **Why it matters:** The visual models an incomplete four-page topology (Home, Work, Writing, Contact) that directly contradicts the five-page site structure taught in the beat text and required in chapter 8.06.
- **Evidence:**  
  `courses/career-brand/08-writing-and-distribution/08.04-a-website-that-is-clearly-yours.md`:  
  > `"A personal site is five pages. Home says who you are and shows your best proof. Work holds your case study. Writing holds your posts, newest first, so it works as a blog. About says a little about you. Contact gives one way to reach you."`  
  Visual:  
  > `"<MermaidDiagram title=\"Where each visitor goes next\" chart={`flowchart TD\n  H[\"A visitor opens Home\"] --> P[\"Wants proof\"]\n  H --> T[\"Wants to see how you think\"]\n  H --> K[\"Wants to reach you\"]\n  P --> W[\"Work: the case study\"]\n  T --> R[\"Writing: the posts\"]\n  K --> C[\"Contact: one email address\"]"`
- **Required fix:** Add an About branch to the flowchart (`H --> A_Q["Wants human context"] --> A["About: personal detail"]`) so the visual accurately reflects the five-page specification.

---

### Defect 4 (S3 : Minor)
- **Location:** `courses/career-brand/08-writing-and-distribution/08.03-publish-once-share-in-ten-places.md`
- **Observation:** The flowchart arrow directions contradict the visual's stated thesis and legend that syndicated copies direct readers back to the original.
- **Why it matters:** Directed edges `H --> L`, `H --> D`, `H --> M`, `H --> G` indicate traffic flow or reference direction originating from Home and terminating at external platforms, visually depicting outbound dispersion rather than the inbound attribution and return paths ("Each copy sends readers back to it") emphasized in the text.
- **Evidence:**  
  `courses/career-brand/08-writing-and-distribution/08.03-publish-once-share-in-ten-places.md`:  
  > `"<MermaidDiagram title=\"Your page is the original\" chart={`flowchart TD\n  H[\"Your own page: the original\"] --> L[\"LinkedIn: short post and a link\"]"`  
  Legend:  
  > `"legend=\"The original is at the top. Each copy sends readers back to it.\""`
- **Required fix:** Reverse the arrowheads (`L --> H`, `D --> H`, etc.) or use bidirectional/labeled links indicating publication syndication outbound and traffic return inbound.

---

### Defect 5 (S3 : Minor)
- **Location:** `courses/career-brand/07-linkedin/07.05-rebuild-your-profile.md`
- **Observation:** The field dependency diagram and legend state that Headline is fed exclusively by About, but the worked example worksheet table explicitly lists Career Arc as the source.
- **Why it matters:** Contradicts the chapter's conceptual model of data flow. Learners are taught that Headline derives strictly from About ("Only the headline is fed by another field, the About section"), but the filled worksheet shows Headline pulling directly from the external Career Arc document.
- **Evidence:**  
  `courses/career-brand/07-linkedin/07.05-rebuild-your-profile.md`:  
  > `"| Headline | Full-stack developer (Node.js, PostgreSQL). I make slow pages fast and measure it. | Career arc: her difference line |"`  
  And legend:  
  > `"legend=\"The ledger feeds three fields. Only the headline is fed by another field, the About section.\""`
- **Required fix:** Update the table source to read "About section summary (based on career arc difference line)" or update the diagram to show Career Arc directly feeding Headline.

---

### Defect 6 (S3 : Minor)
- **Location:** `courses/career-brand/07-linkedin/07.07-checklist.md`
- **Observation:** The only dedicated URL submission slot in the gate `openquestion` is labeled for audio notes, leaving no semantic URL input for the profile link.
- **Why it matters:** The prompt instructs fellows to "Paste your profile link (or the text if you have no account yet)", but the block's single URL submission slot is specifically configured for a voice note link. Fellows submitting a live LinkedIn URL must either paste it into the body text or into a field marked "Voice note link".
- **Evidence:**  
  `courses/career-brand/07-linkedin/07.07-checklist.md`:  
  > `"urlLabel: \"Voice note link (optional)\"\nurlHint: \"Optional, alongside your written answer: an audio link your mentor can open without signing in.\""`
- **Required fix:** Generalize `urlLabel` to "Profile link or voice note link (optional)" or provide separate submission fields.

---

### Defect 7 (S3 : Minor)
- **Location:** `courses/career-brand/08-writing-and-distribution/08.03-publish-once-share-in-ten-places.md`
- **Observation:** Two of the ten syndication channels in the POSSE publishing plan are private group chats, conflating direct messaging with web content distribution.
- **Why it matters:** POSSE syndication is specifically about publishing across open web platforms, feeds, and searchable public networks. Including internal cohort and WhatsApp/Discord group chats blurs the boundary with private networking/outreach, which chapter 8.05 explicitly states belongs to Module 7 ("Private messages belong to module 7, so they are not channels in this plan").
- **Evidence:**  
  `courses/career-brand/08-writing-and-distribution/08.03-publish-once-share-in-ten-places.md`:  
  > `"| 8 | Coding club group chat | Link only | One line and the link, with the organisers' agreement |\n| 9 | Fellows' cohort chat | Link only | One line and the link |"`
- **Required fix:** Replace closed chat rows with public community channels (such as technical subreddits, niche community forums, or specialized publishing aggregators).

---

### Defect 8 (S3 : Minor)
- **Location:** `courses/career-brand/08-writing-and-distribution/08.05-write-your-post.md`
- **Observation:** The "Test, rewrite, test again" flowchart lacks an error/loop branch from the second tester back to the rewrite step.
- **Why it matters:** While the legend claims "A second listener is a check, not a formality", node E transitions unconditionally to node F (`Channel plan, then publish one copy`). If the second listener fails to grasp the idea, the visual provides no remediation loop, contradicting the iterative test-and-fix principle.
- **Evidence:**  
  `courses/career-brand/08-writing-and-distribution/08.05-write-your-post.md`:  
  > `"<MermaidDiagram title=\"Test, rewrite, test again\" chart={`flowchart TD\n  A[\"Draft the four parts from your ledger row\"] --> B[\"A person reads it, closes it, says it back\"]\n  B --> C{\"Did they say the idea?\"}\n  C -->|no| D[\"Rewrite the gap\"]\n  D --> B\n  C -->|yes| E[\"Test once more with a second person\"]\n  E --> F[\"Channel plan, then publish one copy\"]"`
- **Required fix:** Add a decision check after node E (`E --> G{"Did second listener say the idea?"} -->|no| D; G -->|yes| F`).

---

### Defect 9 (S3 : Minor)
- **Location:** `courses/career-brand/07-linkedin/07.06-quiz.md`
- **Observation:** Question 4 stem explicitly invokes textbook chapter citation rather than presenting an authentic scenario.
- **Why it matters:** Phrasing the question around "as taught in chapter 7.3" tests textbook memory and syllabus recall rather than requiring the learner to apply professional platform standards to Saja's real-world dilemma.
- **Evidence:**  
  `courses/career-brand/07-linkedin/07.06-quiz.md`:  
  > `"Which statement of LinkedIn's rule is accurate, as taught in chapter 7.3 (checked 2026-10)?"`
- **Required fix:** Remove "as taught in chapter 7.3 (checked 2026-10)" and evaluate whether the proposed arrangement violates LinkedIn's platform rules based on policy principles.

---

### Defect 10 (S3 : Minor)
- **Location:** `courses/career-brand/08-writing-and-distribution/08.04-a-website-that-is-clearly-yours.md`
- **Observation:** The decision tree for free static hosting leaves Cloudflare Pages out of the commercial use branch.
- **Why it matters:** Beat 4 introduces three free hosts (GitHub Pages, Cloudflare Pages, Vercel Hobby). When answering "Yes" to selling something or running a paid service, the flowchart states that GitHub Pages and Vercel Hobby are not meant for it, but leaves the status of Cloudflare Pages unstated, leaving learners without a clear path.
- **Evidence:**  
  `courses/career-brand/08-writing-and-distribution/08.04-a-website-that-is-clearly-yours.md`:  
  > `"Y2[\"GitHub Pages and Vercel Hobby are not meant for it\"]\n  Y2 --> Y3[\"Read each host's terms before you start\"]"`
- **Required fix:** Clarify whether Cloudflare Pages permits commercial hobby projects on its free tier or note that all free tiers require reviewing terms for commercial restrictions.

---

## 3. Scorecard (22 Dimensions)

| # | Dimension | Score | Evidence |
|---|---|:---:|---|
| 1 | Outcome alignment | 4 | Chapters directly implement syllabus outcomes for verifiable LinkedIn profiles, POSSE publishing, and personal site architecture. |
| 2 | Domain specificity | 4 | Grounded in Gaza constraints: power cuts, mobile screens, free static hosts, zero-cost tools, and audit-proof ledger cards. |
| 3 | Depth over coverage | 4 | Focuses deeply on high-integrity artifacts (one headline, five pages, four-part posts) rather than superficial vanity growth. |
| 4 | Prose quality | 4 | Clear, active, short sentences suited for second-language readers, free of corporate buzzwords. |
| 5 | Chapter structure | 4 | Predict blocks now correctly precede visual beats, and headings match visual subjects across 7.01, 7.02, and 8.01. |
| 6 | Interaction purpose | 4 | Predictions now prompt meaningful evaluation of visual evidence and professional dilemmas rather than immediate paragraph recall. |
| 7 | Assessment quality | 3 | MCQs in 7.03 and 7.06 improved, but 7.07 rubric demands five comment drafts that the prompt never asks the learner to submit. |
| 8 | Difficulty calibration | 4 | Tasks are scaffolded across small sittings, with realistic phone-first workflows and explicit fallbacks for fellows lacking live accounts. |
| 9 | Cognitive load | 3 | Gate 7.07 presents four learning log prompts in prose that lead nowhere, creating confusion over graded deliverables. |
| 10 | Prerequisite integrity | 4 | Systematically builds on claim ledgers, case studies, and career arcs established in Modules 1, 2, 5, and 6. |
| 11 | Technical accuracy | 4 | Corrected LinkedIn Premium invitation behavior and accurately documented static host quotas (GitHub, Cloudflare, Vercel). |
| 12 | Production-grade coverage | 4 | Strong emphasis on permanent permalinks, canonical URLs, and defensive handling of free-tier build limits. |
| 13 | Security and integrity | 4 | Strict enforcement of redacting employer names, internal database schemas, customer data, and avoiding automated bots. |
| 14 | Accessibility | 4 | Mobile-friendly card layouts, narrow viewBox specifications, and explicit phone testing protocols throughout. |
| 15 | IP protection | 4 | Teaches fellows how to sanitize employer metrics and avoid publishing unredacted proprietary data. |
| 16 | Variant distinctiveness | 4 | Features distinct, realistic career profiles across full-stack, DevOps, data analysis, and mobile engineering tracks. |
| 17 | Continuity | 3 | Chapter 7.04 still contains the unvetted 3,840 ms to 46 ms query plan metric contradicting Areej's canonical ledger row R2 (4.6 s to 0.41 s). |
| 18 | Learner agency and curiosity | 4 | Fellows formulate their own outreach targets, choose syndication channels, and design personal site specifics. |
| 19 | Instructor alignment | 3 | Formal G2B instructor sign-off records remain unprovided, and 7.02 retains chip-tapping rather than the planned editable mobile preview. |
| 20 | Interactive canvas quality | 4 | Visuals effectively model core dilemmas (feed differences, folklore cards, channel sorting) with clear verdict banners. |
| 21 | Explanatory depth | 4 | GoDeeper sections thoroughly cite first-party documentation, empirical studies (Flynn, Brooks, Rajkumar), and trade-offs. |
| 22 | Visual explanation quality | 3 | Diagrams in 8.03 (reversed flow arrows) and 8.04 (missing About page) contain semantic contradictions with chapter text. |

**Scorecard Average: 3.77 / 5.0**

---

## Summary and Recommendation

**Recommendation: REVISE**

The revised modules demonstrate substantial structural improvements: predict placements now honor the teaching contract across set-the-scene and concept chapters, option-length hygiene is clean, multiple-choice questions assess authentic application rather than verbatim recall, and technical claims regarding LinkedIn Premium and static host limits are accurate. 

However, publication is blocked by remaining S2 defects:
1. **Unresolved ledger contradiction in 7.04:** Areej's outreach draft still quotes an unvetted `3,840 ms to 46 ms` metric contradicting ledger row R2 (`4.6 s to 0.41 s at p95`).
2. **Assessment misalignment in Gate 7.07:** Part 3 of the grading rubric requires mentors to evaluate five comment drafts and character counter compliance that are neither requested in the learner prompt nor included in model answers.
3. **Diagram discrepancies in Module 8:** Visual flowcharts in 8.03 (outbound vs inbound return arrows) and 8.04 (omission of the About page) conflict with the accompanying text.

Once the 7.04 ledger metric is harmonized, the 7.07 gate rubric is aligned with prompt instructions, and diagram semantics are reconciled, the module cluster will reach the required quality threshold.
