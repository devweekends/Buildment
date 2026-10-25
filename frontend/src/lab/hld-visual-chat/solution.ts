import type { SolutionDef } from "../types";

// The reference design recorded in spec.md: 11 of 11 checks at $2.12 an hour.
export const chatSolution: SolutionDef = {
  summary:
    "Enough small gateways that losing one still leaves room, three chat servers in two zones, a cache that answers online-dot lookups with a message store sized to carry everything if the cache stops, and every alert held in a queue for three workers that clear a backlog in 75 seconds.",
  board: {
    nodes: [
      { id: "client", kind: "client", x: 1, y: 0 },
      { id: "gw", kind: "api-gateway", x: 1, y: 1, props: { size: "compute-small", count: 3 } },
      { id: "chat", kind: "app-server", x: 1, y: 2, props: { size: "compute-small", count: 3, azs: 2 } },
      { id: "cache", kind: "cache", x: 0, y: 3, props: { size: "memory-small", count: 1, hitRate: 0.9, azs: 2 } },
      { id: "store", kind: "nosql", x: 1, y: 3, props: { size: "memory-small", count: 2, azs: 2 } },
      { id: "q", kind: "queue", x: 2, y: 3 },
      { id: "w", kind: "worker", x: 2, y: 4, props: { size: "compute-small", count: 3 } },
    ],
    edges: [
      { from: "client", to: "gw" },
      { from: "gw", to: "chat" },
      { from: "chat", to: "cache" },
      { from: "chat", to: "store" },
      { from: "chat", to: "q" },
      { from: "q", to: "w" },
    ],
  },
  parts: {
    gw: {
      why: "Phones connect to a gateway (a connection server), and every request passes through it first. Three small gateways carry 7,200 requests a second, so the 4,000 at the busiest moment keep each one 56% busy. When one dies, the other two are 83% busy and still serve everyone.",
      checks: ["store", "capacity", "p99", "gateway-dies"],
      without: "With two gateways, one dying leaves room for 2,400 requests a second out of 4,000, so only 60% are served. Even when both are alive they are 83% busy and the slowest 1 in 100 requests (p99) takes 90 ms, over the 74 ms target.",
    },
    chat: {
      why: "The chat servers hold the rules: they save the message, look up who is online and hand the alert job to the queue. Three small servers in two zones are 56% busy at peak, so waiting stays short and one zone going down leaves the service up.",
      checks: ["store", "presence", "alert", "capacity", "p99", "cache-dies-p99", "availability"],
      without: "With two chat servers each is 83% busy, p99 is 147 ms (target 74 ms) and 151 ms while the cache is down (target 120 ms). With all three in one zone, availability falls to 99.88%, under the 99.9% target.",
    },
    cache: {
      why: "The cache holds who is online and the latest messages of busy chats in memory. At a 90% hit rate it answers 3,600 of the 4,000 requests a second itself, so the message store sees only 400 a second and answers faster. Two zones keep the cache up if one zone fails.",
      checks: ["presence", "p99", "cache-dies", "cache-dies-p99", "availability"],
      without: "With no cache, an online dot cannot be read at all (the presence check fails) and every request asks the store: p99 is 76 ms against the 74 ms target. With the cache in one zone only, availability falls to 99.78%.",
    },
    store: {
      why: "The message store keeps every message. Two small nodes in two zones carry 8,000 requests a second. They are 5% busy while the cache works, and still only 50% busy if the cache stops and all 4,000 arrive.",
      checks: ["store", "cache-dies", "cache-dies-p99", "availability"],
      without: "With one small node, a stopped cache puts all 4,000 requests a second on a node that carries 4,000, so it is 100% busy and p99 is 400 ms (target 120 ms). With both nodes in one zone, availability falls to 99.88%.",
    },
    q: {
      why: "Every request leaves an alert job in the queue, and the queue holds each job until a worker sends it. The chat servers never wait for an alert, and no alert is lost while the workers are away. The queue is priced per message, so at $0.59 an hour it is the most expensive part.",
      checks: ["alert", "worker-dies"],
      without: "With no queue there is nowhere for alerts to wait. The alert check fails, and in the 60 seconds the worker is down 240,000 alerts are lost.",
    },
    w: {
      why: "Three workers take alert jobs from the queue and send them. They handle 7,200 a second, so after the 4,000 new alerts a second they have 3,200 a second to spare. The 240,000 alerts that wait during a 60 second outage clear in 75 seconds.",
      checks: ["alert", "worker-dies"],
      without: "One worker handles 2,400 alerts a second while 4,000 arrive, so the waiting alerts never clear. Two workers have only 800 a second to spare and take 300 seconds, over the 120 second limit. A fourth worker passes but costs $2.24 an hour, over the $2.20 budget.",
    },
  },
};
