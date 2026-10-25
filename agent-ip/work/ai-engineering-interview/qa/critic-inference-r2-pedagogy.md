---
artifact: critic-review
course: ai-engineering-interview
module: 11-inference-and-serving
round: 2
lenses: pedagogy, explanatory depth and visual explanation, interactive canvas, continuity
reviewer: independent critic (blind: artifact, rubric, dossier, round 1 review; no writer notes read)
date: 2026-10-24
scorecard_average: 4.14
blocking_defects: 0
recommendation: revise
---

# Critic review, round 2: module 11 (inference and serving)

## Scope and method

Read in full: chapters 11.01 to 11.11; `data.ts` and `spec.md` for the eight canvases (`prefill-decode-steps`, `kv-cache-per-token`, `gpu-memory-budget`, `paged-kv-allocation`, `speculative-decoding-gain`, `self-host-or-api`, `admission-control-tokens`, `deployment-fit-steps`) and the `CanvasNotes` renderer; round 1 (`critic-inference-r1-pedagogy.md`); `06-quality-gates.md`, `agents/critic.md`, `inference-pack.md`, `writer-pack.md`; the roadmap, `course.yaml`, `01.01`, `10.07`, `12.04`, and the Wadi Labs chapters of modules 6, 7, 8 and 10 for continuity. I did not open the dossier line by line (the technical critic owns that); I used it only where a round 1 hand-off pointed at it.

What I did to verify:
- Re-derived by hand every MCQ key in the chapters and in 11.10, every worked example (11.01, 11.04, 11.07, 11.09 both examples, the "Your turn" and FAQ numbers), the 11.11 model answer, the 11.08 code run (`23 7 376832`), and every canvas "Try this" number in the eight `data.ts` files. I found no arithmetic error.
- Ran `node agent-ip/scripts/audit-course.mjs courses/ai-engineering-interview`: no module 11 chapter carries a flag. Prose words (audit count): 11.01 1,404; 11.02 1,642; 11.03 1,735; 11.04 1,622; 11.05 1,597; 11.06 1,741; 11.07 1,695; 11.08 1,772; 11.09 1,857; gate 770.
- Ran the six canvas test files for module 11 (`vitest`): 6 files, 66 tests, all pass.
- Scripted the option lengths and key positions of all 24 MCQs and 9 predicts (results under R2-10 and R2-15).
- Searched for em dashes, en dashes, company names, model names and GPU names: none (GPTQ is an allowed name).
- Measured sentence length: average 13 to 15 words in every chapter, 1 to 6 sentences over 30 words per chapter.

What I did not do: render any chapter or canvas at 375px, test keyboard use, or check engine flags and paper figures (technical critic). Accessibility and technical accuracy are scored provisionally.

## Scorecard

Scale 1 to 5 from `06-quality-gates.md`. Gate rule: every dimension at least 4, average at least 4.3, zero S1 or S2.

