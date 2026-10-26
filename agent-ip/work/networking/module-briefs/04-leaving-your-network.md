---
artifact: module-brief
course: networking
module: 04-leaving-your-network
version: 2
owner: curriculum-architect
roadmap_version: 3.1
roadmap_confirmed: true
agent_ip_version: 0.5.3
---

# Module 04: Leaving your network: gateways and routes

Source of truth: `02-curriculum-roadmap.md` v3.1, module 4. Core 335 min, slow path 425 min. Source IDs such as [S30] point to `01-research-dossier.md`.

## Outcome

By the end the learner can:
1. Run a trace on their own computer, read it line by line, and say which hops they can and cannot explain (4.1, 4.10).
2. Predict the next-hop MAC for a local and a remote destination, and see the MAC change at every hop while the IP stays (4.2).
3. Pick the route for any destination by longest prefix, then metric, with connected and default routes included, by hand and in code (4.3, 4.6).
4. Explain TTL, ICMP Time Exceeded, why traceroute works and why some hops show `* * *` (4.4).
5. Explain that the internet is many networks that announce address blocks (4.5).
6. Build a router from namespaces, capture the MAC change, and fix a wrong mask, a wrong gateway and a missing return route (4.7, 4.8).

This module carries outcome O4 (with module 5) and part of O7. Challenge 2 is its build evidence.

## Why this module exists

Module 3 ended with a packet that stays on one network. A learner who stops there cannot say what happens when it leaves, and cannot answer the course question ("none of my devices has a public address, so how do they reach the internet?"). NAT is a router doing one extra job, so the learner must first own the plain router: gateway, routing table, TTL, forwarding. Modules 6 and 8 reuse the router from 4.7. Lab 4.8 trains the first "find the broken hop" habit that module 7 and the capstone depend on.

## Prerequisites

Entry: module 3 finished and challenge 1 done (a working lab shell from 1.2, a virtual cable from 1.4). Netlab slice 1 must be shipped (decision 2).

| Needs | From | Used in |
|---|---|---|
| own-addresses (your address versus the one the world sees) | 1.1 | 4.1, 5.1 |
| namespaces-veth, ping-icmp, read-capture (`tcpdump -n -v`) | 1.4 | 4.4, 4.7 |
| mac-address, packet-fields | 1.5, 1.6 | 4.2 |
| cidr, address-kinds (private versus public), nat-first-look | 2.3, 2.4 | 4.1, 4.3 |
| js-bitops (`>>> 0`) | 2.5 | 4.6 |
| subnet-calc (address AND mask) | 3.2 | 4.2, 4.8 |
| arp, why-split | 3.3, 3.4 | 4.2 |
| route-idea, ping-errors ("Network is unreachable" versus silent loss) | 3.9 | 4.2, 4.8 |

## Chapters

Totals: 10 chapters: 2 Read (4.1, 4.5), 3 Learn (4.2 to 4.4), 1 Code, 1 Build, 1 Lab, 1 Check, 1 Gate. Check file: `04.09-routing-quiz.md`.

| # | Chapter | Type | Min | Outcome | Requires | Introduces | Evidence |
|---|---|---|---|---|---|---|---|
| 4.1 | A dozen hops to a website | Read | 15 | Run a trace on your own computer (not in the lab), read it line by line, and mark what you cannot explain yet; a sourced sample trace is provided if yours shows only `* * *` | own-addresses | read-trace | own trace annotated |
| 4.2 | The default gateway | Learn | 35 | Predict the next-hop MAC for a local and a remote destination, and see the MAC change at every hop while the IP stays | arp, route-idea | default-gateway, mac-per-hop | netlab check |
| 4.3 | Routing tables and longest prefix match | Learn | 40 | Pick the route for any destination (longest prefix first, then the metric for a tie, connected routes included) and check it with `ip route get` | default-gateway, cidr | lpm | netlab check |
| 4.4 | TTL, ICMP and traceroute | Learn | 35 | Explain TTL, ICMP Time Exceeded, how `ping` and traceroute use ICMP, and why some hops show `* * *` (a router that does not answer, or a filter) | lpm, ping-icmp | ttl-icmp | netlab check |
| 4.5 | Networks of networks | Read | 15 | Explain, from one diagram, that the internet is many independently run networks, each a group of address blocks with one routing policy (an autonomous system, RFC 1930), that announce which addresses they can reach, and what happens to traffic when an announcement disappears | lpm | autonomous-systems | none (read) |
| 4.6 | Code: longest prefix match | Code | 40 | Implement a routing table lookup with a default route and a metric tie rule | lpm, js-bitops | none | graded code tests |
| 4.7 | Build a router | Build | 75 | Two subnets and a router namespace: turn on forwarding, add routes, ping across (mid-point check: each side reaches its own router), capture the MAC change on both sides | default-gateway, lpm, namespaces-veth | ip-forwarding | challenge 2 tests and captures |
| 4.8 | Lab: fix the broken office | Lab | 40 | Find three faults (a wrong mask, a wrong gateway, a missing return route) by running commands in the lab and reading their output, then fix them | lpm, ping-errors, ip-forwarding | diagnose-routing | graded lab checks |
| 4.9 | Routing | Check | 15 | Choose routes and predict each hop's addresses in three situations; two questions from module 3 | lpm, ttl-icmp | none | quiz |
| 4.10 | Your traceroute, explained | Gate | 25 | Explain the hops you can; for each you cannot, write the question and what you would check | read-trace, ttl-icmp | none | trace explanation |

