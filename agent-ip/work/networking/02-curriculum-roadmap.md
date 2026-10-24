---
artifact: curriculum-roadmap
course: networking
version: 3
status: draft
owner: curriculum-architect
instructors_reviewed: [Zeeshan (architect, human sponsor)]
g2b_signoff: complete (sponsor approval with a sponsor exception; see roadmap-confirmation.md)
depends_on: 00-course-brief.md, 01-research-dossier.md, qa/g2a-critique-pedagogy.md, qa/g2a-critique-technical.md
---

# Curriculum roadmap: Networking, Hands On

## In one paragraph

The course opens with a question every learner can check in ten seconds: your computer says its address is `192.168.1.23`, but a website says you are someone else. Which address is yours? From there it answers the question the whole course is built around: **all your devices are connected to a router and none of them has a public address, so how do they talk to the internet?** A first look at the answer comes in module 2, and the full answer, built with the learner's own hands, in module 6. Every Learn chapter starts with a problem from the learner's world, with a real number, before it names the idea (the "Problem first" column). Learners predict, then play with interactive pieces where a packet's addresses, ports and TTL change hop by hop, and they practise the arithmetic by hand until they no longer need a calculator. They write the core logic in small JavaScript exercises (address arithmetic, longest prefix match, a NAT table). On a laptop they build real networks out of Linux network namespaces in their own `networking-challenges` repository, starting in the first sitting, about two hours in, with two "computers" inside their own laptop that ping each other, and ending with a whole small internet on one machine that they break on purpose, fix with real commands, and explain in a five-minute demo.

## Learner and entry prerequisites

- Learner: fellowship fellows and early-career engineers who use the internet daily and can build a small web app, but have never looked inside the network. Many read on phones with metered data and power cuts; English is a second language for many.
- Prior knowledge: open a terminal and run a command; basic JavaScript (functions, arrays, numbers); Git and GitHub. Binary numbers, JavaScript bit operators and the shell commands the course needs (cd, ls, cat, nano, sudo, Ctrl+C, exit) are taught inside the course, in 2.2, 2.5 and 1.3.
- Time available: about 12 hours a week. Core path about 42 hours; slow path about 54 hours (see Totals). Four to five weeks.
- Entry diagnostic: chapter 1.1 asks the learner to write down their own address and the one a website sees, and to guess why they differ. The same question returns in gate 6.11 and the demo, answered with their own capture.
- Equipment for the Build chapters: a laptop with 8 GB of memory for Docker Desktop (the requirement Docker states), or a Linux laptop. Windows 11 (Docker Desktop states 23H2 or later) or macOS. Downloads: the Docker Desktop installer and the course image (about 200 MB unpacked; both sizes measured and stated in 1.2 before publish). No cloud account and no money.
- Phone-only learners: every Learn chapter, lab, drill and quiz works on a 375px screen. See open decision 8 for what they can complete.

## Outcomes

Every outcome has at least one graded piece of evidence.

| # | Outcome (observable verb) | Graded evidence |
|---|---|---|
| O1 | Read their own computer's address, mask, gateway, DNS server and public address, and explain where each came from | Challenge 0 (1.2, 1.3); gate 1.8; demo 8.7 |
| O2 | Classify an address as public, private, shared or special against the IANA registry, and explain why private ranges and NAT exist | Code exercise 2.5; quiz 2.6; gate 2.7 |
| O3 | Do CIDR arithmetic (network, broadcast, size, host range, same subnet, split, overlap) by hand without a calculator, and in code | Unassisted drills in 2.2, 2.3, 3.2 and 3.5; code exercises 3.7 and 3.8; lab 3.10; quiz 3.11 |
| O4 | Trace a packet from laptop to server (gateway decision, ARP, longest prefix match, TTL, ports, TCP handshake) and confirm each step with commands | Code exercise 4.6; challenges 2 and 3; lab 4.8; quizzes 4.9 and 5.7; gate 4.10 |
| O5 | Demonstrate NAT: show the source address rewritten (and the port when two devices clash) in a router they built, read the real NAT table, explain why the internet cannot reach a home device, and recognise carrier-grade NAT | Code exercise 6.6; challenge 4; lab 6.9; quiz 6.10; gate 6.11 |
| O6 | Explain DHCP and DNS (including caching and TTL), and diagnose "no internet" layer by layer | Lab 7.5 (graded diagnosis); fault level in lab 6.9; challenge 5; capstone part 4 (8.5) |
| O7 | Build a network from Linux network namespaces (subnets, router, NAT, port forwarding, isolation, DHCP, DNS) and prove it works and fails with tests and captures | Challenges 1, 2, 4 and 5; capstone 8.2 to 8.5 |

## Chapter types

