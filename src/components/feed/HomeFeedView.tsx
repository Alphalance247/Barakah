"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { AllCaughtUpView } from "./AllCaughtUpView";
import { CommentsSheet } from "@/components/comments";
import { BottomNav } from "@/components/layout/BottomNav";
import { TopHeader } from "@/components/layout/TopHeader";
import {
  SIMULATED_FEED_CLIPS,
  type SimulatedFeedClip,
} from "@/data/seed";
import { MAX_CLIP_DURATION_SECONDS } from "@/constants/barakah";
import { formatBarakahDownloadFilename } from "@/utils";

function formatCompactCount(num: number): string {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return String(num);
}

interface SingleReelStageProps {
  clip: SimulatedFeedClip;
  index: number;
  totalSessionClips: number;
  isActive: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenComments: () => void;
  onClipEndedOrCapped: () => void;
  onJumpToCaughtUp: () => void;
  onShowToast: (msg: string) => void;
}

function SingleReelStage({
  clip,
  index,
  totalSessionClips,
  isActive,
  isMuted,
  onToggleMute,
  onOpenComments,
  onClipEndedOrCapped,
  onJumpToCaughtUp,
  onShowToast,
}: SingleReelStageProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showPlayBadge, setShowPlayBadge] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [cappedDuration, setCappedDuration] = useState(
    MAX_CLIP_DURATION_SECONDS
  );
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(index === 0);
  const [isFollowing, setIsFollowing] = useState(false);

  // Sync play/pause when user scrolls this reel into or out of view
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    if (isActive) {
      if (vid.currentTime >= MAX_CLIP_DURATION_SECONDS) {
        vid.currentTime = 0;
      }
      vid
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      vid.pause();
      vid.currentTime = 0;
      setIsPlaying(false);
    }
  }, [isActive]);

  const handleLoadedMetadata = () => {
    const vid = videoRef.current;
    if (!vid) return;
    const rawDuration =
      Number.isFinite(vid.duration) && vid.duration > 0
        ? vid.duration
        : MAX_CLIP_DURATION_SECONDS;
    // Hard cap every video phase at 1m 30s (90 seconds)
    setCappedDuration(Math.min(rawDuration, MAX_CLIP_DURATION_SECONDS));
  };

  const handleTimeUpdate = () => {
    const vid = videoRef.current;
    if (!vid) return;

    // Enforce strict 1 minute 30 seconds (90s) cutoff
    if (vid.currentTime >= MAX_CLIP_DURATION_SECONDS) {
      vid.pause();
      vid.currentTime = 0;
      setCurrentTime(MAX_CLIP_DURATION_SECONDS);
      onClipEndedOrCapped();
      return;
    }

    setCurrentTime(vid.currentTime);
  };

  const handleTogglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;

    if (vid.paused) {
      if (vid.currentTime >= MAX_CLIP_DURATION_SECONDS) {
        vid.currentTime = 0;
      }
      vid.play().catch(() => {});
      setIsPlaying(true);
    } else {
      vid.pause();
      setIsPlaying(false);
    }

    setShowPlayBadge(true);
    setTimeout(() => setShowPlayBadge(false), 650);
  };

  const handleDownload = () => {
    const filename = formatBarakahDownloadFilename(clip.scholar, clip.ayahRef);
    const link = document.createElement("a");
    link.href = clip.videoSrc;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast(`Downloading ${filename}`);
  };

  const progressPercent =
    cappedDuration > 0
      ? Math.min(100, (currentTime / cappedDuration) * 100)
      : 0;

  const displayedLikes = formatCompactCount(
    clip.likesCount + (isLiked ? 1 : 0)
  );
  const displayedSaves = formatCompactCount(
    clip.savesCount + (isBookmarked && index !== 0 ? 1 : 0)
  );

  return (
    <div className="snap-start shrink-0 relative w-full h-dvh overflow-hidden bg-black select-none">
      {/* Unobstructed Video Layer (YouTube Shorts / Instagram Reels style on pure black stage) */}
      <video
        ref={videoRef}
        src={clip.videoSrc}
        poster={clip.posterUrl}
        muted={isMuted}
        playsInline
        loop={false}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onClipEndedOrCapped}
        className="absolute inset-0 w-full h-[calc(100dvh-5rem)] object-contain bg-black"
      />

      {/* Calibrated Scrim Overlays (Reels/Shorts Style — No muddy blur covering the video) */}
      {/* Subtle Top Scrim for Status and Navigation Controls */}
      <div className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-black/70 via-black/25 to-transparent pointer-events-none z-10" />
      {/* Clean Bottom Gradient for Caption & HUD Contrast */}
      <div className="absolute inset-x-0 bottom-20 h-64 bg-linear-to-t from-black/85 via-black/40 to-transparent pointer-events-none z-10" />

      {/* Top Floating Status & Action Bar */}
      <header className="absolute top-0 inset-x-0 z-30 px-4 py-3.5 flex items-center justify-between">
        {/* Left: Floating Brand / Reel Pill */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/35 backdrop-blur-md border border-white/10 shadow-2xs">
            <img
              alt="Barakah App Logo"
              className="h-4 w-4 object-contain rounded-xs brightness-110"
              src="/images/barakah-logo.png"
            />
            <span className="text-[13px] leading-4 text-white font-bold tracking-tight">
              Barakah
            </span>
          </div>
        </div>

        {/* Right: Finite Session Pill Indicator, Audio Toggle, & Search Action */}
        <div className="flex items-center gap-2">
          {/* Daily Session Finite Diet Pill Indicator */}
          <button
            type="button"
            onClick={onJumpToCaughtUp}
            title="Tap to preview All Caught Up (20 of 20)"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/35 backdrop-blur-md border border-white/10 shadow-2xs hover:bg-black/50 transition-colors cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulse" />
            <span className="text-[11px] leading-3.5 text-white/90 tracking-wide">
              <span className="font-bold text-secondary-container">
                {index + 1}
              </span>{" "}
              of {totalSessionClips} today
            </span>
          </button>

          {/* Sound Control Button */}
          <button
            type="button"
            aria-label="Toggle Audio"
            onClick={(e) => {
              e.stopPropagation();
              onToggleMute();
            }}
            className="w-8 h-8 rounded-full bg-black/35 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/90 active:scale-95 transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-[17px]">
              {isMuted ? "volume_off" : "volume_up"}
            </span>
          </button>

          {/* Search Action Button */}
          <Link
            href="/library"
            aria-label="Search Feed"
            className="w-8 h-8 rounded-full bg-black/35 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/90 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-lg">search</span>
          </Link>
        </div>
      </header>

      {/* Central Micro Play/Pause Delight Hotspot */}
      <div
        onClick={handleTogglePlay}
        className="absolute inset-x-0 top-14 bottom-24 flex items-center justify-center cursor-pointer z-15"
      >
        <div
          className={`w-16 h-16 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 pointer-events-none shadow-2xl border border-white/15 ${
            showPlayBadge || !isPlaying
              ? "opacity-100 scale-100"
              : "opacity-0 scale-75"
          }`}
        >
          <span className="material-symbols-outlined text-4xl">
            {isPlaying ? "pause" : "play_arrow"}
          </span>
        </div>
      </div>

      {/* Right Edge Floating Action Rail (Shorts / Reels System) */}
      <aside className="absolute right-3.5 bottom-24 z-30 flex flex-col items-center gap-4">
        {/* Like Action */}
        <button
          type="button"
          onClick={() => setIsLiked((prev) => !prev)}
          className="flex flex-col items-center group focus:outline-none cursor-pointer"
        >
          <div className="w-11 h-11 rounded-full bg-black/35 backdrop-blur-md border border-white/10 flex items-center justify-center text-white shadow-md active:scale-90 transition-all duration-200">
            <span
              className={`material-symbols-outlined text-2xl drop-shadow-md transition-colors ${
                isLiked ? "text-error-container" : ""
              }`}
              style={{
                fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0",
              }}
            >
              favorite
            </span>
          </div>
          <span className="text-xs leading-4 text-white mt-1 drop-shadow-md font-semibold tracking-tight">
            {displayedLikes}
          </span>
        </button>

        {/* Comment Action */}
        <button
          type="button"
          onClick={onOpenComments}
          className="flex flex-col items-center group focus:outline-none cursor-pointer"
        >
          <div className="w-11 h-11 rounded-full bg-black/35 backdrop-blur-md border border-white/10 flex items-center justify-center text-white shadow-md active:scale-90 transition-all duration-200">
            <span className="material-symbols-outlined text-2xl drop-shadow-md">
              chat_bubble
            </span>
          </div>
          <span className="text-xs leading-4 text-white mt-1 drop-shadow-md font-semibold tracking-tight">
            {clip.commentsCount}
          </span>
        </button>

        {/* Bookmark / Save Button with Warm Gold Accent */}
        <button
          type="button"
          onClick={() => {
            setIsBookmarked((prev) => !prev);
            onShowToast(
              !isBookmarked
                ? "Saved to Reminders for Fajr"
                : "Removed from Saved"
            );
          }}
          className="flex flex-col items-center group focus:outline-none cursor-pointer"
        >
          <div
            className={`w-11 h-11 rounded-full backdrop-blur-md flex items-center justify-center shadow-lg active:scale-90 transition-all duration-200 ${
              isBookmarked
                ? "bg-secondary-container/90 border border-secondary-fixed/30 text-on-secondary-container"
                : "bg-black/35 border border-white/10 text-white"
            }`}
          >
            <span
              className="material-symbols-outlined text-2xl drop-shadow-xs"
              style={{
                fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0",
              }}
            >
              bookmark
            </span>
          </div>
          <span
            className={`text-xs leading-4 mt-1 drop-shadow-md font-bold tracking-tight ${
              isBookmarked ? "text-secondary-container" : "text-white"
            }`}
          >
            {displayedSaves}
          </span>
        </button>

        {/* Save Offline / Download */}
        <button
          type="button"
          onClick={handleDownload}
          className="flex flex-col items-center group focus:outline-none cursor-pointer"
        >
          <div className="w-11 h-11 rounded-full bg-black/35 backdrop-blur-md border border-white/10 flex items-center justify-center text-white shadow-md active:scale-90 transition-all duration-200">
            <span className="material-symbols-outlined text-2xl drop-shadow-md">
              download_for_offline
            </span>
          </div>
          <span className="text-[11px] leading-3.5 text-white/95 mt-1 drop-shadow-md font-medium">
            Offline
          </span>
        </button>

        {/* Share Action */}
        <button
          type="button"
          onClick={() => onShowToast("Clip link copied to clipboard")}
          className="flex flex-col items-center group focus:outline-none cursor-pointer"
        >
          <div className="w-11 h-11 rounded-full bg-black/35 backdrop-blur-md border border-white/10 flex items-center justify-center text-white shadow-md active:scale-90 transition-all duration-200">
            <span className="material-symbols-outlined text-2xl drop-shadow-md">
              share
            </span>
          </div>
          <span className="text-[11px] leading-3.5 text-white/95 mt-1 drop-shadow-md font-medium">
            Share
          </span>
        </button>

        {/* Audio Disc / Creator Vinyl Indicator */}
        <div className="w-10 h-10 rounded-full p-0.5 mt-1 bg-linear-to-tr from-secondary-container via-primary-container to-primary-fixed shadow-lg animate-[spin_7s_linear_infinite] cursor-pointer">
          <img
            alt="Audio track source"
            className="w-full h-full rounded-full object-cover border border-black/40"
            src={clip.avatar}
          />
        </div>
      </aside>

      {/* Bottom Content Overlay (Modern Instagram Reels & YouTube Shorts System — Clean, No Banner/Tag Clutter) */}
      <div className="absolute bottom-24 left-0 right-16 z-25 px-4 flex flex-col gap-2 max-w-[84%]">
        {/* Creator Identity Row */}
        <div className="flex items-center gap-2.5">
          <div className="relative shrink-0">
            <img
              alt={clip.scholar}
              className="w-10 h-10 rounded-full object-cover border border-white/40 shadow-md"
              src={clip.avatar}
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-secondary-container border border-black/60 flex items-center justify-center">
              <span className="material-symbols-outlined text-[10px] text-on-secondary-container font-bold">
                check
              </span>
            </div>
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-sm leading-5 text-white font-bold drop-shadow-xs truncate">
                {clip.scholar}
              </span>
              <span
                className="material-symbols-outlined text-secondary-container text-base drop-shadow-xs shrink-0"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                stars
              </span>
            </div>
            <span className="text-xs leading-4 text-white/80 truncate drop-shadow-xs">
              {clip.institute}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsFollowing((prev) => !prev)}
            className="ml-1 px-3.5 py-1 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/25 text-white text-xs leading-4 font-semibold tracking-wide active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>

        {/* Reel Caption / Title */}
        <p className="text-[13.5px] leading-relaxed text-white/95 drop-shadow-md line-clamp-2 pr-2">
          {clip.caption}
        </p>

        {/* Modern Audio / Sound Tag */}
        <div className="flex items-center gap-2 text-white/85 pt-0.5">
          <span className="material-symbols-outlined text-[15px] animate-pulse">
            graphic_eq
          </span>
          <span className="text-xs leading-4 tracking-wide truncate drop-shadow-xs">
            Original Audio — {clip.institute}
          </span>
        </div>
      </div>

      {/* Scrubber Timeline Progress Bar (Flush Right Above Bottom Navigation) */}
      <div className="absolute bottom-20 inset-x-0 h-1 bg-white/20 z-30">
        <div
          className="h-full bg-secondary-container relative transition-all duration-200"
          style={{ width: `${progressPercent}%` }}
        >
          <span className="absolute right-0 -top-1 w-3 h-3 rounded-full bg-secondary-container shadow-[0_0_8px_rgba(254,206,101,0.9)] scale-75" />
        </div>
      </div>
    </div>
  );
}

