"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { requestPasswordReset } from "@/lib/actions/account";

export default function AdminForgotPasswordPage() {
  const shouldReduceMotion = useReducedMotion();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    await requestPasswordReset(email, "admin");
    setLoading(false);
    setSent(true);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-800 via-green-700 to-green-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm rounded-3xl bg-cream-50 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-green-600/10 text-green-700">
          <ShieldCheck className="h-6 w-6" strokeWidth={1.75} />
        </div>
        <p className="mt-3 text-center text-sm font-semibold uppercase tracking-[0.25em] text-green-500">
          Areska Kitchen
        </p>
        <h1 className="mt-1 text-center font-heading text-2xl font-semibold text-green-700">
          Lupa Password Admin
        </h1>

        {sent ? (
          <div className="mt-8 space-y-4 text-center">
            <p className="text-sm text-green-700/80">
              Kalau email <span className="font-medium">{email}</span> terdaftar sebagai admin,
              link reset password sudah dikirim. Cek inbox (atau folder spam) Anda.
            </p>
            <Link
              href="/admin/login"
              className="inline-block text-sm font-medium text-green-600 hover:underline"
            >
              Kembali ke halaman masuk
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-green-700">
                Email Admin
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
              <Link href="/admin/login" className="font-medium text-green-600 hover:underline">
                Kembali ke halaman masuk
              </Link>
            </p>
          </form>
        )}
      </motion.div>
    </div>
  );
}
