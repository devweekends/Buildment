---
artifact: critique
course: ai-engineering-interview
artifact_under_review: courses/ai-engineering-interview/11-inference-and-serving/ (11.01 to 11.11) and the sizing FaqItem in 12-mock-interviews/12.04-round-two-ai-system-design.md
lens: slop, assessment, technical
round: 1
scorecard_average: 3.7 (11 of 22 dimensions scored by these lenses)
blocking_defects: 1 (S2), 0 (S1)
recommendation: revise
---

# Critic review, round 1: module 11 (inference and serving)

Lenses run: Slop, Assessment, Technical. Reviewed blind: the eleven chapters, the 12.04 FaqItem, `inference-pack.md`, `writer-pack.md`, `research-inference.md` and the quality-gate rubric. I did not read the writer's notes. I read the canvas `model.ts`, `data.ts` and `spec.md` files only to check that the "Try this" numbers in the chapters match the models.

## What I ran

- Python recomputation of every calculation in 11.01 to 11.11 and 12.04 (about 200 numbers, scripts in the session scratchpad). All keys, worked examples, tables and canvas "Try this" numbers were recomputed. Exceptions are listed in the defects below; every other number matched.
- The `TokenBudget` sketch in 11.08 was executed with capacity 420,000, limit 90 and 30 requests of 14,384 + 2,000 tokens. It prints `23 7 376832`, as the chapter says.
- `node agent-ip/scripts/audit-course.mjs courses/ai-engineering-interview`: no flag on any module 11 chapter (prose 740 to 2,138 words, components 1 to 5, tags 1 to 14, 3 graded items per Learn chapter, 1 diagram each).
- `audit-course-structure.ts`: 0 errors, 0 warnings. `validate-course-source.ts`: 90 of 90 chapters OK.
- Scans of the 12 files: no U+2014 or U+2013, no link, no company, model product or GPU product name (vLLM, SGLang, FP8, GPTQ, AWQ, LLM.int8(), Kubernetes and Apache-2.0 are the only proper names).
- A script over every `quiz` and `predict` fence for option length and key position.

Not done: a person's blind re-answer of the keys (I recomputed them by arithmetic, which is not blind), `content:import`, a rendered click-through at 375px, and any check that the answer key is stripped from client-visible content (platform behaviour).

## Scorecard

Scored only where my three lenses give evidence. "n/s" means not scored by this review (pedagogy, continuity or platform lens needed).

| # | Dimension | Score | Note |
|---|---|---|---|
| 1 | Outcome alignment | 4 | Objectives 4 and 5 are only partly assessed (D11) |
| 2 | Domain specificity | 4 | One running example, specific numbers, a fictional cast |
| 3 | Depth over coverage | 4 | Scope is wide but each topic gets a mechanism and a number |
| 4 | Prose quality | 4 | Plain, short sentences (average 12 words); some jargon and idioms (D14, D20) |
| 5 | Chapter structure | n/s | |
| 6 | Interaction purpose | 3 | Four of nine predicts are answered by the text above them; predict labels are length-biased (D06, D07) |
| 7 | Assessment quality | 4 | All 21 MCQ keys are right and every option has feedback; cue and coverage defects are S3 (D08 to D11) |
| 8 | Difficulty calibration | n/s | |
| 9 | Cognitive load | n/s | |
| 10 | Prerequisite integrity | 4 | A few terms are used before they are explained (D14) |
| 11 | Technical accuracy | 3 | One self-contradicting worked example (D01), engine versions missing (D03), unverified items stated as fact (D04), a misstated engine setting (D02, D05) |
| 12 | Production-grade coverage | n/a | No build chapter by design |
| 13 | Security and integrity | n/s | Key stripping not checked. The API-key warning in 11.07 matches the dossier |
| 14 | Accessibility | n/s | |
| 15 | IP protection | n/s | No capstone content in the module |
| 16 | Variant distinctiveness | n/a | |
| 17 | Continuity | 3 | The root cause of the launch-day crash is told two ways (D01, D15); cost example inputs differ (D17) |
| 18 | Learner agency | n/s | |
| 19 | Instructor alignment | cannot score | No roadmap confirmation record exists in the work folder (G2C and G2B were waived, see the decision log) |
| 20 | Interactive canvas quality | n/s | Specs exist; no canvas QA report was in my inputs. Chapter numbers match the models |
| 21 | Explanatory depth | 4 | Mechanism, worked example, trade-off, failure modes and debugging are all in the prose |
| 22 | Visual explanation | 4 | Six of nine diagrams argue; two restate the prose (D13) |

