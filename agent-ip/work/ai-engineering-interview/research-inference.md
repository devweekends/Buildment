---
artifact: research-dossier
course: ai-engineering-interview
module: llm-inference-serving-and-gpu-capacity
version: 1
status: draft
owner: research
sources_checked: 2026-10-24
hard_constraints:
  - Memory capacity and memory bandwidth, not arithmetic speed, set concurrency and decode speed; every claim must reduce to bytes and tokens
  - Learners have no GPU; the module teaches by calculators, tiny simulators and paper reading, so every number must be derivable by hand
  - Engine defaults and flag names move between releases; pin the version and the access date for every default
  - Paper results, engine documentation claims and our own arithmetic must stay separable (the "60 to 80 percent waste" figure is a blog claim, not a sentence in the paper)
  - Learners are ESL beginners who do not know what a KV cache is; the module starts at zero and ends at senior interview depth
out_of_scope:
  - Writing GPU kernels, CUDA or Triton
  - FlashAttention backward pass and the IO-complexity proof
  - GPTQ second-order (Hessian) mathematics and AWQ derivations beyond one idea each
  - Mixture-of-experts serving, expert parallelism, context parallelism, multimodal serving
  - Training-time parallelism (data, ZeRO, 3D) beyond naming the difference
  - Benchmark leaderboards, vendor prices, and cloud product tours
  - Reading engine scheduler source code
open_questions:
  - Which open 8B model is the running example (the figures in the brief match Llama 3.1 8B and a 7B Mistral; the ungated 8B from another family gives 144 KiB per token)
  - Whether the module may show a real engine log line as an exhibit (engine docs contain them)
  - How deep to go on speculative decoding variants (draft model versus n-gram versus head-based methods)
  - Whether any hands-on step may require a rented GPU (default: no)
---

# Research dossier: LLM inference, serving and GPU capacity

This dossier supports one new module of the course "Cracking the AI Engineering and Agentic AI Interview". All claims carry a source ID in square brackets, for example [SV1]. The source table at the end gives the URL, type, date checked and confidence. Every date checked is 2026-10-24 unless the row says otherwise. Claims marked **UNVERIFIED** must not appear in learner-facing text as fact.

Company and product names appear in this dossier so that writers can check sources. The brief forbids real company names in learner-facing text, so writers must use the company-free descriptions given in the "Engines and who makes them" table. Prices are never quoted; the cost section gives a method with invented numbers.

No source was answered from memory. Papers were downloaded from arXiv or the conference site and read as text. The two formulas that text extraction mangled (speculative decoding Equation 1 and Theorem 3.8) and the vLLM memory-waste figure were checked against rendered page images. Model configuration files were fetched from the model hub. Engine behaviour was read from the engine source and docs at a pinned release tag.

## Learner and context

**Who.** Fellows preparing for remote AI engineer and LLM engineer interviews. Arabic first language, English second. Python basics, HTTP and JSON; no ML training or GPU background (course brief, see `research.md`).

**What the interview asks.** The sourced material below supports questions of this kind: "Why is the first token slow and the next tokens fast?", "How much memory does a 32k-token chat take?", "Why does batching raise throughput but hurt latency?", "What does paging do for the KV cache?", "How would you size a GPU fleet and what does a million tokens cost?" The dossier does not claim these are asked at any named employer (see unverified claim 20).

**Implication for the module.** Start from a single request on a single GPU. Introduce prefill, decode and the KV cache before any engine feature. Each later technique (batching, paging, chunking, quantization, speculation, parallelism) is presented as a fix for a measured bottleneck from an earlier step.

## Domain model

### Entities

| Entity | Plain-English meaning | Source |
|---|---|---|
| Token | The unit of text the model reads and writes; models work on tokens, not words | [SV1] |
| Request | One prompt plus the generated reply | [SV1, SV3] |
| Prompt (input) tokens | All tokens the model reads before it writes | [SV5] |
| Output tokens | Tokens generated one at a time | [SV5] |
| Prefill | Processes the whole prompt and produces the first output token | [SV5, SV7] |
| Decode | Generates the remaining output tokens one per step | [SV5, SV7] |
| KV cache | The key and value tensors of the attention layers for every token seen so far; stored so earlier tokens are not recomputed | [SV1] |
| Iteration (step) | One forward pass of the model over the current batch | [SV3] |
| Batch | The set of requests processed in one iteration | [SV3, SV5] |
| Block (page) | Fixed number of tokens of KV cache stored together; vLLM default 16 tokens | [SV1, SV25] |
| Block table | Mapping from a request's logical blocks to physical blocks in GPU memory | [SV1] |
| Scheduler | Chooses which requests run each iteration; requests are waiting, running or preempted | [SV1, SV23, SV30] |
| Preemption | Evicting a running request's KV cache to free memory; recovered by recompute or swap | [SV1, SV23] |
| Token budget | Cap on tokens processed per iteration (`max_num_batched_tokens`) | [SV24, SV23] |
| SLO | Latency target such as a first-token limit and a per-token limit | [SV7] |
| Goodput | Highest request rate served while meeting the SLO for a set share (for example 90 percent) of requests, per GPU | [SV7] |

### Lifecycle of one request (sourced from the engine docs and papers)

1. Arrives and waits in a queue. vLLM's default request queue is unbounded unless `max_num_queued_reqs` is set; at the limit new requests are rejected with HTTP 503 [SV24].
2. Admitted when the scheduler has token budget and free KV blocks. Default policy is first come first served [SV24].
3. Prefill runs. With chunked prefill (default on in vLLM V1) a long prompt is split across iterations so running decodes are not stalled [SV23, SV5].
4. First output token appears. The wait so far is time to first token (TTFT) [SV5, SV7, SV30].
5. Decode steps run, one token per step, each step reading the model weights and the request's KV cache [SV5, SV9].
6. Finish on end-of-sequence or token limit. KV blocks are freed [SV1].
7. Alternative path: if KV memory runs out, the request may be preempted and later recomputed (vLLM V1 default is recompute, not swap) [SV23].

### The GPU memory budget (one model replica)

- vLLM paper, 13B-parameter model on a 40 GB A100: about 65 percent of memory is weights (26 GB), close to 30 percent is KV cache, the remainder is activations [SV1, Figure 1 and Section 1].
- SGLang docs state the identity: total memory = model weights + KV cache pool + CUDA graph buffers + activations [SV35].
- vLLM sizes the KV pool from `gpu_memory_utilization` (default 0.92, per instance) after profiling [SV25]. SGLang uses `--mem-fraction-static` (weights plus KV pool over GPU memory) [SV35].
- Capacity rule: concurrent tokens = KV pool bytes divided by KV bytes per token. vLLM prints this as "GPU KV cache size: N tokens" and "Maximum concurrency for M tokens per request" at startup [SV31].

### Metric vocabulary (three names for nearly the same thing)

| Term | Definition as the source gives it | Source |
|---|---|---|
| TTFT, time to first token | Latency from request arrival to the first output token; reflects initial responsiveness. Under load, queueing adds to it | [SV5, SV7] |
| TBT, time between tokens | Interval between consecutive output tokens of one request; affects perceived fluidity | [SV5] |
| TPOT, time per output token | Average time per generated token for a request, excluding the first token | [SV7] |
| ITL, inter-token latency | Time between consecutive streamed outputs (vLLM metric name `vllm:inter_token_latency_seconds`) | [SV30] |
| Request TPOT in the engine | (end-to-end latency minus TTFT) divided by (number of output tokens minus 1); recorded as zero for single-token requests | [SV30] |
| End-to-end latency | TTFT plus TPOT times the number of tokens generated in the decode phase | [SV7, footnote 1] |
| Throughput | Tokens generated per second across all users and requests | [SV7] |
| Goodput | Maximum request rate that still meets the SLO attainment target, per GPU provisioned; higher goodput lowers cost per query | [SV7] |

Teaching note: ITL equals TPOT only when each streamed event carries exactly one token. With speculative decoding one event can carry several tokens, so ITL and TPOT differ [SV30].

## Hard constraints

### 1. Memory sets the limits

Decode reads all model weights for every step, and each request also reads its own KV cache. At small batch the arithmetic units wait for memory [SV5, SV9, SV15]. KV memory then caps how many requests fit [SV1]. Everything in the module reduces to bytes and tokens.

### 2. Learners have no GPU

No source supports a hands-on step that needs a data-centre GPU. The module should use calculators, a paged-allocator simulator and a continuous-batching simulator running in the browser, plus reading real engine log lines as exhibits. Engine log lines exist in the docs [SV23, SV31, SV35].

### 3. Engine defaults move

vLLM v0.32.0 (released 2026-10-18) and SGLang v0.5.22 (released 2026-10-19) were the latest releases on 2026-10-24 [SV40]. The vLLM scheduler default token budget depends on GPU memory and usage context (see section 10). A default quoted without a version is a defect.

### 4. Separate paper, blog, docs and arithmetic

The widely repeated "60 to 80 percent waste" and "under 4 percent" figures are in the vLLM announcement blog [SV2], not as prose in the SOSP paper [SV1]. The paper gives bar-chart values from which the same ranges follow by subtraction. Learner text must say which is which.

### 5. Beginners and ESL

KV cache must be defined from zero. Every acronym is defined on first use. Numbers are given as bytes with the arithmetic shown, so a learner can reproduce them in a calculator.

