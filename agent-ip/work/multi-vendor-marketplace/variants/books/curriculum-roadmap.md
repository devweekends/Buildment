---
artifact: curriculum-roadmap
course: multi-vendor-marketplace-books
version: 1
status: approved-user-reported
owner: variant-producer
derived_from: multi-vendor-marketplace (FreshMarket)
instructors_reviewed: [AQIB, ASIF]
approval_reported_on: 2026-10-24
approval_date: not supplied
---

# Curriculum roadmap: Hamesh (books variant of FreshMarket)

## In one paragraph

The learner builds **Hamesh**, a marketplace where small bookshops list used and new copies of books, and university students find the exact editions on their course reading lists at a condition and price they can afford. A shop types an ISBN, the system finds or creates the shared edition record, and the shop adds a copy with an honest condition grade, defect notes, photos and a price. A student imports a course reading list, and the matcher picks the best copy for each title across all shops; titles that nobody has yet go onto a want-list, and the student gets an alert as soon as a matching copy is listed. Checkout still splits one payment into one order per shop, with Stripe in test mode. At the end the learner can model a shared catalogue with shop-owned copies, sell each physical copy exactly once, run standing matches in a background worker without duplicate alerts, deploy the system, and defend every one of those decisions.

The spine, stack (MongoDB, Express, React with Vite, Node.js, Redis, BullMQ, Cloudinary, Stripe test mode) and outcomes are the same as FreshMarket. The product, the data model, the hardest constraint and the hero feature are not.

## Learner and entry prerequisites

- **Learner:** fellows in Gaza building tech careers. English is a second language. Many work on phones or shared laptops, with unreliable power and internet. Plain English, short steps, work saved often.
- **Prior knowledge:** JavaScript fundamentals, HTTP request and response, one CRUD app built before, Git and the command line, basic data modelling. Same as FreshMarket.
- **Time available:** 3 to 4 weeks at about 10 hours per day. Core path 210 hours, stretch path up to 280 hours.
- **Entry diagnostic:** a 20 minute check in chapter 1.5: read and fix a small Express route, write one Mongoose query with a filter, explain a Git branch, and compute an ISBN-13 check digit from a worked example (this last item checks careful reading of a numeric rule, not prior book knowledge). Learners who miss two or more items go to the FreshMarket repair path before Module 2.

## Outcomes

| # | Outcome (observable verb) | Evidence |
|---|---|---|
| O1 | **Model** a shared catalogue (Work, Edition) separately from shop-owned copies (Listing), with ownership that can be checked | `docs/erd.md`, seed data in Compass, viva answer on "why is Edition not owned by a shop" |
| O2 | **Implement** password hashing, role-aware JWT access tokens and refresh tokens for students, shop owners and an admin | curl transcript of register, verify, login, refresh; no readable passwords in the database |
| O3 | **Enforce** role and ownership checks so one shop cannot change another shop's copies, and nobody can rewrite a shared edition once copies exist | `docs/AUTHORIZATION.md`, two-shop IDOR test returning 403 |
| O4 | **Split** one checkout into one order per shop and **snapshot** title, ISBN, grade, defects and price on each line | snapshot immutability test: regrade and reprice a sold copy, old order unchanged |
| O5 | **Take** payment with Stripe Payment Intents in test mode, gated on a verified webhook | test card payment, webhook log, orders marked paid |
| O6 | **Query** editions with their offers per grade without N+1 queries | logged query count before and after the aggregation |
| O7 | **Store** condition photos in object storage with only URLs in MongoDB | Cloudinary URLs on listings, small documents |
| O8 | **Cache** offer summaries with correct invalidation and **search** by exact ISBN and by indexed title or author | cache hit and miss timings, `explain()` showing index use |
| O9 | **Run** background jobs with retries and idempotency, including standing want-list matches that alert each student once per copy | worker logs, unique index on alerts, worker-down test |
| O10 | **Deploy** API, worker and client on HTTPS with secrets only in environment variables | live URL, `git log -- .env` empty, restart survival test |
| O11 | **Prevent** two students buying the same physical copy | two-tab race test: one 409 with a substitute suggestion |
| O12 | **Own** prices on the server, including grade-based suggestions and scheduled markdowns, with an audit trail | PaymentIntent amount equals server total, price change log |
| O13 | **Defend** the design in a demo and viva without notes | five-minute demo video, viva answers |

## Four-week shape

