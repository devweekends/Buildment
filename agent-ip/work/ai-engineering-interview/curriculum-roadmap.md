---
artifact: curriculum-roadmap
course: ai-engineering-interview
version: 1
status: draft
owner: curriculum-architect
instructors_reviewed: []
g2b_signoff: pending
drafted_before_roadmap: true
---

# Curriculum roadmap: Cracking the AI Engineering and Agentic AI Interview

## In one paragraph
Fellows prepare for AI engineer, LLM engineer and agentic AI interviews at remote-first companies. The course follows the three rounds those interviews usually have: a deep dive on your own RAG or agent project, a hands-on coding and system design round, and a managerial round about past projects, deployment and evaluation in production. Fellows learn the material each round probes, from LLM foundations up to senior depth: RAG and advanced retrieval, evaluation with real metrics, agents and LangGraph, MCP and guardrails, async Python services, and production operations. Every technical module ends with interview practice, and module 11 runs full mock rounds with answer frameworks, model answers and follow-up probes. In the capstone each fellow builds a small evaluated RAG plus agent service that runs on a laptop with no paid API key, writes an evaluation report, and defends it in a recorded mock interview. G2B instructor sign-off is **pending**: the chapters were drafted before sign-off on the sponsor's instruction (see `decision-log.md`), so instructors are confirming a drafted shape, and any change they ask for will be made in the chapters.

## Learner and entry prerequisites
- Learner: Gaza fellowship fellows aiming at remote AI engineering roles. Many are early career (final-year students, junior developers, self-taught builders); some already ship LLM features. English is a second language. Most read on a phone with unreliable power and internet; build work needs a laptop.
- Prior knowledge: Python basics (functions, classes, virtual environments, pip), HTTP and JSON APIs, Git and the command line, and one small project they built. No machine learning or LLM experience is assumed; module 2 builds the foundations.
- Time available: about 10 to 12 hours a week for 5 weeks, in sessions of 1.5 to 3 hours.
- Entry diagnostic: the open question in 1.1 (a project you could talk about in an interview) and the first project story at the 1.5 gate act as a baseline that the capstone defence is compared against.
- Equipment: a laptop or desktop with Python 3.11 or later for chapters 1.4, 3.5, 5.5, 7.6, 9.6 and module 12. Everything else works on a phone. No paid API key is needed at any point; the build chapters use a deterministic fake model so tests run offline.

## Outcomes
| # | Outcome (observable verb) | Evidence |
|---|---|---|
| O1 | Tell a two-minute project story with a problem, a design, numbers, a trade-off and what they would change | 1.5 gate story; 11.2 deep-dive practice; capstone defence (12.4); 12.5 comparison with the 1.5 story |
| O2 | Explain and defend a RAG pipeline (chunking, embeddings, vector store, hybrid search, reranking, query rewriting) with numbers for quality, latency and cost | Quizzes 3.6 and 4.6; 3.7 chunking defence; 4.7 retrieval upgrade plan; capstone design note |
| O3 | Measure retrieval (recall@k, precision@k, MRR) and generation (faithfulness, grounding) on a golden set, and run it as a regression test | Build 5.5 passes its tests; quiz 5.6; 5.7 gate answer; capstone evaluation report (12.3) |
| O4 | Design an agent with tool calling, typed state, reducers, memory, a human approval step and layered prompt-injection defences, and say when not to use an agent | Quizzes 6.5, 7.7 and 8.5; build 7.6; gates 6.6, 7.8 and 8.6 (agent design, state design, threat model) |
| O5 | Build a small async FastAPI service with Pydantic validation, structured errors, a concurrency limit, retries with backoff and timeouts, and verify it with tests | Build 9.6 passes its tests; quiz 9.7; 9.8 failure story |
| O6 | Describe how they would track experiments, trace requests, deploy (serverless or Kubernetes) and monitor quality after launch, with reasons | Quiz 10.6; 10.7 deployment and monitoring plan |
| O7 | Answer each interview round with a framework, numbers and honest trade-offs | Quiz 11.6; 11.7 written system design and recorded mock answer; capstone defence (12.4) |

