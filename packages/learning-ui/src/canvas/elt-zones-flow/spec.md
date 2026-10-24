---
artifact: canvas-spec
course: data-engineering
chapter: 06.02-etl-elt-and-zones
slug: elt-zones-flow
version: 1
owner: interaction-designer
renderer: sequence (renderers/sequence/)
---

# Canvas spec: One price report, from the phone to the warehouse

## Teaching claim
Personal data stops at the restricted zone: the shared zone and the warehouse hold a keyed code instead of the name and the phone number. Loading comes before transforming (ELT), so the warehouse loads the shared files unchanged and the models run afterwards.

## Why a canvas
The claim is about order and about where each column stops. Stepping through five moves shows the order, and the chips under each note show which columns exist at that point. A single diagram would show the zones but not what changes between them.

## Model
- Actors (four lanes): phone form, restricted zone, shared zone, warehouse.
- Steps: upload JSON (phone to restricted); land as Parquet (restricted, a loop); publish, no names (restricted to shared); load unchanged (shared to warehouse); transform (dbt) (warehouse, a loop).
- Columns by step: the upload carries report_id, price, volunteer_name and volunteer_phone; the shared copy carries volunteer_key and no name or phone.
- Assumptions: one report, the course's zone names, a key made with a secret held outside the data.
- Limitations: a real file holds a hundred reports; the key is still data about a person for anyone who holds the secret; quarantine is added later (chapter 8.5).

## Rendering
The shared sequence renderer, four lanes. Arrow labels are 18 characters or fewer: "upload JSON", "land as Parquet", "publish, no names", "load unchanged", "transform (dbt)". Two steps are loops (work inside one zone).

## Controls
Back, Next, Play and Start over from the shared stepper; arrow keys when focused.

## Visualisation
Numbered arrows between lanes. The publish step and the ELT step use the good tone and carry a short outcome badge ("pseudonymised", "ELT").

## Copy
- What this shows: the route of one report and the point where the name and phone are replaced by a key.
- Try this: predict the shared columns before step 3; find the word that says when the transformation happens.
- What changed: each step note says what the report holds after the move.
- Limits of the model: as in `limits`.

## Edge cases
None: the flow has no inputs and no branches.

## Accessibility
The summary sentence is read to screen readers; each step note is a live region; chips are text; colour is paired with the outcome badge.

## Acceptance criteria
- [x] The claim is testable: the 6.2 quiz asks where a column must stop on a new case.
- [x] Four lanes, five steps, labels of 18 characters or fewer; the registry test checks that the labels fit at phone width.
- [x] Predict before (6.2 predict), transfer after (6.2 quiz, 6.6 quiz, 6.5 build).
- [x] Reader fallback in prose: chapter 6.2 shows the restricted and shared columns for one real report.

## Build plan
`packages/learning-ui/src/canvas/elt-zones-flow/data.ts`, registered by the orchestrator in `registry.ts` and `server/src/shared/canvas/slugs.ts`.
