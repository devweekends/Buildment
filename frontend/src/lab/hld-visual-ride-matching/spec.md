# Design a ride service that finds nearby drivers (visual challenge)

**Claim:** a ride service that only stores drivers' places and finds the ones near a rider is easy to build and easy to break. Driver phones report where they are far more often than riders ask for a ride, so the reports are the load. To pass, the design must keep each driver's latest place in memory instead of writing every report to a database, record trip events without slowing a request, and keep answering when an app server, a node of the location map or the trip worker dies. Each of those needs a part, and each part costs money, so the lab asks for the cheapest design that survives.

**Inputs:** the parts the learner places (client, load balancer, app server, cache, database, queue, worker), the links between them, and per part its size, count, zones, and for the cache its hit rate, for the database its read replicas, standby and read share, and for the worker its batch size. The offered load is fixed by the brief at 4,000 requests a second.

**Rule:** the tiered-architecture model in `frontend/src/lab/tiered-architecture.ts`, played through four scenarios by `frontend/src/lab/challenge.ts`:

1. Peak traffic: everything healthy at 4,000 requests a second.
2. An app server dies: one instance of the app fleet is lost (a fleet of one is lost whole).
3. A node of the location map dies: one instance of the cache fleet is lost (a map of one node is lost whole, and every request falls through to the database).
4. The trip worker dies: every worker is taken down for 30 seconds, then comes back.

Eleven checks read the four scenarios.

| Kind | Check | Scenario | Passes when |
|---|---|---|---|
| Functional | Drivers' places are stored and searched | peak | a client reaches a cache through an app server |
| Functional | A ride request becomes a saved trip | peak | a client reaches a database through an app server |
| Functional | Trip events are recorded | peak | an event travels app server, queue, worker, database; with no queue at all, the event is written inline before the request answers |
| Non-functional | Serves the whole peak | peak | capacity is at least 4,000/s |
| Non-functional | p99 latency | peak | p99 is at most 72 ms |
| Non-functional | Everyone is still served when one app server dies | app server dies | at least 99.9% of the load is still served |
| Non-functional | Everyone is still served when a map node dies | map node dies | at least 99.9% of the load is still served |
| Non-functional | p99 while a map node is down | map node dies | p99 is at most 100 ms |
| Non-functional | No trip events are lost when the worker dies | worker dies | a queue holds the events, and the workers drain 30 s of backlog within 60 s (a design with no queue has no worker to lose, and passes) |
| Non-functional | Availability | peak | the model's availability is at least 99.9% |
| Non-functional | Cost per hour | peak | at most $2.50 an hour |

The first functional check covers both a place report and a nearby search, because on the board both are a request that travels from the client through an app server to the location map. Their load is the same stream, and the model cannot tell them apart.

**Reading the cache here.** The cache is the location map (chapter 24.3). Its hit rate is the share of requests that the map answers on its own: a place report replaces the driver's last place, and a nearby search reads boxes. The rest (a ride request, a trip lookup) goes on to the database. The model sends only that share to the database, so the database sees about 200 requests a second at a 95% hit rate. The same stream feeds the queue: every accepted report is also a trip event for the history log of chapter 24.3, so the queue sees all 4,000 a second and the workers save them in groups. A design with no queue writes each event inline, which puts 4,000 writes a second on the database.

**Why a map node dying is a lose-one-instance fault, not "the cache is down".** A real location map has no database behind it and refills from the drivers within one report interval (chapter 24.3). The model cannot say "serve an empty map for 4 seconds". It can say what a lost node costs: with two or more nodes the others carry on, and with one node every request falls through to the database. So the fault takes one instance, and a map with a single node is lost whole.

