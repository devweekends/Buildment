---
artifact: research-dossier
course: cause-and-effect
version: 1
status: draft
owner: research
sources_checked: 2026-10-23
hard_constraints:
  - Second-language readers on phones, with a reading load now set at 1,200 prose words per chapter
  - Neutral, fictional cases only, which rules out most of the famous textbook stories (war, colonial and monument anecdotes)
  - No statistics, yet chance, samples and fair tests must be taught honestly in plain words
  - Graded keys must follow from a taught rule, while real causal questions often have several defensible answers
  - Platform limits on diagrams and canvases (no images, small Mermaid flowcharts, two stepper canvases) for a topic that is naturally visual (loops, fishbones, stocks)
out_of_scope:
  - Statistical significance, p-values, power calculations and any formula
  - Causal graphs as notation, counterfactual maths and formal causal inference
  - System dynamics modelling, simulation software and the full set of systems archetypes
  - Full theory of constraints (drum-buffer-rope, throughput accounting)
  - Six Sigma, DMAIC, FMEA, certification content and paid branded methods taught in full
  - Multivariate tests, sequential testing and A/B testing platforms
  - Just culture decision trees as an HR or legal process
  - The famous anecdotes that are war-related, colonial or historically doubtful
open_questions:
  - May chapters name the car maker where the five whys began, or only a "large Japanese car maker"?
  - Keep the 1,200-word prose minimum for ESL phone readers, or accept the shorter course 9 exception?
  - Should the five-whys canvas show a branching tree, or a single chain plus a "wrong ending" path?
  - How should mentors grade root-cause answers when two different chains are both defensible?
  - Which provided capstone cases are safe for fellows in Gaza (no war, no infrastructure damage as the root cause)?
  - Does course 9 module 4 already teach correlation with an example this course must not repeat?
---

# Research dossier: cause-and-effect

This is a decision aid for the curriculum architect and the chapter writers. Each finding says what is safe to say in plain words, the common misconceptions, and how chapters should phrase it. Claims carry a source ID in square brackets, for example [S1]. The source table near the end gives the source, its type, the date checked and a confidence level. Every source was checked on 2026-10-23. Claims marked **UNVERIFIED** must not appear in learner-facing text as fact; the unverified table says how to phrase them instead.

Company and person names appear here so that writers and reviewers can check sources. The brief and the writer pack forbid real company names in learner-facing text, and they forbid war, politics and religion as case material. Where this dossier says "phrase it this way", the phrasing already follows those rules.

Quotations in this file are kept short. Where exact wording matters (the Goodhart, Strathern and Campbell wordings), the page reference is given so a reviewer can check the full sentence.

## Learner and context

**Who.** Gaza fellowship fellows building careers in tech and remote work, from mixed backgrounds. Arabic first, English second. (Course brief.)

**What they already know.** Plain English reading and simple arithmetic. Course 9 (Think Clearly) module 4 introduces correlation gently, but it is not required. (Course brief.) The course 9 content is not in this worktree, so this dossier could not check which examples it used. See open questions.

**Device and connection.** Mostly phones, weak or expensive data, power cuts. Light pages, no images. (Course brief.) Every diagram is a small Mermaid flowchart (at most 7 nodes, `flowchart TD`), and there are two stepper canvases. (Writer pack, decision log.)

**Time.** The brief says about 14 hours. The decision log raised it to about 18 hours because the full agent-ip prose minimum (1,200 words per teaching chapter) is applied. That is a lot of English reading for this audience. Evidence from a large school trial in Uganda shows that critical-thinking lessons about fair comparisons worked for children with different reading levels, but worked better for stronger readers [S30]. Reading load is therefore a real risk for this course, not only a style preference.

**Motivation and use.** Stop fixing the same problem again and again; explain problems to clients and teams; judge claims and data; debug systems and write incident reviews in later tech courses. (Course brief.)

**What the evidence says about teaching this audience.** Short, structured lessons on "is this claim based on a fair comparison?" can be taught to learners with few resources and large classes, and the effect was large in a randomised trial (120 schools, about 10,800 children) [S30]. The concepts used there overlap heavily with modules 2 and 3 of this course: association is not causation, fair comparisons, similar comparison groups, small studies and the play of chance, and not trusting a single study [S29]. This is the strongest evidence found that the planned modules 2 and 3 are teachable to this audience.

## Domain model

### Actors

- **The investigator:** the fellow, or a small team, trying to find out why something happened.
- **The people inside the system:** workers, freelancers, family members, customers. They make choices with the information they have.
- **The client or manager:** wants an explanation and a fix, often quickly.
- **The reviewer or mentor:** reads the investigation and checks the evidence.

### The investigation lifecycle (the spine of the course)

1. Notice an effect (a problem, a change, a surprising pattern).
2. Describe it exactly: what, where, when, how much, and what is not affected [S13].
3. List possible causes, in groups so none are forgotten [S3].
4. Check each claimed cause for a hidden third factor, reverse cause, chance and selection [S25, S24, S27].
5. Test the most promising cause fairly: change one thing, compare with a group that did not change, decide the measure in advance [S23, S20].
6. Separate the direct cause from contributing causes, and find causes in processes, not people [S1, S10, S12].
7. Choose a strong fix (a change to the design or process), not only a weak one (a reminder or training) [S12].
8. Ask "and then what?" to predict side effects, especially of targets and rewards [S6, S7, S32].
9. Review without blame and write what will change [S10, S11].

### Vocabulary for chapters (plain English definitions writers may use)

| Term | Plain English for chapters | Notes |
|---|---|---|
| Cause | Something that makes another thing happen or more likely. | Keep "more likely" in: most causes in work and life raise chances, they do not guarantee. |
| Effect | What happens because of a cause. | |
| Correlation | Two things tend to go up and down together. | ABS: correlation alone does not automatically mean one causes the other [S26]. |
| Hidden third factor (confounder) | A third thing that pushes both things you are looking at. | Catalogue of Bias definition: a factor linked to both the exposure and the outcome [S25]. "Hidden third factor" is the course's plain name. |
| Reverse cause | The cause runs the other way from what you assumed. | IEP: "Reversing Causation" [S27]. |
| Chance | A pattern that appears by luck, especially with few cases. | No formulas. [S23, S29] |
| Regression to the mean | After an unusually good or bad result, the next result is usually closer to normal, even if nothing changed. | [S28, S27] |
| Selection bias | The group you looked at is not like the whole group you care about. | Catalogue of Bias [S24]. |
| Survivorship bias | You only see the cases that survived or succeeded, so you miss what happened to the rest. | A kind of selection bias. [S5] |
| Fair test | A test where the only planned difference between two groups is the thing you are testing. | [S20, S23] |
| Comparison group (control group) | A group that did not get the change, so you can see what would have happened anyway. | [S23] |
| Random assignment | Letting chance (a coin, a random list) decide who gets the change, so the groups start out alike. | [S23, S25] |
| A/B test | A fair test where people are split by chance into version A and version B. | [S20] |
| Root cause | A cause deep enough in the process that fixing it stops the problem coming back. | Teach "root causes" (plural) as normal; accidents seldom have one [S1]. |
| Contributing cause | A cause that helped the problem happen but was not enough on its own. | SRE guidance speaks of "contributing causes" [S10]. |
| Symptom | What you notice; not why it happened. | ASQ: cure the problem, not the symptoms [S3]. |
| Five whys | Asking "why?" again and again to move from a symptom toward a process cause. | Origin and limits below [S1, S2]. |
| Fishbone diagram | A drawing that sorts possible causes into groups, like the bones of a fish. | Also called a cause-and-effect or Ishikawa diagram [S3]. |
| Is / is not | Describing a problem by what is affected and what could be affected but is not. | [S13] |
| Half-splitting | Test the middle of a chain to rule out half of it each time. | [S14, S15] |
| Feedback loop | A cause that comes back round to affect itself. | [S16] |
| Reinforcing loop | More leads to more (or less leads to less). | Meadows calls it "positive" feedback [S16]. |
| Balancing loop | A loop that pulls a system back toward a goal or limit. | Meadows calls it "negative" feedback; thermostat example [S16]. |
| Stock and flow | A stock is an amount that builds up (water in a tank, orders waiting); flows fill it or drain it. | Bathtub example [S16]. |
| Delay | Time between a cause and its effect. Delays cause overshoot. | [S16] |
| Bottleneck (constraint) | The slowest step, which sets the pace of the whole process. | [S18, S19] |
| Second-order effect | The effect of the effect: what happens next because of the first change. | [S33, S32] |
| Unintended consequence | A result nobody planned, good or bad. | Merton 1936 [S32]. |
| Goodhart's law | When a measure becomes a target, people change behaviour to hit the number, and the number stops telling the truth. | Wording and attribution below [S6, S8]. |
| Blameless review | A review after a problem that looks for causes in the system, not a person to punish. | [S10] |
| Just culture | People are not punished for honest mistakes, but deliberate or reckless harm is not excused. | [S11] |

