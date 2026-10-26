"""Generate skill-graph.yaml and timeline.yaml for the networking course from the
roadmap tables plus the per-chapter declarations below, and check the graph."""
import re, sys, json
from pathlib import Path

work = Path(sys.argv[1])
roadmap = (work / "02-curriculum-roadmap.md").read_text(encoding="utf8")

# --- parse chapter rows from the roadmap ---
chapters = []
mod = None
for line in roadmap.splitlines():
    m = re.match(r"^### Module (\d+): (.*)", line)
    if m:
        mod = int(m.group(1)); continue
    if line.startswith("## Totals"):
        mod = None
    r = re.match(r"^\| (\d+)\.(\d+) \|", line)
    if r and mod:
        c = [x.strip() for x in line.split("|")]
        slow = re.search(r"slow path (\d+)", c[7])
        chapters.append(dict(id=f"{c[1]}", title=c[2], type=c[5], minutes=int(c[6]),
                             slow=int(slow.group(1)) if slow else None, play=c[7], outcome=c[4]))

ENTRY = {
    "terminal-basics": "Open a terminal, run a command, read its output",
    "js-basics": "JavaScript functions, arrays and numbers",
    "git-basics": "Git and GitHub: clone, commit, push",
}

NODES = {
    # module 1
    "own-addresses": "Your computer's address versus the address the world sees",
    "lab-environment": "The pinned lab container and the setup checker",
    "shell-commands": "cd, ls, cat, nano, sudo, Ctrl+C, exit",
    "namespaces-veth": "Network namespaces joined by a virtual cable",
    "ping-icmp": "ping and ICMP echo",
    "read-capture": "Reading tcpdump output",
    "packet-fields": "Header fields: addresses, ports, TTL, type",
    "layers": "Why a packet has layers: link, internet, app",
    "mac-address": "MAC addresses and the broadcast MAC",
    # module 2
    "exhaustion": "Why IPv4 addresses ran out",
    "ip-as-number": "An IPv4 address as one 32-bit number, in binary",
    "classful": "Classful addressing and why it failed",
    "cidr": "CIDR prefixes, block sizes and masks",
    "aggregation": "One CIDR block standing for many",
    "address-kinds": "Public, private, shared and special addresses",
    "nat-first-look": "A router rewrites the source address (first look)",
    "js-bitops": "JavaScript bit operators and unsigned results",
    # module 3
    "netmask": "What the mask decides",
    "subnet-calc": "Network address, broadcast, host range, same subnet",
    "arp": "ARP request and reply",
    "switch-learning": "How a switch learns where MACs live",
    "why-split": "Reasons to split a network",
    "vlsm-split": "Splitting a block by host counts on aligned boundaries",
    "overlap": "Overlapping ranges and what they break",
    "route-idea": "A route as a rule for where to send a packet",
    "ping-errors": "Network is unreachable versus silent loss",
    "address-plan": "Planning addresses for a real site",
    # module 4
    "read-trace": "Reading a traceroute",
    "default-gateway": "The default gateway and the next-hop MAC",
    "mac-per-hop": "MAC changes per hop, IP stays",
    "lpm": "Routing tables, longest prefix match and metrics",
    "ttl-icmp": "TTL, ICMP Time Exceeded and silent hops",
    "autonomous-systems": "Autonomous systems and route announcements",
    "ip-forwarding": "Turning a namespace into a router",
    "diagnose-routing": "Finding mask, gateway and route faults with commands",
    # module 5
    "ports": "Ports, well-known and ephemeral ranges",
    "conversation-id": "The five numbers that name a conversation",
    "listen-address": "Listening on 127.0.0.1 versus 0.0.0.0",
    "tcp": "TCP handshake, sequence numbers, retransmission",
    "udp": "UDP and when to choose it",
    # module 6
    "napt": "NAT table: address always, port on a clash",
    "conntrack": "Reading the real NAT table with conntrack",
    "inbound": "Why the internet cannot reach a home device; NAT is not a firewall",
    "port-forwarding": "Port forwarding (DNAT), docker run -p",
    "cgnat": "Carrier-grade NAT",
    "nat-timeouts": "Mapping timeouts, keepalives, STUN and relays",
    "nft-masquerade": "An nft masquerade rule",
    "nft-dnat-filter": "nft DNAT and a forward filter for isolation",
    "diagnose-nat": "Finding NAT and forwarding faults",
    # module 7
    "dhcp": "DHCP exchange, leases and failure behaviour",
    "dns-resolution": "Resolver, root, top-level and authoritative servers; records",
    "dns-ttl": "DNS caching, TTL and outages",
    "layered-diagnosis": "Diagnosing no internet layer by layer, captive portals",
    "dnsmasq": "dnsmasq for DHCP and DNS, per-namespace resolver files",
    # module 8
    "full-journey": "Every step from lease to first byte",
    "capstone-network": "A complete network with tests",
    "fault-diagnosis": "Finding injected faults and writing them up",
    # module 9
    "ipv6-format": "IPv6 addresses, short form, /64",
    "ipv6-no-nat": "Global addresses, SLAAC, firewall instead of NAT, dual stack",
}

