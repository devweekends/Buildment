---
artifact: critique
course: networking
artifact_under_review: agent-ip/work/networking/02b-roadmap-addendum-modules-10-12.md
lens: technical
scorecard_average: not scored (roadmap stage)
blocking_defects: 0 blocker, 6 major, 10 minor
recommendation: pass with changes
---

# G2A critique, technical lens: roadmap addendum, modules 10 to 12

## Verdict

Pass with changes. The plan is feasible. I ran the pieces the feasibility script did not: a six-namespace WireGuard build through two nftables NATs with a UDP port forward, a BIRD triangle with local preference, hijack and failover, mtr, nmap, iperf3 with `tc netem`, and `tcpdump -w` to the mounted `/work` folder. All of them work in the `networking-lab` image on Docker Desktop (kernel 6.6.87.2). No blocker. Six majors need fixing before G2B: one fact contradicts the addendum's own source (ROV and the Verizon leak), two code-exercise specs are not faithful models (bestRoute local preference, acceptFrom), the packet-size prediction is off by the WireGuard padding, the VPN build recipe omits two steps that make every first attempt fail, and a clean lab shows false loss in mtr.

## What works (preserve)

- ASN ranges are correct against S85, S86 and S87: private 64512 to 65534 and 4200000000 to 4294967294; documentation 64496 to 64511 and 65536 to 65551. Using 64496 to 64498 in the lab is the right choice.
- Loop rule, announce, withdraw, AS_PATH prepend and "policy before shortest path" match RFC 4271 as summarised in S83. Tested: with local preference 50 on the direct link, r1 chose the longer path (64497 64498) over the direct one (64498).
- The hijack works as taught: after r3 originated 198.51.100.128/25, r2 sent .130 to r3 and .50 to the owner.
- WireGuard through two NATs works. The only requirement is that one side is reachable (the port forward); the café side needs no forward.
- `tc qdisc ... netem` works in the lab image (see tests). nmap states and the mtr rule "loss that does not continue to the end is the router, not the path" both reproduce.

## Findings

