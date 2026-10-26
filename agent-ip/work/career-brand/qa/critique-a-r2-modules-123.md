# Round 2 Critique: `career-brand` (Modules 1 & 2)

**Reviewer:** Critic A (Round 2 blind review)  
**Target:** Modules 1 & 2 revised chapters and structure  

---

## Part 1: Status of Round 1 Defects

*(Note: Items rejected by the course team:including the voice-note `minWords` trap in 01.06, exposed mentor keys in `modelAnswer`, 02.04 cutoff, access test shift, and 4.2 slot card form:are excluded per instructions).*

### 1. `curriculum-roadmap.md` | G2B instructor confirmation pending with 24 open decisions
- **Status:** **OPEN**  
- **Evidence:** `curriculum-roadmap.md` was omitted from the revised materials, and no instructor confirmation or G2B architectural sign-off record was provided. Meanwhile, downstream delivery continues unverified in [01.01-set-the-scene.md](courses/career-brand/01-what-a-reader-sees-first/01.01-set-the-scene.md):
> `<Roadmap title="Nine modules, evidence first" milestones={[{id:"m1",title:"1. What a reader sees first",description:"See your kit as a busy reader does, and record a baseline.",state:"current"},{id:"m2",title:"2. Your career arc document"`

### 2. `courses/career-brand/01-what-a-reader-sees-first/01.03-what-they-look-for.md` | Predict prompt contradiction on checking internal dashboard
- **Status:** **FIXED**  
- **Evidence:** The prompt was revised in [01.03-what-they-look-for.md](courses/career-brand/01-what-a-reader-sees-first/01.03-what-they-look-for.md) to explicitly include asking to see evidence:
> `prompt: "Which of these two lines could a founder check, or ask to see, without asking you what it means?"`

### 3. `courses/career-brand/02-your-career-arc-document/02.02-values-pillars-and-what-makes-you-different.md` | Statement 1 in quiz had only one proof
- **Status:** **FIXED**  
- **Evidence:** In [02.02-values-pillars-and-what-makes-you-different.md](courses/career-brand/02-your-career-arc-document/02.02-values-pillars-and-what-makes-you-different.md), Statement 1 now provides two distinct proofs, and Option C explicitly requires two proofs:
> `- "Statement 1 is backed by two proofs and numbers; statement 2 needs both before it can stand as a pillar"`  
> `"Proof 1, a transport app: start time fell from 3.1 s to 1.4 s (median of 20 launches on one phone each time, before and after; my timing sheet). Proof 2, a notes app: the list screen opened in 0.9 s instead of 2.2 s"`

### 4. `courses/career-brand/01-what-a-reader-sees-first/01.06-checklist.md` | AI drill opening asked for only one line
- **Status:** **FIXED**  
- **Evidence:** The opening prompt in [01.06-checklist.md](courses/career-brand/01-what-a-reader-sees-first/01.06-checklist.md) now asks for three lines, aligning with the diagnostic goal:
> `opening: "Pick three lines from your resume and start with the one you are proudest of. What did you do, and how do you know it worked?"`

### 5. `courses/career-brand/01-what-a-reader-sees-first/01.01-set-the-scene.md` | Premature `predict` block in Read chapter
- **Status:** **FIXED**  
- **Evidence:** In [01.01-set-the-scene.md](courses/career-brand/01-what-a-reader-sees-first/01.01-set-the-scene.md), the prompt was rewritten to an everyday observation aligned with the Read chapter guidelines:
> `prompt: "Look at what the founder's phone showed. What do you notice about the first screen?"`

### 6. `courses/career-brand/02-your-career-arc-document/02.03-every-role-with-proof.md` | Predict prompt gave away ownership breakdown in premise
- **Status:** **FIXED**  
- **Evidence:** The prompt in [02.03-every-role-with-proof.md](courses/career-brand/02-your-career-arc-document/02.03-every-role-with-proof.md) now presents neutral chronological steps without sorting ownership:
> `prompt: "A slow report was fixed in these steps: find the query, run the plan, choose the index, write the migration, review the change, schedule the release. Which sentence is honest about who did what?"`

