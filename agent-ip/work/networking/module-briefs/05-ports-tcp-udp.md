---
artifact: module-brief
course: networking
module: 05-ports-tcp-udp
version: 2
owner: curriculum-architect
roadmap_version: 3.1
roadmap_confirmed: true
agent_ip_version: 0.5.3
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

Budgets for every chapter below (agent-ip v0.5.3, sponsor decision at G2C, 2026-10-26): Learn and Read follow the beats rules (Learn: four to eight beats, at most 70 visible words per beat, 300 to 700 visible words and at least 900 with `GoDeeper` folds, at least one playable beat, no BigWordAlert; Read: one or two beats); Build at least 1,200 prose words; Code, Lab and Gate at least 700; Check is quiz-only. Build, Code, Lab, Check and Gate chapters keep at most 6 top-level components and 25 JSX tags (cap `GlossaryTerm` at 10 per chapter); Learn chapters at most 40 JSX tags; at most 3 assessment interactions in all. Every diagram has a text legend.

## Chapter blocks

**5.1 One address, forty conversations** (Read)
- Hook: the module's opening question: one address, forty tabs, a music app and a chat app. When a reply arrives, how does it find the right app? (The roadmap gives no separate "Problem first" for this Read.) Claim: every conversation already has a visible identity, an address and port on each end, and your computer keeps a table of them.
- Example: a recorded sample `netstat -an` line from a composite laptop: `192.168.1.23:51234` to `203.0.113.80:443`, state established. Read it left to right: local address and port, remote address and port, state. Show the Linux `ss -tn` form beside it.
- Format (agent-ip v0.5.3): `format: beats`, 2 beats (a Read chapter has one or two); at most 70 visible words per beat; depth and the worked example go in `GoDeeper` folds; the commands the chapter asks the learner to run stay as code fences; no BigWordAlert (terms use `GlossaryTerm`). The hook and claim above stay as the chapter's opening lines.
- Beats:
  1. **One line is one conversation** (fixed picture). VisualDiagram `net-m5-netstat-annotated` (annotated picture of real outputs). Shows: a recorded netstat -an line, 192.168.1.23:51234 to 203.0.113.80:443 established, read left to right, with the ss -tn form beside it. Learner: runs netstat -an (Windows, macOS) or ss -tn (Linux) on their own computer, never in the lab, lists their conversations and reads one line aloud; expected output printed for phone readers.
  2. **Your computer keeps a table of them** (fixed picture). MermaidDiagram `mmd-5-1-conversation-table` (inline, no registration). Shows: forty tabs, a music app and a chat app, each a row with an address and port on each end.
- Assessments: no PREDICT or QUIZ; the evidence is a Checklist.
- Components: GlossaryTerm (port, socket, established connection); 1 Callout; LearningObjectives; Checklist; one `GoDeeper` fold per beat; about 10 of 40 JSX tags; 0 of 3 assessments.
- Near miss: Column names and states differ by operating system (the macOS column is unchecked in the dossier); IPv6 lines may appear and are normal. 'Forty' is a figure of speech, give no average. Commands run on your computer, never in the lab, which has almost no conversations.

