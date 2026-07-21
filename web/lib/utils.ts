import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const WHATSAPP_NUMBER = "6281234567890";

export function buildWhatsAppLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export const DEFAULT_WA_MESSAGE =
  "Halo Areska Kitchen, saya ingin bertanya tentang menu dan pemesanan.";
