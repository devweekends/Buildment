import type { SolutionDef } from "../types";

// The reference design recorded in spec.md: 12 of 12 checks at $2.93 an hour.
export const productSearchSolution: SolutionDef = {
  summary:
    "Give the search index the most room, because it carries the lookups and the product changes together: ten small nodes, so that losing one costs a tenth. Put a cache in front of the product database for suggestions, and send product changes through a queue to two workers, so a dead worker loses nothing.",
  board: {
    nodes: [
      { id: "client", kind: "client", x: 1, y: 0 },
      { id: "lb", kind: "load-balancer", x: 1, y: 1, props: { size: "general-small", zones: 2 } },
      { id: "app", kind: "app-server", x: 1, y: 2, props: { size: "compute-small", count: 2, azs: 2 } },
      { id: "cache", kind: "cache", x: 0, y: 3, props: { size: "memory-small", count: 1, hitRate: 0.9, azs: 2 } },
      { id: "search", kind: "search", x: 1, y: 3, props: { size: "memory-small", count: 10, azs: 2 } },
      { id: "q", kind: "queue", x: 2, y: 3 },
      { id: "db", kind: "database", x: 0, y: 4, props: { size: "memory-small", readRatio: 0.95, multiAz: 1 } },
      { id: "w", kind: "worker", x: 2, y: 4, props: { size: "compute-small", count: 2 } },
    ],
    edges: [
      { from: "client", to: "lb" },
      { from: "lb", to: "app" },
      { from: "app", to: "cache" },
      { from: "app", to: "search" },
      { from: "app", to: "db" },
      { from: "app", to: "q" },
      { from: "q", to: "w" },
      { from: "w", to: "search", via: ["b", "r"] },
    ],
  },
  parts: {
    lb: {
      why: "Every lookup passes through the load balancer first. One small balancer zone carries about 1,600 requests a second, so two zones carry the 2,000 a second at the busiest moment (63% busy).",
      checks: ["capacity", "p99", "app-dies", "search-dies", "search-dies-p99", "availability"],
      without: "With one zone the balancer is 125% busy. It can serve only 1,600 requests a second, the slowest 1 in 100 (p99) takes 253 ms, 80% are served when an app server or a search node dies, and uptime (availability) falls to 99.87%.",
    },
    app: {
      why: "Two app servers in two zones, each able to carry 2,400 requests a second. At the busiest moment each is 42% busy. When one dies, the other is 83% busy and everyone is still served.",
      checks: ["capacity", "p99", "app-dies", "availability"],
      without: "With one app server, nothing is left when it dies: 0% are served. At the busiest moment it is already 83% busy and the slowest 1 in 100 takes 210 ms. Two servers in one zone fall to 99.92% availability, under the 99.95% target.",
    },
    cache: {
      why: "The cache answers suggestions from memory, and 90% of product lookups too. A hit means the product database is never asked, so only about 200 of the 2,000 lookups a second reach it.",
      checks: ["suggest", "capacity", "p99", "app-dies", "search-dies", "search-dies-p99"],
      without: "With no cache, a suggestion has nowhere to be served from, and the product database does all 2,000 lookups: it is 158% busy, the whole design can serve only 1,263 a second, and p99 is 583 ms. A cache in one zone gives 99.82% availability.",
    },
    search: {
      why: "Ten small search nodes hold the index. They answer the 2,000 lookups a second and also take the 2,000 product changes a second from the workers, so they carry 4,000 a second in all, 67% busy. Losing one node leaves nine at 74%.",
      checks: ["search", "index-update", "capacity", "p99", "search-dies", "search-dies-p99"],
      without: "With nine nodes the index is 74% busy at the busiest moment (p99 146 ms, over the 130 ms target) and 83% busy after a loss (p99 200 ms, over 160 ms). With seven nodes it is 95% busy, p99 is 575 ms, and a loss leaves it at 111%, so only 90% are served. Five bigger nodes cost the same, but losing one leaves the rest at 83% and p99 at 200 ms.",
    },
    q: {
      why: "The queue holds each product change until a worker indexes it. The seller's save never waits for the index, and no change is lost while the worker is away.",
      checks: ["index-update", "indexer-dies"],
      without: "With no queue, a product change has no path to the index, and 60,000 changes are lost in a 30 second worker outage. Without the updates the index is only 33% busy, which is why a design that skips the queue looks cheaper and faster than it should.",
    },
    w: {
      why: "Two workers take changes from the queue and write them to the index. Each handles 2,400 a second, so they have 2,800 a second to spare after the 2,000 new changes. That clears 30 seconds of waiting changes (60,000) in 22 seconds.",
      checks: ["index-update", "indexer-dies"],
      without: "One worker has only 400 a second to spare, so the 60,000 waiting changes take 150 seconds to clear. A seller's change then waits far longer than the 30 seconds Dalil promised. A third worker clears them in 12 seconds but costs $0.12 an hour more, which is over budget.",
    },
    db: {
      why: "The product database keeps every product and is the source of truth: the index can always be rebuilt from it. An extra copy in a second zone takes over if the main one's zone fails (a failover standby).",
      checks: ["details", "availability"],
      without: "With no database, results cannot show full product details. With no extra copy that takes over, the database is the weak link and availability falls to 99.82%, under the 99.95% target.",
    },
  },
};
