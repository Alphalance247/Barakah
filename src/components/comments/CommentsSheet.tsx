"use client";

import { useState } from "react";
import Link from "next/link";
import { containsProfanity } from "@/lib/profanityFilter";
import { resolveCreatorSlug } from "@/components/profile";
import { MaterialIcon } from "@/components/common/MaterialIcon";

interface CommentData {
  id: string;
  author: string;
  avatar: string;
  timeAgo: string;
  text: string;
  likes: number;
  isLiked?: boolean;
  isPinned?: boolean;
  isVerified?: boolean;
  replyCount?: number;
}

const INITIAL_COMMENTS: CommentData[] = [
  {
    id: "c-1",
    author: "Sh. Omar Sulaiman",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDTjBYUNCtw6WFjawNCFE3YA3Vc-TqmysjuMM4ewsZVd_5ERBfPb4_8KGyeo4X_oeGpuIUGfjkJeqdNy6y5txGanG6eTcLYmK3EUzGEo_pWOuw9-sEJeUDzs1hC6JxA6g171cBYo8YCU88GkA41M4LkkeF3xVXGCwBW6q6eHQqogo8qtKy9fXVW0pkWkZ2BRprBgQungDCiaIgpP4VLOYdsGmC3V9GcmUV5dKDNmGI",
    timeAgo: "Author • 2h ago",
    text: "Jazakum Allahu khayran for the reflections. Which morning habits bring the most barakah to your day?",
    likes: 342,
    isPinned: true,
    isVerified: true,
    replyCount: 14,
  },
  {
    id: "c-2",
    author: "Amina K.",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAUVZ1yV-YnUDCIkcV4hGZuqN4kcpf6vfBFWYsju7DaMS7tPi6-un16tmITRwelSCSNpwoS3yGfHv-vLFlmlPFmGRINvdiETfK7WYuECLzlajpNBpederD_gxOYC-UDwZc1oHyB5xUnmO2GWTjSsKOnY-rStSF8o27PtwKRSMXp0vLZu4AP0UwgUt72G_rbiUateQi6JqFQX5AYoQ8J8K_TKUnWGBp49_YSWAu4sDc",
    timeAgo: "1h ago",
    text: "Making du'a in the quiet of Tahajjud before Fajr completely changed my anxiety levels. SubhanAllah.",
    likes: 89,
  },
  {
    id: "c-3",
    author: "Tariq M.",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDM8mtQAYO72OlO8kU-3oZuJgE78x53HMcm9eXfDd1bn221F3WFRdoUn2H2aX6-MKTgRit_zIO6Upet7AW-sSdlzIC6sbUansBguqEoG2Ogc_Ij57m62NmeWeGVKD4Si7Ja7nAPQX94vywpkK3wDKDnoZVl1Z-wt5-zQFocVnByQ6SgZGyFo_9gkEJjYMU4FWtU_3VQCcmt0HGQ-LhsYqHDwDsZPRfrrjc3VQQZmos",
    timeAgo: "45m ago",
    text: "Beautiful reminder. Downloaded this to listen during my commute.",
    likes: 24,
  },
];

interface CommentsSheetProps {
  onClose?: () => void;
}

