---
artifact: critique
course: ai-engineering-interview
artifact_under_review: courses/ai-engineering-interview/11-inference-and-serving/ (11.01 to 11.11), the sizing FaqItem in 12-mock-interviews/12.04-round-two-ai-system-design.md, and the eight canvas data files they use
lens: slop, assessment, technical
round: 2
scorecard_average: 4.00 (12 of 22 dimensions scored by these lenses)
blocking_defects: 1 (S2, platform), 0 (S1)
recommendation: revise
---

# Critic review, round 2: module 11 (inference and serving)

Lenses run: Slop, Assessment, Technical. Reviewed blind: the eleven chapters, the 12.04 FaqItem, the eight `data.ts` files, `inference-pack.md`, `writer-pack.md`, `research-inference.md`, `06-quality-gates.md` and the round 1 review. I did not read the writer's notes or any change log. I did read the platform import, sanitizer and reader code, because the Assessment lens asks whether the answer key is server-side only.

## What I ran

- `calc.py`: Python recomputation of every calculation in 11.01 to 11.11 and 12.04 (about 250 numbers: weights, KV bytes, chat sizes, budgets, chat counts, speculative decoding, TP tables, weighted scores, admission counts, worked examples, the gate model answer, cost per million tokens). Every number on the page matched. I also recomputed the canvas "Try this" numbers (160 GB gives 976,100 tokens and 29 chats; FP8 gives 853,568 tokens and 26 chats; 96 GB gives 70.34 GB and 536,647 tokens; 70% limit gives 17 admitted; 8,192 tokens gives 46; 0.5 and 0.40 gives 0.75; the self-host 39 to 34, 44 to 42, 37 to 36, 40 to 39).
- The two `python` blocks of 11.08, extracted from the chapter and executed together: prints `23 7 376832`, as the chapter shows.
- `scan.py`: parsed all 21 `quiz` fences and 9 `predict` fences with a YAML loader, then computed key position, option lengths, strict-longest and the ratio of the key to the longest wrong option. Every fence parses.
- Dossier check of the sourced claims in the chapters (paper figures, engine defaults, versions, flag semantics, the 52.4% and 74.1% hit rates, the 500 to 600 batch observation, the GQA ratio, the FP8 corrupted-response report, the speculative decoding formulas and Table 1 figure, FlashAttention 9 times, GPipe 4 times, 405B on 16 GPUs). All match the dossier or are labelled as the course's own arithmetic.
- `node agent-ip/scripts/audit-course.mjs courses/ai-engineering-interview`: no flag on any module 11 chapter (prose 1,404 to 1,857 in the Learn and Read chapters, 770 in the gate; 1 to 5 components; 7 to 16 tags; 3 graded items in every Learn chapter; 1 diagram each). `validate-course-source.ts`: 90 of 90 OK. `audit-course-structure.ts`: 0 errors, 0 warnings. (`content:validate` and `content:import` not run.)
- `npx vitest run` on the six canvas test files for module 11: 66 of 66 pass.
- Scans of the 12 files: no U+2014, U+2013 or U+2212 (round 1 found 12 minus signs); no link; no company, model product or GPU product name; no "he" or "she" except one (S4 below); the ASCII `x` is gone (all products use the multiplication sign).
- The platform path of the answer key: `sanitizeBlockConfig` was run on a quiz config that carries an `explanation` (see N01).

Not done: a person's blind re-answer of the keys (I recomputed by arithmetic, which is not blind); a rendered click-through at 375px; a live HTTP call to `/api/v1/blocks/:id/state` (N01 rests on reading the code and running the sanitizer function); the Mermaid renderer.

## Scorecard

"n/s" means not scored by this review (pedagogy, continuity or platform lens needed).

