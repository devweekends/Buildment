"""Shared test fixtures.

Every test that needs data works in a temporary copy of the project, so it
never touches your real data/, lake/ or warehouse files.
"""
import contextlib
import os
import shutil
import sqlite3
import subprocess
import sys
from pathlib import Path

import duckdb
import pytest

REPO = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO))  # so "import pipeline" works after we change folder

# The code that a temporary project needs (data and lake are NOT copied).
CODE = ["make_source.py", "pipeline", "transform", "contracts", "sql", "report", "scripts"]


# Commands run by the tests get a fake key, so nothing depends on your own shell settings.
TEST_KEY = "test-secret-not-real"


def run_cmd(args, cwd, check=True):
    """Run a command in a folder and return the finished process."""
    env = {**os.environ, "MIZAN_KEY": TEST_KEY, "PYTHONUTF8": "1"}
    done = subprocess.run(args, cwd=cwd, capture_output=True, text=True, env=env)
    if check and done.returncode != 0:
        raise AssertionError(f"command failed: {args}\n{done.stdout}\n{done.stderr}")
    return done


def copy_code(target):
    target.mkdir(parents=True, exist_ok=True)
    junk = shutil.ignore_patterns("__pycache__", "target", "logs", "*.duckdb", "dbt_packages")
    for name in CODE:
        source = REPO / name
        if not source.exists():
            continue
        if source.is_dir():
            shutil.copytree(source, target / name, ignore=junk)
        else:
            shutil.copy(source, target / name)


@pytest.fixture(scope="session")
def source_data(tmp_path_factory):
    """Seed 7, 28 days, generated once for the whole test run."""
    folder = tmp_path_factory.mktemp("seed7")
    run_cmd([sys.executable, str(REPO / "make_source.py"), "--out", str(folder / "data")], cwd=folder)
    return folder / "data"


class Project:
    """A temporary copy of the project. Helpers run commands inside it."""

    def __init__(self, root):
        self.root = root

    def python(self, *args, check=True):
        return run_cmd([sys.executable, *args], cwd=self.root, check=check)

    def dbt(self, *args, check=True):
        """Run dbt from the transform folder, like a learner does."""
        exe = shutil.which("dbt", path=str(Path(sys.executable).parent)) or "dbt"
        return run_cmd([exe, *args, "--profiles-dir", "."], cwd=self.root / "transform", check=check)

    @contextlib.contextmanager
    def cd(self):
        """Work inside this project for a moment (the pipeline functions use paths relative to the folder)."""
        before = Path.cwd()
        os.chdir(self.root)
        try:
            yield
        finally:
            os.chdir(before)

    def make_data(self, days=28, *extra):
        self.python("make_source.py", "--days", str(days), *extra)
        return self.root / "data"

    def load_everything(self):
        """Land and publish every upload day, extract the registry, then dbt build. Returns the dbt result."""
        self.python("-m", "pipeline.land", "--all")
        self.python("-m", "pipeline.pseudonymise", "--all")
        for table in ["markets", "volunteers"]:
            self.python("-m", "pipeline.extract_registry", "--table", table)
        return self.dbt("build")

    def query(self, sql):
        """Rows from the warehouse, read after dbt has finished."""
        # Not read_only: when dbt ran inside this process (dbt_fast) it keeps the file open, and DuckDB insists on the same settings.
        con = duckdb.connect(str(self.root / "warehouse.duckdb"))
        try:
            return con.execute(sql).fetchall()
        finally:
            con.close()


@pytest.fixture
def project(tmp_path, monkeypatch):
    """A fresh copy of the code in a temp folder. We move into it and set a test key."""
    folder = tmp_path / "proj"
    copy_code(folder)
    monkeypatch.chdir(folder)
    monkeypatch.setenv("MIZAN_KEY", TEST_KEY)
    return Project(folder)


@pytest.fixture(scope="module")
def built(tmp_path_factory):
    """A project with all 28 days loaded and dbt built once. Shared by the tests of one file that only READ it."""
    folder = tmp_path_factory.mktemp("built") / "proj"
    copy_code(folder)
    proj = Project(folder)
    proj.make_data()
    proj.first_build = proj.load_everything()
    return proj


def run_sql(con, path):
    """Run one drill file and return its rows."""
    return con.execute(Path(path).read_text()).fetchall()


@pytest.fixture
def con(source_data):
    """DuckDB in memory with three views over the raw files (plus market_contacts)."""
    con = duckdb.connect()
    raw = source_data / "raw"
    # reports: every JSON line. upload_date comes from the folder name.
    # reported_at and uploaded_at are made plain UTC timestamps, so the computer's time zone cannot change a date.
    con.execute(f"""
        CREATE VIEW reports AS
        SELECT * REPLACE (timezone('UTC', reported_at) AS reported_at, timezone('UTC', uploaded_at) AS uploaded_at)
        FROM read_json('{raw.as_posix()}/uploads/*/*.jsonl', union_by_name = true, hive_partitioning = true)
    """)
    con.execute(f"CREATE VIEW items AS SELECT * FROM read_csv('{(raw / 'items.csv').as_posix()}')")
    con.execute(f"CREATE VIEW market_contacts AS SELECT * FROM read_csv('{(raw / 'market_contacts.csv').as_posix()}')")
    # markets: DuckDB cannot read SQLite offline without an extension, so Python reads it for us.
    registry = sqlite3.connect(raw / "registry.db")
    rows = registry.execute("SELECT * FROM markets").fetchall()
    registry.close()
    con.execute("CREATE TABLE markets(market_code VARCHAR, name VARCHAR, area VARCHAR, opens VARCHAR, updated_at VARCHAR)")
    con.executemany("INSERT INTO markets VALUES (?, ?, ?, ?, ?)", rows)
    yield con
    con.close()