## Course shape
| Week | Focus | Modules | Hours | Evidence at the end |
|---|---|---|---|---|
| 1 | The interview loop; LLM foundations; RAG fundamentals | 1, 2, 3 | 9.9 | Workspace set up; first project story; minimal RAG pipeline passes tests |
| 2 | Advanced retrieval; evaluation | 4, 5 | 8.3 | Retrieval upgrade plan; regression eval runs as a test |
| 3 | Agents; LangGraph; MCP and guardrails | 6, 7, 8 | 10.3 | Approval graph passes tests; agent threat model |
| 4 | Python services; production; mock interviews | 9, 10, 11 | 12.3 | Async service passes tests; deployment plan; recorded mock answer |
| 5 | Capstone | 12 | 11.4 | Repository, evaluation report and recorded defence submitted |
| Follow-up | Mentor questions on the defence | none | outside course time | Learner answers the mentor's follow-up probes |

Total from chapter estimates: 3,135 minutes, about 52 hours (matches `estimatedHours: 52` in course.yaml). See open decision 6 on time realism.

## Module and chapter sequence
Types: Read (orientation), Learn (concept), Build (laptop work with tests), Check (graded quiz), Gate (checklist, learning log and evidence).

### Module 1: The AI engineering interview loop
Purpose: see the three rounds, learn the project story shape, and set up the workspace every build chapter extends.
Hours: 2.6 (155 min)
| # | Chapter | One-line outcome | Type | Minutes |
|---|---|---|---|---|
| 1.1 | Set the scene | Describe a project they could defend and see what the course practises | Read | 15 |
| 1.2 | The three rounds and what each one tests | Name what each round looks for and how it is scored | Learn | 35 |
| 1.3 | Tell a project story with numbers | Structure a two-minute story: problem, design, numbers, trade-off, change | Learn | 35 |
| 1.4 | Set up your workspace | Create the project, virtual environment and first passing test | Build | 40 |
| 1.5 | Checklist and learning log | Write a first project story as a baseline | Gate | 30 |

### Module 2: LLM foundations for application engineers
Purpose: the model knowledge an application engineer is expected to have, without ML theory.
Hours: 2.7 (160 min)
| # | Chapter | One-line outcome | Type | Minutes |
|---|---|---|---|---|
| 2.1 | Set the scene | See a cost and quality problem in a support assistant | Read | 10 |
| 2.2 | Tokens, context windows and cost | Estimate tokens, cost and latency for a request | Learn | 35 |
| 2.3 | Embeddings and similarity | Explain embeddings, cosine similarity and their failure modes | Learn | 35 |
| 2.4 | Prompts, sampling and structured outputs | Validate model output against a schema; choose a temperature | Learn | 35 |
| 2.5 | LLM foundations (quiz) | Graded scenarios | Check | 15 |
| 2.6 | Checklist and learning log | Written interview answer on cost and context | Gate | 30 |

### Module 3: RAG fundamentals
Purpose: build the basic RAG pipeline and understand each step's failure modes.
Hours: 4.7 (280 min)
| # | Chapter | One-line outcome | Type | Minutes |
|---|---|---|---|---|
| 3.1 | Set the scene | See why a model alone cannot answer from private documents | Read | 10 |
| 3.2 | The RAG pipeline end to end | Draw the indexing and query paths and their failure points | Learn | 35 |
| 3.3 | Chunking strategies | Choose and defend chunk size, overlap and splitting rule | Learn | 35 |
| 3.4 | Vector stores and indexes | Compare exact and approximate search, filters and storage options | Learn | 35 |
| 3.5 | Build a minimal RAG pipeline | Build and test chunker, embedder, store and cited answer | Build | 120 |
| 3.6 | RAG fundamentals (quiz) | Graded scenarios | Check | 15 |
| 3.7 | Checklist and learning log | Tests pass; written chunking defence | Gate | 30 |

