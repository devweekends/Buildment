"""Chapter 11.5: freshness, volume and schema checks, and retention."""
import shutil
from pathlib import Path

import duckdb
import pytest

from pipeline import checks, retention, runner
from pipeline.land import all_upload_dates, land_uploads
from pipeline.pseudonymise import publish_reports


@pytest.fixture
def landed(project):
    """Sixteen days landed (restricted and quarantine), but no dbt."""
    project.make_data(16)
    for day in all_upload_dates():
        land_uploads(day)
    return project


# ---- volume ----

def test_volume_passes_on_a_normal_day(landed):
    result = checks.check_volume("2026-03-14")
    assert result.ok and result.value == 101
    assert result.threshold == pytest.approx(48.6, abs=0.1)  # half of the 7-day average (97.1)


def test_volume_fails_on_a_day_with_half_the_rows(landed):
    batch = Path("data/raw/uploads/upload_date=2026-03-14/batch-01.jsonl")
    batch.unlink()  # the first upload of the day never arrived
    land_uploads("2026-03-14")
    result = checks.check_volume("2026-03-14")
    assert not result.ok
    assert result.value == 40 and result.value < result.threshold
    assert "at least" in result.message


def test_volume_counts_quarantined_rows_as_received(landed):
    assert checks.landed_rows("2026-03-12") == 134  # 130 landed + 4 quarantined


def test_volume_with_no_earlier_days_passes(landed):
    result = checks.check_volume("2026-03-01")
    assert result.ok and "no earlier days" in result.message


def test_volume_for_a_day_that_never_landed_fails(landed):
    assert not checks.check_volume("2026-03-20").ok


# ---- freshness ----

def test_freshness_fails_when_the_newest_partition_is_too_old(landed):
    assert checks.check_freshness(2, today="2026-03-17").ok  # newest partition is 16 March: 1 day old
    old = checks.check_freshness(2, today="2026-03-20")
    assert not old.ok and old.value == 4 and old.threshold == 2


def test_freshness_fails_when_nothing_has_landed(project):
    assert not checks.check_freshness(2, today="2026-03-20").ok


# ---- schema ----

def test_schema_passes_and_allows_extra_fields(landed):
    result = checks.check_schema()
    assert result.ok and "matches contract" in result.message
    assert "upload_date" not in result.message  # the folder-name column is not a field of the file


def rewrite_latest_partition(sql):
    """Replace the newest restricted file with the result of a query on it (to break it on purpose)."""
    file = Path("lake/restricted/reports/upload_date=2026-03-16/part-0.parquet")
    con = duckdb.connect()
    con.execute(f"COPY ({sql.format(file=file.as_posix())}) TO 'broken.parquet' (FORMAT parquet)")
    con.close()
    shutil.move("broken.parquet", file)


def test_schema_fails_when_a_required_field_disappears(landed):
    rewrite_latest_partition("SELECT * EXCLUDE (price) FROM read_parquet('{file}')")
    result = checks.check_schema()
    assert not result.ok and "price is missing" in result.message


def test_schema_fails_when_a_type_changes(landed):
    rewrite_latest_partition("SELECT * REPLACE (CAST(price AS VARCHAR) AS price) FROM read_parquet('{file}')")
    result = checks.check_schema()
    assert not result.ok and "price is VARCHAR, the contract says DOUBLE" in result.message


def test_the_runner_checks_task_fails_when_a_check_fails(landed):
    runner.task_checks("2026-03-16")  # all fine: no error
    with pytest.raises(RuntimeError, match="freshness|old"):
        runner.task_checks("2026-03-30")


# ---- retention ----

@pytest.fixture
def lake(landed):
    for day in all_upload_dates():
        publish_reports(day)
    return landed


def listing(base):
    return sorted(p.relative_to(base).as_posix() for p in Path(base).rglob("part-0.parquet"))


def dates_in(base):
    """Upload dates of the partitions under one zone, for example lake/quarantine."""
    return sorted(p.split("upload_date=")[1].split("/")[0] for p in listing(base))


def test_dry_run_lists_the_right_partitions_and_deletes_nothing(lake):
    before = listing("lake")
    old_quarantine = [d for d in dates_in("lake/quarantine") if d < "2026-03-06"]
    old = retention.apply_retention("2026-03-16", keep_days=10, dry_run=True)  # cutoff 6 March
    restricted = [p.name for p in old if "restricted" in p.as_posix()]
    assert restricted == [f"upload_date=2026-03-0{d}" for d in range(1, 6)]
    assert len(old) == 5 + len(old_quarantine)
    assert listing("lake") == before


def test_a_real_run_deletes_old_restricted_partitions_and_keeps_shared(lake):
    shared_before = listing("lake/shared")
    retention.apply_retention("2026-03-16", keep_days=10)
    restricted = listing("lake/restricted")
    assert len(restricted) == 11 and all("upload_date=2026-03-06" <= p.split("/")[1] for p in restricted)
    assert listing("lake/shared") == shared_before  # pseudonymised data is kept


def test_old_quarantine_partitions_go_too_because_they_hold_names_and_phones(lake):
    quarantine_before = dates_in("lake/quarantine")
    assert quarantine_before, "the 16-day sample has bad rows, so quarantine is not empty"
    retention.apply_retention("2026-03-16", keep_days=5)  # cutoff 11 March
    assert dates_in("lake/quarantine") == [d for d in quarantine_before if d >= "2026-03-11"]


def test_nothing_is_old_enough_with_the_default_30_days(lake):
    assert retention.apply_retention("2026-03-16") == []


def test_retention_command_line(lake):
    done = lake.python("-m", "pipeline.retention", "--keep-days", "10", "--as-of", "2026-03-16", "--dry-run")
    assert done.stdout.count("would delete lake/restricted") == 5
    assert "would delete" in done.stdout and "partition(s)" in done.stdout
    assert len(listing("lake/restricted")) == 16


# ---- the CI workflow ----

def test_ci_workflow_is_valid_yaml_with_the_expected_steps():
    import yaml

    ci = yaml.safe_load((Path(__file__).resolve().parent.parent / ".github" / "workflows" / "ci.yml").read_text())
    triggers = ci.get("on", ci.get(True))  # the YAML word "on" can be read as the boolean True
    assert set(triggers) == {"push", "pull_request"}
    steps = ci["jobs"]["pipeline"]["steps"]
    commands = [s["run"] for s in steps if "run" in s]
    assert "pip install -r requirements.txt" in commands
    assert "python make_source.py --days 10 --start 2026-03-01 --seed 7 --out data" in commands
    assert any(c.startswith("python -m pipeline.runner backfill") for c in commands)
    assert 'pytest -q -m "not slow"' in commands and "dbt build --profiles-dir ." in commands
    assert [s for s in steps if "setup-python" in s.get("uses", "")][0]["with"]["python-version"] == "3.12"
    assert ci["jobs"]["pipeline"]["env"]["MIZAN_KEY"].startswith("ci-test")