| # | Dimension | Score | Note |
|---|---|---|---|
| 1 | Outcome alignment | 4 | Objective 4 is now assessed (continuous batching 11.10 Q1, paging 11.05 and 11.10 Q2, prefix caching 11.05, quantization 11.06, speculative decoding 11.10 Q3). Objective 5 is assessed by 11.10 Q4 and the gate. D11 fixed |
| 2 | Domain specificity | 5 | One running example, a consistent fictional cast, every number derived from the dossier and labelled when it is the example's own |
| 3 | Depth over coverage | 4 | Wide scope but each topic gets a mechanism, a number and a price |
| 4 | Prose quality | 4 | Short sentences, glosses at first use. Residual idiom and a few 35-word outcome sentences (N12) |
| 5 | Chapter structure | n/s | |
| 6 | Interaction purpose | 4 | Predicts now come before their answer (D06 fixed) and the length bias is gone (D07). One canvas contradicts the chapters (N03) |
| 7 | Assessment quality | 4 | All 21 MCQ keys and 9 predict keys are right and unambiguous; every option has feedback; position and length metrics pass. Residual cues (N04 to N07) |
| 8 | Difficulty calibration | n/s | |
| 9 | Cognitive load | n/s | |
| 10 | Prerequisite integrity | 4 | Jargon is glossed at first use; SGLang is described where it first appears |
| 11 | Technical accuracy | 4 | All arithmetic exact, versions named, own reasoning labelled. One story that contradicts the engine behaviour the same chapter teaches (N02) |
| 12 | Production-grade coverage | n/a | No build chapter by design |
| 13 | Security and integrity | 3 | The module content holds no secrets, but the answer key of every MCQ and predict is recoverable from the client payload before answering (N01, platform-wide) |
| 14 | Accessibility | n/s | |
| 15 | IP protection | n/s | |
| 16 | Variant distinctiveness | n/a | |
| 17 | Continuity | 4 | The launch-day story is now told one way (D01, D15 fixed); cost inputs are one example (D17). Residual: N03 and N08 |
| 18 | Learner agency | n/s | |
| 19 | Instructor alignment | cannot score | No roadmap confirmation record (G2B waived, see the decision log) |
| 20 | Interactive canvas quality | n/s | Specs exist and 66 unit tests pass; no canvas QA report was in my inputs |
| 21 | Explanatory depth | 4 | Mechanism, worked example, trade-off, failure modes and debugging in the prose of every Learn chapter |
| 22 | Visual explanation | 4 | The 11.01 and 11.04 diagrams now argue; the 11.02 diagram still mostly restates the order |

Average of the 12 scored dimensions: 4.00 (threshold 4.3 applies to all 22, so this review alone cannot clear it). One dimension is at 3 (13), which triggers a revision. No S1.

## Defect count

New defects: S1: 0. S2: 1. S3: 3. S4: 8. Total 12.
Round 1 defects still open: 8 of 26 partly fixed, 0 not fixed (their residues are S4 and are in the status table, not counted again above).

## Round 1 status

Fixed means I re-checked the text and the numbers, not only the edit.