### Module 4: Advanced retrieval
Purpose: fix the failures basic vector search cannot fix, and know when fine-tuning is the right tool.
Hours: 3.4 (205 min)
| # | Chapter | One-line outcome | Type | Minutes |
|---|---|---|---|---|
| 4.1 | Set the scene | See failures basic vector search cannot fix | Read | 10 |
| 4.2 | Hybrid search and reranking | Fuse keyword and vector results, rerank, and cost each step (canvas) | Learn | 40 |
| 4.3 | Query rewriting, multi-hop and cross-document retrieval | Rewrite and split questions so evidence across documents is found | Learn | 35 |
| 4.4 | Tables, PDFs and Graph RAG | Choose table and PDF indexing; know when a graph helps | Learn | 35 |
| 4.5 | Adaptive retrieval, and RAG versus fine-tuning | Route by query complexity; choose RAG, fine-tuning or both | Learn | 35 |
| 4.6 | Advanced retrieval (quiz) | Graded scenarios | Check | 20 |
| 4.7 | Checklist and learning log | Written retrieval upgrade plan with costs | Gate | 30 |

### Module 5: Evaluating RAG and LLM systems
Purpose: replace "it looks good" with numbers, and make quality a test that can fail.
Hours: 4.9 (295 min)
| # | Chapter | One-line outcome | Type | Minutes |
|---|---|---|---|---|
| 5.1 | Set the scene | See why an interviewer asks "how do you know it works?" | Read | 10 |
| 5.2 | Retrieval metrics: recall@k, precision@k and MRR | Compute the metrics by hand and see them move with k (canvas) | Learn | 40 |
| 5.3 | Faithfulness, grounding and hallucination | Check that an answer is supported by its sources | Learn | 35 |
| 5.4 | LLM-as-judge and its pitfalls | Design a judge with a rubric; name its biases | Learn | 35 |
| 5.5 | Build a golden set and a regression eval | Metric functions and a test run that fails when quality drops | Build | 120 |
| 5.6 | Evaluation (quiz) | Graded scenarios | Check | 20 |
| 5.7 | Checklist and learning log | Eval runs as a test; written answer on measuring quality | Gate | 35 |

### Module 6: Agents and tool calling
Purpose: understand tool calls and the ReAct loop, and when a fixed workflow is better.
Hours: 2.6 (155 min)
| # | Chapter | One-line outcome | Type | Minutes |
|---|---|---|---|---|
| 6.1 | Set the scene | See a support assistant that must look something up before it answers | Read | 10 |
| 6.2 | Tool calling and structured outputs | Define a tool schema, validate arguments, handle failed calls | Learn | 35 |
| 6.3 | The ReAct loop | Trace reason, act, observe; set stop rules (canvas) | Learn | 40 |
| 6.4 | Workflows or agents: when not to use an agent | Choose a workflow, router or agent with reasons | Learn | 35 |
| 6.5 | Agents and tool calling (quiz) | Graded scenarios | Check | 15 |
| 6.6 | Checklist and learning log | Written agent design with tools and stop rules | Gate | 20 |

### Module 7: Stateful agents with LangGraph
Purpose: state, reducers, memory, checkpoints, approvals and multi-agent designs.
Hours: 5.3 (320 min)
| # | Chapter | One-line outcome | Type | Minutes |
|---|---|---|---|---|
| 7.1 | Set the scene | See why a plain loop is hard to test, resume and approve | Read | 10 |
| 7.2 | State, nodes, edges and reducers | Explain how updates merge, pick reducers (canvas) | Learn | 40 |
| 7.3 | Memory and checkpoints | Separate thread memory from long-term memory; resume a run | Learn | 35 |
| 7.4 | Human-in-the-loop approvals | Pause before a risky call and resume with the decision | Learn | 35 |
| 7.5 | Multi-agent orchestration | Compare supervisor, handoff and single-agent designs | Learn | 35 |
| 7.6 | Build an agent with an approval step | Build and test a LangGraph agent that pauses for approval | Build | 120 |
| 7.7 | Stateful agents (quiz) | Graded scenarios | Check | 20 |
| 7.8 | Checklist and learning log | Tests pass; written state design | Gate | 25 |

