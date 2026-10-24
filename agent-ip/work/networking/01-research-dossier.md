---
artifact: research-dossier
course: networking
version: 1
status: draft
owner: research
sources_checked: 2026-10-24
hard_constraints:
  - Network namespaces need a Linux kernel; Windows and macOS learners only get one inside a VM, so the Build path is a Linux VM that is itself behind a NAT, and macOS has no `ip` command
  - The code runner is JavaScript only, so code exercises model addressing and routing logic and never touch a real network; real packets live in the Build chapters and in interactive labs
  - "Your public IP" is often not yours: mobile and many fixed networks use carrier-grade NAT, and about half of Google users now reach Google over IPv6, so every lesson needs a dual-stack and CGNAT caveat
  - Fictional "public" addresses must come from the three documentation blocks, which are not routable on the real Internet, so the capstone cannot talk to a real server and needs a simulated internet inside the Linux machine
  - Phones, metered data and modest laptops; every image and package must be sized, pinned and shipped once, and root access (sudo or --privileged) is required for the Build chapters
out_of_scope:
  - OSI model memorisation, Wi-Fi radio, cabling, VLAN trunking, spanning tree, OSPF and BGP configuration
  - TLS and HTTP versions (system design course), firewall design beyond NAT and port forwarding
  - Writing a TCP stack, certification prep, vendor router CLIs
  - IPv6 transition mechanisms (NAT64, 464XLAT, 6rd) beyond a one-paragraph mention
open_questions:
  - Does the pinned image run the full capstone on Docker Desktop for macOS? (Windows passed with --privileged on 2026-10-24, section 5.5)
  - Is a narrower --cap-add list enough? (Not needed for the default; untested)
  - Do we teach IPv6 hands-on or only as a read-only comparison? (IPv6 in namespaces works, section 5.5)
  - Which macOS path for Build chapters (Docker Desktop only, or a Linux VM tool)?
---

# Research dossier: networking

Source IDs in square brackets, for example [S9], point to the source table at the end. Every source was fetched and read on 2026-10-24 unless its row says otherwise. Claims marked **UNVERIFIED** must not appear in learner-facing text as fact. Learner scenarios stay fictional composites. Real products and incidents may be named with sources (brief, "Constraints").

## 1. Learner and context

**Who.** Fellowship fellows and early-career engineers who use the internet daily and can build a small web app. They cannot yet say why a laptop shows `192.168.1.23` while a website sees another address. No networking knowledge is assumed. Many read English as a second language. (Brief)

**Know already.** Basic command line, basic JavaScript, Git and GitHub. Binary numbers are taught in the course. (Brief)

**Device and time.** Many read on phones over weak or metered data with power cuts, so every Learn chapter, lab and quiz must work at 375 px. Build chapters need a laptop with a Linux environment. The core path is about 40 hours at about 12 hours a week. (Brief)

**Leave with.** A public `networking-challenges` repository (scripts, captures, write-ups) and a five-minute demo of a home network built from Linux namespaces. (Brief)

## 2. Domain model

One line each. Definitions are for the glossary; the source ID shows where the fact is anchored.

| Term | Plain definition |
|---|---|
| Interface | A network attachment point on a machine (Wi-Fi card, virtual `eth0`). Has a MAC and zero or more addresses. |
| MAC address | A 48-bit hardware address used on the local link [S22]. |
| IPv4 address | A 32-bit number, written as four bytes [S1]. IPv6 is 128 bits [S2]. |
| Prefix and CIDR | The leading bits that name the network, written `/n`. CIDR replaced fixed classes with any prefix length [S5, S6]. |
| Subnet | A part of a network under one prefix. Subnetting let one network number cover several LANs [S7]. |
| Netmask | A bit mask; AND it with an address to decide "local or via a gateway" [S7]. |
| Broadcast (IPv4) | The all-ones host address of a subnet. Teaching note: derive it from the prefix; do not cite a source for the arithmetic. |
| ARP | Asks on the local link "who has this IPv4 address?" and learns its MAC [S22]. |
| Gateway (default route) | The next-hop router for everything not on the local subnet. `default` means 0/0 [S32]. |
| Route and routing table | A prefix plus a next hop. The router picks the most specific match, the longest prefix [S30]. |
| TTL (IP) | A counter in every packet. Each router decrements it by at least one and drops the packet at zero [S30]. Name is historical; RFC 791 defined it as time [S1]. IPv6 calls it Hop Limit [S2]. |
| ICMP Time Exceeded | The message a router may send when it drops a packet at TTL zero; traceroute uses it [S29, S31]. |
| Port | A 16-bit number that picks a program on a host [S25, S26]. |
| Socket | An address plus a port. A TCP connection is a pair of sockets [S25]. |
| 5-tuple | Protocol, source address, source port, destination address, destination port. **UNVERIFIED as a named term**: [S25] gives the socket pair; no source fetched for "5-tuple". |
| Ephemeral port | A short-lived source port the OS picks. IANA names 49152 to 65535 [S27]; Linux defaults to 32768 to 60999 [S28]. |
| NAT / NAPT | A router rewrites private source addresses and ports to one public address, keeping a table [S17]. |
| NAT mapping | An internal address:port tied to an external address:port [S18]. |
| Mapping timeout | How long an idle mapping lives. UDP must be at least two minutes, five recommended [S18]. |
| CGNAT | NAT run by the provider, using 100.64.0.0/10 on the link to customers [S11, S19]. |
| DHCP and lease | A server hands out an address for a fixed time; the client renews it [S23]. |
| Resolver | Code that asks name servers on behalf of a program [S24]. |
| Authoritative server | A name server that holds the zone data for a name [S24]. |
| DNS TTL | Seconds a record may stay cached. Zero means do not cache [S24]. Not the same thing as IP TTL. |
| AS (autonomous system) | "A connected group of one or more IP prefixes run by one or more network operators" with a single, clearly defined routing policy [S68]. BGP connects them. |

## 3. Hard constraints

1. **Linux is required, and it is always inside a VM or container behind another NAT.** `ip netns` manages named network namespaces [S39]. On Windows, WSL 2 runs a Linux kernel in a lightweight VM whose default network is NAT [S35, S38]. Docker Desktop also runs containers in a Linux VM [S38]. macOS has no `ip`. Design: one pinned image, one setup chapter, a read-along recording for phone-only learners.
2. **JavaScript-only code runner.** Code exercises model the logic (address to number, CIDR maths, longest prefix match, a NAT table). Real packets are only in the Build chapters and in a new lab family. (Brief)
3. **"Your public IP" is unreliable.** About half of Google users reach Google over IPv6 [S33]. In a 2016 study more than 92 percent of cellular networks used CGN [S34]. So a learner's public address may be shared, or may be IPv6. Design: teach "what address does the world see?" as a measurement with caveats, and show both families.
4. **No real public addresses in labs.** The three documentation blocks are for documentation and should not appear on the public Internet [S10]; the registry marks them not forwardable and not globally reachable [S9]. Design: the capstone's "internet" is a namespace we build, numbered from 192.0.2.0/24, 198.51.100.0/24 and 203.0.113.0/24. Whether the Linux kernel accepts these on local interfaces needs a test.
5. **Cost, size and privilege.** Containers are unprivileged by default and `ip link add` fails without `NET_ADMIN` [S37]. Docker Desktop on Windows lists 8 GB RAM as a requirement [S57]. Every download must be sized and pinned; see section 5.

