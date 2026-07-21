# PRD — Areska Kitchen Digital Platform

| | |
|---|---|
| **Versi** | 1.0 |
| **Tanggal** | 20 Juli 2026 |
| **Klien** | Areska Kitchen (Catering, est. 2019 — Pangkalpinang, Bangka Belitung) |
| **Disusun oleh** | Jaee (Muhammad Dzaky Prayata) |
| **Status** | Draft — Fase 1 (Landing Page) siap eksekusi |

---

## 1. Ringkasan Eksekutif

Areska Kitchen adalah bisnis catering rumahan yang sudah berjalan sejak 2019 di Pangkalpinang, Bangka Belitung, melayani nasi kotak, prasmanan, snack box, hingga pempek dan menu lainnya. Klien mencakup instansi pemerintah (Kantor Gubernur Bangka Belitung, BAPEDA, kantor-kantor provinsi lain), sekolah-sekolah di Pangkalpinang, dan acara umum formal/non-formal. Selama ini bisnis berjalan sepenuhnya offline/word-of-mouth.

Project ini mendigitalisasi Areska Kitchen melalui 3 fase bertahap:

1. **Landing Page** — company profile digital, entry point utama untuk calon pelanggan
2. **E-commerce/Ordering System** — sistem pemesanan online terintegrasi payment gateway
3. **Dashboard Admin** — pencatatan keuangan (modal, laba kotor, laba bersih) untuk kebutuhan tracking bisnis dan pajak

Ketiga fase dirancang **terhubung dari awal** (shared database), bukan sebagai 3 sistem terpisah, sehingga data transaksi dari sistem ordering otomatis mengalir ke pencatatan keuangan tanpa input manual ganda.

Dokumen ini adalah source of truth untuk requirement. Detail task eksekusi per fase ada di `TASKPLAN.md`.

---

## 2. Latar Belakang & Konteks Bisnis

- Berdiri 2019, sudah punya reputasi dan basis klien loyal secara offline.
- Sudah dipercaya oleh instansi pemerintah provinsi (kredibilitas tinggi, bisa jadi social proof kuat).
- Sudah dikenal di kalangan sekolah-sekolah Pangkalpinang.
- Melayani acara umum (formal & non-formal) untuk masyarakat general.
- Brand identity (logo, tagline, palet warna) **sudah jadi dan matang** — "Areska Kitchen, a taste of home" — bertema rumahan, hangat, higienis.
- Belum punya kehadiran digital sama sekali (no website, kemungkinan hanya WhatsApp/media sosial informal).

**Masalah yang diselesaikan:**
- Calon klien baru (terutama corporate/instansi baru, atau masyarakat umum di luar radius word-of-mouth) tidak bisa menemukan Areska Kitchen secara online.
- Tidak ada sistem pemesanan terstruktur — kemungkinan besar order & follow-up masih manual via chat.
- Orang tua (owner) tidak punya pencatatan keuangan digital yang rapi — menyulitkan tracking laba/rugi dan pelaporan pajak.

---

## 3. Tujuan Project

**Business Goals:**
- Meningkatkan visibilitas online, terutama untuk pencarian lokal ("catering Pangkalpinang", dsb).
- Memperkuat kredibilitas lewat showcase klien corporate/institusi.
- Mempermudah proses pemesanan bagi pelanggan baru maupun repeat customer.
- Memberi owner (orang tua) visibilitas penuh atas kesehatan finansial bisnis.
- Menyiapkan data keuangan yang rapi dan siap pakai untuk kebutuhan pajak.

**Technical Goals:**
- Landing page cepat, mobile-first, SEO-friendly (mayoritas traffic F&B lokal dari mobile & pencarian Google).
- Arsitektur yang scalable dari Fase 1 → Fase 3 tanpa perlu rebuild total di fase berikutnya.
- Satu sumber data (single source of truth) untuk produk & transaksi yang dipakai bersama oleh sistem ordering dan dashboard keuangan.

---

## 4. Target Pengguna

| Persona | Deskripsi | Kebutuhan Utama |
|---|---|---|
| **Instansi/Corporate** | Kantor Gubernur, BAPEDA, kantor provinsi lain | Kredibilitas, kemudahan order dalam jumlah besar, kejelasan menu prasmanan |
| **Sekolah** | Sekolah-sekolah di Pangkalpinang | Konsistensi kualitas, harga jelas, pemesanan berulang |
| **Masyarakat Umum** | Acara formal/non-formal (hajatan, ulang tahun, dll) | Menu variatif (nasi kotak, snack box, pempek), harga & cara pesan jelas |
| **Admin/Owner** | Orang tua Jaee (pemilik bisnis) | Dashboard sederhana, tidak butuh literasi teknis tinggi, fokus pada angka yang actionable |

