---
artifact: research-dossier
course: system-design
version: 1
status: draft
owner: research
sources_checked: 2026-10-23
hard_constraints:
  - The browser runs JavaScript only; challenges run on Node.js, and Node 22 reaches end of life on 2027-04-30, inside the course window
  - Phones, weak data and modest laptops; every Docker image and download must be sized and small
  - No paid cloud, and LocalStack Community no longer exists as a separate free image (account, auth token and non-commercial Hobby terms since 2026-03-23)
  - Numbers decay and myths spread; every latency, clock and lag number must be dated, sourced and shown with its model limits
  - Correctness topics (consistency, clocks, consensus) are easy to teach wrong; ESL learners need precise, plain definitions inside a 191-hour course
out_of_scope:
  - Byzantine fault tolerance, formal verification (TLA+), proofs of FLP or CAP
  - Building a storage engine, a production consensus library or a CRDT library
  - Full Paxos variants (Multi-Paxos, EPaxos, Flexible Paxos) beyond one worked example
  - Kubernetes operations beyond pods, deployments, services, probes and autoscaling
  - Vendor tours and certification prep, including a tour of AWS services
  - Per-vendor prices as facts (the sandbox uses dated, illustrative prices only)
open_questions:
  - LocalStack path given the 2026-03-23 change (Hobby account, pinned 4.14, moto, or drop)
  - Node.js version for the challenges repository (22, 24 or 26)
  - Kafka-compatible broker image (Redpanda, apache/kafka-native or apache/kafka)
  - Valkey or Redis as the default key-value image
  - Whether kind (Kubernetes in Docker) is affordable on learner laptops
  - Relabel the TrueTime canvas example, which is not in the Spanner paper
  - Latency table policy (classic column plus 2026 measured column)
  - Module 17 AWS mapping now that X-Ray SDKs are in maintenance mode
---

# Research dossier: system-design

All claims carry a source ID in square brackets, for example [S60]. The source table at the end gives the URL, the type, the date checked and a confidence level. Every source was checked on 2026-10-23 unless its row says otherwise. Claims marked **UNVERIFIED** must not appear in learner-facing text as fact. Real products, papers and incidents may be named with sources (course brief, "Legal"); learner scenarios remain fictional composites.

How to use this dossier: the "Topic findings" section is ordered like the roadmap (Parts 1 to 4). Each topic lists the claims writers may use, with sources, then "Teach with care" notes. "Numbers we will use" and "Common misconceptions to teach against" are the two sections writers and canvas builders should open first.

## Learner and context

**Who.** Gaza fellowship fellows and other early-career engineers who can build a web app but have not designed a system for many users. Some are preparing for system design interviews. English is a second language for many. [S146]

**What they already know.** JavaScript (functions, objects, async/await, Node.js basics), HTTP and JSON APIs, one SQL database, Git and GitHub, the command line. No distributed systems knowledge. [S146]

**Device and connection.** Many read on phones over weak or expensive data. Every Learn chapter, simulation and quiz must work at 375 px. Build chapters need a laptop with Node.js and Docker, with every download size stated. [S146]

**Time.** About 12 hours a week. The roadmap totals about 191 hours across 29 modules and four parts (16 to 19 weeks). [S146] That is below the 210 to 280 hour flagship default, which the architecture allows when a course states its own budget [S144b]. Research depth was set to match: one primary source per idea, not a literature review.

**Platform facts that shape the research.** `CodeExercise` runs JavaScript only [S144]. Only registered canvas slugs render; two system design canvases already exist, `sysdesign-truetime-commit-wait` and `sysdesign-replica-lag` [S145]. Both cite this dossier for their numbers, so the dossier checks them (see "Notes on the two existing canvases").

**What they will leave with.** A public `system-design-challenges` repository with measured results and charts, a design document with numbers, and a recorded defence. [S146]

## Domain model

System design has no single product, so the "domain" here is the set of moving parts every module reuses. The simulation kit and the challenges should use these names consistently.

### Actors and parts

| Part | What it does | The invariant or limit that matters |
|---|---|---|
| Client | Sends requests, retries, caches, holds a session | Retries multiply load [S89]; a session can carry a "last write seen" token [S50] |
| Resolver and DNS | Turns names into addresses, caches answers for the TTL | A record may be cached for its TTL; TTL 0 means do not cache [S9] |
| Edge or CDN | Caches responses near users | Freshness follows `Cache-Control` [S22] |
| Load balancer (L4 or L7) | Spreads connections or requests over servers | L4 picks per connection by flow hash; L7 picks per request [S15] |
| Stateless app server | Runs business logic | Can be replaced or scaled because it holds no unique state |
| Cache | Holds copies of hot data | Not the source of truth; may be evicted [S24] |
| Database (leader and replicas) | Stores the source of truth | Async replicas lag [S38, S39] |
| Partition (shard) | A slice of the keyspace on some nodes | Has a throughput ceiling (for example 3,000 read units and 1,000 write units per second per DynamoDB partition) [S40] |
| Queue or log | Holds work or events between producer and consumer | Delivery is at least once by default [S82, S83]; order holds only inside a partition [S81] |
| Coordinator (etcd, ZooKeeper, Raft group) | Elects leaders, holds locks and config | Needs a majority to make progress [S68] |
| Clock | Gives each node a time | Drifts; NTP or PTP corrects it; error is bounded only if measured [S52, S62] |

### Vocabulary for the glossary

Plain definitions writers can adapt. Each term should become a `GlossaryTerm` on first use.

| Term | Plain definition |
|---|---|
| Latency | Time for one request from start to finish. Report percentiles, not the average [S95]. |
| Throughput | Requests finished per second. |
| Percentile (p99) | The time under which 99 of every 100 requests finish [S95]. |
| Utilisation | Share of time a server is busy: arrival rate divided by service rate [S7]. |
| Little's law | Items in the system = arrival rate times time in the system (L = lambda W) [S5]. |
| TTL | How long a stored copy may be used before checking again [S9, S22]. |
| Idempotent | Safe to repeat: doing it twice has the same effect as once [S80, S89]. |
| Replica | A copy of the data on another node. |
| Replication lag | How far a replica is behind the leader. |
| Partition (sharding) | Splitting data so each node holds part of it. |
| Network partition | Some nodes cannot reach others for a while [S55]. |
| Linearizable | Every operation seems to happen at one instant, in real-time order [S47]. |
| Serializable | Transactions seem to run one at a time, in some order. Not the same as linearizable [S46, S52]. |
| Causal consistency | If one event could have caused another, everyone sees them in that order [S49]. |
| Read-your-writes | After you write, your own reads show that write [S50]. |
| Monotonic reads | Your reads never go back to an older state [S50]. |
| Quorum | A group large enough that any two groups share a member, for example a majority [S45, S52]. |
| Consensus | Nodes agree on one value or one order of commands despite failures [S67, S68]. |
| Term (Raft) | A numbered period with at most one leader; acts as a logical clock [S68]. |
| Lease | A lock that expires after a set time unless renewed [S53, S70]. |
| Fencing token | A number that grows with each new lock holder; storage rejects older numbers [S70]. |
| Lamport clock | A counter that orders events consistently with cause and effect [S58]. |
| Vector clock | One counter per node; can tell "happened before" from "concurrent" [S45, S52]. |
| Hybrid logical clock | A physical time plus a logical counter, close to NTP time but causal [S59]. |
| Clock uncertainty (epsilon) | How far the true time might be from what the clock says [S60]. |
| CRDT | A data type whose replicas always converge without coordination [S74, S75]. |
| Saga | A chain of local transactions with compensating steps to undo a partial run [S78]. |
| Outbox | A table written in the same transaction as the business change, later published [S79]. |
| Backpressure | A slow consumer telling a fast producer to pause [S88]. |
| Circuit breaker | Stops calls to a failing dependency for a while, then tests it [S92]. |
| Bulkhead | Separate pools so one failure cannot use up every resource [S93]. |
| SLI, SLO, SLA | Measure, target, and contract with consequences [S95]. |
| Error budget | How much failure the SLO allows in a period [S96]. |

## Hard constraints

These five constraints change the architecture of the course, not only its wording.

### 1. JavaScript only in the browser; Node.js in the repository, with a version clock running

`CodeExercise` runs JavaScript only [S144], and the brief keeps one language across the course [S146]. Good graded exercises are small, deterministic algorithms: token bucket, sliding window counter, consistent hash ring with virtual nodes, Lamport and vector clocks, hybrid logical clock update rules, G-Counter and PN-Counter merge, quorum overlap check, exponential backoff with full jitter, Little's law and M/M/1 calculators, Bloom filter, percentile from a histogram, Snowflake ID packing.

The brief fixes Node.js 22 LTS. Node 22 entered maintenance on 2025-10-21 and reaches end of life on **2027-04-30**. Node 24 is in maintenance LTS from 2026-10-20 to 2028-04-30, and Node 26 becomes LTS on **2026-10-28** [S128]. A 16 to 19 week course starting now ends near Node 22's end of life. Recommendation for the open question: Node 24 for the template, tested on 22 and 26.

### 2. Phones, weak data and modest laptops

Compressed image sizes for linux/amd64, measured from the Docker Hub and Quay APIs on 2026-10-23 [S119, S120]:

| Image | Tag | Compressed size (amd64) | Licence | Notes |
|---|---|---|---|---|
| `valkey/valkey` | `9-alpine` | 18.8 MB | BSD-3-Clause [S125] | `8-alpine` is 17.5 MB |
| `redis` | `8-alpine` | 39.1 MB | Redis 8+: RSALv2, SSPLv1 or AGPLv3 [S124] | Full `8` is 55.6 MB |
| `postgres` | `18-alpine` | 120.0 MB | PostgreSQL licence (not re-checked) | `17-alpine` is 117.2 MB |
| `nginx` | `stable-alpine` | 26.0 MB | BSD-2 (not re-checked) | |
| `redpandadata/redpanda` | `latest` (v26.2.6) | 122.3 MB | Core under BSL, converts to Apache 2 at a change date [S126] | |
| `apache/kafka` | `4.4.0` / `latest` | 238.9 MB (`latest`) | Apache 2.0 | `latest` was last pushed 2026-06-24 while `4.4.0` was pushed 2026-10-22: pin a version |
| `apache/kafka-native` | `latest` | 55.1 MB | Apache 2.0 | GraalVM native broker, "non-production development and testing" [S118] |
| `quay.io/coreos/etcd` | `v3.7.3` | 22.9 MB | Apache 2.0 (not re-checked) | `v3.6.16` is 24.3 MB |
| `jaegertracing/jaeger` | `latest` | 55.1 MB | | |
| `prom/prometheus` | `latest` | 114.1 MB | | |
| `grafana/grafana` | `latest` | 482.6 MB | | Too large for a default path |
| `kindest/node` | `v1.37.0` | 388.2 MB | | Needed for kind; plus the kind binary |
| `localstack/localstack` | `latest` (2026.x) | 348.6 MB | Requires account and auth token [S121, S122] | See constraint 3 |
| `motoserver/moto` | `latest` (5.2.4) | 104.3 MB | Apache-2.0 [S127] | Alternative AWS mock |
| `node` | `24-alpine` | 62.5 MB | | `22-alpine` is 61.3 MB |

A default stack of Valkey, Postgres, nginx and etcd is about 190 MB compressed. Adding Redpanda brings it to about 310 MB; using `apache/kafka-native` instead brings it to about 245 MB. Docker Desktop itself was not measured (**UNVERIFIED**).

### 3. No paid cloud, and LocalStack Community is gone as a free anonymous image

The brief says "LocalStack community edition only". That product no longer exists in the form the brief assumes:

