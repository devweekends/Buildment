"""Copy changed rows from the volunteer registry (SQLite) to Parquet, using a watermark.

Run:  python -m pipeline.extract_registry --table markets
      python -m pipeline.extract_registry --table volunteers

How it works: we remember the biggest updated_at we have seen (the watermark).
Next time we only ask for rows with a bigger updated_at.
LIMIT: a row that was deleted has no updated_at any more, so this method can never see a delete.
"""
import argparse
import json
import os
import shutil
import sqlite3

import duckdb

from pipeline import paths
from pipeline.pseudonymise import get_secret, volunteer_key
from pipeline.runlog import stamp, utc_now

WATERMARK_FILE = paths.STATE / "registry_watermarks.json"
TABLES = ["markets", "volunteers"]


def read_watermarks():
    if not WATERMARK_FILE.exists():
        return {}
    return json.loads(WATERMARK_FILE.read_text())


def save_watermark(table, value):
    marks = read_watermarks()
    marks[table] = value
    paths.STATE.mkdir(parents=True, exist_ok=True)
    temp = WATERMARK_FILE.with_suffix(".tmp")
    temp.write_text(json.dumps(marks, indent=2, sort_keys=True))
    os.replace(temp, WATERMARK_FILE)  # replace in one step, so a crash never leaves half a file


def read_changed_rows(table, watermark):
    """Rows with updated_at after the watermark (all rows the first time)."""
    db = sqlite3.connect(paths.REGISTRY_DB)
    db.row_factory = sqlite3.Row
    sql = f"SELECT * FROM {table}" + (" WHERE updated_at > ?" if watermark else "") + " ORDER BY updated_at"
    rows = [dict(r) for r in db.execute(sql, [watermark] if watermark else [])]
    db.close()
    return rows


def pseudonymise_volunteers(rows):
    """Drop the name, and swap the phone for a code. The name and phone never reach a file."""
    secret = get_secret()
    return [
        {"volunteer_id": r["volunteer_id"], "market_code": r["market_code"], "updated_at": r["updated_at"],
         "volunteer_key": volunteer_key(r["phone"], secret)}
        for r in rows
    ]


def write_parquet(rows, folder):
    """Write the rows (a list of dicts with the same keys) to folder/part-0.parquet."""
    columns = list(rows[0].keys())
    con = duckdb.connect()
    con.execute("CREATE TABLE t(" + ", ".join(f"{c} VARCHAR" for c in columns) + ")")
    con.executemany(f"INSERT INTO t VALUES ({', '.join('?' for _ in columns)})", [[r[c] for c in columns] for r in rows])
    folder.mkdir(parents=True, exist_ok=True)
    con.execute(f"COPY t TO '{(folder / 'part-0.parquet').as_posix()}' (FORMAT parquet, COMPRESSION zstd)")
    con.close()


def extract(table: str) -> int:
    """Extract the rows changed since the last run. Returns how many rows were written."""
    if table not in TABLES:
        raise ValueError(f"unknown table {table}, choose one of {TABLES}")
    rows = read_changed_rows(table, read_watermarks().get(table))
    if not rows:
        return 0
    new_watermark = max(r["updated_at"] for r in rows)
    if table == "volunteers":
        rows = pseudonymise_volunteers(rows)
    folder = paths.SHARED / "registry" / table / f"extracted_at={stamp(utc_now()).replace('-', '').replace(':', '').replace('.', '')}"
    try:
        write_parquet(rows, folder)
    except Exception:
        shutil.rmtree(folder, ignore_errors=True)  # leave nothing half-written behind
        raise
    save_watermark(table, new_watermark)  # only now, after the file exists
    return len(rows)


def main():
    parser = argparse.ArgumentParser(description="Extract changed registry rows.")
    parser.add_argument("--table", choices=TABLES, required=True)
    args = parser.parse_args()
    print(f"{args.table}: {extract(args.table)} rows extracted")


if __name__ == "__main__":
    main()
