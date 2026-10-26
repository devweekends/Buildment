---
artifact: canvas-spec
course: networking
chapter: 1.2, 1.3, 1.4, 1.5, 1.6
slug: net-m1-packet-dns, net-m1-packet-echo, net-m1-packet-own-lines, net-m1-packet-change, net-m1-packet-jobs, net-m1-packet-wrap, net-m1-packet-unwrap, net-m1-replay-setup-checker, net-m1-replay-own-numbers, net-m1-replay-virtual-cable, net-m1-scene-broadcast-mac
version: 1
owner: interaction-designer
---

# Canvas spec: the packet renderer, the terminal replay, and one scene

Two new reusable components serve module 1 and later modules: `[packet]` (one component, six modes) and `[replay]` (one component, data per slug). One scene uses the existing `scene` renderer as data only. Visual register: card style (`BeatFrame`, `DotGrid`, `VerdictBanner`, `SvgNode`, theme tones, viewBox about 420 wide, labels at least 13 units). Every packet and every replay is **real**: the data comes from captures and runs recorded in the lab (`work/networking/recordings/`), not invented.

## A. The packet renderer `[packet]`

A packet is drawn as nested header bands, outermost on top: Ethernet (this link), IP (the whole path), then ICMP or UDP or TCP, then the payload. Each field is a tappable chip inside its band, showing its value. One field card under the bands explains the selected field in three short lines: **what it is**, **who set it** (your laptop, the router, the program), **where the course explains it** (module number). A verdict line names what the picture shows in words.

Shared model (`models/net-packet.ts`): a packet is a list of layers, each with fields `{id, label, value, what, who, module}`; helpers to wrap a payload in layers, to unwrap the outer layer, to apply a router hop (new source and destination MAC, TTL minus one), and to compare two packets field by field. Pure, tested.

### Modes and slugs

| Slug | Mode | Claim | Touch | Data |
|---|---|---|---|---|
| `net-m1-packet-dns` | inspect | A DNS query names two computers (addresses), the app on each end (ports) and how many hops it may take (TTL). | Tap any field. | The real DNS query captured in the lab (recording `dns-query`). |
| `net-m1-packet-echo` | inspect | A ping has addresses, a TTL and a type, and no port: ICMP has no ports. | Tap any field; the empty "port" slot is shown greyed with "ICMP has no ports". | The real echo request from challenge 1 (recording `echo-request`). |
| `net-m1-packet-own-lines` | lines | Each line of `tcpdump -n -v -e` is one packet, and its words are the fields. | Tap one of the three real capture lines (ARP request, echo request, echo reply); the matching fields light in the bands. | Recording `cable-capture`. |
| `net-m1-packet-change` | change | Ping a different computer and only the destination address (and the destination MAC) change; the rest stays. | Pick one of two destinations (`192.168.1.20`, `192.168.1.30`); changed fields light. | Echo request plus the same with the other destination; the second MAC is fictional and locally administered (`02:00:00:00:00:30`), labelled so. |
| `net-m1-packet-jobs` | jobs | Three headers do three jobs: this link (MAC), the whole path (IP address), the app (port). | Tap a header to see its job and who reads it. | A fictional web request: laptop `192.168.1.23` to server `203.0.113.80`, port 80, fictional MACs. |
| `net-m1-packet-wrap` | wrap | Sending wraps the message from the inside out: TCP, then IP, then Ethernet last. | Tap the next header to add it; the packet grows outward. Wrong order is refused with the reason. | Same as jobs. |
| `net-m1-packet-unwrap` | unwrap | A router takes off only the outer Ethernet header, reads the IP header, lowers TTL by one, and wraps a new Ethernet header for the next link. | Step the packet through the router: Strip, Read, New header. | Same as jobs; the router's two MACs fictional. TTL 64 becomes 63 (dossier 5.8 showed 62 after two routers). |

Copy rules: no new idea in the field cards that the module brief does not teach; "who set it" for TTL is "your laptop's operating system (64 by default on Linux, [S28])".

## B. The terminal replay `[replay]`

A recorded lab session, played one command at a time on a dark terminal card inside `BeatFrame`. For the key steps (at most two per slug, inside the chapter's budget of three assessments), the output is hidden and the learner first picks one of three outputs; then the real output appears with a one-line note. Other steps just reveal on **Next**. Controls: **Next** and **Start over**. A phone reader thus sees exactly what a laptop learner sees, and still predicts.

Data per slug: `{steps: [{runsOn: "lab" | "computer", command, output, note, predict?: {options: [a,b,c], correct}}]}`. The `runsOn` label is shown on every step ("In the lab" or "On your computer").

| Slug | Recording | Predict steps |
|---|---|---|
| `net-m1-replay-setup-checker` | the setup checker on a working lab, then the same checker outside the lab container | which check fails when run outside the lab |
| `net-m1-replay-own-numbers` | `check-numbers.sh` on a filled `my-numbers.txt` with a dotted mask and with a macOS hex mask | the prefix printed for `0xffffff00` |
| `net-m1-replay-virtual-cable` | challenge 1 part 1: `cable.sh`, the ping, the capture, the must-fail ping | how many lines the capture shows before the echo request (the ARP request and reply) |

## C. The scene `net-m1-scene-broadcast-mac`

Existing `scene` renderer, data only: four devices on one link; the laptop's ARP request to `ff:ff:ff:ff:ff:ff` reaches all three others; only the phone replies, by unicast. Verdict: "One broadcast, one answer."

## Accessibility (all)
Fields and steps are buttons with names ("TTL, 64, set by your laptop") and `aria-pressed`; the field card and each revealed output are in a polite live region; reduced motion shows the final state; colour is never the only signal (changed fields also get "changed" in words).

## Acceptance criteria
- [ ] Each claim is testable; the packet model and the replay data are tested (`frontend/tests/unit/canvas/net-packet.test.ts`), including that every replay output is a real recorded output and every packet value matches its recording.
- [ ] `canvas-text-qa` reports no collisions at 375 px in light and dark.
- [ ] Each chapter places a predict before its key beat and a quiz after the last beat.
- [ ] Each canvas has a text summary and a limits fold.

## Build plan
- Models: `packages/learning-ui/src/canvas/models/net-packet.ts`, `models/net-replay.ts` (types only if small).
- Components: `net-m1-packet-dns/PacketCanvas.tsx` (all packet modes), `net-m1-replay-setup-checker/ReplayCanvas.tsx`; a `data.ts` and `spec.md` per slug; the scene as data under `net-m1-scene-broadcast-mac/`.
- Data: from `agent-ip/work/networking/recordings/*.txt`.
- Register all eleven slugs (both slug lists, the frontend copy and `registry.ts`).
