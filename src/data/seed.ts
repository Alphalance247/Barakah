import type { ClipItem, SavedCollection, ContentSubmission } from "@/types";
import { MAX_CLIP_DURATION_SECONDS } from "@/constants/barakah";

export interface SimulatedFeedClip {
  id: string;
  videoSrc: string;
  posterUrl: string;
  scholar: string;
  institute: string;
  avatar: string;
  arabicAyah: string;
  ayahRef: string;
  caption: string;
  tags: string[];
  likesCount: number;
  commentsCount: number;
  savesCount: number;
  maxDurationSeconds: number;
}

const BASE_FEED_VIDEOS: Omit<SimulatedFeedClip, "id">[] = [
  {
    videoSrc: "/videos/feed1.mp4",
    posterUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDfK5lZeHrzp0-ASdOKABN4476iRwWAinQKVpU1LU4dhv9YNgGItjb-Y8pZeompJGRw9HzRpWxHKLDKQ4BJ8E9WDisgirvkbjlVEqzotv6g1-3gq1ymDb5FjgHGOfJ6IlSUzx1YJBk65hDowgFn-elmsauCEVa7p2LkSW_Mt3YjQAHFZTzGAXfvWd3bOCuKGSVXWXx-6NSDTPAqDDnV_OcFwWPZasQPdg7-jdaq-ow",
    scholar: "Sh. Omar Sulaiman",
    institute: "Yaqeen Institute",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDTjBYUNCtw6WFjawNCFE3YA3Vc-TqmysjuMM4ewsZVd_5ERBfPb4_8KGyeo4X_oeGpuIUGfjkJeqdNy6y5txGanG6eTcLYmK3EUzGEo_pWOuw9-sEJeUDzs1hC6JxA6g171cBYo8YCU88GkA41M4LkkeF3xVXGCwBW6q6eHQqogo8qtKy9fXVW0pkWkZ2BRprBgQungDCiaIgpP4VLOYdsGmC3V9GcmUV5dKDNmGI",
    arabicAyah: "وَالصُّبْحِ إِذَا تَنَفَّسَ",
    ayahRef: "At-Takwir 81:18",
    caption:
      "The two sunnah rak'ahs before Fajr are better than the entire world and everything within it. Start your morning with quiet contemplation.",
    tags: ["#Prayer", "#PeaceOfMind", "#FajrReflection"],
    likesCount: 18400,
    commentsCount: 128,
    savesCount: 4200,
    maxDurationSeconds: MAX_CLIP_DURATION_SECONDS,
  },
  {
    videoSrc: "/videos/feedb2.mp4",
    posterUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDoU1Ub7dlxDm2tJDwlNMExW4vaVYwqbxwpvMKdE7heb5DWx4M_3VHhYa3YD3p4g8ZjxsHCYOnH_ezyuADMe93l4l2J8Kyi4Knt-sMT85D8TqSNlguXsWKtp8FxavQABvLFHoHffEODvaagjuWNbiD3GQOD1t8O8fgRx9eobxaTWz5_b_O15WgW-UYEaeNe1-kAf9VjnsnyPV22k1RvAhkSVnbFdiI05NvjOgF9Up8",
    scholar: "Ustadh Bilal Ismail",
    institute: "AlKauthar Institute",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCPYoKOKjG5dXlYYIr9sS6TQKSgFzdvaVx6MFKwKvD7g86Eo_ruS3W6OkcmEQYDqRWXJHMq3k9SjuB2YacENIJD6ugSRn0vNexCipfHHexs6JbyCYoSU0s3qcbZvxkEL9edtG9qy3KDbQf3yJAwOL9FhqcQl8ppQIXKJVNFmMbhw8Ckv7JjT2v_FGiCHsYD5bPfZql03b6AvOvl1bkV0trJgljdBohVT4cq3WH7kCs",
    arabicAyah: "قَدْ أَفْلَحَ الْمُؤْمِنُونَ الَّذِينَ هُمْ فِي صَلَاتِهِمْ خَاشِعُونَ",
    ayahRef: "Al-Mu'minun 23:1-2",
    caption:
      "The Secret to Khushu: Presence in salah begins the moment you pause your worldly tasks to answer the Adhan.",
    tags: ["#Prayer", "#Khushu", "#Salah"],
    likesCount: 12100,
    commentsCount: 94,
    savesCount: 3800,
    maxDurationSeconds: MAX_CLIP_DURATION_SECONDS,
  },
  {
    videoSrc: "/videos/feed3.mp4",
    posterUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBsoe0rzpMs1U21yB0FQpLuK6Q_N-e6H_UmMg9FUpGzkK5pFDu6kJQqvLJaqgX8Af-35cc9OW9W3ypasmo6_QtLH0o8o0kqh1F5I76O1FrjkLyOp-kO0jbAUTAmT4Hsj0H21sZoG1ZngVL4hY-IDopTR4UkBLaQ4jB3c1sugUiZILizFksYQE-rQ2dHT5MfilRYmpswQS-35wcnIzsnDZ2Zn7T3FgHt97zrIEBtMa4",
    scholar: "Dr. Haifaa Younis",
    institute: "Jannah Institute",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAUVZ1yV-YnUDCIkcV4hGZuqN4kcpf6vfBFWYsju7DaMS7tPi6-un16tmITRwelSCSNpwoS3yGfHv-vLFlmlPFmGRINvdiETfK7WYuECLzlajpNBpederD_gxOYC-UDwZc1oHyB5xUnmO2GWTjSsKOnY-rStSF8o27PtwKRSMXp0vLZu4AP0UwgUt72G_rbiUateQi6JqFQX5AYoQ8J8K_TKUnWGBp49_YSWAu4sDc",
    arabicAyah: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
    ayahRef: "Ash-Sharh 94:5",
    caption:
      "Why Trials are Blessings: Every test from Allah carries a hidden gift of closeness to Him. Look for the mercy inside the difficulty.",
    tags: ["#Character", "#Patience", "#Tazkiyah"],
    likesCount: 21700,
    commentsCount: 164,
    savesCount: 6100,
    maxDurationSeconds: MAX_CLIP_DURATION_SECONDS,
  },
  {
    videoSrc: "/videos/feed4.mp4",
    posterUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBgkoZ3GGofXLHC5tk35xZn-tcjXtuDml9lmT_zvKdltWgSYrxhl51QO8A0VVUEzcQ821fmOlRKMwF9wXFWfI3oCwhm2-01iTJrvZvZphi1B2ICYYJvkSIWkBj36c-LqKsylddArPYhlvJygCRjIp6kA56nJ5oaMFw2d6os_ZpQKQRQY5gCog3ROov0XAPLsfd_lJtu14n0A7YHWfdcvgweHHwW3TQjxvXt4Gp7Mf4",
    scholar: "Mufti Menk",
    institute: " Sacred Footsteps",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDM8mtQAYO72OlO8kU-3oZuJgE78x53HMcm9eXfDd1bn221F3WFRdoUn2H2aX6-MKTgRit_zIO6Upet7AW-sSdlzIC6sbUansBguqEoG2Ogc_Ij57m62NmeWeGVKD4Si7Ja7nAPQX94vywpkK3wDKDnoZVl1Z-wt5-zQFocVnByQ6SgZGyFo_9gkEJjYMU4FWtU_3VQCcmt0HGQ-LhsYqHDwDsZPRfrrjc3VQQZmos",
    arabicAyah: "لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ",
    ayahRef: "Ibrahim 14:7",
    caption:
      "Living with Gratitude: When you thank Allah for the small blessings in your morning, He opens doors you never imagined.",
    tags: ["#Duas", "#Gratitude", "#DailySunnah"],
    likesCount: 15900,
    commentsCount: 112,
    savesCount: 4900,
    maxDurationSeconds: MAX_CLIP_DURATION_SECONDS,
  },
  {
    videoSrc: "/videos/feed5.mp4",
    posterUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD6mjZVbC7_DAZ9nO3BIIATO0baBk8XTPyxJP2vvhS9rS7zY-OftYdaX9jrooE_RobQLSSqxL6j5g8hvgUDPz3XkMQuY5noP5CVIqzy0_lnSrb7o664d0ZUFhFrYLMyjcJx9R_0ttxqrNdUmiTAy8LhaWiWYZdnhjO0h86ixc-kb14Spl75gGYMBMHAF4ffSAOLZezSP9TXcKTrmRk8hm3rP_1XRE7IbHCHfjP-ksk",
    scholar: "Ustadh Nouman Ali Khan",
    institute: "Bayyinah Institute",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDTjBYUNCtw6WFjawNCFE3YA3Vc-TqmysjuMM4ewsZVd_5ERBfPb4_8KGyeo4X_oeGpuIUGfjkJeqdNy6y5txGanG6eTcLYmK3EUzGEo_pWOuw9-sEJeUDzs1hC6JxA6g171cBYo8YCU88GkA41M4LkkeF3xVXGCwBW6q6eHQqogo8qtKy9fXVW0pkWkZ2BRprBgQungDCiaIgpP4VLOYdsGmC3V9GcmUV5dKDNmGI",
    arabicAyah: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
    ayahRef: "Ar-Ra'd 13:28",
    caption:
      "Repentance and Hope: No matter how far you feel you have drifted, one sincere return to Allah erases the distance.",
    tags: ["#Quran", "#Tadabbur", "#Repentance"],
    likesCount: 24300,
    commentsCount: 195,
    savesCount: 7400,
    maxDurationSeconds: MAX_CLIP_DURATION_SECONDS,
  },
];

