---
artifact: curriculum-roadmap
course: multi-vendor-marketplace-home-kitchens
version: 1
status: approved-user-reported
owner: variant-producer
derived_from: multi-vendor-marketplace (FreshMarket)
instructors_reviewed: [AQIB, ASIF]
approval_reported_on: 2026-10-24
approval_date: not supplied
---

# Curriculum roadmap: Sufra, a marketplace for home kitchens

## In one paragraph

The learner builds Sufra (working name; learners may rename it), a marketplace where home cooks sell cooked meals to diners in their neighbourhood. A cook opens a kitchen, sets which delivery windows they cook for and how much they can cook in each one, and lists dishes with a prep time and a "load" (how much of the kitchen's capacity one portion uses). A diner picks a delivery window first ("today, 13:00 to 14:00"), sees only the kitchens that can still cook for that window, orders from one or more kitchens in a single checkout, pays with Stripe in test mode, and then watches the order move from "placed" to "delivered" on a phone, even on a weak or dropping connection. The hard part is not stock. A kitchen has no shelf of products: it has a fixed amount of cooking time per window, every dish has its own order cutoff that depends on its prep time, and the clock keeps moving. At the end the learner can model time-bound capacity, prevent overbooking a window under concurrent checkouts, run an order state machine with a cook acceptance deadline, push live status updates with server-sent events that survive reconnects, deploy the system, and defend each decision.

## Learner and entry prerequisites

- Learner: fellows in Gaza building tech careers. English is often a second language. Many work on phones, with unreliable power and internet. The course uses plain English, short sentences and small downloads.
- Prior knowledge: JavaScript fundamentals, HTTP request and response, one prior CRUD app, Git and the command line, basic document data modelling. Same baseline as FreshMarket.
- Time available: 3 to 4 weeks at about 10 hours a day. Core path 210 hours, stretch to 280 hours.
- Entry diagnostic: the FreshMarket diagnostic, plus three questions on dates: convert a UTC time to a local time, compare two times correctly in JavaScript, and explain why `new Date()` on the client cannot decide whether an order is late. Learners who miss these get a short repair read on `Date`, UTC and time zones before Module 14.

## Outcomes

| # | Outcome (observable verb) | Evidence |
|---|---|---|
| O1 | Model kitchens, dishes, delivery windows and capacity claims with clear ownership | ERD in `docs/erd.md`, seed script that creates 7 days of windows, viva answer on why a dish has no stock field |
| O2 | Implement authentication and role plus ownership authorization for diners and cooks | Tests: a cook cannot read another kitchen's orders; a diner cannot open another diner's tracking stream |
| O3 | Compute delivery windows and per-dish cutoffs in the kitchen's time zone using the server clock | Fake-clock tests at the exact cutoff boundary, including a daylight saving change day |
| O4 | Prevent overbooking a window when many diners check out at once | Parallel checkout script: 20 requests against 10 capacity units, log shows exactly the units that fit and clean `409 WINDOW_FULL` for the rest |
| O5 | Take payment for a multi-kitchen checkout and refund the part a cook rejects | Stripe test mode: one PaymentIntent, split orders, a partial refund for a rejected kitchen, webhook signature verified |
| O6 | Run an order lifecycle as a state machine with an acceptance deadline | Illegal transition returns 409; an order the cook ignores is rejected and refunded by a delayed job |
| O7 | Deliver live order status that survives weak connections | Recorded offline test: network off for 60 seconds while the cook advances two steps, then the timeline replays in order with no duplicates |
| O8 | Deploy and operate the API, worker, Redis and the event stream on HTTPS | Live URL; stream works through the host's proxy; API and worker come back after restart and clients reconnect on their own |
| O9 | Defend the architecture | Five-minute demo plus viva, including the SSE versus WebSockets versus polling decision |

## Four-week shape

| Week | Focus | Modules | Hours | Demo at the end |
|---|---|---|---|---|
| 1 | Foundations | 1 to 8 | 51 | Both apps run; seed shows kitchens, dishes and 7 days of windows in Compass; diner and cook can log in; isolation tests pass |
| 2 | Cook experience and the clock | 9 to 14 | 41 | Cook opens a kitchen, sets a weekly schedule, adds dishes with photos, and sees next week's windows with correct cutoffs |
| 3 | Diner experience and money | 15 to 21 | 53 | Diner picks a lunch window, orders from two kitchens, pays with a test card; holds expire on their own; notify jobs run in the worker |
| 4 | Live tracking, hardening, ship | 22 to 26, 99 | 53 | Deployed app: cook accepts, cooks, sends out; diner's phone updates live and recovers after going offline; capacity load test evidence |
| | Buffer | | 12 | |
| | **Core total** | | **210** | |

## Module and chapter sequence

Legend for the Source column: **Carry** = carries over from FreshMarket almost unchanged (only names, roles and examples change). **Adapted** = same module archetype and position, new domain model or new build steps. **New** = no FreshMarket equivalent. Chapter hours are core path hours. Chapters marked "canvas" use an interactive canvas.

### Module 1: Introduction
Source: Adapted (FreshMarket 01). Purpose: the product, the two people (cook and diner), the clock as the main character, scope and working rhythm. Hours: 4

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 1.1 | What you are building: Sufra | Explain in two sentences who Sufra serves and why time, not stock, is the hard part | Read | 0.5 |
| 1.2 | How to use this course | Use the step labels, the checklist gate and the learning log | Read | 0.5 |
| 1.3 | The product and its people | Describe one day for a cook and one lunch order for a diner | Read | 0.5 |
| 1.4 | Scope: what is in and what is out | List what Sufra will not build (GPS rider maps, rider app, cook payouts) and why | Read | 0.5 |
| 1.5 | Prerequisites and the date diagnostic | Pass the diagnostic or finish the time zone repair read | Check | 1 |
| 1.6 | Course outline | Name the four weekly demos | Read | 0.5 |
| 1.7 | Working rhythm and checklist | Set up commit habits and offline docs, then show the dated lunch calculation and first evidence plan | Gate | 0.5 |

Implementation note (2026-10-24): chapter 1.7 now closes the introduction with a working-rhythm gate and learning-log questions. Its half-hour allocation and core outcome remain unchanged. AQIB and ASIF have not yet reconfirmed this post-approval assessment refinement.

### Module 2: Project skeleton
Source: Carry (FreshMarket 02). Purpose: `server/` and `client/` run and talk; module-based folders. Hours: 6

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 2.1 to 2.19 | As FreshMarket 02.01 to 02.19 | Both apps run; client shows `GET /health` | Build | 6 |

### Module 3: Why MongoDB
Source: Adapted (FreshMarket 03). Purpose: justify documents for menus and order timelines, and name where SQL would win. Hours: 4

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 3.1 | Documents for menus and timelines | Explain why an order's status timeline fits inside the order document | Learn | 1 |
| 3.2 | Where SQL would win | Describe capacity counting across many windows as a case where SQL transactions and constraints help | Learn | 1 |
| 3.3 | Applied: sketch Kitchen, Dish and DeliveryWindow | Commit a first `docs/erd-draft.md` with the three documents | Build | 2 |

### Module 4: Config and database
Source: Carry (FreshMarket 04) with one addition. Purpose: config from env, MongoDB connects, secrets stay out of Git. Hours: 5

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 4.1 to 4.17 | As FreshMarket 04 | Config from env; DB connects; `.env` not in Git | Build | 4 |
| 4.18 | An injectable clock | Add `shared/clock.js` so every "now" in the server can be faked in tests | Build | 1 |

### Module 5: Data model and seed
Source: Adapted (FreshMarket 05). Purpose: turn the domain into schemas. This is where the data model departs from FreshMarket. Hours: 9

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 5.1 | Set the scene: time is the inventory | Explain why a kitchen sells cooking time, not items on a shelf | Read | 0.5 |
| 5.2 | The stock trap | Show what goes wrong if a dish gets a `stockQty` field like a grocery product | Read | 0.5 |
| 5.3 | The ownership chain | Draw User → Kitchen → Dish and Kitchen → DeliveryWindow → CapacityClaim → Order | Learn | 1 |
| 5.4 | Kitchen and Dish models | Build `Kitchen` (time zone, service area, weekly schedule) and `Dish` (prepMinutes, loadUnits, maxPerOrder, allergens) | Build | 1.5 |
| 5.5 | DeliveryWindow and CapacityClaim models | Build windows with `capacityUnits`, `remainingUnits`, `cutoffAt` and a unique index on kitchen plus start time | Build | 1.5 |
| 5.6 | Cart and Order models | Build a cart that holds one window and an order that embeds item snapshots and a status timeline | Build | 1.5 |
| 5.7 | Seed: three kitchens, seven days | Seed kitchens, dishes, 7 days of windows and two diners; inspect every document | Build | 1.5 |
| 5.8 | Data model decisions | Choose the owner of capacity, dated-window uniqueness and purchase snapshots | Check | 0.25 |
| 5.9 | Final ERD and gate | Commit `docs/erd.md`, verify seed rerun and explain the chain without notes | Gate | 0.75 |

Implementation note (2026-10-24): a dedicated data-model check now precedes the gate. Module hours remain 9. This post-approval assessment refinement awaits AQIB and ASIF reconfirmation. The core model embeds bounded CapacityClaim records in each dated DeliveryWindow so its counter and claim identity can change in one document; the ERD still names the claim as its own domain entity.

### Module 6: Authentication API
Source: Carry (FreshMarket 06). Roles renamed to `diner` and `cook`. Hours: 9

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 6.1 to 6.20 | As FreshMarket 06 | Register and log in; hashed passwords; JWT with refresh; OTP verification | Build | 9 |

### Module 7: Login and registration
Source: Carry (FreshMarket 07). Hours: 8

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 7.1 to 7.18 | As FreshMarket 07 | Login and register screens; token handled safely; refresh on 401 | Build | 8 |

### Module 8: Authorization and isolation
Source: Carry (FreshMarket 08) with new examples. Hours: 6

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 8.1 to 8.15 | As FreshMarket 08 | Role and ownership checks; a cook cannot touch another kitchen's dishes, windows or orders | Build | 5.5 |
| 8.16 | Stream isolation test (written now, passes in Module 23) | Write the failing test: diner B cannot receive diner A's order events | Build | 0.5 |

### Module 9: Kitchen API
Source: Adapted (FreshMarket 09). Purpose: the kitchen profile and the weekly schedule that later produces windows. Hours: 7

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 9.1 | Set the scene: a kitchen is a schedule | Explain why the kitchen's schedule matters more than its address | Read | 0.5 |
| 9.2 | Kitchen profile and service area | Create and edit a kitchen with a list of neighbourhoods it delivers to | Build | 1.5 |
| 9.3 | The weekly schedule template | Store which platform windows the cook works and the capacity units for each | Build | 2 |
| 9.4 | Time zone on the kitchen | Store and validate an IANA time zone name such as `Asia/Gaza` | Build | 1 |
| 9.5 | Pause the kitchen | Let a cook close for today without deleting the schedule | Build | 1 |
| 9.6 | Ownership tests and gate | Prove a cook cannot edit another kitchen's schedule | Gate | 1 |

### Module 10: Open your kitchen
Source: Adapted (FreshMarket 10). Purpose: cook onboarding UI on a phone screen. Hours: 6

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 10.1 | Set the scene and the onboarding flow | Route a cook without a kitchen to onboarding | Read | 0.5 |
| 10.2 | Kitchen form | Build the profile and service area form | Build | 1.5 |
| 10.3 | Schedule editor at phone width | Build a weekday by window grid with capacity per cell that works at 360px wide | Build | 2.5 |
| 10.4 | Home kitchen hygiene declaration | Add a short self-declaration step (no legal advice, a checkbox and a stored timestamp) | Build | 0.5 |
| 10.5 | Gate | Demo onboarding end to end on a phone | Gate | 1 |

### Module 11: Manage dishes API
Source: Adapted (FreshMarket 11). Purpose: dishes as promises of time. Hours: 7

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 11.1 | Set the scene: a dish is a promise of time | Explain prepMinutes and loadUnits with a real dish (maqluba versus falafel) | Read | 0.5 |
| 11.2 | Dish fields and validation | Validate prepMinutes, loadUnits, maxPerOrder, allergens and weekdays | Build | 1.5 |
| 11.3 | Dish CRUD with ownership | Cook creates, edits, publishes and hides only their own dishes; wrong owner gets 403 | Build | 2 |
| 11.4 | A dish that can never fit | Reject a dish whose loadUnits exceed the kitchen's largest window | Build | 1 |
| 11.5 | Price changes before snapshots | Change a price and note why old orders must not change (sets up Module 19) | Build | 1 |
| 11.6 | Gate | Wrong-owner tests pass | Gate | 1 |

### Module 12: Kitchen dashboard
Source: Adapted (FreshMarket 12). Hours: 5

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 12.1 | Dish table and editor | Cook manages dishes with prep time and load shown clearly | Build | 3 |
| 12.2 | Today at a glance | Show today's windows with capacity used so far (empty until Module 19) | Build | 1 |
| 12.3 | Gate | Demo create, edit, hide | Gate | 1 |

### Module 13: Dish photos
Source: Carry (FreshMarket 13) with one addition. Hours: 5

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 13.1 to 13.15 | As FreshMarket 13 | Photos in Cloudinary; only the URL in MongoDB | Build | 4 |
| 13.16 | Small images for slow networks | Request resized images with Cloudinary delivery transformations (`f_auto`, `q_auto`, a fixed width) and compare bytes | Build | 1 |

### Module 14: Delivery windows and cutoffs
Source: **New**. Purpose: the hardest constraint, taught on its own before any money moves. Hours: 11

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 14.1 | Set the scene: the 11:31 order | Explain why an order placed after a slow dish's 11:10 cutoff must fail even if the kitchen has space | Read | 0.5 |
| 14.2 | Windows, cutoffs, prep lead and the server clock | Define window, capacity, cutoff and lead time; explain why only the server clock decides (canvas: window fill and cutoff) | Learn | 1.5 |
| 14.3 | Time zones and daylight saving | Store times in UTC, compute them in the kitchen's zone with a time zone library, and test a daylight saving change day | Learn | 1.5 |
| 14.4 | Generate windows from the schedule | Create the next 7 days of windows with an idempotent upsert on kitchen plus start time | Build | 2 |
| 14.5 | Per-dish cutoff | Compute a dish's cutoff as window start minus prepMinutes minus a travel buffer, never later than the window cutoff | Build | 1.5 |
| 14.6 | Schedule exceptions | Close a day, or add special windows (for example iftar windows in Ramadan), without editing the weekly template | Build | 1.5 |
| 14.7 | Verify with a fake clock | Pass boundary tests at cutoff minus one second, at cutoff, and plus one second | Verify | 1.5 |
| 14.8 | Window and cutoff decisions | Apply dated-window, cutoff, retry and closure rules to four scenarios | Check | 0.25 |
| 14.9 | Gate | Explain the cutoff rule for a slow dish and a fast dish in the same window | Gate | 0.75 |

Implementation note (2026-10-24): the dedicated check chapter was added before the gate so a nine-lesson module has a reviewed assessment. Module hours remain 11. This post-approval refinement still needs AQIB and ASIF to confirm it; their original approval was reported for the earlier eight-chapter sequence.

### Module 15: Browse by window API
Source: Adapted (FreshMarket 14). Purpose: answer "who can feed me at 13:00?" rather than "show me all products". Hours: 8

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 15.1 | Set the scene: window first | Explain why a diner chooses a time before a dish | Read | 0.5 |
| 15.2 | The availability query | Return kitchens whose window is open, cutoff is in the future, units remain, and service area matches | Build | 2 |
| 15.3 | Kitchens and dishes without N+1 | Use one aggregation to return kitchens with their orderable dishes | Build | 2 |
| 15.4 | Hide dishes past their own cutoff | Drop slow dishes whose cutoff has passed while fast dishes stay | Build | 1 |
| 15.5 | Filters and pagination | Filter by dietary tag and kitchen; paginate | Build | 1.5 |
| 15.6 | Gate | Explain the query plan with `explain()` | Gate | 1 |

### Module 16: Find a meal
Source: Adapted (FreshMarket 15). Purpose: the diner's browse screen. Hours: 6

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 16.1 | Window picker | Build today and tomorrow's windows as large tap targets | Build | 1.5 |
| 16.2 | Kitchen cards | Show "order by 11:30" and "few spots left" from server data, not client guesses | Build | 2 |
| 16.3 | Dish list per kitchen | Show prep time, allergens and price; hide dishes past cutoff | Build | 1.5 |
| 16.4 | Empty states and gate | When nothing fits, suggest the next window with space | Gate | 1 |

### Module 17: Cart API
Source: Adapted (FreshMarket 16). Purpose: one cart, one window, many kitchens. Hours: 7

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 17.1 | Set the scene: one window per cart | Explain why mixing windows in one cart breaks the checkout | Read | 0.5 |
| 17.2 | Add to cart with time checks | Reject lines past the dish cutoff, above maxPerOrder, or from a kitchen not cooking in that window | Build | 2 |
| 17.3 | Change the window | Revalidate every line when the diner changes window and report which lines no longer fit | Build | 1.5 |
| 17.4 | Load per kitchen | Return the load units each kitchen group would claim | Build | 1 |
| 17.5 | User scoping test | Diner A cannot see diner B's cart | Build | 1 |
| 17.6 | Gate | Cart API complete | Gate | 1 |

### Module 18: Your cart
Source: Adapted (FreshMarket 17). Hours: 4

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 18.1 | Cart grouped by kitchen | Build the grouped cart with quantity controls | Build | 1.5 |
| 18.2 | Countdown to the earliest cutoff | Show a countdown driven by server time offsets, not the phone's clock alone | Build | 1.5 |
| 18.3 | Gate | A line that expires while the cart is open shows a clear message | Gate | 1 |

### Module 19: Checkout, capacity claims and orders
Source: Adapted (FreshMarket 18), heavy changes. Purpose: claim cooking capacity safely and split orders by kitchen. Hours: 11

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 19.1 | Set the scene: two diners, one last spot | Feel the race when two checkouts want the last 3 units | Read | 0.5 |
| 19.2 | Atomic conditional claim | Decrement `remainingUnits` with one `findOneAndUpdate` whose filter requires enough units and an open cutoff | Learn | 1.5 |
| 19.3 | All or nothing across kitchens | Compare compensating release with a MongoDB transaction; implement the one instructors choose | Learn | 1.5 |
| 19.4 | CapacityClaim as a hold | Create claims in state `held` with an `expiresAt` | Build | 2 |
| 19.5 | Split and snapshot | Create one order per kitchen with nameAtPurchase, priceAtPurchase, prepMinutesAtPurchase and the window times | Build | 2 |
| 19.6 | Cutoff re-check at claim time | Re-check the cutoff on the server clock inside the claim, not only when adding to cart | Build | 1 |
| 19.7 | Verify: 20 parallel checkouts | Run a script against a 10-unit window and log which requests won | Verify | 1.5 |
| 19.8 | Checkout decisions | Choose safe outcomes for capacity races, multi-kitchen failure, hold expiry, and payment retries | Check | 0.25 |
| 19.9 | Gate | Remaining units never go below zero; no partial cart reaches payment | Gate | 0.75 |

Implementation note (2026-10-24): the dedicated decision check was added before the gate. Module hours remain 11. This post-approval refinement still needs AQIB and ASIF to confirm it; their original approval was reported for the earlier eight-chapter sequence. The approved core implementation choice in the open-decision table remains compensating release with deterministic claim IDs; MongoDB transactions remain a comparison.

### Module 20: Payment processing
Source: Carry with additions (FreshMarket 19). Hours: 9

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 20.1 to 20.14 | As FreshMarket 19.01 to 19.14 | PaymentIntent from server totals; webhook with signature check; checkout gated on a paid intent; idempotency | Build | 7 |
| 20.15 | Confirm claims in the webhook | Move claims from `held` to `confirmed` when payment succeeds, idempotently | Build | 1 |
| 20.16 | Partial refunds | Refund one kitchen's share of a PaymentIntent with an idempotency key | Build | 1 |

Implementation note (2026-10-24): the learner-facing Sufra M20 is authored as nine complete domain-specific chapters at `courses/multi-vendor-marketplace/variants/home-kitchens/20-payment-processing/`. They cover the approved PaymentIntent, signed webhook, payment decision check, claim confirmation and kitchen-share refund outcomes with explicit late-success recovery, replay tests and a gate. This consolidates the inherited FreshMarket payment sequence and is a post-approval chapter-map refinement awaiting AQIB and ASIF reconfirmation. It does not change the one-intent-per-attempt or refund policy.

### Module 21: Async jobs and queues
Source: Adapted (FreshMarket 22), moved earlier because the lifecycle in Module 22 needs delayed jobs. Hours: 8

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 21.1 | Set the scene: the sync trap | Explain why notifying a cook inside the checkout request is fragile | Read | 0.5 |
| 21.2 | When to queue | Fill a sync versus async decision table for Sufra | Learn | 1 |
| 21.3 | BullMQ connection and worker process | Run `npm run worker` next to the API | Build | 1.5 |
| 21.4 | Nightly window generation | Turn Module 14's generator into a repeatable BullMQ job | Build | 1.5 |
| 21.5 | Expire unpaid holds | Release held units with a delayed job that only acts if the claim is still `held` | Build | 1.5 |
| 21.6 | Order-placed notification | Notify the cook through a job with a deterministic `jobId` so retries do not double-notify | Build | 1 |
| 21.7 | Gate | Checkout returns before the worker logs | Gate | 1 |

Implementation note (2026-10-24): the learner-facing Sufra M21 is authored as eight chapters at `courses/multi-vendor-marketplace/variants/home-kitchens/21-async-jobs-and-queues/`. A three-question queue decision check was added before the scheduler and worker examples; the approved outcomes remain a separate worker, idempotent dated generation, delayed hold expiry and placed-order notification. The chapter-map refinement awaits AQIB and ASIF reconfirmation.

### Module 22: Kitchen acceptance and order lifecycle
Source: **New** (FreshMarket 20 has only a status badge with refresh). Hours: 9

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 22.1 | Set the scene: the cook who never answered | Explain why every order needs an acceptance deadline | Read | 0.5 |
| 22.2 | The state machine | Draw placed → accepted → cooking → ready → out_for_delivery → delivered, plus rejected and cancelled, with who may trigger each | Learn | 1.5 |
| 22.3 | Transitions with preconditions | Change status and append a timeline event with a sequence number in one atomic update; illegal moves return 409 | Build | 2 |
| 22.4 | Acceptance deadline | Auto-reject an order the cook has not accepted by `acceptBy`, using a delayed job | Build | 1.5 |
| 22.5 | Reject, release and refund | On rejection, release the claim and refund that kitchen's share | Build | 1.5 |
| 22.6 | Kitchen board actions | Cook sees orders by window and taps accept, start cooking, ready, out for delivery | Build | 1 |
| 22.7 | Gate | Demo one accepted order and one ignored order | Gate | 1 |

### Module 23: Live order tracking (hero)
Source: **New**. Purpose: status updates that reach a phone quickly and survive a dropped connection. Hours: 13

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 23.1 | Set the scene: lunch on a weak connection | Feel the problem: a diner's phone loses signal while the order is cooking | Read | 0.5 |
| 23.2 | Polling, long polling, SSE and WebSockets | Compare the four on direction, reconnect, proxies and data use on a weak connection (canvas: reconnect and staleness) | Learn | 1.5 |
| 23.3 | Decision: SSE down, plain requests up | Record why the server pushes with SSE and the client sends commands with normal POST requests | Learn | 0.5 |
| 23.4 | One stream per user | Serve `text/event-stream` with heartbeat comments and a `retry` hint; one connection per user, not per order | Build | 2.5 |
| 23.5 | Snapshot on connect, events after | Send the current state of active orders on every connect, then deltas; the client drops events it already has by order id plus sequence | Build | 1.5 |
| 23.6 | Fan-out with Redis pub/sub | Publish after each committed transition so any API process can push to the right user; the order timeline stays the source of truth | Build | 1.5 |
| 23.7 | Polling fallback | `GET /orders/:id/timeline?after=<seq>` with an ETag, backoff, and a pause while the tab is hidden | Build | 1.5 |
| 23.8 | Tracking screen | Timeline, "ready around 13:20", and an honest connection label: live, reconnecting, or last updated two minutes ago | Build | 1.5 |
| 23.9 | Verify: the offline test | Go offline for 60 seconds while the cook advances two steps; the timeline catches up in order with no duplicates; the Module 8 stream isolation test passes | Verify | 1 |
| 23.10 | Gate | Record the offline test and explain what happens if a pub/sub message is lost | Gate | 1 |

### Module 24: Cache and search
Source: Adapted (FreshMarket 21). Hours: 5

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 24.1 | What may be cached here | Cache kitchen menus and dish pages; never cache remaining units or cutoff state | Learn | 1 |
| 24.2 | Cache menus with invalidation | Cache and bust on dish save | Build | 1.5 |
| 24.3 | Dish search | Text index on dish names; use `default_language: "none"` for Arabic names, because MongoDB's built-in text search does not stem Arabic | Build | 1.5 |
| 24.4 | Gate | Measure before and after; fall back to MongoDB if Redis is down | Gate | 1 |

### Module 25: Deploy
Source: Adapted (FreshMarket 23). Hours: 9

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 25.1 to 25.14 | As FreshMarket 23 | HTTPS API, client and worker; secrets in env; restart survival | Build | 7 |
| 25.15 | Streams in production | Confirm the host and proxy do not buffer or cut the stream (heartbeat, no response buffering, compression flush) | Build | 1 |
| 25.16 | Restart with clients connected | Restart the API while a diner is tracking; the browser reconnects and gets a fresh snapshot | Verify | 1 |

### Module 26: Capacity under load
Source: Adapted (replaces FreshMarket 24, inventory reservations). Hours: 8

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 26.1 | Set the scene: the Friday lunch rush | Describe what a busy window looks like from both sides | Read | 0.5 |
| 26.2 | Two clocks: payment and cutoff | Decide what happens when a hold was made before cutoff but payment lands after it (canvas: window fill and cutoff, rush mode) | Learn | 1.5 |
| 26.3 | Hold expiry rules | Set hold expiry so a held unit can never outlive the window's usefulness | Build | 1.5 |
| 26.4 | Reconciliation job | Check that each window's remaining units match its confirmed and held claims; log and fix drift | Build | 1.5 |
| 26.5 | Verify: parallel checkout evidence | Run the load script on the deployed app and save the log | Verify | 1.5 |
| 26.6 | Verify: the cutoff race | With a fake clock, place checkouts one second either side of cutoff | Verify | 1 |
| 26.7 | Gate | Evidence URL and a short write-up | Gate | 0.5 |

### Module 99: Closing and capstone
Source: Adapted (FreshMarket 99). Hours: 9

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 99.1 | Ship it | Final checklist on the live URL | Build | 2 |
| 99.2 | Document it | ERD, architecture diagram (API, worker, Redis queue and pub/sub, event stream), and an ADR on SSE | Build | 3 |
| 99.3 | Two-phone demo video | Record the five-minute demo below | Build | 2 |
| 99.4 | Bar raiser and viva | Practise the defense questions | Gate | 2 |

### Stretch path (optional, 66 hours, total 276)

| # | Stretch lab | One-line outcome | Hours |
|---|---|---|---|
| S1 | Delivery fees and promotions (from FreshMarket 25) | Price delivery per window and apply kitchen-funded discounts on the server | 12 |
| S2 | Authorise now, capture on acceptance | Use `capture_method: manual` and capture only what accepting kitchens cooked, within the authorisation period | 8 |
| S3 | WebSocket spike | Build the same tracking feed with WebSockets, compare reconnect code and data use, and update the ADR | 8 |
| S4 | Web Push for "out for delivery" | Send a push through a service worker; note that iOS Safari supports Web Push only for web apps added to the home screen | 10 |
| S5 | Offline-first tracking | Keep the last timeline in IndexedDB so the screen opens with no network | 8 |
| S6 | Rider persona | Add a third role that takes handoff from the cook and marks delivered | 12 |
| S7 | Cook start-time board | Sort the kitchen board by "start cooking by" time per window | 8 |

## Gate evidence at a glance

| Module | Gate evidence |
|---|---|
| 1 | Learner explains Sufra, the cutoff idea and the scope in their own words |
| 2 | Both apps run; client shows health |
| 3 | `docs/erd-draft.md` with Kitchen, Dish, DeliveryWindow |
| 4 | DB connects; injectable clock exists; `.env` not in Git history |
| 5 | Seed creates 7 days of windows; ERD committed; ownership chain explained |
| 6 to 8 | Auth tests pass; cross-kitchen access returns 403; stream isolation test written (failing) |
| 9 to 10 | Cook onboarding with schedule editor works at phone width |
| 11 to 13 | Dish CRUD with ownership; impossible-load dish rejected; small images measured |
| 14 | Fake-clock boundary tests pass, including a daylight saving day |
| 15 to 16 | Window-first browse; slow dish disappears after its cutoff while fast dish stays |
| 17 to 18 | Cart rejects past-cutoff lines; window change revalidates |
| 19 | 20 parallel checkouts, remaining units never negative, log committed |
| 20 | Test payment, webhook confirms claims, partial refund visible in Stripe test dashboard |
| 21 | Holds expire via worker; notify job deduplicated |
| 22 | Illegal transition 409; ignored order auto-rejected and refunded |
| 23 | Recorded offline test; isolation test passes |
| 24 | Menu cache with invalidation; capacity never cached |
| 25 | Live HTTPS; stream survives proxy and restart |
| 26 | Load and cutoff race evidence on the deployed app |
| 99 | Docs, demo video, viva |

## Capstone

- **What the learner ships:** Sufra on a live HTTPS URL with diner and cook surfaces, an API, a BullMQ worker, Redis for cache, queues and pub/sub, Stripe test-mode payments with partial refunds, and a resumable live tracking stream.
- **Five-minute demo (two phones or two browser windows):** (1) The diner picks today's 13:00 window and sees a slow dish already past its cutoff while fast dishes remain. (2) The diner orders from two kitchens and pays with a Stripe test card. (3) The first cook accepts; the second cook ignores the order, and it auto-rejects with a partial refund. (4) The first cook moves the order to cooking; the diner's phone goes offline; the cook marks it ready and out for delivery; the phone comes back and the timeline catches up in order. (5) The learner runs the parallel checkout script and shows the window filling exactly to capacity.
- **Defense questions:**
  1. Why does a dish have no stock field, and what plays the role of stock?
  2. Who decides that an order is too late, and why not the phone?
  3. Walk through the claim query. What stops two checkouts from taking the last units?
  4. Why SSE and not WebSockets? When would you switch?
  5. A Redis pub/sub message is lost. What does the diner see, and why is nothing lost for good?
  6. A cook ignores an order. Walk through every system that changes.
  7. What happens on the day the clocks change?
- **Production requirements:** secrets only in env; webhook signatures verified; every state change through the state machine; stream authorized per user; heartbeats so proxies keep the stream open; server-side totals and time checks; worker and API restart cleanly; logs show claim, payment and transition IDs.

## Variants

This roadmap is one variant of the FreshMarket general course.

| Variant | Primary user | Hardest constraint | Hero feature | Data-model delta | Capstone |
|---|---|---|---|---|---|
| FreshMarket (general) | Local grocery shops and shoppers | Stock quantity, overselling, price snapshots | Multi-vendor cart with split checkout | Store, Product with stock, StockReservation, Coupon | Split checkout and reservation concurrency evidence |
| **Home kitchens (this)** | Home cooks and diners | Cooking capacity per delivery window, per-dish cutoffs, the server clock | Live order tracking that survives weak connections | Kitchen with schedule, Dish without stock, DeliveryWindow, CapacityClaim, Order with timeline | Two-phone live demo with offline replay and window load test |
| Services | Freelancers and clients | Booked time slots, no double booking | Availability and booking | Defined in that variant | Defined in that variant |
| Handmade | Artisans and buyers | One-off items and made-to-order requests | Custom order flow | Defined in that variant | Defined in that variant |
| Digital goods | Creators and buyers | Instant delivery after payment | Licensing and signed download links | Defined in that variant | Defined in that variant |
| Books | Students and small bookshops | Condition grades and used-item pricing | Search and recommendations | Defined in that variant | Defined in that variant |

## Out of scope

- **Live GPS maps and a rider app.** Location tracking costs data on weak connections, raises privacy questions for riders, and would not fit the time budget. Tracking is status based. A rider role is stretch S6.
- **Paying cooks out.** Stripe Connect payouts need real business onboarding. Money stays in the platform's test account.
- **Real SMS, email or push in the core path.** Notifications are console logs from the worker, as in FreshMarket. Web Push is stretch S4.
- **Food safety certification and legal advice.** One self-declaration step only. Rules differ by place and are not ours to teach.
- **Full right-to-left Arabic interface.** Arabic dish names may appear in seed data and search (open decision 8).
- **Ratings, reviews and dynamic pricing.** Not needed to prove the outcomes.
- **Promotions in the core path.** Moved to stretch S1 to make room for the lifecycle and tracking modules.

## Open decisions for instructors

| # | Decision | Recommendation | Instructor decision |
|---|---|---|---|
| 1 | Live transport: SSE with polling fallback, WebSockets (for example Socket.IO), or polling only | SSE with polling fallback. Updates only flow server to client; `EventSource` reconnects by itself; it is plain HTTP, so it passes most proxies. WebSockets become stretch S3 | |
| 2 | How the stream is authorized, since `EventSource` cannot send an `Authorization` header | An httpOnly, SameSite cookie if client and API share a site; otherwise a single-use stream ticket that expires in about a minute | |
| 3 | All-or-nothing claims across kitchens: compensating release or a MongoDB transaction | Compensating release with idempotent claim IDs in the core path. Transactions need a replica set, so local Docker would have to run a single-node replica set; offer transactions as a discussion | |
| 4 | Handling a rejected kitchen: automatic capture plus partial refund, or manual capture on acceptance | Automatic capture plus partial refund in core (simpler, close to FreshMarket); manual capture is stretch S2 | |
| 5 | Unit of capacity: load units per dish, portions, or prep minutes | Load units per dish. Portions ignore that one tray of maqluba takes more effort than one sandwich; minutes are hard for cooks to estimate | |
| 6 | Who delivers in the core path | The kitchen delivers or the diner collects; status only. Rider persona is stretch S6 | |
| 7 | Moving promotions (FreshMarket 25) to stretch | Yes, to keep the core path at 210 hours | |
| 8 | Arabic dish names in seed data and search | Yes, names in both scripts in seed data; English UI; no RTL layout work | |
| 9 | Hosting choice for Module 25 | Pick a host where a long-lived streaming response has been tested before the cohort starts; record the result in the deploy chapter | |
| 10 | Product name | "Sufra" as the working name; learners may rename it, as in FreshMarket | |

## Confirmation

| Instructor | Role | Decision (approve/revise/reject) | Comments | Date |
|---|---|---|---|---|
| AQIB | Instructor | Approve (reported by course owner) | No changes supplied | Date not supplied |
| ASIF | Instructor | Approve (reported by course owner) | No changes supplied | Date not supplied |
