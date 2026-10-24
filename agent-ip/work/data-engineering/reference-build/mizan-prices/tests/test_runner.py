"""Chapter 9.4: the small scheduler and the HTML report."""
import json
from pathlib import Path

import pytest

from pipeline import runner
from pipeline.runner import TASKS, TransientError, backfill, execution_order, run_pipeline


def fake_tasks(calls, **overrides):
    """Six tasks with the same names and upstreams as the real pipeline, but they only record that they ran."""
    def make(name):
        def task(run_date):
            calls.append((name, run_date))
            return 1
        return task

    tasks = {name: (make(name), upstream) for name, (_, upstream) in TASKS.items()}
    for name, function in overrides.items():
        tasks[name] = (function, tasks[name][1])
    return tasks


def log_lines():
    return [json.loads(x) for x in Path("logs/runs.jsonl").read_text().splitlines()]


def test_tasks_run_after_their_upstream_tasks():
    order = execution_order(TASKS)
    assert order == ["extract_registry", "land", "publish", "dbt_build", "checks", "report"]
    for name, (_, upstream) in TASKS.items():
        for before in upstream:
            assert order.index(before) < order.index(name)


def test_a_circle_of_dependencies_is_refused():
    with pytest.raises(ValueError, match="circle"):
        execution_order({"a": (None, ["b"]), "b": (None, ["a"])})


def test_a_transient_error_is_retried_and_the_run_succeeds(project):
    attempts, waits = [], []

    def flaky(run_date):
        attempts.append(run_date)
        if len(attempts) == 1:
            raise TransientError("file is busy")
        return 5

    status = run_pipeline("2026-03-02", fake_tasks([], land=flaky), base_delay=1.0, sleep=waits.append)
    assert set(status.values()) == {"ok"}
    assert len(attempts) == 2 and waits == [1.0]
    land = [x for x in log_lines() if x["task"] == "land"]
    assert [(x["status"], x["detail"]) for x in land] == [("retry", "file is busy"), ("ok", "")]


def test_the_wait_grows_and_retries_stop_after_two(project):
    waits, attempts = [], []

    def always_busy(run_date):
        attempts.append(1)
        raise TransientError("still busy")

    status = run_pipeline("2026-03-02", fake_tasks([], land=always_busy), retries=2, base_delay=0.5, sleep=waits.append)
    assert len(attempts) == 3 and waits == [0.5, 1.0]  # 3 attempts, waiting 0.5 s then 1 s
    assert status["land"] == "failed" and status["publish"] == "skipped"


def test_a_permanent_error_skips_everything_downstream_and_the_exit_code_is_1(project, monkeypatch):
    calls = []

    def broken(run_date):
        raise ValueError("bad data")

    for name, (function, upstream) in fake_tasks(calls, publish=broken).items():
        monkeypatch.setitem(TASKS, name, (function, upstream))  # the CLI uses the TASKS dict
    assert runner.main(["run", "--date", "2026-03-02"]) == 1
    assert [name for name, _ in calls] == ["extract_registry", "land"]  # publish failed, so nothing after it ran
    states = {x["task"]: x["status"] for x in log_lines()}
    assert states == {"extract_registry": "ok", "land": "ok", "publish": "failed", "dbt_build": "skipped", "checks": "skipped", "report": "skipped"}
    assert "ValueError: bad data" in [x for x in log_lines() if x["task"] == "publish"][0]["detail"]


def test_a_clean_run_has_exit_code_0(project, monkeypatch):
    for name, (function, upstream) in fake_tasks([]).items():
        monkeypatch.setitem(TASKS, name, (function, upstream))
    assert runner.main(["run", "--date", "2026-03-02"]) == 0


def test_every_attempt_is_logged_with_times(project):
    run_pipeline("2026-03-02", fake_tasks([]))
    lines = log_lines()
    assert [x["task"] for x in lines] == ["extract_registry", "land", "publish", "dbt_build", "checks", "report"]
    assert all(x["run_date"] == "2026-03-02" and x["status"] == "ok" and x["rows"] == 1 for x in lines)
    assert all(x["started_at"] <= x["ended_at"] and x["ended_at"].endswith("Z") for x in lines)


def test_backfill_runs_each_date_once_in_order(project):
    calls = []
    results = backfill("2026-03-05", "2026-03-07", tasks=fake_tasks(calls))
    assert list(results) == ["2026-03-05", "2026-03-06", "2026-03-07"]
    lands = [date for name, date in calls if name == "land"]
    assert lands == ["2026-03-05", "2026-03-06", "2026-03-07"]
    assert len(calls) == 3 * 6  # six tasks, three dates, nothing run twice


def test_backfill_stops_at_the_first_failing_date(project):
    calls = []

    def fails_on_the_sixth(run_date):
        calls.append(("land", run_date))
        if run_date == "2026-03-06":
            raise RuntimeError("no files")

    results = backfill("2026-03-05", "2026-03-07", tasks=fake_tasks([], land=fails_on_the_sixth))
    assert list(results) == ["2026-03-05", "2026-03-06"]
    assert results["2026-03-06"]["land"] == "failed"


@pytest.mark.slow
def test_the_report_exists_has_all_markets_and_is_small(built):
    built.python("-m", "report.build_report")
    page = (built.root / "site" / "index.html").read_text(encoding="utf-8")
    assert (built.root / "site" / "index.html").stat().st_size < 50_000
    for code in [f"M0{n}" for n in range(1, 9)]:
        assert code in page
    assert "<script" not in page and "http" not in page  # no JavaScript, no outside files
    assert 'name="viewport"' in page.replace("'", '"')
    assert page.count("Week 13") == 8 and "Week 9<" not in page  # the latest four weeks: 10 to 13
    assert "Fisher Row Market" in page


@pytest.mark.slow
def test_a_real_three_day_backfill_from_the_command_line(project):
    project.make_data(3)
    done = project.python("-m", "pipeline.runner", "backfill", "--start", "2026-03-01", "--end", "2026-03-03")
    assert done.stdout.count("report=ok") == 3
    assert (project.root / "site" / "index.html").exists()
    logged = [json.loads(x) for x in (project.root / "logs" / "runs.jsonl").read_text().splitlines()]
    assert len([x for x in logged if x["status"] == "failed"]) == 0
    assert len([x for x in logged if x["task"] == "land"]) == 3
    assert {x["task"] for x in logged if x["task"].startswith("check:")} == {"check:freshness", "check:volume", "check:schema"}
    lines = [json.loads(x) for path in (project.root / "data/raw/uploads").glob("*/*.jsonl") for x in path.read_text().splitlines()]
    good = {x["report_id"] for x in lines if x["price"] > 0 and x["item_code"]}
    assert project.query("SELECT count(*) FROM fct_price_report") == [(len(good),)] == [(279,)]
