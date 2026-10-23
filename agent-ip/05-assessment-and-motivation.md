# Assessment and Motivation

This document defines how we measure learning and how we keep a learner moving without turning the course into a points game.

## Assessment is evidence, not activity

An assessment exists to produce evidence of an outcome. If it produces a click, a score, or a completion badge without evidence, it is theatre.

Every assessment must be traceable to an outcome from the blueprint. If an outcome has no assessment, the course cannot claim it. If an assessment serves no outcome, cut it.

## The evidence ladder

Use the lowest level that actually proves the outcome. Do not use a quiz to measure something that requires a build.

| Level | Evidence | Typical instrument |
|---|---|---|
| 1. Recall | Can state a definition or fact | Quiz |
| 2. Comprehension | Can explain a mechanism in own words | OpenQuestion, LearningLog |
| 3. Application | Can use the idea in a new case | Quiz scenario, CodeExercise, build task |
| 4. Analysis | Can diagnose why something failed | Predict, OpenQuestion, debugging task |
| 5. Evaluation | Can choose between alternatives and defend the choice | OpenQuestion, architecture defense, code review |
| 6. Creation | Can build a working artifact | Capstone, deployed product |

Most chapters should target levels 3–5. A course made only of level 1–2 evidence produces learners who can talk about the work but cannot do it.

## Constructive alignment

For every outcome:

- the **activity** teaches the skill;
- the **assessment** measures the same skill at the same level;
- the **feedback** tells the learner what to do next.

If the outcome says "design a schema", a multiple-choice question about schema normalisation is misaligned. The learner should produce a schema and defend it.

## Assessment types

### Quiz

Use for recall, comprehension checks, and small application decisions.

Design rules:

- Put the question in a scenario. "A buyer holds the last seat; a second buyer arrives at minute 4. What should the API return?" is better than "What is a hold?"
- Every distractor must be plausible. If a learner can eliminate three options by length or grammar, the question is not measuring understanding.
- Option length must not predict correctness. Do not make the correct answer the longest option, and do not write distractors as short labels while the correct answer is a full explanation. Keep lengths comparable and vary the position of the correct answer. The same rule applies to predictions and knowledge checks.
- If the correct option is the longest in half or more of a quiz set, rewrite the set even when each question is close. That pattern teaches "pick the longest option", not the concept.
- Avoid "all of the above", "none of the above", and joke options.
- Do not test a fact that the learner can look up in ten seconds unless the fact is a decision input.
- Include an explanation for every option. The importer's MCQ fence takes an `explanations:` list, one reason per option; in the in-app editor, use the block's explanation field.
- Do not grade opinion. If an expert could reasonably pick a different option, move the question to an open question.
- Three to five questions per quiz chapter. More than that is a test, not a check.

### Answer-key check

An answer key written by the same agent that wrote the question is not checked.

- **Re-answer every key blind.** A second agent from a different model family, or a person, answers every quiz question and prediction without the key or the explanations, and drafts an answer to every open question without the model answer.
- **Compare.** Any disagreement is a defect until the question, the options or the key is fixed. Ambiguity counts as a disagreement.
- **Use the script.** `node agent-ip/scripts/blind-keys.mjs extract content/import/<slug> <out-dir>` writes keyless batches and a separate `keys.json`; give the reviewer only the batches, then run `compare <out-dir>`. The reviewer sees each question without its chapter, so open every item it marks medium or low in the chapter: if the context it needed is in the prose just above the question, record that and leave the item; otherwise rewrite it.
- **Check against the reference build.** Every key and model answer must match the course's reference code (`02-course-architecture.md` → Reference builds).
- Record the check in the assessment plan.

### Code exercise

Use for a small, isolated skill with a clear pass condition.

Design rules:

- One skill per exercise. If it needs three concepts, split it.
- The test suite defines done. At least one test covers a failure mode.
- Hints reveal the next decision, not the implementation.
- The solution is server-only and revealed after a pass.
- Do not use a code exercise for a full feature. The build task and the learner's own tests are the evidence.
- Do not hide a requirement in the tests that the prompt does not state. That teaches guessing, not engineering.

### Open question

Use when the answer requires judgment, explanation, or evidence a machine cannot grade.

Design rules:

- Only when the answer is worth a mentor's time. Never use it as a generic "what was your takeaway?".
- Give a rubric in the block config. The rubric is server-only.
- Write the model answer to show the shape of a strong response, not the only acceptable wording.
- Use `minWords` honestly. A 40-word minimum for a 120-word question teaches padding.
- Use the right submission mode: text, URL, article, or video demo.
- When a link to a recording may be the whole answer, set `minWords: 0`, or the answer never reaches review (`04-interactive-playbook.md` → `OPEN_QUESTION`).
- Tie the question to a decision the learner has just made. "Defend the hold-expiry value you chose" is stronger than "Explain holds."
- Plan a follow-up step: the mentor asks one to three follow-up questions and the learner answers them before the work counts as reviewed.
- Never require or grade personal hardship (`03-authoring-standards.md` → Audience: the fellowship).

