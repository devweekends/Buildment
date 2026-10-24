---
artifact: curriculum-roadmap
course: multi-vendor-marketplace-handmade
version: 1
status: approved-user-reported
owner: variant-producer
derived_from: multi-vendor-marketplace (FreshMarket)
instructors_reviewed: [AQIB, ASIF]
approval_reported_on: 2026-10-24
approval_date: not supplied
---

# Curriculum roadmap: Ghurza, a handmade marketplace (handmade variant of FreshMarket)

## In one paragraph

The learner builds **Ghurza** (working name), a marketplace where artisan workshops sell handmade work: tatreez embroidery, olive wood and ceramics. The hardest constraint is that many buyers want something that **does not exist yet**: they send a custom request, the maker replies with a quote, the buyer pays a deposit, the maker works for weeks and posts progress photos, the buyer approves and pays the balance, and the piece ships, often across borders. One order lives for weeks, involves two people taking turns, and takes money twice. Ready-made stock adds a second, smaller rule: each piece is **one of one**, so its inventory is a status, not a number, and it must sell exactly once. The learner keeps every FreshMarket outcome (ownership and isolation, a multi-vendor cart split into per-workshop orders with snapshots, Stripe test-mode payments with webhooks, caching, queues, deploy) but proves them on a product where inventory is a status, not a number, and where one order can take weeks and two payments. At the end the learner can run a commission end to end on a live HTTPS URL and defend why it cannot double-sell a piece or lose a deposit.

## Learner and entry prerequisites

- **Learner:** fellows in Gaza building tech careers. English is a second language. Many work on phones, with unreliable power and internet. Same learner as FreshMarket.
- **Prior knowledge:** same as FreshMarket: JavaScript, basic React, basic Express, one CRUD app built before, Git basics.
- **Time available:** 3 to 4 weeks at about 10 hours per day. Core path 210 hours, stretch to 257 hours.
- **Entry diagnostic:** same as FreshMarket (build a small CRUD route and a form), plus two short questions: "What goes wrong if two requests read a value, then both write it?" and "What is a webhook?" Both are taught in the course; the answers only place the learner.

## Outcomes

The outcomes are FreshMarket's outcomes. Only the evidence changes.

| # | Outcome (observable verb) | Evidence in Ghurza |
|---|---|---|
| O1 | **Model** a multi-party domain with clear ownership | ERD where a Workshop owns pieces and an Artisan is credited for them; seed with three workshops |
| O2 | **Secure** accounts with hashed passwords, short-lived JWTs and refresh | Curl flow register, verify, login, refresh; no readable passwords in the database |
| O3 | **Prevent** cross-tenant access at object level | Test: Workshop B gets 403 on Workshop A's request; Buyer B gets 403 on Buyer A's quote |
| O4 | **Split** one checkout into per-vendor orders with immutable snapshots | Two-workshop checkout makes two orders; editing a piece later leaves the order unchanged |
| O5 | **Guarantee** consistency under concurrency | Two-tab race on one piece: exactly one order, the other buyer gets 409 or an automatic test-mode refund |
| O6 | **Take** payment safely with Stripe test mode, webhooks and idempotency | Deposit and balance PaymentIntents; duplicate webhook events change nothing |
| O7 | **Run** a long-lived workflow as a guarded state machine | Commission timeline from request to delivered, every transition checked for actor and state |
| O8 | **Keep** slow work off the request path | Quote expiry, hold sweep and notifications run in a BullMQ worker |
| O9 | **Serve** reads fast and correct | Cached collection busts when a piece sells; text search uses an index (`explain()` shows it) |
| O10 | **Ship** and **defend** a production system | Live HTTPS URL, secrets in env, API and worker survive restart, five-minute demo and viva |

O7 is the FreshMarket order-status outcome (pending, packed, dispatched) taken further: the same skill, with more states, two actors and money at two points.

## Four-week shape

| Week | Focus | Modules | Hours | Demo at the end |
|---|---|---|---|---|
| 1 | Foundations | 1 to 7 | 49 | Both apps run; seed shows 3 workshops, 6 artisans, 12 pieces (2 sold) and 1 open custom request in Compass; buyer and maker can log in |
| 2 | Maker experience | 8 to 14 | 49 | Maker opens a workshop, adds artisans, lists a one-off piece with photos credited to an artisan, sets shipping zones and handling time; Workshop B gets 403 |
| 3 | Buyer and the one-off sale | 15 to 21 | 49 | Buyer adds pieces from two workshops, pays with a Stripe test card, sees two orders; a two-tab race on one piece produces exactly one sale |
| 4 | Commissions and ship | 22 to 27, Closing | 52 | On the live URL: request, quote, revised quote, deposit, progress photos, approval, balance, shipped, delivered |
| | Buffer | | 11 | |
| | **Core total** | | **210** | |

Hours are planning targets. The prerequisites and timeline agent re-sums chapter estimates at G2C and rejects the blueprint if the core path passes 210 hours.

## How this variant maps to FreshMarket

Key: **C** carries over almost unchanged (domain words and seed only), **A** is adapted (same outcome, different model or flow), **N** is new.

