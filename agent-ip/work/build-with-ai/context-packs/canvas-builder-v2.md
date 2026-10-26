---
artifact: context-pack
course: build-with-ai (v2 amendment)
for: interactive-canvas-builder
version: 1
---

# Canvas builder pack (v2): four shared beat primitives

You are the interactive canvas builder (`agent-ip/agents/interactive-canvas-builder.md`). Build four **shared, data-driven** playable primitives that the v2 chapters of course 13 (and later courses) fill with data. Chapter writers are writing the data at the same time, against the type contracts that already exist; **do not change any exported type or function signature** in the four model files. You may add exports.

Paths are relative to the repository root `<repo>` (named in your task).

## Read first

- `agent-ip/10-interactive-canvases.md` → Beat visuals, The design language, Reusable renderers (rules for every renderer), The reusable component library, QA checklist.
- `agent-ip/agents/interactive-canvas-builder.md`.
- The closest existing primitive, which you copy in structure and style: `packages/learning-ui/src/canvas/primitives/sorter.tsx`, its model `models/sorter.ts`, its factory in `primitives/canvas-factories.tsx`, its use in `sysdesign-m1-requirement-sorter/data.ts`, and its test `frontend/tests/unit/canvas/sorter.test.ts`.
- Shared parts to reuse: `primitives/beat-frame.tsx` (`BeatFrame`, `BeatButton`), `primitives/beat-segmented.tsx`, `primitives/beat-choice.tsx`, `primitives/svg-node.tsx` (`SvgNode`), `primitives/svg-parts.tsx` (`DotGrid`, `VerdictBanner`), `primitives/svg-pill-button.tsx`, `primitives/svg-radio-chip.tsx`, `primitives/tones.ts` (`TONES`, `NEUTRAL`, `FOCUS_RING`, `LABEL_HALO`, `SHAPE_TRANSITION`), `models/sorter.ts` (`wrapWords`, `dealOrder` for a seeded generator pattern).

## The four primitives

Each one: implement the model functions in the existing model file (they currently throw), add a client component in `primitives/`, add a factory to `primitives/canvas-factories.tsx` (same pattern as `makeSorterCanvas`; that file has no "use client"), add the model to `packages/learning-ui/package.json` "exports" (`"./canvas/models/<name>": "./src/canvas/models/<name>.ts"`) so tests can import it, and write tests.

1. **Context picker** (`models/context-picker.ts`, `primitives/context-picker.tsx`, `makeContextPickerCanvas(config: ContextPickerConfig)`). The claim it serves: the same question gets a different right answer in a different context. Picture (viewBox about 420 wide): the question at the top as a chip; one row per factor with its label and its choices as tappable pills drawn in the SVG (the selected pill filled with the accent); below, the options as compact `SvgNode`-style cards; the picked option lights up (accent ring and "fits" pill) and a `VerdictBanner` near the bottom shows the rule's `why` (wrapped). When a pill changes, the highlight moves to the new option with a short transition (the model moving); under reduced motion it jumps. Every pill is a keyboard-reachable button (role, aria-pressed, focus ring, at least 44px touch height at a 375px wide rendering, so draw pills at least about 50 viewBox units tall or enlarge the hit area with a transparent rect). Up to 4 factors with up to 3 choices and up to 5 options must fit without labels touching. One control outside the picture at most: "Reset". `resolveContext`: first rule whose `when` entries all equal the context wins; else `fallback` with `rule: -1`. `allContexts`: every combination in factor order. `checkContextConfig`: unknown factor, choice or option ids in rules, start, fallback; start missing a factor; an option no combination reaches; more than 4 factors, 3 choices or 5 options.

2. **Flip deck** (`models/flip-deck.ts`, `primitives/flip-deck.tsx`, `makeFlipDeckCanvas(config: FlipDeckConfig)`). Predict, then reveal. Picture: one card at a time with `deckLabel` and the claim; the verdict buttons under it (in the picture, or at most three `BeatChoice`-style buttons right under it); after a choice the card flips (a rotateY or a scaleX flip of about 400 ms; reduced motion: instant swap) to show "You said: X. The evidence: Y." with the `back` text and the `source` on a small pill, toned good when it matches and warn when it does not (never red for a wrong guess: wrong guesses are welcome); a "Next card" button; at the end a tally ("3 of 6 matched the evidence on the first try") and the `endNote`, with "Again". A counter "card 2 of 6". `chooseVerdict` records `matched` only when the first choice equals `answer`.

