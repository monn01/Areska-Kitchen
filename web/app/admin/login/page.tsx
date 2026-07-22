"use client";

import { useState, type FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Email atau password salah.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-800 via-green-700 to-green-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24, scale: shouldReduceMotion ? 1 : 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm rounded-3xl bg-cream-50 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
      >
        <motion.div
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: shouldReduceMotion ? 0 : 0.15 }}
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-green-600/10 text-green-700"
        >
          <ShieldCheck className="h-6 w-6" strokeWidth={1.75} />
        </motion.div>
        <p className="mt-3 text-center text-sm font-semibold uppercase tracking-[0.25em] text-green-500">
          Areska Kitchen
        </p>
        <h1 className="mt-1 text-center font-heading text-2xl font-semibold text-green-700">
          Login Admin
        </h1>
        <p className="mt-1 text-center text-xs text-green-700/60">
          Khusus tim internal — kelola menu, order, dan pengaturan toko.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-green-700">
              Email
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
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-green-700">
                Password
              </label>
              <Link
                href="/admin/forgot-password"
                className="text-xs font-medium text-green-600 hover:underline"
              >
                Lupa password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-green-200 bg-cream-50 px-4 py-3 text-green-700 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>

          {error && <p className="text-sm text-[#B3432E]">{error}</p>}

          <Button type="submit" variant="primary" disabled={loading} className="w-full">
            {loading ? "Memproses..." : "Masuk"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
