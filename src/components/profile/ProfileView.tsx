"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "@/hooks/useTheme";

export function ProfileView() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [showRejectionReason, setShowRejectionReason] = useState(false);

  return (
    <div className="flex flex-col w-full px-4 py-4 gap-6">
      {/* User Profile Header */}
      <section className="bg-surface-container-lowest rounded-xl p-6 shadow-2xs flex flex-col items-center text-center">
        <div className="relative mb-2">
          <img
            alt="Yusuf Ahmad"
            className="w-20 h-20 rounded-full object-cover shadow-md"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPYoKOKjG5dXlYYIr9sS6TQKSgFzdvaVx6MFKwKvD7g86Eo_ruS3W6OkcmEQYDqRWXJHMq3k9SjuB2YacENIJD6ugSRn0vNexCipfHHexs6JbyCYoSU0s3qcbZvxkEL9edtG9qy3KDbQf3yJAwOL9FhqcQl8ppQIXKJVNFmMbhw8Ckv7JjT2v_FGiCHsYD5bPfZql03b6AvOvl1bkV0trJgljdBohVT4cq3WH7kCs"
          />
          <span
            className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-2xs"
            title="Verified Community Member"
          >
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
          </span>
        </div>

        <h2 className="text-xl leading-7 font-semibold text-on-surface">
          Yusuf Ahmad
        </h2>
        <p className="text-[13px] leading-4.5 text-on-surface-variant mt-1">
          @yusuf.a
        </p>

        {/* 3-Column Stats Row */}
        <div className="grid grid-cols-3 gap-3 w-full mt-6 pt-2">
          <Link
            href="/saved"
            className="bg-surface-container-low rounded-xl py-2 px-1 flex flex-col items-center justify-center hover:bg-surface-container transition-colors"
          >
            <span className="text-lg leading-6 font-semibold text-primary-dark">
              24
            </span>
            <span className="text-[11px] leading-3.5 text-on-surface-variant mt-1">
              Saved
            </span>
          </Link>
          <Link
            href="/saved"
            className="bg-surface-container-low rounded-xl py-2 px-1 flex flex-col items-center justify-center hover:bg-surface-container transition-colors"
          >
            <span className="text-lg leading-6 font-semibold text-primary-dark">
              6
            </span>
            <span className="text-[11px] leading-3.5 text-on-surface-variant mt-1">
              Downloads
            </span>
          </Link>
          <div className="bg-surface-container-low rounded-xl py-2 px-1 flex flex-col items-center justify-center">
            <span className="text-lg leading-6 font-semibold text-primary-dark">
              3
            </span>
            <span className="text-[11px] leading-3.5 text-on-surface-variant mt-1">
              Submissions
            </span>
          </div>
        </div>
      </section>

      {/* My Submissions Section */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-lg leading-6 font-semibold text-on-surface">
            My submissions
          </h3>
          <span className="text-[11px] leading-3.5 text-on-surface-variant">
            3 total
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {/* Submission 1: Pending */}
          <div className="bg-surface-container-lowest rounded-xl p-4 shadow-2xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-secondary-fixed/60 text-on-secondary-fixed-variant flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-xl">
                  schedule
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <p className="text-sm leading-5 font-semibold text-on-surface truncate">
                  The Virtue of Morning Adhkar
                </p>
                <p className="text-[13px] leading-4.5 text-on-surface-variant">
                  Submitted 2 days ago
                </p>
              </div>
            </div>
            <span className="shrink-0 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant text-[11px] leading-3.5 font-medium">
              Pending
            </span>
          </div>

          {/* Submission 2: Approved */}
          <div className="bg-surface-container-lowest rounded-xl p-4 shadow-2xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-tertiary-fixed/70 text-on-tertiary-fixed-variant flex items-center justify-center shrink-0">
                <span
                  className="material-symbols-outlined text-xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <p className="text-sm leading-5 font-semibold text-on-surface truncate">
                  Patience in Difficult Times
                </p>
                <p className="text-[13px] leading-4.5 text-on-surface-variant">
                  Published to Library
                </p>
              </div>
            </div>
            <span className="shrink-0 px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant text-[11px] leading-3.5 font-medium">
              Approved
            </span>
          </div>

          {/* Submission 3: Rejected */}
          <div className="bg-surface-container-lowest rounded-xl p-4 shadow-2xs flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-error-container text-on-error-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl">
                    info
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="text-sm leading-5 font-semibold text-on-surface truncate">
                    Unverified Clip Source
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowRejectionReason((prev) => !prev)}
                    className="text-[11px] leading-3.5 font-medium text-primary-dark text-left hover:underline focus:outline-none mt-1 w-fit cursor-pointer"
                  >
                    {showRejectionReason ? "Hide reason" : "See reason"}
                  </button>
                </div>
              </div>
              <span className="shrink-0 px-2.5 py-1 rounded-full bg-error-container text-on-error-container text-[11px] leading-3.5 font-medium">
                Rejected
              </span>
            </div>

            {showRejectionReason && (
              <div className="bg-surface-container-low rounded-lg p-2.5 text-on-surface-variant text-[13px] leading-4.5">
                Please include the original speaker&apos;s name and lecture
                source so our scholars can verify the clip before publishing.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Settings List */}
      <section className="flex flex-col gap-2">
        <h3 className="text-lg leading-6 font-semibold text-on-surface px-1">
          Settings
        </h3>
        <div className="bg-surface-container-lowest rounded-xl p-2 shadow-2xs flex flex-col gap-1">
          {/* Notifications */}
          <button
            className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-low transition-colors text-left cursor-pointer"
            type="button"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-full bg-surface-container text-primary-dark flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-xl">
                  notifications
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm leading-5 font-semibold text-on-surface">
                  Notifications
                </span>
                <span className="text-[13px] leading-4.5 text-on-surface-variant truncate">
                  Gentle daily reminder
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-xl text-on-surface-variant">
              chevron_right
            </span>
          </button>

          {/* Dark Mode */}
          <div className="w-full flex items-center justify-between p-2 rounded-lg">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-full bg-surface-container text-primary-dark flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-xl">
                  dark_mode
                </span>
              </div>
              <span className="text-sm leading-5 font-semibold text-on-surface">
                Dark mode
              </span>
            </div>
            <button
              aria-checked={theme === "dark"}
              aria-label="Toggle dark mode"
              onClick={toggleTheme}
              className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 flex items-center cursor-pointer ${
                theme === "dark"
                  ? "bg-primary-dark"
                  : "bg-surface-container-highest"
              }`}
              role="switch"
              type="button"
            >
              <span
                className={`w-5 h-5 rounded-full bg-surface-container-lowest shadow-2xs transition-transform duration-200 ${
                  theme === "dark" ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Language */}
          <button
            onClick={() => router.push("/onboarding")}
            className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-low transition-colors text-left cursor-pointer"
            type="button"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-full bg-surface-container text-primary-dark flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-xl">
                  language
                </span>
              </div>
              <span className="text-sm leading-5 font-semibold text-on-surface">
                Language
              </span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <span className="text-[13px] leading-4.5 text-on-surface-variant">
                English
              </span>
              <span className="material-symbols-outlined text-xl text-on-surface-variant">
                chevron_right
              </span>
            </div>
          </button>

          {/* Privacy */}
          <button
            className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-low transition-colors text-left cursor-pointer"
            type="button"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-full bg-surface-container text-primary-dark flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-xl">
                  lock
                </span>
              </div>
              <span className="text-sm leading-5 font-semibold text-on-surface">
                Privacy
              </span>
            </div>
            <span className="material-symbols-outlined text-xl text-on-surface-variant">
              chevron_right
            </span>
          </button>

          {/* Help & Support */}
          <button
            className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-low transition-colors text-left cursor-pointer"
            type="button"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-full bg-surface-container text-primary-dark flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-xl">
                  help
                </span>
              </div>
              <span className="text-sm leading-5 font-semibold text-on-surface">
                Help &amp; Support
              </span>
            </div>
            <span className="material-symbols-outlined text-xl text-on-surface-variant">
              chevron_right
            </span>
          </button>

          {/* Log out */}
          <button
            onClick={() => router.push("/welcome")}
            className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-low transition-colors text-left mt-1 cursor-pointer"
            type="button"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-full bg-surface-container-low text-on-surface-variant flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-xl">
                  logout
                </span>
              </div>
              <span className="text-sm leading-5 font-semibold text-on-surface-variant">
                Log out
              </span>
            </div>
          </button>
        </div>
      </section>
    </div>
  );
}
