"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { trustIndicators } from "@/lib/data";

export function About() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="tentang-kami" className="bg-cream-100 py-20 sm:py-28">
      <div className="mx-auto grid max-w-container gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <motion.div
          initial={{ clipPath: shouldReduceMotion ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative order-2 aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(31,77,58,0.16)] lg:order-1"
        >
          <Image
            src="/assets/hero/box-closed.jpg"
            alt="Kemasan box Areska Kitchen dengan label Homemade, Fresh Ingredients, Prepared with Love"
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 lg:order-2"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-green-500">
            Tentang Kami
          </p>
          <h2 className="font-heading text-3xl font-semibold text-green-700 sm:text-4xl">
            Catering Rumahan Sejak 2019
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-green-700/80">
            Areska Kitchen adalah layanan catering rumahan yang berbasis di
            Pangkalpinang, Bangka Belitung. Sejak 2019, kami melayani nasi
            kotak, prasmanan, snack box, hingga pempek khas Bangka — dipercaya
            oleh instansi pemerintah, sekolah, dan masyarakat umum untuk
            berbagai acara formal maupun non-formal.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-green-700/80">
            Setiap pesanan kami siapkan dengan standar rumahan: bahan segar,
            proses higienis, dan rasa yang konsisten — karena bagi kami,
            makanan terbaik adalah yang terasa seperti buatan keluarga
            sendiri.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {trustIndicators.map((t) => (
              <div key={t.id} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                <span className="text-sm font-medium text-green-700">{t.title}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
