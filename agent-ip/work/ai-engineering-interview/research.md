---
artifact: research-dossier
course: ai-engineering-interview
version: 1
status: draft
owner: research
sources_checked: 2026-10-22
hard_constraints:
  - JavaScript-only browser runner; all Python work is build-it-locally
  - Bandwidth, device and money; large local downloads and volatile free API tiers
  - Fast-moving framework and protocol APIs (LangGraph 1.x, MCP 2026-07-28, FastAPI SSE, MLflow 3.7 default backend)
  - Evaluation needs labelled data and, for judges, a model the learner may not be able to pay for
  - A 40 to 60 hour budget for ESL learners
out_of_scope:
  - Fine-tuning walkthroughs and model training
  - GPU infrastructure and hands-on Kubernetes
  - Building a Graph RAG index
  - Multi-agent swarms beyond one supervisor or router example
  - Building a production MCP server against the new protocol revision
  - Tours of vector databases and agent frameworks
  - OpenTelemetry GenAI attribute names in detail
  - Data structures and algorithms interview prep
open_questions:
  - Default free model path for the capstone (local model or free hosted tier)
  - Vector store for the capstone (pgvector in Docker or in-process)
  - Golden set size and who labels it
  - LLM-as-judge in CI without an API key
  - Which MCP protocol revision to teach
  - Does the three-round loop match what remote-first employers run today
---

# Research dossier: ai-engineering-interview

All claims below carry a source ID in square brackets, for example [S10]. The source table at the end gives the URL, the type, the date checked and a confidence level. Every date checked is 2026-10-22 unless the row says otherwise. Claims marked **UNVERIFIED** must not appear in learner-facing text as fact. Company and product names appear in this dossier so that writers can check sources; the brief forbids real company names in learner-facing text, so writers must use the company-free descriptions given here.

## Learner and context

**Who.** Gaza fellowship fellows aiming at remote AI engineer, LLM engineer and agentic AI roles. Many are final-year students, junior developers or self-taught builders; some already ship LLM features. Arabic is the first language and English the second. (Course brief.)

**What they already know.** Python basics, virtual environments, HTTP and JSON APIs, Git, the command line and one small project. No ML training or LLM work is assumed. (Course brief.)

**Device and connection.** Many learn on phones over weak or expensive mobile data, around power cuts. Reading, quizzes and canvases must work on a phone. Build work needs a laptop for some sessions. Every download size must be stated. (Course brief.) This dossier therefore records download sizes for every tool the capstone might need (see "Learner budget").

**Time.** About 10 to 12 hours a week for 4 to 5 weeks, so 40 to 60 hours in total. In the course architecture, that is a "short course or specialisation" (30 to 60 hours), not the 210-hour flagship default [S108]. The architecture says to scale the shares, not the rigour: about 20 percent reading and decisions, 35 percent guided build, 25 percent independent build, 10 percent testing, 5 percent review and defence, 5 percent buffer. At 50 hours that is roughly 10, 17.5, 12.5, 5, 2.5 and 2.5 hours. (`02-course-architecture.md`, time budget.)

**What they need to be able to do.** Pass a three-round loop: (1) a deep dive on their own RAG or agent project, (2) hands-on coding plus system design, (3) a managerial round about past projects, deployment and production evaluation. The hands-on round is practical service and async coding, not algorithm puzzles. (Course brief.)

**What they will leave with.** A portfolio repository with an evaluation report, a design note and practised answers with numbers. (Course brief.)

**Platform facts** [S107]: `CodeExercise` runs JavaScript only; `InteractiveCanvas` renders only registered slugs; `GlossaryTerm` is the inline term reveal; `Checklist` and `LearningLog` do not gate progress.

## Domain model

### Actors in the interview loop

- **Candidate**: the fellow.
- **Project interviewer**: probes the candidate's own RAG or agent project for depth, honesty and numbers.
- **Technical interviewer**: runs live coding (async service code, validation, retries) and a system design discussion.
- **Hiring manager**: asks about past projects, how the system was deployed, monitored and evaluated, and how incidents were handled.

### The RAG pipeline (entities and lifecycle)

1. **Ingest**: load documents, parse PDFs and tables, clean text.
2. **Chunk**: split into retrievable pieces [S1, S2].
3. **Embed**: turn each chunk into a vector with an embedding model [S3, S4].
4. **Index**: store vectors in an approximate nearest neighbour (ANN) index such as HNSW [S5, S6], and optionally a keyword index such as BM25 [S8].
5. **Query**: optionally rewrite or decompose the question [S13, S14, S15].
6. **Retrieve**: dense search, keyword search, or both fused with RRF [S10].
7. **Rerank**: a cross-encoder rescores the top candidates [S11].
8. **Generate**: the model answers from the retrieved context, ideally with citations [S55].
9. **Evaluate**: retrieval metrics (recall@k, precision@k, MRR) and generation metrics (faithfulness, answer relevance) on a golden set [S43, S44, S46, S47].

Invariant: the answer may use only what retrieval returned, and the system must say so when retrieval returned nothing useful. The first of the seven RAG failure points is "Missing Content" [S24].

### The agent (entities and lifecycle)

- **State**: a typed dictionary that flows through the graph [S29].
- **Nodes**: functions that read state and return updates [S29].
- **Edges**: fixed or conditional routes between nodes [S29].
- **Reducers**: rules for merging an update into state, for example appending to a list [S29].
- **Tools**: functions the model may call, described with JSON Schema [S25, S26].
- **Checkpointer**: saves state per thread so a run can pause and resume [S30, S31].
- **Interrupt**: a pause for human approval, resumed with a value [S30].
- **Memory**: short-term (one thread) and long-term (across threads) [S32].

Invariant: a tool with side effects (refund, email, delete) must not run without approval, and code before the pause must be safe to run twice, because the node restarts from the beginning on resume [S30].

### The service

A FastAPI app with Pydantic request and response models, structured errors (422 for invalid input [S62]), bounded concurrency to the model provider (`asyncio.Semaphore` [S61]), timeouts (`asyncio.timeout` [S58]), retries with exponential backoff and jitter [S66, S67], and respect for `429` plus `Retry-After` [S68, S69].

### Vocabulary for the glossary (plain-English definitions writers can adapt)

| Term | Plain definition |
|---|---|
| Chunk | A small piece of a document that can be found and read on its own. |
| Embedding | A list of numbers that stands for the meaning of a text. Similar meanings give nearby lists. |
| Cosine similarity | A score for how closely two embeddings point the same way. The default similarity in sentence-transformers [S3]. |
| ANN (approximate nearest neighbour) | A fast search that finds vectors that are probably the closest, trading a little accuracy for speed [S5, S6]. |
| HNSW | A layered graph index for ANN search [S5]. |
| BM25 | A keyword ranking formula. Repeating a word helps less and less (saturation); long documents are normalised [S8]. |
| Hybrid search | Running keyword and vector search and combining the lists. |
| RRF (Reciprocal Rank Fusion) | Combine ranked lists by adding 1 divided by (60 plus rank) for each list [S10]. |
| Bi-encoder | Encodes query and document separately; fast; used for retrieval [S11]. |
| Cross-encoder | Reads query and document together and outputs a score; slower, more accurate; used for reranking [S11]. |
| Recall@k | The share of all relevant documents that appear in the top k [S43]. |
| Precision@k | The share of the top k results that are relevant [S43]. |
| MRR | The average, over questions, of 1 divided by the rank of the first correct result (0 if none) [S44]. |
| Faithfulness | The share of claims in an answer that the retrieved context supports [S46]. |
| Golden set | A fixed list of questions with known good answers or known relevant documents, used to compare versions. |
| Prompt injection | Input that changes the model's behaviour in ways the builder did not intend [S39]. |
| Checkpointer | The part that saves an agent's state so it can stop and resume [S31]. |
| Idempotent | Safe to repeat: running it twice has the same effect as once [S66]. |
| Jitter | Random extra wait added to retries so clients do not retry at the same moment [S66]. |

## Hard constraints

These five constraints change the architecture of the course, not just its wording.

### 1. The browser runs JavaScript only

Python cannot run in the browser (`04-interactive-playbook.md`; course brief). Consequences:

