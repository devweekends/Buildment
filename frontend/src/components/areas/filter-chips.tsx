import Link from "next/link";
import { cn } from "@/lib/utils";

export type FilterOption = { value: string | null; label: string; count?: number; soon?: boolean };

/**
 * A row of one-tap filters. Each chip is a plain link that sets one search parameter and keeps the
 * others, so a filtered view can be shared, and it works before the page's scripts load.
 */
export function FilterChips({
  label,
  param,
  options,
  current,
  basePath,
  params,
}: {
  /** Read out to screen readers and shown on wide screens before the chips. */
  label: string;
  param: string;
  options: FilterOption[];
  current: string | null;
  basePath: string;
  /** The page's other filters, kept when this one changes. */
  params: Record<string, string | null>;
}) {
  function href(value: string | null) {
    const query = new URLSearchParams();
    for (const [key, val] of Object.entries({ ...params, [param]: value })) if (val) query.set(key, val);
    const text = query.toString();
    return text ? `${basePath}?${text}` : basePath;
  }

  return (
    <nav aria-label={label}>
      {/* Wraps instead of scrolling sideways, so every choice, the active one included, is in view on a phone. */}
      <ul className="flex flex-wrap items-center gap-2">
        <li aria-hidden className="mr-1 hidden w-14 text-sm font-bold uppercase tracking-wider text-muted-foreground sm:block">
          {label}
        </li>
        {options.map((option) => {
          const active = option.value === current;
          return (
            <li key={option.value ?? "all"}>
              <Link
                href={href(option.value)}
                scroll={false}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "inline-flex min-h-10 items-center gap-2 rounded-full border-2 px-4 text-[15px] font-bold outline-none transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow",
                  active ? "border-foreground bg-foreground text-background" : "border-input bg-card text-foreground hover:border-foreground",
                )}
              >
                {option.label}
                {option.count !== undefined ? (
                  <span className={cn("tabular-nums", active ? "text-background/70" : "text-muted-foreground")}>{option.count}</span>
                ) : null}
                {option.soon ? (
                  <span className={cn("rounded-sm px-1.5 py-0.5 text-xs", active ? "bg-background/20" : "bg-secondary text-muted-foreground")}>Soon</span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Reads one filter from search params, accepting only the listed values. */
export function pickFilter(value: string | string[] | undefined, allowed: readonly string[]): string | null {
  const one = Array.isArray(value) ? value[0] : value;
  return one && allowed.includes(one) ? one : null;
}
