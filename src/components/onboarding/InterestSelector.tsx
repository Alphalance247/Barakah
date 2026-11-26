"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MaterialIcon } from "@/components/common/MaterialIcon";

interface OnboardingTopicCard {
  id: string;
  title: string;
  clipsLabel: string;
  icon: string;
  filledIcon?: boolean;
}

const ONBOARDING_TOPICS: OnboardingTopicCard[] = [
  {
    id: "quran",
    title: "Quran & Tafsir",
    clipsLabel: "180+ clips",
    icon: "menu_book",
    filledIcon: true,
  },
  {
    id: "prayer",
    title: "Prayer (Salah)",
    clipsLabel: "95+ clips",
    icon: "front_hand",
  },
  {
    id: "seerah",
    title: "Seerah",
    clipsLabel: "140+ clips",
    icon: "explore",
  },
  {
    id: "character",
    title: "Character (Akhlaq)",
    clipsLabel: "110+ clips",
    icon: "psychology",
  },
  {
    id: "family",
    title: "Family & Youth",
    clipsLabel: "75+ clips",
    icon: "diversity_1",
  },
  {
    id: "duas",
    title: "Duas & Adhkar",
    clipsLabel: "130+ clips",
    icon: "favorite",
  },
  {
    id: "fiqh",
    title: "Fiqh Basics",
    clipsLabel: "85+ clips",
    icon: "balance",
  },
  {
    id: "fasting",
    title: "Fasting & Seasons",
    clipsLabel: "60+ clips",
    icon: "bedtime",
  },
  {
    id: "hadith",
    title: "Hadith & Sunnah",
    clipsLabel: "165+ clips",
    icon: "history_edu",
  },
  {
    id: "tazkiyah",
    title: "Tazkiyah (Soul)",
    clipsLabel: "90+ clips",
    icon: "spa",
  },
  {
    id: "identity",
    title: "Modern Identity",
    clipsLabel: "105+ clips",
    icon: "wb_twilight",
  },
  {
    id: "heritage",
    title: "Islamic Heritage",
    clipsLabel: "80+ clips",
    icon: "account_balance",
  },
];