### 7. `curriculum-roadmap.md` | Roadmap row 2.2 specified "one proof" vs chapter 2.2 standard of two proofs
- **Status:** **PARTLY FIXED**  
- **Evidence:** In [02.02-values-pillars-and-what-makes-you-different.md](courses/career-brand/02-your-career-arc-document/02.02-values-pillars-and-what-makes-you-different.md), the summary was corrected to `"Back each pillar with two proofs and a number a stranger could check, and write one plain line that says what makes you different."`. However, in [02.01-set-the-scene.md](courses/career-brand/02-your-career-arc-document/02.01-set-the-scene.md), Learning Objective 2 still erroneously states:
> `"Choose two or three strengths and back each one with a proof and a number a stranger could check"`

### 8. `courses/career-brand/01-what-a-reader-sees-first/01.02-the-first-look-is-short.md` | Unexplained "two proof blocks" in beat text
- **Status:** **FIXED**  
- **Evidence:** The introductory prose of [01.02-the-first-look-is-short.md](courses/career-brand/01-what-a-reader-sees-first/01.02-the-first-look-is-short.md) now explicitly introduces and defines both proof blocks before the canvas interaction:
> `"Bashar's best work was on page 2, in two proof blocks. One is a result line saying he moved the nightly import into a queue. The other is one labelled link to that code."`

### 9. `courses/career-brand/01-what-a-reader-sees-first/01.02-the-first-look-is-short.md` | Mermaid diagram causal arrows C & D pointing to E
- **Status:** **FIXED**  
- **Evidence:** The flowchart topology in [01.02-the-first-look-is-short.md](courses/career-brand/01-what-a-reader-sees-first/01.02-the-first-look-is-short.md) was reorganized so missing study metadata (C) and what was actually measured (D) logically converge into the takeaway (E):
> `C["What its 2018 report left out: how many recruiters, which jobs, how long the resumes were"]`  
> `C --> E["So it is not a fact about how recruiters judge you"]`

### 10. `courses/career-brand/02-your-career-arc-document/02.04-the-human-part-and-asking-others.md` | Implausible caricature distractor ("flatters you the most")
- **Status:** **FIXED**  
- **Evidence:** In [02.04-the-human-part-and-asking-others.md](courses/career-brand/02-your-career-arc-document/02.04-the-human-part-and-asking-others.md), the distractor was replaced with a plausible mental model:
> `label: "The reply with the longest and most detailed story"`

### 11. `courses/career-brand/01-what-a-reader-sees-first/01.02-the-first-look-is-short.md` | Implausible mobile distractor ("looks through the whole file first")
- **Status:** **OPEN**  
- **Evidence:** In [01.02-the-first-look-is-short.md](courses/career-brand/01-what-a-reader-sees-first/01.02-the-first-look-is-short.md), the distractor remains unchanged, asserting that opening a file on a mobile phone jumps to page 2 because the reader reads the whole file first:
> `label: "His best work, because a reader looks through the whole file first"`

### 12. `courses/career-brand/01-what-a-reader-sees-first/01.03-what-they-look-for.md` | MCQ Lines 2 and 5 exclusive to Option 4
- **Status:** **FIXED**  
- **Evidence:** In [01.03-what-they-look-for.md](courses/career-brand/01-what-a-reader-sees-first/01.03-what-they-look-for.md), checkable lines are now distributed across distractors:
> `- "Lines 2 and 4, because both give real detail about the work he did"`  
> `- "Lines 5 and 6, because a live page and a strong description go together"`

### 13. `courses/career-brand/01-what-a-reader-sees-first/01.06-checklist.md` | Drill feedback reflection omitted from mentor rubric
- **Status:** **FIXED**  
- **Evidence:** In [01.06-checklist.md](courses/career-brand/01-what-a-reader-sees-first/01.06-checklist.md), the mentor evaluation guidance explicitly defines how the feedback section is treated:
> `"The feedback piece you add at the end of the written task is not graded. It shows your mentor what you learned from the drill, and a disagreement with the feedback is welcome."`

