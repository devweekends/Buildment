---
artifact: research-dossier
course: one-percent-better
version: 2
status: draft; scholar review pending
sources_checked: 2026-10-26
---

# Research dossier: one-percent-better

This is the source of record for every verse and hadith in the course. Writers use only what is listed here, or what `../faith-and-resilience/research.md` already verified.

## Method

- **Quran.** Arabic from the quran.com API v4, field `text_imlaei` (`https://api.quran.com/api/v4/verses/by_key/{s:a}?fields=text_imlaei&translations=20`), the same source and script as the faith-and-resilience dossier. Meanings are our own paraphrases, checked against Sahih International (translation 20).
- **Hadith.** sunnah.com blocks scripted requests (Cloudflare challenge), so Arabic and gradings were taken from the open hadith-api dataset (`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/{ara,eng}-{collection}.min.json`), which mirrors the sunnah.com texts and references. Sahih Muslim is looked up by its standard (Abd al-Baqi) number, the number sunnah.com shows; Bukhari, Tirmidhi and Abu Dawud by their standard numbers. Gradings for books outside the two Sahihs are those listed in the dataset (al-Albani, Ahmad Shakir, Shu'ayb al-Arna'ut, Zubair Ali Zai, Bashar Awad Ma'ruf).
- **Machine check.** On 2026-10-26 every Arabic block in the course (20 blocks) was compared by script, after Unicode NFC normalisation and removal of direction marks, with the source texts above or with the faith-and-resilience dossier. All matched. A human check by the scholar is still required.
- **Numbering in apps.** Some apps, including Islam 360, may number Sahih Muslim differently from sunnah.com. The course tells learners to search by meaning if a number does not match.

## Hadith used

| Reference | Narrator | Grading | What the course uses it for |
|---|---|---|---|
| Sahih al-Bukhari 1 | Umar | Sahih | Actions are by intentions (1.3, 7.2) |
| Sahih al-Bukhari 39 | Abu Hurairah | Sahih | The religion is ease; aim close (1.2) |
| Sahih al-Bukhari 527 | Ibn Mas'ud | Sahih | Prayer at its time is the most beloved deed; the home version of the habit (2.2). Only the first answer is quoted. |
| Sahih al-Bukhari 528 | Abu Hurairah | Sahih | The river at the door: the five prayers (2.3) |
| Sahih al-Bukhari 611 | Abu Sa'id | Sahih | Repeat the words of the adhan (canvas adhan-to-first-takbir) |
| Sahih al-Bukhari 615 | Abu Hurairah | Sahih | The first row, going early, Isha and Fajr even crawling (2.2) |
| Sahih al-Bukhari 636 | Abu Hurairah | Sahih | Walk with calm at the iqamah; pray what you catch, complete what you missed (2.2) |
| Sahih al-Bukhari 645 | Ibn Umar | Sahih | Congregation better by 27 degrees (2.1, 2.2) |
| Sahih al-Bukhari 659 | Abu Hurairah | Sahih | Angels pray for one who stays in his place (2.2, 5.2) |
| Sahih al-Bukhari 722 | Abu Hurairah | Sahih | The imam is to be followed (2.2) |
| Sahih al-Bukhari 900 | Ibn Umar | Sahih | Do not stop women from the mosques (2.2) |
| Sahih al-Bukhari 1142 | Abu Hurairah | Sahih | Three knots; remember Allah, wudu, pray (2.3) |
| Sahih al-Bukhari 1423 | Abu Hurairah | Sahih | Seven shaded: secret charity, remembering Allah alone (1.3) |
| Sahih al-Bukhari 2996 | Abu Musa | Sahih | Deeds written during illness and travel (3.3, 7.1) |
| Sahih al-Bukhari 5009 | Abu Mas'ud | Sahih | The last two verses of al-Baqarah at night are enough (6.2) |
| Sahih al-Bukhari 5027 | Uthman | Sahih | The best learn the Quran and teach it (3.2) |
| Sahih al-Bukhari 6306 | Shaddad ibn Aws | Sahih | Sayyid al-istighfar, day and night (4.2) |
| Sahih al-Bukhari 6407 | Abu Musa | Sahih | The one who remembers and the one who does not: living and dead (4.1, 4.3) |
| Sahih al-Bukhari 6465 | Aisha | Sahih | Most beloved deeds are the most consistent, even if small; take on what you can (1.1, 1.2) |
| Sahih al-Bukhari 6499 | Jundub | Sahih | Whoever does deeds to be heard of or seen (1.3) |
| Sahih Muslim 233 | Abu Hurairah | Sahih | Five prayers expiate between them (research only) |
| Sahih Muslim 251 | Abu Hurairah | Sahih | Wudu when hard, steps to the mosque, waiting for prayer (2.2) |
| Sahih Muslim 591 | Thawban | Sahih | Istighfar three times and "Allahumma antas-salam" (5.2) |
| Sahih Muslim 597 | Abu Hurairah | Sahih | 33, 33, 33 and the tahlil after each prayer (5.2) |
| Sahih Muslim 656 | Uthman | Sahih | Isha and Fajr in congregation (2.2, 2.3) |
| Sahih Muslim 684 | Anas | Sahih | Pray a slept-through or forgotten prayer when you remember (2.3, 3.3) |
| Sahih Muslim 747 | Umar | Sahih | A portion slept through, read between Fajr and Dhuhr (3.3) |
| Sahih Muslim 782 | Aisha | Sahih | Do what you can manage; the Prophet's family kept their deeds (1.2) |
| Sahih Muslim 798 | Aisha | Sahih | The reader who stumbles has two rewards (3.2) |
| Sahih Muslim 804 | Abu Umamah | Sahih | Recite the Quran: it will intercede for its companions (3.1, 3.2) |
| Sahih Muslim 1893 | Abu Mas'ud | Sahih | Whoever guides to good has the doer's reward (1.3, 7.5) |
| Sahih Muslim 2642 | Abu Dharr | Sahih | Praise for a good deed is the believer's early glad tidings (1.3) |
| Sahih Muslim 2664 | Abu Hurairah | Sahih | Do not give up; do not say "if only" (7.2; Arabic from the faith dossier) |
| Sahih Muslim 2692 | Abu Hurairah | Sahih | SubhanAllahi wa bihamdihi 100 times morning and evening (4.2) |
| Sahih Muslim 2723 | Ibn Mas'ud | Sahih | "Amsayna wa amsal-mulku lillah" (4.2) |
| Sahih Muslim 2749 | Abu Hurairah | Sahih | People who sin and ask forgiveness (7.2; from the faith dossier) |
| Sahih Muslim 2985 | Abu Hurairah | Sahih | Allah is most free of need of partners (1.3) |
| Sunan Abi Dawud 1400 | Abu Hurairah | Hasan (al-Albani; Arna'ut: hasan li-ghayrihi) | Al-Mulk intercedes (6.2) |
| Sunan Abi Dawud 1522 | Mu'adh ibn Jabal | Sahih (al-Albani, Arna'ut; Zubair Ali Zai: isnad sahih) | "Allahumma a'inni 'ala dhikrika..." after every prayer (5.1, 5.2) |
| Jami' at-Tirmidhi 2891 | Abu Hurairah | Hasan (at-Tirmidhi, al-Albani, Shakir, Ma'ruf) | Al-Mulk interceded for a man until he was forgiven (6.2) |
| Jami' at-Tirmidhi 2910 | Ibn Mas'ud | Sahih (al-Albani, Shakir); hasan sahih (at-Tirmidhi, Ma'ruf) | A good deed for each letter, multiplied ten (3.1, 3.2) |
| Jami' at-Tirmidhi 3388 | Uthman | Hasan sahih (at-Tirmidhi, al-Albani, Shakir, Ma'ruf) | "Bismillahilladhi..." three times morning and evening (4.2). Chosen over Sunan Abi Dawud 5088, whose chain has an unnamed narrator. |

