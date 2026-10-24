"""Chapter 8.5: late data, duplicates, schema change, the contract and backfills.

Most tests use 16 days of data (1 to 16 March). That covers the M05 outage (reports for 9 to 11 March
arrive on 12 March) and the form change (new unit field from 15 March).
"""
import json
import shutil
from pathlib import Path

import duckdb
import pytest

from conftest import Project, copy_code
from pipeline import extract_registry
from pipeline.contract import ContractError
from pipeline.land import all_upload_dates, land_uploads
from pipeline.pseudonymise import publish_reports

DAYS = 16
OUTAGE = ("2026-03-09", "2026-03-10", "2026-03-11")

pytestmark = pytest.mark.slow  # runs dbt many times


def new_project(tmp_path_factory, name, days=DAYS):
    folder = tmp_path_factory.mktemp(name) / "proj"
    copy_code(folder)
    project = Project(folder)
    project.make_data(days)
    return project


def process_one_day_at_a_time(project, *extra):
    """Land, publish and run dbt once for each upload day, like a daily schedule would.

    This runs tests/day_by_day.py in the project folder and returns what it saw after each day.
    """
    done = project.python(str(Path(__file__).resolve().parent / "day_by_day.py"), *extra)
    return json.loads(done.stdout.strip().splitlines()[-1])


@pytest.fixture(scope="module")
def once(tmp_path_factory):
    """16 days processed in one go. This is the answer the daily runs must match."""
    project = new_project(tmp_path_factory, "once")
    project.load_everything()
    return project


@pytest.fixture(scope="module")
def daily(tmp_path_factory):
    """16 days processed one upload day at a time. Records what the fact table looked like on the way."""
    project = new_project(tmp_path_factory, "daily")
    project.seen = process_one_day_at_a_time(project, "--final-build")  # ends with one full build, every test
    return project


def outage_ids(project):
    """Good M05 report ids for 9 to 11 March, read from the JSON lines."""
    ids = set()
    for path in (project.root / "data" / "raw" / "uploads").glob("*/*.jsonl"):
        for text in path.read_text().splitlines():
            row = json.loads(text)
            if row["market_code"] == "M05" and row["reported_at"][:10] in OUTAGE and row["price"] > 0 and row["item_code"]:
                ids.add(row["report_id"])
    return ids


def weekly_mart(project):
    return sorted(project.query("SELECT market_code, iso_year, iso_week, full_days, avg_basket_cost, change FROM mart_weekly_basket"))


def test_daily_runs_give_the_same_weekly_mart_as_one_big_run(once, daily):
    assert weekly_mart(daily) == weekly_mart(once)
    assert len(weekly_mart(once)) == 27  # weeks 9 to 12, only 16 days of data


def test_daily_runs_give_the_same_facts_as_one_big_run(once, daily):
    columns = "report_id, reported_date, market_key, item_key, volunteer_key, price, unit, reported_at, uploaded_at"
    assert sorted(daily.query(f"SELECT {columns} FROM fct_price_report")) == sorted(once.query(f"SELECT {columns} FROM fct_price_report"))


def test_m05_late_reports_are_in_the_fact_table_after_day_12(daily):
    assert daily.seen["2026-03-11"]["outage_rows"] == 0  # M05 had no connection yet
    arrived = len(outage_ids(daily))
    assert arrived == 34  # 37 lines arrived on the 12th: 34 different good reports, the rest are repeated sends or bad rows
    assert daily.seen["2026-03-12"]["outage_rows"] == arrived
    assert daily.seen["2026-03-16"]["outage_rows"] == arrived


def test_duplicate_sends_never_raise_the_fact_count(daily):
    for day, numbers in daily.seen.items():
        assert numbers["total"] == numbers["distinct"] == numbers["expected"], day


def test_unit_is_null_before_15_march_and_filled_after(once):
    assert once.query("SELECT count(unit) FROM fct_price_report WHERE uploaded_at < TIMESTAMP '2026-03-15'") == [(0,)]
    assert once.query("SELECT count(*) - count(unit) FROM fct_price_report WHERE uploaded_at >= TIMESTAMP '2026-03-15'") == [(0,)]
    assert once.query("SELECT count(DISTINCT unit) FROM fct_price_report") == [(4,)]  # kg, litre, tray of 30, pack


def test_a_backfill_of_three_days_leaves_every_total_unchanged(once, tmp_path):
    copy = tmp_path / "backfilled"
    shutil.copytree(once.root, copy, ignore=shutil.ignore_patterns("target", "logs"))
    project = Project(copy)
    totals = "SELECT count(*), sum(price), min(uploaded_at), max(uploaded_at) FROM fct_price_report"
    before = project.query(totals), weekly_mart(project)
    done = project.python("scripts/backfill.py", "--start", "2026-03-05", "--end", "2026-03-07")
    assert "2026-03-07: relanded and republished" in done.stdout
    assert (project.query(totals), weekly_mart(project)) == before
    project.query("SELECT 1")  # the warehouse can still be opened