Average of the 11 scored dimensions: 3.7 (threshold 4.3). Three dimensions are at 3, so the gate does not open. No S1.

## Defect count

S1: 0. S2: 1. S3: 15. S4: 10. Total 26.

## S2

### D01. S2. 11.08, "Thirty people and one stand-up" (lines 12 to 14) and FAQ 1 (line 167)

**Observation.** The story says Wadi Labs "fixed its memory budget with paging and FP8". The next paragraph then computes capacity as 55,940,000,000 / 131,072 = about 426,800 tokens, which is the 16-bit number. With an FP8 KV cache the cost is 65,536 bytes per token, so the same 55.94 GB holds about 853,600 tokens, and the 30 requests of 16,384 tokens (491,520 tokens) fit with no admission control at all. Paging also removes the reserved-but-empty memory (11.05). The central worked example of the chapter ("491,520 does not fit in 420,000"), the canvas default of 420,000 tokens, the predict, the MCQ lead-in and FAQ 1 all rest on a premise the opening sentence denies.

**Why it matters.** A learner who has just met the FP8 halving in 11.03, 11.04 and 11.06 will see the contradiction. It undermines trust in the arithmetic of the module whose whole point is rigour. It also teaches nothing about how fixes combine with admission control.

**Required fix.** Change the opening to match the numbers, for example: the team fixed the memory budget with paging only and kept a 16-bit cache while it tested FP8. Or keep FP8 and rebuild the numbers (capacity about 853,600 tokens, a bigger crowd or longer chats). Update the story, FAQ 1 and the canvas framing sentence ("about the running example's 55.94 GB at 16-bit") so one reading is true everywhere.

## S3

### D02. S3. 11.01 line 61 and 11.04 lines 26 and 32 (reserve versus the engine default)

**Observation.** 11.01 says the example keeps 10% back, "the default is 0.92, so the example uses a slightly more careful figure". 11.04 correctly says the engine "checks how much the activations need when it starts, and gives the rest of its share to the cache". So at 0.92 the activations and graph buffers come out of the 73.6 GB share (dossier capacity example: 57.5 GB before them, about 52 GB after a 5 GB allowance). The example's 55.94 GB treats the 10% reserve as covering the activations as well. Compared with what the engine would report, the example is the less careful one, not the more careful one.

**Why it matters.** A probing interviewer asks how 0.9 compares with the engine default. The learner would give a wrong comparison, and the 13-chat figure is slightly optimistic against a real startup log.

**Required fix.** Drop "more careful". Say that 0.9 means "share left for weights and cache after activations and the engine", that the real 0.92 share also has to pay for the activations, and that a real startup line will show a somewhat smaller cache than the paper estimate. 11.01 and 11.04 must say the same thing.

### D03. S3. Engine-doc claims with no version (the rubric requires the version)

**Observation.** Version is named for defaults in 11.01, 11.05, 11.07 (table) and 11.08 (table). It is missing for these claims, all taken from engine documentation at v0.32.0 or v0.5.22:
- 11.04 line 26: "documents of the other engine advise keeping 5 to 8 GB free for activations" (SGLang, v0.5.22). Line 48: the 643,232-token log example (vLLM v0.32.0).
- 11.06 line 26: FP8 "2 times smaller" and "1.6 times", INT4 for few queries per second, 512 calibration samples. Line 28: FP8 KV scales default to 1.0, SGLang's dequantization warning. Line 84: speculative decoding aimed at medium-to-low traffic. Line 127: the README lists FlashAttention.
- 11.07 line 24 (Megatron algorithm), line 57 (the parallelism rule), line 83 (the API-key warning).
- 11.08 line 60 (cap on prompt tokens), line 100 (four remedies, SGLang retraction advice and "one retraction a minute"), FAQ 2 (SGLang).

