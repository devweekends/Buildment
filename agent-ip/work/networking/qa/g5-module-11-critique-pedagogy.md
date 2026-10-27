# Module 11 critique, lens: pedagogy (G5)

Read all nine chapters against `in/02-module-brief.md`, the module 11 rows of `in/04-roadmap.md`, the challenge 8 template, the earlier chapter goals, and the critic lenses and forbidden patterns. The technical critic's fixes were kept as they are. Every chapter matches its roadmap row for title, type and minutes. Each hook comes from the learner's world (the café, "turn on the VPN", "anonymous"), and the why comes before the what. Predict and quiz keys are spread across positions (quiz keys: 0 x6, 1 x5, 2 x3; predicts: 3 first, 5 second), and no key is given away by length.

Counts: S1 0, S2 1, S3 9. All fixed.

| # | Sev | Chapter | Problem | Fix applied |
|---|---|---|---|---|
| 1 | S2 | 11.4 quiz | The stem said the failed try was "a minute ago". The chapter shows the unreplied UDP row expiring after about 30 s (`29` seconds left), so after a minute the conntrack key no longer holds and the stem fights the chapter | "A few seconds ago ... the same sender sent to that port, from the same address and source port" |
| 2 | S3 | 11.2 | Roadmap and brief ask for a Predict before each layer of the capture; the chapter had only the size predict | Added a Predict before the café capture (ICMP or UDP on the outside plug); before the wg0 capture, a prose prompt to say the addresses and protocol first. To stay within the audit's 3 interactions, the end quiz "which line on the café's outside plug" was removed: the new predict covers it, and 11.8 Q1 tests it again |
| 3 | S3 | 11.7 | Roadmap asks for "who sees what" as Predict blocks; the four set-ups were a TraceRequest that shows the answers | Added a Predict for the hardest set-up (full tunnel with café DNS: can the café read web.test?), and a line asking the learner to say what the café sees before opening each step. To keep 3 interactions, the split-tunnel quiz was removed; 11.8 Q4 tests the same thing |
| 4 | S3 | 11.7 predict | The IPv6 leak predict said "and nothing for IPv6" in its stem, which gave the key away | Removed that phrase; the stem now gives only `0.0.0.0/0` |
| 5 | S3 | 11.1 quiz | Distractor "the VPN picks the office because it is newer" was implausible | Replaced with "The laptop sends it to the home router, its gateway", a real beginner mistake (same range means a neighbour, not the gateway); explanation points to 3.3 |
| 6 | S3 | 11.1 | Prose names the internet router `198.51.100.1`, but the diagram showed no address for it | Added the address to the diagram node |
| 7 | S3 | 11.3 | Roadmap asks the learner to predict which peer gets five packets; the TraceRequest only revealed them | Added "Before you open each step, say which peer you would pick" |
| 8 | S3 | 11.5 | The test output line cites `10.99.0.77` and "RX errors 1 to 2" right after the chapter used `10.99.0.66` and "before 0, after 1"; a beginner would think something went wrong | One sentence: the test uses its own false source, `.77`, so the count goes from the script's 1 to 2 |
| 9 | S3 | 11.9 | "Use no word that you have not explained in the same sentence" is hard to follow and not what is meant; the checklist had no item for the full and split tunnel part of O9 | "Explain each technical word, such as NAT or AllowedIPs, the first time you use it"; added the checklist item "I can say what the café, the office and the website each see in a full and in a split tunnel" |
| 10 | S3 | 11.4, 11.2 | Hard sentences for an ESL reader: "as you predicted or not"; "the RFC also says the obvious cost" | "Did you predict that?"; "names the obvious cost" |

Not fixed:
- 11.6 quiz (missing Gap 1) repeats a sentence from the Gap 1 beat almost word for word. It sits at the end of the chapter after the build, so it still works as retrieval. Left as it is.
- 11.2 and 11.7 lost one end quiz each to stay within the audit's limit of 3 interactions. The topics are still tested in 11.8.

Checks after the edits: audit-course "Needs work: 0"; check_fences "problems: 0"; no em or en dashes.
