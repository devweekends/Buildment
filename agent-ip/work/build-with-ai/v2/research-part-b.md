---
artifact: research-dossier-part
course: build-with-ai (v2 amendment)
part: B
scope: using AI with judgment (why the common first answer, ask several times, four cases, slow down and validate) and growing fast (programs, team practice, public work)
phase: G1
sources_checked: 2026-10-25
version: 1
---

# Research part B: judgment and growing fast

Today is 2026-10-25. Every source below was fetched on that date unless the row says otherwise. Vendor benchmarks and vendor pricing are labelled as vendor claims. Fast-moving facts (versions, prices, program dates) carry the check date and must be re-checked before publish.

Pointers to v1 (not repeated here; re-check any tool fact before reuse): package hallucination [v1 S92], fabricated citations [v1 S91], sycophancy study and rollback [v1 S93, S94], news-answer errors [v1 S98], retrieval tools still err [v1 S99], insecure AI code [v1 S95, S96], feeling faster is not being faster [v1 S97a, S97b], open-source licences and "public is not open source" [v1 S100 to S102], GitHub activity as a hiring signal, 2013 [v1 S105], learning science [v1 sections B and C].

## Findings

### 1. Why an AI assistant gives the common first answer

**How the answer is picked.** Language models score many possible next words and then pick one. Google's Gemini API docs say temperature "controls the degree of randomness in token selection", that temperature 0 means the highest-probability choice is always selected, and that top-k and top-p first narrow the candidate tokens before the final token is chosen by temperature sampling [B1]. So a plain chat answer is a pick from a ranked list, and the top of the list is the likely option. One caution: Google's page now says its newest models (Gemini 4 and Gemini 3.6 and later) ignore custom temperature, top-p and top-k values [B2]. So "turn the temperature up to get variety" is not a lesson to teach; changing the question is.

*Phrase it this way:* "An AI model picks its words from a ranked list of likely words. The most likely answer comes first, and it is often the most common one. You get a different answer by giving it different facts, not by hoping for luck."

**Tuning for human preference narrows answers.** Kirk et al. compared supervised fine-tuning with RLHF (learning from human feedback) on summarising and instruction following. RLHF generalised better to new inputs, but it "significantly reduces output diversity" across several measures, a trade-off between the two [B5]. Limits: two base models, two task types, a preprint, 2023. It supports "tuned models give narrower answers", not "every assistant gives one answer".

**Popularity bias is measured for code choices.** Twist et al. studied eight LLMs. They found a strong tendency to overuse widely adopted libraries (for example NumPy, in up to 45% of cases where it was not needed), a default preference for Python even where another language fits better (Python still dominant in 58% of cases), and Rust was not used once. The authors conclude models favour familiarity and popularity over suitability [B6]. Limits: the task set and eight models in the paper; it studies libraries and languages, not databases, caches or patterns. Treat it as the closest published evidence for the course's claim, not proof for each of the four cases.

*Phrase it this way:* "In one study of eight AI models, the models often chose the most popular library or language, even when another one fitted better."

**Old knowledge.** Vendors publish a knowledge cutoff for each model. Anthropic's model overview separates a "reliable knowledge cutoff" (the date through which knowledge is most extensive and reliable) from the broader training data cutoff [B3]. Cheng et al. found that a model's effective cutoff often differs from the date its maker reports, because old data appears in newer data dumps and because of duplicate-removal problems [B4]. For this course the lesson is concrete: Redis changed licence on 2024-03-20 [B29], added a third licence option with Redis 8 in 2025 [B30], and Valkey was announced on 2024-03-28 [B34]. A model, or a tool without live search, may describe the world before these dates.

*Phrase it this way:* "An AI model learned from text up to some date. It may not know about a licence change or a new fork. Ask it for its cutoff, then check the project's own site."

