---
artifact: course-brief
course: system-design
working_title: "System Design, Hands On: Build It, Break It, Explain It"
version: 1
status: draft
owner: Zeeshan (architect, human sponsor)
target_publish: after G2B instructor sign-off and G7 delivery lead approval
---

# Course brief: system-design

Source of intake: the sponsor's requests of 2026-10-22 and 2026-10-23 (topic list, interactive-first direction, the time and clocks questions, the GitHub challenges repo, AWS as a later course). Tech track, after the AI engineering interview course.

## One sentence

Learners understand how real systems scale, stay correct and survive failure by playing with live simulations of each idea, writing the core algorithms themselves in graded code exercises, building and breaking small systems in their own `system-design-challenges` repository, and finally designing, building and defending one system against cost, latency and availability targets.

## Learner

- Who: fellowship fellows and early-career engineers who can build a web app but have not designed a system that serves many users. Some are preparing for system design interviews.
- Prior knowledge: JavaScript (functions, objects, async/await, Node.js basics), HTTP and JSON APIs, one SQL database, Git and GitHub, the command line. No distributed systems knowledge assumed.
- Language: English as a second language for many. Plain English, short sentences, every term defined in prose on first use.
- Device and connection: many read on phones on weak data. Every Learn chapter, every simulation and every quiz must work on a 375px screen. Build chapters need a laptop with Node.js and Docker; state every download size.
- Time available: about 12 hours a week. The full course is large (see the roadmap); it is split into four parts so learners finish something real every few weeks.
- Motivation: backend and platform jobs, system design interviews, and building products that do not fall over.
- What they will do with the result: a public `system-design-challenges` repository with measured results and charts, a design document with numbers, and a recorded defence.

## Outcome

By the end, the learner can:

1. Turn a vague product idea into requirements and numbers (traffic, storage, bandwidth, latency, availability, cost) and say which number drives the design.
2. Choose and defend building blocks (load balancers, caches, CDNs, gateways, databases, queues, streams) with trade-offs and failure modes.
3. Explain and demonstrate replication, partitioning, clocks, consistency models, quorums and consensus well enough to predict what a system does under lag, partition and failure.
4. Pick a consistency model per feature (linearizable, causal, session guarantees, eventual) and implement the mechanism (compare-and-set, session tokens, vector clocks, CRDTs).
5. Make a system resilient (timeouts, retries with jitter, idempotency, circuit breakers, bulkheads, sagas) and observable (SLIs, SLOs, error budgets, traces).
6. Design classic systems (URL shortener, feed, chat and notifications, search and typeahead, geospatial matching, booking and payments) under stated cost, latency and availability targets.
7. Run small versions of these systems locally with Docker, measure them, break them on purpose, and explain the results with charts.

## Demo

A five-minute walkthrough of the capstone: the requirements and estimates, the architecture in the sandbox meeting its targets (cost, p99 latency, availability), the working core in the learner's repository, one failure experiment with its chart, and what they would change at ten times the traffic. Then answers to mentor follow-up probes.

## Product scope

- Must have: every Learn chapter teaches through at least one interactive simulation the learner manipulates; quick checks inside chapters; a graded quiz per module; graded JavaScript code exercises for core algorithms; a GitHub challenge per foundation module; ScaleDojo-style labs in the architecture sandbox (about 18, with three levels each) for scaling and case-study modules; a capstone with a recorded defence.
- Should have: an "In AWS" note per module that maps each idea to the AWS service that implements it, so the later AWS course can build on it. Local AWS emulation as an optional part of the deployment challenge, with moto (Apache 2.0, no account); LocalStack now needs an account and a token (research dossier), so it is optional only.
- Out of scope: real AWS accounts or spending, certification prep, a full AWS service tour (a separate AWS course will do this, ScaleDojo style), writing a production database or consensus library.

## Production bar

This is a concepts-plus-practice course, not a single product build. The production bar applies to the learner's challenge repository: tests that pass in CI, measured results with charts, a README per challenge in the house shape (101 glossary, analogy, step table with code links, where each number comes from, results, chart), and a failure experiment for every distributed challenge.

## Variants

None for the general course. Suggested follow-on tracks (roadmap only): the AWS solutions architecture course (ScaleDojo style, real services, real prices), a data-intensive track (storage engines, streaming), and an interview-intensive track (timed mock designs).

## Constraints

- Code: the buildment code runner executes JavaScript only. In-browser exercises are JavaScript with server-side tests. The challenges repository uses Node.js 24 LTS, `node:test`, and Docker Compose; no Python, so one language runs across the course.
- Simulations: only registered canvas slugs render. Most simulations must be data-only configurations of a small shared simulation kit (`03-simulation-kit.md`) so the course stays buildable; a custom component needs a reason.
- Budget: no paid cloud account at any point. Docker images must fit a modest laptop (state sizes; prefer Valkey or Redis, Postgres, nginx, Redpanda, etcd). No AWS emulator that needs an account or a token: moto by default; LocalStack only as an optional extra for learners who already have an account.
- Accuracy: every number (latency table, clock uncertainty, prices) is sourced and dated in the research dossier. Prices in the sandbox are labelled illustrative with the date and region they were checked.
- Legal: real products and papers may be named as examples with sources (Dynamo, Spanner, Raft); scenarios for learners are fictional composites. No marketing links.

## Non-goals

- Low-level design and object-oriented design patterns (a separate course).
- Data structures and algorithms interview drills beyond the ones systems use (Bloom filters, HyperLogLog, tries, geohashes, hash rings).
- Byzantine fault tolerance, formal verification, building a storage engine from scratch.
- Vendor certification.

## Success signals

- Learners predict the outcome of a simulation before running it and are right more often in later modules than in earlier ones.
- Every learner's repository has passing CI and a results chart for each challenge they completed.
- Mentors can review the capstone in under 45 minutes with the rubric.
- In the capstone defence the learner explains a consistency or failure trade-off with a number, without notes.