- Every Python skill (FastAPI, asyncio, LangGraph, pytest, MLflow) is a build-it-locally Step with exact commands, expected output, a verification checklist and a repository link question.
- JavaScript exercises are allowed only for language-neutral skills. Good candidates, all small and verifiable by tests: cosine similarity, recall@k, precision@k, MRR, RRF fusion, a fixed-size chunker, BM25 term saturation, exponential backoff with jitter, a toy reducer. Each must say why it is JavaScript.
- Never imply a Python sandbox exists.

### 2. Bandwidth, device and money

Measured download sizes on 2026-10-22:

- The local model runner's Windows installer is about 1.66 GB; the macOS app is about 214 MB; the Linux amd64 bundle is about 1.5 GB [S87].
- A small chat model is 0.5 to 5.2 GB depending on size: 523 MB (0.6B), 1.3 GB (1B), 1.4 GB (1.7B), 2.0 GB (3B), 2.5 GB (4B), 5.2 GB (8B) [S88, S89].
- A local embedding model is 91 MB (all-MiniLM-L6-v2) [S4] or 274 MB (nomic-embed-text through the local runner) [S90]. A small cross-encoder reranker is also about 91 MB [S12].
- PyTorch, pulled in by sentence-transformers, is 124 MB on Windows and 127 MB on macOS, but the default Linux x86_64 wheel is 555 MB and pulls CUDA dependency wheels of about 553, 216, 170 and 60 MB on top. The CPU-only Linux wheel from the PyTorch index is 196 MB [S91]. Writers must give Linux learners the CPU index command.
- The pgvector Docker image is about 161 MB compressed [S7], plus Docker itself (size not checked; **UNVERIFIED**).

Money: free hosted tiers exist but are volatile and dated. One major provider's free tier lists "Used to improve our products: Yes" for free-tier traffic [S92], so learners must not send personal or client data through it. That provider lists Palestine as an available region as of 2026-04-28 [S93]. A second provider's rate-limit page showed only its paid "Developer plan" figures; free-plan limits are **UNVERIFIED** [S94]. LLM-as-judge scorers in one popular eval library default to a paid hosted model and need an API key [S50].

Design consequences: tests must run with a deterministic fake model and no key (brief); the evaluation report must be reproducible without paid calls for its retrieval metrics; every Step states its download size; reading must never require a download.

### 3. Fast-moving framework and protocol APIs

Changes found on 2026-10-22 that would break a course written from memory:

- **MCP** moved to revision 2026-07-28, which drops the `initialize` handshake: every request carries its own protocol version and capabilities. Revisions up to 2025-11-25 are now called "legacy" [S38]. Most tutorials teach the legacy flow. Whether the Python `mcp` SDK 2.3.0 supports the new revision is **UNVERIFIED**.
- **FastAPI** gained built-in Server-Sent Events (`fastapi.sse.EventSourceResponse`) in 0.135.0 [S64]; older tutorials use `StreamingResponse` by hand.
- **MLflow** changed its default tracking store from `./mlruns` files to `sqlite:///mlflow.db` in 3.7.0 [S75].
- **Starlette** 1.9.0 prints a deprecation warning when its test client uses `httpx` and suggests `httpx2` (observed locally) [S65]. `httpx` itself has not released since 0.28.1 in December 2024 [S105].
- **RAGAS** has two APIs: `AnswerRelevancy` in the new collections API and `ResponseRelevancy` in the legacy API, which is slated for removal in 1.0 [S47].
- **LangGraph** docs now show `graph.stream_events(..., version="v3")` for resuming [S30]; `graph.invoke(Command(resume=...), config)` was verified locally on 1.2.16, but the `stream_events` form was not run (**UNVERIFIED** locally).
- **OWASP** released a 2026 edition of the LLM Top 10 on 2026-08-03 [S40]. The 2025 LLM01 page was read; the 2026 numbering was not confirmed from the official PDF (**UNVERIFIED**).
- **OpenTelemetry GenAI** conventions are still "Development" and moved to a separate repository [S80].

Design consequences: pin exact versions in the capstone `requirements` file; put the model behind an adapter; teach concepts that survive (state, reducers, checkpoint, interrupt, resume) and give API names as dated examples; re-check every row of the versions table at G5.

### 4. Evaluation needs labelled data and a judge

Retrieval metrics need a list of which documents are relevant for each question [S43, S44]. Faithfulness and answer relevance need either a judge model or an NLI model [S46, S47, S54]. LLM judges show position, verbosity and self-enhancement bias [S48]. One first-party guide says to prefer many automatically graded questions over a few hand-graded ones, and to use a different model to judge than the one that generated [S49]. Consequences: the course must teach how to build a small golden set by hand, how to run code-based retrieval metrics in CI with no key, and how to treat judge scores as noisy signals that need spot checks.

### 5. Time and language

At 40 to 60 hours, the course cannot cover every RAG variant or framework. Plain English, short sentences and a glossary term for every new word cost words and time. This pushes toward depth on one pipeline, one agent and one evaluation loop, with the rest taught as interview talking points.

## Existing courses and gaps

| Resource | What it teaches | Gap for this learner |
|---|---|---|
| Hugging Face Agents Course (free) [S102] | Agent fundamentals, three frameworks (smolagents, LlamaIndex, LangGraph), use cases, a final assignment, bonus units on function-calling fine-tuning and on observability and evaluation. About 3 to 4 hours a week. | The intro page does not mention production deployment, interviews or prompt injection. Three frameworks split attention. |
| DeepLearning.AI catalogue [S103] | A 26-hour RAG course, an "Agentic AI" course, many 1 to 3 hour short courses (crewAI, LangGraph long-term memory, MCP). | No interview prep course was visible. Short courses are tool-led, not decision-led. Free status of short courses **UNVERIFIED**. |
| LangChain Academy, "Introduction to LangGraph" [S104] | LangGraph modules on state, human feedback, memory. | Seen only through search results; syllabus **UNVERIFIED**. Framework vendor course, no evaluation-in-CI or service engineering. |
| "AI Engineering" (book, 2025) [S106] | Broad application-engineering coverage including RAG, agents, finetuning and efficiency. | A book, not practice. No interview rehearsal. Chapter list not read in full. |
| Tech Interview Handbook, System Design Primer [S96, S97] | General behavioural (STAR) and system design method. | Not LLM-specific: no retrieval metrics, no evaluation, no prompt injection. |

**Gaps this course can own:**

1. Interview defence with numbers: stating recall@k, MRR, faithfulness, p95 latency and cost per query for the learner's own system.
2. Evaluation as a regression test in CI, runnable without a paid key.
3. Production judgement: when not to use an agent [S34, S33], how to add human approval safely [S30], and what to say about deployment trade-offs.
4. Security as a design topic: indirect prompt injection, least privilege and approval gates [S39, S41], with a real incident [S99, S100].
5. Bandwidth-aware setup with stated download sizes, which no resource above provides.

**Where existing material is outdated or wrong (as of 2026-10-22):** MCP tutorials that teach the `initialize` handshake as current [S38]; FastAPI streaming tutorials that hand-roll SSE [S64]; MLflow tutorials that say runs go to `./mlruns` by default [S75]; chunking tutorials that copy an 800-token, 400-overlap default, which one evaluation found gave poor recall-efficiency trade-offs [S2]; tutorials that call "did any relevant document appear in the top k" recall@k, when TREC tools call that Success@k [S43].

## Technical landscape

### RAG facts

