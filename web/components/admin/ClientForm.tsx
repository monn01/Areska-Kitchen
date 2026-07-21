"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/Button";
import { createClient, updateClient, type ClientFormState } from "@/lib/actions/trusted-clients";
import type { Client } from "@prisma/client";

const inputClass =
  "w-full rounded-xl border border-green-200 bg-cream-50 px-4 py-2.5 text-green-700 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-orange-300";
const labelClass = "mb-1.5 block text-sm font-medium text-green-700";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="primary" disabled={pending}>
      {pending ? "Menyimpan..." : label}
    </Button>
  );
}

export function ClientForm({ client }: { client?: Client }) {
  const action = client ? updateClient.bind(null, client.id) : createClient;
  const [state, formAction] = useFormState<ClientFormState, FormData>(action, {});

  return (
    <form action={formAction} className="max-w-lg space-y-4">
      <div>
        <label htmlFor="name" className={labelClass}>
          Nama Instansi / Brand
        </label>
        <input id="name" name="name" defaultValue={client?.name} required className={inputClass} />
      </div>

      <div>
        <label htmlFor="logoUrl" className={labelClass}>
          URL Logo (opsional)
        </label>
        <input
          id="logoUrl"
          name="logoUrl"
          type="url"
          placeholder="https://..."
          defaultValue={client?.logoUrl ?? ""}
          className={inputClass}
        />
        <p className="mt-1 text-xs text-green-700/60">
          Kosongkan untuk pakai ikon placeholder di marquee.
        </p>
      </div>

      <div>
        <label htmlFor="row" className={labelClass}>
          Baris Marquee
        </label>
        <select id="row" name="row" defaultValue={client?.row ?? 1} className={inputClass}>
          <option value={1}>Baris 1 (kiri ke kanan)</option>
          <option value={2}>Baris 2 (kanan ke kiri)</option>
        </select>
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-green-700">
        <input
          type="checkbox"
          name="isVisible"
          defaultChecked={client?.isVisible ?? false}
          className="h-4 w-4 rounded border-green-300 text-green-600 focus:ring-orange-300"
        />
        Tampilkan di landing page
      </label>
      <p className="-mt-2 text-xs text-green-700/60">
        Aktifkan hanya setelah izin resmi penggunaan nama/logo instansi didapat (lihat
        TASKPLAN.md).
      </p>

      {state.error && <p className="text-sm text-[#B3432E]">{state.error}</p>}

      <SubmitButton label={client ? "Simpan Perubahan" : "Tambah"} />
    </form>
  );
}
