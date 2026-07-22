import Link from "next/link";
import { getServerSession } from "next-auth";
import { ArrowLeft } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { MinimalHeader } from "@/components/ui/MinimalHeader";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-cream-100">
      <MinimalHeader />
      <div className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/katalog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            Kembali ke Katalog
          </Link>
          <h1 className="mt-3 font-heading text-4xl font-semibold text-green-700">Checkout</h1>
          <div className="mt-8">
            <CheckoutForm userId={session?.user?.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
