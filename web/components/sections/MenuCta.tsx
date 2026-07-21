import Link from "next/link";
import {
  Plus,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Truck,
  ChefHat,
  UtensilsCrossed,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { DrawLine } from "@/components/ui/DrawLine";
import { ProductImage } from "@/components/ui/ProductImage";
import { buildWhatsAppLink, cn } from "@/lib/utils";
import type { Product } from "@prisma/client";

const CUSTOM_MENU_MESSAGE =
  "Halo Areska Kitchen, saya ingin konsultasi untuk menu custom sesuai acara saya.";

const ORDER_STEPS = [
  {
    icon: BookOpen,
    title: "Pilih Menu",
    description: "Eksplorasi beragam paket dan menu pilihan kami yang menggugah selera.",
  },
  {
    icon: CalendarDays,
    title: "Atur Jadwal",
    description: "Tentukan waktu dan lokasi pengiriman. Kami akan mengurus sisanya.",
  },
  {
    icon: Truck,
    title: "Pengantaran",
    description: "Pesanan Anda tiba dengan aman dan tepat waktu di lokasi acara.",
  },
];

function PopularProductCard({
  product,
  badge,
  featured,
}: {
  product: Product;
  badge?: string;
  featured?: boolean;
}) {
  return (
    <Link
      href="/katalog"
      className={cn(
        "group flex overflow-hidden rounded-2xl bg-cream-50 shadow-[0_2px_12px_rgba(31,77,58,0.08)] transition-shadow duration-base hover:shadow-[0_10px_28px_rgba(31,77,58,0.16)]",
        featured ? "h-full flex-col sm:flex-row" : "h-full flex-col",
      )}
    >
      <div
        className={cn(
          "relative shrink-0 overflow-hidden",
          featured ? "aspect-[4/3] sm:aspect-auto sm:w-[45%]" : "aspect-[4/3] w-full",
        )}
      >
        <ProductImage
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full transition-transform duration-base ease-out group-hover:scale-105"
        />
        {badge && (
          <span className="absolute left-3 top-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-green-900">
            {badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-lg font-semibold text-green-700">{product.name}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-green-700/70">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-green-100 pt-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-green-500">Harga</p>
            <p className="text-sm font-semibold text-green-700">
              Rp {product.price.toLocaleString("id-ID")}
            </p>
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500 text-green-900 transition-transform duration-base group-hover:scale-110">
            <Plus className="h-5 w-5" strokeWidth={2} />
          </span>
        </div>
      </div>
    </Link>
  );
}

function CustomMenuCard() {
  return (
    <Link
      href={buildWhatsAppLink(CUSTOM_MENU_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-2xl bg-green-700 p-6 text-cream-50 transition-colors duration-base hover:bg-green-800 sm:p-8"
    >
      <BookOpen
        className="pointer-events-none absolute -right-4 -top-4 h-32 w-32 text-cream-50/10"
        strokeWidth={1}
      />
      <div className="relative">
        <h3 className="font-heading text-2xl font-semibold">Custom Menu Anda Sendiri</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-cream-100/80">
          Ingin menu berbeda? Kami siap membantu merancang paket catering sesuai selera dan
          budget acara Anda.
        </p>
      </div>
      <span className="relative inline-flex w-fit items-center gap-2 rounded-full border-2 border-cream-50/80 px-5 py-2.5 text-sm font-semibold transition-colors duration-base group-hover:bg-cream-50 group-hover:text-green-700">
        Hubungi Kami
        <ArrowRight className="h-4 w-4" strokeWidth={2} />
      </span>
    </Link>
  );
}

export async function MenuCta() {
  const popularProducts = await prisma.product.findMany({
    where: { isActive: true, isPopular: true },
    orderBy: [{ category: "asc" }, { name: "asc" }],
    take: 3,
  });

  // Fallback kalau admin belum menandai produk populer sama sekali — ambil 3 produk aktif
  // pertama supaya section ini tidak pernah kosong sebelum admin sempat kurasi manual.
  const products =
    popularProducts.length > 0
      ? popularProducts
      : await prisma.product.findMany({
          where: { isActive: true },
          orderBy: [{ category: "asc" }, { name: "asc" }],
          take: 3,
        });

  return (
    <section id="menu" className="bg-cream-50 py-20 sm:py-28">
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <ScrollReveal
          variant="fade-up"
          className="flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-500">
              Favorit Pelanggan
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-green-700 sm:text-4xl">
              Paket Populer
            </h2>
          </div>
          <Link
            href="/katalog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-600 hover:text-orange-500"
          >
            Lihat Semua Menu
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </ScrollReveal>

        {products.length > 0 && (
          <div className="mt-10 grid gap-6 lg:grid-cols-5">
            <ScrollReveal variant="fade-up" delay={0} className="lg:col-span-3">
              <PopularProductCard product={products[0]} badge="Best Seller" featured />
            </ScrollReveal>
            {products[1] && (
              <ScrollReveal variant="fade-up" delay={0.08} className="lg:col-span-2">
                <PopularProductCard product={products[1]} />
              </ScrollReveal>
            )}
            {products[2] && (
              <ScrollReveal variant="fade-up" delay={0.16} className="lg:col-span-2">
                <PopularProductCard product={products[2]} />
              </ScrollReveal>
            )}
            <ScrollReveal variant="fade-up" delay={0.24} className="lg:col-span-3">
              <CustomMenuCard />
            </ScrollReveal>
          </div>
        )}

        <div className="mt-20 sm:mt-28">
          <ScrollReveal variant="fade-up" className="text-center">
            <h3 className="font-heading text-2xl font-semibold text-green-700 sm:text-3xl">
              Cara Pemesanan
            </h3>
            <p className="mx-auto mt-2 max-w-md text-green-700/70">
              Hanya dengan 3 langkah mudah menuju acara yang tak terlupakan.
            </p>
          </ScrollReveal>

          <div className="relative mt-12 overflow-hidden rounded-3xl border border-green-100 bg-cream-100/50 px-6 py-14 sm:px-12">
            {/* Ilustrasi dekoratif elegan (outline, sangat redup) — cuma pengisi visual,
                bukan elemen interaktif, jadi aman dirender di Server Component ini. */}
            <UtensilsCrossed
              aria-hidden="true"
              className="pointer-events-none absolute -left-8 -top-10 h-40 w-40 rotate-[-12deg] text-green-600/[0.06] sm:h-48 sm:w-48"
              strokeWidth={1}
            />
            <ChefHat
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-10 -right-8 h-44 w-44 rotate-[10deg] text-orange-500/[0.08] sm:h-52 sm:w-52"
              strokeWidth={1}
            />

            <div className="relative grid gap-10 sm:grid-cols-3 sm:gap-6">
              <DrawLine className="pointer-events-none absolute inset-x-[16.66%] top-8 hidden h-0.5 rounded-full bg-gradient-to-r from-orange-400 to-green-500 sm:block" />
              {ORDER_STEPS.map((step, i) => (
                <ScrollReveal
                  key={step.title}
                  variant="fade-up"
                  delay={i * 0.1}
                  className="relative flex flex-col items-center text-center"
                >
                  <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-green-200 bg-cream-50 text-green-600 shadow-sm">
                    <step.icon className="h-7 w-7" strokeWidth={1.5} />
                  </span>
                  <h4 className="mt-4 font-heading text-lg font-semibold text-green-700">
                    {step.title}
                  </h4>
                  <p className="mt-1.5 max-w-[220px] text-sm leading-relaxed text-green-700/70">
                    {step.description}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
