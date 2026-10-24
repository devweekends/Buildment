---
artifact: curriculum-roadmap
course: networking
version: 1
status: draft
owner: curriculum-architect
instructors_reviewed: []
g2b_signoff: pending
depends_on: 00-course-brief.md, 01-research-dossier.md
---

# Curriculum roadmap: Networking, Hands On

## In one paragraph

The course starts with a question every learner can check in ten seconds: your laptop says its address is `192.168.1.23`, but a website says you are someone else entirely. Which one is right? From there it answers the question the whole course is built around: **all your devices are connected to a router and none of them has a public address, so how do they talk to the internet?** Each idea is taught the same way: first the problem that forced it to exist (we ran out of addresses, one flat network drowned in broadcasts, a reply has to find the right app), then the idea, then the details, always on real numbers from the learner's own machine. Learners predict and then play with interactive network labs where they watch a packet's addresses, ports and TTL change hop by hop. They write the core logic themselves in small JavaScript exercises (address arithmetic, longest prefix match, a NAT table). On a laptop they build real networks out of Linux network namespaces in their own `networking-challenges` repository: two devices on a cable, then a router, then a home router with NAT, then DHCP and DNS. The course ends with the learner building a whole small internet on one machine, breaking it on purpose, fixing it with real commands, and explaining it in a five-minute demo.

## Learner and entry prerequisites

- Learner: fellowship fellows and early-career engineers who use the internet daily and can build a small web app, but have never looked inside the network. Many read on phones with metered data and power cuts; English is a second language for many.
- Prior knowledge: open a terminal and run a command; basic JavaScript (functions, arrays, numbers); Git and GitHub. Binary numbers are taught in 2.2, not assumed.
- Time available: about 12 hours a week. Core path about 40 hours (three and a half weeks); stretch path about 8 more hours.
- Entry diagnostic: chapter 1.1 asks the learner to write down their own address and the address a website sees, and to guess why they differ. The same question returns in the capstone gate (9.4), answered with their own capture.
- Equipment: every Learn chapter, lab and quiz works on a phone. Build chapters need a laptop with a Linux environment (see "Build environment"). No cloud account and no money needed.

## Outcomes

| # | Outcome (observable verb) | Evidence |
|---|---|---|
| O1 | Read their own machine's address, prefix, gateway, DNS server and public address, and explain where each came from | Challenge 0 (1.4); gate 1.6; capstone demo 9.4 |
| O2 | Classify an address as public, private or special, and explain why private ranges and NAT exist | Chapters 2.5 and 6.4 checks; code exercise 2.6; gate 2.8 |
| O3 | Do CIDR arithmetic (network, broadcast, size, host range, same subnet, split, overlap) by hand and in code | Code exercise 3.6; lab 3.8; gate 3.10; quiz 3.9 |
| O4 | Trace a packet from laptop to server (gateway decision, ARP, longest prefix match, TTL, ports, TCP handshake) and confirm each step with commands | Code exercise 4.7; challenges 2 and 3; lab 4.9; gates 4.11 and 5.7; walkthrough 9.1 |
| O5 | Demonstrate NAT: show source address and port rewriting in a router they built, explain why inbound connections fail, recognise carrier-grade NAT | Code exercise 6.6; challenge 4; lab 6.8; gate 6.10 |
| O6 | Explain DHCP and DNS (including caching and TTL), and diagnose "no internet" layer by layer | Challenge 5; chapter 7.5 lab; gate 7.8; capstone faults 9.3 |
| O7 | Build a network from Linux network namespaces (subnets, router, NAT, DHCP, DNS) and prove it works and fails with tests and captures | Challenges 1, 2, 4, 5 and 6; capstone 9.2 and 9.3 |

## Chapter types

| Type | What the learner does | Typical minutes |
|---|---|---|
| Read | Opens a module with a real puzzle from the learner's own world, often a command they run or a short lab to poke | 10 to 15 |
| Learn | One idea: the problem first, a prediction, then the interactive element, then the explanation and a quick check | 30 to 40 |
| Code | Graded JavaScript in the browser; server tests check it | 40 to 45 |
| Build | A part of a challenge in the learner's `networking-challenges` repository, run in their Linux environment, with captured output committed | 40 to 150 |
| Lab | A graded scenario in the network lab: a broken or empty network, a goal ("the guest Wi-Fi must reach the internet but not the printer"), and checks that pass or fail | 35 to 40 |
| Check | Graded scenario quiz, three to five questions | 15 to 20 |
| Gate | Checklist, learning log and one written answer a mentor reads | 20 to 45 |

