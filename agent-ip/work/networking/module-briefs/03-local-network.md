---
artifact: module-brief
course: networking
module: 03-local-network
version: 2
owner: curriculum-architect
roadmap_version: 3.1
roadmap_confirmed: true
agent_ip_version: 0.5.3
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
- Format (agent-ip v0.5.3): `format: beats`, 2 beats (a Read chapter has one or two); at most 70 visible words per beat; depth and the worked example go in `GoDeeper` folds; the commands the chapter asks the learner to run stay as code fences; no BigWordAlert (terms use `GlossaryTerm`). The hook and claim above stay as the chapter's opening lines.
- Beats:
  1. **One laptop, two networks, two masks** (fixed picture). MermaidDiagram `mmd-3-1-two-masks` (inline, no registration). Shows: the same laptop gets 10.20.143.7 with 255.255.240.0 on campus and 192.168.1.23 with 255.255.255.0 at home.
  2. **Read the mask on your own computer** (fixed picture). VisualDiagram `net-m3-mask-annotated` (annotated picture of real outputs). Shows: annotated mask lines for Windows, Linux and macOS (hex): ff is 255, 00 is 0, f0 is 240; the prefix is the count of 1 bits. Learner: finds and records their own mask.
- Predict (right before beat 1, "One laptop, two networks, two masks"): Your numbers changed when you changed Wi-Fi. What do you think the mask is for? Options: it tells which other devices you can reach directly / it sets how fast the network is / it decides which websites open. Answerable from: everyday words only; a guess at the beginning of a Read chapter, shown the answer by 3.2, with no term the module has not taught.
- Quick check (after the last beat): (1) macOS prints netmask 0xffff0000: which dotted mask is it (taught in beat 2 (ff is 255, 00 is 0)).
- Components: GlossaryTerm (netmask, prefix length); 1 Callout; LearningObjectives; one `GoDeeper` fold per beat; about 8 of 40 JSX tags; 2 of 3 assessments.
- Near miss: Reading the mask as a second address. macOS `ifconfig` prints `netmask 0xfffff000` and `0xffffff00`: `ff` is 255 and `f0` is 240 (check on a Mac before publish). The prefix is the count of 1 bits: 20 and 24. No arithmetic yet.

### 3.2 Network part and host part (Learn, 40 min)
- Hook: your laptop sends to `192.168.1.40` directly but to `192.168.2.40` through the router. How does it decide? Claim: a host ANDs its mask with the destination and compares with its own network [S7]; the network address is address AND mask; the broadcast address is the network with all host bits set to 1 (derived arithmetic, no source needed).
- Worked example: `192.168.1.23/24`: network `192.168.1.0`, broadcast `192.168.1.255`, 256 addresses, hosts `192.168.1.1` to `192.168.1.254`; `192.168.1.40` is local, `192.168.2.40` is not. Campus `10.20.143.7/20`: 143 is `10001111`, mask part `11110000`, AND gives 128, so network `10.20.128.0`; host bits set gives `10.20.143.255`; 4,096 addresses; hosts `10.20.128.1` to `10.20.143.254` (checked by script). Edges: `/32` is one address (network and broadcast are the address); `/31` has two addresses on a point-to-point link and no directed broadcast [S70]; `/0` is everything. Teach contiguous masks only [S7].
- Format (agent-ip v0.5.3): `format: beats`, 7 beats; at most 70 visible words per beat, 300 to 700 visible words in all and at least 900 with the `GoDeeper` folds (the claim and worked example above are spread over the beats and their folds); one visual per beat; at least one playable beat; at most 40 JSX tags and 3 assessment interactions; no BigWordAlert (terms use `GlossaryTerm`). The hook above is the chapter's one or two opening sentences.
- Beats:
  1. **Send direct, or through the router?** (fixed picture). MermaidDiagram `mmd-3-2-local-or-not` (inline, no registration). Shows: destination AND mask equals my network? yes, send to the neighbour; no, send to the gateway.
  2. **The mask marks the network part** (playable). InteractiveCanvas `net-m3-mask-bits` (`[addr]`). Shows: address and mask side by side in bits, the 1 bits marking the network part. Learner: drag the prefix length.
  3. **AND with the mask gives the network** (playable). InteractiveCanvas `net-m3-mask-and` (`[addr]`). Shows: address AND mask, bit by bit, gives the network address. Learner: flip address bits and watch the AND.
  4. **Host bits all 1 give the broadcast** (playable). InteractiveCanvas `net-m3-broadcast` (`[addr]`). Shows: network with every host bit set to 1 is the broadcast; hosts lie between. Learner: flip host bits, read first and last host.
  5. **A /23 reaches across two third numbers** (playable). InteractiveCanvas `net-m3-wide-mask` (`[addr]`). Shows: 192.168.1.23/23 covers 192.168.0.0 to 192.168.1.255, so 192.168.0.40 is local. Learner: type a destination and see local or not.
  6. **The edges: /31, /32 and /0** (fixed picture). MermaidDiagram `mmd-3-2-edges` (inline, no registration). Shows: /32 is one address, /31 has two on a point-to-point link and no directed broadcast, /0 is everything.
  7. **Network and broadcast by hand** (playable). InteractiveCanvas `net-m3-mask-drill` (`[addr]`). Shows: generated questions on network, broadcast and same-subnet, no calculator. Learner: answer by hand with instant feedback.
