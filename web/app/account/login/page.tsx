"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { MinimalHeader } from "@/components/ui/MinimalHeader";
import { AuthForms } from "@/components/auth/AuthForms";

export default function AccountLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSuccess() {
    router.push(searchParams.get("callbackUrl") || "/account");
    router.refresh();
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
            Akun Saya
          </h1>

          <div className="mt-8 flex justify-center">
            <AuthForms defaultTab="login" onSuccess={handleSuccess} />
          </div>
        </div>
      </div>
    </div>
  );
}
