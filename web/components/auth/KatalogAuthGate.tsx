"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AuthForms } from "@/components/auth/AuthForms";

// Portal ke document.body — pola standar proyek ini untuk semua overlay fixed (lihat
// CartButton.tsx), supaya tidak kena bug containing-block dari ancestor manapun.
export function KatalogAuthGate() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-green-900/50 px-4 py-10 backdrop-blur-sm"
    >
      <div className="w-full max-w-sm rounded-3xl bg-cream-50 p-8 shadow-2xl">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-green-500">
          Areska Kitchen
        </p>
        <h2 className="mt-2 text-center font-heading text-xl font-semibold text-green-700">
          Masuk untuk Lihat & Pesan Menu
        </h2>
        <p className="mt-2 text-center text-sm text-green-700/70">
          Daftar atau masuk dulu supaya kami bisa proses pesanan dan kirim update
          status lewat WhatsApp.
        </p>
        <div className="mt-6 flex justify-center">
          <AuthForms onSuccess={() => router.refresh()} />
        </div>
      </div>
    </motion.div>,
    document.body,
  );
}
