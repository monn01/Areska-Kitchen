import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { LogoutButton } from "@/components/admin/LogoutButton";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-cream-100 px-4 py-10 sm:px-8">
      <div className="mx-auto flex max-w-4xl items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-500">
            Admin
          </p>
          <h1 className="mt-1 font-heading text-2xl font-semibold text-green-700">
            Selamat datang, {session?.user?.name}
          </h1>
        </div>
        <LogoutButton />
      </div>

      <div className="mx-auto mt-10 max-w-4xl rounded-2xl bg-cream-50 p-8 text-green-700/80 shadow-[0_2px_12px_rgba(31,77,58,0.08)]">
        Dashboard manajemen produk, testimoni, dan &ldquo;Dipercaya Oleh&rdquo; menyusul di
        Fase 2 Phase 3.
      </div>
    </div>
  );
}