### Interactive canvas

Use a canvas as **formative exploration**, not as graded evidence by default. It lets the learner manipulate a causal model and see the output change. That is valuable, but it is not proof of understanding on its own.

Design rules:

- Put a prediction before the canvas: what does the learner expect to happen?
- Put a transfer check after the canvas: a quiz, an open question, or a build task that applies the relationship in a new context.
- Do not count slider use, button clicks, or time on the canvas as completion.
- If the canvas records a response, define exactly what is stored and how it is graded. Otherwise it is a component, not an assessment.
- State the model's limitations so the learner does not overgeneralise.
- If the learner cannot state the claim after using the canvas, the canvas failed as teaching, regardless of how engaging it felt.

See `10-interactive-canvases.md` for the design and QA contract.

### Capstone and milestones

The capstone is the highest-weight evidence. It must be:

- deployed at a real URL;
- testable by a mentor without reading the code first;
- defensible in a walkthrough;
- accompanied by a README, a runbook, and a short architecture note;
- scoped so a learner can finish it in the time budget.

Milestones are checkpoints along the way. Each milestone produces a demo or an artifact, not a status update.

## Feedback

Feedback is part of the assessment, not a courtesy.

- **Immediate for auto-graded work.** The learner should know whether the answer is right and why before moving on.
- **Delayed and specific for open work.** The mentor responds with the rubric dimension, the evidence, and one next action.
- **Faded over time.** Early chapters provide worked examples and prompts; later chapters remove them. The learner should internalise the check.
- **Corrective when the error will persist.** If a learner is likely to carry a misconception into the next chapter, correct it now. Do not let "productive struggle" become "confident wrong".
- **Never humiliating.** Critique the artifact, not the person. "This handler trusts the client's `buyerId`" is useful; "you clearly don't understand auth" is not.

## Retrieval, spacing, and interleaving

These are the strongest evidence-based levers we have. Use them deliberately.

- **Retrieval.** Ask the learner to recall a decision or mechanism before showing it again. Use a short quiz, a LearningLog prompt, or a "close the docs and write the invariant" task.
- **Spacing.** Revisit important ideas in later modules, not only in the chapter that introduced them. A concurrency invariant introduced in week 2 should appear in a week 3 debugging scenario.
- **Interleaving.** Mix related problem types so the learner must choose the method. Do not interleave unrelated topics; the value is discrimination, not randomness.
- **Variation.** Change the surface details while keeping the underlying idea stable. A hold on a seat, a slot, and a ticket class are the same invariant with different nouns.
- **Reduced feedback.** Once the learner can attempt the task accurately, remove the prompt and ask for a self-check.

Do not add difficulty before the foundation is secure. The test is whether the learner can make a successful attempt and whether a later check improves.

## Desirable difficulty, not accidental confusion

A difficulty is desirable when:

1. the learner has the prerequisite knowledge;
2. the effort targets retrieval, selection, or application;
3. the result can be checked later.

If learners cannot start, they are not struggling productively; they are missing a prerequisite. Restore the scaffold, reteach the foundation, or shorten the delay.

## Cognitive load and expertise reversal

- **Novices need worked examples.** Show the reasoning step by step before asking for independent production.
- **Experts are slowed by over-scaffolding.** Once a learner can do the task, remove the template. A step-by-step guide for an expert is extraneous load.
- **One new hard thing at a time.** New syntax, a new tool, a new domain rule, and a new architectural pattern do not belong in the same chapter.
- **Separate intrinsic load from extraneous load.** The domain is allowed to be hard. The UI, the instructions, and the environment are not.

## Motivation

The course should feel like progress toward a real capability, not a slot machine.

### What sustains motivation

- **Autonomy.** The learner makes real decisions and sees the consequence.
- **Competence.** Each chapter produces something that works and can be shown.
- **Relatedness.** A mentor or cohort sees the work; the learner is not alone.
- **Progress visibility.** The learner can see what they have built, not only what they have read.
- **Meaning.** The project is a real product with a real user, not a toy.

### Gamification rules

Use mechanics that reward evidence, not activity.

Good:

- **Ship log.** A running record of what the learner deployed or proved.
- **Milestone badges** tied to a demo, a test suite, or an architecture defense.
- **Streaks** for sustained practice, with a grace mechanism so a missed day does not destroy motivation.
- **Stretch labs** unlocked by core completion, not by points.
- **Progress bars** that reflect completed evidence, not pages scrolled.
- **Cohort showcases** where learners demo, not compete on a leaderboard of clicks.

Bad:

- Points for opening a page, watching a video, or clicking "next".
- Leaderboards that rank learners on speed or volume.
- Badges for reading without evidence.
- Streak mechanics that punish illness, work, or caregiving.
- Confetti for trivial actions; it trains the learner to chase the reward instead of the work.
- A "completion" state that can be reached by skipping the build.

