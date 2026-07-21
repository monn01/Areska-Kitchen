"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, Check, MessageCircle } from "lucide-react";
import { ProductImage } from "@/components/ui/ProductImage";
import { Button } from "@/components/ui/Button";
import { CATEGORY_LABELS } from "@/lib/product-categories";
import { useCart } from "@/lib/cart-context";
import { buildWhatsAppLink } from "@/lib/utils";
import type { Product } from "@prisma/client";

export function ProductDetail({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        category: product.category,
      },
      quantity,
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  }

  const total = product.price * quantity;

  return (
    <div className="mx-auto max-w-container px-4 pb-28 pt-10 sm:px-6 sm:pt-12 lg:px-8 lg:pb-12">
      <Link
        href="/katalog"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={2} />
        Kembali ke Katalog
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl">
            <ProductImage src={product.imageUrl} alt={product.name} className="h-full w-full" />
            {product.isPopular && (
              <span className="absolute left-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-green-900">
                Populer
              </span>
            )}
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-green-500">
            {CATEGORY_LABELS[product.category]}
          </p>
          <h1 className="mt-2 font-heading text-3xl font-semibold text-green-700 sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-green-700/80">
            {product.description}
          </p>

          {relatedProducts.length > 0 && (
            <div className="mt-12">
              <h2 className="font-heading text-lg font-semibold text-green-700">
                Menu Lainnya dari {CATEGORY_LABELS[product.category]}
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                {relatedProducts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/katalog/${p.id}`}
                    className="group overflow-hidden rounded-2xl bg-cream-50 shadow-[0_2px_12px_rgba(31,77,58,0.08)] transition-shadow duration-base hover:shadow-[0_8px_20px_rgba(31,77,58,0.14)]"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <ProductImage
                        src={p.imageUrl}
                        alt={p.name}
                        className="h-full w-full transition-transform duration-base ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="p-3">
                      <p className="truncate text-sm font-semibold text-green-700">{p.name}</p>
                      <p className="text-xs text-green-700/70">
                        Rp {p.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="hidden h-fit rounded-2xl border border-green-100 bg-cream-50 p-6 lg:block lg:sticky lg:top-24">
          <p className="text-xs uppercase tracking-wide text-green-500">Harga per Unit</p>
          <p className="mt-1 font-heading text-2xl font-semibold text-green-700">
            Rp {product.price.toLocaleString("id-ID")}
          </p>

          <div className="mt-6 border-t border-green-100 pt-6">
            <p className="text-sm font-medium text-green-700">Jumlah Pesanan</p>
            <div className="mt-2 flex items-center gap-3">
              <button
                type="button"
                aria-label="Kurangi jumlah"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-green-200 text-green-700 hover:bg-green-50"
              >
                <Minus className="h-4 w-4" strokeWidth={2} />
              </button>
              <span className="w-10 text-center text-lg font-semibold text-green-700">
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Tambah jumlah"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-green-200 text-green-700 hover:bg-green-50"
              >
                <Plus className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-green-100 pt-6">
            <span className="text-sm text-green-700/70">Estimasi Total</span>
            <span className="font-heading text-lg font-semibold text-green-700">
              Rp {total.toLocaleString("id-ID")}
            </span>
          </div>

          <Button
            type="button"
            variant="primary"
            onClick={handleAdd}
            className="mt-6 w-full gap-2"
          >
            {added && <Check className="h-4 w-4" strokeWidth={2.5} />}
            {added ? "Ditambahkan ke Keranjang" : "Tambahkan ke Keranjang"}
          </Button>
          <Button
            href={buildWhatsAppLink(`Halo Areska Kitchen, saya ingin tanya soal ${product.name}.`)}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            confirmBeforeNavigate
            className="mt-3 w-full gap-2"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
            Konsultasi via WhatsApp
          </Button>
        </div>
      </div>

      {/* Mobile only: bar tetap terlihat di bawah layar tanpa perlu discroll — pengganti
          kartu sidebar yang di desktop letaknya di kolom kanan. */}
      <div
        className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 border-t border-green-100 bg-cream-50/95 p-3 backdrop-blur-md lg:hidden"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            aria-label="Kurangi jumlah"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-green-200 text-green-700 hover:bg-green-50"
          >
            <Minus className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
          <span className="w-6 text-center text-sm font-semibold text-green-700">{quantity}</span>
          <button
            type="button"
            aria-label="Tambah jumlah"
            onClick={() => setQuantity((q) => q + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-green-200 text-green-700 hover:bg-green-50"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
        </div>
        <Button type="button" variant="primary" onClick={handleAdd} className="flex-1 gap-2">
          {added ? (
            <>
              <Check className="h-4 w-4" strokeWidth={2.5} />
              Ditambahkan
            </>
          ) : (
            `Tambah — Rp ${total.toLocaleString("id-ID")}`
          )}
        </Button>
      </div>
    </div>
  );
}