## 4. Facts to verify, each with a primary source

Writers may use the "Use" lines. "Care" lines are traps found while reading.

### 4.1 Address sizes and formats
- **IPv4 is 32 bits.** "Addresses are fixed length of four octets (32 bits)." [S1] Use.
- **IPv6 is 128 bits** and grows the address from 32 bits [S2]. Use.
- **IPv6 interface IDs are 64 bits** for global unicast addresses not starting with 000, so a normal LAN prefix is /64 [S3]. Use. Care: the RFC says "64-bit interface ID", and "/64 subnet" is the practical reading; say so.
- **IPv6 text form (RFC 5952).** Drop leading zeros, compress the longest zero run with `::` (never a single field), lowercase hex [S4]. Use.
- **IPv6 specials.** `::1` loopback, `::` unspecified, `fe80::/10` link-local, never forwarded off the link [S3]. Use.

### 4.2 Classes, CIDR, subnetting, private space
- **RFC 791 defines classes A, B and C** by leading bits: A starts `0`, B `10`, C `110` [S1]. The ranges (0 to 127, 128 to 191, 192 to 223) follow from the bits; this is derived arithmetic. Class D and E: 240.0.0.0/4 is "reserved" per the registry (RFC 1112) [S9]; **224/4 as Class D is UNVERIFIED** (RFC 1112 not fetched).
- **Class sizes.** 128 class A networks, 16,384 class B networks of 65,536 hosts, 2,097,152 class C networks of 254 hosts [S6]. Use.
- **Why classes were replaced.** The ROAD group named three problems: exhaustion of the Class B space, routing table growth, and eventual exhaustion of the 32-bit space [S5, S6]. Class B was the first to run out because it was the "right size" for a mid-sized organisation (reasoning: 254 hosts too small, 65,536 too big; this reasoning is **UNVERIFIED** as a quote, derive it from the sizes in [S6]). Use.
- **CIDR dates.** RFC 1519 is September 1993 [S5]; RFC 4632 obsoletes it [S6]. Use.
- **Subnetting origin.** RFC 950, August 1985, by Mogul and Postel. One network number can cover several LANs; a host ANDs the mask with the destination to decide local or via gateway [S7]. Use. Care: the RFC allows non-contiguous masks but recommends contiguous ones; teach contiguous only.
- **RFC 1918 private blocks:** 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16. Stated aim: save globally unique space by using private addresses where global uniqueness is not required [S8]. Use. Care: 172.16/12 ends at 172.31.255.255; many learners guess /16.
- **Special-purpose registry** (last updated 2025-10-09) [S9]:

| Block | RFC | Forwardable | Globally reachable |
|---|---|---|---|
| 0.0.0.0/8 | 791 | no | no |
| 10/8, 172.16/12, 192.168/16 | 1918 | yes | no |
| 100.64.0.0/10 | 6598 | yes | no |
| 127.0.0.0/8 | 1122 | no | no |
| 169.254.0.0/16 | 3927 | no | no |
| 192.0.2.0/24, 198.51.100.0/24, 203.0.113.0/24 | 5737 | no | no |
| 198.18.0.0/15 | 2544 | yes | no |
| 240.0.0.0/4 | 1112 | no | no |
| 255.255.255.255/32 | 8190, 919 | no | no |

- **Link-local 169.254/16.** Hosts self-assign when no DHCP is available; routers must not forward; hosts ARP for everything [S12]. Use as the "DHCP failed" symptom.
- **Shared address space 100.64.0.0/10** is for CGN links on provider networks, with limits that RFC 1918 space does not have [S11]. Use. This is the tell for CGNAT.
- **Documentation ranges.** Confirmed: use 192.0.2.0/24, 198.51.100.0/24, 203.0.113.0/24 for fictional public addresses in text, canvases and quizzes [S10]. Care: that is only 3 x 256 addresses; plan the address budget of each lab.

### 4.3 Exhaustion dates
- **IANA free pool empty, 3 February 2011** (NRO page). IANA gives out /8 blocks, each 1/256 of the space; a 2009 global policy split the last five equally among the five RIRs [S13]. Use.
- **APNIC final /8, 15 April 2011.** [S14] Use.
- **ARIN free pool reached zero, 24 September 2015.** Requests continue via a waiting list or the transfer market [S16]. Use.
- **RIPE NCC ran out, 25 November 2019.** A waiting list gives eligible members a single /24 [S15]. Use. Care: RIPE's earlier "last /8" stage (2012) is **UNVERIFIED**; our fetch of that page failed.
- **Care:** "ran out" means the free pool, not that addresses stopped working. Addresses are traded; CGNAT and NAT cover the gap [S15, S16].

### 4.4 NAT, CGNAT and traversal (overview level)
- **NAT/NAPT.** Basic NAT maps address groups; NAPT translates many addresses and ports into one address [S17]. Need for NAT: internal addresses cannot be used outside the network [S17]. Use.
- **Mapping and timers.** A NAT mapping ties an internal IP:port to an external IP:port [S18]. UDP timer must not expire in under two minutes; five minutes or more recommended [S18]. Use. Care: RFC 4787 says a NAT MUST be endpoint-independent for mapping; real home routers vary, and we have no measurement source. Teach the requirement, not "all routers do this".
- **CGN rules.** Per-subscriber port limits must exist; when a CGN cannot create a mapping it must drop the packet and must not delete existing mappings to make room; freed ports should wait 120 seconds before reuse [S19]. Use. Care: [S19] does not give a TCP idle timeout number.
- **STUN** returns the address and port a peer sees (a "reflexive transport address"), default port 3478 [S20]; **ICE** gathers host, server-reflexive and relayed candidates and tests pairs [S21]. Use at overview level in one box; this is why "my public IP" is even a question for call apps.
- **Inbound fails without a mapping.** Follows from [S17, S18]; AWS documents the same behaviour: a NAT gateway only passes traffic from private instances out [S51]. Use.

