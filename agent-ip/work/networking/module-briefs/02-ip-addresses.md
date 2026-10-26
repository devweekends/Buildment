---
artifact: module-brief
course: networking
module: 02-ip-addresses
version: 2
owner: curriculum-architect
roadmap_version: 3.1
roadmap_confirmed: true
agent_ip_version: 0.5.3
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
- Format (agent-ip v0.5.3): `format: beats`, 2 beats (a Read chapter has one or two); at most 70 visible words per beat; depth and the worked example go in `GoDeeper` folds; the commands the chapter asks the learner to run stay as code fences; no BigWordAlert (terms use `GlossaryTerm`). The hook and claim above stay as the chapter's opening lines.
- Beats:
  1. **The free pool emptied region by region** (fixed picture). MermaidDiagram `mmd-2-1-exhaustion-timeline` (inline, no registration). Shows: four dates on one line: IANA 2011, APNIC 2011, ARIN 2015, RIPE NCC 2019.
  2. **Ran out means the free pool is empty** (watch only). InteractiveCanvas `net-m2-scene-free-pool` (the `scene` renderer). Shows: the free pool bar drains to zero while every website keeps working; addresses then move by waiting list and transfer.
- Predict (right before beat 1, "The free pool emptied region by region"): In 2011 the free pool of addresses ran out. What happened to websites already using IPv4 addresses? Options: they stopped working / nothing changed for them / they had to change address. Answerable from: everyday intuition: a pool of new numbers emptying says nothing about numbers already in use.
- Quick check (after the last beat): (1) A new provider asks ARIN for addresses in 2018: what do they find (taught in beat 1 timeline and beat 2 text).
- Components: GlossaryTerm (IANA, regional registry, exhaustion); LearningObjectives; RealWorldEvent (IANA exhaustion); one `GoDeeper` fold per beat; about 9 of 40 JSX tags; 2 of 3 assessments.
- Near miss: The 'stopped working' misconception. Do not write 'the internet ran out of addresses'. RIPE's earlier 'last /8' stage is unverified: leave it out [S13 to S16].

### 2.2 An address is one 32-bit number (Learn, 35 min)
- Hook: why is `192.168.1.256` not an address? Claim: each dotted part is one byte (8 bits, 0 to 255), so an address is 32 bits, which is one number from 0 to 4,294,967,295 [S1]; the dots are for people. 256 does not fit in 8 bits.
- Worked example: `192.168.1.23` is `11000000.10101000.00000001.00010111`, and 192 x 16,777,216 + 168 x 65,536 + 1 x 256 + 23 = 3,232,235,799 (checked by script). `10.0.0.1` is 167,772,161. Hand method: write 128 64 32 16 8 4 2 1, subtract from the left. Care: do not claim what "010.1.1.1" means to other tools; say only that this course rejects leading zeros (2.5 spec).
- Format (agent-ip v0.5.3): `format: beats`, 4 beats; at most 70 visible words per beat, 300 to 700 visible words in all and at least 900 with the `GoDeeper` folds (the claim and worked example above are spread over the beats and their folds); one visual per beat; at least one playable beat; at most 40 JSX tags and 3 assessment interactions; no BigWordAlert (terms use `GlossaryTerm`). The hook above is the chapter's one or two opening sentences.
- Beats:
  1. **One part is one byte** (playable). InteractiveCanvas `net-m2-byte-bits` (`[addr]`). Shows: eight bit cards worth 128, 64, 32, 16, 8, 4, 2 and 1; all on is 255; adding one needs a ninth bit that is not there. Learner: tap bits and press Add 1.
  2. **Four bytes make one address** (playable). InteractiveCanvas `net-m2-address-bits` (`[addr]`). Shows: 32 bit cards in four rows with the dotted form and the single number updating together. Learner: tap any bit or type an address.
  3. **Three ways to write one address** (fixed picture). MermaidDiagram `mmd-2-2-three-ways` (inline, no registration). Shows: dotted, bits and one number are the same 32 bits.
  4. **Now do it by hand** (playable). InteractiveCanvas `net-m2-address-drill` (`[addr]`). Shows: five unassisted questions: byte to bits, bits to byte, real or not. Learner: tap bits or pick an answer, no calculator.
