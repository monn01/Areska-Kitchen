"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { TiltCard } from "@/components/ui/TiltCard";
import { buildWhatsAppLink, DEFAULT_WA_MESSAGE } from "@/lib/utils";

const LEFT_FADE_MASK = "linear-gradient(to right, transparent, black 16%)";

function HomemadeBadge({ className }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      animate={shouldReduceMotion ? undefined : { scale: [1, 1.03, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      <span className="text-xs font-semibold leading-tight text-cream-50 sm:text-sm">
        Homemade
        <br />
        with Love
      </span>
    </motion.div>
  );
}

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="beranda"
      className="relative overflow-hidden bg-cream-100 pt-24 pb-20 sm:pt-28 sm:pb-28 lg:pb-0"
    >
      {/* Desktop only: foto bleed ke tepi kanan/atas/bawah section (bukan kartu terpisah),
          memudar ke background cream lewat mask di sisi kiri — sesuai referensi
          gambar-ref/gambar herosection.png (disiapkan khusus untuk treatment ini). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[56%] lg:block"
        style={{ maskImage: LEFT_FADE_MASK, WebkitMaskImage: LEFT_FADE_MASK }}
      >
        <Image
          src="/assets/hero/hero-banner.png"
          alt=""
          fill
          priority
          sizes="56vw"
          className="object-cover object-[100%_58%]"
        />
      </div>

      <div className="relative mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="lg:max-w-xl"
        >
          <motion.p
            variants={item}
            className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-green-500"
          >
            a taste of home
          </motion.p>
          <motion.h1
            variants={item}
            className="font-heading text-4xl font-semibold leading-[1.1] text-green-700 text-balance sm:text-5xl lg:text-6xl"
          >
            Masakan Rumahan, Rasa yang Selalu Dirindukan
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-6 max-w-lg text-lg leading-relaxed text-green-700/80"
          >
            Areska Kitchen hadir untuk memberikan hidangan rumahan yang lezat,
            higienis, dan dibuat dengan penuh cinta — untuk instansi, sekolah,
            maupun acara pribadi Anda.
          </motion.p>
          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
            <Magnetic className="inline-block">
              <Button href="/katalog" variant="primary" className="px-7 py-3 text-base">
                Pesan Online
              </Button>
            </Magnetic>
            <Button
              href={buildWhatsAppLink(DEFAULT_WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              confirmBeforeNavigate
              className="px-7 py-3 text-base"
            >
              Chat WhatsApp
            </Button>
          </motion.div>
          <motion.p variants={item} className="mt-4 text-sm text-green-700/80">
            Pesan langsung online, atau hubungi kami lewat WhatsApp untuk
            kebutuhan acara khusus.
          </motion.p>
        </motion.div>

        {/* Mobile/tablet only: foto tetap tampil, versi ringkas (di bawah teks, bukan bleed
            penuh — layar sempit tidak cukup ruang untuk itu), sesuai gambar-ref/hero mobile.png */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.7,
            delay: shouldReduceMotion ? 0 : 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative mt-10 lg:hidden"
        >
          <TiltCard maxTilt={5} liftScale={1.02} className="rounded-3xl">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(31,77,58,0.18)]">
              <Image
                src="/assets/hero/nasi-kotak-open.jpg"
                alt="Nasi kotak Areska Kitchen dengan lauk ayam, sambal kacang, dan sayur"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </TiltCard>
          <HomemadeBadge className="absolute -bottom-6 -left-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-600 text-center shadow-lg sm:h-28 sm:w-28" />
        </motion.div>
      </div>
    </section>
  );
}
