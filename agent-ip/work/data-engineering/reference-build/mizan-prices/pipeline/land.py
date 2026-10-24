"""Land one day of uploads: read the JSON lines, check the contract, write Parquet.

Run:  python -m pipeline.land --date 2026-03-01      (one day)
      python -m pipeline.land --all                   (every upload folder)
"""
import argparse
import os

import duckdb

from pipeline import contract as contract_module
from pipeline import paths


def write_partition(con, query, base, upload_date):
    """Write the query result as the ONLY file of one partition folder, replacing what was there."""
    folder = base / f"upload_date={upload_date}"
    folder.mkdir(parents=True, exist_ok=True)
    final = folder / "part-0.parquet"
    temp = folder / "part-0.parquet.tmp"  # readers only look at *.parquet, so a half-written file is invisible
    con.execute(f"COPY ({query}) TO '{temp.as_posix()}' (FORMAT parquet, COMPRESSION zstd)")
    os.replace(temp, final)  # swap in the new file in one step


def land_day(upload_date):
    """Returns (rows landed, rows quarantined) for one upload date."""
    folder = paths.RAW_UPLOADS / f"upload_date={upload_date}"
    files = sorted(f.as_posix() for f in folder.glob("batch-*.jsonl"))
    if not files:
        raise FileNotFoundError(f"no batch files found in {folder}")
    con = duckdb.connect()
    # The JSON timestamps carry a Z (UTC). timezone('UTC', ...) makes them plain UTC timestamps,
    # so the time zone of the computer can never move a report to another day.
    con.execute(
        """CREATE TEMP TABLE raw AS
           SELECT * REPLACE (timezone('UTC', reported_at) AS reported_at, timezone('UTC', uploaded_at) AS uploaded_at)
           FROM read_json(?, union_by_name = true, format = 'newline_delimited')""",
        [files],
    )
    contract_module.check_rows(con, "raw", contract_module.load())
    write_partition(con, "SELECT * FROM good_rows", paths.RESTRICTED / "reports", upload_date)
    good = con.execute("SELECT count(*) FROM good_rows").fetchone()[0]
    bad = con.execute("SELECT count(*) FROM bad_rows").fetchone()[0]
    quarantine = paths.QUARANTINE / "reports" / f"upload_date={upload_date}"
    if bad:
        write_partition(con, "SELECT * FROM bad_rows", paths.QUARANTINE / "reports", upload_date)
    elif quarantine.exists():  # an earlier run found bad rows and this one did not: remove the old file
        (quarantine / "part-0.parquet").unlink(missing_ok=True)
        quarantine.rmdir()
    con.close()
    return good, bad


def land_uploads(upload_date: str) -> int:
    """Replace the restricted partition for this upload date. Returns the number of rows written."""
    return land_day(upload_date)[0]


def all_upload_dates():
    return sorted(p.name.split("=")[1] for p in paths.RAW_UPLOADS.glob("upload_date=*"))


def main():
    parser = argparse.ArgumentParser(description="Land uploads as Parquet.")
    parser.add_argument("--date", help="upload date, for example 2026-03-01")
    parser.add_argument("--all", action="store_true", help="land every upload folder")
    args = parser.parse_args()
    if not args.date and not args.all:
        parser.error("give --date YYYY-MM-DD or --all")
    for day in all_upload_dates() if args.all else [args.date]:
        good, bad = land_day(day)
        print(f"{day}: {good} rows landed, {bad} quarantined")


if __name__ == "__main__":
    main()
