---
artifact: module-brief
course: networking
module: 02-ip-addresses
version: 1
owner: curriculum-architect
roadmap_version: 3
roadmap_confirmed: true
---

# Module 2: IP addresses, and why we ran out

Opening question (roadmap): *The world's free pool of IPv4 addresses ran out in 2011. Your phone got an address this morning. How?*

## Outcome

The learner can convert an IPv4 address between dotted form, binary and one number by hand, read any `/n` as a size and a mask, classify an address as public, private, shared or special against the IANA registry, and explain to a friend why private ranges and NAT exist (O2, part of O3). They have written `ipToNumber`, `numberToIp` and `classify` in JavaScript. They can name the question NAT must answer, which module 6 answers in full.

## Why this module exists

Module 1 left the learner holding two numbers and one question: why does my computer say `192.168.1.23` when a website sees something else? Everything later (masks, subnets, routes, NAT) needs an address to be a number with a size, not a string of dots. This module also gives the reason private ranges exist, using the shortage, so NAT arrives as a consequence rather than a rule. Why before what: the shortage comes first, the arithmetic second, the private ranges third.

## Prerequisites

Module 1 is complete: `own-addresses` (1.1) and `packet-fields` (1.5) are used here. Entry prerequisite: `js-basics` (functions, arrays, numbers). Binary numbers and JavaScript bit operators are taught here (2.2 by hand, 2.5 in code), not assumed. Chapter `requires` come from `timeline.yaml`. A module 1 learner who skipped the lab can still do the whole module: nothing here needs the lab.

## Chapters

| # | Chapter | Type | Min | Outcome | Requires | Introduces | Evidence |
|---|---|---|---|---|---|---|---|
| 2.1 | 4.3 billion was supposed to be enough | Read | 10 | Read the four exhaustion dates (IANA 2011, APNIC 2011, ARIN 2015, RIPE NCC 2019) and say what "ran out" means | own-addresses | exhaustion | none (read) |
| 2.2 | An address is one 32-bit number | Learn | 35 | Convert between dotted form, binary and one number, by hand | exhaustion | ip-as-number | unassisted drills |
| 2.3 | From classes to CIDR | Learn | 45 | Explain how fixed classes wasted addresses and grew routing tables, read any `/n`, show how one CIDR block can stand for many | ip-as-number | classful, cidr, aggregation (reinforces exhaustion) | unassisted drills |
| 2.4 | Private, shared and special addresses | Learn | 40 | Classify addresses as public, private, shared or special; see one packet's address rewritten by a router, labelled "full story in module 6" | cidr | address-kinds, nat-first-look (reinforces own-addresses) | classification check |
| 2.5 | Code: addresses as numbers | Code | 45 | Implement `ipToNumber`, `numberToIp` and `classify`; learn `>>> 0` first | ip-as-number, address-kinds, js-basics | js-bitops | graded code tests |
| 2.6 | IP addresses | Check | 15 | Convert, size and classify by hand, with two questions from module 1 | address-kinds | none (reinforces ip-as-number, cidr, packet-fields) | quiz |
| 2.7 | Why your phone starts with 192.168 or 10 | Gate | 20 | Explain private ranges and the shortage to a friend; name the question NAT must answer | address-kinds, nat-first-look | none (reinforces exhaustion) | explanation for a friend |

Core 210 minutes. Slow path 254 minutes (a quarter more on Read, Learn and Code).

