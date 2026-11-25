"use client";

import { useState } from "react";
import Link from "next/link";

interface TopicTheme {
  id: string;
  title: string;
  clipsCount: number;
  icon: string;
  badgeText?: string;
  badgeStyle?: "gold" | "mint" | "emerald" | "soft" | "listen";
}

const TOPIC_THEMES: TopicTheme[] = [
  {
    id: "quran",
    title: "Quran & Tafsir",
    clipsCount: 142,
    icon: "menu_book",
    badgeText: "Daily reflections",
    badgeStyle: "gold",
  },
  {
    id: "prayer",
    title: "Prayer (Salah)",
    clipsCount: 98,
    icon: "mosque",
    badgeText: "Step-by-step",
    badgeStyle: "mint",
  },
  {
    id: "seerah",
    title: "Seerah",
    clipsCount: 76,
    icon: "explore",
    badgeText: "Prophetic character",
    badgeStyle: "emerald",
  },
  {
    id: "character",
    title: "Character (Akhlaq)",
    clipsCount: 115,
    icon: "potted_plant",
    badgeText: "Mindfulness",
    badgeStyle: "soft",
  },
  {
    id: "family",
    title: "Family & Parenting",
    clipsCount: 64,
    icon: "family_restroom",
  },
  {
    id: "duas",
    title: "Duas & Adhkar",
    clipsCount: 120,
    icon: "front_hand",
    badgeText: "Listen",
    badgeStyle: "listen",
  },
  {
    id: "fiqh-basics",
    title: "Fiqh Basics",
    clipsCount: 52,
    icon: "balance",
  },
  {
    id: "ramadan",
    title: "Ramadan & Fasting",
    clipsCount: 88,
    icon: "nightlight",
  },
];

interface PopularClip {
  id: string;
  category: string;
  title: string;
  speaker: string;
  duration: string;
  imageUrl: string;
}

const POPULAR_CLIPS: PopularClip[] = [
  {
    id: "khushu",
    category: "Prayer • Focus",
    title: "The Secret to Khushu",
    speaker: "Ustadh Bilal Ismail",
    duration: "1:30",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDoU1Ub7dlxDm2tJDwlNMExW4vaVYwqbxwpvMKdE7heb5DWx4M_3VHhYa3YD3p4g8ZjxsHCYOnH_ezyuADMe93l4l2J8Kyi4Knt-sMT85D8TqSNlguXsWKtp8FxavQABvLFHoHffEODvaagjuWNbiD3GQOD1t8O8fgRx9eobxaTWz5_b_O15WgW-UYEaeNe1-kAf9VjnsnyPV22k1RvAhkSVnbFdiI05NvjOgF9Up8",
  },
  {
    id: "trials",
    category: "Spiritual Growth",
    title: "Why Trials are Blessings",
    speaker: "Dr. Haifaa Younis",
    duration: "1:15",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBsoe0rzpMs1U21yB0FQpLuK6Q_N-e6H_UmMg9FUpGzkK5pFDu6kJQqvLJaqgX8Af-35cc9OW9W3ypasmo6_QtLH0o8o0kqh1F5I76O1FrjkLyOp-kO0jbAUTAmT4Hsj0H21sZoG1ZngVL4hY-IDopTR4UkBLaQ4jB3c1sugUiZILizFksYQE-rQ2dHT5MfilRYmpswQS-35wcnIzsnDZ2Zn7T3FgHt97zrIEBtMa4",
  },
  {
    id: "gratitude",
    category: "Daily Sunnah",
    title: "Living with Gratitude",
    speaker: "Sh. Omar Suleiman",
    duration: "1:30",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBgkoZ3GGofXLHC5tk35xZn-tcjXtuDml9lmT_zvKdltWgSYrxhl51QO8A0VVUEzcQ821fmOlRKMwF9wXFWfI3oCwhm2-01iTJrvZvZphi1B2ICYYJvkSIWkBj36c-LqKsylddArPYhlvJygCRjIp6kA56nJ5oaMFw2d6os_ZpQKQRQY5gCog3ROov0XAPLsfd_lJtu14n0A7YHWfdcvgweHHwW3TQjxvXt4Gp7Mf4",
  },
];

const FILTER_CHIPS = [
  { id: "all", label: "All Topics" },
  { id: "clips", label: "Short Clips" },
  { id: "lectures", label: "Full Lectures" },
  { id: "duas", label: "Duas" },
];

