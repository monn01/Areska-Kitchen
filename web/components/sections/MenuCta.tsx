import { ShoppingBag } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProductImage } from "@/components/ui/ProductImage";
import { CATEGORY_ORDER, CATEGORY_LABELS } from "@/lib/product-categories";

const MAX_PREVIEW = 8;
const PER_CATEGORY = 2;

export async function MenuCta() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });

  // Sampai 2 produk per kategori (maks 8 total) — galeri visual yang cukup ramai untuk
  // menarik minat pengunjung, tapi tetap ringkas; katalog lengkap & interaktif (semua
  // produk, tambah ke keranjang) tetap ada di /katalog.
  const preview = CATEGORY_ORDER.flatMap((category) =>
    products.filter((p) => p.category === category).slice(0, PER_CATEGORY),
  ).slice(0, MAX_PREVIEW);

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
            Nasi kotak, prasmanan, snack box, sampai pempek — cicipi ragam menu
            kami, lalu pesan langsung secara online.
          </p>
        </ScrollReveal>

        {preview.length > 0 && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {preview.map((item, i) => (
              <ScrollReveal key={item.id} variant="fade-up" delay={i * 0.06}>
                <TiltCard maxTilt={6} liftScale={1.04} className="h-full rounded-2xl">
                  <Card className="h-full" hoverLift={false}>
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <ProductImage
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-full w-full"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-medium uppercase tracking-wide text-green-500">
                        {CATEGORY_LABELS[item.category]}
                      </p>
                      <h3 className="mt-1 font-heading text-base font-semibold text-green-700">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-green-700/80">
                        Rp {item.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </Card>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        )}

        <ScrollReveal variant="scale" delay={0.15} className="mt-10 text-center">
          <Button href="/katalog" variant="primary" className="gap-2 px-8 py-3.5 text-base">
            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
            Lihat Menu & Pesan
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
