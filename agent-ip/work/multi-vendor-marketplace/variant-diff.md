---
artifact: variant-set
course: multi-vendor-marketplace
version: 1
status: draft
owner: variant-producer
instructors_reviewed: []
---

# Variant set: multi-vendor marketplace

FreshMarket (`courses/multi-vendor-marketplace/`) is the general course. These five variants keep its spine and outcomes and change the product. Each variant has its own roadmap and diff in `variants/<slug>/`. Nothing here is a chapter: **no variant chapter is written until instructors confirm that variant's roadmap.**

The personalization layer (brand style, project name, wordmark, accent) is separate and does not count toward uniqueness: see [`personalization-layer.md`](personalization-layer.md). Platform work for both is in [`platform-needs.md`](platform-needs.md).

## The five variants

| Variant | Product | Primary user | Hardest constraint | Hero feature | Main data-model change |
|---|---|---|---|---|---|
| `services` | **SkillSlot** | Clients booking tutors, designers, electricians | No overlapping bookings on one provider's calendar under concurrent checkout, correct across two time zones and daylight saving | Availability and booking: slot engine, two-zone picker, atomic holds, reschedule as one swap | Product becomes Service; new AvailabilityRule, TimeOff, SlotClaim, Booking |
| `handmade` | **Ghurza** (working name, "stitch") | Buyers commissioning tatreez, olive wood and ceramics | Made to order: sold before it exists, through a weeks-long, two-party, two-payment workflow with honest lead times | Custom order flow: request, versioned quote, deposit, progress photos, approval, balance, shipping | Piece with hold instead of stock; Artisan credit; new CustomRequest, Quote, ProductionUpdate |
| `home-kitchens` | **Sufra** | Diners ordering from home cooks for a delivery window | Cooking capacity per kitchen per window in load units, with per-dish cutoffs in the kitchen's time zone | Live order tracking that survives weak connections (SSE with resume, polling fallback) | Kitchen with time zone and schedule; Dish without stock; DeliveryWindow; CapacityClaim |
| `digital-goods` | **Midad** | Buyers of creators' fonts, templates, ebooks | Access granted exactly once by a verified webhook, limited by license, withdrawn on refund; a link cannot be recalled once issued | Licensing and expiring signed download links | Product without stock with license options; new ProductFile, License, DownloadGrant, Refund |
| `books` | **Hamesh** ("margin") | Students and small bookshops | One edition, many separately graded and priced copies; exact edition matching by ISBN | Reading-list matcher with want-list alerts | Product splits into Work, Edition (shared, ISBN) and Listing (one copy); new ReadingList, WantListEntry, MatchAlert |

## Uniqueness

The contract asks for at least four of six dimensions to differ from the general course and from every other variant.

| | FreshMarket | services | handmade | home-kitchens | digital-goods | books |
|---|---|---|---|---|---|---|
| services | 6 | | 6 | 5 to 6 | 6 | 6 |
| handmade | 6 | 6 | | 6 | 6 | 6 |
| home-kitchens | 6 (5 strict) | 5 to 6 | 6 | | 6 | 6 |
| digital-goods | 6 | 6 | 6 | 6 | | 6 |
| books | 6 | 6 | 6 | 6 | 6 | |

Every pair passes. The closest pair is services and home-kitchens: both are about time, schedules and time zones. They stay apart because services locks exclusive time for one person and supports rescheduling, while home-kitchens fills a shared capacity pool and closes slow dishes earlier. Recheck this pair at the variant gate if either draft changes.

## What the producers changed from the candidates

| Variant | Candidate | Changed to | Why |
|---|---|---|---|
| services | Cart holds booked slots | Cart holds requested slots; holds start at checkout for 10 minutes | Idle carts would block a provider's calendar |
| handmade | One-off items and made-to-order | Hardest constraint is made-to-order; sell-once is shared spine | Single-copy holds overlapped with books |
| home-kitchens | Prep times, cutoffs, delivery windows; live tracking | Capacity per window with per-dish cutoffs; tracking that survives dropped connections | Windows alone overlapped with services; plain status updates repeat FreshMarket |
| digital-goods | No shipping, instant delivery | Access granted once, limited by license, revoked on refund | "No shipping" names an absence, not a constraint |
| books | Search and recommendations | Reading-list matcher with want-list alerts | Search repeats FreshMarket module 21; recommendations cannot be shown with seed data |

## Collisions resolved across variants

- **Alerts belong to books.** Handmade has no "notify me when available" feature; a sold piece offers "Request something similar" instead.
- **Signed links belong to digital goods.** Handmade serves buyer reference photos through an authorized listing, not signed URLs.
- **Identity.** Books and digital goods both proposed "paper and ink". Books keeps it; digital goods moved to a creator's studio look (dark workspace, monospace keys, one electric accent).
- **Canvas names.** Services renamed its canvas to "Your time, their time" because home-kitchens already uses "Two clocks".

## Decisions to make once for all variants

These came up in more than one variant. Deciding them once keeps the family consistent.

1. **Transactions or compensating release.** Services recommends a MongoDB replica set so transactions are always available; home-kitchens recommends compensating release. Recommendation: run a single-node replica set in local Docker for every variant and teach transactions, with compensating release as the alternative discussed.
2. **Hold length at checkout.** Services and handmade both use about 10 to 15 minutes. Recommendation: one default (15 minutes) for the family.
3. **Currency for Stripe test mode.** Every variant asks. Recommendation: one currency for the whole cohort.
4. **Promotions and coupons.** Kept in core by services; moved to stretch or dropped by home-kitchens, digital goods, books and handmade. Recommendation: stretch for every variant except services.
5. **Facts to verify before chapters.** Each roadmap lists technical claims made from memory (for example Cloudinary private download URLs, Stripe refund events, card authorization windows, BullMQ job schedulers). The technical validator checks them at G5, before any chapter depends on them.

## Follow-up specialization courses

Each variant's hardest constraint becomes the natural next course for fellows who finish it.

| Variant | Follow-up course |
|---|---|
| services | Scheduling systems in depth: recurring bookings, exceptions and calendar sync |
| handmade | Long-running orders: state machines, sagas and money over weeks |
| home-kitchens | Real-time scheduling and delivery systems |
| digital-goods | Entitlements engineering: who may use what, for how long |
| books | Catalogue identity and standing matches at scale |

## Confirmation

Each variant roadmap needs at least two instructors before its chapters are written.

| Variant | Instructor | Decision (approve/revise/reject) | Comments | Date |
|---|---|---|---|---|
| services | | | | |
| handmade | | | | |
| home-kitchens | | | | |
| digital-goods | | | | |
| books | | | | |
