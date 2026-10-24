---
artifact: critique
course: faith-and-resilience
artifact_under_review: content/import/faith-and-resilience
reviewer: critic-b
review_type: slop, continuity, accuracy, safety and tone
version: 1
---

# Critique Report: Steady Hearts: Islamic Belief for Uncertain Times (`faith-and-resilience`)

## Scorecard

| # | Dimension | Score (1-5) | Evidence / note |
|---|---|---|---|
| 1 | Dossier completeness | 5 | `research.md` covers all 18 course topics with verified Quran and sunnah.com references, explicit gradings and graders, character-checked Arabic blocks, battle-context flags, scholarly differences, and a complete do-not-use table. |
| 2 | Structural integrity | 5 | All 7 modules and 40 chapters follow the Read, Learn, Check, Gate progression, with valid frontmatter, required components, and valid Mermaid flowcharts under 8 nodes. |
| 3 | Pedagogical arc | 5 | Every Learn chapter opens with a concrete lived scenario, poses a two-option `predict` before teaching, grounds every claim in the dossier, steps through an `InteractiveCanvas`, shows a worked example and a Mermaid diagram, addresses misconceptions, and checks understanding with two scenario MCQs. |
| 4 | Source-only accuracy | 5 | Every Quran reference, hadith number, grading, story detail, and scholarly attribution comes strictly from `research.md`. Zero weak or do-not-use sayings appear, and no unverified story details (such as Yusuf's prison years, the cave spider or dove, or the Ta'if dua) are added from memory. |
| 5 | Technical accuracy | 5 | Scored as accuracy against the research dossier: all Arabic blocks match `research.md` character for character, battle contexts are excluded as required, "scholars differ" is used only on istikhara follow-up where `research.md` documents it, and paraphrases are consistently marked as meanings, with one missing `Meaning:` line after the Arabic block quote in `05.02` (S2-1). |
| 6 | Practical transfer | 5 | Every Learn chapter closes with a specific, zero-cost `This week` action, and every Gate and the Capstone turn belief into dated steps, means, backups, and named people. |
| 7 | Assessment quality | 5 | All 65 MCQs across the Learn and Check chapters test realistic Gaza scenarios, use plausible misconception-based distractors of balanced length, and explain why each option is right or wrong. |
| 8 | Capstone validity | 5 | `07.05-capstone-your-steady-plan.md` integrates all seven modules into a six-part steady plan with a full worked example (Hani), three detailed provided cases (Nadia, Omar, Lina), a transparent rubric that grades only the plan and its reasoning, and a five-minute mentor walk-through. |
| 9 | Visual usefulness | 4 | All 25 Mermaid diagrams and 19 canvases are focused and mobile-friendly, but three canvases (`same-work-two-intentions`, `three-stories-of-waiting`, and `what-is-mine-to-do`) have text, number, or prediction-handoff mismatches with their chapter prose (S2-5). |
| 10 | Interactivity quality | 4 | Every Learn chapter pairs a `predict` block with an `InteractiveCanvas`, but `three-stories-of-waiting` in `03.04` omits Yusuf's request to the freed prisoner (`Quran 12:42`) and therefore cannot answer the prediction the chapter tells the learner to check in the canvas (S2-5). |
| 11 | Plain English | 4 | Vocabulary is warm and accessible, but over twenty learner-facing sentences and all eight `modelAnswer` blocks exceed the 30-word hard ceiling (S2-6), core Arabic terms are defined in full two or three times across chapters instead of once at first use (S2-7), and several idioms remain (S3-1). |
| 12 | Anti-slop compliance | 5 | Zero em dashes (U+2014) or en dashes (U+2013) appear anywhere in `course-chapters.md` or `canvas-data.md`; zero forbidden AI slop phrases, links, or company names appear; and no heading is followed by a sentence that repeats it. |
| 13 | Accessibility and sensitive content | 5 | Grief, loss, and overwhelm are handled with deep care: sadness is never framed as weak faith, hardship is never called a punishment or a gift for the learner's own loss, personal sharing is always optional with a complete provided case, and the mentor/coordinator contact sentence and professional-care disclaimer appear in every loss, failure, care, and capstone chapter. |
| 14 | Localization readiness | 4 | Scenarios reflect Gaza fellowship realities (power schedules, shared hotspots, shekels and dollars, family flats), though sentences of 35 to 51 words (S2-6) and English idioms (S3-1) add reading friction for second-language learners on phones. |
| 15 | Engagement and narrative pull | 5 | The Saturday study circle with Reem and the six fellows (Yasmin, Khalil, Mariam, Ahmad, Rania, Tariq) gives the course strong human warmth and continuity of purpose across all 40 chapters. |
| 16 | Voice and tone | 4 | Consistently gentle, sincere, hopeful, and practical without preaching or shaming; held back from a 5 by missing first-mention honorifics for companions in `03.05`, `05.05`, and `07.03`, and for the Prophet, other prophets, and companions in nine canvas files (S2-2). |
| 17 | Pacing and cognitive load | 5 | Short paragraphs, at most two Arabic block quotes per chapter, clear subheadings, and regular interactive pauses fit phone study during short power windows. |
| 18 | Cross-chapter continuity | 4 | Cross-references to earlier chapters are accurate, but four character names (`Ola`, `Sawsan`, `Ayman`, `Nabil`) are reused for different people across modules (S2-3), three cast facts drift between modules (S2-4), and Gate `<ChapterRecap>` items omit source references in Modules 3 to 7 (S3-2). |
| 19 | Worked-example depth | 5 | Every Learn chapter, Gate chapter, and Capstone includes a concrete worked example with realistic numbers, schedules, and failure modes. |
| 20 | Misconception handling | 5 | Every Learn chapter dedicates a section to where people misunderstand the teaching, gently correcting each misconception from `research.md` with sound evidence. |
| 21 | Variant distinctiveness | 5 | Not applicable: `faith-and-resilience` is a single-track course with no parallel variants. |
| 22 | Production-grade coverage | 5 | Not applicable: this is a non-technical belief and resilience course rather than a software engineering track. |

