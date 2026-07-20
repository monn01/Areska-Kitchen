"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Landmark, Building2, School, Users, type LucideIcon } from "lucide-react";
import { trustedClientTypes } from "@/lib/data";

const ICONS: Record<string, LucideIcon> = {
  gov: Landmark,
  bapeda: Building2,
  schools: School,
  public: Users,
};

export function TrustedBy() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-green-50/60 py-16 sm:py-20">
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-500">
            Dipercaya Oleh
          </p>
          <h2 className="mt-3 font-heading text-2xl font-semibold text-green-700 sm:text-3xl">
            Instansi, Sekolah, dan Masyarakat Umum
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-green-700/70">
            Areska Kitchen telah melayani berbagai jenis acara di Pangkalpinang
            dan sekitarnya — dari jamuan resmi hingga acara keluarga.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {trustedClientTypes.map((client, i) => {
            const Icon = ICONS[client.id] ?? Users;
            return (
              <motion.div
                key={client.id}
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-3 rounded-2xl border border-green-100 bg-cream-50 px-4 py-6 text-center"
              >
                <Icon className="h-7 w-7 text-green-600" strokeWidth={1.5} />
                <span className="text-sm font-medium text-green-700">{client.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
