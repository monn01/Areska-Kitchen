// Domain final belum diputuskan (PRD §16, opsi .id/.co.id/.com) — ganti setelah domain dikonfirmasi klien.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://areskakitchen.com";

export const SITE_NAME = "Areska Kitchen";

export const LOCAL_BUSINESS = {
  name: "Areska Kitchen",
  description:
    "Areska Kitchen adalah layanan catering rumahan di Pangkalpinang, Bangka Belitung sejak 2019. Menyediakan nasi kotak, prasmanan, snack box, dan pempek untuk instansi, sekolah, dan masyarakat umum.",
  telephone: "+6281234567890",
  streetAddress: "Jl. Contoh Alamat No. 123",
  addressLocality: "Pangkalpinang",
  addressRegion: "Kepulauan Bangka Belitung",
  postalCode: "33121",
  addressCountry: "ID",
  priceRange: "Rp 12.000 - Rp 55.000",
  openingHours: "Mo-Su 07:00-20:00",
};