- Predict (right before beat 5, "A /23 reaches across two third numbers"): Your address is 192.168.1.23/23. Is 192.168.0.40 local? Options: yes, it is local / no, it is not local / cannot tell without the gateway. Answerable from: beats 2 to 4 have shown the AND with the mask; the learner applies it to a /23 for the first time.
- Quick check (after the last beat): (1) Broadcast address of 10.20.143.7/20 (taught in beats 4 and 7).
- Components: GlossaryTerm (netmask, network address, broadcast address, host range); 1 Callout; one `GoDeeper` fold per beat; about 19 of 40 JSX tags; 2 of 3 assessments.
- Near miss: The 'first three numbers' shortcut from 1.4 breaks for `/20` and `/23`; forgetting that usable hosts are 2 fewer than size. Campus `10.20.143.7/20`: 143 is `10001111`, mask part `11110000`, AND gives 128, so network `10.20.128.0`, broadcast `10.20.143.255`, 4,096 addresses, hosts `10.20.128.1` to `10.20.143.254` (checked by script). Teach contiguous masks only [S7]; `/31` is sourced [S70]; the broadcast rule is derived arithmetic.

### 3.3 Neighbours: MAC addresses and ARP (Learn, 35 min)
- Hook: you send a file to your friend's laptop at `192.168.1.40` on the same Wi-Fi. Wi-Fi delivers by hardware address, not IP. How does your laptop find your friend's? Claim: before sending, the laptop broadcasts "who has this IPv4 address?", the owner answers it directly, and the answer is cached [S22]; the broadcast is the only packet every device hears. Table ageing is left to the implementer [S22]: give no timeout figure.
- Worked example: ARP table empty; `192.168.1.23` (fictional MAC `02:00:00:00:00:23`) sends to `192.168.1.40` (`02:00:00:00:00:40`): request "who has `192.168.1.40`, tell `192.168.1.23`" to everyone, reply "`192.168.1.40` is at `02:00:00:00:00:40`", then data. Show the same lines in the learner's own 1.4 capture. The switch learns: a frame arrives on port 2 from MAC X, so it records X on port 2; until it knows a MAC it sends to every port. Switch learning is sourced [S76]: the switch learns the source MAC of each frame it receives, ages entries out (give no figure) and floods a frame for an unknown address; the source describes the Linux bridge, and the lab's switch behaves the same way. `arp -a` on Windows and macOS, `ip neigh` on Linux; the lab generates the output.
- Format (agent-ip v0.5.3): `format: beats`, 5 beats; at most 70 visible words per beat, 300 to 700 visible words in all and at least 900 with the `GoDeeper` folds (the claim and worked example above are spread over the beats and their folds); one visual per beat; at least one playable beat; at most 40 JSX tags and 3 assessment interactions; no BigWordAlert (terms use `GlossaryTerm`). The hook above is the chapter's one or two opening sentences.
- Beats:
  1. **You know the IP, not the MAC** (watch only). InteractiveCanvas `net-m3-scene-need-mac` (the `scene` renderer). Shows: your laptop has 192.168.1.40 in mind; the Wi-Fi delivers by hardware address, which it does not have.
  2. **Ask everyone: who has this address?** (playable). InteractiveCanvas `net-m3-arp-exchange` (`[netlab]`). Shows: the ARP request goes to every device, only the owner replies, then the data frame is sent. Learner: send a packet to 192.168.1.40 with an empty ARP table and step the exchange.
  3. **The answer is remembered** (playable). InteractiveCanvas `net-m3-arp-table` (`[netlab]`). Shows: the ARP table after the reply, as arp -a or ip neigh would print it. Learner: clear the table and send again.
  4. **A switch learns where each MAC lives** (playable). InteractiveCanvas `net-m3-switch-learning` (`[netlab]`). Shows: a frame arrives on port 2 from MAC X, so the switch records X on port 2; an unknown MAC is sent to every port. Learner: send frames between hosts and watch the switch table fill.
  5. **Nobody owns the address: no reply** (playable). InteractiveCanvas `net-m3-arp-no-owner` (`[netlab]`). Shows: an ARP request for 192.168.1.99 goes out and nothing answers, as in the challenge 1 negative control. Learner: pick an address nobody owns and send.
