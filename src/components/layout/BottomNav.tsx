"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MaterialIcon } from "@/components/common/MaterialIcon";

export type NavTab = "home" | "library" | "submit" | "saved" | "profile";

interface BottomNavProps {
  activeTab?: NavTab;
  variant?: "default" | "dark";
}

export function BottomNav({
  activeTab,
  variant = "default",
}: BottomNavProps) {
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

  const isDark = variant === "dark";

  return (
    <nav
      className={
        isDark
          ? "fixed bottom-0 inset-x-0 z-50 bg-black/60 backdrop-blur-xl border-t border-white/10"
          : "fixed bottom-0 inset-x-0 z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_-4px_24px_rgba(15,92,77,0.06)]"
      }
    >
      <div className="relative flex justify-around items-center h-20 px-1 max-w-120 mx-auto">
        <Link
          href="/feed"
          className={`flex flex-col items-center justify-center min-w-14 min-h-11 transition-colors ${
            currentTab === "home"
              ? isDark
                ? "text-primary-fixed font-semibold"
                : "text-primary-dark font-semibold"
              : isDark
                ? "text-white/70 hover:text-white"
                : "text-on-surface-variant hover:text-primary-dark"
          }`}
        >
          <MaterialIcon
            name="home"
            filled={currentTab === "home"}
            className="text-2xl"
          />
          <span className="text-[11px] leading-3.5 tracking-[0.02em] mt-1">
            Home
          </span>
        </Link>

        <Link
          href="/library"
          className={`flex flex-col items-center justify-center min-w-14 min-h-11 transition-colors ${
            currentTab === "library"
              ? isDark
                ? "text-primary-fixed font-semibold"
                : "text-primary-dark font-semibold"
              : isDark
                ? "text-white/70 hover:text-white"
                : "text-on-surface-variant hover:text-primary-dark"
          }`}
        >
          <MaterialIcon
            name="explore"
            filled={currentTab === "library"}
            className="text-2xl"
          />
          <span className="text-[11px] leading-3.5 tracking-[0.02em] mt-1">
            Library
          </span>
        </Link>

        <div
          className={`relative ${
            isDark ? "-top-2" : "-top-3"
          } flex flex-col items-center justify-center`}
        >
          <Link
            aria-label="Submit Reflection"
            href="/submit"
            className={
              isDark
                ? "w-12 h-12 rounded-full bg-primary-container border border-primary-fixed/30 text-white flex items-center justify-center shadow-[0_6px_20px_rgba(15,92,77,0.5)] hover:scale-105 active:scale-95 transition-all"
                : "w-12 h-12 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-[0_6px_20px_rgba(15,92,77,0.35)] hover:scale-105 active:scale-95 transition-all"
            }
          >
            <MaterialIcon name="add" className="text-[26px]" />
          </Link>
        </div>

        <Link
          href="/saved"
          className={`flex flex-col items-center justify-center min-w-14 min-h-11 transition-colors ${
            currentTab === "saved"
              ? isDark
                ? "text-primary-fixed font-semibold"
                : "text-primary-dark font-semibold"
              : isDark
                ? "text-white/70 hover:text-white"
                : "text-on-surface-variant hover:text-primary-dark"
          }`}
        >
          <MaterialIcon
            name="bookmark"
            filled={currentTab === "saved"}
            className="text-2xl"
          />
          <span className="text-[11px] leading-3.5 tracking-[0.02em] mt-1">
            Saved
          </span>
        </Link>

        <Link
          href="/profile"
          className={`flex flex-col items-center justify-center min-w-14 min-h-11 transition-colors ${
            currentTab === "profile"
              ? isDark
                ? "text-primary-fixed font-semibold"
                : "text-primary-dark font-semibold"
              : isDark
                ? "text-white/70 hover:text-white"
                : "text-on-surface-variant hover:text-primary-dark"
          }`}
        >
          <MaterialIcon
            name="person"
            filled={currentTab === "profile"}
            className="text-2xl"
          />
          <span className="text-[11px] leading-3.5 tracking-[0.02em] mt-1">
            Profile
          </span>
        </Link>
      </div>
    </nav>
  );
}
