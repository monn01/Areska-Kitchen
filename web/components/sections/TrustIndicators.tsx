"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Home, Leaf, ShieldCheck, Heart, type LucideIcon } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
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
    <section className="border-y border-green-100 bg-cream-100">
      <div className="mx-auto max-w-container px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6">
          {trustIndicators.map((indicator, i) => {
            const Icon = ICONS[indicator.id] ?? Home;
            return (
              <ScrollReveal
                key={indicator.id}
                variant="fade-up"
                delay={i * 0.08}
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
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
