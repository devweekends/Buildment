# Module 12, G5 critique: pedagogy lens

Read every chapter against in/02 (the six-part Tool shape, chapter notes), in/04 (module 12 rows), in/13 (challenge 9 README, faults.md template, part 0 test.sh, faults.sh) and in/14 (1.4, 4.4, 7.3). The technical critic's fixes (critique-technical.md) were kept; none was undone.

Counts: S1 0, S2 2, S3 4. All fixed.

| # | Sev | Chapter | Problem | Fix applied |
|---|---|---|---|---|
| 1 | S2 | 12.2 | "If you came here from module 1" did not stand alone: it never said what Wireshark is, and sent the learner to "the next section" to install it. A card showing only this section left a module 1 learner with no idea what to install or how big it is | Added a short paragraph inside the section: Wireshark is free for Windows, macOS and Linux [S139], shows each packet as a clickable row with named layers, download about 93 MiB (Windows) and 140 MiB (macOS) [S146], wait for Wi-Fi; points to the install section by name. Heading unchanged |
| 2 | S2 | 12.10 | Blind round unclear: the learner was not told that round 2 also picks new values for the name (the wrong name can be another of the five), the loss and the limit; "does any port stay silent" did not point at the new app port; no word on whether round 2 faults must be cleared, or whether round 1 entries must change. A learner who only checks the round 1 name misses fault 2 | Added: round 1 answers do not carry over, check all five names and the app's new port; only clear loss before iperf3, otherwise no fix is needed because the gate test reads only faults.md; the template already has the Finding A/B lines; command and line must come from a run after `--round 2`; leave round 1 entries as they are (checked against round 1 numbers). Matches test.sh and faults.sh |
| 3 | S3 | 12.10 | Part 1 said "The test matches each output line" without saying which test or when it runs | Now: parts 3 to 6 already checked each entry; the gate test in part 2 checks all four again against round 1 numbers |
| 4 | S3 | 12.6 | Chapter quizzes had the key at position 1 in five of seven Tool and Read chapters (12.2, 12.4, 12.5, 12.6, 12.7): a guessable pattern | Reordered options: key now at position 2 |
| 5 | S3 | 12.7 | Same pattern | Reordered options: key now at position 0. Positions are now 0, 1, 2, 1, 1, 2, 0, 0 across 12.1 to 12.8 |
| 6 | S3 | 12.5 | The flags row shows `qr aa rd ra` but explains only `rd` and `ra`; a beginner is left wondering about `aa` (no source in in/05 to explain it) | Added "The other two flags do not matter here" |

Checked and fine, not changed:
- Six-part shape: 12.2 to 12.8 each open with a real symptom from the learner's world (1.4 walls of text, an 80,000-packet file, a friend's 20% hop, phone vs campus Wi-Fi, a teammate's "it is open", a slow copy, a two-second app), then "X answers one question", install or "in the lab" with sizes where in/05 has them, three commands with recorded output, how to read, one trap, and the challenge part with faults.md and the test. 12.6 puts the consent rule before the tool line, as the brief asks.
- Roadmap rows: titles, types and minutes all match (20, 40, 35, 35, 35, 35, 35, 30, 15, 40).
- Terms before use: capture file, display filter, capture filter (12.2), netem and tc (12.4), the three nmap states (12.6), the curl times (12.8) are all defined before they are needed. Callbacks to 1.4, 4.4, 5.4, 7.3, 7.4 are correct.
- Predicts: two options each, keys split between first and second, none given away by length. 12.9: keys at 2, 0, 2, 0, 2, no length giveaways, distractors plausible.
- Gate: three parts, worked example uses a round 1 fault so it does not give away round 2, phone branch has four supplied outputs and a model answer that rules out the speed limit.
- No forbidden patterns, no hype, no em or en dashes; sentences are short and plain.

Audit: "Needs work: 0". check_fences: "problems: 0".
