import type { SolutionDef } from "../types";

// The reference design recorded in spec.md: 11 of 11 checks at $2.29 an hour.
export const ticketDropSolution: SolutionDef = {
  summary:
    "Let only part of the crowd in at a time with a waiting room, size everything behind it for that part, keep seat views in a cache with a database that can survive without it, and confirm payments off the busy path with a queue and enough workers.",
  board: {
    nodes: [
      { id: "client", kind: "client", x: 1, y: 0 },
      { id: "room", kind: "rate-limiter", x: 1, y: 1, props: { limit: 3500 } },
      { id: "lb", kind: "load-balancer", x: 1, y: 2, props: { size: "general-small", zones: 3 } },
      { id: "app", kind: "app-server", x: 1, y: 3, props: { size: "compute-small", count: 3, azs: 2 } },
      { id: "cache", kind: "cache", x: 0, y: 4, props: { size: "memory-small", count: 1, hitRate: 0.9, azs: 2 } },
      { id: "q", kind: "queue", x: 2, y: 4 },
      { id: "db", kind: "database", x: 1, y: 5, props: { size: "memory-small", replicas: 2, readRatio: 0.8, multiAz: 1 } },
      { id: "w", kind: "worker", x: 2, y: 5, props: { size: "compute-small", count: 3, batchSize: 100 } },
    ],
    edges: [
      { from: "client", to: "room" },
      { from: "room", to: "lb" },
      { from: "lb", to: "app" },
      { from: "app", to: "cache" },
      { from: "app", to: "db" },
      { from: "app", to: "q" },
      { from: "q", to: "w" },
      { from: "w", to: "db", via: ["l", "r"] },
    ],
  },
  parts: {
    room: {
      why: "The waiting room (a rate limiter) lets in up to 3,500 requests a second and turns the other 4,500 of the 8,000 away on purpose. Everything behind it is sized for 3,500, not 8,000. It shows over 100% busy because it is refusing people, which is its job.",
      checks: ["capacity", "p99", "app-dies", "app-dies-p99", "cache-dies", "worker-dies", "cost"],
      without: "With no waiting room the full 8,000 a second reach the parts behind it. The load balancer is 167% busy, the app server 111%, the slowest 1 in 100 requests (p99) takes 1,487 ms, and the workers handle 7,200 a second against 8,000 arriving, so payments never catch up. Making every part big enough for 8,000 passes all but one check and costs $5.75 an hour, over the $2.50 budget. A limit of 2,000 fails the capacity check (2,000 a second, 3,000 needed), and a limit of 8,000 is the same as no room at all.",
    },
    lb: {
      why: "Every admitted request passes the load balancer. One small zone carries about 1,600 requests a second, so three zones carry the 3,500 let in at 73% busy, with room if one zone is slow.",
      checks: ["p99", "app-dies", "app-dies-p99", "cache-dies", "availability"],
      without: "With one zone the balancer is 219% busy and p99 is 192 ms. Four checks fail: p99, p99 with an app server down (227 ms), p99 with the cache down (221 ms), and availability (99.87%). With two zones it is still 109% busy and p99 is 192 ms.",
    },
    app: {
      why: "Three app servers in two zones, so that losing one still leaves two to carry the load (one spare machine, called N+1). Each is 49% busy at peak, and the two left are 73% busy when one dies (p99 101 ms).",
      checks: ["p99", "app-dies", "app-dies-p99", "cache-dies", "availability"],
      without: "With two servers, losing one leaves a server 146% busy and p99 of 1,360 ms. Even with all healthy, p99 is 101 ms, over the 90 ms target. With one server it is 146% busy all the time, and losing it stops everything (0 a second).",
    },
    cache: {
      why: "Most requests are people looking at the seat map. At a 90% hit rate the cache answers 3,150 of 3,500 views a second itself, and only the misses reach the database. The cache runs in two zones so one zone failing does not take it away.",
      checks: ["seatmap", "p99", "availability"],
      without: "With no cache the seat map has nowhere to be read from, so the check 'The seat map shows what is free' fails. The database is also 79% busy all the time and p99 is 95 ms, over the 90 ms target. A cache in one zone only passes everything except availability (99.82%).",
    },
    q: {
      why: "The queue holds each payment until a worker confirms it. The app server never waits for the confirmation, and no payment is lost while the worker is away.",
      checks: ["pay", "worker-dies"],
      without: "With no queue a payment has nowhere to wait: the path check fails, and the board reports 480,000 payments lost in 60 s (it counts all 8,000 requests a second at the door). With a queue and no worker the payments pile up and are never confirmed.",
    },
    db: {
      why: "The database keeps every seat and every hold. Two read-only copies (read replicas) share the seat views, so when the cache dies the database carries all 3,500 views a second at 79% busy. An extra copy in a second zone takes over if the main copy's zone fails (a failover standby).",
      checks: ["cache-dies", "availability", "hold", "pay"],
      without: "With no read-only copy a dead cache puts the database 236% busy and p99 at 591 ms. With one copy it is 118% busy and still 591 ms. With no standby the database is the weak link and availability falls to 99.82%, under the 99.9% target.",
    },
    w: {
      why: "Three workers take payments from the queue and save them in groups of 100 (batches). Together they handle 7,200 a second against 3,500 arriving, so they have 3,700 a second to spare, and the 210,000 payments that wait in 60 s clear in 57 s.",
      checks: ["pay", "worker-dies", "p99", "cache-dies"],
      without: "With two workers only 1,300 a second are spare, so the same backlog takes 162 s against the 120 s allowed. Five workers pass but cost $2.53 an hour, $0.03 over budget. A batch size of 1 sends 3,500 writes a second to the database, which then fails p99 (113 ms), app server dies (148 ms) and cache dies (591 ms).",
    },
  },
};
