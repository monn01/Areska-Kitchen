import { prisma } from "@/lib/prisma";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MenuGrid } from "@/components/sections/MenuGrid";

export async function Menu() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });

  return (
    <section id="menu" className="bg-cream-50 py-20 sm:py-28">
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-up" className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-500">
            Menu Kami
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-green-700 sm:text-4xl">
            Pilihan Menu untuk Setiap Acara
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-green-700/70">
            Harga di bawah sudah final — konfirmasi jumlah pesanan dan kebutuhan
            acara Anda melalui WhatsApp.
          </p>
        </ScrollReveal>

        <MenuGrid products={products} />
      </div>
    </section>
  );
}
