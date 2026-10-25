import type { SolutionDef } from "../types";

// The reference design recorded in spec.md: 11 of 11 checks at $2.31 an hour.
export const rideMatchingSolution: SolutionDef = {
  summary:
    "Keep each driver's latest place in a small in-memory map split over two nodes, so a place report never touches the database. Let trips go to a database with a standby copy, and record trip events off the request path with a queue and three workers that save in groups.",
  board: {
    nodes: [
      { id: "client", kind: "client", x: 1, y: 0 },
      { id: "lb", kind: "load-balancer", x: 1, y: 1, props: { size: "general-medium", zones: 2 } },
      { id: "app", kind: "app-server", x: 1, y: 2, props: { size: "compute-small", count: 3, azs: 2 } },
      { id: "cache", kind: "cache", x: 0, y: 3, props: { size: "memory-small", count: 2, hitRate: 0.95, azs: 2 } },
      { id: "q", kind: "queue", x: 2, y: 3 },
      { id: "db", kind: "database", x: 1, y: 4, props: { size: "memory-small", replicas: 0, readRatio: 0.5, multiAz: 1 } },
      { id: "w", kind: "worker", x: 2, y: 4, props: { size: "compute-small", count: 3, batchSize: 500 } },
    ],
    edges: [
      { from: "client", to: "lb" },
      { from: "lb", to: "app" },
      { from: "app", to: "cache" },
      { from: "app", to: "db" },
      { from: "app", to: "q" },
      { from: "q", to: "w" },
      { from: "w", to: "db", via: ["l", "r"] },
    ],
  },
  parts: {
    lb: {
      why: "Every request passes through the load balancer first. One medium zone carries about 3,200 requests a second, so two zones carry the 4,000 a second at the busiest moment and are 63% busy.",
      checks: ["capacity", "p99", "app-dies", "map-dies", "map-dies-p99", "availability"],
      without: "With one medium zone the balancer is 125% busy. It serves only 3,200 requests a second, the slowest 1 in 100 requests (p99) takes 197 ms, and the app-server and map-node checks fail with only 80% served. Three small zones carry the load but are 83% busy, and p99 is 76 ms, over the 72 ms target.",
    },
    app: {
      why: "Three app servers in two zones, so that losing one still leaves two to carry the load (one spare machine, called N+1). Each is 56% busy at the busiest moment, and 83% busy with one gone.",
      checks: ["capacity", "p99", "app-dies", "availability"],
      without: "With two servers each is already 83% busy, p99 is 144 ms, and losing one leaves room for 2,400 requests a second out of 4,000, so only 60% are served. With one server, nothing is left when it dies.",
    },
    cache: {
      why: "The map holds each driver's latest place, split over two nodes. Reports and searches are answered from memory, so at a 95% hit rate only about 200 of the 4,000 requests a second (ride requests and trips) reach the database. If one node stops, the other keeps serving, and the lost drivers report again within 4 seconds.",
      checks: ["places", "capacity", "p99", "app-dies", "map-dies", "map-dies-p99"],
      without: "With no map, the small database takes all 4,000 requests a second and is 167% busy: it serves 2,395 a second and p99 is 594 ms. With a map of one node, it is fine until that node stops. Then the database is 167% busy, only 59.8% are served and p99 is 594 ms. A larger database would pass, at $3.06 an hour.",
    },
    q: {
      why: "The queue holds each trip event until a worker saves it. The request never waits for the save, and no event is lost while the workers are away.",
      checks: ["events", "worker-dies", "capacity", "p99"],
      without: "With no queue, every request saves its event in the database first (inline): 4,000 extra writes a second on the main copy. The database is 342% busy, it can serve only about 1,171 a second and p99 is 594 ms. Even a database of the largest size, memory-xlarge, costs $3.46 an hour.",
    },
    w: {
      why: "Three workers take events from the queue and save them in groups of 500 (batches), so the database sees about 8 saves a second instead of 4,000. Three workers leave 3,200 events a second to spare, which clears 30 seconds of waiting events (120,000) in 38 seconds.",
      checks: ["events", "worker-dies", "capacity", "p99"],
      without: "With two workers only 800 events a second are spare, so the 120,000 waiting events take 150 seconds, over the 60 second limit. One worker handles 2,400 a second while 4,000 arrive, so the queue never clears. A batch size of 1 sends 4,000 saves a second to the database, which is 175% busy, with a ceiling of 2,286 a second.",
    },
    db: {
      why: "The database keeps trips. An extra copy in a second zone takes over if the main one's zone fails (a failover standby). It is only 9% busy, because the map and the batching keep almost everything away from it.",
      checks: ["trip", "availability", "events"],
      without: "With no standby the database is the weak link and uptime (availability) falls to about 99.84%, under the 99.9% target. A medium database in place of the small one adds cost and no passing check: $2.61 an hour, over the $2.50 budget.",
    },
  },
};