- **Chunking.** Splitters fall into length-based (characters or tokens), text-structure-based (recursive: paragraphs, then sentences, then words) and document-structure-based (Markdown headers, HTML tags, JSON, code). One framework's docs advise starting with the recursive splitter [S1]. One vendor's technical report found chunking choice changed recall by up to 9 percent, that recall stayed around 85 to 90 percent across sizes while smaller chunks raised precision, that 200 tokens with no overlap did consistently well, and that an 800-token, 400-overlap default did poorly on efficiency [S2]. Treat the report as one study on its own datasets, not a law. Trade-off to teach: small chunks are precise but lose context; large chunks keep context but dilute the embedding and waste prompt tokens.
- **Embeddings and cosine.** Cosine is the default similarity in sentence-transformers; dot product on normalised embeddings equals cosine and is faster [S3]. all-MiniLM-L6-v2 maps text to 384 numbers and truncates input longer than 256 word pieces [S4]. That limit is a chunk-size constraint learners must state.
- **ANN and HNSW.** HNSW builds layers of proximity graphs, searches from the top layer down, and reports logarithmic complexity scaling [S5].
- **pgvector 0.8.7** supports HNSW and IVFFlat; operators `<->` (L2), `<#>` (negative inner product), `<=>` (cosine distance), `<+>` (L1), `<~>` (Hamming), `<%>` (Jaccard); indexes up to 2,000 dimensions for `vector` and 4,000 for `halfvec`. Approximate indexes can return different results than exact search, filters apply after the index scan, and iterative index scans (since 0.8.0) help when filters remove too many rows [S6]. Licence: PostgreSQL licence [S6].
- **BM25.** Term frequency saturates (k1 controls how fast), and `b` between 0 and 1 controls document length normalisation (1 is full, 0 is none) [S8]. The `rank-bm25` package (last release 0.2.2, February 2022) defaults to k1 = 1.5 and b = 0.75 and does no tokenisation for you [S9]. Its age is a maintenance risk to mention.
- **Hybrid search and RRF.** RRF score = sum over lists of 1 / (k + rank), with k = 60 fixed in a pilot and "not critical" [S10]. It needs no score normalisation, which is why it is a common default for fusing BM25 and vector results.
- **Rerankers.** Bi-encoders embed separately and are fast; cross-encoders read the pair together, give no embedding, and are more accurate but slow. The docs recommend retrieving about the top 100 with a bi-encoder, then reranking with a cross-encoder. Their example: comparing 10,000 sentences pairwise with a cross-encoder takes about 65 hours, versus about 5 seconds to embed them with a bi-encoder [S11].
- **Query rewriting.** Rewrite-Retrieve-Read adds a rewriting step before retrieval and reports consistent gains [S14]. HyDE asks a model to write a hypothetical answer, embeds it, and retrieves real documents near it; it needs no relevance labels [S13].
- **Multi-hop and decomposition.** IRCoT argues that one-step retrieve-then-read is not enough when what to retrieve depends on what has been found, and alternates retrieval with reasoning steps; it reports up to 21 points better retrieval on multi-hop datasets [S15]. Cross-document questions ("compare policy A and policy B") are the practical case: decompose into sub-questions, retrieve per sub-question, then combine. No primary source was read specifically for "cross-document retrieval" as a named method; teach it as decomposition [S15].
- **Parsing PDFs and tables.** pypdf (BSD-3-Clause, 6.21.2) states that PDFs have no semantic layer, that tables are usually just positioned text, and that it is not OCR software [S16]. unstructured (Apache-2.0) needs system packages such as poppler, tesseract, libmagic and LibreOffice; its README claims the vendor's paid API scores higher on tables, from the vendor's own benchmark [S17]. Docling's code is MIT and handles layout, reading order, tables and OCR; its model licences are separate and were not checked (**UNVERIFIED**) [S18].
- **Graph RAG.** Builds an entity graph and community summaries with an LLM, then answers "global" questions about a whole corpus; it improved comprehensiveness and diversity over a naive RAG baseline on 1-million-token datasets [S19]. The project README warns that indexing "can be an expensive operation" and to start small [S20]. No cost figure was found (**UNVERIFIED** for any number).
- **Adaptive-RAG.** A small classifier predicts question complexity and routes to no retrieval, single-step, or multi-step retrieval [S21].
- **Lost in the Middle.** Models do best when relevant text is at the start or end of the context and worse in the middle [S22]. Implication: fewer, better-ranked chunks beat stuffing the context.
- **RAG versus fine-tuning.** For knowledge injection, RAG outperformed unsupervised fine-tuning for both existing and new knowledge [S23]. Teach as: fine-tune for form and behaviour, retrieve for facts that change.

### Agent facts

- **Tool calling and structured outputs (provider-neutral).** Tools and outputs are described with JSON Schema; the current published version is 2020-12 [S25]. One provider's docs say only its structured-output mode guarantees schema adherence, while plain JSON mode only guarantees valid JSON; its examples set `additionalProperties: false` and list every field as required; refusals come back as a separate item [S26]. The local model runner exposes an OpenAI-compatible endpoint at `http://localhost:11434/v1/` with tool calling, and its native `format` field accepts a JSON Schema such as `Model.model_json_schema()` [S27]. Teach the pattern: define a Pydantic model, send its schema, validate the reply with `model_validate_json`, and treat a validation failure as a normal error path.
- **ReAct.** Interleaves reasoning traces with actions such as search calls; reduces hallucination compared with reasoning alone on HotpotQA and FEVER [S28].
- **LangGraph 1.2.16 API (docs read and run locally).** Imports: `from langgraph.graph import StateGraph, START, END`; `from langgraph.graph.message import add_messages`; `from langgraph.checkpoint.memory import InMemorySaver`; `from langgraph.types import Command, interrupt` [S29]. State is a `TypedDict`; `Annotated[list[str], operator.add]` appends; `Annotated[list, add_messages]` appends or updates by message ID and converts tuples to message objects; `MessagesState` is a prebuilt state with a `messages` key; `builder.add_node`, `add_edge(START, "x")`, `add_conditional_edges("x", route_fn, [...])`, `builder.compile(checkpointer=...)` [S29]. A node may return `Command(update=..., goto=...)` [S29]. Verified locally: an append reducer produced `['plan', 'approve:True', 'do']` and `add_messages` turned a tuple into a `HumanMessage`.
- **Human in the loop.** `interrupt(payload)` pauses and needs a checkpointer and a `thread_id` in `config`; the first `invoke` returns an `__interrupt__` field; `Command(resume=value)` resumes and `value` becomes the return of `interrupt`. The node restarts from the beginning on resume, so side effects before `interrupt` should be idempotent, and `interrupt` must not be wrapped in a bare `try/except` [S30]. Verified locally: the approval node ran twice for one approval.
- **Checkpointers.** `InMemorySaver` loses everything on restart; `SqliteSaver` is for development; `PostgresSaver` is for production [S31].
- **Memory.** Short-term memory is thread-scoped state saved by the checkpointer; long-term memory lives in a store under namespaces and is shared across threads; the docs name semantic, episodic and procedural memory [S32].
- **Workflows versus agents.** One first-party guide defines workflows as LLMs and tools on "predefined code paths" and agents as LLMs that "dynamically direct their own processes", recommends the simplest solution that works, and names five workflow patterns: prompt chaining, routing, parallelisation, orchestrator-workers and evaluator-optimizer [S34]. LangGraph's multi-agent page lists subagents (a main agent calls others as tools), handoffs, skills, router and custom workflows, and says a single agent with the right tools "can often achieve similar results" [S33]. A 2025 study of multi-agent systems built a 14-mode failure taxonomy and found benchmark gains "often minimal" [S35]. Interview line: start with a workflow; add agency only where the path cannot be known in advance.
- **Model Context Protocol (revision 2026-07-28).** Hosts (LLM apps) contain clients that connect to servers; messages are JSON-RPC 2.0; servers offer resources (context), prompts (templates) and tools (functions the model may run); clients may offer elicitation (asking the user for input) [S36]. Standard transports are stdio and Streamable HTTP; the older HTTP+SSE transport is deprecated [S37, S38]. The spec says tools are arbitrary code execution, tool descriptions are untrusted unless from a trusted server, and hosts must get user consent before invoking a tool [S36].
- **Prompt injection.** OWASP LLM01:2025: direct injection is user input that alters behaviour; indirect injection arrives through external content such as websites or files; "it is unclear if there are fool-proof methods of prevention" [S39]. The research that named indirect injection says LLM-integrated apps "blur the line between data and instructions" [S41]. OWASP's mitigations: constrain behaviour, validate output formats, filter input and output, least privilege, human approval for high-risk actions, segregate external content, adversarial testing [S39]. Teach why it is not fully solvable: the model reads instructions and data in one channel, so the defence is to limit what a fooled model can do.
- **Guardrail options** (versions from PyPI): NeMo Guardrails 0.24.1 (Apache-2.0), Guardrails AI 0.11.0 (Apache-2.0), LLM Guard 0.3.16 (MIT, last release May 2025), Presidio Analyzer for PII detection (MIT) [S42]. Name the constraint each fits (policy rails, output validation, scanning, PII), not popularity. Do not claim any of them stops prompt injection.

### Evaluation facts

