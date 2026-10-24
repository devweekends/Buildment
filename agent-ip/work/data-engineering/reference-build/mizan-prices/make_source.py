"""Make the fake source data for mizan-prices (all data is synthetic).

Run:  python make_source.py --days 28 --start 2026-03-01 --seed 7 --out data
Same seed, same files, on any computer.
"""
import argparse
import csv
import json
import random
import shutil
import sqlite3
from datetime import date, datetime, time, timedelta
from pathlib import Path

# code, name, category, unit, base price (ILS), drift over 28 days
ITEMS = [
    ("I01", "flour", "grains", "kg", 8.0, 0.06), ("I02", "rice", "grains", "kg", 7.0, 0.03),
    ("I03", "lentils", "pulses", "kg", 9.0, 0.02), ("I04", "sugar", "pantry", "kg", 6.0, 0.04),
    ("I05", "cooking oil", "pantry", "litre", 18.0, 0.05), ("I06", "tomatoes", "vegetables", "kg", 4.0, -0.08),
    ("I07", "potatoes", "vegetables", "kg", 3.5, 0.01), ("I08", "onions", "vegetables", "kg", 3.0, 0.07),
    ("I09", "eggs", "dairy_eggs", "tray of 30", 24.0, 0.03), ("I10", "milk powder", "dairy_eggs", "pack", 35.0, 0.0),
    ("I11", "tea", "pantry", "pack", 14.0, 0.01), ("I12", "bread", "bakery", "pack", 7.0, 0.04),
]
# code, name, area, opens, price factor
MARKETS = [
    ("M01", "Al Nour Market", "Central", "daily", 1.00), ("M02", "Sea Gate Market", "Harbour", "daily", 0.97),
    ("M03", "Fisher Row Market", "Harbour", "daily", 1.05), ("M04", "Old Stone Market", "Old Town", "daily", 0.95),
    ("M05", "Northgate Market", "North", "daily", 1.10), ("M06", "Olive Square Market", "South", "daily", 1.02),
    ("M07", "Hilltop Market", "Hill", "daily", 0.98), ("M08", "Palm Court Market", "Central", "daily", 1.03),
]
MARKET_CHANGES = [("M03", "2026-03-12", "area", "Hill"), ("M06", "2026-03-20", "opens", "Sat to Thu")]
# id, name, market, phone. The second list is the secondary volunteer for a market.
VOLUNTEERS = [
    ("V01", "Amal Haddad", "M01"), ("V02", "Bashir Naim", "M02"), ("V03", "Dina Sabbagh", "M03"),
    ("V04", "Eyad Mansour", "M04"), ("V05", "Farah Qasem", "M05"), ("V06", "Ghazi Aburas", "M06"),
    ("V07", "Hiba Tamimi", "M07"), ("V08", "Imad Zaid", "M08"), ("V09", "Jumana Fares", "M01"),
    ("V10", "Karim Odeh", "M02"), ("V11", "Lubna Rantisi", "M03"), ("V12", "Majd Salem", "M04"),
]
SCHEMA_CHANGE = "2026-03-15"  # from this upload date the form adds the unit field


def phone(volunteer_id, day):
    number = int(volunteer_id[1:])
    if volunteer_id == "V07" and day >= "2026-03-15":
        return "+970-59-000-0207"  # V07 changed phone
    return f"+970-59-000-01{number:02d}"


def write_registry(path, start, as_of):
    """Write the volunteer registry as it was at the end of day as_of."""
    path.parent.mkdir(parents=True, exist_ok=True)
    path.unlink(missing_ok=True)
    db = sqlite3.connect(path)
    db.execute("CREATE TABLE markets(market_code TEXT PRIMARY KEY, name TEXT, area TEXT, opens TEXT, updated_at TEXT)")
    db.execute("CREATE TABLE volunteers(volunteer_id TEXT PRIMARY KEY, full_name TEXT, phone TEXT, market_code TEXT, updated_at TEXT)")
    for code, name, area, opens, _ in MARKETS:
        row = {"area": area, "opens": opens, "updated_at": f"{start}T00:00:00Z"}
        for m, day, field, value in MARKET_CHANGES:
            if m == code and day <= as_of:
                row[field], row["updated_at"] = value, f"{day}T09:00:00Z"
        db.execute("INSERT INTO markets VALUES (?,?,?,?,?)", (code, name, row["area"], row["opens"], row["updated_at"]))
    for vid, name, market in VOLUNTEERS:
        if vid == "V11" and as_of >= "2026-03-22":
            continue  # V11 left and the app hard-deleted the row
        changed = vid == "V07" and as_of >= "2026-03-15"
        updated = "2026-03-15T08:30:00Z" if changed else f"{start}T00:00:00Z"
        db.execute("INSERT INTO volunteers VALUES (?,?,?,?,?)", (vid, name, phone(vid, as_of), market, updated))
    db.commit()
    db.close()
    return len(MARKETS), 11 if as_of >= "2026-03-22" else 12