The **Play** column names the interactive element. Existing renderers on `main`: `[sequence]` (step-through with step controls), `[timeline]`, `[slider]`, `[state]`. New pieces this course needs: `[addr: mode]` (one address renderer with modes), `[packet]` (a real captured packet to inspect), and `[netlab: parts]` (the new network lab family). See "Interactive pieces" below. Learn chapters also carry a Predict and a quick check; the table does not repeat them.

---

### Module 1: Your laptop is already on a network
Opening question: *Your laptop says your address is `192.168.1.23`. A website says you are `203.0.113.45`. Which one is lying?*
Purpose: see that the learner's own devices are already a network with real numbers, learn what a packet is, and set up the lab environment.
Hours: 3.0 (180 min)

| # | Chapter | One-line outcome | Type | Min | Play / practice |
|---|---|---|---|---|---|
| 1.1 | Two addresses, one laptop | Write down the address your laptop shows and the one a website sees, and pose the course question | Read | 15 | Step through your computer's own address (`ipconfig` on Windows, `ip addr` on Linux) and `curl ifconfig.me` side by side, each number labelled "explained in module N" `[sequence]` |
| 1.2 | What actually leaves your laptop | Name the addresses, ports and TTL in a real captured packet | Learn | 35 | Tap each field of a real DNS query packet to see what it is for `[packet]` |
| 1.3 | Why networks come in layers | Explain the three problems the layers solve (this link, the whole internet, which app) and watch a packet get wrapped and unwrapped | Learn | 30 | Wrap a message in TCP, IP and Ethernet headers and unwrap it at the other end `[sequence]` |
| 1.4 | Set up your network lab | Create `networking-challenges`, start the lab environment, record your address, gateway, DNS server and public address | Build | 60 | Challenge 0: setup |
| 1.5 | Your laptop on a network | Graded scenarios | Check | 15 | |
| 1.6 | Your home network on one page | Draw your devices, router and provider with real numbers, and list three questions you cannot answer yet | Gate | 25 | |

### Module 2: IP addresses, and why we ran out
Opening question: *There are more phones on Earth than IPv4 addresses. So how does yours have one?*
Purpose: understand an address as a number, why classful addressing died, how CIDR replaced it, and why private ranges exist at all.
Hours: 3.9 (235 min)

| # | Chapter | One-line outcome | Type | Min | Play / practice |
|---|---|---|---|---|---|
| 2.1 | 4.3 billion was supposed to be enough | See the free pool of addresses run dry, from the global pool in 2011 to the regional registries | Read | 10 | The address pool draining year by year, region by region `[timeline]` |
| 2.2 | An address is one 32-bit number | Convert between dotted form, binary and one number, and explain why no part goes above 255 | Learn | 35 | Flip any of the 32 bits and watch the dotted address and the number change `[addr: bits]` |
| 2.3 | Classes: the first plan, and why it died | Explain how class A, B and C sizes wasted addresses and bloated routing tables | Learn | 35 | Hand out addresses to five organisations by class, then by CIDR, and compare waste and routing entries `[addr: allocate]` |
| 2.4 | CIDR: one slash that saved the internet | Read any `/n`, give its block size and mask, and explain why `/24` means 256 addresses | Learn | 40 | Drag the prefix from `/8` to `/32` and see the block, the mask in binary and the count `[addr: prefix]` |
| 2.5 | Private ranges: why your address is shared by millions | Explain why RFC 1918 ranges exist, why they cannot cross the internet, and what `127.0.0.1`, `169.254.x.x` and `100.64.x.x` mean | Learn | 35 | Sort twelve addresses taken from real outputs into public, private and special, with feedback `[addr: classify]` |
| 2.6 | Code: addresses as numbers | Implement `ipToNumber`, `numberToIp`, `isPrivate` and `isSpecial` | Code | 40 | Graded tests |
| 2.7 | IP addresses | Graded scenarios | Check | 15 | |
| 2.8 | Why your phone starts with 192.168 or 10 | A 120-word explanation for a friend, plus a sorted list of addresses | Gate | 25 | |

### Module 3: Subnets, and why we split networks
Opening question: *You connect to the office VPN from home and your own printer disappears. Nothing is broken. What happened?* (Both networks are `192.168.1.0/24`.)
Purpose: do the subnet arithmetic, see why networks are split, plan addresses without overlaps, and build the first two-device network.
Hours: 5.4 (325 min)

