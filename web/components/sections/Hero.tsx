"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { TiltCard } from "@/components/ui/TiltCard";
import { buildWhatsAppLink, DEFAULT_WA_MESSAGE } from "@/lib/utils";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 800], [0, 800 * 0.15]);

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
      className="relative overflow-hidden bg-cream-100 pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      <div className="mx-auto grid max-w-container gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <motion.div variants={container} initial="hidden" animate="show">
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
              <Button href="/katalog" variant="primary">
                Pesan Online
              </Button>
            </Magnetic>
            <Button
              href={buildWhatsAppLink(DEFAULT_WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              confirmBeforeNavigate
            >
              Chat WhatsApp
            </Button>
          </motion.div>
          <motion.p variants={item} className="mt-4 text-sm text-green-700/80">
            Pesan langsung online, atau hubungi kami lewat WhatsApp untuk
            kebutuhan acara khusus.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.7, delay: shouldReduceMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <TiltCard maxTilt={5} liftScale={1.02} className="rounded-3xl">
            <motion.div
              ref={imageRef}
              style={isDesktop && !shouldReduceMotion ? { y: parallaxY } : undefined}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(31,77,58,0.18)]"
            >
              <Image
                src="/assets/hero/nasi-kotak-open.jpg"
                alt="Nasi kotak Areska Kitchen dengan lauk ayam, sambal kacang, dan sayur"
                fill
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </motion.div>
          </TiltCard>

          <motion.div
            animate={shouldReduceMotion ? undefined : { scale: [1, 1.03, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute -bottom-6 -left-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-600 text-center shadow-lg sm:h-28 sm:w-28"
          >
            <span className="text-xs font-semibold leading-tight text-cream-50 sm:text-sm">
              Homemade
              <br />
              with Love
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
