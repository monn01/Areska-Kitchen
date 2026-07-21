"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MinimalHeader } from "@/components/ui/MinimalHeader";
import { PasswordInput } from "@/components/auth/AuthForms";
import { resetPassword } from "@/lib/actions/account";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak sama.");
      return;
    }

    setLoading(true);
    const result = await resetPassword(token, password);
    setLoading(false);

    if (!result.success) {
      setError(result.error ?? "Gagal reset password, silakan coba lagi.");
      return;
    }

    setDone(true);
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
            Atur Ulang Password
          </h1>

          {!token ? (
            <p className="mt-8 text-center text-sm text-[#B3432E]">
              Link reset tidak valid. Silakan minta link baru dari halaman{" "}
              <Link href="/account/forgot-password" className="font-medium underline">
                lupa password
              </Link>
              .
            </p>
          ) : done ? (
            <div className="mt-8 space-y-4 text-center">
              <p className="text-sm text-green-700/80">
                Password berhasil diganti. Silakan masuk dengan password baru Anda.
              </p>
              <Button
                variant="primary"
                className="w-full"
                onClick={() => {
                  router.push("/account/login");
                }}
              >
                Ke Halaman Masuk
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-green-700">
                  Password Baru
                </label>
                <PasswordInput
                  id="password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  value={password}
                  onChange={setPassword}
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-1.5 block text-sm font-medium text-green-700"
                >
                  Ulangi Password Baru
                </label>
                <PasswordInput
                  id="confirmPassword"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                />
              </div>

              {error && <p className="text-sm text-[#B3432E]">{error}</p>}

              <Button type="submit" variant="primary" disabled={loading} className="w-full">
                {loading ? "Memproses..." : "Simpan Password Baru"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
