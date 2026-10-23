---
artifact: research-dossier
course: build-with-ai
version: 1
status: draft
owner: research
sources_checked: 2026-10-24
hard_constraints:
  - Tools change monthly; NotebookLM was renamed Gemini Notebook on 2026-07-16 and its limits changed again on 2026-09-02, so chapters teach jobs and habits, never features or limits
  - Access from Palestine is uneven; several web versions list Palestine, but the Gemini Notebook mobile app and the Gemini Android app download list do not
  - Phones, weak and expensive data, power cuts; offline listening, offline notes and owning your files matter more than any single feature
  - Second-language readers; Arabic output exists in most chat tools, but some features (longer Audio Overviews, interactive audio, some Gemini study features) are English only
  - Ages and accounts differ by tool (Claude 18+, LinkedIn 16+, most others 13+ with extra rules under 18), and free chats are used for training by default in most consumer tools
out_of_scope:
  - How AI works inside, building AI products, prompt engineering as a subject (courses 8 and 9)
  - Docker, databases, caching or system design beyond the one URL shortener lab example
  - Tool rankings, prices, plan comparisons and feature tours
  - Note-taking method systems taught in full (Zettelkasten, PARA, Cornell) and spaced repetition software set-up
  - Audience growth, marketing, video production
  - Open-source licence law beyond MIT, Apache 2.0, GPL and "no licence"
  - Learning styles, brain-percentage myths, retention pyramids
open_questions:
  - Name the tool "Gemini Notebook (formerly NotebookLM)" in chapters, or name only the job?
  - Keep the sponsor's "40 to 60 minute audio" example, given no source supports that length and the longest option is English only?
  - Is any fellow under 18? If so, Claude and some Gemini Notebook features are out, and other tools have extra rules
  - Which tools has the fellowship already tested from inside Gaza, on a phone, in 2026?
  - Is the "about six months" rule the sponsor's planning rule, stated as such?
  - May chapters name real platforms for sharing (LinkedIn, dev.to, Hashnode, Medium)?
  - Is the capstone write-up public by default, or may a fellow keep it private and show the mentor?
---

# Research dossier: build-with-ai

This is a decision aid for the curriculum architect and the chapter writers of course 13, "Learn and Build with AI: An Enabler, Not a Replacement". Each finding says what is safe to say in plain words, what people often get wrong, and how chapters should phrase it. Claims carry a source ID in square brackets, for example [S3]. The source table near the end gives the source, its type, the date checked and a confidence level. Every source was checked on 2026-10-24 unless the table says otherwise. Claims marked **UNVERIFIED** must not appear in learner-facing text as fact; the unverified table says how to phrase them instead.

Two findings change the brief and should be read first:

1. **NotebookLM no longer exists under that name.** Google renamed it **Gemini Notebook** on 16 July 2026 [S1], and on 2 September 2026 replaced fixed daily feature limits with compute-based limits that refresh every five hours [S6]. A course written for "NotebookLM audio overviews" would be out of date on publish day. This is the strongest case for the brief's rule "tools are named, features are not promised".
2. **The mobile apps are the weak point for Gaza, not the web versions.** Palestine is listed by name for the Gemini Notebook web version [S2], the Gemini web app [S12], ChatGPT [S18] and Claude [S25]. It is **not** in the country list for the Gemini Notebook mobile app on Android [S8], and **not** in the Play Store download list for the Gemini app [S17]. Offline download of Audio Overviews is a feature of the mobile app [S8]. Writers need a phone-browser fallback for every app step.

Company and product names appear in this dossier because the sponsor decided this course names tools (course brief, decision log). Real people's names appear here only so reviewers can check sources.

## Learner and context

**Who.** Gaza fellowship fellows building careers in tech, many aiming at remote work, from mixed backgrounds. Arabic first, English second. (Course brief.)

**What they already know.** Plain English reading and everyday phone and computer use. Course 9 module 7 ("Thinking with AI: ask well, check always") comes before this course and is referred to, not retaught. Modules 1 to 3 need no coding; modules 4 and 5 assume a little terminal use and offer a provided case for fellows who cannot run tools yet. (Course brief.)

**Device and connection.** Mostly phones, weak or expensive data, power cuts; some have a laptop part of the time. (Course brief.) The Palestinian Central Bureau of Statistics (PCBS) reports, from a survey in September and October 2025, that about 71% of people aged 10 and over in the Gaza Strip had accessed the internet at least once, but only 11% had continuous access (60% intermittent), and 29% had no internet at all [S113]. Smartphone ownership among people aged 10 and over fell from about 58% before October 2023 to about 35% in 2025 [S113]. Of internet users, 98% reported poor coverage and 97% persistent network disruptions [S113]. Mobile network coverage in the middle of Gaza was about 96% in April 2026, but varied by governorate [S113]. OCHA describes a near-total absence of reliable electricity in Gaza in September 2026, with communities depending on backup generators [S114], and connectivity as severely constrained in May 2026 [S115].

**What this means for the course.** A fellow may own a phone part of the time, share it, or borrow one. The course cannot assume a recent phone, a personal laptop, continuous data, or the ability to install an app from the store. Every step that needs an app needs a browser fallback, every download needs a "check the size first" habit, and every piece of work must live in a file the fellow owns, so a dead session or a lost account does not lose it.

**Time.** About 20 hours: about 16 hours of chapters (1 hour a day over 3 to 4 weeks) and about 5 hours of short daily labs over two weeks for the capstone. (Course brief.)

**Motivation and use.** A portfolio project that gets them hired; stop feeling that AI makes them useless; learn faster on a phone between power cuts. The capstone produces a six-month plan, a public GitHub lab log and a weekly write-up habit. (Course brief.)

**Ages.** The brief does not state fellows' ages. Claude requires users to be 18 or older [S26]. ChatGPT requires 13 or older and a parent's or guardian's permission under 18 [S22]. Gemini requires 13 or older (or the applicable age in the country) [S13]. Gemini Notebook is for users above the age of consent, with some features limited to over-18 users [S2, S4]. LinkedIn requires 16 or older [S61]. GitHub requires 13 or older [S42]. If any fellow is under 18, the tool list must change (open question).

## Domain model

### Actors

- **The fellow:** learner and builder. Makes the decisions, does the checking, owns the work and the credit.
- **The AI tool:** a chat assistant, a source-grounded notebook, a search tool with citations, a coding assistant. Fast at explaining, drafting, summarising, planning and drawing; does not know the fellow's context, private data, local or recent facts, or what is obvious to the people involved (brief, outcome 1); can be confidently wrong [S22, S91, S98].
- **The sources:** books, articles, documentation, videos, open-source code. The ground truth the AI output is checked against.
- **The tool provider:** sets the free limits, the data rules, the age rules and the countries. Changes all four without notice [S1, S6].
- **The mentor and the public reader:** review the lab log, the plan and the write-up; ask the fellow to explain without notes.

### The four loops (the spine of the course)

1. **Learn loop (module 3).** Choose one topic. Gather sources. Get an overview (audio or text). Read the sources. Explain it back in your own words. Get quizzed, close the book and recall. Draw it. Review it again days later. Keep notes in your own words.
2. **Lab loop (module 4).** Plan a small lab with an AI chat. Build it. Watch it run. Predict what happens if one part breaks. Break one part on purpose. Observe. Explain. Log it on GitHub.
3. **Project loop (module 5).** Six-month plan, one new area per week. Ask AI for resources, then check each one exists. Study open-source projects and reuse within their licences. Slow down at trade-offs. Explain every part without notes.
4. **Share loop (module 6).** Turn the week's commits and notes into one honest write-up, say what AI helped with, adapt it for more than one platform.

### Vocabulary for chapters (plain English definitions writers may use)

| Term | Plain English for chapters | Notes |
|---|---|---|
| AI chat assistant | A tool you type or talk to that answers in sentences, for example ChatGPT, Gemini, Claude or Copilot at the time of writing. | Name tools as examples only. |
| Source-grounded notebook | A tool that answers only from the files and links you give it, and shows where each answer came from. | Gemini Notebook at the time of writing [S4]. Grounding lowers errors but does not remove them [S3, S99]. |
| Audio overview | A spoken summary of your sources, made by AI, that you can listen to. | Google's name for its feature [S3]. |
| Hallucination | When an AI states something false as if it were true, such as a book or a study that does not exist. | Fabricated citations are well documented [S91]. |
| Sycophancy | When an AI agrees with you or praises your idea because you seem to want that, not because it is right. | [S93, S94] |
| Retrieval practice | Trying to recall something from memory, for example answering a quiz with the book closed. | Highest-rated study method [S63]. |
| Spaced review | Coming back to the same topic after a gap of days, not cramming it in one sitting. | [S63, S67, S68] |
| Interleaving | Mixing different kinds of problems in one practice session instead of doing one kind in a block. | [S69, S70] |
| Self-explanation | Explaining to yourself why each step works, in your own words. | [S71] |
| Fluency illusion | The feeling that you understand because something was clear and easy to read or hear, when you cannot yet recall or use it. | [S73, S74, S70] |
| Lab | A small, time-boxed build that you run, break on purpose and explain. | Course's own term. |
| Container | A packaged program with everything it needs to run, started and stopped with Docker. | Keep to one line; not a Docker course. |
| Stop (a container) | Ask the program to shut down, and force it after a short wait if it does not. | [S54] |
| Repository (repo) | A project folder on GitHub with its full history of changes. | |
| Commit | One saved change in a repository, with a short message saying what changed. | |
| Licence | The terms that say what others may do with a piece of code. No licence means no permission to reuse. | [S100, S102] |
| Secret | A password, API key or token that gives access to a system. Never put one in a repo or a chat. | [S39, S109] |
| Disclosure line | One honest sentence saying which AI tool helped with which part of the work, and that you checked it. | [S106, S107, S58] |
| Explain-back rule | You may keep a part of your project only if you can explain it without notes. | Course's own rule. |

## Hard constraints

1. **Tools change faster than the course.** In four months Google renamed NotebookLM to Gemini Notebook [S1], changed its limits from daily counts to a five-hour refresh [S6], and moved its help centre to a new address (support.google.com/gemininotebook, checked 2026-10-24). Gemini Apps use compute-based limits that refresh every five hours up to a weekly limit [S14]. ChatGPT's free model changes over time by OpenAI's own statement [S20]. Play with Docker, a common browser option for Docker labs, shut down on 1 March 2026 [S57]. Architecture consequence: every chapter teaches a job and a habit; a tool name appears only as "for example, at the time of writing (checked 2026-10-24)"; no chapter states a number of sources, minutes, hours or messages as a fact the learner can rely on.

2. **Access from Palestine is uneven, and the app store is the weak point.** See the availability table in A11. Web versions of Gemini Notebook, Gemini, ChatGPT and Claude list Palestine by name [S2, S12, S18, S25]. The Gemini Notebook mobile app [S8] and the Gemini Android app download list [S17] do not. Microsoft Copilot gives no country list that names Palestine [S31]. Architecture consequence: every app step has a browser step; no gate or quiz depends on a specific tool being reachable; the course always offers a "no tool" path (a provided transcript, a provided case).

3. **Phones, data cost and power cuts.** Only 11% of people in Gaza reported continuous internet access in late 2025 [S113]. Architecture consequence: audio is optional and the course says how to check a file's size before downloading, rather than stating a size; notes live in an offline-first app or plain files; labs have a provided log for fellows with no laptop; GitHub work can be done in short sessions.

4. **Second language, and English-only features.** Arabic is supported for Gemini Notebook output (Modern Standard and Colloquial Egyptian) [S10], Gemini [S12], ChatGPT [S24], Microsoft Copilot [S31], and Claude (Arabic scored about 97% of English on a translated benchmark for one model) [S30]. But the "Longer" Audio Overview option and interactive audio are English only [S3], and some Gemini learning resources are English and United States only [S16]. Architecture consequence: chapters must not promise an Arabic version of a feature; they teach "set the output language, and check what you get".

5. **Privacy defaults favour training.** On consumer accounts, ChatGPT shares data for model improvement by default [S21], Gemini uses activity for training when Keep Activity is on and has a subset of chats reviewed by humans [S15], Perplexity's AI data retention is on by default [S34], Claude uses chats for training only if the Model Improvement setting allows it [S27], GitHub Copilot Free uses interaction data for training unless you opt out [S44], and LinkedIn has a generative AI data setting [S62]. Architecture consequence: module 2 teaches one habit ("assume a person may read it, and paste nothing you would not post") plus "find the training setting in any tool you use", not a settings tour that will date.

## Findings by topic

### A. Tools

All facts in this section were checked on 2026-10-24. Every "Phrase it this way" note is written so it survives a rename or a limit change.

#### A1. Gemini Notebook (formerly NotebookLM)

**Name and status**
- Google renamed NotebookLM to Gemini Notebook on 16 July 2026. It remains a standalone product; old links redirect [S1]. Notebooks are also reachable inside the Gemini app (secondary reports, not used as fact).

**Sources**
- Source types: PDF, Word (docx), text, Markdown, CSV, PowerPoint, ePub, Google Docs, Slides (up to 100 slides) and Sheets, images, audio files (transcribed on import), pasted text, web URLs, public YouTube videos with captions, and Gemini chats [S4].
- Each source can hold up to 500,000 words or 200 MB for uploaded files; free users can add up to 50 sources per notebook [S4]. The usage table lists 100 notebooks and 50 sources per notebook for the standard (free) plan, more on paid plans, and is marked "subject to change" [S5].
- Paywalled web pages are not supported; YouTube videos need captions; a video deleted or made private is removed as a source within 30 days [S4].