### Module 8: MCP, prompt injection and guardrails
Purpose: connect tools safely and defend an agent in layers.
Hours: 2.4 (145 min)
| # | Chapter | One-line outcome | Type | Minutes |
|---|---|---|---|---|
| 8.1 | Set the scene | See an agent read a document with hidden instructions | Read | 10 |
| 8.2 | MCP: tools over a protocol | Explain what MCP standardises and what it does not solve | Learn | 35 |
| 8.3 | Prompt injection | Tell direct from indirect injection; trace it to a tool call | Learn | 35 |
| 8.4 | Guardrails in layers | Design input, tool, output and permission guardrails | Learn | 35 |
| 8.5 | MCP and guardrails (quiz) | Graded scenarios | Check | 15 |
| 8.6 | Checklist and learning log | Written threat model for the capstone agent | Gate | 15 |

### Module 9: Python service engineering
Purpose: the async and service code the hands-on round tests.
Hours: 5.3 (320 min)
| # | Chapter | One-line outcome | Type | Minutes |
|---|---|---|---|---|
| 9.1 | Set the scene | See a slow provider take down an unprepared service | Read | 10 |
| 9.2 | Async Python: gather, semaphores and cancellation | Run calls concurrently with a limit; cancel unneeded work | Learn | 40 |
| 9.3 | A FastAPI service with Pydantic validation | Validate requests and responses; return structured errors | Learn | 35 |
| 9.4 | Retries, timeouts and rate limits | Retry safe failures with backoff and jitter in a time budget | Learn | 35 |
| 9.5 | Streaming, caching, cost and latency budgets | Decide what to stream and cache; set budgets | Learn | 35 |
| 9.6 | Build the async service | Build and test the endpoint with limits, retries and a timeout | Build | 120 |
| 9.7 | Python service engineering (quiz) | Graded scenarios | Check | 20 |
| 9.8 | Checklist and learning log | Tests pass; written failure story | Gate | 25 |

### Module 10: Production: tracking, tracing, deployment and monitoring
Purpose: what the managerial round asks about life after launch.
Hours: 3.2 (190 min)
| # | Chapter | One-line outcome | Type | Minutes |
|---|---|---|---|---|
| 10.1 | Set the scene | See a quality drop nobody noticed for two weeks | Read | 10 |
| 10.2 | Experiment tracking with MLflow | Log parameters, metrics and artifacts so results reproduce | Learn | 35 |
| 10.3 | Tracing and observability | Trace one request; decide what to log and keep private | Learn | 35 |
| 10.4 | Deployment: serverless or Kubernetes | Choose a deployment target for an LLM service with reasons | Learn | 35 |
| 10.5 | Monitoring evals in production and incident stories | Monitor quality, cost and latency; tell an incident story | Learn | 35 |
| 10.6 | Production (quiz) | Graded scenarios | Check | 15 |
| 10.7 | Checklist and learning log | Written deployment and monitoring plan | Gate | 25 |

### Module 11: Mock interviews: every round
Purpose: frameworks, question banks with model answers and follow-up probes, and timed practice.
Hours: 3.8 (225 min)
| # | Chapter | One-line outcome | Type | Minutes |
|---|---|---|---|---|
| 11.1 | Set the scene | Learn how to practise with the banks, alone or with a partner | Read | 10 |
| 11.2 | Round one: the project deep dive | Answer deep-dive questions with numbers and honest limits | Learn | 40 |
| 11.3 | Round two: hands-on coding | Clarify, think aloud, test and handle edge cases | Learn | 40 |
| 11.4 | Round two: AI system design | Run a seven-step design answer in 40 minutes | Learn | 45 |
| 11.5 | Round three: the managerial round | Answer questions on projects, deployment and evaluation in production | Learn | 40 |
| 11.6 | Interview craft (quiz) | Graded scenarios on choosing the stronger answer | Check | 15 |
| 11.7 | Checklist and learning log | Written system design and a recorded mock answer | Gate | 35 |

