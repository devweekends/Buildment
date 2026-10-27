---
artifact: research-addendum
course: networking
version: 1
status: draft
owner: research
extends: 01-research-dossier.md
sources_checked: 2026-10-27
modules:
  - A. How networks connect to each other (ASNs, BGP, peering, route security)
  - B. VPNs
  - C. Toolbox (Wireshark, tshark, tcpdump, mtr, dig, nmap, iperf3, whois)
hard_constraints:
  - The JavaScript code runner and the lab container cannot touch the real Internet's routing, so real BGP data is read from public lookup services, and any BGP lab uses private or documentation ASNs inside namespaces
  - The lab container hides the real path (dossier 5.5), so mtr and traceroute for real ASN mapping run on the learner's host, not in the container
  - Wireshark (GUI) is 142 MiB to download and 564 MiB installed on Ubuntu 24.04, so it belongs on the host, not in the lab image; tshark and tcpdump belong in the image
  - Port scanning needs a written rule for learners: own machines and own lab only
open_questions:
  - Which public lookup service is the course default (RIPEstat is the only one verified as a documented, keyless API)?
  - Do we run a two-AS BGP lab with FRR or BIRD, or only read real data? (Packages verified, no lab run in this addendum)
  - Windows and macOS hosts need a Wireshark install path; is a recorded walkthrough enough?
---

# Research addendum: internet, VPN and tools

Source IDs [S83] and up are new; [S1] to [S82] are in `01-research-dossier.md`. Every source was fetched or run on 2026-10-27 unless the row says otherwise. Claims marked **UNVERIFIED** must not appear in learner text as fact. The dossier listed "BGP configuration" as out of scope; this addendum covers BGP concepts, reading real routing data and real incidents, not router configuration.

## 1. Facts to verify, each with a primary source

"Use" lines are safe for writers. "Care" lines are traps found while reading.

### 1.1 Autonomous systems and ASNs
- **Definition, RFC 1930 (March 1996).** "An AS is a connected group of one or more IP prefixes run by one or more network operators" with a single and clearly defined routing policy [S68]. Use.
- **Definition, RFC 4271 (January 2006).** An AS is a set of routers under a single technical administration, using an IGP and common metrics inside and an inter-AS protocol outside (Section 1.1) [S83]. Care: the two RFCs word it differently; pick one for the glossary and keep the dossier wording [S68].
- **When you need one.** A multihomed site needs its own AS. A single-homed site with one prefix does not; its prefix sits in the provider's AS. Running an IGP alone is not a reason [S68]. Use: most learners are inside an ISP's AS and have no ASN of their own.
- **16-bit and 32-bit.** RFC 6793 (December 2012) widens the pool from 0 to 65535 to 0 to 4294967295; the base BGP spec used a two-octet field; AS_TRANS is 23456 for old speakers [S84]. Use.
- **Private ASNs, RFC 6996 (July 2013).** 64512 to 65534 and 4200000000 to 4294967294. Private ASNs must be removed from the AS_PATH before routes go to the global Internet. They are not globally unique [S85]. Use.
- **Documentation ASNs, RFC 5398 (December 2008).** 64496 to 64511 (16 numbers) and 65536 to 65551 (16 numbers), reserved so examples do not clash with real networks [S86]. Use. Care: documentation and private ranges are different; the IANA registry lists both, plus reserved 0, 65535 and 4294967295 [S87].
- **Allocation.** IANA gives AS numbers to the five RIRs (AFRINIC, APNIC, ARIN, LACNIC, RIPE NCC), which assign them to operators; 16-bit and 32-bit numbers sit in separate registries (page updated 2026-06-01) [S87]. The NRO page names the five RIRs and their regions and says the NRO was set up in 2003 to coordinate them [S88]. Use. Same RIRs as the IPv4 exhaustion story in the dossier [S13 to S16].
- **A real example for exercises.** AS3333 is held by RIPE NCC; its block 3154 to 3353 is "assigned by RIPE NCC" per the IANA 16-bit registry (live RIPEstat call, today) [S94]. Use as a safe, stable teaching ASN. Care: live data; re-run before publish.

### 1.2 BGP basics (RFC 4271, January 2006) [S83]
- **Transport.** "BGP listens on TCP port 179" (Section 3). Use. Message types: OPEN 1, UPDATE 2, NOTIFICATION 3, KEEPALIVE 4 (Section 4.1).
- **Announce and withdraw.** One UPDATE can advertise feasible routes that share path attributes and withdraw routes that are no longer feasible (Section 4.3). A route can also be withdrawn by replacing it or by closing the session (Section 3.1). Use.
- **AS_PATH.** Lists the ASes the routing information has passed through (Section 5.1.2). When a speaker advertises to an external peer it prepends its own AS number (Section 5.1.2). Use.
- **Loop prevention.** A route whose AS_PATH contains the local AS is excluded from the decision (Section 9.1.2). Use. This is why a path cannot circle forever.
- **eBGP and iBGP.** External peer: a different AS. Internal peer: the same AS (Section 1.1). A route learned from an iBGP peer is not passed to other iBGP peers unless the speaker is a route reflector (Section 9.2). Use eBGP only for the beginner story. Care: iBGP is not "BGP inside a LAN"; it is BGP between routers of one AS.
- **Best path, beginner level.** Higher degree of preference (operator policy, often LOCAL_PREF) wins first (Sections 5.1.5, 9.1.1). Ties then go in this order: fewest AS numbers in AS_PATH, lowest origin value, lowest MED among routes from the same neighbour AS, eBGP over iBGP, lowest interior cost to the next hop, lowest BGP identifier, lowest peer address (Section 9.1.2.2) [S83]. Use "policy first, then shortest AS_PATH". Care: "shortest path wins" alone is wrong, because policy comes first. Also care: BGP picks a best route per prefix, but forwarding still uses longest prefix match [S30, S105].
- **Timers.** Suggested default HoldTime 90 s, ConnectRetryTime 120 s (Section 10); Hold Time must be 0 or at least 3 s (Section 4.2) [S83]. Use only to explain "why a dead link takes time to notice".
- **Roles for leak prevention (RFC 9234, May 2022).** Roles are Provider, Customer, Peer, Route Server, Route Server Client. A customer may send its own and customer-learned routes to a provider; a provider may send any route to a customer; peers exchange own and customer-learned routes. The OTC attribute marks routes so they are not sent upward or sideways again (Sections 3.1, 5) [S92]. Use for "who may announce what to whom".