| ID | R1 sev | Status | Evidence |
|---|---|---|---|
| D01 | S2 | Fixed | 11.08 line 12 now says the team moved to paged memory and kept a 16-bit cache while it tested FP8. The 420,000-token capacity, FAQ 1, the canvas intro and the predict all rest on that one reading. A new, smaller problem in the same paragraph is N02 |
| D02 | S3 | Fixed | 11.01 line 61 and 11.04 line 26 now say the same: the 0.92 share pays for weights, cache and activations together (73.6 - 16.06 = 57.54 GB before activations), the example's 10% reserve is a round figure, and a real start-up log can show a smaller cache. "More careful" is gone |
| D03 | S3 | Fixed | Every engine-doc claim now names the engine and version at the claim (11.04 lines 26 and 50; 11.06 lines 32 to 38, 84, 127; 11.07 lines 24, 67, 82; 11.08 lines 116, 156 to 158, FAQ 2) |
| D04 | S3 | Partly fixed | Text fixed: FlashAttention is labelled "our own reasoning, not a sentence from the paper" (11.06 line 127, FAQ 3); 131,072 is "a length some models of this shape are built for" (11.03 line 66); the batching names are "also called"; 312 trillion is "an example, because peaks differ". Process not fixed: no sign-off and no "pending" record for the FlashAttention statement or the ridge-point framing exists in `run-log.md` or `decision-log.md` (dossier open question 7) |
| D05 | S3 | Fixed | The 11.08 table has the three knobs plus one queue row; the queue limit is described as counting requests in flight, running plus waiting; SGLang names are "the closest match, not an exact one"; the prompt-token cap uses the dossier wording. The table still shows nine names, but the text now says "Do not memorise flags" |
| D06 | S3 | Fixed | 11.02, 11.04, 11.05, 11.08 and 11.07 predicts now sit before the sentence that answers them or ask an unworked case (the 11.05 predict is now the static-batching sum; the 11.08 predict applies a formula to a case the text has not worked and the 23 appears only after it) |
| D07 | S3 | Fixed | Correct label is the second option in 5 of 9 predicts and the longer label in 5 of 9 (ratios 0.75 to 1.07). Residue is N11 |
| D08 | S3 | Fixed | 11.03 Q1 options are now four plain figures; 11.04 Huda options state results only. Mistake analysis is in the explanations |
| D09 | S3 | Fixed | 11.03 Q2 stem now says "The model cannot be retrained or replaced"; the FP8 hint is gone |
| D10 | S3 | Fixed | 11.09 Reem quiz now comes before the Callout; options are one cache fix, one load fix, one GPU-count fix, one weights fix |
| D11 | S3 | Fixed | 11.10 now grades continuous batching (Q1), paging (Q2), speculative decoding (Q3), parallelism (Q4) and admission control (Q5); quantization and prefix caching are graded in 11.06 and 11.05 |
| D12 | S3 | Partly fixed | Nine of ten claims reworded as the course's own advice. One remains: 11.01 line 20, "Most AI engineers never train a model, but many have to run one" (N09) |
| D13 | S3 | Partly fixed | 11.01 and 11.04 diagrams now argue (supply side against demand side; the 20-chat box above the cache box). 11.02 still draws the order prefill, first token, decode loop; the two "GB read" boxes add the reads but the paragraph under it says the same in words |
| D14 | S3 | Fixed | "preempt" is glossed at first use (11.05 line 61), "attention kernel" is glossed (11.06 line 127), "fused" and "tail" are gone, SGLang is described at first use (11.04 line 22), "scale" is explained |
| D15 | S3 | Fixed | 11.01 line 18 says the engine reserved 32,768 tokens for every chat when it opened; 11.04 line 58 and 11.05 line 14 tell the same story with the same numbers |
| D16 | S3 | Fixed | 11.09 worked example 2 now runs steps 1 to 5 in order, with the GPU loop inside step 4 |
| D17 | S4 | Fixed | 12.88 GB and "short by 5.78" now agree; 299 decode steps; one cost example (2 dollars, 2,500 tokens a second, 0.22 and 0.44) in 11.04, 11.07 and 11.09; the 12.04 answer uses 16.06, 55.94 and explains the 10% |
| D18 | S4 | Fixed | The driver lines are on the page and the output reproduces |
| D19 | S4 | Fixed | One notation (x as the multiplication sign, ÷), no U+2212, a full stop after "What this shows", the Callout title says "ceiling" |
| D20 | S4 | Partly fixed | Idioms removed except "pulls ahead" (11.07 line 117). A few outcome sentences are still 35 words (11.04 line 16) |
| D21 | S4 | Partly fixed | Wadi Labs is marked in every chapter. "he" remains in 11.10 Q4 (N12) |
| D22 | S4 | Partly fixed | 11.10 items were replaced. 11.07 TP quiz options C and D are unchanged and still weak (N07) |
| D23 | S4 | Fixed | 11.03 line 51 derives the head size (4,096 / 32 = 128); the "only time" sentence is gone |
| D24 | S4 | Fixed | The garbled explanation, the "authors compared" sentence, "later drafts rarely survive" and the pointer to the Huda quiz are all corrected |
| D25 | S4 | Partly fixed | 11.05 is 1,597 prose words and 11.09 is 1,857 (audit measure). The pack range is 1,100 to 1,600; seven of the eight Learn chapters are still above 1,600 (up to 1,857). Not a gate failure |
| D26 | S4 | Fixed | 11.07 line 26 says the KV cache is shared out across the GPUs "(our reading of the split)" |

## New defects

### N01. S2. Platform: the answer key is recoverable before the learner answers

