"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MaterialIcon } from "@/components/common/MaterialIcon";

export interface UploadedMediaItem {
  id: string;
  name: string;
  url: string;
  mediaType: "image" | "video";
  duration?: string;
  sizeLabel: string;
}

const INSPIRE_TAGS = ["#Tafsir", "#MorningAdhkar", "#Patience", "#Dua"];

type UploadStep = "picker" | "details";
type PostFormat = "REEL" | "POST" | "LECTURE URL";

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDurationSeconds(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return "00:00";
  const totalSeconds = Math.round(seconds);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export function SubmitClipForm() {
  const router = useRouter();
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);

  // Step navigation: Step 1 ("picker") -> Step 2 ("details")
  const [step, setStep] = useState<UploadStep>("picker");

  // Real user-uploaded media items from device photo gallery / file picker
  const [mediaItems, setMediaItems] = useState<UploadedMediaItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [multiSelectIds, setMultiSelectIds] = useState<string[]>([]);
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [isSquareRatio, setIsSquareRatio] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [format, setFormat] = useState<PostFormat>("REEL");
  const [lectureUrl, setLectureUrl] = useState("");
  const [pickerError, setPickerError] = useState<string | null>(null);

  // Step 2: Details & Verification state
  const [caption, setCaption] = useState("");
  const [topics, setTopics] = useState<string[]>([
    "Quran Tadabbur",
    "Spiritual Habit",
  ]);
  const [isAddingTopic, setIsAddingTopic] = useState(false);
  const [newTopicInput, setNewTopicInput] = useState("");
  const [scholarName, setScholarName] = useState("Dr. Omar Suleiman");
  const [isEditingScholar, setIsEditingScholar] = useState(false);
  const [quranReference, setQuranReference] = useState("Surah Ad-Duha (93:5)");
  const [isEditingQuranRef, setIsEditingQuranRef] = useState(false);
  const [audioTrack, setAudioTrack] = useState(
    "Gentle Rain & Calm Recitation • Mishary Rashid"
  );
  const [isEditingAudio, setIsEditingAudio] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [isEditingLocation, setIsEditingLocation] = useState(false);

  const [allowTadabbur, setAllowTadabbur] = useState(true);
  const [shareGlobalExplore, setShareGlobalExplore] = useState(true);
  const [aiAudioTranscription, setAiAudioTranscription] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const activeItem =
    mediaItems.find((item) => item.id === selectedId) ?? mediaItems[0] ?? null;

  const processSelectedFiles = (fileList: FileList | File[]) => {
    const files = Array.from(fileList).filter(
      (file) =>
        file.type.startsWith("image/") || file.type.startsWith("video/")
    );

    if (files.length === 0) {
      setPickerError("Please choose an image or video file from your device.");
      return;
    }

    setPickerError(null);

    const newItems: UploadedMediaItem[] = files.map((file) => {
      const isVideo = file.type.startsWith("video/");
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const url = URL.createObjectURL(file);
      const cleanName = file.name.replace(/\.[^/.]+$/, "") || "Uploaded Media";

      if (isVideo) {
        // Probe real video duration asynchronously
        const probeVideo = document.createElement("video");
        probeVideo.preload = "metadata";
        probeVideo.src = url;
        probeVideo.onloadedmetadata = () => {
          const formatted = formatDurationSeconds(probeVideo.duration);
          setMediaItems((prev) =>
            prev.map((m) => (m.id === id ? { ...m, duration: formatted } : m))
          );
        };
      }

      return {
        id,
        name: cleanName,
        url,
        mediaType: isVideo ? "video" : "image",
        duration: isVideo ? "00:00" : undefined,
        sizeLabel: formatBytes(file.size),
      };
    });

    setMediaItems((prev) => [...newItems, ...prev]);
    const firstNewId = newItems[0].id;
    setSelectedId(firstNewId);
    setMultiSelectIds((prev) =>
      isMultiSelect
        ? [...prev, ...newItems.map((item) => item.id)]
        : [firstNewId]
    );

    if (newItems[0].mediaType === "image" && format === "REEL") {
      setFormat("POST");
    } else if (newItems[0].mediaType === "video" && format === "POST") {
      setFormat("REEL");
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processSelectedFiles(e.target.files);
      e.target.value = "";
    }
  };

  const handleSelectGalleryItem = (item: UploadedMediaItem) => {
    setSelectedId(item.id);
    setIsPlaying(false);
    if (isMultiSelect) {
      setMultiSelectIds((prev) =>
        prev.includes(item.id)
          ? prev.length > 1
            ? prev.filter((id) => id !== item.id)
            : prev
          : [...prev, item.id]
      );
    } else {
      setMultiSelectIds([item.id]);
    }
  };

  const handleRemoveItem = (idToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMediaItems((prev) => {
      const itemToRevoke = prev.find((i) => i.id === idToRemove);
      if (itemToRevoke) {
        URL.revokeObjectURL(itemToRevoke.url);
      }
      const remaining = prev.filter((i) => i.id !== idToRemove);
      if (selectedId === idToRemove) {
        setSelectedId(remaining[0]?.id ?? null);
      }
      return remaining;
    });
    setMultiSelectIds((prev) => prev.filter((id) => id !== idToRemove));
  };

  const handleToggleVideoPlay = () => {
    const videoEl = previewVideoRef.current;
    if (!videoEl) return;
    if (videoEl.paused) {
      videoEl.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoEl.pause();
      setIsPlaying(false);
    }
  };

  const handleProceedToDetails = () => {
    if (!activeItem && format !== "LECTURE URL") {
      setPickerError(
        "Please upload at least one photo or video from your gallery first."
      );
      galleryInputRef.current?.click();
      return;
    }
    if (format === "LECTURE URL" && !lectureUrl.trim() && !activeItem) {
      setPickerError("Please enter a lecture URL or upload a media file.");
      return;
    }
    setPickerError(null);
    setStep("details");
  };

  const handleInsertTag = (tag: string) => {
    setCaption((prev) => {
      const trimmed = prev.trim();
      if (trimmed.includes(tag)) return prev;
      return trimmed ? `${trimmed} ${tag}` : tag;
    });
  };

  const handleAddTopic = () => {
    const trimmed = newTopicInput.trim();
    if (trimmed && !topics.includes(trimmed)) {
      setTopics((prev) => [...prev, trimmed]);
    }
    setNewTopicInput("");
    setIsAddingTopic(false);
  };

  const handleShareSubmit = () => {
    setIsSubmitted(true);
  };

  // ============================================================================
  // STEP 1: MEDIA PICKER (Stitch Screen ID: 15e8351e778949c597d674b7d12f6280)
  // ============================================================================
  if (step === "picker") {
    return (
      <div className="bg-surface text-on-surface min-h-screen flex flex-col antialiased selection:bg-primary-dark/10">
        {/* Top Fixed Header */}
        <header className="fixed top-0 inset-x-0 z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
          <div className="h-16 px-4 max-w-120 mx-auto flex items-center justify-between">
            <div className="flex items-center gap-1">
              <button
                aria-label="Cancel or Go Back"
                onClick={() => router.push("/feed")}
                className="min-w-11 h-11 px-1 flex items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                type="button"
              >
                <MaterialIcon name="close" className="text-2xl" />
              </button>
            </div>
            <div className="flex-1 text-center">
              <h1 className="text-lg leading-6 font-semibold text-on-surface tracking-tight truncate px-2">
                Media Picker
              </h1>
            </div>
            <div className="flex items-center justify-end gap-1">
              <button
                onClick={handleProceedToDetails}
                className="min-w-11 h-11 px-4 flex items-center justify-center rounded-full bg-primary-container text-on-primary text-sm leading-5 font-semibold shadow-2xs hover:bg-primary-dark transition-colors cursor-pointer"
                type="button"
              >
                <span>Share</span>
              </button>
              <div className="w-8 h-8 rounded-full bg-primary-dark flex items-center justify-center shrink-0">
                <MaterialIcon name="person" className="text-on-primary text-lg" />
              </div>
            </div>
          </div>
        </header>

        {/* Hidden Native File Picker (Photo Gallery & Files) */}
        <input
          ref={galleryInputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          className="hidden"
          onChange={handleFileInputChange}
        />

        {/* Hidden Camera Capture Input */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*,video/*"
          capture="environment"
          className="hidden"
          onChange={handleFileInputChange}
        />

        {/* Main Content */}
        <main className="flex-1 flex flex-col relative w-full max-w-120 mx-auto pt-16 bg-surface">
          <div className="flex flex-col w-full pb-6 select-none">
            {/* Active Media Preview Stage (or Real Device Upload Dropzone when empty) */}
            <section
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                  processSelectedFiles(e.dataTransfer.files);
                }
              }}
              className={`relative w-full aspect-4/3 bg-surface-container-highest overflow-hidden flex items-center justify-center shadow-inner transition-colors ${
                isDragging ? "ring-2 ring-primary-container bg-primary-fixed/30" : ""
              }`}
            >
              {activeItem ? (
                <div
                  className={`w-full h-full transition-all duration-300 relative flex items-center justify-center bg-on-surface/95 ${
                    isSquareRatio ? "scale-95 rounded-xl overflow-hidden" : ""
                  }`}
                >
                  {activeItem.mediaType === "video" ? (
                    <video
                      ref={previewVideoRef}
                      src={activeItem.url}
                      muted={isMuted}
                      loop
                      playsInline
                      onClick={handleToggleVideoPlay}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      className={`w-full h-full cursor-pointer ${
                        isSquareRatio ? "object-contain" : "object-cover"
                      }`}
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={activeItem.url}
                      alt={activeItem.name}
                      className={`w-full h-full transition-all duration-300 ${
                        isSquareRatio ? "object-contain" : "object-cover"
                      }`}
                    />
                  )}

                  {/* Subtle Ambient Emerald Gradient Scrim */}
                  <div className="absolute inset-0 bg-linear-to-t from-primary-dark/65 via-transparent to-primary-dark/20 pointer-events-none" />

                  {/* Live Media HUD: Top controls */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-auto">
                    {/* Aspect Ratio Toggle */}
                    <button
                      aria-label="Toggle ratio"
                      onClick={() => setIsSquareRatio((prev) => !prev)}
                      className="h-8 px-2.5 rounded-full bg-surface/85 backdrop-blur-md text-on-surface flex items-center gap-1.5 shadow-2xs active:scale-95 transition-transform cursor-pointer"
                      type="button"
                    >
                      <MaterialIcon name="aspect_ratio" className="text-[17px] text-primary-dark" />
                      <span className="text-[11px] leading-3.5 font-semibold tracking-wide">
                        {isSquareRatio ? "1:1" : "9:16"}
                      </span>
                    </button>

                    <div className="flex items-center gap-2">
                      {/* Replace / Add More Files button */}
                      <button
                        aria-label="Upload more from gallery"
                        onClick={() => galleryInputRef.current?.click()}
                        className="h-8 px-2.5 rounded-full bg-surface/85 backdrop-blur-md text-primary-dark flex items-center gap-1 shadow-2xs active:scale-95 transition-transform cursor-pointer"
                        type="button"
                      >
                        <MaterialIcon name="add_photo_alternate" className="text-base" />
                        <span className="text-[11px] leading-3.5 font-semibold">
                          Add
                        </span>
                      </button>

                      {activeItem.mediaType === "video" && (
                        <>
                          {/* Audio State Indicator */}
                          <button
                            aria-label="Mute preview"
                            onClick={() => setIsMuted((prev) => !prev)}
                            className="w-8 h-8 rounded-full bg-surface/85 backdrop-blur-md text-on-surface flex items-center justify-center shadow-2xs active:scale-95 transition-transform cursor-pointer"
                            type="button"
                          >
                            <MaterialIcon name={isMuted ? "volume_off" : "volume_up"} className="text-lg text-primary-dark" />
                          </button>

                          {/* Play / Pause Preview Indicator */}
                          <button
                            aria-label="Play or pause preview"
                            onClick={handleToggleVideoPlay}
                            className="w-8 h-8 rounded-full bg-surface/85 backdrop-blur-md text-on-surface flex items-center justify-center shadow-2xs cursor-pointer"
                            type="button"
                          >
                            <MaterialIcon name={isPlaying ? "pause" : "play_arrow"} className="text-lg text-primary-dark"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                             />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Media Info / Duration Overlay */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-2xs max-w-[85%]">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse shrink-0" />
                    <span className="text-[11px] leading-3.5 text-on-surface font-medium truncate">
                      {activeItem.mediaType === "video"
                        ? `${activeItem.duration ?? "00:00"} • ${activeItem.name}`
                        : `Photo (${activeItem.sizeLabel}) • ${activeItem.name}`}
                    </span>
                  </div>

                  {/* Center Play Overlay for Video when paused */}
                  {activeItem.mediaType === "video" && !isPlaying && (
                    <button
                      aria-label="Play video"
                      onClick={handleToggleVideoPlay}
                      className="w-14 h-14 rounded-full bg-surface-container-lowest/85 backdrop-blur-xs flex items-center justify-center shadow-lg opacity-90 hover:scale-105 transition-transform cursor-pointer"
                      type="button"
                    >
                      <MaterialIcon name="play_arrow" className="text-primary-dark text-[32px] ml-0.5"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                       />
                    </button>
                  )}
                </div>
              ) : (
                /* Empty Stage -> Direct Interactive Device Photo/Video Upload Dropzone */
                <div
                  onClick={() => galleryInputRef.current?.click()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      galleryInputRef.current?.click();
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className="w-full h-full flex flex-col items-center justify-center p-6 text-center gap-3 cursor-pointer hover:bg-surface-container-high/70 transition-colors relative"
                >
                  <div className="w-16 h-16 rounded-full bg-surface-container-lowest shadow-sm flex items-center justify-center text-primary-container">
                    <MaterialIcon name="add_photo_alternate" className="text-[32px]" />
                  </div>
                  <div className="flex flex-col gap-1 max-w-72">
                    <h2 className="text-base leading-6 font-semibold text-on-surface">
                      Upload from your Photo Gallery
                    </h2>
                    <p className="text-xs leading-4.5 text-on-surface-variant">
                      Tap here or drag &amp; drop pictures or video clips
                      (JPG, PNG, WEBP, MP4, MOV) directly from your device.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-4 py-2 rounded-full bg-primary-container text-on-primary text-xs leading-4 font-semibold shadow-2xs flex items-center gap-1.5">
                      <MaterialIcon name="photo_library" className="text-base" />
                      Choose Photos or Videos
                    </span>
                  </div>
                </div>
              )}
            </section>

            {/* Optional validation feedback banner */}
            {pickerError && (
              <div className="mx-4 mt-2 px-3 py-2 rounded-lg bg-error-container text-on-error-container text-xs leading-4 font-medium flex items-center justify-between">
                <span>{pickerError}</span>
                <button
                  onClick={() => setPickerError(null)}
                  className="text-base cursor-pointer flex items-center justify-center"
                  type="button"
                >
                  <MaterialIcon name="close" className="text-base" />
                </button>
              </div>
            )}

            {/* Lecture URL input when LECTURE URL tab is selected */}
            {format === "LECTURE URL" && (
              <div className="mx-4 mt-3 bg-surface-container-lowest rounded-xl p-3 shadow-2xs flex items-center gap-2.5">
                <MaterialIcon name="link" className="text-xl text-primary-dark" />
                <input
                  type="url"
                  value={lectureUrl}
                  onChange={(e) => setLectureUrl(e.target.value)}
                  placeholder="Paste verified YouTube or lecture link..."
                  className="w-full bg-transparent text-sm leading-5 text-on-surface placeholder:text-outline/60 focus:outline-none"
                />
              </div>
            )}

            {/* Album & Media Selection Control Bar */}
            <section className="sticky top-16 z-30 bg-surface/95 backdrop-blur-md px-4 py-2.5 flex items-center justify-between shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              {/* Album / Device File Picker Trigger Button */}
              <button
                onClick={() => galleryInputRef.current?.click()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high transition-colors active:scale-98 cursor-pointer"
                type="button"
              >
                <MaterialIcon name="folder_open" className="text-lg text-primary-dark" />
                <span className="text-sm leading-5 text-on-surface font-semibold tracking-tight">
                  Device Gallery ({mediaItems.length})
                </span>
                <MaterialIcon name="expand_more" className="text-lg text-on-surface-variant" />
              </button>

              {/* Multi-select & Camera Quick Action */}
              <div className="flex items-center gap-2">
                {/* Select Multiple Carousel Button */}
                <button
                  onClick={() => setIsMultiSelect((prev) => !prev)}
                  className={`h-9 px-3 rounded-full flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer ${
                    isMultiSelect
                      ? "bg-primary-container text-on-primary"
                      : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface"
                  }`}
                  type="button"
                >
                  <MaterialIcon name="filter_none" className="text-lg" />
                  <span className="text-[11px] leading-3.5 font-medium">
                    Select multiple
                  </span>
                </button>

                {/* Instant Camera Shutter Icon Button */}
                <button
                  aria-label="Open Camera"
                  onClick={() => cameraInputRef.current?.click()}
                  className="w-9 h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-2xs active:scale-95 transition-transform cursor-pointer"
                  type="button"
                >
                  <MaterialIcon name="photo_camera" className="text-[19px]" />
                </button>
              </div>
            </section>

            {/* Native Media Gallery Grid (4 columns) — Real Uploaded Files + Add Tile */}
            <section className="w-full px-1 py-1">
              <div className="grid grid-cols-4 gap-1">
                {/* Tile 0: Always-available "+ Upload from Gallery" tile */}
                <button
                  onClick={() => galleryInputRef.current?.click()}
                  className="aspect-square bg-surface-container hover:bg-surface-container-high text-primary-dark rounded-xs flex flex-col items-center justify-center gap-1 p-2 transition-colors cursor-pointer border border-dashed border-primary-dark/30"
                  type="button"
                >
                  <MaterialIcon name="add_photo_alternate" className="text-2xl" />
                  <span className="text-[11px] leading-3.5 font-semibold text-center">
                    Add Media
                  </span>
                </button>

                {/* User's Real Uploaded Pictures & Videos */}
                {mediaItems.map((item) => {
                  const isSelected = isMultiSelect
                    ? multiSelectIds.includes(item.id)
                    : activeItem?.id === item.id;

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectGalleryItem(item)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleSelectGalleryItem(item);
                        }
                      }}
                      className={`group relative aspect-square bg-surface-container-high overflow-hidden cursor-pointer rounded-xs ${
                        isSelected
                          ? "shadow-2xs ring-2 ring-primary-container"
                          : ""
                      }`}
                      role="button"
                      tabIndex={0}
                    >
                      {item.mediaType === "video" ? (
                        <video
                          src={item.url}
                          muted
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200 pointer-events-none"
                        />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.url}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      )}

                      {/* Remove item button (top-left) */}
                      <button
                        aria-label={`Remove ${item.name}`}
                        onClick={(e) => handleRemoveItem(item.id, e)}
                        className="absolute top-1 left-1 w-5 h-5 rounded-full bg-on-surface/65 text-on-primary flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity cursor-pointer"
                        type="button"
                      >
                        <MaterialIcon name="close" className="text-xs" />
                      </button>

                      {/* Active Checkmark Indicator Badge */}
                      {isSelected ? (
                        <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-2xs overflow-hidden">
                          <MaterialIcon name="check" className="text-xs leading-none font-bold" />
                        </div>
                      ) : (
                        item.mediaType === "image" && (
                          <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-on-surface/40 flex items-center justify-center text-on-primary">
                            <MaterialIcon name="image" className="text-[11px]" />
                          </span>
                        )
                      )}

                      {/* Duration or Photo Badge */}
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-xs bg-on-surface/75 text-on-primary text-[10px] leading-tight font-medium">
                        {item.mediaType === "video"
                          ? (item.duration ?? "00:00")
                          : "Photo"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Format Selector Bottom Fixed Strip (Barakah post modality) */}
            <section className="mt-4 px-4">
              <div className="w-full bg-surface-container-low p-1.5 rounded-full flex items-center justify-between shadow-2xs">
                {(["REEL", "POST", "LECTURE URL"] as PostFormat[]).map(
                  (tab) => {
                    const active = format === tab;
                    return (
                      <button
                        key={tab}
                        onClick={() => setFormat(tab)}
                        className={`flex-1 py-2 rounded-full text-sm leading-5 font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          active
                            ? "bg-surface-container-lowest text-primary-dark shadow-2xs"
                            : "text-on-surface-variant hover:text-on-surface"
                        }`}
                        type="button"
                      >
                        {active && (
                          <span className="w-2 h-2 rounded-full bg-secondary-container" />
                        )}
                        <span className="tracking-wide">{tab}</span>
                      </button>
                    );
                  }
                )}
              </div>

              {/* Calming Guidance Subtext */}
              <p className="text-center text-[13px] leading-4.5 text-on-surface-variant mt-2 mb-1">
                Share knowledge with sincerity and adab (proper manner).
              </p>
            </section>
          </div>
        </main>
      </div>
    );
  }

  // ============================================================================
  // STEP 2: DETAILS & VERIFICATION (Stitch Screen ID: 37b9a7f2aca047798db40c903ad76d74)
  // ============================================================================
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col antialiased selection:bg-primary-dark/10">
      {/* Top Fixed Header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="h-16 px-4 max-w-120 mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              aria-label="Cancel or Go Back"
              onClick={() => setStep("picker")}
              className="min-w-11 h-11 px-1 flex items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              type="button"
            >
              <MaterialIcon name="close" className="text-2xl" />
            </button>
          </div>
          <div className="flex-1 text-center">
            <h1 className="text-lg leading-6 font-semibold text-on-surface tracking-tight truncate px-2">
              New Post Details
            </h1>
          </div>
          <div className="flex items-center justify-end gap-1">
            <button
              onClick={handleShareSubmit}
              className="min-w-11 h-11 px-4 flex items-center justify-center rounded-full bg-primary-container text-on-primary text-sm leading-5 font-semibold shadow-2xs hover:bg-primary-dark transition-colors cursor-pointer"
              type="button"
            >
              <span>Share</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-primary-dark flex items-center justify-center shrink-0">
              <MaterialIcon name="person" className="text-on-primary text-lg" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative w-full max-w-120 mx-auto pt-16 bg-surface">
        <div className="flex flex-col w-full pb-10">
          {/* Content Container with serene Islamic aesthetic & spacing */}
          <div className="flex flex-col px-5 gap-6">
            {/* Top Media Preview & Reflection Caption Card */}
            <div className="bg-surface-container-lowest rounded-xl p-4 shadow-[0_4px_20px_-2px_rgba(27,42,38,0.04)] flex flex-col gap-4">
              <div className="flex gap-4 items-start">
                {/* Real Uploaded Picture or Video Thumbnail Card with badge */}
                <div className="relative w-24 h-32 rounded-lg overflow-hidden shrink-0 bg-surface-container-high shadow-2xs flex items-center justify-center">
                  {activeItem ? (
                    activeItem.mediaType === "video" ? (
                      <video
                        src={activeItem.url}
                        muted
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        alt={activeItem.name}
                        className="w-full h-full object-cover"
                        src={activeItem.url}
                      />
                    )
                  ) : (
                    <div className="flex flex-col items-center justify-center text-primary-dark p-2 text-center">
                      <MaterialIcon name="link" className="text-2xl" />
                      <span className="text-[10px] leading-3.5 font-medium mt-1">
                        Lecture URL
                      </span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-linear-to-t from-primary-dark/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center gap-1 shadow-2xs">
                    <MaterialIcon name={activeItem?.mediaType === "image"
                        ? "image"
                        : "play_arrow"} className="text-[13px] text-primary-dark"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                     />
                    <span className="text-[10px] leading-3.5 text-primary-dark font-semibold tracking-tight">
                      {activeItem
                        ? activeItem.mediaType === "video"
                          ? (activeItem.duration ?? "00:00")
                          : "Photo"
                        : "Link"}
                    </span>
                  </div>
                  <button
                    aria-label="Edit selected media"
                    onClick={() => setStep("picker")}
                    className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-on-surface-variant hover:text-primary-dark transition-colors cursor-pointer"
                    type="button"
                  >
                    <MaterialIcon name="edit" className="text-sm" />
                  </button>
                </div>

                {/* Reflection Caption Area */}
                <div className="flex-1 min-w-0 flex flex-col">
                  <textarea
                    value={caption}
                    onChange={(e) => setCaption(e.target.value.slice(0, 1000))}
                    className="w-full bg-transparent resize-none border-0 p-0 text-on-surface placeholder:text-outline/60 text-sm leading-relaxed focus:outline-none focus:ring-0"
                    placeholder="Write a reflection or caption... (ayah, context, or reminder of barakah)"
                    rows={4}
                  />
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] leading-3.5 font-medium text-outline">
                      {caption.length}/1000
                    </span>
                    <button
                      aria-label="Add emoji"
                      onClick={() =>
                        setCaption((prev) => `${prev} 🤲`.slice(0, 1000))
                      }
                      className="p-1 rounded-full text-on-surface-variant hover:text-primary-dark transition-colors cursor-pointer"
                      type="button"
                    >
                      <MaterialIcon name="sentiment_satisfied" className="text-xl" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Helpful Prompt Chips */}
              <div className="flex items-center gap-1 overflow-x-auto py-0.5">
                <span className="text-[11px] leading-3.5 font-medium text-outline shrink-0 mr-1 flex items-center gap-1">
                  <MaterialIcon name="auto_awesome" className="text-[15px] text-secondary" />
                  Inspire:
                </span>
                {INSPIRE_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleInsertTag(tag)}
                    className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors text-[11px] leading-3.5 font-medium shrink-0 cursor-pointer"
                    type="button"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Automated Verification Callout */}
            <div className="bg-surface-container-low rounded-xl p-4 shadow-2xs flex gap-4 items-start">
              <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 text-primary-dark">
                <MaterialIcon name="verified_user" className="text-xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                 />
              </div>
              <div className="flex-1 flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm leading-5 font-semibold text-primary-dark">
                    Automated Sacred Verification
                  </h2>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary-dark/10 text-primary-dark text-[10px] leading-3.5 font-medium">
                    ~2 mins
                  </span>
                </div>
                <p className="text-[13px] leading-normal text-on-surface-variant">
                  Our mindful AI checks clips for authentic sacred text
                  citations, sound audio ethics, and scholarly respect before
                  circulating widely on Explore.
                </p>
              </div>
            </div>

            {/* Sacred Attributes & Metadata Stack */}
            <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_-2px_rgba(27,42,38,0.04)] overflow-hidden">
              {/* Section Header */}
              <div className="px-4 pt-4 pb-1">
                <span className="text-[11px] leading-3.5 font-medium text-outline uppercase tracking-wider">
                  Islamic Context &amp; References
                </span>
              </div>

              {/* Item 1: Topic & Category */}
              <div className="flex items-center justify-between px-4 py-3.5 hover:bg-surface-container-low/50 transition-colors group">
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary-dark shrink-0">
                    <MaterialIcon name="category" className="text-xl" />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-xs leading-4 font-medium text-on-surface truncate">
                      Topic &amp; Category
                    </span>
                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                      {topics.map((t, idx) => (
                        <button
                          key={t}
                          onClick={() =>
                            setTopics((prev) =>
                              prev.length > 1
                                ? prev.filter((item) => item !== t)
                                : prev
                            )
                          }
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] leading-3.5 font-medium cursor-pointer ${
                            idx === 0
                              ? "bg-primary-fixed/40 text-primary-dark"
                              : "bg-surface-container text-on-surface-variant"
                          }`}
                          type="button"
                        >
                          {t}
                        </button>
                      ))}
                      {isAddingTopic ? (
                        <div className="inline-flex items-center gap-1">
                          <input
                            type="text"
                            value={newTopicInput}
                            onChange={(e) => setNewTopicInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddTopic();
                              }
                            }}
                            placeholder="New topic..."
                            className="px-2 py-0.5 rounded-full bg-surface-container text-xs leading-4 text-on-surface focus:outline-none w-28"
                            autoFocus
                          />
                          <button
                            onClick={handleAddTopic}
                            className="text-xs leading-4 font-semibold text-primary-dark cursor-pointer"
                            type="button"
                          >
                            Add
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setIsAddingTopic(true)}
                          className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container text-primary-dark text-[11px] leading-3.5 font-medium cursor-pointer"
                          type="button"
                        >
                          + Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <MaterialIcon name="chevron_right" className="text-outline group-hover:text-primary-dark transition-colors text-xl" />
              </div>

              {/* Item 2: Tag Scholar or Speaker */}
              <div
                onClick={() => setIsEditingScholar(true)}
                className="flex items-center justify-between px-4 py-3.5 hover:bg-surface-container-low/50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary-dark shrink-0">
                    <MaterialIcon name="account_circle" className="text-xl" />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-xs leading-4 font-medium text-on-surface truncate">
                      Tag Scholar or Speaker
                    </span>
                    {isEditingScholar ? (
                      <input
                        type="text"
                        value={scholarName}
                        onChange={(e) => setScholarName(e.target.value)}
                        onBlur={() => setIsEditingScholar(false)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") setIsEditingScholar(false);
                        }}
                        className="mt-0.5 bg-surface-container px-2 py-0.5 rounded-xs text-[13px] leading-4.5 text-on-surface focus:outline-none"
                        autoFocus
                      />
                    ) : (
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[13px] leading-4.5 text-on-surface font-medium truncate">
                          {scholarName}
                        </span>
                        <MaterialIcon name="stars" className="text-[15px] text-secondary shrink-0"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                         />
                      </div>
                    )}
                  </div>
                </div>
                <MaterialIcon name="chevron_right" className="text-outline group-hover:text-primary-dark transition-colors text-xl" />
              </div>

              {/* Item 3: Attach Quran Reference */}
              <div
                onClick={() => setIsEditingQuranRef(true)}
                className="flex items-center justify-between px-4 py-3.5 hover:bg-surface-container-low/50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div className="w-8 h-8 rounded-full bg-secondary-fixed/50 flex items-center justify-center text-secondary shrink-0">
                    <MaterialIcon name="menu_book" className="text-xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                     />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-xs leading-4 font-medium text-on-surface truncate">
                      Verified Quran Reference
                    </span>
                    {isEditingQuranRef ? (
                      <input
                        type="text"
                        value={quranReference}
                        onChange={(e) => setQuranReference(e.target.value)}
                        onBlur={() => setIsEditingQuranRef(false)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") setIsEditingQuranRef(false);
                        }}
                        className="mt-0.5 bg-surface-container px-2 py-0.5 rounded-xs text-[13px] leading-4.5 text-on-surface focus:outline-none"
                        autoFocus
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[13px] leading-4.5 text-primary-dark font-medium">
                          {quranReference}
                        </span>
                        <span className="text-[11px] leading-3.5 font-medium px-1.5 py-0.5 rounded-xs bg-surface-container text-on-surface-variant">
                          Ayah Link Attached
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <MaterialIcon name="chevron_right" className="text-outline group-hover:text-primary-dark transition-colors text-xl" />
              </div>

              {/* Item 4: Halal Audio / Recitation Track */}
              <div
                onClick={() => setIsEditingAudio(true)}
                className="flex items-center justify-between px-4 py-3.5 hover:bg-surface-container-low/50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary-dark shrink-0">
                    <MaterialIcon name="graphic_eq" className="text-xl" />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-xs leading-4 font-medium text-on-surface truncate">
                      Recitation or Audio Track
                    </span>
                    {isEditingAudio ? (
                      <input
                        type="text"
                        value={audioTrack}
                        onChange={(e) => setAudioTrack(e.target.value)}
                        onBlur={() => setIsEditingAudio(false)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") setIsEditingAudio(false);
                        }}
                        className="mt-0.5 bg-surface-container px-2 py-0.5 rounded-xs text-[13px] leading-4.5 text-on-surface focus:outline-none"
                        autoFocus
                      />
                    ) : (
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <MaterialIcon name="music_note" className="text-sm text-primary-dark" />
                        <span className="text-[13px] leading-4.5 text-on-surface-variant truncate">
                          {audioTrack}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <MaterialIcon name="chevron_right" className="text-outline group-hover:text-primary-dark transition-colors text-xl" />
              </div>

              {/* Item 5: Location / Sanctuary (Optional) */}
              <div
                onClick={() => setIsEditingLocation(true)}
                className="flex items-center justify-between px-4 py-3.5 hover:bg-surface-container-low/50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary-dark shrink-0">
                    <MaterialIcon name="location_on" className="text-xl" />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-xs leading-4 font-medium text-on-surface truncate">
                      Location / Gathering
                    </span>
                    {isEditingLocation ? (
                      <input
                        type="text"
                        value={locationName}
                        onChange={(e) => setLocationName(e.target.value)}
                        onBlur={() => setIsEditingLocation(false)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") setIsEditingLocation(false);
                        }}
                        placeholder="Add Masjid, study circle, or city"
                        className="mt-0.5 bg-surface-container px-2 py-0.5 rounded-xs text-[13px] leading-4.5 text-on-surface focus:outline-none"
                        autoFocus
                      />
                    ) : (
                      <span className="text-[13px] leading-4.5 text-outline truncate mt-0.5">
                        {locationName || "Add Masjid, study circle, or city"}
                      </span>
                    )}
                  </div>
                </div>
                <MaterialIcon name="chevron_right" className="text-outline group-hover:text-primary-dark transition-colors text-xl" />
              </div>
            </div>

            {/* Audience & Reflection Settings */}
            <div className="bg-surface-container-lowest rounded-xl p-4 shadow-[0_4px_20px_-2px_rgba(27,42,38,0.04)] flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] leading-3.5 font-medium text-outline uppercase tracking-wider">
                  Mindful Feed Preferences
                </span>
              </div>

              {/* Community Discussion Toggle */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary-dark shrink-0">
                    <MaterialIcon name="forum" className="text-[19px]" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs leading-4 font-medium text-on-surface">
                      Allow Community Tadabbur
                    </span>
                    <span className="text-[13px] leading-4.5 text-on-surface-variant">
                      Invites brotherly &amp; sisterly reflections
                    </span>
                  </div>
                </div>
                <button
                  aria-checked={allowTadabbur}
                  onClick={() => setAllowTadabbur((prev) => !prev)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out shrink-0 ${
                    allowTadabbur ? "bg-primary-dark" : "bg-outline-variant"
                  }`}
                  role="switch"
                  type="button"
                >
                  <span
                    className={`w-4 h-4 bg-on-primary rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                      allowTadabbur ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Share to Public Explore Feed Toggle */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary-dark shrink-0">
                    <MaterialIcon name="explore" className="text-[19px]" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs leading-4 font-medium text-on-surface">
                      Share to Global Explore
                    </span>
                    <span className="text-[13px] leading-4.5 text-on-surface-variant">
                      Clip will circulate to mindful seekers
                    </span>
                  </div>
                </div>
                <button
                  aria-checked={shareGlobalExplore}
                  onClick={() => setShareGlobalExplore((prev) => !prev)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out shrink-0 ${
                    shareGlobalExplore
                      ? "bg-primary-dark"
                      : "bg-outline-variant"
                  }`}
                  role="switch"
                  type="button"
                >
                  <span
                    className={`w-4 h-4 bg-on-primary rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                      shareGlobalExplore ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Scholarly Attribution AI Note */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-secondary shrink-0">
                    <MaterialIcon name="auto_stories" className="text-[19px]" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs leading-4 font-medium text-on-surface">
                      AI Audio Transcription
                    </span>
                    <span className="text-[13px] leading-4.5 text-on-surface-variant">
                      Generates verified English &amp; Arabic subtitles
                    </span>
                  </div>
                </div>
                <button
                  aria-checked={aiAudioTranscription}
                  onClick={() => setAiAudioTranscription((prev) => !prev)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out shrink-0 ${
                    aiAudioTranscription
                      ? "bg-primary-dark"
                      : "bg-outline-variant"
                  }`}
                  role="switch"
                  type="button"
                >
                  <span
                    className={`w-4 h-4 bg-on-primary rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                      aiAudioTranscription ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Final Submission & Intention Anchor */}
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={handleShareSubmit}
                className="w-full h-13 py-3 px-6 rounded-full bg-primary-dark text-on-primary text-sm leading-5 font-semibold shadow-md hover:bg-primary-container active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                type="button"
              >
                <MaterialIcon name="send" className="text-xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                 />
                <span>Share to Barakah</span>
              </button>
              <div className="flex items-center justify-center gap-1.5 text-center text-outline">
                <MaterialIcon name="lock" className="text-sm" />
                <span className="text-[11px] leading-3.5 font-medium">
                  Protected by Barakah Sacred Content Trust Protocol
                </span>
              </div>
            </div>

            {/* Gentle Confirmation Banner after clicking Share */}
            {isSubmitted && (
              <div className="bg-tertiary-fixed text-on-tertiary-fixed rounded-xl p-4 flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <MaterialIcon name="check_circle" className="text-[22px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                   />
                  <div className="flex flex-col">
                    <span className="text-sm leading-5 font-semibold">
                      JazakAllahu Khayran!
                    </span>
                    <span className="text-[13px] leading-4.5">
                      Your reflection is undergoing Automated Sacred
                      Verification (~2 mins).
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => router.push("/feed")}
                  className="px-3 py-1.5 rounded-full bg-primary-dark text-on-primary text-xs leading-4 font-semibold shrink-0 cursor-pointer"
                  type="button"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
