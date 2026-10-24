---
artifact: context-pack
course: ai-engineering-interview
for: chapter-writer, interactive-canvas-builder, critic
version: 1
---

# Inference pack: module 11, LLM inference, serving and GPU capacity

The sponsor asked on 2026-10-24 for a module on LLM inference, serving and GPU capacity. The course had nothing on it ("we didn't even know what KV cache is"). Start from zero and reach senior interview depth. The trigger was an interview-style question: an 8B model fits on one GPU, yet 20 users with long chats crash it. Use the idea only: no quotes, no authors, no course names, no links.

Binding inputs, in order:
1. `writer-pack.md` (this folder): voice, hard rules, formats, assessment rules. Its "Allowed tool names" list is extended below.
2. `../research-inference.md`: the dossier. **Every number in a chapter must appear in it or be derived from it with the arithmetic shown.** Do not use a number the dossier marks unverified as a fact.
3. agent-ip v0.4 rules on main: every Learn chapter teaches through an interactive element (`agent-ip/04-interactive-playbook.md`, `10-interactive-canvases.md`), and `node agent-ip/scripts/audit-course.mjs courses/ai-engineering-interview` must show no flag on any module 11 chapter: Learn and Read chapters at least 1,200 prose words, the gate at least 700, at most 6 top-level components, 25 tags, 3 graded interactions, exactly one canvas per Learn chapter, at least one diagram in every chapter except the gate and the quiz.

## Naming rules for this module

- **Allowed:** vLLM and SGLang (open-source engines with papers), PagedAttention, RadixAttention, FlashAttention, continuous batching, chunked prefill, GPTQ, AWQ, FP8, INT8, INT4 and Kubernetes. Vendor products such as GPU programming toolkits are not.
- **Not allowed:** model product names (say "an 8-billion-parameter open model with 32 layers, 8 KV heads and a head size of 128"), GPU product names (say "an 80 GB data-centre GPU" and give memory bandwidth as "about 2 TB/s" only where the dossier supports it), vendor engines (say "GPU vendors and model hubs also ship their own serving engines"), any company.
- **Units:** use GB (decimal) for memory in prose. Say once, in 11.3, that 4 GiB is about 4.29 GB. The reference numbers below are the only ones to use for the running example.

## Running example (verified, use exactly)

| Quantity | Value | Source |
|---|---|---|
| Model | 32 layers, 32 attention heads, 8 KV heads, hidden size 4,096, head size 128 | dossier, config of a popular open 8B model |
| Weights at 16-bit | 8,030,261,248 parameters x 2 bytes = 16.06 GB | dossier |
| KV cache per token, 16-bit | 2 x 32 x 8 x 128 x 2 = 131,072 bytes (128 KiB, about 0.13 MB) | arithmetic |
| One chat of 32,768 tokens | 4 GiB, about 4.29 GB | arithmetic |
| 20 such chats | about 85.9 GB | arithmetic |
| GPU | 80 GB, 10% kept back for activations and the engine in this example | example; the engine's own default memory share is 0.92 in vLLM v0.32.0 (dossier) |
| Memory left for the KV cache | 80 x 0.9 - 16.06 = 55.94 GB | arithmetic |
| Chats of 32,768 tokens that fit | 13 at 16-bit, 26 at FP8 (1 byte per value) | arithmetic |
| Same model with full multi-head attention (32 KV heads) | 512 KiB per token; with one KV head (MQA) 16 KiB | arithmetic |
| Older servers' KV memory waste | the vLLM paper's chart: only 20.4% to 38.2% of KV memory held token states, so 61.8% to 79.6% wasted; vLLM 96.3% used (3.7% wasted) | dossier |
| Paged block size | 16 tokens (vLLM default, v0.32.0) | dossier |
| Speculative decoding | expected tokens per target step (1 - a^(g+1)) / (1 - a); walltime factor (1 - a^(g+1)) / ((1 - a)(g c + 1)). At a = 0.8, g = 4, c = 0.05: 3.36 tokens per step, factor 2.80 | dossier and arithmetic |
| Cost per million tokens | GPU price per hour / (tokens per second x 3,600) x 1,000,000. Example only: 2 dollars an hour at 2,500 tokens a second is about 0.22 dollars per million tokens | method from dossier; numbers are an example |

