---
artifact: context-pack
course: build-with-ai (v2 amendment)
for: chapter-writer (revision round 1)
version: 1
---

# Revision round 1 (v2)

Two blind critics reviewed the 54 v2 chapters and 45 canvases. The orchestrator checked every defect below against the files. Fix the defects for your module, then the course-wide items, then re-run the checks in section 10 of `writer-pack-v2.md` plus the cue check below. Edit only your own files (and the extra files named for you here). Do not run git commands that change anything.

## Course-wide items (every writer, on your own files)

1. **Guessable keys by form (critic B, B-7, S2).** Measured by script on all v2 MCQs: 70% of wrong options carry a reason clause ("because", "since", "so", "as") against 35% of keys; 31% of wrong options carry an absolute word (never, always, every, any, all, only, nothing, certain, proves) against 14% of keys; when exactly one option mentions checking, reading or testing a source, it is the key in 17 of 30 items. Rewrite your quiz and quick-check options so that:
   - every option in an item has the same grammatical shape (all with a reason clause, or none);
   - no wrong option is a strawman with an absolute ("every number a vendor publishes is false", "certain whenever"); each wrong option is a mistake a thoughtful learner could make and fails because of a different stated fact in the stem;
   - in at least two of your items the right answer is to use the AI answer as a draft, or that no further check is needed, so "check the source" is not always right;
   - never two options that start with the same words when one of them is the key.
   Run `node C:/Users/Zeeshan/bm-aiadv-scripts/cue-check.mjs <your module folder>` from `C:/Users/Zeeshan/bm-aiadv/server` (after `powershell.exe -NoProfile -ExecutionPolicy Bypass -File C:/Users/Zeeshan/bm-aiadv-scripts/sync.ps1`). Target: key and wrong reason-clause shares within 15 points of each other; wrong absolute share at most 15%; for each feature, the key is the odd one out in at most a third of the odd-one-out items. Keep the bias check clean too (length and position).
2. **Predict labels (B-9, S3).** The correct label is strictly shorter in 24 of 28 predicts. Write both labels at about the same length (within 3 words) and the same hedging; no absolute in the wrong label; the prompt must not state the weights or the reason that gives the answer away.
3. **Template repetition (B-10, S3).** Vary the wording you use in practice chapters and gates: the mentor follow-up paragraph, "Here is what a strong answer looks like", "Look at the shape of", "A weak answer looks different", "The common mistake is", "What to notice" and "The takeaway". Drop "(a fictional case)" from opening lines (the Sources fold says it). Use the "Name ... 1) ... 2) ... Which conclusion do the facts support?" stem in at most a third of your items.
4. **Idioms (B-11, S3).** Replace: "comes out ahead" (wins), "stay in charge of it" (keep control), "slips past you" (is not noticed), "pulled back" (reduced the plan), "after a backlash" (after strong criticism), "rules this out" (excludes this), "pays you back" (helps you later), "in the loop" (part of the work), "wants to please you" (tries to agree with you). Grep your files for these and any other idiom.
5. **Names (B-12, S3).** One role per person per module. Give each case in your module a different name from your pool, or reuse a person only in the same role.
6. **Diagrams that restate the text (B-19, S3).** Where your Mermaid diagram only repeats the sentence under it, change it to argue something the words do not (a flow, a branch, a failure path), or replace it with a scene. 11.2's percentages must not be drawn as a flow of arrows.
7. **Scenes before a playable (critic A, A-2, S3).** In a watch-only scene that opens a beat, set the scene's `hint` to one short line such as "Watch: it plays on its own. Press Replay to see it again."

## Module items

