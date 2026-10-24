---
artifact: curriculum-roadmap
course: multi-vendor-marketplace-digital-goods
version: 1
status: approved-user-reported
owner: variant-producer
derived_from: multi-vendor-marketplace (FreshMarket)
instructors_reviewed: [AQIB, ASIF]
approval_reported_on: 2026-10-24
approval_date: not supplied
---

# Curriculum roadmap: Midad (digital-goods variant)

## In one paragraph

The learner builds **Midad**, a marketplace where independent creators sell digital goods: font families, design and CV templates, icon packs and short ebooks. A buyer can fill one cart from several creators, pay once in Stripe test mode, and find every item in their library a few seconds later, with a license key and a download button. There is no stock and no shipping. The hard part moves somewhere else: access must be granted exactly once by a verified payment webhook, files must stay private and only leave storage through short-lived links issued by the server, each license carries limits (downloads, seats) that must hold under parallel requests, and a refund must take access away again. By the end, the learner can deploy this system and defend every one of those decisions without notes.

## Learner and entry prerequisites

- **Learner:** fellows in Gaza building tech careers. English is a second language. Many work on phones or shared laptops, with unreliable power and internet. Same audience as FreshMarket.
- **Prior knowledge:** JavaScript fundamentals, HTTP request and response, one CRUD app built before, Git and the command line, basic data modelling. Same as FreshMarket.
- **Time available:** 4 weeks at about 10 hours per day. Core path 210 hours, stretch path up to 246 hours.
- **Entry diagnostic:** the FreshMarket diagnostic, plus two questions: "What is the difference between a URL that is secret and a URL that is signed?" and "Two requests read `remaining: 1` at the same time. What happens next?" Wrong answers route to a short repair page, not a block.

## Outcomes

| # | Outcome (observable verb) | Evidence |
|---|---|---|
| O1 | **Model** a digital catalogue where the public listing and the private deliverable are separate records with separate access rules | `docs/erd.md`; a catalogue API response that contains no private file id or URL |
| O2 | **Enforce** role and object ownership for studios, licenses and seats | `docs/AUTHORIZATION.md`; IDOR tests where buyer B is refused buyer A's download |
| O3 | **Take** one test-mode payment for a multi-creator cart, priced on the server, split into one order per creator | Stripe test dashboard payment; order documents with price, license type and terms version snapshots |
| O4 | **Fulfil** each order line exactly once from a verified Stripe webhook | Replay of the same event that creates no second license; webhook log |
| O5 | **Deliver** private files through expiring links issued by the server, and log every issuance | Expired link that fails; `DownloadGrant` records |
| O6 | **Hold** download limits and seat limits under concurrent requests | Parallel test output: 20 requests, exactly N succeed |
| O7 | **Revoke** access after a full or partial refund, without touching other creators' orders | Refund demo; license verify endpoint answers `revoked` |
| O8 | **Move** side effects off the request path and **reconcile** payments whose webhook was missed | Worker logs; a reconciliation run that fulfils a checkout with a dropped webhook |
| O9 | **Deploy** the API, worker and client, and **defend** the design | Live HTTPS URL; five-minute demo; viva |

## Four-week shape

| Week | Focus | Modules | Hours | Demo at the end |
|---|---|---|---|---|
| 1 | Foundations | 1 to 7 | 51 | Both apps run; creator and buyer can register and log in; seed shows a product with two license options and a private file record |
| 2 | Creator experience | 8 to 15 | 55 | A creator opens a studio, lists a product with public previews and a private file; buyers browse it; the catalogue never exposes the private file |
| 3 | Buy, fulfil, download | 16 to 21 | 48 | A buyer pays once for items from two creators; the webhook fills the library within seconds; downloads work through expiring links |
| 4 | Harden and ship | 22 to 26, 99 | 48 + 8 buffer | Live on HTTPS; limits hold under a parallel test; a refund revokes one creator's license and leaves the other working |
| | **Core total** | | **210** | |

## Module and chapter sequence

Status labels compare each module with FreshMarket:

- **Carry over:** almost unchanged. Same build, new nouns.
- **Adapted:** same skill, but the domain changes the build, the decision or the test.
- **New:** no FreshMarket equivalent, or it replaces a FreshMarket module with different content of the same learning weight.

A "chapter" below is a cluster of sub-chapters in the FreshMarket format (set the scene, learn, check, build steps, checklist). Sub-chapter lists are written at the blueprint stage (G2C), not here.

