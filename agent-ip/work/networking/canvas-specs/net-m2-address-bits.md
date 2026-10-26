---
artifact: canvas-spec
course: networking
chapter: 2.2
slug: net-m2-byte-bits, net-m2-address-bits, net-m2-address-drill
version: 1
owner: interaction-designer
---

# Canvas spec: the address renderer, bits and drill modes

The first three canvases of the `[addr]` renderer (roadmap, Interactive pieces). One shared pure model (`models/net-address.ts`) serves all three and later modes (`prefix`, `classify`, `mask-and`, `split`, `overlap`, `v6`), and doubles as the reference for code exercises 2.5, 3.7 and 3.8, so the canvas and the graded tests cannot disagree.

Visual register: **card style** (core concept), on `BeatFrame`, `DotGrid`, `VerdictBanner`, theme tones only, a narrow viewBox about 420 units wide, labels at least 13 units.

## 1. `net-m2-byte-bits` (playable)

### Teaching claim
One part of an address is one byte: eight bits worth 128, 64, 32, 16, 8, 4, 2 and 1, so it can hold 0 to 255, and 256 needs a ninth bit that is not there.

### Why a canvas
"Eight bits make 0 to 255" is a fact learners memorise and forget. Turning bits on and watching the number, then adding one to 255 and watching every bit roll over to zero, makes the limit something they have seen happen.

### Model
- Inputs: the eight bits (each 0 or 1), default `00010111` (23, the last part of `192.168.1.23`).
- Outputs: the decimal value (0 to 255), the place values that are on, an overflow flag.
- Rule: value = sum of the place values of the bits that are on. Add one: binary increment with carry; at 255 the carry leaves the byte, every bit becomes 0 and the overflow flag is set.
- Assumptions: unsigned byte.
- Limitations: the picture shows one byte on its own. In a whole address the carry moves into the next part (`192.168.1.255` plus one is `192.168.2.0`), which the address canvas shows.

### Rendering
Inline SVG inside `BeatFrame`. Eight bit cards in one row (about 44 units each), the place value above each card, the bit (0 or 1) on the card, the running sum as chips under the cards ("16 + 4 + 2 + 1"), and the value in a large card ("= 23"). A ghost ninth card on the left, dashed, labelled "no ninth bit".

### Controls
Tap any bit card to flip it (the picture is the control). Outside the picture, at most two controls: **Add 1** and **Reset**.

### Visualisation and motion
Flipping a bit animates the card (150 to 250 ms) and the sum chips update. **Add 1** ripples the carry from right to left, one card at a time; at 255 the carry travels into the ghost ninth card, which flashes, and every card drops to 0. Reduced motion: no ripple, the final state at once.

### Copy
- Verdict line, always visible: "23 in one byte" by default; "255: the biggest number one byte can hold" when all eight are on; "256 needs a ninth bit. A byte has eight." after overflow.
- Hint: "Tap the bits. Then turn them all on and press Add 1."
- Limits fold: "A byte is eight bits, so each part of an IPv4 address is 0 to 255. This picture shows one byte alone; in a whole address, one more than .255 carries into the next part."

### Edge cases
All off (0); all on (255); overflow; rapid taps; keyboard only.

## 2. `net-m2-address-bits` (playable)

### Teaching claim
An IPv4 address is 32 bits: four bytes, written as four numbers with dots for people, and the same bits read as one number from 0 to 4,294,967,295 [S1].

### Why a canvas
The three views of one address (dotted, bits, one number) only feel like the same thing when changing one changes the others at once.

### Model
- Inputs: 32 bits, default the bits of `192.168.1.23`; or an address typed by the learner.
- Outputs: the dotted form, the single number (with thousands separators), and a parse error for invalid typed input.
- Rule: `ipToNumber` and `numberToIp` from the shared model; unsigned 32-bit (`>>> 0`).
- Typed input rules (same as code exercise 2.5): exactly four parts, each 0 to 255, digits only, no leading zero unless the part is `0`. Errors in plain words: "256 is more than one byte can hold", "An address has four parts", "Leading zeros are not used in this course".
- Limitations: IPv4 only; the picture does not say what the address means (that is 2.4).

