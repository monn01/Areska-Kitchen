"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Garis yang "menggambar diri" dari kiri ke kanan saat masuk viewport — dipakai untuk
 * efek penghubung antar step (mis. "Cara Pemesanan"). Client Component terpisah (bukan
 * langsung motion.div di pemanggil) karena pemanggilnya Server Component, sama seperti
 * pola ScrollReveal.tsx. */
export function DrawLine({ className, delay = 0.2 }: { className?: string; delay?: number }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      initial={{ scaleX: shouldReduceMotion ? 1 : 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: false, amount: 0.6 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 1,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn("origin-left", className)}
    />
  );
}