### Module 12: Capstone: build, evaluate and defend
Purpose: build, measure and defend one small system end to end.
Hours: 11.4 (685 min)
| # | Chapter | One-line outcome | Type | Minutes |
|---|---|---|---|---|
| 12.1 | Set the scene | Choose a scenario; read the brief, must-haves and rubric | Read | 25 |
| 12.2 | Build the service | Combine retrieval, agent, approval and service in one tested repository | Build | 360 |
| 12.3 | Evaluate and write the report | Run the eval, fix one failure, write the report and design note | Build | 160 |
| 12.4 | Record your mock-interview defence | Record the walkthrough and probe answers; submit the repository | Build | 110 |
| 12.5 | Checklist and learning log | Final checks; compare with the first story from module 1 | Gate | 30 |

Count: 12 modules, 79 chapters (12 Read, 36 Learn, 8 Build, 11 Check, 12 Gate). Interactive canvases: 4 (4.2, 5.2, 6.3, 7.2).

## Interactive canvases
Four canvases, each one teaching one claim, built on the existing renderers and registered as new slugs (code change in the same PR, `10-interactive-canvases.md`):

| Slug | Chapter | Renderer | Claim |
|---|---|---|---|
| `rag-hybrid-rerank` | 4.2 | sequence | Keyword and vector search find different chunks; fusion merges them, and a reranker reorders only the short list, which is why reranking is affordable. |
| `retrieval-metrics-at-k` | 5.2 | custom (slider) | Raising k raises recall but usually lowers precision; MRR only cares where the first relevant chunk is. |
| `agent-react-loop` | 6.3 | state machine | An agent loop needs a stop rule: it ends on an answer, a step limit or an approval wait, never on hope. |
| `langgraph-reducer-merge` | 7.2 | sequence | A key without a reducer is overwritten by the last update, and two parallel writes to it are an error; a key with an append reducer keeps both. |

## Gate evidence at a glance
| Module | Gate evidence |
|---|---|
| 1 | Checklist, learning log, and a first written project story (150 words) as a baseline. Mentor reads it. |
| 2 | Checklist, learning log, and a written answer to an interview question on context size and cost (120 words). |
| 3 | Checklist (tests from 3.5 pass), learning log, and a written chunking defence for their capstone documents (120 words). |
| 4 | Checklist, learning log, and a retrieval upgrade plan with expected quality, latency and cost (150 words). |
| 5 | Checklist (eval from 5.5 runs as a test), learning log, and an answer to "how do you know your RAG system works?" (150 words). |
| 6 | Checklist, learning log, and an agent design: tools, schemas, stop rules and when it should not act (150 words). |
| 7 | Checklist (approval graph tests pass), learning log, and a state design with reducers and the approval point (120 words). |
| 8 | Checklist, learning log, and a threat model for the capstone agent with one defence per layer (150 words). |
| 9 | Checklist (service tests pass), learning log, and a failure story: what happens when the provider is slow, and how the service behaves (120 words). |
| 10 | Checklist, learning log, and a deployment and monitoring plan for the capstone (150 words). |
| 11 | Checklist, learning log, a written AI system design (250 words) and a recorded mock answer link (optional written alternative). |
| 12 | Checklist and final learning log. The repository, report and defence are submitted in 12.3 and 12.4. |

