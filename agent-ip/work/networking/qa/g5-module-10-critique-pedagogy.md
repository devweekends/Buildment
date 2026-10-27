# Module 10 critique, lens: pedagogy (G5)

Read all twelve chapters against in/04 (roadmap rows 10.1 to 10.12), in/13 (challenge 7 READMEs and scripts), in/14 (earlier chapters), the critic lenses in 06-quality-gates.md and the forbidden patterns in 03-authoring-standards.md. The technical critic's fixes (critique-technical.md) were kept. 10.10 keeps its new title, "Build: a wrong announcement and the filter that stops it", as asked. Titles, types and minutes of every other chapter match the roadmap.

| # | Sev | Chapter | Problem | Fix applied |
|---|---|---|---|---|
| 1 | S2 | 10.10 | The quiz asked about r2 announcing the whole /24, which the Test section answers word for word just above it. Reading comprehension, not understanding | New quiz: r1, the real owner, announces its own 198.51.100.0/25. The learner must apply `net =` (exact block) to a case the chapter does not spell out. Correct option moved to position 1 |
| 2 | S2 | 10.8 | The quiz (filter in r1 only) was answered verbatim in the Gap 2 text ("With only r1's filter, the ping would go out through r2 and the answer would come back direct") | Mirror case: the filter in r3 only. Same options, key now "out direct, back through r2", explanations rewritten |
| 3 | S3 | 10.2 | The glossary row "Peer, BGP neighbour" defined peer as any BGP neighbour, while the picture above it used peer in the business sense of 10.4 ("its peer, or its provider") before that sense is taught | Row is now "BGP neighbour ... BGP's own word for it is peer"; the picture says "its BGP neighbour"; the beat says peer gets a second, business meaning in 10.4 |
| 4 | S3 | 10.4 | "Your own number per neighbour" and "its own number per neighbour, called local preference": in this module "number" means AS number, so a beginner can read local preference as an AS number | Heading, beat, legend and glossary say "value" and state that it is not an AS number |
| 5 | S3 | 10.4 | Heading "Routes from above go only down" covers peers too, who are not above | "Routes from providers and peers go only down" |
| 6 | S3 | 10.7 | The README's guess (does the ping fail at once or after a while?) was asked only after the chapter had shown the answer | New predict before the part 2 commands, with the 90-second hold time from 10.3 as the plausible distractor; the later sentence now says "Back to your guess" |
| 7 | S3 | 10.9 | Roadmap row asks for a predict per incident ("would RPKI have stopped it?"); Facebook 2021 had none | New predict before the Facebook beat: would origin validation have kept the DNS servers reachable? Key: no, there was no route left to check |
| 8 | S3 | 10.9 | Adding #7 took the chapter to 4 interactions (audit cap 3). Quiz 1 (YouTube with a /22 ROA) nearly duplicated the gate's incident question in 10.12, so it primed the gate answer | Quiz 1 removed; the gate keeps the YouTube RPKI question, quiz 2 (maximum length) stays |
| 9 | S3 | 10.10 | Gapped part, but Gap 1's full answer sat in the main text with no nudge first, so the support did not fade | A nudge (parts 1 to 3 use `in_ns` and `ip addr add`) and the README's step-3 shape moved into a fold, "The shape for Gap 1, if you are stuck" |
| 10 | S3 | 10.1 | The fallback trace pointed only to the README in the repository; a phone reader cannot open it, and the technical critic put the trace in 10.12 | Added that gate 10.12 prints the same trace and lookups in a fold |
| 11 | S3 | 10.1 | Objective "steal and protect a block" no longer matches the retitled 10.10 | "make a wrong announcement and stop it with a filter, in your own lab" |
| 12 | S3 | 10.2 | "BGP table" used before BGP is taught (10.3) | The legend of the counts picture defines it: the list of routes one router has learned from its neighbours |
| 13 | S3 | 10.3 | "a TCP connection to port 179, from module 5" reads as if port 179 were taught in module 5 | "a TCP connection, as in module 5, to port 179" |
| 14 | S3 | 10.5 | "A user of one visits a website": generic "a user" (forbidden pattern) | "Your home is a customer of one, and you visit a website hosted in the other" |
| 15 | S3 | 10.6 | "the two that most often fail on the first try": an unsourced frequency claim. Also "they check the awkward cases first" contradicts "the tests come in the order of the steps" | "are easy to fail on the first try"; "The tests check each step in order, then the awkward cases" |
| 16 | S3 | 10.7 | "the two lines that surprise most people": template voice, unsupported | "two lines that look optional but are not" |
| 17 | S3 | all | Correct position pattern: 6 of 8 predicts had the key first, and 8 of the 13 quizzes in 10.1 to 10.10 had key 0 | Predicts in 10.7, 10.9 (Cloudflare) and 10.10 swapped; quizzes in 10.5 and 10.7 reordered to key 2; 10.8 and 10.10 now key 1. Now predicts 5 first / 5 second; quizzes across 10.1 to 10.11 are 4 at 0, 8 at 1, 5 at 2 |
| 18 | S3 | 10.12 | Comma splice: "or with a labelled diagram, a photo of a drawing on paper is fine" | Split into two sentences |

Counts: S1 0, S2 2, S3 16. All fixed.

## Not fixed, and why

- 10.4: the roadmap asks for "Predict the chosen path in three small maps". The chapter has two maps and one predict, plus two quizzes. A predict for map 2 was written and then removed, because the audit caps a Learn chapter at 3 interactions and both quizzes are worth keeping (quiz 2 carries the technical critic's fix). Suggest the roadmap row be changed to match, or one quiz be moved to 10.11.
- 10.10: Gap 2 cannot really be a gap. The README itself prints the whole filter in "The filter, line by line", and the chapter needs the same line to teach it. Suggest the template show the filter with the accept line as `if ... then accept;` and keep the full line only in the hint ladder.
- 10.2: the roadmap says "Sort ten AS numbers"; the chapter sorts nine different numbers across one predict and two quizzes. That is close enough to the outcome, so it was left.
- The part 4 README's heading still says "steal a block". It is a template file, not a chapter.

## Checks run after the edits

- `audit-course.mjs`: Needs work: 0 (it was 2 after the first pass, from the interaction cap; see #8 and the 10.4 note).
- `check_fences.py`: problems: 0.
- Every predict has two options and a correctOptionId. No en or em dashes, no `<br/>`. No code exercise test changed.
