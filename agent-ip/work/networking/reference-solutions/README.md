# Networking course: reference solutions

Private. These are the answers to challenges 2 to 6. They are never published with the learner template.

The folders mirror `challenges/` in the template repository. Each part has the finished script, the test (identical to the learner's), and a `results.md` that shows what a correct run prints. Example numbers (ports, addresses in a pool, MAC addresses, times) differ on every real run.

## How to run

The scripts source `toolkit/lib.sh` three folders up, so run them on top of the template repository. In the lab:

1. Copy the template repository to `/work`.
2. Copy this `challenges/` folder over `/work/challenges/` (the reference files replace the learner's gapped scripts).
3. Run each part's script, then its test:

```
bash challenges/challenge-2-router/part-1-two-subnets-and-a-router/router.sh
bash challenges/challenge-2-router/part-1-two-subnets-and-a-router/test.sh
```

Do the same for challenge 3, challenge 4 (parts 1 and 2), challenge 5, and challenge 6 (parts 1 to 3; each script rebuilds the earlier parts, so part 3 alone builds the whole network). Part 4: `bash test.sh` after `bash break.sh SEED`.

Challenge 6 part 4 also has two files that are not in the template:

| File | What it does |
|---|---|
| `fix.sh Fx` | The reference fix for one fault |
| `verify-faults.sh` | Injects each fault alone, checks that a test fails with the right symptom, applies the fix, checks that all tests pass again, and checks the seed draw |

## Tests are shared

Each `test.sh` is identical in this repository and in the template. The `FAIL` messages name the gap in the learner's script (challenges 2 to 5) or the thing to look at (challenge 6).
