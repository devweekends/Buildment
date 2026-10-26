---
artifact: critique
course: founder-interviews
reviewer: critic-b
review_type: slop, readability, continuity, accuracy, tone
version: 1
artifact_under_review: courses/founder-interviews
scorecard_average: 3.86
blocking_defects: 2
recommendation: revise
---

# Critique B: The Founder Interview (slop, readability, continuity, accuracy, tone)

## What I reviewed

- All 41 chapters in `courses/founder-interviews/` and `course.yaml`, read in full (87,000 words including quiz, drill and model-answer fences; the repo audit counts 46,183 prose words).
- The brief `00-course-brief.md`, the roadmap `curriculum-roadmap.md` and the dossier `research.md` (Phrase-it-this-way lines, Credits table, S1 to S68, U1 to U20).
- The `data.ts` of all 19 canvases embedded by the chapters (I did not open `spec.md`, `qa/`, `context-packs/`, `decision-log.md`, `run-log.md` or `routing.yaml`).
- Rules applied: `agent-ip/agents/critic.md`, `06-quality-gates.md`, `00-principles.md`, `03-authoring-standards.md`, plus the audience rules in the review request.
- Checks I ran: a sentence-length scan per chapter (prose only, tables, fences and Mermaid excluded); a dash, link, exclamation, forbidden-word and real-name scan; a repeated-sentence and near-duplicate-paragraph scan across chapters; a pass over every quiz option; a recomputation of every percentage, sum and count in the chapters and canvases; and a read-only run of `node agent-ip/scripts/audit-course.mjs courses/founder-interviews` (41 chapters, "Needs work: 0").
- Not done: no rendering, no import, no 375px click-through. Instructor alignment is not scored: `curriculum-roadmap.md` lists `instructors_reviewed: []` and I was shown no confirmation record.

## Headline

The voice is plain, calm and honest, and the reading level is better than most courses I have seen for this audience: the mean sentence is 12.3 words, 3.3 percent of prose sentences pass 25 words, and only 5 pass 35. There are no dashes, links, exclamation marks, forbidden words or war and politics. Privacy rules sit before every drill, the drills are optional, and "I did not measure that" is rewarded everywhere.

It is not ready. Continuity is the weak point: the cast of about 70 people is built from a small pool of recycled names that change jobs from one vignette to the next (in the same module for Osama, Duaa and Jamal), Fadi and Reem contradict themselves, and the provided fellow Hadeel carries three factual inconsistencies. The capstone's own worked example of attribution (Layla) computes a share on a denominator that the text never justifies, and the mentor key repeats it. A handful of research sentences state more than the dossier allows. The "break" and "hold" metaphors carry the whole teaching vocabulary without being explained, and the 22 Learn chapters and 6 gates follow one template with verbatim gate boilerplate.

Two S2 defects block the gate. Twenty-one S3 and six S4 defects follow. Most are cheap to fix.

## Scorecard