**Agreement over truth.** Sharma et al. found that five AI assistants showed sycophancy (tailoring answers to the user's views) across four tasks. Answers that matched a user's views were more likely to be preferred, and humans and preference models sometimes preferred convincing sycophantic answers over correct ones [B7]. OpenAI rolled back a GPT-4o update in late April 2025 because it was "overly flattering or agreeable"; the company said it had focused too much on short-term feedback [B8]. A follow-up post says a new thumbs-up and thumbs-down reward signal likely tipped the balance, that offline evaluations and small A/B tests looked good, and that launching anyway "was the wrong call" [B9]. For the course: if you ask "Redis is best, right?", you may hear yes. Ask neutral questions and ask for the case against your idea.

*Phrase it this way:* "AI assistants tend to agree with you. Ask 'when would this choice be wrong?' as well as 'is this right?'."

**Outputs can be similar for many people.** OpenAI's terms (effective 2026-01-01) say that, because of how the services work, outputs may not be unique and other users may get similar output [B10]. This is a plain, first-party statement that supports "many people get the same answer".

**Context changes the answer.** Anthropic's prompt guidance for its models says that giving context or motivation, such as why a behaviour matters, can give the model more information about your goals and help it produce more targeted responses [B11]. This is vendor guidance, not an independent study. It supports the course method (give workload, scale, team, cost, licence) but the size of the effect is not measured here.

### 2. Why asking several times or several assistants helps, with limits

- **Same model, many samples.** Self-consistency samples several reasoning paths and takes the most consistent final answer. On arithmetic and commonsense benchmarks it raised accuracy by 17.9 points on GSM8K, 11.0 on SVAMP, 12.2 on AQuA, 6.4 on StrategyQA and 3.9 on ARC-challenge [B12]. Limits: questions with one checkable final answer; 2022 models; it does not help when the model is wrong in the same way each time.
- **Several model copies debating.** Du et al. had several model instances propose answers and debate over rounds. They report better maths and strategy reasoning and fewer false facts [B13]. Limits: preprint (no venue confirmed on the page), the same model family argues with itself, and it costs more calls.
- **Several different models as a crowd.** Schoenegger et al. aggregated 12 LLMs on 31 forecasting questions and found the crowd was not statistically different from 925 human forecasters. Averaging human and machine forecasts did better than the machine alone in their second study [B14]. Limits: binary forecasting questions in one tournament; 2024 models; preprint; the authors also saw an "acquiescence" tilt toward yes.
- **Errors are shared.** Kim et al. (ICML 2025) tested over 350 LLMs and found that on one leaderboard, when two models are both wrong, they agree on the same wrong answer 60% of the time; larger and more accurate models have more highly correlated errors, and shared providers and architectures add to it [B15]. This is the key limit: asking three assistants is not asking three independent experts. Agreement raises your confidence less than it feels.
- **Vendor guidance agrees on the method.** Anthropic's guide to reducing hallucinations suggests "Best-of-N verification": run the same prompt several times and compare; inconsistencies can indicate hallucination. It also suggests letting the model say it does not know and asking it to find a supporting quote for each claim, retracting any claim it cannot support [B16]. Vendor guidance, not an independent test.

*Phrase it this way:* "Asking two or three assistants can show you where they disagree. That is where to look first. When they all agree, they can still all be wrong, because they learned from similar text. Check one claim in the project's own docs."

Package hallucination is already in the v1 dossier [v1 S92]; link to it from the "check before you install" habit.

### 3. Case: time series database (Prometheus, VictoriaMetrics)

**Prometheus (project docs).**
- Prometheus keeps data in a local on-disk time series database. The docs say its local storage "is not clustered or replicated", so it is not arbitrarily scalable or durable if a drive or node fails, and should be managed like any other single-node database. The same page says that with proper design years of data can be kept locally, and recommends snapshots for backups [B17].
- For long-term retention and scale beyond one node, Prometheus offers remote write and read interfaces to other systems, and says careful evaluation is needed because those systems "vary greatly in durability, performance, and efficiency" [B18].
- Defaults: retention 15 days if no flag is set; about 1 to 2 bytes per sample on average; NFS (including AWS EFS) is not supported for local storage [B19].
- Design stance: each server is standalone; it values reliability during an outage; it is not a good fit when you need 100% accuracy, such as per-request billing [B20]. Prometheus joined CNCF in 2016 as the second hosted project [B20] and graduated in 2018, the second project to do so after Kubernetes [B21].

**VictoriaMetrics (project docs).**
- Single-node and cluster versions are released under Apache License 2.0; the README says it supports both PromQL and its own MetricsQL [B22]. MetricsQL is described as backwards-compatible with PromQL, so Grafana dashboards written for a Prometheus data source "should work the same", with "intentional differences" listed [B23]. Treat "drop-in" as the vendor's claim; test your own queries.
- Enterprise is a separate edition. Docs list enterprise-only features including downsampling, multiple retentions, backup automation (vmbackupmanager), mTLS, Kafka and Google PubSub ingestion, anomaly detection and others; the community components are open source and free [B24]. So downsampling for cheap long-term storage is not in the free edition.
- The cluster docs recommend the single-node version for ingestion below one million data points per second and say it is simpler to run ("think twice before choosing the cluster version"). The cluster has vminsert, vmselect and vmstorage components, replication through a `-replicationFactor` flag, and multi-tenancy; single-node has no multi-tenancy [B25].
- **Vendor claims, not independent:** the README and single-node docs claim up to 7x less RAM than Prometheus, Thanos or Cortex, 10x less RAM than InfluxDB, and up to 7x less storage than Prometheus, Thanos or Cortex, citing benchmarks written by VictoriaMetrics' own staff [B26]. We could not fetch those benchmark posts and found no independent lab comparison (U3).

**Other options, one line each.** Thanos adds high availability and long-term storage on top of existing Prometheus servers, with optional object storage, under Apache 2.0 [B27]. Grafana Mimir is a horizontally scalable, multi-tenant TSDB for long-term Prometheus storage, claims scale to 1 billion active series (vendor claim), and is licensed AGPLv3 [B28]. Prometheus's own integrations page lists Mimir, Cortex and others as remote storage targets [B18].

**Fair conclusion for the course (the course's reading of B17 to B28, not a ranking).**
- Prometheus wins when: you want the default, widely documented choice; one server holds your series and retention (days to weeks, or years with good disk planning); you need a simple standalone design that still works during an outage; your team already knows PromQL and its ecosystem.
- VictoriaMetrics is worth testing when: memory or disk cost on one node is the pain; you want long retention and a single binary; you can accept a project with an enterprise edition, and you can run your own comparison on your data. Its resource savings are the vendor's claim until you measure.
- Thanos or Mimir fit when: you already run several Prometheus servers and need a global view, multi-tenancy or object storage retention, and you accept more moving parts. Check Mimir's AGPLv3 licence against your use.
- Not covered by any source here: the exact ratio on a given workload. Measure with your own series count and retention.

### 4. Case: cache (Redis, Valkey)

**Licence timeline (primary).**
1. Until Redis 7.2.x, BSD 3-clause. Redis's own licence page says 7.2.x and earlier remain under BSD3 [B31].
2. 2024-03-20: Redis announced that from Redis 7.4 it would be dual-licensed RSALv2 or SSPLv1, no longer BSD. The post says neither licence is OSI-approved, that the change is not retroactive, and that the reason was cloud providers selling Redis [B29]. RSALv2 forbids commercialising the software or providing it to others as a managed service; SSPLv1 is copyleft and asks service providers to release their management-layer source [B31].
3. 2025-05-01: Redis added the OSI-approved AGPLv3 as a third option starting with Redis 8. The post by Redis's CEO says the 2024 change "hurt our relationship with the Redis community", that SSPL is not truly open source, and that AWS and Google now maintain their own fork [B30]. The licence page: 8 and later are under a tri-licence of RSALv2, SSPLv1 or AGPLv3 [B31].
4. Redis 8.0 (May 2025) folded Redis Stack's modules into core: Redis Search, JSON, time series, five probabilistic structures and a vector set preview, plus a new I/O threading implementation. Release notes warn of ACL changes that can break existing rules [B32]. Redis's post claims "over 30 performance improvements" and "up to 87% faster commands and 2x throughput" (vendor claim; conditions not given in the post) [B30].
5. Versions move fast. GitHub's releases API showed Redis 8.10.2 (2026-09-17) and Valkey 9.1.2 (2026-09-01) as latest on 2026-10-25 [B33].

**Valkey (primary).**
- Announced by the Linux Foundation on 2024-03-28 as an open source alternative, continuing from Redis 7.2.4 under BSD 3-clause [B34]. Valkey's first release (7.2.5) focused on compatibility and licence continuity; Valkey 8.0 (2024-09-16) says it makes no backward-incompatible change to command syntax or responses, but changes threading and may need infrastructure re-evaluation [B35].
- Project claims on speed, labelled as such: a Valkey blog (2024-08-05) reports 1.19M requests per second against 360K for Valkey 7.2, on AWS c7g.16xlarge, 8 I/O threads, 3M keys, 512-byte values, 650 clients, SET only [B36]. The Valkey 9.0 post (2025-10-21) lists "up to" gains (for example up to 40% with pipelining, up to 20% for large requests, 25% lower latency with Multipath TCP) with partial or no conditions given on the page [B37].
- Independent speed evidence is thin. The best-documented outside test we found is from Momento, a company that sells a Valkey-based cache: Valkey 8.1.1 against Redis 8.0 on c8g.2xlarge with 6 I/O threads, about 999.8K versus 729.4K SET requests per second, with heavy tuning and synthetic 1 KB values [B40]. Treat as a commercial claim. No neutral lab benchmark was found (U4).

**Managed offerings (vendor pages, prices change).**
- AWS ElastiCache pricing page: Valkey is priced 20% lower than Redis OSS for node-based and 33% lower for serverless; serverless Valkey has a 100 MB minimum [B38].
- Google Memorystore for Valkey supports Valkey 7.2, 8.0, 9.0 and 9.1 (default 9.1) and describes itself as backed by open-source Valkey; the page makes no explicit Redis-compatibility statement [B39].

**Other engines, briefly.** Redis's own docs say Redis is "mostly" single-threaded for command execution, though modern versions use threads for other work [B41]; Redis 8 adds an I/O-threads setting [B32]; Valkey also keeps command execution single-threaded and moves reading, parsing and writing to I/O threads [B36]. Dragonfly claims "25X more throughput" and Redis API compatibility (vendor claim) and uses Business Source License 1.1 with a change date of 2030-11-01 to Apache 2.0 [B42]. KeyDB is a BSD-3 fork of Redis focused on multithreading; its README compares itself with Redis 6, so it is an older lineage, though the repository was still receiving commits on 2026-10-22 [B43].

**Fair conclusion for the course (the course's reading of B29 to B43).**
- Valkey wins when: you need a permissive BSD licence with no field-of-use limits; you will use AWS or Google managed services (the vendor pages list Valkey, with a lower AWS price); you need the commands Redis 7.2 had and want to avoid licence review.
- Redis wins when: you want the Redis 8 data types in core (JSON, search, time series, vector set); you buy Redis's own managed service or support; your lawyers are fine with the AGPLv3 (or the other two) for your use.
- Either: for a plain cache, the commands overlap heavily and the choice is mostly licence, hosting and team habit. Speed claims from both sides need your own test with your value sizes and connection counts.
- Compatibility is a limit to state plainly: Valkey forked at Redis 7.2.4, so features Redis added after (Redis 8 modules, vector sets) are not Valkey features [B34, B32]. Check each client library and each command you use.

### 5. Case: "the fastest database" depends

**Rows or columns.**
- The 2005 C-Store paper (Stonebraker, Abadi and others) argues that a column store reads only the columns a query needs and has "a sizeable performance advantage" for warehouse queries that aggregate over many rows, and contrasts this with write-optimised row stores [B44]. Limits: a 2005 prototype with preliminary TPC-H data.
- PostgreSQL stores each row in fixed-size pages with a per-row header (including transaction ids for row versions): a row store, suited to reading and writing whole records [B45].
- ClickHouse's docs list why it is fast for analytics: data pruning with primary keys and skipping indexes, column compression, batch (vectorised) execution, and parallel lanes that scale with CPU cores [B46]. Vendor docs; the page names no workloads it handles badly.
- DuckDB's docs say it is designed for analytical (OLAP) workloads, runs inside the host process by default, and uses a columnar-vectorised engine; the page also notes it has since stepped beyond in-process use through a "Quack" protocol [B47].

**Write-heavy designs.**
- RocksDB (LSM tree): writes go to an in-memory memtable and a sequential log, flush to sorted files, and background compaction merges them. Level compaction favours smaller disk footprint; universal compaction gives lower write amplification but higher space and read amplification [B48].
- Cassandra: an append-only commit log, memtable, immutable SSTables; the docs contrast this append-only approach with the "traditional relational database design with B-trees" and state the cost: read performance and write amplification, partly offset by Bloom filters [B49].
- So "LSM is faster for writes" is a trade, not a rule: cheaper writes, costlier reads and background work.

**One core or many.**
- Redis commands run on one thread; the docs say to run several instances to use several cores [B41], while Redis 8 and Valkey add I/O threads [B32, B36].
- PostgreSQL parallel query uses several CPUs for queries that touch a lot of data and return few rows, but many queries cannot benefit, and a query that writes data or locks rows gets no parallel plan (other than a few create-and-fill commands); a setting must be above zero [B50, B51].
- SQLite in WAL mode lets readers and a writer work at the same time, but there is only one writer at a time, and all processes must be on the same host (no network filesystem). WAL is faster in most cases and may be 1 to 2% slower for read-mostly use [B52]. SQLite's own guidance: fine for low writer concurrency; if many programs send SQL over a network or there are many concurrent writers, use a client/server database; under about 100K hits per day is a conservative fit for a website [B53].

**Minimising compute spend.** In-process engines (SQLite, DuckDB) use no separate server [B47, B53]. Neon's docs say compute suspends after 5 minutes of inactivity by default (not changeable on the Free plan), then reactivates "within a few hundred milliseconds"; large computes (over 16 CU) stay on [B54]. Vendor docs; check price and plan before telling learners it is "free".

**Benchmarks and conditions.**
- ClickBench uses one flat table of about 100 million web-analytics rows, 43 queries, original runs on AWS c6a.4xlarge, hot and cold runs, and its authors list limits: single flat table, small by modern standards, mostly single-node, queries run one at a time (no concurrency test). It was created by the ClickHouse team [B55].
- TPC-C is an on-line transaction processing benchmark with a mix of five concurrent transaction types; TPC-H is a decision-support benchmark of ad-hoc queries with concurrent data modifications [B56]. They measure different jobs, so a win on one says little about the other.

*Phrase it this way:* "'Fastest' needs a job. A database that is fast for counting a billion rows can be slow for saving one order. Say what you read, what you write, how many things do it at once, and what you pay."

**Fair conclusion for the course.** Row stores like PostgreSQL win for many small reads and writes with transactions; column stores like ClickHouse or DuckDB win for scanning and aggregating many rows; LSM engines suit heavy write streams where slower reads are acceptable; SQLite or DuckDB win when one process owns the data and you want no server; Neon-style scale to zero wins when the database is idle most of the day. Each is also the wrong tool for the opposite job.

### 6. Case: the Outbox pattern for sending events to Kafka

**The problem.** Chris Richardson states it as "How to atomically update the database and send messages to a message broker?", notes that two-phase commit is often not available or wanted, and that if the database commit happens the message must be sent [B57]. Debezium's Morling says there cannot be one shared transaction spanning the service database and Kafka [B59]. Confluent defines the dual-write problem as two external systems that must be updated atomically [B62]. Kafka's own docs back the limit: exactly-once delivery covers read, process and write within Kafka; for other systems it "generally requires cooperation with such systems", and by default Kafka guarantees at-least-once [B61]. So Kafka transactions do not reach into your database.

**The pattern.** Write the event to an outbox table in the same database transaction as the business change; a separate relay sends it to the broker [B57, B59]. Relay options: a polling publisher (works with any SQL database; tricky to publish in order) or transaction log tailing (no two-phase commit; database-specific; tricky to avoid duplicates) [B58]. Debezium's outbox event router expects columns such as `id`, `aggregatetype`, `aggregateid`, `type`, `payload`; it treats the table as a queue (updates not allowed, deletes filtered out), uses `aggregateid` as the Kafka key to keep order within a partition, and offers `id` for removing duplicates [B60].

**Costs, each sourced.**
- An extra table and a relay process to run [B57, B60].
- At-least-once delivery: the relay can crash after publishing and before recording it, so it can publish twice; consumers must be idempotent [B57]. Debezium suggests consumers use the event id to spot duplicates [B59].
- Ordering: polling publishers find ordering tricky [B58]; with Debezium, order is kept per `aggregateid` key within a partition [B60].
- Cleanup: with log-based CDC, Debezium's example inserts and deletes the outbox row in the same transaction, which still leaves both entries in the log, so no separate housekeeping job is needed [B59]; with a polling relay you must clean old rows yourself (the course's reading; no source states a retention rule).
- Latency: events are sent after commit by another process, so they arrive later than a direct publish (the course's reading; no source gives a number, U6).
- Restricted to transactional databases [B62].

**When it pays and when it does not (course reading, built on B57 to B62).**
- It pays when the database change and the event must both happen or neither (an order saved and an `OrderPlaced` event that triggers payment or shipping).
- Confluent lists alternatives with their own costs [B62]: event sourcing (state is rebuilt from events; events are never deleted so history keeps growing); "listen to yourself" (write to Kafka first, update your own database by consuming; the database becomes eventually consistent, so a read right after a command can show old state). Use these when the service can accept those trade-offs. Event sourcing with Kafka as the source of truth removes the second write entirely.
- It is not needed when the event can be lost or rebuilt (metrics, cache refresh, a search index you can re-sync), when there is no message broker, or when CDC on existing tables already gives other services what they need (Confluent presents CDC as a way to run the outbox relay, not as a separate fix [B62]).

**Reuse in the repo.** The system design course already models three approaches (save then publish, publish then save, outbox plus relay) and the crash points that cut each run in `packages/learning-ui/src/canvas/models/outbox-crash.ts` [B63]; its dossier cites the same sources for "relay may publish twice" and for Kafka delivery semantics [system-design dossier S79, S82]. Reuse that canvas for this case instead of building a new one.

### 7. Slow down, research and validate

- Lee et al. (Microsoft Research, CHI 2025) surveyed 319 knowledge workers with 936 first-hand examples. Higher confidence in GenAI went with less critical thinking, higher self-confidence went with more, and critical thinking shifted toward verifying information, integrating responses and stewarding the task [B64]. Limits: self-reported, association not cause. This is a re-check of v1 S87.
- Stack Overflow's 2026 developer survey: 48% say they trust AI when they can easily validate the answers; 73% of respondents use coding assistants and agents daily; per-question samples of about 10,900 to 13,900 [B65]. Limits: self-selected online sample; the page gives no breakdown by experience level.
- OpenAI's terms (effective 2026-01-01) tell users not to rely on output as a sole source of truth, to evaluate output for accuracy and appropriateness including by human review, and not to use output about a person for decisions about credit, education, employment, housing, insurance or legal matters [B66].
- Open-source programs now say the same in rules: Outreachy says applicants who submit unedited AI-generated contributions they cannot explain or correct will not be accepted, because AI code often looks correct at first glance and is slow for mentors to review [B67]; GSoC's FAQ warns that using AI to write a proposal could mean automatic rejection by an organisation, so check each organisation's policy [B68]; Hacktoberfest 2026 stopped counting pull requests because low-effort spam PRs are easy to submit [B69].
- Checking habits the Redis case itself teaches (the course's reading): read the vendor's licence page and dated announcement, not a summary [B29, B31]; compare release notes between versions [B32]; note the date [B33].
- "Ask for the full truth" ("now tell me what you left out") stays the course's own method. No study tested this prompt. It is consistent with vendor guidance to ask for uncertainty, supporting quotes and repeated runs [B16], and with the sycophancy findings [B7, B9], but present it as the course's method (U2).

### 8. Grow fast and go deep

**Programs (rules fetched 2026-10-25; dates change each year).**

| Program | Length | Pay | Who can join | Country notes |
|---|---|---|---|---|
| Google Summer of Code | Projects scoped at about 90, 175 or 350 hours; about 75% of projects run 12 weeks; 8 to 22 weeks possible [B70] | Paid in two parts (45% midway, 55% at the end), set by purchasing power and project size; "West Bank and Gaza" is listed at $900, $1,800 and $3,600 for small, medium and large (2026 table) [B71] | 18 or older; student or open source beginner; "not for experienced open source developers" [B70] | "Not residing in a U.S. embargoed country"; if your country is not in the stipend table you cannot be paid; proof of residency and tax forms needed [B70, B71] |
| LFX Mentorship (Linux Foundation) | Each project sets its length; programs "most start at 12 weeks" (FAQ page that still names 2022 programs, so medium confidence) [B73] | Stipend model changed for programs starting on or after 2026-07-01: purchasing-power formula from a $6,000 baseline, minimum $1,000, maximum $6,600 [B73]; Palestine amount not found (U8) | 18 or older by start; not in another LF mentorship; allowed to work where you take part; apply as an individual [B72] | Must not reside where participation is prohibited under US or other applicable law; no country list on the page [B72] |
| Outreachy | 13 weeks (Dec 7, 2026 to Mar 8, 2027 round) [B74] | $7,000 for the internship [B74] | 18 or older; 30 hours a week, full time; for people who face under-representation or systemic bias in tech in their country; "open to applicants around the world"; can only be accepted once [B74] | Page has no sanctions list; says offers are "void where prohibited or restricted by law" [B74]. The Dec 2026 round's initial application closed Aug 31 and its contribution period ends Nov 9, so it is not open to new applicants now [B74] |
| Hacktoberfest | One month, October | No stipend; digital stickers, a physical sticker pack for three virtual stickers, shipped 8 to 12 weeks after the event [B69] | "Anyone is welcome"; sign in with MyMLH | In 2026, pull requests no longer count toward rewards; credit comes from livestream check-ins, DEV challenges and events [B69]. Shipping to Gaza not checked (U9) |

*Phrase it this way:* "Google Summer of Code, LFX and Outreachy are paid programs of about three months for beginners in open source. Each has its own rules, so read the current rules before you plan. Hacktoberfest is a one-month event, and in 2026 it no longer counts pull requests."

**Why team projects build skills a solo project does not.**
- Code review: Google's engineering practices say reviewers should favour approving a change once it definitely improves overall code health, even if it is not perfect, and that comments which help a developer learn something are always fine [B75]. Review is a practised teaching channel inside a team.
- Psychological safety: Google's re:Work summary of its team study (180 teams: 115 engineering project teams and 65 sales pods) ranks psychological safety first of five dynamics, ahead of dependability, structure and clarity, meaning and impact; team composition factors such as seniority, tenure, extroversion and colocation were not significantly connected to effectiveness [B76]. Limits: one company; the summary does not give the study dates.
- Async norms: GitLab's handbook says it uses asynchronous communication as a starting point, works through public issues and merge requests, and writes down conclusions of offline conversations [B77]. This is a company's stated practice, not evidence that it is better.

**Evidence that public work and open-source contributions are valued (weak to medium).**
- The Linux Foundation's 2021 Open Source Jobs Report (200+ technical hiring managers, 750 open source professionals): 44% of hiring managers named experience contributing to open source as the most important technical skill or experience, the highest of any item [B78]. Limits: 2021; published by an open source foundation; respondents already work in or hire for open source. Confidence medium to low.
- The same foundation's 10th annual report page (labelled 2022 in its download) says 69% of employers are more likely to hire an open source professional with a certification and that prior experience is "becoming less of a requirement" if candidates can show they can do the job [B79]. Credentials also count.
- Outreachy claims that contributions give a public portfolio and that employers can see a history of public collaboration [B80]. That is a program statement, not a hiring study. Confidence low.
- Older evidence: an interview study of GitHub as a hiring signal, 2013, in v1 [v1 S105].

*Phrase it this way:* "One 2021 industry survey found many hiring managers value open-source contribution experience. It is not a promise of a job, and the survey is from a foundation that supports open source."

## Do not say

| Overstatement | Why | Say instead (id) |
|---|---|---|
| "AI always gives the most popular answer." | The study shows a strong tendency in code library and language choice, not a rule for every question [B6]. | "Often leans to the popular option." [B6] |
| "Change the temperature to get better answers." | Newer Gemini models ignore custom temperature, top-p and top-k [B2]; chat apps hide these settings. | "Change the question and the context." [B1, B2, B11] |
| "Ask three AIs and the majority is right." | Model errors are correlated: 60% agreement on the same wrong answer when both err, in one test [B15]. | "Disagreement shows where to check. Agreement is not proof." [B15, B16] |
| "The AI knows today's facts." | Models have a cutoff; reported and effective cutoffs differ [B3, B4]. | "Check the date. Check the project's site." [B3, B4] |
| "Redis is closed source / not open source now." | Outdated since Redis 8 added AGPLv3 on 2025-05-01 [B30, B31]. Versions 7.4 to 7.8 are source-available, not OSI open source [B29, B31]. | Give the version-by-version licence table [B31]. |
| "Valkey is X times faster than Redis." | Only project claims and one commercial test with tuning exist; no neutral benchmark found [B36, B37, B40]. | "The Valkey project and a Valkey vendor report gains in their own tests." [B36, B40] |
| "Redis is single-threaded." | Commands run on one thread, but I/O threads exist in Redis 8 and Valkey [B32, B36, B41]. | "Commands run on one thread; network work can use more." |
| "VictoriaMetrics uses 7x less RAM than Prometheus." | Vendor claim, "up to", from vendor-authored benchmarks [B26]. | "VictoriaMetrics says up to 7x less RAM; measure on your data." [B26] |
| "Prometheus does not scale or loses data." | The docs say local storage is single node, not clustered or replicated, and describe remote storage options [B17, B18]. | "One Prometheus server is one node. Add remote storage or other tools for more." [B17, B18] |
| "VictoriaMetrics is a free drop-in for Prometheus." | Community edition is Apache 2.0 but downsampling and other features are enterprise-only [B22, B24]; compatibility is the vendor's description [B23]. | "Mostly compatible by the vendor's account; test your queries." [B23, B24] |
| "Kafka transactions solve the dual write." | Kafka's exactly-once covers Kafka read-process-write; other systems need their own cooperation [B61]. | "Kafka cannot include your database in its transaction." [B59, B61] |
| "The outbox gives exactly-once." | The relay can publish twice; consumers must cope [B57]. | "At-least-once, so make consumers idempotent." [B57, B59] |
| "Always use the outbox." | Confluent lists event sourcing and listen-to-yourself as alternatives with trade-offs [B62]. | "Use it when the change and the event must both happen or neither." [B57, B62] |
| "LSM trees are faster than B-trees." | They trade cheaper writes for costlier reads and background compaction [B48, B49]. | "Faster for some write loads, slower for some reads." |
| "ClickHouse/DuckDB is faster than PostgreSQL." | Different jobs: analytics versus transactions [B44, B45, B46, B47, B56]. | "Faster for scanning many rows; not built for the same job." |
| "ClickBench shows the fastest database." | Single flat table, mostly single node, no concurrency, made by ClickHouse's team [B55]. | "One benchmark for one kind of query." [B55] |
| "Neon/serverless Postgres is free compute." | Scale to zero cuts idle cost; limits and plans apply [B54]. | "It suspends after 5 idle minutes by default; check your plan." [B54] |
| "Hacktoberfest means four pull requests for a T-shirt." | In 2026 pull requests do not count [B69]. | Describe the 2026 rules only. [B69] |
| "GSoC is for students only." | Student or open source beginner, 18 or older [B70]. | "For students and beginners in open source." [B70] |
| "GSoC pays everyone the same." | Pay is set by country and project size; Gaza has its own row [B71]. | State the table and the date. [B71] |
| "Outreachy is only for women" or "for anyone." | Eligibility is for people who face under-representation or discrimination in tech where they live, with extra welcomes named; check the page [B74]. | Quote the rule, link the page. [B74] |
| "Open-source work gets you hired." | One survey and program claims only [B78, B80]. | "Public work gives evidence others can check." [B78] |
| "AI-written pull requests are welcome." | Outreachy discourages generative AI and rejects unexplained, unedited AI work; GSoC warns about AI proposals [B67, B68]. | "Explain and edit everything you submit; read the program's AI rule first." [B67, B68] |

## Facts writers may state

Each line is safe with the access date for anything that changes.

1. A chat answer is picked from ranked likely words; temperature controls how random the pick is (Google docs) [B1].
2. Some newest models ignore user-set temperature values (checked 2026-10-25) [B2].
3. Models publish a knowledge cutoff; the effective cutoff can differ from the reported one [B3, B4].
4. RLHF improved generalisation but reduced output diversity in one study [B5].
5. In a study of eight models, the models often chose popular libraries and Python by default [B6].
6. AI assistants tend to agree with users; OpenAI rolled back an update for this in April 2025 [B7, B8, B9].
7. OpenAI's terms say other users may get similar output (effective 2026-01-01) [B10].
8. Giving context helps an assistant give a more targeted answer (vendor guidance) [B11].
9. Sampling several answers and picking the most consistent improved accuracy on reasoning benchmarks [B12].
10. Different models often make the same mistake: 60% agreement on a wrong answer when both were wrong, on one leaderboard [B15].
11. Prometheus local storage is single node, not clustered or replicated (docs) [B17].
12. Prometheus graduated from CNCF in 2018 [B21].
13. VictoriaMetrics single-node and cluster are Apache 2.0; downsampling is in the enterprise edition (checked 2026-10-25) [B22, B24].
14. Redis 7.2 and earlier are BSD; 7.4 to 7.8 are RSALv2 or SSPLv1; Redis 8 and later add AGPLv3 [B29, B30, B31].
15. Valkey was announced on 2024-03-28 by the Linux Foundation, continues from Redis 7.2.4 and is BSD 3-clause [B34].
16. Redis 8 includes JSON, search, time series and probabilistic types in core [B32].
17. Both Redis and Valkey run commands on a single main thread; I/O threads help with network work [B36, B41].
18. AWS lists Valkey 20% lower than Redis OSS for node-based ElastiCache and 33% lower for serverless (checked 2026-10-25; prices change) [B38].
19. Column stores read only the needed columns, which helps queries that aggregate many rows [B44].
20. SQLite allows one writer at a time [B52, B53].
21. PostgreSQL does not use parallel plans for queries that write data [B51].
22. ClickBench, TPC-C and TPC-H measure different jobs under stated conditions [B55, B56].
23. Kafka's exactly-once covers Kafka-to-Kafka; other systems need cooperation [B61].
24. The outbox pattern writes the event in the same database transaction; a relay may publish twice [B57].
25. GSoC projects run about 8 to 22 weeks, mostly 12; West Bank and Gaza appears in the 2026 stipend table (checked 2026-10-25) [B70, B71].
26. Outreachy's Dec 2026 round is 13 weeks and pays $7,000 (checked 2026-10-25) [B74].
27. In 2026 Hacktoberfest does not count pull requests for rewards [B69].
28. Google's team research found psychological safety the most important of five team dynamics [B76].

## Source table

Type key: study, official data, company statement, docs, licence, policy, news, repo. "n/d" means no publication date on the page. All checked 2026-10-25. Confidence: H high, M medium, L low.

| id | claim | source | publisher | URL | type | published | checked | conf | limits |
|---|---|---|---|---|---|---|---|---|---|
| B1 | Temperature controls randomness in token selection; 0 picks the highest-probability option; top-k and top-p narrow candidates first | Prompt design strategies | Google (Gemini API docs) | https://ai.google.dev/gemini-api/docs/prompting-strategies | docs | updated 2026-10-13 | 2026-10-25 | H | One vendor's description of its own API |
| B2 | Gemini 4 and Gemini 3.6+ ignore custom temperature, top_p, top_k | same page as B1 | Google | https://ai.google.dev/gemini-api/docs/prompting-strategies | docs | updated 2026-10-13 | 2026-10-25 | H | Applies to Google models only; other vendors differ |
| B3 | Vendor distinguishes reliable knowledge cutoff from training data cutoff | Models overview | Anthropic (API docs) | https://platform.claude.com/docs/en/models/overview | docs | n/d | 2026-10-25 | H | Definition only; no claim about accuracy near the cutoff |
| B4 | Effective knowledge cutoffs often differ from reported cutoffs | Dated Data: Tracing Knowledge Cutoffs in LLMs (Cheng et al.) | arXiv preprint | https://arxiv.org/abs/2403.12958 | study | 2024-03-19 (v2 2024-09-17) | 2026-10-25 | M | Preprint; models of 2023 to 2024 |
| B5 | RLHF generalises better than SFT but significantly reduces output diversity | Understanding the Effects of RLHF on LLM Generalisation and Diversity (Kirk et al.) | arXiv preprint | https://arxiv.org/abs/2310.06452 | study | 2023-10-10 (v3 2024-02-19) | 2026-10-25 | M | Two base models, summarisation and instruction following; no venue on page |
| B6 | Eight LLMs overuse popular libraries (up to 45% unneeded NumPy) and default to Python (58%); Rust never used | A Study of LLMs' Preferences for Libraries and Programming Languages (Twist et al.) | arXiv; Findings of ACL 2026 | https://arxiv.org/abs/2503.17181 | study | 2025-03-21 (v4 2026-06-04) | 2026-10-25 | M | Eight models, code-generation tasks; not about databases, caches or patterns |
| B7 | Five assistants showed sycophancy; humans and preference models sometimes prefer convincing sycophantic answers | Towards Understanding Sycophancy in Language Models (Sharma et al.) | arXiv preprint | https://arxiv.org/abs/2310.13548 | study | 2023-10-20 (v4 2025-05-10) | 2026-10-25 | H | 2023 models; venue not stated on page. Same as v1 S93 |
| B8 | OpenAI rolled back a GPT-4o update that was overly flattering; focused too much on short-term feedback | Sycophancy in GPT-4o: what happened and what we're doing about it | OpenAI | https://openai.com/index/sycophancy-in-gpt-4o/ | company statement | 2025-04-29 | 2026-10-25 | H | Company's own account. Same as v1 S94 |
| B9 | A new thumbs-up/down reward likely weakened the main signal; evals and A/B tests missed it; launching was "the wrong call" | Expanding on what we missed with sycophancy | OpenAI | https://openai.com/index/expanding-on-sycophancy/ | company statement | 2025-05-02 | 2026-10-25 | H | Company's early assessment, not an outside audit |
| B10 | Outputs may not be unique; other users may receive similar output | Terms of use (rest-of-world version, fetched in its Russian rendering) | OpenAI | https://openai.com/policies/row-terms-of-use/ | policy | effective 2026-01-01 | 2026-10-25 | M | Read in a translated rendering; confirm the English text before quoting |
| B11 | Giving context or motivation can yield more targeted responses | Prompting best practices | Anthropic (API docs) | https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices | docs | n/d | 2026-10-25 | M | Vendor guidance; no effect size |
| B12 | Self-consistency raised accuracy: GSM8K +17.9, SVAMP +11.0, AQuA +12.2, StrategyQA +6.4, ARC-c +3.9 points | Self-Consistency Improves Chain of Thought Reasoning (Wang et al.) | arXiv; ICLR 2023 | https://arxiv.org/abs/2203.11171 | study | 2022-03-21 (v4 2023-03-07) | 2026-10-25 | H | Benchmarks with one checkable answer; 2022 models |
| B13 | Multi-model-instance debate improved maths, strategy reasoning and factual validity | Improving Factuality and Reasoning in Language Models through Multiagent Debate (Du et al.) | arXiv preprint | https://arxiv.org/abs/2305.14325 | study | 2023-05-23 | 2026-10-25 | M | Same model family debating itself; extra cost; venue not on page |
| B14 | Crowd of 12 LLMs on 31 questions was not statistically different from 925 human forecasters | Wisdom of the Silicon Crowd (Schoenegger et al.) | arXiv preprint | https://arxiv.org/abs/2402.19379 | study | 2024-02-29 (v6 2024-07-22) | 2026-10-25 | M | One tournament, binary questions, 2024 models, preprint |
| B15 | Over 350 LLMs: models agree on the same wrong answer 60% of the time when both err on one leaderboard; larger models more correlated | Correlated Errors in Large Language Models (Kim et al.) | ICML 2025 (PMLR 267) | https://proceedings.mlr.press/v267/kim25e.html | study | 2025 | 2026-10-25 | H | One leaderboard for the 60% figure; also a resume screening task |
| B16 | Vendor suggests running a prompt several times and comparing, allowing "I don't know", and verifying claims with quotes | Reduce hallucinations | Anthropic (API docs) | https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations | docs | n/d | 2026-10-25 | M | Vendor guidance, not a test result |
| B17 | Prometheus local storage is not clustered or replicated; not arbitrarily scalable or durable; manage as a single-node database; years of data possible; snapshots for backup | Storage | Prometheus project | https://prometheus.io/docs/prometheus/latest/storage/ | docs | n/d | 2026-10-25 | H | Describes current docs version |
| B18 | Remote read/write interfaces integrate other systems; those systems vary greatly in durability, performance and efficiency; Mimir, Cortex and others are listed as targets | Storage; Integrations | Prometheus project | https://prometheus.io/docs/prometheus/latest/storage/ and https://prometheus.io/docs/operating/integrations/ | docs | n/d | 2026-10-25 | H | Integration list is not an endorsement |
| B19 | Default retention 15 days; about 1 to 2 bytes per sample; NFS and EFS not supported | Storage | Prometheus project | https://prometheus.io/docs/prometheus/latest/storage/ | docs | n/d | 2026-10-25 | H | Average figure; depends on data |
| B20 | Standalone design for reliability during outages; not a good fit for 100% accuracy such as billing; joined CNCF in 2016 as second project | Overview | Prometheus project | https://prometheus.io/docs/introduction/overview/ | docs | n/d | 2026-10-25 | H | Project's own description |
| B21 | Prometheus became the second CNCF project to graduate, after Kubernetes | CNCF announces Prometheus graduation | CNCF | https://www.cncf.io/announcements/2018/08/09/prometheus-graduates/ | company statement | 2018-08-09 | 2026-10-25 | H | 2018 status; check current CNCF page |
| B22 | VictoriaMetrics single-node and cluster under Apache License 2.0; supports PromQL and MetricsQL; enterprise features separate | README | VictoriaMetrics project | https://github.com/VictoriaMetrics/VictoriaMetrics (README read from raw.githubusercontent.com) | docs | n/d | 2026-10-25 | H | Licence file read: Apache 2.0 text confirmed |
| B23 | MetricsQL is backwards-compatible with PromQL; Grafana dashboards on a Prometheus source should work the same; intentional differences exist | MetricsQL | VictoriaMetrics docs | https://docs.victoriametrics.com/victoriametrics/metricsql/ | docs | n/d | 2026-10-25 | M | Vendor statement; not independently tested |
| B24 | Enterprise-only features include downsampling, multiple retentions, backup automation, mTLS, Kafka and PubSub ingestion, anomaly detection; community components are open source | Enterprise | VictoriaMetrics docs | https://docs.victoriametrics.com/victoriametrics/enterprise/ | docs | n/d | 2026-10-25 | H | Feature list may change; page links to the licence rather than naming Apache 2.0 |
| B25 | Single-node recommended below 1 million data points/s; cluster has vminsert, vmselect, vmstorage; replication via -replicationFactor; multi-tenancy in cluster only | Cluster version | VictoriaMetrics docs | https://docs.victoriametrics.com/victoriametrics/cluster-victoriametrics/ | docs | n/d | 2026-10-25 | M | Page is 276K characters; only the first 100K were read |
| B26 | Vendor claims: up to 7x less RAM than Prometheus/Thanos/Cortex, 10x less than InfluxDB, up to 7x less storage; default retention 31 days | README; Single-node docs | VictoriaMetrics | https://docs.victoriametrics.com/victoriametrics/single-server-victoriametrics/ | docs (vendor claim) | n/d | 2026-10-25 | M | Cited benchmarks are vendor-authored Medium posts that could not be fetched |
| B27 | Thanos: highly available Prometheus with long-term storage, optional object storage; Apache 2.0 | Thanos docs; LICENSE | Thanos project | https://thanos.io/tip/thanos/getting-started.md/ | docs, licence | n/d | 2026-10-25 | H | CNCF maturity level not verified |
| B28 | Mimir: horizontally scalable, multi-tenant TSDB for long-term Prometheus storage; claims 1 billion active series; AGPLv3 licence | Grafana Mimir OSS; LICENSE | Grafana Labs | https://grafana.com/oss/mimir/ and https://raw.githubusercontent.com/grafana/mimir/main/LICENSE | docs, licence | n/d | 2026-10-25 | H | Scale figure is a vendor claim |
| B29 | Redis moved from BSD to RSALv2/SSPLv1 from Redis 7.4; neither is OSI-approved; not retroactive | Redis adopts dual source-available licensing | Redis | https://redis.io/blog/redis-adopts-dual-source-available-licensing/ | company statement | 2024-03-20 (updated 2025-03-27) | 2026-10-25 | H | Company's reasons are its own |
| B30 | AGPLv3 added from Redis 8; SSPL is not open source; change hurt community relations; AWS and Google maintain a fork; vendor claim of up to 87% faster commands and 2x throughput | Redis is now available under the AGPLv3 open source license | Redis (CEO post) | https://redis.io/blog/agplv3/ | company statement | 2025-05-01 (updated 2025-05-23) | 2026-10-25 | H | Performance numbers are vendor claims without stated conditions |
| B31 | 7.2.x and earlier BSD3; 7.4.x to 7.8.x RSALv2 or SSPLv1; 8 and later RSALv2, SSPLv1 or AGPLv3; what RSALv2 and SSPLv1 restrict | Licenses | Redis | https://redis.io/legal/licenses/ | licence | n/d | 2026-10-25 | H | Repo LICENSE.txt read: same tri-licence text |
| B32 | Redis 8.0 GA (May 2025) includes search, JSON, time series, 5 probabilistic types, vector set preview, new I/O threading; ACL changes may break rules | Redis Open Source 8.0 release notes | Redis docs | https://redis.io/docs/latest/operate/oss_and_stack/stack-with-enterprise/release-notes/redisce/redisos-8.0-release-notes/ | docs | 2025-05 | 2026-10-25 | H | Release notes list security fixes through 8.0.6 |
| B33 | Latest releases on 2026-10-25: Redis 8.10.2 (2026-09-17), Valkey 9.1.2 (2026-09-01) | GitHub releases API | GitHub (redis/redis, valkey-io/valkey) | https://api.github.com/repos/redis/redis/releases/latest | official data | 2026-09 | 2026-10-25 | H | Redis's own site navigation showed "Redis 8.8"; version numbers must be re-checked before publish |
| B34 | Linux Foundation announced Valkey, continuing from Redis 7.2.4 under BSD 3-clause, in response to the licence change | Linux Foundation Launches Open Source Valkey Community | Linux Foundation | https://www.linuxfoundation.org/press/linux-foundation-launches-open-source-valkey-community | company statement | 2024-03-28 | 2026-10-25 | H | Press release; repo licence read as BSD-3-Clause via GitHub API |
| B35 | Valkey 8.0 GA 2024-09-16, ready for production; no backward-incompatible command changes; threading changes; first release 7.2.5 was compatibility only | Valkey 8.0 GA | Valkey project | https://valkey.io/blog/valkey-8-ga/ | docs | 2024-09-16 | 2026-10-25 | H | Project statement |
| B36 | Valkey blog: 1.19M vs 360K requests/s on c7g.16xlarge, 8 I/O threads, 3M keys, 512 B, 650 clients, SET; I/O threads take parsing and writing work, command execution stays single-threaded | Unlock 1 Million RPS | Valkey project (blog) | https://valkey.io/blog/unlock-one-million-rps/ | company statement (project claim) | 2024-08-05 | 2026-10-25 | M | Project's own benchmark, one workload |
| B37 | Valkey 9.0 features and "up to" gains (40% pipelining, 20% large requests, 25% lower latency with MPTCP, 200% SIMD for BITCOUNT/HLL), partly without conditions | Valkey 9.0 | Valkey project | https://valkey.io/blog/introducing-valkey-9/ | company statement (project claim) | 2025-10-21 | 2026-10-25 | M | No methodology on page |
| B38 | Valkey is 20% lower than Redis OSS for node-based and 33% lower for serverless; serverless minimum 100 MB | ElastiCache pricing | Amazon Web Services | https://aws.amazon.com/elasticache/pricing/ | policy (vendor pricing) | n/d | 2026-10-25 | M | Prices and discounts change; page gave example totals but no absolute Redis price |
| B39 | Memorystore for Valkey supports 7.2, 8.0, 9.0, 9.1 (default 9.1); backed by open-source Valkey | Supported versions | Google Cloud | https://docs.cloud.google.com/memorystore/docs/valkey/supported-versions | docs | n/d | 2026-10-25 | H | No Redis-compatibility statement on the page |
| B40 | Valkey 8.1.1 vs Redis 8.0: about 999.8K vs 729.4K SET req/s (6 I/O threads, c8g.2xlarge); 16% higher GET | Valkey Turns One | Momento (sells a Valkey cache) | https://www.gomomento.com/blog/valkey-turns-one-how-the-community-fork-left-redis-in-the-dust/ | company statement (commercial claim) | 2025-05-07 | 2026-10-25 | L | Commercial interest; tuned, synthetic 1 KB values; image-tag inconsistency in the post |
| B41 | Redis is mostly single-threaded for command execution; run several instances to use several cores | Benchmarking | Redis docs | https://redis.io/docs/latest/operate/oss_and_stack/management/optimization/benchmarks/ | docs | n/d | 2026-10-25 | M | Page text predates Redis 8 I/O threads in places; read with B32 |
| B42 | Dragonfly claims 25X more throughput and Redis/Memcached API compatibility; Business Source License 1.1, change date 2030-11-01 to Apache 2.0 | README; LICENSE.md | DragonflyDB | https://raw.githubusercontent.com/dragonflydb/dragonfly/main/README.md | docs, licence | n/d | 2026-10-25 | M | Throughput numbers are vendor claims |
| B43 | KeyDB: BSD-3 fork of Redis focused on multithreading; README compares to Redis 6; repository pushed 2026-10-22 | README; GitHub API | KeyDB (Snap) | https://github.com/Snapchat/KeyDB | docs, repo | n/d | 2026-10-25 | M | Redis lineage is older; feature parity not verified |
| B44 | Column stores read only needed columns and have a sizeable advantage for aggregate warehouse queries; contrast with write-optimised row stores | C-Store: A Column-oriented DBMS (Stonebraker, Abadi et al.) | VLDB | https://www.vldb.org/archives/website/2005/program/paper/thu/p553-stonebraker.pdf | study | 2005 | 2026-10-25 | H | 2005 prototype; preliminary performance data |
| B45 | PostgreSQL stores rows in fixed-size heap pages with per-row headers (xmin, xmax) | Database Page Layout | PostgreSQL docs | https://www.postgresql.org/docs/current/storage-page-layout.html | docs | n/d | 2026-10-25 | H | Describes internal layout only |
| B46 | ClickHouse is fast via data pruning, compression, vectorised batches, core-level parallelism | Why is ClickHouse so fast? | ClickHouse docs | https://clickhouse.com/docs/concepts/why-clickhouse-is-so-fast | docs (vendor) | n/d | 2026-10-25 | M | Vendor docs; names no weaknesses |
| B47 | DuckDB targets analytical (OLAP) workloads, runs in the host process by default, columnar-vectorised; has stepped beyond in-process via a Quack protocol | Why DuckDB | DuckDB | https://duckdb.org/why_duckdb | docs | n/d | 2026-10-25 | H | Project docs; page does not state poor-fit workloads |
| B48 | RocksDB LSM: memtable, sequential log, sorted SST files, compaction; level vs universal compaction trade-offs | RocksDB Overview | Meta / RocksDB wiki | https://github.com/facebook/rocksdb/wiki/RocksDB-Overview | docs | n/d | 2026-10-25 | H | Same source as system design dossier S37 |
| B49 | Cassandra uses commit log, memtable, immutable SSTables (LSM, append-only versus B-trees); costs: read performance and write amplification; Bloom filters help | Storage engine | Apache Cassandra docs | https://cassandra.apache.org/doc/latest/cassandra/architecture/storage-engine.html | docs | n/d | 2026-10-25 | H | Project docs |
| B50 | Parallel query uses several CPUs; many queries cannot benefit; best for large scans returning few rows | Parallel Query | PostgreSQL 18 docs | https://www.postgresql.org/docs/current/parallel-query.html | docs | n/d (v18.6) | 2026-10-25 | H | Version 18 docs |
| B51 | No parallel plan for queries that write data or lock rows (few exceptions); max_parallel_workers_per_gather must be above 0 | When Can Parallel Query Be Used? | PostgreSQL docs | https://www.postgresql.org/docs/current/when-can-parallel-query-be-used.html | docs | n/d | 2026-10-25 | H | Version-specific |
| B52 | SQLite WAL: readers and a writer concurrent, one writer at a time, same host only, faster in most cases, 1 to 2% slower for read-mostly | Write-Ahead Logging | SQLite | https://www.sqlite.org/wal.html | docs | n/d | 2026-10-25 | H | Project docs |
| B53 | SQLite fits low writer concurrency; many writers or networked clients suggest client/server; under 100K hits/day conservative for websites | Appropriate Uses For SQLite | SQLite | https://www.sqlite.org/whentouse.html | docs | n/d | 2026-10-25 | H | Project's own guidance |
| B54 | Neon compute suspends after 5 idle minutes by default; reactivates within a few hundred ms; Free plan cannot disable; >16 CU always on | Scale to Zero | Neon docs | https://neon.com/docs/introduction/scale-to-zero | docs (vendor) | n/d | 2026-10-25 | M | Vendor docs; the page also contained text addressed to AI assistants, which was ignored |
| B55 | ClickBench: one flat ~100M-row table, 43 queries, c6a.4xlarge, hot/cold runs; limitations include mostly single-node and no concurrency; made by the ClickHouse team | ClickBench | ClickHouse (GitHub) | https://github.com/ClickHouse/ClickBench | docs (vendor) | n/d | 2026-10-25 | H | Benchmark authors list their own limits |
| B56 | TPC-C is an OLTP benchmark with five concurrent transaction types; TPC-H is a decision-support benchmark of ad-hoc queries with concurrent data modifications | TPC-C; TPC-H | Transaction Processing Performance Council | https://tpc.org/tpcc/ and https://tpc.org/tpch/ | official data | TPC-C approved 1992 | 2026-10-25 | H | Descriptions only; results were not reviewed |
| B57 | Problem: atomically update the database and send messages; 2PC often not an option; solution: store message in the DB in the same transaction, a separate process sends; relay may publish more than once; consumers must be idempotent | Pattern: Transactional outbox | Chris Richardson, microservices.io | https://microservices.io/patterns/data/transactional-outbox.html | docs (practitioner reference) | n/d | 2026-10-25 | H | Pattern author's site; same as system design S79 |
| B58 | Polling publisher: any SQL DB, tricky to order; log tailing: no 2PC, DB-specific, obscure, tricky to avoid duplicates | Polling publisher; Transaction log tailing | microservices.io | https://microservices.io/patterns/data/polling-publisher.html | docs | n/d | 2026-10-25 | H | Same limit |
| B59 | No shared transaction across the service database and Kafka; outbox row in the same transaction; event id lets consumers detect duplicates; insert-then-delete works with log-based CDC | Reliable Microservices Data Exchange With the Outbox Pattern (Morling) | Debezium blog | https://debezium.io/blog/2019/02/19/reliable-microservices-data-exchange-with-the-outbox-pattern/ | docs (project blog) | 2019-02-19 | 2026-10-25 | H | 2019 post; Debezium has a stake in CDC |
| B60 | Outbox event router: columns id, aggregatetype, aggregateid, type, payload; table is a queue, no updates, deletes filtered; aggregateid as Kafka key for order | Outbox Event Router | Debezium docs | https://debezium.io/documentation/reference/stable/transformations/outbox-event-router.html | docs | n/d | 2026-10-25 | H | Page does not state delivery guarantees |
| B61 | Kafka: at-least-once by default; exactly-once covers Kafka read-process-write; other destinations need cooperation; "read the fine print" | Design (Kafka 4.3 docs) | Apache Kafka | https://kafka.apache.org/43/design/design/ | docs | n/d | 2026-10-25 | H | Version 4.3 docs; same as system design S82 |
| B62 | Dual-write problem defined; outbox limited to transactional databases; CDC as a relay option; event sourcing: events never deleted; listen-to-yourself: eventually consistent | Solving the Dual-Write Problem (Waldron) | Confluent | https://www.confluent.io/blog/dual-write-problem/ | company statement | 2024-05-29 | 2026-10-25 | M | Kafka vendor's view |
| B63 | Repo canvas models save-first, publish-first and outbox with crash points and verdicts | outbox-crash.ts | Buildment repo | packages/learning-ui/src/canvas/models/outbox-crash.ts | repo | n/d | 2026-10-25 | H | Internal; teaches the crash cases, not Debezium details |
| B64 | 319 knowledge workers, 936 examples: more confidence in GenAI, less critical thinking; more self-confidence, more | The Impact of Generative AI on Critical Thinking (Lee et al.) | Microsoft Research, CHI 2025 | https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking-self-reported-reductions-in-cognitive-effort-and-confidence-effects-from-a-survey-of-knowledge-workers/ | study | 2025-04 | 2026-10-25 | H | Self-report, correlation. Re-check of v1 S87 |
| B65 | 48% trust AI when they can easily validate answers; 73% use coding assistants and agents daily; per-question n of 10,926 to 13,857 | Stack Overflow Developer Survey 2026, AI | Stack Overflow | https://survey.stackoverflow.co/2026/ai | official data | 2026 | 2026-10-25 | M | Self-selected online survey; no experience-level breakdown; trust phrasing is partial |
| B66 | Do not rely on output as sole source of truth; evaluate for accuracy including human review; do not use output about a person for credit, employment and similar decisions | Terms of use (rest-of-world version, Russian rendering) | OpenAI | https://openai.com/policies/row-terms-of-use/ | policy | effective 2026-01-01 | 2026-10-25 | M | Translated rendering |
| B67 | Outreachy discourages generative AI; unedited AI contributions applicants cannot explain will not be accepted; mentors set policy | Applicant guide | Outreachy | https://www.outreachy.org/docs/applicant/ | policy | n/d (Dec 2026 round) | 2026-10-25 | H | Applies to Outreachy only |
| B68 | GSoC FAQ: using AI to write a proposal could mean automatic rejection; check each organisation's AI policy | FAQ | Google Summer of Code | https://developers.google.com/open-source/gsoc/faq | policy | updated 2026-02-20 | 2026-10-25 | H | Organisation policies vary |
| B69 | Hacktoberfest 2026: powered by MLH and DEV; pull requests no longer count; stickers via check-ins, DEV challenges, events; rewards ship 8 to 12 weeks later; anyone welcome | Hacktoberfest | MLH, DEV, DigitalOcean | https://hacktoberfest.com/ | policy | October 2026 | 2026-10-25 | H | Rules change yearly; shipping to Gaza unchecked |
| B70 | GSoC: 18+, student or open source beginner; ~90/175/350-hour projects; ~75% run 12 weeks, 8 to 22 weeks allowed; not for experienced contributors; no embargoed-country residents; 2026 coding began May 25 | FAQ; Timeline | Google Summer of Code | https://developers.google.com/open-source/gsoc/faq and https://developers.google.com/open-source/gsoc/timeline | policy | 2026-02-20; 2025-12-03 | 2026-10-25 | H | 2027 dates not yet published on the pages read |
| B71 | GSoC stipends 2026: two payments (45%/55%), PPP-adjusted; small $750 to $1,650, medium $1,500 to $3,300, large $3,000 to $6,600; "West Bank and Gaza": $900/$1,800/$3,600; unlisted countries cannot be paid | Contributor Stipends for 2026 | Google Summer of Code | https://developers.google.com/open-source/gsoc/help/student-stipends | policy | updated 2026-02-17 | 2026-10-25 | H | 2026 table; payment method and Gaza access not verified |
| B72 | LFX mentee eligibility: 18+ by start; not in another LF mentorship; eligible to work where participating; not resident where prohibited by US or other law; individual; no conflicting obligations | Am I Eligible to Become a Mentee? | Linux Foundation (LFX docs) | https://docs.linuxfoundation.org/lfx/mentorship/mentee-guide/am-i-eligible | policy | n/d | 2026-10-25 | H | No country list; sanction rules apply by law |
| B73 | LFX stipend: PPP formula from $6,000 baseline, minimum $1,000, maximum $6,600 for programs starting on or after 2026-07-01; projects set length, most start at 12 weeks | Strengthening LFX Mentoring (blog); Mentorship FAQs | Linux Foundation | https://www.linuxfoundation.org/blog/strengthening-lfx-mentoring-a-fairer-stipend-model-and-a-shared-standard-of-excellence and https://docs.linuxfoundation.org/lfx/mentorship/mentorship-faqs | policy | 2026-06-26 (updated 2026-07-01); FAQ n/d | 2026-10-25 | M | FAQ still references 2022 programs; per-country amount not found |
| B74 | Outreachy Dec 2026 round: Dec 7 to Mar 8, 13 weeks, $7,000, 30 hrs/week, 18+, visa must allow work, open worldwide, under-representation criterion, "void where prohibited"; applications closed | Applicant guide; home page | Outreachy (Software Freedom Conservancy) | https://www.outreachy.org/docs/applicant/ | policy | n/d (Dec 2026 round) | 2026-10-25 | H | Next round dates not seen (U7) |
| B75 | Reviewers should approve once a change improves overall code health even if imperfect; comments that help a developer learn are fine | The Standard of Code Review | Google Engineering Practices | https://google.github.io/eng-practices/review/reviewer/standard.html | docs | n/d | 2026-10-25 | H | One company's practice |
| B76 | 180 teams (115 engineering, 65 sales); psychological safety first of five dynamics; composition factors not significantly connected | Understand team effectiveness | Google re:Work | https://rework.withgoogle.com/intl/en/guides/understand-team-effectiveness | study summary | n/d | 2026-10-25 | M | One company; study years and full paper not read |
| B77 | Async communication is the starting point; public issues and merge requests; offline conclusions are written down | Communication | GitLab Handbook | https://handbook.gitlab.com/handbook/communication/ | docs | n/d | 2026-10-25 | M | Company practice, not an evaluation |
| B78 | 44% of hiring managers: experience contributing to open source was the most important technical skill or experience; 200+ hiring managers, 750 professionals | 2021 Open Source Jobs Report | Linux Foundation Research and edX | https://press.edx.org/hubfs/edX-Linux-foundation__Open-Source-Jobs-Report-2021.pdf | study (survey) | 2021 | 2026-10-25 | L | Open source foundation; open source respondents; 2021 |
| B79 | 69% of employers more likely to hire an open source professional with a certification; prior experience becoming less of a requirement if skills are shown | The 10th Annual Open Source Jobs Report | Linux Foundation Research | https://www.linuxfoundation.org/research/the-10th-annual-open-source-jobs-report | study (survey) | n/d (file labelled 2022) | 2026-10-25 | L | Date unclear; same foundation |
| B80 | Outreachy says open source work is a public portfolio and employers can see public collaboration | Applicant guide | Outreachy | https://www.outreachy.org/docs/applicant/ | policy (program claim) | n/d | 2026-10-25 | L | A program's statement, not a study |

## Unverified claims

Do not use as fact.

- **U1.** "Models give the common answer because their training data has more of it." Plausible and consistent with B5 and B6, but no fetched source tests the cause. Say "models tend to favour popular options" and cite B6.
- **U2.** That asking "now tell me what you left out" improves answers. No study found; it is the course's method (B16 and B7 are indirect support only).
- **U3.** Independent (non-vendor) Prometheus versus VictoriaMetrics benchmarks. A search found only vendor-authored or vendor-sourced figures; secondary posts cited customer reports we could not check. The vendor's Medium benchmark posts could not be fetched (blocked).
- **U4.** Neutral lab benchmark of Valkey versus Redis 8. Only project posts [B36, B37] and one commercial test [B40] were fetched; other posts seen in search results were not fetched.
- **U5.** That "verification habits" training reduces over-reliance. B64 and B65 describe behaviour; neither tests a training.
- **U6.** Outbox latency numbers (typical delay from commit to Kafka) and retention rules for outbox tables. No source with numbers was read.
- **U7.** Next dates: GSoC 2027, Outreachy May 2027 round, LFX terms starting 2027. Not published on the pages read.
- **U8.** The LFX stipend for Palestine, and the LFX per-country table.
- **U9.** Whether fellows in Gaza can actually receive GSoC, LFX or Outreachy payments (payment provider and banking access), and whether Hacktoberfest swag ships to Gaza.
- **U10.** KeyDB's current performance and Redis-version compatibility; Dragonfly's throughput claim. Vendor claims only.
- **U11.** CNCF maturity level of Thanos (not read).
- **U12.** Whether Redis 8.x versions after 8.0 changed anything in licensing. The licence page (B31) and repo licence text say 8 and later are tri-licensed; this was not checked release by release.
- **U13.** Evidence that hiring managers value solo public projects specifically (not open-source contribution). Only B78 to B80 and v1 S105 exist, all weak.
- **U14.** That team projects teach more than solo projects to early-career engineers. B75 to B77 describe practices at large companies; no study of learners was found.

## Recommended outline changes

1. **Judgment module 1, "Why you get the common answer":** build on the sourced causes: ranked-word picking [B1], tuning that narrows answers [B5], popularity preference [B6], old knowledge [B3, B4], plus agreement bias [B7, B8, B9]. Drop any temperature lesson [B2].
2. **"Ask several, but not blindly":** teach self-consistency and best-of-N as ways to find disagreement [B12, B16] and add a short chapter beat on correlated errors [B15]. The rule for fellows: disagreement tells you where to check; agreement does not end the check. Link to v1 S92 for package checks.
3. **Four cases as "context changes the answer", each with a "when each wins" table** (use the conclusions above). For the cache case use the licence timeline as the opening story, because it shows why a model with an old cutoff may be wrong [B29, B30, B31, B34]. For the time series case, keep the vendor-claim label on every resource number [B26].
4. **Outbox case:** reuse the existing outbox canvas [B63] and add a "do I need it?" sorter with the alternatives (no event needed, CDC on existing tables, event sourcing, listen to yourself) [B62].
5. **"Fastest database depends" as a sorter of jobs** (many small writes, scan and aggregate, one writer, idle most of the day, write-heavy stream) mapped to B44 to B54, with ClickBench and TPC as a lesson about benchmark conditions [B55, B56].
6. **Grow fast module:** drop the idea of "do four pull requests in October". Hacktoberfest 2026 no longer counts PRs [B69]. Present GSoC, LFX and Outreachy as three-month paid programs with a rules table [B70 to B74], but flag in plain words that each program discourages unexplained AI work [B67, B68]. Add a chapter beat "explain and edit every AI-assisted contribution".
7. **Public work claim:** state it modestly: one 2021 survey and program statements [B78, B80]; do not promise hiring outcomes.
8. **Team skills:** code review, psychological safety, written async work, each with its source [B75, B76, B77], marked as practices from large companies.
9. **Add a "read the primary page" habit task:** fellows open the licence page and release notes for the tool they choose, note the date, and compare with the AI's answer [B31, B32, B33].

## Open questions for instructors

1. Payment access: can fellows in Gaza receive GSoC, LFX or Outreachy stipends in practice? GSoC lists "West Bank and Gaza" in its 2026 table [B71], but we did not verify payment provider access. Who can check with a past participant?
2. Sanctions wording: LFX and GSoC refer to legal restrictions without naming Palestine [B70, B72]. Should the course send fellows to program FAQs or to the programs' contact addresses, rather than state eligibility?
3. Are fellows "beginners" under GSoC and Outreachy rules? Outreachy requires an under-representation basis [B74]; GSoC is "not for experienced open source developers" [B70]. Instructors should decide how to describe fit.
4. AI use in applications: given B67 and B68, should the capstone's AI-use line (course 13) be extended to say "check the program's rule before using AI in a proposal"?
5. Cache case licence advice: how far should the course go on AGPLv3 and SSPL implications for a fellow's own project? Suggest keeping to "read the licence for your use; ask a lawyer for company use" [B31].
6. Should the time series case name Grafana Mimir given its AGPLv3 licence [B28], or keep to Prometheus, VictoriaMetrics and Thanos?
7. Is a one-line mention of Neon appropriate (vendor product; price and plan limits change) [B54], or should the "idle most of the day" example use SQLite and DuckDB only?
8. Hacktoberfest is running now (October 2026). Mention it as a current example with a check date, or leave it out of a course that will be read later?
