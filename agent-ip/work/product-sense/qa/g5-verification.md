---
artifact: g5-verification
course: product-sense
date: 2026-10-26
---

# G5 verification: product-sense

## Source and structure checks (final, after round 3 fixes)

| Check | Command (from `server/` unless noted) | Result |
|---|---|---|
| Source validation | `tsx scripts/validate-course-source.ts --course product-sense` | 54 of 54 chapters OK (final) |
| Structure audit | `tsx scripts/audit-course-structure.ts --course product-sense` | 0 errors, 0 warnings, 7 module folders |
| Course audit | `node agent-ip/scripts/audit-course.mjs courses/product-sense` (repo root) | Needs work 0; 60,031 prose words (final) |
| Canvas tests | `vitest run tests/unit/canvas` (frontend) | 2,948 of 2,948 pass, including the registry's phone label and SVG rules for all 82 product-sense canvases |
| Frontend typecheck | `tsc --noEmit -p .` (frontend) | 0 errors |
| Dashes | scan of chapters, canvases and work files | 0 em or en dashes |

## Answer keys and form

| Check | Result |
|---|---|
| Blind key check, round 1, second model family (`blind-keys.mjs`) | 107 of 107 matched |
| Blind key check, round 2, second model family (smaller model) | 107 of 107 matched |
| Blind key check on the final version (after round 3 fixes) | running at PR time; result posted on the PR |
| MCQ key position (82) | 20, 21, 23, 18 for positions 0 to 3 |
| MCQ key strict longest / strict shortest | 24% / 24%; none more than 10% longer than the longest wrong option |
| "because" or "since" in keys / wrong options | 16% / 17% (round 1: 4% / 33%) |
| Absolute words in keys / wrong options | 4% / 5% |
| Predicts (25): correct label longer / correct first | 48% / 52% (round 1: 0% / 56%) |
| Yes/no predicts keyed No | 0 of 2 (round 2: 9 of 10) |

## Import

Scratch PostgreSQL 16 database on a local port, migrated and seeded. `tsx scripts/import-course.ts --course product-sense` on the final version: 7 modules, 54 chapters, 137 blocks.

## Click-through (127.0.0.1, test learner mentee1@buildment.dev)

| What | Width and theme | Result |
|---|---|---|
| 3.4 right-to-left card (`product-m3-rtl-card`) | 375px, light | Arabic text was clipped on the right: the mirror and an SVG `direction` flipped the anchor twice. Fixed in the kit; re-checked: text right-aligned, Join on the left |
| 3.4 page width | 375px | No horizontal scroll (`scrollWidth` 375) |
| 1.7 quiz | 375px, dark | Q1 answered right, Q2 wrong on purpose: score 2/5, every option's explanation shown for the missed item, "retry the 3 missed" offered; progress (2/5) kept after a reload |
| 5.2 spot canvas | desktop, dark | The "AI-powered" pill on the purple glow was nearly invisible (see-through tint). Fixed in the kit with an opaque card under every soft tint; re-checked |
| 3.2 four states, 3.5 motion, 7.3 skim, 2.2 squint, 2.5 contrast, 1.1 scene | desktop, light (round 0 tour) | Rendered and hydrated; toggles, ladder drag, spot taps, skim timer and cover all worked |
| 7.8 course gate | desktop, light | AI interviewer card with no key saved shows "Add your own OpenRouter key to practise" and a Settings link; the written defence is below it |
| Mermaid diagrams | desktop | Render (the scratch copy needed `scripts/copy-mermaid.mjs`, which `--ignore-scripts` skips) |

## Known platform behaviour (not this course)

- On a 375px phone the curriculum sheet can open over a chapter after navigation; noted earlier by another session.
- The shared sorter draws its reason text at 12.5 units on a 420 viewBox (about 10px at 375px); logged as an agent-ip follow-up.