| Week | Focus | Modules | Hours | Demo at the end |
|---|---|---|---|---|
| 1 | Foundations and the shared catalogue model | 1 to 8 | 51 | Both apps run; seed shows three shops, editions and graded copies in Compass; auth and the authorization matrix work |
| 2 | Shop experience and finding books | 9 to 17 | 57 | A shop types an ISBN, lists a graded copy with photos and price guidance; a student finds the edition, compares copies by grade, and fills a cart |
| 3 | Reading lists, commerce and the performance layer | 18 to 23 | 49 | A student matches a reading list across shops, pays with a Stripe test card, gets one order per shop with grade snapshots and collection codes; ISBN search and cached offers work; order jobs run in the worker |
| 4 | Hero completion, deploy and hardening | 24 to 27, 99, buffer | 53 (42 + 11 buffer) | Live on HTTPS: a missing title on the want-list triggers one alert when a shop lists it; two students race for the last copy; a markdown re-runs matches; capstone defense |
| | **Total core** | | **210** | |

## Module and chapter sequence

Status key: **Carry** means the FreshMarket module is reused almost unchanged (domain names and seed data only). **Adapt** means the same skill with a materially different build. **New** means a module FreshMarket does not have. FreshMarket module numbers are given in brackets.

Chapter rows below group FreshMarket-style sub-chapters into teachable chapters. The writer expands each row into the usual Open, Learn, Check, Build, Wrap cluster after sign-off.

### Module 1: Introduction (Adapt, from FM 01)
Purpose: meet the product, the people, the rules and the vocabulary of the book trade.
Hours: 5
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 1.1 | What you are building | Describe Hamesh in two sentences: reading lists matched to graded copies from local shops | Read | 0.5 |
| 1.2 | How to use this course | Know the step types, gates and learning log | Read | 0.5 |
| 1.3 | The product and its people | Name the three actors: student, shop owner, platform admin, and what each needs | Read | 0.5 |
| 1.4 | Scope | List what is in and out of scope, including what a condition grade does and does not promise | Read | 0.5 |
| 1.5 | Entry diagnostic | Take the 20 minute check and get routed to core or repair | Check | 1 |
| 1.6 | Course outline | See the four weeks and the demo at the end of each | Read | 0.5 |
| 1.7 | Book trade vocabulary | Use work, edition, ISBN, format and condition grade correctly | Learn | 0.5 |
| 1.8 | Your working rhythm | Commit often, keep secrets out of Git, read errors first, save before power cuts | Wrap | 1 |

### Module 2: Project skeleton (Carry, FM 02)
Purpose: both apps run and talk.
Hours: 6
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 2.1 | Layer vs module folders | Defend module-based folders for this project | Learn | 1 |
| 2.2 | Scaffold server and client | `server/` and `client/` run with the course folder convention | Build | 3.5 |
| 2.3 | Client calls `/health` | The browser shows the health response | Build | 1 |
| 2.4 | Recap and checklist | Pass the skeleton gate | Gate | 0.5 |

### Module 3: Why MongoDB (Adapt, FM 03)
Purpose: choose the database shape for one book that exists as many copies.
Hours: 4
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 3.1 | One book, many copies | Explain why a shared edition with many owned copies is a modelling problem | Read | 0.5 |
| 3.2 | Relational vs document for a book catalogue | Compare tables and documents for Work, Edition and Listing | Learn | 1 |
| 3.3 | The decision for Hamesh | Defend references (not embedding) between Listing and Edition | Learn | 0.5 |
| 3.4 | Embedding vs referencing | Decide what to embed in a reading list and in an order line | Learn | 0.5 |
| 3.5 | Quiz | Check modelling choices | Check | 0.5 |
| 3.6 | Draft the ERD | Commit `docs/erd-draft.md` | Build | 0.5 |
| 3.7 | Checklist | Pass the gate | Gate | 0.5 |

### Module 4: Config and database (Carry, FM 04)
Purpose: validated config, MongoDB connection, no secrets in Git.
Hours: 5
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 4.1 | Environment vs hardcoded config | Explain `.env` and `.env.example` | Learn | 1 |
| 4.2 | Config and db modules | The server fails fast on missing variables and connects to MongoDB | Build | 2.5 |
| 4.3 | Health shows database status | `/health` reports `db: connected` | Build | 1 |
| 4.4 | Checklist | Stop MongoDB, see a clear failure, restart, recover | Gate | 0.5 |

### Module 5: Data model and seed (Adapt, heavy, FM 05)
Purpose: build the shared catalogue, owned copies, reading lists and want-lists.
Hours: 10
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 5.1 | The product that is not one product | Explain why FreshMarket's Product splits into Edition and Listing here | Read | 0.5 |
| 5.2 | The duplicate edition trap | Predict what breaks when each shop types its own title for the same ISBN | Read | 0.5 |
| 5.3 | Ownership with a shared catalogue | Draw User to Shop to Listing, and Listing to the shared Edition and Work | Learn | 1 |
| 5.4 | Condition grades as ranks | Store each grade as an ordered number plus a label, so "Good or better" is one query | Learn | 0.5 |
| 5.5 | ISBN-10, ISBN-13 and check digits | Validate both formats by hand and explain why 979 numbers have no ISBN-10 | Learn | 1 |
| 5.6 | Quiz | Check the model | Check | 0.5 |
| 5.7 | User, Profile and Shop models | Identity, profile and one shop per owner | Build | 1 |
| 5.8 | Work and Edition models | Unique index on `isbn13`, partial unique index on `isbn10` | Build | 1 |
| 5.9 | Listing model | A copy with grade rank, defects, price in minor units, photos and status | Build | 1 |
| 5.10 | ReadingList and WantListEntry models | Reading list items that accept a set of editions; want entries with grade floor and price ceiling | Build | 1 |
| 5.11 | Cart and Order models | Cart lines point at one copy; order lines embed snapshots | Build | 0.5 |
| 5.12 | Seed script | Three fictional shops, openly licensed textbooks with real ISBNs, copies in every grade, one demo reading list | Build | 1 |
| 5.13 | Final ERD and checklist | Commit `docs/erd.md`; explain both ownership chains | Gate | 0.5 |