| # | Chapter | One-line outcome | Type | Min | Play / practice |
|---|---|---|---|---|---|
| 3.1 | The VPN that ate the printer | See two networks with the same range send a packet the wrong way | Read | 10 | Home and office both on `192.168.1.0/24`; send to the printer and watch it go into the tunnel `[netlab: host, router, vpn]` |
| 3.2 | Network part, host part and the mask | Find the network address, broadcast address and host range with an AND, and decide whether two addresses share a subnet | Learn | 40 | Line up an address and a mask bit by bit and see the AND result `[addr: mask-and]` |
| 3.3 | Why split a network at all | Explain broadcast reach, blast radius and address planning with numbers | Learn | 35 | One flat network of 200 devices versus four subnets: send a broadcast and count who must read it `[netlab: hosts, switch, router]` |
| 3.4 | Cutting a block into subnets | Split a `/24` by host counts and explain why each piece must start on its own boundary | Learn | 40 | Cut a block into pieces for given host counts; misaligned cuts are refused with the reason `[addr: split]` |
| 3.5 | Overlaps: the bug you find months later | Spot overlaps among a home network, a VPN, Docker's default `172.17.0.0/16` and a cloud network | Learn | 30 | Drag ranges on one number line and see overlaps light up `[addr: overlap]` |
| 3.6 | Code: a subnet calculator | Implement network, broadcast, size, contains, split and overlaps | Code | 45 | Graded tests |
| 3.7 | Two devices on one cable | Join two namespaces with a virtual cable; ping works in one subnet and fails across a mask mismatch, and read the error | Build | 50 | Challenge 1 |
| 3.8 | Lab: plan the school network | Fit three computer labs, staff, guest Wi-Fi and printers into one `/22` with room to grow and no overlaps | Lab | 35 | `[netlab: plan mode]`, checks pass or fail |
| 3.9 | Subnets | Graded scenarios | Check | 15 | |
| 3.10 | Defend your address plan | The 3.8 plan with 150 words on why each size | Gate | 25 | |

### Module 4: How a packet finds its way
Opening question: *Run `traceroute` to a big website. A dozen machines you have never heard of touch your packet. Who are they, and how does each one know where to send it next?*
Purpose: local delivery with MAC and ARP, the default gateway, routing tables, TTL, and how networks of networks find each other; build a router.
Hours: 6.3 (380 min)

| # | Chapter | One-line outcome | Type | Min | Play / practice |
|---|---|---|---|---|---|
| 4.1 | A dozen hops to a website | Run `tracert` or `traceroute` on your own computer (not the lab), read it line by line and mark what you cannot explain yet, such as a private address several hops out | Read | 15 | A real traceroute, one hop at a time, with the questions each line raises `[sequence]` |
| 4.2 | Neighbours first: MAC addresses and ARP | Explain why a packet on your Wi-Fi needs a MAC address, and read `ip neigh` | Learn | 35 | Send to a neighbour with an empty ARP table and step through the ARP request and reply `[netlab: hosts, switch]` |
| 4.3 | Leaving your subnet: the default gateway | Predict which MAC a packet is sent to for a local and a remote destination, and see the MAC change at every hop while the IP stays | Learn | 35 | Packet inspector on each link of a two-router path `[netlab: hosts, switch, router, inspector]` |
| 4.4 | Routing tables and longest prefix match | Pick the route a router uses for any destination, and check it with `ip route get` | Learn | 40 | Edit a routing table and send packets to five destinations; the chosen row lights up `[netlab: router table]` |
| 4.5 | TTL: how traceroute gets routers to answer | Explain TTL, ICMP Time Exceeded, and why some hops show `* * *` | Learn | 30 | Send probes with TTL 1, 2, 3 and watch which router answers `[netlab: inspector, TTL step]` |
| 4.6 | Networks of networks | Explain autonomous systems and route announcements, and what happened when Facebook's routes disappeared in October 2021 | Learn | 30 | Five networks announcing prefixes; withdraw one and watch lookups fail `[netlab: AS mode]` |
| 4.7 | Code: longest prefix match | Implement a routing table lookup, including the default route | Code | 40 | Graded tests |
| 4.8 | Build a router | Two subnets and a router namespace: turn on forwarding, add routes, ping across, capture the MAC change with `tcpdump` | Build | 75 | Challenge 2 |
| 4.9 | Lab: fix the broken office | Find and fix three faults: a wrong mask, a wrong gateway and a missing return route | Lab | 40 | `[netlab: fault mode]`, checks pass or fail |
| 4.10 | Routing | Graded scenarios | Check | 15 | |
| 4.11 | Your traceroute, explained | Explain your own traceroute hop by hop in 150 words | Gate | 25 | |

### Module 5: Ports, TCP and UDP: which app gets the packet
Opening question: *Your laptop has one address, but forty browser tabs, a music app and a chat app are all talking at once. When a reply arrives, how does it find the right app?*
Purpose: ports, sockets and the 5-tuple (which NAT depends on), TCP's handshake and reliability, and why some apps choose UDP.
Hours: 3.6 (215 min)

