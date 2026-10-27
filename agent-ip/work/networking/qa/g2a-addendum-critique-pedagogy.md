---
artifact: critique
course: networking
artifact_under_review: agent-ip/work/networking/02b-roadmap-addendum-modules-10-12.md
lens: pedagogy (instructor)
gate: G2A (addendum)
blocking_defects: 1
recommendation: pass with changes
---

# G2A critique, pedagogy lens: roadmap addendum, modules 10 to 12

## Verdict

**Pass with changes.** Re-run this critique after the fixes; do not send to G2B before the blocker and the majors on evidence and sizing are closed.

The addendum answers all three sponsor requests, keeps the course's best habits (problem-first openers from the learner's own trace, a tested lab, negative tests, a fixed `networking-challenges` layout) and reuses existing pieces. The openers for modules 10, 11 and 12 are real questions. Module 10 builds on what came before, and the "who owns hop 7?" hook is the right one. The VPN opener (a private server at `10.20.0.5`) is a developer's real problem.

It is not yet safe to approve. One graded code exercise needs an idea no chapter teaches. Challenge 9, the evidence for O10, cannot be checked by its own tests as written. Two 90-minute Builds are first-time uses of BIRD and WireGuard with no stated support level. The hours do not add up, and the 4 to 5 week claim is wrong for the slow path. Module 12 is currently six man-page chapters followed by one challenge, not a practical module. Phone-only learners cannot reach O8 to O10 evidence and the addendum does not say what they get.

Totals: 1 blocker, 11 major, 5 minor.

## Findings

**1. Blocker. 10.3, 10.4, 10.6, Out of scope.** Problem: 10.6 asks for `bestRoute` with "highest local preference (the network's own policy)" as the second rule. No chapter teaches local preference. 10.3 claims "why policy comes before the shortest path" but customer, provider and peer links (the only concrete policy) arrive in 10.4. Out of scope says "local preference beyond one mention", which contradicts the graded exercise. A learner cannot pass 10.6 from what was taught, and 10.3 carries five ideas (announcement, path, withdrawal, loop rejection, policy) in 35 minutes. Fix: move "policy first" out of 10.3 into 10.4 and teach one concrete policy there: "prefer a route learned from a customer over a peer over a provider", with a Predict. 10.3 keeps announcement, AS path, loop rejection and withdrawal. Rewrite the Out of scope line and 10.6 to say "route preference by link type", and give the exercise a reference-helper unlock after three failures, as every Code chapter in v3.1 has.

**2. Major. 10.7, 11.5, challenges 7 and 8.** Problem: both Builds are 90 minutes (v3.1 caps Build at 75 and says split anything longer into checkpointed parts), and both are the learner's first BIRD config and first WireGuard keys. 11.5 also needs two NAT routers, a forwarded UDP port, key generation, two configs and two captures. The addendum gives no support level (guided, gapped, open) and no slow-path minutes. Fix: split 10.7 and 11.5 into two Builds of 45 to 60 minutes with a mid-point check each. State support: challenge 7 part 1 guided (every BIRD line explained), later parts gapped; challenge 8 starts from `toolkit/restore.sh 4.2` so the NAT is not rebuilt, then guided, then gapped. Add slow-path minutes per Build.

**3. Major. Totals, Hours.** Problem: Module 11 rows add to 260 minutes, not 245 (4.3 h, not 4.1). The text "stays about 4 to 5 weeks ... adds about a week" is wrong. Core is about 56 h (4.7 weeks at 12 h); slow path is about 73 h (3,249 plus about 1.3 times 855 minutes), about 6 weeks. v3.1 already had the 3 to 4 week budget at its limit. The six 25-minute tool chapters each include a download or install, commands, a trap and a committed result with a test, which v3.1 sizes at 45 to 75 for Build. Fix: correct the sum, publish core and slow totals, and set tool chapters to 35 minutes (module 12 about 5.4 h) until the pilot in decision 12 says otherwise. Name the budget exception in the decision table, or make Part 2 optional (finding 4).

