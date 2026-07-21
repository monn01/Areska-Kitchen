"use client";

import { useState, type FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function AccountLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);

    if (result?.error) {
      setError("Email atau password salah.");
      return;
    }

    router.push(searchParams.get("callbackUrl") || "/account");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream-100 px-4">
      <div className="w-full max-w-sm rounded-3xl bg-cream-50 p-8 shadow-[0_8px_30px_rgba(31,77,58,0.08)]">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-green-500">
          Areska Kitchen
        </p>
        <h1 className="mt-2 text-center font-heading text-2xl font-semibold text-green-700">
          Masuk ke Akun
        </h1>

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
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-green-700">
              Password
            </label>
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

        <p className="mt-6 text-center text-sm text-green-700/70">
          Belum punya akun?{" "}
          <Link href="/account/register" className="font-medium text-green-600 hover:underline">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
}
