# Listen-along audio for chapters

Any course can offer a **Listen** player on its chapters. The course declares which
chapters; one script makes the audio; the reader shows the player. Nothing else changes:
no database field, no per-course code.

## 1. Declare it in `course.yaml`

```yaml
narration:
  voice: af_heart          # a Kokoro voice (default af_heart)
  speed: 0.95              # 0.7 to 1.2 (default 0.95; slower is kinder for second-language learners)
  chapters:                # file names without .md
    - 01.02-roles-and-expectations
  pronunciations:          # optional: words the voice gets wrong, mapped to a spelling it says right
    Kubernetes: koo-ber-net-eez
```

The course source check validates this block, so a typo fails early.

## 2. Make the audio

```bash
python -m venv .venv && .venv/bin/pip install -r agent-ip/scripts/narrate/requirements.txt
python agent-ip/scripts/narrate/narrate.py --course collaboration --download-models   # first run only
python agent-ip/scripts/narrate/narrate.py --course collaboration                     # later runs
```

- Output goes to `frontend/public/narration/<course slug>/`: one small `.mp3` per chapter
  (about 1 MB for 4 minutes) and a `manifest.json`.
- Chapters whose text, voice and speed did not change are skipped, so re-running is cheap.
- `--dry-run` prints exactly what would be read aloud, with no model and no files. Use it to
  review the text before spending time on speech.
- `--chapter 01.02-roles-and-expectations` makes only that chapter; `--force` remakes it.
- Speech runs at about real time on a normal laptop CPU (a 4 minute chapter takes about 3 minutes).
  No GPU and no API key are needed. `--download-models` fetches about 120 MB once into
  `~/.cache/buildment-narration`.

## 3. What is read aloud

- **Read:** headings, prose, lists, callouts, Big Word Alerts and the recap.
- **Never read:** quiz, predict, open-question and AI-interview blocks. They become "Now try the
  question on the page", so answers and explanations stay silent.
- **Replaced by a pointer:** code and tables ("An example is shown on the page.").
- Em and en dashes are spoken as a pause.

Listen to each new course once and add any mispronounced word to `pronunciations`. The text
rules are covered by `python -m unittest agent-ip/scripts/narrate/test_narrate.py`.

## 4. Where the files are served from

By default the web app serves `public/narration/`. Audio is large compared with code, so for a
course with many chapters upload the `narration/` folder to object storage instead and set
`NARRATION_BASE_URL` (an `https://` address with the same layout) on the web app. The reader
never downloads audio until a learner presses play.

## For agent-ip

This folder only provides the mechanism. The question agent-ip asks a sponsor ("does this course
need audio?") and where it is logged are proposed separately, as their own agent-ip change.
Audio is optional and never replaces the written chapter.
