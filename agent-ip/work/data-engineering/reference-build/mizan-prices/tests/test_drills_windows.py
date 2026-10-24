"""Chapter 3.5: window function drills, the index experiment and a look at DuckDB's plan."""
import sys
from datetime import date, datetime
from pathlib import Path

from conftest import REPO, run_sql

DRILLS = REPO / "sql" / "drills"


def test_d06_latest_per_report(con):
    rows = run_sql(con, DRILLS / "d06_latest_per_report.sql")
    assert len(rows) == 2633  # distinct report ids
    assert len({r[0] for r in rows}) == 2633
    sent_twice = {r[0]: r for r in rows}["r-000020"]
    assert sent_twice[4] == datetime(2026, 3, 1, 12, 39)  # the later of 09:56 and 12:39


def test_d07_rank_keeps_ties_and_row_number_does_not(con):
    rows = run_sql(con, DRILLS / "d07_rank_items_by_price.sql")
    assert rows == [
        ("M04", 7.5, 1, 1), ("M07", 7.5, 1, 2), ("M01", 8.0, 3, 3), ("M02", 8.0, 3, 4),
        ("M08", 8.0, 3, 5), ("M03", 8.5, 6, 6), ("M06", 8.5, 6, 7), ("M05", 9.0, 8, 8),
    ]


def test_d08_weekly_change(con):
    rows = run_sql(con, DRILLS / "d08_weekly_change.sql")
    assert len(rows) == 38  # weeks 9 to 13; only 6 markets have a full basket on Sunday 1 March
    by_key = {(r[0], r[2]): r for r in rows}
    assert by_key[("M08", 10)] == ("M08", 2026, 10, 4, 142.75, 139.0, 3.75)
    assert by_key[("M05", 13)] == ("M05", 2026, 13, 3, 154.58, 154.2, 0.38)
    assert by_key[("M01", 10)][5:] == (None, None)  # no week 9 basket for M01, so nothing to compare with
    for market in ["M01", "M02", "M03", "M04", "M05", "M06", "M07", "M08"]:
        first = [r for r in rows if r[0] == market][0]
        assert first[5] is None  # LAG of the first week is NULL


def test_d09_moving_average(con):
    rows = [r for r in run_sql(con, DRILLS / "d09_moving_average.sql") if r[0] == "M02"]
    assert len(rows) == 27  # M02 reported no eggs on 2026-03-02
    assert rows[0] == ("M02", date(2026, 3, 1), 23.75, 23.75)
    assert rows[1] == ("M02", date(2026, 3, 3), 24.0, 23.875)  # the window is rows, not days
    assert rows[-1] == ("M02", date(2026, 3, 28), 23.5, 23.857)


def test_d10_index_changes_the_plan_from_scan_to_search(project):
    done = project.python("scripts/index_experiment.py", "sql/drills/d10_create_index.sql")
    before, after = done.stdout.split("Plan after the index:")
    assert "SCAN price_log" in before
    assert "SEARCH price_log USING INDEX idx_price_log_market_item" in after


def test_without_an_index_the_plan_stays_a_scan(project):
    Path("no_index.sql").write_text("SELECT 1;")
    done = project.python("scripts/index_experiment.py", "no_index.sql")
    assert done.stdout.count("SCAN price_log") == 2


def test_duckdb_explain_shows_partition_pruning_and_filter_pushdown(con, tmp_path):
    lake = (tmp_path / "pq").as_posix()
    con.execute(f"COPY (SELECT * FROM reports) TO '{lake}' (FORMAT parquet, PARTITION_BY (upload_date))")
    scan = f"read_parquet('{lake}/*/*.parquet', hive_partitioning = true)"
    by_partition = con.execute(f"EXPLAIN SELECT * FROM {scan} WHERE upload_date = DATE '2026-03-05'").fetchall()[0][1]
    assert "Scanning Files: 1/28" in by_partition  # 27 folders were never opened
    by_column = con.execute(f"EXPLAIN SELECT * FROM {scan} WHERE market_code = 'M05'").fetchall()[0][1]
    assert "Filters: market_code = 'M05'" in by_column  # pushed into the scan
