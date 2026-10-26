---
artifact: module-brief
course: networking
module: 06-nat
version: 2
owner: curriculum-architect
roadmap_version: 3.1
roadmap_confirmed: true
agent_ip_version: 0.5.3
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

Budgets for every chapter below (agent-ip v0.5.3, sponsor decision at G2C, 2026-10-26): Learn and Read follow the beats rules (Learn: four to eight beats, at most 70 visible words per beat, 300 to 700 visible words and at least 900 with `GoDeeper` folds, at least one playable beat, no BigWordAlert; Read: one or two beats); Build at least 1,200 prose words; Code, Lab and Gate at least 700; Check is quiz-only. Build, Code, Lab, Check and Gate chapters keep at most 6 top-level components and 25 JSX tags (cap `GlossaryTerm` at 10 per chapter); Learn chapters at most 40 JSX tags; at most 3 assessment interactions in all. Every diagram has a text legend.

## Chapter blocks

**6.1 Fifteen devices, one public address** (Read; reinforces nat-first-look)
- Hook: the module's opening question: all your devices are connected to the router and none has a public address, so how do they reach the internet? (The roadmap gives no separate "Problem first" for this Read.) Claim: a server cannot tell fifteen devices apart by source address; to it they are one.
- Example: fifteen devices `192.168.1.20` to `192.168.1.34` each open a connection to `203.0.113.80`. The server logs `203.0.113.45` fifteen times, the same number as the opener in 1.1.
- Format (agent-ip v0.5.3): `format: beats`, 2 beats (a Read chapter has one or two); at most 70 visible words per beat; depth and the worked example go in `GoDeeper` folds; the commands the chapter asks the learner to run stay as code fences; no BigWordAlert (terms use `GlossaryTerm`). The hook and claim above stay as the chapter's opening lines.
- Beats:
  1. **Fifteen devices, one address in the log** (playable). InteractiveCanvas `net-m6-home-router-first-look` (`[netlab]`). Shows: fifteen devices 192.168.1.20 to .34 each open a connection to 203.0.113.80; the server logs 203.0.113.45 fifteen times. Learner: open connections from different devices and read the server's log.
  2. **The two numbers from 1.1, again** (fixed picture). MermaidDiagram `mmd-6-1-two-numbers-again` (inline, no registration). Shows: your computer's 192.168.1.23 and the address a website saw, now with the router between them.
- Predict (right before beat 1, "Fifteen devices, one address in the log"): Fifteen devices connect to one server. How many different source addresses does the server see? Options: 1 / 15 / it depends. Answerable from: 1.1 showed that a website sees a different address from the computer's own, and 2.4 showed a router rewriting the source; the learner combines them.
- Quick check (after the last beat): (1) A server logs two connections from 203.0.113.45: can it tell which device made each (taught in beat 1).
- Components: GlossaryTerm (public address, documentation range); 1 Callout; LearningObjectives; Checklist; one `GoDeeper` fold per beat; about 9 of 40 JSX tags; 2 of 3 assessments.
- Near miss: The canvas uses `203.0.113.45` (the opener) while the tested build uses `203.0.113.1`; say once that both stand in for a public address. If the learner's own result in 1.1 was IPv6 or shared, point to the branch in 6.11.

