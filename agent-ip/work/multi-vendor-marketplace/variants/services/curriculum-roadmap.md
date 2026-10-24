---
artifact: curriculum-roadmap
course: multi-vendor-marketplace-services
version: 1
status: approved-user-reported
owner: variant-producer
derived_from: multi-vendor-marketplace (FreshMarket)
instructors_reviewed: [AQIB, ASIF]
approval_reported_on: 2026-10-24
approval_date: not supplied
---

# Curriculum roadmap: SkillSlot (services variant of FreshMarket)

## In one paragraph

The learner builds SkillSlot, a marketplace where freelancers sell their time: a maths tutor, an English conversation tutor, a brand designer, an electrician, a laptop repair technician. Providers set weekly working hours in their own time zone, list fixed-price services with a duration, and block time off when plans change. Clients find a provider, pick a free time shown in their own time zone, put one or more time slots from different providers in one cart, and pay once with Stripe test mode. Checkout splits into one order per provider (as in FreshMarket) and one booking per time slot. The hard part is time itself: two clients must never get the same hour of the same provider, even when they click at the same moment, and "15:00" must mean the same instant to a client in Berlin and a tutor in Gaza. At the end the learner can model bookings, prevent double booking under concurrency, handle time zones and daylight saving, cancel and reschedule with correct refunds, deploy the system, and defend every one of those decisions.

## Learner and entry prerequisites

- Learner: fellows in Gaza building tech careers. English is often a second language. Many study on phones with unreliable power and internet, so chapters stay short, builds are checkpointed, and every gate can be passed offline except deploy and Stripe steps.
- Prior knowledge: same as FreshMarket. JavaScript fundamentals, HTTP request and response, one prior CRUD app, Git and the command line, basic data modelling.
- Time available: 3 to 4 weeks at about 10 hours a day. Core path 206 hours, stretch path up to about 265 hours.
- Entry diagnostic: the FreshMarket diagnostic plus four questions on JavaScript `Date` (what `new Date().toISOString()` prints, what a UTC offset is, why `"2026-03-28 00:30"` alone is ambiguous, and how many minutes are in a day that has a clock change). Learners who miss two or more get the short repair read in chapter 1.5 before Module 5.

## Outcomes

| # | Outcome (observable verb) | Evidence |
|---|---|---|
| O1 | Model a multi-provider services marketplace with ownership chains, price and policy snapshots, and bookings as their own collection | ERD in `docs/erd.md`, seed script, viva answer on why Booking is not embedded |
| O2 | Implement registration, login, refresh tokens and OTP with role-aware JWT | curl flow and passing auth tests (as FreshMarket) |
| O3 | Enforce object-level authorization so a provider cannot read or change another provider's services or bookings, and private client data is shown only to the other party of a confirmed booking | `docs/AUTHORIZATION.md` and IDOR tests that return 403 |
| O4 | Generate bookable slots from weekly rules written in the provider's local time, store instants in UTC, and stay correct across daylight saving changes and between two time zones | clock test suite and engine tests, including a week with a clock change |
| O5 | Prevent double booking under concurrency with atomic slot claims and expiring holds | parallel booking script: 20 attempts on one slot, exactly one success, logged in `docs/EVIDENCE.md` |
| O6 | Take one Stripe test-mode payment for a multi-provider cart, split it into per-provider orders and bookings, confirm by webhook idempotently, and refund one booking partially on cancellation | Stripe test dashboard events, refund records on the order, webhook replay test |
| O7 | Move slow and scheduled work off the request path: confirmation messages, reminders as delayed jobs, hold expiry sweeps, cache invalidation | worker logs, reminder moved after a reschedule, cache bust on booking |
| O8 | Deploy the API, client and worker over HTTPS and defend the design in a demo and viva | live URL, restart survival test, five-minute demo video, viva |

## Four-week shape

| Week | Focus | Modules | Hours | Demo at the end |
|---|---|---|---|---|
| 1 | Foundations and the clock | M1 to M8 | 57 | Both apps run; MongoDB runs as a replica set; seed has providers and clients in three time zones; clock tests pass, including a clock-change week; register and log in |
| 2 | Provider experience and the availability engine | M9 to M15 | 52 | A provider opens a practice, adds services and a photo, sets weekly hours and time off, and the API returns correct free slots for the next 7 days |
| 3 | Client experience: book and pay | M16 to M21 | 50 | A client in Berlin sees a Gaza tutor's slots in Berlin time, books two providers in one cart, pays with a Stripe test card, and both providers see their bookings; a parallel attempt on the same slot gets a 409 |
| 4 | Change, scale, ship and defend | M22 to M28 | 47 | Cancel with a policy-based partial refund, reschedule with reminders moved, cached search, live HTTPS URL, concurrency evidence, coupons, five-minute demo |
| | **Core total** | 28 modules | **206** | |

Hours are planned learner hours, including building and debugging, not reading time. For reference, the FreshMarket chapter frontmatter (`estimatedMinutes`) sums to about 132 hours of step time, and its outline plans 4 weeks at about 60 hours a week. This roadmap keeps under the 210-hour core cap with 4 hours of slack.

## Carry-over map

