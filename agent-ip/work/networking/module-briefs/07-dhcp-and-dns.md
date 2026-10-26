---
artifact: module-brief
course: networking
module: 07-dhcp-and-dns
version: 2
owner: curriculum-architect
roadmap_version: 3.1
roadmap_confirmed: true
agent_ip_version: 0.5.3
---

# Module 07: Joining a network and finding names: DHCP and DNS

Source IDs such as [S23] point to the source table in `01-research-dossier.md`. "Dossier 5.6" means that section of the dossier. Anything marked "untested, verify at G3" is not in a dossier test and must be run before a writer states it as fact.

## Outcome

The learner can explain how a device gets its address, mask, gateway and DNS server (DHCP) and how a name becomes an address (DNS, with caches and TTLs). They can predict how long an old DNS answer survives. They can diagnose "Connected, no internet" one layer at a time, choosing each command and reading its output. They have run dnsmasq in their own router namespace so that a device gets a lease and a name resolves.

Roadmap outcomes served: O6 (lab 7.5 graded diagnosis, challenge 5, capstone part 4) and O7 (challenge 5).
Opening question, unchanged: *Your phone says "Connected", the browser says "No internet". What exactly is broken, and how would you find out?*

## Why this module exists

Module 6 ended with a router that moves packets and rewrites addresses. A router like that is still unusable at home: nobody types an address, a mask, a gateway and a DNS server into a phone. DHCP and DNS are the two jobs a home router does besides routing and NAT, and they are the two most common reasons for "no internet". This module also gives the learner a method (layer by layer, one command per layer) that the capstone's fault chapter (8.5) and the "no internet" runbook (7.8) both depend on. Challenge 5 adds DHCP and DNS to the router built in challenge 4; the capstone then reuses it.

## Prerequisites

Concepts, by the identifiers in `timeline.yaml` (chapter that introduces them in brackets):

- `mac-address` (1.6), `address-kinds` (2.4), `netmask` (3.1): a lease contains an address and a mask; the learner must know a `169.254.x.x` or `192.168.x.x` address on sight.
- `default-gateway` (4.2), `diagnose-routing` (4.8), `autonomous-systems` (4.5): needed for the gateway and route checks in 7.5 and for the Facebook story in 7.4.
- `udp` (5.5): DHCP and DNS both ride on it.
- `napt` (6.2), `nft-masquerade` (6.7), `diagnose-nat` (6.9): 7.6 builds on the challenge 4 router; 7.7 reinforces `napt`.

Artifacts:

- Challenge 4 finished through part 2. Repair path: `toolkit/restore.sh 4.2` rebuilds the router, the two devices, the guest subnet, masquerade and the forward rule.
- The lab image with `busybox`, `dnsmasq-base`, `bind9-dnsutils`, `tcpdump` and `curl` (roadmap, "Build environment"). The dossier ran `dnsmasq`; confirm that `dnsmasq-base` provides the same binary and options (untested, verify at G3).
- Netlab slice 3 (DHCP, DNS, captive portal) for 7.2 and 7.5. Fallbacks are in "Canvases".
- On-your-computer commands from the roadmap's terminal table: `ipconfig /all`, `scutil --dns`, `resolvectl status`, `nslookup` or `dig`. The macOS column is unverified (dossier).

No new entry prerequisite. Chapters 7.1 to 7.5 do not need a laptop build; a phone-only learner can complete everything except 7.6 (Foundations level, decision 8).

## Chapters

| # | Chapter | Type | Min | Outcome | Requires | Introduces | Evidence |
|---|---|---|---|---|---|---|---|
| 7.1 | Connected, no internet | Read | 10 | List the places it can break: no address, wrong gateway, no route out, DNS, or a login page the network is waiting for (a captive portal) | default-gateway | none | none (read) |
| 7.2 | DHCP: how your phone got an address in a second | Learn | 35 | Explain discover, offer, request and acknowledge, what a lease contains (address, mask, gateway, DNS, lease time), and what failure looks like (Windows and macOS give themselves `169.254.x.x`; the Linux client in the lab is left with no address) | udp, mac-address, address-kinds | dhcp (reinforces netmask) | netlab check |
| 7.3 | DNS: from a name to an address | Learn | 40 | Explain resolver, root, top-level and authoritative servers; read A, AAAA and CNAME records; follow a recorded `dig +trace` | udp | dns-resolution | in-chapter quiz |
| 7.4 | Caches, TTLs and DNS outages | Learn | 35 | Predict how long an old answer survives (DNS TTL, not the IP TTL from 4.4), and explain two sourced outages: Facebook 2021 (its DNS servers withdrew their route announcements, see 4.5) and AWS October 2025 (an empty DNS record) | dns-resolution, autonomous-systems | dns-ttl | in-chapter quiz |
| 7.5 | Lab: debug "no internet" layer by layer | Lab | 40 | Diagnose six broken networks by choosing commands and reading their output, in order: link, address, gateway, a route to a public address, DNS, then a plain HTTP request. Behind a captive portal, `ping` to a public address fails while DNS often still answers; the HTTP request returning a login page is what tells it apart | dhcp, dns-resolution, diagnose-routing | layered-diagnosis (reinforces diagnose-nat) | graded lab checks |
| 7.6 | DHCP and DNS on your router | Build | 70 | Run dnsmasq on your router namespace from a config with lines to fill: devices get leases (client with a short timeout), names resolve through a per-namespace resolver file, `dig` answers | dhcp, dns-resolution, nft-masquerade | dnsmasq | challenge 5 tests |
| 7.7 | DHCP and DNS | Check | 15 | Order the steps from joining Wi-Fi to the first byte; diagnose three outputs in one question; two questions from module 6 | dhcp, dns-ttl, layered-diagnosis | none (reinforces napt) | quiz |
| 7.8 | A "no internet" runbook | Gate | 25 | A runbook for your family's Wi-Fi, one command per layer, with the commands for their own devices | layered-diagnosis | none (reinforces dhcp, dns-resolution) | runbook |