**6.2 The NAT table** (Learn; reinforces nat-first-look)
- Hook: your phone and laptop both send from port 41000 to the same server. Replies come back to one address. Which device gets which? Claim: the router keeps one table row per conversation; it always rewrites the source address, keeps the port unless two conversations would collide, and uses the row to send replies back [S17, S18].
- Example: laptop `192.168.1.23` and phone `192.168.1.24`, both from port 41000 to `203.0.113.80:8080`, router outside `203.0.113.1`. Laptop: source becomes `203.0.113.1:41000` (kept). Phone: `203.0.113.1:<new port>` (changed). Tested behaviour [dossier 5.6]: address rewritten, port kept; port rewritten only on a clash; `conntrack -L` shows both rows. The new port is chosen by the kernel (one run gave 37613); never print one as the answer.
- Format (agent-ip v0.5.3): `format: beats`, 5 beats; at most 70 visible words per beat, 300 to 700 visible words in all and at least 900 with the `GoDeeper` folds (the claim and worked example above are spread over the beats and their folds); one visual per beat; at least one playable beat; at most 40 JSX tags and 3 assessment interactions; no BigWordAlert (terms use `GlossaryTerm`). The hook above is the chapter's one or two opening sentences.
- Beats:
  1. **The router rewrites the source address** (playable). InteractiveCanvas `net-m6-nat-rewrite` (`[netlab]`). Shows: a packet from 192.168.1.23 leaves the router with the router's outside address as its source. Learner: inspect the packet before and after the router.
  2. **One row per conversation** (playable). InteractiveCanvas `net-m6-nat-table-fills` (`[netlab]`). Shows: the NAT table gains a row each time a device opens a connection. Learner: open connections from the laptop and the phone.
  3. **The row sends the reply home** (fixed picture). MermaidDiagram `mmd-6-2-reply-path` (inline, no registration). Shows: a reply to the outside address and port is matched to its row and sent to the right device.
  4. **Two devices, same port: one must change** (playable). InteractiveCanvas `net-m6-nat-clash` (`[netlab]`). Shows: laptop and phone both send from 41000 to 203.0.113.80:8080; the laptop keeps 41000, the phone gets another port. Learner: make both devices use port 41000.
  5. **Read the real table with conntrack** (playable). InteractiveCanvas `net-m6-conntrack` (`[netlab]`). Shows: conntrack -L rows showing sport=41000 and the new port, generated from the model's state. Learner: run conntrack -L after the clash.
- Predict (right before beat 4, "Two devices, same port: one must change"): Both devices send from port 41000 to the same server. What does the server see: both ports change, only the second changes, or neither? Options: both change / only the second changes / neither changes. Answerable from: 5.2 taught that five numbers name a conversation; beats 1 to 3 showed the address rewrite with the port kept (as in 2.4); two identical sets of five numbers cannot both exist.
- Quick check (after the last beat): (1) Two devices send from different source ports: does anything change (taught in beat 4).
- Components: GlossaryTerm (NAT table, conntrack, masquerade); 1 Callout; one `GoDeeper` fold per beat; about 14 of 40 JSX tags; 2 of 3 assessments.
- Near miss: 'Other routers may differ': RFC 4787 says mapping must be endpoint-independent, but real routers vary and no measurement is sourced, so teach the requirement, not 'all routers do this' [S18]. The lab's limits line says the same. The new port is chosen by the kernel (one run gave 37613); never print one as the answer. Annotate one `conntrack -L` row: each row has two tuples (original and reply). Tested behaviour: address rewritten, port kept, rewritten only on a clash (dossier 5.6).

**6.3 Why the internet cannot reach your laptop** (Learn; reinforces address-kinds)
- Hook: a friend wants to open the website on your laptop at home and types your public address. What happens to their packet? Claim: two separate reasons stop it: the internet has no route to private ranges, and an unsolicited packet at the router has no mapping to translate; NAT is not a firewall, and a filter is a separate rule, which 6.8 builds.
- Example: friend at `198.51.100.77` sends to `203.0.113.45:8080`. No row, no rule: the router answers refused (tested, dossier 5.6). If the outside had a route `192.168.1.0/24` via the router, a packet addressed straight to `192.168.1.23` gets through (tested, dossier 5.6), so masquerade is not a firewall. Add a forward `203.0.113.1:8080` to `192.168.1.23:80` (tested), then a filter.
- Format (agent-ip v0.5.3): `format: beats`, 6 beats; at most 70 visible words per beat, 300 to 700 visible words in all and at least 900 with the `GoDeeper` folds (the claim and worked example above are spread over the beats and their folds); one visual per beat; at least one playable beat; at most 40 JSX tags and 3 assessment interactions; no BigWordAlert (terms use `GlossaryTerm`). The hook above is the chapter's one or two opening sentences.
- Beats:
  1. **A friend types your public address** (playable). InteractiveCanvas `net-m6-inbound-unsolicited` (`[netlab]`). Shows: a friend's packet reaches your router's outside address with no earlier outbound packet. Learner: send an inbound packet with no mapping.
  2. **No row, no rule: the router refuses** (fixed picture). MermaidDiagram `mmd-6-3-mapping-or-rule` (inline, no registration). Shows: inbound packet, mapping or rule? no, so the router answers connection refused; only an outbound packet or a forwarding rule creates a mapping.
  3. **With a route, the outside gets in** (playable). InteractiveCanvas `net-m6-route-leak` (`[netlab]`). Shows: with a route to 192.168.1.0/24 via the router, a packet addressed straight to 192.168.1.23 reaches the laptop. Learner: add or remove the route on the outside network.
  4. **A forwarding rule opens one port** (playable). InteractiveCanvas `net-m6-forward-rule` (`[netlab]`). Shows: 203.0.113.1:8080 forwarded to 192.168.1.23:80; other ports stay refused. Learner: add the rule and test two ports.
  5. **A filter is a separate rule** (playable). InteractiveCanvas `net-m6-filter-rule` (`[netlab]`). Shows: a forward-chain rule drops what you choose; NAT alone filters nothing. Learner: add the filter and retest.
  6. **docker run -p uses the same idea** (fixed picture). MermaidDiagram `mmd-6-3-docker-publish` (inline, no registration). Shows: docker run -p 8080:80 publishes a container port using NAT rules [S75].
