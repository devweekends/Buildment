---
artifact: research-dossier
course: build-with-ai
amendment: v2
version: 1
status: accepted (orchestrator, 2026-10-25); human review requested in the PR
owner: research (three agents, parts A, B and C)
inputs:
  - v2/00-amendment-brief.md
  - ../research.md (v1 dossier, still in force for v1 topics)
parts:
  - v2/research-part-a.md (fear versus evidence, company behaviour, accountability; A1 to A66)
  - v2/research-part-b.md (why AI gives the common answer, asking several, four engineering cases, growing fast; B1 to B80)
  - v2/research-part-c.md (the toolbelt, voice, CLIs and MCP, cost, critique, content, detectors, commits; C1 to C76)
---

# Research dossier v2: build-with-ai amendment

The v2 dossier has three parts, written by three research agents in parallel from the same pack (`../context-packs/research-v2-G1.md`). Each part holds its findings, "Phrase it this way" notes, a "Do not say" table, "Facts writers may state", a source table with access dates (all checked 2026-10-25), unverified claims and open questions. This file is the index and the gate record. Writers use the parts; they never state a claim a part lists as unverified or under "Do not say".

**Totals:** 222 sourced claims (A 66, B 80, C 76) and 54 unverified items. No em or en dashes.

## Orchestrator spot-check (independent of the research agents)

Fetched again by the orchestrator on 2026-10-25:

| Claim | Result |
|---|---|
| A21: Stanford "Canaries in the Coal Mine?" revised 12 August 2026: employment of 22 to 25 year olds in AI-exposed occupations 19% below trend | Confirmed on the publication page |
| A29: BLS projects 10% growth for software developers, QA analysts and testers, 2025 to 2035, from 1,905,400 jobs | Confirmed on the BLS page |
| B31: Redis licences by version (7.2 and earlier BSD-3; 7.4 to 7.8 RSALv2 or SSPLv1; 8 and later RSALv2, SSPLv1 or AGPLv3) | Confirmed on redis.io |

## Learner and context

As in the v1 dossier. New for v2: most labour evidence is from the US (part A, U16 has no Gaza or regional data), so chapters say "in US data" and never predict one person's future. Several new tools need 18 or older or a paid plan (part C), so every step keeps two tools per job and a no-account fallback.

## Hard constraints that shape the amendment

1. **Contested, fast-moving evidence.** Labour figures, surveys and company statements change every few months. Quiz keys test reading a claim (prediction or measurement, vendor or independent, sample, what "success" means), never recalling a percentage (A, recommendation 7).
2. **Honest harm.** Early-career hiring in AI-exposed fields is down in US payroll data (A21) and software postings are about 21% below February 2020 (A31), while overall displacement is not found (A21, A23, A24). Chapters state both, then move to action.
3. **No neutral benchmarks for the vendor cases.** VictoriaMetrics and Valkey resource and speed numbers are vendor or project claims (B26, B36, B40); every number carries that label.
4. **Access barriers.** Free ElevenLabs cannot clone a voice (C26); Google Cloud's trial needs a payment method (C50); Claude Design is a paid preview (C3). Paid or card-gated steps are optional, with a default path that needs no account.
5. **Agreement is not proof.** Different models often make the same mistake (B15); asking several assistants finds disagreements to check, it does not prove the agreed answer.

## Accepted outline changes (G1 decision)

From part A:
- Module 1 gets three honest layers, not "fear versus hype": the fear is common and partly grounded; much of what feeds it is prediction, marketing and demo language with a mixed record on both sides; the measured pattern is "fewer people doing more", with reversals (A1 to A53).
- A "read the claim" method is taught with worked cases: the March 2025 "90% of code" prediction (A10), Devin (A12, A13), Builder.ai and the myth about it (A14, A15), Just Walk Out (A16), the "95% fail" headline (A51).
- The "top group" is reframed as people who give context, check output, own the result and work in a team, not the fastest or the most senior: studies show novices gain the most speed (A34, A36, A37), expert results are mixed (A38, A39), DORA calls AI an amplifier (A40).
- Accountability cases (Mata v. Avianca A56, Moffatt v. Air Canada A58, the July 2025 database deletion A59 and A60, EU AI Act Article 14 A62) go in the "where humans still win" module.

