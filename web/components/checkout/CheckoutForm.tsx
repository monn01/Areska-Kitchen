"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cart-context";
import {
  createOrder,
  estimateDeliveryFee,
  checkVoucher,
  type DeliveryEstimate,
} from "@/lib/actions/checkout";
import { initiatePayment } from "@/lib/actions/payment";

const inputClass =
  "w-full rounded-xl border border-green-200 bg-cream-50 px-4 py-2.5 text-green-700 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-orange-300";
const labelClass = "mb-1.5 block text-sm font-medium text-green-700";

function tomorrowISODate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

export function CheckoutForm() {
  const { items, subtotal, clearCart, isHydrated } = useCart();
  const router = useRouter();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [deliveryEstimate, setDeliveryEstimate] = useState<DeliveryEstimate | null>(null);

  const [eventDate, setEventDate] = useState(tomorrowISODate());
  const [deliveryTime, setDeliveryTime] = useState("12:00");
  const [notes, setNotes] = useState("");

  const [voucherCode, setVoucherCode] = useState("");
  const [voucherStatus, setVoucherStatus] = useState<{
    checking: boolean;
    valid?: boolean;
    message?: string;
    discountAmount?: number;
  }>({ checking: false });

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    // Tunggu keranjang selesai dibaca dari localStorage dulu — tanpa ini, redirect bisa
    // ke-trigger keliru saat halaman baru dimuat (items masih [] sesaat sebelum hydrasi
    // selesai, padahal keranjang aslinya tidak kosong).
    if (isHydrated && items.length === 0) {
      router.replace("/#menu");
    }
  }, [isHydrated, items.length, router]);

  function handleUseCurrentLocation() {
    if (!navigator.geolocation) {
      setLocationError("Browser Anda tidak mendukung deteksi lokasi.");
      return;
    }
    setLocating(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setCoords({ lat, lng });
        const estimate = await estimateDeliveryFee(lat, lng);
        setDeliveryEstimate(estimate);
        setLocating(false);
      },
      () => {
        setLocationError("Tidak bisa mengambil lokasi — pastikan izin lokasi diaktifkan, atau lanjutkan tanpa lokasi (ongkir dikonfirmasi manual).");
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  async function handleApplyVoucher() {
    if (!voucherCode.trim()) return;
    setVoucherStatus({ checking: true });
    const result = await checkVoucher(voucherCode, subtotal);
    setVoucherStatus({
      checking: false,
      valid: result.valid,
      message: result.message,
      discountAmount: result.discountAmount,
    });
  }

  const deliveryFee = deliveryEstimate?.withinArea ? deliveryEstimate.fee : 0;
  const discountAmount = voucherStatus.valid ? voucherStatus.discountAmount ?? 0 : 0;
  const total = subtotal + deliveryFee - discountAmount;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);

    const result = await createOrder({
      items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
      customerName,
      customerPhone,
      deliveryAddress,
      deliveryLat: coords?.lat,
      deliveryLng: coords?.lng,
      eventDate,
      deliveryTime,
      notes,
      voucherCode: voucherStatus.valid ? voucherCode : undefined,
    });

    setSubmitting(false);

    if (!result.success) {
      setFormError(result.error ?? "Gagal membuat pesanan, silakan coba lagi.");
      return;
    }

    clearCart();

    if (result.needsManualReview) {
      router.push(`/order/${result.orderId}`);
      return;
    }

    // Order retail dengan ongkir sudah pasti — lanjut langsung ke pembayaran Midtrans.
    setSubmitting(true);
    const payment = await initiatePayment(result.orderId!);
    if (!payment.success || !payment.redirectUrl) {
      // Order tetap tersimpan (PENDING) — arahkan ke halaman order, pelanggan bisa coba bayar
      // lagi atau hubungi admin via WhatsApp dari sana.
      router.push(`/order/${result.orderId}`);
      return;
    }
    window.location.href = payment.redirectUrl;
  }

  if (!isHydrated) {
    return null;
  }
  if (items.length === 0) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <div className="rounded-2xl bg-cream-50 p-6 shadow-[0_2px_12px_rgba(31,77,58,0.08)]">
          <h2 className="font-heading text-lg font-semibold text-green-700">Info Pelanggan</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="customerName" className={labelClass}>
                Nama
              </label>
              <input
                id="customerName"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="customerPhone" className={labelClass}>
                Nomor WhatsApp
              </label>
              <input
                id="customerPhone"
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-cream-50 p-6 shadow-[0_2px_12px_rgba(31,77,58,0.08)]">
          <h2 className="font-heading text-lg font-semibold text-green-700">
            Alamat & Lokasi Pengiriman
          </h2>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="deliveryAddress" className={labelClass}>
                Alamat Lengkap
              </label>
              <textarea
                id="deliveryAddress"
                required
                rows={2}
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className={inputClass}
              />
            </div>

            <button
              type="button"
              onClick={handleUseCurrentLocation}
              disabled={locating}
              className="inline-flex items-center gap-2 rounded-full border-2 border-green-600 px-4 py-2 text-sm font-semibold text-green-600 hover:bg-green-50 disabled:opacity-60"
            >
              {locating ? (
                <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
              ) : (
                <MapPin className="h-4 w-4" strokeWidth={2} />
              )}
              Gunakan Lokasi Saat Ini
            </button>

            {locationError && <p className="text-sm text-[#B3432E]">{locationError}</p>}

            {deliveryEstimate && (
              <p
                className={
                  deliveryEstimate.withinArea
                    ? "text-sm text-green-700"
                    : "text-sm text-[#B3432E]"
                }
              >
                {deliveryEstimate.withinArea
                  ? `Estimasi jarak ±${deliveryEstimate.distanceKm.toFixed(1)} km — ongkir Rp ${deliveryEstimate.fee.toLocaleString("id-ID")}`
                  : `Lokasi ±${deliveryEstimate.distanceKm.toFixed(1)} km berada di luar area layanan kami (maks ${deliveryEstimate.radiusKm} km).`}
              </p>
            )}

            {!coords && (
              <p className="text-xs text-green-700/60">
                Tanpa lokasi, ongkir akan dikonfirmasi manual oleh admin sebelum pembayaran.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-cream-50 p-6 shadow-[0_2px_12px_rgba(31,77,58,0.08)]">
          <h2 className="font-heading text-lg font-semibold text-green-700">
            Jadwal Pengantaran
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="eventDate" className={labelClass}>
                Tanggal
              </label>
              <input
                id="eventDate"
                type="date"
                required
                min={tomorrowISODate()}
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="deliveryTime" className={labelClass}>
                Jam (07.00–20.00)
              </label>
              <input
                id="deliveryTime"
                type="time"
                required
                min="07:00"
                max="20:00"
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
          <p className="mt-2 text-xs text-green-700/60">
            Order untuk besok harus masuk sebelum jam 20.00 WIB hari ini.
          </p>

          <div className="mt-4">
            <label htmlFor="notes" className={labelClass}>
              Catatan (opsional)
            </label>
            <textarea
              id="notes"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div className="h-fit space-y-4 rounded-2xl bg-cream-50 p-6 shadow-[0_2px_12px_rgba(31,77,58,0.08)] lg:sticky lg:top-24">
        <h2 className="font-heading text-lg font-semibold text-green-700">Ringkasan Pesanan</h2>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.productId} className="flex justify-between text-sm text-green-700/80">
              <span>
                {item.name} x{item.quantity}
              </span>
              <span>Rp {(item.price * item.quantity).toLocaleString("id-ID")}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-2 border-t border-green-100 pt-4">
          <input
            placeholder="Kode voucher"
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
            className={inputClass}
          />
          <button
            type="button"
            onClick={handleApplyVoucher}
            disabled={voucherStatus.checking || !voucherCode.trim()}
            className="shrink-0 rounded-xl border-2 border-green-600 px-4 text-sm font-semibold text-green-600 hover:bg-green-50 disabled:opacity-60"
          >
            Pakai
          </button>
        </div>
        {voucherStatus.message && (
          <p className={voucherStatus.valid ? "text-sm text-green-700" : "text-sm text-[#B3432E]"}>
            {voucherStatus.message}
          </p>
        )}

        <div className="space-y-1.5 border-t border-green-100 pt-4 text-sm">
          <div className="flex justify-between text-green-700/80">
            <span>Subtotal</span>
            <span>Rp {subtotal.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between text-green-700/80">
            <span>Ongkir</span>
            <span>Rp {deliveryFee.toLocaleString("id-ID")}</span>
          </div>
          {discountAmount > 0 && (
            <div className="flex justify-between text-green-700/80">
              <span>Diskon</span>
              <span>-Rp {discountAmount.toLocaleString("id-ID")}</span>
            </div>
          )}
          <div className="flex justify-between border-t border-green-100 pt-1.5 font-semibold text-green-700">
            <span>Total</span>
            <span>Rp {total.toLocaleString("id-ID")}</span>
          </div>
        </div>

        {formError && <p className="text-sm text-[#B3432E]">{formError}</p>}

        <Button type="submit" variant="primary" disabled={submitting} className="w-full">
          {submitting ? "Memproses..." : "Buat Pesanan"}
        </Button>
      </div>
    </form>
  );
}