**Location.** `server/src/utils/sanitize-block-config.ts` lines 7 to 16 (`SECRET_KEYS`); `server/scripts/import-course.ts` lines 623 to 631 (`quizExplanation`) and 658 to 672; `server/src/services/blocks/state.ts` lines 66 to 85; `frontend/src/blocks/quiz/QuizClient.tsx` lines 178 and 199; `frontend/src/blocks/predict/PredictClient.tsx` lines 85 and 102.

**Observation.** The importer joins the four per-option reasons of every MCQ into one string, `"<option>" <reason>` per line, and stores it as `explanation`. `SECRET_KEYS` strips `correct`, `correctOptionId(s)`, `rubric`, `sampleAnswer`, `hiddenTests`, `tests` and `solution`, but not `explanation`. I ran `sanitizeBlockConfig` on a quiz config: the output keeps `explanation` (`"a" Right. because`). `state.ts` sends that sanitized config to the reader through `GET /api/v1/blocks/:id/state`, and the client components read `config.explanation` directly. In module 11 the key option's reason starts with "Right." in all 21 of 21 MCQs, and the explanation of every predict states which option is right. The existing test in `server/tests/api/reader.test.ts` only asserts that `correctOptionIds` is absent.

**Why it matters.** The quality gates list "the answer key, rubric, hidden tests and solution are not in client-visible content" as a technical check, and dimension 13 covers it. Anyone enrolled can read every key in the page payload without answering. This is not specific to module 11: the same path serves the other 79 chapters, so it was already present at the earlier G5 pass. I file it S2 for this module because the content itself is correct and the fix is in server code. The orchestrator should treat it as S1 for the full course gate, and confirm it with one live request, which I did not make.

**Fix.** Return `explanation` only from `respond` and in `initialState` after a response (add it to the pre-answer strip for QUIZ and PREDICT), keep the local-grading fallback working only where `correctOptionIds` is shipped on purpose, and add a test that `config.explanation` is undefined before an answer. No content change is needed.

### N02. S3. 11.08 opening and Big Word: a paged engine "ran out of memory and restarted"

**Location.** 11.08 line 12 ("The server ran out of memory and restarted, and every chat was lost") and the `BigWordAlert` at line 16 ("Without it, a crowd takes the server down for everyone").

**Observation.** The story says the team had moved to paged memory and the Monday crowd then crashed the server. The same chapter later says that when the cache has no free blocks the scheduler preempts a running request and recomputes it, and that the vLLM v0.32.0 queue limit is off, so the queue has no end and "a spike then grows the wait for everyone" (lines 116 and 156). The dossier lists these two as the failure modes for this setup (failure modes 3 and 5: preemption churn, unbounded queue raising TTFT). Neither is an out-of-memory restart.

**Why it matters.** A learner who repeats the story in an interview ("without admission control vLLM crashes") will be corrected by a probing interviewer. The chapter's own explanation of what happens contradicts its hook.

**Fix.** Tell the Monday story as the dossier does: the queue grew, first words took minutes, running chats were preempted and recomputed, and clients timed out. Change the Big Word to "Without it, a crowd makes everyone wait or forces chats to be redone."

### N03. S3. Canvas `deployment-fit-steps` tells the learner that admission control is the second fix for a steady shortfall

**Location.** `frontend/src/canvas/deployment-fit-steps/data.ts` line 84 (step "A fix has a price", the sentence "Admission control caps the tokens in flight and queues the rest" in a list of five fixes) and line 102 (step "Say it in the interview order": "Admission control is the safer second fix").

**Observation.** The canvas follows the 11.09 chapter, where the same 20 chats are the planned load. 11.08 line 26, 11.09 lines 77 and 171, 11.10 Q5, 11.11 line 40 and the gate rubric all say admission control protects a spike and does not make a steady load fit; 11.09 even says "Admission control is not the fix here". The last canvas message recommends it.

**Why it matters.** It is the one mistake the module is built to remove, and the canvas is the last thing the learner reads before the transfer quiz. A mentor marking the gate will penalise exactly this sentence.

**Fix.** Last step: "Admission control is the safety net for a day above this load, not a second fix for it." "A fix has a price" step: say that admission control queues the extra chats and does not make them fit. Update `spec.md` if it repeats the sentence (grep found none in `spec.md`).