### Rendering
Four rows of eight bit cards, one row per byte, so it fits a phone. Left of each row, the byte's value in a chip (192, 168, 1, 23). Above the rows, the dotted form; below, the one number in a large card. When a bit flips, its row's value, the dotted form and the number all update and briefly highlight.

### Controls
Tap any bit. Outside the picture: an **address field** ("Type an address, for example your own from 1.3") and **Reset**.

### Copy
- Verdict: "192.168.1.23 is the number 3,232,235,799" (updates with every change).
- Hint: "Flip the last bit, then type your own address."
- Limits fold: "IPv4 only. The picture shows how an address is stored, not whether it is private or public: that is 2.4."

### Edge cases
`0.0.0.0` (0), `255.255.255.255` (4,294,967,295, unsigned, never negative), `128.0.0.0` (the top bit, 2,147,483,648), invalid input never changes the picture.

## 3. `net-m2-address-drill` (playable)

### Teaching claim
I can convert between a byte and its bits, and spot an address that cannot exist, by hand, without a calculator.

### Why a canvas
Unassisted practice with instant feedback (roadmap, O3). A quiz block cannot generate fresh numbers or take an answer by tapping bits.

### Model
- Question kinds (seeded generator, five per set): **byte to bits** (answer by tapping eight bit cards), **bits to byte** (pick one of three numbers), **real or not** (pick "real address" or "cannot exist" for a dotted string with one part possibly above 255).
- Distractors for "bits to byte": the value with one bit misread (plus or minus one place value) and the value read right to left. All three options have the same number of digits where possible.
- Feedback: immediately after each answer, the correct bits with place values summed, in words ("16 + 4 + 2 + 1 = 23").
- Output: score for the set ("4 of 5 by hand").
- Seed: from the set number, so a mentor can reproduce a set; **New set** draws the next seed.
- Limitations: practice, not graded; the graded check is the chapter's quiz.

### Rendering
One question card at the top of the picture, the eight bit cards (for byte to bits) or three answer cards below, a five-dot progress strip, the feedback line in the verdict banner.

### Controls
Tap to answer. Outside the picture: **Next** and **New set**.

### Edge cases
0 and 255 appear in at least one of every three sets; the same question never repeats inside a set.

## Accessibility (all three)
Every bit card and answer card is a button with an accessible name ("Bit worth 16, off") and `aria-pressed`; Enter and Space toggle; visible focus; a live text summary under the picture ("Value 23. Bits on: 16, 4, 2, 1."); colour never the only signal (bit cards also show 0 or 1); reduced motion respected; 44px targets.

## Acceptance criteria
- [ ] Each claim is testable, and the model is tested (`frontend/tests/unit/canvas/net-address.test.ts`): parse rules, `ipToNumber` and `numberToIp` round trips including 0, 2^31 and 2^32 - 1, byte increment and overflow, drill generator determinism by seed and answer checking.
- [ ] The design is simple and legible on a 375px phone and on desktop, light and dark.
- [ ] `agent-ip/scripts/canvas-text-qa.mjs` reports no label touching another label, line or shape, at every sampled state.
- [ ] The chapter places a predict before the key beat and a quiz after the last beat.
- [ ] Reader fallback: an unknown slug renders the safe fallback; each canvas has a text summary.

## Build plan
- Model: `packages/learning-ui/src/canvas/models/net-address.ts`.
- Component: `packages/learning-ui/src/canvas/net-m2-address-bits/AddressBitsCanvas.tsx` (one component, a `mode` prop: `byte`, `address`, `drill`), with `data.ts` per slug in `net-m2-byte-bits/`, `net-m2-address-bits/`, `net-m2-address-drill/`, and `spec.md` in each.
- Registry: the three slugs in `packages/learning-ui/src/shared/canvas/slugs.ts` and `server/src/shared/canvas/slugs.ts` (`pnpm --dir server sync-shared`), and in `registry.ts`.
- Tests: `frontend/tests/unit/canvas/net-address.test.ts`; the registry test must still pass.
- Preview: `/workspace/canvases`.
