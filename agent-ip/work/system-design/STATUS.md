# System design course: status (2026-10-24, end of day)

## Where things stand

- Branch `content/system-design`, pushed at `1352fa83`. PR #60 (to main) is mergeable; CI was running at push time.
- The course is complete: 29 modules, now 264 chapters with the two new lab chapters. Audit: 0 need work. Validator: 264 of 264 OK.

## Uncommitted work in this worktree (mine, ready to commit)

1. **Labs in the course** (user asked: "lets use some components from our lab components"; chose the system design course):
   - New lab specs `frontend/src/lab/hld-m4-three-tiers/` and `frontend/src/lab/hld-m20-wasla-redirects/` (data.ts + spec.md), registered in `frontend/src/lab/registry.ts` and `server/src/shared/lab/slugs.ts` (+ synced copy `frontend/src/shared/lab/slugs.ts`).
   - New chapters 4.9 "Lab: three tiers at 10,000 requests a second" and 20.6 "Lab: a URL shortener with cache-aside", added to `courses/system-design/course.yaml`.
   - Chapter 2.5 gained a beat that embeds the existing `hld-m2-utilisation-knee` lab.
   - Fixed the knee lab's starting board (`hld-m2-utilisation-knee/data.ts`): the load balancer and database are sized up so the app tier is the part that reaches the knee. Before, the load balancer hit the knee first and the lab's own spec was wrong.
   - Every target was tuned against the real model and recorded in each spec.md. Checked in the browser: starting numbers match.
2. **Further reading pointers** (user: link to the Linux, Docker, Kubernetes, AWS and networking courses where relevant; none exist yet, links to improve later): 27 chapters, each a "Further reading" paragraph in the last fold before the quick check. Each pointer says "(coming soon)" and carries a marker `{/* course-link: <slug> */}` (slugs: linux-for-infra-engineers, docker-in-practice, kubernetes-in-practice, aws-in-practice, networking). Find them all with `grep -rn "course-link:" courses/system-design`.
3. **agent-ip:** `scripts/audit-course.mjs` accepts `<Lab>` as a beat's opening visual; logged in `decision-log.md` (2026-10-24 entry).

4. **Added 2026-10-25 while running the course locally:**
   - `<Lab>` rendered as literal text in the reader: `Lab` was missing from the tag list in `server/src/shared/mdx/restore-block-tags.ts` (+ synced frontend copy). Fixed; all three lab beats render in real chapters.
   - The strict structure audit (run by `courses:check` in CI) failed: quick-check quizzes in 4.9 and 20.6 used the wrong fence format (now `type: mcq`), and modules 11, 19 and 29 had no `*-checklist.md` or set-the-scene file. Renamed `11.11`, `19.09` and `29.06` to `...-checklist.md` and `29.01` to `29.01-set-the-scene-choose-your-system-and-read-the-rubric.md`, in course.yaml too. Strict audit: 0 errors.
   - Local run: published to the local DB with a scratch script (in this session's scratchpad, `scratch-publish-sysdesign.ts`, copy into `server/` to rerun). Test learner mentee1 is enrolled.

Checks run: course audit 0, validator 264/264, frontend lab tests 48/48, typecheck 0 errors, eslint clean on the lab files.

## Not done, and why

- **Lab 5.10 (CDN) skipped:** the lab model has no distance to far-away users and no egress cost, so an all-extra-large origin beats a CDN on both p99 and price. A lab on it would teach the opposite of chapter 5.7. Needs a model change on the lab platform first.
- **Other planned labs** (6.10, 9.9, 13.10, 19.7, 21.6 to 29.2): the model cannot score rate-limit accuracy, hash rings, quorums, RPO/RTO or fan-out yet. 22.7, 26.6 and 27.7 may fit; not tuned.
- The lab board scores level 1 only; levels 2 and 3 in each spec are not played yet (lab platform work).
- `frontend/src/app/zz-lab-preview/` (from the lab session) is a public, no-auth test page on the branch. It says "Delete after review". Remove it before PR #60 merges.

## Next step on Monday

1. Ask the user to commit the uncommitted work above in small commits (labs, chapters, further reading, agent-ip), then push to update PR #60.
2. Decide with the user: CDN lab (needs a model change), and which further labs to tune next.
3. Infra courses (Linux, Docker, Kubernetes, AWS, networking) stay unbuilt by the user's instruction; each session wrote its own STATUS.md in `agent-ip/work/<course>/`.

## Local stack notes

- Postgres: portable 16 on 5436, data in this session's scratchpad `pgdata`; binary from another scratchpad (`771ceb09.../scratchpad/pg/native/bin`). A temp cleanup had deleted empty Postgres dirs; recreated. Local DB has main's migrations applied.
- `content:import` now refuses courses with releases; the reviewed publisher (`courses:publish`) republishes every repository course, so it was not run.
- D: had 2.3 GB free; cleared `frontend/.next` (about 4.5 GB free after).
