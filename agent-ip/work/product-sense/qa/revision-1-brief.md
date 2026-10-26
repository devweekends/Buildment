---
artifact: revision-brief
course: product-sense
round: 1
sources: critique-a.md (critic A, drafting family, 3.70, 0 S1 / 9 S2 / 21 S3 / 3 S4), critique-b.md (critic B, second family, 4.59, 3 S1 / 7 S2 / 5 S3 / 1 S4), blind keys 107 of 107 matched, bias script
---

# Revision 1 brief: product-sense

Read this with the writer pack (`../context-packs/writer-pack.md`), which still applies in full. Every item below was checked against the files by the orchestrator. Items marked "not a defect" were checked and need no change. Fix every item for your module; the global rules apply to every module.

## Not defects (no change)

- **G2B pending** (A-09, B-01): a recorded exception (decision log, 2026-10-25), stated in the PR.
- **`modelAnswer` copied by learners** (A-17): the importer stores it as `sampleAnswer`, which the server strips from learner config (`server/src/shared/blocks/open-question/schema.ts`, `server/src/utils/sanitize-block-config.ts`). Mentors and the review draft see it; learners do not. Keep the mentor keys.
- **Sorter text size** (A-21): the sorter is a shared primitive used by other courses; logged as a follow-up for agent-ip, not this course.

## Already fixed by the orchestrator (adjust your text to match)

- **Specimen pictures draw larger on phones** (picture width 324). No action.
- **2.4 spacing canvas** (`product-m2-spacing-groups`): inside a group 4; between groups 4, 12, 24, 40, 64 (all multiples of 4). **Module 2: change every 6, 12, 22, 36, 56 in 2.4's text, folds, quiz and `product-m2-squint-groups` to these numbers.**
- **5.2 fixed Wasel headline** now reads "Send your file before noon. Pick it up printed by 4 pm." (A-25). Module 5 text must quote it that way.
- **Skim test** can offer a slower time: add `slowerSeconds: 20` to both 7.3 skim canvases (A-24).
- **Right-to-left screens:** a `SpecScreen` may set `dir: "rtl"`; the layout mirrors and text is shaped right to left. Arabic text in blocks renders. Used in 3.4 (below).

## Global rules for every module

**G1. Predicts (A-01, A-12).** Every predict keeps two options (the structure audit allows only two). Across your module: the correct label is **longer than the other in about half** of your predicts and shorter in the rest; never give the answer away in the label (2.5's "just under 4.5 to 1" leaks the number). Each predict must set up a real surprise the next beat shows: the intuitive answer is wrong, or both options are plausible and the picture decides. Model predicts: 1.2, 1.5, 3.2, 6.3. Rewrite 1.3, 1.4, 2.3, 2.4, 3.6, 4.2, 4.4, 5.2, 5.3, 5.4, 6.2, 7.2, 7.3, 7.4 to that bar, and 4.5 so it asks something the learner can reason about (not a study's result they cannot know).

**G2. MCQ option shape (A-02, A-10).** In each MCQ, every option has the **same grammatical shape**: either no option gives a reason, or every option gives one, with the flaw inside the reason. No "because" or "since" only on wrong options. Remove straw-man absolutes ("never", "always", "any", "only") from wrong options unless the key also uses one. Across your module, the key is the **strict longest in about one MCQ in four**, never more than 10% longer than the longest wrong option, and the strict shortest in about one in four.

**G3. Fact-list stems (A-11).** In a question that lists facts, at least two wrong options are plausible misconceptions or true-but-irrelevant points that do **not** contradict a stated fact. The stem describes the situation; it does not name the fault.

**G4. Transfer, not recall (A-13).** Quiz items never reuse the chapter's own worked numbers or examples: new colours, new thresholds, new apps. No key may depend on a vendor's age limit or plan (6.2 Q2, 6.5 Q2: rebuild on a taught rule).

**G5. Sorters (A-15, A-16).** Every sorter gets at least two cards where the surface cue points to the wrong bucket (a generic sentence with a number, a specific sentence without one, a critique without a date, a feature written as a problem). Every card's reason states the rule that separates its bucket from the others. Move any card a reasonable expert could file differently out of the sorter.

**G6. Diagrams that argue (A-26).** At most **two** `MermaidDiagram` beats per Learn chapter. Each must show something the beat text does not say in words: a decision node, a loop, or a before and after side by side. Delete legends that repeat the beat text (keep a legend only when it adds a key or a number). Replace any linear three- or four-box flow with a specimen canvas when a screen can show the idea (new canvas slugs `product-m<N>-<name>`, data and spec only), or with a diagram that argues. A legend counts toward the beat's 70 words.

**G7. Time and length (A-08).** New minutes are in the table below; use them in frontmatter. Practice chapters: **1,300 to 1,600 prose words** (move the long "how your mentor will read it" detail into one short paragraph). Gates: **750 to 950 prose words**. Nothing a quiz or predict needs may sit only in a fold: move it into a beat's visible text or the picture (2.5 Q1 and 3.4 Q1 today).

