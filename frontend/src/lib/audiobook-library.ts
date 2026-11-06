import "server-only";
import { serverApiFetch } from "@/lib/api-server";
import { parseApiResponse } from "@/lib/api-client";
import { NARRATION_PRODUCTION_BASE } from "@/lib/narration";
import { buildAudiobook, manifestTracks, type Audiobook, type CourseOutline } from "@/lib/audiobooks";
import { isSafeAssetUrl } from "@/shared/lib/asset-url";
import type { CatalogCourseDetail, CatalogCourseSummary } from "@/shared/api/catalog";

// The Audiobooks area: every published course that has narration, as a book. Course titles and
// chapter names come from the public catalog; the audio comes from each course's live manifest at
// audio.edorax.com/<course>/manifest.json, the same files the chapter reader plays.
// NARRATION_BASE_URL points it somewhere else, as it does for the reader.

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const API_URL = (process.env.API_URL ?? "http://localhost:4000").replace(/\/$/, "");

export type AudiobookLibrary = { books: Audiobook[]; catalogReachable: boolean };

export function audiobookBase(configured: string | undefined = process.env.NARRATION_BASE_URL): string {
  const base = configured?.trim().replace(/\/+$/, "");
  return base && /^https:\/\//.test(base) && isSafeAssetUrl(base) ? base : NARRATION_PRODUCTION_BASE;
}

async function fetchManifest(base: string, slug: string): Promise<unknown> {
  try {
    const response = await fetch(`${base}/${slug}/manifest.json`, { next: { revalidate: 300 }, signal: AbortSignal.timeout(8000) });
    return response.ok ? await response.json() : null;
  } catch {
    return null;
  }
}

/** The public outline (module and chapter titles). Anonymous and cached, since it is the same for everyone. */
async function fetchOutline(slug: string): Promise<CourseOutline | null> {
  try {
    const response = await fetch(`${API_URL}/api/v1/catalog/${encodeURIComponent(slug)}`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(8000),
    });
    const detail = await parseApiResponse<CatalogCourseDetail>(response);
    return { modules: detail.modules };
  } catch {
    return null;
  }
}

async function bookFor(base: string, course: CatalogCourseSummary): Promise<Audiobook | null> {
  if (!SLUG.test(course.slug)) return null;
  const tracks = manifestTracks(await fetchManifest(base, course.slug), base, course.slug);
  if (tracks.length === 0) return null;
  return buildAudiobook(course, tracks, await fetchOutline(course.slug));
}

/** Never throws: with the API or the audio host down the page still renders, with fewer books. */
export async function loadAudiobookLibrary(): Promise<AudiobookLibrary> {
  let catalog: CatalogCourseSummary[];
  try {
    catalog = (await serverApiFetch<{ courses: CatalogCourseSummary[] }>("/api/v1/catalog")).courses;
  } catch {
    return { books: [], catalogReachable: false };
  }
  const base = audiobookBase();
  const books = await Promise.all(catalog.map((course) => bookFor(base, course)));
  return { books: books.filter((book): book is Audiobook => book !== null), catalogReachable: true };
}

/** One book, or null when the course is not in the catalog or has no audio. */
export async function loadAudiobook(slug: string): Promise<Audiobook | null> {
  if (!SLUG.test(slug)) return null;
  // An unreachable API throws here, so the page shows the error screen rather than "not found".
  const catalog = (await serverApiFetch<{ courses: CatalogCourseSummary[] }>("/api/v1/catalog")).courses;
  const course = catalog.find((entry) => entry.slug === slug);
  return course ? bookFor(audiobookBase(), course) : null;
}
