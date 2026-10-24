---
artifact: blueprint
course: networking
version: 1
status: draft
owner: curriculum-architect
roadmap_version: 3
roadmap_confirmed: true
depends_on: 02-curriculum-roadmap.md, roadmap-confirmation.md, skill-graph.yaml, timeline.yaml, 04-project-brief.md, module-briefs/
---

# Blueprint: Networking, Hands On

Derived from the confirmed roadmap v3 (G2B complete under the sponsor exception, decision log 2026-10-24). Nothing here changes an outcome, module, chapter or the capstone. If a later artifact contradicts the roadmap, G2A and G2B are re-run; the roadmap is not patched silently.

## Outcomes and evidence

| Outcome | Evidence | Assessment level | Module |
|---|---|---|---|
| O1 Read own address, mask, gateway, DNS server and public address, and explain each | Challenge 0 (1.2, 1.3); gate 1.8; demo 8.7 | Application | 1, 8 |
| O2 Classify addresses against the IANA registry; explain why private ranges and NAT exist | Code 2.5; quiz 2.6; gate 2.7 | Application, analysis | 2 |
| O3 CIDR arithmetic by hand and in code | Drills in 2.2, 2.3, 3.2, 3.5; code 3.7, 3.8; lab 3.10; quiz 3.11 | Application | 2, 3 |
| O4 Trace a packet and confirm each step with commands | Code 4.6; challenges 2, 3; lab 4.8; quizzes 4.9, 5.7; gate 4.10 | Analysis | 3, 4, 5 |
| O5 Demonstrate NAT and explain inbound reachability and carrier-grade NAT | Code 6.6; challenge 4; lab 6.9; quiz 6.10; gate 6.11 | Analysis, evaluation | 6 |
| O6 Explain DHCP and DNS; diagnose no internet layer by layer | Lab 7.5; lab 6.9 level 1; challenge 5; capstone 8.5 | Evaluation | 6, 7, 8 |
| O7 Build a network from namespaces and prove it works and fails | Challenges 1, 2, 4, 5; capstone 8.2 to 8.5 | Creation | 1, 3, 4, 6, 7, 8 |

Every outcome has graded evidence before the capstone, and every module has a gate.

## Constructor profile

**Build-first, with case-first openings.** The learner builds a working two-device network in the first sitting (1.4) and only then reads what the capture showed (1.5). From there each module repeats one rhythm: a problem from the learner's own world (their address, their trace, their phone on café Wi-Fi), a prediction, an interactive piece, the explanation, then a build in the lab that makes the idea real.

Why: the sponsor asked for "build and see", for why before what, and for real systems over analogies. The learners are beginners who lose interest in fact-first material, and networking is unusually easy to make real: every learner already owns a laptop, a router and a phone, and Linux namespaces let them build a real network on one machine. The risk of build-first is "feature tourism", running commands without understanding them. Two things guard against it: every Learn chapter's "Problem first" question has to be answered in the learner's own words in a quick check, and support fades from guided to gapped to open across the challenges.

## Module spine

| # | Module | Purpose | Chapters | Core h | Gate evidence |
|---|---|---|---|---|---|
| 1 | Your laptop is already on a network | Own numbers, lab set up, first network built, what a packet is | 8 | 3.8 | Home network map with real numbers |
| 2 | IP addresses, and why we ran out | Address as a number, classes to CIDR, private and special ranges, first look at NAT | 7 | 3.5 | Private addresses explained to a friend |
| 3 | Your local network: subnets and neighbours | Mask arithmetic, ARP and MAC learning, splitting, overlaps, address planning | 12 | 6.4 | School address plan defended |
| 4 | Leaving your network: gateways and routes | Gateway, routing tables, TTL and traceroute, autonomous systems; build a router | 10 | 5.6 | Own trace explained |
| 5 | Ports, TCP and UDP | Ports and sockets, listening addresses, TCP, UDP | 8 | 4.1 | One capture line explained |
| 6 | NAT | NAT table, inbound reachability, port forwarding, carrier-grade NAT, timeouts; build a home router | 11 | 6.7 | Course question answered with own capture |
| 7 | DHCP and DNS | Leases, resolution, caching and outages, layered diagnosis | 8 | 4.5 | "No internet" runbook |
| 8 | Capstone | Full journey, four-part build, break and fix, demo | 7 | 5.3 | Repository, fault write-up, recorded demo |
| 9 | IPv6 | Reading IPv6, a network without NAT | 5 | 1.9 | Why IPv6 helps, why IPv4 stays |

Module briefs: `module-briefs/01-your-laptop-on-a-network.md` to `module-briefs/09-ipv6.md`.

## Skill graph

`skill-graph.yaml`: 59 taught concepts and 3 entry prerequisites (terminal basics, JavaScript basics, Git basics), 118 edges, acyclic, and every requirement points to an earlier chapter (checked by `tools/gen_graph.py`, which generates both the graph and the timeline from the roadmap tables). Binary numbers, JavaScript bit operators and the shell commands are taught in the course, so they are not entry prerequisites.

