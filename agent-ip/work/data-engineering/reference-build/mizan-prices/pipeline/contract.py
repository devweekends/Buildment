"""Read the data contract and apply it to a batch of rows.

We check two different things:
  1. the SHAPE of the batch: are all required fields there? If not, the whole batch fails.
  2. each ROW: does it follow the rules? A row that does not is sent to quarantine.
"""
import yaml  # installed together with dbt

from pipeline import paths


class ContractError(Exception):
    """The whole batch breaks the contract (for example a required field is missing)."""


def load(path=paths.CONTRACT):
    with open(path) as f:
        return yaml.safe_load(f)


def required_fields(contract):
    return [f["name"] for f in contract["fields"] if f["required"]]


def check_shape(columns, contract):
    """Raise a clear error if a required field is missing. Extra fields are fine."""
    missing = [name for name in required_fields(contract) if name not in columns]
    if missing:
        raise ContractError(
            f"contract {contract['name']} v{contract['version']}: required field(s) missing from the batch: {', '.join(missing)}"
        )


def reason_sql(contract):
    """A SQL CASE expression that gives the reason a row is bad, or NULL when the row is fine."""
    parts = [f"WHEN {rule['fails_when']} THEN '{rule['reason']}'" for rule in contract["rules"]]
    return "CASE " + " ".join(parts) + " END"


def check_rows(con, table, contract):
    """Split a table into two temp tables, good_rows and bad_rows (bad rows get a reason column)."""
    check_shape([row[0] for row in con.execute(f"DESCRIBE {table}").fetchall()], contract)
    con.execute(f"CREATE OR REPLACE TEMP TABLE checked AS SELECT *, {reason_sql(contract)} AS reason FROM {table}")
    con.execute("CREATE OR REPLACE TEMP TABLE good_rows AS SELECT * EXCLUDE (reason) FROM checked WHERE reason IS NULL")
    con.execute("CREATE OR REPLACE TEMP TABLE bad_rows AS SELECT * FROM checked WHERE reason IS NOT NULL")
