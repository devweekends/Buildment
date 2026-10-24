"""Chapter 6.5: pseudonymised publishing, incremental registry extraction and the run log."""
import hashlib
import hmac
import json
from pathlib import Path

import duckdb
import pytest

from pipeline import extract_registry, paths
from pipeline.land import land_uploads
from pipeline.pseudonymise import MissingKeyError, publish_reports, volunteer_key
from pipeline.runlog import log_run


def read(pattern):
    return duckdb.connect().execute(f"SELECT * FROM read_parquet('{pattern}', union_by_name = true)").fetchall()


def columns(pattern):
    return [r[0] for r in duckdb.connect().execute(f"DESCRIBE SELECT * FROM read_parquet('{pattern}', union_by_name = true)").fetchall()]


def registry_as_of(project, day):
    project.python("make_source.py", "--registry-only", "--as-of", day)


# ---- pseudonymise ----

def test_same_phone_gives_the_same_key():
    assert volunteer_key("+970-59-000-0101", b"secret") == volunteer_key("+970-59-000-0101", b"secret")
    assert len(volunteer_key("+970-59-000-0101", b"secret")) == 16


def test_different_secret_gives_a_different_key():
    assert volunteer_key("+970-59-000-0101", b"secret-a") != volunteer_key("+970-59-000-0101", b"secret-b")


def test_different_phones_give_different_keys():
    assert volunteer_key("+970-59-000-0101", b"s") != volunteer_key("+970-59-000-0102", b"s")


def test_key_is_a_truncated_hmac_sha256():
    expected = hmac.new(b"s", b"+970-59-000-0101", hashlib.sha256).hexdigest()[:16]
    assert volunteer_key("+970-59-000-0101", b"s") == expected


def test_shared_files_have_no_name_or_phone(project):
    project.make_data()
    land_uploads("2026-03-02")
    assert publish_reports("2026-03-02") == 89
    cols = columns("lake/shared/reports/*/*.parquet")
    assert "volunteer_name" not in cols and "volunteer_phone" not in cols
    assert "volunteer_key" in cols and "volunteer_id" in cols
    # and the values are really gone: no phone number or name appears in any cell
    cells = " ".join(str(c) for row in read("lake/shared/reports/*/*.parquet") for c in row)
    assert "+970" not in cells and "Haddad" not in cells


def test_keys_in_shared_files_are_the_hmac_of_the_phone(project):
    project.make_data()
    land_uploads("2026-03-02")
    publish_reports("2026-03-02")
    restricted = duckdb.connect().execute(
        "SELECT report_id, volunteer_phone FROM read_parquet('lake/restricted/reports/*/*.parquet')").fetchall()
    shared = dict(duckdb.connect().execute("SELECT report_id, volunteer_key FROM read_parquet('lake/shared/reports/*/*.parquet')").fetchall())
    for report_id, phone in restricted:
        assert shared[report_id] == volunteer_key(phone, b"test-secret-not-real")


def test_publishing_twice_leaves_one_file_and_the_same_rows(project):
    project.make_data()
    land_uploads("2026-03-02")
    publish_reports("2026-03-02")
    assert publish_reports("2026-03-02") == 89
    assert [p.name for p in Path("lake/shared/reports/upload_date=2026-03-02").iterdir()] == ["part-0.parquet"]


def test_no_key_stops_with_a_clear_error(project, monkeypatch):
    project.make_data()
    land_uploads("2026-03-02")
    monkeypatch.delenv("MIZAN_KEY")
    with pytest.raises(MissingKeyError, match="MIZAN_KEY is not set"):
        publish_reports("2026-03-02")
    assert not Path("lake/shared").exists()  # it stopped before writing anything


def test_the_secret_is_never_written_to_disk(project):
    project.make_data()
    land_uploads("2026-03-02")
    publish_reports("2026-03-02")
    extract_registry.extract("volunteers")
    for folder in [paths.LAKE, paths.STATE, paths.LOGS]:
        for path in folder.rglob("*") if folder.exists() else []:
            if path.is_file():
                assert b"test-secret-not-real" not in path.read_bytes()


# ---- registry extraction ----

def test_first_extract_gets_all_rows_and_the_second_gets_none(project):
    project.make_data()
    assert extract_registry.extract("markets") == 8
    assert extract_registry.extract("volunteers") == 11
    assert extract_registry.extract("markets") == 0
    assert extract_registry.extract("volunteers") == 0
    assert len(list(Path("lake/shared/registry/markets").glob("extracted_at=*/part-0.parquet"))) == 1  # no empty files


