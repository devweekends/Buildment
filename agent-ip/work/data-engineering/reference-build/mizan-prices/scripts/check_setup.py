"""Check that Python and the pinned packages are installed, and that the data exists.

Run:  python scripts/check_setup.py
Add --require-data to fail when data/raw has not been generated yet.
"""
import argparse
import sys
from importlib import metadata
from pathlib import Path

# The exact versions from requirements.txt.
PINNED = {"duckdb": "2.0.0", "dbt-core": "1.12.6", "dbt-duckdb": "1.11.0", "pytest": "9.1.1"}


def fail(message):
    print(f"FAIL: {message}")
    sys.exit(1)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--data", default="data", help="folder made by make_source.py")
    parser.add_argument("--require-data", action="store_true")
    args = parser.parse_args()

    version = sys.version.split()[0]
    print(f"Python {version}")
    if sys.version_info < (3, 11):
        fail(f"Python 3.11 or later is needed, you have {version}.")
    print("OK python version")

    for name, wanted in PINNED.items():
        try:
            found = metadata.version(name)
        except metadata.PackageNotFoundError:
            fail(f"{name} is not installed. Run: pip install -r requirements.txt")
        if found != wanted:
            fail(f"{name} is {found} but this course needs {wanted}. Run: pip install -r requirements.txt")
        print(f"OK {name} {found}")

    items = Path(args.data) / "raw" / "items.csv"
    if items.exists():
        print(f"OK data folder found: {items.parent.as_posix()}")
    elif args.require_data:
        fail(f"{items} not found. Run: python make_source.py")
    else:
        print("NOTE data folder not found yet. Run: python make_source.py")


if __name__ == "__main__":
    main()
