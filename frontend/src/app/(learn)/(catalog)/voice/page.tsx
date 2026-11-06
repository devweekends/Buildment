import type { Metadata } from "next";
import { SITE_SHARE_IMAGE } from "@/lib/site";
import { areaById } from "@/lib/learn-areas";
import { AreaHero, AreaPage, ComingSoonPanel } from "@/components/areas/area-page";
import { FilterChips, pickFilter } from "@/components/areas/filter-chips";

export const metadata: Metadata = {
  title: "On-call tutors",
  description: "Call a tutor for any topic, start talking and ask about anything that feels hard. It explains in plain words and keeps your place.",
  alternates: { canonical: "/voice" },
  openGraph: { title: "On-call tutors on Edorax", url: "/voice", images: [SITE_SHARE_IMAGE] },
};

type Line = { who: "agent" | "you"; text: string };

// One tutor per topic. The sample calls are written out; calls are not open yet.
const TOPICS: { id: string; label: string; note: string; call: Line[] }[] = [
  {
    id: "system-design",
    label: "System Design",
    note: "The first tutor.",
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
    note: "Planned.",
    call: [
      { who: "agent", text: "Hi, I'm your Networking tutor. Where would you like to start?" },
      { who: "you", text: "My laptop says connected, but nothing loads." },
      { who: "agent", text: "Good place to start. Let's check three things in order: your address, the way out of your network, then names. Can you open a terminal?" },
    ],
  },
  {
    id: "ai-engineering",
    label: "AI engineering",
    note: "Planned.",
    call: [
      { who: "agent", text: "Hi, I'm your AI engineering tutor. Building something, or getting ready for an interview?" },
      { who: "you", text: "Interview. I always get stuck on evals." },
      { who: "agent", text: "Then let's practise one answer out loud: how would you know your RAG system got better after a change?" },
    ],
  },
];

const HOW = [
  ["Call the topic", "Press Call and say where you want to start."],
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
        intro="A tutor for every topic, one call away. Say how much you already know and start talking. It answers in plain words and keeps your place."
      />

      <div className="mt-8">
        <FilterChips label="Topic" param="topic" current={id} basePath="/voice" params={{}} options={TOPICS.map((t) => ({ value: t.id, label: t.label }))} />
      </div>

      <section aria-label={`${topic.label} tutor`} className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div>
          <p className="text-sm text-muted-foreground">
            <span className="font-bold text-foreground">{topic.label} tutor.</span> {topic.note} A sample call, written out.
          </p>
          <ol className="mt-3 space-y-3" aria-label="Sample call">
            {topic.call.map((line, i) => (
              <li key={i} className={line.who === "agent" ? "mr-10" : "ml-10"}>
                <div className={line.who === "agent" ? "border border-border bg-card px-4 py-3" : "bg-primary px-4 py-3 text-primary-foreground"}>
                  <div className={`text-xs font-bold uppercase tracking-wider ${line.who === "agent" ? "text-primary" : "text-primary-foreground/80"}`}>
                    {line.who === "agent" ? `${topic.label} tutor` : "You"}
                  </div>
                  <p className="mt-1 text-base">{line.text}</p>
                </div>
              </li>
            ))}
          </ol>
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
