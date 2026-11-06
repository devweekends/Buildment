import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SITE_SHARE_IMAGE } from "@/lib/site";
import { loadAudiobook } from "@/lib/audiobook-library";
import { categoryLabel, formatBookLength } from "@/lib/audiobooks";
import { AreaTabs } from "@/components/areas/area-tabs";
import { BookCover } from "@/components/audiobooks/book-cover";
import { BookResume, TrackList } from "@/components/audiobooks/book-detail-client";

type Params = { params: Promise<{ courseSlug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { courseSlug } = await params;
  const book = await loadAudiobook(courseSlug);
  if (!book) return { title: "Audiobook not found" };
  return {
    title: `${book.title}, the audiobook`,
    description: `${book.tracks.length} chapters, ${formatBookLength(book.totalMinutes)}, by ${book.author}.${book.description ? ` ${book.description.slice(0, 200)}` : ""}`,
    alternates: { canonical: `/audiobooks/${book.slug}` },
    openGraph: { title: `${book.title}, the audiobook`, url: `/audiobooks/${book.slug}`, images: [SITE_SHARE_IMAGE] },
  };
}

export default async function AudiobookPage({ params }: Params) {
  const { courseSlug } = await params;
  const book = await loadAudiobook(courseSlug);
  if (!book) notFound();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
      <AreaTabs />
      <Link
        href="/audiobooks"
        className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-sm text-base font-bold text-primary outline-none hover:underline focus-visible:outline-3 focus-visible:outline-brand-yellow"
      >
        <ArrowLeft aria-hidden className="size-4" />
        All audiobooks
      </Link>

      <div className="mt-4 grid gap-8 md:grid-cols-[15rem_minmax(0,1fr)] md:gap-12 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <div className="mx-auto w-44 sm:w-52 md:sticky md:top-24 md:mx-0 md:w-full md:self-start">
          <BookCover book={book} />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-bold uppercase tracking-wider text-primary">
            {categoryLabel(book.category)}
            {book.subcategory ? ` · ${book.subcategory}` : ""}
          </p>
          <h1 className="mt-2 text-[28px] leading-tight tracking-[-0.035em] sm:text-[36px]">{book.title}</h1>
          <p className="mt-2 text-lg">
            <span className="text-muted-foreground">Written by </span>
            <span className="font-bold">{book.author}</span>
          </p>
          <p className="mt-1 text-base tabular-nums text-muted-foreground">
            {formatBookLength(book.totalMinutes)} · {book.parts.length} {book.parts.length === 1 ? "part" : "parts"} · {book.tracks.length} chapters
          </p>

          <BookResume book={book} />

          {book.description ? <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground">{book.description}</p> : null}
          <p className="mt-3 text-base">
            <Link href={`/catalog/${book.slug}`} className="rounded-sm font-bold text-primary underline-offset-4 outline-none hover:underline focus-visible:outline-3 focus-visible:outline-brand-yellow">
              Read the course
            </Link>
            <span className="text-muted-foreground">: the same chapters with diagrams, labs and quizzes.</span>
          </p>

          <h2 className="mt-10 text-2xl tracking-[-0.02em]">Chapters</h2>
          <div className="mt-4">
            <TrackList book={book} />
          </div>
        </div>
      </div>
    </div>
  );
}
