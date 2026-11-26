import { MdVerified } from "react-icons/md";

interface VerifiedBadgeProps {
  label?: string;
  size?: number;
}

/**
 * Gold verified badge used on approved creators and sources.
 * Uses Accent Gold (--color-accent: #D4A843 light / #E2BE62 dark).
 */
export function VerifiedBadge({ label, size = 16 }: VerifiedBadgeProps) {
  return (
    <span
      className="inline-flex items-center gap-1 text-accent font-medium"
      title="Verified Islamic source"
    >
      <MdVerified size={size} className="shrink-0" />
      {label ? <span className="text-xs">{label}</span> : null}
    </span>
  );
}
