"""Where things live. All paths are relative to the project folder, so run commands from there."""
from pathlib import Path

DATA = Path("data")                              # made by make_source.py, never edited by hand
RAW_UPLOADS = DATA / "raw" / "uploads"           # upload_date=YYYY-MM-DD/batch-NN.jsonl
REGISTRY_DB = DATA / "raw" / "registry.db"       # the volunteer registry (SQLite)

LAKE = Path("lake")                              # our own Parquet files
RESTRICTED = LAKE / "restricted"                 # contains names and phones: few people may read it
SHARED = LAKE / "shared"                         # pseudonymised: safe for the analytics team
QUARANTINE = LAKE / "quarantine"                 # rows that broke the contract (still contains names and phones)

STATE = Path("state")                            # small files the pipeline remembers between runs
LOGS = Path("logs")                              # one JSON line per task attempt
WAREHOUSE = Path("warehouse.duckdb")             # built by dbt
SITE = Path("site")                              # the HTML report

CONTRACT = Path("contracts") / "price_reports.yml"