def write_csv(path, header, rows):
    with open(path, "w", newline="") as f:
        out = csv.writer(f, lineterminator="\n")
        out.writerow(header)
        out.writerows(rows)


def write_small_files(raw, start):
    write_csv(raw / "items.csv", ["item_code", "item_name", "category", "unit"], [i[:4] for i in ITEMS])
    contacts = [(m[0], f"Contact {m[0]}", "committee chair") for m in MARKETS]
    contacts.append(("M02", "Contact M02 b", "stall coordinator"))  # two contacts for one market, on purpose
    write_csv(raw / "market_contacts.csv", ["market_code", "contact_name", "contact_role"], contacts)
    history = []  # every version of every market, valid_from inclusive, valid_to exclusive
    for code, name, area, opens, _ in MARKETS:
        version, from_day = {"area": area, "opens": opens}, start
        for m, day, field, value in sorted(MARKET_CHANGES, key=lambda c: c[1]):
            if m == code:
                history.append([code, name, version["area"], version["opens"], from_day, day])
                version[field], from_day = value, day
        history.append([code, name, version["area"], version["opens"], from_day, ""])
    write_csv(raw / "market_history.csv", ["market_code", "name", "area", "opens", "valid_from", "valid_to"], history)


def volunteer_for(market, day):
    """One volunteer per market, or two taking turns by day of month."""
    people = [v for v in VOLUNTEERS if v[2] == market and not (v[0] == "V11" and day >= "2026-03-22")]
    return people[int(day[8:10]) % len(people)]


def make_reports(rng, start, n_days):
    """Build the list of distinct reports (before dates of upload are chosen)."""
    rows = []
    for k in range(n_days):
        day = (start + timedelta(days=k)).isoformat()
        for code, _, _, _, factor in MARKETS:
            vid, vname, _ = volunteer_for(code, day)
            for item, _, _, _, base, drift in ITEMS:
                if rng.random() > 0.97:
                    continue  # the volunteer skipped this item today
                price = base * factor * (1 + drift * k / 28) * (1 + rng.uniform(-0.03, 0.03))
                when = datetime.fromisoformat(day) + timedelta(hours=rng.randint(5, 12), minutes=rng.randint(0, 59))
                rows.append({"market_code": code, "item_code": item, "price": max(0.5, round(price * 2) / 2),
                             "reported_at": when, "volunteer_id": vid, "volunteer_name": vname,
                             "volunteer_phone": phone(vid, day), "kind": ""})
    n_repeat = round(0.012 * len(rows))
    for i in sorted(rng.sample(range(len(rows)), n_repeat)):  # real repeats: same day, later, new price
        row = dict(rows[i], kind="repeat")
        row["reported_at"] += timedelta(hours=rng.randint(1, 4), minutes=rng.randint(0, 59))
        row["price"] = max(0.5, row["price"] + rng.choice([-1.0, -0.5, 0.5, 1.0]))
        rows.append(row)
    rows.sort(key=lambda r: (r["reported_at"], r["market_code"], r["item_code"]))
    for n, row in enumerate(rows, start=1):
        row["report_id"] = f"r-{n:06d}"
        row["uploaded_at"] = row["reported_at"] + timedelta(minutes=rng.randint(20, 240))
    return rows


