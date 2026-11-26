"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "@/hooks/useTheme";
import { BottomNav } from "@/components/layout/BottomNav";

interface ProfileMediaCard {
  id: string;
  tab: "lectures" | "saved" | "submissions";
  title: string;
  imageUrl?: string;
  alt?: string;
  topBadgeLabel?: string;
  topBadgeVariant?: "verified" | "admonition";
  durationOrQueueLabel: string;
  isPendingCard?: boolean;
  viewsOrSubmittedLabel: string;
  topicOrStatusTag: string;
  isDraftTag?: boolean;
}

const PROFILE_MEDIA_ITEMS: ProfileMediaCard[] = [
  {
    id: "pm-1",
    tab: "lectures",
    title: "Tafsir Surah Ad-Duha: Hope in Hardship",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCPYoKOKjG5dXlYYIr9sS6TQKSgFzdvaVx6MFKwKvD7g86Eo_ruS3W6OkcmEQYDqRWXJHMq3k9SjuB2YacENIJD6ugSRn0vNexCipfHHexs6JbyCYoSU0s3qcbZvxkEL9edtG9qy3KDbQf3yJAwOL9FhqcQl8ppQIXKJVNFmMbhw8Ckv7JjT2v_FGiCHsYD5bPfZql03b6AvOvl1bkV0trJgljdBohVT4cq3WH7kCs",
    alt: "Tafsir Surah Ad-Duha reflection preview",
    topBadgeLabel: "Verified",
    topBadgeVariant: "verified",
    durationOrQueueLabel: "03:15",
    viewsOrSubmittedLabel: "2.4k",
    topicOrStatusTag: "Tafsir",
  },
  {
    id: "pm-2",
    tab: "lectures",
    title: "Fajr Adhkar & Heart Tranquility",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB1K-G2FBkxdEzf9Rc1_vMhZ1VeUDDV7rR0kWmjo-hvfK_Fz6kq0pejaPgTAZkBzqKUVrPVNQS66L-msS56QqfI24tE6pxxEw6GtW45Vnp5Tde0OBP5kgcMpBwiHaGHeBlA2xVDRThblyTskmJDK56unA6D_pmx1mpOb5UkfsdCvQysTWD0wOEG1bOZPc7-OnRc8afSSJ8K0PsfybuRsZzlAdKYvqZpi1bUevdVkyU",
    alt: "Morning Adhkar preview",
    topBadgeLabel: "Admonition",
    topBadgeVariant: "admonition",
    durationOrQueueLabel: "01:42",
    viewsOrSubmittedLabel: "1.8k",
    topicOrStatusTag: "Dhikr",
  },
  {
    id: "pm-3",
    tab: "lectures",
    title: "Patience & Sabr in Trials",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDTjBYUNCtw6WFjawNCFE3YA3Vc-TqmysjuMM4ewsZVd_5ERBfPb4_8KGyeo4X_oeGpuIUGfjkJeqdNy6y5txGanG6eTcLYmK3EUzGEo_pWOuw9-sEJeUDzs1hC6JxA6g171cBYo8YCU88GkA41M4LkkeF3xVXGCwBW6q6eHQqogo8qtKy9fXVW0pkWkZ2BRprBgQungDCiaIgpP4VLOYdsGmC3V9GcmUV5dKDNmGI",
    alt: "Patience and Sabr video thumbnail",
    topBadgeLabel: "Verified",
    topBadgeVariant: "verified",
    durationOrQueueLabel: "04:20",
    viewsOrSubmittedLabel: "3.1k",
    topicOrStatusTag: "Tadabbur",
  },
  {
    id: "pm-4",
    tab: "submissions",
    title: "The Virtue of Morning Adhkar",
    isPendingCard: true,
    durationOrQueueLabel: "In Queue",
    viewsOrSubmittedLabel: "Submitted 2d ago",
    topicOrStatusTag: "Draft",
    isDraftTag: true,
  },
];