interface HomeFeedViewProps {
  initialMode?: "feed" | "comments" | "caught-up";
}

export function HomeFeedView({ initialMode = "feed" }: HomeFeedViewProps) {
  const [mode, setMode] = useState<"feed" | "comments" | "caught-up">(
    initialMode
  );
  const [activeClipIndex, setActiveClipIndex] = useState(0);
  const [sessionLimit, setSessionLimit] = useState(20);
  const [isMuted, setIsMuted] = useState(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const visibleClips = SIMULATED_FEED_CLIPS.slice(0, sessionLimit);

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2600);
  }, []);

  const handleScroll = () => {
    const container = scrollerRef.current;
    if (!container) return;
    const cardHeight = container.clientHeight;
    if (cardHeight <= 0) return;

    const newIndex = Math.round(container.scrollTop / cardHeight);
    if (newIndex !== activeClipIndex && newIndex >= 0) {
      if (newIndex >= visibleClips.length) {
        setMode("caught-up");
      } else {
        setActiveClipIndex(newIndex);
      }
    }
  };

  const scrollToClipIndex = (nextIdx: number) => {
    if (nextIdx >= visibleClips.length) {
      setMode("caught-up");
      return;
    }
    const container = scrollerRef.current;
    if (container) {
      container.scrollTo({
        top: nextIdx * container.clientHeight,
        behavior: "smooth",
      });
    }
    setActiveClipIndex(nextIdx);
  };

  if (mode === "caught-up") {
    return (
      <div className="min-h-screen flex flex-col bg-surface text-on-surface">
        <TopHeader title="Home Feed" />
        <main className="flex-1 flex flex-col relative w-full max-w-120 mx-auto pt-16 pb-24 bg-surface">
          <AllCaughtUpView
            watchedCount={sessionLimit}
            onWatchMore={() => {
              setSessionLimit((prev) => prev + 10);
              setMode("feed");
            }}
          />
        </main>
        <BottomNav activeTab="home" />
      </div>
    );
  }

  if (mode === "comments") {
    return (
      <div className="min-h-screen flex flex-col bg-surface text-on-surface">
        <TopHeader title="Home Feed" />
        <main className="flex-1 flex flex-col relative w-full max-w-120 mx-auto pt-16 pb-24 bg-surface">
          <CommentsSheet onClose={() => setMode("feed")} />
        </main>
        <BottomNav activeTab="home" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-dvh bg-black text-white overflow-hidden select-none">
      {/* Toast Feedback */}
      {toastMsg && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-white text-xs font-medium shadow-lg whitespace-nowrap">
          {toastMsg}
        </div>
      )}

      {/* Full-Viewport Vertical Reels / Shorts Snap Scroller */}
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="w-full max-w-120 mx-auto h-dvh overflow-y-auto snap-y snap-mandatory flex flex-col bg-black no-scrollbar"
      >
        {visibleClips.map((clip, idx) => (
          <SingleReelStage
            key={`${clip.id}-${idx}`}
            clip={clip}
            index={idx}
            totalSessionClips={sessionLimit}
            isActive={idx === activeClipIndex}
            isMuted={isMuted}
            onToggleMute={() => setIsMuted((prev) => !prev)}
            onOpenComments={() => setMode("comments")}
            onClipEndedOrCapped={() => scrollToClipIndex(idx + 1)}
            onJumpToCaughtUp={() => setMode("caught-up")}
            onShowToast={showToast}
          />
        ))}

        {/* Final Snap Slide at the bottom of the 20 clips: Transitions to All Caught Up */}
        <div className="snap-start shrink-0 w-full h-dvh bg-black px-6 pb-20 flex flex-col items-center justify-center text-center gap-3">
          <span
            className="material-symbols-outlined text-secondary-container text-4xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            wb_twilight
          </span>
          <h3 className="text-xl font-bold text-white">
            You&apos;ve reached clip {sessionLimit} of {sessionLimit}
          </h3>
          <p className="text-sm text-white/75 max-w-xs">
            Alhamdulillah, you completed today&apos;s finite feed of 1m 30s
            reflections.
          </p>
          <button
            type="button"
            onClick={() => setMode("caught-up")}
            className="mt-2 px-6 py-3 rounded-full bg-primary-container text-white text-sm font-semibold shadow-md hover:bg-primary-dark transition-colors cursor-pointer"
          >
            View All Caught Up Summary
          </button>
        </div>
      </div>

      {/* Bottom Navigation Bar (Unchanged 4 tabs + center Submit button) */}
      <BottomNav activeTab="home" />
    </div>
  );
}