def spoil_and_delay(rng, rows, last):
    """Add late uploads, bad rows and duplicate sends. Returns the extra duplicate lines."""
    incident = [r for r in rows if r["market_code"] == "M05" and "2026-03-09" <= r["reported_at"].date().isoformat() <= "2026-03-11"
                and last >= date(2026, 3, 12)]
    for r in incident:  # M05 had no connection, so everything arrives on 12 March
        r["uploaded_at"] = datetime(2026, 3, 12, rng.randint(6, 8), rng.randint(0, 59))
    pool = [r for r in rows if r not in incident and r["reported_at"].date() < last]
    for r in rng.sample(pool, max(0, min(round(0.08 * len(rows)) - len(incident), len(pool)))):
        delay = min(rng.randint(1, 3), (last - r["reported_at"].date()).days)
        r["uploaded_at"] = datetime.combine(r["reported_at"].date() + timedelta(days=delay), time(rng.randint(6, 18), rng.randint(0, 59)))
    bad = rng.sample(range(len(rows)), round(0.005 * len(rows)))
    for n, i in enumerate(sorted(bad)):
        if n % 3 == 0:
            rows[i]["price"] = 0.0
        elif n % 3 == 1:
            rows[i]["price"] = -rows[i]["price"]
        else:
            rows[i]["item_code"] = None
        rows[i]["kind"] += "bad"
    good = [r for r in rows if "bad" not in r["kind"]]
    dups = []
    for r in rng.sample(good, round(0.03 * len(rows))):
        gap = (r["uploaded_at"].date() - r["reported_at"].date()).days
        if min(rng.randint(0, 1), 3 - gap) == 1 and r["uploaded_at"].date() < last:  # next day, never more than 3 days after the report
            when = datetime.combine(r["uploaded_at"].date() + timedelta(days=1), time(rng.randint(6, 18), rng.randint(0, 59)))
        else:
            when = min(r["uploaded_at"] + timedelta(minutes=rng.randint(30, 300)), datetime.combine(r["uploaded_at"].date(), time(23, 59)))
        dups.append(dict(r, uploaded_at=when, kind="dup"))
    return dups


def line(row, upload_date, units):
    z = "%Y-%m-%dT%H:%M:%SZ"
    out = {"report_id": row["report_id"], "market_code": row["market_code"], "item_code": row["item_code"],
           "price": float(row["price"]), "reported_at": row["reported_at"].strftime(z), "uploaded_at": row["uploaded_at"].strftime(z),
           "volunteer_id": row["volunteer_id"], "volunteer_name": row["volunteer_name"], "volunteer_phone": row["volunteer_phone"]}
    if upload_date >= SCHEMA_CHANGE:
        out["unit"] = units.get(row["item_code"])
    return json.dumps(out)


def main():
    p = argparse.ArgumentParser(description="Make synthetic Mizan source data.")
    p.add_argument("--days", type=int, default=28)
    p.add_argument("--start", default="2026-03-01")
    p.add_argument("--seed", type=int, default=7)
    p.add_argument("--out", default="data")
    p.add_argument("--as-of", default=None, help="write the registry as it was at the end of this day")
    p.add_argument("--registry-only", action="store_true")
    a = p.parse_args()
    start = date.fromisoformat(a.start)
    last = start + timedelta(days=a.days - 1)
    raw = Path(a.out) / "raw"
    raw.mkdir(parents=True, exist_ok=True)
    n_markets, n_volunteers = write_registry(raw / "registry.db", a.start, a.as_of or last.isoformat())
    if a.registry_only:
        print(f"registry written: {n_markets} markets, {n_volunteers} volunteers")
        return
    write_small_files(raw, a.start)
    rng = random.Random(a.seed)
    rows = make_reports(rng, start, a.days)
    dups = spoil_and_delay(rng, rows, last)
    units = {i[0]: i[3] for i in ITEMS}
    by_day = {}
    for row in sorted(rows + dups, key=lambda r: (r["uploaded_at"], r["report_id"])):
        by_day.setdefault(row["uploaded_at"].date().isoformat(), []).append(row)
    shutil.rmtree(raw / "uploads", ignore_errors=True)
    for day, day_rows in sorted(by_day.items()):
        folder = raw / "uploads" / f"upload_date={day}"
        folder.mkdir(parents=True)
        cut = (len(day_rows) * 3 + 4) // 5  # two uploads a day: the first holds about 60 percent
        for number, chunk in enumerate([day_rows[:cut], day_rows[cut:]], start=1):
            if chunk:
                (folder / f"batch-{number:02d}.jsonl").write_text("".join(line(r, day, units) + "\n" for r in chunk))
    late = sum(1 for r in rows if r["uploaded_at"].date() > r["reported_at"].date())
    print(f"markets: {n_markets}\nvolunteers in registry: {n_volunteers}\nitems: {len(ITEMS)}\nupload folders: {len(by_day)}")
    print(f"distinct reports: {len(rows)}\nlines written: {len(rows) + len(dups)}\nlate reports: {late}")
    print(f"duplicate sends: {len(dups)}\nbad rows: {sum('bad' in r['kind'] for r in rows)}\ntrue repeats: {sum('repeat' in r['kind'] for r in rows)}")


if __name__ == "__main__":
    main()