- LocalStack announced on 2026-03-05 that from 2026-03-23 it ships "a single, unified container image" and the latest releases need an account and an auth token, including in CI [S121].
- Release 2026.3.0 (2026-03-23) merged the community and pro images. `localstack/localstack` and `localstack/localstack-pro` now hold the same image, and the services you get depend on your token's entitlements. A bypass variable worked only until 2026-04-06. Versions are now calendar-based, `YYYY.MM.patch` [S122].
- The free plan is **Hobby**: free, but "The terms of the Hobby plan prohibit use for commercial purposes", 30+ emulated services, one personal sandbox [S123]. The pricing page's service matrix suggests Hobby includes S3, SQS, SNS, DynamoDB, Lambda, API Gateway (REST), Kinesis, EventBridge, CloudWatch and IAM, but not ECS, RDS or ElastiCache. That matrix was read through a summariser that inferred it from icon order (**UNVERIFIED**, check by hand).
- The last semver tags on Docker Hub are `4.14` (2026-02-26) and `4.13.1` [S119]. LocalStack calls pinning "an older Community tag, such as 4.12" "a valid short-term approach" and warns of drift and "unpatched CVEs" [S121]. Whether 4.13 and 4.14 run without a token is **UNVERIFIED**.
- moto 5.2.4 (2026-10-11) is Apache-2.0 and ships a server image of about 104 MB [S127]. It needs no account. Its service coverage was not checked against challenge 17 (**UNVERIFIED**).

Design consequence: challenge 17's optional LocalStack part needs a decision (see Open questions). Do not tell learners LocalStack is free and anonymous.

### 4. Numbers decay, and simulations can lie

The most copied latency table is old. The System Design Primer table (CC BY 4.0) still lists SSD sequential reads at about 1 GB/s and a 500 microsecond round trip inside a datacenter [S4]. Colin Scott's interactive page extrapolates from Norvig's circa-2002 numbers with simple growth curves; many of its values are formulas or constants, not measurements [S2]. The napkin-math project re-measured its single-host rows on 2026-03-08 on GCP `c4-standard-48-lssd` machines and its blob rows on 2026-03-09, but its author warns some numbers are 2 to 3 times off and rounded for easy arithmetic [S3]. Design consequences: every number in a chapter or canvas carries its source and date; canvases state their model limits [S145]; the "Numbers we will use" table below is the single source for writers.

### 5. Correctness topics are subtle, and the learners read in a second language

Consistency, clocks and consensus are where courses most often teach myths (see "Common misconceptions"). Precise definitions exist and are short: Jepsen's model pages [S46 to S49], Terry's session guarantees [S50], Kleppmann's lecture notes [S52]. The constraint is to keep the precise definition while writing short sentences, and to pair every definition with a concrete failure the learner can trigger in a canvas.

## Existing courses and gaps

| Resource | What it does well | Gap for this learner |
|---|---|---|
| System Design Primer (GitHub, CC BY 4.0) [S4] | Broad topic map, interview method, Anki decks, powers-of-two and latency tables | Static text; latency table is the old one; no practice that measures anything |
| MIT 6.5840 Distributed Systems, Spring 2026 [S142] | Paper-driven lectures (MapReduce, GFS, Paxos, Raft); five labs including a Raft lab with tests | Graduate level; Go only; no estimation, caching or product design |
| Kleppmann, Cambridge "Distributed Systems" notes, 2025/26 [S52] | Precise, free, covers clocks, causality, quorums, linearizability, consensus, CRDTs | Theory course; no hands-on measurement; dense for ESL learners |
| Sam Rose (samwho.dev) visual essays [S21, S139] | Load balancing, queueing, retries, Bloom filters as live simulations with play, pause, speed and reset | Single essays, not a course; no grading |
| raft.github.io and RaftScope [S69] | The canonical Raft paper and a browser visualisation of five servers and their logs | One algorithm; no prediction or assessment |
| ScaleDojo [S143] | Per search snippets: drag-and-drop architecture labs with levels and AI review | `scaledojo.com` redirected to an unrelated company on 2026-10-23; features and pricing **UNVERIFIED** |

**Gaps this course can own:**

1. Interactive-first teaching of the hard middle: clocks, consistency models and consensus with canvases that let the learner break ordering, read-your-writes and leadership, then fix them.
2. Measurement as evidence: every challenge produces a chart from the learner's own laptop (the knee of the latency curve, cache hit rate, replica lag).
3. Current numbers with dates, set against the classic table, so learners learn to distrust stale constants.
4. Plain English for ESL learners on phones, with download sizes stated.

### Prior art for interactive learning: what to borrow (not copy)

- **Bret Victor, "Explorable Explanations" (2011)** [S137]: reactive documents that let the reader change the author's assumptions and see the result; the author still guides. Borrow: every canvas exposes the assumption that drives the claim (for example epsilon, lag, utilisation) as an input. His 2024 postscript notes the term now covers any interactive article, which is broader than he meant; keep the stricter meaning.
- **explorabl.es** [S138]: a hub of playful explorables; borrow the habit of "learning through play" but keep a prediction before and a transfer check after, per our assessment rules.
- **samwho load balancing (2023)** [S21]: play, pause, speed, reset that re-randomises server power and request cost; dropped-request counters; p50, p95, p99 charts; an honest note that power of two choices is "missing". Borrow: reset with a new seed, percentile charts, and an explicit "what this model leaves out" line.
- **RaftScope on raft.github.io** [S69]: servers on the left, logs on the right. Borrow the split view for the Raft canvas. The page does not list its controls, so do not claim specific features (**UNVERIFIED**).
- **The Secret Lives of Data (Raft)**: page is JavaScript-rendered and its content was not read (**UNVERIFIED**; do not cite).
- **Google PAIR Explorables** [S141]: essay-length interactive explanations from Google Research. Borrow the essay-plus-model shape.
- **Google "Learn Your Way" (2025-09-16)** [S140]: multiple representations of the same material plus quizzes; Google reports learners "scored 11 percentage points higher on a long-term recall test" than with a standard digital reader. The blog does not give the sample size; third-party reports of the trial size and percentages disagree (**UNVERIFIED** beyond Google's sentence). Borrow: offer the same idea as text, diagram and canvas; test recall later, not only in-lesson.
- **Jepsen consistency map** [S46]: a clickable hierarchy where each model links to what it forbids and how available it can be. Borrow the hierarchy as a navigable diagram in Module 11.

## Topic findings

### Part 1. Foundations

#### Latency numbers, estimation, Little's law, queueing

- Norvig's timing table (circa 2002 per Colin Scott's code comments [S2]): L1 0.5 ns, branch mispredict 5 ns, L2 7 ns, mutex 25 ns, main memory 100 ns, send 2 KB over 1 Gbps 20 microseconds, read 1 MB from memory 250 microseconds, disk seek 8 ms, read 1 MB from disk 20 ms, US to Europe round trip 150 ms [S1].
- Colin Scott's page models years: CPU clock flat at 3 GHz after 2005, memory latency flat at 100 ns after 2000, same-datacenter round trip a constant 500 microseconds, CA to Netherlands a constant 150 ms [S2]. Treat it as a model, not a measurement.
- napkin-math (MIT licence) gives current numbers, partly re-measured in March 2026 (see "Numbers we will use") [S3].
- **Little's law** L = lambda W holds for a finite observation window "even if the queuing system is never empty", needs no assumptions about arrival or service distributions, and holds independent of queue discipline [S5].
- **Utilisation vs wait (M/M/1)**: utilisation rho = lambda / mu; mean number in system rho / (1 minus rho); mean time in system 1 / (mu minus lambda), which includes service time [S6]. Brooker: at rho 0.5 the mean number in system is 1; at 0.99 it is 99; high-percentile latency is a leading indicator of overload [S7]. Derived example for writers: with 10 ms service time, mean time in system is 20 ms at 50% busy and 100 ms at 90% busy.
- **Tail at scale**: if each server is slow (1 s) for 1 in 100 requests and a request fans out to 100 servers, 63% of user requests take more than 1 s [S8]. Hedged requests send a second copy to another replica to cut the tail [S8].

Teach with care: M/M/1 assumes Poisson arrivals and exponential service times; Brooker notes real systems do not match [S7]. Use it to show the shape (the knee), not to predict exact numbers.

#### Networking for system designers

- **DNS**: name servers answer either recursively (pursue the query for the client) or iteratively (refer the client) [S9b]. A record's TTL is the time it "may be cached before the source of the information should again be consulted"; zero means use only for the current transaction, do not cache [S9]. ELB DNS records use a 60-second TTL so node addresses can change quickly [S15].
- **TCP**: connections open with a three-way handshake [S10].
- **TLS 1.3**: the full handshake is 1-RTT; 0-RTT data rides in the first flight on resumption, with "no guarantees of non-replay between connections" [S11]. Derived: a new HTTPS connection over TCP with TLS 1.3 costs about 2 round trips before the request leaves (1 for TCP, 1 for TLS). TLS 1.2 cost was not re-checked (**UNVERIFIED**; do not state).
- **HTTP versions**: HTTP/1.1 clients open multiple TCP connections for parallelism; HTTP/2 multiplexes streams on one TCP connection, but "a lost or reordered packet causes all active transactions to experience a stall"; HTTP/3 maps HTTP onto QUIC, which has per-stream flow control and stream-level reliability [S12]. QUIC runs over UDP, uses "a combined cryptographic and transport handshake", supports 0-RTT, and migrates connections between networks using connection IDs [S13].
- **Anycast**: one service address announced from several locations, with routing choosing one [S14]. Routing must stay stable for longer than a transaction, and per-packet load balancing across nodes can break TCP [S14]. AWS Global Accelerator gives static IPs "anycast from the AWS edge network" [S112].

#### Load balancing and health checks

- **L4 vs L7 in AWS**: an ALB evaluates listener rules per request and uses round robin by default; an NLB picks a target per TCP connection with a flow hash over protocol, addresses, ports and TCP sequence number, and keeps the connection on that target [S15]. Cross-zone balancing changes per-target share: with 2 targets in zone A and 8 in zone B, enabled gives 10% each; disabled gives 25% each in A and 6.25% each in B [S15].
- **Algorithms**: weighted round robin; least request picks N random hosts (2 by default) and chooses the one with fewest active requests, "nearly as good as an O(N) full scan"; ring hash ("Ketama") and Maglev for consistent hashing; random [S16].
- **Power of two choices**: d = 2 gives exponential improvement in expected time in system over d = 1; d = 3 is only a constant factor better than d = 2 [S17].
- **Consistent hashing** was introduced for distributed caching to relieve hot spots [S18].
- **Health checks**: liveness, local health, and dependency health checks; dependency checks can turn a soft dependency into a hard one and fail a whole fleet together; load balancers that "fail open" send traffic to all targets when all fail [S19]. Kubernetes: readiness decides when a container gets traffic; liveness decides when to restart it [S20].

#### Caching and CDNs

- **HTTP caching**: `max-age` (stale after N seconds), `s-maxage` (for shared caches), `no-cache` (may store but must revalidate before reuse), `no-store` (must not store), `private` (no shared cache), `must-revalidate`; revalidation uses ETag or Last-Modified and a 304 [S22]. `stale-while-revalidate` and `stale-if-error` come from RFC 5861 [S23].
- **CDN invalidation**: CloudFront offers invalidation or versioned file names; the first 1,000 invalidation paths a month are free [S28].
- **Cache-aside (look-aside)**: Facebook's memcache is a "demand-filled look-aside cache"; on write they update the database then delete the cache entry, choosing delete over update "because deletes are idempotent" [S24]. AWS calls cache-aside "lazy loading": a miss costs three trips; data can go stale; write-through keeps data fresh but caches unread data; a TTL bounds staleness [S26].
- **Stale sets and thundering herds**: Facebook's leases fix both; servers hand out a lease token once per 10 seconds per key; in one test peak database queries fell from 17K/s to 1.3K/s [S24].
- **Cache stampede**: when a hot item expires, many requests regenerate it at once; XFetch lets requests recompute early with a probability that grows near expiry, and is "theoretically optimal" [S25].
- **Eviction**: Redis offers `noeviction`, `allkeys-lru`, `allkeys-lfu`, `volatile-ttl` and others; LRU and LFU are approximated by sampling [S27].
- **Write-back (write-behind)**: no primary source was read for this term (**UNVERIFIED** source). Teach it as a trade-off (fast writes, risk of loss on crash) without attributing it.
- **TTL jitter**: no primary source names this practice (**UNVERIFIED** as a named practice). It follows from the same reasoning as retry jitter: randomness spreads synchronised events [S90]. Teach as reasoning, not as a citation.

