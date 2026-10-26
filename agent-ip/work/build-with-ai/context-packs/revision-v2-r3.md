---
artifact: context-pack
course: build-with-ai (v2 amendment)
for: fix writer (round 3, targeted)
version: 1
---

# Round 3: targeted fixes (no third critic round)

Critic B's round 2 found no S1 or S2 and scored 4.05 (pass line 4.3). agent-ip allows two critique rounds; these targeted fixes go to human review afterwards, as in v1. Make only the changes below, keep every other word, and follow `writer-pack-v2.md` (plain English, no em or en dashes, option length and position rules). Paths are relative to `D:/Projects - Community/buildment-aiadv`. Do not run git commands that change anything.

1. **N-1, 6.4 quick check question 2 (the study group's cache).** Add a stated fact to the stem, for example "the group already runs Redis on the school server and sells nothing", make the key "Keep Redis; nothing here calls for a switch" (same length band as the other options), and remove "No further check is needed" from its explanation (keep: note the version and the date they read the licence page).
2. **N-3, 9.7 provided case.** Critique point four quotes the assistant; remove the sentence "The group uses one phone on the table" from inside the quoted point, and make sure the case description itself states that fact once. Check 9.9 says the same.
3. **N-4, 6.3 question 1.** The first option repeats "over the network" from the stem; reword that option so it does not echo the stem.
4. **N-2(b), idiom.** Replace "comes out ahead" with "wins" in `01-ai-as-an-enabler/01.08-plenty-of-ai-few-strong-projects.md` and `07-a-project-worth-six-months/07.04-slow-down-for-trade-offs.md` (three places). Grep the course for any other "comes out ahead".
5. **N-2(a), punctuation cue.** In MCQs where exactly one option has a comma, semicolon or colon and that option is the key, either remove the punctuation from the key (rephrase) or give a wrong option the same punctuation. Run `node C:/Users/Zeeshan/bm-aiadv-scripts/punct-check.mjs ../courses/build-with-ai` from `C:/Users/Zeeshan/bm-aiadv/server` after copying your files to `C:/Users/Zeeshan/bm-aiadv/courses/build-with-ai/` (same relative paths); target: the lone-punctuation option is the key in at most a third of such items. Keep the cue check (`cue-check.mjs`) and bias check (`bias-check.mjs`) clean.
6. **B-12, names.** In module 1, rename Khalil to Nadim in 1.7, 1.9 and 1.10 (grep the module and the canvas data for Khalil first; Khaled in 1.1 stays). In module 8, Hanan has four roles (8.2, 8.3, 8.4, 8.6): keep Hanan in one role and give the other three roles new names: **Tasneem**, **Majdi** and **Sireen** (grep the course first).
7. **B-19, diagrams that list.** Recast these three so each shows a flow, a branch or a failure path the text does not already say: 5.2 "Yara's five lines of context", 9.3 "The check, in three boxes", 9.6 "A critique log in three lines". Keep each beat's visible text within 70 words.
8. **B-10, "check" saturation.** In the new v2 chapters only, vary the word "check" where it repeats in one paragraph (confirm, compare, test, open the page, look up), keeping meaning exact. Do not touch quiz keys' meaning.
9. **Structure warnings.** `content:audit` warns that table cells exceed 120 characters in 9.7, 9.9, 10.9, 11.6, 11.7, 11.8 and two more (run `node node_modules/tsx/dist/cli.mjs scripts/audit-course-structure.ts --course build-with-ai` from `C:/Users/Zeeshan/bm-aiadv/server` after copying). Shorten those cells: move the long explanation into a sentence above or below the table.

Then run, from `D:/Projects - Community/buildment-aiadv`: `node agent-ip/scripts/audit-course.mjs courses/build-with-ai` (Needs work 0). Report in under 250 words: each item done, the punctuation, cue and bias check lines, and the structure audit warning count.