### 14. `courses/career-brand/02-your-career-arc-document/02.02-values-pillars-and-what-makes-you-different.md` | Cryptic "20 May release" node in Mermaid diagram
- **Status:** **PARTLY FIXED**  
- **Evidence:** In [02.02-values-pillars-and-what-makes-you-different.md](courses/career-brand/02-your-career-arc-document/02.02-values-pillars-and-what-makes-you-different.md), Node K1 now associates the release with report numbers, but remains cryptic regarding why noting it proves honesty:
> `K1["Honest numbers: noted a 20 May release beside her report numbers"]`

### 15. `courses/career-brand/02-your-career-arc-document/02.02-values-pillars-and-what-makes-you-different.md` | Print shop project metric inconsistency across chapters
- **Status:** **FIXED**  
- **Evidence:** In [02.05-write-your-career-arc.md](courses/career-brand/02-your-career-arc-document/02.05-write-your-career-arc.md), the primary metrics are explicitly reconciled as a 7-to-1 minute median reduction producing ~3 net hours saved weekly:
> `"About 3 hours a week, net of about 30 minutes a month of upkeep"`

### 16. `courses/career-brand/01-what-a-reader-sees-first/01.04-when-writing-is-cheap.md` | Premature `p95` definition and confusing "beat" phrasing
- **Status:** **PARTLY FIXED**  
- **Evidence:** In [01.04-when-writing-is-cheap.md](courses/career-brand/01-what-a-reader-sees-first/01.04-when-writing-is-cheap.md), the confusing phrase "requests beat" was corrected to "requests finish within", but `p95` latency percentiles are still introduced ahead of Module 3:
> `"A p95 is the time that 95 of every 100 requests finish within. A lower p95 means the slow requests got faster. Module 3 teaches it in full."`

### 17. `courses/career-brand/01-what-a-reader-sees-first/01.01-set-the-scene.md` | `<ProjectPreview>` and `<Roadmap>` cluttering Beat 2
- **Status:** **FIXED**  
- **Evidence:** In [01.01-set-the-scene.md](courses/career-brand/01-what-a-reader-sees-first/01.01-set-the-scene.md), both components were moved out of Beat 2 to the chapter header prior to the first beat:
> `<ProjectPreview title="Your career kit" description="Eight parts that you build one by one, evidence first. A mentor can review the finished kit in under 30 minutes, and you can show where any number in it came from."`

---

## Part 2: New Defects

### 1. [S2 : Major] `courses/career-brand/02-your-career-arc-document/02.02-values-pillars-and-what-makes-you-different.md`
- **Location:** Line 73 (Predict block before Beat 3)
- **Observation:** The prompt asks:
> `prompt: "Which of Areej's claims could hold up a pillar on its own?"`
and marks `"Cut a report's p95 from 4.6 s to 0.41 s (14 days before and after)"` as correct.
- **Why it matters:** This directly contradicts the core thesis taught across Module 2: `"Why two proofs and not one? One proof can be luck, or one good week. Two proofs from different places show a habit."` A single claim cannot "hold up a pillar on its own". This teaches learners the wrong rule immediately before they complete the gate, which requires two proofs.
- **Required fix:** Reframe the prompt to ask which claim is checkable as a proof: `"Which of Areej's claims gives a checkable proof that can support a pillar?"`

### 2. [S2 : Major] `courses/career-brand/01-what-a-reader-sees-first/01.03-what-they-look-for.md`
- **Location:** Line 136 (Quick check MCQ question stem)
- **Observation:** The question scenario asserts:
> `"A founder has five minutes and will not message him first."`
Yet the question marks Option 4 as correct (`"Lines 2 and 5, because one has a named source and the other opens"`), where Line 2 is an internal payment provider report.
- **Why it matters:** In Beat 3's GoDeeper fold, the chapter explicitly explains: `"A reader may not be able to open that dashboard. But they know what to ask for, and you can show it."` If the founder will not message the candidate, they cannot ask to see or verify the private payment provider report. The premise contradicts the lesson mechanism.
- **Required fix:** Remove `"and will not message him first"` from the question prompt.

