# G3 critique: 8.4 Replication lag and 10.6 TrueTime

```yaml
artifact: critique
course: system-design
artifact_under_review:
  - content/import/system-design/08-replication/08.04-replication-lag-and-its-anomalies.md
  - content/import/system-design/10-time-clocks-and-ordering/10.06-truetime-time-as-an-interval.md
  - frontend/src/canvas/sysdesign-replica-lag/ (model.ts, data.ts, spec.md, ReplicaLagCanvas.tsx)
  - frontend/src/canvas/sysdesign-truetime-commit-wait/ (model.ts, data.ts, spec.md, TrueTimeCanvas.tsx)
  - frontend/src/canvas/renderers/timeline/, frontend/src/canvas/primitives/controls.tsx (shared)
lens: pedagogy, slop, assessment, technical, continuity, interactive canvas
scorecard_average: 3.95 (20 scored dimensions)
blocking_defects: 1 (S2)
recommendation: revise
```

Reviewed blind: chapters, canvas code, specs, tests, the rubric and the research dossier. No writer rationale was read.

## How this was checked

- Read both models line by line and recomputed every number the chapters quote (defaults, thresholds, counts) by hand and by running the two models from a scratch copy with Node 22 (`--experimental-strip-types`). All chapter numbers match the models: 150 ms fast replica, reads at 200/350/500, "1 of 3 missed, 1 of 3 back in time" by default, token router 0 of 3 on the leader, leader router 3 of 3, first refresh 0 ms gives 2 missed and 0 back in time; TrueTime s1 = 17.6, s2 = 12.4, flip at gap 8 ms (disagreement 7.2 ms), commit wait 8 ms, overlap still true with commit wait on and with "Both exact".
- Ran both chapter code samples from the scratchpad (not on D:). The 8.4 router reproduces the walk-through exactly. The 10.6 commit wait sample runs, but its timing claim does not hold on Windows (defect 6).
- Ran `node agent-ip/scripts/audit-course.mjs content/import/system-design`: both chapters pass (prose 2,301 and 2,402 words, 3 assessments each, 1 diagram each, needs work 0).
- Counted option lengths, dashes and sentence lengths with a script. No em or en dashes and no `BigWordAlert` in chapters, specs or canvas code. Every predict has exactly two options.
- Checked Mermaid 11.17.2 (installed): plain edge labels such as `|1. post comment|` are not parsed as Markdown, so no "Unsupported markdown: list" risk.
- Ran an approximate label-collision check on the timeline geometry (`geometry.ts` with the renderer's label positions) for every routing and clock case.
- Checked facts against `01-research-dossier.md` and, for the ClockBound licence only, the aws/clock-bound README (read 2026-10-23).
- Not done: rendering in the reader, dark mode, 375px and keyboard checks (a dev server would write to the full D: drive). The visual defects below come from geometry, not screenshots; confirm them in `/workspace/canvases`.

## Gate precondition (not a chapter defect)

`02-curriculum-roadmap.md` records `g2b_signoff: pending` and there is no `roadmap-confirmation.md`. Per `06-quality-gates.md`, G2B is a hard prerequisite for G3, so these chapters cannot pass G3 whatever the scores, and dimension 19 (instructor alignment) cannot be scored.

## Defects

### S2: must fix before publish

**1. 8.4 does not deliver its roadmap outcome for consistent prefix, and nothing assesses it.**
Location: `08.04...md` frontmatter `summary: "...understand consistent prefix..."`; section "Three promises", paragraph beginning "**Consistent prefix.**"; `02-curriculum-roadmap.md` row 8.4: "Reproduce read-your-writes, monotonic reads and consistent prefix violations, and fix each". `course.yaml` has quietly dropped consistent prefix from the goal.
Why it matters: the outcome was narrowed without a recorded roadmap change. The chapter gives consistent prefix one paragraph, says the canvas does not model it (honest), names the fix in one clause, and no predict or quiz touches it. A learner can finish 8.4 without being able to spot a consistent prefix violation. A change like this should go through the roadmap, not around it.
Fix: pick one and record it in `decision-log.md`. (a) Move consistent prefix reproduction to 11.4, whose roadmap row already has "spot a reply shown before its question". Then edit the 8.4 roadmap row, and replace "understand consistent prefix" in the summary with "meet consistent prefix (reproduced in 11.4)". Or (b) keep it in 8.4: add one quiz scenario where a reader sees Hana's answer without Bilal's question and must name the broken promise and the fix (same partition, or track dependencies). Option (b) needs one quiz swapped out (defect 12), so the 3-assessment budget holds.

### S3: fix before publish or track

**2. TrueTime timeline: with commit wait on, the commit wait bar is drawn on top of A's range and the two labels collide.**
Location: `sysdesign-truetime-commit-wait/model.ts`, `trueTimeTrace` items: the span `lane: "a", from: o.rangeA.earliest` and the span `lane: "a", from: 10, to: o.ackAt, label: commit wait ...` share one lane. `TimelineView.tsx` `Span` draws every span at `y - 8` with its label at `y + 24`.
Why it matters: "commit wait on" is the state the whole chapter builds to. In every clock case at every epsilon, "A's range 9.6 ms to 17.6 ms" and "commit wait 8 ms" print over each other, and the two bars (9.6 to 17.6 and 10 to 18) almost coincide. Separately, with "A slow, B fast" and no wait, the labels "done" (10) and "s1 = 10.4" (both `labelRow: 1`) overlap. The geometry check also flags "A's range ..." against the "Alice posts" message label on the wide layout in most cases.
Fix: give spans a row offset (as points have `labelRow`) and draw commit wait as a second, thinner bar below the range, with its label under it. Put `done` on `labelRow: 0` or 2. Add a geometry test that fails when two labels in one lane overlap, across all 3 clock cases, wait on/off and epsilon 1 and 10.

**3. TrueTime timeline clips ranges that start before 0 ms, so a range looks narrower than 2 times epsilon and its label shows a negative time.**
Location: `model.ts` `T1_START = 10` and `trueTimeTrace` `range: [0, end]`; `geometry.ts` `.clamp(true)`. Examples: "A slow, B fast", epsilon 10, gives A = [-9, 11]; "A fast, B slow", no wait, epsilon 10, gap 2, gives B = [-7, 13]; the label reads "A's range -9 ms to 11 ms".
Why it matters: the canvas teaches that every range is 2 times epsilon wide. A clipped bar contradicts that, and "-9 ms" before the run starts confuses a beginner. The test file checks range bounds only for "a-fast", so this is not caught.
Fix: set `T1_START` to 20 ms (largest possible error plus epsilon is 19 ms), or start the axis at `min(0, earliest)` rounded down. Extend the range test to all three clock cases.

**4. 10.6 suggests that hiding the wait is why the measured commit wait (5 ms) is below the 8 ms it just computed.**
Location: `10.06...md`, "How commit wait works": "With epsilon near 4 ms, that is about 8 ms on every read-write transaction. Spanner hides part of it by doing other commit work during the wait ... In the paper's single-replica benchmarks, commit wait was about 5 ms (section 5.1)."
Why it matters: overlapping the wait with Paxos hides the wait from total latency. It does not shorten the wait itself, and the paper's "commit wait is about 5ms" measures the wait. Read in this order, the paragraph teaches a false cause. A careful learner will also see "at least 8" next to "about 5" and not know which to trust.
Fix: keep the two facts apart and state each one exactly. "The paper says the expected wait is at least 2 times the average epsilon. In its 1-replica benchmark it measured commit wait at about 5 ms, so epsilon there was lower than the typical 4 ms. Spanner also overlaps the wait with Paxos replication, so the user does not pay all of it on top of the other commit work." Dossier [S60] supports both numbers.

**5. 8.4 cites a source the dossier did not read, and its AWS paragraph has no verified source.**
Location: `08.04...md` "Where the lag comes from": "Kleppmann (Designing Data-Intensive Applications, chapter 5) points out..."; "Kleppmann calls this a consistent prefix violation"; the Sources line; the "In AWS" paragraph (RDS read replicas asynchronous via engine replication, CloudWatch replica lag metric, Aurora reader endpoint).
Why it matters: the dossier says "Its spec cites DDIA chapter 5, which was not read for this dossier; add Kleppmann's Cambridge notes [S52] and Terry 1994 [S50]". The authoring rules say "Do not cite a source you did not read". Consistent prefix comes from Terry 2011 [S51], not Terry 1994, and the chapter cites neither for it. The dossier verifies Aurora [S39] only, not the RDS read replica, CloudWatch or reader endpoint claims. The claims are true to my knowledge, but they are unsourced.
Fix: cite [S52] for lag under load (or have research read DDIA ch. 5 and add it to the dossier), [S51] for consistent prefix, [S38] for PostgreSQL ("typically under one second") and the WAL functions, and [S39] for Aurora "usually much less than 100 milliseconds". Add the RDS read replica and reader endpoint docs pages to the dossier, then cite them on the Sources line.

**6. 10.6 code: the stated timing is wrong on Windows, which is the likely learner platform.**
Location: `10.06...md`, after the code: "Run it with a `saveWrite` that takes 0 ms and the function returns a little over 8 ms after it starts".
Observation: on Windows 11 with Node 22.22.2, `sleep(1)` takes about 15.5 ms, and the function returned in 11.6 to 19.0 ms over 9 runs (save 0 ms and save 5 ms alike). Also, `Date.now()` is in whole milliseconds, so the minimum is 9 ms, not "a little over 8".
Why it matters: a learner who runs it sees nearly twice the promised number and may decide they misunderstood commit wait.
Fix: say "at least 8 ms; timers add a little, and on Windows a 1 ms timer can take about 15 ms". Or compute the remaining wait and sleep once: `await sleep(s - ttNow().earliest + 1)` inside the loop. The claim "with save 5 ms the total stays the same" did hold in the run.

**7. 8.4 "Try this" says the bug goes away once the refresh is past the lag, but it goes away at 450 ms, before the 600 ms lag.**
Location: `ReplicaLagCanvas.tsx` tryThis[1]: "move the first refresh past the lag. The comment never disappears"; chapter "Try this": "refresh later than the lag"; `spec.md` Try this 2: "first refresh 650 ms or later". Model run, first refresh 0 to 700 in 50 ms steps, any replica: missed/back-in-time = 2/0 up to 100, 1/1 from 150 to 400, 0/0 from 450.
Why it matters: a learner who slides step by step sees the bug vanish at 450 ms, well before "past the lag", and thinks the canvas is wrong. The real reason is a good lesson: only refresh 2 lands on replica 2, at first + 150 ms.
Fix: change the copy to "Move the first refresh until refresh 2 (150 ms later) lands after replica 2 catches up: from 450 ms nothing breaks. Only the read that hits the slow replica matters." Correct the spec threshold to 450.

**8. Router names in the 8.4 prose do not match the canvas labels.**
Location: `08.04...md` uses "the default router", "the turn-taking router", "the position router", "the token router" and "the two good routers". The canvas control "Where do Amna's reads go?" shows "Any replica", "Leader for own reads", "Replica at my position" (`ROUTING_LABEL` in `model.ts`).
Why it matters: "Choose the position router" asks a second-language reader to map four invented names onto three button labels.
Fix: use the exact labels in prose ("Choose **Replica at my position**"). After that, use one short name for each throughout, for example "the any-replica router".

**9. The replica-lag spec claim overstates what position tokens fix.**
Location: `sysdesign-replica-lag/spec.md` Claim: "routing to a replica that has reached the client's last-write position fixes both". The chapter's own table says monotonic reads are "Fixed if reads raise the token", and its paragraph explains why.
Why it matters: the claim holds only because the model has one writer and one record. As written, the spec teaches the generalisation the chapter corrects.
Fix: "In this one-writer model, routing to a replica at the client's last-write position fixes both. In general it fixes read-your-writes; monotonic reads also need the token raised to the position of each replica that served a read." Add one sentence like it to `data.ts` limits.

**10. The 600 ms default is not tied to a kind of system anywhere the learner sees.**
Location: `data.ts` limits, chapter "Reproduce the bug" ("600 ms behind the leader by default"). The spec has the justification; the learner does not.
Why it matters: the dossier asks that "The canvas should state which kind of system it models". The chapter's AWS paragraph says Aurora lags far less, so a learner may think 600 ms is typical everywhere.
Fix: add one sentence to the chapter and the limits: "600 ms is like a PostgreSQL streaming replica under heavy writes (PostgreSQL says lag is typically under one second); Aurora replicas usually lag much less than 100 ms."

**11. 8.4 Aurora reader endpoint: it balances connections, not requests.**
Location: "In AWS": "Aurora's reader endpoint also spreads connections across replicas, so two requests can land on different replicas, which is the same setup as the canvas's turn-taking router."
Why it matters: requests on one pooled connection stay on one replica, which behaves like the sticky router, not the turn-taking one. The comparison is right only for new connections.
Fix: "...spreads new connections across replicas, so two page loads that open separate connections can land on different replicas. A connection pool that keeps one connection per user behaves more like a sticky replica."

**12. 8.4 quizzes do not test the stated outcome "say which promise a lagging replica breaks in a given story".**
Location: both quizzes in `08.04...md` (Yusuf sticky replica, Hana token). Both are about the writer's own reads.
Why it matters: monotonic reads for a non-writer and consistent prefix (defect 1) are never assessed. The skimmer red-team passes with read-your-writes alone.
Fix: replace quiz 1 or extend it with a story where a reader who is not the writer sees a comment and then loses it. Ask which promise broke and which router fixes it. Keep the Hana token quiz, which is a good application item.

**13. 10.6 quizzes mostly test the paragraphs above them.**
Location: quiz 2 reuses the opening numbers (12:00:00.000, 12:00:00.001, 7 ms), and the section "Back to the two writes 1 ms apart" answers it word for word two sections earlier. Quiz 1 ("epsilon falls from 5 ms to 2 ms") repeats "Halve epsilon and you halve the wait". Its correct option is the only one with numbers, and distractor C ("only reads ever wait") is not plausible.
Why it matters: these measure reading, not transfer. The anti-slop checklist calls out "A quiz that tests the paragraph above".
Fix: quiz 2, a new case where the outcome turns on whether a user saw the first result. For example: a bank teller sees "deposit done" on server A, then a customer's balance read hits server B. Must the order be real, and what makes it so? Quiz 1, give every option a number (for example "about 2 ms", "about 4 ms", "about 10 ms", "unchanged at 10 ms") so the learner has to compute 2 times epsilon.

**14. Sentences over the plain-English limit.**
Location: 8.4 has 13 sentences over 25 words, 10.6 has 16 (average about 15, which is good). Worst in prose: 8.4 "Bilal asks ... own lag." (40 words), "If you moved the first refresh to 0 ms with the turn-taking router, ..." (37), "By the end you can say which promise ..." (38). 10.6: "It removes the uncertainty problem, but every write now makes an extra trip ..." (39), "**What changed.** In the default run, s1 was 17.6 ms ..." (36), "Run it with a `saveWrite` ..." (32).
Fix: split each at its colon or "and". The standard is "about 20 words or fewer".

**15. Shared canvas primitives fade explanation text with opacity.**
Location: `primitives/controls.tsx` `WhatChanged`: `className="... text-foreground/85"`. `primitives/canvas-frame.tsx` `CanvasNotes`: the tryThis list uses `text-foreground/85`, and the limits paragraph uses `text-muted-foreground`.
Why it matters: `03-authoring-standards.md` Readability: "Never fade paragraph text with opacity (`opacity-90`, `text-foreground/85`)". "What changed", "Try this" and the limits are the teaching copy of every canvas and are read on cheap phones in sunlight.
Fix: use `text-foreground` for WhatChanged, Try this and Limits. Keep the muted token for the purpose line and slider min/max captions only.

**16. 10.6 predict uses "commit wait" before the chapter explains it.**
Location: predict prompt "...with no commit wait. Which commit gets the larger timestamp?" The first explanation comes after the canvas ("Commit wait removes that risk by delaying 'done'..."). The full mechanism comes in the next section.
Why it matters: for a second-language reader, an undefined term in the prediction makes them doubt the question.
Fix: drop "with no commit wait" from the prompt (the default has none), or add one sentence before the predict: "Spanner can also make a server wait before it says done; that is called commit wait, and it is off for now."

**17. The 8.4 router snippet is close to a full solution for code exercise 8.8.**
Location: "A read router with position tokens" (`rememberWrite`, `pickNodeForRead`); bridge "You will write a fuller version in 8.8, with graded tests". Roadmap 8.8: "Route reads to a replica whose applied position is at least the client's last write token".
Why it matters: the copier red-team. As specified in the roadmap, a learner can pass 8.8 by pasting this code.
Fix: either cut the snippet to the decision (the comparison and the fallback) and leave the loop to 8.8, or record now that 8.8's tests must cover what the snippet leaves out: raising the token on reads, the leader cap during a lag spike, and a replica whose position moves backwards.

### S4: polish

**18.** 8.4 quiz 2, explanation A: "Positions 9,032 to 9,040 may include Hana's own write". The token is the position of her last write, so 9,040 is her write. Fix: "Position 9,040 is Hana's own write, and replica 1 has not applied it yet."

**19.** All four MCQs put the correct answer at index 1 or 2, never first or last. In 8.4 quiz 2 the correct option (51 characters) ties for longest with D (51). Fix: move one key to A and one to D, and shorten option C of 8.4 quiz 2 ("The leader, since no live replica has 9,040").

**20.** 8.4 quiz 1, distractor D: "The new one, because the app asks the leader first" contradicts the stem ("sends each user's reads to one fixed replica"), so it eliminates itself. Fix: "The new one, because the save waits for all replicas".

**21.** Terms not defined on first use. 8.4: "standby" in the Postgres sentence (say "a standby, Postgres's name for a replica"). 10.6: "daemon" ("a background program"), "sawtooth" (say what it means first: rises steadily, then drops back at each poll), "in flight" (say "running at the same time"), and "linearizability" in the external consistency glossary entry, which is taught later, in 11.3 (say "a strong guarantee you will meet in module 11").

**22.** 10.6 ends with an internal note: `{/* verify: ... a standard teaching example for Spanner in university course notes ... */}`. MDX strips it from learner output, but it is reviewer metadata in course source, and the "university course notes" claim is unsourced (the dossier lists the example's source as open). Fix: move the note to the QA folder. For parity with 8.4's "(a fictional product)", label the Alice story in the prose: "(a made-up example)".

**23.** Spec drift. The `sysdesign-replica-lag/spec.md` predict ("Amna refreshes 200 ms after posting...") differs from the chapter's predict. The `sysdesign-truetime-commit-wait/spec.md` transfer names "code exercise 10.8", but 10.8 covers Lamport, vector and hybrid clocks, not commit wait. Fix: copy the chapter predict into the spec, and name 10.10 or the 10.11 gate as the transfer.

**24.** The TrueTime model ends commit wait when the earliest time equals s1 (`ackAt = T1_START + 2 * eps`; the spec says "reaches s1"). `TT.after(s1)` needs earliest > s1, and the chapter code correctly uses `<=` in the loop. It is a zero-width boundary, but the comment `t > T1_START + 2 * eps` and the code disagree. Fix: change the spec wording to "just after 10 + 2 * eps".

**25.** 10.6 ClockBound licence: "(MIT and Apache 2.0 licences)". The README says it is distributed under both, usable "under the terms of any of these licenses, at your option". Fix: "(MIT or Apache 2.0, your choice)". Optional: the dossier's figures (typical clock error bound under 100 microseconds over NTP, under 40 with the PTP clock [S62], dated 2023) would let the learner work out that commit wait on EC2 could be well under 1 ms, as a clearly dated example.

**26.** 10.6 has CRLF line endings and 8.4 has LF. The remark parser handles both, but mixed endings make diffs noisy. Fix: normalise to LF, and add `*.md text eol=lf` to `.gitattributes` if the repo wants that.

**27.** 10.6 puts both quizzes after the "In AWS" section, away from the commit wait explanation they check. Fix: move them above "In AWS", as 8.4 roughly does.

**28.** 8.4 predict: the prompt gives every number needed (read at 350, apply at 600, sent to replica 2), so it is mostly arithmetic. The "since refresh 1 already showed it" distractor does target a real misconception, so it is acceptable. Optional: ask "What does Amna see across her three refreshes?" with two options (always there / there, gone, there).

**29.** `primitives/controls.tsx` `SegmentedControl` and `WhatChanged` use raw `blue-600` and `blue-500` classes, not `TONES.accent` from `primitives/tones.ts`. `10-interactive-canvases.md` says "Theme tokens only". Fix: use the tone tokens.

## Label overlap check (approximate, confirm in the reader)

Besides defect 2, the geometry check flags these replica-lag label overlaps on the narrow (phone) layout: "comment saved" against "refresh 1" in the default state. With first refresh 0 ms, which is the chapter's own extra experiment, it also flags "comment saved" or "shows it" against "refresh 2", and "shows it" against "replicate". The cause: a read message's label sits at the midpoint between the client lane and the target lane, which is the leader lane. Track these under defect 2 if they show up on screen.

## What works (keep this)

- Every number in both chapters matches its model exactly, including the subtle ones (fast replica = lag / 4, flip at gap 8 ms, overlap still "Yes" with commit wait on).
- Both canvases teach one claim each and expose the driving assumption as an input. Their defaults fail in an interesting way (1 missed and 1 back in time; s1 17.6 > s2 12.4), and their "What changed" sentences explain the change in words.
- 8.4's "Same lag, different symptom" paragraph (first refresh 0 ms gives 2 missed and 0 back in time) is a strong near-miss.
- The position-token section turns a timing question into a comparison of positions. The debugging advice ("log the token, the node chosen, and that node's applied position") is concrete and correct.
- 10.6's three-fact proof of commit wait, and the paragraph "An overlap does not mean the order is wrong. It means the clocks cannot prove the order is right", are exemplary. Keep them.
- Spanner facts are accurate and well located: TT.now/after/before (Table 1), GPS and Armageddon masters, the 1 to 7 ms sawtooth, about 4 ms most of the time, the 30 s poll, 200 microseconds per second drift, the 6 ms plus 1 ms breakdown, epsilon spikes, the start and commit wait rules (4.1.2), at least 2 times average epsilon (4.2.1), and about 5 ms measured (5.1). The unfriend example is not attributed to the paper in the chapter or the spec.
- 8.4's session-guarantee definitions match Terry 1994 [S50], and consistent prefix is correctly called "one related promise", not one of Terry's four. `pg_current_wal_lsn()` and `pg_last_wal_replay_lsn()` are correct names and roles.
- Both predicts have exactly two options of near-equal length. There are no em or en dashes and no `BigWordAlert`, and the audit passes.
- Both canvases have unit tests for default, minimum, maximum, NaN and a tie edge case, plus a phone label-fit test for replica lag.

## Scorecard

| # | Dimension | Score | Note |
|---|---|---|---|
| 1 | Outcome alignment | 3 | Consistent prefix outcome dropped without a roadmap change (1, 12) |
| 2 | Domain specificity | 4 | Named actors and real numbers; examples change between chapters, which is fine since no running product is defined |
| 3 | Depth over coverage | 4 | Deep on one mechanism each |
| 4 | Prose quality | 4 | Clear and calm; long sentences (14) |
| 5 | Chapter structure | 4 | Hook, mechanism, canvas, decision, failure modes, bridge |
| 6 | Interaction purpose | 4 | Predict, canvas and quizzes each earn their place |
| 7 | Assessment quality | 3 | Quizzes in 10.6 test the text above; 8.4 misses the "name the promise" outcome (12, 13, 19, 20) |
| 8 | Difficulty calibration | 4 | |
| 9 | Cognitive load | 4 | Router naming adds load (8) |
| 10 | Prerequisite integrity | 4 | Commit wait in predict, linearizability early (16, 21) |
| 11 | Technical accuracy | 4 | Core facts verified; 5 ms causation, Windows timing, reader endpoint (4, 6, 11) |
| 12 | Production-grade coverage | 4 | Failure modes, debugging and AWS mapping present |
| 13 | Security and integrity | 5 | Nothing unsafe; canvases make no network calls and hold no secrets |
| 14 | Accessibility | 4 | Faded copy, label collisions; not tested in the reader (2, 15) |
| 15 | IP protection | 4 | 8.8 copy risk (17) |
| 16 | Variant distinctiveness | n/a | No variants at G3 |
| 17 | Continuity | 4 | Module references all match the roadmap; spec drift (8, 23) |
| 18 | Learner agency and curiosity | 4 | Good open loops, all answered |
| 19 | Instructor alignment | not scorable | G2B pending, no confirmation record |
| 20 | Interactive canvas quality | 3 | Models correct and tested; the key commit-wait visual collides, ranges are clipped, try-this threshold is off (2, 3, 7) |
| 21 | Explanatory depth | 5 | Mechanism, worked trace, trade-offs, failure modes and debugging, all in prose |
| 22 | Visual explanation quality | 4 | Both Mermaid diagrams argue (sync vs async path; timestamp, then wait, then done) |

Average of the 20 scored dimensions: 3.95. Three dimensions at 3 and one S2, so the gate does not pass yet.

## Counts

- S1: 0
- S2: 1
- S3: 16
- S4: 12

## Recommendation

Revise. The chapters are close: the mechanism prose and both models are correct, and the default states teach well. Fix in this order:

1. Defect 1: record where consistent prefix is reproduced and assessed (move it to 11.4 in the roadmap, or add a scenario quiz in 8.4).
2. Defects 2 and 3: make the TrueTime timeline readable in the commit-wait-on state, and stop clipping ranges below 0 ms. Add the overlap and range tests.
3. Defects 4 and 6: separate "at least 2 times average epsilon" from the measured 5 ms, and correct the code's timing claim for Windows. Then fix the sources (defect 5).

Re-review only the changed sections and the interactions they touch, after G2B is signed.