export function CommentsSheet({ onClose }: CommentsSheetProps) {
  const [comments, setComments] = useState<CommentData[]>(INITIAL_COMMENTS);
  const [inputText, setInputText] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const toggleLike = (id: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              isLiked: !c.isLiked,
              likes: c.isLiked ? c.likes - 1 : c.likes + 1,
            }
          : c
      )
    );
  };

  const handleReport = (id: string) => {
    setOpenMenuId(null);
    setStatusMessage("Report received. Our moderation team will review.");
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return;
    if (containsProfanity(trimmed)) {
      setStatusMessage("Please keep discourse respectful and beneficial.");
      return;
    }

    const newComment: CommentData = {
      id: `c-${Date.now()}`,
      author: "You",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDTjBYUNCtw6WFjawNCFE3YA3Vc-TqmysjuMM4ewsZVd_5ERBfPb4_8KGyeo4X_oeGpuIUGfjkJeqdNy6y5txGanG6eTcLYmK3EUzGEo_pWOuw9-sEJeUDzs1hC6JxA6g171cBYo8YCU88GkA41M4LkkeF3xVXGCwBW6q6eHQqogo8qtKy9fXVW0pkWkZ2BRprBgQungDCiaIgpP4VLOYdsGmC3V9GcmUV5dKDNmGI",
      timeAgo: "Just now",
      text: trimmed,
      likes: 1,
      isLiked: true,
    };

    setComments((prev) => [...prev, newComment]);
    setInputText("");
    setStatusMessage("Comment shared with barakah ✨");
    setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <div className="flex flex-col w-full relative min-w-0 select-none overflow-hidden">
      {/* Immersive Feed Background (Dimmed & Softly Blurred) */}
      <div
        onClick={onClose}
        className="relative w-full h-44 rounded-b-2xl overflow-hidden shadow-xs cursor-pointer"
      >
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD6mjZVbC7_DAZ9nO3BIIATO0baBk8XTPyxJP2vvhS9rS7zY-OftYdaX9jrooE_RobQLSSqxL6j5g8hvgUDPz3XkMQuY5noP5CVIqzy0_lnSrb7o664d0ZUFhFrYLMyjcJx9R_0ttxqrNdUmiTAy8LhaWiWYZdnhjO0h86ixc-kb14Spl75gGYMBMHAF4ffSAOLZezSP9TXcKTrmRk8hm3rP_1XRE7IbHCHfjP-ksk')",
          }}
        />
        {/* Emerald-tinted dark veil overlay */}
        <div className="absolute inset-0 bg-primary-dark/70 backdrop-blur-xs flex flex-col justify-between p-4">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest/20 backdrop-blur-md text-on-primary text-[11px] leading-3.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed-dim animate-pulse" />
              Now Playing • 01:30
            </span>
            <button
              className="w-8 h-8 rounded-full bg-surface-container-lowest/15 text-on-primary flex items-center justify-center hover:bg-surface-container-lowest/25 transition-colors"
              type="button"
            >
              <MaterialIcon name="volume_up" className="text-lg" />
            </button>
          </div>
          <div className="flex items-end justify-between">
            <div className="min-w-0 pr-4">
              <span className="text-secondary-fixed text-[11px] leading-3.5 font-medium tracking-wide uppercase">
                Spiritual Habits
              </span>
              <h2 className="text-lg leading-6 text-on-primary font-bold truncate mt-0.5">
                Anchoring Barakah in Early Mornings
              </h2>
            </div>
            <div className="flex items-center gap-1 text-on-primary/90 text-xs leading-4 font-medium shrink-0">
              <MaterialIcon name="star" className="text-lg text-secondary-fixed" />
              <span>4.9</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sliding Bottom Sheet Container */}
      <div className="relative w-full bg-surface-container-lowest rounded-t-3xl shadow-[0_-8px_32px_rgba(15,92,77,0.12)] -mt-4 z-10 flex flex-col">
        {/* Sheet Drag Handle Pill */}
        <div className="w-full flex justify-center pt-3 pb-1">
          <div className="w-12 h-1.5 bg-outline-variant/60 rounded-full" />
        </div>

        {/* Sheet Header */}
        <div className="px-4 pt-1 pb-3 flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-xl leading-7 text-on-surface font-bold tracking-tight">
                Comments
              </h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container text-primary-dark text-xs leading-4 font-semibold">
                {125 + comments.length}
              </span>
            </div>
            <button
              aria-label="Close Comments"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant flex items-center justify-center transition-all active:scale-95 cursor-pointer"
              type="button"
            >
              <MaterialIcon name="close" className="text-lg" />
            </button>
          </div>

          {/* Moderation & Sanctity Prompt Notice */}
          <div className="mt-2.5 flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-container-low text-primary-dark">
            <MaterialIcon name="spa" className="text-base text-secondary shrink-0"
              style={{ fontVariationSettings: "'FILL' 1" }}
             />
            <p className="text-[13px] leading-4.5 text-on-surface-variant">
              {statusMessage ??
                "Respectful, beneficial discourse only. Moderated with love."}
            </p>
          </div>
        </div>

        {/* Comment List Stream */}
        <div className="px-4 flex flex-col gap-3.5 pb-24">
          {comments.map((comment) =>
            comment.isPinned ? (
              <div
                key={comment.id}
                className="p-3.5 rounded-2xl bg-surface-container-low/70 flex flex-col gap-2.5 relative"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MaterialIcon name="push_pin" className="text-secondary text-base"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                     />
                    <span className="text-[11px] leading-3.5 text-secondary font-semibold uppercase tracking-wider">
                      Pinned by Speaker
                    </span>
                  </div>
                  <span className="text-[11px] leading-3.5 text-on-surface-variant/80">
                    {comment.timeAgo}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Link
                    href={`/creator/${resolveCreatorSlug(comment.author)}`}
                    className="shrink-0 hover:opacity-90 transition-opacity"
                  >
                    <img
                      alt={comment.author}
                      className="w-10 h-10 rounded-full object-cover shadow-xs"
                      src={comment.avatar}
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <Link
                        href={`/creator/${resolveCreatorSlug(comment.author)}`}
                        className="text-sm leading-5 text-on-surface font-semibold hover:underline"
                      >
                        {comment.author}
                      </Link>
                      {comment.isVerified && (
                        <span
                          className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] shadow-2xs overflow-hidden"
                          title="Verified Scholar"
                        >
                          <MaterialIcon name="verified" className="text-[11px] leading-none"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                           />
                        </span>
                      )}
                    </div>
                    <p className="text-sm leading-5 text-on-surface mt-1">
                      {comment.text}
                    </p>
                    <div className="flex items-center gap-4 mt-2.5">
                      <button
                        onClick={() => toggleLike(comment.id)}
                        className={`group flex items-center gap-1.5 transition-colors cursor-pointer ${
                          comment.isLiked
                            ? "text-secondary"
                            : "text-on-surface-variant hover:text-primary-dark"
                        }`}
                        type="button"
                      >
                        <MaterialIcon name="favorite" className="text-lg group-hover:scale-110 transition-transform"
                          style={{
                            fontVariationSettings: comment.isLiked
                              ? "'FILL' 1"
                              : "'FILL' 0",
                          }}
                         />
                        <span className="text-xs leading-4 font-medium">
                          {comment.likes}
                        </span>
                      </button>
                      <button
                        onClick={() =>
                          setInputText(`@${comment.author} `)
                        }
                        className="flex items-center gap-1 text-on-surface-variant hover:text-primary-dark text-xs leading-4 font-medium transition-colors cursor-pointer"
                        type="button"
                      >
                        <MaterialIcon name="reply" className="text-base" />
                        <span>Reply</span>
                      </button>
                      {comment.replyCount && (
                        <>
                          <span className="text-on-surface-variant/40 text-[11px]">
                            •
                          </span>
                          <button
                            className="text-[11px] leading-3.5 text-primary-dark font-semibold hover:underline cursor-pointer"
                            type="button"
                          >
                            View {comment.replyCount} replies
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                key={comment.id}
                className="p-3 rounded-2xl bg-surface-container-lowest flex items-start gap-3 transition-colors hover:bg-surface-container-low/40"
              >
                <img
                  alt={comment.author}
                  className="w-9 h-9 rounded-full object-cover shrink-0 shadow-2xs"
                  src={comment.avatar}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs leading-4 text-on-surface font-semibold">
                        {comment.author}
                      </span>
                      <span className="text-[11px] leading-3.5 text-on-surface-variant/70">
                        • {comment.timeAgo}
                      </span>
                    </div>
                    <div className="relative">
                      <button
                        onClick={() =>
                          setOpenMenuId(
                            openMenuId === comment.id ? null : comment.id
                          )
                        }
                        className="w-6 h-6 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer"
                        type="button"
                      >
                        <MaterialIcon name="more_horiz" className="text-lg" />
                      </button>
                      {openMenuId === comment.id && (
                        <div className="absolute right-0 top-7 w-28 bg-surface-container-lowest rounded-xl shadow-[0_8px_20px_rgba(15,92,77,0.12)] py-1 z-20 border border-surface-container">
                          <button
                            onClick={() => handleReport(comment.id)}
                            className="w-full px-3 py-1.5 text-left text-[11px] leading-3.5 text-error flex items-center gap-1.5 hover:bg-error-container/40 transition-colors cursor-pointer"
                            type="button"
                          >
                            <MaterialIcon name="flag" className="text-sm" />
                            Report
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm leading-5 text-on-surface mt-1">
                    {comment.text}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <button
                      onClick={() => toggleLike(comment.id)}
                      className={`group flex items-center gap-1.5 transition-colors cursor-pointer ${
                        comment.isLiked
                          ? "text-secondary"
                          : "text-on-surface-variant hover:text-primary-dark"
                      }`}
                      type="button"
                    >
                      <MaterialIcon name="favorite" className="text-lg group-hover:scale-110 transition-transform"
                        style={{
                          fontVariationSettings: comment.isLiked
                            ? "'FILL' 1"
                            : "'FILL' 0",
                        }}
                       />
                      <span className="text-xs leading-4 font-medium">
                        {comment.likes}
                      </span>
                    </button>
                    <button
                      onClick={() => setInputText(`@${comment.author} `)}
                      className="flex items-center gap-1 text-on-surface-variant hover:text-primary-dark text-xs leading-4 font-medium transition-colors cursor-pointer"
                      type="button"
                    >
                      <MaterialIcon name="reply" className="text-base" />
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
              </div>
            )
          )}

          {/* Quick Reflection Prompt Pill */}
          <div className="mt-1 flex items-center justify-between p-3 rounded-xl bg-surface-container text-on-surface-variant">
            <div className="flex items-center gap-2">
              <MaterialIcon name="auto_awesome" className="text-primary-dark text-lg" />
              <span className="text-[11px] leading-3.5">
                Need guidance on drafting your thought?
              </span>
            </div>
            <button
              onClick={() =>
                setStatusMessage(
                  "Guideline: Share personal takeaways, cite authentic sources, and speak with ihsan."
                )
              }
              className="text-primary-dark text-[11px] leading-3.5 font-semibold hover:underline cursor-pointer"
              type="button"
            >
              Guidelines
            </button>
          </div>
        </div>

        {/* Sticky Bottom Comment Input Bar */}
        <div className="fixed bottom-20 inset-x-0 bg-surface-container-lowest/95 backdrop-blur-xl px-4 py-2.5 z-40 max-w-120 mx-auto shadow-[0_-6px_20px_rgba(15,92,77,0.06)]">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <div className="flex-1 flex items-center bg-surface-container-low rounded-full px-3.5 py-2 transition-all focus-within:bg-surface-container focus-within:shadow-xs">
              <MaterialIcon name="edit_note" className="text-outline-variant text-xl mr-2" />
              <input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full bg-transparent text-on-surface placeholder:text-outline text-sm leading-5 focus:outline-none"
                maxLength={280}
                placeholder="Add a respectful comment..."
                type="text"
              />
              <button
                onClick={() => setInputText((prev) => prev + " 🤲")}
                className="text-on-surface-variant/70 hover:text-primary-dark transition-colors p-1 cursor-pointer"
                title="Add emoji"
                type="button"
              >
                <MaterialIcon name="sentiment_satisfied" className="text-lg" />
              </button>
            </div>
            <button
              aria-label="Send Comment"
              className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-all shadow-[0_4px_14px_rgba(15,92,77,0.25)] cursor-pointer"
              type="submit"
            >
              <MaterialIcon name="arrow_upward" className="text-xl" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
