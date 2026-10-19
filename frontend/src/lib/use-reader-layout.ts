"use client";

import { useEffect, useLayoutEffect, useState, useSyncExternalStore } from "react";

const MOBILE_QUERY = "(max-width: 767px)";
const READY_KEY = "buildment:reader:ready";

function sidebarStorageKey(courseSlug: string) {
  return `buildment:reader:sidebar:${courseSlug}`;
}

function readSidebarPrefs(courseSlug: string, mobile: boolean) {
  try {
    const raw = sessionStorage.getItem(sidebarStorageKey(courseSlug));
    if (!raw) return { left: mobile, right: mobile };
    const parsed = JSON.parse(raw) as { left?: boolean; right?: boolean };
    return {
      left: parsed.left ?? mobile,
      right: parsed.right ?? mobile,
    };
  } catch {
    return { left: mobile, right: mobile };
  }
}

function subscribeMobile(callback: () => void) {
  const mq = window.matchMedia(MOBILE_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getMobileSnapshot() {
  return window.matchMedia(MOBILE_QUERY).matches;
}

function getMobileServerSnapshot() {
  return false;
}

export function useIsMobile() {
  return useSyncExternalStore(subscribeMobile, getMobileSnapshot, getMobileServerSnapshot);
}

function readerAlreadyReady() {
  try {
    return sessionStorage.getItem(READY_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Sidebar + TOC state; persists across chapter navigations within a course.
 *
 * The first render must match the server (both panels open, skeleton shown), so stored
 * preferences are applied in a layout effect — before paint, but after hydration. Reading
 * sessionStorage during render made the sidebar toggle mismatch and React discarded the
 * whole reader tree on every load.
 */
export function useReaderLayout(courseSlug: string) {
  const isMobile = useIsMobile();
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);
  // Content must stay visible on first paint — hiding until useLayoutEffect caused blank
  // screens when hydration failed or was slow ("Compiled" in terminal but empty page).
  const [visible] = useState(true);
  const [skipSkeleton, setSkipSkeleton] = useState(false);

  useLayoutEffect(() => {
    const mobile = window.matchMedia(MOBILE_QUERY).matches;
    const prefs = readSidebarPrefs(courseSlug, mobile);
    setLeftCollapsed((prev) => (prev === prefs.left ? prev : prefs.left));
    setRightCollapsed((prev) => (prev === prefs.right ? prev : prefs.right));
    if (readerAlreadyReady()) setSkipSkeleton(true);
    try {
      sessionStorage.setItem(READY_KEY, "1");
    } catch {
      /* ignore */
    }
  }, [courseSlug]);

  useEffect(() => {
    if (!visible) return;
    try {
      sessionStorage.setItem(
        sidebarStorageKey(courseSlug),
        JSON.stringify({ left: leftCollapsed, right: rightCollapsed })
      );
    } catch {
      /* ignore */
    }
  }, [courseSlug, leftCollapsed, rightCollapsed, visible]);

  return {
    isMobile,
    leftCollapsed,
    setLeftCollapsed,
    rightCollapsed,
    setRightCollapsed,
    visible,
    skipSkeleton,
  };
}