| # | Dimension | R1 | R2 | Why |
|---|---|---|---|---|
| 1 | Outcome alignment | 3 | 4 | O8 now exists in the roadmap. Gate and quiz cover objectives 4 and 5. The quiz still has no fit-estimate item although O8 cites it (R2-08). |
| 2 | Domain specificity | 4 | 5 | One running example, real configs, every invented price and rate labelled as the example's own. |
| 3 | Depth over coverage | 3 | 4 | 11.05 is under the ceiling and 11.06 and 11.07 are trimmed. 11.05 still carries five techniques (R2-01). |
| 4 | Prose quality | 4 | 4 | Short sentences, jargon now defined at first use. Two undefined terms remain (R2-11). |
| 5 | Chapter structure | 4 | 4 | Predicts now sit before the explanation they prepare. |
| 6 | Interaction purpose | 3 | 4 | 11.08 and 11.07 predicts are live now. The 11.09 canvas is still a replay (R2-02). |
| 7 | Assessment quality | 3 | 4 | Four of five leaking MCQs rewritten. One still restates its paragraph (R2-10). |
| 8 | Difficulty calibration | 4 | 4 | Worked, then "Your turn" behind a `FaqItem`, then a new gate scenario with a failing third fix. |
| 9 | Cognitive load | 3 | 4 | 11.05 and 11.09 are down. 11.03, 11.07 and 11.08 grew; 11.08 now carries seven sub-topics (R2-03). Borderline. |
| 10 | Prerequisite integrity | 3 | 4 | Attention head, hidden size, scale, dequantization, gateway are defined. `floating-point` and `lock` are not (R2-11). |
| 11 | Technical accuracy | 4 | 4 | Provisional. The 11.08 headroom rationale is inconsistent with the promise rule (R2-07). |
| 12 | Production-grade coverage | 4 | 4 | Scale-out and replicas are now stated out of scope with a forward pointer. |
| 13 | Security and integrity | 4 | 4 | Cache salts, per-tenant semantic cache, gateway in front of the engine. |
| 14 | Accessibility | 4 | 4 | Provisional. Wide text blocks are fixed (longest line 36 characters). Not rendered by me. |
| 15 | IP protection | 5 | 5 | No company, model or GPU names; nothing from the capstone. |
| 16 | Variant distinctiveness | 5 | 5 | Not applicable (shared module). |
| 17 | Continuity | 3 | 4 | In-module numbers now line up. The "company of about 40" fix breaks Wadi Labs across modules (R2-06). |
| 18 | Learner agency and curiosity | 4 | 4 | Good hooks, gated "Your turn", a written gate. |
| 19 | Instructor alignment | 3 | not scored | `roadmap-confirmation.md` does not exist and G2B is pending, so the critic rules do not allow a score. Stale roadmap lines remain (R2-05). |
| 20 | Interactive canvas quality | 3 | 4 | Claim-to-control gaps closed in kv, gpu and speculative canvases; copy matches. `deployment-fit-steps` still adds no new case (R2-02, R2-04) and `prefill-decode-steps` double-numbers (R2-09). |
| 21 | Explanatory depth | 4 | 4 | Mechanism, worked example, trade-off, failure modes and debugging path in every chapter. Paging has no picture (R2-01). |
| 22 | Visual explanation | 3 | 4 | 11.01, 11.06, 11.07 diagrams now argue; 11.05 has a batching diagram. Paging has none and the 11.05 diagram halves are unlabelled (R2-01, R2-14). |

Average over the 21 scored dimensions: 4.14 (87 / 21). Dimensions below 4: none. The average threshold of 4.3 is not met, and dimension 19 cannot be scored until the confirmation record exists. The gate is not met.

## Defect count (open after round 2)

S1: 0. S2: 0. S3: 9. S4: 10. Total open 19 (10 carried from round 1 at reduced severity, 9 new).

Round 1 had S2: 4, S3: 15, S4: 9. All four round 1 S2 defects are fixed or reduced to S3.

## Round 1 status

