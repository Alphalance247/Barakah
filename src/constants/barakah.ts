export interface TopicItem {
  id: string;
  name: string;
  clipCount: number;
  isCoreLibrary: boolean;
}

export const BARAKAH_TOPICS: TopicItem[] = [
  { id: "quran", name: "Quran", clipCount: 142, isCoreLibrary: true },
  { id: "prayer", name: "Prayer", clipCount: 98, isCoreLibrary: true },
  { id: "seerah", name: "Seerah", clipCount: 76, isCoreLibrary: true },
  { id: "character", name: "Character", clipCount: 114, isCoreLibrary: true },
  { id: "family", name: "Family", clipCount: 64, isCoreLibrary: true },
  { id: "duas", name: "Duas", clipCount: 89, isCoreLibrary: true },
  { id: "fiqh-basics", name: "Fiqh basics", clipCount: 83, isCoreLibrary: true },
  { id: "ramadan", name: "Ramadan", clipCount: 52, isCoreLibrary: true },
  { id: "tafsir", name: "Tafsir", clipCount: 67, isCoreLibrary: false },
  { id: "hadith", name: "Hadith", clipCount: 91, isCoreLibrary: false },
  { id: "history", name: "History", clipCount: 45, isCoreLibrary: false },
  { id: "youth", name: "Youth", clipCount: 58, isCoreLibrary: false },
];

export const BARAKAH_COUNTRIES = [
  "Nigeria",
  "United Kingdom",
  "United States",
  "Saudi Arabia",
  "United Arab Emirates",
  "Malaysia",
  "Indonesia",
  "Egypt",
  "Pakistan",
  "Turkey",
  "Canada",
  "Australia",
  "South Africa",
  "Qatar",
  "Morocco",
  "Jordan",
  "Germany",
  "France",
  "Other",
] as const;

export const BARAKAH_AGE_GROUPS = [
  "Under 18",
  "18–24",
  "25–34",
  "35–49",
  "50+",
  "Prefer not to say",
] as const;

export const BARAKAH_GENDERS = [
  { id: "brother", label: "Brother" },
  { id: "sister", label: "Sister" },
  { id: "unspecified", label: "Prefer not to say" },
] as const;

export const SESSION_CLIP_LIMIT = 20;
export const MIN_ONBOARDING_TOPICS = 3;
/** Every clip in Barakah is strictly capped at 1 minute 30 seconds (90 seconds) */
export const MAX_CLIP_DURATION_SECONDS = 90;