Budgets for every chapter below (agent-ip v0.5.3, sponsor decision at G2C, 2026-10-26): Learn and Read follow the beats rules (Learn: four to eight beats, at most 70 visible words per beat, 300 to 700 visible words and at least 900 with `GoDeeper` folds, at least one playable beat, no BigWordAlert; Read: one or two beats); Build at least 1,200 prose words; Code, Lab and Gate at least 700; Check is quiz-only. Build, Code, Lab, Check and Gate chapters keep at most 6 top-level components and 25 JSX tags (cap `GlossaryTerm` at 10 per chapter); Learn chapters at most 40 JSX tags; at most 3 assessment interactions in all. Every diagram has a text legend.

## Chapter blocks

**4.1 A dozen hops to a website** (Read; reinforces address-kinds)
- Hook: the module's opening question: a dozen machines touch your packet, how does each know where to send it next? (The roadmap gives no separate "Problem first" for this Read.) Claim: a trace is the module's map: every line you cannot explain is a question the next nine chapters answer.
- Example: a recorded sample trace of about 9 lines from the orchestrator's host run (dossier 5.5: two private home routers, then a private `10.x` hop inside the provider, then public hops). Public hops are rewritten to `198.51.100.x` and `203.0.113.x` and labelled as rewritten. Learners classify hops with 2.4 (private, shared, public).
- Format (agent-ip v0.5.3): `format: beats`, 2 beats (a Read chapter has one or two); at most 70 visible words per beat; depth and the worked example go in `GoDeeper` folds; the commands the chapter asks the learner to run stay as code fences; no BigWordAlert (terms use `GlossaryTerm`). The hook and claim above stay as the chapter's opening lines.
- Beats:
  1. **A dozen machines touch your packet** (fixed picture). MermaidDiagram `mmd-4-1-sample-trace` (inline, no registration). Shows: a recorded sample trace of about nine hops: two private home routers, a private provider hop, then public hops rewritten to documentation ranges.
  2. **Run it on your own computer** (fixed picture). VisualDiagram `net-m4-trace-annotated` (annotated picture of real outputs). Shows: tracert -d (Windows) and traceroute -n (macOS, Linux) outputs annotated, expected output printed for phone readers, with a note on which side to type on (your computer, not the lab). Learner: runs a trace and marks each hop private, public or unknown.
- Assessments: no PREDICT or QUIZ; the evidence is a Checklist.
- Components: GlossaryTerm (private address, public address, hop); 1 Callout; LearningObjectives; Checklist; one `GoDeeper` fold per beat; about 10 of 40 JSX tags; 0 of 3 assessments.
- Near miss: Running it in the lab container shows `172.17.0.1` then the destination only (dossier 5.5): say which side to type on. An all-`* * *` trace is normal on some networks: use the sample. Public hops in the sample are rewritten to `198.51.100.x` and `203.0.113.x` and labelled as rewritten. A trace shows the learner's provider path: tell them to scrub public hops before posting.

**4.2 The default gateway** (Learn; reinforces subnet-calc)
- Hook: your packet for a site abroad is addressed to the site's IP but to your router's MAC. Why both? Claim: the IP pair says where the packet is going end to end; the MAC pair says who takes it on this one link, and ARP only reaches the local link, so off-subnet packets go to the gateway's MAC.
- Example: laptop `192.168.1.23/24` to server `203.0.113.80` via home router R1 (`192.168.1.1` inside, `198.51.100.2` outside) and provider router R2 (`198.51.100.1`, `203.0.113.1`). The mask test from 3.2 says "not on my subnet". Three frames: IPs never change; the MAC pair changes on each link. Contrast with a neighbour at `192.168.1.40`: destination MAC is the neighbour's.
- Format (agent-ip v0.5.3): `format: beats`, 5 beats; at most 70 visible words per beat, 300 to 700 visible words in all and at least 900 with the `GoDeeper` folds (the claim and worked example above are spread over the beats and their folds); one visual per beat; at least one playable beat; at most 40 JSX tags and 3 assessment interactions; no BigWordAlert (terms use `GlossaryTerm`). The hook above is the chapter's one or two opening sentences.
- Beats:
  1. **A neighbour gets its own MAC** (playable). InteractiveCanvas `net-m4-mac-local` (`[netlab]`). Shows: the frame to 192.168.1.40 carries the neighbour's MAC as destination. Learner: send a packet to a neighbour and inspect the link.
  2. **A far site gets the router's MAC** (playable). InteractiveCanvas `net-m4-mac-remote` (`[netlab]`). Shows: the packet to 203.0.113.80 carries the server's IP but the router's MAC. Learner: send a packet to the server and inspect the link.
  3. **ARP only reaches the local link** (fixed picture). MermaidDiagram `mmd-4-2-arp-scope` (inline, no registration). Shows: the mask test says not on my subnet, ARP cannot ask the far server, so the laptop asks for the gateway's MAC.
  4. **The MACs change at every hop** (playable). InteractiveCanvas `net-m4-mac-per-hop` (`[netlab]`). Shows: laptop to R1 to R2 to server with the inspector on every link: the MAC pair changes on each link. Learner: tap each link to read its source and destination MAC.
  5. **The IP addresses never change** (fixed picture). MermaidDiagram `mmd-4-2-ip-constant` (inline, no registration). Shows: the same source and destination IP on every edge, a different MAC pair on each.
