"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { initiatePayment } from "@/lib/actions/payment";

export function RetryPaymentButton({ orderId }: { orderId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    const result = await initiatePayment(orderId);
    if (!result.success || !result.redirectUrl) {
      setError(result.error ?? "Gagal membuka halaman pembayaran.");
      setLoading(false);
      return;
    }
    window.location.href = result.redirectUrl;
  }

  return (
    <div>
      <Button type="button" variant="primary" onClick={handleClick} disabled={loading}>
        {loading ? "Memproses..." : "Bayar Sekarang"}
      </Button>
      {error && <p className="mt-2 text-sm text-[#B3432E]">{error}</p>}
    </div>
  );
}