- **Precision@k**: percentage of the top k results labelled relevant. **Recall@k**: fraction of a query's relevant documents retrieved by rank k. Some tasks use "Recall@k" to mean "any relevant document in the top k"; TREC tools call that **Success@k** [S43]. Learners must say which one they report. (The Stanford IR textbook was unreachable on 2026-10-22, so this definition comes from the `ir-measures` documentation, which follows TREC conventions.)
- **MRR**: each question scores 1 / rank of the first correct response, or 0 if none appears in the list; the run score is the mean over questions [S44].
- **RAGAS**: the paper evaluates context relevance, faithfulness and answer quality "without having to rely on ground truth human annotations" [S45]. Faithfulness = claims supported by retrieved context / total claims, from 0 to 1 [S46]. Answer relevancy generates (by default) 3 questions from the answer and averages their cosine similarity to the original question; it ignores factual accuracy [S47]. Both need a judge model.
- **Grounding** is used in this course to mean "every claim traceable to a cited chunk". Citation quality has been measured: on one long-form dataset, even the best models lacked complete citation support 50 percent of the time [S55].
- **LLM-as-judge biases**: position, verbosity, self-enhancement and limited reasoning; the strongest judge agreed with humans over 80 percent of the time, about the level humans agree with each other [S48]. Mitigations to teach: swap answer order, use rubrics with specific outputs, use a different model to judge [S49].
- **Golden sets and CI.** First-party guidance: make evals task-specific with edge cases, automate grading, prefer volume; code-based grading is "fastest and most reliable", human grading "slow and expensive", LLM grading flexible but must be tested for reliability first [S49]. One tracing tool documents offline experiments in CI that fail the job when a score drops below a threshold, and online LLM-judge scoring of live traces [S51]. MLflow's evaluation API is `mlflow.genai.evaluate(data=..., predict_fn=..., scorers=[...])`, with `@scorer` for custom code scorers; its built-in judges default to a paid hosted model [S50].
- **Hallucination detection.** SelfCheckGPT samples several answers and flags facts that are not consistent across samples, needing no external database [S52]; its repo recommends the NLI variant (MIT; last PyPI release March 2024) [S53]. Sampling several answers multiplies generation cost by the number of samples (reasoning from the method, not a measured figure). NLI-based and question-generation-and-answering checks are strong, complementary factual-consistency methods [S54]. Citation checks: verify every cited chunk ID exists in the retrieved set, then check support [S55].

### Engineering facts (Python 3.11 or later)

All verified in the Python 3.15 docs and run locally on Python 3.12.10.

- `asyncio.gather(..., return_exceptions=True)` puts exceptions in the result list; with `False` (default) the first exception propagates and the other awaitables are **not** cancelled [S56]. Local output: `[1, ValueError('x')]`.
- `asyncio.TaskGroup` (added 3.11) cancels the remaining tasks when one fails and raises an `ExceptionGroup`; 3.11 release notes recommend it over `create_task()` and `gather()` for new code [S57]. Catch with `except*`.
- `asyncio.timeout()` (added 3.11) is recommended over `wait_for()` for new code [S58]. It raises the built-in `TimeoutError` (`asyncio.TimeoutError is TimeoutError` printed `True` locally).
- `asyncio.wait_for()` cancels the awaitable on timeout and waits for the cancellation to finish, so total time can exceed the timeout [S59].
- `asyncio.CancelledError` subclasses `BaseException`, not `Exception`. If caught, it "should generally be propagated" after clean-up; `TaskGroup` and `timeout()` rely on cancellation and can misbehave if it is swallowed [S60].
- `asyncio.Semaphore(n)` bounds concurrency; a local run of 10 tasks with `Semaphore(2)` never exceeded 2 in flight [S61].
- **FastAPI 0.159.1 with Pydantic 2.14.1** (run locally): invalid body returns **422** with `{"detail": [{"type", "loc", "msg", "input", "ctx"}]}`, for example `string_too_short` at `["body", "question"]`; override with `@app.exception_handler(RequestValidationError)`; the docs warn that `str(exc)` can leak file and line details [S62]. Note: the FastAPI docs page shows old Pydantic v1 error wording; teach from the local output.
- `response_model` validates, documents and **filters** output; a returned extra field (`secret`) was dropped locally; `response_model` wins over the return annotation [S63].
- **SSE**: `from fastapi.sse import EventSourceResponse`, `response_class=EventSourceResponse`, `yield` items; added in 0.135.0; sends a keep-alive ping every 15 seconds; local output was `text/event-stream` with `data: {...}` lines [S64].
- **Retries.** A first-party write-up: retries are "selfish" and can deepen overload; use exponential backoff with a cap and jitter; side-effecting APIs are only safe to retry with idempotency; retry at one layer, because three retries at each of five layers can multiply load by 243 times [S66]. tenacity 9.2.1 provides `wait_exponential_jitter`, `wait_random_exponential`, `stop_after_attempt` and `retry_if_exception_type` [S67].
- **429 and Retry-After.** 429 means too many requests in a period, and the response may include `Retry-After` [S68]. `Retry-After` is an HTTP date or a number of seconds [S69]. At least one provider sends `retry-after` in seconds only on 429 [S70].
- **Caching.** Exact caching: key on a hash of normalised input; safe but low hit rate (course reasoning). Semantic caching: embed the query and return a cached answer for a similar one; the main open-source library warns of false positives on hits and false negatives on misses [S73]. Provider prompt caching, in general terms: providers cache an exact prompt **prefix**, so static content (system prompt, tools, documents) goes first and changing content last; one provider defaults to a 5-minute lifetime with a 1-hour option, charges more to write the cache and about a tenth to read it [S71]; another caches automatically from 1,024 tokens on newer models [S72]. Do not teach per-provider prices; they change.

### Production facts

- **MLflow 3.17.2** tracks runs with parameters (`mlflow.log_param`), metrics (`mlflow.log_metric`) and artifacts (output files) inside `mlflow.start_run()` [S74]. Since 3.7.0 the default store is `sqlite:///mlflow.db` [S75]. GenAI features: tracing that is OpenTelemetry compatible, with `mlflow.<library>.autolog()` [S76], and `mlflow.genai.evaluate` [S50]. Licence: not confirmed; the PyPI licence field shows only a copyright header (**UNVERIFIED**; check the repository LICENSE file).
- **Tracing tools and licences.** Langfuse: MIT except `ee` folders; self-host with Docker Compose [S77]. Arize Phoenix: Elastic License 2.0 (source-available, not OSI open source), built on OpenTelemetry [S78]. LangSmith: hosted; the free Developer plan has 1 seat and 5,000 base traces a month; self-hosting is Enterprise only [S79]. Licence matters: ELv2 restricts offering the software as a managed service.
- **OpenTelemetry GenAI semantic conventions**: status "Development"; moved to a separate repository [S80]. Teach "traces have spans for model calls, tool calls and retrieval" and do not teach attribute names.
- **Serverless versus Kubernetes.**
  - Serverless container platform (Cloud Run): default request timeout 5 minutes, maximum 60 minutes, 504 on timeout [S81]. Minimum instances reduce cold-start latency but are billed [S82]. GPUs (L4 24 GB, RTX PRO 6000 96 GB) can scale to zero, start in about 5 seconds with drivers, and need quota [S83].
  - Function platform (Lambda): default timeout 3 seconds, maximum 900 seconds [S84]. Response streaming is native on Node.js only; Python needs a custom runtime or a web adapter; streamed responses up to 200 MB versus 6 MB buffered; a stream is billed for the full duration even if the client disconnects [S85].
  - Kubernetes (AKS): GPU node pools; managed GPU pools recommended; GPU VMs cost more and are region-limited [S86]. EKS was not checked (**UNVERIFIED**).
  - Interview framing: if the service only calls a hosted model API, serverless is usually enough, with timeouts and streaming as the main limits; if it hosts its own model on GPUs, steady traffic or long jobs, Kubernetes gives more control at a higher operational cost. Cold-start durations without GPUs were not measured (**UNVERIFIED**: give no number).
- **Online evaluation and drift.** Online evaluation scores live traces with judges and user feedback [S51]. "Drift" (the questions people ask, or the documents, change over time so quality drops) has no primary source in this dossier (**UNVERIFIED** as a sourced claim); teach it as a monitoring rationale: track the share of "no answer" responses, retrieval scores and feedback over time, and re-run the golden set when the corpus changes. One RAG case study concluded that validation is "only feasible during operation" and robustness "evolves" [S24].

### Learner budget (running the capstone without paying)