# id: (requires, introduces, reinforces, evidence)
D = {
"1.1": ([ "terminal-basics"], ["own-addresses"], [], "written numbers in the learning log"),
"1.2": (["terminal-basics"], ["lab-environment"], [], "setup checker passes"),
"1.3": (["lab-environment"], ["shell-commands"], ["own-addresses"], "challenge 0 results committed"),
"1.4": (["shell-commands", "git-basics"], ["namespaces-veth", "ping-icmp", "read-capture"], [], "challenge 1 part 1 test and capture"),
"1.5": (["read-capture"], ["packet-fields"], ["ping-icmp"], "in-chapter quiz on fields"),
"1.6": (["packet-fields"], ["layers", "mac-address"], [], "wrap and unwrap check"),
"1.7": (["layers"], [], ["own-addresses", "packet-fields"], "quiz"),
"1.8": (["own-addresses", "layers"], [], ["own-addresses"], "home network map"),
"2.1": (["own-addresses"], ["exhaustion"], [], "none (read)"),
"2.2": (["exhaustion"], ["ip-as-number"], [], "unassisted drills"),
"2.3": (["ip-as-number"], ["classful", "cidr", "aggregation"], ["exhaustion"], "unassisted drills"),
"2.4": (["cidr"], ["address-kinds", "nat-first-look"], ["own-addresses"], "classification check"),
"2.5": (["ip-as-number", "address-kinds", "js-basics"], ["js-bitops"], [], "graded code tests"),
"2.6": (["address-kinds"], [], ["ip-as-number", "cidr", "packet-fields"], "quiz"),
"2.7": (["address-kinds", "nat-first-look"], [], ["exhaustion"], "explanation for a friend"),
"3.1": (["cidr", "own-addresses"], ["netmask"], [], "own mask recorded"),
"3.2": (["netmask", "ip-as-number"], ["subnet-calc"], ["cidr"], "unassisted drills"),
"3.3": (["subnet-calc", "mac-address"], ["arp", "switch-learning"], ["read-capture"], "ARP prediction check"),
"3.4": (["arp", "subnet-calc"], ["why-split"], [], "netlab check"),
"3.5": (["subnet-calc"], ["vlsm-split"], ["cidr"], "unassisted drills"),
"3.6": (["vlsm-split", "address-kinds"], ["overlap"], [], "overlap check"),
"3.7": (["subnet-calc", "js-bitops"], [], ["subnet-calc"], "graded code tests"),
"3.8": (["vlsm-split", "overlap", "js-bitops"], [], ["vlsm-split"], "graded code tests"),
"3.9": (["namespaces-veth", "arp", "subnet-calc"], ["route-idea", "ping-errors"], ["read-capture"], "challenge 1 part 2 test and capture"),
"3.10": (["vlsm-split", "overlap", "why-split"], ["address-plan"], [], "graded lab checks"),
"3.11": (["subnet-calc", "arp"], [], ["cidr", "address-kinds"], "quiz"),
"3.12": (["address-plan"], [], ["vlsm-split"], "defended plan"),
"4.1": (["own-addresses"], ["read-trace"], ["address-kinds"], "own trace annotated"),
"4.2": (["arp", "route-idea"], ["default-gateway", "mac-per-hop"], ["subnet-calc"], "netlab check"),
"4.3": (["default-gateway", "cidr"], ["lpm"], ["read-trace"], "netlab check"),
"4.4": (["lpm", "ping-icmp"], ["ttl-icmp"], ["read-trace"], "netlab check"),
"4.5": (["lpm"], ["autonomous-systems"], [], "none (read)"),
"4.6": (["lpm", "js-bitops"], [], ["lpm"], "graded code tests"),
"4.7": (["default-gateway", "lpm", "namespaces-veth"], ["ip-forwarding"], ["mac-per-hop", "read-capture"], "challenge 2 tests and captures"),
"4.8": (["lpm", "ping-errors", "ip-forwarding"], ["diagnose-routing"], ["subnet-calc"], "graded lab checks"),
"4.9": (["lpm", "ttl-icmp"], [], ["arp", "vlsm-split"], "quiz"),
"4.10": (["read-trace", "ttl-icmp"], [], ["lpm"], "trace explanation"),
"5.1": (["own-addresses"], [], [], "own conversation list"),
"5.2": (["packet-fields"], ["ports", "conversation-id"], [], "netlab check"),
"5.3": (["ports", "subnet-calc"], ["listen-address"], [], "netlab check"),
"5.4": (["conversation-id"], ["tcp"], ["read-capture"], "in-chapter quiz"),
"5.5": (["tcp"], ["udp"], [], "in-chapter quiz"),
"5.6": (["listen-address", "tcp", "namespaces-veth"], [], ["read-capture"], "challenge 3 tests and capture"),
"5.7": (["conversation-id", "udp"], [], ["lpm"], "quiz"),
"5.8": (["conversation-id", "tcp"], [], ["read-capture"], "capture line explained"),
"6.1": (["nat-first-look", "conversation-id"], [], ["nat-first-look"], "none (read)"),
"6.2": (["conversation-id", "default-gateway"], ["napt", "conntrack"], ["nat-first-look"], "netlab check"),
"6.3": (["napt", "lpm", "listen-address"], ["inbound", "port-forwarding"], ["address-kinds"], "netlab check"),
"6.4": (["napt", "address-kinds", "read-trace"], ["cgnat"], [], "netlab check"),
"6.5": (["napt", "udp"], ["nat-timeouts"], [], "in-chapter quiz"),
"6.6": (["napt", "js-basics"], [], ["napt"], "graded code tests"),
"6.7": (["napt", "ip-forwarding"], ["nft-masquerade"], ["conntrack", "read-capture"], "challenge 4 part 1 tests and captures"),
"6.8": (["nft-masquerade", "port-forwarding", "why-split"], ["nft-dnat-filter"], ["inbound"], "challenge 4 part 2 tests"),
"6.9": (["port-forwarding", "cgnat", "diagnose-routing"], ["diagnose-nat"], ["inbound"], "graded lab checks"),
"6.10": (["napt", "cgnat"], [], ["tcp"], "quiz"),
"6.11": (["napt", "conntrack"], [], ["own-addresses"], "course question answered with own capture"),
"7.1": (["default-gateway"], [], [], "none (read)"),
"7.2": (["udp", "mac-address", "address-kinds"], ["dhcp"], ["netmask"], "netlab check"),
"7.3": (["udp"], ["dns-resolution"], [], "in-chapter quiz"),
"7.4": (["dns-resolution", "autonomous-systems"], ["dns-ttl"], [], "in-chapter quiz"),
"7.5": (["dhcp", "dns-resolution", "diagnose-routing"], ["layered-diagnosis"], ["diagnose-nat"], "graded lab checks"),
"7.6": (["dhcp", "dns-resolution", "nft-masquerade"], ["dnsmasq"], [], "challenge 5 tests"),
"7.7": (["dhcp", "dns-ttl", "layered-diagnosis"], [], ["napt"], "quiz"),
"7.8": (["layered-diagnosis"], [], ["dhcp", "dns-resolution"], "runbook"),
"8.1": (["dhcp", "dns-resolution", "napt", "tcp", "lpm", "arp"], ["full-journey"], [], "netlab check"),
"8.2": (["ip-forwarding", "address-plan", "full-journey"], ["capstone-network"], ["lpm"], "capstone part 1 tests"),
"8.3": (["capstone-network", "nft-dnat-filter"], [], ["nft-masquerade"], "capstone part 2 tests"),
"8.4": (["capstone-network", "dnsmasq"], [], ["dhcp"], "capstone part 3 tests"),
"8.5": (["capstone-network", "layered-diagnosis", "diagnose-nat"], ["fault-diagnosis"], [], "fault write-up"),
"8.6": (["full-journey"], [], ["subnet-calc", "lpm", "napt", "dns-resolution"], "final quiz"),
"8.7": (["fault-diagnosis", "capstone-network"], [], ["napt", "conntrack"], "recorded demo and probes"),
"9.1": (["own-addresses"], [], [], "own IPv6 addresses recorded"),
"9.2": (["ip-as-number", "cidr"], ["ipv6-format"], [], "in-chapter v6 exercise and quiz"),
"9.3": (["ipv6-format", "napt", "inbound"], ["ipv6-no-nat"], [], "netlab check"),
"9.4": (["ipv6-format", "ipv6-no-nat"], [], [], "quiz"),
"9.5": (["ipv6-no-nat"], [], ["exhaustion", "cgnat"], "short answer"),
}

