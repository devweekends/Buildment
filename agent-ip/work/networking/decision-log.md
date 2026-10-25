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


## 2026-10-25: Roadmap v3.1, detail fixes from the module briefs

**Decision:** the module briefs listed roadmap issues. None changes an outcome, a module, the order or the capstone, so they are fixed as v3.1 without re-running G2A, and the sponsor sees them at G2C sign-off:
- Check chapters are quiz-only: spaced practice uses plain quiz questions in the drill style; `[addr: drill]` stays in Learn chapters (2.2, 2.3, 3.2, 3.5).
- 2.4 keeps one canvas (`[addr: classify]`); the first look at NAT becomes a `TraceRequest` step-through.
- Check sizes kept within five questions: 4.9 (three situations plus two earlier), 7.7 (three outputs as one question), 8.6 (five questions that combine modules).
- Classification exercises may use a sourced real public address (`1.1.1.1`, [S50]); fictional hosts still use documentation ranges (decision 11 refined).
- `sudo` is taught for the learner's own Linux or WSL 2; in the lab the learner is root. Host numbers are pasted into `my-numbers.txt` for the lab checker.
- The 4.3 hook uses a plausible provider router, not one the learner can see in their trace. The 7.4 hook follows [S48]: the services "could not be found". 6.3 no longer claims home routers always add a firewall; `docker run -p` is sourced [S75].
- Capstone: a static home web server (`homeweb`) is the forwarded port's target and the "wrong mask" fault's device; part 1 starts from challenges 2 and 4, part 3 from challenge 5.
- The network lab's command-output generator also covers `ip link`, `ip addr`, `ip route get`, `ss`, `conntrack -L` and `curl`; the IPv6 view's filter is stateful; two hosts may share a direct link.
- Fallbacks predict before the key steps, within each chapter's assessment budget. `[timeline]` models fall back to a worked-example table with a Predict.
- 6.6 states that it simplifies Linux's clash rule and drops a new flow when the port range is full [S19].
- Module 9 now has outcome evidence (O2: quiz 9.4 and gate 9.5).
- New sources: [S70] to [S76] (`/31`, DNS over TCP, SLAAC, temporary addresses, dual stack, `docker -p`, bridge MAC learning).

## 2026-10-25: Proposed prose floors for this course (for sponsor decision at G2C)

**Problem:** the audit applies 1,200 prose words to every chapter that is not a gate or a quiz. Read chapters are 10 to 15 minutes, and Code and Lab chapters are mostly doing, not reading. The open proposal `proposals/2026-10-23-prose-minimums-by-course-type.md` covers exactly this.

**Proposal:** Learn and Build chapters keep 1,200; Read, Code and Lab chapters and gates use 700. Recorded as a course exception until the proposal is decided; audit findings for those chapter types are listed in the course PR.

**Status:** proposed, not yet decided. The module briefs follow it; if the sponsor rejects it, the Read chapters are re-timed to 15 to 20 minutes and the briefs updated.

## 2026-10-26: G2C signed off; prose floors decided

**Decision:** the sponsor signed off G2C ("I sign off G2C for the networking course, and I accept the 700-word prose floor for Read, Code and Lab chapters and gates. Continue to G3."). The course exception proposed on 2026-10-25 is now decided: Learn and Build chapters need at least 1,200 prose words; Read, Code and Lab chapters and gates need at least 700; Check chapters are quiz-only. `audit-course.mjs` still applies 1,200 to Read, Code and Lab chapters, so its findings for those types are expected and are listed in the course PR under this exception, until `proposals/2026-10-23-prose-minimums-by-course-type.md` is decided.

## 2026-10-26: Follow agent-ip v0.5.3 (beats) from G3

**Context:** merging `origin/main` brought agent-ip v0.5 to v0.5.3: Learn chapters are visual-first beats (`format: beats`, four to eight beats, 300 to 700 visible words, at least 900 with `GoDeeper` folds, at least one playable beat, a predict before the key beat, one or two quiz questions at the end, at most 40 JSX tags); Read chapters are one or two beats; and "never ask before you teach" (every question answerable from earlier chapters or everyday intuition).

