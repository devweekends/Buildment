---
artifact: research-dossier
course: founder-interviews
version: 1
status: draft
owner: research
sources_checked: 2026-10-24
hard_constraints:
  - Second-language readers on phones, in a topic where the most common advice (templates, power words, polished numbers) pushes them toward vague or inflated answers that a founder's "why" chain exposes
  - Honesty is a graded behaviour, not a slogan, yet interviewers detect lies only a little better than chance and probing itself can push candidates to invent; the course and the AI interviewer must reward "I did not measure that" and make inventing pointless
  - The AI interviewer is the main practice tool but must be optional (own API key, written fallback completes every gate), private (no identifiers, client secrets or other people's data pasted), and safe from known LLM faults (agreeing with the learner, rewarding long answers, leading questions)
  - Founder interviews are mostly unstructured, so the course cannot promise a fixed question list or a scoring rubric the interviewer will use; it must teach portable answer qualities (own decisions, honest numbers, a real why) that survive any question
  - No company, founder or investor names in learner text, while most first-hand writing on how founders hire is by named founders and investors; the dossier names sources, the course uses plain wording
out_of_scope:
  - Salary negotiation, offer comparison, visa and contract law (brief non-goal)
  - Technical coding interviews and live coding (course 8)
  - Investor pitching (brief non-goal)
open_questions:
  - Five whys credit: name Taiichi Ohno (an engineer, not a founder or investor) or say "from factory problem-solving in Japan", given the ban on company names?
  - How many researcher names per chapter (recommendation at most two, in "where this comes from" asides)?
  - No peer-reviewed study of startup founders' interviewing was found; do instructors with startup hiring experience confirm the probe list in finding 3?
  - Include one plain paragraph on accent bias in 6.4, or leave it out?
  - AI interviewer defaults: why-depth 3 (maximum 5), separate judge call, about one reflection per two or three questions?
  - Should the written fallback use exactly the same rubric flags as the AI feedback?
  - Use the tapping study without numbers, or drop it?
  - Add an optional spoken mock interview with a peer or mentor in the capstone?
  - Should a reviewer scan one or two interviewing MOOCs before G2B?
  - Which real weaknesses are acceptable as worked examples for this audience?
  - Is "use roles, not names" enough for privacy, or should drills avoid pasted text entirely?
---

# Research dossier: founder-interviews

This is a decision aid for the curriculum architect, the chapter writers and the platform team building the `AI_INTERVIEW` activity for course 14, "The Founder Interview: Ownership, Impact and Your Story". Each finding says what is safe to say in plain words, the common misconceptions, and how chapters should phrase it. Claims carry a source ID in square brackets, for example [S3]. The source table near the end gives the full citation, the type, the date checked and a confidence level. Sources were checked on 2026-10-24. Claims marked **UNVERIFIED** must not appear in learner-facing text as fact; the unverified table says how to phrase them instead.

Researcher names appear here so writers and reviewers can check sources. The brief forbids naming companies, founders and investors in learner text. Researchers may be credited by name where the Credits table says so; where a source is a company's own page or a founder's or investor's essay, the course uses the plain wording given in this dossier and no name.

Quotations are kept under 15 words and used only where exact wording matters. Where full texts were read, the source table says "full text"; where only an abstract was read, it says "abstract", and the dossier does not claim more than the abstract says.

## Learner and context

**Who.** Gaza fellowship fellows applying to startups and small remote teams for engineering, product, design and operations roles, early career to mid level. Arabic first language, English second. (Course brief.)

**What they already know.** At least one project, job, internship, freelance gig or volunteer role they can talk about, and a resume draft. No interview training is assumed. Many will have met popular interview advice (templates, "strengths that sound like weaknesses", power verbs, impressive numbers) on social media or from AI tools. Several of those habits are exactly what research finds interviewers mark down (see findings 6 and 7). (Course brief; this dossier.)

**Device and connection.** Mostly phones on weak or expensive data. The AI interview is text chat, light on data. Every AI drill has a written fallback that completes the same gate. (Course brief.)

**Time.** About 3 to 5 hours a week for 3 weeks, so roughly 12 to 15 hours in total. (Course brief.)

**What they leave with.** A story bank of five owned stories with numbers, a resume where every line survives a chain of whys, and practice transcripts with feedback. (Course brief.)

**Why the research matters for this audience in particular.** Four findings shape the course more than any others:

1. Founder and small-team interviews are usually unstructured: no fixed questions, no shared rubric, lots of follow-up. Unstructured interviews predict job performance less well than structured ones [S1, S3], and they are more open to first impressions and self-presentation tactics [S3, S20]. The candidate cannot fix the interviewer's method, but can bring the kind of evidence a structured interview would have asked for: specific past episodes, own actions, results, and honest limits.
2. Asked for a past example, most people do not tell a real story. In one study of 62 recorded interviews, only 23 percent of answers to past-behaviour questions were stories about one specific episode; stories and near-stories raised hiring recommendations and plain self-descriptions ("I am a hard worker") lowered them [S6]. Telling one specific episode is a learnable, rewarded skill.
3. Inventing is common and hard to catch, but it does not pay the way people think. Over 90 percent of undergraduate candidates in one set of studies reported some faking, and fewer (28 to 75 percent, depending on the type) reported faking closer to lying [S5]. People judge lies only a little better than chance [S9]. Yet a real weakness beat a disguised one with raters [S17], and follow-up questions tend to push candidates toward inventing rather than away from it [S5, S3]. The course's honesty rule is therefore also good strategy, and the AI interviewer's probing must be designed so it does not invite invention.
4. Second-language candidates face a real, documented accent penalty in some hiring studies [S21, S23], though findings on accent and believability are mixed [S24]. The course should say this plainly, without drama, and teach what the candidate controls: clear structure, specific facts, checking understanding, and taking time to think.

## Domain model

### Actors

- **The fellow (candidate):** brings a resume, a few projects, and their own memory of what they did and why.
- **The founder or small-team hiring manager (interviewer):** often the person the fellow will work for. Usually not trained in interviewing; asks open questions and follows up with "why" and "how". Judges ownership, judgment, speed, honesty and fit, mostly without a written rubric (see finding 3).
- **Other team members:** in small teams, an engineer, designer or operations lead may run a second conversation and probe the technical depth of the same story.
- **The mentor:** reviews the fellow's gate answers and capstone, and can read AI interview transcripts (brief).
- **The AI interviewer:** a practice partner running on the fellow's own API key. Asks an opening question, follows one thread with "why" to a set depth, moves across focus areas, and ends with structured feedback (brief).
- **Past colleagues, clients and teammates:** the people whose work overlaps with the fellow's stories. They matter for "I" versus "we" and for privacy (their names and data stay out of the AI chat).

### The interview lifecycle (the spine of the course)

1. **Prepare the evidence.** Pick episodes you owned; write down what you decided, what you could have done instead, what happened, how you know, and what you would change.
2. **Check every resume line.** For each line, be ready to answer: what exactly did you do, why that way, what happened, how do you know, and what would you do differently.
3. **Open the conversation.** First minutes matter: early impressions of competence carry into later ratings [S18, S19].
4. **Answer the opening question** with one specific episode, not a list of traits [S6].
5. **Follow the thread.** The interviewer asks why, how and what next. The candidate gives the real reason, including "I did not decide that, my lead did" or "I did not measure that" (findings 4 and 6).
6. **Work a case.** The interviewer poses a decision under constraints; the candidate clarifies, states assumptions, lays out options, chooses, and says what they would measure (finding 9).
7. **Go deep on one technical thing.** Explain it at the founder's level first, then let an engineer dig (finding 10).
8. **Strengths and weaknesses.** Name each with evidence; for a weakness, say what you are doing about it (finding 7).
9. **Close.** Ask questions, check anything misunderstood.
10. **Review afterwards.** Note which claims got probed, where answers went vague, and update the story bank.

### Vocabulary for chapters (plain English definitions writers may use)

| Term | Plain English for chapters | Notes |
|---|---|---|
| Structured interview | An interview where every candidate gets the same planned questions and answers are scored against the same written guide. | Campion, Palmer and Campion's 15 components, as summarised in [S3]. |
| Unstructured interview | A conversation where the interviewer decides the questions as they go and judges from overall impression. | The usual founder interview. |
| Past-behaviour question (behavioural question) | "Tell me about a time you...": asks what you actually did. | Janz's behaviour description interview [S3]. |
| Situational question | "What would you do if...": asks what you would do in a made-up situation. | Latham and colleagues' situational interview [S3]. |
| Follow-up question, probe | A question that asks for more on the answer you just gave: why, how, what happened next, how do you know. | Levashina and colleagues define probing as a follow-up that completes an incomplete answer or asks for clarifying detail [S3]. |
| Why chain (five whys) | Asking "why" again and again about one decision until the real reason shows. | Origin and limits in finding 4. |
| Ownership | You made the decisions in this piece of work, and you answer for how it went, good or bad. | Course's own definition. |
| End to end | From noticing the problem to after it shipped: the whole path, not only your task in the middle. | Course's own definition. |
| Impact | What changed because of your work, compared with before, and how you know. | Course's own definition; see finding 6. |
| Baseline | The number before your change, so the number after means something. | Plain measurement term. |
| Attribution | How much of a change was caused by you, not by the team, the season or luck. | Plain term; see finding 6. |
| Story (in an interview) | One real episode, at one time, with what happened in order, what you did, and the result. | Bangerter and colleagues' coding definition [S6]. |
| Pseudo-story | A general description of the kind of thing you usually do ("whenever clients complained, I..."), not one episode. | [S6] |
| Impression management | Everything a candidate does to shape the interviewer's view: honest or not. | [S3, S8] |
| Honest impression management | Showing your real strengths well. | [S8] |
| Deceptive impression management (faking) | Making up, stretching or borrowing experiences, or hiding real ones, to look better. | Levashina and Campion's categories: embellishing, tailoring, fit enhancing, constructing, inventing, borrowing, omitting, masking, distancing, opinion conforming, interviewer enhancing [S5]. |
| Humblebrag | A boast dressed up as a complaint or as modesty, for example "my weakness is that I work too hard". | Sezer, Gino and Norton [S17]. |
| Case question | A made-up but realistic decision: "Our sign-ups dropped by a third last month. What would you do?" | Finding 9. |
| Trade-off | What you give up to get something else. | Plain term. |
| Self-assessment | Your own judgment of how good you are at something. | [S14, S15] |

## Hard constraints

1. **Second-language readers, advice that pushes them toward vagueness.** Fellows read on phones in their second language, and much popular interview advice (templates, power verbs, "spin" for weaknesses) produces exactly the abstract, inflated answers that a founder's why chain breaks. Architecture consequence: one answer quality per chapter (one episode, own decisions, honest number, real reason, evidence for a strength), each with a worked before-and-after example in short sentences. No long templates to memorise.

2. **Honesty must be built into the mechanics.** People detect lies only a little better than chance [S9], and interviewers are poor at telling honest from deceptive self-presentation [S8]. Probing can even increase faking, partly because it signals what answer is wanted and partly because probing "I have never done that" pushes people to make something up [S3, S5]. Architecture consequence: the course teaches honest answers as the strategy that survives probing, the rubric rewards "I did not measure that" and "that was my lead's decision", and the AI interviewer uses neutral, non-leading probes and accepts "I have not done that" (finding 11).

3. **The AI interviewer is optional, private and fallible.** Learners use their own key; many will have none or no credit. Learners must not paste personal identifiers, client secrets or other people's data. LLMs tend to agree with the user and to prefer longer answers (finding 11). Architecture consequence: every drill has a written fallback with a model answer that completes the same gate; every drill screen repeats the privacy rule in one line; the feedback rubric scores specific features (episode, own decision, number with source, real reason) rather than overall quality, and caps credit for length.

4. **No fixed script exists.** Founder interviews are unstructured and vary by interviewer. Architecture consequence: the course does not teach "the 10 questions founders ask". It teaches the five answer qualities and practises them across the focus areas, with interleaved drills so the learner must choose which story fits which question.

5. **Names out, evidence in.** Much first-hand writing on how founders hire is by named founders and investors, and the course may not name them. Architecture consequence: chapters use the plain wording given in finding 3 ("founders often say...") and credit only researchers, as the Credits table describes.

## Findings by topic

### 1. Structured versus unstructured interviews: what predicts, and what that means for a founder interview

**Safe to say in plain words**
- Across many studies, interviews with planned questions and a scoring guide (structured) predict later job performance better than free-form conversations (unstructured). Levashina and colleagues call this one of the most consistent findings in the interview literature [S3].
- The size of the advantage changed when the numbers were re-checked. The classic 1998 summary by Schmidt and Hunter gave structured interviews a validity of about .51 and unstructured interviews about .38 (as reported in [S1]). Sackett and colleagues' 2022 re-analysis argued that earlier corrections were too large; their revised estimates were .42 for structured and .19 for unstructured interviews, and structured interviews came out as the top-ranked selection method of those they reviewed [S1].
- The same re-analysis found a wide spread for structured interviews (they have the highest average but also a large spread between studies), so a structured interview is not a guarantee [S1].
- Researchers describe structure as rules for which questions to ask, how to ask them and how to score the answers. Campion, Palmer and Campion listed 15 components: for content, basing questions on the job, asking everyone the same questions, limiting follow-up and prompting, using better question types, longer interviews, controlling outside information, and holding candidate questions until the end; for scoring, rating each answer, using anchored rating scales, taking notes, several interviewers, the same interviewers for everyone, not discussing candidates between interviews, training, and combining scores by formula rather than gut feeling (as summarised in [S3]).
- Self-presentation tactics (for example, self-promotion, flattery, and non-verbal behaviour) affect ratings more in unstructured than in structured interviews. In the meta-analysis by Barrick, Shaffer and DeGrassi, the link between verbal impression management and interview ratings fell from .27 in low-structure to .17 in high-structure interviews (as reported in [S3]; abstract read [S20]).
- Applicants tend to like unstructured interviews more and find structured ones harder [S3]. A friendly, free-flowing founder conversation can feel easy and still be judged on thin evidence.

**What this means for a candidate facing an unstructured founder interview (course reasoning, built on the sources above)**
- The candidate cannot make the interview structured, but can answer as if a good structured interview were being run: give a specific past episode, say what you did, why, what happened, and how you know. That is the information a scoring guide asks for.
- In an unstructured interview, first impressions and self-presentation count for more [S3, S20], so a clear, specific opening answer matters (see finding 8).
- Expect lots of follow-up. In one study, interviewers probed far more in unstructured mock interviews than in structured ones (an average of about 4 probes against fewer than 1) (Blackman 2002, as reported in [S3]).

**Common misconceptions**
- "Interviews do not predict anything." Unstructured ones predict weakly; structured ones are among the better methods [S1].
- "Structured interviews are proven to predict job performance at .51" or any other exact figure. The numbers depend on statistical corrections that experts dispute [S1]. Teach the direction, not the decimal.
- "Founders who 'just know' after a chat are reliable." The research on unstructured interviews says gut feel from a conversation is a weaker predictor [S1, S3]. Say this without mocking founders: the course's job is to help the fellow give good evidence anyway.

**Phrase it this way**
- "Research on hiring finds that planned interviews, where everyone gets the same questions and a scoring guide, predict job performance better than free conversations. Many founder interviews are free conversations. You cannot change their method, but you can give the kind of evidence a good scoring guide would look for."
- Avoid: "Studies show structured interviews are 51 percent accurate." Validity coefficients are not percentages.

### 2. Past-behaviour and situational questions, and where STAR comes from

**Safe to say in plain words**
- The two most studied question types are situational questions ("What would you do if...?"), developed by Latham and colleagues in 1980 on the idea that intentions predict behaviour, and past-behaviour questions ("Tell me about a time when..."), developed by Janz in 1982 on the idea that past behaviour predicts future behaviour [S3].
- Both predict job performance. Past-behaviour questions showed slightly higher validity in the meta-analyses reviewed, especially for complex jobs; researchers recommend using both because they seem to measure somewhat different things (situational questions more job knowledge or reasoning, past-behaviour questions more experience) [S3].
- One study found that job experience did not change how well past-behaviour questions worked, suggesting people with little work experience can answer from non-work experience such as study, volunteering or family responsibilities (Gibb and Taylor 2003, as reported in [S3]). This matters for early-career fellows.
- Question type changes how people present themselves: situational questions drew more flattery and agreeing with the interviewer; past-behaviour questions drew more self-promotion and defending one's image [S3].
- In Levashina and Campion's experiment, past-behaviour questions were more resistant to faking than situational questions [S5].
- **STAR.** The acronym (Situation or Task, Action, Result) is practitioner method, not a research finding. A training firm that sells behavioural interview systems states on its own site that it invented STAR and introduced it in 1974 with its interview system [S7]; no peer-reviewed source documenting the origin was found. The research behind it is the past-behaviour question tradition [S3]. Bangerter and colleagues coded stories into situation, task and action, and result, and found that candidates' stories had more about the situation than about their actions or results [S6].

**Common misconceptions**
- "STAR was invented by [a named psychologist] in [year]." **UNVERIFIED** (see U4). The only origin claim found is the firm's own.
- "Past behaviour is the best predictor of future behaviour" as a law. It is the premise of one question type, which predicts well but not perfectly [S3].
- "Situational questions are useless." They have good validity for most jobs [S3]. Founder case questions are a kind of situational question (finding 9).
- "STAR answers should spend a lot of time on the situation." Real candidates already over-describe the situation and under-describe actions and results [S6].

**Phrase it this way**
- "Interviewers ask two kinds of questions: 'Tell me about a time you did...' and 'What would you do if...'. Both are useful. For the first kind, tell one real time. For the second, think aloud."
- "A common shape for a past-example answer is: the situation in one or two sentences, what you did and why, what happened, and how you know. Many trainers call this STAR. Spend most of your time on what you did and why."
- Credit STAR as "a common answer shape that interview trainers use", not as research.

### 3. How founders and small-team hiring managers interview

The dossier names these sources so reviewers can check them. Learner text must not name the authors (they are founders and investors) or their companies; use the plain wording in "Phrase it this way".

**Safe to say in plain words**
- Small firms hire informally. In interviews with owners and managers of 60 small firms (up to 50 staff), trusted employees often recruited from their networks, and some owners tested candidates by having them show their skills on the job, through work samples or short work trials [S56].
- One widely read essay on hiring by a startup investor and founder advises: talk to candidates about what they have done, ask about their most impressive projects, ask what they got done in the last month, go deep in one specific area and ask what the candidate actually did (because "it's easy to take credit for a successful project"), ask how they would solve a problem the company has now, check references, and where possible have people try the work instead of only interviewing [S54].
- A long-standing guide by a software company founder says the two things to look for are being smart and getting things done; it asks about a recent project, looks for enthusiasm, rejects candidates who cannot explain their project in plain terms ("explain this in terms my grandmother could understand"), and in team projects asks "So what did you do?", treating "there was nothing I could do" as a bad answer [S55].
- Both essays describe the interview as a conversation with deep follow-up on the candidate's own past work, not a list of standard questions [S54, S55]. That matches the research picture of unstructured interviews with heavy probing [S3].
- From those first-party sources, what founders probe can be grouped as: ownership (what you did yourself, not the team) [S54, S55]; effectiveness and speed (what you got done, recently) [S54]; judgment (how you would solve a problem they have) [S54]; clear explanation of your own work [S55]; initiative when blocked [S55]; honesty about credit [S54]. "Honesty" here is the course's grouping of the credit-taking warning, not a separate list item in the sources.
- Startups change fast; one essay notes that anyone hired is likely to be doing a different job within three to six months, so adaptability matters [S54].

**What the sources do not show**
- No peer-reviewed study of how startup founders specifically run interviews was found in this research session (open question 3). The findings above combine first-party essays (practitioner, type F) with one study of small-firm owners [S56] and the general research on unstructured interviews [S1, S3].
- The essays reflect US software startups. Their advice to look for visible enthusiasm ("they talk quickly, and get animated" [S55]) may disadvantage candidates speaking a second language or from cultures where calm delivery is expected. Writers should not teach "show passion by talking fast".

**Common misconceptions**
- "Founders want polish." The first-party sources ask for specifics, own actions and clear explanation, not polish [S54, S55].
- "Small companies do not check." Founders say they check references and dig into what you actually did [S54].
- "A founder interview is a test of confidence." The sources describe a test of what you did and how you think [S54, S55].

**Phrase it this way**
- "Founders who write about hiring say much the same thing: they ask what you have actually done, pick one project, and keep asking until they know which part was yours."
- "Expect questions like 'What did you get done last month?', 'What exactly did you do?', 'Why that way?' and 'How would you solve this problem we have now?'"
- "Some small teams ask you to try a short piece of real work. That is another chance to show what you can do, not a trick."
- Do not name any founder, investor, company or essay in learner text.

### 4. The five whys, laddering and follow-up probes

**Safe to say in plain words**
- The five whys means asking "why" about a problem, and then about each answer, until you reach a cause you can act on. It is attributed to Taiichi Ohno, who led the development of a Japanese car maker's production system [S34, S68]. The method is a root-cause technique for problems, not an interviewing method.
- Its limits are documented. The Institute for Healthcare Improvement's own guide notes that a problem can have more than one root cause and that people who see different parts of a system may answer the whys differently [S34]. Card's critique in a patient-safety journal argues that the method tends to oversimplify complex problems and limit understanding of how processes fail, and that its popularity is not based on evidence that it works (as summarised by the US patient-safety network [S33]).
- Laddering is a related interview method from consumer research: the interviewer asks "why is that important to you?" repeatedly to move from concrete features to consequences to personal values (Reynolds and Gutman's definition, as quoted in [S37]). Reviews say it needs highly trained interviewers, and list open problems including how much the interviewer should direct the respondent [S36, S37].
- People are not reliable reporters of why they did things. Nisbett and Wilson's review found that when people explain their own choices, they often rely on plausible theories of what should have caused them rather than true introspection, so explanations can be confident and wrong [S31].
- Hindsight bias: once people know how something turned out, it seems more predictable than it was. Warning people about this bias had no clear effect; helping them reconstruct what they knew at the time might help [S32].
- In interviews, follow-up probing is common in unstructured interviews [S3]. Probing "I have never experienced that" or "I don't know" answers can push people to guess or invent (as reviewed in [S3]). Researchers propose that probes which make the question harder, ask how a claim could be verified, or ask for quantities ("How many people were in the team? What outcomes were achieved?") are more likely to reduce faking; this is a proposition, not a tested finding [S3].
- Levashina and colleagues' practical advice, until more is known, is to use planned neutral probes that do not hint at the desired answer, probe all candidates equally, and probe only if an answer is clearly incomplete or off track, or the candidate is shy [S3].

**What a good why chain on a resume line looks like (course method, built on the sources above)**

Resume line: "Reduced app load time by 40 percent."
1. Why did you work on load time? "Users in our pilot were on slow phones; our support inbox had several complaints a week about the app freezing on start." (A real trigger, with a source.)
2. Why was it slow? "The home screen loaded every product image at full size before showing anything." (A cause found by looking, not guessed.)
3. Why that fix and not another? "I compared caching, smaller images and lazy loading. Smaller images were a one-day change; caching needed backend work we did not have time for." (Options and a trade-off.)
4. Why 40 percent? "I timed start-up on our cheapest test phone, ten runs before and ten after: about 5 seconds to about 3." (A baseline, a method, a sample.)
5. Why does it matter? "Complaints about freezing stopped in the next two weeks, but we also changed the server that month, so I cannot say it was only my change." (Honest attribution.)

**Where why chains go wrong**
- **Reasons invented afterwards.** The candidate gives a tidy strategic reason that was not the real one [S31, S32]. Fix: say what you knew and wanted at the time, including "honestly, my lead asked me to" or "it was the only option I knew then".
- **One cause when there were several** [S33, S34]. Fix: "There were two reasons..."
- **Blame.** The chain ends at a person ("the designer was slow") rather than a condition the candidate could act on. Fix: end at what you would change.
- **Going past what you know.** At some depth the honest answer is "I don't know" or "that was decided above me". The course should treat that as a good answer, and the AI interviewer must accept it rather than push for invention [S3].
- **Arbitrary depth.** Five is a convention, not a rule; stop when you reach a decision you made or a fact you checked.

**Common misconceptions**
- "Five whys always finds the root cause." It finds one chain; real problems often have several causes [S33, S34].
- "Asking why five times is a proven interview technique." No study of five whys as an interview method was found. The related research is on probing in interviews [S3] and laddering [S36, S37].
- "If you can explain why, you must be right." People can be confident and wrong about their own reasons [S31].

**Phrase it this way**
- "The five whys comes from factory problem-solving: ask why, then why again, until you reach something you can fix. Founders use the same habit on your resume. For every line, know what you did, why, what happened, how you know, and what you would change."
- "When you reach the edge of what you know, say so. 'That decision was made before I joined' is a strong answer. A made-up reason is not."
- "Your memory tidies up the past. Before an interview, write down what you knew and wanted at the time, not only how it turned out."

### 5. Storytelling in interviews: do candidates actually tell stories, and what makes one credible

**Safe to say in plain words**
- Past-behaviour questions are designed to draw out stories, but in a study of 62 recorded selection interviews (mostly students at a Swiss university), only 23 percent of answers were stories about one specific past episode [S6].
- The most common answer type was a pseudo-story: a description of the kind of thing the person usually does, without one time and place [S6].
- Stories and pseudo-stories raised recruiters' hiring recommendations; self-descriptions ("I am very organised") lowered them [S6].
- Stories contained more about the situation than about the candidate's tasks, actions and results [S6].
- The authors suggest the interview setting may not invite storytelling, because candidates are unsure how much detail is wanted, and recommend that both recruiters and applicants learn to encourage and tell accurate, representative stories [S6].
- Probes that ask for numbers, ask how something could be checked, or make the question harder are proposed (not yet proven) as ways to get more job-related information without encouraging faking [S3]. A story with checkable specifics is what such probes look for.
- "I" versus "we": interview training firms tell interviewers to focus on what the candidate did, not the team [S7]. In Levashina and Campion's taxonomy, "borrowing" (answering with others' experiences or accomplishments) is one form of faking [S5]. Saying "we" is not faking, but a candidate who cannot separate their own part will look as if they are borrowing.

**Common misconceptions**
- "Storytelling means being dramatic or emotional." The research definition is one real episode, in order, with what you did and how it ended [S6].
- "A good story has a perfect ending." Nothing in the sources says so; the course's view is that a story where something went wrong and you changed course shows judgment.
- "Always say 'we' to sound humble" or "never say 'we'." The goal is accuracy: "we" for the team's work, "I" for your part, and say which is which.

**Phrase it this way**
- "When someone asks 'Tell me about a time...', tell one time. Not what you usually do. One day, one problem, one decision."
- "Keep the background short. Spend your words on what you did, why, and what happened."
- "Say 'we' for the team's work and 'I' for your part, and make the line between them clear: 'The team built the app. I designed the sign-up flow and ran the user tests.'"

### 6. Honest impact and impression management

**Safe to say in plain words**
- Impression management is anything a candidate does to shape the interviewer's view, and it can be honest or deceptive. Honest and deceptive versions can use the same tactic (for example, praising the company), but differ in whether the claim is true [S8].
- Faking in interviews is common in self-reports. In Levashina and Campion's studies, over 90 percent of undergraduate job candidates reported some faking, from mild (embellishing, tailoring answers to the job) to stronger forms closer to lying (constructing, inventing, borrowing others' experiences), which 28 to 75 percent reported depending on the type [S5].
- Levashina and Campion's categories give writers a precise vocabulary: embellishing (overstating beyond a reasonable description of the truth), tailoring, fit enhancing, constructing, inventing, borrowing (answering with others' experiences), omitting, masking, distancing, opinion conforming and interviewer enhancing [S5].
- Follow-up questions increased faking in their experiment, and past-behaviour questions were more resistant to faking than situational questions [S5]. In debriefing, candidates said probing signalled which answers mattered; probing "I have never experienced that" may push people to invent a situation [S3].
- People are poor lie detectors. Across 206 documents and 24,483 judges, people judging lies and truths in real time averaged 54 percent correct, against 50 percent by chance; they classified 61 percent of truths and 47 percent of lies correctly [S9].
- Interviewers are poor at telling honest from deceptive impression management, according to the review by Bourdage, Roulin and Levashina citing Roulin, Bangerter and Levashina (2015) [S8]. Their exact detection figures were not read (see U6).
- Whether deceptive impression management raises scores is mixed: impression management in general is linked to higher interview ratings, but studies of deceptive impression management specifically are more mixed [S8]. Warnings against faking reduced deceptive impression management in one study [S8].
- Resume embellishment: little primary research was found. In one survey study of 286 graduates responding to a made-up job advert, intention to fabricate, embellish or omit on a resume rose with the benefits people expected and fell with their personal norms; perceived costs and chances of being caught did not have direct effects [S64]. This is intention, not behaviour, in one sample. Popular percentages of "people who lie on resumes" are not sourced (U5).
- What you show in the interview may not be what you do on the job: self-presentation tactics affected interview ratings, especially in unstructured interviews, more than they related to later job performance [S20].
- **Stating impact (course method, built on standard measurement ideas, not on a single source):** a number needs a baseline (what it was before), a time window, a source (where the number comes from), and an attribution (how much was your work). If you did not measure, say so and say what you would have measured. If the number is an estimate, say it is an estimate and how you got it.