| Ghurza module | Mark | FreshMarket source | What changes |
|---|---|---|---|
| 1 Introduction | A | 01 | New product story; a short "writing about craft" rule set |
| 2 Project skeleton | C | 02 | Nothing material |
| 3 Why MongoDB | A | 03 | Craft attributes differ per craft; quote versions and progress updates as embedded history |
| 4 Config and database | C | 04 | Nothing material |
| 5 Data model and seed | A | 05 | Workshop, Artisan, Piece status, CustomRequest, Quote, Commission, ShippingProfile |
| 6 Authentication API | C | 06 | Roles are `buyer` and `maker` |
| 7 Login and registration | C | 07 | Role names only |
| 8 Authorization and isolation | A | 08 | Third object type: a commission has two parties; credit is not ownership |
| 9 Workshop API | A | 09 | Artisan roster, commission settings |
| 10 Open your workshop | A | 10 | Roster and commission settings pages |
| 11 Pieces API | A | 11 | Status machine instead of stock count; sold pieces stay as portfolio |
| 12 Maker dashboard | A | 12 | Status filters, craft fields, 409 handling |
| 13 Piece photos | C | 13 | Several ordered photos per piece instead of one |
| 14 Shipping profiles and lead times | N | none | Zones, handling and transit ranges, customs basics, paused shipping |
| 15 Browse the collection API | A | 14 | Sold pieces visible as portfolio; ships-to filter |
| 16 Shop the collection | A | 15 | Gallery cards, maker credit, "Request something similar" |
| 17 Cart API | A | 16 | No quantity; unavailable lines; shipping per workshop |
| 18 Your cart | A | 17 | Unavailable and ships-to warnings |
| 19 Checkout: sold exactly once | A | 18 and 24 | Per-piece holds move from post-deploy (FreshMarket 24) into core checkout |
| 20 Payment processing | A | 19 | Webhook turns holds into sales; late-success refund backstop |
| 21 Track orders | A | 20 | Packed, shipped (carrier name, tracking reference), received |
| 22 Custom requests | N | none | Hero, part 1 |
| 23 Quotes and deposits | N | 25 (outcome only) | Hero, part 2; FreshMarket's "server owns the total" outcome is taught on quotes |
| 24 Production and balance | N | none | Hero, part 3 |
| 25 Async jobs and queues | A | 22 | Delayed jobs: quote expiry, hold sweep, balance reminders |
| 26 Cache and search | A | 21 | Shorter; bust on sold; never trust cache for checkout |
| 27 Deploy | C | 23 | Smoke test includes a deposit payment on the live URL |
| 99 Closing | A | 99 | New bar-raiser and viva bank |

FreshMarket module 25 (coupon rules engine) is not in the core path. Its outcome, "never trust client totals", is kept and taught in module 23.

## Module and chapter sequence

Types follow FreshMarket step labels: Read, Learn, Check, Build, Wrap (Wrap ends in the checklist gate). Carried-over modules list chapter groups, not every file.

### Module 1: Introduction (A)
Purpose: the learner can say what Ghurza is, who uses it, and how to write about craft without inventing things.
Hours: 4

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 1.1 | What you're building | Describe Ghurza in one sentence: one-off pieces and commissions from artisan workshops | Read | 0.5 |
| 1.2 | How to use this course | Same as FreshMarket: chapters in order, checklist gates, learning log | Read | 0.5 |
| 1.3 | The crafts and the people who make them | Name the buyer, the workshop owner and the credited artisan; explain why the UI says "maker", never "supplier" | Read | 1 |
| 1.4 | Writing about craft with respect and accuracy | Apply four rules: credit the maker, state materials and technique, never invent motif meanings or history, never promise dates | Learn | 0.5 |
| 1.5 | Scope | List what is in and out, including no carrier integrations and no real payouts | Read | 0.5 |
| 1.6 | Prerequisites and course outline | Read the four-week shape and demo targets | Read | 0.5 |
| 1.7 | Your working rhythm | Same as FreshMarket, plus saving work often on unreliable power | Wrap | 0.5 |

### Module 2: Project skeleton (C)
Purpose: both apps run and talk. Hours: 7

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 2.1 to 2.3 | Set the scene, why structure matters, what you'll build | Picture the `server/`, `client/`, `docs/` tree | Read | 0.5 |
| 2.4 to 2.7 | Layer vs module, client vs server, prime, quiz | Choose module-based folders and say why | Learn, Check | 1.5 |
| 2.8 to 2.16 | Repo, server, health route, client, router, API helper, end to end | Client shows `GET /health` | Build | 4.5 |
| 2.17 to 2.19 | Practice, recap, checklist | Gate passed | Wrap | 0.5 |

### Module 3: Why MongoDB (A)
Purpose: the learner can defend documents for this domain and name where SQL would win. Hours: 5

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 3.1 to 3.3 | Set the scene, why it matters for handmade, what you'll decide | See that thread count, wood type and glaze are different fields per craft | Read | 1 |
| 3.4 | Relational vs document | Compare orders and ownership in both worlds | Learn | 1 |
| 3.5 | The decision for Ghurza | Accept MongoDB and Mongoose; name one case (payout ledger) where SQL would win | Learn | 0.5 |
| 3.6 | Embedding vs referencing | Embed quote terms, progress updates and order snapshots; reference workshops and artisans | Learn | 1 |
| 3.7 | Prime your thinking | Mandatory read: MongoDB data modelling introduction | Learn | 0.5 |
| 3.8 to 3.9 | Sketch the ERD, map actors to collections | `docs/erd-draft.md` lists Workshop, Artisan, Piece, CustomRequest, Quote, Commission | Build | 0.75 |
| 3.10 | Checklist | Gate passed | Wrap | 0.25 |

### Module 4: Config and database (C)
Purpose: config from env, fail fast, MongoDB connected. Hours: 7

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 4.1 to 4.3 | Set the scene, why secrets matter, what you'll build | Explain why `.env` never enters Git | Read | 0.5 |
| 4.4 to 4.7 | Env vs hardcoded, local vs Atlas, prime, quiz | Pick one database path for the course | Learn, Check | 1.5 |
| 4.8 to 4.15 | Env files, config module, db module, boot order, health shows db, client env, verify | Stop MongoDB and see a clear failure; restart and recover | Build | 4.5 |
| 4.16 to 4.17 | Recap, checklist | Gate passed | Wrap | 0.5 |

