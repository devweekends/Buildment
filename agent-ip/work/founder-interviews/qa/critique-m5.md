---
artifact: critique
course: founder-interviews
reviewer: critic-m5
scope: module 5 extension
version: 1
---

The module has a strong honesty-first teaching arc and mostly clear assessment. It requires revision before approval because the architecture checklist is incomplete, one reliability claim is technically unsafe, the gate can pass with a missing engineer answer, and canvas QA evidence is absent.

## Scorecard

1. Outcome alignment: 4/5
2. Domain specificity: 4/5
3. Depth over coverage: 4/5
4. Prose quality: 4/5
5. Chapter structure: 4/5
6. Interaction purpose: 4/5
7. Assessment quality: 4/5
8. Difficulty calibration: 4/5
9. Cognitive load: 4/5
10. Prerequisite integrity: 3/5
11. Technical accuracy: 3/5
12. Production-grade coverage: 3/5
13. Security and integrity: 3/5
14. Accessibility: 3/5
15. IP protection: 4/5
16. Variant distinctiveness: 4/5, not applicable to this scope
17. Continuity: 4/5
18. Learner agency and curiosity: 4/5
19. Instructor alignment: 3/5, second instructor approval is missing
20. Interactive canvas quality: 3/5
21. Explanatory depth: 4/5
22. Visual explanation quality: 4/5

Average: 3.5/5

## Defects

### M5-01

Severity: S2

Location: `05.06-check-your-work-area-by-area.md:24, 38 to 44`

Observation: The chapter promises nine areas, but the requested architecture review includes correctness, performance, scale, alternatives, security, compliance, observability, data, messaging, reliability, operations, design and cost. Alternatives and design are absent. Messaging is folded into “data and async work” without being named or checked directly.

Why it matters: Learners can complete the checklist while missing required architecture decisions. Product, design and operations fellows also lose a usable way to review their own work.

Required fix: Add all requested areas explicitly, or explain where each one is deliberately covered. Give each area one plain question and one evidence prompt.

### M5-02

Severity: S2

Location: `05.03-the-founder-version.md:73`; `packages/learning-ui/src/canvas/engineer-depth-ladder/data.ts`, step 4

Observation: “Idempotent retries” is explained as meaning “nothing is sent twice,” and the example says the report is never emailed twice. Idempotence of a job does not by itself guarantee exactly-once email delivery. A crash after sending but before recording completion can cause a duplicate.

Why it matters: This teaches a false reliability guarantee about retries and idempotence.

Required fix: Separate safe repeated processing from duplicate delivery. State the mechanism that prevents duplicate email, or present duplicate delivery as a possible failure and explain the deduplication or transactional design needed.

### M5-03

Severity: S3

Location: `05.06-check-your-work-area-by-area.md:52`

Observation: The chapter says a retry with a growing wait “stops” adding load to a struggling service. Backoff reduces retry pressure, but retries can still add load. The explanation also omits jitter, which helps avoid synchronized retry bursts.

Why it matters: A learner may treat backoff as sufficient protection and miss retry storms.

Required fix: Say that backoff reduces retry rate, add jitter as an optional protection, and name a stopping condition such as a retry budget, deadline or circuit breaker.

### M5-04

Severity: S2

Location: `05.09-checklist.md:66`

Observation: The gate marks the engineer version as Met when only five of six steps have a decision, test or gap. The task itself requires all six questions: what was built, why this way, why not the other way, failure behavior, testing and what would change.

Why it matters: The gate can pass a learner who has not completed a required outcome.

Required fix: Require evidence for all six steps. If one step is unavailable, require an explicit honest gap and first check rather than allowing the step to be missing.

### M5-05

Severity: S2

Location: `05.07-a-demo-they-can-open.md:22, 62 to 70`; `demo-they-can-open/data.ts`

Observation: The demo guidance recommends guest access and role switching, but does not require read-only behavior, resettable data, tenant isolation or protection against one visitor seeing another visitor's changes.

Why it matters: A shared demo account can expose data or allow one reviewer to mutate the state seen by another. This conflicts with the module's otherwise strong privacy and security advice.

Required fix: Add a safe demo contract: synthetic data only, isolated tenant or session state, least access, reset or disposable accounts, and clear read-only behavior where possible.

### M5-06

Severity: S3

Location: `05.05-why-this-and-not-that.md:57 to 66`; `05.06-check-your-work-area-by-area.md:38 to 52`

Observation: Several architecture terms are presented in inventories without a plain definition or an example a non-engineer can use: observability, compliance, event stream, key-value store and alternatives between messaging systems. “Compliance” is reduced to deletion without explaining that requirements depend on the data and context.

Why it matters: Arabic-first learners in product, design and operations may be able to repeat the labels but not apply the questions.

Required fix: Define each term once in plain English, then give one concrete “what would I check?” example. Keep the inventory narrow enough for phone reading.

### M5-07

Severity: S2

Location: `agent-ip/work/founder-interviews/roadmap-confirmation.md`

Observation: The confirmation record has approval from one instructor only. Its outcome explicitly leaves the second-instructor condition unchecked.

Why it matters: The quality gates require at least two instructor approvals before later gates can open. Instructor alignment therefore cannot pass for this review.

Required fix: Obtain and record a second instructor approval, or formally revise the gate status before treating this extension as ready.

### M5-08

Severity: S2

Location: All six canvas `spec.md` files for module 5

Observation: The specs claim tests and acceptance criteria, but no module 5 canvas QA report was found. The repository audit could not be executed in this environment because `node` is unavailable.

Why it matters: The rubric requires both a canvas spec and QA evidence. Without the report, mobile behavior, keyboard access, fallback rendering and edge cases remain assertions rather than verified evidence.

Required fix: Add a dated QA report covering the six canvases, including default, minimum, maximum, edge, mobile, keyboard, dark mode, fallback and reader integration checks.

## What works

- The module clearly distinguishes the founder version from the engineer version.
- The examples consistently reward “I did not test that” over invented confidence.
- Predict interactions have exactly two options.
- Quiz answer positions are varied and distractors are generally plausible.
- The weighted story canvas correctly demonstrates how tool prestige can distort selection.
- The fifty-times canvas labels itself as a toy model and gives a useful load-test limitation.
- The demo chapter handles synthetic data, secrets and weak connections well.
- The prose is generally short, concrete and readable for second-language learners.
- Continuity with modules 1 to 4 is strong around ownership, honest numbers, real reasons and trade-offs.

Recommendation: revise.