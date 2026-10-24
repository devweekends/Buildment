---
artifact: module-brief
course: networking
module: 01-your-laptop-on-a-network
version: 1
owner: curriculum-architect
roadmap_version: 3
roadmap_confirmed: true
---

# Module 1: Your laptop is already on a network

Opening question (roadmap): *Your computer says your address is `192.168.1.23`. A website says you are `203.0.113.45`. Which address is yours?* The second address comes from a documentation range and stands in for a real public one (decision 11).

## Outcome

The learner can read their own computer's address, mask, gateway, DNS server and the public IPv4 address a website sees, and say where each came from (O1). They have installed the lab, built two "computers" inside their laptop that ping each other, captured the ping, and named what each field in the capture is for. They can list three questions about their home network that they cannot yet answer. Challenge 0 and challenge 1 part 1 are committed in their `networking-challenges` repository.

## Why this module exists

Most learners have never looked at the numbers their own machine uses. This module starts with those numbers so the course question ("how do devices with no public address reach the internet?") is theirs before any term is defined. It then gets the lab running and gives a first working network in the first sitting (about two hours in on the core path: 15 + 40 + 25 = 80 minutes before 1.4), so the reading in 1.5 and 1.6 explains something the learner already did. Why before what: the capture comes first, the explanation second.

## Prerequisites

Entry prerequisites (course brief, roadmap): `terminal-basics` (open a terminal, run a command), `git-basics` (Git and GitHub), and basic JavaScript for module 2 onward. Binary and bit operators are taught in 2.2 and 2.5. The seven shell commands are taught in 1.3. The chapter `requires` below come from `timeline.yaml`; the only ones that are not introduced inside this module are `terminal-basics` and `git-basics`.

Equipment for 1.2 to 1.4: a laptop with 8 GB of memory for Docker Desktop (the requirement Docker states [S57]) or a Linux laptop; Windows 11 (Docker states 23H2 or later [S57]) or macOS. Whether Windows Home is supported is not shown in the source we read: say "check the Docker page" and do not promise it. Phone-only learners read 1.1 and 1.5 to 1.8 and use the recordings (decision 8, "Foundations").

## Chapters

| # | Chapter | Type | Min | Outcome | Requires | Introduces | Evidence |
|---|---|---|---|---|---|---|---|
| 1.1 | Which address is yours? | Read | 15 | Write down your computer's address, the IPv4 address a website sees, your DNS server and any IPv6 address; state the course question | terminal-basics | own-addresses | written numbers in the learning log |
| 1.2 | Install the lab | Build | 40 | Start the download first, install the lab, pass the setup checker (five named failures, each with its fix), read the safety note | terminal-basics | lab-environment | setup checker passes |
| 1.3 | Seven commands and your own numbers | Build | 25 | Use cd, ls, cat, nano, sudo, Ctrl+C and exit with a self-check; record your own numbers (the checker prints your mask as a prefix) | lab-environment | shell-commands (reinforces own-addresses) | challenge 0 results committed |
| 1.4 | Two computers inside your laptop | Build | 45 | Create two namespaces joined by a virtual cable, `ping` one from the other, capture it with `tcpdump -n -v` | shell-commands, git-basics | namespaces-veth, ping-icmp, read-capture | challenge 1 part 1 test and capture |
| 1.5 | What one ping actually sent | Learn | 35 | Name the addresses, TTL and type in your ICMP echo, and the addresses, ports and TTL in a DNS query | read-capture | packet-fields (reinforces ping-icmp) | in-chapter quiz on fields |
| 1.6 | Why does one packet carry three kinds of address? | Learn | 30 | Explain the three jobs (MAC, IP, port) and wrap and unwrap a packet | packet-fields | layers, mac-address | wrap and unwrap check |
| 1.7 | Your laptop on a network | Check | 15 | Pick the right address, port or layer for five real outputs | layers | none (reinforces own-addresses, packet-fields) | quiz |
| 1.8 | Your home network on one page | Gate | 25 | Map your devices, router and provider with real numbers and list three open questions; branches for IPv6 or shared | own-addresses, layers | none (reinforces own-addresses) | home network map |

Core 230 minutes. Slow path 340 minutes (Build slow paths 90, 40 and 70, plus a quarter more on Read and Learn).