**Audio Overviews**
- Formats: Deep Dive (default, two hosts), The Brief (one speaker, under two minutes), The Critique and The Debate [S3].
- Length: Shorter, Default or Longer; **Longer is English only** [S3]. Google gives no minute figure for any length. **No source supports the sponsor's "40 to 60 minutes".** (See unverified U1.)
- You can enter a prompt to focus on topics or set the expertise level [S3].
- Languages: 80+; the default is the preferred language of the Google account [S3]. Arabic (Modern Standard) and Arabic (Colloquial Egyptian) are output languages [S10]. **Interactive mode (asking the hosts questions by voice) is English only** [S3].
- Download: there is a Download option on the web, which can be blocked for notebooks with Play Books ebook sources [S3]. In the mobile app, Audio Overviews can be downloaded for offline playback but not exported as files [S8]. The App Store listing advertises background playback and offline support [S9].
- Accuracy: Google states that Audio Overviews "may contain inaccuracies or audio glitches" [S3].

**Other study features**
- Google lists flashcards, quizzes, study guides, mind maps, Video Overviews (narrated explainers using images and quotes from your documents), infographics and slide decks [S11]. Audio and Video Overviews are offered in over 80 languages [S11].
- Limits: since 2 September 2026, consumer limits are compute-based and refresh every five hours; heavy outputs such as Video Overviews can be deferred until the limit resets; Google says users keep access to all features they use [S6]. No per-feature free quota is published on the pages checked [S5, S6].

**Data and privacy (personal Google accounts)**
- Content "will not be used to directly train" Google's foundational models "unless you choose to provide feedback" [S7]. Feedback (thumbs up or down) collects the associated content, is reviewed by trained teams after being disconnected from the account, and is kept up to 3 years [S7].
- Workspace and Workspace for Education accounts: uploads, queries and responses are not human-reviewed and not used to train models [S7]. A fellowship-managed education account would therefore give stronger protection (open question).

**Age, availability, Arabic, offline**
- Age: above the age of consent; age must be verified in the Google account; stricter content rules under 18; some features over 18 only [S2]. Deep Research inside Gemini Notebook is over-18 only [S4].
- Web availability: **Palestine is listed, as "Palestine"** [S2].
- Mobile app: Android 10 and up; **Palestine is not in the Android or the iPhone and iPad country lists**; the app is "rolling out gradually" [S8]. The mobile app supports fewer source types and lacks notes, mind maps, reports and data tables [S8].
- App size on iPhone: 218 MB; age rating 13+ [S9]. (This is a large download on expensive data.)

**Phrase it this way**
- "A source-grounded notebook lets you upload your own sources and ask questions about them. At the time of writing (checked 2026-10-24), Google's Gemini Notebook, called NotebookLM until July 2026, is one example. It can turn your sources into a spoken overview you can listen to."
- "Audio overviews can be short or long. The longest option may only be in English. Check what your tool offers today."
- "The overview is a starting point, not the source. It can be wrong. After you listen, read the source."
- Never write a number of minutes, sources or overviews per day. Never write "download it in the app" without the browser path.
- **Fallback when the tool or the app is unavailable:** open the web version in the phone's browser; if that fails, use any chat assistant with the source pasted in and ask for a spoken-style summary to read aloud or to play with the phone's own text-to-speech; or skip audio and read the provided summary in the chapter.

#### A2. Gemini app (free)

- Availability (web): **Palestine is listed** in "Where you can use the Gemini web app"; Arabic is a supported language [S12].
- Availability (Android app): Palestine is **not** in the Play Store download list; it appears only in a separate list for switching to Gemini through Google Assistant [S17]. Status of the iPhone app in Palestine: not checked (U8).
- Age: 13 or older (or the applicable age in the country) [S13].
- Free features: without a Google AI plan, the help page shows Canvas, quizzes and flashcards, audio overviews, slide generation, Deep Research and image generation as available, and video generation as unavailable [S14] (read from icons; treat as medium confidence). Features that need more compute, like Deep Research, may be unavailable at busy times for free users [S14]. Limits are compute-based and refresh every five hours until a weekly limit [S14].
- Guided Learning: a tutor-style mode selected from the prompt box; responses may include images, diagrams and YouTube videos [S16]. Some learning resources in the same article are English-only, United States only and not for under-18 users; the page does not say whether that restriction covers Guided Learning itself [S16].
- Data: with Keep Activity on, Google uses activity to improve services including training models, and "a subset of chats are reviewed by human reviewers"; with it off, chats are kept 72 hours; reviewed chats are kept up to three years and are not deleted when you delete your activity; Google says "Please don't enter confidential information" [S15].

**Phrase it this way**
- "AI chat assistants can explain a topic step by step, quiz you and draw a simple picture. At the time of writing (checked 2026-10-24), Gemini has a Guided Learning mode for this. Check if it works in your language and your country."
- "In Gemini, the setting that controls whether your chats are kept and used to improve the tool is called Keep Activity at the time of writing."
- **Fallback:** use the web version in a browser; or any other chat assistant with a "teach me step by step and quiz me" instruction.

#### A3. ChatGPT (free)

- Availability: **Palestine is listed** on OpenAI's supported countries page, with a warning that using the service outside listed places may get an account blocked [S18].
- Age: at least 13; under 18 needs a parent's or legal guardian's permission [S22].
- Free tier (at the time of checking): access to a named default model, web search, file and image uploads, image creation, a 500 MB Library, unlimited everyday text chats subject to abuse safeguards; uploads, image generation and other tools have separate limits; "The default model and available limits can change over time"; ads may appear in some countries [S20].
- Study mode: "available across ChatGPT plans globally on web, iOS, and Android"; asks questions, guides thinking, checks understanding; "can make mistakes"; may sometimes give a direct answer; uses the same limits as normal chat [S19].
- Arabic: a supported interface language [S24].
- Data: on Free, Plus and Pro personal accounts, data sharing is enabled by default; turn off **Improve the model for everyone** under Settings, Data controls; Temporary Chats are not used to improve models and may be kept up to 30 days [S21]. Authorized personnel and service providers may access content for abuse investigation, support, legal matters, or "to improve model performance (unless you have opted out)" [S23].
- Terms: "Output may not always be accurate"; users "must evaluate Output for accuracy" before using or sharing it [S22].

**Phrase it this way**
- "At the time of writing (checked 2026-10-24), ChatGPT has a study mode that asks you questions instead of giving the answer. Its own help page says it can make mistakes."
- "Before you paste anything, find the setting that stops your chats being used to train the tool. In ChatGPT it was called 'Improve the model for everyone' at the time of writing."
- **Fallback:** any chat assistant, with the instruction "do not give me the answer; ask me one question at a time".

#### A4. Claude (free)

- Availability: **Palestine is listed** on Anthropic's supported countries page, which covers Claude.ai and the API; "Any country or region not listed is unsupported" [S25].
- **Age: 18 or older** to create and use an account [S26].
- Artifacts (documents, code, single-page sites, diagrams and flowcharts, dashboards, small interactive tools) are available on the Free plan [S29].
- Learning style: secondary reports say a "Learning" style is available to all users; the help page could not be opened (U5).
- Arabic: one recent model scored about 97% of its English score on a professionally translated benchmark [S30].
- Data: chats are used to improve Claude only if you allow it in the **Model Improvement** privacy setting; Incognito chats are never used; feedback keeps the conversation up to 5 years; safety-flagged chats may be used for safety systems [S27]. With Model Improvement on, data may be kept de-identified up to 5 years; deleted chats leave back-end storage within 30 days [S28].

**Phrase it this way**
- "At the time of writing (checked 2026-10-24), Claude can make a small diagram or page next to the chat, called an artifact. Claude is only for people aged 18 or over."
- **Fallback:** ask any chat assistant for a diagram as text (a list of boxes and arrows) and draw it by hand.

#### A5. Microsoft Copilot (free), briefly

- Availability: "available globally in over 170 markets", except some regions such as mainland China and "embargoed markets"; **Palestine is not named either way** [S31]. Arabic is supported for personal accounts and voice [S31].
- Age: 13 or older; for under-18 users, chats are not used to train AI models [S33].
- Data: settings "Training on conversation activity" and "Training on voice conversations" can be turned off; opting out does not cover other product improvements, ads, safety, security or compliance [S32]. Microsoft notes this page applies to the older app version [S32].
- A World Bank trial in Nigeria used Microsoft Copilot as the tutor (see C3) [S86].

**Phrase it this way:** "Microsoft Copilot is another free chat assistant at the time of writing. Check if it works where you are." **Fallback:** any other chat assistant.

#### A6. A search tool with citations (Perplexity), briefly

- For Free, Pro and Max users, the **AI data retention** setting is on by default; turn it off under Account, Preferences; it applies only to data after you opt out [S34].
- No official supported-countries page and no minimum age statement were found on the page checked (U9).

**Phrase it this way:** "Some AI search tools show the links they used. A link is not proof: open it and check that it says what the tool claims." This is backed by the EBU and BBC finding that 31% of AI assistant answers on news had serious sourcing problems [S98]. **Fallback:** an ordinary search engine plus reading the page.

#### A7. GitHub

- **Trade controls:** GitHub's page names Crimea, the separatist areas of Donetsk and Luhansk, Cuba, Iran and North Korea as sanctioned regions, and says services are not available to developers in North Korea. **Palestine, Gaza and the West Bank are not mentioned** [S35]. On this page, GitHub access from Gaza is not restricted. (Network blocks or payment blocks are a separate matter; see open questions.)
- Age: 13 or older [S42].
- Free plan: unlimited public repositories with the full feature set, unlimited private repositories with a limited feature set, 2,000 Actions minutes a month, 500 MB Packages storage, 120 Codespaces core hours and 15 GB of Codespaces storage a month, and GitHub Pages in public repositories [S36].
- **Codespaces** (a computer in the browser): the 120 hours are core hours; a 2-core machine uses them at 2 times the rate, so the free quota is about 60 hours a month on the smallest machine (arithmetic from the multiplier table) [S37]. Without a payment method, usage stops when the quota runs out, so a fellow cannot be charged by accident [S37]. The default dev container image includes Docker (the docker-in-docker feature) [S38].
- **Secret protection:** push protection for users is on by default and stops you pushing secrets to public repositories on GitHub [S39]; secret scanning runs automatically for free on public repositories, and partner secrets are reported to the provider [S40].
- **Student Developer Pack:** at least 13, enrolled in a degree- or diploma-granting programme, with documents proving current student status; a school email may be needed [S41]. The page does not say anything about location [S41]. Many fellows may not be enrolled (open question).
- **Copilot Free:** limited to 2,000 code completions a month plus an allowance of credits; Copilot Student is free for verified students [S43]. Since 24 April (2026), interaction data from individual Free, Pro and Pro+ users can be used for model training unless they opt out; students on Copilot Student are not affected [S44].
- **Public means forkable:** making a repository public lets other users view and fork it under GitHub's terms [S42].

**Phrase it this way**
- "GitHub is where you keep your lab log and your project. At the time of writing (checked 2026-10-24), a free account gives you unlimited public repositories."
- "If you have no strong laptop, GitHub Codespaces gives you a computer in the browser. The free hours are limited each month; check your usage page."
- "Never put a password or key in a repository. GitHub tries to block it, but do not rely on that."
- **Fallback:** if GitHub is unreachable, keep the lab log as a Markdown file in the notes app and upload it later; the provided case includes a ready-made log.

#### A8. Structured notes: OneNote, and two offline alternatives

| Tool | Cost and licence | Offline and storage | Phone | Notes |
|---|---|---|---|---|
| Microsoft OneNote | Free on iPhone and many other devices [S45] | Keeps a local copy for offline editing and syncs changes when the connection returns; notebooks sync through OneDrive [S46]. A free Microsoft account includes 5 GB of cloud storage shared across OneDrive, Outlook attachments and Microsoft 365 files [S47]. | Yes [S45, S46] | Notes live in Microsoft's format, not plain files. |
| Obsidian | Free "for all purposes, including personal, commercial, and non-profit use" (licence updated 2025-02-20); not stated to be open source [S48] | "Stores your notes as Markdown-formatted plain text files in a vault", a folder on your device [S49]; data is saved locally [S48] | Not checked (U10) | Sync between devices is a separate choice. |
| Joplin | Free and open source [S50]; AGPL-3.0-or-later [S51] | "Offline first"; notes in Markdown; sync via Nextcloud, Dropbox, OneDrive or Joplin Cloud; end-to-end encryption for synced notes [S50] | Android and iOS [S50] | |

**Phrase it this way**
- "Keep your notes in an app that works without internet and lets you export them. At the time of writing, OneNote, Obsidian and Joplin are free examples. Obsidian and Joplin keep notes as plain text files you own."
- **Fallback:** a folder of plain text files, or a paper notebook; structure (one page per topic, the five angles, a "check later" list) matters more than the app.

#### A9. Docker for the URL shortener lab

