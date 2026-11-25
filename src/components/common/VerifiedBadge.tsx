import { CheckCircle2 } from "lucide-react";

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
      <CheckCircle2 size={size} className="shrink-0 fill-accent/20" />
      {label ? <span className="text-xs">{label}</span> : null}
    </span>
  );
}