### N04. S3. 11.05 prefix-cache quiz tests the paragraph above it

**Location.** 11.05 lines 101 and 103 to 117.

**Observation.** Line 101 states the rule: "A hit needs an exact match that starts at the first token. Two prompts that are identical for 1,536 tokens but differ at token 1 share nothing." The quiz then describes two layouts, one with the changing line first, and asks which one lets the second request skip the prefill. Layout 1 is the "differ at token 1" case of the sentence. The options are four bare labels ("Layout 1", "Layout 2", "Both layouts", "Neither layout"), so the item measures recall of one sentence.

**Why it matters.** The slop checklist lists "a quiz that tests the paragraph above". Round 1 filed the same pattern as D10.

**Fix.** Move the rule sentence after the quiz, or give a case the text has not worked: for example a prompt with the rules first, a date line second and the question last, and ask how many of the 96 rule blocks are reused after the date changes.

### N05. S4. In four numeric items the key is the only option that reuses a number from two other options

**Location.** 11.04 Huda quiz (C shares "34.36 GB are needed" with A and "27.14 GB" with D); 11.05 Sara quiz (D combines the 21 GB of B and the 5 GB of A); 11.09 Sara quiz (C shares "8.03 GB" with A and "7.6 GB" with B); 11.10 Q3 (A shares "2.18" with B and "1.3" with D).

**Observation.** The distractors are built from partial computations, so the key necessarily contains both parts. A test-wise learner can pick the option that overlaps with the others without computing.

**Fix.** Give two of the three wrong options their own numbers (a unit slip, a factor of 2, a missed step) so no number appears in exactly the key and two others.

### N06. S4. The key echoes the stem or is the only option that answers the whole question

