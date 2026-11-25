"use client";

import { useState } from "react";
import Link from "next/link";

interface AllCaughtUpViewProps {
  watchedCount?: number;
  onWatchMore?: () => void;
}

export function AllCaughtUpView({
  watchedCount = 20,
  onWatchMore,
}: AllCaughtUpViewProps) {
  const [extendingText, setExtendingText] = useState<string | null>(null);

  const handleExtend = () => {
    setExtendingText("Preparing 10 intentional clips...");
    setTimeout(() => {
      if (onWatchMore) {
        onWatchMore();
      } else {
        setExtendingText("Feed ready. Tap Home to resume.");
      }
    }, 650);
  };

  return (
    <div className="flex flex-col w-full px-4 pb-8 pt-2">
      {/* Subtle Ornamental Ambient Card */}
      <div className="relative w-full rounded-2xl bg-surface-container-lowest shadow-xs overflow-hidden flex flex-col items-center text-center p-6">
        {/* Decorative Ambient Arabesque Watermark (Inline Lightweight SVG) */}
        <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center">
          <svg
            className="w-full h-full text-primary-dark"
            fill="none"
            viewBox="0 0 400 400"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="200"
              cy="200"
              r="140"
              stroke="currentColor"
              strokeDasharray="4 6"
              strokeWidth="1.5"
            />
            <circle
              cx="200"
              cy="200"
              r="90"
              stroke="currentColor"
              strokeWidth="1"
            />
            <polygon
              points="200,70 238,162 330,200 238,238 200,330 162,238 70,200 162,162"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <polygon
              points="200,105 225,175 295,200 225,225 200,295 175,225 105,200 175,175"
              stroke="currentColor"
              strokeDasharray="3 3"
              strokeWidth="1"
            />
            <circle
              cx="200"
              cy="200"
              r="180"
              stroke="currentColor"
              strokeOpacity="0.6"
              strokeWidth="0.75"
            />
          </svg>
        </div>

        {/* Radiant Lantern & Open Book Visual Anchor */}
        <div className="relative my-4 flex items-center justify-center">
          {/* Radiating Soft Light Halo Rings */}
          <div className="absolute w-36 h-36 rounded-full bg-secondary-fixed/40 blur-xl" />
          <div className="absolute w-24 h-24 rounded-full bg-primary-fixed/50 blur-md" />
          {/* Illuminated Icon Container */}
          <div className="relative z-10 w-24 h-24 rounded-full bg-surface-container-low flex flex-col items-center justify-center shadow-md">
            <div className="relative flex items-center justify-center">
              <span
                className="material-symbols-outlined text-secondary text-4xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                wb_twilight
              </span>
              <span
                className="material-symbols-outlined text-primary-dark text-[28px] absolute -bottom-1"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                menu_book
              </span>
            </div>
          </div>
          {/* Floating Ambient Star Accents */}
          <span className="material-symbols-outlined absolute -top-1 -right-2 text-secondary text-lg">
            arrow_back_ios_new
          </span>
          <span className="material-symbols-outlined absolute bottom-1 -left-2 text-primary-fixed-dim text-base">
            auto_awesome
          </span>
        </div>

        {/* Main Completion Headline */}
        <h2 className="relative z-10 text-[26px] leading-8.5 text-on-surface font-bold tracking-[-0.01em] max-w-xs mt-1">
          You&apos;re all caught up, alhamdulillah.
        </h2>

        {/* Arabic Quranic Ayah */}
        <div className="relative z-10 my-2.5 px-4 py-1.5 rounded-full bg-surface-container inline-flex items-center gap-1.5">
          <span
            className="font-arabic text-lg leading-7 text-primary-dark font-bold tracking-wide"
            dir="rtl"
            lang="ar"
          >
            وَقُل رَّبِّ زِدْنِي عِلْمًا
          </span>
        </div>
        <p className="relative z-10 text-[11px] leading-3.5 text-on-surface-variant italic mb-2.5">
          “And say, ‘My Lord, increase me in knowledge.’” (Surah Taha 20:114)
        </p>

        {/* Thoughtful Subtext */}
        <p className="relative z-10 text-sm leading-5 text-on-surface-variant max-w-sm px-1 mb-4">
          You&apos;ve watched {watchedCount} beneficial clips today. Rest your
          eyes, implement what you&apos;ve learned, or revisit what you saved.
        </p>

        {/* Mindful Consumption Summary Pill */}
        <div className="relative z-10 w-full max-w-xs bg-surface-container-high/80 rounded-xl px-4 py-2.5 flex items-center justify-center gap-1.5 mb-6">
          <span
            className="material-symbols-outlined text-primary-dark text-lg"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            spa
          </span>
          <span className="text-xs leading-4 text-primary-dark font-medium text-center">
            24 mins mindful study • 0 doomscrolling
          </span>
        </div>

        {/* Primary & Secondary Intentional Actions */}
        <div className="relative z-10 w-full flex flex-col gap-2.5 max-w-xs">
          {/* Primary Action: Saved Clips */}
          <Link
            className="w-full h-12 rounded-full bg-primary-container text-on-primary flex items-center justify-center gap-2 text-sm leading-5 font-semibold shadow-xs hover:opacity-95 active:scale-[0.98] transition-all"
            href="/saved"
          >
            <span
              className="material-symbols-outlined text-xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              bookmark
            </span>
            <span>Open saved clips</span>
          </Link>

          {/* Secondary Action: Explore Library */}
          <Link
            className="w-full h-12 rounded-full bg-surface-container-low text-primary-dark flex items-center justify-center gap-2 text-sm leading-5 font-semibold hover:bg-surface-container transition-all"
            href="/library"
          >
            <span className="material-symbols-outlined text-xl">
              explore
            </span>
            <span>Browse library by topic</span>
          </Link>
        </div>

        {/* Soft Tertiary Option */}
        <div className="relative z-10 mt-6 pt-1">
          <button
            onClick={handleExtend}
            className="text-[11px] leading-3.5 font-medium text-outline hover:text-on-surface-variant transition-colors py-1 px-2 cursor-pointer"
            type="button"
          >
            {extendingText ?? "Watch 10 more clips today"}
          </button>
        </div>
      </div>

      {/* Introspective Prompt Card (Moment of Delight & Dhikr) */}
      <div className="mt-4 w-full rounded-2xl bg-surface-container p-4 flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center shrink-0 text-primary-dark">
          <span className="material-symbols-outlined text-[22px]">
            psychology_alt
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[11px] leading-3.5 text-secondary font-semibold uppercase tracking-wider block">
            Contemplation Prompt
          </span>
          <p className="text-[13px] leading-4.5 text-on-surface font-medium mt-0.5">
            Which teaching resonated most with you during this session? Write a
            short reflection or make a quiet du&apos;a before continuing your
            day.
          </p>
        </div>
      </div>
    </div>
  );
}