**Average:** `4.73`
**Blocking defects:** `0 S1, 7 S2 (plus 3 S3)`
**Recommendation:** `revise`

---

## Defects

### S1 - Critical (blocks release)

None (`0` S1 defects).

### S2 - Major (must fix before publish)

- **[S2-1] Missing English `Meaning:` line after the Arabic block quote in `05.02`**
  - **Location:** `content/import/faith-and-resilience/05-decisions-shura-and-istikhara/05.02-knowing-before-deciding.md` (`course-chapters.md`, lines 2909-2913, under `## Be keen on what benefits you`)
  - **Observation:** Line 2911 places the Arabic text of Sahih Muslim 2664 in a block quote (`> الْمُؤْمِنُ الْقَوِيُّ خَيْرٌ وَأَحَبُّ إِلَى اللَّهِ مِنَ الْمُؤْمِنِ الضَّعِيفِ وَفِي كُلٍّ خَيْرٌ احْرِصْ عَلَى مَا يَنْفَعُكَ وَاسْتَعِنْ بِاللَّهِ وَلاَ تَعْجِزْ`), and line 2913 immediately continues with `"You met this hadith in chapter 1.4, as the answer to 'if only'."` without an English `Meaning:` line following the Arabic block quote.
  - **Why it matters:** `writer-pack.md` Section 3 (`Arabic text`) makes it a hard rule: "when you include Arabic, copy it character for character from the research dossier. Put it on its own line in a block quote, followed by the meaning in English." Every other Arabic block quote in the course is followed immediately by `Meaning: ...`.
  - **Required fix:** Insert `Meaning: The strong believer is better and more beloved to Allah than the weak believer, and there is good in both. Be keen on what benefits you, seek Allah's help, and do not give up (Sahih Muslim 2664).` on the line after the Arabic block quote at line 2911, and shorten the pre-quote sentence at lines 2909-2910 so it does not duplicate the meaning.

