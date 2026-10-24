---
artifact: variant-lesson-review
variant: services
date: 2026-10-24
status: incomplete
---

# SkillSlot lesson review

## Authored source

`courses/multi-vendor-marketplace/variants/services/05-time-and-time-zones/` contains ten complete lessons: an opening case, instants and wall clocks, IANA zones and rule changes, gaps and overlaps, the "Your time, their time" canvas, a four-question check, a conversion module, an injectable clock, boundary tests, and a checklist gate. The module has 11,012 prose words. The agent-IP chapter audit reports zero findings for these ten files. The registered canvas is used in 05.05.

The Learn and Build chapters teach the distinction among an instant, a local wall time, and an IANA zone. They use a single conversion boundary, reject nonexistent or ambiguous local times instead of guessing, format separately for provider and client, and inject a clock for repeatable tests. The gate asks for actual test evidence rather than a code copy.

## Technical verification and sources

- The 05.07 and 05.08 example functions were extracted into an isolated Luxon 3.7.2 run. Berlin 09:00 in January resolved to `2024-01-15T08:00:00.000Z`; a New York spring gap returned `NONEXISTENT_LOCAL_TIME`; a fall overlap returned `AMBIGUOUS_LOCAL_TIME`; fixed-clock boundary and Qatar display checks passed. This is example verification, not a SkillSlot reference build.
- [MDN's `Temporal.ZonedDateTime` guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/ZonedDateTime) explains local time, time zone, and offset distinctions and disambiguation.
- [Luxon's API reference](https://moment.github.io/luxon/api-docs/index.html) documents parsing, zones, offsets, and formatting used in the examples.
- [MongoDB BSON Date documentation](https://www.mongodb.com/docs/manual/reference/bson-types/#date) describes date values as milliseconds since the Unix epoch.

## Release blockers

- M5 alone is not the SkillSlot path. The roadmap's provider, service, availability engine, slot claims, booking, payment, cancellation and rescheduling modules still need complete domain-specific learner chapters, integration, and QA. Grocery-specific inherited lessons cannot be assumed safe.
- No complete SkillSlot reference build, booking concurrency test, end-to-end learner walkthrough, G5 critics, accessibility review, or instructor sign-off on the final authored lessons is recorded.
- Keep services unavailable for selection and repository publication until the whole variant passes the course release gates.

## Update after the 2026-10-24 authorization pass

`variants/services/09-booking-authorization-and-isolation/` is now linked in the manifest as `services-booking-authorization` and replaces inherited shared module 08 in the SkillSlot module order. Its nine lessons cover participant checks, provider ownership, field projection and cross-party tests. The quiz options were rebalanced so length does not reveal the answer, and the eight non-quiz lessons were expanded past the prose threshold. `audit-course.mjs` reports zero findings for the services variant tree.

This does not complete the track. The inheritance audit still reports 255 inherited shared lessons, 182 of them with FreshMarket details. The provider profile, practice setup, services API, portfolio, booking UI, cart, agenda, cancellation and rescheduling, cache, jobs, deploy and pricing modules remain to be authored or replaced. M20 payment is already authored, but the learner sequence before and after it is not complete.