| Type | What the learner does | Typical minutes |
|---|---|---|
| Read | Opens a module with a real puzzle from the learner's own world, usually a command on their own computer | 10 to 15 |
| Learn | One idea. The problem first (a question from the learner's world, with a real number, which is also the prediction prompt), then the interactive piece, then the explanation, then a quick check | 30 to 45 |
| Code | Graded JavaScript in the browser; server tests check it; a hint ladder, and a reference helper unlocks after three failed attempts so later exercises never depend on a failed one | 35 to 45 |
| Build | One part of a challenge in the learner's `networking-challenges` repository, run in the lab, with captured output committed. Support fades: see "How the challenges are scaffolded" | 45 to 75 (slow path up to 110) |
| Lab | A graded scenario in the network lab: a broken or empty network, a goal, commands to run against it, and checks that pass or fail | 40 |
| Check | Graded quiz, three to five questions, always mixing in questions from earlier modules | 15 to 20 |
| Gate | Checklist, learning log and one answer a mentor reads. The answer may be written, a voice note or a labelled diagram, and learners carry on while it waits for review | 15 to 60 |

"Runs on" labels: every command block in the course says **On your computer** or **In the lab**. Commands about the learner's real internet path run on their own computer; the networks they build run in the lab (see "Build environment").

---

### Module 1: Your laptop is already on a network
Opening question: *Your computer says your address is `192.168.1.23`. A website says you are `203.0.113.45`. Which address is yours?* (Course addresses for "the internet" come from the documentation ranges; learners' own outputs show real ones.)
Purpose: see that the learner's own devices already form a network with real numbers, set up the lab, build a first network in the first sitting, and only then explain what the capture showed.
Hours: 3.8 core (230 min)

| # | Chapter | Problem first | Learner can then | Type | Min | Play / practice |
|---|---|---|---|---|---|---|
| 1.1 | Which address is yours? | Your computer and a website disagree about your address | Write down your computer's address, the IPv4 address a website sees (`curl.exe -4 ifconfig.me` on Windows, `curl -4 ifconfig.me` elsewhere), your DNS server and any IPv6 address, and state the course question | Read | 15 | On your computer: annotated outputs for Windows, macOS, Linux and phone; a note that a shared or IPv6 result is normal and explained later |
| 1.2 | Install the lab | | Start the download first, install the lab, pass the setup checker (five named failures, each with its fix) and read the safety note | Build | 40 | Challenge 0 part 1, guided; slow path 90 |
| 1.3 | Seven commands and your own numbers | | Use cd, ls, cat, nano, sudo, Ctrl+C and exit with a self-check, and record your own numbers (the checker prints your mask as a prefix, so macOS hex masks need no maths yet) | Build | 25 | Challenge 0 part 2, guided; slow path 40 |
| 1.4 | Two computers inside your laptop | Can you make a network with no cable and no Wi-Fi? | Create two namespaces joined by a virtual cable (`/24` for now means "the first three numbers name the network"), `ping` one from the other (ICMP echo), and capture it with `tcpdump -n -v`. The first lines are ARP; module 3 explains them | Build | 45 | Challenge 1 part 1, guided; slow path 70 |
| 1.5 | What one ping actually sent | Your capture from 1.4 is a few lines of numbers. What exactly crossed the virtual cable? | Name the addresses, TTL and type in your ICMP echo, and the addresses, ports and TTL in a DNS query | Learn | 35 | Tap each field of the ICMP echo from 1.4 and of a real DNS query `[packet: inspect]` |
| 1.6 | Why does one packet carry three kinds of address? | Your Wi-Fi only reaches your router, yet your packet crosses the world and lands in one app. How can one packet manage all three jobs? | Explain the three jobs (this link: MAC, including the broadcast MAC; the whole internet: IP; which app: port) and wrap and unwrap a packet | Learn | 30 | Wrap a message in TCP, IP and Ethernet headers and unwrap it at the other end `[packet: wrap]`; a note that Wi-Fi frames differ and the lab uses Ethernet |
| 1.7 | Your laptop on a network | | Pick the right address, port or layer for five real outputs | Check | 15 | |
| 1.8 | Your home network on one page | | Map your devices, router and provider with real numbers and list three questions you cannot answer yet; branches if your public address was IPv6 or shared | Gate | 25 | |

### Module 2: IP addresses, and why we ran out
Opening question: *The world's free pool of IPv4 addresses ran out in 2011. Your phone got an address this morning. How?*
Purpose: an address as a number, why fixed classes failed and CIDR replaced them, why private ranges exist, and a first look at how a router rewrites addresses.
Hours: 3.5 core (210 min)

| # | Chapter | Problem first | Learner can then | Type | Min | Play / practice |
|---|---|---|---|---|---|---|
| 2.1 | 4.3 billion was supposed to be enough | Addresses ran out, yet the internet still works | Read the four exhaustion dates (IANA 2011, APNIC 2011, ARIN 2015, RIPE NCC 2019) and say what "ran out" means: no free pool, so addresses are traded and shared | Read | 10 | |
| 2.2 | An address is one 32-bit number | Why is `192.168.1.256` not an address? | Convert between dotted form, binary and one number, by hand | Learn | 35 | Flip any of 32 bits and watch the address change, then unassisted drills `[addr: bits, drill]` |
| 2.3 | From classes to CIDR | In 1993 a company with 300 computers could get a block with 254 usable addresses or one with 65,534. 254 is too few. What does taking the big one do to the internet? | Explain how fixed classes wasted addresses and grew routing tables, read any `/n` (size and mask), and show how one CIDR block can stand for many (aggregation) | Learn | 45 | Hand out blocks to five organisations by class, then by CIDR; count waste and routing entries; then drag the prefix and drill `[addr: allocate, prefix, drill]` |
| 2.4 | Private, shared and special addresses | Your laptop and millions of others are all `192.168.1.x` right now. Why is that allowed? | Classify addresses as public, private (RFC 1918), shared (`100.64.0.0/10`) or special (loopback, link-local, documentation and others, from the IANA registry); see one packet's address rewritten by a router, labelled "full story in module 6" | Learn | 40 | Sort twelve addresses from real outputs `[addr: classify]`; three-step first look at NAT `[sequence: laptop, router, server]` |
| 2.5 | Code: addresses as numbers | | Implement `ipToNumber`, `numberToIp` and `classify`; learn the JavaScript bit-operator step (`>>> 0`) first | Code | 45 | Graded tests |
| 2.6 | IP addresses | | Convert, size and classify addresses by hand, with two questions from module 1 | Check | 15 | |
| 2.7 | Why your phone starts with 192.168 or 10 | | Explain private ranges and the shortage to a friend, and name the question NAT must answer | Gate | 20 | |

### Module 3: Your local network: subnets and neighbours
Opening question: *On campus Wi-Fi your laptop gets `10.20.143.7` with mask `255.255.240.0`. At home it gets `192.168.1.23` with `255.255.255.0`. What is that second number, and why is it different?*
Purpose: the mask and the subnet arithmetic, how devices find each other on one network (MAC and ARP), why networks are split, how to plan addresses without overlaps.
Hours: 6.4 core (385 min)

| # | Chapter | Problem first | Learner can then | Type | Min | Play / practice |
|---|---|---|---|---|---|---|
| 3.1 | Two masks, two networks | Your mask changes when you change Wi-Fi | Find your own mask on your computer (on macOS it is printed in hex; the chapter shows how to read it) and say what you think it decides | Read | 10 | On your computer |
| 3.2 | Network part and host part | Your laptop sends to `192.168.1.40` directly but to `192.168.2.40` through the router. How does it decide? | Find the network address (address AND mask), the broadcast address (host bits set to 1), the host range and the same-subnet answer, by hand, including `/31` and `/32` | Learn | 40 | Line up address and mask bit by bit and see both operations, then drills `[addr: mask-and, drill]` |
| 3.3 | Neighbours: MAC addresses and ARP | You send a file to your friend's laptop at `192.168.1.40` on the same Wi-Fi. Wi-Fi delivers by hardware address, not IP. How does your laptop find your friend's? | Explain an ARP request (a broadcast) and reply, read `arp -a` or `ip neigh`, and say how a switch learns where each MAC lives | Learn | 35 | Send to a neighbour with an empty ARP table and step through the request, the reply and the switch's table `[netlab: hosts, switch]` |
| 3.4 | Why split a network | A school puts 600 devices in one network: staff laptops, the exam server and guest phones. One infected phone can now reach the exam server. What would you change? | Give the reasons to split (one block can serve several networks, faults and access stay contained, fewer devices hear each broadcast) | Learn | 35 | One flat network versus three subnets joined by a router (shown as a box that joins networks; module 4 opens it) with one labelled rule: who hears a broadcast, who can reach the exam server `[netlab: hosts, switch, router, filter]` |
| 3.5 | Cutting a block into subnets | You have `192.168.10.0/24` and need networks for 100, 50 and 20 devices. Where does each start? | Split a block by host counts and explain why each piece starts on its own boundary | Learn | 40 | Cut a block into pieces; misaligned cuts are refused with the reason; then drills `[addr: split, drill]` |
| 3.6 | Overlaps: the bug you find later | Your lab container is `172.17.0.3`, because Docker took `172.17.0.0/16`. What happens if your office network is `172.17.5.0/24`? | Spot overlaps among home, Docker, VPN and cloud ranges, and know that two cloud networks with overlapping ranges cannot be peered | Learn | 30 | Ranges on one number line, overlaps highlighted `[addr: overlap]` |
| 3.7 | Code: subnet calculator, part 1 | | Implement network, broadcast, size and contains, with the edge prefixes in the spec | Code | 40 | Graded tests |
| 3.8 | Code: subnet calculator, part 2 | | Implement split by host counts and overlaps (helper from 3.7 unlockable) | Code | 35 | Graded tests |
| 3.9 | Same cable, wrong mask | | Give two namespaces masks that disagree (`/24` and `/28`). From one side `ping` fails at once with "Network is unreachable" (a route is the rule that says where to send a packet, and it has none for that address); from the other the ping is silent loss. Then ping an address nobody owns and watch ARP requests go unanswered in `tcpdump` (as tested, dossier 5.7) | Build | 50 | Challenge 1 part 2, guided; slow path 75 |
| 3.10 | Lab: plan the school network | | Fit three computer labs, staff, guest Wi-Fi and printers into one `/22` with room to grow and no overlaps, and say in three sentences why each size | Lab | 40 | `[netlab: plan]`, checks pass or fail |
| 3.11 | Subnets and neighbours | | Do subnet arithmetic by hand, predict an ARP exchange, spot an overlap; two questions from module 2 | Check | 15 | |
| 3.12 | Defend your plan | | Defend your 3.10 plan against one change (a fourth lab arrives) | Gate | 15 | |

### Module 4: Leaving your network: gateways and routes
Opening question: *Run `tracert` (Windows) or `traceroute` (macOS, Linux) on your own computer to a big website. A dozen machines touch your packet. How does each one know where to send it next?*
Purpose: the default gateway, routing tables, TTL and traceroute, and how the internet is many networks joined together; build a router.
Hours: 5.6 core (335 min)

| # | Chapter | Problem first | Learner can then | Type | Min | Play / practice |
|---|---|---|---|---|---|---|
| 4.1 | A dozen hops to a website | | Run a trace on your own computer (not in the lab), read it line by line, and mark what you cannot explain yet; a sourced sample trace is provided if yours shows only `* * *` | Read | 15 | On your computer |
| 4.2 | The default gateway | Your packet for a website abroad is addressed to the website's IP but to your router's MAC. Why both? | Predict the next-hop MAC for a local and a remote destination, and see the MAC change at every hop while the IP stays | Learn | 35 | Inspector on each link of a two-router path `[netlab: hosts, switch, router, inspector]` |
| 4.3 | Routing tables and longest prefix match | One of the routers in your own trace from 4.1 has routes for `10.0.0.0/8`, `10.1.0.0/16` and a default. A packet for `10.1.2.3` arrives. Which route wins, and why not the first in the list? | Pick the route for any destination (longest prefix first, then the metric for a tie, connected routes included) and check it with `ip route get` | Learn | 40 | Edit a routing table, send packets to five destinations, see the chosen row `[netlab: router]` |
| 4.4 | TTL, ICMP and traceroute | Routers do not tell anyone they forwarded your packet. So how does traceroute learn their addresses? | Explain TTL, ICMP Time Exceeded, how `ping` and traceroute use ICMP, and why some hops show `* * *` (a router that does not answer, or a filter) | Learn | 35 | Send probes with TTL 1, 2, 3; one router is set to stay silent `[netlab: router, inspector]` |
| 4.5 | Networks of networks | | Explain, from one diagram, that the internet is many independently run networks, each a group of address blocks with one routing policy (an autonomous system, RFC 1930), that announce which addresses they can reach, and what happens to traffic when an announcement disappears | Read | 15 | Static diagram |
| 4.6 | Code: longest prefix match | | Implement a routing table lookup with a default route and a metric tie rule | Code | 40 | Graded tests |
| 4.7 | Build a router | | Two subnets and a router namespace: turn on forwarding, add routes, ping across (mid-point check: each side reaches its own router), capture the MAC change on both sides | Build | 75 | Challenge 2, gapped; slow path 110 |
| 4.8 | Lab: fix the broken office | | Find three faults (a wrong mask, a wrong gateway, a missing return route) by running commands in the lab and reading their output, then fix them | Lab | 40 | `[netlab: fault]`, checks pass or fail |
| 4.9 | Routing | | Choose routes and predict each hop's addresses for four situations; two questions from module 3 | Check | 15 | |
| 4.10 | Your traceroute, explained | | Explain the hops you can; for each you cannot, write the question and what you would check | Gate | 25 | |

### Module 5: Ports, TCP and UDP: which app gets the packet
Opening question: *Your laptop has one address, but forty browser tabs, a music app and a chat app are all talking at once. When a reply arrives, how does it find the right app?*
Purpose: ports and sockets (NAT depends on them), listening addresses, TCP's handshake and reliability, and why some apps choose UDP.
Hours: 4.1 core (245 min)

| # | Chapter | Problem first | Learner can then | Type | Min | Play / practice |
|---|---|---|---|---|---|---|
| 5.1 | One address, forty conversations | | List your open conversations (`netstat -an` on Windows and macOS, `ss -tn` on Linux) and read one line | Read | 10 | On your computer |
| 5.2 | Ports and sockets | Two tabs talk to the same website on port 443. Both replies come back to your one address. How does your laptop tell them apart? | Explain ports, well-known and ephemeral ranges (IANA's and Linux's differ), and the five numbers that name one conversation (protocol, two addresses, two ports) | Learn | 40 | Replies arrive at a laptop running three apps; match each to its socket `[netlab: host]` |
| 5.3 | Why your phone cannot open localhost | Your web app works at `http://localhost:3000` on your laptop, but your phone on the same Wi-Fi cannot open it. Why? | Work through the chain: on the phone, `localhost` is the phone itself, so use the laptop's address; the server must listen on `0.0.0.0`, not `127.0.0.1`; the laptop's firewall and the Wi-Fi's client isolation can still block it. Read listening sockets with `ss -tlnp` or `netstat`. The lab shows the first two; the last two only show on a real network | Learn | 30 | Move a server between listening addresses and try from two devices `[netlab: host]` |
| 5.4 | TCP: a conversation that survives loss | Wi-Fi loses packets all the time, yet a downloaded file is never missing a byte. Who fixes it? | Explain the handshake, sequence and acknowledgement numbers, and retransmission | Learn | 40 | Step through a handshake and a transfer with one lost segment; predict before each step `[sequence: client, server]` |
| 5.5 | UDP: why DNS, games and calls skip the handshake | In a video call, a packet that arrives half a second late is useless. Would you wait for it? | Choose TCP or UDP for an app by delay and what a lost packet costs; know DNS falls back to TCP for large answers | Learn | 30 | The same messages over TCP and UDP as loss goes up `[timeline: new model]` |
| 5.6 | Watch a conversation happen | | Run a server in one namespace, first on `127.0.0.1` then on `0.0.0.0`; connect from another; capture SYN, SYN-ACK, ACK; read both sides with `ss` | Build | 60 | Challenge 3, gapped; slow path 90 |
| 5.7 | Ports and transport | | Match replies to sockets; pick TCP or UDP for three apps; two questions from module 4 | Check | 15 | |
| 5.8 | One line of your capture | | Explain every number in one line of your capture and what it is for | Gate | 20 | |

### Module 6: NAT: how every device at home reaches the internet
Opening question: *All your devices are connected to your router, and none of them has a public address. So how do they talk to the internet?*
Purpose: answer the course question. The NAT table, why the internet cannot reach a home device, port forwarding, carrier-grade NAT, timeouts; build a home router.
Hours: 6.7 core (400 min)

| # | Chapter | Problem first | Learner can then | Type | Min | Play / practice |
|---|---|---|---|---|---|---|
| 6.1 | Fifteen devices, one public address | | See that a server receives the same source address from your phone and your laptop | Read | 10 | `[netlab: home router, host]` |
| 6.2 | The NAT table | Your phone and laptop both send from port 41000 to the same server. Replies come back to one address. Which device gets which? | Predict the source after a Linux router: the address is always rewritten, and the port changes only when two devices would clash (other routers may differ); read the real table and the new port with `conntrack -L` | Learn | 40 | Watch the table fill as devices open connections; inspect each packet before and after the router `[netlab: home router, NAT, inspector]` |
| 6.3 | Why the internet cannot reach your laptop | A friend wants to open the website on your laptop at home. They type your public address. What happens to their packet? | Explain the two real reasons (the internet has no route to private ranges; an unsolicited packet has no mapping to translate) and that NAT is not a firewall (home routers add one); set up port forwarding; recognise it in `docker run -p 8080:80` | Learn | 35 | Send an inbound packet with no mapping; give the outside a route to the home range and watch it get through (as in the lab test, dossier 5.6); then add a forwarding rule, then a filter `[netlab: home router, NAT, filter]` |
| 6.4 | Carrier-grade NAT | Your router's page says its outside address is `100.72.14.9`, but websites see `203.0.113.45`. Who is the second router? | Explain provider NAT and why it is common on mobile networks; treat `100.64.0.0/10` as one sign, not proof; with no router access or on a hotspot, use the private hops in your own trace instead | Learn | 30 | Two layers of NAT, packet inspected at each `[netlab: home router, provider NAT, inspector]` |
| 6.5 | NAT timeouts, keepalives and video calls | Your chat app sits untouched for an hour and messages stop arriving until you open it. What expired? | Explain why idle mappings expire (sourced examples: UDP at least two minutes in RFC 4787; 350 seconds on one cloud NAT gateway), what keepalives do, and that STUN helps calls through some NATs while others need a relay; see your own lab router's timers with `conntrack -L` | Learn | 35 | A mapping expires during a quiet period; add keepalives `[timeline: new model]` |
| 6.6 | Code: a NAT table | | Translate outbound packets (keep the port unless taken, else the lowest free port from a stated range: the exercise's model, not the number a real capture shows), translate replies, drop unknown inbound packets, expire mappings using a `now` parameter | Code | 45 | Graded tests |
| 6.7 | Build a home router, part 1: masquerade | | Put two devices behind a router namespace with an nft masquerade rule; capture inside and outside (mid-point check: one device reaches the server); read `conntrack -L`; make both devices use the same source port, predict whether the port changes, and read the new one from `conntrack` | Build | 75 | Challenge 4 part 1, gapped; slow path 110 |
| 6.8 | Build a home router, part 2: forwarding and a guest network | | Forward a port to a web server and test it from the outside namespace; note what an unforwarded port gives (connection refused, not a timeout); add a guest subnet and a forward rule that keeps it away from the home subnet | Build | 50 | Challenge 4 part 2, gapped; slow path 75 |
| 6.9 | Lab: reach the home server from outside | | Level 1: forward a port, after first finding one injected fault. Level 2: two web servers both want port 80. Level 3: the provider adds carrier-grade NAT; explain why forwarding stops working and what still can (connections must start from inside, so a relay, as in 6.5). Tunnels and IPv6 appear as "later" notes, not graded | Lab | 40 | `[netlab: home router, provider NAT, fault]`, three levels |
| 6.10 | NAT | | Predict addresses on both sides of one and two NATs, and whether the port changes; two questions from module 5 | Check | 15 | |
| 6.11 | Answer the course question | | Answer it with your own capture and `conntrack` output; branches if your own public address is IPv6 or shared | Gate | 25 | |

### Module 7: Joining a network and finding names: DHCP and DNS
Opening question: *Your phone says "Connected", the browser says "No internet". What exactly is broken, and how would you find out?*
Purpose: how a device gets its settings, how names become addresses, why DNS changes are slow and DNS outages are loud, and a layer-by-layer way to diagnose.
Hours: 4.5 core (270 min)

| # | Chapter | Problem first | Learner can then | Type | Min | Play / practice |
|---|---|---|---|---|---|---|
| 7.1 | Connected, no internet | | List the places it can break: no address, wrong gateway, no route out, DNS, or a login page the network is waiting for (a captive portal) | Read | 10 | |
| 7.2 | DHCP: how your phone got an address in a second | Your phone joined a café's Wi-Fi it had never seen and had a working address in under a second. Who told it what to use? | Explain discover, offer, request and acknowledge, what a lease contains (address, mask, gateway, DNS, lease time), and what failure looks like (Windows and macOS give themselves `169.254.x.x`; the Linux client in the lab is left with no address) | Learn | 35 | Step through the four messages `[sequence: phone, DHCP server]`, then shrink the pool until a new phone gets nothing `[netlab: DHCP]` |
| 7.3 | DNS: from a name to an address | No computer knows every name on the internet. So how does your laptop find the address of a site you have never visited? | Explain resolver, root, top-level and authoritative servers; read A, AAAA and CNAME records; follow a recorded `dig +trace` | Learn | 40 | Step through a resolution with an empty cache, then a warm one `[sequence: resolver, root, TLD, authoritative]` |
| 7.4 | Caches, TTLs and DNS outages | On 4 October 2021 Facebook, Instagram and WhatsApp disappeared from the internet while their servers kept running. How? | Predict how long an old answer survives (DNS TTL, not the IP TTL from 4.4), and explain two sourced outages: Facebook 2021 (its DNS servers withdrew their route announcements, see 4.5) and AWS October 2025 (an empty DNS record) | Learn | 35 | Change a record and watch resolvers with different TTLs pick it up `[timeline: new model, or reuse the system design TTL canvas if built]` |
| 7.5 | Lab: debug "no internet" layer by layer | | Diagnose six broken networks by choosing commands and reading their output, in order: link, address, gateway, a route to a public address, DNS, then a plain HTTP request. Behind a captive portal, `ping` to a public address fails while DNS often still answers; the HTTP request returning a login page is what tells it apart | Lab | 40 | `[netlab: fault, DHCP, DNS]`, graded |
| 7.6 | DHCP and DNS on your router | | Run dnsmasq on your router namespace from a config with lines to fill: devices get leases (client with a short timeout), names resolve through a per-namespace resolver file, `dig` answers | Build | 70 | Challenge 5, gapped; slow path 100 |
| 7.7 | DHCP and DNS | | Order the steps from joining Wi-Fi to the first byte; diagnose three outputs; two questions from module 6 | Check | 15 | |
| 7.8 | A "no internet" runbook | | A runbook for your family's Wi-Fi, one command per layer, with the commands for their own devices | Gate | 25 | |

### Module 8: Capstone: a whole internet on one laptop
Opening question: *You press Enter on a link. Before the page appears, your laptop has already used almost everything in this course. Can you name every step?*
Purpose: tie it together, build a complete network in checkpointed parts, break it and fix it, and explain it in a demo.
Hours: 5.3 core (320 min)

| # | Chapter | Problem first | Learner can then | Type | Min | Play / practice |
|---|---|---|---|---|---|---|
| 8.1 | What really happens when you open a link | You press Enter. What happens before the first byte of the page arrives? | Step through every packet from the lease to the first byte: DNS, ARP, gateway, NAT, routes, TCP. The lab page is plain HTTP; a real browser adds TLS and often QUIC, which the system design course covers | Learn | 30 | The full journey, packet by packet `[netlab: all parts]` |
| 8.2 | Capstone part 1: addresses and routes | | Starting from your own scripts from challenges 2, 4 and 5, build the home and guest subnets, the router, a provider router and a public web server; tests prove each path | Build | 60 | Challenge 6 part 1, open; slow path 90 |
| 8.3 | Capstone part 2: NAT, forwarding and isolation | | Add masquerade, one forwarded port and the guest rule; tests prove what must work and what must not | Build | 45 | Challenge 6 part 2; slow path 70 |
| 8.4 | Capstone part 3: DHCP and DNS | | Leases and names for both subnets; tests prove both | Build | 45 | Challenge 6 part 3; slow path 70 |
| 8.5 | Capstone part 4: break it, fix it | | Run the fault script (seeded, from a published fault matrix); find each fault with commands and write what you saw | Build | 60 | Challenge 6 part 4; slow path 90 |
| 8.6 | Final check | | Questions from every module, before the demo | Check | 20 | |
| 8.7 | Demo and defence | | Record a five-minute demo from the template and answer three mentor probes | Gate | 60 | |

### Module 9: IPv6: enough addresses for everyone
Opening question: *Open your phone's Wi-Fi details. Next to the familiar `192.168.x.x` there is probably a long address with colons, such as `2001:db8:4a1:20::5c`. Where did a second address come from, and why does your phone need it?*
Purpose: the long-term answer to running out, placed after the capstone so the IPv4 and NAT story stays whole: reading IPv6 addresses, and a network without NAT.
Hours: 1.9 core (115 min)

| # | Chapter | Problem first | Learner can then | Type | Min | Play / practice |
|---|---|---|---|---|---|---|
| 9.1 | The address you did not know you had | | Find your IPv6 addresses on your computer and phone | Read | 10 | On your computer |
| 9.2 | Reading IPv6 addresses | Your phone shows `fe80::1c2b:3aff:fe4d:5e6f`. How many bits is that, and where did the missing zeros go? | Read 128-bit addresses, tell an invalid form (two `::`) from a valid but non-standard one, write the standard short form (RFC 5952), and explain why a normal subnet is a `/64` (64-bit interface IDs) | Learn | 35 | Shorten and expand addresses `[addr: v6]` |
| 9.3 | A network without NAT | With IPv6 your phone and laptop each have their own global address. Then what stops anyone on the internet from reaching them? | Explain global addresses for every device, SLAAC, temporary addresses, a firewall instead of NAT, and dual stack | Learn | 35 | The same home network with IPv4 and NAT, then with IPv6: compare what the server sees `[netlab: IPv6 view]` |
| 9.4 | IPv6 | | Shorten addresses and predict what a server sees in four cases | Check | 15 | |
| 9.5 | Why IPv4 is still here | | One reason IPv6 helps and one reason IPv4 and NAT will last | Gate | 20 | |

---

## Totals

| Module | Chapters | Core min | Slow-path min | Core h | Slow h |
|---|---|---|---|---|---|
| 1 Your laptop is already on a network | 8 | 230 | 340 | 3.8 | 5.7 |
| 2 IP addresses, and why we ran out | 7 | 210 | 254 | 3.5 | 4.2 |
| 3 Your local network | 12 | 385 | 486 | 6.4 | 8.1 |
| 4 Leaving your network | 10 | 335 | 425 | 5.6 | 7.1 |
| 5 Ports, TCP and UDP | 8 | 245 | 313 | 4.1 | 5.2 |
| 6 NAT | 11 | 400 | 519 | 6.7 | 8.6 |
| 7 DHCP and DNS | 8 | 270 | 340 | 4.5 | 5.7 |
| 8 Capstone | 7 | 320 | 438 | 5.3 | 7.3 |
| 9 IPv6 | 5 | 115 | 135 | 1.9 | 2.3 |
| **Total** | **76** | **2,510** | **3,249** | **about 42** | **about 54** |

The slow path adds the Build chapters' slow-path minutes and a quarter more time on Read, Learn, Code and Lab chapters, for learners reading in a second language or on a phone. Share of core time: Read and Learn 43%, Build and Code 36%, Labs 6%, Checks and Gates 15% (counted from the tables by script). These are estimates; open decision 12 asks for a small pilot before the blueprint.

Learn chapters: 27, each with an interactive piece. Code exercises: 5. Build chapters: 13 (challenges 0 to 6). Graded labs: 4 (3.10, 4.8, 6.9, 7.5).

### Stretch path (about 8 hours, optional)

| # | Stretch | Builds on | Min |
|---|---|---|---|
| S1 | Read your capture in Wireshark, field by field | 5.6, 6.7 | 60 |
| S2 | A WireGuard tunnel between two namespaces, and the overlap problem from 3.6 for real (untested) | 3.6, 6.7 | 120 |
| S3 | MTU, fragmentation and the bug that breaks only big pages | 4.7 | 90 |
| S4 | A tiny traceroute in a shell script using `ping` with growing TTL | 4.4 | 60 |
| S5 | IPv6 in your lab network: addresses, routes, `ping -6` across the router (one link tested; forwarding untested) | 9.3 | 60 |
| S6 | Read your home router's own pages: its leases, NAT and port forwarding | 6.3, 7.2 | 60 |

## How the challenges are scaffolded

| Support | Challenges | What the learner gets |
|---|---|---|
| Guided | 0 setup, 1 two-computers | Every command, typed by the learner one at a time, with each line explained and the expected output shown |
| Gapped | 2 router, 3 conversation, 4 home-router, 5 dhcp-dns | A script or config with marked gaps (for example "add the route back to the home subnet here"); the tests say which gap is wrong |
| Open with hints | 6 capstone | The goal and the tests; the learner's own earlier scripts as the starting point; a hint ladder from a nudge to the command |

Every script tears down what it built before it starts, so it is safe to rerun after a mistake or a power cut. `toolkit/restore.sh N.P` rebuilds the reference network from the end of challenge N, part P, so a learner stuck on one part can still start the next (tested for every capstone part before publish). The template repository ships a `.gitattributes` and an `.editorconfig` that keep scripts in Unix line endings; the checker and every script stop with a plain message if a file has Windows line endings; scripts run with `bash script.sh`. The bind-mount flow on Windows is tested with challenge 0 before the blueprint.

| Challenge | Chapters | Parts |
|---|---|---|
| 0 setup | 1.2, 1.3 | checker, your own numbers |
| 1 two-computers | 1.4, 3.9 | a virtual cable and a ping; masks that disagree |
| 2 router | 4.7 | two subnets, forwarding and routes, the MAC change in a capture |
| 3 conversation | 5.6 | listening addresses, the handshake in a capture, `ss` on both sides |
| 4 home-router | 6.7, 6.8 | masquerade and `conntrack`; port forwarding and a guest network |
| 5 dhcp-dns | 7.6 | leases, local names, `dig` |
| 6 capstone | 8.2 to 8.5 | addresses and routes; NAT, forwarding and isolation; DHCP and DNS; break and fix |

Layout: `challenges/challenge-N-short-name/part-N-short-name/` with `README.md`, one script, `results.md` and a test per part; shared helpers in `toolkit/`. Template repository `devweekends/networking-challenges`; reference solutions in the private `AQIB-NAWAB/buildment-courses/networking/`, as for system design.

## Code exercise specs, in one line each

- 2.5: input is a dotted string; reject parts above 255, leading zeros and fewer than four parts; `classify` follows a stated prefix list from the IANA registry, with `100.64.0.0/10` as "shared".
- 3.7: unsigned 32-bit results (`>>> 0`); defined answers for `/0`, `/31` and `/32`.
- 3.8: split means variable sizes by host counts, largest first, each aligned; overlaps returns pairs.
- 4.6: routes as `{prefix, length, nextHop, metric}`; longest prefix wins, then lowest metric, then first listed.
- 6.6: the port is kept unless taken, else the lowest free port in a stated range; every call takes `now`; unknown inbound packets return `drop`.

## Interactive pieces

This stage lists what each lesson needs. No lab or canvas code is built yet.

### Existing renderers, used within their limits

- `[sequence]` (two to four actors, step controls, no inputs): 2.4 first look at NAT (laptop, router, server), 5.4 TCP (client, server, one lost segment scripted into the steps), 7.2 DHCP (phone, server), 7.3 DNS (resolver, root, top-level, authoritative; the laptop's question is the first step's caption).
- Predictions for `[sequence]` chapters sit in a Predict block before the canvas and in the canvas's "try this" prompts; the renderer itself takes no input.
- `[timeline]` (a trace from a per-canvas model): three **new small models** are needed: 5.5 TCP and UDP under loss, 6.5 a NAT mapping's idle timer, 7.4 DNS TTL spread (reuse the system design course's TTL canvas if it is built first). The renderer's time unit is fixed to milliseconds today, so 6.5 and 7.4 also need a **renderer change** to show seconds, minutes and hours.

### New canvas: the address renderer `[addr]`

One renderer with modes, all driven by one small address library, the same functions the code exercises ask learners to write, so the reference solution and the canvas cannot disagree.

| Mode | What the learner manipulates | Chapters |
|---|---|---|
| `bits` | Flip any of 32 bits; dotted form and number update | 2.2 |
| `allocate` | Give blocks to organisations by class, then by CIDR; waste and routing entries counted | 2.3 |
| `prefix` | Drag the prefix length; block, mask and count update | 2.3 |
| `classify` | Sort addresses into public, private, shared and special | 2.4 |
| `mask-and` | Address and mask bit by bit; AND for the network, host bits set for the broadcast | 3.2 |
| `split` | Cut a block into aligned subnets by host count | 3.5 |
| `overlap` | Ranges on one number line; overlaps highlighted | 3.6 |
| `v6` | Shorten and expand IPv6 addresses; invalid forms refused with the rule | 9.2 |
| `drill` | Generated questions answered by hand with instant feedback, no calculator; reused in the checks for spaced practice | 2.2, 2.3, 3.2, 3.5, checks |

### New canvas: `[packet]`

`inspect`: two real captured packets, the ICMP echo from challenge 1 and a DNS query, with every header field tappable (what it is, who set it, which module explains it); 1.5, where learners match their own `tcpdump -n -v` lines (which show TTL) to it. `wrap`: headers added and removed layer by layer, including the broadcast MAC; 1.6. Fallback: annotated static captures with a quiz per field.

### New lab family: the network lab `[netlab]`

The existing lab platform (`frontend/src/lab`, branch `content/system-design`) models requests and load through tiers: its spec type allows only `hld` and `db` labs, its validator expects load levels or a schema, and its board draws request flow. The network lab is **a real platform change**, not a data file: a new spec type (`family: "net"`) and validator, a topology board, a deterministic engine that walks one packet at a time (local or remote by prefix, ARP, longest prefix match with metrics, TTL and ICMP, filter rules, NAT rewrite and mapping timers), a generator that produces command output (`ping`, `ip route`, `ip neigh` or `arp -a`, `traceroute`, `dig` or `nslookup`) from the model's state, and reachability checks instead of load levels.

| Part | What it models | Chapters |
|---|---|---|
| Host | Interfaces (address, prefix, MAC), ARP table, gateway, resolver, sockets with listening address | 3.3 onward |
| Switch | One segment; broadcasts; MAC learning table | 3.3, 3.4, 4.2 |
| Router | Interfaces, routing table with connected routes and metrics, forwarding on or off, TTL decrease, ICMP Time Exceeded, an option to stay silent | 3.4, 4.2 to 4.4, 4.8 |
| Filter | Forward rules (drop or accept by interface or range) | 3.4, 6.3, 6.8 |
| Inspector | Headers on any link, step by step | 4.2, 4.4, 6.2, 6.4, 8.1 |
| NAT | Linux masquerade behaviour (address always, port only on a clash; the lab's limits line says other routers differ), forwarding rules, mapping timers, the table | 6.1 to 6.4, 6.9 |
| Home router | A preset: router, NAT, DHCP server, DNS forwarder | 6.1 to 6.4, 6.9, 7.5, 8.1, 9.3 |
| Provider NAT | A second NAT with `100.64.0.0/10` inside | 6.4, 6.9 |
| DHCP server | Pool, leases, options; the client's failure behaviour per operating system | 7.2, 7.5 |
| DNS | A resolver with a TTL cache; root, top-level and authoritative servers | 7.5, 8.1 |
| Captive portal | A gateway that blocks forwarded traffic from a new device and answers its web requests with a login page; DNS still answers | 7.5 |
| IPv6 view | Static global addresses, no NAT, a filter. Neighbour discovery is not modelled; the lab says so | 9.3 |

Modes: **explore**, **step** (one packet, one hop at a time), **plan** (assign blocks; fit and overlap checks; 3.10), **fault** (a broken network, commands, generated output; 4.8, 6.9, 7.5).

Delivery in three slices, each unlocking whole modules:

| Slice | Parts | Unlocks |
|---|---|---|
| 1 | Host, switch, router, filter, inspector, checks, plan and fault modes, the command-output generator | Netlab chapters in modules 3, 4 and 5; labs 3.10 and 4.8 |
| 2 | NAT, home router, provider NAT | Module 6; lab 6.9 |
| 3 | DHCP, DNS, captive portal, IPv6 view, the full journey | Module 7, 8.1, 9.3; lab 7.5 |

If a slice is late: Learn chapters that use it switch to a scripted `[sequence]` step-through of the same packets with a prediction before each step (degraded, still predict and step; recorded as an exception). Graded labs are blocked; the fallback is a diagnosis from recorded command output, graded as a quiz.

### New canvas: `[replay]` (for phone readers)

A challenge's recorded commands and output, played back one command at a time. Before each output appears, the learner predicts it (pick one of three outputs, or type the number they expect), then sees the real recorded result. One replay per Build chapter, made from the reference solution's recorded run, so it always matches what a laptop learner sees. Fallback: the same recording as a `[sequence]` of two actors (learner, lab) with a Predict block before each step.

### Terminal work

1. **Challenges** in the learner's repository (the Build chapters), run **in the lab**.
2. **Commands on your own computer** in Read and Learn chapters, read-only, with the expected output shown for phone readers:

| Task | Windows | macOS | Linux | Phone |
|---|---|---|---|---|
| Address and mask | `ipconfig` | `ifconfig` (mask in hex) | `ip addr` | Wi-Fi details screen |
| Gateway | `ipconfig` | `netstat -rn` | `ip route` | Wi-Fi details screen |
| DNS server and lease | `ipconfig /all` | `scutil --dns` | `resolvectl status` (`/etc/resolv.conf` often shows only a local stub, `127.0.0.53`) | Wi-Fi details screen |
| Public IPv4 address | `curl.exe -4 ifconfig.me` (in PowerShell, plain `curl` is a different command) | `curl -4 ifconfig.me` | `curl -4 ifconfig.me` | any "what is my IP" page |
| Neighbours | `arp -a` | `arp -a` | `ip neigh` | recorded example |
| Path to a host | `tracert -d` | `traceroute -n` | `traceroute -n` | recorded example |
| Open conversations | `netstat -an` | `netstat -an` | `ss -tn` | recorded example |
| DNS lookup | `nslookup` | `nslookup` or `dig` | `dig` | recorded example |

The macOS column is to be checked on a Mac before publish (dossier: unverified).

## Build environment

- **Default:** one pinned image based on `ubuntu:24.04` with the course tools (`iproute2`, `nftables`, `tcpdump`, `dnsmasq-base`, `bind9-dnsutils`, `traceroute`, `iputils-ping`, `netcat-openbsd`, `curl`, `conntrack`, `busybox` for a DHCP client and a tiny web server, and `nano`), started with `docker run --privileged`. Same commands and versions on Windows, macOS and Linux.
- **Also supported:** a Linux laptop, or Ubuntu 24.04 in WSL 2 without Docker Desktop (the WSL kernel configuration includes the needed features, dossier 5.1; still to be run), with the same scripts under `sudo`.
- **Tested on 2026-10-24** (dossier 5.5 and 5.6) on Docker Desktop for Windows: namespaces, virtual cables, a bridge, forwarding, masquerade (address rewritten, port kept, port rewritten on a clash), `conntrack`, port forwarding from an outside namespace, a guest isolation rule, DHCP leases and DNS answers from dnsmasq, a per-namespace resolver file, a DHCP client failing fast with no server, IPv6 over one link, and the full capstone path through a provider router with port forwarding across it. Not yet tested: Docker Desktop on macOS, WSL 2 without Docker Desktop, IPv6 forwarding and router advertisements.
- **Two places to type commands.** The lab container cannot see the learner's real internet path: inside it, `traceroute` showed `172.17.0.1` and then the destination, and `dig +trace` got no answer (dossier 5.5 and 5.6). So real-path commands run on the learner's own computer, and the lab is for the networks they build. The first lab prompt shows which side the learner is on.
- **Safety note in 1.2:** `--privileged` gives the container power over Docker's own virtual machine. The course uses it only for this lab image.

## Gate evidence at a glance

| Module | Gate evidence (written, voice note or labelled diagram) |
|---|---|
| 1 | Map of the learner's home network with real numbers and three open questions, plus challenge 0 |
| 2 | Why a phone's address starts with 192.168 or 10, and the question NAT must answer |
| 3 | The school plan from lab 3.10, defended against a fourth lab |
| 4 | Own trace explained, with questions for the hops not yet explainable, plus challenge 2 |
| 5 | One line of the learner's capture explained, plus challenge 3 |
| 6 | The course question answered with the learner's own capture and `conntrack`, plus challenge 4 |
| 7 | "No internet" runbook for the family's Wi-Fi, plus challenge 5 |
| 8 | Capstone repository, fault write-up and recorded demo |
| 9 | One reason IPv6 helps, one reason IPv4 and NAT will last |

## Capstone

- What the learner ships: challenge 6, built in four checkpointed parts (8.2 to 8.5), each with its own tests. The network: a home subnet and a guest subnet behind a router that does NAT, one forwarded port, DHCP and DNS; a provider router; a "public" web server on a documentation address that reports the address and port it sees. Tests prove that home and guest devices get leases, resolve names and reach the server; that the server sees only the router's outside address; that the forwarded port reaches the home web server from outside; and that the guest subnet cannot reach the home subnet. Captures from both sides of the router are committed.
- Break and fix: the fault script takes a seed (recorded in the write-up, so a mentor can reproduce it) and injects three faults from a published matrix. Each row gives the injection, the symptom, the command that finds it, and the faults it may not be combined with. Examples: a wrong mask on a static device, forwarding off, the router's default route missing (the home device then gets "Destination Net Unreachable" from its router, dossier 5.7), the DNS port blocked (so DHCP still works), the masquerade rule missing, a pool too small for a new device. The write-up names each fault, the command that found it and the fix.
- Five-minute demo, from a template: the address plan; a device getting its lease; a `curl` with captures on both sides of the router and the `conntrack` line; one fault and how it was found.
- Defence probes (the mentor picks three): Why does the server see only one address? When does the port change? What breaks if the guest subnet is a `/30`? Why can the server reach your forwarded port but not your laptop's other ports? Which test would catch a missing default route on your router?
- Production requirements: the build script runs from a clean lab and tears down cleanly; tests pass; every command in the write-up is one the learner ran.
- Mentor review: rubric in 8.7 (address plan, working network, captures as evidence, diagnosis, explanation), under 30 minutes.

## Variants

None. This is a short foundations course. Follow-on depth: cloud networking (VPCs, subnets, route tables, NAT gateways, security groups) in the AWS course, reusing the network lab; container networking in the Linux course, reusing challenges 2 and 4.

## Out of scope

- Physical and radio layers (cabling, Wi-Fi channels and security): learners cannot see or change them, and they do not change how software engineers debug.
- The OSI model as a list to memorise: 1.6 teaches why layers exist with the headers learners see in a packet.
- Certification drills (CCNA, Network+), vendor router configuration, VLAN trunking, spanning tree, OSPF and BGP configuration.
- TLS, QUIC, HTTP versions, handshake cost and real-time connections: the system design course, module 3, which builds on this one.
- Firewalls, apart from the forwarding and isolation rules the challenges need. Stop point: "NAT is not a firewall" (6.3). Security groups and network ACLs come in the AWS course.
- How namespaces work inside the kernel: the Linux course.
- Writing a TCP stack or raw-socket tools.

## Open decisions for instructors

| # | Decision | Recommendation | Instructor decision |
|---|---|---|---|
| 1 | Build environment | The pinned image with `--privileged` as the single default (tested on Windows); Linux and WSL 2 with `sudo` also supported; run the test script on a Mac and on WSL 2 without Docker Desktop before the blueprint is locked | Accepted (sponsor, 2026-10-24) |
| 2 | The network lab is a platform change (spec type, validator, board, engine, command-output generator) | Approve it as a new lab family, built in the three slices above; slice 1 must ship before module 3's chapters are written | Accepted (sponsor, 2026-10-24) |
| 3 | Two new canvases, `[addr]` and `[packet]`, and three small `[timeline]` models | Approve them; `[addr]` first, since modules 2 and 3 depend on it. Fallback: the drills become ordinary quiz questions | Accepted (sponsor, 2026-10-24) |
| 4 | Phone-only learners and a terminal replay | Add a small `[replay]` renderer: each challenge's recorded commands and output, pausing for the learner to predict the next output, so phone readers still predict and see real results | Accepted (sponsor, 2026-10-24) |
| 5 | Overlap with the system design course, module 3 | Make this course the prerequisite; system design module 3 keeps handshake cost, TLS, DNS for routing traffic, HTTP versions and real-time, and links here for the basics | Accepted (sponsor, 2026-10-24) |
| 6 | Overlap with the Linux course on namespaces | This course uses network namespaces as a tool with short recipes; the Linux course explains namespaces and cgroups and reuses challenges 2 and 4 for container networking | Accepted (sponsor, 2026-10-24) |
| 7 | Course order among the infra courses | Networking first, then Linux, then Kubernetes, then AWS, as the sponsor ranked them | Accepted (sponsor, 2026-10-24) |
| 8 | Completion for learners without a laptop | Two levels. "Foundations": every Learn chapter, lab, drill, quiz and replay, and each Code exercise either solved or, on a phone, replaced by reading the reference solution and answering three questions about it. Foundations gives graded evidence for O2, O3, O4, O5 and O6 (from labs, quizzes and code); O1 only from phone settings; not O7. The full course also needs challenges 0 to 6. Learners can upgrade when they reach a laptop | Accepted (sponsor, 2026-10-24) |
| 9 | Gate format and mentor time | Accept written, voice or labelled-diagram answers; learners carry on while a gate waits; state a review time per gate (suggested: within three days) | Accepted (sponsor, 2026-10-24) |
| 10 | IPv6 placement and depth | After the capstone, about two hours, no build in the core path; the build is stretch S5 | Accepted (sponsor, 2026-10-24) |
| 11 | Fictional public addresses | Only the documentation ranges in labs, prose and quizzes, with a visible note in 1.1 and 2.4 that they stand in for real public addresses | Accepted (sponsor, 2026-10-24) |
| 12 | Time estimates | Pilot one chapter of each type with five learners before the blueprint and reset the core and slow-path hours from the median | Accepted (sponsor, 2026-10-24) |

## Confirmation

G2B status: **complete** (sponsor approval; the second signature was waived by the sponsor, `roadmap-confirmation.md`).

| Instructor | Role | Decision (approve/revise/reject) | Comments | Date |
|---|---|---|---|---|
| Zeeshan | Architect (human sponsor) | Approve | Accepts the recommendations on all 12 open decisions | 2026-10-24 |
| | Second instructor | Waived by the sponsor | | 2026-10-24 |
