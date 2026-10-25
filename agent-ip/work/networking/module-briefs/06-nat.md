---
artifact: module-brief
course: networking
module: 06-nat
version: 1
owner: curriculum-architect
roadmap_version: 3.1
roadmap_confirmed: true
---

# Module 06: NAT: how every device at home reaches the internet

Source of truth: `02-curriculum-roadmap.md` v3.1, module 6. Core 400 min, slow path 519 min. Source IDs such as [S18] point to `01-research-dossier.md`. Execution tests are dossier 5.5 to 5.7.

## Outcome

By the end the learner can:
1. Show that a server sees one source address for many home devices (6.1).
2. Predict a packet's source after a Linux router (address always rewritten, port only on a clash) and read the real table with `conntrack -L` (6.2, 6.7).
3. Explain why the internet cannot reach a home device, that NAT is not a firewall, and how port forwarding changes that (6.3, 6.8).
4. Recognise carrier-grade NAT and say what it does to forwarding (6.4, 6.9).
5. Explain idle mapping timeouts, keepalives and why calls need STUN or a relay (6.5).
6. Write a NAT table in code and build a home router with masquerade, a forwarded port and a guest network (6.6 to 6.8).
7. Answer the course question with their own capture (6.11).

This module carries outcome O5, part of O6 (the fault level in 6.9) and part of O7. Challenge 4 is its build evidence.

## Why this module exists

This is the module the course is built around: "all your devices are connected to your router and none of them has a public address, so how do they talk to the internet?" Modules 1 to 5 supplied every piece (addresses, the private ranges, the gateway, ports). Here the learner builds the answer and reads it in a capture. Module 7 (DHCP and DNS) and the capstone (module 8) run on the home router built in 6.7 and 6.8.

## Prerequisites

