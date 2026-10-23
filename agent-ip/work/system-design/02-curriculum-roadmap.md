---
artifact: curriculum-roadmap
course: system-design
version: 1
status: draft
owner: curriculum-architect
instructors_reviewed: []
g2b_signoff: pending
depends_on: 00-course-brief.md, 01-research-dossier.md, 03-simulation-kit.md, ../../proposals/2026-10-23-interactive-first.md
---

# Curriculum roadmap: System Design, Hands On

## In one paragraph

Learners start with one server and end with systems that span regions. Every idea is taught the same way: a short real situation, an interactive simulation the learner predicts and then plays with (drag the traffic up, kill the leader, cut the network, skew a clock), plain prose that explains what they saw, a quick check, then practice. Practice comes in three forms: graded JavaScript code exercises in the browser for the core algorithms (token bucket, consistent hashing, vector clocks, compare-and-set, CRDTs, Raft voting rules), challenges in the learner's own `system-design-challenges` GitHub repository where they run small systems with Docker, measure them and break them on purpose, and ScaleDojo-style labs in an architecture sandbox where they pick blocks and instance sizes, watch requests flow through their design, and pass three levels of growing traffic within cost, latency and availability targets. The course has four parts: foundations, data and distributed correctness, async work and operations, and designing real systems. It ends with a capstone the learner designs, builds, measures and defends. Each module ends with an "In AWS" note so the separate AWS course can build on the same ideas.

## Learner and entry prerequisites

- Learner: fellowship fellows and early-career engineers who can build a web app but have not designed for scale. Many read on phones and have English as a second language.
- Prior knowledge: JavaScript and Node.js basics (async/await, modules), HTTP and JSON, one SQL database, Git and GitHub, the command line.
- Time available: about 12 hours a week. Each part is 5 to 6 weeks.
- Entry diagnostic: chapter 1.1 asks the learner to sketch how they would serve 10,000 users; the same question returns in the capstone for comparison.
- Equipment: a laptop with Node.js 24 LTS, Git and Docker Desktop (or Docker Engine) for Build chapters. Everything else, including every simulation, works on a phone. No cloud account and no money needed38613245.8188

## Outcomes

| # | Outcome (observable verb) | Evidence |
|---|---|---|
| O1 | Turn a product idea into requirements and numbers, and name the number that drives the design | Gates 1.7 and 2.10; estimator steps in every case study; capstone design doc |
| O2 | Choose building blocks (load balancer, cache, CDN, gateway, database, queue, stream) and defend each with a trade-off and a failure mode | Labs 4.9, 5.10, 6.10, 9.9, 13.10, 19.7; case-study gates; capstone lab |
| O3 | Predict what a replicated, partitioned system does under lag, partition and node failure | Predict-before-play in modules 8 to 13; quizzes 8 to 13; challenges 7, 8, 11, 12 |
| O4 | Choose a consistency model per feature and implement its mechanism (compare-and-set, session tokens, vector clocks, CRDTs) | Code exercises 7.7, 8.8, 10.8, 11.8, 13.8; challenge 10; gate 11.10 |
| O5 | Make a service resilient and observable, and prove it with a failure experiment and an SLO | Challenges 13, 15, 16; code exercises 14.6, 16.7, 17.7; gate 17.10 |
| O6 | Design a classic system end to end under cost, latency and availability targets | Case-study modules 20 to 27 (a lab and a written design each); mock round 28 |
| O7 | Run, measure and break small systems locally, and explain the results with charts | Every challenge's `results.md` and chart; capstone failure experiment |

## Chapter types

| Type | What the learner does | Typical minutes |
|---|---|---|
| Read | Set the scene: a real situation that goes wrong, often with a small simulation to poke | 10 to 15 |
| Learn | One idea: predict, play with the simulation, read why, quick check | 30 to 45 |
| Code | Graded JavaScript in the browser: implement the core algorithm, server tests check it | 35 to 50 |
| Build | A part of a challenge in the learner's GitHub repository, run locally with Docker, results and chart committed | 60 to 150 |
| Lab | A ScaleDojo-style lab in the architecture sandbox: a real scenario, targets for traffic, p99 latency, availability and a budget per hour, then blocks and instance sizes; requests animate through the design and the sandbox checks each target over three levels of growing traffic | 45 to 60 |
| Check | Graded scenario quiz, three to five questions | 15 to 20 |
| Gate | Checklist, learning log and one written answer a mentor reads | 25 to 30 |

In the tables below, the **Play** column names the simulation and the kit renderer it uses (see `03-simulation-kit.md`): `[timeline]`, `[cluster]`, `[flow]`, `[ring]`, `[sandbox]`, `[history]`, `[estimator]`, `[classify]`, or an existing renderer `[sequence]`, `[state]`, `[factor]`, `[stepper]`. Learn chapters also carry one Predict and one quick check; they are not repeated in every row.

---

# Part 1: Foundations (modules 1 to 6)

### Module 1: Thinking like a system designer
Purpose: see what system design is, learn the design loop, and set up the challenges repository.
Hours: 3.6 (215 min)

| # | Chapter | One-line outcome | Type | Min | Play / practice |
|---|---|---|---|---|---|
| 1.1 | Set the scene: launch day | Watch one server fail as users grow, and sketch a first fix | Read | 15 | Launch day: drag users from 10 to 100,000 and watch CPU, queue and errors `[flow]` |
| 1.2 | Requirements first | Separate functional, non-functional and constraints, and find the ones that drive design | Learn | 35 | Requirement sorter: tap each requirement into its bucket, with feedback `[classify]` |
| 1.3 | The building blocks map | Name what each block (DNS, CDN, load balancer, app, cache, database, queue, worker, object storage) is for | Learn | 35 | Block explorer: tap a block to see its job, its failure mode and its AWS name `[sandbox: explore mode]` |
| 1.4 | The design loop | Run clarify, estimate, sketch, deep dive, trade-offs, failure on a small example | Learn | 30 | Step through a pastebin design, one step at a time `[stepper]` |
| 1.5 | Set up your challenges repository | Create `system-design-challenges` from the template, run the toolkit, pass the first test, check Docker | Build | 60 | Challenge 0: repository setup |
| 1.6 | Thinking like a system designer | Graded scenarios | Check | 15 | |
| 1.7 | Checklist and learning log | Written requirements and the one driving number for an app you use | Gate | 25 | |

### Module 2: Numbers, estimation and probability
Purpose: feel the numbers that decide designs, and estimate quickly with units.
Hours: 6.7 (400 min)

| # | Chapter | One-line outcome | Type | Min | Play / practice |
|---|---|---|---|---|---|
| 2.1 | Set the scene: will it fit? | See a design fail because nobody did the maths | Read | 10 | |
| 2.2 | Latency numbers you should feel | Order memory, SSD, network and cross-continent costs and use them in an argument | Learn | 35 | Latency ladder: zoom from a cache hit to a round trip across the world, scaled to human time `[timeline]` |
| 2.3 | Back-of-the-envelope estimation | Go from daily users to peak requests per second, storage per year and bandwidth, with units | Learn | 40 | Estimator: change users, actions and sizes; see every step of the working `[estimator]` |
| 2.4 | Percentiles and tail latency | Explain why p99 matters more than the average, and why fan-out makes tails worse | Learn | 35 | Fan-out: one request calls N backends; watch the whole request's p99 climb `[flow]` |
| 2.5 | Queues, utilisation and Little's law | Predict wait time from arrival rate and service rate; see the knee near full utilisation | Learn | 40 | Utilisation knee: raise arrivals toward capacity and watch the queue explode `[flow]` |
| 2.6 | Availability maths: nines, series and parallel | Compute the availability of a chain and of redundant copies; convert nines to downtime | Learn | 35 | Availability builder: chain parts, add a replica, see the nines and minutes of downtime per year `[sandbox: availability mode]` |
| 2.7 | Code: percentiles and availability | Implement `percentile`, `seriesAvailability` and `parallelAvailability` | Code | 40 | Graded tests |
| 2.8 | Challenge 1: measure a server | Load-test a small Node server, find its knee, show p50 and p99 in a chart | Build | 120 | `challenge-1-measure-a-server` parts 1 to 3 |
| 2.9 | Numbers and estimation | Graded scenarios | Check | 20 | |
| 2.10 | Checklist and learning log | Written estimate for a photo-sharing app with the driving number circled | Gate | 25 | |

### Module 3: Networking for system designers
Purpose: know what a request costs on the wire, how names resolve, and how real-time connections work, plus the Linux basics under every service.
Hours: 5.8 (350 min)