### 3. [S2 : Major] `courses/career-brand/02-your-career-arc-document/02.01-set-the-scene.md`
- **Location:** Line 14 (Learning objectives)
- **Observation:** Learning Objective 2 specifies backing each strength with only one proof:
> `"Choose two or three strengths and back each one with a proof and a number a stranger could check"`
- **Why it matters:** Chapter 02.02, Chapter 02.05, and Gate 02.07 all mandate that each pillar must stand on *two* proofs. Stating "a proof" in the learning objective introduces prerequisite confusion and misstates the outcome standard for the module.
- **Required fix:** Change `"with a proof and a number"` to `"with two proofs and a number"`.

### 4. [S2 : Major] `courses/career-brand/02-your-career-arc-document/02.06-quiz.md`
- **Location:** Line 11 (Quick check Question 1)
- **Observation:** The question asks:
> `question: "In this made-up case, Taha is a DevOps engineer who keeps a release log with a count of rollbacks for each quarter. His numbers are illustrative. He drafts four pillar statements for his career arc. Which one is backed by a proof and a number?"`
The correct answer (Option A) contains only a single proof (`"rollbacks fell from 6 to 2 a quarter over two quarters (release log; my pre-release checklist)"`).
- **Why it matters:** A pillar statement in the career arc cannot stand on a single proof. Validating Option A as a complete pillar statement reinforces the misconception that one proof suffices, undermining the two-proof gate requirement.
- **Required fix:** Reframe the stem to ask which option provides a valid checkable proof for a pillar, or add a second proof to Option A.

### 5. [S3 : Minor] `courses/career-brand/02-your-career-arc-document/02.03-every-role-with-proof.md`
- **Location:** Line 47 (Predict block) vs Line 60 (Beat 2 prose)
- **Observation:** The predict prompt states:
> `prompt: "A slow report was fixed in these steps: find the query, run the plan, choose the index, write the migration, review the change, schedule the release. Which sentence is honest about who did what?"`
Immediately following, Beat 2 opens with:
> `"The report fix had seven steps. Areej did four: she found the query, ran the plan, chose the index and wrote the migration. Her lead did three: reviewed, scheduled and deployed, which means put it live."`
- **Why it matters:** The predict prompt enumerates 6 steps (omitting deployment), while the next beat states the fix had 7 steps. This inconsistency causes unnecessary friction for ESL learners tracking step counts.
- **Suggested fix:** Add "deploy the release" to the predict prompt list.

### 6. [S3 : Minor] `courses/career-brand/02-your-career-arc-document/02.04-the-human-part-and-asking-others.md`
- **Location:** Line 86 (Beat 4 GoDeeper fold "A rule of thumb for any detail")
- **Observation:** The text states:
> `"A two-line summary is the most valuable space on the page."`
- **Why it matters:** Chapter 01.02 explicitly instructs candidates to delete summary and objective paragraphs because they occupy the first screen without providing verifiable evidence. Describing a two-line summary as "valuable space" contradicts the core rule of Module 1.
- **Suggested fix:** Rephrase to: `"The first screen is the most valuable space on the page."`

### 7. [S3 : Minor] `courses/career-brand/02-your-career-arc-document/02.03-every-role-with-proof.md`
- **Location:** Line 18 (Beat 1 prose) vs Line 90 (Beat 3 prose)
- **Observation:** Beat 1 prose asserts that behind a role line sit:
> `"three things: what Areej did and what her lead did, the numbers that changed, and the permission to show them."`
In Beat 3, the card is taught as having six distinct fields.
- **Why it matters:** Introducing a partial 3-item model in Beat 1 conflicts with the formal 6-field schema taught in Beat 3 and applied in Chapter 02.05.
- **Suggested fix:** Update Beat 1 to reference the complete card: `"Behind it sits the full story: the situation, what you and the team did, the result with its proof, and the permission to show them."`

