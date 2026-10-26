---
artifact: revision-brief
course: career-brand
round: 1
inputs: qa/critique-b.md (drafting family, blind), qa/critique-a-modules-123.md, -456.md, -789.md (second model family, blind, quotes checked by script), qa/blind-keys (110 of 110 keys matched on the second family)
owner: orchestrator
---

# Revision 1 brief

The orchestrator checked every defect below against the files. Defects that were wrong are listed at the end with the reason, so do not fix them. Keep every chapter passing `node agent-ip/scripts/audit-course.mjs courses/career-brand` (beats, 70-word beats, 300 to 700 visible words, 900 depth) and keep quiz and predict **key positions and relative lengths as they are** (re-check with the bias script the orchestrator runs; if you must change an option, keep the key no more than 10 percent longer than the longest wrong option, and keep its position). Predicts must keep exactly two options (the structure audit requires two).

## Global fixes (every module: apply to your own chapters and canvas data)

- **G1 Course 14:** refer to "The Founder Interview" course by name only. Remove every module number, module title and chapter number of course 14 (it is still in review and may change). "Take it next" may stay as "the companion course, The Founder Interview".
- **G2 Production words:** no "beat", "canvas", "fold", "spec", "brief" or "canon" in learner text or canvas strings. Say "the next picture", "the picture above", "the section 'X'", or a chapter number. Delete writer-rationale sentences (for example "Areej's equipment is mentioned once, as a plain fact." in 3.5).
- **G3 Jargon:** a plain gloss at first use in each chapter where it appears: seeded (demo data made up on purpose), staging (a private copy of the app for testing), callback (the employer replies and asks for an interview), field experiment, throttled, parser, preprint, population-level. The p95 gloss becomes "the time that 95 of every 100 requests finish within" (never "beat").
- **G4 Flags:** gate 1.6 defines the five flags in one plain line each, with a short example (use the wording in chapter 9.2). Later gates refer back: "the five flags from gate 1.6".
- **G5 Repetition:** the "fictional" note appears once per chapter at most, in different words; drop it from chapters that do not introduce a new person. In each quiz chapter only the first stem says "In this made-up case"; vary the others. Gate commentary ("Here is a strong answer...", "Look at the shape of...", "That reply is part of the gate...") varies in wording from module to module.
- **G6 Duplicate teaching:** the AI rule ("restructure your own material, never add numbers, ownership or experience") and the no-work-yet path are taught in full in 2.5 only. Later Build chapters keep a two or three sentence reminder that points to 2.5, plus their own chapter-specific prompt.
- **G7 Place names:** in learner text use "from where you are" for access notes; do not name Gaza or Palestine in platform-access or trade-control notes.
- **G8 Sentences:** split any learner-text sentence over 30 words; aim under 20.
- **G9 Headings:** no first sentence that repeats its heading.
- **G10 Predicts:** the wrong option must be a mistake a thoughtful learner could make, not a straw man. A predict must not ask for a fact the learner cannot know before the picture shows it, and must not come after the beat that reveals its answer. Read (set-the-scene) predicts ask only "what do you notice?" in everyday words.
- **G11 Diagrams that restate:** where a MermaidDiagram only chains a list that the text under it repeats, replace it with a diagram that argues (a contrast of two paths, a before and after, a loop, a decision with two branches), or make the text say something the picture does not. Use the `MermaidDiagram` tag, never a raw ```mermaid fence.
- **G12 Credits:** at most three researchers or organisations named per chapter; put other names in the "Sources" section by finding only.

## Module 1 (and 1.1 to 1.6)
- 1.1: move `ProjectPreview` and `Roadmap` out of a beat (before the first `##` heading or after the last beat). Wellbeing contact: one always-visible line in 1.1 (not only in a fold) saying a named coordinator is reachable by phone and the instructors give the name; repeat one line in 1.6.
- 1.2: heading "The famous six seconds has no source" becomes "The six seconds comes from one company's study" (and the 1.6 recap says "no reliable source"). The Mermaid diagram's arrows must not say missing details caused the measurement: show the claim, the study, what the report left out, what it measured, as a chain that argues. Name Bashar's two proof blocks in the text before the picture.
- 1.3: the MCQ about Basil's six lines: lines 2 and 5 appear only in the key, so a learner can eliminate by one line; rebuild the options so each checkable line also appears in a distractor. Keep the key's position and relative length. The predict "Which of these two lines could a founder check without asking you?" conflicts with the fold ("A reader may not be able to open that dashboard"): reword to "check or ask to see".
- 1.4: "About as well as picking at random" becomes "could not reliably tell them apart" (chapter and canvas `career-m1-guess-the-writer` if present). Credits: at most three names.
- 1.6: drill opening asks for three lines (it matches the written option); say in the rubric section that the feedback reflection is not graded. G4 flag definitions.

