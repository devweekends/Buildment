# Playable builder brief: one module's playables

You build the playable canvases (drag or tap, the picture responds) that a module writer reserved. Worktree `D:\Projects - Community\buildment-sysdesign`, branch content/system-design. Do not commit, stash, switch branches or run sync-shared. Other builders work in parallel: touch only your own slug folders, any new primitive or model file you create, your own tests, and (only to fix wording that disagrees with your picture) the beat text in your module's chapters.

## Read

1. The quality bar and how a custom canvas is built and wired: `C:\Users\Zeeshan\AppData\Local\Temp\claude\D--Projects---Community\015d4563-fae2-4cf3-a2d3-eccf5677eaf1\scratchpad\playable-brief.md` (ignore its "do not register" rule; registering is allowed below).
2. `agent-ip/10-interactive-canvases.md` → Beat visuals (card style by default; text never touches art) and QA checklist.
3. Your specs: `agent-ip/work/system-design/playable-specs/m<N>.md`. Each section is one slug: claim, model, numbers, inputs, what moves, verdicts, suggested primitive. Read the beat in the chapter that uses each slug so picture and words agree.
4. Reference playables to match in look and quality: `frontend/src/canvas/sysdesign-m1-launch-day/` (card style, the architect's favourite), `sysdesign-m1-block-map`, `sysdesign-m2-knee-play`, `sysdesign-m2-availability-builder`. Reuse primitives in `frontend/src/canvas/primitives/` (traffic-playground, picture-slider, sorter, block-map, design-stepper, log-ruler, estimate-chain, year-strip) and models in `frontend/src/canvas/models/` where they fit; extend by composition, do not edit a primitive another module depends on unless the change is backward compatible and its tests still pass.

## Rules that bit earlier builders

- `data.ts` must never call a function exported from a `"use client"` file (crashes every page). Point `component:` at a client component in your slug folder. `tests/unit/canvas/client-boundary.test.ts` checks it.
- No hex colours (theme tokens or Tailwind classes with `dark:`), no `foreignObject`, `<animate>`, `<use>`, `<image>`.
- Verdicts 38 characters or fewer. Labels 11.5 viewBox units or more. Pure model in a `.ts` file with unit tests, and a server-render test.
- If the rAF loop drives fades, the final state must still be visible when the clock is paused (use CSS transitions for state changes).

## Register, test, check

- Register your slugs (safe to run in parallel): `node C:/Users/Zeeshan/AppData/Local/Temp/claude/D--Projects---Community/015d4563-fae2-4cf3-a2d3-eccf5677eaf1/scratchpad/register-slugs.js <slug> [<slug> ...]`
- From `frontend/`: `node C:/Users/Zeeshan/AppData/Local/pnpm/.tools/pnpm/12.11.2/node_modules/pnpm/bin/pnpm.mjs exec vitest run tests/unit/canvas`, `... exec tsc --noEmit -p .`, `... exec eslint <your files>`: all clean.
- Text QA (web app at http://localhost:3530 must be running; if it is not, say so and skip): from the worktree root, `node agent-ip/scripts/canvas-text-qa.mjs --slug <slug>` for each slug. Target "Canvases with collisions: 0" ("in motion" is fine).
- Audit: `node agent-ip/scripts/audit-course.mjs content/import/system-design/<module dir>` shows no "no playable beat" flag.
- No em dashes anywhere. Use few screenshots; the scripts are the proof.

## Reply (short)

Slugs built and registered, test/tsc/eslint/QA/audit results, any spec you changed and why, anything not done.

## Never kill shared processes

Never run `taskkill /IM node.exe`, `killall node`, `Stop-Process -Name node` or anything that stops processes by name: the web app, the API, other agents and the user's own tools all run on Node. Stop only a process you started, by its PID.