| # | Chapter | One-line outcome | Type | Min | Play / practice |
|---|---|---|---|---|---|
| 5.1 | One address, forty conversations | Run `ss -tn`, count your open conversations and read one line | Read | 10 | |
| 5.2 | Ports and sockets | Explain ports, well-known and ephemeral ranges, and the 5-tuple that names a conversation | Learn | 35 | Replies arrive at a laptop running three apps; match each to its socket `[netlab: host sockets]` |
| 5.3 | TCP: a conversation that survives loss | Explain the handshake, sequence numbers and retransmission | Learn | 40 | Step through a handshake and a transfer, then drop a segment and watch the retransmit `[sequence]` |
| 5.4 | UDP: why DNS, games and calls skip the handshake | Choose TCP or UDP for an app by delay and what a lost packet costs | Learn | 30 | The same messages over TCP and UDP with loss turned up `[timeline]` |
| 5.5 | Watch a conversation happen | A server in one namespace, a client in another: capture SYN, SYN-ACK, ACK and read both sides with `ss` | Build | 60 | Challenge 3 |
| 5.6 | Ports and transport | Graded scenarios | Check | 15 | |
| 5.7 | Name every field | Explain each part of your captured 5-tuple and what it is for (120 words) | Gate | 25 | |

### Module 6: NAT: how every device at home reaches the internet
Opening question: *All your devices are connected to your router, and none of them has a public address. So how do they talk to the internet?*
Purpose: answer the course question. The NAT table, why the internet cannot call you, carrier-grade NAT, living with NAT, and building a home router.
Hours: 6.1 (365 min)

| # | Chapter | One-line outcome | Type | Min | Play / practice |
|---|---|---|---|---|---|
| 6.1 | Fifteen devices, one public address | See that a server receives the same source address from your phone and your laptop | Read | 10 | Send a request from two home devices and compare what the server sees `[netlab: home router, server]` |
| 6.2 | The NAT table: rewriting addresses and ports | Predict a packet's source address and port after the router, and how the reply finds its way back | Learn | 40 | Watch the NAT table fill as devices open connections; inspect the packet before and after the router `[netlab: home router, NAT table, inspector]` |
| 6.3 | Why the internet cannot call you | Explain why unsolicited inbound packets are dropped, set up port forwarding, and recognise it in `docker run -p 8080:80` | Learn | 35 | Send an inbound packet with no mapping, then add a forwarding rule `[netlab: home router, forwarding]` |
| 6.4 | Carrier-grade NAT: when your router is not public either | Compare your router's outside address with what a website sees, and explain `100.64.0.0/10` and mobile networks | Learn | 30 | Two layers of NAT; inspect the packet at each `[netlab: home router, provider NAT]` |
| 6.5 | Living with NAT: timeouts, keepalives and video calls | Explain why idle connections break behind NAT and, at a glance, how calls get through with STUN | Learn | 35 | A mapping expires during a quiet period; turn on keepalives and see it survive `[timeline]` |
| 6.6 | Code: a NAT table | Translate outbound packets, allocate ports, translate replies, drop unknown inbound packets, expire old mappings | Code | 45 | Graded tests |
| 6.7 | Build a home router | Put home devices behind a router namespace with an nftables masquerade rule; capture inside and outside to see the source rewritten; then forward a port to a web server | Build | 90 | Challenge 4 |
| 6.8 | Lab: reach the home server from outside | Level 1: forward a port. Level 2: two web servers want port 80. Level 3: the provider adds carrier-grade NAT; explain why forwarding stops working and what still can | Lab | 40 | `[netlab: home router, provider NAT]`, three levels |
| 6.9 | NAT | Graded scenarios | Check | 15 | |
| 6.10 | Answer the course question | Answer "how do devices without public addresses reach the internet?" with your own capture (150 words) | Gate | 25 | |

### Module 7: Joining a network and finding names: DHCP and DNS
Opening question: *Your phone says "Connected", the browser says "No internet". What exactly is broken, and how would you find out?*
Purpose: how a device gets its settings, how names become addresses, why DNS changes are slow and DNS outages are loud, and a layer-by-layer way to debug.
Hours: 4.3 (260 min)

