/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Admin bisa isi URL gambar produk/logo dari host mana pun (belum ada upload storage
    // sendiri, lihat TASKPLAN.md Fase 2 Phase 3) — izinkan semua host HTTPS supaya next/image
    // tidak menolak gambar eksternal yang di-input admin.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