- **[S2-2] Missing first-mention honorifics for companions in chapters (`03.05`, `05.05`, `07.03`) and for the Prophet, other prophets, and companions in canvases (`canvas-data.md`)**
  - **Location:**
    - `content/import/faith-and-resilience/03-sabr-when-loss-and-waiting-are-long/03.05-quiz.md` (`course-chapters.md`, line 2067, MCQ 3 explanation 2)
    - `content/import/faith-and-resilience/05-decisions-shura-and-istikhara/05.05-quiz.md` (`course-chapters.md`, line 3369, MCQ 4 explanation 0)
    - `content/import/faith-and-resilience/07-community-care-and-your-steady-plan/07.03-caring-for-body-and-mind.md` (`course-chapters.md`, line 4546, `predict` explanation)
    - `canvas-data.md`: `what-is-mine-to-do.json` (line 183, `the Prophet`); `means-and-backup-builder.json` (line 380, `Hajar`); `hijra-planning-and-trust.json` (lines 404, 419, 434, 464, `Abu Bakr`, `the Prophet`, `Asma bint Abi Bakr`, `Abdullah ibn Abi Bakr`, `Amir ibn Fuhayra`); `what-sabr-looks-like.json` (lines 537, 551, 565, `Yaqub`, `the Prophet`); `choose-the-words.json` (line 662, `the Prophet`, `Umm Salamah`); `three-stories-of-waiting.json` (lines 764, 779, 809, `Yusuf`, `Yunus`); `istikhara-step-by-step.json` (line 1341, `the Prophet`, `Jabir ibn Abdullah`); `who-to-tell.json` (line 1728, `the Prophet`, `Khadijah`).
  - **Observation:** In `03.05-quiz.md` line 2067 (`"and the hadith of Umm Salamah adds..."`) and `05.05-quiz.md` line 3369 (`"he asked his wife Umm Salamah for advice"`), the first and only mention of the companion Umm Salamah in each chapter omits `"may Allah be pleased with her"`. In `07.03-caring-for-body-and-mind.md` line 4546, the first mention of Khadijah in the chapter (`"he went home and told his wife Khadijah"`) omits `"may Allah be pleased with her"`, which appears only later at line 4583. In `canvas-data.md`, the eight listed canvas files name the Prophet, other prophets, and companions without first-mention honorifics.
  - **Why it matters:** `writer-pack.md` Section 3 (`Honorifics`) and the safety-and-tone rules require `"the Prophet, peace be upon him"`, `"peace be upon him/her/them"` for other prophets, and `"may Allah be pleased with him/her/them"` for a companion at first mention in each chapter and standalone learning asset.
  - **Required fix:** Add `"may Allah be pleased with her"` after `"Umm Salamah"` in `03.05-quiz.md` line 2067 and `05.05-quiz.md` line 3369, and after the first mention of `"Khadijah"` in `07.03-caring-for-body-and-mind.md` line 4546; add first-mention honorifics for the Prophet, other prophets, and companions in the eight listed canvases in `canvas-data.md`.

