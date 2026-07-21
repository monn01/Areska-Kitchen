import { prisma } from "@/lib/prisma";
import { MinimalHeader } from "@/components/ui/MinimalHeader";
import { MenuGrid } from "@/components/sections/MenuGrid";

export const metadata = {
  title: "Katalog Menu — Areska Kitchen",
  description:
    "Pilih menu masakan rumahan Areska Kitchen dan pesan langsung online untuk acara Anda.",
};

export default async function KatalogPage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });

  return (
    <div className="min-h-screen bg-cream-100">
      <MinimalHeader />
      <div className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-container">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-500">
              Katalog Menu
            </p>
            <h1 className="mt-3 font-heading text-3xl font-semibold text-green-700 sm:text-4xl">
              Pilihan Menu untuk Setiap Acara
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-green-700/70">
              Harga di bawah sudah final — tambahkan ke keranjang lalu lanjutkan ke
              checkout untuk atur jadwal dan alamat pengantaran.
            </p>
          </div>

          <MenuGrid products={products} />
        </div>
      </div>
    </div>
  );
}
