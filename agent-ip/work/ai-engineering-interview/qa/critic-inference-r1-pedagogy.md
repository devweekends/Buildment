---
artifact: critic-review
course: ai-engineering-interview
module: 11-inference-and-serving
round: 1
lenses: pedagogy, explanatory depth and visual explanation, interactive canvas, continuity, instructor alignment
reviewer: independent critic (blind: artifact, rubric, dossier; no writer notes read)
date: 2026-10-24
recommendation: revise
---

# Critic review, round 1: module 11 (inference and serving)

## Scope and method

Read in full: chapters 11.01 to 11.11; `data.ts` and `spec.md` for the eight canvases (`prefill-decode-steps`, `kv-cache-per-token`, `gpu-memory-budget`, `paged-kv-allocation`, `speculative-decoding-gain`, `self-host-or-api`, `admission-control-tokens`, `deployment-fit-steps`) plus the `model.ts` of the slider canvases I needed; `06-quality-gates.md`, `agents/critic.md`, `inference-pack.md`, `writer-pack.md`, `research-inference.md`; the roadmap, decision log, `course.yaml`, and the renderer files that decide what the learner sees (`CanvasNotes`, `SequenceCanvas`, `StepNote`).

What I did to verify: re-derived every MCQ key, every worked example and every canvas "Try this" number by hand. I found no arithmetic error. I ran the `TokenBudget` sketch in 11.08 with a 30-request driver and got `23 7 376832`. I ran `audit-course.mjs`: no module 11 chapter carries a flag. I checked for em and en dashes (none) and for company or model names (none). I measured option lengths in every MCQ and predict.

What I did not do: run the canvas unit tests, render anything at 375px, or check the technical claims against the papers beyond the dossier (the technical critic owns that). Where I saw a technical doubt I list it under D28 as a hand-off.

## Scorecard

Scale 1 to 5 from `06-quality-gates.md`. Gate rule: every dimension at least 4, average at least 4.3.

| # | Dimension | Score | Why |
|---|---|---|---|
| 1 | Outcome alignment | 3 | Objectives 4 and 5 (batching, quantization, speculation, hosted API) have no evidence in the quiz or the gate (D14). The roadmap has no course outcome for inference (D19). |
| 2 | Domain specificity | 4 | One running example with real config arithmetic. A team of 12 has 20 and 30 users (D15). |
| 3 | Depth over coverage | 3 | Depth is real in 11.02 to 11.04. 11.05 to 11.07 pack three topics each (D03, D13). |
| 4 | Prose quality | 4 | Average sentence length 13 to 16 words, one idea per paragraph. Some undefined jargon (D16). |
| 5 | Chapter structure | 4 | Hook, concept, worked example, decision, failure modes, interview, bridge are all present. Predicts are often pre-answered (D04, D05). |
| 6 | Interaction purpose | 3 | The 11.08 predict and canvas default repeat what the text already said (D04). The 11.09 canvas is a passive replay (D11). |
| 7 | Assessment quality | 3 | Distractors mostly model real slips and every option has its own explanation. Four MCQs test the paragraph above or leak the key (D06). The module quiz skips about half the content (D14). |
| 8 | Difficulty calibration | 4 | Support fades well: worked, then "Your turn", then a new scenario in the gate. |
| 9 | Cognitive load | 3 | 11.05 and 11.09 are overloaded (D03, D12). |
| 10 | Prerequisite integrity | 3 | "Attention head" and "hidden size" are never taught but carry 11.03's GQA section (D02). Smaller gaps in D16. |
| 11 | Technical accuracy | 4 | All arithmetic holds. Provisional: technical critic to confirm D28. |
| 12 | Production-grade coverage | 4 | Admission, 503, preemption, metrics, API-key warning are covered. Replicas, load balancing and cold start are not (D25). |
| 13 | Security and integrity | 4 | Cache salts, per-tenant semantic cache, gateway in front of the engine. |
| 14 | Accessibility | 4 | Provisional. Wide code blocks on a phone (D12) and the doubled step numbering read by a screen reader (D11). Full check belongs to the technical critic. |
| 15 | IP protection | 5 | No company, model or GPU names; nothing from the capstone. |
| 16 | Variant distinctiveness | 5 | Not applicable (shared module). |
| 17 | Continuity | 3 | One numeric contradiction that breaks the 11.08 hook (D01) and several smaller ones (D15). |
| 18 | Learner agency and curiosity | 4 | Good hooks (11.01, 11.06, 11.09) and a "Your turn" plus a written gate. |
| 19 | Instructor alignment | 3 | Titles, order and minutes match `course.yaml` and the roadmap. G2B is still pending, the roadmap is half-updated, and it has no outcome for this module (D19). |
| 20 | Interactive canvas quality | 3 | Models are correct and defaults are sensible. Claim-to-control gaps in three canvases and mismatched copy in three chapters (D07 to D11). |
| 21 | Explanatory depth | 4 | The prose carries the mechanism, a worked example, a trade-off, a failure mode and an interview answer in every chapter. |
| 22 | Visual explanation | 3 | Good loop diagrams in 11.02, 11.03, 11.06, 11.08, 11.09. The 11.05 and 11.07 diagrams do not carry the chapter's main idea (D18). |

