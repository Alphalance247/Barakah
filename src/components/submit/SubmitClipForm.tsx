"use client";

import { useState } from "react";

export function SubmitClipForm() {
  const [videoUrl, setVideoUrl] = useState("");
  const [fileName, setFileName] = useState("Choose video file");
  const [speaker, setSpeaker] = useState("");
  const [topic, setTopic] = useState("");
  const [note, setNote] = useState("");
  const [hasPermission, setHasPermission] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  return (
    <div className="flex flex-col w-full px-4 py-4 gap-6">
      {/* Header Intro */}
      <div className="flex flex-col gap-1">
        <h2 className="text-[26px] leading-8.5 font-bold tracking-[-0.01em] text-on-surface">
          Share a benefit
        </h2>
        <p className="text-sm leading-5 text-on-surface-variant">
          Everything is reviewed by our team before it appears.
        </p>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Upload / Link Area */}
        <div className="relative bg-surface-container-lowest rounded-xl p-6 shadow-2xs flex flex-col items-center text-center gap-2 overflow-hidden">
          {/* Dashed Emerald SVG Frame */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none text-primary-dark/35"
            preserveAspectRatio="none"
          >
            <rect
              fill="none"
              height="calc(100% - 4px)"
              rx="12"
              ry="12"
              stroke="currentColor"
              strokeDasharray="6 6"
              strokeWidth="1.5"
              width="calc(100% - 4px)"
              x="2"
              y="2"
            />
          </svg>

          <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary-dark">
            <span className="material-symbols-outlined text-2xl">
              cloud_upload
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-sm leading-5 font-semibold text-on-surface">
              Paste a video link or upload a clip
            </p>
            <p className="text-[13px] leading-4.5 text-on-surface-variant">
              MP4, MOV up to 100MB
            </p>
          </div>

          {/* Interactive Link / File Actions */}
          <div className="w-full flex flex-col gap-2 mt-1">
            <div className="flex items-center gap-2 bg-surface-container-low rounded-lg px-4 py-2">
              <span className="material-symbols-outlined text-lg text-on-surface-variant">
                link
              </span>
              <input
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="w-full bg-transparent text-sm leading-5 text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none"
                placeholder="https://youtube.com/watch?v=..."
                type="url"
              />
            </div>

            <div className="flex items-center justify-center">
              <label
                className="cursor-pointer inline-flex items-center gap-1 px-4 py-1 rounded-full bg-surface-container text-primary-dark text-xs leading-4 font-medium hover:bg-surface-container-high transition-colors"
                htmlFor="video-file-input"
              >
                <span className="material-symbols-outlined text-base">
                  attach_file
                </span>
                <span>{fileName}</span>
              </label>
              <input
                accept="video/mp4,video/quicktime"
                className="hidden"
                id="video-file-input"
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setFileName(e.target.files[0].name);
                  } else {
                    setFileName("Choose video file");
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Original Speaker or Source */}
        <div className="flex flex-col gap-1">
          <label
            className="text-sm leading-5 font-semibold text-on-surface"
            htmlFor="speaker-input"
          >
            Original speaker or source
          </label>
          <div className="bg-surface-container-lowest rounded-xl px-4 py-2 shadow-2xs flex items-center gap-2">
            <span className="material-symbols-outlined text-xl text-on-surface-variant">
              person_pin
            </span>
            <input
              id="speaker-input"
              value={speaker}
              onChange={(e) => setSpeaker(e.target.value)}
              className="w-full bg-transparent text-sm leading-5 text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none py-1"
              placeholder="e.g., Sh. Omar Sulaiman, Yaqeen Institute"
              type="text"
            />
          </div>
        </div>

        {/* Topic Dropdown Selector */}
        <div className="flex flex-col gap-1">
          <label
            className="text-sm leading-5 font-semibold text-on-surface"
            htmlFor="topic-select"
          >
            Topic
          </label>
          <div className="relative bg-surface-container-lowest rounded-xl shadow-2xs flex items-center">
            <span className="material-symbols-outlined text-xl text-on-surface-variant absolute left-4 pointer-events-none">
              category
            </span>
            <select
              id="topic-select"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full appearance-none bg-transparent text-sm leading-5 text-on-surface pl-11 pr-10 py-3.5 focus:outline-none cursor-pointer"
            >
              <option disabled value="">
                Select a topic
              </option>
              <option value="quran">Quran &amp; Tafsir</option>
              <option value="salah">Prayer (Salah)</option>
              <option value="seerah">Seerah</option>
              <option value="akhlaq">Character (Akhlaq)</option>
              <option value="duas">Duas &amp; Adhkar</option>
            </select>
            <span className="material-symbols-outlined text-xl text-on-surface-variant absolute right-3.5 pointer-events-none">
              expand_more
            </span>
          </div>
        </div>

        {/* Optional Note Textarea */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label
              className="text-sm leading-5 font-semibold text-on-surface"
              htmlFor="note-textarea"
            >
              Optional note
            </label>
            <span className="text-[11px] leading-3.5 text-on-surface-variant">
              Optional
            </span>
          </div>
          <div className="bg-surface-container-lowest rounded-xl p-4 shadow-2xs">
            <textarea
              id="note-textarea"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full bg-transparent text-sm leading-5 text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none resize-none"
              placeholder="Add context or timestamp..."
              rows={3}
            />
          </div>
        </div>

        {/* Permission Checkbox */}
        <label
          className="flex items-center gap-2 cursor-pointer select-none py-1"
          htmlFor="permission-checkbox"
        >
          <input
            className="sr-only"
            id="permission-checkbox"
            type="checkbox"
            checked={hasPermission}
            onChange={(e) => setHasPermission(e.target.checked)}
          />
          <div
            className={`w-5 h-5 rounded-xs shadow-2xs flex items-center justify-center text-on-primary transition-colors ${
              hasPermission
                ? "bg-primary-container"
                : "bg-surface-container-lowest"
            }`}
          >
            <span
              className={`material-symbols-outlined text-base transition-opacity ${
                hasPermission ? "opacity-100" : "opacity-0"
              }`}
            >
              check
            </span>
          </div>
          <span className="text-sm leading-5 text-on-surface">
            I have permission to share this content
          </span>
        </label>

        {/* Soft-Tint Info Box */}
        <div className="bg-surface-container rounded-xl p-4 flex items-center gap-2 text-on-surface">
          <span className="material-symbols-outlined text-xl text-primary-dark shrink-0">
            schedule
          </span>
          <p className="text-[13px] leading-4.5 text-on-surface-variant">
            Review usually takes 24 to 48 hours.
          </p>
        </div>

        {/* Submit Button */}
        <button
          className="w-full bg-primary-container text-on-primary text-sm leading-5 font-semibold py-3.5 px-6 rounded-full shadow-md hover:bg-primary-dark active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
          type="submit"
        >
          <span>Submit for review</span>
          <span className="material-symbols-outlined text-lg">
            arrow_forward
          </span>
        </button>

        {/* Gentle Confirmation Banner */}
        {showSuccess && (
          <div className="bg-tertiary-fixed text-on-tertiary-fixed rounded-xl p-4 flex items-center gap-2 shadow-2xs">
            <span
              className="material-symbols-outlined text-[22px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
            <div className="flex flex-col">
              <span className="text-sm leading-5 font-semibold">
                JazakAllahu Khayran!
              </span>
              <span className="text-[13px] leading-4.5">
                Your benefit has been received for review.
              </span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
