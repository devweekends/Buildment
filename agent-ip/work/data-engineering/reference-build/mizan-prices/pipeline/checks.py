"""Simple checks that tell us when the data looks wrong: freshness, volume and schema.

Every check returns a CheckResult. The runner's checks task fails when any result is not ok.
"""
from dataclasses import dataclass
from datetime import date, datetime, timedelta, timezone

import duckdb

from pipeline import contract as contract_module
from pipeline import paths

# contract type -> the type DuckDB reports for the landed Parquet column
PARQUET_TYPES = {"string": "VARCHAR", "double": "DOUBLE", "timestamp": "TIMESTAMP"}


@dataclass
class CheckResult:
    name: str
    ok: bool
    value: object
    threshold: object
    message: str


def landed_dates():
    """Upload dates that have a restricted partition, oldest first."""
    return sorted(p.name.split("=")[1] for p in (paths.RESTRICTED / "reports").glob("upload_date=*"))


def landed_rows(upload_date):
    """Rows received for one upload date: the good ones and the quarantined ones."""
    total = 0
    for base in (paths.RESTRICTED, paths.QUARANTINE):
        file = base / "reports" / f"upload_date={upload_date}" / "part-0.parquet"
        if file.exists():
            total += duckdb.connect().execute("SELECT count(*) FROM read_parquet(?)", [file.as_posix()]).fetchone()[0]
    return total


def check_freshness(max_age_days, today=None):
    """Is the newest landed partition recent enough? today is a 'YYYY-MM-DD' text (default: today in UTC)."""
    today = date.fromisoformat(today) if today else datetime.now(timezone.utc).date()
    days = landed_dates()
    if not days:
        return CheckResult("freshness", False, None, max_age_days, "nothing has been landed yet")
    age = (today - date.fromisoformat(days[-1])).days
    ok = age <= max_age_days
    return CheckResult("freshness", ok, age, max_age_days, f"newest partition is {days[-1]}, {age} day(s) old (limit {max_age_days})")


def check_volume(upload_date, tolerance=0.5):
    """Did this day bring at least (1 - tolerance) of the average of the 7 days before it?"""
    day = date.fromisoformat(upload_date)
    earlier = [d for d in landed_dates() if day - timedelta(days=7) <= date.fromisoformat(d) < day]
    value = landed_rows(upload_date)
    if not earlier:
        return CheckResult("volume", True, value, None, f"{value} rows on {upload_date}; no earlier days to compare with")
    average = sum(landed_rows(d) for d in earlier) / len(earlier)
    threshold = round(average * (1 - tolerance), 1)
    ok = value >= threshold
    return CheckResult("volume", ok, value, threshold,
                       f"{value} rows on {upload_date}; the {len(earlier)} days before average {average:.1f}, so at least {threshold} is expected")


def check_schema():
    """Does the newest landed partition have every required field with the type the contract promises?"""
    days = landed_dates()
    if not days:
        return CheckResult("schema", False, None, None, "nothing has been landed yet")
    contract = contract_module.load()
    file = paths.RESTRICTED / "reports" / f"upload_date={days[-1]}" / "part-0.parquet"
    columns = duckdb.connect().execute("DESCRIBE SELECT * FROM read_parquet(?)", [file.as_posix()]).fetchall()
    found = {row[0]: row[1] for row in columns}
    found.pop("upload_date", None)  # DuckDB adds this from the folder name; it is not a field inside the file
    problems = []
    for field in contract["fields"]:
        wanted = PARQUET_TYPES[field["type"]]
        if field["name"] not in found:
            if field["required"]:
                problems.append(f"{field['name']} is missing")
        elif found[field["name"]] != wanted:
            problems.append(f"{field['name']} is {found[field['name']]}, the contract says {wanted}")
    extra = sorted(set(found) - {f["name"] for f in contract["fields"]})
    message = "; ".join(problems) if problems else f"partition {days[-1]} matches contract v{contract['version']}"
    if extra:
        message += f" (extra fields allowed: {', '.join(extra)})"
    return CheckResult("schema", not problems, len(problems), 0, message)


def run_all(run_date):
    return [check_freshness(max_age_days=2, today=run_date), check_volume(run_date), check_schema()]
