---
artifact: research-dossier-part-b
course: product-sense
version: 1
status: draft
owner: research
sources_checked: 2026-10-25
scope: "PART B: the AI-made look, AI-ish copy, AI design tools, presenting work"
sourced_claim_rows: 82
unverified_claims: 24
hard_constraints:
  - The strongest "AI look" guidance comes from vendors (Anthropic, OpenAI) and one NN/g study. Research measures that tools converge on each other, not that they differ from human designers. Chapters must separate fact from industry opinion.
  - Claude Code is not on the free Claude plan, and Palestine is not confirmed for Stitch, v0, Antigravity or Figma AI. Every tool step needs a web or paper path, and design skills must be taught as a reusable checklist first.
  - AI critique is unreliable for juniors (NN/g) and LLM judges show position and self-preference bias. "Three opinions" is a method for gathering questions, never a verdict.
  - Most popular attention statistics (6 seconds, goldfish, 85% muted) have no usable primary source. Supported figures are narrow and dated.
  - Fellows are on phones with weak, costly data. Video size, captions for muted viewing and free hosting terms are design constraints, not extras.
out_of_scope:
  - Figma or design-tool tours, ranking tools, prompt libraries
  - Video editing, branding, logo design, illustration
  - Resume and LinkedIn wording (course 16)
  - General AI toolbelt (courses 13 and 17)
  - Authorship detection ("is this written by AI?") and AI text detectors
open_questions:
  - Are all fellows 18 or over? Claude, Figma AI and (per a forum reply) Stitch are 18+
  - Is "reviewers do not open GitHub links" fellowship data or an assumption?
  - Which of Stitch, v0, Antigravity and Figma have been tested from Gaza on a phone?
  - Do fellows deploy client or paid projects? Vercel Hobby forbids that
  - May the course paraphrase Anthropic's frontend-design skill? Its licence text was not read
  - May chapters name Stitch and v0 when Palestine access is unconfirmed?
---

# Research dossier, PART B: product-sense (course 18)

This is a decision aid for the curriculum architect and chapter writers of course 18. It covers the AI-made look, AI-ish copy, AI design tools and presenting work. Part A (framing, UI and UX fundamentals) is a separate file.

Format follows course 13. Claims carry a source ID in square brackets, for example [B8]. The source table is near the end. Every source was opened on 2026-10-25 unless the table says "carried over from course 13" or "search excerpt only". Claims marked **UNVERIFIED** must not appear in learner-facing text as fact. Quotes are under 15 words. Company and product names appear because the brief allows naming widely known products and because course 13's sponsor decision names tools as dated examples. Nothing here mocks a company.

## Five findings that should change a naive outline

1. **Teach "default versus choice", not "banned list".** Anthropic's own design skill says its list of AI tells is legitimate for some briefs. Its own words: they are "defaults rather than choices" [B3]. OpenAI's guidance also lists defaults to avoid [B5, B6], yet OpenAI's own older cookbook recommends Inter, Tailwind and shadcn/ui as a starting stack [B7]. So "never use Inter" or "never use a gradient" is wrong. The teachable skill is: can you say why this font, colour or card is right for this product?
2. **The best-known design-skill tool is not free, but the idea is.** Claude Code needs a paid or Console account; the free Claude plan does not include it [B29]. But Skills work on the free claude.ai plan [B30], Codex is listed on OpenAI's Free plan [B34], and Antigravity advertises a free tier [B38, B39]. Age and Palestine access are unclear for several of these. Module 6 should teach the skill file as a portable checklist (a folder with one `SKILL.md` file) [B28, B33, B40] and give a written path that needs no account.
3. **AI critique is a source of questions, not verdicts.** NN/g says AI design critiques are "dangerous because many of its insights are wrong" and that junior staff should probably avoid them [B19]. LLM judges also have position bias and self-preference [B53 to B56]. A panel from different model families beat a single large judge in one study [B55]. So the method is: same screenshot and same rubric to three tools, swap order, then the learner checks each point against a rule or evidence. Evidence of improved outcomes from "three AI opinions" for design was not found (BU12).
4. **The attention statistics in circulation are mostly unsupported.** "Recruiters look for 6 seconds" comes from one vendor eye-tracking study whose 2018 sample size is not stated [B84]. The goldfish "8 seconds" figure traces to a vague source and was rejected by BBC and WSJ reporting [B85]. What is supported: users often leave a page in 10 to 20 seconds, but clear value keeps them (2011 data) [B58]; 57% of viewing time is above the fold (2018, 120 participants) [B59]; portfolio reviewers are often not designers and rarely read closely [B60, B61]. The brief's "10-second skim" is the course's design target, justified by these, not a fact about recruiters.
5. **Hosting and access rules can break a portfolio.** Vercel Hobby is for personal non-commercial use; "receiving payment to create, update, or host the site" counts as commercial [B49]. GitHub Pages is static, needs a public repo on the Free plan, and is not for running a business [B78, B79]. App stores require a demo account when an app has a login [B83], which shows the norm: a reviewer must not hit a login wall. Palestine is not named as restricted on GitHub's trade controls page [B80]; Vercel, Netlify and Cloudflare were not checked for Gaza (BU14).

## Learner and context (short)

Fellows in Gaza, early-career engineers, Arabic first, on phones, weak and costly data, power cuts. Course 13's dossier gives the evidence for connectivity and device use (PCBS and OCHA figures, carried over from course 13). This part adds three design consequences. A demo video must be small and must work with sound off. A case study page must show its result at the top. Every tool step needs a web or paper path. Course 13's ages table applies: Claude 18+, ChatGPT 13+ with permission under 18, Gemini 13+ for personal accounts, GitHub 13+ (carried over from course 13) [B32, B45].

## A. The AI-made look in UI

### A1. What first-party sources say

**Anthropic**
- Anthropic's blog on frontend design and Skills (12 Nov 2025) names an "AI slop" aesthetic. It says models default to safe, common choices. Its prompt advice tells the model to avoid fonts like Arial and Inter, clichéd colour schemes "particularly purple gradients on white backgrounds", and "predictable layouts and component patterns" [B1].
- The Claude cookbook on prompting for frontend aesthetics (21 Oct 2025) says unguided output converges on generic, "on distribution" choices. It gives three levers: steer each design dimension, reference a design source, and name the defaults to avoid [B2].
- The `frontend-design` skill in anthropics/skills (read from the raw file) has a design-plan-then-review process. It lists five clusters of what "AI-generated design right now" looks like: cream background with serif and terracotta accent; near-black with a single acid accent; broadsheet layout with hairlines; "the SaaS-card kit" (identical rounded cards, one radius, the same soft shadow, gradient washes); and template chrome (tracked ALL-CAPS eyebrows, middle-dot meta strings, spaced em dashes in labels, arrows on links) [B3].
- The same file says these are "defaults rather than choices", that the brief always wins, and that the designer should "spend your boldness in one place" [B3]. It names one accent colour as a tell because it is Anthropic's own [B3]. It also calls single-word headline accents, all-caps labels and unnecessary labels above content the "commonest tells" [B3].
- The skill ships as a plugin in the claude-code repository, described as producing interfaces that "avoid generic AI aesthetics" [B4].

**OpenAI**
- OpenAI's developer article on frontends with GPT-5.4 says underspecified prompts make models fall back to high-frequency patterns, giving bland structure and weak hierarchy. It lists defaults to avoid: default font stacks (Inter, Roboto, Arial, system), purple-on-white, more than two typefaces, cards by default, a "Generic SaaS card grid as the first impression", "pill soup", logo clouds, floating dashboards, ornamental icons "that do not improve scanning", decorative gradients, filler copy, and repeated mood statements [B5].
- OpenAI's frontend prompt page (written for GPT-5.5) says: limit dominant purple or purple-blue gradients; "do not add discrete orbs, gradient orbs, or bokeh blobs"; cards at 8px radius or less; no cards inside cards; no visible in-app text that describes the app's own features; build the working app as the first screen, not a landing page, unless needed [B6].
- OpenAI's older GPT-5 frontend cookbook recommends a starting stack of Next.js, Tailwind CSS, shadcn/ui, Radix Themes, and icon sets such as Lucide. It lists Inter among sans-serif font options. It says little about avoiding a generic look [B7].

**Google**
- No Google page on generic AI aesthetics was found. Google's Stitch announcement (18 Mar 2026) describes a design canvas, a design agent, a `DESIGN.md` file for design rules, voice critiques and export to Antigravity. It does not discuss sameness [B42]. The Antigravity skills codelab shows the same `SKILL.md` format [B40]. Treat Google as "no first-party statement found" (BU1).

**Safe to say.** Two major AI vendors publish written lists of "generic" UI patterns and tell their models to avoid them [B1, B3, B5, B6]. The lists overlap on fonts, purple gradients, uniform cards and filler copy.

**People often get wrong.** That the lists prove purple gradients or Inter are bad. The vendors say defaults are fine when chosen [B3]. Also, the lists change by model version and by vendor [B3, B5, B6].

