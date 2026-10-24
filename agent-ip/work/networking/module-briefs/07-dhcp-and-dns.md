---
artifact: module-brief
course: networking
module: 07-dhcp-and-dns
version: 1
owner: curriculum-architect
roadmap_version: 3
roadmap_confirmed: true
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
| 7.7 | DHCP and DNS | Check | 15 | Order the steps from joining Wi-Fi to the first byte; diagnose three outputs; two questions from module 6 | dhcp, dns-ttl, layered-diagnosis | none (reinforces napt) | quiz |
| 7.8 | A "no internet" runbook | Gate | 25 | A runbook for your family's Wi-Fi, one command per layer, with the commands for their own devices | layered-diagnosis | none (reinforces dhcp, dns-resolution) | runbook |

Total 270 core minutes. Slow path 340 (7.6 is 100 minutes on the slow path; the others add a quarter).

The roadmap's "Problem first" column is filled only for Learn chapters. For 7.1, 7.5 and 7.6 the hook below is derived from the module's opening question and purpose; it adds no new claim.

### 7.1 Connected, no internet (Read, 10 min) `07.01-connected-no-internet.md`
- Hook (derived): the opening question, shown as a phone screen: Wi-Fi says Connected, the page says No internet.
- Claim: "Connected" only means the radio link works. A web page needs five more things in a fixed order (an address, a gateway that answers, a route out, a name that resolves, a server that replies), and a network can fail at any one of them. The first one that fails names the layer.
- Worked example: a fictional café network `10.5.0.0/24`. Phone `10.5.0.84`, gateway `10.5.0.1`, DNS `10.5.0.1`, target `203.0.113.45` (documentation range, decision 11). Walk the five places and say what the phone would show at each failure. Captive portal named here, taught in 7.5.
- Diagram: none. 7.5 owns the ladder diagram; drawing it twice would argue the same claim twice. A table of "place, what breaks, what you see" replaces it.
- Interactive: none (roadmap). Predict first: a phone has `10.5.0.84` and the status says Connected; which of three statements must be true (link is up / gateway answers / names resolve). Correct: only the link.
- Assessment: one PREDICT. Near miss: reading the browser's "No internet" text as a diagnosis; it is only a failed request.

