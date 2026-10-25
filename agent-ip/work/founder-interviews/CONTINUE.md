# Continue here: founder-interviews (course 14)

Status on 2026-10-25: all agent-ip steps this team can run are done, and PR #66 is ready for review. What is left needs people.

## Done

- G0 brief, G1 dossier, G2A roadmap, G2B signed by the sponsor alone (an exception, recorded in `roadmap-confirmation.md` and `decision-log.md`), G2C replaced by the writer pack.
- G4 draft and G5: two critique rounds, a residual pass, a module 5 extension (the technical founder) with its own blind review and fixes, three blind key checks on a second model family, and the checks in `qa/g5-verification.md` and `qa/canvas-qa.md`.

## Waiting for people

1. A human answer-key check (keys in the chapters; batches in `qa/blind-keys-r3/`).
2. A second instructor's confirmation of the roadmap, and the delivery lead (G7).
3. Reviewer acceptance of the residuals listed in `decision-log.md` (2026-10-25 rows).
4. After approval: set `repositoryPublish: true` in `courses/founder-interviews/course.yaml` in the approving change.

## Linked course

Course 16, "Your Career Brand" (PR #71), is cross-referenced from gate 1.6, 2.3, 3.4, 5.7 and 7.2 (decision log, 2026-10-25). If course 16 renumbers its chapters before it merges, update those five sentences.

## How to run the checks again

- From `server/` (needs a gitignored `server/.env` with `DATABASE_URL`):
  - `node node_modules/tsx/dist/cli.mjs scripts/validate-course-source.ts --course founder-interviews`
  - `node node_modules/tsx/dist/cli.mjs scripts/audit-course-structure.ts --course founder-interviews`
- From the repo root: `node agent-ip/scripts/audit-course.mjs courses/founder-interviews`.
- From `frontend/`, after any canvas `data.ts` change: refresh the installed copy of `packages/learning-ui` first (delete `frontend/node_modules/@buildment/learning-ui` and `frontend/node_modules/.pnpm/@buildment+learning-ui*`, then `pnpm --dir frontend install --frozen-lockfile`), then run `node node_modules/vitest/vitest.mjs run tests/unit/canvas/`.
- `content:import` refuses a course that already has learner work, so import into a fresh database.
