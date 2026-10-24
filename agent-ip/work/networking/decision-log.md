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
