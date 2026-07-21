import { prisma } from "@/lib/prisma";

/** AppSetting selalu single-row — dibuat lewat seed. */
export async function getAppSettings() {
  const settings = await prisma.appSetting.findFirst();
  if (!settings) {
    throw new Error(
      "AppSetting belum ada di database — jalankan `npx prisma db seed` dulu.",
    );
  }
  return settings;
}

/**
 * Validasi tanggal pengantaran terhadap aturan cutoff H-1 (fitur #3, CRITICAL).
 * - Tanggal hari ini atau sebelumnya: selalu ditolak (minimal H+1).
 * - Tanggal besok (H+1): harus dipesan sebelum `cutoffTime` (format "HH:mm", WIB) hari ini.
 * - Tanggal lebih jauh (H+2 dst): selalu boleh, tidak ada batas cutoff.
 */
export function validateEventDate(
  eventDate: Date,
  cutoffTime: string,
  now: Date = new Date(),
): { valid: boolean; message?: string } {
  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);
  const startOfEventDate = new Date(eventDate);
  startOfEventDate.setHours(0, 0, 0, 0);
  const daysDiff = Math.round(
    (startOfEventDate.getTime() - startOfToday.getTime()) / 86_400_000,
  );

  if (daysDiff < 1) {
    return { valid: false, message: "Tanggal pengantaran minimal besok (H+1)." };
  }

  if (daysDiff === 1) {
    const [hh, mm] = cutoffTime.split(":").map(Number);
    const cutoff = new Date(now);
    cutoff.setHours(hh, mm, 0, 0);
    if (now >= cutoff) {
      return {
        valid: false,
        message: `Order untuk besok harus masuk sebelum jam ${cutoffTime} WIB hari ini. Silakan pilih tanggal lain, atau hubungi kami langsung via WhatsApp untuk permintaan mendesak.`,
      };
    }
  }

  return { valid: true };
}
