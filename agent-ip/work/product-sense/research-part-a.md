---
artifact: research-dossier-part
course: product-sense
part: A
scope: product thinking, UI fundamentals, UX fundamentals, taste
version: 1
status: draft
owner: research
sources_checked: 2026-10-25
hard_constraints:
  - Phones, weak and expensive data, power cuts. Every task needs a phone path, every picture is a small SVG, and the course's own examples should respect a page weight budget it can state and check
  - Arabic first. The type numbers in the sources (line length, body size, line height) are for Latin text. No opened source gives Arabic numbers, so chapters must not present them as Arabic rules (RTL markup and logical CSS are sourced)
  - Standards have levels. WCAG 2.2 A and AA are the teachable bar. AAA items (44 by 44 targets, 80 character lines, no motion animation) are good practice, not the standard's floor
  - Most UX "rules" are heuristics or practitioner advice, not research. Chapters must say which kind each claim is (standard, research, heuristic, practice)
  - Taste is the course's own method. No source defines "average, good, best, remarkable", so the scale must be built from checkable criteria that are each supported, and opinion must stay out of graded items
out_of_scope:
  - A tool tour of Figma or any design tool
  - CSS or framework teaching beyond the small examples that explain a rule
  - A/B testing statistics, surveys at scale, analytics platforms
  - Colour theory beyond contrast, meaning-by-colour myths and colour-blindness simulation tools
  - Logo, brand identity, illustration, video editing
  - The AI-made look and design-specific AI tools (Part B)
  - Demo, case study and presentation craft (Part B)
open_questions:
  - Is WCAG 2.2 AA the stated bar for the course, with AAA items taught as "go further" notes?
  - Who reviews the Arabic typography advice? A native-reader review is needed before any Arabic size, line length or line height number is taught
  - May chapters name public products? Only GOV.UK was opened and checked here. Other products need an open-and-date check at writing time
  - May learner-facing text carry an evidence label (standard, research, heuristic, practice) on each rule?
  - Which phone-friendly contrast checker should chapters name? Tool facts are out of Part A scope and need a dated check
  - Can fellows safely run 3 to 5 person hallway checks (consent, whose phone, what is on screen)? Ask the sponsor or mentors about risk and privacy
  - Should HEART be taught at all for a one-person project, or only the Goals, Signals, Metrics habit?
---

# Research dossier, part A: product thinking, UI, UX, taste

This is a decision aid for the curriculum architect and chapter writers of course 18, "Product Sense for Engineers". It covers product thinking, UI fundamentals, UX fundamentals and taste. Part B covers the AI-made look, AI design tools and presenting work. Each finding says what is safe to say, what people often get wrong, and how to phrase it. Claims carry a source ID in square brackets, for example [A1]. The source table near the end gives the claim, source, type, date checked (all 2026-10-25), and confidence. Claims marked **UNVERIFIED** must not appear in learner-facing text as fact.

Dates inside the findings are the dates the pages state. Some pages say "last reviewed" with a date in 2026. These are as the fetched page reported them on 2026-10-25.

Evidence labels used in this dossier, and proposed for chapters:

- **Standard:** a published requirement (for example a WCAG success criterion).
- **Research:** a study with a stated method or sample.
- **Heuristic:** an expert rule of thumb from a respected body of practice.
- **Practice:** advice from a practitioner or a design system, with no stated test.

## Five findings that should change a naive outline

1. **"Large text" is not "big headings".** WCAG large-scale text is at least 18 point or 14 point bold, about 24 or 18.5 CSS pixels [A1, A17]. Body text is not large. Placeholder grey, light secondary text and many default greys fail 4.5:1. The arithmetic is easy to teach and to grade [A87].
2. **There is no single touch target number.** WCAG AA says 24 by 24 CSS pixels with a spacing exception [A4]. WCAG AAA says 44 by 44 [A16]. Apple says 44 by 44 points default and 28 by 28 minimum on iOS [A38]. Material says 48 by 48 dp and 8 dp spacing [A39]. Teach the target (44 to 48) and the legal floor (24) as different things.
3. **Several famous rules fail a check.** The 3-click rule was not supported by a 44-person study [A54]. Miller's seven is about memory span, not menus [A55]. The golden ratio evidence is mixed [A56]. "Blue means trust" is context dependent and the field calls its own findings nascent [A57]. Hoober, who made the popular thumb reach diagrams, later said to ignore them [A59]. The "7 friends in 10 days" number is described by an analytics writer as a round number, not a scientific threshold [A73]. A myth list belongs in the course as a critical-thinking exercise.
4. **Onboarding tours are the weak default, not the strong one.** NN/g says tutorials frequently do not perform well in its studies and are dramatically overused [A62]. Empty states and contextual help are the better first tools [A22, A62]. "Aha moment" is mostly industry folklore [A73].
5. **The five-user rule has conditions.** It is about problems found per round for one comparable group, with several rounds, and it needs more people for distinct groups [A20]. The five-second test rests largely on anecdote and fits simple screens [A71]. Teach both as cheap checks that find big problems, not as proof that a design is good.

## Hard constraints (what shapes the course design)

1. **Phone and weak data.** The median home page weighed about 2.3 MB on mobile in October 2024 [A48]. Core Web Vitals use field data at the 75th percentile [A44]. Fellows' pages should have a stated weight budget, and every exercise needs a phone path.
2. **Arabic first.** Direction goes in markup (`dir="rtl"` on `html`, `lang` separately), not CSS alone [A78]. Logical CSS properties flip with direction [A79]. Typography numbers from Butterick, Material and WCAG are for Latin or CJK text, so Arabic needs its own review [UNVERIFIED].
3. **Levels of standard.** Teach AA as the bar. Tag AAA items as extras [A13, A16, A6].
4. **Evidence honesty.** Label each rule as standard, research, heuristic or practice.
5. **Taste as criteria.** Judgment is trained by critique against objectives [A31], not by "I like it". The four-level scale is the course's own and each level needs checkable criteria (see the taste section).

## 1. Product thinking for engineers

### 1.1 Problem before feature, and the job

**Safe to say.**
- A "job to be done" is the progress a person is trying to make in a particular circumstance. People "hire" a product for it [A29]. The same product can be hired for different jobs in different circumstances, as in the milkshake example (morning commute versus afternoon treat for a child) [A29].
- The HBR article by Christensen, Hall, Dillon and Duncan (September 2016) argues that teams focus too much on the product and not enough on the job the customer is trying to get done [A28].
- Shape Up says to narrow down the problem before choosing a solution. Its example turns a request for complex permission rules into a warning on an archive action, a one-day change. Its question is "What's really going wrong?" [A27].
- The UK government's published design principles start with "Start with user needs" and include "Do less" [A75].

**People often get wrong.** They treat a job as a feature list or a persona. The source defines a job by circumstance and progress, not by who the person is [A29]. The HBR page excerpt available did not include the full milkshake text, so only the Christensen Institute page supports the example [A28, A29].

**Phrase it this way.** "A job is the progress someone wants to make in a situation. Write it as: when I am in this situation, I want to do this, so that I get this." The sentence template is the course's own, built on the definition [A29]. Label it "course template".

### 1.2 Scope and appetite

**Safe to say.**
- An appetite is a time budget set before the design. An estimate starts from a design and gives a number. An appetite fixes the time and shapes the design to fit: "fixed time, variable scope" [A27].
- Shape Up sizes: a small batch is one to two weeks for a small team, a big batch is a full six-week cycle [A27]. For this course the 20-hour budget is the learner's appetite, and the capstone is "fixed time, variable scope". That mapping is the course's own.
- Shaped work is rough, solved and bounded. Wireframes are too concrete and a phrase like "build a calendar view" is too abstract [A77].
- Scope hammering means questioning each item: is it a must-have, what happens without it, how many people does it affect. Non-essential items become nice-to-haves, marked with a tilde, and usually are not built [A76].
- "Compare to baseline": compare the work to what the user has now, not to an ideal [A76].