## Existing explanations and gaps

Not surveyed beyond the primary sources. Time budget went to verifying numbers. Orientation sources (blog posts, video courses) were deliberately not used as support. A scan of existing courses on this topic is an open task (open question 6).

## Technical landscape

### 1. Prefill versus decode, memory-bound decode, metrics and the batch trade-off

**What each phase does.**
- Prefill "processes the entire input prompt and produces the first output token"; decode "generates the rest of output tokens, one-at-a-time" [SV5, abstract]. DistServe gives the same split: prefill generates the first token in one step, decode generates later tokens in multiple steps [SV7, Section 1].
- Prefill processes all prompt tokens in parallel in one iteration; decode is a full forward pass over a single token per request [SV5, Section 2].
- Splitwise calls them a compute-intensive prompt phase and a memory-intensive token generation phase [SV8, abstract].

**Why decode is memory-bound at small batch (three independent sources plus arithmetic).**
- Shazeer's analysis of incremental decoding: with n steps, total arithmetic is about b n d squared and total memory access about b n squared d plus n d squared; the ratio of memory access to arithmetic is about n over d plus 1 over b. When n is much less than d or b is near 1 the ratio is near 1, so memory bandwidth is the bottleneck on modern hardware. The 1 over b term is fixed by a larger batch, memory permitting [SV9, Section 2.4.1]. (b is batch size, n sequence length, d model dimension.)
- Sarathi-Serve: execution time is approximated as T = max(T_math, T_mem); an operation is memory-bound if T_math is less than T_mem. Decode batches have very low arithmetic intensity, so cost of the linear layers for one decode token is nearly the same as for 128 prefill tokens (Mistral-7B, one A100; Figure 4 caption). Execution time of linear layers is almost flat while the token count is small (weight fetch from memory dominates) and grows linearly once the batch crosses a threshold (LLaMA2-70B; Figure 6 caption) [SV5, Section 3.1].
- Theoretical crossover in that paper: operators become compute-bound at about 200 tokens on A100 GPUs; in practice they observed 500 to 600 tokens for higher tensor-parallel degrees because of fixed overheads (footnote 2) [SV5]. Our check: 312 TFLOPS BF16 dense divided by 1,555 GB/s (the 40 GB A100 figure in the datasheet) is 200.6 FLOPs per byte, which matches [SV38 and arithmetic].
- Chen et al.: transformer sampling is typically memory-bandwidth bound, so time per token is proportional to first order to the size of the parameters and the transformer memory [SV15, Introduction].

**Worked arithmetic (ours, not a source claim; label as an upper bound on speed).**
- Llama 3.1 8B weights at 16 bits: 8,030,261,248 parameters times 2 bytes = 16,060,522,496 bytes = 16.06 GB (14.96 GiB) [SV22 for the count].
- Each decode step must read the weights once. At 2,039 GB/s (A100 80 GB SXM, datasheet) the floor is 16.06 / 2,039 = 7.88 ms per step, so at most about 127 tokens per second for one request. At 3.35 TB/s (H100 SXM) the floor is 4.79 ms and about 209 tokens per second [SV38, SV39]. This ignores KV reads, kernel overhead and communication, so real speed is lower.
- Each 16-bit weight is read once and used for 2 FLOPs per token in the batch, so arithmetic intensity is about B FLOPs per byte at batch B. Ridge point of an A100 80 GB SXM is 312 TFLOPS / 2,039 GB/s = 153 FLOPs per byte, so about 153 sequences are needed before the weight reads stop being the limit. This explains why large batches are the main lever and why it is "free" until the crossover.

**Latency versus throughput trade-off of batch size.**
- Sarathi-Serve Takeaway 1: batching boosts decode throughput immensely but has little effect on prefill throughput; decode throughput rises roughly linearly with batch size while prefill throughput saturates almost at one request (Figure 3) [SV5, Section 3.1].
- Prefill iterations have high latency but saturate compute; decode iterations have low latency but low utilization, so batching suits decodes; mixing prefills into the batch causes interleaving that makes high throughput and low latency hard to get together [SV5, abstract].
- vLLM Figure 1 (right) shows throughput as a function of batch size, rising with batch and limited by KV memory [SV1].
- Policy trade-off: prefill-prioritizing schedulers optimise throughput but hurt time-between-tokens tail latency; decode-prioritizing schedulers do the opposite (Figure 2, illustrative) [SV5].
- vLLM docs: `max_num_batched_tokens` smaller (for example 2048) gives better ITL because fewer prefills slow decodes; larger gives better TTFT; above 8192 is recommended for throughput on small models and large GPUs [SV23].

### 2. KV cache: what is stored, per-token size, model configurations, MQA and GQA

**What is stored and why.** The key and value tensors of the attention mechanism, "commonly referred to as KV cache", represent the context from earlier tokens and are used to generate new output tokens in sequence [SV1, Section 1]. Reusing them avoids recomputing earlier tokens. SGLang's paper says the same at the level of reuse across calls [SV6].

**Formula.** bytes per token = 2 (K and V) x layers x KV heads x head dimension x bytes per value. vLLM states the arithmetic for a 13B model: 2 x 5120 (hidden size) x 40 (layers) x 2 (FP16 bytes) = 800 KB per token; a 2,048-token request reaches 1.6 GB [SV1, Section 3]. Our check: 2 x 5120 x 40 x 2 = 819,200 bytes; times 2,048 = 1.68 GB (1.56 GiB). The paper's "800 KB" uses KB loosely (819,200 bytes is 800 KiB). That model uses multi-head attention, where KV heads equal attention heads, so 5120 equals heads times head dimension.

**Model configuration files (fetched from the model hub, 2026-10-24).**

| Field | Llama 3.1 8B (mirror of the base model; official repo is gated) | Qwen3 8B (first-party, ungated) | Mistral 7B v0.3 (first-party, ungated) |
|---|---|---|---|
| num_hidden_layers | 32 | 36 | 32 |
| num_attention_heads | 32 | 32 | 32 |
| num_key_value_heads | 8 | 8 | 8 |
| hidden_size | 4096 | 4096 | 4096 |
| head_dim | not in file; 4096 / 32 = 128 | 128 (in file) | not in file; 4096 / 32 = 128 |
| max_position_embeddings | 131072 | 40960 | 32768 |
| torch_dtype | bfloat16 | bfloat16 | bfloat16 |
| Parameters (hub metadata, BF16) | 8,030,261,248 | 8,190,735,360 | 7,248,023,552 |
| Source | [SV22] | [SV20] | [SV21] |

The official Llama 3.1 8B config file returns HTTP 401 (gated) [SV22]. The mirror's values agree with the Llama 3 paper's Table 3 for the 8B model: 32 layers, model dimension 4,096, 32 attention heads, 8 key/value heads, and its statement that the models use grouped query attention with 8 key-value heads to speed inference and shrink the KV cache during decoding [SV19, Section 3.2]. The official repo's public API metadata gives the same total parameter count as the mirror (8,030,261,248) [SV22]. Treat the hidden_size, head_dim and max_position_embeddings values for Llama as mirror-sourced (confidence Medium) until someone with access confirms the first-party file (unverified claim 1).

**Verified per-token and per-sequence sizes (ours, derived from the table).**

| Model | KV bytes per token (16-bit) | 32,768 tokens | Weights at 16-bit |
|---|---|---|---|
| Llama 3.1 8B | 2 x 32 x 8 x 128 x 2 = 131,072 B = 128 KiB | 4.0 GiB exactly (131,072 x 32,768 = 4,294,967,296 B) | 16.06 GB |
| Qwen3 8B | 2 x 36 x 8 x 128 x 2 = 147,456 B = 144 KiB | 4.5 GiB | 16.38 GB |
| Mistral 7B v0.3 | 131,072 B = 128 KiB | 4.0 GiB | 14.50 GB |

The brief's figures (about 128 KiB per token, about 4 GiB for 32,768 tokens, about 16 GB of weights) are confirmed for Llama 3.1 8B and Mistral 7B v0.3 (weights 14.5 GB for the 7B). They differ for Qwen3 8B (144 KiB, 4.5 GiB, 16.4 GB). The full Llama 3.1 context of 131,072 tokens would need 16 GiB of KV for one request, as much as the weights.

**Same model, other attention layouts (ours; arithmetic on the Llama 3.1 8B shape, hypothetical).**
- If every one of the 32 heads kept its own K and V (multi-head attention): 2 x 32 x 32 x 128 x 2 = 524,288 B = 512 KiB per token, four times larger. 32,768 tokens would need 16 GiB.
- With a single KV head (multi-query attention): 2 x 32 x 1 x 128 x 2 = 16 KiB per token, one eighth of GQA-8.
- With 8-bit KV values: 64 KiB per token (halved from 128 KiB), ignoring scale storage.

**MQA (Shazeer 2019).** Keys and values are shared across all attention heads, which greatly reduces the size of these tensors and hence the memory-bandwidth requirement of incremental decoding; the resulting models decode much faster with only minor quality degradation [SV9, abstract]. The paper is an arXiv preprint by one author.