## Module 2
- 2.2: pillar 3 has two proofs from different places (proof 1: replaced the leaked key and turned on push protection; proof 2: asked before using the company chart), matching 2.5. The quick check's statement 1 has only one proof: fix it so the key holds under the two-proof rule. Diagram node "Wrote down the 20 May release that week" must be self-explanatory. Areej's invoice script result must use one metric everywhere, from `module-briefs/00-areej-and-cast.md` (check 2.2, 2.3 and every later mention in your modules).
- 2.3 and the canvas `career-m2-found-vs-team`: leaving out the team's or the lead's part so yours looks bigger is **omission** (leaving something out to mislead), not embellishment (making something bigger than it was). Keep "when it is meant to mislead". The predict "Areej found the slow query; her lead reviewed and scheduled the release..." gives the answer in its premise: describe the work without sorting it, and let the options sort it.
- 2.4: Areej's football notebook line is used once per page (LinkedIn About, and the website About may use it); change "uses the notebook line once" to "once on each page, never as a slogan". The predict distractor "The one story that flatters you the most" is a straw man: replace with a plausible wrong choice.
- 2.7: Part 4 "At least two items are named as private" becomes "Every private item has a reason", no minimum.

## Module 3
- 3.2: "five short questions ... cover six parts" says in one clause how they map; write "chapter 3.5", not "module 3.5", in `career-m3-what-else-changed`.
- 3.4: in the Sources section, drop the sentence naming the system design chapter the two reused pictures come from; keep the reuse. "busts 99.95 percent" becomes "breaks 99.95 percent".
- 3.5: delete "Areej's equipment is mentioned once, as a plain fact." (G2).