| # | Chapter | One-line outcome | Type | Min | Play / practice |
|---|---|---|---|---|---|
| 7.1 | Connected, no internet | List the five places it can break, from the radio to the name | Read | 10 | |
| 7.2 | DHCP: how your phone got an address in under a second | Explain discover, offer, request and acknowledge, what the lease contains, and the `169.254.x.x` address you get when it fails | Learn | 35 | Step through the four messages, then shrink the address pool until a new phone gets nothing `[sequence]` then `[netlab: DHCP server]` |
| 7.3 | DNS: from a name to an address | Explain resolvers, root, top-level and authoritative servers, and follow `dig +trace` | Learn | 40 | Step through a resolution with an empty cache, then again with a warm one `[sequence]` |
| 7.4 | Caches and TTLs: why DNS is slow to change and loud when it fails | Predict how long an old answer survives, and explain a real DNS outage | Learn | 30 | Change a record and watch resolvers with different TTLs pick it up `[timeline]` |
| 7.5 | Debugging "no internet" layer by layer | Pick the right command for each layer (link, address, gateway, DNS, route) and read its output | Learn | 35 | Five broken networks; choose a command, read the real output, find the fault `[netlab: fault mode]` |
| 7.6 | Run your own DHCP and DNS | Run dnsmasq on your router namespace: a device gets a lease, devices get names, `dig` answers | Build | 70 | Challenge 5 |
| 7.7 | DHCP and DNS | Graded scenarios | Check | 15 | |
| 7.8 | A "no internet" runbook | A runbook for your family's Wi-Fi, one command per layer (150 words) | Gate | 25 | |

### Module 8: IPv6, the way out
Opening question: *Your phone probably has an IPv6 address right now. Check. Why does nobody talk about it?*
Purpose: the long-term answer to running out: reading IPv6 addresses, a network without NAT, and why IPv4 is still everywhere.
Hours: 2.6 (155 min)

| # | Chapter | One-line outcome | Type | Min | Play / practice |
|---|---|---|---|---|---|
| 8.1 | The address you did not know you had | Find your IPv6 addresses on your laptop and phone | Read | 10 | |
| 8.2 | Reading IPv6 addresses | Read 128-bit addresses, apply the shortening rules, and explain why a subnet is a `/64` | Learn | 35 | Shorten and expand addresses; wrong shortenings are refused with the rule `[addr: v6]` |
| 8.3 | A network without NAT | Explain global addresses for every device, SLAAC, a firewall instead of NAT, and dual stack | Learn | 35 | The same home network with IPv4 and NAT, then with IPv6: compare what the server sees `[netlab: IPv6 toggle]` |
| 8.4 | IPv6 in your lab network | Give your namespaces IPv6 addresses and `ping -6` across the router | Build | 40 | Challenge 6 |
| 8.5 | IPv6 | Graded scenarios | Check | 15 | |
| 8.6 | Why IPv4 is still here | 100 words: one reason IPv6 helps and one reason IPv4 and NAT will last | Gate | 20 | |

### Module 9: Capstone: a whole internet on one laptop
Opening question: *You press Enter on a link. Before the page appears, your laptop has already used almost everything in this course. Can you name every step?*
Purpose: tie it all together, build a complete network, break it and fix it, and explain it in a demo.
Hours: 5.1 (305 min)

| # | Chapter | One-line outcome | Type | Min | Play / practice |
|---|---|---|---|---|---|
| 9.1 | What really happens when you open a link | Step through every packet from DNS to the first byte of the page: ARP, gateway, NAT, routes, TCP | Learn | 30 | The full journey in one network, packet by packet `[netlab: all parts]` |
| 9.2 | Capstone part 1: build it | A home subnet and a guest subnet, a router with NAT, DHCP and DNS, a provider router and a public web server; tests prove what must work and what must not (guest cannot reach home) | Build | 150 | Challenge 7, part 1 |
| 9.3 | Capstone part 2: break it, fix it | A script injects three random faults; find each with commands and write what you saw | Build | 60 | Challenge 7, part 2 |
| 9.4 | Demo and defence | Record a five-minute demo and answer three mentor probes | Gate | 45 | |
| 9.5 | Final check | Graded scenarios across the course | Check | 20 | |

---

## Totals

| Module | Chapters | Minutes | Hours |
|---|---|---|---|
| 1 Your laptop is already on a network | 6 | 180 | 3.0 |
| 2 IP addresses, and why we ran out | 8 | 235 | 3.9 |
| 3 Subnets | 10 | 325 | 5.4 |
| 4 How a packet finds its way | 11 | 380 | 6.3 |
| 5 Ports, TCP and UDP | 7 | 215 | 3.6 |
| 6 NAT | 10 | 365 | 6.1 |
| 7 DHCP and DNS | 8 | 260 | 4.3 |
| 8 IPv6 | 6 | 155 | 2.6 |
| 9 Capstone | 5 | 305 | 5.1 |
| **Total** | **71** | **2,420** | **about 40** |

