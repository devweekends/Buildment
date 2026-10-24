# Continue here: founder-interviews (course 14)

Stopped on 2026-10-24 at the user's request, partway through G5. Read this file, then `run-log.md` and `decision-log.md`.

## Where things are

- **Branch:** `content/founder-interviews`, pushed. Draft PR #66 (devweekends/Buildment). Do not open a second PR. Do not mark #66 ready until every step below is done.
- **Platform dependency:** PR #62 (the `AI_INTERVIEW` block) is merged into main. Its follow-up PR #68 (`feat/ai-interview-update`: `context: resume-and-project`, speech input, deeper probes, a "Things to watch" list of named flags on the feedback card) is open, and this branch has it merged in. #66 must say it depends on #68.
- **Gates:**
  - G0 brief: accepted.
  - G1 dossier (`research.md`): accepted.
  - G2A roadmap (`curriculum-roadmap.md`, `courses/founder-interviews/course.yaml`): done.
  - G2B: signed by the sponsor alone (`roadmap-confirmation.md`), recorded as an exception to the two-instructor rule. All 15 open decisions are resolved or deferred.
  - G2C: skipped. The writer pack (`context-packs/writer-pack.md`) replaces it, on the sponsor's instruction.
  - G4 full draft: done. 41 chapters and 19 canvases.
  - **G5: round 1 done and its revision done. Round 2 not started** (both critics were stopped before writing anything).

## Done

- **Chapters:** all 41 in `courses/founder-interviews/`, revised after round 1 per `qa/revision-1-brief.md`.
- **Canvases:** all 19, registered in `packages/learning-ui/src/canvas/` (registry, slugs, package exports), with tests in `frontend/tests/unit/canvas/`.
- **Checks, last run after merging #68:**
  - `validate-course-source`: 41/41 OK.
  - `audit-course-structure`: 0 errors, 0 warnings.
  - `node agent-ip/scripts/audit-course.mjs courses/founder-interviews`: Needs work 0, 46,654 prose words.
  - Frontend vitest: 671 of 671 pass.
  - No em or en dashes anywhere in the course, canvases or work files.
- **Round 1 reviews:**
  - Blind key check (second model family): 93 of 95 keys matched, in `qa/blind-keys/`. Both mismatches were fixed in revision 1.
  - Critique A: 3.71. Critique B: 3.86. Both are in `qa/`.
- **Option form after revision:**
  - MCQ keys are the strict longest in 18 of 69 and the strict shortest in 11.
  - Predicts are first in 13 of 26.
  - No key is the only option with a figure.
- **Import:** the course imported into a local scratch database (41 chapters, 125 blocks). mentee1 was enrolled and chapters rendered with no console errors. This was an early check, not the full click-through.

## Half done

- **Round 2 blind keys:** keyless batches were extracted to `qa/blind-keys-r2/` (`batch-1.md`, `batch-2.md`, `keys.json`), but no answers were collected. Re-extract first if any graded item changes.

## Next steps, in order

1. **Re-check:** from `server/`:
   - `node node_modules/tsx/dist/cli.mjs scripts/validate-course-source.ts --course founder-interviews`
   - `node node_modules/tsx/dist/cli.mjs scripts/audit-course-structure.ts --course founder-interviews`

   From the repo root:
   - `node agent-ip/scripts/audit-course.mjs courses/founder-interviews`

   The server needs a `server/.env` with `DATABASE_URL`, which is gitignored.
2. **Canvas tests:** the frontend holds a copied snapshot of `packages/learning-ui`, so after any change to a canvas `data.ts`, delete `frontend/node_modules/@buildment/learning-ui` and `frontend/node_modules/.pnpm/@buildment+learning-ui*` and run `pnpm --dir frontend install --frozen-lockfile` before vitest.
3. **G5 round 2 critics:** run two blind critics on the revised course.
   - Critic A covers pedagogy, assessment and canvas. Critic B covers slop, readability, continuity, accuracy against the dossier and tone.
   - Give each one its round 1 critique (`qa/critique-a.md` or `qa/critique-b.md`). Each says fixed, partly fixed or open for every defect, then looks for new defects.
   - Outputs go to `qa/critique-a-r2.md` and `qa/critique-b-r2.md`.
   - Prefer the second model family (a headless command-line agent) for at least one critic. When running it headless, close stdin (`< /dev/null`), or it hangs.
4. **Round 2 blind keys:** re-extract with `node agent-ip/scripts/blind-keys.mjs extract courses/founder-interviews agent-ip/work/founder-interviews/qa/blind-keys-r2`. Give only the batches to a second-family reviewer, then run `compare`.
5. **Residual fixes:** one targeted pass on round 2 findings. agent-ip allows no third critique round; record any remaining S3 items in the decision log for human review.
6. **Full click-through:**
   - Import into the scratch database: `scripts/import-course.ts --course founder-interviews`.
   - Run the API (`server/`: `node node_modules/tsx/dist/cli.mjs src/index.ts`) and the web app (`frontend/`: `next dev`).
   - Log in as mentee1@buildment.dev (the dev password is in `server/src/shared/lib/seed-test-users.ts`) at 375px and at desktop width, in light and dark themes.
   - Answer one quiz right and one wrong, and check the score, the explanations and the saved progress.
   - Check the AI drill card with no key saved, and the gate written task.
   - Write `qa/g5-verification.md`.
7. **Logs:** update `run-log.md` and `decision-log.md`.
8. **Ready the PR:**
   - Mark #66 ready: `gh pr ready 66 --repo devweekends/Buildment`.
   - Replace its body. It starts with "@asifrazadev @AQIB-NAWAB could you review this, merge it if it looks good, and publish it?", lists the checks run and their results, says the PR depends on #68, says G2B was signed by the sponsor alone, and asks for a human answer-key check.
   - No AI attribution and no em or en dashes.
   - Request both reviewers: `gh api -X POST repos/devweekends/Buildment/pulls/66/requested_reviewers -f 'reviewers[]=AQIB-NAWAB' -f 'reviewers[]=asifrazadev'`. Re-request any that drop.
9. **Pipeline:** update course 14's row in `buildment-course-pipeline.md` (in the architect's local workspace, outside this repository).
10. **agent-ip lessons:** put any lessons for agent-ip in a separate small PR. Candidates:
    - The structure audit allows only two-option predicts, while the playbook says two or three.
    - The audit counts a quiz chapter only by the `-quiz.md` file name.
    - The frontend's copied package snapshot needs a refresh after a canvas edit.
    - `sync-shared` rewrites line endings on Windows.

## Open decisions and notes

- **Time:** about 20 hours with every AI drill, about 18 on the written path, against the brief's 9 to 15. The sponsor kept the scope over four weeks (`roadmap-confirmation.md`).
- **Deferred:** Arabic answers and role-based variants.
- **Still needed from humans:** a human answer-key check, and review by a second instructor and the delivery lead.
- **Not opted in to publishing:** `repositoryPublish` is not set in `course.yaml`.
- **Commits:** follow the user's rule. Small logical commits, no AI attribution, no em or en dashes, never run Heroku commands.