| Item | Size or limit | Source |
|---|---|---|
| Local model runner, Windows installer | 1,659 MB | [S87] |
| Local model runner, macOS | 214 MB (dmg) | [S87] |
| Local model runner, Linux amd64 | 1,505 MB | [S87] |
| Chat model 0.6B (40K context, tools) | 523 MB | [S89] |
| Chat model 1B (128K context) | 1.3 GB | [S88] |
| Chat model 3B (128K context) | 2.0 GB | [S88] |
| Chat model 4B | 2.5 GB | [S89] |
| Embedding model via runner (nomic-embed-text) | 274 MB | [S90] |
| all-MiniLM-L6-v2 (384 dims, 256 word pieces) | 91 MB | [S4] |
| Cross-encoder reranker (ms-marco-MiniLM-L6-v2) | 91 MB | [S12] |
| PyTorch wheel, Windows / macOS / Linux CPU-only | 124 / 127 / 196 MB | [S91] |
| PyTorch default Linux wheel plus CUDA wheels | 555 MB plus about 1 GB | [S91] |
| pgvector Docker image | about 161 MB | [S7] |
| Free hosted tier (one provider) | exists; free traffic used to improve products; limits shown only in the provider console | [S92] |

RAM needed to run 1B to 4B models was not checked (**UNVERIFIED**). A cheaper capstone path that avoids PyTorch entirely: use the runner's embedding endpoint, or ONNX Runtime (14.9 to 23.8 MB wheels) with the ONNX export of MiniLM (about 90 MB, or about 23 MB quantised) [S4, S105]. Whether sentence-transformers 6.2.0 can run its ONNX backend without installing PyTorch was not tested (**UNVERIFIED**).

### Versions checked on PyPI (2026-10-22)

| Package | Version | Released | Licence |
|---|---|---|---|
| fastapi | 0.159.1 | 2026-10-21 | MIT |
| pydantic | 2.14.1 | 2026-10-11 | MIT |
| uvicorn | 0.54.0 | 2026-09-25 | BSD-3-Clause |
| starlette | 1.9.0 | 2026-10-18 | BSD-3-Clause |
| httpx | 0.28.1 | 2024-12-06 | BSD-3-Clause |
| pytest | 9.1.1 | 2026-06-19 | MIT |
| tenacity | 9.2.1 | 2026-10-07 | Apache-2.0 |
| langgraph | 1.2.16 | 2026-10-16 | MIT |
| langgraph-checkpoint | 4.3.0 | 2026-10-12 | MIT |
| langgraph-checkpoint-sqlite | 3.1.2 | 2026-10-12 | MIT |
| langchain-core | 1.6.13 | 2026-10-21 | MIT |
| mlflow | 3.17.2 | 2026-10-21 | see production facts |
| rank-bm25 | 0.2.2 | 2022-02-16 | Apache-2.0 |
| sentence-transformers | 6.2.0 | 2026-10-21 | Apache-2.0 |
| pgvector (Python client) | 0.5.1 | 2026-10-09 | MIT |
| pgvector (extension) | 0.8.7 | tag checked 2026-10-22 | PostgreSQL |
| ragas | 0.4.3 | 2026-01-13 | Apache-2.0 |
| langfuse | 5.0.4 | 2026-10-21 | MIT |
| arize-phoenix | 20.24.0 | 2026-10-21 | Elastic-2.0 |
| docling | 2.141.0 | 2026-10-20 | MIT |
| unstructured | 0.27.33 | 2026-10-22 | Apache-2.0 (Python 3.11 to 3.13 only) |
| pypdf | 6.21.2 | 2026-10-21 | BSD-3-Clause |
| mcp | 2.3.0 | 2026-10-02 | MIT |
| openai (SDK) | 3.36.1 | 2026-10-22 | Apache-2.0 |
| ollama (client) | 0.6.3 | 2026-09-29 | MIT |
| torch | 2.14.1 | 2026-09-30 | n/a |
| onnxruntime | 1.31.0 | checked 2026-10-22 | n/a |
| selfcheckgpt | 0.1.7 | 2024-03-10 | MIT |
| Local model runner | v0.40.8 | 2026-10-21 | n/a |

Most packages now require Python 3.10 or later; langfuse, arize-phoenix and unstructured require 3.11 or later, and unstructured does not yet support 3.14 [S105]. The brief's "Python 3.11 or later" is right; recommend 3.12 for the capstone.

### Interview craft

- **Behavioural (managerial round): STAR.** Situation, Task, Action, Result. One university careers centre suggests about 20 percent situation, 10 percent task, 60 percent action and 10 percent result; focus on the actions "you personally took (even if you worked as part of a team)"; include quantifiable results [S95]. A practitioner handbook gives the same structure [S96].
- **System design.** A widely used open guide (CC BY 4.0) gives four steps: outline use cases, constraints and assumptions; create a high-level design; design core components; scale the design by finding bottlenecks and weighing trade-offs [S97]. For LLM systems, the course can add: state the quality metric and its current value, the latency and cost budget, and the failure plan (course opinion, label as such).
- **Project deep dive.** No reputable public framework specific to this round was found (**UNVERIFIED**). Suggested structure, labelled as course opinion: problem and user, architecture, the evaluation numbers, one failure found and fixed, what you would change.

## Production failure modes

Each failure below has a source. Writers may use the company-free descriptions in learner-facing text.

### Public incidents (company-free descriptions)

1. **Chatbot gave a wrong policy answer; the company had to pay.** Source: Moffatt v. Air Canada, 2024 BCCRT 149, British Columbia Civil Resolution Tribunal, 2024-02-14 [S98]. The chatbot said a bereavement fare could be claimed after travel; the policy said otherwise. The tribunal called the argument that the chatbot was "a separate legal entity" "a remarkable submission" and found the airline "responsible for all the information on its website", whether from a static page or a chatbot. Total ordered: 812.02 Canadian dollars. **Company-free line:** "In 2024, a Canadian tribunal ordered an airline to pay a customer about 812 Canadian dollars after its website chatbot wrongly said a discount could be claimed after travel; the tribunal said a company is responsible for everything on its website, chatbot answers included." Lesson: ground policy answers in the policy document, cite it, and refuse when retrieval finds nothing.
2. **Zero-click prompt injection that leaked data.** Sources: CVE-2025-32711, published 2025-06-11, CVSS 9.3 from the vendor and 7.5 from NVD [S99]; the research paper "EchoLeak" (arXiv 2509.10540, 2025) [S100]. One crafted email, later pulled in as context, caused a workplace AI assistant to exfiltrate internal data with no user action. The chain evaded an injection classifier, bypassed link redaction with reference-style Markdown, and used auto-fetched images through an allowed proxy. **Company-free line:** "In 2025, researchers showed that one crafted email could make a workplace AI assistant leak internal files, with no click from the user: the assistant read the email as context, followed hidden instructions, and sent data out through an image link." Lesson: retrieved content is untrusted input; limit what the model can reach and where output can send data.
3. **Fabricated citations reached a court.** Source: Mata v. Avianca, Inc., No. 22-cv-1461 (PKC), S.D.N.Y., Opinion and Order on Sanctions, 2023-06-22 [S101]. Lawyers filed a brief citing decisions a chatbot had invented. The court said there is "nothing inherently improper" about a reliable AI tool, but lawyers have a "gatekeeping role" for accuracy, and imposed a 5,000 dollar penalty. **Company-free line:** "In 2023, a US federal court fined two lawyers and their firm 5,000 dollars after they filed a brief citing court decisions that a chatbot had made up and did not check." Lesson: citation checks and human review for high-stakes output.

### Failure modes for RAG

- The seven failure points from three case studies: missing content, missed the top-ranked documents, not in context (consolidation limits), not extracted, wrong format, incorrect specificity, incomplete [S24].
- Relevant text placed in the middle of a long context is used less well [S22].
- Approximate indexes return different results than exact search, and filters applied after the index scan can return too few rows [S6].
- Text beyond the embedding model's input limit is silently cut (256 word pieces for MiniLM) [S4].
- Tables and scanned pages extract badly or not at all with plain PDF text extraction [S16].
- Semantic cache returns a cached answer for a question that only looks similar [S73].

### Failure modes for agents

- Indirect prompt injection through retrieved content or tool results [S39, S41, S100].
- A side effect placed before `interrupt()` runs again on resume (double refund, duplicate audit row) [S30].
- `interrupt()` wrapped in `try/except Exception` swallows the pause [S30].
- In-memory checkpoints vanish on restart, losing pending approvals [S31].
- Multi-agent systems fail through system design issues, inter-agent misalignment and weak task verification [S35].
- Retry storms: retries at every layer multiply load [S66]; retries of non-idempotent tool calls repeat side effects [S66].