**Phrase it this way.** "Two AI companies publish lists of looks their own tools produce by default. A default is not a sin. It is a choice you did not make. Check each one: did you pick it for this product?"

### A2. Why AI and template UIs look alike

The word itself: Merriam-Webster named "slop" its 2025 word of the year, defined as low-quality digital content produced in quantity by AI [B15]. Chapters may define the term this way and then show what it looks like in a UI. NN/g adds that teams are now cleaning up "generic, unclear" AI output because production is cheaper than evaluation [B16].

Facts with research behind them:
- NN/g tested AI prototyping tools (Bolt, v0, Lovable, Figma Make and others). Without visual specifications, screens tended to "appear flat and interchangeable". NN/g links this to training data and notes tools often default to shadcn and Tailwind. Broad prompts gave very different results, detailed prompts came close to human designs, and even good output had problems with hierarchy, grouping, contrast and spacing [B8].
- An AIES 2026 paper compared 120 interfaces from five generative UI tools on 24 tasks. Tools converged in visual appearance and layout organisation, with more variation in colour [B9]. **Limit:** the authors say there was no human-designed reference, so the result describes convergence among the tools, not distance from human practice [B9]. The same paper found about 25% of the tools' stated design reasons were not implemented in the interface [B9].
- Web design was already converging before AI. A CHI 2021 study (described in the AIES paper) found page layouts grew more similar after 2007, with layout distance down over 30%, linked to shared frameworks such as Bootstrap [B10, secondary]. So sameness is partly a template and framework effect, not only an AI effect.
- A large writing experiment found that access to a generative tool raised individual quality but lowered the variety across people (Doshi and Hauser 2024, as cited in the AIES paper) [B11, secondary]. This is writing, not UI.
- Tailwind's docs ship `indigo` in the default palette and use `bg-indigo-500` in examples [B12]. shadcn/ui says it is "not a component library"; you copy the code into your project, and its default base colour is Neutral with a 0.625rem radius [B13]. These are facts about defaults. They do not prove cause.

Industry opinion, not fact:
- That the purple look exists because Tailwind UI used `indigo-500` for buttons, and that models learned it. This story is widely repeated, including an August 2025 apology post by Tailwind's co-founder. The post was not opened (only secondary write-ups) and no test of the cause was found (BU2).
- That "AI sites all look purple". No measurement of the share of purple outputs was found (BU3).

**Safe to say.** In one study of five tools, same prompt gave similar layouts and looks [B9]. NN/g found AI screens look "flat and interchangeable" without specifics [B8]. Template and framework use made web pages more alike even before AI [B10].

**People often get wrong.** "AI designs are all identical." The study shows convergence among five tools under shared constraints, with colour varying more [B9]. Also "AI caused the sameness". It predates AI [B10].

**Phrase it this way.** "Tools trained on common pages give common answers, and a vague prompt gets the most common answer. The fix is a specific brief, real content, and your own decisions."

### A3. The patterns the brief names: what the sources support

| Pattern | What the sources say | Fact or opinion |
|---|---|---|
| Gradients and glows | Purple gradients on white named as a cliché [B1]; limit dominant purple gradients, no gradient orbs or bokeh blobs [B6]; gradient washes as decoration are part of the "SaaS-card kit" [B3]; decorative gradients behind routine product UI listed as a default to avoid [B5]. "Glow" as a term was not found in the sources (BU4). | Vendor guidance. No measurement of how common. |
| Icons in tinted squares | OpenAI lists "ornamental icons that do not improve scanning" [B5]. The specific "icon in a tinted rounded square" was not named in any source opened (BU5). | Partly vendor guidance. The tinted-square detail is UNVERIFIED. |
| Identical bordered cards and bento grids | "Identical rounded cards", one radius, the same soft shadow [B3]; "Generic SaaS card grid", "dashboard-card mosaics", "thick borders on every region" [B5]; no cards inside cards, 8px radius or less [B6]. "Bento" was not named in the sources opened (BU6). | Vendor guidance. "Bento" is UNVERIFIED. |
| Pill badges and chips everywhere | "Pill soup", "pill clusters", "info chips" [B5]. | Vendor guidance. |
| Emoji headings | Not found in any first-party source opened (BU7). | UNVERIFIED. Practitioner observation only. |
| Template chrome (eyebrow labels, arrows, middle dots, numbered markers 01/02/03) | Named as tells; numbered markers only if the content is a sequence [B3]. | Vendor guidance. |
| Fade-and-slide entrances on every section | "Generic default" that reads as AI-generated; use one orchestrated moment; motion that answers a user's action is fine [B3]. | Vendor guidance. |
| Hero with big number, small label and gradient accent | Called "the default treatment" [B3]. | Vendor guidance. |
| Stock three-feature section with generic copy | Filler copy, repeated mood statements, aspirational hero lines are listed to avoid [B5]. | Vendor guidance. |

**Phrase it this way.** "These are patterns that AI tools often produce by default, according to two AI companies' own guidance. They are not rules of good design. Ask what each element does for the person using the screen."

**Gap for chapter writers.** No source shows how reviewers react to these patterns. The brief's claim that reviewers remember none of ten portfolios is UNVERIFIED (BU8). Frame it as the sponsor's observation.

### A4. Fixes the sources support

- Ground the design in the product's real content and audience, not a generic brief [B3].
- Write a short design plan (colour, type, layout, principles), then review it against the brief for generic defaults before building [B3].
- Constrain before generating: typography, palette, section count, one primary action; give visual references; use real content [B5]. A detailed prompt or an attached design frame gave the best match in NN/g's test [B8].
- Use one family or two clearly distinct families and choose them deliberately [B3].
- Quality floor: responsive to mobile, visible focus, reduced motion respected, accessible colour [B3].
- Copy is design: "Save changes", not "Submit"; errors say what went wrong and how to fix it; empty states invite action [B3].

## B. AI-ish copy

### B1. What the research supports

- **Overused vocabulary, in academic writing.** Kobak and colleagues analysed about 15.1 million PubMed abstracts from 2010 to 2024. They compared 2024 word frequencies with a projection from 2021 and 2022. Style words such as "delves" (ratio 28.0), "underscores" (13.8) and "showcasing" (10.7) rose sharply; 2024 excess style words were mostly verbs (66%) and adjectives (14%). They estimate at least 13.5% of 2024 abstracts were processed with LLMs [B21]. Published in Science Advances (vol 11, no 27, July 2025) per the arXiv record; the arXiv title is "Delving into LLM-assisted writing in biomedical publications through excess vocabulary" [B21].
- **Limits stated by the authors.** The figure is a lower bound, works only at corpus level, cannot identify a single abstract, and cannot tell LLM use from people picking up LLM-style words [B21].
- **Why "delve"?** Juzek and Ward (COLING 2025) found 21 focal words but no evidence that architecture, algorithm or training data explain the overuse; their tests are "consistent with RLHF playing a role" [B22]. Cause is not settled.
- **People adopt the words.** A podcast analysis (737,083 hours) found ChatGPT-preferred words such as "delve" rose abruptly in spontaneous speech, and a preregistered experiment (N = 496) found brief chatbot use led people to adopt the words [B23]. This is a preprint (v4, July 2026).
- **The pattern moves.** After the "delve" list was publicised in early 2024, use of "delve" in arXiv abstracts fell, while "significant" kept rising; the authors suggest authors adapted [B24]. So a word list dates quickly.
- **It is not only vocabulary.** A PNAS 2025 study (Llama 3 and GPT-4o) found instruction-tuned models used present participial clauses at 2 to 5 times the human rate and nominalizations at 1.5 to 2 times. GPT-4o used the agentless passive at about half the human rate [B25]. Limits: written genres tested, prompts and models vary, and the authors say generalising across registers is hard [B25].

### B2. What the sources do not support

- **Hype words.** No study of "seamless", "powerful", "unlock", "elevate" or "revolutionize" in LLM or marketing copy was found (BU9). The nearest evidence is vendor guidance against filler copy, "aspirational hero lines" and "campaign-style language" on product surfaces [B5], and Anthropic's advice to describe what something is or does "in plain terms rather than selling it" [B3].
- **Rule of three.** No peer-reviewed or preprint measurement of triplet overuse in LLM text was found (BU10). Treat it as a widely repeated practitioner observation. A related measured difference is the participial and nominalization rates above [B25].
- **Detecting AI text by words.** All the vocabulary studies work on whole corpora and cannot label one text [B21]. Do not teach readers to "detect" AI writing from a word list.

**Safe to say.** Some words rose sharply in academic writing after LLMs became common [B21]. The words people overuse change over time [B24]. LLM text differs from human text in grammar as well as words [B25].

**People often get wrong.** "Using 'delve' proves AI wrote it." The studies show group-level shifts, and people now say these words too [B23]. Also "AI always writes in threes". Not measured.