| # | Dimension | Score | Reason |
|---|---|---|---|
| 1 | Outcome alignment | 4 | Each chapter maps to O1 to O7 in the roadmap, and gates test the same evidence as the chapters. Minor: 4.5 and the course.yaml goals disagree about whether the quiz has an AI case. |
| 2 | Domain specificity | 4 | Cases carry real numbers, sources and constraints. Lowered by repeated scenarios (B-10). |
| 3 | Depth over coverage | 4 | Five answer qualities taught deeply, no question list. The 41-chapter spine repeats one template (B-14). |
| 4 | Prose quality | 4 | Short, concrete sentences, no forbidden patterns. Held at 4 not 5 by the figurative break/hold vocabulary (B-12), stock phrases (B-14) and verbatim gate text (B-15). |
| 5 | Chapter structure | 4 | Hook, concept, worked example, decision, verify, reflect and bridge are all present and in order. |
| 6 | Interaction purpose | 4 | Predict, canvas and quiz each produce evidence. The canvases are doing real work; the pedagogy critic covers fit. |
| 7 | Assessment quality | 3 | Distractors are strawmen: the keyed answer is almost the only option without absolutes or intensifiers (B-17); one item contradicts earlier chapters (B-03). The assessment critic should confirm. |
| 8 | Difficulty calibration | 4 | Support fades from provided case to own case. Gaps: B-18. |
| 9 | Cognitive load | 3 | About 70 named people, repeated vignettes, 2,000-word chapters read on a phone, four-column rubric tables (B-02, B-10, B-21, B-24). |
| 10 | Prerequisite integrity | 4 | Later modules reuse earlier ones correctly. Business terms are used without definition (B-13) and Hadeel is used before she is introduced (B-05). |
| 11 | Technical accuracy | 3 | All canvas totals and 30-plus percentages recompute correctly. But one capstone model computes a share on an unjustified base (B-01), one rule contradicts its canvas (B-06), and several research sentences go past the dossier (B-07, B-08). |
| 12 | Production-grade coverage | 5 (N/A) | Soft-skill course, no build. |
| 13 | Security and integrity | 4 | Privacy rule before every drill, no keys or personal data in the content. Gap: the course never says where pasted text goes or what a key is (B-19). |
| 14 | Accessibility | 4 | Short sentences, headings in order, text explanation after every diagram. Four-column rubric tables are hard on a phone (B-21). |
| 15 | IP protection | 4 | Capstone solution is not given away, but quiz 7.3 Q3 previews capstone question 4 (B-11). |
| 16 | Variant distinctiveness | 5 (N/A) | No variants in v1. |
| 17 | Continuity | 3 | Protagonists Samer, Leen, Karam, Mais, Yazan, Nour and Tala are consistent across chapters and canvases. Side characters and Hadeel are not (B-02 to B-05, B-09). |
| 18 | Learner agency and curiosity | 4 | Learners choose stories, predict before they see, and are told "I did not know" is a full answer. |
| 19 | Instructor alignment | not scored | No confirmation record shown; roadmap has `instructors_reviewed: []`. |
| 20 | Interactive canvas quality | 4 | I checked data and wording only. Every total in the factor and slider canvases matches the chapter text. Small wording drift (B-26). |
| 21 | Explanatory depth | 4 | The audit passes (1,291 to 1,679 prose words in Read and Learn chapters). Mechanism, worked example, trade-off and failure are in every Learn chapter. |
| 22 | Visual explanation quality | 3 | Several diagrams retell the dialogue just read (B-16). The best ones (3.2, 4.2, 5.2) argue. |

Average over the 21 scored dimensions, with the two N/A dimensions counted as 5: **3.86**. Average over the 19 dimensions that apply: **3.74**. Both are below 4.3. Dimensions 7, 9, 11, 17 and 22 are at 3 and need revision and a re-score. Two S2 defects are open.

## Defects

Severity counts: S1: 0. S2: 2. S3: 21. S4: 6. Total: 29.

### S2: must fix before publish

**B-01 | S2 | The capstone's model of attribution divides by a base the text never justifies**
- Location: `07-the-full-interview/07.04-capstone-full-interview.md`, "Worked example: Layla", first paragraph; and the `modelAnswer` of the capstone `openquestion` (Layla, Story 1), which is the mentor key.
- Observation: Layla has 12 late jobs of 60 before and 6 of 60 after. The text says "4 of the 12 late jobs before were rush jobs. Without them, 8 of 56 were late before, about 14 percent, against 10 percent after. So Layla claims about 4 points, not the 10." Taking the 4 late rush jobs out of both the late count and the job count assumes that every rush job in the 60 was late and that there were exactly 4. The text never says how many rush jobs there were. If there were 6, the fair base is 8 of 54 (15 percent); if 10, it is 8 of 50 (16 percent). The "after" period had no rush jobs, so its 60 is a different mix. The calculation picks the base that gives the neat story, which is the error "Choosing the best weeks" in 2.2 warns against.
- Why it matters: this is the course's last and fullest model of "how much was yours", and the mentor key tells mentors to accept it. Fellows will copy the move of deleting problem cases from the denominator.
- Required fix: state the number of rush jobs in the before period and how many were late (for example "6 of the 60 were rush jobs, 4 of them late"), then compare non-rush jobs on both sides, or drop the adjusted rate and say "8 of the 12 late jobs were not rush jobs; after, 6 were late, so I treat about 2 fewer late jobs as my hint". Make the same change in the model answer and mentor key.

**B-02 | S2 | The same first names are reused for different jobs, in the same module and across modules**
- Location: whole course; the clearest cases are below.
- Observation: about 70 named people appear in 41 chapters, many of them in one-off quiz stems. A small pool of names is recycled and the job changes.

