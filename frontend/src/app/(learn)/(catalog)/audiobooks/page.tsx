import type { Metadata } from "next";
import Link from "next/link";
import { SITE_SHARE_IMAGE } from "@/lib/site";
import { areaById } from "@/lib/learn-areas";
import { COURSE_CATEGORY_INFO } from "@/lib/course-categories";
import { loadAudiobookLibrary } from "@/lib/audiobook-library";
import { formatBookLength, type Audiobook } from "@/lib/audiobooks";
import { AreaHero, AreaPage, AreaSection } from "@/components/areas/area-page";
import { BookCover } from "@/components/audiobooks/book-cover";
import { ContinueListening, ShelfProgress } from "@/components/audiobooks/library-client";
import { Dot } from "@/components/brand/dot";

export const metadata: Metadata = {
  title: "Audiobooks",
  description: "Every narrated Edorax course as an audiobook: chapters as tracks, a player that follows you around the site, and your place kept in every book.",
  alternates: { canonical: "/audiobooks" },
  openGraph: { title: "Audiobooks on Edorax", url: "/audiobooks", images: [SITE_SHARE_IMAGE] },
};

function ShelfBook({ book }: { book: Audiobook }) {
  return (
    <li data-testid="audiobook">
      <Link
        href={`/audiobooks/${book.slug}`}
        className="group block rounded-sm outline-none focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-brand-yellow"
      >
        <BookCover book={book} className="transition-transform duration-200 motion-safe:group-hover:-translate-y-1" />
        <h3 className="mt-3 line-clamp-2 font-sans text-base font-bold leading-snug tracking-normal group-hover:underline">{book.title}</h3>
      </Link>
      <p className="mt-0.5 text-sm text-muted-foreground">{book.author}</p>
      <p className="text-sm tabular-nums text-muted-foreground">
        {formatBookLength(book.totalMinutes)}, {book.tracks.length} chapters
      </p>
      <ShelfProgress book={book} />
    </li>
  );
}

export default async function AudiobooksPage() {
  const area = areaById("audiobooks");
  const { books, catalogReachable } = await loadAudiobookLibrary();
  const minutes = books.reduce((sum, book) => sum + book.totalMinutes, 0);
  const chapters = books.reduce((sum, book) => sum + book.tracks.length, 0);
  const shelves = COURSE_CATEGORY_INFO.map((category) => ({
    ...category,
    books: books.filter((book) => book.category === category.value),
  })).filter((shelf) => shelf.books.length > 0);

  return (
    <AreaPage>
      <AreaHero
        eyebrow="Audiobooks"
        title={area.name}
        status={area.status}
        mood="happy"
        intro="Every course with narration, as a book you can listen to from start to finish. Chapters play one after another, the player stays with you as you move around Edorax, and your place in each book is kept on this device."
      >
        {books.length > 0 ? (
          <dl className="flex flex-wrap gap-x-8 gap-y-3" data-testid="audiobook-totals">
            {[
              ["Books", String(books.length)],
              ["Chapters", String(chapters)],
              ["Listening", formatBookLength(minutes)],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{label}</dt>
                <dd className="text-2xl font-bold tabular-nums tracking-[-0.02em]">{value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </AreaHero>

      <ContinueListening books={books} />

      {shelves.length > 0 ? (
        shelves.map((shelf) => (
          <AreaSection key={shelf.value} id={`shelf-${shelf.param}`} title={shelf.label} intro={shelf.description}>
            <ul className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {shelf.books.map((book) => (
                <ShelfBook key={book.slug} book={book} />
              ))}
            </ul>
          </AreaSection>
        ))
      ) : (
        <div className="mt-10 flex flex-col items-center border border-border bg-card px-6 py-14 text-center" data-testid="audiobooks-empty">
          <Dot mood="sleep" size={112} />
          <h2 className="mt-4 text-xl tracking-[-0.02em]">{catalogReachable ? "No audiobooks yet" : "Books could not be loaded"}</h2>
          <p className="mt-2 max-w-sm text-base text-muted-foreground">
            {catalogReachable
              ? "A course shows up here as soon as its chapters are read aloud."
              : "The course list is not reachable right now. Try again in a moment."}
          </p>
        </div>
      )}
    </AreaPage>
  );
}
