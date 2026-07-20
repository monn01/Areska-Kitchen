"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppLink, DEFAULT_WA_MESSAGE } from "@/lib/utils";

export function StickyMobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      const hero = document.getElementById("beranda");
      const footer = document.querySelector("footer");
      if (!hero) return;

      const pastHero = window.scrollY > hero.offsetHeight - 100;
      const nearFooter = footer
        ? window.scrollY + window.innerHeight > footer.getBoundingClientRect().top + window.scrollY
        : false;

      setVisible(pastHero && !nearFooter);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-green-100 bg-cream-50/95 p-3 backdrop-blur-md lg:hidden"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <Button
            href={buildWhatsAppLink(DEFAULT_WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            confirmBeforeNavigate
            className="w-full"
          >
            Pesan Sekarang
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
