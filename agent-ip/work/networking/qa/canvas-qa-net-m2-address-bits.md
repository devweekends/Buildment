---
artifact: canvas-qa
course: networking
chapter: 2.2
slug: net-m2-byte-bits, net-m2-address-bits, net-m2-address-drill
version: 1
validator: technical-validator
---

# Canvas QA: the address renderer, bits and drill modes

## Model
`frontend/tests/unit/canvas/net-address.test.ts`, 39 tests, all passing (with the registry test: 1,292 passing). Typecheck (`tsc --noEmit`) clean.

| Case | Input | Expected | Actual | Pass |
|---|---|---|---|---|
| Lowest address | `0.0.0.0` | 0 | 0 | yes |
| Top bit | `128.0.0.0` | 2,147,483,648 (unsigned) | 2,147,483,648 | yes |
| Highest address | `255.255.255.255` | 4,294,967,295 | 4,294,967,295 | yes |
| Worked example | `192.168.1.23` | 3,232,235,799 | 3,232,235,799 | yes |
| Out of range | `256.1.1.1` | error "256 is more than one byte can hold" | as expected | yes |
| Byte overflow | Add 1 at 255 | all bits 0, overflow set | as expected | yes |
| Drill determinism | same seed twice | same five questions | same | yes |
| Drill feedback | out-of-range question | "256 is above 255: it cannot exist" | as expected | yes |

## Teaching
- Claim stated: yes, in each slug's spec and in the chapter beat text.
- Prediction present: the chapter's predict sits right before beat 1 (`net-m2-byte-bits`).
- Transfer check present: two quiz questions after the last beat (a byte walk for 200; which address can be real).
- Limitations visible: a "What this picture leaves out" fold under each canvas.

## Visual
- Palette: theme tones only (no hex); card register, `BeatFrame`, `DotGrid`, `VerdictBanner`.
- Series count: not applicable (bit cards, no chart).
- Labels and units: place values above every bit; verdict line in words.
- Mobile: checked at 375 px in light and dark. `agent-ip/scripts/canvas-text-qa.js` (the IP's in-page check) found no label touching another label, line or shape at any sampled state, in both colour schemes.

## Accessibility
- Keyboard: every bit card and answer card is a button with Enter and Space; controls are native `<button>`s.
- Labels: accessible names such as "Bit worth 16, on" with `aria-pressed`.
- Text alternative: SVG `title` and `desc`, plus a polite live summary under each picture.
- Reduced motion: no ripple or flash; the final state at once.

## Technical
- Reader integration: registered in both slug lists and the registry; rendered through `CanvasForSpec` on a standalone page built from the app's own styles (see below).
- Fallback: an unknown slug renders the platform's safe note (registry test).
- Console errors: none on the built page.
- Interaction performance: local state only, no network calls.

## SVG
- Component, not raw string: yes.
- Responsive viewBox: about 420 units wide.
- Theme tokens / light + dark: yes; both schemes checked.
- Title and description: yes.
- Keyboard and focus: yes, with the shared focus ring.
- Sanitized (if static): not applicable.
- No scripts / foreignObject / external hrefs: asserted by a test.
- Visual regression: phone screenshots in light and dark reviewed by the orchestrator and by critic B.

## How it was checked
The app's `/workspace/canvases` page needs a signed-in mentor and the backend, which this worktree cannot run (drive D: is almost full). Instead, the canvases were rendered through the real `CanvasForSpec` and registry, with the app's `globals.css`, on a standalone page built with Vite on drive C:, and `canvas-text-qa.mjs` was run against it with only the sign-in removed. A reviewer should still open the canvases once on `/workspace/canvases` before the course PR (pre-PR click-through).

## Defects
| Severity | Location | Observation | Required fix |
|---|---|---|---|
| none open | | Fixed during G3: drill hint now matches the Check button; drill feedback shortened; screen-reader summary no longer repeats the verdict; byte limits copy corrected. | |