- Docker Desktop is free for personal use, education, non-commercial open source and small businesses (fewer than 250 employees and less than 10 million US dollars annual revenue) [S52].
- Windows minimum: 64-bit Windows 10 (22H2) or 11 (23H2 or later), 8 GB RAM, a 64-bit processor with SLAT, hardware virtualisation enabled, WSL 2.1.5 or later [S53]. Many fellows' laptops will not meet this.
- **Browser option:** GitHub Codespaces (A7) runs Docker in the browser [S37, S38]. **Play with Docker is gone:** it was deprecated and unavailable from 1 March 2026; the Docker forum post names iximiuz labs and Google Cloud Shell as alternatives [S57] (not checked from Gaza; U11).
- **`docker stop`:** the main process receives SIGTERM, then SIGKILL after a grace period (10 seconds by default for Linux containers) [S54]. Plain words: "asks the program to shut down, then forces it after a short wait."
- **`docker compose stop`:** "Stops running containers without removing them. They can be started again with `docker compose start`" [S55].
- Restart policies matter for the "watch what happens" moment: with `always`, a manually stopped container is restarted only when the Docker daemon restarts or you restart it; with `unless-stopped`, a stopped container stays stopped even after the daemon restarts [S56]. Writers must pick one policy for the worked example and say which.

**Phrase it this way**
- "Stopping a container is like switching off one machine in a small shop. The lab question is: what does the customer see when that machine is off?"
- **Fallback:** the provided case gives the commands, the output and the log, so a fellow on a phone can do the "predict, then read what happened" step without running anything.

#### A10. Sharing platforms and their AI rules

| Platform | AI rule found | Age | Source |
|---|---|---|---|
| Medium | Any story with AI assistance must be clearly labelled; undisclosed AI-generated writing gets "Network Only" distribution; AI-generated writing may not be paywalled in the Partner Program; responsible AI assistance is allowed, including to "express themselves in a second language"; AI images need a caption saying so | Not checked | [S58] |
| DEV (dev.to) | Authors can mark a post Hand Written, AI-Assisted or Fully Autonomous; hiding autonomy is called deceptive and may lead to suspension | Not checked | [S59] |
| Hashnode | You are "solely responsible for reviewing, editing, and approving any AI-generated content before publishing"; no labelling rule | 13+ (under 18 with parent or guardian) | [S60] |
| LinkedIn | AI-generated content "might be inaccurate, incomplete, delayed, misleading"; review and edit before sharing; you are responsible for compliance; no labelling rule found; a "Data for Generative AI Improvement" setting controls training on your data | 16+ | [S61, S62] |

**Phrase it this way**
- "Some platforms require you to say when AI helped, and hide posts that do not. Others leave it to you. This course asks you to say it every time, because it is honest, and because it protects you when rules change."
- **Fallback:** if a platform is unavailable, the write-up lives as a Markdown file in the fellow's GitHub repository, which is public and linkable.

#### A11. Availability from Palestine at a glance (checked 2026-10-24)

| Tool | Palestine named? | Status | Source |
|---|---|---|---|
| Gemini Notebook, web | Yes, "Palestine" | Available | [S2] |
| Gemini Notebook, mobile app | Not in Android or iPhone lists | **Restricted or not yet available** | [S8] |
| Gemini, web app | Yes, "Palestine" | Available | [S12] |
| Gemini, Android app download | Not in Play Store list (only in the Assistant switch list) | **Unclear** | [S17] |
| ChatGPT | Yes, "Palestine" | Available | [S18] |
| Claude | Yes, "Palestine" | Available (18+ only) | [S25, S26] |
| Microsoft Copilot | Not named; "170+ markets" except embargoed markets | **Unclear** | [S31] |
| Perplexity | No country page found | **Unclear** | U9 |
| GitHub | Not named among sanctioned regions | Not restricted by GitHub's trade controls page | [S35] |
| Docker Desktop, OneNote, Obsidian, Joplin, LinkedIn, Medium, DEV, Hashnode | Not checked | **Unclear** | U12 |

### B. Learning science

**Retrieval practice (the testing effect)**
- Practice testing and distributed practice received the highest utility ratings in Dunlosky and colleagues' review of ten study techniques; they helped learners of different ages and abilities across many kinds of tests [S63].
- Taking a memory test improved long-term retention more than restudying the same material, even without feedback [S64].
- A meta-analysis of 118 studies found practice tests more beneficial for learning than restudying and all other comparison conditions, with the size depending on test features and conditions [S65].
- Retrieval practice produced more learning a week later than building concept maps, including on questions that asked for inferences; students expected concept mapping to work better [S66].
- **Limits:** gains are larger on delayed tests than immediate ones [S64, S66]; effects vary with the type of test and material [S65].

**Spacing**
- Spreading study over time beats massing it in one session; this is one of the two highest-rated techniques [S63, S67].
- The best gap depends on how long you need to remember: in one large study it fell from about 20 to 40% of a one-week test delay to about 5 to 10% of a one-year test delay [S68].
- **Limits:** the ideal gap is not a fixed number of days. Chapters should give "come back after a few days, then after a week or two" as the course's rule of thumb, not as a law.