ids = [c["id"] for c in chapters]
problems = []
if set(ids) != set(D):
    problems.append(f"chapter mismatch: roadmap-only {set(ids)-set(D)}, data-only {set(D)-set(ids)}")
order = {cid: i for i, cid in enumerate(ids)}
introduced_at = {}
for cid in ids:
    for n in D[cid][1]:
        if n in introduced_at:
            problems.append(f"{n} introduced twice ({introduced_at[n]}, {cid})")
        introduced_at[n] = cid
for n in NODES:
    if n not in introduced_at:
        problems.append(f"node {n} never introduced")
for cid in ids:
    req, intro, rein, _ = D[cid]
    for n in req + rein:
        if n in ENTRY:
            continue
        if n not in NODES:
            problems.append(f"{cid}: unknown node {n}")
        elif order[introduced_at[n]] >= order[cid]:
            problems.append(f"{cid}: requires {n}, introduced later or here at {introduced_at[n]}")
# acyclic by construction: every edge points from an earlier chapter's node; verify
edges = set()
for cid in ids:
    for n in D[cid][1]:
        for r in D[cid][0]:
            edges.add((r, n))
# topological check
from collections import defaultdict, deque
indeg = defaultdict(int); adj = defaultdict(list)
allnodes = set(NODES) | set(ENTRY)
for a, b in edges:
    adj[a].append(b); indeg[b] += 1
