import { MdCheck } from "react-icons/md";

interface TopicChipProps {
  name: string;
  selected?: boolean;
  onClick?: () => void;
}

/**
 * Rounded 24px topic chip. Selected chips use soft-tint background with emerald border and check icon.
 */
export function TopicChip({ name, selected = false, onClick }: TopicChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-10 items-center gap-1.5 rounded-3xl px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer ${
        selected
          ? "bg-soft-tint border border-primary text-primary"
          : "bg-surface border border-soft-tint text-foreground hover:bg-soft-tint/60"
      }`}
    >
      {selected ? <MdCheck size={16} className="shrink-0" /> : null}
      <span>{name}</span>
    </button>
  );
}
