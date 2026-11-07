import { coverSvg } from "@/lib/audiobook-cover";
import { categoryLabel, type Audiobook } from "@/lib/audiobooks";
import { cn } from "@/lib/utils";

const PAGE_FONTS = { heading: "var(--font-unbounded), 'Arial Black', sans-serif", body: "var(--font-dm-sans), Arial, sans-serif" };

export function coverInput(book: Pick<Audiobook, "slug" | "title" | "author" | "category" | "subcategory">) {
  return { slug: book.slug, title: book.title, author: book.author, label: book.subcategory || categoryLabel(book.category) };
}

/** A book cover, 2 by 3. Decorative: the title is always also written next to it. */
export function BookCover({ book, className }: { book: Pick<Audiobook, "slug" | "title" | "author" | "category" | "subcategory">; className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("aspect-[2/3] w-full overflow-hidden rounded-r-[3px] shadow-[0_1px_2px_rgb(10_15_44/0.18),0_6px_16px_-6px_rgb(10_15_44/0.35)] [&>svg]:block [&>svg]:size-full", className)}
      dangerouslySetInnerHTML={{ __html: coverSvg(coverInput(book), { fonts: PAGE_FONTS }) }}
    />
  );
}