### The motivation test

For every mechanic, ask: does this reward the behaviour we actually want? If the answer is "it rewards engagement with the platform", cut it. We want engagement with the problem.

## Adaptive learning

Adaptivity should reduce unnecessary time, not create a maze.

- **Entry diagnostic.** A short check maps the learner to core, stretch, or repair.
- **Repair path.** Targeted refreshers for missing prerequisites. Link to the exact concept, not a generic "learn JavaScript" course.
- **Core path.** The minimum sequence that reaches the outcomes.
- **Stretch path.** Optional harder constraints, a second persona, performance targets, or a deeper security review.
- **Hints.** Progressive hints that reveal one decision at a time. The last hint may show a pattern, never the full solution.
- **Self-check.** A learner can test understanding before a gate without needing a mentor.

Do not branch on learning styles. There is no credible evidence that matching instruction to a "visual" or "auditory" style improves learning. Branch on prior knowledge and demonstrated performance.

## Attention, pacing and support

Learners have limited attention, and many study around work, family and unreliable power or internet. Design for the attention they actually have.

- **Short units.** A chapter is 10 to 25 minutes. A learner who loses power mid-chapter should lose at most one short section, and every interaction saves on its own.
- **Productive days.** Learners have different days and times when they study well. The platform should learn this from activity (with consent) and schedule reminders and deadlines around it, never at night in the learner's time zone.
- **Reminders.** A reminder names the next small step ("finish chapter 3.2, about 15 minutes"), not a guilt message. The platform already sends inactivity nudges; they should use the learner's productive days and stop after a few unanswered reminders, handing over to a mentor.
- **Adaptive help.** When a learner is stuck (repeated wrong answers, long inactivity on one chapter, a help request), offer the next hint, a repair chapter, or a mentor, in that order.
- **Hand-holding that fades.** Early modules give worked examples, checklists and templates; later modules remove them on purpose. Say so in the chapter, so the learner sees it as progress, not as missing help.
- **Engagement means engagement with the work.** Use the motivation rules above: progress on evidence, cohort showcases, streaks with grace days. Never punish a learner for a power cut or a family emergency.
- **A real person for wellbeing and harassment.** Every course names a person learners can reach about wellbeing or harassment. Reminders, adaptive help and models never stand in for that person (`03-authoring-standards.md` → Audience: the fellowship).
- **Never grade hardship.** A learner is never required to share personal hardship, and anything they share is never scored.

## Integrity and AI use

- **Auto-graded work is server-side.** Quiz and code grading happen on the server. Do not trust client-reported scores for high-stakes assessment.
- **Open work is reviewed.** A mentor grades the artifact and the explanation.
- **AI assistance is allowed only where the course says so.** If the course permits AI for drafting, say what must be the learner's own: the decisions, the debugging, the defense.
- **The defense is the integrity check.** A learner who cannot explain their own system has not completed the outcome, regardless of the artifact.
- **Do not design assessments that a model can pass without doing the work.** Ask for the learner's specific trade-offs, failures, and evidence.

### Quiz integrity signals

- **Signals are flags for mentors only, never penalties.** Leaving the tab, leaving full screen or answering very fast is shown to the mentor as context. A signal never changes a score, locks a quiz or fails a learner on its own. A dropped connection or a power cut can look like any of them, so the mentor talks to the learner before acting.
- **The learner does not see a count of their own flags.**
- **Camera stills are optional per course,** and off unless the course turns them on with a stated reason. The learner gives explicit consent before any still is taken. If the camera is off or drops, the quiz continues and the mentor sees "camera off". A learner is never locked out and a submit is never refused. Stills are stored privately, visible only to the course's mentors and admins, and deleted after 30 days.
- **Full screen is requested, never required.** iOS cannot do full screen, so a learner on iOS must still be able to submit.
- **Copy, paste and right-click on quiz questions are blocked and logged.** This is a restriction, not a flag.
- **The web cannot block screenshots.** Never promise learners or mentors that it can. Make a screenshot useless instead: scenarios tied to the learner's own build, and the defense.

## Assessment review checklist

Before an assessment ships:

- Does it measure an outcome at the right level?
- Is the scenario specific to this product?
- Are the distractors plausible?
- Is the answer unambiguous to an expert?
- Are option lengths balanced, so the correct answer is not identifiable by being the longest?
- Is the correct option the longest in half or more of the set? If so, rewrite the set.
- Is there an explanation or rubric?
- Was every key re-answered blind, and does it match the reference build?
- Is any graded question a matter of opinion?
- Is the difficulty appropriate for the prerequisite level?
- Could a learner pass by guessing or by copying?
- Does the feedback tell the learner what to do next?
- Is the assessment accessible?
- Is the answer key server-side only?
- If a canvas is used, is there a prediction before and a transfer check after?
- Is the canvas's claim stated, and can the learner explain it afterwards?

If any answer is no, the assessment is not ready.