Learn chapters: 29, each with an interactive element. Code exercises: 4. Build chapters: 9 (challenges 0 to 7). Labs: 3 graded (3.8, 4.9, 6.8) plus the fault mode in 7.5. Share of time: reading and concept work about 45%, building and code about 40%, checks, gates and the demo about 15%.

### Stretch path (about 8 hours, optional)

| # | Stretch | Builds on | Min |
|---|---|---|---|
| S1 | Read your capture in Wireshark, field by field | 5.5, 6.7 | 60 |
| S2 | A WireGuard tunnel between two namespaces, and the overlap problem from 3.1 for real | 3.5, 6.7 | 120 |
| S3 | MTU, fragmentation and the black hole that breaks only big pages | 4.8 | 90 |
| S4 | A tiny traceroute in a shell script using `ping` with growing TTL | 4.5 | 60 |
| S5 | An IPv6-only home network | 8.4 | 90 |
| S6 | Read your home router's own pages: its DHCP leases, NAT and port forwarding settings | 6.3, 7.2 | 60 |

## Interactive pieces

The roadmap only lists what each lesson needs. No lab or canvas code is built at this stage.

### Existing renderers, data only

- `[sequence]`: 1.1, 1.3, 4.1, 5.3, 7.2, 7.3. Step-through of messages between actors with step controls.
- `[timeline]`: 2.1, 5.4, 6.5, 7.4. Events over time with an input that changes them (loss, idle time, TTL).

### New canvas: the address renderer `[addr]`

One renderer with modes, all driven by the same small address library (the same functions the code exercises ask learners to write, so the reference solution and the canvas cannot disagree).

| Mode | What the learner manipulates | Chapters |
|---|---|---|
| `bits` | Flip any of 32 bits; dotted form and number update | 2.2 |
| `allocate` | Give blocks to organisations by class, then by CIDR; waste and routing entries counted | 2.3 |
| `prefix` | Drag the prefix length; block, mask and count update | 2.4 |
| `classify` | Sort addresses into public, private and special | 2.5 |
| `mask-and` | Address and mask lined up bit by bit; network, broadcast and same-subnet answer | 3.2 |
| `split` | Cut a block into aligned subnets by host count | 3.4 |
| `overlap` | Ranges on one number line; overlaps highlighted | 3.5 |
| `v6` | Shorten and expand IPv6 addresses | 8.2 |

### New canvas: `[packet]`

A real captured packet (a DNS query from the lab environment) with every header field tappable: what it is, who set it, and which module explains it. Used in 1.2, and again in 9.1 as a reference. Data only after the first build.

### New lab family: the network lab `[netlab]`

The existing lab platform (`frontend/src/lab`, branch `content/system-design`) models requests, load and latency through tiers. Networking needs a different model: **addresses and packets**. It needs a new lab family (`family: "net"`) with its own deterministic model that walks one packet at a time: decide local or remote by prefix, resolve the next hop's MAC with ARP, look up the route by longest prefix match, decrease TTL, rewrite addresses and ports at a NAT, apply a forwarding or drop rule, and record every hop for the inspector. Checks are reachability assertions ("laptop reaches the server", "guest cannot reach the printer"), not load levels.

| Part | What it is | First used | Also in |
|---|---|---|---|
| Host | A laptop, phone, printer or server with interfaces (address, prefix, MAC), a gateway, a DNS server and a socket table | 3.1 | almost every netlab chapter |
| Switch | One local network segment; shows broadcasts and ARP | 3.3 | 4.2, 4.3 |
| Router | Several interfaces, an editable routing table, TTL decrease, forwarding on or off | 3.1 | 4.3 to 4.6, 4.9, 9.1 |
| Packet inspector | Header view (MACs, addresses, ports, TTL) on any link, step by step | 4.3 | 4.5, 6.2, 6.4, 9.1 |
| Home router | A preset: router plus NAT plus DHCP server plus DNS forwarder | 6.1 | 6.2 to 6.4, 6.8, 7.5, 8.3, 9.1 |
| NAT table | Live translation table (inside address and port, outside address and port, timer); forwarding rules | 6.2 | 6.3, 6.8 |
| Provider NAT | A carrier-grade NAT router with `100.64.0.0/10` inside | 6.4 | 6.8 |
| DHCP server | Address pool, leases, options | 7.2 | 7.5, 9.1 |
| DNS resolver and servers | Recursive resolver with a cache and TTLs; root, top-level and authoritative servers | 7.5 | 9.1 |
| VPN tunnel | A route that sends a range into a tunnel | 3.1 | |
| Autonomous system | A network that announces prefixes; announcements can be withdrawn | 4.6 | |
| IPv6 toggle | Global IPv6 addresses on hosts; NAT off, firewall on | 8.3 | |

