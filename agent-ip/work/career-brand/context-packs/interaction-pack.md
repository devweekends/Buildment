---
artifact: context-pack
course: career-brand
for: interaction-designer
version: 1
---

# Interaction pack: career-brand (course 16)

You are the interaction designer. Read, in `<repo>/agent-ip/`: `agents/interaction-designer.md` (your role), `10-interactive-canvases.md` (Interactive-first, Beat visuals, the design language, Reusable renderers, The reusable component library), `04-interactive-playbook.md` (placement matrix, density budgets, Custom interactive canvases, Diagram plan), `08-templates.md` sections 8 (Interaction map) and 14A (canvas spec), and the course inputs: `work/career-brand/blueprint.yaml`, `work/career-brand/module-briefs/*.md` and `work/career-brand/curriculum-roadmap.md`. Do not read research dossiers in full; open a source ID only if a beat depends on it.

## The task

Map every beat of every Learn and Read chapter (28 Learn, 9 Read) to the smallest visual that proves the claim, and write a canvas spec for every new canvas slug.

1. `work/career-brand/interaction-map.yaml` on template 8: per chapter, per beat: heading, claim, visual kind (`scene`, `sorter`, `phrase-fixer`, `budget-stack`, `slot-card`, `factor`, an existing slug reused, or `mermaid`), the slug, whether it is playable, where the predict sits, and the transfer check (the quiz item or gate task that later tests the claim). Every Learn chapter: four to eight beats, at least one playable beat, a predict right before the key beat. Read chapters: one or two beats, story register.
2. `work/career-brand/canvas-specs/<slug>.md` for every new slug, on template 14A but short (teaching claim, why this visual, the data in full: actors and events for a scene, buckets and cards for a sorter, segments for a phrase fixer, blocks and budget for a budget stack, slots and chips for a slot card; limits; what the learner should notice). Write the data **in the course's plain English, final wording**, so a chapter writer can turn it into `data.ts` without inventing anything. Numbers must match `module-briefs/00-areej-and-cast.md` exactly.

## Visual kinds you may use

- **`scene`** (`renderers/scene/`, data only): actors (`user`, `phone`, `server`, `database`, `router`, `cache`, `queue`, `cdn`, `clock`, `worker`, `note`), messages that fly between them with a label chip, `say` bubbles, tags on a strip, waits and a verdict. Watch-only. Read the type in `packages/learning-ui/src/canvas/renderers/scene/types.ts` and copy the shape of `packages/learning-ui/src/canvas/sysdesign-m28-silent-boxes/data.ts`. Width 420; at most 4 actors; labels short (fly labels about 18 characters, `say` about 16).
- **`sorter`** (`primitives/sorter.tsx`, data only, playable): 2 to 4 buckets, 6 to 8 cards, a reason of 60 characters or fewer for each wrong bucket, card text about 100 characters at most. Copy `packages/learning-ui/src/canvas/sysdesign-m28-answer-sorter/data.ts`. Do not use it in more than about a third of the Learn chapters; vary the playables.
- **Three new reusable primitives** (a canvas builder is building them now from this outline; describe your data for them in these terms):
  - **`phrase-fixer`**: a short text (a resume bullet, a headline, an About opening, a message, a site intro, a feedback card) shown as it would appear on a phone. Some phrases are weak; the learner taps the phrases they think are weak. A weak phrase, once found, shows why it is weak (at most 60 characters) and its fix; a tap on a fine phrase says why it is fine. A counter in the picture shows found / total and "facts a reader can check: N". When all are found, the text changes into the rewrite and a verdict line appears. Data: the text as an ordered list of segments, each `{ text, weak?: { why, fix } , fineWhy? }`, plus `verdict`, `endNote`. Text at most about 320 characters before and after.
  - **`budget-stack`**: a vertical stack of blocks (resume sections, profile parts, demo storyboard frames, post paragraphs, evidence rows), each with a cost (seconds of reading or watching, or lines) and a kind (`proof`, `filler`, `context`). A marker moves down the stack on its own, spending the budget; blocks past the budget fade to "not seen". The learner selects a block and moves it up or down (or drags it) and the marker runs again. The verdict counts the proof blocks seen inside the budget. Data: blocks `{ id, label, cost, kind, note }` (label about 40 characters), `budget`, `unit`, `budgetLabel`, `goal` (how many proof blocks must be seen), verdict wording. Budgets are illustrative and the limits say so: never "six seconds".
  - **`slot-card`**: a card with labelled slots (for example metric, before, after, window, source, your share) and a pool of chips. The learner taps a chip and then a slot (or drags). A right chip snaps in; a chip that belongs nowhere (a guess, an adjective, "AI estimate") or in another slot shakes and says why (at most 60 characters). The card shows "checkable parts: N of M" and, when complete, the assembled sentence. Data: `cardTitle`, slots `{ id, label }`, chips `{ id, text, slot | null, why }`, `assembled` (the finished sentence), verdicts.
- **`factor`** (`renderers/factor/`): only where the claim is "what matters most changes the winner" and a weight change must flip the result. At most two in the course.
- **Existing canvases from other courses** may be reused by slug when the claim and wording fit a career reader exactly (for example `sysdesign-m17-same-average` for "averages hide slow requests and percentiles do not average"). Search `packages/learning-ui/src/canvas/*/spec.md` by claim. List each reuse with the reason.
- **`mermaid`** (a ```mermaid fence or `MermaidDiagram`): for fixed relationships (an order of steps, a flow from the career arc to every artifact, the channel map). On phones: `flowchart TD`, at most 7 nodes, short labels, quote labels with punctuation. Counts as a beat visual, not as playable.
- **Custom canvases** (new React code): at most two in the whole course, only where none of the above can show the claim; give the reason in the spec. Prefer none.

## Design rules (from the IP)

- The picture leads and teaches one claim; numbers and the verdict sit inside it; at most two controls outside it; limits in a fold.
- Card register (`SvgNode`, `DotGrid`, `VerdictBanner`) for core concepts; the illustrated register only for story beats.
- No real people, companies or real profiles; platforms may be named only where the beat is about the platform; never the sponsor's own website.
- Respectful, real-feeling content for Gaza fellows (remote work, power cuts, weak data) with no drama; plain English; no idioms; no em or en dashes.
- Vary the playables across the course: a learner should not meet the same primitive in three Learn chapters in a row.

## Report

Write the files, then report: the count of beats, playables by kind, new slugs (one line each), reused slugs, custom canvases if any, and any beat in the module briefs you changed and why. No git. Absolute paths.