| FreshMarket module | SkillSlot module | Status | What changes |
|---|---|---|---|
| 01 Introduction | M1 | Adapted | New product, people, scope and "why time is hard" |
| 02 Project skeleton | M2 | Carried over | Nothing beyond names |
| 03 Why MongoDB | M3 | Adapted | Calendar data; honest note on where Postgres wins |
| 04 Config and database | M4 | Carried over, 2 chapters added | Replica set for transactions; server clock in UTC |
| (none) | M5 Time and time zones | New | Whole module |
| 05 Data model and seed | M6 | Adapted heavily | Service, AvailabilityRule, TimeOff, SlotClaim, Booking |
| 06 Authentication API | M7 | Carried over | Nothing beyond names |
| 07 Login and registration | M8 | Carried over, 1 chapter added | Capture the browser time zone at sign-up |
| 08 Authorization and isolation | M9 | Adapted | Booking participants, need-to-know fields |
| 09 Vendor store API | M10 | Adapted | Provider profile with time zone |
| 10 Open your shop | M11 | Adapted | Practice setup with zone picker |
| 11 Manage products API | M12 | Adapted | Services with duration, buffer, cancellation policy |
| 12 Vendor dashboard | M13 | Adapted, new chapters | Weekly hours and time-off editors |
| 13 Product photos | M14 | Carried over | Avatar and portfolio instead of product photo |
| (none) | M15 Availability engine API | New | Whole module (hero) |
| 14 Browse catalogue API | M16 | Adapted | Next free slot without N+1 |
| 15 Shop the marketplace | M17 | Adapted | Slot picker that shows both time zones |
| 16 Cart API + 17 Your cart | M18 | Adapted, merged | Cart line is a requested slot, not a quantity |
| 18 Checkout and orders + core of 24 | M19 | Adapted heavily | Atomic slot claims, holds, split into orders and bookings |
| 19 Payment processing | M20 | Adapted | Confirm holds by webhook; late payment after expiry |
| 20 Track orders | M21 | Adapted | My bookings, provider agenda, calendar file |
| (none) | M22 Cancellation and rescheduling | New | Whole module |
| 21 Cache and search | M23 | Adapted | Availability cache is for display only |
| 22 Async jobs and queues | M24 | Adapted | Delayed reminder jobs, hold expiry sweep |
| 23 Deploy | M25 | Carried over, 1 chapter added | Production clock check |
| 24 Inventory reservations | M26 | Replaced | Holds move into core checkout; this slot becomes concurrency and clock evidence |
| 25 Promotions and pricing | M27 | Adapted, shorter | Provider-funded coupons, refunds use the paid amount |
| 99 Closing | M28 | Adapted | New demo and viva |

## Module and chapter sequence

Every module keeps the FreshMarket chapter archetype: open (set the scene, why it matters, what you will build), learn, check (quiz), build (where the project is now, one step per file, verify), wrap (recap, checklist gate). Rows below name the chapters that carry the teaching. Recap chapters are folded into the checklist row.

### M1: Introduction (adapted from FreshMarket 01)
Purpose: the learner can say what SkillSlot is, who it serves, and why time is the hard part.
Hours: 4
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 1.1 | What you are building | Describe SkillSlot in one sentence: clients book paid time from freelancers | Read | 0.5 |
| 1.2 | How to use this course | Follow chapters in order, keep a learning log, pass each checklist gate | Read | 0.5 |
| 1.3 | The product and its people | Name the provider and client journeys from first visit to finished session | Read | 0.5 |
| 1.4 | Scope | List what is in scope and what is not (no video calls, no payouts, no calendar sync) | Read | 0.5 |
| 1.5 | Prerequisites and date repair read | Pass the entry diagnostic, or finish the short JavaScript `Date` repair read | Check | 0.5 |
| 1.6 | Course outline and demo targets | Name the four weekly demos | Read | 0.5 |
| 1.7 | Why time is the hard part | Describe three ways a booking app fails: double booking, wrong hour, wrong refund | Learn | 0.5 |
| 1.8 | Working rhythm and checklist | Set up the daily rhythm and pass the module gate | Gate | 0.5 |

### M2: Project skeleton (carried over from FreshMarket 02)
Purpose: both apps run and talk to each other.
Hours: 8
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 2.1 to 2.19 | As FreshMarket 02 | Create the repo, server and client skeletons, health route, and show the health response in the client | Build | 8 |

### M3: Why MongoDB for a calendar (adapted from FreshMarket 03)
Purpose: the learner can defend MongoDB for this product and say honestly where a relational database would win.
Hours: 4
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 3.1 | Set the scene: rules, slots and bookings | Separate the three kinds of time data a booking app stores | Read | 0.5 |
| 3.2 | Relational vs document for schedules | Compare both; name the Postgres feature that fits this problem well (range types with an exclusion constraint) | Learn | 1 |
| 3.3 | The decision for SkillSlot | Defend MongoDB plus a lock collection with a unique index | Learn | 0.5 |
| 3.4 | Embedding vs referencing bookings | Explain why a booking is its own document, unlike a FreshMarket order line | Learn | 0.5 |
| 3.5 | Prime your thinking and quiz | Answer the calendar data-model check | Check | 0.5 |
| 3.6 | Map actors to collections | Draft the ERD: Provider, Service, AvailabilityRule, TimeOff, CartItem, Order, Booking, SlotClaim | Build | 0.5 |
| 3.7 | Checklist | Commit `docs/erd-draft.md` | Gate | 0.5 |

### M4: Config and database (carried over from FreshMarket 04, two chapters added)
Purpose: config from env, database connected, and transactions available.
Hours: 7
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 4.1 to 4.17 | As FreshMarket 04 | Validated config, Mongoose connection, health shows DB status, no secrets in Git | Build | 5.5 |
| 4.18 | Run MongoDB as a replica set | Use an Atlas free cluster or a local single-node replica set, and pass a transaction smoke test | Build | 1 |
| 4.19 | Server clock in UTC | Run the server with `TZ=UTC` and show that correctness does not depend on it | Build | 0.5 |

