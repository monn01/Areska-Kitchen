"use client";

import { useMemo, useState } from "react";
import { Check, Plus } from "lucide-react";
import { ProductImage } from "@/components/ui/ProductImage";
import { CATEGORY_ORDER, CATEGORY_LABELS } from "@/lib/product-categories";
import { useCart } from "@/lib/cart-context";
import type { Product, ProductCategory } from "@prisma/client";

type SortOption = "popular" | "price-asc" | "price-desc" | "name";

const SORT_LABELS: Record<SortOption, string> = {
  popular: "Populer",
  "price-asc": "Harga Terendah",
  "price-desc": "Harga Tertinggi",
  name: "Nama A-Z",
};

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
    <button
      type="button"
      onClick={handleAdd}
      aria-label={`Tambah ${product.name} ke keranjang`}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-500 text-green-900 transition-transform duration-base hover:scale-110 active:scale-95"
    >
      {justAdded ? (
        <Check className="h-5 w-5" strokeWidth={2.5} />
      ) : (
        <Plus className="h-5 w-5" strokeWidth={2} />
      )}
    </button>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-cream-50 shadow-[0_2px_12px_rgba(31,77,58,0.08)] transition-shadow duration-base hover:shadow-[0_10px_28px_rgba(31,77,58,0.16)]">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <ProductImage
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full transition-transform duration-base ease-out group-hover:scale-105"
        />
        {product.isPopular && (
          <span className="absolute left-3 top-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-green-900">
            Populer
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-green-500">
          {CATEGORY_LABELS[product.category]}
        </p>
        <h3 className="mt-1 font-heading text-lg font-semibold text-green-700">{product.name}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-green-700/70">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-green-100 pt-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-green-500">Harga</p>
            <p className="text-sm font-semibold text-green-700">
              Rp {product.price.toLocaleString("id-ID")}
            </p>
          </div>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}

export function CatalogGrid({ products }: { products: Product[] }) {
  const availableCategories = CATEGORY_ORDER.filter((cat) =>
    products.some((p) => p.category === cat),
  );
  const [activeCategories, setActiveCategories] = useState<Set<ProductCategory>>(
    () => new Set(availableCategories),
  );
  const [sortBy, setSortBy] = useState<SortOption>("popular");

  function toggleCategory(cat: ProductCategory) {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
  }

  const filtered = useMemo(() => {
    const list = products.filter((p) => activeCategories.has(p.category));
    const sorted = [...list];
    switch (sortBy) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "popular":
      default:
        sorted.sort((a, b) => Number(b.isPopular) - Number(a.isPopular));
        break;
    }
    return sorted;
  }, [products, activeCategories, sortBy]);

  if (availableCategories.length === 0) {
    return (
      <p className="py-16 text-center text-green-700/60">Menu belum tersedia — segera hadir.</p>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      <aside className="lg:sticky lg:top-24 lg:h-fit">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-green-500">
          Kategori
        </h2>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 lg:flex-col">
          {availableCategories.map((cat) => (
            <label
              key={cat}
              className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-green-700"
            >
              <input
                type="checkbox"
                checked={activeCategories.has(cat)}
                onChange={() => toggleCategory(cat)}
                className="h-4 w-4 rounded border-green-300 text-green-600 focus:ring-orange-300"
              />
              {CATEGORY_LABELS[cat]}
            </label>
          ))}
        </div>
      </aside>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-green-100 pb-4">
          <p className="text-sm text-green-700/70">
            Menampilkan <span className="font-semibold text-green-700">{filtered.length}</span>{" "}
            dari {products.length} menu
          </p>
          <label className="flex items-center gap-2 text-sm text-green-700">
            Urutkan
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="rounded-lg border border-green-200 bg-cream-50 px-3 py-1.5 text-sm text-green-700 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              {Object.entries(SORT_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-green-700/60">
            Tidak ada menu yang cocok dengan filter kategori ini.
          </p>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
