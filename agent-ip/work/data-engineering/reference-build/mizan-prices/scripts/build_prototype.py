"""Build prototype.duckdb: create the star schema and load it from the raw files.

Run from the project folder:  python scripts/build_prototype.py
"""
from pathlib import Path

import duckdb

DATABASE = Path("prototype.duckdb")
TABLES = ["dim_market", "dim_item", "dim_date", "fct_price_report"]


def build():
    DATABASE.unlink(missing_ok=True)  # start clean, so running twice gives the same result
    con = duckdb.connect(str(DATABASE))
    con.execute(Path("sql/schema.sql").read_text())
    con.execute(Path("sql/load_prototype.sql").read_text())
    counts = {table: con.execute(f"SELECT count(*) FROM {table}").fetchone()[0] for table in TABLES}
    con.close()
    return counts


if __name__ == "__main__":
    for table, count in build().items():
        print(f"{table}: {count} rows")