### Module 6: Authentication API (Carry, FM 06)
Purpose: register, login, refresh, OTP, with roles student, shop and admin.
Hours: 8
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 6.1 | Sessions vs JWT, hashing, JWT anatomy | Defend JWT plus refresh token for this course | Learn | 2 |
| 6.2 | Register, login, tokens | Hashed passwords; short-lived access token with role | Build | 3 |
| 6.3 | Refresh and OTP | Hashed refresh tokens with revoke; unverified users blocked | Build | 2 |
| 6.4 | curl walkthrough and checklist | Full flow passes | Gate | 1 |

### Module 7: Login and registration (Carry, FM 07)
Purpose: auth screens with safe token storage.
Hours: 7
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 7.1 | Where tokens live; the 401 retry loop | Explain memory plus httpOnly cookie | Learn | 1.5 |
| 7.2 | Register, verify, login pages | Student and shop owner can sign up and sign in | Build | 3 |
| 7.3 | Interceptor and protected routes | Silent refresh on 401; redirect by role | Build | 2 |
| 7.4 | Checklist | Both roles work in the browser | Gate | 0.5 |

### Module 8: Authorization and isolation (Adapt, FM 08)
Purpose: owned records and shared records follow different rules.
Hours: 6
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 8.1 | Shared records, owned records | Explain why an Edition has no owner but a Listing does | Read | 0.5 |
| 8.2 | IDOR on copies and on editions | Name two attacks: editing another shop's copy, and rewriting a shared edition's title | Read | 0.5 |
| 8.3 | RBAC, ownership and shared-record rules | Combine role, ownership and "locked once used" checks | Learn | 1 |
| 8.4 | Quiz | Check the rules | Check | 0.5 |
| 8.5 | Authorization matrix | Write `docs/AUTHORIZATION.md` for every collection and role | Build | 1 |
| 8.6 | `requireRole` and `assertShopOwner` | Middleware returns 403 for wrong role or wrong shop | Build | 1 |
| 8.7 | Locked-edition rule | Edition fields cannot change once any listing points at it, except by admin | Build | 1 |
| 8.8 | Two-shop IDOR test and checklist | Shop B gets 403 on Shop A's copy | Gate | 0.5 |

### Module 9: Bookshop API (Carry, FM 09)
Purpose: a verified shop owner opens one shop.
Hours: 5
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 9.1 | Shop fields and slugs | Name, area, opening hours, pickup notes | Learn | 1 |
| 9.2 | Create, get mine, update | One shop per owner; ownership on PATCH | Build | 3 |
| 9.3 | curl test and checklist | Second shop rejected; cross-shop PATCH 403 | Gate | 1 |

### Module 10: Open your bookshop (Carry, FM 10)
Purpose: onboarding UI with a routing gate.
Hours: 4
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 10.1 | Shop layout, setup and settings pages | Owner opens and edits the shop in the browser | Build | 3 |
| 10.2 | Onboarding redirect and checklist | A shop owner without a shop cannot reach listing pages | Gate | 1 |

### Module 11: Editions and ISBN API (New)
Purpose: turn whatever a shop owner types into one correct, shared edition record.
Hours: 10
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 11.1 | The shop owner types an ISBN | See the counter workflow and what can go wrong | Read | 0.5 |
| 11.2 | Why "find or create" is a race | Predict what happens when two shops add the same new ISBN at the same moment | Read | 0.5 |
| 11.3 | Normalising input | Strip spaces and hyphens, accept a final X, convert ISBN-10 to ISBN-13 | Learn | 1 |
| 11.4 | Upsert vs insert and catch | Decide how to handle duplicate key error 11000 and defend it | Learn | 1 |
| 11.5 | Quiz | Check ISBN and race reasoning | Check | 0.5 |
| 11.6 | `isbn` module with unit tests | Normalise, validate and convert, with tests for bad check digits and 979 numbers | Build | 2 |
| 11.7 | `GET /editions/lookup?isbn=` | Returns the edition or a 404 that echoes the normalised ISBN | Build | 1 |
| 11.8 | `POST /editions` find-or-create | Two concurrent creates end with one edition | Build | 1.5 |
| 11.9 | Listing CRUD routes | A shop creates, edits and withdraws its own copies; cross-shop 403 | Build | 1.5 |
| 11.10 | Checklist | Pass the gate | Gate | 0.5 |

