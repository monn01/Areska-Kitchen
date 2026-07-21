import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { deleteVoucher } from "@/lib/actions/vouchers";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function VouchersAdminPage() {
  const vouchers = await prisma.voucher.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold text-green-700">Voucher</h1>
        <Link
          href="/admin/vouchers/new"
          className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-green-900 hover:bg-orange-600"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          Tambah Voucher
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl bg-cream-50 shadow-[0_2px_12px_rgba(31,77,58,0.08)]">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-green-100 text-green-700/60">
              <th className="px-5 py-3 font-medium">Kode</th>
              <th className="px-5 py-3 font-medium">Diskon</th>
              <th className="px-5 py-3 font-medium">Terpakai</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {vouchers.map((v) => (
              <tr key={v.id} className="border-b border-green-50 last:border-0">
                <td className="px-5 py-3 font-mono font-medium text-green-700">{v.code}</td>
                <td className="px-5 py-3 text-green-700/70">
                  {v.discountType === "PERCENTAGE"
                    ? `${v.discountValue}%`
                    : `Rp ${v.discountValue.toLocaleString("id-ID")}`}
                </td>
                <td className="px-5 py-3 text-green-700/70">
                  {v.usageCount}
                  {v.usageLimit ? ` / ${v.usageLimit}` : ""}
                </td>
                <td className="px-5 py-3">
                  <span
                    className={
                      v.isActive
                        ? "rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600"
                        : "rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500"
                    }
                  >
                    {v.isActive ? "Aktif" : "Nonaktif"}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      href={`/admin/vouchers/${v.id}`}
                      className="flex items-center gap-1 text-sm font-medium text-green-600 hover:underline"
                    >
                      <Pencil className="h-3.5 w-3.5" strokeWidth={2} />
                      Edit
                    </Link>
                    <DeleteButton
                      action={deleteVoucher.bind(null, v.id)}
                      confirmMessage={`Hapus voucher "${v.code}"?`}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {vouchers.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-green-700/60">
                  Belum ada voucher.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