**4. Major. Placement, completion, phone-only.** Problem: modules 10 to 12 sit after the capstone and IPv6, so most learners feel finished at 8.7 and then face 14 to 18 more hours. The addendum never says if Part 2 is required for completion. Foundations (decision 8) is not extended: gate 10.10 needs a real trace, 11.8 a challenge 8 capture, 12.11 fault evidence and a cheat sheet from real runs, 12.2 needs a desktop. The phone note names only 10.1, 10.5 and 12.5, and "terminal replay" cannot show Wireshark. Fix: state that Part 2 is credited separately (a Part 2 badge, not a condition for the course certificate), and list what Foundations earns: O8 yes (quizzes, code or reference-solution questions, replay of challenge 7), O9 partly (quiz, replay), O10 not at all. Give every Part 2 gate a phone branch: a supplied real trace and sample capture, with questions about them. Say module 12 needs only modules 1 to 7 (12.4 `mtr -z` links to module 10 but does not need it), so Part 2 modules can be taken in any order.

**5. Major. Challenge 9, O10 evidence.** Problem: the addendum says each part's "results file holds real output the test checks". Part 1 (Wireshark) runs on the host and `tshark` is not in the image, so a display filter cannot be tested. Parts 3 and 4 also run "on their home network", where output cannot be checked. Part 7's test must check three faults "named with evidence", which free text cannot prove. Nothing says the three faults need three different tools, so "choose the right tool" is not measured. Fix: part 1's results file lists values the test recomputes from a per-learner seeded capture with `tcpdump -r` (source port of the first SYN, TTL of packet 5, count of packets to one host), plus a screenshot for the mentor. Part 7: structured `faults.md` (fault id, command, pasted output line); the test matches the line against the seeded fault's signature. Design the three faults so each is best found by a different tool (loss on one hop: mtr; wrong DNS answer: dig; closed or filtered port: nmap or ss; throttled link: iperf3) and show the matrix in the README. Home-network runs stay ungraded and optional.

**6. Major. 12.1 to 12.9 shape; sponsor hooks.** Problem: the module template is "question, install, three commands, how to read, one trap", which is a man page per chapter. 12.3, 12.5, 12.6 and 12.7 have no problem-first at all (Tool chapters behave like Learn). 12.1 asks the learner to match six questions to six tools before meeting any tool. The payoff (12.8) arrives after about 3 hours of isolated tools. 12.9 (a Read that writes a cheat sheet) is a gate task, not a chapter. Fix: open 12.1 with the broken network from 12.8 (one symptom, "slow"), a 10-minute attempt with only `ping` and the trace, and the learner's best guess; each tool chapter then starts from a real symptom and ends by clearing one planted fault, so 12.8 becomes the final mixed round. Suggested hooks: dig, "the site loads on your phone data but not on campus Wi-Fi, same name"; nmap, "your teammate says the port is open and your app cannot connect"; iperf3, "the speed test says 100 Mbps, the file copy crawls"; tcpdump, "a 10-minute capture holds 80,000 packets, you need the DNS ones". Merge 12.9 into 12.11 and the matching task into 12.10.

**7. Major. Module 12 coverage; "own machine and own repository".** Problem: almost all tool runs are in the lab, and only Wireshark, mtr and dig touch the learner's machine. The sponsor wants tools run on their own machine against their own work. A web developer's most-used network tool, `curl -v` with `-w` timing (DNS, connect, TLS, first byte), is missing, and so is the browser's Network tab. Wireshark is also placed at hour 50 although tcpdump walls of text begin at 1.4 and v3.1 had it as stretch S1 after 5.6; the pointer from 1.5 sends beginners 11 modules ahead. Fix: add a 25-minute curl chapter (time breakdown for the learner's own deployed app or a public page, tied to 5.4, 7.3), offset by the merges in finding 6. Split Wireshark: a 20-minute "open your 1.4 capture" card unlocked after 1.5 (install size stated first), with filters and Follow TCP Stream staying in 12.2. Remove the old S1 and S2 stretches, or mark them replaced.

**8. Major. 11.2, 11.3.** Problem: 11.2 relies on "the existing packet canvas", but `[packet]` is accepted and unbuilt, and its `wrap` mode covers TCP, IP and Ethernet, not IP inside UDP inside IP. "Fewer bytes per packet" is MTU, which is stretch S3, not core. 11.3 packs key pairs, peers, the handshake and AllowedIPs (route out and filter in) into 30 minutes, and no chapter teaches public and private keys. Fix: state the new `wrap` nesting mode, or drop to an annotated capture of the tunnel with a Predict (the capture from challenge 8 is the real thing). Teach MTU in two sentences with the numbers, or drop the size prediction. Add a 5-minute key-pair box to 11.3 ("what can someone do with your public key?") and move the handshake detail to a "later" note. Give `peer` a plain definition at first use: it also means a BGP neighbour in 10.4, and the clash will confuse second-language readers.

