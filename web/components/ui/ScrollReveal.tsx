"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type RevealVariant = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale" | "fade";

const OFFSETS: Record<RevealVariant, { x?: number; y?: number; scale?: number }> = {
  "fade-up": { y: 32 },
  "fade-down": { y: -32 },
  "fade-left": { x: -32 },
  "fade-right": { x: 32 },
  scale: { scale: 0.92 },
  fade: {},
};

export function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.6,
  amount = 0.2,
  className,
}: {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  amount?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const offset = OFFSETS[variant];

  const visible = { opacity: 1, x: 0, y: 0, scale: 1 };
  const hidden = shouldReduceMotion
    ? visible
    : { opacity: 0, x: offset.x ?? 0, y: offset.y ?? 0, scale: offset.scale ?? 1 };

  return (
    <motion.div
      initial={hidden}
      whileInView={visible}
      viewport={{ once: false, amount }}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