| # | Module | Status | FreshMarket source | Hours |
|---|---|---|---|---|
| 1 | Introduction | Adapted | 01 | 4 |
| 2 | Project skeleton | Carry over | 02 | 8 |
| 3 | Why MongoDB | Adapted | 03 | 5 |
| 4 | Config and database | Carry over | 04 | 7 |
| 5 | Data model and seed | Adapted (heavy) | 05 | 10 |
| 6 | Authentication API | Carry over | 06 | 9 |
| 7 | Login and registration | Carry over | 07 | 8 |
| 8 | Authorization and isolation | Adapted | 08 | 7 |
| 9 | Creator studio API | Adapted (light) | 09 | 6 |
| 10 | Open your studio | Carry over | 10 | 5 |
| 11 | Products and license options API | Adapted | 11 | 8 |
| 12 | Creator dashboard | Adapted (light) | 12 | 6 |
| 13 | Previews and private files | New | replaces 13 Product photos | 10 |
| 14 | Browse catalogue API | Carry over | 14 | 7 |
| 15 | Shop the marketplace | Adapted | 15 | 6 |
| 16 | Cart API | Adapted | 16 | 6 |
| 17 | Your cart | Adapted (light) | 17 | 5 |
| 18 | Checkout and orders | Adapted | 18 | 8 |
| 19 | Payment processing | Adapted | 19, part of 20 | 9 |
| 20 | Instant fulfilment and license keys | New | replaces 20 Track orders | 10 |
| 21 | Your library and signed downloads | New | none | 10 |
| 22 | Cache and search | Carry over | 21 | 7 |
| 23 | Async jobs and queues | Adapted | 22 | 9 |
| 24 | Deploy | Carry over (plus webhook endpoint) | 23 | 8 |
| 25 | Download limits and seats under concurrency | New | replaces 24 Inventory reservations | 9 |
| 26 | Refunds and revocation | New | none | 9 |
| 99 | Capstone and defence | Adapted | 99 | 6 |
| | Buffer and repair | | | 8 |
| | **Core total** | | | **210** |
| S1 | Pricing: bundles, coupons and license upgrades | Stretch, adapted | replaces 25 Promotions and pricing | 12 |
| S2 | Signed license keys for offline verification | Stretch, new | none | 8 |
| S3 | Storage adapter: S3 presigned URLs | Stretch, new | none | 8 |
| S4 | File updates and versioned downloads | Stretch, new | none | 8 |
| | **Stretch total** | | | **36 (246 overall)** |

Summary: 8 modules carry over, 14 are adapted, 5 are new in the core path. FreshMarket's stock and reservation work (stock decrement in 18, module 24) is replaced by modules 25 and 26, which carry the same skills: a state machine, atomic conditional updates, idempotency, time limits and a concurrency proof.

### Module 1: Introduction (Adapted)
Purpose: show why "send the file after payment" is an engineering problem, and set the working rhythm.
Hours: 4

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 1.1 | What you are building: Midad | Explain in two sentences what Midad does and why instant delivery is harder than it looks | Read | 1 |
| 1.2 | How to use this course | Know the step types, the checklist gate and the learning log | Read | 0.5 |
| 1.3 | The product and its people | Name the three actors: creator, buyer, and Stripe as the system that tells you a payment happened | Read | 1 |
| 1.4 | Scope and the one-line flow | Write the flow: upload, list, buy, library, download, refund; list what is out of scope | Read | 0.5 |
| 1.5 | Prerequisites and entry diagnostic | Take the diagnostic and follow any repair link | Check | 0.5 |
| 1.6 | Working rhythm on unreliable power | Commit after every build step; keep seed files small so they upload on a weak connection | Read | 0.5 |

### Module 2: Project skeleton (Carry over)
Purpose: both apps run and talk to each other.
Hours: 8

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 2.1 | Layer vs module folders | Choose module folders and explain why | Learn | 1.5 |
| 2.2 | Server and health route | `GET /health` returns 200 | Build | 2.5 |
| 2.3 | Client shell and API helper | Vite client loads and reads the API base URL from env | Build | 2.5 |
| 2.4 | Verify end to end | Client shows the health response; checklist passed | Gate | 1.5 |

### Module 3: Why MongoDB (Adapted)
Purpose: choose the data shape for a catalogue whose products carry license options, and learn where files must not go.
Hours: 5

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 3.1 | Relational vs document for a digital catalogue | Compare both for products with license options and orders with snapshots | Learn | 1.5 |
| 3.2 | Embed vs reference in Midad | Decide: license options and seats embedded, files and licenses referenced; note that embedding gives single-document atomicity, used again in Module 25 | Decision | 1.5 |
| 3.3 | Why binaries never live in MongoDB | Explain the 16 MB document limit and why a database is not a file server | Learn | 1 |
| 3.4 | Draft the ERD | Commit `docs/erd-draft.md` | Build | 1 |