### 2.1 4.3 billion was supposed to be enough (Read, 10 min)
- Hook: the free pool ran out in 2011 and your phone got an address this morning. Claim: "ran out" means the registries' free pool is empty; addresses did not stop working, they are now traded and shared [S15, S16]. Do not write "the internet ran out of addresses".
- Worked example: 2^32 = 4,294,967,296 addresses (derived, "4.3 billion"). IANA gives out /8 blocks, each 1/256 of the space; the last five were split equally among the five registries by a 2009 policy; IANA's pool emptied 3 February 2011 [S13]. APNIC took its final /8 on 15 April 2011 [S14]; ARIN reached zero on 24 September 2015, with a waiting list and transfers since [S16]; RIPE NCC ran out on 25 November 2019, with a waiting list giving eligible members one /24 [S15]. Care: RIPE's earlier "last /8" stage is unverified: leave it out.
- Diagram: MermaidDiagram, a `timeline` of the four dates (flowchart left to right if the reader rejects `timeline`). Claim: the pool emptied region by region over eight years while the internet kept working.
- Interactive: none (Read). The `RealWorldEvent` is the IANA exhaustion. PREDICT first: "In 2011 the free pool ran out. What happened to websites already using IPv4 addresses?" (nothing changed for them).
- Assessment: one PREDICT, one QUIZ (a new provider in 2018 asks ARIN for addresses: what do they find? a waiting list or the transfer market [S16]). Near miss: the "stopped working" misconception. At 10 minutes the 1,200-word floor leaves no room for tasks (see Roadmap issues 4).

### 2.2 An address is one 32-bit number (Learn, 35 min)
- Hook: why is `192.168.1.256` not an address? Claim: each dotted part is one byte (8 bits, 0 to 255), so an address is 32 bits, which is one number from 0 to 4,294,967,295 [S1]; the dots are for people. 256 does not fit in 8 bits.
- Worked example: `192.168.1.23` is `11000000.10101000.00000001.00010111`, and 192 x 16,777,216 + 168 x 65,536 + 1 x 256 + 23 = 3,232,235,799 (checked by script). `10.0.0.1` is 167,772,161. Hand method: write 128 64 32 16 8 4 2 1, subtract from the left. Care: do not claim what "010.1.1.1" means to other tools; say only that this course rejects leading zeros (2.5 spec).
- Diagram: MermaidDiagram flowchart: four bytes, 32 bits, one number, three views of one value.
- Interactive: `net-addr-bits` (`[addr: bits, drill]`). PREDICT first: "The rightmost bit of `192.168.1.23` is 1. You flip it. What is the address?" (`192.168.1.22`). Then flip any of 32 bits, then unassisted drills with no calculator.
- Assessment: one PREDICT, one QUIZ (which dotted address is 167,772,161). BigWordAlert on "IPv4 address". Near miss: reading `192.168.1.23` as the decimal number 19216823 (the dots are not digits); writing a part above 255.

### 2.3 From classes to CIDR (Learn, 45 min)
- Hook: in 1993 a company with 300 computers could get a block with 254 usable addresses or one with 65,534. 254 is too few. What does taking the big one do to the internet? Claim: fixed classes forced a bad choice, so the class B space ran out first and routing tables grew [S5, S6]; CIDR allows any prefix length and lets one entry stand for many.
- Worked example: classes by leading bits: A starts `0`, B `10`, C `110` [S1]; 128 class A, 16,384 class B (65,536 each), 2,097,152 class C (254 hosts) [S6]. Five fictional organisations needing 30, 300, 700, 2,000 and 5,000 computers get one class B each (one class C for the 30): 254,360 usable addresses unused. By CIDR they get `/27`, `/23`, `/22`, `/21` and `/19`: 3,768 unused (hand-computed here; the canvas library must reproduce both). Aggregation: `10.8.0.0/24` and `10.8.1.0/24` are one `10.8.0.0/23`. Care: the "254 is too small, 65,536 too big" reasoning is not a sourced quote (dossier): derive it from the class sizes. RFC 1519 is September 1993 [S5]; RFC 4632 replaces it [S6].
- Diagram: MermaidDiagram flowchart: two customer blocks, one provider block, one announced route. Claim: aggregation turns many routes into one.
- Interactive: `net-addr-cidr` (`[addr: allocate, prefix, drill]`, three tabs of one canvas). PREDICT first: "Five organisations take classful blocks. How many usable addresses go unused in total?" (about 250,000). Then hand out blocks by class, then by CIDR, drag the prefix, then drills.
- Assessment: one PREDICT, one QUIZ (size and mask of a `/26`: 64 addresses, `255.255.255.192`). ComparePanel: class versus CIDR for the 300-computer company. Near miss: counting usable addresses as 2^n instead of 2^n minus 2 (state the "minus 2" is derived; `/31` and `/32` wait for module 3).