### 1.1 Which address is yours? (Read, 15 min)
- Hook: your computer says `192.168.1.23`, a website says `203.0.113.45`. Which is yours? The learner commits a guess before running anything.
- Claim: the learner must understand that an address is a fact about a place on a path, so one computer can have more than one number depending on who is looking. Prose names each number (address, mask, gateway, DNS server, public IPv4, IPv6) and says "why they differ" is answered in modules 2 and 6. Why before what: the course question comes before any definition.
- Worked example: one home with address `192.168.1.23`, mask `255.255.255.0`, gateway `192.168.1.1`, DNS `192.168.1.1`, website sees `203.0.113.45`, IPv6 shown as `2001:db8:...` (documentation prefix [S69]). Commands on your computer: Windows `ipconfig`, `ipconfig /all`, `curl.exe -4 ifconfig.me` (plain `curl` in PowerShell is a different command); macOS `ifconfig`, `netstat -rn`, `scutil --dns` (unverified, check on a Mac before publish); Linux `ip addr`, `ip route`, `resolvectl status`; phone: the Wi-Fi details screen. The echo service is a third party [S52]: optional, never graded.
- Diagram: MermaidDiagram, flowchart left to right: laptop `192.168.1.23` to home router to "something further along the path" to website `203.0.113.45`. Claim: the two numbers sit on different sides of the router, which is why they differ.
- Interactive: the learner's own computer is the interactive piece. PREDICT first: "In most homes, will the website print the address your computer shows?" Then the learner runs the commands and writes five numbers in the LearningLog.
- Assessment: one PREDICT and one QUIZ (read an annotated output and pick the gateway line). Failure or near miss: the result is IPv6 or `-4` fails; the address starts with `100.` (shared space, "one sign, not proof", S11); a VPN is on; the learner runs `curl` inside the lab, which shows the lab's view, not theirs (dossier tested only `traceroute` there, so `curl` is untested: verify at G3). The Callout states that the documentation range is a stand-in.

### 1.2 Install the lab (Build, 40 min, slow path 90)
- Challenge: challenge 0 part 1, `challenges/challenge-0-setup/part-1-checker/` (proposed name). Support: guided (every command typed one at a time, each line explained, expected output shown).
- Hook: none in the roadmap (Build). Open with the cost: "Start the download now, read while it runs." Prose claim: the lab is a Linux machine inside your computer, and there are now two places to type commands (your computer and the lab), each labelled **On your computer** or **In the lab**.
- Worked example: `docker run --rm --privileged` on the pinned `ubuntu:24.04`-based image (dossier 5.5, Docker Desktop for Windows, tested 2026-10-24); filesystem about 198 MB with all tools, base image 119 MB unpacked; first run about 40 seconds including `apt-get install`. The compressed download size is not measured: state no size until it is (roadmap: both sizes measured before publish). Safety note: `--privileged` gives the container all capabilities and host device access [S37]; the course uses it only for this image.
- Five named failures (the roadmap names none; proposed, confirm at G3): `docker-not-running`; `no-privilege` (container started without `--privileged`, so `ip link add` fails [S37]; exact message untested); `crlf-line-endings` (the roadmap says the checker stops with a plain message); `wrong-image` (a tool is missing); `repo-not-visible` (bind-mount folder empty in the container; Windows bind-mount flow is tested in this challenge, roadmap).
- Acceptance tests: must pass: the checker prints PASS for namespace create, veth create and every named tool, and exits 0. Must fail: the same checker in a container started without `--privileged` exits non-zero and prints the failure name `no-privilege` with its fix. Captured output to commit: `results.md` with the PASS lines, tool versions and image digest.
- Hints: first nudge "read the first FAIL line, it names the check"; second "the README table maps each name to its fix"; third the command. If you are stuck: run the checker again (scripts are safe to rerun), then try `docker version` and `docker info` (untested, verify at G3).
- Diagram: MermaidDiagram: your computer, Docker Desktop's Linux machine, the lab container, with a note that real-path commands run on your computer. One MustRead: Docker's Windows install requirements [S57], so the learner can answer "does my laptop meet them?".
- Interactive: `net-replay-setup-checker` (phone readers predict the next output, then see the recorded one). One QUIZ: given three checker lines, name the failure and its fix.

