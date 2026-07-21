import Link from "next/link";
import { getServerSession } from "next-auth";
import { Package, Quote, Building2, ShoppingBag } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  const [productCount, testimonialCount, clientCount, orderCount] = await Promise.all([
    prisma.product.count(),
    prisma.testimonial.count(),
    prisma.client.count(),
    prisma.order.count(),
  ]);

  const cards = [
    { label: "Produk", value: productCount, href: "/admin/products", icon: Package },
    { label: "Testimoni", value: testimonialCount, href: "/admin/testimonials", icon: Quote },
    { label: "Dipercaya Oleh", value: clientCount, href: "/admin/trusted-by", icon: Building2 },
    { label: "Order Masuk", value: orderCount, href: "/admin/orders", icon: ShoppingBag },
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
    </div>
  );
}
