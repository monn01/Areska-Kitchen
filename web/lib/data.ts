export type MenuCategory = "Nasi Kotak" | "Prasmanan" | "Snack Box" | "Pempek & Lainnya";

export interface MenuItem {
  id: string;
  category: MenuCategory;
  name: string;
  description: string;
  priceRange: string;
  /** null = foto asli belum tersedia dari klien, tampilkan fallback placeholder (lihat components/ui/ProductImage.tsx) */
  image: string | null;
}

// NOTE: Data placeholder — menu, harga, dan foto asli menunggu input dari owner (lihat PRD §6.3).
export const menuCategories: MenuCategory[] = [
  "Nasi Kotak",
  "Prasmanan",
  "Snack Box",
  "Pempek & Lainnya",
];

export const menuItems: MenuItem[] = [
  {
    id: "nk-1",
    category: "Nasi Kotak",
    name: "Nasi Kotak Ayam Rendang",
    description: "Nasi putih pulen, ayam rendang, sayur lodeh, kerupuk, dan sambal khas rumahan.",
    priceRange: "Rp 25.000 – Rp 30.000",
    image: null,
  },
  {
    id: "nk-2",
    category: "Nasi Kotak",
    name: "Nasi Kotak Ikan Gepuk",
    description: "Nasi putih, ikan gepuk bumbu Bangka, tumis kacang panjang, dan lalapan segar.",
    priceRange: "Rp 22.000 – Rp 27.000",
    image: null,
  },
  {
    id: "nk-3",
    category: "Nasi Kotak",
    name: "Nasi Kotak Ayam Bakar",
    description: "Nasi putih, ayam bakar bumbu kecap, orek tempe, timun, dan sambal terasi.",
    priceRange: "Rp 25.000 – Rp 30.000",
    image: null,
  },
  {
    id: "pr-1",
    category: "Prasmanan",
    name: "Paket Prasmanan Sederhana",
    description: "3 lauk pilihan, sayur, kerupuk, dan sambal — cocok untuk acara kantor/instansi.",
    priceRange: "Mulai Rp 35.000/porsi",
    image: null,
  },
  {
    id: "pr-2",
    category: "Prasmanan",
    name: "Paket Prasmanan Lengkap",
    description: "5 lauk pilihan, sup, sayur, buah, dan dessert — untuk acara resmi/hajatan besar.",
    priceRange: "Mulai Rp 55.000/porsi",
    image: null,
  },
  {
    id: "sb-1",
    category: "Snack Box",
    name: "Snack Box Standar",
    description: "2 kue basah, 1 kue kering, air mineral — untuk rapat dan acara sekolah.",
    priceRange: "Rp 12.000 – Rp 15.000",
    image: null,
  },
  {
    id: "sb-2",
    category: "Snack Box",
    name: "Snack Box Premium",
    description: "3 kue basah, roti isi, buah potong, air mineral — untuk tamu kehormatan.",
    priceRange: "Rp 18.000 – Rp 22.000",
    image: null,
  },
  {
    id: "pl-1",
    category: "Pempek & Lainnya",
    name: "Pempek Kapal Selam (isi 5)",
    description: "Pempek khas Bangka Belitung, disajikan dengan cuko kental dan mentimun.",
    priceRange: "Rp 30.000 – Rp 35.000",
    image: null,
  },
  {
    id: "pl-2",
    category: "Pempek & Lainnya",
    name: "Pempek Lenjer & Adaan (isi 10)",
    description: "Campuran pempek lenjer dan adaan, cuko racikan sendiri, level pedas bisa disesuaikan.",
    priceRange: "Rp 28.000 – Rp 33.000",
    image: null,
  },
];

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

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
}

// Placeholder — testimoni asli menunggu input dari owner (min. 3-5, PRD §6.3).
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Ibu Ratna",
    role: "Panitia Acara, Instansi Provinsi",
    quote:
      "Rasanya benar-benar seperti masakan rumahan. Tamu-tamu kami banyak yang menanyakan katering dari mana.",
  },
  {
    id: "t2",
    name: "Bapak Herman",
    role: "Wali Murid, Sekolah di Pangkalpinang",
    quote:
      "Sudah langganan untuk acara sekolah anak. Selalu tepat waktu dan rasanya konsisten enak.",
  },
  {
    id: "t3",
    name: "Ibu Siti",
    role: "Penyelenggara Hajatan",
    quote:
      "Nasi kotaknya jadi andalan setiap ada acara keluarga. Harga bersahabat, porsi pas, rasa juara.",
  },
  {
    id: "t4",
    name: "Bapak Andi",
    role: "Staf BAPEDA Bangka Belitung",
    quote:
      "Pempeknya juara, cuko-nya pas di lidah. Selalu jadi pilihan untuk jamuan kantor.",
  },
];

export interface TrustedBrand {
  id: string;
  /** Label chip — generik/ilustratif per kategori, BUKAN nama resmi satu instansi (izin belum didapat, lihat PRD §16.1 & TASKPLAN.md checklist klien). */
  name: string;
  /** null = belum ada logo asli, tampilkan fallback monogram (lihat TrustedBy.tsx). */
  logoUrl: string | null;
  /** Baris marquee tempat chip ini tampil — field ini yang nanti diekspos ke admin dashboard (Fase 2/3) untuk diatur ulang. */
  row: 1 | 2;
}

// Placeholder ilustratif per kategori — daftar & logo instansi resmi menyusul setelah izin didapat dari klien.
export const trustedBrands: TrustedBrand[] = [
  { id: "b1", name: "Instansi Pemerintah Kota", logoUrl: null, row: 1 },
  { id: "b2", name: "Kantor Kecamatan", logoUrl: null, row: 1 },
  { id: "b3", name: "Sekolah Negeri", logoUrl: null, row: 1 },
  { id: "b4", name: "Universitas / Kampus", logoUrl: null, row: 1 },
  { id: "b5", name: "Rumah Sakit Daerah", logoUrl: null, row: 1 },
  { id: "b6", name: "Kantor Swasta", logoUrl: null, row: 1 },
  { id: "b7", name: "Yayasan Sosial", logoUrl: null, row: 2 },
  { id: "b8", name: "Puskesmas Kota", logoUrl: null, row: 2 },
  { id: "b9", name: "Sekolah Swasta", logoUrl: null, row: 2 },
  { id: "b10", name: "Acara Keluarga & Komunitas", logoUrl: null, row: 2 },
  { id: "b11", name: "Kantor Kelurahan", logoUrl: null, row: 2 },
  { id: "b12", name: "Organisasi Masyarakat", logoUrl: null, row: 2 },
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
