import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { deleteClient } from "@/lib/actions/trusted-clients";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function TrustedByAdminPage() {
  const clients = await prisma.client.findMany({ orderBy: [{ row: "asc" }, { name: "asc" }] });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold text-green-700">Dipercaya Oleh</h1>
        <Link
          href="/admin/trusted-by/new"
          className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-green-900 hover:bg-orange-600"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          Tambah
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl bg-cream-50 shadow-[0_2px_12px_rgba(31,77,58,0.08)]">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-green-100 text-green-700/60">
              <th className="px-5 py-3 font-medium">Nama</th>
              <th className="px-5 py-3 font-medium">Baris</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.id} className="border-b border-green-50 last:border-0">
                <td className="px-5 py-3 font-medium text-green-700">{c.name}</td>
                <td className="px-5 py-3 text-green-700/70">Baris {c.row}</td>
                <td className="px-5 py-3">
                  <span
                    className={
                      c.isVisible
                        ? "rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600"
                        : "rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500"
                    }
                  >
                    {c.isVisible ? "Tampil" : "Disembunyikan"}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      href={`/admin/trusted-by/${c.id}`}
                      className="flex items-center gap-1 text-sm font-medium text-green-600 hover:underline"
                    >
                      <Pencil className="h-3.5 w-3.5" strokeWidth={2} />
                      Edit
                    </Link>
                    <DeleteButton action={deleteClient.bind(null, c.id)} confirmMessage={`Hapus "${c.name}"?`} />
                  </div>
                </td>
              </tr>
            ))}
            {clients.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-green-700/60">
                  Belum ada data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
