---
artifact: course-brief
course: networking
working_title: "Networking, Hands On: Where Your Packets Really Go"
version: 1
status: draft
owner: Zeeshan (architect, human sponsor)
target_publish: after G2B instructor sign-off and G7 delivery lead approval
---

# Course brief: networking

Source of intake: the sponsor's request of 2026-10-24 for a set of infrastructure courses after system design, with Networking first ("the most important"), then Linux (with Docker), then Kubernetes, and AWS later. The sponsor asked for "the most important things, not a typical course", taught why before what, opened with questions from the learner's own world, realistic rather than analogy-heavy, and built and seen with the learner's own hands.

## One sentence

Learners find out how their own laptop, phone and home router really reach the internet, by reading the real numbers on their own machine, playing with interactive network labs, writing the core address and routing logic in small code exercises, and finally building a working home network inside one Linux machine (devices, subnets, a router, NAT, DHCP and DNS) that they then break on purpose and fix.

## Learner

- Who: fellowship fellows and early-career engineers who use the internet every day and can build a small web app, but cannot say why their laptop shows `192.168.1.23` while a website sees a different address, or what to check when "Wi-Fi connected, no internet" appears.
- Prior knowledge: basic command line (open a terminal, run a command, read its output), basic JavaScript (functions, arrays, numbers) for the code exercises, Git and GitHub for the challenges repository. No networking knowledge assumed. Binary numbers are taught in the course, not assumed.
- Language: English as a second language for many. Plain English, short sentences, every term defined in prose on first use, real command output instead of idioms.
- Device and connection: many read on phones on weak or metered data, with power cuts. Every Learn chapter, every interactive lab and every quiz must work on a 375px screen. Build chapters need a laptop with a Linux environment (see Constraints); state every download size.
- Time available: about 12 hours a week. The core path is about 40 hours, so roughly three and a half weeks.
- Motivation: backend, DevOps and cloud jobs; making sense of the system design, Linux, Kubernetes and AWS courses that follow; fixing their own and their family's networks.
- What they will do with the result: a public `networking-challenges` repository with working scripts, captured packets and short write-ups, and a recorded five-minute demo of the network they built.

## Outcome

By the end, the learner can:

1. Read their own machine's network settings (address, prefix, gateway, DNS server, public address) and explain where each number came from.
2. Tell a public address from a private or special one, and explain why private ranges and NAT exist at all (the IPv4 address shortage).
3. Do CIDR arithmetic by hand and in code: find a block's network address, broadcast address, size and host range, decide whether two addresses share a subnet, split a block into subnets and spot overlapping ranges.
4. Trace a packet from their laptop to a server: same-subnet or gateway decision, ARP, routing table lookup by longest prefix match, TTL, ports, and the TCP handshake, and confirm each step with real commands (`ip route get`, `ip neigh`, `traceroute`, `ss`, `tcpdump`).
5. Explain and demonstrate NAT: show a packet's source address and port being rewritten by a router they built, explain why inbound connections fail without port forwarding, and recognise carrier-grade NAT.
6. Explain how a device joins a network and finds names (DHCP, DNS with caching and TTLs), and diagnose "no internet" layer by layer.
7. Build a small network from Linux network namespaces (two subnets, a router, NAT to the outside, DHCP and DNS) and prove it works and fails with `ping`, `curl`, `dig` and `tcpdump`.

## Demo

A five-minute walkthrough of the capstone network: the address plan with its CIDR blocks, a device getting its address from DHCP, a `curl` from a home device to the "internet" server with `tcpdump` on both sides of the router showing the rewritten source address and port, one fault the learner injected and the commands that found it, and one answer to a mentor follow-up question (for example, "what changes if both your subnets were 192.168.1.0/24?").

## Product scope

- Must have: every Learn chapter teaches through at least one interactive element (a canvas or a network lab) with a prediction before and a check after; a graded quiz per module; graded JavaScript code exercises for the core logic (address to number, CIDR maths, longest prefix match, a NAT table); a challenge per core module in the learner's `networking-challenges` repository, run on their own Linux environment; a capstone with a recorded demo and a mentor rubric.
- Should have: an interactive network lab family on the shared lab platform (hosts with addresses, a switch, routers with routing tables, a home router with NAT and DHCP, a packet inspector), so phone-only learners can still see every packet move; a "phone-only path" note on every Build chapter with the recorded output to study when no laptop is available.
- Out of scope: Wi-Fi radio details, cabling and physical layer, vendor router configuration (Cisco IOS and similar), certification prep (CCNA, Network+), TLS and HTTP versions (the system design course covers these), firewalls beyond the NAT and port forwarding rules the course needs, writing a TCP stack.

## Production bar

This is a concepts-plus-practice course, not a product build. The production bar applies to the learner's challenges repository: every challenge has a script that rebuilds its network from nothing and tears it down, a test that proves it works (for example, a `ping` and a `curl` that must succeed and one that must fail), captured `tcpdump` output for the packets the challenge is about, and a README in the house shape (101 glossary, what you built, step table with links to the script lines, where each number comes from, results).

## Variants

None for the general course. This is a short foundations course that other courses build on. Suggested follow-on material (roadmap only): a deeper "networks in the cloud" module inside the AWS course (VPCs, subnets, route tables, NAT gateways, security groups) that reuses this course's labs, and the container networking chapters of the Linux course.

## Constraints

- Code: the buildment code runner executes JavaScript only. Code exercises are JavaScript with server-side tests.
- Build environment: network namespaces need a Linux kernel. Supported paths, to be confirmed by research: a Linux laptop, WSL2 on Windows, or a pinned Docker image run with the privileges needed for `ip netns` (Docker Desktop on Windows and macOS). One shared setup chapter; every challenge script runs unchanged on all supported paths. No cloud account and no money needed.
- Interactive labs: only registered canvas slugs and registered labs render. The existing lab platform (`frontend/src/lab`, on branch `content/system-design`) models request flow and load, not addressing, so networking needs a new lab family. This stage lists the parts; it builds none of them.
- Accuracy: every address range, RFC, date and number in learner-facing text is sourced and dated in the research dossier. Commands are run on the supported environments before publish.
- Real examples: real outages and real products may be named with sources (for example a well-known BGP or DNS outage). Learner scenarios (the school network, the shop with two subnets) are fictional composites.
- Overlap: the system design course has a networking module for system designers (handshake cost, DNS for routing, HTTP versions, real-time connections). This course is its foundation and does not repeat those topics; the Linux course owns namespaces and cgroups as container building blocks, and this course uses network namespaces only as a tool for building networks.

## Non-goals

- The OSI model as a list to memorise. The course explains why networks are layered, using the layers learners actually see in a packet.
- Subnetting speed drills for certification exams.
- Building physical networks, VLAN trunking, spanning tree, OSPF configuration, wireless security.
- Becoming a network engineer. The goal is a software engineer who understands and can debug the network their code runs on.

## Success signals

- Learners predict what a packet will look like after a router (its addresses, ports and TTL) before the lab shows it, and are right more often in module 6 than in module 4.
- Every learner who finishes has a repository whose challenge scripts build their network and pass their tests on a clean machine.
- Mentors can review a capstone in under 30 minutes with the rubric.
- In the demo, the learner explains why their home devices reach the internet without public addresses, using their own `tcpdump` capture, without notes.