From part B:
- "Why you get the common answer" uses ranked-word picking (B1), tuning that narrows answers (B5), popularity preference measured for libraries and languages (B6), knowledge cutoffs (B3, B4) and agreement bias (B7 to B9). No temperature lesson: newer models ignore it and chat apps hide it (B2). The lesson is "change the question and the context".
- "Ask several, but not blindly": disagreement shows where to check; agreement does not end the check (B12, B15, B16).
- Four cases, each with a "when each wins" table: time series (Prometheus single node by design, B17, B18; VictoriaMetrics Apache 2.0 with enterprise-only features, B22 to B26), cache (licence timeline as the opening story, B29 to B34; same single command thread with I/O threads, B36, B41; AWS price difference, B38), fastest database by job (B44 to B56, ClickBench as "one benchmark for one kind of query", B55), Outbox (at-least-once, idempotent consumers, alternatives, B57 to B62; reuse the system design course's outbox model, B63).
- Grow fast: GSoC, LFX and Outreachy as time-boxed collaborative programs with a dated rules table (B70 to B74); each program's AI rule (B67, B68) becomes an "explain and edit everything you submit" beat; Hacktoberfest 2026 no longer counts pull requests (B69), so no "four pull requests" advice; public work is "evidence others can check", never a hiring promise (B78).

From part C:
- Toolbelt teaches jobs, not product names; the visuals chapter reflects what changed (C1 to C3, C6, C10, C11) and gives every tool a second option and a no-account fallback.
- Voice cloning is an optional demonstration: own voice only, consent, disclosure, scam and bank voice-ID risk (C25 to C36). The default path records the learner's own voice or labels a stock voice as synthetic.
- CLIs and connectors: GitHub CLI with fine-grained, read-only tokens (C39 to C42); MCP prompt injection through issues and the read-only mode (C43 to C45); cloud cost practice on a supplied sample report, with the facts that budgets do not cap spend, billing read-only exposes invoices and payment details, and Cost Explorer API calls cost money (C46 to C50); secrets: revoke first (C53 to C55).
- Critique: a chat assistant with the diff or draft, every suggestion tested; Copilot code review is not on the Free plan and needs human review (C56 to C58).
- Content: useful and emotionally real content travels, outcomes are unequal and partly luck (C59, C60); platform rules forbid fake engagement (C63 to C65); fake stars help for under two months (C66); a commit graph is weak proof because dates can be set (C67).
- AI detectors are reframed from a threat to a false-accusation risk for second-language writers (C68, C69): the course teaches showing authorship (drafts, notes, real stories, checked facts), never evading detection.
- Commit history: small real steps, and the pull request carries the story on squash-merge projects (C74 to C76).
- Parked: hands-on Remotion, Motion Canvas or OBS labs (laptop installs, no browser path), and LocalStack cost exercises (C52, U16). They may be named as options only.

## Existing course connections (do not repeat)

v1 chapters already cover: privacy before you paste (2.2), jobs not tools (2.3), habits that outlast tools (2.4), learning with AI and its evidence (1.4, module 3), listen then read (3.5), checking packages before install (4.3), the six-month plan and trade-offs (module 5), sharing honestly with an AI-use line (6.2, 6.3). New chapters point to them by their new numbers.

## Open questions for instructors

Collected in the amended roadmap (`../curriculum-roadmap.md`, v2 open decisions), from the three parts: payment access for program stipends from Gaza, under-18 fellows and the 18+ tools, a payment route for one paid month of a voice or design tool, whether own-voice cloning stays at all, who supplies a sample cost report, US-centred labour data, naming disputed company cases, and whether the AI-use line is required for grammar-only help.

## Handoff

G1 accepted by the orchestrator on 2026-10-25 with the changes above. Next: the amended curriculum roadmap (G2A, v2).