---

## 5. Scope Keseluruhan

### Fase 1 — Landing Page *(dikerjakan sekarang)*
Company profile digital: informasi bisnis, menu, testimoni, kontak, CTA pemesanan (sementara via WhatsApp sebelum Fase 2 live).

### Fase 2 — E-commerce / Ordering System
Katalog produk interaktif, keranjang, checkout, payment gateway (Midtrans), tracking status pesanan, akun pelanggan.

### Fase 3 — Dashboard Admin (Keuangan)
Pencatatan modal, HPP (harga pokok produksi), laba kotor/bruto, laba bersih, laporan periodik, export data untuk pajak. Terintegrasi otomatis dengan data transaksi dari Fase 2.

### Out of Scope (semua fase, kecuali direvisi ke depan)
- Aplikasi mobile native (Android/iOS) — cukup web responsive.
- Multi-cabang/multi-lokasi (saat ini single business unit).
- Sistem inventori bahan baku detail (stock opname) — hanya pencatatan finansial di Fase 3, bukan manajemen stok.
- Integrasi POS fisik/kasir offline.

---

## 6. Fase 1: Landing Page — Requirement Detail

### 6.1 Struktur Halaman (berdasarkan mockup awal)

1. **Navbar** — Logo, Beranda, Menu, Tentang Kami, Testimoni, Kontak, tombol CTA "Pesan Sekarang" (accent oranye)
2. **Hero Section**
   - Headline: "Masakan Rumahan, Rasa yang Selalu Dirindukan"
   - Sub-headline: deskripsi singkat brand
   - Dual CTA: "Lihat Menu" (secondary) + "Pesan Sekarang" (primary)
   - Visual: foto produk nasi kotak open-box, badge "Homemade with Love"
3. **Trust Indicators / Feature Icons** — 4 ikon: Masakan Rumahan, Bahan Berkualitas, Higienis & Bersih, Dibuat dengan Cinta
4. **Tentang Kami** — Deskripsi bisnis, sejak kapan berdiri, value proposition
5. **Dipercaya Oleh** *(section tambahan yang direkomendasikan — belum ada di mockup)*
   - Showcase logo/nama instansi: Kantor Gubernur Bangka Belitung, BAPEDA, kantor provinsi lain, sekolah-sekolah mitra
   - Rationale: social proof dari klien institusi adalah aset kredibilitas besar yang belum dimanfaatkan — sangat relevan untuk target corporate baru
6. **Menu/Produk** — Kategori: Nasi Kotak, Prasmanan, Snack Box, Pempek & Lainnya. Tiap kategori: nama item, foto, deskripsi singkat, range harga (harga final tetap dikonfirmasi via WA di Fase 1)
7. **Testimoni** — Review dari pelanggan (perlu dikumpulkan dari owner)
8. **Kontak / Footer** — Alamat, no. WhatsApp, jam operasional, media sosial, peta lokasi (Google Maps embed), form kontak singkat

### 6.2 Fitur Fase 1

| Fitur | Prioritas | Catatan |
|---|---|---|
| Responsive design (desktop, tablet, mobile) | Must-have | Mayoritas traffic F&B dari mobile |
| CTA "Pesan Sekarang" → WhatsApp Business | Must-have | Bridging solution sebelum Fase 2 live |
| Menu showcase dengan kategori | Must-have | |
| Section "Dipercaya Oleh" (klien institusi) | Should-have | Diferensiasi kompetitif kuat |
| SEO dasar (meta tag, structured data LocalBusiness, sitemap) | Must-have | Untuk pencarian lokal Google |
| Google Maps embed + jam operasional | Must-have | |
| Form kontak (tanpa backend kompleks, kirim ke email/WA) | Should-have | |
| Galeri foto produk | Should-have | |
| Loading cepat (image optimization, lazy load) | Must-have | |
| Placeholder/teaser untuk fitur ordering online (Fase 2) | Nice-to-have | Copy: "Sistem pemesanan online segera hadir" |

### 6.3 Konten yang Dibutuhkan dari Klien (Orang Tua)

- [ ] Nomor WhatsApp Business aktif
- [ ] Daftar menu lengkap per kategori + kisaran harga
- [ ] Foto produk berkualitas (selain yang di mockup, kalau ada foto asli produk real)
- [ ] Alamat lengkap & jam operasional
- [ ] Testimoni pelanggan (minimal 3-5, idealnya dari klien institusi)
- [ ] Konfirmasi nama & logo instansi yang boleh ditampilkan di section "Dipercaya Oleh" (perlu izin, terutama untuk instansi pemerintah)
- [ ] Akun media sosial (Instagram/Facebook jika ada)