## Hadith named as disputed, not used as a basis

| Reference | Grading | How the course handles it |
|---|---|---|
| Jami' at-Tirmidhi 241 (forty days with the first takbir) | Hasan (al-Albani, Shakir); weak (Zubair Ali Zai). At-Tirmidhi notes it is also reported as Anas's own words and knew only one chain raising it to the Prophet. | Explained in 2.2 as disputed. The habit is built on Bukhari 645, 722, 636, 659 and Muslim 656. Quizzes test only that the grading is disputed. |
| Jami' at-Tirmidhi 2892 ("he would not sleep until he recited as-Sajdah and al-Mulk") | Weak in the dataset (al-Albani: da'if maqtu' for this entry; Zubair Ali Zai: da'if). Some scholars accept the meaning through other chains. | Named in 6.2 as disputed and not used. Sound virtue of al-Mulk from Tirmidhi 2891. |

## Quran used

2:152, 2:238, 2:285 to 286, 3:135, 3:191, 13:28, 17:78 (research only), 18:110, 20:14 (research only), 29:45 (research only), 33:41 to 42, 50:39, 54:17, 67:1 to 2, 73:20, 107:4 to 6.

**Context notes.** Quran 4:103 ("remember Allah standing, sitting and on your sides") sits in the passage on the prayer of fear in battle, so the course uses 3:191, which says the same of the people of understanding with no battle context. Quran 73:20 names fighting among the people excused; the course quotes only "recite what is easy of the Quran". Quran 2:286 ends with a dua for help against the disbelieving people; the course quotes only the opening clause and summarises the duas, as the faith dossier advises.

