#!/usr/bin/env python3
"""Make listen-along audio for the chapters a course declares in its course.yaml.

    python agent-ip/scripts/narrate/narrate.py --course collaboration

The course opts in with a `narration:` block (see README.md). For each declared
chapter this script writes a spoken version of the teaching text, turns it into
speech with Kokoro (a small open model that runs on a normal CPU), shrinks it
with ffmpeg and records it in `<out>/<course>/manifest.json`, which the reader
uses to show a Listen player. Chapters whose text, voice and speed did not change
are skipped, so re-running is cheap.

Read aloud: headings, prose, lists, callouts, Big Word Alerts and the recap.
Never read aloud: quiz, predict and open-question blocks (answers and
explanations stay silent), code and tables (a short spoken pointer instead).

Only the Python standard library is needed to preview the text (--dry-run).
Speech needs the packages in requirements.txt and the model files, which
--download-models fetches once.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import re
import shutil
import subprocess
import sys
import tempfile
import time
import urllib.request
from pathlib import Path

REPO = Path(__file__).resolve().parents[3]
DEFAULT_OUT = REPO / "frontend" / "public" / "narration"
DEFAULT_MODELS = Path.home() / ".cache" / "buildment-narration"

MODEL_RELEASE = "https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0"
MODEL_FILES = {"kokoro-v1.0.int8.onnx": 92_361_271, "voices-v1.0.bin": 28_214_398}
MODEL_ID = "kokoro-v1.0.int8"
MANIFEST_VERSION = 1
PARAGRAPH_GAP_SECONDS = 0.45
BITRATE = "32k"


# ---------------------------------------------------------------- text -----


def attr(tag: str, name: str) -> str:
    match = re.search(name + r'="((?:[^"\\]|\\.)*)"', tag)
    return match.group(1) if match else ""


def clean_inline(text: str) -> str:
    text = re.sub(r"!\[[^\]]*\]\([^)]*\)", "", text)
    text = re.sub(r"\[([^\]]+)\]\([^)]*\)", r"\1", text)
    text = re.sub(r"`([^`]+)`", r"\1", text)
    text = re.sub(r"(\*\*|__)(.+?)\1", r"\2", text)
    text = re.sub(r"(?<!\w)[*_](.+?)[*_](?!\w)", r"\1", text)
    text = re.sub(r"<[^>]+>", "", text)
    text = text.replace("&nbsp;", " ").replace("\u2014", ", ").replace("\u2013", ", ")
    return re.sub(r"\s+", " ", text).strip()


def script_from_markdown(markdown: str) -> str:
    """Plain narration text for one chapter, paragraphs separated by blank lines."""
    markdown = re.sub(r"^---\n.*?\n---\n", "", markdown, count=1, flags=re.S)
    out: list[str] = []
    lines = markdown.split("\n")
    i = 0
    while i < len(lines):
        line = lines[i]
        fence = re.match(r"^```(\w*)", line)
        if fence:
            kind = fence.group(1)
            i += 1
            while i < len(lines) and not lines[i].startswith("```"):
                i += 1
            out.append("Now try the question on the page." if kind in ("quiz", "predict", "openquestion", "aiinterview")
                       else "An example is shown on the page.")
            i += 1
            continue
        if line.startswith("<BigWordAlert"):
            out.append(f"Big word: {attr(line, 'term')}. {attr(line, 'plainEnglish')}")
        elif line.startswith("<ChapterRecap"):
            points = re.findall(r'"((?:[^"\\]|\\.)*)"', line.split("points=", 1)[-1])
            out.append("To recap.")
            out.extend(point.rstrip(".") + "." for point in points)
        elif line.startswith("<Callout"):
            title = attr(line, "title")
            body: list[str] = []
            i += 1
            while i < len(lines) and not lines[i].startswith("</Callout"):
                body.append(lines[i])
                i += 1
            if title:
                out.append(title.rstrip(".") + ".")
            out.append(clean_inline(" ".join(body)))
        elif re.match(r"^#{1,6} ", line):
            out.append(clean_inline(re.sub(r"^#+ ", "", line)).rstrip(".") + ".")
        elif line.startswith("|"):
            if not out or out[-1] != "A table is shown on the page.":
                out.append("A table is shown on the page.")
        elif line.startswith("<") or line.startswith("import "):
            pass
        else:
            text = clean_inline(re.sub(r"^\s*(?:[-*+]|\d+\.)\s+", "", line))
            if text:
                out.append(text)
        i += 1
    return "\n\n".join(part for part in out if part)


def apply_pronunciations(text: str, pronunciations: dict[str, str]) -> str:
    """Swap words the voice gets wrong for a spelling it says correctly (whole words only)."""
    for word in sorted(pronunciations, key=len, reverse=True):
        text = re.sub(rf"(?<![\w-]){re.escape(word)}(?![\w-])", pronunciations[word], text)
    return text


def content_hash(narration: str, voice: str, speed: float) -> str:
    return hashlib.sha256(f"{MODEL_ID}|{voice}|{speed}|{narration}".encode("utf-8")).hexdigest()[:16]


# --------------------------------------------------------------- course -----


def load_narration_config(course_dir: Path) -> dict:
    import yaml  # PyYAML, only needed here

    manifest = yaml.safe_load((course_dir / "course.yaml").read_text(encoding="utf-8")) or {}
    config = manifest.get("narration")
    if not isinstance(config, dict) or not config.get("chapters"):
        raise SystemExit(f"{course_dir / 'course.yaml'} has no narration block with chapters.")
    return {
        # The reader finds audio by the course's slug, which can differ from its folder name.
        "slug": str(manifest.get("slug") or course_dir.name),
        "voice": str(config.get("voice") or "af_heart"),
        "speed": float(config.get("speed") or 0.95),
        "chapters": [str(stem).removesuffix(".md") for stem in config["chapters"]],
        "pronunciations": {str(k): str(v) for k, v in (config.get("pronunciations") or {}).items()},
    }


def module_dirs(course_dir: Path) -> list[Path]:
    """Module folders in the order the importer numbers them (by their numeric prefix)."""
    dirs = [p for p in course_dir.iterdir() if p.is_dir() and re.match(r"^\d+-", p.name)]
    return sorted(dirs, key=lambda p: int(p.name.split("-", 1)[0]))


def chapter_slug(course_dir: Path, chapter_file: Path) -> str:
    """The chapter's web address, built the way server/scripts/import-course.ts builds it."""
    order = module_dirs(course_dir).index(chapter_file.parent) + 1
    match = re.match(r"^\d+\.(\d+)-(.+)\.md$", chapter_file.name)
    if not match:
        raise SystemExit(f"{chapter_file.name} is not a chapter file name (expected 01.02-some-title.md)")
    return f"{order}-{int(match.group(1))}-{match.group(2)}"