- Predict (right before beat 1, "One part is one byte"): Each of eight lamps is worth 128, 64, 32, 16, 8, 4, 2 or 1. Turn all eight on. What number do you get? Options: 255 / 256 / 128. Answerable from: answerable by adding the numbers in the question; no earlier chapter is needed (chapter brief 2.2).
- Quick check (after the last beat): (1) Which dotted address is the number 167,772,161 (taught in beats 2 and 4). (2) A form shows 172.16.300.4: what is wrong (taught in beat 1).
- Components: GlossaryTerm (bit, byte, IPv4 address); one `GoDeeper` fold per beat; about 11 of 40 JSX tags; 3 of 3 assessments.
- Near miss: Reading `192.168.1.23` as the decimal 192168123 (the dots are not digits); a part above 255; leading zeros (this course writes `1`, not `001`; do not claim what other tools do). Hand method: write 128 64 32 16 8 4 2 1, subtract from the left. 3,232,235,799 for `192.168.1.23` and 167,772,161 for `10.0.0.1` are checked by script.

### 2.3 From classes to CIDR (Learn, 45 min)
- Hook: in 1993 a company with 300 computers could get a block with 254 usable addresses or one with 65,534. 254 is too few. What does taking the big one do to the internet? Claim: fixed classes forced a bad choice, so the class B space ran out first and routing tables grew [S5, S6]; CIDR allows any prefix length and lets one entry stand for many.
- Worked example: classes by leading bits: A starts `0`, B `10`, C `110` [S1]; 128 class A, 16,384 class B (65,536 each), 2,097,152 class C (254 hosts) [S6]. Five fictional organisations needing 30, 300, 700, 2,000 and 5,000 computers get one class B each (one class C for the 30): 254,360 usable addresses unused. By CIDR they get `/27`, `/23`, `/22`, `/21` and `/19`: 3,768 unused (hand-computed here; the canvas library must reproduce both). Aggregation: `10.8.0.0/24` and `10.8.1.0/24` are one `10.8.0.0/23`. Care: the "254 is too small, 65,536 too big" reasoning is not a sourced quote (dossier): derive it from the class sizes. RFC 1519 is September 1993 [S5]; RFC 4632 replaces it [S6].
- Format (agent-ip v0.5.3): `format: beats`, 6 beats; at most 70 visible words per beat, 300 to 700 visible words in all and at least 900 with the `GoDeeper` folds (the claim and worked example above are spread over the beats and their folds); one visual per beat; at least one playable beat; at most 40 JSX tags and 3 assessment interactions; no BigWordAlert (terms use `GlossaryTerm`). The hook above is the chapter's one or two opening sentences.
- Beats:
  1. **Three sizes and nothing in between** (fixed picture). MermaidDiagram `mmd-2-3-classes` (inline, no registration). Shows: class A, B and C by leading bits and size: 254 usable in a class C, 65,534 in a class B.
  2. **Hand blocks to five organisations by class** (playable). InteractiveCanvas `net-m2-allocate-class` (`[addr]`). Shows: organisations needing 30, 300, 700, 2,000 and 5,000 computers each take a class block; the unused addresses pile up. Learner: drag a block to each organisation.
  3. **Hand the same five out by CIDR** (playable). InteractiveCanvas `net-m2-allocate-cidr` (`[addr]`). Shows: the same five organisations get /27, /23, /22, /21 and /19; 3,768 addresses unused. Learner: choose a prefix length for each organisation.
  4. **Drag the prefix, watch the block change** (playable). InteractiveCanvas `net-m2-prefix` (`[addr]`). Shows: prefix length, mask, size and range update together. Learner: drag the prefix length.
  5. **Many routes become one** (fixed picture). MermaidDiagram `mmd-2-3-aggregation` (inline, no registration). Shows: two customer blocks 10.8.0.0/24 and 10.8.1.0/24 are announced as one 10.8.0.0/23.
  6. **Size and mask by hand** (playable). InteractiveCanvas `net-m2-cidr-drill` (`[addr]`). Shows: generated questions on size and mask of a /n, answered without a calculator. Learner: answer by hand with instant feedback.
- Predict (right before beat 2, "Hand blocks to five organisations by class"): Five organisations take classful blocks. About how many usable addresses go unused in total? Options: about 250,000 / about 2,500 / about 25. Answerable from: beat 1 shows the class sizes (254 and 65,534) and the question lists the five needs, so the learner can add; no later idea is needed.
- Quick check (after the last beat): (1) Size and mask of a /26 (64 addresses, 255.255.255.192) (taught in beats 4 and 6).
- Components: GlossaryTerm (CIDR, prefix length, aggregation, class); ComparePanel (class versus CIDR for the 300-computer company, in the beat 3 fold); one `GoDeeper` fold per beat; about 17 of 40 JSX tags; 2 of 3 assessments.
- Near miss: Counting usable addresses as 2^n instead of 2^n minus 2 (the 'minus 2' is derived; `/31` and `/32` wait for module 3). The '254 is too small, 65,536 too big' reasoning is not a sourced quote: derive it from the class sizes. 128 class A, 16,384 class B, 2,097,152 class C [S6]. RFC 1519 is September 1993 [S5]; RFC 4632 replaces it [S6]. Hand-computed totals: 254,360 unused by class, 3,768 by CIDR; the canvas library must reproduce both.