**People often get wrong.** They think scope cutting lowers quality. Shape Up argues that choosing what to execute does not leave holes in the product and can differentiate it [A76]. This is the book's argument (practice), not a study.

**Phrase it this way.** "Decide how much time the idea deserves first. Then shape the idea to fit." Attribute to Shape Up (a free book from Basecamp, by Ryan Singer) [A27].

### 1.3 Trade-offs, saying no

**Safe to say.** The sourced tools for saying no are scope hammering [A76] and the "Do less" principle [A75]. The sentence "what did you give up?" in the brief's demo is the course's own prompt and has no source.

**People often get wrong.** Saying no is a skill that needs a reason. There is no research source for a "right" way to say no. **UNVERIFIED** as a method; teach it as a template (the item, who it affects, what happens without it, what we do instead) built on the scope hammering questions [A76].

### 1.4 Success measures

**Safe to say.**
- HEART is Happiness, Engagement, Adoption, Retention, Task success. It came from Rodden, Hutchinson and Fu at Google (CHI 2010) for large-scale web products [A30].
- The paper says it is not always appropriate to use every category. For example, Engagement may not be meaningful for a tool people must use at work [A30].
- Goals, Signals, Metrics is the process: state the goal, find signals in behaviour or attitude, then build metrics [A30]. Its tips: raw counts rise with the user base so use ratios or per-user averages; choose signals that are sensitive and specific to the goal; failure is sometimes easier to see than success, such as abandonment or undo [A30].
- The paper says metrics should be triangulated with usability and field studies and are not a substitute for early user research [A30].

**People often get wrong.** HEART was built for products with large-scale logs and surveys. A one-person capstone has no dashboard. Teaching "track the five HEART metrics" would be wrong for the learner.

**Phrase it this way.** "Pick one goal for the screen. Pick one thing you can see someone do that shows the goal was met. Count it in a test with three to five people." The scaled-down habit is the course's own, built on Goals, Signals, Metrics [A30]. Task success (did they finish, how long, what errors) is the HEART category that a small test can observe [A30]. Label it as an adaptation.

### 1.5 Small honest user checks

**Safe to say.**
- Nielsen's "Why You Only Need to Test with 5 Users" (2000): the model N(1 minus (1 minus L) to the power n) with L about 31% in the authors' projects. Five users find about 85% of problems in a round. The article recommends several small rounds (about three of five) over one large one [A20].
- Its limits: fixes may not work, so iterate; one user can be unrepresentative so use at least three; distinct user groups need 3 to 4 per group (two groups) or 3 per group (three or more) [A20].
- NN/g's usability testing guide (Kate Moran) describes a facilitator, tasks and a participant who thinks aloud, with five participants for a single user group [A80].
- Hallway testing: grab the next person who passes and have them try what you built. Spolsky says five people reveal most of the problems and the method is free [A70]. This is a blog claim from 2000 and the "95%" figure is his, so use it as practice, not research. The NN/g 85% figure is from the model above [A20].
- The five-second test shows a design for five seconds, hides it, and asks what the person took away. The term is credited to Christine Perfetti in the mid-2000s. The five-second figure rests largely on anecdotal evidence. For complex pages ten seconds may work better. It tests first impression, not interaction [A71].

**People often get wrong.** "Five users find 85% of everything" is a misreading. The claim is about the share of problems one kind of user group reveals per round, and Nielsen says to repeat rounds [A20]. Also, the page behind the NN/g follow-up links is the only place the "20 users for quantitative studies" number appeared in the fetched summary, so do not teach that number [UNVERIFIED].

**Phrase it this way.** "Watch three to five people try one task. You will see the biggest problems. Fix, then test again." Add: "This finds problems. It does not prove the design is good." Hallway checks need consent and care about what is visible on the screen (open question).

## 2. UI fundamentals

### 2.1 Visual hierarchy

**Safe to say.**
- Visual hierarchy guides the eye in the order of intended importance. It comes from scale, contrast in value and saturation (not the colour itself), and grouping by proximity, common regions and whitespace [A69].
- NN/g advises no more than three sizes and making the most important element the largest [A69].
- The squint or blur test shows the real groupings and any unintended emphasis [A69].
- People fall into F-shaped scanning on text-heavy pages that give no strong cues. NN/g calls that pattern bad for users and says to front-load key points, use clear headings that start with informative words, and cut unnecessary content [A68].
- Heuristic 8: show relevant information only. "Minimalist" means removing what does not support tasks, not a visual trend [A67].

**People often get wrong.** "F-pattern" is not a layout to copy. NN/g describes it as the failure mode when no cues exist [A68].

**Phrase it this way.** "Squint at your screen. What do you see first? Is that what you want them to see first?" The squint test is sourced [A69]. The question wording is the course's own.

### 2.2 Typography

**Safe to say.**
- Body size on web: Butterick recommends 15 to 25 pixels, tuned to the typeface [A32]. Line length 45 to 90 characters including spaces [A33]. Line spacing 120% to 145% of the point size [A34]. These are one expert's recommendations (practice).
- Material 3 recommends a line height of about 1.5 times the size for body and label text and 1.2 for large display, headline and title text [A36]. Material also says to avoid expressive or decorative fonts for body text [A36].
- Tailwind v4 defaults: `text-base` is 1rem (16px) with line height 1.5; `text-sm` is 14px [A50]. Bootstrap 5.3 body text is 1rem on a 16px browser default [A52]. These show what the defaults are.
- Apple HIG: iOS default text size is 17 pt and the minimum is 11 pt, and it asks designers to follow the platform defaults and minimums [A37].
- WCAG 1.4.4 (AA): text can be resized up to 200% without losing content or function [A15]. WCAG 1.4.12 (AA): content must survive a user setting line height 1.5, paragraph spacing 2, letter spacing 0.12 and word spacing 0.16 times the font size [A14]. Authors do not have to use these values.
- WCAG 1.4.8 (AAA): a mechanism for no more than 80 characters per line (40 for CJK), at least 1.5 line spacing within paragraphs, and no justified text. Content is not required to use these values [A13].
- Apple HIG layout guides restrict text width for readability [A89].

**People often get wrong.** Butterick's and WCAG's numbers are for Latin or CJK. WCAG gives a number for CJK but none for Arabic [A13]. No opened source gives Arabic line length, size or leading [UNVERIFIED]. Also, WCAG 1.4.8 is AAA. Do not say "WCAG requires 80 characters".

**Phrase it this way.** "Start body text at 16 px or more with a line height of about 1.5. Keep lines to a comfortable length. Let the user scale text to 200%." Cite [A15, A36, A50, A32]. For Arabic: "check with a native reader on a real phone" (course rule, no source).

### 2.3 Spacing, alignment and grids

**Safe to say.**
- Material 2: most measurements align to 8dp, icons can align to a 4dp grid, and type to a 4dp baseline grid [A40].
- Material 3 spacing: spacing groups related content, directs attention, and can be expressive. Consistent spacing between related items makes them easier to scan. Desktop can use more generous spacing than mobile [A90].
- Tailwind v4's default spacing unit is 0.25rem (4px at 16px) [A49].
- NN/g form guidance: put a label closer to its own field than to other fields, and group related fields, using the law of proximity [A64].

**People often get wrong.** The "8-point grid" is Material's convention. The Apple HIG layout page opened here does not state an 8-point rule for iOS [A89]. So do not say "all platforms use an 8 point grid".