## Hard constraints

1. **Reading load for second-language phone readers.** The decision log applies a 1,200-word prose minimum per teaching chapter. Cause and effect needs worked reasoning, which helps, but long paragraphs in a second language on a phone are the main risk to completion. The Uganda trial found a smaller effect for weaker readers [S30]. Architecture consequence: keep one idea per chapter, put worked cases in short steps, and spend words on worked examples rather than on definitions.

2. **No famous stories.** The classic teaching anecdotes for this domain are a war story (aircraft armour, [S5]), a military training story (flight instructors, [S28]), colonial stories (cobra bounty, rat bounty, [S9]) and a monument story whose details are wrong ([S1]). The brief rules out war and politics, and several of these are not accurately told anyway. Architecture consequence: every module needs a fictional everyday case that carries the full weight of the idea. The cast in the writer pack (Huda, Basel, Sami, Amal, Nour) is the right answer; writers must not reach for the famous stories as "a real example".

3. **No statistics, but honest about chance.** Fair tests, A/B tests and "too few cases" cannot be taught truthfully without saying that small samples mislead and that results can look good by luck [S23, S21]. Architecture consequence: teach chance with plain rules of thumb (decide the measure first, decide how many cases first, do not stop early because you are ahead, one test is not proof), and use worked examples with small, round, labelled numbers. Never give a threshold number as a general rule (for example "100 users is enough").

4. **Gradable keys on questions that are often arguable.** Real causal questions rarely have one right answer: Card shows two teams can produce different, equally valid five-why chains for the same incident [S1]. Architecture consequence: quiz questions must ask for the best *next check* or the *mistake in the reasoning* (which follow from a taught rule), not "what is the root cause" of an open-ended case. Root-cause conclusions belong in open questions graded by a rubric.

5. **Sensitive context.** Fellows live in Gaza. Many everyday causal chains, followed far enough, end at war damage, blockades or power cuts. Architecture consequence: choose cases whose causes stay inside the learner's own control (a shop's delivery process, a laptop charger, a study habit), let hardship appear only as ordinary background, and never make "why is the power off" or similar a root-cause exercise. Provided cases must be offered wherever a prompt asks about the learner's own life (writer pack).

## Findings by topic

### 1. Correlation, causation, hidden factors, reverse cause, chance, post hoc, single cause

**Safe to say in plain words**
- When two things go up and down together, that alone does not show that one causes the other [S26].
- A third factor can push both. The Australian Bureau of Statistics uses ice cream and sunscreen sales, which both rise in hot weather [S26]. The Internet Encyclopedia of Philosophy uses car accidents and windscreen wiper use, which both rise with rain [S27]. Both examples are neutral and safe to adapt.
- The cause can run the other way (reverse cause). IEP's example: being a senior manager leads to buying a big boat, not the reverse [S27]. Writers should adapt this to a fictional, non-wealth example.
- "It happened after, so it happened because" is a named reasoning mistake (post hoc) [S27].
- Treating a minor cause as the main cause is a form of oversimplification [S27]. Accidents and failures are seldom the result of a single root cause [S1].
- Regression to the mean: after an unusually good or bad result, the next one tends to be closer to normal even if nothing changed, and people mistake this for the effect of whatever they did in between [S27, S28]. Kahneman describes an instructor who believed shouting improved performance and praise made it worse; the pattern was regression to the mean, and Kahneman showed it with a simple coin-tossing demonstration where the best first throws mostly did worse the second time [S28].
- Random assignment is the best way to reduce the risk of a hidden third factor [S25].

**Common misconceptions**
- "Correlation never means causation." Over-correction. ABS says correlation does not *automatically* mean causation [S26]; it can be a clue worth testing.
- "If the change came first, it was the cause."
- "The fix worked because things got better." Things often get better on their own after a very bad week (regression to the mean) [S28].
- "Punishment works better than praise" drawn from before-and-after observations [S28].
- "There must be one cause." [S1, S27]

**Phrase it this way**
- Say "moving together is a clue, not proof." Do not say "correlation is never causation."
- Say "after a very bad week, the next week is often better even if you change nothing." Do not attach a percentage.
- Use the coin-toss idea, not the flight school story. Example for chapters: "Ask ten friends to throw a coin at a cup. Praise the best three. Most of them do worse on the next throw. The praise did not cause that." This keeps Kahneman's insight without the military setting [S28].
- If a chapter names Kahneman, say only: "A psychologist noticed that people who rewarded good results and punished bad ones were fooled by this pattern." Do not name the air force.

### 2. Selection and survivorship bias, and the aircraft armour story

**Safe to say in plain words**
- Selection bias happens when the people or cases you looked at differ in a systematic way from the whole group you care about [S24].
- Survivorship bias: you only see the survivors, so you can draw the wrong lesson from them [S5].

**The aircraft armour story: what is accurate**
- The popular version (a statistician tells the military to armour the engines because planes hit there did not come back, and the advice is adopted) is, in the words of a mathematician who checked the record, mostly "plausible reconstruction" [S5].
- What is documented: Abraham Wald wrote technical memoranda (around 1943, published by the Center for Naval Analyses about 1980) on estimating aircraft vulnerability from damage seen on returning planes, including a way to estimate what happened to planes that did not return [S5].
- The memoranda say nothing about what the military should do [S5].
- W. Allen Wallis, who ran the research group, later described the core logic in a short rejoinder: hits on the more vulnerable parts were less likely to be seen on returning planes, so Wald estimated vulnerability from that [S5].
- Whether the advice was used, and the dramatic "not so fast" scene, is not documented [S5]. The popular pictures of planes covered in dots are later illustrations, not Wald's [S5].

**Decision for this course: avoid the story.** It is a war story, which the brief excludes, and its popular telling overstates the record. There is no need for it: the idea is easy to show with everyday cases.

**Phrase it this way (fictional cases)**
- "A group of freelancers who earn well all say they quit their jobs early. You never hear from the ones who quit and failed, because they are not giving talks."
- "A teacher asks the students who stayed to the end of the course what they liked. The students who left are not in the room."
- "An app shows reviews only from people who are still using it."
- If an instructor insists on the Wald story, the only safe wording is: "A well-known story says a statistician studied damage on returning aircraft. Historians say the details are mostly retold, not recorded." Do not say his advice saved planes.

**Common misconceptions**
- "Successful people's habits caused their success." (Survivors only.)
- "Customer complaints show what all customers think." (Only some people complain; selection.)

### 3. Fair tests, comparison groups, randomisation, A/B tests and pitfalls

**Safe to say in plain words**
- A comparison group lets you compare the change against what would have happened if you had changed nothing [S23]. The UK government guide's example: a back-to-work scheme, where some people would have found a job anyway [S23].
- Letting chance decide who gets the change makes the groups alike in the things that matter, including things you did not think of [S23, S25].
- People who want a test to succeed can, even without meaning to, choose who goes in which group; so the choice must not be left to them [S23].
- In a well-run controlled experiment, the only thing that is consistently different between the groups is the change, so a difference in the result can be put down to the change [S20].
- **Decide the measure before you start**, and stick to it. If you look at many numbers afterwards, some will improve by chance and it is tempting to pick those [S23].
- **Decide how many cases you need before you start.** Small effects need more cases, and many changes have small effects [S23]. Running too few cases is a common mistake [S20].
- **Do not stop early because the result looks good.** Checking again and again and stopping when it looks like a win makes false wins much more likely; the fix is to fix the number of cases in advance [S21]. Peer-reviewed work agrees that watching results continuously makes the usual measures unreliable [S22].
- Run for whole weeks, because weekdays and weekends can differ [S20].
- People react to something new just because it is new, and react against change at first; short tests can mislead in both directions [S20].
- An A/B test tells you which version did better, and by how much, but not why [S20].
- Repeat a test before trusting it widely, especially with a different group [S23]. Believing one study is listed as a common mistake in the Informed Health Choices concepts [S29].
- Choose a measure that does not reward short-term tricks; a measure of clicks alone can be gamed by a version that annoys people [S20]. (Link this to module 7.)