| ID | Sev | Chapter | Problem | Evidence | Fix |
|---|---|---|---|---|---|
| A1 | major | 10.8 | The leak example is wrong for the claim. 10.8 says RPKI origin validation "stops the first but not the second", with Verizon 2019 as the leak. | 01b section 3 (S102): Cloudflare says ROV would have dropped the Verizon more-specifics because its ROAs had max length 20. The case that ROV misses is Cloudflare 2024: the leaked /24 had the right origin and was Valid (S103). | Use 2024 [S103] as the "valid but leaked" case. Say ROV catches a wrong origin or a prefix longer than the ROA's max length, and misses a right-origin, right-length route sent too far. Describe Verizon as optimizer-made more-specifics. Use S105's own wording for YouTube. |
| A2 | major | 10.6; Out of scope changes | `bestRoute` ranks by "highest local preference" over announcements. LOCAL_PREF is not sent to external peers (RFC 4271 5.1.5), so an announcement cannot carry it. Also the addendum lists local preference "beyond one mention" and best path as "shortest AS path after longest prefix" as out of scope, which contradicts 10.3 and 10.6. | Tested in BIRD: local preference came from an import filter on one neighbour (`bgp_local_pref = 50`), not from the wire. | Take local preference from the receiving network's policy: `bestRoute(announcements, myAsn, destination, policy)` with a per-neighbour value, default 100. Move "local preference as the network's own policy" into scope and fix the out-of-scope line. |
| A3 | major | 11.4 | `acceptFrom(peer, source)` models the inbound check as "source inside this peer's AllowedIPs". WireGuard does a longest-prefix lookup of the source across all peers and drops the packet if the owner is not the sending peer. | Tested: hub H with peer A on 10.0.0.0/8 and peer B on 10.1.0.0/16. A sends with source 10.2.0.1: reaches H's wg0. A sends with source 10.1.0.1: dropped. Assigning the identical prefix to a second peer moves it from the first. | Make it `acceptFrom(peers, peer, source)` using the same longest match as `pickPeer`, or state that tests use non-overlapping prefixes and name the simplification. Define duplicate exact prefixes (the later peer owns it) and no match (`null`). |
| A4 | major | 11.2; 11.7 | "Predict the new size" will not match a capture. The documented overhead is 32 bytes plus UDP and IP, but the inner packet is zero-padded to a multiple of 16 first (S112). The doc's own arithmetic (60 or 80 bytes) ignores it. | Tested: `ping -s 56` (inner IP 84 bytes) gave UDP payload 128 and outer IP length 156, not 84 + 60 = 144. Matches S142 (128 inner, 160 payload). | Formula: outer IP = ceil(inner/16)*16 + 32 + 8 + 20 (IPv4 outer; +20 for IPv6), padding capped at the MTU. Put the worked 84 to 156 example in 11.2, the canvas spec and the 11.7 question. |
| A5 | major | 11.5; challenge 8 | The recipe will fail at first run in two places, and the test can mislead in a third. (a) `wg set ... allowed-ips` adds no kernel route; (b) the office server does not know the tunnel network. (c) Removing the DNAT rule does not break an existing tunnel. | Tested: after `wg set`, `ip route get 10.20.0.5` still went via the café router and ping failed. With the route, ping to the VPN box (10.20.0.2) worked but 10.20.0.5 failed until `ip route add 10.99.0.0/24 via 10.20.0.2` on the server (replies went to the office router). With the rule flushed, the old conntrack entry kept the tunnel alive; with a fresh state and no DNAT, `wg show` read 148 B sent, 0 B received. | Add `ip route add 10.20.0.0/24 dev wg0` on the café and the return route (or masquerade on the VPN box) on the server, with a README line on why each is needed. In part 1, break the forward on purpose and flush conntrack (`conntrack -F` in the router) before the test. Say `wg-quick` adds the route for you. |
| A6 | major | 12.4; challenge 9 part 3 | A clean lab shows false loss at a router hop, so a results test that expects 0% on hop 1 fails. Linux limits ICMP time-exceeded replies (`icmp_ratelimit` 1000 ms, mask 6168). | Tested, c to r to s, no impairment: `mtr -rn -c 10` showed hop 1 at 20% and hop 2 at 0%; `-i 0.2` gave 12.5%. After `sysctl -w net.ipv4.icmp_ratelimit=0` in the router, hop 1 was 0%. | Use this as the lesson: it is the router limiting itself. Set the sysctl in the baseline run, then show three cases: clean, real loss (netem), router limiting. Tests assert the pattern (last hop loss), not 0% at hop 1. |
| A7 | minor | 10.7; challenge 7 part 3 | "Add a backup link" will not act as a backup. With a direct r1 to r3 link the shorter AS path wins and the old path never carries traffic. BIRD also refuses eBGP with no explicit policy. | Tested: direct link without policy wins on path length. With `bgp_local_pref = 50` on the direct session it is the backup, and `disable p23` on r2 moved r1's route to the direct next hop and ping still passed. BIRD 2.14: "EBGP requires explicit import policy". | Give the config template `import all; export all;` and a one-line local-preference filter for the backup session. Say that is a policy choice (links to 10.3). |
| A8 | minor | 10.3; 10.9; challenge 7 | A rejected loop cannot be shown in the lab. | Tested: `show route 198.51.100.0/24 all filtered` on r1 returned "Network not found" even with `import keep filtered`; BIRD drops loops before keeping them. | Teach loops by Predict and the 10.9 question, not as a lab observation. Mark `debug { routes }` as untested. |
| A9 | minor | 11.5; challenge 8 | What the café capture shows is under-specified, and the test as worded ("only UDP to the tunnel port") is ambiguous. | Tested at the café NAT's outside port: `198.51.100.2.51820 > 203.0.113.2.51820: UDP, length 128` and the reverse, so masquerade kept the source port (same as 6.7 in the first roadmap). Replies come from port 51820. The office outside link also carried an IPv6 router solicitation. The capture on `wg0` is link type RAW with no Ethernet header. | Test: filter `udp port 51820` both directions, assert no ICMP or TCP in the café outside capture and an ICMP echo from the tunnel address in the `wg0` capture. Teach what is visible: outer addresses, ports, sizes, timing, and handshake sizes (148, 92). Not visible: the inner destination 10.20.0.5. Set ListenPort 51820 on both sides (Wireshark decodes WireGuard on that port). |
| A10 | minor | 11.5; 11.3 | Keepalive does not matter for café-initiated traffic but does for office-initiated. 11.3 also calls AllowedIPs "the route out". | Tested with short conntrack UDP timeouts (per-namespace sysctl works): café ping works; after 20 s idle an office ping to the café tunnel address failed; it worked after the café sent first, and worked after idle once `persistent-keepalive 3` was set. Real defaults are 30 s and 120 s (stream). | Add keepalive as a part 3 stretch or gotcha and explain why it sits on the NATed side. Reword AllowedIPs as "which peer gets the packet, and which sources are accepted"; the routing table decides what reaches `wg0` [S117, S118]. Warn that overlapping home and office subnets (192.168.1.0/24 on both) break VPNs. |
| A11 | minor | 12.2; challenge 9 part 1 | The open-in-Wireshark path is only half tested. | `tcpdump -w /work/x.pcap` as root works on Docker Desktop and the file appears on Windows at once (pcap, owned by the `tcpdump` user inside). While the capture runs, the file looks empty from inside the container. Wireshark is not installed on this machine, so opening it was not tested. | Use `-c`, Ctrl-C or `-U` before opening. Test one real open on Windows and macOS (and note file ownership on native Linux). Record it as tested. |
| A12 | minor | 12.7; challenge 9 part 6 | iperf3 over a veth reports 46.6 Gbit/s (CPU bound), and `tc` shapes only egress. A learner who shapes one side sees a direction effect they did not expect. | Tested: netem `rate 10mbit delay 20ms` on c's egress gave 9.47 Mbit/s receiver; `-R` (unshaped direction) gave 1.43 Gbit/s. With 2% loss TCP fell to 4.95 Mbit/s (46 retransmits); UDP `-b 8M` showed 1.9% loss. The claim "a speed test site measures something else" has no source in 01b. | Name the interface (shape the sender's egress, or both) and show `-R`. Use UDP for the loss number. Source or soften the speed-test sentence (S136 and S137 only cover iperf3). Flag macOS Docker Desktop and native Ubuntu cloud kernels (`sch_netem` is in `linux-modules-extra`) as untested. |
| A13 | minor | 12.6; challenge 9 part 5 | nmap needs listeners and a filter rule built first, and a scan of a filtered port is slow. | Tested: closed 9, filtered 7777 (nft drop), open 8080 (busybox httpd) in 1.4 s; default 1000-port scan 3.7 s. Without the drop rule 7777 reads closed. "Filtered" means no answer or an ICMP error, not a firewall rule. | Give the part a script that creates the three states. Teach "filtered = could not tell" and add `-n`. Scanning the learner's own router goes through Docker's NAT, so say what that tests (decision 17). |
| A14 | minor | Build environment changes | Size claims. "About 25 MB more" measured 31 MB installed after removing apt lists, 84 MB if the new RUN does not clean them. "Download grows from about 200 MB to about 225 MB" mixes disk and download. | `docker images`: `networking-lab` 207 MB disk, 55.5 MB content. Learners build locally, so they download the Ubuntu base plus apt packages. Packages are unpinned. | Say "about 31 MB more on disk" and quote disk and download separately (measure both). Put the cleanup in the same RUN. Record the pinned BIRD 2.14 and WireGuard tools versions. |
| A15 | minor | Purpose of 10; 10.1 to 10.5 | Over-reading S144: "about 67,000 only announce their own blocks and carry nobody else's traffic". Also the prompts "within minutes" (10.3) and "through another country" (10.4) have no source. | S144 counts origin-only AS numbers in one view's paths (67,416), not traffic. | Write "appear only at the end of AS paths in this view". Source or drop the other two claims (S101 supports "keep local traffic local" only). |
| A16 | minor | 10.1; 12.4; 12.5 | `whois` and `mtr -z` do not exist on Windows (use `pathping` or WinMTR; Homebrew on macOS), and a trace from the container hides the real path (dossier 5.5), so "also on their home network" must run on the host. | Same host-command gap as T5 in the first critique. | Add a host-command table per chapter for 10.1, 12.4 and 12.5. |
| A17 | minor | 10.7; 11.5 | Time boxes. 11.5 needs six namespaces, two NATs, one DNAT, two routes and four captures. 10.7 needs three BIRD configs and a hijack part. 90 minutes holds only if the learner fills TODOs in a provided script. | My own build took the full setup script plus two fixes. | Ship scaffolds with TODO gaps as challenges 1 to 6 do, and re-time with a novice. |