**Assumptions:** steady state, the map is warm, a first city with 16,000 drivers online reporting every 4 seconds (4,000 reports a second, from chapter 24.1's method), with the searches and ride requests inside the same 4,000 requests a second. Half of the database's traffic reads (trip lookups) and half writes. Prices are illustrative.

**Limits:** a model, not a city. Latency is in model milliseconds. "Served" is capacity over load, not a request-by-request count. The model spreads load evenly over the nodes of a part, so it cannot show a crowded box such as a stadium after a match (one node getting far more than its share), places going stale, reports arriving out of order, or the few seconds in which a restarted node holds an empty map. A fleet spread over two zones counts as redundant even when it has one instance, a known simplification of the model. The queue is priced per message at an illustrative broker rate. There is no code lab for this design yet, so no number here is checked against a real stack.

## How the targets were tuned

Targets were set against the model only, using the tuning tool on the starting board, the reference design and the variants below. The load comes from chapter 24.1's method, cut down to a first city so that the numbers sit in the same range as the other visual labs: the model's machines carry thousands of requests a second, not the 250,000 of a million-driver service. The code lab for this design is coming; when it exists, its measured numbers will be compared with these targets, and a table of the checks it can score will be added here.

What the board is built to show is a shape, as in chapter 24.3: a place report is a write to memory and not a row in a database; a lost map node costs nothing if another node holds the rest, and everything if it was the only one; a trip worker's death is invisible to requests but needs spare capacity afterwards.

**Checked against the model (4,000 requests/s):**

| Design | Checks | Ceiling | p99 | Availability | Cost | Fails |
|---|---|---|---|---|---|---|
| Starting board (balancer, one app server, database) | 4/11 | 1,600 | 2,010 ms | 98.70% | $0.52/h | places, capacity, p99, app server dies, both map-node checks, availability |
| Reference (below) | 11/11 | 6,400 | 69 ms | 99.99% | $2.31/h | none |
| Reference with one medium balancer zone | 5/11 | 3,200 | 197 ms | 99.89% | $2.11/h | capacity, p99, app server dies (80% served), both map-node checks, availability |
| Reference with three small balancer zones | 10/11 | 4,800 | 76 ms | 99.99% | $2.21/h | p99 (the balancer is 83% busy) |
| Reference with two app servers | 8/11 | 4,800 | 144 ms | 99.98% | $2.19/h | p99, app server dies (60% served), p99 with a map node down |
| Reference with one app server | 5/11 | 2,400 | 1,357 ms | 98.94% | $2.07/h | capacity, p99, app server dies, both map-node checks, availability |
| Reference with a one-node map | 9/11 | 6,400 | 69 ms | 99.99% | $2.16/h | both map-node checks (59.8% served, p99 594 ms: the database is 167% busy) |
| Same, with the database at memory-large | 10/11 | 6,400 | 69 ms | 99.99% | $3.06/h | cost |
| Reference without the map | 5/11 | 2,395 | 594 ms | 99.99% | $2.01/h | places, capacity, p99, app server dies, both map-node checks (the database is 167% busy) |
| Reference with a 70% hit rate | 10/11 | 6,400 | 76 ms | 99.99% | $2.31/h | p99 |
| Reference with a hit rate of 85% | 11/11 | 6,400 | 71 ms | 99.99% | $2.31/h | none, with 1 ms of room on p99 |
| Reference without the database standby | 10/11 | 6,400 | 69 ms | 99.84% | $2.01/h | availability |
| Reference with database memory-medium | 10/11 | 6,400 | 69 ms | 99.99% | $2.61/h | cost |
| Reference without queue and worker (events written inline) | 6/11 | 1,171 | 594 ms | 99.999% | $1.36/h | capacity, p99, app server dies, both map-node checks (the database takes 4,000 inline writes a second) |
| Same, with the database at memory-xlarge | 9/11 | 6,400 | 74 ms | 99.999% | $3.46/h | p99, cost |
| Reference with a queue and no worker | 9/11 | 6,400 | 69 ms | 99.99% | $1.95/h | events and worker dies (nothing saves the events) |
| Reference with two workers | 10/11 | 6,400 | 69 ms | 99.99% | $2.19/h | worker dies (800/s spare, drains in 150 s) |
| Reference with one worker | 10/11 | 6,400 | 69 ms | 99.99% | $2.07/h | worker dies (2,400/s of workers against 4,000/s of events, never drains) |
| Reference with four workers | 11/11 | 6,400 | 69 ms | 99.99% | $2.43/h | none, but $0.12 more |
| Reference with batch size 1 | 6/11 | 2,286 | 594 ms | 99.99% | $2.31/h | capacity, p99, app server dies, both map-node checks (the database takes 4,000 saves a second) |
| Reference with batch size 20 | 11/11 | 6,400 | 70 ms | 99.99% | $2.31/h | none (a small batch is enough for this database) |
| Reference with big sizes everywhere | 10/11 | 19,200 | 44 ms | 99.99% | $6.05/h | cost |

The reference design: a load balancer of size general-medium in 2 zones; 3 app servers of size compute-small in 2 zones; a location map of 2 cache nodes of size memory-small at a 95% hit rate in 2 zones; a database of size memory-small with a standby, no read replica and 50% reads; a queue; 3 workers of size compute-small with batch size 500. The app server links to the cache, the database and the queue; the queue links to the workers; the workers link to the database.

The cheapest passing design found is about $2.31 an hour, and the budget is $2.50, so one extra instance or one size too large still fits, and two or three extras do not. A few other designs also pass (four workers, three app servers in one zone, a three-node map, a smaller batch size); that is intended, because the lab scores what a design does and not which parts it uses.

**Try this**

1. Run the starting board. Expected: 4 of 11 pass. Saving a trip and recording events (inline) work, and the board says why the rest fail, starting with the balancer at 250% busy, and the first check, which asks for a location map the board does not have.
2. Add a cache, link the app server to it, and set its hit rate to 95%. Expected: the places check turns green (5 of 11), and the database falls from 250% to 171% busy, because only the misses reach it. It is still over 100% because every request also writes its event inline, which the queue fixes in step 4.
3. Give the map one node and run: it passes the peak checks. Read the map-node scene: the database goes to 167% busy and only 60% are served. Add a second node and run again.
4. Add a queue and a worker, link app server to queue to worker to database, and leave the batch size at 1. Expected: the database is the busiest part, at 175%. Set the batch size to 500 and it drops to under 10%.
5. Give the design two workers, then three, and read the worker check each time: 150 s to catch up, then 38 s.
6. On the finished design, lower the hit rate from 95% to 70% and run: p99 rises from 69 to 76 ms, because more requests reach the database.

## Solution

The reference design is in `solution.ts` next to this file, and it passes all 11 checks at $2.31 an hour (the design recorded in the table above). The board offers it through a Solution button, after the learner has pressed Run once and confirmed. It opens read-only, labelled "Reference solution", with a button to copy it onto the learner's board and one to go back. Each part has a short explanation: why it is there, which checks it helps pass, and what happens without it.

| Part | Why it is there | Checks it helps pass |
|---|---|---|
| Load balancer, 2 medium zones | One medium zone carries about 3,200 a second, so two carry the 4,000 | capacity, p99, every fault check, availability |
| App servers, 3 in 2 zones | N+1: losing one leaves two at 83% busy | capacity, p99, app server dies, availability |
| Location map, 2 nodes, 95% hits | Answers almost every request from memory, and a lost node leaves the other | places, p99, both map-node checks |
| Database with a standby | Keeps trips safe and stays up if its zone fails; only 9% busy | trip, availability |
| Queue and 3 workers at batch 500 | Events wait safely and reach the database in about 8 saves a second | events, worker dies, p99 |

"Compare with mine" lists, in plain words, which parts, settings and links differ from the learner's design and which failing checks each one helps explain. It gives directions ("lower", "smaller") and no numbers, so it does not hand over the answer.