## Habit research

- James Clear, *Atomic Habits* (2018), chapter 1: the 1% picture (1.01^365 is about 37.8; 0.99^365 is about 0.03). The course presents it as arithmetic only; canvas `one-percent-a-day` is tested in `frontend/tests/unit/canvas/one-percent-a-day.test.ts`.
- Lally, P., van Jaarsveld, C. H. M., Potts, H. W. W. and Wardle, J. (2010), "How are habits formed: Modelling habit formation in the real world", *European Journal of Social Psychology* 40(6), 998 to 1009: median 66 days, range 18 to 254. Same figures as `building-habits`.

## Open questions for the scholar

1. Jami' at-Tirmidhi 241: is "disputed grading" the right wording for learners?
2. Jami' at-Tirmidhi 2892: confirm leaving it out, and the wording that some scholars accept it through other chains.
3. Times for the morning and evening adhkar: the course says "after Fajr" and "after Asr, before or soon after Maghrib" as one common practice. Approve or adjust.
4. The order of the adhkar after the prayer in 5.2, and the note respecting other community practices.
5. Sahih Muslim 747 speaks of a night portion missed through sleep; the course applies its spirit to a morning portion, with that caveat stated. Approve the wording.
6. Starting "SubhanAllahi wa bihamdihi" below 100 while building toward it (4.2): approve the wording.
7. The home version of the first-takbir habit for women (2.2), using Bukhari 527 and 900 and referring the rest to a local scholar.

## Version 2 additions (modules 7 to 14 and new chapters 2.4, 3.4, 6.4)

Added on 2026-10-26 after the request to cover the whole of daily life. Same method and machine check as above; all 71 Arabic blocks in the course matched their sources.

### Hadith added

