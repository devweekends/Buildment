"""Replace phone numbers with a keyed code, and publish a copy without names or phones.

This is PSEUDONYMISATION, not anonymisation. Anyone who has the secret (MIZAN_KEY) and a phone
number can work out the code, so the secret must be kept apart from the data.
"""
import argparse
import hashlib
import hmac
import os

import duckdb

from pipeline import paths
from pipeline.land import write_partition


class MissingKeyError(RuntimeError):
    """MIZAN_KEY is not set, so we refuse to make codes."""


def get_secret() -> bytes:
    """The secret comes from the environment, never from a file in the project."""
    value = os.environ.get("MIZAN_KEY", "")
    if not value:
        raise MissingKeyError("MIZAN_KEY is not set. Set it in your shell before publishing, for example: export MIZAN_KEY=some-long-random-text")
    return value.encode()


def volunteer_key(phone: str, secret: bytes) -> str:
    """HMAC-SHA256 of the phone number, first 16 hex characters.

    A plain hash of a phone number can be reversed by trying every possible number.
    With a secret key mixed in (an HMAC) an attacker would also need the key.
    """
    return hmac.new(secret, phone.encode(), hashlib.sha256).hexdigest()[:16]


def publish_reports(upload_date: str) -> int:
    """Copy one restricted partition to shared, without volunteer_name and volunteer_phone."""
    secret = get_secret()  # stop here, before anything is read or written
    source = paths.RESTRICTED / "reports" / f"upload_date={upload_date}" / "part-0.parquet"
    if not source.exists():
        raise FileNotFoundError(f"{source} not found. Land the uploads first.")
    con = duckdb.connect()
    # We make the codes in Python and give DuckDB only the finished (phone, code) pairs, so the secret never goes into SQL.
    phones = [row[0] for row in con.execute("SELECT DISTINCT volunteer_phone FROM read_parquet(?) ORDER BY 1", [source.as_posix()]).fetchall()]
    con.execute("CREATE TEMP TABLE phone_keys(volunteer_phone VARCHAR, volunteer_key VARCHAR)")
    con.executemany("INSERT INTO phone_keys VALUES (?, ?)", [(p, volunteer_key(p, secret)) for p in phones if p])
    query = f"""
        SELECT r.* EXCLUDE (volunteer_name, volunteer_phone), k.volunteer_key
        FROM read_parquet('{source.as_posix()}') AS r
        LEFT JOIN phone_keys AS k ON k.volunteer_phone = r.volunteer_phone
    """
    write_partition(con, query, paths.SHARED / "reports", upload_date)
    rows = con.execute(f"SELECT count(*) FROM read_parquet('{(paths.SHARED / 'reports' / f'upload_date={upload_date}' / 'part-0.parquet').as_posix()}')").fetchone()[0]
    con.close()
    return rows


def main():
    parser = argparse.ArgumentParser(description="Publish pseudonymised reports.")
    parser.add_argument("--date", help="upload date, for example 2026-03-01")
    parser.add_argument("--all", action="store_true", help="publish every landed upload date")
    args = parser.parse_args()
    if not args.date and not args.all:
        parser.error("give --date YYYY-MM-DD or --all")
    landed = sorted(p.name.split("=")[1] for p in (paths.RESTRICTED / "reports").glob("upload_date=*"))
    for day in landed if args.all else [args.date]:
        print(f"{day}: {publish_reports(day)} rows published")


if __name__ == "__main__":
    main()