- Predict (right before beat 4, "The MACs change at every hop"): On the link between R1 and R2, is the destination MAC the server's, R2's or R1's? Options: the server's / R2's / R1's. Answerable from: beats 1 and 2 have shown that the destination MAC is the next device on this link; the picture of the first hop makes the second a pattern.
- Quick check (after the last beat): (1) A local and a remote destination: pick the destination MAC for each (taught in beats 1 and 2).
- Components: GlossaryTerm (default gateway, next hop, MAC address); 1 Callout; one `GoDeeper` fold per beat; about 14 of 40 JSX tags; 2 of 3 assessments.
- Near miss: A real home router also rewrites the source IP (NAT); say this path has none and module 6 breaks the rule on purpose. Path: laptop `192.168.1.23/24`, R1 (`192.168.1.1` inside, `198.51.100.2` outside), R2 (`198.51.100.1`, `203.0.113.1`), server `203.0.113.80`. The mask test from 3.2 says 'not on my subnet'.

**4.3 Routing tables and longest prefix match** (Learn; reinforces read-trace)
- Hook: a router at your provider could have routes for `10.0.0.0/8`, `10.1.0.0/16` and a default. A packet for `10.1.2.3` arrives. Which wins, and why not the first listed? Claim: the router picks the most specific matching route, so a longer prefix beats a shorter one regardless of order; the default (`0.0.0.0/0`) matches everything and loses to anything else [S30, S32].
- Example: table `10.0.0.0/8 via 198.51.100.1`, `10.1.0.0/16 via 198.51.100.5`, `default via 198.51.100.9`, connected `192.168.1.0/24`. Destinations: `10.1.2.3` (the /16), `10.2.2.3` (the /8), `203.0.113.80` (default), `192.168.1.40` (connected), and a tie of two /16 rows with metrics 100 and 200 (lower wins).
- Format (agent-ip v0.5.3): `format: beats`, 7 beats; at most 70 visible words per beat, 300 to 700 visible words in all and at least 900 with the `GoDeeper` folds (the claim and worked example above are spread over the beats and their folds); one visual per beat; at least one playable beat; at most 40 JSX tags and 3 assessment interactions; no BigWordAlert (terms use `GlossaryTerm`). The hook above is the chapter's one or two opening sentences.
- Beats:
  1. **A router keeps a table of routes** (playable). InteractiveCanvas `net-m4-route-table` (`[netlab]`). Shows: connected 192.168.1.0/24, 10.0.0.0/8, 10.1.0.0/16 and a default route, each with a next hop. Learner: tap a row to see the next hop and interface.
  2. **Several rows can match one address** (playable). InteractiveCanvas `net-m4-route-matches` (`[netlab]`). Shows: 10.1.2.3 matches the /8, the /16 and the default; the matching rows light up. Learner: type a destination and see which rows match.
  3. **The longest prefix wins** (playable). InteractiveCanvas `net-m4-route-longest` (`[netlab]`). Shows: the /16 beats the /8 and the default for 10.1.2.3; a /32 host route would beat a /24. Learner: send packets to five destinations and see the chosen row.
  4. **List order never decides** (playable). InteractiveCanvas `net-m4-route-reorder` (`[netlab]`). Shows: the same table in another order picks the same row. Learner: drag rows into a different order.
  5. **Same length: the lower metric wins** (playable). InteractiveCanvas `net-m4-route-metric` (`[netlab]`). Shows: two /16 rows with metrics 100 and 200; 100 wins. Learner: change a metric and watch the choice.
  6. **Connected routes and the default** (playable). InteractiveCanvas `net-m4-route-default` (`[netlab]`). Shows: a connected route for 192.168.1.40 and the default route for 203.0.113.80. Learner: send to each and read the row.
  7. **Ask the system: ip route get** (playable). InteractiveCanvas `net-m4-route-get` (`[netlab]`). Shows: the output of ip route get for each destination, generated from the model's state. Learner: run the command for a destination.