### 1.3 Seven commands and your own numbers (Build, 25 min, slow path 40)
- Challenge: challenge 0 part 2, `part-2-your-numbers/` (proposed). Support: guided.
- Hook: you can already read your numbers. The learner pastes them into a file and a script reads them back. Prose claim: a command line is a way to ask a machine questions; seven commands are enough for the whole course. Self-check passes when the files the learner makes with `cd`, `ls`, `cat` and `nano` exist and contain their text.
- Worked example: from 1.1, `192.168.1.23` with `255.255.255.0` is `/24`; macOS `ifconfig` prints `netmask 0xffffff00` (also `/24`; check on a Mac), and `0xfffff000` is `255.255.240.0`, which is `/20`. No arithmetic yet: the checker prints the prefix. `Ctrl+C` is practised on `ping 127.0.0.1`; `exit` leaves the lab.
- Acceptance tests: must pass: `my-numbers.txt` with address, mask and gateway prints the prefix (`255.255.255.0` prints `/24`; `0xffffff00` prints `/24`) and exits 0. Must fail: a mask written with three numbers prints "mask needs four numbers" and exits non-zero. Captured output: `results.md` with the learner's own numbers and the prefix line. Hints: "copy the numbers from the command on your computer, not from the lab"; stuck diagnostic: `cat my-numbers.txt` shows what the checker read.
- Diagram: MermaidDiagram: command on your computer, paste into `my-numbers.txt`, checker in the lab prints the prefix. Claim: your numbers live on your computer; the lab only reads what you paste. See Roadmap issues 1 and 2 (`sudo`, where the checker runs).
- Interactive: `net-replay-own-numbers`. One QUIZ: for three commands, "On your computer or in the lab?" Near miss: typing `ipconfig` in the lab, or a Windows editor saving CRLF line endings.

### 1.4 Two computers inside your laptop (Build, 45 min, slow path 70)
- Challenge: challenge 1 part 1, `challenges/challenge-1-two-computers/part-1-virtual-cable/` (proposed). Support: guided.
- Hook: can you make a network with no cable and no Wi-Fi? Prose claim: a network is two things that each have an address on the same wire and can send; a namespace is a separate set of network settings inside one machine, and a virtual cable (veth pair) joins two of them. `/24` for now means "the first three numbers name the network".
- Worked example: namespaces `laptop` (`192.168.1.10/24`) and `phone` (`192.168.1.20/24`), one cable, both ends brought up; `ping -c2 -W1`; capture on the `phone` side with `tcpdump -n -v`. Expected: ARP request and reply first, then echo request and reply with TTL 64 (Linux default `ip_default_ttl` is 64 [S28]). Dossier 5.5 to 5.7 tested namespaces, veth pairs and `ping -c2 -W1`; the exact `tcpdump -n -v` option set and TTL display are untested: verify at G3. Names and addresses are the lab's own, separate from the learner's real home network.
- Acceptance tests: must pass: `laptop` pings `192.168.1.20` with 0% loss. Must fail (negative control): `laptop` pings `192.168.1.99`, which nobody owns, and shows silent loss (dossier 5.7 saw 2 sent, 0 received). Captured output: `capture.txt` and `results.md`. 3.9 revisits the silent loss. Slow path 70.
- Hints: "ping reaches the other end of the cable: does that end have an address and is it up?"; then "both ends need `ip link set ... up`"; stuck diagnostic: `ip netns list` and `ip addr` in each namespace.
- Diagram: MermaidDiagram: two namespaces joined by one cable with addresses. Interactive: `net-replay-virtual-cable`. PREDICT first: "You ping once. Will the capture show only the ping?" One QUIZ on reading one capture line.

### 1.5 What one ping actually sent (Learn, 35 min)
- Hook: your capture is a few lines of numbers. What exactly crossed the cable? Claim: a packet is a bundle of labelled numbers, each set by a different party; a ping has addresses, TTL and a type but no port, a DNS query has ports.
- Worked example: one echo request from `192.168.1.10` to `192.168.1.20`, TTL 64, type echo request (reply is the echo reply); a DNS query from a high source port to port 53 for `web.test` (dossier 5.5 resolved `web.test` through dnsmasq). Care: ICMP type numbers 8 and 0 are not in the dossier (it cites only type 11 [S29]): use tcpdump's words, or confirm at G3. DNS port 53 is not in the dossier either: take it from the capture or the IANA registry. Ephemeral ranges differ: IANA 49152 to 65535 [S27], Linux 32768 to 60999 [S28].
- Diagram: MermaidDiagram sequence: ARP request, ARP reply, echo request, echo reply between `laptop` and `phone`. Claim: one ping is more than one packet.
- Interactive: `net-packet-inspect`. PREDICT first: "Does a ping packet carry a source port?" Then the learner taps each field of their echo and of the DNS query.
- Assessment: one PREDICT, two QUIZ (match three of their own `tcpdump -n -v` lines to fields; which field changes if you ping a different address). Near miss: reading the ARP lines as ping lines; assuming ping uses ports.

