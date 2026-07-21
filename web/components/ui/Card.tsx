"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  hoverLift = true,
}: {
  children: React.ReactNode;
  className?: string;
  hoverLift?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "rounded-2xl bg-cream-50 shadow-[0_2px_12px_rgba(31,77,58,0.08)] overflow-hidden",
        className,
      )}
      whileHover={
        hoverLift && !shouldReduceMotion
          ? { y: -6, boxShadow: "0 12px 24px rgba(31,77,58,0.14)" }
          : undefined
      }
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