export function LibraryView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isDuasAudioPlaying, setIsDuasAudioPlaying] = useState(false);
  const [isAdhkarDrawerPlaying, setIsAdhkarDrawerPlaying] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  const filteredThemes = TOPIC_THEMES.filter((topic) => {
    const matchesSearch = topic.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    if (activeFilter === "duas") return topic.id === "duas" && matchesSearch;
    return matchesSearch;
  });

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col w-full">
      {/* Header Intro Section */}
      <section className="px-4 pt-2 pb-1 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-[26px] leading-8.5 text-primary-dark font-bold tracking-[-0.01em]">
            Library
          </span>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-primary-dark text-[11px] leading-3.5 font-medium">
            <span
              className="material-symbols-outlined text-[15px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
            <span>Curated &amp; Verified</span>
          </div>
        </div>
        <p className="text-sm leading-5 text-on-surface-variant max-w-sm">
          Curated Islamic knowledge, verified by scholars and categorized for
          mindful learning.
        </p>
      </section>

      {/* Search Experience with Interactive Filter Clear */}
      <section className="px-4 mt-4">
        <div className="relative flex items-center w-full">
          <div className="absolute left-4 flex items-center pointer-events-none text-primary-dark/70">
            <span className="material-symbols-outlined text-xl">
              search
            </span>
          </div>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-11 pr-11 bg-surface-container-lowest text-on-surface placeholder:text-outline text-sm leading-5 rounded-full shadow-[0_4px_20px_-2px_rgba(27,42,38,0.04)] focus:outline-none focus:shadow-[0_8px_24px_-4px_rgba(15,92,77,0.12)] transition-all"
            placeholder="Search by title, speaker, or topic..."
            type="text"
          />
          {searchQuery.length > 0 && (
            <button
              aria-label="Clear search"
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 flex items-center justify-center w-6 h-6 rounded-full bg-surface-container text-on-surface-variant hover:text-primary-dark transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-base">
                close
              </span>
            </button>
          )}
        </div>
      </section>

      {/* Interactive Filter Tabs / Quick Chips */}
      <section className="mt-4">
        <div className="flex items-center gap-1.5 px-4 overflow-x-auto py-1">
          {FILTER_CHIPS.map((chip) => {
            const isActive = activeFilter === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => setActiveFilter(chip.id)}
                className={`shrink-0 px-4 h-8 rounded-full text-xs leading-4 flex items-center justify-center transition-all cursor-pointer ${
                  isActive
                    ? "bg-surface-container-high text-primary-dark font-semibold shadow-2xs"
                    : "bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container font-medium"
                }`}
                type="button"
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Topic Grid (2 Columns, Warm Botanical Aesthetic) */}
      <section className="px-4 mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg leading-6 text-on-surface font-semibold">
            Explore Themes
          </span>
          <span className="text-[11px] leading-3.5 text-on-surface-variant">
            {filteredThemes.length} Categories
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {filteredThemes.map((topic) => (
            <div
              key={topic.id}
              className="group relative flex flex-col justify-between p-3.5 bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_-2px_rgba(27,42,38,0.04)] active:scale-[0.98] transition-transform overflow-hidden"
            >
              <div className="flex items-start justify-between gap-1">
                <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary-dark group-hover:bg-primary-dark group-hover:text-on-primary transition-colors">
                  <span className="material-symbols-outlined text-xl">
                    {topic.icon}
                  </span>
                </div>

                {topic.badgeStyle === "gold" && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-container/30 text-on-secondary-container text-[10px] leading-tight font-medium">
                    {topic.badgeText}
                  </span>
                )}
                {topic.badgeStyle === "mint" && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[10px] leading-tight font-medium">
                    {topic.badgeText}
                  </span>
                )}
                {topic.badgeStyle === "emerald" && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-[10px] leading-tight font-medium">
                    {topic.badgeText}
                  </span>
                )}
                {topic.badgeStyle === "soft" && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container-high text-primary-dark text-[10px] leading-tight font-medium">
                    {topic.badgeText}
                  </span>
                )}
                {topic.badgeStyle === "listen" && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsDuasAudioPlaying((prev) => !prev);
                    }}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] active:scale-95 transition-transform cursor-pointer ${
                      isDuasAudioPlaying ? "ring-2 ring-secondary" : ""
                    }`}
                  >
                    <span className="material-symbols-outlined text-[13px]">
                      {isDuasAudioPlaying ? "pause" : "volume_up"}
                    </span>
                    <span className="font-medium">
                      {isDuasAudioPlaying ? "Playing" : "Listen"}
                    </span>
                  </button>
                )}
                {!topic.badgeStyle && (
                  <span className="material-symbols-outlined text-outline-variant text-lg">
                    chevron_right
                  </span>
                )}
              </div>

              <Link
                href={`/feed`}
                className="mt-4 flex flex-col min-w-0"
              >
                <h2 className="text-[15px] leading-snug font-semibold text-on-surface group-hover:text-primary-dark transition-colors truncate">
                  {topic.title}
                </h2>
                <span className="text-[11px] leading-3.5 text-on-surface-variant mt-0.5">
                  {topic.clipsCount} clips
                </span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Popular This Week (Vertical Cards with Rich Preview Visuals) */}
      <section className="mt-6 mb-4">
        <div className="px-4 flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-lg leading-6 text-on-surface font-semibold">
              Popular this week
            </span>
            <span className="w-2 h-2 rounded-full bg-secondary" />
          </div>
          <Link
            className="text-[11px] leading-3.5 text-primary-dark font-semibold flex items-center gap-0.5 hover:underline"
            href="/feed"
          >
            See all
            <span className="material-symbols-outlined text-base">
              arrow_forward
            </span>
          </Link>
        </div>

        {/* Horizontal Snap Scroller for Vertical Video Previews */}
        <div className="flex gap-3 px-4 overflow-x-auto snap-x snap-mandatory py-1">
          {POPULAR_CLIPS.map((clip) => {
            const isSaved = bookmarkedIds.includes(clip.id);
            return (
              <div
                key={clip.id}
                className="snap-start shrink-0 w-52.5 bg-surface-container-lowest rounded-xl p-2.5 shadow-[0_4px_20px_-2px_rgba(27,42,38,0.04)] flex flex-col"
              >
                <Link
                  href="/feed"
                  className="relative w-full h-67.5 rounded-lg overflow-hidden bg-surface-container block"
                >
                  <img
                    alt={clip.title}
                    className="w-full h-full object-cover"
                    src={clip.imageUrl}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-primary-dark/90 via-primary-dark/20 to-transparent" />
                  {/* Clip duration badge */}
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface text-[10px] font-semibold flex items-center gap-1 shadow-2xs">
                    <span className="material-symbols-outlined text-[11px] text-primary-dark">
                      play_arrow
                    </span>
                    <span>{clip.duration}</span>
                  </div>
                  {/* Video Title Overlay inside scrim */}
                  <div className="absolute bottom-2.5 inset-x-2.5 flex flex-col text-on-primary">
                    <span className="text-[10px] text-primary-fixed uppercase tracking-wider font-semibold">
                      {clip.category}
                    </span>
                    <h3 className="text-[15px] leading-tight font-semibold mt-0.5 line-clamp-2">
                      {clip.title}
                    </h3>
                  </div>
                </Link>

                {/* Speaker Info Below Video Preview */}
                <div className="mt-2.5 flex items-center justify-between px-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-xs leading-4 text-on-surface font-medium truncate">
                      {clip.speaker}
                    </span>
                    <span
                      className="shrink-0 w-3.5 h-3.5 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container"
                      title="Verified Scholar"
                    >
                      <span className="material-symbols-outlined text-[10px] font-bold">
                        check
                      </span>
                    </span>
                  </div>
                  <button
                    aria-label="Bookmark this clip"
                    onClick={() => toggleBookmark(clip.id)}
                    className={`transition-colors shrink-0 cursor-pointer ${
                      isSaved
                        ? "text-primary-dark"
                        : "text-outline hover:text-primary-dark"
                    }`}
                    type="button"
                  >
                    <span
                      className="material-symbols-outlined text-lg"
                      style={{
                        fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0",
                      }}
                    >
                      {isSaved ? "bookmark" : "bookmark_border"}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Scholarly Audio Player Miniature Drawer */}
      <section className="px-4 mb-6">
        <div className="p-3.5 rounded-xl bg-surface-container flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-dark flex items-center justify-center text-on-primary shadow-2xs">
              <span className="material-symbols-outlined text-xl">
                graphic_eq
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs leading-4 text-on-surface font-semibold">
                Morning Remembrance (Adhkar)
              </span>
              <span className="text-[11px] leading-3.5 text-on-surface-variant">
                {isAdhkarDrawerPlaying
                  ? "Now reciting • Mishary Alafasy"
                  : "Continuous calm recitation • 8 mins"}
              </span>
            </div>
          </div>
          <button
            aria-label="Play daily recitation"
            onClick={() => setIsAdhkarDrawerPlaying((prev) => !prev)}
            className="w-8 h-8 rounded-full bg-surface-container-lowest text-primary-dark flex items-center justify-center shadow-2xs active:scale-95 transition-transform cursor-pointer"
            type="button"
          >
            <span
              className="material-symbols-outlined text-lg"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {isAdhkarDrawerPlaying ? "pause" : "play_arrow"}
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}