### M5: Time and time zones (new)
Purpose: the learner can store, convert and display time correctly before any booking code exists.
Hours: 8
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 5.1 | Set the scene: "3 pm my time or yours?" | Describe a missed lesson caused by a time zone bug | Read | 0.5 |
| 5.2 | Instants vs wall-clock times | Store an instant as a UTC date plus the IANA zone that gives it meaning | Learn | 1 |
| 5.3 | IANA zones, offsets and daylight saving | Explain why `+02:00` is an offset, not a zone, and why `Asia/Gaza` rules depend on updated time zone data | Learn | 1 |
| 5.4 | Gaps and overlaps | Predict what happens to a local time that does not exist, or happens twice, on a clock-change night | Learn | 0.5 |
| 5.5 | Canvas: Your time, their time | Move a week across a clock change and see where a provider's 09:00 lands for a client in another zone | Learn | 0.5 |
| 5.6 | Quiz | Pass the time zone check | Check | 0.5 |
| 5.7 | The time module | Wrap all zone math in `server/src/shared/time.js` using the chosen library | Build | 1 |
| 5.8 | An injectable clock | Read "now" from a clock module so tests can freeze time | Build | 0.5 |
| 5.9 | Clock test suite | Test UTC round trips, a gap, an overlap, and two zones that change clocks on different dates | Build | 2 |
| 5.10 | Recap and checklist | Suite is green; learning log explains instants vs wall-clock time | Gate | 0.5 |

### M6: Data model and seed (adapted heavily from FreshMarket 05)
Purpose: every collection exists, the seed is realistic across time zones, and the learner can explain the ownership chain.
Hours: 10
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 6.1 | Set the scene: the overlap trap | Explain why "find overlapping bookings, then insert" double books under concurrency | Read | 0.5 |
| 6.2 | Ownership chain | Trace User to Provider to Service to Booking, and Booking to Order | Learn | 0.5 |
| 6.3 | Rules vs instances | Explain why rules hold local wall-clock times and bookings hold UTC instants | Learn | 0.5 |
| 6.4 | Quiz | Pass the data-model check | Check | 0.5 |
| 6.5 | User and profile models | Add an IANA `timeZone` field to the profile | Build | 0.5 |
| 6.6 | Provider model | One provider per user; required time zone; online, at-home or at-workshop | Build | 0.5 |
| 6.7 | Service model | Duration in whole blocks, price in minor units, buffer, location type, cancellation policy | Build | 1 |
| 6.8 | AvailabilityRule and TimeOff models | Weekly rules in local time; time off as UTC ranges | Build | 1 |
| 6.9 | SlotClaim model and unique index | Unique index on provider and block start; prove a duplicate insert fails | Build | 1 |
| 6.10 | Booking model and states | held, confirmed, completed, cancelled, expired, with snapshots and a history list | Build | 1 |
| 6.11 | CartItem and Order models | Cart line is a requested slot; Order is one provider's share of a checkout | Build | 0.5 |
| 6.12 | Seed script | Five providers in `Asia/Gaza`, clients in `Asia/Gaza`, `Europe/Berlin` and `Asia/Qatar`, rules and time off | Build | 1.5 |
| 6.13 | Run seed and inspect | Read UTC dates in Compass and convert two of them to local time by hand | Build | 0.5 |
| 6.14 | Final ERD and checklist | Commit `docs/erd.md` and explain the ownership chain | Gate | 0.5 |

### M7: Authentication API (carried over from FreshMarket 06)
Purpose: register, login, refresh, OTP.
Hours: 8
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 7.1 to 7.20 | As FreshMarket 06 | Hashed passwords, access and refresh tokens, OTP verification, auth middleware, curl flow | Build | 8 |

### M8: Login and registration (carried over from FreshMarket 07, one chapter added)
Purpose: auth screens work and every user has a time zone.
Hours: 8
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 8.1 to 8.18 | As FreshMarket 07 | Register, OTP and login pages, token in memory, silent refresh on 401 | Build | 7.5 |
| 8.19 | Capture the time zone at sign-up | Read the browser zone, let the user confirm or change it, store it on the profile | Build | 0.5 |

### M9: Authorization and isolation (adapted from FreshMarket 08)
Purpose: logged in is not the same as allowed, now with bookings and private details.
Hours: 7
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 9.1 | Set the scene: whose booking is this? | Describe how a booking IDOR leaks a client's home address | Read | 0.5 |
| 9.2 | IDOR on bookings | Name the object-level checks every booking route needs | Learn | 0.5 |
| 9.3 | Authn vs authz, roles and ownership | As FreshMarket 08.04 and 08.05 | Learn | 1 |
| 9.4 | Quiz | Pass the authorization check | Check | 0.5 |
| 9.5 | Authorization matrix | Write `docs/AUTHORIZATION.md`: action by role by check, including booking participants | Build | 1 |
| 9.6 | Role and ownership helpers | `requireRole`, `assertProviderOwner`, `assertBookingParticipant` | Build | 1.5 |
| 9.7 | Need-to-know fields | Show a client's address or a meeting link only to the other party of a confirmed booking | Build | 1 |
| 9.8 | Test IDOR with two providers and two clients | Every cross-party request returns 403 | Build | 0.5 |
| 9.9 | Checklist | Matrix and tests committed | Gate | 0.5 |

