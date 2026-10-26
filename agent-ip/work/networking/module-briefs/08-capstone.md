---
artifact: module-brief
course: networking
module: 08-capstone
version: 2
owner: curriculum-architect
roadmap_version: 3.1
roadmap_confirmed: true
agent_ip_version: 0.5.3
---

# Module 08: Capstone: a whole internet on one laptop

Source IDs such as [S28] point to the source table in `01-research-dossier.md`. "Dossier 5.5", "5.6" and "5.7" are the three environment tests. Anything marked "untested, verify at G3" is not in a dossier test and must be run before a writer states it as fact.

## Outcome

The learner has a repository that builds a complete small internet from Linux namespaces and proves it with tests: a home subnet and a guest subnet behind a router that does NAT, one forwarded port, DHCP and DNS, a provider router, and a "public" web server. They have broken it with a seeded fault script, found each fault with commands, fixed it and written down what they saw. They explain it in a recorded five-minute demo and defend it against three mentor probes.

Roadmap outcomes served: O1 (demo 8.7), O6 (capstone part 4, 8.5) and O7 (capstone 8.2 to 8.5).
Opening question, unchanged: *You press Enter on a link. Before the page appears, your laptop has already used almost everything in this course. Can you name every step?*

## Why this module exists

Modules 1 to 7 each gave one piece: addresses, subnets, routes, ports, NAT, DHCP and DNS. A learner who can only do the pieces one at a time cannot yet debug a network, because real faults cross pieces. The capstone makes them join the pieces into one network, then makes the network fail and asks them to find the failure from evidence. It is also the course's portfolio piece: mentors judge the repository and the demo, not a quiz.

## Prerequisites

Concepts, by the identifiers in `timeline.yaml`:

- `dhcp` (7.2), `dns-resolution` (7.3), `napt` (6.2), `tcp` (5.4), `lpm` (4.3), `arp` (3.3): all six are used in 8.1.
- `ip-forwarding` (4.7), `address-plan` (3.10): used in 8.2.
- `nft-dnat-filter` (6.8), `nft-masquerade` (6.7): used in 8.3. `dnsmasq` (7.6): used in 8.4.
- `layered-diagnosis` (7.5), `diagnose-nat` (6.9): used in 8.5.

Artifacts:

- The learner's own scripts from challenge 2 (router), challenge 4 (home router) and challenge 5 (DHCP and DNS) in their `networking-challenges` repository. They are the starting point for challenge 6: part 1 (8.2) starts from challenges 2 and 4, part 3 (8.4) from challenge 5.
- `toolkit/restore.sh N.P`. `restore.sh 4.2` and `restore.sh 5.1` rebuild earlier work; `restore.sh 6.1`, `6.2` and `6.3` rebuild the end of capstone parts 1 to 3 (tested for every capstone part before publish, roadmap).
- A clean lab: every script tears down what it built before it starts, so a rerun after a mistake is safe. Scripts run with `bash script.sh` and stop with a plain message on Windows line endings.
- Netlab slice 3 for 8.1 (fallback in "Canvases").
- A screen recorder (any) for 8.7. No download is mandated.

Repair path: a learner who skipped challenge 5 uses `restore.sh 5.1` and reads the reference config before 8.4.

## The capstone network (shared by 8.2 to 8.5)

Address plan. Addresses marked "dossier" were run; the rest are proposed and checked at G3. Public-looking addresses come only from the documentation ranges [S10]; `192.0.2.0/24` stays unused. Namespace names are proposed.

| Link | Subnet | Addresses |
|---|---|---|
| Home LAN | `192.168.1.0/24` | home router `192.168.1.1` (`hrouter`); static home web server `192.168.1.20` (`homeweb`); DHCP pool `192.168.1.100` to `192.168.1.150`; devices `home1`, `home2` |
| Guest LAN | `192.168.50.0/24` | home router `192.168.50.1`; pool `192.168.50.100` to `192.168.50.150`; device `guest1` (`192.168.50.10` in dossier 5.6) |
| Home router to provider | `198.51.100.0/30` | home router outside `198.51.100.2` (dossier 5.7); provider router `198.51.100.1` (`prouter`, proposed) |
| Public side | `203.0.113.0/24` | provider router `203.0.113.1` (proposed); public web server `203.0.113.80` (`server`, dossier 5.5 to 5.7), port 8080, answers with the address and port it sees (busybox CGI, dossier 5.6) |

- Until part 3, `home1` and `guest1` use static placeholders (`192.168.1.30`, `192.168.50.30`) outside the pools.
- The name `web.test` resolves to `203.0.113.80` (dossier 5.5, 5.6).
- The forwarded port: `198.51.100.2:8080` to `192.168.1.20:80`. Dossier 5.7 tested forwarding across a provider router.
- Default TTL is 64 [S28]; each router lowers it by at least one [S30].

