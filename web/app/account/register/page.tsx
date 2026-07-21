"use client";

import { useState, type FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { registerUser } from "@/lib/actions/account";

export default function AccountRegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await registerUser({ name, email, phone, password });
    if (!result.success) {
      setError(result.error ?? "Gagal mendaftar, silakan coba lagi.");
      setLoading(false);
      return;
    }

    const signInResult = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);

    if (signInResult?.error) {
      router.push("/account/login");
      return;
    }

    router.push("/account");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream-100 px-4 py-16">
      <div className="w-full max-w-sm rounded-3xl bg-cream-50 p-8 shadow-[0_8px_30px_rgba(31,77,58,0.08)]">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-green-500">
          Areska Kitchen
        </p>
        <h1 className="mt-2 text-center font-heading text-2xl font-semibold text-green-700">
          Daftar Akun
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-green-700">
              Nama
            </label>
            <input
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-green-200 bg-cream-50 px-4 py-3 text-green-700 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>
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
            <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-green-700">
              Nomor WhatsApp
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-green-200 bg-cream-50 px-4 py-3 text-green-700 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>

          {error && <p className="text-sm text-[#B3432E]">{error}</p>}

          <Button type="submit" variant="primary" disabled={loading} className="w-full">
            {loading ? "Memproses..." : "Daftar"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-green-700/70">
          Sudah punya akun?{" "}
          <Link href="/account/login" className="font-medium text-green-600 hover:underline">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}