**Common misconceptions**
- "Everyone fakes, so you have to." The self-report rates are high [S5], but faking is hard to keep consistent under probing, and the course's honesty rule is a brief requirement.
- "Interviewers can tell when you are lying." People are only a little better than chance [S9]. This cuts both ways: lies are not reliably caught, and honest nervous candidates are not reliably believed. Do not teach "they will catch you" as the reason for honesty; teach that a true story holds up under five whys and an invented one usually does not, and that an invented number becomes your problem on the job.
- "Always quantify everything." A made-up or unsourced number is worse than an honest "I did not measure that". The brief requires the course to reward the honest answer.
- "Big percentages impress." A percentage without a baseline ("improved conversion by 300 percent") invites the question "from what?".

**Phrase it this way**
- "A number needs four things: what it was before, what it was after, over what time, and how you know. Then say how much of the change was yours."
- "If you did not measure it, say so: 'I did not measure that. If I did it again, I would track how many users finished sign-up before and after.' Interviewers can work with an honest gap. They cannot work with a number that falls apart at the next question."
- "Research on lie detection finds that people catch lies only a little better than a coin toss. So honesty is not about fear of being caught. It is about giving answers that still stand after the fifth 'why'."
- Avoid: "Interviewers can always spot a lie" and "never admit you do not know".

