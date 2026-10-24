---
artifact: research-dossier
course: faith-and-resilience
version: 1
status: accepted at G1 on 2026-10-24 by the curriculum architect (orchestrator), with its outline changes applied; scholar review pending
owner: research
sources_checked: 2026-10-24
hard_constraints:
  - Only Quran verses and sahih or hasan hadith from recognised collections, each with a checked number, grading and grader; several popular sayings fail this test and must be replaced
  - Arabic first, English second, on phones with power cuts; every Arabic text must be copied from the dossier, never typed from memory
  - No war, battles or politics as case material, yet several key verses and stories (2:216, 3:139, 3:159, 3:173, Ka'b ibn Malik, Ta'if) sit in battle contexts and need careful wording or replacement
  - Learners live with loss and displacement; grief, despair and self-harm must be handled with safe wording, a named human contact and no drama, and the course must never imply that sadness means weak faith
  - Graded keys may test only what a cited source says or the difference between two taught ideas; matters where scholars differ (istikhara follow-up, some gradings) go to open questions
out_of_scope:
  - Fiqh rulings (prayer, fasting, money, work, medicine) beyond what a cited source states plainly
  - Theology debates on qadr and free will, and comparison of schools or sects
  - Weak, fabricated or disputed hadith presented as the Prophet's words
  - Battle narratives, war stories and political interpretation of verses
  - Dream interpretation, numerology and "signs" after istikhara
  - Counselling, therapy techniques and any discussion of self-harm methods
  - Sira details that are not in the hadith collections, unless labelled as "the sira books say"
