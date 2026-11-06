import { enrollmentLabel } from "@buildment/learning-ui/components/learn/enrollment-badge";
import type { Metadata } from "next";
import { SITE_SHARE_IMAGE } from "@/lib/site";
import type { CatalogCourseSummary } from "@/shared/api/catalog";
import type { CourseCategory } from "@/shared/domain/enums";
import { getSessionUser } from "@/server/auth/guards";
import { serverApiFetch } from "@/lib/api-server";
import { COURSE_CATEGORY_INFO, categoryFromParam } from "@/lib/course-categories";
import { CatalogCourseCard } from "@/components/learn/catalog-course-card";
import { CatalogCategoryTiles } from "@/components/learn/catalog-category-tiles";
import { Dot } from "@/components/brand/dot";
import { Search, SlidersHorizontal, X } from "lucide-react";

function CourseGrid({ courses }: { courses: CatalogCourseSummary[] }) {
  return (
    <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => {
        const enrolledLabel = enrollmentLabel(course.enrollmentLifecycle);

        return (
          <li key={course.id}>
            <CatalogCourseCard
              slug={course.slug}
              title={course.title}
              description={course.description}
              coverUrl={course.coverUrl}
              difficulty={course.difficulty}
              estimatedHours={course.estimatedHours}
              pricingType={course.pricingType}
              priceCents={course.priceCents}
              currency={course.currency}
              subcategory={course.subcategory}
              tags={course.tags}
              instructorName={course.instructorName}
              enrolledLabel={enrolledLabel}
            />
          </li>
        );
      })}
    </ul>
  );
}

export const metadata: Metadata = {
  title: "Explore courses",
  description: "Explore courses in tech and soft skills: networking, system design, product sense, communication and more.",
  alternates: { canonical: "/catalog" },
  openGraph: { title: "Courses on Edorax", url: "/catalog", images: [SITE_SHARE_IMAGE] },
};

export default async function CatalogPage({ searchParams }: { searchParams: Promise<{ category?: string; subcategory?: string; tag?: string; q?: string }> }) {
  const user = await getSessionUser();
  const { courses } = await serverApiFetch<{ courses: CatalogCourseSummary[] }>("/api/v1/catalog");
  const params = await searchParams;
  const active = categoryFromParam(params.category);
  const query = params.q?.trim() ?? "";
  const subcategory = params.subcategory?.trim() ?? "";
  const tag = params.tag?.trim().toLowerCase() ?? "";
  const availableCourses = courses.filter((course) => active === null || course.category === active);
  const subcategories = [...new Set(availableCourses.map((course) => course.subcategory).filter((value): value is string => Boolean(value)))].sort();
  const tags = [...new Set(availableCourses.flatMap((course) => course.tags))].sort();
  const filteredCourses = availableCourses.filter((course) => {
    const text = [course.title, course.description ?? "", course.projectGoal ?? "", course.subcategory ?? "", ...course.tags].join(" ").toLowerCase();
    return (!query || text.includes(query.toLowerCase())) && (!subcategory || course.subcategory === subcategory) && (!tag || course.tags.some((item) => item.toLowerCase() === tag));
  });

  const counts = { TECH: 0, SOFT_SKILLS: 0 } as Record<CourseCategory, number>;
  for (const course of courses) counts[course.category] += 1;

  // "All" shows every category as its own section; filters narrow each section.
  const sections = COURSE_CATEGORY_INFO.filter((category) => active === null || category.value === active)
    .map((category) => ({ ...category, courses: filteredCourses.filter((course) => course.category === category.value) }))
    .filter((section) => section.courses.length > 0 || active !== null);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
      <header>
        <h1 className="text-[32px] leading-tight tracking-[-0.035em] sm:text-[40px]">Explore courses</h1>
        <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
          {user ? "Explore the catalog and find the next course for your learning goals." : "Look inside any course. You only need an account to enroll."}
        </p>
        {courses.length > 0 ? <CatalogCategoryTiles counts={counts} total={courses.length} active={active} /> : null}
        {courses.length > 0 ? (
          <div className="mt-6 rounded-2xl border border-border/80 bg-card p-4 shadow-sm sm:p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary"><SlidersHorizontal className="size-5" aria-hidden /></span>
                <div><h2 className="text-sm font-semibold tracking-tight">Find your next course</h2><p className="mt-0.5 text-xs text-muted-foreground">Search by course, skill, or topic.</p></div>
              </div>
              <p className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground" aria-live="polite">{filteredCourses.length} {filteredCourses.length === 1 ? "course" : "courses"} found</p>
            </div>
            <form action="/catalog" method="get" className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:items-end" aria-label="Filter courses">
              <input type="hidden" name="category" value={params.category ?? ""} />
              <label htmlFor="catalog-search" className="space-y-1.5 text-xs font-semibold text-foreground/80 lg:col-span-4">
                <span className="block">Search courses or topics</span>
                <span className="relative block"><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden /><input id="catalog-search" name="q" defaultValue={query} placeholder="Try AI, AWS, React…" className="h-11 w-full rounded-xl border border-input bg-background pl-10 pr-3 text-sm font-normal text-foreground shadow-sm outline-none transition placeholder:text-muted-foreground/75 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20" /></span>
              </label>
              <label htmlFor="catalog-subcategory" className="space-y-1.5 text-xs font-semibold text-foreground/80 lg:col-span-3">
                <span className="block">Subcategory</span><select id="catalog-subcategory" name="subcategory" defaultValue={subcategory} className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm font-normal text-foreground shadow-sm outline-none transition focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"><option value="">All subcategories</option>{subcategories.map((item) => <option key={item} value={item}>{item}</option>)}</select>
              </label>
              <label htmlFor="catalog-tag" className="space-y-1.5 text-xs font-semibold text-foreground/80 lg:col-span-3">
                <span className="block">Topic tag</span><select id="catalog-tag" name="tag" defaultValue={tag} className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm font-normal text-foreground shadow-sm outline-none transition focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"><option value="">All topics</option>{tags.map((item) => <option key={item} value={item}>{item}</option>)}</select>
              </label>
              <div className="flex items-center gap-2 sm:col-span-2 lg:col-span-2">
                <button type="submit" className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"><Search className="size-4" aria-hidden />Find courses</button>
                <a href={params.category ? `/catalog?category=${encodeURIComponent(params.category)}` : "/catalog"} className="inline-flex h-11 items-center gap-1 rounded-xl px-3 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><X className="size-3.5" aria-hidden /><span>Clear</span></a>
              </div>
            </form>
          </div>
        ) : null}
      </header>

      {courses.length === 0 ? (
        <div className="mt-10 flex flex-col items-center border border-border bg-card px-6 py-14 text-center">
          <Dot mood="sleep" size={112} />
          <h2 className="mt-4 text-xl tracking-[-0.02em]">No courses yet</h2>
          <p className="mt-2 max-w-sm text-base text-muted-foreground">New courses show up here when they are published.</p>
        </div>
      ) : (
        sections.map((section) => (
          <section key={section.value} aria-labelledby={`catalog-${section.param}`} className="mt-10">
            <h2 id={`catalog-${section.param}`} className="text-2xl tracking-[-0.02em]">
              {section.label}
            </h2>
            <p className="mt-1 text-base text-muted-foreground">{section.description}</p>
            {section.courses.length > 0 ? (
              <CourseGrid courses={section.courses} />
            ) : (
              <p className="mt-5 text-base text-muted-foreground">{query || subcategory || tag ? "No courses match these filters." : "No courses in this category yet."}</p>
            )}
          </section>
        ))
      )}
    </div>
  );
}
