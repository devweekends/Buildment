# G5 blind review: modules 06-nat and 07-dhcp-and-dns

Reviewer: independent, blind (no earlier critiques read). Date: 2026-10-28.

Method: read all 19 chapters against the dossier (S1 to S82), the challenge 4 and 5 files in `D:\nwflash\push-challenges`, and the recordings. Ran the 6.6 reference solution against its 14 tests (all pass). Filled the gaps of challenge 4 parts 1 and 2 and challenge 5 part 1 in a scratch copy and ran them in the `networking-lab` image: every recorded output and test line in 6.7, 6.8 and 7.6 matches in shape and wording (ports differ, as the chapters say). Extra lab checks: DNAT to an address nobody owns; the route-leak case of 6.3; the refused port 22; a dig to a silent server.

Counts: S1: 2. S2: 6. All fixed.

## Findings

### M67-01 (S1) 06.09, level 1
Quote: "The friend's browser waits, and then gives up. She did not see an error message." Table: "The request waits, then gives up". Analysis: "the router accepts the packet and sends it on, and then nothing comes back."
Problem: a Linux router that forwards to an address nobody owns tries ARP for about three seconds, then sends an ICMP host-unreachable error back. The friend gets an error, not silence.
Evidence: lab test with the part 2 network and the rule changed to `dnat to 192.168.1.32:80`: `curl: (7) Failed to connect to 203.0.113.1 port 8080 after 3082 ms: Couldn't connect to server`. The router's own `ping -c2 -W1 192.168.1.32` gave 2 sent, 0 received (that fact stays true).
Fix: the story now says the browser waits a few seconds and says it could not connect; the table says "waits about three seconds, then fails to connect"; the analysis says no device answers and the router reports the failure after about three seconds. The takeaway says "gets no page" instead of "gets nothing". The quiz key is unchanged (still the wrong target).

### M67-02 (S1) 06.06, Sources
Quote: "a NAT should be endpoint-independent for mapping"
Problem: RFC 4787 makes this a MUST, and 6.2 already says "must". The two chapters disagreed.
Evidence: dossier line 126: "RFC 4787 says a NAT MUST be endpoint-independent for mapping".
Fix: "should" changed to "must".

### M67-03 (S2) 06.07, If it does not work
Quote: "If you want to start from a known good state, run `toolkit/restore.sh 4.1`."
Problem: the script does not exist. `toolkit/` holds only `check-setup.sh`, `lib.sh` and `udhcpc-hook.sh`. The roadmap addendum says "a `toolkit/restore.sh` does not exist yet".
Evidence: `ls D:\nwflash\push-challenges\toolkit`; `02b-roadmap-addendum-modules-10-12.md` line 158.
Fix: "If you want to start from a clean network, run `bash masquerade.sh` again: it deletes the old network first." (true per the script header and step 1, `teardown_all`).

### M67-04 (S2) 06.08, Start from your own part 1, and If it does not work
Quote: "you can return to a good state with `toolkit/restore.sh 4.2`" and "go back to the last known good state with `toolkit/restore.sh 4.2`".
Problem: same missing script. Also `4.2` would name the end of part 2, not the start.
Evidence: as M67-03.
Fix: first mention removed; second replaced with: check that part 1's test still passes, then run `bash forwarding-guest.sh` again, which rebuilds the whole network (true: it runs part 1 in build-only mode).

### M67-05 (S2) 07.01 table row 5, and 07.05 Check 5 and 6
Quote: "a missing return route is silent loss (6.9)" and "a missing return route is silent loss, as in 6.9."
Problem: 6.9 has no missing return route (its levels are a wrong target, a port clash and a provider NAT). The missing return route is taught in 4.7 and 4.8.
Evidence: `04.08-lab-fix-the-broken-office.md` summary: "a missing return route"; grep of 06.09.
Fix: 07.01 row now reads "refused at once (6.9); a missing return route is silent loss (4.8)". 07.05 now says "as in 4.8".

### M67-06 (S2) 07.02, Go deeper on 169.254
Quote: "The lab's client is `busybox udhcpc -n -q -t 3 -T 1`."
Problem: the challenge script runs the client with `-t 5 -T 2` (7.6 teaches this). Only the test's "dnsmasq stopped" check uses `-t 3 -T 1`. A learner who compares 7.2 with the script finds two different commands for "the lab's client".
Evidence: `dhcp-dns.sh` gap 5 shape; `test.sh` `lease_for phone veth-phone 3 1`.
Fix: "For this case, the challenge test runs the lab's client as `busybox udhcpc -n -q -t 3 -T 1`." 7.6 already explains the difference.

### M67-07 (S2) 07.02, the recorded lease
Quote: "The tool printed each packet on two lines."
Problem: `tcpdump -v` prints about 12 lines for each DHCP packet. The two-line pairs are what `dhcp-dns.sh` keeps with `grep -E 'BOOTP/DHCP|Message'`. A learner who opens `dhcp-capture.txt` sees something else.
Evidence: lab run of challenge 5: `dhcp-capture.txt` has the full `-v` output; the script's own echo shows the two-line pairs exactly as quoted.
Fix: "The challenge script keeps two lines of each packet."

### M67-08 (S2) 06.03, refused is not the same as silent
Quote: "Later, in 7.7, the same clue helps you tell a blocked port from an absent one."
Problem: 7.7 has no blocked-port question. Its question is refused versus timed out for port 22, and 7.5 teaches refusal versus silence.
Evidence: 07.07 question 4; 07.05 Check 5 and 6.
Fix: "Later, in 7.5 and 7.7, the same clue helps you tell a refusal from silence."

## Checked and found correct (no change)

- 6.7 and 6.8 recorded script output and test lines: they match a fresh lab run line for line apart from the ports. That includes the masquerade-free ping, `curl (7)` from the server at once, `curl (28) ... after 3002 milliseconds` for the guest, the `nft list ruleset` text with `priority srcnat` and `dstnat`, and both capture descriptions.
- 7.6 udhcpc lines, the `ip -o addr` line, `REFUSED`, the curl line and all 13 test lines match a fresh run. The capture also shows `RN 1800` and `RB 3150`, which supports the T1 and T2 figures in 7.2.
- 6.6 solution: 14 of 14 tests pass. The worked example and the "check before you submit" arithmetic are right.
- The route-leak claim in 6.3: with `192.168.1.0/24 via 203.0.113.1` on the server, `curl http://192.168.1.23/` returned the page (exit 0).
- The RFC 6888, RFC 4787, RFC 2131 T1/T2, STUN port 3478, 100.64.0.0/10 range, CGN study figures and the dated outages all match the dossier.

## Found but not fixed

- `04.07-build-a-router.md` and the capstone chapters (08.02, 08.03, 08.04, 08.07) also send learners to the missing `toolkit/restore.sh`. These modules are outside my scope. Either ship the script or apply the same fix there.
- The 6.9 quiz explanation "so the packet disappears" is loose after M67-01, but it is still defensible: no device receives the packet. I left it to keep the edit small.
- 07.01 row 4 points to 7.3 for "a lookup by name times out". The time-out is shown in 7.5, not 7.3. It is a soft pointer to where DNS is taught, so I did not change it.
- The `<Lab>` boards (`net-lab-home-router`, `net-lab-no-internet`) and the canvases were not checked. Their specs are outside the chapter files.

Audit: `audit-course.mjs` reports "Needs work: 0"; `check_fences.py` reports "problems: 0". Nothing committed.
