"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BottomNav } from "@/components/layout/BottomNav";

export interface PublicCreatorProfileData {
  slug: string;
  name: string;
  handle: string;
  badgeTitle: string;
  specialty: string;
  institution: string;
  avatar: string;
  avatarAlt: string;
  bioPrefix: string;
  bioHighlight: string;
  bioSuffix: string;
  followers: string;
  lecturesCount: number;
  barakahViews: string;
  tabCounts: {
    lectures: number;
    shortReminders: number;
    series: number;
  };
}

export const PUBLIC_CREATORS: Record<string, PublicCreatorProfileData> = {
  "dr-omar-farooq": {
    slug: "dr-omar-farooq",
    name: "Dr. Omar Farooq",
    handle: "@dromarfarooq",
    badgeTitle: "Verified Scholar",
    specialty: "Quranic Studies",
    institution: "Al-Azhar University • Yaqeen Alum",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDQJjRkz_bGa6CkvIUG9qyKhajX0bv0rjmA8KWgedodUDI85TBlXVzTqeO0hfZ6aP5WCfujmuZEsMKBx3ScuENphqEfScl3CuUDFzBZjSCwBXFSWNPdvoGdPC3MVmIjbytZwevzbJ0G-iawZQzhR4qNpfYKcCJZa6DToXf86pJTYgsbEUOsfoDa-rsJlTAH1EYxTlRhjncyIEjbdlIhI_4l-m7viwha76CcKCNKBag",
    avatarAlt:
      "Warm studio portrait of Dr. Omar Farooq, an approachable scholarly Islamic teacher",
    bioPrefix: "Sharing daily reminders on purifying the heart (",
    bioHighlight: "Tazkiyah",
    bioSuffix:
      "), Seerah insights, and nurturing mindful family homes. Guided by verified authentic sources.",
    followers: "34.8k",
    lecturesCount: 142,
    barakahViews: "4.2M",
    tabCounts: {
      lectures: 42,
      shortReminders: 84,
      series: 6,
    },
  },
  "sh-omar-sulaiman": {
    slug: "sh-omar-sulaiman",
    name: "Sh. Omar Sulaiman",
    handle: "@omarsulaiman",
    badgeTitle: "Verified Scholar",
    specialty: "Seerah & Spirituality",
    institution: "Yaqeen Institute • Founder",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDTjBYUNCtw6WFjawNCFE3YA3Vc-TqmysjuMM4ewsZVd_5ERBfPb4_8KGyeo4X_oeGpuIUGfjkJeqdNy6y5txGanG6eTcLYmK3EUzGEo_pWOuw9-sEJeUDzs1hC6JxA6g171cBYo8YCU88GkA41M4LkkeF3xVXGCwBW6q6eHQqogo8qtKy9fXVW0pkWkZ2BRprBgQungDCiaIgpP4VLOYdsGmC3V9GcmUV5dKDNmGI",
    avatarAlt: "Portrait of Sh. Omar Sulaiman",
    bioPrefix: "Reflections on the ",
    bioHighlight: "Prophetic Sunnah",
    bioSuffix:
      ", spiritual anchors for Fajr, and building sincere hearts connected to the Akhirah.",
    followers: "89.4k",
    lecturesCount: 215,
    barakahViews: "9.8M",
    tabCounts: {
      lectures: 68,
      shortReminders: 135,
      series: 12,
    },
  },
  "ustadh-bilal-ismail": {
    slug: "ustadh-bilal-ismail",
    name: "Ustadh Bilal Ismail",
    handle: "@bilalismail",
    badgeTitle: "Verified Scholar",
    specialty: "Fiqh & Salah",
    institution: "AlKauthar Institute • Islamic University of Madinah",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCPYoKOKjG5dXlYYIr9sS6TQKSgFzdvaVx6MFKwKvD7g86Eo_ruS3W6OkcmEQYDqRWXJHMq3k9SjuB2YacENIJD6ugSRn0vNexCipfHHexs6JbyCYoSU0s3qcbZvxkEL9edtG9qy3KDbQf3yJAwOL9FhqcQl8ppQIXKJVNFmMbhw8Ckv7JjT2v_FGiCHsYD5bPfZql03b6AvOvl1bkV0trJgljdBohVT4cq3WH7kCs",
    avatarAlt: "Portrait of Ustadh Bilal Ismail",
    bioPrefix: "Practical reminders on cultivating ",
    bioHighlight: "Khushu in Salah",
    bioSuffix:
      ", understanding Fiqh of worship, and strengthening daily remembrance.",
    followers: "41.2k",
    lecturesCount: 96,
    barakahViews: "3.1M",
    tabCounts: {
      lectures: 34,
      shortReminders: 54,
      series: 8,
    },
  },
  "dr-haifaa-younis": {
    slug: "dr-haifaa-younis",
    name: "Dr. Haifaa Younis",
    handle: "@drhaifaayounis",
    badgeTitle: "Verified Scholar",
    specialty: "Tazkiyah & Heart",
    institution: "Jannah Institute • Founder",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAUVZ1yV-YnUDCIkcV4hGZuqN4kcpf6vfBFWYsju7DaMS7tPi6-un16tmITRwelSCSNpwoS3yGfHv-vLFlmlPFmGRINvdiETfK7WYuECLzlajpNBpederD_gxOYC-UDwZc1oHyB5xUnmO2GWTjSsKOnY-rStSF8o27PtwKRSMXp0vLZu4AP0UwgUt72G_rbiUateQi6JqFQX5AYoQ8J8K_TKUnWGBp49_YSWAu4sDc",
    avatarAlt: "Portrait of Dr. Haifaa Younis",
    bioPrefix: "Deepening love for Allah through ",
    bioHighlight: "Tazkiyah al-Nafs",
    bioSuffix:
      ", Quranic contemplation, and finding mercy inside every trial.",
    followers: "64.5k",
    lecturesCount: 128,
    barakahViews: "5.7M",
    tabCounts: {
      lectures: 48,
      shortReminders: 71,
      series: 9,
    },
  },
  "mufti-menk": {
    slug: "mufti-menk",
    name: "Mufti Menk",
    handle: "@muftimenk",
    badgeTitle: "Verified Scholar",
    specialty: "Character & Duas",
    institution: "Sacred Footsteps • Global Educator",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDM8mtQAYO72OlO8kU-3oZuJgE78x53HMcm9eXfDd1bn221F3WFRdoUn2H2aX6-MKTgRit_zIO6Upet7AW-sSdlzIC6sbUansBguqEoG2Ogc_Ij57m62NmeWeGVKD4Si7Ja7nAPQX94vywpkK3wDKDnoZVl1Z-wt5-zQFocVnByQ6SgZGyFo_9gkEJjYMU4FWtU_3VQCcmt0HGQ-LhsYqHDwDsZPRfrrjc3VQQZmos",
    avatarAlt: "Portrait of Mufti Menk",
    bioPrefix: "Encouraging kindness, ",
    bioHighlight: "Daily Gratitude",
    bioSuffix:
      ", and upright prophetic character for families and youth worldwide.",
    followers: "142.0k",
    lecturesCount: 310,
    barakahViews: "14.6M",
    tabCounts: {
      lectures: 95,
      shortReminders: 197,
      series: 18,
    },
  },
  "ustadh-nouman-ali-khan": {
    slug: "ustadh-nouman-ali-khan",
    name: "Ustadh Nouman Ali Khan",
    handle: "@noumanalikhan",
    badgeTitle: "Verified Scholar",
    specialty: "Quran & Arabic",
    institution: "Bayyinah Institute • Founder",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDTjBYUNCtw6WFjawNCFE3YA3Vc-TqmysjuMM4ewsZVd_5ERBfPb4_8KGyeo4X_oeGpuIUGfjkJeqdNy6y5txGanG6eTcLYmK3EUzGEo_pWOuw9-sEJeUDzs1hC6JxA6g171cBYo8YCU88GkA41M4LkkeF3xVXGCwBW6q6eHQqogo8qtKy9fXVW0pkWkZ2BRprBgQungDCiaIgpP4VLOYdsGmC3V9GcmUV5dKDNmGI",
    avatarAlt: "Portrait of Ustadh Nouman Ali Khan",
    bioPrefix: "Uncovering the linguistic beauty and ",
    bioHighlight: "Tadabbur of the Quran",
    bioSuffix: " so every believer can connect deeply with Allah's words.",
    followers: "118.3k",
    lecturesCount: 264,
    barakahViews: "11.2M",
    tabCounts: {
      lectures: 88,
      shortReminders: 162,
      series: 14,
    },
  },
};

