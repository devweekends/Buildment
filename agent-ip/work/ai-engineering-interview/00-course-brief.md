---
artifact: course-brief
course: ai-engineering-interview
working_title: Cracking the AI Engineering and Agentic AI Interview
version: 1
status: draft
owner: Zeeshan (architect, human sponsor)
target_publish: after G2B instructor sign-off and G7 delivery lead approval
---

# Course brief: ai-engineering-interview

Source of intake: the fellowship pipeline file (`buildment-course-pipeline.md`, section 8, kept by the architect outside this repository) and the sponsor's request of 2026-10-22. Course 8 of the fellowship pipeline, tech track.

## One sentence

Fellows prepare for AI engineer, LLM engineer and agentic AI interviews at remote-first companies by learning RAG, agents, evaluation, Python service engineering and production operations from foundations to senior depth, then design, build and defend a small evaluated RAG plus agent service in a recorded mock interview.

## Learner

- Who: Gaza fellowship fellows aiming at remote AI engineering roles. Many are early career (final-year students, junior developers, self-taught builders); some already ship LLM features.
- Prior knowledge: Python basics (functions, classes, pip or uv, virtual environments), HTTP and JSON APIs, Git, the command line, and at least one small project. No prior ML training or LLM work assumed; module 2 builds the LLM foundations.
- Language: Arabic first language, English as a second language. Plain English, short sentences, every term defined on first use (Big Word Alert or GlossaryTerm).
- Device and connection: many learn on phones on weak or expensive mobile data, around power cuts. Reading, quizzes and canvases must work on a phone. Build work needs a laptop for some sessions; state every download size.
- Time available: about 10 to 12 hours a week alongside study or work; plan for 4 to 5 weeks.
- Motivation: a remote AI engineering job or contract.
- What they will do with the result: a portfolio repository with an evaluation report, a design document, and practised interview answers with numbers.

## Outcome

By the end, the learner can:

1. Explain and defend the design of a RAG pipeline (chunking, embeddings, vector store, hybrid search, reranking, query rewriting) with numbers for quality, latency and cost.
2. Design an agent with tool calling, structured outputs, state, memory, human approval and prompt-injection defences, and explain when not to use an agent.
3. Measure retrieval (recall@k, precision@k, MRR) and generation (faithfulness, grounding) on a golden dataset, and run the evaluation as a regression test in CI.
4. Build a small async Python service (FastAPI, Pydantic validation, retries with backoff, timeouts, structured errors) locally and verify it.
5. Describe how they would deploy, trace, monitor and run incidents for an LLM system, and choose between serverless and Kubernetes with reasons.
6. Answer each round of the interview loop (project deep dive, hands-on plus system design, managerial) with a framework, numbers and honest trade-offs.

## Demo

A five-minute walkthrough of the learner's capstone service: the question it answers, the architecture, the evaluation report with retrieval and generation metrics, one failure they found and fixed, and what they would change. Then a recorded mock interview defence answering follow-up probes.

## Product scope

- Must have: a small RAG plus agent service on one of three scenarios (an NGO or financial document assistant, a customer support agent, an internal knowledge bot); retrieval and generation evaluation on a golden set; one tool call that needs human approval; tests; a regression eval runnable in CI; structured logs or traces; a README and a short design note.
- Should have: hybrid search plus reranking; adaptive retrieval; a cost and latency budget; container build.
- Out of scope: a deployed public URL is optional, not required (cost and access); training or fine-tuning a model; GPU work.

## Production bar

This is an interview-preparation course, not a flagship product build, so the production bar in `00-principles.md` is applied at capstone scale: validated input and structured errors, an async concern (bounded concurrency to the model provider), retries and timeouts, tests at unit and evaluation level, a CI regression eval, structured logs or traces, a README and runbook notes, seed data (the golden set and the document corpus). Authentication, object storage and deployment are taught and designed but not required in the capstone; the roadmap must say so and record it as an open decision.

## Variants

Not needed for this course (sponsor decision, 2026-10-22). The roadmap may suggest specialisation tracks (RAG-heavy, agent-heavy, MLOps-heavy) as follow-on directions only. No variant chapters.

## Constraints

- Stack: Python 3.11 or later, FastAPI, Pydantic v2, pytest, an OpenAI-compatible or provider SDK behind an adapter, a deterministic fake model for tests. LangGraph for the agent chapters. MLflow named for experiment tracking. Any provider-specific detail must be checked against current documentation and dated.
- Budget: many fellows cannot pay for API credits. The capstone must run on a free tier, a local model, or a small budget, and its tests must run with no API key. State model and download sizes.
- Platform limits: the buildment code runner executes JavaScript only (`server/src/shared/blocks/code`). Python cannot run in the browser. Python work is taught as build-it-locally Steps with exact commands, expected output, a verification checklist and an open question for a repository link. Never fake a runnable Python exercise. Small JavaScript code exercises are allowed only where the skill is language-neutral (for example metric functions) and must say why they are JavaScript.
- Canvases: only registered slugs render. New canvases are code changes using the shared renderers (sequence, state machine, factor) or a reviewed custom component (`10-interactive-canvases.md`).
- Legal or privacy: no real company names anywhere (the source interview report is used only as one example of the loop shape and is not cited or linked). No marketing links. Scenario organisations are labelled as fictional composites. No personal or client data in examples; recordings are optional links and fellows are told not to show their surroundings.

## Non-goals

- Training models from scratch, fine-tuning walkthroughs beyond the RAG versus fine-tune decision, GPU infrastructure, ML theory (backpropagation, transformer internals beyond what an interviewer asks an application engineer).
- Vendor certification prep or a tour of every framework.
- Data structures and algorithms interview prep (LeetCode style); the hands-on round here is practical service and async coding.
- Salary negotiation and job search tactics beyond the managerial round.

## Success signals

- Fellows submit a capstone repository with a reproducible evaluation report and a recorded defence.
- Mentors can review the capstone in under 45 minutes with the rubric.
- Fellows can state recall@k, precision@k and MRR for their own system without notes and explain one trade-off with a number.
- Mock interview answers improve between the module 9 practice and the capstone defence.
