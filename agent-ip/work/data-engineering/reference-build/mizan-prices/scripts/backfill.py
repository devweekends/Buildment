"""Reprocess a range of upload dates on purpose (a backfill).

Run:  python scripts/backfill.py --start 2026-03-05 --end 2026-03-07

Steps: land and publish every upload date in the range again, then run dbt with a date range
so that the fact table re-reads exactly those days. Running it twice changes nothing.
"""
import argparse
import json
import sys
from datetime import date, timedelta
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))  # so "import pipeline" works from any folder

from pipeline.land import land_uploads  # noqa: E402
from pipeline.pseudonymise import publish_reports  # noqa: E402
from pipeline.runner import run_dbt  # noqa: E402

LOOKBACK_DAYS = 3  # a report uploaded on day D can be up to 3 days older, so the range starts earlier


def main():
    parser = argparse.ArgumentParser(description="Backfill a range of upload dates.")
    parser.add_argument("--start", required=True)
    parser.add_argument("--end", required=True)
    args = parser.parse_args()

    day = date.fromisoformat(args.start)
    while day <= date.fromisoformat(args.end):
        rows = land_uploads(day.isoformat())
        publish_reports(day.isoformat())
        print(f"{day}: relanded and republished {rows} rows")
        day += timedelta(days=1)

    first_reported_day = date.fromisoformat(args.start) - timedelta(days=LOOKBACK_DAYS)
    variables = json.dumps({"start_date": first_reported_day.isoformat(), "end_date": args.end})
    run_dbt("build", "--vars", variables)
    print(f"dbt build finished for reported dates {first_reported_day} to {args.end}")


if __name__ == "__main__":
    main()