**Phrase it this way.** "Pick one spacing step (for example 4 or 8) and use multiples. The point is consistency, not the number." The consistency point is sourced [A90]. The number is Material's choice [A40].

### 2.4 Colour and contrast

**Safe to say.**
- WCAG 1.4.3 Contrast (Minimum), Level AA: text and images of text need at least 4.5:1, except large-scale text which needs 3:1 [A1].
- Large-scale text is at least 18 point or 14 point bold. The page gives these as about 24 and 18.5 CSS pixels [A1, A17]. Exceptions: inactive controls, pure decoration, text not visible to anyone, and logotypes [A1].
- WCAG 1.4.11 Non-text Contrast, AA: the visual information needed to identify UI components and their states, and parts of graphics needed to understand content, need 3:1 against adjacent colours. Exceptions: inactive components, browser-determined appearance, essential graphics. Text inside graphics still needs 1.4.3 [A2].
- WCAG 1.4.1 Use of Color, Level A: colour is not the only way to convey information, indicate an action, prompt a response or distinguish an element. Add shape, an icon or text [A3].
- Contrast ratio is (L1 + 0.05) / (L2 + 0.05), where L is relative luminance [A17].
- Computed with that formula (agent arithmetic, reproducible): black on white is 21:1; #767676 on white is 4.54:1 (passes AA for normal text); #777777 on white is 4.48:1 (fails); #999999 on white is 2.85:1 (fails both thresholds) [A87].
- Apple's accessibility page points to WCAG AA and APCA, lists 4.5:1 up to 17 pt, 3:1 at 18 pt or bold, and says to check both light and dark appearances and to offer higher contrast when the Increase Contrast setting is on [A38]. Material's contrast page repeats W3C's 3:1 and 4.5:1 and also asks for 3:1 between button container and background, with standalone elements such as a FAB not needing it [A41].

**People often get wrong.** (a) "Large text" means any heading. It means at least 18 pt regular or 14 pt bold [A1]. (b) Apple's table says 17 pt and under needs 4.5:1, 18 pt needs 3:1 [A38]. Apple uses points on iOS and WCAG uses point sizes converted to CSS pixels, so do not mix the units. (c) Hint text, borders of inputs and icons are non-text or text that still need ratios [A2]. (d) Passing contrast does not make a design good (see aesthetic-usability, 4.1).

**Phrase it this way.** "Normal text needs 4.5 to 1. Big text needs 3 to 1. Borders and icons that carry meaning need 3 to 1. Never use colour alone." All four are sourced [A1, A2, A3]. Scenario numbers in quizzes should come from the formula [A17, A87], not from memory.

### 2.5 Touch target sizes

**Safe to say.**
- WCAG 2.2 SC 2.5.8 Target Size (Minimum), AA: pointer targets are at least 24 by 24 CSS pixels, except when spacing keeps a 24 px circle around each undersized target clear of others, an equivalent control exists, the target is inline in text, the browser controls it, or the size is essential [A4].
- WCAG 2.5.5 Target Size (Enhanced), AAA: at least 44 by 44 CSS pixels, with fewer exceptions [A16].
- Apple HIG: iOS default control size is 44 by 44 points and the minimum is 28 by 28 points [A38].
- Material 3: consider touch targets of at least 48 by 48 dp (about 9 mm), targets separated by 8 dp or more, and an icon can look 24 dp while its touch target is 48 dp [A39].

**People often get wrong.** "WCAG requires 44". It requires 24 at AA and 44 only at AAA [A4, A16]. Also "Apple's minimum is 44": the table gives 44 as default and 28 as minimum [A38]. Material notes iOS recommends 44 [A39].

**Phrase it this way.** "Aim for about 44 to 48 for finger targets. The accessibility floor at AA is 24, and only with spacing." Cite all four [A4, A16, A38, A39].

### 2.6 Dark mode

**Safe to say.**
- NN/g (Raluca Budiu, 2020) reviewed the literature: for people with normal vision, light mode leads to better visual performance most of the time. Some people with cataract-related conditions may do better in dark mode, from small studies (7 participants in one cited study). NN/g recommends letting users switch to dark mode and says it had not done its own dark mode research [A65].
- Battery savings: NN/g says dark mode "might" extend battery life and gives no measurements [A65].
- Apple says check minimum contrast in both light and dark appearances [A38].
- Bootstrap 5.3 documents default light and dark colour modes [A51].

**People often get wrong.** "Dark mode is easier on the eyes." NN/g does not support this as a general claim [A65]. Do not teach it as a health or battery fact [A65].

**Phrase it this way.** "Offer dark mode as a choice, and check contrast in both." Sourced [A38, A65].

## 3. UX fundamentals

### 3.1 Nielsen's 10 heuristics

**Safe to say.** The ten: visibility of system status; match between system and real world; user control and freedom; consistency and standards; error prevention; recognition rather than recall; flexibility and efficiency of use; aesthetic and minimalist design; help users recognize, diagnose and recover from errors; help and documentation. They are "broad rules of thumb", first published 1994, with the NN/g page reviewed in 2024 [A19]. NN/g's how-to for heuristic evaluation says three to five people should evaluate independently, about 1 to 2 hours each, then consolidate. Violations are not automatically problems because the right trade-off depends on context [A66].

**People often get wrong.** Heuristics are not laws and not test results. A heuristic evaluation finds possible problems. It does not replace watching users [A66].

**Phrase it this way.** "These are rules of thumb. Use them to find problems, then check with people." Sourced [A19, A66].

### 3.2 Response time, loading and skeleton screens

**Safe to say.**
- Nielsen's three limits: about 0.1 s feels instant; about 1 s keeps the train of thought; about 10 s is the limit for keeping attention on the task. Longer waits need feedback about when the system will finish [A21]. He cites Miller (1968) and Card, Robertson and Mackinlay (1991) as the origin and says the basic advice has barely changed in decades. The text is an excerpt of his 1993 book [A21].
- Feedback: for over about 10 s use a percent-done indicator. If the total is unknown, show running progress such as the item being processed. A generic spinner is a last resort. For 2 to 10 s a busy cursor and a small changing counter can suffice [A21].
- NN/g on skeleton screens (Samhita Tankala, 2023): use them for full-page loads under about 10 s; spinners for a single module in about 2 to 10 s; progress bars over 10 s and for uploads and downloads; nothing for loads under 1 s. Avoid frame-only skeletons. Animated shimmer can distract or cause accessibility problems [A24].
- Evidence status: NN/g says skeleton screens create the illusion of a shorter wait. The article presents no test results of its own and lists one study (Mejtoft, Långström, Söderström, 2018) only in its references [A24].

**People often get wrong.** "Skeleton screens make pages faster." They change perception at best. The source says "illusion", and the evidence is argued, not measured [A24] (see UNVERIFIED table). Also, the three limits are older guidance from perception research cited in a 1993 book, not new measurements [A21].

**Phrase it this way.** "Under a second, show nothing special. Two to ten seconds, show that something is happening. Over ten seconds, say how long it will take." Combines [A21, A24].

### 3.3 Empty, error and success states

**Safe to say.**
- NN/g on empty states (Kate Kaplan, 2021): do not leave a container fully blank; say what is happening (loading, failed or truly empty); do not show "no records" while data is still loading; give learning cues about what the feature does; give a direct way to start (a button, or demo data) [A22].
- NN/g's article is heuristic and expert-based: it cites examples (DataDog, Microsoft Power BI, Loggly) and no studies [A22].
- NN/g error messages (Neusesser and Sunwall, 2023): place the message near the cause; do not rely on colour or animation alone; use plain language; describe the specific problem; offer next steps; do not blame the user; preserve user input; do not show an error too early (leaving a field empty is exploratory) [A23].
- WCAG 3.3.1 Error Identification, Level A: if an input error is detected automatically, the item in error is identified and the error is described in text. Colour may add but not replace text [A7].
- GOV.UK Design System text input gives per-error message templates: "Enter [whatever it is]", "[whatever it is] must be [number] characters or less", "must be a number", and similar [A74].