| # | Chapter | One-line outcome | Type | Min | Play / practice |
|---|---|---|---|---|---|
| 3.1 | Set the scene: what happens when you open a link | Follow one request from the browser to a server and back | Read | 10 | Step through DNS, TCP, TLS and HTTP `[sequence]` |
| 3.2 | TCP, UDP and the cost of a handshake | Count round trips for TCP plus TLS 1.2, TLS 1.3 and QUIC, and price them by distance | Learn | 35 | Handshake cost: pick protocol and distance; see setup time before the first byte `[sequence]` |
| 3.3 | DNS and routing | Explain resolution, caching, TTLs, anycast and GeoDNS, and why a DNS change is slow to spread | Learn | 35 | TTL spread: change a record and watch resolvers pick it up over time `[timeline]` |
| 3.4 | HTTP/1.1, HTTP/2 and HTTP/3 | Explain head-of-line blocking and what each version fixed | Learn | 35 | Packet loss toggle: watch streams stall or continue per version `[timeline]` |
| 3.5 | Real-time connections: polling, long polling, SSE, WebSockets | Choose a real-time approach by delay, request count and connections per server | Learn | 35 | Same chat, four ways: messages, delay and server load side by side `[timeline]` |
| 3.6 | Linux under your service | Explain processes, threads, file descriptors, ports and the event loop, and why one blocking call hurts | Learn | 35 | Thread pool versus event loop: add a slow blocking call and watch throughput `[flow]` |
| 3.7 | Code: a DNS-style TTL cache | Implement a resolver cache with TTL and a fake clock | Code | 35 | Graded tests |
| 3.8 | Challenge 2: network costs | Measure handshake and keep-alive costs, and polling versus WebSocket message counts | Build | 90 | `challenge-2-network-costs` parts 1 to 3 |
| 3.9 | Networking for system designers | Graded scenarios | Check | 15 | |
| 3.10 | Checklist and learning log | Written real-time choice for a delivery tracking screen, with numbers | Gate | 25 | |

### Module 4: Scaling out: load balancing and statelessness
Purpose: grow past one server, spread load fairly, and survive a server dying.
Hours: 7.3 (440 min)

| # | Chapter | One-line outcome | Type | Min | Play / practice |
|---|---|---|---|---|---|
| 4.1 | Set the scene: one server is full | See why buying a bigger server stops working | Read | 10 | |
| 4.2 | Vertical versus horizontal scaling | Compare one large instance with many small ones on capacity, cost and failure | Learn | 35 | Instance picker: choose sizes and counts; see capacity, monthly cost and what one failure takes out `[sandbox]` |
| 4.3 | Stateless services and where state goes | Move sessions out of the server and explain sticky sessions' cost | Learn | 35 | Kill a server: in-memory sessions versus a shared session store; count logged-out users `[cluster]` |
| 4.4 | Load balancers: L4, L7 and health checks | Explain what each layer sees and how health checks remove a bad server | Learn | 35 | Load balancer failover: fail a backend and watch traffic and per-server load shift `[flow]` |
| 4.5 | Balancing algorithms | Compare round robin, least connections, power of two choices and hashing under uneven requests | Learn | 40 | Same traffic, four algorithms: per-server queues and p99 side by side `[flow]` |
| 4.6 | Autoscaling | Explain scaling signals, warm-up, cooldown and why scaling lags a spike | Learn | 35 | Spike: set scale-out delay and target; count dropped requests `[flow]` |
| 4.7 | Code: load balancing pickers | Implement round robin, least connections and power of two choices | Code | 40 | Graded tests |
| 4.8 | Challenge 3: a load balancer | Build an L7 proxy with health checks; kill a backend and record the p99 | Build | 120 | `challenge-3-load-balancer` parts 1 to 3 |
| 4.9 | Lab: three tiers at 10,000 requests per second | Split web, app and data tiers and meet 10k RPS, p99 under 200 ms and 99.9% availability within a budget per hour | Lab | 45 | Sandbox lab, three levels |
| 4.10 | Scaling out | Graded scenarios | Check | 20 | |
| 4.11 | Checklist and learning log | Written defence of the design from 4.9 | Gate | 25 | |

### Module 5: Caching and CDNs
Purpose: make reads cheap without serving wrong data, and keep the database alive when a cache fails.
Hours: 8.1 (485 min)

| # | Chapter | One-line outcome | Type | Min | Play / practice |
|---|---|---|---|---|---|
| 5.1 | Set the scene: the sale that melted the database | See a cache expiry take a database down | Read | 10 | |
| 5.2 | Where caches live | Place caches from browser to database and add up the latency along the path | Learn | 35 | Path latency with a hit rate per layer `[sandbox: latency mode]` |
| 5.3 | Cache patterns | Compare cache-aside, read-through, write-through, write-back and write-around, including on a crash | Learn | 40 | Pick a pattern, then step through a read, a write and a crash `[sequence]` |
| 5.4 | Eviction and hit rate | Explain LRU, LFU and TTL, working-set size, and why a small cache can still help | Learn | 35 | Cache size versus skewed traffic: hit rate curve `[flow]` |
| 5.5 | Cache invalidation | Find the stale window for TTL, delete-on-write and versioned keys, including the delete-then-stale-set race | Learn | 40 | Write, read, race: watch a stale value come back `[timeline]` |
| 5.6 | Stampedes and hot keys | Stop a thundering herd with request coalescing, TTL jitter and stale-while-revalidate | Learn | 35 | A hot key expires: database load with each fix toggled `[flow]` |
| 5.7 | CDN and edge | Use cache-control, origin shield, purge and signed URLs; predict origin load | Learn | 35 | CDN hit rate and TTL versus origin requests and staleness `[flow]` |
| 5.8 | Code: an LRU cache with TTL | Implement it with a fake clock | Code | 45 | Graded tests |
| 5.9 | Challenge 4: a cache in front | Cache-aside with Valkey; hit rate versus TTL; reproduce and fix a stampede | Build | 120 | `challenge-4-cache-in-front` parts 1 to 3 |
| 5.10 | Lab: CDN level 1, make a slow site load instantly | Put a CDN in front of a far-away origin and meet the page-load and origin-load targets as traffic grows | Lab | 45 | Sandbox lab, three levels |
| 5.11 | Caching and CDNs | Graded scenarios | Check | 20 | |
| 5.12 | Checklist and learning log | Written cache plan for a product page: what, where, TTL, invalidation | Gate | 25 | |

### Module 6: APIs, the front door and protecting it
Purpose: design APIs that are safe to retry, and protect them with gateways, rate limits and auth.
Hours: 8.8 (525 min)

| # | Chapter | One-line outcome | Type | Min | Play / practice |
|---|---|---|---|---|---|
| 6.1 | Set the scene: a retry charged a customer twice | See a timeout plus a retry cause a double charge | Read | 10 | |
| 6.2 | API styles: REST, gRPC, GraphQL | Choose a style by client, payload and round trips | Learn | 35 | Weigh what matters and see which style wins `[factor]` |
| 6.3 | Good API design: resources, pagination, versioning, errors | Choose cursor over offset pagination and explain why | Learn | 40 | Insert rows while paging: offset skips and repeats, cursor does not `[timeline]` |
| 6.4 | Idempotency and safe retries | Make a write safe to retry with an idempotency key | Learn | 40 | Timeout and retry, with and without a key: count charges `[sequence]` |
| 6.5 | Rate limiting algorithms | Compare token bucket, leaky bucket, fixed window, sliding log and sliding window counter under a burst | Learn | 40 | Same burst, five limiters; see the boundary burst in fixed windows `[flow]` |
| 6.6 | API gateways | Decide what belongs in a gateway: routing, auth, limits, aggregation | Learn | 35 | Toggle gateway jobs and follow one request `[sequence]` |
| 6.7 | Authentication and authorization at scale | Compare sessions and JWTs, revocation, OAuth and OIDC roles, and service-to-service auth | Learn | 40 | Revoke a user: time until each design notices `[timeline]` |
| 6.8 | Code: token bucket and sliding window | Implement both against a fake clock | Code | 45 | Graded tests |
| 6.9 | Challenge 5: a rate limiter | In-memory limiters, then one shared limit across two instances in Valkey with an atomic script; idempotency keys | Build | 150 | `challenge-5-rate-limiter` parts 1 to 4 |
| 6.10 | Lab: a distributed rate limiter with shared state | Enforce one limit across many gateway instances with a shared counter store, within latency and accuracy targets | Lab | 45 | Sandbox lab, three levels |
| 6.11 | APIs and the front door | Graded scenarios | Check | 20 | |
| 6.12 | Checklist and learning log | Written API for a payments endpoint: idempotency, limits, errors | Gate | 25 | |

Part 1 total: about 40.3 hours (62 chapters).

---

# Part 2: Data and distributed correctness (modules 7 to 14)