def find_chapter(course_dir: Path, stem: str) -> Path:
    found = [p for module in module_dirs(course_dir) for p in module.glob(f"{stem}.md")]
    if len(found) != 1:
        raise SystemExit(f"Expected exactly one chapter named {stem}.md in {course_dir}, found {len(found)}.")
    return found[0]


# --------------------------------------------------------------- speech -----


def ensure_models(models_dir: Path, download: bool) -> tuple[Path, Path]:
    models_dir.mkdir(parents=True, exist_ok=True)
    for name, size in MODEL_FILES.items():
        target = models_dir / name
        if target.exists() and target.stat().st_size == size:
            continue
        if not download:
            raise SystemExit(f"Missing model file {target}. Run again with --download-models (about {sum(MODEL_FILES.values()) // 1_000_000} MB, once).")
        print(f"downloading {name} ({size // 1_000_000} MB) from {MODEL_RELEASE}")
        urllib.request.urlretrieve(f"{MODEL_RELEASE}/{name}", target)
        if target.stat().st_size != size:
            target.unlink()
            raise SystemExit(f"{name} downloaded with an unexpected size; try again.")
    return models_dir / "kokoro-v1.0.int8.onnx", models_dir / "voices-v1.0.bin"


def ffmpeg_path() -> str:
    found = shutil.which("ffmpeg")
    if found:
        return found
    import imageio_ffmpeg  # bundled ffmpeg, so nothing needs installing system-wide

    return imageio_ffmpeg.get_ffmpeg_exe()


