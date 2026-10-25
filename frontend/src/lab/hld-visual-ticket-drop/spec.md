# Design a ticket drop (visual challenge)

**Claim:** a ticket service that only holds seats is easy to build and easy to break when the whole crowd arrives at ten o'clock. To pass, the design must also show the seat map and confirm payments, let in only as many buyers as its parts can carry (a waiting room), and keep answering when an app server, the seat-map cache or the payment worker dies. Each of those needs a part, and each part costs money, so the lab asks for the cheapest design that survives.

**Inputs:** the parts the learner places (client, rate limiter used as the waiting room, load balancer, app server, cache, database, queue, worker), the links between them, and per part its size, count, zones, and for the waiting room its limit, for the cache its hit rate, for the database its read replicas, standby and read share, and for the worker its batch size. The offered load is fixed by the brief at 8,000 requests a second at the door.

**Rule:** the tiered-architecture model in `frontend/src/lab/tiered-architecture.ts`, played through four scenarios by `frontend/src/lab/challenge.ts`:

1. Peak traffic: everything healthy at 8,000 requests a second at the door.
2. An app server dies: one instance of the app fleet is lost (a fleet of one is lost whole).
3. The seat-map cache dies: every cache is taken down, so every seat view asks the database.
4. The payment worker dies: every worker is taken down for 60 seconds, then comes back.

Eleven checks read the four scenarios.

| Kind | Check | Scenario | Passes when |
|---|---|---|---|
| Functional | A seat can be held | peak | a client reaches a database through an app server |
| Functional | The seat map shows what is free | peak | the app server can read seat availability from a cache |
| Functional | A payment is confirmed | peak | a payment travels app server, queue, worker, database |
| Non-functional | Lets in and serves enough buyers | peak | capacity is at least 3,000/s |
| Non-functional | Slowest 1 in 100 requests is fast enough (p99) | peak | p99 is at most 90 ms |
| Non-functional | Buyers are still served when an app server dies | app server dies | capacity is at least 3,000/s |
| Non-functional | Slowest 1 in 100 while an app server is down | app server dies | p99 is at most 130 ms |
| Non-functional | Slowest 1 in 100 while the cache is down | cache dies | p99 is at most 110 ms |
| Non-functional | No payment is lost when the worker dies | worker dies | a queue holds the payments, and the workers confirm 60 s of backlog within 120 s |
| Non-functional | Availability | peak | the model's availability is at least 99.9% |
| Non-functional | Cost per hour | peak | at most $2.50 an hour |

**How the waiting room is modelled.** The rate limiter rejects every request above its limit and passes the rest on, so the parts behind it see at most the limit. The model counts the rejected requests as dropped, not as failures. The lab therefore does not use the "served" measure for the faults: "served" is capacity divided by the 8,000 at the door, and an honest waiting room at 3,500 would score 44% on it forever. Two measures are used instead. Capacity must be at least 3,000 a second, which is the waiting room not being stingy (a limit of 2,000 fails it). And p99 must stay low, which is the parts behind the room not being overloaded. The waiting room turns away 4,500 of the 8,000 requests a second on purpose and the board shows it over 100% busy, which is its job and not a fault.

**Cache wiring:** as in the URL shortener lab. The app server may link to both the cache and the database (cache-aside), or the learner may also link the cache onward to the database (read-through, which puts the cache in the path so its death cuts the database off).

**Assumptions:** steady state, the cache is warm, 80% of the database traffic is reads (people looking at the seat map), and prices are illustrative. The lab shrinks chapter 25's drop (80,000 requests a second for a 20,000-seat show) to 8,000 requests a second so the parts stay readable, and keeps its shape: a crowd far larger than the system, a waiting room, a short list of seats, payments that must not be lost.

**Limits:** a model, not a cloud. Latency is in model milliseconds. The model routes requests down links and never looks at which seat a request asks for, so it cannot show two buyers getting the same seat. That is the failure that matters most in chapter 25, and it is a correctness failure (a race on one row, solved with a single conditional update), not a capacity one. A design can pass all eleven checks and still sell a seat twice. The model also counts every request let in as one payment to confirm (a queue message), which is far more than real life (chapter 25.1 expects about 170 payments a second), so the queue and workers are sized for a harder job than real payments. The cache is always warm, there are no stale reads, and no timeout, retry storm or duplicate webhook. The ceiling the model reports is capped by the waiting room's limit, so a part behind the room that is overloaded shows up in p99 and in the busiest-part list, not in the capacity number. The queue is priced per message at the model's broker rate and never fills. There is no code lab for this system yet.

## How the targets were tuned