## Capstone
- Scenarios (pick one, all fictional composites): a document assistant for an NGO's or microfinance lender's policy documents; a customer support agent for a small online shop that can look up orders and request refunds; an internal knowledge bot for a remote software team's runbooks and decisions.
- What the learner submits: a repository link with a small RAG plus agent service (retrieval with citations, one tool call that needs human approval, a FastAPI endpoint with validation, retries and a timeout), a golden set of at least 20 questions, an evaluation report with recall@k, precision@k, MRR and a faithfulness check, a regression eval that runs as a test, structured logs or traces, a README and a one-page design note; then a recorded five-minute walkthrough and answers to three follow-up probes.
- Must run with no paid API key: tests and the eval use a deterministic fake model; a real or local model is optional behind an adapter.
- How a mentor reviews it: the rubric in 12.1 (design, evaluation, engineering, safety, communication), in under 45 minutes. The mentor then sends one to three follow-up probes; the learner answers by resubmitting.
- Out of scope for the capstone: a public deployed URL, authentication, object storage, training or fine-tuning a model, GPU work. Deployment and auth are taught and designed (module 10, gate 10.7) but not required to run.

## Variants
None (sponsor decision, 2026-10-22). Suggested follow-on specialisation tracks, roadmap only: RAG-heavy (document intelligence), agent-heavy (workflow automation with approvals), MLOps-heavy (evaluation and monitoring platforms).

## Out of scope
- Training models, fine-tuning walkthroughs beyond the RAG versus fine-tuning decision, GPU infrastructure, transformer internals beyond what an application engineer is asked.
- Data structures and algorithms interview practice. The hands-on round here is practical service and async coding.
- A tour of every framework or vendor. One graph library (LangGraph), one tracking tool (MLflow) and open standards (MCP, OpenTelemetry) are taught; ideas transfer.
- Salary negotiation and job search tactics beyond the managerial round.
- Real company names, real interview reports and marketing links. Scenarios are fictional composites.

## Open decisions for instructors
| # | Decision | Recommendation | Instructor decision |
|---|---|---|---|
| 1 | The 79 chapters were drafted before this roadmap was signed (sponsor instruction). Review chapters now or after sign-off? | Sign the roadmap first (sequence, outcomes, hours, capstone), then review chapters against it. Keep the course unpublished until both are done. | |
| 2 | No reference capstone build exists yet; build chapters were verified against a scratch reference implementation by the drafter, not by an instructor. | One instructor runs chapters 1.4, 3.5, 5.5, 7.6 and 9.6 on a clean laptop before launch and records times. | |
| 3 | The capstone defence asks for a recording. Some fellows cannot record safely or upload on weak data. | Accept audio only. Allow a written defence plus a live 15 minute call as the alternative, decided by the mentor. | |
| 4 | Version drift: LangGraph, MCP and provider free tiers change quickly. Chapters date version-specific claims (LangGraph 1.2, checked 2026-10-22). | Re-check build chapters each cohort; pin versions in the capstone's requirements. | |
| 5 | Tool naming: the course names open-source tools from the spec (LangGraph, MLflow, FastAPI, Pydantic, Kubernetes, MCP) but no companies, cloud vendors or model products. | Keep this rule; it keeps the course general and avoids implying any employer's process. | |
| 6 | Time realism: 52 hours from chapter estimates. Build chapters for second-language learners with power cuts may take twice as long. | Tell fellows to plan 60 to 70 hours over 5 to 6 weeks; adjust after the first cohort. | |
| 7 | Mentor load: 11 gate answers plus the capstone, about 3 hours of review per fellow. | Fully review gates 1.5, 5.7, 11.7 and the capstone; spot-check the rest. | |
| 8 | Prerequisite gap: some fellows will not have Python basics or a laptop. | Add a short Python readiness check in 1.4 and point to a pairing plan for fellows without a laptop. | |
| 9 | Order with sibling courses: the managerial round overlaps Communication and Ownership. | Cross-reference rather than cut; this course keeps the AI-specific managerial questions. | |

## Confirmation
G2B status: **pending**.
| Instructor | Role | Decision (approve/revise/reject) | Comments | Date |
|---|---|---|---|---|
| | | | | |
| | | | | |
