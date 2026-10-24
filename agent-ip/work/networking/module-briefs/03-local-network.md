---
artifact: module-brief
course: networking
module: 03-local-network
version: 1
owner: curriculum-architect
roadmap_version: 3
roadmap_confirmed: true
---

# Module 3: Your local network: subnets and neighbours

Opening question (roadmap): *On campus Wi-Fi your laptop gets `10.20.143.7` with mask `255.255.240.0`. At home it gets `192.168.1.23` with `255.255.255.0`. What is that second number, and why is it different?*

## Outcome

The learner can find a network's network address, broadcast address, size and host range from an address and mask by hand, decide whether two addresses share a subnet, split a block by host counts without misaligned pieces, and spot overlapping ranges (O3). They can explain how neighbours find each other with ARP, why networks are split, and what two computers with disagreeing masks do. They have written two small calculators, planned a school network in one `/22`, and committed challenge 1 part 2.

## Why this module exists

Module 2 made the address a number. A computer's first decision for every packet is "is the destination on my network or not?", and the mask decides it. Every later module (gateways, routes, NAT, DHCP) starts from that decision, and planning address space without overlaps is the first design skill the learner needs. This is the largest module (385 minutes core, 486 slow path): arithmetic, ARP, splitting, overlaps, two code exercises, a build and a lab.

## Prerequisites

Module 1 (`mac-address`, `namespaces-veth`, `read-capture`) and module 2 (`cidr`, `ip-as-number`, `address-kinds`, `js-bitops`). Chapter `requires` come from `timeline.yaml`; all are introduced in earlier chapters, so no new entry prerequisite is added. Binary by hand (2.2) is used from 3.2. Build 3.9 needs the lab from 1.2. The netlab chapters (3.3, 3.4, 3.10) need netlab slice 1, which decision 2 requires to ship before this module is written. A learner without a laptop can do every chapter except 3.9 (decision 8).

## Chapters

| # | Chapter | Type | Min | Outcome | Requires | Introduces | Evidence |
|---|---|---|---|---|---|---|---|
| 3.1 | Two masks, two networks | Read | 10 | Find your own mask (macOS prints hex) and say what you think it decides | cidr, own-addresses | netmask | own mask recorded |
| 3.2 | Network part and host part | Learn | 40 | Find network, broadcast, host range and the same-subnet answer by hand, including `/31` and `/32` | netmask, ip-as-number | subnet-calc (reinforces cidr) | unassisted drills |
| 3.3 | Neighbours: MAC addresses and ARP | Learn | 35 | Explain an ARP request and reply, read `arp -a` or `ip neigh`, say how a switch learns where each MAC lives | subnet-calc, mac-address | arp, switch-learning (reinforces read-capture) | ARP prediction check |
| 3.4 | Why split a network | Learn | 35 | Give the reasons to split: one block can serve several networks; faults and access stay contained; fewer devices hear each broadcast | arp, subnet-calc | why-split | netlab check |
| 3.5 | Cutting a block into subnets | Learn | 40 | Split a block by host counts and explain why each piece starts on its own boundary | subnet-calc | vlsm-split (reinforces cidr) | unassisted drills |
| 3.6 | Overlaps: the bug you find later | Learn | 30 | Spot overlaps among home, Docker, VPN and cloud ranges; know overlapping cloud networks cannot be peered | vlsm-split, address-kinds | overlap | overlap check |
| 3.7 | Code: subnet calculator, part 1 | Code | 40 | Implement network, broadcast, size and contains, with the edge prefixes in the spec | subnet-calc, js-bitops | none (reinforces subnet-calc) | graded code tests |
| 3.8 | Code: subnet calculator, part 2 | Code | 35 | Implement split by host counts and overlaps (helper from 3.7 unlockable) | vlsm-split, overlap, js-bitops | none (reinforces vlsm-split) | graded code tests |
| 3.9 | Same cable, wrong mask | Build | 50 | Give two namespaces masks that disagree; read both ping failures; ping an address nobody owns and watch unanswered ARP | namespaces-veth, arp, subnet-calc | route-idea, ping-errors (reinforces read-capture) | challenge 1 part 2 test and capture |
| 3.10 | Lab: plan the school network | Lab | 40 | Fit three computer labs, staff, guest Wi-Fi and printers into one `/22` with room to grow and no overlaps; say in three sentences why each size | vlsm-split, overlap, why-split | address-plan | graded lab checks |
| 3.11 | Subnets and neighbours | Check | 15 | Do subnet arithmetic by hand, predict an ARP exchange, spot an overlap; two questions from module 2 | subnet-calc, arp | none (reinforces cidr, address-kinds) | quiz |
| 3.12 | Defend your plan | Gate | 15 | Defend your 3.10 plan against one change (a fourth lab arrives) | address-plan | none (reinforces vlsm-split) | defended plan |

