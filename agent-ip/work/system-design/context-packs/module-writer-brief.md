# Module writer brief: system design course

**North star:** this is our "Grokking the System Design Interview", done properly. A learner should truly grok each idea and enjoy it, by playing with visuals and doing small challenges. Keep text short and visual first, and give each Learn chapter a short "In an interview" fold: how to say it in two or three sentences and the follow-up an interviewer will ask.

You write one module of the system design course in the buildment course factory. You are the chapter writer and the scene author for that module. A different agent critiques your work afterwards.

## Read first

1. `agent-ip/agents/chapter-writer.md`, `agent-ip/03-authoring-standards.md` (Visual-first Learn chapters, Plain English, Forbidden patterns), `agent-ip/04-interactive-playbook.md` (fence syntax for predict, quiz, codeexercise, checklist, learning log).
2. `agent-ip/10-interactive-canvases.md` → Beat visuals.
3. The roadmap rows for your module: `agent-ip/work/system-design/02-curriculum-roadmap.md`. The chapter list, order, types, minutes and outcomes there are the plan.
4. The research dossier: `agent-ip/work/system-design/01-research-dossier.md`. Every number and claim comes from it, cited by its source id in a "Sources" fold. If it is not there, write `{/* source needed: ... */}` and list it in your reply. Never guess a number.
5. The template chapters, which show the exact shape to copy:
   - `content/import/system-design/10-time-clocks-and-ordering/10.06-truetime-time-as-an-interval.md`
   - `content/import/system-design/08-replication/08.04-replication-lag-and-its-anomalies.md`
   - Modules 1 and 2, which are finished: `content/import/system-design/01-thinking-like-a-system-designer/` and `02-numbers-estimation-and-probability/`. Copy their Build chapters (1.5, 2.8) for the challenge repository conventions.
6. The scene renderer: `frontend/src/canvas/renderers/scene/types.ts` (the data format) and two scene canvases as examples: `frontend/src/canvas/sysdesign-comment-flicker/data.ts`, `frontend/src/canvas/sysdesign-position-token/data.ts`.
7. Gate and quiz chapter examples in the AI interview course: `content/import/ai-engineering-interview/05-evaluation/05.06-quiz.md`, `05.07-checklist.md`.

## What you produce

### Chapters

In `content/import/system-design/<NN>-<module-slug>/`, one file per roadmap chapter: `<NN>.<MM>-<slug>.md`.

- **Read (set the scene):** `format: beats`, one or two beats. Never ask before you teach: no predict or question that needs this module's terms or mechanisms. Show the problem; at most ask "what do you notice?" or "what would you try first?" in everyday words. Put mechanism predictions in the Learn chapter that teaches them (`03-authoring-standards.md`).
- **Learn:** `format: beats`, four to eight beats, exactly as `03-authoring-standards.md` says, with 10.6 and 8.4 as the model.
- **Code:** one ```codeexercise fence in JavaScript, with starter code, hints and server-side tests that really exercise the function, plus at least 700 words of prose. Follow the fence schema in `04-interactive-playbook.md`.
- **Check:** a `-quiz.md` chapter, three to five ```quiz fences, stepType Check.
- **Gate:** a `-checklist.md` chapter, stepType Gate, with a checklist, a `## Learning log` section and the written open question from the roadmap's gate evidence table.
- **Build chapters:** write them, following 1.5 and 2.8: a challenge in the learner's public `system-design-challenges` repository, folder `challenges/challenge-N-name/` with `part-N` subfolders (each part: a README that teaches the 101, a script, results, a chart, and a node:test test). Run every code block you print in a scratch folder and paste real output. Plain JavaScript (Node 24, ESM).
- **Lab chapters:** skip them (the lab sandbox is not built yet). List them in your reply.

### Beat visuals

- Each beat opens with an `<InteractiveCanvas slug="sysdesign-..." />` or a `<MermaidDiagram ... />`.
- Use a canvas when something moves or changes (requests, copies, retries, a queue filling, a leader failing). Write it as **scene data**: a new folder `frontend/src/canvas/sysdesign-<short-name>/` with `data.ts` exporting a `SceneSpec` (kind "scene") and a short `spec.md` (claim, story, numbers, sources).
- Use Mermaid when the relationship is fixed (a topology, a decision tree).
- **Every Learn chapter needs at least one playable beat** (IP v0.5.1): something the learner drags or taps and sees respond, usually the one the roadmap's "Play / practice" column names. You do not build it; a canvas builder does, after you. Reserve a slug `sysdesign-m<N>-<name>` for it, put `<InteractiveCanvas slug="..." />` in the beat, write the beat text so it tells the learner what to drag or tap and what to notice, and in your reply give a precise spec per playable: the claim, the model and formulas with numbers from the dossier, the input range and snap points, what moves, the verdicts (38 characters or fewer), and which existing primitive could carry it (`frontend/src/canvas/primitives/`: traffic-playground, picture-slider, sorter, block-map, design-stepper, log-ruler, estimate-chain, year-strip). Do not create the playable's folder.
- For all other beats, write scene data (above) or Mermaid; do not write custom React components.
- Scenes must follow the rules the tests enforce:
  - width 420; actor boxes inside the picture;
  - actor second lines (`sub`, `say` text) of 15 characters or fewer;
  - verdicts of 38 characters or fewer;
  - every actor's box top (y minus 31) at 44 or more when the scene has a verdict;
  - no two actor boxes, strip tags or wait labels overlapping at any moment.
  - Keep stories to 4 to 8 seconds plus a pause, end on a verdict in words, and draw the numbers from the dossier.
- **Do not edit** `frontend/src/canvas/registry.ts` or `server/src/shared/canvas/slugs.ts`. Other writers are working in parallel, and the orchestrator registers your slugs. List every new slug and its export name in your reply.
- **Do not edit** anything else under `frontend/src/canvas/` or `server/`.

### course.yaml

Do not edit `content/import/system-design/course.yaml`. Put your module's yaml block (dir, title, summary, lessons with file, title and goal) in your reply instead.

## Hard rules

- Plain English for second-language readers: short sentences, every term defined on first use.
- Never use em dashes or en dashes anywhere.
- No AI or tool attribution. No marketing links.
- Real systems and papers may be named with sources. Learner-facing scenarios are fictional composites (say so).
- Quiz options: an explanation for every option, comparable lengths, the correct one never the longest, correct positions spread across A to D. Predicts have exactly two options.
- Visual style (`10-interactive-canvases.md` → Beat visuals): the card style is the default; text never touches art. Scenes are checked by tests, but keep labels short and away from links.
- Run `node agent-ip/scripts/audit-course.mjs content/import/system-design/<your module dir>` and fix every flag in your chapters.

## Reply with

1. The files you created.
2. The new slugs with their export names.
3. Your course.yaml block.
4. Audit results for your module.
5. Every `source needed` note.
6. The Lab chapters you skipped.
7. The playable spec for every reserved playable slug (see Beat visuals): write them to `agent-ip/work/system-design/playable-specs/m<N>.md` (one section per slug) and only list the slugs in your reply. The audit flags "no playable beat" until the builder adds them; that flag is expected.

## Never kill shared processes

Never run `taskkill /IM node.exe`, `killall node`, `Stop-Process -Name node` or anything that stops processes by name: the web app, the API, other agents and the user's own tools all run on Node. Stop only a process you started, by its PID.