**Common misconceptions**
- "I changed three things and sales went up, so my changes worked." (Module 3.01 case.)
- "A/B tests are only for big websites." A small business can run a fair comparison, but with few customers the result is weak; say so.
- "The test showed B is better, so B is better forever and for everyone."
- "I will look every day and stop when I see a winner."

**Phrase it this way**
- "Decide two things before you start: what you will measure, and how many customers (or days) you will wait for. Do not change them when you see the first results."
- "If the test is small, treat a win as a hint. Run it again."
- "Changing one thing at a time" is safe advice for a beginner's fair test. Add one honest sentence: "Sometimes two changes only work together, but that needs bigger tests than we cover here."
- Do not give rules like "you need 1,000 users". The UK guide's own example (400 people per group gave about an 8 in 10 chance of seeing a 10 percent difference) is fine to mention only as "in one government example" [S23], and it is better left out.

### 4. Root cause analysis: symptoms, five whys, fishbone, contributing factors

**Five whys: origin**
- The five whys traces its roots to the Toyota Production System. Taiichi Ohno described asking why five times whenever a problem is found as the basis of the system's scientific approach, with the "how" (the fix) following from the whys [S1, quoting Ohno's 1988 book, p. 123].
- A Toyota executive (Teruyuki Minoura) recalled that Ohno made staff ask why five times to find the root cause, and stressed that each "why" must be answered by on-the-spot observation, not by deduction at a desk [S2].
- It is promoted widely in healthcare quality work, but its popularity is not the result of evidence that it works [S1].

**Five whys: published criticisms** (all from [S1] unless noted)
- It forces one path. Different teams can produce wholly different, equally valid chains for the same problem.
- It aims at one root cause per path, but accidents are seldom the result of a single root cause.
- It assumes the deepest (fifth) why is the best place to fix, which is not always true; a fix close to the problem can sometimes block every deeper cause at once.
- The number five is arbitrary; more or fewer whys may be needed.
- People answer the whys by guessing (deduction) instead of looking (observation), which floods them with causes they cannot rank [S2].
- Card's conclusion is strong: he argues it should not be used for root-cause analysis in healthcare at all, while granting it is a good teaching tool for the idea that distant causes matter [S1].
- The widely quoted line that Minoura called it "too basic a tool" is attributed on Wikipedia to a Toyota report [S34], but those words do not appear in the copy of the report checked here [S2]. Do not use that quote.