**5.2 Ports and sockets** (Learn)
- Hook: two tabs talk to the same website on port 443; both replies come back to your one address. How does the laptop tell them apart? Claim: the destination port in the reply, together with the other four numbers (protocol, two addresses, source port), picks exactly one socket; a connection is a pair of sockets [S25, S26].
- Example: laptop `192.168.1.23`. Tab 1: TCP `51234` to `203.0.113.80:443`. Tab 2: TCP `51236` to the same server. Chat app: TCP `40000` to `192.0.2.44:5222`. A reply to `203.0.113.80:443` addressed to port `51236` belongs to tab 2. Port `40000` sits inside Linux's default range (32768 to 60999 [S28]) but outside IANA's dynamic range (49152 to 65535 [S27]), which shows the two ranges differ. System ports are 0 to 1023, user ports 1024 to 49151 [S27].
- Format (agent-ip v0.5.3): `format: beats`, 5 beats; at most 70 visible words per beat, 300 to 700 visible words in all and at least 900 with the `GoDeeper` folds (the claim and worked example above are spread over the beats and their folds); one visual per beat; at least one playable beat; at most 40 JSX tags and 3 assessment interactions; no BigWordAlert (terms use `GlossaryTerm`). The hook above is the chapter's one or two opening sentences.
- Beats:
  1. **Two tabs, one address** (watch only). InteractiveCanvas `net-m5-scene-two-tabs` (the `scene` renderer). Shows: two tabs talk to the same website on port 443 and both replies arrive at the one address 192.168.1.23.
  2. **A port names an app on your computer** (playable). InteractiveCanvas `net-m5-sockets-ports` (`[netlab]`). Shows: a laptop running tab 1, tab 2 and a chat app, each with its own port. Learner: tap an app to see its port and socket.
  3. **Five numbers name one conversation** (playable). InteractiveCanvas `net-m5-five-numbers` (`[netlab]`). Shows: protocol, two addresses and two ports; two tabs differ only in source port. Learner: tap a conversation to light its five numbers.
  4. **Replies find their socket by number** (playable). InteractiveCanvas `net-m5-match-replies` (the `sorter` primitive). Shows: replies arrive for ports 51234, 51236 and 40000; each belongs to one socket. Learner: drop each reply onto its socket; a wrong try says why.
  5. **Port ranges: IANA and Linux differ** (fixed picture). MermaidDiagram `mmd-5-2-port-ranges` (inline, no registration). Shows: 0 to 1023, 1024 to 49151 and 49152 to 65535 on IANA's line; Linux's default ephemeral range 32768 to 60999 on another.
- Predict (right before beat 4, "Replies find their socket by number"): A reply arrives for port 51236. Which socket gets it: tab 1, tab 2 or the chat app? Options: tab 1 / tab 2 / the chat app. Answerable from: beats 2 and 3 have shown each app's port and that two tabs differ only in source port; the learner matches the port.
- Quick check (after the last beat): (1) Two sockets that differ only in source port: which reply goes where (taught in beat 3).
- Components: GlossaryTerm (port, socket, ephemeral port); MustRead (RFC 6335, the port ranges section, in a fold); one `GoDeeper` fold per beat; about 14 of 40 JSX tags; 2 of 3 assessments.
- Near miss: Do not claim each tab always opens its own connection (a browser may reuse one); say 'two connections'. Name no Windows or macOS ephemeral range (no source). Port `40000` sits inside Linux's default range (32768 to 60999 [S28]) but outside IANA's dynamic range (49152 to 65535 [S27]), which shows the two differ. System ports are 0 to 1023, user ports 1024 to 49151 [S27]. A connection is a pair of sockets [S25, S26].