**G8. Open questions and mentor load (A-19, A-20).** Set-the-scene (Read) open questions become `required: false`. Gates: the model answer is about a different case from the gate task, and each gate's prompt differs in shape from the others (do not reuse "a strong answer told about a fictional fellow, then look at the shape").

**G9. Phone path (A-18).** Every check a rubric rewards has a phone path: contrast by the grey table in 2.5 (below) or the formula worked in the fold; focus order by reading the drawn Tab order (3.4 canvas below); slow connection by flight mode or a weak signal, never developer tools only.

**G10. Plain words (A-31, B-08 to B-11, B-15).** No sentence over 30 words. Replace idioms: "fails by a hair" (say "fails by a small amount"), "hunt for", "rule of thumb" (say "a rule from practice"), "pull revelation", "tell" (as a noun), "Pill soup" (quote it as OpenAI's words if kept), "moment it clicks" (keep only as the course title of 3.6, explained once). Define on first use, once in the course, with `GlossaryTerm`: heuristic (2.2), NN/g (first use in 1.5: "Nielsen Norman Group, a research company that studies how people use screens"), dp (Material's unit, where first used), relative luminance and sRGB (2.5), shadcn/ui (4.3), the 60-30-10 colour split (where first used, or drop it). If a term is already defined earlier in the course, refer back instead of defining again.

**G11. Tool facts (B-04 to B-06).** Never state a free-tier number (credits, messages, minutes, gigabytes) as something the learner can rely on: "small limits; check the plan page" (7.4). Where a tool is named for a job, give its age rule from the writer pack (Claude 18+, ChatGPT 13+ with permission under 18, Gemini 13+, GitHub 13+, LinkedIn 16+, v0 16+, Figma AI 18+, Stitch "reported 18+, check"). Every tool fact and every GOV.UK fact carries "(checked 2026-10-25)" or "at the time of writing" once per chapter (03.02, 03.03, 05.02, 07.02, 07.04, 07.07 today).

**G12. Cast and canon (A-29, A-30, B-02, B-03, B-07, B-12, B-13, B-16).** Every first name has **one role** in the whole course. Before you use a minor name, grep the course; if it is used, pick another from your pool. Halaqa and Wasel follow this canon exactly, in chapters and canvases:

| Fact | Canon |
|---|---|
| Halaqa's group list | Three groups: "Data structures, exam Thursday", "Tonight 8 pm, library room 2", "2 seats left"; "Statistics 101 revision", "Tomorrow 5 pm, online", "4 seats left"; "Arabic literature reading", "Saturday 10 am, cafe", "Full" |
| Halaqa's create-group form | Four fields, in this order: Course, When (day and time), Where (library room, online or cafe), Seats. The hint under Where reads "Library, online or cafe" in #767676. The button reads **"Start the group"** |
| Halaqa on weak data | The group list takes about 12 seconds to load in the library (3.1, 3.2) |
| Halaqa's Join button | Before the fix 36 by 36 pixels; after the fix 44 pixels tall and full width (3.4) |
| Halaqa's 14 features | group search, create group, chat, file sharing, polls, voice rooms, streaks, badges, a leaderboard, profile themes, dark mode, calendar sync, notifications, an AI summary of notes (use these names in every canvas) |
| Maryam's check | First 2 of 5 classmates joined a group in their first visit; after the redesign 4 of 5, in about 2 minutes |
| Wasel | As in writer pack section 8; the order form placeholder grey is #999999 (2.85 to 1); the Submit button is 80 by 28 CSS pixels; prices, hours and the before-noon rule unchanged |

4.6's example apps get fictional names (B-16), not "App 1, App 2, App 3".