## Tests run (2026-10-27, `networking-lab`, `--privileged`, packages from apt)

- `tc qdisc add ... netem delay 50ms loss 10% rate 10mbit`: exit 0; ping RTT shifted as set. `/proc/config.gz` has `CONFIG_NET_SCH_NETEM=m` and the container has no `/lib/modules`, so the host kernel loaded it.
- WireGuard: six namespaces, two NATs, DNAT 51820 to the VPN box. Works; failure cases in A5 and A10.
- BIRD 2.14 triangle: local preference, failover by `disable`, hijack by /25, link-down detected in under a second.
- mtr, nmap, iperf3: results in A6, A12, A13.
- Not tested: Wireshark GUI, macOS Docker Desktop, native Linux, a real café, `mtr -z`.

## Questions I could not resolve

- Whether Wireshark on Windows opens the files untouched (Wireshark not installed here).
- Whether `sch_netem` loads on the macOS Docker Desktop kernel.

## Recommendation

Revise. Fix A1 to A6 before G2B. A7 to A17 can follow in the blueprint. Record the tests above in the research addendum so the sources table covers them.

## Round 2 (addendum v0.2)

Verdict: pass with changes. All six round 1 majors are closed in the text, and the new claims I tested hold up (exact-block filter, link-cut failover, full tunnel, spoof drop). No blocker. One new major (B1): the 11.7 full tunnel fails at first run in two places. The rest are minor.