### 7.2 DHCP: how your phone got an address in a second (Learn, 35 min) `07.02-dhcp-lease.md`
- Hook (roadmap): a phone joins a café Wi-Fi it has never seen and has a working address in under a second. Who told it what to use?
- Claim: a device with no address cannot talk to anyone, so its first message is a broadcast to everyone on the link, and a server answers. The address is leased, not owned: it comes with mask, gateway and DNS server (the settings the rest of the trip needs) and a timer.
- Worked example: café `10.5.0.0/24`, pool `10.5.0.50` to `10.5.0.200`, lease 3600 s (dnsmasq's default is one hour [S64]). Messages: discover, offer `10.5.0.84`, request, acknowledge. Client port 68, server port 67 [S23]. Renew at T1 (half the lease, 1800 s), rebind at T2 (0.875, 3150 s) [S23]. Failure: Windows and macOS self-assign `169.254.x.x` [S12]; the lab's Linux client (`busybox udhcpc -n -q -t 3 -T 1`) gives up in about 3 seconds with no address (dossier 5.6).
- Diagram: MermaidDiagram state diagram of the lease (no address, requesting, bound, renewing, rebinding, expired). Claim: a lease is a timer, and failure to renew returns the device to "no address". It does not repeat the four-message canvas, which shows order rather than time.
- Interactive: `[sequence: phone, DHCP server]` for the four messages, then `[netlab: DHCP]` to shrink the pool. Predict first: the pool has three addresses and three phones hold them; what does a fourth phone get? Options: an address another phone holds / no address from this server / the oldest lease's address. Correct: no address from this server.
- Assessment: one PREDICT, one QUIZ question (which item is not in a lease: the public address). Near miss: the three client behaviours differ by operating system; teach "client dependent", never "DHCP failure gives 169.254". Pool exhaustion has no incident source, so label that scenario hypothetical (dossier, section 7).

### 7.3 DNS: from a name to an address (Learn, 40 min) `07.03-dns-resolution.md`
- Hook (roadmap): no computer knows every name on the internet. How does your laptop find the address of a site it has never visited?
- Claim: nobody knows every name. Each server knows only who to ask next. Your laptop asks one resolver, and the resolver does the walking (root, then top-level, then authoritative) and remembers the answer.
- Worked example: laptop asks its resolver (`10.5.0.1`) for `shop.example.com` (stand-in name). Empty cache: three upstream questions, answer `203.0.113.45` with TTL 300, eight messages in all. Warm cache: two messages, no upstream question. Records: A `203.0.113.45`, AAAA `2001:db8::45` [S69], CNAME `www.shop.example.com` to `shop.example.com`. Then a recorded `dig +trace`, captured by the writer on the host with date shown, labelled as recorded.
- Diagram: MermaidDiagram of the delegation tree (root, `.com`, `example.com`). Claim: each level knows only who is below it. The sequence canvas shows order; the tree shows who knows whom.
- Interactive: `[sequence: resolver, root, TLD, authoritative]`, empty cache then warm; the laptop's question is the first step's caption. Predict first: with an empty cache, how many servers does the resolver contact before it has the address? Options 1 / 3 / 4. Correct: 3.
- Assessment: one PREDICT, one QUIZ question (what a CNAME is). Near miss: `dig +trace` makes the tool walk the tree itself, which a laptop never does; and `dig +trace` does not work in the lab (dossier 5.6), so the trace is recorded text, never a lab command. InterestingRead: Cloudflare 1.1.1.1, 14 July 2025 [S50], about why a resolver is one address; any minute-level figure waits for reviewer approval (dossier open question 10).

### 7.4 Caches, TTLs and DNS outages (Learn, 35 min) `07.04-dns-ttl-and-outages.md`
- Hook (roadmap, with a wording issue, see "Roadmap issues"): on 4 October 2021 Facebook, Instagram and WhatsApp disappeared from the internet. How?
- Claim: a DNS answer is a copy with an expiry date, so changes and failures spread at the speed of TTLs; and a name is only as reachable as the route to the servers that answer for it.
- Worked example: `shop.example.com` A record, TTL 3600, changed from `203.0.113.45` to `203.0.113.46` at 10:00. A resolver that cached it at 09:58 serves the old address until 10:58; one that cached at 09:50 until 10:50. Lowering the TTL to 60 helps only if done at least one old TTL (an hour) before the change. Zero means do not cache [S24]. Outages: Facebook [S48] (maintenance command took down backbone links; its DNS servers withdrew their route announcements; the world could not find the servers; see 4.5) and AWS [S49] (a race condition left an empty DNS record for `dynamodb.us-east-1.amazonaws.com`; started late on 19 October 2025, ended 20 October). Use no minute-level times until a reviewer approves them (dossier open question 10).
- Diagram: MermaidDiagram flowchart: laptop, resolver, authoritative servers, and the route to them. Claim: a name lookup needs a route to the servers; when the announcements vanish the servers still exist but cannot be reached. The timeline canvas shows time, not dependency.
- Interactive: `[timeline]` new model: three resolvers cached at different times with TTLs 60 s, 3600 s and 86400 s; a record changes; each flips from old to new. Predict first: the worked example's resolver cached at 09:58; when can a laptop behind it still get the old address? Options 10:00 / 10:01 / 10:58. Correct: 10:58.
- Assessment: one PREDICT, one QUIZ question (which TTL counts seconds of cache life, and which counts router hops). A Callout separates DNS TTL from IP TTL (4.4). RealWorldEvent: Facebook 2021 only; AWS stays in prose so no event repeats. Near miss: "the DNS change did not work" when the change worked and a cache is holding the old answer.

### 7.5 Lab: debug "no internet" layer by layer (Lab, 40 min) `07.05-lab-no-internet.md`
- Hook (derived): six phones show the same message with six different causes. Which command splits them fastest?
- Claim: each check rules out everything before it, so the first failing check names the broken layer. Route and reachability are different questions: `ip route get` says whether a route exists; `ping` says whether packets arrive.
- Worked example: the six networks, in check order (link, address, gateway, route to a public address, DNS, HTTP): (1) link down; (2) no address, pool empty (hypothetical); (3) wrong gateway `10.5.0.10`, ARP goes unanswered (dossier 5.7: silent loss, ARP requests unanswered); (4) router has no default route, `Destination Net Unreachable` from the router (dossier 5.7); (5) DNS server unreachable, `ping 203.0.113.45` works, `dig` times out; (6) captive portal: `ip route get` shows a route, `ping` is silent, `dig` still answers, `curl` returns a login page. Scenario 6 is a model, not a dossier test.
- Diagram: MermaidDiagram flowchart of the six checks with the command at each and the output that sends you on or stops you. Claim as in the claim line.
- Interactive: `[netlab: fault, DHCP, DNS]` in fault mode, graded. Learner commits to the first command before any output appears (the lab asks it per scenario; no PREDICT fence).
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
- Questions (four, one instrument): (1) order the steps from joining Wi-Fi to the first byte (lease, ARP for the router, DNS, gateway decision, SYN); (2) three outputs, one question: `ip addr` with no address, `ip route get` returning "Network is unreachable", `dig` timing out while `ping 203.0.113.45` works; name the layer for each; (3) module 6: two devices use source port 41000, what does the server see (address rewritten, port may change only on a clash) [dossier 5.6]; (4) module 6: connection to a closed port on a router's outside address, refused or timeout (refused) [dossier 5.6].
- Diagram, interactive: none. Near miss tested: option position and length balanced; the lease question must not be answerable by the longest option.

### 7.8 A "no internet" runbook (Gate, 25 min) `07.08-gate-no-internet-runbook.md`
- Hook (derived): your family will ask you why the Wi-Fi is down. Write down what you will do, one command per layer.
- Claim: a runbook is the module's method written for someone else; each layer has a command, a good output, a bad output and what the bad output means.
- Worked example: a filled runbook for a fictional home (`192.168.1.0/24`, router `192.168.1.1`), with both a Windows and a Linux command per layer from the terminal table.
- Diagram, interactive: none. Assessment: one OPEN_QUESTION (text, labelled diagram or voice note; link-only needs `minWords: 0`).
- Near miss: a runbook that is a list of vague actions ("check the router") with no command and no expected output.

## Interactions

Prose minimums: Read, Learn and Build chapters 1,200 words; the gate 700. The architecture file names no minimum for a Lab; this brief treats 7.5 as a checkpoint (700) and writes a short framing and method section only. Check chapter 7.7 is quiz fences only.

| Chapter | Top-level components | Assessments |
|---|---|---|
| 7.1 | LearningObjectives, PREDICT, Callout | 1 PREDICT |
| 7.2 | PREDICT, canvas (sequence), MermaidDiagram, canvas (netlab), BigWordAlert (lease), QUIZ | 1 PREDICT, 1 QUIZ |
| 7.3 | PREDICT, canvas (sequence), MermaidDiagram, BigWordAlert (resolver), InterestingRead, QUIZ | 1 PREDICT, 1 QUIZ |
| 7.4 | PREDICT, canvas (timeline), MermaidDiagram, RealWorldEvent, Callout, QUIZ | 1 PREDICT, 1 QUIZ |
| 7.5 | canvas (netlab fault), MermaidDiagram, Callout | none (lab checks) |
| 7.6 | MustRead, FileTree, Steps, MermaidDiagram, PREDICT, canvas (replay) | 1 PREDICT |
| 7.7 | four quiz fences | 4 (one instrument) |
| 7.8 | Checklist, LearningLog, ChapterRecap, OPEN_QUESTION | 1 OPEN_QUESTION |

Each chapter stays at or under 6 top-level components, 25 JSX tags and 3 assessment interactions. GlossaryTerm tags (DHCP lease, resolver, TTL, captive portal, authoritative) count toward the 25. 7.2 and 7.3 sit at the 6-component limit, so add nothing without removing something. No canvas sits next to another high-effort item: 7.2 has prose between the sequence and the netlab canvas.

`LearningObjectives` in 7.1: (1) list the places "no internet" can break; (2) explain a DHCP lease and a DNS lookup, including caches and TTLs; (3) diagnose a broken network one layer at a time and run dnsmasq in your own router namespace. `ChapterRecap` in 7.8 only.

Per-module items: MustRead in 7.6 (dnsmasq manual). InterestingRead in 7.3 (Cloudflare 1.1.1.1). RealWorldEvent in 7.4 (Facebook 2021).

Diagram plan: 7.2 lease state diagram; 7.3 delegation tree; 7.4 dependency flow (name needs a route); 7.5 six-check flowchart; 7.6 topology. 7.1 and 7.7 to 7.8 have none, with the reason given in each block.

## Canvases

| Slug | Renderer | Chapter | Claim | Stated limit | Fallback if not built |
|---|---|---|---|---|---|
| `net-dhcp-four-messages` | `[sequence]` actors: phone, DHCP server | 7.2 | A device with no address can get one because the first message is a broadcast | No input; lease timers not drawn; one server, one link, no relay | Existing renderer, no fallback needed |
| `net-dhcp-pool` | `[netlab]` parts: Host, Switch, DHCP server; explore mode; slice 3 | 7.2 | The pool is finite; when it is empty a new device gets nothing | Client failure behaviour per operating system is modelled, not captured; no renewals | Scripted `[sequence]` of the same messages with a "no address available" branch and a prediction before each step (degraded, recorded as an exception) |
| `net-dns-resolution` | `[sequence]` actors: resolver, root, TLD, authoritative | 7.3 | No server knows every name; a warm cache needs no upstream question | Two scripted runs only; no input; one A record, no DNSSEC | Existing renderer, no fallback needed |
| `net-dns-ttl-spread` | `[timeline]` new model; renderer needs seconds, minutes and hours (today milliseconds only) | 7.4 | The old answer lives as long as the longest remaining TTL | Fixed model, no live DNS, no resolvers that ignore TTLs, no negative caching | Roadmap names none; see "Roadmap issues". Reuse the system design TTL canvas if it is built first |
| `net-nointernet-fault` | `[netlab]` parts: Host, Switch, Router, Home router, DHCP server, DNS, Captive portal; fault mode; slice 3 | 7.5 | The first failing check names the broken layer | Output exists only for commands the generator supports; the portal is one typical behaviour | Graded labs are blocked; diagnose from recorded command output, graded as a quiz |
| `net-replay-challenge-5` | `[replay]` | 7.6 | Predicting real recorded output is how phone readers practise the build | Recording of one reference run; no editing | A `[sequence]` of two actors (learner, lab) with a Predict block before each step (budget conflict, see "Roadmap issues") |

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

## Roadmap issues

Listed, not fixed:

1. 7.1 lists five places to break (address, gateway, route, DNS, portal); 7.5 grades six ordered checks (it adds link). This brief teaches five in 7.1 and notes that "Connected" already covers the link, then starts 7.5 with the link check.
2. 7.4 hook says the services disappeared "while their servers kept running". The dossier row for [S48] supports "the world could not find the servers", not that they were running. Writers will use the dossier wording until the roadmap is revised.
3. 7.4's new `[timeline]` model has no stated fallback (decision 3 names one only for `[addr]`). This brief proposes a worked-example table plus a Predict, as an exception to confirm.
4. 7.5 needs output for `ip link`, `ip addr` and `curl`, which the netlab generator's example command list (`ping`, `ip route`, `ip neigh`, `traceroute`, `dig`) does not name.
5. 7.7 lists one ordering question, three outputs and two module 6 questions: six if each output is its own question, one over the Check limit of five. This brief reads "three outputs" as one question.
6. The `[replay]` fallback asks for a Predict block before each step, which breaks the budget of one Predict and three assessments per chapter (affects 7.6).
7. `02-course-architecture.md` gives no prose minimum for a Lab chapter. This brief uses 700 words (checkpoint).