**People often get wrong.** "A spinner is a loading state." A spinner with no message is not enough for long waits [A21]. And "No results" can be wrong while loading [A22]. The error text "Something went wrong" fails NN/g's "describe the specific problem" and "next steps" advice [A23].

**Phrase it this way.** "Every screen has four states: empty, loading, error, and full. Design the first three first." The four-state frame is the course's own. Each state's rule is sourced [A22, A21, A23].

### 3.4 Forms

**Safe to say.**
- NN/g (Katie Sherwin, 2014, reviewed 2018): placeholders are harmful. They vanish when typing, make checking work and fixing errors hard, can be mistaken for filled-in data, and often have poor contrast. Keep labels visible outside the field. Floating labels are better than placeholder-only but outside labels are best when space allows. The article cites user testing and eyetracking without methods or sample sizes [A25].
- WCAG 3.3.2 Labels or Instructions, Level A: labels or instructions are provided when content requires input. The page does not mention placeholders. It says labels should be presented to all users, not only assistive technology users [A8].
- GOV.UK: all text inputs must have labels, in most cases visible, above the input. "Do not use placeholder text in place of a label, or for hints or examples." Its reasons: it disappears, not all screen readers read it, and default styles often fail 1.4.3 [A74].
- NN/g (Marieke McCloskey, 2013): labels above fields are easier to scan; group related fields; put a label closer to its own field [A64].
- NN/g (Kathryn Whitenton, 2016): single column; labels immediately above fields on mobile; cut fields. It cites a CHI study where forms following its guidelines had 78% error-free first submissions versus 42% for those that violated them [A63]. The CHI paper was not opened [UNVERIFIED as a number to repeat].
- Baymard (Edward Scott, 2024): validate when the user leaves the field by default; for fixed-length inputs such as postal codes you can validate when the right length is reached; once an error shows, update it on each keystroke so it clears as soon as the input is valid. Based on usability testing and benchmark observations, with no participant count or A/B comparison of timing in the article. It says inline validation does not replace submit-time handling [A26].
- WCAG 3.3.8 Accessible Authentication (Minimum), AA: a step that needs a cognitive function test (such as remembering a password) must have an alternative or helping mechanism, unless a listed exception applies [A12].

**People often get wrong.** "WCAG bans placeholders." It does not mention them [A8]. The harm case comes from NN/g, GOV.UK and contrast rules [A25, A74, A1]. Also "validate on every keystroke" is wrong as a default for new fields. Baymard says to wait until the user leaves the field, except after an error is shown [A26].

**Phrase it this way.** "Put the label above the field and keep it visible. Use a hint for extra help. Check the field after the person leaves it." Sourced [A25, A74, A26].

### 3.5 Accessibility basics

**Safe to say.**
- WCAG 2.2 organises its guidelines under four principles: Perceivable, Operable, Understandable, Robust (POUR) [A9].
- WCAG 2.2 is a W3C Recommendation (the page reports publication 12 December 2024). It does not deprecate or supersede 2.0 or 2.1. New in 2.2 are 2.4.11 Focus Not Obscured (Minimum, AA), 2.5.7 Dragging Movements (AA), 2.5.8 Target Size (Minimum, AA), 3.3.7 Redundant Entry (A) and 3.3.8 Accessible Authentication (Minimum, AA). 4.1.1 Parsing was removed [A17].
- 2.1.1 Keyboard (A): all functionality is operable through a keyboard interface [A11].
- 2.4.7 Focus Visible (AA): any keyboard operable interface has a mode where the keyboard focus indicator is visible [A5].
- 1.1.1 Non-text Content (A): non-text content has a text alternative that serves the equivalent purpose. Pure decoration should be implemented so assistive technology ignores it (null alt text, technique H67). Giving decorative images non-empty alt text is listed as failure F39. Controls need a name that describes the purpose [A10].
- Bootstrap Reboot notes that links receive no special `:focus` styles by default, so a project that removes or never adds a visible focus style needs to add one [A52].

**People often get wrong.** "Accessibility is for a few users." The WCAG pages describe broad needs (low vision, colour vision, vestibular, motor) [A2, A3, A6]. Do not make claims about the percentage of users with disabilities (no source opened) [UNVERIFIED]. Also "alt text on every image": decorative images should get empty alt [A10].

**Phrase it this way.** "Can you do everything with a keyboard? Can you see where focus is? Does every meaningful image have a text alternative? Does colour carry meaning alone?" Maps to [A11, A5, A10, A3]. The quiz-style list is the course's own.

### 3.6 Mobile first

**Safe to say.**
- Luke Wroblewski, "Mobile First" (3 November 2009 article): design for mobile first. His three reasons are growth, constraints that force prioritisation, and capabilities. He writes that there is no room for extraneous elements on a 320 by 480 screen [A60]. This is a practitioner argument with a 2009 screen size.
- NN/g (Budiu and Pernice, 2016): mobile first is common, but a design ported from mobile can underperform on desktop; aim for content and feature parity, not identical UI; use a multiplatform strategy [A61].
- Hoober (UXmatters, February 2013): 1,333 observations, 780 touching the screen: one-handed 49%, cradled 36%, two-handed 15%. The editor's note says his guidelines were later updated, and in a 2017 comment he said the reach diagrams are unreliable and should be ignored, because later studies found people touch the centre of the screen most often [A59].

**People often get wrong.** The "thumb zone" green, yellow, red diagrams. The author of the data distanced himself from the reach diagrams [A59]. And "mobile first means desktop is an afterthought" is contradicted by NN/g's multiplatform view [A61].

**Phrase it this way.** "Start with the small screen because it forces you to decide what matters. Then check the large screen too." Source for the reasoning [A60], with the caveat [A61]. Do not teach thumb zones as fact; if mentioned, mark as weak evidence [A59].

### 3.7 Motion with restraint

**Safe to say.**
- MDN: the `prefers-reduced-motion` media feature detects whether the user has asked the system to minimise non-essential motion. Values are `no-preference` and `reduce`. Scaling and panning of large objects are common triggers for vestibular problems. It is Baseline widely available, working across browsers since January 2020 [A43].
- WCAG 2.3.3 Animation from Interactions (AAA): motion animation triggered by interaction can be disabled unless essential. Decorative movement during scrolling can cause dizziness and headaches [A6].
- WCAG 2.2.2 Pause, Stop, Hide (A): moving, blinking or scrolling content that starts automatically, lasts over five seconds and is presented in parallel with other content needs a way to pause, stop or hide it. Auto-updating content has the same rule without the five-second exemption [A18].
- Material 3 easing and duration defaults range from 200 ms to 500 ms; enter transitions are longer than exit transitions; transitions over small areas are shorter. Material notes this easing and duration system is no longer maintained and has been succeeded by a spring-based motion physics system [A42].
- NN/g notes animated skeleton shimmer can distract or harm some users [A24].

**People often get wrong.** "Reduced motion means no animation." MDN's example replaces a scaling pulse with a gentler fade, so it reduces vestibular triggers [A43]. Also "2.3.3 is required." It is AAA [A6].

**Phrase it this way.** "Use motion to show change, not to decorate. Honour the reduce-motion setting." Cite [A43, A18, A6].

### 3.8 Onboarding and first-run "aha"

