"""Chapter 4.5: the star schema prototype."""
import json
from pathlib import Path

import duckdb
import pytest


@pytest.fixture
def prototype(project):
    project.make_data()
    project.python("scripts/build_prototype.py")
    con = duckdb.connect("prototype.duckdb", read_only=True)
    yield con
    con.close()


def test_row_counts(prototype):
    counts = {t: prototype.execute(f"SELECT count(*) FROM {t}").fetchone()[0]
              for t in ["dim_market", "dim_item", "dim_date", "fct_price_report"]}
    assert counts == {"dim_market": 10, "dim_item": 12, "dim_date": 28, "fct_price_report": 2620}


def test_one_current_row_per_market(prototype):
    rows = prototype.execute("SELECT market_code, count(*) FROM dim_market WHERE is_current GROUP BY 1").fetchall()
    assert len(rows) == 8 and all(count == 1 for _, count in rows)
    # is_current must agree with valid_to being empty
    assert prototype.execute("SELECT count(*) FROM dim_market WHERE is_current <> (valid_to IS NULL)").fetchone()[0] == 0


def test_no_overlapping_validity_ranges(prototype):
    overlaps = prototype.execute("""
        SELECT count(*) FROM dim_market a JOIN dim_market b
          ON a.market_code = b.market_code AND a.market_key < b.market_key
         AND a.valid_from < COALESCE(b.valid_to, DATE '9999-12-31')
         AND b.valid_from < COALESCE(a.valid_to, DATE '9999-12-31')
    """).fetchone()[0]
    assert overlaps == 0


def test_every_fact_matches_exactly_one_market_version(prototype):
    bad = prototype.execute("""
        SELECT count(*) FROM (
            SELECT f.report_id, count(*) AS versions
            FROM fct_price_report f
            JOIN dim_date d ON d.date_key = f.date_key
            JOIN dim_market m ON m.market_key = f.market_key AND d.date >= m.valid_from AND (m.valid_to IS NULL OR d.date < m.valid_to)
            GROUP BY 1 HAVING count(*) <> 1)
    """).fetchone()[0]
    assert bad == 0
    assert prototype.execute("SELECT count(*) FROM fct_price_report").fetchone()[0] == 2620


def test_fact_report_id_is_unique(prototype):
    assert prototype.execute("SELECT count(*) - count(DISTINCT report_id) FROM fct_price_report").fetchone()[0] == 0


def test_m03_facts_follow_the_market_when_it_moved(prototype):
    rows = prototype.execute("""
        SELECT m.area, min(d.date), max(d.date), count(*)
        FROM fct_price_report f
        JOIN dim_market m ON m.market_key = f.market_key
        JOIN dim_date d ON d.date_key = f.date_key
        WHERE m.market_code = 'M03' GROUP BY m.area ORDER BY min(d.date)
    """).fetchall()
    assert [r[0] for r in rows] == ["Harbour", "Hill"]
    assert str(rows[0][2]) == "2026-03-11" and str(rows[1][1]) == "2026-03-12"


def test_fact_count_equals_distinct_good_report_ids(project, prototype):
    good = set()
    for path in Path("data/raw/uploads").glob("*/*.jsonl"):
        for text in path.read_text().splitlines():
            row = json.loads(text)
            if row["price"] > 0 and row["item_code"]:
                good.add(row["report_id"])
    assert len(good) == 2620
    assert prototype.execute("SELECT count(*) FROM fct_price_report").fetchone()[0] == len(good)


def test_running_the_build_twice_gives_the_same_counts(project):
    project.make_data()
    first = project.python("scripts/build_prototype.py").stdout
    second = project.python("scripts/build_prototype.py").stdout
    assert first == second
