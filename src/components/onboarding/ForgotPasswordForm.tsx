"use client";

import { useState } from "react";
import Link from "next/link";
import { MaterialIcon } from "@/components/common/MaterialIcon";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
    }, 800);
  };

  return (
    <main className="flex-1 flex flex-col relative w-full min-h-screen bg-surface text-on-surface">
      <div className="flex flex-col w-full max-w-107.5 mx-auto px-4 pb-8">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between py-2">
          <Link
            href="/auth"
            aria-label="Back to Log In"
            className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary-dark transition-colors active:bg-surface-container-high"
          >
            <MaterialIcon name="arrow_back" className="text-xl" />
          </Link>
          <div className="flex items-center gap-1.5 opacity-80">
            <MaterialIcon name="spa" className="text-primary-container text-lg"
              style={{ fontVariationSettings: "'FILL' 1" }}
             />
            <span className="text-lg leading-6 font-semibold text-primary-dark tracking-wide">
              Barakah
            </span>
          </div>
          <div aria-hidden="true" className="w-10 h-10" />
        </div>

        {/* Decorative Calm Illustration / Visual Emblem */}
        <div className="flex flex-col items-center mt-4 mb-6 text-center">
          <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-surface-container-low shadow-2xs mb-4">
            {/* Ambient gentle glow ring */}
            <div className="absolute inset-0 rounded-full bg-primary-dark/5 animate-pulse" />
            <div className="relative w-14 h-14 rounded-full bg-primary-container flex items-center justify-center shadow-md">
              <MaterialIcon name="key" className="text-secondary-fixed text-[28px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
               />
            </div>
            {/* Petite floating serene accent star */}
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-secondary-container flex items-center justify-center shadow-2xs">
              <MaterialIcon name="arrow_back_ios_new" className="text-on-secondary-container text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
               />
            </div>
          </div>

          {/* Headline and Gentle Copy */}
          <h1 className="text-[26px] leading-8.5 font-bold tracking-[-0.01em] text-on-surface mb-1">
            Reset your password
          </h1>
          <p className="text-sm leading-relaxed text-on-surface-variant max-w-xs">
            Enter your registered email address and we&apos;ll send you a gentle
            link to reset your access to your sanctuary.
          </p>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          {/* Email Input Card */}
          <div className="flex flex-col gap-1.5 text-left">
            <label
              className="text-xs leading-4 font-medium text-on-surface-variant ml-1"
              htmlFor="emailInput"
            >
              Email Address
            </label>
            <div className="relative flex items-center w-full bg-surface-container-lowest rounded-xl shadow-2xs transition-all focus-within:shadow-md">
              <div className="absolute left-4 flex items-center justify-center text-outline pointer-events-none">
                <MaterialIcon name="mail" className="text-xl" />
              </div>
              <input
                id="emailInput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-transparent text-sm leading-5 text-on-surface placeholder:text-outline-variant focus:outline-none rounded-xl"
                placeholder="yusuf@example.com"
                required
                type="email"
              />
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            disabled={status !== "idle"}
            className={`w-full mt-1 py-3.5 px-6 rounded-full text-on-primary text-sm leading-5 font-semibold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] cursor-pointer ${
              status === "sent"
                ? "bg-tertiary-container"
                : "bg-primary-container active:bg-primary-dark"
            }`}
            type="submit"
          >
            {status === "idle" && (
              <>
                <span>Send Reset Link</span>
                <MaterialIcon name="arrow_forward" className="text-lg" />
              </>
            )}
            {status === "sending" && (
              <>
                <MaterialIcon name="progress_activity" className="animate-spin text-lg" />
                <span>Sending...</span>
              </>
            )}
            {status === "sent" && (
              <>
                <MaterialIcon name="check_circle" className="text-lg" />
                <span>Link Sent</span>
              </>
            )}
          </button>
        </form>

        {/* Reassurance / Mindful Tip Banner */}
        <div className="mt-6 w-full bg-surface-container-low rounded-xl p-4 flex items-start gap-3 shadow-2xs">
          <div className="w-8 h-8 rounded-full bg-surface-container shrink-0 flex items-center justify-center text-primary-container">
            <MaterialIcon name="eco" className="text-lg"
              style={{ fontVariationSettings: "'FILL' 1" }}
             />
          </div>
          <div className="flex flex-col">
            <span className="text-xs leading-4 text-primary-dark font-semibold mb-0.5">
              Gentle reminder
            </span>
            <p className="text-[13px] leading-4.5 text-on-surface-variant">
              Remember to check your spam or promotions folder if you do not see
              it within a minute.
            </p>
          </div>
        </div>

        {/* Help & Peaceful Support Link */}
        <div className="flex items-center justify-center mt-6">
          <div className="flex items-center gap-1.5 text-on-surface-variant">
            <span className="text-[13px] leading-4.5">Having trouble?</span>
            <button
              className="text-xs leading-4 text-primary-dark font-medium hover:underline inline-flex items-center gap-0.5 cursor-pointer"
              type="button"
            >
              Contact gentle support
            </button>
          </div>
        </div>

        {/* Bottom Return to Log In */}
        <div className="mt-8 pt-4 flex items-center justify-center text-center">
          <p className="text-sm leading-5 text-on-surface-variant">
            Remembered your password?
            <Link
              className="text-sm leading-5 text-primary-dark font-semibold hover:underline ml-1"
              href="/auth"
            >
              Back to Log In
            </Link>
          </p>
        </div>

        {/* Confirmation Feedback Toast */}
        {status === "sent" && (
          <div className="fixed bottom-6 left-4 right-4 max-w-107.5 mx-auto bg-primary-dark text-on-primary p-4 rounded-xl shadow-xl flex items-center gap-3 transition-opacity z-50">
            <MaterialIcon name="mark_email_read" className="text-secondary-fixed text-2xl" />
            <div className="flex-1">
              <p className="text-sm leading-5 font-semibold text-on-primary">
                Instructions sent
              </p>
              <p className="text-[13px] leading-4.5 text-primary-fixed-dim">
                Please check your inbox to continue peacefully.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