### 1.6 Why does one packet carry three kinds of address? (Learn, 30 min)
- Hook: your Wi-Fi only reaches your router, yet your packet crosses the world and lands in one app. Claim: three jobs need three addresses: reach the next device on this link (MAC), reach the far computer (IP), reach one program (port). Each device reads only the layer it needs.
- Worked example: `192.168.1.23` sends from port 40000 to `203.0.113.80` port 8080 (as in dossier 5.6): Ethernet (destination MAC is the router's, source MAC is the laptop's; fictional locally administered MACs such as `02:00:00:00:00:23`), then IP, then TCP, then the message. The broadcast MAC `ff:ff:ff:ff:ff:ff` is not in the dossier: show it from the learner's own capture with `tcpdump -e` (untested, verify at G3). MAC is 48 bits [S22]. A note says Wi-Fi frames differ; the lab uses Ethernet.
- Diagram: MermaidDiagram flowchart: message inside TCP inside IP inside Ethernet. Claim: wrap order, and which header the next device removes.
- Interactive: `net-packet-wrap`. PREDICT first: "When the packet reaches your router, which header does the router remove first?" Ethernet, IP or TCP.
- Assessment: one PREDICT and one QUIZ (which address would change if the same message were sent to a device on your own network). Near miss: "why not use only MAC addresses?"; the answer is that a MAC only names a device on one link (reasoning, not sourced).

### 1.7 Your laptop on a network (Check, 15 min)
- Five QUIZ fences, quiz-only file `1.7-laptop-on-a-network-quiz.md`. Each shows a real output (an `ipconfig` block, a capture line, a `curl` result) and asks which address, port or layer. No earlier module exists to mix in. Outputs come from the reference captures. Every option gets one reason; re-answer every key blind.

### 1.8 Your home network on one page (Gate, 25 min)
- Evidence: a map of the learner's devices, router and provider with real numbers, three questions they cannot answer yet, and challenge 0 committed. Worked example: laptop `192.168.1.23`, phone `192.168.1.24`, TV `192.168.1.31`, router `192.168.1.1` inside and `203.0.113.45` outside (stand-in), DNS `192.168.1.1`. Sample open questions: why the website sees another address; how my phone finds the router's hardware address; what a "gateway" does.
- Branches: public address was IPv6 (about half of Google users reach Google over IPv6, 50.10% on 28 March 2026 [S33], re-check before publish); address starts with `100.` (shared; CGNAT is common on mobile networks, a 2014 to 2016 study found over 92% of cellular networks used it [S34], dated). Neither branch teaches NAT.

## Interactions

Counting rules from `audit-course.mjs`: a tag is any opening `<Component`; child tags (Step, TerminalLine, CompareColumn, TraceStep) count toward 25 but not toward the 6 top-level names; quiz, predict and openquestion fences are free of tags and count as assessments (max 3; a quiz chapter max 5); command output goes in plain code fences, not TerminalBlock; a canvas is at most one per chapter and never in a gate or quiz chapter; every chapter that is not a Check or Gate needs a diagram (so Build chapters get one too).

| Ch | Top-level components | Tags (est.) | Assessments | Prose floor |
|---|---|---|---|---|
| 1.1 | LearningObjectives, Callout, MermaidDiagram, LearningLog, GlossaryTerm | 8 | PREDICT, QUIZ | 1,200 |
| 1.2 | Steps, MermaidDiagram, Callout, MustRead, InteractiveCanvas, GlossaryTerm | 17 | QUIZ | 1,200 |
| 1.3 | Steps, MermaidDiagram, Callout, InteractiveCanvas, GlossaryTerm | 14 | QUIZ | 1,200 |
| 1.4 | Steps, MermaidDiagram, Callout, InteractiveCanvas, GlossaryTerm, BigWordAlert (network namespace) | 17 | PREDICT, QUIZ | 1,200 |
| 1.5 | MermaidDiagram, InteractiveCanvas, BigWordAlert (TTL), GlossaryTerm, Callout | 8 | PREDICT, QUIZ x2 | 1,200 |
| 1.6 | MermaidDiagram, InteractiveCanvas, BigWordAlert (MAC address), GlossaryTerm, Callout | 7 | PREDICT, QUIZ | 1,200 |
| 1.7 | none | 0 | QUIZ x5 | quiz only |
| 1.8 | Checklist, LearningLog, ChapterRecap, Callout | 4 | OPEN_QUESTION | 700 |

`LearningObjectives` in 1.1, `ChapterRecap` in 1.8. Diagram plan: six Mermaid diagrams (1.1 to 1.6, none in the Check or Gate); the module's required diagram is covered many times over, and every Learn chapter has one. No InterestingRead or RealWorldEvent in this module; the one MustRead is in 1.2.