**Location.** 11.10 Q1 (key "the slot-steps left idle after a request finishes" repeats the stem's "leaves its slot idle"); 11.08 first quiz (the stem asks what admission control does and what no control would have done; only the key gives the no-control figure, 7,200 tokens over).

**Fix.** Make the gloss on each option equally specific, or ask one thing per stem.

### N07. S4. Four distractors no learner would pick

**Location.** 11.02 Q1 option D ("The weights grew, since a longer prompt makes the model itself bigger"); 11.03 Q2 option D ("Raise the KV heads from 8 to 16 for more room"); 11.07 TP quiz options C and D (the chapter has just said the weights are split; unchanged since round 1, D22).

**Fix.** Replace each with a slip the module names (reserve skipped, factor of 2, GiB for GB).

### N08. S4. Wadi Labs changes size between modules

**Location.** 10.01 line 14 ("a fictional remote software team of 12"); 11.01 to 11.09 first-use marks ("a fictional remote software company of about 40 people"). The writer pack also says team of 12.

**Observation.** Module 11 needs more than 30 people for the Monday meeting in 11.08, so it chose 40.

**Fix.** Use "a fictional remote software team" as in modules 6 to 8 and let 11.08 say "the whole company opened the assistant", or change the 10.01 headcount.

### N09. S4. One unsupported frequency claim is left in 11.01

**Location.** 11.01 line 20, `BigWordAlert` whyItMatters: "Most AI engineers never train a model, but many have to run one." No source was read (dossier unverified claim 20 covers employer questions; this is a similar gap).

**Fix.** "Many AI engineers run a model they did not train. Cost, speed ... " or drop the first clause.

### N10. S4. Two practice questions in 11.09 repeat 11.04

**Location.** 11.09 FAQ 5 ("How would you estimate the cost per million tokens of a self-hosted model?") repeats 11.04 FAQ 3 with the same figures (2 dollars, 2,500 tokens a second, 0.22, 0.44). 11.09 FAQ 6 ("How many users can this GPU serve?") repeats the point of 11.04 FAQ 2 ("plan in tokens, not users").

**Fix.** Replace FAQ 5 with a new probe (for example the break-even utilisation against an API, which 11.07 computes) and fold FAQ 6 into FAQ 4.

### N11. S4. Predict length is balanced only just

**Location.** The nine predicts.

**Observation.** The correct label is the longer one in 5 of 9 (55%), by 2% to 7%; the playbook rule for a set is "half or more is a rewrite". With four wrong-shorter and five wrong-longer the shortcut is not usable, but the margin is one item. Position is 4 first and 5 second.

**Fix.** Shorten the 11.06 correct label by a few words (ratio 1.07).

### N12. S4. Small language and metadata slips

- 11.07 line 117: "pulls ahead" (idiom for a second-language reader). Use "leads".
- 11.10 Q4: "How should he split the model?" Use "they" or "the team".
- `course.yaml` goal for 11.10 says "prefill and decode, the KV cache, memory budgets, batching and admission control"; the quiz now covers batching, paging, speculative decoding, parallelism and admission control.
- 11.08 table mixes `--max-num-seqs` style flags with `gpu_memory_utilization` (an argument name, not a flag). The vLLM flag is `--gpu-memory-utilization`.

## Assessment checks

- **Keys.** All 21 MCQ keys and 9 predict keys recompute and are unambiguous. Each wrong option has a plain reason that I checked against the arithmetic.
- **Key position.** A 4, B 6, C 6, D 5. The 11.10 quiz keys are 1, 2, 0, 3, 1 (all four used).
- **Length.** The key is the strict longest in 5 of 21 MCQs (24%). The largest margin is +6.3% (11.10 Q2). The 11.10 quiz has the key strictly longest in 1 of 5. No key is more than 10% longer than the longest wrong option.
- **Predicts.** First 4, second 5; longer 5, shorter 4; no label is more than 7% longer or 25% shorter than the other.
- **Coverage.** Every objective in 11.01 has a graded item (objectives 1 to 3 and 6 in 11.02 to 11.04, 11.08 and 11.09; objective 4 as above; objective 5 in 11.07, 11.10 Q4 and the gate).
- **Gate.** The model answer recomputes (28 GB, 163,840 bytes, 64.42 GB, 44 GB, 268,554 tokens, 10 chats, 20.42 GB short, FP8 32.21 GB with 11.79 spare and 21 chats, a 16,384 cap needing 42.95 GB, 8-bit weights leaving 6.42 GB short). The open question names the five parts a mentor looks for, which works as a shared rubric.
- **Answer key on the server.** See N01.

## What works

- Every number in the module recomputes exactly, and the two places where the example is optimistic (the 10% reserve against the 0.92 share, FP8 halving) say so.
- The launch-day story now has one cause, told the same way in 11.01, 11.04, 11.05 and 11.08, and the FP8 contradiction is gone. The worked examples in 11.09 follow the five steps in order.
- The predicts now come before their answers, are balanced in position and length, and test a decision (batch sum, bigger GPU, draft length, weights against cache) not a recalled sentence.
- The 11.10 quiz covers batching, paging, speculation, parallelism and admission control with new numbers, not the chapters' examples.
- Hedging is honest: "a ceiling, not a measurement", "our own reasoning, not a sentence from the paper", "the halving is our arithmetic", "history, not a promise".
- The dossier's traps are all handled: disaggregation as goodput, FP8 1.6 times as an upper claim, 36.9 times as history, the 60 to 80% as a blog figure next to the paper's chart.
- The engine table now carries versions and the right semantics, and the module says not to memorise flags.

## Recommendation

**Revise (narrow).** One S2 (N01, platform), three S3 (N02 to N04) and eight S4. No S1, no rewrite, no structural problem, and all 22 round 1 defects are fixed or have only a small residue.

Order of work:
1. N01: decide with the platform owner. If the key leak is confirmed by one live request, fix `sanitize-block-config.ts` and add the test; treat it as a blocker for the course gate even though it is outside the module files.
2. N03 and N02: two local text edits (one canvas file, one paragraph and one Big Word).
3. N04: change one quiz.
4. S4 items that are one-line edits (N09, N12, the N11 label, N06). N05, N07 and N10 can wait for the next release.
5. Record the pending FlashAttention and ridge-point sign-off in the decision log (D04 residue).

A third full round is not needed. After the edits, a diff read plus a rerun of `scan.py`, `calc.py`, `audit-course.mjs` and the canvas tests is enough to approve.
