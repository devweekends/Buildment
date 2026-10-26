"""Checks for the narration text rules. No model or audio needed:

    python -m unittest agent-ip/scripts/narrate/test_narrate.py
"""
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import narrate  # noqa: E402

CHAPTER = '''---
title: "Roles"
---

<BigWordAlert term="Expectation" plainEnglish="What a person believes will happen." whyItMatters="Hidden." />

## The task nobody owned

Amal thought **David** would build it, see [the guide](https://example.com).

```predict
prompt: "Who owns it?"
correctOptionId: david
explanation: "David owns it because the answer is David."
```

- Give every task one owner.
- Say what done means.

| Role | Job |
| --- | --- |
| Owner | Decides |

```text
Task: forgot password
```

<Callout type="tip" title="Repeat it back">
Say it again in your own words.
</Callout>

```quiz
prompt: "Pick one"
correctOptionIds: [a]
explanation: "A is the answer."
```

<ChapterRecap points={["One owner per task", "Write it down"]} />
'''


class NarrationText(unittest.TestCase):
    def setUp(self) -> None:
        self.text = narrate.script_from_markdown(CHAPTER)

    def test_reads_the_teaching(self) -> None:
        self.assertIn("Big word: Expectation. What a person believes will happen.", self.text)
        self.assertIn("The task nobody owned.", self.text)
        self.assertIn("Amal thought David would build it, see the guide.", self.text)
        self.assertIn("Give every task one owner.", self.text)
        self.assertIn("Repeat it back.\n\nSay it again in your own words.", self.text)
        self.assertIn("To recap.\n\nOne owner per task.\n\nWrite it down.", self.text)

    def test_never_reads_answers_or_explanations(self) -> None:
        for secret in ("correctOptionId", "David owns it because", "A is the answer", "Who owns it?", "Pick one"):
            self.assertNotIn(secret, self.text)
        self.assertEqual(self.text.count("Now try the question on the page."), 2)

    def test_replaces_code_and_tables_with_a_pointer(self) -> None:
        self.assertNotIn("forgot password", self.text)
        self.assertNotIn("Decides", self.text)
        self.assertIn("An example is shown on the page.", self.text)
        self.assertEqual(self.text.count("A table is shown on the page."), 1)

    def test_metadata_is_not_spoken(self) -> None:
        self.assertNotIn("title:", self.text)
        self.assertNotIn("whyItMatters", self.text)

    def test_no_dashes_are_spoken(self) -> None:
        text = narrate.script_from_markdown("A\u2014B and C\u2013D.")
        self.assertNotIn("\u2014", text)
        self.assertNotIn("\u2013", text)


class Pronunciations(unittest.TestCase):
    def test_whole_words_only(self) -> None:
        fixed = narrate.apply_pronunciations("Use OAuth, not OAuthless.", {"OAuth": "oh auth"})
        self.assertEqual(fixed, "Use oh auth, not OAuthless.")

    def test_hash_changes_with_voice_speed_or_text(self) -> None:
        base = narrate.content_hash("hello", "af_heart", 0.95)
        self.assertEqual(base, narrate.content_hash("hello", "af_heart", 0.95))
        self.assertNotEqual(base, narrate.content_hash("hello!", "af_heart", 0.95))
        self.assertNotEqual(base, narrate.content_hash("hello", "af_sky", 0.95))
        self.assertNotEqual(base, narrate.content_hash("hello", "af_heart", 1.0))


class ChapterSlugs(unittest.TestCase):
    def test_matches_the_importer_rule(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            course = Path(tmp)
            (course / "02-feedback").mkdir()
            (course / "01-teams").mkdir()
            chapter = course / "02-feedback" / "02.03-reviewing-work.md"
            chapter.write_text("x", encoding="utf-8")
            (course / "01-teams" / "01.01-intro.md").write_text("x", encoding="utf-8")
            # Second module folder by number, third lesson, then the title part of the file name.
            self.assertEqual(narrate.chapter_slug(course, chapter), "2-3-reviewing-work")
            self.assertEqual(narrate.find_chapter(course, "01.01-intro").name, "01.01-intro.md")


if __name__ == "__main__":
    unittest.main()
