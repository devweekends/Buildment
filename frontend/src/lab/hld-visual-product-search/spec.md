# Design a product search box (visual challenge)

**Claim:** a search box that only returns products is easy to build and easy to break. To pass, the design must also serve suggestions as the shopper types, get a seller's product change into the index, and keep answering when an app server, a search node or the indexing worker dies. Each of those needs a part, and each part costs money, so the lab asks for the cheapest design that survives. The case study is Dalil, the made-up marketplace search box of module 23.

**Inputs:** the parts the learner places (client, load balancer, app server, cache, search index, product database, queue, worker), the links between them, and per part its size, count, zones, and for the cache its hit rate, for the database its read share, read replicas and standby, and for the worker its count and size. The offered load is fixed by the brief at 2,000 lookups a second.

**Rule:** the tiered-architecture model in `frontend/src/lab/tiered-architecture.ts`, played through four scenarios by `frontend/src/lab/challenge.ts`:

1. Peak traffic ("sale night"): everything healthy at 2,000 lookups a second.
2. An app server dies: one instance of the app fleet is lost (a fleet of one is lost whole).
3. A search node dies: one node of the search index is lost (an index of one node is lost whole).
4. The indexing worker dies: every worker is taken down for 30 seconds, then comes back.

Twelve checks read the four scenarios.

| Kind | Check | Scenario | Passes when |
|---|---|---|---|
| Functional | A search returns products | peak | a client reaches a search node through an app server |
| Functional | A suggestion is served as you type | peak | a client reaches a cache through an app server |
| Functional | Results show full product details | peak | the app server can read the product from a database (the cache is optional) |
| Functional | A product change reaches the index | peak | a change travels app server, queue, worker, search node |
| Non-functional | Serves the whole peak | peak | capacity is at least 2,000/s |
| Non-functional | p99 | peak | p99 is at most 130 ms |
| Non-functional | Everyone is still served when an app server dies | app server dies | at least 99.9% of the load is still served |
| Non-functional | Everyone is still served when a search node dies | search node dies | at least 99.9% of the load is still served |
| Non-functional | p99 while a search node is down | search node dies | p99 is at most 160 ms |
| Non-functional | No product change is lost when the indexing worker dies | worker dies | a queue holds the changes, and the workers index 30 s of backlog within 30 s |
| Non-functional | Availability | peak | the model's availability is at least 99.95% |
| Non-functional | Cost per hour | peak | at most $3.00 an hour |

