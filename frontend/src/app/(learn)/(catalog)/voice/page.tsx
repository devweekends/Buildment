import type { Metadata } from "next";
import { SITE_SHARE_IMAGE } from "@/lib/site";
import { areaById } from "@/lib/learn-areas";
import { AreaHero, AreaPage, ComingSoonPanel } from "@/components/areas/area-page";
import Link from "next/link";
import { MicOff, Phone, PhoneOff, Volume2 } from "lucide-react";
import { pickFilter } from "@/components/areas/filter-chips";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "On-call tutors",
  description: "Call a tutor for any topic, start talking and ask about anything that feels hard. It explains in plain words and keeps your place.",
  alternates: { canonical: "/voice" },
  openGraph: { title: "On-call tutors on Edorax", url: "/voice", images: [SITE_SHARE_IMAGE] },
};

type Line = { who: "agent" | "you"; text: string };

// One tutor per topic, on call: you ring them, they pick up. The sample calls are written out; calls are not open yet.
const TOPICS: { id: string; label: string; note: string; call: Line[] }[] = [
  {
    id: "system-design",
    label: "System Design",
    note: "Opens first.",
    call: [
      { who: "agent", text: "Hi, I'm your System Design tutor. What do you already know, and what feels hard?" },
      { who: "you", text: "I know what a server is, but not much more." },
      { who: "agent", text: "Then we start as a beginner. Module 2 is about why waiting suddenly gets long. Want the two-minute version first?" },
      { who: "you", text: "Wait, what is a load balancer for?" },
      { who: "agent", text: "It spreads requests over several servers, so one busy server does not slow everyone down. That is module 4. Shall we go there next?" },
    ],
  },
  {
    id: "networking",
    label: "Networking",
    note: "Opens later.",
    call: [
      { who: "agent", text: "Hi, I'm your Networking tutor. Where would you like to start?" },
      { who: "you", text: "My laptop says connected, but nothing loads." },
      { who: "agent", text: "Good place to start. Let's check three things in order: your address, the way out of your network, then names. Can you open a terminal?" },
    ],
  },
  {
    id: "ai-engineering",
    label: "AI engineering",
    note: "Opens later.",
    call: [
      { who: "agent", text: "Hi, I'm your AI engineering tutor. Building something, or getting ready for an interview?" },
      { who: "you", text: "Interview. I always get stuck on evals." },
      { who: "agent", text: "Then let's practise one answer out loud: how would you know your RAG system got better after a change?" },
    ],
  },
];

const HOW = [
  ["Pick a tutor and call", "One tutor per topic. Press Call and say where you want to start."],
  ["Say your level", "It checks with one or two questions instead of trusting a label."],
  ["Ask anything", "Interrupt at any point. It answers briefly, then brings you back."],
  ["Your place is kept", "The next call picks up where you stopped."],
] as const;

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function VoicePage({ searchParams }: { searchParams: SearchParams }) {
  const area = areaById("voice");
  const query = await searchParams;
  const id = pickFilter(query.topic, TOPICS.map((t) => t.id)) ?? TOPICS[0]!.id;
  const topic = TOPICS.find((t) => t.id === id)!;

  return (
    <AreaPage>
      <AreaHero
        eyebrow="Tutors"
        title={area.name}
        status={area.status}
        mood="happy"
        intro="A tutor on call for every topic. Pick one, press Call and start talking. Ask anything that feels hard; it answers in plain words and keeps your place for the next call."
      />

      {/* Tutors are on call: pick one, then call. The list reads like contacts, each with its line status. */}
      <nav aria-label="Tutors" className="mt-8">
        <ul className="grid gap-3 sm:grid-cols-3">
          {TOPICS.map((t) => {
            const active = t.id === id;
            return (
              <li key={t.id}>
                <Link
                  href={`/voice?topic=${t.id}`}
                  scroll={false}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "flex min-h-16 items-center gap-3 border-2 bg-card px-4 py-3 outline-none transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow",
                    active ? "border-foreground" : "border-border hover:border-foreground",
                  )}
                >
                  <span aria-hidden className={cn("grid size-10 shrink-0 place-items-center rounded-full", active ? "bg-foreground text-background" : "bg-secondary text-primary")}>
                    <Phone className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-base font-bold leading-tight">{t.label} tutor</span>
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <span aria-hidden className="size-2 rounded-full bg-emerald-500" />
                      On call · {t.note.replace(/\.$/, "").toLowerCase()}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <section aria-label={`${topic.label} tutor`} className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        {/* The call screen: what it looks like with the tutor on the line. Captions are the sample call. */}
        <div className="overflow-hidden rounded-lg bg-[#0A0F2C] text-[#F6F7FB]" data-testid="call-screen">
          <div className="flex items-center gap-4 px-5 pt-5">
            <span aria-hidden className="relative grid size-14 shrink-0 place-items-center rounded-full bg-[#2434E0]">
              <Phone className="size-6" />
              <span className="absolute -inset-1.5 rounded-full border-2 border-[#2434E0]/60 motion-safe:animate-ping" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-lg font-bold leading-tight">{topic.label} tutor</p>
              <p className="mt-0.5 flex items-center gap-2 text-sm text-[#C9CFF0]">
                <span aria-hidden className="size-2 rounded-full bg-emerald-400" />
                On the call · <span className="tabular-nums">02:14</span>
              </p>
            </div>
            <span className="rounded-sm bg-white/10 px-2 py-1 text-xs font-bold uppercase tracking-wider text-[#C9CFF0]">Sample</span>
          </div>
          <ol className="mt-5 space-y-3 px-5" aria-label="Sample call, as captions">
            {topic.call.map((line, i) => (
              <li key={i} className={line.who === "agent" ? "mr-8" : "ml-8 text-right"}>
                <p className="text-xs font-bold uppercase tracking-wider text-[#7A8BFF]">{line.who === "agent" ? "Tutor" : "You"}</p>
                <p className={cn("mt-0.5 text-base leading-snug", line.who === "you" && "text-[#FFC933]")}>{line.text}</p>
              </li>
            ))}
          </ol>
          <div aria-hidden className="mt-6 flex items-center justify-center gap-6 border-t border-white/10 px-5 py-4">
            <span className="grid size-12 place-items-center rounded-full bg-white/10">
              <MicOff className="size-5" />
            </span>
            <span className="grid size-12 place-items-center rounded-full bg-white/10">
              <Volume2 className="size-5" />
            </span>
            <span className="grid size-12 place-items-center rounded-full bg-[#D92D20]">
              <PhoneOff className="size-5" />
            </span>
          </div>
          <div className="border-t border-white/10 px-5 py-4">
            <button
              type="button"
              disabled
              className="inline-flex min-h-12 w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 text-base font-bold text-white opacity-70"
            >
              <Phone aria-hidden className="size-5" />
              Call the {topic.label} tutor · opens soon
            </button>
          </div>
        </div>
        <dl className="divide-y divide-border self-start border border-border bg-card">
          {HOW.map(([title, body]) => (
            <div key={title} className="px-5 py-3.5">
              <dt className="text-base font-bold">{title}</dt>
              <dd className="text-base text-muted-foreground">{body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <ComingSoonPanel title="On-call tutors are on the way" action={{ href: "/audiobooks", label: "Listen to a course" }}>
        System Design gets the first tutor. Until then, every narrated course is on the Audiobooks shelf.
      </ComingSoonPanel>
    </AreaPage>
  );
}