Targets were set against the model. Peak load 8,000 and a budget of $2.50 an hour are chosen so that the waiting room matters on cost: without one, the queue alone costs $1.16 an hour at 8,000 messages a second. The p99 targets are set so that a design with one missing idea fails for one clear reason, and the reference passes with room.

| Check | Target | Why this number |
|---|---|---|
| Capacity | at least 3,000/s | The waiting room must let in at least 3,000 a second; 2,000 fails (2,000/s) |
| p99 at peak | at most 90 ms | The reference measures 66 ms; a database with no cache sits at 95 ms |
| Buyers served, app server dies | at least 3,000/s | A single app server is lost whole and the ceiling falls to 0/s |
| p99, app server down | at most 130 ms | The reference measures 101 ms; two servers measure 1,360 ms |
| p99, cache down | at most 110 ms | The reference measures 95 ms (database 79% busy); one read replica measures 591 ms |
| Payments drain | within 120 s of 60 s of backlog | The reference clears 210,000 waiting payments in 57 s; two workers take 162 s |
| Availability | at least 99.9% | The reference measures 99.98%; a database with no standby measures 99.82% |
| Cost | at most $2.50 an hour | The reference costs $2.29 |

**Checked against the model (8,000 requests a second at the door):**

| Design | Checks | Ceiling | p99 | Availability | Cost | Fails |
|---|---|---|---|---|---|---|
| Starting board (balancer, one app server, database) | 2/11 | 1,500 | 2,010 ms | 98.70% | $0.37/h | seat map, payment, capacity, p99, both app-server-dies checks, cache dies, worker dies, availability |
| Reference (below) | 11/11 | 3,500 | 66 ms | 99.98% | $2.29/h | none |
| Reference without the waiting room | 6/11 | 4,800 | 1,487 ms | 99.99% | $2.93/h | p99, p99 with an app server down, cache dies (2,010 ms), worker dies (7,200/s of workers against 8,000/s arriving), cost |
| Same, with every part sized for 8,000 (balancer 3 zones of general-medium, 6 app servers, 6 workers, database memory-large with 2 copies) | 10/11 | 9,600 | 75 ms | 99.99% | $5.75/h | cost |
| Reference with a waiting room limit of 2,000 | 9/11 | 2,000 | 51 ms | 99.98% | $2.08/h | capacity, app server dies (2,000/s, 3,000 needed) |
| Reference with a limit of 3,000 | 11/11 | 3,000 | 59 ms | 99.98% | $2.22/h | none (the lowest limit that passes) |
| Reference with a limit of 3,600 | 11/11 | 3,600 | 68 ms | 99.98% | $2.31/h | none (the highest limit found that passes) |
| Reference with a limit of 4,000 | 9/11 | 4,000 | 77 ms | 99.98% | $2.37/h | p99 with an app server down (152 ms), cache dies (146 ms) |
| Reference with a limit of 8,000 (no real limit) | 6/11 | 4,800 | 1,488 ms | 99.98% | $2.94/h | the same five as no waiting room |
| Reference without the cache | 9/11 | 3,500 | 95 ms | 99.98% | $2.14/h | seat map, p99 (database 79% busy) |
| Reference without read replicas | 10/11 | 3,500 | 68 ms | 99.98% | $1.99/h | cache dies (591 ms, database 236% busy) |
| Reference with one read replica | 10/11 | 3,500 | 66 ms | 99.98% | $2.14/h | cache dies (591 ms, database 118% busy) |
| Reference without the standby database copy | 10/11 | 3,500 | 66 ms | 99.83% | $2.14/h | availability (99.82%) |
| Reference with the cache in one zone | 10/11 | 3,500 | 66 ms | 99.83% | $2.29/h | availability (99.82%) |
| Reference with two app servers | 8/11 | 3,500 | 101 ms | 99.97% | $2.17/h | p99, p99 with an app server down (1,360 ms), cache dies (130 ms) |
| Reference with one app server | 8/11 | 3,500 | 1,360 ms | 99.97% | $2.05/h | p99, app server dies (0/s), cache dies (1,389 ms) |
| Reference with one balancer zone | 7/11 | 3,500 | 192 ms | 99.88% | $2.09/h | p99 and the two p99 fault checks (balancer 219% busy), availability |
| Reference with two balancer zones | 8/11 | 3,500 | 192 ms | 99.98% | $2.19/h | p99 and the two p99 fault checks (balancer 109% busy) |
| Reference without the queue | 9/11 | 3,500 | 66 ms | 99.99% | $1.78/h | payment, worker dies (480,000 payments lost in 60 s; the model counts the whole 8,000/s at the door) |
| Reference with a queue and no worker | 9/11 | 3,500 | 66 ms | 99.98% | $1.93/h | payment, worker dies (payments pile up) |
| Reference with two workers | 10/11 | 3,500 | 66 ms | 99.98% | $2.17/h | worker dies (162 s against the 120 s allowed) |
| Reference with four workers | 11/11 | 3,500 | 66 ms | 99.98% | $2.41/h | none |
| Reference with five workers | 10/11 | 3,500 | 66 ms | 99.98% | $2.53/h | cost ($0.03 over) |
| Reference with batch size 1 | 8/11 | 3,500 | 113 ms | 99.98% | $2.29/h | p99, p99 with an app server down (148 ms), cache dies (591 ms): the database takes 3,500 payment writes a second |
| Reference with a database at memory-large | 10/11 | 3,500 | 65 ms | 99.98% | $4.09/h | cost |
| Reference with big app servers (compute-large) | 10/11 | 3,500 | 50 ms | 99.98% | $3.37/h | cost |