**What the model does with this board, in plain words.** Load enters at the client and every branch of the app server sees the whole stream: the cache, the search index and the queue each see all 2,000 a second, and only the cache misses reach the database. A worker writes everything it takes from the queue to the search index. So the index carries the lookups and the product changes together: 2,000 + 2,000 = 4,000 a second in the reference design. That is why the index is the busiest and most expensive part, and why a design with no queue and no worker looks cheaper ($2.39 an hour) and faster (p99 87 ms) than it should: it never updates the index. Each search node answers 300 lookups a second for each vCPU (the model's rule for a search node), so a memory-small node (2 vCPU) handles 600 a second and a memory-medium node (4 vCPU) 1,200.

**Cache wiring:** the app server may link to both the cache and the database (cache-aside), or the learner may also link the cache onward to the database (read-through). Both give the database the same load, reads times one minus the hit rate. The cache never shields the search index in this model (a cache may link only to a database), so the cache's measurable job is to protect the database and to serve the suggestion path.

**Sale night, not an average day.** Module 23 plans about 7,000 searches, 35,000 suggestion calls and 174 product changes a second for Dalil as a whole. The board cannot split the load by kind, so the lab uses a smaller slice with an invented story: 2,000 lookups a second, with sellers re-pricing so fast that about as many product changes a second reach the index. Do not read 2,000 product changes a second as a real marketplace rate. The idea it teaches is real: indexing competes with searching for the same nodes.

**Assumptions:** steady state, the cache is warm, 95% of the product database traffic is reads, and prices are illustrative. Freshness in module 23 is 30 seconds, so the drain check asks that 30 seconds of waiting product changes be indexed within 30 seconds of the worker coming back.

**Limits:** a model, not a cloud and not a search engine. Latency is in model milliseconds. "Served" is capacity over load, not a request-by-request count. A fleet spread over two zones counts as redundant even when it has one instance, which is a known simplification of the model. The queue is priced per message at an illustrative broker rate and never fills. The board does not rank results, so it cannot show ranking quality. It has no copies that refresh at different times, so it cannot show stale results between two shoppers. It treats the search nodes as one pool of equal nodes, not as 8 shards with copies, so it cannot show the slow-shard tail of chapter 23.2. It sends every lookup to both the cache and the index, while in Dalil a suggestion never reaches the index. The load of product changes is equal to the load of lookups, which is a story, not a measurement. There is no code lab for this design yet, so no number here was compared with a real stack.

## How the targets were tuned

Targets were set against the model alone: there is no paired code lab yet, so nothing was compared with a real run. The numbers compare shapes (a lost app server costs a little, a lost search node costs more because the index is the busiest part, a dead worker costs no searches but needs spare capacity), not milliseconds.

| Target | Why this value |
|---|---|
| Peak 2,000/s | The same range as module 30 (thousands a second), small enough that one wrong size already shows |
| p99 at most 130 ms | The reference sits at 125 ms. Nine search nodes (146 ms) fail it |
| p99 at most 160 ms with a search node down | The reference sits at 146 ms. Ten small nodes lose a tenth when one dies; five bigger nodes lose a fifth and reach 200 ms |
| Drain 30 s outage within 30 s | The module 23 freshness allowance. Two workers take 22 s, one worker 150 s |
| Availability at least 99.95% | The reference sits at 99.97%. A single database, a cache in one zone, app servers in one zone and a balancer in one zone each fall below it |
| Cost at most $3.00 an hour | The reference costs $2.93, so one extra part of almost any kind goes over |

**Checked against the model (2,000 lookups a second):**

| Design | Checks | Ceiling | p99 | Availability | Cost | Fails |
|---|---|---|---|---|---|---|
| Starting board (balancer, one app server, one search node, database) | 3/12 | 600 | 1,930 ms | 98.55% | $0.52/h | suggestion, index update, capacity, p99, app server dies, search node dies (served and p99), worker dies, availability |
| Reference (below) | 12/12 | 3,000 | 125 ms | 99.97% | $2.93/h | none |
| Reference with one balancer zone | 6/12 | 1,600 | 253 ms | 99.87% | $2.83/h | capacity, p99, app server dies, search node dies (served and p99), availability |
| Reference with one app server | 9/12 | 2,400 | 210 ms | 99.97% | $2.81/h | p99, app server dies (0% served), search-dies p99 |
| Reference with app servers in one zone | 11/12 | 3,000 | 125 ms | 99.92% | $2.93/h | availability |
| Reference without the cache | 6/12 | 1,263 | 583 ms | 99.97% | $2.78/h | suggestion, capacity, p99, app server dies, search node dies (served and p99); the database is 158% busy |
| Reference with the cache in one zone | 11/12 | 3,000 | 125 ms | 99.82% | $2.93/h | availability |
| Reference with nine search nodes | 10/12 | 2,700 | 146 ms | 99.97% | $2.78/h | p99, search-dies p99 (200 ms) |
| Reference with seven search nodes | 9/12 | 2,100 | 575 ms | 99.97% | $2.48/h | p99, search node dies (90% served), search-dies p99 |
| Reference with five memory-medium search nodes | 11/12 | 3,000 | 125 ms | 99.97% | $2.93/h | search-dies p99 (200 ms) |
| Reference with eleven search nodes | 11/12 | 3,200 | 113 ms | 99.97% | $3.08/h | cost |
| Reference without queue and worker | 10/12 | 3,200 | 87 ms | 99.98% | $2.39/h | index update, worker dies (60,000 changes lost) |
| Reference with a queue and no worker | 10/12 | 3,200 | 87 ms | 99.97% | $2.69/h | index update, worker dies (never indexed) |
| Reference with one worker | 11/12 | 3,000 | 125 ms | 99.97% | $2.81/h | worker dies (400/s to spare, 150 s) |
| Reference with three workers | 11/12 | 3,000 | 125 ms | 99.97% | $3.05/h | cost |
| Reference with three balancer zones | 11/12 | 3,000 | 123 ms | 99.97% | $3.03/h | cost |
| Reference without the database standby | 11/12 | 3,000 | 125 ms | 99.82% | $2.78/h | availability |
| Reference without the database | 11/12 | 3,000 | 125 ms | 99.97% | $2.63/h | product details |

The reference design: a load balancer of size general-small in 2 zones; 2 app servers of size compute-small in 2 zones; one cache node of size memory-small at a 90% hit rate in 2 zones; 10 search nodes of size memory-small in 2 zones; a product database of size memory-small at 95% reads with a failover standby; a queue; 2 workers of size compute-small. The app server links to the cache, the search index, the database and the queue; the queue links to the workers; the workers link to the search index.

Two things the table shows that are worth saying aloud. One worker of the bigger compute-medium size, at the same cost as two small ones, also passes, so there is more than one answer. And in the app-server fault the reference leaves the other server at 83% busy and p99 near 210 ms: everyone is served, but slowly, and the lab does not check that number, as module 30 does not.

**Try this**

1. Run the starting board. Expected: 3 of 12 pass. A search returns products and the product details load, but the search index is 333% busy and the board names it first.
2. Add a cache at a 90% hit rate and link the app server to it. Expected: the suggestion check passes and the product database drops from 158% busy to under 20%.
3. Add a queue and a worker and link app server to queue to worker to search. Expected: the index-update check passes, and the search node count that was enough before is now too small, because the index also takes the changes. Raise the node count until capacity and p99 pass.
4. Take the number of search nodes down to nine, then replace ten small nodes with five medium nodes of the same cost. Run both and compare the search-dies p99.

## Solution

The reference design is in `solution.ts` next to this file, and it passes all 12 checks at $2.93 an hour (the design recorded in the table above). The board offers it through a Solution button, after the learner has pressed Run once and confirmed. It opens read-only, labelled "Reference solution", with a button to copy it onto the learner's board and one to go back. Each part has a short explanation: why it is there, which checks it helps pass, and what happens without it.

| Part | Why it is there | Checks it helps pass |
|---|---|---|
| Load balancer, 2 zones | One small zone carries about 1,600 a second, so two carry the 2,000 | capacity, p99, every fault check, availability |
| App servers, 2 in 2 zones | Losing one leaves one at 83% busy and everyone served | capacity, p99, app server dies, availability |
| Cache, 90% hits | Serves suggestions and answers 1,800 of 2,000 product lookups, so the database sees 200 | suggestion, capacity, p99, fault checks |
| Search index, 10 small nodes in 2 zones | Carries 4,000 a second (lookups and changes); losing one leaves 9 at 74% | search, index update, capacity, p99, search node dies |
| Queue and 2 workers | Changes wait safely; 2,800 a second to spare clears 60,000 in 22 s | index update, worker dies |
| Product database with standby | The source of truth; the standby keeps it up if its zone fails | product details, availability |

"Compare with mine" lists, in plain words, which parts, settings and links differ from the learner's design and which failing checks each one helps explain. It gives directions ("lower", "smaller") and no numbers, so it does not hand over the answer.