Average: 3.64. Dimensions below 4: 1, 3, 6, 7, 9, 10, 17, 19, 20, 22 (ten). The gate is not met.

## Defect count

S1: 0. S2: 4. S3: 15. S4: 9. Total 28.

## S2 defects (must fix before publish)

### D01 | S2 | 11.08, opening and "Count tokens, not requests"; canvas `admission-control-tokens` intro and spec

**Observation.** The hook says Wadi Labs "fixed its memory budget with paging and FP8", and then computes capacity as 55,940,000,000 / 131,072 = about 426,800 tokens, rounded to 420,000. 131,072 bytes per token is the 16-bit figure. With an FP8 cache the figure is 65,536 bytes and the same 55.94 GB holds about 853,000 tokens. The canvas spec repeats the 16-bit basis ("420,000, about the running example's 55.94 GB at 131,072 bytes a token").

**Why it matters.** If FP8 was already on, the 30 requests of 16,384 tokens (491,520) would fit with about 360,000 tokens to spare, and the Monday crash, the 23-and-7 split, the 71,520 shortfall and the whole worked example would not happen. A careful second-language reader who has just spent 11.03, 11.04 and 11.06 learning that FP8 doubles capacity will notice. It also undermines the module's one rule: bytes and tokens must reconcile.

**Required fix.** Remove "and FP8" from the first sentence (say "with paging and a chat length limit" or just "with paging"), or recompute the whole scenario at FP8 and change the arrival numbers. Update the canvas spec and `data.ts` comment only if the numbers change.

### D02 | S2 | 11.03, "Fewer KV heads: MHA, GQA and MQA" and the `KV head` glossary term; also 11.09 FAQ 2 and 11.10 question 2

**Observation.** "Attention head" is never explained in the module or in modules 1 and 2 (a search finds "attention" only in a 1.2 interview-topic list). 11.03 explains attention as "compares that token with all earlier tokens" and then writes "32 attention heads in 8 groups of 4", "each of the 32 heads keeps its own keys and values", and "Several attention heads can share one KV head". 11.09 FAQ 2 also uses "hidden size divided by the attention heads" with hidden size undefined.

**Why it matters.** The reader can still multiply numbers, but cannot answer the first senior probe, "why can several heads share one key and value set?", and cannot see why MQA loses quality. The 11.03 MCQ and 11.10 Q2 depend on this vocabulary. A zero-start reader meets 32 heads, 8 KV heads and 8 groups with no picture of what a head is. That is a missing prerequisite.

