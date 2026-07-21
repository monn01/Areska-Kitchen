import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import type { OrderStatus } from "@prisma/client";

const STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: "Menunggu",
  CONFIRMED: "Dikonfirmasi",
  PROCESSING: "Diproses",
  COMPLETED: "Selesai",
  CANCELLED: "Dibatalkan",
};

const STATUS_STYLES: Record<OrderStatus, string> = {
  PENDING: "bg-orange-100 text-orange-700",
  CONFIRMED: "bg-green-50 text-green-600",
  PROCESSING: "bg-green-50 text-green-600",
  COMPLETED: "bg-green-100 text-green-700",
  CANCELLED: "bg-slate-100 text-slate-500",
};

const FILTERS: { value: OrderStatus | "ALL"; label: string }[] = [
  { value: "ALL", label: "Semua" },
  { value: "PENDING", label: "Menunggu" },
  { value: "CONFIRMED", label: "Dikonfirmasi" },
  { value: "PROCESSING", label: "Diproses" },
  { value: "COMPLETED", label: "Selesai" },
  { value: "CANCELLED", label: "Dibatalkan" },
];

export default async function OrdersAdminPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const statusFilter = searchParams.status as OrderStatus | undefined;

  const orders = await prisma.order.findMany({
    where: statusFilter ? { status: statusFilter } : undefined,
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-green-700">Order Masuk</h1>

      <div className="mt-4 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Link
            key={f.value}
            href={f.value === "ALL" ? "/admin/orders" : `/admin/orders?status=${f.value}`}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium",
              (f.value === "ALL" && !statusFilter) || statusFilter === f.value
                ? "bg-green-600 text-cream-50"
                : "bg-cream-50 text-green-700/70 hover:bg-green-50",
            )}
          >
            {f.label}
          </Link>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl bg-cream-50 shadow-[0_2px_12px_rgba(31,77,58,0.08)]">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-green-100 text-green-700/60">
              <th className="px-5 py-3 font-medium">Pelanggan</th>
              <th className="px-5 py-3 font-medium">Tipe</th>
              <th className="px-5 py-3 font-medium">Total</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Tanggal</th>
              <th className="px-5 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-green-50 last:border-0">
                <td className="px-5 py-3">
                  <p className="font-medium text-green-700">{o.customerName}</p>
                  <p className="text-xs text-green-700/60">{o.customerPhone}</p>
                </td>
                <td className="px-5 py-3 text-green-700/70">
                  {o.isCustomEvent ? "Event/Prasmanan" : "Retail"}
                </td>
                <td className="px-5 py-3 text-green-700/70">
                  Rp {o.totalAmount.toLocaleString("id-ID")}
                </td>
                <td className="px-5 py-3">
                  <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", STATUS_STYLES[o.status])}>
                    {STATUS_LABELS[o.status]}
                  </span>
                </td>
                <td className="px-5 py-3 text-green-700/60">
                  {new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(o.createdAt)}
                </td>
                <td className="px-5 py-3 text-right">
                  <Link
                    href={`/admin/orders/${o.id}`}
                    className="text-sm font-medium text-green-600 hover:underline"
                  >
                    Detail
                  </Link>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-green-700/60">
                  Belum ada order masuk. Sistem checkout menyusul di Fase 2 Phase 5.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
