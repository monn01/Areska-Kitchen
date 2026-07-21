"use client";

import { useTransition } from "react";
import { Star } from "lucide-react";
import { deleteAddress, setDefaultAddress } from "@/lib/actions/addresses";
import type { Address } from "@prisma/client";

export function AddressList({ addresses }: { addresses: Address[] }) {
  const [isPending, startTransition] = useTransition();

  if (addresses.length === 0) {
    return <p className="text-sm text-green-700/60">Belum ada alamat tersimpan.</p>;
  }

  return (
    <div className="space-y-3">
      {addresses.map((addr) => (
        <div
          key={addr.id}
          className="flex items-start justify-between gap-3 rounded-xl border border-green-100 bg-cream-50 p-4"
        >
          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium text-green-700">{addr.label}</p>
              {addr.isDefault && (
                <span className="flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
                  <Star className="h-3 w-3" strokeWidth={2} />
                  Utama
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-green-700/70">{addr.address}</p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2 text-sm">
            {!addr.isDefault && (
              <button
                type="button"
                disabled={isPending}
                onClick={() => startTransition(() => setDefaultAddress(addr.id))}
                className="text-green-600 hover:underline"
              >
                Jadikan utama
              </button>
            )}
            <button
              type="button"
              disabled={isPending}
              onClick={() => startTransition(() => deleteAddress(addr.id))}
              className="text-[#B3432E] hover:underline"
            >
              Hapus
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
