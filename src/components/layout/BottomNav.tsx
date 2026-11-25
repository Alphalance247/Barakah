"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavTab = "home" | "library" | "submit" | "saved" | "profile";

interface BottomNavProps {
  activeTab?: NavTab;
}

export function BottomNav({ activeTab }: BottomNavProps) {
  const pathname = usePathname();

  const currentTab: NavTab =
    activeTab ??
    (pathname.startsWith("/library")
      ? "library"
      : pathname.startsWith("/saved")
      ? "saved"
      : pathname.startsWith("/profile")
      ? "profile"
      : pathname.startsWith("/submit")
      ? "submit"
      : "home");

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_-4px_24px_rgba(15,92,77,0.06)]">
      <div className="relative flex justify-around items-center h-20 px-1 max-w-120 mx-auto">
        <Link
          href="/feed"
          className={`flex flex-col items-center justify-center min-w-14 min-h-11 transition-colors ${
            currentTab === "home"
              ? "text-primary-dark font-semibold"
              : "text-on-surface-variant hover:text-primary-dark"
          }`}
        >
          <span className="material-symbols-outlined text-2xl">home</span>
          <span className="text-[11px] leading-3.5 tracking-[0.02em] mt-1">
            Home
          </span>
        </Link>

        <Link
          href="/library"
          className={`flex flex-col items-center justify-center min-w-14 min-h-11 transition-colors ${
            currentTab === "library"
              ? "text-primary-dark font-semibold"
              : "text-on-surface-variant hover:text-primary-dark"
          }`}
        >
          <span className="material-symbols-outlined text-2xl">explore</span>
          <span className="text-[11px] leading-3.5 tracking-[0.02em] mt-1">
            Library
          </span>
        </Link>

        <div className="relative -top-3 flex flex-col items-center justify-center">
          <Link
            aria-label="Submit Reflection"
            href="/submit"
            className="w-12 h-12 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-[0_6px_20px_rgba(15,92,77,0.35)] hover:scale-105 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[26px]">add</span>
          </Link>
        </div>

        <Link
          href="/saved"
          className={`flex flex-col items-center justify-center min-w-14 min-h-11 transition-colors ${
            currentTab === "saved"
              ? "text-primary-dark font-semibold"
              : "text-on-surface-variant hover:text-primary-dark"
          }`}
        >
          <span className="material-symbols-outlined text-2xl">bookmark</span>
          <span className="text-[11px] leading-3.5 tracking-[0.02em] mt-1">
            Saved
          </span>
        </Link>

        <Link
          href="/profile"
          className={`flex flex-col items-center justify-center min-w-14 min-h-11 transition-colors ${
            currentTab === "profile"
              ? "text-primary-dark font-semibold"
              : "text-on-surface-variant hover:text-primary-dark"
          }`}
        >
          <span className="material-symbols-outlined text-2xl">person</span>
          <span className="text-[11px] leading-3.5 tracking-[0.02em] mt-1">
            Profile
          </span>
        </Link>
      </div>
    </nav>
  );
}
