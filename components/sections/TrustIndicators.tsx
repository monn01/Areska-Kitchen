"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Home, Leaf, ShieldCheck, Heart, type LucideIcon } from "lucide-react";
import { trustIndicators } from "@/lib/data";

const ICONS: Record<string, LucideIcon> = {
  rumahan: Home,
  berkualitas: Leaf,
  higienis: ShieldCheck,
  cinta: Heart,
};

export function TrustIndicators() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="border-y border-green-100 bg-cream-50">
      <div className="mx-auto max-w-container px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6">
          {trustIndicators.map((indicator, i) => {
            const Icon = ICONS[indicator.id] ?? Home;
            return (
              <motion.div
                key={indicator.id}
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.6 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col items-center gap-3 text-center"
              >
                <motion.div
                  whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600 transition-colors duration-fast group-hover:text-orange-500"
                >
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </motion.div>
                <div>
                  <p className="font-semibold text-green-700">{indicator.title}</p>
                  <p className="mt-1 text-sm text-green-700/70 hidden sm:block">
                    {indicator.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
