---
artifact: variant-plan
course: ai-engineering-interview
family: ai-engineering-capstones
version: 1
status: draft
g6_signoff: pending
---

# Capstone projects: eight variants

The sponsor asked on 2026-10-23 for seven or eight solid capstone ideas, each with a plan for what the learner builds. They are the variants of the course family `ai-engineering-capstones` (`server/src/shared/lib/course-tracks.ts`). The course itself stays one shared course: modules 1 to 11 are the same for everyone, and only the capstone (module 12) differs by variant. Learners choose on the course page ("Choose a variant"), or the course assigns one when random assignment is enabled for it (a separate platform change). Chapters show the learner's project through `%%product.name%%`.

Every variant must meet the same must-haves in chapter 12.1: retrieval with citations and an "I don't know" path, one risky tool behind a LangGraph `interrupt()`, the FastAPI service with validation, retries, a timeout and a concurrency limit, a golden set of at least 20 questions, an evaluation report, a regression eval as a test, structured logs, a README, a one-page design note, and tests that pass with the fake model and no API key. What differs is below.

## How the eight differ

| Variant | Users | Risky action (approver) | Hard problem | Extra metric |
|---|---|---|---|---|
| Karmel Help | Shop customers | Refund (staff) | Policy plus live order data in one reply; refund at most once | Mixed-question accuracy; duplicate refunds = 0 |
| Sanabel Desk | Loan officers | Repayment extension (branch manager) | Answer from the policy version in force on a date | Version accuracy on dated questions |
| Nakhla Ops | Engineers | Restart a service (on-call) | Stale runbooks | Share of answers citing the newest page |
| Shifa Desk | Clinic patients | Cancel an appointment (front desk) | Refuse medical advice and hand off | Refusal rate on medical questions = 100% |
| Marj Reports | NGO programme staff | Save a donor update section (programme manager) | Numbers across tables in several reports | Numeric faithfulness: every number traced to a table cell |
| Daris | University students | Deadline extension (instructor) | Arabic and English mixed | Recall@k per language |
| Aqd Check | A freelancer | Send a change request to a client (the freelancer) | Exact quotes, no legal advice | Exact-quote rate; refusal rate on legal-advice questions |
| Rafiq | New hires | Request system access (IT) | Permission-aware retrieval | Leaks of manager-only pages = 0 |

Against the agent-ip uniqueness contract (at least 4 of 6 dimensions differ): the user journey, hardest constraint, data model (documents and tool records), hero feature (the hard problem) and capstone evidence (the extra metric) differ for every pair; identity differs through the product name and accent colour. Specialisations follow the hard problem: retrieval-depth (Sanabel Desk, Marj Reports, Daris), agent-workflows (Karmel Help, Shifa Desk, Rafiq) and llm-operations (Nakhla Ops, Aqd Check).

## Plans

Each plan follows the same five sessions as chapter 12.2 (documents and retrieval; golden set and eval; agent and approval; service and logs; report, README and design note). Time: about 11 hours over a week, as in the roadmap.

### 1. Karmel Help (support agent), slug `shop-support`

- **What it is:** a support agent for Karmel Crafts, a fictional online shop for handmade embroidery, olive wood and ceramics.
- **Documents (6 to 10):** shipping, returns, product care, payments, custom orders, damaged items, gift cards.
- **Tools:** `lookup_order(order_id)` reads a small in-memory order table. `request_refund(order_id, amount)` pauses for staff approval; the amount must not exceed the order total, and a second request for the same order returns the first refund.
- **Golden set outline (20+):** 12 policy questions, 4 mixed questions that need a policy chunk and an order lookup ("my order 2210 arrived cracked, can I get my money back?"), 2 out-of-scope questions, 2 repeated refund requests.
- **How to approach the hard problem:** route mixed questions to retrieval and the tool; keep the refund idempotent by checking the ledger before the pause (chapter 7.6).
- **Defence probes:** How do you know a mixed answer used both sources? What stops a second refund if the reviewer approves twice? What would you change for 1,000 orders a day?
- **Note:** closest to Bustan Books, so learners on it complete two should-haves.

### 2. Sanabel Desk (policy assistant), slug `policy-desk`

- **What it is:** an assistant for loan officers at Sanabel Microfinance, a fictional lender.
- **Documents:** eligibility, fees, grace periods, late payments, required documents, and two versions of one policy (for example a 2024 and a 2026 grace-period policy), each with an effective-from date in its metadata.
- **Tools:** `get_loan(loan_id)` reads a loan's status and start date. `request_repayment_extension(loan_id, days)` pauses for a branch manager; days must be 1 to 60.
- **Golden set outline:** 12 policy questions, 6 dated questions split before and after the change ("for a loan signed in March 2025, what is the grace period?"), 2 out-of-scope questions.
- **How to approach the hard problem:** store `effective_from` and `effective_to` on each chunk and filter by the question's date before ranking (chapter 4.4 metadata filters); cite the version in the answer.
- **Defence probes:** What happens on the day a policy changes? How would you detect that an answer cited a retired version? Why filter instead of letting the model choose?

### 3. Nakhla Ops (runbook bot), slug `runbook-bot`

- **What it is:** a knowledge bot for Nakhla Systems, a fictional remote software team of 15.
- **Documents:** deploy rules, on-call rota, incident process, access requests, two architecture decision records, and one old deploy runbook that a newer page replaces (marked "superseded by").
- **Tools:** `get_service_status(service)` reads a fake status table. `restart_service(service)` pauses for the on-call engineer; only known service names are valid.
- **Golden set outline:** 13 runbook questions, 3 questions where the old and new pages disagree, 2 incident questions that need two documents, 2 out-of-scope questions.
- **How to approach the hard problem:** keep `updated` and `superseded_by` metadata, drop or down-rank superseded chunks, and say when only an old page answers. Chapter 12.3's worked example (Reem) uses this project.
- **Defence probes:** How do you know a runbook is stale if nobody marks it? What do you log so an incident review can see which page the bot used? When should the bot refuse to suggest a restart?

