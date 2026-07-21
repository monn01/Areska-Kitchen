"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ShoppingBag } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProductImage } from "@/components/ui/ProductImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CATEGORY_ORDER, CATEGORY_LABELS } from "@/lib/product-categories";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@prisma/client";

function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd() {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category,
    });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  }

  return (
    <Button
      type="button"
      variant="secondary"
      onClick={handleAdd}
      className="gap-1.5 px-4 py-2 text-xs"
    >
      {justAdded ? (
        <>
          <Check className="h-3.5 w-3.5" strokeWidth={2} />
          Ditambahkan
        </>
      ) : (
        <>
          <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.5} />
          Keranjang
        </>
      )}
    </Button>
  );
}

export function MenuGrid({ products }: { products: Product[] }) {
  const availableCategories = CATEGORY_ORDER.filter((cat) =>
    products.some((p) => p.category === cat),
  );
  const [activeCategory, setActiveCategory] = useState(availableCategories[0]);
  const shouldReduceMotion = useReducedMotion();

  const filteredItems = products.filter((item) => item.category === activeCategory);

  if (availableCategories.length === 0) {
    return (
      <p className="mt-10 text-center text-green-700/60">
        Menu belum tersedia — segera hadir.
      </p>
    );
  }

  return (
    <>
      <ScrollReveal
        variant="fade-up"
        delay={0.1}
        className="mt-10 flex flex-wrap justify-center gap-2 border-b border-green-100"
      >
        {availableCategories.map((category) => (
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
              {CATEGORY_LABELS[category]}
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
      </ScrollReveal>

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
                    <ProductImage src={item.imageUrl} alt={item.name} className="h-full w-full" />
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
                      Rp {item.price.toLocaleString("id-ID")}
                    </span>
                    <AddToCartButton product={item} />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