### 2.4 Private, shared and special addresses (Learn, 40 min)
- Hook: your laptop and millions of others are all `192.168.1.x` right now. Why is that allowed? Claim: some ranges are set aside for use inside networks and are never routed on the public internet, so many networks can reuse them; the price is that they mean nothing outside. Four kinds: public, private, shared, special.
- Worked example (twelve addresses to sort): `192.168.1.23` private, `10.20.143.7` private, `172.17.0.3` private, `172.31.255.254` private, `172.32.0.1` public (private ends at `172.31.255.255`), `100.72.14.9` shared, `127.0.0.1` special, `169.254.12.7` special (what a Windows or macOS computer gives itself when DHCP fails [S12]), `203.0.113.45` special (documentation, a stand-in for a public address [S10]), `0.0.0.0` special, `192.169.1.1` public, `1.1.1.1` public (a real address, named in the Cloudflare incident [S50]; see Roadmap issues 3). Private blocks [S8], shared block [S11], special rows [S9] (registry updated 2025-10-09).
- Diagram: MermaidDiagram flowchart as a decision list: in `10/8`, `172.16/12` or `192.168/16`? private; in `100.64/10`? shared; in a special row? special; otherwise public. Claim: classifying is a lookup against a short list.
- Interactive: `net-addr-classify` (`[addr: classify]`) plus a three-step first look at NAT: laptop `192.168.1.23` to router to server `203.0.113.80`; the router rewrites the source to its outside address (address rewritten, port kept, dossier 5.6); the reply comes back. Labelled "full story in module 6". PREDICT first: "The server receives the packet. Which source address does it see?" Delivered as `TraceRequest` so the chapter keeps one canvas (see Roadmap issues 2). The visible Callout says documentation ranges stand in for real public addresses (decision 11).
- Assessment: one PREDICT, one QUIZ (a colleague sets `172.32.0.5` as "private": what is wrong). BigWordAlert on "private address". Near miss: `172.16/12` read as `/16`; `192.169` read as private; `100.64.0.0/10` treated as private.

### 2.5 Code: addresses as numbers (Code, 45 min)
- Exercise: one `codeexercise` with three exports. `ipToNumber(ip: string): number` (0 to 4294967295), `numberToIp(n: number): string`, `classify(ip: string): "public" | "private" | "shared" | "special"`. Signatures are proposals: the roadmap gives only the one-line spec.
- Input format: a dotted string with exactly four parts, each one to three digits, no leading zero unless the part is `0`, no spaces or signs, value 0 to 255. Invalid input throws an `Error` whose message starts `invalid address`. The prompt states the prefix list: private `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`; shared `100.64.0.0/10`; special `0.0.0.0/8`, `127.0.0.0/8`, `169.254.0.0/16`, `192.0.2.0/24`, `198.51.100.0/24`, `203.0.113.0/24`, `198.18.0.0/15`, `240.0.0.0/4`; everything else public. The list is shorter than the full registry: say so. No test uses `224.0.0.0/4` (see Roadmap issues 3).
- Worked example: `255 << 24` prints `-16777216` in JavaScript; `(255 << 24) >>> 0` prints `4278190080` (checked by script). The chapter teaches `<<`, `|`, `>>>`, `& 255` and `>>> 0` first.
- Test list: ipToNumber: `192.168.1.23` is 3232235799; `10.0.0.1` is 167772161; `0.0.0.0` is 0; `255.255.255.255` is 4294967295 (unsigned); `128.0.0.0` is 2147483648 (sign bit); throws on `192.168.1.256`, `1.2.3`, `1.2.3.4.5`, `01.2.3.4`, `1..3.4`, `1.2.3.-4`, `a.b.c.d`, empty string, a leading space. numberToIp: 3232235799, 0, 4294967295, 2147483648; five round trips; throws on -1, 4294967296, 1.5. classify: `172.16.0.0`, `172.31.255.255` private; `172.15.255.255`, `172.32.0.0` public; `100.64.0.0`, `100.127.255.255` shared; `100.128.0.0` public; `127.0.0.1`, `169.254.1.1`, `203.0.113.45`, `0.0.0.0`, `255.255.255.255`, `240.0.0.1`, `198.19.255.255` special; `192.169.1.1`, `1.1.1.1` public.
- Hints: "shift the running total left by 8 before you add the next part"; "`>>> 0` turns a signed 32-bit result into an unsigned one"; "check each part against 0 to 255 before you build the number". A reference helper (`ipToNumber`) unlocks after three failed attempts so `classify` never depends on a failed step.
- Diagram: MermaidDiagram flowchart: string, four parts, number, compared with ranges, class. Claim: convert once, then compare numbers. Assessment: one CODE and one PREDICT (what `255 << 24` prints), before the exercise. Near miss: a `classify` that checks string prefixes and calls `172.32.x.x` private.