**Decision:** this course follows v0.5.3 from G3 on. Learn and Read chapters use the beats rules, which replace the 1,200-word Learn floor in the 2026-10-26 sign-off entry; Build chapters keep 1,200 prose words; Code and Lab chapters and gates keep the sponsor's 700; Check chapters stay quiz-only. Each "Problem first" hook stays as the chapter's opening line, and every predict is checked against "never ask before you teach" at G3. No outcome, module or chapter changes.

## 2026-10-26: Drills are practice; independent reviewers from other model families

**Decision:** the `[addr: drill]` canvases are ungraded practice (canvas spec); O3's graded evidence is code exercises 3.7 and 3.8, lab 3.10 and the by-hand items in quizzes 2.6 and 3.11. Roadmap O3 row and blueprint updated.

**Decision:** at the sponsor's request ("use a lot of argon to help you"), G3 reviews use models from other families through the Antigravity CLI. Gemini 4 Argon hit its account quota on 2026-10-26 (resets in about five days), so the blind answer-key check ran on Gemini 3.8 Flash (3 of 3 keys matched) and the two critics run on Gemini 3.8 Flash (critic A) and GPT-OSS 120B (critic B). Drafting stays on the drafting model; this restores the cross-family independence `01-agent-system.md` asks for.

## 2026-10-26: G3 signed off

**Decision:** the sponsor signed off G3 ("I sign off G3 for the networking course. Start G4 with the module 1 chapters, keeping cost lean."). G4 starts with module 1. Challenge drafts live in `agent-ip/work/networking/challenges-template/` until the sponsor approves creating the `devweekends/networking-challenges` template repository.

## 2026-10-26: Challenge template drafted and run in the lab

**Decision:** the learner template (`challenges-template/`: lab image, toolkit, challenge 0 parts 1 and 2, challenge 1 parts 1 and 2) was built and run in the lab image on Docker Desktop for Windows. The image builds in about 40 seconds and is 207 MB. Every test passed, and all of these were recorded:
- the setup checker's three outcomes: all passing, not privileged, and outside the lab;
- the numbers checker with a dotted and a hex mask;
- the cable, the README's exact capture step and the must-fail ping;
- the wrong-mask behaviour (dossier 5.7);
- a rerun after a previous run.

The recordings (`recordings/replay-*.txt`) are the only source for the `[replay]` canvases.

**Finding:** without a capture filter, a fresh veth first carries IPv6 chatter (router solicitations, multicast listener reports), so the README's `arp or icmp` filter is required; the chapter says why.

**Still untested:** `lab/start.sh` and `start.ps1` themselves (the recordings used the same `docker run` flags directly), `winpty` in Git Bash, the line-endings guard on a real CRLF file, macOS.

## 2026-10-26: Network lab slice 1 exists on feat/netlab (not merged)

**Context:** the lab session built slice 1 on branch `feat/netlab` (worktree `C:\Users\Zeeshan\buildment-netlab`, local only, waiting for the sponsor's review). Spec to target: `NetLabSpec` in `frontend/src/lab/types.ts`, family `net`, mode `explore | fault | plan`; topology of devices (host, router, switch with interfaces, routes, sockets, forwarding, silent, filter rules) and links; fault labs carry reachability checks and plan labs a solution that the validator replays. Graded lab slugs keep the `net-lab-*` prefix; examples `net-lab-fix-office`, `net-lab-plan-school`, `net-explore-office`. Commands covered: `ip addr/link/route/route get/neigh`, `arp -a`, `ping`, `traceroute`, `ss -tlnp`, `curl` to an IP, `sysctl ip_forward`. Not yet built: beat mode (PG2), NAT, DHCP, DNS.

**Decision:** module 1 needs none of it. Modules 3 and 4 write their graded labs (3.10, 4.8) against this spec once `feat/netlab` is merged; Learn chapters keep the `[sequence]` fallback until beat mode exists.