### Module 12: List a copy (Adapt, FM 12 vendor dashboard)
Purpose: the shop's back office, built around the ISBN-first listing flow.
Hours: 8
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 12.1 | The counter workflow | Picture a shop owner with a pile of returned textbooks | Read | 0.5 |
| 12.2 | Grading honestly | Use the grade checklist; keep defects separate from the grade | Learn | 1 |
| 12.3 | Error mapping | Show 400 field errors inline and 403 as a message | Learn | 0.5 |
| 12.4 | Listings table | The shop sees its copies by status | Build | 1 |
| 12.5 | ISBN-first listing form | Type an ISBN, see the edition preview, or create the edition | Build | 2 |
| 12.6 | Grade and defects step | Pick a grade, tick defects, add notes | Build | 1 |
| 12.7 | Price guidance panel | See the lowest active price per grade for this edition before setting a price | Build | 1.5 |
| 12.8 | Verify and checklist | List three copies of one edition in three grades | Gate | 0.5 |

### Module 13: Condition photos (Adapt, FM 13)
Purpose: photos of the actual copy, stored outside MongoDB.
Hours: 5
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 13.1 | Buyers judge condition from photos | Explain why a stock cover image is not enough for a used copy | Read | 0.5 |
| 13.2 | Object storage pattern | File to storage, URL to database | Learn | 0.5 |
| 13.3 | Quiz | Check | Check | 0.5 |
| 13.4 | Cloudinary config and upload route | Up to four photos per copy; old photos removed on replace | Build | 1.5 |
| 13.5 | Photo required below Very Good | The server refuses to publish a low-grade copy without a photo | Build | 1 |
| 13.6 | Upload UI and checklist | Photos show on the listings table | Gate | 1 |

### Module 14: Browse editions API (Adapt, FM 14)
Purpose: students browse books, not shops: one edition with all its copies.
Hours: 9
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 14.1 | Students search by book, not by shop | Explain the edition-first view | Read | 0.5 |
| 14.2 | The N+1 trap, twice | Count queries for editions, then copies, then shop names | Read | 0.5 |
| 14.3 | Aggregation for offers per grade | `$match`, `$group` by grade, `$lookup` for shops | Learn | 1.5 |
| 14.4 | Pagination | Page and limit with sensible defaults | Learn | 0.5 |
| 14.5 | Quiz | Check | Check | 0.5 |
| 14.6 | `GET /editions` with offer summary | Lowest price and count per grade for each edition | Build | 2 |
| 14.7 | `GET /editions/:id/copies` | Filter by minimum grade and maximum price | Build | 1.5 |
| 14.8 | Measure query count | Log queries before and after | Build | 1 |
| 14.9 | Test and checklist | Pass the gate | Gate | 1 |

### Module 15: Find a book (Adapt, FM 15)
Purpose: the student storefront.
Hours: 6
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 15.1 | Set the scene | A student with a phone and a course code | Read | 0.5 |
| 15.2 | Grade badges people can read | Show grade as text and rank, never colour alone | Learn | 0.5 |
| 15.3 | Edition card and search box | Browse editions with offer summaries | Build | 1.5 |
| 15.4 | Edition page with copies by grade | Compare copies across shops | Build | 2 |
| 15.5 | Copy detail | Photos, defects and shop pickup notes | Build | 1 |
| 15.6 | Verify and checklist | Pass the gate | Gate | 0.5 |

### Module 16: Cart API (Adapt, FM 16)
Purpose: a cart of specific copies, not quantities.
Hours: 6
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 16.1 | A cart of copies | Explain why each line is one physical copy | Read | 0.5 |
| 16.2 | Why quantity disappears | Compare FreshMarket's quantity line with a copy line | Learn | 0.5 |
| 16.3 | Quiz | Check | Check | 0.5 |
| 16.4 | Add, get, remove a copy | Cart persists and is grouped by shop | Build | 2 |
| 16.5 | Reject sold, withdrawn and duplicate copies | Clear 409 and 400 errors | Build | 1 |
| 16.6 | Same edition twice warning | Warn when two copies of one edition are in the cart | Build | 0.5 |
| 16.7 | User scoping test and checklist | Student A cannot see Student B's cart | Gate | 1 |

### Module 17: Your cart (Carry, FM 17)
Purpose: cart UI grouped by shop.
Hours: 4
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 17.1 | Cart page grouped by shop | Subtotals per shop; remove a copy | Build | 2.5 |
| 17.2 | Add-to-cart wiring and header badge | Copy detail adds to cart | Build | 1 |
| 17.3 | Checklist | Cart survives reload | Gate | 0.5 |