The reference design: a waiting room (rate limiter) with a limit of 3,500; a load balancer of size general-small in 3 zones; 3 app servers of size compute-small in 2 zones; one cache node of size memory-small at a 90% hit rate in 2 zones; a database of size memory-small with a standby, 2 read replicas and 80% reads; a queue; 3 workers of size compute-small with batch size 100. The client links to the waiting room, the waiting room to the balancer, the balancer to the app servers; the app server links to the cache, the database and the queue; the queue links to the workers; the workers link to the database.

The cheapest passing design found is about $2.22 an hour (the same board with a limit of 3,000), and the budget is $2.50, so a design with an extra worker or a size too large fails on cost alone. A limit of 3,000 to 3,600 passes with this backend. Raise the limit further and the load balancer and database fill up and the fault checks fail.

## What the board cannot show

The most important failure of a ticket drop is selling the same seat twice. The model has no idea which seat a request wants, so two buyers racing for seat 7 look exactly like two buyers for two seats. A design can pass all eleven checks and still oversell. That failure is about correctness under contention, not capacity, and it is fixed in the data, with one conditional update on the seat row, a hold that expires, and a confirm that checks the hold is still current. These are the lessons of chapter 25 (25.2 and, for money, 25.3 and 25.4). The board also does not show fairness (who gets let in first), a stale seat map, or a duplicate payment message.

**Try this**

1. Run the starting board. Expected: 2 of 11 pass. A seat can be held, and the cost is low, but the load balancer is 500% busy, there is no seat map and no payment path.
2. Put a waiting room between the client and the load balancer and set its limit to 3,500. Then add a cache, a queue and a worker and size them up. Expected: the load balancer drops from 500% to 73% busy even though 8,000 requests a second still arrive. The waiting room shows over 100% busy, because it is turning people away.
3. Take the waiting room away again and leave everything else. Expected: the load balancer is 167% busy, p99 is 1,487 ms and the workers can never catch up. Then try making every part bigger and watch the cost.
4. Set the waiting room limit to 4,000, then 2,000. Expected: at 4,000 the fault checks fail on p99. At 2,000 the capacity check fails, because too few buyers get in.
5. Take away the database's read replicas and run. Expected: the cache-dies check fails (the database goes to 236% busy when the cache is gone).

## Solution

The reference design is in `solution.ts` next to this file, and it passes all 11 checks at $2.29 an hour (the design recorded in the table above). The board offers it through a Solution button, after the learner has pressed Run once and confirmed. Each part has a short explanation: why it is there, which checks it helps pass, and what happens without it.

| Part | Why it is there | Checks it helps pass |
|---|---|---|
| Waiting room, limit 3,500 | Turns 4,500 of the 8,000 requests a second away on purpose, so everything behind it is sized for 3,500 | capacity, p99, the fault checks, cost |
| Load balancer, 3 zones | One small zone carries about 1,600 a second, so three carry the 3,500 at 73% | p99, fault checks, availability |
| App servers, 3 in 2 zones | N+1: losing one leaves two at 73% | p99, app server dies, availability |
| Cache, 90% hits, 2 zones | Answers 3,150 of 3,500 seat views a second | seat map, p99, availability |
| Database, standby and 2 replicas | The replicas carry all the views at 79% if the cache dies; the standby keeps it up if its zone fails | cache dies, availability |
| Queue and 3 workers at batch 100 | Payments wait safely and 3,700 a second are spare to clear a backlog | payment, worker dies, p99 |

"Compare with mine" lists, in plain words, which parts, settings and links differ from the learner's design and which failing checks each one helps explain. It gives directions ("lower", "smaller") and no numbers, so it does not hand over the answer.