export function resolveCreatorSlug(nameOrSlug?: string): string {
  if (!nameOrSlug) return "dr-omar-farooq";
  const normalized = nameOrSlug.toLowerCase();
  if (PUBLIC_CREATORS[normalized]) return normalized;
  if (normalized.includes("omar farooq")) return "dr-omar-farooq";
  if (normalized.includes("omar sulaiman") || normalized.includes("omar suleiman"))
    return "sh-omar-sulaiman";
  if (normalized.includes("bilal")) return "ustadh-bilal-ismail";
  if (normalized.includes("haifaa")) return "dr-haifaa-younis";
  if (normalized.includes("menk")) return "mufti-menk";
  if (normalized.includes("nouman")) return "ustadh-nouman-ali-khan";
  return "dr-omar-farooq";
}

interface PublicMediaItem {
  id: string;
  categoryTab: "lectures" | "short-reminders" | "series";
  focusTopic: "All Topics" | "Tadabbur" | "Heart & Soul" | "Family";
  topicTag: string;
  duration: string;
  views: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  alt: string;
}

const PUBLIC_CREATOR_MEDIA: PublicMediaItem[] = [
  {
    id: "pcm-1",
    categoryTab: "lectures",
    focusTopic: "Tadabbur",
    topicTag: "Tafsir",
    duration: "04:15",
    views: "28.4k",
    title: "Surah Ad-Duha: When Allah Whispers 'You Are Not Forsaken'",
    subtitle: "Surah 93 • 3 days ago",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAcrdudp7Tl7C8qQ33MMe7xDPl_V_2oZM-FfcEOp-bWJ_9HEQeA-dClQZluewDnAbEHFCEePDT3i6poxbgozZ_XDvctXhRam4a3QBCOwEFfqALEuAjbIcpa5RlDAcG-pEmTdTxhFtzjjgg9-LVcz8ZD0O1axBHsm1ecSnizHNfnJyWqkUIbIdyx7fP1t-2hTF8uM1KtyeujJEANc9fuAKaUtM64th_ZTxNNccR0Gf0",
    alt: "Cinematic still of an open wooden Quran stand with gold illuminated script in a quiet moss-green courtyard sanctuary",
  },
  {
    id: "pcm-2",
    categoryTab: "short-reminders",
    focusTopic: "Heart & Soul",
    topicTag: "Adhkar",
    duration: "01:30",
    views: "41.2k",
    title: "3 Morning Duas That Guard the Solitude of Your Heart",
    subtitle: "Sunnah • 1 week ago",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDJMvMEuSZMYd5akOWdsMEeb5QyL-1hl2pUhuknX4-erNUcHV1GRQFEpAqdZ4xbjhpPjytJsf5A8AfO3S5tTlD1EmrFNKSE3VUlhyi7gS4NMacyxrQ7TSbqpld-r9jWDtKa6YS6Hoib0JfgAkFaqCf_cIxQI5aH56PKX6BRX4WkKYKh2enzH_LPq-SY2re0Bs0RZpgk8E_lQNOlZ1DugiFMGBaJaoGCiJkrU66OYwI",
    alt: "Serene interior of an Andalusian prayer hall with intricate geometric archways",
  },
  {
    id: "pcm-3",
    categoryTab: "lectures",
    focusTopic: "Heart & Soul",
    topicTag: "Spiritual Purity",
    duration: "06:40",
    views: "62.9k",
    title: "The Medicine of Silence: Healing the Restless Mind",
    subtitle: "Tazkiyah • 2 weeks ago",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAsP_x-t0XBbjPHfqSKchzr9sT0eFtfRKujZJHl5Aq0XnDj5F4hXr3MNcOol099jmR3k2j7GxXQL0wcvx4_tEJ-XGkPjYwyCFiSjsHPF9orEnP2zMIbOTPXYMkZiK3FUeXgDIVon70RWm6jGtpHPls0-gLHjt1vmf6ian7XtpsvQdU-coDxptMvFbgU5L-No3hK6X9Ku17C23EPImCURmLOsksIrHXrRXj68rWdEvk",
    alt: "Close up of a tranquil reflective water courtyard pool in a historic Islamic garden in Fez",
  },
  {
    id: "pcm-4",
    categoryTab: "series",
    focusTopic: "Family",
    topicTag: "Family",
    duration: "02:18",
    views: "19.7k",
    title: "The Prophet's Kindness to Children: Daily Sunnahs",
    subtitle: "Seerah • 3 weeks ago",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_-Zy6Dm7N7BRq2HJPLDQZ63Y9BeKpVPiC7HHx8S34OSxUxePCv_mcs3NI8Muxemuj7mPv-f8Q1RwaOrb-hsrxa0soKLHMrS6Gov2ds1S6gWjCbXloIO4GxdKi1Txln6DNIemYpfkV9eV68313LJSfZUC4OzSpt5AacjB5ZpZ7ts6w4d15dQ8hbdsUYSO5Inso_wnALd2S57cbvfgQMXQ7q4Un9wMCyqI1FXA_Lu8",
    alt: "Minimalist architectural arches framing a soft clear desert dawn sky",
  },
];