### 1.3 Transit, peering, IXPs, "tier 1"
- **Transit and peering as route rules.** The role rules in [S92] are the first-party description of what each side may announce. They do not say who pays. **UNVERIFIED** from a first-party source in this addendum: the money terms "transit = you pay for reach to the whole Internet" and "peering = free swap of own and customer routes". Only partly supported by [S108] ("settlement-free"). The Cloudflare learning pages that define these blocked our fetch (HTTP 403). Writers must label the money part as common usage.
- **IXP.** "A physical and usually neutral location where different networks meet to exchange local traffic via a switch"; it keeps local traffic local, is cheaper than sending it abroad, and shortens routes (Internet Society) [S101]. Use. Care: the page does not say "latency"; it says "shorter routes".
- **PeeringDB as a data source.** The docs name networks, IXPs and facilities as record types and say using it means agreeing to its Acceptable Use Policy [S97]. A keyless GET of `https://www.peeringdb.com/api/net?asn=3333` returned JSON (HTTP 200), as did `/api/ix?name__contains=AMS-IX` and `/api/ixpfx?ix_id=26` [S97]. Use as a read-only exercise source. Care: the docs we read do not state that anonymous API use is allowed or give an anonymous rate limit: **UNVERIFIED**. Example today: AMS-IX is in Amsterdam, with peering LANs 80.249.208.0/21 and 2001:7f8:1::/64, and AS3333 has ports at AMS-IX and NL-ix [S97]. Live data; may change.
- **"Tier 1" is informal.** No authority defines tiers. William Norton's peering book calls it "an overloaded and misused term" and defines it as an ISP that reaches the whole routing table only through settlement-free peering; "Tier 1 Club" is community slang (2014) [S108]. Use as "an informal label; do not treat as a fact about a network". Care: whether a given network is "tier 1" is **UNVERIFIED** and cannot be checked from public data; Cloudflare itself uses the phrase "a Tier 1 provider" in an incident post without defining it [S103].

