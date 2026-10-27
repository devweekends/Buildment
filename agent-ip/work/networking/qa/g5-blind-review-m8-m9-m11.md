# G5 blind review: modules 8 (capstone), 9 (IPv6) and 11 (VPNs)

Reviewer: independent, blind (no earlier critiques read). Date: 2026-10-28.
Scope: `chapters/08-capstone`, `chapters/09-ipv6`, `chapters/11-vpns`.
Checked against: dossier S1 to S82, addendum S83 to S153, `recordings/challenge-8-sessions.txt`, `recordings/replay-sessions.txt`, the challenge 6 and 8 files in `D:\nwflash\push-challenges\challenges\`, and one lab run in `networking-lab`.

Counts: S1 2, S2 4. All six fixed.

After the fixes: `audit-course.mjs` says "Needs work: 0", and `check_fences.py` says "problems: 0".

## Findings

### B1 (S1): 08.3, the server's failure to reach 192.168.1.20 is blamed on the wrong computer

- Quote: "The server cannot reach `192.168.1.20` directly, because it has no route to a private range. That ends at once with exit code 7."
- Problem: in the capstone the server has a default route through `prouter` (part 1 README, hint 4: `in_ns server ip route add default via 203.0.113.1`). The server does route the packet. `prouter` has no route to the private range and sends back ICMP Destination Net Unreachable, and that is why curl stops at once. The cited fact [D5.6] comes from an older layout where the server had no route at all.
- Evidence: lab test with a server at 203.0.113.80 (default via 203.0.113.1) and a forwarding provider router at 203.0.113.1. `ip route get 192.168.1.20` gave `via 203.0.113.1 dev vs`. curl gave `(7) Failed to connect ... after 0 ms` (22 ms in total), and ping gave `From 203.0.113.1 icmp_seq=1 Destination Net Unreachable`.
- Fix: "The server cannot reach `192.168.1.20` directly. Its default route hands the packet to `prouter`, which has no route to a private range and answers `Destination Net Unreachable`. That ends at once with exit code 7."

### B2 (S2): 08.3 contradicts break.sh and 8.5 on the forwarding and isolation pair

- Quote: "That is why the part 4 fault script can hide an isolation fault behind a forwarding fault."
- Problem: `break.sh` keeps F2 (forwarding off) and F7 (guest rule missing) apart so that one never hides the other (`F2) echo "F1 F3 F7"`, `F7) echo "F1 F2"`). 8.5 and `faults.md` say the same. The sentence in 8.3 says the opposite.
- Evidence: `challenge-6-capstone/part-4-break-and-fix/break.sh`, `conflicts_of`, and its comment "F7 hides behind F2".
- Fix: "That is why the part 4 fault script never draws a missing isolation rule together with forwarding switched off."

### B3 (S2): 8.5 says a missing guest rule is hidden by any broken way out, but break.sh can draw it with F3

- Quote: "A wrong mask on the web server and a missing guest rule are hidden when the way out is already broken, and they are never drawn together."
- Problem: a missing default route (F3) does not hide F7. Guest-to-home traffic never leaves the home router, so the part 2 guest check still fails. `break.sh` does allow F3 with F7. A learner who has found F3 could wrongly rule out F7. F1 really is hidden by F2 or F3, and F7 only by F2.
- Evidence: `break.sh` `conflicts_of`: F1 is kept apart from F2, F3 and F7. F7 is kept apart from F1 and F2 only, so F3 with F7 is allowed. Guest-to-home traffic uses only connected routes in `hrouter`, so F3 does not touch it.
- Fix: "A wrong mask on the web server is hidden when the way out is already broken, by either of those two faults. A missing guest rule is hidden when forwarding is off, because the guest cannot reach home anyway. And the wrong mask and the missing guest rule are never drawn together."

### B4 (S2): 9.5 says module 9 is the last module, and modules 10 to 12 follow it

- Quotes: "This is the last module of the course, so there is no next module to unlock" and "This is the end of the core course."
- Problem: Part 2 (modules 10 to 12) comes after IPv6, has core hours, and can be taken in any order. Every other gate says which module the learner can carry on to.
- Evidence: `02b-roadmap-addendum-modules-10-12.md`, Placement ("Three new modules after IPv6, as Part 2", with core hours for each). The gates 10.12 and 11.09 say "You can carry on to module 11/12".
- Fix: "You can carry on to Part 2, modules 10 to 12, as soon as you submit, ..." and "This is the end of Part 1 of the course. Part 2, modules 10 to 12, goes beyond your home network: how networks reach each other, VPNs, and a toolbox of everyday tools. Later, the Linux course ..."

### B5 (S2, minor): 9.3 uses a planning label that looks like a source tag

- Quote: "The optional stretch S5, about 60 minutes, builds IPv6 in the lab network"
- Problem: "S5" is the roadmap's internal name for the stretch. In learner prose, `S#` always means a source, so a learner looks for S5 in the Sources box and does not find it. No other chapter uses the label.
- Evidence: `02-curriculum-roadmap.md` line 408 ("the build is stretch S5"). This is the only use in the chapters.
- Fix: "The optional stretch, about 60 minutes, builds IPv6 ..."