### Module 4: Config and database (Carry over)
Purpose: config from env, fail fast, MongoDB connected.
Hours: 7

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 4.1 | Env vs hardcoded | Write `.env.example` with placeholders for MongoDB, Stripe and Cloudinary keys | Learn | 1.5 |
| 4.2 | Config module | Server refuses to start when a required variable is missing | Build | 2 |
| 4.3 | Database module and health | `/health` reports database status | Build | 2 |
| 4.4 | Verify failure and recovery | Stop MongoDB, see a clear error, restart, see recovery; checklist passed | Gate | 1.5 |

### Module 5: Data model and seed (Adapted, heavy)
Purpose: build the two chains every later check walks: ownership (who may edit) and entitlement (who may download).
Hours: 10

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 5.1 | Two chains | Draw User, Studio, Product, ProductFile (ownership) and Buyer, Order, OrderLine, License, DownloadGrant (entitlement) | Learn | 1.5 |
| 5.2 | The trap: "a purchase is a link" | Explain why storing a download URL on the order makes access impossible to limit or revoke | Learn | 1 |
| 5.3 | Users, studios and products | Product with embedded `licenseOptions` (type, price, seat limit, download limit, terms version) | Build | 2 |
| 5.4 | ProductFile | Private, versioned file record with storage id, size and SHA-256 checksum | Build | 1.5 |
| 5.5 | Cart, Checkout and Order | Cart lines of (product, license type); Checkout holds one payment; Orders embed snapshot lines | Build | 1.5 |
| 5.6 | License and DownloadGrant | License with key, status, `downloadsRemaining`, seats; DownloadGrant as an audit record | Build | 1 |
| 5.7 | Seed, inspect and final ERD | Seed two creators, two buyers, products with small generated files; commit `docs/erd.md` | Gate | 1.5 |

### Module 6: Authentication API (Carry over)
Purpose: register, log in, refresh, verify by OTP.
Hours: 9

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 6.1 | Sessions vs JWT and password hashing | Choose JWT and bcrypt and explain why | Learn | 2 |
| 6.2 | Register and login | Roles `creator` and `buyer`; hashed passwords; tokens issued | Build | 3 |
| 6.3 | Refresh tokens and OTP | Hashed refresh token; unverified users cannot log in | Build | 2.5 |
| 6.4 | Auth middleware and curl flow | `requireAuth` returns 401 correctly; full flow tested; checklist passed | Gate | 1.5 |

### Module 7: Login and registration (Carry over)
Purpose: screens for the auth API.
Hours: 8

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 7.1 | Where tokens live and the 401 retry | Access token in memory, refresh in an httpOnly cookie | Learn | 1.5 |
| 7.2 | Register, verify and login pages | Forms work with a creator or buyer role picker | Build | 3 |
| 7.3 | Interceptor and protected routes | Silent refresh on 401; unauthenticated users redirected | Build | 2 |
| 7.4 | Verify both roles | Creator and buyer both log in and land on the right home; checklist passed | Gate | 1.5 |

### Module 8: Authorization and isolation (Adapted)
Purpose: logged in is not the same as allowed. In Midad the most valuable endpoint is the one that hands out files.
Hours: 7

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 8.1 | Three kinds of ownership | Distinguish studio owner, license holder and seat holder | Learn | 1.5 |
| 8.2 | IDOR on downloads | Explain how changing a license id in a request could hand a file to the wrong buyer | Learn | 1 |
| 8.3 | Authorization matrix | Write `docs/AUTHORIZATION.md` including a row for every download and refund action | Build | 1 |
| 8.4 | Role and studio ownership middleware | `requireRole` and `assertStudioOwner` return 403 correctly | Build | 2 |
| 8.5 | License holder check and two-buyer test | `assertLicenseHolder` stub; buyer B gets 403 on buyer A's license; checklist passed | Gate | 1.5 |

### Module 9: Creator studio API (Adapted, light)
Purpose: a creator owns exactly one studio.
Hours: 6

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 9.1 | Studio rules | One studio per creator, unique slug, display name and bio | Learn | 1 |
| 9.2 | Studio routes | Create, read, update with ownership checks | Build | 3 |
| 9.3 | Cross-creator tests | Second studio rejected; creator B gets 403 on creator A's studio; checklist passed | Gate | 2 |

### Module 10: Open your studio (Carry over)
Purpose: onboarding UI for creators.
Hours: 5

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 10.1 | Onboarding flow | A creator without a studio is routed to "Open your studio" | Build | 3 |
| 10.2 | Verify in the browser | Studio created in the UI; product pages blocked until then; checklist passed | Gate | 2 |

