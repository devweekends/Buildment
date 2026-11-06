import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { SITE_SHARE_IMAGE } from "@/lib/site";
import { areaById } from "@/lib/learn-areas";
import { cn } from "@/lib/utils";
import { AreaHero, AreaPage, ComingSoonPanel } from "@/components/areas/area-page";
import { pickFilter } from "@/components/areas/filter-chips";
import { TutorVoicePreview, type TutorBoard } from "@/components/voice/tutor-voice-preview";

export const metadata: Metadata = {
  title: "On-call tutors",
  description: "Call a tutor for any topic and talk it through. It answers out loud and shows you diagrams and code on a board while it talks.",
  alternates: { canonical: "/voice" },
  openGraph: { title: "On-call tutors on Edorax", url: "/voice", images: [SITE_SHARE_IMAGE] },
};

type Line = { who: "agent" | "you"; text: string };

// One tutor per topic, on call. While it talks it can keep a board open: a diagram it draws, the
// commands it runs, the code it writes. Calls are not open yet; the page shows what one looks like.
const TUTORS: { id: string; label: string; note: string; caption: string; board: TutorBoard; call: Line[] }[] = [
  {
    id: "system-design",
    label: "System Design",
    note: "opens first",
    caption: "This box is the load balancer. Watch what happens when one server slows down.",
    board: { kind: "diagram" },
    call: [
      { who: "agent", text: "Hi, I'm your System Design tutor. What do you already know, and what feels hard?" },
      { who: "you", text: "I know what a server is, but not much more." },
      { who: "agent", text: "Then we start as a beginner. I'll draw as we go." },
      { who: "you", text: "Wait, what is a load balancer for?" },
      { who: "agent", text: "This box is the load balancer. Watch what happens when one server slows down." },
    ],
  },
  {
    id: "networking",
    label: "Networking",
    note: "opens later",
    caption: "Your address works and the way out works. Names fail, so it is DNS.",
    board: {
      kind: "terminal",
      title: "Terminal",
      lines: [
        { prompt: true, text: "ip addr show wlan0" },
        { text: "inet 192.168.1.23/24" },
        { prompt: true, text: "ping -c 1 1.1.1.1" },
        { text: "64 bytes from 1.1.1.1: time=18 ms" },
        { prompt: true, text: "nslookup edorax.com" },
        { text: ";; connection timed out" },
      ],
    },
    call: [
      { who: "you", text: "My laptop says connected, but nothing loads." },
      { who: "agent", text: "Let's check three things in order. I'll run them on the board." },
      { who: "agent", text: "Your address works and the way out works. Names fail, so it is DNS." },
    ],
  },
  {
    id: "ai-engineering",
    label: "AI engineering",
    note: "opens later",
    caption: "Same questions, before and after. If the score moves, that is your answer.",
    board: {
      kind: "code",
      title: "eval.py",
      lines: [
        "def score(answer, case):",
        "    hits = [f for f in case.facts if f in answer]",
        "    return len(hits) / len(case.facts)",
        "",
        "before = run_eval(old_pipeline, cases)  # 0.62",
        "after = run_eval(new_pipeline, cases)   # 0.71",
      ],
    },
    call: [
      { who: "you", text: "How do I show my RAG change made things better?" },
      { who: "agent", text: "Let's write the check together. I'll type it on the board." },
      { who: "agent", text: "Same questions, before and after. If the score moves, that is your answer." },
    ],
  },
];

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function VoicePage({ searchParams }: { searchParams: SearchParams }) {
  const area = areaById("voice");
  const query = await searchParams;
  const id = pickFilter(query.topic, TUTORS.map((t) => t.id)) ?? TUTORS[0]!.id;
  const tutor = TUTORS.find((t) => t.id === id)!;

  return (
    <AreaPage>
      <AreaHero
        eyebrow="Tutors"
        title={area.name}
        status={area.status}
        mood="happy"
        intro="Call a tutor and just talk. It answers out loud, and while it talks it can draw, run commands or write code on a board you keep watching."
      />

      <nav aria-label="Tutors" className="mt-8">
        <ul className="flex flex-wrap gap-2">
          {TUTORS.map((t) => {
            const active = t.id === id;
            return (
              <li key={t.id}>
                <Link
                  href={`/voice?topic=${t.id}`}
                  scroll={false}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "inline-flex min-h-11 items-center gap-2.5 rounded-full border-2 py-1 pl-1.5 pr-4 text-[15px] font-bold outline-none transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow",
                    active ? "border-foreground bg-foreground text-background" : "border-input bg-card text-foreground hover:border-foreground",
                  )}
                >
                  <span aria-hidden className={cn("grid size-8 place-items-center rounded-full", active ? "bg-background/15" : "bg-secondary text-primary")}>
                    <Phone className="size-4" />
                  </span>
                  {t.label}
                  <span className={cn("text-sm font-medium", active ? "text-background/70" : "text-muted-foreground")}>{t.note}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-6">
        <TutorVoicePreview name={tutor.label} caption={tutor.caption} board={tutor.board} />
      </div>

      <details className="group mt-6 border-t border-border pt-4">
        <summary className="flex min-h-11 cursor-pointer list-none items-center text-lg font-bold outline-none focus-visible:outline-3 focus-visible:outline-brand-yellow [&::-webkit-details-marker]:hidden">
          Read this call
        </summary>
        <ol className="mt-3 max-w-2xl space-y-2" aria-label={`Sample call with the ${tutor.label} tutor`}>
          {tutor.call.map((line, i) => (
            <li key={i} className="text-base">
              <span className="font-bold">{line.who === "agent" ? "Tutor" : "You"}: </span>
              <span className="text-muted-foreground">{line.text}</span>
            </li>
          ))}
        </ol>
      </details>

      <ComingSoonPanel title="On-call tutors are on the way" action={{ href: "/audiobooks", label: "Listen to a course" }}>
        System Design gets the first tutor. Until then, every narrated course is on the Audiobooks shelf.
      </ComingSoonPanel>
    </AreaPage>
  );
}
