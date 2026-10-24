---
artifact: canvas-spec
course: data-engineering
chapter: 08.02-event-time-and-late-data
slug: late-data-lookback
version: 1
owner: interaction-designer
renderer: slider (renderers/slider/)
---

# Canvas spec: How many late reports a lookback catches

## Teaching claim
A lookback of N days catches every report that arrives up to N days late, and the price is that every run reads N + 1 days again. Past the longest delay in the data, a longer lookback adds cost and catches nothing.

## Why a canvas
The trade-off has two sides, a benefit that stops growing and a cost that never stops. One slider and three bars show the benefit stepping up at 1, 2 and 3 days and then going flat, while the cost keeps climbing.

## Model
Counts from the seed-7 data with the default 28 days (`python make_source.py`), computed with the reference build:

| Lateness of the first upload | Reports | Of which M05 outage |
|---|---|---|
| 1 day | 76 | 12 |
| 2 days | 69 | 12 |
| 3 days | 66 | 11 |
| Total late | 211 (8.0 percent of 2,633) | 35 |

`lookbackOutcome(N)` in `data.ts`: a report first uploaded k days after it was made is read again when k is at most N, so caught = the sum of the groups from 1 to N. Missed = 211 minus caught. Days read each run = N + 1 (the newest report day and N before it).

Input: lookback (0 to 5 days, step 1, default 0).

Worked values:

| Lookback | Caught | Missed | M05 caught | Days read |
|---|---|---|---|---|
| 0 (default) | 0 | 211 | 0 of 35 | 1 |
| 1 | 76 | 135 | 12 of 35 | 2 |
| 2 | 145 | 66 | 24 of 35 | 3 |
| 3 | 211 | 0 | 35 of 35 | 4 |
| 5 | 211 | 0 | 35 of 35 | 6 |

Stats: late reports caught (and the share), late reports missed (and the M05 share), days read each run. Bars: caught in each lateness group, scale 0 to 76, good when the whole group is caught and bad when none is.

## Copy
- What this shows: the lookback window, which late reports it catches, and what each run pays.
- Try this: 0 to 1 catches 76 of 211; 3 catches all 211 including M05's 35; 5 adds cost and no benefit.
- What changed: `describeLookbackChange` says how many more reports are caught and how many more days are read, or that no new report is caught.
- Limits: counts from one generated data set whose longest delay is 3 days; the only cost counted is days read.

## QA
Tests in `frontend/tests/unit/canvas/late-data-lookback.test.ts`: defaults, the three try-this values, the minimum and maximum, and the `describeChange` sentences. Chapter 8.2 states the same counts, and the build test `test_without_a_lookback_the_late_m05_reports_are_missed` documents the cost of a lookback of 0. The registry test checks that every corner of the model is finite.
