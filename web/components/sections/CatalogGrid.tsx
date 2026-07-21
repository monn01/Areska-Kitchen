"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, Plus } from "lucide-react";
import { ProductImage } from "@/components/ui/ProductImage";
import {
  CATEGORY_ORDER,
  CATEGORY_LABELS,
  OCCASION_ORDER,
  OCCASION_LABELS,
} from "@/lib/product-categories";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";
import type { Product, ProductCategory, ProductOccasion } from "@prisma/client";

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

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
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
    <Link
      href={`/katalog/${product.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-cream-50 shadow-[0_2px_12px_rgba(31,77,58,0.08)] transition-shadow duration-base hover:shadow-[0_10px_28px_rgba(31,77,58,0.16)]"
    >
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
    </Link>
  );
}

const THUMB_CLASSES =
  "pointer-events-none absolute inset-x-0 top-1/2 h-1.5 w-full -translate-y-1/2 appearance-none bg-transparent " +
  "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-cream-50 [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:cursor-pointer " +
  "[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-cream-50 [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:cursor-pointer";

function PriceRangeFilter({
  min,
  max,
  value,
  onChange,
}: {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}) {
  const [lo, hi] = value;
  const span = Math.max(max - min, 1);
  const leftPct = ((lo - min) / span) * 100;
  const rightPct = ((hi - min) / span) * 100;

  if (min >= max) return null;

  return (
    <div>
      <div className="relative h-4">
        <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-green-100" />
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-orange-400"
          style={{ left: `${leftPct}%`, right: `${100 - rightPct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={lo}
          onChange={(e) => onChange([Math.min(Number(e.target.value), hi), hi])}
          className={THUMB_CLASSES}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={hi}
          onChange={(e) => onChange([lo, Math.max(Number(e.target.value), lo)])}
          className={THUMB_CLASSES}
        />
      </div>
      <div className="mt-2 flex justify-between text-xs text-green-700/70">
        <span>Rp {lo.toLocaleString("id-ID")}</span>
        <span>Rp {hi.toLocaleString("id-ID")}</span>
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
  const [activeOccasions, setActiveOccasions] = useState<Set<ProductOccasion>>(() => new Set());
  const [sortBy, setSortBy] = useState<SortOption>("popular");

  const priceBounds = useMemo<[number, number]>(() => {
    if (products.length === 0) return [0, 0];
    const prices = products.map((p) => p.price);
    return [Math.min(...prices), Math.max(...prices)];
  }, [products]);
  const [priceRange, setPriceRange] = useState<[number, number]>(priceBounds);

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

  function toggleOccasion(occasion: ProductOccasion) {
    setActiveOccasions((prev) => {
      const next = new Set(prev);
      if (next.has(occasion)) {
        next.delete(occasion);
      } else {
        next.add(occasion);
      }
      return next;
    });
  }

  const filtered = useMemo(() => {
    const list = products.filter(
      (p) =>
        activeCategories.has(p.category) &&
        p.price >= priceRange[0] &&
        p.price <= priceRange[1] &&
        (activeOccasions.size === 0 || p.occasions.some((o) => activeOccasions.has(o))),
    );
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
  }, [products, activeCategories, activeOccasions, priceRange, sortBy]);

  if (availableCategories.length === 0) {
    return (
      <p className="py-16 text-center text-green-700/60">Menu belum tersedia — segera hadir.</p>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      <aside className="space-y-8 lg:sticky lg:top-24 lg:h-fit">
        <div>
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
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-green-500">
            Harga (per unit)
          </h2>
          <div className="mt-4">
            <PriceRangeFilter
              min={priceBounds[0]}
              max={priceBounds[1]}
              value={priceRange}
              onChange={setPriceRange}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-green-500">
            Occasion
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {OCCASION_ORDER.map((occasion) => {
              const active = activeOccasions.has(occasion);
              return (
                <button
                  key={occasion}
                  type="button"
                  onClick={() => toggleOccasion(occasion)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-fast",
                    active
                      ? "border-green-600 bg-green-600 text-cream-50"
                      : "border-green-200 text-green-700 hover:bg-green-50",
                  )}
                >
                  {OCCASION_LABELS[occasion]}
                </button>
              );
            })}
          </div>
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
            Tidak ada menu yang cocok dengan filter ini.
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
