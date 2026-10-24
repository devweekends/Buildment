# A wider frame smooths more and reacts later

- **Slug:** `moving-average-frame`
- **Export:** `movingAverageFrame` in `data.ts`
- **Course:** Data Engineering, chapter 3.3 "Running totals, moving averages and frames".
- **Teaching claim:** A moving average over the last N rows smooths more as N grows but trails a rising price further; without `PARTITION BY market`, the frame of the first rows of a market reaches into the last rows of the market before it.
- **Renderer:** slider (`renderers/slider/`).

## Model

Fixed series (shekels per tray of eggs), sorted by market and then by day:

- M02, 7 rows: 23.75, 24.0, 23.0, 23.5, 23.0, 24.5, 23.0 (the first seven rows of the seed-7 series, see drill d09).
- M03, 7 rows: 25.0, 25.5, 26.0, 26.5, 27.0, 27.5, 28.0 (made up, a steady rise of 0.5 a day).

Inputs: frame size in rows (1 to 7, default 3), `PARTITION BY market` (0 or 1, default 1).

Rule: the moving average at a row is the mean of the last N rows ending at that row. With the partition, only M03's rows count. Without it, the rows of M02 sit before M03 in one sorted list, so the first days of M03 include M02 rows. Trail = the day's price minus the moving average.

Worked values:

| Frame | Partition | Day 1 average | Day 7 average | Day 7 trail |
|---|---|---|---|---|
| 3 (default) | on | 25.00 | 27.50 | 0.50 |
| 7 | on | 25.00 | 26.50 | 1.50 |
| 7 | off | 23.71 | 26.50 | 1.50 |
| 3 | off | 24.17 | 27.50 | 0.50 |
| 1 | either | 25.00 | 28.00 | 0.00 |

Stats: average on day 1, average on day 7, M02 rows inside the day 1 frame. Bars (shared scale 0 to 2): the trail on days 1, 3, 5 and 7 of M03.

## Copy blocks

- **What this shows:** a moving average over a frame of N rows, on a rising price series for one market, with and without a partition by market.
- **Try this:** (1) partition on, frame 7 to 3: the day 7 trail falls from 1.50 to 0.50. (2) frame 7, partition off: the day 1 average falls from 25.00 to 23.71. (3) frame 1: the average equals the price.
- **What changed:** `describeFrameChange` names the frame or partition change and the new trail or day 1 average.
- **Limits:** made-up straight-line rise; rows, not days; a simple illustration.

## QA

Tests in `frontend/tests/unit/canvas/moving-average-frame.test.ts`: defaults, the try-this values, the edges (frame 1 and frame 7, partition off), the largest trail against the bar scale, and two `describeFrameChange` sentences.