open_questions:
  - Use Tirmidhi 2499 ("every son of Adam errs", grading disputed) or teach the same idea with Muslim 2749 and Quran 3:135?
  - Use Tirmidhi 983 (the dying young man who hoped and feared; hasan by later graders, mursal by early critics) or teach hope and fear with Bukhari 7405, Muslim 2755 and Quran 7:56 and 17:57 only?
  - Accept Tirmidhi 2517 "tie it and trust" as hasan (supported by Ibn Hibban 731) despite the early criticism of the Anas chain?
  - Which wording does the scholar approve for what to do after istikhara, given the differences listed in this dossier?
  - Which battle-context verses and stories may be cited at all (2:216, 3:159, 3:173, 9:40, Ta'if, Ka'b ibn Malik)?
  - Which script for Quran Arabic in chapters: the simple (imla'i) script used here or the Uthmani script?
  - Muslim 2664: sunnah.com vocalises the phrase as qadaru Allah; the request and many books say qaddara Allah; which should learners see?
  - Who is the named wellbeing contact (mentor or fellowship coordinator) in every chapter, and may mentors receive a list of Gaza support services?
---

# Research dossier: faith-and-resilience (Steady Hearts)

This is a decision aid for the curriculum architect, the chapter writers and the scholar who reviews the course. Each finding gives the source, the number, the grading and who graded it, the Arabic where it is useful, a short meaning we may use, and "phrase it this way" notes. Claims carry a source ID in square brackets, for example [S6]. The source table near the end gives the URL, the type, the date checked and a confidence level. Every page cited was opened on 2026-10-24.

**Rule for writers.** Use only what this dossier marks as usable. Anything in the "do not use" table, anything marked UNVERIFIED, and anything this dossier does not contain must not reach learners as a fact.

**Conventions used in this file**

- **Quran references** are surah:ayah, for example 31:34. Arabic is copied from quran.com (API v4, field `text_imlaei`, the simple script with full vowel marks) [S1]. The Uthmani script is also available from the same source if the scholar prefers it (open question).
- **"Meaning"** is our own short paraphrase. It was checked against three translations on quran.com: Sahih International, M.A.S. Abdel Haleem, and The Clear Quran by Mustafa Khattab [S1, S2]. A meaning is not the Quran; chapters must say "meaning" or paraphrase.
- **Hadith numbers** are sunnah.com reference numbers (the number in the sunnah.com URL, shown as "Reference" on the page). For Sahih Muslim, sunnah.com adds a letter for parallel chains (for example 918a); chapters may write "Sahih Muslim 918". The in-book reference is given where it helps a reviewer find the text.
- **Gradings.** A hadith in Sahih al-Bukhari or Sahih Muslim needs no further grading. For other collections the grading shown on sunnah.com (Darussalam or al-Albani) is given first, then al-Albani and others as listed on dorar.net [S57]. Where graders disagree, this file says so.
- **Arabic of hadith** is copied from the matn (the Prophet's words) on sunnah.com. Invisible direction marks were removed; nothing else was changed.
- **Arabic blocks** in this file are introduced by a line that starts "Arabic [reference]". Writers copy the block character for character.
- **Machine check.** On 2026-10-24 every Quran Arabic line in this file (42 lines) was compared by script with the quran.com API text, and every hadith Arabic line (53 lines) with the sunnah.com page text; all matched after Unicode NFC normalisation (which only reorders vowel marks such as shadda and fatha and does not change what is displayed). The two quoted scholarly sentences ([S58], [S65]) were compared by eye with the pages. A human check by the scholar is still required (checklist item 21).

## Learner and context

**Who.** Gaza fellowship fellows building careers in tech and remote work. Almost all are Muslim; the course deepens and applies what they already hold. Arabic first, English second. (Course brief.)

**Context that shapes every chapter.** Fellows live with power and internet cuts, unclear futures, clients who go silent, scholarships that may not come, displacement and loss. (Course brief.) Many will have lost family members or homes. The sources this course uses speak directly to that experience (loss in 2:155 to 157, grief in 12:84 to 86, the Prophet's tears in Bukhari 1303), which makes the content powerful and also means it can hurt. The safety notes in this dossier are part of the evidence, not decoration.

**What they already know.** Prayer, the Quran, the Prophet, peace be upon him, and most of the famous phrases (inna lillahi, hasbuna Allah, qaddara Allah). Many will know popular sayings that are weak (see the do-not-use table). Some will know the Arabic of a verse or dua better than any English rendering; the course must not "correct" a learner's Arabic with an English paraphrase.

**Device and connection.** Phones, weak data, power cuts. Arabic script must render on phones: keep Arabic blocks short (one verse or one dua), on their own line.

## Domain model

### The three relationships the course teaches

1. **What only Allah knows and decides, and what the learner does.** The unseen (ghayb) and the decree (qadr) belong to Allah [31:34, 6:59, Muslim 8]. The learner's part is the present step: seek what benefits, ask Allah for help, do not give up, do not dwell on "if only" [Muslim 2664]. Belief in qadr is given as a reason to act, not to stop [Bukhari 4949].
2. **Trust together with means.** Tawakkul is reliance of the heart on Allah while the limbs take the means [S58 quoting Ibn Rajab; Tirmidhi 2517; Bukhari 1523]. The Prophet planned the Hijra in detail and also said "do not grieve, Allah is with us" [Bukhari 3905; 9:40].
3. **Responses of the heart and tongue in good and bad times.** Gratitude in ease, patience in hardship [Muslim 2999]; grief is human and allowed [Bukhari 1303]; hope and fear together [7:56, 17:57]; words and duas for hard moments [Muslim 918, Bukhari 6346, Tirmidhi 3505, Bukhari 6369].

### Glossary of Arabic terms (plain English for chapters)

| Term (spelling for chapters) | Plain English | Common misunderstanding to correct gently |
|---|---|---|
| tawakkul | Trusting Allah with your heart while you do the work with your hands. | "Tawakkul means I do not need to plan." Bukhari 1523 records people who travelled without food, called themselves "the ones who trust", and ended up begging; the Quran told them to take provisions [S12]. Also do not confuse it with "tawakul" (relying on others, laziness); Arabic writers sometimes use tawakul and tawaakul for the false kind. The second spelling is a teaching aid only; no source was checked for it. |
| sabr | Patience: holding yourself steady in hardship, keeping your tongue and actions right, and keeping going. | "Sabr means silence, hiding need or never crying." Yaqub, peace be upon him, wept and complained to Allah and still had beautiful patience [12:84 to 87]. |
| qadr | Allah's decree: Allah knows and has decided all things. Belief in it is one of the six parts of iman [Muslim 8]. | "Qadr means effort is pointless." The Prophet's answer was "act" [Bukhari 4949]. |
| shukr | Gratitude: noticing a blessing, thanking Allah for it with heart and tongue, and using it well. | "Gratitude means pretending everything is fine." Gratitude sits next to patience, not in place of it [Muslim 2999]. |
| dua | Calling on Allah: asking Him for what you need, in any language, at any time. | "Dua replaces action." The Prophet made dua and took means in the same story [Bukhari 3905; 9:40]. |
| raja' | Hope in Allah's mercy. | "Hope means I can be careless." Hope is paired with fear [7:56, 17:57]. |
| khawf | Fear of Allah: the awareness that keeps you careful about wrongdoing. | "Fear means despair." Despair of Allah's mercy is itself condemned [12:87, 15:56, 39:53]. |
| istikhara | Asking Allah to choose the good for you in a permissible decision, with a short prayer and the dua the Prophet taught [Bukhari 1166]. | "Istikhara needs a dream or a sign." No sound text requires one [S61, S62, S63]. |
| shura | Consultation: asking people who know and who care before deciding. | "Consulting shows weakness." The Quran praises believers whose affairs are by consultation [42:38]. |
| niyyah | Intention: what you are aiming for in your heart when you act. | "Intention matters only for worship." Spending on family with a good intention is rewarded [Bukhari 56]. |
| ihsan | Doing a thing well and beautifully; also worshipping Allah as if you see Him [Muslim 8, Muslim 1955]. | "Ihsan is only for big deeds." Muslim 1955 says Allah has prescribed it in everything. |
| istirja | Saying "inna lillahi wa inna ilayhi raji'un" (we belong to Allah and to Him we return) when a loss happens [2:156]. | "It is only for deaths." The verse says any calamity (musibah), and Muslim 918 uses it for any affliction. |
| tawbah | Turning back to Allah after a mistake: stopping, regretting, asking forgiveness, and not persisting [3:135]. | "My mistake is too big." [39:53] |
| ghayb | The unseen: what is hidden from us, such as the future, which only Allah fully knows [6:59, 27:65]. | "Fortune tellers or apps can know it." Out of scope; do not discuss. |
| rizq | Provision: everything Allah gives you to live on, including income, food, health and people. | "Rizq comes without effort." The birds still fly out each morning [Tirmidhi 2344]. |

## Hard constraints

1. **Source discipline on a topic full of popular sayings.** Some of the best-known lines on this topic are weak or fabricated (for example "ma khaba man istakhara" and the Ta'if dua). Writers who rely on memory will introduce them. Architecture consequence: the writer pack's rule "only the dossier" must be absolute, and quiz keys may test only dossier sources.

2. **Battle contexts in core sources.** 2:216 begins with fighting being prescribed; Ibn Kathir explains 3:139 through the losses at Uhud, 3:173 through Hamra' al-Asad after Uhud, and illustrates 3:159 with consultations before Badr and Uhud [S3a]; 9:40 sits in a passage urging believers to go out when called, though the part we use describes the cave; Ka'b ibn Malik's story is about the Tabuk expedition [S51]; the Ta'if hadith starts with Aisha asking about Uhud. Architecture consequence: each such source has a "phrase it this way" note below, and several are replaced with non-war sources.

3. **Loss and grief are real for these learners.** Verses about loss, death and patience can read as "your suffering is good for you". Architecture consequence: every chapter on hardship must say that sadness is human (Bukhari 1303), must not say that hardship is a gift or a lesson, and must name a real person to talk to. No canvas may model reward, sin or decree.

4. **Scholarly difference must stay out of graded keys.** Istikhara follow-up, the status of some hadith, and how much weight a feeling carries after istikhara are matters where scholars differ. Architecture consequence: quizzes test the agreed core (istikhara is for permissible choices, no dream is required, consult and research first) and leave the rest to open questions.

5. **Arabic must be exact and short.** Learners read Arabic better than English, so an error in Arabic will be noticed at once and will damage trust. Architecture consequence: Arabic only from this dossier, at most two blocks per chapter (writer pack), each checked by the scholar.

## Translations and copyright

- **Sahih International** (shown on quran.com). Published 1997 by Abul-Qasim Publishing House, Jeddah, according to library catalogue records found in search results; no reuse terms were found [S72]. Treat as in copyright.
- **M.A.S. Abdel Haleem** (shown on quran.com and served by its public API). Reuse terms not checked. Treat as in copyright.
- **The Clear Quran, Mustafa Khattab** (the default English on quran.com). The QUL resource page says Furqaan Institute of Quranic Education holds "the exclusive license to publish, distribute, and disseminate" [S69]; the publisher's footer shows copyright held by Al-Furqaan Foundation [S70]. The publisher's own copyright page needs a login and could not be read. Search snippets say reproduction needs written consent, with a narrow exception for 501(c)(3) educational use: **UNVERIFIED**.
- **Policy for chapters (from the brief and writer pack):** paraphrase in our own words, label it "meaning", and quote a named translation only in short pieces (under 15 words, at most one per chapter, with the translation named). Hadith English on sunnah.com is also a published translation; paraphrase it the same way. Arabic text of the Quran and hadith may be quoted for short passages.

## Findings by topic

Each verse entry gives: reference and surah, Arabic (key phrase), meaning (ours), translations checked, and context. Each hadith entry gives: collection and number, narrator, grading, meaning, and Arabic where useful.

### 1. The unseen and Allah's knowledge; our part is the present step

**Quran 31:34 (Surah Luqman, 31)** [S1, S2]
- Arabic [Quran 31:34, S1]:
  > وَمَا تَدْرِي نَفْسٌ مَّاذَا تَكْسِبُ غَدًا
- Meaning: Only Allah knows when the Hour will come; He sends the rain and knows what is in the womb. No one knows what they will earn tomorrow, or in which land they will die.
- Checked against Sahih International, Abdel Haleem, The Clear Quran. All three render the key phrase as no soul knowing what it will earn (or reap) tomorrow.
- Use: the anchor verse for module 1. It names tomorrow's earnings directly, which fits freelancers and job seekers.

**Quran 6:59 (Surah al-An'am, 6)** [S1, S2]
- Arabic [Quran 6:59, S1]:
  > وَعِندَهُ مَفَاتِحُ الْغَيْبِ لَا يَعْلَمُهَا إِلَّا هُوَ
- Meaning: Allah holds the keys of the unseen; only He knows them. He knows what is on land and in the sea; not a leaf falls without His knowledge.
- Checked against all three translations.

**Quran 27:65 (Surah an-Naml, 27)** [S1, S2]
- Arabic [Quran 27:65, S1]:
  > قُل لَّا يَعْلَمُ مَن فِي السَّمَاوَاتِ وَالْأَرْضِ الْغَيْبَ إِلَّا اللَّهُ
- Meaning: Say: no one in the heavens or the earth knows the unseen except Allah.
- Checked against all three translations.

**Quran 2:216 (Surah al-Baqarah, 2): flag, battle context**
- Arabic of the general clause [Quran 2:216, S1]:
  > وَعَسَىٰ أَن تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَّكُمْ
- Meaning of the general clause: You may dislike something that is good for you, and like something that is bad for you; Allah knows and you do not.
- Context: the verse opens with fighting being prescribed and disliked; Ibn Kathir explains it as the verse that made fighting obligatory [S1, S3a]. All three translations begin with fighting.
- **Recommendation:** do not use it as an anchor. If the scholar approves, cite only the general clause with the reference and no story. Safer verses for "Allah knows what is best when I cannot see it" are 12:100 (my Lord is subtle in what He wills) and 31:34.

**Phrase it this way**
- "Only Allah knows what tomorrow brings (Quran 31:34). Our part is today's step." This is the course's summary, not a quotation.
- Do not say "nothing you do changes anything". Pair every unseen verse with Muslim 2664 (topic 3).

### 2. Life as a test and its purpose

**Quran 67:2 (Surah al-Mulk, 67)** [S1, S2]
- Arabic [Quran 67:2, S1]:
  > الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا
- Meaning: Allah created death and life to test which of you is best in deeds.
- Note for writers: the test is "best in deeds", which links straight to ihsan (topic 14).

**Quran 2:155 to 157 (Surah al-Baqarah, 2)** [S1, S2]
- Arabic of 2:156 [Quran 2:156, S1]:
  > الَّذِينَ إِذَا أَصَابَتْهُم مُّصِيبَةٌ قَالُوا إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ
- Meaning: Allah will test people with some fear, hunger, and loss of wealth, lives and crops; give good news to the patient: those who, when a calamity strikes, say "We belong to Allah and to Him we return". On them are blessings and mercy from their Lord, and they are the guided.
- Checked against all three translations.
- Sensitivity: the verse names loss of lives. Do not use it as a lesson that loss is "good"; use it to show what the believer says and what Allah promises to the patient.

**Quran 29:2 to 3 (Surah al-'Ankabut, 29)** [S1, S2]
- Arabic [Quran 29:2, S1]:
  > أَحَسِبَ النَّاسُ أَن يُتْرَكُوا أَن يَقُولُوا آمَنَّا وَهُمْ لَا يُفْتَنُونَ
- Meaning: Do people think they will be left to say "we believe" without being tested? Those before them were tested too.
- Note: 29:3 speaks of Allah making clear who is truthful and who is lying. Do not apply "liars" to anyone in a case.

**Quran 51:56 (Surah adh-Dhariyat, 51)** [S1, S2]
- Arabic [Quran 51:56, S1]:
  > وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ
- Meaning: Allah created jinn and humans only to worship Him.
- Use: purpose. Combine with Bukhari 56 and 1 (topic 13) so "worship" is not read as only ritual: a good intention turns daily work into worship.

**Quran 2:286 (Surah al-Baqarah, 2)** [S1, S2]
- Arabic of the opening clause [Quran 2:286, S1]:
  > لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا
- Meaning: Allah does not place on any soul more than it can bear.
- Note: quote only the opening clause or the duas in the middle ("do not burden us with what we cannot bear"). The last clause asks for help against the disbelieving people; leave it out.
- Common misuse: saying this verse to someone in pain as "so stop complaining". The verse is about what Allah requires (the duties He sets); it is comfort, not a demand. Phrase: "Allah does not ask of you more than you can carry."

**Quran 94:5 to 6 (Surah ash-Sharh, 94)** [S1, S2]
- Arabic [Quran 94:5, S1]:
  > فَإِنَّ مَعَ الْعُسْرِ يُسْرًا
- Arabic [Quran 94:6, S1]:
  > إِنَّ مَعَ الْعُسْرِ يُسْرًا
- Meaning: With hardship comes ease; truly, with hardship comes ease.
- Translations differ slightly: Sahih International "with hardship [will be] ease"; Abdel Haleem "where there is hardship there is also ease"; Khattab adds "with that hardship comes more ease" [S1, S2]. The word "with" (ma'a) is in the Arabic; keep "with", not "after".
- Related: 65:7 says Allah will bring ease after hardship [S1, S2]:
  - Arabic [Quran 65:7, S1]:
    > سَيَجْعَلُ اللَّهُ بَعْدَ عُسْرٍ يُسْرًا

**Hardship is not a sign of Allah's anger (sound hadith for module 1 or 3)**
- **Jami' at-Tirmidhi 2398**, from Sa'd ibn Abi Waqqas, may Allah be pleased with him: asked which people are tested most severely, the Prophet said the prophets, then those most like them, and so on; a person is tested according to the strength of his religion [S53]. Grading: Tirmidhi "hasan sahih"; Darussalam on sunnah.com: Hasan; al-Albani: Sahih (Sahih al-Jami' 992) [S53, S57g].
  - Arabic of the answer [Jami' at-Tirmidhi 2398, S53]:
    > الأَنْبِيَاءُ ثُمَّ الأَمْثَلُ فَالأَمْثَلُ
- **Sahih al-Bukhari 5641 and 5642**, from Abu Sa'id al-Khudri and Abu Hurairah: no tiredness, illness, worry, sadness, hurt or distress reaches a Muslim, even a thorn's prick, except that Allah removes some of his sins by it [S54].
- **Jami' at-Tirmidhi 2396**, from Anas: great reward comes with great trial, and when Allah loves a people He tests them [S53]. Grading: Tirmidhi "hasan gharib"; Darussalam: Hasan; al-Albani: Hasan [S57g]. Use with care (see sensitive areas): never say it to a grieving person as an explanation of their loss.

**Phrase it this way**
- "Hard times come to the best people. The prophets were tested most (Jami' at-Tirmidhi 2398). Hardship is not a sign that Allah is angry with you."
- Do not say "this happened because Allah loves you" about a learner's own loss. Say what the source says, in general terms, and move to what helps now.

### 3. Qadr with effort

**Sahih Muslim 8 (8a on sunnah.com)**, the hadith of Jibril, narrated by Abdullah ibn Umar from his father Umar ibn al-Khattab, may Allah be pleased with them [S4]. Sahih (in Muslim).
- Arabic of the qadr phrase [Sahih Muslim 8, S4]:
  > وَتُؤْمِنَ بِالْقَدَرِ خَيْرِهِ وَشَرِّهِ
- Meaning: Iman is to believe in Allah, His angels, His books, His messengers, the Last Day, and to believe in the decree, its good and its bad.
- Note: the same hadith defines ihsan (to worship Allah as if you see Him). The opening of Muslim 8 is about a group in Basra who denied qadr; leave that history out.

**Sahih al-Bukhari 4949 and Sahih Muslim 2647 (2647a)**, narrated by Ali ibn Abi Talib, may Allah be pleased with him [S5]. Sahih.
- Context: at a funeral, the Prophet said everyone's place is already written. The companions asked whether they should rely on what is written and leave deeds. He said: act, for everyone is eased toward what he was created for.
- Arabic [Sahih al-Bukhari 4949, S5]:
  > اعْمَلُوا فَكُلٌّ مُيَسَّرٌ لِمَا خُلِقَ لَهُ
- Meaning we may use: "Keep doing good deeds; each person is made able to do what he was created for." The key point for the course: the companions asked the exact "then why try?" question, and the Prophet's answer was "act".
- Number check: Bukhari 4949 on sunnah.com is this hadith (Book 65, Hadith 471).

**Sahih Muslim 2664**, narrated by Abu Hurairah, may Allah be pleased with him [S6]. Sahih.
- Arabic [Sahih Muslim 2664, S6]:
  > الْمُؤْمِنُ الْقَوِيُّ خَيْرٌ وَأَحَبُّ إِلَى اللَّهِ مِنَ الْمُؤْمِنِ الضَّعِيفِ وَفِي كُلٍّ خَيْرٌ احْرِصْ عَلَى مَا يَنْفَعُكَ وَاسْتَعِنْ بِاللَّهِ وَلاَ تَعْجِزْ
- Arabic of the second half [Sahih Muslim 2664, S6]:
  > وَإِنْ أَصَابَكَ شَىْءٌ فَلاَ تَقُلْ لَوْ أَنِّي فَعَلْتُ كَانَ كَذَا وَكَذَا
  > وَلَكِنْ قُلْ قَدَرُ اللَّهِ وَمَا شَاءَ فَعَلَ فَإِنَّ لَوْ تَفْتَحُ عَمَلَ الشَّيْطَانِ
- Meaning: The strong believer is better and more beloved to Allah than the weak believer, and there is good in both. Be keen on what benefits you, seek Allah's help, and do not give up. If something befalls you, do not say "if only I had done this, it would have been that", but say "Allah decreed, and He did what He willed", for "if only" opens the door to Satan's work.
- **Vocalisation note for the scholar:** sunnah.com vowels the phrase as قَدَرُ اللَّهِ (qadaru Allah, "it is Allah's decree"). Many books and the request for this dossier have qaddara Allah (قَدَّرَ اللَّهُ, "Allah decreed"). Both readings are reported in commentaries (not checked here). Writers should copy the sunnah.com form above unless the scholar decides otherwise (open question).
- This is the single most useful hadith for the course: it puts effort, dua and acceptance in one sentence, and it names "if only" as the trap.

**Jami' at-Tirmidhi 2516**, from Ibn Abbas, may Allah be pleased with him [S7].
- Grading: Tirmidhi: "hasan sahih" (sunnah.com edition); Darussalam: Hasan; al-Albani: Sahih (Sahih at-Tirmidhi 2516); Shu'ayb al-Arna'ut: "isnad qawi" in his notes on the Musnad [S7, S57h]. Usable.
- Arabic [Jami' at-Tirmidhi 2516, S7]:
  > وَاعْلَمْ أَنَّ الأُمَّةَ لَوِ اجْتَمَعَتْ عَلَى أَنْ يَنْفَعُوكَ بِشَيْءٍ لَمْ يَنْفَعُوكَ إِلاَّ بِشَيْءٍ قَدْ كَتَبَهُ اللَّهُ لَكَ
- Meaning: Be mindful of Allah and He will protect you. When you ask, ask Allah; when you seek help, seek it from Allah. If all people gathered to benefit you, they could only benefit you with what Allah has written for you, and if they gathered to harm you, they could only harm you with what Allah has written against you.
- Note: the text on sunnah.com ends with "the pens have been lifted and the pages have dried". Longer versions of this hadith that circulate in books (for example with "know that ease comes with hardship") were not checked here. Do not add any ending beyond this text.

**The mainstream position in one paragraph (for writers)**
Belief in qadr is part of iman [Muslim 8], and it never cancels effort or responsibility: the companions asked exactly that question and were told to act [Bukhari 4949], and the Prophet told believers to be keen on what benefits them and not give up [Muslim 2664]. The course does not go into how Allah's knowledge and human choice fit together (a theology debate, out of scope).

**Phrase it this way**
- "Qadr is not a reason to stop. When the companions asked 'should we stop and rely on what is written?', the Prophet said 'act' (Sahih al-Bukhari 4949)."
- After a setback: "Not 'if only I had...', but 'Allah decreed, and He did what He willed', and then the next step (Sahih Muslim 2664)."
- Do not say "it was written, so it does not matter what you did". Do say "learn from it, and do not torture yourself with 'if only'."

### 4. Tawakkul and taking the means

**Quran 65:2 to 3 (Surah at-Talaq, 65)** [S1, S2, S3a]
- Arabic [Quran 65:3, S1]:
  > وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ
- Meaning: Whoever is mindful of Allah, He makes a way out for him and provides for him from where he does not expect. Whoever puts his trust in Allah, Allah is enough for him.
- Context: these words come at the end of a passage on divorce and the waiting period (Ibn Kathir [S3a]); the wording itself is general. Cite the phrase; do not mention the divorce setting unless asked.

**Quran 3:159 (Surah Al 'Imran, 3)** [S1, S2, S3a]
- Arabic [Quran 3:159, S1]:
  > وَشَاوِرْهُمْ فِي الْأَمْرِ ۖ فَإِذَا عَزَمْتَ فَتَوَكَّلْ عَلَى اللَّهِ
- Meaning: Consult them in the matter, and once you have decided, put your trust in Allah. Allah loves those who trust Him.
- Context: Ibn Kathir illustrates this verse with the Prophet's consultations before Badr and Uhud [S3a], and it is commonly read in the setting of Uhud (that setting was not checked further here). The verse text itself names no battle. **Phrase:** cite the verse without the story. The order it teaches (consult, decide, then trust) is the core of module 5.

**Quran 3:173 (Surah Al 'Imran, 3) and Sahih al-Bukhari 4563: flag, battle context**
- Arabic [Quran 3:173, S1]:
  > حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ
- Meaning of the phrase: Allah is enough for us, and He is the best One to rely on.
- Bukhari 4563, from Ibn Abbas: Ibrahim, peace be upon him, said these words when he was thrown into the fire, and Muhammad, peace be upon him, said them when people told the believers that a great army had gathered against them [S8]. Sahih.
- Context: Ibn Kathir places 3:172 to 174 at Hamra' al-Asad, after Uhud [S3a]. **Phrase:** teach the phrase as words for a frightening moment, with the Ibrahim part of Bukhari 4563 only: "Ibrahim, peace be upon him, said it when he was thrown into the fire (Sahih al-Bukhari 4563)." Do not tell the army part.

**Jami' at-Tirmidhi 2344 and Sunan Ibn Majah 4164 (the birds)**, from Umar ibn al-Khattab, may Allah be pleased with him [S9].
- Grading: Tirmidhi: "hasan sahih"; Darussalam: Hasan (both); al-Albani: Sahih (Sahih at-Tirmidhi 2344; Sahih Ibn Majah 3377); al-Arna'ut: Sahih (Musnad Ahmad 370, 373); sunnah.com shows Musnad Ahmad 373 graded sahih by Darussalam [S9, S57b]. Ibn Rajab discusses its chain in Jami' al-'Ulum wal-Hikam (2/496, as listed on dorar.net) [S57b]. Usable.
- Arabic [Jami' at-Tirmidhi 2344, S9]:
  > لَوْ أَنَّكُمْ كُنْتُمْ تَوَكَّلُونَ عَلَى اللَّهِ حَقَّ تَوَكُّلِهِ لَرُزِقْتُمْ كَمَا تُرْزَقُ الطَّيْرُ تَغْدُو خِمَاصًا وَتَرُوحُ بِطَانًا
- Meaning: If you relied on Allah as He truly deserves, He would provide for you as He provides for the birds: they go out hungry in the morning and come back full in the evening.
- Teaching point: the birds go out. The hadith pictures trust with movement, not trust instead of movement.

**Jami' at-Tirmidhi 2517 ("tie it and trust")**, from Anas ibn Malik, may Allah be pleased with him [S10]; and **Sahih Ibn Hibban 731**, from Amr ibn Umayya ad-Damri [S11].
- Arabic [Jami' at-Tirmidhi 2517, S10]:
  > اعْقِلْهَا وَتَوَكَّلْ
- Meaning: A man asked: should I tie my camel and trust Allah, or leave it loose and trust Allah? The Prophet said: tie it and trust.
- Grading, honestly stated:
  - Darussalam on sunnah.com: Hasan [S10].
  - Tirmidhi himself says the Anas narration is gharib (known only by this chain) and reports that Yahya al-Qattan called it munkar; Tirmidhi adds that it is also narrated from Amr ibn Umayya [S10].
  - Ibn Hibban included the Amr ibn Umayya narration in his Sahih (731); Shu'ayb al-Arna'ut: Hasan [S11, S57a].
  - al-Albani: Hasan (Sahih al-Jami' 1068); al-Zurqani: sound from Amr ibn Umayya, weak from Anas; Ibn al-Qattan: the Anas chain has an unknown narrator [S57a].
- **Recommendation:** usable as "graded hasan", citing both Jami' at-Tirmidhi 2517 and Sahih Ibn Hibban 731. Scholar to confirm (open question).

**Sahih al-Bukhari 1523 (replacement for the Umar report)**, from Ibn Abbas [S12]. Sahih.
- Arabic [Sahih al-Bukhari 1523, S12]:
  > كَانَ أَهْلُ الْيَمَنِ يَحُجُّونَ وَلاَ يَتَزَوَّدُونَ وَيَقُولُونَ نَحْنُ الْمُتَوَكِّلُونَ
- Meaning: Some people of Yemen used to come for Hajj without taking provisions, saying "we are the ones who trust Allah"; when they arrived they asked people for food. Allah revealed: take provisions, and the best provision is taqwa (2:197).
- Quran 2:197 key phrase, Arabic [Quran 2:197, S1]:
  > وَتَزَوَّدُوا فَإِنَّ خَيْرَ الزَّادِ التَّقْوَىٰ
- **Why this matters:** it is a sound, non-war, Quran-linked example of the exact misunderstanding the course corrects (calling yourself "mutawakkil" while skipping the means). It replaces the report attributed to Umar, which could not be verified (see the do-not-use table).

**Scholarly definition of tawakkul (plain)**
- Ibn Rajab (d. 795 AH), Jami' al-'Ulum wal-Hikam, commentary on the birds hadith, as quoted by Egypt's Dar al-Ifta (citing 2/498) [S58]: realising tawakkul does not contradict striving in the means by which Allah has decreed outcomes; striving with the limbs is obedience to Allah, and relying on Him with the heart is faith in Him.
  - Arabic of the first sentence, as quoted by Dar al-Ifta [S58]:
    > اعلم أن تحقيق التوكل لا ينافي السعي في الأسباب التي قدر الله سبحانه المقدورات بها، وجرت سنته في خلقه بذلك
- The same Dar al-Ifta article quotes al-Qushayri: the place of tawakkul is the heart, and movement of the body does not contradict it [S58].
- Primary book not opened; the page reference is Dar al-Ifta's. Confidence medium-high.

**Phrase it this way**
- Definition for chapters: "Tawakkul is trusting Allah with your heart while you do the work with your hands." (Course wording, built on [S58].)
- "Tie it and trust" is the course's short form. Always give the full reference with the grading: (Jami' at-Tirmidhi 2517, graded hasan).
- Do not say "if you truly trusted Allah you would not worry". Worry is human; tawakkul is what you do with it.

### 5. The Prophet's planning: the Hijra

**Sahih al-Bukhari 3905**, the long narration of Aisha, may Allah be pleased with her [S13]. Sahih. What the hadith itself says (checked in the sunnah.com English and Arabic):
- Abu Bakr prepared to emigrate; the Prophet asked him to wait, hoping for permission. Abu Bakr fed two she-camels for four months in preparation [S13].
- The Prophet came to Abu Bakr's house at noon, at a time he did not usually visit, with his head covered, and asked that everyone present leave before he spoke (Abu Bakr said only family was there) [S13].
- The Prophet accepted one of the camels only "with payment" [S13].
- "We prepared the baggage quickly" and made food in a leather bag; Asma bint Abi Bakr cut a piece of her waist-belt (nitaq) to tie the bag, "and for that reason she was named" Dhat an-Nitaq (Arabic: ذَاتَ النِّطَاقِ, "the one with the belt"); the English translation on sunnah.com says Dhat-un-Nitaqain ("the one with two belts") [S13]. Sahih al-Bukhari 2979 (Asma's own narration) gives the two-belts version: she cut her belt in two, one piece for the water-skin and one for the food [S14].
- They stayed in a cave on Mount Thawr for three nights [S13].
- Abdullah ibn Abi Bakr, "an intelligent and sharp young man", spent the nights with them, left before dawn, was among the Quraysh in Makkah by morning, and brought them every piece of news after dark [S13].
- Amir ibn Fuhayra, Abu Bakr's freed slave, grazed a flock of sheep near them and brought them milk each evening, then led the sheep away before dawn (which also covered the tracks, per commentators; that last point was not checked here) [S13].
- They hired a skilled guide from Banu ad-Dil, who "was on the religion of the disbelievers of Quraysh"; they trusted him and gave him their camels, and he brought them to the cave after three nights; he took them along the coast road [S13, S14 (Bukhari 2263 has the same account)].
- **The guide's name** (Abdullah ibn Urayqit, also spelled Uraiqit or Arqat) is not in Bukhari 3905 or 2263. It comes from the sira and biographical books (Ibn Hisham; Ibn Hajar's al-Isaba). The biographical sources say he was not a Muslim at the time; whether he later accepted Islam is not known (Abd al-Ghani al-Maqdisi and an-Nawawi said no Islam is known for him; adh-Dhahabi listed him among the companions) [S71]. **Phrase:** "a skilled guide who was not a Muslim (Sahih al-Bukhari 3905); the sira books give his name as Abdullah ibn Urayqit."

**Quran 9:40 (Surah at-Tawbah, 9)** [S1, S2, S3a]
- Arabic [Quran 9:40, S1]:
  > لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا
- Meaning: When the two of them were in the cave, he said to his companion, "Do not grieve; Allah is with us", and Allah sent down His calm upon him.
- Context: the verse sits in a passage urging believers to go out when called (9:38 to 41, not quoted here); the part we use describes the cave of Thawr during the Hijra, where they stayed three days (Ibn Kathir [S3a]). **Phrase:** cite only the cave clause.

**Sahih al-Bukhari 3653**, from Abu Bakr, may Allah be pleased with him [S15]. Sahih.
- Arabic [Sahih al-Bukhari 3653, S15]:
  > مَا ظَنُّكَ يَا أَبَا بَكْرٍ بِاثْنَيْنِ اللَّهُ ثَالِثُهُمَا
- Meaning: Abu Bakr said in the cave, "If one of them looked down at his feet, he would see us." The Prophet said, "What do you think, Abu Bakr, of two when Allah is the third of them?"

**Phrase it this way (planning plus trust)**
- Make a list from Bukhari 3905 only: a long preparation (camels fed for four months), secrecy and timing, paying fairly, food packed, a safe place to wait (three nights), a source of news (Abdullah), supplies and cover (Amir), and an expert guide chosen for skill (who was not a Muslim). Then the trust: "Do not grieve, Allah is with us" (9:40) and "two, when Allah is the third" (Bukhari 3653).
- Lesson in the course's words: "The Prophet planned every step and still put his trust in Allah. Planning is part of trust."
- Do not add the spider web, the dove's nest or the details of the pursuit from sira books: they are not in the sources checked here.
- The lesson "hire the best person for the task, even if he is not from your group" is supported by the text [S13]; keep it simple and avoid any political reading.

### 6. Sabr

**Sahih al-Bukhari 1283 and Sahih Muslim 926**, from Anas ibn Malik [S16]. Sahih.
- Arabic [Sahih al-Bukhari 1283, S16]:
  > إِنَّمَا الصَّبْرُ عِنْدَ الصَّدْمَةِ الأُولَى
- Context and meaning: the Prophet passed a woman weeping at a grave and told her to fear Allah and be patient. Not recognising him, she said, "Leave me, you have not been struck by a loss like mine." When she was told who he was, she went to his house (there was no guard at his door) and said she had not recognised him. He said: patience is at the first shock.
- **Teaching points:** the Prophet did not rebuke her for weeping; she spoke harshly in grief and he was gentle; his house had no guard. The hadith is about the first moment, not a ban on later sadness.

**Sahih al-Bukhari 1469 and Sahih Muslim 1053**, from Abu Sa'id al-Khudri [S17]. Sahih.
- Arabic [Sahih al-Bukhari 1469, S17]:
  > وَمَنْ يَتَصَبَّرْ يُصَبِّرْهُ اللَّهُ، وَمَا أُعْطِيَ أَحَدٌ عَطَاءً خَيْرًا وَأَوْسَعَ مِنَ الصَّبْرِ
- Meaning: Whoever tries to be patient, Allah makes him patient, and no one is given a gift better and wider than patience.
- Context: said after the Prophet gave to some of the Ansar who asked again and again until he had nothing left. Also in the hadith: whoever keeps from asking, Allah keeps him from need. Note for writers: "tries to be patient" (yatasabbar) means patience is learned with effort; good for the "patience is a skill" angle.

**Quran verses on sabr** [S1, S2]
- **2:153 (al-Baqarah):** Arabic [Quran 2:153, S1]:
  > يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ
  Meaning: Believers, seek help through patience and prayer; Allah is with the patient. (Khattab renders the first verb "seek comfort"; Sahih International and Abdel Haleem "seek help".) See also 2:45.
- **39:10 (az-Zumar):** Arabic [Quran 39:10, S1]:
  > إِنَّمَا يُوَفَّى الصَّابِرُونَ أَجْرَهُم بِغَيْرِ حِسَابٍ
  Meaning: The patient will be given their reward in full, without measure.
- **12:18 (Yusuf):** Arabic [Quran 12:18, S1]:
  > فَصَبْرٌ جَمِيلٌ ۖ وَاللَّهُ الْمُسْتَعَانُ عَلَىٰ مَا تَصِفُونَ
  Meaning: Yaqub, peace be upon him, when his sons brought Yusuf's shirt with false blood, said: "So patience is most fitting (beautiful patience), and Allah is the One whose help is sought against what you describe." The same words "fa sabrun jamil" come again in 12:83.
- **12:83 to 87 (Yusuf):** Yaqub turned away and said "Alas for Yusuf"; his eyes turned white from grief (12:84). His sons said he would ruin his health (12:85). He said: "I only complain of my grief and sorrow to Allah, and I know from Allah what you do not know" (12:86). Then: "My sons, go and search for Yusuf and his brother, and do not despair of Allah's mercy" (12:87).
  - Arabic [Quran 12:86, S1]:
    > قَالَ إِنَّمَا أَشْكُو بَثِّي وَحُزْنِي إِلَى اللَّهِ
  - Arabic [Quran 12:87, S1]:
    > وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ
  - Translation note: Sahih International renders rawh as "relief"; Abdel Haleem and Khattab as "mercy" [S1, S2]. "Relief and mercy" is a fair meaning.
  - **Teaching point (central to the course):** the prophet who said "beautiful patience" also wept until his eyes turned white, complained to Allah, and then sent his sons to search. Sabr includes grief, honest complaint to Allah, and action.
- **70:5 (al-Ma'arij):** Arabic [Quran 70:5, S1]:
  > فَاصْبِرْ صَبْرًا جَمِيلًا
  Meaning: So be patient with a beautiful patience. Context: addressed to the Prophet about people who mocked the warning (Khattab adds this in brackets [S2]).

**The three kinds of sabr (classical)**
- Ibn al-Qayyim (d. 751 AH), 'Uddat as-Sabirin, p. 52 (as quoted in Dorar's Encyclopedia of Character) divides sabr by what it relates to into three: patience in carrying out commands and acts of obedience, patience in keeping away from what is forbidden, and patience with decrees so as not to be resentful of them [S59].
- Plain English for chapters: "patience to keep doing good, patience to keep away from wrong, and patience with what happens to you." Attribute to "the scholar Ibn al-Qayyim" or "classical scholars". The book itself was not opened (page from the encyclopedia); confidence medium-high.

**Phrase it this way**
- "Sabr is not silence. Yaqub, peace be upon him, wept and complained to Allah, and he still had beautiful patience (Quran 12:84 to 87)."
- "Patience is a skill you grow: whoever tries to be patient, Allah makes him patient (Sahih al-Bukhari 1469)."
- Do not say "real sabr means not crying", "sabr means accepting injustice without speaking", or "sabr means waiting without doing anything".

### 7. Grief is human; the Prophet wept

**Sahih al-Bukhari 1303 and Sahih Muslim 2315**, from Anas ibn Malik [S18]. Sahih.
- Arabic [Sahih al-Bukhari 1303, S18]:
  > إِنَّ الْعَيْنَ تَدْمَعُ، وَالْقَلْبَ يَحْزَنُ، وَلاَ نَقُولُ إِلاَّ مَا يَرْضَى رَبُّنَا، وَإِنَّا بِفِرَاقِكَ يَا إِبْرَاهِيمُ لَمَحْزُونُونَ
- Context and meaning: the Prophet's infant son Ibrahim was dying in the house of his wet-nurse's husband, Abu Sayf. The Prophet's eyes filled with tears. Abdur-Rahman ibn Awf said, "Even you, O Messenger of Allah?" He said it is mercy, and then: "The eye sheds tears and the heart grieves, and we say only what pleases our Lord. O Ibrahim, we are saddened by your parting." Muslim 2315 has the same words (with tadma'u al-'ayn) [S18].
- **Sahih al-Bukhari 1284**, from Usama ibn Zayd [S52]: when the Prophet's grandchild was dying, he wept, and when asked, said: this is mercy that Allah has put in the hearts of His servants, and Allah shows mercy to the merciful among His servants.
  - Arabic [Sahih al-Bukhari 1284, S52]:
    > هَذِهِ رَحْمَةٌ جَعَلَهَا اللَّهُ فِي قُلُوبِ عِبَادِهِ، وَإِنَّمَا يَرْحَمُ اللَّهُ مِنْ عِبَادِهِ الرُّحَمَاءَ

**Phrase it this way**
- "Sadness is not weak faith. The Prophet wept when his son died and said the eye sheds tears and the heart grieves (Sahih al-Bukhari 1303)."
- The limit in the hadith is the tongue: "we say only what pleases our Lord". Grief is allowed; words of objection to Allah are what the believer avoids. Do not turn this into a list of forbidden mourning practices (fiqh, out of scope).

### 8. Words for hard moments (duas)

**Istirja with the dua of Umm Salamah: Sahih Muslim 918 (918a, 918b, 918c)**, from Umm Salamah, may Allah be pleased with her [S19]. Sahih.
- Arabic [Sahih Muslim 918a, S19]:
  > إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ اللَّهُمَّ أْجُرْنِي فِي مُصِيبَتِي وَأَخْلِفْ لِي خَيْرًا مِنْهَا
- Meaning: "We belong to Allah and to Him we return. O Allah, reward me in my loss and give me something better than it in its place." The Prophet said any Muslim who says this when a loss strikes, Allah will give him something better in its place.
- The story inside the hadith (918a to c): when her husband Abu Salamah died, Umm Salamah thought "who could be better than Abu Salamah?", said the dua anyway, and later married the Prophet [S19]. It shows that the dua is said even when the heart cannot yet imagine anything better. Handle gently: do not promise a learner a specific replacement for a person they lost.

**The dua of distress: Sahih al-Bukhari 6346 and Sahih Muslim 2730**, from Ibn Abbas [S20]. Sahih.
- Arabic [Sahih al-Bukhari 6346, S20]:
  > لاَ إِلَهَ إِلاَّ اللَّهُ الْعَظِيمُ الْحَلِيمُ، لاَ إِلَهَ إِلاَّ اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لاَ إِلَهَ إِلاَّ اللَّهُ رَبُّ السَّمَوَاتِ، وَرَبُّ الأَرْضِ، وَرَبُّ الْعَرْشِ الْكَرِيمِ
- Meaning: There is no god but Allah, the Mighty, the Forbearing. There is no god but Allah, Lord of the mighty Throne. There is no god but Allah, Lord of the heavens, Lord of the earth, and Lord of the noble Throne. The Prophet used to say it at times of distress (karb).
- Note: the sunnah.com English of Bukhari 6346 leaves out "al-'Azim al-Halim" in its transliteration; the Arabic includes it, and Muslim 2730 has it in both [S20]. Copy the Arabic.

**The dua of Yunus: Quran 21:87 to 88 and Jami' at-Tirmidhi 3505**
- Quran 21:87 to 88 (al-Anbiya): Yunus, peace be upon him (Dhun-Nun, "the man of the whale"), went off angry; in the darkness he called out "there is no god but You, glory be to You, I have been among the wrongdoers", and Allah answered him and saved him from distress, "and so We save the believers" [S1, S2].
  - Arabic [Quran 21:88, S1]:
    > فَاسْتَجَبْنَا لَهُ وَنَجَّيْنَاهُ مِنَ الْغَمِّ ۚ وَكَذَٰلِكَ نُنجِي الْمُؤْمِنِينَ
- Jami' at-Tirmidhi 3505, from Sa'd ibn Abi Waqqas: the dua of Dhun-Nun in the whale's belly; no Muslim calls with it for anything without Allah answering him [S21].
  - Grading: Darussalam: Sahih; al-Albani: Sahih (Sahih at-Tirmidhi 3505); Ibn Hajar: Hasan (Nata'ij al-Afkar, as listed on dorar.net) [S21, S57c]. Usable.
  - Arabic of the dua [Jami' at-Tirmidhi 3505, S21]:
    > لاَ إِلَهَ إِلاَّ أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ
  - Note: the verse wording begins "an la ilaha..." inside the sentence; the dua above is the hadith form, which is how people say it.

**Refuge from worry and grief: Sahih al-Bukhari 6369**, from Anas ibn Malik [S22]. Sahih.
- Arabic [Sahih al-Bukhari 6369, S22]:
  > اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْجُبْنِ وَالْبُخْلِ، وَضَلَعِ الدَّيْنِ، وَغَلَبَةِ الرِّجَالِ
- Meaning: O Allah, I seek refuge in You from worry and grief, from helplessness and laziness, from cowardice and miserliness, from the burden of debt and from being overpowered by people.
- Teaching point: the Prophet himself asked for protection from worry (hamm, about the future) and grief (hazan, about the past). Worry is something to ask Allah's help with, not a sin to hide. "Helplessness and laziness" pairs naturally with "do not give up" in Muslim 2664.

**Also usable:** "hasbuna Allah wa ni'ma al-wakil" (3:173 and Bukhari 4563, with the flag in topic 4) and 13:28 (hearts find rest in the remembrance of Allah):
- Arabic [Quran 13:28, S1]:
  > أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ

**Phrase it this way**
- Teach one dua per chapter, with the Arabic block, the meaning and the reference; never more than two Arabic blocks per chapter (writer pack).
- Say "the Prophet used to say this at times of distress" (true of Bukhari 6346). Do not promise a specific worldly result from any dua; Tirmidhi 3505 says Allah answers, and how He answers is His.

### 9. Waiting: Yusuf and Yunus

**Yusuf, peace be upon him (Surah Yusuf, 12)** [S1, S2, S3]
- 12:18 and 12:83: "beautiful patience" (see topic 6).
- 12:86 to 87: complaint to Allah and "do not despair of Allah's mercy" (see topic 6).
- 12:42: Yusuf asked the freed prisoner to mention him to the king, but Satan made the man forget, "so Yusuf stayed in prison for several years".
  - Arabic [Quran 12:42, S1]:
    > فَلَبِثَ فِي السِّجْنِ بِضْعَ سِنِينَ
- 12:90: when his brothers recognised him: "Allah has been gracious to us. Whoever is mindful of Allah and patient, Allah does not let the reward of those who do good be lost."
  - Arabic [Quran 12:90, S1]:
    > إِنَّهُ مَن يَتَّقِ وَيَصْبِرْ فَإِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ
- 12:92: he forgave his brothers: "No blame on you today; may Allah forgive you."
- 12:100 to 101: he raised his parents to the throne and said his Lord had been good to him when He took him out of prison and brought his family, "after Satan had caused strife between me and my brothers. My Lord is subtle in what He wills", and he made dua to die a Muslim and be joined with the righteous.
  - Arabic [Quran 12:100, S1]:
    > إِنَّ رَبِّي لَطِيفٌ لِّمَا يَشَاءُ
- **Teaching points:** Yusuf asked for help through a person (a means) while trusting Allah; the means failed for years; at the end he named Allah's kindness, not his own suffering, and he forgave his brothers (12:92, 12:100).
- **How long Yusuf waited:** the Quran says "bid' sinin", several years [12:42]. Ibn Kathir reports that Mujahid and Qatadah said bid' means between three and nine, and that Wahb ibn Munabbih said Yusuf stayed in prison seven years [S3]. **Phrase:** "several years (Quran 12:42); some early scholars said seven, but the Quran does not give a number." Do not give the total years from the well to the reunion: no source checked here fixes it.

**Yunus, peace be upon him** [S1, S2]
- 21:87 to 88 (see topic 8).
- 37:139 to 148 (as-Saffat): Yunus was one of the messengers; he fled to a loaded ship; they drew lots and he lost; the whale swallowed him while he was blameworthy; had he not been one who glorified Allah, he would have stayed in its belly until the Day of Resurrection; Allah cast him onto open land, sick, made a gourd plant grow over him, and sent him to a hundred thousand or more, who believed.
  - Arabic [Quran 37:143 to 144, S1]:
    > فَلَوْلَا أَنَّهُ كَانَ مِنَ الْمُسَبِّحِينَ
    > لَلَبِثَ فِي بَطْنِهِ إِلَىٰ يَوْمِ يُبْعَثُونَ
- **Teaching points:** turning back to Allah (admitting "I was among the wrongdoers") in the darkest place; recovery took time (he was cast out sick, and a plant was grown to shelter him); then he returned to his work and his people believed.
- Do not give the number of days in the whale: the sources checked here do not.

**Phrase it this way**
- "Waiting well means: keep doing good where you are, keep asking Allah, keep using the means you have, and do not decide that Allah has forgotten you."
- Do not present Yusuf's prison as "a good thing that happened to him". Say Allah brought good out of it (12:100).

### 10. Shukr (gratitude)

**Quran** [S1, S2]
- **14:7 (Ibrahim):** Arabic [Quran 14:7, S1]:
  > لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ
  Meaning: Your Lord declared: if you are grateful, I will surely give you more; if you are ungrateful, My punishment is severe. Note: quote the first half; the second half is a warning best left in context.
- **2:152 (al-Baqarah):** Arabic [Quran 2:152, S1]:
  > فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ
  Meaning: Remember Me and I will remember you; be grateful to Me and do not be ungrateful.
- **31:12 (Luqman):** Arabic [Quran 31:12, S1]:
  > وَمَن يَشْكُرْ فَإِنَّمَا يَشْكُرُ لِنَفْسِهِ
  Meaning: Allah gave Luqman wisdom: be grateful to Allah; whoever is grateful is grateful for his own good.

**Hadith**
- **Sahih Muslim 2963 and Sahih al-Bukhari 6490**, from Abu Hurairah [S23]. Sahih.
  - Arabic [Sahih Muslim 2963a, S23]:
    > إِذَا نَظَرَ أَحَدُكُمْ إِلَى مَنْ فُضِّلَ عَلَيْهِ فِي الْمَالِ وَالْخَلْقِ فَلْيَنْظُرْ إِلَى مَنْ هُوَ أَسْفَلَ مِنْهُ مِمَّنْ فُضِّلَ عَلَيْهِ
  - Meaning: When one of you looks at someone given more wealth or a better form, let him look at someone below him. (A longer wording with a reason attached is often quoted; it was not checked here, so do not add it.)
  - **Sensitivity:** for learners who have lost much, "look at those below you" can sound like "others have it worse, so stop complaining", which the writer pack forbids. Use it as a tool the learner chooses for themself (to notice blessings), never as a reply to someone's pain.
- **Sahih Muslim 2999**, from Suhayb [S24]. Sahih.
  - Arabic [Sahih Muslim 2999, S24]:
    > عَجَبًا لأَمْرِ الْمُؤْمِنِ إِنَّ أَمْرَهُ كُلَّهُ خَيْرٌ وَلَيْسَ ذَاكَ لأَحَدٍ إِلاَّ لِلْمُؤْمِنِ إِنْ أَصَابَتْهُ سَرَّاءُ شَكَرَ فَكَانَ خَيْرًا لَهُ وَإِنْ أَصَابَتْهُ ضَرَّاءُ صَبَرَ فَكَانَ خَيْرًا لَهُ
  - Meaning: How wonderful is the affair of the believer; all of it is good, and that is for no one but the believer. If something good happens to him, he is grateful, and that is good for him. If harm reaches him, he is patient, and that is good for him.
  - Use: the bridge between modules 3 and 4.
- **Sunan Abi Dawud 4811; Jami' at-Tirmidhi 1954 and 1955** [S25].
  - Arabic [Sunan Abi Dawud 4811, S25]:
    > لاَ يَشْكُرُ اللَّهَ مَنْ لاَ يَشْكُرُ النَّاسَ
  - Meaning: Whoever does not thank people does not thank Allah.
  - Grading: Abu Dawud 4811 (Abu Hurairah): al-Albani Sahih (sunnah.com). Tirmidhi 1954 (Abu Hurairah) and 1955 (Abu Sa'id): Darussalam Sahih; Tirmidhi "hasan sahih"; al-Albani Sahih [S25, S57d]. Usable.
- **Sahih al-Bukhari 4836 and Sahih Muslim 2819**, from al-Mughirah ibn Shu'bah [S26]. Sahih.
  - Arabic [Sahih al-Bukhari 4836, S26]:
    > أَفَلاَ أَكُونُ عَبْدًا شَكُورًا
  - Meaning: The Prophet prayed at night until his feet swelled. Told that Allah had forgiven him, he said: "Should I not be a grateful servant?"
  - Teaching point: gratitude is shown in action.

**Phrase it this way**
- "Gratitude is not pretending. It is noticing what you still have, thanking Allah and the people who helped, and using the blessing well."
- Thanking people is part of thanking Allah (Abu Dawud 4811): a good, safe action step for a gate.

### 11. Hope and fear in balance

**Quran** [S1, S2]
- **39:53 (az-Zumar):** Arabic [Quran 39:53, S1]:
  > لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ
  Meaning: Say: My servants who have wronged yourselves, do not despair of Allah's mercy; Allah forgives all sins.
- **15:56 (al-Hijr):** Arabic [Quran 15:56, S1]:
  > وَمَن يَقْنَطُ مِن رَّحْمَةِ رَبِّهِ إِلَّا الضَّالُّونَ
  Meaning: Ibrahim, peace be upon him, said: who despairs of his Lord's mercy except those who are astray?
- **12:87 (Yusuf):** see topic 6.
- **7:56 (al-A'raf):** Arabic [Quran 7:56, S1]:
  > وَادْعُوهُ خَوْفًا وَطَمَعًا
  Meaning: Call on Him with fear and hope; Allah's mercy is near to those who do good.
- **17:57 (al-Isra):** Arabic [Quran 17:57, S1]:
  > وَيَرْجُونَ رَحْمَتَهُ وَيَخَافُونَ عَذَابَهُ
  Meaning: Even those closest to Allah seek a way to Him, hoping for His mercy and fearing His punishment.

**Hadith**
- **Sahih al-Bukhari 7405 and Sahih Muslim 2675** (hadith qudsi), from Abu Hurairah [S27]. Sahih.
  - Arabic [Sahih al-Bukhari 7405, S27]:
    > أَنَا عِنْدَ ظَنِّ عَبْدِي بِي
  - Meaning: Allah says: I am as My servant thinks of Me, and I am with him when he remembers Me. If he comes near to Me a hand's span, I come near to him an arm's length; if he comes walking, I come to him running.
- **Sahih Muslim 2755**, from Abu Hurairah [S55]. Sahih. Meaning: if the believer knew the punishment with Allah, no one would hope for His Paradise; if the disbeliever knew the mercy with Allah, no one would despair of His Paradise. A sound statement of the balance.
- **Jami' at-Tirmidhi 983 and Sunan Ibn Majah 4261 (the dying young man): disputed, scholar decision**
  - Content: the Prophet visited a young man who was dying and asked how he felt. He said: "I hope in Allah and I fear my sins." The Prophet said these two do not come together in a servant's heart at such a moment without Allah giving him what he hopes and making him safe from what he fears [S28].
  - Arabic [Jami' at-Tirmidhi 983, S28]:
    > لاَ يَجْتَمِعَانِ فِي قَلْبِ عَبْدٍ فِي مِثْلِ هَذَا الْمَوْطِنِ إِلاَّ أَعْطَاهُ اللَّهُ مَا يَرْجُو وَآمَنَهُ مِمَّا يَخَافُ
  - Grading: Darussalam on sunnah.com: Hasan (both). Tirmidhi: the sunnah.com edition says "gharib", the dorar.net listing says "hasan gharib". al-Albani: hasan sahih (Sahih at-Targhib 3383). But al-Bukhari (al-'Ilal al-Kabir) said it is only narrated mursal (from Thabit, without Anas), and Abu Hatim said the mursal is more likely [S28, S57e].
  - **Recommendation:** not needed; the balance is fully taught by 7:56, 17:57, Bukhari 7405 and Muslim 2755. Its deathbed setting is also heavy for this audience. Use only if the scholar approves.
- **Two wings image (classical):** Ibn al-Qayyim, Madarij as-Salikin: the heart on its way to Allah is like a bird; love is its head, and fear and hope are its two wings. When the head and wings are sound, it flies well; if the head is cut off it dies; if it loses its wings it is open to every hunter [S60]. Checked in a scholar's lesson on Madarij as-Salikin (Khalid as-Sabt); the volume and page in the book were not checked. Confidence medium.

**Phrase it this way**
- "Hope and fear are like two wings: you need both to fly straight (a picture from the scholar Ibn al-Qayyim)."
- The two ways the balance breaks: despair (only fear) and carelessness (only hope). Despair is named in the Quran [12:87, 15:56, 39:53].
- Never use fear language about a learner's hardship ("maybe this is a punishment"). Fear in this course is about one's own choices, not about events.

### 12. Decisions: research, shura, istikhara

**Shura in the Quran** [S1, S2]
- **42:38 (ash-Shura):** Arabic [Quran 42:38, S1]:
  > وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ
  Meaning: Among the qualities of believers: they respond to their Lord, keep up prayer, run their affairs by consultation among themselves, and give from what Allah has provided. **Use this as the main shura verse** (no battle context).
- **3:159:** consult, decide, trust (topic 4, with its context flag).

**The Prophet consulting (non-war examples)**
- **Sahih al-Bukhari 3**, from Aisha [S56]. Sahih. After the first revelation, the Prophet came home trembling and told his wife Khadijah, may Allah be pleased with her, "I feared for myself." She comforted him: Allah will never disgrace you, for you keep family ties, carry the burden of the weak, help the poor, honour guests and help people in genuine hardship. Then she took him to her cousin Waraqa ibn Nawfal, a man who knew the earlier scriptures.
  - Arabic [Sahih al-Bukhari 3, S56]:
    > لَقَدْ خَشِيتُ عَلَى نَفْسِي
  - Arabic [Sahih al-Bukhari 3, S56]:
    > كَلاَّ وَاللَّهِ مَا يُخْزِيكَ اللَّهُ أَبَدًا
  - **Why it matters:** the Prophet told the person closest to him that he was afraid; she reminded him of his good deeds; they went together to someone with knowledge. This is the best sound example in the course for "tell someone you trust" and "ask someone who knows" (modules 5 and 7). Keep the Waraqa part brief.
- **Sahih al-Bukhari 2731 and 2732 (Hudaybiyyah)**, from al-Miswar ibn Makhramah and Marwan [S29]. Sahih. After the treaty, the Prophet told his companions three times to slaughter their sacrifices and shave their heads, and none got up. He went to his wife Umm Salamah and told her. She advised: go out, say nothing to anyone, slaughter your sacrifice and call your barber. He did; then they all followed.
  - **Flags:** the hadith also mentions an enemy cavalry detachment on the road and the treaty terms. **Phrase:** "On a journey, when people were upset and did not act on his instruction, the Prophet asked his wife Umm Salamah for advice, followed it, and it worked (Sahih al-Bukhari 2731)." Do not tell the treaty story or its politics.

**Istikhara**
- **Sahih al-Bukhari 1166** (also 6382 and 7390), from Jabir ibn Abdullah, may Allah be pleased with him [S30]. Sahih.
- **Number check:** the request listed Bukhari 1162. On sunnah.com, 1162 is a different hadith (Aisha on talking after the two sunnah rak'as); the istikhara hadith is **1166** (Book 19, Hadith 45). 6382 and 7390 are correct [S30]. Other printed numberings may differ; writers use 1166.
- What it says: the Prophet taught istikhara "in all matters" as he taught a surah of the Quran: when one of you intends a matter, pray two rak'as that are not obligatory, then say the dua, and name the matter.
- Arabic of the dua [Sahih al-Bukhari 1166, S30]:
  > اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ، فَإِنَّكَ تَقْدِرُ وَلاَ أَقْدِرُ وَتَعْلَمُ وَلاَ أَعْلَمُ وَأَنْتَ عَلاَّمُ الْغُيُوبِ، اللَّهُمَّ إِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الأَمْرَ خَيْرٌ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي ـ أَوْ قَالَ عَاجِلِ أَمْرِي وَآجِلِهِ ـ فَاقْدُرْهُ لِي وَيَسِّرْهُ لِي ثُمَّ بَارِكْ لِي فِيهِ، وَإِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الأَمْرَ شَرٌّ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي ـ أَوْ قَالَ فِي عَاجِلِ أَمْرِي وَآجِلِهِ ـ فَاصْرِفْهُ عَنِّي وَاصْرِفْنِي عَنْهُ، وَاقْدُرْ لِي الْخَيْرَ حَيْثُ كَانَ ثُمَّ أَرْضِنِي بِهِ
- Note on the text: the marks ـ (an Arabic tatweel used as a bracket in the source) enclose the narrator's alternative wording ("or he said: in my near and later affairs"). Keep them, or ask the scholar how to present the alternative. This block is long; it may count as the chapter's two Arabic blocks.
- Meaning (short): O Allah, I ask You to choose for me by Your knowledge, and to give me ability by Your power, and I ask from Your great favour. You are able and I am not; You know and I do not; You are the Knower of the unseen. O Allah, if You know this matter is good for me in my religion, my living and my outcome, decree it for me, make it easy, and bless it for me; and if You know it is bad for me in my religion, my living and my outcome, turn it away from me and turn me away from it, decree the good for me wherever it is, and make me content with it.

**What happens after istikhara: where scholars agree and differ**
- **Agreed in every source checked:** no dream or vision is required [S61, S62, S63]; the dua asks Allah to choose and to make the good easy; a person consults and studies the matter as well.
- **Differences:**
  - A Hanafi fatwa service (Mufti Ebrahim Desai, askimam, on islamqa.org): act on the inclination of the heart; if still unsure, repeat istikhara (it suggests up to seven days), then consult a knowledgeable person [S62].
  - islamqa.info (Shaykh Muhammad Salih al-Munajjid): the idea that a dream or a happy feeling is needed is a widespread myth with no authentic evidence; if the matter becomes easy after istikhara, that is a sign to go ahead, and obstacles are a sign of being turned away. It quotes Ibn Taymiyyah (what Allah makes him content with and easy for him is what Allah chose for him), and Ibn 'Allan and Ibn Hajar (whatever he does after istikhara has good in it). It also quotes Ibn Hajar calling the "then look at what your heart inclines to" narration's chain very weak, and an-Nawawi calling a related chain odd [S61].
  - Egypt's Dar al-Ifta (English fatwa, 2013): there are no set clear signs; it mostly has to do with where one finds one's heart [S63].
  - an-Nawawi's own wording in al-Adhkar (often quoted as "he goes ahead with what his heart is at ease with") could not be opened: **UNVERIFIED**.
- **Phrase it this way:** "First learn about the choice and ask people who know. Then pray istikhara and ask Allah to choose. You do not need a dream. Then go ahead with what seems best and watch whether the way opens. Scholars differ on how much weight to give a feeling in the heart; ask a scholar you trust if you are unsure." (Course wording built on [S30, S61, S62, S63].)
- **Istikhara is for permissible choices**: the hadith says "a matter" one intends; the sources checked do not state the limit in those words, but none applies istikhara to a sin or a clear duty. Phrase: "Istikhara is for choosing between things that are allowed, such as two job offers. You do not make istikhara about whether to pray or whether to do something wrong." Scholar to confirm this sentence (checklist).

**Do not use:** "ma khaba man istakhara wa la nadima man istashar" (see the do-not-use table) and the "seven times" istikhara narration (very weak per Ibn Hajar, as quoted in [S61]).

### 13. Intention (niyyah)

- **Sahih al-Bukhari 1 and Sahih Muslim 1907**, from Umar ibn al-Khattab [S31]. Sahih.
  - Arabic [Sahih al-Bukhari 1, S31]:
    > إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى
  - Meaning: Actions are only by intentions, and each person will have what he intended. Whoever emigrated for something of this world or to marry a woman, his emigration is for what he emigrated for.
- **Sahih al-Bukhari 56 and Sahih Muslim 1628**, from Sa'd ibn Abi Waqqas [S32]. Sahih.
  - Arabic [Sahih al-Bukhari 56, S32]:
    > إِنَّكَ لَنْ تُنْفِقَ نَفَقَةً تَبْتَغِي بِهَا وَجْهَ اللَّهِ إِلَّا أُجِرْتَ عَلَيْهَا حَتَّى مَا تَجْعَلُ فِي فَمِ امْرَأَتِكَ
  - Meaning: You will not spend anything seeking Allah's pleasure except that you are rewarded for it, even the food you put in your wife's mouth.
  - Context (Muslim 1628): said to Sa'd when he was very ill and asked about giving away his wealth; the Prophet limited the gift to a third and said it is better to leave your heirs rich than poor. **Phrase:** use only the "spending on family is rewarded" part; the inheritance ruling is fiqh (out of scope).
- **Sahih al-Bukhari 6491 and Sahih Muslim 131** (from Ibn Abbas), **Sahih Muslim 130** (from Abu Hurairah) [S33]. Sahih.
  - Arabic [Sahih Muslim 130, S33]:
    > مَنْ هَمَّ بِحَسَنَةٍ فَلَمْ يَعْمَلْهَا كُتِبَتْ لَهُ حَسَنَةً
  - Meaning: Whoever intends a good deed and does not do it, one good deed is written for him; if he does it, ten up to seven hundred times. (Bukhari 6491: "a full good deed", and "up to many times more".)
  - **Sensitivity and canvas rule:** do not turn the numbers into a calculator or a canvas (writer pack forbids numbers on reward). Use the hadith to say: when a power cut or a closed road stops a good plan, the good intention still counts.

**Phrase it this way**
- "Your work and study can be worship when your intention is good: to provide for your family, to help people, to please Allah (Sahih al-Bukhari 1 and 56)."
- Do not make intention a test the learner can fail ("if your intention is not pure, your work is worthless"). Keep it encouraging.

### 14. Good work and consistency

- **Sahih Muslim 1955**, from Shaddad ibn Aws [S34]. Sahih.
  - Arabic [Sahih Muslim 1955, S34]:
    > إِنَّ اللَّهَ كَتَبَ الإِحْسَانَ عَلَى كُلِّ شَىْءٍ
  - Meaning: Allah has prescribed excellence (ihsan) in everything.
  - Context: the hadith continues with how to slaughter an animal kindly and kill (in lawful cases) well. **Phrase:** cite only the first sentence. Do not include the rest (violence imagery for this audience).
  - **Use this in place of the "itqan" saying** (see the do-not-use table).
- **Sahih al-Bukhari 6464 and Sahih Muslim 782 and 783**, from Aisha [S35]. Sahih.
  - Arabic [Sahih Muslim 783b, S35]:
    > أَحَبُّ الأَعْمَالِ إِلَى اللَّهِ تَعَالَى أَدْوَمُهَا وَإِنْ قَلَّ
  - Meaning: The deeds most beloved to Allah are the most consistent, even if small. Muslim 782 adds: take on only the deeds you can manage, for Allah does not tire until you tire; and when Aisha did a deed she kept it up (783b).
  - Number check: in Muslim, the "most beloved deeds" wording is 782a and 783b on sunnah.com; 783a is Aisha describing the Prophet's deeds as continuous.
- **Sahih al-Bukhari 39**, from Abu Hurairah [S36]. Sahih.
  - Arabic [Sahih al-Bukhari 39, S36]:
    > إِنَّ الدِّينَ يُسْرٌ، وَلَنْ يُشَادَّ الدِّينَ أَحَدٌ إِلاَّ غَلَبَهُ، فَسَدِّدُوا وَقَارِبُوا وَأَبْشِرُوا
  - Meaning: The religion is ease; no one overburdens himself in it without being overcome. So aim for what is right, come as close as you can, and be glad. The hadith ends: seek help from the morning, the evening and part of the night.
- **Al-Adab al-Mufrad 479 (palm seedling)**, from Anas ibn Malik [S37]; also in Musnad Ahmad (12902 in al-Arna'ut's edition) [S57f].
  - Arabic [Al-Adab al-Mufrad 479, S37]:
    > إِنْ قَامَتِ السَّاعَةُ وَفِي يَدِ أَحَدِكُمْ فَسِيلَةٌ، فَإِنِ اسْتَطَاعَ أَنْ لاَ تَقُومَ حَتَّى يَغْرِسَهَا فَلْيَغْرِسْهَا
  - Meaning: If the Hour comes while one of you has a palm seedling in his hand, and he can plant it before it comes, let him plant it.
  - Grading: no grade shown on the sunnah.com page. al-Albani: Sahih (Sahih al-Adab al-Mufrad 371; Sahih al-Jami' 1424; Silsilah as-Sahihah 9, "isnad sahih on the condition of Muslim"); al-Arna'ut: "isnad sahih on the condition of Muslim" (Musnad 12902); al-Haythami: its narrators are reliable [S57f]. Usable.
  - Number note: sunnah.com shows it as "Book 27, Hadith 4" with the Arabic/English book reference 479; the URL is sunnah.com/adab/27/4 [S37].
- **Sahih al-Bukhari 2072**, from al-Miqdam [S38]. Sahih.
  - Arabic [Sahih al-Bukhari 2072, S38]:
    > مَا أَكَلَ أَحَدٌ طَعَامًا قَطُّ خَيْرًا مِنْ أَنْ يَأْكُلَ مِنْ عَمَلِ يَدِهِ
  - Meaning: No one has eaten better food than what he earned by the work of his own hands, and the Prophet of Allah Dawud, peace be upon him, ate from the work of his hands.

**Phrase it this way**
- "Good work a little and often": Muslim 1955 (do it well), Bukhari 6464 (keep it up, even if small), Bukhari 39 (do not overload yourself), Adab al-Mufrad 479 (keep planting even when the future is unclear).
- The seedling hadith is powerful for this audience. Do not attach it to any current event; keep it about effort that does not wait for certainty.

### 15. Failure, mistakes and starting again

- **Quran 7:23 (al-A'raf), the dua of Adam and Hawwa, peace be upon them** [S1, S2]
  - Arabic [Quran 7:23, S1]:
    > رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ
  - Meaning: Our Lord, we have wronged ourselves; if You do not forgive us and have mercy on us, we will be among the losers.
- **Quran 3:135 to 136 (Al 'Imran)** [S1, S2]
  - Arabic [Quran 3:135, S1]:
    > ذَكَرُوا اللَّهَ فَاسْتَغْفَرُوا لِذُنُوبِهِمْ
  - Meaning: Those who, when they do something shameful or wrong themselves, remember Allah and ask forgiveness (and who forgives sins but Allah?) and do not knowingly persist; their reward is forgiveness and gardens. Note: these verses describe the qualities of the God-fearing; the text has no battle content.
- **Quran 39:53**: see topic 11.
- **Sahih Muslim 2749**, from Abu Hurairah [S40]. Sahih.
  - Arabic [Sahih Muslim 2749, S40]:
    > لَوْ لَمْ تُذْنِبُوا لَذَهَبَ اللَّهُ بِكُمْ وَلَجَاءَ بِقَوْمٍ يُذْنِبُونَ فَيَسْتَغْفِرُونَ اللَّهَ فَيَغْفِرُ لَهُمْ
  - Meaning: If you did not sin, Allah would replace you with people who sin, ask Allah's forgiveness, and are forgiven.
  - **Recommended as the main hadith for "starting again"** because it is in Sahih Muslim. Phrase carefully: it does not encourage sin; it shows that people who make mistakes and turn back are what Allah expects of humans.
- **Jami' at-Tirmidhi 2499 and Sunan Ibn Majah 4251 ("every son of Adam errs"): disputed, scholar decision**
  - Arabic [Jami' at-Tirmidhi 2499, S39]:
    > كُلُّ ابْنِ آدَمَ خَطَّاءٌ وَخَيْرُ الْخَطَّائِينَ التَّوَّابُونَ
  - Meaning: Every son of Adam makes many mistakes, and the best of those who make mistakes are those who keep turning back (in repentance).
  - Grading, honestly stated: Darussalam on sunnah.com: **Da'if** for Tirmidhi 2499 and **Hasan** for Ibn Majah 4251. Tirmidhi: "gharib", known only through Ali ibn Mas'adah from Qatadah. al-Albani: Hasan (Sahih at-Tirmidhi; Sahih at-Targhib 3139); Ibn Hajar: Hasan (Hidayat ar-Ruwat); Ibn al-Qattan: Sahih; Ibn 'Adi: "not preserved"; al-Mundhiri points to Ali ibn Mas'adah [S39, S57i].
  - **Recommendation:** if used, cite as "(Sunan Ibn Majah 4251, graded hasan)" only after the scholar approves. The same teaching is fully supported by Muslim 2749 and Quran 3:135, 7:23 and 39:53.
- **Sahih al-Bukhari 6133 and Sahih Muslim 2998**, from Abu Hurairah [S41]. Sahih.
  - Arabic [Sahih al-Bukhari 6133, S41]:
    > لاَ يُلْدَغُ الْمُؤْمِنُ مِنْ جُحْرٍ وَاحِدٍ مَرَّتَيْنِ
  - Meaning: A believer is not stung from the same hole twice: learn from what went wrong.
  - Context: the hadith text has no story. Commentators connect it to an event after a battle; **not checked here.** Cite the saying alone.
- **Sahih Muslim 2664** ("do not say if only"), topic 3: the key text for not being stuck in regret.
- **Quran 3:139: do not use.** Arabic and meaning ("do not weaken and do not grieve; you will be uppermost if you are believers") are in [S1, S2], but Ibn Kathir places it directly in the passage on the losses at Uhud [S3a], and the next verses speak of wounds and martyrs. Use 12:87, 39:53 and 94:5 to 6 instead.

**Phrase it this way**
- Starting again in four steps the sources support: name the mistake honestly (7:23), ask forgiveness and do not persist (3:135), learn so it does not happen twice (Bukhari 6133), and do not drown in "if only" (Muslim 2664).
- Separate sin from failure: losing a client is not a sin. Use 7:23 and 3:135 for wrongdoing, and Muslim 2664 and Bukhari 6133 for setbacks and errors in work. Do not imply a learner's failed exam is a sin to repent from.

### 16. Community and service

- **Sahih Muslim 2699**, from Abu Hurairah [S42]. Sahih.
  - Arabic [Sahih Muslim 2699a, S42]:
    > مَنْ نَفَّسَ عَنْ مُؤْمِنٍ كُرْبَةً مِنْ كُرَبِ الدُّنْيَا نَفَّسَ اللَّهُ عَنْهُ كُرْبَةً مِنْ كُرَبِ يَوْمِ الْقِيَامَةِ
  - Arabic [Sahih Muslim 2699a, S42]:
    > وَاللَّهُ فِي عَوْنِ الْعَبْدِ مَا كَانَ الْعَبْدُ فِي عَوْنِ أَخِيهِ
  - Meaning: Whoever relieves a believer of a hardship of this world, Allah will relieve him of a hardship on the Day of Resurrection; whoever makes things easy for someone in difficulty, Allah makes things easy for him in this world and the next; and Allah helps the servant as long as the servant helps his brother.
- **Sahih al-Bukhari 2442**, from Abdullah ibn Umar [S42]. Sahih. "A Muslim is the brother of a Muslim; he does not wrong him or abandon him. Whoever meets his brother's need, Allah meets his need..." [S42].
  - Arabic [Sahih al-Bukhari 2442, S42]:
    > وَمَنْ كَانَ فِي حَاجَةِ أَخِيهِ كَانَ اللَّهُ فِي حَاجَتِهِ
- **Sahih al-Bukhari 6011 and Sahih Muslim 2586**, from an-Nu'man ibn Bashir [S43]. Sahih.
  - Arabic [Sahih al-Bukhari 6011, S43]:
    > تَرَى الْمُؤْمِنِينَ فِي تَرَاحُمِهِمْ وَتَوَادِّهِمْ وَتَعَاطُفِهِمْ كَمَثَلِ الْجَسَدِ إِذَا اشْتَكَى عُضْوًا تَدَاعَى لَهُ سَائِرُ جَسَدِهِ بِالسَّهَرِ وَالْحُمَّى
  - Meaning: In their mercy, love and kindness to each other, the believers are like one body: when one part hurts, the whole body shares the sleeplessness and fever.
- **Jami' at-Tirmidhi 1956 (smiling is charity)**, from Abu Dharr [S44].
  - Arabic [Jami' at-Tirmidhi 1956, S44]:
    > تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ
  - Grading: Darussalam: Hasan; Tirmidhi: "hasan gharib"; al-Albani: Sahih (Sahih al-Jami' 2908; Sahih at-Targhib 2685); al-Arna'ut found a weakness in the Ibn Hibban chain but said another sound chain strengthens it [S44, S57j]. Usable.
  - The full hadith also counts guiding a lost person, helping someone with weak sight, removing a stone or thorn from the road, and pouring from your bucket into your brother's: small, practical service.
- **Sahih al-Bukhari 13 and Sahih Muslim 45**, from Anas [S45]. Sahih.
  - Arabic [Sahih al-Bukhari 13, S45]:
    > لا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ
  - Meaning: None of you truly believes until he loves for his brother what he loves for himself. (Muslim 45 has "for his brother", or he said "for his neighbour".)

**Phrase it this way**
- "Helping others is part of faith, and Allah helps you while you help others (Sahih Muslim 2699)." Good for gate actions: share a job lead, review a friend's CV, check on a neighbour.
- **Do not use** "the most beloved people to Allah are the most beneficial to people" as a hadith (see the do-not-use table). Bukhari 2442 and Muslim 2699 carry the same lesson soundly.

### 17. Caring for body and mind, and seeking help

- **Sahih al-Bukhari 5678**, from Abu Hurairah [S46]. Sahih.
  - Arabic [Sahih al-Bukhari 5678, S46]:
    > مَا أَنْزَلَ اللَّهُ دَاءً إِلاَّ أَنْزَلَ لَهُ شِفَاءً
  - Meaning: Allah has not sent down any illness without sending down a cure for it.
- **Sunan Abi Dawud 3855 and Jami' at-Tirmidhi 2038**, from Usamah ibn Sharik [S47].
  - Arabic [Jami' at-Tirmidhi 2038, S47]:
    > نَعَمْ يَا عِبَادَ اللَّهِ تَدَاوَوْا
  - Meaning: Bedouins asked, "Should we seek treatment?" He said: "Yes, servants of Allah, seek treatment, for Allah has not made an illness without making a cure for it, except one: old age."
  - Grading: Abu Dawud 3855: al-Albani Sahih (sunnah.com). Tirmidhi 2038: Darussalam Sahih; Tirmidhi "hasan sahih"; al-Albani Sahih; an-Nawawi: isnad sahih (al-Majmu') [S47, S57k]. Usable.
  - Teaching point: the question "should we?" shows the companions wondered whether treatment conflicts with trust; the answer was "yes, seek treatment".
- **Sahih al-Bukhari 5199 and 1975**, from Abdullah ibn Amr ibn al-'As [S48]. Sahih.
  - Arabic [Sahih al-Bukhari 5199, S48]:
    > فَإِنَّ لِجَسَدِكَ عَلَيْكَ حَقًّا
  - Meaning: The Prophet told Abdullah, who fasted every day and prayed all night: do not do that; fast and break your fast, pray and sleep, for your body has a right over you, your eyes have a right over you, and your wife has a right over you. (1975 adds: your visitors have a right over you.)
  - Use: rest and sleep are part of the religion, not laziness. Good against burnout in study and freelance work.
- **The Prophet's sorrow ("the Year of Sorrow"):** the name 'Am al-Huzn and the framing come from later sira writing; no hadith for the label was checked here. **UNVERIFIED as a label.** Recommendation: omit. Bukhari 1303 (topic 7) and Bukhari 3 ("I feared for myself", topic 12) already show the Prophet's human feelings soundly.

**Faith and professional care work together (statements from scholarly bodies)**
- **Dar al-Ifta al-Misriyyah (Egypt), 2025 seminar "Fatwa and Mental Health"**: Dr Anas Abu Shadi (Al-Azhar, comparative jurisprudence) said psychological treatment and religious treatment complement and support each other, and that the path to recovery is treatment, not charlatans; Dr Mohamed El-Mahdi (Al-Azhar, psychiatry) said mild psychological conditions can be treated by a psychologist [S65].
  - Arabic [S65]:
    > العلاج النفسي مع الديني يتكاملان ويتعاونان
- **islamqa.info (Shaykh Muhammad Salih al-Munajjid), answer 380763**: there is nothing wrong with seeing a psychiatrist or psychologist who is trustworthy in knowledge and religion and skilled in the profession; it cites the hadith that Allah sent down no disease without a remedy, and "seek treatment" [S64].
- These come from two different scholarly orientations (an official Al-Azhar-linked body and a Salafi fatwa site); both support the same plain statement. No sect or school needs to be named in chapters.
- **Phrase it this way:** "Seeking help from a doctor, a counsellor or a psychologist is taking the means, like tying the camel. The Prophet told people to seek treatment (Jami' at-Tirmidhi 2038). Faith and professional care work together." Do not say "therapy is better than prayer" or "prayer is enough". Do not discuss medication (scholars differ; out of scope).

**Wellbeing resources that serve Gaza (for mentors only, not learner-facing)**
- **Gaza Community Mental Health Programme (GCMHP), Free Telephone Counselling.** Its page lists a free counselling line (1800 222 333), staffed by psychologists, 8 am to 8 pm every day (hours as last updated on the page, 2020), with referral to community centres [S68]. **Verify before sharing:** services in Gaza may be disrupted; the course must not print the number to learners (writer pack: no links, and the named contact is a real person).
- The course's named contact is the learner's mentor or the fellowship coordinator (brief). The sponsor should decide whether mentors receive a current list of services (open question).

### 18. Prophets and companions facing uncertainty (non-war)

- **Hajar and Zamzam: Sahih al-Bukhari 3364**, from Ibn Abbas [S49]. Sahih.
  - What it says: Ibrahim left Hajar and baby Isma'il in the valley of Makkah with a bag of dates and a skin of water. She followed him, asking why he was leaving them where there was no one and nothing. He did not turn back. She asked: "Has Allah commanded you to do this?" He said yes. She said: "Then He will not abandon us", and went back. When the water ran out and the baby was in distress, she climbed Safa to look for anyone, ran across the valley to Marwa, and did this seven times; this is the origin of people walking between them. Then she heard a voice and saw an angel at the place of Zamzam digging the earth with his heel (or his wing) until water flowed. The angel told her not to fear being neglected, "for Allah never neglects His people".
  - Arabic [Sahih al-Bukhari 3364, S49]:
    > آللَّهُ الَّذِي أَمَرَكَ بِهَذَا
  - Arabic [Sahih al-Bukhari 3364, S49]:
    > إِذًا لاَ يُضَيِّعُنَا
  - **Teaching point (perfect for module 2):** complete trust ("then He will not abandon us") and full effort (running and searching seven times) in the same person on the same day. Help came after she had done all she could.
  - Sensitivity: a mother and baby without water. Tell it plainly, without dramatising the baby's distress.
- **Musa at the sea: Quran 26:61 to 62 (ash-Shu'ara)** [S1, S2]
  - Arabic [Quran 26:62, S1]:
    > قَالَ كَلَّا ۖ إِنَّ مَعِيَ رَبِّي سَيَهْدِينِ
  - Meaning: When the two groups saw each other, Musa's people said "we will surely be caught". Musa, peace be upon him, said: "No! My Lord is with me; He will guide me."
  - Flag: the "two groups" are Musa's people and Pharaoh's pursuers (26:61). It is a rescue story, not a battle; tell it without the pursuers' destruction.
- **Ibrahim, peace be upon him:** "hasbuna Allah wa ni'ma al-wakil" said when thrown into the fire (Bukhari 4563, topic 4); and Ibrahim in 15:56 (hope). Leaving Hajar is in Bukhari 3364.
- **Maryam, peace be upon her: Quran 19:23 to 26 (Maryam)** [S1, S2]
  - Arabic [Quran 19:25, S1]:
    > وَهُزِّي إِلَيْكِ بِجِذْعِ النَّخْلَةِ تُسَاقِطْ عَلَيْكِ رُطَبًا جَنِيًّا
  - Meaning: In the pain of childbirth she was told: do not grieve, your Lord has placed a stream below you; shake the trunk of the palm tree towards you and fresh ripe dates will fall; eat, drink and be comforted.
  - **Sensitivity:** 19:23 has Maryam saying "I wish I had died before this and been forgotten". For learners who may be at risk, do not quote 19:23 or build a lesson on the wish to die. Start at 19:24 to 25. The teaching point is that even in weakness she was told to take a small means (shake the trunk), and provision came.
- **The Prophet in Ta'if: Sahih al-Bukhari 3231 and Sahih Muslim 1795**, from Aisha [S50]. Sahih.
  - What it says: Aisha asked whether he had a day harder than Uhud. He said the hardest was the day he presented himself to Ibn Abd Yalil ibn Abd Kulal, who did not respond; he left "overwhelmed with sorrow" and only came to himself at Qarn ath-Tha'alib. The angel of the mountains offered to crush the people between two mountains; he said: "No, I hope that Allah will bring from their descendants people who worship Allah alone."
  - Arabic [Sahih al-Bukhari 3231, S50]:
    > بَلْ أَرْجُو أَنْ يُخْرِجَ اللَّهُ مِنْ أَصْلاَبِهِمْ مَنْ يَعْبُدُ اللَّهَ وَحْدَهُ لاَ يُشْرِكُ بِهِ شَيْئًا
  - Flags: Aisha's question mentions Uhud; Muslim files it in the Book of Jihad and Expeditions [S50]. The hadith itself names the chief, not the town (commentators identify it as Ta'if; not checked here). **Phrase:** "After being turned away and walking on in deep sorrow, the Prophet chose hope for the people's future instead of punishment (Sahih al-Bukhari 3231)." Do not mention Uhud.
  - **The Ta'if dua "Allahumma ilayka ashku da'fa quwwati..." is weak:** al-Albani: Da'if (Da'if al-Jami' 1182; Silsilah ad-Da'ifah 2933); Ibn Baz: weak but well known among sira writers; al-Arna'ut: the report is mursal and its narrators reliable except for the words "Allahumma ilayka ashku" [S57l]. Do not use it as the Prophet's words.
- **Ka'b ibn Malik: Sahih al-Bukhari 4418**, from Ka'b [S51]. Sahih.
  - What it says: Ka'b stayed behind from an expedition (Tabuk) without excuse; he decided to tell the truth instead of making excuses; people were told not to speak to the three who stayed behind, and this lasted fifty nights until Allah accepted their repentance. Ka'b said: Allah saved me only through truthfulness.
  - Arabic [Sahih al-Bukhari 4418, S51]:
    > إِنَّ اللَّهَ إِنَّمَا نَجَّانِي بِالصِّدْقِ
  - **Recommendation:** do not use in core chapters. The story is about an expedition, and the boycott is heavy. If the scholar wants it, use it only in a stretch note on honesty after a failure ("he told the truth instead of making excuses, and waited fifty nights"), with no expedition details.

## Common misconceptions to correct gently

| Misconception | What the sources say | How to correct it in a chapter |
|---|---|---|
| Faith means never feeling sad or anxious. | The Prophet wept at his son's death [Bukhari 1303]; he asked for refuge from worry and grief [Bukhari 6369]; Yaqub wept and complained to Allah [12:84 to 86]; the Prophet told Khadijah "I feared for myself" [Bukhari 3]. | "Feelings are not failures. What matters is what we say and do with them." |
| Tawakkul means no planning. | Tie it and trust [Tirmidhi 2517]; the Yemeni pilgrims [Bukhari 1523, 2:197]; the Hijra planning [Bukhari 3905]; Hajar ran seven times [Bukhari 3364]. | Show the means and the trust side by side in every case. |
| Qadr means effort is pointless. | "Act, for each is eased" [Bukhari 4949]; "be keen on what benefits you... do not give up" [Muslim 2664]. | Quote the companions' question and the Prophet's answer. |
| Hardship means Allah is angry with you. | The prophets are tested most [Tirmidhi 2398]; hardship removes sins [Bukhari 5641]. | Say it in general terms; never explain a learner's own loss. |
| Istikhara needs a dream. | No dream or sign is required [S61, S62, S63]; the hadith has no dream in it [Bukhari 1166]. | "Istikhara asks Allah to choose and make the good easy. You do not need a dream." |
| Seeking therapy or medicine shows weak faith. | "Seek treatment, servants of Allah" [Tirmidhi 2038; Abu Dawud 3855]; scholarly bodies [S64, S65]. | "Seeing a doctor or counsellor is taking the means." |
| Sabr means silence or hiding need. | Yaqub complained to Allah [12:86]; the woman at the grave was treated gently [Bukhari 1283]. | "Sabr is steadiness, not silence. You can ask for help and still be patient." |
| "Everything happens for a reason", said to someone grieving. | The Sunnah of consoling: the Prophet sent the words "To Allah belongs what He took and what He gave, everything with Him has an appointed time; let her be patient and hope for reward" [Bukhari 1284], then went to her when she asked, and wept [Bukhari 1284]. | Teach consoling by presence and the Prophet's words, not by explanations. See below. |
| "Allah does not burden a soul beyond its capacity, so you must cope alone." | 2:286 is a mercy about what Allah requires; the same verse ends with duas asking Allah not to burden us. | "You are allowed to ask Allah, and people, for help." |
| Repentance is only for big sins, and failure is a sin. | 3:135, 7:23 for wrongdoing; Muslim 2664 and Bukhari 6133 for setbacks. | Keep the two apart (topic 15). |

**Consoling someone (sourced phrasing for chapters)**
- Arabic [Sahih al-Bukhari 1284, S52]:
  > إِنَّ لِلَّهِ مَا أَخَذَ وَلَهُ مَا أَعْطَى وَكُلٌّ عِنْدَهُ بِأَجَلٍ مُسَمًّى، فَلْتَصْبِرْ وَلْتَحْتَسِبْ
- Meaning: To Allah belongs what He took and what He gave, and everything with Him has an appointed term; so be patient and hope for reward.
- Course advice: be present, listen, say these words or the istirja gently, help with practical needs, and do not explain the loss. The Prophet went to his daughter when she asked again, and his tears were "mercy" [Bukhari 1284].

## Sensitive areas and how to phrase them

**Loss and grief**
- Always pair a loss verse (2:155 to 157) with Bukhari 1303 (grief is human) and with what the believer can do now (istirja, the Umm Salamah dua, asking for help).
- Never say "this loss is good for you", "Allah took them because He loves you", or "it was meant to be, so move on". These are not what the sources say to the grieving.
- Hadith that link trials with reward or love (Tirmidhi 2396, Bukhari 5641) are taught as general truths about believers, never as an explanation offered to a person in pain.

**Displacement and hardship**
- Hardship appears as ordinary background, told plainly (writer pack). Never as drama, never as a lesson that hardship is good.
- Hijra content is about planning and trust. Do not draw parallels between the Hijra and any current displacement; it can read as political and as minimising.

**Suicide and self-harm**
- The course must not discuss methods, must not describe any act of self-harm, and must not quote verses or stories built on a wish to die (do not quote 19:23; do not use Muslim 2877 or deathbed scenes as cases).
- In chapters on loss and care and in the capstone, one plain sentence (writer pack): if you feel overwhelmed for a long time, or have thoughts of harming yourself, talk to your mentor or the fellowship coordinator today, and to a doctor or counsellor if you can.
- WHO's media guidance (update 2023) addresses "all other stakeholders who communicate... publicly about suicide", and says stories of people overcoming a suicidal crisis are linked with fewer suicides [S66]; WHO lists responsible reporting as an effective intervention [S67]. The specific do and don't list (for example, do not describe methods; do give information about where to get help) is in the full WHO PDF, which could not be opened here: **UNVERIFIED in the PDF itself**, but the course rule above is stricter than that guidance in any case.
- Do not teach the fiqh ruling on suicide. A learner at risk needs a person, not a ruling.

**Sadness, worry and faith**
- Never "if you had more faith this would not happen", "just trust Allah", "stop complaining" or "others have it worse" (writer pack). The sources above give a better way to say every one of these.

## Where scholars differ (one line each, and how to phrase it)

| Question | The difference | Course phrasing |
|---|---|---|
| What to do after istikhara | Follow the heart's inclination and repeat if unsure [S62]; go ahead and treat ease as the sign, no feeling required [S61]; it mostly depends on where the heart settles [S63]. | "Go ahead with what seems best after consulting, and watch whether the way opens. Scholars differ on how much weight to give a feeling; ask a scholar you trust." |
| Repeating istikhara (for example seven times) | Some fatwa services suggest repeating up to seven days [S62]; the "seven times" narration is very weak per Ibn Hajar, as quoted in [S61]. | "You may repeat it." Do not give a number. |
| Grading of "tie it and trust" | Hasan (Darussalam, al-Albani, al-Arna'ut on Ibn Hibban 731); the Anas chain criticised (al-Qattan: munkar) [S10, S11, S57a]. | Cite as "graded hasan" with both references, if the scholar approves. |
| Grading of "every son of Adam errs" | Hasan (al-Albani, Ibn Hajar, Darussalam on Ibn Majah) vs da'if (Darussalam on Tirmidhi) and "not preserved" (Ibn 'Adi) [S39, S57i]. | Prefer Muslim 2749; use 2499 only with scholar approval. |
| Grading of the dying young man (hope and fear) | Hasan (al-Albani, Darussalam) vs mursal (al-Bukhari, Abu Hatim) [S28, S57e]. | Not needed; leave out unless approved. |
| "Allah loves that you perfect your work" | Hasan by supporting chains (al-Albani; as-Suyuti) vs weak chains (al-Busiri, Ibn 'Adi, al-Bayhaqi) [S57m]. | Do not use as a hadith; teach Muslim 1955 instead. |
| "The most beloved people are the most beneficial" | Hasan li-ghayrihi (al-Albani) vs fabricated or munkar (adh-Dhahabi, ad-Daraqutni) [S57n]. | Do not use as a hadith; teach Muslim 2699 and Bukhari 2442. |
| Muslim 2664 wording | qadaru Allah (sunnah.com) or qaddara Allah (common). | Use the dossier's Arabic; scholar to confirm. |
| Psychological treatment and medication | Agreement that seeing a trustworthy professional is fine [S64, S65]; difference on some medications (not checked). | "Faith and professional care work together." No statements about medication. |
| Whether Abdullah ibn Urayqit later accepted Islam | Not known per al-Maqdisi and an-Nawawi; listed among companions by adh-Dhahabi [S71]. | "A guide who was not a Muslim at the time (Sahih al-Bukhari 3905)." |

## What not to teach (and why)

| Topic | Why not |
|---|---|
| Fiqh rulings (prayer times, fasting, zakat, inheritance, mourning rules, medicine) | Brief non-goal. Where a source has a ruling inside it (Muslim 1628 on wills, Muslim 1955 on slaughter), cite only the part this course needs. |
| Theology of qadr and free will, kalam, comparison of schools or sects | Brief non-goal; the course states the mainstream "believe in qadr and act" and stops. |
| Weak, fabricated or disputed hadith as the Prophet's words | Brief production bar. See the do-not-use table. |
| Battle narratives (Uhud, Badr, Tabuk, Hamra' al-Asad, Hudaybiyyah politics) | Brief: no war or battles as case material. Battle-context sources are cited without the story or replaced. |
| Political interpretation of verses (for example applying 3:139 or 9:40 to current events) | Brief non-goal; harmful in this context. |
| Numerology, "special numbers" of repetitions, guaranteed results from duas | No sound source; risk of superstition. |
| Dream interpretation, signs after istikhara | No sound source requires them; out of scope. |
| Sira details not in the hadith collections (the spider and the dove at the cave, the Ta'if dua, the "Year of Sorrow" label, the number of years Yusuf spent in prison) | Not verified; only "the sira books say" with the scholar's approval. |
| The Umar report about the "mutawakkilun" | Not verified; replaced by Bukhari 1523. |
| Self-harm, suicide rulings or methods | Safety; the course points to a person. |
| Counselling techniques | Brief non-goal; the course refers to people. |

## Existing resources and gaps (orientation only)

- **Hadith and tafsir sites** (sunnah.com, quran.com, dorar.net) give texts and gradings but no plain-English, phone-friendly teaching for second-language readers [S1, S4 to S57].
- **Fatwa sites** (islamqa.info, islamqa.org, dar-alifta.org) answer single questions, often from one school, and differ on details [S61 to S65]. Useful for the "scholars differ" lines, not as course structure.
- **Muslim mental-health writing** (for example the Yaqeen Institute series with the Stanford Muslim Mental Health Lab) appeared in search results but was not opened here; not cited.
- **Gap this course fills:** no source found joins belief (qadr, tawakkul, sabr, shukr) to concrete weekly action (a means plan, a backup, a person to consult, a dua and a rhythm) for young professionals living with uncertainty, with every reference checked.

## Recommended changes to the draft outline

The seven-module shape works and fits about 16 hours. Changes, in module order:

1. **Module 1 (Anchors).** Anchor on 31:34 and 6:59, not 2:216 (battle context). Make Muslim 2664 the centre of "qadr and effort together", with Bukhari 4949 (the companions' "why act?" question). Add one short section "hardship is not a sign of anger" (Tirmidhi 2398, Bukhari 5641) so the misconception is met early.
2. **Module 2 (Tawakkul).** Use Bukhari 1523 with 2:197 as the sourced counter-example (people who skipped the means and called it trust), in place of the unverified Umar report. Move **Hajar (Bukhari 3364)** here as the second worked story: full trust and full effort on the same day. Keep the Hijra chapter strictly to Bukhari 3905, 2263, 2979, 3653 and 9:40, and name the guide only as "the sira books say".
3. **Module 3 (Sabr).** Open 3.1 with grief is human (Bukhari 1303) and Yaqub (12:84 to 87) before any definition, so "sabr is not silence" comes first. "Words for hard moments" uses Muslim 918, Bukhari 6346, Tirmidhi 3505 and Bukhari 6369 (four duas, two per chapter at most). In "waiting well", say "several years" for Yusuf, and add Yunus's recovery (37:145 to 146).
4. **Module 4 (Gratitude and hope).** Open with Muslim 2999 as the bridge from sabr to shukr. Teach hope and fear with 7:56, 17:57, 39:53, 15:56, Bukhari 7405 and Muslim 2755; drop Tirmidhi 983 unless the scholar approves. Use "look at those below you" (Muslim 2963) only as a tool the learner chooses.
5. **Module 5 (Decisions).** Use 42:38 as the main shura verse and 3:159 as the "consult, decide, trust" order (no story). Use Bukhari 3 (Khadijah and Waraqa) and Bukhari 2731 (Umm Salamah's advice) as consultation examples. Istikhara from Bukhari 1166 with the agreed core in the key and the differences in an open question. Drop "ma khaba man istakhara".
6. **Module 6 (Intention, good work, starting again).** Replace the "itqan" saying with Muslim 1955; add Bukhari 39 (do not overload yourself) next to Bukhari 6464. For starting again, use Muslim 2749, 3:135, 7:23 and Bukhari 6133 as primary; Tirmidhi 2499 only with approval; drop 3:139. Repeat Muslim 2664 ("not if only") here on purpose, as spaced retrieval from module 1.
7. **Module 7 (Community, care, steady plan).** Replace "most beneficial to people" with Muslim 2699 and Bukhari 2442. In "caring for body and mind", use Bukhari 5678, Tirmidhi 2038, Bukhari 5199, the two scholarly statements [S64, S65], and Bukhari 3 ("I feared for myself", and Khadijah's support) as the model for asking for help. Omit the "Year of Sorrow" label and Ka'b ibn Malik.
8. **Optional reorder.** If the architect wants decisions earlier (fellows face many choices), modules 4 and 5 could swap; the content does not depend on the order. Not required.

## Checklist for the qualified scholar's review

Each item needs a tick before publishing.

**Gradings to confirm or decide**
1. Jami' at-Tirmidhi 2517 with Sahih Ibn Hibban 731, "tie it and trust": accept as hasan?
2. Jami' at-Tirmidhi 2499 / Sunan Ibn Majah 4251, "every son of Adam errs": use or replace?
3. Jami' at-Tirmidhi 983 / Sunan Ibn Majah 4261, the dying young man: use or leave out?
4. Al-Adab al-Mufrad 479 (seedling): confirm sahih.
5. Jami' at-Tirmidhi 1956 (smiling), 2344 (birds), 2516 (Ibn Abbas), 3505 (Yunus), 2038 (treatment), 2396 and 2398 (trials): confirm the gradings listed.
6. Confirm that the "itqan" and "most beneficial" sayings, the Ta'if dua and "ma khaba man istakhara" are excluded.

**Paraphrases of meaning to confirm**
7. Every "Meaning" line in topics 1 to 18, especially 2:286 (scope of "capacity"), 94:5 to 6 ("with" hardship), 12:87 ("relief and mercy" for rawh), 65:3, 3:159, 39:53, 7:56, 17:57.
8. The course definition of tawakkul ("trusting Allah with your heart while you do the work with your hands") and of sabr, shukr, raja', khawf, ihsan, istirja and tawbah in the glossary.
9. The plain summary of Ibn Rajab [S58], Ibn al-Qayyim on three kinds of sabr [S59] and on the two wings [S60].

**"Scholars differ" lines to confirm**
10. The istikhara follow-up wording and the decision not to give a number of repetitions.
11. The sentence "istikhara is for choosing between things that are allowed".
12. The mental-health sentence "faith and professional care work together" and the decision to say nothing about medication.
13. The vocalisation of Muslim 2664 (qadaru Allah or qaddara Allah).

**Context decisions**
14. May 2:216 be cited at all (general clause only), or replaced?
15. 3:159 and 3:173: cite without the story, as recommended?
16. 9:40: cite the cave clause only?
17. Ta'if (Bukhari 3231): use, given Aisha's mention of Uhud?
18. Hudaybiyyah (Bukhari 2731): use the Umm Salamah advice without the treaty?
19. Ka'b ibn Malik (Bukhari 4418): omit, or stretch note only?
20. Maryam: start at 19:24 and do not quote 19:23?

**Arabic text**
21. Every Arabic block in this dossier against the printed Mushaf or the collection (character by character), and the choice of script for Quran text (imla'i as given here, or Uthmani).
22. The istikhara dua block, including how to show the narrator's alternative wording between the ـ marks.

**Stories**
23. The Hijra list (topic 5), Hajar (topic 18) and Yusuf's "several years" wording, as phrased here.

## Source table

Type key: Q = Quran text and translations; H = hadith collection (primary text as published on sunnah.com); G = grading database or a scholar's grading as listed on dorar.net; C = classical scholar (via a quoting source); M = modern scholarly body or fatwa service; T = tafsir; B = health body; O = other (publisher, organisation). All checked 2026-10-24.

| ID | Claim | Source | Type | Date checked | Confidence |
|---|---|---|---|---|---|
| S1 | Arabic text (imla'i and Uthmani; every Arabic block in this file matched the API text after Unicode NFC normalisation, which only reorders vowel marks and does not change what is displayed) and Sahih International and Abdel Haleem translations for 31:34, 6:59, 27:65, 2:216, 67:2, 2:155-157, 29:2-3, 51:56, 2:286, 94:5-6, 65:2-3, 65:7, 3:159, 3:173, 9:40, 2:153, 2:45, 39:10, 12:18, 12:42, 12:83-87, 12:90, 12:92, 12:100-101, 70:5, 21:87-88, 37:139-148, 14:7, 2:152, 31:12, 39:53, 15:56, 7:56, 17:57, 42:38, 7:23, 3:135-136, 3:139, 26:61-62, 19:23-26, 13:28, 2:197 | quran.com API v4, https://api.quran.com/api/v4/verses/by_key/{surah:ayah}?fields=text_uthmani,text_imlaei&translations=20,85 | Q | 2026-10-24 | High |
| S2 | The Clear Quran (Khattab) wording for the same verses | quran.com, for example https://quran.com/2:286 (translation 131 via the site) | Q | 2026-10-24 | High |
| S3 | Bid' means three to nine (Mujahid, Qatadah); Wahb ibn Munabbih: Yusuf in prison seven years | Tafsir Ibn Kathir (abridged), 12:42, https://api.quran.com/api/v4/tafsirs/169/by_ayah/12:42 | T | 2026-10-24 | High (for what Ibn Kathir reports) |
| S3a | Contexts: 2:216 makes fighting obligatory; 3:137-142 Uhud losses; 3:159 illustrated with Badr and Uhud consultations; 3:172-174 Hamra' al-Asad; 65:2-3 divorce passage; 9:40 the cave of Thawr in the Hijra, three days | Tafsir Ibn Kathir (abridged), https://api.quran.com/api/v4/tafsirs/169/by_ayah/{2:216, 3:139, 3:159, 3:173, 65:3, 9:40} | T | 2026-10-24 | High |
| S4 | Hadith of Jibril: belief in qadr, good and bad, is part of iman | Sahih Muslim 8a, https://sunnah.com/muslim:8a | H | 2026-10-24 | High |
| S5 | "Act, for each is eased toward what he was created for" | Sahih al-Bukhari 4949, https://sunnah.com/bukhari:4949; Sahih Muslim 2647a, https://sunnah.com/muslim:2647a | H | 2026-10-24 | High |
| S6 | Strong believer; seek what benefits; do not give up; do not say "if only"; vocalised qadaru Allah | Sahih Muslim 2664, https://sunnah.com/muslim:2664 | H | 2026-10-24 | High |
| S7 | Ibn Abbas hadith; Tirmidhi "hasan sahih", Darussalam Hasan | Jami' at-Tirmidhi 2516, https://sunnah.com/tirmidhi:2516 | H | 2026-10-24 | High |
| S8 | Hasbuna Allah: Ibrahim in the fire; the Prophet when warned of a gathered army | Sahih al-Bukhari 4563, https://sunnah.com/bukhari:4563 | H | 2026-10-24 | High |
| S9 | Birds hadith; Tirmidhi "hasan sahih"; Darussalam Hasan; Musnad Ahmad 373 Darussalam sahih | https://sunnah.com/tirmidhi:2344; https://sunnah.com/ibnmajah:4164; https://sunnah.com/ahmad:373 | H | 2026-10-24 | High |
| S10 | "Tie it and trust"; Darussalam Hasan; Tirmidhi: gharib from Anas; al-Qattan: munkar; also from Amr ibn Umayya | Jami' at-Tirmidhi 2517, https://sunnah.com/tirmidhi:2517 | H | 2026-10-24 | High |
| S11 | Amr ibn Umayya narration of "tie it and trust" in Ibn Hibban's Sahih | Sahih Ibn Hibban 731, https://sunnah.com/ibnhibban:731 | H | 2026-10-24 | High |
| S12 | Yemeni pilgrims without provisions called themselves mutawakkilun; 2:197 revealed | Sahih al-Bukhari 1523, https://sunnah.com/bukhari:1523 | H | 2026-10-24 | High |
| S13 | Hijra details: four months' preparation, midday visit, payment, Asma's belt, Thawr three nights, Abdullah's news, Amir's sheep, the non-Muslim guide from Banu ad-Dil, coast road | Sahih al-Bukhari 3905, https://sunnah.com/bukhari:3905 | H | 2026-10-24 | High |
| S14 | Same guide account; Asma's belt cut in two (Dhat an-Nitaqayn) | Sahih al-Bukhari 2263, https://sunnah.com/bukhari:2263; 2979, https://sunnah.com/bukhari:2979 | H | 2026-10-24 | High |
| S15 | "Two, when Allah is the third" | Sahih al-Bukhari 3653, https://sunnah.com/bukhari:3653 | H | 2026-10-24 | High |
| S16 | Patience at the first shock; the woman at the grave | Sahih al-Bukhari 1283, https://sunnah.com/bukhari:1283; Sahih Muslim 926a, https://sunnah.com/muslim:926a | H | 2026-10-24 | High |
| S17 | No gift better and wider than patience | Sahih al-Bukhari 1469, https://sunnah.com/bukhari:1469; Sahih Muslim 1053a, https://sunnah.com/muslim:1053a | H | 2026-10-24 | High |
| S18 | The eye sheds tears, the heart grieves (death of Ibrahim) | Sahih al-Bukhari 1303, https://sunnah.com/bukhari:1303; Sahih Muslim 2315, https://sunnah.com/muslim:2315 | H | 2026-10-24 | High |
| S19 | Istirja with "Allahumma ajurni fi musibati..."; Umm Salamah's story | Sahih Muslim 918a, b, c, https://sunnah.com/muslim:918a (and 918b, 918c) | H | 2026-10-24 | High |
| S20 | Dua of distress | Sahih al-Bukhari 6346, https://sunnah.com/bukhari:6346; Sahih Muslim 2730a, https://sunnah.com/muslim:2730a | H | 2026-10-24 | High |
| S21 | Dua of Dhun-Nun; Darussalam Sahih | Jami' at-Tirmidhi 3505, https://sunnah.com/tirmidhi:3505 | H | 2026-10-24 | High |
| S22 | Refuge from worry, grief, helplessness, laziness... | Sahih al-Bukhari 6369, https://sunnah.com/bukhari:6369 | H | 2026-10-24 | High |
| S23 | Look at those below you | Sahih Muslim 2963a, https://sunnah.com/muslim:2963a; Sahih al-Bukhari 6490, https://sunnah.com/bukhari:6490 | H | 2026-10-24 | High |
| S24 | How wonderful is the affair of the believer | Sahih Muslim 2999, https://sunnah.com/muslim:2999 | H | 2026-10-24 | High |
| S25 | Who does not thank people does not thank Allah; al-Albani Sahih (AD); Darussalam Sahih (T) | https://sunnah.com/abudawud:4811; https://sunnah.com/tirmidhi:1954; https://sunnah.com/tirmidhi:1955 | H | 2026-10-24 | High |
| S26 | "Should I not be a grateful servant?" | Sahih al-Bukhari 4836, https://sunnah.com/bukhari:4836; Sahih Muslim 2819a, https://sunnah.com/muslim:2819a | H | 2026-10-24 | High |
| S27 | "I am as My servant thinks of Me" | Sahih al-Bukhari 7405, https://sunnah.com/bukhari:7405; Sahih Muslim 2675a, https://sunnah.com/muslim:2675a | H | 2026-10-24 | High |
| S28 | Dying young man: hope and fear; Darussalam Hasan; Tirmidhi "gharib", mursal also reported | https://sunnah.com/tirmidhi:983; https://sunnah.com/ibnmajah:4261 | H | 2026-10-24 | High (text); grading disputed |
| S29 | Hudaybiyyah: Umm Salamah's advice | Sahih al-Bukhari 2731, 2732, https://sunnah.com/bukhari:2731 | H | 2026-10-24 | High |
| S30 | Istikhara hadith and dua; 1162 on sunnah.com is a different hadith | https://sunnah.com/bukhari:1166; https://sunnah.com/bukhari:6382; https://sunnah.com/bukhari:7390; https://sunnah.com/bukhari:1162 | H | 2026-10-24 | High |
| S31 | Actions are by intentions | https://sunnah.com/bukhari:1; https://sunnah.com/muslim:1907a | H | 2026-10-24 | High |
| S32 | Spending on family rewarded, even the morsel in your wife's mouth | https://sunnah.com/bukhari:56; https://sunnah.com/muslim:1628a | H | 2026-10-24 | High |
| S33 | Intending a good deed is written as a good deed | https://sunnah.com/bukhari:6491; https://sunnah.com/muslim:130; https://sunnah.com/muslim:131 | H | 2026-10-24 | High |
| S34 | Allah has prescribed ihsan in everything | Sahih Muslim 1955a, https://sunnah.com/muslim:1955a | H | 2026-10-24 | High |
| S35 | Most beloved deeds are the most consistent, even if small | https://sunnah.com/bukhari:6464; https://sunnah.com/muslim:782a; https://sunnah.com/muslim:783a; https://sunnah.com/muslim:783b | H | 2026-10-24 | High |
| S36 | The religion is ease; aim, come close, be glad | Sahih al-Bukhari 39, https://sunnah.com/bukhari:39 | H | 2026-10-24 | High |
| S37 | Palm seedling hadith; no grade shown on sunnah.com | Al-Adab al-Mufrad 479, https://sunnah.com/adab/27/4 | H | 2026-10-24 | High (text) |
| S38 | Eating from the work of one's own hands; Dawud | Sahih al-Bukhari 2072, https://sunnah.com/bukhari:2072 | H | 2026-10-24 | High |
| S39 | Every son of Adam errs: Darussalam Da'if (T 2499), Hasan (IM 4251); Tirmidhi: gharib | https://sunnah.com/tirmidhi:2499; https://sunnah.com/ibnmajah:4251 | H | 2026-10-24 | High (text); grading disputed |
| S40 | If you did not sin, Allah would bring people who sin and seek forgiveness | Sahih Muslim 2749, https://sunnah.com/muslim:2749 | H | 2026-10-24 | High |
| S41 | Not stung from the same hole twice | https://sunnah.com/bukhari:6133; https://sunnah.com/muslim:2998a | H | 2026-10-24 | High |
| S42 | Relieving distress; Allah helps the servant while he helps his brother; meeting a brother's need | https://sunnah.com/muslim:2699a; https://sunnah.com/bukhari:2442 | H | 2026-10-24 | High |
| S43 | Believers like one body | https://sunnah.com/bukhari:6011; https://sunnah.com/muslim:2586a | H | 2026-10-24 | High |
| S44 | Smiling is charity; Darussalam Hasan; Tirmidhi "hasan gharib" | Jami' at-Tirmidhi 1956, https://sunnah.com/tirmidhi:1956 | H | 2026-10-24 | High |
| S45 | Love for your brother what you love for yourself | https://sunnah.com/bukhari:13; https://sunnah.com/muslim:45a | H | 2026-10-24 | High |
| S46 | No disease without a cure | Sahih al-Bukhari 5678, https://sunnah.com/bukhari:5678 | H | 2026-10-24 | High |
| S47 | Seek treatment, servants of Allah; al-Albani Sahih (AD); Darussalam Sahih (T) | https://sunnah.com/abudawud:3855; https://sunnah.com/tirmidhi:2038 | H | 2026-10-24 | High |
| S48 | Your body has a right over you | https://sunnah.com/bukhari:5199; https://sunnah.com/bukhari:1975 | H | 2026-10-24 | High |
| S49 | Hajar: "Has Allah commanded you?... then He will not abandon us"; Safa and Marwa seven times; Zamzam | Sahih al-Bukhari 3364, https://sunnah.com/bukhari:3364 | H | 2026-10-24 | High |
| S50 | Hardest day: Ibn Abd Yalil; angel of the mountains; hope for their descendants; Aisha mentions Uhud | https://sunnah.com/bukhari:3231; https://sunnah.com/muslim:1795 | H | 2026-10-24 | High |
| S51 | Ka'b ibn Malik stayed behind from Tabuk; truthfulness; fifty nights | Sahih al-Bukhari 4418, https://sunnah.com/bukhari:4418 | H | 2026-10-24 | High |
| S52 | "To Allah belongs what He took"; tears are mercy | Sahih al-Bukhari 1284, https://sunnah.com/bukhari:1284 | H | 2026-10-24 | High |
| S53 | Prophets tested most (Darussalam Hasan; Tirmidhi hasan sahih); great reward with great trial (Darussalam Hasan; Tirmidhi hasan gharib) | https://sunnah.com/tirmidhi:2398; https://sunnah.com/tirmidhi:2396 | H | 2026-10-24 | High |
| S54 | No fatigue, illness, worry or sadness without sins being removed | Sahih al-Bukhari 5641, 5642, https://sunnah.com/bukhari:5641 | H | 2026-10-24 | High |
| S55 | If the believer knew the punishment / the disbeliever knew the mercy; die thinking well of Allah | https://sunnah.com/muslim:2755; https://sunnah.com/muslim:2877a | H | 2026-10-24 | High |
| S56 | First revelation: "I feared for myself"; Khadijah's comfort; Waraqa | Sahih al-Bukhari 3, https://sunnah.com/bukhari:3 | H | 2026-10-24 | High |
| S57a | "Tie it and trust": Ibn Hibban 731 (al-Arna'ut Hasan); al-Albani Hasan (Sahih al-Jami' 1068); as-Suyuti Sahih; al-Zurqani: sound via Amr ibn Umayya, weak via Anas; Ibn al-Qattan: unknown narrator; Yahya al-Qattan: munkar | dorar.net hadith search, https://dorar.net/hadith/search?q=اعقلها وتوكل | G | 2026-10-24 | High (as listed) |
| S57b | Birds: al-Albani Sahih (Sahih at-Tirmidhi 2344, Sahih Ibn Majah 3377, Sahih al-Jami' 5254); al-Arna'ut Sahih (Musnad 370, 373); Ibn Rajab discusses the chain (Jami' al-'Ulum 2/496) | https://dorar.net/hadith/search?q=لو أنكم توكلون على الله حق توكله | G | 2026-10-24 | High |
| S57c | Yunus dua: al-Albani Sahih (Sahih at-Tirmidhi 3505); Ibn Hajar Hasan; al-Arna'ut Sahih | https://dorar.net/hadith/search?q=دعوة ذي النون إذ دعا وهو في بطن الحوت | G | 2026-10-24 | High |
| S57d | Thanking people: al-Albani Sahih (Sahih at-Tirmidhi 1954; Sahih al-Jami' 6601; Sahih al-Adab al-Mufrad 160); Tirmidhi hasan sahih | https://dorar.net/hadith/search?q=من لا يشكر الناس لا يشكر الله | G | 2026-10-24 | High |
| S57e | Dying young man: al-Bukhari (al-'Ilal al-Kabir): only mursal; Abu Hatim: mursal more likely; al-Albani hasan sahih (Sahih at-Targhib 3383); Tirmidhi hasan gharib (as listed) | https://dorar.net/hadith/search?q=إني أرجو الله وإني أخاف ذنوبي | G | 2026-10-24 | High (as listed) |
| S57f | Seedling: al-Albani Sahih (Sahih al-Adab al-Mufrad 371; Sahih al-Jami' 1424; as-Sahihah 9); al-Arna'ut isnad sahih on Muslim's condition (Musnad 12902); al-Haythami: reliable narrators | https://dorar.net/hadith/search?q=وفي يد أحدكم فسيلة | G | 2026-10-24 | High |
| S57g | Trials: al-Albani Hasan (Sahih at-Tirmidhi 2396; as-Sahihah 146); prophets tested most: al-Albani Sahih (Sahih al-Jami' 992, Sa'd) | https://dorar.net/hadith/search?q=إن عظم الجزاء مع عظم البلاء; https://dorar.net/hadith/search?q=أشد الناس بلاء الأنبياء | G | 2026-10-24 | High |
| S57h | Ibn Abbas hadith: al-Albani Sahih (Sahih at-Tirmidhi 2516); al-Arna'ut isnad qawi / sahih (Musnad 2669, 2763) | https://dorar.net/hadith/search?q=احفظ الله يحفظك | G | 2026-10-24 | High |
| S57i | Every son of Adam errs: al-Albani Hasan (Sahih at-Tirmidhi 2499; Sahih at-Targhib 3139); Ibn Hajar Hasan; Ibn al-Qattan Sahih; Ibn 'Adi: not preserved; al-Mundhiri: Ali ibn Mas'adah | https://dorar.net/hadith/search?q=كل ابن آدم خطاء وخير الخطائين التوابون | G | 2026-10-24 | High (as listed) |
| S57j | Smiling: al-Albani Sahih (Sahih al-Jami' 2908; Sahih at-Targhib 2685); al-Arna'ut: weak narrator in Ibn Hibban 474 chain, strengthened by another sound chain | https://dorar.net/hadith/search?q=تبسمك في وجه أخيك لك صدقة | G | 2026-10-24 | High |
| S57k | Seek treatment: al-Albani Sahih (Sahih at-Tirmidhi 2038; Sahih al-Jami' 2930); an-Nawawi isnad sahih (al-Majmu'); Tirmidhi hasan sahih | https://dorar.net/hadith/search?q=تداووا فإن الله لم يضع داء | G | 2026-10-24 | High |
| S57l | Ta'if dua weak: al-Albani Da'if (Da'if al-Jami' 1182; ad-Da'ifah 2933); Ibn Baz: weak but well known in sira; al-Arna'ut: mursal, narrators reliable except "Allahumma ilayka ashku" | https://dorar.net/hadith/search?q=إليك أشكو ضعف قوتي | G | 2026-10-24 | High |
| S57m | "Allah loves... that he perfects it": al-Busiri isnad da'if; al-Bayhaqi "I think it a mistake"; Ibn 'Adi weak narrator; al-Albani hasan (Sahih al-Jami' 1880) and "has supporting reports" (as-Sahihah 1113); as-Suyuti hasan | https://dorar.net/hadith/search?q=إن الله يحب إذا عمل أحدكم عملا أن يتقنه | G | 2026-10-24 | High (as listed) |
| S57n | "Most beloved people... most beneficial": adh-Dhahabi mawdu' (one chain); ad-Daraqutni munkar; Ibn 'Asakir: a liar in the chain; al-Haythami: weak narrator; al-Albani hasan li-ghayrihi (Sahih at-Targhib 2623) | https://dorar.net/hadith/search?q=أحب الناس إلى الله أنفعهم للناس | G | 2026-10-24 | High (as listed) |
| S57o | "Ma khaba man istakhara": al-Albani mawdu' (ad-Da'ifah 611; Da'if al-Jami' 5056); Ibn Hajar: isnad very weak (Fath al-Bari 11/188); as-Suyuti da'if; al-Haythami: very weak narrators | https://dorar.net/hadith/search?q=ما خاب من استخار | G | 2026-10-24 | High |
| S57p | "Nahnu al-mutawakkilun" matches only Bukhari 1523 and Abu Dawud 1730 (al-Albani Sahih); no entry found for the Umar report | https://dorar.net/hadith/search?q=نحن المتوكلون; https://dorar.net/hadith/search?q=المتوكل الذي يلقي حبه في الأرض | G | 2026-10-24 | Medium (absence of a result) |
| S57q | Muslim 2749 also graded sahih by later scholars; Abu Sa'id version weaker | https://dorar.net/hadith/search?q=لو لم تذنبوا لذهب الله بكم | G | 2026-10-24 | High |
| S58 | Ibn Rajab: realising tawakkul does not contradict striving in the means; limbs obey, heart trusts (Jami' al-'Ulum wal-Hikam 2/498); al-Qushayri: tawakkul is in the heart, outward movement does not contradict it | Dar al-Ifta al-Misriyyah, "قيمة التوكل على الله في حياة المسلم", 2 May 2017, https://www.dar-alifta.org/ar/articles/details/5007 | C via M | 2026-10-24 | Medium-high (book not opened) |
| S59 | Ibn al-Qayyim: sabr in three kinds by what it relates to (obedience, avoiding the forbidden, decrees) ('Uddat as-Sabirin p. 52) | Dorar, Encyclopedia of Character, "أقسام الصبر", https://dorar.net/alakhlaq/1778 | C via M | 2026-10-24 | Medium-high (book not opened) |
| S60 | Ibn al-Qayyim, Madarij as-Salikin: the heart is like a bird; love its head; fear and hope its wings | Khalid as-Sabt, lesson on Madarij as-Salikin, https://khaledalsabt.com/explanations/1780 | C via M | 2026-10-24 | Medium (volume and page not checked) |
| S61 | No dream or feeling is required; ease after istikhara is a sign; quotes Ibn Taymiyyah (Majmu' 10/539), Ibn 'Allan, Ibn Hajar (Fath 11/223: "look at what the heart inclines to" narration very weak), an-Nawawi (al-Adhkar p. 132: a chain is odd) | islamqa.info answer 5882, https://islamqa.info/en/answers/5882/istikharah-signs | M | 2026-10-24 | High (for what the page says) |
| S62 | No dream needed; act on the heart's inclination; repeat up to seven days; then consult (Hanafi, Mufti Ebrahim Desai) | islamqa.org (Askimam) 28784, https://islamqa.org/hanafi/askimam/28784/ | M | 2026-10-24 | High (for what the page says) |
| S63 | No set clear signs after istikhara; mostly where one finds one's heart (25 August 2013) | Dar al-Ifta al-Misriyyah (English) fatwa 6529, https://dar-alifta.org/en/fatwa/details/6529/what-are-the-expected-signs-after-istikharah-prayer | M | 2026-10-24 | High |
| S64 | Nothing wrong with seeing a trustworthy, skilled psychiatrist or psychologist | islamqa.info answer 380763, https://islamqa.info/en/answers/380763/should-a-muslim-consult-a-psychologist-or-psychiatrist | M | 2026-10-24 | High |
| S65 | Psychological and religious treatment complement each other (Dr Anas Abu Shadi, Al-Azhar); mild conditions treated by a psychologist (Dr Mohamed El-Mahdi); 29 January 2025 | Dar al-Ifta al-Misriyyah, seminar "الفتوى والصحة النفسية", https://www.dar-alifta.org/ar/Articles/Details/9916 | M | 2026-10-24 | High |
| S66 | WHO/IASP media resource (update 2023): stories of overcoming a suicidal crisis linked to fewer suicides; addressed also to all who communicate publicly about suicide | PAHO/WHO, https://www.paho.org/en/documents/preventing-suicide-resource-media-professionals-update-2023 | B | 2026-10-24 | High (overview); Do and Don't list not opened |
| S67 | WHO suicide fact sheet: responsible media reporting is an effective intervention | https://www.who.int/news-room/fact-sheets/detail/suicide | B | 2026-10-24 | High |
| S68 | GCMHP free telephone counselling: number, hours, psychologists, referral | https://gcmhp.org/services/13 | O | 2026-10-24 | Medium (service may be disrupted) |
| S69 | Furqaan Institute holds the exclusive licence for The Clear Quran | QUL resource page, https://qul.tarteel.ai/resources/translation/426 | O | 2026-10-24 | High |
| S70 | Clear Quran site footer: Al-Furqaan Foundation | https://theclearquran.org/?p=15021 | O | 2026-10-24 | High |
| S71 | Guide's name Abdullah ibn Urayqit (variants); not a Muslim at the Hijra; no later Islam known (al-Maqdisi, an-Nawawi); adh-Dhahabi listed him among companions; sources: Ibn Hisham, al-Isaba | al-Ashkhar al-Yamani, Sharh Bahjat al-Mahafil, vol. 1 p. 150, https://shamela.ws/book/9780/149 | C | 2026-10-24 | Medium (secondary quoting al-Isaba) |
| S72 | Sahih International published 1997 by Abul-Qasim Publishing House, Jeddah | Search-result catalogue record (Princeton catalogue, SCSB-11718689); page not opened | O | 2026-10-24 | Low (not opened; orientation only) |

**Count:** 87 claim rows across 72 source entries (S57 is one site with 17 separate searches; S72 is listed for orientation only and supports no learner-facing claim).

## Unverified and do-not-use table

| # | Saying or claim | Status | Reason | What to say instead |
|---|---|---|---|---|
| U1 | "Allah loves, when one of you does a work, that he perfects it" (itqan) | Do not use as a hadith | Chains weak per al-Busiri, al-Bayhaqi, Ibn 'Adi; hasan only through supporting reports per al-Albani and as-Suyuti [S57m]. Disputed. | Muslim 1955: Allah has prescribed ihsan in everything. |
| U2 | "The most beloved people to Allah are the most beneficial to people" | Do not use as a hadith | Fabricated or munkar in some chains (adh-Dhahabi, ad-Daraqutni); hasan li-ghayrihi per al-Albani [S57n]. Disputed. | Muslim 2699 and Bukhari 2442 (Allah helps the one who helps his brother). |
| U3 | "Ma khaba man istakhara wa la nadima man istashar" | Do not use | Fabricated (al-Albani); very weak chain (Ibn Hajar) [S57o]. | 42:38 and Bukhari 1166; course advice: "consult people who know, then pray istikhara". |
| U4 | Ta'if dua "Allahumma ilayka ashku da'fa quwwati..." | Do not use as the Prophet's words | Weak (al-Albani; Ibn Baz: weak but well known in sira; al-Arna'ut: mursal, the dua words not supported) [S57l]. | Bukhari 3231 (hope for their descendants) and Bukhari 6369 (refuge from worry and grief). |
| U5 | Umar meeting people who said "we are mutawakkilun" and calling them "muttakilun"; "the mutawakkil is the one who throws the seed in the ground and trusts Allah" | UNVERIFIED; do not use | No source found: dorar.net search returned only Bukhari 1523 and Abu Dawud 1730; a web search found no takhrij [S57p]. | Bukhari 1523 with 2:197 (sound, same lesson). |
| U6 | Repeat istikhara seven times (the narration "...then look at what your heart inclines to") | Do not use | Very weak chain (Ibn Hajar); odd chain (an-Nawawi), as quoted in [S61]. | "You may repeat it; you do not need a dream." |
| U7 | Yusuf stayed in prison exactly seven years | Do not state as fact | Wahb ibn Munabbih's report in Ibn Kathir; the Quran says "several years" [S3]. | "Several years (Quran 12:42)." |
| U8 | The "Year of Sorrow" ('Am al-Huzn) as a named year | UNVERIFIED as a label | Sira usage; no hadith checked. | Omit; use Bukhari 1303 and Bukhari 3. |
| U9 | Spider web and dove's nest at the cave of Thawr | UNVERIFIED | Not in Bukhari 3905, 3653 or 9:40; not checked elsewhere. | Use only the Bukhari 3905 details. |
| U10 | an-Nawawi in al-Adhkar: "after istikhara he goes ahead with what his heart is at ease with" | UNVERIFIED wording | Widely quoted; the book was not opened, and no page quoting it with a reference was found. | Use the course phrasing in topic 12 and cite [S61 to S63]. |
| U11 | Commentators' context for "not stung twice" (an event after a battle) | UNVERIFIED | Not checked; also a battle context. | Cite the saying alone (Bukhari 6133). |
| U12 | Amir ibn Fuhayra's sheep were used to cover the tracks | UNVERIFIED | Commentary claim, not in the hadith text. | Say only what Bukhari 3905 says (he grazed sheep nearby and brought milk). |
| U13 | WHO's exact Do and Don't items (no method descriptions; give help information) | UNVERIFIED in the 2023 PDF | The PDF could not be opened (download only) [S66]. | The course rule in "Sensitive areas" stands on its own. |
| U14 | The Clear Quran permits 10% reproduction for 501(c)(3) educational use | UNVERIFIED | Publisher's terms behind a login [S69, S70]. | Paraphrase; short quotes under 15 words with attribution. |
| U15 | "Everything happens for a reason" as a hadith or verse | Not a hadith or verse | Popular saying; no source. | Bukhari 1284 for consoling; 12:100 ("my Lord is subtle in what He wills") for reflecting later. |
| U16 | "Allah gives His hardest battles to His strongest soldiers" | Not a hadith or verse; war imagery | Popular saying; no source; brief bans war imagery. | Tirmidhi 2398 (prophets tested most), in general terms only. |
| U17 | "Tie your camel and trust Allah" quoted as "trust in Allah but tie your camel" with no reference or grading | Use only with reference | The wording is fine; the reference and grading must be given [S10, S11]. | (Jami' at-Tirmidhi 2517, graded hasan). |
| U18 | Disputed hadith pending the scholar: Tirmidhi 2499 / Ibn Majah 4251; Tirmidhi 983 / Ibn Majah 4261 | Hold | Gradings differ (topic 11, 15) [S28, S39, S57e, S57i]. | Muslim 2749, 3:135, 7:23; Bukhari 7405, Muslim 2755, 7:56, 17:57. |
| U19 | Quran 3:139 as a comfort verse | Do not use | Direct Uhud context [S3a]. | 12:87, 39:53, 94:5 to 6. |

**Count:** 19 rows: 6 rejected sayings or reports (U1 to U6), 2 disputed hadith held for the scholar (U18), and 11 unverified details, contexts or popular sayings.

## Open questions

1. **Tirmidhi 2499 ("every son of Adam errs").** Use it (cited from Ibn Majah 4251 as hasan) or teach starting again with Muslim 2749 and 3:135 only?
2. **Tirmidhi 983 (hope and fear at death).** Leave out (recommended) or use with a note?
3. **Tirmidhi 2517 ("tie it and trust").** Accept as hasan with Ibn Hibban 731?
4. **Istikhara follow-up.** Approve the course phrasing in topic 12, including "go ahead with what seems best... watch whether the way opens" and "istikhara is for choosing between things that are allowed".
5. **Battle-context sources.** Approve the treatment of 2:216, 3:159, 3:173, 9:40, Ta'if and Hudaybiyyah, and the decisions to drop 3:139 and Ka'b ibn Malik.
6. **Quran script.** Simple (imla'i) as given here, or Uthmani?
7. **Muslim 2664 vocalisation.** qadaru Allah (sunnah.com) or qaddara Allah?
8. **Wellbeing contact.** Who is the named person, and may mentors receive a verified list of Gaza services (for example GCMHP)?
9. **Translation permissions.** Does the sponsor want permission from a translation publisher, or will chapters use only our own paraphrases plus rare short quotes?
10. **Sira details.** Should chapters say "the sira books name him Abdullah ibn Urayqit", or leave the guide unnamed?

## Handoff

```yaml
artifact: research-dossier
course: faith-and-resilience
version: 1
sources_checked: 2026-10-24
hard_constraints:
  - Only Quran verses and sahih or hasan hadith with checked numbers, gradings and graders; several popular sayings are replaced
  - Arabic copied only from the dossier, short, at most two blocks per chapter
  - Battle-context sources cited without the story, replaced, or dropped
  - Loss, grief and self-harm handled with safe wording and a named human contact; sadness is never weak faith
  - Graded keys only on what a source says or the difference between two taught ideas; scholarly differences go to open questions
out_of_scope:
  - Fiqh rulings beyond what a cited source states plainly
  - Qadr and free-will theology, schools and sects
  - Weak, fabricated or disputed hadith as the Prophet's words
  - Battle narratives and political readings of verses
  - Dreams, signs, numerology and guaranteed results from duas
  - Counselling techniques and any discussion of self-harm methods
  - Sira details not in the hadith collections unless labelled
open_questions:
  - Tirmidhi 2499 or Muslim 2749 for starting again
  - Tirmidhi 983 in or out
  - Tirmidhi 2517 with Ibn Hibban 731 as hasan
  - Istikhara follow-up wording and "permissible choices" sentence
  - Treatment of 2:216, 3:159, 3:173, 9:40, Ta'if, Hudaybiyyah; drop 3:139 and Ka'b ibn Malik
  - Quran script (imla'i or Uthmani)
  - Muslim 2664 vocalisation
  - Named wellbeing contact and mentor list of Gaza services
  - Translation permissions or paraphrase only
  - Naming the Hijra guide from the sira
```