3. **Commit story** (`models/commit-story.ts`, `primitives/commit-story.tsx`, `makeCommitStoryCanvas(config: CommitStoryConfig)`). Picture: two tabs (the two histories) at the top of the picture or as one `BeatSegmented` control under it; a horizontal lane of days with one dot per commit, the dot's radius growing with lines changed (clamped so a 5,000-line dump is big but stays inside the picture); tapping a dot (or arrow keys along the lane) selects it and shows a card with the message in a monospace style, "+added  -removed  files", and the `note`; a stats line in the picture from `historyStats` ("1 commit, 4,812 lines, largest 4,812"); the history's `verdict` in a `VerdictBanner` with its tone. Switching tabs animates the dots into their new places (reduced motion: jump). The first commit is selected on load so the picture is never empty.

4. **Word sampler** (`models/word-sampler.ts`, `primitives/word-sampler.tsx`, `makeWordSamplerCanvas(config: WordSamplerConfig)`). The claim: a model picks likely words, so the common answer comes out most of the time, and context changes the odds. Picture: the prompt with a highlighted blank; one horizontal bar per word showing its share (`shares`), labelled with the word and the percentage; a tally next to each bar of how many times it was drawn; the last drawn word flies into the blank. Controls under the picture (at most two, plus context tabs if there are two or three contexts): "Ask once" and "Ask N times" (`manyCount`), and the context tabs as a `BeatSegmented`. A small "illustrative numbers" caption in the picture. Seeded generator (mulberry32 like `dealOrder`), so the same seed gives the same draws. Verdict line once there are 10 or more draws: "<top word> came out <n> of <m> times".

## Rules for all four

- Wrap everything in `BeatFrame` (picture first, at most two controls, one hint line, limits fold). No title row or cards above the picture.
- Theme tokens only (`TONES`, `NEUTRAL`, Tailwind classes that switch in dark mode); no hex values. Good, warn and bad only with a text label.
- Labels at least 13 viewBox units; text never touches lines, shapes or other text; use `wrapWords` for wrapping and `LABEL_HALO` where text sits over art.
- Every interactive SVG element is keyboard reachable with a visible focus ring and an accessible name; the figure has `role="img"` or a labelled group with a text summary of the current state for screen readers (an `aria-live="polite"` line for the verdict).
- Motion only when the model changes; nothing loops or autoplays; `prefers-reduced-motion` shows the end state.
- No em dashes or en dashes (U+2014, U+2013) anywhere, including comments.
- Do not edit `registry.ts` or any `slugs.ts`: the orchestrator registers course slugs.
- Add the four primitives as rows in `agent-ip/10-interactive-canvases.md` → The reusable component library table (the IP requires the row in the same change that adds a shared renderer), with status "Built, first used by course 13 v2".
- A spec for each primitive on template 14A (`agent-ip/08-templates.md`) as `packages/learning-ui/src/canvas/primitives/<name>.spec.md`: teaching claim it supports, model, rendering, controls, edge cases, accessibility, acceptance criteria.

## Tests

One test file per primitive in `frontend/tests/unit/canvas/<name>.test.ts`, importing from `@buildment/learning-ui/canvas/models/<name>` and the factory from `@buildment/learning-ui/canvas/primitives/canvas-factories` (add that export path to package.json if missing). Cover the model rules and edge cases, `check*` functions with good and bad fixtures, and a `renderToString` smoke render of the factory component with a small fixture (as `sorter.test.ts` does). Use only fixture data in tests; never course content.

## How to run (this machine)

D: is nearly full, so tools run from a mirror on C:. Edit files only in `<repo>`. Then:

1. `powershell.exe -NoProfile -ExecutionPolicy Bypass -File C:/Users/Zeeshan/bm-aiadv-scripts/sync.ps1` (copies your edits to the mirror and into the frontend's installed package snapshot).
2. From `C:/Users/Zeeshan/bm-aiadv/frontend`: `node node_modules/vitest/vitest.mjs run tests/unit/canvas/<name>.test.ts` and finally `tests/unit/canvas` as a whole.
3. Typecheck the package files you touched: from `C:/Users/Zeeshan/bm-aiadv/frontend`, `node node_modules/typescript/bin/tsc --noEmit -p tsconfig.json` (report errors only in your files).

Do not run git commands that change anything, do not install packages, do not start servers. Report: files created, test counts and results, typecheck result, and any deviation from this pack.
