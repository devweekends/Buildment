# Visual fixes, wave 1 (Modules 1 and 2, 8.4, 10.6)

Source: `canvas-text-qa-2026-10-24.json` (headless text QA, 375px, light and dark) plus defects seen by the lead.

## From the text QA (15 canvases)
1. Scene wait labels ("waiting 4.7 days", "waited 28 h", "no answer yet") are crossed by link lines: sysdesign-m2-across-the-world, -cache-vs-memory, -chatty-page, -fan-out-tail, -hedged-request, -region-round-trip, -ssd-read. Fix once in the scene renderer (`frontend/src/canvas/renderers/scene/SceneView.tsx`, the wait label): give the label an opaque pill behind it (theme surface + border, like the packet chip), or place it where no link runs. Keep `geometry.ts` `waitLabelBox` in sync and keep `tests/unit/canvas/scene.test.ts` passing.
2. "Load balancer" is too long for a 112-wide card: sysdesign-m2-chain-fails, -shared-power, -two-copies. Use "Balancer" (or shorter) in those scenes' data and spec.
3. One-offs: sysdesign-read-routing ("copy" under a rect), sysdesign-position-token ("read, need #" under rect/circle), sysdesign-m1-paste-ids ("OK"), sysdesign-m1-paste-clarify ("read-only" crossed by a line), sysdesign-m2-hedged-request ("answer" under rect), sysdesign-m2-fan-out-play (caption "each backend is slow 1 time in 100" crossed by fan lines: move it to clear space).

## Seen by the lead
4. sysdesign-m1-design-loop: the first chip ("Clarify") stays highlighted after moving to a later step; the verdict banner is barely visible (faint) on later steps; chip labels truncate on a phone ("Deep di...", "Trade-..."), so use two rows that fit or shorter labels.
5. sysdesign-m2-fan-out-play: the weakest playable. Backends are tiny empty squares under a bundle of thin lines; "Load the page" barely shows motion. Redesign the picture in the card style (fewer, clearer backends drawn as small server cards or a grid that scales with N; visible fast and slow returns; a tally grid of past page loads that fills green and red), keeping the model in `models/fan-out.ts` and the slug.
6. sysdesign-m1-block-map: when a block is broken, blocks that depend on it should show the effect (for example App servers "cut off" when Database is down); check the dependency data.
7. sysdesign-truetime-bug: Bob's red mark ring is clipped at the right edge of the picture; move Bob left so the ring fits (`frontend/src/canvas/models/truetime-scene.ts`).
8. sysdesign-m1-launch-day-illustrated: the "full" marker on the slider shows as two thin red lines at 100,000 students; draw it once.
9. Chapter numbering: Replication and Time show as 3.4 and 4.6 because the importer numbers modules by position. This resolves itself once Modules 3 to 7 and 9 are in course.yaml; no change needed, just confirm after import.

Done means: `node agent-ip/scripts/canvas-text-qa.mjs --prefix sysdesign-m1-` and `--prefix sysdesign-m2-` and `--slug` for read-routing, position-token, truetime-bug report "Canvases with collisions: 0"; vitest canvas tests, tsc and eslint clean.
