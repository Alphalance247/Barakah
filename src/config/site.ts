export const SITE_CONFIG = {
  name: "Barakah",
  tagline: "Scroll with benefit.",
  description: "Verified Islamic reminders and lectures, nothing else.",
  sessionClipLimit: 20,
  minOnboardingTopics: 3,
  supportedLocales: [
    { code: "en", label: "English", dir: "ltr" as const },
    { code: "ar", label: "العربية", dir: "rtl" as const },
    { code: "ur", label: "اردو", dir: "rtl" as const },
  ],
};