**G13. Repeated teaching (A-27).** A claim is taught once with its own canvas, then referred back to. "Colour alone is not a message" is taught in 2.5; 3.4 refers back (drop `product-m3-colour-not-alone` from 3.4's beats). "A vague prompt gets the most common page" is taught in 6.2; 5.1 and 5.2 mention it in one sentence with "module 6 shows how to brief a tool".

## New minutes (frontmatter `estimatedMinutes`)

| Type | Minutes |
|---|---|
| Read (set the scene) | 15 |
| Learn | 25 |
| Practice (Build) | 50 |
| Quiz (Check) | 12; mixed review 7.5: 15 |
| Gate | 35; course gate 7.8: 45 |
| Capstone part 1 and part 2 (7.6, 7.7) | 90 each |

## Module items

**Module 1.** A-03: 1.6 uses one rule everywhere (step 5, prompt, rubric, mentor key): "a four-part no for at least the three hardest cuts". A-15: in `product-m1-scope-hammer` state the rule that separates nice to have from not now in each card's reason (for example "helps the job but the job works without it" versus "serves a different job"); fix `product-m1-problem-or-feature` so "Nobody finds a group before the exam" is not keyed against the sorter's own "everyone" cue (reword the card as a checked observation). B-13: canvases use the canon feature names. Predicts per G1 (1.3, 1.4).

**Module 2.** A-04: 2.6's Wasel route gets a new compare canvas `product-m2-wasel-before` (the generic landing page and its squinted twin, from writer pack section 8) and the Wasel table gives only the "before" ratios; the learner computes at least two "after" ratios. A-18 and G9: add to 2.5 a visible table of eight common greys on white with their ratios, computed with the formula (for example #595959, #6B6B6B, #757575, #767676, #777777, #858585, #949494, #999999), so the check works on a phone. A-22: `product-m2-three-sizes` keeps weight and colour the same across its three pages; the six-size page puts sizes out of order of importance. 2.4 numbers per "Already fixed". B-03: `product-m2-contrast-ladder` uses "Tomorrow 5 pm, online". Predicts per G1 (2.3, 2.4, 2.5).

**Module 3.** A-05: 3.7's Wasel case gives the facts needed for every access question in the rubric (control sizes, the order of controls for Tab, text alternatives present or missing, direction), or the rubric's Met for that route reads "every question answered from the stated facts". A-23: `product-m3-wait-ladder` shows at each stop the wrong indicator beside the right one (two short screens per step, or a compare); at least two stops carry a bad or warn verdict. A-27 and A-28: 3.4 drops the colour-alone beat (refers back to 2.5), keeps targets, focus, text alternatives, small screen first and right to left; add `product-m3-rtl-card`, a compare of Halaqa's group card in English (ltr) and in Arabic (`dir: "rtl"`, Arabic text written in Arabic script, for example "حلقة" for Halaqa), with the verdict about what moved (the Join button to the left, text aligned right), and add a canvas `product-m3-tab-order` (a compare or spot of the create-group form with numbered focus order drawn as pills or text) so the focus check can be done by reading (G9). Move the AA spacing exception that 3.4 Q1 needs into visible text. B-07: canon form (four fields, "Start the group"). B-12: canon seats in `product-m3-motion-with-a-job`. Predicts per G1 (3.6).

**Module 4.** A-15: `product-m4-rule-or-myth`: the golden ratio and "blue means trust" cards say "Misread" if the chapter says they have a true core, or the chapter is changed to match "Unsupported"; one rule, stated in the card reason. A-16: `product-m4-critique-or-opinion` must not let "9 Nov:" mark every critique (add a dated opinion and an undated critique). A-33: `product-m4-four-levels` spec says "the canvas checks only that a reason is stated". B-16: name the three apps in 4.6. Predicts per G1 (4.2, 4.4, 4.5).

**Module 5.** A-06: the Wasel route in 5.5 is the **order form and order status screens** (their look and their words), not the landing page, which the 5.2 and 5.4 canvases already show fixed. The mentor key for 5.5 names what a strong answer must contain for those two screens, not a specific headline. A-16: `product-m5-hundred-products` gets "only this product" cards without digits and "any product" cards with digits. 5.2 quotes the canon headline with "before noon". G13 for 5.1 and 5.2. Predicts per G1 (5.2, 5.3, 5.4).

**Module 6.** A-15: 6.4's point about showing the total price is filed as checkable against a rule taught in 4.6 and 5.3 (real content first), not "ask a person", or the point is reworded so "ask a person" is clearly right; the mentor key matches. G4: rebuild 6.2 Q2 and 6.5 Q2 on taught rules. B-04, B-05: no free-tier numbers; ages where tools are named. B-07: canon form. Predicts per G1 (6.2).

**Module 7.** The capstone splits into two chapters (course.yaml is already updated): **7.6 "Capstone, part 1: before and after, and the critique log"** (parts 1 and 2) and **7.7 "Capstone, part 2: the case study page and the demo"** (parts 3 and 4), each a Build chapter of 1,200 to 1,600 prose words with its own diagram, rubric rows and open question; the course gate becomes **7.8** (`07.08-checklist.md`, lesson 8). Delete `07.06-capstone-from-slop-to-remembered.md` and `07.07-checklist.md` after moving their content. A-06: on the Wasel route, the landing page in part 1 may start from the 5.2 version, but at least two changes on it must be the learner's own, with reasons; the mentor key never names the course's headline as the expected answer. A-07: a learner with no users may give a **labelled proxy result measured on the design** (steps to the first order before and after, contrast before and after, the squint test before and after, a 3 to 5 person check if possible); rubric and key both say this meets "did it work" for the skim. A-14: 7.5 covers modules 1 to 7: replace one item with a module 2 case (contrast plus hierarchy) and one with a module 7 case (demo, case study or access); fix the 7.5 Q2 explanation that calls a spinner without words at 4 seconds right (3.2 says a wait over a second or two needs words). A-24: skim canvases get `slowerSeconds: 20`, the "before" page under 40 words, and the feedback for "I could not read it in time" no longer says ten seconds were enough. B-02: the worked example uses canon load time (12 seconds) and Join button sizes. B-04: no free-tier numbers in 7.4. Predicts per G1 (7.2, 7.3, 7.4).

## Before you hand back

Same as the writer pack section 11, plus: run `python <scratch-tools>/bias.py "<repo>/courses/product-sense/<your module dir>"` (the orchestrator names the path) and report the key-longest, key-shortest and predict-longer counts for your module; grep the course for every minor name you use. Report the defect IDs you fixed, any you could not, and why.
