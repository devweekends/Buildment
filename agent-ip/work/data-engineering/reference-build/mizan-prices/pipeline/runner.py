"""A small scheduler: tasks, their upstream tasks, retries, and a log line for every attempt.

Run:  python -m pipeline.runner run --date 2026-03-12
      python -m pipeline.runner backfill --start 2026-03-05 --end 2026-03-07
      python -m pipeline.runner daily          (yesterday, in UTC)
"""
import argparse
import shutil
import subprocess
import sys
import time
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

from pipeline import extract_registry, runlog
from pipeline.land import land_uploads
from pipeline.pseudonymise import publish_reports


class TransientError(Exception):
    """A temporary problem (a locked file, a busy disk). Waiting a little and trying again may fix it."""


def run_dbt(*args):
    """Run dbt from the transform folder. A locked warehouse file is temporary, every other failure is not."""
    exe = shutil.which("dbt", path=str(Path(sys.executable).parent)) or "dbt"
    done = subprocess.run([exe, *args, "--profiles-dir", "."], cwd="transform", capture_output=True, text=True)
    if done.returncode != 0:
        message = "dbt failed:\n" + "\n".join((done.stdout + done.stderr).splitlines()[-15:])
        raise TransientError(message) if "could not set lock" in message.lower() else RuntimeError(message)
    return done


# Each task takes the run date and may return a row count.
def task_extract_registry(run_date):
    return sum(extract_registry.extract(table) for table in extract_registry.TABLES)


def task_land(run_date):
    return land_uploads(run_date)


def task_publish(run_date):
    return publish_reports(run_date)


def task_dbt_build(run_date):
    run_dbt("build")


def task_checks(run_date):
    from pipeline import checks  # imported here so the runner works before chapter 11

    results = checks.run_all(run_date)
    for result in results:
        runlog.log_run("check:" + result.name, run_date, "ok" if result.ok else "failed", detail=result.message)
    failed = [r.message for r in results if not r.ok]
    if failed:
        raise RuntimeError("; ".join(failed))


def task_report(run_date):
    from report.build_report import build

    build()


# name: (function, upstream tasks). A task only runs when all its upstream tasks succeeded.
TASKS = {
    "extract_registry": (task_extract_registry, []),
    "land": (task_land, []),
    "publish": (task_publish, ["land"]),
    "dbt_build": (task_dbt_build, ["extract_registry", "publish"]),
    "checks": (task_checks, ["dbt_build"]),
    "report": (task_report, ["dbt_build", "checks"]),
}


def execution_order(tasks):
    """Put every task after its upstream tasks. Ties are broken by the order in the dict."""
    order = []
    while len(order) < len(tasks):
        ready = [n for n in tasks if n not in order and all(u in order for u in tasks[n][1])]
        if not ready:
            raise ValueError("the tasks depend on each other in a circle")
        order.append(ready[0])
    return order


def run_task(name, function, run_date, retries, base_delay, sleep):
    """Run one task. Returns 'ok' or 'failed'. Only TransientError is retried, with a growing wait."""
    for attempt in range(retries + 1):
        started = runlog.utc_now()
        try:
            rows = function(run_date)
        except TransientError as error:
            last_try = attempt == retries
            runlog.log_run(name, run_date, "failed" if last_try else "retry", detail=str(error), started_at=started)
            if last_try:
                return "failed"
            sleep(base_delay * 2**attempt)  # wait 1x, then 2x, then 4x ...
        except Exception as error:  # any other error is a bug or bad data: do not retry
            runlog.log_run(name, run_date, "failed", detail=f"{type(error).__name__}: {error}", started_at=started)
            return "failed"
        else:
            runlog.log_run(name, run_date, "ok", rows=rows, started_at=started)
            return "ok"


def run_pipeline(run_date, tasks=TASKS, retries=2, base_delay=1.0, sleep=time.sleep):
    """Run all tasks for one date. Returns {task name: 'ok' | 'failed' | 'skipped'}."""
    status = {}
    for name in execution_order(tasks):
        function, upstream = tasks[name]
        if any(status[u] != "ok" for u in upstream):
            runlog.log_run(name, run_date, "skipped", detail="an upstream task did not succeed")
            status[name] = "skipped"
        else:
            status[name] = run_task(name, function, run_date, retries, base_delay, sleep)
    return status


def backfill(start, end, **options):
    """Run each date once, oldest first. Stops at the first date that fails. Returns {date: status dict}."""
    results = {}
    day = date.fromisoformat(start)
    while day <= date.fromisoformat(end):
        results[day.isoformat()] = run_pipeline(day.isoformat(), **options)
        if "failed" in results[day.isoformat()].values():
            break
        day += timedelta(days=1)
    return results


def main(argv=None):
    parser = argparse.ArgumentParser(description="Run the Mizan pipeline.")
    commands = parser.add_subparsers(dest="command", required=True)
    commands.add_parser("daily")
    commands.add_parser("run").add_argument("--date", required=True)
    back = commands.add_parser("backfill")
    back.add_argument("--start", required=True)
    back.add_argument("--end", required=True)
    args = parser.parse_args(argv)

    if args.command == "backfill":
        results = backfill(args.start, args.end)
    else:
        day = args.date if args.command == "run" else (datetime.now(timezone.utc).date() - timedelta(days=1)).isoformat()
        results = {day: run_pipeline(day)}
    for day, status in results.items():
        print(day, ", ".join(f"{name}={state}" for name, state in status.items()))
    failed = any("failed" in status.values() for status in results.values())
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