**Phrase it this way.** "Studies of scientific papers found that some words became much more common after AI chat tools appeared. Lists like that go out of date fast. So do not hunt for a banned word list. Cut any sentence a stranger could say about a hundred different products. Replace it with something specific: a number you measured, a thing a user did, a thing you gave up."

## C. AI design tools (checked 2026-10-25)

Naming rule (course 13 sponsor decision): tools are examples "at the time of writing (checked 2026-10-25)", two per job, a fallback, web path first, no promised features. This section states what each vendor page says and what it does not say.

### C1. Availability table (short)

| Job | Example tools | Free? | Minimum age | Palestine | Phone / web path | Source |
|---|---|---|---|---|---|---|
| Design skills in a coding agent | Claude Code with the frontend-design plugin | No: needs Pro, Max, Team, Enterprise or Console; free claude.ai plan excluded | 18 | Listed in Anthropic's supported countries | Laptop tool. Web path: Skills on free claude.ai | [B28 to B32] |
| Design skills in a coding agent | OpenAI Codex (skills in `.agents/skills`) | Codex included in ChatGPT Free and Go plans, per OpenAI's pricing page; limits not stated | ChatGPT 13+ with permission under 18 (carried over from course 13) | ChatGPT list had Palestine (course 13, 2026-10-24); could not reopen on 2026-10-25 (HTTP 403) | Desktop app, CLI, IDE; some features web and mobile via plugins | [B33, B34, B35] |
| Design skills in a coding agent (extra) | Google Antigravity (replaced Gemini CLI for unpaid users on 2026-06-18) | "Available at no charge" with weekly rate limits | Not stated on pages opened (BU11) | Not stated (BU11) | macOS, Windows, Linux only | [B37 to B41] |
| Visual and UI generation | Google Stitch | Free status not stated on Google's pages; Labs product | 18+ and English only, per a forum thread (2025), not an official page | Not stated; forum says "over 200 countries" (Oct 2025) | Web | [B42, B43] |
| Visual and UI generation | v0 by Vercel | Free plan with small limits; numbers change | 16+ (Vercel terms) | Not named; terms refer to sanctions generically | Web | [B46 to B48] |
| Visual and UI generation (fallback) | Claude artifacts; Gemini Canvas | Yes on free plans (carried over from course 13, S29 and S14) | Claude 18+; Gemini 13+ | Both listed (Gemini web list reopened; Claude list reopened) | Web | [B31, B44] |
| Visual and UI generation (extra) | Figma Make and Figma agent | Starter plan includes the agent and Make "with limitations" | Figma AI 18+ | Terms mention embargoed places generically; Palestine not named | Web and app | [B50 to B52] |
| AI critique | Three of: Gemini, ChatGPT, Claude, Copilot | Yes on free plans (course 13) | 13+ / 13+ / 18+ / 13+ | Gemini and Claude listed; ChatGPT listed 2026-10-24; Copilot unclear (course 13) | Web | [B31, B44, B35] |

"Unclear" means the vendor pages opened do not say, not that the tool is blocked. Stitch, v0, Antigravity and Figma have no confirmed Palestine entry. Do not tell fellows these tools work in Gaza. Field test needed (open question).

### C2. Findings per tool

**Design skills in coding agents**
- A Claude Code skill is a folder with a `SKILL.md` file; plugins ship skills and namespace them as `/plugin-name:skill-name` [B28]. Codex skills use the same file name, with `name` and `description` frontmatter, scanned from `.agents/skills` [B33]. Antigravity skills also use `SKILL.md`, loaded on demand when the description matches [B40]. So one skill idea carries across three tools. (That the formats are "compatible" in practice was not tested; BU13.)
- Claude Code needs a paid or Console account; the free plan does not include it; Windows 10 1809+ and 4 GB RAM; a supported country [B29]. The platforms listed are desktop operating systems, so it is a laptop tool.
- Skills do work in claude.ai on Free, Pro, Max, Team and Enterprise plans, with code execution on, by uploading a ZIP of the folder under Customize, Skills [B30].
- Codex: OpenAI's pricing page says ChatGPT Work and Codex are included in Free and Go plans; Free is for "quick coding tasks"; some features are limited to specific regions [B34].
- The openai/skills repository is marked deprecated and points to a plugins repository; its curated list (39 folders) has Figma and deploy skills but no frontend-design folder [B36]. OpenAI's frontend guidance lives in its docs and prompts [B5, B6]. OpenAI's article mentions a "frontend-skill"; its location was not found (BU15).
- Gemini CLI says it was replaced by Antigravity CLI on 2026-06-18 for unpaid tier and Google One users [B37]. Antigravity's site: an app, CLI, IDE and SDK, "Available at no charge" [B38]; its plans page gives free users a weekly rate limit and does not state countries or minimum age [B39].
- Anthropic's skill file has no licence text on the page except "Complete terms in LICENSE.txt" [B3]. The licence file was not read. Safer for the course: teach the principles and have fellows write their own checklist (open question).

**Visual and UI generation**
- Stitch: "AI-native software design canvas" with an infinite canvas, a design agent, `DESIGN.md` export and import, voice critiques, prototypes, export to AI Studio and Antigravity [B42]. Google's post does not state price, countries, age or models [B42]. A forum thread says English only, 18+ and "over 200 countries" in 2025; people reported blocks in some countries [B43]. The forum does not label staff, so treat as low confidence.
- v0: "an AI agent that helps anyone create real code and full-stack apps" using Next.js, Tailwind and shadcn/ui, with one-click deploy to Vercel [B46]. This explains why v0 output looks like other shadcn sites [B8, B13]. Free plan has small limits and credits; do not state numbers [B47].
- Figma: Starter (free) includes the Figma agent and Figma Make "with limitations" [B51]. Starter shows AI credits per day and per month [B52]. Figma AI needs 18+ [B50]. NN/g's 2025 update found narrow Figma tools (rename layers, rewrite text, find more like) the most useful, and First Draft produced a generic layout with poor hierarchy [B17].
- NN/g's April 2024 finding of non-deterministic output and generic wireframes is dated; NN/g later updated it [B18, B17]. NN/g's October 2025 test (reviewed August 2026) still found the tools lack the judgment to weigh tradeoffs [B8].

**Safe to say.** Several design tools exist that turn a prompt into a screen. They give a fast first draft that looks like common sites [B8, B46]. Narrow helpers (rename, rewrite, find similar) help more than broad generators, per NN/g's 2025 test [B17].

**People often get wrong.** "A design skill makes AI output good." It makes it less generic if the brief is specific; NN/g still found weak hierarchy and spacing [B8]. Also "the plugin is free". The tool is not [B29].

**Phrase it this way.** "At the time of writing (checked 2026-10-25), one example of a design skill is Anthropic's frontend-design skill. Claude Code, which runs it, needs a paid account. The same idea works as a written checklist in any chat. Check whether each tool opens where you live, at your age."

### C3. Getting several opinions (evidence)

- LLM judges agree with humans over 80% of the time in the MT-Bench study, at about the level humans agree with each other, but show position, verbosity and self-enhancement bias [B53].
- Position bias: changing the order of two answers can flip a judge's ranking; in one test Vicuna-13B beat ChatGPT on 66 of 80 queries when ChatGPT judged. Swapping orders and averaging reduces it (Wang et al., preprint) [B56].
- Self-preference: models such as GPT-4 can recognise their own text and rate it higher than others' text, even when humans rate them equal (preprint) [B54].
- A panel of several smaller models from different families outperformed one large judge on six datasets, showed less intra-model bias, and cost over seven times less (Verga et al., preprint) [B55]. These are tests of scoring text answers, not UI critique.
- For design critique specifically: a CHI 2026 paper built a Figma plugin that gives critique from three expert roles (UX, product, engineering). In two studies with 48 participants in total, it beat a static checker on design quality and experience [B57]. Abstract only was read.
- NN/g warns that AI critiques of screenshots can sound authoritative and be wrong, and that junior staff should probably avoid them [B19]. NN/g's 2026 survey of 521 UX practitioners found time savings were smallest for evaluating designs [B20].
- Course 13 already covers sycophancy and verifying one answer (see its dossier, S93 and S98; not rechecked here). Do not reteach.