### Module 11: Products and license options API (Adapted)
Purpose: a product is sold under license options, not in quantities.
Hours: 8

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 11.1 | License types in plain English | Explain personal (one person, non-commercial use, 1 seat) and commercial (client and paid work, several named seats) | Learn | 1.5 |
| 11.2 | Terms are versioned text | Explain why an order must point to the exact terms version the buyer accepted | Learn | 1 |
| 11.3 | Product routes with license options | CRUD with validation: at least one option, prices in minor units, limits are positive integers | Build | 3 |
| 11.4 | Publish rule, first part | A product cannot be published without a license option (the file rule is added in Module 13) | Build | 1 |
| 11.5 | Isolation tests | Wrong creator gets 403 on every product route; checklist passed | Gate | 1.5 |

### Module 12: Creator dashboard (Adapted, light)
Purpose: creators manage products in the browser.
Hours: 6

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 12.1 | Product table | Products with status and price per license type | Build | 2.5 |
| 12.2 | Product form with license editor | Add, edit and remove license options in one form | Build | 2.5 |
| 12.3 | Verify | Full product management in the browser; checklist passed | Gate | 1 |

### Module 13: Previews and private files (New, replaces Product photos)
Purpose: two kinds of files with opposite rules. Previews are public. Deliverables never get a public URL.
Hours: 10

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 13.1 | Public previews vs private deliverables | State the access rule for each and where each is stored | Learn | 1 |
| 13.2 | How Cloudinary controls access | Explain the `upload`, `private` and `authenticated` delivery types; explain that a signed delivery URL proves the URL was not changed but does not expire by itself; introduce the time-limited download URL the server generates with an `expires_at` time | Learn | 2 |
| 13.3 | Upload previews | Reuse the FreshMarket upload pattern for public preview images | Build | 1.5 |
| 13.4 | Upload deliverables | Upload as `authenticated` raw files from the server; store public id, size and SHA-256 checksum in a new ProductFile version | Build | 2.5 |
| 13.5 | Never leak the private file | Catalogue serializer strips private fields; test that the unsigned delivery URL of a deliverable fails; publish rule now requires a file | Build | 1.5 |
| 13.6 | Week 2 checkpoint | Product with previews and a private file live in the dashboard; checklist passed | Gate | 1.5 |

### Module 14: Browse catalogue API (Carry over)
Purpose: a public, fast, paginated catalogue.
Hours: 7

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 14.1 | Filtering, pagination and N+1 | Explain the N+1 problem with studios and products | Learn | 1.5 |
| 14.2 | Catalogue route | Filter by category, file format, license type and price; paginate | Build | 3 |
| 14.3 | Indexes and the N+1 fix | One query for studio names; indexes for the filters | Build | 1.5 |
| 14.4 | Verify | Pagination and filters tested; checklist passed | Gate | 1 |

### Module 15: Shop the marketplace (Adapted)
Purpose: buyers can compare license options before they buy.
Hours: 6

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 15.1 | Product grid and filters | Grid with format and license filters | Build | 2 |
| 15.2 | Product page | Preview gallery and a license comparison table (what each license allows, seats, downloads, price) | Build | 2.5 |
| 15.3 | Verify | A buyer can find a product and read its license terms; checklist passed | Gate | 1.5 |

### Module 16: Cart API (Adapted)
Purpose: a digital cart has no quantity. A line is a product plus a license type.
Hours: 6

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 16.1 | What a digital cart line is | Explain why quantity is replaced by license type and seats | Learn | 1 |
| 16.2 | Cart rules | One line per product; switching license type replaces the line; a product the buyer already owns under that license is refused | Build | 2.5 |
| 16.3 | Multi-creator cart | Lines from several studios; user scoped | Build | 1.5 |
| 16.4 | Verify | Cart rules tested with curl; checklist passed | Gate | 1 |

### Module 17: Your cart (Adapted, light)
Purpose: cart UI grouped by creator.
Hours: 5

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 17.1 | Cart grouped by creator | Lines show license badge and price | Build | 2.5 |
| 17.2 | Owned items and license switch | "You already own this" message; switch personal to commercial in the cart | Build | 1.5 |
| 17.3 | Verify | Items from two creators visible; checklist passed | Gate | 1 |

### Module 18: Checkout and orders (Adapted)
Purpose: one payment, many creator orders, created before the payment so that the webhook can find them.
Hours: 8

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 18.1 | Orders before payment | Explain why orders start as `pending_payment` and why a Checkout record ties one payment to many orders | Learn | 1.5 |
| 18.2 | The snapshot trap | Snapshot price, license type, seat limit, download limit and terms version on each line | Learn | 1 |
| 18.3 | Checkout route | Re-price on the server, group by studio, create one Checkout and one Order per studio | Build | 2.5 |
| 18.4 | Snapshot lines and the immutability test | Change a price after checkout; the old order does not change | Build | 1.5 |
| 18.5 | Order routes | Creator sees own orders; buyer sees own orders; checklist passed | Gate | 1.5 |