### Module 5: Data model and seed (A)
Purpose: every collection exists, the seed is realistic and respectful, the ERD matches the code. Hours: 10

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 5.1 to 5.3 | Set the scene, the quantity trap, what you'll build | Explain why a one-off piece has a `status`, not a `stockQty` of 1 | Read | 1 |
| 5.4 | Ownership vs credit | A Workshop owns a piece and decides; an Artisan is credited and does not log in | Learn | 1 |
| 5.5 | Craft fields without a schema per craft | Shared fields (materials, technique, dimensions, care) plus a small optional `craftDetails` object | Learn | 0.75 |
| 5.6 | Two things for sale | A piece that exists now vs a commission that does not exist yet | Learn | 0.75 |
| 5.7 | Prime your thinking and quiz | Mandatory read: Mongoose schemas and refs | Learn, Check | 0.5 |
| 5.8 | User, Workshop and Artisan models | One maker user owns one workshop; a workshop has many artisans with a name-display choice | Build | 1.5 |
| 5.9 | Piece model | `status`: draft, available, held, sold, archived; `hold` subdocument; `artisanId` must belong to the workshop | Build | 1 |
| 5.10 | Cart and Order models | Cart holds piece ids, no quantity; Order lines embed snapshots including maker credit and photo URL | Build | 1 |
| 5.11 | ShippingProfile, CustomRequest, Quote, Commission models | Skeleton schemas with status enums; filled in during weeks 2 and 4 | Build | 1 |
| 5.12 | Seed script | Three fictional workshops, six artisans, twelve pieces (two sold), one open request | Build | 1 |
| 5.13 | Final ERD, recap, checklist | `docs/erd.md` committed; explain the ownership chain aloud | Wrap | 0.5 |

### Module 6: Authentication API (C)
Purpose: register, verify, login, refresh, revoke. Hours: 9

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 6.1 to 6.3 | Set the scene, why auth matters, what you'll build | Explain why every request is anonymous today | Read | 0.5 |
| 6.4 to 6.7 | Sessions vs JWT, hashing, what a JWT is, prime | Choose JWT plus refresh and say why | Learn | 2 |
| 6.8 | Quiz | Authentication check | Check | 0.5 |
| 6.9 to 6.18 | Auth module, register (role `buyer` or `maker`), login, tokens, refresh, OTP, middleware, curl flow | Full flow works by curl | Build | 5.5 |
| 6.19 to 6.20 | Recap, checklist | Gate passed | Wrap | 0.5 |

### Module 7: Login and registration (C)
Purpose: humans can sign in. Hours: 7

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 7.1 to 7.3 | Set the scene, token storage, what you'll build | Explain XSS risk to stored tokens | Read | 0.5 |
| 7.4 to 7.7 | Where tokens live, the 401 retry loop, prime, quiz | Access token in memory, refresh in httpOnly cookie | Learn, Check | 1.5 |
| 7.8 to 7.16 | Auth pages, hook, register with role, OTP, login, interceptor, protected routes, verify | Buyer and maker both log in and land on the right home | Build | 4.5 |
| 7.17 to 7.18 | Recap, checklist | Gate passed | Wrap | 0.5 |

### Module 8: Authorization and isolation (A)
Purpose: logged in is not allowed. A commission has two parties; each sees only their side. Hours: 8

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 8.1 to 8.3 | Set the scene, IDOR on a private request, what you'll build | Explain why a buyer's reference photos and budget must stay private | Read | 1 |
| 8.4 | Authn vs authz | Function-level vs object-level checks | Learn | 0.5 |
| 8.5 | Ownership, credit and participation | Owner of a workshop, credited artisan, buyer and maker on a commission: who may do what | Learn | 1 |
| 8.6 | Prime and quiz | Mandatory read: OWASP Broken Object Level Authorization | Learn, Check | 0.5 |
| 8.7 | Authorization matrix | `docs/AUTHORIZATION.md`: action by role by check, including requests, quotes and commissions | Build | 1 |
| 8.8 | Role middleware and ownership helpers | `requireRole`, `assertWorkshopOwner`, `assertCommissionParty` | Build | 2 |
| 8.9 | Test IDOR three ways | Workshop B on Workshop A's piece, request and quote all return 403 | Build | 1.5 |
| 8.10 | Recap and checklist | Gate passed | Wrap | 0.5 |

### Module 9: Workshop API (A)
Purpose: a maker opens one workshop, lists its artisans and sets commission rules. Hours: 7

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 9.1 to 9.3 | Set the scene, one workshop per maker, what you'll build | Explain why a cooperative is one workshop with many artisans | Read | 0.5 |
| 9.4 | Workshop fields and commission settings | Accepting commissions, maximum active commissions, default deposit percent, quote validity days | Learn | 1 |
| 9.5 | Artisans and name display | Each artisan chooses: full name, first name only, or workshop name only | Learn | 0.5 |
| 9.6 | Quiz | Workshop API check | Check | 0.5 |
| 9.7 | Workshop routes | `POST /workshops`, `GET /workshops/me`, `PATCH /workshops/:id` with ownership | Build | 1.5 |
| 9.8 | Artisan routes | Add, edit, retire an artisan inside your own workshop only | Build | 1.5 |
| 9.9 | Test with curl | Second workshop rejected; cross-workshop artisan edit gets 403 | Build | 1 |
| 9.10 | Recap and checklist | Gate passed | Wrap | 0.5 |

### Module 10: Open your workshop (A)
Purpose: onboarding in the browser. Hours: 6

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 10.1 to 10.3 | Set the scene, onboarding as a gate, what you'll build | No workshop means no listing | Read | 0.5 |
| 10.4 | Workshop setup page | Form posts the workshop | Build | 1.5 |
| 10.5 | Artisan roster page | Add artisans with their name-display choice | Build | 1.5 |
| 10.6 | Commission settings page | Toggle accepting commissions; set limits | Build | 1 |
| 10.7 | Onboarding redirect and verify | A new maker is routed through setup first | Build | 1 |
| 10.8 | Recap and checklist | Gate passed | Wrap | 0.5 |

### Module 11: Pieces API (A)
Purpose: makers list one-off pieces whose status can only move in allowed steps. Hours: 8

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 11.1 to 11.3 | Set the scene, sold pieces are portfolio, what you'll build | Explain why a sold piece is kept and shown, never deleted | Read | 0.5 |
| 11.4 | The piece status machine | Draft, available, held, sold, archived; which actor moves which step | Learn | 1 |
| 11.5 | Edits after sale | Why price and title lock once a piece is held or sold | Learn | 0.5 |
| 11.6 | Quiz | Pieces API check | Check | 0.5 |
| 11.7 | Create, list and update pieces | Routes scoped to your workshop; credited artisan must be yours | Build | 2.5 |
| 11.8 | Guarded status transitions | Status changes are conditional updates; a wrong current state returns 409 | Build | 1.5 |
| 11.9 | Test isolation and state | Cross-workshop edit gets 403; edit of a sold piece gets 409 | Build | 1 |
| 11.10 | Recap and checklist | Gate passed | Wrap | 0.5 |

