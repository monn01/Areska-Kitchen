"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

/** Tab bar bawah khusus mobile untuk halaman "browsing" (katalog, akun, tracking order) —
 * pola umum aplikasi e-commerce (Shopee/Tokopedia) supaya user gampang balik ke
 * beranda/akun tanpa harus scroll ke atas cari ikon kecil di header. Sengaja TIDAK dipasang
 * di /checkout (jaga fokus, praktik umum e-commerce supaya tidak ada distraksi navigasi saat
 * bayar) dan di halaman detail produk (digantikan bar "Tambahkan ke Keranjang" yang lebih
 * relevan di titik itu). */
export function MobileTabBar() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();

  const katalogActive = pathname.startsWith("/katalog");
  const accountActive = pathname.startsWith("/account");

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 flex items-stretch justify-around border-t border-green-100 bg-cream-50/95 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <Link
        href="/"
        className="flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium text-green-700/50"
      >
        <Home className="h-5 w-5" strokeWidth={1.5} />
        Beranda
      </Link>

      <Link
        href="/katalog"
        className={cn(
          "flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium",
          katalogActive ? "text-green-700" : "text-green-700/50",
        )}
      >
        <LayoutGrid className="h-5 w-5" strokeWidth={katalogActive ? 2 : 1.5} />
        Katalog
      </Link>

      <button
        type="button"
        onClick={openCart}
        className="flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium text-green-700/50"
      >
        <span className="relative">
          <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
          {itemCount > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-orange-500 px-0.5 text-[9px] font-semibold text-green-900">
              {itemCount}
            </span>
          )}
        </span>
        Keranjang
      </button>

      <Link
        href="/account"
        className={cn(
          "flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium",
          accountActive ? "text-green-700" : "text-green-700/50",
        )}
      >
        <User className="h-5 w-5" strokeWidth={accountActive ? 2 : 1.5} />
        Akun
      </Link>
    </nav>
  );
}
