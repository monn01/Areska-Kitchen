import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MinimalHeader } from "@/components/ui/MinimalHeader";
import { Footer } from "@/components/ui/Footer";
import { CatalogGrid } from "@/components/sections/CatalogGrid";
import { KatalogAuthGate } from "@/components/auth/KatalogAuthGate";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Katalog Menu — Areska Kitchen",
  description:
    "Pilih menu masakan rumahan Areska Kitchen dan pesan langsung online untuk acara Anda.",
};

export default async function KatalogPage() {
  const session = await getServerSession(authOptions);
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });

  return (
    <div className="min-h-screen bg-cream-100">
      <MinimalHeader />
      <div
        aria-hidden={!session}
        className={cn(!session && "pointer-events-none select-none blur-sm")}
      >
        <div className="border-b border-green-100 bg-cream-50 py-12 sm:py-16">
          <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-500">
              Katalog Menu
            </p>
            <h1 className="mt-3 font-heading text-4xl font-semibold text-green-700 sm:text-5xl">
              Pilihan Menu untuk Setiap Acara
            </h1>
            <p className="mt-4 max-w-xl text-green-700/70">
              Harga di bawah sudah final — tambahkan ke keranjang lalu lanjutkan ke
              checkout untuk atur jadwal dan alamat pengantaran.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-container px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <CatalogGrid products={products} />
        </div>
      </div>

      <Footer />

      {!session && <KatalogAuthGate />}
    </div>
  );
}
