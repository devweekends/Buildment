"""Delete partitions that hold names and phones (restricted and quarantine) once they are older than we may keep them.

Run:  python -m pipeline.retention --keep-days 30 --as-of 2026-03-28 --dry-run
Only lake/restricted and lake/quarantine are touched. The shared folder is pseudonymised and is kept.
Quarantined rows are full raw rows, so they hold personal data too and follow the same rule.
"""
import argparse
import shutil
from datetime import date, datetime, timedelta, timezone

from pipeline import paths


def expired_partitions(as_of, keep_days=30):
    """Restricted and quarantine partition folders whose upload date is more than keep_days before as_of."""
    cutoff = date.fromisoformat(as_of) - timedelta(days=keep_days)
    old = []
    folders = sorted(paths.RESTRICTED.rglob("upload_date=*")) + sorted(paths.QUARANTINE.rglob("upload_date=*"))
    for folder in folders:
        if date.fromisoformat(folder.name.split("=")[1]) < cutoff:
            old.append(folder)
    return old


def apply_retention(as_of, keep_days=30, dry_run=False):
    """Delete the expired partitions (unless dry_run). Returns the folders that were, or would be, deleted."""
    old = expired_partitions(as_of, keep_days)
    if not dry_run:
        for folder in old:
            shutil.rmtree(folder)
    return old


def main():
    parser = argparse.ArgumentParser(description="Delete old partitions that hold personal data.")
    parser.add_argument("--keep-days", type=int, default=30)
    parser.add_argument("--as-of", default=datetime.now(timezone.utc).date().isoformat(), help="the date to count back from")
    parser.add_argument("--dry-run", action="store_true", help="only list what would be deleted")
    args = parser.parse_args()
    folders = apply_retention(args.as_of, args.keep_days, args.dry_run)
    verb = "would delete" if args.dry_run else "deleted"
    for folder in folders:
        print(f"{verb} {folder.as_posix()}")
    print(f"{verb} {len(folders)} partition(s); kept everything newer than {args.keep_days} days before {args.as_of}")


if __name__ == "__main__":
    main()