def test_without_a_lookback_the_late_m05_reports_are_missed(tmp_path_factory):
    project = new_project(tmp_path_factory, "nolookback", days=13)
    seen = process_one_day_at_a_time(project, "--lookback", "0")
    missed = project.query("SELECT count(*) FROM fct_price_report f JOIN dim_market m USING (market_key) "
                           "WHERE m.market_code = 'M05' AND f.reported_date IN ('2026-03-09', '2026-03-10', '2026-03-11')")
    assert missed == [(0,)]  # the cost of having no lookback: those 34 reports never reach the fact table
    last = seen["2026-03-13"]
    assert last["total"] < last["expected"] - 34  # and the other late reports are missing too


def test_a_dimension_change_found_late_needs_a_backfill(tmp_path_factory):
    """M03 moved on 12 March. We only learn it on 16 March. The lookback is 3 days, so 12 March stays wrong until a backfill."""
    project = new_project(tmp_path_factory, "latedim")
    project.python("make_source.py", "--registry-only", "--as-of", "2026-03-11")
    project.load_everything()
    project.python("make_source.py", "--registry-only", "--as-of", "2026-03-16")
    project.python("-m", "pipeline.extract_registry", "--table", "markets")
    project.dbt("build")
    areas = "SELECT m.area, min(f.reported_date)::varchar, max(f.reported_date)::varchar FROM fct_price_report f JOIN dim_market m USING (market_key) WHERE m.market_code = 'M03' GROUP BY 1 ORDER BY 2"
    assert project.query(areas) == [("Harbour", "2026-03-01", "2026-03-12"), ("Hill", "2026-03-13", "2026-03-16")]  # 12 March is still Harbour: wrong
    project.python("scripts/backfill.py", "--start", "2026-03-12", "--end", "2026-03-16")
    assert project.query(areas) == [("Harbour", "2026-03-01", "2026-03-11"), ("Hill", "2026-03-12", "2026-03-16")]


# ---- the contract and the quarantine ----

def test_quarantine_has_the_bad_rows_with_their_reasons(project):
    project.make_data()
    for day in all_upload_dates():
        land_uploads(day)
    rows = duckdb.connect().execute(
        "SELECT reason, count(*) FROM read_parquet('lake/quarantine/reports/*/part-0.parquet') GROUP BY 1 ORDER BY 1").fetchall()
    assert rows == [("item_code is missing", 4), ("price must be above 0", 9)]
    quarantined_ids = {r[0] for r in duckdb.connect().execute("SELECT report_id FROM read_parquet('lake/quarantine/reports/*/part-0.parquet')").fetchall()}
    bad_in_json = set()
    for path in Path("data/raw/uploads").glob("*/*.jsonl"):
        for text in path.read_text().splitlines():
            row = json.loads(text)
            if not row["price"] > 0 or not row["item_code"]:
                bad_in_json.add(row["report_id"])
    assert quarantined_ids == bad_in_json and len(bad_in_json) == 13
    # good rows + bad rows = every line the generator wrote
    good = duckdb.connect().execute("SELECT count(*) FROM read_parquet('lake/restricted/reports/*/part-0.parquet')").fetchone()[0]
    assert good == 2699 and good + 13 == 2712


def test_a_day_with_bad_rows_lands_the_good_ones_and_is_still_idempotent(project):
    project.make_data()
    assert land_uploads("2026-03-10") == 85  # 88 lines, 3 of them bad
    assert land_uploads("2026-03-10") == 85
    assert [p.name for p in Path("lake/quarantine/reports/upload_date=2026-03-10").iterdir()] == ["part-0.parquet"]
    assert duckdb.connect().execute("SELECT count(*) FROM read_parquet('lake/quarantine/reports/upload_date=2026-03-10/part-0.parquet')").fetchone()[0] == 3


def write_batch(day, lines):
    folder = Path(f"data/raw/uploads/upload_date={day}")
    folder.mkdir(parents=True, exist_ok=True)
    (folder / "batch-01.jsonl").write_text("".join(json.dumps(x) + "\n" for x in lines))


def a_report(**changes):
    row = {"report_id": "r-900001", "market_code": "M01", "item_code": "I01", "price": 8.0, "reported_at": "2026-04-01T08:00:00Z",
           "uploaded_at": "2026-04-01T09:00:00Z", "volunteer_id": "V01", "volunteer_name": "Test Person",
           "volunteer_phone": "+970-59-000-0000"}
    row.update(changes)
    return row


def test_a_new_unknown_field_is_allowed_and_kept(project):
    write_batch("2026-04-01", [a_report(note="bought at the gate")])
    assert land_uploads("2026-04-01") == 1
    columns = [r[0] for r in duckdb.connect().execute("DESCRIBE SELECT * FROM 'lake/restricted/reports/upload_date=2026-04-01/part-0.parquet'").fetchall()]
    assert "note" in columns


def test_a_batch_missing_a_required_field_fails_with_a_clear_message(project):
    row = a_report()
    del row["price"]
    write_batch("2026-04-02", [row])
    with pytest.raises(ContractError, match=r"required field\(s\) missing from the batch: price"):
        land_uploads("2026-04-02")
    assert not Path("lake").exists()  # nothing was written
