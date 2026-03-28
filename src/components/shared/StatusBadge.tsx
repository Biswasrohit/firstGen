import { cn } from "@/lib/utils";

const statusConfig = {
  completed: { label: "Completed", bg: "bg-savings-good/10", text: "text-savings-good" },
  in_progress: { label: "In Progress", bg: "bg-primary/10", text: "text-primary" },
  up_next: { label: "Up Next", bg: "bg-ochre/10", text: "text-ochre" },
  locked: { label: "Locked", bg: "bg-surface-container-high", text: "text-on-surface-variant" },
};

interface StatusBadgeProps {
  status: keyof typeof statusConfig;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        config.bg,
        config.text,
        className
      )}
    >
      {config.label}
    </span>
  );
}
