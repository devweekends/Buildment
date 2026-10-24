# Reference build: mizan-prices

Mentor material for course 15 (data-engineering). This is the complete project the general course asks fellows to build, written first so every command, expected output and acceptance test in a build chapter comes from code that runs. Never link it from a chapter.

- `mizan-prices/REFERENCE.md`: commands, real outputs, seed-7 counts and test names per build chapter, and the deviations from `../context-packs/reference-spec.md`.
- Verified on Windows 11, Python 3.12.10, `duckdb==2.0.0`, `dbt-core==1.12.6`, `dbt-duckdb==1.11.0`, `pytest==9.1.1`: `pytest -q` 107 passed (108 after the retention change), `dbt build` PASS=39.
- Generated data, the lake, the warehouse and dbt `target/` are not committed; run `python make_source.py` to recreate them.
- It should move to the reference-builds repository (`data-engineering/00-general/`) per `02-course-architecture.md` (Reference builds); kept here until that move is decided.
