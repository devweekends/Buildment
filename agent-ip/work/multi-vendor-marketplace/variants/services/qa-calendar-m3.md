# SkillSlot M3 draft QA

Date: 2026-10-24. Scope: seven lessons in `courses/multi-vendor-marketplace/variants/services/03-why-mongodb-for-a-calendar/`. This is an authored draft review, not a G5 or G6 approval.

## Checks completed

- The agent-IP course audit found zero flags across all seven lessons. The Read, Learn and Build lessons exceed 1,200 prose words; the Gate exceeds 700. Each non-gate lesson has a diagram, and the Learn lessons have a request trace.
- All seven files passed the course `parseLesson` and `validateParsedLesson` checks. The module uses supported quiz blocks, including option explanations.
- The four multiple-choice questions were reviewed for answer-length clues. Their correct choices are not the longest option in a majority of questions.
- No en dash or em dash occurs in the seven source files.
- Technical claims were checked against primary documentation: [PostgreSQL range types and exclusion constraints](https://www.postgresql.org/docs/current/rangetypes.html), [MongoDB unique indexes](https://www.mongodb.com/docs/manual/core/index-unique/), [MongoDB transactions](https://www.mongodb.com/docs/manual/core/transactions/), [MongoDB embedded data](https://www.mongodb.com/docs/manual/data-modeling/embedding/) and [MongoDB relationships](https://www.mongodb.com/docs/manual/applications/data-models-relationships/).

## Decisions and open issues

- The lessons choose one SlotClaim document per provider and 15-minute UTC block, a unique compound index, and a transaction for the whole claim set plus booking hold. The product must reject off-grid durations and starts or revise the claim algorithm. TTL deletion alone cannot release a block at an exact deadline.
- The provider rule and TimeOff edit race still needs a versioned or coordinated write policy. The lesson explicitly puts this in the learner's open decisions; the later implementation and reference build must choose and test one.
- The exact payment and hold state transition, expiry length, and group-service capacity policy remain later-module decisions. These are not claimed complete in M3.
- The M3 design exercise requires a learner-created `docs/erd-draft.md`. The authored lessons do not constitute an executable SkillSlot reference build. G5 requires implementation checks, independent critics, canvas review and human review; G6 additionally requires full variant review. Keep the services track unavailable until those gates and the complete path pass.
