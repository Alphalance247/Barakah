"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MaterialIcon } from "@/components/common/MaterialIcon";

interface AuthFormProps {
  initialMode?: "signup" | "login";
}

export function AuthForm({ initialMode = "signup" }: AuthFormProps) {
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(initialMode === "signup");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("US");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup) {
      router.push("/onboarding");
    } else {
      router.push("/feed");
    }
  };

  return (
    <main className="flex-1 flex flex-col relative w-full min-h-screen bg-surface text-on-surface">
      <div className="flex flex-col w-full max-w-107.5 mx-auto px-4 pb-8">
        {/* Top Bar */}
        <header className="flex items-center justify-between py-2">
          <Link
            href="/welcome"
            aria-label="Go back"
            className="w-10 h-10 rounded-full bg-surface-container-lowest shadow-2xs flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
          >
            <MaterialIcon name="arrow_back" className="text-xl" />
          </Link>
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-6 h-1.5 rounded-full bg-primary-container transition-all" />
              <span className="w-1.5 h-1.5 rounded-full bg-surface-container-highest" />
              <span className="w-1.5 h-1.5 rounded-full bg-surface-container-highest" />
            </div>
            <span className="text-[11px] leading-3.5 font-medium text-on-surface-variant">
              Step 1 of 3
            </span>
          </div>
          <div className="w-10 h-10" />
        </header>

        {/* Header & Emblem */}
        <div className="flex flex-col items-center text-center mt-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-primary-container flex items-center justify-center shadow-md mb-4 relative overflow-hidden">
            <svg
              className="w-7 h-7 text-secondary-container"
              fill="none"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 3L19.5 12.5L29 16L19.5 19.5L16 29L12.5 19.5L3 16L12.5 12.5L16 3Z"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="1.75"
              />
              <circle cx="16" cy="16" fill="currentColor" r="3" />
            </svg>
          </div>
          <h1 className="text-[26px] leading-8.5 font-bold tracking-[-0.01em] text-primary-dark mb-1">
            Begin your sanctuary
          </h1>
          <p className="text-sm leading-5 text-on-surface-variant max-w-xs">
            Sign up or log in to save clips, build collections, and track your
            daily 20-clip mindful feed.
          </p>
        </div>

        {/* Segmented Toggle */}
        <div className="bg-surface-container p-1 rounded-full flex items-center mb-6 shadow-2xs">
          <button
            onClick={() => setIsSignup(true)}
            className={`flex-1 py-2.5 rounded-full text-sm leading-5 font-semibold transition-all cursor-pointer ${
              isSignup
                ? "bg-primary-container text-on-primary shadow-2xs"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
            type="button"
          >
            Sign Up
          </button>
          <button
            onClick={() => setIsSignup(false)}
            className={`flex-1 py-2.5 rounded-full text-sm leading-5 font-semibold transition-all cursor-pointer ${
              !isSignup
                ? "bg-primary-container text-on-primary shadow-2xs"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
            type="button"
          >
            Log In
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Full Name Field (Sign Up only) */}
          {isSignup && (
            <div className="flex flex-col gap-1.5 transition-all">
              <label
                className="text-xs leading-4 font-medium text-on-surface-variant px-1"
                htmlFor="fullname"
              >
                Full Name
              </label>
              <div className="relative flex items-center bg-surface-container-lowest rounded-2xl shadow-2xs px-4 py-3.5">
                <MaterialIcon name="person" className="text-outline text-xl mr-3" />
                <input
                  id="fullname"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-transparent text-sm leading-5 text-on-surface placeholder:text-outline/70 focus:outline-none"
                  placeholder="Yusuf Ahmad"
                  type="text"
                />
              </div>
            </div>
          )}

          {/* Email Address Field */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-xs leading-4 font-medium text-on-surface-variant px-1"
              htmlFor="email"
            >
              Email Address
            </label>
            <div className="relative flex items-center bg-surface-container-lowest rounded-2xl shadow-2xs px-4 py-3.5">
              <MaterialIcon name="mail" className="text-outline text-xl mr-3" />
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-sm leading-5 text-on-surface placeholder:text-outline/70 focus:outline-none"
                placeholder="yusuf@example.com"
                type="email"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between px-1">
              <label
                className="text-xs leading-4 font-medium text-on-surface-variant"
                htmlFor="password"
              >
                Password
              </label>
              {!isSignup && (
                <Link
                  href="/forgot-password"
                  className="text-xs leading-4 font-semibold text-primary-container hover:underline"
                >
                  Forgot password?
                </Link>
              )}
            </div>
            <div className="relative flex items-center bg-surface-container-lowest rounded-2xl shadow-2xs px-4 py-3.5">
              <MaterialIcon name="lock" className="text-outline text-xl mr-3" />
              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-sm leading-5 text-on-surface placeholder:text-outline/70 focus:outline-none pr-8"
                placeholder={
                  isSignup ? "Create a gentle password" : "Enter your password"
                }
                type={showPassword ? "text" : "password"}
              />
              <button
                aria-label="Toggle password visibility"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-outline hover:text-on-surface transition-colors flex items-center justify-center cursor-pointer"
                type="button"
              >
                <MaterialIcon name={showPassword ? "visibility" : "visibility_off"} className="text-xl" />
              </button>
            </div>
          </div>

          {/* Country / Region Field from Stitch Sign Up Screen (Sign Up only) */}
          {isSignup && (
            <div
              className="flex flex-col gap-4 transition-all"
              id="signup-demographics"
            >
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs leading-4 font-medium text-on-surface-variant px-1"
                  htmlFor="country"
                >
                  Country / Region
                </label>
                <div className="relative flex items-center bg-surface-container-lowest rounded-2xl shadow-2xs px-4 py-3.5">
                  <MaterialIcon name="public" className="text-outline text-xl mr-3" />
                  <select
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-transparent text-sm leading-5 text-on-surface focus:outline-none appearance-none cursor-pointer pr-6"
                  >
                    <option value="US">United States 🇺🇸</option>
                    <option value="GB">United Kingdom 🇬🇧</option>
                    <option value="CA">Canada 🇨🇦</option>
                    <option value="AE">United Arab Emirates 🇦🇪</option>
                    <option value="SA">Saudi Arabia 🇸🇦</option>
                    <option value="PK">Pakistan 🇵🇰</option>
                    <option value="ID">Indonesia 🇮🇩</option>
                    <option value="MY">Malaysia 🇲🇾</option>
                    <option value="TR">Turkey 🇹🇷</option>
                    <option value="OTHER">Other Country / Region</option>
                  </select>
                  <MaterialIcon name="expand_more" className="text-outline text-xl absolute right-4 pointer-events-none" />
                </div>
              </div>

              {/* <div className="flex items-center gap-1.5 px-1 -mt-1">
                <MaterialIcon name="lock" className="text-outline text-sm" />
                <p className="text-[11px] leading-3.5 text-on-surface-variant">
                  Used gently for prayer times &amp; tailored content. Never
                  shared.
                </p>
              </div> */}
            </div>
          )}

          {/* Primary CTA */}
          <button
            className="w-full mt-2 py-3.5 px-6 rounded-full bg-primary-container text-on-primary text-sm leading-5 font-semibold shadow-md hover:bg-primary-dark active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            type="submit"
          >
            <span>Continue</span>
            <MaterialIcon name="arrow_forward" className="text-lg" />
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-outline-variant/40" />
          <span className="text-[11px] leading-3.5 font-medium text-on-surface-variant">
            or continue with
          </span>
          <div className="flex-1 h-px bg-outline-variant/40" />
        </div>

        {/* Secondary Google Button */}
        <button
          onClick={() => router.push("/onboarding")}
          className="w-full py-3.5 px-6 rounded-full bg-surface-container-lowest text-on-surface text-sm leading-5 font-semibold shadow-2xs hover:bg-surface-container-low active:scale-[0.99] transition-all flex items-center justify-center gap-3 cursor-pointer"
          type="button"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Bottom Reassurance & Switch Link */}
        <div className="flex flex-col items-center text-center mt-6 gap-2">
          <div className="flex items-center gap-1.5 text-on-surface-variant">
            <MaterialIcon name="verified_user" className="text-base text-primary-container"
              style={{ fontVariationSettings: "'FILL' 1" }}
             />
            <p className="text-[11px] leading-3.5 font-medium">
              No spam, no streaks, no guilt. Your data stays private.
            </p>
          </div>
          <p className="text-[13px] leading-4.5 text-on-surface-variant">
            <span>
              {isSignup ? "Already have an account?" : "New to Barakah?"}
            </span>
            <button
              onClick={() => setIsSignup((prev) => !prev)}
              className="text-sm leading-5 font-semibold text-primary-container ml-1 hover:underline cursor-pointer"
              type="button"
            >
              {isSignup ? "Log in" : "Sign up"}
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}