### Module 19: Payment processing (Adapted)
Purpose: Stripe test mode, and the webhook as the only proof of payment.
Hours: 9

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 19.1 | Test mode and Payment Intents | Explain test keys, test cards, and why a browser redirect is not proof of payment | Learn | 1.5 |
| 19.2 | How webhooks behave | Explain signatures, the raw body requirement, retries, duplicate deliveries and events that arrive out of order | Learn | 1.5 |
| 19.3 | PaymentIntent route | Amount taken from the Checkout, never from the client; `metadata.checkoutId`; idempotency key | Build | 2 |
| 19.4 | Webhook route | `express.raw` on this route only; signature check; event log; tested with the Stripe CLI (`stripe listen`, `stripe trigger`) | Build | 2.5 |
| 19.5 | Checkout page with the Payment Element | Pay with a success test card and a decline test card; checklist passed | Gate | 1.5 |

### Module 20: Instant fulfilment and license keys (New, hero part 1)
Purpose: the webhook, not the browser, grants access, exactly once per order line.
Hours: 10

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 20.1 | What "instant" really means | Trace the path from `payment_intent.succeeded` to a license in the library | Learn | 1 |
| 20.2 | Fulfil exactly once | Explain idempotency at the effect (a unique index on `orderLineId`) and why marking the event processed before the work succeeds can lose a fulfilment | Learn | 1.5 |
| 20.3 | Decision: fulfil inside the webhook or in a queue | Choose: database writes inline so access is instant, emails and notices queued; name the cost of each option | Decision | 1 |
| 20.4 | License key generator | Keys from `crypto.randomBytes`, written in a readable alphabet without look-alike characters, with a unique index and a retry on collision | Build | 1.5 |
| 20.5 | `fulfilCheckout(checkoutId)` | Orders move `pending_payment` to `paid` to `fulfilled`; one License per line; safe to call twice | Build | 2.5 |
| 20.6 | Success page | "Preparing your files" screen polls the order until licenses exist; clear message if it takes too long | Build | 1.5 |
| 20.7 | Replay test | Resend the same event; license count does not change; checklist passed | Gate | 1 |

### Module 21: Your library and signed downloads (New, hero part 2)
Purpose: files leave storage only through short-lived links the server issues after checking the license.
Hours: 10

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 21.1 | How a time-limited link works | Explain that the link carries an expiry and a signature made with a secret only the server holds, and that anyone holding the link can use it until it expires | Learn | 1.5 |
| 21.2 | Decision: redirect to storage or stream through the API | Choose redirect for cost and speed; name what you give up (you count issued links, not finished downloads) | Decision | 1 |
| 21.3 | Library API and page | Licenses grouped by creator, with key, license type and a copy button | Build | 2 |
| 21.4 | The download endpoint | `POST /licenses/:id/downloads`: holder check, status check, then a link with a short expiry (default 5 minutes) and a DownloadGrant record; explain why this is POST and not GET | Build | 2.5 |
| 21.5 | Creator sales page | Orders, licenses issued and download counts for the creator's own products only | Build | 1.5 |
| 21.6 | Week 3 demo | Pay, see the library fill, download, then show an expired link failing; checklist passed | Gate | 1.5 |

### Module 22: Cache and search (Carry over)
Purpose: cache the catalogue; never cache access.
Hours: 7

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 22.1 | What to cache and what never to cache | Catalogue yes; licenses, library and download responses never | Learn | 1.5 |
| 22.2 | Redis catalogue cache | Cache with invalidation on product change | Build | 2.5 |
| 22.3 | Text search | Search titles, tags and creator names on an index | Build | 2 |
| 22.4 | Verify | Invalidation and index use proven; checklist passed | Gate | 1 |

### Module 23: Async jobs and queues (Adapted)
Purpose: keep the webhook fast, and catch payments whose webhook never arrived.
Hours: 9

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 23.1 | What leaves the webhook | Decide which work is queued and which must stay inline | Learn | 1 |
| 23.2 | BullMQ worker | Separate worker process on the same Redis | Build | 1.5 |
| 23.3 | Receipt job | Email (console mock) with a library link and license keys, never a signed file link | Build | 1.5 |
| 23.4 | Creator sale notice | Each creator is told only about their own order | Build | 1 |
| 23.5 | Reconciliation job | A repeatable job finds succeeded PaymentIntents whose checkout is still unfulfilled and calls the same `fulfilCheckout` | Build | 2 |
| 23.6 | Cleanup, retries and proof | Cancel abandoned checkouts; attempts, backoff, `jobId` dedup; drop a webhook on purpose and watch reconciliation fix it; checklist passed | Gate | 2 |