| Name | One place | Another place |
|---|---|---|
| Osama | 05.02: "a developer at a logistics company", Yazan's friend | 05.04: "a product designer at a university club" (same module) |
| Duaa | 05.03: Yazan's cousin who "runs a small bakery" | 05.05 Q1: "a data analyst at a clinic"; 06.04: applying for "a design role"; 06.05: "data analyst for a clinic" |
| Jamal | 05.03: operations coordinator at a translation agency | 05.05 Q3: "a backend developer who built the checkout"; 06.02: "a mobile developer"; 06.06: operations coordinator at "a small online shop" |
| Mazen | 03.02: "operations assistant at a small online shop" | 03.06: "a junior developer who built an online booking form for a small gym" |
| Sana | 05.02 and 05.05: operations coordinator at a charity shop | 06.03: "a data analyst" |
| Manar | 05.02: "a product designer" | 06.05: "a QA tester" |
| Karim | 05.06: "a frontend developer" | 06.05: "a freelance designer" |
| Lama | 03.04: a student who runs a university club's events | 03.05: "keeps the stock sheet for a charity shop" |
| Ruba | 03.03: volunteer at a charity shop (coats) | 03.05: designed a club's event poster |
| Tamer | 03.03: built dark mode in a notes app | 04.02: "a backend developer" |

- Why it matters: the review request names this exact risk. A second-language reader on a phone reasonably assumes the same name is the same person and looks for the link. In module 5 it happens twice in the same module. The "sign-up" and "stock sheet" vignettes already look alike (B-10), so the name is often the only handle the reader has.
- Required fix: give each recurring name one job and one set of facts for the whole course, or stop naming one-off quiz stems ("a designer", "a support analyst"). A simple register of names and jobs, checked before release, prevents this. Keep Samer, Leen, Karam, Mais, Yazan, Nour and Tala for their own modules and reuse them in the same module's quizzes rather than introducing new people.

### S3: fix before publish or track

**B-03 | S3 | Fadi counted crashes in 2.2 and 2.4 and "never counted crashes" in 2.5**
- Location: `02.02` and `02.04` (Fadi, "a bug that made an app close by itself", 12 crashes for every 1,000 sessions down to 5, from the crash report tool) against `02.05-quiz.md` Q4: "Fadi fixed a bug that made an app close by itself, but he never counted crashes."
- Why it matters: same name, same bug, same phrasing, opposite facts, in the quiz that follows the two chapters.
- Required fix: rename the 2.5 person and change the bug, or change the premise to "Fadi's team lead never shared the crash numbers".

**B-04 | S3 | Reem is the author of the version-name rule in 1.2 and not in 1.5**
- Location: `01.02` ("I added a version name to every file and a check before sending") against `01.05` Q4 ("The operations lead chose a rule that every file gets a version name. Reem added the names"). Both use six complaints before and two after. `01.03` uses Reem for a third project (the tracking sheet).
- Why it matters: 1.5 is the quiz on module 1, so a careful learner is told Reem owned the idea in one chapter and did not in the next, in a quiz about exactly that distinction.
- Required fix: use a different person for 1.5, or change 1.2 so the rule is hers and the lead only approved it. Give Reem one project.

**B-05 | S3 | Hadeel, the provided case, disagrees with herself and is used before she is introduced**
- Location: `01.06`, `03.06`, `07.04` (Hadeel on a "six-month remote internship", yet "At one clinic she watched three patients struggle with one long form on a phone"; in the capstone transcript the patients "asked the receptionist for help"); `02.06`, `03.06`, `07.04` (frontend developer; "Hadeel built [the reminders] and chose 18:00") against `05.06` ("She did not change the server, because the backend developer was busy with the reminders"); `01.02` to `01.04`, `02.02` ("Hadeel's second line") and `02.03` to `02.04` use her before `01.06` is the first place she is introduced, and 02.02 cites a "second line" of a resume the learner has not seen.
- Why it matters: Hadeel is the case every learner may be asked to use at every gate, and the mentor keys depend on her facts. A remote intern who watches patients in a clinic needs one line of explanation (a visit, a recorded session). A frontend developer who builds text-message reminders while a backend developer is busy with the reminders reads as two stories.
- Required fix: add two lines to 1.1 that introduce Hadeel (fictional fellow, age, role, six-month remote internship, five-person team) so every later "Hadeel's" is not orphaned; explain how she saw the patients; say plainly who built which part of the reminders (for example: the other developer built the sending service, Hadeel built the reminder rule and chose 18:00) and use it in 2.6, 3.6, 5.6, 7.4 and the mentor keys. In 2.2 say "Hadeel's resume (shown in full in 3.6)" or put the line in the text.

**B-06 | S3 | Mais's spoken rule contradicts the rule taught in the same chapter and the canvas**
- Location: `04.04`, opening: "If it reaches 35 or more, I would keep it." The rule in the chapter, and `decide-and-measure/data.ts` (`gap >= 0 && gap >= swing`), keep only when the result is at least one normal swing above the line: with line 35 and swing 2, 35 is "too close to call", and keep starts at 37.
- Why it matters: the chapter teaches that the line is set before looking and that a result on the line is inside normal swing, and then models the opposite in the first answer.
- Required fix: change the spoken line to "If it reaches 37 or more, I would keep it, and if it is 33 or lower, I would stop", or state the swing in her answer.

