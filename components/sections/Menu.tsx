"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProductImage } from "@/components/ui/ProductImage";
import { menuCategories, menuItems, type MenuCategory } from "@/lib/data";
import { buildWhatsAppLink } from "@/lib/utils";

export function Menu() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>(menuCategories[0]);
  const shouldReduceMotion = useReducedMotion();

  const filteredItems = menuItems.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="bg-cream-50 py-20 sm:py-28">
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-500">
            Menu Kami
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-green-700 sm:text-4xl">
            Pilihan Menu untuk Setiap Acara
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-green-700/70">
            Harga di bawah adalah kisaran — harga final dikonfirmasi melalui
            WhatsApp sesuai jumlah pesanan dan kebutuhan acara Anda.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2 border-b border-green-100">
          {menuCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="relative px-4 py-3 text-sm font-medium sm:text-base"
            >
              <span
                className={
                  category === activeCategory
                    ? "text-green-700"
                    : "text-green-500 hover:text-green-700"
                }
              >
                {category}
              </span>
              {category === activeCategory && (
                <motion.span
                  layoutId="menu-tab-underline"
                  className="absolute inset-x-2 -bottom-px h-0.5 bg-orange-500"
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{
                  opacity: shouldReduceMotion ? 1 : 0,
                  y: shouldReduceMotion ? 0 : 16,
                  scale: shouldReduceMotion ? 1 : 0.98,
                }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card className="group h-full flex flex-col">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <div className="h-full w-full transition-transform duration-base ease-out group-hover:scale-105">
                      <ProductImage
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full"
                      />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-heading text-lg font-semibold text-green-700">
                      {item.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-green-700/70">
                      {item.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-green-700">
                        {item.priceRange}
                      </span>
                      <Button
                        href={buildWhatsAppLink(
                          `Halo Areska Kitchen, saya ingin pesan "${item.name}".`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="secondary"
                        className="px-4 py-2 text-xs"
                      >
                        Pesan
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
