---
artifact: proposal
status: open, for the architect, delivery lead and one reviewer
date: 2026-10-26
exposed_by: the networking course (G4, module 1) and the system design course
---

# Proposal: canvases from Markdown, built on a catalog of reusable renderers

## Problem

The architect asked (2026-10-26) that future courses be "more about just writing MD files". Today most course content already is: `quiz`, `predict`, `openquestion`, `codeexercise`, `walkthrough`, `video`, `diagram` and `mermaid` fences are written in the chapter and turned into components by the importer (`frontend/src/mdx/transform-visual-fences.ts`). Canvases are the exception. Every canvas, even one that only feeds new data to an existing renderer, needs:
- a TypeScript `data.ts` and `spec.md` in its own folder;
- its slug added to three slug lists (`server`, `learning-ui`, `frontend`);
- a `registry.ts` entry, often a `package.json` export;
- a test.

The networking course's module 1 added 13 slugs this way. Most of them are data for 3 components.

Agents also have no single list of "which reusable renderer fits which teaching move", so each course risks building another one-off.

## Proposal

1. **A renderer catalog.** `10-interactive-canvases.md` gets one table of the reusable renderers, each with: the teaching move it fits, its parameters, a minimal example, and its limits. It starts with the ones that exist today:
   - **The existing renderers:** `sequence`, `timeline`, `state-machine`, `factor`, `slider` and `scene`.
   - **The playable primitives:** `sorter`, `block-map` and `traffic-playground`.
   - **Three built for networking:** `addr` (bits, prefix, mask, split, overlap, classify, drill), `packet` (inspect, lines, change, wrap, unwrap) and `replay` (a recorded terminal session with predictions).

   The interaction designer must pick from the catalog first. A new renderer is built only when none fits, and it is built generic, with a schema, so the next course can use it.
2. **A `canvas` fence.** A chapter writes:
   ````
   ```canvas
   renderer: replay
   title: Two computers inside your laptop
   recording: recordings/replay-sessions.txt#virtual-cable
   predict: [3]
   limits: The capture comes from a separate run, so its MACs differ.
   ```
   ````
   - **Parsing and storing:** the importer parses the YAML, validates it against the renderer's schema (zod), and stores the data with the block.
   - **Rendering:** the reader renders the generic renderer with that data.
   - **Failures:** invalid parameters fail the import with the field name, as quiz fences do today.
3. **Recording-backed data.** Renderers that show real output (`replay`, `packet`) read it from a recording file in the course work area, so nothing on screen is invented. The import fails if a referenced line is not in the recording.
4. **Slugs stay.** Registered slugs keep working for one-off custom canvases and existing courses; nothing is migrated in a sweep.
5. **Assets stay where they are.**
   - Static SVG images remain in `frontend/public/course-assets/<course>/` through the `diagram` fence (`11-visual-explanations.md`).
   - Audio, such as a narrated chapter, remains course-specific until the audio overview proposal in `04-interactive-playbook.md` is decided.

## Platform impact

- A `canvas` fence in `transform-visual-fences.ts`.
- An `InteractiveCanvas` that takes `renderer` plus `data` as well as `slug`.
- A schema per catalog renderer, and an importer check for the schema and the recording lines.
- The text QA script learns to render fence data as well as slugs.

These need a platform PR reviewed by the platform owners. Until that lands, courses keep writing `data.ts` files, but shaped exactly as the future fence parameters, so moving them later is mechanical.

## Interim rule for the networking course (no IP change)

New networking canvases are built as modes of the existing course renderers (`addr`, `packet`, `replay`) with plain serialisable data (no functions or JSX in `data.ts`) and a schema, so each one becomes a fence later without new code.

## Not changed by this proposal

No rule in the IP changes until the architect, the delivery lead and one reviewer sign off (`09-review-and-governance.md`), as a separate, logged change with a version bump.
