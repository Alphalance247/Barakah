import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes safely without conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Builds a clean filename carrying the app name and creator name as required by the MVP Download spec.
 */
export function formatBarakahDownloadFilename(
  creatorName: string,
  clipTitle: string
): string {
  const cleanCreator = creatorName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const cleanTitle = clipTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `barakah-${cleanCreator}-${cleanTitle}.mp4`;
}
