"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Plus, SlidersHorizontal, X } from "lucide-react";
import { ProductImage } from "@/components/ui/ProductImage";
import { Button } from "@/components/ui/Button";
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
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500 text-green-900 transition-transform duration-base hover:scale-110 active:scale-95 sm:h-11 sm:w-11"
    >
      {justAdded ? (
        <Check className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.5} />
      ) : (
        <Plus className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
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
          <span className="absolute left-2 top-2 rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-semibold text-green-900 sm:left-3 sm:top-3 sm:px-3 sm:py-1 sm:text-xs">
            Populer
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <p className="text-[10px] font-medium uppercase tracking-wide text-green-500 sm:text-xs">
          {CATEGORY_LABELS[product.category]}
        </p>
        <h3 className="mt-1 font-heading text-sm font-semibold text-green-700 sm:text-lg">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 flex-1 text-xs leading-relaxed text-green-700/70 sm:mt-2 sm:text-sm">
          {product.description}
        </p>
        <div className="mt-3 flex items-center justify-between gap-2 border-t border-green-100 pt-3 sm:mt-4 sm:gap-3 sm:pt-4">
          <div>
            <p className="hidden text-xs uppercase tracking-wide text-green-500 sm:block">
              Harga
            </p>
            <p className="text-xs font-semibold text-green-700 sm:text-sm">
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

interface FilterState {
  availableCategories: ProductCategory[];
  activeCategories: Set<ProductCategory>;
  toggleCategory: (cat: ProductCategory) => void;
  priceBounds: [number, number];
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  activeOccasions: Set<ProductOccasion>;
  toggleOccasion: (occasion: ProductOccasion) => void;
}

function FilterPanel({
  availableCategories,
  activeCategories,
  toggleCategory,
  priceBounds,
  priceRange,
  setPriceRange,
  activeOccasions,
  toggleOccasion,
}: FilterState) {
  return (
    <div className="space-y-8">
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
    </div>
  );
}

function SortDropdown({
  value,
  onChange,
  className,
}: {
  value: SortOption;
  onChange: (value: SortOption) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 rounded-full border border-green-200 bg-cream-50 px-4 py-2 text-sm text-green-700 hover:border-green-400"
      >
        <span className="truncate">{SORT_LABELS[value]}</span>
        <ChevronDown
          className={cn("h-4 w-4 shrink-0 transition-transform duration-fast", open && "rotate-180")}
          strokeWidth={2}
        />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-20 mt-2 w-48 overflow-hidden rounded-xl border border-green-100 bg-cream-50 py-1 shadow-[0_8px_24px_rgba(31,77,58,0.14)]">
          {Object.entries(SORT_LABELS).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                onChange(key as SortOption);
                setOpen(false);
              }}
              className={cn(
                "block w-full px-4 py-2 text-left text-sm transition-colors duration-fast hover:bg-green-50",
                key === value ? "font-semibold text-green-700" : "text-green-700/80",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileFilterSheet({
  open,
  onClose,
  filterState,
}: {
  open: boolean;
  onClose: () => void;
  filterState: FilterState;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-green-900/40 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-x-0 bottom-0 z-50 flex max-h-[85vh] flex-col rounded-t-3xl bg-cream-50 shadow-2xl lg:hidden"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-green-100 px-6 py-4">
              <span className="font-heading text-lg font-semibold text-green-700">Filter</span>
              <button
                type="button"
                aria-label="Tutup filter"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full text-green-700 hover:bg-green-50"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <FilterPanel {...filterState} />
            </div>
            <div className="shrink-0 border-t border-green-100 p-4">
              <Button type="button" variant="primary" onClick={onClose} className="w-full">
                Terapkan Filter
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
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
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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

  const hasActiveFilters =
    activeCategories.size < availableCategories.length ||
    activeOccasions.size > 0 ||
    priceRange[0] > priceBounds[0] ||
    priceRange[1] < priceBounds[1];

  if (availableCategories.length === 0) {
    return (
      <p className="py-16 text-center text-green-700/60">Menu belum tersedia — segera hadir.</p>
    );
  }

  const filterState: FilterState = {
    availableCategories,
    activeCategories,
    toggleCategory,
    priceBounds,
    priceRange,
    setPriceRange,
    activeOccasions,
    toggleOccasion,
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      <aside className="hidden lg:block lg:sticky lg:top-24 lg:h-fit">
        <FilterPanel {...filterState} />
      </aside>

      <div>
        {/* Mobile: baris ringkas Filter + Urutkan (bukan filter penuh di awal halaman) —
            filter lengkap dibuka lewat bottom sheet, mengikuti pola e-commerce besar. */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className={cn(
              "relative flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium",
              hasActiveFilters
                ? "border-green-600 bg-green-600 text-cream-50"
                : "border-green-200 text-green-700",
            )}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={2} />
            Filter
            {hasActiveFilters && (
              <span className="ml-0.5 h-1.5 w-1.5 rounded-full bg-orange-400" />
            )}
          </button>
          <SortDropdown value={sortBy} onChange={setSortBy} className="flex-1" />
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-b border-green-100 pb-4 lg:mt-0">
          <p className="text-sm text-green-700/70">
            Menampilkan <span className="font-semibold text-green-700">{filtered.length}</span>{" "}
            dari {products.length} menu
          </p>
          <div className="hidden items-center gap-2 text-sm text-green-700 lg:flex">
            Urutkan
            <SortDropdown value={sortBy} onChange={setSortBy} className="w-44" />
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-green-700/60">
            Tidak ada menu yang cocok dengan filter ini.
          </p>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-6 xl:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <MobileFilterSheet
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        filterState={filterState}
      />
    </div>
  );
}