### Failure modes for the service

- Swallowing `CancelledError` breaks timeouts and task groups [S60].
- `gather` without `return_exceptions` leaves sibling tasks running after one fails [S56].
- Returning `str(exc)` for validation errors leaks internals [S62].
- Function platforms keep billing a stream after the client disconnects [S85]; request timeouts end long generations with a 504 [S81].

## What not to teach

| Topic | Why not |
|---|---|
| Fine-tuning walkthroughs, model training, transformer internals | Brief non-goals. Teach only the RAG versus fine-tuning decision [S23]. |
| GPU infrastructure, hands-on Kubernetes or a deployed public URL | Out of capstone scope (cost and access). Teach the serverless versus Kubernetes decision with official limits [S81, S84, S85, S86]. |
| Building a Graph RAG index | Indexing is expensive [S20]; no free path. Teach as a design option for global questions [S19]. |
| Multi-agent swarms | Evidence that gains are often minimal [S35]; single agent often enough [S33]. One supervisor or router diagram at most. |
| Building an MCP server for production | Spec changed in July 2026 [S38]; SDK support for the new revision unverified. Teach roles, primitives, transports and the threat model [S36, S37]. A tiny stdio server can be stretch only. |
| Tours of vector databases or agent frameworks | Brief non-goal. One store, one framework, with the constraint each fits. |
| LLM-based or semantic chunkers in the core path | Slow and costly to run [S2]; recursive splitting at a tuned size is a strong baseline [S1, S2]. Mention as an option. |
| OpenTelemetry GenAI attribute names | Status is Development [S80]. |
| Per-provider prices and free-tier numbers | Volatile [S92, S94]. Teach the mechanism (prefix caching, rate limits) and link to a dated note. |
| HyDE, IRCoT and Adaptive-RAG implementations in the core path | Interview talking points with one-paragraph explanations [S13, S15, S21]; implement only as stretch. |
| Data structures and algorithms puzzles, salary negotiation | Brief non-goals. |

## Source table

All rows checked 2026-10-22. Type key: P = paper; D = official documentation or specification; L = legal or regulatory record; R = registry or package metadata; V = local verification run; F = first-party engineering write-up; S = reputable secondary; I = internal course document. Confidence: High, Medium, Low.

