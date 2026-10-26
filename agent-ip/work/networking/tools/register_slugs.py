"""Register new networking canvas slug folders in the slug lists, the registry and
the package exports, in the same shape as the existing entries.

Usage (from the repository root): python agent-ip/work/networking/tools/register_slugs.py [--check]

A folder counts when it is packages/learning-ui/src/canvas/net-*/ with a data.ts
that exports `export const <name>`; folders already registered are skipped. With
--check it only lists what it would add and exits 1 if anything is missing."""
import json, re, sys
from pathlib import Path

ROOT = Path.cwd()
CANVAS = ROOT / "packages/learning-ui/src/canvas"
SLUG_LISTS = [ROOT / "server/src/shared/canvas/slugs.ts",
              ROOT / "packages/learning-ui/src/shared/canvas/slugs.ts",
              ROOT / "frontend/src/shared/canvas/slugs.ts"]
REGISTRY = CANVAS / "registry.ts"
PKG = ROOT / "packages/learning-ui/package.json"

registry = REGISTRY.read_text(encoding="utf8")
found = []
for folder in sorted(CANVAS.glob("net-*")):
    data = folder / "data.ts"
    if not data.is_file():
        continue
    slug = folder.name
    m = re.search(r"export const (\w+)\s*:\s*CustomCanvasSpec|export const (\w+)\s*=", data.read_text(encoding="utf8"))
    if not m:
        continue
    if f'"{slug}":' in registry:
        continue
    found.append((slug, m.group(1) or m.group(2)))

if "--check" in sys.argv:
    for s, n in found:
        print("missing:", s, n)
    sys.exit(1 if found else 0)
if not found:
    print("nothing to register"); sys.exit(0)

for path in SLUG_LISTS:
    text = path.read_text(encoding="utf8")
    insert = "".join(f'  "{s}",\n' for s, _ in found if f'"{s}"' not in text)
    text = text.replace("] as const;", insert + "] as const;", 1)
    path.write_text(text, encoding="utf8")

imports = "".join(f'import {{ {n} }} from "./{s}/data";\n' for s, n in found)
last_import = list(re.finditer(r'^import .*;\n', registry, re.M))[-1]
registry = registry[:last_import.end()] + imports + registry[last_import.end():]
start = registry.index("export const canvasRegistry")
end = registry.index("\n};", start)
entries = "".join(f'\n  "{s}": {n},' for s, n in found)
registry = registry[:end] + entries + registry[end:]
REGISTRY.write_text(registry, encoding="utf8")

pkg = json.loads(PKG.read_text(encoding="utf8"))
for s, _ in found:
    pkg["exports"].setdefault(f"./canvas/{s}/data", f"./src/canvas/{s}/data.ts")
PKG.write_text(json.dumps(pkg, indent=2) + "\n", encoding="utf8")
print(f"registered {len(found)} slugs:", ", ".join(s for s, _ in found))