**Why it matters.** The dossier says "a default quoted without a version is a defect" and that engine docs move. A reader cannot tell which release the "1.6 times" or "5 to 8 GB" belongs to.

**Required fix.** Name the engine and version at the first claim in each paragraph (for example "the vLLM v0.32.0 docs", "the SGLang v0.5.22 docs"), as the chapters already do for defaults.

### D04. S3. Dossier-unverified items stated as plain fact

**Observation.**
- 11.06 line 127 (and its FAQ 3): "FlashAttention changes how attention reads memory, not what the cache stores. The KV cache size formula has no term that FlashAttention touches." Dossier unverified claim 12 and open question 7: this is our inference from the paper's scope, not a sentence in the paper, and a subject-matter reviewer must sign it off. The chapter does not say it is an inference, and no sign-off is on file.
- 11.03 line 64: "the longest context this model accepts" for 131,072 tokens. Dossier unverified claim 1: that value is mirror-sourced (confidence Medium). The model is fictional-but-unnamed, so the sentence reads as a fact about a real config.
- 11.05 line 22: "continuous batching" and the paper's "iteration-level scheduling" are used as one idea. Dossier unverified claim 14: not checked as exact synonyms.
- 11.02 line 43: "A data-centre GPU can do roughly 156 operations for every byte". The 312 trillion operations figure is one datasheet value for one GPU generation, paired with an example bandwidth. It is labelled as an example only for the bandwidth. Dossier open question 7 asks for a reviewer to check the ridge-point framing before it reaches learners.

**Why it matters.** The pack says not to use unverified numbers or claims as fact. FlashAttention versus KV size is a classic interview trap, so it must be right and attributed.

**Required fix.** Label the FlashAttention statement as the course's own reasoning from the formula ("the paper does not say this; it follows from the formula"), and obtain the sign-off or record that it is pending. Say "the longest context a model of this shape might be configured for" or drop the claim. Add "also called" for the batching names. Call the 312 figure "a peak of about 312 trillion operations a second for one GPU generation, used here as an example".

### D05. S3. 11.08 lines 51 to 62: the engine-settings table

**Observation.**
- The dossier's "What not to teach" row says "Engine tours and flag memorisation: teach the three knobs and where to read the log". The chapter lists eight flag names.
- `--max-num-queued-reqs` is shown as "Waiting queue". The dossier (SV24) says it caps in-flight requests, waiting plus running. A learner who sets 20 expecting 20 waiting places gets fewer. The following sentences ("bound the queue", FAQ 1, MCQ in 11.10 "its queue allows 20 waiting requests") use the waiting reading.
- SGLang `--chunked-prefill-size` is shown as the equivalent of vLLM's tokens per step. The dossier does not make that mapping; SGLang also lists `--max-prefill-tokens` (default 16,384).
- The text says vLLM caps "prompt tokens waiting for prefill"; the dossier says "prompt tokens of requests in prefill".

**Why it matters.** Wrong or loosely mapped flag semantics are exactly what a technical reviewer checks first.

**Required fix.** Keep the table to the three knobs (requests running, tokens per step, memory share) plus one row for the queue limit. Describe the queue flag as in the dossier ("caps requests in flight, running plus waiting"). Say the SGLang names are the closest match, not an exact one. Use the dossier's wording for the prompt-token cap.

### D06. S3. Four of nine predicts are answered by the prose just above them

**Observation.** The writer pack says to place a predict "right before the explanation it prepares". In these chapters the answer is stated first.
- 11.02 line 77: "the same 16.06 GB read produces one token for each of them. The cost of the read is shared." The predict at line 81 then asks whether step time doubles.
- 11.04 line 69: "Doubling the GPU memory does not double the number of chats, because the weights stay the same size." The predict at line 103 asks exactly that.
- 11.05 line 14 ("most of that room sat empty") and the 6,000 of 32,768 numbers: the predict at line 54 asks what share is empty.
- 11.08 line 22: 420,000 x 0.9 / 16,384 = 23.07, 23 admitted. The predict at line 116 asks how many are admitted with the same numbers, and the answer is also in the story, the code output and the canvas default.
- 11.07 line 107: the correct label already contains the result ("39 to 34").