**9. Major. 11.4, 11.6, challenge 8.** Problem: 11.4 is a third longest-prefix-match exercise (4.6, 10.6, 11.4), so it adds little for its 35 minutes. The sponsor's key question, "does a VPN make me safe?", is answered in 11.6 by reading and an ungraded fill-in, and the lab proves nothing about it (DNS leak, full versus split tunnel, who sees what). Fix: cut 11.4; test `acceptFrom` in the lab instead (challenge 8 part 2: an inner packet from a source not in AllowedIPs is dropped). Add challenge 8 part 4 (45 minutes): change AllowedIPs to a full tunnel and show on both captures that the website sees the office address, not the café address (the 1.1 question returns: "which address does a website see?"), then split tunnel and show the DNS query still leaving in the clear. Make the DNS leak a graded quiz item in 11.7.

**10. Major. 10.8.** Problem: one 30-minute Learn holds YouTube 2008, Verizon 2019, Facebook 2021, RPKI (what it checks, why it stops one and not the other) and a lab run (part 4). Facebook 2021 is already the hook of 7.4, so it is not a new puzzle here. Challenge 7 part 4 is hidden in a Learn row, so the Build minutes are undercounted. Fix: 10.8 teaches hijack and leak with two incidents (YouTube 2008, Verizon 2019) and RPKI in one short box; the Facebook outage becomes a 5-minute callback ("in 7.4 the DNS servers vanished; here is why: their routes were withdrawn"). Move part 4 into a 40-minute Build row. Retitle in plain words ("When routes go wrong: hijacks, leaks and an outage you saw in module 7").

**11. Major. Play column, "no new interactive components".** Problem: 10.2 "sort ten real and fake AS numbers" is not an `[addr: classify]` mode (it sorts IPs and is unbuilt); 10.4 "predict the path in three small maps", 11.3 "which peer gets five packets" and 11.6 "who sees what" are not any renderer in v3.1. Learn chapters without a manipulation are a platform defect. Fix: for each, name the existing block (Predict, ordered quiz, `[sequence]` with a Predict before each step) and write the fallback in one line. Declare in decision 19 that these are authoring patterns of existing blocks, not new canvases.

**12. Major. 12.6, decision 17.** Problem: "Scan only the lab and, optionally, their own router." Many learners are in hostels, on campus Wi-Fi or on ISP-managed routers; to them the router is not theirs, and the research notes ISP complaints and account termination as the common result [S133]. Fix: graded part is lab only. Optional line: "your own home router, only if you administer it; never campus, hostel or café Wi-Fi". Put the rule in the 12.6 hook (a consent sentence the learner types into `results.md` before the scan).

**13. Minor. 10.1, 10.10.** Problem: many learners (mobile hotspot, carrier-grade NAT) have a trace of `* * *` or private hops after hop 2; `whois` is not on Windows; a hop's address often belongs to the neighbour network or an exchange, so "hop owner is this AS" is only a guess (research note). The gate asks to "name the link type ... where public data shows it", which the listed free sources rarely show (PeeringDB shows shared exchanges, not paid relationships). 20 minutes is short for a dozen lookups. Fix: provide a dated sample trace with real addresses and their lookups for fallback (the 4.1 sample uses documentation addresses, which return nothing); use RIPEstat or bgp.tools in the browser; teach the neighbour-address caveat in 10.1; change the gate to "say if PeeringDB shows two of the networks at the same exchange"; set the gate to 30 minutes. Open 10.1 with the address from 1.1: "which network is the website seeing you from?"

**14. Minor. O8, O9.** Problem: O8 holds four verbs and the "explain a real outage" clause rests on one quiz question; O9 lists code exercise 11.4, which does not test building a VPN. Fix: write O8 as two outcomes (look up and explain; choose a route), or map each clause to one named item; add a short written or voice question on one incident to gate 10.10; drop 11.4 from O9 (finding 9) and cite challenge 8 part 4.