def test_registry_files_have_no_name_or_phone(project):
    project.make_data()
    extract_registry.extract("volunteers")
    cols = columns("lake/shared/registry/volunteers/*/*.parquet")
    # extracted_at is not in the file: DuckDB adds it from the folder name (hive partitioning)
    assert sorted(cols) == ["extracted_at", "market_code", "updated_at", "volunteer_id", "volunteer_key"]
    assert "full_name" not in cols and "phone" not in cols


def test_second_extract_picks_up_exactly_the_v07_phone_change(project):
    project.make_data(1)  # one day of reports is enough: we only look at the registry
    registry_as_of(project, "2026-03-14")
    assert extract_registry.extract("markets") == 8
    assert extract_registry.extract("volunteers") == 12
    first_key = dict(duckdb.connect().execute("SELECT volunteer_id, volunteer_key FROM read_parquet('lake/shared/registry/volunteers/*/*.parquet')").fetchall())["V07"]
    registry_as_of(project, "2026-03-16")
    assert extract_registry.extract("markets") == 0
    assert extract_registry.extract("volunteers") == 1
    changed = duckdb.connect().execute(
        "SELECT volunteer_id, volunteer_key, updated_at FROM read_parquet('lake/shared/registry/volunteers/*/*.parquet')").fetchall()
    v07 = sorted(r for r in changed if r[0] == "V07")
    assert len(v07) == 2 and v07[0][2].startswith("2026-03-01") and v07[1][2].startswith("2026-03-15")
    assert first_key != v07[1][1]  # a new phone number means a new code (the code is made from the phone)


def test_market_changes_are_picked_up_when_they_happen(project):
    project.make_data(1)
    registry_as_of(project, "2026-03-11")
    assert extract_registry.extract("markets") == 8
    registry_as_of(project, "2026-03-12")
    assert extract_registry.extract("markets") == 1  # M03 moved to Hill
    registry_as_of(project, "2026-03-20")
    assert extract_registry.extract("markets") == 1  # M06 changed its opening days


def test_a_failure_before_writing_does_not_move_the_watermark(project, monkeypatch):
    project.make_data(1)

    def broken_write(rows, folder):
        raise OSError("disk full")

    with monkeypatch.context() as patch:  # the broken writer is only in place inside this block
        patch.setattr(extract_registry, "write_parquet", broken_write)
        with pytest.raises(OSError):
            extract_registry.extract("markets")
    assert extract_registry.read_watermarks() == {}
    assert list(Path("lake").rglob("*")) == []
    assert extract_registry.extract("markets") == 8  # the next run still gets everything


def test_watermark_file_holds_the_biggest_updated_at(project):
    project.make_data(1)
    registry_as_of(project, "2026-03-16")
    extract_registry.extract("markets")
    extract_registry.extract("volunteers")
    assert json.loads(Path("state/registry_watermarks.json").read_text()) == {
        "markets": "2026-03-12T09:00:00Z", "volunteers": "2026-03-15T08:30:00Z"}


def test_limit_a_hard_delete_is_invisible_to_watermark_extraction(project):
    """V11 is deleted from the registry on 22 March. A query on updated_at cannot see a row that is gone."""
    project.make_data(1)
    registry_as_of(project, "2026-03-21")
    assert extract_registry.extract("volunteers") == 12
    registry_as_of(project, "2026-03-23")  # V11 is gone from the registry now
    db_rows = duckdb.connect()
    assert extract_registry.extract("volunteers") == 0  # nothing changed as far as updated_at can tell
    ids = [r[0] for r in db_rows.execute("SELECT volunteer_id FROM read_parquet('lake/shared/registry/volunteers/*/*.parquet')").fetchall()]
    assert "V11" in ids  # we still think V11 exists


def test_unknown_table_is_refused(project):
    with pytest.raises(ValueError, match="unknown table"):
        extract_registry.extract("passwords")


# ---- run log ----

def test_log_run_appends_one_json_line_with_utc_times(project):
    log_run("land", "2026-03-02", "ok", rows=89)
    log_run("publish", "2026-03-02", "failed", detail="boom")
    lines = [json.loads(x) for x in Path("logs/runs.jsonl").read_text().splitlines()]
    assert [(x["task"], x["status"], x["rows"]) for x in lines] == [("land", "ok", 89), ("publish", "failed", None)]
    assert lines[1]["detail"] == "boom"
    assert lines[0]["started_at"].endswith("Z") and lines[0]["ended_at"].endswith("Z")
    assert lines[0]["started_at"] <= lines[0]["ended_at"]