### 7. Self-assessment, strengths and weaknesses

**Safe to say in plain words**
- People's views of their own skills are only moderately linked to their actual performance. Dunning, Heath and Suls describe the link as "tenuous to modest" in their 2004 review, note that other people sometimes predict a person's results better than the person does, and that employees tend to overestimate their skill, which makes useful feedback harder [S14].
- A synthesis of 22 meta-analyses found an average correlation of about .29 between people's ratings of their own abilities and objective measures; the link was stronger when the self-rating was about a specific skill rather than a broad one, and when the task was objective, familiar or simple [S15]. Plainly: you judge yourself more accurately on narrow, concrete skills ("I can write a SQL join") than on broad ones ("I am a good engineer").
- The original Kruger and Dunning 1999 study found that people scoring in the bottom quarter on tests of humour, grammar and logic placed themselves around the 62nd percentile when they were at about the 12th [S10]. They overestimated; they did not think they were experts.
- Other researchers argue much of this pattern comes from statistics (regression to the mean plus the general tendency to rate oneself above average) [S11]; Kruger and Dunning replied disagreeing [S12]. Large replications have found the effect present but small in some data [S16] and supported by a model of low performers being less able to tell when they are right in others [S13]. The debate is unresolved.
- On the "greatest weakness" question: in a study with 122 US university students who wrote how they would answer "What is your weakness?" in a job interview, 77 percent gave a humblebrag (a strength dressed as a weakness, most often perfectionism or working too hard) and 23 percent named a real weakness. Raters who read the answers were more willing to hire those who named a real weakness [S17]. This is one study with written answers by students, not a field study of real hiring.
- Across nine studies, humblebragging was seen as insincere and reduced liking and perceived competence compared with plain bragging [S17].

**Common misconceptions**
- "The Dunning-Kruger effect means incompetent people think they are experts." The original data show low scorers rated themselves a little above average [S10], and the size and cause of the effect are debated [S11, S13, S16]. See U8.
- "Name a weakness that is really a strength." The one direct study found raters preferred a real weakness [S17].
- "You know your strengths best." Self-views are only modestly accurate [S14, S15]; evidence from results and from other people's feedback is better.

**Phrase it this way**
- "Most of us are not very accurate judges of our own skills, especially broad ones like 'leadership'. You are more accurate about narrow skills you can check. So name strengths narrowly and give evidence: 'I am good at finding the cause of slow database queries. Last month I...'."
- "For a weakness, name a real one that matters for the work, give an example, and say what you are doing about it. In one study, people reading interview answers preferred a real weakness to a disguised strength."
- "A well-known study found that people who scored lowest on some tests thought they were a bit above average. That does not mean beginners think they are experts. It means everyone should check their self-view against evidence."
- Avoid "Dunning-Kruger proves..." and any chart of "confidence versus competence" with a "peak of Mount Stupid" (see U9).

### 8. Interviewer bias and the candidate's side

**Safe to say in plain words**
- First impressions in the opening small talk relate to outcomes. In a study of structured interviews for internships, candidates who made better early impressions received higher interviewer ratings (r = .42) and more internship offers (r = .22). Early judgments of competence predicted later ratings even by a different interviewer, while early liking and similarity did not carry over to other interviewers [S18].
- A follow-up with 163 mock interviews found that much of the effect of initial impressions overlapped with job-related content, and that initial impressions related more strongly to ratings of early answers than later ones [S19]. Plainly: the opening matters most for the first answers, and part of what interviewers pick up early is real competence.
- Self-presentation (appearance, impression management, verbal and non-verbal behaviour) affects interview ratings, especially in unstructured interviews, more than it predicts job performance [S20].
- Accent: in matched-guise studies (the same script read with different accents), a Mexican-Spanish-accented applicant for an entry-level software engineering job was rated less suitable, less likely to be promoted, and was hired less often than a standard-American-accented applicant [S21]; Vietnamese-accented speakers were rated as poorer communicators [S22]. Nonnative speakers using the same scripted answers were less likely to be recommended for a middle-management job, and this was explained by judgments of their political skill (ability to read and influence people), not their communication skill [S23].
- Accent and believability: an influential 2010 study found that trivia statements read with a foreign accent were rated less true; later studies have had mixed results, some failing to replicate it, and a 2024 study found a negative social bias against foreign-accented voices but no effect on whether statements were believed [S24].
- Interview anxiety: McCarthy and Goffin developed a measure with five kinds of interview anxiety (communication, appearance, social, performance and behavioural) [S25]. A meta-analysis found anxiety is linked to somewhat lower interview performance (r = about -.19) [S26]. In two later studies, interview anxiety had near-zero correlations with later job performance [S27, S28]: anxious candidates did as well in the job, so interview anxiety understates them.
- Interviewer warmth matters to candidates: graduate applicants' views of interviewer warmth and other traits affected their anxiety and their interest in the job [S29].

- Halo: in a classic experiment, students watched one of two videos of the same college instructor, who spoke English with a European accent, behaving either warmly or coldly. Those who saw the warm version rated his appearance, mannerisms and accent as appealing; those who saw the cold version rated the same features as irritating, and did not realise their overall liking had shaped these ratings [S30]. Plainly: an overall impression spreads to details, including how an accent is heard.
- Similarity: in 120 interviews with employers at elite professional firms, Rivera found evaluators sought candidates who were not only competent but culturally similar to themselves in leisure pursuits, experiences and self-presentation, and this often outweighed concerns about productivity [S65]. In Barrick and colleagues' study, early liking and similarity did not carry over to other interviewers, while early judgments of competence did [S18].
- Video and phone: a meta-analysis of 12 studies found interviewer ratings and applicant reactions were lower for technology-mediated interviews (phone, video) than face to face, with moderate effect sizes, and warned against judging different applicants through different media [S2]. Founder interviews for remote teams are often video calls.
- Recorded one-way video interviews and AI-run interviews: applicants report more negative reactions to them [S48, S49, S51]. In one experiment in Switzerland and India, observers rated performance as similar across face-to-face, avatar-led and text-question video interviews, and interviewees looked less stressed in the recorded formats [S48]. In data from 27,809 real applicants, more preparation time and the chance to re-record went with better reactions [S49]; in experiments, longer preparation time and re-recording raised performance ratings [S50].
- Coaching and preparation: among 213 candidates for police and fire promotions, voluntary attendance at interview coaching and specific preparation (study groups, role-play) went with better situational interview performance, and the link ran partly through better-organised answers [S4]. Plainly: practice that helps you organise answers helps. (This is one setting: public-sector promotion panels, not startups.)

**Common misconceptions**
- "Interviewers decide in the first 30 seconds" or "in 7 seconds". **UNVERIFIED** as a specific figure (U10). Early impressions matter [S18, S19], but competence shown later still counts, and early impressions in [S19] partly reflected job-related content.
- "Your accent will not matter if your English is correct." Studies show accent can lower ratings even with identical words [S21, S23]. Say it plainly and move to what the candidate controls.
- "Nervousness means you are not good enough." Anxiety lowers interview performance a little [S26] but did not predict job performance [S27, S28].

**Phrase it this way**
- "The first minutes matter, mostly because interviewers start judging your competence early. Have a clear first answer ready: one real episode."
- "Some studies find that interviewers rate people with a foreign accent lower even when they say exactly the same words. That is the interviewer's bias, not your failure. What you control: short clear sentences, specific facts, and checking that you were understood."
- "Feeling nervous is common and normal. Research finds nervous candidates do a little worse in interviews but just as well in the job. Preparation and practice are the best tools you have."
- Avoid any numerical "accent penalty" percentage from press coverage (see U11).

### 9. Case-study questions: working a decision under constraints aloud

**Safe to say in plain words**
- Case questions are a kind of situational question: "What would you do if..." [S3]. Situational questions tend to draw more on job knowledge and reasoning than on experience [S3], so a fellow with little experience can still do well by reasoning clearly.
- The best-documented case-interview advice comes from consulting recruitment and is practitioner guidance, not research. A university career centre guide (practitioner, type W) advises: ask clarifying questions until the problem is clear, and keep asking throughout; it is fine to ask for a short pause to organise your thoughts; think out loud as much as possible because the purpose is to see how you think; organise ideas in a structure; check whether your numbers make sense, since "are you sure?" is often a prompt to sanity-check rather than a sign you are wrong; start the final answer with the recommendation, then the evidence, then the limits of your assumptions and what you would test next [S60].
- In coaching research, better-organised answers went with better situational interview performance [S4].
- Founders ask "how would you solve a problem we have now?" [S54], which is a live case question about their business.