- Predict (right before beat 3, "The longest prefix wins"): A packet for 10.1.2.3 arrives. Which row wins: the first listed (the /8), the /16, or the default? Options: the /8, it is listed first / the /16 / the default. Answerable from: beat 2 has just shown that three rows contain the address, 2.3 and 3.6 taught that a /16 sits inside a /8 and is more specific; no routing rule is assumed.
- Quick check (after the last beat): (1) A /32 host route and a /24 both match: which wins (taught in beats 3 and 6). (2) Two rows of equal prefix length with different metrics: which wins (taught in beat 5).
- Components: GlossaryTerm (routing table, longest prefix match, metric, default route); 1 Callout; one `GoDeeper` fold per beat; about 19 of 40 JSX tags; 3 of 3 assessments.
- Near miss: Reading the table top to bottom (the /8 is listed first on purpose). 'First listed wins a full tie' is the 4.6 exercise rule, not a router fact. A trace never shows a router's table, so the hook uses a plausible provider router and does not claim it is one the learner can see. Cite RFC 1812, not the `ip route` man page, for longest prefix [S30, S32]. Table: `10.0.0.0/8 via 198.51.100.1`, `10.1.0.0/16 via 198.51.100.5`, `default via 198.51.100.9`, connected `192.168.1.0/24`.

**4.4 TTL, ICMP and traceroute** (Learn; reinforces read-trace)
- Hook: routers do not tell anyone they forwarded your packet. So how does traceroute learn their addresses? Claim: each router lowers TTL by at least one and, at zero, drops the packet and (for unicast) sends ICMP Time Exceeded from its own address; traceroute sends probes with TTL 1, 2, 3 and reads those replies [S30, S29, S31].
- Example: the 4.2 path. Probe 1 (TTL 1) dies at R1, reply from `192.168.1.1`; probe 2 dies at R2, reply from `198.51.100.1`; probe 3 reaches `203.0.113.80`. Linux default TTL is 64 [S28], so the server sees 62 (derived; capture untested). One router set silent gives `* * *`.
- Format (agent-ip v0.5.3): `format: beats`, 6 beats; at most 70 visible words per beat, 300 to 700 visible words in all and at least 900 with the `GoDeeper` folds (the claim and worked example above are spread over the beats and their folds); one visual per beat; at least one playable beat; at most 40 JSX tags and 3 assessment interactions; no BigWordAlert (terms use `GlossaryTerm`). The hook above is the chapter's one or two opening sentences.
- Beats:
  1. **TTL is a countdown in every packet** (playable). InteractiveCanvas `net-m4-ttl-countdown` (`[netlab]`). Shows: TTL 64 drops by one at every router; at 0 the packet is discarded. Learner: set the starting TTL and send.
  2. **At zero the router reports back** (playable). InteractiveCanvas `net-m4-time-exceeded` (`[netlab]`). Shows: the router that discards the packet sends ICMP Time Exceeded from its own address. Learner: send TTL 1 and read the reply's source.
  3. **Traceroute sends TTL 1, 2, 3** (playable). InteractiveCanvas `net-m4-traceroute-probes` (`[netlab]`). Shows: probe 1 dies at R1, probe 2 at R2, probe 3 reaches the server; each reply names the device that stopped it. Learner: send the three probes in turn.
  4. **The reply comes from who stopped it** (fixed picture). MermaidDiagram `mmd-4-4-reply-source` (inline, no registration). Shows: sequence of laptop, R1, R2, server with the three probes and their replies.
  5. **A silent router shows * * *** (playable). InteractiveCanvas `net-m4-silent-router` (`[netlab]`). Shows: R2 set to stay silent: line 2 shows * * * while line 3 still answers. Learner: toggle R2's silence and re-run.
  6. **Stars do not mean the path is broken** (fixed picture). MermaidDiagram `mmd-4-4-stars-meaning` (inline, no registration). Shows: a router that did not answer, or a filter, versus a path that is down (later hops answered).
- Predict (right before beat 5, "A silent router shows * * *"): R2 is set to stay silent. What does line 2 of the trace show? Options: R2's address / * * * / the server's address. Answerable from: 4.1 showed what * * * look like in a real trace, and beats 2 and 3 showed that a reply names the device that stopped the probe; a silent device has nothing to name.
- Quick check (after the last beat): (1) Which device's address is on line N of a trace (taught in beat 4).
- Components: GlossaryTerm (TTL, ICMP, hop); 1 Callout; MustRead (traceroute(8) [S31], in a fold; afterwards the learner can say which protocol it sends by default); one `GoDeeper` fold per beat; about 17 of 40 JSX tags; 2 of 3 assessments.
- Near miss: `* * *` means that router did not answer or a filter ate it, not that the path is broken (later hops answered). Do not claim IPv6 sends Time Exceeded from RFC 8200 alone [S2]. Cite RFC 1812, not RFC 792 ('may'), for the router duty [S30]. Linux default TTL is 64 [S28], so the server sees 62 after two routers (shown by dossier 5.8).