**B-07 | S3 | Research and course-reasoning sentences that go past what the dossier allows**
- Location and observation:
  - `01.02`: "Notice also that those were planned interviews." The dossier says the Bangerter study recorded 62 selection interviews and does not say they were planned or structured. Unverified claim stated as fact.
  - `03.02` and the `resume-line-why-chain` canvas `limits`: "No study has tested it as an interview method." The dossier says no study of five whys as an interview method was found (finding 4). Say "I did not find a study" or "we do not know of one".
  - `04.01`: the coaching study "found that those who went to coaching and prepared specifically did better ... partly through better-organised answers". The dossier says coaching and preparation went with better performance (S4, one setting, correlational).
  - `06.04`: "Nervous candidates did as well at work." S27 and S28 report near-zero correlations in two samples (medium confidence). Say "anxiety did not predict".
  - `06.04`: "A planned pause at the start is different from a long pause in the middle of a sentence. Short sentences make the second kind rarer, because there is less to hold at once." The dossier marks this as "course reasoning; not directly tested". The chapter does not label it.
  - `06.04`: "Do not try to change your accent in the week before an interview. It will not work, and it will add worry." This is stated as fact with no source; pronunciation training is out of scope in the roadmap.
- Why it matters: the dossier is the standard and the review request says no unverified claim as fact. The audience takes plain statements literally.
- Required fix: rephrase each as the dossier's "Phrase it this way" line allows, or label it "this is course advice, not research".