### Module 7: Databases and concurrency control
Purpose: choose a database, understand indexes and transactions, and stop two writers from corrupting data.
Hours: 7.4 (445 min)

| # | Chapter | One-line outcome | Type | Min | Play / practice |
|---|---|---|---|---|---|
| 7.1 | Set the scene: two people buy the last ticket | See a lost update oversell a seat | Read | 10 | The seat race, reused from the ticketing course `[existing: ticketline-seat-hold-race]` |
| 7.2 | Choosing a database | Match relational, key-value, document, wide-column, graph, time-series and search stores to access patterns | Learn | 40 | Sort workloads to stores, with reasons `[classify]` |
| 7.3 | Indexes: B-trees and LSM trees | Explain why LSM trees write fast and read slower, and where Bloom filters help | Learn | 40 | Step through writes, flushes and compaction; watch read and write amplification `[stepper]` |
| 7.4 | Transactions and isolation levels | Name the anomaly each isolation level allows: dirty read, lost update, write skew | Learn | 40 | Interleave two transactions; change the isolation level and see which anomaly appears `[timeline]` |
| 7.5 | Locks, MVCC and compare-and-set | Fix a lost update with a row lock, with a version check (compare-and-set) and with retries | Learn | 40 | Two writers, one row: lock versus CAS versus nothing; count lost updates and retries `[timeline]` |
| 7.6 | The database scaling path | Order the steps: indexes, caching, read replicas, partitioning, specialised stores | Learn | 35 | Grow traffic and add each step when the bottleneck appears `[sandbox]` |
| 7.7 | Code: compare-and-set inventory | Implement a CAS update with versions and a retry loop on a fake store; pass the race test | Code | 45 | Graded tests |
| 7.8 | Challenge 6: the last ticket | Reproduce a lost update in Postgres, then fix it three ways and measure throughput of each | Build | 150 | `challenge-6-last-ticket` parts 1 to 4 |
| 7.9 | Databases and concurrency | Graded scenarios | Check | 20 | |
| 7.10 | Checklist and learning log | Written choice of store and concurrency control for an inventory service | Gate | 25 | |

### Module 8: Replication
Purpose: copy data for safety and reads, and handle what lag and failover do to users.
Hours: 7.8 (465 min)

| # | Chapter | One-line outcome | Type | Min | Play / practice |
|---|---|---|---|---|---|
| 8.1 | Set the scene: my comment disappeared | See a read from a lagging replica hide a user's own write | Read | 10 | |
| 8.2 | Single-leader replication | Follow writes from leader to followers and reads to replicas | Learn | 35 | Leader and followers: send writes, read anywhere, kill the leader `[cluster]` |
| 8.3 | Synchronous and asynchronous replication | Trade write latency against data lost on failover | Learn | 35 | How many followers must confirm: latency versus lost writes `[cluster]` |
| 8.4 | Replication lag and its anomalies | Reproduce read-your-writes and monotonic reads violations and fix each; meet consistent prefix (reproduced in 11.4) | Learn | 40 | Replica lag: lag, refresh time and read routing; violations flagged `[timeline]` |
| 8.5 | Failover and split brain | Explain detection, promotion, lost writes and two leaders, and how fencing stops the old one | Learn | 40 | Partition the leader: two leaders accept writes; turn on fencing `[cluster]` |
| 8.6 | Multi-leader replication | Explain why two regions writing the same record conflict, and where multi-leader fits | Learn | 35 | Two regions edit one document; see the conflict `[timeline]` |
| 8.7 | Leaderless replication, a first look | See writes go to many nodes with no leader (full treatment in module 13) | Learn | 30 | Write to three of five nodes, read from two `[cluster]` |
| 8.8 | Code: a read-your-writes router | Route reads to a replica whose applied position is at least the client's token, raise the token on reads, cap leader fallback during a lag spike, and handle a replica whose position moves backwards | Code | 45 | Graded tests (go beyond the 8.4 snippet, which shows only the comparison and the fallback) |
| 8.9 | Challenge 7: replicas and lag | Postgres primary and replica in Docker; induce lag; reproduce the read-your-writes bug; fix it with position tokens | Build | 150 | `challenge-7-replicas-and-lag` parts 1 to 3 |
| 8.10 | Replication | Graded scenarios | Check | 20 | |
| 8.11 | Checklist and learning log | Written replication plan for a social app: sync or async, which reads go where | Gate | 25 | |

### Module 9: Partitioning and sharding
Purpose: split data across machines, keep load even, and survive a celebrity.
Hours: 7.5 (450 min)

| # | Chapter | One-line outcome | Type | Min | Play / practice |
|---|---|---|---|---|---|
| 9.1 | Set the scene: one table too big for one machine | See a database run out of disk and write capacity | Read | 10 | |
| 9.2 | Range and hash partitioning | Compare even spread against fast range scans | Learn | 35 | Same keys, range versus hash: load per shard and a range query's fan-out `[ring]` |
| 9.3 | Consistent hashing and virtual nodes | Explain why adding a node moves few keys, and what virtual nodes fix | Learn | 40 | Hash ring: add or remove nodes, change virtual nodes, see keys moved and load spread `[ring]` |
| 9.4 | Hot partitions and skew | Find a hot key and fix it with key salting, splitting or caching | Learn | 40 | One celebrity key: hot shard, no partitioning, hash partitioning, salted keys compared `[ring]` |
| 9.5 | Rebalancing and request routing | Compare fixed partitions and dynamic splits; route through a client, a proxy or a coordinator | Learn | 35 | Rebalance: data moved and requests misrouted during the move `[ring]` |
| 9.6 | Secondary indexes and cross-shard queries | Compare local and global indexes; see scatter-gather tail latency | Learn | 35 | Query every shard: total p99 grows with shard count `[flow]` |
| 9.7 | Code: a consistent hash ring | Implement a ring with virtual nodes; tests check spread and minimal movement | Code | 45 | Graded tests |
| 9.8 | Challenge 8: sharding | Shard a key-value store across nodes, measure keys moved, find and fix a hot key | Build | 120 | `challenge-8-sharding` parts 1 to 3 |
| 9.9 | Lab: 100 million keys on a hash ring | Spread 100 million keys and one celebrity seller across shards, then add a node and keep keys moved under the target | Lab | 45 | Sandbox lab, three levels |
| 9.10 | Partitioning and sharding | Graded scenarios | Check | 20 | |
| 9.11 | Checklist and learning log | Written partition key choice with the hot-key plan | Gate | 25 | |

### Module 10: Time, clocks and ordering
Purpose: understand why "which happened first?" is hard, and every tool from logical clocks to TrueTime. Clocks come before consistency models because the models need ordering.
Hours: 8.2 (490 min)

| # | Chapter | One-line outcome | Type | Min | Play / practice |
|---|---|---|---|---|---|
| 10.1 | Set the scene: which came first? | See two servers disagree about the order of two events | Read | 10 | |
| 10.2 | Physical clocks lie | Explain drift, NTP sync, leap seconds, and wall-clock versus monotonic time in code | Learn | 40 | Two clocks drift: set drift in parts per million and sync interval; watch skew grow and reset, and timestamp order go wrong `[timeline]` |
| 10.3 | Lamport clocks | Order events with counters, and see what Lamport clocks cannot tell you | Learn | 40 | Send messages between three nodes; predict each counter before it appears `[timeline]` |
| 10.4 | Vector clocks | Tell "happened before" from "concurrent" | Learn | 40 | Pick two events; the widget compares their vectors: before, after or concurrent `[timeline]` |
| 10.5 | Hybrid logical clocks | Combine wall time and a counter so timestamps stay close to real time and still respect cause and effect | Learn | 35 | HLC values on three nodes with skewed clocks `[timeline]` |
| 10.6 | TrueTime: time as an interval | Explain why a timestamp is a range (earliest, latest), what happens when two ranges overlap, and how commit wait makes order safe | Learn | 45 | Uncertainty intervals: set epsilon and the gap between two transactions; overlapping ranges mean "order unknown"; turn on commit wait and see the added latency `[timeline]` |
| 10.7 | ID generation at scale | Compare auto-increment, UUIDv4, UUIDv7 and Snowflake-style IDs; handle a clock going backwards | Learn | 35 | Snowflake bits: workers, IDs per millisecond, clock rollback `[estimator]` |
| 10.8 | Code: Lamport, vector and hybrid clocks | Implement send, receive and compare for each | Code | 50 | Graded tests |
| 10.9 | Challenge 9: clocks | A clocks library with tests, a drift simulation on the toolkit network, and a Snowflake ID generator that survives rollback | Build | 150 | `challenge-9-clocks` parts 1 to 5 |
| 10.10 | Time, clocks and ordering | Graded scenarios | Check | 20 | |
| 10.11 | Checklist and learning log | Written answer: two writes 1 ms apart on different servers; how do you order them, and what does it cost? | Gate | 25 | |