| Reference | Grading | Used for |
|---|---|---|
| Sahih al-Bukhari 33 | Sahih | Signs of a hypocrite: lying, breaking promises, betraying trust (12.3, 13.2) |
| Sahih al-Bukhari 37, 38, 1903, 1923, 1957 | Sahih | Ramadan: night prayer, fasting with faith, false speech, suhoor, hastening iftar (14.4) |
| Sahih al-Bukhari 50; Sahih Muslim 8 | Sahih | Ihsan; learning by asking (9.1, 9.2, 13.3) |
| Sahih al-Bukhari 142; Jami' at-Tirmidhi 7 (sahih) | Sahih | Washroom duas (7.2) |
| Sahih al-Bukhari 168, 5855; Sahih Muslim 2097 | Sahih | Starting with the right; shoes right on, left off (7.2, 8.3) |
| Sahih al-Bukhari 201 | Sahih | Wudu with one mudd (8.2) |
| Sahih al-Bukhari 245, 887; Sunan an-Nasa'i 5 (sahih) | Sahih | Miswak (7.2, 8.3) |
| Sahih al-Bukhari 247, 6312 | Sahih | Sleep: wudu, right side, al-Bara's dua; sleep and waking duas (6.4, 7.2) |
| Sahih al-Bukhari 611, 614 | Sahih | Answering the adhan and the dua after it (2.4) |
| Sahih al-Bukhari 676 | Sahih | The Prophet served his family at home (12.3) |
| Sahih al-Bukhari 881, 883, 898, 934; Sahih Muslim 857 | Sahih | Friday: going early, ghusl and the chain, weekly bath, silence in the khutbah (8.3, 14.2) |
| Sahih al-Bukhari 2072 | Sahih | Earning by one's own hands (15.5 golden rules) |
| Sahih al-Bukhari 2101; Jami' at-Tirmidhi 2378 (hasan) | Sahih / hasan | Companions and friends (11.3) |
| Sahih al-Bukhari 2442, 2443, 2449; Sahih Muslim 2581 | Sahih | Rights of others, helping the wronged and wrongdoer, seeking pardon today, the bankrupt (11.1 to 11.4) |
| Sahih al-Bukhari 2466, 3318; Sunan Abi Dawud 5267 (sahih, al-Albani) | Sahih | Animals (11.4) |
| Sahih al-Bukhari 2989; Jami' at-Tirmidhi 1956 (sahih) | Sahih | Everyday acts as sadaqah (14.3) |
| Sahih al-Bukhari 3282; Sunan Abi Dawud 4782 (sahih) | Sahih | Anger: seek refuge, sit down (8.2, 11.2) |
| Sahih al-Bukhari 3562, 2820 | Sahih | The Prophet's haya and courage (10.3) |
| Sahih al-Bukhari 5376; Sahih Muslim 2020, 2022, 2024, 2028, 2734; Sahih al-Bukhari 5409, 5458, 5615, 5630; Sunan Abi Dawud 3767 (sahih), 4023 (hasan); Jami' at-Tirmidhi 2380 (sahih) | Sahih / hasan | Eating and drinking; dressing dua (7.2, 7.3) |
| Sahih al-Bukhari 5675; Sahih Muslim 2568 | Sahih | Visiting the sick and the dua (7.4) |
| Sahih al-Bukhari 5889; Sahih Muslim 258 | Sahih | The fitrah and the forty-night limit (8.3) |
| Sahih al-Bukhari 5971, 5986; Sahih Muslim 2548 | Sahih | Mother three times; kinship ties (12.1, 12.2) |
| Sahih al-Bukhari 6011, 6013; Jami' at-Tirmidhi 1919, 1924 (sahih) | Sahih | Mercy (11.4) |
| Sahih al-Bukhari 6014, 6018, 6136; Sahih Muslim 47 | Sahih | Good or silent; neighbour; guest (10.1, 12.3) |
| Sahih al-Bukhari 6029; Jami' at-Tirmidhi 1162 (hasan sahih), 2003 (sahih) | Sahih | Good character (11.1) |
| Sahih al-Bukhari 6056, 6094, 6474; Sahih Muslim 2589 | Sahih | Tale-bearing, truthfulness, guarding the tongue, backbiting (10.2) |
| Sahih al-Bukhari 6114, 6116; Sahih Muslim 2609 | Sahih | Anger control (11.2) |
| Sahih al-Bukhari 6120; Sahih Muslim 35 | Sahih | Haya (10.3) |
| Sahih al-Bukhari 6224 | Sahih | Sneezing in three lines (7.4) |
| Sahih al-Bukhari 6307; Sahih Muslim 408 | Sahih | Istighfar seventy times; durood (7.4) |
| Sahih al-Bukhari 6412, 6416; Jami' at-Tirmidhi 2307 (hasan sahih), 2417 (sahih, al-Albani), 2572 (sahih) | Sahih | Time, the traveller, remembering death, the questions on the Day, asking for Paradise (9.4, 13.1, 13.2) |
| Sahih al-Bukhari 7138; Sahih Muslim 1829 | Sahih | Everyone is a shepherd (12.3) |
| Sahih Muslim 49 | Sahih | Changing a wrong (11.4) |
| Sahih Muslim 54 | Sahih | Spreading the salam (7.4) |
| Sahih Muslim 91 | Sahih | Pride; Allah loves beauty (8.3, 9.3) |
| Sahih Muslim 102, 1015; Jami' at-Tirmidhi 614 (sahih, al-Albani) | Sahih | Cheating; Allah accepts only the good; haram nourishment (13.4) |
| Sahih Muslim 223, 244, 251; Sunan Ibn Majah 277 (sahih) | Sahih | Purity, wudu, keeping wudu (8.1, 8.2) |
| Sahih Muslim 713 | Sahih | Entering and leaving the mosque (7.2) |
| Sahih Muslim 728; Jami' at-Tirmidhi 413 (sahih, al-Albani), 415 (sahih) | Sahih | Twelve sunnah rak'ahs; first reckoning (2.4) |
| Sahih Muslim 2018 | Sahih | Mentioning Allah on entering the home (7.2) |
| Sahih Muslim 2159, 2657 | Sahih | The sudden glance; the zina of the eyes (10.3) |
| Sahih Muslim 2563 | Sahih | Suspicion, spying, envy, hatred (9.3, 10.4) |
| Sahih Muslim 2588 | Sahih | Charity does not decrease wealth; forgiveness raises honour (11.2, 14.3) |
| Sahih Muslim 2699 | Sahih | Easing hardship; the path of knowledge (13.3, 14.3) |
| Sahih Muslim 2723 | Sahih | Morning and evening words of Ibn Mas'ud (4.2) |
| Sahih al-Bukhari 5033 | Sahih | The Quran slips away; revision (3.4) |
| Jami' at-Tirmidhi 1987 (hasan); Sunan Ibn Majah 4245 (sahih, al-Albani) | Hasan / sahih | Taqwa wherever you are; private sins (9.2) |
| Jami' at-Tirmidhi 1990 (sahih); Sunan Abi Dawud 4990 (hasan) | Sahih / hasan | Joking with truth; lying to make people laugh (11.3) |
| Jami' at-Tirmidhi 2516 (sahih), 3372 (sahih); Sunan Abi Dawud 1479 (sahih) | Sahih | Ask Allah; dua is worship (7.4, 9.4) |
| Jami' at-Tirmidhi 3388 (hasan sahih) | Hasan sahih | Bismillahilladhi (4.2, 7) |
| Sunan Abi Dawud 1047 (sahih, al-Albani; Zubair Ali Zai: weak) | Sahih per al-Albani | Durood on Friday (14.2) |
| Sunan Abi Dawud 2357 (hasan) | Hasan | Iftar words (14.4) |
| Sunan Abi Dawud 3565 (sahih) | Sahih | A loan must be repaid; a lent thing returned (11.3, 13.4) |
| Sunan Abi Dawud 4811 (sahih) | Sahih | Thanking people (9.4, 11.2) |
| Sunan Abi Dawud 4992 (sahih) | Sahih | Enough of a sin to narrate all you hear (10.4) |
| Sunan Abi Dawud 5085 (hasan sahih) | Hasan sahih | The Prophet's dhikr on waking at night (7.2) |
| Sunan Abi Dawud 5095 (sahih); Jami' at-Tirmidhi 3426 (sahih) | Sahih | Leaving-home dua (7.2) |