- Predict (right before beat 2, "Ask everyone: who has this address?"): Your ARP table is empty and you send one packet to 192.168.1.40. Who receives the first frame? Options: only your friend's laptop / every device on the network / only the router. Answerable from: 1.6 taught the broadcast MAC and 1.4's capture showed an ARP line; beat 1 says the laptop does not know the MAC.
- Quick check (after the last beat): (1) After the reply, does the switch send the next frame to every port or to one (taught in beat 4).
- Components: GlossaryTerm (ARP, ARP table, switch, broadcast); 1 Callout; one `GoDeeper` fold per beat; about 15 of 40 JSX tags; 2 of 3 assessments.
- Near miss: ARP works only on one network (a remote destination is module 4); an ARP request for an address nobody owns gets no answer (1.4's `192.168.1.99`). Table ageing is left to the implementer [S22]: give no timeout figure. Switch learning is sourced [S76]. `arp -a` on Windows and macOS, `ip neigh` on Linux; the lab generates the output. Fictional MACs such as `02:00:00:00:00:23`.

### 3.4 Why split a network (Learn, 35 min)
- Hook: a school puts 600 devices in one network: staff laptops, the exam server and guest phones. One infected phone can now reach the exam server. What would you change? Claim: three reasons, in the roadmap's order: one block can serve several networks [S7]; faults and access stay contained; fewer devices hear each broadcast. The last two are reasoning, not sourced facts. The router is shown as a box that joins networks; module 4 opens it.
- Worked example: 100 staff laptops, 1 exam server, 499 guest phones. Flat: a staff laptop's broadcast is heard by 599 others. Split into three networks: heard by 99. One labelled filter rule: guest to exam server is dropped. Sizes come in 3.5 (a flat 600 needs a `/22`).
- Format (agent-ip v0.5.3): `format: beats`, 5 beats; at most 70 visible words per beat, 300 to 700 visible words in all and at least 900 with the `GoDeeper` folds (the claim and worked example above are spread over the beats and their folds); one visual per beat; at least one playable beat; at most 40 JSX tags and 3 assessment interactions; no BigWordAlert (terms use `GlossaryTerm`). The hook above is the chapter's one or two opening sentences.
- Beats:
  1. **600 devices, one network** (watch only). InteractiveCanvas `net-m3-scene-flat-school` (the `scene` renderer). Shows: staff laptops, the exam server and guest phones on one network; one infected phone reaches the exam server.
  2. **Every broadcast reaches every device** (playable). InteractiveCanvas `net-m3-flat-broadcast` (`[netlab]`). Shows: one staff laptop sends a broadcast and 599 others hear it. Learner: send a broadcast and count who hears it.
  3. **Three networks joined by a router** (playable). InteractiveCanvas `net-m3-split-broadcast` (`[netlab]`). Shows: the same devices on three switches joined by a router box; the broadcast stays on its own switch. Learner: send the same broadcast and count again.
  4. **Splitting alone does not keep guests out** (playable). InteractiveCanvas `net-m3-split-filter` (`[netlab]`). Shows: without a rule the groups still reach each other; one labelled rule at the router drops guest to exam server. Learner: toggle the rule and send a packet from a guest.
  5. **One block can serve several networks** (fixed picture). MermaidDiagram `mmd-3-4-one-block` (inline, no registration). Shows: a /22 cut into three networks; sizes come in 3.5.
- Predict (right before beat 3, "Three networks joined by a router"): In the split picture, a staff laptop sends one broadcast. How many other devices hear it? Options: 599 / 99 / 0. Answerable from: beat 2 showed 599 on the flat network; beat 3's picture shows three separate switches joined by a router box, so the learner counts the devices on the staff switch.
- Quick check (after the last beat): (1) What stops the guest phone: the split alone, or the split plus the rule (taught in beat 4).
- Components: GlossaryTerm (broadcast, subnet, filter rule); 1 Callout; ComparePanel (flat versus split, in the beat 3 fold); one `GoDeeper` fold per beat; about 15 of 40 JSX tags; 2 of 3 assessments.
- Near miss: Splitting alone does not block access; without the rule the groups still reach each other. Worked numbers: 100 staff laptops, 1 exam server, 499 guest phones; flat is heard by 599, split by 99. The last two of the three reasons (contained faults and access, fewer broadcasts) are reasoning, not sourced facts; the first (one block, several networks) cites [S7]. Sizes come in 3.5 (a flat 600 needs a `/22`).

### 3.5 Cutting a block into subnets (Learn, 40 min)
- Hook: you have `192.168.10.0/24` and need networks for 100, 50 and 20 devices. Where does each start? Claim: every block is a power of two that must start where its host bits are all zero (the 3.2 AND), so pieces start on their own boundary; cut largest first.
- Worked example: 100 devices need `/25` (126 usable): `192.168.10.0/25`, `.0` to `.127`. 50 need `/26` (62): `192.168.10.128/26`. 20 need `/27` (30): `192.168.10.192/27`. Free: `192.168.10.224/27`. A `/26` may start only at `.0`, `.64`, `.128` or `.192`; one at `.100` is refused with the reason. 126 devices fit a `/25`, 127 need a `/24`.
- Format (agent-ip v0.5.3): `format: beats`, 5 beats; at most 70 visible words per beat, 300 to 700 visible words in all and at least 900 with the `GoDeeper` folds (the claim and worked example above are spread over the beats and their folds); one visual per beat; at least one playable beat; at most 40 JSX tags and 3 assessment interactions; no BigWordAlert (terms use `GlossaryTerm`). The hook above is the chapter's one or two opening sentences.
- Beats:
  1. **Every cut halves a block** (fixed picture). MermaidDiagram `mmd-3-5-halving` (inline, no registration). Shows: the /24 halves into two /25, one /25 into two /26, one /26 into two /27.
  2. **Pick the size for each network** (playable). InteractiveCanvas `net-m3-split-size` (`[addr]`). Shows: 100 devices need a /25 (126 usable), 50 a /26 (62), 20 a /27 (30). Learner: pick a prefix for each host count.
  3. **Place the biggest block first** (playable). InteractiveCanvas `net-m3-split-place` (`[addr]`). Shows: 192.168.10.0/25 takes .0 to .127; the free space is the other half. Learner: drag the 100-device block into the /24.
  4. **Each piece starts on its own boundary** (playable). InteractiveCanvas `net-m3-split-boundary` (`[addr]`). Shows: a /26 may start only at .0, .64, .128 or .192; one at .100 is refused with the reason. Learner: try to drop the 50-device block at .100.
  5. **Cut a block by hand** (playable). InteractiveCanvas `net-m3-split-drill` (`[addr]`). Shows: generated questions on sizes and starts, no calculator. Learner: answer by hand with instant feedback.
- Predict (right before beat 4, "Each piece starts on its own boundary"): The 100-device network takes the first /25. Where does the 50-device network start? Options: .64 / .100 / .128. Answerable from: beat 3 has just placed the /25 and 2.3 taught that a /25 is 128 addresses, so the next free address is arithmetic.
- Quick check (after the last beat): (1) Smallest prefix that holds 31 hosts (/26) (taught in beats 2 and 5).
- Components: GlossaryTerm (subnet boundary, VLSM); 1 Callout; one `GoDeeper` fold per beat; about 13 of 40 JSX tags; 2 of 3 assessments.
- Near miss: Counting devices without the two reserved addresses; placing the smallest block first and wasting space. 126 devices fit a `/25`, 127 need a `/24`. Worked split: `192.168.10.0/25`, `192.168.10.128/26`, `192.168.10.192/27`, free `192.168.10.224/27`.

### 3.6 Overlaps: the bug you find later (Learn, 30 min)
- Hook: on the test machine Docker used `172.17.0.0/16` for its default network, so a container there was `172.17.0.3`; check yours with `docker network inspect bridge`. What happens if your office network is `172.17.5.0/24`? Claim: valid CIDR blocks either nest or stay apart, so two ranges overlap exactly when one contains the other's start; an overlap shows up late, when two networks must talk.
- Worked example: `172.17.0.0/16` is numbers 2,886,795,264 to 2,886,860,799; `172.17.5.0/24` is 2,886,796,544 to 2,886,796,799, inside it. From inside Docker, the office range looks local. Docker's default pools start at `172.17.0.0/16`, run through `172.17` to `172.31`, and include `192.168.0.0/16`; they can be changed in `daemon.json` [S46]. On the test machine the default bridge showed `172.17.0.0/16` (dossier 5.5); the docs do not state it, so the chapter words it as an observation and sends the learner to `docker network inspect bridge` to check their own. AWS does not allow peering of VPCs with matching or overlapping CIDR blocks [S47].
- Format (agent-ip v0.5.3): `format: beats`, 5 beats; at most 70 visible words per beat, 300 to 700 visible words in all and at least 900 with the `GoDeeper` folds (the claim and worked example above are spread over the beats and their folds); one visual per beat; at least one playable beat; at most 40 JSX tags and 3 assessment interactions; no BigWordAlert (terms use `GlossaryTerm`). The hook above is the chapter's one or two opening sentences.
- Beats:
  1. **Docker took 172.17.0.0/16** (fixed picture). MermaidDiagram `mmd-3-6-nested` (inline, no registration). Shows: 172.17.5.0/24 drawn inside 172.17.0.0/16: nested means overlapping.
  2. **Ranges on one number line** (playable). InteractiveCanvas `net-m3-overlap-line` (`[addr]`). Shows: each block as a range on one line, 172.17.0.0/16 from 2,886,795,264 to 2,886,860,799. Learner: drag a range along the line.
  3. **Valid blocks nest or stay apart** (playable). InteractiveCanvas `net-m3-overlap-nest` (`[addr]`). Shows: two valid CIDR blocks either contain one another or share nothing; overlaps highlight. Learner: move a second block and watch the highlight.
  4. **An overlap shows up late** (watch only). InteractiveCanvas `net-m3-scene-late-overlap` (the `scene` renderer). Shows: two networks work alone, then must talk over a VPN and the same range exists on both sides.
  5. **Cloud networks that overlap cannot peer** (fixed picture). MermaidDiagram `mmd-3-6-peering` (inline, no registration). Shows: AWS does not allow peering of VPCs with matching or overlapping CIDR blocks [S47].
- Predict (right before beat 3, "Valid blocks nest or stay apart"): Which pair overlaps: 10.0.0.0/16 and 10.1.0.0/16; 10.0.0.0/8 and 10.1.0.0/16; 192.168.1.0/25 and 192.168.1.128/25? Options: the first pair / the second pair / the third pair. Answerable from: beat 2 shows each block as a start and an end on one line (2.3 and 3.2 taught the range of a /n).
- Quick check (after the last beat): (1) Home 192.168.1.0/24 and a VPN 192.168.1.0/24: what breaks (taught in beat 4).
- Components: GlossaryTerm (overlap, VPN); 1 Callout; InterestingRead (Docker address pools [S46], in a fold); one `GoDeeper` fold per beat; about 14 of 40 JSX tags; 2 of 3 assessments.
- Near miss: Treating adjacent blocks as overlapping; forgetting that `192.168.0.0/16` contains every `192.168.x.0/24`. Docker's default pools start at `172.17.0.0/16`, run through `172.17` to `172.31` and include `192.168.0.0/16` [S46]. On the test machine the default bridge showed `172.17.0.0/16` (dossier 5.5): the chapter words it as an observation and sends the learner to `docker network inspect bridge`.

### 3.7 Code: subnet calculator, part 1 (Code, 40 min)
- Exercise: one `codeexercise` with four exports. `network(cidr: string): string`, `broadcast(cidr: string): string`, `size(cidr: string): number` (total addresses, 2^(32 minus n)), `contains(cidr: string, ip: string): boolean`. Signatures are proposals. Input: `"a.b.c.d/n"`, `n` an integer 0 to 32 with no leading zeros; the address part may have host bits set (the result is normalised). Bad address or prefix throws an `Error` starting `invalid`. Results are unsigned 32-bit (`>>> 0`).
- Edges: `/0` has size 4,294,967,296, network `0.0.0.0`, broadcast `255.255.255.255`; `/32` has size 1 and network and broadcast equal the address; `/31` has size 2 and no directed broadcast [S70]; `broadcast()` returns the higher address by the exercise's stated convention, and the chapter says so. Trap: `-1 << 32` is `-1` and `1 << 32` is `1` in JavaScript (checked by script), so `/0` needs its own branch.
- Test list: `network("192.168.1.23/24")` is `192.168.1.0`; `network("10.20.143.7/20")` is `10.20.128.0`; its broadcast is `10.20.143.255`; its size is 4096; `192.168.1.4/31` gives `192.168.1.4`, `192.168.1.5`, 2; a `/32` gives itself and 1; `/0` as above; `network("128.0.0.1/1")` is `128.0.0.0` (unsigned); `broadcast("255.255.255.255/32")` stays `255.255.255.255`; `contains("10.20.128.0/20", ...)` true for `10.20.143.7` and `10.20.143.255`, false for `10.20.144.0` and `10.20.127.255`; a `/32` contains only itself; `/0` contains `255.255.255.255`; throws on `/33`, `/-1`, `/24.5`, no slash, `1.2.3.256/24`.
- Hints: "build the mask once from the prefix"; "network is address AND mask, broadcast is network OR the inverted mask"; "finish each result with `>>> 0`". Starter imports the learner's 2.5 helpers or the reference helper.
- Diagram: MermaidDiagram flowchart: prefix to mask, then the four results. Claim: all four functions share one mask. Assessment: PREDICT (without `>>> 0`, does the number for `128.0.0.1` come out positive or negative; answerable from 2.2 and 2.5) and CODE. The `1 << 32` trap is taught in a Callout before the `/0` test, not asked (G3 never-ask fix). Near miss: negative results for addresses above `127.255.255.255`.

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
- Diagram: MermaidDiagram flowchart: each side's view of the other as local or not. Interactive: `net-m3-replay-wrong-mask`. PREDICT, placed after the line that says neither namespace has a gateway: "Which computer thinks the other is NOT on its own network, the one with `/24` or the one with `/28`?" (answerable from the 3.2 AND; the two failure styles are what the build then shows; G3 never-ask fix). One QUIZ on reading the two error messages.

### 3.10 Lab: plan the school network (Lab, 40 min)
- Hook: three computer labs, staff, guest Wi-Fi and printers, and one `/22` (1,024 addresses). Fit them with room to grow and no overlaps. Claim: a plan is sizes, then alignment, then a check, and room to grow is a stated margin.
- Reference scenario (proposal; the lab spec sets the real numbers): guest 250, staff 90, three labs of 40, printers 10, inside `10.30.0.0/22` (`10.30.0.0` to `10.30.3.255`). Reference answer: guest `10.30.0.0/23` (not a `/24`: 254 leaves 4 spare), staff `10.30.2.0/25`, labs `10.30.2.128/26`, `10.30.2.192/26`, `10.30.3.0/26`, printers `10.30.3.64/28`; used 848, free `10.30.3.80` to `10.30.3.255` (176). A fourth lab fits at `10.30.3.128/26`. Pass checks: every group fits, none overlap, all inside the `/22`, all aligned, each holds at least 20% more than its need (the lab states the rule). Optionally seed one existing range to avoid (ties to 3.6).
- Diagram: MermaidDiagram flowchart of the procedure (need, prefix, align, check), not the answer. Interactive: `net-lab-plan-school` (`[netlab: plan]`), checks pass or fail. PREDICT is not used (the lab is the assessment). The three-sentence reasons go in a LearningLog, which feeds 3.12.
- Assessment: lab checks plus one QUIZ (smallest prefix for 90 devices with 20% growth). Near miss: no growth margin; a block that starts off its boundary; two groups sharing a boundary.

### 3.11 Subnets and neighbours (Check, 15 min)
- Five QUIZ fences in `3.11-subnets-and-neighbours-quiz.md`, quiz-only with no canvas: network address of `10.20.143.7/20`; predict who hears the first frame when an ARP table is empty; spot the overlapping pair among Docker, office and VPN ranges; two from module 2 (the number for an address; classify `172.32.0.5`). Written as plain quiz questions in the drill style; no teaching text. Every option gets one reason.

### 3.12 Defend your plan (Gate, 15 min)
- Evidence: the 3.10 plan defended against a fourth lab. Expected shape of a strong answer: a fourth lab of 40 devices needs a `/26`; the plan leaves an aligned free `/26` (in the reference, `10.30.3.128/26`) so nothing is renumbered; if no aligned `/26` were free the learner would say which block they would shrink and why. Gate branches: none.

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
| 3.1 | beats (2) | 2 beat visuals (diagrams), GoDeeper x2, GlossaryTerm x2, Callout x1, LearningObjectives | 8 | PREDICT, QUIZ | one or two beats, at most 70 words each |
| 3.2 | beats (7) | 7 beat visuals (5 canvas, 2 diagram), GoDeeper x7, GlossaryTerm x4, Callout x1 | 19 | PREDICT, QUIZ | at most 70 words a beat; 300 to 700, 900+ with folds |
| 3.3 | beats (5) | 5 beat visuals (canvases), GoDeeper x5, GlossaryTerm x4, Callout x1 | 15 | PREDICT, QUIZ | at most 70 words a beat; 300 to 700, 900+ with folds |
| 3.4 | beats (5) | 5 beat visuals (4 canvas, 1 diagram), GoDeeper x5, GlossaryTerm x3, Callout x1, ComparePanel (in a fold) | 15 | PREDICT, QUIZ | at most 70 words a beat; 300 to 700, 900+ with folds |
| 3.5 | beats (5) | 5 beat visuals (4 canvas, 1 diagram), GoDeeper x5, GlossaryTerm x2, Callout x1 | 13 | PREDICT, QUIZ | at most 70 words a beat; 300 to 700, 900+ with folds |
| 3.6 | beats (5) | 5 beat visuals (3 canvas, 2 diagram), GoDeeper x5, GlossaryTerm x2, Callout x1, InterestingRead (in a fold) | 14 | PREDICT, QUIZ | at most 70 words a beat; 300 to 700, 900+ with folds |
| 3.7 | prose | MermaidDiagram, Callout, GlossaryTerm | 5 | PREDICT, CODE | 700 prose words |
| 3.8 | prose | MermaidDiagram, GlossaryTerm | 3 | CODE, QUIZ | 700 prose words |
| 3.9 | prose | Steps, MermaidDiagram, Callout, InteractiveCanvas (replay), GlossaryTerm, BigWordAlert (route) | 16 | PREDICT, QUIZ | 1,200 prose words |
| 3.10 | prose | MermaidDiagram, InteractiveCanvas (netlab plan), LearningLog, Callout, GlossaryTerm | 6 | QUIZ, lab checks | 700 prose words |
| 3.11 | prose | none | 0 | QUIZ x5 | quiz only |
| 3.12 | prose | Checklist, LearningLog, ChapterRecap | 3 | OPEN_QUESTION | 700 prose words |

`LearningObjectives` in 3.1, `ChapterRecap` in 3.12. No MustRead needed; one `InterestingRead` is optional (3.6, in a fold).

Diagram plan: Beat diagrams: two networks and two masks (3.1), local-or-not decision and the edge prefixes (3.2), one block serving several networks (3.4), halving a block (3.5), nested ranges and cloud peering (3.6). Build and Code chapters have one flowchart each (3.7 prefix to mask to four results; 3.8 sort, size, align, place, check; 3.9 each side's view of the other; 3.10 the planning procedure, not the answer). One optional InterestingRead in 3.6 (Docker's address pools [S46]), placed in a fold.

## Canvases

Canvas decisions (interaction designer, G3):

- Subnet arithmetic is the module's causal model: the `[addr]` renderer (modes mask-bits, mask-and, broadcast, wide-mask, mask-drill, split-size, split-place, split-boundary, split-drill, overlap-line, overlap-nest) carries every arithmetic beat, with unassisted drills as the graded evidence for 3.2 and 3.5 (O3).
- ARP and the switch table (3.3) and the flat-versus-split broadcast (3.4) are packet behaviour, so they use `[netlab]` host, switch, router and filter (slice 1) in beat mode; the router is drawn as a box that joins networks and module 4 opens it.
- 3.9 keeps a `[replay]` in a phone-only section; 3.10 is a graded `[netlab]` plan-mode lab, not a beat.
- 3.1 is a Read chapter: one Mermaid beat and the learner's own computer, no model.

Slugs follow the registry convention `net-m<module>-<name>` (graded labs keep `net-lab-`) and are proposed: none is written into a chapter until it is built and registered. The full registry with modes and chapters is in `interaction-map.yaml`. Fallbacks are named per chapter below the table.

| Slug (proposed) | Renderer | Chapter, beat | Mode | What it shows |
|---|---|---|---|---|
| `net-m3-mask-bits` | [addr] | 3.2, beat 2 | playable | address and mask side by side in bits, the 1 bits marking the network part |
| `net-m3-mask-and` | [addr] | 3.2, beat 3 | playable | address AND mask, bit by bit, gives the network address |
| `net-m3-broadcast` | [addr] | 3.2, beat 4 | playable | network with every host bit set to 1 is the broadcast; hosts lie between |
| `net-m3-wide-mask` | [addr] | 3.2, beat 5 | playable | 192.168.1.23/23 covers 192.168.0.0 to 192.168.1.255, so 192.168.0.40 is local |
| `net-m3-mask-drill` | [addr] | 3.2, beat 7 | playable | generated questions on network, broadcast and same-subnet, no calculator |
| `net-m3-scene-need-mac` | the scene renderer | 3.3, beat 1 | watch only | your laptop has 192.168.1.40 in mind; the Wi-Fi delivers by hardware address, which it does not have |
| `net-m3-arp-exchange` | [netlab] | 3.3, beat 2 | playable | the ARP request goes to every device, only the owner replies, then the data frame is sent |
| `net-m3-arp-table` | [netlab] | 3.3, beat 3 | playable | the ARP table after the reply, as arp -a or ip neigh would print it |
| `net-m3-switch-learning` | [netlab] | 3.3, beat 4 | playable | a frame arrives on port 2 from MAC X, so the switch records X on port 2; an unknown MAC is sent to every port |
| `net-m3-arp-no-owner` | [netlab] | 3.3, beat 5 | playable | an ARP request for 192.168.1.99 goes out and nothing answers, as in the challenge 1 negative control |
| `net-m3-scene-flat-school` | the scene renderer | 3.4, beat 1 | watch only | staff laptops, the exam server and guest phones on one network; one infected phone reaches the exam server |
| `net-m3-flat-broadcast` | [netlab] | 3.4, beat 2 | playable | one staff laptop sends a broadcast and 599 others hear it |
| `net-m3-split-broadcast` | [netlab] | 3.4, beat 3 | playable | the same devices on three switches joined by a router box; the broadcast stays on its own switch |
| `net-m3-split-filter` | [netlab] | 3.4, beat 4 | playable | without a rule the groups still reach each other; one labelled rule at the router drops guest to exam server |
| `net-m3-split-size` | [addr] | 3.5, beat 2 | playable | 100 devices need a /25 (126 usable), 50 a /26 (62), 20 a /27 (30) |
| `net-m3-split-place` | [addr] | 3.5, beat 3 | playable | 192.168.10.0/25 takes .0 to .127; the free space is the other half |
| `net-m3-split-boundary` | [addr] | 3.5, beat 4 | playable | a /26 may start only at .0, .64, .128 or .192; one at .100 is refused with the reason |
| `net-m3-split-drill` | [addr] | 3.5, beat 5 | playable | generated questions on sizes and starts, no calculator |
| `net-m3-overlap-line` | [addr] | 3.6, beat 2 | playable | each block as a range on one line, 172.17.0.0/16 from 2,886,795,264 to 2,886,860,799 |
| `net-m3-overlap-nest` | [addr] | 3.6, beat 3 | playable | two valid CIDR blocks either contain one another or share nothing; overlaps highlight |
| `net-m3-scene-late-overlap` | the scene renderer | 3.6, beat 4 | watch only | two networks work alone, then must talk over a VPN and the same range exists on both sides |
| `net-m3-replay-wrong-mask` | replay | 3.9 (phone-only section) | replay | predict each command's output, then see the recorded result from the reference run |
| `net-lab-plan-school` | netlab (graded lab) | 3.10 | lab | plan mode, graded: fit three labs, staff, guest and printers into one /22 |

Inline diagram beats (MermaidDiagram, VisualDiagram, TraceRequest; no registration): 3.1 beat 1 `mmd-3-1-two-masks`; 3.1 beat 2 `net-m3-mask-annotated`; 3.2 beat 1 `mmd-3-2-local-or-not`; 3.2 beat 6 `mmd-3-2-edges`; 3.4 beat 5 `mmd-3-4-one-block`; 3.5 beat 1 `mmd-3-5-halving`; 3.6 beat 1 `mmd-3-6-nested`; 3.6 beat 5 `mmd-3-6-peering`.

Stated limits and fallbacks by chapter:

- 3.2: limit: IPv4, contiguous masks only. Fallback if not built: static worked bit table; drills become quiz questions (decision 3).
- 3.3: limit: One segment; no ARP ageing shown. Fallback if not built: scripted [sequence] of four actors (laptop, switch, friend, third host) with a Predict before the key beat only, within the chapter's budget of 3 assessments; the playable beats become quiz questions. Needs netlab slice 1.
- 3.4: limit: The router is a box that joins networks; no routing tables yet. Fallback if not built: scripted [sequence] fallback plus a ComparePanel. Needs netlab slice 1.
- 3.5: limit: Largest-first host counts; no VLSM tooling beyond this. Fallback if not built: static table of the 100, 50, 20 example; drills become quiz questions.
- 3.6: limit: IPv4 ranges on one line; no routing consequence modelled. Fallback if not built: static number line plus quiz.
- Replays and labs: a replay falls back to a `[sequence]` of two actors (learner, lab) with Predict blocks before the key steps only, within the chapter's budget of 3 assessments; a graded lab that is blocked falls back to a diagnosis from recorded command output, graded as a quiz (roadmap).

The netlab chapters (3.3, 3.4, 3.10) need slice 1 before they are written (decision 2). The `[addr]` library is the 2.5, 3.7 and 3.8 reference solution (roadmap). Where a fallback has no playable beat, the exception is recorded and the beat becomes a quiz question.

## Gate

Gate 3.12 (15 minutes, review within three days, learners carry on). Evidence: the 3.10 plan defended against a fourth lab.
- Checklist: I can find network, broadcast and host range of any `/n` by hand; I passed 3.7 and 3.8; my 3.10 plan has no overlap and a stated growth margin; I can say what my computer does when a destination is not on its network; I committed challenge 1 part 2.
- LearningLog: which step of subnet arithmetic you still check twice; what the three sentences in 3.10 said about your biggest block.
- OPEN_QUESTION: "A fourth computer lab of 40 devices arrives. Show where it goes in your plan, what changes, and what you would do if no space were free." `submissionMode: text`, `allowSpeechInput: true`, link-only needs `minWords: 0`.
- ChapterRecap: the mask decides local or not; network and broadcast come from AND and OR; ARP finds neighbours; blocks are cut on their own boundary; overlaps are found late; two computers can disagree about local.

## Risks

- Likeliest stalls: 3.2 (AND with a non-octet mask such as `/20`; the 1.4 "first three numbers" shortcut breaks); 3.5 (alignment); 3.7 (signed numbers and the `/0` shift). Mitigation: all three start from a worked `/20` or `/23` and a PREDICT; the drills are unassisted so the weak step shows; the 3.7 PREDICT on the sign of an unsigned address, the Callout on `1 << 32`, and the helper unlock. This is week 1's heaviest stretch (11.8 hours for modules 1 to 3): watch for fatigue at 3.7 and 3.8.
- Platform: 3.3, 3.4 and 3.10 need netlab slice 1; if late, 3.3 and 3.4 switch to scripted `[sequence]` step-throughs with predictions before the key steps only, and 3.10 is blocked.
- Accuracy traps from the dossier: contiguous masks only [S7]; broadcast is derived, not cited; ARP ageing is left to the implementer [S22] (give no number); `/31` is sourced [S70] and `/32` as one address is derived; Docker's `172.17.0.0/16` is observed on the test machine, not stated in the docs [S46], so word it as an observation; do not promise "Destination Host Unreachable" (not seen, dossier 5.7); `ip route get` error text and any macOS output are untested; peering rule is AWS-specific [S47].
- Text budget: 3.1 is a Read chapter of two beats and 3.12 is a Gate with a 700-word floor (sponsor decision, G2C, 2026-10-26); keep tasks to the single command in 3.1 and the one answer in 3.12.

## Resolved in roadmap v3.1

1. `/31` had no source: resolved. `/31` is sourced [S70] (two addresses, point to point, no directed broadcast).
2. Switch MAC learning had no source: resolved. It is sourced [S76].
3. The Docker `172.17.0.0/16` hook: resolved. Worded as "on the test machine Docker used ...; check yours with `docker network inspect bridge`" (observed in dossier 5.5).
4. Word floors for 3.1, the Code chapters and the Lab: resolved by the proposed course exception. Read, Code and Lab chapters and Gates use 700 prose words; Learn and Build use 1,200 (decision log, 2026-10-25; decided by the sponsor at G2C on 2026-10-26 and, for Learn and Read chapters, superseded by the beats rules of agent-ip v0.5.3).

## Still open

- 3.10 names no place for the "three sentences" and the roadmap has no fallback that keeps plan mode graded. This brief puts the sentences in a LearningLog and offers an ungraded stand-in; the 3.10 and 3.12 numbers are proposals.
- Verify at G3 (untested): the `ip route get` error text for 3.9; whether `phone` sends an ARP reply in 3.9; the macOS hex mask output in 3.1.
- Prose floors are decided (sponsor, G2C, 2026-10-26): Build 1,200 prose words; Code, Lab and Gate 700; Learn and Read follow the beats rules (agent-ip v0.5.3, decision log 2026-10-26); Check chapters are quiz-only.
