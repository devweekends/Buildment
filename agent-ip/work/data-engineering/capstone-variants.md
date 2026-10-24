---
artifact: variant-proposal
course: data-engineering
version: 1
status: proposal, G6 not started
owner: orchestrator (for the variant producer)
---

# Capstone scenarios and proposed variants

## What is in the general course now
Module 13 offers five capstone scenarios. Each fellow builds a second pipeline in one of them with the patterns from modules 1 to 12. They are scenarios inside one capstone chapter set, written once, with one rubric. They are not variant courses: no `family`, no `%%product.name%%`, and no variant chapters.

## The differentiation hypothesis (4-of-6 contract, `02-course-architecture.md`)
Mizan (prices) is the general course's running example. Each scenario changes the source, the hardest constraint, the data model, the hero output and the defence, so it would meet the contract if it became a variant course.

| Scenario | Primary journey (who uses the output) | Hardest constraint | Data model delta | Hero output | Capstone evidence | Dimensions changed vs Mizan |
|---|---|---|---|---|---|---|
| Aid distribution | Programme officer checks coverage by distribution point | Duplicate household registrations; household personal data | `household` (pseudonymised), `distribution_point`, `fct_parcel_handout`; household size as type 2 history | Coverage and repeat-handout report | Show a duplicate household merged and no personal data past the restricted zone | 6 of 6 |
| Clinic appointments | Clinic manager tracks no-shows and waiting days | Sensitive health data; appointment status changes over time | `appointment` status history, `clinic`, `fct_appointment_event`; accumulating snapshot | No-show rate and waiting-time report | Show status changes kept correctly and health fields minimised | 6 of 6 |
| Solar and power readings | Shop owners and a technician watch battery health | Late and out-of-order readings in a time series | `device`, `site`, `fct_reading` at minute grain, daily rollup | Daily energy and low-battery hours report | Show late readings merged by event time and a backfill of one day | 6 of 6 |
| School attendance | Head teacher follows attendance by class | Classes, teachers and calendars that change during term | `class` and `enrolment` as type 2, `school_calendar`, `fct_attendance` | Attendance rate by class and week, school days only | Show a student moving class without breaking past rates | 5 of 6 (user journey is close to Mizan's weekly report) |
| Freelance shop orders | A shop owner (freelance client) checks net sales | Updates and deletes in the source (change data capture) | `order`, `order_line`, `refund`, soft deletes | Net sales after refunds report | Show an edited and a deleted order handled without double counting | 6 of 6 |

## What a full variant set would need (not done)
Per `agents/variant-producer.md`:
1. A variant intake (`08-templates.md` 10A) answered by the sponsor or instructors: product names, accents, specialisations. **No names or accents have been invented here.**
2. A variant roadmap per variant, confirmed by the instructor panel at G6, before any variant chapter is written.
3. Domain research for each new domain (health data rules for clinics; humanitarian data rules for aid).
4. Each variant passing G2C to G5 on its own, with canvases that teach the variant's hardest constraint, not relabelled Mizan canvases.

## Recommendation
Keep the five scenarios inside the general capstone for this release. If instructors want variant courses, start with aid distribution and clinic appointments, whose hardest constraints (personal and health data) would deepen module 11 most, and run the variant intake with the sponsor first.
