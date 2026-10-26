"""Check the networking module briefs against the roadmap: every roadmap chapter
appears in its module brief's chapter table with the same title, type and minutes,
and the briefs carry the frontmatter and no em dashes."""
import re, sys
from pathlib import Path

work = Path(sys.argv[1])
roadmap = (work / "02-curriculum-roadmap.md").read_text(encoding="utf8")
rows = {}
mod = None
for line in roadmap.splitlines():
    m = re.match(r"^### Module (\d+):", line)
    if m:
        mod = int(m.group(1)); continue
    if line.startswith("## Totals"):
        mod = None
    r = re.match(r"^\| (\d+\.\d+) \|", line)
    if r and mod:
        c = [x.strip() for x in line.split("|")]
        rows[c[1]] = dict(module=mod, title=c[2], type=c[5], minutes=c[6])

problems = []
briefs = sorted((work / "module-briefs").glob("0*.md"))
if len(briefs) != 9:
    problems.append(f"expected 9 briefs, found {len(briefs)}")
seen = set()
for b in briefs:
    text = b.read_text(encoding="utf8")
    n = int(b.name[:2])
    if "—" in text:
        problems.append(f"{b.name}: em dash")
    if "roadmap_version: 3.1" not in text:
        problems.append(f"{b.name}: roadmap_version is not 3.1")
    if "roadmap_confirmed: true" not in text:
        problems.append(f"{b.name}: roadmap_confirmed missing")
    for line in text.splitlines():
        r = re.match(r"^\| (\d+\.\d+) \|", line)
        if not r:
            continue
        cid = r.group(1)
        if cid not in rows or rows[cid]["module"] != n:
            continue
        c = [x.strip() for x in line.split("|")]
        exp = rows[cid]
        if cid in seen:
            continue
        seen.add(cid)
        if c[2].strip("*") != exp["title"]:
            problems.append(f"{b.name} {cid}: title '{c[2]}' != '{exp['title']}'")
        if c[3] != exp["type"]:
            problems.append(f"{b.name} {cid}: type '{c[3]}' != '{exp['type']}'")
        if c[4] != exp["minutes"]:
            problems.append(f"{b.name} {cid}: minutes '{c[4]}' != '{exp['minutes']}'")
missing = sorted(set(rows) - seen, key=lambda x: [int(p) for p in x.split(".")])
if missing:
    problems.append(f"chapters missing from brief tables: {missing}")
print(f"{len(rows)} roadmap chapters, {len(seen)} matched in briefs")
for p in problems:
    print("PROBLEM:", p)
sys.exit(1 if problems else 0)