### Module 12: Maker dashboard (A)
Purpose: the maker runs the workshop in the browser. Hours: 6

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 12.1 to 12.3 | Set the scene, table plus forms, what you'll build | Plan the back office | Read | 0.5 |
| 12.4 | Error mapping | 400 to field errors, 403 to a message, 409 to "this piece changed, reload" | Learn | 0.5 |
| 12.5 | Piece table with status filters | Available, held, sold, archived tabs | Build | 1.5 |
| 12.6 | Create and edit piece form | Craft, technique, materials, dimensions, care notes, credited artisan | Build | 1.5 |
| 12.7 | Publish and archive | Draft to available; available to archived | Build | 1 |
| 12.8 | Verify, recap and checklist | Gate passed | Wrap | 1 |

### Module 13: Piece photos (C)
Purpose: photos live in Cloudinary; MongoDB keeps URLs. Hours: 6

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 13.1 to 13.6 | Set the scene, the base64 trap, object storage, prime, quiz | Explain file to storage to URL | Read, Learn, Check | 1.5 |
| 13.7 to 13.10 | Cloudinary config, upload route, ordered photos with a cover, delete replaced images | A piece has up to six photos, including close-ups of stitching, grain or glaze | Build | 3 |
| 13.11 to 13.12 | Upload UI and verify | Upload, reorder, see in the table | Build | 1 |
| 13.13 | Recap and checklist | Gate passed | Wrap | 0.5 |

### Module 14: Shipping profiles and lead times (N)
Purpose: the maker states how and where pieces travel, and the buyer sees honest ranges instead of promised dates. Hours: 8

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 14.1 | Set the scene | A cushion cover and a ceramic bowl do not travel the same way | Read | 0.5 |
| 14.2 | The promise trap | Explain why "arrives Friday" breaks trust when the maker cannot control transit | Read | 0.5 |
| 14.3 | What you'll build | ShippingProfile, zone pricing, ranges on the piece page | Read | 0.25 |
| 14.4 | Three clocks | Production time, handling time and transit time are separate, and each is a range | Learn | 0.75 |
| 14.5 | Zones, rates and "quote required" | A zone is a list of countries with a flat rate or "contact the maker for a quote" | Learn | 0.5 |
| 14.6 | Customs in plain English | Declaration fields (description, material, value), the buyer may owe import charges, some destinations restrict materials such as wood, so the maker confirms per destination | Learn | 1 |
| 14.7 | Quiz | Shipping and lead-time check | Check | 0.5 |
| 14.8 | ShippingProfile model and routes | Ships-from country, zones, handling range, fragile packing note, customs description defaults | Build | 1.5 |
| 14.9 | Shipping for a buyer country | Server returns the rate, or "not shipped here", or "quote required", per workshop | Build | 1 |
| 14.10 | Paused shipping | Maker pauses shipping with a short note; checkout to paused zones is blocked, the note is shown | Build | 0.75 |
| 14.11 | Shipping settings page | Maker edits zones and ranges in the browser | Build | 0.5 |
| 14.12 | Recap, bridge to the buyer week, checklist | Role switch from maker to buyer; gate passed | Wrap | 0.25 |

### Module 15: Browse the collection API (A)
Purpose: a public collection that shows available and sold work without N+1 queries. Hours: 7

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 15.1 to 15.3 | Set the scene, the N+1 trap with workshop and artisan names, what you'll build | Count queries before fixing them | Read | 0.75 |
| 15.4 to 15.5 | Populate vs aggregate, pagination | Pick populate for this page; offset pagination with a default of 20 | Learn | 1.25 |
| 15.6 | Prime and quiz | Mandatory read: cursor vs offset pagination | Learn, Check | 0.5 |
| 15.7 | Public pieces route | Available by default; `?include=sold` shows portfolio pieces | Build | 1.5 |
| 15.8 | Filters | Craft, technique, workshop, artisan, ships to my country | Build | 1.5 |
| 15.9 | Names without N+1 | Workshop and artisan display names in a fixed number of queries | Build | 0.75 |
| 15.10 | Single piece route | Includes the shipping answer for the buyer's country | Build | 0.5 |
| 15.11 | Recap and checklist | Gate passed | Wrap | 0.25 |

### Module 16: Shop the collection (A)
Purpose: a calm gallery a buyer can browse on a phone. Hours: 6

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 16.1 to 16.3 | Set the scene, a gallery not a shelf, what you'll build | Plan cards and detail page | Read | 0.5 |
| 16.4 | Piece card | Photo, title, maker credit, price, "Sold" label | Build | 1 |
| 16.5 | Filter bar | Craft, workshop, ships to | Build | 1 |
| 16.6 | Collection page with pagination | Works on a phone over a slow connection | Build | 1 |
| 16.7 | Piece detail page | Photos, materials, technique, care, shipping range; sold pieces show "Request something similar" | Build | 1.5 |
| 16.8 | Verify, recap and checklist | Gate passed | Wrap | 1 |

### Module 17: Cart API (A)
Purpose: a cart of unique pieces from many workshops. Hours: 6

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 17.1 to 17.3 | Set the scene, no quantity field, what you'll build | Explain why the cart has no quantity control | Read | 0.75 |
| 17.4 | In your cart is not yours | Holds happen at checkout, not on add, so carts cannot lock pieces for days | Learn | 0.75 |
| 17.5 | Quiz | Cart check | Check | 0.5 |
| 17.6 | Add and remove pieces | Same piece twice is rejected; only available pieces can be added | Build | 1.5 |
| 17.7 | Cart grouped by workshop | Subtotal plus shipping per workshop for the buyer's country | Build | 1.25 |
| 17.8 | Unavailable lines | A piece sold elsewhere shows as unavailable instead of disappearing | Build | 0.75 |
| 17.9 | User scoping test, recap, checklist | Buyer A cannot read Buyer B's cart; gate passed | Wrap | 0.5 |

