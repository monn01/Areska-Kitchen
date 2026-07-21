import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Clock } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { STATUS_LABELS } from "@/lib/order-status";
import { buildWhatsAppLink } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { RetryPaymentButton } from "@/components/checkout/RetryPaymentButton";

export default async function OrderConfirmationPage({ params }: { params: { id: string } }) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: { items: { include: { product: true } }, transaction: true },
  });
  if (!order) notFound();

  const needsManualReview = order.isCustomEvent || order.deliveryLat == null;

  return (
    <div className="min-h-screen bg-cream-100 px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl bg-cream-50 p-8 text-center shadow-[0_2px_12px_rgba(31,77,58,0.08)]">
          {needsManualReview ? (
            <Clock className="mx-auto h-12 w-12 text-orange-500" strokeWidth={1.5} />
          ) : (
            <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" strokeWidth={1.5} />
          )}
          <h1 className="mt-4 font-heading text-2xl font-semibold text-green-700">
            {needsManualReview ? "Pesanan Diterima — Menunggu Konfirmasi" : "Pesanan Diterima"}
          </h1>
          <p className="mt-2 text-green-700/70">
            Nomor Order: <span className="font-mono">{order.id}</span>
          </p>
          {needsManualReview && (
            <p className="mt-4 text-sm text-green-700/80">
              {order.isCustomEvent
                ? "Pesanan Anda untuk acara/prasmanan besar akan dikonfirmasi manual oleh admin kami sebelum pembayaran."
                : "Kami akan konfirmasi ongkir & total akhir pesanan Anda melalui WhatsApp sebelum pembayaran."}
            </p>
          )}
        </div>

        <div className="mt-6 rounded-2xl bg-cream-50 p-6 shadow-[0_2px_12px_rgba(31,77,58,0.08)]">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-green-700">Status</h2>
            <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-600">
              {STATUS_LABELS[order.status]}
            </span>
          </div>

          <div className="mt-4 divide-y divide-green-50">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between py-2 text-sm">
                <span className="text-green-700/80">
                  {item.product.name} x{item.quantity}
                </span>
                <span className="text-green-700">
                  Rp {(item.quantity * item.priceEach).toLocaleString("id-ID")}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-1 border-t border-green-100 pt-4 text-sm">
            {order.deliveryFee > 0 && (
              <div className="flex justify-between text-green-700/70">
                <span>Ongkir</span>
                <span>Rp {order.deliveryFee.toLocaleString("id-ID")}</span>
              </div>
            )}
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-green-700/70">
                <span>Diskon</span>
                <span>-Rp {order.discountAmount.toLocaleString("id-ID")}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold text-green-700">
              <span>Total</span>
              <span>Rp {order.totalAmount.toLocaleString("id-ID")}</span>
            </div>
          </div>
        </div>

        {!needsManualReview &&
          order.status === "PENDING" &&
          order.transaction?.midtransStatus !== "settlement" &&
          order.transaction?.midtransStatus !== "capture" && (
            <div className="mt-6 text-center">
              <RetryPaymentButton orderId={order.id} />
            </div>
          )}

        <div className="mt-6 text-center">
          <Button
            href={buildWhatsAppLink(
              `Halo Areska Kitchen, saya ingin menanyakan status order saya (${order.id}).`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
          >
            Tanya via WhatsApp
          </Button>
          <p className="mt-4">
            <Link href="/" className="text-sm text-green-600 hover:underline">
              Kembali ke Beranda
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