**Module 1 writer (also fix the v1 quiz files `02-your-ai-toolkit/02.05-quiz.md` and `03-learn-deeply-with-ai/03.07-quiz.md`: the key is the strictly longest option in two of five items in each; rewrite one item in each so it is at most one, without changing what the item tests).**
- B-8 (S2): 1.1 "Refusing the tool does not protect her career. It makes her slower than people who use the tool well" (use task-dependent wording from A34, A38, A39); 1.1 "A reviewer who sees ten quick stores in one week will remember the one fellow..." and 1.8 "Reviewers differ, but most of them check the same few things" and "So reviewers, interviewers and clients look for what is still hard" (mark as "in this example" or "the course's view", delete "most of them" and "will remember"); 1.7 summary and heading "easier for you ... than ever" (drop "than ever"; say "easier to start now than before, because explanations, troubleshooting and checking are a message away") and the sentence "a fellow who builds these habits now is not behind most workers" (delete).
- B-23 (S3): 1.2 "Both reports are true. They answer different questions." becomes "Both are reports of what someone saw on their own test. They answer different questions."
- B-29 (S4): 1.3 diagram: "18% say AI or automation will likely end their job within 5 years (very or somewhat likely)".
- B-32 (S4): 1.9 question 5: change the Builder.ai-like numbers so "Company Q" is plainly fictional.
- B-9: the 1.7 predict prompt states Rawan's weights; remove them from the prompt.

**Module 5 writer.**
- B-15 (S3): 5.2 predict labels "Fits her better, old rule may stay" and "Fits her better, old rule is fixed": use "old rule has been corrected" against "old rule may still be inside".
- B-16 (S3): gate 5.6 route 2 asks for "four problems" but the record holds about seven: list exactly four in the case and key, or make the rubric "at least four of the seven" and list all seven in the key.
- B-28 (S4): Perplexity is named in 5.3 and 5.4 without v2 dossier support: name it only as in the v1 dossier (access unclear, v1 U9), or use Gemini, ChatGPT and Claude.
- B-31 (S4): break the 5.2 and 5.3 Sources folds into short lines.