### Module 11: Consistency models
Purpose: know exactly what each consistency model promises, see it in histories, and pick one per feature.
Hours: 7.2 (430 min)

| # | Chapter | One-line outcome | Type | Min | Play / practice |
|---|---|---|---|---|---|
| 11.1 | Set the scene: the balance that went back in time | See a user read an older balance after a newer one | Read | 10 | |
| 11.2 | A consistency model is a contract on histories | Read a history of reads and writes drawn as bars on a timeline | Learn | 35 | Build a small history by adding operations `[history]` |
| 11.3 | Linearizability | Decide whether a history is linearizable; explain why compare-and-set, locks and unique usernames need it | Learn | 45 | Is it linearizable? Change a read's result; the checker finds a linearization point or shows why none exists `[history]` |
| 11.4 | Sequential and causal consistency | Judge the same history under each model; reproduce a consistent prefix violation (a reply shown before its question) and fix it | Learn | 40 | One history, three verdicts `[history]` |
| 11.5 | Session guarantees in code | Implement read-your-writes, monotonic reads, monotonic writes and writes-follow-reads with session tokens | Learn | 40 | Client sessions over lagging replicas; switch each guarantee on and see which anomalies stop `[timeline]` |
| 11.6 | Eventual consistency and convergence | Explain what "eventually" means and what decides how long it takes | Learn | 35 | Replicas converge by anti-entropy; change sync rate `[cluster]` |
| 11.7 | CAP and PACELC, read correctly | Explain the choice during a partition, and the latency versus consistency choice when there is none | Learn | 40 | Cut the network: refuse writes (consistent) or accept and diverge (available); then measure latency with no partition `[cluster]` |
| 11.8 | Code: a linearizability checker | Check small single-register histories by brute force | Code | 50 | Graded tests |
| 11.9 | Challenge 10: consistency in practice | Session-token client over the replicas from challenge 7; record anomalies before and after | Build | 90 | `challenge-10-consistency` parts 1 and 2 |
| 11.10 | Consistency models | Graded scenarios | Check | 20 | |
| 11.11 | Checklist and learning log | Written consistency choice per feature of a social app (likes, posts, balance, username) | Gate | 25 | |

### Module 12: Consensus, leader election and coordination
Purpose: get many machines to agree, elect one leader safely, and keep track of who is alive.
Hours: 9.5 (570 min)

| # | Chapter | One-line outcome | Type | Min | Play / practice |
|---|---|---|---|---|---|
| 12.1 | Set the scene: two schedulers in charge | See a duplicate leader bill customers twice | Read | 10 | |
| 12.2 | Why agreement is hard | Explain why a slow node and a dead node look the same, and what timeouts cost | Learn | 35 | Timeout slider: false failure detections versus detection time `[cluster]` |
| 12.3 | Quorums | Use majorities and W + R > N; count the failures a cluster survives | Learn | 40 | Quorum explorer: N, W, R; see overlapping sets and when a stale read is possible `[cluster]` |
| 12.4 | Leader election, leases and fencing tokens | Stop an old leader after a long pause with a fencing token | Learn | 40 | A pause outlives the lease; two leaders write; turn on fencing `[timeline]` |
| 12.5 | Raft, part 1: terms and elections | Explain terms, votes, randomised timeouts and split votes | Learn | 45 | Raft cluster: kill the leader, cause a split vote, partition a node `[cluster: raft]` |
| 12.6 | Raft, part 2: log replication and commit | Explain how entries commit and why a partitioned old leader's entries are overwritten | Learn | 45 | Send entries, partition, heal; watch logs repair `[cluster: raft]` |
| 12.7 | Paxos and multi-leader setups | Walk single-decree Paxos with two proposers; compare Multi-Paxos with Raft | Learn | 40 | Prepare, promise, accept with competing proposers `[sequence]` |
| 12.8 | Gossip and failure detection | Explain how gossip spreads in about log N rounds, SWIM, and suspicion before death | Learn | 35 | Gossip spread: fanout and rounds; one false suspicion `[cluster]` |
| 12.9 | Service discovery and coordination services | Explain registration, health checks and watches with etcd, ZooKeeper or Consul | Learn | 35 | Register, heartbeat, expire, watch `[sequence]` |
| 12.10 | Code: Raft voting rules | Implement `handleRequestVote` and quorum maths; scenario tests check safety | Code | 50 | Graded tests |
| 12.11 | Challenge 11: Raft | Leader election and log replication on the toolkit's simulated network; partition tests pass | Build | 150 | `challenge-11-raft` parts 1 to 3 |
| 12.12 | Consensus and coordination | Graded scenarios | Check | 20 | |
| 12.13 | Checklist and learning log | Written answer: how does your job scheduler make sure only one copy runs? | Gate | 25 | |

### Module 13: Leaderless stores, Dynamo and conflict resolution
Purpose: build an always-writable store and resolve the conflicts it creates.
Hours: 9.0 (540 min)

| # | Chapter | One-line outcome | Type | Min | Play / practice |
|---|---|---|---|---|---|
| 13.1 | Set the scene: the cart that must always accept | See why a shopping cart prefers availability | Read | 10 | |
| 13.2 | The Dynamo design end to end | Walk the ring, preference list, and N, R and W | Learn | 40 | Ring plus replicas: write a key, see which nodes hold it `[ring]` |
| 13.3 | Sloppy quorums, hinted handoff, read repair, Merkle trees | Explain how the store heals after a node is down | Learn | 40 | Take a node down, write, bring it back; watch hints and repair `[cluster]` |
| 13.4 | DynamoDB today versus the Dynamo paper | Explain how the managed service differs (leaders per partition, adaptive capacity) | Learn | 35 | A hot partition with and without adaptive capacity `[ring]` |
| 13.5 | Last-write-wins and lost data | Show how LWW with skewed clocks silently drops a write | Learn | 35 | Two concurrent writes, skewed clocks; count lost writes `[timeline]` |
| 13.6 | Siblings and application merges | Keep concurrent versions with vector clocks and merge them; see a deleted item come back | Learn | 35 | Cart conflict: merge strategies compared `[timeline]` |
| 13.7 | CRDTs | Explain why G-Counter, PN-Counter and OR-Set merge to the same result in any order | Learn | 45 | Replicas apply operations in different orders and merge; naive set versus OR-Set `[cluster]` |
| 13.8 | Code: CRDTs | Implement G-Counter, PN-Counter and OR-Set; property tests check commutative, associative, idempotent merges | Code | 50 | Graded tests |
| 13.9 | Challenge 12: a leaderless key-value store | N, R and W quorums, hinted handoff, vector-clock siblings, and a CRDT cart on the toolkit network | Build | 150 | `challenge-12-leaderless-kv` parts 1 to 4 |
| 13.10 | Lab: a distributed key-value store | Choose N, R and W, replicas and zones to meet durability, availability and p99 targets for a cart service | Lab | 50 | Sandbox lab, three levels |
| 13.11 | Leaderless stores and conflicts | Graded scenarios | Check | 20 | |
| 13.12 | Checklist and learning log | Written choice of conflict strategy for three features | Gate | 30 | |

### Module 14: Distributed transactions and exactly-once
Purpose: keep data correct across services without a single database.
Hours: 6.2 (370 min)

| # | Chapter | One-line outcome | Type | Min | Play / practice |
|---|---|---|---|---|---|
| 14.1 | Set the scene: paid but never reserved | See a dual write leave an order half done | Read | 10 | |
| 14.2 | Two-phase commit and why it blocks | Walk 2PC and find where a coordinator crash blocks everyone | Learn | 40 | Crash the coordinator at each step `[state]` |
| 14.3 | Sagas | Compare orchestration and choreography; design compensations | Learn | 40 | Fail step 3; watch compensations run `[state]` |
| 14.4 | The outbox pattern and change data capture | Replace a dual write with an outbox | Learn | 35 | Crash between the database write and the publish, with and without an outbox `[sequence]` |
| 14.5 | Exactly-once is at-least-once plus idempotency | Make consumers safe to run twice | Learn | 35 | Duplicates with and without a dedupe table `[flow]` |
| 14.6 | Code: idempotent consumer and saga runner | Implement a dedupe store and a compensation runner | Code | 45 | Graded tests |
| 14.7 | Challenge 13: an order saga | Postgres outbox, a worker, compensations and crash tests | Build | 120 | `challenge-13-order-saga` parts 1 to 3 |
| 14.8 | Distributed transactions | Graded scenarios | Check | 20 | |
| 14.9 | Checklist and learning log | Written failure walk-through of a checkout saga | Gate | 25 | |

