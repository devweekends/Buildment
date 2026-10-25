import type { SolutionDef } from "../types";

// The reference design recorded in spec.md: 11 of 11 checks at $2.54 an hour.
export const newsFeedSolution: SolutionDef = {
  summary:
    "Prepare each feed before anyone asks for it: a queue and three workers push every new post into a cache of ready feeds (fan-out on write), so opening a feed is one quick read. Spread the work over enough small parts that losing any one still leaves room: three load balancer zones, three app servers, and a database with a standby and a read-only copy.",
  board: {
    nodes: [
      { id: "client", kind: "client", x: 1, y: 0 },
      { id: "lb", kind: "load-balancer", x: 1, y: 1, props: { size: "general-small", zones: 3 } },
      { id: "app", kind: "app-server", x: 1, y: 2, props: { size: "compute-small", count: 3, azs: 2 } },
      { id: "cache", kind: "cache", x: 0, y: 3, props: { size: "memory-small", count: 1, hitRate: 0.95, azs: 2 } },
      { id: "q", kind: "queue", x: 2, y: 3 },
      { id: "db", kind: "database", x: 1, y: 4, props: { size: "memory-medium", replicas: 1, readRatio: 0.98, multiAz: 1 } },
      { id: "w", kind: "worker", x: 2, y: 4, props: { size: "compute-small", count: 3 } },
    ],
    edges: [
      { from: "client", to: "lb" },
      { from: "lb", to: "app" },
      { from: "app", to: "cache" },
      { from: "app", to: "db" },
      { from: "app", to: "q" },
      { from: "q", to: "w" },
      { from: "w", to: "cache", via: ["l", "r"] },
    ],
  },
  parts: {
    lb: {
      why: "Every request passes through the load balancer first. It spreads requests over the app servers. One small balancer zone carries about 1,600 requests a second, so three zones carry the 3,200 a second at the busiest moment and are 67% busy.",
      checks: ["capacity", "p99", "app-dies", "cache-dies", "cache-dies-p99"],
      without: "With one zone the balancer is 200% busy. It can serve only 1,600 requests a second, the slowest 1 in 100 (p99) takes 188 ms, and every failure check fails with it. With two zones it is exactly full (100% busy) and p99 is still 188 ms.",
    },
    app: {
      why: "Three app servers in two zones, so that losing one still leaves two to carry the load (one spare machine, called N+1). Each is 44% busy at the busiest moment, and 67% busy with one gone. They save posts, open feeds and hand each new post to the queue.",
      checks: ["post", "read", "capacity", "p99", "app-dies", "availability"],
      without: "With two servers each is 67% busy even when all is well, so p99 is 84 ms, over the 65 ms target. Losing one leaves a single server at 133% busy and only 75% of requests are served. With one server, nothing is left.",
    },
    cache: {
      why: "The cache holds ready-made feeds. At a 95% hit rate it answers 3,040 of the 3,200 feed opens a second itself, so only about 160 a second reach the database. The workers also write each new post into it.",
      checks: ["fanout", "p99", "cache-dies", "cache-dies-p99"],
      without: "With no cache, the workers have nowhere to put a new post, so the delivery check fails (the path stops at the worker). The database also does all 3,200 reads, is 65% busy, and p99 is 75 ms, over the 65 ms target.",
    },
    q: {
      why: "When a post is saved, the app server puts a note about it on the queue and answers at once. The queue holds the notes until a worker delivers them, so the author never waits for the spreading, and no post is lost while the worker is away.",
      checks: ["fanout", "worker-dies"],
      without: "With no queue nothing delivers posts to feeds, and a stopped worker would have nowhere to leave them: 144,000 posts in 45 seconds are lost. It would save $0.47 an hour, because the queue is priced per message.",
    },
    w: {
      why: "Three workers take notes from the queue and write each post into the followers' feeds in the cache. Together they handle 7,200 a second while 3,200 arrive, so they have 4,000 a second to spare. That clears the 144,000 posts that wait during a 45 second outage in 36 seconds.",
      checks: ["fanout", "worker-dies"],
      without: "Two workers have only 1,600 a second to spare, so the same 144,000 waiting posts take 90 seconds, over the 60 second limit. Four workers pass too, but the design then costs $2.66 an hour, over the $2.60 budget. With no worker, posts pile up and are never delivered.",
    },
    db: {
      why: "The database keeps every post. An extra copy in a second zone takes over if the main one's zone fails (a failover standby). One read-only copy (a read replica) shares the reads, so if the feed cache dies the database can serve all 3,200 feed opens a second (65% busy).",
      checks: ["post", "read", "availability", "cache-dies", "cache-dies-p99"],
      without: "With no read-only copy, a stopped cache puts the database at 131% busy: 76.5% of requests are served and the slowest 1 in 100 takes 585 ms. With no standby that takes over, the database is the weak link and uptime (availability) falls to 99.83%, under the 99.9% target.",
    },
  },
};