### Module 18: Your cart (A)
Purpose: the cart page. Hours: 4

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 18.1 to 18.2 | Set the scene, grouped by workshop | Plan the page | Read | 0.5 |
| 18.3 | Cart page | Groups, shipping lines, total | Build | 1.25 |
| 18.4 | Warnings | Unavailable pieces, "not shipped to your country", "shipping paused" | Build | 1 |
| 18.5 | Add to cart and header count | Wire the detail page button | Build | 0.75 |
| 18.6 | Verify, recap and checklist | Cart survives a reload; gate passed | Wrap | 0.5 |

### Module 19: Checkout: sold exactly once (A)
Purpose: one checkout makes one order per workshop, and no piece can be sold twice. This absorbs FreshMarket modules 18 and 24. Hours: 11

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 19.1 | Set the scene | Two buyers, one cushion cover, the same second | Read | 0.25 |
| 19.2 | The last-piece trap | Show how "read status, then write sold" lets both buyers win | Read | 0.5 |
| 19.3 | What you'll build | Holds, split orders, snapshots | Read | 0.25 |
| 19.4 | One document, one atomic update | A conditional `findOneAndUpdate` on one document cannot be won by two requests | Learn | 1 |
| 19.5 | Holds with an expiry | Available, held until a time, sold; an expired hold counts as available in the same update | Learn | 0.75 |
| 19.6 | Predict the race | Sketch a timeline of two buyers and one piece, then predict who gets it for three arrival orders | Learn | 0.75 |
| 19.7 | All or nothing across workshops | Release your own holds on failure; why MongoDB transactions need a replica set and when you would use one | Learn | 0.5 |
| 19.8 | Quiz | Checkout consistency check | Check | 0.5 |
| 19.9 | Checkout route | Group cart by workshop; reject paused or unshipped zones | Build | 1 |
| 19.10 | Hold every piece or none | Acquire holds one by one; on any failure release the ones you took and return 409 listing the lost pieces | Build | 1.5 |
| 19.11 | Snapshot order lines | Title, price, maker credit, cover photo URL, craft, shipping amount and ranges | Build | 1 |
| 19.12 | Buyer and maker order routes | `GET /orders/my`, `GET /maker/orders`, both scoped | Build | 0.75 |
| 19.13 | Verify the race | Two browser tabs, one piece: exactly one hold | Build | 1.25 |
| 19.14 | Test snapshot immutability | Edit or archive the piece; the order does not change | Build | 0.5 |
| 19.15 | Recap and checklist | Gate passed | Wrap | 0.5 |

### Module 20: Payment processing (A)
Purpose: payment turns holds into sales, safely and once. Hours: 9

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 20.1 to 20.3 | Set the scene, the fake-checkout trap, what you'll build | Explain "paid but not sold" and "sold but not paid" | Read | 0.75 |
| 20.4 | One payment, many workshop orders | One PaymentIntent id shared by the split orders | Learn | 0.5 |
| 20.5 | Stripe test mode | Test keys and test cards; nothing real is charged | Learn | 0.5 |
| 20.6 | Prime and quiz | Mandatory read: Stripe PaymentIntents and webhooks | Learn, Check | 0.75 |
| 20.7 | Stripe config and the intent | Amount computed on the server from snapshots plus shipping, in the smallest currency unit | Build | 1 |
| 20.8 | Webhook handler | Verify the signature; move every held piece to sold; store the event id so a repeat does nothing | Build | 1.75 |
| 20.9 | Expired holds | Another buyer may take over an expired hold; the old intent is cancelled if it has not succeeded | Build | 1.25 |
| 20.10 | Late success after takeover | If a payment succeeds for a piece now sold to someone else, refund it in test mode and mark that order refunded | Build | 1.25 |
| 20.11 | Verify with test cards | Success, decline and the late-success case | Build | 0.75 |
| 20.12 | Recap and checklist | Gate passed | Wrap | 0.5 |

### Module 21: Track orders (A)
Purpose: both sides follow a one-off order to the door. Hours: 6

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 21.1 to 21.2 | Set the scene, snapshots make the UI easy | No live piece lookups on order pages | Read | 0.5 |
| 21.3 | Checkout page | Payment Element: create intent, confirm, show result | Build | 1.5 |
| 21.4 | Confirmation page | One block per workshop with handling and transit ranges | Build | 0.75 |
| 21.5 | Buyer and maker order pages | Lists from the two scoped routes | Build | 1 |
| 21.6 | Packed and shipped | Maker marks packed, then shipped with carrier name and tracking reference as free text | Build | 1 |
| 21.7 | Received | Buyer marks the order received | Build | 0.5 |
| 21.8 | Week 3 demo, recap, checklist | Browse, cart from two workshops, test pay, both sides see orders | Wrap | 0.75 |

### Module 22: Custom requests (N)
Purpose: a buyer can ask a maker for a piece that does not exist yet, privately and clearly. Hours: 9

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 22.1 | Set the scene | The piece you want does not exist yet | Read | 0.25 |
| 22.2 | The vague-request trap | "Something nice in blue" costs the maker hours of messages | Read | 0.5 |
| 22.3 | What you'll build | Request, inbox, thread | Read | 0.25 |
| 22.4 | The commission journey | Draw request, quote, deposit, production, approval, balance, shipping, delivered | Learn | 1 |
| 22.5 | A good brief, per craft | Size, colours, motif choice, wood availability, glaze colour, budget range, a wished date that is not a promise | Learn | 0.75 |
| 22.6 | Quiz | Custom request check | Check | 0.5 |
| 22.7 | Request routes | Create, list mine, maker inbox, all party-scoped | Build | 1.5 |
| 22.8 | Reference photos | Upload photos linked to the request; only the two parties can list them | Build | 1 |
| 22.9 | Request something similar | Start a request from a sold piece, with the piece linked | Build | 0.5 |
| 22.10 | Request thread | Posted messages, newest last; no real-time chat | Build | 0.75 |
| 22.11 | Decline and pause | Maker declines with a reason; "not accepting commissions" blocks new requests | Build | 0.5 |
| 22.12 | Request form and maker inbox UI | Both sides in the browser | Build | 1 |
| 22.13 | Recap and checklist | Gate passed | Wrap | 0.5 |

