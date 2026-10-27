# G5 blind review: modules 10 and 12

Reviewer: independent blind critic (technical, assessment and continuity lenses). Scope: `chapters/10-how-networks-reach-each-other/` and `chapters/12-toolbox/`. Read against the dossier and addendum, the challenge 7 and 9 recordings, the challenge 7 and 9 files in the learner template, and the two replay canvas specs (`net-m10-replay-challenge-7`, `net-m12-replay-toolbox`) plus `net-m10-bgp-announce`.

Counts: S1 0, S2 2 (three edits). All fixed.

## Findings

### M10-1 (S2) 10.2, beat "Numbers grew from 16 to 32 bits"

- Quote: "In December 2012 RFC 6793 widened it to 32 bits, up to 4,294,967,295 [S84]." The Mermaid arrow was labelled "RFC 6793, December 2012".
- Problem: wrong history. RFC 4893 (May 2007) first defined four-octet AS numbers. RFC 6793 obsoletes it and is today's standard, but it did not do the widening.
- Evidence: RFC 6793's header says "Obsoletes: 4893" [S84]. RFC 4893, "BGP Support for Four-octet AS Number Space", is dated May 2007.
- Fix: the sentence now says RFC 4893 widened the number to 32 bits in May 2007, and RFC 6793 of December 2012 replaced it as today's standard. The arrow label now reads "RFC 4893 in 2007, today RFC 6793". The S84 source note says it obsoletes RFC 4893. The beat still passes the word audit.

### M12-1 (S2) 12.1, fold "what each output proves"; and 12.6, beat "Three answers, three states"

- Quotes: 12.1 "In 5.4 you saw that a closed port answers at once with a reset." 12.6 "A closed port would have answered at once with a reset, as in 5.4."
- Problem: the cross-reference points to the wrong chapter. 5.4 covers the handshake, sequence numbers and retransmission, and never mentions a reset. The closed-port reset is taught in 5.3 ("A computer that is up answers a request for a closed port with a reset", [S81]), and that is also where the quick refusal and the long wait are compared.
- Evidence: a search for "reset" and "RST" finds no match in 05.04 or 05.06, and finds the passages above in 05.03.
- Fix: changed "5.4" to "5.3" in both places. The other "5.4" references in module 12 point to the handshake or to retransmission, which is right, so they stay.

## Checked and found correct (no change)

- 10.1: the RIPEstat, bgp.tools, whois, RDAP, Team Cymru, mtr `-z` and traceroute `-A` claims; the sample trace and its lookup table agree with `challenge-7-bgp/README.md`.
- 10.2: the private, documentation and reserved ranges (RFC 6996, 5398, IANA) and both quiz keys.
- 10.3: port 179, the four message types, the 90 s hold time, the lab output, the predict and both quiz keys. The canvas step 5 matches its data (the link goes down).
- 10.4: the Gao and Rexford export rules, local preference before path length, both maps and both quiz keys.
- 10.6: the contract matches the tests and the solution. `run_exercises.py` gave solution 12/12 and starter 0/12 (the starter fails the first test as intended). The chapter was not edited, so it was not run again after the edits.
- 10.7 to 10.10: every output block matches `challenge-7-sessions.txt`, including the template FAIL lines, "8 check(s) failed" and "Connection reset by peer". The gap counts, the TODO positions, the filter shape, `import keep filtered on` and the replay step numbers match the scripts and the spec. All predicts and quiz keys were re-answered blind.
- 10.9: the dates and AS numbers of the YouTube 2008, Cloudflare 2024 and Facebook 2021 events, the RFC 6480, 6811 and 7908 dates, the ROA logic and its quiz key.
- 12.1 to 12.10: every output block matches `challenge-9-sessions.txt`. Arithmetic checked: 41492 answered after 2.07 s; 8.56 Gbit/s / 12.3 Mbit/s is about 700; 17.2 / 12.3 is +40%; the curl gaps 0.0006, 4.0078 and 0.0002; TTL 109 to 107; 10 packets to the server. The seed ranges (rate 5 to 15, TTL 40 to 120, port 40000 to 49000) and the part 3, 5, 6, 7 and gate test rules match `seed.sh` and each `test.sh`. The replay step numbers match the toolbox spec.
- `audit-course.mjs`: "Needs work: 0". `check_fences.py`: "problems: 0".

## Found but not fixed

- 10.7 says that without an import rule, BIRD 2 takes no routes on an EBGP session. That matches BIRD 2's RFC 8212 default as I know it, but no recording shows it and I did not test it in the lab, to keep cost down. It is low risk, so I left it unchanged.
- 12.6 says that scanning the home router from the lab "would test Docker, not your router". That is a simplification, not a wrong instruction, because the advice not to scan from the lab still holds. I left it unchanged as wording, not a defect.
- The published copy in `courses/networking/` was not touched. The brief limits edits to the work chapters, so the two fixes need to be carried over when the course is synced.
