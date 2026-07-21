import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
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

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: { items: { include: { product: true } }, transaction: true },
  });
  if (!order) notFound();

  return (
    <div>
      <Link
        href="/admin/orders"
        className="inline-flex items-center gap-1 text-sm font-medium text-green-600 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={2} />
        Kembali ke Order
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold text-green-700">
          Order #{order.id.slice(-8)}
        </h1>
        <span className={cn("rounded-full px-3 py-1 text-sm font-medium", STATUS_STYLES[order.status])}>
          {STATUS_LABELS[order.status]}
        </span>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-cream-50 p-6 shadow-[0_2px_12px_rgba(31,77,58,0.08)]">
          <h2 className="font-semibold text-green-700">Info Pelanggan</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-green-700/60">Nama</dt>
              <dd className="text-green-700">{order.customerName}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-green-700/60">WhatsApp</dt>
              <dd className="text-green-700">{order.customerPhone}</dd>
            </div>
            {order.deliveryAddress && (
              <div className="flex justify-between gap-4">
                <dt className="text-green-700/60">Alamat</dt>
                <dd className="text-right text-green-700">{order.deliveryAddress}</dd>
              </div>
            )}
            {order.eventDate && (
              <div className="flex justify-between gap-4">
                <dt className="text-green-700/60">Tanggal Acara</dt>
                <dd className="text-green-700">
                  {new Intl.DateTimeFormat("id-ID", { dateStyle: "full" }).format(order.eventDate)}
                </dd>
              </div>
            )}
            <div className="flex justify-between gap-4">
              <dt className="text-green-700/60">Tipe Order</dt>
              <dd className="text-green-700">
                {order.isCustomEvent ? "Event / Prasmanan (butuh konfirmasi manual)" : "Retail"}
              </dd>
            </div>
            {order.notes && (
              <div>
                <dt className="text-green-700/60">Catatan</dt>
                <dd className="mt-1 text-green-700">{order.notes}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="rounded-2xl bg-cream-50 p-6 shadow-[0_2px_12px_rgba(31,77,58,0.08)]">
          <h2 className="font-semibold text-green-700">Pembayaran</h2>
          {order.transaction ? (
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-green-700/60">Metode</dt>
                <dd className="text-green-700">{order.transaction.paymentMethod ?? "-"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-green-700/60">Status Midtrans</dt>
                <dd className="text-green-700">{order.transaction.midtransStatus ?? "-"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-green-700/60">Dibayar</dt>
                <dd className="text-green-700">
                  {order.transaction.paidAt
                    ? new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" }).format(
                        order.transaction.paidAt,
                      )
                    : "Belum dibayar"}
                </dd>
              </div>
            </dl>
          ) : (
            <p className="mt-3 text-sm text-green-700/60">
              Belum ada transaksi — integrasi Midtrans menyusul di Fase 2 Phase 6.
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-cream-50 p-6 shadow-[0_2px_12px_rgba(31,77,58,0.08)]">
        <h2 className="font-semibold text-green-700">Item Pesanan</h2>
        <div className="mt-3 divide-y divide-green-50">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-3 text-sm">
              <div>
                <p className="font-medium text-green-700">{item.product.name}</p>
                <p className="text-green-700/60">
                  {item.quantity} x Rp {item.priceEach.toLocaleString("id-ID")}
                </p>
              </div>
              <p className="font-medium text-green-700">
                Rp {(item.quantity * item.priceEach).toLocaleString("id-ID")}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-between border-t border-green-100 pt-3 text-sm font-semibold text-green-700">
          <span>Total</span>
          <span>Rp {order.totalAmount.toLocaleString("id-ID")}</span>
        </div>
      </div>
    </div>
  );
}