Repair path: the four diagnostic questions in `skill-graph.yaml` (terminal, JavaScript, binary, Git) each point to a short repair or say none is needed. Details in `prerequisite-report.md`.

## Time budget

- Budget from the brief: a short course of about 40 hours (`02-course-architecture.md`, short course 30 to 60 hours).
- Core: 41.8 hours (2,510 minutes, summed from `timeline.yaml`).
- Slow path: 54.1 hours (Build chapters' slow-path minutes, and a quarter more on Read, Learn, Code and Lab chapters).
- Stretch: about 8 hours (S1 to S6).
- Weeks at 12 hours: 11.8, 11.8, 11.5 and 6.8 hours. Week 4 is light on purpose: it holds the capstone parts most likely to run over.
- Contingency: the 6.8-hour week 4 leaves about 5 hours of slack in a four-week plan. A pilot of one chapter per type (decision 12) resets these numbers before G4.

## Interaction grammar

Each chapter type has a fixed shape, so a learner always knows what to do next:

| Type | Order of blocks | Assessments |
|---|---|---|
| Read | Hook, own-computer command with "On your computer" label, annotated output, a diagram, the module's question | none or one PREDICT |
| Learn | Hook ("Problem first"), PREDICT, the interactive piece (InteractiveCanvas or a netlab), prose that explains what the learner saw, a worked example with real numbers, one QUIZ, bridge | at most 3 |
| Code | Short worked example, CODE exercise with tests, hint ladder | 1 |
| Build | Goal, "In the lab" steps at the challenge's support level, the test that must pass and the one that must fail, the capture to commit, hint and "if you are stuck" | at most 1 |
| Lab | Scenario, the network lab in plan or fault mode, checks | the lab's checks |
| Check | QUIZ only, three to five questions, two from earlier modules (`-quiz.md`) | 3 to 5 |
| Gate | Checklist, ChapterRecap, LearningLog, one OPEN_QUESTION (written, voice or labelled diagram) | 1 |

Budgets per chapter (`02-course-architecture.md`): at least 1,200 prose words for Read, Learn, Code and Build chapters, 700 for gates; at most 6 top-level components, 25 JSX tags and 3 assessment interactions. `LearningObjectives` in each module's first chapter, `ChapterRecap` in each gate. At least one diagram per module and one in every concept-heavy chapter; topology and packet paths start as MermaidDiagram. The interaction map and canvas specs are G3 artifacts; the module briefs name each piece, its claim, its limit and its fallback.

## Capstone

Specified in the roadmap's "Capstone" section and expanded in `module-briefs/08-capstone.md` (fault matrix, demo template, rubric) and `04-project-brief.md`. The learner ships challenge 6 (four parts, each with tests), a seeded fault write-up, captures from both sides of the router, and a recorded five-minute demo with three mentor probes.

## Risks

| Risk | Effect | Mitigation |
|---|---|---|
| The lab does not run on a learner's machine (memory, Windows edition, macOS) | The learner cannot do any Build chapter | Setup checker with five named failures (1.2); WSL 2 path; Foundations level (decision 8); macOS and WSL 2 runs before G3 |
| The network lab platform change slips | Graded labs 3.10, 4.8, 6.9 and 7.5 are blocked | Three slices; slice 1 before module 3 is written; recorded-output quiz fallback |
| Subnet arithmetic stalls beginners (modules 2 and 3) | Drop-out before the NAT payoff | Unassisted drills with instant feedback, first look at NAT in 2.4, helper unlock in code exercises |
| Learners' real networks differ (IPv6, carrier-grade NAT, hotspots, no router access) | Hooks do not match their screen | Branches in 1.1, 1.8, 6.4 and 6.11; recorded examples |
| Commands taught in the lab behave differently on a learner's own computer | Confusion and lost trust | "On your computer" and "In the lab" labels; host-command table; real-path commands only on the host |
| Time estimates are too low | The course runs past four weeks | Slow path published; pilot (decision 12) before G4 |
| One model family drafts and critiques | Reduced independence | Separate passes and prompts; human review at G2C and G3 (`routing.yaml`) |

## Rationale for the scope cuts

The course keeps what a software engineer needs to understand and debug the network their code runs on: addresses, subnets, routing, ports, NAT, DHCP and DNS, and a short look at IPv6. It cuts what network engineers need and software engineers do not (physical layer, VLANs, OSPF and BGP configuration, certification drills), what another course owns (TLS and HTTP versions in system design; namespaces and cgroups in Linux; security groups in AWS), and what does not fit 40 hours (a TCP stack, IPv6 transition mechanisms). The IPv6 build moved to the stretch path because NAT is the lesson of the capstone and IPv6 forwarding is not yet tested in the lab.
