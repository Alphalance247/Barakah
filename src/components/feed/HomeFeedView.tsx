"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { AllCaughtUpView } from "./AllCaughtUpView";
import { CommentsSheet } from "@/components/comments";
import {
  SIMULATED_FEED_CLIPS,
  type SimulatedFeedClip,
} from "@/data/seed";
import { MAX_CLIP_DURATION_SECONDS } from "@/constants/barakah";
import { formatBarakahDownloadFilename } from "@/utils";

function formatSeconds(sec: number): string {
  const clamped = Math.max(0, Math.min(Math.floor(sec), MAX_CLIP_DURATION_SECONDS));
  const m = Math.floor(clamped / 60);
  const s = clamped % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

function formatCompactCount(num: number): string {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return String(num);
}

interface SingleVideoStageProps {
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

function SingleVideoStage({
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
}: SingleVideoStageProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showPlayBadge, setShowPlayBadge] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [cappedDuration, setCappedDuration] = useState(MAX_CLIP_DURATION_SECONDS);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(index === 0);
  const [isFollowing, setIsFollowing] = useState(false);

  // Sync play/pause when user scrolls this card into or out of view
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
      onShowToast("1:30 max clip limit reached • Scroll for next reflection");
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
    <div
      className="snap-start shrink-0 relative w-full rounded-2xl overflow-hidden bg-primary-dark shadow-xl select-none"
      style={{ height: "calc(100vh - 9.25rem)", minHeight: "560px" }}
    >
      {/* Real HTML5 Video from public/videos/ with Poster fallback & 1:30 cap */}
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
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Top Ambient Shadow */}
      <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-primary-dark/80 via-primary-dark/30 to-transparent pointer-events-none" />
      {/* Bottom Cinematic Emerald Scrim */}
      <div className="absolute inset-x-0 bottom-0 h-96 bg-linear-to-t from-primary-scrim/95 via-primary-scrim/65 to-transparent pointer-events-none" />

      {/* Top In-Feed Bar: Feed Navigation, Finite Mindful Counter, Mute & Search */}
      <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-4 pt-4">
        {/* Left: Logo & Feed Context */}
        <div className="flex items-center gap-2 bg-surface-container-lowest/20 backdrop-blur-md px-3 py-1.5 rounded-full shadow-xs">
          <img
            alt="Barakah App Logo"
            className="w-5 h-5 object-contain rounded-full"
            src="/images/barakah-logo.png"
          />
          <span className="text-sm text-on-primary font-semibold tracking-tight">
            Home
          </span>
        </div>

        {/* Right: Daily Session Finite Limit Tracker, Audio Mute & Quick Search */}
        <div className="flex items-center gap-1.5">
          {/* Finite Daily Diet Pill Indicator */}
          <button
            type="button"
            onClick={onJumpToCaughtUp}
            title="Tap to finish session (All Caught Up)"
            className="flex items-center gap-1.5 px-3 py-1 bg-surface-container-lowest/20 backdrop-blur-md rounded-full shadow-xs hover:bg-surface-container-lowest/30 transition-colors cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulse" />
            <span className="text-[11px] leading-3.5 text-on-primary tracking-wide">
              <span className="font-semibold text-secondary-container">{index + 1}</span>{" "}
              of {totalSessionClips} today
            </span>
          </button>

          {/* Mute / Unmute Toggle */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleMute();
            }}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            className="w-8 h-8 rounded-full bg-surface-container-lowest/20 backdrop-blur-md flex items-center justify-center text-on-primary hover:bg-surface-container-lowest/30 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">
              {isMuted ? "volume_off" : "volume_up"}
            </span>
          </button>

          {/* Search Quick Action */}
          <Link
            href="/library"
            aria-label="Search Lectures"
            className="w-8 h-8 rounded-full bg-surface-container-lowest/20 backdrop-blur-md flex items-center justify-center text-on-primary hover:bg-surface-container-lowest/30 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">
              search
            </span>
          </Link>
        </div>
      </div>

      {/* Central Micro Play/Pause Touch Target */}
      <div
        onClick={handleTogglePlay}
        className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
      >
        <div
          className={`w-14 h-14 rounded-full bg-primary-dark/50 backdrop-blur-md flex items-center justify-center text-on-primary transition-all duration-300 pointer-events-none shadow-lg ${
            showPlayBadge || !isPlaying
              ? "opacity-100 scale-100"
              : "opacity-0 scale-75"
          }`}
        >
          <span className="material-symbols-outlined text-[32px]">
            {isPlaying ? "pause" : "play_arrow"}
          </span>
        </div>
      </div>

      {/* Right Edge Vertical HUD Action Rail */}
      <aside className="absolute right-2.5 bottom-20 z-30 flex flex-col items-center gap-3">
        {/* Like Action */}
        <button
          type="button"
          onClick={() => setIsLiked((prev) => !prev)}
          className="flex flex-col items-center group focus:outline-none cursor-pointer"
        >
          <div className="w-11 h-11 rounded-full bg-inverse-surface/45 backdrop-blur-md flex items-center justify-center text-on-primary shadow-xs group-active:scale-90 transition-all duration-200">
            <span
              className={`material-symbols-outlined text-[22px] transition-colors ${
                isLiked ? "text-error-container" : "group-hover:text-error-container"
              }`}
              style={{
                fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0",
              }}
            >
              favorite
            </span>
          </div>
          <span className="text-[11px] leading-3.5 text-on-primary mt-1 drop-shadow-xs font-medium">
            {displayedLikes}
          </span>
        </button>

        {/* Comments / Contemplation Reflection Drawer */}
        <button
          type="button"
          onClick={onOpenComments}
          className="flex flex-col items-center group focus:outline-none cursor-pointer"
        >
          <div className="w-11 h-11 rounded-full bg-inverse-surface/45 backdrop-blur-md flex items-center justify-center text-on-primary shadow-xs group-active:scale-90 transition-all duration-200">
            <span className="material-symbols-outlined text-[22px]">
              chat_bubble
            </span>
          </div>
          <span className="text-[11px] leading-3.5 text-on-primary mt-1 drop-shadow-xs font-medium">
            {clip.commentsCount}
          </span>
        </button>

        {/* Saved / Bookmark Button with Warm Gold Glow */}
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
            className={`w-11 h-11 rounded-full backdrop-blur-md flex items-center justify-center shadow-md group-active:scale-90 transition-all duration-200 ${
              isBookmarked
                ? "bg-secondary-container/90 text-on-secondary-container"
                : "bg-inverse-surface/45 text-on-primary"
            }`}
          >
            <span
              className="material-symbols-outlined text-[22px]"
              style={{
                fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0",
              }}
            >
              bookmark
            </span>
          </div>
          <span
            className={`text-[11px] leading-3.5 mt-1 drop-shadow-xs font-semibold ${
              isBookmarked ? "text-secondary-container" : "text-on-primary"
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
          <div className="w-11 h-11 rounded-full bg-inverse-surface/45 backdrop-blur-md flex items-center justify-center text-on-primary shadow-xs group-active:scale-90 transition-all duration-200">
            <span className="material-symbols-outlined text-[22px]">
              download_for_offline
            </span>
          </div>
          <span className="text-[11px] leading-3.5 text-on-primary mt-1 drop-shadow-xs font-medium">
            Offline
          </span>
        </button>

        {/* Share Action */}
        <button
          type="button"
          onClick={() => onShowToast("Clip link copied to clipboard")}
          className="flex flex-col items-center group focus:outline-none cursor-pointer"
        >
          <div className="w-11 h-11 rounded-full bg-inverse-surface/45 backdrop-blur-md flex items-center justify-center text-on-primary shadow-xs group-active:scale-90 transition-all duration-200">
            <span className="material-symbols-outlined text-[22px]">
              share
            </span>
          </div>
          <span className="text-[11px] leading-3.5 text-on-primary mt-1 drop-shadow-xs font-medium">
            Share
          </span>
        </button>

        {/* Audio Disk Mini Badge */}
        <div className="w-9 h-9 rounded-full bg-primary-container p-0.5 mt-1 shadow-md animate-[spin_6s_linear_infinite]">
          <img
            alt="Audio track source"
            className="w-full h-full rounded-full object-cover"
            src={clip.avatar}
          />
        </div>
      </aside>

      {/* Bottom Content Overlay Deck */}
      <div className="absolute bottom-3 left-0 right-16 z-20 px-4 flex flex-col gap-2.5">
        {/* Creator Row: Scholar Identity & Gold Verified Mark */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <img
              alt={clip.scholar}
              className="w-10 h-10 rounded-full object-cover shadow-md"
              src={clip.avatar}
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-secondary-container flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[10px] text-on-secondary-container font-bold">
                check
              </span>
            </div>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-sm text-on-primary font-bold truncate">
                {clip.scholar}
              </span>
              <span
                className="material-symbols-outlined text-secondary-container text-base drop-shadow-xs"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                stars
              </span>
            </div>
            <span className="text-[11px] leading-3.5 text-surface-container-high/80">
              {clip.institute}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsFollowing((prev) => !prev)}
            className="ml-1 px-3 py-1 rounded-full bg-surface-container-lowest/20 backdrop-blur-md text-on-primary text-[11px] leading-3.5 font-medium hover:bg-surface-container-lowest/30 transition-all cursor-pointer"
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>

        {/* Sacred Arabic Calligraphy Snippet + Capped Time Indicator (<= 1:30) */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary-container/40 backdrop-blur-md self-start shadow-xs">
            <span className="material-symbols-outlined text-secondary-container text-base">
              wb_twilight
            </span>
            <span
              className="font-arabic text-on-primary font-semibold text-[15px] tracking-wide"
              dir="rtl"
              lang="ar"
            >
              {clip.arabicAyah}
            </span>
            <span className="text-[11px] leading-3.5 text-secondary-fixed-dim/90">
              | {clip.ayahRef}
            </span>
          </div>

          <span className="px-2 py-1 rounded-full bg-inverse-surface/50 backdrop-blur-md text-[10px] font-medium text-secondary-container">
            {formatSeconds(currentTime)} / {formatSeconds(cappedDuration)} (Max 1:30)
          </span>
        </div>

        {/* Video Caption / Reflective Quote */}
        <p className="text-sm leading-5 text-surface-bright/95 line-clamp-2 drop-shadow-xs pr-1">
          {clip.caption}
        </p>

        {/* Topic Pills */}
        <div className="flex items-center gap-1.5 pt-0.5 flex-wrap">
          {clip.tags.map((tag, idx) => (
            <span
              key={tag}
              className={`px-2.5 py-0.5 rounded-full bg-surface-container-lowest/15 backdrop-blur-md text-[11px] leading-3.5 font-medium ${
                idx === 2 ? "text-secondary-container" : "text-on-primary"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Scrubber Timeline Progress Bar (Strictly Capped at 1m 30s) */}
      <div className="absolute bottom-0 inset-x-0 h-1 bg-surface-container-lowest/25 z-30">
        <div
          className="h-full bg-secondary-container transition-all duration-200 relative"
          style={{ width: `${progressPercent}%` }}
        >
          <span className="absolute right-0 -top-1 w-3 h-3 rounded-full bg-secondary-container shadow-[0_0_8px_rgba(254,206,101,0.8)] scale-75" />
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
      <AllCaughtUpView
        watchedCount={sessionLimit}
        onWatchMore={() => {
          setSessionLimit((prev) => prev + 10);
          setMode("feed");
        }}
      />
    );
  }

  if (mode === "comments") {
    return <CommentsSheet onClose={() => setMode("feed")} />;
  }

  return (
    <div className="flex flex-col w-full px-3 pt-1 relative">
      {/* Toast Feedback */}
      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-primary-dark text-white text-xs font-medium shadow-lg whitespace-nowrap">
          {toastMsg}
        </div>
      )}

      {/* Vertical Snap-Scrolling Feed Container */}
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="w-full overflow-y-auto snap-y snap-mandatory flex flex-col gap-4 rounded-2xl no-scrollbar"
        style={{ height: "calc(100vh - 9.25rem)", minHeight: "560px" }}
      >
        {visibleClips.map((clip, idx) => (
          <SingleVideoStage
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

        {/* Final Snap Card at the bottom of the 20 clips: Transitions to All Caught Up */}
        <div
          className="snap-start shrink-0 w-full rounded-2xl bg-surface-container-lowest p-6 flex flex-col items-center justify-center text-center gap-3 shadow-md"
          style={{ height: "calc(100vh - 9.25rem)", minHeight: "560px" }}
        >
          <span
            className="material-symbols-outlined text-secondary text-[40px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            wb_twilight
          </span>
          <h3 className="text-xl font-bold text-on-surface">
            You&apos;ve reached clip {sessionLimit} of {sessionLimit}
          </h3>
          <p className="text-sm text-on-surface-variant max-w-xs">
            Alhamdulillah, you completed today&apos;s finite feed of 1m 30s
            reflections.
          </p>
          <button
            type="button"
            onClick={() => setMode("caught-up")}
            className="mt-2 px-6 py-3 rounded-full bg-primary-container text-on-primary text-sm font-semibold shadow-sm hover:bg-primary-dark transition-colors cursor-pointer"
          >
            View All Caught Up Summary
          </button>
        </div>
      </div>
    </div>
  );
}
