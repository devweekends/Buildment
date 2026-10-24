---
artifact: module-brief
course: networking
module: 04-leaving-your-network
version: 1
owner: curriculum-architect
roadmap_version: 3
roadmap_confirmed: true
---

# Module 04: Leaving your network: gateways and routes

Source of truth: `02-curriculum-roadmap.md` v3, module 4. Core 335 min, slow path 425 min. Source IDs such as [S30] point to `01-research-dossier.md`.

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
| 4.9 | Routing | Check | 15 | Choose routes and predict each hop's addresses for four situations; two questions from module 3 | lpm, ttl-icmp | none | quiz |
| 4.10 | Your traceroute, explained | Gate | 25 | Explain the hops you can; for each you cannot, write the question and what you would check | read-trace, ttl-icmp | none | trace explanation |

Budgets for every chapter below: Learn, Read and Build at least 1,200 prose words; Gate at least 700; Check is quiz-only. Code and Lab have no floor in the instructions, so this brief plans at least 700 prose words for them (see Roadmap issues). At most 6 top-level components, 25 JSX tags (cap `GlossaryTerm` at 10 per chapter) and 3 assessment interactions. Every diagram has a text legend.

## Chapter blocks

**4.1 A dozen hops to a website** (Read; reinforces address-kinds)
- Hook: the module's opening question: a dozen machines touch your packet, how does each know where to send it next? (The roadmap gives no separate "Problem first" for this Read.) Claim: a trace is the module's map: every line you cannot explain is a question the next nine chapters answer.
- Example: a recorded sample trace of about 9 lines from the orchestrator's host run (dossier 5.5: two private home routers, then a private `10.x` hop inside the provider, then public hops). Public hops are rewritten to `198.51.100.x` and `203.0.113.x` and labelled as rewritten. Learners classify hops with 2.4 (private, shared, public).
- Diagram: none (the trace is the content). `LearningObjectives` sits here.
- Interactive: commands on your computer: `tracert -d` (Windows), `traceroute -n` (macOS, Linux), expected output shown for phone readers. No predict.
- Assess: none graded; a `Checklist` ("I saved my trace; I marked each hop private, public or unknown"). Near miss: running it in the lab container shows `172.17.0.1` then the destination only (dossier 5.5); say which side to type on. An all-`* * *` trace is normal on some networks: use the sample.

**4.2 The default gateway** (Learn; reinforces subnet-calc)
- Hook: your packet for a site abroad is addressed to the site's IP but to your router's MAC. Why both? Claim: the IP pair says where the packet is going end to end; the MAC pair says who takes it on this one link, and ARP only reaches the local link, so off-subnet packets go to the gateway's MAC.
- Example: laptop `192.168.1.23/24` to server `203.0.113.80` via home router R1 (`192.168.1.1` inside, `198.51.100.2` outside) and provider router R2 (`198.51.100.1`, `203.0.113.1`). The mask test from 3.2 says "not on my subnet". Three frames: IPs never change; the MAC pair changes on each link. Contrast with a neighbour at `192.168.1.40`: destination MAC is the neighbour's.
- Diagram: `MermaidDiagram` flowchart, laptop to R1 to R2 to server, each edge labelled with its MAC pair. Claim: IPs are constant, MACs are per link.
- Interactive: `net-lab-mac-per-hop`, inspector on each link. Predict first: on the R1 to R2 link, is the destination MAC the server's, R2's or R1's? (R2's.)
- Assess: 1 `PREDICT`, 1 `QUIZ` (local versus remote destination, pick the destination MAC). Near miss: a real home router also rewrites the source IP (NAT); say this path has none and module 6 breaks the rule on purpose.

**4.3 Routing tables and longest prefix match** (Learn; reinforces read-trace)
- Hook: a router has routes for `10.0.0.0/8`, `10.1.0.0/16` and a default. A packet for `10.1.2.3` arrives. Which wins, and why not the first listed? Claim: the router picks the most specific matching route, so a longer prefix beats a shorter one regardless of order; the default (`0.0.0.0/0`) matches everything and loses to anything else [S30, S32].
- Example: table `10.0.0.0/8 via 198.51.100.1`, `10.1.0.0/16 via 198.51.100.5`, `default via 198.51.100.9`, connected `192.168.1.0/24`. Destinations: `10.1.2.3` (the /16), `10.2.2.3` (the /8), `203.0.113.80` (default), `192.168.1.40` (connected), and a tie of two /16 rows with metrics 100 and 200 (lower wins).
- Diagram: `MermaidDiagram` flowchart, destination to "all matching rows" to "longest prefix" to "lowest metric". Claim: order in the list is never the tie-breaker in the real world.
- Interactive: `net-lab-route-choice`: edit the table, send packets to five destinations, see the chosen row. Predict first: for `10.1.2.3`, which row wins (first listed, the /16, the default)? `ip route get` output is a recorded sample.
- Assess: 1 `PREDICT`, 1 `QUIZ` (a /32 host route versus a /24; equal prefixes with different metrics). Near miss: the hook says the router is "in your own trace", but a trace never shows a router's table; present it as a fictional composite router. "First listed wins a full tie" is the 4.6 exercise rule, not a router fact.