### 4.5 Link, host configuration, names, transport
- **ARP (RFC 826, Nov 1982).** Broadcast request carrying sender and target protocol address; the target replies directly; mappings are learned on demand; table aging is left to the implementer [S22]. Use.
- **DHCP (RFC 2131).** DISCOVER, OFFER, REQUEST, ACK; a lease is for a fixed time; client uses UDP port 68, server port 67 [S23]. T1 defaults to 0.5 and T2 to 0.875 of the lease [S23]. Use.
- **DNS.** Resolvers ask on behalf of programs; servers are authoritative for parts of the tree; recursive mode is optional and signalled by RD and RA bits; TTL is a 32-bit number of seconds that limits caching, zero prohibits caching [S24]. Use. Care: RFC 1034 is the concepts RFC; RFC 1035 (formats) was not fetched, so no wire-format claims.
- **UDP (RFC 768)** is a datagram service with no delivery guarantee; 16-bit ports; protocol number 17 [S26]. Use.
- **TCP (RFC 9293).** Three-way handshake SYN, SYN-ACK, ACK; 16-bit ports; "a connection is defined by a pair of sockets" [S25]. Use.
- **Port ranges (RFC 6335).** System 0 to 1023, User 1024 to 49151, Dynamic or ephemeral 49152 to 65535 [S27]. Linux default `ip_local_port_range` is 32768 to 60999 [S28]. Use both; teach that the OS range and the IANA range differ. Also `ip_forward` defaults to 0 and `ip_default_ttl` to 64 [S28]. Use: the router namespace must enable forwarding.

### 4.6 Forwarding and diagnosis
- **TTL decrement.** Each router must decrement TTL by at least one; at zero it must discard the packet and (for unicast) must send ICMP Time Exceeded code 0 [S30]. RFC 792 defines Time Exceeded type 11 [S29]. Use. Care: RFC 792 says the gateway "may" notify; RFC 1812 is the router requirement. Cite RFC 1812.
- **Longest prefix match.** "Routers must use the most specific matching route (the longest matching network prefix)" [S30]. Use. The `ip-route` man page defines `default` as 0/0 and `ip route get` as "equivalent to sending a packet along this path" [S32]. The man page does not use the words "longest prefix match".
- **traceroute (Linux).** Default probes are UDP to ports starting at 33434; `-I` uses ICMP echo; `-T` uses TCP SYN to port 80 by default; TTL starts at 1 and rises; default max 30 hops [S31]. Use.
- **IPv6 hop limit.** A router discards at zero; the RFC text we read does not say an error is sent [S2]. Care: do not claim IPv6 sends Time Exceeded from RFC 8200 alone.

### 4.7 Adoption numbers (fast-moving)
- **IPv6 at Google.** Google's graph exceeded 50 percent of users for the first time, 50.10 percent on 28 March 2026; the earlier near-miss was 49.56 percent on 21 June 2025 [S33]. Source is the Internet Society's Pulse page quoting Google. Google's own statistics page only describes the graph; its current value could not be fetched [S66]. Use with date; **re-check before publish**.
- **CGNAT on mobile.** A study with data from 2014 to 2016: "In cellular networks the use is over 92% in all cases"; 13.3 percent of non-cellular ASes used CGN [S34]. Use as dated evidence only. A current APNIC Labs measurement was not found: **UNVERIFIED for 2026**.

## 5. Technical landscape for the Build chapters

Access date 2026-10-24 unless stated.

### 5.1 Three ways to get Linux

| Path | What we verified | Risk for the capstone |
|---|---|---|
| (a) Linux laptop with sudo | `ip netns` is a standard iproute2 feature [S39]. Needs root (man page silent; practice). | Lowest risk. Distro differences (nft vs iptables, systemd-resolved). |
| (b) WSL 2 on Windows 11 | Default network mode is NAT; the VM has its own address and the Windows host is its default gateway [S35]. Mirrored mode needs Windows 11 22H2 or later and gives IPv6 and LAN access [S35, S36]. Default WSL kernel config (branch `linux-msft-wsl-6.6.y`) has `NF_TABLES`, `NFT_MASQ`, `NFT_NAT`, `NF_NAT`, `VETH`, `NET_NS` built in and `BRIDGE` as a module [S55]. | Which kernel branch ships with a learner's WSL is **UNVERIFIED**. systemd needs `[boot] systemd=true` [S36]. Teaching hook: WSL itself sits behind a NAT [S35]. |
| (c) Docker container on Docker Desktop | Containers run in a Linux VM on Windows and macOS [S38]. Containers are unprivileged by default; `NET_ADMIN` is not granted by default; `--privileged` gives all capabilities and host device access [S37]. The default seccomp profile denies `mount`, `setns`, `unshare` and `clone` namespace flags unless `CAP_SYS_ADMIN`, and can be set to `unconfined` [S56]. | Whether `--cap-add NET_ADMIN --cap-add SYS_ADMIN` is enough for `ip netns add`, and whether the Docker Desktop VM kernel has nftables NAT, is **UNVERIFIED**: no authoritative write-up found, and the search surfaced only forum reports of mount permission errors for nested namespaces. Must be tested. |

Windows setup facts: Docker Desktop with the WSL 2 backend lists Windows 11 Pro, Enterprise or Education 23H2 or later in the page we read, WSL 2.1.5 or later, and 8 GB RAM [S57]. Whether Home editions are supported was not shown on that page. The Docker Desktop installer size is not stated [S57].

**Recommendation: one default = a pinned `ubuntu:24.04`-based image, run with `--privileged`**, on Linux, Windows and macOS alike. Why: it is the only path that gives the same OS, tool versions and shell on all three host systems, which the brief requires ("run unchanged on all supported paths"). It also gives macOS learners a path at all. `--privileged` is chosen over a narrow capability list because the narrow list is untested and the failure mode (cryptic mount errors) is bad for beginners. **Gate before blueprint lock:** run the whole capstone on Docker Desktop for Windows (WSL 2 backend) and for macOS. If it fails on either, fall back to: native Linux and Ubuntu 24.04 in WSL 2 as the supported paths, and a recorded "phone-only path" for macOS. Document a one-line warning that `--privileged` gives the container host-level power (a safety note, [S37]).

### 5.2 Ubuntu 24.04 packages
Versions from Launchpad (amd64, noble, latest published pocket) [S40, S41].

