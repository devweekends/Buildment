import type { HldLabSpec } from "../types";
import { productSearchSolution } from "./solution";

export const hldVisualProductSearch: HldLabSpec = {
  slug: "hld-visual-product-search",
  family: "hld",
  title: "Design a product search box (search and typeahead)",
  purpose:
    "Build a marketplace search box from parts, press Run, and see whether it returns products, serves suggestions and gets a seller's change into the index, and whether it keeps doing so when an app server, a search node or the indexing worker dies.",
  limits:
    "A simplified model, not a real search engine. Times are in model milliseconds, the cache is always warm, and prices are made up to compare designs. The board sends the same load down every branch, so it cannot show ranking quality, stale results between copies of the index, or that suggestions never touch the index. There is no code lab for this design yet.",
  hints: [
    "Run the starting design first. It returns products, but read which checks fail and why.",
    "The search index is the busiest and most expensive part. Each node answers a fixed number of lookups a second, so more load needs more nodes (copies). A dead node leaves the others to carry its share.",
    "Suggestions come from a cache, not from the index. The cache also takes reads off the product database.",
    "A queue holds product changes while the indexing worker is away. Workers must be fast enough, once back, to clear the waiting changes as well as the new ones.",
    "Spare machines cost money. Add the extra machine only where a check asks for it.",
  ],
  allowedComponents: ["client", "load-balancer", "app-server", "cache", "search", "database", "queue", "worker"],
  startingBoard: {
    nodes: [
      { id: "client", kind: "client", x: 0, y: 0 },
      { id: "lb", kind: "load-balancer", x: 0, y: 1, props: { size: "general-small", zones: 1 } },
      { id: "app", kind: "app-server", x: 0, y: 2, props: { size: "compute-small", count: 1 } },
      { id: "search", kind: "search", x: 0, y: 3, props: { size: "memory-small", count: 1 } },
      { id: "db", kind: "database", x: 1, y: 3, props: { size: "memory-small", readRatio: 0.95 } },
    ],
    edges: [
      { from: "client", to: "lb" },
      { from: "lb", to: "app" },
      { from: "app", to: "search" },
      { from: "app", to: "db" },
    ],
  },
  scenario:
    "Sale night: 2,000 lookups a second at the busiest moment (searches and suggestion calls together), and sellers are re-pricing so fast that about as many product changes a second must reach the index.",
  levels: [
    { id: "l1", load: 2_000, targets: { rps: 2_000, p99Ms: 130, availability: 0.9995, budgetPerHour: 3.0 } },
  ],
  solution: productSearchSolution,
  challenge: {
    peakLoad: 2_000,
    scenarios: [
      { id: "lose-app", title: "An app server dies", story: "One app server stops. The load balancer sends its share to the others.", faults: [{ type: "lose-instance", role: "compute" }] },
      { id: "lose-search", title: "A search node dies", story: "One node of the search index stops. The other nodes answer its share.", faults: [{ type: "lose-instance", role: "search" }] },
      { id: "lose-indexer", title: "The indexing worker dies", story: "Searches carry on. Product changes wait in the queue to be indexed.", faults: [{ type: "down", role: "worker" }] },
    ],
    checks: [
      { type: "path", id: "search", kind: "functional", label: "A search returns products", chain: ["client", "compute", "search"], target: "a query reaches the index: client > app server > search" },
      { type: "path", id: "suggest", kind: "functional", label: "A suggestion is served as you type", chain: ["client", "compute", "cache"], target: "a prefix is answered from memory: client > app server > cache" },
      { type: "path", id: "details", kind: "functional", label: "Results show full product details", chain: ["client", "compute", "database"], target: "the app server can read the product from the database (the cache is optional)" },
      { type: "path", id: "index-update", kind: "functional", label: "A product change reaches the index", chain: ["client", "compute", "queue", "worker", "search"], target: "a change is indexed: app server > queue > worker > search" },
      { type: "metric", id: "capacity", kind: "non-functional", label: "Serves the whole peak", scenario: "steady", metric: "capacity", op: ">=", value: 2_000 },
      { type: "metric", id: "p99", kind: "non-functional", label: "Slowest 1 in 100 searches is fast enough (p99)", scenario: "steady", metric: "p99", op: "<=", value: 130 },
      { type: "metric", id: "app-dies", kind: "non-functional", label: "Everyone is still served when one app server dies", scenario: "lose-app", metric: "served", op: ">=", value: 0.999 },
      { type: "metric", id: "search-dies", kind: "non-functional", label: "Everyone is still served when a search node dies", scenario: "lose-search", metric: "served", op: ">=", value: 0.999 },
      { type: "metric", id: "search-dies-p99", kind: "non-functional", label: "Slowest 1 in 100 while a search node is down (p99)", scenario: "lose-search", metric: "p99", op: "<=", value: 160 },
      { type: "drain", id: "indexer-dies", kind: "non-functional", label: "No product change is lost when the indexing worker dies", outageSeconds: 30, maxDrainSeconds: 30, items: "product changes", done: "indexed" },
      { type: "metric", id: "availability", kind: "non-functional", label: "Stays up (availability)", scenario: "steady", metric: "availability", op: ">=", value: 0.9995 },
      { type: "metric", id: "cost", kind: "non-functional", label: "Cost per hour", scenario: "steady", metric: "cost", op: "<=", value: 3.0 },
    ],
  },
};
