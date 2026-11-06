"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/** Read-only 1–5 stars with fractional fill for averages like 4.7. */
export function StarRating({
  value,
  size = 16,
  className,
}: {
  value: number;
  size?: number;
  className?: string;
}) {
  const percent = Math.max(0, Math.min(100, (value / 5) * 100));
  const stars = Array.from({ length: 5 }, (_, index) => (
    <Star key={index} style={{ width: size, height: size }} aria-hidden />
  ));
  return (
    <span
      className={cn("relative inline-flex shrink-0", className)}
      role="img"
      aria-label={`${value.toFixed(1)} out of 5 stars`}
    >
      <span className="flex text-muted-foreground/30">{stars}</span>
      <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${percent}%` }}>
        <span className="flex text-amber-500 [&>svg]:fill-current">{stars}</span>
      </span>
    </span>
  );
}

/** Interactive 1–5 stars for the rating form. */
export function StarRatingInput({
  value,
  onChange,
  disabled,
}: {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center gap-1" role="radiogroup" aria-label="Course rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-checked={value === star}
          aria-label={`${star} star${star === 1 ? "" : "s"}`}
          disabled={disabled}
          onClick={() => onChange(star)}
          className={cn(
            "rounded p-0.5 transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow",
            star <= value ? "text-amber-500 [&>svg]:fill-current" : "text-muted-foreground/40 hover:text-amber-500/70",
          )}
        >
          <Star className="size-7" aria-hidden />
        </button>
      ))}
    </div>
  );
}