### M10: Provider profile API (adapted from FreshMarket 09)
Purpose: a verified provider has exactly one public profile with a valid time zone.
Hours: 6
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 10.1 | Set the scene: one provider, one profile | Explain why two profiles confuse clients and calendars | Read | 0.5 |
| 10.2 | Provider fields | Headline, category, time zone, location type, service area | Learn | 0.5 |
| 10.3 | Quiz | Pass the provider API check | Check | 0.5 |
| 10.4 | Scaffold the providers module | Routes, service and schema files | Build | 0.5 |
| 10.5 | Create provider route | One per user; time zone validated against the IANA list | Build | 1.5 |
| 10.6 | My profile and public profile routes | Return private and public views of the same document | Build | 1 |
| 10.7 | Update provider route | Ownership enforced; changing the zone moves future rule times but never moves existing bookings | Build | 1 |
| 10.8 | Test with curl and checklist | Second profile rejected, cross-provider update returns 403 | Gate | 0.5 |

### M11: Set up your practice (adapted from FreshMarket 10)
Purpose: a new provider is routed through onboarding before anything else.
Hours: 6
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 11.1 | Set the scene: not bookable yet | Explain why a provider with no hours must stay hidden | Read | 0.5 |
| 11.2 | Onboarding as a gate | List what a provider needs before clients can see them | Learn | 0.5 |
| 11.3 | Provider layout | Layout and route group for provider pages | Build | 0.5 |
| 11.4 | Practice setup page | Form with a zone picker that defaults to the browser zone | Build | 2 |
| 11.5 | Practice settings page | Edit profile; warn before a zone change | Build | 1.5 |
| 11.6 | Onboarding redirect and verify | A provider with no profile is sent to setup first | Build | 0.5 |
| 11.7 | Checklist | Onboarding flow works in the browser | Gate | 0.5 |

### M12: Services API (adapted from FreshMarket 11)
Purpose: a provider sells fixed-price, fixed-length services with a clear cancellation policy.
Hours: 7
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 12.1 | Set the scene: a service is time plus price | Compare a service with a FreshMarket product | Read | 0.5 |
| 12.2 | Two views of services | Provider view vs public view | Learn | 0.5 |
| 12.3 | Duration, buffer and the block size | Explain why durations must be whole 15-minute blocks | Learn | 0.5 |
| 12.4 | Quiz | Pass the services API check | Check | 0.5 |
| 12.5 | Scaffold and create route | Create a service with validation | Build | 1 |
| 12.6 | List provider services | Scoped to the logged-in provider | Build | 0.5 |
| 12.7 | Update service | A price change never touches existing bookings | Build | 1 |
| 12.8 | Archive, never delete | A service with future bookings can be archived, not deleted | Build | 1 |
| 12.9 | Cancellation policy fields | Free-cancel hours, late refund percent, reschedule cut-off, all validated | Build | 1 |
| 12.10 | Cross-provider test and checklist | Provider B cannot change Provider A's service | Gate | 0.5 |

### M13: Provider dashboard and weekly hours (adapted from FreshMarket 12, new chapters)
Purpose: the provider runs their practice from the browser, in their own local time.
Hours: 10
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 13.1 | Set the scene: a back office in local time | Explain why the provider never types UTC | Read | 0.5 |
| 13.2 | Error mapping | As FreshMarket 12.04 | Learn | 0.5 |
| 13.3 | Services table and forms | Create, edit and archive services in the UI | Build | 2 |
| 13.4 | Availability rules API | Weekly rules CRUD; reject overlapping rules on the same weekday | Build | 1.5 |
| 13.5 | Time-off API | Add a blocked range; list the bookings it conflicts with, without cancelling them | Build | 1 |
| 13.6 | Weekly hours editor | Weekday grid in the provider's zone | Build | 2 |
| 13.7 | Time-off editor | A one-tap "block the rest of today" for a power or internet cut | Build | 1 |
| 13.8 | Listing readiness | A provider is listed only with at least one active service and one rule | Build | 0.5 |
| 13.9 | Provider schedule quiz | Check ownership, local hours, TimeOff and publication boundaries | Check | 0.25 |
| 13.10 | Verify and checklist | Set hours, add time off, see the provider listed | Gate | 0.75 |

Post-approval refinement (2026-10-24): strict course structure requires a mid-module scenario quiz for this nine-lesson dashboard sequence. The dedicated 13.9 quiz uses 15 minutes from the original 13.9 gate, now 13.10, so the approved 10-hour total and outcomes remain unchanged. Instructor review of this refinement remains an open G5/G6 item.

### M14: Photos and portfolio (carried over from FreshMarket 13)
Purpose: images live in object storage, not in MongoDB.
Hours: 4
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 14.1 to 14.15 | As FreshMarket 13 | Cloudinary upload for a provider avatar and up to six portfolio images; URL only in MongoDB | Build | 4 |

### M15: Availability engine API (new, hero)
Purpose: turn rules, time off and existing claims into correct bookable start times.
Hours: 12
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 15.1 | Set the scene: from rules to slots | Explain why slots are computed, not stored | Read | 0.5 |
| 15.2 | The algorithm | Rules to local windows to UTC instants, stepped by block, minus time off, claims and notice period | Learn | 1 |
| 15.3 | Canvas: Block claims | Place a 60-minute service with a 15-minute buffer on a provider grid and see which blocks it needs and where it collides | Learn | 0.5 |
| 15.4 | Quiz | Pass the engine check | Check | 0.5 |
| 15.5 | Expand rules for a date range | Convert each local window to start and end instants in the provider zone | Build | 1.5 |
| 15.6 | Step in absolute time | Step through each window in UTC so clock-change nights come out right | Build | 1 |
| 15.7 | Subtract time off and claims | One range query on SlotClaim for the whole date range | Build | 1.5 |
| 15.8 | Fit the service | Offer a start only if every block of duration plus buffer is free | Build | 1 |
| 15.9 | Notice period and horizon | No starts inside the minimum notice, none past the booking horizon | Build | 1 |
| 15.10 | Availability route | `GET /providers/:id/availability` returns compact UTC starts for 7 days | Build | 1 |
| 15.11 | Engine tests | Clock-change week, time off, buffers, a fully booked day | Build | 2 |
| 15.12 | Checklist | Engine tests green; sample response committed | Gate | 0.5 |