**Interleaving**
- A meta-analysis found a medium overall benefit (Hedges' g = 0.42) with large differences between studies; the benefit was largest for visual categories such as paintings (g = 0.67) and small for mathematics tasks [S69].
- Learners who studied paintings interleaved did better, yet most still believed massed study had worked better, even after their own test showed otherwise [S70].
- **Limits:** the benefit depends on the material [S69]; Dunlosky and colleagues rated interleaving "moderate" because classroom evidence was limited [S63]. Teach it for mixed practice of similar things (for example, mixing two kinds of system failures), not as a universal rule.

**Self-explanation and elaboration**
- Prompting learners to explain material to themselves gave a moderate average benefit (g = 0.55) across 64 reports [S71].
- Dunlosky and colleagues rated elaborative interrogation ("why is this true?") and self-explanation as moderate utility [S63].
- **Limits:** moderate, not high; depends on the prompts and on prior knowledge [S63, S71].

**Fluency illusions**
- Students who watched a fluent, confident lecturer rated their learning higher than students who watched a halting one, but did not learn more [S73]. Small samples and one-minute videos; treat as a clear demonstration, not a size estimate.
- In randomised Harvard physics classes, students in active classes learned more but felt they had learned less than students in polished lectures; the authors link this to the extra effort active learning takes [S74].
- Rereading and highlighting were rated low utility because they do not consistently improve performance [S63].
- **Relevance to AI:** an AI explanation is the most fluent lecture a fellow will ever get. That is the course's inference from [S73, S74], not a finding about AI; the direct AI evidence is in C (Bastani [S84], Lee [S87]).

**Generation effect**
- Producing an answer yourself (for example, filling a gap) leads to better memory than reading it; a meta-analysis of 86 studies put the average benefit at about 0.40 standard deviations [S72].
- **Limits:** mostly word-list experiments; the size changes with conditions [S72].

**Pictures with words (dual coding, multimedia principle)**
- Mayer's research-based principles include the multimedia principle: people learn better from words and pictures than from words alone [S75]. Reported effect sizes vary widely by study set; one pooled analysis of multimedia design principles found a moderate overall effect (secondary report; U13).
- **Limits:** the picture must explain the idea; decorative pictures and extra details do not help [S75]. This supports the brief's canvases and the "draw it" angle.

**Note-taking**
- An influential 2014 study found that students who typed notes on laptops did worse on conceptual questions than students who wrote by hand, because they copied lectures word for word [S76].
- A direct replication with 145 students found laptop users wrote more and more verbatim, but **did not** do worse on the quiz; a small meta-analysis of similar studies agreed [S77]. A second replication found small, non-significant differences [S78].
- Summarisation was rated low utility in Dunlosky's review, mainly because it only helps people who are already trained to summarise well [S63].
- **Phrase it this way:** "Pen or keyboard matters less than what you write. Write the idea in your own words and leave a question to test yourself later." Do not say "handwriting is proven better".

**Listening versus reading**
- A meta-analysis of 46 studies found no reliable overall difference between reading and listening comprehension (g = 0.07), with a small advantage for reading when readers set their own pace, and for questions that need inference [S79].
- **Phrase it this way:** "Listening is a good way to meet a topic on the move. Reading lets you slow down and go back, which helps with hard parts. Do both: listen first, then read." The "listen, then read" order is the course's design, not a tested sequence.

**Learning styles and retention pyramids (for "Do not say")**
- A major review found no adequate evidence that matching teaching to a person's preferred "learning style" improves learning [S80].
- The chart that says people remember "10% of what they read, 20% of what they hear" has no research basis and was falsely attached to Edgar Dale's "cone of experience", which had no numbers [S81].

**Five angles.** No study tests "attack a topic from four or five angles" as a package. The parts are supported separately: explanation in your own words [S71], pictures with words [S75], worked examples (agent-ip IP references), retrieval [S63], spacing [S63], and the course's "teach it or build it" step. Present "five angles" as the course's method built on these, not as a researched number.

### C. Learning with AI: what the studies found

**C1. Bastani et al. 2025 (PNAS): unguarded AI can harm learning**
- Field experiment with nearly a thousand high school maths students. During practice, access to GPT-4 raised scores by 48% with a standard chat interface ("GPT Base") and 127% with a tutor version designed to protect learning ("GPT Tutor") [S84].
- When access was removed, the GPT Base group did 17% worse than students who never had access; the tutor version largely removed that harm, but showed no clear gain either [S84].
- The authors say students used GPT-4 as a "crutch" [S84].
- **Limits:** short-term outcomes; one subject; one school system [S84].
- **Phrase it this way:** "In one large study, students who used a normal AI chat during practice did better in practice and worse in the exam without it. A version that gave hints instead of answers did not cause that harm."

**C2. Kestin et al. 2025 (Scientific Reports): a carefully built AI tutor beat active learning in one course**
- Randomised crossover trial with 194 eligible students in an introductory Harvard physics course; students learned significantly more in less time with a custom AI tutor than in an in-class active learning lesson; median learning gains were more than double; median time on task 49 minutes versus a 60-minute class [S85].
- **Limits stated by the authors:** one course at one institution; the tutor used expert-written, question-specific prompts and pre-written answers; they "do not presume" AI tutoring will always beat active learning; "an AI tutor should not replace in-person teaching" [S85].
- **Phrase it this way:** "When teachers built an AI tutor that guided students step by step, students in one physics course learned more in less time. The tutor was carefully designed; a general chat is not the same thing."

**C3. World Bank, Nigeria 2025: after-school English with Copilot**
- Randomised trial: secondary students in Edo State attended after-school English sessions using Microsoft Copilot (GPT-4) twice a week for six weeks in mid-2024; overall test scores rose by 0.31 standard deviations, and English by 0.23 [S86].
- Gains were larger for girls and for students with higher starting scores, but students across ability levels benefited [S86].
- **Limits:** six weeks; teachers guided the sessions; computer labs, not phones; the "years of schooling" translation is the World Bank's own estimate (secondary) [S86].
- **Phrase it this way:** "In a trial in Nigeria, students who used an AI chat with a teacher's guidance, in short regular sessions, improved their English."

**C4. Lee et al. CHI 2025: confidence and critical thinking**
- Survey of 319 knowledge workers with 936 examples of using generative AI at work: higher confidence in the AI went with less critical thinking; higher self-confidence went with more [S87].
- Critical thinking shifted toward checking information, combining responses and overseeing the task [S87].
- **Limits:** self-reported survey; association, not cause [S87].
- **Phrase it this way:** "People who trusted the AI more reported thinking less carefully about its answers. That is a survey, not proof of cause, but it matches the course's rule: the more sure the AI sounds, the more you check."

**C5. Kosmyna et al. 2025 ("Your Brain on ChatGPT")**
- arXiv preprint: 54 participants wrote essays with an AI chat, a search engine or no tool, over three sessions; 18 completed a fourth session; EEG showed lower brain connectivity as tool support increased [S88].
- **Limits:** not peer reviewed (no journal version found as of 2026-10-24); small sample; a published comment raises concerns about sample size, EEG analysis, reporting and transparency [S88, S89]; press coverage overstated it, and the authors asked journalists not to use words like "brain rot" (secondary; U14).
- **Phrase it this way:** do not cite it in chapters. If a fellow asks: "A small study, not yet checked by other scientists, suggested people who wrote with AI were less engaged. It is a reason to be careful, not proof of harm."

**C6. Evidence on study modes and AI help for tutors (2025 to 2026)**
- No randomised trial of ChatGPT study mode, Gemini Guided Learning or similar consumer modes was found (U15). OpenAI's own page says study mode "can make mistakes" [S19].
- Tutor CoPilot (an AI that suggested teaching moves to human tutors): randomised trial with 900 tutors and 1,800 students; students were 4 percentage points more likely to master topics, 9 points with lower-rated tutors; tutors gave away answers less often [S90].
- **Pattern across C1 to C6:** AI helps learning when it is designed or used to make the learner think (guided, hints, teacher-supported) and can harm it when it supplies answers [S84, S85, S86, S90]. This is a synthesis of several sources; say so.

### D. What AI gets wrong

- **Fabricated and wrong citations.** In 636 citations from AI-written literature reviews, about 55% from GPT-3.5 and 18% from GPT-4 were fabricated, and many real ones had substantive errors [S91]. Newer models are better, but this is the canonical reason to check every recommended book, article or video exists.
- **Outdated and inaccurate answers, even with sources.** In an EBU and BBC study of four assistants answering news questions in 14 languages, 45% of answers had at least one significant issue, 31% had serious sourcing problems, and 20% had major accuracy problems including outdated information [S98].
- **Source-grounded tools still misstate sources.** Legal research tools built on retrieval from real case law hallucinated between 17% and 33% of the time in a preregistered study, despite "hallucination-free" marketing [S99]. Google warns that Audio Overviews "may contain inaccuracies" [S3]. No independent study measuring errors in Audio Overviews was found (U16).
- **Sycophancy.** Five AI assistants consistently showed sycophancy across four tasks; humans and preference models sometimes preferred convincing sycophantic answers to correct ones [S93]. OpenAI rolled back a GPT-4o update in April 2025 because it had become noticeably more sycophantic [S94].
- **Package hallucination ("slopsquatting").** Code-generating models suggested packages that do not exist: at least 5.2% for commercial models and 21.7% for open-source models in one large study, with 205,474 unique made-up names [S92]. An attacker can publish a real package under such a name. **Phrase it this way:** "Before you install a package an AI suggested, find it on the official package site and check it is real, popular and maintained."
- **Insecure code.** About 40% of 1,689 programs completed by an AI coding assistant in security-relevant scenarios were vulnerable [S96]. In a user study, people with an AI assistant wrote significantly less secure code and were more likely to believe it was secure [S95].
- **Feeling faster is not being faster.** In METR's 2025 randomised study, 16 experienced open-source developers took 19% longer with AI tools, while believing afterwards they had been about 20% faster [S97a]. METR has since marked this result out of date: its late-2025 follow-up suggested a speedup but METR calls that data "only very weak evidence" because many developers refused to work without AI [S97b]. **Phrase it this way:** "In one careful study, experienced developers felt faster with AI but were slower. Later tools may be better. The lesson is to measure, not to trust the feeling." Do not use the 19% as a current fact about AI.

### E. Open source

- **No licence means no permission.** Without a licence, default copyright applies and "no one may reproduce, distribute, or create derivative works" [S102]; the work is under exclusive copyright by default [S100]. If you want to reuse such code, ask the maintainers to add a licence [S100].
- **Public on GitHub is not the same as open source.** GitHub's terms let others view and fork public repositories, but that is not a licence to reuse the code elsewhere [S42, S102].
- **Three licences in one line each** [S101]:
  - MIT: short and permissive; keep the copyright and licence notice.
  - Apache 2.0: permissive; keep notices and state your changes; includes a patent grant.
  - GPLv3: strong copyleft; if you distribute your work, you must share the complete source under the same licence.
- **Credit:** every licence above requires keeping the licence and copyright notice [S101]. The course adds a habit: name the project you learned from in your README and write-up.
- **Finding projects:** GitHub Explore, topic pages (github.com/topics/<topic>), "good first issue" and "help wanted" labels, and Trending [S104]. Start with projects you already use [S103].
- **Signs of a healthy project** (from opensource.guide): has a licence; recent commits; several contributors; maintainers respond to issues and pull requests; issues get closed; pull requests get reviewed and merged; people are friendly [S103].
- **Reading an unfamiliar codebase:** no primary source was read for a method. The course's own steps (README, how to run it, entry point, one feature end to end, the tests, then ask an AI to explain one file and check against the code) must be labelled as the course's advice (U17).

**Phrase it this way**
- "If a project has no licence, you may read it and learn from it, but you may not copy its code into your project."
- "An AI can explain a file to you. It can also invent a function that is not there. Check against the code."

### F. Building in public, portfolios and disclosure

- **GitHub in hiring:** an interview study found employers and job seekers treated GitHub activity (a history of contributions, work on respected projects) as a more reliable signal of skill, motivation and values than a CV, and employers looked at traces that were quick to check [S105]. **Limits:** qualitative, 2013, perceptions not hiring outcomes.
- **"Learning in public":** a practitioner idea popularised by a developer essay; no study of its effect on hiring was found (U18). Present as the course's recommendation.
- **Disclosure in research:** ICMJE says journals should require authors to disclose AI use at submission, AI tools must not be listed as authors, humans are responsible for accuracy, and AI-generated material must not be cited as a primary source [S106]. COPE says the same on authorship and asks authors to state which tool was used and how [S107].
- **Disclosure on platforms:** Medium requires a label and limits undisclosed AI writing [S58]; DEV offers disclosure levels [S59]; Hashnode and LinkedIn put responsibility on the author without requiring a label [S60, S61].
- **Wording an honest AI-use line** (course template, built from the ICMJE and COPE elements: which tool, what it did, who checked) [S106, S107]:
  - "I used [tool] to explain [topic] and to suggest a structure for this post. I wrote the post, ran every command, and checked the facts against [source]."
  - "AI helped with: first draft of the summary, a diagram. I checked and rewrote both."

**Phrase it this way:** "Say which tool helped, what it did, and what you checked. Keep it to one or two lines. You are responsible for every sentence, whoever drafted it."

### G. Privacy and safety

- **What not to paste:** clients' data, passwords, API keys and tokens, and other people's personal data. Google itself says "Please don't enter confidential information" in Gemini [S15]. Human reviewers may read a subset of chats on several services [S15, S23], and reviewed chats can be kept for years [S15, S7].
- **A documented incident:** in May 2023 Samsung banned staff from using generative AI tools on company devices after discovering staff had uploaded sensitive code to ChatGPT; the memo cited the difficulty of retrieving and deleting data held on external servers [S108].
- **Leaked secrets:** GitHub reported finding 39 million secret leaks across its platform in 2024 [S109]. GitGuardian reported about 29 million new hardcoded secrets in public GitHub commits in 2025, up 34% on the year, and an 81% rise in leaked AI-service keys (secondary reports of the vendor's report) [S110]. GitHub blocks pushes of known secret types to public repositories by default for users [S39].
- **Training settings:** see hard constraint 5; each consumer tool has a different setting name and default [S15, S21, S27, S32, S34, S44, S62].

**Phrase it this way**
- "Before you paste, ask: would I be fine if a stranger read this? If not, remove names, numbers and keys first, or do not paste it."
- "If you ever push a key to GitHub, treat it as stolen: cancel it and make a new one. Deleting the commit is not enough." (Standard security practice, but no source in this dossier states it; present it as course advice, see U22.)

### H. Projects and time

- **"Strong projects take about six months":** no study was found that supports a six-month figure for building a strong portfolio project. Treat it as **the sponsor's planning rule**, and say so in chapters (U19).
- **Habits:** in Lally and colleagues' study, people repeating a chosen daily behaviour took a median of 66 days to reach a plateau of automaticity, with a modelled range of 18 to 254 days [S111]. **Limits:** 96 volunteers, fewer with good model fits; the long estimates are projections beyond the 12-week study [S111]. **Phrase it this way:** "A daily habit can take weeks to months to feel automatic, and people differ a lot." Do not add claims about missed days (U21).
- **Deliberate practice:** a meta-analysis found deliberate practice explained 26% of performance differences in games, 21% in music, 18% in sports, 4% in education and less than 1% in professions [S112]. **Phrase it this way:** "Practice matters, but it is not everything. Plan the practice, and also choose good material and get feedback." Do not use "10,000 hours".

### I. Gaza context (keep offline options; do not dramatise)

- Internet access in late 2025: 71% had accessed the internet at least once, 11% continuously, 60% intermittently, 29% not at all; smartphone ownership about 35% (people aged 10 and over) [S113].
- Mobile coverage in the middle of Gaza about 96% in April 2026, varying by area [S113].
- Electricity: near-total absence of reliable electricity; reliance on generators (OCHA, September 2026) [S114].
- Connectivity "severely constrained" (OCHA, May 2026) [S115].
- Not checked: Paltel statements and ITU data (U20).

**Phrase it this way:** chapters never describe Gaza's conditions. They state design facts: "Every audio is optional. Every download says how to check its size. Your notes work without internet. If a tool does not open, use the fallback." Hardship stays out of cases and gates (brief, legal and privacy).

## Existing courses and gaps

| Resource | What it covers | What it leaves out | Use for this course |
|---|---|---|---|
| Anthropic, "AI Fluency: Framework and Foundations" [S116] | Four competencies: Delegation, Description, Discernment, Diligence | Not about learning a topic deeply, labs, projects or Gaza access | "Diligence" overlaps with honesty and disclosure; do not copy structure |
| Coursera, "Learning How to Learn" (Oakley and Sejnowski) [S117] | Study techniques for hard subjects; widely taken | Not about AI tools, labs or projects | Confirms learners want study science; this course applies it to AI |
| Tool vendors' help centres (Google, OpenAI) [S3, S19] | How to use one feature | Not neutral; no checking habits across tools; date quickly | Source of facts only, with access dates |
| Course 9 module 7 (internal) | Clear instructions, checking one answer three ways | Not across weeks of learning and building | Refer back in one sentence |
| Popular "learn anything with ChatGPT" posts (orientation, not cited) | Prompt lists | Promise features, ignore checking and privacy, often cite the 10% retention chart | Writers must not copy |

**Gap this course fills.** No resource found combines: learning science applied to AI tools, the evidence that unguided AI can harm learning [S84], daily labs that break things on purpose, a months-long project plan, honest disclosure, and access constraints for learners on phones in a place where app stores and connectivity are unreliable.

## Technical landscape (summary)

| Job | Example tools at the time of writing | Free use | Main limit to teach |
|---|---|---|---|
| Learn from your own sources, listen on the go | Gemini Notebook (formerly NotebookLM) | Yes [S4, S6] | Web works in Palestine, app does not list it [S2, S8]; longest audio English only [S3] |
| Explain, tutor, quiz, draw | Gemini, ChatGPT, Claude, Copilot | Yes [S14, S20, S29, S31] | Can be wrong [S22]; training defaults [S15, S21]; Claude 18+ [S26] |
| Search with links | Perplexity, chat assistants with search | Yes | Links can be misattributed [S98] |
| Code, lab log, portfolio | GitHub, Codespaces | Yes [S36, S37] | Quotas; public means forkable [S42] |
| Run the lab | Docker Desktop or Codespaces | Yes for personal use [S52, S37] | Hardware [S53]; Play with Docker gone [S57] |
| Notes | OneNote, Obsidian, Joplin | Yes [S45, S48, S50] | Own your files; offline first |
| Share | LinkedIn, DEV, Hashnode, Medium, GitHub | Yes | Different AI rules [S58 to S61] |

## Failure modes

### When fellows use AI to learn and build (real-world)

1. **AI as a crutch.** Answers during practice, worse performance alone [S84].
2. **The fluent explanation feels like learning.** Polished explanations raise confidence, not learning [S73, S74].
3. **Trusting the confident tool.** More trust in AI, less critical thinking [S87]; AI users more sure their insecure code was secure [S95].
4. **Invented resources.** Recommended books, papers or videos that do not exist [S91].
5. **Wrong or outdated facts with real-looking links** [S98, S99].
6. **The AI agrees with a bad plan** [S93, S94].
7. **Installing a package that does not exist, or a malicious one with that name** [S92].
8. **Shipping insecure code** [S95, S96].
9. **Pasting secrets or other people's data** [S108, S109, S110].
10. **Copying code with no licence or ignoring GPL terms** [S100, S101].
11. **Feeling faster without being faster** [S97a].
12. **Losing work when a tool changes or a session dies** (rename and limit changes [S1, S6]; Play with Docker shutdown [S57]).

### When teaching this course (the course's main risks)

1. **Feature tours that date in weeks.** Guard: job first, tool as example, access date, fallback (hard constraint 1).
2. **Promising audio length or Arabic support.** Guard: U1; "check what your tool offers today".
3. **App-only instructions.** Guard: browser path in every step (A11).
4. **Hype or fear.** Guard: report C1 to C6 with their limits; never "AI makes you dumb" or "AI tutors double learning".
5. **Quiz keys that test tool trivia** (menu names, limits). Guard: test the habit (what to check, what not to paste), never a menu name.
6. **"Five angles" or "six months" taught as research.** Guard: label as the course's method and the sponsor's rule.
7. **Learning myths creeping in** (learning styles, 10% retention, 10,000 hours). Guard: "Do not say" list.
8. **Under-18 fellows told to use an 18+ tool.** Guard: open question; give two tools per job.
9. **Public lab logs exposing personal data or keys.** Guard: a pre-push checklist in module 4.
10. **Disclosure that is vague ("AI was used").** Guard: the tool, what it did, what you checked.

## What not to teach (in about 20 hours, for this audience)

| Topic | Why not |
|---|---|
| How models work, tokens, training | Brief non-goal; course 8 |
| Prompt engineering frameworks | Brief non-goal; course 9 module 7 |
| Feature-by-feature tool tours, menu paths, quotas | Date within weeks [S1, S6]; test trivia |
| Tool rankings or "best AI for X" | Brief non-goal; access differs by country and age |
| Docker internals, networking, orchestration | Brief non-goal; one lab example only |
| Spaced repetition software set-up, full note systems (Zettelkasten, PARA, Cornell) | Time; the habit matters more than the system |
| Licence law beyond four cases (MIT, Apache 2.0, GPL, none) | Time; risk of legal advice |
| Audience growth, SEO, video editing | Brief non-goal |
| The MIT EEG preprint as evidence | Not peer reviewed; contested [S88, S89] |
| METR's 19% as a current fact | Marked out of date by METR [S97b] |
| Learning styles, "10% of what you read", "10% of your brain", "10,000 hours" | False or unsupported [S80, S81, S82, S112] |

## Recommended changes to the course outline

1. **M2: replace "a map of tools by job" with "jobs, not tools", and add an access check.** Keep the map, but make it a table of jobs (learn from sources, tutor and quiz, search with links, run a lab, keep notes, share), with two example tools per job, an access date, and a "does it open here, at my age, on my phone?" check. Reason: one tool was renamed and re-limited during the research window [S1, S6]; the mobile apps are the weak point for Palestine [S8, S17]; Claude is 18+ [S26].

2. **M2: move "privacy and checking output" to the first chapter of M2, before any tool is opened.** The habit "assume a person may read it" and "find the training setting" must come before fellows paste anything. Reason: training is on by default in most consumer tools [S21, S34, S44], and human review exists [S15, S23].

3. **M1: add one chapter on the evidence: "AI can help or harm learning, depending on how you use it".** Use Bastani [S84], Kestin [S85], the Nigeria trial [S86] and Tutor CoPilot [S90] in plain words. Reason: this is the strongest direct support for the sponsor's thesis ("enabler, not replacement") and it gives fellows a reason for the habits in M3, not just a rule.

4. **M3: reorder so "the fluency trap and retrieval" comes after the first AI explanation, as a felt experience.** Fellows get a clear AI explanation, rate how well they understand, then try to recall it with the screen closed. Reason: the illusion is best shown, not told [S73, S74, S70]; retrieval is the highest-rated technique [S63].

5. **M3: rename "sources first: audio overview then read" to "listen to meet it, read to learn it", and drop the 40 to 60 minute claim.** Reason: no source supports that length; the longest option is English only; listening and reading are about equal overall, with reading better when self-paced and for inference [S3, S79]. Add the browser download fallback and "check the size before you download".

6. **M3: merge "make the AI quiz you, spaced" into "one topic from five angles" and add interleaving lightly.** One chapter: five angles in one study session; a second short chapter: AI quizzes you on two topics mixed, on day 1, day 3 and day 10. Reason: spacing and retrieval are the top two techniques [S63]; interleaving helps for similar categories [S69]; saves a chapter.

7. **M3: change "structured notes (OneNote)" to "notes you own, in your own words", with OneNote, Obsidian and Joplin as examples.** Drop any claim that handwriting or a specific app is better. Reason: the laptop versus longhand effect did not replicate [S77, S78]; Obsidian and Joplin keep plain files and work offline [S49, S50]; OneNote works offline and syncs later [S46].

8. **M4: add "check before you install" and a pre-push checklist to the lab chapter.** Two short sections: verify any package an AI suggests [S92]; before every push, check for keys and personal data [S39, S109]. Reason: these are the two most likely real harms of a public daily lab log.

9. **M4: make the URL shortener lab's browser path GitHub Codespaces, and remove Play with Docker everywhere.** State the free quota only as "limited hours each month; check your usage page" [S37]. Reason: Play with Docker shut down on 1 March 2026 [S57]; Codespaces includes Docker [S38]; Docker Desktop needs 8 GB RAM and virtualisation [S53].

10. **M4: specify the restart policy in the worked example.** "Stop a container and watch what happens" gives different results with `always`, `unless-stopped` or no policy [S56]. Pick one, say it, and make the prediction question depend on it.

11. **M5: add "AI suggested it, I checked it exists" as a required column in the weekly resource plan.** Reason: fabricated citations [S91]; the outcome already says "resources they checked exist" (brief, outcome 6).

12. **M5: label "about six months" and "one new area per week" as the sponsor's planning rules, and add a "measure, do not feel" note.** Reason: no evidence for six months (U19); habits take weeks to months [S111]; feeling faster is not being faster [S97a, S97b].

13. **M5: keep licences to four cases (MIT, Apache 2.0, GPL, none).** Add "public is not the same as open source" [S42, S102].

14. **M6: write the disclosure line from a template with three parts: tool, what it did, what you checked.** Reason: ICMJE and COPE elements [S106, S107]; platforms differ, and Medium limits undisclosed AI writing [S58].

15. **M6: make the public write-up a Markdown file in the fellow's own GitHub repository first, then adapted to platforms.** Reason: the file is owned and survives platform changes; LinkedIn is 16+ [S61]; platform access from Gaza is unchecked (U12).

16. **Quizzes: at least four "check the AI's output" items should test a habit, not a fact about a tool.** For example: "The AI suggests a package called X. What is your next step?" Reason: brief's must-have; tool facts date [S1, S6].

## Facts writers may state

Each line is safe in learner-facing text with the access date where it concerns a tool.

1. AI tools can state false things confidently, including books and studies that do not exist [S91, S22].
2. In a study of four AI assistants answering news questions, nearly half of answers had a significant problem [S98].
3. AI assistants tend to agree with the user, even when the user is wrong [S93].
4. AI coding assistants can suggest packages that do not exist [S92].
5. People using an AI coding assistant wrote less secure code and felt more sure it was secure, in one study [S95].
6. In a study of high school maths students, a normal AI chat raised practice scores but lowered exam scores without it; a tutor version that gave hints avoided the harm [S84].
7. A carefully designed AI tutor helped students in one physics course learn more in less time [S85].
8. Testing yourself and spacing study over days are among the best-supported study methods [S63].
9. Rereading and highlighting help less than most students think [S63].
10. A clear, smooth explanation can make you feel you have learned more than you have [S73, S74].
11. Explaining an idea in your own words helps you learn it [S71].
12. Words with a picture that explains the idea help more than words alone [S75].
13. Listening and reading lead to similar understanding overall; reading at your own pace helps with harder questions [S79].
14. Whether you take notes by hand or on a keyboard matters less than once thought [S77].
15. Without a licence, you may not copy someone's code into your project [S100, S102].
16. MIT and Apache 2.0 let you reuse code if you keep the notices; GPL asks you to share your source under the same licence if you distribute [S101].
17. GitHub blocks some secrets from being pushed to public repositories, but millions of secrets still leak each year [S39, S109].
18. Many free AI chat tools use your chats to improve their models unless you change a setting (checked 2026-10-24) [S21, S15, S34].
19. Some services have trained people read a sample of chats (checked 2026-10-24) [S15, S23].
20. Several AI tools list Palestine as a supported place on the web; some mobile apps do not (checked 2026-10-24) [S2, S8, S12, S17, S18, S25].
21. Claude is for people aged 18 or over (checked 2026-10-24) [S26].
22. NotebookLM was renamed Gemini Notebook in July 2026 [S1].
23. A new daily habit took a median of about two months to feel automatic in one study, with large differences between people [S111].
24. Medical journal editors say AI cannot be an author and authors must disclose AI use [S106, S107].
25. Some writing platforms require you to label AI-assisted posts (checked 2026-10-24) [S58].

## Do not say

| Popular claim | Why not | Say instead |
|---|---|---|
| "We only use 10% of our brain." | A myth; imaging shows most of the brain is used [S82] | Nothing; leave it out |
| "People have learning styles; learn the way that suits you (visual, auditory)." | No adequate evidence that matching teaching to style helps [S80] | "Use words and pictures together; test yourself." [S75, S63] |
| "People remember 10% of what they read, 20% of what they hear, 90% of what they do." | Invented chart, falsely attached to Dale's cone [S81] | "Doing and recalling help more than rereading." [S63] |
| "AI will replace all developers." / "AI is useless." | No source supports either; the evidence is mixed and depends on use [S84, S85, S97b] | "AI changes the work; people still decide and check." |
| "AI tutors double your learning." | One carefully built tutor in one course [S85] | "A well-designed AI tutor helped in one study." |
| "ChatGPT makes you dumb" / "rots your brain." | From a small, non-peer-reviewed preprint, overstated by press [S88, S89] | "Using AI for answers can weaken practice; use it for hints." [S84] |
| "Developers are 19% slower with AI." | 2025 result, marked out of date by its authors [S97a, S97b] | "Feeling faster is not the same as being faster; measure." |
| "Handwriting notes is proven better than typing." | Did not replicate [S77, S78] | "Write it in your own words." |
| "It takes 21 days to form a habit." | Lally found a median of 66 days and a wide range [S111] | "Weeks to months, and it varies." |
| "10,000 hours makes an expert." | Practice explains part of performance, very little in professions [S112] | "Practice matters, and so do feedback and good material." |
| "NotebookLM makes 40 to 60 minute podcasts." | No source; longest option English only [S3] | "Audio overviews can be short or long; check yours." |
| "Strong projects take six months (research shows)." | No source (U19) | "Our plan uses six months, because strong projects take time." |
| "The audio overview only uses your sources, so it is correct." | Google warns it may be inaccurate [S3]; grounded tools still err [S99] | "It can still be wrong; read the source." |
| Any invented percentage of "AI errors" or "time saved". | No invented statistics (brief) | A sourced figure with its study, or none |

## Source table

Type key: P = primary research, standard, or the provider's own official page (help centre, terms, docs); F = first-party writing (company blog, announcement, first-party report); S = reputable secondary (university, professional body, established publication, statistics office summary reported by others); W = practitioner blog, forum post or vendor marketing (orientation; never the sole source for a learner-facing fact unless marked). All dates are 2026-10-24 unless stated.

| ID | Claim | Source | Type | Date checked | Confidence |
|---|---|---|---|---|---|
| S1 | NotebookLM renamed Gemini Notebook on 16 July 2026; remains standalone; links redirect; rollout over weeks. | Google Workspace Updates, "NotebookLM is now Gemini Notebook," 2026-07-16. https://workspaceupdates.googleblog.com/2026/07/notebooklm-now-gemini-notebook.html | F | 2026-10-24 | High |
| S2 | Gemini Notebook web is available in a list that includes "Palestine"; mobile app may differ; users above the age of consent; stricter rules under 18; some features 18+ only. | Gemini Notebook Help, "Learn about Gemini Notebook." https://support.google.com/notebooklm/answer/16164461 | P | 2026-10-24 | High |
| S3 | Audio Overview formats (Deep Dive, Brief under two minutes, Critique, Debate); Shorter, Default, Longer with Longer English only; 80+ languages; interactive mode English only; focus prompt; download (restricted for Play Books sources); "may contain inaccuracies or audio glitches". | Gemini Notebook Help, "Generate Audio Overview." https://support.google.com/notebooklm/answer/16212820 | P | 2026-10-24 | High |
| S4 | Source types; 500,000 words or 200 MB per source; 50 sources per notebook for free users; paywalled pages unsupported; YouTube needs captions; Deep Research over-18 only. | Gemini Notebook Help, "Add or discover new sources." https://support.google.com/gemininotebook/answer/16215270 | P | 2026-10-24 | High |
| S5 | Usage table "subject to change": 100 notebooks and 50 sources per notebook on the standard plan; more on paid plans. | Gemini Notebook Help, usage limits. https://support.google.com/gemininotebook/answer/16213268 | P | 2026-10-24 | High (for the table); medium that "standard" means free |
| S6 | Compute-based limits refreshing every five hours, rolling out to consumer accounts from 2 September 2026; heavy outputs can be deferred; access to all features continues. | Google blog, Shin, Y., "New flexible usage limits," 2026-08-28. https://blog.google/innovation-and-ai/products/gemini-notebook/new-flexible-usage-limits/ | F | 2026-10-24 | High |
| S7 | Personal accounts: content not used to directly train foundational models unless feedback is given; feedback reviewed after de-linking; kept up to 3 years; Workspace and Education content not human-reviewed or used for training. | Gemini Notebook Help, privacy and feedback. https://support.google.com/gemininotebook/answer/17004255 and https://support.google.com/notebooklm/answer/16179536 | P | 2026-10-24 | High |
| S8 | Mobile app: Android 10+; Palestine not in Android or iPhone lists; rolling out gradually; Audio Overviews downloadable for offline playback, not exportable; fewer source types; no notes, mind maps, reports. | Gemini Notebook Help, "Get started with the Gemini Notebook mobile app" (Android). https://support.google.com/gemininotebook/answer/16296687?co=GENIE.Platform%3DAndroid | P | 2026-10-24 | High |
| S9 | App Store listing: background playback and offline support; age rating 13+; 218 MB; version 1.64.1. | Apple App Store, "Gemini Notebook." https://apps.apple.com/us/app/gemini-notebook/id6737527615 | F | 2026-10-24 | High (size changes with versions) |
| S10 | Output languages include Arabic (Modern Standard) and Arabic (Colloquial Egyptian); set under Settings, Output Language. | Gemini Notebook Help, "Change output language." https://support.google.com/gemininotebook/answer/16261963 | P | 2026-10-24 | High |
| S11 | Features listed: flashcards, quizzes, study guides, mind maps, Audio and Video Overviews, infographics, slide decks, Guided Learning; Audio and Video Overviews in 80+ languages; 200+ countries. | Google for Education, "Gemini Notebook." https://edu.google.com/ai-gemini-notebook/ | F | 2026-10-24 | Medium-high (marketing page) |
| S12 | Gemini web app country list includes "Palestine"; Arabic supported; mobile app may differ. | Gemini Apps Help, "Where you can use the Gemini web app." https://support.google.com/gemini/answer/13575153 | P | 2026-10-24 | High |
| S13 | Gemini requires age 13 (or the applicable age) with a personal or school account. | Gemini Apps Help, sign-in requirements. https://support.google.com/gemini/answer/13278668 | P | 2026-10-24 | High |
| S14 | Compute-based limits refreshing every 5 hours until a weekly limit; without a plan: Canvas, quizzes and flashcards, audio overviews, Deep Research, image generation available, video generation not; high-demand caveat. | Gemini Apps Help, usage limits. https://support.google.com/gemini/answer/16275805 | P | 2026-10-24 | High for limits; medium for the feature list (read from icons) |
| S15 | Keep Activity: activity used to improve services including training; a subset of chats reviewed by humans; 72-hour retention when off; reviewed chats kept up to three years; "Please don't enter confidential information". | Gemini Apps Privacy Hub. https://support.google.com/gemini/answer/13594961 | P | 2026-10-24 | High |
| S16 | Guided Learning selected from the prompt box; images, diagrams and YouTube videos in responses; some learning resources English and US only and not for under-18 users. | Gemini Apps Help, "Use learning tools in Gemini Apps." https://support.google.com/gemini/answer/16448384 | P | 2026-10-24 | High (scope of the restriction unclear) |
| S17 | Gemini mobile apps in 150+ countries; Palestine not in the Play Store download list, only in the Assistant switch list; Arabic supported; 13+. | Gemini Apps Help, "Gemini mobile app availability" (Android). https://support.google.com/gemini/answer/14579026?co=GENIE.Platform%3DAndroid | P | 2026-10-24 | High |
| S18 | ChatGPT supported countries include "Palestine"; access outside listed places may lead to blocking. | OpenAI Help, "ChatGPT supported countries." https://help.openai.com/en/articles/7947663-chatgpt-supported-countries | P | 2026-10-24 | High |
| S19 | Study mode available across plans globally on web, iOS and Android; asks questions and checks understanding; "can make mistakes"; may give direct answers; same limits as normal chat. | OpenAI Help, "ChatGPT study mode FAQ." https://help.openai.com/en/articles/11780217-chatgpt-study-mode-faq | P | 2026-10-24 | High |
| S20 | Free tier includes a default model, search, uploads, image creation, 500 MB Library; separate tool limits; "The default model and available limits can change over time"; ads in some countries. | OpenAI Help, "ChatGPT Free Tier FAQ." https://help.openai.com/en/articles/9275245-chatgpt-free-tier | P | 2026-10-24 | High |
| S21 | Data sharing enabled by default on Free, Plus, Pro; turn off "Improve the model for everyone" under Data controls; Temporary Chats not used for training, kept up to 30 days. | OpenAI Help, "Data Controls FAQ." https://help.openai.com/en/articles/7730893-data-controls-faq | P | 2026-10-24 | High |
| S22 | 13+; parental permission under 18; output may not be accurate; users must evaluate output (effective 2026-01-01). | OpenAI, Terms of Use. https://openai.com/policies/terms-of-use/ | P | 2026-10-24 | High |
| S23 | Authorized personnel and service providers may access content for abuse, support, legal matters, and model improvement unless opted out. | OpenAI Help, "Data usage for consumer services FAQ." https://help.openai.com/en/articles/7039943-data-usage-for-consumer-services-faq | P | 2026-10-24 | High |
| S24 | Arabic is a supported ChatGPT interface language. | OpenAI Help, language setting. https://help.openai.com/en/articles/8357869-how-to-change-your-language-setting-in-chatgpt | P | 2026-10-24 | High |
| S25 | Anthropic's supported countries (covering Claude.ai and the API) include "Palestine"; unlisted places are unsupported; policy dated 12 Nov 2026 on the page. | Anthropic, "Supported countries and regions." https://www.anthropic.com/supported-countries | P | 2026-10-24 | High |
| S26 | Users must be at least 18 to create and use a Claude account. | Claude Help, "Minimum age requirement access restriction" (2026-03-16). https://support.claude.com/en/articles/13117299-minimum-age-requirement-access-restriction | P | 2026-10-24 | High |
| S27 | Consumer chats used for training only if Model Improvement allows; Incognito never; feedback kept up to 5 years; safety-flagged use (updated 2026-03-16). | Anthropic Privacy Center, "Is my data used for model training?" https://privacy.claude.com/en/articles/10023580-is-my-data-used-for-model-training | P | 2026-10-24 | High |
| S28 | Model Improvement on: de-identified retention up to 5 years; deleted chats removed from back-end within 30 days (dated 2026-07-01). | Anthropic Privacy Center, "How long do you store my data?" https://privacy.claude.com/en/articles/10023548-how-long-do-you-store-my-data | P | 2026-10-24 | High |
| S29 | Artifacts available on Free and other plans; documents, code, single-page sites, diagrams, flowcharts, dashboards, small tools. | Claude Help, "What are artifacts and how do I use them?" https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them | P | 2026-10-24 | High |
| S30 | Arabic scored 97.2% (Sonnet 4.5) and 92.5% (Haiku 4.5) of English on professionally translated MMLU. | Claude Docs, "Multilingual support." https://platform.claude.com/docs/en/build-with-claude/multilingual-support | P | 2026-10-24 | High |
| S31 | Microsoft Copilot available in 170+ markets except some regions and embargoed markets; Arabic supported; Palestine not mentioned. | Microsoft Support, "Supported languages for Microsoft Copilot." https://support.microsoft.com/en-us/microsoft-365-copilot/supported-languages-for-microsoft-365-copilot | P | 2026-10-24 | High |
| S32 | Settings "Training on conversation activity" and "Training on voice conversations"; opting out excludes future conversations from training but not other uses; page applies to older app version. | Microsoft Support, "Microsoft Copilot privacy controls." https://support.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-privacy-controls | P | 2026-10-24 | High |
| S33 | Copilot requires age 13+; under-18 chats not used to train models. | Microsoft Support, "Microsoft Copilot for young people." https://support.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-young-people | P | 2026-10-24 | High |
| S34 | Perplexity AI data retention on by default for Free, Pro and Max; toggle under Account, Preferences; applies after opt-out. | Perplexity Help Center, "Data collection at Perplexity." https://www.perplexity.ai/help-center/en/articles/11564572-data-collection-at-perplexity | P | 2026-10-24 | High |
| S35 | Sanctioned regions named: Crimea, separatist Donetsk and Luhansk, Cuba, Iran, North Korea; Palestine, Gaza, West Bank not mentioned. | GitHub Docs, "GitHub and trade controls." https://docs.github.com/en/site-policy/other-site-policies/github-and-trade-controls | P | 2026-10-24 | High |
| S36 | GitHub Free: unlimited public repos (full features), unlimited private (limited), 2,000 Actions minutes, 500 MB Packages, 120 Codespaces core hours, 15 GB Codespaces storage, Pages in public repos. | GitHub Docs, "GitHub's plans." https://docs.github.com/en/get-started/learning-about-github/githubs-plans | P | 2026-10-24 | High |
| S37 | Codespaces free quota 120 hours and 15 GB-month; 2-core multiplier 2; usage blocked when quota used without a payment method. | GitHub Docs, "About billing for GitHub Codespaces." https://docs.github.com/en/billing/concepts/product-billing/github-codespaces | P | 2026-10-24 | High |
| S38 | The universal dev container image includes the docker-in-docker feature. | devcontainers/images, universal devcontainer.json. https://github.com/devcontainers/images/blob/main/src/universal/.devcontainer/devcontainer.json | P | 2026-10-24 | High |
| S39 | Push protection for users is enabled by default and stops pushes of secrets to public repositories; repository-level push protection off by default. | GitHub Docs, "About push protection." https://docs.github.com/en/code-security/secret-scanning/introduction/about-push-protection | P | 2026-10-24 | High |
| S40 | Secret scanning runs automatically for free on public repositories; partner secrets go to the provider. | GitHub Docs, "About secret scanning." https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning | P | 2026-10-24 | High |
| S41 | Student benefits: 13+, enrolled in degree- or diploma-granting programme, proof documents, academic email where required. | GitHub Docs, "Apply to GitHub Education as a student." https://docs.github.com/en/education/about-github-education/github-education-for-students/apply-to-github-education-as-a-student | P | 2026-10-24 | High |
| S42 | Users must be 13+; public repos may be viewed and forked by others under the terms. | GitHub Terms of Service. https://docs.github.com/en/site-policy/github-terms/github-terms-of-service | P | 2026-10-24 | High |
| S43 | Copilot Free: 2,000 completions a month plus an allowance of credits; Copilot Student free for verified students. | GitHub Docs, Copilot individual plans. https://docs.github.com/en/copilot/concepts/billing/individual-plans | P | 2026-10-24 | High |
| S44 | From 24 April (2026), interaction data of individual Free, Pro, Pro+ users may be used for training unless they opt out; students and teachers on free plans not affected. | GitHub Community, "FAQ: Privacy Statement update on Copilot data use for training." https://github.com/orgs/community/discussions/188488 | F | 2026-10-24 | Medium-high (year inferred from context) |
| S45 | "OneNote is free on iPhone and many other devices." | Apple App Store, "Microsoft OneNote." https://apps.apple.com/us/app/microsoft-onenote/id410395246 | F | 2026-10-24 | Medium-high (read via search snippet) |
| S46 | OneNote creates a local copy for offline editing and syncs changes when the connection is restored; notebooks sync via OneDrive. | Microsoft Support, "Sync a notebook in OneNote." https://support.microsoft.com/en-us/onenote/onenote-help-and-learning/sync-a-notebook-in-onenote | P | 2026-10-24 | High |
| S47 | A Microsoft account includes 5 GB of free cloud storage shared across OneDrive, Outlook attachments and Microsoft 365. | Microsoft Support, "Microsoft storage FAQs." https://support.microsoft.com/en-us/onedrive/microsoft-storage-faqs | P | 2026-10-24 | Medium-high (read via search snippet) |
| S48 | Obsidian free for all purposes including commercial; data saved locally (licence updated 2025-02-20). | Obsidian, License. https://obsidian.md/license | P | 2026-10-24 | High |
| S49 | Obsidian stores notes as Markdown plain text files in a local vault folder. | Obsidian Help, "How Obsidian stores data." https://obsidian.md/help/data-storage | P | 2026-10-24 | High |
| S50 | Joplin: free, open source, offline first, Markdown, Windows, macOS, Linux, Android, iOS; sync options; end-to-end encryption. | Joplin Help. https://joplinapp.org/help/ | P | 2026-10-24 | High |
| S51 | Joplin code licensed AGPL-3.0-or-later unless a directory has its own licence. | Joplin repository LICENSE. https://github.com/laurent22/joplin/blob/dev/LICENSE | P | 2026-10-24 | High |
| S52 | Docker Desktop free for small businesses (under 250 employees and under 10 million US dollars revenue), personal use, education, non-commercial open source. | Docker Docs, "Docker Desktop license agreement." https://docs.docker.com/subscription/desktop-license/ | P | 2026-10-24 | High |
| S53 | Windows requirements: Windows 10 22H2 or 11 23H2+, 64-bit, 8 GB RAM, SLAT, virtualisation enabled, WSL 2.1.5+. | Docker Docs, "Install Docker Desktop on Windows." https://docs.docker.com/desktop/setup/install/windows-install/ | P | 2026-10-24 | High |
| S54 | `docker stop`: SIGTERM then SIGKILL after a grace period; default 10 seconds for Linux containers. | Docker Docs, "docker container stop." https://docs.docker.com/reference/cli/docker/container/stop/ | P | 2026-10-24 | High |
| S55 | `docker compose stop` stops containers without removing them; restart with `docker compose start`. | Docker Docs, "docker compose stop." https://docs.docker.com/reference/cli/docker/compose/stop/ | P | 2026-10-24 | High |
| S56 | Restart policies: `always` restarts a manually stopped container only when the daemon restarts or on manual restart; `unless-stopped` does not restart it even after the daemon restarts. | Docker Docs, "Start containers automatically." https://docs.docker.com/engine/containers/start-containers-automatically/ | P | 2026-10-24 | High |
| S57 | Play with Docker deprecated; hosted services discontinued 1 March 2026; alternatives named: iximiuz labs, Google Cloud Shell, Labspaces. | Docker Community Forums, announcement post, 2026-02-22. https://forums.docker.com/t/play-with-docker-is-deprecated-and-will-be-unavailable-starting-march-1-2026-learn-about-alternatives/151177 | W (forum; poster's role not confirmed) | 2026-10-24 | Medium-high |
| S58 | Medium: label AI assistance; undisclosed AI writing gets Network Only distribution; no paywalled AI writing in Partner Program; AI assistance allowed incl. second-language help; AI images captioned. | Medium Help Center, "Artificial Intelligence (AI) content policy." https://help.medium.com/hc/en-us/articles/22576852947223-Artificial-Intelligence-AI-content-policy | P | 2026-10-24 | High |
| S59 | DEV: three disclosure tiers (Hand Written, AI-Assisted, Fully Autonomous); undisclosed autonomy deceptive and may lead to suspension (posted 26 Aug). | DEV Team, "Introducing AI Disclosure on DEV." https://dev.to/devteam/introducing-ai-disclosure-on-dev-tools-for-nuance-clarity-and-better-feeds-34mk | F | 2026-10-24 | High |
| S60 | Hashnode: 13+ (parent or guardian under 18); authors solely responsible for AI content; no labelling rule (updated 2026-02-15). | Hashnode, Terms of Use. https://hashnode.com/terms | P | 2026-10-24 | High |
| S61 | LinkedIn: minimum age 16; generated content may be inaccurate; review and edit before sharing; user responsible (effective 2025-11-03). | LinkedIn, User Agreement. https://www.linkedin.com/legal/user-agreement | P | 2026-10-24 | High |
| S62 | LinkedIn "Data for Generative AI Improvement" setting controls use of data for training. | LinkedIn Help, generative AI FAQ. https://www.linkedin.com/help/linkedin/answer/a5538339 | P | 2026-10-24 | Medium-high (read via search snippet) |
| S63 | Practice testing and distributed practice rated high utility; elaborative interrogation, self-explanation, interleaving moderate; summarisation, highlighting, rereading low. | Dunlosky, J., Rawson, K. A., Marsh, E. J., Nathan, M. J., Willingham, D. T. Psychological Science in the Public Interest 14(1): 4 to 58, 2013. https://doi.org/10.1177/1529100612453266 | P | 2026-10-24 | High |
| S64 | Taking memory tests improves long-term retention more than restudying. | Roediger, H. L., Karpicke, J. D. Psychological Science 17(3): 249 to 255, 2006. https://doi.org/10.1111/j.1467-9280.2006.01693.x | P | 2026-10-24 (via agent-ip references and review [S63]) | High |
| S65 | Meta-analysis of 118 studies: practice tests more beneficial than restudying and other comparisons; moderated by test features. | Adesope, O. O., Trevisan, D. A., Sundararajan, N. Review of Educational Research 87(3): 659 to 701, 2017. https://doi.org/10.3102/0034654316689306 | P (abstract read) | 2026-10-24 | High |
| S66 | Retrieval practice beat concept mapping on a test a week later, including inference questions; students predicted the opposite. | Karpicke, J. D., Blunt, J. R. Science 331: 772 to 775, 2011. https://doi.org/10.1126/science.1199327 | P (abstract and university release) | 2026-10-24 | High |
| S67 | Distributed practice improves recall over massed practice (quantitative synthesis). | Cepeda, N. J., et al. Psychological Bulletin 132(3): 354 to 380, 2006. https://doi.org/10.1037/0033-2909.132.3.354 | P (via agent-ip references and [S63]) | 2026-10-24 | High |
| S68 | Optimal gap fell from about 20 to 40% of a one-week delay to about 5 to 10% of a one-year delay; 1,350+ participants. | Cepeda, N. J., Vul, E., Rohrer, D., Wixted, J. T., Pashler, H. Psychological Science 19: 1095 to 1102, 2008. https://doi.org/10.1111/j.1467-9280.2008.02209.x | P (abstract) | 2026-10-24 | High |
| S69 | Interleaving meta-analysis: g = 0.42 overall with heterogeneity; paintings g = 0.67; small effect for mathematics. | Brunmair, M., Richter, T. Psychological Bulletin 145(11): 1029 to 1052, 2019. https://doi.org/10.1037/bul0000209 | P (abstract and secondary) | 2026-10-24 | High for overall; medium for maths |
| S70 | Interleaved study of painters' styles improved later classification; learners still judged massed study better. | Kornell, N., Bjork, R. A. Psychological Science 19: 585 to 592, 2008. https://bjorklab.psych.ucla.edu/wp-content/uploads/sites/13/2016/07/Kornell_Bjork_2008_PsychScience.pdf | P | 2026-10-24 | High |
| S71 | Self-explanation prompts: g = 0.55 across 69 effect sizes from 64 reports. | Bisra, K., Liu, Q., Nesbit, J. C., Salimi, F., Winne, P. H. Educational Psychology Review 30(3): 703 to 725, 2018. https://doi.org/10.1007/s10648-018-9434-x | P (abstract) | 2026-10-24 | High |
| S72 | Generation effect about 0.40 SD across 86 studies and 445 effect sizes. | Bertsch, S., Pesta, B. J., Wiscott, R., McDaniel, M. A. Memory and Cognition 35(2): 201 to 210, 2007. https://pubmed.ncbi.nlm.nih.gov/17645161/ | P (abstract) | 2026-10-24 | High |
| S73 | Fluent lecturer raised predicted learning, not actual learning; small samples, short videos. | Carpenter, S. K., Wilford, M. M., Kornell, N., Mullaney, K. M. Psychonomic Bulletin and Review, 2013. https://doi.org/10.3758/s13423-013-0442-z | P (via secondary summaries) | 2026-10-24 | Medium-high |
| S74 | Active classes: more learning, lower feeling of learning; randomised, Harvard physics. | Deslauriers, L., McCarty, L. S., Miller, K., Callaghan, K., Kestin, G. PNAS 116(39): 19251 to 19257, 2019. https://doi.org/10.1073/pnas.1821936116 | P | 2026-10-24 | High |
| S75 | Multimedia principle: words and pictures beat words alone; pictures must support the explanation; extraneous detail hurts. | Mayer, R. E. "Research-based principles for designing multimedia instruction." Copy at https://www.unh.edu/teaching-learning-resource-hub/sites/default/files/media/2023-06/itow-research-based-principles-for-designing-multimedia-instruction-mayer.pdf | P (author's summary chapter) | 2026-10-24 | Medium-high |
| S76 | Laptop note-takers did worse on conceptual questions, attributed to verbatim copying. | Mueller, P. A., Oppenheimer, D. M. Psychological Science 25: 1159 to 1168, 2014. https://doi.org/10.1177/0956797614524581 (summary via FORRT replication atlas) | P (secondary summary) | 2026-10-24 | High that it claimed this |
| S77 | Direct replication (145 students): laptop users wrote more, more verbatim, but no quiz advantage for longhand; mini meta-analysis agrees. | Urry, H. L., et al. Psychological Science 32(3): 326 to 339, 2021. https://doi.org/10.1177/0956797620965541 | P (abstract and APS release) | 2026-10-24 | High |
| S78 | Second replication: small, non-significant differences between longhand and laptop. | Morehead, K., Dunlosky, J., Rawson, K. A. Educational Psychology Review, 2019. https://doi.org/10.1007/s10648-019-09468-2 | P (secondary summaries) | 2026-10-24 | Medium-high |
| S79 | 46 studies: reading and listening comprehension not reliably different (g = 0.07); reading advantage when self-paced and for inference. | Clinton-Lisell, V. Review of Educational Research, 2022. https://doi.org/10.3102/00346543211060871 (abstract via ERIC) | P (abstract) | 2026-10-24 | Medium-high |
| S80 | No adequate evidence that matching instruction to learning styles improves learning. | Pashler, H., McDaniel, M., Rohrer, D., Bjork, R. Psychological Science in the Public Interest 9(3): 105 to 119, 2008. https://doi.org/10.1111/j.1539-6053.2009.01038.x | P (abstract and summaries) | 2026-10-24 | High |
| S81 | The "10% of what they read" retention chart has no research basis and was wrongly attached to Dale's cone, which had no numbers. | Subramony, D. P., Molenda, M., Betrus, A. K., Thalheimer, W. Educational Technology 54(6): 6 to 16, 2014 (via ASEE paper and summaries). https://peer.asee.org/toward-eliminating-an-unsupported-statement-in-engineering-education-research-and-literature.pdf | S | 2026-10-24 | Medium-high |
| S82 | The "10% of the brain" claim is a myth; imaging shows most of the brain is used. | Scientific American, "Do People Only Use 10 Percent of Their Brains?" https://www.scientificamerican.com/article/do-people-only-use-10-percent-of-their-brains/ | S | 2026-10-24 | High |
| S84 | Nearly 1,000 high school maths students; GPT Base +48% and GPT Tutor +127% in practice; GPT Base 17% worse on exam without access; Tutor largely removed harm; "crutch". | Bastani, H., Bastani, O., Sungu, A., Ge, H., Kabakcı, Ö., Mariman, R. PNAS 122(26), 2025. https://ideas.repec.org/a/nas/journl/v122y2025pe2422633122.html | P (abstract) | 2026-10-24 | High |
| S85 | Randomised crossover, 194 eligible students; AI tutor: more learning in less time, median gains more than double, 49 vs 60 minutes; authors' limits and "should not replace in-person teaching". | Kestin, G., Miller, K., Klales, A., Milbourne, T., Ponti, G. Scientific Reports 15: 17458, 2025. https://pmc.ncbi.nlm.nih.gov/articles/PMC12179260/ | P | 2026-10-24 | High |
| S86 | Edo State, Nigeria: after-school English with Microsoft Copilot (GPT-4), six weeks, 0.31 SD overall, 0.23 SD English; larger gains for girls and higher baseline. | De Simone, M., Tiberti, F., et al. "From Chalkboards to Chatbots." World Bank Policy Research Working Paper WPS11125, May 2025; and World Bank blog. https://blogs.worldbank.org/en/education/From-chalkboards-to-chatbots-in-Nigeria | F (first-party working paper; abstract and blog read) | 2026-10-24 | Medium-high |
| S87 | 319 knowledge workers, 936 examples: confidence in GenAI linked to less critical thinking, self-confidence to more; thinking shifts to verification and integration. | Lee, H.-P., Sarkar, A., Tankelevitch, L., et al. CHI 2025. https://doi.org/10.1145/3706598.3713778 | P | 2026-10-24 | High |
| S88 | 54 participants, LLM vs search vs brain-only essays, EEG connectivity lower with more support; arXiv preprint, no peer-reviewed version found. | Kosmyna, N., et al. arXiv:2506.08872, 2025. https://arxiv.org/abs/2506.08872 | P (preprint) | 2026-10-24 | Medium (for what it reports); low as evidence |
| S89 | Comment raising concerns: sample size, reproducibility, EEG analysis, reporting, transparency. | Stanković, M., et al. "Comment on: Your Brain on ChatGPT." arXiv:2601.00856, 2026. https://arxiv.org/abs/2601.00856 | P (preprint comment) | 2026-10-24 | Medium |
| S90 | Tutor CoPilot RCT: 900 tutors, 1,800 students; +4 percentage points mastery, +9 with lower-rated tutors; fewer answers given away. | Wang, R. E., Ribeiro, A. T., Robinson, C. D., Loeb, S., Demszky, D. arXiv:2410.03017. https://arxiv.org/abs/2410.03017 | P | 2026-10-24 | High |
| S91 | 636 citations: about 55% fabricated (GPT-3.5), 18% (GPT-4); many real citations had errors. | Walters, W. H., Wilder, E. I. Scientific Reports 13: 14045, 2023. https://pmc.ncbi.nlm.nih.gov/articles/PMC10484980/ | P | 2026-10-24 | High |
| S92 | Hallucinated packages: at least 5.2% (commercial) and 21.7% (open-source) of the time; 205,474 unique names. | Spracklen, J., et al. "We Have a Package for You!" USENIX Security 2025. https://arxiv.org/abs/2406.10279 | P | 2026-10-24 | High |
| S93 | Five AI assistants consistently sycophantic across four tasks; humans and preference models sometimes prefer sycophantic answers. | Sharma, M., Tong, M., et al. ICLR 2024. https://arxiv.org/abs/2310.13548 | P | 2026-10-24 | High |
| S94 | GPT-4o update of 25 April 2025 made the model noticeably more sycophantic; rollback began 28 April. | OpenAI, "Expanding on what we missed with sycophancy," 2025-05-02. https://openai.com/index/expanding-on-sycophancy/ | F | 2026-10-24 | High |
| S95 | Users with an AI assistant wrote significantly less secure code and were more likely to believe it secure. | Perry, N., Srivastava, M., Kumar, D., Boneh, D. ACM CCS 2023. https://arxiv.org/abs/2211.03622 | P | 2026-10-24 | High |
| S96 | 89 scenarios, 1,689 programs; about 40% vulnerable. | Pearce, H., et al. "Asleep at the Keyboard?" IEEE S&P 2022. https://arxiv.org/abs/2108.09293 | P | 2026-10-24 | High |
| S97a | 16 experienced developers, 246 tasks; 19% longer with AI; forecast 24% faster, believed 20% faster; METR's own caveats; marked out of date. | METR, "Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity," 2025-07-10. https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/ | F (first-party research report) | 2026-10-24 | High |
| S97b | Follow-up with 57 developers and 800+ tasks suggests speedup, but METR calls the data "only very weak evidence" due to selection effects; design changing. | METR, "We are Changing our Developer Productivity Experiment Design," 2026-02-24. https://metr.org/blog/2026-02-24-uplift-update/ | F | 2026-10-24 | High |
| S98 | 22 public service media, 18 countries, 14 languages; 45% of answers with at least one significant issue; 31% sourcing problems; 20% major accuracy issues incl. outdated information. | EBU and BBC, "News Integrity in AI Assistants," October 2025. https://www.ebu.ch/research/open/report/news-integrity-in-ai-assistants | F (first-party report by broadcasters) | 2026-10-24 | High |
| S99 | Retrieval-based legal AI tools hallucinated 17% to 33% of the time despite "hallucination-free" claims. | Magesh, V., Surani, F., Dahl, M., Suzgun, M., Manning, C. D., Ho, D. E. Journal of Empirical Legal Studies 22: 216 to 242, 2025. https://isps.yale.edu/node/26123 | P | 2026-10-24 | High |
| S100 | No licence: exclusive copyright by default; no permission to use, modify or share; ask maintainers to add a licence. | choosealicense.com, "No License." https://choosealicense.com/no-permission/ | S (GitHub-run reference) | 2026-10-24 | High |
| S101 | MIT, Apache 2.0, GPLv3: permissions, conditions and limitations. | choosealicense.com, "Licenses." https://choosealicense.com/licenses/ | S | 2026-10-24 | High |
| S102 | Without a licence, default copyright applies and nobody may reproduce, distribute or create derivative works; public repos may be viewed and forked. | GitHub Docs, "Licensing a repository." https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository | P | 2026-10-24 | High |
| S103 | Checklist for active, welcoming projects (licence, commits, contributors, issue and PR responses, friendliness); start with projects you use. | Open Source Guides, "How to Contribute to Open Source." https://opensource.guide/how-to-contribute/ | S (GitHub-sponsored guide) | 2026-10-24 | High |
| S104 | Discover projects via Explore, topics, good first issue and help wanted labels, Trending. | GitHub Docs, "Finding ways to contribute to open source on GitHub." https://docs.github.com/en/get-started/exploring-projects-on-github/finding-ways-to-contribute-to-open-source-on-github | P | 2026-10-24 | High |
| S105 | Interview study: employers and job seekers treated GitHub activity traces as more reliable signals than CVs. | Marlow, J., Dabbish, L. CSCW 2013: 145 to 156. https://www.cs.cmu.edu/~xia/resources/Documents/Marlow-cscw13.pdf | P | 2026-10-24 | Medium-high (qualitative, dated) |
| S106 | Disclose AI use at submission; AI not an author; humans responsible; AI output not a primary source. | ICMJE, "AI Use by Authors." https://www.icmje.org/recommendations/browse/artificial-intelligence/ai-use-by-authors.html | P (standard) | 2026-10-24 | High |
| S107 | AI tools cannot be authors; disclose how and which tool was used; authors fully responsible. | COPE, "Authorship and AI tools." https://publicationethics.org/guidance/cope-position/authorship-and-ai-tools | P (standard) | 2026-10-24 | High |
| S108 | Samsung banned staff use of generative AI after staff uploaded sensitive code to ChatGPT; memo cited difficulty of retrieving data from external servers (May 2023). | Bloomberg, "Samsung Bans Staff's AI Use After Spotting ChatGPT Data Leak," 2023-05-02. https://www.bloomberg.com/news/articles/2023-05-02/samsung-bans-chatgpt-and-other-generative-ai-use-by-staff-after-leak | S (paywalled; summary and other reports read) | 2026-10-24 | Medium-high |
| S109 | GitHub found 39 million secret leaks in 2024; push protection on by default for public repositories. | GitHub Blog, "GitHub found 39M secret leaks in 2024." https://github.blog/security/application-security/next-evolution-github-advanced-security/ | F | 2026-10-24 | High |
| S110 | About 29 million new hardcoded secrets in public GitHub commits in 2025 (+34%); AI-service secrets +81%. | GitGuardian, State of Secrets Sprawl 2026, as reported by The Hacker News. https://thehackernews.com/2026/03/the-state-of-secrets-sprawl-2026-9.html | S (secondary report of vendor research) | 2026-10-24 | Medium |
| S111 | Median 66 days to automaticity plateau, modelled range 18 to 254 days; 96 volunteers; limits. | Lally, P., van Jaarsveld, C. H. M., Potts, H. W. W., Wardle, J. European Journal of Social Psychology 40: 998 to 1009, 2010. https://doi.org/10.1002/ejsp.674 | P (abstract and summaries) | 2026-10-24 | High for median and range |
| S112 | Deliberate practice explained 26% (games), 21% (music), 18% (sports), 4% (education), under 1% (professions) of variance. | Macnamara, B. N., Hambrick, D. Z., Oswald, F. L. Psychological Science 25(8): 1608 to 1618, 2014. https://pmc.ncbi.nlm.nih.gov/articles/PMC4101876/ | P | 2026-10-24 | High |
| S113 | Gaza, late 2025: 71% accessed internet at least once (11% continuous, 60% intermittent), 29% none; smartphone ownership about 35%; 98% poor coverage; April 2026 coverage about 96% in middle Gaza. | Palestinian Central Bureau of Statistics, press release for World Telecommunication Day, 2026-05-17. https://www.pcbs.gov.ps/en/post-details/?postId=26011 | P (national statistics office) | 2026-10-24 | High |
| S114 | Near-total absence of reliable electricity in Gaza; reliance on backup generators. | OCHA oPt, Humanitarian Situation Report, 11 September 2026. https://www.ochaopt.org/content/humanitarian-situation-report-11-september-2026 | P (UN situation report) | 2026-10-24 | High |
| S115 | "Connectivity in Gaza remains severely constrained." | OCHA, oPt Humanitarian Situation Report, 25 May 2026. https://www.unocha.org/publications/report/occupied-palestinian-territory/opt-humanitarian-situation-report-25-may-2026 | P | 2026-10-24 | High |
| S116 | Anthropic's AI Fluency course teaches the 4D framework: Delegation, Description, Discernment, Diligence. | Anthropic Academy, "AI Fluency: Framework and Foundations." https://anthropic.skilljar.com/ai-fluency-framework-foundations | F | 2026-10-24 | High |
| S117 | Coursera "Learning How to Learn" by Oakley and Sejnowski teaches study techniques for tough subjects. | Coursera course page. https://www.coursera.org/learn/learning-how-to-learn | F | 2026-10-24 | High |

**Count:** 117 claim rows (IDs S1 to S117; S83 is not used; S97 is split into S97a and S97b). Each row summarises one or more closely related claims from one source; **117 sourced claim rows**.

## Unverified claims (do not use as fact in learner-facing text)

| # | Claim | Status | How chapters should phrase it |
|---|---|---|---|
| U1 | Audio Overviews run 40 to 60 minutes. | No source gives any minute figure; a tech site reported "about 30 minutes" for Longer in a test; Longer is English only [S3]. | "Audio overviews can be short or long; check what your tool offers." No minutes. |
| U2 | Free Gemini Notebook limits (for example 3 audio overviews a day). | Old third-party figures; replaced by compute-based limits [S6]. | No numbers. |
| U3 | Downloading an Audio Overview from the web version works on a phone browser. | Web download exists [S3]; phone behaviour not tested. | "Try the download option in your browser; if it fails, use the provided summary." Instructors to test (open question). |
| U4 | Notebooks are available inside the Gemini app on mobile for free users, including in Palestine. | Secondary reports only. | Do not mention until tested. |
| U5 | Claude.ai has a "Learning" style for all users including Free. | Secondary reports (2025); help page not reachable. | "Some chat tools have a learning mode; check yours." |
| U6 | Gemini Guided Learning works in Arabic and in Palestine. | Help page silent; some learning resources US and English only [S16]. | "Check if it works in your language." |
| U7 | Exact free quotas for ChatGPT images, uploads, or Gemini prompts. | Providers publish none or change them [S14, S20]. | No numbers. |
| U8 | The Gemini, Gemini Notebook, ChatGPT and Claude iPhone apps can be installed in Palestine. | Not checked per store; Gemini Notebook iPhone list excludes Palestine [S8]. | Browser path first. |
| U9 | Perplexity's supported countries and minimum age. | Not found on pages read. | Mention only as an example; give fallback. |
| U10 | Obsidian runs on Android and iOS for free. | Not checked on an official page in this pass. | Name Joplin for phones [S50]; check Obsidian before naming it for phones. |
| U11 | iximiuz labs or Google Cloud Shell work from Gaza for free. | Named by a forum post [S57]; not checked. | Do not name; Codespaces is the browser path. |
| U12 | Docker Desktop, OneNote, Microsoft account, LinkedIn, Medium, DEV, Hashnode work from Gaza. | Not checked. | Offer the GitHub Markdown fallback. |
| U13 | A pooled multimedia meta-analysis found g = 0.37. | Seen only in a search summary. | Do not quote a size. |
| U14 | The MIT authors asked journalists not to use "brain rot". | Secondary report. | Do not use. |
| U15 | Study modes (ChatGPT, Gemini) improve learning outcomes. | No RCT found. | "These modes are designed to make you think; no large study has tested them yet that we found." |
| U16 | Audio Overviews have a measured error rate. | No independent study found. | "Google says they may contain mistakes." [S3] |
| U17 | A tested method for reading an unfamiliar codebase. | No primary source read. | Present as the course's steps. |
| U18 | Learning in public helps people get hired. | Practitioner essay only; one dated interview study on GitHub signals [S105]. | "Sharing your work gives people something to check." Course recommendation. |
| U19 | Strong projects take about six months. | No source. | "Our plan uses six months, because strong projects take time to learn and build." Sponsor's rule. |
| U20 | Paltel or ITU statements on Gaza connectivity in 2026. | Not read. | Use PCBS and OCHA only [S113 to S115], and only in instructor notes. |
| U21 | Missing a single day does not affect habit formation. | Commonly reported from Lally et al.; abstract not checked for this sentence. | Optional; say "one missed day is not the end of a habit" as encouragement, without citing. |
| U22 | "If a key is pushed, treat it as stolen and rotate it." | Standard practice; not sourced here. | Course advice; acceptable unattributed. |
| U23 | Bastani et al. study took place in Türkiye. | Not on the abstract page read. | Say "high school students" only. |

**Count:** 23 unverified claims.

## Open questions for instructors

1. **Tool name.** Use "Gemini Notebook (formerly NotebookLM)" once per module, or name only the job ("a source-grounded notebook")? The sponsor's intake used NotebookLM [S1].
2. **Audio length.** Drop "40 to 60 minutes" (recommended), or keep it as "you can ask for a long overview" with no number? (U1)
3. **Ages.** Are all fellows 18 or over? If not, Claude is out [S26], Gemini Notebook Deep Research is out [S4], ChatGPT needs a guardian's permission [S22], and LinkedIn needs 16+ [S61].
4. **Field test from Gaza.** Can two or three fellows test, on a phone, in Gaza, in November 2026: Gemini Notebook web (create a notebook, make an audio overview, download it), the Gemini web app, ChatGPT, Claude, GitHub sign-up and a Codespace, Joplin install? Record results in the decision log. This is the only way to resolve U3, U8, U11 and U12.
5. **Education accounts.** Can the fellowship provide Google Workspace for Education accounts? Their notebook content is not human-reviewed or used for training [S7].
6. **Six months.** Confirm the six-month horizon is presented as the sponsor's planning rule (U19).
7. **Platforms.** May chapters name LinkedIn, DEV, Hashnode and Medium, or only "a professional network" and "a developer blog site"? (The sponsor's tool-naming decision may or may not cover platforms.)
8. **Public by default.** Must the capstone write-up be public, or may a fellow show it privately to the mentor for safety reasons?
9. **Restart policy.** Which restart policy does the system design course's URL shortener use? The "stop a container" prediction depends on it [S56].
10. **GitHub Education.** Are fellows enrolled in a degree or diploma programme that would make them eligible for student benefits [S41]?
11. **Copilot training.** Should module 2 tell fellows to opt out of GitHub Copilot interaction-data training [S44], or is that a settings tour the course avoids?

## Handoff

```yaml
artifact: research-dossier
course: build-with-ai
version: 1
sources_checked: 2026-10-24
sourced_claim_rows: 117
unverified_claims: 23
hard_constraints:
  - Tools change monthly; NotebookLM became Gemini Notebook on 2026-07-16 and changed limits on 2026-09-02; teach jobs and habits
  - Uneven access from Palestine; web versions listed, Gemini Notebook mobile app and Gemini Android download list not
  - Phones, costly data, power cuts; offline notes, optional audio, owned files
  - Arabic output available, but some features English only
  - Ages and training defaults differ per tool; Claude 18+
out_of_scope:
  - How AI works, building AI products, prompt engineering
  - Docker and system design beyond one lab
  - Tool rankings, feature tours, quotas
  - Full note systems and spaced repetition software
  - Licence law beyond MIT, Apache 2.0, GPL, none
  - Audience growth and video production
  - Learning styles and retention pyramids
open_questions:
  - Name Gemini Notebook (formerly NotebookLM) or only the job
  - Drop the 40 to 60 minute audio claim
  - Are all fellows 18+
  - Field test of each tool on a phone in Gaza
  - Education accounts for stronger privacy
  - Six months stated as the sponsor's rule
  - Name sharing platforms or not
  - Public or private capstone write-up
  - Restart policy in the URL shortener lab
  - Student benefit eligibility
  - Copilot training opt-out in module 2
top_outline_changes:
  - M2 becomes jobs, not tools, with an access check per tool
  - Privacy and checking output move to the start of M2
  - M1 adds the evidence chapter (AI helps or harms depending on use)
  - M3 shows the fluency trap as an experience, and drops the 40 to 60 minute audio claim
  - M4 adds check-before-install and a pre-push checklist, and uses Codespaces instead of Play with Docker
```