### 2.4 Private, shared and special addresses (Learn, 40 min)
- Hook: your laptop and millions of others are all `192.168.1.x` right now. Why is that allowed? Claim: some ranges are set aside for use inside networks and are never routed on the public internet, so many networks can reuse them; the price is that they mean nothing outside. Four kinds: public, private, shared, special.
- Worked example (twelve addresses to sort): `192.168.1.23` private, `10.20.143.7` private, `172.17.0.3` private, `172.31.255.254` private, `172.32.0.1` public (private ends at `172.31.255.255`), `100.72.14.9` shared, `127.0.0.1` special, `169.254.12.7` special (what a Windows or macOS computer gives itself when DHCP fails [S12]), `203.0.113.45` special (documentation, a stand-in for a public address [S10]), `0.0.0.0` special, `192.169.1.1` public, `1.1.1.1` public (a real address, named in the Cloudflare incident [S50], allowed as a real public address in classification by roadmap v3.1). Private blocks [S8], shared block [S11], special rows [S9] (registry updated 2025-10-09).
- Format (agent-ip v0.5.3): `format: beats`, 5 beats; at most 70 visible words per beat, 300 to 700 visible words in all and at least 900 with the `GoDeeper` folds (the claim and worked example above are spread over the beats and their folds); one visual per beat; at least one playable beat; at most 40 JSX tags and 3 assessment interactions; no BigWordAlert (terms use `GlossaryTerm`). The hook above is the chapter's one or two opening sentences.
- Beats:
  1. **Millions of homes share 192.168.1.x** (watch only). InteractiveCanvas `net-m2-scene-same-address` (the `scene` renderer). Shows: many separate homes each with a laptop at 192.168.1.23, and none can see the others.
  2. **Four kinds of address** (fixed picture). MermaidDiagram `mmd-2-4-four-kinds` (inline, no registration). Shows: a decision list: in 10/8, 172.16/12 or 192.168/16, private; in 100.64/10, shared; in a special row, special; else public.
  3. **Sort twelve real addresses** (playable). InteractiveCanvas `net-m2-classify` (`[addr]`). Shows: twelve addresses from real outputs, each placed in public, private, shared or special. Learner: drop each address into a bucket; a wrong try says why.
  4. **The edges that fool people** (fixed picture). MermaidDiagram `mmd-2-4-edges` (inline, no registration). Shows: 172.16.0.0 to 172.31.255.255 is private, 172.32.0.1 is not; 192.169.1.1 is public; 100.64/10 is shared, not private.
  5. **The router changes the source address** (step through). TraceRequest `trace-2-4-first-look-nat` (three TraceStep). Shows: laptop 192.168.1.23 to router to server 203.0.113.80: the router rewrites the source to its outside address, port unchanged; the reply comes back. Learner: step through three TraceStep.
- Predict (right before beat 5, "The router changes the source address"): The server receives the packet. Which source address does it see? Options: the laptop's 192.168.1.23 / the router's outside address / the server's own address. Answerable from: module 1 showed that a website sees a different address from the computer's own (1.1); the question asks the learner to use that.
- Quick check (after the last beat): (1) A colleague sets 172.32.0.5 as 'private': what is wrong (taught in beats 2 and 4).
- Components: GlossaryTerm (private address, shared address, special address, documentation range); 1 Callout; one `GoDeeper` fold per beat; about 18 of 40 JSX tags; 2 of 3 assessments.
- Near miss: `172.16/12` read as `/16`; `192.169` read as private; `100.64.0.0/10` treated as private. Beat 5 states the question module 6 answers (many devices share one outside address, so how does a reply find the right one?) because gate 2.7 asks the learner to name it. `1.1.1.1` [S50] is allowed as a real public address in classification (roadmap v3.1); fictional hosts use documentation ranges. Private blocks [S8], shared block [S11], special rows [S9]. Port behaviour in the first look must match dossier 5.6 (address rewritten, port kept unless a clash).