### B6 (S1, minor): 8.2 says only three documentation blocks exist

- Quote: "Only three documentation blocks exist, and `192.0.2.0/24` stays unused in this capstone [S10]."
- Problem: that is true for IPv4 only. Module 9 then teaches the IPv6 documentation prefix `2001:db8::/32` [S69].
- Evidence: S10 (RFC 5737, IPv4) and S69 (RFC 3849, IPv6).
- Fix: "Only three IPv4 documentation blocks exist, ..."

## Checked and found correct (no change)

- 8.1 to 8.5: every recorded PASS line in 8.2, 8.3 and 8.4 matches the `t_pass` strings in each part's `test.sh`. The F3 worked example agrees with D5.7 and the `ping_ok` wording. The fault table F1 to F7 matches `break.sh` (F1 is `/28`, F6 shrinks the pool to `.100,.101` and adds `home3` with `-t 3 -T 1`, F4 is an input drop on port 53). The hint ladders, the log path and `-t 5 -T 2` match the part 3 README. REFUSED, TTL 62, TIME_WAIT 119 and the 3-second wait match D5.8.
- 8.6 and 8.7: all five quiz keys are correct. The demo table matches `demo-template.md`. The demo times add up to 5:00, and the mentor minutes add up to 28, under 30.
- 9.2 and 9.4: every expansion, shortening and tie-break, the predict (4 groups), and both quiz keys are correct under RFC 5952. The sizes 2^32, 2^64 and 2^96 are right.
- 9.1: the lab line `inet6 fe80::9084:33ff:fe2d:7d3f/64 scope link tentative` matches `replay-sessions.txt` line 86. The Google figure matches S33.
- 11.1 to 11.6: every capture, `wg show`, route table, `forward-test.txt`, conntrack row, spoof result and test line matches `challenge-8-sessions.txt`. The size sums are right: 84 to 96 to 156, `-s 100` gives 188, and `-s 200` (8.11 quiz) gives 300. The gap counts (4, 3, 5), the step numbers and the file names match the scripts.
- 11.7 to 11.9: the claims match S117, S118 and S122 to S125. The model answer's numbers match the recording.

## Found but not fixed

- `faults.md` in `challenge-6-capstone/part-4-break-and-fix/` has the same mistake as B3 ("F1 and F7 would be hidden if the way out of the home router is already broken (F2 or F3)"). Its own table says F7 is kept apart only from F1 and F2. The challenge files are read-only for this review, so the template owner should fix that sentence.
- `toolkit/restore.sh` (used in 8.2, 8.3, 8.4 and 8.7, and earlier in 4.7 and 6.7) is not in the learner template's `toolkit/`. The addendum already says "a `toolkit/restore.sh` does not exist yet". This is a course-wide gap, not in scope here.
- 8.3: "a refusal ends `curl` with exit code 7 ... That one number tells you which of the two you are looking at." Exit 7 also covers an ICMP unreachable, as B1 shows a few lines later. Inside the chapter's refusal-versus-drop contrast this is defensible, so it was left as it is.