| Package | Version | Component | .deb size |
|---|---|---|---|
| iproute2 | 6.1.0-1ubuntu6.4 | main | 1.1 MiB |
| nftables | 1.0.9-1ubuntu0.1 | main | 68.2 KiB |
| iptables | 1.8.10-3ubuntu2 | main | 372.4 KiB |
| tcpdump | 4.99.4-3ubuntu4.24.04.1 | main | 467.6 KiB |
| dnsmasq | 2.91-0ubuntu0.24.04.2 | **universe** | 17.5 KiB (all) |
| dnsmasq-base | 2.91-0ubuntu0.24.04.2 | main | 371.9 KiB |
| bind9-dnsutils (dig) | 1:9.18.39-0ubuntu0.24.04.8 | main (updates) | 152.4 KiB |
| traceroute | 1:2.1.5-1 | **universe** | 59.1 KiB |
| iputils-ping | 3:20240117-1ubuntu0.1 | main | 43.5 KiB |
| netcat-openbsd | 1.226-1ubuntu2 | main | 43.3 KiB |
| curl | 8.5.0-2ubuntu10.16 | main | 221.1 KiB |

- Direct .deb files add up to about 2.9 MiB. Their library dependencies (for example bind9-libs, libpcap, libnftnl, libcurl) are **not sized**. **ESTIMATE:** with dependencies, 6 to 10 MiB of packages. The `ubuntu:24.04` compressed size was not shown (Docker Hub showed 40.2 MB for the `latest` tag only [S42]), so **ESTIMATE:** 45 to 55 MB for image plus tools. Also `apt-get update` downloads package indexes, whose size we did not measure. Plan: build once, pin, and measure with `docker image ls` and `docker pull` before stating a size to learners.
- Care: `traceroute` and `dnsmasq` are in **universe** [S40]. The image must have universe enabled; whether the official image does by default is **UNVERIFIED**.
- Care: package versions move (several were updated in 2026 [S40, S41]). Pin by version in the image, and record the build date.

### 5.3 nftables and iptables on Ubuntu 24.04
- nftables is available in Linux 3.13 and later and is meant to replace the legacy xtables tools [S44]. `iptables-nft` is iptables syntax over the nf_tables API [S45].
- **Ubuntu 24.04 uses the nft backend for `iptables` by default: UNVERIFIED.** Only a secondary vendor guide suggests it [S67]. Test with `iptables -V` (it prints `nf_tables` or `legacy`) in the pinned image.
- **Minimal masquerade, from the nftables wiki** [S43]:
  `nft add table nat`
  `nft 'add chain nat postrouting { type nat hook postrouting priority 100 ; }'`
  `nft add rule nat postrouting masquerade`
  The wiki calls masquerade "a special case of SNAT" that takes the source address from the output interface, valid only in a postrouting chain of type nat, kernel 3.18 or later [S43]. The page does not mention forwarding; `ip_forward` is 0 by default [S28], so the script must set `net.ipv4.ip_forward=1` in the router namespace.
- Teaching choice (our call): use `nft` as the primary tool, show the iptables line as "what older guides say". The best namespace tutorial we found uses iptables [S58].

### 5.4 Other tools
- **dnsmasq** is a DNS forwarder with a cache and a DHCP server in one program. `--dhcp-range=start,end,netmask,lease` gives a range; the default IPv4 lease is one hour; `--no-resolv` ignores `/etc/resolv.conf`; `--bind-interfaces` helps when another nameserver runs on the host [S64]. Use one dnsmasq per namespace, so we cover DHCP and DNS with one tool.
- **Public-IP echo services** (use only as optional extras; never in graded tests):
  - `ifconfig.me`: operator not named on the page; `curl ifconfig.me` returns your address; page promotes a sister geolocation site [S52].
  - `api.ipify.org`: open source (rdegges/ipify-api); page says it logs no visitor information and runs on a third-party hosting platform; `api64` returns whichever IP version the client can reach; `api6` fails without IPv6; copyright text reads 2014 to 2019 [S53].
  - `icanhazip.com`: created by Major Hayden in 2009, handed to Cloudflare, announced 6 June 2021; the post says "No ads. No trackers" and does not describe logging [S54].
  - Caution: each is a third party that can change terms, rate limit or go down, and which address you get depends on IPv4, IPv6 or CGNAT. Offline test code must never call them. The capstone uses its own "what-is-my-ip" service in a namespace.
- **macOS** has no `ip` command in our course path. Equivalents to name in a warning box: `ifconfig` (interfaces), `netstat -rn` (routes), `route get` (the route for a destination). We only confirmed that BSD `route` has `get` ("Lookup and display the route for a destination") on a man page mirror [S65]; `ifconfig` and `netstat` behaviour on macOS is **UNVERIFIED** in this dossier.

### 5.5 Environment test, run by the orchestrator on 2026-10-24

Execution check of the recommended default, on Docker Desktop for Windows (engine 29.8.2, WSL 2 backend, VM kernel `6.6.87.2-microsoft-standard-WSL2`), image `ubuntu:24.04` (digest `sha256:68ee2200...aff33ac`), `docker run --rm --privileged`. Scripts kept in the orchestrator's scratch folder; they become challenge 0's checker.

| Check | Result |
|---|---|
| Universe enabled in the image | Yes: `Components: main universe restricted multiverse`. `traceroute` installs without changes. |
| `iptables -V` | `iptables v1.8.10 (nf_tables)`: the nft backend, which closes open question 7. |
| `ip netns add`, veth pairs, a bridge inside a namespace | Work with `--privileged`. |
| Documentation ranges on interfaces | `203.0.113.1/24` and `203.0.113.80/24` work as normal interface addresses and routes. |
| Forwarding plus nft masquerade (`table nat`, `postrouting` chain, `oifname veth-rs masquerade`) | Laptop `192.168.1.23` reaches server `203.0.113.80:8080`. `tcpdump` on the server shows the handshake from `203.0.113.1.50508`: the router's outside address and a rewritten port. This is the capstone's key capture, proven. |
| `traceroute -n` from the laptop | Two hops: `192.168.1.1`, then `203.0.113.80`. |
| dnsmasq DHCP and DNS on a bridge in the router namespace | Leases granted to both clients: `busybox udhcpc` got `192.168.2.149`, `dhclient` got `192.168.2.120` with a default route via `192.168.2.1`; `dig @192.168.2.1 web.test` returned `203.0.113.80`. |
| DHCP client | **Not in the base image.** Add `isc-dhcp-client` (for `dhclient`) or `busybox` (for `udhcpc`) to the package list. |
| IPv6 in namespaces | `fd00:1::1/64` to `fd00:1::2/64` over a veth: `ping -6` works. Set `disable_ipv6=0` in each namespace first, and add addresses with `nodad` (or wait for duplicate address detection) in scripts. |
| Docker's default bridge on the test host | `docker network inspect bridge` shows `172.17.0.0/16`, an observation that backs the inference in section 7. |
| Size | Base image 119 MB unpacked; with every tool installed the container filesystem is about 198 MB. The compressed download still needs measuring for the published image (open question 3). |
| Time | First run, including `apt-get install`, about 40 seconds. |
| `traceroute` to the real internet from the lab container | **Hides the real path.** Default UDP probes: hop 1 is `172.17.0.1`, then only `* * *`. With `-I` (ICMP) or `-T` (TCP): hop 1 `172.17.0.1`, hop 2 the destination itself. Docker Desktop's own networking stands between the VM and the host, so the routers in between never appear. The Windows host's `tracert -d` on the same machine showed every hop, including two private home routers and a private `10.x` address inside the provider. |

