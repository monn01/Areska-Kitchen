"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/Button";
import { updateSettings, type SettingsFormState } from "@/lib/actions/settings";
import type { AppSetting } from "@prisma/client";

const inputClass =
  "w-full rounded-xl border border-green-200 bg-cream-50 px-4 py-2.5 text-green-700 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-orange-300";
const labelClass = "mb-1.5 block text-sm font-medium text-green-700";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="primary" disabled={pending}>
      {pending ? "Menyimpan..." : "Simpan Pengaturan"}
    </Button>
  );
}

export function SettingsForm({ settings }: { settings: AppSetting }) {
  const [state, formAction] = useFormState<SettingsFormState, FormData>(updateSettings, {});

  return (
    <form action={formAction} className="max-w-lg space-y-6">
      <div className="rounded-2xl bg-cream-50 p-6 shadow-[0_2px_12px_rgba(31,77,58,0.08)]">
        <h2 className="font-semibold text-green-700">Penjadwalan</h2>
        <div className="mt-4">
          <label htmlFor="orderCutoffTime" className={labelClass}>
            Jam Cutoff Order H-1 (WIB)
          </label>
          <input
            id="orderCutoffTime"
            name="orderCutoffTime"
            type="time"
            defaultValue={settings.orderCutoffTime}
            required
            className={inputClass}
          />
          <p className="mt-1 text-xs text-green-700/60">
            Order untuk besok harus masuk sebelum jam ini hari ini.
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-cream-50 p-6 shadow-[0_2px_12px_rgba(31,77,58,0.08)]">
        <h2 className="font-semibold text-green-700">Ongkir & Area Layanan</h2>
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="kitchenLat" className={labelClass}>
                Latitude Dapur
              </label>
              <input
                id="kitchenLat"
                name="kitchenLat"
                type="number"
                step="any"
                defaultValue={settings.kitchenLat}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="kitchenLng" className={labelClass}>
                Longitude Dapur
              </label>
              <input
                id="kitchenLng"
                name="kitchenLng"
                type="number"
                step="any"
                defaultValue={settings.kitchenLng}
                required
                className={inputClass}
              />
            </div>
          </div>
          <p className="text-xs text-green-700/60">
            Buka Google Maps, klik kanan titik lokasi dapur/toko, salin koordinat yang muncul.
          </p>
          <div>
            <label htmlFor="deliveryRadiusKm" className={labelClass}>
              Radius Area Layanan (km)
            </label>
            <input
              id="deliveryRadiusKm"
              name="deliveryRadiusKm"
              type="number"
              step="0.5"
              min={0}
              defaultValue={settings.deliveryRadiusKm}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="deliveryFeePerKm" className={labelClass}>
              Tarif Ongkir per Km (Rp)
            </label>
            <input
              id="deliveryFeePerKm"
              name="deliveryFeePerKm"
              type="number"
              min={0}
              step={500}
              defaultValue={settings.deliveryFeePerKm}
              required
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-cream-50 p-6 shadow-[0_2px_12px_rgba(31,77,58,0.08)]">
        <h2 className="font-semibold text-green-700">Kapasitas</h2>
        <label className="mt-4 flex items-center gap-2 text-sm font-medium text-green-700">
          <input
            type="checkbox"
            name="retailCheckoutEnabled"
            defaultChecked={settings.retailCheckoutEnabled}
            className="h-4 w-4 rounded border-green-300 text-green-600 focus:ring-orange-300"
          />
          Terima order retail online
        </label>
        <p className="mt-1 text-xs text-green-700/60">
          Matikan sementara kalau dapur sedang kewalahan — checkout online akan ditolak sampai
          diaktifkan lagi.
        </p>
      </div>

      {state.error && <p className="text-sm text-[#B3432E]">{state.error}</p>}
      {state.success && <p className="text-sm text-green-600">Pengaturan tersimpan.</p>}

      <SubmitButton />
    </form>
  );
}