## Canvases

| Slug (proposed) | Renderer | Chapter | Claim | Stated limit | Fallback if not built |
|---|---|---|---|---|---|
| `net-packet-inspect` | `[packet]` inspect | 1.5 | Every field in a packet is a number someone set, and the fields differ by protocol | Two captured packets only (ICMP echo, one DNS query); not a live capture | Annotated static captures with a quiz per field |
| `net-packet-wrap` | `[packet]` wrap | 1.6 | One packet carries three addresses for three jobs, and each hop removes one layer | One packet, one direction, Ethernet only, no TCP behaviour | Same fallback |
| `net-replay-setup-checker` | `[replay]` | 1.2 | The checker names the failure and its fix | Recorded run from the reference solution | `[sequence]` of two actors (learner, lab) with a Predict before each step |
| `net-replay-own-numbers` | `[replay]` | 1.3 | Your numbers live on your computer; the lab reads what you paste | Recorded run | Same fallback |
| `net-replay-virtual-cable` | `[replay]` | 1.4 | One ping starts with ARP | Recorded run | Same fallback |

Do not write any slug into a chapter until it is registered. A chapter with a missing canvas and no Predict-plus-step fallback fails the interactive-first check; record an exception.

## Gate

Gate 1.8 (25 minutes, review within three days, learners carry on). Evidence: the home network map with real numbers, three open questions, and challenge 0 results committed.
- Checklist (verifiable in words): I wrote my address, mask, gateway, DNS server and the IPv4 address a website sees; I ran the setup checker and committed `results.md`; my two namespaces pinged and I committed the capture; I can say which field is TTL in my capture; I have three questions.
- LearningLog: what surprised you about your own numbers; which of the three jobs (MAC, IP, port) you can already explain.
- OPEN_QUESTION: "Draw or describe your home network with your own numbers. Say which address a website sees and which your computer uses, and write three questions you cannot answer yet." Answer may be written, a voice note or a labelled diagram (`minWords: 0` if a link-only answer is allowed, per the playbook). Model answer shows the shape, not the facts. See Roadmap issues 5.
- ChapterRecap: three to six points: two addresses for one device; the lab is a Linux machine inside your computer; one ping is ARP then echo; a packet has MAC, IP and port; two places to type commands.

## Risks

- Likeliest stall: 1.2. Docker Desktop install, the download on metered data, 8 GB of memory, Windows editions, line endings, and a missing `--privileged` flag. Mitigation: start the download first, the five named failures with fixes, `bash script.sh`, idempotent scripts, and the 90-minute slow path. macOS and WSL 2 without Docker Desktop are untested (dossier 5.7); do not claim them as tested.
- Second stall: 1.3 and 1.4 "two places to type". Mitigation: every command block says **On your computer** or **In the lab**, the first lab prompt shows the side, and 1.3 quizzes the difference.
- Third: the lab's `192.168.1.x` addresses look like the learner's real home addresses. Say in 1.4 that the lab is separate.
- Accuracy traps from the dossier: the echo service is a third party and never graded [S52]; the Google IPv6 figure and the cellular CGN study are dated and must be re-checked [S33, S34]; `100.64.0.0/10` is "one sign, not proof" [S11]; do not use "5-tuple" (unverified); ephemeral port ranges differ (IANA vs Linux) [S27, S28]; never put a real public address in a lab, prose or quiz (decision 11, [S10]).
- Prose floor: 1.1 has 15 minutes, which holds 1,200 words (about 6 minutes to read) plus a few commands; keep it to the commands in the roadmap's table.

## Roadmap issues

1. 1.3 teaches `sudo`, but the pinned image package list (roadmap, dossier 5.2) has no `sudo` and the container runs as root. Decide: add `sudo` to the image, or teach `sudo` as "needed on your own Linux, not in the lab".
2. 1.3 says "the checker prints your mask as a prefix" for the learner's real network, but the lab cannot see their real network (roadmap, Build environment) and a Windows host cannot run a bash checker. This brief assumes the learner pastes values into `my-numbers.txt` and the lab checker reads them. Confirm.
3. 1.2 promises "five named failures" but names none. The five above are proposals.
4. Check 1.7 and quiz-only rules: no earlier module exists to mix in, so 1.7 has five new questions.
5. Gate answers may be a "labelled diagram", but `OPEN_QUESTION` has submission modes text, url, url_required, article and video_demo only. A diagram answer needs a link (`url` with `minWords: 0`) until the platform adds an image mode.