**4.5 Networks of networks** (Read)
- Hook (derived): your trace crossed networks run by different organisations. Who tells your router where `203.0.113.0/24` is? Claim: an autonomous system is a connected group of prefixes with one routing policy [S68]; networks announce which prefixes they reach; if an announcement disappears, other routers lose the row and traffic to those addresses fails.
- Example: networks A, B, C (fictional). C owns `203.0.113.0/24` and announces it to B; B passes it to A; A gets the row "via B". C withdraws it and A's row vanishes. Real case: Cloudflare's 1.1.1.1 prefixes were withdrawn by a configuration error on 14 July 2025 [S50]; say "about an hour", no minute-level figures until a reviewer approves (dossier open question 10). Facebook 2021 is kept for 7.4.
- Format (agent-ip v0.5.3): `format: beats`, 2 beats (a Read chapter has one or two); at most 70 visible words per beat; depth and the worked example go in `GoDeeper` folds; the commands the chapter asks the learner to run stay as code fences; no BigWordAlert (terms use `GlossaryTerm`). The hook and claim above stay as the chapter's opening lines.
- Beats:
  1. **Networks announce what they can reach** (fixed picture). MermaidDiagram `mmd-4-5-announcements` (inline, no registration). Shows: C owns 203.0.113.0/24 and announces it to B; B passes it to A; A learns the row 'via B'.
  2. **When an announcement disappears** (fixed picture). MermaidDiagram `mmd-4-5-withdrawal` (inline, no registration). Shows: C withdraws the prefix, A's row vanishes and traffic to those addresses fails; Cloudflare 1.1.1.1 on 14 July 2025 is the real case.
- Quick check (after the last beat): (1) What does A do with traffic for 203.0.113.0/24 after the withdrawal (taught in beat 2).
- Components: GlossaryTerm (autonomous system, announcement); 1 Callout; RealWorldEvent (Cloudflare 2025); one `GoDeeper` fold per beat; about 8 of 40 JSX tags; 1 of 3 assessments.
- Near miss: No BGP configuration or internals. No AS numbers until RFC 5398 (documentation AS range) is added to the dossier. Say 'about an hour' for the Cloudflare event, no minute-level figures until a reviewer approves (dossier open question 10). Facebook 2021 is kept for 7.4. The diagram must not suggest a learner's router runs BGP. Autonomous system is a connected group of prefixes with one routing policy [S68].

**4.6 Code: longest prefix match** (Code; see Code spec). Hook (derived): turn the table rule from 4.3 into a function. Claim: the lookup is three comparisons in a fixed order. Near miss: in JavaScript `x << 32` equals `x << 0`, so a /0 mask built with a shift is wrong.

**4.7 Build a router** (Build; see Build spec). Hook (derived): two networks and nothing between them; your laptop reaches its own router but not the server. Claim: forwarding is off by default [S28], and a reply needs a route back, so both directions must be configured.

**4.8 Lab: fix the broken office** (Lab; see Lab spec). Hook (derived): three complaints, one network. Claim: diagnose by walking the path, one question per hop, not by guessing.

**4.9 Routing** (Check, 5 questions, one instrument). Q1: local versus remote, next-hop MAC. Q2: route choice with a metric tie and a connected route, then the next hop. Q3: a TTL 1 probe, whose address comes back. Together they cover the three situations. Q4 and Q5 from module 3: network address and same-subnet by hand; an ARP exchange. Near miss in the stems: no stem may repeat the 4.3 wording.

**4.10 Your traceroute, explained** (Gate; see Gate).

## Build spec: 4.7 Build a router (challenge 2, part 1)

- Support: gapped. Folder `challenges/challenge-2-router/part-1-router/` (names proposed): `README.md`, one script, `results.md`, `test.sh`.
- Topology (as run in dossier 5.5): namespaces `laptop` (`192.168.1.23/24`), `router` (`192.168.1.1/24` and `203.0.113.1/24`), `server` (`203.0.113.80/24`). No NAT in this chapter.
- Gaps: (1) the laptop's default route via `192.168.1.1`; (2) `net.ipv4.ip_forward=1` in the router namespace; (3) the server's route back to `192.168.1.0/24` via `203.0.113.1` (tested effect: dossier 5.6). Tests name the failing gap.
- Mid-point check: laptop pings `192.168.1.1`, server pings `203.0.113.1`.
- Must pass: `ping -c2 -W1 203.0.113.80` from the laptop; `traceroute -n 203.0.113.80` shows `192.168.1.1` then the server (tested, dossier 5.5).
- Must fail: `ping -c1 -W1 198.51.100.7` from the laptop prints "Destination Net Unreachable" from `192.168.1.1` (the router has no default route; tested, dossier 5.7).
- Capture to commit in `results.md`: `tcpdump` on the router's two interfaces for one ICMP echo, annotated with which MAC changed. Needs `-e`, which is untested, verify at G3. Also expect TTL 64 then 63 with `-v` (untested).
- Hint ladder: (1) "A ping that arrives on one router interface and never leaves the other means the router is not forwarding." (2) name the sysctl; (3) the command with the namespace name left blank.
- If you are stuck: do both sides reach their own router? Is `sysctl net.ipv4.ip_forward` 1 in the router namespace? Does `ip route` on the server show the way back? Run `tcpdump` on both router interfaces and find where the echo stops.
- Slow path 110 min. Restore point: `toolkit/restore.sh 2.1`. Phone-only path: the recorded run as a replay.

## Lab spec: 4.8 Lab: fix the broken office