**5.3 Why your phone cannot open localhost** (Learn)
- Hook: your web app works at `http://localhost:3000` on the laptop, but the phone on the same Wi-Fi cannot open it. Why? Claim: a listening address is a promise about which of the machine's addresses will answer; `127.0.0.1` answers only the machine itself, `0.0.0.0` means every address it has.
- Example: laptop `192.168.1.23`, phone `192.168.1.57`, app on port 3000. Phone to `localhost:3000` reaches the phone's own loopback (`127.0.0.0/8` is never forwarded [S9]). Phone to `192.168.1.23:3000` with the app on `127.0.0.1`: refused (the kernel answers no one is listening there; same mechanism as dossier 5.6, loopback binding itself untested, verify at G3). Rebind to `0.0.0.0`: works. Then name the two real-network blockers.
- Format (agent-ip v0.5.3): `format: beats`, 6 beats; at most 70 visible words per beat, 300 to 700 visible words in all and at least 900 with the `GoDeeper` folds (the claim and worked example above are spread over the beats and their folds); one visual per beat; at least one playable beat; at most 40 JSX tags and 3 assessment interactions; no BigWordAlert (terms use `GlossaryTerm`). The hook above is the chapter's one or two opening sentences.
- Beats:
  1. **On the phone, localhost is the phone** (playable). InteractiveCanvas `net-m5-phone-localhost` (`[netlab]`). Shows: the phone's request to localhost:3000 goes to the phone's own loopback, which is never forwarded [S9]. Learner: open localhost:3000 from the phone.
  2. **Use the laptop's address instead** (playable). InteractiveCanvas `net-m5-laptop-address` (`[netlab]`). Shows: the phone at 192.168.1.57 opens 192.168.1.23:3000 on the same Wi-Fi. Learner: type the laptop's address on the phone.
  3. **A server promises certain addresses** (fixed picture). MermaidDiagram `mmd-5-3-listen-promise` (inline, no registration). Shows: 127.0.0.1 answers only the machine itself; 0.0.0.0 means every address it has.
  4. **127.0.0.1 answers only the laptop** (playable). InteractiveCanvas `net-m5-listen-loopback` (`[netlab]`). Shows: with the app on 127.0.0.1 the phone's connection is turned away, and ss shows the listening address. Learner: try from the laptop and from the phone.
  5. **0.0.0.0 answers on every address** (playable). InteractiveCanvas `net-m5-listen-all` (`[netlab]`). Shows: rebinding to 0.0.0.0 lets both devices connect. Learner: move the server between listening addresses and try both devices.
  6. **Two blockers a lab cannot show** (fixed picture). MermaidDiagram `mmd-5-3-real-blockers` (inline, no registration). Shows: the laptop's firewall and the Wi-Fi's client isolation can still block a correctly bound server.
- Predict (right before beat 4, "127.0.0.1 answers only the laptop"): The app listens on 127.0.0.1. The phone opens 192.168.1.23:3000. Does it work? Options: it works / it fails. Answerable from: beat 3 says what each listening address promises; the learner applies it. The reason it fails (refused rather than silence) is shown by the picture and is not asked.
- Quick check (after the last beat): (1) Read a listening line and say who can connect (taught in beats 4 and 5).
- Components: GlossaryTerm (localhost, loopback, listening address, 0.0.0.0); 1 Callout; one `GoDeeper` fold per beat; about 17 of 40 JSX tags; 2 of 3 assessments.
- Near miss: A learner thinks `0.0.0.0` is an address to browse to: show it only in the listening column. The lab shows only the first two causes; firewall and client isolation are prose and a recorded note, stated plainly, with no figures. Loopback binding refusing a remote client (curl exit 7) is shown by the 2026-10-26 test (dossier 5.8). Two hosts may share a direct link in the netlab, so the phone and laptop need no drawn switch.

