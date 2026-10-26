---
artifact: critique-response
course: networking
gate: G3
round: 2
chapter: 02.02-an-address-is-one-32-bit-number
---

# Response to the G3 round 2 critique of chapter 2.2

Critic A round 2 (Gemini 3.8 Flash): average 4.41, every dimension at least 4, all twelve round 1 defects closed or their rejection accepted, two new S2 and two new S3 defects. Critic B had no open defect after round 1 (D1 rejected with evidence, D2 fixed). This was the second and last critic round (`06-quality-gates.md`); the fixes below were made without a third round, and the sponsor reviews the result at G3.

| ID | Verdict | Resolution |
|---|---|---|
| NEW-01 (S2) | Valid | Beat 2's visible text no longer claims a rollover the canvas does not show. It now says to flip the last bit and watch all three views change together, which the canvas does. The rollover stays in beat 1's fold. |
| NEW-02 (S2) | Valid | The first quiz question now assesses the chapter's main procedure: "Walk the place values for the number 200. Which byte do you get?" (`11001000`; distractors 196 and 168 with the slip explained). The carry question is gone, which also removes the dependency on the fold. |
| NEW-03 (S3) | Valid | Beat 4 now says: turn a number into bits with the walk, read a byte by adding the place values of its 1s, or spot an address with a part above 255. |
| NEW-04 (S3) | Valid | The flowchart has one node per place value, eight in all. |

Checks after the fixes: course audit clean (no flags); blind answer keys 3 of 3 on the changed set (Gemini 3.8 Flash); canvas tests 1,292 passed; typecheck clean.
