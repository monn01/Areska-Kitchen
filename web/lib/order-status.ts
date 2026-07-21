import type { OrderStatus } from "@prisma/client";

export const STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: "Menunggu",
  CONFIRMED: "Dikonfirmasi",
  PROCESSING: "Diproses",
  COMPLETED: "Selesai",
  CANCELLED: "Dibatalkan",
};

export const STATUS_STYLES: Record<OrderStatus, string> = {
  PENDING: "bg-orange-100 text-orange-700",
  CONFIRMED: "bg-green-50 text-green-600",
  PROCESSING: "bg-green-50 text-green-600",
  COMPLETED: "bg-green-100 text-green-700",
  CANCELLED: "bg-slate-100 text-slate-500",
};
