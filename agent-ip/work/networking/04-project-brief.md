---
artifact: project-brief
course: networking
version: 1
owner: project-designer
roadmap_version: 3
roadmap_confirmed: true
---

# Project brief: a home network and a small internet on one laptop

## Product

The learner's `networking-challenges` repository, ending in challenge 6: a script that builds, on one Linux machine, a home network with a guest network behind a home router, a provider network and a "public" web server, all from network namespaces. It exists so a learner can see, capture and break every step a packet takes from their own device to a server, which they cannot do on their real home router. The product is the network plus the evidence that it works: tests, captures and a write-up.

## Actors and permissions

The "actors" are the devices and routers in the built network.

| Actor | Can | Cannot |
|---|---|---|
| Home device (laptop, phone) | Get a lease, resolve names, reach the public server, be reached on one forwarded port | Be reached on any other port from outside |
| Guest device | Get a lease, resolve names, reach the public server | Reach any home device |
| Home router | Forward between its networks, masquerade traffic going out, forward one port in, serve DHCP and DNS | Hide the home network's private range from a route the outside sets (NAT is not a firewall, dossier 5.6) |
| Provider router | Route between the home router's outside link and the public network | Reach home devices except through the forwarded port |
| Public web server | Answer requests and report the source address and port it sees | See any private address |
| The learner | Run the build, test, fault and teardown scripts in the lab with root inside the container | Change the host's real network (the lab is a container) |

Trust boundaries: home and guest networks (filter rule), the home router's outside interface (NAT), the lab container and the learner's computer (`--privileged`, used only for this image).

## Core journeys

1. **A new device joins.** The device asks for a lease; dnsmasq offers one with address, mask, gateway and DNS server; the device installs a default route. Failure path: the pool is full and the device is left with no address (the Linux client gives up in about 3 seconds, dossier 5.6). Success: the test sees an address in the right range.
2. **A device opens the public website.** The name resolves through the router's DNS; the device ARPs for its gateway; the router looks up its default route, masquerades the source and forwards it via the provider router; the server replies to the router's outside address; the router translates back. Failure path: a missing default route gives "Destination Net Unreachable" from the router (dossier 5.7). Success: the server reports the router's outside address, and captures on both sides show the rewrite.
3. **Someone outside opens the home web server.** A request to the router's outside address on the forwarded port is translated to the home server. Failure path: any other port is refused. Success: the forwarded request reaches the home server, tested from the public server's namespace (dossier 5.7).
4. **A guest tries to reach a home device.** The forward filter drops it. Success: the test that must fail does fail, while the guest still reaches the internet.

## Data model

The network itself is the data model, written as variables at the top of the build script:

- Address plan: home `192.168.1.0/24`, guest `192.168.50.0/24`, home router to provider `198.51.100.0/30`, public network `203.0.113.0/24` (documentation ranges stand in for public space, [S10]).
- Devices: name, namespace, interface, address or "DHCP", gateway.
- Routes per namespace; nft tables (nat postrouting masquerade, nat prerouting forward, filter forward drop); dnsmasq settings (range, lease time, local names).

Invariants: no two networks overlap (checked by the learner's own 3.8 code); every private network leaves only through masquerade; the server never sees a private source address.

## Hard constraints

- Everything runs in one container on a modest laptop, with no cloud account.
- Documentation addresses are not routable on the real internet, so the "internet" is built inside the lab.
- Scripts must be safe to rerun after a crash or a power cut (teardown first) and must reject Windows line endings with a plain message.
- Behaviour taught must match Linux behaviour seen in the learner's own captures (port kept unless it clashes; refused, not timed out, on an unforwarded port).

## Hero feature

**Seeing NAT happen to your own packet:** one `curl` from a home device, with `tcpdump` running on both sides of the router and `conntrack -L` showing the mapping, so the learner answers the course question with evidence they produced.

## Production requirements

- One build script, one teardown, one fault script (seeded), one test script per part.
- Tests: what must work (leases, names, outbound, the forwarded port) and what must not (guest to home, unforwarded ports, the server seeing a private address).
- Captures committed in `results.md` with the commands that made them.
- README in the house shape: 101 glossary, what you built, a step table linking script lines, where each number comes from, results.
- Not applicable: authentication, storage, deployment, observability beyond the captures.

## Failure modes

The fault matrix in `module-briefs/08-capstone.md` lists the faults the learner must find. The real-world failures behind them, from the dossier: overlapping ranges (Docker's `172.17.0.0/16` [S46], cloud peering [S47]), DNS outages (Facebook 2021 [S48], AWS 2025 [S49]), NAT idle timeouts and port limits [S51], and a DHCP pool too small (hypothetical, labelled so).

## Capstone evidence

The repository with passing tests, the fault write-up with its seed, captures from both sides of the router, and the recorded demo answering three probes (roadmap, Capstone). A mentor reviews it with the rubric in 8.7 in under 30 minutes.

## Variant deltas

Not applicable: the course has no variants (brief, Variants; decision log). Follow-on depth goes to the AWS course (VPCs and NAT gateways) and the Linux course (container networking, reusing challenges 2 and 4).