### Round 1 findings

| ID | Status | Note |
|---|---|---|
| A1 | closed | 10.9 says ROV catches wrong origin or too-long prefix and misses a right-origin leak, using Cloudflare 2024 [S103]. See B8 for one wording point. |
| A2 | closed | Preference comes from a `policy` argument; out-of-scope list and 10.4 fixed. |
| A3 | closed | Code exercise cut; 11.3 teaches longest match across all peers; 11.5 tests a spoofed source (works, see B9). |
| A4 | closed | 11.2 formula and the 84 to 156 example match my capture. |
| A5 | closed | 11.4 and 11.5 add the café route, the server return route and `conntrack -F`. The same class of gap reappears in 11.7 (B1). |
| A6 | closed | 12.4 teaches the three cases; tests assert the pattern. |
| A7 | closed | Tested: cutting the r1 to r2 link moved r1's route to the direct next hop and ping passed. |
| A8 | closed | Loops are taught by Predict. |
| A9 | closed | Test wording now "UDP 51820 both ways, no ICMP or TCP". |
| A10 | closed | Keepalive gotcha, AllowedIPs wording and overlapping subnets (11.1) added. |
| A11 | partly closed | `-c`, Ctrl-C and `-U` are in 12.3. Opening a capture in Wireshark on Windows and macOS is still untested (listed as to-test). |
| A12 | closed | Direction, `-R`, UDP loss, sentence removed. See B4 for which iperf3 line to read. |
| A13 | closed | "Filtered means could not tell", `-n`, consent line. |
| A14 | closed | 31 MB on disk, same `RUN`, download measured at build. |
| A15 | closed | Wording fixed, unsourced prompts removed. |
| A16 | partly closed | 10.1 table and 12.4 `pathping` and WinMTR added. 12.5 still assumes `dig` (Windows has `nslookup`), and `+trace` needs B6. |
| A17 | closed | Builds are 60 minutes or less with stated support. Minutes stay estimates until the pilot. |

### New findings

