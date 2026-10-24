# SkillSlot M13 provider dashboard and hours draft QA

Date: 2026-10-24. Scope: ten lessons in `courses/multi-vendor-marketplace/variants/services/13-provider-dashboard-and-hours/`. The post-approval roadmap refinement adds a 15-minute scenario quiz before the 45-minute gate while preserving the 10-hour module total. Instructor review remains open. This is authored-draft QA, not a passing G5/G6 review.

## Reference contract

Provider.timeZone defines the zone for weekly rule editing. An active AvailabilityRule stores local weekday, padded quarter-hour `HH:mm` boundaries, effective local dates and the same named zone. A provider-zone change requires rule review and republishing; confirmed Booking UTC instants and SlotClaims do not move. TimeOff receives provider-local dated input, is resolved through the M5 converter and is stored as a UTC half-open interval. Its protected API response lists overlapping held or confirmed Bookings without cancelling or moving them.

M13 adds Provider.scheduleRevision for serialized rule and TimeOff edits. A stale form returns `SCHEDULE_VERSION_CHANGED`; a same-weekday rule that overlaps in both local time and effective dates returns `RULE_OVERLAP`. M19 checkout must participate in a coordinated write policy for provider edits; this module alone does not close that cross-workflow race. Listing readiness separates setup completeness from explicit publication: active Service plus valid future rule plus permitted Provider status. A TimeOff or full calendar can remove particular dated offers without erasing the listing.

The learner deliverables are Services table/forms, owned rule and TimeOff APIs, weekly grid, emergency rest-of-today action using the injected server clock, listing-readiness function, tests and `docs/provider-schedule-decisions.md`. Code excerpts use the M6 models and M15 adapter field names; an executable reference application is not yet checked in.

## Checks completed

- Agent-IP prose audit reports zero flags across all ten lessons. Eight Read/Learn/Build chapters meet the 1,200-word floor; the gate has 718 prose words. The new Check chapter has five scenario interactions with balanced MCQ options and explanations. Non-quiz chapters include diagrams, and the Learn chapter includes a request trace.
- All ten files pass `parseLesson` and `validateParsedLesson`. No en dash or em dash appears.
- A duplicate-paragraph scan found no identical paragraphs of at least 45 words among 135 long paragraphs.
- Official sources were checked for [MongoDB transactions](https://www.mongodb.com/docs/manual/core/transactions/), [Mongoose atomic find-and-update behavior](https://mongoosejs.com/docs/tutorials/findoneandupdate.html), [Luxon named-zone operations](https://moment.github.io/luxon/api-docs/index.html) and [HTTP response status semantics](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status).

## Open integration and human gates

- Add scheduleRevision to the executable Provider model and run actual concurrent rule-edit tests on a replica set. Wire M19 checkout to recheck or serialize with provider schedule changes at its claim boundary.
- Build and run the Services and dashboard UI, owned API, time-zone, booking-conflict, accessibility and phone-width tests against the reference project. The lesson text and snippets do not substitute for that build.
- Independent technical and pedagogical critics, reader accessibility review and human G5/G6 approval are not recorded. Keep the services variant unavailable until the complete path passes.