### Module 18: Reading lists and the matcher (New, hero part 1)
Purpose: a student fills a whole course reading list in one step.
Hours: 12
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 18.1 | Set the scene: a first-year biology list | Feel the cost of searching one title at a time on a phone | Read | 0.5 |
| 18.2 | Why one-at-a-time search fails students | Name the three failures: wrong edition, wrong grade, too many pickups | Read | 0.5 |
| 18.3 | Acceptable editions | Decide when a reading list item accepts one edition and when it accepts several | Learn | 1 |
| 18.4 | The matching rule | Cheapest copy at or above the grade floor per item, with a tie-break that prefers fewer shops; explored in the Copy matcher canvas | Learn | 1 |
| 18.5 | Quiz | Predict matcher output for three small cases | Check | 0.5 |
| 18.6 | Reading list API | Create a list, edit items, copy a list a shop has published | Build | 2 |
| 18.7 | Matcher service with unit tests | A pure function over candidate copies, tested on edge cases | Build | 2.5 |
| 18.8 | `POST /reading-lists/:id/match` | Returns the best copy per item and the unmatched items | Build | 1.5 |
| 18.9 | Add all matches to cart | One action adds every matched copy | Build | 1 |
| 18.10 | Reading list page | See matched, unmatched and over-budget items | Build | 1 |
| 18.11 | Checklist | Pass the gate | Gate | 0.5 |

### Module 19: Checkout and orders (Adapt, FM 18)
Purpose: one reading list, several shops, several orders, each copy sold once.
Hours: 9
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 19.1 | One list, three shops | See the split problem with copies | Read | 0.5 |
| 19.2 | The condition snapshot trap | Predict what happens when a shop regrades a copy after the sale | Read | 0.5 |
| 19.3 | What to snapshot | ISBN, title, edition label, grade, defects, price, first photo URL | Learn | 1 |
| 19.4 | Selling a single copy atomically | Change status from available to sold only if it is still available | Learn | 1 |
| 19.5 | Quiz | Check | Check | 0.5 |
| 19.6 | Checkout route split by shop | One order per shop | Build | 1.5 |
| 19.7 | Snapshot order lines | Every line carries its snapshot | Build | 1 |
| 19.8 | Mark copies sold, all or nothing | If any copy is gone, no order is created and earlier changes are undone | Build | 1.5 |
| 19.9 | Shop and student order routes | Each side sees only its orders | Build | 1 |
| 19.10 | Snapshot test and checklist | Regrade and reprice a sold copy; the old order is unchanged | Gate | 0.5 |

### Module 20: Payment processing (Carry, FM 19)
Purpose: Stripe Payment Intents in test mode, gated on a verified webhook.
Hours: 8
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 20.1 | One payment, many orders; test mode | Explain the shared PaymentIntent id and test keys | Learn | 2 |
| 20.2 | Stripe config and intent route | Amount comes from the server cart total | Build | 2 |
| 20.3 | Payment-gated checkout and webhook | Signature verified on the raw body | Build | 2.5 |
| 20.4 | Double submit, test cards and checklist | Orders marked paid once | Gate | 1.5 |

### Module 21: Track orders and collection (Adapt, FM 20)
Purpose: checkout UI, order pages, and pickup at the shop.
Hours: 6
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 21.1 | Set the scene | Students collect books from shops | Read | 0.5 |
| 21.2 | Pickup with a collection code | Explain a short code per order and why it is checked on the server | Learn | 0.5 |
| 21.3 | Payment Element checkout page | Pay with a test card in the browser | Build | 1.5 |
| 21.4 | Order pages for student and shop | Both sides see orders with grade snapshots | Build | 1.5 |
| 21.5 | Ready for collection and collected | The shop marks an order collected only with the right code | Build | 1 |
| 21.6 | Week 3 demo and checklist | Reading list to paid split orders, end to end | Gate | 1 |

### Module 22: Cache and search (Adapt, FM 21)
Purpose: fast offer summaries and two kinds of search.
Hours: 7
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 22.1 | Set the scene | Every edition page runs an aggregation | Read | 0.5 |
| 22.2 | The stale offer trap | A sold copy still shows in a cached summary | Read | 0.5 |
| 22.3 | Exact ISBN lookup vs text search | Choose the right tool for a number and for words | Learn | 1 |
| 22.4 | Quiz | Check | Check | 0.5 |
| 22.5 | Redis and the offer summary cache | Cache per edition with a TTL | Build | 1 |
| 22.6 | Invalidate on listing change | Create, edit, sell and withdraw all clear the right key | Build | 1 |
| 22.7 | One search box | If the input normalises to a valid ISBN, do an exact lookup; otherwise run `$text` on title and authors | Build | 1.5 |
| 22.8 | `explain()`, Redis-down fallback, checklist | Index scan, no crash without Redis | Gate | 1 |

