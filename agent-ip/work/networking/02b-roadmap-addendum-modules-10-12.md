---
artifact: curriculum-roadmap-addendum
course: networking
version: 0.3
status: draft
owner: curriculum-architect
extends: 02-curriculum-roadmap.md (v3.1, G2B complete 2026-10-24)
depends_on: 01-research-dossier.md, 01b-research-addendum-internet-vpn-tools.md, qa/g2a-addendum-critique-pedagogy.md, qa/g2a-addendum-critique-technical.md
requested_by: Zeeshan (sponsor), 2026-10-27
g2b_signoff: complete (sponsor delegation, 2026-10-27; see roadmap-confirmation.md)
---

# Roadmap addendum: modules 10 to 12

## Why this addendum

The sponsor asked for three things the course does not teach yet (2026-10-27):

1. How packets move between networks run by different organisations, how those networks talk to each other, and what an ASN really is. Today 4.5 gives this one short chapter and says "this course does not teach BGP".
2. VPNs.
3. Practical tools (Wireshark and others) that learners run on their own machine and in their own repository, with challenges, not new interactive components.

The sponsor asked that these are spread over several chapters, short ones are fine, and that the course can grow later.

Version 0.2 closes every blocker and major finding of the two G2A critiques; the change log is at the end.

## Placement

Three new modules after IPv6, as **Part 2: Beyond your home network**.

| Module | Needs | Why here |
|---|---|---|
| 10. How networks reach each other: autonomous systems and BGP | 2 (CIDR blocks), 4 (routes, longest prefix match, traceroute) | The learner already reads a route table and a trace. Module 10 answers "who wrote the routes past my provider?" |
| 11. VPNs: your own private network over the internet | 4 (routes), 6 (NAT, port forwarding), 7 (DNS) | A VPN only makes sense once the learner knows why the internet cannot reach a home device (6.3) |
| 12. Your network toolbox | 1 to 7 only | Each tool answers a question the learner has already asked by hand. 12.4 mentions AS numbers from module 10 but does not need them |

The three Part 2 modules can be taken in any order. The first section of 12.2, "open your own 1.4 capture in Wireshark", is also offered after 1.5 as an ungraded card; the graded part of 12.2 stays in module 12, because its test uses the capture that 12.1 seeds.

Rejected: inserting module 10 after module 4. It would renumber modules 5 to 9, every challenge and every cross-reference, and break the IPv4 and NAT story that leads to the capstone.

Changes to existing chapters:
- 4.5: replace "this course does not teach it" with a link to module 10.
- 1.4, 1.5 and 5.6 (where the learner first captures and reads captures): one line, "Want a better view? Open this capture in Wireshark now with the short card after 1.5; module 12 teaches the rest."
- The v3.1 stretch items S1 (Wireshark) and S2 (a WireGuard tunnel) are marked replaced by 12.2 and module 11.

## Completion

Part 2 is credited separately: a Part 2 badge, not a condition for the course certificate (decision 20). A learner who stops at 9.5 has finished the course.

Foundations (phone-only, decision 8) in Part 2:
- O8: yes, from quizzes, the code exercise (or the reference-solution questions on a phone), and the replay of challenge 7.
- O9: partly, from the quiz and the replay of challenge 8, and the gate's phone branch.
- O10: only 12.5 (dig has browser equivalents) and 12.8 from supplied curl output (phone browsers have no Network tab). The rest needs a laptop.

Every Part 2 gate has a phone branch: a supplied, dated real trace or capture, with questions about it.

## Outcomes added

