import { getServerSession } from "next-auth";
import { ImageOff } from "lucide-react";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { STATUS_LABELS, STATUS_STYLES } from "@/lib/order-status";
import { cn } from "@/lib/utils";
import { AccountLogoutButton } from "@/components/account/AccountLogoutButton";
import { AddressForm } from "@/components/account/AddressForm";
import { AddressList } from "@/components/account/AddressList";
import { ProfileForm } from "@/components/account/ProfileForm";
import { MinimalHeader } from "@/components/ui/MinimalHeader";
import { MobileTabBar } from "@/components/ui/MobileTabBar";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  const userId = session!.user.id;

  const [user, orders, addresses] = await Promise.all([
    prisma.user.findUniqueOrThrow({ where: { id: userId } }),
    prisma.order.findMany({
      where: { userId },
      include: { items: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.address.findMany({ where: { userId }, orderBy: { isDefault: "desc" } }),
  ]);

  return (
    <div className="min-h-screen bg-cream-100 pb-16 lg:pb-0">
      <MinimalHeader />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-green-50">
              {user.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element -- URL bebas dari user
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <ImageOff className="h-5 w-5 text-green-300" strokeWidth={1.5} />
              )}
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-500">
                Akun Saya
              </p>
              <h1 className="mt-1 font-heading text-2xl font-semibold text-green-700">
                Halo, {user.name}
              </h1>
            </div>
          </div>
          <AccountLogoutButton />
        </div>

        <div className="mt-8 rounded-2xl bg-cream-50 p-6 shadow-[0_2px_12px_rgba(31,77,58,0.08)]">
          <h2 className="font-heading text-lg font-semibold text-green-700">Profil Saya</h2>
          <div className="mt-4">
            <ProfileForm user={user} />
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-cream-50 p-6 shadow-[0_2px_12px_rgba(31,77,58,0.08)]">
          <h2 className="font-heading text-lg font-semibold text-green-700">
            Riwayat Pesanan
          </h2>
          <div className="mt-4 space-y-3">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/order/${order.id}`}
                className="flex items-center justify-between rounded-xl border border-green-100 p-4 hover:bg-green-50"
              >
                <div>
                  <p className="text-sm font-medium text-green-700">
                    #{order.id.slice(-8)}
                  </p>
                  <p className="text-xs text-green-700/60">
                    {new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(
                      order.createdAt,
                    )}{" "}
                    · {order.items.length} item · Rp{" "}
                    {order.totalAmount.toLocaleString("id-ID")}
                  </p>
                </div>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium",
                    STATUS_STYLES[order.status],
                  )}
                >
                  {STATUS_LABELS[order.status]}
                </span>
              </Link>
            ))}
            {orders.length === 0 && (
              <p className="text-sm text-green-700/60">Belum ada pesanan.</p>
            )}
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-cream-50 p-6 shadow-[0_2px_12px_rgba(31,77,58,0.08)]">
          <h2 className="font-heading text-lg font-semibold text-green-700">
            Alamat Tersimpan
          </h2>
          <div className="mt-4">
            <AddressList addresses={addresses} />
          </div>
          <div className="mt-6 border-t border-green-100 pt-6">
            <AddressForm />
          </div>
        </div>
      </div>

      <MobileTabBar />
    </div>
  );
}
