import Link from "next/link";
import { getServerSession } from "next-auth";
import { Package, Quote, Building2, ShoppingBag, TrendingUp } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSalesSummary } from "@/lib/analytics";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  const [productCount, testimonialCount, clientCount, orderCount, sales] = await Promise.all([
    prisma.product.count(),
    prisma.testimonial.count(),
    prisma.client.count(),
    prisma.order.count(),
    getSalesSummary(),
  ]);

  const cards = [
    { label: "Produk", value: productCount, href: "/admin/products", icon: Package },
    { label: "Testimoni", value: testimonialCount, href: "/admin/testimonials", icon: Quote },
    { label: "Dipercaya Oleh", value: clientCount, href: "/admin/trusted-by", icon: Building2 },
    { label: "Order Masuk", value: orderCount, href: "/admin/orders", icon: ShoppingBag },
  ];

  const salesCards = [
    { label: "Hari Ini", ...sales.today },
    { label: "Minggu Ini", ...sales.week },
    { label: "Bulan Ini", ...sales.month },
  ];

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-500">Admin</p>
      <h1 className="mt-1 font-heading text-2xl font-semibold text-green-700">
        Selamat datang, {session?.user?.name}
      </h1>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="rounded-2xl bg-cream-50 p-5 shadow-[0_2px_12px_rgba(31,77,58,0.08)] transition-shadow hover:shadow-[0_4px_20px_rgba(31,77,58,0.12)]"
            >
              <Icon className="h-6 w-6 text-green-600" strokeWidth={1.5} />
              <p className="mt-3 text-2xl font-semibold text-green-700">{card.value}</p>
              <p className="text-sm text-green-700/70">{card.label}</p>
            </Link>
          );
        })}
      </div>

      <h2 className="mt-10 flex items-center gap-2 font-heading text-lg font-semibold text-green-700">
        <TrendingUp className="h-5 w-5" strokeWidth={1.5} />
        Penjualan
      </h2>
      <p className="mt-1 text-xs text-green-700/60">
        Dihitung dari order berstatus dikonfirmasi/diproses/selesai — laporan laba/rugi lengkap
        untuk pajak ada di Fase 3 (Dashboard Keuangan).
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {salesCards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl bg-cream-50 p-5 shadow-[0_2px_12px_rgba(31,77,58,0.08)]"
          >
            <p className="text-sm text-green-700/70">{card.label}</p>
            <p className="mt-2 text-2xl font-semibold text-green-700">
              Rp {card.revenue.toLocaleString("id-ID")}
            </p>
            <p className="text-sm text-green-700/60">{card.orderCount} order</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl bg-cream-50 p-6 shadow-[0_2px_12px_rgba(31,77,58,0.08)]">
        <h3 className="font-semibold text-green-700">Produk Terlaris</h3>
        <div className="mt-3 space-y-2">
          {sales.topProducts.length === 0 && (
            <p className="text-sm text-green-700/60">Belum ada data penjualan.</p>
          )}
          {sales.topProducts.map(
            (item, i) =>
              item.product && (
                <div key={item.product.id} className="flex items-center justify-between text-sm">
                  <span className="text-green-700">
                    {i + 1}. {item.product.name}
                  </span>
                  <span className="text-green-700/60">{item.quantity} terjual</span>
                </div>
              ),
          )}
        </div>
      </div>
    </div>
  );
}