### Module 24: Deploy (Carry over, plus webhook endpoint)
Purpose: a live URL with API, worker and client.
Hours: 8

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 24.1 | Production config | Secrets only in the host's env; test-mode keys only | Learn | 1 |
| 24.2 | Deploy API, worker and client | All three run on HTTPS | Build | 3 |
| 24.3 | Production webhook endpoint | Register the live URL in the Stripe dashboard (test mode); use that endpoint's own signing secret, not the CLI secret | Build | 1.5 |
| 24.4 | Smoke test and restart | Pay, fulfil and download on the live URL; API and worker survive a restart; checklist passed | Gate | 2.5 |

### Module 25: Download limits and seats under concurrency (New, replaces Inventory reservations)
Purpose: the stock moved from the product to the license. Prove the limits hold when requests race.
Hours: 9

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 25.1 | The stock moved | Explain why `downloadsRemaining` on a license plays the role `stockQty` played in FreshMarket | Learn | 1 |
| 25.2 | Check-then-act | Predict how many of 20 parallel requests succeed with a read-then-write handler, then see it | Learn | 1 |
| 25.3 | Atomic conditional decrement | One `findOneAndUpdate` with the limit in the filter; clear error when the limit is reached | Build | 1.5 |
| 25.4 | Seat assignment | Commercial seats as an embedded array; assign with one conditional `$push` that checks size and duplicates; explain why embedding makes this atomic without a transaction | Build | 2 |
| 25.5 | Duplicate webhooks in parallel | Two deliveries of the same event at once: the unique index turns the second insert into a safe no-op | Build | 1 |
| 25.6 | Parallel test and evidence | Script fires parallel requests at downloads, seats and the webhook; exactly the allowed number succeed; evidence committed; checklist passed | Gate | 2.5 |

### Module 26: Refunds and revocation (New)
Purpose: access granted by a payment must be withdrawn when the payment is refunded, even in a split payment.
Hours: 9

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 26.1 | Refunds in a split payment | Explain a partial refund of one PaymentIntent that covers one creator's order only | Learn | 1.5 |
| 26.2 | Decision: when access ends | Choose between revoking when the refund is requested and when Stripe confirms it; explain the window in which an already-issued link still works, and how the link expiry bounds it (candidate canvas: revocation window) | Decision | 1 |
| 26.3 | Creator refund route | Ownership check; Refund record; Stripe refund with order metadata and an idempotency key | Build | 2 |
| 26.4 | Refund webhook and order states | `charge.refunded` revokes the licenses of that order; Order states `fulfilled`, `partially_refunded`, `refunded`; a refund that arrives before fulfilment blocks fulfilment | Build | 2 |
| 26.5 | License verify endpoint | `POST /licenses/verify`, rate limited, answers status only and never buyer details | Build | 1.5 |
| 26.6 | Proof | Refund creator A's order: A's license is revoked, B's still works, an old link expires, verify says `revoked`; checklist passed | Gate | 1 |

### Module 99: Capstone and defence (Adapted)
Purpose: ship, document and defend.
Hours: 6

| # | Chapter | One-line outcome | Type | Hours |
|---|---|---|---|---|
| 99.1 | Ship it | README, `.env.example`, architecture diagram, fulfilment state diagram | Build | 2 |
| 99.2 | Document the access model | `docs/download-security.md`: threats (shared links, id guessing, refunded buyers, leaked keys) and the control for each | Build | 2 |
| 99.3 | Demo and viva | Record the five-minute demo; practise the defense questions | Gate | 2 |

### Stretch modules (optional, after Module 99 or alongside Week 4)

| # | Module | One-line outcome | Hours |
|---|---|---|---|
| S1 | Pricing: bundles, coupons and license upgrades | Server-side pricing engine for bundles and coupons; upgrade personal to commercial by paying the difference; idempotent redemptions (adapted from FreshMarket 25) | 12 |
| S2 | Signed license keys for offline verification | Sign the license payload with an Ed25519 private key so an app can verify it with the public key; explain why revocation then needs a list, the same problem as JWT revocation | 8 |
| S3 | Storage adapter: S3 presigned URLs | Put storage behind one interface and add an S3 adapter using `GetObject` presigned URLs; compare with Cloudinary | 8 |
| S4 | File updates and versioned downloads | Creators upload a new version; buyers get the latest by default; notify buyers through the queue | 8 |