**Required fix.** Before the formula, add three or four plain sentences: inside each layer attention runs several times side by side, each run is a head, each head looks at the text in its own way and has its own small query, key and value lists, the head size is the length of those lists. Define hidden size once (the width of the model's main vector; hidden size = heads x head size). Then say in one sentence why sharing keys and values across heads is possible and what it costs.

### D03 | S2 | 11.05 as a whole

**Observation.** The chapter teaches five techniques: continuous batching, chunked prefill, paging, prefix caching and disaggregation. It has 2,051 prose words (3,033 total), against a writer-pack ceiling of 1,600. It has one canvas, which covers paging only, and one diagram, which shows two chats sharing block 7. That is prefix sharing, not the paging idea (non-contiguous blocks, only the last block wasted). Static versus continuous batching (the 750 of 1,600 slots calculation) is the most visual idea in the chapter and has no picture. Three of the five techniques have no interactive element at all.

**Why it matters.** This is the worst case of the cognitive load and "interactive woven into the explanation" problems. A phone reader with a weak connection meets about 25 minutes of reading before the graded items and nine named engine settings or defaults. The chapter also breaks "one hard thing at a time".

**Required fix.** Preferred: propose to the instructors a split into 11.05 (continuous batching and chunked prefill, with a slot-grid diagram showing 750 of 1,600) and a second chapter (paging and prefix caching, with the existing canvas), and move disaggregation to a short callout or to 11.07. This changes `course.yaml` and the roadmap, so it needs G2B. Minimum fix without a split: cut to 1,600 prose words or fewer (drop the invented goodput example, shrink the chunked-prefill paragraph to the 2,048 and 50 arithmetic, drop the SGLang page-size aside), replace the block-sharing diagram with one that shows a chat's blocks scattered in memory with the last block part empty, and add a small diagram for static versus continuous slots.

### D04 | S2 | 11.08, "Count tokens, not requests", the code sketch, the predict before the canvas, and the canvas default

**Observation.** The answer to the predict ("How many are admitted now?" with 30 chats of 16,384 at 90% of 420,000) is on the page three times before the learner reaches it: "so 23 requests are admitted and 7 wait", the printed `23 7 376832`, and "the 23 free slots admit them all" in the caches section. The opening paragraph also gives the 491,520 versus 420,000 shortfall. The canvas default then shows the same 23, 7 and 71,520 again. The predict's distractor (25, from ignoring the limit) is also the exact slip the text already warned against in the same paragraph.

**Why it matters.** The predict is graded, so it measures recall of the page, not prediction. On first open the canvas default carries no information the learner lacks, so the first interaction is confirmation, not discovery. This breaks the pack's "predict before, transfer after" pattern for the chapter that teaches the module's key protection.

**Required fix.** Keep the hook's demand-versus-capacity numbers but remove the admitted and queued counts and the `23 7 376832` line from everything before the predict. Move the code run to after the canvas, or change the predict to a case the text has not computed (for example a 70% limit with 20,000-token requests). Then the canvas default confirms the learner's own answer.

## S3 defects (fix before publish or track explicitly)

### D05 | S3 | 11.02, 11.04, 11.07 (predicts)

**Observation.** In 11.02 the paragraph just before the predict says the weights are read once per step "no matter how many requests share the step", then the predict asks exactly that. In 11.04 the sentence before the first quiz says "Doubling the GPU memory does not double the number of chats, because the weights stay the same size", and the later predict asks whether doubling gives double. In 11.07 the distractor "The hosted API takes the lead" cannot be reasoned to: raising a weight on a criterion where self-hosting scores 5 and the API scores 2 can only help self-hosting.

**Why it matters.** The writer pack says to place a predict "right before the explanation it prepares". Here the explanation comes first, and in 11.07 one option is not a live misconception.

**Required fix.** 11.02: move the batch paragraph's key sentence after the predict. 11.04: delete the giveaway sentence before the quiz. 11.07: replace the predict with one that has two live options, such as "which single weight raise flips the leader to the hosted API: launch speed or data control?"

### D06 | S3 | MCQs: 11.03 (Karim), 11.05 (prefix hit rate), 11.08 (Tamer), 11.09 (Reem), 11.08 (admission transfer)

**Observation.**
- 11.03 Karim: the stem says "his quality test passes with an 8-bit cache" and the key is "Store the cache in FP8". The stem names the answer. It also repeats the 13-to-26 numbers from 11.01 and 11.04, so it is not a new context.
- 11.05 prefix: the stem is nearly the paragraph above it ("a date or a user name in the first line..."), with the fix ("put the fixed text first") given in the same paragraph.
- 11.08 Tamer: the key is the sentence "The limit is below 100% because chats grow while they run".
- 11.09 Reem: the Callout directly above says "stop at step 1... only smaller weights or more GPUs can".
- 11.08 admission transfer: options 2 and 3 both begin "Admits 19 and queues 6", so a learner who sees the pair can eliminate options 0 and 1 without arithmetic and guess between two.

**Why it matters.** These measure recognition of the paragraph above, not application, and give a test-wise reader a shortcut.

**Required fix.** Rewrite the stems so the key is not stated or paraphrased nearby. Suggestions: 11.03, use a model with 64 layers, 8 KV heads and head size 128 at FP8 and ask for KiB per token; 11.05, give two prompts that differ in where the user name sits and ask which one hits; 11.08, show "queue long, KV usage 40%" and ask which limit to change (the chapter teaches both faults but tests one); 11.09, delete the Callout or move it after the quiz; 11.08 transfer, change one distractor's admitted number so no two options share a prefix.

### D07 | S3 | 11.02, 11.03, 11.04 copy blocks versus canvas `tryThis`; all chapters (duplicate display)

**Observation.** `CanvasNotes` prints the canvas's own "Try this" and "Limits of the model" under every canvas, and the slider renderer also prints a live "What changed". The chapter then prints four copy blocks again. Where the wording differs the learner sees two lists:
- 11.02: canvas says "before step 5, predict... compare step 5 with step 9". Chapter says "step to the first token... step through two decode steps... step to the batch of 8".
- 11.03: canvas experiment 2 is "from the defaults, set bytes per value to 1: 64 KiB, 2.15 GB". Chapter experiment 2 is "from 16 heads, set bytes to 1: back to 128 KiB, 4.29 GB".
- 11.04: canvas experiment 2 is "80 to 96 GB: 70.34 GB available, 16 users". Chapter uses 160 GB: 127.94 GB, 29 users.
Chapters 11.05 to 11.09 match their canvases. The `spec.md` of `kv-cache-per-token` also says the chapter's predict is "KiB per token and GB per chat for the default", which is not what the chapter asks.

**Why it matters.** The brief asks the copy blocks to match the canvas's default numbers and `tryThis`. Mismatch means a learner who follows the canvas panel and a learner who follows the prose see different expected results, and "Try this" and "Limits" appear twice on a phone screen.

**Required fix.** Make chapter and canvas say the same thing. For 11.03 and 11.04 the chapter's choice is the better one (it answers the predict), so change the canvas `tryThis` to match: 11.03 "16 heads, then 1 byte", 11.04 "160 GB, then FP8". For 11.02 rewrite the chapter's Try this to the canvas's two experiments. Ask the orchestrator to decide whether "Try this" and "Limits" should be dropped from the prose, since the canvas already prints them; keep "What this shows" and "What changed" only if they add reading guidance.

### D08 | S3 | Canvas `kv-cache-per-token` and 11.03

**Observation.** The spec claim and the chapter objective both include "a long chat multiplies it by its length", but the canvas has four sliders (layers, KV heads, head size, bytes) and a fixed 32,768-token chat. Context length is shown only in a static table in the chapter.

**Why it matters.** One of the three levers the chapter says a server owner controls (tokens held) cannot be moved in the canvas. A learner can spend ten minutes at the sliders and not discover the claim as stated.

**Required fix.** Add a fifth slider "Tokens in the chat", 1,024 to 131,072 step 1,024, default 32,768, and keep the stats. Or narrow the claim in the spec and chapter to "the per-token size is a product of four parts".

### D09 | S3 | Canvas `gpu-memory-budget` and 11.04

**Observation.** The teaching claim is "plan capacity in tokens held at once". The stats show GB needed versus available, a verdict, and "most users that fit". The pool in tokens (426,788 at the default), which the chapter calls the unit that matters, is never displayed.

**Why it matters.** The canvas reinforces counting users, which is the exact mistake the chapter warns against.

**Required fix.** Add a stat "Cache space in tokens" and show chats of this length as derived from it, so the learner sees tokens first and users second.

### D10 | S3 | Canvas `speculative-decoding-gain` and 11.06

**Observation.** The spec claim is that speculation pays only if enough drafts are accepted, and that a low acceptance rate or an expensive draft "can make it slower". Both Try-this experiments end faster than plain decoding (1.61 and 1.12). The "Slower" verdict appears only at inputs the experiments never reach (for example a = 0.50, g = 10, c = 0.50 gives 0.33). The chapter reaches "slower" only in a quiz (0.75), after the canvas.

**Why it matters.** The default state is the happy path, and the guided experiments do not show the failure that the claim is about.

**Required fix.** Change experiment 2 to reach a Slower verdict (for example acceptance 0.50 with draft cost 0.40 and 4 drafts gives 0.75). Give the chapter MCQ different numbers so it does not repeat the experiment.

### D11 | S3 | 11.09 canvas `deployment-fit-steps`, and "Your turn"

**Observation.**
1. The canvas replays the 80 GB, 20-chat, 32,768-token scenario whose 85.9 GB versus 55.94 GB numbers the learner has seen in 11.01, 11.03, 11.04 (text, canvas, FAQ), 11.06 and the same-numbers canvas in 11.04. It adds a narrated order, not a new case. The learner cannot enter a model or a GPU, so the drill's core skill, doing the estimate on a new case, has no interactive check.
2. Step titles say "Step 1: weights" to "Step 5: compare" while the renderer's own counter says "Step 7 of 10" for the compare message, and the Try-this lines say "before step 7" and "at step 9". The accessible name becomes "Step 7: Step 5: compare and decide".
3. The predict ("which single change makes all 20 fit: FP8 or a 24,576 cap?") repeats a fix the learner has already seen many times.
4. "Your turn" gives the solution in the next paragraph with no gate.

**Why it matters.** The chapter's job is practice on new cases. Two numbering schemes on one page is a real confusion for a second-language reader. A solved answer directly under the problem invites reading, not attempting.

**Required fix.** Drive the canvas from worked example 1 (Najm, 48 GB, 36 layers, 12 officers) so it adds a new case and lets you shorten the prose listing. Rename the in-canvas titles to words ("Weights", "Cache per token", "Tokens at once", "Memory left", "Compare") and refer to message numbers only in Try this. Put the "Your turn" check inside a `FaqItem` or a Callout the learner must open. Change the predict to a choice between two fixes with a close call (for example 8-bit weights versus FP8 cache on the 48 GB case).

### D12 | S3 | 11.09 length, repetition and phone fit

**Observation.** 2,138 prose words and 3,703 words in the file; the longest chapter in the course audit. The "Units and the reserve" section repeats 11.03 (GiB, bytes) and 11.04 (reserve). The seven "Mistakes that cost points" repeat 11.03's and 11.04's failure lists, and the "Counting users, not tokens" point is also in FAQ 6. The two `text` blocks have lines up to 83 characters, which scroll sideways on a 375px screen. Three of the six FAQ answers run 7, 7 and 10 sentences against the pack's 3 to 6. The 40-minute estimate does not look credible: at 120 words a minute the reading alone is about 30 minutes, before three graded items, six answers said aloud and the "Your turn" arithmetic.

**Why it matters.** The most important interview chapter is the least phone-friendly. The lesson is the method; the repeats dilute it.

**Required fix.** Cut "Units and the reserve" to three lines inside the five steps, shorten "Mistakes" to the four that are new here, trim FAQ answers to six sentences, wrap each worked-example line at 40 characters or fewer (one operation per line), and set the chapter estimate to a number you can defend (or split off the six-question bank). Target 1,600 prose words.

### D13 | S3 | 11.06 and 11.07 (and, less so, 11.02 and 11.03)

**Observation.** Prose words against the writer-pack ceiling of 1,600: 11.02 1,736; 11.03 1,692; 11.06 1,821; 11.07 1,664. 11.06 has three topics (quantization, speculation, FlashAttention) and its canvas covers one. 11.07 has three topics (parallelism, engines, self-host or API) and its canvas covers the third; the parallelism half has no picture of what is split and the engine table is a feature list the chapter itself says not to choose on.

**Why it matters.** Same load issue as D03, smaller. The interactive element covers a third of the content.

**Required fix.** In 11.06 reduce the method paragraph (LLM.int8, GPTQ, AWQ) to a three-row table with one idea each, and cut the Quality section to the Callout. In 11.07 cut the engine table to the two rows that matter (defaults move; read the log) and fold "What each side hides" into the interview answer. In 11.02 and 11.03, cut about 100 words each by removing the second statement of the 644,850 and 125 tokens-per-second results. Add a mermaid diagram to 11.07 that shows what each parallelism splits (layers cut across GPUs versus layer groups on GPUs), not only the decision flow.

### D14 | S3 | 11.10 and 11.11 (assessment alignment)

**Observation.** The five quiz items map to 11.02, 11.03, 11.04 plus 11.06 (weights versus KV), 11.05 (paging only), and 11.08. Not assessed in the module quiz: continuous batching, chunked prefill, prefix caching, disaggregation, speculative decoding, FlashAttention, tensor and pipeline parallelism, self-host versus API. Learning objectives 4 and 5 on the 11.01 list ("say what each fixes", "choose between one GPU, several GPUs and a hosted API") have no evidence outside the in-chapter checks. The gate checklist and learning log also leave objective 5 out. `course.yaml` says 11.10 covers "batching". Q1 repeats the first MCQ of 11.02.

**Why it matters.** Dimension 1: every outcome needs evidence. A learner can pass the quiz and the gate without being able to explain batching or choose a serving route.

**Required fix.** Replace Q1 (duplicate) with a continuous-batching or parallelism scenario, and make one of the other four cover self-host versus API or speculation. Add a learning-log question on parallelism and the hosted-API choice, and a checklist item for it.

### D15 | S3 | Continuity: numbers and story

**Observation.**
1. Cost example: 11.04 and 11.07 use 2 dollars an hour and 2,500 tokens a second (0.22, and 0.44 or 0.89 when busy). 11.09 FAQ 5 uses "2 units" and 2,000 tokens a second (0.278 and 0.556). The inference pack fixes the example at 2,500 and dollars.
2. Team size: 11.01 and 11.05 define Wadi Labs as "a fictional remote software team of 12". Then 20 people open the assistant (11.01), and 30 people paste documents at a stand-up (11.08).
3. Chat length: 11.01 and 11.04 diagnose the crash as 20 users holding 32,768 tokens (demand 1.5 times supply). 11.05 then says the average chat held 6,000 tokens and that the first engine reserved 32,768 each. Both can be true, but 11.05 never says so, and it silently changes the cause.
4. Capacity in tokens appears as 426,800 (11.04), 425,984 (the 11.09 canvas, 13 x 32,768) and 420,000 (11.08, explained). Only the last is explained.
5. 11.09 worked example 2 has labels 1, 2, 3, 5 and no label 4. The memory-left arithmetic is folded under step 2, which is the order the chapter tells the learner not to use.

**Why it matters.** Each is small; together they teach the learner that the module's numbers cannot be trusted to line up, which is the one habit the module is selling.

**Required fix.** Use the 2,500 and dollars example in 11.09 (0.22 and 0.44). Say "a company of about 40 where the assistant is open to everyone" or reduce arrivals to fit the team. Add one bridging sentence to 11.05: "On launch day a few chats were long and most were short, and the engine reserved 32,768 for every one." Pick one capacity figure per scenario or label the difference. Add a labelled step 4 line to worked example 2.

### D16 | S3 | Undefined terms and terminology drift (second-language reader)

**Observation.** Terms used without a definition:
- 11.02: "batch" and "small batch sizes" in the prefill and decode section before batch is defined in "Batching".
- 11.05: "hash", "kernel" ("an attention kernel that reads blocks"), "tenant", "radix tree" (only "a tree keyed by token sequences"), "tail of time between tokens".
- 11.06: "scale" (of a quantized group), "dequantization", "fused into the attention kernel", "floating-point", "walltime", "same distribution as the target".
- 11.08: "gateway", "async-safe design", "lock".
- 11.09: "hidden size" (see D02).
Terminology drift: 11.02 defines TTFT and TPOT and uses them; 11.05 and 11.08 switch to "first-token time" and "time between tokens". The dossier treats TBT and TPOT as different measures, so the drift is also inaccurate.

**Why it matters.** The audience reads English as a second language and cannot ask. Each undefined term is a place to stop.

**Required fix.** Add one-line `GlossaryTerm`s where tags allow (check the 25-tag budget in 11.05, 11.06) or a plain-words aside in the sentence. Keep TTFT and TPOT after they are defined.

### D17 | S3 | 11.09 FAQ 4 and worked example 1, 11.11 model answer, versus 11.08

**Observation.** 11.08 teaches admission control as a protection with headroom ("a safety net"). 11.09 FAQ 4 recommends it "first" for a permanent growth from 8 to 20 users, which permanently queues four of twenty. The gate model answer also starts with it, and 6 of 16 officers "wait for a chat to finish" while their chats stay open.

**Why it matters.** A senior interviewer would probe this: admission control protects a server against a spike; it does not make a steady load fit. The module never says where that line is.

**Required fix.** Add two sentences to 11.08 and one to 11.09: use admission control for spikes above the planned peak; if the steady peak does not fit, change the bytes, the context or the GPUs. Rewrite FAQ 4 and the model answer so FP8 plus a quality test comes first for steady growth and admission control covers the spike.

### D18 | S3 | Visual explanation

**Observation.**
- 11.05: see D03 (the one diagram shows sharing, and the biggest numeric idea has none).
- 11.07: the diagram is a decision tree; the chapter's main concept, what tensor and pipeline parallelism each split, has no picture.
- 11.06: quantization has a table but no picture of fewer bits per weight and per cached value, the point that weights shrink once and the cache shrinks per token.
- 11.01: the memory diagram lists four boxes and "KV cache grows" with no proportion. It restates the paragraph under it.

**Why it matters.** Dimension 22: a diagram that restates the prose is a defect, and one that omits the main concept leaves the prose to carry it alone.

**Required fix.** 11.01: put the byte numbers in the labels (16.06, 55.94, 8) and a second node "20 chats: 85.9" so the diagram argues. 11.05 and 11.07: as in D03 and D13. 11.06: one small flowchart "weights: once; KV cache: per token" is enough.

### D19 | S3 | Instructor alignment

**Observation.** The module matches `course.yaml` titles, order and minutes, and the roadmap lists the same 11 chapters (395 minutes). But:
- G2B sign-off for module 11 is still "pending" (roadmap open decision 10), so this module cannot clear G5 whatever its quality.
- The roadmap summary (line 15) still says "module 11 runs full mock rounds".
- The week table still maps modules 9, 10 and 11 to week 4 and the capstone to module 12, and the total reads "3,135 minutes, about 52 hours (matches `estimatedHours: 52`)". `course.yaml` now says 59 hours and the chapter minutes sum to 3,530 (58.8 hours).
- Outcome evidence in O1 and O7 still cites "11.2", "11.6", "11.7" and "12.4", which are now the wrong chapters.
- There is no course-level outcome for inference, so the 11 chapters trace to no signed outcome.
- `01.01` says "about 52 hours".

**Why it matters.** An instructor panel confirming the roadmap would see two different course shapes. The first question an instructor asks is "what outcome is this module for, and how is it checked?"

**Required fix.** Orchestrator or architect: fix the roadmap numbering, hours and week table; add an outcome O8 for inference and fit estimation with evidence 11.10 and 11.11; fix the 52-hour line in `01.01`; record the module-11 G2B state in the run log. This is outside the module folder, but the module depends on it.

## S4 defects (fix if cheap)

### D20 | S4 | 11.01
The chapter works out Nour's whole arithmetic (55.94 GB, 4.29 GB per chat, 85.9 GB, 13 chats, the 14th chat) in a Read chapter that is meant to open a puzzle, so 11.03 and 11.04 lose their reveal. The 11.01 predict also sits right before an explanation that names the answer. Consider stopping at "something grows with tokens" and leaving the numbers to 11.04.

### D21 | S4 | 11.02
The canvas has a "KV cache" lane and note text about cache reads two chapters before the cache is explained (11.03). The predict says "ignore the KV cache" without saying what it is. Add one clause in the hook ("the cache of past work, explained in 11.3") or put the cache lane's notes behind step 9.

### D22 | S4 | 11.03
"Time is cheap to save here, and memory is the scarce thing" is unclear and arguably backwards (the cache spends memory to save time). Say "The cache saves time by spending memory, and memory is the scarce resource on a GPU."

### D23 | S4 | 11.05, 11.07
"Hamza" is not in the writer pack's cast. "Ahmad's NGO team" (11.07 MCQ) introduces an organisation with no "(a fictional ...)" mark. Use cast names and mark the organisation.

### D24 | S4 | 11.08
The `TokenBudget` sketch is followed by "it was run with 30 requests... it printed `23 7 376832`" but the driver is not shown, so a learner cannot reproduce the line. Show the three-line loop, or say the driver is omitted.

### D25 | S4 | 11.07 and module scope
The 70B example stops at GB per GPU. The conversion to tokens and chats (done later in 11.09 with an explicitly labelled shape of 80 layers) is missing, so the "real room" claim at four GPUs is not checked in the unit the module teaches. The module also says "add copies for traffic" in one sentence and does not cover replicas, load balancing, cache-aware routing or weight loading time. The dossier does not research these. Either add a labelled forward pointer to 11.09 or state in the chapter that scale-out is out of scope.

### D26 | S4 | Canvas specs
Each canvas intro asks the learner to predict a default value, while the chapter's predict right above asks something different (`kv-cache-per-token`, `gpu-memory-budget`, `speculative-decoding-gain`, `paged-kv-allocation`). Two predict prompts in a row dilute both. Align them, and update `spec.md` lines that describe the chapter's predict.

### D27 | S4 | FAQ lengths
The writer pack asks for 3 to 6 sentences per model answer. 11.09 FAQ 1 runs 7, FAQ 3 runs 7 and FAQ 4 runs 10.

### D28 | S4 | Hand-off to the technical critic
(a) 11.08 table maps SGLang "tokens per step" to `--chunked-prefill-size`; the dossier lists `--max-prefill-tokens` (default 16,384) as the budget and `--chunked-prefill-size` as the chunk size, so check the mapping. (b) 11.03 quotes GQA paper scores (47.2, 47.1, 46.6) and "5 to 6 times faster" while the dossier says the time unit is unclear and to quote only the ratio. (c) 11.02 says "a research paper measured the crossover later, at 500 to 600 tokens in some multi-GPU setups": the dossier says this is a footnote observation for higher tensor-parallel degrees; confirm the wording.

## What works (keep)

- **Voice and readability.** Average sentence length is 13 to 16 words in every chapter, one idea per paragraph, and the set-the-scene hook (an 8B model that fits, 20 users, a crash) makes the learner ask the right question before the answer.
- **One running example, honestly labelled.** The 32 layers, 8 KV heads, 128 head size model, the 10% reserve and every invented price or rate are marked as the example's own. The weight-read ceiling is called a ceiling, not a speed. The paper-versus-blog split for the waste figure (61.8% to 79.6% from the chart, "60 to 80" as the announcement's rounding) follows the dossier.
- **Arithmetic you can do by hand.** Every worked example shows the multiplication and the unit, and all of it is right on re-derivation, including 11.09's two worked examples, the gate's `modelAnswer` and all 21 MCQ keys in the chapters and the quiz.
- **Distractors that model real slips.** Most MCQs are built from slips the module names (forgot the reserve, forgot the 2, used attention heads, counted weights twice, ignored the limit), and every option has its own explanation. The 11.10 quiz positions (1, 0, 3, 2, 0) and option lengths (one strictly longest key out of five) meet the pack.
- **Misconception hunts.** 11.06's opening ("one of the three is wrong") and its FlashAttention section, the 11.05 rule "put the fixed text first", the 11.02 "ceiling, not a measurement" Callout, and the 11.04 "stopping at the weights" failure mode are the kind of takeaway a learner can say aloud.
- **Fading support.** Worked example, then "Your turn", then a gate scenario on a new model (14B, 40 layers) with a model answer that shows a failed third fix. That is the right shape for the stated outcome.
- **Interview framing.** Every chapter ends with answers that lead with the number, then the reason, then the price, and each has two probes. The five-step map in 11.09 is a durable method.
- **Canvas engineering.** Defaults match the pack in all eight canvases; copy blocks quote the default numbers correctly in all eight chapters; limits are honest; `describeChange` names the input and the factor; the factor canvas flips the leader exactly as the chapter says (34 to 32, 39 to 34, 44 to 42).
- **Module-level compliance.** No em or en dashes, no company, model or GPU names, no links, correct fiction marking on every organisation except the one in D23, and no audit flags.

## Recommendation: revise

The module is sound in arithmetic and voice, and the architecture of the sequence is right. It does not meet the gate: ten dimensions score 3, four S2 defects stand, and the average is 3.64.

Priority order for the writer:
1. D01 (one clause) and D02 (a few sentences) are quick and remove two S2 items.
2. D04 (reorder numbers in 11.08) removes the third.
3. D03 is the main piece of work. Decide with the orchestrator whether to propose a split to the instructors (it also fixes D13 and D18 in part) or to cut 11.05 to 1,600 prose words with two diagrams.
4. Then the canvas and assessment items (D05 to D11, D14), then the continuity batch (D15 to D17), then D19 with the orchestrator.

Re-review scope for round 2: 11.03, 11.05, 11.08, 11.09, 11.10, the changed canvases (`kv-cache-per-token`, `gpu-memory-budget`, `speculative-decoding-gain`, `deployment-fit-steps`) and the roadmap edits. If D03 survives round 2 unchanged, the revision loop says rewrite 11.05 from the brief and escalate.