**Why it matters.** A predict that repeats the previous paragraph measures recall, not prediction, and gives the learner no surprise to resolve. The interactive-first design depends on prediction before explanation.

**Required fix.** Move each predict before the sentence that gives the answer, or change it to a case the text has not worked (for example 11.08: a different limit and size; 11.04: ask for 3 times the memory). Remove the result from the 11.07 label.

### D07. S3. Predict labels are length-biased

**Observation.** In all nine predicts the correct label is shorter than the wrong one or equal to it (ratios 0.67 to 1.0, never above 1.0). Examples: 11.01 77 versus 62 characters (wrong longer), 11.09 43 (correct) versus 64 (wrong), 11.07 44 versus 55. Position is balanced (five first, four second), but length points one way.

**Why it matters.** A learner can pick "the shorter one" and be right in 9 of 9 predicts. The MCQs are well balanced (correct option the strict longest in 5 of 21, at most 8.3% longer than the longest wrong option), so the predicts stand out.

**Required fix.** Rewrite so the correct label is the longer one in about half of the predicts, and the pair is of similar length in the rest.

### D08. S3. 11.03 Q1 and 11.04 Lina quiz: distractors name their own mistake

**Observation.**
- 11.03 lines 66 to 80: the correct option shows the formula ("from 2 x 40 x 8 x 128 x 2"), while the others say "from using all 32 attention heads, not 8 KV heads", "counting keys and values once, not twice" and "counting keys and values twice over". A learner can pick the only option whose reason is the chapter formula without computing. Options C and D are also hard to tell apart for a second-language reader: "once, not twice" and "twice over" describe opposite errors in nearly the same words, and explanation D ("counted once each ... Counting them twice over") contradicts its own option.
- 11.04 lines 124 to 138: the wrong options are "the same sum, but with 16-bit cache values", "with no reserve", "with no weights". Each announces what it left out, so the correct one is the only option with no flaw stated.

**Why it matters.** The item is answerable by elimination from the option text alone. It measures reading, not the arithmetic outcome.

**Required fix.** State only the result in each option (a number and a short label), and put the error analysis in the explanations. For 11.03 Q1 make all four options plain byte or KiB figures. Replace C and D with clearly different errors.

### D09. S3. 11.03 Q2 (line 123): the stem contains the key

**Observation.** The stem says "his quality test passes with an 8-bit cache" and asks "Which change alone doubles the chats that fit?". The only option about an 8-bit cache is the key.

**Why it matters.** The learner does not need to work out why the cache, not the weights, is the lever. That is the point of the item.

**Required fix.** Say "his quality tests pass for any change that keeps the model the same" or drop the sentence and let the arithmetic decide.

### D10. S3. 11.09 Reem quiz (lines 168 to 182) tests the callout above it and has an odd-one-out pattern

**Observation.** The Callout "Check the weights first" (lines 164 to 166) says that when the weights alone exceed the usable memory, only smaller weights or more GPUs can help. The quiz then asks exactly that. Three options end "cuts ... to 1.5 GB" and are all cache fixes; the key is the single weights option.

**Why it matters.** Both the preceding text and the option pattern give the answer.

**Required fix.** Put the quiz before the Callout or remove the Callout hint. Make the options parallel (one weights fix, one cache fix, one load fix, one GPU-count fix, each with its own number).

### D11. S3. Coverage gap against the module objectives

**Observation.** Objective 4 (11.01 line 107) promises "what continuous batching, paged memory, prefix caching, quantization and speculative decoding each fix". Continuous batching and chunked prefill have no graded item anywhere (the static-batching 47% sum appears in prose and FAQ only). Disaggregation and FlashAttention are graded only as a distractor in 11.06. The 11.10 quiz and the gate cover prefill and decode, KV size, budget, paging and admission control, and nothing on quantization, speculative decoding, parallelism or prefix caching. Objective 5 (choose between one GPU, several GPUs and a hosted API with reasons) is graded only through weight arithmetic and a weighted sum, never as a decision with reasons.

**Why it matters.** "Every outcome has at least one assessment" is a gate rule.

**Required fix.** Add one graded item for continuous batching versus static batching (a slot-utilisation sum with a different set of lengths). Swap one 11.10 item for quantization versus speculative decoding versus FlashAttention, or add a checklist-linked open prompt. State in the objective which outcomes are checked in the gate rather than in the quiz.

