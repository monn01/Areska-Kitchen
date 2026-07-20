import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type StatusVariant = "profit" | "loss" | "pending" | "neutral";

const statusClasses: Record<StatusVariant, string> = {
  profit: "bg-green-50 text-green-600",
  loss: "bg-[#F7E4DF] text-status-loss",
  pending: "bg-orange-50 text-orange-600",
  neutral: "bg-slate-100 text-slate-700",
};

export function FeatureBadge({
  icon: Icon,
  label,
  className,
}: {
  icon: LucideIcon;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-green-200 bg-cream-50 px-4 py-2 text-sm font-medium text-green-700",
        className,
      )}
    >
      <Icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
      <span>{label}</span>
    </div>
  );
}

export function StatusBadge({
  status,
  children,
  className,
}: {
  status: StatusVariant;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        statusClasses[status],
        className,
      )}
    >
      {children}
    </span>
  );
}