q = deque([n for n in allnodes if indeg[n] == 0]); seen = 0
while q:
    n = q.popleft(); seen += 1
    for m in adj[n]:
        indeg[m] -= 1
        if indeg[m] == 0: q.append(m)
cycles = len(allnodes) - seen

# --- time split per type (fractions of the chapter's minutes) ---
SPLIT = {
    "Read": dict(reading=0.8, build=0.0, verify=0.0, reflect=0.1, buffer=0.1),
    "Learn": dict(reading=0.45, build=0.3, verify=0.1, reflect=0.05, buffer=0.1),
    "Code": dict(reading=0.15, build=0.55, verify=0.2, reflect=0.0, buffer=0.1),
    "Build": dict(reading=0.15, build=0.5, verify=0.2, reflect=0.05, buffer=0.1),
    "Lab": dict(reading=0.15, build=0.5, verify=0.2, reflect=0.05, buffer=0.1),
    "Check": dict(reading=0.0, build=0.0, verify=0.9, reflect=0.1, buffer=0.0),
    "Gate": dict(reading=0.0, build=0.0, verify=0.2, reflect=0.7, buffer=0.1),
}

def y(s):
    return json.dumps(s, ensure_ascii=False)

# weeks at 12 core hours
weeks = []; cur = None; acc = 0
for c in chapters:
    m = int(c["id"].split(".")[0])
    if cur is None or acc + c["minutes"] > 12 * 60:
        cur = dict(week=len(weeks) + 1, minutes=0, modules=[], last=None); weeks.append(cur); acc = 0
    cur["minutes"] += c["minutes"]; acc += c["minutes"]
    if m not in cur["modules"]: cur["modules"].append(m)
    cur["last"] = c["id"]