**GQA (Ainslie et al. 2023).** Interpolates between multi-head and multi-query attention, with one key and value head per group of query heads. Going from MHA to MQA reduces H KV heads to one and cuts KV cache size and the data loaded by a factor of H; because larger models scale the number of heads, MQA is a more aggressive cut and GQA keeps the same proportional decrease as models grow [SV10, Section 2.2]. Also contributes a recipe to uptrain MHA checkpoints into MQA with 5 percent of the original pre-training compute [SV10, abstract]. Table 1 (T5 XXL, time per sample on TPUv4, average score): MHA-XXL 1.51 s and 47.2; MQA-XXL 0.24 s and 46.6; GQA-8-XXL 0.28 s and 47.1 [SV10]. The table header says seconds while Figure 3's axis says milliseconds, so quote only the ratio (about 5 to 6 times faster than MHA-XXL) (unverified claim 8).

**Link to the cache size.** In a config file the ratio num_attention_heads / num_key_value_heads gives the KV reduction versus multi-head attention: 32 / 8 = 4 for the three models above.

### 3. PagedAttention and vLLM (Kwon et al., SOSP 2023)

**The problem.** Earlier systems store each request's KV cache in one contiguous chunk pre-allocated for the maximum length (for example 2,048 tokens), causing internal and external fragmentation; the pre-allocated size can differ per request. "Profiling results in Fig. 2 show that only 20.4% - 38.2% of the KV cache memory is used to store the actual token states in the existing systems" [SV1, Section 1].

**The figure, read from the rendered page (Figure 2, share of KV memory by use; token states / reservation / internal fragmentation / external fragmentation and others).**

| System | Token states | Reservation | Internal frag. | External frag. and others |
|---|---|---|---|---|
| Orca (Max) | 20.4 | 13.3 | 57.3 | 8.9 |
| Orca (Pow2) | 26.8 | 17.9 | 13.6 | 41.6 |
| Orca (Oracle) | 38.2 | 25.2 | not visible | 36.6 |
| vLLM | 96.3 | not visible | not visible | small |

Derived waste: 100 - 38.2 = 61.8 percent to 100 - 20.4 = 79.6 percent for earlier systems, so "60 to 80 percent"; vLLM 100 - 96.3 = 3.7 percent, so "under 4 percent". Exact wording of the announcement: existing systems "waste 60% - 80% of memory due to fragmentation and over-reservation", and with PagedAttention "memory waste only happens in the last block of a sequence ... a mere waste of under 4%" [SV2]. The paper's own sentence is the 20.4 to 38.2 one above, plus "near-zero waste in KV cache memory" in the abstract and "limits all the memory wastes for a request within one block" in Section 4.3 [SV1].

**The mechanism.** KV cache is divided into fixed-size blocks that need not be contiguous; a block table maps logical to physical blocks; blocks are allocated on demand as tokens arrive, so all waste lies in the last block of a request; sharing works at block granularity [SV1, Sections 1 and 4]. Block size: default 16 tokens in the paper; blocks of 16 to 128 did best on one trace, and larger blocks hurt on short Alpaca sequences [SV1, Section 7.2]. The engine config still has `DEFAULT_BLOCK_SIZE = 16` [SV25]. SGLang documents `--page-size` default 1 [SV35], so "block size" is an engine choice.
- Block size in bytes for the Llama 3.1 8B example: 16 tokens x 131,072 B = 2,097,152 B = 2 MiB per block across all layers (ours).

**Copy-on-write.** Each physical block has a reference count. In parallel sampling the prompt blocks are shared; "with the exception of the final logical block, which is managed by a copy-on-write mechanism" [SV1, Section 4.4]. For beam search the copy-on-write is applied only when new tokens fall within an old shared block, so only one block is copied, versus copying large parts of the cache in earlier systems [SV1, Section 4.4]. Measured sharing savings: 6.1 to 9.8 percent for parallel sampling and 37.6 to 55.2 percent for beam search on Alpaca; 16.2 to 30.5 and 44.3 to 66.3 on ShareGPT [SV1, Section 6.3]. The headline "up to 55% memory saving" is the Alpaca beam-search upper end.

**Throughput claims.** Abstract: improves throughput of popular LLMs by 2 to 4 times at the same latency compared with the then state-of-the-art, FasterTransformer and Orca, with the gain larger for longer sequences, bigger models and more complex decoding [SV1]. Section 6.2: on ShareGPT, sustains 1.7 to 2.7 times higher request rates than Orca (Oracle) and 2.7 to 8 times than Orca (Max); for OPT-13B it batches 2.2 times more requests than Orca (Oracle) and 4.3 times more than Orca (Max); up to 22 times higher request rates than FasterTransformer [SV1]. The announcement blog adds "up to 24x higher throughput than HuggingFace Transformers" (blog, June 2023) [SV2]. These are 2023 comparisons on specific traces; do not present them as current.

