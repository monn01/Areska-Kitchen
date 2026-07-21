// Fase 2: menu, testimoni, dan "Dipercaya Oleh" sekarang dikelola lewat database
// (lihat prisma/schema.prisma, lib/actions/*, dan app/admin) — bukan lagi di file ini.
// File ini menyisakan data yang memang tetap statis: pesan brand inti (trust indicators)
// dan info bisnis dasar.

export interface TrustIndicator {
  id: string;
  title: string;
  description: string;
}

export const trustIndicators: TrustIndicator[] = [
  {
    id: "rumahan",
    title: "Masakan Rumahan",
    description: "Resep turun-temurun, dimasak seperti untuk keluarga sendiri.",
  },
  {
    id: "berkualitas",
    title: "Bahan Berkualitas",
    description: "Bahan segar pilihan, diracik setiap hari tanpa pengawet.",
  },
  {
    id: "higienis",
    title: "Higienis & Bersih",
    description: "Proses masak dan pengemasan menjaga kebersihan di setiap tahap.",
  },
  {
    id: "cinta",
    title: "Dibuat dengan Cinta",
    description: "Setiap porsi disiapkan dengan penuh perhatian, bukan sekadar produksi massal.",
  },
];

export const businessInfo = {
  name: "Areska Kitchen",
  tagline: "a taste of home",
  address: "Jl. Contoh Alamat No. 123, Pangkalpinang, Kepulauan Bangka Belitung",
  operationalHours: "Setiap hari, 07.00 – 20.00 WIB",
  mapsEmbedSrc:
    "https://www.google.com/maps?q=Pangkalpinang,+Bangka+Belitung&output=embed",
  instagram: "https://instagram.com/areskakitchen",
};