#### Rate limiting and the API front door

- **Token bucket**: API Gateway throttles with a token bucket; rate is tokens added per second, burst is bucket capacity; clients get `429 Too Many Requests`; limits are "targets rather than guaranteed request ceilings" [S30]. Stripe uses token buckets in Redis and runs four limiters: request rate, concurrent requests, fleet usage load shedder, worker utilisation load shedder [S32].
- **Leaky bucket**: nginx `limit_req` uses "leaky bucket"; `burst` queues excess, `nodelay` serves the burst at once; default rejection is 503 unless `limit_req_status 429` is set [S31]. 429 is defined in RFC 6585 [S33].
- **Sliding window counter**: rate = previous window count times the share of it still inside the window, plus the current count; on 400 million requests from 270,000 sources, 0.003% were wrongly allowed or limited [S29].
- **Fixed window and sliding log**: no primary source was read; teach as derived designs (fixed window allows 2 times the limit at a boundary; sliding log stores each timestamp) (**UNVERIFIED** source).

#### Scaling out, statelessness, autoscaling

- Vertical vs horizontal scaling and "stateless app servers" are standard framing with no single primary source; teach them as a trade-off (one bigger machine has a ceiling and one failure domain; many machines need a load balancer and shared state elsewhere) and point to the load balancing and caching sources above.
- Kubernetes HPA: desiredReplicas = ceil(currentReplicas times currentMetric / desiredMetric); default loop every 15 seconds; scale-down uses a stabilisation window [S34].
- Rolling updates default to 25% max unavailable and 25% max surge [S35].
- Microservices: Fowler observed that successful microservice stories "started with a monolith that got too big", and greenfield microservice systems often "ended up in serious trouble" [S36].

### Part 2. Data and distributed correctness

#### Indexes and storage engines

- **LSM (RocksDB)**: writes go to an in-memory memtable and an optional write-ahead log, flush to sorted SST files, and compaction merges files and drops overwritten or deleted keys; leveled compaction favours space, universal compaction favours lower write amplification at the cost of read and space amplification [S37].
- **B-tree**: PostgreSQL's default index type; a primary source was not re-read for this dossier (low risk; verify when writing Module 7).
- **UUIDv7 and indexes**: time-ordered UUIDs "benefit from greater database-index locality" compared with random inserts [S66].

#### Replication and lag