### 5.6 Second environment test, 2026-10-24 (after the G2A critiques)

Same host and image as 5.5, extra packages `conntrack` and `busybox`. Topology: laptop `192.168.1.23` and phone `192.168.1.24` on a bridge in a router namespace, a guest `192.168.50.10` on its own router interface, a server `203.0.113.80` outside, nft masquerade out of the outside interface, a DNAT rule `203.0.113.1:8080 -> 192.168.1.23:80`, and a `forward` chain rule dropping guest to home. A one-line busybox `httpd` CGI on the server answers with the address and port it sees.

| Check | Result |
|---|---|
| One client, source port 40000 | The server saw `203.0.113.1:40000`. **The address is rewritten, the port is kept.** |
| A second client using the same source port (41000) while the first is open | The server saw `203.0.113.1:37613`. **The port is rewritten only when it would clash.** `conntrack -L` shows both mappings (`sport=41000 ... dport=37613`), so `conntrack` is the real NAT table to show learners. |
| Server to `192.168.1.23` with no route | Fails at once (curl exit 7). |
| Server to the router's outside address, port 22, nothing listening | Connection refused (exit 7), not a silent timeout. |
| Server adds a route `192.168.1.0/24 via 203.0.113.1` | The connection to the laptop **succeeds**. A masquerade-only router is not a firewall; the real internet simply has no route to private ranges. |
| DNAT port forwarding, tested from the server namespace | Works: `203.0.113.1:8080` reached the laptop's web server. |
| Guest isolation with a `forward` drop rule | Guest to home blocked; guest to server works (seen as `203.0.113.1`). |
| Per-namespace resolver file `/etc/netns/laptop/resolv.conf` | Works: `curl http://web.test/...` resolved through dnsmasq on the router. |
| A DHCP client with no server (`busybox udhcpc -n -q -t 3 -T 1`) | Gives up after about 3 seconds and the interface has **no address**. Linux clients do not fall back to `169.254.x.x` here; that fallback is a Windows and macOS behaviour, to be taught as client dependent. |
| `dig -4 +trace` from the lab container | No answer within 40 seconds. Treat `dig +trace` as unavailable in the lab on Docker Desktop; use a recorded trace. |

Still untested: Docker Desktop on macOS; WSL 2 without Docker Desktop; IPv6 forwarding through a router namespace and router advertisements (SLAAC); WireGuard; a novice's timing of any challenge.

### 5.7 Third environment test, 2026-10-24 (after the round 2 critiques)

| Check | Result |
|---|---|
| Masks that disagree: A `192.168.1.10/24`, B `192.168.1.20/28`, one veth (`rp_filter` is 2 in the new namespace) | A to B: silent loss (2 sent, 0 received); the capture on B shows A's ARP request. B to A: `ping: connect: Network is unreachable` at once. |
| A pings `192.168.1.99`, an on-link address nobody owns | Silent loss with `-c2 -W1`; ARP requests go unanswered. The "Destination Host Unreachable" line was not seen with these flags, so the course does not promise it. |
| Capstone path: home `192.168.1.23` to home router (outside `198.51.100.2/30`) to provider router to server `203.0.113.80` | Works; the server sees `198.51.100.2`. Port forwarding `198.51.100.2:8080` to the home web server works from the server, across the provider router. |
| Fault: the home router's default route removed | The home device gets `Destination Net Unreachable` from `192.168.1.1`; `curl` fails at once. |

**Consequence for the course:** commands about the learner's real internet path (`traceroute`/`tracert`, `curl ifconfig.me`, the host's own addresses) run on the host, not in the lab container. The lab container is for networks the learner builds. Chapters 1.1, 4.1 and 6.4 say which side each command runs on.

Not tested: Docker Desktop on macOS, native Linux, WSL 2 without Docker, and the narrower `--cap-add` alternative. The roadmap keeps `--privileged` as the default and asks for a macOS run before the blueprint is locked.

## 6. Existing courses and gaps

| Course | What it teaches | Omits or does fact-first | Do not copy |
|---|---|---|---|
| Kurose and Ross, *Computer Networking: A Top-Down Approach* | Top-down book, ninth edition summer 2025 per the authors' site (search listing; the site fetch failed on a certificate error) [S63] | No own-machine build; paid textbook; **content details UNVERIFIED** | The chapter order for a 40-hour course; its depth |
| Stanford CS144 (Fall 2026, Keith Winstein) | Datagrams, reliability from unreliable parts, TCP, packet switching, congestion control. Five checkpoints from a networking warmup to "measuring the real world" [S59] | Page does not say it covers ARP, routing or NAT; assumes strong programming | Writing a TCP stack (our non-goal) |
| Cisco NetAcad Networking Essentials | Listed at about 70 hours, free tools such as Packet Tracer [S63] (search listing; course page body was empty on fetch, so **UNVERIFIED**) | Vendor simulator, certification flavour | Vendor CLI and exam framing |
| Professor Messer Network+ (N10-009) | 87 free videos, 12 h 55 min, five exam sections including subnetting, IPv6, DHCP and DNS [S60] | Exam topics, not a working network; watch-only | OSI-as-a-list structure |
| freeCodeCamp networking course | About 9 hours, Brian Ferrill, Network+ prep: concepts, infrastructure, operations, security, troubleshooting [S62] | Exam prep; no building | Exam framing, 9-hour lecture format |
| Julia Evans zine on networking | Free printable zine on "what happens when you download a picture" [S61] | Reading only; no lab | Do not copy art or wording; model the curiosity hook |
| iximiuz Labs "Container Networking from Scratch" | Namespaces, veth pairs, a bridge, default routes with forwarding, a MASQUERADE rule, DNAT port publishing; tested on Ubuntu 24.04; uses iptables [S58] | No DHCP, no DNS, no subnet arithmetic, static IPs by hand, no capture-first teaching | Starting from containers; our course starts from the learner's own numbers |

**Gap we fill.** Nobody found combines: read your own machine's numbers first; CIDR and longest-prefix-match as code exercises; a built home network with DHCP, DNS and NAT inside one Linux machine; `tcpdump` on both sides of the router; and fault injection. The closest, iximiuz, builds only the namespace, bridge and NAT part [S58].

