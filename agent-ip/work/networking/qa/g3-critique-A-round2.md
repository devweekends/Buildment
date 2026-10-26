# Critic A Report (Round 2 of 2): Chapter 2.2 ("An address is one 32-bit number")

## Overview and Recommendation

- Artifact under review: `01-chapter-2.2.md` and `02-canvases.md`
- Critic: Critic A (round 2 of 2)
- Lenses: Pedagogy and assessment
- Scorecard average: 4.41 / 5.00
- Blocking defects: 2 (S2)
- Recommendation: Revise

Chapter 2.2 shows substantial improvement over round 1. The introduction no longer spoils the 255 byte limit, the predict block drops the toy lamp analogy in favor of authentic place-value summation, Beat 3 introduces the greedy subtraction walk with a worked flowchart prior to the unassisted drill in Beat 4, mobile feedback text truncation in `DrillView.tsx` is fixed, and roadmap outcome scope has been reconciled. All twelve round 1 defects are resolved or have their rejections accepted. However, two new S2 defects prevent publication approval: Beat 2 visible text claims an address rollover visual behavior that Canvas 2 does not show, and the Quick Check quiz omits any summative assessment of hand binary conversion, leaving the chapter's primary procedural outcome unmeasured in graded evaluation.

## 1. Round 1 Defect Verification (DEF-01 to DEF-12)

| ID | Round 1 Severity | Status | One-Line Evidence |
|---|---|---|---|
| DEF-01 | S2 | closed | Beat 3 introduces the greedy subtraction walk with a worked flowchart for 172 before the drill canvas in Beat 4. |
| DEF-02 | S2 | closed | Line 11 removes the 255 spoiler and the predict block replaces the lamp analogy with place values summed by the learner. |
| DEF-03 | S2 | closed | The static three-views diagram was replaced by an active flowchart showing each step of the greedy subtraction walk for 172. |
| DEF-04 | S2 | closed | Both quiz questions use unsolved examples testing application of carry rules and IPv4 validity against plausible learner misconceptions. |
| DEF-05 | S2 | closed | The roadmap table for 2.2 scopes hand conversion to each byte and clarifies that full 32-bit number conversion is implemented in code exercise 2.5. |
| DEF-06 | S2 | closed | `explainQuestion` in `net-address.ts` shortens the range feedback to under 35 characters, fitting cleanly within the 404-unit card width on a 375px screen. |
| DEF-07 | S3 | rejected-with-reason-accepted | The drill canvas serves as the beat's visual practice rather than a graded assessment block, leaving exactly three assessment interactions (one predict and two quizzes). |
| DEF-08 | S3 | rejected-with-reason-accepted | The platform course audit script measures visible AST text including headings and diagram legend (totaling 319 visible words), passing with no flags. |
| DEF-09 | S3 | closed | Beat 4 heading is changed to "Five conversions, no calculator", which is four words and describes the drill canvas below. |
| DEF-10 | S3 | closed | `DrillView.tsx` line 1093 dynamically displays "press Check" when an active byte-to-bits question renders the Check button. |
| DEF-11 | S3 | rejected-with-reason-accepted | Declarative quiz fences with embedded keys are the platform MDX standard, making server-side validation a platform infrastructure dependency rather than an author defect. |
| DEF-12 | S4 | closed | Beat 1 visible text is now structured into exactly four clear sentences. |

## 2. New Defects in Revised Chapter (S1 to S3)

| ID | Severity | Location | Observation | Why it matters | Required fix |
|---|---|---|---|---|---|
| NEW-01 | S2 | `01-chapter-2.2.md`, lines 45-48 | Beat 2 visible text states "So one more than `.255` rolls into the next part", but Canvas 2 (`net-m2-address-bits`) provides no increment button, no carry animation, and no automatic carry propagation across rows when toggling bits. | Violates the beat rule that visible text must only explain what the picture shows (`00-rules.md`, lines 293, 306). The learner never observes rollover behavior in this visual. | Remove the rollover claim from visible text and place it in the GoDeeper fold, or add an increment control to Canvas 2 that demonstrates cross-byte carry propagation. |
| NEW-02 | S2 | `01-chapter-2.2.md`, lines 110-136 | The Quick Check contains two questions (octet rollover and address syntax validity), but completely lacks any question assessing hand conversion between decimal numbers and binary bytes. | Violates Quality Gate Dimension 1 (Outcome alignment) and Dimension 7 (Assessment quality). The primary procedural outcome of roadmap 2.2 and Beat 3 has no graded evidence in the summative assessment. | Add or adjust a Quick Check quiz question to directly assess hand conversion between decimal and binary for an 8-bit byte. |
| NEW-03 | S3 | `01-chapter-2.2.md`, lines 88-91 | Beat 4 visible text states "Use the same walk for each question: tap the bits for a number, read a byte from its bits, or spot an address that cannot exist", but the subtraction walk only applies to decimal-to-binary conversion. | Violates pedagogy guidelines for second-language beginners by prescribing a subtraction procedure for addition and syntax-checking tasks. | Clarify that the subtraction walk converts decimal numbers to bits, while reading bits uses addition and address validation relies on byte range bounds. |
| NEW-04 | S3 | `01-chapter-2.2.md`, lines 63-72 | In the Beat 3 subtraction flowchart for 172, node G combines place values 2 and 1 into a single step (`G["2 and 1: write 0, 0"]`) while earlier nodes evaluate each place value individually. | Violates Quality Gate Dimension 22 (Visual explanation quality). For a beginner learning an 8-bit algorithm, grouping places obscures the 1:1 correspondence between the eight bit positions and the output byte. | Split node G into two separate sequential nodes: one for place value 2 (write 0) and one for place value 1 (write 0). |