Entry: modules 4 and 5 done, challenge 2 and challenge 3 committed (6.7 starts from the learner's own router script). Netlab slice 2 (NAT, home router, provider NAT) must be shipped; filter comes from slice 1.

| Needs | From | Used in |
|---|---|---|
| nat-first-look, address-kinds (private, shared, special) | 2.4 | 6.1, 6.4 |
| read-capture (`tcpdump -n -v`) | 1.4 | 6.7 |
| why-split | 3.4 | 6.8 |
| read-trace | 4.1 | 6.4 |
| default-gateway, lpm | 4.2, 4.3 | 6.2, 6.3 |
| ip-forwarding, diagnose-routing | 4.7, 4.8 | 6.7, 6.9 |
| conversation-id, listen-address | 5.2, 5.3 | 6.1 to 6.3 |
| tcp, udp | 5.4, 5.5 | 6.5, 6.10 |
| js-basics (entry) | entry | 6.6 |

## Chapters

Totals: 11 chapters: 1 Read (6.1), 4 Learn (6.2 to 6.5), 1 Code, 2 Build, 1 Lab, 1 Check, 1 Gate. Check file: `06.10-nat-quiz.md`.

| # | Chapter | Type | Min | Outcome | Requires | Introduces | Evidence |
|---|---|---|---|---|---|---|---|
| 6.1 | Fifteen devices, one public address | Read | 10 | See that a server receives the same source address from your phone and your laptop | nat-first-look, conversation-id | none | none (read) |
| 6.2 | The NAT table | Learn | 40 | Predict the source after a Linux router: the address is always rewritten, and the port changes only when two devices would clash (other routers may differ); read the real table and the new port with `conntrack -L` | conversation-id, default-gateway | napt, conntrack | netlab check |
| 6.3 | Why the internet cannot reach your laptop | Learn | 35 | Explain the two real reasons (the internet has no route to private ranges; an unsolicited packet has no mapping to translate) and that NAT is not a firewall (a filter is a separate rule, which 6.8 builds); set up port forwarding; recognise the same idea in `docker run -p 8080:80`, which publishes a container port using NAT rules [S75] | napt, lpm, listen-address | inbound, port-forwarding | netlab check |
| 6.4 | Carrier-grade NAT | Learn | 30 | Explain provider NAT and why it is common on mobile networks; treat `100.64.0.0/10` as one sign, not proof; with no router access or on a hotspot, use the private hops in your own trace instead | napt, address-kinds, read-trace | cgnat | netlab check |
| 6.5 | NAT timeouts, keepalives and video calls | Learn | 35 | Explain why idle mappings expire (sourced examples: UDP at least two minutes in RFC 4787; 350 seconds on one cloud NAT gateway), what keepalives do, and that STUN helps calls through some NATs while others need a relay; see your own lab router's timers with `conntrack -L` | napt, udp | nat-timeouts | in-chapter quiz |
| 6.6 | Code: a NAT table | Code | 45 | Translate outbound packets (keep the port unless taken, else the lowest free port from a stated range: the exercise's model, not the number a real capture shows), translate replies, drop unknown inbound packets, expire mappings using a `now` parameter | napt, js-basics | none | graded code tests |
| 6.7 | Build a home router, part 1: masquerade | Build | 75 | Put two devices behind a router namespace with an nft masquerade rule; capture inside and outside (mid-point check: one device reaches the server); read `conntrack -L`; make both devices use the same source port, predict whether the port changes, and read the new one from `conntrack` | napt, ip-forwarding | nft-masquerade | challenge 4 part 1 tests and captures |
| 6.8 | Build a home router, part 2: forwarding and a guest network | Build | 50 | Forward a port to a web server and test it from the outside namespace; note what an unforwarded port gives (connection refused, not a timeout); add a guest subnet and a forward rule that keeps it away from the home subnet | nft-masquerade, port-forwarding, why-split | nft-dnat-filter | challenge 4 part 2 tests |
| 6.9 | Lab: reach the home server from outside | Lab | 40 | Level 1: forward a port, after first finding one injected fault. Level 2: two web servers both want port 80. Level 3: the provider adds carrier-grade NAT; explain why forwarding stops working and what still can (connections must start from inside, so a relay, as in 6.5). Tunnels and IPv6 appear as "later" notes, not graded | port-forwarding, cgnat, diagnose-routing | diagnose-nat | graded lab checks |
| 6.10 | NAT | Check | 15 | Predict addresses on both sides of one and two NATs, and whether the port changes; two questions from module 5 | napt, cgnat | none | quiz |
| 6.11 | Answer the course question | Gate | 25 | Answer it with your own capture and `conntrack` output; branches if your own public address is IPv6 or shared | napt, conntrack | none | course question answered with own capture |

Budgets for every chapter below: Learn and Build at least 1,200 prose words; Read, Code and Lab chapters and Gates at least 700 (a proposed course exception that waits for the sponsor's G2C decision; if it is rejected, the Read chapter is re-timed to 15 to 20 minutes); Check is quiz-only. At most 6 top-level components, 25 JSX tags (cap `GlossaryTerm` at 10) and 3 assessment interactions. Every diagram has a text legend. Fictional public addresses use only `192.0.2.0/24`, `198.51.100.0/24`, `203.0.113.0/24`, with a visible note in 6.1 (decision 11).

## Chapter blocks

**6.1 Fifteen devices, one public address** (Read; reinforces nat-first-look)
- Hook: the module's opening question: all your devices are connected to the router and none has a public address, so how do they reach the internet? (The roadmap gives no separate "Problem first" for this Read.) Claim: a server cannot tell fifteen devices apart by source address; to it they are one.
- Example: fifteen devices `192.168.1.20` to `192.168.1.34` each open a connection to `203.0.113.80`. The server logs `203.0.113.45` fifteen times, the same number as the opener in 1.1.
- Diagram: none; the canvas is the picture. `LearningObjectives` sits here.
- Interactive: `net-lab-home-router-first-look`, explore. Predict first: fifteen devices connect to one server; how many different source addresses does it see (1, 15, it depends)? The learner also looks at their own 1.1 notes: the address on the laptop and the one the website saw.
- Assess: 1 `PREDICT`. Near miss: the canvas uses `203.0.113.45` (the opener) while the tested build uses `203.0.113.1`; say once that both stand in for a public address. If the learner's own result in 1.1 was IPv6 or shared, point to the branch in 6.11.

**6.2 The NAT table** (Learn; reinforces nat-first-look)
- Hook: your phone and laptop both send from port 41000 to the same server. Replies come back to one address. Which device gets which? Claim: the router keeps one table row per conversation; it always rewrites the source address, keeps the port unless two conversations would collide, and uses the row to send replies back [S17, S18].
- Example: laptop `192.168.1.23` and phone `192.168.1.24`, both from port 41000 to `203.0.113.80:8080`, router outside `203.0.113.1`. Laptop: source becomes `203.0.113.1:41000` (kept). Phone: `203.0.113.1:<new port>` (changed). Tested behaviour [dossier 5.6]: address rewritten, port kept; port rewritten only on a clash; `conntrack -L` shows both rows. The new port is chosen by the kernel (one run gave 37613); never print one as the answer.
- Diagram: `MermaidDiagram` flowchart of one packet before and after the router with the table row. Claim: the row is what lets the reply find its device.
- Interactive: `net-lab-nat-table`: watch the table fill, inspect each packet before and after. Predict first: both send from 41000; what does the server see (both change, only the second changes, neither changes)? (Only the second.)
- Assess: 1 `PREDICT`, 1 `QUIZ` (two devices, different source ports: does anything change?). Near miss: "other routers may differ"; RFC 4787 says mapping must be endpoint-independent, but real routers vary and no measurement is sourced, so teach the requirement, not "all routers do this" [S18]. The lab's limits line says the same. The netlab generator covers `conntrack -L`, so the rows come from the model's state; the learner reads a real table in 6.7 (untested in the lab generator: verify at G3).

**6.3 Why the internet cannot reach your laptop** (Learn; reinforces address-kinds)
- Hook: a friend wants to open the website on your laptop at home and types your public address. What happens to their packet? Claim: two separate reasons stop it: the internet has no route to private ranges, and an unsolicited packet at the router has no mapping to translate; NAT is not a firewall, and a filter is a separate rule, which 6.8 builds.
- Example: friend at `198.51.100.77` sends to `203.0.113.45:8080`. No row, no rule: the router answers refused (tested, dossier 5.6). If the outside had a route `192.168.1.0/24` via the router, a packet addressed straight to `192.168.1.23` gets through (tested, dossier 5.6), so masquerade is not a firewall. Add a forward `203.0.113.1:8080` to `192.168.1.23:80` (tested), then a filter.
- Diagram: `MermaidDiagram` flowchart: inbound packet, "mapping or rule?", drop or rewrite. Claim: only an outbound packet or a forwarding rule creates the mapping.
- Interactive: `net-lab-inbound-forward`: send an inbound packet with no mapping; give the outside a route and watch it pass; add a forwarding rule; add a filter. Predict first: a friend sends to your router's public address, no rule, no earlier outbound packet; what comes back (refused, silent timeout, your laptop's page)? (Refused.)
- Assess: 1 `PREDICT`, 1 `QUIZ` (which of three setups lets the packet in). Near miss: do not claim that home routers always add a firewall. The chapter says NAT is not a firewall and a filter is a separate rule built in 6.8; the lab router has no filter until the learner adds one, so an unforwarded port is refused. `docker run -p` publishes a port using NAT rules [S75] (the source names no rule type).

**6.4 Carrier-grade NAT** (Learn)
- Hook: your router's page says its outside address is `100.72.14.9`, but websites see `203.0.113.45`. Who is the second router? Claim: a provider can run NAT too, with `100.64.0.0/10` on the link to customers [S11, S19]; a packet can be translated twice; an address in that block is one sign, not proof.
- Example: laptop `192.168.1.23` to home router outside `100.72.14.9` to provider NAT to public `203.0.113.45` to server `203.0.113.80`. Source at each stage: `192.168.1.23`, `100.72.14.9`, `203.0.113.45`. Dated evidence only: a study with data from 2014 to 2016 found CGN in over 92 percent of cellular networks [S34]; the 2026 share is UNVERIFIED. CGN must limit ports per subscriber and drop new flows rather than evict old ones [S19].
- Diagram: `MermaidDiagram` flowchart of two NAT layers with the address at each hop. Claim: the packet is rewritten twice.
- Interactive: `net-lab-cgnat`: two layers, inspect the packet at each. Predict first: how many rewrites between laptop and server (one, two, none)? (Two.) The learner runs a trace on their own computer, not the lab, and looks for `10.x` or `100.64.0.0/10` hops after their router; hotspot learners use only the trace.
- Assess: 1 `PREDICT`, 1 `QUIZ` (read a router status line and a trace). Near miss: a private `10.x` hop is a sign too; a recorded sample from dossier 5.5 (two private home routers, then a private hop inside the provider) shows that private hops can also mean a second home router.

**6.5 NAT timeouts, keepalives and video calls** (Learn)
- Hook: your chat app sits untouched for an hour and messages stop arriving until you open it. What expired? Claim: a mapping is state with a timer; silence deletes it, and then an inbound packet is unknown and dropped; keepalives reset the timer; call apps use STUN to learn their outside address and a relay when that is not enough [S18, S20, S21, S51].
- Example: model numbers, labelled illustrative: idle timeout 300 s, keepalive every 120 s, server pushes at minute 60. UDP timers must not be under two minutes, five recommended [S18]. One cloud NAT gateway times out idle connections at 350 seconds and later packets get a reset; the fix is keepalives below that [S51]. STUN returns the address and port a peer sees, default port 3478 [S20]; ICE tries host, server-reflexive and relayed candidates [S21]. One box only.
- Diagram: `MermaidDiagram` state diagram: mapping created, active (traffic resets the timer), expired, later packet dropped. Claim: a mapping is a timed state, not a permanent rule.
- Interactive: `net-timeline-nat-idle`, a new `[timeline]` model, seconds to hours (renderer change): a mapping expires in a quiet period, then keepalives are added. Predict first: quiet for an hour, timeout 5 minutes, a message arrives; what happens (it reaches the laptop, it is dropped, the router asks the laptop)? (Dropped.) `MustRead`: the cloud NAT gateway page [S51]; afterwards the learner can state the timeout and the fix.
- Assess: 1 `PREDICT`, 1 `QUIZ` (which keepalive interval is safe for a 350 s timeout). Near miss: the lab router's `conntrack -L` shows its own timers; record the real output at G3 and quote it, never a Linux default from memory, and say plainly that a different NAT has a different timer. RFC 6888 gives no TCP idle figure [S19].

**6.6 Code: a NAT table** (Code; see Code spec). Hook (derived): turn the table from 6.2 into a function. Claim: a NAT is a map from inside conversations to outside ports plus a clock.

**6.7 Build a home router, part 1: masquerade** (Build; see Build spec). Hook (derived): the router from 4.7 works, but the server rejects the private source; make the home reach out. Claim: one nft rule rewrites the source, and `conntrack` is the real table.

**6.8 Build a home router, part 2: forwarding and a guest network** (Build; see Build spec). Hook (derived): your friend still cannot see the web server. Claim: a forward rule opens one port, an unforwarded port is refused, and a forward rule can keep a guest away from the home subnet.

**6.9 Lab: reach the home server from outside** (Lab; see Lab spec). **6.10 NAT** (Check, 5 questions, one instrument, plain quiz fences with no canvas). Q1: source address and port after one Linux NAT with a clash. Q2: addresses at each stage of two NATs. Q3: why an unsolicited inbound packet fails. Q4 and Q5 from module 5: match a reply to its socket; who can connect to a listening address. Near miss: no stem repeats the 6.2 wording.

## Code spec: 6.6

- Signature: `export function createNat({ publicIp, portRange, idleTimeout })` returns `{ outbound(packet, now), inbound(packet, now), table(now) }`. A packet is `{ protocol, srcIp, srcPort, dstIp, dstPort }`. Every call takes `now` (seconds).
- `outbound`: if the source port is free on the public side, keep it; else use the lowest free port in `portRange` (tests use a stated range, for example `[50000, 50099]`). Reuse the row for the same conversation and refresh its time. Returns the translated packet. When no port is free it returns `"drop"` and leaves every existing row alone (rule from [S19], now in the roadmap spec).
- `inbound`: translate a reply to the inside address and port; an unknown packet returns the string `"drop"`.
- `table(now)`: the live rows (expired ones removed).
- Simplification, stated in the chapter: the exercise keeps the port unless it is taken, but Linux checks the whole conversation (outside address, port and destination) for a clash. A full range drops the new flow [S19].
- Edge cases: expiry exactly at `idleTimeout`; a port freed by expiry is reusable; inbound to a known public port from a different remote endpoint returns `"drop"` (the exercise's model; real routers vary [S18]); two protocols on the same port number.
- Tests: kept port; clash gives the lowest free port; reply maps back to the right device; unknown inbound drops; refresh on reuse; expiry then drop; freed port reused; pool exhaustion drops without eviction; wrong remote drops. Failure mode: the expiry boundary.
- Hint ladder: (1) a row is keyed by inside address and port plus remote; (2) store `lastSeen`; (3) the lowest-port search. No helper dependency.

## Build spec: 6.7 Build a home router, part 1 (challenge 4, part 1)

- Support: gapped. Folder `challenges/challenge-4-home-router/part-1-masquerade/` (names proposed): `README.md`, one script, `results.md`, `test.sh`.
- Topology (tested, dossier 5.6): `laptop` `192.168.1.23`, `phone` `192.168.1.24` on a bridge in the `router` namespace (`192.168.1.1` inside, `203.0.113.1/24` outside); `server` `203.0.113.80` running a one-line `busybox httpd` CGI that returns the address and port it sees. Start from the learner's own challenge 2 script.
- Gaps: (1) forwarding on, and a default route on both devices; (2) the nft table, the `postrouting` chain of type nat and the rule `oifname "<outside>" masquerade` (commands as tested, dossier 5.5, from [S43]); (3) fixing the source port for both devices and reading `conntrack -L`. Tests name the failing gap.
- Mid-point check: one device reaches the server.
- Must pass: `curl http://203.0.113.80:8080/` from each device returns a body naming `203.0.113.1`, never `192.168.1.x`; with both devices on source port 41000, the two ports the server reports differ (the test compares, never checks a fixed number).
- Must fail: from the server, `curl -m 3 http://192.168.1.23/` exits 7 at once (tested, dossier 5.6).
- Capture to commit in `results.md`: `tcpdump -n` on the inside link (source `192.168.1.x`) and the outside link (source `203.0.113.1`), plus the `conntrack -L` lines showing `sport=41000` and the new `dport`. Untested, verify at G3: the way to fix a source port (`curl --local-port 41000`, since the dossier fixed ports but did not record the flag); reusing a fixed port right after close may fail.
- Hint ladder: (1) "The server rejects `192.168.1.x`; which header must change?" (2) name `nft` and masquerade; (3) the rule with the interface name blank.
- If you are stuck: does the router namespace have forwarding on (`sysctl net.ipv4.ip_forward`)? Does `nft list ruleset` show the rule on the outside interface? Does the server show the packet arriving (capture outside)? Is the outside interface name the one in the rule?
- Slow path 110 min. Restore point: `toolkit/restore.sh 4.1`. Phone-only path: the recorded run as a replay.

## Build spec: 6.8 Build a home router, part 2 (challenge 4, part 2)

- Support: gapped. Folder `challenges/challenge-4-home-router/part-2-forwarding-guest/`. Builds on part 1 (`toolkit/restore.sh 4.1` if needed).
- Topology: add `guest` `192.168.50.10/24` on a third router interface (`192.168.50.1/24`); forward `203.0.113.1:8080` to `192.168.1.23:80` (tested, dossier 5.6).
- Gaps: (1) the DNAT rule on a `prerouting` chain of type nat (exact `nft` syntax untested as text, verify at G3); (2) the `forward` rule dropping guest to home (tested effect, dossier 5.6); (3) the three outside tests.
- Must pass: from `server`, `curl -m 3 http://203.0.113.1:8080/` returns the home page; the guest reaches the server and the server sees `203.0.113.1` (tested).
- Must fail: guest to `192.168.1.23:80` is blocked. Expected shape with a drop rule: a timeout, `curl -m 3` exits 28 (untested, verify at G3).
- Required observation: from `server`, `curl http://203.0.113.1:22` exits 7 (refused, not a timeout; tested, dossier 5.6). Record it.
- Capture to commit: `tcpdump` outside and inside for the forwarded request (destination rewritten), the `nft list ruleset`, and the three test outputs.
- Hint ladder: (1) "Which hook sees the packet before the routing decision?" (2) name `prerouting`; (3) the rule with the address and port blank. If you are stuck: is the web server listening on `0.0.0.0` (5.3)? Does the rule's port match? Did the guest rule land after a catch-all accept?
- Slow path 75 min. Restore point: `toolkit/restore.sh 4.2`.

## Lab spec: 6.9 Lab: reach the home server from outside

Mode fault, three levels, checks pass or fail; commands `ping`, `ip route`, `ip neigh`, `traceroute`, plus the inspector and the NAT table panel.
- Level 1: the one injected fault is the brief's proposal, accepted in roadmap v3.1: the forward rule targets `192.168.1.32` instead of `.23`; found by pinging the target from the router. Then forward the port; check the outside reaches the server.
- Level 2: two web servers both want port 80. Fix: forward `8080` and `8081` to each; one outside address plus one port names one destination.
- Level 3: the provider adds carrier-grade NAT. Graded: pick why forwarding stops (no mapping exists at the provider NAT for inbound packets) and what still works (connections started from inside, so a relay as in 6.5). Tunnels and IPv6 are "later" notes, not graded.
- Fallback if slice 2 is late: the lab is blocked; use diagnosis from recorded command output, graded as a quiz.

## Interactions

| Ch | Planned top-level components (max 6) | Assessments (max 3) |
|---|---|---|
| 6.1 | LearningObjectives, InteractiveCanvas, predict, Callout (documentation-range note), Checklist | 1 |
| 6.2 | MermaidDiagram, InteractiveCanvas, predict, quiz, BigWordAlert (NAT table), TerminalBlock (`conntrack -L` sample) | 2 |
| 6.3 | MermaidDiagram, InteractiveCanvas, predict, quiz, BigWordAlert (port forwarding), Callout (NAT is not a firewall) | 2 |
| 6.4 | MermaidDiagram, InteractiveCanvas, predict, quiz, BigWordAlert (carrier-grade NAT), Callout (sign, not proof) | 2 |
| 6.5 | MermaidDiagram, InteractiveCanvas (timeline), predict, quiz, MustRead (NAT gateway page), Callout (STUN box) | 2 |
| 6.6 | codeexercise, TerminalBlock, Callout (the model is not a real capture) | 1 |
| 6.7, 6.8 | Steps, FileTree, TerminalBlock, Callout, InteractiveCanvas (replay, phone-only section), Checklist | 0 |
| 6.9 | InteractiveCanvas (lab), Checklist | lab checks |
| 6.10 | 5 quiz fences | 5 (one instrument) |
| 6.11 | Checklist, LearningLog, ChapterRecap, openquestion | 1 |

Diagram plan: MermaidDiagram in 6.2 to 6.5 (at least one per module, one per concept-heavy chapter). One `MustRead` (6.5).

## Canvases

| Slug | Chapter | Renderer | Claim | Stated limit | Fallback |
|---|---|---|---|---|---|
| `net-lab-home-router-first-look` | 6.1 | `[netlab]` home router, host; explore; slice 2 | The server sees one address for many devices | Linux-style NAT only | `[sequence]` phone, laptop, router, server, Predict before the key steps only, within the chapter's budget of 3 assessments (exception) |
| `net-lab-nat-table` | 6.2 | `[netlab]` home router, NAT, inspector; step; slice 2 | One row per conversation; port changes only on a clash | Linux masquerade; other routers differ (limits line) | `[sequence]` phone, laptop, router, server |
| `net-lab-inbound-forward` | 6.3 | `[netlab]` home router, NAT, filter; step; slice 2 | Inbound needs a mapping or a rule; NAT is not a firewall | No router firewall modelled | `[sequence]` friend, router, laptop |
| `net-lab-cgnat` | 6.4 | `[netlab]` home router, provider NAT, inspector; step; slice 2 | The packet is rewritten twice | One provider layer, no port limits shown | `[sequence]` laptop, home router, provider NAT, server |
| `net-timeline-nat-idle` | 6.5 | `[timeline]` new model, needs the seconds-to-hours renderer change | A quiet mapping expires; keepalives reset it | Model timers (300 s, 120 s), not a real router's | A worked-example table of the mapping timeline plus a Predict (roadmap v3.1) |
| `net-lab-reach-home-server` | 6.9 | `[netlab]` home router, provider NAT, fault; three levels; slice 2 | Forwarding works until a second NAT sits in front | Fixed scenario | Blocked; recorded-output quiz |
| `net-replay-masquerade`, `net-replay-forward-guest` | 6.7, 6.8 | `[replay]` | Predict each command's output, then see it | Recorded, not live | `[sequence]` learner and lab with Predict blocks before the key steps only, within the chapter's budget of 3 assessments |

## Gate: 6.11 Answer the course question (25 min)

- Evidence: the course question answered with the learner's own capture and `conntrack` output, plus challenge 4 (both parts) committed. Review within three days; learners carry on.
- `openquestion`: "All your devices are connected to your router and none has a public address. How do they talk to the internet? Use the capture and `conntrack` line from your challenge 4 results." `minWords: 0`, `allowSpeechInput: true`. Server-only rubric: names the source address rewrite; port kept unless a clash; the table sends replies back; quotes one inside and one outside line; says why an outside host cannot start a connection and how a forward rule changes that; one sentence on carrier-grade NAT.
- Branches in the prose: if the learner's 1.1 public address was IPv6 (answer for IPv4 with `curl -4`; IPv6 comes in module 9); if it was shared or differs from the router page (6.4 branch, using their own trace).
- Prose (at least 700 words, no new concepts): return to the 1.1 numbers (`192.168.1.23` versus the address a website sees), a model answer, weak answers, a bridge to module 7 (how a device got its address and finds names). No canvas.
- `Checklist`: both parts of challenge 4 committed; capture shows both sides; `conntrack` line included; lab 6.9 level 3 done. `LearningLog`: "Which number from 1.1 can you now explain?" `ChapterRecap`: address rewritten, port only on clash; one row per conversation; no row means no inbound; forwarding opens one port; provider NAT sits in front; timeouts delete rows.

## Risks

- Likeliest stall: the 6.7 prediction and the `conntrack` line, because each row has two tuples (original and reply). Mitigation: annotate one row in 6.2, make the learner predict before reading the new port, and keep the tests comparing ports instead of checking a number.
- Second stall: 6.8, the DNAT hook and the guest rule order. Mitigation: gaps are named, stuck list, `restore.sh`.
- Third: carrying "NAT keeps the port" too far; the exercise (6.6) and the lab are simplified models.
- Accuracy traps (dossier "Care"): NAT keeps the port unless there is a clash (Linux masquerade, tested), other routers differ [S18]; NAT is not a firewall (tested: a route alone let the server reach the laptop); in the lab an unforwarded port is refused, not a timeout; traceroute and `curl ifconfig.me` run on the host, never in the lab (dossier 5.5); `100.64.0.0/10` is one sign, not proof [S11]; CGN prevalence is dated evidence only [S34]; UDP idle timer at least two minutes, five recommended [S18], one gateway uses 350 s [S51], no TCP figure from [S19]; do not quote Linux conntrack defaults from memory; incident minute-level figures need reviewer approval (dossier open question 10); the 6.6 "taken" rule is the exercise's model.

## Resolved in roadmap v3.1

1. No fallback for the 6.5 `[timeline]` model: resolved. It falls back to a worked-example table plus a Predict.
2. 6.6 "taken" and a full range: resolved. 6.6 states that it simplifies Linux's clash rule (Linux checks outside address, port and destination), and a full range drops the new flow [S19].
3. `conntrack -L` missing from the generator: resolved. The generator covers `conntrack -L`, `ip route get`, `ss` and `curl`.
4. "Home routers add a firewall" and `docker run -p`: resolved. The firewall claim is removed (NAT is not a firewall; a filter is a separate rule built in 6.8); `docker run -p` publishes a port using NAT rules [S75].
5. 6.9 level 1's injected fault: resolved. The brief's proposed fault is accepted.
6. 6.1 at 10 minutes and the prose floor for Read, Code and Lab: resolved by the proposed course exception (700 words; Learn and Build keep 1,200), pending the sponsor's G2C decision.

## Still open

- Verify at G3 (untested): the 6.5 timer column and the real `conntrack -L` timers; `curl --local-port 41000` for fixing a source port (6.7); the exact `nft` DNAT syntax (6.8); the guest-to-home block giving exit 28 (6.8); `conntrack -L` and `curl` output from the lab generator.
- The 700-word floor for Read, Code and Lab chapters and Gates awaits the sponsor's G2C decision.
