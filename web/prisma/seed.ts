import { PrismaClient, ProductCategory } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Data seed berasal dari lib/data.ts (placeholder Fase 1) — priceRange yang tadinya cuma
// teks tampilan ("Rp 25.000 – Rp 30.000") dikonversi jadi satu harga definitif (titik tengah
// kisaran, atau nilai "mulai dari" untuk paket prasmanan) supaya bisa dipakai transaksi nyata.
// Menu & harga asli masih menunggu input klien (lihat TASKPLAN.md checklist).
const products: Array<{
  category: ProductCategory;
  name: string;
  description: string;
  price: number;
}> = [
  {
    category: "NASI_KOTAK",
    name: "Nasi Kotak Ayam Rendang",
    description: "Nasi putih pulen, ayam rendang, sayur lodeh, kerupuk, dan sambal khas rumahan.",
    price: 27500,
  },
  {
    category: "NASI_KOTAK",
    name: "Nasi Kotak Ikan Gepuk",
    description: "Nasi putih, ikan gepuk bumbu Bangka, tumis kacang panjang, dan lalapan segar.",
    price: 24500,
  },
  {
    category: "NASI_KOTAK",
    name: "Nasi Kotak Ayam Bakar",
    description: "Nasi putih, ayam bakar bumbu kecap, orek tempe, timun, dan sambal terasi.",
    price: 27500,
  },
  {
    category: "PRASMANAN",
    name: "Paket Prasmanan Sederhana",
    description: "3 lauk pilihan, sayur, kerupuk, dan sambal — cocok untuk acara kantor/instansi.",
    price: 35000,
  },
  {
    category: "PRASMANAN",
    name: "Paket Prasmanan Lengkap",
    description: "5 lauk pilihan, sup, sayur, buah, dan dessert — untuk acara resmi/hajatan besar.",
    price: 55000,
  },
  {
    category: "SNACK_BOX",
    name: "Snack Box Standar",
    description: "2 kue basah, 1 kue kering, air mineral — untuk rapat dan acara sekolah.",
    price: 13500,
  },
  {
    category: "SNACK_BOX",
    name: "Snack Box Premium",
    description: "3 kue basah, roti isi, buah potong, air mineral — untuk tamu kehormatan.",
    price: 20000,
  },
  {
    category: "PEMPEK_LAINNYA",
    name: "Pempek Kapal Selam (isi 5)",
    description: "Pempek khas Bangka Belitung, disajikan dengan cuko kental dan mentimun.",
    price: 32500,
  },
  {
    category: "PEMPEK_LAINNYA",
    name: "Pempek Lenjer & Adaan (isi 10)",
    description: "Campuran pempek lenjer dan adaan, cuko racikan sendiri, level pedas bisa disesuaikan.",
    price: 30500,
  },
];

const testimonials = [
  {
    name: "Ibu Ratna",
    role: "Panitia Acara, Instansi Provinsi",
    quote:
      "Rasanya benar-benar seperti masakan rumahan. Tamu-tamu kami banyak yang menanyakan katering dari mana.",
  },
  {
    name: "Bapak Herman",
    role: "Wali Murid, Sekolah di Pangkalpinang",
    quote: "Sudah langganan untuk acara sekolah anak. Selalu tepat waktu dan rasanya konsisten enak.",
  },
  {
    name: "Ibu Siti",
    role: "Penyelenggara Hajatan",
    quote: "Nasi kotaknya jadi andalan setiap ada acara keluarga. Harga bersahabat, porsi pas, rasa juara.",
  },
  {
    name: "Bapak Andi",
    role: "Staf BAPEDA Bangka Belitung",
    quote: "Pempeknya juara, cuko-nya pas di lidah. Selalu jadi pilihan untuk jamuan kantor.",
  },
];

// Placeholder ilustratif — bukan nama instansi resmi, izin belum didapat (lihat PRD §16.1).
const trustedClients = [
  { name: "Instansi Pemerintah Kota", row: 1 },
  { name: "Kantor Kecamatan", row: 1 },
  { name: "Sekolah Negeri", row: 1 },
  { name: "Universitas / Kampus", row: 1 },
  { name: "Rumah Sakit Daerah", row: 1 },
  { name: "Kantor Swasta", row: 1 },
  { name: "Yayasan Sosial", row: 2 },
  { name: "Puskesmas Kota", row: 2 },
  { name: "Sekolah Swasta", row: 2 },
  { name: "Acara Keluarga & Komunitas", row: 2 },
  { name: "Kantor Kelurahan", row: 2 },
  { name: "Organisasi Masyarakat", row: 2 },
];

async function main() {
  await prisma.product.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.client.deleteMany();

  await prisma.product.createMany({ data: products });
  await prisma.testimonial.createMany({ data: testimonials });
  await prisma.client.createMany({
    data: trustedClients.map((c) => ({ ...c, isVisible: true })),
  });

  // Akun admin dev — HANYA untuk lokal, ganti password sebelum production.
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@areskakitchen.local";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "areska-admin-dev";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { password: passwordHash, isAdmin: true },
    create: {
      name: "Admin Areska Kitchen",
      email: adminEmail,
      password: passwordHash,
      isAdmin: true,
    },
  });

  // Setting aplikasi — singleton row, dibuat sekali kalau belum ada. Nilai default
  // (lokasi dapur, tarif ongkir, cutoff time) masih perkiraan, BUTUH DIKONFIRMASI
  // klien lalu diubah dari dashboard admin — lihat TASKPLAN.md checklist input klien.
  const existingSetting = await prisma.appSetting.findFirst();
  if (!existingSetting) {
    await prisma.appSetting.create({ data: {} });
  }

  console.log(`Seed selesai: ${products.length} produk, ${testimonials.length} testimoni, ${trustedClients.length} client.`);
  console.log(`Akun admin dev — email: ${adminEmail} / password: ${adminPassword} (GANTI sebelum production)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