- **[S2-3] Reused character names for two different people across modules (`Ola`, `Sawsan`, `Ayman`, and `Nabil` / `Umm Nabil`)**
  - **Location:**
    - `Ola`: `02.03-tying-the-camel.md` (`course-chapters.md`, line 1030, MCQ 1) and `03.05-quiz.md` (`course-chapters.md`, line 2024, MCQ 1)
    - `Sawsan`: `02.05-quiz.md` (`course-chapters.md`, line 1286, MCQ 4) and `03.05-quiz.md` (`course-chapters.md`, line 2040, MCQ 2)
    - `Ayman`: `02.04-the-prophets-planning-the-hijra.md` (`course-chapters.md`, lines 1156, 1170, 1176, `## Worked example: Khalil's interview plan`) and `04.04-quiz.md` (`course-chapters.md`, line 2658, MCQ 4)
    - `Nabil` / `Umm Nabil`: `02.01-set-the-scene.md` (`course-chapters.md`, line 677, `"His uncle Nabil"`) and `03.03-words-for-hard-moments.md` (`course-chapters.md`, line 1805, MCQ 1, `"Raneem's neighbour, Umm Nabil"`).
  - **Observation:** Four names are used for two different people in different modules: `Ola` is a student with an online exam in `02.03` line 1030 and a woman whose family closed a sewing workshop in `03.05` line 2024; `Sawsan` is a daughter whose father lost his job in `02.05` line 1286 and a thesis student whose supervisor is leaving in `03.05` line 2040; `Ayman` is a senior software tester who runs Khalil's practice interview in `02.04` lines 1156-1176 and a man who drifted from his prayers in `04.04` line 2658; and `Nabil` is Khalil's uncle in Module 2 (`02.01` line 677) and reused in the kunya `Umm Nabil` for Raneem's neighbour in `03.03` line 1805.
  - **Why it matters:** `writer-pack.md` Section 7 (`The cast`) explicitly rules: "a name belongs to its module, and new people in other modules need new names (grep the whole course before using a name)."
  - **Required fix:** Replace the second use of each name with a unique name not used elsewhere in the course (rename `Ola` in `03.05` line 2024, `Sawsan` in `03.05` line 2040, `Ayman` in `04.04` line 2658, and `Umm Nabil` in `03.03` line 1805).

- **[S2-4] Cast fact drift across modules for `Yasmin`, `Khalil`'s uncle Nabil, and `Ahmad`**
  - **Location:**
    - `01.01-set-the-scene.md` (`course-chapters.md`, line 16) vs. `07.01-set-the-scene.md` (`course-chapters.md`, line 4322) and `07.03-caring-for-body-and-mind.md` (line 4622)
    - `02.01-set-the-scene.md` (`course-chapters.md`, line 677) and `02.03-tying-the-camel.md` (line 983) vs. `07.01-set-the-scene.md` (`course-chapters.md`, line 4269)
    - `writer-pack.md` (Section 7, line 203) vs. `04.01-set-the-scene.md` (`course-chapters.md`, lines 2194 and 2198).
  - **Observation:** Three recurring cast facts change without explanation across files:
    1. In `01.01-set-the-scene.md` line 16 (and `writer-pack.md` line 200), Yasmin's area gets grid power `"for about four hours a day"`, whereas in `07.01-set-the-scene.md` line 4322 (and `07.03` line 4622, `"20:00 to 02:00"`), her area gets grid power `"about six hours a day"`.
    2. In `02.01-set-the-scene.md` line 677, `02.03-tying-the-camel.md` line 983, and `canvas-data.md` line 330 (`means-and-backup-builder`), Khalil's uncle Nabil's shop has `"a generator that runs in the mornings"` (`09:00 to 13:00`), whereas `07.01-set-the-scene.md` line 4269 says `"he can charge it at his uncle's shop, which has a solar panel"`.
    3. `writer-pack.md` Section 7 line 203 defines Ahmad as `"23, graphic designer"`, whereas `04.01-set-the-scene.md` lines 2194 and 2198 state that Ahmad is `25`.
  - **Why it matters:** Continuity requires the recurring cast to keep identical facts (power hours, equipment, and ages) across all modules and canvases.
  - **Required fix:** Change `07.01-set-the-scene.md` line 4269 from `"which has a solar panel"` to `"which has a generator that runs in the mornings"`; align Yasmin's grid power hours between `01.01` line 16 and `07.01` line 4322 / `07.03` line 4622 (or state explicitly in `07.01` that her area's schedule changed that month from four hours in the day to six hours at night); and change Ahmad's age in `04.01-set-the-scene.md` lines 2194 and 2198 from `25` to `23` to match `writer-pack.md` Section 7.