def synthesize(kokoro, text: str, voice: str, speed: float, mp3: Path) -> float:
    """Speak `text` into a small mono mp3 and return its length in seconds."""
    import numpy as np
    import soundfile

    rate = 24000
    gap = np.zeros(int(rate * PARAGRAPH_GAP_SECONDS), dtype="float32")
    pieces = []
    for paragraph in text.split("\n\n"):
        samples, rate = kokoro.create(paragraph, voice=voice, speed=speed, lang="en-us")
        pieces.append(np.asarray(samples, dtype="float32"))
        pieces.append(gap)
    audio = np.concatenate(pieces)
    with tempfile.TemporaryDirectory() as tmp:
        wav = Path(tmp) / "speech.wav"
        soundfile.write(wav, audio, rate)
        subprocess.run(
            [ffmpeg_path(), "-y", "-loglevel", "error", "-i", str(wav),
             "-af", "loudnorm=I=-18:TP=-1.5", "-ac", "1", "-c:a", "libmp3lame", "-b:a", BITRATE, str(mp3)],
            check=True,
        )
    return len(audio) / rate


# ----------------------------------------------------------------- main -----


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--course", required=True, help="course folder name under courses/, for example collaboration")
    parser.add_argument("--chapter", action="append", help="only this chapter (file name without .md); repeatable")
    parser.add_argument("--out", type=Path, default=DEFAULT_OUT, help="where audio and manifest.json go (default frontend/public/narration)")
    parser.add_argument("--models-dir", type=Path, default=DEFAULT_MODELS)
    parser.add_argument("--download-models", action="store_true", help="fetch the Kokoro model files if missing")
    parser.add_argument("--force", action="store_true", help="regenerate even if nothing changed")
    parser.add_argument("--dry-run", action="store_true", help="print the narration text only; no speech, no files")
    args = parser.parse_args()

    course_dir = REPO / "courses" / args.course
    config = load_narration_config(course_dir)
    stems = args.chapter or config["chapters"]
    unknown = [s for s in stems if s not in config["chapters"]]
    if unknown:
        raise SystemExit(f"Not declared in course.yaml narration.chapters: {', '.join(unknown)}")

    out_dir = args.out / config["slug"]
    manifest_path = out_dir / "manifest.json"
    manifest = {"version": MANIFEST_VERSION, "chapters": {}}
    if manifest_path.exists():
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))

    kokoro = None
    changed = 0
    for stem in stems:
        chapter_file = find_chapter(course_dir, stem)
        slug = chapter_slug(course_dir, chapter_file)
        text = apply_pronunciations(script_from_markdown(chapter_file.read_text(encoding="utf-8")), config["pronunciations"])
        digest = content_hash(text, config["voice"], config["speed"])
        words = len(text.split())
        if args.dry_run:
            print(f"--- {stem} ({words} words, slug {slug}, hash {digest})\n{text}\n")
            continue
        entry = manifest["chapters"].get(slug)
        if entry and entry.get("hash") == digest and (out_dir / entry["file"]).exists() and not args.force:
            print(f"unchanged: {stem}")
            continue
        if kokoro is None:
            from kokoro_onnx import Kokoro

            model, voices = ensure_models(args.models_dir, args.download_models)
            kokoro = Kokoro(str(model), str(voices))
        out_dir.mkdir(parents=True, exist_ok=True)
        mp3 = out_dir / f"{stem}.mp3"
        started = time.time()
        seconds = synthesize(kokoro, text, config["voice"], config["speed"], mp3)
        manifest["chapters"][slug] = {
            "file": mp3.name,
            "minutes": round(seconds / 60, 1),
            "bytes": mp3.stat().st_size,
            "words": words,
            "voice": config["voice"],
            "hash": digest,
        }
        changed += 1
        print(f"made {mp3.name}: {seconds / 60:.1f} min, {mp3.stat().st_size / 1024 / 1024:.2f} MB, {time.time() - started:.0f}s")

    if not args.dry_run and changed:
        manifest["chapters"] = dict(sorted(manifest["chapters"].items()))
        manifest_path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
        print(f"wrote {manifest_path}")


if __name__ == "__main__":
    sys.exit(main())