- Predict (right before beat 3, "With a route, the outside gets in"): The outside network is given a route to your home range. A friend sends a packet straight to 192.168.1.23. Does it reach your laptop? Options: yes, it reaches the laptop / no, the router drops it / no, the address is private so it is lost on the way. Answerable from: 4.7 taught that a router with forwarding on forwards what it has a route for, and beat 2 showed that NAT adds no rule; the learner combines them.
- Quick check (after the last beat): (1) Which of three setups lets the packet in (taught in beats 3 to 5).
- Components: GlossaryTerm (port forwarding, firewall, filter rule); 1 Callout; one `GoDeeper` fold per beat; about 16 of 40 JSX tags; 2 of 3 assessments.
- Near miss: Do not claim that home routers always add a firewall. The chapter says NAT is not a firewall and a filter is a separate rule built in 6.8; the lab router has no filter until the learner adds one, so an unforwarded port is refused, and beat 2 shows the refusal so 6.8 and 7.7 can use it. Friend at `198.51.100.77` sends to `203.0.113.45:8080` (tested effects, dossier 5.6). `docker run -p` publishes a port using NAT rules [S75] (the source names no rule type).

**6.4 Carrier-grade NAT** (Learn)
- Hook: your router's page says its outside address is `100.72.14.9`, but websites see `203.0.113.45`. Who is the second router? Claim: a provider can run NAT too, with `100.64.0.0/10` on the link to customers [S11, S19]; a packet can be translated twice; an address in that block is one sign, not proof.
- Example: laptop `192.168.1.23` to home router outside `100.72.14.9` to provider NAT to public `203.0.113.45` to server `203.0.113.80`. Source at each stage: `192.168.1.23`, `100.72.14.9`, `203.0.113.45`. Dated evidence only: a study with data from 2014 to 2016 found CGN in over 92 percent of cellular networks [S34]; the 2026 share is UNVERIFIED. CGN must limit ports per subscriber and drop new flows rather than evict old ones [S19].
- Format (agent-ip v0.5.3): `format: beats`, 5 beats; at most 70 visible words per beat, 300 to 700 visible words in all and at least 900 with the `GoDeeper` folds (the claim and worked example above are spread over the beats and their folds); one visual per beat; at least one playable beat; at most 40 JSX tags and 3 assessment interactions; no BigWordAlert (terms use `GlossaryTerm`). The hook above is the chapter's one or two opening sentences.
- Beats:
  1. **The router's outside address is private** (fixed picture). VisualDiagram `net-m6-router-status-annotated` (annotated picture of real outputs). Shows: a router status page showing outside address 100.72.14.9 while websites see 203.0.113.45.
  2. **A second router rewrites it again** (playable). InteractiveCanvas `net-m6-cgnat-layers` (`[netlab]`). Shows: laptop 192.168.1.23, then 100.72.14.9 after the home router, then 203.0.113.45 after the provider NAT. Learner: inspect the packet at each stage.
  3. **A shared address is a sign, not proof** (fixed picture). MermaidDiagram `mmd-6-4-sign-not-proof` (inline, no registration). Shows: 100.64.0.0/10 on the router's outside address is one sign; a private 10.x hop in a trace can also mean a second home router.
  4. **Look for private hops in your own trace** (fixed picture). MermaidDiagram `mmd-6-4-own-trace` (inline, no registration). Shows: a recorded sample trace with two private home routers and a private provider hop; run yours on your own computer.
  5. **Providers ran out of addresses too** (fixed picture). MermaidDiagram `mmd-6-4-why-providers` (inline, no registration). Shows: the shortage from 2.1 again: providers share addresses across customers; a 2014 to 2016 study found CGN in over 92 percent of cellular networks [S34].