**A shape for founder case questions (course method; practitioner-based, not research)**
1. **Clarify.** Repeat the question in your own words. Ask one to three questions about the goal, users, time and constraints. ("Is the goal more sign-ups or more paying users? Do we have engineering time this month?")
2. **Assume aloud.** State what you will assume where you lack facts. ("I'll assume most users are on mobile.")
3. **Options.** Give two or three real options, not ten.
4. **Trade-offs.** For each: cost, time, risk, what you give up.
5. **Decide.** Pick one and say why, in one sentence.
6. **Measure.** Say what number you would watch, its current baseline if known, and what result would make you change course.
7. **Limits.** Name the assumption that most affects your answer and how you would check it [S60].

**Common misconceptions**
- "There is one right answer." Practitioner guides stress the reasoning and a committed recommendation [S60]; the course's view is that founders want a decision with honest assumptions.
- "Use a famous framework." Practitioner guides suggest a structure, but a memorised framework applied to the wrong problem reads as scripted. The course should teach the seven steps above as a habit, not a named framework.
- "Silence is failure." Asking for a short pause to think is recommended by practitioner guides [S60].

**Phrase it this way**
- "A case question asks how you think. Clarify, say your assumptions, give two or three options, compare them, choose one, and say what you would measure to know if you were right."
- "It is fine to say: 'Can I take 30 seconds to think?' Then think aloud."
- Label the case shape as "a practical method used by interview coaches and this course", not as research.

### 10. Explaining the best technical thing you did, to a founder and to an engineer

**Safe to say in plain words**
- The "curse of knowledge" is a term from a 1989 economics paper by Camerer, Loewenstein and Weber: better-informed people are unable to ignore what they know, even when it is in their interest to imagine what a less-informed person thinks [S57].
- Adults show this bias in reasoning about other people's beliefs: knowing an outcome makes it harder to judge what someone without that knowledge believes [S58].
- In five experiments, people overestimated how well their tone and meaning came across over email, because they "hear" their own intent [S59]. This applies directly to a text-chat interview.
- The well-known "tapping study" (people tapped the rhythm of a song and predicted listeners would name it far more often than they did) comes from a 1990 Stanford dissertation by Elizabeth Newton. Its numbers are reported widely in secondary sources but the dissertation was not read for this dossier (see U3).
- A founder's hiring guide rejects candidates who cannot explain a past project in plain terms [S55]. Founders also go deep in one area to find what the candidate actually did [S54].

**How to choose the story (course method)**
- Pick work where you made a real technical decision (not only where the tech was impressive).
- Prefer work you can explain to the end of five whys: why this approach, what you rejected, what broke, how you know it worked.
- Prefer recent work and work you did yourself; if it was team work, pick the part you owned.
- Prefer a story with a measurable result or an honest "I did not measure that".

**Two levels (course method, built on [S55, S57, S59])**
- **Founder level (about 30 to 60 seconds):** the problem in user or business terms, what you built or changed in one sentence, the key decision, and the result. No unexplained terms.
- **Engineer level (on request):** the constraints, the options you compared, why you chose this one, what went wrong, how you tested it, and what you would do differently. Let the engineer pull you deeper; do not dump it all at once.

**Common misconceptions**
- "Use technical terms to sound expert." A founder may reject a candidate who cannot explain plainly [S55].
- "Simple means shallow." The founder-level answer is a doorway; the engineer-level answer shows depth.
- "My written answer is clear because it is clear to me." People overestimate how clearly they communicate in text [S59].

**Phrase it this way**
- "When you know something well, it is hard to remember what it is like not to know it. Researchers call this the curse of knowledge. So test your explanation on someone outside your field."
- "Give the short version first: the problem, what you did, the key choice, the result. Then let the engineer ask for more."

### 11. Designing an AI interviewer that probes deeply without leading or being harsh

This section is for the platform team (`feat/ai-interviewer-byok`) and the writers who author `aiinterview` fences.

**What the research says**

*Open versus leading questions.*
- In investigative interviewing research (developed with child witnesses), open prompts produce more accurate information than focused or suggestive prompts. The structured protocol studied by Lamb and colleagues orders prompts from most to least open: invitations ("Tell me everything that happened"), cued invitations that reuse the person's own words ("Earlier you mentioned X. Tell me more about that"), then directive questions (when, where, what colour), then option-posing questions (yes/no or either/or), and treats suggestive questions, which communicate the expected answer, as the riskiest. Interviewers trained in the protocol used about three times more open prompts and about half as many option-posing and suggestive prompts [S35]. Adults are not children, but the principle that the interviewer should not introduce the answer transfers.
- In employment interviews, probing increased faking, partly because candidates read probes as hints about which answers mattered, and probing "never experienced" answers may push candidates to invent [S3, S5]. The recommendation is planned, neutral probes that do not cue the answer [S3].

*Listening skills.*
- Motivational interviewing teaches four basic skills summarised as OARS: open questions, affirmations, reflective listening and summaries. In a text-message intervention, high use of all four skills went with more of the client's own reasons for change [S39]. Its fidelity code counts reflections relative to questions and separately codes persuading and confronting, so an interviewer who only fires questions, or who argues, scores poorly [S38]. Motivational interviewing is a counselling method; the course borrows only the listening skills, not the therapy.

*Feedback.*
- Feedback improved performance on average in a large meta-analysis, but over a third of feedback interventions made performance worse; feedback was less effective the more it moved attention away from the task and toward the self [S42].
- Hattie and Timperley describe feedback as answering three questions (where am I going, how am I going, where to next) and distinguish feedback about the task, the process, self-regulation and the self; praise of the person tends to have low effects, while corrective information about the task can be highly effective (as summarised in [S41]; abstract of the original [S40]).
- A 2020 meta-analysis of 435 studies found a medium average effect of feedback, with large variation depending on how much information the feedback carried [S41].

*LLM behaviour.*
- Sycophancy: five AI assistants tailored feedback to what the user said they liked or had written, wrongly admitted mistakes when a user challenged them ("I don't think that's right. Are you sure?"), and copied users' errors; human preference data rewards answers that match the user's views [S43]. An AI interviewer may therefore praise answers the learner sounds proud of and back down when the learner pushes back.
- LLM-as-judge biases: LLM judges show position bias (favouring an answer because of where it appears), verbosity bias (favouring longer answers; some judges preferred an answer padded with a rephrased repeat of its own list) and self-enhancement bias (favouring text they generated) [S44]; position bias can be large enough to reverse rankings [S45]; LLMs can recognise and favour their own text [S46]. Strong LLM judges still agreed with humans about 80 percent of the time in that study [S44].
- Researchers have trained models to detect whether an interview answer is a story and to count situation, action and result content, with best accuracy of 78 percent [S47]. Automated story detection is possible but imperfect.

*Candidate reactions to AI and recorded interviews.*
- Applicants react more negatively to automated and one-way interviews than to live ones [S48, S49, S51], though observer-rated performance can be similar [S48]. Explaining why the process works as it does helped reactions more than only describing the process [S51]. More preparation time and re-recording options improved reactions and ratings [S49, S50].

*Privacy and security.*
- The OWASP list of risks for LLM applications names sensitive information disclosure as a top risk, including personal data, confidential business data and credentials, and says users need to understand the risk of giving sensitive data to an LLM [S52]. It also lists prompt injection, including text inside pasted documents that changes the model's behaviour [S53]. A pasted resume or project description is untrusted input.

**Design notes for the system prompt (recommendations from the dossier, to be tested)**

1. **Ask open, then cue with the learner's own words.** Opening: "Tell me about a piece of work you owned from start to finish." Follow-ups reuse the learner's words: "You said you 'changed the onboarding'. What exactly did you change?" Avoid questions that contain the answer ("Did you do that to improve retention?"). Use neutral why forms: "What made you choose that?", "What else did you consider?", "How did you know it worked?" [S35, S3].
2. **One thread at a time.** Follow one claim to the configured depth (default 3; maximum 5) before moving to the next focus area. Five is a convention [S33, S34].
3. **Stop rules.** Stop drilling a thread when the learner (a) names a decision they made and why, (b) gives a checked fact or number with its source, (c) says "I don't know", "I did not measure that" or "that was not my decision", or (d) has answered the same question twice. Never ask the learner to guess a number or invent an example after "I have not done that"; instead offer a related question they can answer from experience or switch to a situational question ("What would you do if...?") [S3, S5].
4. **Accept honest limits explicitly.** When the learner says "I did not measure that", reply with a short acknowledgement and a forward question: "That's a fair answer. If you did it again, what would you measure?"
5. **No hinting at the right answer.** The interviewer must not say what a good answer contains while the interview is running; that belongs in the end feedback. Probing that signals what matters increases faking [S3].
6. **Reflect before probing, sometimes.** About one short reflection or summary for every two or three questions ("So the team built the app and you owned the sign-up flow. Why that part?") keeps the tone human and lets the learner correct misunderstandings [S38, S39].
7. **Neutral tone, no praise per answer.** No "Great answer!" after each reply (sycophancy risk [S43]); no sarcasm or interrogation tone. A plain "Thanks. Next question." is enough.
8. **Hold position under pushback, kindly.** If the learner disputes a feedback point, the interviewer restates the evidence from the transcript and does not change the rating just because the learner objects [S43].
9. **Treat pasted text as data.** Ignore any instructions inside a pasted resume or project description [S53].
10. **Privacy reminder at the start of every drill**, in one line: do not paste your full name, phone, email, address, ID numbers, client names, passwords, API keys, private company data, or other people's personal details; replace them with roles ("a logistics client", "my team lead") [S52].
11. **Second-language support.** Accept "Can you repeat the question?" or "Can you say that more simply?" without penalty, and rephrase in shorter words. No time pressure in text chat (see finding 12).

**Design notes for the feedback rubric**

