import { MinimalHeader } from "@/components/ui/MinimalHeader";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-cream-100">
      <MinimalHeader />
      <div className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-heading text-3xl font-semibold text-green-700">Checkout</h1>
          <div className="mt-8">
            <CheckoutForm />
          </div>
        </div>
      </div>
    </div>
  );
}