### Module 23: Quotes and deposits (N)
Purpose: the maker sends a price the server owns; the buyer accepts the latest version and pays a deposit exactly once. Hours: 10

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 23.1 | Set the scene | A price the maker can stand behind | Read | 0.25 |
| 23.2 | The client-total trap again | Why the deposit amount is computed on the server, never sent by the browser | Read | 0.5 |
| 23.3 | What you'll build | Quotes, acceptance, deposit | Read | 0.25 |
| 23.4 | Quote anatomy | Price, deposit percent, production range, shipping, revisions included, cancellation terms, valid until | Learn | 0.75 |
| 23.5 | Versioned quotes | A new version supersedes the old; only the latest sent version can be accepted | Learn | 0.5 |
| 23.6 | Two payments, not one held charge | A card authorization expires after a limited number of days, and production takes weeks, so deposit and balance are two PaymentIntents | Learn | 0.75 |
| 23.7 | Money as integers | Smallest currency unit; deposit plus balance always equals total; one rounding rule | Learn | 0.5 |
| 23.8 | Quiz | Quote and deposit check | Check | 0.5 |
| 23.9 | Quote model and routes | Send and revise; terms copied onto the quote at send time | Build | 1.5 |
| 23.10 | Accept with a guarded update | Accept only if this version is latest, sent and not expired; otherwise 409 | Build | 1 |
| 23.11 | Deposit PaymentIntent | Create the Commission in `awaiting_deposit`; metadata holds commission id and payment kind | Build | 1 |
| 23.12 | Deposit webhook | `awaiting_deposit` to `in_queue` once; duplicates and out-of-order events change nothing | Build | 1 |
| 23.13 | Quote UI | Maker quote form; buyer view with accept and pay | Build | 1 |
| 23.14 | Recap and checklist | Gate passed | Wrap | 0.5 |

### Module 24: Production and balance (N)
Purpose: weeks of work become a visible, guarded timeline that ends in a balance payment and shipping. Hours: 10

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 24.1 | Set the scene | Weeks of work, made visible | Read | 0.25 |
| 24.2 | The silent-maker trap | A buyer who hears nothing for three weeks asks for a refund | Read | 0.5 |
| 24.3 | What you'll build | State machine, progress, approval, balance | Read | 0.25 |
| 24.4 | The commission state machine | In queue, in production, awaiting approval, awaiting balance, ready to ship, shipped, delivered, cancelled; who moves each step | Learn | 0.75 |
| 24.5 | Capacity and honest ranges; Canvas: Lead-time range | Turn queue length, active limit and production range into a ready window, not a date | Learn | 1 |
| 24.6 | Cancellation and refunds by stage; Canvas: Deposit and cancellation | The terms snapshotted on the accepted quote and the stage the server records decide what is refunded | Learn | 0.75 |
| 24.7 | Quiz | Commission workflow check | Check | 0.5 |
| 24.8 | Transition service | One function checks actor, current state and target state, and appends to an audit trail | Build | 1.5 |
| 24.9 | Progress updates | Maker posts a stage note with photos (for example "pattern drafted", "carving done", "bisque fired") | Build | 1 |
| 24.10 | Final approval | Buyer approves, or asks for the one included revision | Build | 0.75 |
| 24.11 | Balance payment | Balance PaymentIntent; webhook moves to ready to ship; shipping reuses module 21 | Build | 1 |
| 24.12 | Cancel with refund | Full or partial refund through the Stripe Refunds API in test mode, per the snapshotted terms | Build | 0.75 |
| 24.13 | Commission timeline UI | Both sides see the same timeline with photos | Build | 0.5 |
| 24.14 | Commission demo, recap, checklist | Request to delivered in the browser; gate passed | Wrap | 0.5 |

### Module 25: Async jobs and queues (A)
Purpose: timers and notifications leave the request path. Hours: 7

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 25.1 to 25.3 | Set the scene, the sync trap, what you'll build | Explain why a handler must not wait for email | Read | 0.5 |
| 25.4 | When to queue in Ghurza | Decision table: order paid, quote sent, progress posted, hold expired, quote expired | Learn | 0.5 |
| 25.5 | BullMQ, Redis and delayed jobs | A delayed job runs later; the database guard stays the truth | Learn | 0.5 |
| 25.6 | Prime and quiz | Mandatory read: BullMQ docs on delayed jobs and retries | Learn, Check | 0.5 |
| 25.7 | Queue module and worker process | `npm run worker` runs beside the API | Build | 1 |
| 25.8 | Notification jobs | Order paid, quote sent, deposit received, progress posted (console or mock email) | Build | 1 |
| 25.9 | Quote expiry job | Delayed job marks the quote expired; acceptance still checks the date itself | Build | 1 |
| 25.10 | Hold sweep | Release expired holds for a tidy UI and cancel stale unpaid intents | Build | 0.75 |
| 25.11 | Balance reminder and quiet-commission nudge | Remind the buyer to pay; nudge a maker with no update for a set number of days | Build | 0.5 |
| 25.12 | Retries, `jobId` dedup, verify | Handler returns before the worker logs; a retried job does no harm | Build | 0.5 |
| 25.13 | Recap and checklist | Gate passed | Wrap | 0.25 |

### Module 26: Cache and search (A)
Purpose: fast collection reads that never sell a piece twice. Hours: 5

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 26.1 to 26.3 | Set the scene, the stale "available" trap, what you'll build | A cached page may say available; checkout must never trust it | Read | 0.5 |
| 26.4 | TTL vs event invalidation | Use both; the hold update stays the source of truth | Learn | 0.5 |
| 26.5 | Quiz | Cache and search check | Check | 0.25 |
| 26.6 | Redis and cached collection | Cache `GET /pieces` responses | Build | 1 |
| 26.7 | Bust on save and on sold | Piece edit, hold, sale and release all invalidate | Build | 0.75 |
| 26.8 | Text search | Index on title, technique and materials; `explain()` shows an index scan | Build | 1.25 |
| 26.9 | Redis down fallback, recap, checklist | Reads go to MongoDB without a crash; gate passed | Wrap | 0.75 |

