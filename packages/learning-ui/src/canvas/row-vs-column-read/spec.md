---
artifact: canvas-spec
course: data-engineering
chapter: 05.02-rows-columns-and-parquet
slug: row-vs-column-read
version: 1
owner: interaction-designer
renderer: slider (renderers/slider/)
---

# Canvas spec: Rows or columns: how much does a query read?

## Teaching claim
A column layout lets a query read only the columns it uses, so the data it skips depends on how many of the table's columns the query needs. A row layout reads every column of every row. If the query uses every column, there is nothing to skip.

## Why a canvas
The saving is a ratio, and a ratio is easier to feel when you can change both sides of it. Moving "columns the query uses" from 3 to 10 shows the saving disappear, and doubling the rows shows that the share skipped does not change. Prose alone gives one example.

## Model
- Inputs: columns in the table (2 to 40, step 1, default 10), columns the query uses (1 to 40, step 1, default 3), rows in the table (0.1 to 100 million, step 0.1, default 2).
- Rule (toy, equal-width columns, 8 bytes per value, no compression):
  - row layout reads = rows (millions) x columns x 8 MB;
  - column layout reads = rows (millions) x used columns x 8 MB, where used columns is the smaller of the slider and the table's columns;
  - share not read = (columns - used columns) / columns.
- Defaults: 2 x 10 x 8 = 160 MB and 2 x 3 x 8 = 48 MB, so 112 MB (70%) is not read.
- Stats: row layout reads, column layout reads, share not read. Bars: row layout, column layout, skipped, on one scale (the row layout).
- Limitations: no compression, no statistics-based skipping, equal-width columns, no file-open cost, and a lookup of one whole record needs every column in either layout.

## Rendering
The shared slider renderer. Three sliders, three stat cards, three bars. The input "Columns the query uses" is clamped to the table's columns inside the model, so no corner of the slider range gives a negative or infinite value.

## Controls
Three range inputs with a visible value and unit, and Reset.

## Visualisation
Horizontal bars that share a scale, so the lengths compare. Colour is neutral because no bar means success or error.

## Copy
- What this shows: the data a row layout and a column layout must read for one query, under a simple equal-width rule.
- Try this: (1) 3 of 10 columns reads 48 MB against 160 MB, then 10 of 10 reads the same; (2) 1 of 40 columns skips 97.5%; (3) doubling the rows doubles both numbers but leaves 70%.
- What changed: `describeReadChange` states both layouts' new sizes, their old sizes and the new share not read.
- Limits of the model: as in `limits`.

## Edge cases
Columns used above the table's columns is clamped. The smallest table (2 columns, 0.1 million rows) reads 1.6 MB. The largest (40 columns, 100 million rows) reads 32 GB, shown as "32 GB".

## Accessibility
Native range inputs, a live summary sentence for screen readers, bar labels with values, no colour-only meaning.

## Acceptance criteria
- [x] The claim is testable: the 5.2 quiz asks for the share skipped on a new case.
- [x] The model is tested in `frontend/tests/unit/canvas/row-vs-column-read.test.ts`: defaults, the three "try this" settings, the clamp and `describeReadChange`.
- [x] Predict before (5.2 predict), transfer after (5.2 quiz, 5.6 quiz).
- [x] Reader fallback in prose: chapter 5.2 explains the same example.

## Build plan
`packages/learning-ui/src/canvas/row-vs-column-read/data.ts`, registered by the orchestrator in `registry.ts` and `server/src/shared/canvas/slugs.ts`.
