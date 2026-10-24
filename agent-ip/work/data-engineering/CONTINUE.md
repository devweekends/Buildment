# CONTINUE: data-engineering (course 15)

Paused on 2026-10-24 at the user's request. Branch `content/data-engineering`, draft PR #67 on devweekends/Buildment (do not open a second PR; do not mark it ready until every step below is done).

## Where it stands: G5, critique round 1 finished, revision round 1 not started

| Gate | State | Evidence |
|---|---|---|
| G0 brief | done (sponsor request) | `00-course-brief.md` |
| G1 research | done, human acceptance requested in the PR | `research.md` (295 table rows) |
| G2A roadmap | done | `curriculum-roadmap.md`, `courses/data-engineering/course.yaml` (13 modules, 84 chapters, 3,530 min, `estimatedHours: 59`, a `key` for every module and lesson) |
| G2B instructor sign-off | **pending** (chapters drafted first on the sponsor's standing instruction) | roadmap open decisions 1 to 10 |
| G2C | skipped, replaced by the writer pack | `context-packs/writer-pack.md`, `context-packs/reference-spec.md` |
| Reference build | done: 108 pytest tests and `dbt build` PASS=39 | `reference-build/mizan-prices/` and its `REFERENCE.md` |
| G4 full draft | done: 84 chapters, 34 canvases (new `table-steps` renderer), 15 slider tests | `courses/data-engineering/`, `packages/learning-ui/src/canvas/` |
| G5 checks so far | validate 84/84 OK; structure audit 0 errors 0 warnings; agent-ip audit Needs work 0; canvas tests 683 passed; frontend tsc clean; blind keys 162 of 162 matched on the second model family | `qa/blind-keys/` |
| G5 critique round 1 | done, verdict **revise** | `qa/critique-a1.md` to `qa/critique-a4.md` (drafting family, separate blind agents: 3.94, 4.06, 3.88, 3.69) and `qa/critique-b.md` (second model family: 4.47). Pass line: every dimension 4 or more and average 4.3 |
| G5 revision round 1, round 2, import, click-through, PR body | not started | |

## Next steps, in order
1. **Deduplicate the round 1 defects** from the five critiques into `qa/revision-1-brief.md`. Verify every critic B defect against the real files first: that agent sometimes invents file names (for example it cites `dag-scheduler.json`, which does not exist). Known S2s to fix:
   - 3.4 and canvas `index-or-scan`: the toy index cost rule says a full scan wins at about 1 percent selectivity; the real query is 16 times faster with the index. Recalibrate the rule (and the two quiz items that use it) or drop the numbers.
   - 6.1 predict: duplicates do change an average here (M08 weekly mean 12.566 to 13.125). Fix the key, explanation and prose.
   - 5.5 test `test_whole_lake_reads_back_with_hive_partitioning` asserts 2,712; after 8.5 it must be 2,699 plus 13 quarantined. Add the updated test to 8.5 and say so in 9.4 and 11.5.
   - 7.5: unit-test YAML, model-contract YAML, `var()` and Jinja macro syntax are needed but never shown. Show each once.
   - 8.5 `day_by_day.py` uses `extract_registry.TABLES`, which the 6.5 interface never defines. Add it to the 6.5 interface.
   - 9.x: the runner's `backfill` and `run --date` cannot repair a date more than 3 days behind the newest data; 9.1, 9.3 and 9.6 present them as the 8.4 backfill. Align the text with `scripts/backfill.py` or extend the runner (and the reference build) to pass `start_date` and `end_date`.
   - 9.4: the scheduled `daily` run fails every morning on March 2026 data; say so and show how to run a fixed date.
   - 13.3 retention dry run shows 13 partitions; the real output is 17 (quarantine is cleaned too).
   - 13.2: 240 minutes is too little for a full second pipeline; raise the estimate (and course hours) or narrow the must-haves.
   - 13.x asks learners to write their own generator, while the brief and roadmap say "provided". Make the roadmap and brief match (this was a deliberate design choice; record it in `decision-log.md`).
   - 12.5 Q2 grades `NOT IN` with a NULL, which no chapter teaches. Teach it in 2.2 or 2.3, or replace the item.
   - Critic B: 12 March counts differ between the 28-day data (137 rows) and the 16-day test data (134 rows); 11.5 and 13.3 must say which data they quote. 8.7 "35 reports" matches neither; fix.
   - Option-length bias across the course: MCQ correct strictly longest 7 of 115 and strictly shortest 9 of 115 (too rarely either); predicts: the correct label is never longer (0 of 47). Rebalance so neither is "always" or "never": aim for roughly 15 to 25 percent each in MCQs and the correct predict label longer in about 40 percent, always within 10 percent of the longest other option. Check with `C:/Users/Zeeshan/bm-de-scratch/bias-check.mjs` (run from the mirror's `server/`).
2. **Revise** with writer agents (review model, one per module pair as in G4: prompt template at `C:/Users/Zeeshan/bm-de-scratch/writer-prompt.md`), giving each only its defects. Mirror the fixes into `reference-build/` when code changes, and rerun its tests (`C:/de/venv`, `PYTHONUTF8=1`).
3. **Rerun the checks:** `bash C:/Users/Zeeshan/bm-de-scratch/sync.sh`, then in `C:/Users/Zeeshan/bm-de-scratch/mirror`: `server`: `validate-course-source.ts` and `audit-course-structure.ts --course data-engineering`; `frontend`: `vitest run tests/unit/canvas` and `tsc --noEmit`; repo root: `node agent-ip/scripts/audit-course.mjs courses/data-engineering`; blind keys round 2 on the second model family (`agy`, prompt `C:/Users/Zeeshan/bm-de-scratch/blind-prompt.txt`).
4. **Critique round 2** (same five critics, changed sections only). Stop after round 2; a human decides on residual S3s.
5. **Import and click-through:** portable PostgreSQL 16 on port 5450 (`C:/Users/Zeeshan/bm-de-scratch/pg/x/package/native/bin/pg_ctl.exe -D C:/Users/Zeeshan/bm-de-scratch/pgdata -o "-p 5450" start`; database `buildment_de` is migrated and seeded; the mirror's `server/.env` points at it, API port 4550, web port 3550). Run `content:import --course data-engineering`, then click through as `mentee1@buildment.dev` on 127.0.0.1 at 375px and desktop, light and dark, with one quiz answered right and one wrong.
6. **Write `qa/g5-verification.md` and `run-log.md`**, update `decision-log.md`, commit in small steps, push, then mark #67 ready, replace its body (start with "@asifrazadev @AQIB-NAWAB could you review this, merge it if it looks good, and publish it?", state G2B pending, who checked the keys, the critic scores and residuals), and request both reviewers with `gh api -X POST repos/devweekends/Buildment/pulls/67/requested_reviewers -f 'reviewers[]=AQIB-NAWAB' -f 'reviewers[]=asifrazadev'`.
7. **Separate small agent-ip PR** (not #67): add the `table-steps` renderer to the component library table in `10-interactive-canvases.md`, and a proposal that the audit also warns when the correct option is too rarely the longest or the shortest.

## Open decisions for humans
- The ten roadmap open decisions (G2B), including the dbt pin, naming GitHub Actions, the repair path, the offline install fallback, incident tone, a privacy reviewer for 11.3, Arabic answers.
- Whether `reference-build/` stays in the work area or moves to the reference-builds repository.
- Capstone scenarios stay inside the general course; full variant courses need a sponsor-answered variant intake and G6 (`capstone-variants.md`).
- Session instructions mention agent-ip v0.5 "visual-first beats" (`BeatFrame`, `GoDeeper`); neither the IP nor the components exist on main, so the course follows v0.4.6 with full prose minimums.
- A human answer-key check is still requested (the blind check ran on a model, not a person).

## Environment notes
- D: is nearly full; all scratch work lives on C: in `C:/Users/Zeeshan/bm-de-scratch/` (mirror with installed dependencies, Postgres, scripts). The Temp folder deletes executables and links, so do not keep tools there.
- pnpm 12: `C:/Users/Zeeshan/AppData/Local/npm-cache/_npx/c56e1cdeeb5b5fb6/node_modules/@pnpm/exe.win32-x64/pnpm.exe`. After any change to `packages/learning-ui/package.json`, run `pnpm install --frozen-lockfile --offline` in the mirror's `frontend/`.
- Register new canvases with `python C:/Users/Zeeshan/bm-de-scratch/register.py <repo> <slug>...`, then `node scripts/sync-shared.mjs` in the mirror's `server/` and copy the two generated `slugs.ts` files back.