Part 2 total: about 62.7 hours (88 chapters).

---

# Part 3: Async work, resilience and operations (modules 15 to 19)

### Module 15: Queues, logs and stream processing
Purpose: move slow work off the request path and process events in order and on time.
Hours: 7.3 (440 min)

| # | Chapter | One-line outcome | Type | Min | Play / practice |
|---|---|---|---|---|---|
| 15.1 | Set the scene: slow and doubled emails | See a signup wait on email and send it twice | Read | 10 | |
| 15.2 | Why queues | Use a queue to decouple, buffer and smooth spikes | Learn | 35 | Queue backpressure: arrivals, workers, service time `[flow]` |
| 15.3 | Queue versus log | Compare SQS-style queues with Kafka-style logs, consumer groups and offsets | Learn | 40 | Partitions and consumers; add a consumer and watch the rebalance `[cluster]` |
| 15.4 | Delivery, ordering and partition keys | Keep per-key order and explain why retries reorder | Learn | 40 | A retry reorders two events; choose a partition key `[timeline]` |
| 15.5 | Retries, dead letter queues and poison messages | Stop one bad message from blocking a partition | Learn | 35 | Poison message: blocked partition versus dead letter queue `[flow]` |
| 15.6 | Stream processing: windows, watermarks, late events | Choose tumbling, sliding or session windows and handle late data | Learn | 40 | Move the watermark; see late events dropped or counted `[timeline]` |
| 15.7 | Publish and subscribe, and fan-out | Fan one event out to many consumers safely | Learn | 30 | One event, many subscribers, one slow `[flow]` |
| 15.8 | Code: a windowed aggregator | Implement tumbling windows with a watermark and late-event rule | Code | 45 | Graded tests |
| 15.9 | Challenge 14: a queue worker | Consumer group on Redpanda or Valkey streams, retries with backoff, dead letter queue, idempotent handler, backlog chart | Build | 120 | `challenge-14-queue-worker` parts 1 to 3 |
| 15.10 | Queues and streams | Graded scenarios | Check | 20 | |
| 15.11 | Checklist and learning log | Written async design for order emails and receipts | Gate | 25 | |

### Module 16: Microservices and resilience
Purpose: decide when to split a system, and keep it standing when parts fail.
Hours: 6.8 (410 min)

| # | Chapter | One-line outcome | Type | Min | Play / practice |
|---|---|---|---|---|---|
| 16.1 | Set the scene: one slow service took the site down | See a slow dependency exhaust every thread | Read | 10 | |
| 16.2 | Monolith, modular monolith, microservices | Choose by team size, deploy pace and domain clarity | Learn | 40 | Weigh the factors and see the recommendation change `[factor]` |
| 16.3 | Service boundaries and data ownership | Draw boundaries and choose sync or async calls | Learn | 35 | Follow one order across services `[sequence]` |
| 16.4 | Timeouts, retries, backoff and jitter | Prevent retry storms | Learn | 40 | Retry and backoff: failure rate, retries, jitter on and off `[flow]` |
| 16.5 | Circuit breakers, bulkheads and load shedding | Contain a failing dependency | Learn | 40 | Circuit breaker states plus separate thread pools `[state]` |
| 16.6 | Fault tolerance and graceful degradation | Decide which features degrade and what the fallback is | Learn | 35 | Fail a dependency; see what the user still gets `[sandbox]` |
| 16.7 | Code: a circuit breaker and a retry budget | Implement closed, open and half-open states and full-jitter retries | Code | 45 | Graded tests |
| 16.8 | Challenge 15: resilience | Slow and failing dependency; prove timeouts, the breaker and bulkheads keep p99 bounded | Build | 120 | `challenge-15-resilience` parts 1 to 3 |
| 16.9 | Microservices and resilience | Graded scenarios | Check | 20 | |
| 16.10 | Checklist and learning log | Written split-or-not decision for a growing product | Gate | 25 | |

### Module 17: Observability and reliability targets
Purpose: see inside a running system and agree what "reliable enough" means.
Hours: 6.0 (360 min)

| # | Chapter | One-line outcome | Type | Min | Play / practice |
|---|---|---|---|---|---|
| 17.1 | Set the scene: "it is slow" and no data | See an outage nobody can explain | Read | 10 | |
| 17.2 | Logs, metrics and traces | Say which question each one answers | Learn | 35 | Trace one request across services `[existing: TraceRequest]` |
| 17.3 | SLIs, SLOs and SLAs | Write an SLI and SLO, and see what an SLA adds | Learn | 40 | Pick a target and window; see the allowed bad minutes `[estimator]` |
| 17.4 | Error budgets and burn-rate alerts | Alert on fast and slow burns without paging for noise | Learn | 40 | Replay an incident; see which alerts fire `[timeline]` |
| 17.5 | Dashboards that help | Use RED and USE, and percentiles, not averages | Learn | 30 | Two services, same average, different p99 `[flow]` |
| 17.6 | Incidents and postmortems | Run an incident and write a blameless postmortem | Learn | 30 | Step through an incident `[stepper]` |
| 17.7 | Code: SLI and burn rate | Compute availability SLI and burn rate from request logs and decide to page | Code | 40 | Graded tests |
| 17.8 | Challenge 16: observability | Traces and metrics for a three-service app; an SLO burn-rate alert | Build | 90 | `challenge-16-observability` parts 1 and 2 |
| 17.9 | Observability and reliability | Graded scenarios | Check | 20 | |
| 17.10 | Checklist and learning log | Written SLOs for your capstone idea | Gate | 25 | |

### Module 18: Running it: Linux, containers, Kubernetes, CI/CD and the cloud
Purpose: package, ship and run services, and map every building block to cloud services.
Hours: 7.2 (430 min)

| # | Chapter | One-line outcome | Type | Min | Play / practice |
|---|---|---|---|---|---|
| 18.1 | Set the scene: works on my machine | See a deploy break because environments differ | Read | 10 | |
| 18.2 | Linux under containers: namespaces, cgroups, limits, signals | Explain what a container really is, and graceful shutdown | Learn | 40 | Layers of isolation: toggle each namespace and limit `[stepper]` |
| 18.3 | Docker images and containers | Build small images with good layer caching and health checks | Learn | 35 | Change one file; see which layers rebuild `[stepper]` |
| 18.4 | Kubernetes essentials | Explain pods, deployments, services, probes and autoscaling | Learn | 45 | Kill a pod, fail a readiness probe, scale on CPU `[cluster: kubernetes]` |
| 18.5 | CI/CD pipelines | Design a pipeline with tests, builds and gates | Learn | 35 | Step through a pipeline; break a test `[stepper]` |
| 18.6 | Deployment strategies | Compare rolling, blue-green, canary and feature flags by blast radius and rollback time | Learn | 40 | Canary percentage and error rate: users affected `[flow]` |
| 18.7 | Cloud building blocks | Map compute, storage, networking and managed data to AWS names and rough prices; meet local AWS emulators (moto, LocalStack) | Learn | 40 | Block explorer with AWS names and illustrative prices `[sandbox: explore mode]` |
| 18.8 | Challenge 17: ship it | Containers, GitHub Actions CI, a local Kubernetes deploy with kind; optional local S3 and SQS with moto (no account needed) | Build | 150 | `challenge-17-ship-it` parts 1 to 4 |
| 18.9 | Running it | Graded scenarios | Check | 15 | |
| 18.10 | Checklist and learning log | Written deploy and rollback plan | Gate | 20 | |

### Module 19: Multi-region and disaster recovery
Purpose: survive the loss of a data centre or a region, and know what it costs.
Hours: 4.8 (285 min)

| # | Chapter | One-line outcome | Type | Min | Play / practice |
|---|---|---|---|---|---|
| 19.1 | Set the scene: a region goes dark | See a single-region app go fully down | Read | 10 | |
| 19.2 | Regions, availability zones and failure domains | Spread across zones and compute the gain | Learn | 35 | Add zones; see availability and cost `[sandbox: availability mode]` |
| 19.3 | RPO, RTO, backups and point-in-time recovery | Find how much data and time a plan loses | Learn | 35 | Failure at time T: last backup, replication lag, data lost `[timeline]` |
| 19.4 | Active-passive and active-active | Compare failover time, cost and conflicts | Learn | 40 | Two regions: fail one; see failover and conflicts `[cluster]` |
| 19.5 | Global traffic routing | Use GeoDNS, anycast, latency-based routing and failover | Learn | 35 | Users by region: route and fail a region `[sandbox]` |
| 19.6 | Data residency and global consistency | Choose regional data or a global database, and pay the latency | Learn | 35 | Write latency across regions for each choice `[estimator]` |
| 19.7 | Lab: survive a region | Meet RPO under 1 minute and RTO under 15 minutes within budget | Lab | 50 | Sandbox lab, three levels |
| 19.8 | Multi-region and disaster recovery | Graded scenarios | Check | 20 | |
| 19.9 | Checklist and learning log | Written disaster recovery plan with numbers | Gate | 25 | |