### 2.5 Code: addresses as numbers (Code, 45 min)
- Exercise: one `codeexercise` with three exports. `ipToNumber(ip: string): number` (0 to 4294967295), `numberToIp(n: number): string`, `classify(ip: string): "public" | "private" | "shared" | "special"`. Signatures are proposals: the roadmap gives only the one-line spec.
- Input format: a dotted string with exactly four parts, each one to three digits, no leading zero unless the part is `0`, no spaces or signs, value 0 to 255. Invalid input throws an `Error` whose message starts `invalid address`. The prompt states the prefix list: private `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`; shared `100.64.0.0/10`; special `0.0.0.0/8`, `127.0.0.0/8`, `169.254.0.0/16`, `192.0.2.0/24`, `198.51.100.0/24`, `203.0.113.0/24`, `198.18.0.0/15`, `240.0.0.0/4`; everything else public. The list is shorter than the full registry: say so. No test uses `224.0.0.0/4`, which is not among the dossier's registry rows.
- Worked example: `255 << 24` prints `-16777216` in JavaScript; `(255 << 24) >>> 0` prints `4278190080` (checked by script). The chapter teaches `<<`, `|`, `>>>`, `& 255` and `>>> 0` first.
- Test list: ipToNumber: `192.168.1.23` is 3232235799; `10.0.0.1` is 167772161; `0.0.0.0` is 0; `255.255.255.255` is 4294967295 (unsigned); `128.0.0.0` is 2147483648 (sign bit); throws on `192.168.1.256`, `1.2.3`, `1.2.3.4.5`, `01.2.3.4`, `1..3.4`, `1.2.3.-4`, `a.b.c.d`, empty string, a leading space. numberToIp: 3232235799, 0, 4294967295, 2147483648; five round trips; throws on -1, 4294967296, 1.5. classify: `172.16.0.0`, `172.31.255.255` private; `172.15.255.255`, `172.32.0.0` public; `100.64.0.0`, `100.127.255.255` shared; `100.128.0.0` public; `127.0.0.1`, `169.254.1.1`, `203.0.113.45`, `0.0.0.0`, `255.255.255.255`, `240.0.0.1`, `198.19.255.255` special; `192.169.1.1`, `1.1.1.1` public.
- Hints: "shift the running total left by 8 before you add the next part"; "`>>> 0` turns a signed 32-bit result into an unsigned one"; "check each part against 0 to 255 before you build the number". A reference helper (`ipToNumber`) unlocks after three failed attempts so `classify` never depends on a failed step.
- Diagram: MermaidDiagram flowchart: string, four parts, number, compared with ranges, class. Claim: convert once, then compare numbers. Assessment: one CODE and one PREDICT (what `255 << 24` prints), placed after the Callout that says JavaScript bit operators work on signed 32-bit numbers and the top bit is the sign bit (2.2 showed `128.0.0.0` as the top bit), so the answer follows from what was taught (G3 never-ask fix). Near miss: a `classify` that checks string prefixes and calls `172.32.x.x` private.

### 2.6 IP addresses (Check, 15 min)
- Five QUIZ fences in `2.6-ip-addresses-quiz.md`, quiz-only with no canvas; the spaced practice is plain quiz questions in the drill style: three new (which number is `192.168.0.1`: 3232235521; size of a `/26`; is `172.32.0.5` private) and two from module 1 (which number in a capture line is the TTL; which of the two addresses a website replies to). Every option gets one reason; no teaching text.

### 2.7 Why your phone starts with 192.168 or 10 (Gate, 20 min)
- Evidence: a written, voice or diagram explanation for a friend: why a phone's address starts with `192.168` or `10`, why that is allowed, and the question NAT must answer. Expected shape of a strong answer: the free pool ran out, private ranges are reused inside many networks and never routed publicly, so something must translate; the question is how a reply finds the right device when many share one outside address. Gate branches: none.

## Interactions

Updated for agent-ip v0.5.3 (Learn chapters are visual-first beats). Per-chapter beats, predicts and quizzes are in each chapter block above and, with the density counts, in `interaction-map.yaml`. Counting rules from `audit-course.mjs`: a tag is any opening `<Component`; child tags (Step, TerminalLine, CompareColumn, TraceStep) count toward the total but not toward the 6 top-level names; quiz, predict and openquestion fences are free of tags and count as assessments; command output goes in plain code fences, not TerminalBlock.

Budgets by chapter type (sponsor decision at G2C, 2026-10-26, and `03-authoring-standards.md` → Visual-first Learn chapters):