| # | Outcome (observable verb) | Graded evidence |
|---|---|---|
| O8a | Look up the autonomous system behind any public address, and explain how BGP announcements build the routes between networks | Gate 10.12; quiz 10.11; challenge 7 parts 1 and 2 |
| O8b | Pick the route a BGP router uses (loop check, longest prefix, the network's own preference, shortest AS path), and explain a hijack and a leak with real incidents | Code exercise 10.6; challenge 7 parts 3 and 4; quiz 10.11; the incident question in gate 10.12 |
| O9 | Build a WireGuard VPN between two private networks behind NAT, prove with captures what each network sees, and show what a full and a split tunnel hide and do not hide | Challenge 8 parts 1 to 4; quiz 11.8; gate 11.9 |
| O10 | Choose the right tool for a network symptom (Wireshark, tcpdump, mtr, dig, nmap, iperf3, curl), run it, and read its output as evidence | Challenge 9 (each part's test, and the four planted faults in `faults.md`); quiz 12.9; gate 12.10 |

## Chapter types added

| Type | What it is | Typical minutes |
|---|---|---|
| Tool | One tool, opened by a real symptom: what question it answers, install on the learner's own machine (sizes stated), three commands, how to read the output, one trap, then clear one planted fault in challenge 9 and commit the result | 35 |

All other types are those of v3.1. Builds stay at 75 minutes or less; longer work is split into checkpointed parts.

## Modules

### Module 10: How networks reach each other: autonomous systems and BGP

Opening question: *Your trace from 4.1 has a dozen hops. Your provider owns the first few. Who owns the rest, and how did your provider's router know where to send the packet next?*
Purpose: the internet is about 80,000 networks (80,111 unique AS numbers in one BGP table view on 27 October 2026 [S144]); about 67,000 of them appear only at the end of AS paths in that view. Each one tells its neighbours which address blocks it can reach. This module makes that real with the learner's own trace, then has them run three small networks that talk BGP.
Hours: about 6.7 core (400 min)

| # | Chapter | Problem first | Learner can then | Type | Min | Play / practice |
|---|---|---|---|---|---|---|
| 10.1 | Whose network is each hop? | In 1.1 a website saw you at a public address. Which network is that address in? And whose routers are the public hops in your trace? | Look up the AS number and name for their own public address and each public hop (RIPEstat or bgp.tools in the browser, no account [S93, S94, S95]), and explain why a hop's address can belong to the neighbour network or an exchange | Read | 20 | On their own computer and browser; a host-command table (Windows, macOS, Linux); a dated sample trace with real addresses and their lookups for learners whose trace shows only stars |
| 10.2 | What an autonomous system is | In 4.5 you met networks A, B and C. Real ones have numbers. What does your provider's number stand for, and who hands it out? | Explain an AS (one routing policy, usually one organisation [S68]), 16-bit and 32-bit numbers [S84], private and documentation numbers [S85, S86], and the path IANA, regional registry, network [S87, S88]; a short glossary of the module's terms | Learn | 30 | Sort ten AS numbers as public, private or documentation: Predict and a multiple-choice quiz block |
| 10.3 | BGP: how networks tell each other what they can reach | A network gets a new address block. How do routers on the other side of the world learn it? | Follow an announcement hop by hop over TCP port 179, read an AS path, explain a withdrawal, and why a router drops a path that already has its own number [S83] | Learn | 35 | Step through an announcement crossing four networks: the existing `[sequence]` canvas with a Predict before each step |
| 10.4 | Who carries whose traffic: customers, providers and peers | Two networks are connected by a direct cable, yet traffic between them goes the long way round. Why? | Explain customer, provider and peer links (a customer pays its provider; peers swap their customers' traffic free of charge [S145]), why a network passes routes from a provider or a peer only to its customers [S145, S92], and why it prefers a route through a customer over one through a peer or a provider, set as its own preference per neighbour (local preference, kept inside the network [S83]) before it compares path length [S145] | Learn | 35 | Predict the chosen path in three small maps: Predict blocks with a drawn map (Mermaid) |
| 10.5 | Where networks meet: exchange points and undersea cables | Networks peer, but where do their cables actually meet? | Explain an exchange point, look one up on PeeringDB [S101, S97], and say what carries traffic between continents [S106, S107] | Read | 15 | Look up an exchange point near them |
| 10.6 | Code: pick the best route | | Write `bestRoute(announcements, myAsn, destination, policy)`: drop any path that contains `myAsn`, keep the longest matching prefix, then the highest preference from `policy` (per neighbour, default 100), then the shortest AS path | Code | 40 | Graded code exercise; reference-helper unlock after three failures |
| 10.7 | Build: three networks that talk BGP | | Run three namespaces as AS64496, AS64497 and AS64498 with BIRD (every config line explained), announce a block, read the AS path in `birdc`, withdraw it and watch the ping fail | Build | 60 | Challenge 7, parts 1 and 2 (guided) |
| 10.8 | Build: a backup link and your own preference | | Add a direct link, see it win on path length, then lower its preference with a one-line import filter so it becomes the backup, cut the main link and watch traffic move | Build | 50 | Challenge 7, part 3 (gapped) |
| 10.9 | When routes go wrong: hijacks, leaks, and an outage you met in module 7 | On 24 February 2008, for about two hours, traffic to YouTube from many networks went to a network on the other side of the world. Nobody broke into YouTube. What happened? | Explain a hijack (YouTube 2008: a more specific block from the wrong network won by longest prefix match [S105]) and a leak (a route passed beyond its intended scope [S91]); say what RPKI origin validation catches (a wrong origin, or a prefix longer than the signed maximum) and what it misses (a right-origin route sent too far, Cloudflare 1.1.1.1, June 2024 [S90, S103]); explain the Facebook 2021 outage from 7.4 as a withdrawal [S48] | Learn | 30 | Predict for each incident: would RPKI have stopped it? |
| 10.10 | Build: a wrong announcement and the filter that stops it | | From the wrong network, announce a more specific block (a /25 inside the owner's /24), watch traffic split, then add an import filter that accepts only the exact block from its owner and watch the hijack fail; a hand-written list like this is what RPKI automates with signed records | Build | 40 | Challenge 7, part 4 (gapped) |
| 10.11 | Networks of networks | | Five questions: an AS number range, an AS path with a loop, the route `bestRoute` picks, would RPKI stop it, and one from 4.3 (longest prefix match) | Check | 15 | |
| 10.12 | Your path, network by network | | Gate: map their own trace (or the supplied one) to the networks it crossed, say whether PeeringDB shows two of them at the same exchange, answer one incident question in two or three sentences, and one open question | Gate | 30 | Phone branch: the supplied trace |

### Module 11: VPNs: your own private network over the internet

Opening question: *You are in a café. Your team's test server is at `10.20.0.5` in the office, a private address. You type it into your browser and nothing happens. A teammate says "turn on the VPN" and it works. What did the VPN just do?*
Purpose: a tunnel is a packet inside a packet. Once learners see that in their own capture, WireGuard's settings read as a list of who gets which addresses, and the honest answer to "does a VPN make me safe?" follows.
Hours: about 5.0 core (300 min)

| # | Chapter | Problem first | Learner can then | Type | Min | Play / practice |
|---|---|---|---|---|---|---|
| 11.1 | Why the office server is out of reach | (the opening question) | Explain with module 6 why a private address in another building cannot be reached from the internet; list the adapters on their own machine (`ipconfig` or `ip addr`: VPN, WSL, Docker) and their ranges, and see why two networks that both use `192.168.1.0/24` break a VPN (3.6) | Read | 15 | On their own computer |
| 11.2 | A tunnel is a packet inside a packet | If the internet only routes public addresses, how can a packet to `10.20.0.5` cross it? | Read a recorded tunnel capture: the outer UDP packet between public addresses, the inner packet to `10.20.0.5`; work out the outer size (inner padded to a multiple of 16, plus 32 bytes of WireGuard, 8 of UDP and 20 of IPv4: an 84-byte ping becomes 156 bytes [S112, S142]); in two sentences, why a tunnel lowers the largest packet that fits (MTU 1420 by default) | Learn | 30 | An annotated real capture with a Predict before each layer; Predict the outer size |
| 11.3 | WireGuard: keys and allowed addresses | Two laptops, two keys, one setting called AllowedIPs. How does WireGuard know which peer a packet goes to, and which packets to accept? | Explain a key pair (what someone can and cannot do with your public key), a peer (here: the other end of a tunnel, not a BGP neighbour), and AllowedIPs as "which peer gets a packet, and which sources are accepted from it" by longest match across all peers [S111, S117]; the routing table decides what reaches `wg0`, and `wg-quick` adds that route for you [S118] | Learn | 35 | Predict which peer gets five packets, and which of three incoming packets are dropped |
| 11.4 | Build: an office and a café, each behind NAT | | Restore the home router from challenge 4, make it the office, add a café network behind its own NAT, forward UDP 51820 at the office, and prove the forward works by breaking it on purpose (and clearing the old NAT state, `conntrack -F`) | Build | 50 | Challenge 8, part 1 (guided) |
| 11.5 | Build: the tunnel | | Generate keys, bring up the tunnel, add the route to `10.20.0.0/24` on the café side and the return route on the office server, ping `10.20.0.5`, capture both sides, and show that an inner packet from a source outside AllowedIPs is dropped | Build | 60 | Challenge 8, parts 2 and 3 (gapped) |
| 11.6 | Build: full tunnel and split tunnel | | Send all traffic through the tunnel (a default route into `wg0`, plus a /32 route to the office endpoint outside the tunnel, which `wg-quick` sets up for you [S118]; and a route back to the tunnel network on the office router, or masquerade on the VPN box) and show that the lab website sees the office's public address, not the café's (the 1.1 question again); show that DNS still goes to the café's resolver in the clear until DNS is pointed at a server through the tunnel; then split the tunnel and show only office traffic inside it | Build | 45 | Challenge 8, part 4 (gapped) |
| 11.7 | What a VPN hides, and what it does not | A VPN app promises you are "anonymous". Who can still see what you do? | Explain what the café, the provider and the VPN company each see [S123], full and split tunnels, a leak when the VPN covers only IPv4 [S122], and why a company VPN is not the same product as a consumer VPN [S124, S125] | Learn | 30 | Fill in "who sees what" for four set-ups, starting from their own 11.6 captures: Predict blocks |
| 11.8 | VPNs | | Five questions: outer and inner addresses, an outer packet size, which peer, what the café sees in a split tunnel, and one from 6.2 (the NAT table) | Check | 15 | |
| 11.9 | Explain your tunnel | | Gate: explain their own challenge 8 captures to a friend: the outer packet, the inner packet, what each network saw, and what changed with the split tunnel | Gate | 20 | Phone branch: a supplied capture |

Keepalive (why the café side needs `PersistentKeepalive` if the office starts the conversation) is a gotcha box in 11.5 and an optional extra in part 3.

### Module 12: Your network toolbox

Opening question: *A friend says "the internet is slow". You now know a dozen places it could break. Which tool tells you which one, in under a minute?*
Purpose: one broken lab network, four hidden faults, and one tool per chapter. Each chapter starts from a real symptom, teaches the tool in a few commands on the learner's own machine and in their own repository, and ends by clearing one planted fault with evidence. No new interactive pieces.
Hours: about 5.3 core (320 min)

| # | Chapter | Problem first | Learner can then | Type | Min | Play / practice |
|---|---|---|---|---|---|---|
| 12.1 | The slow, broken network | Run the fault script. Something is slow and something is broken. With only `ping` and the trace you already know, what can you find in ten minutes? | Start challenge 9, write a best guess for each symptom in `faults.md`, and see which questions `ping` and a trace cannot answer | Read | 20 | Challenge 9, setup |
| 12.2 | Wireshark: read any capture | Your tcpdump captures are walls of text. Is there a better way to read them? | Install Wireshark on their laptop (download and installed sizes stated first [S126]), open their own capture from the lab's `/work` folder, use display filters [S128], follow a TCP stream [S126], and tell a display filter from a capture filter [S127] | Tool | 40 | Challenge 9, part 1: the test recomputes the learner's answers (a port, a TTL, a packet count) from a seeded capture with `tcpdump -r` |
| 12.3 | tcpdump: capture only what you need | A ten-minute capture holds 80,000 packets. You need the DNS ones. | Write capture filters by host, port and network [S131], save and reread a file [S130], stop after a count, and finish a file before opening it (`-c`, Ctrl-C, `-U`) | Tool | 35 | Challenge 9, part 2 |
| 12.4 | mtr: traceroute that keeps watching | One report says hop 1 loses 20% of packets. Is hop 1 broken? | Run mtr [S110]; read three cases: clean, real loss (it continues to the last hop), and a router limiting its own replies (loss at one hop only; Linux's `icmp_ratelimit`); find the lossy link; host commands for Windows (`pathping`, WinMTR) and macOS | Tool | 35 | Challenge 9, part 3: clears fault 1 (loss on one link) |
| 12.5 | dig: ask DNS yourself | The site loads on your phone's mobile data but not on the campus Wi-Fi. Same name. Why? | Ask a chosen server, get the short answer, follow `+trace` from the root (in the lab: `dig +trace @1.1.1.1 name`, since the lab has no local root hints path that works without it) [S132], compare two resolvers; on Windows use the lab or `Resolve-DnsName`, since `dig` is not built in | Tool | 35 | Challenge 9, part 4: clears fault 2 (a resolver that gives a wrong answer) |
| 12.6 | nmap: which doors are open | Your teammate says the port is open. Your app cannot connect. Who is right? | Type the consent line first (only what you own or have written permission for [S133]); scan the lab network; read open, closed and filtered ("filtered" means nmap could not tell); use `-n` | Tool | 35 | Challenge 9, part 5 (lab only): clears fault 3 (a filtered port) |
| 12.7 | iperf3: how fast is this path really | The link should carry 100 Mbit/s. The file copy crawls. Where did the speed go? | Measure throughput between two lab computers [S136, S137], shape one side's outgoing traffic with `tc netem`, measure both directions (`-R`), and use UDP to read loss | Tool | 35 | Challenge 9, part 6: clears fault 4 (a throttled link) |
| 12.8 | curl: where the time goes | Your app takes two seconds to load. Is it DNS, the connection, or your server? | Run `curl -v` and `curl -w` with the timing fields (name lookup, connect, first byte, total) [S147] against their own deployed app or a public page, on their own machine, and compare with the browser's Network tab | Tool | 30 | Challenge 9, part 7 (results file only) |
| 12.9 | Tools | | Five questions: match a symptom to a tool, read an mtr report, display or capture filter, an nmap state, and one from 7.4 (DNS TTL) | Check | 15 | |
| 12.10 | Your toolbox | | Gate: hand in `faults.md` (each fault: the tool, the command, the output line that proves it; the test matches each line to the seeded fault), then a blind round: `faults.sh --round 2` plants two of the four faults at random with new values, and the learner finds them without the matrix or the chapter names; plus a one-page cheat sheet with one real output per tool from their own runs | Gate | 40 | Phone branch: supplied outputs to read |

The four faults are designed so each one is best found by a different tool (mtr, dig, nmap, iperf3); the challenge 9 README shows the matrix after 12.1. Faults 1 and 4 must not look alike: fault 1 is packet loss on one link (mtr shows loss that continues to the end; iperf3 shows retransmits), fault 4 is a rate limit with no loss (mtr is clean; iperf3 shows a low, steady rate with few retransmits).

## Totals

| | Core min | Core hours |
|---|---|---|
| Modules 1 to 9 (roadmap v3.1) | 2,510 | about 42 |
| Module 10 | 400 | 6.7 |
| Module 11 | 300 | 5.0 |
| Module 12 | 320 | 5.3 |
| **Part 2** | **1,020** | **about 17** |
| **Course with Part 2** | **3,530** | **about 59** |

Slow path for Part 2: about 1.3 times core, so about 22 hours. Slow-path minutes for the first-time builds: 10.7 90, 10.8 70, 10.10 55, 11.4 70, 11.5 90, 11.6 60. At 12 hours a week, Part 2 adds about 1.5 weeks (core) to 2 weeks (slow). These minutes are estimates until the pilot in decision 12.

## Challenges added (learner template `networking-challenges`)

Same structure as challenges 1 to 6: `challenges/challenge-N-name/part-N/` with a README (the 101), a script with TODO gaps, a results file, and a test that proves it.

| Challenge | Parts | Support | Proves |
|---|---|---|---|
| challenge-7-bgp | 1 three ASes announce, 2 read and withdraw, 3 a backup link and a preference, 4 a more specific hijack and the exact-block filter | Parts 1 and 2 guided, 3 and 4 gapped | The far route appears with the expected AS path, disappears on withdraw, moves to the backup when the main link is cut, is split by the /25, and the filter stops the /25 |
| challenge-8-vpn | 1 office and café behind NAT, 2 the tunnel, 3 what each side sees, 4 full and split tunnel | Part 1 guided, starting from a setup script in the part that rebuilds challenge 4's router (a `toolkit/restore.sh` does not exist yet; build it or ship the setup per part), 2 to 4 gapped | Ping to `10.20.0.5` works only with the tunnel up; the café's outside capture has only UDP on port 51820 both ways and no ICMP or TCP; the `wg0` capture has the inner ping; a spoofed source is dropped; the lab website sees the office address with a full tunnel; the DNS query is visible at the café until DNS goes through the tunnel; with a split tunnel only office traffic is inside it |
| challenge-9-toolbox | setup and parts 1 to 7 | Each part guided to its first command, then open | Parts 1 and 2: values recomputed from a capture file generated per learner from a seed and shipped in the repository (not a live capture, which varies); parts 3 to 6: the planted fault named in `faults.md` with a matching output line; part 7: a results file with real timing fields |

Tests assert patterns, not fragile numbers: mtr tests check that loss continues to the last hop, not 0% at hop 1; iperf3 tests check a ratio between the shaped and unshaped direction.

The reference repository gets the reference scripts and the fault checks, tested in the lab image as challenges 1 to 6 were.

## Build environment changes

- Lab image adds `bird2`, `wireguard-tools`, `mtr-tiny`, `iperf3`, `nmap` and `whois` from Ubuntu 24.04, in the same `RUN` that cleans the apt lists: about 42 MB more on disk (207 MB to 249 MB, measured after the rebuild on 2026-10-27). The download size is measured at build time and stated in 1.2, separately from disk size. BIRD 2.14 and wireguard-tools v1.0.20210914 are the versions tested. `mtr-tiny`, not `mtr`, which pulls in 108 packages [S140].
- Tested in the current lab image on Docker Desktop (WSL 2 kernel 6.6.87) on 2026-10-27, by the orchestrator and the technical critic: three namespaces running BIRD as three ASes exchanged routes, a withdrawal removed the route, a lower local preference made a direct link the backup and failover worked, a /25 hijack split traffic; WireGuard through two nftables NATs with a UDP forward passed pings; `tc netem` (delay, loss, rate) works; nmap showed open, closed and filtered; iperf3 measured the shaped link; `tcpdump -w /work/...` appeared on Windows at once.
- BIRD needs an explicit import and export policy for eBGP; the template gives `import all; export all;`. A rejected loop cannot be shown in BIRD (it drops loops before it keeps them), so loops are taught by Predict, not in the lab.
- Wireshark is installed on the learner's own laptop and opens files the lab writes to `/work`. `tshark` is not in the image (138 MB).
- Not yet tested, to test before the chapters are written: opening a lab capture in Wireshark on Windows and macOS; `tc netem` on macOS Docker Desktop and on native Ubuntu cloud kernels (`sch_netem` is in `linux-modules-extra`); the exact-block import filter in 10.10.
- Phone-only learners: see Completion.

## Out of scope changes

Now in scope, at beginner depth: what an AS is; eBGP announcements, AS paths, loop rejection and withdrawal; the best-path order loop check, longest prefix, the network's own preference per neighbour (local preference, never sent to other networks), shortest AS path; customer, provider and peer links; RPKI origin validation at the level of what it catches and misses; WireGuard; seven tools.

Still out of scope: OSPF, iBGP and route reflectors, the rest of the BGP tie-breakers (origin, MED and after), BGP communities, ASPA and BGPsec (one sentence), MPLS, vendor router CLIs, IPsec and OpenVPN configuration (one line each), Tor, and any scanning beyond the learner's own lab and their own administered router.

## Open decisions for instructors

| # | Decision | Recommendation | Instructor decision |
|---|---|---|---|
| 13 | Placement | Modules 10 to 12 after IPv6 as Part 2, in any order, with forward links from 1.4, 1.5, 4.5 and 5.6 | |
| 14 | BGP software in the lab | BIRD 2: one short config per network, one process per namespace, about 5 MB installed, tested. FRR is closer to commercial router CLIs but about 50 MB and a daemon set per namespace [S140] | |
| 15 | Lab image grows by about 42 MB on disk | One image for everyone, so a learner never meets a missing tool; state the size in 1.2 | |
| 16 | Wireshark on the learner's laptop, not in the lab | Yes: it is the tool they will use at work, and the lab already writes captures to a folder the laptop can open | |
| 17 | nmap rule | Graded scans only in the lab. Optional: their own home router, only if they administer it; never campus, hostel, office or café networks. The learner types a consent line into the results file before the first scan | |
| 18 | Real-world lookups | Only free services that need no account: RIPEstat, bgp.tools, PeeringDB, whois [S93 to S99]; the gate accepts a screenshot or pasted output | |
| 19 | Interactive pieces | No new canvases or labs. The plays in Part 2 are authoring patterns of existing blocks: Predict, multiple-choice and ordered quizzes, the `[sequence]` canvas, Mermaid diagrams and annotated real captures | |
| 20 | Part 2 and the certificate | Part 2 earns its own badge and is not needed for the course certificate | |
| 21 | Hours | Part 2 adds about 17 core hours (about 22 slow); the course with Part 2 is about 59 core hours. Accept as estimates until the pilot | |

## Change log

v0.2 (2026-10-27), after the G2A critiques:
- Pedagogy 1 (blocker): local preference is taught in 10.4 as the network's own per-neighbour setting, and 10.6 takes it from a `policy` argument; out of scope fixed (also technical A2).
- Pedagogy 2, technical A5, A7, A17: Builds split to 60 minutes or less with stated support; 11.4 and 11.5 add the two missing routes and the conntrack flush; 10.8 makes the backup a backup with a preference filter; scaffolds with TODO gaps.
- Pedagogy 3: hours recomputed; slow path stated.
- Pedagogy 4: Part 2 badge, Foundations per outcome, phone branches for every gate.
- Pedagogy 5, 6, 7: module 12 rebuilt around one broken network with four planted faults, each found by a different tool; hooks per chapter; curl added; Wireshark can be taken after 1.5; tests recompute from seeded captures.
- Pedagogy 8, technical A4: 11.2 uses an annotated real capture, not the unbuilt packet canvas; size formula with padding (84 to 156); key pair and peer defined in 11.3.
- Pedagogy 9, technical A3: code exercise 11.4 cut; the inbound check is tested in the lab with longest match across peers; part 4 tests full and split tunnel.
- Pedagogy 10, technical A1: incidents split into 10.9 (Learn) and 10.10 (Build); RPKI claim corrected (Verizon 2019 is not the "valid but leaked" case; Cloudflare 2024 is); Facebook 2021 is a callback to 7.4.
- Pedagogy 11, 19: every play names an existing block.
- Pedagogy 12: nmap rule tightened.
- Round 2 (technical): YouTube hook reworded to the source (B8), the exact-block filter called a hand-written list that RPKI automates (B3), seeded capture defined (B5); full-tunnel build adds the endpoint route and the return route (B1), DNS in a full tunnel (B2), `dig +trace @1.1.1.1` and Windows (B6), no `restore.sh` yet (B7), faults 1 and 4 made distinct (B4).
- Round 2 (pedagogy): the early Wireshark path is an ungraded card; gate 12.10 adds a blind round so choosing the tool is tested; 11.6 (build) now comes before 11.7 (what a VPN hides); S2 maps to module 11; 12.8 phone path uses supplied output; slow-path minutes for first-time builds.
- Pedagogy 13 to 17, technical A6, A8 to A16: sample trace, host-command tables, mtr three cases and `icmp_ratelimit`, loops by Predict, capture test wording, keepalive gotcha, Wireshark file rules, iperf3 direction and UDP loss, nmap state script, size claims, S144 wording, unsourced prompts removed.

Sourced after v0.2: the preference for customer routes and the export rules in 10.4 [S145]. The source does not require a peer over a provider, so 10.4 does not teach that order. A speed-test comparison sentence in 12.7 is removed until sourced.

## Confirmation

| Instructor | Role | Decision (approve/revise/reject) | Comments | Date |
|---|---|---|---|---|
| Zeeshan | Architect (human sponsor) | | | |