**4.4 TTL, ICMP and traceroute** (Learn; reinforces read-trace)
- Hook: routers do not tell anyone they forwarded your packet. So how does traceroute learn their addresses? Claim: each router lowers TTL by at least one and, at zero, drops the packet and (for unicast) sends ICMP Time Exceeded from its own address; traceroute sends probes with TTL 1, 2, 3 and reads those replies [S30, S29, S31].
- Example: the 4.2 path. Probe 1 (TTL 1) dies at R1, reply from `192.168.1.1`; probe 2 dies at R2, reply from `198.51.100.1`; probe 3 reaches `203.0.113.80`. Linux default TTL is 64 [S28], so the server sees 62 (derived; capture untested). One router set silent gives `* * *`.
- Diagram: `MermaidDiagram` sequenceDiagram (laptop, R1, R2, server) of the three probes and their replies. Claim: the reply always comes from the device that killed the probe.
- Interactive: `net-lab-ttl-probes`: send probes with TTL 1, 2, 3; R2 stays silent. Predict first: what does line 2 show when R2 is silent (R2's address, `* * *`, or the server's)? (`* * *`.) `MustRead`: traceroute(8) [S31] (default probes, `-I`, `-T`); afterwards the learner can say which protocol it sends by default.
- Assess: 1 `PREDICT`, 1 `QUIZ` (which device's address is on line N). Near miss: `* * *` means that router did not answer or a filter ate it, not that the path is broken (later hops answered). Do not claim IPv6 sends Time Exceeded from RFC 8200 alone [S2]. Cite RFC 1812, not RFC 792 ("may"), for the router duty [S30].

**4.5 Networks of networks** (Read)
- Hook (derived): your trace crossed networks run by different organisations. Who tells your router where `203.0.113.0/24` is? Claim: an autonomous system is a connected group of prefixes with one routing policy [S68]; networks announce which prefixes they reach; if an announcement disappears, other routers lose the row and traffic to those addresses fails.
- Example: networks A, B, C (fictional). C owns `203.0.113.0/24` and announces it to B; B passes it to A; A gets the row "via B". C withdraws it and A's row vanishes. Real case: Cloudflare's 1.1.1.1 prefixes were withdrawn by a configuration error on 14 July 2025 [S50]; say "about an hour", no minute-level figures until a reviewer approves (dossier open question 10). Facebook 2021 is kept for 7.4.
- Diagram: `MermaidDiagram` flowchart with one box per network, announcement arrows, and a dashed arrow for the withdrawn one (the roadmap's "static diagram": drawn, not interactive). Claim: reachability is learned, not built in.
- Interactive: none. Assess: 1 `QUIZ` (ungraded weight, what A does with traffic after the withdrawal). Near miss: no BGP configuration or internals. No AS numbers until RFC 5398 (documentation AS range) is added to the dossier.

**4.6 Code: longest prefix match** (Code; see Code spec). Hook (derived): turn the table rule from 4.3 into a function. Claim: the lookup is three comparisons in a fixed order. Near miss: in JavaScript `x << 32` equals `x << 0`, so a /0 mask built with a shift is wrong.

**4.7 Build a router** (Build; see Build spec). Hook (derived): two networks and nothing between them; your laptop reaches its own router but not the server. Claim: forwarding is off by default [S28], and a reply needs a route back, so both directions must be configured.

**4.8 Lab: fix the broken office** (Lab; see Lab spec). Hook (derived): three complaints, one network. Claim: diagnose by walking the path, one question per hop, not by guessing.

**4.9 Routing** (Check, 5 questions, one instrument). Q1: local versus remote, next-hop MAC. Q2: route choice with a metric tie and a connected route, then the next hop. Q3: a TTL 1 probe, whose address comes back. Together they cover the four situations. Q4 and Q5 from module 3: network address and same-subnet by hand; an ARP exchange. Near miss in the stems: no stem may repeat the 4.3 wording.

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

| Ch | Planned top-level components (max 6) | Assessments (max 3) |
|---|---|---|
| 4.1 | LearningObjectives, TerminalBlock, Callout (host versus lab), Checklist | 0 |
| 4.2 | MermaidDiagram, InteractiveCanvas, predict, quiz, BigWordAlert (default gateway), Callout (no NAT here) | 2 |
| 4.3 | MermaidDiagram, InteractiveCanvas, predict, quiz, BigWordAlert (longest prefix match), TerminalBlock (`ip route get` sample) | 2 |
| 4.4 | MermaidDiagram, InteractiveCanvas, predict, quiz, MustRead (traceroute), Callout (lab hides the real path) | 2 |
| 4.5 | MermaidDiagram, quiz, RealWorldEvent (Cloudflare 2025), Callout (not BGP) | 1 |
| 4.6 | codeexercise, TerminalBlock, Callout | 1 |
| 4.7 | Steps, FileTree, TerminalBlock, Callout, InteractiveCanvas (replay, phone-only section), Checklist | 0 |
| 4.8 | InteractiveCanvas (lab), Checklist | lab checks |
| 4.9 | 5 quiz fences | 5 (one instrument) |
| 4.10 | Checklist, LearningLog, ChapterRecap, openquestion | 1 |

Diagram plan: MermaidDiagram in 4.2, 4.3, 4.4, 4.5 (at least one per module, one per concept-heavy chapter). Module 3 questions in 4.9 are ordinary quiz fences, not `[addr: drill]` (see Roadmap issues).

## Canvases

| Slug | Chapter | Renderer | Claim | Stated limit | Fallback |
|---|---|---|---|---|---|
| `net-lab-mac-per-hop` | 4.2 | `[netlab]` hosts, switch, router, inspector; step mode; slice 1 | IPs stay, MACs change per link | Ethernet only (Wi-Fi frames differ), IPv4, two routers, no NAT | `[sequence]` laptop, home router, provider router, server, with a Predict before each step (exception) |
| `net-lab-route-choice` | 4.3 | `[netlab]` router; explore; slice 1 | Most specific route wins, not the first | Static routes, one router, no routing protocols | `[sequence]` sender and router, table in the captions, Predict per destination |
| `net-lab-ttl-probes` | 4.4 | `[netlab]` router, inspector; step; slice 1 | The router that kills the probe reports itself | No ICMP rate limits, one path, UDP-style probes | `[sequence]` laptop, R1, R2, server |
| `net-lab-fix-office` | 4.8 | `[netlab]` host, switch, router, inspector; fault mode; slice 1 | Walk the path to find the broken hop | Fixed three-fault office | Blocked; recorded-output quiz |
| `net-replay-router` | 4.7 | `[replay]` from the reference run | Predict each command's output, then see it | Recorded, not live | `[sequence]` learner and lab with Predict blocks |

4.5 uses a static diagram only (no slug). The replay sits in a "phone-only path" section, so it does not follow a build that already proves the same thing for laptop learners.

## Gate: 4.10 Your traceroute, explained (25 min)

- Evidence: the learner's own trace from 4.1 explained, plus challenge 2 committed (`results.md` with the capture, `test.sh` passing). Review within three days; learners carry on while it waits.
- `openquestion` (the only one in the module): "Paste your trace (you may scrub public addresses). For each hop you can explain, say what it is and how you know. For each you cannot, write the question and what you would check." `minWords: 0`, `allowSpeechInput: true`, so a voice note or labelled diagram link can be submitted. Server-only rubric: at least three hops classified with address kinds; `* * *` explained as silence, not breakage; at least one honest open question with a concrete check; mentions TTL and Time Exceeded.
- Prose (at least 700 words, no new concepts): what a strong answer looks like, a model answer on the sample trace, two weak answers and why they fall short, a bridge to module 5. No canvas.
- `Checklist`: trace saved; challenge 2 committed; lab 4.8 passed; capture shows the MAC change. `LearningLog`: "Which line surprised you, and which rule (gateway, longest prefix, TTL) explains it?" `ChapterRecap`: gateway MAC versus destination IP; longest prefix wins; TTL and Time Exceeded; networks announce blocks; a router needs forwarding and a way back.

## Risks

- Likeliest stall: 4.7, forgetting the route back or forwarding, because the failure is silent (dossier 5.7). Mitigation: the mid-point check, tests that name the gap, the stuck ladder, and 4.8 right after.
- Second stall: 4.3, reading the table top to bottom. Mitigation: the Predict comes before any explanation, with the /8 listed first.
- Third stall: 4.1 with an all-`* * *` trace or a phone only. Mitigation: the sample trace, phone path.
- Accuracy traps (dossier "Care"): real-path commands run on the host, never in the lab (dossier 5.5); `ip route` man page does not say "longest prefix match", cite RFC 1812 [S30]; cite RFC 1812 for Time Exceeded, RFC 792 says "may"; IPv6 hop limit makes no error claim [S2]; `ip_forward` defaults to 0 [S28]; documentation ranges only for fictional public addresses [S10]; Facebook and Cloudflare incidents prove "DNS and routing depend on each other", not BGP teaching; the 4.5 diagram must not suggest a learner's router runs BGP.
- Privacy: a trace shows the learner's provider path; tell them to scrub public hops before posting publicly.

## Roadmap issues

1. 4.3 hook says a router "in your own trace" has stated routes; a trace shows only hop addresses. Reword the hook; the brief treats it as a fictional router.
2. The netlab command generator list (roadmap) omits `ip route get`, which 4.3's outcome needs (and `conntrack -L` for 6.2 and `ss` for 5.2 and 5.3). Until added, the brief shows recorded real output; `ip route get` is untested, verify at G3.
3. 4.9 outcome totals six questions (four situations plus two from module 3) against the Check rule of three to five. The brief merges the situations into three questions and keeps the total at five.
4. The roadmap reuses `[addr: drill]` in Checks for spaced practice, but the playbook bans canvases in quiz chapters. The brief uses plain quiz questions.
5. Code and Lab chapters have no prose floor in the instructions; 700 words is a working assumption for the blueprint to confirm.