### M16: Browse providers API (adapted from FreshMarket 14)
Purpose: a public, filterable, paginated catalogue without N+1 queries.
Hours: 7
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 16.1 | Set the scene | Clients need to find the right person fast | Read | 0.5 |
| 16.2 | The N+1 trap for "next free slot" | Explain why running the engine per card is N+1, and store `nextAvailableAt` instead | Learn | 1 |
| 16.3 | Pagination | As FreshMarket 14.05 | Learn | 0.5 |
| 16.4 | Quiz | Pass the catalogue check | Check | 0.5 |
| 16.5 | Public services route | Listed providers only; provider name without N+1 | Build | 1.5 |
| 16.6 | Filters | Category, online or in person, service area, price | Build | 1 |
| 16.7 | `nextAvailableAt` | Update it when rules or claims change (synchronously for now) | Build | 1 |
| 16.8 | Single provider route | Profile, services, portfolio, policy | Build | 0.5 |
| 16.9 | Test and checklist | Query count logged; filters work | Gate | 0.5 |

### M17: Find a provider and pick a time (adapted from FreshMarket 15)
Purpose: a client picks a time and never wonders whose clock it is.
Hours: 8
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 17.1 | Set the scene: a time picker is a promise | Describe the cost of a wrong hour to a client and a provider | Read | 0.5 |
| 17.2 | Your time first, theirs second | Show the client's time first and the provider's time second | Learn | 0.5 |
| 17.3 | Browse page with cards | Cards show service, price, duration and next free time | Build | 1.5 |
| 17.4 | Filter bar | Category and online or in-person filters | Build | 1 |
| 17.5 | Provider page | Services, portfolio and cancellation policy shown before booking | Build | 1 |
| 17.6 | Day and slot picker | 7-day strip, slots formatted in the client zone with `Intl.DateTimeFormat` | Build | 2 |
| 17.7 | Change my time zone | Profile setting re-renders every time on screen | Build | 0.5 |
| 17.8 | Verify as two clients | Same slot shown correctly to a Berlin client and a Gaza client | Build | 0.5 |
| 17.9 | Checklist | Screenshots of both views committed | Gate | 0.5 |

### M18: Cart of time slots (adapted from FreshMarket 16 and 17, merged)
Purpose: a cart that holds requested times from several providers, without blocking anyone's calendar.
Hours: 8
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 18.1 | Set the scene: a cart line is a request, not a hold | Explain why adding to cart must not lock a provider's time | Read | 0.5 |
| 18.2 | Why `providerId` is on the cart line | Group by provider at checkout, as FreshMarket groups by store | Learn | 0.5 |
| 18.3 | Quiz | Pass the cart check | Check | 0.5 |
| 18.4 | Cart routes | Add, list and remove lines of service, provider and start time | Build | 1.5 |
| 18.5 | Soft check on add | Return 409 if the slot is not offered right now; write no claim | Build | 1 |
| 18.6 | Overlap warning | Warn when two lines overlap in the client's own day | Build | 0.5 |
| 18.7 | Stale lines | Mark lines whose slot is gone or already in the past | Build | 1 |
| 18.8 | Cart page grouped by provider | Both times on every line, subtotal per provider | Build | 1.5 |
| 18.9 | User scoping test and checklist | Client A cannot see Client B's cart | Gate | 1 |

### M19: Holds and checkout (adapted heavily from FreshMarket 18, with the core of 24)
Purpose: one checkout claims every slot or none, and splits into orders and bookings.
Hours: 11
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 19.1 | Set the scene: two phones, one 15:00 slot | Describe a double booking from both clients' side | Read | 0.5 |
| 19.2 | Check-then-insert is a race | Show on a timeline why reading before writing is not enough | Learn | 1 |
| 19.3 | Claims as locks | Let the unique index decide; a duplicate key error means the slot is taken | Learn | 1 |
| 19.4 | Holds that expire | Held bookings with an expiry time; why a TTL index must not delete them | Learn | 0.5 |
| 19.5 | Quiz | Pass the concurrency check | Check | 0.5 |
| 19.6 | Checkout: all lines or none | Claim every block of every line in one transaction; any duplicate aborts with a 409 naming the lost slot | Build | 2 |
| 19.7 | Split by provider | One Order per provider, one Booking per line, with price, duration, policy and zone snapshots | Build | 1.5 |
| 19.8 | Idempotent checkout | A client-made checkout id makes a retry on a bad connection safe | Build | 1 |
| 19.9 | Hold limits | Cap active holds per client and rate-limit checkout so no one can squat a calendar | Build | 1 |
| 19.10 | Availability hides held blocks | Held time disappears for other clients at once | Build | 0.5 |
| 19.11 | Parallel checkout test | 20 parallel requests for one slot: exactly one 201 | Build | 1 |
| 19.12 | Checklist | Test output committed | Gate | 0.5 |

