---
artifact: canvas-spec
course: networking
chapter: 2.1, 2.3, 2.4
slug: net-m2-scene-free-pool, net-m2-allocate-class, net-m2-allocate-cidr, net-m2-prefix, net-m2-cidr-drill, net-m2-scene-same-address, net-m2-classify
version: 1
owner: interaction-designer
---

# Canvas spec: module 2 address modes and two scenes

New modes of the existing `[addr]` renderer (`net-m2-address-bits/AddressBitsCanvas.tsx` and `models/net-address.ts`), plus two `scene` data files. Same register, frame, tones and accessibility rules as `net-m2-address-bits.md`. Following `proposals/2026-10-26-canvases-from-markdown.md`, every `data.ts` holds plain serialisable parameters (numbers, strings, arrays), validated by a schema in the model, so each slug can become a Markdown `canvas` fence later without new code. All numbers below were checked by script; tests assert them.

## `net-m2-allocate-class` and `net-m2-allocate-cidr` (playable, mode `allocate`)

**Claim:** fixed classes forced a 300-computer company into a block of 65,534 usable addresses; CIDR sizes each block to the need.

**Data:** five fictional organisations needing 30, 300, 700, 2,000 and 5,000 computers.
- **Class mode:** the learner gives each organisation class C (254 usable) or class B (65,534 usable). A block too small is refused ("300 computers do not fit in 254"). Total unused when every choice is right: 224 + 65,234 + 64,834 + 63,534 + 60,534 = 254,360.
- **CIDR mode:** the learner picks a prefix for each organisation, from `/19` to `/27`. The smallest block that fits is: 30 to `/27` (30 usable), 300 to `/23` (510), 700 to `/22` (1,022), 2,000 to `/21` (2,046) and 5,000 to `/19` (8,190). Total unused: 3,768. A block that is too small is refused; a bigger one is allowed, and the waste counter rises.

**Picture:** one row per organisation with its need, its block and an unused bar; a running total of unused addresses in the verdict. The class mode also counts routing-table entries (one per block); the CIDR mode shows the same count.

**Limits:** usable is size minus two; real allocations were not this tidy.

## `net-m2-prefix` (playable, mode `prefix`)

**Claim:** the prefix length sets the block size (2^(32-n)) and the mask, together.

**Touch:** drag or step the prefix from `/8` to `/32`, on the address `10.20.143.7`.

**Shows:** prefix, mask in dotted form and in bits (network bits highlighted), block size, usable count, first and last address.

**Edge cases:** `/31` shows 2 addresses (point to point, [S70]); `/32` shows 1.

## `net-m2-cidr-drill` (playable, mode `drill`, new question kinds)

**Claim:** I can give the size and mask of any `/n` by hand.

**Question kinds:** size of a `/n` (pick from three) and mask of a `/n` (pick from three). Distractors are one prefix step away, so the slip is the realistic one. Seeded, five per set, reusing the drill frame from `net-m2-address-drill`.

## `net-m2-classify` (playable, mode `classify`)

**Claim:** every IPv4 address falls into one of four kinds: public, private (RFC 1918), shared (`100.64.0.0/10`) or special (from the IANA registry).

**Data:** twelve addresses:
- **Private:** `192.168.1.23`, `10.20.143.7`, `172.17.0.3`, `172.31.255.254`.
- **Public:** `172.32.0.1`, `192.169.1.1`, `1.1.1.1` [S50].
- **Shared:** `100.72.14.9`.
- **Special:** `127.0.0.1`, `169.254.10.20`, `203.0.113.45` (documentation, the course's stand-in), `0.0.0.0`.

**Touch:** tap an address, then a bucket; a wrong try says why ("172.32 is just past 172.31.255.255, where the private block ends").

**Model:** the same `classify()` the code exercise 2.5 tests, with the stated prefix list.

## `net-m2-scene-free-pool` (scene)

**Claim:** "ran out" means the free pool emptied, not that addresses stopped working.

**Picture:** the free pool, a bar, drains while a website keeps answering. Four date labels, each its own beat of the scene: IANA, 3 February 2011 [S13]; APNIC, 15 April 2011 [S14]; ARIN, 24 September 2015 [S16]; RIPE NCC, 25 November 2019 [S15]. Then addresses move by waiting list and transfer.

**Verdict:** "Pool empty. The web still works."

## `net-m2-scene-same-address` (scene)

**Claim:** millions of separate homes reuse the same private address, and none can see the others.

**Picture:** three homes, each with a laptop at `192.168.1.23` behind its own router; a dashed line between two homes is refused ("private addresses stay inside each home").

**Verdict:** "Same address, different homes."

## Acceptance
- Model tests for allocate totals (254,360 and 3,768), the prefix table (`/8` to `/32`), drill determinism, and the `classify()` buckets for the twelve addresses.
- Text QA clean at 375 px, light and dark.
- Registered in all three slug lists and the registry.