### D12. S3. Unsupported frequency and cost claims (slop checklist: unsupported superlative)

**Observation.**
- 11.01 line 82: "one of the most common estimation questions for AI engineers who run their own models".
- 11.04 line 149: "Most estimation mistakes in interviews are unit mistakes."
- 11.07 lines 14 and 142: "interviewers ask both"; "Many teams mix the two."
- 11.09 line 14: "one of the most predictable questions in an AI engineering loop"; line 154: "These seven mistakes cost candidates the most."
- 11.06 line 147: "Interviewers like these topics because each has a number and a trap."
- 11.11 line 37: "the slips that cost the most points".

Dossier unverified claim 20: no hiring source was read; the dossier "does not claim these are asked at any named employer".

**Why it matters.** These read as facts about interviews and have no source.

**Required fix.** Reword as the course's own advice ("a question like this is a good test of...", "in the practice rounds in this course, unit slips are the easiest to spot") or remove.

### D13. S3. Two diagrams restate the prose

**Observation.** 11.02 (lines 28 to 37): the flowchart is the order "prefill, first token, decode loop", which the two paragraphs around it say in words. 11.04 (lines 39 to 48): the flowchart repeats the numbered list directly above it ("The diagram follows the first three lines"). In 11.01 the diagram lists four boxes whose point (only one grows) is carried by the label "KV cache grows" and the paragraph below. The other diagrams argue (sharing in 11.05, the decision tree in 11.07, the request path in 11.08, supply versus demand in 11.09).

**Why it matters.** Rubric: a diagram that restates the prose is a defect.

**Required fix.** Make each diagram carry something the prose does not: for 11.02 show what is read at each phase (all prompt tokens at once versus one token plus the whole weights and cache); for 11.04 show the memory as a stacked bar in which the cache box is the only one that moves when users change.

### D14. S3. Undefined jargon at first use

**Observation.**
- "preempt" in 11.05 (line 48 and FAQ 1) before 11.08 explains it.
- "the tail of time between tokens" in 11.05 line 123.
- "an attention kernel" in 11.05 line 48; "dequantization is not fused into the attention kernel" in 11.06 line 28, and "fused kernels" in the 11.06 table.
- SGLang appears in 11.05 line 36 and line 95 with no description; it is introduced only in 11.07 line 72.
- "scales" for quantization (11.06) are mentioned as "the small extra numbers that store each group's scale" without saying what a scale does.
- "headroom" (11.01 line 55, 11.08) and "pods", "Apache-2.0" are used without a gloss.

**Why it matters.** The learner is a second-language reader with no GPU background.

**Required fix.** Add a one-line glossary term or a half-sentence gloss at first use; move the SGLang description to its first mention; replace "tail" by "the slowest few percent of gaps between tokens"; replace "fused" by "done inside the same step".

### D15. S3. The launch-day story is told two ways

**Observation.** In 11.01, 11.04 and 11.08 the launch-day demand is real tokens: 20 users x 32,768 = 655,360 tokens, "the demand was 1.5 times the supply" (11.04 line 56). In 11.05 lines 12 to 14 the real chats averaged 6,000 tokens (120,000 tokens, 15.73 GB), and the server said full because the first engine reserved 32,768 for each. If so, the real demand was well inside the 426,800-token pool and the 11.04 diagnosis ("demand was 1.5 times the supply") was wrong.

**Why it matters.** The learner is told in 11.04 that the fix is FP8, a cap or a second GPU, and in 11.05 that the cause was reservation. Both can be true as a story only if 11.01 and 11.04 say that the first engine also reserved the full context.

**Required fix.** In 11.01 or 11.04, say that the first engine reserved the full context per chat and that real chats were shorter ("the plan on paper, before paging"), or tell the 11.05 reveal as a second cause. Keep the numbers; change the framing.

### D16. S3. 11.09 Worked example 2 does not follow the five steps it has just taught

**Observation.** Lines 85 to 95 label steps 1, 2, 3 and 5. Step 4 (memory left) is folded into the "Two GPUs" and "Four GPUs" lines under step 2, and the block is introduced by "The lesson is in the middle line" (line 97). The chapter opens with "Every fit estimate uses the same five steps, in the same order" (line 22).