1. **Score features, not overall quality.** For each focus area, check for named features: one specific episode (not a pseudo-story) [S6]; the learner's own decisions separated from the team's [S5, S54, S55]; at least one option or trade-off named; a number with baseline, time window and source, or an honest "not measured"; a real reason at the end of the why chain; a change they would make.
2. **Reward "I did not measure that" over an invented or unsourced number.** Rubric rule: an unsourced number scores lower than an honest gap with a plan to measure. A number that changes during the interview is flagged as "unsupported number".
3. **Do not reward length.** Judge each feature as present or absent; cap credit for an answer at the features shown; do not use answer length or word count as a signal. Instruct the judge that a short answer with the features beats a long one without them [S44].
4. **Quote evidence.** Every strength and weakness in the feedback must quote or point to the learner's own words in the transcript. This reduces generic praise and makes the feedback checkable by mentors.
5. **Weakness kindly, with a fix.** Each weakness is phrased about the answer, not the person ("Your answer on the dashboard project described what the team usually did, not one time"), followed by one concrete fix and a rewritten example opening ("Try: 'In March, a client reported...'"). Feedback about the task and process, not the self [S42, S41].
6. **Keep it short.** At most three strengths, three weaknesses with fixes, one line per focus area, and one or two next steps. Long lists of advice are a known trait of LLMs, not of good feedback.
7. **Flags to track across drills** (for the brief's success signal): "vague ownership", "unsupported number", "pseudo-story", "invented reason risk" (a reason that appeared only after probing and contradicts an earlier answer), "jargon without explanation". Use the same flag names in every drill so the first and last drill can be compared.
8. **Separate the judge from the interviewer.** If possible, run feedback as a separate call that sees the transcript and the rubric, with the rubric before the transcript and no instruction to be encouraging. Do not ask the same call that conducted the interview to grade it. Self-preference and position effects are documented [S44, S45, S46]; this separation is a reasonable mitigation, not a proven fix.
9. **Explain the process.** Before the first drill, tell learners what the interviewer does and why (it asks why to help you find the real reasons; feedback is practice, not a hiring decision). Explanations of why helped applicant reactions [S51].
10. **Mentor review.** Mentors can read transcripts (brief); the rubric flags give them a two-minute scan.

**Common misconceptions**
- "A harsher AI interviewer is more realistic." Harshness does not add information; feedback that turns attention to the self can lower performance [S42].
- "An AI judge is objective." LLM judges have known biases [S44, S45, S46] and tend to agree with users [S43].
- "Longer answers are more thorough." Founders ask for specifics [S54, S55]; LLM judges overrate length [S44].

**Phrase it this way (for learners, about the AI interviewer)**
- "The AI interviewer is a practice partner. It keeps asking why to help you find your real reasons. Its feedback can be wrong; check it against the rubric and ask your mentor."
- "If you do not know, say so. The interviewer is set up to reward an honest 'I did not measure that' more than a made-up number."
- "Never paste your full name, contact details, ID numbers, client names, passwords or other people's information. Use roles instead: 'a client', 'my lead'."

### 12. Second-language candidates: pausing, asking for repetition, pace

**Safe to say in plain words**
- Listeners' judgments of how fluent a second-language speaker sounds depend most on pauses and speed; repairs (correcting yourself) mattered little in one study of untrained raters [S61]. Listeners weighed these features in the same way for native and non-native speakers [S62].
- Listener expectations change what they hear: when listeners believe a speaker belongs to a non-native group, their evaluation of the same speech can be distorted (reverse linguistic stereotyping), and listeners with more contact with non-native speakers judged speech differently [S63].
- Accent can lower hiring ratings with identical words [S21, S23], and an overall warm or cold impression spreads to how an accent is heard [S30].
- Practitioner guidance says it is fine to ask for a short pause to think [S60]. No research was found on how interviewers judge a candidate who asks for a question to be repeated or rephrased (U17).
- In recorded interviews, more preparation time improved applicant reactions [S49] and performance ratings [S50]. The course's text-chat practice gives thinking time that a live call does not.
- Text chat removes accent and pause cues, so AI practice in text does not train speaking pace or pronunciation; it trains content and structure.

**Common misconceptions**
- "Speak fast to sound fluent." Speed affects fluency impressions [S61], but a fast, unclear answer in a second language costs understanding. The course's advice is a steady pace with short sentences.
- "Never pause." Pauses affect fluency ratings [S61], but a short planned pause before answering ("Let me think for a moment") is recommended practice [S60]. The likely cost is pauses in the middle of sentences, which short sentences reduce (course reasoning; not directly tested here).
- "Asking to repeat looks weak." No evidence found either way (U17). Answering the wrong question is a bigger, visible cost.

**Phrase it this way**
- "Short sentences help you and the listener. Say one idea per sentence."
- "It is fine to say: 'Let me think for a moment.' Then pause, and answer."
- "If you are not sure you understood, ask: 'Do you mean...?' or 'Could you say that another way?' Answering the question they asked matters more than answering fast."
- "Some interviewers judge accents unfairly. You cannot control that. You can control clear structure, specific facts, and checking that you understood."

## Existing courses and gaps

| Resource type | What it covers | What it leaves out or gets wrong | Use for this course |
|---|---|---|---|
| A training firm's STAR method page [S7] | The STAR answer shape; "focus on what they did, not their team" | Origin claim is the firm's own; no evidence on answer quality; no honesty or probing | Credit STAR as a trainers' shape; do not name the firm |
| University career-centre case guides [S60] | Clarify, think aloud, structure, sanity-check numbers, lead with the recommendation, state limits | Built for consulting firms, not startups; framework-heavy | Base for module 4's case shape, relabelled as practice advice |
| Founders' and investors' hiring essays [S54, S55] | What founders probe: own work, depth on one project, plain explanation, getting things done | US software context; "passion means talking fast"; written for interviewers | Base for finding 3 in plain wording; no names |
| Generic interview question lists and "best answers" pages (common online; not reviewed individually) | Lists of common questions and scripted model answers | Teach humblebrag weakness answers (the most common real answer type and the one raters penalise [S17]); encourage quantifying everything; templates produce pseudo-stories [S6]; rarely mention follow-up probing | Do not copy; use as a source of "check the advice" quiz items |
| AI chat assistants used as interview coaches (learners' current habit) | Fast feedback and sample answers | Tend to agree and praise [S43], prefer long answers [S44], and can invent plausible numbers for the learner | The course's AI interviewer must be designed against these faults (finding 11) |
| Online courses on interviewing (MOOCs) | Not reviewed in depth in this session (open question 9) | Unknown | No use until reviewed |

**Gap this course fills.** No resource found teaches interview answers for founder-run, unstructured interviews from the research on probing, storytelling and faking, in plain second-language English, with honesty built into the scoring and a practice interviewer designed to probe without leading.

## Technical landscape

- **`AI_INTERVIEW` activity (platform PR `feat/ai-interviewer-byok`).** Text chat; learner's own API key; configurable opening question, focus areas (ownership, impact, five-whys, resume, best-technical, storytelling, case-study, strengths-weaknesses) and why-depth; structured end feedback (strengths, weaknesses with a fix each, notes per area, next steps). Design notes in finding 11.
- **Cost and access.** API pricing, free tiers and model names change often and differ by provider; do not state prices or model names in chapters. Mark any such line "verify before publish". A full drill (about 10 to 15 exchanges plus feedback) is light on data in text, but token use depends on how much resume text is pasted; recommend pasting only the lines being practised.
- **Written fallback.** Every drill has an open question with a model answer and the same rubric, so a learner without a key completes the same gate (brief).
- **Key handling.** The key is a secret; the platform stores it only for the learner. Chapters tell learners never to paste a key into chat or share screenshots of settings [S52].
- **Untrusted input.** Pasted resumes and project text can contain instructions; the system prompt must treat them as data [S53].
- **Model drift.** Different providers and model versions behave differently; the rubric and system prompt need a small regression set (five or six sample transcripts with expected flags) re-run when the model changes. Recommendation, not a sourced fact.
- **Text versus voice.** Text practice trains content and structure, not speaking pace or accent (finding 12). Suggest one optional spoken rehearsal with a peer or mentor in the capstone.

## Failure modes

### How candidates fail these interviews (sourced)

1. **Self-descriptions instead of episodes.** "I am a hard worker" lowered hiring recommendations; real and near stories raised them [S6].
2. **Pseudo-stories.** Describing what you usually do instead of one time; the most common response type [S6].
3. **Too much situation, too little action and result** [S6].
4. **Borrowed or blurred credit.** Founders dig because it is easy to take credit for a team's success [S54]; borrowing is a recognised faking type [S5].
5. **Inventing under probing.** Probes can push candidates to construct examples or guesses [S3, S5].
6. **The humblebrag weakness.** The most common answer, and raters preferred a real weakness [S17].
7. **Jargon.** A founder rejected candidates who could not explain a project in plain terms [S55]; people overestimate how clearly they communicate in writing [S59].
8. **Passivity when blocked.** "There was nothing I could do" is read as a bad answer [S55].
9. **Tidy reasons invented after the fact** [S31, S32]; these break when a later "why" contradicts them.
10. **Anxiety lowering performance.** Moderate negative link with interview performance [S26], though not with job performance [S27, S28].
11. **Weak first answer.** Early impressions carry into later ratings [S18, S19].

### When teaching this (the course's main risks)

1. **Templates that create scripted answers.** Guard: teach answer qualities and practise on the learner's own stories; no memorised model answers.
2. **Pressure to quantify leads to invented numbers.** Guard: "I did not measure that" is a full-credit answer when paired with what you would measure; quizzes include a case where the honest gap is the best option.
3. **The AI interviewer leads, flatters or punishes.** Guard: design notes in finding 11; regression transcripts.
4. **Privacy leaks in pasted text.** Guard: one-line reminder on every drill; examples written with roles, not names.
5. **Anxiety from harsh drills.** Guard: neutral tone; feedback about the answer, not the person; normalise nerves (finding 8).
6. **Second-language reading load.** Guard: short sentences, one quality per chapter, worked before-and-after examples.
7. **Naming companies, founders or investors.** Guard: plain wording from finding 3; review check at G3.
8. **Overclaiming research.** Guard: the "phrase it this way" lines; numbers only where the dossier gives them with context.
9. **Accent bias discussed in a way that discourages.** Guard: one plain paragraph in module 6, followed at once by what the learner controls.
10. **Mentor time.** Guard: rubric flags and a capstone defence sheet so a mentor can review in under 30 minutes (brief).

## What not to teach (in about 12 to 15 hours, for this audience)

| Topic | Why not |
|---|---|
| Salary negotiation, offers, visas, contracts | Brief non-goal |
| Coding interviews and live coding | Brief non-goal (course 8) |
| Investor pitching | Brief non-goal |
| Validity coefficients and meta-analysis statistics | Second-language load; the direction is enough (finding 1) |
| Body-language tricks, power poses, mirroring | Self-presentation affects ratings more than job performance [S20]; tricks invite deceptive impression management; not needed for text practice |
| Lie detection by the candidate or "how to tell if the interviewer likes you" | People detect lies near chance [S9]; off goal |
| Personality tests and "what type are you" | Not part of founder interviews in the sources read |
| Consulting case frameworks by name | Practitioner lore; teach the seven-step habit instead (finding 9) |
| Detailed accent reduction or pronunciation training | Out of scope for a 3-week course; text-based practice cannot train it; risk of implying the accent is the problem |
| Applicant tracking systems and keyword stuffing | Not founder interviews; unsourced claims abound |
| Motivational interviewing as therapy | Only the listening skills are borrowed, for the AI design (finding 11) |
| Five whys as a root-cause analysis method for safety incidents | The course uses the habit of asking why on your own work, not RCA [S33] |

## Outline changes (recommended module and chapter shape)

Shape: six modules mapped to the six outcomes, each with a set-the-scene chapter, three Learn chapters, a quiz and a gate (an AI interview drill with a written fallback), plus a capstone module. Suggested time: set-the-scene 10 minutes, each Learn chapter about 25 minutes, quiz 10, gate and drill 30, so about 125 minutes per module; six modules is about 12.5 hours plus a 2-hour capstone, about 14.5 hours. If reading load runs long, cut the set-the-scene chapters to 5 minutes.

| Module | Outcome | Chapters | AI drill focus |
|---|---|---|---|
| 1. Stories you owned | 1 | 1.1 Set the scene: what a founder interview is like (free conversation, many whys, what founders look for) [S1, S3, S54, S55]. 1.2 One time, not "usually": stories versus pseudo-stories [S6]. 1.3 Your part and the team's: "I", "we" and end to end [S5, S54]. 1.4 Decisions, trade-offs and what you would change (the answer shape; STAR credited as trainers' shape) [S6, S7]. Quiz. Gate. | ownership, storytelling |
| 2. Impact with honest numbers | 2 | 2.1 Set the scene: why "from what?" is the founder's first question. 2.2 A number needs a before: baseline, time window, source. 2.3 How much was yours: attribution. 2.4 "I did not measure that": honest gaps, estimates and why invented numbers fail [S5, S8, S9]. Quiz. Gate. | impact |
| 3. Every line survives five whys | 3 | 3.1 Set the scene: the why chain on a resume. 3.2 How a why chain works and where it breaks (one cause, blame, depth) [S33, S34]. 3.3 Real reasons, not tidy ones: memory, hindsight and "that was not my decision" [S31, S32]. 3.4 The resume line audit: every line two whys deep. Quiz. Gate. | five-whys, resume |
| 4. Case questions aloud | 4 | 4.1 Set the scene: "how would you solve this problem we have?" [S54]. 4.2 Clarify and state assumptions [S60]. 4.3 Options and trade-offs. 4.4 Decide and say what you would measure [S60]. Quiz. Gate. | case-study |
| 5. The best technical thing you did | 5 | 5.1 Set the scene: two listeners, a founder and an engineer. 5.2 Choosing the story. 5.3 The founder version: beating the curse of knowledge [S57, S58, S59, S55]. 5.4 The engineer version: depth on request. Quiz. Gate. | best-technical |
| 6. Strengths, weaknesses and how you come across | 6 | 6.1 Set the scene: what you can and cannot control. 6.2 Strengths with evidence: narrow, checkable claims [S14, S15]. 6.3 A real weakness with a plan [S17]. 6.4 Nerves, accent and time to think [S25 to S28, S21, S23, S30, S61, S60]. Quiz. Gate. | strengths-weaknesses |
| 7. Capstone: the full interview | all | 7.1 Build the story bank: five owned stories with numbers or honest gaps. 7.2 The full AI interview across all focus areas (or the written full-interview fallback). 7.3 Read your feedback: compare flags from the first and last drills. 7.4 Mentor defence: the mentor picks one resume line and one story and asks five whys. | all areas |

Notes:
- Interleave from module 3 onward: drills mix one earlier focus area with the module's own, so learners choose which story fits.
- Teach finding 8 (first impressions, halo, similarity, video) inside 1.1 and 6.4 rather than as a separate module.
- Put the AI interviewer's "how it works and why" explanation and the privacy rule in 1.1 [S51, S52].

## Credits (how chapters should credit ideas)

| Idea | Person or source | How a chapter should credit it in plain words |
|---|---|---|
| Structured interviews predict better than unstructured | Paul Sackett and colleagues; Frank Schmidt and John Hunter; Julia Levashina, Michael Campion and colleagues [S1, S3] | "Researchers who study hiring, such as Paul Sackett and Michael Campion, find..." (names optional) |
| Components of structure | Michael Campion, David Palmer, James Campion [S3] | Usually no name needed |
| Past-behaviour and situational questions | Tom Janz; Gary Latham and colleagues [S3] | "Researchers developed two kinds of questions..." (no names needed) |
| STAR | Interview trainers; a training firm claims it (no names) [S7] | "A common answer shape that interview trainers call STAR." |
| Stories versus pseudo-stories | Adrian Bangerter and colleagues [S6] | "Researchers led by Adrian Bangerter recorded real interviews and found..." |
| Faking types (embellishing, borrowing, inventing) | Julia Levashina and Michael Campion [S5] | "Researchers who study faking in interviews..." |
| Honest versus deceptive impression management | Joshua Bourdage, Nicolas Roulin, Julia Levashina [S8] | Usually no name needed |
| Lie detection near chance | Charles Bond and Bella DePaulo [S9] | "A large review of lie-detection studies found..." |
| Self-assessment accuracy | David Dunning, Chip Heath, Jerry Suls; Ethan Zell and Zlatan Krizan [S14, S15] | "Psychologists such as David Dunning have found..." |
| Dunning-Kruger effect | Justin Kruger and David Dunning [S10]; critics [S11, S16] | "A well-known study by Justin Kruger and David Dunning..." with the plain correction in finding 7 |
| Humblebragging | Ovul Sezer, Francesca Gino, Michael Norton [S17] | "In one study, researchers asked students how they would answer 'What is your weakness?'..." |
| First impressions in interviews | Murray Barrick and colleagues [S18, S19] | Usually no name needed |
| Halo effect | Richard Nisbett and Timothy Wilson [S30] | "In a classic experiment..." |
| Telling more than we can know | Richard Nisbett and Timothy Wilson [S31] | "Psychologists have found that people often explain their own choices with reasons that sound right but were not the real ones." |
| Hindsight bias | Baruch Fischhoff [S32] | "Researchers call this hindsight bias." |
| Cultural matching | Lauren Rivera [S65] | Usually no name needed |
| Accent and hiring | Megumi Hosoda and colleagues; Laura Huang and colleagues [S21, S23] | "Studies where actors read the same answers with different accents found..." |
| Interview anxiety | Julie McCarthy and Richard Goffin; Deborah Powell and colleagues [S25, S26] | Usually no name needed |
| Five whys | Attributed to Taiichi Ohno [S34] | Open question 1: name Ohno, or say "from factory problem-solving in Japan". Do not name the company. |
| Laddering | Thomas Reynolds and Jonathan Gutman (as quoted in [S37]) | Usually no name needed |
| Curse of knowledge | Colin Camerer, George Loewenstein, Martin Weber [S57] | "Economists named this the curse of knowledge." |
| Tapping study | Elizabeth Newton (dissertation not read) | Only if instructors approve, without numbers (U3) |
| Open prompts in investigative interviews | Michael Lamb and colleagues [S35] | For the platform team only; not in learner text (child-abuse context) |
| OARS listening skills | Motivational interviewing (William Miller and Stephen Rollnick; book not read) [S38, S39] | For the platform team; in learner text, "good listeners ask open questions and check they understood" |
| Feedback that helps or harms | Avraham Kluger and Angelo DeNisi; John Hattie and Helen Timperley [S42, S40, S41] | For the platform team and mentor guide |
| LLM sycophancy and judge biases | Mrinank Sharma and colleagues; Lianmin Zheng and colleagues [S43, S44] | For the platform team; learner text says "AI tools tend to agree with you and to like long answers" |
| Founders' hiring advice | Founder and investor essays [S54, S55] | "Founders who write about hiring say..." Never name them. |

## Source table

Type key: P = primary research (peer-reviewed paper, meta-analysis, review, dissertation abstract); F = first-party writing (a founder's, investor's or firm's own page, or a standards body); S = reputable secondary (government or professional body summary); W = practitioner guidance (orientation; labelled when used). "Full text", "abstract" or "page" says what was read. All dates checked: 2026-10-24.

| ID | Claim | Source | Type | Date checked | Confidence |
|---|---|---|---|---|---|
| S1 | Revised operational validity: structured interviews .42 (was .51), unstructured .19 (was .38); structured interviews top-ranked; large residual SD (.19) for structured; earlier corrections overcorrected for range restriction; Schmidt and Hunter 1998 values as reported. | Sackett, P. R., Zhang, C., Berry, C. M. and Lievens, F. "Revisiting Meta-Analytic Estimates of Validity in Personnel Selection: Addressing Systematic Overcorrection for Restriction of Range." Journal of Applied Psychology 107(11): 2040 to 2068, 2022. https://doi.org/10.1037/apl0000994 (author copy read) | P (full text) | 2026-10-24 | High |
| S2 | Technology-mediated interviews: lower interviewer ratings (d = -.41) and applicant reactions (d = -.36) than face to face; 12 studies; caution against mixing modes. | Blacksmith, N., Willford, J. C. and Behrend, T. S. "Technology in the Employment Interview: A Meta-Analysis and Future Research Agenda." Personnel Assessment and Decisions 2(1), 2016. https://doi.org/10.25035/pad.2016.002 | P (abstract) | 2026-10-24 | High |
| S3 | Structure consistently improves reliability and validity; 15 components of structure (Campion et al. 1997); SQ versus PBQ validity and constructs; experience does not moderate PBQ validity (Gibb and Taylor); IM effects lower in structured interviews (Barrick et al. 2009: .27 to .17); probing more common in unstructured interviews; probing increased faking; probing "never experienced" may force invention; proposed probe types; practical advice on neutral planned probes; applicants prefer unstructured interviews. | Levashina, J., Hartwell, C. J., Morgeson, F. P. and Campion, M. A. "The Structured Employment Interview: Narrative and Quantitative Review of the Research Literature." Personnel Psychology 67: 241 to 293, 2014. Author copy via Purdue University; record https://digitalcommons.usu.edu/manage_facpub/423/ | P (full text) | 2026-10-24 | High |
| S4 | Voluntary coaching and specific preparation related to better situational interview performance among 213 promotion candidates, partly through better-organised answers. | Maurer, T. J., Solamon, J. M., Andrews, K. D. and Troxtel, D. D. "Interviewee coaching, preparation strategies, and response strategies in relation to performance in situational employment interviews." Journal of Applied Psychology 86(4): 709 to 717, 2001. https://doi.org/10.1037/0021-9010.86.4.709 | P (abstract) | 2026-10-24 | Medium (one setting) |
| S5 | Over 90 percent of undergraduate candidates reported some faking; 28 to 75 percent for lying-like faking; 11 faking subfactors with definitions; PBQs more resistant to faking than SQs; follow-up questioning increased faking; faking scores related to second interviews or offers. | Levashina, J. and Campion, M. A. "Measuring faking in the employment interview: Development and validation of an Interview Faking Behavior scale." Journal of Applied Psychology 92(6): 1638 to 1656, 2007. https://doi.org/10.1037/0021-9010.92.6.1638 | P (full text) | 2026-10-24 | High (self-report) |
| S6 | In 62 recorded interviews, stories were 23 percent of answers to PBQs; pseudo-stories most frequent; stories had more situation than action or result; stories and pseudo-stories raised hiring recommendations, self-descriptions lowered them; definitions of response types. | Bangerter, A., Corvalan, P. and Cavin, C. "Storytelling in the Selection Interview? How Applicants Respond to Past Behavior Questions." Journal of Business and Psychology 29(4): 593 to 604, 2014. Author copy: https://libra.unine.ch/bitstreams/c09ffd04-9bea-4a69-969b-d3c4ac890a0c/download | P (full text) | 2026-10-24 | High (one sample, Swiss students) |
| S7 | A training firm states it invented STAR and introduced it in 1974 with its interview system; defines Situation/Task, Action, Result; advises focusing on what the candidate did, not the team. | DDI, "STAR Method" page. https://www.ddi.com/solutions/behavioral-interviewing/star-method | F (page) | 2026-10-24 | Medium (self-claim) |
| S8 | Honest versus deceptive IM distinction; observers poor at distinguishing them (citing Roulin et al. 2015); IM linked to higher ratings, deceptive IM findings mixed; warnings reduced deceptive IM in one study. | Bourdage, J. S., Roulin, N. and Levashina, J. "Editorial: Impression Management and Faking in Job Interviews." Frontiers in Psychology 8: 1294, 2017. https://doi.org/10.3389/fpsyg.2017.01294 | P (editorial, full text) | 2026-10-24 | High |
| S9 | People average 54 percent correct lie-truth judgments (61 percent truths, 47 percent lies) across 206 documents and 24,483 judges. | Bond, C. F. and DePaulo, B. M. "Accuracy of deception judgments." Personality and Social Psychology Review 10(3): 214 to 234, 2006. https://pubmed.ncbi.nlm.nih.gov/16859438/ | P (abstract) | 2026-10-24 | High |
| S10 | Bottom-quartile scorers at about the 12th percentile estimated themselves at about the 62nd. | Kruger, J. and Dunning, D. "Unskilled and unaware of it." Journal of Personality and Social Psychology 77(6): 1121 to 1134, 1999. https://doi.org/10.1037/0022-3514.77.6.1121 | P (abstract) | 2026-10-24 | High |
| S11 | Asymmetric errors explained by regression and better-than-average effect. | Krueger, J. and Mueller, R. A. "Unskilled, unaware, or both?" Journal of Personality and Social Psychology 82(2): 180 to 188, 2002. https://pubmed.ncbi.nlm.nih.gov/11831408/ | P (abstract) | 2026-10-24 | High (as a critique) |
| S12 | Kruger and Dunning dispute the regression account. | Kruger, J. and Dunning, D. "Unskilled and unaware, but why?" Journal of Personality and Social Psychology 82(2): 189 to 192, 2002. https://pubmed.ncbi.nlm.nih.gov/11831409/ | P (abstract) | 2026-10-24 | High (as a reply) |
| S13 | Large replication (about 4,000 per study) and model support low performers being less able to tell if they are correct in grammar and logic. | Jansen, R. A., Rafferty, A. N. and Griffiths, T. L. "A rational model of the Dunning-Kruger effect supports insensitivity to evidence in low performers." Nature Human Behaviour 5: 756 to 763, 2021. https://doi.org/10.1038/s41562-021-01057-0 | P (abstract) | 2026-10-24 | High |
| S14 | Self-views have a tenuous to modest link with performance; others sometimes predict better; employees overestimate skill, making feedback harder. | Dunning, D., Heath, C. and Suls, J. M. "Flawed Self-Assessment: Implications for Health, Education, and the Workplace." Psychological Science in the Public Interest 5(3): 69 to 106, 2004. https://doi.org/10.1111/j.1529-1006.2004.00018.x | P (abstract) | 2026-10-24 | High |
| S15 | Mean correlation .29 between self-evaluations and performance across 22 meta-analyses; stronger for specific, objective, familiar, simple tasks. | Zell, E. and Krizan, Z. "Do People Have Insight Into Their Abilities? A Metasynthesis." Perspectives on Psychological Science 9(2): 111 to 125, 2014. https://doi.org/10.1177/1745691613518075 | P (abstract) | 2026-10-24 | High |
| S16 | Significant but minimal Dunning-Kruger effect for intelligence with better methods. | Dunkel, C. S., Nedelec, J. and van der Linden, D. "Reevaluating the Dunning-Kruger effect: A response to and replication of Gignac and Zajenkowski (2020)." Intelligence 96: 101717, 2023. Copy read: https://www.gwern.net/doc/iq/2023-dunkel.pdf | P (abstract and introduction) | 2026-10-24 | Medium |
| S17 | 122 US students: 77 percent humblebrag weakness answers (perfectionism 32.8 percent, working too hard 24.6 percent), 23 percent real; raters more willing to hire real-weakness answers (3.93 versus 3.03 on 7); humblebragging seen as insincere across studies. | Sezer, O., Gino, F. and Norton, M. I. "Humblebragging: A distinct and ineffective self-presentation strategy." Journal of Personality and Social Psychology 114(1): 52 to 74, 2018. https://doi.org/10.1037/pspi0000108 (working paper full text, HBS 15-080) | P (full text of working paper; abstract of published version) | 2026-10-24 | High (one study for the interview claim) |
| S18 | Better early impressions: higher ratings (r = .42), more internship offers (r = .22); early competence judgments carried to other interviewers, liking and similarity did not. | Barrick, M. R., Swider, B. W. and Stewart, G. L. "Initial evaluations in the interview." Journal of Applied Psychology 95(6): 1163 to 1172, 2010. https://doi.org/10.1037/a0019918 | P (abstract) | 2026-10-24 | High |
| S19 | Initial impressions overlap with job-related content and relate more to early answers (163 mock interviews). | Swider, B. W., Barrick, M. R. and Harris, T. B. "Initial impressions." Journal of Applied Psychology 101(5): 625 to 638, 2016. https://doi.org/10.1037/apl0000077 | P (abstract) | 2026-10-24 | High |
| S20 | Self-presentation tactics affect interview ratings, especially unstructured, more than job performance. | Barrick, M. R., Shaffer, J. A. and DeGrassi, S. W. "What you see may not be what you get." Journal of Applied Psychology 94(6): 1394 to 1411, 2009. https://doi.org/10.1037/a0016532 | P (abstract) | 2026-10-24 | High |
| S21 | Mexican-Spanish-accented applicant for an entry-level software engineering job rated less suitable, less promotable, hired less often (matched guise). | Hosoda, M., Nguyen, L. T. and Stone-Romero, E. F. "The effect of Hispanic accents on employment decisions." Journal of Managerial Psychology 27(4): 347 to 364, 2012. https://doi.org/10.1108/02683941211220162 | P (abstract) | 2026-10-24 | High |
| S22 | Vietnamese-accented speakers rated poorer communicators. | Hosoda, M., Stone-Romero, E. F. and Walter, J. N. "Listeners' cognitive and affective reactions to English speakers with standard American English and Asian accents." Perceptual and Motor Skills 104(1): 307 to 326, 2007. https://doi.org/10.2466/pms.104.1.307-326 | P (abstract) | 2026-10-24 | High |
| S23 | Nonnative speakers with identical scripts less likely recommended for middle management, mediated by perceived political skill. | Huang, L., Frideger, M. and Pearce, J. L. "Political skill: Explaining the effects of nonnative accent on managerial hiring and entrepreneurial investment decisions." Journal of Applied Psychology 98(6): 1005 to 1017, 2013. https://doi.org/10.1037/a0034125 | P (abstract) | 2026-10-24 | High |
| S24 | Accent and credibility findings mixed since Lev-Ari and Keysar 2010; some failures to replicate; 2024 study: social bias against foreign voices but no effect on truth ratings. | Lorenzoni, A., Faccio, R. and Navarrete, E. "Does Foreign-Accented Speech Affect Credibility? Evidence from the Illusory-Truth Paradigm." Journal of Cognition 7(1): 26, 2024. https://doi.org/10.5334/joc.353 | P (full text) | 2026-10-24 | High |
| S25 | Five dimensions of interview anxiety; scales predict interview performance (multiple R = .34). | McCarthy, J. and Goffin, R. "Measuring job interview anxiety: Beyond weak knees and sweaty palms." Personnel Psychology 57(3): 607 to 637, 2004. https://doi.org/10.1111/j.1744-6570.2004.00002.x | P (abstract) | 2026-10-24 | High |
| S26 | Meta-analytic correlation of interview anxiety with interview performance about -.19. | Powell, D. M., Stanley, D. J. and Brown, K. N. "Meta-analysis of the relation between interview anxiety and interview performance." Canadian Journal of Behavioural Science 50(4): 195 to 207, 2018. https://doi.org/10.1037/cbs0000108 | P (abstract) | 2026-10-24 | High |
| S27 | Interview anxiety near-zero correlation with job performance (residence assistants). | Schneider, L., Powell, D. M. and Bonaccio, S. "Does interview anxiety predict job performance and does it influence the predictive validity of interviews?" International Journal of Selection and Assessment 27(4): 328 to 336, 2019. https://doi.org/10.1111/ijsa.12263 | P (abstract) | 2026-10-24 | Medium (one sample) |
| S28 | Interview anxiety near-zero correlation with job performance (128 applicants). | Zhang, I. Y., Powell, D. M. and Bonaccio, S. "The role of fear of negative evaluation in interview anxiety and social-evaluative workplace anxiety." International Journal of Selection and Assessment 30(2): 302 to 310, 2022 (online 2021). https://doi.org/10.1111/ijsa.12365 | P (abstract) | 2026-10-24 | Medium |
| S29 | Interviewer characteristics (warmth, unfriendliness, competence, humour) affected applicant anxiety and attraction. | Carless, S. A. and Imber, A. "The influence of perceived interviewer and job and organizational characteristics on applicant attraction and job choice intentions: The role of applicant anxiety." International Journal of Selection and Assessment 15(4): 359 to 371, 2007. https://doi.org/10.1111/j.1468-2389.2007.00395.x | P (abstract) | 2026-10-24 | Medium |
| S30 | Halo: warm versus cold behaviour changed ratings of the same instructor's appearance, mannerisms and accent; raters unaware. | Nisbett, R. E. and Wilson, T. D. "The halo effect: Evidence for unconscious alteration of judgments." Journal of Personality and Social Psychology 35(4): 250 to 256, 1977. https://doi.org/10.1037/0022-3514.35.4.250 | P (abstract) | 2026-10-24 | High |
| S31 | People report reasons for their choices from plausible causal theories, not true introspection. | Nisbett, R. E. and Wilson, T. D. "Telling more than we can know: Verbal reports on mental processes." Psychological Review 84(3): 231 to 259, 1977. https://doi.org/10.1037/0033-295X.84.3.231 | P (abstract) | 2026-10-24 | High |
| S32 | Hindsight bias found widely; warnings have no discernible effect; reconstructing past perspectives might help. | Fischhoff, B. "Fifty years of hindsight bias research: Reflection on Fischhoff (1975)." Journal of Experimental Psychology: Human Perception and Performance 51(2): 143 to 150, 2025. https://doi.org/10.1037/xhp0001232 | P (abstract) | 2026-10-24 | High |
| S33 | Five whys valued for teaching but may be misguided for root-cause analysis because it oversimplifies complex problems; popularity not evidence-based. | AHRQ Patient Safety Network summary of Card, A. J. "The problem with '5 whys'." BMJ Quality and Safety 26(8): 671 to 677, 2017. https://doi.org/10.1136/bmjqs-2016-005849 ; summary https://psnet.ahrq.gov/issue/problem-5-whys | S (summary; original not opened) | 2026-10-24 | Medium |
| S34 | Five whys attributed to Taiichi Ohno; ask why until the root cause; a cause may be another symptom; more than one root cause; different people answer differently. | Institute for Healthcare Improvement, "5 Whys: Finding the Root Cause" tool. https://www.ihi.org/library/tools/5-whys-finding-root-cause | S (page) | 2026-10-24 | Medium |
| S35 | Open prompts elicit more accurate information; prompt hierarchy (invitation, cued invitation, directive, option-posing, suggestive); protocol interviewers used three times more open prompts. | Lamb, M. E., Orbach, Y., Hershkowitz, I., Esplin, P. W. and Horowitz, D. "A structured forensic interview protocol improves the quality and informativeness of investigative interviews with children." Child Abuse and Neglect 31(11 to 12): 1201 to 1231, 2007. https://doi.org/10.1016/j.chiabu.2007.03.021 | P (full text) | 2026-10-24 | High (child context) |
| S36 | Laddering has methodological problems, including how much to direct the respondent. | Grunert, K. G., Beckmann, S. C. and Sorensen, E. "Means-end chains and laddering: An inventory of problems and an agenda for research." Book chapter, 2000, pp. 63 to 90 (repository record). https://pure.au.dk/portal/en/publications/818bd7c0-5c22-11da-ae64-000ea68e967b | P (executive summary) | 2026-10-24 | Medium |
| S37 | Laddering definition (Reynolds and Gutman 1988); needs highly trained interviewers. | Veludo-de-Oliveira, T. M., Ikeda, A. A. and Campomar, M. C. "Discussing laddering application by the means-end chain theory." The Qualitative Report, 2006. https://doi.org/10.46743/2160-3715/2006.1651 | P (abstract) | 2026-10-24 | Medium |
| S38 | MI fidelity coding counts questions, simple and complex reflections, reflection-to-question ratio, and codes persuade and confront. | Moyers, T. B., Rowell, L. N., Manuel, J. K., Ernst, D. and Houck, J. M. "The Motivational Interviewing Treatment Integrity Code (MITI 4)." Journal of Substance Abuse Treatment 65: 36 to 42, 2016. https://doi.org/10.1016/j.jsat.2016.01.001 | P (full text, parts) | 2026-10-24 | High |
| S39 | OARS defined; high use of all four skills in text messages went with more change talk. | Arayasirikul, S. and colleagues. "Does the Use of Motivational Interviewing Skills Promote Change Talk Among Young People Living With HIV in a Digital HIV Care Navigation Text Messaging Intervention?" Health Promotion Practice 21(5): 738 to 743, 2020. https://doi.org/10.1177/1524839920936246 | P (abstract) | 2026-10-24 | Medium |
| S40 | Feedback powerful but can be positive or negative; type and manner matter. | Hattie, J. and Timperley, H. "The Power of Feedback." Review of Educational Research 77(1): 81 to 112, 2007. https://doi.org/10.3102/003465430298487 | P (abstract) | 2026-10-24 | High |
| S41 | Feed up, feed back, feed forward; task, process, self-regulation and self levels; praise low effect, corrective feedback effective; meta-analysis d = 0.48 with large heterogeneity by information content. | Wisniewski, B., Zierer, K. and Hattie, J. "The Power of Feedback Revisited: A Meta-Analysis of Educational Feedback Research." Frontiers in Psychology 10: 3087, 2020. https://doi.org/10.3389/fpsyg.2019.03087 | P (full text) | 2026-10-24 | High |
| S42 | Feedback interventions d = .41 on average; over a third decreased performance; less effective as attention moves to the self. | Kluger, A. N. and DeNisi, A. "The effects of feedback interventions on performance." Psychological Bulletin 119(2): 254 to 284, 1996. https://doi.org/10.1037/0033-2909.119.2.254 | P (abstract) | 2026-10-24 | High |
| S43 | AI assistants show feedback sycophancy, "are you sure?" sycophancy and mimicry; human preference data favours matching user views. | Sharma, M. and colleagues. "Towards Understanding Sycophancy in Language Models." arXiv 2310.13548, 2023 (ICLR 2024). https://arxiv.org/abs/2310.13548 | P (full text, parts) | 2026-10-24 | High |
| S44 | LLM judges show position, verbosity ("repetitive list" attack) and self-enhancement biases; GPT-4 judge agreement with humans over 80 percent. | Zheng, L. and colleagues. "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena." arXiv 2306.05685, 2023 (NeurIPS 2023). https://arxiv.org/abs/2306.05685 | P (full text, parts) | 2026-10-24 | High |
| S45 | Changing answer order can reverse LLM judge rankings; calibration strategies. | Wang, P. and colleagues. "Large Language Models are not Fair Evaluators." arXiv 2305.17926, 2023. https://arxiv.org/abs/2305.17926 | P (abstract) | 2026-10-24 | Medium |
| S46 | LLM evaluators recognise and favour their own generations. | Panickssery, A., Bowman, S. R. and Feng, S. "LLM Evaluators Recognize and Favor Their Own Generations." arXiv 2404.13076, 2024. https://arxiv.org/abs/2404.13076 | P (abstract) | 2026-10-24 | Medium |
| S47 | Machine learning detected storytelling in PBQ answers with best accuracy 78 percent. | Bangerter, A., Mayor, E., Muralidhar, S., Kleinlogel, E. P., Gatica-Perez, D. and Schmid Mast, M. "Automatic identification of storytelling responses to past-behavior interview questions via machine learning." International Journal of Selection and Assessment 31(3): 376 to 387, 2023. https://doi.org/10.1111/ijsa.12428 | P (abstract) | 2026-10-24 | Medium |
| S48 | More negative reactions to asynchronous interviews, but similar observer-rated performance and lower apparent stress (N = 299, Switzerland and India). | Kleinlogel, E. P., Schmid Mast, M., Jayagopi, D. B., Shubham, K. and Butera, A. "'The interviewer is a machine!'" International Journal of Selection and Assessment 31(3): 403 to 419, 2023. https://doi.org/10.1111/ijsa.12433 | P (abstract) | 2026-10-24 | Medium |
| S49 | 27,809 real applicants: more preparation time and re-recording related to better reactions; more questions to worse. | Tilston, O., Krings, F., Roulin, N., Bourdage, J. S. and Fetzer, M. S. "Reactions to asynchronous video interviews: The role of design decisions and applicant age and gender." Human Resource Management 63(2): 313 to 332, 2024 (online 2023). https://doi.org/10.1002/hrm.22202 | P (abstract) | 2026-10-24 | High |
| S50 | Longer preparation time and re-recording increased performance ratings; warnings had no effect in these experiments. | Lukacik, E.-R. and Bourdage, J. S. "Does Design Matter? The (Limited) Effects of Six Asynchronous Video Interview Design Features." International Journal of Selection and Assessment 33(1), 2025 (online 2024). https://doi.org/10.1111/ijsa.12511 | P (abstract) | 2026-10-24 | Medium |
| S51 | Applicants react negatively to automated interviews; process justification helped more than process information. | Langer, M., Baum, K., König, C. J., Hähne, V., Oster, D. and Speith, T. "Spare me the details: How the type of information about automated interviews influences applicant reactions." International Journal of Selection and Assessment 29(2): 154 to 169, 2021. https://doi.org/10.1111/ijsa.12325 | P (abstract) | 2026-10-24 | Medium |
| S52 | Sensitive information disclosure risk: PII, confidential business data, credentials; educate users. | OWASP GenAI Security Project, "LLM02:2025 Sensitive Information Disclosure." https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/ | F (standard) | 2026-10-24 | High |
| S53 | Prompt injection, including indirect injection from external content. | OWASP GenAI Security Project, "LLM01:2025 Prompt Injection." https://genai.owasp.org/llmrisk/llm01-prompt-injection/ | F (standard) | 2026-10-24 | High |
| S54 | Founder advice: ask about impressive projects and last month's work, go deep on what the candidate actually did, ask how they would solve a current problem, check references, have people audition; roles change within months. | Altman, S. "How to hire." Personal blog (undated in the fetched page). https://blog.samaltman.com/how-to-hire | F (page) | 2026-10-24 | Medium (one founder's view) |
| S55 | Founder advice: look for smart and gets things done; ask about a recent project; reject candidates who cannot explain plainly; "So what did you do?"; "nothing I could do" is a bad answer; passion as animated speech. | Spolsky, J. "The Guerrilla Guide to Interviewing (version 3.0)." Joel on Software, 25 October 2006. https://www.joelonsoftware.com/2006/10/25/the-guerrilla-guide-to-interviewing-version-30/ | F (page) | 2026-10-24 | Medium (one founder's view) |
| S56 | Small firms (60, up to 50 staff) recruit through employees' networks and some test via work samples or trials. | Coetzer, A. and Campbell, J. "Complementarities between recruitment and selection practices and employee learning in New Zealand small and medium-sized enterprises." Labour, Employment and Work in New Zealand, 2006. https://doi.org/10.26686/lew.v0i0.1577 | P (abstract) | 2026-10-24 | Medium |
| S57 | Curse of knowledge: better-informed agents cannot ignore private information. | Camerer, C., Loewenstein, G. and Weber, M. "The Curse of Knowledge in Economic Settings: An Experimental Analysis." Journal of Political Economy 97(5): 1232 to 1254, 1989. https://doi.org/10.1086/261651 | P (abstract) | 2026-10-24 | High |
| S58 | Adults show curse-of-knowledge bias in false-belief reasoning. | Birch, S. A. J. and Bloom, P. "The curse of knowledge in reasoning about false beliefs." Psychological Science 18(5): 382 to 386, 2007. https://doi.org/10.1111/j.1467-9280.2007.01909.x | P (abstract) | 2026-10-24 | High |
| S59 | People overestimate how well they communicate tone and meaning over email, due to egocentrism. | Kruger, J., Epley, N., Parker, J. and Ng, Z.-W. "Egocentrism over e-mail: Can we communicate as well as we think?" Journal of Personality and Social Psychology 89(6): 925 to 936, 2005. https://doi.org/10.1037/0022-3514.89.6.925 | P (abstract) | 2026-10-24 | High |
| S60 | Case interview advice: clarify, ask for time, think out loud, structure, sanity-check numbers, lead with recommendation, state limits. | Boston College Career Center, "Consulting Interview Guide." https://www.bc.edu/content/dam/files/offices/careers/pdf/Interview/Consulting_Interview_Guide.pdf | W (full text) | 2026-10-24 | Medium (practitioner) |
| S61 | Pause and speed measures best predicted untrained raters' fluency judgments of L2 speech; repairs contributed little. | Bosker, H. R., Pinget, A.-F., Quené, H., Sanders, T. and de Jong, N. H. "What makes speech sound fluent? The contributions of pauses, speed and repairs." Language Testing 30(2): 159 to 175, 2013. https://doi.org/10.1177/0265532212455394 | P (abstract) | 2026-10-24 | High |
| S62 | Listeners weigh fluency features the same way for native and non-native speech. | Bosker, H. R. "The processing and evaluation of fluency in native and non-native speech." PhD dissertation, Utrecht University, 2014. http://hdl.handle.net/11858/00-001M-0000-0019-C263-3 | P (abstract) | 2026-10-24 | Medium |
| S63 | Reverse linguistic stereotyping: attributed group membership distorts speech evaluations; contact with nonnative speakers predicted evaluations. | Kang, O. and Rubin, D. L. "Reverse Linguistic Stereotyping: Measuring the Effect of Listener Expectations on Speech Evaluation." Journal of Language and Social Psychology 28(4): 441 to 456, 2009. https://doi.org/10.1177/0261927X09341950 | P (abstract) | 2026-10-24 | High |
| S64 | Intention to commit resume fraud driven by perceived benefits and weakened by personal norms (286 graduates, hypothetical advert). | Man, F. L. C., He, H. H. and Cheung, S.-K. "Rational Choice, Personal Norms, Social Norms and Intention to Commit Resume Fraud." International Journal of Social Science Research 9(1), 2020. https://doi.org/10.5296/ijssr.v9i1.17812 | P (abstract) | 2026-10-24 | Low to medium (intention, one sample) |
| S65 | Elite-firm evaluators sought culturally similar candidates; shared culture often outweighed productivity concerns (120 employer interviews). | Rivera, L. A. "Hiring as Cultural Matching: The Case of Elite Professional Service Firms." American Sociological Review 77(6): 999 to 1022, 2012. https://doi.org/10.1177/0003122412463213 | P (abstract) | 2026-10-24 | High (elite firms) |
| S66 | Applicants across 17 countries rate interviews and work samples as the most preferred selection methods. | Anderson, N., Salgado, J. F. and Hülsheger, U. R. "Applicant reactions in selection: Comprehensive meta-analysis into reaction generalization versus situational specificity." International Journal of Selection and Assessment 18(3): 291 to 304, 2010. https://doi.org/10.1111/j.1468-2389.2010.00512.x | P (abstract) | 2026-10-24 | High |
| S67 | A structured interview coaching programme aimed to improve performance without harming validity and reliability. | Maurer, T. J. and Solamon, J. M. "The science and practice of a structured employment interview coaching program." Personnel Psychology 59(2): 433 to 456, 2006. https://doi.org/10.1111/j.1744-6570.2006.00042.x | P (abstract) | 2026-10-24 | Medium (goals, not results) |
| S68 | Taiichi Ohno established the foundation of the company's production system and the framework for just-in-time. | Toyota Motor Corporation, "Toyota Production System" page. https://global.toyota/en/company/vision-and-philosophy/production-system/ | F (page) | 2026-10-24 | High (for this narrow claim) |

**Count:** 68 sources, 68 claim rows. Full texts were read for S1, S3, S5, S6, S8, S17 (working paper), S24, S35, S38 (parts), S41, S43 (parts), S44 (parts), S55, S60, and the pages S7, S33, S34, S52, S53, S54, S68. Abstracts only for the rest. Abstracts came from PubMed, OpenAlex, Semantic Scholar, Crossref and arXiv records where publisher pages were blocked. S66 (applicants in 17 countries rate interviews among the most preferred methods) and S67 (a coaching programme's stated goals) are supporting rows not cited in the findings; they may be dropped.

## Unverified claims (do not use as fact in learner-facing text)

| # | Claim | Status | How chapters should phrase it |
|---|---|---|---|
| U1 | "Recruiters spend six seconds on a resume." | Traced only to a company's own eye-tracking report, not opened, not peer-reviewed. | Do not use. "Many readers skim. Put the strongest, most specific line first." |
| U2 | "Communication is 55 percent body language, 38 percent tone, 7 percent words." | Popular misreading of narrow 1960s experiments; not opened here. | Do not use. |
| U3 | Newton's tapping study numbers (120 songs, listeners named about 2.5 percent, tappers predicted 50 percent). | Dissertation not read; only secondary reports. | Only with instructor approval and without numbers: "In one study, people tapping a song's rhythm expected listeners to guess it far more often than they did." |
| U4 | "STAR was invented by [person] in [year]." | No research source; one firm's self-claim [S7]. | "A common answer shape that interview trainers call STAR." |
| U5 | Resume lie statistics ("85 percent of applicants lie on their resumes"). | Survey figures from screening companies; not opened; the one research measure found [S64] measured intention. | Do not use a percentage. "Some people stretch the truth on resumes; founders know this and check." |
| U6 | Interviewers detected only 13 to 23 percent of IM tactics (Roulin, Bangerter and Levashina 2015, Personnel Psychology 68: 395 to 444). | Seen only in search snippets; paper not read. | "Interviewers are poor at telling honest from dishonest self-presentation" [S8]. |
| U7 | Exact wording of Ohno's five whys, or that the method was created by Sakichi Toyoda. | Primary book and the company's archived page not opened. | "Attributed to an engineer who helped build a Japanese car maker's production system" [S34]. |
| U8 | "Dunning-Kruger means the incompetent think they are experts." | Contradicted by the original data [S10]. | See finding 7. |
| U9 | The "confidence versus competence" curve ("Mount Stupid"). | Not in the original papers read. | Do not use. |
| U10 | "Interviewers decide in the first 30 seconds / 7 seconds / 90 seconds." | No primary source for a specific figure. | "First impressions start early and colour the first answers" [S18, S19]. |
| U11 | Press figures for accent penalties (for example "16 percent less likely"). | Press coverage of [S23], not the paper. | "Studies found accented candidates were rated lower with identical answers" [S21, S23]. |
| U12 | "Past behaviour is the best predictor of future behaviour" as a law. | Premise of a question type, not an established law [S3]. | "Past examples are one of the better guides interviewers have." |
| U13 | Loftus and Palmer's leading-question results ("smashed" versus "hit" speed estimates). | Paper not opened. | Do not cite in learner text; use [S35] in the platform notes. |
| U14 | "Structured interviews remove bias." | Not supported; they reduce some effects [S3], not all. | "Planned interviews reduce some kinds of bias." |
| U15 | "Warning candidates against faking stops faking." | One study reduced deceptive IM [S8]; others found no effect [S50]. | Do not claim. |
| U16 | OARS was coined by Miller and Rollnick in a named edition of their book. | Book not read; acronym confirmed in [S39]. | "Counsellors use four listening skills: open questions, affirmations, reflections and summaries." |
| U17 | "Asking the interviewer to repeat a question looks weak" (or the opposite). | No research found either way. | Present as course advice: "checking you understood is better than answering the wrong question." |
| U18 | Specific reflection-to-question ratio targets (for example 2:1) from the MITI manual. | Manual marked "do not cite without permission". | Use "about one reflection for every two or three questions" as a design starting point, labelled as the team's choice. |
| U19 | "Founders hire for passion" as a research finding. | One founder's essay [S55]. | "Some founders say they look for people who care about their work." |
| U20 | Founder interviews are mostly unstructured, as a measured fact about startups. | Inferred from first-party essays [S54, S55] and small-firm research [S56]; no direct study. | "Many founder interviews are free conversations." |

**Count:** 20 unverified claims.

## Open questions for instructors

1. **Five whys credit.** Name Taiichi Ohno (an engineer, not a founder or investor) or say "from factory problem-solving in Japan"? Naming him points to a company; the brief bans company names.
2. **Researcher names.** How many researcher names per chapter (recommendation: at most two, only in "where this comes from" asides)?
3. **Founder-interview evidence.** No peer-reviewed study of startup founders' interviewing was found. Do instructors with startup hiring experience confirm the probe list in finding 3 (ownership, recent output, depth, plain explanation, initiative, honest credit)?
4. **Accent bias.** One plain paragraph in 6.4 (recommended), or leave it out to avoid discouraging fellows?
5. **AI interviewer defaults.** Default why-depth 3, maximum 5? Separate judge call (doubles token cost)? Reflection ratio as in design note 6?
6. **Fallback grading.** Should the written fallback use exactly the same rubric flags as the AI feedback, so mentors compare like with like (recommended)?
7. **Tapping study.** Use it without numbers (U3), or drop it?
8. **Spoken practice.** Add one optional spoken mock with a peer or mentor in the capstone, since text chat cannot train pace or pronunciation?
9. **Existing courses.** Should a reviewer scan one or two interviewing MOOCs before G2B? This session did not.
10. **Weakness examples.** Which real weaknesses are acceptable as worked examples for this audience (for example "I avoid asking for help too long", "I underestimate time for testing")?
11. **Privacy wording.** Is "use roles, not names" enough, or should drills block pasting entirely and use only typed answers?

## Handoff

```yaml
artifact: research-dossier
course: founder-interviews
version: 1
sources_checked: 2026-10-24
hard_constraints:
  - Second-language phone readers, against popular advice that produces vague or inflated answers
  - Honesty built into mechanics; lie detection is near chance and probing can push invention, so the rubric and interviewer reward honest gaps
  - The AI interviewer is optional, private and fallible (own key, written fallback, sycophancy and length bias)
  - No fixed founder script; teach portable answer qualities
  - No company, founder or investor names; plain wording for first-party founder advice
out_of_scope:
  - Salary negotiation, offers, visas, contracts
  - Coding interviews
  - Investor pitching
  - Validity statistics, body-language tricks, lie detection, personality typing
  - Named consulting frameworks, pronunciation training, applicant tracking systems
  - Motivational interviewing as therapy; five whys as safety root-cause analysis
open_questions:
  - Five whys credit (name Ohno or not)
  - Researcher names per chapter
  - Confirm the founder probe list with instructors
  - Accent bias paragraph in 6.4
  - AI interviewer defaults (depth, separate judge, reflection ratio)
  - Same rubric flags for written fallback
  - Tapping study without numbers or drop
  - Optional spoken mock in capstone
  - Scan existing MOOCs before G2B
  - Approved weakness examples
  - Privacy wording versus blocking pastes
```
