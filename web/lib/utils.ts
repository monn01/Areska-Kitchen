import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const WHATSAPP_NUMBER = "6281234567890";

export function buildWhatsAppLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

/** Normalisasi nomor Indonesia (08xx / +62xx / 62xx) jadi format 62xx yang dipakai wa.me. */
export function normalizeIndonesianPhone(phone: string): string {
  const digits = phone.replace(/[^\d]/g, "");
  if (digits.startsWith("62")) return digits;
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  return digits;
}

/** Link WA ke nomor pelanggan (bukan nomor bisnis) — dipakai admin untuk kirim notifikasi status order. */
export function buildWhatsAppLinkTo(phone: string, message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${normalizeIndonesianPhone(phone)}?text=${encoded}`;
}

export const DEFAULT_WA_MESSAGE =
  "Halo Areska Kitchen, saya ingin bertanya tentang menu dan pemesanan.";