Part 3 total: about 32.1 hours (50 chapters).

---

# Part 4: Designing real systems (modules 20 to 29)

Each case-study module follows the same shape so learners practise the loop: set the scene, requirements and estimates, the high-level design, two or three deep dives (each with a simulation), a code exercise for the key algorithm, a lab in the sandbox, a quiz, and a gate where the learner writes the design and defends one trade-off.

### Module 20: URL shortener and paste service
Hours: 4.3 (260 min)

| # | Chapter | One-line outcome | Type | Min | Play / practice |
|---|---|---|---|---|---|
| 20.1 | Set the scene and requirements | Turn "short links" into numbers: writes, reads, storage over five years | Read | 20 | `[estimator]` |
| 20.2 | High-level design | Draw the read path and write path | Learn | 35 | `[sandbox]` |
| 20.3 | Deep dive: generating short codes | Compare hashing, counters with base62 and pre-generated keys | Learn | 35 | Collision rate versus code length `[estimator]` |
| 20.4 | Deep dive: the read path at scale | Cache, redirects (301 or 302), analytics without slowing redirects | Learn | 35 | Hit rate and redirect latency `[flow]` |
| 20.5 | Code: base62 and a key range allocator | Implement both | Code | 40 | Graded tests |
| 20.6 | Lab: a URL shortener with cache-aside | Serve 100,000 redirects per second with cache-aside in front of the store, within latency and budget targets | Lab | 50 | Sandbox lab, three levels |
| 20.7 | URL shortener | Graded scenarios | Check | 15 | |
| 20.8 | Checklist and learning log | Written design with one defended trade-off | Gate | 30 | |

### Module 21: News feed and timelines
Hours: 4.5 (270 min)

| # | Chapter | One-line outcome | Type | Min | Play / practice |
|---|---|---|---|---|---|
| 21.1 | Set the scene and requirements | Estimate posts, follows and feed reads | Read | 20 | `[estimator]` |
| 21.2 | High-level design | Separate post storage, the social graph and feed building | Learn | 35 | `[sandbox]` |
| 21.3 | Deep dive: fan-out on write or on read | Choose per user, and handle celebrities with a hybrid | Learn | 40 | Follower distribution: write cost versus read cost per approach `[flow]` |
| 21.4 | Deep dive: ranking and freshness | Build a candidate, rank, serve pipeline with caching | Learn | 35 | `[sequence]` |
| 21.5 | Code: merge k sorted timelines | Implement a heap-based merge with paging | Code | 40 | Graded tests |
| 21.6 | Lab: news feed, fan-out on write or on read | Serve feeds for 50 million daily users with a few celebrity accounts; pick push, pull or hybrid per account | Lab | 50 | Sandbox lab, three levels |
| 21.7 | News feed | Graded scenarios | Check | 20 | |
| 21.8 | Checklist and learning log | Written design with one defended trade-off | Gate | 30 | |

### Module 22: Chat, presence and notifications
Hours: 5.8 (350 min)

| # | Chapter | One-line outcome | Type | Min | Play / practice |
|---|---|---|---|---|---|
| 22.1 | Set the scene and requirements | Estimate messages, connections and devices | Read | 20 | `[estimator]` |
| 22.2 | High-level design | Connection gateways, message service, storage, delivery | Learn | 35 | `[sandbox]` |
| 22.3 | Deep dive: connections at scale | Route a user to their connection server; handle reconnects | Learn | 35 | Connections per server and a server restart `[cluster]` |
| 22.4 | Deep dive: ordering, delivery receipts and presence | Order per conversation, dedupe on retry, show online status cheaply | Learn | 40 | Sequence numbers per conversation `[timeline]` |
| 22.5 | Deep dive: a notification system | Fan out push, email and SMS with preferences, retries and rate limits | Learn | 35 | `[flow]` |
| 22.6 | Code: per-conversation sequencing and dedupe | Implement it | Code | 40 | Graded tests |
| 22.7 | Lab: chat for 10 million users on a fixed hourly budget | Keep messages under 200 ms end to end while the bill stays under a budget per hour | Lab | 50 | Sandbox lab, three levels |
| 22.8 | Lab: a notification system that never loses a message | Deliver push, email and SMS with retries, dead letters and per-user limits, with zero lost messages when a provider fails | Lab | 45 | Sandbox lab, three levels |
| 22.9 | Chat and notifications | Graded scenarios | Check | 20 | |
| 22.10 | Checklist and learning log | Written design with one defended trade-off | Gate | 30 | |

### Module 23: Search, typeahead and probabilistic data structures
Hours: 4.7 (280 min)

| # | Chapter | One-line outcome | Type | Min | Play / practice |
|---|---|---|---|---|---|
| 23.1 | Set the scene and requirements | Estimate documents, queries and index size | Read | 15 | `[estimator]` |
| 23.2 | Inverted indexes and ranking basics | Explain how a search engine finds and orders documents, and how the index is sharded | Learn | 40 | Build a tiny index from three documents `[stepper]` |
| 23.3 | Typeahead | Serve prefixes fast with tries and precomputed top results | Learn | 35 | `[stepper]` |
| 23.4 | Bloom filters, HyperLogLog and count-min sketch | Trade a little accuracy for a lot of memory | Learn | 45 | Bloom filter false positives versus bits and hashes; HyperLogLog error versus registers `[estimator]` |
| 23.5 | Code: a Bloom filter and a count-min sketch | Implement both; tests check error bounds | Code | 45 | Graded tests |
| 23.6 | Lab: autocomplete under 100 ms | Serve typeahead for a large catalogue with p99 under 100 ms at peak | Lab | 50 | Sandbox lab, three levels |
| 23.7 | Search and probabilistic structures | Graded scenarios | Check | 20 | |
| 23.8 | Checklist and learning log | Written design with one defended trade-off | Gate | 30 | |

### Module 24: Geospatial search and ride matching
Hours: 4.5 (270 min)

| # | Chapter | One-line outcome | Type | Min | Play / practice |
|---|---|---|---|---|---|
| 24.1 | Set the scene and requirements | Estimate drivers, location updates and searches | Read | 15 | `[estimator]` |
| 24.2 | Geohashes, quadtrees and hexagon grids | Find nearby points and handle cell edges | Learn | 40 | Geohash precision and neighbour cells on a grid `[stepper]` |
| 24.3 | Location updates at scale | Handle millions of updates without hitting the database each time | Learn | 35 | Update rate versus write load `[flow]` |
| 24.4 | Matching and dispatch | Match riders to drivers fairly and fast | Learn | 35 | `[sequence]` |
| 24.5 | Code: geohash encode and neighbours | Implement both | Code | 45 | Graded tests |
| 24.6 | Lab: nearby drivers in one city | Meet targets in the sandbox | Lab | 50 | Sandbox lab, three levels |
| 24.7 | Geospatial | Graded scenarios | Check | 20 | |
| 24.8 | Checklist and learning log | Written design with one defended trade-off | Gate | 30 | |

### Module 25: Booking and payments: contention and money
Hours: 4.6 (275 min)

| # | Chapter | One-line outcome | Type | Min | Play / practice |
|---|---|---|---|---|---|
| 25.1 | Set the scene and requirements | Estimate a ticket drop: buyers, seats, payment calls | Read | 15 | `[estimator]` |
| 25.2 | Holds, inventory and fairness | Hold seats safely under contention, with expiry | Learn | 40 | Seat hold race `[existing: ticketline-seat-hold-race]` |
| 25.3 | Ledgers and double-entry | Keep money correct with append-only entries that always balance | Learn | 40 | Post entries; the invariant breaks if one side is missing `[stepper]` |
| 25.4 | Payment providers, webhooks and reconciliation | Handle duplicate, late and missing webhooks | Learn | 35 | `[state]` |
| 25.5 | Code: a double-entry ledger | Implement posting with the balance invariant and idempotency | Code | 45 | Graded tests |
| 25.6 | Lab: a concert ticket drop | Meet targets in the sandbox | Lab | 50 | Sandbox lab, three levels |
| 25.7 | Booking and payments | Graded scenarios | Check | 20 | |
| 25.8 | Checklist and learning log | Written design with one defended trade-off | Gate | 30 | |

### Module 26: Web crawler
Hours: 4.4 (265 min)

