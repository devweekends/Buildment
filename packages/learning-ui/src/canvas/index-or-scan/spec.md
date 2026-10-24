# When does an index beat a full scan?

- **Slug:** `index-or-scan`
- **Export:** `indexOrScan` in `data.ts`
- **Course:** Data Engineering, chapter 3.4 "Query plans and indexes".
- **Teaching claim:** An index helps when a query picks few rows; when it picks a large share of the table, a full scan reads fewer pages in total.
- **Renderer:** slider (`renderers/slider/`).

## Model

Toy rule (a simple illustration, never a measurement):

- Pages with an index = log2(rows) + 3 x matching rows.
- Pages with a full scan = rows / 100.
- Break-even share = (rows / 100 - log2(rows)) / (3 x rows).

Inputs: rows in the table, in thousands (10 to 1,000, step 10, default 200); share of rows matching, in percent (0.1 to 100, step 0.1, default 0.1).

Worked values (200 thousand rows):

| Share | Matching rows | Index pages | Scan pages | Cheaper |
|---|---|---|---|---|
| 0.1% (default) | 200 | 618 | 2,000 | Index |
| 0.3% | 600 | 1,818 | 2,000 | Index |
| 0.4% | 800 | 2,418 | 2,000 | Full scan |
| 12.5% | 25,000 | 75,018 | 2,000 | Full scan |

The break-even point for 200 thousand rows is about 0.33 percent. At 1,000 thousand rows and 0.1 percent, the index reads 3,020 pages and the scan 10,000.

Stats: pages with the index, pages with a full scan, the cheaper plan (with the break-even share). Bars: pages read by each plan (shared scale, the cheaper bar tone good).

## Copy blocks

- **What this shows:** two plans for the same query and what each reads, under a stated toy rule.
- **Try this:** (1) share 12.5 percent: the full scan wins, 2,000 pages against 75,018. (2) share 0.3 then 0.4 percent: the cheaper plan flips near 0.33 percent. (3) 1,000 thousand rows at 0.1 percent: the index wins by more pages.
- **What changed:** `describeIndexChange` says the pages read by each plan after the change, and whether the cheaper plan changed.
- **Limits:** toy rule; real engines use caches, order, and estimates; the real break-even point has to be measured.

## QA

Tests in `frontend/tests/unit/canvas/index-or-scan.test.ts`: defaults, the try-this values, the break-even point, the corners of the inputs, and `describeIndexChange` sentences.
