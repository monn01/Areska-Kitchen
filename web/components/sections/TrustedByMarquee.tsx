"use client";

import { Building2 } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";
import type { Client } from "@prisma/client";

function BrandLogo({ brand }: { brand: Client }) {
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

export function MarqueeRow({ brands, direction }: { brands: Client[]; direction: "left" | "right" }) {
  if (brands.length === 0) return null;
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
