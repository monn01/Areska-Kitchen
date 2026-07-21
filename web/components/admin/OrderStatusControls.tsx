"use client";

import { useState, useTransition } from "react";
import { updateOrderStatus } from "@/lib/actions/orders";
import { initiatePayment } from "@/lib/actions/payment";
import { buildWhatsAppLinkTo } from "@/lib/utils";
import { STATUS_LABELS } from "@/lib/order-status";
import { Button } from "@/components/ui/Button";
import type { Order, OrderStatus } from "@prisma/client";

const STATUS_OPTIONS: OrderStatus[] = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "COMPLETED",
  "CANCELLED",
];

export function OrderStatusControls({ order }: { order: Order }) {
  const [status, setStatus] = useState(order.status);
  const [isPending, startTransition] = useTransition();
  const [paymentLink, setPaymentLink] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [generatingLink, setGeneratingLink] = useState(false);

  function handleStatusChange(next: OrderStatus) {
    setStatus(next);
    startTransition(() => {
      updateOrderStatus(order.id, next);
    });
  }

  async function handleGeneratePaymentLink() {
    setGeneratingLink(true);
    setPaymentError(null);
    const result = await initiatePayment(order.id);
    setGeneratingLink(false);
    if (!result.success || !result.redirectUrl) {
      setPaymentError(result.error ?? "Gagal membuat link pembayaran.");
      return;
    }
    setPaymentLink(result.redirectUrl);
  }

  const waMessage = `Halo ${order.customerName}, update pesanan Areska Kitchen Anda (#${order.id.slice(-8)}): status sekarang "${STATUS_LABELS[status]}".${paymentLink ? ` Silakan lanjut ke pembayaran di sini: ${paymentLink}` : ""} Terima kasih!`;

  return (
    <div className="space-y-4 rounded-2xl bg-cream-50 p-6 shadow-[0_2px_12px_rgba(31,77,58,0.08)]">
      <h2 className="font-semibold text-green-700">Kelola Order</h2>

      <div>
        <label htmlFor="order-status" className="mb-1.5 block text-sm font-medium text-green-700">
          Ubah Status
        </label>
        <select
          id="order-status"
          value={status}
          disabled={isPending}
          onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
          className="w-full rounded-xl border border-green-200 bg-cream-50 px-4 py-2.5 text-green-700 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>

      {order.isCustomEvent && (status === "PENDING" || status === "CONFIRMED") && (
        <div>
          <Button
            type="button"
            variant="secondary"
            onClick={handleGeneratePaymentLink}
            disabled={generatingLink}
          >
            {generatingLink ? "Membuat link..." : "Buat Link Pembayaran"}
          </Button>
          {paymentLink && (
            <p className="mt-2 break-all text-xs text-green-700/70">{paymentLink}</p>
          )}
          {paymentError && <p className="mt-2 text-sm text-[#B3432E]">{paymentError}</p>}
          <p className="mt-1 text-xs text-green-700/60">
            Order custom/event butuh konfirmasi manual sebelum link pembayaran dibuat (PRD §7).
          </p>
        </div>
      )}

      <a
        href={buildWhatsAppLinkTo(order.customerPhone, waMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-full border-2 border-green-600 px-5 py-2.5 text-sm font-semibold text-green-600 hover:bg-green-50"
      >
        Kirim Notifikasi WhatsApp
      </a>
    </div>
  );
}