| ID | Claim | Source | Type | Date checked | Confidence |
|---|---|---|---|---|---|
| S1 | Splitter categories; start with the recursive character splitter | https://docs.langchain.com/oss/python/integrations/splitters | D | 2026-10-22 | High |
| S2 | Chunking changes recall by up to 9 percent; 200 tokens, no overlap did well; 800/400 default did poorly | https://www.trychroma.com/research/evaluating-chunking (Smith and Troynikov, 2024-07-03) | F | 2026-10-22 | Medium |
| S3 | Cosine is the default similarity; dot on normalised embeddings equals cosine | https://www.sbert.net/docs/sentence_transformer/usage/semantic_textual_similarity.html | D | 2026-10-22 | High |
| S4 | all-MiniLM-L6-v2: 384 dims, truncates past 256 word pieces, Apache-2.0, 90.9 MB safetensors, ONNX quantised about 23 MB | https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2 and HF API | R | 2026-10-22 | High |
| S5 | HNSW: layered proximity graphs, logarithmic scaling | https://arxiv.org/abs/1603.09320 (Malkov and Yashunin) | P | 2026-10-22 | High |
| S6 | pgvector 0.8.7: HNSW and IVFFlat, operators, 2,000-dim index limit, approximate results differ, iterative scans, PostgreSQL licence | https://github.com/pgvector/pgvector | D | 2026-10-22 | High |
| S7 | pgvector Docker image about 161 MB compressed (0.8.7-pg17, amd64) | https://hub.docker.com/r/pgvector/pgvector (tags API) | R | 2026-10-22 | High |
| S8 | BM25 tf saturation, k1, b in 0 to 1 for length normalisation | Robertson and Zaragoza 2009, https://www.staff.city.ac.uk/~sbrp622/papers/foundations_bm25_review.pdf | P | 2026-10-22 | High |
| S9 | rank-bm25 0.2.2 (2022): BM25Okapi k1=1.5, b=0.75, no preprocessing, Apache-2.0 | https://pypi.org/project/rank-bm25/ ; https://github.com/dorianbrown/rank_bm25 ; local inspect | R, V | 2026-10-22 | High |
| S10 | RRF formula 1/(k + r), k = 60 fixed in pilot, near-optimal but not critical | Cormack, Clarke, Buettcher, SIGIR 2009, http://cormack.uwaterloo.ca/cormacksigir09-rrf.pdf | P | 2026-10-22 | High |
| S11 | Bi-encoder vs cross-encoder; retrieve top 100 then rerank; 65 hours vs 5 seconds example | https://www.sbert.net/examples/cross_encoder/applications/README.html | D | 2026-10-22 | High |
| S12 | ms-marco-MiniLM-L6-v2 cross-encoder about 91 MB, Apache-2.0 | https://huggingface.co/cross-encoder/ms-marco-MiniLM-L6-v2 (HF API) | R | 2026-10-22 | High |
| S13 | HyDE: hypothetical document embedding, no relevance labels | https://arxiv.org/abs/2212.10496 (Gao et al. 2022) | P | 2026-10-22 | High |
| S14 | Rewrite-Retrieve-Read query rewriting | https://arxiv.org/abs/2305.14283 (Ma et al. 2023) | P | 2026-10-22 | High |
| S15 | Multi-hop: one-step retrieval insufficient; IRCoT up to 21 points retrieval gain | https://arxiv.org/abs/2212.10509 (Trivedi et al. 2022) | P | 2026-10-22 | High |
| S16 | pypdf: no semantic layer, tables are positioned text, not OCR | https://pypdf.readthedocs.io/en/stable/user/extract-text.html | D | 2026-10-22 | High |
| S17 | unstructured: Apache-2.0, needs poppler, tesseract, libmagic, LibreOffice; vendor benchmark favours paid API | https://github.com/Unstructured-IO/unstructured | D | 2026-10-22 | Medium |
| S18 | Docling: MIT code; layout, reading order, tables, OCR; model licences separate | https://github.com/docling-project/docling | D | 2026-10-22 | High (code), Low (models) |
| S19 | Graph RAG: entity graph plus community summaries; better comprehensiveness and diversity on global questions | https://arxiv.org/abs/2404.16130 (Edge et al. 2024) | P | 2026-10-22 | High |
| S20 | Graph RAG indexing "can be an expensive operation"; start small | https://github.com/microsoft/graphrag | D | 2026-10-22 | High |
| S21 | Adaptive-RAG routes by predicted complexity | https://arxiv.org/abs/2403.14403 (Jeong et al. 2024) | P | 2026-10-22 | High |
| S22 | Lost in the Middle | https://arxiv.org/abs/2307.03172 (Liu et al. 2023) | P | 2026-10-22 | High |
| S23 | RAG outperforms unsupervised fine-tuning for knowledge injection | https://arxiv.org/abs/2312.05934 (Ovadia et al. 2023) | P | 2026-10-22 | High |
| S24 | Seven RAG failure points; validation only feasible in operation | https://arxiv.org/abs/2401.05856 (Barnett et al. 2024) | P | 2026-10-22 | High |
| S25 | JSON Schema current version is 2020-12 | https://json-schema.org/specification | D | 2026-10-22 | High |
| S26 | Structured outputs guarantee schema adherence, JSON mode does not; additionalProperties false; refusals | https://developers.openai.com/api/docs/guides/structured-outputs | D | 2026-10-22 | High |
| S27 | Local runner: OpenAI-compatible /v1 with tools; format accepts JSON Schema | https://docs.ollama.com/api/openai-compatibility ; https://docs.ollama.com/capabilities/structured-outputs | D | 2026-10-22 | High |
| S28 | ReAct interleaves reasoning and actions | https://arxiv.org/abs/2210.03629 (Yao et al. 2022) | P | 2026-10-22 | High |
| S29 | LangGraph graph API names, reducers, add_messages, MessagesState, compile, Command | https://docs.langchain.com/oss/python/langgraph/graph-api ; local run on 1.2.16 | D, V | 2026-10-22 | High |
| S30 | interrupt needs checkpointer and thread_id; node restarts on resume; idempotent side effects; no bare try/except; Command(resume) | https://docs.langchain.com/oss/python/langgraph/interrupts ; local run | D, V | 2026-10-22 | High |
| S31 | InMemorySaver lost on restart; SqliteSaver dev; PostgresSaver production | https://docs.langchain.com/oss/python/langgraph/persistence | D | 2026-10-22 | High |
| S32 | Short-term vs long-term memory; semantic, episodic, procedural | https://docs.langchain.com/oss/python/langgraph/memory | D | 2026-10-22 | High |
| S33 | Multi-agent patterns; single agent often enough | https://docs.langchain.com/oss/python/langchain/multi-agent | D | 2026-10-22 | High |
| S34 | Workflows vs agents; simplest solution; five workflow patterns | https://www.anthropic.com/engineering/building-effective-agents (2024-12-19) | F | 2026-10-22 | High |
| S35 | Multi-agent failure taxonomy, 14 modes, minimal benchmark gains | https://arxiv.org/abs/2503.13657 (Cemri et al. 2025) | P | 2026-10-22 | High |
| S36 | MCP 2026-07-28: hosts, clients, servers, JSON-RPC 2.0, resources, prompts, tools, elicitation; tool safety and consent | https://modelcontextprotocol.io/specification/latest | D | 2026-10-22 | High |
| S37 | MCP transports: stdio and Streamable HTTP | https://modelcontextprotocol.io/specification/2026-07-28/basic/transports | D | 2026-10-22 | High |
| S38 | MCP: no handshake; legacy is 2025-11-25 and earlier; HTTP+SSE deprecated | https://modelcontextprotocol.io/specification/2026-07-28/basic/versioning | D | 2026-10-22 | High |
| S39 | LLM01:2025 direct and indirect injection; no fool-proof prevention; seven mitigations | https://genai.owasp.org/llmrisk/llm01-prompt-injection/ | D | 2026-10-22 | High |
| S40 | OWASP Top 10 for LLM Applications 2026 published 2026-08-03 (ranking not confirmed) | https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ | D | 2026-10-22 | High (date), Low (ranking) |
| S41 | Indirect prompt injection blurs data and instructions | https://arxiv.org/abs/2302.12173 (Greshake et al. 2023) | P | 2026-10-22 | High |
| S42 | Guardrail packages, versions, licences | PyPI JSON API: nemoguardrails, guardrails-ai, llm-guard, presidio-analyzer | R | 2026-10-22 | High |
| S43 | P@k, R@k, Success@k, RR definitions | https://ir-measur.es/en/latest/measures.html | D | 2026-10-22 | High |
| S44 | MRR: reciprocal rank of first correct, 0 if none, mean over questions | Voorhees and Tice, LREC 2000, https://aclanthology.org/L00-1018.pdf | P | 2026-10-22 | High |
| S45 | RAGAS evaluates without ground-truth human annotations | https://arxiv.org/abs/2309.15217 (Es et al. 2023) | P | 2026-10-22 | High |
| S46 | Faithfulness = supported claims / total claims, 0 to 1 | https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/faithfulness/ | D | 2026-10-22 | High |
| S47 | Answer relevancy: 3 generated questions, cosine to input; legacy API removal in 1.0 | https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/answer_relevance/ | D | 2026-10-22 | High |
| S48 | LLM judge biases; over 80 percent agreement with humans | https://arxiv.org/abs/2306.05685 (Zheng et al. 2023) | P | 2026-10-22 | High |
| S49 | Eval design: task-specific, automate, volume; grading trade-offs; different judge model | https://platform.claude.com/docs/en/test-and-evaluate/develop-tests | F | 2026-10-22 | High |
| S50 | mlflow.genai.evaluate, scorers, @scorer; judges default to a paid hosted model | https://mlflow.org/docs/latest/genai/eval-monitor/quickstart/ | D | 2026-10-22 | High |
| S51 | Offline experiments in CI fail on threshold; online judges on live traces; user feedback | https://langfuse.com/docs/evaluation/overview | D | 2026-10-22 | High |
| S52 | SelfCheckGPT: sampling consistency, zero-resource, black-box | https://arxiv.org/abs/2303.08896 (Manakul et al. 2023) | P | 2026-10-22 | High |
| S53 | SelfCheckGPT variants; NLI recommended; MIT | https://github.com/potsawee/selfcheckgpt | D | 2026-10-22 | High |
| S54 | NLI and QG-QA strong for factual consistency | https://arxiv.org/abs/2204.04991 (Honovich et al. 2022) | P | 2026-10-22 | High |
| S55 | Best models lack complete citation support 50 percent of the time on ELI5 | https://arxiv.org/abs/2305.14627 (Gao et al. 2023) | P | 2026-10-22 | High |
| S56 | gather return_exceptions semantics; siblings not cancelled | https://docs.python.org/3/library/asyncio-task.html ; local run | D, V | 2026-10-22 | High |
| S57 | TaskGroup added 3.11, cancels on failure, ExceptionGroup; recommended over gather | asyncio-task docs ; https://docs.python.org/3/whatsnew/3.11.html ; local run | D, V | 2026-10-22 | High |
| S58 | asyncio.timeout added 3.11, recommended over wait_for; raises built-in TimeoutError | whatsnew 3.11 ; local run | D, V | 2026-10-22 | High |
| S59 | wait_for cancels on timeout and waits for cancellation | asyncio-task docs | D | 2026-10-22 | High |
| S60 | CancelledError is BaseException; re-raise; TaskGroup and timeout rely on it | asyncio-task docs ; local run | D, V | 2026-10-22 | High |
| S61 | Semaphore bounds concurrency (peak 2 of 10) | local run, Python 3.12.10 | V | 2026-10-22 | High |
| S62 | FastAPI 422 body shape with Pydantic 2.14; exception handlers; str(exc) leak warning | https://fastapi.tiangolo.com/tutorial/handling-errors/ ; local run on 0.159.1 | D, V | 2026-10-22 | High |
| S63 | response_model validates, filters, documents; priority over return type | https://fastapi.tiangolo.com/tutorial/response-model/ ; local run | D, V | 2026-10-22 | High |
| S64 | fastapi.sse EventSourceResponse added 0.135.0; 15-second ping | https://fastapi.tiangolo.com/tutorial/server-sent-events/ ; local run | D, V | 2026-10-22 | High |
| S65 | Starlette 1.9.0 test client warns httpx deprecated, suggests httpx2 | local run (warning text) | V | 2026-10-22 | Medium |
| S66 | Backoff, cap, jitter, idempotency, retry at one layer, 243x example | https://builder.aws.com/content/3EumjoZascWd1oZiEgL8ORlv3qE/timeouts-retries-and-backoff-with-jitter | F | 2026-10-22 | High |
| S67 | tenacity wait and stop helpers | tenacity 9.2.1, local inspect | V | 2026-10-22 | High |
| S68 | 429 Too Many Requests; may include Retry-After | https://www.rfc-editor.org/rfc/rfc6585#section-4 | D | 2026-10-22 | High |
| S69 | Retry-After is HTTP-date or delay-seconds | https://www.rfc-editor.org/rfc/rfc9110#field.retry-after | D | 2026-10-22 | High |
| S70 | A provider returns retry-after (seconds) only with 429 | https://console.groq.com/docs/rate-limits | D | 2026-10-22 | High |
| S71 | Prefix prompt caching; 5-minute default, 1-hour option; write and read multipliers | https://platform.claude.com/docs/en/build-with-claude/prompt-caching | D | 2026-10-22 | High |
| S72 | Automatic prompt caching; 1,024-token minimum on newer models; exact prefix; static first | https://developers.openai.com/api/docs/guides/prompt-caching | D | 2026-10-22 | High |
| S73 | Semantic cache false positives and false negatives | https://github.com/zilliztech/GPTCache | D | 2026-10-22 | Medium |
| S74 | MLflow runs, params, metrics, artifacts | https://mlflow.org/docs/latest/ml/tracking/ | D | 2026-10-22 | High |
| S75 | MLflow 3.7.0 default backend sqlite:///mlflow.db | https://mlflow.org/docs/latest/self-hosting/ | D | 2026-10-22 | High |
| S76 | MLflow tracing OpenTelemetry compatible; autolog | https://mlflow.org/docs/latest/genai/tracing/ | D | 2026-10-22 | High |
| S77 | Langfuse MIT except ee; Docker Compose self-host | https://github.com/langfuse/langfuse | D | 2026-10-22 | High |
| S78 | Phoenix Elastic License 2.0; built on OpenTelemetry | https://github.com/Arize-ai/phoenix | D | 2026-10-22 | High |
| S79 | LangSmith Developer plan: 1 seat, 5k base traces; self-host Enterprise only | https://www.langchain.com/pricing | D | 2026-10-22 | Medium (pricing page) |
| S80 | OTel GenAI conventions status Development; moved repo | https://github.com/open-telemetry/semantic-conventions-genai ; https://opentelemetry.io/docs/specs/semconv/gen-ai/ | D | 2026-10-22 | High |
| S81 | Cloud Run timeout 5 min default, 60 min max, 504 | https://docs.cloud.google.com/run/docs/configuring/request-timeout | D | 2026-10-22 | High |
| S82 | Min instances reduce cold starts; billed | https://docs.cloud.google.com/run/docs/configuring/min-instances | D | 2026-10-22 | High |
| S83 | Cloud Run GPUs: L4, RTX PRO 6000; scale to zero; about 5 s start; quota | https://docs.cloud.google.com/run/docs/configuring/services/gpu | D | 2026-10-22 | High |
| S84 | Lambda timeout default 3 s, max 900 s | https://docs.aws.amazon.com/lambda/latest/dg/configuration-timeout.html | D | 2026-10-22 | High |
| S85 | Lambda streaming: Node.js native, Python via custom runtime; 200 MB vs 6 MB; billed after disconnect | https://docs.aws.amazon.com/lambda/latest/dg/configuration-response-streaming.html | D | 2026-10-22 | High |
| S86 | AKS GPU node pools; managed recommended; GPU VMs cost more, region-limited | https://learn.microsoft.com/en-us/azure/aks/use-nvidia-gpu | D | 2026-10-22 | High |
| S87 | Local runner v0.40.8 asset sizes | https://api.github.com/repos/ollama/ollama/releases/latest | R | 2026-10-22 | High |
| S88 | llama3.2 1b 1.3 GB, 3b 2.0 GB, 128K context | https://ollama.com/library/llama3.2/tags | R | 2026-10-22 | High |
| S89 | qwen3 0.6b 523 MB, 1.7b 1.4 GB, 4b 2.5 GB, 8b 5.2 GB; tools | https://ollama.com/library/qwen3/tags | R | 2026-10-22 | High |
| S90 | nomic-embed-text 274 MB | https://ollama.com/library/nomic-embed-text | R | 2026-10-22 | High |
| S91 | torch 2.14.1 wheel sizes; Linux CUDA dependencies; CPU wheel 196 MB | https://pypi.org/pypi/torch/json ; https://download.pytorch.org/whl/cpu/torch/ | R | 2026-10-22 | High |
| S92 | A provider's free tier exists; free traffic used to improve products (page updated 2026-10-19) | https://ai.google.dev/gemini-api/docs/pricing | D | 2026-10-22 | High, verify before publish |
| S93 | Same provider lists Palestine as available (page updated 2026-04-28) | https://ai.google.dev/gemini-api/docs/available-regions | D | 2026-10-22 | High, verify before publish |
| S94 | Second provider's free-plan limits | https://console.groq.com/docs/rate-limits | D | 2026-10-22 | Low (UNVERIFIED) |
| S95 | STAR with 20/10/60/10 split, personal actions, quantified results | https://careers.uw.edu/resources/star-method-of-interviewing/ | S | 2026-10-22 | High |
| S96 | STAR structure for behavioural answers | https://www.techinterviewhandbook.org/behavioral-interview/ | S | 2026-10-22 | Medium |
| S97 | Four-step system design approach; CC BY 4.0 | https://github.com/donnemartin/system-design-primer | S | 2026-10-22 | Medium |
| S98 | Chatbot policy ruling, 812.02 CAD, company responsible for chatbot | https://decisions.civilresolutionbc.ca/crt/crtd/en/item/525448/index.do (2024 BCCRT 149) | L | 2026-10-22 | High |
| S99 | CVE-2025-32711 published 2025-06-11; CVSS 9.3 (CNA), 7.5 (NVD) | https://nvd.nist.gov/vuln/detail/CVE-2025-32711 (NVD API) | L | 2026-10-22 | High |
| S100 | Zero-click injection chain via crafted email and image fetch | https://arxiv.org/abs/2509.10540 (Reddy and Gujral 2025) | P | 2026-10-22 | High |
| S101 | Fabricated citations sanctioned; 5,000 dollar penalty; gatekeeping role | https://storage.courtlistener.com/recap/gov.uscourts.nysd.575368/gov.uscourts.nysd.575368.54.0.pdf | L | 2026-10-22 | High |
| S102 | Free agents course: units, frameworks, 3 to 4 h a week; no deployment or interviews mentioned | https://huggingface.co/learn/agents-course/unit0/introduction | S | 2026-10-22 | Medium |
| S103 | Course catalogue titles on RAG, agents, MCP; no interview course visible | https://www.deeplearning.ai/courses/ | S | 2026-10-22 | Medium |
| S104 | LangGraph introductory course modules | https://academy.langchain.com/courses/intro-to-langgraph (search results only) | S | 2026-10-22 | Low (UNVERIFIED) |
| S105 | Package versions, release dates, licences, Python requirements (versions table); onnxruntime wheel sizes | https://pypi.org/pypi/<package>/json | R | 2026-10-22 | High |
| S106 | "AI Engineering" book, 2025, covers RAG, agents, finetuning, efficiency | https://github.com/chiphuyen/aie-book | S | 2026-10-22 | Medium |
| S107 | JavaScript-only CodeExercise; registered canvases only; GlossaryTerm vs BigWordAlert | `agent-ip/04-interactive-playbook.md` | I | 2026-10-22 | High |
| S108 | Short-course budget 30 to 60 hours; activity shares | `agent-ip/02-course-architecture.md` | I | 2026-10-22 | High |