### 2.6 IP addresses (Check, 15 min)
- Five QUIZ fences in `2.6-ip-addresses-quiz.md`: three new (which number is `192.168.0.1`: 3232235521; size of a `/26`; is `172.32.0.5` private) and two from module 1 (which number in a capture line is the TTL; which of the two addresses a website replies to). Every option gets one reason; no teaching text.

### 2.7 Why your phone starts with 192.168 or 10 (Gate, 20 min)
- Evidence: a written, voice or diagram explanation for a friend: why a phone's address starts with `192.168` or `10`, why that is allowed, and the question NAT must answer. Expected shape of a strong answer: the free pool ran out, private ranges are reused inside many networks and never routed publicly, so something must translate; the question is how a reply finds the right device when many share one outside address. Gate branches: none.

## Interactions

Rules as in module 1 (tags, free fences, one canvas, a diagram in every chapter that is not a Check or Gate).

| Ch | Top-level components | Tags (est.) | Assessments | Prose floor |
|---|---|---|---|---|
| 2.1 | LearningObjectives, MermaidDiagram, RealWorldEvent, GlossaryTerm | 6 | PREDICT, QUIZ | 1,200 |
| 2.2 | MermaidDiagram, InteractiveCanvas, BigWordAlert, GlossaryTerm, Callout | 7 | PREDICT, QUIZ | 1,200 |
| 2.3 | MermaidDiagram, InteractiveCanvas, BigWordAlert (CIDR), GlossaryTerm, ComparePanel | 10 | PREDICT, QUIZ | 1,200 |
| 2.4 | MermaidDiagram, InteractiveCanvas, TraceRequest, BigWordAlert, Callout, GlossaryTerm | 11 | PREDICT, QUIZ | 1,200 |
| 2.5 | MermaidDiagram, Callout, GlossaryTerm | 5 | PREDICT, CODE | 1,200 |
| 2.6 | none | 0 | QUIZ x5 | quiz only |
| 2.7 | Checklist, LearningLog, ChapterRecap | 3 | OPEN_QUESTION | 700 |

`LearningObjectives` in 2.1, `ChapterRecap` in 2.7. One RealWorldEvent (2.1); no MustRead needed. Diagram plan: five Mermaid diagrams, one in every chapter from 2.1 to 2.5; the module diagram requirement is met. Unassisted drills inside `net-addr-bits` and `net-addr-cidr` are the graded evidence for 2.2 and 2.3 (O3).

## Canvases