Core 385 minutes. Slow path 486 minutes (3.9 slow path 75).

### 3.1 Two masks, two networks (Read, 10 min)
- Hook: your mask changes when you change Wi-Fi. Claim: the mask belongs to the network, not the laptop, and the learner should guess what it decides before 3.2 tells them. No arithmetic yet.
- Worked example: `255.255.240.0` (campus) and `255.255.255.0` (home). macOS `ifconfig` prints `netmask 0xfffff000` and `0xffffff00`: `ff` is 255 and `f0` is 240 (check on a Mac before publish). The prefix is the count of 1 bits: 20 and 24. Windows `ipconfig`, Linux `ip addr`.
- Diagram: MermaidDiagram flowchart: one laptop joins two networks and gets a different address and mask from each. Claim: the mask is part of what the network hands you.
- Interactive: the learner's own computer. PREDICT first: "What does the mask decide?" (which addresses your laptop treats as neighbours, not speed or which sites open). LearningObjectives for the module sit here. Callout on macOS hex.
- Assessment: one PREDICT, one QUIZ (turn `0xffffffc0` into dotted form: `255.255.255.192`). Near miss: reading the mask as a second address.

### 3.2 Network part and host part (Learn, 40 min)
- Hook: your laptop sends to `192.168.1.40` directly but to `192.168.2.40` through the router. How does it decide? Claim: a host ANDs its mask with the destination and compares with its own network [S7]; the network address is address AND mask; the broadcast address is the network with all host bits set to 1 (derived arithmetic, no source needed).
- Worked example: `192.168.1.23/24`: network `192.168.1.0`, broadcast `192.168.1.255`, 256 addresses, hosts `192.168.1.1` to `192.168.1.254`; `192.168.1.40` is local, `192.168.2.40` is not. Campus `10.20.143.7/20`: 143 is `10001111`, mask part `11110000`, AND gives 128, so network `10.20.128.0`; host bits set gives `10.20.143.255`; 4,096 addresses; hosts `10.20.128.1` to `10.20.143.254` (checked by script). Edges: `/32` is one address (network and broadcast are the address); `/31` has two (this course's convention, RFC 3021 is not in the dossier: see Roadmap issues 1); `/0` is everything. Teach contiguous masks only [S7].
- Diagram: MermaidDiagram flowchart: destination AND mask equals my network? yes, send straight to the neighbour; no, send to the gateway. Claim: one AND decides local or not.
- Interactive: `net-addr-mask-and` (`[addr: mask-and, drill]`). PREDICT first: "Your address is `192.168.1.23/23`. Is `192.168.0.40` local?" (yes, because `/23` covers `192.168.0.0` to `192.168.1.255`). Then line up bits, see AND and OR, then unassisted drills.
- Assessment: one PREDICT, one QUIZ (broadcast of `10.20.143.7/20`). Near miss: the "first three numbers" shortcut from 1.4 breaks for `/20` and `/23`; forgetting that usable hosts are 2 fewer than size.

### 3.3 Neighbours: MAC addresses and ARP (Learn, 35 min)
- Hook: you send a file to your friend's laptop at `192.168.1.40` on the same Wi-Fi. Wi-Fi delivers by hardware address, not IP. How does your laptop find your friend's? Claim: before sending, the laptop broadcasts "who has this IPv4 address?", the owner answers it directly, and the answer is cached [S22]; the broadcast is the only packet every device hears. Table ageing is left to the implementer [S22]: give no timeout figure.
- Worked example: ARP table empty; `192.168.1.23` (fictional MAC `02:00:00:00:00:23`) sends to `192.168.1.40` (`02:00:00:00:00:40`): request "who has `192.168.1.40`, tell `192.168.1.23`" to everyone, reply "`192.168.1.40` is at `02:00:00:00:00:40`", then data. Show the same lines in the learner's own 1.4 capture. The switch learns: a frame arrives on port 2 from MAC X, so it records X on port 2; until it knows a MAC it sends to every port. No dossier source covers switch learning: teach it as how the lab's switch works (Roadmap issues 2). `arp -a` on Windows and macOS, `ip neigh` on Linux; the lab generates the output.
- Diagram: MermaidDiagram sequence diagram: laptop to all (request), friend to laptop (reply), laptop to friend (data). Claim: only the request is a broadcast.
- Interactive: `net-lab-arp-switch` (`[netlab: hosts, switch]`). PREDICT first: "Your ARP table is empty and you send one packet to `192.168.1.40`. Who receives the first frame?" (everyone on the segment). Then step the request, reply and the switch table.
- Assessment: one PREDICT, one QUIZ (after the reply, does the switch send the next frame to every port or one?). Near miss: ARP works only on one network (a remote destination is module 4); an ARP request for an address nobody owns gets no answer (1.4's `192.168.1.99`).

### 3.4 Why split a network (Learn, 35 min)
- Hook: a school puts 600 devices in one network: staff laptops, the exam server and guest phones. One infected phone can now reach the exam server. What would you change? Claim: three reasons, in the roadmap's order: one block can serve several networks [S7]; faults and access stay contained; fewer devices hear each broadcast. The last two are reasoning, not sourced facts. The router is shown as a box that joins networks; module 4 opens it.
- Worked example: 100 staff laptops, 1 exam server, 499 guest phones. Flat: a staff laptop's broadcast is heard by 599 others. Split into three networks: heard by 99. One labelled filter rule: guest to exam server is dropped. Sizes come in 3.5 (a flat 600 needs a `/22`).
- Diagram: MermaidDiagram flowchart: one switch with 600 devices versus a router joining three switches, with the rule on the router. Claim: the router is the only door, so the rule at the door is the policy. ComparePanel (flat versus split) is the second component.
- Interactive: `net-lab-flat-vs-split` (`[netlab: hosts, switch, router, filter]`). PREDICT first: "A staff laptop sends one broadcast. How many other devices hear it, flat and split?" (599 and 99).
- Assessment: one PREDICT, one QUIZ (what stops the guest phone: the split alone or the split plus the rule?). Near miss: splitting alone does not block access; without the rule the groups still reach each other.

### 3.5 Cutting a block into subnets (Learn, 40 min)
- Hook: you have `192.168.10.0/24` and need networks for 100, 50 and 20 devices. Where does each start? Claim: every block is a power of two that must start where its host bits are all zero (the 3.2 AND), so pieces start on their own boundary; cut largest first.
- Worked example: 100 devices need `/25` (126 usable): `192.168.10.0/25`, `.0` to `.127`. 50 need `/26` (62): `192.168.10.128/26`. 20 need `/27` (30): `192.168.10.192/27`. Free: `192.168.10.224/27`. A `/26` may start only at `.0`, `.64`, `.128` or `.192`; one at `.100` is refused with the reason. 126 devices fit a `/25`, 127 need a `/24`.
- Diagram: MermaidDiagram flowchart: the `/24` halves into two `/25`, one `/25` into two `/26`, one `/26` into two `/27`. Claim: each cut halves a block, so a piece can only start on a multiple of its size.
- Interactive: `net-addr-split` (`[addr: split, drill]`). PREDICT first: "The 100-device network takes the first `/25`. Where does the 50-device network start?" (`.128`). Misaligned cuts are refused; then drills.
- Assessment: one PREDICT, one QUIZ (smallest prefix for 31 hosts: `/26`). Near miss: counting devices without the two reserved addresses; placing the smallest block first and wasting space.

### 3.6 Overlaps: the bug you find later (Learn, 30 min)
- Hook: your lab container is `172.17.0.3`, because Docker took `172.17.0.0/16`. What happens if your office network is `172.17.5.0/24`? Claim: valid CIDR blocks either nest or stay apart, so two ranges overlap exactly when one contains the other's start; an overlap shows up late, when two networks must talk.
- Worked example: `172.17.0.0/16` is numbers 2,886,795,264 to 2,886,860,799; `172.17.5.0/24` is 2,886,796,544 to 2,886,796,799, inside it. From inside Docker, the office range looks local. Docker's default pools start at `172.17.0.0/16`, run through `172.17` to `172.31`, and include `192.168.0.0/16`; they can be changed in `daemon.json` [S46]. On the test host the default bridge showed `172.17.0.0/16` (dossier 5.5); the docs do not state it, so check a container's own address at G3. AWS does not allow peering of VPCs with matching or overlapping CIDR blocks [S47].
- Diagram: MermaidDiagram flowchart with nested subgraphs: `172.17.5.0/24` inside `172.17.0.0/16`. Claim: nested means overlapping.
- Interactive: `net-addr-overlap` (`[addr: overlap]`). PREDICT first: "Which pair overlaps: `10.0.0.0/16` and `10.1.0.0/16`; `10.0.0.0/8` and `10.1.0.0/16`; `192.168.1.0/25` and `192.168.1.128/25`?" (the second). Then ranges on one number line.
- Assessment: one PREDICT, one QUIZ (home `192.168.1.0/24` and a VPN `192.168.1.0/24`: what breaks?). Near miss: treating adjacent blocks as overlapping; forgetting that `192.168.0.0/16` contains every `192.168.x.0/24`.

### 3.7 Code: subnet calculator, part 1 (Code, 40 min)
- Exercise: one `codeexercise` with four exports. `network(cidr: string): string`, `broadcast(cidr: string): string`, `size(cidr: string): number` (total addresses, 2^(32 minus n)), `contains(cidr: string, ip: string): boolean`. Signatures are proposals. Input: `"a.b.c.d/n"`, `n` an integer 0 to 32 with no leading zeros; the address part may have host bits set (the result is normalised). Bad address or prefix throws an `Error` starting `invalid`. Results are unsigned 32-bit (`>>> 0`).
- Edges: `/0` has size 4,294,967,296, network `0.0.0.0`, broadcast `255.255.255.255`; `/32` has size 1 and network and broadcast equal the address; `/31` has size 2 (course convention). Trap: `-1 << 32` is `-1` and `1 << 32` is `1` in JavaScript (checked by script), so `/0` needs its own branch.
- Test list: `network("192.168.1.23/24")` is `192.168.1.0`; `network("10.20.143.7/20")` is `10.20.128.0`; its broadcast is `10.20.143.255`; its size is 4096; `192.168.1.4/31` gives `192.168.1.4`, `192.168.1.5`, 2; a `/32` gives itself and 1; `/0` as above; `network("128.0.0.1/1")` is `128.0.0.0` (unsigned); `broadcast("255.255.255.255/32")` stays `255.255.255.255`; `contains("10.20.128.0/20", ...)` true for `10.20.143.7` and `10.20.143.255`, false for `10.20.144.0` and `10.20.127.255`; a `/32` contains only itself; `/0` contains `255.255.255.255`; throws on `/33`, `/-1`, `/24.5`, no slash, `1.2.3.256/24`.
- Hints: "build the mask once from the prefix"; "network is address AND mask, broadcast is network OR the inverted mask"; "finish each result with `>>> 0`". Starter imports the learner's 2.5 helpers or the reference helper.
- Diagram: MermaidDiagram flowchart: prefix to mask, then the four results. Claim: all four functions share one mask. Assessment: PREDICT (what `1 << 32` prints) and CODE. Near miss: negative results for addresses above `127.255.255.255`.

### 3.8 Code: subnet calculator, part 2 (Code, 35 min)
- Exercise: one `codeexercise` with two exports. `splitBlock(parent: string, hostCounts: number[]): { hosts: number, cidr: string }[]` and `overlaps(cidrs: string[]): [string, string][]` (proposals). Split means variable sizes, largest first (equal sizes keep input order), each placed at the next aligned address after the previous. Smallest prefix `p` up to `/30` with 2^(32 minus p) minus 2 at least `hosts`; never `/31` or `/32`. Throws `RangeError` if it does not fit, if a count is not a positive integer, or if the parent has host bits set (proposal). `overlaps` returns each overlapping pair once, in input order; nested and identical count, touching blocks do not.
- Test list: `splitBlock("192.168.10.0/24", [20, 100, 50])` gives `192.168.10.0/25`, `192.168.10.128/26`, `192.168.10.192/27` (input order does not change it); `[126]` is `/25`; `[127]` is `/24`; `[254]` fits `/24`; `[255]` throws; `[1]` and `[2]` are `/30`; `[3]` is `/29`; `[50, 50, 50, 50]` gives four `/26` at `.0`, `.64`, `.128`, `.192`; `[50, 50, 50, 50, 1]` throws; `[0]` throws; `[]` gives `[]`. `overlaps(["10.0.0.0/8", "10.1.0.0/16", "192.168.1.0/24"])` gives one pair; `["172.17.0.0/16", "172.17.5.0/24", "192.168.1.0/24"]` gives one pair; `["10.0.0.0/24", "10.0.1.0/24"]` gives none; duplicates give a pair.
- Hints: "sort the counts first"; "the next free address must be a multiple of the block size"; "two blocks overlap if either contains the other's network address". The 3.7 helper is unlockable after three failed attempts.
- Diagram: MermaidDiagram flowchart: sort, size, align, place, check. Claim: splitting is sort, size, align, place. Assessment: CODE and one QUIZ (how many `/26` fit in a `/24`: 4). Near miss: placing blocks smallest first, or ignoring alignment.

### 3.9 Same cable, wrong mask (Build, 50 min, slow path 75)
- Challenge: challenge 1 part 2, `challenges/challenge-1-two-computers/part-2-wrong-mask/` (proposed). Support: guided. Hook: your mask changed with the Wi-Fi in 3.1; what happens when two computers on one cable disagree? Claim: "local or not" is each computer's own decision from its own mask, so two computers can disagree. A route is the rule that says where to send a packet.
- Worked example (dossier 5.7): `laptop` `192.168.1.10/24` and `phone` `192.168.1.20/28`, one cable. From `laptop`: ping to `.20` is silent loss (2 sent, 0 received), and the capture on `phone` shows `laptop`'s ARP request. From `phone`: ping to `.10` prints `ping: connect: Network is unreachable` at once. `phone`'s `/28` is `192.168.1.16` to `.31`, so `.10` is outside it and no route exists. Then `laptop` pings `192.168.1.99`, an address nobody owns: silent loss and unanswered ARP requests (1.4's negative control, now explained). The "Destination Host Unreachable" line was not seen with `-c2 -W1`: do not promise it.
- Acceptance tests: must pass: after both sides are set to `/24` (the 1.4 state), ping works both ways with 0% loss. Must fail: with `/24` and `/28`, `phone` to `.10` exits non-zero with "Network is unreachable", and `laptop` to `.20` shows 100% loss. Captured output: `capture.txt` and `results.md` with both ping outputs and the ARP lines for `.99`.
- Hints: "compare the two masks with `ip addr`"; then "which address is each side's network?"; then the `ip route get` line (documented [S32]; its exact error text is untested, verify at G3). If you are stuck: `ip netns list`, `ip addr` in each namespace. Do not change `rp_filter` (dossier 5.7 observed it at 2 by default; do not teach it). Why `laptop` gets no reply is not isolated in the dossier: show what the capture shows and verify at G3 whether `phone` sends an ARP reply.
- Diagram: MermaidDiagram flowchart: each side's view of the other as local or not. Interactive: `net-replay-wrong-mask`. PREDICT first: "Which side fails at once and which fails silently?" One QUIZ on reading the two error messages.

### 3.10 Lab: plan the school network (Lab, 40 min)
- Hook: three computer labs, staff, guest Wi-Fi and printers, and one `/22` (1,024 addresses). Fit them with room to grow and no overlaps. Claim: a plan is sizes, then alignment, then a check, and room to grow is a stated margin.
- Reference scenario (proposal; the lab spec sets the real numbers): guest 250, staff 90, three labs of 40, printers 10, inside `10.30.0.0/22` (`10.30.0.0` to `10.30.3.255`). Reference answer: guest `10.30.0.0/23` (not a `/24`: 254 leaves 4 spare), staff `10.30.2.0/25`, labs `10.30.2.128/26`, `10.30.2.192/26`, `10.30.3.0/26`, printers `10.30.3.64/28`; used 848, free `10.30.3.80` to `10.30.3.255` (176). A fourth lab fits at `10.30.3.128/26`. Pass checks: every group fits, none overlap, all inside the `/22`, all aligned, each holds at least 20% more than its need (the lab states the rule). Optionally seed one existing range to avoid (ties to 3.6).
- Diagram: MermaidDiagram flowchart of the procedure (need, prefix, align, check), not the answer. Interactive: `net-lab-plan-school` (`[netlab: plan]`), checks pass or fail. PREDICT is not used (the lab is the assessment). The three-sentence reasons go in a LearningLog, which feeds 3.12.
- Assessment: lab checks plus one QUIZ (smallest prefix for 90 devices with 20% growth). Near miss: no growth margin; a block that starts off its boundary; two groups sharing a boundary.

### 3.11 Subnets and neighbours (Check, 15 min)
- Five QUIZ fences in `3.11-subnets-and-neighbours-quiz.md`: network address of `10.20.143.7/20`; predict who hears the first frame when an ARP table is empty; spot the overlapping pair among Docker, office and VPN ranges; two from module 2 (the number for an address; classify `172.32.0.5`). Written in the style of the drills; no teaching text. Every option gets one reason.

### 3.12 Defend your plan (Gate, 15 min)
- Evidence: the 3.10 plan defended against a fourth lab. Expected shape of a strong answer: a fourth lab of 40 devices needs a `/26`; the plan leaves an aligned free `/26` (in the reference, `10.30.3.128/26`) so nothing is renumbered; if no aligned `/26` were free the learner would say which block they would shrink and why. Gate branches: none.

## Interactions

Rules as in module 1.

| Ch | Top-level components | Tags (est.) | Assessments | Prose floor |
|---|---|---|---|---|
| 3.1 | LearningObjectives, MermaidDiagram, Callout, GlossaryTerm | 6 | PREDICT, QUIZ | 1,200 |
| 3.2 | MermaidDiagram, InteractiveCanvas, BigWordAlert (netmask), GlossaryTerm, Callout | 8 | PREDICT, QUIZ | 1,200 |
| 3.3 | MermaidDiagram, InteractiveCanvas, BigWordAlert (ARP), GlossaryTerm, Callout | 8 | PREDICT, QUIZ | 1,200 |
| 3.4 | MermaidDiagram, InteractiveCanvas, ComparePanel, GlossaryTerm | 8 | PREDICT, QUIZ | 1,200 |
| 3.5 | MermaidDiagram, InteractiveCanvas, BigWordAlert (subnet boundary), GlossaryTerm, Callout | 7 | PREDICT, QUIZ | 1,200 |
| 3.6 | MermaidDiagram, InteractiveCanvas, GlossaryTerm, Callout | 6 | PREDICT, QUIZ | 1,200 |
| 3.7 | MermaidDiagram, Callout, GlossaryTerm | 5 | PREDICT, CODE | 1,200 |
| 3.8 | MermaidDiagram, GlossaryTerm | 3 | CODE, QUIZ | 1,200 |
| 3.9 | Steps, MermaidDiagram, Callout, InteractiveCanvas, GlossaryTerm, BigWordAlert (route) | 16 | PREDICT, QUIZ | 1,200 |
| 3.10 | MermaidDiagram, InteractiveCanvas, LearningLog, Callout, GlossaryTerm | 6 | QUIZ | 1,200 |
| 3.11 | none | 0 | QUIZ x5 | quiz only |
| 3.12 | Checklist, LearningLog, ChapterRecap | 3 | OPEN_QUESTION | 700 |

`LearningObjectives` in 3.1, `ChapterRecap` in 3.12. Diagram plan: ten Mermaid diagrams (3.1 to 3.10); every Learn chapter has one and the module requirement is met. No MustRead needed; one `InterestingRead` is optional (3.6, Docker's address pools [S46]). One drill set per `[addr]` canvas is the graded unassisted evidence for 3.2 and 3.5 (O3).

## Canvases

| Slug (proposed) | Renderer | Chapter | Claim | Stated limit | Fallback if not built |
|---|---|---|---|---|---|
| `net-addr-mask-and` | `[addr]` mask-and + drill | 3.2 | AND with the mask gives the network, host bits set give the broadcast | IPv4, contiguous masks only | Static worked bit table; drills become quiz questions (decision 3) |
| `net-lab-arp-switch` | `[netlab]` host, switch (slice 1) | 3.3 | A host broadcasts to find a neighbour's MAC; a switch learns from frames it sees | One segment; no ARP ageing shown | Scripted `[sequence]` of four actors (laptop, switch, friend, third host) with a prediction before each step |
| `net-lab-flat-vs-split` | `[netlab]` host, switch, router, filter (slice 1) | 3.4 | Splitting shrinks who hears a broadcast; a rule at the router limits access | The router is a box that joins networks; no routing tables yet | Same `[sequence]` fallback plus a ComparePanel |
| `net-addr-split` | `[addr]` split + drill | 3.5 | Pieces start on their own boundary; misaligned cuts are refused | Largest-first host counts; no VLSM tooling beyond this | Static table of the 100, 50, 20 example; drills become quiz questions |
| `net-addr-overlap` | `[addr]` overlap | 3.6 | Valid blocks nest or stay apart; overlap means nested | IPv4 ranges on one line; no routing consequence modelled | Static number line plus quiz |
| `net-replay-wrong-mask` | `[replay]` | 3.9 | Two computers can disagree about "local" | Recorded run from the reference solution | `[sequence]` of two actors with a Predict before each step |
| `net-lab-plan-school` | `[netlab]` plan mode (slice 1) | 3.10 | A plan fits sizes, alignment and growth without overlap | Fit and overlap checks only; no traffic | Graded lab blocked; roadmap fallback is a diagnosis graded as a quiz. Offering `net-addr-split` as ungraded practice is a proposal |

The netlab chapters need slice 1 before they are written (decision 2). The `[addr]` library is the 2.5, 3.7 and 3.8 reference solution (roadmap).

## Gate

Gate 3.12 (15 minutes, review within three days, learners carry on). Evidence: the 3.10 plan defended against a fourth lab.
- Checklist: I can find network, broadcast and host range of any `/n` by hand; I passed 3.7 and 3.8; my 3.10 plan has no overlap and a stated growth margin; I can say what my computer does when a destination is not on its network; I committed challenge 1 part 2.
- LearningLog: which step of subnet arithmetic you still check twice; what the three sentences in 3.10 said about your biggest block.
- OPEN_QUESTION: "A fourth computer lab of 40 devices arrives. Show where it goes in your plan, what changes, and what you would do if no space were free." `submissionMode: text`, `allowSpeechInput: true`, link-only needs `minWords: 0`.
- ChapterRecap: the mask decides local or not; network and broadcast come from AND and OR; ARP finds neighbours; blocks are cut on their own boundary; overlaps are found late; two computers can disagree about local.

## Risks

- Likeliest stalls: 3.2 (AND with a non-octet mask such as `/20`; the 1.4 "first three numbers" shortcut breaks); 3.5 (alignment); 3.7 (signed numbers and the `/0` shift). Mitigation: all three start from a worked `/20` or `/23` and a PREDICT; the drills are unassisted so the weak step shows; the 3.7 PREDICT on `1 << 32` and the helper unlock. This is week 1's heaviest stretch (11.8 hours for modules 1 to 3): watch for fatigue at 3.7 and 3.8.
- Platform: 3.3, 3.4 and 3.10 need netlab slice 1; if late, 3.3 and 3.4 switch to scripted `[sequence]` step-throughs and 3.10 is blocked.
- Accuracy traps from the dossier: contiguous masks only [S7]; broadcast is derived, not cited; ARP ageing is left to the implementer [S22] (give no number); `/31` and `/32` conventions are not in the dossier; Docker's `172.17.0.0/16` is observed on the test host, not stated in the docs [S46]; do not promise "Destination Host Unreachable" (not seen, dossier 5.7); `ip route get` error text and any macOS output are untested; peering rule is AWS-specific [S47].
- Prose floor: 3.1 at 10 minutes and 3.12 at 15 minutes must still hold 1,200 and 700 words; keep tasks to the single command in 3.1 and the one answer in 3.12.

## Roadmap issues

1. 3.2 and 3.7 require defined answers for `/31`, but the dossier has no source for `/31` behaviour (RFC 3021). The brief states the course convention (two addresses, both usable, point to point) and marks the source as missing.
2. 3.3 asks the learner to say how a switch learns MAC addresses, but the dossier has no source for it. The brief teaches it as the lab switch's behaviour; add a source or accept that.
3. 3.6's hook states that Docker took `172.17.0.0/16` as fact; the dossier says the docs do not state it and it was observed on one host. The brief softens the wording and asks for a check at G3.
4. 3.1 (10 minutes) and 3.12 (15 minutes) must hold the 1,200 and 700 word floors; Code (3.7, 3.8) and Lab (3.10) chapters are not named in the brief's floor rule, and the audit applies 1,200 to them, which this brief follows.
5. 3.10 says "say in three sentences why each size" but names no place for the sentences, and the roadmap has no fallback that keeps plan mode graded. The brief puts the sentences in a LearningLog and offers an ungraded stand-in. The 3.10 and 3.12 numbers are proposals; the roadmap gives none.
