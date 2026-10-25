---
artifact: module-brief
course: networking
module: 05-ports-tcp-udp
version: 1
owner: curriculum-architect
roadmap_version: 3.1
roadmap_confirmed: true
---

# Module 05: Ports, TCP and UDP: which app gets the packet

Source of truth: `02-curriculum-roadmap.md` v3.1, module 5. Core 245 min, slow path 313 min. Source IDs such as [S25] point to `01-research-dossier.md`.

## Outcome

By the end the learner can:
1. List their own open conversations and read one line of the output (5.1).
2. Explain ports, the well-known and ephemeral ranges (IANA's and Linux's differ), and the five numbers that name one conversation (5.2).
3. Say why a phone cannot open `localhost:3000` on a laptop, and read listening sockets (5.3).
4. Explain the TCP handshake, sequence and acknowledgement numbers, and retransmission (5.4).
5. Choose TCP or UDP for an app by delay and by what a lost packet costs (5.5).
6. Run a server on two listening addresses in namespaces, capture SYN, SYN-ACK, ACK and read both sides with `ss` (5.6, challenge 3).

This module carries outcome O4 (with module 4) and part of O7.

## Why this module exists

NAT cannot be understood without ports. In 6.2 the router tells two devices apart by port, and the whole "which device gets which reply?" question is a port question. Module 5 gives the learner the five numbers that name a conversation, so the NAT table is a table of things they can already read. It also answers an everyday bug (a server that works on the laptop but not for the phone) with the listening address, which the lab and the capstone both use.

## Prerequisites

Entry: module 4 done is recommended (5.7 mixes in two module 4 questions, 5.6 reuses the lab habits from 4.7). A working lab shell, and the virtual cable from challenge 1. Netlab slice 1 shipped.

| Needs | From | Used in |
|---|---|---|
| own-addresses | 1.1 | 5.1 |
| namespaces-veth, read-capture (`tcpdump -n -v`) | 1.4 | 5.4, 5.6 |
| packet-fields (addresses, ports, TTL in a real packet) | 1.5 | 5.2 |
| subnet-calc (is the phone on the same subnet?) | 3.2 | 5.3 |
| lpm, ttl-icmp (only for the two mixed questions) | 4.3, 4.4 | 5.7 |

## Chapters

Totals: 8 chapters: 1 Read (5.1), 4 Learn (5.2 to 5.5), 1 Build, 1 Check, 1 Gate. Check file: `05.07-ports-and-transport-quiz.md`.

| # | Chapter | Type | Min | Outcome | Requires | Introduces | Evidence |
|---|---|---|---|---|---|---|---|
| 5.1 | One address, forty conversations | Read | 10 | List your open conversations (`netstat -an` on Windows and macOS, `ss -tn` on Linux) and read one line | own-addresses | none | own conversation list |
| 5.2 | Ports and sockets | Learn | 40 | Explain ports, well-known and ephemeral ranges (IANA's and Linux's differ), and the five numbers that name one conversation (protocol, two addresses, two ports) | packet-fields | ports, conversation-id | netlab check |
| 5.3 | Why your phone cannot open localhost | Learn | 30 | Work through the chain: on the phone, `localhost` is the phone itself, so use the laptop's address; the server must listen on `0.0.0.0`, not `127.0.0.1`; the laptop's firewall and the Wi-Fi's client isolation can still block it. Read listening sockets with `ss -tlnp` or `netstat`. The lab shows the first two; the last two only show on a real network | ports, subnet-calc | listen-address | netlab check |
| 5.4 | TCP: a conversation that survives loss | Learn | 40 | Explain the handshake, sequence and acknowledgement numbers, and retransmission | conversation-id | tcp | in-chapter quiz |
| 5.5 | UDP: why DNS, games and calls skip the handshake | Learn | 30 | Choose TCP or UDP for an app by delay and what a lost packet costs; know DNS also runs over TCP, and a client retries over TCP when a UDP answer is truncated [S71] | tcp | udp | in-chapter quiz |
| 5.6 | Watch a conversation happen | Build | 60 | Run a server in one namespace, first on `127.0.0.1` then on `0.0.0.0`; connect from another; capture SYN, SYN-ACK, ACK; read both sides with `ss` | listen-address, tcp, namespaces-veth | none | challenge 3 tests and capture |
| 5.7 | Ports and transport | Check | 15 | Match replies to sockets; pick TCP or UDP for three apps; two questions from module 4 | conversation-id, udp | none | quiz |
| 5.8 | One line of your capture | Gate | 20 | Explain every number in one line of your capture and what it is for | conversation-id, tcp | none | capture line explained |