Lab modes: **explore** (send packets freely), **step** (one packet, one hop at a time), **plan** (assign address blocks; checks for fit and overlap; 3.8), **fault** (a broken network with commands to run and real-looking output; 4.9, 7.5), **AS** (prefix announcements; 4.6). Public addresses in labs use the documentation ranges (`192.0.2.0/24`, `198.51.100.0/24`, `203.0.113.0/24`) so no lab shows a real organisation's address.

Build order, if the instructors confirm: host, switch, router and inspector first (they unlock modules 3 and 4), then the home router and NAT table (module 6), then DHCP and DNS (module 7), then the rest. Until a part ships, its chapter falls back to `[sequence]` with the same packets, so no chapter is blocked on lab code.

### Terminal work

Two kinds, both on the learner's laptop:

1. **Challenges** in the learner's `networking-challenges` repository (the Build chapters). Every challenge part has a script that builds its network from nothing and a teardown, a test that must pass (and one that must fail), the captured output, and a README in the house shape.
2. **"Try it on your machine"** boxes inside Learn chapters: one or two read-only commands on the learner's real network (`ip addr`, `ip route`, `ip neigh`, `ip route get`, `traceroute`, `ss -tn`, `dig`, `curl ifconfig.me`). Optional, with the expected output shown for phone readers.

| Challenge | Chapter | Parts |
|---|---|---|
| 0 setup | 1.4 | check the tools, record your own network |
| 1 two-devices | 3.7 | a virtual cable, same subnet, mask mismatch |
| 2 router | 4.8 | two subnets, forwarding and routes, the MAC change in a capture |
| 3 conversation | 5.5 | a server and a client, the handshake in a capture, `ss` on both sides |
| 4 home-router | 6.7 | masquerade, captures on both sides, port forwarding |
| 5 dhcp-dns | 7.6 | DHCP lease, local names, `dig` |
| 6 ipv6 | 8.4 | addresses, routes, `ping -6` |
| 7 capstone | 9.2, 9.3 | build it, break it and fix it |

Layout: `challenges/challenge-N-short-name/part-N-short-name/` with `README.md`, one script, `results.md` and a test per part; shared helpers in `toolkit/`. Template repository `devweekends/networking-challenges`; reference solutions in the private `AQIB-NAWAB/buildment-courses/networking/`, as for system design.

## Build environment

- **Default:** one pinned image based on `ubuntu:24.04` with the course tools (`iproute2`, `nftables`, `tcpdump`, `dnsmasq-base`, `bind9-dnsutils`, `traceroute`, `iputils-ping`, `netcat-openbsd`, `curl`, and a DHCP client), started with `docker run --privileged`. Same commands and versions on Windows, macOS and Linux. About 200 MB on disk; the download size is measured and stated in 1.4 before publish.
- **Also supported:** a Linux laptop or Ubuntu 24.04 in WSL 2, running the same scripts with `sudo`.
- **Tested on 2026-10-24** (dossier 5.5) on Docker Desktop for Windows: namespaces, virtual cables and a bridge, forwarding, an nft masquerade rule with the rewritten source address and port visible in `tcpdump`, `traceroute`, DHCP leases and DNS answers from dnsmasq, and IPv6 between namespaces. Not yet tested: Docker Desktop on macOS.
- **Safety note in 1.4:** `--privileged` gives the container power over the Docker VM. The course uses it only for this lab container, never for anything downloaded from elsewhere.
- **Two places to type commands.** Commands about the learner's real internet path run on the host: `tracert` (Windows) or `traceroute` (macOS, Linux), `curl ifconfig.me`, the host's own address settings. Inside the lab container, Docker Desktop's networking hides the routers in between: the test trace showed `172.17.0.1` and then the destination, with nothing in between (dossier 5.5). The lab container is for the networks the learner builds. Chapters 1.1, 1.4, 4.1 and 6.4 say on which side each command runs, and 1.4 turns the difference into a puzzle that module 6 answers.
- **macOS and Windows hosts** have no `ip` command. 1.4 shows the host equivalents once (`ipconfig` and `tracert` on Windows; `ifconfig`, `netstat -rn` and `route get` on macOS, to be checked on a Mac). Everything else happens inside the lab.

## Gate evidence at a glance