Say clearly when a number is the example's own. Do not give real GPU prices or measured tokens per second.

## Chapters (course.yaml order)

All under `courses/ai-engineering-interview/11-inference-and-serving/`. Frontmatter `module: 11`. Minutes in brackets. Every Learn chapter: one `BigWordAlert`, `GlossaryTerm` for other terms on first use, one ```mermaid diagram, one canvas with a predict right before it, the four copy blocks after it (**What this shows**, **Try this**, **What changed**, **Limits of the model**), two MCQs (one a transfer check after the canvas), an "In the interview" section with a `FaqGroup` of three `FaqItem`s (model answer with a number, then two follow-up probes), and a **Next:** line. Three graded checks per Learn chapter: one predict and two MCQs.

1. **11.01-set-the-scene.md** "Set the scene" (Read, 15). The story: Nour's team self-hosts the 8B model on one 80 GB GPU for an internal assistant at Wadi Labs (fictional). The demo works. On launch day, 20 people keep long chats open and the server runs out of memory. Weights fit; something else grows. What the module covers and why interviewers ask ("will this fit?" is a common estimation question). `LearningObjectives`, one predict (weights fit, so why the crash?), a mermaid diagram of where GPU memory goes (weights, KV cache, activations), 1,200+ prose words. No canvas.
2. **11.02-prefill-and-decode.md** "What happens when a model answers: prefill and decode" (Learn, 40). Prefill processes the whole prompt at once (compute-bound); decode makes one token at a time and must read all the weights for every step (memory-bandwidth-bound at small batch); time to first token, time per output token, throughput; why batching raises throughput but can raise each user's latency; the weight-read floor as an upper bound, not a measurement. Canvas `prefill-decode-steps`.
3. **11.03-kv-cache.md** "The KV cache from first principles" (Learn, 40). Why attention needs keys and values for every earlier token; caching them instead of recomputing; the per-token formula; GQA and MQA; how context length multiplies it; FP8 KV halves it by arithmetic (the engine docs say only that it reduces memory significantly). Canvas `kv-cache-per-token`.
4. **11.04-gpu-memory-budget.md** "GPU memory budgeting and sizing" (Learn, 40). Weights, KV cache, activations and the engine's reserve; plan capacity in tokens held at once, not users; sizing for N users at a context; cost per million tokens (method). Canvas `gpu-memory-budget`.
5. **11.05-batching-and-paging.md** "Continuous batching, PagedAttention and prefix caching" (Learn, 40). Static batching waits for the longest request; continuous (iteration-level) batching; chunked prefill; contiguous reservation versus paged blocks and the measured waste; prefix caching and RadixAttention; disaggregated prefill and decode as a goodput tool under latency targets (not raw throughput). Canvas `paged-kv-allocation`.
6. **11.06-smaller-and-faster.md** "Quantization, speculative decoding and FlashAttention" (Learn, 40). Weight quantization (INT8, INT4, FP8; GPTQ and AWQ as methods) and the quality trade-off as the sources state it; KV cache quantization; speculative decoding with a draft model and the formulas; FlashAttention changes how attention reads memory, not the size of the KV cache. Canvas `speculative-decoding-gain`.
7. **11.07-beyond-one-gpu.md** "Beyond one GPU, and choosing how to serve" (Learn, 40). Tensor parallelism and pipeline parallelism (what each splits, when one GPU is not enough); serving engines and what they share (continuous batching, paged KV, prefix caching, quantization, an API-compatible server); self-hosting versus calling a hosted API, with reasons. Canvas `self-host-or-api`.
8. **11.08-admission-control.md** "Admission control and capacity in tokens" (Learn, 40). Token budgets, caps on requests and tokens in flight, queueing and backpressure, the engine's preemption (recompute is the default in v0.32.0) and rejecting with 503 when a bounded queue is full; rate limits; response and semantic caching from module 9 tied back. Canvas `admission-control-tokens`.
9. **11.09-will-it-fit.md** "Interview drill: will this deployment fit?" (Learn, 40). A five-step estimation method (weights, KV per token, tokens held at once, compare with memory left, choose a fix) with two worked examples and a third for the learner; common mistakes; a larger question bank (six `FaqItem`s). Canvas `deployment-fit-steps`.
10. **11.10-quiz.md** "Inference and serving" (Check, 20). Five MCQs, activities only.
11. **11.11-checklist.md** "Checklist and learning log" (Gate, 40). Checklist, a learning log of four questions, `ChapterRecap`, and an open question: "Size this deployment" for a given scenario (model shape, GPU, users, context): show the arithmetic, say whether it fits, and choose two fixes with their trade-offs (minWords 180, recording optional as in the writer pack).

Also update: `10-production/10.07-checklist.md` **Next:** line to point at module 11; `01-the-interview-loop/01.01-set-the-scene.md` module table (insert row 11 "LLM inference, serving and GPU capacity"); `12-mock-interviews/12.04-round-two-ai-system-design.md` question bank: one new `FaqItem` on sizing a self-hosted model, if the tag budget allows.

## Canvas specs (template 14A, condensed)

Renderers: `slider`, `sequence`, `factor` in `frontend/src/canvas/renderers/`. Follow the build rules in `interactive-pack.md` in this folder (folder layout, spec.md, tests, naming, label lengths, no hex colours, tones only when they mean something). Lane names at most 8 characters, subtitles at most 10, arrow labels at most 18.

### `prefill-decode-steps` (sequence, 11.2)
- Claim: prefill handles the whole prompt in one pass; decode then produces one token per step, and every step must read all the weights and the growing KV cache.
- Lanes: App, Engine, Weights (memory), KV cache.
- Steps (about 9): prompt of 2,000 tokens arrives; prefill reads weights once and computes all 2,000 positions together; KV cache now holds 2,000 tokens (2,000 x 0.13 MB, about 262 MB); first token out (time to first token ends here); decode step 1 reads all 16.06 GB of weights for one token and appends one token to the cache; step 2 the same; the pattern repeats; with a batch of 8 users the same weight read serves 8 tokens; the answer ends.
- Limits: no real timings; one GPU; activations ignored.

### `kv-cache-per-token` (slider, 11.3)
- Inputs: layers 8 to 80 step 8 (default 32); KV heads 1 to 64 step 1 (default 8); bytes per value 1 to 2 step 1 (default 2, "1 = FP8, 2 = 16-bit"); tokens in the chat 1,024 to 131,072 step 1,024 (default 32,768). Head size is fixed at 128 (changed after critic round 1, D08).
- Stats: KV per token (KiB); one 32,768-token chat (GB); compared with 32 KV heads at the same settings (times smaller or larger).
- Bars (shared scale): this model per chat; same with full multi-head attention (KV heads = 32); same with one KV head.
- describeChange names the input and the factor (doubling KV heads doubles the cache).
- Defaults give 128 KiB and 4.29 GB. Limits: one sequence, no paging overhead, no activations.

### `gpu-memory-budget` (slider, 11.4)
- Fixed model: the running example (16.06 GB weights at 16-bit, 131,072 bytes per token at 16-bit).
- Inputs: users 1 to 64 (default 20); tokens per user 1,024 to 131,072 step 1,024 (default 32,768); KV bytes per value 1 to 2 (default 2); GPU memory 24 to 192 GB step 8 (default 80).
- Rule: memory for KV = GPU x 0.9 - 16.06; needed = users x tokens x per-token bytes; fits when needed <= available.
- Stats: KV needed versus available (GB); verdict "Fits" or "Out of memory by X GB"; cache space in tokens (426,784 at the defaults) with the chats of this length that fit in its detail (changed after critic round 1, D09).
- Bars: weights, KV needed, KV available (tone "bad" on needed when it does not fit).
- Defaults: needed 85.9 GB, available 55.94 GB, out of memory by 29.96 GB, 13 users fit.
- Limits: one GPU, the example's 10% reserve, no paging waste or fragmentation, weights stay 16-bit.

### `paged-kv-allocation` (slider, 11.5)
- Inputs: requests 1 to 64 (default 20); reserved context per request 2,048 to 32,768 step 2,048 (default 32,768); average actual tokens 100 to 32,768 step 100 (default 6,000, clamp to reserved).
- Rule: contiguous reserves the full context per request; paged allocates ceil(actual / 16) x 16 tokens per request; per-token 131,072 bytes.
- Stats: memory with contiguous reservation (GB); with paged blocks (GB); share wasted in each.
- Bars: tokens actually used, contiguous reserved, paged allocated.
- Defaults: contiguous 85.9 GB, paged 15.73 GB, used 15.73 GB.
- Limits: every request has the average length; no prefix sharing; the paper's measured waste for real systems (61.8% to 79.6%) also counts fragmentation this model leaves out.

### `speculative-decoding-gain` (slider, 11.6)
- Inputs: acceptance rate a 0.50 to 0.95 step 0.05 (default 0.80); draft tokens per step g 1 to 10 (default 4); draft cost as a share of one target step c 0.01 to 0.50 step 0.01 (default 0.05).
- Stats: expected tokens per target step; walltime improvement factor; verdict (faster, about the same, slower).
- Defaults: 3.36 tokens, factor 2.80.
- Limits: the paper's idealised model (independent acceptance per token, fixed costs); real gains depend on load.

### `self-host-or-api` (factor, 11.7)
- Options: hosted API; self-hosted engine.
- Criteria (score 1 to 5, weights 1 to 3): data stays in your network; cost at steady high volume; team effort to run; time to launch; control over latency and model version. Default weights 2, 2, 2, 2, 2. Scores are the example's judgement and labelled so.
- tryThis: raise data control to 3; raise team effort and time to launch to 3.

### `admission-control-tokens` (slider, 11.8)
- Inputs: requests arriving together 1 to 100 (default 30); tokens each request will hold 1,024 to 32,768 step 1,024 (default 16,384); KV capacity in tokens 100,000 to 1,000,000 step 10,000 (default 420,000, about the running example's 55.94 GB); admission limit as a share of capacity 50 to 100% step 5 (default 90%).
- Rule: admitted = floor(capacity x limit / tokens per request), capped at arrivals; queued = the rest; without a limit, holding all requests needs arrivals x tokens, and above capacity the server runs out of memory or preempts.
- Stats: admitted now; queued; without admission control (fits, or over capacity by X tokens).
- Defaults: 23 admitted, 7 queued; without control 491,520 tokens, over by 71,520.
- Limits: requests do not finish during the snapshot; no preemption modelled; real engines also cap the number of sequences.

### `deployment-fit-steps` (sequence, 11.9)
- Claim: a fit estimate is five multiplications and one comparison, done in tokens.
- Lanes: You, Model, GPU, Plan.
- Steps: weights from parameters and bytes; KV per token from the config; tokens held at once (users x context); memory left after weights and reserve; compare and decide; pick a fix (FP8 KV, shorter context, fewer users per GPU, a second GPU, admission control). Use the running example's numbers.

## Interview angle

"Will this fit?" and "why did it crash under load?" are estimation questions: the interviewer wants the arithmetic said aloud, units checked, and a fix with its trade-off. Model answers lead with the number, then the reason, then the trade-off.
