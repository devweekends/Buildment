---
artifact: course-brief
course: faith-and-resilience
working_title: "Steady Hearts: Islamic Belief for Uncertain Times"
version: 1
status: accepted by sponsor (G0) on the sponsor's written request
owner: Zeeshan (architect and sponsor)
target_publish: after G2B instructor sign-off, a qualified Islamic scholar's review and human review
---

# Course brief: faith-and-resilience (course 11)

## Why this course exists

The sponsor asked for a course on the Islamic belief system "so people can survive in the era of uncertainty". The fellows live with uncertainty every day: power and internet cuts, unclear futures, clients who go silent, scholarships and jobs that may or may not come, and loss. Courses 3 to 10 teach decisions, communication, ownership and clear thinking, but none of them speaks to what gives a fellow steadiness from the inside. For most fellows that source is their faith. This course teaches the core Islamic beliefs and practices that shape how a believer plans, works, waits, decides, handles loss and failure, and keeps going, always paired with action (taking the means).

## One sentence

Fellows learn how Islamic belief (trust in Allah with effort, patience, gratitude, hope, sound decisions with consultation and istikhara, sincere intention and good work, and community) helps them stay steady and act well when the future is uncertain.

## Where it sits

Course 11 in the pipeline numbering. It stands alone and can be taken at any time; it pairs well with course 6 (Ownership, Initiative and Adaptability) and course 3 (Decision-Making), which teach the practical side of resilience and choosing. It is not a fiqh (rulings) course and not a course on comparative theology.

## Learner
- **Who:** Gaza fellowship fellows building careers in tech and remote work. Almost all are Muslim; the course is written for believers who want to deepen and apply what they already hold, and it is respectful to any learner who reads it.
- **Prior knowledge:** plain English reading. Basic familiarity with Islam (prayer, the Quran, the Prophet, peace be upon him) is assumed; no study of Islamic sciences is needed.
- **Language:** Arabic first; English as a second language. Short sentences, common words, every term defined on first use. Key Arabic terms (tawakkul, sabr, qadr, shukr, dua, niyyah, shura, istikhara) are named in Arabic and explained in English. Short Arabic phrases (for example a dua) may appear in Arabic script, verbatim from a checked source.
- **Device and connection:** mostly phones, weak or expensive data, power cuts. Light pages, no images, no audio or video, every interaction saves on its own.
- **Time available:** about 16 hours, for example 45 minutes a day over 3 to 4 weeks.
- **Motivation:** feel steady when plans keep breaking; stop being frozen by worry or by "what if"; make decisions they can live with; keep working well through waiting and setbacks.
- **What they will do with the result:** a personal "steady plan" for one uncertain situation, and habits they use in study, freelance work, job searching and family life.

## Outcome
By the end, the learner can:
1. **Separate** what is in their control from what only Allah knows and decides, and **name** their next step in an uncertain situation.
2. **Explain** tawakkul as trust in Allah together with taking the means, and **plan** the means (including a backup plan) for a real or provided case.
3. **Respond** to loss, delay and waiting with sabr that keeps acting, using the words and duas the sources teach, and **tell** sabr apart from silence, giving up or hiding need.
4. **Practise** gratitude and hope in balance, and **recognise** despair and carelessness as the two ways the balance breaks.
5. **Make** a decision under uncertainty with research, shura (consulting people who know) and istikhara, and **say** what istikhara is and is not.
6. **Set** a sincere intention for work and study, **do** good work a little and often, and **start again** after a failure without "if only".
7. **Serve** others and **ask** for help, including from a mentor or a professional, as part of faith, not a failure of it.
8. **Build** a steady plan for one uncertain situation and **walk** a mentor through it.

## Demo
In five minutes the fellow walks a mentor through their steady plan (their own situation or a provided case): what is in their control and what is not, the means they will take and their backup, the people they will consult, the dua and the weekly rhythm they will keep, and what they will do if it does not work out.

## Product scope
Not applicable as written: there is no software product. Read as **course scope**:
- **Must have:** seven modules; a case opening every module; a registered interactive canvas in every Learn chapter; a quiz chapter of five questions from module 2; a gate with checklist, learning log and an open question in every module; a mixed review before the capstone; the capstone steady plan with three provided cases; every Quran and hadith reference checked in the research dossier.
- **Should have:** short Arabic text for a few duas and phrases; a Mermaid diagram in every non-gate chapter.
- **Out of scope:** see Non-goals.

## Production bar
Not applicable as a code production bar. The equivalent bar:
- **Every Quran verse cited with surah and ayah number; every hadith with collection, number and grading.** Only sahih or hasan hadith from recognised collections. The research dossier is the source of record; nothing reaches learners that the dossier does not support.
- Translations are paraphrased meanings, labelled as meanings and checked against named translations; quotations are short.
- **A qualified Islamic scholar reviews the roadmap and every chapter before publishing.**
- Every graded key follows from a teaching in the course, never from opinion or a disputed ruling; it is re-answered blind by an independent reviewer.
- `content:validate:source`, `content:audit` and `agent-ip/scripts/audit-course.mjs` results recorded; import and a click-through at 375px and desktop, light and dark.

## Variants
Not applicable: a foundation course has no product to vary.

## Constraints
- **Stack:** the buildment reader and existing blocks; canvases only on registered renderers (sequence, state machine, factor, slider, timeline), each with a 14A spec.
- **Budget:** about 16 hours core, inside the soft-skills band of 8 to 20 hours, with the full agent-ip prose minimums.
- **Platform limits:** state machine grids at most 3 columns by 2 rows; one canvas per chapter, none in gates or quizzes; categories are only tech and soft-skills.
- **Content and safety:**
  - Gentle, sincere, hopeful and practical. Never preachy, never shaming, never "if you had more faith this would not happen".
  - Never trivialise hardship or make it dramatic. No politics, no war, no battles as case material, no current events.
  - No sectarian disputes, no fatwas, no rulings beyond the sources. Where scholars differ, say so briefly and point to a local scholar.
  - Belief is always paired with action (taking the means).
  - Personal struggles are shared only if the learner wants to, and every prompt that invites them offers a provided case instead. Nothing personal is graded.
  - A real person (the learner's mentor or the fellowship coordinator) is named as the contact for wellbeing, never a bot.
  - The course does not replace professional mental health care; it says so in the chapters on loss and on care, and in the capstone.
  - Respect for the Prophet, peace be upon him, the prophets and the companions in every mention.

## Non-goals
- **No fiqh course:** no rulings on prayer, fasting, money or work beyond what a cited source states plainly.
- **No theology debates or comparison of schools or sects.**
- **No counselling or therapy.** The course teaches belief and habits; it refers to people for care.
- **No stories that the research cannot verify** (popular sayings attributed to the Prophet or the companions without a sound chain).
- **No political or historical analysis.**

## Success signals
- Gate answers name concrete means and a next step, not only a feeling.
- Capstone plans include both trust and action: a dua and a backup plan, a person to consult and a date.
- Fellows and mentors report the course as kind and useful, not preachy.
- The scholar's review finds no misquoted verse, no weak hadith and no overstated ruling.