## 7. Production failure modes

| Incident or failure | Source | Facts safe to use | Anchors chapter |
|---|---|---|---|
| Facebook outage, 4 Oct 2021 | [S48] | A maintenance command meant to assess backbone capacity took down all backbone connections; a bug in the audit tool let it run; DNS servers withdrew their BGP advertisements when they could not reach the data centres, so the world could not find the servers; engineers needed on-site access because remote access was down. The post gives no total duration | DNS and routing: "names need addresses, addresses need routes" |
| AWS us-east-1 DynamoDB disruption, 19 to 20 Oct 2025 | [S49] | Began 11:48 PM PDT on 19 Oct, ended 2:20 PM PDT on 20 Oct; cause: a latent race condition in DynamoDB's DNS management that left an incorrect empty DNS record for `dynamodb.us-east-1.amazonaws.com`; DNS restored 2:25 AM; EC2 launches and NLB health checks then failed in turn | DNS chapter: a DNS record with no addresses is a total outage |
| Cloudflare 1.1.1.1 outage, 14 Jul 2025 | [S50] | About 62 minutes (21:52 to 22:54 UTC); an internal configuration error withdrew the 1.1.1.1 prefixes; the post says a hijack of 1.1.1.0/24 seen at the same time did not cause it; DoH traffic was mostly unaffected because it uses different addresses | Resolver chapter: "your DNS server is one address"; why DoH hostnames differ |
| Docker default networks colliding with your own | [S46] | Docker picks subnets from default pools beginning 172.17.0.0/16 and covering 172.17 to 172.31 and 192.168.0.0/16; it tries to avoid prefixes in use on the host, and pools can be changed in `daemon.json` (`default-address-pools`). The docs we read do not say the default bridge is 172.17.0.0/16; that is inferred from the first pool entry | Subnet chapter and the "both subnets are 192.168.1.0/24" mentor question: overlapping ranges |
| Overlapping CIDR blocks block VPC peering | [S47] | AWS: "You cannot create a VPC peering connection between VPCs that have matching or overlapping IPv4 or IPv6 CIDR blocks" | CIDR overlap exercise |
| NAT port limits and idle timeouts | [S51] | AWS NAT gateway: idle 350 seconds times out and a later packet gets RST; each IP supports up to 55,000 concurrent connections; fixes include TCP keepalive below 350 seconds and more IPs. The 55,000 figure came from the page's list of fixes, not a separate limits table | NAT chapter: mapping timeouts and port exhaustion |
| CGN port exhaustion (standard) | [S19] | A CGN must limit ports per subscriber and must drop new flows rather than evict old mappings | NAT chapter: carrier-grade NAT |
| DHCP pool exhaustion | none fetched | **UNVERIFIED**: no incident source found. Use only as a lab fault (a lease pool of two addresses), labelled hypothetical | DHCP chapter |

Teaching note: the Facebook and Cloudflare incidents both involve BGP route withdrawal, which we do not teach. Use them only to show that DNS depends on routing.

## 8. What not to teach (about a 40-hour budget)

- **OSI model as a list.** Brief non-goal; show the layers a packet actually has.
- **BGP internals.** One diagram and the two incidents above; no configuration.
- **IPv6 hands-on beyond reading addresses.** Keep to size, `/64`, text form, link-local, and "why NAT is less needed". The capstone is IPv4, because NAT is the lesson. Revisit if open question 4 is answered otherwise.
- **VLANs, STP, OSPF, Wi-Fi security.** Not needed to debug a software engineer's network.
- **TLS and HTTP versions.** Owned by the system design course.
- **NAT64, 464XLAT, 6rd.** Real on mobile networks, but a distraction; one sentence.
- **ICE and STUN internals.** One box that explains why call apps need them [S20, S21]; no implementation.
- **iptables as the main tool.** Teach nft; mention iptables by name only.
- **Subnetting speed tricks.** Brief non-goal; teach one method and the code.
- **Docker networking modes and Kubernetes CNI.** The Linux and Kubernetes courses own them.

## 9. Source table

All "Date checked" values are 2026-10-24 unless noted. Confidence: H, M, L.