| Slug (proposed) | Renderer | Chapter | Claim | Stated limit | Fallback if not built |
|---|---|---|---|---|---|
| `net-addr-bits` | `[addr]` bits + drill | 2.2 | An address is 32 bits and one number; flipping a bit changes both views | IPv4 only; no hex view | Static worked table; drills become ordinary quiz questions (decision 3) |
| `net-addr-cidr` | `[addr]` allocate + prefix + drill | 2.3 | Classes waste addresses; CIDR sizes blocks to need and one block can stand for many | Five fixed organisations; counts addresses and routing entries only, no real routing | ComparePanel table of the 254,360 versus 3,768 result plus quiz questions |
| `net-addr-classify` | `[addr]` classify | 2.4 | An address is public, private, shared or special by a list lookup | The stated prefix list, not the full registry; no multicast | Static decision list plus quiz questions |
| `net-seq-nat-first-look` | `[sequence]` laptop, router, server | 2.4 | A router rewrites a packet's source address | Three steps; no input; port shown unchanged ("full story in module 6") | `TraceRequest` with three `TraceStep` and a Predict before it (the plan above) |

The `[addr]` library is the reference solution of 2.5, 3.7 and 3.8 (roadmap), so the canvas and the tests cannot disagree. `[addr]` must be built before this module's chapters are written (decision 3). 2.4 has two registered pieces in the roadmap but the audit allows one canvas per chapter (Roadmap issues 2).

## Gate

Gate 2.7 (20 minutes, review within three days, learners carry on). Evidence: the friend explanation, plus 2.5 tests passing.
- Checklist: I can write an address as a number by hand; I can read a `/n` as a size; I can say which kind `172.32.0.1` is and why; my `ipToNumber`, `numberToIp` and `classify` tests pass.
- LearningLog: which step of the shortage story you could not have explained a week ago; where your own phone's address falls.
- OPEN_QUESTION: "Explain to a friend why their phone starts with 192.168 or 10, why that is allowed, and what question a router doing NAT must answer." `submissionMode: text`, `allowSpeechInput: true`; link-only answers need `minWords: 0`.
- ChapterRecap: ran out means the free pool; an address is one 32-bit number; CIDR sizes blocks to need; private ranges are reused and not routed; one router rewrite is the first look at NAT.

## Risks

- Likeliest stall: 2.3 (45 minutes, three ideas: classes, CIDR, aggregation) and 2.5 (JavaScript signed 32-bit results). Mitigation: keep the five-organisation numbers fixed; the `>>> 0` step comes first with a PREDICT; the helper unlock after three failed attempts; the slow path adds a quarter.
- Accuracy traps from the dossier: "ran out" is the free pool, not a failure [S15, S16]; `172.16/12` ends at `172.31.255.255`; Class D `224/4` is unverified (RFC 1112 not fetched) and the RIPE NCC 2012 "last /8" is unverified: use neither; the "right size" class B reasoning is derived, not quoted; subnetting masks are taught contiguous only [S7]; the documentation blocks are only three /24s [S10]; `100.64.0.0/10` is shared space, not private [S11]; port behaviour in the first look must match dossier 5.6 (address rewritten, port kept unless a clash).
- Do not mention RIR waiting-list or transfer-market numbers beyond the sources.

## Roadmap issues

1. `[addr: drill]` is "reused in the checks" (roadmap), but Check chapters are quiz-only and canvases are never allowed in quiz chapters. This brief writes check questions in the drill's style as ordinary quiz fences.
2. 2.4 lists `[addr: classify]` and `[sequence: laptop, router, server]`, two canvases, but `audit-course.mjs` allows one canvas per chapter. This brief keeps one canvas and uses `TraceRequest` for the NAT first look. Either relax the audit or choose one piece.
3. 2.4 and 2.5 need at least one genuinely public address, but decision 11 allows only documentation ranges, which the registry classes as special. This brief uses `1.1.1.1` (named in a sourced incident, [S50]) once in the sort and the tests; confirm. Also `224.0.0.0/4` is not among the dossier's registry rows, so no sort or test uses it.
4. Read chapters of 10 minutes (2.1) cannot hold the 1,200-word floor plus any task for second-language readers; the slow path (+25%) is the only buffer. Code chapters are not named in the brief's word-floor rule; the audit applies 1,200, which this brief follows.
5. 2.5 is "one skill per exercise" with three functions; this brief treats it as one `codeexercise` with three exports and per-function tests, within the playbook's one-CODE-per-chapter budget. The roadmap gives no signatures; those above are proposals.
