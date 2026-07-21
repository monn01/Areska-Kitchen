"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { ImageOff } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { updateProfile, type ProfileFormState } from "@/lib/actions/account";
import type { User } from "@prisma/client";

const inputClass =
  "w-full rounded-xl border border-green-200 bg-cream-50 px-4 py-2.5 text-green-700 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-orange-300";
const labelClass = "mb-1.5 block text-sm font-medium text-green-700";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="primary" disabled={pending}>
      {pending ? "Menyimpan..." : "Simpan Profil"}
    </Button>
  );
}

export function ProfileForm({ user }: { user: User }) {
  const [state, formAction] = useFormState<ProfileFormState, FormData>(updateProfile, {});
  const [avatarPreview, setAvatarPreview] = useState(user.avatarUrl ?? "");

  return (
    <form action={formAction} className="space-y-5">
      <div className="flex items-center gap-4">
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-green-50">
          {avatarPreview ? (
            // eslint-disable-next-line @next/next/no-img-element -- URL bebas dari user, bukan aset lokal terdaftar
            <img
              src={avatarPreview}
              alt="Foto profil"
              className="h-full w-full object-cover"
              onError={() => setAvatarPreview("")}
            />
          ) : (
            <ImageOff className="h-6 w-6 text-green-300" strokeWidth={1.5} />
          )}
        </div>
        <div className="flex-1">
          <label htmlFor="avatarUrl" className={labelClass}>
            URL Foto Profil (opsional)
          </label>
          <input
            id="avatarUrl"
            name="avatarUrl"
            type="url"
            placeholder="https://..."
            defaultValue={user.avatarUrl ?? ""}
            onChange={(e) => setAvatarPreview(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Nama
          </label>
          <input id="name" name="name" required defaultValue={user.name} className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={user.email ?? ""}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Nomor WhatsApp
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={user.phone ?? ""}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="dateOfBirth" className={labelClass}>
            Tanggal Lahir (opsional)
          </label>
          <input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            defaultValue={user.dateOfBirth ? user.dateOfBirth.toISOString().slice(0, 10) : ""}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="gender" className={labelClass}>
            Jenis Kelamin (opsional)
          </label>
          <select
            id="gender"
            name="gender"
            defaultValue={user.gender ?? ""}
            className={inputClass}
          >
            <option value="">Pilih...</option>
            <option value="MALE">Laki-laki</option>
            <option value="FEMALE">Perempuan</option>
          </select>
        </div>
      </div>

      {state.error && <p className="text-sm text-[#B3432E]">{state.error}</p>}
      {state.success && <p className="text-sm text-green-600">Profil berhasil diperbarui.</p>}

      <SubmitButton />
    </form>
  );
}
