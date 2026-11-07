import { Mic, PanelLeft, X } from "lucide-react";
import { cn } from "@/lib/utils";

// What a tutor call will look like: a quiet voice view (a breathing orb, one caption, three controls)
// next to a board the tutor draws on while it talks, the way a voice assistant can keep a screen open
// while it speaks. A preview: nothing here is live yet.

export type TutorBoard =
  | { kind: "diagram" }
  | { kind: "terminal"; title: string; lines: { prompt?: boolean; text: string }[] }
  | { kind: "code"; title: string; lines: string[] };

const INK = "#0A0F2C";
const COBALT = "#2434E0";
const YELLOW = "#FFC933";

/** Users, a load balancer and two servers; the tutor is drawing the second link and has circled the balancer. */
function DiagramBoard() {
  return (
    <svg viewBox="0 0 360 220" role="img" aria-label="The tutor's drawing: users, a load balancer, and two servers behind it" className="h-auto w-full">
      <rect x="14" y="86" width="70" height="44" fill={COBALT} />
      <text x="49" y="113" textAnchor="middle" fontSize="13" fontWeight="700" fill="#F6F7FB">Users</text>
      <path d="M84 108 H140" stroke={INK} strokeWidth="2.5" />
      <rect x="140" y="86" width="96" height="44" fill="#FFFFFF" stroke={INK} strokeWidth="2.5" />
      <text x="188" y="113" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>Load balancer</text>
      {/* The tutor's circle around the part it is talking about. */}
      <ellipse cx="188" cy="108" rx="66" ry="38" fill="none" stroke={YELLOW} strokeWidth="4" strokeLinecap="round" strokeDasharray="300" className="motion-safe:animate-[tutor-draw_2.4s_ease-out_both]" />
      <path d="M236 98 L286 50" stroke={INK} strokeWidth="2.5" />
      <rect x="276" y="22" width="74" height="40" fill="#FFFFFF" stroke={INK} strokeWidth="2.5" />
      <text x="313" y="47" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>Server A</text>
      <path d="M236 118 L286 166" stroke={INK} strokeWidth="2.5" strokeDasharray="300" className="motion-safe:animate-[tutor-draw_1.6s_ease-out_0.8s_both]" />
      <rect x="276" y="154" width="74" height="40" fill="#FFFFFF" stroke={INK} strokeWidth="2.5" strokeDasharray="6 4" />
      <text x="313" y="179" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>Server B</text>
    </svg>
  );
}

function Caret() {
  return <span aria-hidden className="ml-0.5 inline-block h-[1.1em] w-2 translate-y-[0.2em] bg-current motion-safe:animate-pulse" />;
}

function Board({ board }: { board: TutorBoard }) {
  if (board.kind === "diagram") {
    return (
      <div className="grid h-full place-items-center bg-[radial-gradient(circle,rgb(10_15_44/0.12)_1px,transparent_1px)] bg-[size:16px_16px] p-4">
        <DiagramBoard />
      </div>
    );
  }
  const terminal = board.kind === "terminal";
  return (
    <div className="flex h-full flex-col bg-[#0A0F2C] text-[#E8EBFF]">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2 text-xs font-bold text-[#AAB3DE]">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
        </span>
        {board.title}
      </div>
      <pre className="flex-1 overflow-x-auto p-4 font-mono text-[13px] leading-6 sm:text-sm">
        {terminal
          ? board.lines.map((line, i) => (
              <div key={i} className={line.prompt ? "text-[#F6F7FB]" : "text-[#AAB3DE]"}>
                {line.prompt ? <span className="text-[#FFC933]">$ </span> : "  "}
                {line.text}
                {i === board.lines.length - 1 ? <Caret /> : null}
              </div>
            ))
          : board.lines.map((line, i) => (
              <div key={i}>
                {line || " "}
                {i === board.lines.length - 1 ? <Caret /> : null}
              </div>
            ))}
      </pre>
    </div>
  );
}

function ControlButton({ label, className, children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <span title={label} className={cn("grid size-14 place-items-center rounded-full", className)}>
      {children}
      <span className="sr-only">{label}</span>
    </span>
  );
}

export function TutorVoicePreview({ name, caption, board }: { name: string; caption: string; board: TutorBoard }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-card" data-testid="tutor-voice">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        {/* The board the tutor keeps on screen while it talks. */}
        <div className="flex min-h-[15rem] min-w-0 flex-col border-b border-border md:min-h-[26rem] md:border-b-0 md:border-r">
          <div className="flex items-center justify-between px-4 py-2.5 text-sm">
            <span className="font-bold">Board</span>
            <span className="min-w-0 truncate pl-3 text-muted-foreground">{name} tutor is showing you</span>
          </div>
          <div className="min-h-0 flex-1 border-t border-border">
            <Board board={board} />
          </div>
        </div>

        {/* The voice view: nothing but the tutor's voice, what it is saying, and three buttons. */}
        <div className="flex min-w-0 flex-col items-center px-6 pb-6 pt-8 text-center">
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">Preview</span>
          <div aria-hidden className="relative mt-8 grid size-36 place-items-center sm:size-40">
            <span className="absolute inset-0 rounded-full bg-primary/15 motion-safe:animate-[tutor-orb_2.8s_ease-in-out_infinite]" />
            <span className="absolute inset-4 rounded-full bg-primary/25 motion-safe:animate-[tutor-orb_2.8s_ease-in-out_0.35s_infinite]" />
            <span className="relative size-24 rounded-full bg-primary motion-safe:animate-[tutor-orb_2.8s_ease-in-out_0.7s_infinite] sm:size-28" />
          </div>
          <p className="mt-6 text-sm font-bold text-muted-foreground">{name} tutor is speaking</p>
          <figcaption className="mt-2 max-w-xs text-lg leading-snug">{caption}</figcaption>
          <div className="mt-auto flex items-center gap-5 pt-8" aria-label="Call controls (preview)">
            <ControlButton label="Mute" className="border-2 border-input text-foreground">
              <Mic aria-hidden className="size-6" />
            </ControlButton>
            <ControlButton label="Hide the board" className="border-2 border-input text-foreground">
              <PanelLeft aria-hidden className="size-6" />
            </ControlButton>
            <ControlButton label="End call" className="bg-[#D92D20] text-white">
              <X aria-hidden className="size-6" />
            </ControlButton>
          </div>
        </div>
      </div>
    </figure>
  );
}
