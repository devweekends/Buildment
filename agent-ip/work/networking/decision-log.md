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