Total 270 core minutes. Slow path 340 (7.6 is 100 minutes on the slow path; the others add a quarter).

The roadmap's "Problem first" column is filled only for Learn chapters. For 7.1, 7.5 and 7.6 the hook below is derived from the module's opening question and purpose; it adds no new claim.

### 7.1 Connected, no internet (Read, 10 min) `07.01-connected-no-internet.md`
- Hook (derived): the opening question, shown as a phone screen: Wi-Fi says Connected, the page says No internet.
- Claim: "Connected" only means the radio link works. A web page needs five more things in a fixed order (an address, a gateway that answers, a route out, a name that resolves, a server that replies), and a network can fail at any one of them. The first one that fails names the layer.
- Worked example: a fictional café network `10.5.0.0/24`. Phone `10.5.0.84`, gateway `10.5.0.1`, DNS `10.5.0.1`, target `203.0.113.45` (documentation range, decision 11). Walk the five places and say what the phone would show at each failure. Captive portal named here, taught in 7.5.
- Format (agent-ip v0.5.3): `format: beats`, 2 beats (a Read chapter has one or two); at most 70 visible words per beat; depth and the worked example go in `GoDeeper` folds; the commands the chapter asks the learner to run stay as code fences; no BigWordAlert (terms use `GlossaryTerm`). The hook and claim above stay as the chapter's opening lines.
- Beats:
  1. **Connected, but the page says no internet** (fixed picture). VisualDiagram `net-m7-phone-no-internet` (annotated picture of real outputs). Shows: a phone screen: Wi-Fi Connected, browser No internet; a fictional café network 10.5.0.0/24.
  2. **Five places it can break** (fixed picture). MermaidDiagram `mmd-7-1-five-places` (inline, no registration). Shows: an address, a gateway that answers, a route out, the website's name turned into an address, a server that replies; a captive portal is named here and taught in 7.5.
- Predict (right before beat 1, "Connected, but the page says no internet"): A phone has the address 10.5.0.84 and the status says Connected. Which of these must be true: the link is up, the gateway answers, the website's name can be turned into an address? Options: only the link is up / the link is up and the gateway answers / all three. Answerable from: everyday words only: 'Connected' is the Wi-Fi radio link; 4.2 taught what a gateway is; the question does not use the word resolver.
- Assessments: one PREDICT in everyday words, no QUIZ.
- Components: GlossaryTerm (gateway, captive portal); 1 Callout; LearningObjectives; one `GoDeeper` fold per beat; about 8 of 40 JSX tags; 1 of 3 assessments.
- Near miss: Reading the browser's 'No internet' text as a diagnosis; it is only a failed request. The five-places strip lists what can break; 7.5's flowchart lists which command splits them, so the two do not argue the same claim. The chapter shows a table of 'place, what breaks, what you see' in the beat text and fold. Captive portal behaviour has no source in the dossier: say 'a typical portal'.