export function ProfileView() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<
    "lectures" | "saved" | "submissions"
  >("lectures");
  const [showWatchLimitModal, setShowWatchLimitModal] = useState(false);
  const [dailyLimit, setDailyLimit] = useState<20 | 30 | 50>(20);
  const [pendingLimit, setPendingLimit] = useState<20 | 30 | 50>(20);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [displayName, setDisplayName] = useState("Brother Tariq Al-Hashimi");
  const [handle, setHandle] = useState("@tariq.hashimi");
  const [bio, setBio] = useState(
    "Sharing intentional Tadabbur reflections, Qur'an insights, and Fajr reminders for daily peace."
  );
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const watchedToday = 4;
  const remainingToday = Math.max(0, dailyLimit - watchedToday);
  const progressPercentage = Math.min(
    100,
    Math.round((watchedToday / dailyLimit) * 100)
  );

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2600);
  };

  const displayedItems =
    activeTab === "lectures"
      ? PROFILE_MEDIA_ITEMS
      : activeTab === "submissions"
        ? PROFILE_MEDIA_ITEMS.filter(
            (item) => item.isPendingCard || item.tab === "lectures"
          )
        : PROFILE_MEDIA_ITEMS.filter((item) => !item.isPendingCard);

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      {/* Stitch Profile Header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_12px_rgba(15,30,27,0.03)]">
        <div className="h-16 px-4 max-w-120 mx-auto flex items-center justify-between">
          <Link href="/feed" className="flex items-center gap-2">
            <img
              alt="Barakah App Logo"
              className="h-8 w-auto object-contain"
              src="/images/barakah-logo.png"
            />
            <span className="text-lg leading-6 text-primary-dark font-bold tracking-tight">
              Barakah
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="text-sm leading-5 text-on-surface font-semibold">
              Profile
            </h1>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("account-preferences");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-9 h-9 rounded-full bg-surface-container-low text-on-surface-variant hover:text-primary-dark flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Account Settings"
            >
              <span className="material-symbols-outlined text-xl">
                settings
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-inverse-surface text-inverse-on-surface text-xs font-medium shadow-lg whitespace-nowrap">
          {toastMsg}
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative w-full max-w-120 mx-auto pt-16 pb-24 bg-surface">
        <div className="flex flex-col w-full px-4 py-4 gap-6">
          {/* User Profile Header Card */}
          <section className="bg-surface-container-lowest rounded-xl p-6 shadow-2xs flex flex-col items-center text-center">
            <div className="relative mb-2">
              <img
                className="w-20 h-20 rounded-full object-cover shadow-md"
                alt="Warm, dignified portrait of Brother Tariq Al-Hashimi"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPYoKOKjG5dXlYYIr9sS6TQKSgFzdvaVx6MFKwKvD7g86Eo_ruS3W6OkcmEQYDqRWXJHMq3k9SjuB2YacENIJD6ugSRn0vNexCipfHHexs6JbyCYoSU0s3qcbZvxkEL9edtG9qy3KDbQf3yJAwOL9FhqcQl8ppQIXKJVNFmMbhw8Ckv7JjT2v_FGiCHsYD5bPfZql03b6AvOvl1bkV0trJgljdBohVT4cq3WH7kCs"
              />
              <span
                className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-2xs"
                title="Verified Creator"
              >
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
              </span>
            </div>

            <div className="flex items-center gap-1">
              <h2 className="text-xl leading-7 font-semibold text-on-surface">
                {displayName}
              </h2>
              <span
                className="material-symbols-outlined text-lg text-secondary"
                title="Verified"
              >
                check_circle
              </span>
            </div>

            <div className="flex items-center gap-1 mt-1 flex-wrap justify-center">
              <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-tertiary-fixed-variant text-[11px] leading-3.5 font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-primary-dark">
                  verified_user
                </span>
                Verified Creator • Tadabbur
              </span>
              <span className="text-outline text-[13px] leading-4.5">•</span>
              <span className="text-[13px] leading-4.5 text-on-surface-variant">
                {handle}
              </span>
            </div>

            {isEditingProfile ? (
              <div className="w-full mt-3 flex flex-col gap-2 text-left bg-surface-container-low p-3 rounded-xl">
                <label className="text-[11px] font-semibold text-on-surface">
                  Display Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-surface-container-lowest text-sm text-on-surface focus:outline-none"
                />
                <label className="text-[11px] font-semibold text-on-surface">
                  Bio
                </label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-surface-container-lowest text-xs text-on-surface focus:outline-none resize-none"
                />
                <div className="flex justify-end gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="px-3 py-1 rounded-lg bg-primary-dark text-on-primary text-xs font-semibold cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-[13px] leading-4.5 text-on-surface-variant mt-1 max-w-sm">
                {bio}
              </p>
            )}

            {/* Action Buttons Row */}
            <div className="flex items-center gap-2 mt-2 w-full">
              <button
                type="button"
                onClick={() => setIsEditingProfile((prev) => !prev)}
                className="flex-1 py-1.5 px-2 rounded-lg bg-primary-dark text-on-primary text-xs leading-4 font-medium shadow-2xs hover:opacity-90 transition-opacity flex items-center justify-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">
                  edit
                </span>
                <span>Edit Profile</span>
              </button>
              <Link
                href="/creator/dr-omar-farooq"
                className="py-1.5 px-2.5 rounded-lg bg-surface-container-low text-primary-dark hover:bg-surface-container text-xs leading-4 font-medium transition-colors flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-base">
                  workspace_premium
                </span>
                <span>Scholar Status</span>
              </Link>
              <button
                type="button"
                onClick={() =>
                  triggerToast("Profile link copied to clipboard")
                }
                className="w-9 h-9 rounded-lg bg-surface-container-low text-on-surface-variant hover:text-primary-dark flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                aria-label="Share Profile"
              >
                <span className="material-symbols-outlined text-lg">share</span>
              </button>
            </div>

            {/* 3-Column Stats Row */}
            <div className="grid grid-cols-3 gap-3 w-full mt-4 pt-2 border-t border-surface-container-high/60">
              <Link
                href="/creator/dr-omar-farooq"
                className="bg-surface-container-low rounded-xl py-2 px-1 flex flex-col items-center justify-center hover:bg-surface-container transition-colors"
              >
                <span className="text-lg leading-6 text-primary-dark font-bold">
                  1.2k
                </span>
                <span className="text-[11px] leading-3.5 text-on-surface-variant mt-1">
                  Followers
                </span>
              </Link>
              <Link
                href="/creator/dr-omar-farooq"
                className="bg-surface-container-low rounded-xl py-2 px-1 flex flex-col items-center justify-center hover:bg-surface-container transition-colors"
              >
                <span className="text-lg leading-6 text-primary-dark font-bold">
                  18
                </span>
                <span className="text-[11px] leading-3.5 text-on-surface-variant mt-1">
                  Following
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setActiveTab("lectures")}
                className="bg-surface-container-low rounded-xl py-2 px-1 flex flex-col items-center justify-center hover:bg-surface-container transition-colors cursor-pointer"
              >
                <span className="text-lg leading-6 text-primary-dark font-bold">
                  8
                </span>
                <span className="text-[11px] leading-3.5 text-on-surface-variant mt-1">
                  Uploads
                </span>
              </button>
            </div>
          </section>

          {/* Daily Mindful Watch Limit Section */}
          <section className="bg-surface-container-lowest rounded-xl p-4 shadow-2xs flex flex-col gap-2">
            <div className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high/60 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-tertiary-fixed/70 text-on-tertiary-fixed-variant flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-lg">
                      self_improvement
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm leading-5 text-on-surface font-semibold">
                      Daily Mindful Watch Limit
                    </span>
                    <span className="text-[13px] leading-4.5 text-on-surface-variant">
                      Pacing your spiritual consumption
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPendingLimit(dailyLimit);
                    setShowWatchLimitModal(true);
                  }}
                  className="text-primary-dark text-[11px] leading-3.5 font-semibold hover:underline focus:outline-none flex items-center gap-0.5 cursor-pointer shrink-0"
                >
                  <span className="material-symbols-outlined text-sm">
                    tune
                  </span>
                  <span>Adjust Limit</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[13px] leading-4.5 text-on-surface-variant mt-1">
                <div>
                  <span className="text-lg leading-6 text-primary-dark font-bold">
                    {watchedToday}
                  </span>
                  <span className="text-xs leading-4 text-on-surface-variant">
                    {" "}
                    / {dailyLimit} watched today
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-secondary-fixed/70 text-on-secondary-fixed-variant text-[11px] leading-3.5 font-medium">
                  {remainingToday} remaining
                </span>
              </div>

              <div className="w-full bg-surface-container-high rounded-full h-2 overflow-hidden mt-1">
                <div
                  className="bg-primary-dark h-2 rounded-full duration-200 transition-all"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[13px] leading-4.5 text-on-surface-variant pt-0.5">
                <span className="flex items-center gap-1 text-[11px] leading-3.5">
                  <span className="material-symbols-outlined text-[13px]">
                    schedule
                  </span>
                  <span>Resets every Fajr prayer (05:12 AM)</span>
                </span>
                <span className="text-[11px] leading-3.5 text-primary-dark font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">
                    spa
                  </span>
                  Intentional
                </span>
              </div>
            </div>
          </section>

          {/* Lectures / Saved / Submissions Tabs & 2-Column Grid */}
          <section className="flex flex-col gap-2">
            <div className="flex items-center border-b border-surface-container-high/70 gap-3">
              <button
                type="button"
                onClick={() => setActiveTab("lectures")}
                className={`pb-1.5 text-xs leading-4 flex items-center gap-1.5 focus:outline-none transition-colors cursor-pointer ${
                  activeTab === "lectures"
                    ? "font-bold text-primary-dark border-b-2 border-primary-dark"
                    : "font-medium text-on-surface-variant hover:text-primary-dark"
                }`}
              >
                <span className="material-symbols-outlined text-base">
                  video_library
                </span>
                <span>Lectures (8)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("saved")}
                className={`pb-1.5 text-xs leading-4 flex items-center gap-1.5 focus:outline-none transition-colors cursor-pointer ${
                  activeTab === "saved"
                    ? "font-bold text-primary-dark border-b-2 border-primary-dark"
                    : "font-medium text-on-surface-variant hover:text-primary-dark"
                }`}
              >
                <span className="material-symbols-outlined text-base">
                  bookmark
                </span>
                <span>Saved (24)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("submissions")}
                className={`pb-1.5 text-xs leading-4 flex items-center gap-1.5 focus:outline-none transition-colors cursor-pointer ${
                  activeTab === "submissions"
                    ? "font-bold text-primary-dark border-b-2 border-primary-dark"
                    : "font-medium text-on-surface-variant hover:text-primary-dark"
                }`}
              >
                <span className="material-symbols-outlined text-base">
                  pending_actions
                </span>
                <span>Submissions (3)</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-1">
              {displayedItems.map((item) => (
                <Link
                  href={item.isPendingCard ? "/submit" : "/feed"}
                  key={item.id}
                  className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-2xs flex flex-col hover:opacity-95 transition-opacity"
                >
                  {item.isPendingCard ? (
                    <div className="relative w-full h-32 bg-surface-container-highest flex items-center justify-center">
                      <div className="text-center p-2">
                        <span className="material-symbols-outlined text-[28px] text-on-secondary-fixed-variant">
                          schedule
                        </span>
                        <p className="text-[11px] leading-3.5 text-on-secondary-fixed-variant mt-1 font-semibold">
                          Pending Review
                        </p>
                      </div>
                      <span className="absolute bottom-2 right-2 px-1 py-0.5 rounded-xs bg-secondary-fixed text-on-secondary-fixed-variant text-[10px] font-medium">
                        {item.durationOrQueueLabel}
                      </span>
                    </div>
                  ) : (
                    <div className="relative w-full h-32 bg-surface-container-highest">
                      <img
                        alt={item.alt ?? item.title}
                        className="w-full h-full object-cover"
                        src={item.imageUrl}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                      {item.topBadgeVariant === "verified" ? (
                        <span className="absolute top-2 left-2 px-1 py-0.5 rounded-xs bg-surface/90 backdrop-blur-xs text-primary-dark text-[10px] font-semibold flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[10px]">
                            verified
                          </span>
                          {item.topBadgeLabel}
                        </span>
                      ) : (
                        <span className="absolute top-2 left-2 px-1 py-0.5 rounded-xs bg-secondary-container/90 text-on-secondary-container text-[10px] font-semibold">
                          {item.topBadgeLabel}
                        </span>
                      )}
                      <span className="absolute bottom-2 right-2 px-1 py-0.5 rounded-xs bg-black/70 text-white text-[10px]">
                        {item.durationOrQueueLabel}
                      </span>
                    </div>
                  )}

                  <div className="p-2 flex flex-col justify-between flex-1">
                    <p className="text-xs leading-4 text-on-surface font-semibold line-clamp-2">
                      {item.title}
                    </p>
                    <div className="flex items-center justify-between mt-1 text-on-surface-variant text-[11px]">
                      {item.isPendingCard ? (
                        <span className="text-on-secondary-container font-medium">
                          {item.viewsOrSubmittedLabel}
                        </span>
                      ) : (
                        <span className="flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[13px]">
                            visibility
                          </span>
                          <span>{item.viewsOrSubmittedLabel}</span>
                        </span>
                      )}
                      <span
                        className={
                          item.isDraftTag
                            ? "px-1.5 py-0.5 rounded-xs bg-secondary-fixed/50 text-on-secondary-fixed-variant font-medium"
                            : "px-1.5 py-0.5 rounded-xs bg-surface-container-low text-primary-dark font-medium"
                        }
                      >
                        {item.topicOrStatusTag}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Account & Preferences Settings List */}
          <section id="account-preferences" className="flex flex-col gap-2">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-lg leading-6 font-semibold text-on-surface">
                Account &amp; Preferences
              </h3>
              <Link
                href="/creator/dr-omar-farooq"
                className="text-[11px] leading-3.5 text-primary-dark hover:underline"
              >
                View Public Creator Profile
              </Link>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-2 shadow-2xs flex flex-col divide-y divide-surface-container-high/50">
              {/* Dark mode */}
              <div className="w-full flex items-center justify-between py-2 px-1">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-surface-container text-primary-dark flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-lg">
                      dark_mode
                    </span>
                  </div>
                  <span className="text-xs leading-4 text-on-surface font-medium">
                    Dark mode
                  </span>
                </div>
                <button
                  aria-checked={theme === "dark"}
                  aria-label="Toggle dark mode"
                  onClick={toggleTheme}
                  className={`w-10 h-6 rounded-full p-0.5 transition-colors duration-200 flex items-center cursor-pointer ${
                    theme === "dark"
                      ? "bg-primary-dark"
                      : "bg-surface-container-highest"
                  }`}
                  role="switch"
                  type="button"
                >
                  <span
                    className={`w-5 h-5 rounded-full bg-surface-container-lowest shadow-2xs transition-transform duration-200 ${
                      theme === "dark" ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Notifications */}
              <button
                type="button"
                onClick={() =>
                  triggerToast("Gentle daily Fajr & Maghrib reminders active")
                }
                className="w-full flex items-center justify-between py-2 px-1 hover:bg-surface-container-low transition-colors rounded-lg cursor-pointer text-left"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-surface-container text-primary-dark flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-lg">
                      notifications
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs leading-4 text-on-surface font-medium">
                      Notifications
                    </span>
                    <span className="text-[13px] leading-4.5 text-on-surface-variant">
                      Gentle daily reminders active
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-lg text-on-surface-variant">
                  chevron_right
                </span>
              </button>

              {/* Log out */}
              <button
                type="button"
                onClick={() => router.push("/welcome")}
                className="w-full flex items-center justify-between py-2 px-1 hover:bg-surface-container-low transition-colors rounded-lg cursor-pointer text-left"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-surface-container-low text-on-surface-variant flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-lg">
                      logout
                    </span>
                  </div>
                  <span className="text-xs leading-4 text-on-surface-variant font-medium">
                    Log out
                  </span>
                </div>
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab="profile" />

      {/* Adjust Watch Limit Modal Bottom Sheet */}
      {showWatchLimitModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            onClick={() => setShowWatchLimitModal(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
          />
          <div className="relative bg-surface-container-lowest rounded-t-xl w-full max-w-120 p-6 shadow-lg z-10 flex flex-col gap-4 border-t border-surface-container-high/60">
            <div className="w-12 h-1 bg-surface-container-highest rounded-full mx-auto -mt-1 mb-1" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">
                    self_improvement
                  </span>
                </div>
                <h3 className="text-lg leading-6 text-on-surface font-bold">
                  Adjust Watch Limit
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowWatchLimitModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container-low text-on-surface-variant hover:text-primary-dark flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <p className="text-[13px] leading-4.5 text-on-surface-variant">
              Set an intentional daily reflection quota to prevent mindless
              scrolling and protect your spiritual presence.
            </p>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] leading-3.5 font-semibold text-on-surface">
                Daily Reflection Limit
              </label>
              <div className="grid grid-cols-3 gap-2">
                {([20, 30, 50] as const).map((limitOption) => {
                  const isSelected = pendingLimit === limitOption;
                  return (
                    <button
                      key={limitOption}
                      type="button"
                      onClick={() => setPendingLimit(limitOption)}
                      className={`py-2 px-1 rounded-xl text-xs leading-4 text-center transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-primary-dark text-on-primary font-bold border-2 border-primary-dark shadow-2xs"
                          : "bg-surface-container-low text-on-surface font-medium border border-surface-container-high/60 hover:bg-surface-container"
                      }`}
                    >
                      {limitOption} / day
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high/60 flex items-center gap-2">
              <span className="material-symbols-outlined text-xl text-primary-dark">
                bedtime
              </span>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] leading-3.5 text-on-surface font-semibold">
                  Reset Cycle: Fajr Prayer
                </span>
                <span className="text-[13px] leading-4.5 text-on-surface-variant">
                  Your counter automatically refreshes at Fajr (05:12 AM)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setDailyLimit(pendingLimit);
                  setShowWatchLimitModal(false);
                  triggerToast(`Daily limit updated to ${pendingLimit} clips`);
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-primary-dark text-on-primary text-xs leading-4 font-semibold text-center shadow-2xs hover:opacity-90 cursor-pointer"
              >
                Save Preference
              </button>
              <button
                type="button"
                onClick={() => setShowWatchLimitModal(false)}
                className="py-2.5 px-4 rounded-xl bg-surface-container-low text-on-surface-variant text-xs leading-4 font-medium hover:bg-surface-container cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
