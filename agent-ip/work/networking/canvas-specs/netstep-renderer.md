---
artifact: canvas-spec
course: networking
chapter: 3.3, 3.4, 4.2 to 4.4, 5.2, 5.3, 6.1 to 6.4, 7.2, 8.1, 9.3
slug: renderer netstep (data slugs written per module)
version: 1
owner: interaction-designer
---

# Canvas spec: the `[netstep]` renderer

One generic, data-driven beat renderer for every place the roadmap planned the network lab (`[netlab]`) inside a Learn or Read chapter, until the network lab family (devweekends/Buildment#79) ships a beat mode. It also follows `proposals/2026-10-26-canvases-from-markdown.md`. Each slug is a `data.ts` of plain serialisable parameters, validated by a zod schema, so a Markdown `canvas` fence can feed the same data later, and the same topology can be ported to a `NetLabSpec`.

Register and look: card register, `BeatFrame`, `DotGrid`, `VerdictBanner`, `SvgNode` icons (laptop, phone, server, router, and `switch` drawn as a small card if no icon exists), theme tones only, a viewBox about 420 wide, labels at least 13 units, text QA clean at 375 px in light and dark.

## What one slug describes

```ts
{
  title: string; purpose: string; limits: string;
  devices: [{ id, kind: "host"|"router"|"switch"|"server"|"phone"|"cloud", label, x, y, addresses?: string[] }];
  links: [{ from: id, to: id, label?: string }];
  tables?: [{ id, title, device: id, columns: string[], rows: string[][] }];   // at most two shown at once
  steps: [{
    caption: string;                 // at most 20 words, what happens in this step
    highlight?: { links?: [index], devices?: [id], rows?: [{ table: id, row: number }] };
    packet?: { at: link index, fields: [{ label, value, changed?: boolean }] };   // header chips shown on the link
    tableUpdates?: [{ table: id, row: number, cells: string[] }];   // add or change a row in this step
    verdict?: { text: string; tone: "good"|"warn"|"bad"|"accent" };
    pick?: { prompt: string; options: [{ label: string; correct: boolean; why: string }] };  // a prediction the learner taps before the step plays
  }];
}
```

## Behaviour

- **The picture:** the topology at the top, the packet chips riding on the highlighted link, and below that the visible table or tables, with changed cells marked "changed" in words and in tone. The step caption and the verdict banner sit inside the picture.
- **Controls:** at most two outside the picture, **Next** and **Start over**.
- **Moving packets:** a step with a `packet` animates the chips along the link, 400 to 700 ms and paused off screen. With reduced motion, the chips appear at once.
- **A `pick` step is playable:** the learner taps an option card, sees whether it was right and why, then the step plays. At most two `pick` steps per slug, inside the chapter's assessment budget. This makes each slug the "playable beat" the IP requires.
- **Text alternative:** a polite live region announces the caption, the packet fields and the changed rows of each step.
- **Validation and failure:** a zod schema validates the data, and the tests run it over every slug. Invalid data renders the platform's quiet fallback, not a crash.

## Accuracy rules for data authors

- Real Linux behaviour comes from `01-research-dossier.md` sections 5.5 to 5.8. Examples:
  - TTL 64 at the sender and minus one per router.
  - The masquerade source port is kept unless two flows clash.
  - An unforwarded port is refused; a missing return route is silent loss.
  - An ARP request goes to `ff:ff:ff:ff:ff:ff`.
  - A Linux DHCP client failing is left with no address.
- Command output inside a step (for example an `ip route get` line) must be copied from `recordings/` or the dossier tables, or be clearly a model view ("the router's table").
- Public addresses come from the documentation ranges. MACs are fictional and locally administered (`02:...`), unless a slug shows a recorded capture.
- Each slug teaches one claim, stated in its `spec.md` along with its limits.

## Build (renderer only; data slugs come per module)

- `packages/learning-ui/src/canvas/models/net-step.ts`: the schema and pure step helpers (apply table updates up to step n, validate references).
- `packages/learning-ui/src/canvas/net-step/NetStepCanvas.tsx`, plus two sample slugs that exercise everything:
  - `net-m3-arp-exchange`: a laptop and a phone on a switch; the ARP request broadcast, the reply, the ARP table filling, and one `pick` step.
  - `net-m4-route-longest`: a router table with `10.0.0.0/8`, `10.1.0.0/16` and a default, a packet for `10.1.2.3`, and a `pick` on the matching row.
- Tests: `frontend/tests/unit/canvas/net-step.test.ts` for the schema, table updates over steps, the pick result, server rendering of both samples, and no em dash.
- Registration: the builder registers only the two samples. Module data slugs are registered later by the orchestrator's script.
