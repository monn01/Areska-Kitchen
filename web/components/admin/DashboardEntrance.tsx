"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Animasi mount-triggered (bukan whileInView) — hanya main sekali saat layout dashboard
 * pertama kali dipasang (habis login), tidak replay tiap navigasi antar halaman admin karena
 * layout ini persisten di App Router. Prop animate selalu object valid (bukan undefined
 * kondisional) — pola aman sesuai lesson bug scroll-reveal yang pernah macet tersembunyi. */
export function DashboardEntrance({
  children,
  x = 0,
  y = 0,
  delay = 0,
}: {
  children: React.ReactNode;
  x?: number;
  y?: number;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const visible = { opacity: 1, x: 0, y: 0 };
  const hidden = shouldReduceMotion ? visible : { opacity: 0, x, y };

  return (
    <motion.div
      initial={hidden}
      animate={visible}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.5,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