| ID | R1 | Status | Evidence in round 2 |
|---|---|---|---|
| D01 | S2 | Fixed | 11.08 hook now says the cache stayed 16-bit while FP8 was tested; 11.10 Q5 and the canvas spec agree. |
| D02 | S2 | Fixed | 11.03 defines attention head, head size and hidden size before the formula, and says why heads can share keys and values. 11.09 FAQ 2 defines hidden size. |
| D03 | S2 | Partly fixed (now S3, R2-01) | Prose 2,051 to 1,597, goodput example and page-size aside cut, new static versus continuous diagram. Five techniques remain; paging has no picture. |
| D04 | S2 | Fixed | The 23, 7 and `23 7 376832` now appear only after the predict. A worked 20,000-token case sits before it. A small cue remains (R2-17). |
| D05 | S3 | Fixed | 11.02 predict now precedes the one-read sentence; the 11.04 giveaway sentence is gone; the 11.07 predict is a close call (39 vs 40). |
| D06 | S3 | Partly fixed (now S4, R2-10) | 11.03, 11.08 Tamer, 11.09 Reem and the 11.08 transfer options are fixed. 11.05 prefix item is still the paragraph's own example. |
| D07 | S3 | Fixed | Chapter and canvas "Try this" now agree in 11.02, 11.03, 11.04 and the other five. Duplicate print of Try this and Limits remains (R2-12). |
| D08 | S3 | Fixed | `kv-cache-per-token` has a fifth input, "Tokens in the chat" (the slider renderer caps at four, so it replaced head size, now fixed at 128). Spec, chapter and tests match. |
| D09 | S3 | Fixed | `gpu-memory-budget` leads with "Cache space in tokens" (426,784) and shows chats of this length in its detail. |
| D10 | S3 | Fixed | Experiment 2 now reaches the Slower verdict (0.75); the chapter MCQ uses different numbers. |
| D11 | S3 | Partly fixed (now S3, R2-02) | Step titles are words, "Your turn" is inside a `FaqItem`, predict changed. The canvas still replays the 80 GB case and the predict repeats the 11.06 table. |
| D12 | S3 | Partly fixed (folded into R2-03) | 2,138 to 1,857 prose words, "Units and the reserve" cut, FAQs at 6 sentences or fewer, text blocks at 36 characters. Still the longest chapter. |
| D13 | S3 | Partly fixed (now S3, R2-03) | 11.06 method table and Callout, 11.07 engine table and parallelism diagram done. 11.03 and 11.07 grew; 7 of 9 Learn chapters are over 1,600. |
| D14 | S3 | Fixed | Quiz now covers batching, paging, speculation, parallelism and admission control; gate has a parallelism and hosted API log item and checklist item. Core arithmetic is not in the quiz (new R2-08). |
| D15 | S3 | Partly fixed (cross-module break, R2-06) | Cost example, bridging sentence, label 4 and capacity figures are fixed. The "about 40 people" fix contradicts modules 8 and 10. |
| D16 | S3 | Partly fixed (now S4, R2-11) | hash, tenant, scale, dequantization, gateway, walltime, kernel are defined; TTFT and TPOT kept. `floating-point` and `lock` remain. |
| D17 | S3 | Partly fixed (now S3, R2-04) | 11.08, 11.09 FAQ 4, the gate model answer and 11.10 Q5 now put admission control on spikes only. The `deployment-fit-steps` canvas still calls it "the safer second fix". |
| D18 | S3 | Fixed | 11.01 diagram carries 16.06, 55.94 and 85.9; 11.06 and 11.07 diagrams argue. The 11.05 gap is tracked under R2-01. |
| D19 | S3 | Partly fixed (now S3, R2-05) | O8, hours (3,530 minutes, 59 hours), week table and O1/O7 evidence updated. Four stale lines and `01.01` remain; G2B pending. |
| D20 | S4 | Not fixed (S4, R2-13) | 11.01 still works out the whole of Nour's arithmetic. |
| D21 | S4 | Partly fixed (S4, R2-13) | 11.02 now explains the cache in one clause; the canvas notes still say key, value and attend before 11.03. |
| D22 | S4 | Fixed | "The cache saves time by spending memory, and memory is the scarce resource on a GPU." |
| D23 | S4 | Fixed | No Hamza; Sahel Relief marked fictional. |
| D24 | S4 | Fixed | The 30-request driver is printed with the output. |
| D25 | S4 | Fixed | 11.07 points to 11.9 for tokens and chats and says load balancing and start-up time are out of scope. |
| D26 | S4 | Fixed | Every canvas intro now says "Make the prediction above first" and specs describe the chapter's predict correctly. |
| D27 | S4 | Fixed | Every FAQ answer is 6 sentences or fewer. |
| D28 | S4 | Out of lens | (a) SGLang mapping fixed in the text. (b) GQA scores and "5 to 6 times faster" unchanged. (c) 500 to 600 crossover reworded. Technical critic to confirm. |

Totals: fixed 16, partly fixed 10, not fixed 1, out of lens 1.

## Open defects

### S3

