---
artifact: context-pack
course: build-with-ai
for: chapter-writer (round 3, targeted fixes after the second critique round)
version: 1
---

# Round 3: targeted fixes

Round 2 results: critic A 4.14 (narrow revise, every dimension at 4 or more, 0 new S1 or S2), critic B 4.43 (approve). agent-ip allows two critique rounds, so there is no third critic round: these fixes go to human review with the report. Reports: `../qa/critique-a-r2.md`, `../qa/critique-b-r2.md`. Fix exactly the items below, nothing else. The writer pack and `revision-r1.md` still apply (no em or en dashes, sentences of 30 words or fewer, prose minimums, five MCQs per quiz, allowed tools only, no `ChapterRecap` outside gates).

## Fix

1. **Lab log start (A N-1, B S3-N1).** `05.02` section "Feeling faster is not being faster": "From week 5, when her lab log starts" becomes "From week 7, when her lab log starts". `05.05`: lab day 9 is in week 9 (not week 7); the reuse is also in week 9.
2. **First slice (B S3-N2).** In `01.05`, add one or two sentences: the first slice was a rough start built quickly with AI help to see the idea run; her plan then learns and rebuilds each area in order (the database in week 3, short codes in week 9, click counts in week 11). Reword "within reach of anyone with an AI coding assistant" to tie it to Khaled's case or "many people, as Khaled's weekend store showed".
3. **Weak predicts (A O-1).** `02.03`, `04.01`, `04.05`, `05.04`, `06.01`: for each, move the clue that gives the answer to after the predict, or rewrite the predict so a naive guess can be wrong (as done in `02.04`, `03.06`, `05.02`). In `02.03` the option labels must not nudge ("does a bit of everything"). In `06.01` the correct label must not state the lesson. Keep one predict before each Learn chapter's canvas, the correct label never 10% or more longer, and update the canvas `tryThis` first line only if the predict's question changes.
4. **Gates 4 and 5 give less help (A O-3).** In `04.07` and `05.07`, remove the weak example and add one sentence: "This gate gives you less help than the earlier ones, on purpose: you now have the habits." Keep the prose at 700 words or more (explain the strong example's reasoning more if needed).
5. **Networking examples (A O-6).** In `03.03` and `03.04`, where the second topic is networking (DNS, TCP and UDP), switch the second worked topic to the community library's laptop-lending rule from `03.02` (or another everyday rule). Lina's own exam case may stay networking but with no technical detail beyond one plain sentence. Check that every quiz item and canvas in those chapters still matches the text.
6. **Ambiguous key (A N-2).** `03.07` item 3: make the two pages distinct ("page 5 lists the volunteers' names and phone numbers"; "page 6 shows the Wi-Fi password") so "remove two pages" is unambiguous.
7. **Gate 2 rubric (A N-3).** `02.06`, row "Checked and dated": Partly: "most rows have a date, but up to two rows miss an answer or rely on a video or a friend"; Not yet: "half or more of the rows have no date, or three or more rows have no answers".
8. **Small items (A N-4 to N-7, B S4).**
   - `06.04` summary: say "five new cases from across the course" (it has no module 4 item; do not promise every module) or swap one module 2 item for a lab case; either is fine.
   - `01.05` item 2: add "the demo cannot be fixed before the library opens" to the stem.
   - `02.03` item 2: "since the laptop has one" becomes "since the laptop has a browser".
   - `05.06` item 4: make the two database options begin with different words so the key does not stand out by its opening.
   - `01.02` predict: the email option matches the plan's words ("each order is emailed to the shop").
   - `04.05`: drop "GitHub's website also lets you create or edit a file in the browser" (no dossier source).
   - `04.01`: drop "and those are the days she remembers best".
   - `04.03`: Yara's saved prompt says "Level: beginner, new to caching".
   - The name Asma: keep it in `01.02`; rename the `01.04` bootcamp student (use Kinan's pool name "Lubna").
   - Vary the closing "The mentor then replies with one or two short questions" sentence in two gates.
9. **Long sentences (B S3-N3).** Split: `05.02` first paragraph (32 words), `06.01` two sentences (32, 31), `06.03` the "Notice the step people forget" sentence (34), `06.05` the Ibrahim part 4 line (44), `04.05` quiz 1 stem (35).
10. **Frame variety (A O-7).** In at least six of the seventeen "Where it goes wrong" sections that open "The first mistake is", change the frame: one worked failure, a question, or a short contrast.

## Do not change
- The MCQ key length spread (longest 34%, shortest 34%, middle 32%, positions 22 to 28%): it is balanced on purpose.
- Canvas renderers or any slug, `registry.ts`, `slugs.ts`, `course.yaml`, `six-month-hours-split`.

## When you finish
From `server/`: `node node_modules/tsx/dist/cli.mjs scripts/validate-course-source.ts --course build-with-ai` and `node node_modules/tsx/dist/cli.mjs scripts/audit-course-structure.ts --course build-with-ai`; from the repo root: `node agent-ip/scripts/audit-course.mjs courses/build-with-ai`. All clean. No em or en dashes, LF line endings. Report each item number with what you changed, every MCQ or predict whose text or key changed (chapter, item, key), and the new prose words for any chapter you edited.