| ID | Sev | Chapter | Problem | Evidence | Fix |
|---|---|---|---|---|---|
| B1 | major | 11.7; challenge 8 part 4 | Full tunnel fails twice at first run. (a) A default route into `wg0` also captures the handshake to the endpoint. (b) Replies for `10.99.0.0/24` go to the office router's default route. | Tested: default via `wg0` with no pin: new handshake never completed (`148 B sent, 0 B received`). Pinning (`ip route add 203.0.113.2/32 via 192.168.50.1`) still timed out. After `ip route add 10.99.0.0/24 via 10.20.0.2` on the office router the website saw 203.0.113.2; before the tunnel it saw 198.51.100.2. So the 1.1 callback works. | Put both steps in the part 4 README with a hint, or masquerade on the VPN box (drops (b)). Say `wg-quick` pins the endpoint for you. |
| B2 | minor | 11.7 | The outcome implies only the split tunnel leaks DNS. | Tested: with a full tunnel `ip route get 192.168.50.1` is still `dev e0`, so queries to the café's resolver leave in the clear in both modes. | Show the leak in full tunnel, then fix it by pointing the café client at a resolver reached through the tunnel (`/etc/netns/cafe/resolv.conf`) and capture both. |
| B3 | minor | 10.8; 10.10 | The exact-block filter works but is a hand-written prefix and origin list, not RPKI. After a link flap BIRD stays idle. | Tested: r3 announced a /25; a filter on r2's r3 session (accept 203.0.113.0/24, accept 198.51.100.0/24 only if last AS is 64496, reject rest) removed the /25 on `birdc configure` with no manual reload, and `show route ... filtered` lists it. A wrong-origin /24 from r3 was also rejected. After `ip link set down` then `up`, the session sat in "Idle, Link down" for minutes. | Say "a stand-in written by hand; real ROV checks signed data any network can fetch". Tests that restore a link run `birdc restart` or set a short `connect retry time`. |
| B4 | minor | 12.1; 12.7; challenge 9 | Faults 1 and 4 look alike in iperf3 TCP, and the sender line misleads. | Tested: rate 5mbit gave receiver 4.68 Mbit/s, 0 retransmits, mtr 0% loss; loss 1% plus 20 ms gave 6.89 Mbit/s, 45 retransmits, mtr 3.3% loss. The throttle's sender line read 10.9 Mbit/s (buffered). | The matrix names the discriminator (mtr loss on one link; Retr column zero for the throttle). Tests read the `receiver` line. Put the two faults on separate links. |
| B5 | minor | 12.2 | "Seeded capture" is ambiguous and a live count is fragile. | Tested 6 live runs with `curl --local-port 40000`: TTL 63 and 10 packets in 5 runs, 14 in the first (stray traffic). Unfiltered captures also carry IPv6 noise (seen in round 1). | Commit the capture, or generate it with a per-learner port, and always count with `tcp port 8080`. A shared fixed file lets answers be copied; say which design is chosen. |
| B6 | minor | 12.5; challenge 9 part 4 | `+trace` fails in the lab as written. | Tested: `dig +trace -4 example.com` printed only "Received 17 bytes from 192.168.65.7" and no delegation. `dig +trace -4 example.com @1.1.1.1` reached i.root-servers.net and listed the example.com name servers. | Teach `dig +trace @1.1.1.1` in the lab and say why. |
| B7 | minor | 11.4; challenge 8 part 1 | `toolkit/restore.sh` does not exist, and challenge 4's router does not match the chapter. | Toolkit has `check-setup.sh`, `lib.sh`, `udhcpc-hook.sh`. Challenge 4 uses 192.168.1.0/24 inside, 192.168.50.0/24 for the guest, 203.0.113.0/24 outside, and has no VPN host behind the router. 11.4 needs 10.20.0.0/24, a separate VPN host for the forward, and a different café range. | Specify `restore.sh` (renumber, add VPN host, café on its own range) and time it with a novice. |
| B8 | minor | 10.9; 12.8 | "YouTube vanished for much of the world" is not in the source. `curl -w` fields have no source. | S105 says the reach of the hijack is unknown. No curl documentation is in the sources table. | Write "many networks could not reach YouTube for about two hours (18:47 to 21:01 UTC)". Add the curl man page as a source. |
| B9 | note | 11.5 | The spoof test has an observable. | Tested: a packet whose source fails the check does not show in `tcpdump -i wg0` on the receiver but adds one RX error in `ip -s link show wg0`. | Use the RX error counter in the part 3 test. |
