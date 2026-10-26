---
artifact: critique-response
course: networking
round: 1
roadmap_version: 2
---

# Response to the round 1 roadmap critiques

Each defect and where roadmap v2 answers it. "Deferred" items are recorded in the decision log with a reason.

## Pedagogy (qa/g2a-critique-pedagogy.md)

| ID | Resolution |
|---|---|
| D01 | Scaffolding table (guided, gapped, open with hints); slow-path minutes on every Build row; Build chapters over 75 minutes split (1.4 and 1.5, 6.7 and 6.8, capstone in four parts); slow-path total about 52 hours |
| D02, D21 | "Problem first" column on every Learn chapter, which is also the prediction prompt; unused renderers removed; column names fixed |
| D03 | First look at NAT in 2.4 (`[sequence]`, three steps); gate 2.7 reworded to what has been taught |
| D04 | New 1.5: two namespaces, a ping and a capture in the first sitting; 3.9 now covers only the mask mismatch |
| D05 | Ping and ICMP echo in 1.5; reading `tcpdump` in 1.5; broadcast MAC in 1.3; ARP and MAC learning moved into module 3 (3.3) before splitting (3.4) and the mask build (3.9); the VPN hook replaced |
| D06 | Real requirements in the prerequisites; WSL 2 without Docker Desktop named as a supported path (still to be run, decision 1); setup checker with five named failures; idempotent scripts and `toolkit/restore.sh` |
| D07 | Shell commands taught in 1.4; nano named; "On your computer / In the lab" labels; the two-sides puzzle no longer set at setup time |
| D08 | Host-command table per task for Windows, macOS, Linux and phone; 5.1 uses `netstat -an` or `ss -tn`; 6.4 has a no-router-access and hotspot branch |
| D09 | Gate 4.10 reworded; sample trace provided for empty traces |
| D10 | `[addr: drill]` for unassisted practice in 2.2, 2.3, 3.2, 3.5 and the checks; bit operators taught in 2.5; 3.6 split into 3.7 and 3.8; hint ladder and reference-helper unlock in the Code type |
| D11 | Isolation taught and built in 6.8; capstone split into four checkpointed parts; demo template; 8.7 raised to 60 minutes |
| D12 | Decision 8 (Foundations level and full course); decision 4 (`[replay]` for phone readers). Data weight per chapter: deferred to the blueprint, recorded |
| D13 | Decision 3 for `[addr]` and `[packet]`; fallbacks stated per slice; AS mode removed (4.5 is a Read with a diagram); parts list matched to chapters |
| D14 | 7.5 is a graded lab; 6.9 level 1 starts with a fault; outcomes table lists graded evidence only |
| D15 | Shares recounted by script; slow path published; decision 12 asks for a pilot |
| D16 | Gates accept written, voice or diagram answers; learners carry on (decision 9); 3.12 reduced to 15 minutes and builds on 3.10 |
| D17 | Every Check has an outcome line and mixes in earlier modules; the final check (8.6) comes before the demo (8.7) |
| D18 | 2.1 kept to 10 minutes; classes and CIDR merged into 2.3; 4.5 is a Read; IPv6 build moved to stretch S5. Module 4 not split: ARP moved to module 3 instead, which shortens module 4 |
| D19 | 5.3 on listening addresses; ping and capture reading in 1.5; record types in 7.3; MAC learning in 3.3; firewall stop point in Out of scope |
| D20 | Module 2 and 3 openers rewritten (2011 exhaustion; campus Wi-Fi mask); IPv6 moved after the capstone; titles in plain words |

## Technical (qa/g2a-critique-technical.md)

| ID | Resolution |
|---|---|
| T1 | Retested (dossier 5.6): address rewritten, port kept, port rewritten on a clash. 6.2, 6.6, 6.7, O5 and the probes now teach exactly that; 6.7 forces a clash so learners see it |
| T2 | 6.3 teaches the two real reasons and that NAT is not a firewall, with the test result (a route to the private range makes inbound work) |
| T3 | `[sequence]` uses rechecked against the two-to-four actor, no-input limit; three `[timeline]` uses listed as new small models; 1.3, 2.1 and 4.1 no longer use renderers that cannot express them |
| T4 | The network lab described as a platform change with its parts; three slices; degraded and blocked chapters stated |
| T5 | Host-command table; 3.3 and others name `arp -a` and `netstat`; macOS hex mask covered in 3.1; 6.4 fallback |
| T6 | `curl -4 ifconfig.me` in 1.1; the IPv6 and shared-address branches in 1.1, 1.7 and 6.11 |
| T7 | Isolation built in 6.8 and tested (dossier 5.6); capstone in four parts; 6.7 split into 6.7 and 6.8 |
| T8 | DNAT from an outside namespace, isolation, per-namespace resolver files, `conntrack`, a busybox web server: tested (dossier 5.6) and in the package list; `dig +trace` replaced by a recorded trace |
| T9 | Requirements and download note in the prerequisites; `.gitattributes` and `bash script.sh` in the template; 1.4 slow path 90 minutes. Bind-mount timing on Windows: deferred to the challenge 0 build, recorded |
| T10 | Four classes (public, private, shared, special) against the IANA list in 2.4 and the 2.5 spec; documentation-range note in 1.1 and 2.4 (decision 11) |
| T11 | CIDR and aggregation in one chapter (2.3); metric and connected routes in 4.3; broadcast MAC in 1.3; ARP before the mask build; both ping errors named in 3.9 |
| T12 | The Facebook outage moved to 7.4, after DNS; 4.5 is a Read; the AS wording must be sourced from RFC 1930 before writing (recorded) |
| T13 | 3.2 and `mask-and` use AND for the network and host bits set for the broadcast; `/31` and `/32` named |
| T14 | Parts table now has ARP and MAC tables, ICMP and a silent router, a filter part, plan mode, the command-output generator, a captive portal; IPv6 view states that neighbour discovery is not modelled |
| T15 | 7.2 states that `169.254.x.x` is client dependent; the lab client is `udhcpc` with a short timeout (tested: about 3 seconds) |
| T16 | Seeded fault script and a published fault matrix with forbidden combinations; DNS fault injected by blocking the port |
| T17 | One-line spec per code exercise |
| T18 | 6.5 gives sourced timeout examples, the relay fallback for STUN, and `conntrack` for the learner's own router |
| T19 | IPv6 build moved to stretch (marked untested); 9.2 separates invalid from non-canonical forms and uses the 64-bit interface ID wording; temporary addresses in 9.3. The `2001:db8::/32` documentation prefix must be added to the dossier with RFC 3849 before writing (recorded) |
| T20 | Module 2 opener replaced by a sourced one; 2.1 uses only the four sourced dates; 3.4 gives the sourced reasons to split; "5-tuple" replaced by "the five numbers that name one conversation"; 8.1 notes TLS and QUIC; 6.4 calls `100.64.0.0/10` one sign, not proof |
| T21 | 7.4 separates DNS TTL from IP TTL; 5.5 notes DNS over TCP; 7.1 drops the radio and adds captive portals; 7.5 tests the route before DNS; 1.3 notes Wi-Fi frames; `docker run -p` is described as port forwarding without claiming a visible rule on Docker Desktop; S2 and S5 marked untested |