### Module 27: Deploy (C)
Purpose: live on HTTPS with the worker. Hours: 7

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 27.1 to 27.3 | Set the scene, secrets in Git forever, what you'll build | `git log -- .env` is empty | Read | 0.5 |
| 27.4 to 27.6 | VPS vs PaaS, prime, quiz | Pick one path | Learn, Check | 1 |
| 27.7 to 27.14 | Env checklist, builds, deploy API, worker and client, domain and HTTPS, webhook endpoint for the live URL in test mode, smoke test (one-off purchase and one deposit), restart test | Live URL survives a restart | Build | 5 |
| 27.15 to 27.16 | Recap and checklist | Gate passed | Wrap | 0.5 |

### Module 99: Closing (A)
Purpose: ship, document, defend. Hours: 4

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 99.1 | Ship it | Final checklist and live URL | Wrap | 1 |
| 99.2 | Document it | ERD, commission state diagram, shipping and lead-time policy page, CHALLENGES.md | Wrap | 1.5 |
| 99.3 | Bar-raiser and defense | Self-audit against the capstone clauses; viva practice | Wrap | 1.5 |

### Stretch path (optional, 47 hours, total 257)

| # | Module | One-line outcome | Hours |
|---|---|---|---|
| S1 | Arabic and English listings | Bilingual piece fields and a right-to-left layout that does not break | 8 |
| S2 | Saved card for the balance | Save the card at deposit time and charge the balance off-session, handling the case where the bank asks the buyer to authenticate | 8 |
| S3 | Cooperative ledger | Record what each credited artisan is owed per sale and per commission (a record only, no payouts) | 7 |
| S4 | Per-order shipping quotes and customs export | "Quote required" zones get a shipping quote inside the request flow; export customs declaration data per order | 7 |
| S5 | Lead-time honesty report | Compare quoted production ranges with actual durations per artisan | 5 |
| S6 | Low-bandwidth maker mode | Smaller image transformations and offline drafts of progress updates that send when the connection returns | 7 |
| S7 | Portfolio case study and demo polish | A written case study and a recorded demo | 5 |

### Canvases (two, both teach this variant's constraint)

| Canvas | Module | Inputs (2 to 4) | Claim the learner can state after | Stated limit |
|---|---|---|---|---|
| Lead-time range | 24 | Commissions ahead in the queue, maximum active at once, production days range, transit days range | "A ready date is a range that widens with the queue; show the range, not a promise" | Assumes the maker works the queue in order at a steady pace; real craft work varies |
| Deposit and cancellation | 24 | Quoted price, deposit percent, stage at cancellation, refund rule on the quote | "The terms copied onto the accepted quote and the stage recorded by the server decide the refund; deposit plus balance always equals the total" | One currency; ignores payment provider fees and partial material costs |

Neither canvas reuses FreshMarket's quantity-reservation model, and neither models a stock or copy race (single-copy holds are shared spine with the books variant and are taught in module 19 with a sketch and a test, not a canvas).

## Gate evidence at a glance

| Module | Gate evidence |
|---|---|
| 1 | Learner states the product, the three people, and the four writing rules |
| 2 to 4 | Client shows health with `db: connected`; no secrets in Git |
| 5 | Seed runs; `docs/erd.md` shows ownership vs credit and the two kinds of thing for sale |
| 6 to 7 | Buyer and maker register, verify and log in; silent refresh on 401 |
| 8 | Three IDOR tests return 403; `docs/AUTHORIZATION.md` committed |
| 9 to 10 | Workshop with two artisans created in the browser; second workshop rejected |
| 11 to 12 | Piece status changes only through allowed steps; edit of a sold piece returns 409 |
| 13 | Ordered photos in Cloudinary; only URLs in MongoDB |
| 14 | Piece page shows the right shipping answer for three buyer countries, including "not shipped here" and "paused" |
| 15 to 16 | Collection with filters and sold portfolio; fixed query count logged |
| 17 to 18 | Cart groups by workshop; a piece sold elsewhere shows as unavailable |
| 19 | Two-tab race gives exactly one hold; two-workshop checkout gives two orders; snapshot test passes |
| 20 | Test card payment marks pieces sold; duplicate webhook does nothing; late-success case refunded in test mode |
| 21 | Week 3 demo recorded |
| 22 | Buyer sends a request with reference photos; another buyer cannot read it |
| 23 | Stale quote version returns 409; deposit amount comes from the server; deposit webhook processed once |
| 24 | Commission timeline from in queue to delivered with photos; a stage-based cancellation refunds the right amount |
| 25 | Handler returns before the worker logs; quote expiry and hold sweep visible in Redis |
| 26 | Cache busts on sold; search uses an index |
| 27 | Live HTTPS URL; API and worker survive a restart |
| 99 | Capstone demo and viva |

## Capstone

- **What the learner ships:** Ghurza on a live HTTPS URL, with API, worker and client, seeded with fictional workshops, plus `docs/erd.md`, `docs/AUTHORIZATION.md`, a commission state diagram, a shipping and lead-time policy page, and `CHALLENGES.md`.
- **Five-minute demo:**
  1. A buyer in a country that one workshop does not ship to opens the cart: that workshop's piece shows "not shipped to your country". The buyer checks out one-off pieces from two other workshops and gets two orders, each with its own shipping amount and handling and transit ranges.
  2. A buyer opens a sold olive wood bowl and taps "Request something similar". The maker sends quote version 1, then version 2; accepting version 1 now fails.
  3. The buyer pays the deposit with a test card. The maker posts two progress updates with photos. The buyer approves, pays the balance, and the maker marks the piece shipped with a tracking reference.
  4. The maker dashboard shows the commission queue and the ready-window range for a new request. A second commission is cancelled during production and refunds exactly what its quote terms say.
