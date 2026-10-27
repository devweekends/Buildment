# Module 12, G5 critique: technical lens

Checked every chapter against in/05 (S#), in/12 (recorded output), in/13 (challenge 9 README, scripts, tests) and in/14. Every recorded output block was compared line by line with in/12; all match. Lab checks run during review (scratch copy of the template with the challenge 9 reference over it): the module 1 capture card in 12.2 (six packets captured), and `tcpdump -n -r` on a part 1 capture (ports already print as numbers). No test.sh output was needed: no chapter shows one.

Counts: S1 0, S2 4, S3 19. All fixed.

| # | Sev | Chapter | Problem | Fix applied |
|---|---|---|---|---|
| 1 | S2 | 12.2 | Module 1 card said the lines were "the same steps as in 1.4, with one change", but it also adds `bash cable.sh`, drops `-v`, `-e` and `2>&1`; not labelled as outside the README | Labelled as a changed 1.4 step not in the README; listed the three changes accurately, with [S130]; noted in Sources that it was run once in review, output not shown |
| 2 | S2 | 12.2 | Card runs `cable.sh`, which tears down every course network (toolkit `teardown_all`), so a learner mid challenge 9 loses the faulted network silently | Added a warning to rerun `bash faults.sh` afterwards |
| 3 | S2 | 12.6 | Said the 12.1 broken-name curl failure (3 s) showed the closed vs filtered difference; that failure was an unreachable host, not a reset | Rewrote: silence is the 12.1 app-port timeout; a closed port would answer at once with a reset, as in 5.4 |
| 4 | S2 | 12.9 | Q1 had the learner scan a friend's home server, against the module's scan rule [S133] | Stem now: your own computer at home |
| 5 | S3 | 12.2 | Buffering and `-U` claims had no source | Cited [S153]; Sources entry added |
| 6 | S3 | 12.2 | Right-click Follow menu path unsourced | Main path is Analyze, Follow, TCP Stream [S126]; right-click attributed to the README, menus untested |
| 7 | S3 | 12.2 | "A filter with host or port in it fails": wrong, the test passes any filter naming a field, so `tcp.port == 80` passes | Now: a filter that names no field, such as `host 203.0.113.80`, fails |
| 8 | S3 | 12.2 | Follow TCP Stream "shows the same lines" as `tcpdump -A`, but `-A` also prints header bytes (`9.4f....`) | Explained the header bytes; Follow shows data only, starting with GET |
| 9 | S3 | 12.3 | `-U` cited to "the challenge README" | Cited [S153]; Sources updated |
| 10 | S3 | 12.3 | `-n`/`-nn` row said only `-nn` prints ports as numbers; in the lab's tcpdump 4.99.4, `-n` already does | Row corrected (checked in the lab image) |
| 11 | S3 | 12.3 | Quiz commands use `-i veth-laptop` without `ip netns exec laptop`, so none would run as written | Stem says each command runs after `ip netns exec laptop` |
| 12 | S3 | 12.4 | `icmp_ratelimit` value cited to "the challenge README" | Now [S151]: shortest gap in ms, default 1000, 0 off; time exceeded shown limited by the run |
| 13 | S3 | 12.4 | Go deeper "one reply per second" unsourced | Cited [S151]; burst attributed to the recorded runs |
| 14 | S3 | 12.4 | netem direction unsourced | Cited [S152] (egress), and tied it to which direction lost probes |
| 15 | S3 | 12.4 | Example faults.md entry presented as "in the recorded run the entry looked like this" | Labelled as an example put together from recorded lines, not a recorded file |
| 16 | S3 | 12.4 | Sources: README citation for the limit | Replaced with S151 and S152 entries |
| 17 | S3 | 12.6 | "can take about 20 seconds" and "slowed your wide scan": the learner's wide scan runs after fault 1 is cleared | Uses the real recorded figure: 16.90 s in the blind round with loss planted again |
| 18 | S3 | 12.6 | [S81] cited for a missing route leaving a port silent (S81 is about resets) | Rephrased without the citation, matching the brief (drop or error) |
| 19 | S3 | 12.6 | "The test checks five things" left out the Fault 3 entry check | Six things, Fault 3 entry added |
| 20 | S3 | 12.7 | tc egress cited to "the challenge README" | Cited [S152]; Sources updated |
| 21 | S3 | 12.7 | [S137] attached to `-b`, which S137 does not list | Citation moved to `-u`; `-b` and the 5 to 15 Mbit/s range attributed to the challenge |
| 22 | S3 | 12.8 | Own-computer `-w` example with `time_appconnect` not labelled | Labelled as an example the course did not run; no output shown. Flags and fields checked against S147 |
| 23 | S3 | 12.1 | "three probes per hop rarely catch the loss": with 10% loss on 6 probes past r1, about half of traces catch one | Now "often miss"; step 8 "commit" moved to your computer (the lab has no git) |

Checked and correct, not changed: all recorded outputs; TTL arithmetic (109 to 107); packet counts (5 DNS of 33, 10 to the server); dig TTL 0 [S24]; nmap states [S134, S135]; iperf3 ratios (700 times, 40% high sender line); curl gaps; quiz and predict keys (one defensible option each); test descriptions in 12.3, 12.4, 12.5, 12.7, 12.8, 12.10 against the test scripts; S146 and S141 sizes in 12.2.

Audit: "Needs work: 0". check_fences: "problems: 0". No em or en dashes.