**Why it matters.** The learner is asked to say the steps aloud in order. The one example that shows multi-GPU does not.

**Required fix.** Write the example as steps 1 to 5 in order, with the "how many GPUs" loop inside step 4 and step 5.

## S4

### D17. S4. Rounding, off-by-one and mixed inputs in small numbers

- 11.09 line 105: three chats need 12.88 GB (98,304 x 131,072 = 12,884,901,888), not 12.89. Then "short by 5.78" and "1.47 spare" use the unrounded figure, so 12.89 - 7.10 does not give 5.78 on the page.
- 11.02 line 37: "a 300-token answer needs 300 trips through the weights". Prefill makes the first token, so decode takes 299 steps. Line 57 uses 299.
- 11.09 line 231 (FAQ 5): 2,000 tokens a second, 0.278 and 0.556. 11.04 and 11.07 use 2,500 tokens a second, 0.22 and 0.44. One cost example should be used.
- 12.04 FaqItem (line 240): "8 billion x 2 bytes = 16 GB", "72 - 16 = 56". The module uses 16.06 and 55.94. The 0.9 factor is shown as "80 x 0.9 = 72 GB" without saying it is a 10% reserve for activations and the engine, so the spoken answer misses the unit check the module teaches.

### D18. S4. 11.08 lines 24 to 45: the code output is not reproducible from the page

The text says the sketch "was run with 30 requests of 16,384 tokens" and shows `23 7 376832`. The capacity (420,000), the 14,384 + 2,000 split and the loop are not shown. I ran it and the output is right. Add the three driver lines.

### D19. S4. Notation and style are not consistent across the module

- 11.01 to 11.08 use the multiplication and division signs; 11.09, 11.10, 11.11 and 12.04 use ASCII `x`, `/` and `-` (28 `x` in 11.09 alone).
- 11.01 and 11.04 use U+2212 for the minus sign (12 times). It is not a dash, but it looks like one and defeats a simple dash search.
- 11.09 canvas copy uses `**What this shows:**` with a colon; every other chapter uses a full stop.
- 11.02 callout title says "A floor is not a measurement" while the text calls the same number a ceiling.

### D20. S4. Idioms and long sentences for a second-language reader

- Idioms: "the free lunch ends" (11.02 line 104), "pushes it over the edge" (11.01 line 74), "worth pausing on" (11.03 line 64), "When the line is full" (11.11 learning log 4), "pulls ahead" (11.07), "Monday stand-up" (11.08), "wreck an 8-bit scale" (11.06 glossary).
- Outcome sentences of 43 and 48 words in 11.03 line 14 and 11.02 line 14; "Try this" sentences of 34 to 37 words in 11.03, 11.04. The module average of 12 words is good, so these stand out.

### D21. S4. Fictional organisation mark and pronouns

- "Wadi Labs" first appears without "(a fictional ...)" in 11.02 (quiz lead-in, line 61) and 11.04 (line 12). The pack asks for the mark on first use in each chapter.
- The pack says to use they or them where gender is not needed. 11.02 ("himself", "he"), 11.03 ("his" twice) and 11.09 ("her") use gendered pronouns for fellows.

### D22. S4. Weak distractors

11.07 TP quiz C and D (the chapter has just said the weights are split); 11.10 Q4 option D (9 versus 12, "wastes about a quarter", no calculation gives 12); 11.08 end quiz options A and B; 11.10 Q1 correct option "send fewer tokens" is a product change while the chapters teach chunked prefill and prefix caching as the engine-side fixes. Replace with plausible slips (off by the reserve, off by a factor of 2, a unit slip).

### D23. S4. 11.03 head size and the "only time" claim

- Line 49 says "Its configuration file says 32 layers, 8 KV heads and a head size of 128". The dossier notes that two of the three sample configs do not list head size (derived as hidden size divided by attention heads). 11.09 FAQ 2 teaches this; 11.03 should too.
- Line 53 says "That is the only time this course converts between the two", but line 86 ("16 GiB, about 17.18 GB") and the failure modes (line 141) convert again.