Mode fault, three independent faults, checks pass or fail. Commands the generator must print: `ping`, `ip route`, `ip neigh`, `traceroute`, plus the inspector.
- Wrong mask: one side gets "Network is unreachable" at once, the other silent loss (tested, dossier 5.7).
- Wrong gateway (an address nobody owns): ARP requests go unanswered, silent loss (tested for an on-link address nobody owns, dossier 5.7).
- Missing return route: requests arrive, replies have no way back, silent loss for the sender; found with `ip route` on the far side and the inspector. Untested as a ping symptom, verify at G3 before the generator is written.
- Fallback if slice 1 is late: the lab is blocked; use diagnosis from recorded command output, graded as a quiz.

## Code spec: 4.6

- Signature: `export function lookup(routes, destination)`. `routes` is an array of `{prefix, length, nextHop, metric}`; `prefix` and `destination` are dotted strings; `nextHop` is a string, or `null` for a connected route. Returns the chosen route object, or `null` when nothing matches.
- Rule: longest `length` wins, then lowest `metric`, then first listed. A `0.0.0.0/0` row is the default.
- Edge cases: `/0`, `/32`, prefix with host bits set (mask it first), invalid destination throws `Error("invalid address")` (reuse the 2.5 rules). Helper `ipToNumber` may be given in the starter; the 3.7 helper unlocks after three failed attempts.
- Tests: /16 beats /8; default used when nothing else matches; no match and no default gives `null`; metric breaks an equal-length tie; list order breaks a full tie; connected route (null next hop) returned; /32 beats /24; /0 row with a destination of `255.255.255.255`; invalid destination throws. At least one test is a failure mode (the /0 shift bug).

## Interactions

Updated for agent-ip v0.5.3 (Learn chapters are visual-first beats). Per-chapter beats, predicts and quizzes are in each chapter block above and, with the density counts, in `interaction-map.yaml`. Counting rules from `audit-course.mjs`: a tag is any opening `<Component`; child tags (Step, TerminalLine, CompareColumn, TraceStep) count toward the total but not toward the 6 top-level names; quiz, predict and openquestion fences are free of tags and count as assessments; command output goes in plain code fences, not TerminalBlock.

Budgets by chapter type (sponsor decision at G2C, 2026-10-26, and `03-authoring-standards.md` → Visual-first Learn chapters):

- Learn: beats rules. Four to eight beats, one visual each, at most 70 visible words per beat, 300 to 700 visible words and at least 900 with `GoDeeper` folds, at least one playable beat, at most 40 JSX tags, at most 3 assessment interactions (one Predict before the key beat, one or two quiz questions at the end), no BigWordAlert.
- Read: one or two beats, at most 70 visible words each, depth in folds, no BigWordAlert.
- Build: at least 1,200 prose words; at most 6 top-level components and 25 JSX tags; a diagram; at most one BigWordAlert and only for a load-bearing term.
- Code, Lab and Gate: at least 700 prose words; same component and tag limits as Build; a Gate has no canvas and no new content.
- Check: quiz-only (three to five questions, one instrument), no canvas, no lesson text.

| Ch | Format | Components | JSX tags (est.) | Assessments | Text budget |
|---|---|---|---|---|---|
| 4.1 | beats (2) | 2 beat visuals (diagrams), GoDeeper x2, GlossaryTerm x3, Callout x1, LearningObjectives, Checklist | 10 | none | one or two beats, at most 70 words each |
| 4.2 | beats (5) | 5 beat visuals (3 canvas, 2 diagram), GoDeeper x5, GlossaryTerm x3, Callout x1 | 14 | PREDICT, QUIZ | at most 70 words a beat; 300 to 700, 900+ with folds |
| 4.3 | beats (7) | 7 beat visuals (canvases), GoDeeper x7, GlossaryTerm x4, Callout x1 | 19 | PREDICT, QUIZ x2 | at most 70 words a beat; 300 to 700, 900+ with folds |
| 4.4 | beats (6) | 6 beat visuals (4 canvas, 2 diagram), GoDeeper x6, GlossaryTerm x3, Callout x1, MustRead (in a fold) | 17 | PREDICT, QUIZ | at most 70 words a beat; 300 to 700, 900+ with folds |
| 4.5 | beats (2) | 2 beat visuals (diagrams), GoDeeper x2, GlossaryTerm x2, Callout x1, RealWorldEvent | 8 | QUIZ | one or two beats, at most 70 words each |
| 4.6 | prose | codeexercise, MermaidDiagram, Callout | 5 | CODE | 700 prose words |
| 4.7 | prose | Steps, FileTree, MermaidDiagram, Callout, InteractiveCanvas (replay), Checklist | 18 | none | 1,200 prose words |
| 4.8 | prose | InteractiveCanvas (lab), MermaidDiagram, Checklist | 5 | lab checks | 700 prose words |
| 4.9 | prose | none | 0 | QUIZ x5 | quiz only |
| 4.10 | prose | Checklist, LearningLog, ChapterRecap, openquestion | 4 | OPEN_QUESTION | 700 prose words |

`LearningObjectives` in 4.1, `ChapterRecap` in 4.10. One MustRead (traceroute(8)) in a 4.4 fold; one RealWorldEvent (Cloudflare 2025) in a 4.5 fold.

