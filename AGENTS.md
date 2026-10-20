# Buildment for coding agents

Next.js frontend in `frontend/`, Express + Prisma API in `server/`, course source in
`content/import/`. Product and technical spec: `docs/README.mdx`.

## Building or editing a course

Follow `docs/course-authoring/README.mdx` from start to finish. It is the source of truth for the
lesson format, quiz rules, audience rules, the verify loop and the PR checklist. Pick the course
track in `docs/course-authoring/tracks.mdx` first. Engineering courses also follow the course
factory in `agent-ip/` when it is present.

Rules that always apply:

- Stop after the plan (`content/import/<course-slug>/course.yaml`) and get it approved before
  writing chapters.
- Before the PR, run the independent review in `docs/course-authoring/review.mdx` as a separate
  pass (another person or a separate agent run), never as the author of the chapters.
- Run content scripts from `server/`: `pnpm content:validate:source --course <slug>`, then
  `pnpm content:audit --course <slug>`, then `pnpm content:import --course <slug>`.
- Never edit `content/transformed/` by hand. `content:import` rewrites it on every run, so only
  commit changes there on purpose.
- No em dashes in anything you write, and no AI attribution in commits or pull requests.
