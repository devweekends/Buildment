"""Chapter 5.5: landing the JSON uploads as Parquet.

Note: from chapter 8.5 on, land_uploads sends bad rows to quarantine. The dates used here have no bad rows,
so the numbers are the same before and after 8.5.
"""
import json
from pathlib import Path

import duckdb
import pytest

from pipeline import paths
from pipeline.land import land_uploads


@pytest.fixture
def landed(project):
    project.make_data()
    return project


def query(sql):
    """Run one SQL statement in a fresh DuckDB and return the rows. (In DuckDB 2.0 duckdb.sql() relations have no fetchone.)"""
    return duckdb.connect().execute(sql).fetchall()


def json_lines(day):
    lines = []
    for path in sorted(Path(f"data/raw/uploads/upload_date={day}").glob("batch-*.jsonl")):
        lines += [json.loads(text) for text in path.read_text().splitlines()]
    return lines


def parquet_glob(base):
    return f"read_parquet('{(base / 'reports').as_posix()}/*/*.parquet', hive_partitioning = true, union_by_name = true)"


def test_rows_written_equal_json_lines(landed):
    assert land_uploads("2026-03-02") == len(json_lines("2026-03-02")) == 89
    rows = query(f"SELECT report_id FROM {parquet_glob(paths.RESTRICTED)}")
    assert sorted(r[0] for r in rows) == sorted(x["report_id"] for x in json_lines("2026-03-02"))


def test_partition_folder_and_file_name(landed):
    land_uploads("2026-03-02")
    files = sorted(p.relative_to(paths.RESTRICTED).as_posix() for p in paths.RESTRICTED.rglob("*") if p.is_file())
    assert files == ["reports/upload_date=2026-03-02/part-0.parquet"]


def test_file_uses_zstd_compression(landed):
    land_uploads("2026-03-02")
    codecs = query("SELECT DISTINCT compression FROM parquet_metadata('lake/restricted/reports/upload_date=2026-03-02/part-0.parquet')")
    assert codecs == [("ZSTD",)]


def test_rerun_is_idempotent(landed):
    first = land_uploads("2026-03-02")
    second = land_uploads("2026-03-02")
    assert first == second == 89
    files = [p.name for p in Path("lake/restricted/reports/upload_date=2026-03-02").iterdir()]
    assert files == ["part-0.parquet"]  # no part-1, no leftover .tmp
    assert query(f"SELECT count(*) FROM {parquet_glob(paths.RESTRICTED)}")[0][0] == 89


def test_early_files_have_no_unit_column_and_later_files_do(landed):
    land_uploads("2026-03-14")
    land_uploads("2026-03-15")
    early = [r[0] for r in query("DESCRIBE SELECT * FROM 'lake/restricted/reports/upload_date=2026-03-14/part-0.parquet'")]
    later = [r[0] for r in query("DESCRIBE SELECT * FROM 'lake/restricted/reports/upload_date=2026-03-15/part-0.parquet'")]
    assert "unit" not in early and "unit" in later
    # Read together, the early rows simply get NULL for unit (union_by_name).
    nulls = query(f"SELECT upload_date, count(unit) FROM {parquet_glob(paths.RESTRICTED)} GROUP BY 1 ORDER BY 1")
    assert [(str(d), n) for d, n in nulls] == [("2026-03-14", 0), ("2026-03-15", 97)]


def test_whole_lake_reads_back_with_hive_partitioning(landed):
    from pipeline.land import all_upload_dates
    for day in all_upload_dates():
        land_uploads(day)
    total, days = query(f"SELECT count(*), count(DISTINCT upload_date) FROM {parquet_glob(paths.RESTRICTED)}")[0]
    quarantined = query(f"SELECT count(*) FROM {parquet_glob(paths.QUARANTINE)}")[0][0]
    assert days == 28
    assert total == 2699 and quarantined == 13  # together: all 2,712 lines the generator wrote


def test_timestamps_do_not_depend_on_the_computer_time_zone(landed):
    land_uploads("2026-03-05")
    con = duckdb.connect()
    con.execute("SET TimeZone = 'Pacific/Auckland'")  # far from UTC on purpose
    rows = con.execute(f"SELECT report_id, CAST(reported_at AS DATE)::VARCHAR FROM {parquet_glob(paths.RESTRICTED)}").fetchall()
    expected = {x["report_id"]: x["reported_at"][:10] for x in json_lines("2026-03-05")}
    assert {r[0]: r[1] for r in rows} == expected


def test_missing_folder_gives_a_clear_error(landed):
    with pytest.raises(FileNotFoundError, match="no batch files found"):
        land_uploads("2030-01-01")