### 7.2 DHCP: how your phone got an address in a second (Learn, 35 min) `07.02-dhcp-lease.md`
- Hook (roadmap): a phone joins a café Wi-Fi it has never seen and has a working address in under a second. Who told it what to use?
- Claim: a device with no address cannot talk to anyone, so its first message is a broadcast to everyone on the link, and a server answers. The address is leased, not owned: it comes with mask, gateway and DNS server (the settings the rest of the trip needs) and a timer.
- Worked example: café `10.5.0.0/24`, pool `10.5.0.50` to `10.5.0.200`, lease 3600 s (dnsmasq's default is one hour [S64]). Messages: discover, offer `10.5.0.84`, request, acknowledge. Client port 68, server port 67 [S23]. Renew at T1 (half the lease, 1800 s), rebind at T2 (0.875, 3150 s) [S23]. Failure: Windows and macOS self-assign `169.254.x.x` [S12]; the lab's Linux client (`busybox udhcpc -n -q -t 3 -T 1`) gives up in about 3 seconds with no address (dossier 5.6).
- Format (agent-ip v0.5.3): `format: beats`, 6 beats; at most 70 visible words per beat, 300 to 700 visible words in all and at least 900 with the `GoDeeper` folds (the claim and worked example above are spread over the beats and their folds); one visual per beat; at least one playable beat; at most 40 JSX tags and 3 assessment interactions; no BigWordAlert (terms use `GlossaryTerm`). The hook above is the chapter's one or two opening sentences.
- Beats:
  1. **A new phone has no address** (watch only). InteractiveCanvas `net-m7-scene-no-address` (the `scene` renderer). Shows: a phone joins a café Wi-Fi it has never seen; without an address it cannot talk to anyone, so it shouts to everyone on the link.
  2. **Four messages hand out an address** (step through). InteractiveCanvas `net-m7-dhcp-four-messages` (`[sequence]`). Shows: discover, offer 10.5.0.84 from the pool, request, acknowledge; client port 68, server port 67 [S23]. Learner: step through the four messages.
  3. **A lease carries more than an address** (fixed picture). MermaidDiagram `mmd-7-2-lease-contents` (inline, no registration). Shows: address, mask, gateway, DNS server and lease time; the server hands out addresses from a pool, one per phone.
  4. **A lease is a timer** (fixed picture). MermaidDiagram `mmd-7-2-lease-timer` (inline, no registration). Shows: no address, requesting, bound, renewing at half the lease, rebinding at 0.875, expired [S23].
  5. **A small pool runs out** (playable). InteractiveCanvas `net-m7-dhcp-pool` (`[netlab]`). Shows: a pool of three addresses, three phones holding them, a fourth phone arriving. Learner: shrink the pool and add phones.
  6. **Failure looks different on each device** (fixed picture). MermaidDiagram `mmd-7-2-failure-by-os` (inline, no registration). Shows: Windows and macOS give themselves 169.254.x.x [S12]; the lab's Linux client gives up in about 3 seconds with no address.
- Predict (right before beat 5, "A small pool runs out"): The pool has three addresses and three phones hold them. What does a fourth phone get? Options: an address another phone holds / no address from this server / the oldest lease's address. Answerable from: beat 3 says the server hands out addresses from a pool, one per phone, and beat 4 says a lease lasts until its timer runs out.
- Quick check (after the last beat): (1) Which item is not in a lease: the public address (taught in beat 3).
- Components: GlossaryTerm (DHCP lease, pool, lease time); 1 Callout; one `GoDeeper` fold per beat; about 16 of 40 JSX tags; 2 of 3 assessments.
- Near miss: The three client behaviours differ by operating system; teach 'client dependent', never 'DHCP failure gives 169.254'. Pool exhaustion has no incident source, so label that scenario hypothetical (dossier, section 7). Worked numbers: café `10.5.0.0/24`, pool `10.5.0.50` to `10.5.0.200`, lease 3600 s (dnsmasq's default is one hour [S64]). Failure with the lab client (`busybox udhcpc -n -q -t 3 -T 1`) gives up in about 3 seconds (dossier 5.6).

### 7.3 DNS: from a name to an address (Learn, 40 min) `07.03-dns-resolution.md`
- Hook (roadmap): no computer knows every name on the internet. How does your laptop find the address of a site it has never visited?
- Claim: nobody knows every name. Each server knows only who to ask next. Your laptop asks one resolver, and the resolver does the walking (root, then top-level, then authoritative) and remembers the answer.
- Worked example: laptop asks its resolver (`10.5.0.1`) for `shop.example.com` (stand-in name). Empty cache: three upstream questions, answer `203.0.113.45` with TTL 300, eight messages in all. Warm cache: two messages, no upstream question. Records: A `203.0.113.45`, AAAA `2001:db8::45` [S69], CNAME `www.shop.example.com` to `shop.example.com`. Then a recorded `dig +trace`, captured by the writer on the host with date shown, labelled as recorded.
- Format (agent-ip v0.5.3): `format: beats`, 6 beats; at most 70 visible words per beat, 300 to 700 visible words in all and at least 900 with the `GoDeeper` folds (the claim and worked example above are spread over the beats and their folds); one visual per beat; at least one playable beat; at most 40 JSX tags and 3 assessment interactions; no BigWordAlert (terms use `GlossaryTerm`). The hook above is the chapter's one or two opening sentences.
- Beats:
  1. **Nobody knows every name** (fixed picture). MermaidDiagram `mmd-7-3-delegation-tree` (inline, no registration). Shows: root knows who runs .com, .com knows who runs example.com, example.com knows the address; each level knows only who is below it.
  2. **The resolver walks the tree for you** (step through). InteractiveCanvas `net-m7-dns-empty-cache` (`[sequence]`). Shows: the laptop asks its resolver for shop.example.com; with an empty cache the resolver asks root, then .com, then the authoritative server, eight messages in all. Learner: step through the empty-cache run.
  3. **The second visit needs no walk** (step through). InteractiveCanvas `net-m7-dns-warm-cache` (`[sequence]`). Shows: the same question with a warm cache: two messages, no upstream question; the answer is 203.0.113.45 with TTL 300. Learner: step through the warm-cache run.
  4. **Who knows what? Sort the answers** (playable). InteractiveCanvas `net-m7-sort-who-answers` (the `sorter` primitive). Shows: root, top-level and authoritative servers; cards such as who runs .com and the address of shop.example.com. Learner: drop each card on the server that can answer it.
  5. **A, AAAA and CNAME records** (fixed picture). VisualDiagram `net-m7-dns-records-annotated` (annotated picture of real outputs). Shows: A 203.0.113.45, AAAA 2001:db8::45 [S69], CNAME www.shop.example.com to shop.example.com.
  6. **A recorded dig +trace** (fixed picture). VisualDiagram `net-m7-dig-trace-recorded` (annotated picture of real outputs). Shows: a trace captured on the host with the date shown; dig +trace walks the tree itself, which a laptop never does.
- Predict (right before beat 2, "The resolver walks the tree for you"): The resolver's cache is empty. How many servers does it contact before it has the address? Options: 1 / 3 / 4. Answerable from: beat 1 shows three levels below the resolver (root, .com, example.com) and that each knows only who is below it.
- Quick check (after the last beat): (1) What a CNAME record is (taught in beat 5).
- Components: GlossaryTerm (resolver, authoritative server, record, TTL); 1 Callout; InterestingRead (Cloudflare 1.1.1.1, 14 July 2025 [S50], in a fold); one `GoDeeper` fold per beat; about 18 of 40 JSX tags; 2 of 3 assessments.
- Near miss: `dig +trace` makes the tool walk the tree itself, which a laptop never does; it does not work in the lab (dossier 5.6), so the trace is recorded text, never a lab command. The dossier cites only RFC 1034 [S24] for DNS: AAAA and CNAME record types and DNS port 53 need an added source (RFC 1035, RFC 3596) or a lab capture before drafting. Any minute-level incident figure waits for reviewer approval (dossier open question 10).

### 7.4 Caches, TTLs and DNS outages (Learn, 35 min) `07.04-dns-ttl-and-outages.md`
- Hook (roadmap v3.1, following [S48]): on 4 October 2021 Facebook, Instagram and WhatsApp could not be found by anyone on the internet. What went missing?
- Claim: a DNS answer is a copy with an expiry date, so changes and failures spread at the speed of TTLs; and a name is only as reachable as the route to the servers that answer for it.
- Worked example: `shop.example.com` A record, TTL 3600, changed from `203.0.113.45` to `203.0.113.46` at 10:00. A resolver that cached it at 09:58 serves the old address until 10:58; one that cached at 09:50 until 10:50. Lowering the TTL to 60 helps only if done at least one old TTL (an hour) before the change. Zero means do not cache [S24]. Outages: Facebook [S48] (maintenance command took down backbone links; its DNS servers withdrew their route announcements; the world could not find the servers; see 4.5) and AWS [S49] (a race condition left an empty DNS record for `dynamodb.us-east-1.amazonaws.com`; started late on 19 October 2025, ended 20 October). Use no minute-level times until a reviewer approves them (dossier open question 10).
- Format (agent-ip v0.5.3): `format: beats`, 6 beats; at most 70 visible words per beat, 300 to 700 visible words in all and at least 900 with the `GoDeeper` folds (the claim and worked example above are spread over the beats and their folds); one visual per beat; at least one playable beat; at most 40 JSX tags and 3 assessment interactions; no BigWordAlert (terms use `GlossaryTerm`). The hook above is the chapter's one or two opening sentences.
- Beats:
  1. **Facebook could not be found** (watch only). InteractiveCanvas `net-m7-scene-facebook-missing` (the `scene` renderer). Shows: on 4 October 2021 Facebook, Instagram and WhatsApp could not be found by anyone on the internet [S48].
  2. **A cached answer has an expiry date** (fixed picture). MermaidDiagram `mmd-7-4-ttl-copy` (inline, no registration). Shows: a resolver keeps a copy of an answer until its TTL runs out; zero means do not cache [S24].
  3. **One resolver keeps the old answer** (playable). InteractiveCanvas `net-m7-ttl-one-resolver` (`[timeline]`). Shows: shop.example.com changed from 203.0.113.45 to .46 at 10:00; a resolver that cached it at 09:58 serves the old address until 10:58. Learner: drag the time the record changes.
  4. **Short and long TTLs spread differently** (playable). InteractiveCanvas `net-m7-ttl-three-resolvers` (`[timeline]`). Shows: three resolvers with TTLs 60 s, 3600 s and 86400 s flip from old to new at different times. Learner: drag the change time and the cache times.
  5. **A name needs a route to its servers** (fixed picture). MermaidDiagram `mmd-7-4-name-needs-route` (inline, no registration). Shows: laptop, resolver, authoritative servers and the route to them: when announcements vanish the servers exist but cannot be reached.
  6. **DNS TTL counts seconds; IP TTL counts hops** (fixed picture). MermaidDiagram `mmd-7-4-two-ttls` (inline, no registration). Shows: the DNS TTL is seconds of cache life; the IP TTL from 4.4 is router hops.
- Predict (right before beat 3, "One resolver keeps the old answer"): A resolver cached shop.example.com at 09:58 with a TTL of 3600 seconds, and the record changes at 10:00. Until when can a laptop behind it still get the old address? Options: 10:00 / 10:01 / 10:58. Answerable from: beat 2 says a copy is kept until its TTL runs out; the arithmetic is 09:58 plus one hour.
- Quick check (after the last beat): (1) Which TTL counts seconds of cache life, and which counts router hops (taught in beat 6).
- Components: GlossaryTerm (DNS TTL, cache, resolver); 1 Callout; RealWorldEvent (Facebook 2021); one `GoDeeper` fold per beat; about 17 of 40 JSX tags; 2 of 3 assessments.
- Near miss: 'The DNS change did not work' when the change worked and a cache is holding the old answer. Lowering the TTL to 60 helps only if done at least one old TTL (an hour) before the change. Facebook 2021 [S48]: a maintenance command took down backbone links and its DNS servers withdrew their route announcements (see 4.5). AWS [S49] stays in prose: a race condition left an empty DNS record for `dynamodb.us-east-1.amazonaws.com`, started late on 19 October 2025, ended 20 October. Use no minute-level times until a reviewer approves (dossier open question 10).

### 7.5 Lab: debug "no internet" layer by layer (Lab, 40 min) `07.05-lab-no-internet.md`
- Hook (derived): six phones show the same message with six different causes. Which command splits them fastest?
- Claim: each check rules out everything before it, so the first failing check names the broken layer. Route and reachability are different questions: `ip route get` says whether a route exists; `ping` says whether packets arrive.
- Worked example: the six networks, in check order (link, address, gateway, route to a public address, DNS, HTTP): (1) link down; (2) no address, pool empty (hypothetical); (3) wrong gateway `10.5.0.10`, ARP goes unanswered (dossier 5.7: silent loss, ARP requests unanswered); (4) router has no default route, `Destination Net Unreachable` from the router (dossier 5.7); (5) DNS server unreachable, `ping 203.0.113.45` works, `dig` times out; (6) captive portal: `ip route get` shows a route, `ping` is silent, `dig` still answers, `curl` returns a login page. Scenario 6 is a model, not a dossier test.
- Diagram: MermaidDiagram flowchart of the six checks with the command at each and the output that sends you on or stops you. Claim as in the claim line.
- Interactive: `[netlab: fault, DHCP, DNS]` in fault mode, graded. The command-output generator covers `ip link`, `ip addr`, `ip route get`, `dig` and `curl`, so every check in the six scenarios has output (untested in the lab: verify at G3). Learner commits to the first command before any output appears (the lab asks it per scenario; no PREDICT fence).
- Assessment: the lab's graded checks, no fences. Near miss: reading a failed `ping` as "no route"; scenario 6 punishes it. The lab's limits line says the portal is one typical behaviour, not every portal.

### 7.6 DHCP and DNS on your router (Build, 70 min) `07.06-build-dhcp-dns.md`
- Hook (derived): the router from challenge 4 routes and rewrites, but every device is typed in by hand. Make it hand out addresses and names.
- Claim: one small program, in one namespace, answers two different kinds of question (who am I, and what is this name), and a client only benefits if it asks the right place: `dig @192.168.1.1` asks that server directly; `curl` uses the namespace's resolver file.
- Worked example: router `192.168.1.1`, pool `192.168.1.100` to `192.168.1.150`, lease 1 hour, name `web.test` to `203.0.113.80` (dossier 5.5 and 5.6 used the same name and address), server on port 8080. Home subnet only; the guest pool is new work in 8.4.
- Diagram: MermaidDiagram topology: router namespace holding dnsmasq on the inside interface, the two devices, the server. Claim: dnsmasq listens on the inside interface only and lives in the router's namespace.
- Interactive: `[replay]` for phone readers. Predict first: dnsmasq is stopped and a client asks for a lease with a 3 second budget; how long before it gives up and what does the interface have? Correct: about 3 seconds, no address (dossier 5.6).
- Assessment: one PREDICT; the challenge tests are the evidence. MustRead: the dnsmasq manual's `--dhcp-range`, `--no-resolv` and `--bind-interfaces` entries [S64].

#### 7.6 build details
- Challenge part: challenge 5, `challenges/challenge-5-dhcp-dns/part-1-leases-and-names/` (README.md, one script, `results.md`, test). The roadmap lists one chapter for challenge 5, so there is one part with three checkpoints: lease, name, query.
- Support level: gapped (roadmap scaffolding table). The `dnsmasq.conf` has marked gaps: the listening interface, the range (start, end, mask, lease time), the router and DNS options, the `web.test` record. Option names beyond [S64] (`dhcp-option`, record syntax) are untested, verify at G3. Start state from `toolkit/restore.sh 4.2`; end state restorable with `toolkit/restore.sh 5.1`.
- Must pass: a client in the `laptop` namespace runs `busybox udhcpc -n -q -t 3 -T 1` and gets an address in the pool (dossier 5.5, 5.6); `dig @192.168.1.1 web.test` returns `203.0.113.80` (5.5); `curl http://web.test:8080/` works through `/etc/netns/laptop/resolv.conf` (5.6).
- Must fail: with dnsmasq stopped, the client in the `phone` namespace ends with no address in about 3 seconds (dossier 5.6). Second, `dig @192.168.1.1 nosuch.test` returns no address; the status code (NXDOMAIN or REFUSED) is untested, verify at G3, and the test checks "no answer", not a code.
- Captured output to commit in `results.md`: the `udhcpc` lines, `ip addr` after the lease, a `tcpdump -n` of ports 67 and 68 on the inside interface during one lease (the filter and the four-packet result are untested, verify at G3), the `dig` answer, the `curl` result.
- Hint ladder: (1) which interface should dnsmasq listen on? (2) the test names the gap that is wrong; (3) the line's shape with a placeholder; (4) the exact line. Stuck diagnostic: `ss -ulnp` in the router namespace to see whether dnsmasq is listening (untested, verify at G3), then `tcpdump -n -i <inside> port 67 or port 68` while the client asks, then `dig @192.168.1.1 web.test`.
- Slow path: 100 minutes. Phone-only: replay, plus the recorded `results.md` of the reference run.

### 7.7 DHCP and DNS (Check, 15 min) `07.07-dhcp-and-dns-quiz.md`
- Hook: none (quiz only). Claim: none; no new content.
- Questions (four, one instrument, total at most five; plain quiz fences with no canvas): (1) order the steps from joining Wi-Fi to the first byte (lease, ARP for the router, DNS, gateway decision, SYN); (2) three outputs, one question: `ip addr` with no address, `ip route get` returning "Network is unreachable", `dig` timing out while `ping 203.0.113.45` works; name the layer for each; (3) module 6: two devices use source port 41000, what does the server see (address rewritten, port may change only on a clash) [dossier 5.6]; (4) module 6: connection to a closed port on a router's outside address, refused or timeout (refused) [dossier 5.6].
- Diagram, interactive: none. Near miss: a question answerable from option length or position. Balance both, so the ordering question cannot be solved by picking the longest option.

### 7.8 A "no internet" runbook (Gate, 25 min) `07.08-gate-no-internet-runbook.md`
- Hook (derived): your family will ask you why the Wi-Fi is down. Write down what you will do, one command per layer.
- Claim: a runbook is the module's method written for someone else; each layer has a command, a good output, a bad output and what the bad output means.
- Worked example: a filled runbook for a fictional home (`192.168.1.0/24`, router `192.168.1.1`), with both a Windows and a Linux command per layer from the terminal table.
- Diagram, interactive: none. Assessment: one OPEN_QUESTION (text, labelled diagram or voice note; link-only needs `minWords: 0`).
- Near miss: a runbook that is a list of vague actions ("check the router") with no command and no expected output.

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
| 7.1 | beats (2) | 2 beat visuals (diagrams), GoDeeper x2, GlossaryTerm x2, Callout x1, LearningObjectives | 8 | PREDICT | one or two beats, at most 70 words each |
| 7.2 | beats (6) | 6 beat visuals (3 canvas, 3 diagram), GoDeeper x6, GlossaryTerm x3, Callout x1 | 16 | PREDICT, QUIZ | at most 70 words a beat; 300 to 700, 900+ with folds |
| 7.3 | beats (6) | 6 beat visuals (3 canvas, 3 diagram), GoDeeper x6, GlossaryTerm x4, Callout x1, InterestingRead (in a fold) | 18 | PREDICT, QUIZ | at most 70 words a beat; 300 to 700, 900+ with folds |
| 7.4 | beats (6) | 6 beat visuals (3 canvas, 3 diagram), GoDeeper x6, GlossaryTerm x3, Callout x1, RealWorldEvent | 17 | PREDICT, QUIZ | at most 70 words a beat; 300 to 700, 900+ with folds |
| 7.5 | prose | InteractiveCanvas (netlab fault), MermaidDiagram, Callout | 5 | lab checks | 700 prose words |
| 7.6 | prose | MustRead, FileTree, Steps, MermaidDiagram, InteractiveCanvas (replay) | 16 | PREDICT | 1,200 prose words |
| 7.7 | prose | none | 0 | QUIZ x4 | quiz only |
| 7.8 | prose | Checklist, LearningLog, ChapterRecap, OPEN_QUESTION | 4 | OPEN_QUESTION | 700 prose words |

`LearningObjectives` in 7.1, `ChapterRecap` in 7.8 only. MustRead in 7.6 (dnsmasq manual). InterestingRead in a 7.3 fold (Cloudflare 1.1.1.1). RealWorldEvent in a 7.4 fold (Facebook 2021).

Diagram plan: Beat diagrams: the five places to break (7.1), what a lease carries, the lease timer and failure by operating system (7.2), the delegation tree (7.3), the cache copy, the name-needs-a-route dependency and the two TTLs (7.4). 7.5 keeps its six-check flowchart and 7.6 its topology. 7.1's five-places strip shows what can break; 7.5's flowchart shows which command splits them, so the two do not argue the same claim.

## Canvases

Canvas decisions (interaction designer, G3):

- The lease pool (7.2) is finite and behaves as a model, so it is a `[netlab]` DHCP beat (slice 3); the four messages use the existing `[sequence]` renderer (watch only).
- DNS resolution (7.3) uses the existing `[sequence]` renderer for the empty and warm runs and a `sorter` beat for the playable part (who knows what); the recorded `dig +trace` is a static annotated picture because `dig +trace` does not work in the lab (dossier 5.6).
- Caches and TTLs (7.4) use the new `[timeline]` model, which needs the seconds-to-hours renderer change, with a draggable change time; the system design TTL canvas is reused if it is built first. Fallback: a worked-example table plus a Predict.
- 7.5 is a graded `[netlab]` fault-mode lab (`net-lab-no-internet`); 7.6 keeps a `[replay]` in a phone-only section.

Slugs follow the registry convention `net-m<module>-<name>` (graded labs keep `net-lab-`) and are proposed: none is written into a chapter until it is built and registered. The full registry with modes and chapters is in `interaction-map.yaml`. Fallbacks are named per chapter below the table.

| Slug (proposed) | Renderer | Chapter, beat | Mode | What it shows |
|---|---|---|---|---|
| `net-m7-scene-no-address` | the scene renderer | 7.2, beat 1 | watch only | a phone joins a café Wi-Fi it has never seen; without an address it cannot talk to anyone, so it shouts to everyone on the link |
| `net-m7-dhcp-four-messages` | [sequence] | 7.2, beat 2 | step through | discover, offer 10.5.0.84 from the pool, request, acknowledge; client port 68, server port 67 [S23] |
| `net-m7-dhcp-pool` | [netlab] | 7.2, beat 5 | playable | a pool of three addresses, three phones holding them, a fourth phone arriving |
| `net-m7-dns-empty-cache` | [sequence] | 7.3, beat 2 | step through | the laptop asks its resolver for shop.example.com; with an empty cache the resolver asks root, then .com, then the authoritative server, eight messages in all |
| `net-m7-dns-warm-cache` | [sequence] | 7.3, beat 3 | step through | the same question with a warm cache: two messages, no upstream question; the answer is 203.0.113.45 with TTL 300 |
| `net-m7-sort-who-answers` | the sorter primitive | 7.3, beat 4 | playable | root, top-level and authoritative servers; cards such as who runs .com and the address of shop.example.com |
| `net-m7-scene-facebook-missing` | the scene renderer | 7.4, beat 1 | watch only | on 4 October 2021 Facebook, Instagram and WhatsApp could not be found by anyone on the internet [S48] |
| `net-m7-ttl-one-resolver` | [timeline] | 7.4, beat 3 | playable | shop.example.com changed from 203.0.113.45 to .46 at 10:00; a resolver that cached it at 09:58 serves the old address until 10:58 |
| `net-m7-ttl-three-resolvers` | [timeline] | 7.4, beat 4 | playable | three resolvers with TTLs 60 s, 3600 s and 86400 s flip from old to new at different times |
| `net-lab-no-internet` | netlab (graded lab) | 7.5 | lab | fault mode, six broken networks: link, address, gateway, route, DNS, HTTP; the learner commits to the first command before any output |
| `net-m7-replay-challenge-5` | replay | 7.6 (phone-only section) | replay | predict each command's output, then see the recorded result from the reference run |

Inline diagram beats (MermaidDiagram, VisualDiagram, TraceRequest; no registration): 7.1 beat 1 `net-m7-phone-no-internet`; 7.1 beat 2 `mmd-7-1-five-places`; 7.2 beat 3 `mmd-7-2-lease-contents`; 7.2 beat 4 `mmd-7-2-lease-timer`; 7.2 beat 6 `mmd-7-2-failure-by-os`; 7.3 beat 1 `mmd-7-3-delegation-tree`; 7.3 beat 5 `net-m7-dns-records-annotated`; 7.3 beat 6 `net-m7-dig-trace-recorded`; 7.4 beat 2 `mmd-7-4-ttl-copy`; 7.4 beat 5 `mmd-7-4-name-needs-route`; 7.4 beat 6 `mmd-7-4-two-ttls`.

Stated limits and fallbacks by chapter:

- 7.2: limit: No input on the sequence beat; lease timers not drawn on it; one server, one link, no relay. Client failure behaviour per operating system is modelled, not captured; no renewals in the pool beat. Fallback if not built: scripted [sequence] of the same messages with a 'no address available' branch and one Predict before the key beat, within the chapter's budget of 3 assessments (degraded, recorded as an exception). Needs netlab slice 3.
- 7.3: limit: Two scripted runs only; no input; one A record, no DNSSEC. Fallback if not built: none needed for the sequence beats, the renderer exists; the sorter beat has a quiz fallback.
- 7.4: limit: Fixed model, no live DNS, no resolvers that ignore TTLs, no negative caching. Fallback if not built: a worked-example table plus the Predict (roadmap v3.1); reuse the system design TTL canvas if it is built first.
- Replays and labs: a replay falls back to a `[sequence]` of two actors (learner, lab) with Predict blocks before the key steps only, within the chapter's budget of 3 assessments; a graded lab that is blocked falls back to a diagnosis from recorded command output, graded as a quiz (roadmap).

The netlab beat in 7.2 and the lab in 7.5 need slice 3 (DHCP, DNS, captive portal). No canvas sits next to another high-effort item outside a beats chapter.

## Gate

Gate 7.8, evidence: a runbook for the learner's family Wi-Fi (written, voice note or labelled diagram), plus challenge 5 committed. The evidence is that each layer has a command run on the learner's own computer, with a good output, a bad output and a meaning.

Checklist: challenge 5 test passes from a clean lab; `results.md` committed with the lease, `tcpdump` and `dig` output; the runbook covers six layers (link, address, gateway, route, DNS, HTTP); each layer has one command for the learner's own operating system; at least one command was run on the learner's real network, labelled "On your computer". LearningLog prompt: which layer did you most expect to fail and which actually failed in lab 7.5? One OPEN_QUESTION: the runbook itself. A mentor reads it within three days (decision 9); the learner carries on to module 8.

## Risks

- Likeliest stall: 7.6, at the lease. If the client prints "lease obtained" but the interface has no address, the DHCP client script did not apply it. The dossier proved a lease was granted but not how `udhcpc` applies it (untested, verify at G3). Mitigation: ship a ten-line apply script in `toolkit/`, name it in the README, and show the interface before and after.
- Learners confuse `dig @192.168.1.1 web.test` (asks that server) with `curl http://web.test` (uses the namespace resolver file). Mitigation: a gap in the config and a test for each, and a sentence in 7.6 that says which asks whom.
- Lab 7.5 scenario 6: a learner who reads a failed `ping` as "no route" never reaches HTTP. Mitigation: the lab's order separates `ip route get` from `ping`.
- Accuracy traps (dossier "Care" lines): `169.254.x.x` is client dependent, the lab's Linux client has no address [S12, dossier 5.6]. DNS TTL is seconds of cache life, IP TTL is router hops [S24, S30]. `dig +trace` does not work in the lab (dossier 5.6); use a recorded trace. The DHCP lease in the lab does not set the namespace's resolver; the per-namespace file stands in, and 7.6 says so.
- Source gaps: the dossier cites only RFC 1034 [S24] for DNS. AAAA and CNAME record types, DNS port 53 and any wire-format claim need an added source (RFC 1035, RFC 3596) or a lab capture before drafting 7.3 and the capstone fault. DHCP broadcast addresses and the `0.0.0.0` source are not in the dossier's summary of [S23]; read the RFC text or capture first.
- The Facebook and Cloudflare incidents involve route announcements (BGP), which the course does not teach; use them only to show that DNS depends on routing. AWS and Cloudflare minute-level figures need reviewer approval (dossier open question 10).
- Captive portal behaviour has no source in the dossier. Say "a typical portal" and label the lab behaviour a model.

## Resolved in roadmap v3.1

1. 7.4 hook wording: resolved. The hook is "could not be found by anyone on the internet. What went missing?", following [S48].
2. No fallback for the 7.4 `[timeline]` model: resolved. It falls back to a worked-example table plus a Predict.
3. Generator commands for 7.5: resolved. The generator covers `ip link`, `ip addr` and `curl`.
4. 7.7 over the Check limit: resolved. The three outputs are one question and the total is at most five.
5. The `[replay]` fallback breaking the assessment budget: resolved. Fallbacks predict before the key steps only, within the chapter's budget of 3 assessments.
6. No prose floor for a Lab: resolved by the proposed course exception (700 for Read, Code and Lab chapters and Gates; 1,200 for Learn and Build); decided by the sponsor at G2C on 2026-10-26 and, for Learn and Read chapters, superseded by the beats rules of agent-ip v0.5.3.

## Still open

- 7.1 lists five places to break and 7.5 grades six ordered checks (it adds link). This brief teaches five in 7.1, notes that "Connected" already covers the link, and starts 7.5 with the link check.
- Verify at G3 (untested): that `dnsmasq-base` provides the same binary and options; how `udhcpc` applies a lease; `ss -ulnp` as a stuck diagnostic; the `tcpdump` filter for ports 67 and 68; the NXDOMAIN or REFUSED status; `ip link`, `ip addr` and `curl` generator output; scenario 6 (captive portal) is a model, not a dossier test.
- Source gaps: RFC 1035 and RFC 3596 for AAAA, CNAME and port 53, and the RFC text for the DHCP broadcast addresses, are not in the dossier.
- Prose floors are decided (sponsor, G2C, 2026-10-26): Build 1,200 prose words; Code, Lab and Gate 700; Learn and Read follow the beats rules (agent-ip v0.5.3, decision log 2026-10-26); Check chapters are quiz-only.
