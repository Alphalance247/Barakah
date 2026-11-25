import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Hourglass, Sprout, Mail, ArrowRight } from "lucide-react";

export function WelcomeHero() {
  return (
    <main className="flex-1 flex flex-col relative w-full min-h-screen bg-surface text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed">
      <div className="flex flex-col w-full max-w-107.5 mx-auto relative overflow-hidden px-5 pb-10">
        {/* Subtle Arabesque Geometric Pattern Background Layer */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-30 flex justify-center -top-12"
        >
          <svg
            className="w-full max-w-lg text-primary-container"
            fill="none"
            viewBox="0 0 400 320"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient cx="50%" cy="20%" id="arabesqueGaze" r="70%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
                <stop offset="60%" stopColor="currentColor" stopOpacity="0.1" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Eight-point star tessellation motif */}
            <g fill="none" opacity="0.6" stroke="currentColor" strokeWidth="0.75">
              <path d="M200,20 L220,60 L260,60 L230,90 L245,130 L200,105 L155,130 L170,90 L140,60 L180,60 Z" />
              <path
                d="M200,5 L235,50 L285,50 L245,90 L265,145 L200,115 L135,145 L155,90 L115,50 L165,50 Z"
                strokeDasharray="2 3"
              />
              <circle cx="200" cy="85" r="70" />
              <circle cx="200" cy="85" r="105" strokeDasharray="4 4" />
              <path d="M120,85 C120,40 280,40 280,85 C280,130 120,130 120,85 Z" />
              <path d="M200,5 C160,50 160,120 200,165 C240,120 240,50 200,5 Z" />
              <circle cx="80" cy="180" r="50" strokeOpacity="0.4" />
              <circle cx="320" cy="180" r="50" strokeOpacity="0.4" />
              <path d="M80,140 L100,180 L80,220 L60,180 Z" strokeOpacity="0.4" />
              <path d="M320,140 L340,180 L320,220 L300,180 Z" strokeOpacity="0.4" />
            </g>
            <rect fill="url(#arabesqueGaze)" height="100%" width="100%" />
          </svg>
        </div>

        {/* Content Stream */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Top Branding & Crest Section */}
          <div className="pt-6 pb-2 flex flex-col items-center">
            {/* Logo Mark Wrapper with Soft Ambient Glow */}
            <div className="relative mb-3 flex items-center justify-center">
              <div className="absolute -inset-3 rounded-full bg-primary-fixed/40 blur-xl" />
              <div className="relative w-20 h-20 rounded-full bg-surface-container-lowest shadow-md flex items-center justify-center p-3">
                <Image
                  alt="Barakah App Logo"
                  src="/images/barakah-logo.png"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            </div>

            {/* App Title */}
            <h1 className="text-[26px] leading-8.5 font-bold tracking-[-0.01em] text-on-surface">
              Barakah
            </h1>

            {/* Arabic Subtitle Calligraphy Script */}
            <p
              className="mt-1 text-xs leading-4 tracking-wider text-primary-dark font-medium opacity-90"
              dir="rtl"
            >
              بَرَكَة — عِلْمٌ وَعَمَلٌ وَنُور
            </p>
          </div>

          {/* Editorial Hero Tagline Card */}
          <div className="mt-6 mb-5 px-2">
            <h2 className="text-2xl leading-8 text-on-surface font-bold tracking-[-0.01em]">
              Scroll with benefit.
            </h2>
            <p className="mt-2.5 text-sm leading-5 text-on-surface-variant max-w-xs mx-auto">
              Verified Islamic reminders and lectures, nothing else. Every
              minute invested in your spiritual growth.
            </p>
          </div>

          {/* Sanctuary Value Pillars Row */}
          <div className="w-full flex items-center justify-center gap-2 mb-8 flex-wrap">
            {/* Pillar 1 */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container shadow-2xs">
              <BadgeCheck
                size={15}
                className="text-primary-dark fill-primary-dark stroke-surface-container"
              />
              <span className="text-[11px] leading-3.5 tracking-[0.02em] font-medium text-on-surface">
                100% Verified Scholars
              </span>
            </div>

            {/* Pillar 2 */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container shadow-2xs">
              <Hourglass size={14} className="text-secondary fill-secondary/20" />
              <span className="text-[11px] leading-3.5 tracking-[0.02em] font-medium text-on-surface">
                Finite Daily Feed
              </span>
            </div>

            {/* Pillar 3 */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container shadow-2xs">
              <Sprout size={15} className="text-primary-dark" />
              <span className="text-[11px] leading-3.5 tracking-[0.02em] font-medium text-on-surface">
                No Distractions
              </span>
            </div>
          </div>

          {/* Curated Visual Preview Anchor ("Today's Focus") */}
          <Link
            href="/onboarding"
            className="w-full max-w-xs mb-8 p-3 rounded-xl bg-surface-container-low shadow-2xs flex items-center gap-3 text-left transition-colors duration-200 hover:bg-surface-container"
          >
            <div className="relative w-12 h-12 rounded-lg bg-surface-container overflow-hidden shrink-0">
              <Image
                alt="Sacred book on carved cedar lectern"
                src="/images/todays-focus-book.png"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary-dark/10" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-[11px] leading-3.5 text-secondary font-semibold uppercase tracking-wider">
                  Today&apos;s Focus
                </span>
              </div>
              <p className="text-xs leading-4 text-on-surface font-semibold truncate mt-0.5">
                Tazkiyah • Purifying Intentions
              </p>
              <p className="text-[11px] leading-3.5 text-on-surface-variant mt-0.5">
                5 curated reflections ready
              </p>
            </div>
            <ArrowRight size={20} className="text-primary-container shrink-0" />
          </Link>

          {/* Authentication Action Hub */}
          <div className="w-full space-y-3">
            {/* Google Auth Button */}
            <Link
              href="/onboarding"
              className="w-full relative flex items-center justify-center gap-3 py-3.5 px-6 rounded-full bg-primary-container text-on-primary shadow-md hover:bg-primary-dark transition-all duration-200 active:scale-[0.98]"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#ffffff"
                  opacity="0.95"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#ffffff"
                  opacity="0.85"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  fill="#ffffff"
                  opacity="0.75"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  fill="#ffffff"
                  opacity="0.9"
                />
              </svg>
              <span className="text-sm leading-5 font-semibold tracking-normal text-on-primary">
                Continue with Google
              </span>
            </Link>

            {/* Email Auth Button */}
            <Link
              href="/auth"
              className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full bg-surface-container-lowest text-primary-dark shadow-xs hover:bg-surface-container transition-all duration-200 active:scale-[0.98]"
            >
              <Mail size={19} className="shrink-0" />
              <span className="text-sm leading-5 tracking-normal font-semibold">
                Continue with email
              </span>
            </Link>
          </div>

          {/* Quiet Guest Access Link */}
          <Link
            href="/feed"
            className="mt-4 py-1.5 px-3 text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-1 group"
          >
            <span className="text-xs leading-4 font-medium">
              Explore sanctuary as guest
            </span>
            <ArrowRight
              size={15}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </Link>

          {/* Legal Compliance Footnote */}
          <p className="mt-8 text-[11px] leading-3.5 tracking-[0.02em] font-medium text-outline max-w-xs">
            By continuing you agree to our{" "}
            <Link
              className="underline underline-offset-2 text-on-surface-variant hover:text-primary-dark transition-colors"
              href="/welcome#terms"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              className="underline underline-offset-2 text-on-surface-variant hover:text-primary-dark transition-colors"
              href="/welcome#privacy"
            >
              Privacy Policy
            </Link>
            .
          </p>

          {/* Soft Sacred Indicator */}
          <div className="mt-5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed-dim" />
            <span className="w-2.5 h-1 rounded-full bg-primary-container" />
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed-dim" />
          </div>
        </div>
      </div>
    </main>
  );
}
