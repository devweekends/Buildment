import type { Metadata } from "next";
import { SITE_SHARE_IMAGE } from "@/lib/site";
import { areaById } from "@/lib/learn-areas";
import { AreaHero, AreaPage, ComingSoonPanel, StepList } from "@/components/areas/area-page";
import { FilterChips, pickFilter } from "@/components/areas/filter-chips";

export const metadata: Metadata = {
  title: "Five-minute practice",
  description: "Master one subject five minutes a day: today's question, quick quizzes, quick reads and a review queue.",
  alternates: { canonical: "/practice" },
  openGraph: { title: "Five-minute practice on Edorax", url: "/practice", images: [SITE_SHARE_IMAGE] },
};

// One practice app per subject. System Design is built first; the rest follow the courses they practise.
const SUBJECTS = [
  {
    id: "system-design",
    label: "System Design",
    note: "Built first.",
    question: "A page loads fast in the morning and slowly at night. Which part do you check first?",
    options: ["The database", "The cache hit rate", "The load balancer", "I am not sure yet"],
  },
  {
    id: "ai-engineering",
    label: "AI engineering interview",
    note: "After System Design.",
    question: "Your RAG answer cites the right document but quotes the wrong number. Where do you look first?",
    options: ["How the document was chunked", "The retrieval ranking", "The prompt", "I am not sure yet"],
  },
  {
    id: "networking",
    label: "Networking",
    note: "Planned.",
    question: "A site opens when you type its IP address but not its name. What is broken?",
    options: ["DNS", "The router", "The TLS certificate", "I am not sure yet"],
  },
  {
    id: "databases",
    label: "Databases",
    note: "Planned.",
    question: "Two people book the last seat at the same moment. What stops both of them getting it?",
    options: ["A row lock in a transaction", "A cache", "An index", "I am not sure yet"],
  },
] as const;

const FORMATS = [
  ["Today's question", "One a day. Answer first, read after."],
  ["Quick quizzes", "Three to five questions in about two minutes."],
  ["Quick reads", "One idea on one screen, ending with a check."],
  ["Review queue", "Misses come back a few days later."],
] as const;

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function PracticePage({ searchParams }: { searchParams: SearchParams }) {
  const area = areaById("practice");
  const query = await searchParams;
  const id = pickFilter(query.subject, SUBJECTS.map((s) => s.id)) ?? SUBJECTS[0].id;
  const subject = SUBJECTS.find((s) => s.id === id)!;

  return (
    <AreaPage>
      <AreaHero
        eyebrow="Practice"
        title={area.name}
        status={area.status}
        mood="think"
        intro="One subject, five minutes a day. It starts with a question, not a lecture, and helps you work the answer out when you cannot."
      />

      <div className="mt-8">
        <FilterChips
          label="Subject"
          param="subject"
          current={id}
          basePath="/practice"
          params={{}}
          options={SUBJECTS.map((s) => ({ value: s.id, label: s.label }))}
        />
      </div>

      <section aria-label={`${subject.label} practice`} className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="border border-border bg-card p-5 sm:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="text-sm font-bold uppercase tracking-wider text-primary">{subject.label} · today&apos;s question</span>
            <span className="text-sm text-muted-foreground">{subject.note} Preview, not interactive yet.</span>
          </div>
          <p className="mt-3 text-xl tracking-[-0.02em]">{subject.question}</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {subject.options.map((option) => (
              <li key={option} className="border-2 border-input px-4 py-3 text-base font-bold">
                {option}
              </li>
            ))}
          </ul>
        </div>
        <dl className="divide-y divide-border border border-border bg-card">
          {FORMATS.map(([title, body]) => (
            <div key={title} className="px-5 py-3.5">
              <dt className="text-base font-bold">{title}</dt>
              <dd className="text-base text-muted-foreground">{body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <details className="group mt-10 border-t border-border pt-4">
        <summary className="flex min-h-11 cursor-pointer list-none items-center text-lg font-bold outline-none focus-visible:outline-3 focus-visible:outline-brand-yellow [&::-webkit-details-marker]:hidden">
          A session, start to finish
        </summary>
        <div className="mt-4">
          <StepList
            steps={[
              { title: "A question first", body: "Answer before you see anything else." },
              { title: "Can't answer? Work it out", body: "Dot asks a smaller question, then gives a hint, then a worked example. You choose how much help you get." },
              { title: "A quick read to lock it in", body: "The idea behind the answer, short enough to finish at a bus stop." },
              { title: "Back in the review queue", body: "The question returns in a few days. Get it right twice and it moves further out." },
            ]}
          />
        </div>
      </details>

      <ComingSoonPanel title="Five-minute practice is being built" action={{ href: "/catalog", label: "Browse courses" }}>
        Until then, every course chapter ends with a short quiz you can retake.
      </ComingSoonPanel>
    </AreaPage>
  );
}