### 8. [S3 : Minor] `courses/career-brand/02-your-career-arc-document/02.05-write-your-career-arc.md`
- **Location:** Line 183 (`## Acceptance criteria`)
- **Observation:** The acceptance criteria checklist states:
> `- [ ] All nine parts are present. Part 5 may say "skipped".`
- **Why it matters:** Chapter 02.04 and Chapter 02.05 both allow Part 6 (best-self asks) to be satisfied by a future plan date (`"or: Plan to send by [date]"`). Omitting this allowance from the acceptance criteria causes learners without immediate replies to believe their draft is incomplete.
- **Suggested fix:** Update the checklist item to: `"- [ ] All nine parts are present. Part 5 may say 'skipped', and Part 6 may be a plan to send by a date."`

---

## Part 3: 22-Dimension Scorecard

| # | Dimension | Score | Evidence |
|---|---|:---:|---|
| 1 | **Outcome alignment** | 4 | Every chapter directly builds toward first-screen diagnostic assessment or verifiable career arc artifacts. |
| 2 | **Domain specificity** | 4 | Realistic modeling of remote hiring dynamics, engineering logs, and Palestinian fellow context. |
| 3 | **Depth over coverage** | 4 | Rigorously dissects attribution, permission boundaries, and metric provenance rather than broad formatting tips. |
| 4 | **Prose quality** | 4 | Direct, accessible, plain-English prose suited for ESL learners without condescension or empty filler. |
| 5 | **Chapter structure** | 4 | Visual-first beats format consistently observed; administrative components in 01.01 moved out of beats. |
| 6 | **Interaction purpose** | 4 | Canvases (reordering first screens, sorting claims, assigning role card fields) produce core conceptual evidence. |
| 7 | **Assessment quality** | 3 | Predict in 02.02 falsely validates single-proof pillars; quiz stem in 01.03 contradicts internal verification premise. |
| 8 | **Difficulty calibration** | 4 | Scaffolding fades smoothly from guided card sorting to independent career arc drafting. |
| 9 | **Cognitive load** | 4 | Complex role documentation is broken into clear, manageable fields with minimal extraneous jargon. |
| 10 | **Prerequisite integrity** | 3 | Technical latency percentiles (`p95`) are introduced and explained in modules 1 and 2 before module 3. |
| 11 | **Technical accuracy** | 4 | EXPLAIN ANALYZE execution times, database indexing mechanisms, and secret revocation steps are accurate. |
| 12 | **Production-grade coverage** | 4 | Thoroughly covers permission boundaries, redaction of sensitive employer data, and shared attribution. |
| 13 | **Security and integrity** | 4 | Clear rules against pasting private client data, credentials, or internal company metrics into AI tools. |
| 14 | **Accessibility** | 4 | Consistently accounts for narrow viewports (375px), low bandwidth, power cuts, and speech input options. |
| 15 | **IP protection** | 4 | Scaffolds narrative structure and verification ledgers without ghostwriting candidate achievements. |
| 16 | **Variant distinctiveness** | 4 | Provided fellow Areej establishes a complete, realistic full-stack benchmark across all gates and templates. |
| 17 | **Continuity** | 4 | Print shop metrics harmonized to 7-to-1 min / 3 hrs weekly; Bashar's two proof blocks clarified upfront. |
| 18 | **Learner agency and curiosity** | 5 | Strongly validates "not measured yet" as a respectable answer and respects privacy on unshared details. |
| 19 | **Instructor alignment** | 2 | G2B instructor confirmation record remains pending with 24 unresolved decisions unaddressed. |
| 20 | **Interactive canvas quality** | 4 | Interactive widgets reinforce core claims directly, though canvas data validation remains external. |
| 21 | **Explanatory depth** | 4 | GoDeeper folds deliver rich mechanisms, worked examples, trade-offs, and failure modes across all beats. |
| 22 | **Visual explanation quality** | 3 | Flowchart in 01.02 improved, but Mermaid diagram Node K1 in 02.02 remains cryptic without fold context. |

**Scorecard Average: 3.82 / 5.0**  
*(Gate threshold: minimum 4.0 on every dimension, average at least  4.3; blocked by S2 assessment defects and pending G2B alignment).*
