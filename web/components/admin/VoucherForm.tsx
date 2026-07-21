"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/Button";
import { createVoucher, updateVoucher, type VoucherFormState } from "@/lib/actions/vouchers";
import type { Voucher } from "@prisma/client";

const inputClass =
  "w-full rounded-xl border border-green-200 bg-cream-50 px-4 py-2.5 text-green-700 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-orange-300";
const labelClass = "mb-1.5 block text-sm font-medium text-green-700";

function toDateInputValue(date: Date | null | undefined) {
  if (!date) return "";
  return new Date(date).toISOString().slice(0, 10);
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="primary" disabled={pending}>
      {pending ? "Menyimpan..." : label}
    </Button>
  );
}

export function VoucherForm({ voucher }: { voucher?: Voucher }) {
  const action = voucher ? updateVoucher.bind(null, voucher.id) : createVoucher;
  const [state, formAction] = useFormState<VoucherFormState, FormData>(action, {});

  return (
    <form action={formAction} className="max-w-lg space-y-4">
      <div>
        <label htmlFor="code" className={labelClass}>
          Kode Voucher
        </label>
        <input
          id="code"
          name="code"
          defaultValue={voucher?.code}
          required
          className={`${inputClass} uppercase`}
          style={{ textTransform: "uppercase" }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="discountType" className={labelClass}>
            Tipe Diskon
          </label>
          <select
            id="discountType"
            name="discountType"
            defaultValue={voucher?.discountType ?? "PERCENTAGE"}
            className={inputClass}
          >
            <option value="PERCENTAGE">Persen (%)</option>
            <option value="FIXED">Nominal Tetap (Rp)</option>
          </select>
        </div>
        <div>
          <label htmlFor="discountValue" className={labelClass}>
            Nilai
          </label>
          <input
            id="discountValue"
            name="discountValue"
            type="number"
            min={1}
            defaultValue={voucher?.discountValue}
            required
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="minOrder" className={labelClass}>
          Minimal Belanja (opsional)
        </label>
        <input
          id="minOrder"
          name="minOrder"
          type="number"
          min={0}
          defaultValue={voucher?.minOrder ?? ""}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="validFrom" className={labelClass}>
            Berlaku Dari (opsional)
          </label>
          <input
            id="validFrom"
            name="validFrom"
            type="date"
            defaultValue={toDateInputValue(voucher?.validFrom)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="validUntil" className={labelClass}>
            Berlaku Sampai (opsional)
          </label>
          <input
            id="validUntil"
            name="validUntil"
            type="date"
            defaultValue={toDateInputValue(voucher?.validUntil)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="usageLimit" className={labelClass}>
          Batas Pemakaian (opsional)
        </label>
        <input
          id="usageLimit"
          name="usageLimit"
          type="number"
          min={1}
          defaultValue={voucher?.usageLimit ?? ""}
          className={inputClass}
        />
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-green-700">
        <input
          type="checkbox"
          name="isActive"
          defaultChecked={voucher?.isActive ?? true}
          className="h-4 w-4 rounded border-green-300 text-green-600 focus:ring-orange-300"
        />
        Aktif
      </label>

      {state.error && <p className="text-sm text-[#B3432E]">{state.error}</p>}

      <SubmitButton label={voucher ? "Simpan Perubahan" : "Tambah Voucher"} />
    </form>
  );
}