| ID | Claim | Source | Type | Date checked | Conf |
|---|---|---|---|---|---|
| S1 | IPv4 32 bits; classes A, B, C by leading bits; TTL text; 0.0.0.0/8 in registry | https://www.rfc-editor.org/rfc/rfc791.txt | standard | 2026-10-24 | H |
| S2 | IPv6 128 bits; Hop Limit discard at zero | https://www.rfc-editor.org/rfc/rfc8200.txt | standard | 2026-10-24 | H |
| S3 | 64-bit interface IDs; `::1`, `::`, `fe80::/10` | https://www.rfc-editor.org/rfc/rfc4291.txt | standard | 2026-10-24 | H |
| S4 | IPv6 text representation rules | https://www.rfc-editor.org/rfc/rfc5952.txt | standard | 2026-10-24 | H |
| S5 | Three scaling problems; Sept 1993 | https://www.rfc-editor.org/rfc/rfc1519.txt | standard | 2026-10-24 | H |
| S6 | RFC 4632 obsoletes 1519; class sizes; ROAD problems | https://www.rfc-editor.org/rfc/rfc4632.txt | standard | 2026-10-24 | H |
| S7 | Subnetting motivation, Aug 1985, address mask | https://www.rfc-editor.org/rfc/rfc950.txt | standard | 2026-10-24 | H |
| S8 | Private blocks and stated motivation | https://www.rfc-editor.org/rfc/rfc1918.txt | standard | 2026-10-24 | H |
| S9 | Special-purpose registry rows and flags (updated 2025-10-09) | https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml | standard | 2026-10-24 | H |
| S10 | Documentation blocks; "SHOULD NOT appear on the public Internet" | https://www.rfc-editor.org/rfc/rfc5737.txt | standard | 2026-10-24 | H |
| S11 | 100.64.0.0/10 for CGN | https://www.rfc-editor.org/rfc/rfc6598.txt | standard | 2026-10-24 | H |
| S12 | 169.254/16 link-local behaviour | https://www.rfc-editor.org/rfc/rfc3927.txt | standard | 2026-10-24 | H |
| S13 | IANA free pool depleted 3 Feb 2011 | https://www.nro.net/ipv4-free-pool-depleted/ | first-party | 2026-10-24 | H |
| S14 | APNIC final /8, 15 Apr 2011 | https://conference.apnic.net/news-archives/2011/final-8/ | first-party | 2026-10-24 | H |
| S15 | RIPE NCC out of IPv4, 25 Nov 2019 | https://www.ripe.net/publications/news/about-ripe-ncc-and-ripe/the-ripe-ncc-has-run-out-of-ipv4-addresses | first-party | 2026-10-24 | H |
| S16 | ARIN free pool zero, 24 Sep 2015 | https://lists.arin.net/pipermail/arin-announce/2015-September/001892.html | first-party | 2026-10-24 | H |
| S17 | NAT/NAPT definitions and motivation | https://www.rfc-editor.org/rfc/rfc3022.txt | standard | 2026-10-24 | H |
| S18 | Endpoint-independent mapping; UDP timer 2 min min, 5 min recommended | https://www.rfc-editor.org/rfc/rfc4787.txt | standard | 2026-10-24 | H |
| S19 | CGN port limits, drop-not-evict, 120 s reuse; no TCP timeout figure | https://www.rfc-editor.org/rfc/rfc6888.txt | standard | 2026-10-24 | H |
| S20 | STUN reflexive address, port 3478 (first 100k chars read) | https://www.rfc-editor.org/rfc/rfc8489.txt | standard | 2026-10-24 | H |
| S21 | ICE candidates and checks (first 100k chars read) | https://www.rfc-editor.org/rfc/rfc8445.txt | standard | 2026-10-24 | H |
| S22 | ARP: 48-bit Ethernet address mapping, request and reply, Nov 1982 | https://www.rfc-editor.org/rfc/rfc826.txt | standard | 2026-10-24 | H |
| S23 | DHCP messages, lease, ports 67 and 68, T1 0.5 and T2 0.875 | https://www.rfc-editor.org/rfc/rfc2131.txt | standard | 2026-10-24 | H |
| S24 | DNS resolver, authority, recursion, TTL (zero prohibits caching) | https://www.rfc-editor.org/rfc/rfc1034.txt | standard | 2026-10-24 | H |
| S25 | TCP three-way handshake, 16-bit ports, socket pair | https://www.rfc-editor.org/rfc/rfc9293.txt | standard | 2026-10-24 | H |
| S26 | UDP datagram service, 16-bit ports, protocol 17 | https://www.rfc-editor.org/rfc/rfc768.txt | standard | 2026-10-24 | H |
| S27 | Port ranges 0 to 1023, 1024 to 49151, 49152 to 65535 | https://www.rfc-editor.org/rfc/rfc6335.txt | standard | 2026-10-24 | H |
| S28 | Linux `ip_local_port_range` 32768 to 60999; `ip_forward` 0; `ip_default_ttl` 64 | https://www.kernel.org/doc/html/latest/networking/ip-sysctl.html | first-party | 2026-10-24 | H |
| S29 | ICMP Time Exceeded type 11, code 0 | https://www.rfc-editor.org/rfc/rfc792.txt | standard | 2026-10-24 | H |
| S30 | Router must decrement TTL, drop, send Time Exceeded; most specific route (RFC 1812 s2.2.5.2, 5.3.1, 5.2.7.3) | https://www.rfc-editor.org/rfc/rfc1812.txt | standard | 2026-10-24 | H |
| S31 | traceroute default UDP from 33434; `-I`, `-T` (port 80); max 30 hops | https://man7.org/linux/man-pages/man8/traceroute.8.html | first-party | 2026-10-24 | H |
| S32 | `ip route`: default is 0/0; `get` | https://man7.org/linux/man-pages/man8/ip-route.8.html | first-party | 2026-10-24 | H |
| S33 | Google IPv6 reached 50.10% on 28 Mar 2026; 49.56% on 21 Jun 2025 | https://pulse.internetsociety.org/blog/18-years-later-ipv6-reaches-majority | secondary | 2026-10-24 | M |
| S34 | CGN over 92% of cellular, 13.3% of non-cellular ASes; data 2014 to 2016 | https://ar5iv.labs.arxiv.org/html/1605.05606 (arXiv 1605.05606, IMC 2016) | primary research | 2026-10-24 | M (dated) |
| S35 | WSL default NAT; mirrored mode needs Windows 11 22H2+; WSL 2 VM has own address | https://learn.microsoft.com/en-us/windows/wsl/networking | first-party | 2026-10-24 | H |
| S36 | `.wslconfig` networkingMode values; systemd setting; default kernel modules | https://learn.microsoft.com/en-us/windows/wsl/wsl-config (page dated 2026-10-16) | first-party | 2026-10-24 | H |
| S37 | `--privileged` gives all capabilities; NET_ADMIN not default; `ip link add` fails without it | https://docs.docker.com/engine/containers/run/ | first-party | 2026-10-24 | H |
| S38 | Docker Desktop runs containers in a Linux VM (WSL 2 or Hyper-V on Windows) | https://docs.docker.com/desktop/features/vmm/ | first-party | 2026-10-24 | H |
| S39 | `ip netns` and `/var/run/netns` objects | https://man7.org/linux/man-pages/man8/ip-netns.8.html | first-party | 2026-10-24 | H |
| S40 | Package versions, components and .deb sizes (per-package Launchpad pages for noble amd64) | https://launchpad.net/ubuntu/noble/amd64/iproute2 (and the same path for each package) | first-party | 2026-10-24 | H |
| S41 | iproute2 6.1.0-1ubuntu6.4 in updates, published 2026-07-04 | https://api.launchpad.net/devel/ubuntu/+archive/primary?ws.op=getPublishedBinaries&binary_name=iproute2&exact_match=true&distro_arch_series=https://api.launchpad.net/devel/ubuntu/noble/amd64&status=Published&order_by_date=true | first-party | 2026-10-24 | H |
| S42 | Docker Hub shows tags 24.04, noble; 40.2 MB shown only for `latest` | https://hub.docker.com/_/ubuntu | first-party | 2026-10-24 | L (for 24.04 size) |
| S43 | Minimal masquerade commands; masquerade vs SNAT | https://wiki.nftables.org/wiki-nftables/index.php/Performing_Network_Address_Translation_(NAT) | first-party | 2026-10-24 | H |
| S44 | nftables in kernels 3.13+, replaces xtables | https://wiki.nftables.org/wiki-nftables/index.php/What_is_nftables%3F | first-party | 2026-10-24 | H |
| S45 | iptables-nft = iptables syntax over nftables API | https://manpages.ubuntu.com/manpages/noble/man8/iptables-nft.8.html | first-party | 2026-10-24 | H (default-backend claim not supported) |
| S46 | Docker default address pools list; avoids prefixes in use | https://docs.docker.com/engine/network/ | first-party | 2026-10-24 | H |
| S47 | VPC peering cannot overlap CIDR blocks | https://docs.aws.amazon.com/vpc/latest/peering/vpc-peering-basics.html | first-party | 2026-10-24 | H |
| S48 | Facebook outage cause, 4 Oct 2021 | https://engineering.fb.com/2021/10/05/networking-traffic/outage-details/ | first-party | 2026-10-24 | H |
| S49 | AWS DynamoDB DNS event, 19 to 20 Oct 2025 | https://aws.amazon.com/message/101925/ | first-party | 2026-10-24 | H |
| S50 | Cloudflare 1.1.1.1 incident, 14 Jul 2025, 62 minutes | https://blog.cloudflare.com/cloudflare-1-1-1-1-incident-on-july-14-2025/ | first-party | 2026-10-24 | H |
| S51 | NAT gateway 350 s idle timeout; 55,000 connections per IP; ping and inbound behaviour | https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateway-troubleshooting.html | first-party | 2026-10-24 | H |
| S52 | ifconfig.me usage; operator not named | https://ifconfig.me/ | first-party | 2026-10-24 | M |
| S53 | ipify claims: no logging, open source, api64, copyright 2014 to 2019 | https://www.ipify.org/ | first-party | 2026-10-24 | M (self-claims) |
| S54 | icanhazip handed to Cloudflare, 6 Jun 2021 | https://major.io/p/a-new-future-for-icanhazip | first-party | 2026-10-24 | H |
| S55 | WSL kernel config: NF_TABLES, NFT_MASQ, NFT_NAT, NF_NAT, VETH, NET_NS = y; BRIDGE = m (branch linux-msft-wsl-6.6.y; first 100k chars read) | https://raw.githubusercontent.com/microsoft/WSL2-Linux-Kernel/linux-msft-wsl-6.6.y/arch/x86/configs/config-wsl | first-party | 2026-10-24 | M (shipped kernel unknown) |
| S56 | Default seccomp denies mount, setns, unshare, clone ns flags (CAP_SYS_ADMIN gated); `unconfined` option | https://docs.docker.com/engine/security/seccomp/ | first-party | 2026-10-24 | H |
| S57 | Docker Desktop Windows requirements (23H2+, WSL 2.1.5+, 8 GB) | https://docs.docker.com/desktop/setup/install/windows-install/ | first-party | 2026-10-24 | M |
| S58 | iximiuz tutorial: netns, veth, bridge, MASQUERADE, DNAT; Ubuntu 24.04; iptables; no DHCP or DNS | https://labs.iximiuz.com/tutorials/container-networking-from-scratch | secondary | 2026-10-24 | M |
| S59 | CS144 Fall 2026, topics and five checkpoints | https://cs144.github.io/ | first-party | 2026-10-24 | H |
| S60 | Professor Messer N10-009: 87 videos, 12 h 55 min, free | https://www.professormesser.com/network-plus/n10-009/n10-009-video/n10-009-training-course/ | first-party | 2026-10-24 | H |
| S61 | Networking zine by Julia Evans, free | https://wizardzines.com/zines/networking/ | first-party | 2026-10-24 | H |
| S62 | freeCodeCamp 9-hour Network+ course, Brian Ferrill | https://www.freecodecamp.org/news/free-computer-networking-course/ | secondary | 2026-10-24 | M |
| S63 | Kurose and Ross 9th ed (summer 2025) and NetAcad Networking Essentials about 70 hours: search-result text only; page fetches failed or were empty | web search results, 2026-10-24 (gaia.cs.umass.edu/kurose_ross, netacad.com) | secondary | 2026-10-24 | L |
| S64 | dnsmasq: DNS cache plus DHCP; `--dhcp-range`; default lease one hour; `--no-resolv`; `--bind-interfaces` | https://thekelleys.org.uk/dnsmasq/docs/dnsmasq-man.html (first 100k chars read) | first-party | 2026-10-24 | H |
| S65 | BSD `route` has `get` (mirror of Apple man page; does not name macOS) | https://keith.github.io/xcode-man-pages/route.8.html | secondary | 2026-10-24 | L |
| S66 | Google IPv6 statistics page describes the graph only; no current value in fetched text | https://www.google.com/intl/en/ipv6/statistics.html | first-party | 2026-10-24 | L (no figure) |
| S67 | Ubuntu 24.04 iptables backend is nf_tables: vendor guide via search snippet only | https://www.ssdnodes.com/learn/lang/de/iptables-vs-nftables-on-ubuntu | secondary | 2026-10-24 | L (UNVERIFIED) |
| S68 | AS definition: connected group of IP prefixes, one or more operators, single clearly defined routing policy (RFC 1930, March 1996) | https://www.rfc-editor.org/rfc/rfc1930.txt | standard | 2026-10-24 | H |
| S69 | `2001:db8::/32` reserved for IPv6 documentation examples (RFC 3849, July 2004) | https://www.rfc-editor.org/rfc/rfc3849.txt | standard | 2026-10-24 | H |