- Predict (right before beat 2, "A second router rewrites it again"): Your laptop reaches the server through two routers that both do NAT. How many times is the source address rewritten? Options: once / twice / never. Answerable from: 6.2 taught that each NAT router rewrites the source; beat 1 shows two routers.
- Quick check (after the last beat): (1) Read a router status line and a trace: is there a second NAT (taught in beats 1, 3 and 4).
- Components: GlossaryTerm (carrier-grade NAT, shared address, hop); 1 Callout; one `GoDeeper` fold per beat; about 14 of 40 JSX tags; 2 of 3 assessments.
- Near miss: A private `10.x` hop is a sign too; a recorded sample from dossier 5.5 (two private home routers, then a private hop inside the provider) shows that private hops can also mean a second home router. The 2026 share is UNVERIFIED: give dated evidence only [S34]. CGN must limit ports per subscriber and drop new flows rather than evict old ones [S19]. The trace runs on the learner's own computer, not the lab; hotspot learners use only the trace.

**6.5 NAT timeouts, keepalives and video calls** (Learn)
- Hook: your chat app sits untouched for an hour and messages stop arriving until you open it. What expired? Claim: a mapping is state with a timer; silence deletes it, and then an inbound packet is unknown and dropped; keepalives reset the timer; call apps use STUN to learn their outside address and a relay when that is not enough [S18, S20, S21, S51].
- Example: model numbers, labelled illustrative: idle timeout 300 s, keepalive every 120 s, server pushes at minute 60. UDP timers must not be under two minutes, five recommended [S18]. One cloud NAT gateway times out idle connections at 350 seconds and later packets get a reset; the fix is keepalives below that [S51]. STUN returns the address and port a peer sees, default port 3478 [S20]; ICE tries host, server-reflexive and relayed candidates [S21]. One box only.
- Format (agent-ip v0.5.3): `format: beats`, 5 beats; at most 70 visible words per beat, 300 to 700 visible words in all and at least 900 with the `GoDeeper` folds (the claim and worked example above are spread over the beats and their folds); one visual per beat; at least one playable beat; at most 40 JSX tags and 3 assessment interactions; no BigWordAlert (terms use `GlossaryTerm`). The hook above is the chapter's one or two opening sentences.
- Beats:
  1. **The chat app went quiet** (watch only). InteractiveCanvas `net-m6-scene-quiet-chat` (the `scene` renderer). Shows: a chat app sits untouched for an hour and messages stop arriving until the app is opened.
  2. **A mapping is a row with a timer** (fixed picture). MermaidDiagram `mmd-6-5-mapping-states` (inline, no registration). Shows: created, active (traffic resets the timer), expired, later packet dropped.
  3. **Quiet for an hour: the row is gone** (playable). InteractiveCanvas `net-m6-nat-idle-expire` (`[timeline]`). Shows: a model mapping with a 300 s idle timeout expires during a quiet hour and an inbound message is dropped. Learner: drag the quiet time.
  4. **Keepalives reset the timer** (playable). InteractiveCanvas `net-m6-nat-keepalive` (`[timeline]`). Shows: a keepalive every 120 s keeps the row alive; one slower than the timeout does not. Learner: set the keepalive interval.
  5. **Calls need STUN or a relay** (fixed picture). MermaidDiagram `mmd-6-5-stun-relay` (inline, no registration). Shows: STUN tells a peer its outside address and port (default port 3478 [S20]); when that is not enough a relay is used (ICE tries host, server-reflexive and relayed candidates [S21]).