### Corrections to the requester's list

| Item on the list | Finding | What the course does |
|---|---|---|
| "Dua is the marrow of worship", Jami' at-Tirmidhi 3371 | Graded weak (Shakir, al-Albani, Zubair Ali Zai) | Uses "dua is worship", Jami' at-Tirmidhi 3372 (sahih) and Sunan Abi Dawud 1479 |
| "Seeking knowledge is an obligation on every Muslim", Sunan Ibn Majah 224 | Very weak in this chain (al-Albani, al-Arna'ut) | Names it and builds learning on Sahih Muslim 2699 and Quran 20:114 |
| "Enough of a liar to narrate all he hears", Sahih Muslim, Muqaddimah | Muqaddimah not in the dataset used | Cites Sunan Abi Dawud 4992 (sahih), whose wording is "enough of a sin" |
| Wudu when angry | Sunan Abi Dawud 4784, graded weak | Uses sitting down (Sunan Abi Dawud 4782) and seeking refuge (Sahih al-Bukhari 3282) |
| Do not waste water even at a river | Sunan Ibn Majah 425, graded weak | Uses the Prophet's mudd (Sahih al-Bukhari 201) |
| A specific dua for entering the home | Sunan Abi Dawud 5096, graded weak | Uses Bismillah (Sahih Muslim 2018) and the salam (Quran 24:61) |
| Right foot first when entering the home | No specific sound hadith found | Presented as following the Prophet's general preference for the right (Sahih al-Bukhari 168) |
| Ten times each dhikr on waking | Close to Sunan Abi Dawud 5085 (night waking, its own list) | Quoted exactly as narrated, with context |
| A specific dua for drinking water | None sound beyond Bismillah and Alhamdulillah | Stated plainly (Sahih Muslim 2734) |

### Quran added

2:172 (meaning only), 2:183, 2:185, 3:134, 3:191, 4:58, 7:31, 13:28, 14:7, 16:43 (checked and not used: its context is earlier scripture), 17:23 to 24, 17:36, 20:114, 23:1 to 2, 23:51 (meaning only), 24:30 to 31, 24:61, 25:63, 25:67, 28:55, 31:18 to 19, 38:29, 40:60, 49:6, 49:10 to 12, 59:18, 66:6, 73:4, 79:40 to 41, 83:1 to 3. Quran 4:103 was replaced by 3:191 because of its battle context.

### Open questions added for the scholar

8. Friday ghusl (obligatory or recommended) and Jumu'ah for women are stated as differences for the learner's scholar; approve the wording in 14.2.
9. The wording on wudu and touching the mushaf in 3.4.
10. The sitting-and-standing-to-drink presentation in 7.3, showing both narrations.
11. The "changing a wrong with the hand" guidance for young people in 11.4 (tongue as the safe level).
12. The halal earning chapter (13.4) deliberately avoids specific rulings on interest and contracts; confirm the referral wording.