---

## 7. Fase 2: E-commerce/Ordering — Preview Requirement

*(Detail penuh disusun ulang saat Fase 1 selesai, ini baseline awal)*

- Katalog produk dinamis (CRUD dari admin)
- Keranjang & checkout
- Payment gateway: **Midtrans** (Snap/Core API — kartu, e-wallet, VA)
- Sistem order untuk kebutuhan custom (prasmanan/event besar) yang butuh konfirmasi manual admin sebelum pembayaran, berbeda dari order retail (nasi kotak/snack box) yang bisa langsung checkout
- Status tracking pesanan (pending → dikonfirmasi → diproses → selesai)
- Notifikasi (WhatsApp API/email) saat status order berubah
- Akun pelanggan (opsional login, atau guest checkout untuk mempercepat konversi)

---

## 8. Fase 3: Dashboard Admin (Keuangan) — Preview Requirement

*(Detail penuh disusun ulang saat Fase 2 selesai, ini baseline awal)*

- Input & tracking **modal** per produksi/periode
- Kalkulasi **laba kotor (bruto)** — otomatis dari data transaksi Fase 2
- Kalkulasi **laba bersih** — setelah dikurangi biaya operasional (yang diinput manual: listrik, gas, transport, dll)
- Laporan periodik (harian/mingguan/bulanan/tahunan)
- Export laporan (PDF/Excel) — format yang mudah dipakai untuk keperluan pajak (PPh Final UMKM)
- Dashboard visual sederhana (grafik tren pendapatan, produk terlaris) — desain harus **non-teknis**, mudah dibaca orang tua tanpa background akuntansi

---

## 9. Brand Identity & Design Guidelines

**Tagline:** "a taste of home"

**Palet Warna** *(estimasi dari asset, final hex diambil dari source file logo)*
| Warna | Hex (estimasi) | Penggunaan |
|---|---|---|
| Hijau Tua | `#1F4D3A` – `#2C5530` | Primary — navbar, heading, tombol secondary |
| Krem/Off-white | `#F5EEE0` | Background utama |
| Oranye/Gold | `#E0A24B` | Accent — CTA utama, highlight tagline |
| Putih | `#FFFFFF` | Text di atas background gelap |

**Tipografi**
- Heading: Serif (mengikuti gaya logo "Areska Kitchen") — kesan hangat, homey, terpercaya
- Body/Nav: Sans-serif, letter-spacing agak lebar untuk tagline (mengikuti style "a taste of home")

**Aset Logo tersedia:** Horizontal version, icon-only, monochrome, black version, white version — semua sudah siap pakai untuk berbagai konteks (navbar, favicon, packaging cross-reference, dokumen).

**Prinsip Visual:** Homemade, higienis, hangat/personal (bukan korporat-dingin) — meski klien mencakup instansi pemerintah, tone visual tetap "rumahan" sesuai brand promise.

### 9.1 File Referensi Desain

| File | Deskripsi | Status |
|---|---|---|
| `logo.png` | Logo resmi Areska Kitchen — 5 varian: horizontal, icon-only, monochrome, black version, white version | **Final**, siap dipakai langsung |
| `Mockup.png` | Ilustrasi awal: packaging box, isi nasi kotak, preview layout web (desktop & mobile) | **Referensi/ilustrasi awal**, bukan final design — struktur section (navbar, hero, feature icons, dst.) dipakai sebagai basis, tapi implementasi UI final bisa disesuaikan saat build (lihat §6.1) |

Kedua file diberikan owner di awal diskusi project (Juli 2026). Saat eksekusi Phase 2 (Design System) di taskplan, aset ini jadi acuan utama untuk warna, tipografi, dan struktur layout.

---

## 10. Tech Stack & Arsitektur

| Layer | Teknologi | Alasan |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSR/SSG untuk SEO, konsisten dengan project sebelumnya |
| Styling | Tailwind CSS | Rapid development, konsisten dengan design system |
| ORM | Prisma | Konsisten dengan workflow project sebelumnya |
| Database | **PostgreSQL** | Bukan SQLite — perlu handle transaksi finansial & concurrent order di Fase 2/3 |
| Payment | Midtrans (Snap API) | Standar UMKM Indonesia, dukung banyak metode pembayaran |
| Auth (Fase 2+) | NextAuth/Auth.js | Untuk akun pelanggan & admin |
| Hosting | VPS (Docker Compose) atau Vercel — dikonfirmasi saat Fase 1 deployment | Konsisten dengan pola deployment project sebelumnya |
| Domain | TBD — disarankan `.id`/`.co.id` untuk kredibilitas bisnis lokal | |