- Predict (right before beat 3, "Quiet for an hour: the row is gone"): A chat app is quiet for an hour. The router's idle timeout is 5 minutes. A message arrives from the server. What happens? Options: it reaches the laptop / it is dropped / the router asks the laptop. Answerable from: 6.3 taught that an inbound packet with no mapping is not translated; beat 2 says a mapping is a row with a timer.
- Quick check (after the last beat): (1) Which keepalive interval is safe for a 350 s timeout (taught in beat 4).
- Components: GlossaryTerm (idle timeout, keepalive, STUN, relay); 1 Callout; MustRead (cloud NAT gateway page [S51], in a fold); one `GoDeeper` fold per beat; about 16 of 40 JSX tags; 2 of 3 assessments.
- Near miss: Model numbers are labelled illustrative: idle timeout 300 s, keepalive every 120 s. UDP timers must not be under two minutes, five recommended [S18]. One cloud NAT gateway times out idle connections at 350 seconds and later packets get a reset; the fix is keepalives below that [S51]. The lab router's `conntrack -L` shows its own timers: record the real output at G3 and quote it (29 seconds left on an unanswered UDP flow and 119 on a closed TCP flow were seen on 2026-10-26, dossier 5.8), never a Linux default from memory, and say that a different NAT has a different timer. RFC 6888 gives no TCP idle figure [S19].

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

Updated for agent-ip v0.5.3 (Learn chapters are visual-first beats). Per-chapter beats, predicts and quizzes are in each chapter block above and, with the density counts, in `interaction-map.yaml`. Counting rules from `audit-course.mjs`: a tag is any opening `<Component`; child tags (Step, TerminalLine, CompareColumn, TraceStep) count toward the total but not toward the 6 top-level names; quiz, predict and openquestion fences are free of tags and count as assessments; command output goes in plain code fences, not TerminalBlock.

Budgets by chapter type (sponsor decision at G2C, 2026-10-26, and `03-authoring-standards.md` → Visual-first Learn chapters):

- Learn: beats rules. Four to eight beats, one visual each, at most 70 visible words per beat, 300 to 700 visible words and at least 900 with `GoDeeper` folds, at least one playable beat, at most 40 JSX tags, at most 3 assessment interactions (one Predict before the key beat, one or two quiz questions at the end), no BigWordAlert.
- Read: one or two beats, at most 70 visible words each, depth in folds, no BigWordAlert.
- Build: at least 1,200 prose words; at most 6 top-level components and 25 JSX tags; a diagram; at most one BigWordAlert and only for a load-bearing term.
- Code, Lab and Gate: at least 700 prose words; same component and tag limits as Build; a Gate has no canvas and no new content.
- Check: quiz-only (three to five questions, one instrument), no canvas, no lesson text.

| Ch | Format | Components | JSX tags (est.) | Assessments | Text budget |
|---|---|---|---|---|---|
| 6.1 | beats (2) | 2 beat visuals (1 canvas, 1 diagram), GoDeeper x2, GlossaryTerm x2, Callout x1, LearningObjectives, Checklist | 9 | PREDICT, QUIZ | one or two beats, at most 70 words each |
| 6.2 | beats (5) | 5 beat visuals (4 canvas, 1 diagram), GoDeeper x5, GlossaryTerm x3, Callout x1 | 14 | PREDICT, QUIZ | at most 70 words a beat; 300 to 700, 900+ with folds |
| 6.3 | beats (6) | 6 beat visuals (4 canvas, 2 diagram), GoDeeper x6, GlossaryTerm x3, Callout x1 | 16 | PREDICT, QUIZ | at most 70 words a beat; 300 to 700, 900+ with folds |
| 6.4 | beats (5) | 5 beat visuals (1 canvas, 4 diagram), GoDeeper x5, GlossaryTerm x3, Callout x1 | 14 | PREDICT, QUIZ | at most 70 words a beat; 300 to 700, 900+ with folds |
| 6.5 | beats (5) | 5 beat visuals (3 canvas, 2 diagram), GoDeeper x5, GlossaryTerm x4, Callout x1, MustRead (in a fold) | 16 | PREDICT, QUIZ | at most 70 words a beat; 300 to 700, 900+ with folds |
| 6.6 | prose | codeexercise, MermaidDiagram, Callout | 5 | CODE | 700 prose words |
| 6.7 | prose | Steps, FileTree, MermaidDiagram, Callout, InteractiveCanvas (replay), Checklist | 18 | none | 1,200 prose words |
| 6.8 | prose | Steps, FileTree, MermaidDiagram, Callout, InteractiveCanvas (replay), Checklist | 18 | none | 1,200 prose words |
| 6.9 | prose | InteractiveCanvas (lab), MermaidDiagram, Checklist | 5 | lab checks | 700 prose words |
| 6.10 | prose | none | 0 | QUIZ x5 | quiz only |
| 6.11 | prose | Checklist, LearningLog, ChapterRecap, openquestion | 4 | OPEN_QUESTION | 700 prose words |