const FOCUS_CHIPS = [
  "All Topics",
  "Tadabbur",
  "Heart & Soul",
  "Family",
] as const;

interface PublicProfileViewProps {
  handle?: string;
}

export function PublicProfileView({ handle }: PublicProfileViewProps) {
  const router = useRouter();
  const slug = resolveCreatorSlug(handle);
  const creator = PUBLIC_CREATORS[slug] ?? PUBLIC_CREATORS["dr-omar-farooq"];

  const [isFollowing, setIsFollowing] = useState(false);
  const [alertsOn, setAlertsOn] = useState(false);
  const [activeCategoryTab, setActiveCategoryTab] = useState<
    "lectures" | "short-reminders" | "series"
  >("lectures");
  const [activeFocus, setActiveFocus] =
    useState<(typeof FOCUS_CHIPS)[number]>("All Topics");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2600);
  };

  const filteredMedia = PUBLIC_CREATOR_MEDIA.filter((item) => {
    const matchesFocus =
      activeFocus === "All Topics" || item.focusTopic === activeFocus;
    return matchesFocus;
  });

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      {/* Top App Header per Stitch */}
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
            <Link
              href="/profile"
              aria-label="Account Settings"
              className="w-9 h-9 rounded-full bg-surface-container-low text-on-surface-variant hover:text-primary-dark flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-xl">
                settings
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Toast Feedback */}
      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-inverse-surface text-inverse-on-surface text-xs font-medium shadow-lg whitespace-nowrap">
          {toastMsg}
        </div>
      )}

      <main className="flex-1 flex flex-col relative w-full max-w-120 mx-auto pt-16 pb-24 bg-surface">
        <div className="flex flex-col w-full pb-8">
          {/* Top Profile Sub-Navigation Bar */}
          <div className="px-4 pt-1 pb-2 flex items-center justify-between">
            <button
              aria-label="Go back"
              onClick={() => router.back()}
              className="w-10 h-10 rounded-full bg-surface-container-low text-on-surface-variant hover:text-primary-dark active:scale-95 transition-all flex items-center justify-center cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">
                arrow_back
              </span>
            </button>
            <div className="flex flex-col items-center">
              <span className="text-lg leading-6 font-semibold text-on-surface tracking-tight">
                {creator.name}
              </span>
              <span className="text-[11px] leading-3.5 text-on-surface-variant font-medium">
                {creator.handle}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                aria-label="Share Creator Profile"
                onClick={() =>
                  triggerToast(`Shared ${creator.name}'s profile link`)
                }
                className="w-10 h-10 rounded-full bg-surface-container-low text-on-surface-variant hover:text-primary-dark active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-xl">
                  ios_share
                </span>
              </button>
              <button
                aria-label="More options"
                onClick={() =>
                  triggerToast("Verified scholar profile • Authentic sources")
                }
                className="w-10 h-10 rounded-full bg-surface-container-low text-on-surface-variant hover:text-primary-dark active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-xl">
                  more_horiz
                </span>
              </button>
            </div>
          </div>

          {/* Profile Hero & Identity Card */}
          <div className="px-4 mt-1">
            <div className="bg-surface-container-lowest rounded-xl p-4 shadow-2xs flex flex-col gap-4 relative overflow-hidden">
              {/* Decorative ambient corner glow */}
              <div className="absolute -top-12 -right-12 w-36 h-36 bg-primary-fixed/20 rounded-full blur-2xl pointer-events-none" />

              {/* Avatar & Institution Strip */}
              <div className="flex items-start gap-4 relative">
                <div className="relative shrink-0">
                  <div className="w-20 h-20 rounded-full overflow-hidden p-0.5 bg-linear-to-tr from-secondary to-primary-container shadow-md">
                    <img
                      className="w-full h-full object-cover rounded-full"
                      alt={creator.avatarAlt}
                      src={creator.avatar}
                    />
                  </div>
                  {/* Verified Badge */}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-secondary text-surface-container-lowest flex items-center justify-center shadow-md">
                    <span
                      className="material-symbols-outlined text-[15px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                  </div>
                </div>

                <div className="flex flex-col min-w-0 pt-0.5">
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container text-primary-dark text-[11px] leading-3.5 font-semibold">
                      <span
                        className="material-symbols-outlined text-[13px] text-secondary"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        auto_awesome
                      </span>
                      {creator.badgeTitle}
                    </span>
                    <span className="text-[11px] leading-3.5 text-on-surface-variant">
                      • {creator.specialty}
                    </span>
                  </div>

                  <h2 className="text-xl leading-7 font-semibold text-on-surface mt-1 truncate">
                    {creator.name}
                  </h2>

                  <div className="flex items-center gap-1.5 text-on-surface-variant mt-0.5">
                    <span className="material-symbols-outlined text-base text-primary-dark shrink-0">
                      school
                    </span>
                    <span className="text-xs leading-4 font-medium truncate">
                      {creator.institution}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bio Statement */}
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {creator.bioPrefix}
                <span className="text-primary-dark font-medium">
                  {creator.bioHighlight}
                </span>
                {creator.bioSuffix}
              </p>

              {/* Stats Bar (Bento Strip) */}
              <div className="grid grid-cols-3 gap-1 py-1 px-1 bg-surface-container-low rounded-lg text-center">
                <div className="flex flex-col items-center justify-center p-1">
                  <span className="text-lg leading-6 text-primary-dark font-bold">
                    {creator.followers}
                  </span>
                  <span className="text-[11px] leading-3.5 text-on-surface-variant">
                    Followers
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center p-1">
                  <span className="text-lg leading-6 text-primary-dark font-bold">
                    {creator.lecturesCount}
                  </span>
                  <span className="text-[11px] leading-3.5 text-on-surface-variant">
                    Lectures
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center p-1">
                  <div className="flex items-center gap-0.5">
                    <span className="text-lg leading-6 text-secondary font-bold">
                      {creator.barakahViews}
                    </span>
                  </div>
                  <span className="text-[11px] leading-3.5 text-on-surface-variant">
                    Barakah Views
                  </span>
                </div>
              </div>

              {/* CTA Action Row */}
              <div className="flex items-center gap-1.5 mt-0.5">
                <button
                  onClick={() => {
                    setIsFollowing((prev) => !prev);
                    triggerToast(
                      !isFollowing
                        ? `Following ${creator.name}`
                        : `Unfollowed ${creator.name}`
                    );
                  }}
                  className={`flex-1 h-11 px-4 rounded-full text-sm leading-5 font-semibold flex items-center justify-center gap-2 shadow-2xs active:scale-[0.98] transition-all cursor-pointer ${
                    isFollowing
                      ? "bg-surface-container text-primary-dark"
                      : "bg-primary-container text-on-primary"
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-lg">
                    {isFollowing ? "check" : "add"}
                  </span>
                  <span>{isFollowing ? "Following" : "Follow"}</span>
                </button>

                <button
                  aria-label="Toggle lecture reminders"
                  onClick={() => {
                    setAlertsOn((prev) => !prev);
                    triggerToast(
                      !alertsOn
                        ? `Lecture notifications enabled for ${creator.name}`
                        : "Lecture notifications muted"
                    );
                  }}
                  className={`w-11 h-11 shrink-0 rounded-full bg-surface-container hover:text-primary-dark active:scale-95 transition-all flex items-center justify-center cursor-pointer ${
                    alertsOn ? "text-secondary" : "text-on-surface-variant"
                  }`}
                  type="button"
                >
                  <span
                    className="material-symbols-outlined text-xl"
                    style={{
                      fontVariationSettings: alertsOn ? "'FILL' 1" : "'FILL' 0",
                    }}
                  >
                    {alertsOn ? "notifications_active" : "notifications_none"}
                  </span>
                </button>

                <button
                  aria-label="Gift or share reflection link"
                  onClick={() =>
                    triggerToast("Beneficial reflection link copied to share")
                  }
                  className="w-11 h-11 shrink-0 rounded-full bg-surface-container text-on-surface-variant hover:text-primary-dark active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-xl">
                    send_time_extension
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Scholarly Authenticity Seal Banner */}
          <div className="px-4 mt-2">
            <div className="bg-surface-container-low/80 rounded-lg p-2.5 flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
                <span
                  className="material-symbols-outlined text-base text-primary-dark"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  menu_book
                </span>
              </div>
              <p className="text-[11px] leading-snug text-on-surface-variant">
                All lectures verified for authentic Hadith citations &amp;
                traditional scholarly alignment.
              </p>
            </div>
          </div>

          {/* Content Showcase Section */}
          <div className="mt-4 flex flex-col">
            {/* Category Tabs */}
            <div
              className="px-4 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar"
              role="tablist"
            >
              <button
                aria-selected={activeCategoryTab === "lectures"}
                onClick={() => setActiveCategoryTab("lectures")}
                className={`px-4 py-2 rounded-full text-xs leading-4 shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeCategoryTab === "lectures"
                    ? "font-semibold bg-surface-container text-primary-container"
                    : "font-medium bg-surface-container-lowest text-on-surface-variant hover:text-primary-dark"
                }`}
                role="tab"
                type="button"
              >
                <span
                  className="material-symbols-outlined text-[15px]"
                  style={{
                    fontVariationSettings:
                      activeCategoryTab === "lectures"
                        ? "'FILL' 1"
                        : "'FILL' 0",
                  }}
                >
                  play_circle
                </span>
                Lectures ({creator.tabCounts.lectures})
              </button>

              <button
                aria-selected={activeCategoryTab === "short-reminders"}
                onClick={() => setActiveCategoryTab("short-reminders")}
                className={`px-4 py-2 rounded-full text-xs leading-4 shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeCategoryTab === "short-reminders"
                    ? "font-semibold bg-surface-container text-primary-container"
                    : "font-medium bg-surface-container-lowest text-on-surface-variant hover:text-primary-dark"
                }`}
                role="tab"
                type="button"
              >
                <span
                  className="material-symbols-outlined text-[15px]"
                  style={{
                    fontVariationSettings:
                      activeCategoryTab === "short-reminders"
                        ? "'FILL' 1"
                        : "'FILL' 0",
                  }}
                >
                  electric_bolt
                </span>
                Short Reminders ({creator.tabCounts.shortReminders})
              </button>

              <button
                aria-selected={activeCategoryTab === "series"}
                onClick={() => setActiveCategoryTab("series")}
                className={`px-4 py-2 rounded-full text-xs leading-4 shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeCategoryTab === "series"
                    ? "font-semibold bg-surface-container text-primary-container"
                    : "font-medium bg-surface-container-lowest text-on-surface-variant hover:text-primary-dark"
                }`}
                role="tab"
                type="button"
              >
                <span
                  className="material-symbols-outlined text-[15px]"
                  style={{
                    fontVariationSettings:
                      activeCategoryTab === "series" ? "'FILL' 1" : "'FILL' 0",
                  }}
                >
                  collections_bookmark
                </span>
                Series ({creator.tabCounts.series})
              </button>
            </div>

            {/* Active Filter Sub-chips */}
            <div className="px-4 mt-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[11px] leading-3.5 text-on-surface-variant shrink-0 mr-1">
                Focus:
              </span>
              {FOCUS_CHIPS.map((chip) => {
                const isSelected = activeFocus === chip;
                return (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setActiveFocus(chip)}
                    className={`px-2.5 py-1 rounded-full text-[11px] leading-3.5 shrink-0 transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-surface-container-high text-primary-dark font-semibold"
                        : "bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container"
                    }`}
                  >
                    {chip}
                  </button>
                );
              })}
            </div>

            {/* 2-Column Responsive Media Grid */}
            <div className="px-4 mt-2 grid grid-cols-2 gap-2">
              {filteredMedia.map((card) => (
                <Link
                  href="/feed"
                  key={card.id}
                  className="bg-surface-container-lowest rounded-lg overflow-hidden shadow-2xs flex flex-col group cursor-pointer active:scale-[0.98] transition-transform"
                >
                  <div className="relative w-full aspect-9/13 bg-surface-container overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={card.alt}
                      src={card.imageUrl}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-primary-dark/80 via-transparent to-black/20 pointer-events-none" />
                    {/* Duration pill */}
                    <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-xs bg-inverse-surface/75 text-inverse-on-surface text-[11px] leading-3.5 backdrop-blur-xs">
                      {card.duration}
                    </span>
                    {/* Topic Tag */}
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-surface-container-lowest/90 text-primary-dark text-[11px] leading-3.5 font-semibold backdrop-blur-xs">
                      {card.topicTag}
                    </span>
                    {/* Views and Verified Overlay */}
                    <div className="absolute bottom-2 inset-x-2 flex items-center justify-between text-on-primary">
                      <div className="flex items-center gap-1 text-[11px] leading-3.5">
                        <span className="material-symbols-outlined text-sm">
                          visibility
                        </span>
                        {card.views}
                      </div>
                      <span
                        className="material-symbols-outlined text-base text-secondary-fixed"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        verified
                      </span>
                    </div>
                  </div>
                  <div className="p-2 flex flex-col">
                    <h3 className="text-sm text-on-surface font-semibold line-clamp-2 leading-tight">
                      {card.title}
                    </h3>
                    <span className="text-[11px] leading-3.5 text-on-surface-variant mt-1">
                      {card.subtitle}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Quiet End of Feed Affirmation */}
            <div className="mt-6 mb-2 flex flex-col items-center justify-center text-center px-4">
              <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary-container mb-1">
                <span className="material-symbols-outlined text-lg">
                  workspace_premium
                </span>
              </div>
              <p className="text-xs leading-4 text-on-surface-variant font-medium">
                You are caught up with {creator.name}&apos;s latest lectures
              </p>
              <span className="text-[11px] leading-3.5 text-outline mt-0.5">
                May this knowledge bring Barakah to your deeds
              </span>
            </div>
          </div>
        </div>
      </main>

      <BottomNav activeTab="profile" />
    </div>
  );
}