| Module | Gate evidence |
|---|---|
| 1 | One-page map of the learner's home network with real numbers, plus challenge 0 results |
| 2 | 120-word explanation of private addresses for a friend, plus a sorted address list |
| 3 | Address plan for the school network with a 150-word defence, plus challenge 1 link |
| 4 | Own traceroute explained hop by hop (150 words), plus challenge 2 link |
| 5 | Own captured 5-tuple explained (120 words), plus challenge 3 link |
| 6 | The course question answered with the learner's own capture (150 words), plus challenge 4 link |
| 7 | "No internet" runbook with one command per layer (150 words), plus challenge 5 link |
| 8 | 100 words on IPv6 and why IPv4 stays, plus challenge 6 link |
| 9 | Capstone repository, fault write-up and recorded demo |

## Capstone

- What the learner ships: challenge 7 in their repository. One script builds a home subnet and a guest subnet behind a router that does NAT, DHCP and DNS, a provider router, and a "public" web server on a documentation address. Tests prove that home and guest devices get leases, resolve names and reach the web server, that the guest subnet cannot reach the home subnet, and that the web server sees only the router's outside address. Captures from both sides of the router are committed. A fault script injects three random faults from a list (wrong mask, forwarding off, missing route, DHCP pool exhausted, DNS server down, masquerade rule missing); the learner's write-up names each fault, the command that found it and the fix.
- Five-minute demo: the address plan; a device getting its lease; a `curl` with captures on both sides of the router showing the rewritten source address and port; one fault and how it was found; what changes if both subnets used the same range.
- Defence probes (mentor picks three): Why does the server see only one address? What breaks if the guest subnet is `/30`? Why does your traceroute show the router? How would the web server reach a home device? What would IPv6 change in this network? Which of your tests would catch a missing return route?
- Production requirements: the build script runs from a clean environment and tears down cleanly; tests pass; every command in the write-up is one the learner ran.
- Mentor review: rubric in 9.4 (address plan, working network, captures as evidence, diagnosis, explanation), under 30 minutes.

## Variants

None. This is a short foundations course. Follow-on depth: cloud networking (VPCs, subnets, route tables, NAT gateways, security groups) in the AWS course, reusing the network lab; container networking in the Linux course, reusing challenges 2 and 4.

## Out of scope

- Physical and radio layers (cabling, Wi-Fi channels and security): learners cannot see or change them on their own machines, and they do not change how software engineers debug.
- The OSI model as a list to memorise: 1.3 teaches why layers exist with the layers learners see in a packet.
- Certification topics and drills (CCNA, Network+), vendor router configuration, VLAN trunking, spanning tree, OSPF and BGP configuration: network engineering, not what software engineers need.
- TLS, HTTP versions, handshake cost and real-time connections: taught in the system design course, module 3, which builds on this course.
- Firewalls beyond the NAT, forwarding and isolation rules the challenges need.
- How namespaces work inside the kernel: the Linux course.
- Writing a TCP stack or raw-socket tools.

## Open decisions for instructors

| # | Decision | Recommendation | Instructor decision |
|---|---|---|---|
| 1 | Build environment for challenges | The pinned Ubuntu 24.04 image with `--privileged` as the single default (tested on Windows); Linux and WSL 2 with `sudo` also supported; a macOS run before the blueprint is locked | |
| 2 | A new `net` lab family on the lab platform (a packet-and-address model, reachability checks) is a platform change | Approve it as a separate lab family with its own model; build host, switch, router and inspector first; chapters fall back to `[sequence]` until a part ships | |
| 3 | Overlap with the system design course, module 3 | Make this course the prerequisite; system design module 3 keeps handshake cost, DNS for routing traffic, HTTP versions and real-time, and links here for the basics | |
| 4 | Overlap with the Linux course on namespaces | This course uses network namespaces as a tool with short recipes; the Linux course explains namespaces and cgroups and reuses challenges 2 and 4 for container networking | |
| 5 | Course order among the infra courses | Networking first, then Linux, then Kubernetes, then AWS, as the sponsor ranked them. The Build chapters need only the shell basics stated in the prerequisites | |
| 6 | Phone-only learners cannot run the Build chapters | Completion requires challenges 0 to 7. Phone-only learners can do every Learn chapter, lab and quiz, and finish the challenges when they reach a laptop; each Build chapter shows its recorded output | |
| 7 | IPv6 depth: a 2.6 hour module | Keep it short but separate: it is the real answer to running out, and learners' phones already use it | |
| 8 | 4.6 (autonomous systems and BGP) is the only chapter beyond the learner's own network | Keep it as one chapter, anchored on the October 2021 Facebook outage; no BGP configuration | |
| 9 | Fictional public addresses | Use only the documentation ranges in labs, prose and quizzes; learners' own outputs stay their own | |

## Confirmation

G2B status: **pending**.

| Instructor | Role | Decision (approve/revise/reject) | Comments | Date |
|---|---|---|---|---|
| | | | | |
| | | | | |
