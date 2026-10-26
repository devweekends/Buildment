# Proposal: the visual lab module, one per challenge

**Status:** Proposal only (extended 2026-10-25 to every course with labs and to the code lab module). Nothing in `agent-ip/` has been changed to apply it. The first module that follows it, `courses/system-design/30-visual-lab-design-a-url-shortener/`, passes today's audits without any rule change. Delivery lead and one additional reviewer sign-off pending.
**Raised by:** Zeeshan (architect, human sponsor), feedback of 2026-10-25.
**IP version:** v0.5.3; this would make it v0.6.

## Problem

Labs so far are one beat inside a chapter (chapters 2.5, 4.9 and 20.6 each embed a board next to prose). That gives the learner a small board in a narrow column, with its settings crowding the page, and a lab that scores only capacity, p99, availability and cost. The architect's feedback was three things. A system design challenge should have its board as its own module, with its own page. The board should have its component palette on the left and its settings in a dark drawer that opens only when a component's hover icon is clicked, as the reference product does. And a lab should say whether a design passes all checks, functional and non-functional, and let the learner watch the system behave: traffic, saturation and failures.

## Change

1. **A visual lab module is a module of its own.** One per challenge, placed after the challenge's case-study module, named `NN-visual-lab-<challenge>` (for example `30-visual-lab-design-a-url-shortener`). Its title starts with "Visual lab:". It is paired with a code lab module for the same challenge (see the extension below). The module holds five chapters, in this order: a Read chapter that sets the scene and lists the checks (set-the-scene in the file name, so the structure audit finds it), the Build chapter that holds the board (`stepType: Build`, `format: beats`, a `<Lab slug="..." />` that sits in its own beat), a Learn chapter that reads each failure as a lesson, a `-quiz.md` chapter, and a `-checklist.md` Gate chapter.
2. **A lab spec carries a challenge.** `HldLabSpec` gains an optional `challenge`: the peak load, the scenarios (named faults such as "the cache dies"), and the checks. A check is functional (a request can travel a chain of roles, in order) or non-functional (one number from one scenario against a limit, or whether queued work is fully counted after its consumer dies). Every check lists its measured value, its target and, when it fails, its reason. A lab with no challenge is scored on its four targets as non-functional checks, so existing labs keep working.
3. **The spec records how targets were tuned.** `spec.md` for a challenge lists every check with its scenario and limit, a table of designs run through the model (the starting board, a reference design and one variant per check that should fail), how the targets compare with what a real run of the paired code lab measured, and which of that lab's checks the board cannot model.
4. **The board layout is fixed.** Palette on the left. Settings only in a dark cassette that grows beside its component, closed by default, opened from a Tune key that shows on hover or focus (always on touch), one at a time, closed by Escape, a bottom deck on a phone. A Names switch (generic or AWS, remembered) relabels parts and sizes with real AWS names and one-line meanings, with the model unchanged. Run plays the scenarios on the board and then lists every check as pass or fail.
5. **The audit stays as it is.** The module needs `type: mcq` quiz fences, a `*-checklist.md` with a learning log, and a set-the-scene chapter, which the structure audit already demands; `Lab` stays in `restore-block-tags.ts`. The beats audit holds the Build chapter to the same beat rules as other chapters: each beat opens with a visual (`<Lab>` counts), 70 words or fewer visible, the rest in folds.

6. **Every lab with a reference design offers it.** A `solution` on the lab spec (the design, a summary, and per part: why it is there, which checks it helps pass, what fails without it) opens read-only after the learner has pressed Run once and confirmed. It is never locked behind a score and records nothing. It offers Back to my design, Copy to my board (with a confirm), and Compare with mine, which lists differences in plain words and the failing checks they explain, without printing the reference numbers. The reference must pass every check, and a test holds it to that.

7. **The lab pieces are shared UI.** The presentational parts of the board (the part card with its replica core matrix, the glyphs, the wire tag, the cassette and its controls, the run timeline and the verification grid, and the design tokens as CSS variables on `.lab-board`) live in `packages/learning-ui` (`@buildment/learning-ui/lab-ui`) so the web reader and the desktop reader share them, with typed props and no data fetching. A dev-only gallery (`/zz-lab-gallery`) shows each piece in every state, in light and dark, with generic and AWS names.
8. **Plain words first.** Visible lab text leads with plain words and puts the technical term in brackets once, where it first appears or in a tooltip (for example "slowest 1 in 100 requests (p99)", "nearly full (saturated)"). The AWS names switch keeps the real names available.

## Extension: two modules per lab topic, in every course with labs

The same shape applies to any course that has labs: infra, Kubernetes, Docker, networking, system design and the rest. Nothing here is applied yet.