Capstone fault matrix (published to learners as a menu of symptoms and finders; the seed draws three, and the draw stays hidden until the write-up). Commands use proposed namespace and interface names (`<out>` is the home router's outside interface). Every symptom is marked tested (dossier section) or "verify at G3".

| ID | Fault | Injection command | Symptom the learner sees | Command that finds it | Not combined with |
|---|---|---|---|---|---|
| F1 | Wrong mask on the static web server | `ip -n homeweb addr flush dev <web-if>`, then `ip -n homeweb addr add 192.168.1.20/28 dev <web-if>` | From `homeweb`, `ping 192.168.1.1` prints `Network is unreachable` at once; from `hrouter`, `ping 192.168.1.20` is silent loss with the ARP request visible on `homeweb` (dossier 5.7, same shape with other addresses). Forwarded port from `server` hangs (verify at G3) | `ip -n homeweb addr` (prefix is `/28`), `ip -n homeweb route`, ping from both sides | F2, F3, F7 |
| F2 | Forwarding off on the home router | `ip netns exec hrouter sysctl -w net.ipv4.ip_forward=0` (default is 0 [S28]) | `home1` reaches `192.168.1.1` but `curl http://203.0.113.80:8080/` hangs; `tcpdump` shows the SYN arriving inside and nothing leaving outside (verify at G3) | `ip netns exec hrouter sysctl net.ipv4.ip_forward`, `tcpdump -n` on both router interfaces | F1, F3, F5, F7 |
| F3 | Default route missing on the home router | `ip -n hrouter route del default` | `home1` gets `Destination Net Unreachable` from `192.168.1.1`; `curl` fails at once (dossier 5.7) | `ip -n hrouter route`, `ip -n hrouter route get 203.0.113.80` (output untested, verify at G3), the sender named in the ping error | F1, F2, F5 |
| F4 | DNS port blocked on the home router | In `hrouter`: an `input` chain with `udp dport 53 drop` and `tcp dport 53 drop` (untested, verify at G3) | Leases still work (DHCP uses ports 67 and 68 [S23]); `dig @192.168.1.1 web.test` times out; `curl http://web.test:8080/` cannot resolve; `curl http://203.0.113.80:8080/` works (all verify at G3) | `curl` by address then by name, `dig @192.168.1.1 web.test`, `nft list ruleset` in `hrouter`, `tcpdump -n` on port 53 | F6 |
| F5 | Masquerade rule missing | Delete only the masquerade rule from `postrouting` by handle (`nft -a list chain ip nat postrouting`, then `nft delete rule ...`) so the DNAT rule survives | `curl http://203.0.113.80:8080/` from `home1` hangs; a capture on the home router's outside interface shows a private source (`192.168.1.x`) leaving and no reply (verify at G3) | `tcpdump -n -i <out>` in `hrouter`, `nft list ruleset`, `conntrack -L` | F2, F3 |
| F6 | DHCP pool too small for a new device | Restart dnsmasq with `192.168.1.100,192.168.1.101`, fill it with `home1` and `home2`, then add `home3` | `udhcpc -n -q -t 3 -T 1` in `home3` ends after about 3 seconds with no address (the no-server behaviour, dossier 5.6; exhausted pool verify at G3) | `ip -n home3 addr`, `tcpdump -n port 67 or port 68` (DISCOVER, no OFFER), the lease file | F4 |
| F7 | Guest isolation rule missing | Delete the guest-to-home drop rule from the `forward` chain by handle | Nothing visibly breaks; the test that must fail now passes: `guest1` reaches `192.168.1.20` (rule present is dossier 5.6; rule absent verify at G3) | the guest-to-home test, `nft list chain ip filter forward` | F1, F2 |

How the seed works: `bash break.sh SEED` hashes the seed to three distinct faults and redraws until no pair is in the "Not combined with" column. The reasons are that F2, F3 and F5 break the same home-to-server path and hide each other; F1 and F7 are masked when the web server or the forward path is already broken; F4 and F6 cannot both be seen from a device that has no lease. `--list` shows the draw to the mentor; the learner sees it only at the write-up. The seed goes in the write-up so a mentor can reproduce the run.

## Chapters

| # | Chapter | Type | Min | Outcome | Requires | Introduces | Evidence |
|---|---|---|---|---|---|---|---|
| 8.1 | What really happens when you open a link | Learn | 30 | Step through every packet from the lease to the first byte: DNS, ARP, gateway, NAT, routes, TCP. The lab page is plain HTTP; a real browser adds TLS and often QUIC, which the system design course covers | dhcp, dns-resolution, napt, tcp, lpm, arp | full-journey | netlab check |
| 8.2 | Capstone part 1: addresses and routes | Build | 60 | Starting from your own scripts from challenges 2 and 4, build the home and guest subnets, the router, a provider router and a public web server; tests prove each path | ip-forwarding, address-plan, full-journey | capstone-network (reinforces lpm) | capstone part 1 tests |
| 8.3 | Capstone part 2: NAT, forwarding and isolation | Build | 45 | Add masquerade, one forwarded port and the guest rule; tests prove what must work and what must not | capstone-network, nft-dnat-filter | none (reinforces nft-masquerade) | capstone part 2 tests |
| 8.4 | Capstone part 3: DHCP and DNS | Build | 45 | Starting from your challenge 5 config, leases and names for both subnets; tests prove both | capstone-network, dnsmasq | none (reinforces dhcp) | capstone part 3 tests |
| 8.5 | Capstone part 4: break it, fix it | Build | 60 | Run the fault script (seeded, from a published fault matrix); find each fault with commands and write what you saw | capstone-network, layered-diagnosis, diagnose-nat | fault-diagnosis | fault write-up |
| 8.6 | Final check | Check | 20 | Five questions that each combine two or more modules, before the demo | full-journey | none (reinforces subnet-calc, lpm, napt, dns-resolution) | final quiz |
| 8.7 | Demo and defence | Gate | 60 | Record a five-minute demo from the template and answer three mentor probes | fault-diagnosis, capstone-network | none (reinforces napt, conntrack) | recorded demo and probes |

Total 320 core minutes. Slow path 438 (8.2: 90, 8.3: 70, 8.4: 70, 8.5: 90).

The roadmap's "Problem first" column is filled only for 8.1. The static home web server `homeweb` is accepted in roadmap v3.1 as the forwarded port's target and the "wrong mask" fault's device. For the Build chapters the hook below is derived from the capstone's purpose.

### 8.1 What really happens when you open a link (Learn, 30 min) `08.01-what-happens-when-you-open-a-link.md`
- Hook (roadmap): you press Enter. What happens before the first byte of the page arrives?
- Claim: opening a link is not one event but ten small steps in a fixed order, and each is something the learner has already built or measured. When one step breaks, the symptom names it.
- Worked example, with capstone numbers: (1) lease: `home1` goes from no address to `192.168.1.101/24`, gateway and DNS `192.168.1.1`, one hour; (2) ARP for `192.168.1.1`; (3) DNS: `web.test` answers `203.0.113.80`; (4) `203.0.113.80` is outside `192.168.1.0/24`, so use the gateway; (5) SYN leaves with destination IP the server and destination MAC the router; (6) home router: forwarding on, longest prefix is the default route via `198.51.100.1`, TTL 64 to 63, source rewritten to `198.51.100.2` (port kept unless it clashes, dossier 5.6); (7) provider router: connected route, TTL 62; (8) server sees `198.51.100.2` and TTL 62, answers; (9) the reply returns through the router's mapping (read it with `conntrack -L`); (10) the handshake finishes, the GET is sent, the first byte arrives. TTL values are derived from [S28, S30], not captured. Plain HTTP only; TLS and QUIC belong to the system design course.
- Format (agent-ip v0.5.3): `format: beats`, 7 beats; at most 70 visible words per beat, 300 to 700 visible words in all and at least 900 with the `GoDeeper` folds (the claim and worked example above are spread over the beats and their folds); one visual per beat; at least one playable beat; at most 40 JSX tags and 3 assessment interactions; no BigWordAlert (terms use `GlossaryTerm`). The hook above is the chapter's one or two opening sentences.
- Beats:
  1. **Pressing Enter starts ten small steps** (fixed picture). MermaidDiagram `mmd-8-1-ten-steps` (inline, no registration). Shows: lease, ARP, DNS, gateway decision, SYN, home router, provider router, server, reply, first byte, each labelled with the module that explained it.
  2. **A lease, then the router's MAC** (step through). InteractiveCanvas `net-m8-journey-lease-arp` (`[netlab]`). Shows: home1 goes from no address to 192.168.1.101/24 with gateway and DNS 192.168.1.1, then asks ARP for 192.168.1.1. Learner: step through steps 1 and 2.
  3. **The name becomes an address** (step through). InteractiveCanvas `net-m8-journey-dns` (`[netlab]`). Shows: web.test is asked of the router's resolver and answers 203.0.113.80. Learner: step through step 3.
  4. **Off my subnet: use the gateway** (step through). InteractiveCanvas `net-m8-journey-gateway` (`[netlab]`). Shows: 203.0.113.80 is outside 192.168.1.0/24, so the SYN leaves with the server's IP and the router's MAC. Learner: step through steps 4 and 5.
  5. **The home router changes the packet** (playable). InteractiveCanvas `net-m8-journey-nat-hop` (`[netlab]`). Shows: forwarding on, default route via 198.51.100.1, TTL 64 to 63, source rewritten to 198.51.100.2 (port kept unless it clashes). Learner: tap each header field to see before and after.
  6. **The row sends the reply home** (step through). InteractiveCanvas `net-m8-journey-reply` (`[netlab]`). Shows: provider router TTL 62, the server sees 198.51.100.2, and the reply returns through the mapping (conntrack -L). Learner: step through steps 7 to 9.
  7. **The handshake ends and the page arrives** (step through). InteractiveCanvas `net-m8-journey-first-byte` (`[netlab]`). Shows: the three-way handshake finishes, the GET is sent and the first byte arrives; a real browser adds TLS and often QUIC (system design course). Learner: step through step 10.
- Predict (right before beat 5, "The home router changes the packet"): At the home router, which of source IP, destination IP, destination MAC, TTL and source port change? Options: source IP, destination MAC and TTL always; the source port only on a clash / all five always / only the source IP. Answerable from: 4.2 taught the MAC change, 4.4 the TTL, 6.2 the rewrite and the clash; beats 2 to 4 have shown the packet arriving at the router.
- Quick check (after the last beat): (1) Which step fails when the router's default route is removed (step 6, Destination Net Unreachable) (taught in beats 4 and 5).
- Components: GlossaryTerm (lease, gateway, conntrack); 1 Callout; LearningObjectives; one `GoDeeper` fold per beat; about 19 of 40 JSX tags; 2 of 3 assessments.
- Near miss: Thinking the server's MAC appears in the learner's capture, or that DNS comes after the TCP connection. TTL values are derived from [S28, S30], not captured; two routers gives 62 (dossier 5.8). Plain HTTP only; TLS and QUIC belong to the system design course. In the fallback only one Predict (before the NAT beat) is kept, so the chapter stays within 3 assessments.

### 8.2 Capstone part 1: addresses and routes (Build, 60 min) `08.02-capstone-addresses-routes.md`
- Hook (derived): your scripts from challenges 2 and 4 each built a piece. Join them into one network with its own address plan.
- Claim: every link needs its own subnet, and the home router has three interfaces on three subnets. With routes alone, packets reach the server but replies cannot come back: that is why NAT exists.
- Worked example: the address plan above; `ip route get 203.0.113.80` on `home1` (via `192.168.1.1`) and on `hrouter` (via `198.51.100.1`).
- Diagram: MermaidDiagram topology of the capstone network with subnets and interface addresses. Claim: three subnets on the home router, a `/30` link to the provider, one public subnet. Later chapters reuse it and do not redraw it.
- Interactive: `[replay]` (phone readers). Predict first: before NAT exists, `home1` pings the server; reply or silence? Correct: silence (the server's reply has no route to `192.168.1.0/24`; the shape is dossier 5.6, the full case verify at G3).
- Assessment: one PREDICT; the part's tests are the evidence. Near miss: forgetting the provider router's connected route to `198.51.100.0/30`, or forwarding left off.

#### 8.2 build details
- Challenge part: challenge 6, `challenges/challenge-6-capstone/part-1-addresses-and-routes/`. Support: open with hints (roadmap scaffolding table); the learner's earlier scripts are the starting point. Part 1 starts from challenges 2 and 4; DHCP and DNS enter only in 8.4, which starts from the challenge 5 config.
- Must pass: `home1` pings `192.168.1.1`; `guest1` pings `192.168.50.1`; `hrouter` pings `203.0.113.80` (the server sees `198.51.100.2`, dossier 5.7); `ip route get 203.0.113.80` picks the gateway on `home1` and on `hrouter`; `traceroute -n` from `hrouter` shows `198.51.100.1` then the server (the two-hop shape is dossier 5.5; the three-line capstone case verify at G3).
- Must fail: `home1` ping to `203.0.113.80` gets no reply (no NAT yet; verify at G3).
- Captured output to commit in `results.md`: `ip addr` and `ip route` for each router namespace; a `tcpdump -n` on the home router's outside interface during the failing ping, showing the private source leaving.
- Hint ladder: (1) which subnet does each link need? (2) which namespace is missing a route? (3) `ip route add` shape with placeholders; (4) the exact commands. Stuck diagnostic: `ip route get <destination>` in each namespace in order, then `ping` hop by hop, then `sysctl net.ipv4.ip_forward` in each router. Fallback: `toolkit/restore.sh 6.1` is the end state, to start part 2 anyway.
- Slow path: 90 minutes. Phone-only: replay plus the reference `results.md`.

### 8.3 Capstone part 2: NAT, forwarding and isolation (Build, 45 min) `08.03-capstone-nat-forwarding-isolation.md`
- Hook (derived): the server cannot see your replies and your guest can see your home. Fix both.
- Claim: masquerade makes every device appear as one address, a forwarding rule makes one port reachable from outside, and a forward-chain rule keeps guests from home. Together they are what a home router does.
- Worked example: `home1` and `guest1` both curl the server, which reports `198.51.100.2` and a port (the port is the same only if it does not clash, dossier 5.6, so tests never assert the port); `server` curls `198.51.100.2:8080` and gets the home web page.
- Diagram: none; reuse the 8.2 topology.
- Interactive: `[replay]`. Predict first: `server` connects to `198.51.100.2:22` with nothing listening; refused or timeout? Correct: refused (dossier 5.6).
- Assessment: one PREDICT. Near miss: expecting masquerade to block inbound traffic; it does not (dossier 5.6: with a route, the connection to the laptop succeeded). The isolation rule is a filter, not NAT.

#### 8.3 build details
- Challenge part: challenge 6 part 2, `part-2-nat-forwarding-isolation/`. Support: open with hints. Start: `restore.sh 6.1` or the learner's part 1.
- Must pass: `home1` and `guest1` curl `http://203.0.113.80:8080/` and the server reports `198.51.100.2`; `server` curls `http://198.51.100.2:8080/` and gets the home web page across the provider router (dossier 5.7); `conntrack -L` in `hrouter` lists the connection (dossier 5.6).
- Must fail: `guest1` to `192.168.1.20` is blocked (dossier 5.6); `server` to `192.168.1.20` fails at once (no route, dossier 5.6); `server` to `198.51.100.2:22` is refused (dossier 5.6).
- Captured output: `tcpdump -n` on both router interfaces for one `home1` curl (inside `192.168.1.x` to the server, outside `198.51.100.2` to the server) and the `conntrack -L` line. These feed the demo.
- Hint ladder: (1) which hook do the NAT rules use, and which chain does the isolation rule need? (2) which test names the missing rule? (3) rule shape with placeholders (nft table `nat`, chain `postrouting`, as in [S43]); (4) the exact rules. Stuck diagnostic: `nft list ruleset` in `hrouter`, then `tcpdump` on the outside interface to see which source address leaves. Fallback: `restore.sh 6.2`.
- Slow path: 70 minutes. Phone-only: replay plus the reference `results.md`.

### 8.4 Capstone part 3: DHCP and DNS (Build, 45 min) `08.04-capstone-dhcp-dns.md`
- Hook (derived): typing addresses into every device does not scale. Give both subnets leases and names.
- Claim: one program in the router namespace serves both subnets, each with its own pool, router and DNS option, and the guest can still ask the router for names even though forwarding to home is blocked.
- Worked example: home pool `192.168.1.100` to `192.168.1.150`, guest pool `192.168.50.100` to `192.168.50.150`; `home1` leases an address, then `curl http://web.test:8080/`; `guest1` does the same and the server reports `198.51.100.2`.
- Diagram: none; the topology stays the 8.2 diagram.
- Interactive: `[replay]`. Predict first (reworded at G3, never ask before you teach): the guest-to-home rule drops packets from `192.168.50.0/24` to `192.168.1.0/24`; a guest asks the router at `192.168.50.1` for a name: does the rule match that packet? Correct: no, the destination is the router itself (verify at G3). The forward-chain explanation follows in the chapter.
- Assessment: one PREDICT. Near miss: asking whether a guest that can ping `192.168.1.1` is isolated; that address is the router itself, not the home subnet (verify at G3).

#### 8.4 build details
- Challenge part: challenge 6 part 3, `part-3-dhcp-and-dns/`. Support: open with hints; start from the learner's challenge 5 config. One dnsmasq with two ranges versus two instances is untested, verify at G3; the brief assumes the reference solution picks one and the hint ladder names it.
- Must pass: `home1` and `home2` lease addresses in the home pool and `guest1` in the guest pool (`busybox udhcpc -n -q -t 3 -T 1`, dossier 5.6); `curl http://web.test:8080/` works from `home1` and `guest1` through `/etc/netns/<ns>/resolv.conf` (dossier 5.6).
- Must fail: with dnsmasq stopped, a new device gets no address in about 3 seconds (dossier 5.6); `dig @192.168.1.1 nosuch.test` returns no answer (status untested, verify at G3).
- Captured output: the lease lines for both subnets, one `tcpdump -n` of ports 67 and 68, the `dig` answer.
- Hint ladder: (1) one range per subnet; (2) which interface does each range need? (3) the line shape; (4) the exact lines. Stuck diagnostic: `ss -ulnp` in `hrouter` (untested, verify at G3), then `tcpdump` while the client asks. Fallback: `restore.sh 6.3` is the end state of this part.
- Slow path: 70 minutes. Phone-only: replay plus the reference `results.md`.

### 8.5 Capstone part 4: break it, fix it (Build, 60 min) `08.05-capstone-break-fix.md`
- Hook (derived): your network works. Someone has changed three things. Find them from evidence.
- Claim: a fault is found by working down the layers in order, not by guessing; the first failing check names the layer, and a fix is proven by the earlier tests passing again.
- Worked example: one fully worked demonstration seed (marked "not valid for your write-up"): F3 found with `ping` (`Destination Net Unreachable` from `192.168.1.1`), `ip -n hrouter route`, and the fix `ip -n hrouter route add default via 198.51.100.1`.
- Diagram: none; the fault matrix table is the reference.
- Interactive: `[replay]` of the demonstration seed. No Predict fence here (the write-up is the evidence and a PREDICT mid-diagnosis would break the flow).
- Assessment: none in fences; the write-up is read at the gate. Near miss: fixing a symptom (a stray route) instead of the cause, or combining fixes so the learner cannot say which one worked.

#### 8.5 build details
- Challenge part: challenge 6 part 4, `part-4-break-and-fix/`. Support: open with hints. Script: `break.sh SEED` and the published `faults.md`.
- Must pass: after the fixes, the part 1, 2 and 3 test sets all pass from the same run.
- Must fail: right after injection, at least one earlier test fails for each injected fault, and the failure message matches the matrix's symptom (not a different error).
- Captured output: `fault-writeup.md` with the seed, and for each fault the exact symptom output, the command that found it with its output, the fix command, and the test re-run. Every command in it is one the learner ran (production requirement).
- Hint ladder: (1) which layer fails first in the 7.5 order? (2) which row of the matrix has that symptom? (3) the finder command; (4) the fix. Stuck diagnostic: `ip addr`, `ip route get`, `ping` the gateway then a public address, `curl` by address then by name, `tcpdump -n` on both sides of `hrouter`, `nft list ruleset`, `conntrack -L`. Fallback: `restore.sh 6.3` rebuilds the healthy network if the learner broke more than was injected.
- Slow path: 90 minutes. Phone-only: the replay and the demonstration write-up.

### 8.6 Final check (Check, 20 min) `08.06-final-check-quiz.md`
- Hook, claim: none (quiz only; plain quiz fences, no canvas). Roadmap v3.1: five questions that each combine two or more modules. The Check type allows three to five questions and seven modules come before this one, so each of the five touches more than one module.
- Questions: (1) modules 2 and 3: an office VPN uses `192.168.1.128/25`; does it overlap the home subnet; (2) modules 1 and 4: which fields change at a router (MAC, TTL) and which stay (IPs); (3) modules 5 and 6: two devices send from the same source port; what does the server see; (4) module 7: `dig` times out while `ping 203.0.113.80` works; which layer; (5) modules 4, 6 and 7: a new device has a lease and a gateway but cannot reach the server; which command first and why.
- Near miss: option length and position balanced; no question answered by the longest option.

### 8.7 Demo and defence (Gate, 60 min) `08.07-gate-demo-defence.md`
- Hook (derived): you built it. Now show it in five minutes and defend it.
- Claim: understanding shows in being able to point at your own capture and say why the server sees one address.
- Worked example: the demo template and the mentor rubric below; one filled example from the reference solution.
- Diagram, interactive: none (gate). Assessment: one OPEN_QUESTION with `submissionMode: video_demo`; link-only answers need `minWords: 0`.
- The three probes arrive as the mentor's feedback and the learner answers by resubmitting; count that time (about 20 of the 60 minutes). Near miss: reading the script instead of showing it, or running a real-internet command in the lab (the lab cannot show the real path, dossier 5.5).

## Demo template

Five minutes, screen recording with voice. Label every command "On your computer" or "In the lab". Template file in the learner's repository: `demo-template.md`.

| Time | Show | Say |
|---|---|---|
| 0:00 to 0:40 | The address plan table and `ip addr` for the home router | Each subnet and why that size; where the pool sits |
| 0:40 to 1:30 | A device getting its lease (`udhcpc` output, the lease line) | What the lease contained; where the name comes from |
| 1:30 to 3:30 | One `curl` from `home1` to `203.0.113.80:8080` with captures on both sides of the router, and the `conntrack -L` line | Inside source, outside source, whether the port changed and why |
| 3:30 to 4:40 | One injected fault: seed, symptom, the command that found it, the fix | Which layer, and why you looked there first |
| 4:40 to 5:00 | Your answer to the course question | Why home devices reach the internet without public addresses |

## Mentor rubric (8.7)

Under 30 minutes: about 3 minutes on the plan, 6 on the network, 5 on captures, 6 on diagnosis, 8 on explanation.

| Criterion | Meets looks like | Not yet looks like |
|---|---|---|
| Address plan | Every link has its own subnet with no overlap, sizes are justified (for example why guest is a `/24`), pools sit inside their subnets and leave room for static addresses, public-looking addresses come from the documentation ranges, and the plan matches `ip addr` | Overlapping ranges, an unexplained size, or a plan that differs from the running network |
| Working network | Four test sets pass from a clean lab (build, test, teardown); each part has a must-fail test that fails for the right reason | Tests pass only after manual fixes, or a must-fail test fails for a different reason |
| Captures as evidence | Captures from both sides of the router are committed, labelled with where they ran, with a one-line reading and the `conntrack -L` line | Captures without labels, one side only, or output pasted but not read |
| Diagnosis | The write-up gives the seed and for each fault the symptom, the finder command with output, the fix and a passing re-run, in layer order | A fix with no evidence of how it was found, or guesses |
| Explanation | In the demo and probes the learner explains why the server sees one address and when the port changes, pointing at their own capture without notes | Restating the lecture, or answers that do not match their own capture |

Defence probes (the mentor picks three), with what a good answer cites:

- Why does the server see only one address? Masquerade rewrites every source to `198.51.100.2`; cite the outside capture.
- When does the port change? Only when two devices would use the same source port; cite `conntrack -L` (dossier 5.6).
- What breaks if the guest subnet is a `/30`? Four addresses, two usable, one taken by the router: one guest device and a pool of one.
- Why can the server reach your forwarded port but not your laptop's other ports? Only one mapping exists, and there is no route from the public side to private ranges (dossier 5.6).
- Which test would catch a missing default route on your router? The `home1` to server test, or `ip route get 203.0.113.80` on `hrouter` (dossier 5.7).

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
| 8.1 | beats (7) | 7 beat visuals (6 canvas, 1 diagram), GoDeeper x7, GlossaryTerm x3, Callout x1, LearningObjectives | 19 | PREDICT, QUIZ | at most 70 words a beat; 300 to 700, 900+ with folds |
| 8.2 | prose | Steps, FileTree, MermaidDiagram, Callout, InteractiveCanvas (replay) | 16 | PREDICT | 1,200 prose words |
| 8.3 | prose | Steps, FileTree, MermaidDiagram, Callout, InteractiveCanvas (replay) | 16 | PREDICT | 1,200 prose words |
| 8.4 | prose | Steps, FileTree, MermaidDiagram, Callout, InteractiveCanvas (replay) | 16 | PREDICT | 1,200 prose words |
| 8.5 | prose | Steps, FileTree, MermaidDiagram, Callout, InteractiveCanvas (replay) | 16 | none | 1,200 prose words |
| 8.6 | prose | none | 0 | QUIZ x5 | quiz only |
| 8.7 | prose | Checklist, LearningLog, ChapterRecap, OPEN_QUESTION | 4 | OPEN_QUESTION | 700 prose words |

`LearningObjectives` in 8.1 (build and prove a network from your own scripts; break it and find each fault from evidence; explain it in five minutes). `ChapterRecap` in 8.7 only. No MustRead, InterestingRead or RealWorldEvent: the module adds no new content and the primary sources were read in modules 4, 6 and 7.

Diagram plan: 8.1 gets the ten-step map (each step labelled with the module that explained it) as its first beat. 8.2 keeps the capstone topology, which the later chapters reuse and do not redraw. 8.3, 8.4 and 8.5 each get one small diagram that argues something the topology does not (which hook handles which packet; one dnsmasq serving two ranges; the layer order for finding a fault), added in this revision because the audit requires a diagram in every chapter that is not a Check or Gate. The fault matrix table in 8.5 stays the reference for the faults.

Changes to the earlier plan in this revision (interaction designer, G3):

- 8.3: Added a MermaidDiagram (audit: a diagram in every chapter that is not a Check or Gate); the brief's 'reuse the 8.2 topology' stays true for the topology itself.
- 8.4: Predict reworded to read the rule's match; added a MermaidDiagram (audit: a diagram in every chapter that is not a Check or Gate).
- 8.5: Added a MermaidDiagram (audit: a diagram in every chapter that is not a Check or Gate); still no PREDICT, because a PREDICT mid-diagnosis would break the flow.

## Canvases

Canvas decisions (interaction designer, G3):

- The full journey (8.1) is a sequence of packets across several devices with fields that change, so it is the module's one model-backed canvas family: `[netlab]` host, switch, two routers, inspector, NAT, home router (DHCP and DNS) and DNS (slice 3) in beat mode, one slug per group of steps. If slice 3 is late, the fallback is a scripted `[sequence]` with one Predict before the NAT beat and a sorter beat as the playable one (exception recorded).
- 8.2 to 8.5 are Build chapters; each keeps a `[replay]` in a phone-only section (`net-m8-replay-capstone-1` to `-4`). There is no canvas in the gate, and no beat canvas in a Build chapter.
- The capstone network is the course's reference build and the answer key for every graded instrument in this module.

Slugs follow the registry convention `net-m<module>-<name>` (graded labs keep `net-lab-`) and are proposed: none is written into a chapter until it is built and registered. The full registry with modes and chapters is in `interaction-map.yaml`. Fallbacks are named per chapter below the table.

| Slug (proposed) | Renderer | Chapter, beat | Mode | What it shows |
|---|---|---|---|---|
| `net-m8-journey-lease-arp` | [netlab] | 8.1, beat 2 | step through | home1 goes from no address to 192.168.1.101/24 with gateway and DNS 192.168.1.1, then asks ARP for 192.168.1.1 |
| `net-m8-journey-dns` | [netlab] | 8.1, beat 3 | step through | web.test is asked of the router's resolver and answers 203.0.113.80 |
| `net-m8-journey-gateway` | [netlab] | 8.1, beat 4 | step through | 203.0.113.80 is outside 192.168.1.0/24, so the SYN leaves with the server's IP and the router's MAC |
| `net-m8-journey-nat-hop` | [netlab] | 8.1, beat 5 | playable | forwarding on, default route via 198.51.100.1, TTL 64 to 63, source rewritten to 198.51.100.2 (port kept unless it clashes) |
| `net-m8-journey-reply` | [netlab] | 8.1, beat 6 | step through | provider router TTL 62, the server sees 198.51.100.2, and the reply returns through the mapping (conntrack -L) |
| `net-m8-journey-first-byte` | [netlab] | 8.1, beat 7 | step through | the three-way handshake finishes, the GET is sent and the first byte arrives; a real browser adds TLS and often QUIC (system design course) |
| `net-m8-replay-capstone-1` | replay | 8.2 (phone-only section) | replay | predict each command's output, then see the recorded result from the reference run |
| `net-m8-replay-capstone-2` | replay | 8.3 (phone-only section) | replay | predict each command's output, then see the recorded result from the reference run |
| `net-m8-replay-capstone-3` | replay | 8.4 (phone-only section) | replay | predict each command's output, then see the recorded result from the reference run |
| `net-m8-replay-capstone-4` | replay | 8.5 (phone-only section) | replay | predict each command's output, then see the recorded result from the reference run |

Inline diagram beats (MermaidDiagram, VisualDiagram, TraceRequest; no registration): 8.1 beat 1 `mmd-8-1-ten-steps`.

Stated limits and fallbacks by chapter:

- 8.1: limit: One packet at a time; plain HTTP; no loss, TLS or QUIC; NAT follows Linux, other routers differ. Fallback if not built: scripted [sequence] of the same packets (laptop, home router, provider router, server) with one Predict before the NAT beat only; the playable beat becomes a sorter that places six steps under the module that explained them (net-m8-sort-step-module); recorded as an exception. Needs netlab slice 3.
- Replays and labs: a replay falls back to a `[sequence]` of two actors (learner, lab) with Predict blocks before the key steps only, within the chapter's budget of 3 assessments; a graded lab that is blocked falls back to a diagnosis from recorded command output, graded as a quiz (roadmap).

The 8.1 beats need slice 3 and every netlab part the journey uses (not the captive portal or the IPv6 view). Replay slugs are made from the reference run of each part; 8.5 uses a demonstration seed.

## Gate

Gate 8.7, evidence: the capstone repository, the fault write-up and the recorded demo. The evidence is a repository that builds and passes from a clean lab and a learner who explains their own capture.

Checklist: all four test sets pass from a clean lab and tear down cleanly; `results.md` and the captures from both sides of the router are committed for each part; `fault-writeup.md` has the seed and three faults, each with symptom, finder and fix; the demo is five minutes or under and follows the template; every command in the write-up is one the learner ran. LearningLog prompt: which fault was hardest to find and what made it easier? One OPEN_QUESTION: the demo link and the three probe answers. A mentor reviews in under 30 minutes using the rubric, within three days (decision 9).

## Risks

- Likeliest stall: 8.2, joining three scripts that each assume their own namespace names. Mitigation: `toolkit/` helpers and the capstone's proposed names fixed in the README; `restore.sh 6.1` as a safe start for part 2.
- Learners write a test that asserts the source port is unchanged. The port changes only on a clash (dossier 5.6), so tests assert the address only.
- Learners run real-internet commands in the lab. The lab cannot show the real path (dossier 5.5); demo labels say which side each command ran on.
- Accuracy traps: only three documentation blocks exist, 3 x 256 addresses [S10], so the plan budget is tight. Masquerade is not a firewall (dossier 5.6), so isolation is a filter rule. The provider-side addresses `198.51.100.1`, `203.0.113.1` and the multi-subnet dnsmasq are proposed, not run.
- Source gap: DNS port 53 for fault F4 and the DNS packet reading are not in the dossier's summary of [S24]; cite the learner's own capture, not a standard, until a source is added.
- Fault F5, F2 and F7 symptoms and the DNAT interaction with `forward` rules are reasoned from dossier 5.6 and 5.7, not run. Run every row of the matrix once at G3.
- The unresolved macOS and WSL 2 runs (decision 1) apply here: the capstone has not been run on Docker Desktop for macOS or WSL 2 without Docker Desktop.

## Resolved in roadmap v3.1

1. 8.2 starting from challenges 2, 4 and 5: resolved. Part 1 (8.2) starts from challenges 2 and 4, part 3 (8.4) from challenge 5.
2. 8.6 "questions from every module": resolved. Five questions that each combine two or more modules.
3. The "wrong mask" fault needing a static device: resolved. The static `homeweb` server is accepted as the forwarded port's target and the fault's device.
4. The 8.1 netlab fallback breaking the assessment budget: resolved. Predictions go before the key steps only, within the chapter's budget of 3 assessments.
5. The `[replay]` fallback breaking the budget (8.2 to 8.5): resolved the same way.
6. "`netlab: all parts`": resolved. 8.1 uses every netlab part the journey uses (not the captive portal or the IPv6 view).
7. Whether learners may see the fault finders: resolved. The fault menu is published; the seed's draw is hidden until the write-up.

## Still open

- Verify at G3 (untested): every row of the fault matrix (F1 to F7 symptoms and injection commands), `ip route get` output, one dnsmasq with two ranges versus two instances, `ss -ulnp`, the three-line capstone traceroute, and the guest's names while the drop rule blocks forwarding.
- The provider-side addresses `198.51.100.1` and `203.0.113.1` and the namespace names are proposed, not run. Docker Desktop on macOS and WSL 2 without Docker Desktop have not run the capstone.