**Safe to say.**
- NN/g (Page Laubheimer, 2023): tutorials "frequently don't perform well with real users" in NN/g's studies. They are skipped, interrupt tasks and are forgotten. They can help with a novel interaction paradigm. NN/g recommends "pull revelations", help triggered when the user needs it, such as tooltips or coach marks, with progressive disclosure and easy dismissal. The article reports no sample sizes [A62].
- NN/g on empty states recommends learning cues and direct pathways over forced tutorials [A22].
- The "aha moment" claim "7 friends in 10 days" for Facebook is attributed to Chamath Palihapitiya. Benn Stancil (Mode, 2015) wrote that such figures should not be viewed as scientific tipping points and are often round numbers picked in a range [A73]. No primary source for the original claim was found [UNVERIFIED as a fact about Facebook].

**People often get wrong.** The magic-moment number is not a law. It is a team's chosen goal. The research evidence for first-run flows is thin and NN/g's own is heuristic with studies unreported [A62].

**Phrase it this way.** "Show the person the valuable thing as soon as you can. Teach inside the screen, not before it." This is the course's synthesis of [A22, A62]. Call "aha" a goal a team picks, not a finding [A73].

### 3.9 Core Web Vitals and page weight

**Safe to say.**
- Core Web Vitals "good" thresholds, measured at the 75th percentile of page loads and segmented across mobile and desktop: LCP within 2.5 s, INP at 200 ms or less, CLS at 0.1 or less (web.dev, published May 2020, updated October 2024) [A44].
- LCP measures render time of the largest image, text block or video visible in the viewport, and the page gives 4.0 s as the poor boundary in a figure's alt text [A45]. INP: good at 200 ms or less, poor above 500 ms; it observes latency of clicks, taps and key presses through a visit [A46]. CLS: good 0.1 or less, poor above 0.25; it captures the largest burst of unexpected layout shifts [A47].
- HTTP Archive Web Almanac 2024: median page weight in October 2024 was 2,311 KB on mobile and 2,652 KB on desktop. Median mobile home page image weight was 900 KB and JavaScript 558 KB. Mobile weight grew 6.4% year on year [A48]. The chapter defines page weight as the byte size of a page and does not state whether the figures are transfer or decoded sizes [A48].

**People often get wrong.** The Web Vitals are field metrics at the 75th percentile, not a single lab score [A44]. Also "page weight" in the Almanac is the median of the crawled web, not a target.

**Phrase it this way.** "Fast on a weak connection is a design choice. Give your page a weight budget and check it." The budget is the course's own. The median is context [A48]. Do not say a specific weight is "safe for Gaza" (no source) [UNVERIFIED]. For the connectivity context, use the PCBS data already in the course 13 dossier (source S113 there).

### 3.10 Right-to-left and Arabic-first interfaces

**Safe to say.**
- W3C i18n: add `dir="rtl"` to the `html` element for a right-to-left document, and use `lang` separately. Direction belongs in markup, not CSS. Use `dir="auto"` on forms and inserted user text, noting it is not always correct [A78].
- MDN: CSS logical properties such as `margin-inline-start` map to the flow of text, so one rule works for both directions without a separate RTL stylesheet [A79].

**People often get wrong.** Mirroring everything. This dossier did not open a source on which icons should or should not mirror, so say nothing about it [UNVERIFIED].

**Phrase it this way.** "Write direction in HTML. Use start and end instead of left and right in CSS." Sourced [A78, A79].

## 4. Taste

### 4.1 How judgment is built

**Safe to say.**
- A design critique analyses a design against its objectives. It is not a judgment of the designer. Roles are presenter, critiquer and facilitator. A facilitator reframes opinions ("this is too red") into questions about objectives and user goals. Agree the scope and objectives first [A31].
- A heuristic evaluation is a structured critique against a named list, by several people working alone first [A66].
- Design-education authors describe the spoken studio critique as a firmly established practice that builds knowledge through concept clarification and critical discernment. The same paper reports that students and teachers say spoken feedback is often a weak component. It is a pilot paper with an unclear date, so confidence is low [A81].
- Ira Glass, in a talk animated in 2014, said beginners often have good taste but their early work falls short of it, that many quit in that gap, and that the way through is a large volume of work with deadlines that force finishing. Paraphrase only [A72].
- Aesthetic-usability effect: people see attractive products as more usable, which can mask problems in testing. Kurosu and Kashimura (1995) tested 26 ATM interface variants with 252 participants, and aesthetic ratings correlated with perceived ease of use more than with actual ease of use [A58].

**People often get wrong.** Taste is not a private feeling that can't be taught. The sourced version is practice plus critique tied to objectives [A31, A72]. The claim that "deliberate practice" is the mechanism is common but was not sourced here [UNVERIFIED]. Also, a pretty design can fool both users and testers [A58].

**Phrase it this way.** "Say what the design is trying to do. Then say whether it does it, and show where you see it." The structure is sourced [A31]. For Glass: "Your taste is ahead of your skill. That is normal. Make a lot of small things and finish them." (Paraphrase of [A72].)

### 4.2 Why defaults look generic

**Safe to say.**
- Tailwind v4 says its default theme variables "include the default color palette, type scale, shadows, fonts, and more", and are "just a starting point". The default theme has 26 colour families plus black and white; the default spacing unit is 0.25rem; `text-base` is 1rem with 1.5 line height [A49, A50].
- Bootstrap Reboot sets a system font stack, 1rem body size, white background, border-box sizing, and unstyled `:focus` for links by default [A52]. Bootstrap's docs present Sass variables, CSS variables and colour modes for customising [A51].
- Tailwind's docs show how to extend, override or remove the default theme [A49].

**People often get wrong.** The claim that defaults "look generic" is the course's observation, not a sourced finding. The sources show only what the defaults are and that both frameworks tell you they are customisable. The specific "indigo button" or "purple gradient" origin stories were not opened [UNVERIFIED]. Also do not blame the frameworks. They are designed as starting points [A49].

**Phrase it this way.** "Frameworks give you good defaults for everyone. That is why unchanged defaults look like everyone else. Change something on purpose, and know why." The first two sentences are sourced [A49]. The last is the course's pedagogy.

### 4.3 A scale for judging (the course's own method)

No source defines "average, good, best, remarkable". Present it as the course's own scale. Build each level from checks that are sourced.

| Level | Criteria that can be checked | Source for each check |
|---|---|---|
| Average | Works on the happy path. Defaults mostly unchanged. | Course observation, [A49] for defaults |
| Good | Passes the standards: contrast 4.5:1 and 3:1, labels visible, keyboard and focus, target sizes, states for empty, loading and error. | [A1, A2, A8, A5, A4, A22, A21, A23] |
| Best | Clear hierarchy by squint test, relevant content only, consistent spacing, errors recoverable, tested with 3 to 5 people with fixes made. | [A69, A67, A90, A23, A20] |
| Remarkable | A point of view that fits the job, with a reason. Everything above plus a choice a reader can name. | Not sourced. Mark as judgment, defend with reasons |

**People often get wrong.** Using the top level as a grade. Opinion goes to open questions; graded items should test the lower three levels by criteria and evidence (brief, production bar).

### 4.4 Studying real products

**Safe to say.**
- A side-by-side critique can be structured with the same objectives, the same task and a named heuristic list [A31, A66].
- GOV.UK is a public source with reasoning that anyone can open and read: the Design System's text input page states labels, hints, placeholder and error rules with reasons [A74], and the government design principles page lists eleven principles and was last updated 2 April 2025 [A75]. Chapters may cite these as examples with the date checked (2026-10-25).
- No other named product was opened for this dossier. A writer who names any other product must open its public page, describe only what is visible, and date it (brief constraint).

