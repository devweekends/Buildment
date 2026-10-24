"""Chapter 2.5: join drills. The expected rows were computed from seed 7."""
from datetime import date
from pathlib import Path

from conftest import run_sql

DRILLS = Path(__file__).resolve().parent.parent / "sql" / "drills"


def test_d01_reports_per_market(con):
    rows = run_sql(con, DRILLS / "d01_reports_per_market.sql")
    assert rows == [
        ("M01", "Al Nour Market", 335), ("M02", "Sea Gate Market", 341), ("M03", "Fisher Row Market", 341),
        ("M04", "Old Stone Market", 341), ("M05", "Northgate Market", 341), ("M06", "Olive Square Market", 338),
        ("M07", "Hilltop Market", 333), ("M08", "Palm Court Market", 342),
    ]
    assert sum(r[2] for r in rows) == 2712  # every line written by the generator


def test_d02_items_never_reported(con):
    rows = run_sql(con, DRILLS / "d02_items_never_reported.sql")
    assert rows == [("I08", "onions"), ("I09", "eggs")]


def test_d03_fan_out_total_is_not_doubled(con):
    rows = run_sql(con, DRILLS / "d03_fan_out.sql")
    assert rows == [("M02", 12, 135.5, 2)]
    # The trap: joining reports straight to contacts repeats every report once per contact.
    naive = con.execute("""
        SELECT SUM(r.price) FROM reports r JOIN market_contacts c ON c.market_code = r.market_code
        WHERE r.market_code = 'M02' AND CAST(r.reported_at AS DATE) = DATE '2026-03-04'
    """).fetchone()[0]
    assert naive == 271.0


def test_d04_average_price_with_nulls(con):
    rows = run_sql(con, DRILLS / "d04_average_price_nulls.sql")
    assert len(rows) == 13  # 12 items and one group with no item code
    by_item = {r[0]: r[1:] for r in rows}
    assert by_item["I01"] == (225, 224, 8.33)  # one bad price thrown away
    assert by_item["I02"] == (232, 232, 7.22)  # nothing thrown away
    assert by_item["I11"] == (219, 217, 14.24)  # two thrown away
    assert by_item[None] == (4, 4, 18.75)
    assert sum(r[1] for r in rows) == 2712
    assert sum(r[1] - r[2] for r in rows) == 9  # the 5 zero prices and the 4 negative ones


def test_d05_basket_by_market_day(con):
    rows = run_sql(con, DRILLS / "d05_basket_by_market_day.sql")
    assert len(rows) == 140
    assert rows[0] == ("M01", date(2026, 3, 3), 139.0)
    assert rows[-1] == ("M08", date(2026, 3, 28), 145.0)
    assert round(sum(r[2] for r in rows), 2) == 19794.58
    assert (min(r[2] for r in rows), max(r[2] for r in rows)) == (130.5, 155.5)