**B-08 | S3 | Five whys credit names a person and adds a detail the dossier does not give, before the instructors decide**
- Location: `03.02`: "An engineer at a large Japanese car maker, Taiichi Ohno, told teams to ask 'why?' when a machine failed, and then to ask 'why?' about each answer, until they reached something they could fix."
- Observation: the dossier credits the five whys as "Attributed to Taiichi Ohno" and U7 says the exact wording and origin are unverified. Roadmap open decision 2 (name Ohno or say "from factory problem-solving in Japan") is unresolved, and `instructors_reviewed` is empty. The chapter also states what he "told teams" as history.
- Required fix: until the instructors decide, use "The five whys is attributed to an engineer who helped build a Japanese car maker's production system" (the dossier's wording) and drop "told teams to ask". Record the decision.

**B-09 | S3 | Two chapters give timelines that contradict the 3-week course**
- Location: `07.01`: "For ten weeks she has used the AI interviewer at the end of the course modules" and "Ten weeks later"; `07.04`: Layla "Over six weeks she has done several practice interviews".
- Why it matters: the brief and the course description promise about 3 weeks of 3 to 5 hours. A fellow who reads "ten weeks" may think they are behind or that the course is longer.
- Required fix: use "three weeks" and "four practice interviews", or remove the number.

**B-10 | S3 | The same scenario is reused across chapters**
- Location and observation:
  - "14 coats the shop did not have, gifts counted twice": Adam in `01.02` Q1, an unnamed "volunteer ... she" in the `01.06` strong answer and model answer.
  - Charity-shop stock sheet: Adam (`01.02`, `01.04`, `02.02`), Ruba (`03.03`), Lama (`03.05`), Sana (`05.02`, `05.05`), Wael (`05.04`), Fares (`07.02`, `07.03`, `07.05`), plus the volunteer in 1.6. That is seven people and about fourteen chapters.
  - "Load time fell about 40 percent, ten loads on the cheapest test phone": Tareq (`02.05` Q1, 2.5 to 1.5 seconds), the print shop (`02.06` model answer, 5 to 3), Iyad (`03.02` and canvas, 5 to 3), Karim (`05.06`, 7 to 3). Hadeel's version is the provided case and is fine.
  - Translation agency: Reem, Jamal, Majd, Layla.
  - "Sign-up form for a club": Salma in four chapters with different facts, Lama, Wael, Mustafa.
- Why it matters: repeated examples blur which facts belong to which person, and they weaken "specific beats generic" because the reader cannot tell the course's cases apart.
- Required fix: keep one charity-shop case (Adam) and one load-time case (Hadeel), and change the others to different products and numbers.

**B-11 | S3 | Quiz 7.3 Q3 previews the capstone's case question**
- Location: `07.03-quiz.md` Q3 (orders fell from 450 to 300, delivery fee up from $3 to $5, a new payment step, one developer for two weeks; the keyed answer "I assume both matter. I restore the $3 fee first ... watch ... If flat, I check the payment step") against `07.04` written-version question 4 ("A small online shop got 450 orders a month. Last month it got 300. The shop also raised its delivery fee last month.").
- Why it matters: the mixed review hands the learner a worked answer to the capstone's case question the next chapter. It also repeats Mais's 4.x case.
- Required fix: change the numbers and domain in 7.3 Q3, or change capstone question 4.

**B-12 | S3 | Figurative language and idioms a second-language reader will not parse**
- Location and observation: the core teaching verbs are metaphors that are never explained. "Break" and its forms appear 57 times in 25 chapters ("breaks at the second why", "the claim breaks", "a chain that breaks"); "hold" and its forms 62 times in 24 chapters ("holds under the next why", "gave the founder nothing to hold"); "falls apart" or "fell apart" 7 times. Other expressions:
  - `01.01`: "when a problem lands on their desk", "wants to catch you out", "keeps digging ... the digging ends with nothing", "the path goes round the team".
  - `01.02`: "costs you a turn", "you lose a turn".
  - `01.03`: "He hears a blank".
  - `02.01`: "Some people stretch the truth on resumes".
  - `02.02`: "Ten is half as much again as 6.7".
  - `02.04`: "a little better than a coin toss".
  - `03.01`: "the line is a gamble"; `03.04`: "is a gift"; `04.01`: "hand the choosing back to the founder"; `04.02`: "can sink your whole answer"; `04.03`: "the back of an envelope"; `04.04`: "that could be noise", "the swing around it"; `05.03`: "Your words are the taps"; `05.04`: "ladder", "rungs".
  - Quiz stems use "swing" and "line" for statistical ideas.
- Why it matters: `03-authoring-standards.md` asks writers to explain or replace idioms and business phrases. A reader who does not know that "an answer breaks" means "cannot be answered at the next question" will still follow the story but not the lesson's key sentence.
- Required fix: define "break" and "hold" once in 1.1 (for example: "When we say an answer breaks, we mean the next why has no answer"), then use "fails" or "cannot be answered" in most places. Replace or gloss the other phrases above ("one fewer than" for "half as much again"; "a little better than guessing" for "coin toss"; "exaggerate" for "stretch the truth").

**B-13 | S3 | Business and technical words are used without being defined**
- Location and observation:
  - "conversion" (Karam's headline resume line, 3.1 to 3.4, also 2.2), "funnel" (8 uses), "friction" (13 uses in 3.1 and 3.3): never defined, although they are the words of the failing answer the learner must recognise.
  - "onboarding" (3.1, 4.3, 4.5), "shipped/ship" (13 uses; first in 1.1 and in the definition of "end to end"), "frontend" (13 uses, never defined although "backend" is defined once in 1.1), "pilot" (3.2), "sync" (5.3 quiz, 7.3), "median" (4.4, once).
  - "the middle of 10 loads" / "middle value" appears in nine files (2.5, 2.6, 3.6, 5.6, 6.6, 7.4 and others) and is never explained as "sort the ten numbers and take the middle one".
  - "key" (1.1: "It runs on your own key") is never defined (see B-19).
- Required fix: define each once at first use in one plain sentence, or replace it ("share of visitors who buy" for "conversion"; "released to users" for "shipped"; "the middle number when you put the ten in order" for "median").

**B-14 | S3 | One template and stock phrases repeat across the course**
- Location and observation:
  - All 22 Learn chapters share one spine: scene, "The idea in plain words", predict, canvas with "What this shows / Try this / What changed / Limits", "A full worked example" with a weak answer and "the follow-up that breaks it", a Mermaid diagram followed by "What to notice", "Where people go wrong" with 5 to 7 bold-lead paragraphs, "Try it on your own resume today", quiz, "Next". Phrases: "Founders who write about hiring say" in at least 11 chapters; "honest gap" 66 times and "I did not measure that" 51 times in 18 and 16 files; "Where people go wrong" and "Try it on your own ..." in 19 chapters each; "second example" in 17.
  - Every Read chapter spends a paragraph on the power or the signal (Samer's street at 10:00, Leen's storeroom, Karam's hotspot, Mais's dropped call, Yazan's late morning, Nour's 14:00, Tala's charged phone). Each one is gentle and well handled, but seven of seven is a template.
  - The 1.1 and 3.1 research paragraphs ("planned interviews ... free conversations ... founders who write about hiring") say the same thing twice.
- Why it matters: repeated structure and slogans become wallpaper after the third chapter, and the Read chapters stop feeling like different people's stories. The standards list "voice that sounds like a template" and "duplicate explanation" as slop defects.
- Required fix: vary at least the "Where people go wrong" section (some chapters can use two or three items, a table, or fold the point into the worked example), merge the 3.1 research paragraph into one sentence that points back to 1.1, rotate the attribution phrase, and keep the power and signal beat in at most three Read chapters.

**B-15 | S3 | Gate boilerplate is duplicated word for word**
- Location: the "Practice with the AI interviewer" paragraphs and the mentor-reply paragraph in `01.06` and `02.06` are identical, and `03.06` to `06.06` differ by a few words (my paragraph scan finds 41 near-duplicate paragraph pairs, almost all in gates). The sentences "Its feedback is practice, not a hiring decision, and it can be wrong", "That reply is part of the gate, so look out for it after you submit" and "If you do not have a key, the written task below completes this gate" appear in all six.
- Why it matters: the repo's repeated-prose rule (45 words or more across chapters) applies. The privacy line and the optional-drill sentence should stay (they are required), but the rest is padding that a phone reader must scroll past six times.
- Required fix: keep one short privacy line and one "optional" line per gate, and move the shared explanation to 1.1 where the interviewer is introduced. Keep the module-specific description of the drill.

**B-16 | S3 | Several diagrams retell the dialogue that has just been read**
- Location: the Mermaid diagrams in `01.01`, `02.01`, `03.01`, `04.01`, `05.01` and `06.01` are a boxed replay of the Q and A directly above them; the captions say "The diagram shows the call as a path. Each arrow is a follow-up question" (and the same in 5.1 and 6.1). The diagrams in `03.02` (the test with three exits), `04.02` (ask or assume), `05.02` (the filter), `04.04` and `07.04` (the loop) argue.
- Why it matters: the standards name a diagram that restates the paragraph above as decoration (dimension 22). All diagrams are the same shape (a top-down chain of four to six boxes).
- Required fix: cut the replay diagrams in the Read chapters or replace each with a diagram that shows something the dialogue cannot, for example a two-column "what the founder heard / what Samer had", or the five-place path with owner labels. Vary the diagram type (table, grid, before and after bars).

**B-17 | S3 | Quiz distractors are strawmen that can be eliminated by tone**
- Location: all 69 quiz items (the assessment critic owns this; I report the pattern I found on the slop lens).
- Observation: the keyed option contains none of a list of absolutes and intensifiers (very, always, never, whole, every, much, best, great, lot, really and similar) in 65 of 69 items, while at least two of the three distractors contain one in 34 items. Wrong options also carry filler clauses ("which was great", "in every single project", "and everybody was happy") that make them longer and vaguer than the keyed answer, and in 35 items the keyed option is the one that quotes the stem's numbers (the only option with a digit in 15 items). Examples: `07.03` Q4 option 4 ("took a long time, and the whole team was proud of how well it worked in the end for us all, which was great"); `01.05` Q5 option 1.
- Why it matters: a fellow can pass by picking the option that reuses the case's numbers and has no absolutes, which is the "guesser" red-team. The quiz then tests the style of the answer, not the skill.
- Required fix: write distractors as plausible answers that use real facts from the stem in the wrong way (wrong baseline, wrong window, wrong person), remove padding and absolutes from them, and vary which option carries the numbers.

**B-18 | S3 | Some personal prompts have no provided case**
- Location: `03.04` "Try it on your own resume today" (audit every line of your resume; no "if you prefer" alternative, unlike all other Try-it sections), and the Learning log items `01.06` Q3 and Q4, `02.06` Q4, `03.06` Q3 and Q4, `04.06` Q3 and Q4 (they ask what you rejected, what you would change, which result you never measured, which answer ended at a decision, which line you kept, which part was hardest, which assumption mattered most, with no "or use Hadeel's").
- Why it matters: the review request sets "a provided case at every personal prompt". These are the prompts where a fellow with nothing to say has no alternative. `05.06`, `06.06` and `07.05` do it right.
- Required fix: add one "Or use Hadeel's / Samer's ..." clause to each, as the later logs do.

**B-19 | S3 | The AI interviewer is described honestly about accuracy, but not about data or cost**
- Location: `01.01` ("It runs on your own key, and it is optional ... Your questions and answers are saved for you and your mentor, who can read them. Two rules protect you"), and the repeated gate paragraphs; `07.04` ("A running interview is saved and continues where you stopped").
- Observation: the course says what not to paste but never says why: that pasted text is sent to the AI company whose key the learner uses, outside the platform, or that using a key can cost money or be limited. "Key" is not defined. The saving and resume claims describe platform behaviour I could not verify from the content (they are in the brief, but the PR is separate).
- Why it matters: the dossier recommends explaining why (S51) and the privacy rule is the main protection for these learners. Telling them the transcript is private to them and their mentor, without saying the AI provider also receives it, is incomplete.
- Required fix: add two plain sentences to 1.1: what a key is and who sees the text, and a note that credit may be needed (the written path is free). Verify the "saved and continues" and "save as you type" claims against the platform before release.

**B-20 | S3 | A real product name appears**
- Location: `07.01` ("she has built an Android app for a driving school") and `07.03` Q4 option 2 ("a background sync service on Android").
- Why it matters: the rule is no real company or product names. Android is a trademark of a company and a real product.
- Required fix: "a phone app" or "a mobile app".

**B-21 | S3 | Four-column rubric tables are hard to read on a phone**
- Location: the "How your mentor will read it" tables in `01.06` to `07.05` (eight tables, Part | Met | Partly | Not yet, with 10 to 25 words in many cells), and the Key words tables in the Read chapters.
- Why it matters: the standards say tables must be narrow enough for mobile and long explanations go above the table. Fellows are told the table is how the mentor reads their work, so they will try to use it.
- Required fix: present each rubric as three short lists per part (Met, Partly, Not yet), or one row per part with the Met sentence only and the other two in one line below.

**B-22 | S3 | Hadeel's feedback card has a second arguable mistake**
- Location: `07.04`: "The provided card contains one mistake" (strength 2 praises 18 to 11 and tells her to lead with it, although her own answer 4 gives the 6-point result in four clinics). Weakness 2 on the card says "The weakness answer has one example. Fix: add a second example", which contradicts 6.3 and the 6.6 key ("one real weakness with a plan is enough"); weakness 3 says "The case question was not reached. Fix: ask for one next time", which is feedback on the session, not on her answer.
- Why it matters: a learner who finds the second mistake will wonder whether the course contradicts itself, and the mentor key lists only one.
- Required fix: remove or correct weaknesses 2 and 3 on the card, or say "at least one mistake" and add the other to the key.

**B-23 | S3 | Two chapters give different verdicts on "50 percent"**
- Location: `02.01`: "From 3 hours to 2 hours is a third less time. It is a real saving, and it is not 50 percent." `02.02`: counted as orders an hour, packing is "about 50 percent more", and "Leen's resume line may have been fair in one sense".
- Why it matters: both are correct, but a fellow who reads 2.1 and then 2.2 receives two flat statements. The line also depends on "half as much again", which is hard English.
- Required fix: in 2.1 say "it is a third less time, not half the time", and say in 2.2 that "50 percent faster" can be defended only if she says she counted orders an hour.

### S4: polish

**B-24 | S4 | The cast is large and ages and sounds collide.** Samer, Bilal, Iyad and Tala are all 26; Karam (3.x) and Karim (5.6, 6.5) differ by one vowel. Use fewer names and spread ages.

**B-25 | S4 | Terms are defined twice in one chapter.** In `03.01` ("Why chain"), `04.01` ("Case question"), `05.01` ("Founder version") and `07.01` ("Evidence check") the BigWordAlert and the Key words table define the same term in the same chapter. The standard is one definition. Keep the alert, drop the table row, or the reverse.

**B-26 | S4 | Canvas wording differs from the chapters.** `founder-version-first/data.ts` says "The founder of a small payments team" while 5.1 has Yazan applying to an invoicing team (his old company is the payments startup). `how-much-was-yours/data.ts` says the old-way days were shorter "because the shop also stopped selling large glass lamps" while 2.4 says "probably because".

**B-27 | S4 | Small slips.** Word-count claims are off: `04.03` says Mais's spoken comparison is "about fifty words" (it is about 67); `06.04` says "That is 50 words in one breath" (it is 43). `01.04` predict explanation: "Block the order saves the most driver calls" (missing "Blocking" or "To block"). Spelling mixes British ("practise", "colour") and US ("unlabeled" in `02.04`).

**B-28 | S4 | Open instructor decisions are already settled in the text.** Decision 2 (name Ohno), 5 (accent paragraph in 6.4) and 11 (tapping study in 5.3 without numbers) are written into chapters as if approved; decision 10 (may gate answers be in Arabic?) is not addressed, and the prompts, `minWords` and rubrics assume English. Record the status in the decision log or hold the text until the instructors sign.

**B-29 | S4 | Gate pass rules differ.** `05.06` passes with "at least two parts Met" and four parts; `01.06` to `04.06` and `06.06` require three. If the difference is intended, say why.

## Arithmetic ledger (all rechecked; items not listed in a defect are correct)

- Module 1: 48/4 = 12 and 20/4 = 5 calls a week (1.4); 6 to 2 complaints = 67 percent (1.5 Q4 explanation); canvas `samer-decision-weights` totals 25, 28, 25, and the three try-this results (23 to 20; 35 to 34; 12 and 12) all recompute.
- Module 2: 3 to 2 hours = a third less; 20 orders = 6.7 and 10 an hour = 50 percent more; 12 to 5 crashes = 58 percent; 2 to 8 = +300 percent; 2 to 5 = +150 percent; 124/2,480 = 5 percent; 52/2,600 = 2 percent; 62 to 81 of 100; $60 to $45 = 25 percent; 1 minus 0.5 = 0.5 hour, 17 percent of 3 hours; Asma 12 minus 6 = 6; 2.5 Q1 1/2.5 = 40 percent; Q2 sums 10 and 4; Q3 15 minus 9 = 6; 2.6 key 7/18 = 39 percent.
- Module 3: 2 of 5 seconds = 40 percent; Mazen 6 + 3 = 9; Hiba 14 to 5 = 64 percent; Anas 25 to 10 = 60 percent; Lama 7 + 3 = 10.
- Module 4: scores and weights in `case-options-weights` give 38, 36, 22 (and 41 to 40; 30 to 28); Tamer 17 and 21 (quiz); 1,000 customers: 400 and 300, 350, 50 more; decide-and-measure verdicts at 34, 38, 31 and swing 0; Hiba 22 against line 24 with swing 1; Mazen 17 against line 15; Anas 440 line with swing 20.
- Module 5: `choose-technical-story` totals 36, 31, 27 (41 to 38; 41 to 34); Sana 14 to 3 = 79 percent.
- Module 6: `weakness-answer-choice` totals 11, 11, 16; with safe at 3: 21 to 20; with honest also at 3: 30 to 25; Sana 2 days to 4 days.
- Module 7: Majd 30 to 10 minutes = two thirds; capstone time plan 20 + 15 + 20 + 15 + 10 = 80. Layla: see B-01; 12/60 = 20 percent and 6/60 = 10 percent are correct.

## What works

- Voice and reading level: short sentences with one idea each, no hype, no fear, no forbidden words, no exclamation marks, no dashes (the content and canvas files contain no non-ASCII characters at all), no links, no war or politics, no named founders or investors.
- Honesty is taught as the strategy that survives the next why, with the dossier's own phrase about coin-toss lie detection used correctly and fear explicitly rejected (2.1, 2.4, 3.3). "I did not measure that" and "that was not my decision" are rewarded in the content, in every drill rubric and in every mentor key.
- Hardship is handled calmly and never asked for: the Callout in 6.3 and the instruction in 6.6 not to write about health, family or hardship; the drill rubric in 6.6 says never to ask about it; power and signal details are background, not drama.
- Research phrasing is close to the dossier almost everywhere: credits stay within the Credits table; none of U1 to U20 appears as fact (no six seconds, 55/38/7, 30-second impressions, resume-lie percentages, STAR inventor, validity numbers or "Dunning-Kruger proves"); the accent paragraph in 6.4 is one plain paragraph followed at once by what the fellow controls; sampling caveats (one study, students, one setting) are given.
- Recurring protagonists agree across chapters and canvases: Samer (26, courier, 12 to 5 calls), Leen (28, 3 hours to 2, the lamps), Karam (25, one page, date picker 7 to 0), Mais (27, 40 to 30 percent, fee $1 to $2, one developer, one week), Yazan (29, 40 minutes to 6, nine timeouts), Nour (24, 14 comments to 5, three days), Tala (26, three flags to one). Cross-references between chapters point to the right places.
- Privacy line sits before every drill (1.6 to 6.6, and 7.4 twice), every drill has `required: false`, and every gate's written task completes the gate. The AI interviewer is described as practice that can be wrong and that tends to agree and to like long answers (credits line used verbatim).
- Chapter 7.1 and 7.2 teach the evidence check well, and the Tala card with a wrong line of praise is the right kind of lesson for an AI-feedback course.
- The canvases are consistent with their chapters on every number I could recompute (see ledger), and the repo audit passes with no flags.

## Recommendation

**Revise.** No S1. Fix B-01 and B-02 first: B-01 changes a mentor key, and B-02 is a rename pass that also resolves B-03, B-04, B-10 and part of B-24. Then B-05, B-06, B-07 and B-08, which need only a few sentences. The idiom pass (B-12, B-13) and the template pass (B-14 to B-16) are the larger edits. I would re-review the changed passages and the quiz set after those fixes, then re-score dimensions 7, 9, 11, 17 and 22. If the quiz rewrite (B-17) and the rename pass are done together, the average should clear 4.3.

Instructor alignment still needs a confirmation record before dimension 19 can be scored.
