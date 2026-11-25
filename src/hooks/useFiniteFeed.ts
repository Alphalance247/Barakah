"use client";

import { useState, useCallback } from "react";
import { SESSION_CLIP_LIMIT } from "@/constants/barakah";

/**
 * Manages the finite-by-design home feed session (default 20 clips).
 * Once the user finishes the session limit, isCaughtUp becomes true
 * to display the "You're all caught up, alhamdulillah" screen.
 */
export function useFiniteFeed(initialLimit = SESSION_CLIP_LIMIT) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionLimit, setSessionLimit] = useState(initialLimit);

  const isCaughtUp = currentIndex >= sessionLimit;

  const advanceClip = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, sessionLimit));
  }, [sessionLimit]);

  const previousClip = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const watchTenMore = useCallback(() => {
    setSessionLimit((prev) => prev + 10);
  }, []);

  return {
    currentIndex,
    displayPosition: Math.min(currentIndex + 1, sessionLimit),
    sessionLimit,
    isCaughtUp,
    advanceClip,
    previousClip,
    watchTenMore,
    setCurrentIndex,
  };
}