**15. Minor. Checks 10.9, 11.7, 12.10.** Problem: each lists five module questions only. v3.1 says every Check mixes in earlier modules. Fix: two of the five come from earlier modules (longest prefix match from 4.3 in 10.9, NAT from 6.2 in 11.7, DNS TTL from 7.4 in 12.10).

**16. Minor. Language.** Problem: "announce", "withdraw", "leak", "hijack", "transit", "peer" are everyday words used in unusual senses; "the day a giant vanished" and "Who pays whom" lean on idiom. Fix: a one-sentence plain definition at first use of each term, a short glossary in 10.2, and plain titles.

**17. Minor. Cross-references.** Problem: the pointer "1.5 and 5.6 (where the learner first captures)" is wrong: the first capture is 1.4, with 1.5 reading it. 11.1 is a Read with no command on the learner's machine, unlike every other opener. 10.2 does not start from 4.5, where the AS was first named. The new "Tool" type is not defined in the chapter-types table. Fix: correct to 1.4, 1.5 and 5.6; make 11.1 a look at their own VPN, WSL and Docker adapters and address ranges (`ipconfig`, `ip addr`), linking to the overlap problem of 3.6; start 10.2 with "in 4.5 you met one"; add a Tool row (a challenge 9 part, 35 minutes, a symptom, a tool, a committed result).

## Answers to the review questions