**Prinsip Arsitektur:** Database schema dirancang sejak Fase 1 untuk mengakomodasi Fase 2 & 3 (misal: tabel `Product` dibuat lengkap sejak awal walau baru dipakai sebagai display statis di Fase 1), supaya tidak ada migrasi besar/breaking change antar fase.

---

## 11. Data Model Overview (High-Level)

Entitas inti yang akan tumbuh bertahap antar fase:

- `Product` (kategori, nama, deskripsi, harga, foto) — dipakai statis di Fase 1, jadi katalog dinamis di Fase 2
- `Order` — mulai eksis di Fase 2
- `Transaction` — hasil pembayaran, terhubung ke `Order`
- `FinancialRecord` (modal, biaya operasional, periode) — Fase 3, terhubung ke agregat `Transaction`
- `Testimonial`, `Client/Instansi` (untuk section "Dipercaya Oleh") — Fase 1
- `User` (admin & pelanggan) — Fase 2

Detail schema Prisma disusun di masing-masing taskplan fase.

---

## 12. Non-Functional Requirements

- **Performance:** Landing page load < 3 detik di koneksi mobile 4G rata-rata Indonesia (Lighthouse score target ≥ 90)
- **SEO:** Local SEO priority — target keyword seperti "catering Pangkalpinang", "nasi kotak Bangka Belitung"
- **Mobile-first:** Wajib, mengingat mockup sudah menunjukkan desain mobile terpisah
- **Security (Fase 2+):** PCI-DSS compliance via Midtrans (tidak menyimpan data kartu sendiri), HTTPS wajib
- **Accessibility:** Kontras warna cukup (hijau tua di atas krem sudah baik), alt text di semua gambar produk
- **Maintainability:** Owner (orang tua) tidak punya background teknis — Fase 3 dashboard harus punya UX yang sangat sederhana, minim jargon

---

## 13. Success Metrics

| Fase | Metrik |
|---|---|
| Fase 1 | Landing page live & terindeks Google; minimal 1 lead/inquiry baru dalam bulan pertama |
| Fase 2 | Transaksi online pertama berhasil end-to-end (order → bayar → konfirmasi) |
| Fase 3 | Orang tua bisa generate laporan laba bersih bulanan tanpa bantuan Jaee |

---

## 14. Asumsi & Risiko

| Item | Detail |
|---|---|
| **Asumsi** | Orang tua bersedia menyediakan konten (foto, harga, testimoni) tepat waktu |
| **Asumsi** | Izin penggunaan nama/logo instansi pemerintah di section "Dipercaya Oleh" bisa didapat |
| **Risiko** | Payment gateway (Fase 2) butuh proses verifikasi bisnis (NIB/NPWP) — perlu dicek kesiapan dokumen legal bisnis |
| **Risiko** | Tanpa sistem inventori, laporan laba di Fase 3 bergantung pada input manual biaya operasional yang konsisten dari owner |
| **Mitigasi** | Fase 1 dirancang untuk tetap fully functional (CTA WA) walau Fase 2/3 belum jadi — tidak ada dependency blocking |

---

## 15. Timeline & Milestone (High-Level)

Timeline detail per task ada di `TASKPLAN.md`. Ringkasan makro:

1. **Fase 1 — Landing Page:** Setup → Design System → Build per section → Konten integrasi → SEO → Testing → Deploy
2. **Fase 2 — E-commerce:** Dimulai setelah Fase 1 live dan stabil
3. **Fase 3 — Dashboard:** Dimulai setelah Fase 2 punya data transaksi riil untuk diuji

---

## 16. Open Questions — Perlu Konfirmasi dari Klien (Orang Tua)

1. Izin resmi menampilkan nama/logo instansi pemerintah (Gubernur Babel, BAPEDA, dll) di website?
2. Dokumen legal bisnis (NIB/NPWP) untuk keperluan verifikasi Midtrans di Fase 2 — sudah ada?
3. Preferensi domain: `.id`, `.co.id`, atau `.com`?
4. Nomor WhatsApp Business yang akan dipakai untuk CTA Fase 1?
5. Apakah butuh multi-bahasa (Indonesia saja, atau tambah Inggris untuk klien non-lokal)?

---

*Dokumen ini adalah living document — update versi setiap ada perubahan scope signifikan.*