- Three topologies with a sourced example each: single-leader (PostgreSQL streaming replication [S38], Aurora [S39], each DynamoDB partition's leader [S44]); multi-leader (DynamoDB global tables in MREC mode, where every Region accepts writes and conflicts resolve by last writer wins [S43]); leaderless (Dynamo, any of N replicas with R and W quorums [S45]).
- PostgreSQL 18: streaming replication is asynchronous by default; lag is "typically under one second assuming the standby is powerful enough to keep up"; synchronous replication waits at least one primary-to-standby round trip per commit [S38].
- Aurora replicas share the cluster volume; lag is "usually much less than 100 milliseconds" and grows with heavy writes; up to 15 replicas [S39].
- DynamoDB global secondary indexes update asynchronously, eventually consistent [S41].
- Session anomalies: read-your-writes (the Grapevine password-change example), monotonic reads, writes-follow-reads, monotonic writes [S50]; consistent prefix and bounded staleness [S51]. Kleppmann's notes walk through a read that misses the client's own write when it hits a lagging replica [S52].
- Multi-leader conflict: DynamoDB global tables (default MREC mode) resolve concurrent writes per item by "last writer wins" on an internal timestamp; an MRSC mode offers strong consistency across Regions [S43].

#### Partitioning and sharding

- DynamoDB hashes the partition key to pick a partition [S40]; each partition is designed for up to 3,000 read units and 1,000 write units per second [S40]. The 2022 paper names "hot partitions and throughput dilution" as the most common early problems [S44].
- Dynamo: consistent hashing with virtual nodes; each physical node owns several points on the ring [S45].
- Secondary indexes across shards: local vs global. In DynamoDB, global indexes are asynchronous [S41].

#### Consistency models

- Hierarchy (Jepsen): strict serializable implies linearizable implies sequential implies causal; causal implies writes-follow-reads and PRAM; PRAM implies monotonic reads, monotonic writes, read-your-writes [S46].
- Availability (Jepsen): models at or above sequential (and snapshot isolation, cursor stability) "cannot be totally available"; models at or above read-your-writes "can be at most sticky available"; weaker ones can be totally available [S46]. Causal is sticky available: clients must stay on one server [S49].
- Linearizable: atomic, "consistent with the real-time ordering" (Herlihy and Wing 1990) [S47]. Sequential: a total order consistent with each process's order, no real-time constraint (Lamport 1979) [S48].
- Linearizability is not serializability [S52].
- **Compare-and-set**: CAS(x, old, new) sets x only if it still equals old; a linearizable CAS in a distributed system needs total order broadcast, that is, consensus [S52]. In practice: etcd transactions are "an atomic If/Then/Else" with comparisons on `mod_revision` [S53] and etcd is linearizable by default [S54]; DynamoDB conditional writes stop the Alice and Bob lost update and are idempotent when the condition checks the attribute being changed; unconditional atomic counters are not idempotent [S42].
- Plain quorum reads and writes are not linearizable by themselves; the ABD algorithm adds read repair to a quorum before returning [S52].

#### CAP and PACELC

- CAP's C is linearizability; A means every request to a non-failing node gets a non-error response; partitions are not optional, so the real choice is what to do during one; most real systems are neither CP nor AP under these definitions [S55].
- Brewer (2012): "The '2 of 3' formulation was always misleading"; partitions are rare, and the C vs A choice can be made "many times within the same system at very fine granularity" [S56].
- Abadi (2010) PACELC: if partition, trade availability vs consistency; else trade latency vs consistency. Dynamo, Cassandra and SimpleDB are PA/EL; fully ACID systems PC/EC; PNUTS PC/EL by default [S57].

#### Time and clocks

- **Drift**: quartz clocks drift; 1 ppm = 1 microsecond per second = 86 ms per day; most computer clocks are correct within 50 ppm; temperature matters [S52]. Derived: 50 ppm is about 4.3 s per day without sync.
- **NTP**: on a quiet local subnet NTP "can easily keep them within one millisecond"; over wider networks "It All Depends" [S64]. Kleppmann's notes show slewing keeps clocks "within a few milliseconds" depending on the network [S52]. A precise public-internet figure was not found (**UNVERIFIED**).
- **Leap seconds**: a 2012 Linux kernel bug caused livelock on a leap second; Google-style "smearing" spreads it over a day [S52]. Amazon Time Sync smears leap seconds on NTP; its PTP hardware clock does not [S61]. The CGPM decided to abandon leap seconds by or before 2035 [S61].
- **AWS**: Amazon Time Sync uses satellite-connected and atomic reference clocks in each Region [S61]. Typical clock error bound is under 100 microseconds over NTP and under 40 microseconds with the PTP hardware clock on supported instances (2023 post) [S62]. ClockBound returns an (earliest, latest) interval with Clock Error Bound = |Local Offset| + Root Dispersion + Root Delay / 2 [S63].
- **Lamport clocks (1978)**: Clock Condition: if a happened before b then C(a) < C(b); the converse does not hold; rules IR1 (increment between events) and IR2 (send the timestamp, receiver jumps past it) [S58].
- **Vector clocks**: Dynamo used them to detect divergent versions, reconciled on read [S45]; Kleppmann's notes contrast Lamport and vector clocks [S52].
- **Hybrid logical clocks (Kulkarni et al. 2014)**: capture causality like logical clocks, stay close to NTP time, fit in the 64-bit NTP timestamp format, tolerate NTP "kinks" [S59].
- **Spanner TrueTime (OSDI 2012)**, exact statements [S60]:
  - The API returns an interval; the implementation "keeps uncertainty small (generally less than 10ms)" using GPS and atomic clocks.
  - Epsilon "is typically a sawtooth function of time, varying from about 1 to 7 ms over each poll interval"; "therefore 4 ms most of the time".
  - Daemon poll interval 30 seconds; applied drift rate 200 microseconds per second, which accounts for the sawtooth from 0 to 6 ms; the remaining 1 ms is communication delay to the time masters.
  - Excursions happen: time-master unavailability can raise epsilon across a datacenter; overloaded machines and links cause local spikes.
  - Commit wait: the coordinator waits until TT.after(s) is true; "the expected wait is at least 2 times epsilon-bar" (average epsilon); it usually overlaps Paxos communication.
  - In the 1-replica microbenchmark, "commit wait is about 5ms, and Paxos latency is about 9ms".
  - Figure 6 plots 90th, 99th and 99.9th percentile epsilon sampled right after polling (so it excludes the sawtooth); the exact plotted values were not extracted (**UNVERIFIED**; read the figure before quoting a percentile).
  - Paxos leader leases are 10 seconds; recovery after killing a zone took about 10 seconds.
  - "Bad CPUs are 6 times more likely than bad clocks" in their machine statistics.
- **Snowflake IDs**: 41-bit millisecond time with a custom epoch (69 years), 10-bit machine ID (1,024 machines), 12-bit sequence (4,096 per millisecond per machine); k-sorted within about a second; relies on NTP and guards against clocks going backwards; repository archived 2021-09-18 [S65].
- **UUIDv7 (RFC 9562, May 2024)**: 48-bit big-endian Unix time in milliseconds, then version and random bits; implementations "SHOULD utilize UUIDv7 instead of UUIDv1 and UUIDv6 if possible" [S66].

#### Consensus, quorums, leases, fencing

- **Paxos Made Simple (2001)**: "The Paxos algorithm, when presented in plain English, is very simple"; phase 1 prepare and promise to a majority, phase 2 accept; progress needs a single distinguished proposer, and FLP implies electing one needs randomness or real time [S67].
- **Raft** [S68]:
  - Terms "act as a logical clock"; at most one leader per term (Election Safety).
  - Election timeouts are randomised from a fixed interval "(e.g., 150 to 300ms)" so split votes are rare.
  - Timing requirement: broadcastTime much less than electionTimeout much less than MTBF; broadcast time "may range from 0.5ms to 20ms"; so election timeout is likely "between 10ms and 500ms".
  - An entry is committed once the leader that created it has replicated it on a majority; a leader never commits entries from previous terms by counting replicas.
  - Raft aims for linearizable semantics and must deduplicate retried commands to avoid running one twice.
  - Raft's authors report a user study showing it is easier for students to learn than Paxos.
- **Quorums**: R + W > N gives overlap; Dynamo's common (N, R, W) is (3, 2, 2); latency is set by the slowest of the R or W replicas [S45]. Majority quorum r = w = (n + 1) / 2 [S52].
- **Leases and split brain**: a lease-based lock can be held by two clients at once if one pauses (GC) past expiry; a fencing token that the storage server checks prevents the stale write (33 vs 34 example); Redlock depends on timing assumptions [S70]. Chubby's "sequencer" carries the lock generation number for servers to check [S71]. etcd leases expire by wall-clock TTL [S54]. DynamoDB's replication groups use Multi-Paxos with leader leases, and only the leader serves writes and strongly consistent reads [S44].

#### Gossip and failure detection

- **SWIM (DSN 2002)**: separates failure detection from membership dissemination; random probing with indirect `ping-req` through k members; suspicion before declaring failure; detection time and per-member load do not grow with group size; updates piggyback on pings ("infection style") [S72].
- **Phi accrual**: phi = -log10(1 minus F(time since last heartbeat)), F fitted to past heartbeat intervals; default threshold 8, 12 suggested on EC2; low thresholds detect fast but give false positives [S73]. Original paper: Hayashibara et al. 2004 (not read; cited through [S73]).

#### Dynamo (2007) vs DynamoDB (2022): different systems

- **Dynamo (SOSP 2007)** [S45]: consistent hashing for partitioning; vector clocks with reconciliation on read; sloppy quorum and hinted handoff for temporary failures; anti-entropy with Merkle trees for permanent failures; gossip membership and failure detection; latency SLAs at the 99.9th percentile; (3, 2, 2) common; the shopping cart merge never loses an add but "deleted items can resurface"; over 24 hours 99.94% of requests saw exactly one version.
- **DynamoDB (USENIX ATC 2022)** [S44]: a multi-tenant managed service "motivated by our experiences with its predecessor Dynamo"; each partition has three replicas in a replication group using Multi-Paxos with a lease-holding leader; writes are acknowledged when a quorum persists the log record; strongly and eventually consistent reads; Prime Day 2021 peak 89.2 million requests per second.
- Teach with care: never say "DynamoDB uses sloppy quorums and vector clocks". That describes Dynamo.

#### Conflict resolution and CRDTs

- LWW: Kleppmann's notes: last writer wins "implies data loss when multiple updates are performed concurrently" [S52]. Jepsen 2013: Cassandra's pure LWW lost about 28% of acknowledged writes in a lock-based test [S76] (Cassandra 2013 behaviour; do not present as current Cassandra).
- CRDTs: Strong Eventual Consistency; replicas "converge in a self-stabilising manner, despite any number of failures" [S75]. The comprehensive study specifies G-Counter (per-replica increment vector), PN-Counter (two vectors P and N), G-Set, 2P-Set, OR-Set, and LWW-Register (value plus timestamp "consistent with causality") [S74].

#### Distributed transactions and exactly-once

- 2PC "blocks if the coordinator fails"; Paxos Commit uses 2F + 1 coordinators and progresses with F + 1 [S77].
- Sagas: long-lived transactions as a sequence of transactions; either all complete "or compensating transactions are run to amend a partial execution" [S78].
- Outbox: write the message to an outbox table in the same transaction; a relay publishes it; the relay may publish more than once, so consumers must be idempotent [S79].
- Idempotency keys (Stripe API v1): the server saves the status code and body of the first request with a key and returns it for retries, including 500s; keys up to 255 characters; may be pruned after at least 24 hours; reuse with different parameters errors [S80].
- Exactly-once: see Part 3.

### Part 3. Async work, resilience, operations

#### Queues and streams

- Kafka 4.3 docs: events with the same key go to the same partition, and consumers read a partition "in exactly the same order as they were written" [S81]. Each partition is consumed by exactly one consumer in a consumer group at a time [S82]. Delivery modes: at most once, at least once, exactly once; "Many systems claim to provide 'exactly-once' delivery semantics, but it is important to read the fine print" [S82]. Kafka guarantees at-least-once by default; exactly-once across read, process, write within Kafka uses idempotent producers and transactions; exactly-once to other systems "generally requires cooperation with such systems" [S82].
- SQS standard queues deliver at least once; consumers must be idempotent [S83]. Visibility timeout default 30 seconds, maximum 12 hours from first receive [S84]. Dead-letter queues use `maxReceiveCount` [S85]. FIFO queues avoid duplicates for retries within a 5-minute deduplication interval [S86].
- Kinesis records carry a partition key and sequence number [S132].
- Backpressure in Node.js: `write()` returns false when the buffer passes `highWaterMark` (default 16 KB, or 16 objects in object mode), and `pipe()` pauses the source [S88].
- Windows (Flink 2.3): tumbling (fixed, non-overlapping), sliding (fixed size with a slide), session (gap-based), global [S87].

#### Microservices and resilience

- Timeouts: set them from the downstream latency percentile you accept as false timeouts (p99.9 in Brooker's example) [S89].
- Retries: in Brooker's five-deep call stack with three tries per layer, independent retries raise database load 243 times; retry at one point in the stack; limit retries with a local token bucket; cap backoff; add jitter; "APIs with side effects aren't safe to retry unless they provide idempotency" [S89]. SRE book: randomised exponential backoff, limit retries per request, a server-wide retry budget, deadline propagation, load shedding [S91].
- Jitter (2015): full, equal and decorrelated jitter compared; equal jitter performed worst; jittered backoff "should be considered a standard approach" [S90].
- Circuit breaker: closed, open, half-open; stops cascading failures from resource exhaustion [S92].
- Bulkhead: separate pools per dependency or per consumer so one failure cannot exhaust shared resources [S93].
- Metastable failures: a trigger pushes a system into a bad state that "persists even when the trigger is removed", held there by a sustaining effect such as work amplification (retries) [S94].
- Service discovery: Kubernetes gives each Service a DNS name like `my-svc.my-namespace.svc` [S147]; AWS Cloud Map maps names to resources and serves only healthy ones [S130].

#### Observability and reliability targets

- SLI: "a carefully defined quantitative measure"; SLO: "a target value or range of values" for an SLI; SLA: a contract "that includes consequences" [S95]. 100% is "unrealistic and undesirable"; prefer percentiles to means; Chubby's planned outages keep users from depending on more than the SLO [S95].
- Error budget: with a 99.999% SLO, the budget is 0.001%; a 0.0002% failure spends 20% of the quarter's budget; releases continue while budget remains and halt when it is spent [S96].
- Four golden signals: latency, traffic, errors, saturation; track error latency separately; use exponential histogram buckets [S97].
- OpenTelemetry signals: traces, metrics, logs, baggage (and profiles) [S98]; W3C Trace Context defines the `traceparent` header [S99].
- AWS: X-Ray SDKs and daemon entered maintenance mode on 2026-02-25 (security fixes only); AWS is moving X-Ray users to OpenTelemetry [S129].

#### Linux, containers, Kubernetes, CI/CD

- cgroups "allow processes to be organized into hierarchical groups whose usage of various types of resources can then be limited and monitored" [S117]. The namespaces(7) page did not load during research (**UNVERIFIED** quote; re-fetch).
- Kubernetes: probes [S20], HPA [S34], rolling updates [S35], Service DNS [S147].
- kind needs a node image of about 380 MB compressed [S119].
- CI/CD specifics (GitHub Actions) were not researched here; the technical validator should check current runner images at G5.

#### Multi-region, disaster recovery, deployment

- RTO: "the maximum acceptable delay between the interruption of service and restoration of service"; RPO: "the maximum acceptable amount of time since the last data recovery point" [S108].
- DR strategies: backup and restore, pilot light, warm standby, multi-site active/active, from lowest cost to lowest RTO [S107].
- Route 53 policies include failover (active-passive) and latency routing [S111].
- Blue-green: two production environments, switch the router, roll back by switching back; deploy schema changes separately so both versions work [S109].
- Canary: "a partial and time-limited deployment of a change"; compare canary with control, because a 20% error rate on a 5% canary shows as about 1% overall; run one canary at a time [S110].

### Part 4. Designing real systems

- **Search**: Lucene's inverted index can "list, for a term, the documents that contain it", using a term dictionary and postings [S100].
- **Geospatial**: S2 projects the sphere onto a cube and subdivides each face like a quadtree; levels 0 to 30; leaf cells about 1 cm [S101]. H3 "partitions the world into hexagonal cells", developed for Uber's needs, Apache 2 licence [S102]. Geohash: no primary source read (**UNVERIFIED**). Quadtree original paper not read.
- **Feeds (fan-out on write vs read)**: the trade-off is standard, but the only first-party source found (Twitter's 2012 QCon talk) was available as video, and the summary page did not describe fan-out (**UNVERIFIED** specifics; teach as a trade-off, do not attribute a design to a company) [S103].
- **Real-time**: WebSocket is a two-way protocol over TCP, designed to avoid multiple HTTP connections and long polling [S104]. Server-sent events use `EventSource`, reconnect automatically, resume with `Last-Event-ID`, and stop on HTTP 204 [S105]. RFC 6202 documents long polling and its known issues [S106].
- **Probabilistic data structures**: Bloom filters allow false positives and no false negatives; optimal k = ln 2 times (m / n) [S113]. HyperLogLog standard error is about 1.04 / sqrt(m); about 2% accuracy for cardinalities beyond 10^9 with 1.5 KB [S114]; Redis HLL uses up to 12 KB with 0.81% standard error [S115]. Count-min sketch: small counts below the error threshold should be ignored [S116]; the primary paper was not read, so "never underestimates" is **UNVERIFIED** as a citation (it follows from the structure).
- **IDs**: Snowflake and UUIDv7, see Part 2 [S65, S66].

### "In AWS" mapping check (roadmap draft)

| Module idea | AWS mapping in roadmap | Status |
|---|---|---|
| L4, L7 load balancing | ELB (ALB, NLB) | Verified [S15] |
| Anycast, edge | CloudFront, Global Accelerator | Global Accelerator anycast verified [S112]; CloudFront invalidation verified [S28] |
| DNS routing and failover | Route 53 | Verified [S111] |
| Caching | ElastiCache | Strategies verified [S26] |
| Rate limiting | API Gateway, WAF rate-based rules | API Gateway verified [S30]; WAF page title only (low) [S131] |
| Conditional writes, CAS | DynamoDB conditional writes | Verified [S42] |
| Replicas and lag | RDS, Aurora replicas | Aurora verified [S39] |
| Partitions | DynamoDB partitions | Verified [S40] |
| Clocks | Amazon Time Sync, ClockBound | Verified [S61, S62, S63] |
| Multi-region conflicts | DynamoDB global tables | Verified, LWW in MREC [S43] |
| Sagas | Step Functions | Prescriptive guidance page not confirmed (**UNVERIFIED**) |
| Queues, streams | SQS, Kinesis | Verified [S83 to S86, S132]; MSK, SNS, EventBridge not checked |
| Service discovery | Cloud Map | Verified [S130] |
| Tracing | X-Ray | X-Ray SDKs in maintenance mode since 2026-02-25 [S129]; map to CloudWatch plus OpenTelemetry instead |
| DR | Multi-AZ, Route 53 failover, Aurora Global Database, AWS Backup | DR strategies verified [S107]; Aurora Global Database mentioned in [S39] |

## Numbers we will use

All dates are the date checked unless stated. "Classic" values are for contrast only; teach the "Current" column.

### Latency table

| Operation | Classic value | Current value | Source and note |
|---|---|---|---|
| L1 cache reference | 0.5 ns [S1, S4] | about 1 ns (3 cycles at 3 GHz, modelled) | [S2] model, not measured |
| Branch mispredict | 5 ns [S1] | about 3 ns (modelled) | [S2] |
| Main memory reference | 100 ns [S1, S4] | 100 ns (model holds flat since 2000) | [S2]. napkin-math lists 20 ns for random 64-byte reads [S3]; the difference is not explained (**UNVERIFIED** interpretation); use 100 ns for one dependent access |
| System call | | 300 ns | [S3] |
| Hash 64 bytes, non-crypto | | 10 ns | [S3] |
| Context switch | | 10 microseconds | [S3] |
| Read 1 MB sequentially from memory | 250 microseconds [S1, S4] | about 50 microseconds (20 GiB/s, one thread) | [S3] |
| Random SSD read, 8 KiB | 150 microseconds for 4 KB [S4] | 100 microseconds | [S3] |
| Read 1 MB sequentially from SSD | 1 ms [S4] | about 100 microseconds (8 GiB/s) | [S3] |
| SSD write with fsync, 8 KiB | | 300 microseconds | [S3] |
| Proxy hop (nginx, Envoy, HAProxy) | | 50 microseconds | [S3] |
| TCP echo, 32 KiB | | 50 microseconds | [S3] |
| Round trip within a datacenter or region | 500 microseconds [S2, S4] | 250 microseconds within a region | [S3] |
| Redis, Memcached or MySQL query | | 500 microseconds | [S3] |
| HDD seek or random read | 8 to 10 ms [S1, S4] | 10 ms | [S3] |
| Blob storage GET, 128 KiB, 1 connection | | 80 ms | [S3], measured 2026-03-09 on S3 and GCS |
| North America East to West round trip | | 60 ms | [S3] |
| EU West to North America East | | 80 ms | [S3] |
| EU West to Singapore | | 160 ms | [S3] |
| California to Netherlands and back | 150 ms [S1, S2, S4] | | Constant in [S2] |

napkin-math caveat: some numbers are "2-3x off" and rounded for arithmetic [S3]. Use them for estimation, never as benchmarks.

### Queueing and tail numbers

| Quantity | Value | Source |
|---|---|---|
| M/M/1 mean jobs in system at 50%, 99% utilisation | 1 and 99 | [S7] |
| M/M/1 mean time in system | 1 / (mu minus lambda) | [S6] |
| Fan-out to 100 servers, each slow 1% of the time | 63% of requests slow | [S8] |
| Retry amplification, five-deep call stack, three tries per layer (Brooker example) | 243 times database load (3^5) | [S89] |
| Retry amplification (SRE book example) | 3 layers each making 4 attempts (3 retries) gives 64 database attempts (4^3) | [S91] |

### Clock numbers

| Quantity | Value | Source |
|---|---|---|
| Typical quartz drift | within 50 ppm; 1 ppm = 86 ms per day | [S52] |
| NTP on a quiet LAN | within 1 ms | [S64] |
| NTP over wider networks | "It All Depends"; a few ms with good networks | [S64, S52] |
| Amazon Time Sync, NTP connection | clock error bound typically under 100 microseconds | [S62] (Nov 2023) |
| Amazon Time Sync, PTP hardware clock | typically under 40 microseconds | [S62] |
| Spanner TrueTime epsilon | sawtooth about 1 to 7 ms; 4 ms most of the time; generally under 10 ms | [S60] |
| Spanner assumed drift and poll | 200 microseconds per second; 30-second poll | [S60] |
| Spanner commit wait | at least 2 times average epsilon; about 5 ms measured (1 replica) | [S60] |
| Spanner Paxos leader lease | 10 seconds | [S60] |
| Raft election timeout example | 150 to 300 ms randomised | [S68] |
| Raft broadcast time and timeout range | 0.5 to 20 ms; 10 to 500 ms | [S68] |
| Phi accrual threshold | default 8; 12 suggested on EC2 | [S73] |
| Snowflake | 41 / 10 / 12 bits; 4,096 IDs per ms per machine; 69 years | [S65] |

### Replication lag and propagation

| System | Typical lag | Source |
|---|---|---|
| PostgreSQL async streaming replica | under 1 second if the standby keeps up | [S38] |
| Aurora replica | usually much less than 100 ms; grows under heavy writes | [S39] |
| DynamoDB GSI | asynchronous, no number given | [S41] |
| etcd watch event | about 10 ms in a healthy cluster, unbounded otherwise | [S54] |
| Cross-region async replication | no general number found (**UNVERIFIED**); derive a floor from the round-trip table above |  |

### Other numbers

| Quantity | Value | Source |
|---|---|---|
| ELB DNS TTL | 60 seconds | [S15] |
| DynamoDB per-partition design limit | 3,000 read units, 1,000 write units per second | [S40] |
| Dynamo common (N, R, W) | (3, 2, 2) | [S45] |
| Dynamo carts with one version in 24 h | 99.94% | [S45] |
| DynamoDB Prime Day 2021 peak | 89.2 million requests per second | [S44] |
| Facebook lease effect on hot keys | peak DB queries 17K/s to 1.3K/s | [S24] |
| Sliding window counter error (Cloudflare) | 0.003% of 400 million requests | [S29] |
| Kubernetes HPA loop | every 15 seconds | [S34] |
| Kubernetes rolling update defaults | 25% max unavailable, 25% max surge | [S35] |
| SQS visibility timeout | default 30 s, max 12 h | [S84] |
| SQS FIFO deduplication | 5 minutes | [S86] |
| Stripe idempotency key | up to 255 chars; kept at least 24 h | [S80] |
| CloudFront free invalidation paths | 1,000 per month | [S28] |
| Redis HyperLogLog | 12 KB, 0.81% standard error | [S115] |
| Error budget example | 99.999% SLO gives 0.001% budget | [S96] |
| Jepsen 2013 Cassandra LWW test | about 28% of acknowledged writes lost | [S76] |

### Notes on the two existing canvases

- `sysdesign-truetime-commit-wait`: epsilon range 0 to 10 ms with default 4 ms matches the paper ("generally less than 10ms", "4 ms most of the time") [S60], and "commit wait about 2 times epsilon" matches "at least 2 times epsilon-bar". **Problem:** its spec says the "unfriend-then-post example" comes from the Spanner OSDI 2012 paper. A full-text search of that paper found no such example (the only "photo" text is the schema example) [S60]. Relabel it as a course composite, or find the source.
- `sysdesign-replica-lag`: default slow-replica lag 600 ms sits inside PostgreSQL's "typically under one second" [S38] but well above Aurora's "much less than 100 milliseconds" [S39]. The canvas should state which kind of system it models. Its spec cites DDIA chapter 5, which was not read for this dossier; add Kleppmann's Cambridge notes [S52] and Terry 1994 [S50], which were.

## Common misconceptions to teach against

Each row is a claim learners bring in, the correct statement, and the source.

| # | Misconception | Correct statement | Source |
|---|---|---|---|
| 1 | "CAP says pick any 2 of 3." | Partitions are not optional; the choice is what to do during one, and C means linearizability. The "2 of 3" framing "was always misleading". | [S55, S56] |
| 2 | "A system is either CP or AP." | Most real systems meet neither strict definition; describe the actual guarantee instead. | [S55] |
| 3 | "Eventual consistency means it will be right in a few milliseconds." | It gives no time bound; read-your-writes and monotonic reads are separate guarantees, and bounded staleness is another. | [S50, S51] |
| 4 | "Linearizable and serializable are the same." | Linearizability is about single operations in real-time order; serializability is about transactions; strict serializable is both. | [S46, S47, S52] |
| 5 | "If you need availability you must accept eventual consistency." | Causal consistency and session guarantees are sticky available: they survive partitions if a client stays on one server. | [S46, S49] |
| 6 | "Timestamps from different servers tell you which write came first." | Clocks drift (up to 50 ppm) and NTP leaves milliseconds of error; LWW on timestamps loses concurrent writes. | [S52, S76] |
| 7 | "Time never goes backwards." | Leap seconds and clock steps can move wall-clock time back; Cloudflare's DNS failed on 2017-01-01 because of this. | [S133, S52] |
| 8 | "If Lamport timestamp a < b, then a caused b." | Only the reverse holds: a happened before b implies C(a) < C(b). Vector clocks are needed to detect concurrency. | [S58, S52] |
| 9 | "TrueTime makes Spanner's clocks perfect." | TrueTime bounds the error (about 1 to 7 ms) and Spanner waits it out with commit wait, paying latency on every commit. | [S60] |
| 10 | "A lock with a TTL guarantees only one holder." | A paused client can outlive its lease; storage must check a fencing token or sequencer. | [S70, S71] |
| 11 | "R + W > N makes reads linearizable." | Overlap is necessary, not sufficient; plain quorum reads need read repair (ABD) to be linearizable, and sloppy quorums break the overlap. | [S52, S45] |
| 12 | "Two-phase commit survives failures." | 2PC blocks if the coordinator fails; consensus-based commit avoids this. | [S77] |
| 13 | "Kafka or SQS give exactly-once delivery out of the box." | Default delivery is at least once; Kafka's exactly-once covers Kafka-to-Kafka with transactions; other systems need idempotent consumers. | [S82, S83] |
| 14 | "Retries make a system more reliable." | Unbounded retries multiply load (243 times in one example) and can hold a system in a metastable failure; use budgets, backoff, jitter and idempotency. | [S89, S91, S94] |
| 15 | "Average latency tells you how users feel." | Averages hide the tail; use percentiles; fan-out turns rare slowness into common slowness. | [S95, S8] |
| 16 | "Running servers at 90% is efficient." | Queueing delay grows non-linearly near 100%; at 90% busy, M/M/1 time in system is 10 times the service time. | [S6, S7] |
| 17 | "Consistent hashing removes hot spots." | It balances key ranges, not a single hot key; hot partitions remain a top problem in DynamoDB's history. | [S45, S44] |
| 18 | "Dynamo and DynamoDB are the same design." | Dynamo used sloppy quorums and vector clocks; DynamoDB uses Multi-Paxos replication groups with a leader. | [S45, S44] |
| 19 | "`Cache-Control: no-cache` means do not cache." | `no-cache` allows storing but requires revalidation; `no-store` forbids storing. | [S22] |
| 20 | "Update the cache on every write to keep it fresh." | Concurrent updates can reorder and leave stale values; Facebook deletes on write and uses leases. | [S24] |
| 21 | "Deep health checks are safer." | Dependency checks can fail a whole fleet at once; prefer local checks and fail open. | [S19] |
| 22 | "The latency numbers table is current." | The popular table dates from the 2000s; 2026 measurements differ (for example SSD sequential reads about 8 GiB/s, not 1 GB/s). | [S2, S3, S4] |
| 23 | "Rate limiters should return 503." | 429 Too Many Requests is the defined code; nginx needs `limit_req_status 429` to send it. | [S33, S31] |
| 24 | "Start with microservices so it scales." | Successful microservice systems usually started as monoliths. | [S36] |
| 25 | "A Bloom filter can confirm an item is present." | It can confirm absence; "present" may be a false positive. | [S113] |
| 26 | "Random UUIDs are fine as B-tree keys at any scale." | Time-ordered UUIDv7 gives better index locality than random inserts. | [S66] |

## Production failure modes

First-party write-ups writers may use (named, with sources):

1. **Leap second breaks DNS (Cloudflare, 2017-01-01).** RRDNS measured durations with a non-monotonic clock; the leap second made one negative, which reached `rand.Int63n()` and panicked; about 0.2% of DNS queries failed at peak, until 06:45 UTC [S133]. Lesson: use monotonic clocks for durations; time can go backwards. Module 10.
2. **43-second partition, 24 hours of degradation (GitHub, 2018-10-21).** A network partition let the failover tool promote primaries on the other coast; both sides then held writes the other lacked; service was degraded for 24 hours 11 minutes; follow-ups included stopping cross-region promotion [S134]. Lesson: failover is a consistency decision; split brain in practice. Modules 8, 12, 19.
3. **Empty DNS record takes down a Region's dependencies (AWS us-east-1, 2025-10-19 to 2025-10-20).** A race in DynamoDB's DNS automation applied an old plan and then deleted it, leaving the regional endpoint with no addresses; EC2 launches and NLB health checks failed for hours afterwards as backlogs and health-check churn followed; fixes include disabling the automation and adding velocity limits on health-check-driven capacity removal [S135]. Lesson: DNS is a dependency; health checks can amplify failure; recovery can be harder than the trigger. Modules 3, 4, 16.
4. **BGP withdrawal makes DNS unreachable (Meta, 2021-10-04).** A maintenance command took down the backbone; DNS servers withdrew their anycast BGP routes because they could not reach the data centers; recovery was slow because remote access and internal tools depended on the same network [S136]. Lesson: anycast and DNS failure modes; out-of-band access. Modules 3, 19.
5. **Thundering herd on hot keys (Facebook memcache, NSDI 2013).** Hot keys under heavy read and write load hammered the database; leases cut peak queries from 17K/s to 1.3K/s [S24]. Module 5.
6. **Lost writes under last-write-wins (Jepsen, Cassandra 2013).** About 28% of acknowledged writes lost in a lock-based test; equal timestamps resolved by value [S76]. Module 13.
7. **Metastable failure from retries (Bronson et al., HotOS 2021).** Retry-driven work amplification keeps a system down after the trigger goes away [S94]. Module 16.
8. **Resurfacing deletes (Dynamo shopping cart, 2007).** Merging divergent carts never loses an add, but deleted items can come back [S45]. Module 13.
9. **Leap second livelock (Linux, 2012-06-30).** A kernel bug caused livelock and outages; smearing is the common fix [S52]. Module 10.

## What not to teach

| Topic | Why not |
|---|---|
| Byzantine fault tolerance, blockchains | Brief non-goal [S146]; mention as "assumes nodes do not lie". |
| Formal proofs (FLP, CAP, Paxos safety), TLA+ | Time budget; teach the results, not proofs. Gilbert and Lynch's CAP proof was not read; cite through [S55]. |
| Paxos variants beyond basic Paxos and Raft | One consensus algorithm in depth (Raft) is enough; Paxos as a reading and a two-phase walkthrough [S67]. |
| Building a storage engine, a CRDT library or a production Raft | Brief non-goal [S146]; challenges build toys with tests. |
| Kubernetes operations (operators, service mesh, network policies, Helm) | Brief scope; kind node image alone is about 380 MB [S119]. |
| Grafana dashboards in the default path | Image is about 483 MB [S119]; use Prometheus or a generated SVG chart. |
| Exact cloud prices | Volatile; sandbox prices are illustrative with date and region [S146]. |
| TLS 1.2 handshake details, TCP congestion control internals | Not needed for design decisions; only round-trip counts matter. |
| Twitter's exact timeline architecture | Not verified from a first-party text source [S103]; teach fan-out as a trade-off. |
| Third-party LocalStack replacements (for example "Floci") | Only third-party blogs mention them; not evaluated. |

## Source table

Type key: P = paper; D = official documentation or specification; F = first-party engineering write-up or postmortem; S = reputable secondary or practitioner; R = registry or package metadata; I = internal course document. Confidence: High, Medium, Low. All dates checked 2026-10-23.

| ID | Claim | Source | Type | Date checked | Confidence |
|---|---|---|---|---|---|
| S1 | Classic timing table (L1 0.5 ns, memory 100 ns, seek 8 ms, US to Europe 150 ms) | https://norvig.com/21-days.html | S | 2026-10-23 | High |
| S2 | Interactive latency page is a year-based model from circa-2002 numbers; constants for DC and WAN round trips | https://colin-scott.github.io/personal_website/research/interactive_latency.html and https://github.com/colin-scott/interactive_latencies | S | 2026-10-23 | High (as a description of the model) |
| S3 | Current napkin numbers; single-host rows re-measured 2026-03-08 on GCP c4; blob rows 2026-03-09; "2-3x off" caveat; MIT licence | https://github.com/sirupsen/napkin-math | S | 2026-10-23 | Medium |
| S4 | System Design Primer latency table values; CC BY 4.0 | https://github.com/donnemartin/system-design-primer | S | 2026-10-23 | High |
| S5 | Little's law L = lambda W, holds without distribution or discipline assumptions | Little, Operations Research 59(3), 2011, DOI 10.1287/opre.1110.0940; reprint https://projectproduction.org/journal/reprint-littles-law-as-viewed-on-its-50th-anniversary/ | P | 2026-10-23 | High |
| S6 | M/M/1: rho = lambda/mu; L = rho/(1 minus rho); W = 1/(mu minus lambda) | MIT OCW 2.854 notes, https://ocw.mit.edu/courses/2-854-introduction-to-manufacturing-systems-fall-2016/927056a1af54772a587fd84ad4951e71_MIT2_854F16_Mm1Queue.pdf | S | 2026-10-23 | High |
| S7 | Utilisation vs queue length (rho 0.5 gives 1, 0.99 gives 99); tail latency as overload signal | Brooker, "Latency Sneaks Up On You", https://brooker.co.za/blog/2021/08/05/utilization.html | S | 2026-10-23 | High |
| S8 | Fan-out to 100 servers makes 63% of requests slow; hedged requests | Dean and Barroso, "The Tail at Scale", CACM 2013, https://www.barroso.org/publications/TheTailAtScale.pdf | P | 2026-10-23 | High |
| S9 | DNS TTL definition; zero TTL not cached | RFC 1035, https://www.rfc-editor.org/rfc/rfc1035.html | D | 2026-10-23 | High |
| S9b | Recursive vs iterative resolution | RFC 1034, https://www.rfc-editor.org/rfc/rfc1034.html | D | 2026-10-23 | High |
| S10 | TCP three-way handshake | RFC 9293 (Aug 2022), https://www.rfc-editor.org/rfc/rfc9293.html | D | 2026-10-23 | High |
| S11 | TLS 1.3 1-RTT handshake; 0-RTT not replay-protected | RFC 8446 (Aug 2018), https://www.rfc-editor.org/rfc/rfc8446.html | D | 2026-10-23 | High |
| S12 | HTTP/1.1 multiple connections; HTTP/2 TCP stall on loss; HTTP/3 per-stream reliability over QUIC | RFC 9114 (Jun 2022) section 1, https://www.rfc-editor.org/rfc/rfc9114.html | D | 2026-10-23 | High |
| S13 | QUIC over UDP, combined handshake, 0-RTT, connection migration | RFC 9000 (May 2021), https://www.rfc-editor.org/rfc/rfc9000.html | D | 2026-10-23 | High |
| S14 | Anycast definition; stability and per-packet balancing risk for TCP | RFC 4786 (BCP 126, Dec 2006), https://www.rfc-editor.org/rfc/rfc4786.html | D | 2026-10-23 | High |
| S15 | ALB round robin per request; NLB flow hash per connection; cross-zone percentages; DNS TTL 60 s | https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html | D | 2026-10-23 | High |
| S16 | Envoy round robin, least request with 2 random choices, ring hash (Ketama), Maglev | https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/load_balancing/load_balancers | D | 2026-10-23 | High |
| S17 | Two choices gives exponential improvement; three only a constant factor more | Mitzenmacher, IEEE TPDS 12(10), 2001, https://www.eecs.harvard.edu/~michaelm/postscripts/tpds2001.pdf | P | 2026-10-23 | High |
| S18 | Consistent hashing introduced for distributed caching and hot spots | Karger et al., STOC 1997, https://www.cs.princeton.edu/courses/archive/fall09/cos518/papers/chash.pdf | P | 2026-10-23 | High (abstract read) |
| S19 | Liveness, local, dependency health checks; fail open; deep check risks | AWS Builders' Library, "Implementing health checks" (2019-12-05), https://builder.aws.com/content/3Ev53O39izHCtWLzp4XU6t8PC1O/implementing-health-checks | F | 2026-10-23 | High |
| S20 | Readiness vs liveness probes | https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/ | D | 2026-10-23 | High |
| S21 | Interactive load balancing essay: algorithms, controls, percentile charts, P2C missing | Sam Rose, https://samwho.dev/load-balancing/ (2023-04-10) | S | 2026-10-23 | Medium |
| S22 | Cache-Control directives, freshness, Age, ETag revalidation, 304 | RFC 9111 (Jun 2022), https://www.rfc-editor.org/rfc/rfc9111.html | D | 2026-10-23 | High |
| S23 | stale-while-revalidate and stale-if-error | RFC 5861 (May 2010), https://www.rfc-editor.org/rfc/rfc5861.html | D | 2026-10-23 | High |
| S24 | Look-aside cache; delete not update; leases for stale sets and thundering herds; 17K/s to 1.3K/s | Nishtala et al., "Scaling Memcache at Facebook", NSDI 2013, https://www.usenix.org/system/files/conference/nsdi13/nsdi13-final170_update.pdf | P | 2026-10-23 | High |
| S25 | Cache stampede definition; probabilistic early expiration (XFetch) optimal | Vattani, Chierichetti, Lowenstein, PVLDB 8(8) 2015, https://www.vldb.org/pvldb/vol8/p886-vattani.pdf | P | 2026-10-23 | High |
| S26 | Lazy loading (three trips on miss, stale data), write-through (churn), TTL | https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Strategies.html | D | 2026-10-23 | High |
| S27 | Redis eviction policies; approximated LRU and LFU | https://redis.io/docs/latest/develop/reference/eviction/ | D | 2026-10-23 | High |
| S28 | CloudFront invalidation vs versioned names; 1,000 free paths a month | https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html and .../PayingForInvalidation.html | D | 2026-10-23 | High |
| S29 | Sliding window counter formula; 0.003% error over 400M requests | Cloudflare blog, 2017-06-07, https://blog.cloudflare.com/counting-things-a-lot-of-different-things/ | F | 2026-10-23 | High |
| S30 | API Gateway token bucket; rate and burst; 429; limits are targets | https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html | D | 2026-10-23 | High |
| S31 | nginx limit_req leaky bucket; burst, nodelay; default 503; limit_req_status | https://nginx.org/en/docs/http/ngx_http_limit_req_module.html | D | 2026-10-23 | High |
| S32 | Stripe's four limiters; token bucket in Redis | Tarjan, Stripe blog, 2017-03-30, https://stripe.com/blog/rate-limiters | F | 2026-10-23 | High |
| S33 | 429 Too Many Requests defined | RFC 6585, https://www.rfc-editor.org/rfc/rfc6585.html | D | 2026-10-23 | High |
| S34 | HPA formula, 15 s loop, stabilisation window | https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/ | D | 2026-10-23 | High |
| S35 | Rolling update defaults 25% / 25% | https://kubernetes.io/docs/concepts/workloads/controllers/deployment/ | D | 2026-10-23 | High |
| S36 | Monolith first | Fowler, 2015-06-03, https://martinfowler.com/bliki/MonolithFirst.html | S | 2026-10-23 | Medium |
| S37 | LSM write path, compaction, amplification trade-offs | https://github.com/facebook/rocksdb/wiki/RocksDB-Overview | D | 2026-10-23 | High |
| S38 | PostgreSQL 18 async by default; lag typically under 1 s; sync replication cost | https://www.postgresql.org/docs/current/warm-standby.html (18.6) | D | 2026-10-23 | High |
| S39 | Aurora replica lag usually much less than 100 ms; up to 15 replicas; shared volume | https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Replication.html | D | 2026-10-23 | High |
| S40 | DynamoDB partition key hashing; 3,000 RCU and 1,000 WCU per partition | https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.Partitions.html and .../bp-partition-key-design.html | D | 2026-10-23 | High |
| S41 | GSIs updated asynchronously, eventually consistent | https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GSI.html | D | 2026-10-23 | High |
| S42 | Conditional writes prevent lost update; idempotent conditional writes; atomic counters not idempotent | https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/WorkingWithItems.html | D | 2026-10-23 | High |
| S43 | Global tables MREC uses last writer wins; MRSC option | https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/V2globaltables_HowItWorks.html | D | 2026-10-23 | High |
| S44 | DynamoDB architecture: Multi-Paxos groups, leases, quorum writes, hot partitions, 89.2M rps | Elhemali et al., USENIX ATC 2022, https://www.usenix.org/system/files/atc22-elhemali.pdf | P | 2026-10-23 | High |
| S45 | Dynamo techniques table, (3,2,2), sloppy quorum, hinted handoff, Merkle trees, vector clocks, 99.94% | DeCandia et al., SOSP 2007, https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf | P | 2026-10-23 | High |
| S46 | Consistency model hierarchy and availability classes | https://jepsen.io/consistency/models | D | 2026-10-23 | High |
| S47 | Linearizable definition; not totally or sticky available; Herlihy and Wing | https://jepsen.io/consistency/models/linearizable | D | 2026-10-23 | High |
| S48 | Sequential consistency; no real-time constraint; Lamport 1979 | https://jepsen.io/consistency/models/sequential | D | 2026-10-23 | High |
| S49 | Causal consistency; sticky available | https://jepsen.io/consistency/models/causal | D | 2026-10-23 | High |
| S50 | Four session guarantees; password-change example | Terry et al., PDIS 1994, https://pages.cs.wisc.edu/~remzi/Classes/739/Fall2016/Papers/bayou-sessions94.pdf | P | 2026-10-23 | High |
| S51 | Six guarantees incl. consistent prefix and bounded staleness | Terry, MSR-TR Oct 2011, https://www.microsoft.com/en-us/research/wp-content/uploads/2011/10/ConsistencyAndBaseballReport.pdf | P | 2026-10-23 | High |
| S52 | Drift 50 ppm, NTP slewing, leap second bug, read-after-write, quorums, ABD, CAS needs total order broadcast, LWW data loss, linearizability not serializability | Kleppmann, Cambridge Distributed Systems notes 2025/26, https://www.cl.cam.ac.uk/teaching/2526/ConcDisSys/dist-sys-notes.pdf | S | 2026-10-23 | High |
| S53 | etcd transactions (If/Then/Else on mod_revision); leases | https://etcd.io/docs/v3.6/learning/api/ | D | 2026-10-23 | High |
| S54 | etcd linearizable reads by default; strict serializable KV; watch about 10 ms; lease TTL by wall clock | https://etcd.io/docs/v3.6/learning/api_guarantees/ | D | 2026-10-23 | High |
| S55 | CAP definitions; partitions not a choice; most systems neither CP nor AP | Kleppmann, 2015-05-11, https://martin.kleppmann.com/2015/05/11/please-stop-calling-databases-cp-or-ap.html | S | 2026-10-23 | High |
| S56 | "2 of 3" misleading; partitions rare; fine-grained C vs A | Brewer, IEEE Computer 2012, republished https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/ | P | 2026-10-23 | High |
| S57 | PACELC definition and classifications | Abadi, 2010-04-23, https://dbmsmusings.blogspot.com/2010/04/problems-with-cap-and-yahoos-little.html | S | 2026-10-23 | High |
| S58 | Clock Condition; converse does not hold; IR1, IR2 | Lamport, CACM 21(7), July 1978, https://lamport.azurewebsites.net/pubs/time-clocks.pdf | P | 2026-10-23 | High |
| S59 | HLC: causal, close to NTP, 64-bit NTP format | Kulkarni et al., 2014, https://cse.buffalo.edu/tech-reports/2014-04.pdf | P | 2026-10-23 | High |
| S60 | TrueTime epsilon values, drift, poll, commit wait, leases, Figure 6 | Corbett et al., OSDI 2012, https://static.googleusercontent.com/media/research.google.com/en//archive/spanner-osdi2012.pdf | P | 2026-10-23 | High |
| S61 | Amazon Time Sync; leap smearing on NTP, not PHC; leap seconds end by 2035 | https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/set-time.html | D | 2026-10-23 | High |
| S62 | Clock error bound under 100 microseconds (NTP), under 40 (PHC) | AWS Compute blog, 2023-11-16, https://aws.amazon.com/blogs/compute/its-about-time-microsecond-accurate-clocks-on-amazon-ec2-instances/ | F | 2026-10-23 | High |
| S63 | ClockBound interval and error bound formula | https://github.com/aws/clock-bound | D | 2026-10-23 | High |
| S64 | NTP within 1 ms on a quiet subnet; "It All Depends" | https://www.ntp.org/ntpfaq/ntp-s-algo/ | S | 2026-10-23 | Medium |
| S65 | Snowflake bit layout, k-sorted, NTP, archived 2021 | https://github.com/twitter-archive/snowflake/tree/snowflake-2010 | F | 2026-10-23 | High |
| S66 | UUIDv7 layout; SHOULD prefer v7; index locality | RFC 9562 (May 2024), https://www.rfc-editor.org/rfc/rfc9562.html | D | 2026-10-23 | High |
| S67 | Paxos phases; distinguished proposer; FLP needs randomness or time | Lamport, "Paxos Made Simple", 2001, https://lamport.azurewebsites.net/pubs/paxos-simple.pdf | P | 2026-10-23 | High |
| S68 | Raft terms, election timeouts, timing inequality, commitment rule, user study | Ongaro and Ousterhout, extended version, https://raft.github.io/raft.pdf | P | 2026-10-23 | High |
| S69 | Raft site and RaftScope visualisation; paper won best paper at USENIX ATC 2014 | https://raft.github.io/ | D | 2026-10-23 | High |
| S70 | Fencing tokens; lease and GC pause; Redlock timing critique | Kleppmann, 2016-02-08, https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html | S | 2026-10-23 | High |
| S71 | Chubby sequencers carry lock generation number | Burrows, OSDI 2006, https://static.googleusercontent.com/media/research.google.com/en//archive/chubby-osdi06.pdf | P | 2026-10-23 | High |
| S72 | SWIM design and scalability | Das, Gupta, Motivala, DSN 2002, https://courses.grainger.illinois.edu/cs425/fa2022/dsn02-SWIM.pdf | P | 2026-10-23 | High |
| S73 | Phi accrual formula, default threshold 8, 12 on EC2 | https://pekko.apache.org/docs/pekko/current/typed/failure-detector.html | D | 2026-10-23 | High |
| S74 | G-Counter, PN-Counter, G-Set, 2P-Set, OR-Set, LWW-Register specs | Shapiro et al., INRIA RR-7506, Jan 2011, https://inria.hal.science/inria-00555588/document | P | 2026-10-23 | High |
| S75 | Strong Eventual Consistency; CRDT convergence | Shapiro et al., INRIA RR-7687, 2011, https://inria.hal.science/inria-00609399v1/document | P | 2026-10-23 | High |
| S76 | Cassandra LWW lost about 28% of acknowledged writes (2013) | Kingsbury, 2013-09-24, https://aphyr.com/posts/294-call-me-maybe-cassandra | F | 2026-10-23 | High (for 2013 versions) |
| S77 | 2PC blocks if coordinator fails; Paxos Commit | Gray and Lamport, MSR-TR-2003-96 (ACM TODS 2006), https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/tr-2003-96.pdf | P | 2026-10-23 | High |
| S78 | Sagas and compensating transactions | Garcia-Molina and Salem, Princeton TR-070-87 (Jan 1987), https://www.cs.princeton.edu/research/techreps/598 | P | 2026-10-23 | Medium (abstract only) |
| S79 | Transactional outbox; relay may publish twice | Richardson, https://microservices.io/patterns/data/transactional-outbox.html | S | 2026-10-23 | Medium |
| S80 | Idempotency keys: saved response, 255 chars, 24 h, parameter check | https://docs.stripe.com/api/idempotent_requests | D | 2026-10-23 | High |
| S81 | Same key, same partition, same order | Kafka 4.3 intro, https://kafka.apache.org/43/getting-started/introduction/ | D | 2026-10-23 | High |
| S82 | Delivery semantics; consumer groups; at-least-once default; exactly-once limits | Kafka 4.3 design, https://kafka.apache.org/43/design/design/ | D | 2026-10-23 | High |
| S83 | SQS standard at-least-once | https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/standard-queues-at-least-once-delivery.html | D | 2026-10-23 | High |
| S84 | Visibility timeout default 30 s, max 12 h | .../sqs-visibility-timeout.html | D | 2026-10-23 | High |
| S85 | DLQ redrive with maxReceiveCount | .../sqs-dead-letter-queues.html | D | 2026-10-23 | High |
| S86 | FIFO 5-minute deduplication | .../FIFO-queues-exactly-once-processing.html | D | 2026-10-23 | High |
| S87 | Tumbling, sliding, session, global windows | Flink 2.3, https://nightlies.apache.org/flink/flink-docs-stable/docs/dev/datastream/operators/windows/ | D | 2026-10-23 | High |
| S88 | Node.js backpressure: write() false, highWaterMark 16 KB | https://nodejs.org/en/learn/modules/backpressuring-in-streams | D | 2026-10-23 | High |
| S89 | Timeouts from p99.9; 243x retry amplification; retry at one layer; token bucket; idempotency | Brooker, AWS Builders' Library, https://builder.aws.com/content/3EumjoZascWd1oZiEgL8ORlv3qE/timeouts-retries-and-backoff-with-jitter | F | 2026-10-23 | High |
| S90 | Full, equal, decorrelated jitter compared | Brooker, AWS Architecture blog, 2015-03-04, https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/ | F | 2026-10-23 | High |
| S91 | Retry budgets, backoff, deadlines, load shedding; 64-attempt example (4 attempts at 3 layers) | Google SRE book, "Addressing Cascading Failures", https://sre.google/sre-book/addressing-cascading-failures/ | F | 2026-10-23 | High |
| S92 | Circuit breaker states | Fowler, 2014-03-06, https://martinfowler.com/bliki/CircuitBreaker.html | S | 2026-10-23 | High |
| S93 | Bulkhead pattern | https://learn.microsoft.com/en-us/azure/architecture/patterns/bulkhead | D | 2026-10-23 | High |
| S94 | Metastable failures and sustaining effects | Bronson et al., HotOS 2021, https://sigops.org/s/conferences/hotos/2021/papers/hotos21-s11-bronson.pdf | P | 2026-10-23 | High |
| S95 | SLI, SLO, SLA definitions; percentiles; Chubby planned outages | Google SRE book, "Service Level Objectives", https://sre.google/sre-book/service-level-objectives/ | F | 2026-10-23 | High |
| S96 | Error budget definition and example | Google SRE book, "Embracing Risk", https://sre.google/sre-book/embracing-risk/ | F | 2026-10-23 | High |
| S97 | Four golden signals; error latency; histograms | Google SRE book, "Monitoring Distributed Systems", https://sre.google/sre-book/monitoring-distributed-systems/ | F | 2026-10-23 | High |
| S98 | OpenTelemetry signals | https://opentelemetry.io/docs/concepts/signals/ | D | 2026-10-23 | Medium (nav text only) |
| S99 | W3C Trace Context traceparent header | https://www.w3.org/TR/trace-context/ | D | 2026-10-23 | High |
| S100 | Inverted index: term dictionary and postings | Lucene 10.3 codec docs, https://lucene.apache.org/core/10_3_0/core/org/apache/lucene/codecs/lucene103/package-summary.html | D | 2026-10-23 | High |
| S101 | S2 cube projection, quadtree subdivision, levels 0 to 30, 1 cm leaves | https://s2geometry.io/devguide/s2cell_hierarchy | D | 2026-10-23 | High |
| S102 | H3 hexagonal cells, Uber, Apache 2 | https://h3geo.org/docs/ | D | 2026-10-23 | High |
| S103 | Twitter timelines talk exists (2012 QCon, posted 2013-04-03); no fan-out detail in summary | https://www.infoq.com/presentations/Twitter-Timeline-Scalability/ | F | 2026-10-23 | Low |
| S104 | WebSocket two-way over TCP, replaces long polling | RFC 6455 (Dec 2011), https://www.rfc-editor.org/rfc/rfc6455.html | D | 2026-10-23 | High |
| S105 | SSE EventSource, reconnect, Last-Event-ID, 204 stops | WHATWG HTML 9.2, https://html.spec.whatwg.org/multipage/server-sent-events.html | D | 2026-10-23 | High |
| S106 | Long polling and streaming known issues | RFC 6202 (Apr 2011), https://www.rfc-editor.org/rfc/rfc6202.html | D | 2026-10-23 | High |
| S107 | Four DR strategies | https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html | D | 2026-10-23 | High |
| S108 | RTO and RPO definitions | https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/business-continuity-plan-bcp.html | D | 2026-10-23 | High |
| S109 | Blue-green deployment; schema changes separately | Fowler, 2010 (updated 2015), https://martinfowler.com/bliki/BlueGreenDeployment.html | S | 2026-10-23 | High |
| S110 | Canary definition, control comparison, 20% on 5% canary shows about 1% | Google SRE workbook, https://sre.google/workbook/canarying-releases/ | F | 2026-10-23 | High |
| S111 | Route 53 failover and latency routing | https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html | D | 2026-10-23 | High |
| S112 | Global Accelerator static anycast IPs | https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html | D | 2026-10-23 | High |
| S113 | Bloom filters: false positives, no false negatives; optimal k | Broder and Mitzenmacher, Internet Mathematics 1(4), https://www.eecs.harvard.edu/~michaelm/postscripts/im2005b.pdf | P | 2026-10-23 | High |
| S114 | HyperLogLog error 1.04/sqrt(m); 2% at 1.5 KB beyond 10^9 | Flajolet et al., AofA 2007, https://algo.inria.fr/flajolet/Publications/FlFuGaMe07.pdf | P | 2026-10-23 | High |
| S115 | Redis HLL 12 KB, 0.81% | https://redis.io/docs/latest/develop/data-types/probabilistic/hyperloglogs/ | D | 2026-10-23 | High |
| S116 | Count-min: ignore counts below the error threshold | https://redis.io/docs/latest/develop/data-types/probabilistic/count-min-sketch/ | D | 2026-10-23 | Medium |
| S117 | cgroups definition | https://man7.org/linux/man-pages/man7/cgroups.7.html | D | 2026-10-23 | High |
| S118 | kafka-native is GraalVM, for non-production dev and test, KRaft combined mode | https://hub.docker.com/r/apache/kafka-native | D | 2026-10-23 | High |
| S119 | Image sizes and tags (Valkey, Redis, Postgres, nginx, Redpanda, Kafka, LocalStack, kind, Node, Jaeger, Prometheus, Grafana) | Docker Hub API, https://hub.docker.com/v2/repositories/... | R | 2026-10-23 | High |
| S120 | etcd image tags and sizes | Quay API, https://quay.io/api/v1/repository/coreos/etcd/tag/ | R | 2026-10-23 | High |
| S121 | LocalStack single image from 2026-03-23; account and token; pinning risks | LocalStack blog, 2026-03-05, https://blog.localstack.cloud/localstack-single-image-next-steps/ | F | 2026-10-23 | High |
| S122 | 2026.3.0 merged images; entitlements by token; bypass until 2026-04-06; calendar versions | LocalStack blog, 2026-03-23, https://blog.localstack.cloud/localstack-for-aws-release-2026-03-0/ | F | 2026-10-23 | High |
| S123 | Hobby plan free, non-commercial, 30+ services; service matrix | https://www.localstack.cloud/pricing | D | 2026-10-23 | Medium (matrix inferred) |
| S124 | Redis 8 licences RSALv2, SSPLv1, AGPLv3 | https://redis.io/legal/licenses/ | D | 2026-10-23 | High |
| S125 | Valkey BSD-3-Clause | https://github.com/valkey-io/valkey | D | 2026-10-23 | High |
| S126 | Redpanda core BSL, Apache 2 at change date; RCL for enterprise | https://github.com/redpanda-data/redpanda/blob/dev/licenses/README.md | D | 2026-10-23 | Medium |
| S127 | moto 5.2.4 Apache-2.0; motoserver/moto about 104 MB | https://pypi.org/pypi/moto/json and Docker Hub API | R | 2026-10-23 | High |
| S128 | Node.js 22, 24, 26 LTS and end-of-life dates | https://raw.githubusercontent.com/nodejs/Release/main/schedule.json | R | 2026-10-23 | High |
| S129 | X-Ray SDKs and daemon in maintenance mode from 2026-02-25 | https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-migration.html | D | 2026-10-23 | High |
| S130 | Cloud Map service discovery, healthy resources only | https://docs.aws.amazon.com/cloud-map/latest/dg/what-is-cloud-map.html | D | 2026-10-23 | High |
| S131 | WAF rate-based rule statements exist | https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-rate-based.html | D | 2026-10-23 | Low (title only) |
| S132 | Kinesis records have partition key and sequence number | https://docs.aws.amazon.com/streams/latest/dev/key-concepts.html | D | 2026-10-23 | High |
| S133 | Leap second broke Cloudflare DNS, 2017-01-01 | https://blog.cloudflare.com/how-and-why-the-leap-second-affected-cloudflare-dns/ | F | 2026-10-23 | High |
| S134 | GitHub 2018-10-21: 43 s partition, 24 h 11 min degradation | https://github.blog/news-insights/company-news/oct21-post-incident-analysis/ | F | 2026-10-23 | High |
| S135 | AWS us-east-1 2025-10-19/20 DynamoDB DNS race, EC2 and NLB effects | https://aws.amazon.com/message/101925/ | F | 2026-10-23 | High |
| S136 | Meta 2021-10-04 backbone and BGP/DNS outage | https://engineering.fb.com/2021/10/05/networking-traffic/outage-details/ | F | 2026-10-23 | High |
| S137 | Explorable explanations: reactive documents, author guides | Victor, 2011-03-10, https://worrydream.com/ExplorableExplanations/ | S | 2026-10-23 | High |
| S138 | explorabl.es hub | https://explorabl.es/ | S | 2026-10-23 | Medium |
| S139 | samwho systems essays list | https://samwho.dev/ | S | 2026-10-23 | Medium |
| S140 | Learn Your Way, 2025-09-16; 11 points higher long-term recall | https://blog.google/outreach-initiatives/education/learn-your-way/ | F | 2026-10-23 | Medium |
| S141 | PAIR AI Explorables | https://pair.withgoogle.com/explorables/ | F | 2026-10-23 | Medium |
| S142 | MIT 6.5840 Spring 2026 schedule and labs | https://pdos.csail.mit.edu/6.824/schedule.html | S | 2026-10-23 | High |
| S143 | scaledojo.com redirects (301) to an unrelated company | https://scaledojo.com/ (observed redirect) | S | 2026-10-23 | Medium |
| S144 | CodeExercise JavaScript only | `agent-ip/04-interactive-playbook.md` | I | 2026-10-23 | High |
| S144b | Course time-budget bands | `agent-ip/02-course-architecture.md` | I | 2026-10-23 | High |
| S145 | Registered canvases including sysdesign-truetime-commit-wait and sysdesign-replica-lag | `server/src/shared/canvas/slugs.ts`, `frontend/src/canvas/*/spec.md`, `agent-ip/10-interactive-canvases.md` | I | 2026-10-23 | High |
| S146 | Learner, constraints, roadmap hours, challenges, AWS mapping | `agent-ip/work/system-design/00-course-brief.md`, `02-curriculum-roadmap.md` | I | 2026-10-23 | High |
| S147 | Kubernetes Service DNS names | https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/ | D | 2026-10-23 | High |

## Unverified claims (do not use as fact in learner-facing text)

1. Exact 90th, 99th and 99.9th percentile epsilon values in Spanner's Figure 6 [S60].
2. The "unfriend then post a photo" example as part of the Spanner OSDI paper (not found in the text) [S60].
3. LocalStack Hobby service list (matrix inferred from icons) [S123], and whether tags 4.13 and 4.14 run without a token.
4. moto's coverage of the services challenge 17 needs.
5. ScaleDojo's features, pricing and current status [S143].
6. The Secret Lives of Data content (not read).
7. RaftScope's specific controls [S69].
8. Twitter's hybrid fan-out design details [S103].
9. Public-internet NTP accuracy as a single number [S64].
10. napkin-math's 20 ns random memory figure versus the 100 ns main memory reference [S3].
11. TLS 1.2 handshake round trips.
12. Write-back (write-behind) as a sourced term; TTL jitter as a named practice; fixed window and sliding log as sourced algorithms.
13. Count-min "never underestimates" as a citation (primary paper not read).
14. Geohash primary definition; quadtree original paper.
15. H3's resolution count.
16. Step Functions saga guidance page.
17. API Gateway default account-level limits (the page read gives no numbers).
18. Docker Desktop download size; licences marked "not re-checked" in the image table.
19. Learn Your Way trial size and per-group scores beyond Google's sentence [S140].
20. Cross-region asynchronous replication lag as a general number.
21. namespaces(7) wording (page failed to load).

## Open questions

1. **LocalStack.** The brief's "community edition" is gone [S121, S122]. Options: (a) Hobby accounts for learners, if the fellowship counts as non-commercial (needs a human reading of the Hobby terms) [S123]; (b) pin `4.14` with a CVE warning [S121]; (c) moto server, Apache-2.0, about 104 MB [S127]; (d) drop the AWS emulator and keep "In AWS" notes only. Needs the sponsor.
2. **Node.js version.** Node 22 ends 2027-04-30 [S128]. Move the template to Node 24 (to April 2028) or 26 (LTS from 2026-10-28)?
3. **Kafka-compatible broker.** Redpanda (122 MB, BSL) [S119, S126], `apache/kafka-native` (55 MB, Apache 2.0, "non-production") [S118], or `apache/kafka` (239 MB). Recommendation: kafka-native for the default path, since it is the smallest and is the real Kafka protocol; confirm consumer-group behaviour in challenge 14 at G5.
4. **Valkey or Redis.** Valkey 9 alpine is 18.8 MB, BSD-3 [S119, S125]; Redis 8 alpine is 39.1 MB with a tri-licence [S124]. The brief already prefers Valkey; confirm.
5. **Kubernetes hands-on.** kind needs about 380 MB plus the binary [S119]. Keep kind as stretch and teach core Kubernetes through the cluster canvas?
6. **TrueTime canvas example.** Relabel the unfriend example as a course composite, or find a primary source.
7. **Latency table policy.** Teach the "Current" column from napkin-math with its caveat, with the classic column only as a "why tables age" lesson? An SME should review the memory latency row.
8. **AWS tracing mapping.** Replace X-Ray with CloudWatch plus OpenTelemetry in Module 17's note [S129]?
9. **Sandbox prices.** Which Region and date are the illustrative prices taken from? Prices were not researched here.
10. **Prior-art naming.** The brief and roadmap call the labs "ScaleDojo-style". With the domain redirecting [S143], describe the lab format on its own terms in learner-facing text.

## Handoff

```yaml
artifact: research-dossier
course: system-design
version: 1
sources_checked: 2026-10-23
hard_constraints: [javascript-only browser and Node.js version clock, phones and small images, no paid cloud and LocalStack change, dated numbers and model limits, precise correctness definitions for ESL learners]
out_of_scope: [BFT and formal proofs, Paxos variants, building storage engines or consensus libraries, Kubernetes operations, vendor tours, prices as facts]
open_questions: [LocalStack path, Node version, Kafka image, Valkey vs Redis, kind, TrueTime example source, latency table policy, X-Ray mapping, sandbox price date, ScaleDojo naming]
```