### 4. Shifa Desk (clinic front desk), slug `clinic-desk`

- **What it is:** a front desk assistant for Shifa Clinic, a fictional small clinic. Logistics only.
- **Documents:** opening hours, booking rules, what to bring, fees and payment, cancellation policy, accessibility and directions.
- **Tools:** `find_appointment(reference)` reads a fake booking table. `cancel_appointment(reference)` pauses for front desk staff.
- **Golden set outline:** 13 logistics questions, 5 medical questions that must be refused with a handoff to staff ("should I take two tablets?"), 2 out-of-scope questions.
- **How to approach the hard problem:** classify the question before retrieval (chapter 4.5 routing); a medical question gets a fixed, kind refusal and a handoff, never a model-written answer; test the refusal path in the regression eval.
- **Defence probes:** What if a medical question is phrased as a booking question? How do you keep the refusal kind and useful? Who reviews the refusal log, and how often?
- **Note:** mentors check that no medical content appears in the learner's documents beyond logistics.

### 5. Marj Reports (field reports), slug `field-reports`

- **What it is:** an analyst for Marj Aid, a fictional NGO, over monthly field reports with budget tables by district.
- **Documents:** six to eight monthly reports, each with a short narrative and a budget table (district, line, budget, spent).
- **Tools:** `get_budget_line(project, line)` reads a fake budget table. `save_donor_update(section, text)` pauses for the programme manager before it is saved to a fake shared report.
- **Golden set outline:** 10 single-report questions, 6 multi-hop or sum questions across reports ("total spent on water trucking in the north from January to March"), 2 table-only questions, 2 out-of-scope questions.
- **How to approach the hard problem:** serialise table rows with their headers (chapter 4.4), decompose sum questions into one lookup per report (chapter 4.3), and compute totals in code, not in the model.
- **Defence probes:** Why compute the total in code? How do you check that every number in an answer exists in a table? What breaks if a report changes its table columns?

### 6. Daris (course tutor), slug `course-tutor`

- **What it is:** a tutor for a fictional university course, with notes and rules in Arabic and English.
- **Documents:** syllabus, assessment rules, late-work policy and lecture-note summaries; at least three documents in Arabic and three in English.
- **Tools:** `get_deadline(assignment)` reads a fake deadline table. `request_extension(assignment, days)` pauses for the instructor; days must be 1 to 7.
- **Golden set outline:** 8 English questions, 8 Arabic questions, 4 cross-language questions (an Arabic question whose answer is in an English note, and the reverse).
- **How to approach the hard problem:** the hashing embedder matches words, so cross-language questions fail at first; this is the finding to report. Fixes to try: a small bilingual glossary added to chunks, query translation through the model adapter, or an optional local multilingual embedding model behind the `Embedder` interface. Report recall per language before and after.
- **Defence probes:** Why did cross-language recall start low? What did your fix cost in latency or download size? How would you test a third language?

### 7. Aqd Check (contract review), slug `contract-review`

- **What it is:** an assistant for a freelancer reviewing fictional client contracts. It explains, quotes and drafts; it never gives legal advice.
- **Documents:** three or four short contracts split by clause (payment terms, ownership of work, cancellation, late fees, confidentiality) and a plain guide to common clauses.
- **Tools:** `get_clause(contract, clause_id)` reads a clause exactly. `send_change_request(contract, clause_id, text)` pauses for the freelancer, then writes to a fake outbox; nothing is ever sent for real.
- **Golden set outline:** 12 clause questions, 4 comparison questions across contracts, 4 legal-advice questions that must be refused with a suggestion to ask a lawyer.
- **How to approach the hard problem:** quote clauses by fetching them through `get_clause` rather than letting the model paraphrase; check quotes character by character in the eval; classify legal-advice questions before answering.
- **Defence probes:** How do you prove a quote is exact? Where is the line between explaining a clause and giving legal advice? What stops an injected instruction in a contract from sending an email?

### 8. Rafiq (onboarding buddy), slug `onboarding`

- **What it is:** an onboarding buddy for new hires at a fictional remote company.
- **Documents:** handbook pages on equipment, leave, tools, time zones and who to ask, with two or three pages marked `audience: managers` (for example salary bands or performance reviews).
- **Tools:** `get_ticket_status(ticket)` reads a fake IT ticket table. `request_access(system, level)` pauses for IT; level must be "read" or "write".
- **Golden set outline:** 14 employee questions, 3 employee questions whose only answer is on a manager-only page (the expected answer is "I don't know" with a pointer to a manager), 3 manager questions asked as a manager.
- **How to approach the hard problem:** pass the user's role into retrieval and filter chunks by audience before ranking, never after the model sees them; add a regression test that fails on any leak.
- **Defence probes:** Why filter before retrieval instead of telling the model? How would you test a leak you have not thought of? What happens when a page's audience changes?

## Open decisions

| # | Decision | Recommendation |
|---|---|---|
| 1 | G6: these variant plans need the same instructor confirmation as the roadmap | Confirm with the roadmap at G2B, as one review |
| 2 | Shifa Desk touches health. Is it suitable for the cohort? | Keep it logistics only; mentors reject any medical content in documents or answers |
| 3 | Daris needs Arabic documents; mentors reviewing it need to read Arabic | Assign Daris only where an Arabic-reading mentor is available |
| 4 | Self-select or random assignment | Self-select by default; turn on random assignment per cohort once the platform setting ships |