- **Problem-first hooks:** strong in 10.1, 10.3, 10.4, 11.x opener, 11.6, 12.2, 12.4; missing in 12.3, 12.5, 12.6, 12.7 (finding 6); one repeated (Facebook, finding 10).
- **Dependencies:** a gap in 10.6 (blocker), key pairs and MTU in 11.2 and 11.3, 12.1 before tools. Everything else only needs what came before.
- **Chapter sizing:** modules 10 and 11 are the right size once 10.7, 10.8, 11.5 are split; 10.3, 11.3 and 10.8 carry too much.
- **O8 to O10 measurable:** O8 and O9 mostly yes after findings 1, 9 and 14; O10 only after finding 5.
- **Gates:** doable once the phone branches (4) and trace fallbacks (13) exist; 10.10 and 12.11 time estimates are low.
- **Cut or merge:** 11.4, 12.9, 12.1 (into the opener), and the old S1 and S2 stretches. Keep 10.5 (cables and exchanges answer the sponsor's "where do networks meet").
- **Missing:** curl timing, Wireshark early, a graded VPN "what it does not hide" item, the phone and Foundations path.

## Round 2

Reviewed: addendum v0.2 against the 17 round 1 findings, plus anything the rewrite introduced. Minutes recomputed from the tables: module 10 is 400, module 11 is 300, module 12 is 310, Part 2 is 1,010 (about 17 h), course 3,520 (about 59 h). All three sum correctly.

### Verdict

**Pass with changes.** No blocker remains. Two majors are new or only partly closed, both in module 12 (an unreachable "take Wireshark early" path, and O10's "choose the tool" not measured). Close those and the addendum is ready for G2B.

### Round 1 findings

1. **Closed.** Local preference is taught in 10.4 as a per-neighbour setting and 10.6 takes a `policy` argument; Out of scope now agrees. The "prefer customer over peer over provider" order still lacks a source, so keep it flagged.
2. **Partly closed.** Builds are now 40 to 60 minutes with a support level each. 11.5 (keys, tunnel, two routes, two captures, spoof test) is still a dense 60 minutes for a first WireGuard; see R2-6.
3. **Closed.** Sums correct, slow path stated (about 22 h for Part 2), decision 21 accepts about 59 core hours, Tool type defined at 35 minutes.
4. **Closed.** Part 2 is a separate badge (decision 20), Foundations is listed per outcome, every gate has a phone branch. One claim is wrong: see R2-5.
5. **Partly closed.** Parts 1 and 2 recompute from a seeded capture; faults 1 to 4 are matched to an output line. But the tool is announced by the chapter, so "choose" is still untested: see R2-2.
6. **Closed.** Struggle-first 12.1, a symptom hook in every Tool chapter, one fault per tool, 12.9 and the cheat sheet merged into the gate.
7. **Partly closed.** curl (12.8) added and old stretch items replaced. The "take Wireshark any time after 1.5" path conflicts with challenge 9: see R2-1.
8. **Mostly closed.** 11.2 uses an annotated capture, key pair and peer are defined, MTU is two sentences. 11.3 still holds key pair, peer, AllowedIPs both ways, longest match and the route `wg-quick` adds in 35 minutes; move the routing-table note to 11.5.
9. **Closed.** 11.4 code cut; spoofed-source drop and part 4 (full and split tunnel, DNS in the clear) are in the lab; quiz 11.8 covers split tunnel.
10. **Closed.** 10.9 (Learn) and 10.10 (Build) split; Facebook is a callback to 7.4; plain title.
11. **Closed.** Every Play names an existing block, decision 19 says so. Confirm Mermaid diagrams are supported in course markdown (10.4).
12. **Closed.** Lab-only graded scans, consent line typed first, home router only if administered.
13. **Closed.** Dated sample trace, host-command table, neighbour-address caveat in 10.1, PeeringDB wording, gate 30 minutes.
14. **Closed.** O8 split into O8a and O8b, O9 now cites challenge 8 parts 1 to 4, each clause maps to an item.
15. **Closed.** 10.11, 11.8 and 12.9 each carry one question from 4.3, 6.2 and 7.4.
16. **Closed.** Glossary in 10.2, "peer" disambiguated in 11.3, plain titles.
17. **Mostly closed.** Cross-references fixed (1.4, 1.5, 5.6), 11.1 runs on their machine, 10.2 starts from 4.5. One new error: see R2-4.

### New findings

**R2-1. Major. 12.2, 12.1, 1.4/1.5/5.6 pointers.** Problem: the addendum says 12.2 can be taken after 1.5 and adds "take it now" lines to 1.4, 1.5 and 5.6. But 12.2 is challenge 9 part 1, whose test recomputes answers from a capture seeded by the challenge 9 setup in 12.1, and 12.1 needs the fault script and modules up to 7. A learner at hour 3 cannot pass that test and is pointed at a chapter that does not stand alone. Fix: make the early path an ungraded 20-minute "open your own 1.4 capture in Wireshark" card (install size stated, no test), and keep the graded 12.2 in module 12 after 12.1. Say which one the pointers link to.

**R2-2. Major. 12.2 to 12.7, gate 12.10, O10.** Problem: the verb is "choose the right tool", but each chapter names its tool and the README shows the fault-to-tool matrix after 12.1. The learner is told the tool every time; only quiz 12.9 (matching) measures choice, which is recognition. Fix: add a short blind round to gate 12.10: a second seeded network with two new faults, no matrix, learner picks the tool and logs it in `faults.md`, test matches as before (about 25 extra minutes, which the 30-minute gate needs anyway). Phone branch: supplied outputs with the symptom, pick the tool.

**R2-3. Minor. 11.6, 11.7.** Problem: the "what a VPN hides" Learn comes before the build that shows it. The sponsor's style is build and see, and 10.9 and 10.10 already use the reverse order for the same reason. Fix: swap them, so the learner runs full and split tunnel first and 11.6 explains what they captured; keep the "who sees what" Predicts.

**R2-4. Minor. Placement, changes to existing chapters.** Problem: "S1 and S2 are replaced by 12.2 and 12.3". S2 was the WireGuard stretch, which module 11 replaces; 12.3 is tcpdump. Fix: S1 replaced by 12.2, S2 by 11.4 and 11.5.

**R2-5. Minor. Completion, Foundations O10.** Problem: it says curl timing "is also in the browser's Network tab" so phone learners can do 12.8. Phone browsers have no Network tab, and 12.8's test is only a results file with timing fields, which any text could fill. Fix: the phone branch for 12.8 is a supplied `curl -w` output with three questions about it; give 12.8 a check the test can run (for example, name the slowest phase from a seeded slow-DNS endpoint). Also 12.1 is typed Read but runs the fault script; call it Build or Tool.

**R2-6. Minor. 11.5, slow path.** Problem: the slow path is a flat 1.3 times core, while v3.1's Builds run about 1.45 times. 11.5 and 10.7 are the first-time BIRD and WireGuard sessions. Fix: state slow-path minutes for 10.7, 10.8, 11.4, 11.5 (suggest 85, 70, 70, 90) and total Part 2 slow at about 23 hours.