Budgets for every chapter below: Learn and Build at least 1,200 prose words; Read, Code and Lab chapters and Gates at least 700 (a proposed course exception that waits for the sponsor's G2C decision; if it is rejected, the Read chapters are re-timed to 15 to 20 minutes); Check is quiz-only. At most 6 top-level components, 25 JSX tags (cap `GlossaryTerm` at 10 per chapter) and 3 assessment interactions. Every diagram has a text legend. Never write the name "5-tuple": the dossier marks it UNVERIFIED, so say "the five numbers".

## Chapter blocks

**5.1 One address, forty conversations** (Read)
- Hook: the module's opening question: one address, forty tabs, a music app and a chat app. When a reply arrives, how does it find the right app? (The roadmap gives no separate "Problem first" for this Read.) Claim: every conversation already has a visible identity, an address and port on each end, and your computer keeps a table of them.
- Example: a recorded sample `netstat -an` line from a composite laptop: `192.168.1.23:51234` to `203.0.113.80:443`, state established. Read it left to right: local address and port, remote address and port, state. Show the Linux `ss -tn` form beside it.
- Diagram: none. `LearningObjectives` sits here.
- Interactive: commands on your computer (never in the lab, which has almost no conversations). Expected output printed for phone readers, plus a recorded example. No predict.
- Assess: a `Checklist` only ("I listed my conversations and read one line aloud"). Near miss: column names and states differ by operating system (the macOS column is unchecked in the dossier); IPv6 lines may appear and are normal. "Forty" is a figure of speech, give no average.

**5.2 Ports and sockets** (Learn)
- Hook: two tabs talk to the same website on port 443; both replies come back to your one address. How does the laptop tell them apart? Claim: the destination port in the reply, together with the other four numbers (protocol, two addresses, source port), picks exactly one socket; a connection is a pair of sockets [S25, S26].
- Example: laptop `192.168.1.23`. Tab 1: TCP `51234` to `203.0.113.80:443`. Tab 2: TCP `51236` to the same server. Chat app: TCP `40000` to `192.0.2.44:5222`. A reply to `203.0.113.80:443` addressed to port `51236` belongs to tab 2. Port `40000` sits inside Linux's default range (32768 to 60999 [S28]) but outside IANA's dynamic range (49152 to 65535 [S27]), which shows the two ranges differ. System ports are 0 to 1023, user ports 1024 to 49151 [S27].
- Diagram: `MermaidDiagram` flowchart: incoming packet to "match the five numbers" to the socket table to the app. Claim: the five numbers are the lookup key.
- Interactive: `net-lab-sockets`: replies arrive at a laptop running three apps; match each to its socket. Predict first: a reply arrives for port `51236`; which socket gets it (tab 1, tab 2, the chat app)?
- Assess: 1 `PREDICT`, 1 `QUIZ` (two sockets that differ only in source port). Near miss: do not claim each tab always opens its own connection (a browser may reuse one); say "two connections". Name no Windows or macOS ephemeral range (no source).

**5.3 Why your phone cannot open localhost** (Learn)
- Hook: your web app works at `http://localhost:3000` on the laptop, but the phone on the same Wi-Fi cannot open it. Why? Claim: a listening address is a promise about which of the machine's addresses will answer; `127.0.0.1` answers only the machine itself, `0.0.0.0` means every address it has.
- Example: laptop `192.168.1.23`, phone `192.168.1.57`, app on port 3000. Phone to `localhost:3000` reaches the phone's own loopback (`127.0.0.0/8` is never forwarded [S9]). Phone to `192.168.1.23:3000` with the app on `127.0.0.1`: refused (the kernel answers no one is listening there; same mechanism as dossier 5.6, loopback binding itself untested, verify at G3). Rebind to `0.0.0.0`: works. Then name the two real-network blockers.
- Diagram: `MermaidDiagram` flowchart of the laptop with two listening choices and the phone's path to each. Claim: where a server listens decides who can connect before any firewall is involved.
- Interactive: `net-lab-listen-address`: move a server between listening addresses and try from two devices. Predict first: the app listens on `127.0.0.1`; the phone opens `192.168.1.23:3000`; what happens (works, refused, no answer)? Model answer "refused", to be confirmed on the lab image at G3.
- Assess: 1 `PREDICT`, 1 `QUIZ` (read a listening line and say who can connect). Near miss: the lab shows only the first two causes; firewall and client isolation are prose and a recorded note, stated plainly, with no figures. The netlab generator covers `ss`, so the output comes from the model's state (untested in the lab: verify at G3). Two hosts may share a direct link in the netlab, so the phone and laptop need no drawn switch.

**5.4 TCP: a conversation that survives loss** (Learn; reinforces read-capture)
- Hook: any network can lose a packet, yet a downloaded file is never missing a byte. Who fixes it? (Keep the roadmap's "Wi-Fi loses packets all the time" out of the text: no source, no rate.) Claim: TCP numbers the bytes and the receiver says which number it expects next; a missing acknowledgement makes the sender send that data again [S25].
- Example: invented small numbers, labelled illustrative. Client `192.168.1.23:51234` to `203.0.113.80:443`. SYN seq 1000; SYN-ACK seq 5000, ack 1001; ACK ack 5001. Then three 100-byte segments from seq 1001; segment 2 (1101) is lost; the server keeps acknowledging 1101; the sender sends 1101 again. No timeout value is quoted.
- Diagram: `MermaidDiagram` sequenceDiagram of only the three handshake packets with their numbers. Claim: each side acknowledges the other's number plus one. The canvas carries the transfer and the loss, so the two do not duplicate.
- Interactive: `net-seq-tcp-loss`, `[sequence: client, server]`, step controls, no input. A `Predict` block sits before it: segment 2 is lost, what does the server send next (an ack for 1101, nothing, an error)?
- Assess: 1 `PREDICT`, 1 `QUIZ` (read a short exchange and say what is resent). Near miss: sequence numbers count bytes, not packets; real starting numbers are not 1000 (say so). RFC 9293 sections beyond the handshake are not yet in the dossier (see Risks).

**5.5 UDP: why DNS, games and calls skip the handshake** (Learn)
- Hook: in a video call, a packet that arrives half a second late is useless. Would you wait for it? Claim: TCP gives every byte in order, so one loss holds back everything behind it; UDP gives each datagram once, with no promise, so an app chooses it when late data is worse than lost data [S26].
- Example: model numbers, labelled illustrative: one audio packet every 20 ms; loss 0%, 5%, 20%; a TCP resend costs one extra round trip, so later packets wait. A file download picks TCP. DHCP uses UDP ports 67 and 68 [S23]. The real DNS query captured in 1.5 used UDP; DNS implementations must support both UDP and TCP, and a truncated UDP answer (TC flag) makes the client retry over TCP [S71].
- Diagram: `MermaidDiagram` flowchart (a decision tree): do you need every byte in order? is late data useless? Claim: choose by what a lost or late packet costs.
- Interactive: `net-timeline-tcp-udp-loss`, a new `[timeline]` model: the same messages over TCP and UDP as loss goes up. Predict first: loss rises from 0% to 10%; whose delay grows (TCP's, UDP's, both)? (TCP's.)
- Assess: 1 `PREDICT`, 1 `QUIZ` (pick TCP or UDP for a chat message, a game position, a file). Near miss: UDP is not "faster", it skips waiting; real browsers may use QUIC over UDP (system design course); do not teach it here.

**5.6 Watch a conversation happen** (Build; see Build spec). Hook (derived): the handshake from 5.4 is words until you capture it. Claim: where the server listens decides whether the handshake even starts, and `tcpdump` and `ss` show the same conversation from two sides.

**5.7 Ports and transport** (Check, 4 questions, one instrument, plain quiz fences with no canvas). Q1: match three replies to their sockets. Q2: TCP or UDP for three apps, answered as one grouped choice. Q3 and Q4 from module 4: pick the route by longest prefix; whose address does a TTL 2 probe return. Near miss: no stem repeats the 5.2 wording.

**5.8 One line of your capture** (Gate; see Gate).

## Build spec: 5.6 Watch a conversation happen (challenge 3, part 1)

- Support: gapped. Folder `challenges/challenge-3-conversation/part-1-conversation/` (names proposed): `README.md`, one script, `results.md`, `test.sh`.
- Topology: namespaces `laptop` (`192.168.1.23/24`) and `server` (`192.168.1.80/24`) on one virtual cable (the challenge 1 pair; if the learner's pair is broken, `toolkit/restore.sh 1.1`).
- Gaps: (1) start the server on `127.0.0.1:8080`, then on `0.0.0.0:8080`; (2) the capture command (`tcpdump -n -i any port 8080` inside the server namespace; tcpdump on the server was tested in dossier 5.5); (3) the `ss` commands for both sides. The tests say which gap fails.
- Must pass: with the server on `0.0.0.0`, `curl -m 3 http://192.168.1.80:8080/` from the laptop exits 0, and the capture contains a SYN, a SYN-ACK and an ACK (`Flags [S]`, `[S.]`, `[.]`).
- Must fail: with the server on `127.0.0.1`, the same `curl` exits 7 (refused). Expected from the mechanism tested in dossier 5.6 (nothing listening, refused, not a timeout); loopback binding itself is untested, verify at G3.
- Untested, verify at G3: the bind syntax of the chosen server (`busybox httpd -p`, or `nc -l`), `ss -tlnp` and `ss -tn` column layouts, holding a connection open long enough to see `ESTAB` on both sides.
- Capture to commit in `results.md`: the three handshake lines, `ss -tlnp` before and after the rebind, `ss -tn` on both sides with the same four numbers mirrored.
- Hint ladder: (1) "Read the Local Address column: who is the server promising to answer?" (2) name `ss -tlnp` and compare `127.0.0.1` with `0.0.0.0`; (3) the exact bind change with the address blank.
- If you are stuck: is the server in the namespace you think (`ip netns exec server ss -tlnp`)? Does `ping 192.168.1.80` work (the layer below)? Is `tcpdump` on `-i any` inside the right namespace? Did you wait for the old server to exit?
- Slow path 90 min. Restore point: `toolkit/restore.sh 3.1`. Phone-only path: the recorded run as a replay.

## Interactions

| Ch | Planned top-level components (max 6) | Assessments (max 3) |
|---|---|---|
| 5.1 | LearningObjectives, TerminalBlock, Callout (run on your computer), Checklist | 0 |
| 5.2 | MermaidDiagram, InteractiveCanvas, predict, quiz, BigWordAlert (socket), MustRead (RFC 6335, the port ranges section) | 2 |
| 5.3 | MermaidDiagram, InteractiveCanvas, predict, quiz, TerminalBlock (`ss -tlnp` sample), Callout (two causes the lab cannot show) | 2 |
| 5.4 | MermaidDiagram, InteractiveCanvas (sequence), predict, quiz, Callout | 2 |
| 5.5 | MermaidDiagram, InteractiveCanvas (timeline), predict, quiz, Callout | 2 |
| 5.6 | Steps, FileTree, TerminalBlock, Callout, InteractiveCanvas (replay, phone-only section), Checklist | 0 |
| 5.7 | 4 quiz fences | 4 (one instrument) |
| 5.8 | Checklist, LearningLog, ChapterRecap, openquestion | 1 |

Diagram plan: MermaidDiagram in 5.2 to 5.5 (at least one per module, one per concept-heavy chapter). The one `MustRead` is the RFC 6335 ranges section in 5.2, about 5 minutes; afterwards the learner can say the three IANA ranges.

## Canvases

| Slug | Chapter | Renderer | Claim | Stated limit | Fallback |
|---|---|---|---|---|---|
| `net-lab-sockets` | 5.2 | `[netlab]` host; explore; slice 1 | The five numbers pick one socket | One host, three apps; ports chosen by the model | `[sequence]` laptop and server, Predict before the key replies only, within the chapter's budget of 3 assessments (exception) |
| `net-lab-listen-address` | 5.3 | `[netlab]` host (two devices); explore; slice 1 | The listening address decides who can connect | Loopback versus all addresses only; no firewall, no client isolation (said on screen) | `[sequence]` laptop and phone, Predict before the key attempts only, within the chapter's budget of 3 assessments |
| `net-seq-tcp-loss` | 5.4 | `[sequence]` client, server (two actors, no input) | Acknowledgements tell the sender what to resend | One scripted loss, no windows, no congestion control, small illustrative numbers | none needed, the renderer exists |
| `net-timeline-tcp-udp-loss` | 5.5 | `[timeline]` new small model, milliseconds (no renderer change) | One loss delays everything behind it on TCP, not on UDP | Model numbers (20 ms packets, one resend round trip), not measurements | A worked-example table of the TCP and UDP runs plus a Predict (roadmap v3.1) |
| `net-replay-conversation` | 5.6 | `[replay]` from the reference run | Predict each command's output, then see it | Recorded, not live | `[sequence]` learner and lab with Predict blocks before the key steps only, within the chapter's budget of 3 assessments |

## Gate: 5.8 One line of your capture (20 min)

- Evidence: one handshake line from the learner's own capture explained number by number, plus challenge 3 committed (`results.md`, `test.sh` passing). Review within three days; learners carry on.
- `openquestion`: "Pick one line from your capture in `results.md`. Explain every number: both addresses, both ports, the flags, the sequence and acknowledgement numbers, and what each is for." `minWords: 0`, `allowSpeechInput: true` so a voice note or labelled diagram link works. Server-only rubric: names all five conversation numbers; says why the source port is not 8080; ties the flag to its handshake step; links the line to the listening address from 5.3.
- Prose (at least 700 words, no new concepts): a model answer on an illustrative line (mark it illustrative; replace with the reference run's recorded line at G3), two weak answers, how this line becomes a NAT table row in module 6. No canvas.
- `Checklist`: challenge 3 committed; both listening addresses captured; I can read the `ss` output. `LearningLog`: "Which of the five numbers would a router have to change to tell two devices apart?" `ChapterRecap`: the five numbers; ephemeral ranges differ; a listening address is a promise; the handshake in three packets; TCP resends, UDP does not.

## Risks

- Likeliest stall: 5.6, the server bind syntax and seeing `ESTAB` on both sides, because a short `curl` closes the connection before `ss` runs. Mitigation: the script holds the connection open (method untested, settle at G3), the stuck list, and a recorded run.
- Second stall: 5.3, a learner thinks `0.0.0.0` is an address to browse to. Mitigation: show it only in the listening column.
- Accuracy traps: "5-tuple" is UNVERIFIED, so use "the five numbers"; IANA's ephemeral range (49152 to 65535) and Linux's (32768 to 60999) differ [S27, S28], and no source gives Windows or macOS defaults; TCP sequence, acknowledgement and retransmission details are beyond what the dossier lists for [S25] (handshake, ports, socket pair), so add an RFC 9293 citation before drafting; UDP has no delivery guarantee [S26]; two tabs may share one connection, say "two connections"; no loss rate for Wi-Fi without a source; the macOS `netstat` output is unverified; the dossier's `ss` and `nc` behaviour is untested.

## Resolved in roadmap v3.1

1. DNS over TCP had no source: resolved. DNS over TCP and the truncation retry are sourced [S71].
2. No fallback for the `[timeline]` models: resolved. The 5.5 model falls back to a worked-example table plus a Predict.
3. 5.1 at 10 minutes against a 1,200-word floor: resolved by the proposed course exception. Read chapters use 700 prose words (decision log, 2026-10-25, pending the sponsor's G2C decision).
4. Two hosts joined without a drawn switch: resolved. Two hosts may share a direct link in the netlab.
5. `ss` missing from the generator: resolved. The generator covers `ss`.

## Still open

- Verify at G3 (untested): `ss` output from the lab generator and on the lab image (5.3, 5.6), loopback binding refusing with exit 7 (5.3, 5.6), the bind syntax of the chosen server (`busybox httpd -p` or `nc -l`), and holding a connection open long enough to see `ESTAB` on both sides.
- RFC 9293 is not yet in the dossier: add a citation before drafting sequence and acknowledgement numbers and retransmission (5.4).
- The 700-word floor for Read, Code and Lab chapters and Gates awaits the sponsor's G2C decision.