### D24. S4. Small wording problems in feedback and labels

- 11.06 quiz explanation 0: "At 2.15 GB a chat that is 2 chats" is garbled.
- 11.06 line 62: "Its authors compared the score distributions of 100,000 responses". The dossier says they recommend comparing score distributions over 100,000 responses; do not say what they did.
- 11.06 predict (line 90): "later drafts rarely survive" overstates; at a = 0.8 the tenth draft survives about 11% of the time and the earlier ones are likely. Use "each extra draft token is less likely to be kept".
- 11.04 line 69: "The next question tests that idea" points at the Huda quiz, which tests the budget, not the 160 GB idea.

### D25. S4. Two Learn chapters are well above the pack length

11.05 (2,051 words) and 11.09 (2,138) exceed the writer pack's 1,100 to 1,600 range by about a third and run on a phone with weak data. The inference pack only sets a minimum, so this is not a gate failure. Consider moving the disaggregation section of 11.05 or the six-question bank of 11.09 into a stretch note.

### D26. S4. 11.07 TP table does not say that the cache is also split

The "Room for KV per GPU" column is correct, but the chapter never says that with tensor parallelism the KV cache itself is split across the GPUs (by KV head), so the 70B tokens-per-GPU conversion is not the single-GPU one. 11.09 example 2 uses pooled memory (2 x 72 GB) and the same per-token figure, which is the right model. One sentence in 11.07 would connect the two.

## What works

- Every one of the 21 MCQ keys is correct and unambiguous by arithmetic, and every option has its own feedback. Positions are spread across A to D (6, 4, 6, 5), the correct option is the strict longest in 5 of 21 (24%), and the largest margin is 8.3%, inside the 10% rule. The 11.10 quiz uses all four positions and the correct option is longest in 1 of 5.
- The numbers hold together. All of the running-example values (131,072 bytes, 4.29 GB, 85.9 GB, 55.94 GB, 13 and 26 chats), the speculative decoding formulas (3.36, 2.80, 1.94, 0.75, 3.05) and the paging numbers (15.73 GB, 85.90 GB, 10.7%) recompute exactly. The paper figures (20.4 to 38.2%, 96.3%, 36.9 times, 7.4 and 12.6 times, 52.4 and 74.1%, 3.69 times for 1.63 times operations) match the dossier, and the 60 to 80% blog wording is separated from the paper's chart as the dossier requires.
- The module respects its constraints: no em or en dash, no link, no company, model or GPU product name, no real price, and invented numbers are labelled as the example's own. The hedges are honest ("a ceiling, not a measurement", "the halving is our arithmetic").
- The dossier's hardest traps are handled well: disaggregation is taught as goodput under latency targets, not throughput; FP8 KV is labelled as arithmetic; 36.9 times is called history; the 1.6 times FP8 claim is called an upper claim.
- The prose teaches the mechanism before the numbers, with short sentences, one idea per paragraph, and a decision with its price at the end of each chapter. The "Your turn" in 11.09 and the gate's open question (with a model answer that also shows a fix that fails) ask for the skill interviewers test.
- The gate's model answer recomputes correctly (28 GB, 163,840 bytes, 64.42 GB, 44 GB, 268,554 tokens, 20.42 GB short, FP8 32.21 GB with 11.79 GB spare).
- Canvas "Try this" numbers all match the canvas models and the cross-references (4.5, 9.4, 9.5, 9.6) point at real chapters that say what 11.07 and 11.08 say they do.

## Recommendation

**Revise.** One S2 and fifteen S3 defects block the gate, and three scored dimensions are at 3 (6, 11 and 17). No S1, no structural problem, and no rewrite from the brief is needed. Most fixes are local edits to a sentence or a quiz option.

Order of work for the writer:
1. D01 (11.08 story) and D15 (the two tellings of the crash), because they change numbers other chapters echo.
2. D02 to D05 (technical wording and versions), then request the subject-matter sign-off dossier question 7 asks for.
3. D06 to D11 (predicts and quizzes), then rerun the position and length scan.
4. D12 to D16 (slop, language, structure).
5. S4 items if cheap.

Per the revision loop, send me the changed sections plus the predicts and quizzes they touch for round 2.
