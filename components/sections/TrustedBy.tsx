"use client";

import { Building2 } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { trustedBrands, type TrustedBrand } from "@/lib/data";

function BrandLogo({ brand }: { brand: TrustedBrand }) {
  return (
    <TiltCard maxTilt={6} liftScale={1.08} className="shrink-0">
      {brand.logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={brand.logoUrl}
          alt={brand.name}
          className="h-16 w-auto object-contain grayscale opacity-70 transition-all duration-base hover:grayscale-0 hover:opacity-100 sm:h-20"
        />
      ) : (
        <div
          className="flex h-16 w-16 items-center justify-center text-green-400/50 transition-colors duration-base hover:text-green-500/80 sm:h-20 sm:w-20"
          title={brand.name}
        >
          <Building2 className="h-full w-full" strokeWidth={1} />
        </div>
      )}
    </TiltCard>
  );
}

function MarqueeRow({ brands, direction }: { brands: TrustedBrand[]; direction: "left" | "right" }) {
  const track = [...brands, ...brands];

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={
          direction === "left"
            ? "flex w-max items-center gap-14 animate-marquee-left motion-reduce:animate-none hover:[animation-play-state:paused] sm:gap-20"
            : "flex w-max items-center gap-14 animate-marquee-right motion-reduce:animate-none hover:[animation-play-state:paused] sm:gap-20"
        }
      >
        {track.map((brand, i) => (
          <BrandLogo key={`${brand.id}-${i}`} brand={brand} />
        ))}
      </div>
    </div>
  );
}

export function TrustedBy() {
  const row1 = trustedBrands.filter((b) => b.row === 1);
  const row2 = trustedBrands.filter((b) => b.row === 2);

  return (
    <section className="bg-green-50/60 py-16 sm:py-20">
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-down" className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-500">
            Dipercaya Oleh
          </p>
          <h2 className="mt-3 font-heading text-2xl font-semibold text-green-700 sm:text-3xl">
            Instansi, Sekolah, dan Masyarakat Umum
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-green-700/70">
            Areska Kitchen telah melayani berbagai jenis acara di Pangkalpinang
            dan sekitarnya — dari jamuan resmi hingga acara keluarga.
          </p>
          <p className="mx-auto mt-2 max-w-xl text-xs italic text-green-600/70">
            *Contoh ilustratif kategori — daftar &amp; logo resmi menyusul setelah
            konfirmasi izin dari masing-masing instansi.
          </p>
        </ScrollReveal>

        <div className="mt-10 space-y-6 sm:space-y-8">
          <ScrollReveal variant="scale" delay={0.05}>
            <MarqueeRow brands={row1} direction="left" />
          </ScrollReveal>
          <ScrollReveal variant="scale" delay={0.1}>
            <MarqueeRow brands={row2} direction="right" />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
