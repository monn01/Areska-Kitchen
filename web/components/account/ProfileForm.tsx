"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { ChevronDown, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { updateProfile, type ProfileFormState } from "@/lib/actions/account";
import { cn } from "@/lib/utils";
import type { Gender, User } from "@prisma/client";

const inputClass =
  "w-full rounded-xl border border-green-200 bg-cream-50 px-4 py-2.5 text-green-700 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-orange-300";
const labelClass = "mb-1.5 block text-sm font-medium text-green-700";

const GENDER_LABELS: Record<Gender, string> = { MALE: "Laki-laki", FEMALE: "Perempuan" };

function GenderSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(inputClass, "flex items-center justify-between gap-2 text-left")}
      >
        <span className={value ? "" : "text-green-700/40"}>
          {value ? GENDER_LABELS[value as Gender] : "Pilih..."}
        </span>
        <ChevronDown
          className={cn("h-4 w-4 shrink-0 transition-transform duration-fast", open && "rotate-180")}
          strokeWidth={2}
        />
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-green-100 bg-cream-50 py-1 shadow-[0_8px_24px_rgba(31,77,58,0.14)]">
          <button
            type="button"
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className="block w-full px-4 py-2 text-left text-sm text-green-700/60 hover:bg-green-50"
          >
            Pilih...
          </button>
          {(Object.entries(GENDER_LABELS) as [Gender, string][]).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                onChange(key);
                setOpen(false);
              }}
              className={cn(
                "block w-full px-4 py-2 text-left text-sm hover:bg-green-50",
                key === value ? "font-semibold text-green-700" : "text-green-700/80",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB — sebelum dikompres
const AVATAR_DIMENSION = 256; // px, sisi terpanjang setelah di-resize

/** Resize + kompres gambar di browser jadi data URI JPEG kecil — tidak butuh storage/upload
 * server sendiri (belum ada infrastrukturnya), cukup disimpan sebagai string di User.avatarUrl. */
function resizeImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new window.Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > height) {
          if (width > AVATAR_DIMENSION) {
            height = Math.round(height * (AVATAR_DIMENSION / width));
            width = AVATAR_DIMENSION;
          }
        } else if (height > AVATAR_DIMENSION) {
          width = Math.round(width * (AVATAR_DIMENSION / height));
          height = AVATAR_DIMENSION;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas tidak didukung browser ini"));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.onerror = () => reject(new Error("Gagal memuat gambar"));
      img.src = reader.result as string;
    };
    reader.onerror = () => reject(new Error("Gagal membaca file"));
    reader.readAsDataURL(file);
  });
}

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
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [gender, setGender] = useState<string>(user.gender ?? "");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/png", "image/jpeg"].includes(file.type)) {
      setFileError("Hanya file PNG atau JPEG yang didukung.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setFileError("Ukuran file maksimal 5MB.");
      return;
    }

    setFileError(null);
    try {
      const dataUrl = await resizeImageFile(file);
      setAvatarPreview(dataUrl);
    } catch {
      setFileError("Gagal memproses gambar, coba file lain.");
    }
  }

  function handleRemovePhoto() {
    setAvatarPreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="avatarUrl" value={avatarPreview} />

      <div className="flex items-center gap-4">
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-green-50">
          {avatarPreview ? (
            // eslint-disable-next-line @next/next/no-img-element -- data URI hasil resize, bukan aset next/image
            <img src={avatarPreview} alt="Foto profil" className="h-full w-full object-cover" />
          ) : (
            <ImageOff className="h-6 w-6 text-green-300" strokeWidth={1.5} />
          )}
        </div>
        <div className="flex-1">
          <label htmlFor="avatarFile" className={labelClass}>
            Foto Profil (opsional)
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <input
              ref={fileInputRef}
              id="avatarFile"
              type="file"
              accept="image/png,image/jpeg"
              onChange={handleFileChange}
              className="block w-full max-w-xs text-sm text-green-700 file:mr-3 file:rounded-full file:border-0 file:bg-green-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-cream-50 hover:file:bg-green-700"
            />
            {avatarPreview && (
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="text-sm font-medium text-[#B3432E] hover:underline"
              >
                Hapus Foto
              </button>
            )}
          </div>
          <p className="mt-1 text-xs text-green-700/60">Format PNG/JPEG, maksimal 5MB.</p>
          {fileError && <p className="mt-1 text-xs text-[#B3432E]">{fileError}</p>}
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
          <label className={labelClass}>Jenis Kelamin (opsional)</label>
          <input type="hidden" name="gender" value={gender} />
          <GenderSelect value={gender} onChange={setGender} />
        </div>
      </div>

      {state.error && <p className="text-sm text-[#B3432E]">{state.error}</p>}
      {state.success && <p className="text-sm text-green-600">Profil berhasil diperbarui.</p>}

      <SubmitButton />
    </form>
  );
}