1. **Scope.** For each lab topic there are exactly two modules, side by side: **"Visual lab: <topic>"** (the board, its checks and a solution) and **"Code lab: <topic>"** (the hands-on repository). The exact prefixes matter: the sidebar shows only the module title today (`chapter-sidebar.tsx` renders `mod.title` with a number and a completion count; the module model has no icon or kind), so the prefix is what makes the pair easy to spot. A separate icon or label would need a `kind` on the module (schema, course manifest and sidebar), which is a later platform change, not part of this proposal.
2. **Placement.** The pair sits right after the topic's case study module (module 30 after module 20 for the URL shortener, until a release can reorder). A course with no code repository (a pure concept course) has no code lab module and, if it has no board, no pair at all. A visual lab without a code lab is allowed; a code lab without its visual lab is not, because the code lab replays the board's design.
3. **Why it matters comes first.** Every lab module opens with a short "why this matters" that makes the learner think before touching anything: a concrete question from the learner's world that they must predict ("What do you think happens to the typical wait when the shop is 90 percent busy? Write your guess, then run it"). Every lab module closes with a reflect step where the learner explains the result in their own words and says how it compared with their guess. This follows the course teaching style: why before what, a hook from the learner's world, the real system over analogies, build and see.

### Visual lab module template (five chapters, as module 30)

Set the scene (the prediction prompt, the brief and the list of checks), the board page, a Learn chapter that reads each failure, a `-quiz.md`, and a `-checklist.md` gate whose last part is the reflect step.

### Code lab module template (six chapters, then a quiz and a checklist)

| Chapter | What it holds |
|---|---|
| Why this matters and what you will do | A real question from the learner's world to predict first, what the real stack is, and what they will measure |
| Set up and run | The repository link, one command to start it, what a healthy run looks like, and what to do when it does not start |
| Your turn | Tasks with directions and no answers: change one thing, predict, run, read the number |
| Check your result | The learner's numbers against the real measured numbers of the repo (`results.md`), and the paired visual lab check ids each result maps to |
| Solutions | Kept apart from the tasks, opened on purpose, with the reasoning and not only the answer |
| Reflect | Explain the result in your own words (an `openquestion`), compare it with your first guess, and name one thing the board could not show |
| Quiz and gate | A `-quiz.md` chapter of `type: mcq` scenarios, then the `-checklist.md` Gate with a learning log and a short written report |

The repository carries a **contract file** (`visual-lab-contract.md` and a JSON copy) that lists the components, the knobs and the checks, each with an id that matches the visual lab's check ids, and which checks the board cannot model. The first example is `system-design-labs/labs/lab-1-url-shortener`: `CHAPTER-code-lab.md` is the chapter draft and `visual-lab-contract.md` is the contract. Its three parts (the codes, the cache, break it) become the "Your turn" tasks.

### Quality gate

The pre-PR click-through gains two checks for any lab module: the prediction prompt exists in the set-the-scene chapter (a `predict` fence with a question from the learner's world), and the reflect step exists in the closing chapter (an `openquestion` that asks for the result in the learner's own words). The structure audit already requires a set-the-scene chapter and a `*-checklist.md`; a check for the prediction fence and the reflect question would be a small audit addition, proposed here and not made.

## Evidence

The URL shortener module built on this shape: 11 checks (3 functional, 8 non-functional) over four scenarios, targets tuned against the model and compared with the paired Docker code lab's measured numbers (`system-design-labs`, lab 1, `visual-lab-contract.md`). The model needed small honest additions to score it: a worker batch size, queueing wait and cost per component, inline click writes for a design with no queue, and a "consumers down" note. 64 lab unit tests pass, and the structure audit and the beats audit pass with no flags.

## Files that would change if accepted

`02-course-architecture.md` (the module type and where it sits), `04-interactive-playbook.md` (the `<Lab>` tag in a Build chapter), `08-templates.md` (the five-chapter module template), `agents/chapter-writer.md` and `agents/interactive-canvas-builder.md` (when to author a challenge), and `06-quality-gates.md` (a click-through of the board at 375 px and desktop, light and dark, one passing and one failing design; the prediction prompt and the reflect step), and `03-authoring-standards.md` (why it matters comes first in a lab module).

## Risks and how we hold them

| Risk | Hold |
|---|---|
| A board with eleven checks overwhelms a beginner | The board starts with a small working design, every check is listed before the first Run with its target, and a failure names the part and the number |
| Model numbers read as real numbers | Targets compare shapes; the spec and the Read chapter say the milliseconds are model units and cite what the real stack measured |
| The module sits after the capstone | Chapter slugs use module order, so inserting a module in the middle would renumber published chapters; a release can reorder later |
| A hard-coded check list drifts from the code lab | The spec maps every check to the contract's check id and lists what the board does not model |