- **Spine evidence submitted with the capstone, not demoed as the headline:** the module 19 two-tab race recording (one hold, one 409) and the module 20 late-success refund log.
- **Defense questions:**
  - How do you guarantee a piece is sold exactly once? Show the update.
  - Why two PaymentIntents and not one authorization captured later?
  - What happens if Stripe sends the deposit webhook twice, or the balance event before the deposit event?
  - The quote expires while the buyer is on the payment page. What happens, and which line of code decides it?
  - Who can read the buyer's reference photos? How did you test it?
  - Why does the product show ranges and never a delivery date?
  - What does the credited artisan see, and what do they control?
  - If you had to pay artisans for real, what would change, and what would you check first?
- **Production requirements:** same bar as FreshMarket: HTTPS, secrets only in env, API and worker survive a restart, webhook signature verified, rate limits on auth and request creation, no unscoped list routes, logs that show each commission transition.

## Variants

| Variant | Primary user | Hardest constraint | Hero feature | Data-model delta | Capstone |
|---|---|---|---|---|---|
| FreshMarket (general) | Local grocery shops and shoppers | Multi-vendor cart split, stock counts | One cart, per-vendor orders | Store, Product with `stockQty`, StockReservation | Two-store grocery checkout |
| **Handmade (this roadmap)** | Artisan workshops and buyers who want unique or custom work | Made to order: the piece is sold before it exists, through a weeks-long, two-party, two-payment workflow with honest lead times | Custom order flow: request, quote, deposit, production, balance, delivery | Workshop, Artisan (credit), Piece status and hold, CustomRequest, Quote (versioned), Commission (two payments), ShippingProfile | Full commission with deposit, progress, balance and a stage-based cancellation, plus a cross-border cart, on a live URL |
| Services | Freelancers and clients | Cart holds booked time slots | Availability and booking | See services roadmap | See services roadmap |
| Home kitchens | Home cooks and diners | Prep times, cutoffs, delivery windows | Live order tracking | See home-kitchens roadmap | See home-kitchens roadmap |
| Digital goods | Creators of templates, fonts, ebooks | No shipping; instant delivery after payment | Licensing and signed download links | See digital-goods roadmap | See digital-goods roadmap |
| Books | Students and small bookshops | Condition grades and used-item pricing | Search, and want-list alerts when a matching copy is listed | See books roadmap | See books roadmap |

## Out of scope

- **Real payouts to makers.** The course uses Stripe test mode on one platform account, like FreshMarket. Whether a payment provider can pay out to makers in a given country is a real-world question the course does not answer. Stretch S3 records what is owed; it does not move money.
- **Carrier integrations, labels and live tracking.** The maker types a carrier name and tracking reference. The course makes no claim about which routes or carriers are available from any place.
- **Duties and tax calculation.** The buyer is told import charges may apply. The platform does not compute them.
- **Multi-currency.** One platform currency.
- **Real-time chat.** Request threads are posted messages, refreshed on load.
- **Platform admin, disputes and moderation.** Same as FreshMarket: no admin panel.
- **Reviews and ratings.** Not needed to teach the outcomes.
- **"Notify me when available" and back-in-stock alerts.** A one-off piece never comes back, and saved-search alerts are the books variant's hero. The worker jobs in module 25 notify the two parties of an existing order or commission only.
- **Coupons and promotions (FreshMarket module 25).** The trust outcome is kept in module 23.

## Open decisions for instructors

| # | Decision | Recommendation | Instructor decision |
|---|---|---|---|
| 1 | Product name. "Ghurza" is meant as the Arabic word for a stitch. | Keep as working name only after an Arabic-speaking instructor confirms spelling, meaning and that it reads well; otherwise use a plain English name | |
| 2 | Seed content: fictional makers only, or real artisans with consent? | Fictional workshops and makers in the seed. Photos must be the learner's own, openly licensed, or used with written permission. Real artisans may join the capstone only with consent | |
| 3 | Do seed workshops name real Palestinian cities as locations? | Leave location as free text the maker enters, and keep seed locations generic, so the course makes no claims about shipping from any place | |
| 4 | Move the sold-once guarantee into core week 3 (FreshMarket teaches reservations after deploy) | Yes. A one-off piece has no stock count to decrement, so checkout cannot be built without it. It stays spine (shared with books), not the hero | |
| 5 | Drop the coupon engine from core and teach its trust outcome on quotes | Yes | |
| 6 | Default deposit percent and refund-by-stage terms | Maker sets them within bounds; course default of 50 percent is a teaching choice, not an industry figure. Terms are copied onto each quote | |
| 7 | Balance payment on-session (core) vs saved card off-session | On-session in core; off-session in stretch S2 because authentication handling adds hours | |
| 8 | Checkout hold length | 15 minutes, same as FreshMarket, so the comparison is clean | |
| 9 | Buyer reference photos: authorized API listing with unguessable ids (core) vs signed delivery URLs | Authorized listing in core, with the limit stated. Signed delivery is the digital-goods hero; do not make it central here | |
| 10 | Auto-complete "delivered" a set number of days after "shipped" if the buyer never confirms | Yes, as a worker job, with the number of days set by the maker | |
| 11 | Arabic and right-to-left support: core or stretch? | Stretch S1, with schema fields ready from module 5 | |
| 12 | Cache and search cut to 5 hours | Accept; restore to 6 if instructors find the core under budget at G2C | |
| 13 | Boundary with the books variant | Books owns want-list alerts ("tell me when a matching copy is listed"). Ghurza has no "notify me when available" or back-in-stock alert anywhere: a sold piece leads to "Request something similar", which is a message to a maker, not a saved search. Both variants hold a single unit at checkout and run a two-tab race test: accepted as shared spine. Ghurza does not demo the race as its capstone headline and has no race canvas | |

## Confirmation

| Instructor | Role | Decision (approve/revise/reject) | Comments | Date |
|---|---|---|---|---|
| AQIB | Instructor | Approve (reported by course owner) | No changes supplied | Date not supplied |
| ASIF | Instructor | Approve (reported by course owner) | No changes supplied | Date not supplied |