`LearningObjectives` in 6.1, `ChapterRecap` in 6.11. One MustRead (the cloud NAT gateway page [S51]) sits in a 6.5 fold. Fictional public addresses use only the documentation ranges, with a visible note in 6.1 (decision 11).

Diagram plan: Beat diagrams: the second look at the learner's two numbers (6.1), the reply path through the row (6.2), mapping-or-rule and Docker's published port (6.3), sign-not-proof, the learner's own trace and why providers share too (6.4), the mapping's states and the STUN or relay choice (6.5). Code and Build chapters (6.6, 6.7, 6.8) and the Lab (6.9) each get a Mermaid diagram, added in this revision because the audit requires a diagram in every chapter that is not a Check or Gate.

Changes to the earlier plan in this revision (interaction designer, G3):

- 6.6: Added a MermaidDiagram and dropped TerminalBlock (audit: a diagram in every chapter that is not a Check or Gate; command output goes in plain code fences).
- 6.7: Added a MermaidDiagram and dropped TerminalBlock to stay at six top-level components (audit: a diagram in every chapter that is not a Check or Gate).
- 6.8: Added a MermaidDiagram and dropped TerminalBlock to stay at six top-level components.
- 6.9: Added a MermaidDiagram (audit: a diagram in every chapter that is not a Check or Gate).

## Canvases

Canvas decisions (interaction designer, G3):

- NAT is the module's causal model and the course question, so every claim about the table, an inbound packet and two layers of NAT is a `[netlab]` home router, NAT, filter, provider NAT and inspector beat (slice 2) in beat mode, one slug per claim; Mermaid carries only fixed relationships.
- 6.5 uses the new `[timeline]` model, which needs the seconds-to-hours renderer change, with one draggable control per playable beat (quiet time, keepalive interval); the fallback is a worked-example table plus a Predict (roadmap v3.1).
- 6.7 and 6.8 keep a `[replay]` each in a phone-only section; 6.9 is a graded `[netlab]` fault-mode lab (`net-lab-reach-home-server`, three levels).
- 6.1 is a Read chapter with one netlab beat (the server sees one address) and one Mermaid beat that returns to the learner's own 1.1 numbers.

Slugs follow the registry convention `net-m<module>-<name>` (graded labs keep `net-lab-`) and are proposed: none is written into a chapter until it is built and registered. The full registry with modes and chapters is in `interaction-map.yaml`. Fallbacks are named per chapter below the table.

| Slug (proposed) | Renderer | Chapter, beat | Mode | What it shows |
|---|---|---|---|---|
| `net-m6-home-router-first-look` | [netlab] | 6.1, beat 1 | playable | fifteen devices 192.168.1.20 to .34 each open a connection to 203.0.113.80; the server logs 203.0.113.45 fifteen times |
| `net-m6-nat-rewrite` | [netlab] | 6.2, beat 1 | playable | a packet from 192.168.1.23 leaves the router with the router's outside address as its source |
| `net-m6-nat-table-fills` | [netlab] | 6.2, beat 2 | playable | the NAT table gains a row each time a device opens a connection |
| `net-m6-nat-clash` | [netlab] | 6.2, beat 4 | playable | laptop and phone both send from 41000 to 203.0.113.80:8080; the laptop keeps 41000, the phone gets another port |
| `net-m6-conntrack` | [netlab] | 6.2, beat 5 | playable | conntrack -L rows showing sport=41000 and the new port, generated from the model's state |
| `net-m6-inbound-unsolicited` | [netlab] | 6.3, beat 1 | playable | a friend's packet reaches your router's outside address with no earlier outbound packet |
| `net-m6-route-leak` | [netlab] | 6.3, beat 3 | playable | with a route to 192.168.1.0/24 via the router, a packet addressed straight to 192.168.1.23 reaches the laptop |
| `net-m6-forward-rule` | [netlab] | 6.3, beat 4 | playable | 203.0.113.1:8080 forwarded to 192.168.1.23:80; other ports stay refused |
| `net-m6-filter-rule` | [netlab] | 6.3, beat 5 | playable | a forward-chain rule drops what you choose; NAT alone filters nothing |
| `net-m6-cgnat-layers` | [netlab] | 6.4, beat 2 | playable | laptop 192.168.1.23, then 100.72.14.9 after the home router, then 203.0.113.45 after the provider NAT |
| `net-m6-scene-quiet-chat` | the scene renderer | 6.5, beat 1 | watch only | a chat app sits untouched for an hour and messages stop arriving until the app is opened |
| `net-m6-nat-idle-expire` | [timeline] | 6.5, beat 3 | playable | a model mapping with a 300 s idle timeout expires during a quiet hour and an inbound message is dropped |
| `net-m6-nat-keepalive` | [timeline] | 6.5, beat 4 | playable | a keepalive every 120 s keeps the row alive; one slower than the timeout does not |
| `net-m6-replay-masquerade` | replay | 6.7 (phone-only section) | replay | predict each command's output, then see the recorded result from the reference run |
| `net-m6-replay-forward-guest` | replay | 6.8 (phone-only section) | replay | predict each command's output, then see the recorded result from the reference run |
| `net-lab-reach-home-server` | netlab (graded lab) | 6.9 | lab | fault mode, three levels: forward a port after an injected fault; two servers on port 80; provider NAT stops forwarding |