**People often get wrong.** A teardown that guesses why a company made a choice. Only what is visible or documented is safe. Reasons stated by the maker (as in the GOV.UK pages) are better than reasons the learner invents [A74].

**Phrase it this way.** "Write what you see. Write the rule it follows or breaks. Write what the maker says, if they say anything." Course template, built on [A31].

## Failure modes (production and learner)

1. **Low-contrast defaults.** Placeholder grey and light secondary text fail 4.5:1. #777777 on white is 4.48:1 [A87, A1, A74].
2. **Placeholder-only labels.** Disappear on typing; not reliably read; poor contrast [A25, A74].
3. **Spinners with no message, and blank empty states.** No status; the user cannot tell loading from failed from empty [A21, A22].
4. **Colour-only or vague errors.** Violates the intent of 3.3.1 and 1.4.1 and NN/g's error guidance [A3, A7, A23].
5. **Tiny, crowded tap targets.** Below 24 px without spacing fails 2.5.8; below 44 to 48 is hard to hit on a phone [A4, A38, A39].
6. **Onboarding tours that are skipped.** Frequently do not perform well in NN/g's studies [A62].
7. **Invisible keyboard focus.** Fails 2.4.7 [A5]. Bootstrap's own Reboot gives links no special focus style [A52].
8. **Motion with no reduce-motion path.** Vestibular triggers; set `prefers-reduced-motion` [A43, A6, A18].
9. **Heavy pages and layout shift on weak data.** Poor LCP and CLS; the median page is already 2.3 MB on mobile [A44, A47, A48].
10. **Hard-coded left and right in an Arabic-first product.** Breaks in RTL [A78, A79].
11. **Metrics that only count.** Raw counts rise with users; use ratios and per-user figures [A30].
12. **Estimating instead of setting an appetite.** Scope grows to fill the time [A27].

## What not to teach (myths and weak claims)

| Claim | Verdict | Why | Source |
|---|---|---|---|
| "Users don't scroll" | Wrong as stated; attention still concentrates high | NN/g 2018, 120 participants: 57% of viewing time above the fold, 74% in the first two screenfuls; people scroll if they have a reason | [A53] |
| "The 3-click rule" | Not supported | Porter 2003, 44 users, 620 tasks: success did not correlate with click count; hardly anyone gave up at three clicks | [A54] |
| "7 plus or minus 2 limits menu length" | Misapplied | Miller 1956 is about immediate memory span and chunks, not user interface or menus. NN/g says large menus can work, on qualitative evidence | [A55, A83] |
| "The golden ratio makes designs beautiful" | Unsupported as a rule | Livio 2002: Fechner's 1860s result was challenged (Godkewitsch 1974), later work was mixed (McManus 1980); he says it should not be a universal standard of beauty | [A56] |
| "Blue means trust" | Context dependent, nascent evidence | Elliot 2015: effects depend on context; field is nascent; applied recommendations are premature. Some brand studies link blue to trust | [A57] |
| "Five users find all problems" | Misread | About 85% of problems in a round for one comparable group; iterate; distinct groups need more | [A20] |
| "Use the thumb zone map" | Weak | The author said the reach diagrams are unreliable | [A59] |
| "Dark mode is better for your eyes" | Not supported as general claim | NN/g: light mode better for normal vision most of the time | [A65] |
| "Copy the F-pattern" | Wrong | NN/g: F-pattern is what people fall into when a page lacks cues, and it is bad for users | [A68] |
| "Skeleton screens make loading faster" | Perception only, argued not measured | NN/g says "illusion"; no tests in article | [A24] |
| "Add a product tour" | Weak default | Frequently does not perform well; use contextual help | [A62] |
| "Facebook's 7 friends in 10 days proves aha numbers" | Folklore | Described as a round number, not a scientific threshold; no primary source found | [A73] |
| "The five-second test proves a design works" | Overclaim | Measures first impression on simple screens; five seconds rests on anecdote | [A71] |
| "Minimalism means fewer pixels" | Misread | Heuristic 8 is about relevance to tasks | [A67] |
| "WCAG requires 44 px targets" | Wrong | 24 at AA; 44 at AAA | [A4, A16] |
| "An 8-point grid is universal" | Wrong | Material's convention; Apple layout page does not state it | [A40, A89] |
| "Good looking means good UX" | Risky | Aesthetic-usability effect can mask problems | [A58] |
| "Users read nothing online" | No source opened | Do not use | UNVERIFIED |

## Do not say