### M20: Payment processing (adapted from FreshMarket 19)
Purpose: payment confirms holds, and every path out of a hold ends in a correct state.
Hours: 9
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 20.1 | Set the scene: pay before the hold runs out | Explain the race between the hold clock and the card form | Read | 0.5 |
| 20.2 | One payment, many providers, many bookings | Map one PaymentIntent to orders and bookings | Learn | 0.5 |
| 20.3 | Stripe test mode | Test keys, test cards, Stripe CLI for local webhooks | Learn | 0.5 |
| 20.4 | Quiz | Pass the payment check | Check | 0.5 |
| 20.5 | PaymentIntent from held bookings | Amount from snapshots only; checkout id in metadata | Build | 1 |
| 20.6 | Webhook confirms holds | On success, held bookings become confirmed and orders paid; signature checked on the raw body; safe to receive twice | Build | 1.5 |
| 20.7 | Expiry and release | Release claims, mark bookings expired, cancel the PaymentIntent if it has not succeeded; a checkout that hits an expired hold's claim releases it and retries | Build | 1 |
| 20.8 | Late success after expiry | Re-claim if the time is still free; otherwise refund that booking's amount and tell the client | Build | 1.5 |
| 20.9 | Failed card attempts | Keep the hold after a declined card so the client can retry until expiry | Build | 0.5 |
| 20.10 | Verify with test cards | Success, decline, and an authentication-required test card | Build | 1 |
| 20.11 | Checklist | Stripe test events and booking states match | Gate | 0.5 |

### M21: My bookings and provider schedule (adapted from FreshMarket 20)
Purpose: both sides see what happens next, in their own time.
Hours: 7
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 21.1 | Set the scene | Bookings need a face on both sides | Read | 0.5 |
| 21.2 | Snapshots make the agenda easy | No service lookups to draw a booking | Learn | 0.5 |
| 21.3 | Checkout page with hold countdown | Payment Element plus a visible hold timer | Build | 1.5 |
| 21.4 | Confirmation page | One card per booking, grouped by provider | Build | 0.5 |
| 21.5 | Client "My bookings" | Upcoming and past in the client zone; link or address shown by the need-to-know rule | Build | 1 |
| 21.6 | Provider agenda | Day and week views in the provider zone | Build | 1.5 |
| 21.7 | Add to calendar | Download an iCalendar (.ics) file with UTC times | Build | 0.5 |
| 21.8 | Mark completed | Provider marks a booking completed after its end time | Build | 0.5 |
| 21.9 | Week 3 demo and checklist | Berlin client books two providers and pays; both agendas update | Gate | 0.5 |

### M22: Cancellation and rescheduling (new)
Purpose: plans change, and money and calendars must change with them correctly.
Hours: 11
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 22.1 | Set the scene: plans change | Describe a refund dispute caused by a policy change | Read | 0.5 |
| 22.2 | Policy snapshot | The policy at booking time decides the refund, not today's policy | Learn | 0.5 |
| 22.3 | Refund math in minor units | Integer math for the free window, the late window and after start | Learn | 1 |
| 22.4 | Partial refunds on a shared payment | Refund one booking from a multi-provider payment without touching the others | Learn | 0.5 |
| 22.5 | Quiz | Pass the cancellation check | Check | 0.5 |
| 22.6 | Client cancels | Guarded state change, claims released, refund created with an idempotency key, button in the UI | Build | 1.5 |
| 22.7 | Provider cancels | Always a full refund; client notified | Build | 1 |
| 22.8 | Refund events and the order ledger | Record each refund on the order from Stripe events | Build | 1 |
| 22.9 | Reschedule as one swap | Claim the new blocks and release the old ones in one transaction; if the new time is taken, nothing changes | Build | 2 |
| 22.10 | Reschedule rules | Cut-off and maximum count come from the policy snapshot | Build | 0.5 |
| 22.11 | Time off that hits bookings | Provider resolves each conflict by cancelling with a full refund | Build | 1 |
| 22.12 | Verify and checklist | Cancel and reschedule sent at the same moment: exactly one wins | Gate | 1 |

### M23: Cache and search (adapted from FreshMarket 21)
Purpose: fast reads without ever trusting the cache to decide a booking.
Hours: 5
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 23.1 | Set the scene: stale availability | Describe a client who picks a slot that was taken a second ago | Read | 0.5 |
| 23.2 | Cache is for showing, the claim is for booking | Explain why a stale cache costs a 409, never a double booking | Learn | 0.5 |
| 23.3 | Quiz | Pass the cache check | Check | 0.5 |
| 23.4 | Redis and cached listings | Cache the public services list | Build | 1 |
| 23.5 | Cache availability per provider and week | Short TTL, busted on claim, rule and time-off changes | Build | 1 |
| 23.6 | Text search | Text index on services and providers; `explain()` shows an index scan | Build | 0.5 |
| 23.7 | Redis down and measure | Fall back to MongoDB; log before and after timings | Build | 0.5 |
| 23.8 | Checklist | Cache bust and fallback verified | Gate | 0.5 |

### M24: Async jobs, reminders and hold expiry (adapted from FreshMarket 22)
Purpose: scheduled work runs at the right instant and survives changes.
Hours: 8
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 24.1 | Set the scene | A reminder for a lesson that moved is worse than no reminder | Read | 0.5 |
| 24.2 | When to queue | Sync vs async table for bookings | Learn | 0.5 |
| 24.3 | Delayed jobs | Delay computed from the UTC start; job ids that include the booking version | Learn | 0.5 |
| 24.4 | Quiz | Pass the queue check | Check | 0.5 |
| 24.5 | Queue module and worker | As FreshMarket 22.09 and 22.10 | Build | 1 |
| 24.6 | Booking confirmed job | Notify both sides, each in their own zone | Build | 1 |
| 24.7 | Reminder jobs | 24 hours and 1 hour before start | Build | 1 |
| 24.8 | Move or remove reminders | Replace jobs on reschedule and cancel; the processor re-checks the booking before sending | Build | 1 |
| 24.9 | Hold expiry sweep | A repeatable job every minute that reuses the M20 release service | Build | 1 |
| 24.10 | `nextAvailableAt` refresh job | Move the M16 update off the request path | Build | 0.5 |
| 24.11 | Retries, idempotency and checklist | Attempts, backoff and dedup documented | Gate | 0.5 |