| # | Chapter | One-line outcome | Type | Min | Play / practice |
|---|---|---|---|---|---|
| 26.1 | Set the scene and requirements | Estimate pages, bandwidth and storage to crawl billions of pages a month | Read | 15 | `[estimator]` |
| 26.2 | High-level design | Connect the URL frontier, fetchers, parsers, duplicate checks and storage | Learn | 35 | `[sandbox]` |
| 26.3 | Deep dive: the URL frontier, politeness and priority | Crawl fast without hammering any one site | Learn | 40 | Per-host queues and a politeness delay: pages per second versus number of hosts `[flow]` |
| 26.4 | Deep dive: duplicates and crawler traps | Skip seen URLs and near-duplicate pages with Bloom filters and fingerprints; escape infinite link traps | Learn | 35 | Bloom filter memory versus false positives at billions of URLs `[estimator]` |
| 26.5 | Code: a polite frontier | Implement per-host queues with a delay and priorities | Code | 45 | Graded tests |
| 26.6 | Lab: crawl billions of pages a month | Meet throughput, politeness and budget targets | Lab | 50 | Sandbox lab, three levels |
| 26.7 | Web crawler | Graded scenarios | Check | 15 | |
| 26.8 | Checklist and learning log | Written design with one defended trade-off | Gate | 30 | |

### Module 27: Video platform at scale
Hours: 5.2 (310 min)

| # | Chapter | One-line outcome | Type | Min | Play / practice |
|---|---|---|---|---|---|
| 27.1 | Set the scene and requirements | Estimate uploads per minute, daily views, storage and egress | Read | 15 | `[estimator]` |
| 27.2 | High-level design | Connect upload, the transcoding pipeline, object storage, metadata and CDN delivery | Learn | 35 | `[sandbox]` |
| 27.3 | Deep dive: uploads and transcoding | Upload in chunks and queue transcode jobs for several resolutions | Learn | 40 | Upload rate versus transcode workers: backlog over time `[flow]` |
| 27.4 | Deep dive: streaming and the CDN | Serve adaptive bitrate segments; see popular and long-tail videos cost differently | Learn | 40 | Popularity skew versus CDN hit rate and egress cost `[flow]` |
| 27.5 | Deep dive: view counts and metadata | Count views fast with sharded counters and accept small, bounded error | Learn | 30 | Counter shards versus write hot spots `[estimator]` |
| 27.6 | Code: sharded counters | Implement a sharded counter with a periodic merge | Code | 40 | Graded tests |
| 27.7 | Lab: a video platform with a billion daily views | Meet upload, start-up time, availability and egress budget targets | Lab | 60 | Sandbox lab, three levels |
| 27.8 | Video platform | Graded scenarios | Check | 20 | |
| 27.9 | Checklist and learning log | Written design with one defended trade-off | Gate | 30 | |

### Module 28: The system design interview
Purpose: run the design loop under time pressure and defend it.
Hours: 4.2 (250 min)

| # | Chapter | One-line outcome | Type | Min | Play / practice |
|---|---|---|---|---|---|
| 28.1 | Set the scene: 45 minutes, one blank board | See how the round is scored | Read | 10 | |
| 28.2 | A framework that fits the clock | Spend time where the score is | Learn | 35 | Time budget per step `[stepper]` |
| 28.3 | Follow-up probes and how to answer them | Answer "what if traffic grows 10 times?" and "what breaks first?" with numbers | Learn | 40 | Probe bank with model answers `[stepper]` |
| 28.4 | Mock round: design a rate limiter as a service | Timed design in the sandbox | Lab | 60 | Sandbox lab, timed |
| 28.5 | Mock round: design a file storage service | Timed design in the sandbox | Lab | 60 | Sandbox lab, timed |
| 28.6 | Interview craft | Graded scenarios on choosing the stronger answer | Check | 15 | |
| 28.7 | Checklist and learning log | Recorded or written mock answer | Gate | 30 | |

### Module 29: Capstone: design it, build it, break it, defend it
Hours: 14.0 (840 min)

| # | Chapter | One-line outcome | Type | Min | Play / practice |
|---|---|---|---|---|---|
| 29.1 | Choose your system and read the rubric | Pick one of three scenarios; read must-haves and the rubric | Read | 30 | |
| 29.2 | Design document and capstone lab | Requirements, estimates, design, and a sandbox design that meets the targets | Lab | 180 | Sandbox lab, capstone targets |
| 29.3 | Build the core | Build the core of the design in your repository with tests and CI | Build | 360 | `challenge-18-capstone` |
| 29.4 | Break it on purpose | Run one failure experiment (kill a node, add lag, cut the network); chart the result | Build | 150 | |
| 29.5 | Record your defence | Five-minute walkthrough plus answers to three probes | Build | 90 | |
| 29.6 | Checklist and learning log | Final checks; compare with your sketch from 1.1 | Gate | 30 | |

Part 4 total: about 56.2 hours (80 chapters).

## Totals

| Part | Modules | Hours | Weeks at 12 h |
|---|---|---|---|
| 1. Foundations | 1 to 6 | 40.3 | 3 to 4 |
| 2. Data and distributed correctness | 7 to 14 | 62.7 | 5 to 6 |
| 3. Async work, resilience and operations | 15 to 19 | 32.1 | 3 |
| 4. Designing real systems | 20 to 29 | 56.2 | 5 to 6 |
| **Total** | **29 modules, 280 chapters** | **about 191** | **16 to 19** |

Interactive simulations: one in every Learn chapter (131) and in eleven set-the-scene chapters, about 142 in total, built on 8 kit renderers plus the existing 4 (see `03-simulation-kit.md`). About 95% of them are data-only configurations; custom components are limited to the sandbox modes and the Raft and Kubernetes cluster modes.

Code exercises: 24. GitHub challenges: 19 (0 to 17 plus the capstone). Labs: 18 (see "Labs" below).

## Labs

Labs are the ScaleDojo-style part of the course: short, playable system design scenarios in the architecture sandbox. Every lab has the same shape so learners know what to do:

1. **The scenario in one screen.** A real product moment ("a sale starts in 10 minutes", "a video goes viral") with the targets: requests per second, p99 latency, availability, and a budget per hour.
2. **Build.** Pick blocks (CDN, load balancer, app tier, cache, database, replicas, shards, queue, workers, storage) and an instance size and count for each tier. Every block shows what it costs per hour.
3. **Run it and watch it move.** Requests animate through the design: cache hits return early, misses travel to the database, overloaded tiers turn amber and then red, and dropped requests are counted. Summary cards show throughput, p99, availability and cost per hour against the targets.
4. **Three levels.** Level 1 is a modest load, level 2 multiplies it (often 10 times), level 3 adds a failure or a skew (a zone goes down, a celebrity key, a provider outage). A design that passed level 1 usually fails level 2 for a reason the module just taught.
5. **Explain.** After passing, the learner writes two sentences: which target was hardest and which block fixed it. The lab's open question also asks what the sandbox left out that would matter in production.

| Lab | Chapter | Level 3 twist |
|---|---|---|
| Three tiers at 10,000 requests per second | 4.9 | One app instance fails |
| CDN level 1: make a slow site load instantly | 5.10 | The origin is in another continent and the CDN cache is purged |
| A distributed rate limiter with shared state | 6.10 | The shared counter store slows down |
| 100 million keys on a hash ring | 9.9 | A celebrity seller, then one more shard |
| A distributed key-value store | 13.10 | A zone goes down during writes |
| Survive a region | 19.7 | The primary region is lost |
| A URL shortener with cache-aside | 20.6 | A link goes viral and its cache entry expires |
| News feed: fan-out on write or on read | 21.6 | An account with 50 million followers posts |
| Chat for 10 million users on a fixed hourly budget | 22.7 | Traffic doubles and the budget does not |
| A notification system that never loses a message | 22.8 | The SMS provider fails for five minutes |
| Autocomplete under 100 ms | 23.6 | A trending query spikes |
| Nearby drivers in one city | 24.6 | Rush hour location updates |
| A concert ticket drop | 25.6 | 500,000 buyers in the first minute |
| Crawl billions of pages a month | 26.6 | One site is a crawler trap |
| A video platform with a billion daily views | 27.7 | A long-tail video catalogue blows the CDN hit rate |
| Mock rounds: rate limiter and file storage | 28.4, 28.5 | Timed |
| Capstone lab | 29.2 | The scenario's own targets |

Labs reuse one sandbox model (see `03-simulation-kit.md` → The architecture sandbox), so each new lab is a data file: scenario, targets, levels, the blocks allowed, and hints. The later AWS course reuses the same labs with real AWS services and prices.

## The challenges repository