**Method the evidence supports (course's inference, label as such).** Use the same screenshot and the same written rubric with three tools from different vendors. Ask for questions and evidence, not a score. Swap the order if comparing two versions. Write down where the tools disagree. For each point, check it against a rule (contrast ratio, a heuristic) or against a person. The learner makes the decision and says why.

**Phrase it this way.** "Ask more than one model, because each model has habits and favourites. Then decide yourself. If a point cannot be checked against a rule or a real user, treat it as a question, not an answer."

## D. Presenting work

### D1. Demo video

- **Sound off is normal on social feeds.** LinkedIn says some feed videos "may play automatically without sound" [B66]. Browsers allow muted autoplay but restrict autoplay with sound: Chrome states muted autoplay is always allowed [B70]; iOS Safari allows muted inline autoplay and blocks sound without a user gesture [B71]. So a demo must make sense muted: on-screen text, large UI, captions.
- **Captions.** WCAG 2.2 success criterion 1.2.2 (Level A) requires captions for prerecorded audio in synchronised media [B65]. Gernsbacher (2015) reviews more than 100 studies that find captions improve comprehension, attention and memory, and help most for non-native-language viewers [B64]. She notes automatic captions still contain errors [B64]. This supports captions for ESL viewers. It does not prove captions raise hiring outcomes.
- **LinkedIn captions.** You attach an SRT file in the desktop upload flow; works on personal accounts and Pages. The help page does not mention automatic captions [B67]. Mobile caption upload was not found (BU16).
- **LinkedIn video limits.** The Pages help page lists 5 GB maximum, 10 minutes maximum, 3 seconds minimum, MP4 among supported formats, and says AVI, QuickTime and MOV are no longer supported [B68]. That page is for company and career Pages. Limits for personal posts were not confirmed from a page that I opened (BU17). Fellows' 60 to 90 second demo is far under any listed limit.
- **Length.** A study of 6.9 million edX video sessions found shorter videos were much more engaging, with median engagement at most 6 minutes regardless of video length [B63]. These are lecture videos for learners, not product demos. So it supports "short", not "90 seconds". The brief's 60 to 90 seconds and "core value in the first 15 seconds" are the course's design targets, supported only by the general finding that users decide fast whether to stay [B58].
- **The first seconds.** Nielsen's 2011 analysis of 205,873 pages found users often leave within 10 to 20 seconds, but pages that make the value clear in the first 10 seconds can hold people for minutes [B58]. Data came from one browser plug-in and describes web pages, not video.

**Safe to say.** Many feeds play video silently, so design the demo to work with sound off [B66, B70, B71]. Captions help viewers, especially in a second language [B64]. Shorter educational videos hold attention better [B63].

**People often get wrong.** "85% of videos are watched without sound." No primary source was found (BU18). "The first 3 seconds decide everything." Not supported (BU19). "Attention spans are 8 seconds." See D6.

**Phrase it this way.** "Many people see your video with the sound off. Show the result in the first moments, put the key words on screen, and add captions. Keep it short enough that a busy reviewer can finish it."

### D2. Free screen recording and file size

| Tool | What the official page says | Source |
|---|---|---|
| Android built-in recorder | Pull down the shade twice, tap Screen record, choose audio and touches before Start. Steps shown for Pixel; "some steps work only on Android 11 and up." Other makers differ (not checked). Saved under Photos, Movies. | [B72] |
| iPhone built-in recorder | Control Center, tap Record, press and hold for microphone; saved to Photos; some apps block recording. | [B73] |
| Windows Snipping Tool | Windows key + Shift + R, choose an area, Start and Stop; edit in Clipchamp. File format not stated on the page. | [B74] |
| OBS Studio | "Free and open source software for video recording and live streaming"; Windows 10 and 11, macOS 13+, Linux; GPL-2.0 or later. | [B75] |
| ScreenToGif | Records an area, exports GIF, APNG or video; MS-PL licence; needs .NET 9 runtime; Windows implied, not stated. | [B76] |
| HandBrake | Free and open-source converter for Windows, macOS, Linux (licence not named on the page). | [B77] |

- **File size on weak data.** No official size per minute was found for the phone recorders (BU20). Arithmetic for the course (not sourced): file size in megabytes is about bitrate in megabits per second times seconds divided by 8. A 90 second video at 2 Mbit/s is about 22 MB; at 5 Mbit/s about 56 MB. The habit to teach: check the file size before upload, compress with a free tool if large, and cut dead time.
- **GIF versus video.** ScreenToGif can export video as well as GIF [B76]. GIFs are not necessarily smaller; no comparison source found (BU21). Do not teach "use a GIF to save data".

### D3. The case study page

- NN/g surveyed 204 UX professionals who hire. They want evidence of value delivered, and they want to see "the messy process", not only polished screens. Advice: three to five detailed case studies; make it scannable; pick top three takeaways. The article gives no duration for review time [B60].
- Reviewers are often not designers: a recruiter new to design or a product manager [B61]. A portfolio must work for them. NN/g gives no review time there either [B61].
- Before and after screens are not enough. State whether the change worked and by how much; capture the starting state before redesigning [B62].
- People spend most viewing time at the top: 57% above the fold, 74% in the first two screens (2018, 120 participants, 130,000 fixations) [B59]. People scroll if they have a reason. So put the result near the top.
- Pages that state their value in 10 seconds keep readers longer [B58].
- NN/g's samples and advice are for UX designers. Engineers are not tested; the principle (non-specialist, short review, show outcomes) is an inference for the course (label it).

**Safe to say.** Hiring managers say they want process and results, not just screenshots [B60, B62]. Reviewers often are not designers [B61]. Top of page gets the most attention [B59].

**People often get wrong.** "Recruiters spend 6 seconds." See D6. "Reviewers read case studies in order." Not supported.

**Phrase it this way.** "Put the result first: what changed and by how much. Then show the problem, your role, the choices you made and what you gave up. Someone who has never seen your project should understand it in about ten seconds."

### D4. LinkedIn Featured and media

- Featured can show posts, articles, external links and uploaded media (images, documents, presentations, videos). You must have already published a post or article to feature it. Removing an item cannot be undone; "Remove from featured" unfeatures without deleting. No maximum number is stated [B69].
- Feed videos autoplay muted unless the user changes settings; mobile users can choose Never, Wi-Fi only, or always [B66].
- LinkedIn minimum age 16 (carried over from course 13).
- Wording of profile text belongs to course 16.

### D5. Instant access for reviewers

- App-store review is the clearest documented norm. Apple's guidelines ask developers to include demo account information if the app has a login, to turn on the back end, and to remove placeholder text and empty websites [B83]. This is analogy, not hiring evidence. It shows that a login wall stops reviewers.
- No hiring or portfolio-review source was found on whether reviewers run deployed apps or click GitHub links (BU8). Present "make it open in one click" as the course's recommendation.
- **GitHub Pages:** public repo required on Free [B79]; published site up to 1 GB; soft limits of 100 GB bandwidth a month and 10 builds an hour; not for online business or SaaS [B78]. It serves static files only (inference from the limits; verify before teaching), so a backend demo needs a mock or recorded fallback.
- **Vercel Hobby:** personal non-commercial use only; paid work or hosting for pay counts as commercial; donations do not [B49]. Minimum age 16 [B48]. A client project on Hobby breaks the terms.
- **Netlify Free:** 300 credits; the pricing page lists no site limit or commercial note [B82]. **Cloudflare Pages Free:** 500 builds a month, 20,000 files per site, 25 MiB per file [B81]. Gaza access for these two was not checked (BU14).
- **GitHub from Gaza:** GitHub's trade controls page names Crimea, the Donetsk and Luhansk separatist areas, Cuba, Iran and North Korea; Palestine, Gaza and West Bank are not mentioned [B80]. Payment or network blocks are separate.
- **Guest access:** give a demo or guest login on the page, or a built-in demo mode, so a reviewer never needs to sign up [B83 analogy].
- **Fallback chain for a dead link:** short video, then screenshots in the case study, then the repository README. A demo that is down must not make the case study useless.

### D6. Attention claims: what is supported

| Claim | Status | Source |
|---|---|---|
| Users often leave pages in 10 to 20 seconds; clear value keeps them (2011) | Supported, dated, one data source | [B58] |
| 57% of viewing time above the fold (2018) | Supported, eye tracking, 120 participants | [B59] |
| Recruiters scan a resume for 6 seconds (7.4 in 2018) | Vendor eye-tracking study; 2018 sample size not stated; critic calls it a weak metric; it is about resumes, not portfolios or demos | [B84] |
| Human attention span 8 seconds, shorter than a goldfish | Not corroborated; traces to a vague source; experts say attention has been stable | [B85] |
| 85% of video watched without sound | No primary source opened | BU18 |
| Shorter videos hold attention; median engagement at most 6 minutes in lecture videos | Supported for lecture videos only | [B63] |

## Failure modes (for near-miss examples)

1. **The demo opens on a login or sign-up screen.** The reviewer leaves before seeing value. Norm: app review requires a demo account [B83]; users decide fast [B58]. Fix: open on the core moment, with guest access.
2. **The result is below the fold.** Attention concentrates at the top [B59]; NN/g wants results, not only screenshots [B62]. Fix: result first.
3. **Autoplay video with sound, or a demo that is unreadable muted.** Browsers block sound autoplay [B70, B71]; LinkedIn feeds play muted [B66]. Fix: on-screen text and captions [B64, B65].
4. **A deployed demo that is paused, over its limit or breaks terms.** Free tiers have limits and rules [B49, B78, B81, B82]. Fix: record a video as backup; use a host whose terms fit the work; check it weekly.
5. **A demo that is a tour, not a story.** Long videos lose viewers [B63]. Fix: one user, one job, one result, 60 to 90 seconds (course target).
6. **Generic copy and placeholder content in the demo.** "Filler copy" and repeated mood statements are on OpenAI's avoid list [B5]; Apple asks to scrub placeholder text [B83]. Fix: real names, real numbers, real data.
7. **Before and after with no result.** NN/g says screens alone are not enough [B62]. Fix: state the change in a measurable way (a task time, an error count from a small check).
8. **Trusting the AI's design story.** Tools gave design reasons that were not implemented about a quarter of the time in one study [B9]. Fix: check each claim in the browser (contrast, keyboard, narrow screen).
9. **File too big for the reviewer's connection or the platform.** Arithmetic in D2. Fix: compress and check size.
10. **Showing a client's or employer's screens without permission.** Brief constraint. Fix: use your own project or the provided one.

## What not to teach (with evidence status)

| Claim or topic | Why not |
|---|---|
| "Recruiters look at your work for 6 seconds" | Resume study by a vendor; sample not stated for 2018; critic says weak metric [B84]. Say "reviewers skim; make the top of the page work". |
| "Human attention span is 8 seconds / less than a goldfish" | Not corroborated [B85]. |
| "85% of video is watched muted" | No primary source (BU18). Say "many feeds start videos muted" [B66]. |
| "The first 3 seconds of a video decide everything" | No source (BU19). |
| "Purple gradients and Inter are bad design" | Vendors say defaults are fine when chosen [B3]. |
| "Tailwind's indigo caused every AI site to be purple" | Popular story; cause untested (BU2). |
| "AI always writes in threes / 'delve' proves AI" | Not measured / group-level only [B21, BU10]. |
| "AI text detectors" or word-list detection | Corpus-level methods cannot label single texts [B21]. |
| "Ask AI to rate your design out of 10" | Judges are biased [B53 to B56]; NN/g warns [B19]. |
| "The best AI design tool is X" | Brief non-goal; access unclear; tools change [B17, B18]. |
| "Free forever" for any tool | Pricing and limits change; Gemini CLI was replaced in 2026 [B37]. |
| Exact free-tier numbers (credits, messages) | Date within weeks [B47, B52]. |
| "Reviewers do not open GitHub links" as a fact | Sponsor observation (BU8). |
| "Recruiters want a case study of 1,500 words" or any set length | No source found (BU22). |
| "Use a GIF to save data" | No source (BU21). |
| Hosting a paid client project on a free personal tier | Vercel terms forbid it [B49]. |

## Facts writers may state

1. Two AI companies publish written lists of generic UI patterns their tools tend to produce [B1, B3, B5, B6].
2. Anthropic's own design skill says those patterns are "defaults rather than choices" [B3].
3. Vague prompts get the most common answer; specific briefs, references and real content help [B5, B8].
4. In one study, five AI UI tools gave similar layouts and looks for the same prompt [B9].
5. NN/g found AI screens "flat and interchangeable" without specific instructions, with weak hierarchy and spacing even when good [B8].
6. Web pages were already getting more alike before AI [B10].
7. Some words became much more common in scientific abstracts after AI chat tools appeared [B21].
8. The overused words change over time as people learn about them [B24].
9. A skill is a folder with a `SKILL.md` file; several coding agents use the same layout [B28, B33, B40].
10. Claude Code needs a paid or Console account; skills in claude.ai are available on the free plan (checked 2026-10-25) [B29, B30].
11. NN/g says AI design critiques can be wrong and sound sure, and that junior staff should probably avoid them [B19].
12. AI judges can favour the first answer and their own output [B54, B56]; a panel from different model families did better than one judge in one study [B55].
13. Many people see feed video with the sound off; LinkedIn plays some feed videos muted [B66].
14. Captions help comprehension, especially for people watching in a second language [B64].
15. Users often leave a page within 10 to 20 seconds unless the value is clear [B58].
16. Most viewing time falls near the top of a page [B59].
17. Hiring managers say they want to see process and results, not only polished screens [B60, B62].
18. Reviewers are often not designers [B61].
19. Vercel's free Hobby plan is for personal, non-commercial use [B49].
20. GitHub Pages needs a public repository on a Free plan and has size and bandwidth soft limits [B78, B79].
21. Android, iPhone and Windows each have a built-in screen recorder [B72, B73, B74]; OBS Studio is free and open source [B75].
22. App stores ask for a demo account when an app has a login [B83].

## Do not say

| Popular claim | Why not | Say instead |
|---|---|---|
| "Recruiters spend 6 seconds on your work." | [B84] | "Reviewers skim, so the top of the page must carry the point." [B59, B61] |
| "People now have shorter attention spans than goldfish." | [B85] | Nothing. Or: "Users often leave a page fast unless the value is clear." [B58] |
| "Never use purple, gradients or Inter." | Vendors call defaults fine when chosen [B3] | "Pick on purpose and be able to say why." |
| "AI wrote it, you can tell by 'delve' or the rule of three." | [B21], BU10 | "Cut anything vague. Be specific." |
| "AI design tools replace designers" / "are useless" | NN/g: useful for ideation, lacks tradeoff judgment [B8, B17] | "A fast first draft, not the final call." |
| "Ask AI to critique your design and follow it." | [B19, B53 to B56] | "Ask three, check each point, decide yourself." |
| "Claude Code is free." | [B29] | "The skill idea is free; the agent needs a paid account." |
| "Stitch / v0 / Figma AI work in Gaza." | Not confirmed | "Check if it opens for you; here is the fallback." |
| "Free hosting is fine for client work." | [B49] | "Check the terms for commercial use." |
| Any invented percentage about video views, drop-off or portfolio success | Brief: no invented statistics | A sourced figure with its limits, or none |

## Source table

Type key (as in course 13): P = primary research, standard or provider's official page; F = first-party writing (company blog, announcement, cookbook, report); S = reputable secondary (university, publication, professional body, or a paper described in another paper); W = forum post, practitioner blog or marketing (orientation only, never sole support). All dates checked: 2026-10-25 unless stated. Where a fetch tool summarised a page, the claim records only what that page text showed. IDs are not contiguous: B14, B26 and B27 were dropped when the source could not be opened.

| ID | Claim | Source | Type | Date checked | Confidence |
|---|---|---|---|---|---|
| B1 | Anthropic blog (12 Nov 2025, Rajasekaran, Wei, Bricken) names an "AI slop" aesthetic; advises avoiding Arial and Inter, purple gradients on white, predictable layouts; skills load on demand. | "Improving frontend design through Skills." https://claude.com/blog/improving-frontend-design-through-skills | F | 2026-10-25 | High |
| B2 | Cookbook (21 Oct 2025): unguided output converges on generic "on distribution" choices; names Inter and similar fonts; three prompting levers. | "Prompting for frontend aesthetics." https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics | F | 2026-10-25 | High |
| B3 | frontend-design SKILL.md: five clusters of AI design tells; "defaults rather than choices"; brief wins; plan then review; single-word accents, all-caps labels, numbered markers, scattered motion as tells; writing guidance (plain terms, specific errors, empty states); licence "in LICENSE.txt" (not read). | anthropics/skills, skills/frontend-design/SKILL.md (raw file). https://raw.githubusercontent.com/anthropics/skills/refs/heads/main/skills/frontend-design/SKILL.md | P | 2026-10-25 | High (file may change) |
| B4 | claude-code plugin README: frontend-design plugin "avoid generic AI aesthetics"; links to the cookbook. | https://github.com/anthropics/claude-code/tree/main/plugins/frontend-design | P | 2026-10-25 | High |
| B5 | OpenAI developer article: underspecified prompts fall back on high-frequency patterns; lists defaults to avoid (Inter/Roboto/Arial/system, purple-on-white, SaaS card grid, pill soup, ornamental icons, filler copy, decorative gradients). No date or author shown in the text read. | "Designing delightful frontends with GPT-5.4." https://developers.openai.com/blog/designing-delightful-frontends-with-gpt-5-4 | F | 2026-10-25 | Medium to high |
| B6 | OpenAI frontend prompt page (GPT-5.5): limit purple gradients; no orbs or bokeh blobs; cards 8px radius or less; no cards in cards; no in-app feature-describing text; app first, not landing page. | https://developers.openai.com/api/docs/guides/frontend-prompt | P | 2026-10-25 | High |
| B7 | OpenAI GPT-5 frontend cookbook recommends Next.js, Tailwind, shadcn/ui, Radix Themes, icon sets, Inter among fonts; does not address generic looks directly. | "Frontend coding with GPT-5." https://developers.openai.com/cookbook/examples/gpt-5/gpt-5_frontend | F | 2026-10-25 | Medium (older page) |
| B8 | NN/g (Wang and Brown, 24 Oct 2025, reviewed 19 Aug 2026): tools tested include Bolt, v0, Lovable, Figma Make; screens "flat and interchangeable"; training data; default to shadcn and Tailwind; detail and attached frames help; problems with hierarchy, contrast, spacing; "good from afar". | "AI Prototyping in Real Design Contexts." https://www.nngroup.com/articles/ai-prototyping/ | S | 2026-10-25 | High |
| B9 | AIES 2026 paper: 120 interfaces, five tools, 24 tasks; convergence in appearance and layout, more variation in colour; about 25% of stated design rationales not implemented; no human reference set. | Imteyaz et al., "Design Theater." https://ojs.aaai.org/index.php/AIES/article/view/43227 (PDF text read) | P | 2026-10-25 | High (for what it measures) |
| B10 | CHI 2021: page layouts grew more similar after 2007, layout distance down over 30%, linked to shared frameworks such as Bootstrap. Read only as described in B9. | Goree et al., "Investigating the Homogenization of Web Design." Cited in B9; ACM page blocked (403). | S | 2026-10-25 | Medium |
| B11 | Writing experiment: generative AI raised individual quality, reduced collective diversity. Read only as described in B9. | Doshi and Hauser (2024), cited in B9. | S | 2026-10-25 | Medium |
| B12 | Tailwind docs: `indigo` in the default palette with 11 steps; `bg-indigo-500` in the dark-mode example; defaults can be overridden. | https://tailwindcss.com/docs/colors | P | 2026-10-25 | High |
| B13 | shadcn/ui: "not a component library", you own the code; default base colour Neutral; default radius 0.625rem; CSS variables recommended. | https://ui.shadcn.com/docs and https://ui.shadcn.com/docs/theming | P | 2026-10-25 | High |
| B15 | Merriam-Webster 2025 word of the year "slop": "digital content of low quality that is produced usually in quantity by means of artificial intelligence." | TechCrunch, 15 Dec 2025. https://techcrunch.com/2025/12/15/merriam-webster-names-slop-the-word-of-the-year/ | S | 2026-10-25 | High |
| B16 | NN/g (Kaley and Budiu, 28 Aug 2026): production is cheaper than UX evaluation; teams clean up generic AI output; does not mention empty or error states. | "The Custodial Era of UX." https://www.nngroup.com/articles/ai-ux-debt/ | S | 2026-10-25 | High |
| B17 | NN/g (Brown, Sponheim, Dykes, 9 May 2025): narrow tools most useful (rename layers, rewrite, find more like, Khroma, Midjourney placeholders); Figma First Draft generic with poor hierarchy. | "AI Design Tools Are Marginally Better." https://www.nngroup.com/articles/ai-design-tools-update-2/ | S | 2026-10-25 | High (tool findings date) |
| B18 | NN/g (Sponheim and Brown, 12 Apr 2024): non-deterministic output; templatized wireframes; page is dated and links to an update. | "AI UX-Design Tools Are Not Ready for Primetime." https://www.nngroup.com/articles/ai-design-tools-not-ready/ | S | 2026-10-25 | Medium (dated) |
| B19 | NN/g (Moran and Nielsen, 3 Nov 2023): AI critiques of screenshots can surface missed points, but "many of its insights are wrong"; junior staff should probably avoid. | "AI for UX: Getting Started." https://www.nngroup.com/articles/ai-ux-getting-started/ | S | 2026-10-25 | High (2023, check currency) |
| B20 | NN/g (Rosala and Banawa, 23 Oct 2026): 521 practitioners, convenience sample; time savings smallest for evaluating designs; output quality the top barrier (54%). | "AI in UX: Work Is Faster, But Practitioners Have Mixed Feelings." https://www.nngroup.com/articles/ai-in-ux-survey-26/ | S | 2026-10-25 | High |
| B21 | Kobak et al.: about 15.1 million PubMed abstracts; excess style words ("delves" ratio 28.0, "underscores" 13.8, "showcasing" 10.7); at least 13.5% of 2024 abstracts processed with LLMs; limits stated. Science Advances 11(27), 2 Jul 2025 per arXiv record. | arXiv:2406.07016 (v5), HTML read. https://arxiv.org/abs/2406.07016 | P | 2026-10-25 | High |
| B22 | Juzek and Ward, COLING 2025: 21 focal words; no evidence for architecture, algorithm or training data; "consistent with RLHF"; exploratory human study. Abstract only. | arXiv:2412.11385. https://arxiv.org/abs/2412.11385 | P | 2026-10-25 | Medium |
| B23 | Yakura et al. preprint (v4, 16 Jul 2026): 737,083 hours of podcasts; ChatGPT-preferred words rose in speech; N = 496 experiment shows adoption. Abstract only; no journal listed. | arXiv:2409.01754. https://arxiv.org/abs/2409.01754 | P | 2026-10-25 | Medium |
| B24 | Geng and Trotta, ACL Findings 2025: words flagged as overused (e.g. "delve") declined after being publicised in early 2024; "significant" kept rising. Abstract only. | https://aclanthology.org/2025.findings-acl.657/ | P | 2026-10-25 | Medium |
| B25 | Reinhart et al., PNAS 122, 2025: instruction-tuned LLMs use present participial clauses 2 to 5 times and nominalizations 1.5 to 2 times the human rate; GPT-4o agentless passive about half; limits on genre. | arXiv:2410.16107 (HTML v2). https://arxiv.org/abs/2410.16107 | P | 2026-10-25 | High |
| B28 | Claude Code skills: folder with `SKILL.md`; stored in personal, project, enterprise or plugin locations; plugin skills namespaced; invoked by name or by description match. | https://code.claude.com/docs/en/skills | P | 2026-10-25 | High |
| B29 | Claude Code needs a Pro, Max, Team, Enterprise or Console account; "the free claude.ai plan does not include Claude Code access"; Windows 10 1809+, 4 GB RAM; location per supported-countries page. | https://code.claude.com/docs/en/setup | P | 2026-10-25 | High |
| B30 | Skills in claude.ai are available on Free, Pro, Max, Team and Enterprise plans (code execution required); custom skills uploaded as a ZIP under Customize, Skills. | Claude Help, "Using skills in Claude." https://support.claude.com/en/articles/12512180-using-skills-in-claude | P | 2026-10-25 | High |
| B31 | Anthropic supported countries include "Palestine"; unlisted places unsupported; page effective date shown as 12 Nov 2026. | https://www.anthropic.com/supported-countries | P | 2026-10-25 | High |
| B32 | Claude requires users to be at least 18. | Claude Help. https://support.claude.com/en/articles/13117299-minimum-age-requirement-access-restriction | P | 2026-10-25 | High |
| B33 | Codex skills: directory with `SKILL.md`, `name` and `description`; scanned from `.agents/skills`; invoked with `$` or by description; no plan or region note. | https://learn.chatgpt.com/docs/build-skills (redirect from developers.openai.com/codex/skills) | P | 2026-10-25 | High |
| B34 | OpenAI pricing page: "ChatGPT Work and Codex are included" in Free, Go, Plus, Pro and other plans; Free for "quick coding tasks"; some features limited to specific regions; no age note. | https://learn.chatgpt.com/docs/pricing | P | 2026-10-25 | Medium (fetch summary) |
| B35 | OpenAI supported-countries page listed Palestine on 2026-10-24 (course 13, S18). Reopen on 2026-10-25 failed with HTTP 403. | Carried over from course 13 dossier. https://help.openai.com/en/articles/7947663-chatgpt-supported-countries | P | 2026-10-24 | High (but not rechecked) |
| B36 | openai/skills repository README says "This repository is deprecated" and points to a plugins repository; curated list has 39 folders (Figma, deploy, security and others), no frontend-design folder. | https://github.com/openai/skills and /tree/main/skills/.curated | P | 2026-10-25 | Medium |
| B37 | Gemini CLI (Apache 2.0) "was replaced by Antigravity CLI on June 18th, 2026" for unpaid tier and Google One users; no free quotas stated. | https://github.com/google-gemini/gemini-cli | P | 2026-10-25 | High |
| B38 | Antigravity: app, CLI, IDE, SDK; "Available at no charge"; macOS, Windows, Linux; no country or age statement. | https://antigravity.google/ | P | 2026-10-25 | Medium (fetch summary) |
| B39 | Antigravity plans: users without Google AI Pro or Ultra get "a weekly rate limit"; no countries or minimum age stated. | https://antigravity.google/docs/plans and /pricing | P | 2026-10-25 | Medium |
| B40 | Antigravity skills codelab: `SKILL.md` with required `description`; global and workspace folders; loaded on demand. | https://codelabs.developers.google.com/getting-started-with-antigravity-skills | P | 2026-10-25 | High |
| B41 | Google One page says an Antigravity section is "Available only to Google AI Pro and Google AI Ultra plan members", and its country list for Google AI Pro did not include Palestine (page truncated when read). Conflicts with B38 on free use. | https://support.google.com/googleone/answer/16105039 | P | 2026-10-25 | Low (truncated; conflict) |
| B42 | Google Labs, Stitch announcement (Rustin Banks, 18 Mar 2026): AI-native design canvas, design agent, `DESIGN.md`, voice critique, prototypes, export to AI Studio and Antigravity; no price, country, age or model statement. | https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-ai-ui-design/ | F | 2026-10-25 | High |
| B43 | Forum thread (2025): 18+ and English only (1 Sep 2025); "over 200 countries" (24 Oct 2025); blocks reported in some countries. Posters not labelled as staff. | Google AI Developers Forum. https://discuss.ai.google.dev/t/sorry-stitch-is-unavailable/87225 | W | 2026-10-25 | Low |
| B44 | Gemini web app country list includes "Palestine"; Arabic supported. | https://support.google.com/gemini/answer/13575153 | P | 2026-10-25 | High |
| B45 | Gemini: 13 or older (or local age) for personal and school accounts; work accounts 18+. | https://support.google.com/gemini/answer/13278668 | P | 2026-10-25 | High |
| B46 | v0 docs: "an AI agent that helps anyone create real code and full-stack apps"; works with Next.js, Tailwind, shadcn/ui; one-click deploy to Vercel. | https://v0.app/docs | P | 2026-10-25 | High |
| B47 | v0 pricing: free plan "for people looking to explore" with a small daily message limit and a $5 credit offer; paid plans credit-based. Numbers change. | https://v0.app/docs/pricing | P | 2026-10-25 | Medium |
| B48 | Vercel terms: users certify they are at least 16; Hobby plan only for personal or non-commercial use; no sanctioned countries named (generic sanctions representation). | https://vercel.com/legal/terms | P | 2026-10-25 | High |
| B49 | Vercel fair use (updated 2026-09-14): Hobby teams restricted to non-commercial personal use; commercial includes "receiving payment to create, update, or host the site"; donations are not commercial; Hobby guideline of 100 GB transfer. | https://vercel.com/docs/limits/fair-use-guidelines | P | 2026-10-25 | High |
| B50 | Figma terms: Figma AI only for people 18 or older; bars use in jurisdictions embargoed by the US government (no places named). | https://www.figma.com/legal/tos/ | P | 2026-10-25 | High |
| B51 | Figma help: AI features include the Figma agent, code layers, Figma Make and single-task tools; the agent is on Starter and above; Make on Starter "with limitations". | Figma Help, "Figma AI features and availability." https://help.figma.com/hc/en-us/articles/23870272542231-Figma-AI-features-and-availability | P | 2026-10-25 | Medium |
| B52 | Figma pricing: Starter free; AI credits per day and per month shown. | https://www.figma.com/pricing/ | P | 2026-10-25 | Medium (numbers change) |
| B53 | Zheng et al., NeurIPS 2023 Datasets and Benchmarks: LLM judges show position, verbosity and self-enhancement bias; GPT-4 agrees with humans over 80%. | arXiv:2306.05685. https://arxiv.org/abs/2306.05685 | P | 2026-10-25 | High |
| B54 | Panickssery, Bowman and Feng: LLM evaluators recognise their own outputs and favour them; self-preference correlates with self-recognition. Preprint, abstract only. | arXiv:2404.13076. https://arxiv.org/abs/2404.13076 | P | 2026-10-25 | Medium |
| B55 | Verga et al.: a panel of diverse smaller models outperformed a single large judge across six datasets, with less intra-model bias and over seven times lower cost. Preprint, abstract only. | arXiv:2404.18796. https://arxiv.org/abs/2404.18796 | P | 2026-10-25 | Medium |
| B56 | Wang et al.: swapping answer order shifts rankings (Vicuna-13B beat ChatGPT on 66 of 80 queries with ChatGPT as judge); balanced-position calibration reduces it. Preprint. | arXiv:2305.17926. https://arxiv.org/abs/2305.17926 | P | 2026-10-25 | Medium |
| B57 | CritiqueCrew (CHI 2026): Figma plugin with UX, product and engineering critic roles; two studies, 48 participants; beat a static checker. Abstract only. | arXiv:2602.01796. https://arxiv.org/abs/2602.01796 | P | 2026-10-25 | Medium |
| B58 | Nielsen (11 Sep 2011): users often leave in 10 to 20 seconds; value proposition within 10 seconds; 205,873 pages from a browser plug-in (Liu, White, Dumais). | "How Long Do Users Stay on Web Pages?" https://www.nngroup.com/articles/how-long-do-users-stay-on-web-pages/ | S | 2026-10-25 | High (dated) |
| B59 | Fessenden (15 Apr 2018): 57% of viewing time above the fold; 74% in first two screenfuls; 120 participants, over 130,000 fixations. | "Scrolling and Attention." https://www.nngroup.com/articles/scrolling-and-attention/ | S | 2026-10-25 | High |
| B60 | Krause (4 Aug 2019): survey of 204 hiring UX professionals; want value and "the messy process"; three to five case studies; scannable; no review time given. | "5 Steps to Creating a UX-Design Portfolio." https://www.nngroup.com/articles/ux-design-portfolios/ | S | 2026-10-25 | High |
| B61 | Chan (16 Jan 2026): portfolios are often reviewed by recruiters or managers who are not designers; no review time or link guidance. | "UX Hiring: Insights from a Design Recruiter." https://www.nngroup.com/articles/ux-hiring-insights/ | S | 2026-10-25 | Medium (podcast summary) |
| B62 | Sunwall (15 Jan 2023): before and after is not enough; state the outcome and how much; capture the starting state first. | "How to Maintain a UX Portfolio Over Time." https://www.nngroup.com/articles/maintain-ux-portfolio/ | S | 2026-10-25 | High |
| B63 | Guo, Kim and Rubin, L@S 2014: 6.9 million edX sessions; shorter videos much more engaging; median engagement at most 6 minutes; applies to lecture videos. | https://dx.doi.org/10.1145/2556325.2566239 (PDF read at MIT CSAIL mirror) | P | 2026-10-25 | High (for MOOC videos) |
| B64 | Gernsbacher (2015), Policy Insights from the Behavioral and Brain Sciences 2(1): over 100 studies show captions improve comprehension, attention and memory; most helpful for non-native-language viewers; automatic captions still have errors. | PDF read. https://doi.org/10.1177/2372732215602130 | P | 2026-10-25 | High (a review by one author; critics narrow the claim) |
| B65 | WCAG 2.2 SC 1.2.2 (Level A): captions for prerecorded audio in synchronised media. | https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html | P | 2026-10-25 | High |
| B66 | LinkedIn Help: some feed videos "may play automatically without sound"; mobile autoplay options: never, Wi-Fi only, mobile data and Wi-Fi. | https://www.linkedin.com/help/linkedin/answer/a565326 | P | 2026-10-25 | High |
| B67 | LinkedIn Help: add captions by attaching an SRT file in the desktop upload flow; works on personal accounts and Pages; no mention of automatic captions. | https://www.linkedin.com/help/linkedin/answer/a552177 | P | 2026-10-25 | High |
| B68 | LinkedIn Pages video specs: 5 GB max, 10 minutes max, 3 seconds min, MP4 supported, AVI/QuickTime/MOV no longer supported. For Pages and Career Pages, not personal posts. | https://www.linkedin.com/help/linkedin/answer/a1311816 | P | 2026-10-25 | High (for Pages) |
| B69 | LinkedIn Help: Featured can hold posts, articles, external links and uploaded media; must have posted first; removal cannot be restored; no maximum stated. | https://www.linkedin.com/help/linkedin/answer/a550399 | P | 2026-10-25 | High (page is old; menus may change) |
| B70 | Chrome autoplay policy: muted autoplay always allowed; sound autoplay needs user interaction, media engagement or installed site. | https://developer.chrome.com/blog/autoplay | P | 2026-10-25 | High (page shows an old update date) |
| B71 | WebKit: muted inline video may autoplay; autoplay with sound needs a user gesture; autoplay starts when visible. | https://webkit.org/blog/6784/new-video-policies-for-ios/ | P | 2026-10-25 | Medium (2016 post) |
| B72 | Google Pixel help: screen recorder in Quick Settings; choose audio and touches before Start; some steps need Android 11+; findable in Photos, Movies. | https://support.google.com/android/answer/9075928 | P | 2026-10-25 | Medium (Pixel only) |
| B73 | Apple Support: Control Center Record button, press and hold for microphone; saved to Photos; some apps block recording. | https://support.apple.com/en-us/102653 | P | 2026-10-25 | High |
| B74 | Microsoft Support: Windows key + Shift + R records an area in Snipping Tool; edit in Clipchamp; file type not stated. | https://support.microsoft.com/en-us/windows/apps/use-snipping-tool-to-capture-screenshots | P | 2026-10-25 | Medium |
| B75 | OBS Studio: "Free and open source" recording and streaming; Windows 10/11, macOS 13+, Linux; GPL-2.0 or later. | https://obsproject.com/ and https://github.com/obsproject/obs-studio | P | 2026-10-25 | High |
| B76 | ScreenToGif: records area, webcam or sketchboard; exports GIF, APNG, video; MS-PL; needs .NET 9 Desktop Runtime; the old domain redirects to another site. | https://github.com/NickeManarin/ScreenToGif | P | 2026-10-25 | Medium |
| B77 | HandBrake: free open-source video converter for Windows, macOS, Linux. | https://handbrake.fr/ | P | 2026-10-25 | Medium |
| B78 | GitHub Pages limits: site up to 1 GB; soft limits of 100 GB a month and 10 builds an hour; not for running an online business or SaaS. | https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits | P | 2026-10-25 | High |
| B79 | GitHub Pages on Free plans requires a public repository. | https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site | P | 2026-10-25 | High |
| B80 | GitHub trade controls page names Crimea, Donetsk and Luhansk separatist areas, Cuba, Iran, North Korea; Palestine, Gaza, West Bank not mentioned. | https://docs.github.com/en/site-policy/other-site-policies/github-and-trade-controls | P | 2026-10-25 | High |
| B81 | Cloudflare Pages limits: 500 builds a month, 20,000 files per site, 25 MiB per asset (Free). | https://developers.cloudflare.com/pages/platform/limits/ | P | 2026-10-25 | Medium (fetch summary) |
| B82 | Netlify pricing: Free plan "300 credit limit"; bandwidth costs 20 credits per GB; no commercial-use note on the page. | https://www.netlify.com/pricing/ | P | 2026-10-25 | Medium |
| B83 | Apple App Review Guidelines 2.1: include demo account info (and turn on the back end) if the app has a login; demo mode if needed; scrub placeholder text and empty websites; crashes are rejected. Used as an analogy only. | https://developer.apple.com/app-store/review/guidelines/ | P | 2026-10-25 | High (as analogy) |
| B84 | The 6 second resume scan: Ladders 2012 study, 7.4 seconds in 2018; critic notes the 2018 report gives no recruiter count, experience or role types; calls the figure weak. | Gygax, ERE.net, 20 Oct 2020. https://www.ere.net/articles/is-the-6-second-resume-scan-a-myth | S | 2026-10-25 | Medium (Ladders report itself not opened) |
| B85 | Goldfish "8 seconds": traced to a 2015 Microsoft Canada report citing Statistic Brain, whose sources could not be verified; experts (Vogel, Posner) say attention has been stable. | WSJ (McGinty, 17 Feb 2017) and BBC (Maybin, 10 Mar 2017), read as text in a university compilation PDF. https://internet.psych.wisc.edu/wp-content/uploads/532-Master/532-UnitPages/Unit-09/Goldfish_MythBusting.pdf | S | 2026-10-25 | Medium to high |

## Unverified claims (do not use as fact in learner-facing text)

| # | Claim | Status | How chapters should phrase it |
|---|---|---|---|
| BU1 | Google has a first-party statement on generic AI-made UI. | None found in Google pages opened [B42]. | Say "Anthropic and OpenAI publish guidance"; do not claim Google does. |
| BU2 | Tailwind UI's `indigo-500` buttons caused the purple AI look (a Tailwind co-founder's August 2025 apology post). | Popular story from secondary write-ups; post not opened; cause untested. [B12] shows indigo is in the defaults. | "One popular story says...", or leave out. |
| BU3 | Most AI-made sites are purple or blue-purple, at some percentage. | One blog percentage had no source. | No number. |
| BU4 | "Glow" effects are an AI tell. | Not in sources opened. | Say "gradients and decorative blobs" [B5, B6]. |
| BU5 | An icon in a tinted rounded square is an AI tell. | Only "ornamental icons" found [B5]. | "Decorative icons that do not help scanning." |
| BU6 | Bento grids are an AI tell. | Not named in sources opened. | "Identical cards and card mosaics" [B3, B5]. |
| BU7 | Emoji headings are an AI tell. | No first-party source. | Practitioner observation; skip or label as such. |
| BU8 | Reviewers who open ten portfolios in a morning remember none; reviewers do not open GitHub links. | No source. NN/g says reviewers rarely read closely and are often non-designers [B60, B61]. | "The sponsor's observation." |
| BU9 | "Seamless", "powerful", "unlock", "elevate", "revolutionize" are measured LLM or hype words. | No study found. Vendor guidance only [B3, B5]. | "Words that could describe any product say nothing." |
| BU10 | LLMs overuse the rule of three. | No measurement found. | Practitioner observation; teach "be specific", not "avoid triplets". |
| BU11 | Antigravity, Stitch, v0 and Figma AI are available in Palestine, and Antigravity's minimum age is 18. | Pages opened do not say; forum posts only. | "Check if it opens for you." |
| BU12 | Asking three AI models improves design outcomes. | Evidence is for scoring text with panels [B55] and one HCI plugin [B57]; none for fellows' screens. | "A method to collect questions, checked by you." |
| BU13 | Claude, Codex and Antigravity skill folders are interchangeable. | All use `SKILL.md`, but not tested together. | "Use the same idea; check each tool's folder rules." |
| BU14 | Vercel, Netlify and Cloudflare Pages are available to users in Gaza. | Not checked. | Offer GitHub Pages first and a video fallback. |
| BU15 | OpenAI has a published "frontend-skill" fellows can install. | Mentioned in an article; not found in the deprecated skills repo [B36]. | Do not name. |
| BU16 | Captions can be added to a LinkedIn video from the mobile app. | Page describes desktop only [B67]. | "On desktop, attach a caption file; or burn captions into the video." |
| BU17 | LinkedIn personal-post video limits are 15 minutes on desktop, 10 on mobile, 5 GB. | Seen in a search excerpt; the page I opened had no video specs. Pages spec is 10 minutes, 5 GB [B68]. | "A 60 to 90 second demo is well under the limits; check the upload page." |
| BU18 | 85% of social video is watched without sound. | No primary source found. | "Many feeds start videos muted." [B66] |
| BU19 | The first 3 seconds decide whether people keep watching. | No source. | "Show the result early." Course target. |
| BU20 | Phone screen recordings produce about N MB per minute. | No official figure found. | Teach the arithmetic and the check-the-size habit. |
| BU21 | GIFs are smaller than video for demos. | No comparison found. | Do not teach. |
| BU22 | A case study should be 500, 1,000 or 1,500 words. | No source. | "Short enough to skim in about ten seconds; detail below." |
| BU23 | Reviewers should see results in ten seconds, as measured for portfolios. | The 10 second figure is for web pages generally [B58], not portfolios. | Call it the course's skim test. |
| BU24 | Claude artifacts and Gemini Canvas remain free and available (course 13 S29, S14). | Carried over from course 13, 2026-10-24; not reopened. | Name as examples with a date. |