### Module 23: Async jobs and queues (Adapt, FM 22)
Purpose: move slow work off the request, and prepare the listing event the hero needs.
Hours: 7
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 23.1 | Set the scene | What should not happen inside a request | Read | 0.5 |
| 23.2 | The sync trap | Latency and failure coupling | Read | 0.5 |
| 23.3 | When to queue in a bookshop marketplace | Fill in the sync vs async table for this product | Learn | 0.5 |
| 23.4 | Quiz | Check | Check | 0.5 |
| 23.5 | Queue module and worker process | `npm run worker` runs on its own | Build | 1.5 |
| 23.6 | Order jobs after paid checkout | Shop and student notifications leave the request | Build | 1 |
| 23.7 | The `listing.published` event | Publishing or repricing a copy enqueues one job with a stable job id | Build | 1 |
| 23.8 | Retries, backoff and dedup | Attempts and backoff configured and documented | Build | 1 |
| 23.9 | Verify and checklist | The API responds before the worker logs | Gate | 0.5 |

### Module 24: Want-list alerts (New, hero part 2)
Purpose: a standing question that answers itself when the right copy appears.
Hours: 10
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 24.1 | The title nobody has yet | Feel the gap the matcher leaves | Read | 0.5 |
| 24.2 | A standing question vs a one-time search | Explain why the match runs when a copy appears, not when the student asks | Learn | 1 |
| 24.3 | Matching in reverse | Index want entries on their accepted editions (a multikey index) so one copy finds its students quickly | Learn | 1 |
| 24.4 | Exactly one alert per student per copy | Unique index on want entry and listing, plus a stable job id | Learn | 1 |
| 24.5 | Quiz | Check | Check | 0.5 |
| 24.6 | Want-list API | Create from unmatched reading-list items, with grade floor and price ceiling; pause and remove | Build | 1.5 |
| 24.7 | Match processor | The worker finds matching want entries and writes alerts | Build | 2 |
| 24.8 | Alert inbox API and page | Unread count, mark read, link to the copy | Build | 1.5 |
| 24.9 | Worker-down test | Publish a copy with the worker stopped; restart; each alert arrives once | Build | 0.5 |
| 24.10 | Checklist | Pass the gate | Gate | 0.5 |

### Module 25: Deploy (Carry, FM 23)
Purpose: API, worker and client live on HTTPS.
Hours: 8
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 25.1 | VPS vs PaaS; secrets in Git forever | Pick one path and check `git log -- .env` | Learn | 1.5 |
| 25.2 | Production env, build, deploy API and worker | Every variable documented in `.env.example` | Build | 3 |
| 25.3 | Domain, HTTPS and client | Live HTTPS URL | Build | 2 |
| 25.4 | Smoke test, restart survival, checklist | Test checkout and a want-list alert on the live URL | Gate | 1.5 |

### Module 26: Copy holds (Adapt, FM 24 inventory reservations)
Purpose: two students, one last copy.
Hours: 7
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 26.1 | Two students, one last copy | See the race between payment and sale | Read | 0.5 |
| 26.2 | Single copies make holds simpler and harsher | No stock arithmetic, but every conflict is total | Learn | 1 |
| 26.3 | Expiring a hold | Compare a delayed job with a TTL index (the TTL monitor deletes documents and runs about once a minute, so timing is not exact) | Learn | 1 |
| 26.4 | Quiz | Check | Check | 0.5 |
| 26.5 | Hold on checkout start | A held copy returns 409 to the second student | Build | 1.5 |
| 26.6 | Substitute suggestion | The 409 includes the next best copy of the same edition at the same grade or better | Build | 1 |
| 26.7 | Confirm on payment, release on expiry | Webhook confirms; expiry releases without racing a paid order | Build | 1 |
| 26.8 | Two-tab race test and checklist | One success, one 409 with a substitute | Gate | 0.5 |

### Module 27: Condition pricing and markdowns (Adapt, FM 25 promotions and pricing)
Purpose: the server owns every price, including used-copy pricing rules.
Hours: 8
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 27.1 | Server-owned prices | Name the fraud surface | Read | 0.5 |
| 27.2 | Never trust client totals | Trace the trust boundary to Stripe | Learn | 0.5 |
| 27.3 | Grade pricing and markdown schedules | A shop's rule maps grade to a share of a reference price; slow copies drop on a schedule to a floor | Learn | 1 |
| 27.4 | Quiz | Check | Check | 0.5 |
| 27.5 | PricingRule model and suggestion endpoint | The listing form shows a suggested price per grade | Build | 1 |
| 27.6 | Markdown job with a price floor | A repeatable BullMQ job lowers aged copies and never goes below the floor | Build | 1.5 |
| 27.7 | Price change audit and re-match | Every change is logged; a drop re-runs want-list matching | Build | 1.5 |
| 27.8 | PaymentIntent equals server total | Amount checked on the server before payment | Build | 1 |
| 27.9 | Rate limits and checklist | Throttle ISBN lookup and want-list creation | Gate | 0.5 |

