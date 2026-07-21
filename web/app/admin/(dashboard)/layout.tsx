import Link from "next/link";
import { getServerSession } from "next-auth";
import { LayoutDashboard, Package, Quote, Building2, ShoppingBag } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { LogoutButton } from "@/components/admin/LogoutButton";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Produk", href: "/admin/products", icon: Package },
  { label: "Testimoni", href: "/admin/testimonials", icon: Quote },
  { label: "Dipercaya Oleh", href: "/admin/trusted-by", icon: Building2 },
  { label: "Order", href: "/admin/orders", icon: ShoppingBag },
];

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-cream-100 lg:flex">
      <aside className="border-b border-green-100 bg-cream-50 lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between px-6 py-5 lg:block">
          <div>
            <p className="font-heading text-lg font-semibold text-green-600">Areska Kitchen</p>
            <p className="text-xs text-green-700/60">{session?.user?.name}</p>
          </div>
          <div className="lg:hidden">
            <LogoutButton />
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-4 pb-4 lg:flex-col lg:px-4">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex shrink-0 items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-green-700/80 hover:bg-green-50 hover:text-green-700"
              >
                <Icon className="h-4 w-4" strokeWidth={1.5} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden px-4 pb-6 lg:block">
          <LogoutButton />
        </div>
      </aside>

      <main className="flex-1 px-4 py-8 sm:px-8">{children}</main>
    </div>
  );
}