## Gate evidence at a glance

| Module | Gate evidence |
|---|---|
| 1 | Learning log: product in two sentences, one-line flow, out-of-scope list |
| 2 | Screenshot: client shows health response |
| 3 | `docs/erd-draft.md` with embed and reference choices explained |
| 4 | Fail-fast log on missing env; `/health` with database status |
| 5 | Seed output; `docs/erd.md` showing both chains |
| 6 | curl transcript: register, verify, login, protected route |
| 7 | Both roles log in through the UI |
| 8 | `docs/AUTHORIZATION.md`; two-buyer IDOR test returns 403 |
| 9 | Cross-creator 403 test |
| 10 | Storeless creator routed to onboarding |
| 11 | Product isolation tests; license option validation tests |
| 12 | Product created and edited fully in the browser |
| 13 | Catalogue JSON with no private fields; unsigned deliverable URL fails |
| 14 | Paginated filtered catalogue; query count shows N+1 fixed |
| 15 | Product page with license comparison |
| 16 | curl: already-owned line refused; license switch replaces line |
| 17 | Cart UI with two creators |
| 18 | Snapshot immutability test |
| 19 | Stripe CLI log of a verified webhook; decline card handled |
| 20 | Replay test: same event twice, one license per line |
| 21 | Week 3 demo; expired link fails; DownloadGrant records |
| 22 | Cache hit and invalidation log; search uses index |
| 23 | Worker logs; reconciliation fixes a dropped webhook |
| 24 | Live HTTPS URL; paid order fulfilled on production |
| 25 | Parallel test output for downloads, seats and duplicate webhooks |
| 26 | Partial refund demo; verify endpoint says `revoked` |
| 99 | Demo video; `docs/download-security.md`; viva |

## Capstone

- **What the learner ships:** Midad live on HTTPS. Creators open studios, list products with public previews, private files and personal and commercial license options. Buyers pay once for items from several creators in Stripe test mode, get licenses and keys from the webhook within seconds, and download through expiring links. Limits hold under parallel requests. A refund revokes the right licenses and no others.
- **Five-minute demo:**
  1. (0:00) Creator view: a product with two license options and a private file. Show the public catalogue JSON: no private file id, no URL.
  2. (1:00) Buyer view: cart with items from two creators, one payment with a test card.
  3. (1:45) Show the webhook delivery (Stripe CLI or dashboard) and the library filling on the success page.
  4. (2:30) Download a file. Copy the link, wait past its expiry, show it fails. Ask for a new link from the library: it works and the remaining count drops.
  5. (3:15) Run the parallel script: 20 download requests on a license with 3 remaining; exactly 3 links are issued.
  6. (4:00) Creator A refunds their order. A's license is revoked, the verify endpoint says `revoked`, creator B's license still downloads.
  7. (4:40) Resend the original payment event. No new license appears.
- **Defense questions:**
  1. Why is the webhook, and not the success page, the thing that grants access?
  2. Stripe sends the same event twice at the same moment. Walk through what your code does.
  3. A buyer shares a download link in a group chat. What can the people in the chat do, and for how long?
  4. Why can a refund not take back a link you already issued? What did you choose to limit the damage?
  5. Why is the download endpoint a POST?
  6. Your download count counts issued links, not finished downloads. Defend that, or explain what you would change.
  7. Why does embedding seats in the license make seat assignment safe without a transaction?
  8. One payment covered two creators. How did you refund only one?
  9. What happens if your server is down when the payment succeeds?
- **Production requirements:** secrets only in env; test-mode keys only; webhook signature verified on every request; private files never reachable without a server-issued link; download, refund and verify routes rate limited; API and worker survive restart; every gate evidence item linked from the README.

## Variants

| Variant | Primary user | Hardest constraint | Hero feature | Data-model delta | Capstone |
|---|---|---|---|---|---|
| FreshMarket (general) | Local grocery vendors and shoppers | Stock under concurrent checkout, perishable items | Multi-vendor cart split into per-vendor orders | Product with `stockQty`, StockReservation | Two-store checkout, reservations under concurrency |
| services | Freelancers (tutors, designers, electricians) and clients | The cart holds booked time slots, not stock | Availability and booking | Defined in its own roadmap | Defined in its own roadmap |
| handmade | Artisans and buyers of one-off or made-to-order items | One-off items and made-to-order requests | Custom order flow | Defined in its own roadmap | Defined in its own roadmap |
| home-kitchens | Home cooks and diners | Prep times, order cutoffs, delivery windows | Live order tracking | Defined in its own roadmap | Defined in its own roadmap |
| **digital-goods (Midad)** | Independent creators of fonts, templates and ebooks, and their buyers | Instant, exactly-once access granted by a verified webhook, limited by license, withdrawn on refund, delivered through links that cannot be recalled once issued | Licensing and signed download links | Product split into listing and private versioned ProductFile; License (entitlement) with key, limits and seats; DownloadGrant; Refund; Checkout; cart line keyed by license type with no quantity; no stock | Webhook fills library, expired link fails, limits hold under parallel requests, partial refund revokes one creator's license |
| books | Students and small bookshops | Condition grades and used-item pricing | Search and recommendations | Defined in its own roadmap | Defined in its own roadmap |