Inline diagram beats (MermaidDiagram, VisualDiagram, TraceRequest; no registration): 6.1 beat 2 `mmd-6-1-two-numbers-again`; 6.2 beat 3 `mmd-6-2-reply-path`; 6.3 beat 2 `mmd-6-3-mapping-or-rule`; 6.3 beat 6 `mmd-6-3-docker-publish`; 6.4 beat 1 `net-m6-router-status-annotated`; 6.4 beat 3 `mmd-6-4-sign-not-proof`; 6.4 beat 4 `mmd-6-4-own-trace`; 6.4 beat 5 `mmd-6-4-why-providers`; 6.5 beat 2 `mmd-6-5-mapping-states`; 6.5 beat 5 `mmd-6-5-stun-relay`.

Stated limits and fallbacks by chapter:

- 6.1: limit: Linux-style NAT only. Fallback if not built: [sequence] phone, laptop, router, server, Predict before the key beat only, within the chapter's budget of 3 assessments (exception). Needs netlab slice 2.
- 6.2: limit: Linux masquerade; other routers differ (limits line). Fallback if not built: [sequence] phone, laptop, router, server. Needs netlab slice 2.
- 6.3: limit: No router firewall modelled. Fallback if not built: [sequence] friend, router, laptop. Needs netlab slice 2.
- 6.4: limit: One provider layer, no port limits shown. Fallback if not built: [sequence] laptop, home router, provider NAT, server. Needs netlab slice 2.
- 6.5: limit: Model timers (300 s, 120 s), not a real router's. Fallback if not built: a worked-example table of the mapping timeline plus a Predict (roadmap v3.1).
- Replays and labs: a replay falls back to a `[sequence]` of two actors (learner, lab) with Predict blocks before the key steps only, within the chapter's budget of 3 assessments; a graded lab that is blocked falls back to a diagnosis from recorded command output, graded as a quiz (roadmap).

All netlab beats need slice 2 (NAT, home router, provider NAT); the filter comes from slice 1. If slice 2 is late, the Learn chapters fall back to `[sequence]` with one Predict before the key beat.

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
6. 6.1 at 10 minutes and the prose floor for Read, Code and Lab: resolved by the proposed course exception (700 words; Learn and Build keep 1,200); decided by the sponsor at G2C on 2026-10-26 and, for Learn and Read chapters, superseded by the beats rules of agent-ip v0.5.3.

## Still open

- Verify at G3 (untested): the 6.5 timer column and the real `conntrack -L` timers; `curl --local-port 41000` for fixing a source port (6.7); the exact `nft` DNAT syntax (6.8); the guest-to-home block giving exit 28 (6.8); `conntrack -L` and `curl` output from the lab generator.
- Prose floors are decided (sponsor, G2C, 2026-10-26): Build 1,200 prose words; Code, Lab and Gate 700; Learn and Read follow the beats rules (agent-ip v0.5.3, decision log 2026-10-26); Check chapters are quiz-only.