**Preemption in the paper.** First come first served; when blocks run out the scheduler evicts all blocks of a sequence group together; recovery is either swapping to CPU memory or recomputation (recompute latency never above 20 percent of swapping's, and recompute is better with small blocks) [SV1, Sections 4.5 and 7.3]. Current engine default is recompute [SV23].

### 4. Continuous batching, chunked prefill, prefix caching, disaggregation

**Continuous (iteration-level) batching, Orca (OSDI 2022).**
- Problem: with request-level scheduling, requests that finish early cannot return to the client and new requests wait for the whole batch to finish [SV3, abstract].
- Fix: iteration-level scheduling, where the scheduler invokes the engine for one iteration at a time, so finished requests leave and new ones join at every iteration [SV3, Section 3]. To batch requests that are at different positions, Orca uses selective batching: attention is computed per request while other operations are batched [SV3, Section 3].
- Result: 36.9 times throughput improvement at the same latency against FasterTransformer on a GPT-3 175B configuration [SV3, abstract].
- The term "continuous batching" is the common name for iteration-level scheduling; vLLM's feature list says "Continuous batching of incoming requests, chunked prefill, prefix caching" [SV34]. Whether the two names are exactly synonymous is a naming point, not checked in a primary source (unverified claim 14).

**Chunked prefill, Sarathi and Sarathi-Serve.**
- Sarathi (arXiv 2023): chunked-prefills split a prefill into equal-size chunks, and decode-maximal batching builds a batch from one prefill chunk plus decodes that "piggyback"; decodes cost up to an order of magnitude less when piggybacked; results LLaMA-13B on A6000: decode throughput up to 10 times, end-to-end up to 1.33 times [SV4, abstract].
- Sarathi-Serve (arXiv 2024): chunked-prefills plus stall-free scheduling add new requests to a batch without pausing ongoing decodes. Results vs vLLM: 2.6 times higher serving capacity for Mistral-7B on one A100, up to 3.7 times for Yi-34B on two A100 GPUs, up to 5.6 times end-to-end with pipeline parallelism on Falcon-180B [SV5, abstract]. These are "capacity under tail latency constraints", not raw throughput.
- Observed failure being fixed: generation stalls lasting several seconds in an iteration-level, prefill-prioritizing system (Figure 1) [SV5].
- Engine status: chunked prefill is enabled by default in vLLM V1 whenever possible; the scheduler batches all pending decodes first, then fills the remaining `max_num_batched_tokens` with prefill, chunking a prefill that does not fit [SV23, SV24].

**Prefix caching and RadixAttention (SGLang paper).**
- Idea: keep the KV cache of finished requests in a radix tree keyed by token sequences so a new request that shares a prefix (system prompt, few-shot examples, chat history) reuses it. LRU eviction of leaves; reference counters protect nodes used by running requests; pages hold one token; cache-aware scheduling orders requests by matched prefix length [SV6, Section 3].
- Results: up to 6.4 times higher throughput and up to 3.7 times lower latency across the tested workloads (not RadixAttention alone) [SV6, Section 6.2]. Production observation in a public chat service: 52.4 percent cache hit rate for one multimodal model and 74.1 percent for another after one month [SV6, Section 6.2].
- Engine docs: vLLM's automatic prefix caching reuses KV cache of existing queries that share a prefix, "allowing the new query to skip the computation of the shared part" [SV33]. It hashes each block by its tokens plus its prefix; extra hash inputs include LoRA IDs, multimodal hashes and "cache salts to isolate caches in multi-tenant environments"; default hash is `sha256` since v0.11 because the earlier hash was not guaranteed collision-free [SV33]. Config default `enable_prefix_caching = True` [SV25]. SGLang: RadixAttention on by default, `--disable-radix-cache` turns it off; `--schedule-policy lpm` (longest prefix match) can raise hits at the cost of scheduling overhead [SV35].

**Disaggregated prefill and decode.**
- DistServe: colocating the two phases causes strong prefill-decode interference and couples their resource and parallelism plans. Assigning them to different GPUs removes interference; the system serves 7.4 times more requests or meets 12.6 times tighter SLOs than state-of-the-art, while staying within latency constraints for more than 90 percent of requests (goodput framing) [SV7, abstract].
- Splitwise: splits the compute-intensive prompt phase and the memory-intensive token phase onto separate machines and transfers request state over fast interconnects; clusters achieve up to 1.4 times higher throughput at 20 percent lower cost, or 2.35 times more throughput at the same power and cost [SV8, abstract]. Authors argue token generation does not need the latest GPU and can run on lower power and cost hardware.
- Caution from the engine docs: vLLM's disaggregated prefill is marked experimental and states "Disaggregated prefill DOES NOT improve throughput"; its stated benefits are separate tuning of TTFT and ITL and control of tail ITL [SV32]. SGLang documents PD disaggregation with Mooncake and NIXL transfer engines [SV37]. The papers' gains are in goodput under an SLO, which is a different metric from raw throughput.

### 5. Quantization

**What it is.** Storing numbers with fewer bits. vLLM: "Quantization trades off model precision for smaller memory footprint" [SV28]. Three things can be quantized: weights, activations and the KV cache. They have different effects (weights shrink the fixed 16 GB; KV cache shrinks the per-token cost).

**Weight-only INT8, LLM.int8() (NeurIPS 2022).** Inference with 8-bit weights halves memory versus 16-bit; vector-wise quantization plus mixed-precision decomposition keeps emergent outlier feature dimensions in 16 bits while more than 99.9 percent of values are multiplied in 8-bit; no degradation reported up to 175B parameters [SV13, abstract]. The paper targets memory, not speed.

**GPTQ (ICLR 2023).** One-shot weight quantization using approximate second-order information; quantizes a 175B model in about four GPU hours to 3 or 4 bits per weight with "negligible accuracy degradation relative to the uncompressed baseline"; allows a 175B model to run in one GPU; end-to-end speedups about 3.25 times on A100 and 4.5 times on A6000 against FP16 [SV11, abstract]. Reasonable accuracy at 2-bit and ternary is claimed only for "extreme" settings.

**AWQ (arXiv, v6 dated 2026-04-25).** Weight-only low-bit quantization; observes that not all weights are equally important and protecting about 1 percent salient weights greatly reduces quantization error; the salient channels are identified from the activation distribution, not the weights, and protected by scaling (no backpropagation or reconstruction); a 4-bit on-device inference framework gives more than 3 times speedup over the FP16 Hugging Face implementation on desktop and mobile GPUs [SV12, abstract].

**FP8 weights and activations (engine docs).** vLLM's FP8 page: FP8 "allows for a 2x reduction in model memory requirements and up to a 1.6x improvement in throughput with minimal impact on accuracy" [SV28]. FP8 computation needs compute capability 8.9 or higher (Ada Lovelace, Hopper, Blackwell); older GPUs run it as weight-only W8A16 [SV28]. The page recommends evaluating accuracy yourself (for example `lm_eval` on gsm8k) [SV28]. INT4 W4A16 "is particularly useful for reducing model size and maintaining low latency in workloads with low queries per second" and needs calibration data (512 samples suggested, more if accuracy drops) [SV28]. INT8 W8A8 is not supported on compute capability 10.0 or higher [SV28]. No benchmark configuration is given for the "1.6x", so treat it as an upper claim (unverified claim 9).

**FP8 KV cache.** vLLM: quantizing the KV cache to FP8 "can significantly reduce its memory footprint", letting you store more tokens, improving throughput and context length [SV27]. Options: `kv_cache_dtype="fp8"` with default scales of 1.0 (no calibration); recommended: calibrate with a dataset via llm-compressor; per-tensor or per-attention-head scales (per-head only with the Flash Attention backend and calibration); `fp8_e4m3` and `fp8_e5m2` variants; `--kv-cache-dtype-skip-layers` keeps sliding-window or chosen layers unquantized because some layer types are "more sensitive" [SV27]. The page does not publish an accuracy number and does not say "halves". Halving is our arithmetic (16 bits to 8 bits, so 128 KiB to 64 KiB per token for Llama 3.1 8B, before scale overhead) (unverified claim 3). SGLang's FP8 and FP4 KV page says it may introduce "minimal accuracy degradation depending on the format" and warns performance "can be extremely slow if dequantization is not fused with the attention kernel" [SV36].

**Quality trade-offs as sources state them.**
- Benchmarks can hide damage. The Llama 3 paper reports that without an upper bound on dynamic scaling factors the FP8 model "occasionally produces corrupted responses even though the benchmark performance is strong", and recommends comparing reward-model score distributions over 100,000 responses [SV19, Section 6.2]. The same section: FP8 gives up to 50 percent higher prefill throughput and a better throughput-latency trade-off in decode [SV19]. They also left self-attention parameters unquantized.
- Weight-only methods (GPTQ, AWQ, INT4) mostly cut weight memory and weight reads; they help most when decode is memory-bound (small batch, low QPS) [SV11, SV12, SV28].

### 6. Speculative decoding

**Leviathan, Kalman, Matias, ICML 2023 (PMLR 202).** A small approximation model M_q proposes gamma tokens; the large target model M_p scores all gamma plus 1 positions in one parallel run; an acceptance rule keeps the longest valid prefix and resamples one token; the output distribution is identical to the target alone [SV14, Section 2.3 and Appendix A.1].
- Acceptance rate alpha = E(beta), where beta is the probability of accepting a drafted token (Definition 3.1). Under an i.i.d. assumption the number of tokens per target run is a capped geometric variable with cap gamma plus 1 [SV14, Section 3.1].
- Equation (1), verified on the rendered page: E(number of generated tokens) = (1 - alpha^(gamma+1)) / (1 - alpha).
- Cost coefficient c = (time of one run of M_q) / (time of one run of M_p); it depends on hardware and software, unlike alpha (Definition 3.7). In their experiments c was always below 0.05 and often close to 0 [SV14, Section 3.3].
- Theorem 3.8, verified on the rendered page: the expected walltime improvement factor is (1 - alpha^(gamma+1)) / ((1 - alpha)(gamma c + 1)). It assumes enough compute to run gamma plus 1 evaluations of the target in parallel without extra walltime, and long generations [SV14, Section 3.3].
- Corollary 3.9: if alpha is greater than c there exists a gamma that gives an improvement; at gamma = 1 the factor is (1 + alpha) / (1 + c) [SV14, Section 3.3].
- Cost: more arithmetic operations (for example alpha 0.8, gamma 5: 3.69 times speed for 1.63 times operations at c = 0) but fewer memory reads of the target weights [SV14, Section 3.4 and Table 1].
- Experiments: 2 to 3 times acceleration on T5-XXL with identical outputs [SV14, abstract]; observed 2.6 times (temperature 1) and 3.4 times (temperature 0) on translation [SV14, Section 4.1].
- Our checks reproduce Table 1: (alpha, gamma) = (0.6, 2) gives 1.96 times; (0.8, 5) gives 3.69; (0.9, 2) gives 2.71. Illustrative example with a nonzero cost (invented c): alpha = 0.8, gamma = 4, c = 0.05 gives (1 - 0.8^5) / (0.2 x (4 x 0.05 + 1)) = 0.67232 / 0.24 = 2.80 times, and 3.36 tokens per target step.

**Chen et al. 2023 (DeepMind), "speculative sampling" (arXiv 2302.01318).** Independent and concurrent. Generates multiple tokens per transformer call from a faster draft model; uses a modified rejection sampling scheme that preserves the target model distribution "within hardware numerics"; reports 2 to 2.5 times decoding speedup on a 70B model in a distributed setup without changing the model or sample quality [SV15, abstract]. Leviathan's paper itself notes the independent implementation showed similar 2 to 2.5 times on Chinchilla 70B [SV14, Section 6]. Use "speculative decoding" for Leviathan and "speculative sampling" for Chen to keep the citations separate.

**Engine docs.** vLLM: speculative decoding is aimed at reducing inter-token latency "under medium-to-low QPS, memory-bound workloads"; model-based methods (EAGLE, MTP, draft model) give the best latency reduction while n-gram and suffix methods give modest speedups without extra load at peak traffic; its table rates a draft model as high gain at low QPS and medium gain at high QPS [SV29]. SGLang lists EAGLE-2 and EAGLE-3, MTP, draft model and n-gram variants [SV37]. This matches the theory: gains need spare compute.

### 7. FlashAttention (Dao et al., NeurIPS 2022)

**What it changes.** An IO-aware exact attention algorithm: tiling splits Q, K and V into blocks loaded from GPU high-bandwidth memory (HBM) to on-chip SRAM, with the softmax computed incrementally, so the large N by N attention matrix is never written to or read from HBM [SV16, abstract and Section 3.1]. HBM accesses are Theta(N^2 d^2 / M) versus Theta(N d + N^2) for standard attention, where d is head dimension and M is SRAM size; up to 9 times fewer in their Figure 2 [SV16, Section 1]. The backward pass recomputes attention from stored output and softmax statistics instead of storing the N^2 matrices [SV16, Section 3.1]. Memory footprint scales linearly with sequence length [SV16, Section 4]. The paper also shows it is exact, not an approximation, and gives a lower bound that no exact algorithm can asymptotically beat across all SRAM sizes [SV16, Section 1].

**What it does not change.** The paper's subject is the N by N intermediate matrix and training speed (for example 3 times faster on GPT-2 at sequence length 1K). It does not alter how many keys and values a model must keep per token. The KV cache size formula in section 2 has no term it affects; only paging, fewer KV heads (GQA and MQA), shorter context or fewer bytes per value (quantization) change the cache size. This second statement is our inference from the paper's scope plus the formula, not a sentence in the paper (unverified claim 12). The vLLM README lists FlashAttention among its attention kernels alongside paged KV management, which are separate features [SV34].

### 8. Tensor parallelism and pipeline parallelism

**Tensor parallelism (Megatron-LM).** Intra-layer model parallelism: the first MLP matrix multiply is split by columns and the second by rows so a single all-reduce is needed in the forward pass; for self-attention the Q, K and V matrices are split by column so each head's work happens on one GPU, and the output projection is split by rows [SV17, Section 3]. Requires fast links between GPUs; scaling efficiency 76 percent on 512 GPUs for an 8.3B model [SV17, abstract]. It is a training paper; the engine docs say vLLM's implementation "includes Megatron-LM's tensor parallel algorithm" [SV31].

**Pipeline parallelism (GPipe).** Splits the network into sequential stages on different accelerators; a mini-batch is split into micro-batches that flow through the stages; the pipeline "bubble" overhead is negligible when the number of micro-batches M is at least 4 times the number of stages K in their setup [SV18, Section 2.3]. Also a training paper.

**When one GPU is not enough.** Weights plus KV pool plus activations exceed GPU memory.
- Engine guidance: if the model fits on one GPU, distributed inference is probably unnecessary; if it fits on one node, use tensor parallelism; if not, combine tensor parallelism within a node with pipeline parallelism across nodes; for GPUs without fast interconnect prefer pipeline parallelism [SV31].
- Sourced example: Llama 3 405B in BF16 "does not fit in the GPU memory of a single machine with 8" H100 GPUs, so they ran it across 16 GPUs on two machines with pipeline parallelism, and added FP8 as a second route [SV19, Section 6]. Our arithmetic with 80 GB parts: 405B x 2 bytes = 810 GB versus 640 GB in eight GPUs. The same parameter count method gives 70.55B x 2 = 141 GB for a 70B model, which does not fit in one 80 GB GPU [SV22 for the count].
- Tensor parallelism also frees KV space: weights are sharded, so each GPU has more memory left for KV cache; the vLLM docs list increasing `tensor_parallel_size` as a remedy for frequent preemption, with synchronization overhead as the cost [SV23].

### 9. Serving engines and who makes them

**What the two open-source engines list in their own docs (vLLM v0.32.0 README; SGLang v0.5.22 docs).**

| Feature | vLLM | SGLang |
|---|---|---|
| Continuous batching | Listed: "Continuous batching of incoming requests" [SV34] | Continuous batching and a radix-tree scheduler described in the paper [SV6]; docs refer to a running-request log line and `--max-running-requests` [SV35] |
| Paged KV cache | PagedAttention, listed [SV34] | KV pool with page size configurable (`--page-size`, default 1) [SV35] |
| Prefix caching | Automatic prefix caching, default on in config [SV25, SV33] | RadixAttention, default on; `--disable-radix-cache` [SV35] |
| Chunked prefill | Listed; default on in V1 [SV23, SV34] | `--chunked-prefill-size` [SV35] |
| Quantization | FP8, INT8, INT4, GPTQ and AWQ and others listed [SV34, SV28] | `--quantization fp8` and others; FP8 and FP4 KV cache [SV35, SV36] |
| Speculative decoding | n-gram, suffix, EAGLE and others [SV29, SV34] | EAGLE-2 and EAGLE-3, MTP, draft model, n-gram [SV37] |
| Parallelism | Tensor, pipeline, data, expert, context [SV34] | Tensor and data parallel guidance [SV35] |
| Disaggregated prefill and decode | Experimental [SV32] | PD disaggregation page [SV37] |
| OpenAI-compatible server | Completions, Chat Completions, Responses, Embeddings and audio endpoints under `/v1`; also an Anthropic-style Messages API [SV34] | OpenAI-compatible APIs and an Anthropic-compatible endpoint [SV35] |
| Licence | Apache-2.0 [SV40] | Apache-2.0 [SV40] |

**Engines and who makes them (so writers know what to call them without naming a company).**

| Name | What it is | Company product? | Learner-facing description |
|---|---|---|---|
| vLLM | Open-source serving engine; README says it was developed at a university lab and is maintained by a community of many institutions and companies [SV34] | No (open-source project; many company contributors) | "an open-source serving engine from a university research lab" |
| SGLang | Open-source serving framework; paper authors at universities [SV6]; project owner organisation not checked | Not established; treat as open-source project | "an open-source serving engine and programming framework from academic researchers" |
| Orca | Research system in a paper; authors list a company and a university [SV3] | Research prototype, not a current product | "a research serving system that introduced iteration-level scheduling" |
| FasterTransformer, TensorRT-LLM | Engines referenced in the papers as built by a GPU vendor [SV1, SV6] | Yes (vendor products) | "a GPU vendor's serving library" |
| Text Generation Inference | Engine referenced in the SGLang paper as built by a model-hub company [SV6] | Yes | "a model-hub company's serving server" |
| Sarathi, Sarathi-Serve | Research systems; authors at an industry research lab and a university [SV4, SV5] | Research code | "research schedulers for chunked prefill" |
| Splitwise | Research design; authors at a university and an industry lab [SV8] | Research | "a research design that splits phases across machines" |
| DistServe | Research system from two universities and a startup [SV7] | Research | "a research system that separates prefill and decode GPUs" |
| Megatron-LM, GPipe | Training systems from a GPU vendor and a search company [SV17, SV18] | Yes (vendor research code) | "a tensor-parallel scheme" and "a pipeline-parallel scheme" |
| Llama, Qwen, Mistral models | Open-weight model families | Yes (company models) | "an open 8B model" |

Writers should keep engine names out of learner text unless the brief changes; use the descriptions above. If the course decides to name open-source engines, vLLM and SGLang are the only two with Apache-2.0 licences verified here.

### 10. Admission control, token budgets, queueing, backpressure (vLLM v0.32.0, SGLang v0.5.22)

All vLLM facts are from the repository at tag v0.32.0 (released 2026-10-18), read on 2026-10-24: `vllm/config/scheduler.py`, `vllm/config/cache.py`, `vllm/engine/arg_utils.py` and `docs/configuration/optimization.md`. The rendered website was not read; the docs in the tag are the same files (confidence High for names, Medium for "current" because the site tracks the main branch).

| Parameter (flag) | Meaning | Default as read | Source |
|---|---|---|---|
| `max_num_batched_tokens` (`--max-num-batched-tokens`) | Maximum tokens processed in a single iteration (the token budget); also the chunk size cap for chunked prefill | Class default 2048 for tests; real default set in `EngineArgs` by GPU memory and usage context: 16384 for a 160 GiB or larger GPU; for a 70 GiB or larger GPU that is not an A100, 16384 (offline) or 8192 (API server); otherwise 8192 (offline) or 2048 (API server) | [SV24, SV26] |
| `max_num_seqs` (`--max-num-seqs`) | Maximum sequences processed in one iteration (batch size cap) | Class default 128 for tests; real defaults: 1024 on the larger GPUs above, 256 otherwise | [SV24, SV26] |
| `max_num_active_seqs` | Optional lower cap on requests admitted to RUNNING without shrinking runner or graph capacity | `None` (keeps current behaviour) | [SV24] |
| `enable_chunked_prefill` | Split long prefills across iterations | `True` | [SV24] |
| `long_prefill_token_threshold` | Prompts longer than this are treated as long under chunked prefill; 0 disables the cap | 0 | [SV24] |
| `policy` (`--scheduling-policy`) | `fcfs` or `priority` | `fcfs` | [SV24] |
| `max_num_queued_reqs` (`--max-num-queued-reqs`) | Cap on in-flight (waiting plus running) requests; at the cap new requests are rejected with HTTP 503 so a client can retry elsewhere; bounds an "otherwise unbounded" queue | `None` (no limit) | [SV24, SV26] |
| `max_num_queued_tokens` (`--max-num-queued-tokens`) | Cap on prompt tokens of requests in prefill; reject with HTTP 503 beyond it; doc formula: target TTFT times prefill throughput | `None` | [SV24, SV26] |
| `gpu_memory_utilization` | Fraction of GPU memory the instance may use (per instance, so two instances on one GPU can each use 0.5) | 0.92 | [SV25] |
| `kv_cache_memory_bytes` | Explicit KV pool size; ignores `gpu_memory_utilization` | `None` | [SV25] |
| `block_size` | KV cache block size in tokens | default 16 | [SV25] |
| `enable_prefix_caching` | Automatic prefix caching | `True` in config | [SV25] |
| `kv_cache_dtype` | KV storage type | `auto` | [SV25, SV27] |

Preemption and recovery as the docs state them [SV23]:
- When KV space is insufficient, vLLM preempts requests and recomputes them when space returns; a warning names `PreemptionMode.RECOMPUTE` and advises raising `gpu_memory_utilization` or `tensor_parallel_size`.
- Remedies listed: increase `gpu_memory_utilization`; decrease `max_num_seqs` or `max_num_batched_tokens`; increase tensor-parallel size; increase pipeline-parallel size.
- In V1 the default preemption mode is recompute rather than swap, because recompute is cheaper in the V1 architecture.
- Monitor preemptions with Prometheus metrics or by setting `disable_log_stats=False`.
- Metrics for queue depth and cache pressure: `vllm:num_requests_running`, `vllm:kv_cache_usage_perc` [SV30].

SGLang v0.5.22 [SV35]:
- `--max-running-requests` (default None, computed), `--max-queued-requests` (default None; ignored in disaggregation mode), `--chunked-prefill-size` (default None; -1 disables), `--max-prefill-tokens` (default 16384), `--mem-fraction-static` (computed as (GPU memory minus reserved) over GPU memory, 0.88 if memory cannot be detected), `--schedule-policy` (default `fcfs`; others include `lpm`, `priority`), `--schedule-conservativeness` (default 1.0; larger means more conservative).
- Tuning guidance in the hyperparameter page: `#queue-req` between 100 and 2000 is healthy for offline batch; `token usage` above 0.9 is good; if token usage is low while the queue is long, lower `--schedule-conservativeness` toward 0.3; if the log often says "KV cache pool is full. Retract requests", raise it toward 1.3; roughly one retraction a minute is acceptable; reserve 5 to 8 GB for activations [SV35].

Teaching decision aid: both engines have the same three knobs under different names: how many requests (running cap), how many tokens per step (budget), and how much memory for cache (utilization fraction). Backpressure exists only if you set the queue cap; the default queue in vLLM is unbounded [SV24]. The vLLM docs also state that the `--api-key` option does not authenticate every endpoint (for example `/invocations`) [SV34]; this belongs in a safety aside, not the capacity discussion.

### 11. GPU memory figures and cost per million tokens

**Generic figures for the 80 GB class (datasheets, 2026-10-24).**
- A100 80 GB: 80 GB of HBM2e; memory bandwidth 1,935 GB/s (PCIe) and 2,039 GB/s (SXM). A100 40 GB: 1,555 GB/s. BF16 tensor performance 312 TFLOPS dense (624 with sparsity) [SV38].
- H100 SXM: 80 GB; 3.35 TB/s. Other variant in the same table: 94 GB and 3.9 TB/s [SV39].
- Generic statement writers can use: "an 80 GB-class data-centre GPU has about 2 to 3.4 TB/s of memory bandwidth". Do not pair a dollar figure with any model name.
- Whether "80 GB" means 80 GiB, and what the driver reports as usable, was not checked (unverified claim 2).

**Capacity example (ours, upper bound; shows the method, not a benchmark).** One 80 GB GPU, Llama 3.1 8B at 16-bit, `gpu_memory_utilization` 0.92:
- Usable: 0.92 x 80 GB = 73.6 GB. Minus weights 16.06 GB = 57.5 GB for KV pool plus activations and graph buffers.
- If activations and graphs took, say, 5 GB (invented; SGLang advises 5 to 8 GB of headroom [SV35]) the KV pool is about 52 GB.
- Upper bound without that deduction: 57.5 GB / 131,072 B = about 439,000 tokens, which is 13 concurrent requests of 32,768 tokens or about 427 requests of 1,024 tokens. Real engines report their own numbers at startup [SV31].
- With the GQA-less layout (512 KiB per token) the same pool holds one quarter as many tokens; with 8-bit KV (64 KiB) twice as many. This is why layout, precision and paging matter.

**Method for cost per million tokens.**
1. Cost per hour of the GPU (or GPUs of one replica): R in your currency.
2. Measured throughput of the whole replica under realistic load: T generated tokens per second. Prefer goodput-compatible measurements (throughput at the SLO), since DistServe notes per-GPU goodput under the SLO translates directly into lower cost per query [SV7].
3. Tokens per hour = T x 3,600.
4. Cost per million output tokens = R / (T x 3,600) x 1,000,000.
5. Adjust for utilization (fraction of the hour the GPU is busy at that T) by dividing by it.
6. Input (prefill) tokens and output (decode) tokens plausibly have different costs per token, since prefill is compute-bound and decode is memory-bound [SV5, SV8] (our inference; no source prices them separately); compute them separately or state the assumed mix.
- Invented example, not a price: R = 2.00 units per hour and T = 2,000 tokens per second gives 2.00 / 7,200,000 x 1,000,000 = 0.278 units per million tokens. At 50 percent utilization the figure doubles to 0.556.
- No real vendor price was recorded or should appear.

### Interview craft (answer anchors; each maps to a sourced fact above)

1. First token slow, later tokens fast: prefill is compute-bound over many tokens; decode is memory-bound, one token per step [SV5].
2. KV memory for N tokens: 2 x layers x KV heads x head dim x bytes x N; show 128 KiB per token for an 8B GQA model [SV1, SV19, SV22].
3. Why batching helps decode: weights are read once per step regardless of batch; intensity grows with batch until the crossover near 150 to 200 sequences (ours) [SV5, SV9].
4. Why batching can hurt latency: a large prefill in the batch stalls decodes; fix with chunked prefill and a token budget [SV5, SV23].
5. What paging buys: from 20 to 38 percent useful memory to about 96 percent in one experiment, so bigger batches [SV1].
6. Continuous versus static batching: iteration-level scheduling lets finished requests leave and new ones join [SV3].
7. When prefix caching pays: shared system prompts, few-shot, multi-turn chat; hit rates of 52 to 74 percent in one public service [SV6].
8. GQA versus MQA versus MHA: KV cache reduced by the head ratio; MQA is more aggressive and can lose quality [SV9, SV10].
9. Quantization: say which of weights, activations, KV; weights shrink the fixed 16 GB, KV shrinks per-token; verify quality beyond benchmarks [SV19, SV27].
10. Speculative decoding: expected tokens (1 - a^(g+1)) / (1 - a); speedup divides by (g c + 1); works when compute is spare [SV14, SV29].
11. FlashAttention versus paging: faster exact attention versus smaller or denser KV memory; different problems [SV16, SV1].
12. Tensor versus pipeline parallelism: split within layers (fast links, all-reduce) versus split by layers (micro-batches, bubbles) [SV17, SV18, SV31].
13. Capacity planning: tokens needed = concurrency x (prompt plus output); compare with pool size; then cost per million tokens method above.
14. Disaggregation: removes interference, adds KV transfer; helps SLO goodput; engine docs say it does not raise throughput [SV7, SV32].

## Production failure modes

Public incidents with company names are not used. All items below come from papers or engine docs; none is a composite.

### Failure modes for memory and scheduling

1. **Over-reserved KV memory.** Contiguous pre-allocation for the maximum length leaves only 20.4 to 38.2 percent of KV memory holding token states, so the batch is small and throughput low [SV1].
2. **Generation stalls.** Prefill-prioritizing iteration-level scheduling pauses ongoing decodes for several seconds when a long prompt arrives (Yi-34B on two A100 GPUs, Figure 1) [SV5].
3. **Preemption churn.** KV pool too small for the admitted load; requests are preempted and recomputed; end-to-end latency suffers; vLLM warns and suggests more memory fraction, smaller `max_num_seqs` or `max_num_batched_tokens`, or more parallelism [SV23]. SGLang logs "KV cache pool is full. Retract requests" and advises about one retraction a minute at most [SV35].
4. **Overly conservative scheduling.** Token usage below 0.9 with a long queue means the server admits too little [SV35].
5. **Unbounded queue.** Default vLLM queue is unbounded; a spike raises TTFT for everyone until `max_num_queued_reqs` or `max_num_queued_tokens` returns 503 [SV24]. Learners should state what the client does on a 503.
6. **Startup misconfiguration.** With chunked prefill disabled, `max_num_batched_tokens` below `max_model_len` can crash startup [SV23].
7. **Long context eats concurrency.** The doc example shows a pool of 643,232 tokens giving 15.70 times concurrency at a 40,960-token request limit [SV31]. Check: 643,232 / 40,960 = 15.70.

### Failure modes for quantization and attention variants

8. **Benchmarks pass, answers are corrupted.** FP8 without bounded scale factors produced occasional corrupted responses while benchmark scores stayed strong [SV19].
9. **Uncalibrated FP8 KV cache.** The no-calibration path uses scales of 1.0; docs recommend dataset calibration [SV27]. The docs give no accuracy figure, so the size of the risk is unverified.
10. **Slow dequantization.** A quantized KV cache that must be dequantized outside the attention kernel can be extremely slow, cancelling the memory gain [SV36].
11. **Hardware support gaps.** FP8 compute needs compute capability 8.9 or higher; INT8 W8A8 not supported on 10.0 or higher [SV28].
12. **Speculation at high load.** Speculative decoding increases arithmetic operations (1.5 to 1.6 times in the paper's examples) [SV14]; vendor docs target medium-to-low QPS memory-bound workloads [SV29]. A fleet running near compute saturation may not benefit; no measured counterexample was fetched (unverified claim 13).
13. **Draft model mismatch.** Low acceptance rate makes the factor fall toward 1 (it needs alpha above c) [SV14].

### Failure modes for sharing and safety

14. **Cross-tenant prefix reuse.** vLLM adds cache salts "to isolate caches in multi-tenant environments" [SV33]. A timing side channel is the obvious concern but no source was read that demonstrates it (unverified claim 15).
15. **Authentication scope.** In vLLM, `--api-key` protects only `/v1`, `/v2` and `/inference` prefixes; other endpoints such as `/invocations` are not authenticated, and the docs say not to rely on `--api-key` alone [SV34].
16. **Disaggregation assumed to be a free win.** Docs: it does not improve throughput; the KV cache must be transferred between instances [SV32, SV8].

## What not to teach

| Topic | Why not |
|---|---|
| CUDA, Triton or kernel writing | No learner GPU; out of the interview scope for an AI engineer track. Mention only that fused kernels exist [SV16, SV36] |
| FlashAttention backward pass, IO-complexity proof | Interview depth is "fewer HBM reads and writes, exact, does not shrink the KV cache" [SV16] |
| GPTQ Hessian updates, AWQ derivations | One sentence each; teach the choice (weight-only versus KV versus FP8) and the validation habit [SV11, SV12, SV19] |
| Benchmark numbers as current facts | The 2 to 4 times, 24 times, 36.9 times figures are 2022 and 2023 comparisons on specific traces; teach them as history with the metric, not as present speed [SV1, SV2, SV3] |
| Engine tours and flag memorisation | Defaults changed with version and GPU [SV26]; teach the three knobs and where to read the log |
| Real prices, vendor price tables | Volatile; teach the formula only |
| Mixture-of-experts, expert and context parallelism | Large separate topic; one line that the engines support them [SV34] |
| Training-time parallelism details (ZeRO, 3D, activation checkpointing) | The two papers used are training papers; only the split idea is needed [SV17, SV18] |
| Writing a scheduler from scratch in an engine | Teach a small simulator of waiting, running, preempted queues instead |
| Disaggregation internals (transfer connectors) | Docs list many connectors and mark the feature experimental [SV32] |
| Naming companies in learner text | Brief constraint; use the descriptions in the engine table |

## Source table

All rows checked 2026-10-24. Type key: P = paper; D = official documentation or specification; R = registry, hub or package metadata; V = local verification (arithmetic or rendered-page check); F = first-party engineering write-up; S = reputable secondary. Confidence: High, Medium, Low. Confidence refers to the claims the dossier takes from that source.

| ID | Claim | Source | Type | Date checked | Confidence |
|---|---|---|---|---|---|
| SV1 | PagedAttention and vLLM: 20.4 to 38.2 percent useful KV memory in earlier systems; Figure 2 values (96.3 for vLLM); block size 16; copy-on-write; 800 KB per token for a 13B model; 2 to 4 times throughput; preemption by swap or recompute; weights 65 percent and KV over 30 percent on a 40 GB GPU | https://arxiv.org/abs/2309.06180 (Kwon et al., SOSP 2023; PDF read, Figure 2 checked on the rendered page; the PDF is the only version, v1) | P | 2026-10-24 | High |
| SV2 | "60% - 80%" waste claim; "under 4%" waste with PagedAttention; "up to 24x" over a baseline library | https://blog.vllm.ai/2023/06/20/vllm.html (announcement, 2023-06-20) | F | 2026-10-24 | High (wording), Medium (as a measure, since the paper gives bars not these sentences) |
| SV3 | Iteration-level scheduling, selective batching, 36.9 times throughput at same latency vs the vendor baseline on a GPT-3 175B configuration | https://www.usenix.org/system/files/osdi22-yu.pdf (Yu et al., OSDI 2022) | P | 2026-10-24 | High |
| SV4 | Chunked-prefills, decode-maximal batching, piggybacked decodes; up to 10 times decode throughput and 1.33 times end-to-end | https://arxiv.org/abs/2308.16369 (Agrawal et al. 2023) | P | 2026-10-24 | High |
| SV5 | Prefill and decode definitions; TTFT and TBT definitions; decode memory-bound; arithmetic intensity analysis; stall-free scheduling; 2.6, 3.7 and 5.6 times capacity gains | https://arxiv.org/abs/2403.02310 (Agrawal et al., v3, 2024-06-17) | P | 2026-10-24 | High |
| SV6 | RadixAttention (radix tree, LRU, cache-aware scheduling); up to 6.4 times throughput and 3.7 times lower latency; 52.4 and 74.1 percent hit rates in a public deployment; names other engines | https://arxiv.org/abs/2312.07104 (Zheng et al., v2, 2024-06-06) | P | 2026-10-24 | High |
| SV7 | TTFT and TPOT definitions; throughput and goodput definitions; interference; 7.4 times requests or 12.6 times tighter SLO; footnote on end-to-end latency | https://arxiv.org/abs/2401.09670 (Zhong et al., v3, 2024-06-06) | P | 2026-10-24 | High |
| SV8 | Prompt phase compute-intensive, token phase memory-intensive; 1.4 times throughput at 20 percent lower cost or 2.35 times at same power and cost | https://arxiv.org/abs/2311.18677 (Patel et al., v2, 2024-05-20) | P | 2026-10-24 | High |
| SV9 | Multi-query attention; memory-access to arithmetic ratio analysis (n/d plus 1/b) | https://arxiv.org/abs/1911.02150 (Shazeer 2019, arXiv preprint) | P | 2026-10-24 | High |
| SV10 | GQA definition; KV cache reduction by factor H for MQA; uptraining with 5 percent compute; Table 1 timings and scores | https://arxiv.org/abs/2305.13245 (Ainslie et al., v3, 2023-12-23) | P | 2026-10-24 | High (claims), Low (table time unit) |
| SV11 | GPTQ: one-shot 3 or 4 bit weight quantization, 175B in about four GPU hours, 3.25 and 4.5 times speedups | https://arxiv.org/abs/2210.17323 (Frantar et al., ICLR 2023) | P | 2026-10-24 | High |
| SV12 | AWQ: protecting about 1 percent salient weights found from activations; 3 times speedup claim | https://arxiv.org/abs/2306.00978 (Lin et al., v6, 2026-04-25) | P | 2026-10-24 | High |
| SV13 | LLM.int8(): 8-bit inference halves memory; mixed-precision outlier decomposition; no degradation to 175B | https://arxiv.org/abs/2208.07339 (Dettmers et al., NeurIPS 2022) | P | 2026-10-24 | High |
| SV14 | Speculative decoding: Equation (1), Theorem 3.8, Corollary 3.9, Table 1, c below 0.05, 2 to 3 times on T5-XXL | https://arxiv.org/abs/2211.17192 (Leviathan, Kalman, Matias, ICML 2023, PMLR 202); equation and theorem checked on rendered pages | P, V | 2026-10-24 | High |
| SV15 | Speculative sampling (separate paper): modified rejection sampling; 2 to 2.5 times on a 70B model; sampling is memory-bandwidth bound | https://arxiv.org/abs/2302.01318 (Chen et al. 2023, arXiv preprint) | P | 2026-10-24 | High |
| SV16 | FlashAttention: IO-aware exact attention, tiling, recomputation, HBM access counts, linear extra memory; 3 times on GPT-2 | https://arxiv.org/abs/2205.14135 (Dao et al., v2; venue NeurIPS 2022 per the vLLM paper's reference list) | P | 2026-10-24 | High |
| SV17 | Megatron-LM tensor parallelism: column and row splits, one all-reduce per MLP block, 76 percent efficiency on 512 GPUs | https://arxiv.org/abs/1909.08053 (Shoeybi et al., v4) | P | 2026-10-24 | High |
| SV18 | GPipe micro-batch pipeline parallelism; bubble negligible when M is at least 4 K | https://arxiv.org/abs/1811.06965 (Huang et al., v5) | P | 2026-10-24 | High |
| SV19 | Llama 3 paper: Table 3 hyperparameters (8B: 32 layers, 4,096 model dimension, 14,336 FFN, 32 heads, 8 KV heads); GQA with 8 KV heads reduces KV cache; 405B BF16 needs 16 GPUs; FP8 inference notes and the benchmark warning | https://arxiv.org/abs/2407.21783 (Llama Team, v3, 2024-11-23) | P | 2026-10-24 | High (Table 3 text is garbled in extraction; the order was reconstructed and matches the config) |
| SV20 | Qwen3 8B config.json (36 layers, 32 heads, 8 KV heads, head_dim 128, hidden 4096, max positions 40960, bfloat16) and 8,190,735,360 parameters | https://huggingface.co/Qwen/Qwen3-8B/raw/main/config.json and https://huggingface.co/api/models/Qwen/Qwen3-8B | R | 2026-10-24 | High |
| SV21 | Mistral 7B v0.3 config.json (32 layers, 32 heads, 8 KV heads, hidden 4096, max positions 32768) and 7,248,023,552 parameters | https://huggingface.co/mistralai/Mistral-7B-v0.3/raw/main/config.json and /api/models | R | 2026-10-24 | High |
| SV22 | Llama 3.1 8B: official config gated (HTTP 401); mirror config shows 32 layers, 32 heads, 8 KV heads, hidden 4096, max positions 131072; official API metadata gives 8,030,261,248 BF16 parameters; Llama 3.1 70B 70,553,706,496 | https://huggingface.co/NousResearch/Meta-Llama-3.1-8B/raw/main/config.json (mirror); https://huggingface.co/api/models/meta-llama/Llama-3.1-8B and /Llama-3.1-70B (official metadata) | R | 2026-10-24 | Medium (config via mirror), High (parameter count) |
| SV23 | vLLM v0.32.0 docs: preemption, remedies, recompute default in V1, chunked prefill default and token budget tuning, `max_num_batched_tokens` guidance | https://github.com/vllm-project/vllm/blob/v0.32.0/docs/configuration/optimization.md ; docs/configuration/conserving_memory.md | D | 2026-10-24 | High |
| SV24 | vLLM v0.32.0 scheduler config: `max_num_batched_tokens`, `max_num_seqs`, `max_num_active_seqs`, `enable_chunked_prefill`, `long_prefill_token_threshold`, `policy`, `max_num_queued_reqs`, `max_num_queued_tokens` with doc strings | https://github.com/vllm-project/vllm/blob/v0.32.0/vllm/config/scheduler.py | D | 2026-10-24 | High |
| SV25 | vLLM v0.32.0 cache config: `gpu_memory_utilization` 0.92, `block_size` default 16, `enable_prefix_caching` True, `kv_cache_memory_bytes`, hash algorithm | https://github.com/vllm-project/vllm/blob/v0.32.0/vllm/config/cache.py | D | 2026-10-24 | High |
| SV26 | vLLM v0.32.0 hardware-dependent defaults for token budget and sequence cap; CLI flags for queue limits | https://github.com/vllm-project/vllm/blob/v0.32.0/vllm/engine/arg_utils.py (around lines 1728 and 2896 to 2990) | D | 2026-10-24 | High |
| SV27 | vLLM FP8 KV cache page: reduces memory footprint; per-tensor and per-head schemes; default scales 1.0; calibration recommended; skip-layers flag | https://github.com/vllm-project/vllm/blob/v0.32.0/docs/features/quantization/quantized_kvcache.md | D | 2026-10-24 | High |
| SV28 | vLLM quantization pages: FP8 "2x reduction in model memory and up to 1.6x throughput"; INT4 for low QPS; INT8 W8A8 limits; supported formats | https://github.com/vllm-project/vllm/tree/v0.32.0/docs/features/quantization (README.md, llm_compressor/fp8.md, int4.md, int8_w8a8.md, auto_awq.md) | D | 2026-10-24 | High (text), Low (the 1.6x as a general figure) |
| SV29 | vLLM speculative decoding page: aimed at medium-to-low QPS memory-bound workloads; method table | https://github.com/vllm-project/vllm/blob/v0.32.0/docs/features/speculative_decoding/README.md | D | 2026-10-24 | High |
| SV30 | vLLM metrics: TTFT, ITL, TPOT definitions and formula; request-state gauges; KV usage gauge | https://github.com/vllm-project/vllm/blob/v0.32.0/docs/design/metrics.md | D | 2026-10-24 | High |
| SV31 | vLLM parallelism guidance and startup log lines (KV cache size in tokens; maximum concurrency) | https://github.com/vllm-project/vllm/blob/v0.32.0/docs/serving/parallelism_scaling.md | D | 2026-10-24 | High |
| SV32 | vLLM disaggregated prefill is experimental; does not improve throughput; benefits are separate TTFT and ITL tuning | https://github.com/vllm-project/vllm/blob/v0.32.0/docs/features/disagg_prefill.md | D | 2026-10-24 | High |
| SV33 | vLLM automatic prefix caching and design notes: block hash, cache salts, sha256 default since v0.11 | https://github.com/vllm-project/vllm/blob/v0.32.0/docs/features/automatic_prefix_caching.md ; docs/design/prefix_caching.md | D | 2026-10-24 | High |
| SV34 | vLLM README feature list; OpenAI-compatible server page and its API-key warning; Megatron-LM implementation note | https://github.com/vllm-project/vllm/blob/v0.32.0/README.md ; docs/serving/online_serving/openai_compatible_server.md | D | 2026-10-24 | High |
| SV35 | SGLang v0.5.22: server arguments and defaults; hyperparameter tuning guidance; total memory identity; README | https://github.com/sgl-project/sglang/blob/v0.5.22/docs/docs/advanced_features/server_arguments.mdx ; hyperparameter_tuning.mdx ; README.md ; docs/docs/basic_usage/openai_api.mdx | D | 2026-10-24 | High |
| SV36 | SGLang quantized KV cache page: FP8 and FP4 formats; warning on unfused dequantization | https://github.com/sgl-project/sglang/blob/v0.5.22/docs/docs/advanced_features/quantized_kv_cache.mdx | D | 2026-10-24 | High |
| SV37 | SGLang speculative decoding and PD disaggregation pages | https://github.com/sgl-project/sglang/blob/v0.5.22/docs/docs/advanced_features/speculative_decoding.mdx ; pd_disaggregation.mdx | D | 2026-10-24 | Medium (only headers read) |
| SV38 | A100 datasheet: 80 GB HBM2e; 1,935 and 2,039 GB/s; 1,555 GB/s for 40 GB; BF16 312 TFLOPS | https://www.nvidia.com/content/dam/en-zz/Solutions/Data-Center/a100/pdf/nvidia-a100-datasheet-us-nvidia-1758950-r4-web.pdf | D | 2026-10-24 | High |
| SV39 | H100 product page: SXM 80 GB, 3.35 TB/s; second variant 94 GB, 3.9 TB/s | https://www.nvidia.com/en-us/data-center/h100/ (fetched and parsed) | D | 2026-10-24 | High |
| SV40 | Release and licence metadata: vLLM v0.32.0 (2026-10-18), SGLang v0.5.22 (2026-10-19), both Apache-2.0 | https://api.github.com/repos/vllm-project/vllm/releases/latest ; https://api.github.com/repos/sgl-project/sglang/releases/latest ; https://pypi.org/pypi/vllm/json ; /sglang/json | R | 2026-10-24 | High |
| SV41 | Our arithmetic (KV sizes, weights, ridge point, capacity, speculative examples, cost) | Python checks run 2026-10-24 on the figures in this table | V | 2026-10-24 | High (arithmetic), see the unverified list for assumptions |

## Unverified claims (do not use as fact in learner-facing text)

1. The first-party Llama 3.1 8B `config.json` (gated). Values come from a mirror and match the Llama 3 paper's table and the official parameter count. Hidden size, head dimension (derived) and max positions of 131072 are mirror-sourced.
2. Whether "80 GB" is 80 GiB, and the usable memory a driver reports. Use "80 GB class" only.
3. That an FP8 KV cache "halves" memory in practice. vLLM docs say "significantly reduce"; halving is arithmetic before scale overhead. No accuracy number for FP8 KV was found in the vLLM or SGLang pages read.
4. Any real tokens-per-second for the 8B example. The 127 and 209 tokens per second figures are bandwidth floors from arithmetic, not measurements.
5. The practical batch size at which decode stops being memory-bound on a real engine (our 153 is a ridge-point estimate; the paper observed 500 to 600 tokens in practice for larger tensor-parallel degrees).
6. Whether other engines (outside vLLM and SGLang) use different block sizes or defaults.
7. Venues of Sarathi-Serve, DistServe, Splitwise, SGLang, GQA, AWQ, Megatron and GPipe (arXiv versions cited; publication venues not confirmed from the text). Use arXiv IDs.
8. The time unit in GQA Table 1 (header says seconds, figure axis says milliseconds). Quote only the ratio.
9. The "up to 1.6x" throughput for FP8 in the vLLM docs; no benchmark setup is given.
10. How the Figure 2 bars map to "Orca (Pow2)" versus "(Oracle)" in the arithmetic: read from the rendered image (Pow2 26.8 percent useful, Oracle 38.2), High confidence, but vLLM's remaining 3.7 percent is a subtraction; the paper does not state "3.7".
11. That the 60 to 80 percent waste figure reflects production traffic. It was measured on the paper's 6.2 experiment traces.
12. That FlashAttention does not change KV cache size. This is inferred from the paper's scope and the size formula; the paper does not state it.
13. That speculative decoding hurts throughput at high load in production. Only the arithmetic overhead (Table 1) and the engine's "medium-to-low QPS" positioning were found.
14. That "continuous batching" and "iteration-level scheduling" are exact synonyms; the vLLM README uses the first, Orca the second.
15. A cross-tenant timing attack on shared prefix caches. The salt exists for isolation; no demonstration was read.
16. That vLLM and SGLang defaults on 2026-10-24 match the rendered website; the source was the release-tag files.
17. SGLang's `--max-running-requests`, `--chunked-prefill-size` actual runtime defaults (documented as None with automatic selection).
18. The organisation that owns SGLang (README and licence read; ownership not checked).
19. Any hardware cost figure. None recorded.
20. That employers ask these questions. No hiring source was read for this module.

## Open questions

1. **Running example.** Use Llama 3.1 8B (matches the brief: 128 KiB per token, 4 GiB at 32,768, about 16 GB weights) or an ungated first-party model whose config learners can open themselves (Qwen3 8B: 144 KiB, 4.5 GiB, 16.4 GB; Mistral 7B v0.3: 128 KiB, 4 GiB, 14.5 GB)? The ungated 7B matches the brief's per-token figures and has a public config.
2. **Hand calculations.** Show 7.88 ms per step on a named bandwidth, or leave bandwidth as an input the learner types in? The first ties to a datasheet number; the second avoids dating the content.
3. **Engine exhibits.** May the module show a real engine startup log (KV cache size in tokens, maximum concurrency) as an exhibit, with the engine named in a caption, given the no-company rule?
4. **Speculative decoding depth.** One formula and one example, or also draft-model selection and acceptance measurement?
5. **Disaggregation.** Teach as an SLO and goodput technique with the "does not improve throughput" caveat, or leave to a stretch note?
6. **Existing courses.** A scan of what other interview-prep courses teach on this topic was not done; needs a reviewer to confirm gaps.
7. **Review.** A subject-matter reviewer should check the 7.88 ms and ridge-point arithmetic framing before it goes into learner text, and sign off the "FlashAttention does not shrink the KV cache" statement.