**The Washington Monument example: avoid.** Card traced it: the real building was the Lincoln Memorial, the damage was from cleaning water, pigeons were not the issue, and the "fix" (lights on an hour later) was reversed because tourists complained [S1]. The popular version is wrong in its details. It is still a good teaching point that a "root cause fix" can fail for a reason outside the chain (people's reactions), but the course does not need a real monument to make it.

**Fishbone diagram**
- Also called a cause-and-effect diagram or Ishikawa diagram, after Kaoru Ishikawa [S3]. It sorts possible causes into groups and is especially useful for structuring brainstorming [S3].
- Ishikawa used the "6 Ms" as generic group labels, and encouraged teams to rename groups so they make sense to the people using them [S3]. ASQ lists them as Materials, Machinery, Methods, Measurement, Manpower and Mother Nature (environment), with Money as an optional seventh [S3].
- Other sets exist for services and marketing (for example groups starting with P or S), but the only source read for those is Wikipedia [S4]; treat them as orientation only.
- ASQ's steps: agree the problem, draw the spine and head, add groups, ask "why does this happen?" to fill each group, keep asking why for sub-causes, look where there are few ideas, then choose which causes to check further. The purpose is to cure the problem, not the symptoms [S3].
- A fishbone lists *possible* causes. It is not evidence that any of them happened [S3]. In ASQ's words, it may be the only tool in small projects, but for complex problems it is one of several [S3].

**Strong and weak fixes (contributing factors and actions)**
- Healthcare root-cause guidance (RCA2, from the Institute for Healthcare Improvement, based on US Veterans Affairs tools) ranks fixes [S12]:
  - Stronger: change the physical setup or design so the mistake is hard or impossible (forcing functions), simplify the process, standardise equipment.
  - Intermediate: checklists, extra staff at busy times, software alerts, redundancy.
  - Weaker: double checks, warnings, new policies or memos, training.
- Weaker actions such as training and policy changes are often needed, but used alone are unlikely to be enough [S12]. Teams should aim for at least one strong or intermediate action for each cause [S12].
- The same guidance says causal statements should focus on the system and must not assign blame to individuals [S12].

**Common misconceptions**
- "Five whys gives you *the* root cause."
- "The fifth why is always the one to fix."
- "Each why can be answered from memory."
- "The fishbone shows the cause." (It shows candidates.)
- "Retrain the staff" as the default fix.

**Phrase it this way**
- Origin: "The five whys comes from a large Japanese car maker's factory system. One of its engineers, Taiichi Ohno, told teams to ask 'why?' five times when they found a problem." Name the company only if the instructors approve (open question).
- "Five is a habit, not a rule. Stop when you reach a cause in a process that you can change."
- "Answer each why by checking, not by guessing."
- "Most problems have more than one chain. If you find a second branch, follow it too."
- "A fishbone helps you list possible causes so you do not forget any. Then you still have to check them."
- Teach strong versus weak fixes in plain words: "A reminder asks people to remember. A better design means they do not have to."

### 5. Blame versus system causes: blameless reviews and just culture

**Safe to say in plain words**
- A blameless review looks for the contributing causes of a problem without accusing any person or team [S10].
- It assumes everyone acted with good intentions and did the right thing with the information they had [S10].
- If finger-pointing is normal, people stop reporting problems because they fear punishment [S10].
- People cannot be "fixed", but systems and processes can be changed to help people make the right choice [S10].
- Blameless culture came from healthcare and aviation, where mistakes can be fatal [S10].
- A review records what happened, its impact, what was done to fix it, the causes, and follow-up actions to stop it happening again [S10].
- Just culture adds a limit: people are not blamed for honest errors, but wilful violations and gross negligence are not excused, and a pure "no-blame" culture is described as neither feasible nor desirable [S11].

**Common misconceptions**
- "Blameless means nobody is responsible." (Accountability moves to fixing the system; deliberate harm is still not acceptable [S11].)
- "Human error is the root cause." A person's mistake is where the investigation starts, not where it ends [S10, S12].
- "A review is for finding who did it."

**Phrase it this way**
- "In a review without blame, we ask what in the steps, tools or information made the mistake easy to make."
- "Without blame does not mean without responsibility. Honest mistakes are treated as information. Doing harm on purpose is different."
- Source credit, if any: "teams who run large websites publish this guidance" or "safety experts in hospitals and aviation". Do not name the company that published the book.
- Never let a gate or quiz key end at a person ("Ali forgot"). End at a process ("there was no step that checked...").

### 6. Systematic troubleshooting: describe exactly, test hypotheses, half-split

**Safe to say in plain words**
- Describe the problem with what, where, when and how much, and then with what is *not* affected but could have been [S13]. The method owner's own worked example: four devices lost power, all on the left side of one kitchen; the fridge and oven on the same circuit did not, and other rooms did not; the distinction ("location mattered") pointed to the cause [S13].
- Test each possible cause by asking whether it explains both what is and what is not happening [S13].
- Half-splitting: in a chain of steps, test the middle. If the signal is fine there, the fault is in the second half; test the middle of that half, and so on. It reduces the number of checks needed [S14]. The same idea is built into a common software tool that finds which change introduced a bug by binary search; with about 675 changes to check it needs roughly 10 steps [S15].
- Other technician techniques: swap identical parts and see if the problem moves with the part; remove parallel parts one at a time; record a signal over a long period to catch an intermittent fault [S14].
- Answer each question by looking, not only by reasoning [S2].

**Limits to state honestly**
- Half-splitting works on a chain where each step feeds the next. It is less useful when causes act together or when testing the middle is expensive or impossible (course's own reasoning; the source shows it on a series path [S14]).
- "Test the cheapest likely cause first" is a sensible rule of thumb, not a published law. **UNVERIFIED as a sourced rule.** Phrase it as the course's advice: "Think about two things: how likely the cause is, and how cheap it is to check. A cheap check of a likely cause is a good first move."

**Common misconceptions**
- "Describe the problem" means "describe the symptom you feel" ("the laptop is broken").
- "Change several things at once to save time." (Then you cannot tell which fixed it.)
- "If the problem went away, I fixed it." (It may be intermittent; check it stays fixed.)

**Phrase it this way**
- Use "is / is not" as a generic method name. Do not name the consulting company that sells the full method.
- "Split the problem in half" with Nour's charger chain: socket, cable, charger brick, laptop port, battery.

### 7. Systems thinking: loops, delays, overshoot, stocks and flows, bottlenecks

**Safe to say in plain words**
- A stock is an amount that builds up, like water in a bathtub. If more flows in than out, it rises; if more flows out than in, it falls. It changes slowly, because flows take time to build up [S16].
- A balancing loop pulls a system toward a goal; a thermostat is the classic example. It needs a goal, a way to notice the gap, and a way to respond [S16].
- A reinforcing loop is self-reinforcing: the more it works, the more it can work; for example the more people catch flu, the more they infect others [S16].
- Delays in feedback cause overshoot and swings: if you only learn the result late, or respond late, you overshoot and undershoot [S16].
- Changing numbers inside a system (prices, targets, sizes) is usually the weakest way to change its behaviour, though it gets most attention [S16]. Use this lightly; it is an expert's judgement, not a measured result.
- Many people, including well-educated adults with no training in this area, misunderstand stocks and flows and delays. A common error is to draw the stock with the same shape as the flow, when the stock actually adds up the flow over time [S17].
- A bottleneck (constraint) limits how much the whole system can do [S19]. The theory of constraints, introduced by Eliyahu Goldratt in his 1984 book *The Goal*, uses five steps: find the constraint; get the most out of it; make everything else serve it; add capacity to it only after that; then start again, because once you fix it another step may become the slowest [S18, S19].
- Making non-bottleneck steps faster does not raise output; it piles up work waiting in front of the bottleneck [S18].

**Common misconceptions**
- "Positive loop means good, negative loop means bad." (In this field positive means reinforcing and negative means balancing [S16].) The claim that this naming confuses beginners is the course's judgement; **UNVERIFIED** as research.
- "If orders are rising, the pile of waiting orders must be rising at the same speed." (Stock and flow confusion [S17].)
- "Speeding up every step speeds up the whole process."
- "Once we fix the bottleneck, we are done." [S18]

**Phrase it this way**
- Use "more leads to more" and "pulls back toward a limit" as the main names, and give "reinforcing" and "balancing" as the terms. Avoid "positive" and "negative" loops in learner text, or define them once with a warning.
- Teach stocks and flows with a water tank or a pile of waiting orders. Huda's bakery: orders in, cakes out, the pile of waiting orders is the stock.
- Use a shower or a water heater for delay and overshoot only as the course's own example (no source read here uses the shower).
- Do not repeat the theory of constraints site's claim that the first three steps reveal a fixed percentage of hidden capacity [S18]; it is a vendor claim with no evidence shown.

### 8. Second-order effects, incentives and targets, unintended consequences, the cobra effect

**Second-order effects and unintended consequences**
- An act, habit, rule or law produces not one effect but a series of effects (Bastiat, a 19th-century French writer on economics) [S33].
- Robert Merton's 1936 paper "The Unanticipated Consequences of Purposive Social Action" named sources of unintended results: ignorance, error, wanting the immediate result so much that side effects are ignored, deeply held values, and predictions that change behaviour so that they fail [S32].
- Unintended consequences can be good as well as bad [S32].

**Goodhart's law: exact wording and attribution**
- Charles Goodhart's original 1975 point was about monetary policy: an observed statistical regularity "will tend to collapse once pressure is placed upon it for control purposes" (wording as reported in [S8], citing Goodhart's paper reprinted in 1981, p. 116). The primary text was not read here; confidence medium.
- The short form everyone quotes, "When a measure becomes a target, it ceases to be a good measure", is Marilyn Strathern's wording, in a 1997 paper on audit in British universities [S6, European Review 5(3), p. 308]. Checked in the paper itself. Her example: the more a particular exam grade becomes an expectation, the worse it becomes at telling students apart [S6]. She credits the idea, as "Goodhart's law", to Keith Hoskin and to Goodhart's observation on monetary control [S6].
- Goodhart himself did not write the short sentence. Chapters must not put it in quotation marks as Goodhart's words.

**Campbell's law: exact wording and attribution**
- Donald T. Campbell, "Assessing the Impact of Planned Social Change" (first circulated 1976, published 1979, reprinted 2011 in the Journal of MultiDisciplinary Evaluation) [S7]. In plain words: the more a number about society is used to make decisions, the more pressure there is to corrupt it, and the more it tends to "distort and corrupt the social processes it is intended to monitor" [S7, 2011 reprint, page 32 of the PDF; check the full sentence there]. Campbell called these his "pessimistic laws" and said the evidence he gave was mostly anecdotal [S7].
- Campbell's examples involve elections and policing; do not use them (politics).

**The cobra effect: not historically verified**
- The term was coined by the German economist Horst Siebert in a 2001 book, based on a story about a British-ruled Delhi bounty for dead cobras [S9].
- No documentary record of the cobra-breeding episode has been found; a 2025 investigation summarised on Wikipedia reports no contemporary records of cobra breeding for bounties [S9]. That investigation was not read directly. **UNVERIFIED** as history, in both directions: treat the Delhi story as a parable.
- A similar story about a rat-tail bounty in Hanoi in 1902 is attributed to the historian Michael Vann. The primary article was not read here. **UNVERIFIED** for this dossier. It is also a colonial story; avoid.

**Common misconceptions**
- "Goodhart said 'when a measure becomes a target...'" (Strathern's wording.)
- "Targets are bad." Over-correction. The lesson is to expect people to optimise the number, watch for side effects, and use more than one measure; Kohavi's experiment guidance makes the same point about choosing measures that do not reward short-term tricks [S20].
- "The cobra effect happened in Delhi." (Unverified.)

**Phrase it this way**
- "There is an old observation, often called Goodhart's law. A common way to say it is: when a measure becomes a target, it stops being a good measure." If a name is needed: "an anthropologist, Marilyn Strathern, put it in these words."
- Campbell: no quotation needed in chapters. "A researcher, Donald Campbell, warned that numbers used to make big decisions get bent, and can bend the work they were meant to measure."
- Cobra: "There is a famous story, probably made up, about a reward for dead snakes. People started breeding snakes for the reward." Better: use a fictional case. Examples that fit the cast: a shop pays a bonus per delivery, so riders rush and more orders arrive damaged; a teacher rewards the number of pages read, so students choose thin books; a freelancer platform target of "replies within one hour" leads to fast, empty replies.
- "And then what?" is the course's own question. Do not attribute it to a writer or politician.

## Existing courses and gaps

| Resource | What it covers | What it leaves out or gets wrong | Use for this course |
|---|---|---|---|
| Informed Health Choices key concepts and school resources [S29, S30] | Fair comparisons, association is not causation, similar comparison groups, small studies and chance, not trusting one study. Plain language, tested in a randomised trial in Uganda with large classes and few resources. | Health claims only. No root causes, troubleshooting, systems or consequences. | Strongest evidence that modules 2 and 3 can be taught to this audience. Model the plain style; do not copy content. |
| Calling Bullshit, University of Washington (Bergstrom and West) [S31] | Causality week: correlation is not causation, confusing necessity with sufficiency, regression to the mean presented as a treatment effect, selection masked as transformation; later weeks on data traps and publication bias. | University level, US-centred, heavy reading. No root causes, troubleshooting or systems. | Confirms the module 2 topic list, including regression to the mean, which the outline does not name. |
| Site reliability engineering book, postmortem chapter [S10] | Blameless reviews: when to write one, what goes in, why blame hides problems. | Written for large software teams. No method for finding causes. | Source for module 8.02 principles; keep company-free. |
| IHI / RCA2 root-cause guidance [S12] | Causal statements without blame; ranking fixes from strong to weak. | Healthcare setting, long, formal. | Source for strong versus weak fixes in 4.05 and 8.02. |
| Card, "The problem with 5 whys" [S1] | The best published critique of the five whys and the monument example. | A critique, not a course. | Source for "where the method goes wrong" in 4.03. |
| Popular five-whys tutorials (orientation, not cited) | Usually one chain, five steps, ending at a single root cause; often repeat the monument story. | Card shows the story is wrong in its details and the method narrows thinking [S1]. | Writers must not copy this pattern. |
| Popular survivorship-bias articles (orientation, not cited) | Usually tell the aircraft armour story as fact. | Overstated, per [S5]. War setting. | Avoid. |
| Kepner-Tregoe problem analysis [S13] | Is / is not specification, testing causes against it. | Paid branded training; the full method is long. | Teach the generic "is / is not" idea only, no brand. |
| Theory of constraints institute [S18] | Five focusing steps. | Vendor site, includes marketing claims (fixed percentage of hidden capacity). | Teach the five steps in plain words, no vendor claims. |
| Online experiment guides (Kohavi et al. [S20]; Miller [S21]) | A/B tests, measures, sample size, stopping early, weekly cycles. | Written for websites with large traffic and statistics knowledge. | Turn into plain rules of thumb in 3.04. |
| Course 9, module 4 (internal) | Gentle introduction to correlation. | Not readable from this worktree. | Check for repeated examples (open question). |

**Gap this course fills.** No single resource found takes a beginner from "is it really a cause?" through fair tests, root causes, troubleshooting, systems and consequences, in plain language, with everyday non-health cases. Most resources teach one slice to one profession.

## Technical landscape

No software tools are needed. Learners need only a phone and the buildment reader.

- **Diagrams:** Mermaid `flowchart TD`, at most 7 nodes (writer pack). Fishbones must be drawn as grouped causes feeding the problem, not as a real fish shape. Loops will draw as cycles; check on a 375px screen that a 3 to 4 node cycle stays readable.
- **Canvases:** `five-whys-chain` (state machine, at most 3 by 2 grid) and `laptop-charging-detective` (sequence) (decision log). A single linear five-whys chain risks teaching the "one path" habit that Card criticises [S1]; see the outline changes.
- **Optional real-world tools, mention only:** spreadsheets for a simple before-and-after table; a version-control "bisect" command for tech fellows as an example of half-splitting [S15]. No paid tools, no A/B testing platforms.
- **Licences:** none needed. Do not reproduce ASQ, IHI or Kepner-Tregoe templates; describe the ideas in the course's own words.

## Failure modes

### When the methods are used in the real world

1. **Five whys ends at a person.** The chain stops at "the worker forgot" and the fix is "remind them". RCA2 tells teams not to assign blame in causal statements and rates retraining and reminders as weak fixes [S12]; SRE guidance says people cannot be fixed but systems can [S10].
2. **Five whys by guessing.** People answer from their desk instead of observing, and produce many unranked causes [S2].
3. **One chain, one root cause.** Different teams reach different, equally valid chains; a single chain can capture a tiny share of the causes [S1].
4. **Fixing the deepest cause instead of the most effective one.** A fix near the event can sometimes block all deeper causes [S1].
5. **A "root cause fix" defeated by people's reactions.** The monument lights fix worked on insects, then was reversed after tourist complaints [S1]. (Teach the pattern with a fictional case.)
6. **Stopping an A/B test early because it looks like a win**, which makes false wins much more likely [S21, S22].
7. **Choosing the measure after the test**, picking whichever number improved [S23].
8. **Measures that reward short-term tricks** [S20], and targets that bend behaviour [S6, S7].
9. **Blame culture hides problems**, because people fear punishment [S10].
10. **Speeding up the wrong step** in a process: work piles up before the bottleneck [S18].

### When teaching this to beginners (the course's main risks)

1. **The five whys taught as a ritual.** A linear chain of exactly five, ending at a person or at something nobody can change. Guard: teach "stop at a process cause you can change", require one check (observation) per why, show a second branch.
2. **Fishbone as proof.** Learners treat every bone as a found cause. Guard: every fishbone task ends with "which two will you check first, and how?" [S3].
3. **Over-confidence from one small test.** Guard: in every fair-test chapter, end with "how sure can you be, and what would make you surer?" Use the "one test is a hint" phrasing [S29, S23].
4. **"Correlation is never causation" over-correction.** Learners dismiss all patterns. Guard: teach "clue, not proof, so test it" [S26].
5. **Regression to the mean missed.** Many before-and-after stories (a new rule after a very bad month) are explained by it. The outline does not name it. Guard: add it to 2.03 [S27, S28, S31].
6. **Stock and flow confusion.** Learners assume the pile moves like the flow [S17]. Guard: one tank example before loops and delays.
7. **"Positive loop" read as "good loop".** Guard: use plain names (course judgement, unverified as research).
8. **Blameless read as "no responsibility".** Guard: teach the just culture limit [S11].
9. **Goodhart read as "never measure anything".** Guard: teach "use more than one measure, and watch for gaming".
10. **Quiz keys that are matters of opinion.** Guard: ask for the best next check or the mistake in a stated argument (hard constraint 4).
11. **Famous stories presented as fact** (armour, cobra, monument, flight school). Guard: the unverified table and the hard rules in the writer pack.
12. **Cases that lead to the war or the blockade.** Guard: hard constraint 5.

## What not to teach (in about 14 to 18 hours, for this audience)

| Topic | Why not |
|---|---|
| Statistical significance, p-values, confidence intervals, power calculations | Brief non-goal. Plain rules of thumb are enough to avoid the main traps [S21, S23]. |
| Causal diagrams as formal notation, counterfactual maths | Brief non-goal; the cause chain in Mermaid is enough. |
| System dynamics modelling and simulation, stock-flow equations | Brief non-goal; one tank example and loop diagrams teach the core idea. |
| The full set of systems archetypes | Too many named patterns for second-language readers; one or two ("fixes that backfire" as plain words) at most. |
| Full theory of constraints (drum-buffer-rope, throughput accounting) | Only "find the slowest step and serve it" is needed. |
| Six Sigma, DMAIC, FMEA, Lean certification content | Brief non-goal; tool-specific. |
| Kepner-Tregoe full method, decision analysis | Paid branded method; course 3 covers choosing. |
| Multivariate tests, sequential testing, A/B platforms | Needs statistics; beyond small-business scale. |
| Interaction effects between causes in experiments | Mention once ("some changes only work together"), do not teach. |
| Just culture decision trees and HR process | Legal and HR content; the principle is enough. |
| Swiss cheese model and safety science history | Useful but adds names and terms; the blameless principle carries the outcome. |
| The aircraft armour, cobra, rat bounty, flight school and monument stories | War, colonial or inaccurate. Fictional cases teach the same ideas. |
| Real company incidents and postmortems | Brief forbids real companies; incidents date quickly. |

## Recommended changes to the course outline

1. **2.03 "Reverse cause and chance": name regression to the mean.** Add to the goal: "and whether an unusually good or bad result is just drifting back to normal." It is in the standard list of causal traps [S27, S31] and explains many before-and-after claims learners will meet.
2. **2.04 "Survivors and selection": no aircraft story.** Use fictional cases (successful freelancers, students who stayed, reviews from current users). Record this in the decision log.
3. **3.04 "Small experiments": add the stopping rule and "one test is a hint".** The goal mentions deciding the measure in advance; add deciding how many cases in advance and not stopping early [S21, S23], and repeating a small test [S29].
4. **4.03 "The five whys": teach branches and checks, and the canvas should show it.** Keep the goal, but the `five-whys-chain` canvas should include at least one wrong path (ending at a person, or at a guess) or a second branch, so the canvas does not teach the single-chain habit Card criticises [S1]. A 3 by 2 grid can hold a short chain plus one wrong ending.
5. **4.05 "Causes, not culprits": add strong versus weak fixes.** One section on "a reminder asks people to remember; a better design means they do not have to" [S12]. This directly supports outcome 8 ("write what will change").
6. **5.03 "Guess, test, repeat": label "cheapest likely first" as a rule of thumb** and add "answer by looking, not only by thinking" [S2].
7. **6.03 "Loops that pull back, and delays": add stocks and flows in plain words.** A tank or a pile of waiting orders before delays and overshoot. The brief's research questions list stocks and flows, and the outline has no place for them; the evidence that people misread stocks [S17] makes one worked example worth the words. No new chapter is needed.
8. **6.04 "Bottlenecks": add "the bottleneck can move".** After you fix the slowest step, check again [S18, S19].
9. **7.03 "Incentives and targets": fix attribution.** Use the Strathern wording without putting it in Goodhart's mouth; no cobra history; use fictional cases.
10. **8.02 "Reviews without blame": add the just culture limit** [S11], and the template "what happened, impact, what we did, causes, what will change" [S10].
11. **Time budget.** The roadmap should state 18 hours (decision log), not 14, wherever the learner sees an estimate, and the course.yaml `estimatedHours: 14` should be reconciled with the roadmap.

## Source table

Type key: P = primary research, standard or the method owner's own document; F = first-party writing by the people who built or practise the method; S = reputable secondary (university, encyclopedia, professional body); W = Wikipedia or practitioner blog (orientation; never the sole source for a learner-facing fact unless marked).

| ID | Claim | Source | Type | Date checked | Confidence |
|---|---|---|---|---|---|
| S1 | Five whys traces to the Toyota Production System; Ohno called asking why five times the basis of its scientific approach (Ohno 1988, p. 123, as quoted). | Card, A. J. "The problem with '5 whys'." BMJ Quality & Safety 26(8): 671 to 677, 2017. https://qualitysafety.bmj.com/content/26/8/671 | P (peer-reviewed commentary quoting the primary book) | 2026-10-23 | High |
| S1 | The five whys is widely promoted in healthcare, but its popularity is not based on evidence that it works. | Card 2017, as above | P | 2026-10-23 | High |
| S1 | It forces a single causal path; different teams can produce different, equally valid chains for the same incident. | Card 2017 | P | 2026-10-23 | High |
| S1 | Accidents are seldom the result of a single root cause. | Card 2017 (citing Peerally et al.) | P | 2026-10-23 | High |
| S1 | The most distal (fifth) why is not necessarily the best place to intervene; a proximate fix can make deeper causes irrelevant. | Card 2017 | P | 2026-10-23 | High |
| S1 | The number five is arbitrary; more or fewer whys may be needed. | Card 2017 (citing Serrat) | P | 2026-10-23 | High |
| S1 | The Washington Monument five-whys story is wrong in its details (Lincoln Memorial, water damage, midges); the lights fix was reversed after tourist complaints. | Card 2017 (citing Gross and a contemporary account) | P | 2026-10-23 | High |
| S1 | Card sees value in five whys as a teaching tool but argues it should not be used for RCA. | Card 2017 | P | 2026-10-23 | High |
| S2 | Ohno ordered staff to ask why five times to find the root cause; Minoura stresses on-the-spot observation, not deduction; deduction floods teams with causes they cannot rank. | Minoura, T. "The 'Thinking' Production System: TPS as a winning strategy for developing people in the global manufacturing environment." Toyota special report on a talk of 18 June 2003. Copy at https://leancpi.com/wp-content/uploads/2020/05/The-thinking-production-system-Minoura.pdf | F (company report; read via third-party copy) | 2026-10-23 | Medium-high |
| S2 | The phrase "too basic a tool" does not appear in this copy of the report. | Same document, full text searched | F | 2026-10-23 | Medium (copy may differ from original) |
| S3 | Fishbone is also called a cause-and-effect or Ishikawa diagram, after its creator Kaoru Ishikawa; useful for structuring brainstorming. | ASQ, "What is a Fishbone Diagram?" https://asq.org/quality-resources/fishbone | S (professional body) | 2026-10-23 | High |
| S3 | Ishikawa introduced the 6 Ms (Materials, Machinery, Methods, Measurement, Manpower, Mother Nature) and encouraged renaming groups; Money is an optional seventh. | ASQ, as above | S | 2026-10-23 | High |
| S3 | ASQ steps for a fishbone, including "cure the problem, not the symptoms", and that for complex problems it is one of several tools. | ASQ, as above | S | 2026-10-23 | High |
| S4 | Other category sets (8 Ps, 4 or 5 Ss); popularised in the 1960s; concept used from the 1920s. | Wikipedia, "Ishikawa diagram." https://en.wikipedia.org/wiki/Ishikawa_diagram | W | 2026-10-23 | Low (orientation only) |
| S5 | The popular Wald armour story is mostly "plausible reconstruction"; documented sources are Wald's memoranda and brief mentions by Wallis. | Casselman, B. "The Legend of Abraham Wald." AMS Feature Column, June 2016. https://www.ams.org/samplings/feature-column/fc-2016-06 | S (professional society, mathematician's review of the record) | 2026-10-23 | High |
| S5 | Wald's memoranda (about 1943, published by CNA about 1980) estimate vulnerability from damage on returning planes and say nothing about what the military should do. | Casselman 2016 | S | 2026-10-23 | High |
| S5 | Wallis later wrote that hits on vulnerable parts were less likely to be seen on returning planes, and Wald devised methods from that. | Casselman 2016 (quoting Wallis's JASA rejoinder) | S | 2026-10-23 | High |
| S5 | Survivorship bias: the cases that did not survive do not tell their side, which misleads. | Casselman 2016 | S | 2026-10-23 | High |
| S6 | "When a measure becomes a target, it ceases to be a good measure" is Strathern's wording, p. 308; example of exam grades; she credits Hoskin and Goodhart. | Strathern, M. "'Improving ratings': audit in the British University system." European Review 5(3): 305 to 321, 1997. Copy at https://www.gwern.net/doc/statistics/decision/1997-strathern.pdf | P | 2026-10-23 | High |
| S7 | Campbell's "pessimistic laws": a quantitative social indicator used for decisions becomes subject to corruption pressures and tends to distort the processes it monitors; his evidence was mostly anecdotal. | Campbell, D. T. "Assessing the Impact of Planned Social Change." Reprinted in Journal of MultiDisciplinary Evaluation 7(15), 2011 (orig. 1976 paper; 1979 journal version). https://jmde.journals.publicknowledgeproject.org/index.php/jmde_1/article/view/297 | P | 2026-10-23 | High |
| S8 | Goodhart's 1975 wording on statistical regularities collapsing under control pressure; published 1981 in Courakis (ed.), p. 116; Hoskin's 1996 version. | Wikipedia, "Goodhart's law." https://en.wikipedia.org/wiki/Goodhart%27s_law | W | 2026-10-23 | Medium (primary not read; Strathern [S6] confirms the monetary-control origin) |
| S9 | "Cobra effect" coined by Horst Siebert (2001); the Delhi story is reported as an anecdote; a 2025 investigation found no contemporary records of cobra breeding. | Wikipedia, "Perverse incentive." https://en.wikipedia.org/wiki/Perverse_incentive | W | 2026-10-23 | Medium for coinage; history UNVERIFIED |
| S10 | A blameless postmortem identifies contributing causes without indicting any person or team, and assumes good intentions. | Lunney, J. and Lueder, S. "Postmortem Culture: Learning from Failure." In Site Reliability Engineering (O'Reilly, 2016), ch. 15. https://sre.google/sre-book/postmortem-culture/ | F | 2026-10-23 | High |
| S10 | Finger-pointing leads people not to bring issues to light for fear of punishment. | Same chapter | F | 2026-10-23 | High |
| S10 | You cannot fix people, but you can fix systems and processes to support people making the right choices. | Same chapter | F | 2026-10-23 | High |
| S10 | Blameless culture originated in healthcare and avionics. | Same chapter | F | 2026-10-23 | Medium-high (claim by the authors, not traced further) |
| S10 | A postmortem records the incident, impact, actions taken, causes and follow-up actions; triggers include data loss and user-visible problems. | Same chapter | F | 2026-10-23 | High |
| S11 | Just culture (Reason): trust that encourages safety reporting, with a clear line between acceptable and unacceptable behaviour; honest errors not blamed; wilful violations and gross negligence not excused; pure no-blame is neither feasible nor desirable. | SKYbrary Aviation Safety, "Just Culture." https://skybrary.aero/articles/just-culture | S (aviation safety reference, quoting Reason) | 2026-10-23 | High |
| S12 | RCA2 action hierarchy: stronger (forcing functions, simplify, standardise), intermediate (checklists, staffing, software alerts, redundancy), weaker (double checks, warnings, policy, training). | IHI Patient Safety Essentials Toolkit, "Action Hierarchy (part of RCA2)", 2019, based on VA NCPS tools. Copy at https://www.health.state.mn.us/facilities/patientsafety/adverseevents/toolkit/docs/safetytoolkit_actionhierarchy.pdf | S (professional body) | 2026-10-23 | High |
| S12 | Weaker actions alone are unlikely to be sufficient; aim for at least one strong or intermediate action per cause; do not assign blame to individuals in causal statements. | Same document | S | 2026-10-23 | High |
| S13 | Is / is not: describe what, where, when and extent, and what could be affected but is not; test causes by whether they explain both. Kitchen power example. | Barna, M. "Beyond 5 Whys: a 5-minute problem solving lesson." Kepner-Tregoe blog, October 2025. https://kepner-tregoe.com/blogs/beyond-5-whys-problem-solving-skills-for-real-life/ | F (method owner; vendor) | 2026-10-23 | High for the method description |
| S14 | Half-splitting: test the middle of a faulty path, halve again, until the faulty stage is isolated; it reduces the average number of measurements. Other techniques: swap identical parts, remove parallel parts, trap a signal. | Chapman, B. and Ghoreyshi, S. Biomedical Instrument Troubleshooting, ch. 3.4. Centennial College (eCampusOntario Pressbooks). https://ecampusontario.pressbooks.pub/btec315biomedicalinstrumenttroubleshooting/chapter/chapter-3-troubleshooting/ | S (open textbook) | 2026-10-23 | High |
| S15 | A version-control bisect tool uses binary search to find the change that introduced a bug; example: 675 revisions in roughly 10 steps. | Git documentation, "git-bisect." https://git-scm.com/docs/git-bisect | P (official docs) | 2026-10-23 | High |
| S16 | Stocks and flows (bathtub); balancing loop (thermostat: goal, monitor, response); reinforcing loop (flu); delays cause overshoot and oscillation; parameters are the weakest leverage point. | Meadows, D. "Leverage Points: Places to Intervene in a System." Donella Meadows Project. https://donellameadows.org/archives/leverage-points-places-to-intervene-in-a-system/ | P (author's essay) | 2026-10-23 | High (content); essay date 1999 not confirmed on page |
| S17 | Adults with no system dynamics training, at an elite business school, showed poor understanding of stocks, flows and delays; many matched the stock's shape to the flow's shape. | Booth Sweeney, L. and Sterman, J. D. "Bathtub Dynamics: Initial Results of a Systems Thinking Inventory." System Dynamics Review 16(4), 2000. Preprint at https://web.mit.edu/jsterman/www/Bathtub.pdf | P | 2026-10-23 | High |
| S18 | Five focusing steps: identify, exploit, subordinate, elevate, then return to step one; do not maximise non-constraints; avoid producing more than the constraint can handle. | Theory of Constraints Institute, "Five Focusing Steps." https://www.tocinstitute.org/five-focusing-steps.html | F (vendor) | 2026-10-23 | High for steps; vendor percentage claim not used |
| S19 | Theory of constraints introduced by Eliyahu Goldratt in The Goal (1984); "a chain is no stronger than its weakest link". | Wikipedia, "Theory of constraints." https://en.wikipedia.org/wiki/Theory_of_constraints | W | 2026-10-23 | Medium-high (well-known fact, secondary) |
| S20 | Controlled experiments are the best design for establishing a causal relationship; if run properly the only consistent difference between variants is the change. | Kohavi, R., Longbotham, R., Sommerfield, D., Henne, R. M. "Controlled experiments on the web: survey and practical guide." Data Mining and Knowledge Discovery 18: 140 to 181, 2009. https://link.springer.com/article/10.1007/s10618-008-0114-1 | P | 2026-10-23 | High |
| S20 | Underpowered experiments are a common mistake; compute a minimum sample size first; run at least a week or two, in whole weeks. | Kohavi et al. 2009 | P | 2026-10-23 | High |
| S20 | Limitations: experiments show which variant is better but not why; primacy and newness effects; short-term measures can be gamed (ads example). | Kohavi et al. 2009 | P | 2026-10-23 | High |
| S20 | Randomisation must give each user an equal chance of each variant. | Kohavi et al. 2009 | P | 2026-10-23 | High |
| S21 | Repeatedly checking and stopping when significant increases false positives; fix the sample size in advance. | Miller, E. "How Not To Run an A/B Test." 2010. https://www.evanmiller.org/how-not-to-run-an-ab-test.html | W (well-known practitioner essay) | 2026-10-23 | High (supported by S22) |
| S22 | Continuous monitoring of A/B tests makes traditional p-values and confidence intervals unreliable. | Johari, R., Koomen, P., Pekelis, L., Walsh, D. "Peeking at A/B Tests: Why it matters, and what to do about it." KDD 2017 (abstract). https://www.kdd.org/kdd2017/papers/view/peeking-at-ab-tests-why-it-matters-and-what-to-do-about-it | P (abstract only read) | 2026-10-23 | High |
| S23 | A randomly assigned control group lets you compare against what would have happened if you changed nothing (back-to-work example). | Haynes, L., Service, O., Goldacre, B., Torgerson, D. Test, Learn, Adapt: Developing Public Policy with Randomised Controlled Trials. UK Cabinet Office, 2012. https://assets.publishing.service.gov.uk/media/5a7488c8e5274a7f9c586c23/TLA-1906126.pdf | P (government guidance) | 2026-10-23 | High |
| S23 | Random allocation makes groups equivalent on key factors; people with a vested interest may allocate non-randomly, even unconsciously. | Test, Learn, Adapt, step 5 | P | 2026-10-23 | High |
| S23 | Define the outcome and how it is measured in advance; with lots of data some numbers improve by chance, and picking them misleads. | Test, Learn, Adapt, step 2 | P | 2026-10-23 | High |
| S23 | Sample size must be sufficient; small effects need more participants; many interventions have small effects. | Test, Learn, Adapt, step 4 | P | 2026-10-23 | High |
| S23 | Replicate results, especially before applying to a different group. | Test, Learn, Adapt, step 9 | P | 2026-10-23 | High |
| S24 | Selection bias: individuals or groups in a study differ systematically from the population of interest; randomisation helps prevent it. | Catalogue of Bias, "Selection bias." Centre for Evidence-Based Medicine, Oxford. https://catalogofbias.org/biases/selection-bias/ | S | 2026-10-23 | High |
| S25 | Confounding: a factor associated with both exposure and outcome distorts the association; randomisation is the best way to reduce it. | Catalogue of Bias, "Confounding." (Aronson, Bankhead, Nunan, 2018) https://catalogofbias.org/biases/confounding/ | S | 2026-10-23 | High |
| S26 | Correlation describes the size and direction of a relationship; it does not automatically mean causation; ice cream and sunscreen both driven by season. | Australian Bureau of Statistics, "Correlation and causation." 2023. https://www.abs.gov.au/statistics/understanding-statistics/statistical-terms-and-concepts/correlation-and-causation | P (national statistics office) | 2026-10-23 | High |
| S27 | Post hoc, common cause (wipers and rain), reversing causation, regression fallacy, oversimplification (minor cause treated as major). | Dowden, B. "Fallacies." Internet Encyclopedia of Philosophy. https://iep.utm.edu/fallacy/ | S (peer-reviewed encyclopedia) | 2026-10-23 | High |
| S28 | Rewarding good results and punishing bad ones, plus regression to the mean, makes punishment look effective; coin-toss demonstration. | Kahneman, D. Biographical, Nobel Prize in Economic Sciences 2002. https://www.nobelprize.org/prizes/economic-sciences/2002/kahneman/biographical/ | P (autobiography) | 2026-10-23 | High |
| S29 | IHC Key Concepts include: association is not causation, fair comparisons, similar comparison groups, small studies, play of chance, belief in single studies; sets for primary and secondary school and parents. | Informed Health Choices, "Key Concepts." https://www.informedhealthchoices.org/key-concepts/ | S | 2026-10-23 | High |
| S30 | Cluster-randomised trial in 120 Ugandan primary schools: IHC lessons raised mean test score from 43.1% to 62.4%; passing 69% vs 27%; effective across reading levels but more so for better readers. | Nsangi, A. et al. Lancet 390(10092): 374 to 388, 2017. PubMed abstract, PMID 28539194. https://pubmed.ncbi.nlm.nih.gov/28539194/ | P | 2026-10-23 | High |
| S31 | Calling Bullshit causality week covers correlation vs causation, regression to the mean as a treatment effect, selection masked as transformation. | Bergstrom, C. T. and West, J. D. Calling Bullshit syllabus, University of Washington. https://callingbullshit.org/syllabus.html | S | 2026-10-23 | High |
| S32 | Merton (1936) named sources of unanticipated consequences: ignorance, error, imperious immediacy of interest, basic values, self-defeating prediction; unintended consequences can be positive. | Norton, R. "Unintended Consequences." Concise Encyclopedia of Economics, Econlib. https://www.econlib.org/library/Enc/UnintendedConsequences.html | S | 2026-10-23 | Medium-high (secondary summary of Merton) |
| S33 | An act, habit, institution or law produces not one effect but a series of effects. | Bastiat, F. "What Is Seen and What Is Not Seen." Econlib edition. https://www.econlib.org/library/Bastiat/basEss1.html | P | 2026-10-23 | High (content); date not used |
| S34 | Wikipedia attributes "too basic a tool" to Minoura and lists unattributed criticisms of five whys. | Wikipedia, "Five whys." https://en.wikipedia.org/wiki/Five_whys | W | 2026-10-23 | Low (the quote was not found in [S2]) |

**Count:** 59 claim rows across 34 sources (one of them, S34, is used only to flag a quote that could not be found).

## Unverified claims (do not use as fact in learner-facing text)

| # | Claim | Status | How chapters should phrase it |
|---|---|---|---|
| U1 | British officials in Delhi paid for dead cobras and people bred cobras (the "cobra effect"). | No contemporary records found, per a secondary report [S9]; primary investigation not read. | "A famous story, probably made up, says..." Prefer a fictional case. |
| U2 | Wald told the military to armour the engines, and the advice was adopted. | Not documented [S5]. | Avoid the story. If used: "a well-known story, mostly retold rather than recorded". |
| U3 | The Washington Monument five-whys case. | Wrong in its details [S1]. | Do not use. |
| U4 | Minoura called the five whys "too basic a tool". | Not found in the report copy [S2]. | Do not quote. Say "a senior engineer from the same company warned that each why must be answered by looking, not guessing." |
| U5 | Sakichi Toyoda invented the five whys. | Wikipedia only [S34]. | Say only that it comes from the car maker's production system and Ohno described it [S1]. |
| U6 | The fishbone was first used in 1943, or in the 1920s, or created in the 1960s. | Sources disagree; only Wikipedia read for dates [S4]. | Give no year. "Named after Kaoru Ishikawa, a Japanese quality expert, who made it widely known." |
| U7 | Hanoi 1902 rat-tail bounty led people to breed rats. | Historian's article not read. | Avoid (colonial setting; not verified here). |
| U8 | Goodhart's exact 1975 sentence. | Secondary only [S8]. | Do not quote Goodhart in chapters. Use Strathern's sentence without attributing it to Goodhart. |
| U9 | "Change one thing at a time" is one of Agans's nine debugging rules. | Rule list not read. | Present it as the course's advice; no attribution. |
| U10 | "Test the cheapest likely cause first" as an established rule. | No source read. | Course rule of thumb: weigh how likely and how cheap. |
| U11 | The first three focusing steps reveal at least 30% hidden capacity. | Vendor claim without evidence [S18]. | Do not use any percentage. |
| U12 | Kepner and Tregoe published the method in a 1965 book. | Not read. | Do not give a date or the names; say "the is / is not method". |
| U13 | "And then what?" comes from a named economist. | Not read. | The course's own question; no attribution. |
| U14 | Beginners misread "positive loop" as "good loop". | Course judgement, not research. | Use plain names; no claim about learners in chapter text. |
| U15 | The Meadows essay is from 1999; Bastiat's essay is from 1850. | Dates not confirmed on the pages read. | Give no dates in chapters. |
| U16 | Blameless culture originated in healthcare and aviation. | Stated by SRE authors [S10], not traced further. | "Safety experts in hospitals and aviation have long worked this way" is fine; do not claim a date or first use. |

**Count:** 16 unverified claims.

## Open questions for instructors

1. **Naming the car maker.** The origin of the five whys is well sourced and harmless, but the writer pack bans company names. Allow "Toyota" once in 4.03, or keep "a large Japanese car maker"?
2. **Reading load.** The decision log applies 1,200 prose words per chapter and raises the course to 18 hours. Given the evidence that weaker readers gain less [S30], should this course take the shorter course 9 minimum? (The decision log names a proposal, `agent-ip/proposals/2026-10-23-prose-minimums-by-course-type.md`, which was not yet in this worktree on 2026-10-23.)
3. **Five-whys canvas shape.** A single linear chain risks teaching the habit Card criticises [S1]. Can the 3 by 2 state machine show one wrong ending (blame) or one second branch?
4. **Grading root causes.** Two chains can both be valid [S1]. What rubric line tells a mentor to accept a different but evidenced chain?
5. **Provided cases in Gaza.** Which everyday problems are safe for a capstone? Proposal: a delivery process, a study routine, a device fault, a client communication problem. Exclude anything whose root cause is war damage, blockade, or power supply.
6. **Course 9 overlap.** What examples did course 9 module 4 use for correlation, so module 2 does not repeat them?
7. **Systems archetypes.** Teach one named pattern ("a fix that backfires") in module 7, or none?
8. **Regression to the mean.** Agree to add it to 2.03 (recommended), or leave it out?
9. **Tech fellows.** Should 5.04 mention the version-control bisect command as a stretch note for course 8 fellows [S15]?
10. **Real sources in chapters.** The decision log says no links. Should chapters still name the people whose ideas they use (Ohno, Ishikawa, Strathern, Meadows, Goldratt), or keep all names out?

## Handoff

```yaml
artifact: research-dossier
course: cause-and-effect
version: 1
sources_checked: 2026-10-23
hard_constraints:
  - Second-language phone readers with a 1,200-word chapter minimum
  - Neutral fictional cases only; famous stories are war-related, colonial or inaccurate
  - No statistics, but chance and sample size must be taught honestly
  - Graded keys only on reasoning steps; root-cause conclusions go to rubric-graded open questions
  - Small Mermaid diagrams and two stepper canvases for a visual topic
out_of_scope:
  - Statistics formulas, significance and power
  - Formal causal inference and causal graph notation
  - System dynamics modelling and full archetype sets
  - Full theory of constraints, Six Sigma, FMEA and branded methods in full
  - Multivariate and sequential testing
  - Just culture decision trees
  - Aircraft armour, cobra, rat bounty, flight school and monument stories
open_questions:
  - Name the car maker in 4.03 or not
  - Keep the 1,200-word minimum or use the shorter exception
  - Five-whys canvas with a wrong ending or a branch
  - Rubric line for different but valid root-cause chains
  - Safe provided capstone cases for Gaza
  - Course 9 module 4 example overlap
  - One named systems archetype or none
  - Add regression to the mean to 2.03
  - Bisect stretch note in 5.04
  - Name thinkers in chapters or not
```
