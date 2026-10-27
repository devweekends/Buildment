# Module 10 critique, lens: technical (G5)

Checked every chapter against in/05 (facts), in/12 (sessions), in/13 (challenge 7 files), in/14 (earlier chapters), the two canvas specs, and quick runs in the lab image. 10.10 was checked line by line against the part 4 README, hijack.sh, test.sh and the recorded runs. All recorded outputs quoted in 10.3, 10.6, 10.7, 10.8 and 10.10 match in/12 exactly. Quiz and predict keys in all twelve chapters are correct, and only one option can be defended.

| # | Sev | Chapter | Problem | Fix applied |
|---|---|---|---|---|
| 1 | S1 | 10.1 | Says `whois` works in the lab, and the Team Cymru command runs "in the lab". A lab check (2026-10-27) showed `whois` fails there with `getaddrinfo(...): Servname not supported for ai_socktype` because the image has no `/etc/services`. `whois -p 43 ...` works | Table row and fold now say `whois -p 43` in the lab, quote the error, and give the lab form of the command. The fact is noted in Sources as a lab check. Suggest the image adds `netbase` |
| 2 | S2 | 10.12 | The phone branch points to the README in the repository, which a phone reader may not be able to open. The real trace (S148 to S150) was not in the chapter | New fold with the real RIPE Atlas trace and the lookup table, copied from in/13, cited [S148, S149, S150] |
| 3 | S2 | 10.4 | Quiz 2: the stem lists only a provider and a peer, but the key is "to its customers only". With no customers in the stem the key cannot be defended | Stem now says AS64507 also has two customers |
| 4 | S2 | 10.10 | Opening says "routers everywhere preferred it". S105 says the reach is unknown, and 10.9 says so on purpose | "the routers that heard it preferred it" |
| 5 | S3 | 10.1 | Fallback trace had no source | Adds that it is RIPE Atlas measurement 18399116 [S148], with lookups [S149, S150], and the three rows in Sources |
| 6 | S3 | 10.1 | "Two hops in a row with the same AS number are almost always inside one network" is not sourced, and the chapter's own caveat argues against it | "probably" |
| 7 | S3 | 10.2 | "thousands of networks use the same ones": a made-up count. S85 says only "not globally unique" | "many networks can use the same ones" |
| 8 | S3 | 10.3 | "a number that shows twice means a circle": a network can put its own number in a path more than once on purpose (prepending), so this is wrong as a rule | Now says a network that finds its own number in a path knows the route has already passed through it |
| 9 | S3 | 10.5 | "it can peer with any other network there" suggests peering is automatic | "then peers with any network there that agrees" |
| 10 | S3 | 10.6 | "many times a second": no source | Removed |
| 11 | S3 | 10.7 | "the `i` means the block started inside BGP" is wrong. `i` is the origin code IGP (the part 2 README says so) | Now says origin code IGP, the block came from inside that network, as `BGP.origin: IGP` shows |
| 12 | S3 | 10.7 | Step titled "Ping both ways", but both pings go from r1 to r3 | "Ping twice" |
| 13 | S3 | 10.8 | "r3 never answers": the recorded state is `Connection reset by peer`, so r3 does answer: it turns the session away | "r3 turns it away" |
| 14 | S3 | 10.9 | "RPKI origin validation did not exist in 2008" claims too much. What the sources support is that the standard came later (RFC 6811, 2013) | "was not yet a standard in 2008" |
| 15 | S3 | 10.9 | The predict calls 1.1.1.0/24 "a block that belongs to Cloudflare" and says "Cloudflare has a ROA". S103 supports Cloudflare's resolver and a ROA naming its AS, not ownership | "the block of Cloudflare's resolver 1.1.1.1" and "a ROA that names Cloudflare's AS" |
| 16 | S3 | 10.10 | "in many countries it is a crime" is not sourced. The README says "can be a crime" | "it can be a crime" |
| 17 | S3 | 10.10 | "RPKI matters only when many networks check routes" overclaims | "RPKI protects the most when many networks check routes" |

Counts: S1 1, S2 3, S3 13. All fixed.

## Not fixed (outside the chapters or the lens)

- The challenge 7 part 1 README (in/13) has the same wrong wording about `i` ("it started inside BGP"). It is a template file, not a chapter, so it is not edited here. Suggest changing it to match part 2's wording.
- The lab image needs `-p 43` for `whois` (finding 1). Installing `netbase` in the image would remove the need for it, and the fold could then be shortened.
- 10.10's title, "Build: a wrong announcement and the filter that stops it", is not the roadmap's "Build: steal a block in your own lab". This looks like the orchestrator's choice. It is for the pedagogy lens to judge, so it was left as it is.
- 10.4: AS64510 is a customer of AS64503 in the first map and of AS64500 in the later maps. That is consistent if it has two providers (multihomed), so it was left.

## Checks run after the edits

- `run_exercises.py` (10.6): solution 12/12; the starter code fails at the first test, as it should. No test changed.
- `audit-course.mjs`: Needs work: 0. (One edit at first pushed a 10.5 beat to 72 words. It was cut back.)
- `check_fences.py`: problems: 0.
- No en or em dashes in the chapters.