- Learn: beats rules. Four to eight beats, one visual each, at most 70 visible words per beat, 300 to 700 visible words and at least 900 with `GoDeeper` folds, at least one playable beat, at most 40 JSX tags, at most 3 assessment interactions (one Predict before the key beat, one or two quiz questions at the end), no BigWordAlert.
- Read: one or two beats, at most 70 visible words each, depth in folds, no BigWordAlert.
- Build: at least 1,200 prose words; at most 6 top-level components and 25 JSX tags; a diagram; at most one BigWordAlert and only for a load-bearing term.
- Code, Lab and Gate: at least 700 prose words; same component and tag limits as Build; a Gate has no canvas and no new content.
- Check: quiz-only (three to five questions, one instrument), no canvas, no lesson text.

| Ch | Format | Components | JSX tags (est.) | Assessments | Text budget |
|---|---|---|---|---|---|
| 2.1 | beats (2) | 2 beat visuals (1 canvas, 1 diagram), GoDeeper x2, GlossaryTerm x3, LearningObjectives, RealWorldEvent | 9 | PREDICT, QUIZ | one or two beats, at most 70 words each |
| 2.2 | beats (4) | 4 beat visuals (3 canvas, 1 diagram), GoDeeper x4, GlossaryTerm x3 | 11 | PREDICT, QUIZ x2 | at most 70 words a beat; 300 to 700, 900+ with folds |
| 2.3 | beats (6) | 6 beat visuals (4 canvas, 2 diagram), GoDeeper x6, GlossaryTerm x4, ComparePanel (in a fold) | 17 | PREDICT, QUIZ | at most 70 words a beat; 300 to 700, 900+ with folds |
| 2.4 | beats (5) | 5 beat visuals (2 canvas, 3 diagram), GoDeeper x5, GlossaryTerm x4, Callout x1 | 18 | PREDICT, QUIZ | at most 70 words a beat; 300 to 700, 900+ with folds |
| 2.5 | prose | MermaidDiagram, Callout, GlossaryTerm | 5 | PREDICT, CODE | 700 prose words |
| 2.6 | prose | none | 0 | QUIZ x5 | quiz only |
| 2.7 | prose | Checklist, LearningLog, ChapterRecap | 3 | OPEN_QUESTION | 700 prose words |

`LearningObjectives` in 2.1, `ChapterRecap` in 2.7. One RealWorldEvent (2.1); no MustRead needed. Unassisted drills inside `net-m2-address-drill`, `net-m2-cidr-drill` are the graded evidence for 2.2 and 2.3 (O3).

Diagram plan: Beat diagrams: the exhaustion timeline (2.1), three ways to write one address (2.2), the class sizes and the aggregation picture (2.3), the four-kinds decision list and the range-edges picture (2.4). The Code chapter 2.5 has one flowchart (string, four parts, number, compare). Module requirement met many times over.

## Canvases

Canvas decisions (interaction designer, G3):

- The address is the module's causal model: the `[addr]` renderer (modes byte, address, drill, allocate, prefix, classify) carries every playable beat, built on one pure model that is also the reference solution of 2.5, 3.7 and 3.8, so the canvases and the graded tests cannot disagree. The three 2.2 slugs are already specified in `canvas-specs/net-m2-address-bits.md`.
- 2.4 keeps one canvas (`net-m2-classify`) and shows the first look at NAT as a `TraceRequest` step-through, not a second canvas (roadmap v3.1).
- 2.1 is a Read chapter and uses a Mermaid timeline plus one watch-only scene; no model is needed to say that the free pool emptied.
- Check chapter 2.6 stays quiz-only; the drill-style practice there is plain quiz questions (roadmap v3.1).

Slugs follow the registry convention `net-m<module>-<name>` (graded labs keep `net-lab-`) and are proposed: none is written into a chapter until it is built and registered. The full registry with modes and chapters is in `interaction-map.yaml`. Fallbacks are named per chapter below the table.

