"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/Button";
import { createAddress, type AddressFormState } from "@/lib/actions/addresses";

const inputClass =
  "w-full rounded-xl border border-green-200 bg-cream-50 px-4 py-2.5 text-green-700 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-orange-300";
const labelClass = "mb-1.5 block text-sm font-medium text-green-700";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="secondary" disabled={pending}>
      {pending ? "Menyimpan..." : "Tambah Alamat"}
    </Button>
  );
}

export function AddressForm() {
  const [state, formAction] = useFormState<AddressFormState, FormData>(createAddress, {});

  return (
    <form action={formAction} className="space-y-3">
      <div>
        <label htmlFor="label" className={labelClass}>
          Label
        </label>
        <input id="label" name="label" placeholder="Rumah, Kantor, dst" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="address" className={labelClass}>
          Alamat
        </label>
        <textarea id="address" name="address" rows={2} required className={inputClass} />
      </div>
      <label className="flex items-center gap-2 text-sm font-medium text-green-700">
        <input
          type="checkbox"
          name="isDefault"
          className="h-4 w-4 rounded border-green-300 text-green-600 focus:ring-orange-300"
        />
        Jadikan alamat utama
      </label>
      {state.error && <p className="text-sm text-[#B3432E]">{state.error}</p>}
      <SubmitButton />
    </form>
  );
}