/**
 * Generates the finite daily feed of 20 clips (cycling through the 5 local MP4 videos in public/videos/),
 * each strictly capped at 90 seconds (1m 30s).
 */
export const SIMULATED_FEED_CLIPS: SimulatedFeedClip[] = Array.from(
  { length: 20 },
  (_, index) => {
    const base = BASE_FEED_VIDEOS[index % BASE_FEED_VIDEOS.length];
    return {
      ...base,
      id: `feed-clip-${index + 1}`,
    };
  }
);

export const SEED_CLIPS: ClipItem[] = [
  {
    id: "clip-1",
    title: "Finding Presence (Khushu) in Prayer",
    caption:
      "When you stand for salah, leave the noise of the world behind your shoulders.",
    videoUrl: "/videos/feed1.mp4",
    durationSeconds: 58,
    topicId: "prayer",
    topicName: "Prayer",
    creator: {
      id: "creator-1",
      name: "Shaykh Omar Suleiman",
      username: "omarsuleiman",
      isVerified: true,
    },
    likesCount: 1420,
    commentsCount: 128,
    isLiked: false,
    isSaved: true,
    allowDownload: true,
    commentsEnabled: true,
    createdAt: "2h ago",
  },
];

export const SEED_COLLECTIONS: SavedCollection[] = [
  {
    id: "col-1",
    name: "Reminders for Fajr",
    clipCount: 12,
    previewThumbnails: [],
  },
  {
    id: "col-2",
    name: "Quran reflections",
    clipCount: 8,
    previewThumbnails: [],
  },
];

export const SEED_SUBMISSIONS: ContentSubmission[] = [
  {
    id: "sub-1",
    title: "The Virtue of Morning Adhkar",
    sourceUrlOrFile: "https://example.com/seerah-lecture",
    speakerOrSource: "Mufti Menk",
    topicId: "duas",
    status: "Pending",
    submittedAt: "Submitted 2 days ago",
  },
  {
    id: "sub-2",
    title: "Patience in Difficult Times",
    sourceUrlOrFile: "https://example.com/adhkar",
    speakerOrSource: "Yaqeen Institute",
    topicId: "character",
    status: "Approved",
    submittedAt: "Published to Library",
  },
  {
    id: "sub-3",
    title: "Unverified Clip Source",
    sourceUrlOrFile: "https://example.com/unverified-clip",
    speakerOrSource: "Unknown Source",
    topicId: "character",
    status: "Rejected",
    rejectionReason:
      "Please include the original speaker's name and lecture source so our scholars can verify the clip before publishing.",
    submittedAt: "1 week ago",
  },
];
