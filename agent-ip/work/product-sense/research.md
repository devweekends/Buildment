---
artifact: research-dossier
course: product-sense
version: 1
status: accepted (G1), 2026-10-25, with the outline changes below
owner: research
sources_checked: 2026-10-25
parts:
  - research-part-a.md (product thinking, UI, UX, taste; sources A1 to A90)
  - research-part-b.md (the AI-made look, AI design tools, presenting work; sources B1 to B85)
hard_constraints:
  - Phones and weak data: demos must work muted and small; every tool step needs a web or paper path; pages need a weight budget
  - Arabic first: direction in markup and logical CSS; no sourced Arabic typography numbers, so a native-reader check is a course rule
  - Standards have levels: WCAG 2.2 AA is the course bar, AAA items are extras
  - Tools and access change monthly; several design tools have no confirmed Palestine entry; Claude Code is paid
  - Taste must be taught as criteria and evidence; the top level of the scale is judgment, never a graded key
out_of_scope:
  - Figma or any design tool taught as a tour; CSS or framework teaching beyond small examples
  - Resume, LinkedIn and blog wording (course 16); interview technique (course 14); the general AI toolbelt (courses 13 and 17)
  - User research at scale (analytics platforms, A/B statistics); HEART as a dashboard
  - Attention statistics without sources (6 seconds, goldfish, 85% muted, first 3 seconds)
  - AI text detection by word lists
open_questions:
  - Are all fellows 18 or over? (Claude 18+, Figma AI 18+, Stitch reportedly 18+, v0 16+, ChatGPT 13+ with permission)
  - Can two fellows test Stitch, v0, a claude.ai skills upload, Figma Starter, GitHub Pages and a video upload on a phone from Gaza before publish?
  - Must the capstone demo and case study be public, or may a fellow show them privately to a mentor?
  - Who gives a native-reader review of Arabic typography advice?
  - May chapters name public products beyond GOV.UK? (Only GOV.UK was opened and dated.)
  - Will fellows host client or paid work? Vercel Hobby forbids it.
---

# Research dossier: product-sense (course 18)

The dossier is in two parts, written by two research agents working from primary sources on 2026-10-25:

- **Part A** (`research-part-a.md`): product thinking (jobs to be done, Shape Up appetite and scope hammering, Goals Signals Metrics from HEART, small user checks), UI (hierarchy, typography, spacing, colour and contrast, touch targets, dark mode), UX (Nielsen's heuristics, response times and loading, empty and error states, forms, accessibility, mobile first, motion, onboarding, Core Web Vitals, right-to-left), taste (critique against objectives, why defaults look generic, the course's four-level scale), a myth table and a "Do not say" list. 86 sourced rows, 19 unverified items.
- **Part B** (`research-part-b.md`): the AI-made look (Anthropic's and OpenAI's own lists of generic defaults, NN/g and AIES 2026 on convergence), AI-ish copy (Kobak et al. and follow-ups), AI design tools with availability and ages, getting several opinions (LLM-judge bias), presenting work (muted video, captions, case study pages, LinkedIn Featured, instant access and hosting terms), a "Facts writers may state" list and a "Do not say" table. 82 sourced rows, 24 unverified items.

Source IDs keep their part prefix (A or B). Writers cite them in `GoDeeper` source folds as, for example, "WCAG 2.2, 1.4.3 [A1]".

## G1 review (curriculum architect, 2026-10-25)

Accepted. Every claim a chapter will make has a source row or an explicit "course's own" label. Spot checks by the orchestrator: the contrast arithmetic (#767676 on white 4.54:1, #777777 4.48:1, #999999 2.85:1) recomputed from the WCAG formula and matches; WCAG 2.5.8 is AA at 24 CSS px and 2.5.5 is AAA at 44; the Shape Up "fixed time, variable scope" wording and the NN/g five-user conditions read as the dossier states them.

## Outline changes accepted from G1

1. **Default versus choice, not a banned list** (B finding 1). Module 5 teaches "a default is a choice you did not make" and asks the learner to give a reason for every element. Gradients, Inter and cards are never called wrong in themselves.
2. **Name the patterns as vendor guidance.** Gradients and glows, uniform cards, pill clusters, ornamental icons and template chrome are taught as patterns two AI companies' own guidance lists as defaults [B1, B3, B5, B6]. "Icons in tinted squares", "bento" and "emoji headings" are shown as examples of decorative defaults without claiming a vendor list names them (BU5 to BU7).
3. **Copy: no banned word list.** The vocabulary research is about academic writing and dates fast [B21, B24]. The rule taught is "cut any sentence a stranger could say about a hundred products; replace it with something specific". The rule of three and hype words are practitioner observations (BU9, BU10).
4. **AI critique gives questions, not verdicts** (B finding 3). Module 6's method: the same screenshot and rubric to three tools from different vendors, swap the order when comparing, then check every point against a rule or a person. The method is labelled the course's inference.
5. **Tools.** Claude Code is paid [B29], so the design-skill idea is taught as a portable `SKILL.md` checklist that also works in any chat. Two tools per job, dated 2026-10-25, with fallbacks (Claude artifacts, Gemini Canvas, a paper checklist). Stitch, v0, Figma and Antigravity have no confirmed Palestine entry: chapters say "check if it opens for you" and never claim they work in Gaza.
6. **Standards with levels.** WCAG 2.2 AA is the course bar; AAA items appear as "go further". Touch targets: aim for 44 to 48, the AA floor is 24 with spacing [A4, A16, A38, A39]. "Large text" is 18 pt or 14 pt bold [A1].
7. **Evidence labels.** Each rule's fold says whether it is a standard, research, a heuristic or practice (A, evidence labels).
8. **Onboarding.** Teach empty states and contextual help before tours [A22, A62]. "Aha moment" is a goal a team chooses, not a finding [A73].
9. **Success measures.** Teach a scaled-down Goals, Signals, Metrics habit (one goal, one observable signal, counted in a 3 to 5 person check), labelled as an adaptation of HEART [A30]; no dashboards.
10. **Small checks have conditions.** Five users find most big problems of one group per round, then iterate [A20]; the five-second test measures first impression on simple screens [A71]. Both find problems; neither proves a design is good.
11. **A myths beat in module 4** (taste): 3-click rule, Miller's seven for menus, golden ratio, blue means trust, thumb-zone maps, F-pattern as a goal, "users don't scroll" [A53 to A59, A68]. Judging a claim's evidence is part of taste.
12. **Presenting work.** Demos are designed to work with the sound off and captioned [B64 to B66, B70, B71]; the result goes at the top of a case study [B59, B60, B62]; the 10-second skim and the 60 to 90 second demo are the course's targets, not facts about recruiters; instant access means a guest login or demo mode with a fallback chain (video, screenshots, README); hosting terms are checked (Vercel Hobby non-commercial, GitHub Pages public repository) [B49, B78, B79].
13. **No attention statistics** without sources (6 seconds, goldfish, 85% muted, first 3 seconds) (B, D6).
14. **Fictional products for examples.** Chapters use the course's fictional products (Halaqa, Wasel and others). GOV.UK is the one real public example with documented reasons [A74, A75]. Learners study real products of their own choosing in module 4 and date what they see.
15. **Arabic first.** Direction in markup and logical CSS properties [A78, A79]; Arabic typography advice is "check with a native reader on a real phone" (course rule, no source).
16. **Weight budget.** A page weight budget is a course habit; the HTTP Archive median is context, never a "safe for Gaza" number [A48].