Diagram plan: Beat diagrams: the sample trace (4.1), ARP scope and constant IPs (4.2), the reply source and what stars mean (4.4), announcements and withdrawal (4.5). Build and Lab chapters each get one Mermaid diagram (4.6 lookup order; 4.7 the three-namespace topology; 4.8 the walk-the-path method), added in this revision because the audit requires a diagram in every chapter that is not a Check or Gate. Every diagram has a text legend.

Changes to the earlier plan in this revision (interaction designer, G3):

- 4.6: Added a MermaidDiagram and dropped TerminalBlock: the audit requires a diagram in every chapter that is not a Check or Gate, and command output goes in plain code fences.
- 4.7: Added a MermaidDiagram (audit: a diagram in every chapter that is not a Check or Gate) and dropped TerminalBlock (command output goes in plain code fences) to stay at six top-level components.
- 4.8: Added a MermaidDiagram (audit: a diagram in every chapter that is not a Check or Gate).

## Canvases

Canvas decisions (interaction designer, G3):

- Gateway, routing table and TTL behaviour are the module's causal model, so 4.2, 4.3 and 4.4 use `[netlab]` host, switch, router and inspector (slice 1) in beat mode, one beat per claim; Mermaid carries only fixed relationships (ARP scope, constant IPs, reply source, stars).
- 4.5 stays a static diagram (roadmap): reachability learned from announcements is a fixed relationship and no honest model of BGP is in scope.
- 4.7 keeps a `[replay]` in a phone-only section; 4.8 is a graded `[netlab]` fault-mode lab (`net-lab-fix-office`).
- 4.1 uses a Mermaid hop strip and an annotated command picture; the trace itself is the learner's own computer.

Slugs follow the registry convention `net-m<module>-<name>` (graded labs keep `net-lab-`) and are proposed: none is written into a chapter until it is built and registered. The full registry with modes and chapters is in `interaction-map.yaml`. Fallbacks are named per chapter below the table.

| Slug (proposed) | Renderer | Chapter, beat | Mode | What it shows |
|---|---|---|---|---|
| `net-m4-mac-local` | [netlab] | 4.2, beat 1 | playable | the frame to 192.168.1.40 carries the neighbour's MAC as destination |
| `net-m4-mac-remote` | [netlab] | 4.2, beat 2 | playable | the packet to 203.0.113.80 carries the server's IP but the router's MAC |
| `net-m4-mac-per-hop` | [netlab] | 4.2, beat 4 | playable | laptop to R1 to R2 to server with the inspector on every link: the MAC pair changes on each link |
| `net-m4-route-table` | [netlab] | 4.3, beat 1 | playable | connected 192.168.1.0/24, 10.0.0.0/8, 10.1.0.0/16 and a default route, each with a next hop |
| `net-m4-route-matches` | [netlab] | 4.3, beat 2 | playable | 10.1.2.3 matches the /8, the /16 and the default; the matching rows light up |
| `net-m4-route-longest` | [netlab] | 4.3, beat 3 | playable | the /16 beats the /8 and the default for 10.1.2.3; a /32 host route would beat a /24 |
| `net-m4-route-reorder` | [netlab] | 4.3, beat 4 | playable | the same table in another order picks the same row |
| `net-m4-route-metric` | [netlab] | 4.3, beat 5 | playable | two /16 rows with metrics 100 and 200; 100 wins |
| `net-m4-route-default` | [netlab] | 4.3, beat 6 | playable | a connected route for 192.168.1.40 and the default route for 203.0.113.80 |
| `net-m4-route-get` | [netlab] | 4.3, beat 7 | playable | the output of ip route get for each destination, generated from the model's state |
| `net-m4-ttl-countdown` | [netlab] | 4.4, beat 1 | playable | TTL 64 drops by one at every router; at 0 the packet is discarded |
| `net-m4-time-exceeded` | [netlab] | 4.4, beat 2 | playable | the router that discards the packet sends ICMP Time Exceeded from its own address |
| `net-m4-traceroute-probes` | [netlab] | 4.4, beat 3 | playable | probe 1 dies at R1, probe 2 at R2, probe 3 reaches the server; each reply names the device that stopped it |
| `net-m4-silent-router` | [netlab] | 4.4, beat 5 | playable | R2 set to stay silent: line 2 shows * * * while line 3 still answers |
| `net-m4-replay-router` | replay | 4.7 (phone-only section) | replay | predict each command's output, then see the recorded result from the reference run |
| `net-lab-fix-office` | netlab (graded lab) | 4.8 | lab | fault mode: three independent faults (wrong mask, wrong gateway, missing return route), checks pass or fail |

Inline diagram beats (MermaidDiagram, VisualDiagram, TraceRequest; no registration): 4.1 beat 1 `mmd-4-1-sample-trace`; 4.1 beat 2 `net-m4-trace-annotated`; 4.2 beat 3 `mmd-4-2-arp-scope`; 4.2 beat 5 `mmd-4-2-ip-constant`; 4.4 beat 4 `mmd-4-4-reply-source`; 4.4 beat 6 `mmd-4-4-stars-meaning`; 4.5 beat 1 `mmd-4-5-announcements`; 4.5 beat 2 `mmd-4-5-withdrawal`.