Claims kept as UNVERIFIED (not in any row above with H confidence): "5-tuple" as a named term; Class D 224/4 (RFC 1112); RIPE NCC 2012 last /8; current CGNAT share on mobile networks; Ubuntu 24.04 default iptables backend; `--cap-add` sufficiency for `ip netns` in Docker; Docker Desktop VM kernel nftables support; universe enabled in `ubuntu:24.04`; macOS `ifconfig` and `netstat -rn` behaviour; DHCP pool exhaustion incident; download size estimates (labelled ESTIMATE).

## 10. Open questions

For a human or subject-matter expert (a network engineer or Linux instructor):

1. **Docker path test.** Passed on Docker Desktop for Windows with `--privileged` (section 5.5). Still needed: the same script on Docker Desktop for macOS (Apple silicon and Intel).
2. **Documentation ranges on interfaces.** Resolved: they work as normal interface and route addresses, and `tcpdump` shows them unchanged (section 5.5).
3. **Universe and apt.** Universe is enabled (section 5.5). Still needed: the compressed download size of the published image.
4. **IPv6 depth.** Hands-on IPv6 in the capstone, or reading only? This changes the lab family and the budget.
5. **macOS.** Docker Desktop only, or also a Linux VM tool? Needs a macOS tester.
6. **Windows editions.** Do learners have Windows 11 Pro and 22H2 or later? Home and Windows 10 behaviour is untested here (mirrored mode and Docker Desktop both state Windows 11 requirements [S35, S57]).
7. **iptables backend.** Resolved: `iptables v1.8.10 (nf_tables)` in the image (section 5.5).
8. **Re-check dated numbers before publish:** Google IPv6 percentage [S33], mobile CGNAT share [S34], package versions [S40].
9. **Course-scan depth.** The Kurose and Ross, NetAcad and Network+ rows rest on listing text and short pages. Ask the instructor whether a closer look is wanted.
10. **Incident wording.** The AWS and Cloudflare posts contain exact times; a reviewer should approve any minute-level figures before they enter lessons.
