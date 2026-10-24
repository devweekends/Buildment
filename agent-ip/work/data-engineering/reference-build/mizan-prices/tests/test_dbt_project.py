"""Chapter 7.5: the dbt project (staging, snapshot, star schema, tests, unit test, docs)."""
import json
import re
import shutil

import pytest
from pathlib import Path

from conftest import Project, run_sql

DRILLS = Path(__file__).resolve().parent.parent / "sql" / "drills"

pytestmark = pytest.mark.slow  # runs dbt many times


def good_report_ids(data_folder):
    """Report ids with a positive price and an item code, read straight from the JSON lines."""
    ids = set()
    for path in Path(data_folder, "raw", "uploads").glob("*/*.jsonl"):
        for text in path.read_text().splitlines():
            row = json.loads(text)
            if row["price"] > 0 and row["item_code"]:
                ids.add(row["report_id"])
    return ids


def test_first_dbt_build_succeeds(built):
    out = built.first_build.stdout
    assert "Completed successfully" in out
    assert "PASS=39 WARN=0 ERROR=0 SKIP=0" in out


def test_a_second_build_is_incremental_and_still_succeeds(built):
    again = built.dbt("build")
    assert "ERROR=0" in again.stdout
    assert built.query("SELECT count(*) FROM fct_price_report") == [(2620,)]


def test_fact_count_equals_distinct_good_report_ids(built):
    ids = good_report_ids(built.root / "data")
    assert len(ids) == 2620
    assert built.query("SELECT count(*), count(DISTINCT report_id) FROM fct_price_report") == [(len(ids), len(ids))]


def test_weekly_mart_has_8_markets_and_the_expected_weeks(built):
    rows = built.query("SELECT count(DISTINCT market_code), count(*), min(iso_week), max(iso_week) FROM mart_weekly_basket")
    assert rows == [(8, 38, 9, 13)]  # weeks 9 to 13 of 2026; only 6 markets have a full basket on Sunday 1 March
    weeks = built.query("SELECT iso_week, count(*) FROM mart_weekly_basket GROUP BY 1 ORDER BY 1")
    assert weeks == [(9, 6), (10, 8), (11, 8), (12, 8), (13, 8)]


def test_weekly_mart_gives_the_same_numbers_as_the_sql_drill(built, con):
    drill = {(r[0], r[2]): r for r in run_sql(con, DRILLS / "d08_weekly_change.sql")}
    mart = built.query("SELECT market_code, iso_week, full_days, avg_basket_cost, change FROM mart_weekly_basket")
    assert len(mart) == len(drill) == 38
    for market, week, days, cost, change in mart:
        _, _, _, drill_days, drill_cost, _, drill_change = drill[(market, week)]
        assert days == drill_days
        assert abs(float(cost) - drill_cost) < 0.006
        assert (change is None) == (drill_change is None)


def test_weekly_mart_values_for_one_market(built):
    rows = built.query("SELECT iso_week, full_days, avg_basket_cost, change, change_pct FROM mart_weekly_basket WHERE market_code = 'M08' ORDER BY iso_week")
    assert [(w, d, str(c)) for w, d, c, _, _ in rows] == [
        (9, 1, "139.00"), (10, 4, "142.75"), (11, 5, "143.70"), (12, 6, "144.58"), (13, 4, "146.00")]
    assert str(rows[1][3]) == "3.75" and str(rows[1][4]) == "2.7"


def test_dimensions(built):
    assert built.query("SELECT count(*) FROM dim_item") == [(12,)]
    assert built.query("SELECT count(*), min(date_key), max(date_key) FROM dim_date") == [(28, 20260301, 20260328)]
    # registry was extracted once, after both changes, so the snapshot has seen one version of each market
    assert built.query("SELECT count(*), count(DISTINCT market_code), sum(is_current::int) FROM dim_market") == [(8, 8, 8)]
    assert built.query("SELECT area FROM dim_market WHERE market_code = 'M03'") == [("Hill",)]


def test_every_fact_has_a_market_item_and_date(built):
    assert built.query("SELECT count(*) FROM fct_price_report WHERE market_key IS NULL OR item_key IS NULL OR date_key IS NULL") == [(0,)]


def test_staging_keeps_the_latest_send_and_unit_is_null_before_the_form_change(built):
    assert built.query("SELECT count(*) FROM stg_price_reports") == [(2620,)]
    # The form change is by UPLOAD date: a report made on 14 March but uploaded on 16 March already has a unit.
    assert built.query("SELECT count(unit) FROM stg_price_reports WHERE uploaded_at < TIMESTAMP '2026-03-15'") == [(0,)]
    assert built.query("SELECT count(*) - count(unit) FROM stg_price_reports WHERE uploaded_at >= TIMESTAMP '2026-03-15'") == [(0,)]


def test_the_dbt_unit_test_passes_on_its_own(built):
    done = built.dbt("test", "--select", "test_type:unit")
    assert "PASS=1" in done.stdout


def test_docs_generate_works_offline(built):
    done = built.dbt("docs", "generate")
    assert "Catalog written" in done.stdout
    assert (built.root / "transform" / "target" / "index.html").exists()


def test_the_contract_stops_a_column_type_change(built, tmp_path):
    copy = tmp_path / "broken"
    shutil.copytree(built.root, copy, ignore=shutil.ignore_patterns("target", "logs"))
    model = copy / "transform" / "models" / "marts" / "fct_price_report.sql"
    model.write_text(model.read_text().replace("    r.price,\n", "    cast(r.price as double) as price,\n"))
    done = Project(copy).dbt("build", "--select", "fct_price_report", check=False)
    assert done.returncode != 0
    assert "contract" in done.stdout.lower()
    assert re.search(r"price.*(DOUBLE|decimal)", done.stdout, re.IGNORECASE | re.DOTALL)


def test_snapshot_keeps_two_rows_for_m03_after_the_registry_change(project):
    project.make_data(14)
    project.python("make_source.py", "--registry-only", "--as-of", "2026-03-11")  # M03 is still in Harbour
    project.load_everything()
    assert project.query("SELECT area, dbt_valid_to IS NULL FROM snapshots.snap_markets WHERE market_code = 'M03'") == [("Harbour", True)]

    project.python("make_source.py", "--registry-only", "--as-of", "2026-03-14")  # now M03 has moved to Hill
    project.python("-m", "pipeline.extract_registry", "--table", "markets")
    project.dbt("build")

    rows = project.query("SELECT area, dbt_valid_from::date, dbt_valid_to::date FROM snapshots.snap_markets WHERE market_code = 'M03' ORDER BY dbt_valid_from")
    assert [(a, str(f), str(t)) for a, f, t in rows] == [("Harbour", "2026-03-01", "2026-03-12"), ("Hill", "2026-03-12", "None")]
    # the dimension gives the same two versions, and the first one is valid since the beginning
    dim = project.query("SELECT area, valid_from::varchar, valid_to::varchar, is_current FROM dim_market WHERE market_code = 'M03' ORDER BY valid_from")
    assert dim == [("Harbour", "1900-01-01", "2026-03-12", False), ("Hill", "2026-03-12", None, True)]
    # facts follow: reports up to 11 March point at the Harbour version, from 12 March at the Hill version
    facts = project.query("""
        SELECT m.area, min(f.reported_date)::varchar, max(f.reported_date)::varchar
        FROM fct_price_report f JOIN dim_market m ON m.market_key = f.market_key
        WHERE m.market_code = 'M03' GROUP BY 1 ORDER BY 2""")
    assert facts == [("Harbour", "2026-03-01", "2026-03-11"), ("Hill", "2026-03-12", "2026-03-14")]