#### R2-01 | S3 | 11.05, whole chapter (carries D03, part of D18)

**Observation.** The chapter is now 1,597 prose words and has the static versus continuous diagram, which was the round 1 minimum. It still teaches five techniques (continuous batching, chunked prefill, paging, prefix caching, disaggregation) and the block-sharing diagram was removed without a replacement. PagedAttention, the best-known idea in the module, has no picture of what a block table does: a chat's tokens in blocks that are not neighbours, the last block part empty. The canvas shows only totals as bars, so the learner never sees a block. Prefix caching and disaggregation have no interactive element, and the one canvas covers paging.

**Why it matters.** A learner who reads on a phone learns "16-token blocks" and "block table" as words. The central relationship (non-contiguous blocks, only the last one wasted) is carried by prose alone, which is the dimension 21 and 22 weakness round 1 named.

**Fix.** Add a second small mermaid diagram in "Empty reservations and PagedAttention": one chat's block table pointing to three scattered blocks, the last marked "9 of 16 used". Keep the five topics (a split needs G2B); if the orchestrator wants to cut load instead, move disaggregation to a Callout. Do not add prose.

#### R2-02 | S3 | 11.09 canvas `deployment-fit-steps`, the predict, and the canvas copy (carries D11)

**Observation.** Step titles, the gated "Your turn" and the answer-after-problem order are fixed. Two parts of D11 remain. (1) The canvas replays the 80 GB, 20 chats, 32,768 tokens case whose 85.9 GB versus 55.94 GB numbers appear in 11.01, 11.03, 11.04 (text, canvas, FAQ), 11.06 and 11.09 itself. The learner still cannot enter a model or a GPU. (2) The predict "8-bit weights or FP8 cache: which single change makes all 20 fit?" is answered by the 11.06 table (14 chats against 26) that the learner met two chapters ago.

**Why it matters.** This chapter exists to practise new cases. The interactive element adds a narrated order but no new evidence, and its predict measures recall of 11.06.

**Fix.** Drive the canvas from worked example 1 (Najm, 48 GB, 36 layers, 8 KV heads, 12 officers, 147,456 bytes a token). That adds a new case and lets you shorten the prose that lists it. Make the predict a true close call on that case: both fixes work, so ask "which leaves more spare room?" (FP8 cache 12.32 GB spare, 8-bit weights 6.02 GB spare, both checked). Update `data.ts`, `spec.md` and the chapter copy blocks together.

#### R2-03 | S3 | Length of 11.03, 11.07, 11.08, 11.09 (carries D12, D13)

**Observation.** Writer pack ceiling for a teaching chapter is 1,600 prose words. Now: 11.02 1,642; 11.03 1,735 (was 1,692); 11.04 1,622; 11.06 1,741; 11.07 1,695 (was 1,664); 11.08 1,772; 11.09 1,857. Only 11.05 is under. 11.08 carries seven sub-topics (token budget, code sketch, engine limits table, queue and 503, preemption, token rate limits, response caches). 11.09 FAQ 6 repeats its own "Counting users, not tokens" bullet (44, 11 and 5 chats of the same 181,874 tokens).

**Why it matters.** Same load issue as round 1, spread across more chapters. The audit sets only a minimum, so nothing will catch it. The 40-minute estimates for 11.08 and 11.09 are tight once three graded items and spoken answers are counted.

**Fix.** Cut about 100 words from each of the four. Candidates: 11.03 the GQA paper scores; 11.07 the 405B sentence and one of the two cost restatements (the FAQ repeats the arithmetic of the section); 11.08 shorten "Caches: the cheapest request" to what changes in this chapter (about 60 words) and merge "Rate limits count tokens too" into the 503 paragraph; 11.09 replace the first Mistakes bullet with a pointer to FAQ 6.

#### R2-04 | S3 | `deployment-fit-steps` data.ts, steps 8 and 10 (carries D17)