## Unverified claims (do not use as fact in learner-facing text)

1. OWASP 2026 numbering (whether prompt injection is still LLM01) [S40].
2. Free-plan rate limits of the second hosted provider [S94].
3. Whether the Python `mcp` SDK 2.3.0 implements MCP revision 2026-07-28.
4. LangGraph `graph.stream_events(..., version="v3")` resume form (docs show it; not run locally).
5. Docling model licences [S18].
6. Any Graph RAG indexing cost figure [S20].
7. Docker Desktop download size.
8. RAM needed to run 1B to 4B local models.
9. Whether sentence-transformers 6.2.0 runs its ONNX backend without PyTorch.
10. Cold-start durations on CPU serverless platforms.
11. EKS GPU specifics.
12. "Drift" as a sourced claim; teach as a monitoring rationale.
13. A public framework for the project deep-dive round.
14. LangChain Academy syllabus [S104] and free status of DeepLearning.AI short courses [S103].
15. MLflow licence beyond the PyPI metadata field.

## Open questions

1. **Default free model path.** Local runner (1.66 GB Windows installer plus a 0.5 to 2 GB model) or a free hosted tier (free traffic used to improve products; limits volatile)? A short device and data survey of fellows would settle it. Needs the sponsor and a mentor.
2. **Vector store.** pgvector in Docker (161 MB image plus Docker) matches interview expectations; an in-process store avoids Docker. Which is the core path and which the stretch?
3. **Golden set.** How many questions, who labels relevance, and can mentors review a set in the 45-minute rubric budget? Expert input needed on a defensible minimum size.
4. **Judges in CI.** Should CI run only code-based retrieval metrics (no key), with judge-based faithfulness run locally against the local model and reported with its bias caveats [S48]?
5. **MCP revision.** Teach the 2026-07-28 model only, or both eras, given SDK support is unverified?
6. **Interview loop.** Does the three-round loop match what remote-first employers run for these roles in 2026? A hiring manager or recent hire should confirm the round content and typical probes.
7. **Python version.** Recommend 3.12 (all checked packages support it) and state that unstructured does not yet support 3.14 [S105]?
8. **JavaScript exercises.** Which metric and fusion functions become `CodeExercise` blocks, and does the interaction designer accept the "why JavaScript" note?
9. **Recordings.** Where do mock-interview recordings live, and who can view them, given privacy rules in the brief?