**Count:** 24 unverified claims.

## Open questions for the sponsor

1. **Ages.** Are all fellows 18 or over? Claude [B32] and Figma AI [B50] need 18+. A forum reply says Stitch is 18+ [B43]. Vercel needs 16+ [B48].
2. **Field test from Gaza.** Can two fellows test on a phone: Stitch, v0 (web), Claude free skills upload, Figma Starter, GitHub Pages, and a recorder plus upload of a 60 second video? This resolves BU11, BU14, BU16.
3. **Reviewers and links.** Is "reviewers do not open links" fellowship data? If yes, can we cite it as the sponsor's observation? (BU8)
4. **Paid projects.** Will fellows host client or paid work? Vercel Hobby forbids it [B49]. Which host does the course name for a free personal demo?
5. **Skill text.** May the course paraphrase Anthropic's frontend-design skill, or must fellows write their own checklist from the principles? The licence file was not read [B3].
6. **Naming.** Name Stitch and v0 despite no confirmed Palestine entry, or name only the job plus Claude artifacts and Gemini Canvas as fallbacks?
7. **Public demos.** Must the capstone demo and case study be public, or may a fellow show them privately to a mentor?
8. **Real products.** The brief allows naming widely known public products. Which ones for the "study real products" exercises? That is Part A, but the AI-look exercise could reuse them.

## Handoff

```yaml
artifact: research-dossier-part-b
course: product-sense
version: 1
sources_checked: 2026-10-25
sourced_claim_rows: 82
unverified_claims: 24
hard_constraints:
  - AI-look evidence is vendor opinion plus convergence among tools; no human baseline
  - Claude Code is paid; Palestine unconfirmed for Stitch, v0, Antigravity, Figma AI; teach the skill as a portable checklist with a web path
  - AI critique is unreliable for juniors; LLM judges are biased; use three opinions as questions
  - Popular attention statistics are unsupported; use NN/g figures with their limits
  - Weak data: small captioned demos, free hosting terms, guest access
out_of_scope:
  - Tool tours and rankings, video editing, branding, resume wording, AI text detection
open_questions:
  - Ages (18+ tools), field test from Gaza, reviewer-link observation, paid-project hosting, skill text licence, naming of unconfirmed tools, public versus private capstone
top_outline_changes:
  - Teach default versus choice, not a banned list
  - Teach design skills as a portable checklist; Claude Code needs a paid account
  - Treat AI critique as questions; swap order; vary vendors; verify against rules
  - Replace "6 seconds" and similar claims with NN/g figures and the course's own skim test
  - Add hosting terms, guest access and a muted, captioned demo
```
