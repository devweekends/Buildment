"""Build site/index.html: the basket cost per market for the latest four weeks.

Run:  python -m report.build_report
One HTML file, no JavaScript, no outside files. The bars are plain CSS boxes.
"""
import html

import duckdb

from pipeline import paths

CSS = """
body{font-family:system-ui,sans-serif;margin:0 auto;padding:16px;max-width:720px;line-height:1.4;background:#fff;color:#1b1b1b}
h1{font-size:1.4rem;margin:0 0 4px}h2{font-size:1.05rem;margin:0 0 6px}p{margin:4px 0}.note{color:#555;font-size:.9rem}
section{border:1px solid #ccc;border-radius:6px;padding:10px;margin:12px 0}
table{width:100%;border-collapse:collapse;font-size:.9rem}th,td{text-align:left;padding:4px 6px;border-top:1px solid #eee}
th{border-top:0;font-weight:600}td.n{text-align:right;white-space:nowrap}
.bar{background:#e4eaf2;border-radius:3px;height:10px;min-width:60px}.bar span{display:block;height:10px;background:#2b6cb0;border-radius:3px}
.up{color:#9b2c2c}.down{color:#276749}
@media (prefers-color-scheme:dark){body{background:#161616;color:#eee}section{border-color:#444}td{border-color:#333}.note{color:#aaa}
.bar{background:#2b3440}.bar span{background:#63a4ff}.up{color:#ff9a9a}.down{color:#7ee0a8}}
"""

QUERY = """
WITH latest AS (SELECT DISTINCT iso_year, iso_week FROM mart_weekly_basket ORDER BY iso_year DESC, iso_week DESC LIMIT 4)
SELECT b.market_code, coalesce(m.name, b.market_code), b.iso_week, b.week_start, b.full_days,
       b.avg_basket_cost, b.change, b.change_pct
FROM mart_weekly_basket b
JOIN latest USING (iso_year, iso_week)
LEFT JOIN dim_market m ON m.market_code = b.market_code AND m.is_current
ORDER BY b.market_code, b.iso_year, b.iso_week
"""


def change_text(change, percent):
    if change is None:
        return "no earlier week"
    arrow = "up" if change > 0 else "down" if change < 0 else "same"
    sign = "+" if change > 0 else ""
    return f'<span class="{arrow}">{arrow} {sign}{change} ({sign}{percent}%)</span>'


def build(warehouse=paths.WAREHOUSE, out=paths.SITE / "index.html"):
    con = duckdb.connect(str(warehouse), read_only=True)
    rows = con.execute(QUERY).fetchall()
    con.close()
    biggest = max(float(r[5]) for r in rows) if rows else 1.0
    sections = {}
    for code, name, week, start, days, cost, change, percent in rows:
        line = (f"<tr><td>Week {week}<br><span class='note'>from {start:%d %b}, {days} full day(s)</span></td>"
                f"<td class='n'>{cost} ILS</td><td>{change_text(change, percent)}</td>"
                f"<td><div class='bar'><span style='width:{float(cost) / biggest * 100:.0f}%'></span></div></td></tr>")
        sections.setdefault((code, name), []).append(line)
    body = ""
    for (code, name), lines in sections.items():
        body += (f"<section><h2>{html.escape(code)} {html.escape(name)}</h2><table>"
                 "<tr><th>Week</th><th>Basket</th><th>Change</th><th></th></tr>" + "".join(lines) + "</table></section>")
    page = ("<!doctype html><html lang='en'><head><meta charset='utf-8'>"
            "<meta name='viewport' content='width=device-width, initial-scale=1'><title>Mizan weekly food basket</title>"
            f"<style>{CSS}</style></head><body><h1>Weekly food basket by market</h1>"
            "<p class='note'>Cost in ILS of 12 basic items, averaged over the days when all 12 were priced. "
            "Prices come from volunteer reports and may arrive late, so recent weeks can still change. Synthetic data.</p>"
            f"{body}</body></html>")
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(page, encoding="utf-8")
    return out


if __name__ == "__main__":
    print(f"wrote {build().as_posix()}")
