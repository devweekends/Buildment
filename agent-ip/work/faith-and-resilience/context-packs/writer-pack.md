---
artifact: context-pack
course: faith-and-resilience
for: chapter-writer
version: 1
---

# Writer pack: Steady Hearts: Islamic Belief for Uncertain Times

Read this whole file before writing. It replaces the chapter briefs for this course (G2C was skipped on the sponsor's instruction; see `../decision-log.md`). The plan is `courses/faith-and-resilience/course.yaml`: write exactly the files, titles and goals listed there for your modules. The roadmap is `../curriculum-roadmap.md` (minutes, outcomes, gate evidence, canvases). The research dossier is `../research.md`: **every verse, hadith, story and scholarly statement must come from the dossier, with the reference and wording it gives**; never use anything it marks weak, unverified or "do not use". Look at `courses/cause-and-effect/04-root-causes/` (`04.01`, `04.05`, `04.06`, `04.07`) for the exact file format of a scene, a teaching chapter with a canvas, a quiz chapter and a gate, and at `courses/cause-and-effect/08-learning-from-what-went-wrong/08.04-capstone-investigate-a-problem.md` for a capstone. Skim `agent-ip/03-authoring-standards.md` (voice, plain English, hardship with care, forbidden patterns) and `agent-ip/04-interactive-playbook.md` (budgets, option-length hygiene, quiz and predict rules).

## 1. What this course is

A practical course on Islamic belief for people living with uncertainty. It teaches what the Quran and the Sunnah say about the unseen, qadr, tawakkul, sabr, shukr, hope, decisions, intention, good work, failure, community and care, and it always turns belief into a next step the learner can take this week. The learners are believers; the course deepens and applies what they already hold. It is not a fiqh course and not a theology debate.

- Open every chapter with a concrete case from a fellow's life (study, freelance work, a job search, family), never with a definition or a sermon.
- Teach the belief from its sources (verse or hadith with its reference), explain what it means in plain words, then show it working in a full worked example with real reasoning, then show the common misunderstanding and how to spot it.
- **Belief is always paired with action.** Every teaching chapter ends with something the learner does, not only something they feel.
- Wrong answers are welcome; every option is explained kindly.

## 2. Learner and voice

- Gaza fellowship fellows building careers in tech and remote work. Arabic first; English as a second language. Most read on phones with weak, expensive data and power cuts.
- Plain English. Short sentences (aim under 20 words, never over 30). Common words. No idioms or figures of speech: say the literal thing. Define every new term on first use.
- **Tone: gentle, sincere, hopeful and practical, like a kind older sibling or a respected teacher.** Never preachy. Never shaming. Never "if you had more faith, this would not happen", "just trust Allah", "stop complaining" or "others have it worse, so be grateful". Never use guilt to motivate. Speak to the learner as a believer who is already trying.
- **Never trivialise hardship and never make it dramatic.** Hardship appears as ordinary background (a power cut, a lost contract, a delayed result, an illness in the family), told plainly. No war, no battles, no politics, no current events, no destruction as case material.
- Respect in every mention: write "the Prophet, peace be upon him" at his first mention in each chapter (then "the Prophet" is fine); "peace be upon him" or "peace be upon them" for other prophets at first mention; "may Allah be pleased with him/her" for a companion at first mention. Write "Allah", not "God", in this course.
- Arabic terms: give the Arabic word in Latin letters in italics at first use with a plain meaning, for example *tawakkul* (trust in Allah). After that use the word without italics. Use the spellings in section 5.
- Everyday cases: freelance clients, remote interviews, scholarships, exams, study circles, family shops, siblings, parents, neighbours. Arabic names of every gender. Shekels for local prices, dollars for freelance pay.

## 3. Hard rules (any violation fails review)

- **No em dashes or en dashes anywhere.** Use a colon, a comma or two sentences. Ranges: "5 to 10"; verse ranges "2:155 to 157".
- **Every verse and hadith is referenced and comes from the dossier.** Format in prose: a short paraphrased meaning, then the reference in brackets, for example: Allah tells us that He does not burden any soul beyond what it can bear (Quran 2:286). For a hadith: (Sahih al-Bukhari 1283) or (Sahih Muslim 2664) or (Jami' at-Tirmidhi 2517, graded hasan). Use the numbering and grading the dossier gives, and always say "meaning" or paraphrase; never present an English sentence as the exact words of the Quran.
- **Direct quotations of an English translation:** at most one short quotation (under 15 words) per chapter, with its translation named, for example (Quran 94:5, Sahih International). Otherwise paraphrase.
- **Arabic script** only for the short duas and phrases the dossier gives in Arabic, copied character for character from the dossier, on their own line in a block quote, followed by the meaning in English. Never type Arabic from memory. At most two Arabic block quotes per chapter.
- **No rulings.** Do not say what is halal, haram, obligatory or recommended beyond what a cited source states plainly. Where scholars differ (the dossier lists where), say "scholars differ on this; ask a scholar you trust" in one plain sentence and move on. No sects, no schools named against each other, no fatwas, no dream interpretation, no numerology.
- **No stories beyond the dossier.** Stories of the prophets and companions only as the dossier phrases them, with the reference. Do not add details from memory (names, numbers of years, dialogue). If a story has a battle context, the dossier says how to phrase it or not to use it.
- **Wellbeing and safety.**
  - Never ask a learner to share personal hardship. Every prompt that invites a personal situation says it is optional and offers a provided case of equal weight. Nothing personal is graded; mentors grade only the reasoning the prompt asks for.
  - Sadness, worry and grief are human. The Prophet wept at his son's death (dossier). Never suggest that sadness or anxiety means weak faith.
  - In chapters on loss (3.x) and care (7.3), in the capstone and wherever a learner might be struggling, include one plain sentence: if you feel overwhelmed for a long time, or you have thoughts of harming yourself, talk to your mentor or the fellowship coordinator today, and to a doctor or counsellor if you can. This course does not replace professional care. Never only a form or a bot or an AI tool. Use the dossier's safe-messaging notes; never describe self-harm.
- **No company or product names**, no AI products, no real websites, no links, and no `MustRead`, `InterestingRead` or `RealWorldEvent` blocks.
- **No AI or tool attribution.** No slop: no "In today's world", "It is important to note", "delve", "landscape", "game-changer", "Let's dive in", "key takeaways", "unlock", "journey", "navigate" (for life), "embrace".
- **No invented statistics.** Numbers belong to the case ("in this example").
- **Check every case twice.** A case must actually support the point the chapter draws, and every sum must be right.

## 4. Chapter file format and budgets

Path: `courses/faith-and-resilience/<module-dir>/<file>` exactly as in course.yaml. Frontmatter:

```yaml
---
title: "<exact title from course.yaml>"
module: <n>
lesson: <n>
stepType: Read | Learn | Build | Check | Gate
summary: "<one or two plain sentences>"
estimatedMinutes: <minutes from the roadmap>
---
```

`NN.01-set-the-scene.md` is Read; teaching chapters are Learn; `07.05-capstone-your-steady-plan.md` is Build; `*-quiz.md` is Check; `*-checklist.md` is Gate.

**agent-ip prose minimums apply in full** (`02-course-architecture.md` → Prose depth). They are counted by `agent-ip/scripts/audit-course.mjs` over **paragraphs only**: headings, lists, numbered steps, tables, block quotes, components and fences do not count.

| Chapter type | Prose words (paragraphs) | Diagram | Interactive | Assessments |
|---|---|---|---|---|
| Set the scene (Read) | 1,200 or more | one ```mermaid | none | one predict |
| Teaching (Learn) | 1,200 or more | one ```mermaid | one registered canvas | one predict, one or two quiz MCQs (at most 3 in total) |
| Capstone (Build) | 1,200 or more | one ```mermaid | none | the capstone openquestion only |
| Quiz (Check) | none: activities only | none | none | exactly **five** quiz MCQs |
| Gate | 700 or more | none | none | one openquestion |

Every chapter: at most 6 top-level components and 25 JSX tags in total.

**Recaps and definitions (agent-ip `02-course-architecture.md`):** `ChapterRecap` goes in the module gate only, never in a scene, teaching, quiz or capstone chapter (the importer keeps gate recaps since PR #49). `LearningObjectives` goes in the set-the-scene chapter only. `BigWordAlert` is for the module's central term in its set-the-scene chapter, and at most once in a teaching chapter for a new, load-bearing term the course has not defined before. Never define the same term twice in the course: after its first definition, refer back ("the tawakkul you met in 2.2"). Write long by **explaining**, not padding: more worked reasoning, a second short example, the common misunderstanding and how to spot it, what to do this week. Paragraphs of two to five short sentences.

### Set the scene (Read)
A case told as a short story that shows the module's question in a fellow's life; why it matters; what the module covers. One `BigWordAlert` (props `term`, `plainEnglish`, `whyItMatters`) for the central term. `LearningObjectives` (`items={[...]}`) once. A `## Key words` table (Word, Plain English) of four to six words and a `## What is in this module` table (Chapter, You will practise). One ```mermaid diagram of the case. One predict. End with a `**Next:**` line.

### Teaching chapter (Learn)
Hook (a case or a misunderstanding), the teaching from its sources in plain words, the predict before anything reveals its answer, the canvas (section 6), a full worked example with the reasoning shown step by step, a ```mermaid diagram that argues a relationship (introduced in prose before, explained after: what to notice, then the takeaway), where people misunderstand it, one or two quiz MCQs under `## Check your understanding` on a **new** case, a short `## This week` paragraph with one small action, then a `**Next:**` line. At most one `BigWordAlert`; `GlossaryTerm` (props `term`, `definition`) for other new words on first use; at most two `Callout`s.

Mermaid on phones: `flowchart TD`, at most 7 nodes, short node text, quote every label (`A["Text"]`), plain words on edges. No Arabic inside Mermaid.

### Quiz chapter (Check)
Activities only: five ```quiz MCQ fences and nothing else after the frontmatter. Never write "skip it" or "skip to".

### Gate
Layout: intro sentence, `## Module N checklist` (five or six honest items, including "I answered the questions in chapters N.2 to N.X, and finished the quiz in N.Y"), `## Learning log` (four numbered questions about how they think and act; each says "if you prefer, answer about the provided case"), a task section, the openquestion, the recap, `## All boxes ticked?`, `**Next:**`. To reach 700 prose words, explain in paragraphs: what the task is for, what a strong answer looks like (a short worked example about a fictional person, in prose), the **provided case** for anyone who prefers not to use their own life (written in full, as rich as a personal case), and how the mentor will read it. No `BigWordAlert`, `GlossaryTerm`, `Callout`, diagram, canvas, predict or quiz in a gate. End every gate with `<ChapterRecap points={[...]} />` (four or five points for the module) before `## All boxes ticked?`. Every gate's `## How your mentor will read it` section has a small table: each criterion with three levels (Met, Partly, Not yet) and an observable threshold, a **pass rule**, and the follow-up step (the mentor replies with one or two questions, and the learner answers them). The rubric grades reasoning and the plan only, never the learner's faith, feelings or personal circumstances; say so in one sentence. The openquestion's `modelAnswer` starts with a **mentor key for the provided case** (what a Met answer contains, and the common Partly and Not yet answers), then a model answer about a different fictional person.

## 5. Assessments

MCQ fence:
````
```quiz
type: mcq
question: "<a case that needs reasoning, not recall>"
options:
  - "<option>"
  - "<option>"
  - "<option>"
  - "<option>"
correct: <0-based index>
explanations:
  - "<why right or wrong, standalone>"
  - "..."
  - "..."
  - "..."
```
````
- Four options, one explanation per option in order; the right one starts with "Right."; wrong ones say kindly what was missed.
- **What a key may test:** what a cited source says, the difference between two taught ideas (tawakkul and giving up; sabr and silence; hope and carelessness), or which action fits the teaching in a case. **Never** grade a learner's personal faith, feeling or a matter where scholars differ; opinion goes to open questions.
- Every quiz item gives a named person, a place and a concrete situation, and each wrong option is a misunderstanding a sincere learner might really hold (for example "tawakkul means I do not need a backup plan"). Wrong options must not mock anyone or sound impious.
- **Option length:** the correct option is never longer than the longest wrong option (never 10% longer); in a quiz chapter it is the strictly longest in at most one of five. Same level of detail in every option. Use each position 0 to 3 at least once per quiz chapter.
- No "all of the above", no joke options, no "Which is NOT".
- The key's wording is not in the stem and is not a sentence from the chapter. No item repeats an item or predict elsewhere in the course.
- Blind re-answer each MCQ yourself after writing it. An independent blind review follows (`agent-ip/scripts/blind-keys.mjs`).
- Double-quote YAML strings; single quotes inside; always quote strings with colons.

Predict fence: exactly two options with `id` and `label`, `correctOptionId`, `explanation`; the correct label never longer than the other; correct first in about half your predicts; in at least a third of your predicts the intuitive answer is the right one.

Open question fence (gates and capstone):
````
```openquestion
prompt: "<what to write, with the parts to include, and 'your own situation or the provided case'>"
required: true
minWords: <honest minimum>
allowSpeechInput: true
allowUrl: true
urlRequired: false
urlLabel: "Voice note link (optional)"
urlHint: "An audio link your mentor can open without signing in. Audio only is fine."
modelAnswer: "<mentor key for the provided case, then a strong answer about a fictional person>"
```
````

## 6. Canvases (interactive-first, agent-ip v0.4)

Every Learn chapter teaches through **one registered canvas** on an existing renderer (`10-interactive-canvases.md` → Reusable renderers). The roadmap's canvas table names the slug, the renderer and the claim for each chapter. For each canvas:

- Create `packages/learning-ui/src/canvas/<slug>/data.ts` (typed with the renderer's spec type from `packages/learning-ui/src/canvas/renderers/<renderer>/types.ts`; header comment naming the course and chapter; `title`, `purpose`, `summary` for screen readers, steps with `title` and `note` in the course's plain English, `tryThis` with the first line matching your predict, honest `limits`) and `packages/learning-ui/src/canvas/<slug>/spec.md` on template 14A (`agent-ip/08-templates.md`: teaching claim, why a canvas, model, rendering, copy, placement, edge cases, accessibility, acceptance criteria). Models: `five-whys-chain` (state machine), `laptop-charging-detective` (sequence), `weak-strong-fixes` (factor), `llm-token-cost` (slider, with a pure `compute` and its test in `frontend/tests/unit/canvas/`).
- State machine: grid at most 3 columns by 2 rows; edge labels at most 14 characters, at most 3 characters on an arrow between two states in the same column; no diagonal beside a parallel arrow. Sequence: two to four actors, arrow labels under 18 characters. Factor: two or three options, three to five criteria. Slider: two to four inputs, a pure `compute`, a `describeChange`, honest arithmetic only, and a unit test file `frontend/tests/unit/canvas/<slug>.test.ts` covering the default, minimum, maximum and one edge case.
- **No canvas measures faith, reward, sin or Allah's decree.** Canvases model the learner's own steps, time, plans and choices (a means plan, a decision, a weekly rhythm), or step through a sourced story in order. No numbers attached to reward or to how much Allah loves anyone.
- **Do not edit** `packages/learning-ui/src/canvas/registry.ts` or any `slugs.ts`: the orchestrator registers every slug after you report, then runs the registry tests and sends back any failure.
- In the chapter: the predict comes first, a sentence sends the learner to step through or change it, `<InteractiveCanvas slug="<slug>" />` on its own line, then a paragraph on what it showed, and later a quiz item that transfers the claim to a new case. The chapter still teaches the claim in prose (the canvas may fail to load on a weak connection). Names, numbers and facts in the canvas match the chapter exactly. No em or en dashes, no idioms, no brand names, no Arabic script in canvas text (Latin-letter terms are fine).

## 7. Cast and module notes

**The cast.** Six fellows in an online study circle that meets on Saturday evenings, with their mentor **Reem**. Keep their facts consistent; a name belongs to its module, and new people in other modules need new names (grep the whole course before using a name). Ages 22 to 27; they live in Gaza; hardship is background, never the story.
- **Yasmin** (module 1): freelance web developer. A client who runs an online bookshop abroad has not replied for six days after she sent a first draft of his site; she is waiting for the result of a master's scholarship application, due in three weeks; her area has grid power about six hours a day.
- **Khalil** (module 2): junior software tester looking for remote work. A remote interview next Thursday at 10:00 for 60 minutes; the power schedule changes week to week; his laptop battery lasts about 3 hours; his uncle's shop has a solar panel.
- **Mariam** (module 3): graduate in English literature who worked a year on a study scholarship application and was not accepted; the next round opens in eight months. Her mother and younger brother live with her.
- **Ahmad** (module 4): graphic designer. He sees friends abroad posting new jobs and degrees and feels left behind; his older brother **Yousef** lends him his phone data and checks his portfolio.
- **Rania** (module 5): data analyst. Two offers, both permissible: a local NGO data assistant job (steady salary, in person, six days a week, less learning) and a six-month remote contract with a small startup abroad (higher pay, more learning, renewal not promised, evening calls).
- **Tariq** (module 6): freelance developer who took three projects at once, missed a client's deadline by nine days, and lost the client.
- Module 7 brings them together. Only Reem is a mentor; the real contacts named to learners are always "your mentor or the fellowship coordinator", never Reem.

**Module 1 (anchors).** 1.1 Yasmin's week; the predict asks what helps most in such a week. 1.2 the unseen (31:34, 6:59, 27:65) and the learner's part; Tirmidhi 2516 (what Allah has written); canvas `worry-or-next-step`. 1.3 life as a test with a purpose (67:2, 29:2, 51:56), what Allah asks is within capacity (2:286 opening clause only), with hardship comes ease (94:5 to 6, keep "with"), and **hardship is not a sign of Allah's anger** (Tirmidhi 2398, in general terms only; never explain a learner's own loss); canvas `a-hard-week-two-readings`. 1.4 qadr in iman (Muslim 8), the companions' "then why act?" and the answer "act" (Bukhari 4949), and Muslim 2664 as the centre ("be keen on what benefits you, seek Allah's help, do not give up; not 'if only'"); canvas `act-not-if-only`. 1.5 gate: sort one situation (provided case: a fellow waiting for a university to reopen applications, or a family member's job ending; write it in full).

**Module 2 (tawakkul).** 2.1 Khalil's interview. 2.2 definition (course wording: trusting Allah with your heart while you do the work with your hands; Ibn Rajab via Dar al-Ifta), the birds go out (Tirmidhi 2344), "consult, decide, then trust" (3:159, no story), the Yemeni pilgrims who skipped provisions and called it trust (Bukhari 1523 with 2:197) as the misunderstanding; the two ways it goes wrong: trust without means, and means without trust (worry that everything depends on you); canvas `birds-go-out`. 2.3 tie it and trust (Tirmidhi 2517 and Ibn Hibban 731, "graded hasan"), Hajar: "then He will not abandon us", and she still ran between Safa and Marwa seven times (Bukhari 3364, told plainly); Khalil's means plan with a backup; canvas `interview-power-plan` (slider; honest hours arithmetic). 2.4 the Hijra strictly from Bukhari 3905 (camels fed for four months, coming at an unusual hour, paying for the camel, food packed, Asma's belt from Bukhari 2979, three nights in the cave, Abdullah bringing news, Amir grazing sheep and bringing milk, a skilled guide who was not a Muslim at the time, chosen for skill) and the trust in the cave (9:40 cave clause, Bukhari 3653). No spider or dove, no pursuit details, no parallels to any current displacement; canvas `hijra-planned-steps`. 2.6 gate: a means plan with a backup.

**Module 3 (sabr).** 3.1 Mariam's news; open with grief is human (Bukhari 1303) and Yaqub (12:84 to 87) before any definition; the loss sentence and human contact (section 3). 3.2 sabr at the first shock (Bukhari 1283, with the gentle way the Prophet treated the grieving woman), patience is learned (Bukhari 1469), seek help through patience and prayer (2:153), beautiful patience (12:18), the three kinds (Ibn al-Qayyim, as the dossier phrases them); what sabr is not: silence, hiding need, giving up, accepting wrong without speaking; canvas `sabr-keeps-moving`. 3.3 words for hard moments: the istirja (2:156) with Umm Salamah's dua (Muslim 918; never promise a specific replacement), the dua of distress (Bukhari 6346), refuge from worry and grief (Bukhari 6369), hasbuna Allah only with the Ibrahim part of Bukhari 4563; consoling a friend (Bukhari 1284: presence, those words, practical help, no explanations); at most two Arabic blocks; canvas `words-for-the-day`. 3.4 waiting well: Yusuf asked a man to mention him (a means), was forgotten and stayed "several years" (12:42; never a number), Allah does not let the reward of the patient doers of good be lost (12:90), "my Lord is subtle in what He wills" (12:100), Yunus's dua (21:87 to 88, Tirmidhi 3505) and his slow recovery (37:143 to 146); waiting well = keep doing good where you are, keep using the means, keep asking Allah, do not decide Allah has forgotten you; canvas `yusuf-waiting-well`. 3.6 gate: a waiting plan (provided case: a fellow waiting for a delayed graduation certificate that a job offer depends on).

**Module 4 (gratitude and hope).** 4.1 Ahmad and comparison; open with Muslim 2999 (grateful in ease, patient in hardship) as the bridge from module 3. 4.2 shukr in heart, tongue and action (14:7 first half, 2:152, 31:12, Bukhari 4836: "should I not be a grateful servant?"), look at those below you (Muslim 2963) **only as a tool the learner chooses**, never as "others have it worse", thank people (Abu Dawud 4811); canvas `gratitude-three-ways`. 4.3 hope and fear (7:56, 17:57, 39:53, 15:56, Bukhari 7405, Muslim 2755), the two wings picture (Ibn al-Qayyim, as phrased in the dossier), despair and carelessness as the two ways the balance breaks; fear is about one's own choices, never about events ("maybe this is a punishment" is forbidden); canvas `two-wings-balance`. 4.5 gate: a one-week practice (what you noticed, who you thanked and how, one hope you hold, one thing you are careful about).

**Module 5 (decisions).** 5.1 Rania's offers; 42:38 introduces shura. 5.2 take the means of knowing: list options, check each is permissible (if unsure, ask a scholar; no rulings), gather facts (pay, hours, renewal, learning, family needs), know what matters most; Muslim 2664 (keen on what benefits); canvas `rania-two-offers` (factor; it does not decide). 5.3 shura: 42:38; 3:159 order (consult, decide, trust; no story); the Prophet told Khadijah "I feared for myself" and she took him to someone with knowledge (Bukhari 3); he asked Umm Salamah's advice and followed it (Bukhari 2731, phrased only as the dossier says, no treaty); who to ask (knowledge, care, honesty), what to ask, how to listen, you still decide; canvas `rania-asks-the-right-people`. 5.4 istikhara (Bukhari 1166; the number is 1166): two non-obligatory rak'as then the dua (Arabic block of the dua from the dossier, which may count as both blocks), for permissible choices, no dream needed, then go ahead with what seems best and watch whether the way opens; scholars differ on the weight of a feeling (the dossier's line); do not use "ma khaba man istakhara"; canvas `istikhara-in-order`. **Graded keys test only the agreed core.** 5.6 gate: a decision record (provided case: choosing between two short courses, or between a part-time job and finishing a degree).

**Module 6 (intention, good work, starting again).** 6.1 Tariq's lost client. 6.2 actions are by intentions (Bukhari 1), spending on family is rewarded (Bukhari 56, only that part), intending good counts even when stopped (Muslim 130, no numbers in a canvas), purpose (51:56) so work becomes worship; never "if your intention is not pure, your work is worthless"; canvas `same-work-two-intentions`. 6.3 ihsan in everything (Muslim 1955, first sentence only), most beloved deeds are consistent even if small (Bukhari 6464), the religion is ease, do not overload yourself (Bukhari 39), plant the seedling (Adab al-Mufrad 479; no current events), earning by your own hands (Bukhari 2072); canvas `little-and-often` (slider). 6.4 after a failure: keep sin and failure apart (losing a client is not a sin; missing a promised deadline without telling the client is a wrong to put right with the client); name it honestly, put right what you can, learn so it does not happen twice (Bukhari 6133), not "if only" (Muslim 2664, deliberate spaced retrieval from 1.4), turn back to Allah where you did wrong (7:23, 3:135, Muslim 2749, phrased so it never encourages sin), and start again; canvas `starting-again-steps`. 6.6 gate: a fresh start plan.

**Module 7 (community, care, steady plan).** 7.1 the circle through a hard month (one member's family has a long power and water problem, another is ill; told plainly), believers like one body (Bukhari 6011); introduce the capstone. 7.2 serving others: Muslim 2699, Bukhari 2442, Bukhari 13, smiling and small help are charity (Tirmidhi 1956); practical service (a job lead, a CV review, checking on a neighbour); canvas `help-passes-on`. 7.3 care: your body has a right over you (Bukhari 5199: rest and sleep), Allah sent a cure for every illness (Bukhari 5678), "yes, seek treatment" (Tirmidhi 2038), faith and professional care work together (S64, S65, phrased as the dossier says; nothing about medication), the Prophet told Khadijah "I feared for myself" (Bukhari 3) as the model of telling someone; signs that it is time to talk to someone; the contact sentence; canvas `who-to-tell`. 7.4 mixed review: five fresh cases, one from each of modules 1 or 2, 3, 4, 5 and 6, asking which teaching or practice fits first and why. 7.5 capstone (section 8). 7.6 course gate: checklist across all modules, `## Your steady toolkit` (one line per teaching, with its source), learning log including "look back at the situation you sorted in 1.5: what would you add now?", and an openquestion of at least 80 words: one change the course made to how you act, with one source.

## 8. Capstone (7.5, Build, 90 minutes)

The fellow builds a **steady plan** for one real uncertain situation **or one of three provided cases**, always available so nobody has to share personal circumstances. Write each provided case in full (who, what is uncertain, the facts and dates, the people around them, what they have tried), plainly and without drama:
1. **Nadia**, a final-year computer science student, whose laptop broke two weeks before her graduation project is due; her files were partly backed up.
2. **Omar**, a freelance translator whose main client ended their contract, which was half his monthly income; he supports his parents.
3. **Lina**, deciding whether to take a part-time remote job while she finishes her last university term, with her family's needs and her grades in mind.

The chapter teaches the six parts with a worked example on a fourth case (a fellow named **Hani** waiting to hear whether a remote internship will become a job), includes a ```mermaid diagram of Hani's plan (the six parts and how they connect), a six-line rubric (Met, Partly, Not yet), a pass rule, the defence questions from the roadmap, the contact sentence, and the openquestion with `minWords: 250`, whose `modelAnswer` holds a mentor key for each provided case (what Met looks like in each part, and common Partly answers) followed by a short model answer for a different person:

1. **What only Allah knows, and what is mine to do** (1.2 to 1.4).
2. **The means and a backup plan** (2.2 to 2.4).
3. **How I will wait well**: what I keep doing, the words or dua I will use (3.2 to 3.4).
4. **Who I will consult**, and istikhara if there is a choice (5.2 to 5.4).
5. **My intention and one small daily habit** (6.2, 6.3), and what I will do if it does not work out (6.4).
6. **Who I will serve, and who I will tell if it gets heavy** (7.2, 7.3), naming a real person.

## 8. Before you hand back

- Every file in your modules exists with the exact title and the roadmap minutes.
- Zero U+2014 and U+2013 characters: `grep -rP "[\x{2013}\x{2014}]" <your folders>` prints nothing.
- Every reference in your chapters is in the dossier with the same number and grading; every Arabic text is copied from the dossier.
- Every sum and case checked twice; every MCQ blind re-answered.
- From `server/`: `node node_modules/tsx/dist/cli.mjs scripts/validate-course-source.ts --course faith-and-resilience` and `node node_modules/tsx/dist/cli.mjs scripts/audit-course-structure.ts --course faith-and-resilience` with no errors or warnings in your files (other writers' missing files will show; ignore those).
- From the repo root: `node agent-ip/scripts/audit-course.mjs courses/faith-and-resilience` with no flags on your chapters (an unregistered canvas slug is fine until the orchestrator registers it).
- Edit only your module folders and your canvas folders (and your slider test files). No git commands that change anything. Do not install packages. pnpm is broken here; use the node commands above.
