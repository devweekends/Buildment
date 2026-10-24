"""Test helper: process the upload days one at a time, like a daily schedule, and report what the fact table looked like.

Run from a project folder:  python day_by_day.py [--lookback N]
It prints one JSON object on the last line. It runs in its own process because dbt-duckdb keeps the
warehouse file open for the life of a Python process, so two projects must not share one process.
"""
import argparse
import json
import os
import sys
from pathlib import Path

import duckdb

sys.path.insert(0, os.getcwd())  # the project folder, so "import pipeline" works

from dbt.cli.main import dbtRunner  # noqa: E402

from pipeline import extract_registry  # noqa: E402
from pipeline.land import all_upload_dates, land_uploads  # noqa: E402
from pipeline.pseudonymise import publish_reports  # noqa: E402

MODELS = ["stg_price_reports", "dim_date", "fct_price_report", "mart_weekly_basket"]
OUTAGE_DAYS = "('2026-03-09', '2026-03-10', '2026-03-11')"


def dbt(*args):
    here = os.getcwd()
    os.chdir("transform")
    try:
        result = dbtRunner().invoke([*args, "--profiles-dir", "."])
    finally:
        os.chdir(here)
    if not result.success:
        raise SystemExit(f"dbt {args} failed")


def good_ids_uploaded_up_to(day):
    ids = set()
    for path in Path("data/raw/uploads").glob("*/*.jsonl"):
        if path.parent.name.split("=")[1] <= day:
            for text in path.read_text().splitlines():
                row = json.loads(text)
                if row["price"] > 0 and row["item_code"]:
                    ids.add(row["report_id"])
    return ids


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--lookback", type=int, default=None)
    parser.add_argument("--final-build", action="store_true", help="finish with one full dbt build (all tests)")
    args = parser.parse_args()
    variables = ["--vars", f"{{lookback_days: {args.lookback}}}"] if args.lookback is not None else []

    for table in extract_registry.TABLES:
        extract_registry.extract(table)
    seen = {}
    for number, day in enumerate(all_upload_dates()):
        land_uploads(day)
        publish_reports(day)
        if number == 0:
            dbt("build", *variables)  # first run: seed, snapshot and every model
        else:
            dbt("run", "--select", *MODELS, *variables)
        con = duckdb.connect("warehouse.duckdb")
        outage = con.execute(
            "SELECT count(*) FROM fct_price_report f JOIN dim_market m USING (market_key) "
            f"WHERE m.market_code = 'M05' AND f.reported_date IN {OUTAGE_DAYS}").fetchone()[0]
        total, distinct = con.execute("SELECT count(*), count(DISTINCT report_id) FROM fct_price_report").fetchone()
        con.close()
        seen[day] = {"outage_rows": outage, "total": total, "distinct": distinct, "expected": len(good_ids_uploaded_up_to(day))}
    if args.final_build:
        dbt("build", *variables)
    print(json.dumps(seen))


if __name__ == "__main__":
    main()