- "WCAG requires placeholders to be avoided" (WCAG does not mention placeholders [A8]).
- "Large text means headings" [A1].
- "Apple requires 44 pt" (44 is the default, 28 is the minimum [A38]).
- "Studies show dark mode saves battery or eyes" [A65].
- "Research shows users abandon after three clicks" [A54].
- "Skeleton screens are proven to reduce wait" [A24].
- "HEART tells you the five numbers to track" (the paper says not every category fits [A30]).
- "Facebook proved 7 friends in 10 days" [A73].
- "Nielsen proved users cannot wait more than 10 seconds" (the limits are guidance cited from 1968 and 1991 work, in a 1993 book [A21]).
- "Material Design requires an 8dp grid" (it is Material 2's guidance for its own components [A40]).
- "Arabic text needs X pixels" (no source).
- Any statistic about Gaza internet use that is not in the course 13 dossier. Reuse that dossier's sourced figures only.

## Source table

All sources were opened on 2026-10-25. Type: Std = standard, Spec = official documentation, Res = published research, Pract = practitioner article or book, Heur = expert heuristic article, Exp = expert opinion, Calc = agent computation. Confidence: High = the page states it directly; Med = the page states it but the claim is a heuristic, practice or secondary summary; Low = thin, dated or partly unread.

| ID | Claim | Source | Type | Date checked | Confidence |
|---|---|---|---|---|---|
| A1 | SC 1.4.3 AA: 4.5:1, large-scale 3:1; large = 18 pt or 14 pt bold, about 24 and 18.5 px; exceptions incidental and logotypes | W3C, WCAG 2.2 Understanding 1.4.3 | Std | 2026-10-25 | High |
| A2 | SC 1.4.11 AA: 3:1 for UI components, states and graphics needed to understand; exceptions; text in graphics still 1.4.3 | W3C, Understanding 1.4.11 | Std | 2026-10-25 | High |
| A3 | SC 1.4.1 A: colour not the only means; use shape, icon or text | W3C, Understanding 1.4.1 | Std | 2026-10-25 | High |
| A4 | SC 2.5.8 AA: 24 by 24 CSS px, five exceptions | W3C, Understanding 2.5.8 | Std | 2026-10-25 | High |
| A5 | SC 2.4.7 AA: keyboard focus indicator visible | W3C, Understanding 2.4.7 | Std | 2026-10-25 | High |
| A6 | SC 2.3.3 AAA: interaction-triggered motion can be disabled unless essential | W3C, Understanding 2.3.3 | Std | 2026-10-25 | High |
| A7 | SC 3.3.1 A: error identified and described in text; colour alone insufficient | W3C, Understanding 3.3.1 | Std | 2026-10-25 | High |
| A8 | SC 3.3.2 A: labels or instructions provided; page does not mention placeholders | W3C, Understanding 3.3.2 | Std | 2026-10-25 | High |
| A9 | Four principles POUR with definitions | W3C, WCAG 2.2 Understanding intro | Std | 2026-10-25 | High |
| A10 | SC 1.1.1 A: text alternatives; decorative null alt (H67); non-empty alt on decoration is F39 | W3C, Understanding 1.1.1 | Std | 2026-10-25 | High |
| A11 | SC 2.1.1 A: keyboard operable | W3C, Understanding 2.1.1 | Std | 2026-10-25 | High |
| A12 | SC 3.3.8 AA: no cognitive function test in authentication without alternative or exception | W3C, Understanding 3.3.8 | Std | 2026-10-25 | Med (read as a short summary) |
| A13 | SC 1.4.8 AAA: 80 characters (40 CJK), 1.5 line spacing, not justified; values not required | W3C, Understanding 1.4.8 | Std | 2026-10-25 | High |
| A14 | SC 1.4.12 AA: tolerate line height 1.5, paragraph spacing 2, letter 0.12, word 0.16 times font size | W3C, Understanding 1.4.12 | Std | 2026-10-25 | High |
| A15 | SC 1.4.4 AA: resize text to 200% without loss | W3C, Understanding 1.4.4 | Std | 2026-10-25 | High |
| A16 | SC 2.5.5 AAA: 44 by 44 CSS px | W3C, Understanding 2.5.5 | Std | 2026-10-25 | High |
| A17 | WCAG 2.2 Recommendation (page: 12 December 2024); contrast formula (L1+0.05)/(L2+0.05); large scale; 2.2 does not supersede 2.0 or 2.1; new SC list; 4.1.1 removed | W3C, WCAG 2.2 TR (first 100,000 characters read) | Std | 2026-10-25 | High |
| A18 | SC 2.2.2 A: auto-start moving content over five seconds needs pause, stop, hide | W3C, Understanding 2.2.2 | Std | 2026-10-25 | High |
| A19 | Ten heuristics; broad rules of thumb; first published 1994, reviewed 2024 | NN/g, Nielsen, "10 Usability Heuristics" | Heur | 2026-10-25 | High |
| A20 | 5 users: model, L about 31%, about 85%, iterate, groups, at least 3 users | NN/g, Nielsen, 2000 | Heur | 2026-10-25 | High (model), Med (quant 20 users) |
| A21 | 0.1 s, 1 s, 10 s limits; feedback rules; cites Miller 1968, Card et al. 1991; 1993 book excerpt | NN/g, Nielsen, "Response Times" | Heur | 2026-10-25 | Med (original studies not opened) |
| A22 | Empty states: status, learning cues, pathways; heuristic evidence | NN/g, Kaplan, 2021 | Heur | 2026-10-25 | Med |
| A23 | Error message guidelines | NN/g, Neusesser and Sunwall, 2023 | Heur | 2026-10-25 | Med |
| A24 | Skeleton screens: when to use, evidence status, shimmer caution | NN/g, Tankala, 2023 | Heur | 2026-10-25 | Med |
| A25 | Placeholders harmful; keep labels visible | NN/g, Sherwin, 2014 (reviewed 2018) | Heur | 2026-10-25 | Med |
| A26 | Inline validation timing; evidence limits | Baymard, Scott, 2024 | Pract | 2026-10-25 | Med |
| A27 | Appetite, fixed time variable scope, batches, narrowing the problem | Singer, Shape Up ch. 3 (Basecamp, free online) | Pract | 2026-10-25 | Med (a method, not a study) |
| A28 | Teams focus on product not job; authors and date | Christensen, Hall, Dillon, Duncan, HBR Sept 2016 (page excerpt only) | Pract | 2026-10-25 | Med (excerpt) |
| A29 | Job as progress in circumstances; hire; milkshake; forces | Christensen Institute, Jobs to Be Done | Pract | 2026-10-25 | Med |
| A30 | HEART, Goals-Signals-Metrics, PULSE, tips, limits | Rodden, Hutchinson, Fu, CHI 2010 (PDF text read) | Res | 2026-10-25 | High |
| A31 | Critique analyses design against objectives; roles; reframe opinions | NN/g, Gibbons, 2016 | Heur | 2026-10-25 | Med |
| A32 | Web body 15 to 25 px | Butterick, Practical Typography, point size | Exp | 2026-10-25 | Med |
| A33 | Line length 45 to 90 characters | Butterick, line length | Exp | 2026-10-25 | Med |
| A34 | Line spacing 120% to 145% | Butterick, line spacing | Exp | 2026-10-25 | Med |
| A35 | Butterick's body text page: four decisions (font, size, spacing, length) | Butterick, body text | Exp | 2026-10-25 | Med |
| A36 | M3 line height 1.5 for body and label, 1.2 for large; avoid decorative body fonts | Material 3, Applying type | Spec | 2026-10-25 | High |
| A37 | iOS default text 17 pt, minimum 11 pt | Apple HIG, Typography (page data) | Spec | 2026-10-25 | High |
| A38 | iOS control 44 default and 28 minimum; contrast table; both appearances | Apple HIG, Accessibility (page data) | Spec | 2026-10-25 | High |
| A39 | 48 dp touch targets, 9 mm, 8 dp spacing, iOS 44 | Material 3, Accessibility designing: structure | Spec | 2026-10-25 | High |
| A40 | 8dp grid, 4dp for icons and type | Material 2, Understanding layout and spacing methods | Spec | 2026-10-25 | High |
| A41 | Material contrast page restates W3C 3:1 and 4.5:1; 3:1 container rule; FAB exempt | Material 3, Color contrast | Spec | 2026-10-25 | High |
| A42 | 200 to 500 ms pairs; enter longer than exit; system no longer maintained | Material 3, Easing and duration | Spec | 2026-10-25 | High |
| A43 | prefers-reduced-motion values, vestibular note, Baseline since January 2020 | MDN | Spec | 2026-10-25 | High |
| A44 | LCP 2.5 s, INP 200 ms, CLS 0.1 at 75th percentile; May 2020, updated October 2024 | web.dev, Web Vitals | Spec | 2026-10-25 | High |
| A45 | LCP definition; poor above 4.0 s in figure alt text | web.dev, LCP | Spec | 2026-10-25 | High (good), Med (poor) |
| A46 | INP good 200 ms or less, poor above 500 ms | web.dev, INP | Spec | 2026-10-25 | High |
| A47 | CLS good 0.1, poor above 0.25 | web.dev, CLS | Spec | 2026-10-25 | High |
| A48 | Median page weight October 2024: mobile 2,311 KB, desktop 2,652 KB; images and JS; growth | HTTP Archive, Web Almanac 2024, Page Weight | Res | 2026-10-25 | High (figures), Med (basis not stated) |
| A49 | Tailwind default theme, starting point, spacing 0.25rem, extend or override | Tailwind CSS docs, Theme | Spec | 2026-10-25 | High |
| A50 | Tailwind font sizes and line heights | Tailwind CSS docs, Font size | Spec | 2026-10-25 | High |
| A51 | Bootstrap customisation: Sass, CSS variables, colour modes | Bootstrap 5.3 docs, Customize overview | Spec | 2026-10-25 | Med (page does not say "starting point") |
| A52 | Reboot: 1rem body, 16px browser default, system font stack, links no special focus | Bootstrap 5.3 docs, Reboot | Spec | 2026-10-25 | High |
| A53 | 120 participants, 57% above the fold, 74% first two screenfuls | NN/g, Fessenden, 2018 | Res | 2026-10-25 | High |
| A54 | 44 users, 620 tasks, no correlation of success with clicks | Porter, UIE, 2003 | Res | 2026-10-25 | Med (small, old study; fits as a myth check) |
| A55 | Miller 1956: span about seven chunks; no UI mention | Miller, Psychological Review 63, via Classics in the History of Psychology | Res | 2026-10-25 | High |
| A56 | Golden ratio aesthetics evidence mixed | Livio, Plus Magazine, 2002 | Pract | 2026-10-25 | Med |
| A57 | Colour effects context dependent; field nascent; blue mentions | Elliot, Frontiers in Psychology, 2015 (first 100,000 characters read) | Res | 2026-10-25 | High |
| A58 | Aesthetic-usability effect; Kurosu and Kashimura 1995, 252 participants | NN/g, Moran, 2024 | Heur | 2026-10-25 | Med (study described secondhand) |
| A59 | 1,333 observations; grip percentages; later reach diagrams unreliable | Hoober, UXmatters, 2013 | Res | 2026-10-25 | Low (observational, self-revised) |
| A60 | Mobile First: three reasons, constraints force focus | Wroblewski, LukeW, 3 Nov 2009 | Pract | 2026-10-25 | Med |
| A61 | Mobile-first not mobile-only; parity of content | NN/g, Budiu and Pernice, 2016 | Heur | 2026-10-25 | Med |
| A62 | Tutorials frequently do not perform well; pull revelations | NN/g, Laubheimer, 2023 | Heur | 2026-10-25 | Med |
| A63 | Forms top 10: single column, labels above on mobile, cut fields; cites CHI 78% vs 42% | NN/g, Whitenton, 2016 | Heur | 2026-10-25 | Med (CHI paper not opened) |
| A64 | Labels above, proximity, grouping | NN/g, McCloskey, 2013 | Heur | 2026-10-25 | Med |
| A65 | Dark mode review; light mode better for normal vision; allow switch | NN/g, Budiu, 2020 | Heur | 2026-10-25 | Med |
| A66 | Heuristic evaluation steps; 3 to 5 evaluators | NN/g, Moran and Gordon, 2023 | Heur | 2026-10-25 | Med |
| A67 | Heuristic 8: relevance, not a visual trend | NN/g, Fessenden, 2021 | Heur | 2026-10-25 | Med |
| A68 | F-pattern is bad; front-load; headings | NN/g, F-shaped pattern article | Heur | 2026-10-25 | Med |
| A69 | Visual hierarchy: scale, contrast, grouping; squint test; three sizes | NN/g, Gordon, 2021 | Heur | 2026-10-25 | Med |
| A70 | Hallway test: next passerby, five people | Spolsky, Joel on Software, "The Joel Test", 2000 | Pract | 2026-10-25 | Low |
| A71 | Five-second test; Perfetti; anecdotal basis; ten seconds for complex pages | Kuric, Smashing Magazine, 2023 | Pract | 2026-10-25 | Med (Perfetti 2007 not opened) |
| A72 | Taste gap, volume with deadlines (paraphrase) | Ira Glass, animated by Daniel Sax, The Marginalian, 2014 | Pract | 2026-10-25 | Low (not a transcript) |
| A73 | "7 friends in 10 days" attribution; round numbers, not thresholds | Stancil, Mode blog, 30 Jan 2015 | Pract | 2026-10-25 | Low |
| A74 | Labels, hints, no placeholder, error templates | GOV.UK Design System, Text input | Spec | 2026-10-25 | High |
| A75 | Eleven government design principles; updated 2 April 2025 | GOV.UK, Government design principles | Spec | 2026-10-25 | High |
| A76 | Scope hammering; compare to baseline; tilde nice-to-haves | Singer, Shape Up ch. 14 | Pract | 2026-10-25 | Med |
| A77 | Shaped work: rough, solved, bounded; wireframes vs words | Singer, Shape Up ch. 2 | Pract | 2026-10-25 | Med |
| A78 | dir=rtl on html, lang separate, dir=auto, direction in markup | W3C Internationalization, structural markup and RTL | Spec | 2026-10-25 | High |
| A79 | CSS logical properties and RTL | MDN, CSS logical properties | Spec | 2026-10-25 | High |
| A80 | Usability testing: facilitator, tasks, five participants | NN/g, Moran, 2019 (reviewed 2026) | Heur | 2026-10-25 | Med |
| A81 | Critique as established design-education practice; pilot findings | McCormack and Taylor, University of Canberra conference paper, date unclear | Res | 2026-10-25 | Low |
| A82 | The Mom Test exists, is by Rob Fitzpatrick, and is paid; its rules were not on the page | momtestbook.com | Pract | 2026-10-25 | Low |
| A83 | Mega menus can work for large sites; qualitative | NN/g, Nielsen and Li, 2017 | Heur | 2026-10-25 | Med |
| A87 | Contrast arithmetic with the WCAG formula | Agent computation (Python, standard sRGB relative luminance), reproducible | Calc | 2026-10-25 | High (arithmetic) |
| A89 | Apple layout guides restrict text width; no 8-point rule on the page | Apple HIG, Layout (page text) | Spec | 2026-10-25 | Med |
| A90 | M3 spacing: group, direct attention, expression, consistency | Material 3, Grids and spacing, Spacing | Spec | 2026-10-25 | High |

Source IDs A84 to A86 and A88 were not used.

## UNVERIFIED claims and how to phrase them

| Claim | Why unverified | Allowed phrasing |
|---|---|---|
| Arabic body size, line length, line height numbers | No opened source; sources cover Latin and CJK | "Test with a native reader on a phone." Do not give numbers |
| Whether to mirror icons in RTL | Not researched | Say nothing; or "ask a native reader" |
| "Indigo or purple default" origin of the AI-looking style | Not opened (Part B) | Do not state origin |
| Facebook "7 friends in 10 days" as research | Only secondhand essay found | "A team chose a goal like this" with [A73] |
| HEART needs all five categories | Paper says the opposite | Use only the categories that fit [A30] |
| NN/g "20 users for quantitative studies" | Only seen in a summary of follow-up links | Do not teach the number |
| CHI 78% vs 42% form figures | Cited by NN/g, paper not opened | Not as a number; say "NN/g cites a study" if needed |
| Skeleton screens reduce perceived wait in tests | Argued by NN/g; study listed only in references, not opened | "NN/g argues they reduce perceived waiting" |
| Dark mode saves battery | NN/g says "might" | Do not teach as fact |
| Deliberate practice builds taste | Ericsson not opened | Say "practice with critique" and cite [A31, A72] |
| Mom Test rules (ask about the past, not opinions) | Book is paid; site does not list the rules | Teach "ask what they did last time" as the course's own habit |
| Percentage of users with disabilities | No source opened | Do not state |
| Perfetti 2007 original five-second test | Only seen via Kuric [A71] | Cite [A71] |
| Nielsen's 0.1 s, 1 s, 10 s from Miller 1968 and Card 1991 | Original works not opened | Cite [A21] and say "Nielsen's guidance" |
| Users read nothing online | No source | Do not use |
| Any thumb reach percentages as design guidance | Author said ignore the diagrams | Mention only as weak evidence [A59] |
| Public product examples other than GOV.UK | Not opened | Open and date before naming |
| Apple 8-point grid | Not stated on the layout page opened | Do not say |
| Material 3 type scale default sizes | Material pages are rendered by script and the table did not load | Use Tailwind [A50], Apple [A37], or re-check |

## Open questions for the sponsor

1. Should WCAG 2.2 AA be the course's accessibility bar, with the AAA items as "go further" notes?
2. Who gives a native-reader review of Arabic typography advice, so chapters can teach sizes and line lengths with a source?
3. May chapters name public products beyond GOV.UK? Each needs a dated open-and-describe check at writing time.
4. May learner text carry evidence labels (standard, research, heuristic, practice) on each rule?
5. Which phone-friendly contrast checker may be named? That is a tool fact for a dated check.
6. How should fellows run 3 to 5 person hallway checks safely (consent, whose phone, what is visible)?
7. Should HEART appear at all, or only the Goals, Signals, Metrics habit scaled down to one goal and one observed signal?
8. Is the four-level scale (average, good, best, remarkable) to be graded, or only used in the critique log? This dossier suggests grading the lower three by criteria and keeping "remarkable" as reasoned judgment.
