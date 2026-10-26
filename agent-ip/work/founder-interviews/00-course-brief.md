---
artifact: course-brief
course: founder-interviews
working_title: "The Founder Interview: Ownership, Impact and Your Story"
version: 1
status: draft
owner: Zeeshan (architect, human sponsor)
target_publish: after G2B instructor sign-off and G7 delivery lead approval
---

# Course brief: founder-interviews

Source of intake: the sponsor's request of 2026-10-24: "one more course on founder interviews and the sort of questions asked: things you owned end to end, case studies, impact, storytelling, five whys around your project and resume, the best technical thing you did", with practice through an AI interviewer that uses each learner's own API key, asks the questions deeply, lets them show how they think, and guides them on strengths and weaknesses. Course 14 of the fellowship pipeline.

## One sentence

Fellows prepare for the interview a startup founder or a small team's hiring manager runs, where every claim on the resume is probed with "why" until the real decisions show, by learning to tell owned, measured stories and practising them against an AI interviewer that digs five whys deep and reports their strengths and weaknesses.

## Learner

- Who: Gaza fellowship fellows applying to startups and small remote teams (engineering, product, design, operations), early career to mid level.
- Prior knowledge: at least one project, job, internship, freelance gig or volunteer role they can talk about, and a resume draft. No interview training assumed.
- Language: Arabic first language, English as a second language. Plain English, short sentences, every term defined on first use.
- Device and connection: mostly phones on weak or expensive data. The AI interview is text chat, light on data. Every AI practice has a written fallback for fellows without a key or credit.
- Time available: about 3 to 5 hours a week for 3 weeks.
- What they will do with the result: a story bank of five owned stories with numbers, a resume where every line survives five whys, and recorded or written practice transcripts with feedback.

## Outcome

By the end, the learner can:

1. Tell a project story they owned end to end, naming their own decisions, trade-offs and what they would change.
2. State impact with honest numbers and say how they measured them, or say plainly what they could not measure.
3. Survive a five whys chain on any resume line or project choice, reaching the real reason without inventing.
4. Work through a case-study question from a founder (a product, growth or technical decision under constraints) aloud and structured.
5. Explain the best technical thing they did, at a level a founder can follow and an engineer can probe.
6. Name their own strengths and weaknesses with evidence, and a plan for each weakness.

## Practice and the AI interviewer

- Platform dependency: a new activity type `AI_INTERVIEW` (fence ```aiinterview) and a learner key setting, built in a separate platform PR (`feat/ai-interviewer-byok`). The interviewer asks an opening question, follows one thread with "why" up to a set depth, moves across focus areas, and ends with structured feedback (strengths, weaknesses with a fix each, notes per area, next steps). The learner's key and their pasted resume or project text stay private to them and their mentors.
- Each module ends with one AI interview drill on its focus, plus a written fallback (an open question with a model answer) for learners without a key. A course must never require paid credit to finish: the fallback completes the same gate.
- Mentors review the gate answers and can read interview transcripts.

## Constraints

- General course: no company names, no named founders or investors, no marketing links, no real interview reports. Scenarios are fictional composites, marked once.
- No em or en dashes. No AI attribution.
- Honesty: the course teaches never to invent numbers or ownership; the AI interviewer and the chapters reward "I did not measure that" over a made-up figure.
- Privacy: learners are told not to paste personal identifiers, client secrets or other people's private data into the interview.
- agent-ip v0.4: every Learn chapter teaches through an interactive element; audits pass; blind key check; two critic rounds.

## Non-goals

- Salary negotiation, offer comparison, visa and contract law.
- Technical coding interviews (course 8 covers the AI engineering loop).
- Pitching to investors (a different audience and goal).

## Success signals

- Each fellow has five stories with numbers and a resume where every line has an answer two whys deep.
- AI interview feedback shows fewer "vague ownership" and "unsupported number" flags between the first and the last drill.
- A mentor can review the capstone in under 30 minutes.
