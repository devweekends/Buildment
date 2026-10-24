---
artifact: canvas-spec
course: data-engineering
chapter: 05.03-partitions-and-file-sizes
slug: partition-file-size
version: 1
owner: interaction-designer
renderer: slider (renderers/slider/)
---

# Canvas spec: Finer partitions: fewer files read, more files made

## Teaching claim
A finer partition key lets a query skip more files, and it also splits the same rows into more, smaller files. The right level is the finest one whose files are still worth opening, which depends on how many rows arrive and on the queries you expect.

## Why a canvas
The gain (a week query opens 7 files, not 28) and the cost (224 files of 12.5 rows) come from the same choice. Switching the level and watching both numbers move together makes the trade-off visible, and raising the rows per day shows that the same layout can be sensible at a larger size.

## Model
- Inputs: partition level (0 none, 1 day, 2 day and market; default 1), days of data (1 to 365, default 28), rows per day (100 to 200,000, step 100, default 100).
- Rule (toy): 8 markets; one file per partition; every row lands in one file.
  - files = 1, days, or days x 8;
  - average rows per file = days x rows per day / files;
  - a one-week query opens 1 file (no partitions), min(7, days) files (day), or min(7, days) x 8 files (day and market);
  - rows read = all rows when there are no partitions, otherwise min(7, days) x rows per day.
- Defaults: 28 files, 100 rows per file, 7 files opened, 700 rows read.
- Day and market: 224 files, 12.5 rows per file, 56 files opened.
- Stats: files in the lake, average rows per file, files a week query opens. Bars: files in the lake, files a week query opens.
- Limitations: Mizan's real day-and-market count is 222 (market M05 had no upload on two days); no row groups, no file sizes in bytes, no read speed.

## Rendering
The shared slider renderer. Three sliders, three stat cards, two bars on one scale (the number of files). The first slider's label carries its meaning ("0 none, 1 day, 2 day+market") because the slider shows only a number.

## Controls
Three range inputs and Reset. The partition level is a three-position slider.

## Visualisation
Two bars: all files, and the files one week query opens. Neutral colour.

## Copy
- What this shows: a count of files for three partition levels and the files a one-week query opens.
- Try this: (1) level 1 to 2 gives 28 to 224 files and 100 to 12.5 rows per file; (2) level 0 gives one file the query must read in full; (3) 100,000 rows a day makes daily files large.
- What changed: `describePartitionChange` gives the old and new file counts, average rows and files opened.
- Limits of the model: as in `limits`.

## Edge cases
With fewer than 7 days, the week query covers every day. With no partitions, files = 1 and nothing is skipped. The largest case (365 days, 8 markets, level 2) is 2,920 files.

## Accessibility
Native range inputs, a live summary sentence, labelled bars, no colour-only meaning.

## Acceptance criteria
- [x] The claim is testable: the 5.3 quiz and the 5.7 gate ask for file counts on new cases.
- [x] The model is tested in `frontend/tests/unit/canvas/partition-file-size.test.ts`: defaults, the three "try this" settings, an edge and `describePartitionChange`.
- [x] Predict before (5.3 predict), transfer after (5.3 quiz, 5.6 quiz, 5.7 gate).
- [x] Reader fallback in prose: chapter 5.3 gives the real counts from Mizan's data (28, 222 and 1 files).

## Build plan
`packages/learning-ui/src/canvas/partition-file-size/data.ts`, registered by the orchestrator in `registry.ts` and `server/src/shared/canvas/slugs.ts`.