Stated limits and fallbacks by chapter:

- 4.2: limit: Ethernet only (Wi-Fi frames differ), IPv4, two routers, no NAT. Fallback if not built: [sequence] laptop, home router, provider router, server, with a Predict before the key beat only, within the chapter's budget of 3 assessments (exception). Needs netlab slice 1.
- 4.3: limit: Static routes, one router, no routing protocols. Fallback if not built: [sequence] sender and router, table in the captions, Predict before the key beat only, within the chapter's budget of 3 assessments. Needs netlab slice 1.
- 4.4: limit: No ICMP rate limits, one path, UDP-style probes. Fallback if not built: [sequence] laptop, R1, R2, server. Needs netlab slice 1.
- Replays and labs: a replay falls back to a `[sequence]` of two actors (learner, lab) with Predict blocks before the key steps only, within the chapter's budget of 3 assessments; a graded lab that is blocked falls back to a diagnosis from recorded command output, graded as a quiz (roadmap).

4.5 uses static diagrams only. The replay sits in a 'phone-only path' section, so it does not follow a build that already proves the same thing for laptop learners. All netlab beats need slice 1 (decision 2).

## Gate: 4.10 Your traceroute, explained (25 min)

- Evidence: the learner's own trace from 4.1 explained, plus challenge 2 committed (`results.md` with the capture, `test.sh` passing). Review within three days; learners carry on while it waits.
- `openquestion` (the only one in the module): "Paste your trace (you may scrub public addresses). For each hop you can explain, say what it is and how you know. For each you cannot, write the question and what you would check." `minWords: 0`, `allowSpeechInput: true`, so a voice note or labelled diagram link can be submitted. Server-only rubric: at least three hops classified with address kinds; `* * *` explained as silence, not breakage; at least one honest open question with a concrete check; mentions TTL and Time Exceeded.
- Prose (at least 700 words, no new concepts): what a strong answer looks like, a model answer on the sample trace, two weak answers and why they fall short, a bridge to module 5. No canvas.
- `Checklist`: trace saved; challenge 2 committed; lab 4.8 passed; capture shows the MAC change. `LearningLog`: "Which line surprised you, and which rule (gateway, longest prefix, TTL) explains it?" `ChapterRecap`: gateway MAC versus destination IP; longest prefix wins; TTL and Time Exceeded; networks announce blocks; a router needs forwarding and a way back.

## Risks

- Likeliest stall: 4.7, forgetting the route back or forwarding, because the failure is silent (dossier 5.7). Mitigation: the mid-point check, tests that name the gap, the stuck ladder, and 4.8 right after.
- Second stall: 4.3, reading the table top to bottom. Mitigation: the Predict sits right before the longest-prefix beat, after the beat that shows three rows containing the address, with the /8 listed first (G3 never-ask fix).
- Third stall: 4.1 with an all-`* * *` trace or a phone only. Mitigation: the sample trace, phone path.
- Accuracy traps (dossier "Care"): real-path commands run on the host, never in the lab (dossier 5.5); `ip route` man page does not say "longest prefix match", cite RFC 1812 [S30]; cite RFC 1812 for Time Exceeded, RFC 792 says "may"; IPv6 hop limit makes no error claim [S2]; `ip_forward` defaults to 0 [S28]; documentation ranges only for fictional public addresses [S10]; Facebook and Cloudflare incidents prove "DNS and routing depend on each other", not BGP teaching; the 4.5 diagram must not suggest a learner's router runs BGP.
- Privacy: a trace shows the learner's provider path; tell them to scrub public hops before posting publicly.

## Resolved in roadmap v3.1

1. The 4.3 hook and "your own trace": resolved. The hook uses a plausible provider router ("A router at your provider could have routes for ..."), not one visible in the trace.
2. `ip route get` missing from the generator: resolved. The netlab generator now covers `ip route get`, `ss` and `conntrack -L`.
3. 4.9 totalled six questions: resolved. 4.9 is three situations plus two questions from module 3, five in all.
4. `[addr: drill]` in Checks: resolved. Check chapters are quiz-only and use plain quiz questions in the drill style.
5. Prose floors for Code and Lab chapters: resolved by the proposed course exception (700 words for Read, Code and Lab chapters and Gates; 1,200 for Learn and Build); decided by the sponsor at G2C on 2026-10-26 and, for Learn and Read chapters, superseded by the beats rules of agent-ip v0.5.3.

## Still open

- Verify at G3 (untested): `ip route get` output from the lab generator (4.3); `tcpdump -e` and the TTL 64 then 63 display (4.7); the missing-return-route symptom as a ping result (4.8), before the generator is written.
- Prose floors are decided (sponsor, G2C, 2026-10-26): Build 1,200 prose words; Code, Lab and Gate 700; Learn and Read follow the beats rules (agent-ip v0.5.3, decision log 2026-10-26); Check chapters are quiz-only.