**Observation.** Step 10, "Say it in the interview order", ends: "Admission control is the safer second fix." Step 8 lists admission control among five fixes with no qualifier. The scenario is 20 long chats on one GPU, with no statement that it is a spike. 11.08, 11.09 worked example 1, 11.09 FAQ 4, the gate model answer and 11.10 Q5 all teach the opposite for a steady load.

**Why it matters.** The canvas is the model answer the learner rehearses aloud. It teaches the one thing the module spent round 1 removing. The gate model answer would mark it down.

**Fix.** Step 10: end with "Admission control is only the safety net for a spike above this peak." Step 8: add "(admission control suits a spike, not a steady load)" to the admission item. Update `spec.md`.

#### R2-05 | S3 | Roadmap and `01.01` (carries D19)

**Observation.** Fixed: O8, total 3,530 minutes and 59 hours, the week table, O1 and O7 evidence. Still stale: roadmap line 15 ("module 11 runs full mock rounds"); line 22 ("Python 3.11 or later for chapters 1.4, 3.5, 5.5, 7.6, 9.6 and module 12", the capstone is now 13); open decision 6 ("52 hours"); open decision 7 ("gates 1.5, 5.7, 11.7", mock gate is 12.7); `01.01` line 62 ("about 52 hours"). G2B for the roadmap is still pending and `roadmap-confirmation.md` does not exist.

**Why it matters.** An instructor panel reads these lines first. Dimension 19 cannot be scored until a confirmation record exists, so the module cannot clear G5 whatever its quality.

**Fix.** Orchestrator: correct the five lines; record the module 11 G2B state in `run-log.md` as a row of its own. G2B itself is a human step.

#### R2-06 | S3 | 11.01, 11.02, 11.04, 11.05, 11.07, 11.08, 11.09 versus 8.02, 10.01, 10.02 (new, continuity)

**Observation.** The round 1 fix for D15 turned Wadi Labs into "a fictional remote software company of about 40 people" in every module 11 chapter. Elsewhere Wadi Labs is "a fictional remote software team" (modules 6, 7, 8) of 12 engineers (8.02: "one of 12 engineers"; 10.01 and 10.02: "team of 12"). 10.04 says "when the team starts running its own model on a GPU", which module 11 now contradicts.

**Why it matters.** The fix repaired a contradiction inside the module by creating one across the course. The writer pack's cast list defines Wadi Labs as a team of 12.

**Fix.** Keep the cast definition. In 11.01 write "Wadi Labs (a fictional remote software team of 12) wanted an internal assistant for itself and two partner teams, about 40 people in all", and use that wording once per chapter in place of the current 22-word tag.

#### R2-07 | S3 | 11.08, "Count tokens, not requests", the Tamer explanation, canvas `limits` (new)

**Observation.** The chapter defines a request's promise as its prompt plus the largest output it may write ("always set a maximum"), and then gives the reason for a limit below 100%: "chats grow while they run, and the headroom absorbs that growth". If the promise already includes the maximum output, growth is already counted. The same reasoning appears in the Tamer explanation ("headroom for chats to grow") and in the canvas limits ("requests grow as they generate").

**Why it matters.** A careful learner, and the follow-up probe "Why is the limit below 100%?" in FAQ 1, meets a reason that contradicts the previous paragraph. The model answer gives no reason at all.

**Fix.** State the real reasons in one sentence: block rounding, activations and engine buffers that the estimate leaves out, prompts counted with a different tokenizer, and the chance that a cap is not enforced. Keep the safety-net wording. Update the Tamer explanation and the canvas limits to match, and add the reason to FAQ 1's model answer.

#### R2-08 | S3 | 11.10 (new, assessment alignment)

**Observation.** The five items test batching slot-steps, paging capacity, the speculative formula, parallelism placement and admission control on a steady load. None tests the fit estimate (KV per token, memory left, tokens held), prefill and decode, or self-host versus API. O8 in the roadmap cites "Quiz 11.10" for "explain prefill, decode and the KV cache, estimate whether a self-hosted model fits". Q1 is also the 11.05 predict (static slots) with new numbers.