### 1.4 Looking up an ASN and its prefixes (free, no account)
- **RIPEstat Data API.** Public interface for RIPEstat. URL shape `https://stat.ripe.net/data/<endpoint>/data.json?...`. No stated request limit; registration is suggested above 1,000 requests a day; 8 concurrent requests per IP; add `sourceapp=<name>` for regular use; Terms and Conditions apply [S93]. Use. Care: the page does not say "free"; we only observed keyless success.
- **Calls tested today (no key, HTTP 200)** [S94]: `as-overview?resource=AS3333` (holder RIPE-NCC-AS, announced true); `announced-prefixes?resource=AS3333` (8 prefixes including 193.0.0.0/21 and 2001:67c:2e8::/48; routes seen by fewer than 10 RIS peers are left out); `prefix-overview?resource=193.0.0.1` (resolves to 193.0.0.0/21, origin AS3333); `rpki-validation?resource=AS3333&prefix=193.0.0.0/21` (valid, max length 21, validator routinator); `routing-status` (first seen 2000-10-31, seen by 324 of 324 RIS peers); `whats-my-ip` (returns the caller's IP). Use: a learner finds their IP, then the origin AS of that IP's prefix. Care: behind CGNAT the IP is the provider's [dossier hard constraint 3].
- **bgp.tools and bgp.he.net.** `https://bgp.tools/as/3333` and `https://bgp.he.net/AS3333` both returned HTTP 200 with data and no login (curl, browser user agent) [S95, S96]. bgp.tools says lookups by ASN, prefix, DNS name or MAC are offered, runs under Port 179 Ltd, and puts scripting/API behind paid plans [S95]. Use as "look, do not script". Care: terms of use for automated access are **UNVERIFIED** for both sites.
- **Whois to a registry.** `whois` is a client for RFC 3912 servers and guesses the server unless `-h` is given [S138]. A raw port 43 query to `whois.ripe.net` for AS3333 returned the RPSL object, with a terms notice [S99]. Use.
- **RDAP, the HTTP form.** RFC 9082 (June 2021) defines `/ip/<address>` and `/autnum/<number>` URL patterns [S100]. Keyless GETs worked today at `rdap.db.ripe.net/autnum/3333` and `rdap.arin.net/registry/ip/8.8.8.8`, and `rdap.org/autnum/15169` redirected to ARIN [S99]. Use as the JSON-friendly alternative for the JavaScript runner's recorded samples.
- **IP to ASN with Team Cymru.** Free community service: `whois -h whois.cymru.com " -v <ip>"` or a DNS TXT query under `origin.asn.cymru.com`; fed by BGP data refreshed every 4 hours; not for geolocation; heavy whois use can get an address null routed [S98]. Use. Care: a prefix may have several origin ASes.
- **Traceroute hops to ASNs.** `mtr -z` (`--aslookup`) shows the AS number beside each hop [S110]. `traceroute -A` does AS path lookups in routing registries and prints them after each address [S31]. Use on the host. Care: a hop's IP can belong to the neighbour AS or to an IXP LAN (see [S97] IXP prefixes), so "hop owner = AS" is a guess, not a fact. Source for that caveat: **UNVERIFIED** beyond [S98] ("multiple ASNs are normal") and our reading of [S97].

### 1.5 Route security
- **RPKI (RFC 6480, February 2012).** A PKI that mirrors the allocation hierarchy: IANA at the top, five RIRs below; a ROA says the holder of prefixes authorised one AS to originate them, with an optional maximum length [S89]. Use.
- **ROV (RFC 6811, January 2013).** A route is Valid (a ROA matches prefix length and origin AS), Invalid (a ROA covers the prefix but none matches), or NotFound (no ROA covers it). Origin validation "does not protect against AS-in-the-middle attacks" and gives no path validation [S90]. Use. Care: a leak with the right origin AS is still Valid [S103].
- **Route leak (RFC 7908, June 2016).** "The propagation of routing announcement(s) beyond their intended scope." Six types, among them hairpin turn, lateral ISP-ISP-ISP leak, leak of provider prefixes to a peer, leak of peer prefixes to a provider, prefix re-origination, and accidental leak of internal or more-specific prefixes [S91]. Use the definition and two types at most.
- **MANRS.** Four actions: filtering, anti-spoofing, coordination, global validation (IRR or RPKI). Participants must do filtering, coordination and validation [S109]. Use in one box.
- **RPKI in practice, one data point.** A ROA for 193.0.0.0/21 with origin AS3333 validates as Valid today [S94]. Cloudflare says RPKI "reached a major milestone at 50% deployment" in July 2024 [S103]. Care: the 50 percent is Cloudflare's wording of signed prefixes; re-check before publish.

### 1.6 Submarine cables
- TeleGeography checked the claim "submarine cables carry over 99% of intercontinental data traffic" and wrote "We can confirm that this is true", but says exact figures need satellite data that does not exist; the only satellite figure is an FCC number, 0.37 percent of US international capacity, from 2013 data released in 2015 (post by Alan Mauldin, 4 May 2023) [S106]. Use: "TeleGeography confirms it, with that caveat". Do not print "99%" without it.
- TeleGeography tracks "more than 600 active and planned submarine cables" as of 2026 [S107]. Use with date. Care: the cable map site itself gave no text figures when fetched; a secondary page quoted 694 systems, not used here.

### 1.7 Tunnels and VPNs
- **A packet inside a packet.** RFC 2003 (October 1996) carries an IP datagram as the payload of another. Encapsulated datagrams are larger; if the inner Don't Fragment bit is set it must be set on the outer packet so Path MTU Discovery works [S120]. Use.
- **IPsec in one line.** RFC 4301 (December 2005) is the security architecture for traffic at the IP layer; tunnel mode wraps a whole IP packet, transport mode protects the payload between two hosts [S121]. Use one line only.
- **WireGuard basics.** All packets go over UDP [S112]; it does not support tunnelling over TCP and does not focus on obfuscation [S115]. Crypto: Noise_IK handshake, Curve25519, ChaCha20Poly1305, BLAKE2s [S112]. Keys are 32-byte Curve25519 points shown as 44 base64 characters [S111]. Use.
- **Cryptokey routing.** Peers are identified by public key and each has a list of allowed IPs; a packet to send goes to the peer whose allowed IPs match the destination [S111]. The man page: AllowedIPs lists addresses "from which incoming traffic for this peer is allowed"; `0.0.0.0/0` matches all IPv4, `::/0` all IPv6; the list also steers outgoing traffic [S117]. Use. Care: the man page never says "cryptokey routing"; the whitepaper does.
- **Port 51820 is a convention.** `ListenPort` unset or 0 means a random port; the quickstart and whitepaper examples use 51820 and 41414 [S117, S113, S111]. Use.
- **Overhead, documented parts.** Data message: type (1 byte), reserved (3), receiver index (4), counter (8), so 16 header bytes, then the inner packet zero-padded to a multiple of 16 plus a 16-byte tag [S112, S111]. Derived arithmetic, not stated in any source: 32 bytes of WireGuard plus 8 UDP plus 20 IPv4 = 60 bytes, or 80 with an IPv6 outer header, which gives 1500 - 80 = 1420. The whitepaper only shows `mtu 1420` in an example listing [S111]. `wg-quick` sets MTU "from the endpoint addresses or the system default route" when `MTU` is not given [S118]. Use the arithmetic as derived.
- **Keepalive and NAT.** `PersistentKeepalive` is off by default; the quickstart suggests 25 seconds; it keeps a NAT or firewall mapping alive [S113, S117]. Ties to NAT mapping timers [S18].
- **Roaming.** The endpoint is updated to the latest source IP and port of an authenticated packet [S117]. Care: the known-limitations page warns an active attacker could swap source addresses during roaming [S115].
- **Namespaces and kernel.** The UDP socket stays in the namespace where the interface was created, even if the interface is moved; the page shows a container whose only interface is WireGuard [S114]. In the Linux kernel since 5.6, released 29 March 2020 (kernelnewbies release page, community source) [S119]. wireguard.com's install page implies it (kernels older than 5.6 need an extra package) [S116]. The default WSL kernel config for branch 6.6.y has `CONFIG_WIREGUARD=m` [S55]. Use.
- **Consumer VPN: what it does.** Sends traffic through an encrypted tunnel to the VPN server, hides it from the ISP and local network, and makes your location look like the server's (EFF, reviewed 28 July 2026) [S123]. Use.
- **Consumer VPN: what it does not do.** "A VPN is not a tool for anonymity"; "whoever runs the service will see your traffic"; logged-in accounts still identify you; providers can be asked by law enforcement; a no-log claim "is not a guarantee"; "Do not use a VPN that you do not trust" [S123]. Use.
- **Leaks.** RFC 7359 (August 2014): a VPN that only handles IPv4 can leave IPv6 traffic going out in the clear on the local network; a local attacker can force IPv6 with forged Router Advertisements and advertise a rogue DNS server [S122]. Use. DNS: `wg-quick` sets DNS servers through `resolvconf` from the `DNS=` line [S118]. Care: a first-party definition of a "DNS leak" (queries leaving the tunnel) was **not fetched**: Mullvad's help page reset our connection and only a search snippet exists [S143]. EFF does not discuss DNS leaks [S123].
- **Site-to-site vs remote access.** AWS: a Site-to-Site VPN joins your network to a VPC over IPsec; each connection has two tunnels; IKEv2 and NAT traversal supported; it "does not support Path MTU Discovery" [S124]. A Client VPN endpoint sends all client traffic through the tunnel by default [S125]. Use as the vendor example; teach the idea, not AWS.
- **Split tunnelling.** With split-tunnel on, the endpoint pushes its routes to the client and only traffic for those networks uses the tunnel; the default overwrites the client's table with `0.0.0.0/0`; adding `0.0.0.0/0` in split mode "may cause connectivity disruption" [S125]. In WireGuard terms it is AllowedIPs: `0.0.0.0/0` sends everything, a narrow list sends only that network; `wg-quick` treats a default route specially with `ip rule` [S117, S118]. Use.

### 1.8 Tools: what the official docs say
- **Wireshark.** Capture filters use libpcap syntax and keep other traffic from being recorded [S126]. Display filters have a different syntax: the wiki warns that `tcp port 80` (capture) is not to be confused with `tcp.port == 80` (display) [S127]. Display filters are typed in the toolbar; `ip.addr==192.168.0.1` and `tcp.port in {80, 443, 8080}` are doc examples [S128]. Follow TCP Stream (Analyze > Follow) shows reassembled data, client to server in red and server to client in blue, and sets a display filter for that stream [S126]. Use. Care: the shortcut key was not on the page.
- **tshark.** "Dump and analyze network traffic." `-r` reads a file, `-f` is a capture filter (libpcap syntax), `-Y` a display filter, `-w` writes, `-i` interface, `-c` count, `-T fields -e` prints chosen fields [S129]. Use.
- **tcpdump.** Prints packets matching a Boolean expression; `-w` writes, `-r` reads, `-n` no name lookup, `-c` count, `-i` interface (`any` for all), `-e` link-level header, `-v` more detail, `-D` list interfaces. Capturing may need privileges; reading a saved file does not. The man page is dated 24 April 2026 (upstream) [S130]. Filters follow pcap-filter: `host`, `net`, `port`, `portrange`, `src`/`dst`, `and`/`or`/`not`, `tcp`/`udp`/`icmp`/`arp` [S131]. Use. Care: Ubuntu ships 4.99.4; check flags against that version.
- **mtr.** Combines traceroute and ping. `-r` report, `-c` cycles (one second each), `-n` no DNS, `-z` ASN per hop, `-b` names and IPs, `-T` TCP, `-u` UDP, `-P` port. BUGS: some routers give lower priority to ICMP echo, so reported loss can look worse than real [S110]. Use. Care: the page we read is Debian bookworm's mtr 0.95, the same upstream version as Ubuntu 24.04 (0.95-1.1) [S110, S140].
- **dig.** "A flexible tool for interrogating DNS name servers." `+short` toggles a terse answer; `+trace` follows delegation from the root with iterative queries; `@server` picks the server; `-x` reverse lookup; `-4`/`-6`; `+noall +answer` prints only answers [S132]. Use. Care: dossier 5.6 found `dig +trace` fails inside the lab container on Docker Desktop; run it on the host or use a recorded trace.
- **nmap.** Scans the 1,000 most common ports by default; `-F` 100; `-p-` all ports. States: open, closed, filtered, unfiltered, open|filtered, closed|filtered [S134, S135]. Use.
- **nmap law and ethics.** Legality "does not have a simple answer" and depends on place; get written permission first; scanning is not clearly illegal in the US federal sense but state and other laws differ; the most common outcome is an ISP complaint; `scanme.nmap.org` may be scanned with Nmap only, no exploits or DoS, about a dozen scans a day [S133]. Use as the module's rule. Care: the author is not a lawyer and says so.
- **iperf3.** Active measurement of maximum achievable bandwidth; from-scratch rewrite, not compatible with iperf2; ESnet and Lawrence Berkeley National Laboratory; BSD licence [S136]. `-s` server, `-c` client, `-p` port (default 5201), `-u` UDP, `-R` reverse, `-t` seconds (default 10), `-P` parallel streams, `-1` one client then exit [S137]. Use. Care: TCP as default is implied, not stated.
- **whois.** Client for the whois directory service (RFC 3912); `-h` picks a server; `-H` hides legal text [S138].

### 1.9 Ubuntu 24.04 (noble) packages
Versions from Launchpad (latest Published pocket, amd64) [S140]. Sizes measured in an `ubuntu:24.04` container (24.04.5 LTS) with `apt-cache` and `apt-get install -s --no-install-recommends` on 2026-10-27 [S141]. "Closure" is every package apt would add on top of that base image; it can include a small upgrade of a base package, so treat it as plus or minus a few percent. The own-.deb size is for the Release pocket build.

| Package | Version | Component | Own .deb | Installed (own) | Closure: packages, download, installed |
|---|---|---|---|---|---|
| wireshark | 4.2.2-1.1build3 | universe | 4.4 MiB | 10.2 MiB | 229, 142.2 MiB, 564.4 MiB |
| tshark | 4.2.2-1.1build3 | universe | 154 KiB | 0.4 MiB | 45, 40.5 MiB, 180.5 MiB |
| tcpdump | 4.99.4-3ubuntu4.24.04.1 | main | 468 KiB | 1.3 MiB | 7, 1.2 MiB, 3.5 MiB |
| mtr-tiny | 0.95-1.1ubuntu0.1 | main | 53 KiB | 0.15 MiB | 3, 0.2 MiB, 0.6 MiB |
| mtr (GTK build) | 0.95-1.1ubuntu0.1 | universe | 70 KiB | 0.2 MiB | 108, 35.7 MiB, 149.4 MiB |
| bind9-dnsutils (dig) | 1:9.18.39-0ubuntu0.24.04.8 | main | 152 KiB | 0.5 MiB | 17, 13.5 MiB, 44.1 MiB |
| nmap | 7.94+git20230807.3be01efb1+dfsg-3build2 | universe | 1.6 MiB | 4.0 MiB | 12, 6.9 MiB, 28.9 MiB |
| iperf3 | 3.16-1build2 | universe | 19 KB | 0.1 MiB | 4, 0.2 MiB, 0.8 MiB |
| whois | 5.5.22 | main | 50 KiB | 0.3 MiB | 1, 0.05 MiB, 0.3 MiB |
| traceroute | 1:2.1.5-1 | universe | 59 KiB | 0.15 MiB | 1, 0.1 MiB, 0.2 MiB |
| wireguard-tools | 1.0.20210914-1ubuntu4 | main | 87 KiB | 0.3 MiB | 1, 0.1 MiB, 0.3 MiB |
| wireguard (meta) | 1.0.20210914-1ubuntu4 | universe | 3 KiB | 15 KiB | 2, 0.1 MiB, 0.3 MiB |
| frr | 8.4.4-1.1ubuntu6.7 | main | 4.1 MiB | 19.9 MiB | 36, 14.0 MiB, 50.4 MiB |
| bird2 | 2.14-1build2 | universe | 487 KiB | 1.3 MiB | 11, 1.6 MiB, 5.0 MiB |

- The surprise: plain `mtr` pulls in a graphical stack (108 packages); `mtr-tiny` (main) has the same `-r`, `-z` and `-n` flags in 3 packages. Teach `mtr-tiny`. `-z` was read on the mtr-tiny page [S110].
- Components: tcpdump, dig, whois, mtr-tiny, wireguard-tools, frr are main; wireshark, tshark, nmap, iperf3, traceroute, bird2 are universe (the official image has universe on, dossier 5.5).
- The Ubuntu wireshark is 4.2.2; the project's own download page lists stable 4.6.9, with Windows x64 and Arm64 installers and a macOS universal dmg, and shows no file sizes [S139]. Host installs will be newer than the container's tshark.
- frr and bird2 are the two BGP daemons; neither was installed or run here. Their documentation was not read: configuration syntax is **UNVERIFIED**.

## 2. Technical landscape

### 2.1 Where each activity can run
| Activity | Needs | Where | Evidence |
|---|---|---|---|
| Look up ASN, prefixes, RPKI state | HTTPS only | Host browser or `curl`, or recorded JSON in the runner | [S94, S97, S99] |
| ASN per hop on the real path | ICMP or UDP out to the real Internet | Host (`mtr -rz`, `tracert`), not the lab container | [S110, dossier 5.5] |
| Two-AS BGP lab | Namespaces, forwarding, FRR or BIRD | Lab container, private ASNs 64512+ or documentation ASNs | Packages [S141]; lab not run |
| WireGuard lab | Kernel WireGuard, namespaces | Lab container with `--privileged` | [S114, S142] |
| Packet capture | tcpdump or tshark, root to capture | Lab container; read files anywhere | [S130] |
| Wireshark GUI | Desktop | Host | [S139, S141] |
| nmap, iperf3 | Own lab only | Lab container | [S133, S137] |

### 2.2 Environment test, 2026-10-27 (research agent)
Same host as dossier 5.5: Docker Desktop for Windows, VM kernel `6.6.87.2-microsoft-standard-WSL2`, `ubuntu:24.04`, `--privileged`, packages `iproute2 wireguard-tools iputils-ping tcpdump`, no kernel module step [S142].

| Check | Result |
|---|---|
| `ip link add wg0 type wireguard` in two namespaces joined by a veth (203.0.113.1 and .2), listen port 51820, one peer each, allowed IPs the peer's /32 | Works. `wg show` reports a handshake and counters. |
| Default `wg0` MTU | 1420 (matches the whitepaper's example and the 1500 - 80 arithmetic) |
| `ping` across the tunnel (10.9.0.1 to 10.9.0.2) | 2 sent, 2 received |
| `tcpdump -e` on the veth for `udp port 51820`, `ping -s 100` | Inner IP packet 128 bytes; UDP payload 160 bytes (128 + 16 header + 16 tag); Ethernet frame 202 bytes. This confirms 32 bytes of WireGuard overhead plus the UDP and IPv4 headers (14 + 20 + 8). |
| Not tested | WireGuard on macOS Docker Desktop or WSL 2 without Docker; FRR or BIRD; Wireshark GUI; real VPN to a remote server |

## 3. Production failure modes and real incidents

| Incident | Source | Facts safe to use | Anchors |
|---|---|---|---|
| YouTube hijack, 24 Feb 2008 | [S105] | RIPE NCC case study. YouTube (AS36561) announced 208.65.152.0/22; Pakistan Telecom (AS17557) announced the more specific 208.65.153.0/24 from 18:47 UTC and PCCW Global (AS3491) passed it on. YouTube answered with its own /24 and two /25s. PCCW withdrew the route at 21:01 UTC, about 2 h 14 min after it began (our subtraction). "Because of the longest prefix match rule" routers sent traffic to the more specific route. RIS only shows what it collects, so the reach of the hijack is unknown | Longest prefix match in the dossier, now at Internet scale; hijack vs leak |
| Verizon and DQE route leak, 24 Jun 2019 | [S102] | Around 10:30 UTC. DQE (AS33154) used a BGP optimizer that split prefixes into more specific ones, e.g. 104.20.0.0/20 into two /21s; customer Allegheny (AS396531) passed them to Verizon (AS701), which did not filter them. Cloudflare saw about 15 percent global traffic loss at worst. The post says ROV would have dropped the more-specifics (Cloudflare's prefixes were signed to max length 20), and names IRR filtering and prefix limits. No end time given | Leak, filtering, RPKI max length |
| Facebook, 4 Oct 2021 | [S48] (re-read today) | A command meant to assess backbone capacity took down all backbone links; a bug in the audit tool let it run. DNS servers withdraw their BGP advertisements when they cannot reach the data centres, so the DNS servers became unreachable though running. Internal tools and remote access also failed; engineers went on site. No duration given | BGP withdraw means "the address vanishes" |
| Cloudflare 1.1.1.1, 27 Jun 2024 | [S103] | AS267613 began announcing 1.1.1.1/32 at 18:51 UTC; resolved by 22:16 UTC. A separate leak of 1.1.1.0/24 by AS262504, spread by AS1031, ended 02:28 UTC on 28 Jun. The /32 was RPKI Invalid; the leaked /24 was Valid because the origin was right, so path validation (ASPA) was needed. Users in over 300 networks in 70 countries saw problems | ROV helps with hijacks, not leaks |
| Cloudflare 1.1.1.1, 14 Jul 2025 | [S50] | Already in the dossier; a hijack of 1.1.1.0/24 seen at the same time did not cause it | Do not mix up with the June 2024 event |
| VPN IPv6 leak | [S122] | An IPv4-only VPN client leaves IPv6 traffic on the local network in the clear; forged Router Advertisements can force it | VPN limits |
| Tunnel MTU black hole | [S120, S124] | Larger encapsulated packets; PMTUD must work; AWS Site-to-Site VPN does not support PMTUD. A real outage write-up for an MTU black hole was **not found**: use as a lab fault, labelled hypothetical | MTU lab |
| Unauthorised scanning | [S133] | ISP complaints and account termination are the common outcome; civil and criminal cases are rare but possible | nmap rules |

Teaching note: the dossier already uses the Facebook and Cloudflare incidents only to show DNS depends on routing. For the new module, YouTube 2008 and Verizon 2019 are the cleanest pair: one hijack (wrong origin, more specific), one leak (right origin, wrong scope).

## 4. What not to teach

- **BGP configuration**, route maps, communities, route reflectors, confederations. Name them at most. Keep to announce, withdraw, AS_PATH, loop check, "policy then shortest path".
- **"Tier 1" ranks or lists of networks.** Informal and unverifiable [S108].
- **Peering and transit money, as fact.** Only the route rules are sourced [S92].
- **ASPA, BGPsec, IRR internals.** One mention that ROV does not stop leaks [S90, S103].
- **IPsec internals (IKE, ESP, SA).** One line [S121].
- **VPN product comparisons, "best VPN", no-log ratings.** EFF says it cannot vouch for any [S123].
- **Anonymity claims.** A VPN is not anonymity [S123]; WireGuard docs do not claim it [S112, S115].
- **Exact "99%" cable share without the caveat** [S106].
- **Advanced Wireshark** (dissector writing, decryption, expert info) and nmap scripting or evasion flags.
- **Scanning any target but the learner's own lab.** Even `scanme.nmap.org` only with the stated limits [S133].

## 5. Source table

All checked 2026-10-27. Types: standard, first-party, secondary, test. Confidence H, M, L.

| ID | What it supports | URL | type | checked | confidence |
|---|---|---|---|---|---|
| S83 | BGP-4: port 179, UPDATE, AS_PATH, loop rule, tie-break order, eBGP/iBGP, timers (Jan 2006); read in two parts (chars 0 to 200000) | https://www.rfc-editor.org/rfc/rfc4271.txt | standard | 2026-10-27 | H (last ~22k chars unread) |
| S84 | 4-octet AS numbers, AS_TRANS 23456, range 0 to 4294967295 (Dec 2012) | https://www.rfc-editor.org/rfc/rfc6793.txt | standard | 2026-10-27 | H |
| S85 | Private ASN ranges, removal from AS_PATH (Jul 2013) | https://www.rfc-editor.org/rfc/rfc6996.txt | standard | 2026-10-27 | H |
| S86 | Documentation ASNs 64496-64511, 65536-65551 (Dec 2008) | https://www.rfc-editor.org/rfc/rfc5398.txt | standard | 2026-10-27 | H |
| S87 | IANA AS registry: allocation to five RIRs, reserved and special rows (updated 2026-06-01) | https://www.iana.org/assignments/as-numbers/as-numbers.xhtml | first-party | 2026-10-27 | H |
| S88 | Five RIRs, regions, NRO founded 2003 | https://www.nro.net/about/rirs/ | first-party | 2026-10-27 | H |
| S89 | RPKI architecture, ROA, IANA and RIR hierarchy (Feb 2012) | https://www.rfc-editor.org/rfc/rfc6480.txt | standard | 2026-10-27 | H |
| S90 | ROV states Valid, Invalid, NotFound; no path validation (Jan 2013) | https://www.rfc-editor.org/rfc/rfc6811.txt | standard | 2026-10-27 | H |
| S91 | Route leak definition and six types (Jun 2016) | https://www.rfc-editor.org/rfc/rfc7908.txt | standard | 2026-10-27 | H |
| S92 | BGP roles and OTC attribute; propagation rules (May 2022) | https://www.rfc-editor.org/rfc/rfc9234.txt | standard | 2026-10-27 | H |
| S93 | RIPEstat Data API: URL shape, limits, sourceapp, data calls list | https://stat.ripe.net/docs/02.data-api/ | first-party | 2026-10-27 | H |
| S94 | Live RIPEstat calls for AS3333 and 193.0.0.0/21, no key | https://stat.ripe.net/data/as-overview/data.json?resource=AS3333 (and announced-prefixes, prefix-overview, rpki-validation, routing-status, whats-my-ip) | test | 2026-10-27 | H (live data) |
| S95 | bgp.tools: lookups, free vs paid, publisher; `/as/3333` returned 200 without login | https://bgp.tools/ | first-party | 2026-10-27 | M (terms not stated) |
| S96 | Hurricane Electric BGP Toolkit; `/AS3333` returned 200 without login | https://bgp.he.net/ | first-party | 2026-10-27 | M (terms not read) |
| S97 | PeeringDB docs (record types, AUP) and keyless API responses for net, ix, ixpfx, netixlan | https://docs.peeringdb.com/ and https://www.peeringdb.com/api/net?asn=3333 | first-party + test | 2026-10-27 | M (anon policy not stated) |
| S98 | Team Cymru IP to ASN: whois, DNS, free, limits | https://www.team-cymru.com/ip-asn-mapping | first-party | 2026-10-27 | H |
| S99 | Live whois port 43 (whois.ripe.net) and RDAP (rdap.db.ripe.net, rdap.arin.net, rdap.org) with no account | whois.ripe.net:43; https://rdap.db.ripe.net/autnum/3333 | test | 2026-10-27 | H (live data) |
| S100 | RDAP URL patterns `/ip` and `/autnum` (Jun 2021) | https://www.rfc-editor.org/rfc/rfc9082.txt | standard | 2026-10-27 | H |
| S101 | IXP definition and benefits | https://www.internetsociety.org/issues/ixps/ | first-party | 2026-10-27 | M (advocacy org) |
| S102 | Verizon, DQE, Allegheny leak 24 Jun 2019 | https://blog.cloudflare.com/how-verizon-and-a-bgp-optimizer-knocked-large-parts-of-the-internet-offline-today/ | first-party | 2026-10-27 | H |
| S103 | Cloudflare 1.1.1.1 hijack and leak 27 Jun 2024; RPKI 50 percent | https://blog.cloudflare.com/cloudflare-1111-incident-on-june-27-2024/ | first-party | 2026-10-27 | H |
| S105 | YouTube hijack 24 Feb 2008, timeline, longest prefix match | https://www.ripe.net/about-us/news/youtube-hijacking-a-ripe-ncc-ris-case-study/ | first-party | 2026-10-27 | H |
| S106 | "Over 99%" cable claim confirmed with caveats (4 May 2023) | https://resources.telegeography.com/2023-mythbusting-part-3 | first-party | 2026-10-27 | H |
| S107 | More than 600 active and planned cables, 2026; satellite 0.37% of US international capacity | https://www2.telegeography.com/submarine-cable-faqs-frequently-asked-questions | first-party | 2026-10-27 | H |
| S108 | Tier 1 definition; "overloaded and misused"; Tier 1 Club (Norton, 2014) | https://drpeering.net/tools/HTML_IPP/chapters/ch09-1-Tier-1-ISP/ch09-1-Tier-1-ISP.html | secondary | 2026-10-27 | M |
| S109 | MANRS four actions for operators | https://www.manrs.org/netops/guide/ | first-party | 2026-10-27 | M (first 100k chars read) |
| S110 | mtr: `-r -c -n -z -b -T -u -P`; ICMP priority caveat (Debian bookworm mtr-tiny page) | https://manpages.debian.org/bookworm/mtr-tiny/mtr.8.en.html | first-party | 2026-10-27 | M (Debian, not Ubuntu page) |
| S111 | WireGuard whitepaper: cryptokey routing, 32-byte keys, packet flow, MTU 1420 example (draft dated 1 Jun 2020, read via local pdftotext) | https://www.wireguard.com/papers/wireguard.pdf | first-party | 2026-10-27 | H |
| S112 | WireGuard protocol: Noise_IK, primitives, UDP, data message layout, padding, tag | https://www.wireguard.com/protocol/ | first-party | 2026-10-27 | H |
| S113 | WireGuard quickstart: commands, `listen-port 51820`, keepalive 25 s | https://www.wireguard.com/quickstart/ | first-party | 2026-10-27 | H |
| S114 | WireGuard and network namespaces: socket stays in birth namespace | https://www.wireguard.com/netns/ | first-party | 2026-10-27 | H |
| S115 | WireGuard known limitations (no TCP, no obfuscation, roaming, not post-quantum) | https://www.wireguard.com/known-limitations/ | first-party | 2026-10-27 | H |
| S116 | WireGuard install page: `wireguard`, `wireguard-linux-compat`, kernel older than 5.6 note | https://www.wireguard.com/install/ | first-party | 2026-10-27 | M (5.6 only implied) |
| S117 | `wg(8)`: AllowedIPs, ListenPort random if unset, PersistentKeepalive, Endpoint update | https://man7.org/linux/man-pages/man8/wg.8.html | first-party | 2026-10-27 | H |
| S118 | `wg-quick(8)`: MTU auto, DNS via resolvconf, Table, default-route handling | https://man7.org/linux/man-pages/man8/wg-quick.8.html | first-party | 2026-10-27 | H |
| S119 | Linux 5.6 released 29 Mar 2020, adds WireGuard | https://kernelnewbies.org/Linux_5.6 | secondary | 2026-10-27 | M (community site) |
| S120 | IP-in-IP encapsulation, larger packets, DF and PMTUD (Oct 1996) | https://www.rfc-editor.org/rfc/rfc2003.txt | standard | 2026-10-27 | H |
| S121 | IPsec architecture, tunnel vs transport mode (Dec 2005; first 100k chars) | https://www.rfc-editor.org/rfc/rfc4301.txt | standard | 2026-10-27 | H |
| S122 | VPN tunnel leakage in dual-stack hosts (Aug 2014) | https://www.rfc-editor.org/rfc/rfc7359.txt | standard | 2026-10-27 | H |
| S123 | EFF: what a VPN does and does not do (reviewed 28 Jul 2026) | https://ssd.eff.org/module/choosing-vpn-thats-right-you | first-party | 2026-10-27 | H |
| S124 | AWS Site-to-Site VPN: IPsec, two tunnels, IKEv2, no PMTUD | https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html | first-party | 2026-10-27 | H |
| S125 | AWS Client VPN split-tunnel behaviour | https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/split-tunnel-vpn.html | first-party | 2026-10-27 | H |
| S126 | Wireshark guide: capture filters (libpcap), Follow TCP Stream, opening saved files | https://www.wireshark.org/docs/wsug_html_chunked/ChCapCaptureFilterSection.html and ChAdvFollowStreamSection.html | first-party | 2026-10-27 | H |
| S127 | Wireshark wiki: capture vs display filter syntax warning | https://wiki.wireshark.org/DisplayFilters | first-party | 2026-10-27 | H |
| S128 | Wireshark guide: building display filters, operators, examples | https://www.wireshark.org/docs/wsug_html_chunked/ChWorkBuildDisplayFilterSection.html | first-party | 2026-10-27 | H |
| S129 | tshark man page: `-r -f -Y -w -i -c -T fields -e` (first 100k chars) | https://www.wireshark.org/docs/man-pages/tshark.html | first-party | 2026-10-27 | H |
| S130 | tcpdump man page: options, privileges, examples (page dated 24 Apr 2026) | https://man7.org/linux/man-pages/man1/tcpdump.1.html | first-party | 2026-10-27 | H |
| S131 | pcap-filter syntax | https://man7.org/linux/man-pages/man7/pcap-filter.7.html | first-party | 2026-10-27 | H |
| S132 | BIND 9 manual: dig options (first 100k chars; no BIND version on page) | https://bind9.readthedocs.io/en/latest/manpages.html | first-party | 2026-10-27 | H |
| S133 | Nmap legal issues: permission, risks, scanme.nmap.org terms | https://nmap.org/book/legal-issues.html | first-party | 2026-10-27 | H |
| S134 | Nmap manual: description and six port states | https://nmap.org/book/man.html | first-party | 2026-10-27 | H |
| S135 | Nmap port specification: default 1,000 ports, `-F`, `-p-` | https://nmap.org/book/man-port-specification.html | first-party | 2026-10-27 | H |
| S136 | iperf3 home: purpose, rewrite, ESnet and LBNL, BSD | https://software.es.net/iperf/ | first-party | 2026-10-27 | H |
| S137 | iperf3 invoking: `-s -c -p -u -R -t -P -1`, port 5201 | https://software.es.net/iperf/invoking.html | first-party | 2026-10-27 | H |
| S138 | whois man page: RFC 3912 client, `-h`, `-H` (Debian bookworm) | https://manpages.debian.org/bookworm/whois/whois.1.en.html | first-party | 2026-10-27 | M (Debian page) |
| S139 | Wireshark download page: stable 4.6.9, installers, no sizes | https://www.wireshark.org/download.html | first-party | 2026-10-27 | H |
| S140 | Ubuntu noble package versions and components (Launchpad API, same query as dossier S41, plus apt policy in the container; bird2 from apt, Release pocket) | https://api.launchpad.net/devel/ubuntu/+archive/primary?ws.op=getPublishedBinaries&binary_name=<pkg>&exact_match=true&distro_arch_series=https://api.launchpad.net/devel/ubuntu/noble/amd64&status=Published | first-party | 2026-10-27 | H |
| S141 | Package and closure sizes from `apt-cache` and `apt-get -s` in `ubuntu:24.04` (24.04.5) | local test, archive.ubuntu.com noble, noble-updates, noble-security | test | 2026-10-27 | M (a base-package upgrade can inflate closures slightly) |
| S142 | WireGuard two-namespace test on Docker Desktop, kernel 6.6.87.2, `--privileged` | local test (scripts in the research scratch folder) | test | 2026-10-27 | H for this host only |
| S143 | Mullvad DNS leaks help page: fetch failed (connection reset); only a search snippet | https://mullvad.net/en/help/dns-leaks | first-party | 2026-10-27 | L (snippet only, not used as fact) |
| S144 | 80,111 unique AS numbers in the BGP table, 67,416 origin only, 721 transit only, 11,974 mixed (report updated 27 Oct 2026 14:00) | https://bgp.potaroo.net/as6447/ | first-party measurement | 2026-10-27 | H |
| S145 | A customer pays its provider; peers exchange their customers' traffic free of charge; routing via a peer or provider is never preferable to a customer link; export rules (no transit for providers or peers); local preference applied before AS path length; guidelines conform to conventional ISP practice (Gao and Rexford, IEEE/ACM ToN 9(6), Dec 2001) | https://www.cs.princeton.edu/~jrex/papers/sigmetrics00.long.pdf | peer-reviewed | 2026-10-27 | H |
| S146 | Wireshark 4.6.9 installer download sizes by HTTP Content-Length: Windows x64 `.exe` 97,931,232 bytes (about 93 MiB); macOS `.dmg` 147,277,050 bytes (about 140 MiB) | https://2.na.dl.wireshark.org/win64/Wireshark-4.6.9-x64.exe and https://2.na.dl.wireshark.org/osx/Wireshark%204.6.9.dmg | measurement | 2026-10-27 | H |
| S147 | curl manual `-w` variables: time_namelookup (start until name resolving completed), time_connect (until TCP connect completed), time_appconnect (until the TLS or other handshake completed), time_pretransfer, time_starttransfer (until the first byte was received; includes the time the server needed), time_total, remote_ip, http_code; all times in seconds from the start | https://curl.se/docs/manpage.html | first-party | 2026-10-27 | H |
| S148 | A real public traceroute: RIPE Atlas measurement 18399116, probe 6307 (anchor nl-ams-as3333-3, from 193.0.0.164) to 104.238.161.230 (anchor jp-tyo-as20473), 2026-08-27 13:18:27 UTC, 19 hops (raw JSON saved in the work packet) | https://atlas.ripe.net/api/v2/measurements/18399116/latest/?probe_ids=6307 | first-party measurement | 2026-10-27 | H |
| S149 | RIPEstat prefix-overview for the S148 hops: 193.0.0.0/21 AS3333; 80.249.209.139 not announced; 91.128.0.0/14 AS1257 Tele2 Sverige; 62.115.0.0/16 AS1299 Arelion; 45.76.192.0/19 and 104.238.160.0/23 AS20473 The Constant Company | https://stat.ripe.net/data/prefix-overview/data.json?resource=62.115.171.212 (one call per hop) | first-party | 2026-10-27 | H |
| S150 | PeeringDB: prefix 80.249.208.0/21 is the peering LAN (ixlan 26) of AMS-IX, Amsterdam | https://www.peeringdb.com/api/ixpfx?prefix__startswith=80.249.208 | first-party | 2026-10-27 | H |
| S151 | Linux `icmp_ratelimit`: limits the rate of sending ICMP packets of the types in `icmp_ratemask` to specific targets; 0 disables limiting, otherwise the minimal space between responses in milliseconds; default 1000 | https://docs.kernel.org/networking/ip-sysctl.html | first-party | 2026-10-27 | H |
| S152 | `tc(8)`: "Shaping occurs on egress"; `tc-netem(8)` examples delay, lose or rate-limit "outgoing packets on device" | https://man7.org/linux/man-pages/man8/tc.8.html and https://man7.org/linux/man-pages/man8/tc-netem.8.html | first-party | 2026-10-27 | H |
| S153 | `tcpdump -U` / `--packet-buffered`: with `-w`, each packet is written to the file as it is saved, not only when the buffer fills | https://man7.org/linux/man-pages/man1/tcpdump.1.html | first-party | 2026-10-27 | H |

Reused from the dossier and re-read today: [S31] traceroute `-A` wording, [S48] Facebook post, [S68] RFC 1930, [S55] WSL kernel config (`CONFIG_WIREGUARD=m`, line 2522). The submarinecablemap.com page returned no usable text and is not cited. packages.ubuntu.com returned HTTP 500 and was replaced by Launchpad plus apt. `docs.ripe.net` did not resolve; the RIPE database was tested directly instead [S99]. Cloudflare Learning Center pages returned HTTP 403.

Claims kept **UNVERIFIED**: money terms for transit and peering; whether a named network is "tier 1"; PeeringDB anonymous API policy and rate limit; bgp.tools and bgp.he.net automation terms; hop IP to AS ownership caveats beyond [S98]; a first-party definition of "DNS leak"; Ubuntu 24.04 kernel WireGuard support (only the Docker VM kernel was tested); FRR and BIRD configuration and docs; an MTU black-hole incident write-up; 5-tuple (dossier).

## 6. Open questions

1. **Lookup default.** RIPEstat is documented and keyless; bgp.tools and bgp.he.net are friendlier pages but have no stated terms. Use RIPEstat in code samples and the others for "click and look"?
2. **BGP lab.** Build a two-AS lab with FRR (main, 36 packages, 50 MiB) or BIRD (universe, 11 packages, 5 MiB)? BIRD is 10 times smaller; neither was run.
3. **Wireshark on phones and laptops.** The GUI is 142 MiB of packages on Ubuntu and needs a desktop. Is "capture with tcpdump in the lab, open the file in Wireshark on the host" acceptable, with a recorded walkthrough for phone-only learners?
4. **VPN scope.** Teach the consumer idea (trust shifts from ISP to provider) plus a WireGuard lab, and leave company VPN design to one box? Confirm with the instructor.
5. **DNS leak.** Fetch a first-party page (Mullvad, Proton or IVPN) later, or build the lab fault ourselves: a client keeps its old resolver after the tunnel is up, then show it in `tcpdump`?
6. **Re-check before publish:** RIPEstat and PeeringDB sample values, Cloudflare's 50 percent RPKI figure, TeleGeography's cable count, package versions [S140], Wireshark's stable version [S139].
7. **Incident wording.** Times in [S102], [S103] and [S105] come from the posts; a reviewer should approve any minute-level figure before it enters a lesson.
