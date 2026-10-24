"""A run log: one JSON line per task attempt, appended to logs/runs.jsonl."""
import json
from datetime import datetime, timezone

from pipeline import paths


def utc_now():
    return datetime.now(timezone.utc)


def stamp(moment):
    return moment.strftime("%Y-%m-%dT%H:%M:%S.%fZ")


def log_run(task, run_date, status, rows=None, detail="", started_at=None):
    """Append one line. The caller notes started_at before the work; the end time is taken now."""
    ended_at = utc_now()
    record = {
        "task": task,
        "run_date": run_date,
        "status": status,  # ok, retry, failed or skipped
        "rows": rows,
        "detail": detail,
        "started_at": stamp(started_at or ended_at),
        "ended_at": stamp(ended_at),
    }
    paths.LOGS.mkdir(parents=True, exist_ok=True)
    with open(paths.LOGS / "runs.jsonl", "a", encoding="utf-8") as f:  # append mode: old lines are never touched
        f.write(json.dumps(record) + "\n")
    return record