**Why it matters.** A learner can pass the quiz without being able to do the module's central calculation. The calculation is then checked only by a written gate that a mentor reads days later.

**Fix.** Replace Q1 with a short fit-estimate item on a new shape (for example 28 layers, 4 KV heads, FP8: which line of the five steps goes wrong?). Keep key positions spread (currently 1, 2, 0, 3, 1). Change the O8 evidence to match what the quiz tests.

#### R2-09 | S3 | `prefill-decode-steps` data.ts, steps 7 and 9 and `tryThis` (new)

**Observation.** The arrow label of message 7 reads "step 2: read again" and its note says "Step 2 reads... Nothing from step 1 is kept". The renderer's own counter calls that message "Step 7 of 10". The Try this lines say "Before step 5" and "Compare step 5 with step 9", meaning counter numbers. The learner sees three numbering schemes. This is the same double-numbering that D11 fixed in 11.09.

**Why it matters.** For a second-language reader on a phone, "step 2" and "step 5" on one screen are different things. The Try this instruction cannot be followed without counting.

**Fix.** Rename the arrow label to "second decode" and the note's "Step 2"/"step 1" to "The second decode"/"the first decode". In Try this, name messages by title as 11.09 now does ("the message called The first decode reads every weight again"). Update the chapter's copy and the test only if it checks the label.

### S4

#### R2-10 | S4 | 11.05 prefix caching MCQ (carries D06)

The two-layout stem is the paragraph's own example ("two prompts identical for 1,536 tokens but differ at token 1 share nothing") and the Failure modes list repeats it. Use two prompts that differ in a different way, for example the same rules with the date in the middle, or ask for the number of blocks that hit.

#### R2-11 | S4 | Undefined terms (carries D16)

"floating-point" (11.06 FP8 paragraph) and "lock" (11.08 code note) have no definition. One clause each.

#### R2-12 | S4 | Duplicate print of Try this and Limits (carries D07)

`CanvasNotes` prints "Try this" and "Limits of the model" under every canvas, and the chapter prints the same two blocks again. The numbers now agree, so it is polish, but a phone reader scrolls past each twice. The orchestrator should record whether the writer-pack copy blocks stay or the chapter keeps only "What this shows" and "What changed".

#### R2-13 | S4 | 11.01 and the canvas notes of 11.02 (carries D20, D21)

11.01 still works out 55.94 GB, 4.29 GB, 85.9 GB, 13 chats and the 14th chat in a Read chapter meant to open a puzzle, so 11.03 and 11.04 lose their reveal. The 11.02 canvas notes (steps 3, 6) say "key and a value" and "attend to every earlier token" before 11.03 explains them.

#### R2-14 | S4 | 11.05 diagram labels and the canvas predict (new)

The mermaid chart has two unconnected chains with no words "static" or "continuous" in any node, so it reads correctly only with the paragraph under it; label the first node "Static: 4 busy, steps 1 to 50" and the loop "Continuous: a request finishes". Also, the paging canvas has no graded predict right before it; the prose line "Open the canvas and make its prediction first" is ungraded and sits after the static batching predict, which prepares a different idea.

#### R2-15 | S4 | Predict label lengths (new)

The writer pack says the correct predict label must not be longer than the other. Correct is longer in 5 of 9: 11.01 (79 vs 77), 11.03 (58 vs 55), 11.05 (53 vs 52), 11.06 (65 vs 61), 11.07 (64 vs 62). The differences are 1 to 4 characters, so no giveaway, but it is a rule and the set tilts. Shorten the keys.

#### R2-16 | S4 | 11.09 canvas copy and gate wording (new)

"What this shows" in 11.09 includes "The player numbers its ten messages, while the titles name the parts..." which narrates the interface to the learner. Delete it and keep the Try this lines that already name messages by title. Also the gate's third and fifth paragraphs of instruction restate the whole of 11.09 (including that admission control does not fit a steady load) before the scenario; shorten to what the learner needs to write.

#### R2-17 | S4 | 11.08 Tamer MCQ and predict cue (carries part of D04)

