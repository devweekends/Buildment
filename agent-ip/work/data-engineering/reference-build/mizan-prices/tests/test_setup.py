"""Chapter 1.4: the setup check and the data generator."""
import hashlib
import json
import sqlite3
import sys
from pathlib import Path

from conftest import REPO, run_cmd


def parse_summary(text):
    """Turn the 'name: number' lines the generator prints into a dict."""
    return {line.split(":")[0]: int(line.split(":")[1]) for line in text.strip().splitlines()}


def fingerprint(folder):
    """One hash for every file under a folder, so two runs can be compared."""
    digest = hashlib.sha256()
    for path in sorted(Path(folder).rglob("*")):
        if path.is_file():
            digest.update(path.relative_to(folder).as_posix().encode())
            digest.update(path.read_bytes())
    return digest.hexdigest()


def test_generator_counts_for_seed_7(project):
    done = project.python("make_source.py")
    assert parse_summary(done.stdout) == {
        "markets": 8, "volunteers in registry": 11, "items": 12, "upload folders": 28,
        "distinct reports": 2633, "lines written": 2712, "late reports": 211,
        "duplicate sends": 79, "bad rows": 13, "true repeats": 31,
    }


def test_expected_files_exist(source_data):
    raw = source_data / "raw"
    for name in ["items.csv", "registry.db", "market_history.csv", "market_contacts.csv"]:
        assert (raw / name).exists(), name
    folders = sorted(p.name for p in (raw / "uploads").iterdir())
    assert folders[0] == "upload_date=2026-03-01" and folders[-1] == "upload_date=2026-03-28"
    assert len(folders) == 28
    assert (raw / "uploads" / "upload_date=2026-03-01" / "batch-01.jsonl").exists()


def test_same_seed_gives_identical_files(tmp_path):
    for name in ["a", "b"]:
        run_cmd([sys.executable, str(REPO / "make_source.py"), "--out", str(tmp_path / name)], cwd=tmp_path)
    assert fingerprint(tmp_path / "a") == fingerprint(tmp_path / "b")


def test_different_seed_gives_different_prices(tmp_path):
    for seed in ["7", "8"]:
        run_cmd([sys.executable, str(REPO / "make_source.py"), "--seed", seed, "--out", str(tmp_path / seed)], cwd=tmp_path)
    assert fingerprint(tmp_path / "7") != fingerprint(tmp_path / "8")


def read_lines(source_data, day):
    lines = []
    for path in sorted((source_data / "raw" / "uploads" / f"upload_date={day}").glob("batch-*.jsonl")):
        lines += [json.loads(x) for x in path.read_text().splitlines()]
    return lines


def test_unit_field_appears_from_15_march(source_data):
    before = read_lines(source_data, "2026-03-14")
    after = read_lines(source_data, "2026-03-15")
    assert all("unit" not in row for row in before)
    assert all("unit" in row for row in after)


def test_m05_outage_arrives_on_12_march(source_data):
    outage_days = ("2026-03-09", "2026-03-10", "2026-03-11")
    on_12th = [r for r in read_lines(source_data, "2026-03-12")
               if r["market_code"] == "M05" and r["reported_at"][:10] in outage_days]
    assert len(on_12th) == 37
    for day in ["2026-03-09", "2026-03-10", "2026-03-11"]:  # nothing from M05 for those days arrived earlier
        early = [r for r in read_lines(source_data, day) if r["market_code"] == "M05" and r["reported_at"][:10] in outage_days]
        assert early == []


def test_registry_as_of_last_day(source_data):
    db = sqlite3.connect(source_data / "raw" / "registry.db")
    markets = dict((r[0], r[1:]) for r in db.execute("SELECT market_code, area, opens, updated_at FROM markets"))
    volunteers = dict((r[0], r[1:]) for r in db.execute("SELECT volunteer_id, phone, updated_at FROM volunteers"))
    db.close()
    assert markets["M03"][0] == "Hill" and markets["M03"][2].startswith("2026-03-12")
    assert markets["M06"][1] == "Sat to Thu"
    assert volunteers["V07"][0] == "+970-59-000-0207" and volunteers["V07"][1].startswith("2026-03-15")
    assert "V11" not in volunteers and len(volunteers) == 11  # hard deleted


def test_registry_only_as_of_an_earlier_day(project):
    project.python("make_source.py", "--registry-only", "--as-of", "2026-03-14")
    db = sqlite3.connect(project.root / "data" / "raw" / "registry.db")
    assert db.execute("SELECT area FROM markets WHERE market_code = 'M03'").fetchone()[0] == "Hill"
    assert db.execute("SELECT opens FROM markets WHERE market_code = 'M06'").fetchone()[0] == "daily"
    assert db.execute("SELECT count(*) FROM volunteers").fetchone()[0] == 12
    db.close()
    assert not (project.root / "data" / "raw" / "uploads").exists()


def test_check_setup_script(project):
    done = project.python("scripts/check_setup.py")
    assert "OK duckdb 2.0.0" in done.stdout and "OK dbt-core 1.12.6" in done.stdout
    assert "NOTE data folder not found yet" in done.stdout
    project.make_data()
    assert "OK data folder found: data/raw" in project.python("scripts/check_setup.py", "--require-data").stdout