| Slug (proposed) | Renderer | Chapter, beat | Mode | What it shows |
|---|---|---|---|---|
| `net-m2-scene-free-pool` | the scene renderer | 2.1, beat 2 | watch only | the free pool bar drains to zero while every website keeps working; addresses then move by waiting list and transfer |
| `net-m2-byte-bits` | [addr] | 2.2, beat 1 | playable | eight bit cards worth 128, 64, 32, 16, 8, 4, 2 and 1; all on is 255; adding one needs a ninth bit that is not there |
| `net-m2-address-bits` | [addr] | 2.2, beat 2 | playable | 32 bit cards in four rows with the dotted form and the single number updating together |
| `net-m2-address-drill` | [addr] | 2.2, beat 4 | playable | five unassisted questions: byte to bits, bits to byte, real or not |
| `net-m2-allocate-class` | [addr] | 2.3, beat 2 | playable | organisations needing 30, 300, 700, 2,000 and 5,000 computers each take a class block; the unused addresses pile up |
| `net-m2-allocate-cidr` | [addr] | 2.3, beat 3 | playable | the same five organisations get /27, /23, /22, /21 and /19; 3,768 addresses unused |
| `net-m2-prefix` | [addr] | 2.3, beat 4 | playable | prefix length, mask, size and range update together |
| `net-m2-cidr-drill` | [addr] | 2.3, beat 6 | playable | generated questions on size and mask of a /n, answered without a calculator |
| `net-m2-scene-same-address` | the scene renderer | 2.4, beat 1 | watch only | many separate homes each with a laptop at 192.168.1.23, and none can see the others |
| `net-m2-classify` | [addr] | 2.4, beat 3 | playable | twelve addresses from real outputs, each placed in public, private, shared or special |

Inline diagram beats (MermaidDiagram, VisualDiagram, TraceRequest; no registration): 2.1 beat 1 `mmd-2-1-exhaustion-timeline`; 2.2 beat 3 `mmd-2-2-three-ways`; 2.3 beat 1 `mmd-2-3-classes`; 2.3 beat 5 `mmd-2-3-aggregation`; 2.4 beat 2 `mmd-2-4-four-kinds`; 2.4 beat 4 `mmd-2-4-edges`; 2.4 beat 5 `trace-2-4-first-look-nat`.

Stated limits and fallbacks by chapter:

- 2.2: limit: IPv4 only; no hex view; the drill is practice, the graded check is the quiz. Fallback if not built: static worked table; the drill becomes ordinary quiz questions (decision 3).
- 2.3: limit: Five fixed organisations; counts addresses and routing entries only, no real routing. Fallback if not built: ComparePanel table of the 254,360 versus 3,768 result plus quiz questions.
- 2.4: limit: The stated prefix list, not the full registry; no multicast. Fallback if not built: static decision list plus quiz questions.
- Replays and labs: a replay falls back to a `[sequence]` of two actors (learner, lab) with Predict blocks before the key steps only, within the chapter's budget of 3 assessments; a graded lab that is blocked falls back to a diagnosis from recorded command output, graded as a quiz (roadmap).

The `[addr]` library is the reference solution of 2.5, 3.7 and 3.8 (roadmap), so the canvas and the tests cannot disagree. `[addr]` must be built before this module's chapters are written (decision 3). The 2.2 canvases follow `canvas-specs/net-m2-address-bits.md`. The first look at NAT in 2.4 is a `TraceRequest` with three `TraceStep` (laptop, router, server; port shown unchanged, 'full story in module 6'), not a second canvas.

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

## Resolved in roadmap v3.1

1. `[addr: drill]` in Check chapters: resolved. Check chapters are quiz-only and use plain quiz questions in the drill style; `[addr: drill]` stays in Learn chapters 2.2, 2.3, 3.2 and 3.5 (decision log, 2026-10-25).
2. Two canvases in 2.4: resolved. 2.4 keeps one canvas (`[addr: classify]`) and uses `TraceRequest` for the first look at NAT (decision log, 2026-10-25).
3. A public address for classification: resolved. `1.1.1.1` [S50] may be used as a real public address in classification; fictional hosts still use documentation ranges (decision 11 refined).
4. The 10-minute Read chapter and the word floor: resolved by the proposed course exception. Read, Code and Lab chapters and Gates use 700 prose words; Learn and Build use 1,200 (decision log, 2026-10-25; decided by the sponsor at G2C on 2026-10-26 and, for Learn and Read chapters, superseded by the beats rules of agent-ip v0.5.3).

## Still open

- 2.5 is treated as one `codeexercise` with three exports and per-function tests, within the one-CODE-per-chapter budget. The roadmap gives no signatures; those in 2.5 are proposals to confirm in the blueprint.
- Prose floors are decided (sponsor, G2C, 2026-10-26): Build 1,200 prose words; Code, Lab and Gate 700; Learn and Read follow the beats rules (agent-ip v0.5.3, decision log 2026-10-26); Check chapters are quiz-only.