The Tamer item is now a real application, but its rule ("long queue, low cache usage: limits too strict") is stated twice in the chapter (the SGLang paragraph and the Failure modes list). The predict's first label already contains the first step of the arithmetic ("90% of 420,000 is 378,000 tokens"). Remove the arithmetic from the label.

#### R2-18 | S4 | 11.06 MCQ "24 GB GPU" (new)

The key (4-bit weights fit 4 chats) holds because 17.58 GB leaves 0.4 GB over 4 chats of 4.29 GB. The chapter says 4-bit weights have "a small extra number for each group". Add "ignore the scales" to the stem so the key is unambiguous.

#### R2-19 | S4 | Same organisation in two near-identical cases (new)

11.09 worked example 1 and the 11.11 gate both use Najm Microfinance loan officers on a daily peak, and both end with "admission control is not the fix". Move the gate to a different fictional organisation from the writer pack (for example Sahel Relief's field staff) so the transfer is real.

## What works (keep)

- **Voice and readability.** Average sentence length 13 to 15 words; terms are glossed at first use; the hook (an 8B model that fits, 20 users, a crash) still makes the learner ask the right question.
- **Predicts that predict.** 11.02, 11.04, 11.07 and 11.08 now ask before the explanation, and the 11.07 and 11.09 predicts are close calls with two live options.
- **One running example, honestly labelled.** Every invented price, rate and shape is called the example's own; the paper-versus-blog split for the waste figures follows the dossier.
- **Arithmetic you can do by hand.** Every worked example shows the multiplication and unit; all of it re-derives, including the three new items (11.03 Yousef, 11.08 Tamer and transfer, 11.10 Q1 to Q5).
- **Assessment shape.** 11.10 key positions 1, 2, 0, 3, 1, the key is strictly longest in only one of five (Q2, 6.3%), every option has its own explanation. Round 1 leaks (Karim, Reem, shared-prefix options) are gone.
- **Fading support.** Worked example, then "Your turn" behind a `FaqItem`, then a gate scenario on a new model with a failing third fix.
- **Misconception hunts.** 11.06's three-person hook, the 11.02 "ceiling, not a measurement" Callout, the 11.09 "check the weights first" Callout now placed after the quiz, and the 11.08 rule that admission control is for spikes.
- **Canvas engineering.** All 66 canvas tests pass; defaults match the pack; `describeChange` names the input and the factor; `speculative-decoding-gain` experiment 2 now reaches the failure the claim is about; `gpu-memory-budget` leads with tokens; `kv-cache-per-token` can move the chat length.
- **Module-level compliance.** No em or en dashes, no company, model or GPU names, no links, fictional organisations marked, no audit flags, `12.04` has the module-linked self-hosting question.

## Recommendation: revise (narrow)

All four round 1 S2 defects are fixed or reduced to S3, and there is no S1 or S2 left. The module does not pass the gate because the average is 4.14 against 4.3 and dimension 19 cannot be scored. No dimension is below 4.

This is the second round, so the revision loop applies. D03 and D11 partly survived. I do not recommend a rewrite from the brief: both residuals are narrow (R2-01 is one diagram, R2-02 is one canvas and one predict), and the writer has shown the pattern works elsewhere. I recommend one more targeted pass, verified by diff and script rather than a full third review.

Priority for the writer:
1. R2-04, R2-09 and R2-07 are small edits to canvas data and one paragraph; they remove three S3.
2. R2-06 is a one-line change in each chapter and removes the cross-module break.
3. R2-01 (one diagram) and R2-02 (re-drive one canvas) are the real work.
4. R2-08 and R2-03 are the next largest; R2-05 is for the orchestrator.
5. The S4 items are cheap; do them in the same pass.

Re-check scope after the pass: 11.05 diagrams, `deployment-fit-steps` and `prefill-decode-steps` data and spec, 11.08 headroom paragraph, 11.10 Q1, the Wadi Labs tag in the seven chapters, and the roadmap lines.