**Module 6 writer.**
- B-2 (S2): 6.3 quick check 1 (Dima's bakery): state in the stem that the till and the phone app are separate machines reaching the data over a network (or many writers); change "Fact 1 rules this out" to wording that follows B52 and B53 ("points to a client and server database"). Keep the key PostgreSQL.
- B-3 (S2): 6.5 "An idempotent consumer" diagram and quiz question 2: the consumer must record the event id and do its effect in one database transaction, or pass the event id to the payment provider as an idempotency key; add the sentence that "check, act, then record" has the same crash gap; reword the key to match.
- B-4 (S2): `cache-choice-context` rules 1 and 3 and 6.4 quiz question 2 explanation: replace "Only Redis has these types" and "lacks them" and "Valkey would not have them" with "Redis 8 ships these types in its core (B32). Valkey forked before them (B34): check whether a Valkey module covers what you need; this course did not check."
- B-18 (S3): `metrics-store-context`: add a factor for "need one view across servers", let VictoriaMetrics cluster be an option past one node (B25), and say in the reason text that other tools also offer multi-node storage and downsampling. `fastest-database-depends`: add a size factor (rows a day or total rows) so small analytics data can stay on PostgreSQL or SQLite, matching 6.6 and 6.7.
- B-12: 6.1 fold: the person who asks is the person who checks the licence (Munir or Ayman, not both).
- B-24 (S3): Qasir's clicks: 6.6 says "about 90,000 clicks a week" and 7.4 says "a busy link gets a few hundred clicks a day". Keep 90,000 a week as Qasir's total across all links in 6.6, and say so explicitly ("across all its links").
- B-30 (S4): 6.5 Sources: name the system design canvas by its slug, not "chapter 14.4", unless you checked the chapter number in `courses/system-design`.
- B-33 (S4): 6.2 heading "Popular choices win, even when others fit" becomes "Popular choices are picked often".
- B-7 example to fix: 6.7 question 3.

**Module 8 writer.**
- B-13 (S3): 8.2 fold "In one careful study, experienced developers felt faster with AI but were slower. Later tools may be better." becomes the 1.3 wording: "In a 2025 trial with 16 experienced developers, they felt faster with AI but took longer. Its authors now call the result out of date (A38, A39)." Or drop it and keep "measure your own hours".
- A-3 (S3): 8.4 fold on Gaza payments: advise asking the fellowship coordinator and past participants before applying, and name a community project you join yourself as the first fallback when the stipend path cannot be confirmed.
- B-7 example to fix: 8.6 question 3 (two options start "The community project,").

**Module 9 writer.**
- B-1 (S1): one rule everywhere: **own voice only, or a labelled stock voice**. In 9.4 delete "If a real project needs another person's voice, you need that person's yes, in writing..." (or label it plainly as outside this course and not something the course asks you to do). Rewrite the 9.4 quick check (Wisam's ad) so the key is "Ask the owner to record the script himself, and tell him where it will run" (add the option) and remove the "written yes" key. In `voice-use-check`, change the buckets so no card about another person's voice is allowed: for example "Fine with a label", "Use your own recording instead", "Never"; move the classmate, public clip and teacher-joke cards out of any allowed bucket, with reasons. Check 9.8 and 9.9 say the same.
- B-5 (S2): 9.7 provided case contradiction (one phone on the table versus each phone runs its own countdown): pick one fact (for example: the group puts one phone on the table) and make the case, critique point four and the mentor key use it; fix the same in 9.9.
- B-22 (S3): 9.2 quick check 1 explanation "A phone recorder is free and works on a phone alone": use "most phones have a screen recorder; check yours" (dossier C U9) and keep the paper-sketch fallback in the key.
- B-14 (S3): 9.3 Sources fold cites "C14 to C18" for listening and study modes: the right ids are C17 to C21 (check them in part C).
- B-17 (S3): 9.6 quick check 1 (Ghada's "slow" page): add a stated fact that excludes "Test it first" (for example she tested on weak data and it still loaded in 2 seconds), or change the key.
- B-25 (S3): 9.5 is too dense: put the cloud cost material in one fold labelled "Optional: only if you have a cloud account" and keep the beat on the supplied sample report short.
- Add C77 and C78 (orchestrator-verified, in `../v2/research.md`) to the 9.2 and 9.5 Sources folds where you state that GitHub draws Mermaid and the token menu path.

**Module 10 writer.**
- B-14 (S3): 10.3 states "Medical journal editors say that an AI tool cannot be listed as an author." and "Hashnode and LinkedIn put the responsibility on you ... and we found no label rule." Check them against the v1 dossier `../research.md` (section F, S58 to S62) and part C; keep only what a source supports, and add a short Sources fold to 10.3 with the ids. In 10.1, add the v1 id for the 2013 GitHub study.
- B-26 (S4): one sentence in 10.4 or 10.7 on platform minimum ages and availability (v1 dossier: LinkedIn 16 or over), with the private draft route.
- A-4 (S3): 10.5 quick check explanation "Detectors have flagged most of a group of real second-language essays" becomes "In a 2023 study, detectors flagged most of a sample of 91 real second-language essays, so a score can be wrong."

**Module 11 writer (also fix the v1 quiz `07-a-project-worth-six-months/07.06-quiz.md`: the key is the strictly longest and the strictly shortest option in two of five items each; rewrite so each is at most one).**
- B-6 (S2): 11.3 quick check 2 (Bayan): the key says "I shipped the rule untested", which the stem does not state. Add "she had not tested it where it runs" to the stem, or change the key's second sentence to a stated fact.
- B-8 (S2): 11.8 toolkit row "Be the one a smaller team keeps" becomes "Habits teams value: give context, check, own the result, work well with others."
- B-13 (S3): 11.6 worked example part 1 uses the same out-of-date 19% sentence: use the 1.3 wording or drop it.
- B-17 (S3): 11.3 quick check 1 (Ehab's reply): add a stated fact that excludes the refund option (for example "the client did not ask for money back and wants the page fixed"), or change the key.
- B-19 (S3): 11.2 percentages as arrows: show them as a ranked list or a bar chart scene, not a flow.
- B-21 (S3): 11.7 "Before you start": add that the AI interview key is optional, comes from OpenRouter (the provider the block uses), can cost money (set a spending limit or skip it), and that no part of the pass depends on it; the written defence completes the same step.
- B-24 (S3): 11.6 Yara's decision context "the few hundred clicks a day from chapter 7.4": make it "a busy link gets a few hundred clicks a day (7.4); across all links Qasir records about 90,000 a week (6.6)".
- B-27 (S4): 11.3 fold "Most involve people without lawyers (1,275), and 879 involve lawyers": add the dossier's caveat that the party counts use a filter and need not add up to the total.
- B-7: the 11.5 summary line "one needs two habits at once" gives the key away; remove it.

## Report

In under 300 words: what you changed per defect id, the cue-check and bias-check lines for your module after the change, and anything you could not fix.