export function InterestSelector() {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>([
    "quran",
    "prayer",
    "seerah",
    "character",
  ]);

  const toggleTopic = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const count = selectedIds.length;
  const isMinReached = count >= 3;

  return (
    <main className="flex-1 flex flex-col relative w-full min-h-screen bg-surface text-on-surface">
      <div className="flex flex-col w-full max-w-107.5 mx-auto px-4 pb-6 relative overflow-hidden select-none">
        {/* Subtle Ambient Spiritual Watermark (Geometric Rosette Accent) */}
        <div className="absolute -top-16 -right-16 w-56 h-56 text-primary-dark pointer-events-none opacity-5">
          <svg
            aria-hidden="true"
            className="w-full h-full fill-current"
            viewBox="0 0 100 100"
          >
            <path d="M50 0 L58 35 L93 21 L69 50 L93 79 L58 65 L50 100 L42 65 L7 79 L31 50 L7 21 L42 35 Z" />
            <circle
              cx="50"
              cy="50"
              fill="none"
              r="18"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Top Navigation & Progress Header */}
        <header className="flex items-center justify-between w-full pt-3 pb-4 relative z-10">
          <Link
            href="/auth"
            aria-label="Go back"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-high active:scale-95 transition-all text-on-surface"
          >
            <MaterialIcon name="arrow_back" className="text-xl" />
          </Link>

          {/* Multi-step Indicator: Step 2 of 3 */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container">
            <span
              className="w-2 h-2 rounded-full bg-primary-dark"
              title="Step 1 completed"
            />
            <span
              className="w-5 h-2 rounded-full bg-primary-dark transition-all duration-300"
              title="Step 2 current"
            />
            <span
              className="w-2 h-2 rounded-full bg-outline-variant"
              title="Step 3 upcoming"
            />
            <span className="text-[11px] leading-3.5 font-medium text-on-surface-variant ml-1">
              Step 2 of 3
            </span>
          </div>

          <Link
            href="/feed"
            className="text-xs leading-4 font-medium text-on-surface-variant hover:text-primary-dark transition-colors py-1.5 px-2"
          >
            Skip for now
          </Link>
        </header>

        {/* Title & Intent Section */}
        <section className="mt-2 mb-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-low text-primary-dark mb-2.5">
            <MaterialIcon name="auto_awesome" className="text-[15px] text-secondary" />
            <span className="text-[11px] leading-3.5 font-medium tracking-wide">
              Intentional Daily Learning
            </span>
          </div>
          <h1 className="text-[26px] leading-8.5 font-bold text-primary-dark tracking-[-0.01em] mb-2">
            What would you like to learn?
          </h1>
          <p className="text-sm leading-relaxed text-on-surface-variant">
            Pick at least 3 topics to personalize your daily finite feed. You
            can change these anytime in your Sanctuary preferences.
          </p>

          {/* Dynamic Requirement Badge */}
          <div
            className={`mt-3.5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-primary-dark shadow-2xs transition-colors ${
              isMinReached
                ? "bg-surface-container-high"
                : "bg-surface-container"
            }`}
          >
            <MaterialIcon name="check_circle" className="text-lg text-secondary"
              style={{ fontVariationSettings: "'FILL' 1" }}
             />
            <span className="text-xs leading-4 font-semibold text-primary-dark">
              {isMinReached
                ? `Selected: ${count} topics • Minimum 3 reached`
                : `Selected: ${count} of 3 required topics`}
            </span>
          </div>
        </section>

        {/* Topics Grid (Selectable Curated Cards) */}
        <div className="grid grid-cols-2 gap-2.5 my-2 pb-36 relative z-10">
          {ONBOARDING_TOPICS.map((topic) => {
            const isSelected = selectedIds.includes(topic.id);
            return (
              <div
                key={topic.id}
                role="checkbox"
                aria-checked={isSelected}
                tabIndex={0}
                onClick={() => toggleTopic(topic.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleTopic(topic.id);
                  }
                }}
                className={`cursor-pointer relative p-3.5 rounded-xl transition-all duration-200 active:scale-[0.98] flex flex-col justify-between h-26.5 shadow-2xs ${
                  isSelected
                    ? "bg-surface-container-high ring-1 ring-primary-dark"
                    : "bg-surface-container-lowest hover:bg-surface-container-low"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-2xs ${
                      isSelected
                        ? "bg-surface-container-lowest text-primary-dark"
                        : "bg-surface-container text-on-surface-variant"
                    }`}
                  >
                    <MaterialIcon name={topic.icon} className="text-xl"
                      style={{
                        fontVariationSettings: topic.filledIcon
                          ? "'FILL' 1"
                          : "'FILL' 0",
                      }}
                     />
                  </div>
                  {isSelected && (
                    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary-dark text-on-primary overflow-hidden">
                      <MaterialIcon name="check" className="text-xs leading-none" />
                    </div>
                  )}
                </div>
                <div>
                  <div
                    className={`text-lg leading-5.5 font-semibold tracking-tight ${
                      isSelected ? "text-primary-dark" : "text-on-surface"
                    }`}
                  >
                    {topic.title}
                  </div>
                  <div className="text-[11px] leading-3.5 text-on-surface-variant mt-0.5">
                    {topic.clipsLabel}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sticky Bottom Floating Action Dock */}
        <aside className="fixed bottom-0 left-0 right-0 max-w-107.5 mx-auto px-4 pb-6 pt-3 bg-linear-to-t from-surface via-surface/95 to-transparent z-30 pointer-events-none">
          <div className="pointer-events-auto flex flex-col items-center gap-2.5">
            {/* Spiritual Promise Indicator */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container shadow-2xs">
              <span className="text-[13px] leading-4.5 text-on-surface-variant flex items-center gap-1">
                <span className="text-xs">🌱</span> Zero clickbait. Verified
                reminders from trusted scholars.
              </span>
            </div>

            {/* Primary Action CTA */}
            <button
              type="button"
              disabled={!isMinReached}
              onClick={() => router.push("/feed")}
              className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-primary-dark text-on-primary text-sm leading-5 font-semibold shadow-lg active:scale-[0.98] transition-all hover:bg-primary-container cursor-pointer ${
                !isMinReached ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <span>Continue to Feed</span>
              <MaterialIcon name="arrow_forward" className="text-lg" />
            </button>

            {/* Sanctuary Feed Boundary Clarification */}
            <p className="text-[11px] leading-3.5 text-on-surface-variant text-center opacity-80">
              Your feed is finite &amp; intentionally capped at 20 clips daily.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