## 3. Scorecard (All 22 Dimensions)

| # | Dimension | Score | Evidence |
|---|---|---|---|
| 1 | Outcome alignment | 4 | Hand conversion of bytes and 32-bit structure align with roadmap 2.2, though the summative quiz omits hand conversion evidence. |
| 2 | Domain specificity | 5 | All numbers, RFC 791 citations, and address patterns belong specifically to real-world IPv4 networking without generic toy analogies. |
| 3 | Depth over coverage | 5 | Narrow focus on 8-bit byte limits and 32-bit composition with over 1,000 words of detailed fold explanations. |
| 4 | Prose quality | 4 | Clear, short sentences free of slop patterns and filler headings, with only a minor phrasing flaw in Beat 4 visible text. |
| 5 | Chapter structure | 4 | Follows the approved visual-first beats structure with problem hook, concept beats, worked example, practice drill, and bridge. |
| 6 | Interaction purpose | 4 | Every canvas interaction yields direct cognitive evidence of byte boundaries, within the three-assessment interaction budget. |
| 7 | Assessment quality | 4 | Distractors represent authentic learner misconceptions and option lengths do not give answers away, though hand binary conversion is unassessed. |
| 8 | Difficulty calibration | 4 | Teaching the subtraction walk in Beat 3 prior to the Beat 4 drill establishes desirable difficulty without premature frustration. |
| 9 | Cognitive load | 5 | Steps smoothly from single-byte mechanics to 32-bit composition and manual subtraction without extraneous routing concepts. |
| 10 | Prerequisite integrity | 4 | Place values are defined prior to addition in the predict block, and the manual conversion method is taught before the drill. |
| 11 | Technical accuracy | 5 | Bitwise operations, RFC 791 citations, unsigned arithmetic, and IPv4 boundary values are verified and technically sound. |
| 12 | Production-grade coverage | 5 | Canvas input validation strictly enforces four-part constraints, leading zero prohibitions, and 0 to 255 byte bounds. |
| 13 | Security and integrity | 4 | Input sanitization prevents malformed data entry, and quiz keys follow the platform MDX standard. |
| 14 | Accessibility | 4 | All bit cards provide accessible button names and states, feedback text fits mobile widths, and reduced motion is honored. |
| 15 | IP protection | 5 | Conceptual mechanics are demonstrated while reserving programmatic implementation of `ipToNumber` for code exercise 2.5. |
| 16 | Variant distinctiveness | 5 | Core foundational networking chapter with no track variants required. |
| 17 | Continuity | 5 | Flawless continuity referencing laptop numbers from 1.3, exhaustion from 2.1, and bridge forward to classful routing in 2.3. |
| 18 | Learner agency and curiosity | 4 | Learners actively manipulate bit cards, input their own machine addresses, and test their skills in unassisted drills. |
| 19 | Instructor alignment | 4 | Faithfully executes the roadmap 2.2 mandate for interactive bit flipping, byte limit discovery, and hand conversion practice. |
| 20 | Interactive canvas quality | 4 | Models are pure and tested, controls are legible, and mobile feedback text truncation defects have been resolved. |
| 21 | Explanatory depth | 5 | GoDeeper folds supply comprehensive mechanism details, positional weighting formulas, and three explicit near-miss failure modes. |
| 22 | Visual explanation quality | 4 | The subtraction flowchart visually demonstrates the greedy conversion walk, though Beat 2 claims rollover motion absent from its canvas. |

**Scorecard Average:** 4.41 / 5.00 (97 / 110 points)