## Module 4
- 4.1: the predict must be an everyday "what do you notice?" question about Sireen's story, answerable from the scene.
- 4.2 and 4.5 and module 5: Raqim Stock is a **plan**. Areej's AI-use log line, the bug found and fixed, and anything "ticked" are labelled as **planned** or **what she will log**, never as done. The quiz-score predict and the study fold: describe each study by direction and setting, no percentages (dossier "What not to teach": no speed multiples). The quiz 4.6 Q5 AI answer may still contain "55 percent faster" as the mistake to spot; its key must test one thing (the speed claim), not two.
- 4.3: the canvas title "Run five ideas through the filter" becomes "Run eight ideas through the filter" (the roadmap's five ideas are inside the eight). The open source quick check about "about three hours this week" needs a distractor that fails on time scope.
- 4.4: the predict comes before the text that reveals the answer ("Supplier orders do not fit, so they are cut for later"): move the predict up or move that sentence below it. The low-stock alert is part of the core flow in 4.5 and 4.7; make 4.4 agree (use CSV export or a second shop as the add-ons).
- 4.5: give Areej's plan hours per part (the core flow, the alert inside it, and the three cuts) that sum inside her appetite, so gate 4.7's rubric can be applied to her case. Put the privacy step (remove names, local business identifiers, private numbers) **before** the AI prompt block. The template says "the five steps in chapter 4.3" but has eight parts: say parts 1 to 5 follow 4.3 and parts 6 to 8 add the number, the time box and the AI-use log.
- 4.7: the mentor key uses Areej's new hours (no "her material gives no hours").

## Module 5
- 5.1: the predict names Sireen and "the interviewer": it must be about Moath and the founder, as an everyday "what do you notice?" question.
- 5.3: heading "A demo login that can do everything" becomes "A demo login that opens every core feature"; say plainly that it has small rights and the owner's real rights stay out. The quick check distractors "Use the shop owner's real admin login..." are too reckless to be plausible: replace with near-misses (for example a shared demo login that can write to the real database, or one with no reset).
- 5.4: the storyboard sum must list all five parts: 15 + 20 + 25 + 15 + 15 = 90. Areej's checklist is planned, not ticked (see 4.2).
- 5.6: same: planned, not ticked.
- 5.8: remove "Her request to the AI interviewer was refused in this drill, so she took the written option." Say instead that she chose the written option this time (no reason needed), or that her connection dropped.

## Module 6
- 6.2: "A consultant tried to trace the figure..." becomes "One consultant who traced it reports that it came from ...", and keep "nobody has a sourced figure". The predict about the 75 percent figure asks for a fact the learner cannot know: reframe it as a judgment the chapter's picture shows.
- 6.3: omission, not embellishment (see 2.3).
- 6.6: convert the raw ```mermaid fences to `MermaidDiagram`; delete the "What to notice / The takeaway / Hint" wrappers. Areej's mapping table needs a row for every bullet with a number or result (add the Campus Board, club migration and double-booking rows from her ledger, using the canon numbers).
- Waed's model bullet (6.1, 6.3, 6.4 and the canvases `career-m6-adjectives-or-fact`, `career-m6-duty-vs-bullet`, `career-m6-empty-phrases`, `career-m6-missing-tracker`): give an exact count from the tracker (not "about 30"), name what else changed, and say her part and the team's, consistently in every place.

## Module 7
- 7.1: Premium "lets him personalise as many invitations as he likes" becomes "raised the number of personalised invitations he could send (checked 2026-10; your screen may differ)". The predict sits after the text that explains why the notes failed: move it before, as an everyday question.
- 7.2: the beat "Open to Work and your profile address" shows only Open to Work: retitle it "Who sees Open to Work" and put the address in its own beat or fold.
- 7.3: the predict asks what LinkedIn's help page says (unknowable): reframe as a judgment. The quick check whose key repeats the four-part list word for word: give four real draft outlines for Nuwar and make the learner pick the one that has all four parts.
- 7.4: Areej's "3,840 ms to 46 ms" must be a number from her ledger in `00-areej-and-cast.md` (if the canon has an EXPLAIN ANALYZE pair for the report query, use it exactly with "in a query plan on a copy"; otherwise use her p95 figures).
- 7.5: the diagram must show the ledger feeding About, Experience and Featured, and About feeding the headline. `estimatedMinutes` becomes 80 (also in course.yaml).
- 7.6: Q1's key headline contains a number, but 7.2 teaches that a headline holds no number: make the key headline follow 7.2. Q about Ahlam: remove the parenthetical rule from the stem, and make the key spend or keep all three notes explicitly. The option that repeats 7.3's sentence word for word: reword.
- 7.7: the written task asks for about 200 words (raise `minWords` only if the rubric needs it).

## Module 8
- 8.1: the predict is answered by the paragraph just above it: make it an everyday "what do you notice?" question before that paragraph.
- 8.3: the beat "Map your ten channels" maps eight: retitle "Map eight of your channels" and say the other two are in the table. Replace row 10 (a personal message to a former teaching assistant) with a public channel; private messages are module 7. G7 for the access note.
- 8.5 and 8.6: convert raw ```mermaid fences to `MermaidDiagram`. 8.6: "It has seven parts" must match the template (say "one page with these headings").

## Module 9
- 9.1 and 9.6: one capstone rubric. Use the six parts in 9.6 everywhere (9.1 says six parts, with the same pass rule). "The stranger test passed on a phone at gate 5.8" becomes "was run and reported at gate 5.8".
- 9.3: `estimatedMinutes` becomes 50 (also in course.yaml).
- 9.4: check the `urlHint` on the defence open question names the right path letter for the recorded walkthrough.
- 9.5 Q1 and Q2: three of four options say "Nothing is missing here": rebuild each so the learner chooses which missing part matters most, keeping the key position and relative length.
- Names: one "Ghaith" is a web developer in 4.6 and another is a Python developer in 8.8: rename the one in 8.8 (writers of modules 4 and 8 coordinate through the orchestrator: module 8 renames). Keep names in one module visibly different.

## Not to fix (checked and rejected)
- Second family: "`minWords` above 0 traps voice-note answers": the gates ask for a written answer; the hint now says the audio link is optional and alongside the written answer. The recorded defence in 9.4 already has `minWords: 0`.
- Second family: "the mentor key in `modelAnswer` is visible to learners": the importer stores it as `sampleAnswer`, which the server strips from every learner response (`server/src/utils/sanitize-block-config.ts`).
- Second family: "02.04 is cut off mid-sentence": the file is complete; the reviewer's input was truncated.
- Second family: "replace the community cloud example" and drafting family B25: the sponsor asked for this example by name. It stays, with the standard definition, never presented as anyone's project.
- Drafting family B37: the two reused system design pictures stay (the IP prefers reuse); only the sentence naming the other chapter goes.
- Drafting family B38: recaps and learning logs are required by the gate format.
- Second family: "8.3 shifts the access test to fellows": open decision 14 for instructors; the line stays, worded per G7.
- Second family: "4.2 slot card is a form": the slot card is a playable primitive the learner fills by tapping and dragging, with a verdict; it stays.