## Out of scope

- **DRM, watermarking and piracy prevention.** A buyer who downloads a file can copy it. The course teaches access control, not copy control, and says so plainly. PDF stamping is named as a possible extension.
- **Subscriptions and recurring billing.** One-time purchases only.
- **Payouts to creators (Stripe Connect), tax and VAT on digital goods.** Real and important, but a separate course. The platform holds test payments only.
- **Real legal license drafting.** The sample terms are short, plain and clearly marked as course samples, not legal advice.
- **Disputes and chargebacks.** Named in Module 26 as a case the same revocation path could handle, not built.
- **Video streaming and very large files.** Seed files stay small for learners on weak connections.
- **Live (non-test) payments.** Test mode only, as in FreshMarket.

## Technical claims to verify before chapters are written

The technical validator confirms these against current docs and the course's pinned versions:

1. Cloudinary: behaviour of `authenticated` raw uploads; `cloudinary.utils.private_download_url` with `expires_at` for time-limited downloads; that plain signed delivery URLs do not expire; which plans include token-based expiring delivery URLs; whether the "allow delivery of PDF and ZIP files" security setting affects this flow on a free account; the raw file size limit on the plan learners will use.
2. Stripe: the refund event set for the pinned API version (`charge.refunded` and the `refund.*` events); whether the Charge in the event payload includes its refunds list or needs a separate call; webhook retry behaviour in test mode; Stripe CLI commands used in Modules 19 and 20.
3. BullMQ: the current API for repeatable jobs (job schedulers) used in Module 23.
4. MongoDB: `$expr` with `$size` inside a `findOneAndUpdate` filter for the seat assignment in Module 25.
5. S3 (stretch only): presigned `GetObject` URL expiry limits for the credential type used.

## Open decisions for instructors

| # | Decision | Recommendation | Instructor decision |
|---|---|---|---|
| 1 | Private file storage in the core path: Cloudinary (authenticated delivery and time-limited download URLs) or AWS S3 (presigned URLs) | Cloudinary in core. It is already in the FreshMarket stack and needs no new account. An AWS account needs a payment card at sign-up, which many fellows may not have. S3 stays as stretch S3, behind the same storage interface. | |
| 2 | Default link lifetime and what counts as one download | 5 minutes; count each issued link, not each finished download, and make the learner defend it. Streaming through the API to count bytes is named and rejected for cost. | |
| 3 | How license keys are stored | Store the random key as is, with a unique index, and show it only to the license holder behind auth. A key proves a purchase, not an identity, and buyers must be able to see it again. Hashing with show-once is discussed as the alternative. | |
| 4 | When access ends on refund: on request or on Stripe confirmation | Block new links as soon as the refund is requested; mark licenses `revoked` when the refund webhook confirms. | |
| 5 | Should the success page also trigger fulfilment (server retrieves the PaymentIntent and fulfils if it succeeded), as Stripe's fulfilment guide suggests for Checkout | Core: webhook only, success page polls; the reconciliation job in Module 23 covers missed webhooks. Mention the two-path pattern in the decision chapter. One writer is easier for beginners to reason about. | |
| 6 | Seats for commercial licenses in core or stretch | Core, in Module 25. It is the clearest lesson in "embedding buys atomicity" and costs about 2 hours. | |
| 7 | Who may refund | The creator, for their own order only. No admin role in core, to keep the role model the same as FreshMarket. | |
| 8 | Seed deliverables | Generated placeholder files (a small generated PDF, a ZIP with a README), not real fonts or ebooks, so no third-party license is involved and uploads work on a weak connection. | |
| 9 | Spelling | Use "license" in prose and code alike, so learners do not meet two spellings of one word. | |

## Confirmation

| Instructor | Role | Decision (approve/revise/reject) | Comments | Date |
|---|---|---|---|---|
| AQIB | Instructor | Approve (reported by course owner) | No changes supplied | Date not supplied |
| ASIF | Instructor | Approve (reported by course owner) | No changes supplied | Date not supplied |