- **[S2-5] Canvas text and chapter text mismatches in `same-work-two-intentions` (`06.02`), `three-stories-of-waiting` (`03.04`), and `what-is-mine-to-do` (`01.02`)**
  - **Location:**
    - `06.02-work-and-study-as-worship.md` (`course-chapters.md`, lines 3681 and 3691) vs. `content/import/faith-and-resilience/canvases/same-work-two-intentions.json` (`canvas-data.md`, lines 1463-1474)
    - `03.04-waiting-well.md` (`course-chapters.md`, lines 1868-1875 and 1916) vs. `content/import/faith-and-resilience/canvases/three-stories-of-waiting.json` (`canvas-data.md`, lines 764-777 and 822)
    - `01.02-the-unseen-and-our-part.md` (`course-chapters.md`, lines 195-210) vs. `content/import/faith-and-resilience/canvases/what-is-mine-to-do.json` (`canvas-data.md`, lines 113-125 and 146).
  - **Observation:** Three canvases conflict with the chapter prose around them:
    1. In `same-work-two-intentions.json` (`canvas-data.md` lines 1463-1474), Step 2 (`"11:00 - A bug on the contact form"`) explicitly contrasts the two aims by stating that under the first aim `"Tariq stays quiet and hopes to fix it tonight"`, whereas under the second aim `"he messages the client now with a new time"`. However, the post-canvas summary in `06.02-work-and-study-as-worship.md` line 3681 claims: `"The canvas kept every task the same: the same form, the same honest message, the same power cut, the same $150, the same money given to his mother."` In addition, the canvas puts the bug message at `11:00` (`canvas-data.md` line 1463), whereas the chapter's worked example (`06.02` line 3691) puts it `"at noon"`.
    2. In `03.04-waiting-well.md` line 1916, the paragraph introducing `<InteractiveCanvas slug="three-stories-of-waiting" />` tells the learner: `"Before you start, check your prediction from earlier in the chapter"` (which asked at lines 1868-1875 what Yusuf's request to the freed prisoner in `Quran 12:42` was). However, `three-stories-of-waiting.json` (`canvas-data.md` lines 764-777 and 822) never mentions Yusuf's request to the freed prisoner and gives a different `tryThis` prompt, so the prediction cannot be checked in the canvas.
    3. In `what-is-mine-to-do.json` (`canvas-data.md` lines 113-125), Step 1 (`"1. Five questions only Allah knows"`) names `"Will the client accept the proposal?"` in `description` as `"the first question"` and then lists five more questions in `details` (lines 120-124), making 6 unseen questions in Step 1 (and 9 worries in total when combined with the 3 actionable items in Step 2), whereas Step 3 (`canvas-data.md` line 146) and `01.02-the-unseen-and-our-part.md` line 206 state that there are `"Five of Yasmin's eight worries"` in `"Only Allah knows"`.
  - **Why it matters:** Continuity requires canvas text to match chapter text in facts, counts, timestamps, and prediction handoffs.
  - **Required fix:**
    1. In `06.02-work-and-study-as-worship.md` line 3681, replace `"the same honest message"` with `"the same bug on the contact form"`, and align `11:00` (`canvas-data.md` line 1463) with `"at noon"` (`06.02` line 3691).
    2. In `three-stories-of-waiting.json` (`canvas-data.md` lines 766-776 and 822), add Yusuf's request to the freed prisoner (`Quran 12:42`) as a means in Step 1 and reference the chapter's prediction in `tryThis`.
    3. In `what-is-mine-to-do.json` (`canvas-data.md` lines 115-125), make `"Will the client accept the proposal?"` one of the 5 items in `steps[0].details` (leaving 5 unseen questions and 8 worries total) to match Step 3 and `01.02` line 206.

- **[S2-6] Sentences exceeding the 30-word hard limit across chapters and `modelAnswer` blocks**
  - **Location:**
    - `01.03-why-hardship-comes.md` (`course-chapters.md`, line 324: 32 words; line 326: 34 words)
    - `01.04-qadr-and-taking-action.md` (`course-chapters.md`, line 480: 36 words)
    - `02.02-what-tawakkul-means.md` (`course-chapters.md`, line 825: 34 words)
    - `02.04-the-prophets-planning-the-hijra.md` (`course-chapters.md`, line 1126: 35 words)
    - `03.02-sabr-at-the-first-shock.md` (`course-chapters.md`, line 1573: 39 words)
    - `03.03-words-for-hard-moments.md` (`course-chapters.md`, line 1711: 34 words)
    - `04.02-practising-gratitude.md` (`course-chapters.md`, line 2320: 45 words; line 2363: 47 words)
    - `04.05-checklist.md` (`course-chapters.md`, line 2720: 34 words; line 2722: 39 words)
    - `05.03-shura-asking-people-who-know.md` (`course-chapters.md`, line 3059: 37 words; line 3104: 33 words)
    - `05.04-istikhara-asking-allah-to-choose.md` (`course-chapters.md`, line 3204: 32 words; line 3210: 31 words and 42 words)
    - `06.03-good-work-little-and-often.md` (`course-chapters.md`, line 3827: 41 words)
    - `06.04-after-a-failure.md` (`course-chapters.md`, line 3981: 43 words)
    - `06.05-quiz.md` (`course-chapters.md`, line 4111: 34 words)
    - `06.06-checklist.md` (`course-chapters.md`, line 4203: 51 words)
    - `07.03-caring-for-body-and-mind.md` (`course-chapters.md`, line 4551: 43 words; line 4563: 39 words)
    - `07.04-quiz.md` (`course-chapters.md`, line 4713: 43 words)
    - `07.05-capstone-your-steady-plan.md` (`course-chapters.md`, line 4789 `summary`: 50 words)
    - `openquestion` `modelAnswer` blocks in `01.05` (line 636: 38 and 66 words), `02.06` (line 1383: 37, 68, 64, and 34 words), `03.06` (line 2156: 38 words), `04.05` (line 2756: 35 words), `05.06` (line 3459: 68 words), `06.06` (line 4242: 46 words), `07.05` (line 4928: 52 and 48 words), and `07.06` (line 5040: 73 words).
  - **Observation:** Twenty-one learner-facing sentences across seventeen chapters (plus sentences in all eight `modelAnswer` blocks) exceed the 30-word hard limit, reaching 45 to 51 words in learner prose (`04.02` lines 2320 and 2363, `06.04` line 3981, `06.06` line 4203, `07.03` line 4551, `07.05` line 4789) and up to 73 words in `modelAnswer` strings.
  - **Why it matters:** `writer-pack.md` Section 2 sets a strict sentence-length rule for second-language English learners reading on phones: "Short sentences (aim under 20 words, never over 30)."
  - **Required fix:** Split each listed sentence over 30 words into two or three shorter sentences under 30 words (for example, place the narrator attribution in its own sentence before the hadith meaning in `02.02`, `04.02`, `05.03`, `06.03`, and `07.03`, and break multi-item clauses in `04.05`, `06.06`, `07.04`, `07.05`, and all eight `modelAnswer` strings into separate sentences).

- **[S2-7] Core Arabic terms defined in full multiple times across chapters instead of once at first use**
  - **Location:**
    - `qadr`: `01.01-set-the-scene.md` line 83 (inline), `01.01` line 106 (`## Key words`), and `01.04-qadr-and-taking-action.md` line 461
    - `tawakkul`: `02.01-set-the-scene.md` line 662 (`<BigWordAlert>`), `02.01` line 701 (inline), and `02.02-what-tawakkul-means.md` line 811
    - `sabr`, `sabr jamil`, `istirja`: `03.01-set-the-scene.md` lines 1459, 1465, 1506-1507, `03.02-sabr-at-the-first-shock.md` lines 1545 and 1567, and `03.03-words-for-hard-moments.md` line 1697
    - `shukr`, `raja'`, `khawf`: `04.01-set-the-scene.md` lines 2237, 2239, 2248-2249 (and `## Key words`), and `04.03-hope-and-fear-in-balance.md` line 2478
    - `shura`, `istikhara`: `05.01-set-the-scene.md` lines 2784, 2812-2813, 2848-2849, `05.03-shura-asking-people-who-know.md` line 3051, and `05.04-istikhara-asking-allah-to-choose.md` line 3187
    - `niyyah`, `ihsan`, `tawbah`: `06.01-set-the-scene.md` lines 3485, 3566, 3580-3582, 3601-3602, and `06.03-good-work-little-and-often.md` line 3799.
  - **Observation:** Core Arabic terms are defined in full two or three times: first in `<BigWordAlert>` or inline prose in `0X.01`, a second time in the `## Key words` table of `0X.01`, and a third time in `0X.02`, `0X.03`, or `0X.04` (for example, `04.03` line 2478 writes: `"In this course, raja' (hope) means hope in Allah's mercy, and khawf (fear) means the awareness that keeps you careful about your own wrong choices. Both words were in the key words of 4.1."`).
  - **Why it matters:** `writer-pack.md` Section 5 (`Step 2: Learn`, line 137) states: "Never define the same term twice in the course: after its first definition, refer back ('the tawakkul you met in 2.2')."
  - **Required fix:** Keep the full plain-English definition at the term's first appearance in `0X.01`, remove duplicate inline parenthetical definitions in `0X.01`, and replace the full re-definitions in `01.04`, `02.02`, `03.02`, `03.03`, `04.03`, `05.03`, `05.04`, and `06.03` with short back-references (such as `"the raja' and khawf you met in chapter 4.1"`).

### S3 - Minor (polish)

- **[S3-1] English idioms and figures of speech in learner-facing prose**
  - **Location:**
    - `01.01-set-the-scene.md` (`course-chapters.md`, line 7: `"eats the time"`; line 93: `"eating the hours"`)
    - `01.02-the-unseen-and-our-part.md` (`course-chapters.md`, line 223: `"felt a knot in her stomach"`)
    - `01.03-why-hardship-comes.md` (`course-chapters.md`, line 326: `"closes the door on the late-night thought"`)
    - `01.04-qadr-and-taking-action.md` (`course-chapters.md`, line 470: `"joins the two beliefs in one breath"`)
    - `06.04-after-a-failure.md` (`course-chapters.md`, line 3953: `"drowning in guilt"`, `"brushing off a real wrong"`; line 4037: `"'if only' dressed up as learning"`)
    - `07.02-serving-others.md` (`course-chapters.md`, line 4436: `"keeping score"`; line 4458: `"keep score"`)
    - `07.06-checklist.md` (`course-chapters.md`, line 4987: `"What has stuck"`; line 4988: `"catches you"`; line 5005: `"stay in the head"`; line 5045: `"stirred up something heavy"`).
  - **Observation:** These passages use idiomatic or figurative phrasing instead of literal words.
  - **Why it matters:** `writer-pack.md` Section 2 ("No idioms or figures of speech: say the literal thing") and `03-authoring-standards.md` Section 2 require literal phrasing for second-language readers.
  - **Required fix:** Replace each idiom with literal wording: `"takes the time"` / `"taking the hours"` (`01.01` lines 7, 93), `"still felt worried"` (`01.02` line 223), `"answers the late-night thought"` (`01.03` line 326), `"joins the two beliefs in one sentence"` (`01.04` line 470), `"feeling heavy guilt"` and `"ignoring a real wrong"` (`06.04` line 3953), `"'if only' made to look like learning"` (`06.04` line 4037), `"counting favours"` (`07.02` lines 4436, 4458), and `"What you remember"`, `"happens to you"`, `"stay only in your thoughts"`, and `"brought up difficult feelings"` (`07.06` lines 4987, 4988, 5005, 5045).

- **[S3-2] Missing source references in Gate `<ChapterRecap>` components in Modules 3, 4, 5, 6, and 7**
  - **Location:**
    - `03.06-checklist.md` (`course-chapters.md`, line 2158)
    - `04.05-checklist.md` (`course-chapters.md`, line 2758, points 2 to 5)
    - `05.06-checklist.md` (`course-chapters.md`, line 3461)
    - `06.06-checklist.md` (`course-chapters.md`, line 4245)
    - `07.06-checklist.md` (`course-chapters.md`, line 5049).
  - **Observation:** `writer-pack.md` Section 5 (`Step 3: Gate`, line 177) requires `<ChapterRecap points={[...]} />` to have "4 to 5 short strings, each with its source reference." Modules 1 (`01.05` line 638) and 2 (`02.06` line 1385) include source references in every `<ChapterRecap>` string, but `03.06`, `05.06`, `06.06`, and `07.06` omit all source references, and `04.05` includes a source reference only in point 1.
  - **Why it matters:** Consistent source citations in the module gate recap help learners connect each summary takeaway back to its Quran or Sunnah source.
  - **Required fix:** Add the corresponding Quran or hadith reference (and grading where required) to each `<ChapterRecap>` string in `03.06`, `04.05` (points 2-5), `05.06`, `06.06`, and `07.06`.

- **[S3-3] Inconsistent spelling of `rak'a` / `rak'as` vs. `rak'ahs` between `05.04` and `istikhara-step-by-step.json`**
  - **Location:** `05.04-istikhara-asking-allah-to-choose.md` (`course-chapters.md`, lines 3204, 3206, 3253, 3272) vs. `content/import/faith-and-resilience/canvases/istikhara-step-by-step.json` (`canvas-data.md`, lines 1341 and 1383)
  - **Observation:** `05.04-istikhara-asking-allah-to-choose.md` spells the word `rak'a` / `rak'as` (matching `research.md` line 550), whereas `istikhara-step-by-step.json` spells it `rak'ahs` at lines 1341 and 1383.
  - **Why it matters:** `writer-pack.md` Section 3 (`Transliteration`) requires spelling transliterated terms one way across the whole course.
  - **Required fix:** Change `rak'ahs` to `rak'as` in `content/import/faith-and-resilience/canvases/istikhara-step-by-step.json` (`canvas-data.md`, lines 1341 and 1383).

---

## What works

- **Exemplary source discipline against `research.md`:** Every Quran verse, hadith number, grading, story detail, and Arabic block in all 40 chapters comes strictly from `research.md`. Popular weak or fabricated sayings on this topic (such as `ma khaba man istakhara`, the `itqan` hadith, the Umar report on `mutawakkilun`, and the Ta'if dua) are completely absent, and battle-context texts (`2:216`, `3:159`, `3:173`, `9:40`, `Bukhari 2731`) are cited strictly in their general meaning without war narratives.
- **Safe, compassionate handling of hardship and grief:** The course never shames learners, never equates sadness or worry with weak faith, never tells a learner that a personal loss happened as a punishment or because Allah loves them, and consistently pairs faith with practical means and professional care. Every reflection, gate, and capstone provides a complete fictional case so personal sharing is genuinely optional, and the human contact sentence (mentor or fellowship coordinator) plus the professional-care disclaimer appear in every loss, failure, care, and capstone chapter.
- **Zero punctuation slop or AI filler:** Neither `course-chapters.md` nor `canvas-data.md` contains a single em dash (U+2014), en dash (U+2013), forbidden slop word (`delve`, `journey`, `navigate`, `embrace`, `unlock`, `key takeaways`), external link, or company name.
- **Strong practical transfer and assessment design:** Every Learn chapter moves from belief to concrete steps with times, numbers, and backups suited to Gaza power and internet realities, and all 65 MCQs test realistic situations with thoughtful, non-shaming explanations for every option.

---

## Recommendation

- [ ] **Approve** (all dimensions >= 4, average >= 4.3, zero S1/S2)
- [x] **Revise** (targeted fixes to named sections; re-run affected critic lenses only)
- [ ] **Rewrite from brief** (structural or voice failure across the artifact)