- Template: `devweekends/system-design-challenges` (public, starter code with failing tests). Learners press "Use this template" to create their own `system-design-challenges`.
- Layout: `challenges/challenge-N-short-name/part-N-short-name/` with `README.md`, one script, `results.md`, `chart.svg` and a test per part. Shared code lives in `toolkit/` (load generator, percentile histogram, chart drawer, and `simnet`, a seeded simulated network with clocks, delays, drops and partitions). The README per challenge starts with a 101 glossary, then for each part: the idea from zero with an everyday analogy, a step table linking exact code lines, where each number comes from, the real results and the chart.
- Stack: Node.js 24 LTS (supported to April 2028; Node 22 ends in April 2027, during the course), `node:test`, Docker Compose. Images: Valkey, Postgres, nginx, Redpanda, etcd, Jaeger, Prometheus; moto for local S3 and SQS in challenge 17, optional. Pin every image to a version tag (for example `apache/kafka:latest` lags behind its newest tag). Download sizes stated per challenge.
- Reference solutions: `AQIB-NAWAB/buildment-courses/system-design/` (private), used as the answer key and mentor help, per `02-course-architecture.md` → Reference builds.

| Challenge | Module | Parts |
|---|---|---|
| 0 repository setup | 1 | toolkit check, Docker check |
| 1 measure-a-server | 2 | the knee, percentiles lie, Little's law |
| 2 network-costs | 3 | handshakes, keep-alive, polling versus WebSockets |
| 3 load-balancer | 4 | round-robin proxy, health checks, least loaded and two choices |
| 4 cache-in-front | 5 | cache-aside, TTL and hit rate, stampede |
| 5 rate-limiter | 6 | token bucket, sliding window, shared limit in Valkey, idempotency keys |
| 6 last-ticket | 7 | lost update, row locks, compare-and-set, serializable with retries |
| 7 replicas-and-lag | 8 | primary and replica, the read-your-writes bug, position tokens |
| 8 sharding | 9 | hash ring, virtual nodes, hot key |
| 9 clocks | 10 | drift, Lamport, vector clocks, hybrid clocks, Snowflake IDs |
| 10 consistency | 11 | session tokens, anomaly counts before and after |
| 11 raft | 12 | election, log replication, partitions |
| 12 leaderless-kv | 13 | quorums, hinted handoff, siblings, CRDT cart |
| 13 order-saga | 14 | outbox, saga, crash tests |
| 14 queue-worker | 15 | consumer group, retries and dead letters, windows |
| 15 resilience | 16 | timeouts and retries, circuit breaker, bulkheads |
| 16 observability | 17 | traces, SLO burn rate |
| 17 ship-it | 18 | containers, CI, kind, local S3 and SQS with moto (optional) |
| 18 capstone | 29 | the learner's chosen system |

## In AWS (one note per module)

Each module ends with a short "In AWS" note naming the service that implements the idea, for the later AWS course. Draft mapping, to be verified in the research dossier: 2 CloudWatch percentiles; 3 Route 53, CloudFront, Global Accelerator; 4 EC2 instance families, Elastic Load Balancing (ALB, NLB), Auto Scaling groups; 5 ElastiCache, CloudFront; 6 API Gateway, AWS WAF rate-based rules, Cognito; 7 RDS, Aurora, DynamoDB conditional writes; 8 RDS and Aurora replicas; 9 DynamoDB partitions; 10 Amazon Time Sync Service and ClockBound; 11 DynamoDB strongly consistent reads, Aurora; 12 etcd on EKS, DynamoDB-based locks; 13 DynamoDB, global tables; 14 Step Functions for sagas; 15 SQS, SNS, Kinesis, MSK, EventBridge; 16 Cloud Map; 17 CloudWatch and OpenTelemetry (the X-Ray SDKs and daemon entered maintenance mode on 2026-02-25); 18 ECR, ECS, EKS, CodePipeline; 19 multi-AZ, Route 53 failover, Aurora Global Database, AWS Backup.

## Gate evidence at a glance

| Module | Gate evidence |
|---|---|
| 1 | Requirements and the driving number for an app the learner uses (120 words) |
| 2 | Estimate for a photo-sharing app with working shown (150 words) plus challenge 1 results link |
| 3 | Real-time choice for delivery tracking with numbers (120 words) plus challenge 2 link |
| 4 | Defence of the 4.9 sandbox design (150 words) plus challenge 3 link |
| 5 | Cache plan for a product page (150 words) plus challenge 4 link |
| 6 | API design for a payments endpoint (150 words) plus challenge 5 link |
| 7 | Store and concurrency control for inventory (150 words) plus challenge 6 link |
| 8 | Replication plan for a social app (150 words) plus challenge 7 link |
| 9 | Partition key and hot-key plan (150 words) plus challenge 8 link |
| 10 | Ordering two writes 1 ms apart, and the cost (150 words) plus challenge 9 link |
| 11 | Consistency per feature (150 words) plus challenge 10 link |
| 12 | Single-run job scheduler design (150 words) plus challenge 11 link |
| 13 | Conflict strategy for three features (150 words) plus challenge 12 link |
| 14 | Checkout saga failure walk-through (150 words) plus challenge 13 link |
| 15 | Async design for order emails (120 words) plus challenge 14 link |
| 16 | Split-or-not decision (150 words) plus challenge 15 link |
| 17 | SLOs for the capstone idea (120 words) plus challenge 16 link |
| 18 | Deploy and rollback plan (120 words) plus challenge 17 link |
| 19 | Disaster recovery plan with RPO and RTO (150 words) |
| 20 to 27 | Written design with one defended trade-off (250 words) plus the sandbox design |
| 28 | Recorded or written mock answer |
| 29 | Capstone submitted in 29.2 to 29.5 |

## Capstone

- Scenarios (pick one, fictional composites): (a) a link service for an NGO's campaigns that must survive a traffic spike from a viral post; (b) a timeline service for a student community app with a few very popular accounts; (c) an always-writable shopping cart and inventory service for a small marketplace across two regions.
- What the learner submits: a design document (requirements, estimates, high-level design, deep dives, consistency choices, failure modes, SLOs); a sandbox design that passes the scenario's cost, p99 latency and availability targets; the core built in `challenge-18-capstone` with tests passing in CI; one failure experiment with a chart in `results.md`; a recorded five-minute defence and answers to three probes.
- How a mentor reviews it: rubric in 29.1 (requirements and numbers, design choices, correctness under failure, evidence, communication), under 45 minutes, then one to three follow-up probes.
- Out of scope for the capstone: a public deployed URL, a real cloud account, authentication beyond a stub.

## Variants

None. Follow-on tracks (roadmap only): the AWS solutions architecture course (ScaleDojo style, real services and prices, reusing the sandbox), a data-intensive track, an interview-intensive track.

## Out of scope

- Low-level and object-oriented design.
- Algorithm drills beyond the data structures systems use.
- Byzantine fault tolerance and formal verification (named, not taught).
- A real AWS account or any spending. AWS depth belongs to the separate AWS course.

## Open decisions for instructors

| # | Decision | Recommendation | Instructor decision |
|---|---|---|---|
| 1 | Size: about 191 hours is far beyond the pipeline's other courses. | Publish as one course in four parts, each part unlocking the next and ending in its own certificate-worthy evidence. If the platform needs it, publish the four parts as four linked courses. | |
| 2 | Interactive-first changes the IP's density rules (one canvas per chapter, two per module). | Approve `proposals/2026-10-23-interactive-first.md` before the blueprint, so the blueprint is written to the new rules. | |
| 3 | Labs must record pass or fail per level, which needs a new block type with a response schema, not just a canvas. | Approve a `lab` block as a platform change; until it ships, the sandbox shows the result and the learner pastes the shareable design link into an open question. | |
| 4 | Sandbox prices: real AWS prices change and differ by region. | Use a dated, illustrative price table for one region, labelled as such; the AWS course uses real pricing. | |
| 5 | Shared simulation core: one seeded simulator used by both the in-browser canvases and the challenges toolkit. | Build it once as a small TypeScript package vendored into both places, so learners run their own code on the same network model they played with. | |
| 6 | Order of modules 10 (clocks) and 11 (consistency). | Keep clocks first: consistency models need ordering, and the TrueTime chapter answers the sponsor's question directly. | |
| 7 | Docker on low-end laptops: some challenges need three or four containers. | State RAM and download sizes; offer a "no Docker" path for challenges whose core runs on the in-process `simnet` (9, 11, 12). | |
| 8 | Reference solutions for 19 challenges and 24 code exercises are a large build. | Build them part by part alongside the chapters; no Build chapter ships without its reference solution passing. | |
| 9 | Overlap with the ticketing course (seat holds) and the AI interview course (system design round). | Reuse the seat-hold canvas; cross-reference rather than repeat. | |

## Confirmation

G2B status: **pending**.

| Instructor | Role | Decision (approve/revise/reject) | Comments | Date |
|---|---|---|---|---|
| | | | | |
| | | | | |