### M25: Deploy (carried over from FreshMarket 23, one chapter added)
Purpose: live, secure, and restart-safe.
Hours: 7
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 25.1 to 25.16 | As FreshMarket 23 | HTTPS API, client and worker; secrets in env; smoke test; restart survival | Build | 6.5 |
| 25.17 | Production clock check | `TZ=UTC` set, and the Node time zone data version (`process.versions.tz`) logged on boot | Build | 0.5 |

### M26: Prove it: concurrency and clock evidence (replaces FreshMarket 24)
Purpose: evidence, not hope, that the calendar holds under pressure on the live system.
Hours: 5
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 26.1 | Set the scene: evidence, not hope | Explain what a mentor needs to see before trusting the booking flow | Read | 0.5 |
| 26.2 | Test plan | List the races: same slot, overlapping slots of different lengths, cancel vs reschedule, late webhook | Learn | 0.5 |
| 26.3 | Parallel booking script on the live URL | 20 clients on one slot, and overlapping durations; exactly one wins each | Build | 1.5 |
| 26.4 | Webhook replay | Resend the same Stripe test event; no double confirm and no double refund | Build | 1 |
| 26.5 | Clock-change report | Engine output for a seeded provider across the next clock change | Build | 0.5 |
| 26.6 | Evidence page and checklist | Commit `docs/EVIDENCE.md` with logs and screenshots | Gate | 1 |

### M27: Pricing and coupons (adapted from FreshMarket 25, shorter)
Purpose: server-owned totals, including discounts, and refunds that respect them.
Hours: 5
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 27.1 | Set the scene: never trust client totals | As FreshMarket 25.01 and 25.02 | Read | 0.5 |
| 27.2 | Coupon rules for services | Provider-funded coupons, including "first session with this provider" | Learn | 0.5 |
| 27.3 | Quiz | Pass the pricing check | Check | 0.5 |
| 27.4 | Coupon and redemption models | Redemption recorded once per checkout | Build | 1 |
| 27.5 | Apply a coupon and recompute | Server recomputes totals per provider | Build | 1 |
| 27.6 | Discount snapshot per booking | Refunds use the amount actually paid for that booking | Build | 1 |
| 27.7 | Abuse limits and checklist | Throttle coupon attempts; PaymentIntent amount matches the server | Gate | 0.5 |

### M28: Closing and capstone defense (adapted from FreshMarket 99)
Purpose: ship, document, demo and defend.
Hours: 6
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 28.1 | Ship it | Final ship checklist and live URL | Gate | 1 |
| 28.2 | Document it | ERD, architecture (API, worker, Redis, Stripe), DEMO, CHALLENGES, EVIDENCE | Build | 2 |
| 28.3 | Record the five-minute demo | Follow the demo script below | Build | 1.5 |
| 28.4 | Bar raiser and viva | Answer the defense questions without notes | Gate | 1.5 |

### Stretch path (optional, about 59 hours)
| # | Lab | One-line outcome | Hours |
|---|---|---|---|
| S1 | Weekly recurring bookings | Book a series, skip one week, cancel the rest | 12 |
| S2 | Session packages | Sell four sessions at once with a credit ledger | 8 |
| S3 | Manual capture | Authorise at checkout and capture only after the booking is confirmed | 5 |
| S4 | Provider proposes a new time | Client accepts or declines; the hold logic is reused | 6 |
| S5 | Reviews after completed bookings | Only a client with a completed booking can review | 5 |
| S6 | No-show and late-cancel report | Provider sees patterns per client | 4 |
| S7 | Calendar subscription feed | A secret-token .ics URL that calendar apps refresh | 5 |
| S8 | Postgres comparison lab | Rebuild the claim with a range column and an exclusion constraint, and compare | 6 |
| S9 | Group sessions | A workshop slot with a capacity of 8 | 8 |

## Gate evidence at a glance

| Module | Gate evidence |
|---|---|
| M1 | Learning log: what SkillSlot is and three ways booking apps fail |
| M2 | Client shows the health response |
| M3 | `docs/erd-draft.md` |
| M4 | Health shows DB status; transaction smoke test passes |
| M5 | Clock test suite green, including gap, overlap and two-zone cases |
| M6 | Seed runs; duplicate SlotClaim insert fails; `docs/erd.md` |
| M7 | Full auth curl flow |
| M8 | Login works in the browser; profile has a time zone |
| M9 | `docs/AUTHORIZATION.md`; IDOR tests return 403 |
| M10 | Second profile rejected; cross-provider update returns 403 |
| M11 | New provider is routed through setup |
| M12 | Archive with future bookings works; cross-provider 403 |
| M13 | Provider listed only after hours and a service exist |
| M14 | Images in Cloudinary only |
| M15 | Engine tests green across a clock-change week |
| M16 | Query count logged; no N+1 |
| M17 | Same slot shown correctly in two zones |
| M18 | Cart grouped by provider; stale lines marked |
| M19 | 20 parallel checkouts on one slot: one 201, nineteen 409 |
| M20 | Stripe test events match booking states, including late success |
| M21 | Week 3 demo recorded |
| M22 | Partial refund visible in Stripe test mode; cancel vs reschedule race has one winner |
| M23 | Cache bust and Redis-down fallback verified |
| M24 | Reminder job moved after a reschedule |
| M25 | Live HTTPS; restart survival; tz data version logged |
| M26 | `docs/EVIDENCE.md` on the live system |
| M27 | PaymentIntent amount equals server total with a coupon |
| M28 | Demo video and viva |

