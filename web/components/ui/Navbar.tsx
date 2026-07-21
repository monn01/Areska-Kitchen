"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X, MessageCircle, ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppLink, DEFAULT_WA_MESSAGE, cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang Kami", href: "#tentang-kami" },
  { label: "Menu", href: "/katalog" },
  { label: "Testimoni", href: "#testimoni" },
  { label: "Kontak", href: "#kontak" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState(NAV_ITEMS[0].href);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Hanya item berupa anchor (#...) yang punya section untuk dipantau — item seperti
    // "/katalog" adalah link ke halaman lain, bukan section di halaman ini.
    const sections = NAV_ITEMS.filter((item) => item.href.startsWith("#"))
      .map((item) => ({
        href: item.href,
        el: document.querySelector<HTMLElement>(item.href),
      }))
      .filter((s): s is { href: string; el: HTMLElement } => s.el !== null)
      // Urutkan sesuai posisi asli di DOM (bukan urutan NAV_ITEMS) supaya deteksi
      // section aktif akurat walau urutan menu di navbar berbeda dari urutan section di halaman.
      .sort((a, b) => {
        const position = a.el.compareDocumentPosition(b.el);
        if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
        if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1;
        return 0;
      });

    if (sections.length === 0) return;

    let ticking = false;

    function updateActiveSection() {
      ticking = false;
      const referenceLine = window.innerHeight * 0.35;
      let current = sections[0];
      for (const section of sections) {
        if (section.el.getBoundingClientRect().top <= referenceLine) {
          current = section;
        }
      }
      setActiveHref(current.href);
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateActiveSection);
    }

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    // Kunci scroll body tanpa mengubah posisi scroll asli (teknik position:fixed) —
    // menghindari bug di beberapa browser mobile yang mereset scrollY saat overflow
    // di-hidden secara langsung, yang sebelumnya membuat state `scrolled` ikut ter-reset
    // dan header jadi transparan tiba-tiba saat drawer dibuka di section selain Beranda.
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [mobileOpen]);

  // Selama drawer mobile terbuka, header selalu tampil solid — konsisten di semua
  // section, tidak bergantung pada state `scrolled` yang bisa berubah saat drawer dibuka/ditutup.
  const headerSolid = scrolled || mobileOpen;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[height,background-color,box-shadow] duration-base ease-in-out",
          headerSolid
            ? "h-16 bg-cream-50/90 shadow-sm backdrop-blur-md"
            : "h-[88px] bg-transparent",
        )}
      >
        <div className="mx-auto flex h-full max-w-container items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#beranda" className="flex shrink-0 items-center gap-2">
            <span
              className={cn(
                "relative block shrink-0 overflow-hidden rounded-full transition-all duration-base",
                headerSolid ? "h-9 w-9" : "h-11 w-11",
              )}
            >
              <Image
                src="/logo/logo-icon.png"
                alt="Areska Kitchen"
                fill
                sizes="44px"
                className="object-cover"
                priority
              />
            </span>
            <span className="hidden font-heading text-lg font-semibold text-green-600 sm:block">
              Areska Kitchen
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = item.href === activeHref;
              return (
                <motion.a
                  key={item.href}
                  href={item.href}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0, scale: 0.96 }}
                  transition={{ duration: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
                  className={cn(
                    "group relative py-1 text-sm font-medium after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-center after:scale-x-0 after:rounded-full after:bg-orange-400 after:transition-transform after:duration-fast hover:after:scale-x-100",
                    isActive
                      ? "text-green-700"
                      : "text-green-700/80 hover:text-orange-500",
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-underline"
                      className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-orange-500"
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </motion.a>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button
              href={buildWhatsAppLink(DEFAULT_WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              confirmBeforeNavigate
              className="gap-1.5 px-5 py-2.5 text-sm"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
              Chat WhatsApp
            </Button>
            <Button href="/katalog" variant="primary" className="gap-1.5 px-5 py-2.5 text-sm">
              <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
              Pesan Online
            </Button>
          </div>

          <motion.button
            type="button"
            aria-label="Buka menu navigasi"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
            className="flex h-11 w-11 items-center justify-center rounded-full text-green-700 hover:bg-green-50 lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-6 w-6" strokeWidth={1.5} />
          </motion.button>
        </div>
      </header>

      {/* Overlay & drawer mobile sengaja ditaruh di luar <header> (bukan di dalamnya) —
          <header> punya backdrop-blur yang menjadikannya containing block untuk elemen
          fixed di dalamnya, sehingga posisi/tinggi drawer salah hitung dan background-nya
          jadi transparan di bagian bawah. Di luar <header>, posisinya kembali mengacu ke
          layar penuh seperti seharusnya. */}
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
              className="fixed inset-y-0 right-0 z-50 flex w-[80%] max-w-xs flex-col bg-cream-50 shadow-2xl lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
            >
              <div className="flex items-center justify-between border-b border-green-100 px-6 py-5">
                <span className="font-heading text-lg font-semibold text-green-600">
                  Areska Kitchen
                </span>
                <motion.button
                  type="button"
                  aria-label="Tutup menu navigasi"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
                  className="flex h-11 w-11 items-center justify-center rounded-full text-green-700 hover:bg-green-50"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="h-6 w-6" strokeWidth={1.5} />
                </motion.button>
              </div>
              <nav className="flex flex-col gap-1 px-4 py-6">
                {NAV_ITEMS.map((item, i) => {
                  const isActive = item.href === activeHref;
                  return (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.15, delay: i * 0.04 }}
                      className={cn(
                        "relative flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium hover:bg-green-50",
                        isActive ? "text-green-700" : "text-green-700/80",
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-bar-mobile"
                          className="absolute left-0 h-5 w-1 rounded-full bg-orange-500"
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        />
                      )}
                      <span className={isActive ? "ml-3" : ""}>{item.label}</span>
                    </motion.a>
                  );
                })}
              </nav>
              <div className="mt-auto space-y-2.5 px-6 py-6">
                <Button
                  href="/katalog"
                  variant="primary"
                  className="w-full gap-1.5"
                  onClick={() => setMobileOpen(false)}
                >
                  <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
                  Pesan Online
                </Button>
                <Button
                  href={buildWhatsAppLink(DEFAULT_WA_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  confirmBeforeNavigate
                  className="w-full gap-1.5"
                  onClick={() => setMobileOpen(false)}
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
                  Chat WhatsApp
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
