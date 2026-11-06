import type { Metadata } from "next";
import { SITE_SHARE_IMAGE } from "@/lib/site";
import { LAB_KINDS, areaById } from "@/lib/learn-areas";
import { visualLabGroups } from "@/lib/visual-labs";
import { LAB_KIND_ICON } from "@/components/areas/area-icon";
import { AreaHero, AreaPage, CardGrid, InfoCard, StepList } from "@/components/areas/area-page";
import { FilterChips, pickFilter } from "@/components/areas/filter-chips";

export const metadata: Metadata = {
  title: "Labs",
  description: "Build it, break it, and see the result. Filter by kind of lab and by topic: System Design, Cloud and DevOps, Networking.",
  alternates: { canonical: "/labs" },
  openGraph: { title: "Labs on Edorax", url: "/labs", images: [SITE_SHARE_IMAGE] },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function LabsPage({ searchParams }: { searchParams: SearchParams }) {
  const area = areaById("labs");
  const groups = visualLabGroups();
  const query = await searchParams;
  const kind = pickFilter(query.kind, LAB_KINDS.map((k) => k.id));
  const topic = kind === "guided" || kind === "shell" ? null : pickFilter(query.topic, groups.map((g) => g.id));
  const params = { kind, topic };
  const total = groups.reduce((sum, group) => sum + group.labs.length, 0);

  const labs = groups
    .filter((group) => topic === null || group.id === topic)
    .flatMap((group) => group.labs.map((lab) => ({ ...lab, topic: group.title })));
  const soonKinds = LAB_KINDS.filter((k) => k.status !== "live" && (kind === null ? topic === null : k.id === kind));

  return (
    <AreaPage>
      <AreaHero
        eyebrow="Labs"
        title="Build it, break it, see the result"
        status={area.status}
        mood="determined"
        intro="Reading tells you how a system should behave. A lab lets you find out. Pick a kind and a topic."
      />

      <div className="mt-8 space-y-3" data-testid="lab-filters">
        <FilterChips
          label="Kind"
          param="kind"
          current={kind}
          basePath="/labs"
          params={params}
          options={[
            { value: null, label: "All" },
            ...LAB_KINDS.map((k) => ({ value: k.id, label: k.name.replace(/ labs$/, ""), count: k.status === "live" ? total : undefined, soon: k.status !== "live" })),
          ]}
        />
        {kind === null || kind === "visual" ? (
          <FilterChips
            label="Topic"
            param="topic"
            current={topic}
            basePath="/labs"
            params={params}
            options={[{ value: null, label: "All" }, ...groups.map((g) => ({ value: g.id, label: g.title, count: g.labs.length }))]}
          />
        ) : null}
      </div>

      {kind === null || kind === "visual" ? (
        <section aria-label="Visual labs" className="mt-8">
          <CardGrid>
            {labs.map((lab) => (
              <InfoCard
                key={lab.slug}
                title={lab.title}
                body={lab.purpose}
                href={`/labs/visual/${lab.slug}`}
                cta="Open lab"
                meta={lab.challenge ? `${lab.topic} · ${lab.checks} checks` : lab.topic}
              />
            ))}
          </CardGrid>
        </section>
      ) : null}

      {soonKinds.length > 0 ? (
        <section aria-labelledby="labs-next" className="mt-10">
          <h2 id="labs-next" className="text-xl tracking-[-0.02em]">
            {kind ? "Not open yet" : "Coming next"}
          </h2>
          <div className="mt-4">
            <CardGrid columns={2}>
              {soonKinds.map((k) => {
                const Icon = LAB_KIND_ICON[k.id];
                return (
                  <InfoCard key={k.id} title={k.name} body={k.summary} meta={k.tagline} href={k.href} status={k.status} icon={<Icon className="size-6" />} cta="See how it will work" />
                );
              })}
            </CardGrid>
          </div>
        </section>
      ) : null}

      {kind === null || kind === "visual" ? (
        <details className="group mt-10 border-t border-border pt-4">
          <summary className="flex min-h-11 cursor-pointer list-none items-center text-lg font-bold outline-none focus-visible:outline-3 focus-visible:outline-brand-yellow [&::-webkit-details-marker]:hidden">
            How a visual lab works
          </summary>
          <div className="mt-4">
            <StepList
              steps={[
                { title: "Build", body: "Add parts from the list, link them and set their size. Switch between plain names and real AWS names at any time." },
                { title: "Choose what to break", body: "Open a part and press Break it. That only arms the failure. Nothing changes until you run." },
                { title: "Press Run", body: "The design plays through every scenario: normal traffic, the peak, and each failure." },
                { title: "Read the checks", body: "Every test case passes or fails on the board, with the number it measured and why. Fix one thing and run again." },
              ]}
            />
          </div>
        </details>
      ) : null}
    </AreaPage>
  );
}
