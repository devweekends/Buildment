# Decision log: networking

## 2026-10-24: Short course, about 40 core hours

**Decision:** the course is a short foundations course of about 40 core hours (about three and a half weeks at 12 hours a week), not a flagship 210 hour build.

**Why:** the sponsor asked for "the most important things, not a typical course". `02-course-architecture.md` sets 30 to 60 hours for a short course. Linux, Kubernetes, system design and AWS build on it, so it has to be finishable first.

## 2026-10-24: No variants

**Decision:** no variants for the general course (brief, Variants).

**Why:** a foundations course with one shared capstone network. Follow-on depth lives in the AWS course (cloud networking) and the Linux course (container networking).

## 2026-10-24: Boundaries with sibling courses

**Decision:** this course owns addressing, subnets, routing, NAT, ports, DHCP and DNS basics. The system design course keeps handshake cost, TLS, HTTP versions, DNS for traffic routing and real-time connections. The Linux course owns namespaces and cgroups as container building blocks; this course uses network namespaces only as a tool for building networks.

**Why:** the system design roadmap already has module 3, "Networking for system designers". Repeating it wastes learner hours. Listed as an open decision for the instructors in the roadmap.

## 2026-10-24: Default build environment is a pinned Ubuntu 24.04 image run with `--privileged`

**Decision:** every challenge runs in one pinned `ubuntu:24.04` image with the networking tools installed, started with `docker run --privileged`. Native Linux and WSL 2 learners may run the same scripts directly with `sudo`. The image adds a DHCP client (`isc-dhcp-client` or `busybox`), which the base image lacks.

**Why:** it is the only path with the same OS and tool versions on Windows, macOS and Linux (dossier 5.1). The orchestrator ran the capstone's core on Docker Desktop for Windows on 2026-10-24 (dossier 5.5): namespaces, veth and a bridge, forwarding, nft masquerade with the rewritten source seen in `tcpdump`, traceroute, dnsmasq DHCP and DNS, and IPv6 over a veth all worked.

**Open:** a macOS run before the blueprint is locked; the compressed download size of the published image.

## 2026-10-24: G1 accepted

**Decision:** the research dossier is accepted as the basis for the roadmap. Claims it marks UNVERIFIED (the AS definition, class D, the current CGNAT share on mobile, the 5-tuple as a named term) stay out of learner text until a writer sources them.

## 2026-10-24: Real-path commands run on the host, not in the lab

**Decision:** `tracert`/`traceroute` to the real internet, `curl ifconfig.me` and the learner's own address settings run on the host computer. The lab container is only for networks the learner builds.

**Why:** in the environment test, `traceroute` inside the Docker Desktop container showed `172.17.0.1` and then the destination, with no routers in between, while the host's `tracert` showed every hop (dossier 5.5).

## 2026-10-24: Roadmap v2 after round 1 critiques

**Decision:** roadmap v2 answers every S1 and S2 defect from both round 1 critiques (`qa/g2a-response-round1.md`). The main changes: a "Problem first" line for every Learn chapter; a first network built in the first sitting (1.5); a first look at NAT in 2.4; ARP moved before subnet splitting; faded scaffolding for challenges and slow-path times (core about 42 hours, slow path about 52); NAT taught as Linux really behaves (address always rewritten, port only on a clash; NAT is not a firewall), both checked by a second environment test; the network lab described as a real platform change delivered in three slices; IPv6 moved after the capstone, with its build in the stretch path.

**Deferred, with reasons:**
- Data weight per chapter: set in the blueprint, when chapter assets are known.
- Bind-mount timing on Windows: measured when challenge 0 is built.
- Sources still to add before any learner text uses them: RFC 1930 (autonomous systems) for 4.5, RFC 3849 (`2001:db8::/32`) for 9.2, and the macOS commands on a real Mac.
- Splitting module 4: not done. Moving ARP into module 3 removes the overload the critic named.

## 2026-10-24: Roadmap v3 after round 2, and the end of the critic rounds

**Decision:** roadmap v3 fixes the round 2 S2 defects from both critics: module 1 reordered so the install comes early and the first network is built about two hours in (pedagogy N01); a `[replay]` spec and a stated Foundations level with Code alternatives and outcome coverage (pedagogy N03); chapter 3.9 rewritten to the behaviour a third environment test observed (technical N01, dossier 5.7). Most round 2 S3 defects are also fixed (port prediction read from `conntrack`, timeline unit change, ICMP packet for 1.5, the localhost chain, DNS server and `curl.exe` rows, the capstone provider-router path tested, line endings, sourced wording, the captive portal order, gapped challenge 5, per-part restore points). RFC 1930 and RFC 3849 added to the dossier.

**Process:** `06-quality-gates.md` allows two critic rounds before a human decides. Both rounds are done, so v3 goes to the sponsor and instructors at G2B without a third critic round. Open S3 items: novice timings (decision 12), the macOS and WSL 2 runs (decision 1), the Windows bind-mount test, and the data weight per chapter.

## 2026-10-24: Sponsor sign-off of roadmap v3

**Decision:** Zeeshan (architect, human sponsor) approved roadmap v3 and accepted the recommendations on all 12 open decisions. Recorded in `roadmap-confirmation.md`.

**Open:** `02-course-architecture.md` asks for at least two instructors at G2B, and for the delivery lead to record the result. One signature is recorded. The blueprint (G2C) waits for the second instructor, unless the sponsor records an explicit exception here.

## 2026-10-24: Sponsor exception: one signature completes G2B

**Decision:** the sponsor's approval alone completes G2B for this roadmap. The rule in `02-course-architecture.md` asks for at least two instructors; the sponsor waived it ("yes i am the master here", 2026-10-24, answering whether his approval should count as the full G2B sign-off). G2C (blueprint, skill graph, timeline, project brief) may start from roadmap v3.

**Owner:** Zeeshan (architect, human sponsor). The delivery lead has not yet recorded the result; that stays open and does not block G2C under this exception.