**5.4 TCP: a conversation that survives loss** (Learn; reinforces read-capture)
- Hook: any network can lose a packet, yet a downloaded file is never missing a byte. Who fixes it? (Keep the roadmap's "Wi-Fi loses packets all the time" out of the text: no source, no rate.) Claim: TCP numbers the bytes and the receiver says which number it expects next; a missing acknowledgement makes the sender send that data again [S25].
- Example: invented small numbers, labelled illustrative. Client `192.168.1.23:51234` to `203.0.113.80:443`. SYN seq 1000; SYN-ACK seq 5000, ack 1001; ACK ack 5001. Then three 100-byte segments from seq 1001; segment 2 (1101) is lost; the server keeps acknowledging 1101; the sender sends 1101 again. No timeout value is quoted.
- Format (agent-ip v0.5.3): `format: beats`, 5 beats; at most 70 visible words per beat, 300 to 700 visible words in all and at least 900 with the `GoDeeper` folds (the claim and worked example above are spread over the beats and their folds); one visual per beat; at least one playable beat; at most 40 JSX tags and 3 assessment interactions; no BigWordAlert (terms use `GlossaryTerm`). The hook above is the chapter's one or two opening sentences.
- Beats:
  1. **Any network can lose a packet** (watch only). InteractiveCanvas `net-m5-scene-lossy-link` (the `scene` renderer). Shows: a file crosses a link that drops a packet, and the download still arrives whole.
  2. **Three packets open a conversation** (fixed picture). MermaidDiagram `mmd-5-4-handshake` (inline, no registration). Shows: SYN seq 1000, SYN-ACK seq 5000 ack 1001, ACK ack 5001: each side acknowledges the other's number plus one; an ack names the next byte expected.
  3. **The receiver names the next byte it expects** (step through). InteractiveCanvas `net-m5-tcp-loss-ack` (`[sequence]`). Shows: three 100-byte segments from seq 1001; segment 2 (1101) is lost; the server keeps acknowledging 1101. Learner: step through the segments.
  4. **The same ack again means: send it again** (step through). InteractiveCanvas `net-m5-tcp-loss-resend` (`[sequence]`). Shows: the sender notices the repeated acknowledgement and sends 1101 again; the next ack jumps to 1301. Learner: step through the resend.
  5. **Which segments must be sent again?** (playable). InteractiveCanvas `net-m5-sort-resend` (the `sorter` primitive). Shows: a short exchange of segments and acks; each segment is arrived or must be resent. Learner: sort each segment given the acks.
- Predict (right before beat 3, "The receiver names the next byte it expects"): Segment 2 is lost. What does the server send next: an ack for 1101, nothing, or an error? Options: an ack for 1101 / nothing / an error. Answerable from: beat 2 has just said that an ack names the next byte the receiver expects; the receiver still expects 1101.
- Quick check (after the last beat): (1) Read a short exchange and say what is resent (taught in beats 3 to 5).
- Components: GlossaryTerm (sequence number, acknowledgement, retransmission); 1 Callout; one `GoDeeper` fold per beat; about 14 of 40 JSX tags; 2 of 3 assessments.
- Near miss: Sequence numbers count bytes, not packets; real starting numbers are not 1000 (say so; all numbers are labelled illustrative). Keep 'Wi-Fi loses packets all the time' out of the text: no source, no rate. No timeout value is quoted. RFC 9293 sections beyond the handshake are not yet in the dossier (see Risks).

**5.5 UDP: why DNS, games and calls skip the handshake** (Learn)
- Hook: in a video call, a packet that arrives half a second late is useless. Would you wait for it? Claim: TCP gives every byte in order, so one loss holds back everything behind it; UDP gives each datagram once, with no promise, so an app chooses it when late data is worse than lost data [S26].
- Example: model numbers, labelled illustrative: one audio packet every 20 ms; loss 0%, 5%, 20%; a TCP resend costs one extra round trip, so later packets wait. A file download picks TCP. DHCP uses UDP ports 67 and 68 [S23]. The real DNS query captured in 1.5 used UDP; DNS implementations must support both UDP and TCP, and a truncated UDP answer (TC flag) makes the client retry over TCP [S71].
- Format (agent-ip v0.5.3): `format: beats`, 5 beats; at most 70 visible words per beat, 300 to 700 visible words in all and at least 900 with the `GoDeeper` folds (the claim and worked example above are spread over the beats and their folds); one visual per beat; at least one playable beat; at most 40 JSX tags and 3 assessment interactions; no BigWordAlert (terms use `GlossaryTerm`). The hook above is the chapter's one or two opening sentences.
- Beats:
  1. **A late packet in a call is useless** (watch only). InteractiveCanvas `net-m5-scene-late-audio` (the `scene` renderer). Shows: one audio packet every 20 ms; a packet that arrives half a second late is skipped.
  2. **TCP holds back everything behind a loss** (playable). InteractiveCanvas `net-m5-tcp-loss-timeline` (`[timeline]`). Shows: the same messages over TCP: one loss costs a resend round trip and the packets behind it wait. Learner: drag the loss rate from 0% up.
  3. **UDP delivers what arrives and moves on** (playable). InteractiveCanvas `net-m5-udp-loss-timeline` (`[timeline]`). Shows: the same messages over UDP: a lost packet is simply missing, nothing waits. Learner: drag the loss rate from 0% up.
  4. **Sort six apps by what a loss costs** (playable). InteractiveCanvas `net-m5-sort-tcp-udp` (the `sorter` primitive). Shows: a video call, an email, DNS, a web page, a live score and a file backup. Learner: drop each app on TCP or UDP; a wrong try says why.
  5. **DNS uses UDP, and TCP when cut short** (fixed picture). MermaidDiagram `mmd-5-5-dns-fallback` (inline, no registration). Shows: a truncated UDP answer makes the client retry over TCP [S71].
- Predict (right before beat 2, "TCP holds back everything behind a loss"): Loss rises from 0% to 10%. Whose delay grows: TCP's, UDP's, or both? Options: TCP's / UDP's / both. Answerable from: the hook (a late packet is useless) and 5.4 (a missing acknowledgement makes the sender send again) give the reasoning.
- Quick check (after the last beat): (1) TCP or UDP for a chat message, a game position and a file (taught in beats 2 to 4).
- Components: GlossaryTerm (TCP, UDP, datagram); 1 Callout; one `GoDeeper` fold per beat; about 14 of 40 JSX tags; 2 of 3 assessments.
- Near miss: UDP is not 'faster', it skips waiting; real browsers may use QUIC over UDP (system design course): do not teach it here. DHCP uses UDP ports 67 and 68 [S23]. Model numbers are illustrative (20 ms packets, one resend round trip).

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

Updated for agent-ip v0.5.3 (Learn chapters are visual-first beats). Per-chapter beats, predicts and quizzes are in each chapter block above and, with the density counts, in `interaction-map.yaml`. Counting rules from `audit-course.mjs`: a tag is any opening `<Component`; child tags (Step, TerminalLine, CompareColumn, TraceStep) count toward the total but not toward the 6 top-level names; quiz, predict and openquestion fences are free of tags and count as assessments; command output goes in plain code fences, not TerminalBlock.

Budgets by chapter type (sponsor decision at G2C, 2026-10-26, and `03-authoring-standards.md` → Visual-first Learn chapters):

- Learn: beats rules. Four to eight beats, one visual each, at most 70 visible words per beat, 300 to 700 visible words and at least 900 with `GoDeeper` folds, at least one playable beat, at most 40 JSX tags, at most 3 assessment interactions (one Predict before the key beat, one or two quiz questions at the end), no BigWordAlert.
- Read: one or two beats, at most 70 visible words each, depth in folds, no BigWordAlert.
- Build: at least 1,200 prose words; at most 6 top-level components and 25 JSX tags; a diagram; at most one BigWordAlert and only for a load-bearing term.
- Code, Lab and Gate: at least 700 prose words; same component and tag limits as Build; a Gate has no canvas and no new content.
- Check: quiz-only (three to five questions, one instrument), no canvas, no lesson text.

| Ch | Format | Components | JSX tags (est.) | Assessments | Text budget |
|---|---|---|---|---|---|
| 5.1 | beats (2) | 2 beat visuals (diagrams), GoDeeper x2, GlossaryTerm x3, Callout x1, LearningObjectives, Checklist | 10 | none | one or two beats, at most 70 words each |
| 5.2 | beats (5) | 5 beat visuals (4 canvas, 1 diagram), GoDeeper x5, GlossaryTerm x3, MustRead (in a fold) | 14 | PREDICT, QUIZ | at most 70 words a beat; 300 to 700, 900+ with folds |
| 5.3 | beats (6) | 6 beat visuals (4 canvas, 2 diagram), GoDeeper x6, GlossaryTerm x4, Callout x1 | 17 | PREDICT, QUIZ | at most 70 words a beat; 300 to 700, 900+ with folds |
| 5.4 | beats (5) | 5 beat visuals (4 canvas, 1 diagram), GoDeeper x5, GlossaryTerm x3, Callout x1 | 14 | PREDICT, QUIZ | at most 70 words a beat; 300 to 700, 900+ with folds |
| 5.5 | beats (5) | 5 beat visuals (4 canvas, 1 diagram), GoDeeper x5, GlossaryTerm x3, Callout x1 | 14 | PREDICT, QUIZ | at most 70 words a beat; 300 to 700, 900+ with folds |
| 5.6 | prose | Steps, FileTree, MermaidDiagram, Callout, InteractiveCanvas (replay), Checklist | 18 | none | 1,200 prose words |
| 5.7 | prose | none | 0 | QUIZ x4 | quiz only |
| 5.8 | prose | Checklist, LearningLog, ChapterRecap, openquestion | 4 | OPEN_QUESTION | 700 prose words |

`LearningObjectives` in 5.1, `ChapterRecap` in 5.8. The one MustRead (RFC 6335 ranges, about 5 minutes) sits in a 5.2 fold.

Diagram plan: Beat diagrams: the conversation table (5.1), the IANA and Linux port ranges (5.2), the listening promise and the two blockers a lab cannot show (5.3), the three-packet handshake (5.4), the DNS fallback to TCP (5.5). 5.6 gets a topology diagram, added in this revision because the audit requires a diagram in every chapter that is not a Check or Gate.

Changes to the earlier plan in this revision (interaction designer, G3):

- 5.6: Added a MermaidDiagram and dropped TerminalBlock to stay at six top-level components (audit: a diagram in every chapter that is not a Check or Gate).

## Canvases

Canvas decisions (interaction designer, G3):

- Sockets and listening addresses (5.2, 5.3) are host behaviour, so they use `[netlab]` host (slice 1, two hosts may share a direct link) in beat mode; the replies-to-sockets match is a `sorter` beat on the existing primitive.
- 5.4 TCP uses the existing `[sequence]` renderer for the scripted loss (watch only, no input) and a `sorter` beat for the playable part (which segments must be sent again), so no new renderer is needed.
- 5.5 uses the new `[timeline]` model (milliseconds, no renderer change) with one draggable loss control in each of two beats, plus a `sorter` beat; the fallback is a worked-example table plus a Predict (roadmap v3.1).
- 5.1 is a Read chapter: one annotated picture of a `netstat` line and a table diagram; the learner's own computer is the interactive piece.

Slugs follow the registry convention `net-m<module>-<name>` (graded labs keep `net-lab-`) and are proposed: none is written into a chapter until it is built and registered. The full registry with modes and chapters is in `interaction-map.yaml`. Fallbacks are named per chapter below the table.

| Slug (proposed) | Renderer | Chapter, beat | Mode | What it shows |
|---|---|---|---|---|
| `net-m5-scene-two-tabs` | the scene renderer | 5.2, beat 1 | watch only | two tabs talk to the same website on port 443 and both replies arrive at the one address 192.168.1.23 |
| `net-m5-sockets-ports` | [netlab] | 5.2, beat 2 | playable | a laptop running tab 1, tab 2 and a chat app, each with its own port |
| `net-m5-five-numbers` | [netlab] | 5.2, beat 3 | playable | protocol, two addresses and two ports; two tabs differ only in source port |
| `net-m5-match-replies` | the sorter primitive | 5.2, beat 4 | playable | replies arrive for ports 51234, 51236 and 40000; each belongs to one socket |
| `net-m5-phone-localhost` | [netlab] | 5.3, beat 1 | playable | the phone's request to localhost:3000 goes to the phone's own loopback, which is never forwarded [S9] |
| `net-m5-laptop-address` | [netlab] | 5.3, beat 2 | playable | the phone at 192.168.1.57 opens 192.168.1.23:3000 on the same Wi-Fi |
| `net-m5-listen-loopback` | [netlab] | 5.3, beat 4 | playable | with the app on 127.0.0.1 the phone's connection is turned away, and ss shows the listening address |
| `net-m5-listen-all` | [netlab] | 5.3, beat 5 | playable | rebinding to 0.0.0.0 lets both devices connect |
| `net-m5-scene-lossy-link` | the scene renderer | 5.4, beat 1 | watch only | a file crosses a link that drops a packet, and the download still arrives whole |
| `net-m5-tcp-loss-ack` | [sequence] | 5.4, beat 3 | step through | three 100-byte segments from seq 1001; segment 2 (1101) is lost; the server keeps acknowledging 1101 |
| `net-m5-tcp-loss-resend` | [sequence] | 5.4, beat 4 | step through | the sender notices the repeated acknowledgement and sends 1101 again; the next ack jumps to 1301 |
| `net-m5-sort-resend` | the sorter primitive | 5.4, beat 5 | playable | a short exchange of segments and acks; each segment is arrived or must be resent |
| `net-m5-scene-late-audio` | the scene renderer | 5.5, beat 1 | watch only | one audio packet every 20 ms; a packet that arrives half a second late is skipped |
| `net-m5-tcp-loss-timeline` | [timeline] | 5.5, beat 2 | playable | the same messages over TCP: one loss costs a resend round trip and the packets behind it wait |
| `net-m5-udp-loss-timeline` | [timeline] | 5.5, beat 3 | playable | the same messages over UDP: a lost packet is simply missing, nothing waits |
| `net-m5-sort-tcp-udp` | the sorter primitive | 5.5, beat 4 | playable | a video call, an email, DNS, a web page, a live score and a file backup |
| `net-m5-replay-conversation` | replay | 5.6 (phone-only section) | replay | predict each command's output, then see the recorded result from the reference run |

Inline diagram beats (MermaidDiagram, VisualDiagram, TraceRequest; no registration): 5.1 beat 1 `net-m5-netstat-annotated`; 5.1 beat 2 `mmd-5-1-conversation-table`; 5.2 beat 5 `mmd-5-2-port-ranges`; 5.3 beat 3 `mmd-5-3-listen-promise`; 5.3 beat 6 `mmd-5-3-real-blockers`; 5.4 beat 2 `mmd-5-4-handshake`; 5.5 beat 5 `mmd-5-5-dns-fallback`.

Stated limits and fallbacks by chapter:

- 5.2: limit: One host, three apps; ports chosen by the model. Fallback if not built: [sequence] laptop and server, Predict before the key beat only, within the chapter's budget of 3 assessments (exception). Needs netlab slice 1.
- 5.3: limit: Loopback versus all addresses only; no firewall, no client isolation (said on screen). Fallback if not built: [sequence] laptop and phone, Predict before the key beat only, within the chapter's budget of 3 assessments. Needs netlab slice 1.
- 5.4: limit: One scripted loss, no windows, no congestion control, small illustrative numbers. Fallback if not built: none needed for the sequence beats, the renderer exists; the sorter beat has a quiz fallback.
- 5.5: limit: Model numbers (20 ms packets, one resend round trip), not measurements. Fallback if not built: a worked-example table of the TCP and UDP runs plus a Predict (roadmap v3.1).
- Replays and labs: a replay falls back to a `[sequence]` of two actors (learner, lab) with Predict blocks before the key steps only, within the chapter's budget of 3 assessments; a graded lab that is blocked falls back to a diagnosis from recorded command output, graded as a quiz (roadmap).

Netlab beats need slice 1 (decision 2). `[sequence]` takes no input, so its beats are watch-only; the sorter beats carry the playable requirement in 5.4. Never write the name '5-tuple' (UNVERIFIED): say 'the five numbers'.

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
3. 5.1 at 10 minutes against a 1,200-word floor: resolved by the proposed course exception. Read chapters use 700 prose words (decision log, 2026-10-25; decided by the sponsor at G2C on 2026-10-26 and, for Learn and Read chapters, superseded by the beats rules of agent-ip v0.5.3).
4. Two hosts joined without a drawn switch: resolved. Two hosts may share a direct link in the netlab.
5. `ss` missing from the generator: resolved. The generator covers `ss`.

## Still open

- Verify at G3 (untested): `ss` output from the lab generator and on the lab image (5.3, 5.6), loopback binding refusing with exit 7 (5.3, 5.6), the bind syntax of the chosen server (`busybox httpd -p` or `nc -l`), and holding a connection open long enough to see `ESTAB` on both sides.
- RFC 9293 is not yet in the dossier: add a citation before drafting sequence and acknowledgement numbers and retransmission (5.4).
- Prose floors are decided (sponsor, G2C, 2026-10-26): Build 1,200 prose words; Code, Lab and Gate 700; Learn and Read follow the beats rules (agent-ip v0.5.3, decision log 2026-10-26); Check chapters are quiz-only.
