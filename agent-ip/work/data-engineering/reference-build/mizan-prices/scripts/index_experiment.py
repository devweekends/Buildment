"""Does an index help? Build a big SQLite table and look at the query plan before and after.

Run:  python scripts/index_experiment.py sql/drills/d10_create_index.sql
"""
import random
import sqlite3
import sys

# The question we ask the table. Without an index SQLite must read every row to answer it.
QUERY = "SELECT avg(price) FROM price_log WHERE market_code = 'M05' AND item_code = 'I01'"


def build_table(db, rows=200_000, seed=7):
    """200,000 fake price rows. The same seed always makes the same rows."""
    rng = random.Random(seed)
    db.execute("CREATE TABLE price_log(report_id INTEGER PRIMARY KEY, market_code TEXT, item_code TEXT, price REAL)")
    markets = [f"M{n:02d}" for n in range(1, 9)]
    items = [f"I{n:02d}" for n in range(1, 13)]
    data = ((n, rng.choice(markets), rng.choice(items), round(rng.uniform(3, 40) * 2) / 2) for n in range(rows))
    db.executemany("INSERT INTO price_log VALUES (?, ?, ?, ?)", data)
    db.commit()


def query_plan(db):
    """The last column of EXPLAIN QUERY PLAN holds the sentence we want to read."""
    return [row[3] for row in db.execute("EXPLAIN QUERY PLAN " + QUERY)]


def run(index_sql_path):
    db = sqlite3.connect(":memory:")
    build_table(db)
    before = query_plan(db)
    db.executescript(open(index_sql_path).read())
    after = query_plan(db)
    db.close()
    return before, after


if __name__ == "__main__":
    path = sys.argv[1] if len(sys.argv) > 1 else "sql/drills/d10_create_index.sql"
    before, after = run(path)
    print("Plan before the index:")
    print("  " + "\n  ".join(before))
    print("Plan after the index:")
    print("  " + "\n  ".join(after))
