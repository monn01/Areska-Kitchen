"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, Minus, Plus, X, Trash2 } from "lucide-react";
import { ProductImage } from "@/components/ui/ProductImage";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cart-context";

export function CartButton() {
  const { items, itemCount, subtotal, updateQuantity, removeItem, isCartOpen, openCart, closeCart } =
    useCart();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  function goToCheckout() {
    closeCart();
    router.push("/checkout");
  }

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  return (
    <>
      <motion.button
        type="button"
        aria-label="Buka keranjang"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative flex h-11 w-11 items-center justify-center rounded-full text-green-700 hover:bg-green-50"
        onClick={openCart}
      >
        <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
        {itemCount > 0 && (
          <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-semibold text-green-900">
            {itemCount}
          </span>
        )}
      </motion.button>

      {/* Portal ke document.body — kalau drawer ini dirender sebagai descendant elemen yang
          punya backdrop-filter/transform (mis. <header> saat solid), elemen itu jadi containing
          block untuk position:fixed di dalamnya dan bikin drawer salah posisi/transparan (bug
          yang sama seperti drawer navigasi mobile, lihat Navbar.tsx). Portal menghindari kelas
          bug ini sama sekali, di manapun tombol keranjang ini nanti diletakkan. */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isCartOpen && (
              <>
                <motion.div
                  className="fixed inset-0 z-40 bg-green-900/40 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={closeCart}
                />
                <motion.div
                  className="fixed inset-y-0 right-0 z-50 flex w-[90%] max-w-md flex-col bg-cream-50 shadow-2xl"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
                >
                  <div className="flex items-center justify-between border-b border-green-100 px-6 py-5">
                    <span className="font-heading text-lg font-semibold text-green-600">
                      Keranjang
                    </span>
                    <button
                      type="button"
                      aria-label="Tutup keranjang"
                      className="flex h-11 w-11 items-center justify-center rounded-full text-green-700 hover:bg-green-50"
                      onClick={closeCart}
                    >
                      <X className="h-6 w-6" strokeWidth={1.5} />
                    </button>
                  </div>

                  {items.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                      <ShoppingBag
                        className="h-10 w-10 text-green-300"
                        strokeWidth={1.5}
                      />
                      <p className="text-green-700/70">Keranjang masih kosong.</p>
                    </div>
                  ) : (
                    <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
                      {items.map((item) => (
                        <div key={item.productId} className="flex gap-3">
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                            <ProductImage
                              src={item.imageUrl}
                              alt={item.name}
                              className="h-full w-full"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-green-700">
                              {item.name}
                            </p>
                            <p className="text-xs text-green-700/60">
                              Rp {item.price.toLocaleString("id-ID")}
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                              <button
                                type="button"
                                aria-label="Kurangi jumlah"
                                className="flex h-7 w-7 items-center justify-center rounded-full border border-green-200 text-green-700 hover:bg-green-50"
                                onClick={() =>
                                  updateQuantity(item.productId, item.quantity - 1)
                                }
                              >
                                <Minus className="h-3.5 w-3.5" strokeWidth={2} />
                              </button>
                              <span className="w-6 text-center text-sm font-medium text-green-700">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                aria-label="Tambah jumlah"
                                className="flex h-7 w-7 items-center justify-center rounded-full border border-green-200 text-green-700 hover:bg-green-50"
                                onClick={() =>
                                  updateQuantity(item.productId, item.quantity + 1)
                                }
                              >
                                <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                              </button>
                              <button
                                type="button"
                                aria-label={`Hapus ${item.name} dari keranjang`}
                                className="ml-auto text-[#B3432E] hover:underline"
                                onClick={() => removeItem(item.productId)}
                              >
                                <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="border-t border-green-100 px-6 py-6">
                    <div className="flex items-center justify-between text-sm font-medium text-green-700">
                      <span>Subtotal</span>
                      <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                    </div>
                    <p className="mt-1 text-xs text-green-700/60">
                      Ongkir & diskon dihitung di halaman checkout.
                    </p>
                    <Button
                      type="button"
                      variant="primary"
                      disabled={items.length === 0}
                      onClick={goToCheckout}
                      className="mt-4 w-full"
                    >
                      Checkout
                    </Button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