### Module 99: Closing and capstone defense (Adapt, FM 99)
Purpose: ship, document, demo, defend.
Hours: 9
| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 99.1 | Ship it | Final checklist and live URL | Build | 2 |
| 99.2 | Document it | ERD, architecture (API, worker, Redis), `DEMO.md`, `CHALLENGES.md` | Build | 2.5 |
| 99.3 | Record the five-minute demo | Demo video following the capstone script | Build | 1.5 |
| 99.4 | Bar-raiser and viva | Answer the defense questions without notes | Gate | 3 |

**Module hours: 199. Buffer: 11. Core total: 210.**

### Stretch path (optional, up to 280 hours)
| # | Stretch lab | Evidence | Hours |
|---|---|---|---|
| S1 | Edition metadata autofill from Open Library, cached in Redis, with manual entry when the network fails | Lookup works offline-tolerant; cache hit logged | 8 |
| S2 | Camera ISBN scan with the browser BarcodeDetector API where supported (support varies by browser, so typed ISBN stays the main path) | Scan on a supported phone; typed fallback elsewhere | 6 |
| S3 | "Also on this course" suggestions from reading-list co-occurrence | Suggestions on the edition page, with the query explained | 8 |
| S4 | Offline-friendly reading list: the last match result readable with no connection (service worker cache) | Airplane-mode screenshot | 10 |
| S5 | Condition dispute at collection with a Stripe test-mode refund | Refund visible in the Stripe test dashboard | 10 |
| S6 | Buyback quotes: a student offers a book to shops and receives grade-based quotes | Quote flow demo | 14 |
| S7 | Price history per edition | Chart from the price change audit | 6 |
| S8 | Alert fan-out load test with 1,000 want entries on one edition | Timing and index evidence | 8 |
| | **Stretch total** | | **70** |

## Gate evidence at a glance

| Module | Gate evidence |
|---|---|
| 1 | Learning log entry; diagnostic result and route |
| 2 | Both apps run; client shows `/health` |
| 3 | `docs/erd-draft.md` with Work, Edition, Listing |
| 4 | Clear failure without MongoDB; no secrets in Git |
| 5 | Seed in Compass; `docs/erd.md`; grade ranks; ISBN worked examples in the learning log |
| 6 | curl transcript; hashed passwords |
| 7 | Both roles sign in; silent refresh |
| 8 | `docs/AUTHORIZATION.md`; cross-shop 403; locked-edition 403 |
| 9 | Second shop rejected; cross-shop PATCH 403 |
| 10 | Shop owner without a shop is redirected |
| 11 | ISBN unit tests pass; concurrent create test ends with one edition |
| 12 | Three copies of one edition listed in three grades with price guidance |
| 13 | Photos in Cloudinary; low-grade copy without photo refused |
| 14 | Query count before and after aggregation |
| 15 | Edition page with copies grouped by grade, readable without colour |
| 16 | Sold copy rejected from cart; user scoping test |
| 17 | Cart survives reload |
| 18 | Matcher unit tests; demo reading list matched with one unmatched item |
| 19 | Snapshot immutability test; all-or-nothing sale test |
| 20 | Test card payment; webhook signature verified; paid once on double submit |
| 21 | Week 3 demo: list to paid split orders to collected |
| 22 | Cache timings; invalidation on sale; `explain()` index scan; ISBN and text search both work |
| 23 | Worker logs after response; job ids documented |
| 24 | Worker-down test: alerts arrive once; unique index shown |
| 25 | Live HTTPS URL; restart survival; live alert |
| 26 | Two-tab race: one success, one 409 with substitute |
| 27 | Server total equals PaymentIntent amount; price audit; markdown triggers re-match |
| 99 | Demo video, docs, viva |

## Capstone

- **What the learner ships:** Hamesh live on HTTPS, with API, worker and client deployed, seeded with three fictional shops, openly licensed textbooks and copies in every grade.
- **Five-minute demo:**
  1. A student imports the shop-published reading list for a first-year biology course and sets a grade floor of Good. The matcher fills three of four titles from two shops and shows one title as unmatched.
  2. The student adds the matches to the cart and saves the unmatched title to the want-list with a price ceiling.
  3. In another window, a shop owner types the missing book's ISBN-10. Hamesh normalises it to ISBN-13, finds the shared edition, and the owner lists a Very Good copy with a photo and a suggested price.
  4. Within seconds the student's alert inbox shows one alert for that copy. The learner republishes the copy to show that no second alert appears.
  5. The student adds the copy, pays with a Stripe test card, and sees two orders with grade snapshots and collection codes. The shop marks one order collected with the code.
  6. Two browser tabs race for the last copy of another edition: one pays, the other gets a 409 with a substitute copy.