sg = ["---", "artifact: skill-graph", "course: networking", "version: 1", "roadmap_version: 3", "roadmap_confirmed: true",
      "generated_from: 02-curriculum-roadmap.md and the chapter declarations in the generator", "---", "", "nodes:"]
for n, label in ENTRY.items():
    sg += [f"  - id: {n}", f"    label: {y(label)}", "    type: entry"]
for n, label in NODES.items():
    sg += [f"  - id: {n}", f"    label: {y(label)}", "    type: taught", f"    introduced_in: {y(introduced_at[n])}"]
sg += ["", "edges:"]
for a, b in sorted(edges):
    sg += [f"  - from: {a}", f"    to: {b}"]
sg += ["", "diagnostic:",
       "  - question: \"Open a terminal and print the files in this folder. What did you type?\"",
       "    maps_to: terminal-basics",
       "    if_missing: \"Repair: the shell part of 1.3 first, then 1.2.\"",
       "  - question: \"What does [1, 2, 3].map(n => n * 2) return?\"",
       "    maps_to: js-basics",
       "    if_missing: \"Repair: a 30-minute JavaScript refresher before 2.5; Foundations learners may use the read-and-answer alternative.\"",
       "  - question: \"What is 13 in binary?\"",
       "    maps_to: ip-as-number",
       "    if_missing: \"No repair needed: 2.2 teaches binary from zero. A learner who answers correctly may skip the first drill set.\"",
       "  - question: \"Clone a repository and push one commit. Did it work?\"",
       "    maps_to: git-basics",
       "    if_missing: \"Repair: the Git steps in challenge 0 are shown in full.\""]
(work / "skill-graph.yaml").write_text("\n".join(sg) + "\n", encoding="utf8")

tl = ["---", "artifact: timeline", "course: networking", "version: 1", "roadmap_version: 3", "roadmap_confirmed: true",
      "budget_core_hours: 42", "budget_slow_path_hours: 54", "hours_per_week: 12", "---", "", "weeks:"]
WEEKDEMO = {1: "two namespaces pinging with a capture, the learner's own numbers, and a working subnet calculator (code 3.7, 3.8)",
            2: "a router built from namespaces (challenge 2), the fixed office lab, and a captured handshake (challenge 3)",
            3: "a home router with NAT, port forwarding and a guest network (challenge 4), and DHCP and DNS on it (challenge 5)",
            4: "the capstone network with its tests, the fault write-up, the recorded demo, and IPv6 read on the learner's own phone"}
for w in weeks:
    tl += [f"  - week: {w['week']}", f"    hours: {round(w['minutes']/60,1)}",
           f"    modules: {w['modules']}", f"    ends_at: {y(w['last'])}",
           f"    demo: {y(WEEKDEMO.get(w['week'], ''))}"]
tl += ["", "chapters:"]
for c in chapters:
    req, intro, rein, ev = D[c["id"]]
    h = c["minutes"] / 60; sp = SPLIT[c["type"]]
    tl += [f"  - id: {y(c['id'])}", f"    title: {y(c['title'])}", f"    type: {c['type']}",
           f"    estimate_hours: {round(h,2)}"]
    if c["slow"]:
        tl += [f"    slow_path_hours: {round(c['slow']/60,2)}"]
    for k in ["reading", "build", "verify", "reflect", "buffer"]:
        tl += [f"    {k}: {round(h*sp[k],2)}"]
    tl += [f"    requires: {y(req)}", f"    introduces: {y(intro)}", f"    reinforces: {y(rein)}", f"    evidence: {y(ev)}"]
(work / "timeline.yaml").write_text("\n".join(tl) + "\n", encoding="utf8")

core = sum(c["minutes"] for c in chapters)
print(json.dumps(dict(chapters=len(chapters), nodes=len(NODES), entry=len(ENTRY), edges=len(edges), cycles=cycles,
                      problems=problems, core_hours=round(core/60,1),
                      weeks=[(w["week"], round(w["minutes"]/60,1), w["modules"], w["last"]) for w in weeks]), indent=1))