## Capstone

- What the learner ships: SkillSlot live over HTTPS with API, client and worker; seeded providers in `Asia/Gaza` and clients in three zones; docs (ERD, authorization matrix, architecture, evidence, demo script).
- Five-minute demo:
  1. Provider view: weekly hours in Gaza time, a blocked afternoon for a power cut.
  2. Client in Berlin: the same tutor's slots in Berlin time, with Gaza time beside them.
  3. Book a tutor and a designer in one cart, pay once with a Stripe test card, show one order per provider and one booking per slot.
  4. Run the parallel script: 20 attempts on one slot, one success.
  5. Reschedule one booking: the old slot comes back, the reminder job moves.
  6. Cancel the other inside the late window: a partial refund appears in Stripe test mode and on the order.
- Defense questions:
  - Why store a UTC instant plus an IANA zone, and not a local time with an offset?
  - Why one claim per 15-minute block instead of an overlap query before insert?
  - What happens when a payment succeeds after the hold expired and someone else took the time?
  - Why is a booking its own collection when FreshMarket embeds order lines?
  - How do you refund one booking from a payment that covered two providers?
  - If Redis is down or stale, can a double booking happen? Why not?
  - A provider moves from Gaza to Doha and changes their zone. What happens to next week's rules and to existing bookings?
  - How do you stop one client from holding every free hour of a popular tutor?
- Production requirements: unique index on claims; transactions on a replica set; webhook signature checked; webhook and refund handling idempotent; server clock in UTC with correctness that does not depend on it; hold limits and rate limits; need-to-know fields enforced on the server; reminder processors re-check state before sending.

## Variants

| Variant | Primary user | Hardest constraint | Hero feature | Data-model delta | Capstone |
|---|---|---|---|---|---|
| FreshMarket (general) | Local grocery shops and shoppers | Stock counts and price snapshots across a split checkout | Multi-vendor cart split into per-vendor orders | Product with stock, StockReservation, embedded order lines | Split checkout and reservations demo |
| **services (this roadmap)** | Freelancers (tutors, designers, electricians) and their clients | Exclusive time on one provider's calendar, across time zones, with holds, cancellations and reschedules | Availability and booking | Service, AvailabilityRule, TimeOff, SlotClaim, Booking as its own collection | Two-zone booking, parallel race, reschedule and partial refund |
| handmade | Artisans (tatreez, olive wood, ceramics) and buyers | One-off items and made-to-order requests | Custom order flow | Per its own producer | Per its own producer |
| home-kitchens | Home cooks and diners | Prep times, order cutoffs, delivery windows | Live order tracking | Per its own producer | Per its own producer |
| digital-goods | Creators of templates, fonts, ebooks | No shipping, instant delivery after payment | Licensing and signed download links | Per its own producer | Per its own producer |
| books | Students and small bookshops | Condition grades and used-item pricing | Search and recommendations | Per its own producer | Per its own producer |

## Out of scope

- Payouts to providers (Stripe Connect). FreshMarket also charges to one platform account; payouts add onboarding and compliance work that does not teach the spine.
- Video calls. The provider adds a meeting link; SkillSlot only decides who may see it.
- Two-way sync with Google or Outlook calendars. It needs OAuth and conflict handling that would double the scope. One-way .ics download is in core; a subscription feed is stretch.
- Quotes and custom requests. Every service has a fixed price and duration. This keeps the variant clear of the handmade custom order flow.
- Delivery windows and capacity per window. This keeps the variant clear of home-kitchens.
- Map or radius search. In-person services use a list of service areas.
- SMS and push notifications. Messages are mocked in the worker, as in FreshMarket.
- Taxes, invoices, disputes and multi-currency.

## Open decisions for instructors

| # | Decision | Recommendation | Instructor decision |
|---|---|---|---|
| 1 | When is a slot held: at add-to-cart or at checkout start? | At checkout start, for 10 minutes. Holding at add-to-cart lets idle carts block calendars for hours. | |
| 2 | Block size for claims | 15 minutes. Services and buffers must be whole blocks. 30 minutes is simpler but too coarse for a 45-minute lesson. | |
| 3 | Make a replica set mandatory so transactions are always available | Yes. Atlas free clusters are replica sets; locally, a single-node replica set. FreshMarket made transactions optional; here all-or-nothing checkout and reschedule depend on them. | |
| 4 | Time library | Luxon, which uses the runtime's `Intl` time zone data. Alternatives: date-fns-tz, or the Temporal API if the course's Node version supports it. | |
| 5 | Payment capture | Automatic capture in core, with refund when a late payment loses its slot. Manual capture as stretch S3. | |
| 6 | Course currency | One currency for the whole course, as FreshMarket. Confirm the chosen currency works in Stripe test mode on the course account before writing. | |
| 7 | Keep coupons (M27) in core | Yes, at 5 hours, to keep FreshMarket's pricing trust outcome. Move to stretch only if M22 needs more time. | |
| 8 | Keep one in-person service type (electrician home visit) in core | Yes. It is the reason for need-to-know address rules and buffers. No travel-time calculation. | |
| 9 | Can a provider move a booking without asking? | No. In core a provider can only cancel with a full refund. Proposing a new time is stretch S4. | |
| 10 | Product name | Keep SkillSlot as the reference name; learners may name their own product, as in FreshMarket. | |

## Confirmation

| Instructor | Role | Decision (approve/revise/reject) | Comments | Date |
|---|---|---|---|---|
| AQIB | Instructor | Approve (reported by course owner) | No changes supplied | Date not supplied |
| ASIF | Instructor | Approve (reported by course owner) | No changes supplied | Date not supplied |