- **Defense questions:**
  - Why is Edition shared and not owned by a shop, and who may change it?
  - Why is the grade stored as a number as well as a label?
  - What guarantees one edition per ISBN when two shops create it at the same moment?
  - What happens to want-list alerts if the worker is down when a copy is listed? What if the job runs twice?
  - Why do ISBN-13 numbers that start with 979 have no ISBN-10?
  - What did you snapshot on the order line, and what goes wrong if you skip the grade?
  - Why did you not build recommendations as the main feature?
- **Production requirements:** secrets only in environment variables; webhook signature verified; idempotent checkout and alerts; Redis-down fallback; rate limits on lookup and want-list creation; restart survival for API and worker.

## Variants

This roadmap is one variant of FreshMarket. The sibling rows are as briefed; each sibling's own roadmap holds its data-model delta and capstone.

| Variant | Primary user | Hardest constraint | Hero feature | Data-model delta | Capstone |
|---|---|---|---|---|---|
| FreshMarket (general) | Local grocery vendors and shoppers | Stock quantities and perishables across a split checkout | Multi-vendor cart split with price snapshots | Store, Product with stock, CartItem quantity | Browse to split paid orders, cached search, async jobs |
| **books (this roadmap)** | Students and small bookshops | One edition sold as many separate copies, each graded and priced on its own, matched to the exact edition a course needs | Reading-list matcher with want-list alerts | Work, Edition (shared), Listing (owned copy), ReadingList, WantListEntry, MatchAlert, PricingRule | Reading list matched across shops, live want-list alert, last-copy race |
| services | Freelancers and their clients | The cart holds booked time slots, not stock | Availability and booking | See services roadmap | See services roadmap |
| handmade | Artisans | One-off items and made-to-order requests | Custom order flow | See handmade roadmap | See handmade roadmap |
| home-kitchens | Home cooks and diners | Prep times, order cutoffs, delivery windows | Live order tracking | See home-kitchens roadmap | See home-kitchens roadmap |
| digital-goods | Creators of templates, fonts, ebooks | No shipping, instant delivery after payment | Licensing and signed download links | See digital-goods roadmap | See digital-goods roadmap |

## Out of scope

- **Students selling to students.** Paying private sellers needs connected accounts and payouts, which is a different trust and compliance problem. Shops are the only sellers. Buyback quotes to shops are a stretch lab.
- **Coupons.** FreshMarket's coupon engine is replaced by grade pricing and markdowns, which teach the same trust boundary in this domain.
- **Delivery and shipping rates.** Pickup at the shop with a collection code is the core path.
- **Machine-learning recommendations.** Untestable with seed data and not needed for the outcomes. A simple co-occurrence suggestion is a stretch lab.
- **Ebooks and digital delivery.** That is the digital-goods variant.
- **Real university integrations.** Reading lists are typed or copied inside Hamesh; no university systems are connected.
- **Automatic grading from photos.** The shop owner grades; Hamesh shows the evidence.
- **Live payments.** Stripe stays in test mode for the whole course.

## Open decisions for instructors

| # | Decision | Recommendation | Instructor decision |
|---|---|---|---|
| 1 | Who can publish shared reading lists: students, shops, or both? | Shops publish lists per course code; students create private lists and can copy a shop's list. Avoids moderation work. | |
| 2 | Which condition scale? | Five grades (New, Like New, Very Good, Good, Acceptable) stored as ranks 5 to 1, plus separate defect flags (highlighting, handwriting, water damage, missing access code). | |
| 3 | Where does edition metadata come from? | Manual entry in core; Open Library lookup with cache and manual fallback as stretch S1, because the network is unreliable. | |
| 4 | Should an alert also hold the copy for the alerted student? | No. Alert only; the first student to reach checkout gets the hold. Simpler and easier to explain as fair. | |
| 5 | Who may correct a shared edition once copies exist? | Locked for shops; only the admin role can change it. Shops report errors in a notes field. | |
| 6 | Pickup only, or delivery too? | Pickup at the shop with a collection code in core; delivery out of scope. | |
| 7 | Keep any of FreshMarket's coupon chapters? | No. Module 27 replaces them with grade pricing and markdowns; same trust-boundary outcome. | |
| 8 | Which currency for Stripe test mode? | Integer minor units in code; currency chosen once in config. Instructors pick the currency shown in the demo. | |
| 9 | Hero placement: split across Modules 18 and 24, or one module after async jobs? | Split. The synchronous matcher is demoable in Week 3 even if a learner falls behind on queues. | |

## Confirmation

| Instructor | Role | Decision (approve/revise/reject) | Comments | Date |
|---|---|---|---|---|
| AQIB | Instructor | Approve (reported by course owner) | No changes supplied | Date not supplied |
| ASIF | Instructor | Approve (reported by course owner) | No changes supplied | Date not supplied |
