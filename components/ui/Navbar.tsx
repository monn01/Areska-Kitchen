"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppLink, DEFAULT_WA_MESSAGE, cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Beranda", href: "#beranda" },
  { label: "Menu", href: "#menu" },
  { label: "Tentang Kami", href: "#tentang-kami" },
  { label: "Testimoni", href: "#testimoni" },
  { label: "Kontak", href: "#kontak" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[height,background-color,box-shadow] duration-base ease-in-out",
        scrolled
          ? "h-16 bg-cream-50/90 backdrop-blur-md shadow-sm"
          : "h-[88px] bg-transparent",
      )}
    >
      <div className="mx-auto flex h-full max-w-container items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#beranda" className="flex items-center gap-2 shrink-0">
          <Image
            src="/logo/logo-icon.png"
            alt="Areska Kitchen"
            width={40}
            height={40}
            className={cn(
              "rounded-full transition-all duration-base",
              scrolled ? "h-9 w-9" : "h-11 w-11",
            )}
            priority
          />
          <span className="hidden sm:block font-heading text-lg font-semibold text-green-600">
            Areska Kitchen
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-green-700 hover:text-orange-500 transition-colors duration-fast"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button
            href={buildWhatsAppLink(DEFAULT_WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            confirmBeforeNavigate
            className="text-sm px-5 py-2.5"
          >
            Pesan Sekarang
          </Button>
        </div>

        <button
          type="button"
          aria-label="Buka menu navigasi"
          className="lg:hidden flex h-11 w-11 items-center justify-center rounded-full text-green-700 hover:bg-green-50"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-6 w-6" strokeWidth={1.5} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-green-900/40 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed inset-y-0 right-0 z-50 w-[80%] max-w-xs bg-cream-50 shadow-2xl lg:hidden flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-green-100">
                <span className="font-heading text-lg font-semibold text-green-600">
                  Areska Kitchen
                </span>
                <button
                  type="button"
                  aria-label="Tutup menu navigasi"
                  className="flex h-11 w-11 items-center justify-center rounded-full text-green-700 hover:bg-green-50"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="h-6 w-6" strokeWidth={1.5} />
                </button>
              </div>
              <nav className="flex flex-col gap-1 px-4 py-6">
                {NAV_ITEMS.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15, delay: i * 0.04 }}
                    className="rounded-lg px-3 py-3 text-base font-medium text-green-700 hover:bg-green-50"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>
              <div className="mt-auto px-6 py-6">
                <Button
                  href={buildWhatsAppLink(DEFAULT_WA_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  className="w-full"
                  onClick={() => setMobileOpen(false)}
                >
                  Pesan Sekarang
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
