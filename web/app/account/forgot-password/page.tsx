"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MinimalHeader } from "@/components/ui/MinimalHeader";
import { requestPasswordReset } from "@/lib/actions/account";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    await requestPasswordReset(email);
    setLoading(false);
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-cream-100">
      <MinimalHeader />
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm rounded-3xl bg-cream-50 p-8 shadow-[0_8px_30px_rgba(31,77,58,0.08)]">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-green-500">
            Areska Kitchen
          </p>
          <h1 className="mt-2 text-center font-heading text-2xl font-semibold text-green-700">
            Lupa Password
          </h1>

          {sent ? (
            <div className="mt-8 space-y-4 text-center">
              <p className="text-sm text-green-700/80">
                Kalau email <span className="font-medium">{email}</span> terdaftar, link
                reset password sudah dikirim. Cek inbox (atau folder spam) Anda.
              </p>
              <Link
                href="/account/login"
                className="inline-block text-sm font-medium text-green-600 hover:underline"
              >
                Kembali ke halaman masuk
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <p className="text-sm text-green-700/70">
                Catatan: reset password lewat email hanya berlaku untuk akun yang
                mendaftarkan email. Kalau akun Anda daftar pakai nomor WhatsApp saja,
                hubungi kami langsung untuk bantuan reset.
              </p>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-green-700">
                  Email Akun
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-green-200 bg-cream-50 px-4 py-3 text-green-700 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>

              <Button type="submit" variant="primary" disabled={loading} className="w-full">
                {loading ? "Memproses..." : "Kirim Link Reset"}
              </Button>

              <p className="text-center text-sm text-green-700/70">
                <Link href="/account/login" className="font-medium text-green-600 hover:underline">
                  Kembali ke halaman masuk
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
