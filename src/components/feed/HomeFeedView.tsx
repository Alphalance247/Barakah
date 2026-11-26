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
import { resolveCreatorSlug } from "@/components/profile";
import { MAX_CLIP_DURATION_SECONDS } from "@/constants/barakah";
import { MaterialIcon } from "@/components/common/MaterialIcon";

function formatCompactCount(num: number): string {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return String(num);
}

interface SingleReelStageProps {
  clip: SimulatedFeedClip;
  index: number;
  isActive: boolean;
  isMuted: boolean;
  feedTab: "following" | "explore";
  onChangeFeedTab: (tab: "following" | "explore") => void;
  onToggleMute: () => void;
  onOpenComments: () => void;
  onClipEndedOrCapped: () => void;
  onShowToast: (msg: string) => void;
}

function SingleReelStage({
  clip,
  index,
  isActive,
  isMuted,
  feedTab,
  onChangeFeedTab,
  onToggleMute,
  onOpenComments,
  onClipEndedOrCapped,
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
  const [isCaptionExpanded, setIsCaptionExpanded] = useState(false);

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
      {/* Unobstructed Video Layer */}
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

      {/* Calibrated Scrim Overlays (Reels/Shorts Style) */}
      {/* Subtle Top Scrim for Status and Navigation Controls */}
      <div className="absolute inset-x-0 top-0 h-36 bg-linear-to-b from-black/75 via-black/30 to-transparent pointer-events-none z-10" />
      {/* Deep Atmospheric Bottom Gradient for Caption & HUD Contrast */}
      <div className="absolute inset-x-0 bottom-0 h-96 bg-linear-to-t from-black/90 via-black/45 to-transparent pointer-events-none z-10" />

      {/* Top Floating Status & Action Bar (Updated per Stitch 41fc6e31122045dc87db8389ed5475d0) */}
      <header className="absolute top-0 inset-x-0 z-30 px-4 py-3 flex items-center justify-between">
        {/* Left: Following & Explore Feed Switcher */}
        <div className="flex items-center gap-5 text-base leading-6 select-none">
          <button
            type="button"
            onClick={() => onChangeFeedTab("following")}
            className={`relative py-1 flex flex-col items-center whitespace-nowrap transition-colors cursor-pointer ${
              feedTab === "following"
                ? "text-white font-bold"
                : "text-white/70 hover:text-white font-medium"
            }`}
          >
            <span>Following</span>
            {feedTab === "following" && (
              <span className="absolute -bottom-0.5 w-4 h-0.5 rounded-full bg-secondary-container" />
            )}
          </button>

          <button
            type="button"
            onClick={() => onChangeFeedTab("explore")}
            className={`relative py-1 flex flex-col items-center whitespace-nowrap transition-colors cursor-pointer ${
              feedTab === "explore"
                ? "text-white font-bold"
                : "text-white/70 hover:text-white font-medium"
            }`}
          >
            <span>Explore</span>
            {feedTab === "explore" && (
              <span className="absolute -bottom-0.5 w-4 h-0.5 rounded-full bg-secondary-container" />
            )}
          </button>
        </div>

        {/* Right: Search, Sound & Profile Avatar with generous spacing from tabs */}
        <div className="flex items-center gap-2.5 ml-auto">
          <Link
            href="/library"
            aria-label="Search Feed"
            className="w-8 h-8 rounded-full bg-black/35 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/90 active:scale-95 transition-transform"
          >
            <MaterialIcon name="search" className="text-lg" />
          </Link>

          <button
            type="button"
            aria-label="Toggle Audio"
            onClick={(e) => {
              e.stopPropagation();
              onToggleMute();
            }}
            className="w-8 h-8 rounded-full bg-black/35 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/90 active:scale-95 transition-transform cursor-pointer"
          >
            <MaterialIcon name={isMuted ? "volume_off" : "volume_up"} className="text-[17px]" />
          </button>

          <Link
            href="/profile"
            aria-label="User Profile"
            className="w-8 h-8 rounded-full border border-white/20 overflow-hidden shrink-0 cursor-pointer active:scale-95 transition-transform"
          >
            <img
              alt="User Profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTjBYUNCtw6WFjawNCFE3YA3Vc-TqmysjuMM4ewsZVd_5ERBfPb4_8KGyeo4X_oeGpuIUGfjkJeqdNy6y5txGanG6eTcLYmK3EUzGEo_pWOuw9-sEJeUDzs1hC6JxA6g171cBYo8YCU88GkA41M4LkkeF3xVXGCwBW6q6eHQqogo8qtKy9fXVW0pkWkZ2BRprBgQungDCiaIgpP4VLOYdsGmC3V9GcmUV5dKDNmGI"
            />
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
          <MaterialIcon name={isPlaying ? "pause" : "play_arrow"} className="text-4xl" />
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
            <MaterialIcon name="favorite" className={`text-2xl drop-shadow-md transition-colors ${
                isLiked ? "text-error" : ""
              }`}
              style={{
                fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0",
              }}
             />
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
            <MaterialIcon name="chat_bubble" className="text-2xl drop-shadow-md" />
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
            <MaterialIcon
              name="bookmark"
              className="text-2xl drop-shadow-xs"
              style={{
                fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0",
              }}
            />
          </div>
          <span
            className={`text-xs leading-4 mt-1 drop-shadow-md font-bold tracking-tight ${
              isBookmarked ? "text-secondary-container" : "text-white"
            }`}
          >
            {displayedSaves}
          </span>
        </button>

        {/* Share Action */}
        <button
          type="button"
          onClick={() => onShowToast("Clip link copied to clipboard")}
          className="flex flex-col items-center group focus:outline-none cursor-pointer"
        >
          <div className="w-11 h-11 rounded-full bg-black/35 backdrop-blur-md border border-white/10 flex items-center justify-center text-white shadow-md active:scale-90 transition-all duration-200">
            <MaterialIcon name="share" className="text-2xl drop-shadow-md" />
          </div>
          <span className="text-[11px] leading-3.5 text-white/95 mt-1 drop-shadow-md font-medium">
            Share
          </span>
        </button>
      </aside>

      {/* Bottom Content Overlay (Modern Instagram Reels & YouTube Shorts System) */}
      <div className="absolute bottom-24 left-0 right-18 z-25 px-4 flex flex-col gap-2 max-w-[84%]">
        {/* Creator Identity Row */}
        <div className="flex items-center gap-2.5">
          <Link
            href={`/creator/${resolveCreatorSlug(clip.scholar)}`}
            className="relative shrink-0 hover:opacity-90 transition-opacity"
          >
            <img
              alt={clip.scholar}
              className="w-10 h-10 rounded-full object-cover border border-white/40 shadow-md"
              src={clip.avatar}
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-secondary-container border border-black/60 flex items-center justify-center overflow-hidden">
              <MaterialIcon
                name="check"
                className="text-[10px] leading-none text-on-secondary-container font-bold"
              />
            </div>
          </Link>

          <Link
            href={`/creator/${resolveCreatorSlug(clip.scholar)}`}
            className="flex items-center gap-2 flex-wrap min-w-0 hover:underline decoration-white/70"
          >
            <span className="text-sm leading-5 text-white font-bold drop-shadow-xs truncate">
              {clip.scholar}
            </span>
            <MaterialIcon name="stars" className="text-secondary-container text-base drop-shadow-xs shrink-0"
              style={{ fontVariationSettings: "'FILL' 1" }}
             />
            <span className="text-white/60 text-xs font-normal">•</span>
            <span className="text-xs leading-4 text-white/80 truncate drop-shadow-xs">
              {clip.institute}
            </span>
          </Link>

          <button
            type="button"
            onClick={() => {
              setIsFollowing((prev) => !prev);
              onShowToast(
                !isFollowing
                  ? `Following ${clip.scholar}`
                  : `Unfollowed ${clip.scholar}`
              );
            }}
            className="ml-1 px-3 py-1 rounded-full bg-primary-container/80 hover:bg-primary-container text-primary-fixed border border-primary-fixed/30 backdrop-blur-md text-[11.5px] leading-4 font-semibold tracking-wide active:scale-95 transition-all shrink-0 flex items-center gap-1 shadow-2xs cursor-pointer"
          >
            <MaterialIcon name={isFollowing ? "check" : "add"} className="text-[13px]" />
            <span>{isFollowing ? "Following" : "Follow"}</span>
          </button>
        </div>

        {/* Reel Caption / Title: 1-line truncated with inline "See more" expansion */}
        {isCaptionExpanded ? (
          <div className="text-[13.5px] leading-relaxed text-white/95 drop-shadow-md pr-2">
            <span>{clip.caption} </span>
            <button
              type="button"
              onClick={() => setIsCaptionExpanded(false)}
              className="font-semibold text-white/80 hover:text-white text-xs transition-colors cursor-pointer"
            >
              See less
            </button>
          </div>
        ) : (
          <div className="flex items-baseline gap-1 text-[13.5px] text-white/95 drop-shadow-md pr-2">
            <span className="truncate">{clip.caption}</span>
            <button
              type="button"
              onClick={() => setIsCaptionExpanded(true)}
              className="font-semibold text-white/80 hover:text-white shrink-0 text-xs transition-colors cursor-pointer"
            >
              See more
            </button>
          </div>
        )}

        {/* Modern Audio / Sound Tag */}
        <div className="flex items-center gap-2 text-white/85 pt-0.5">
          <MaterialIcon name="graphic_eq" className="text-[15px] animate-pulse" />
          <span className="text-xs leading-4 tracking-wide truncate drop-shadow-xs">
            Original Audio — {clip.institute}
          </span>
        </div>
      </div>

      {/* Scrubber Timeline Progress Bar (Flush Right Above Bottom Navigation) */}
      <div className="absolute bottom-20 inset-x-0 h-1 bg-white/20 z-30">
        <div
          className="h-full bg-secondary-container relative transition-all duration-300"
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
  const [feedTab, setFeedTab] = useState<"following" | "explore">("explore");
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
            isActive={idx === activeClipIndex}
            isMuted={isMuted}
            feedTab={feedTab}
            onChangeFeedTab={(tab) => {
              setFeedTab(tab);
              showToast(
                tab === "following"
                  ? "Showing scholars you follow"
                  : "Exploring verified reminders"
              );
            }}
            onToggleMute={() => setIsMuted((prev) => !prev)}
            onOpenComments={() => setMode("comments")}
            onClipEndedOrCapped={() => scrollToClipIndex(idx + 1)}
            onShowToast={showToast}
          />
        ))}
      </div>

      {/* Sleek Dark Frosted Glass Bottom Navigation Bar */}
      <BottomNav activeTab="home" variant="dark" />
    </div>
  );
}
