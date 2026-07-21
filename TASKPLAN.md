# TASKPLAN — Areska Kitchen Digital Platform

| | |
|---|---|
| **Versi** | 1.1 |
| **Tanggal** | 21 Juli 2026 |
| **Referensi** | PRD.md v1.0 |
| **Fokus dokumen ini** | Detail eksekusi **Fase 1 (Landing Page)** — selesai kode, deployment menyusul — dan **Fase 2 (E-commerce/Ordering)**, breakdown penuh. Fase 3 (Dashboard Keuangan) masih high-level, akan di-breakdown ulang saat Fase 2 selesai. |
| **Keputusan deployment** | Seluruh kode Fase 1 + Fase 2 diselesaikan dulu sebelum ada deployment production — bukan deploy bertahap per fase. |

---

## Cara Baca Dokumen Ini

- Setiap fase punya beberapa **Phase** (bukan "Fase" bisnis, tapi tahap kerja teknis)
- Checklist `[ ]` = belum, `[x]` = selesai — update manual seiring progres
- Task ditandai **(butuh input klien)** kalau blocking-nya ada di orang tua, bukan di sisi teknis

---

## Referensi Aset

- `logo.png` — logo resmi (5 varian), lihat PRD §9.1. Dipakai langsung, final.
- `Mockup.png` — ilustrasi awal packaging + preview layout web, lihat PRD §9.1. Basis struktur section, bukan final UI.

---

## FASE 1: LANDING PAGE — Task Breakdown

### Phase 1 — Project Setup & Foundation
- [x] Init repo Next.js 14 (App Router) + TypeScript
- [x] Setup Tailwind CSS + config warna brand (hijau tua, krem, oranye) sebagai custom theme
- [x] Setup struktur folder (`app/`, `components/`, `lib/`, `public/assets/`)
- [x] Import & optimasi aset logo (semua varian: horizontal, icon-only, monochrome, black, white) ke `public/`
- [x] Setup font (serif untuk heading, sans untuk body) sesuai brand guideline
- [x] Setup Prisma schema awal (model `Product`, `Testimonial`, `Client` — walau dipakai statis dulu, schema disiapkan untuk Fase 2)
- [x] Setup ESLint/Prettier untuk konsistensi kode

### Phase 2 — Design System & Komponen Dasar
- [x] Buat komponen `Navbar` (logo + nav items + CTA button, responsive hamburger menu)
- [x] Buat komponen `Button` (primary/oranye, secondary/outline hijau)
- [x] Buat komponen `Card` (untuk menu item, testimoni)
- [x] Buat komponen `Footer`
- [x] Buat komponen `Badge`/icon-feature (untuk "Homemade", "Fresh Ingredients", dll)
- [x] Setup responsive breakpoints (mobile-first, sesuai 2 versi mockup: desktop & mobile)

### Phase 3 — Build Section: Hero & Trust Indicators
- [x] Build Hero Section (headline, sub-headline, dual CTA, gambar produk)
- [x] Build Trust Indicators (4 ikon: Masakan Rumahan, Bahan Berkualitas, Higienis & Bersih, Dibuat dengan Cinta)
- [x] Optimasi gambar hero (next/image, lazy load, WebP — via next/image otomatis serve AVIF/WebP)

### Phase 4 — Build Section: Tentang Kami & Dipercaya Oleh
- [x] Build section "Tentang Kami"
- [x] Build section "Dipercaya Oleh" — fallback teks tanpa logo (izin belum ada, lihat item klien di bawah)
- [ ] **(butuh input klien)** Kumpulkan daftar nama/logo instansi yang boleh ditampilkan + izin resmi

### Phase 5 — Build Section: Menu/Produk
- [x] Build komponen kategori menu (Nasi Kotak, Prasmanan, Snack Box, Pempek & Lainnya)
- [x] Build grid/list produk per kategori dengan foto, deskripsi, kisaran harga
- [ ] **(butuh input klien)** Kumpulkan daftar menu lengkap + foto + harga (saat ini pakai data placeholder realistis)
- [x] Fallback state kalau foto produk asli belum ada (shimmer skeleton + watermark "Foto segera hadir")

### Phase 6 — Build Section: Testimoni & Kontak
- [x] Build section Testimoni (carousel scroll-snap + autoplay)
- [ ] **(butuh input klien)** Kumpulkan minimal 3-5 testimoni (saat ini pakai data placeholder realistis)
- [x] Build section Kontak: alamat, jam operasional, Google Maps embed
- [x] Build form kontak sederhana (kirim ke WA, tanpa backend kompleks)
- [ ] **(butuh input klien)** Nomor WhatsApp Business, alamat lengkap, jam operasional (saat ini placeholder)

### Phase 7 — Integrasi CTA "Pesan Sekarang"
- [x] Arahkan semua tombol "Pesan Sekarang" ke WhatsApp Business dengan pre-filled message
- [x] Tambahkan copy teaser untuk fitur ordering online (Fase 2): "Sistem pemesanan online segera hadir"

### Phase 8 — SEO & Meta
- [x] Setup meta tags (title, description) per halaman
- [x] Setup Open Graph / social preview image
- [x] Setup structured data `LocalBusiness` (schema.org) untuk local SEO
- [x] Setup `sitemap.xml` & `robots.txt`
- [ ] Daftarkan ke Google Search Console (setelah live — butuh domain final)
- [ ] **(butuh input klien)** Setup/klaim Google Business Profile

### Phase 9 — Testing & QA
- [x] Test responsive di berbagai device — desktop diverifikasi penuh via browser; breakpoint mobile/tablet ditulis mobile-first & diverifikasi via kode/DOM, tapi belum ada screenshot visual mobile nyata (keterbatasan tool automation sesi ini) — disarankan quick check manual di device asli sebelum go-live
- [x] Test semua CTA & link (WhatsApp, Maps, form, nav, smooth-scroll) — semua berfungsi
- [x] Lighthouse audit (production build): Performance 91-93, Accessibility 100, Best Practices 100, SEO 100 — lolos target ≥90
- [ ] Cross-browser check (Chrome, Safari, Firefox) — baru diverifikasi di Chrome; Safari/Firefox belum (keterbatasan tool automation sesi ini)
- [x] Accessibility check dasar — kontras warna diaudit & diperbaiki (lihat commit "Lighthouse-driven accessibility fixes"), alt text lengkap di semua gambar
- [x] Bug ditemukan oleh user (real-browser testing) & diperbaiki: gambar section "Tentang Kami" tidak pernah muncul untuk sebagian user — lihat "Catatan Bug & Lessons Learned" di bawah

### Phase 10 — Deployment
- [ ] Setup domain (nunggu keputusan `.id`/`.co.id`/`.com`)
- [ ] Deploy ke hosting (Vercel atau VPS — dikonfirmasi)
- [ ] Setup SSL/HTTPS
- [ ] Final review bareng orang tua sebelum go-live
- [ ] Go-live 🎉

---

### Phase 11 — UI/UX Enhancement: Navbar Interaktif, Hover Effect, Marquee "Dipercaya Oleh", Scroll Transitions
- [x] Navbar: efek "timbul" (hover lift + tap press) di semua nav item desktop, hamburger button, dan tombol close — plus garis bawah saat hover dan saat section aktif (scroll-spy berbasis posisi scroll, `components/ui/Navbar.tsx`)
- [x] Mobile drawer: item menu dapat efek press yang sama + indikator section aktif (accent bar kiri)
- [x] Hover interaktif (tilt 3D ringan + lift) pada gambar Hero, gambar Tentang Kami, dan tiap chip di "Dipercaya Oleh" — komponen baru `components/ui/TiltCard.tsx`
- [x] "Dipercaya Oleh" dirombak jadi 2 baris marquee (baris atas kiri→kanan, baris bawah kanan→kiri, pause saat hover) — data di `lib/data.ts` (`trustedBrands`, field `row` siap dipetakan ke admin dashboard Fase 2/3). **Masih pakai placeholder ilustratif** (nama kategori generik + label "*Contoh ilustratif"), bukan nama instansi resmi — izin masih pending, lihat checklist di bawah
- [x] Efek transisi scroll berbeda-beda per section (fade-up/fade-down/fade-left/fade-right/scale), replay tiap section masuk viewport — komponen baru `components/ui/ScrollReveal.tsx`. **Sengaja dikecualikan** dari foto inti Hero & Tentang Kami, serta form/peta/alamat Kontak (lihat "Catatan Bug & Lessons Learned" di bawah — carve-out ini disengaja untuk menghindari regresi ke bug sebelumnya)
- [ ] Verifikasi visual mobile (hamburger, marquee, nav aktif-bar) di device asli — tool automation sesi ini tidak bisa resize viewport browser (limitasi sama seperti tercatat di Phase 9), sudah diverifikasi lewat logic/breakpoint review tapi belum screenshot mobile nyata
- [x] Revisi kecil: urutan navbar diperbaiki (Beranda → Tentang Kami → Menu → Testimoni → Kontak, sebelumnya Menu keliru ditaruh sebelum Tentang Kami padahal urutan section di halaman sebaliknya)
- [x] Revisi kecil: chip marquee "Dipercaya Oleh" disederhanakan jadi logo polos (gambar atau ikon fallback) tanpa card/box pembungkus, ukuran diperbesar — disiapkan untuk mode logo-asli (`logoUrl`) yang akan dipakai user ke depannya
- [x] Bug fix (dilaporkan user via real-device testing, dengan screenshot bukti — lihat `gambar-ref/navbar trans.jpeg`): drawer navigasi mobile transparan di bagian body-nya (list menu Beranda/Tentang Kami/dll tembus pandang, tumpang-tindih dengan konten Hero di baliknya) saat dibuka pada section selain Beranda. **Root cause sebenarnya** (percobaan fix pertama — scroll-lock `overflow:hidden` — salah sasaran, sudah di-revert): `<header>` pembungkus drawer punya class `backdrop-blur-md` (aktif setiap kali `scrolled` true, yaitu setiap kali user sudah scroll melewati section Beranda). Properti CSS `backdrop-filter` pada elemen manapun otomatis menjadikannya *containing block* untuk descendant `position:fixed` di dalamnya (perilaku standar CSS, bukan bug browser) — karena drawer (`fixed inset-y-0 ...`) ada **di dalam** `<header>` yang tingginya cuma ~64px, posisi & tinggi drawer jadi salah hitung relatif ke box 64px itu alih-alih ke layar penuh, sehingga background solid-nya tidak ter-render dengan benar di area bawah. **Fix final:** drawer & overlay dipindah jadi sibling dari `<header>` (bukan child-nya) di `components/ui/Navbar.tsx` — sekarang posisinya kembali mengacu ke viewport penuh seperti seharusnya, terlepas dari state blur header. Bug ini sebenarnya sudah ada sejak implementasi navbar awal (Phase 2), bukan regresi dari sesi ini — baru ketahuan sekarang lewat testing di device asli

---

## FASE 2: E-COMMERCE/ORDERING — Task Breakdown

| | |
|---|---|
| **Referensi** | PRD.md §7, §10-11 |
| **Prasyarat masuk fase ini** | Fase 1 live & stabil di GitHub (`main` branch, commit `983210c`) — deployment production Fase 1 sendiri masih menyusul, dikerjakan bareng di akhir Fase 2 sesuai keputusan user: seluruh kode Fase 1+2 selesai dulu sebelum ada yang di-deploy |
| **Keputusan arsitektur** | Schema Prisma sudah disiapkan sejak Fase 1 (`Product`, `Order`, `OrderItem`, `Transaction`, `User`) — fase ini mengaktifkan model-model itu, bukan mendesain ulang dari nol |

### Cara Baca Breakdown Ini
Sama seperti Fase 1: checklist `[ ]`/`[x]`, task **(butuh input klien)** untuk yang blocking-nya di orang tua/keputusan bisnis, bukan teknis. Beberapa keputusan arsitektur (auth strategy, hosting Postgres, WhatsApp API vs manual) ditandai **(butuh keputusan)** — teknis tapi perlu pilihan sebelum mulai koding supaya tidak ada rework besar di tengah jalan.

---

### Phase 1 — Infrastruktur & Database ✅ selesai 21 Juli 2026
- [x] Setup PostgreSQL lokal via Docker Compose (`web/docker-compose.yml`, port host **5433** — bukan 5432 karena bentrok dengan PostgreSQL native Windows yang sudah jalan di mesin dev) — hosting production: **Neon**
- [x] `DATABASE_URL` dev disambungkan ke Postgres lokal, migrasi pertama `20260721045609_init_ecommerce` berhasil di-apply
- [x] Schema Prisma diperluas: `Product.price` (harga definitif pengganti priceMin/priceMax yang cuma tampilan), `Order` tambah `deliveryAddress`/`eventDate`/`notes`/`totalAmount`, `Transaction` tambah field Midtrans (`midtransOrderId`/`midtransTransactionId`/`midtransStatus`/`snapToken` — disiapkan sejak awal untuk Phase 6), `User.password` untuk credentials login, `Client.row` untuk marquee 2-baris. **Tidak** ditambah field stock/inventori — bisnis made-to-order (masak sesuai pesanan), bukan retail dari stok tetap
- [x] Model `Testimonial` & `Client` siap dipakai dinamis (field `row` di `Client` cocok dengan struktur data marquee "Dipercaya Oleh" dari Fase 1 Phase 11)
- [x] Seed (`prisma/seed.ts`, jalankan via `npx prisma db seed`) — 9 produk, 4 testimoni, 12 client dari `lib/data.ts`, plus 1 akun admin dev (kredensial di-print ke console saat seed jalan, **wajib diganti sebelum production**)

### Phase 2 — Autentikasi ✅ login admin selesai 21 Juli 2026 (akun pelanggan menyusul di Phase 8)
- [x] Login admin: credentials sederhana (email+password, 1 akun, `next-auth@4` — stabil, bukan v5 yang masih beta setelah 32 rilis beta) — `app/admin/login/page.tsx`
- [x] Setup NextAuth — session strategy **JWT** (tidak butuh tabel adapter `Account`/`Session`/`VerificationToken` karena cuma Credentials provider, tidak ada OAuth) — `lib/auth.ts`, `app/api/auth/[...nextauth]/route.ts`
- [x] Middleware proteksi route `/admin/*` (`middleware.ts`) — **bug ditemukan & diperbaiki saat testing**: matcher regex awal `/admin/((?!login).*)` cuma cocok untuk path dengan segmen tambahan setelah `/admin/`, path `/admin` polos (tanpa trailing apa pun) lolos tanpa proteksi sama sekali. Fix: tambah `/admin` eksplisit ke matcher array. Diverifikasi ulang: akses langsung ke `/admin` tanpa login sekarang benar-benar redirect ke `/admin/login`
- [x] Dashboard admin placeholder (`app/admin/page.tsx`) + tombol logout, keduanya diverifikasi end-to-end via browser (login sukses → dashboard, login gagal → pesan error, logout → balik ke login, akses langsung tanpa sesi → redirect)
- [ ] Akun pelanggan (keputusan final 21 Juli 2026: **guest checkout + opsional akun**) — checkout tanpa daftar tetap bisa (retail: nasi kotak/snack box), tapi pelanggan juga bisa daftar akun untuk riwayat order otomatis tersimpan — dikerjakan di Phase 8

### Phase 3 — Dashboard Admin: Manajemen Konten
- [ ] Layout admin (sidebar/nav terpisah dari landing page, bukan bagian dari navbar publik)
- [ ] Halaman login admin
- [ ] CRUD Produk (nama, kategori, deskripsi, harga, foto — upload gambar, toggle aktif/nonaktif)
- [ ] CRUD Testimoni (ganti placeholder statis dari Fase 1 jadi dikelola dari sini)
- [ ] CRUD "Dipercaya Oleh" (nama instansi, logo, baris 1/2, toggle tampil) — **ini yang disebut user di Fase 1 sesi sebelumnya ("bisa diatur di dashboard admin nantinya")**, komponen tampilan (marquee, `TiltCard`) sudah siap, tinggal disambungkan ke data dinamis
- [ ] List & detail order masuk (lihat semua order, filter by status)

### Phase 4 — Katalog Publik Dinamis
- [ ] Ganti `menuItems`/`trustIndicators`/`testimonials`/`trustedBrands` statis di `lib/data.ts` jadi query database (Server Component)
- [ ] Halaman detail produk (opsional — atau tetap grid+card seperti Fase 1, tergantung kebutuhan checkout)
- [ ] Filter kategori tetap jalan seperti Fase 1, sekarang sumber datanya dinamis

### Phase 5 — Keranjang & Checkout
- [ ] State keranjang sisi klien (persist ke localStorage, guest-friendly)
- [ ] UI keranjang (drawer atau halaman terpisah): tambah/kurang qty, hapus item, subtotal
- [ ] Halaman checkout: info kontak, alamat/catatan pengiriman
- [ ] **Pembeda dua jenis order (PRD §7, wajib)**: order retail (nasi kotak/snack box) → langsung lanjut ke pembayaran; order custom/event besar (prasmanan) → masuk status `PENDING`, butuh konfirmasi manual admin dulu sebelum link pembayaran dikirim — field `Order.isCustomEvent` sudah ada di schema untuk ini
- [ ] Order tersimpan ke database sebelum proses bayar dimulai

### Phase 6 — Integrasi Payment (Midtrans)
- [ ] **(butuh input klien)** Verifikasi kesiapan dokumen legal bisnis (NIB/NPWP) untuk pendaftaran akun bisnis Midtrans — tanpa ini, tidak bisa lanjut ke akun production (sandbox tetap bisa dipakai untuk development)
- [ ] Daftar akun Midtrans (mulai dari sandbox/testing), ambil API key
- [ ] Integrasi Snap API (checkout redirect/popup)
- [ ] Webhook/callback handler (API route) — update status `Transaction` & `Order` otomatis saat pembayaran berhasil/gagal, dengan verifikasi signature (wajib, jangan percaya payload webhook mentah-mentah)
- [ ] Halaman hasil: sukses / gagal / pending pembayaran

### Phase 7 — Status Order & Notifikasi
- [ ] Alur status order lengkap: `PENDING` → `CONFIRMED` → `PROCESSING` → `COMPLETED` (+ `CANCELLED`) — enum `OrderStatus` sudah ada di schema
- [ ] Admin: aksi konfirmasi manual untuk order custom/event (Phase 5) sebelum lanjut ke pembayaran
- [ ] Halaman tracking status order untuk pelanggan (by order ID, tanpa perlu login)
- [ ] Notifikasi perubahan status (keputusan final 21 Juli 2026: **link WhatsApp manual/semi-otomatis**, sama seperti CTA `wa.me` di Fase 1) — pesan pre-filled berisi status terbaru, admin tinggal klik kirim; upgrade ke WhatsApp Business API resmi ditunda sampai volume order signifikan

### Phase 8 — Akun Pelanggan (opsional, sesuai keputusan Phase 2: guest checkout + opsional akun)
- [ ] Registrasi & login pelanggan
- [ ] Halaman riwayat order pelanggan

### Phase 9 — Testing & QA
- [ ] Test end-to-end alur order: browse → keranjang → checkout → bayar (sandbox Midtrans) → webhook update status → konfirmasi
- [ ] Test CRUD admin (produk, testimoni, dipercaya oleh)
- [ ] Security review: verifikasi signature webhook, proteksi route admin, tidak ada data kartu tersimpan sendiri (sesuai PRD §12 — PCI-DSS via Midtrans)
- [ ] Test responsive mobile untuk seluruh flow baru (checkout, admin) — dengan pelajaran dari Fase 1: jangan andalkan automation tool session ini untuk verifikasi visual mobile, selalu cross-check di device asli

### Phase 10 — Deployment (dikerjakan setelah SEMUA kode Fase 1 + Fase 2 selesai, sesuai arahan user)
- [ ] Hosting final: **Vercel (app) + Neon (Postgres)** — konsisten dengan keputusan Phase 1
- [ ] Setup domain (masih pending dari Fase 1 — `.id`/`.co.id`/`.com`)
- [ ] Migrasi Midtrans dari sandbox ke production keys
- [ ] Environment secrets production (`DATABASE_URL`, `NEXTAUTH_SECRET`, Midtrans keys)
- [ ] Deploy Fase 1 (landing page, sekarang dengan katalog dinamis) + Fase 2 (ordering) sekaligus
- [ ] Final review bareng orang tua sebelum go-live

---

## Keputusan Arsitektur Fase 2 (final, dikonfirmasi 21 Juli 2026)

| Keputusan | Pilihan | Alasan singkat |
|---|---|---|
| Hosting database | **Neon** (managed Postgres), Docker Compose untuk lokal/dev | Gratis untuk skala bisnis ini, nol maintenance server, dibanding VPS yang selalu ada biaya bulanan sejak hari pertama meski belum ada order |
| Auth pelanggan | **Guest checkout + opsional akun** | Checkout tetap cepat tanpa hambatan daftar, tapi pelanggan yang mau bisa daftar untuk riwayat order otomatis |
| Notifikasi status order | **Link WhatsApp manual/semi-otomatis** (`wa.me` pre-filled) | Gratis, tidak perlu verifikasi Meta Business, cukup untuk volume order awal — upgrade ke API resmi kalau volume sudah signifikan |

## Checklist Input Klien Sebelum/Selama Fase 2

- [ ] Dokumen legal bisnis (NIB/NPWP) — kesiapan untuk verifikasi akun bisnis Midtrans
- [ ] (Carry-over dari Fase 1, masih relevan) Nomor WA Business asli, menu & harga final, foto produk asli, testimoni asli, izin nama/logo instansi, keputusan domain

---

## FASE 3: DASHBOARD ADMIN (KEUANGAN) — Roadmap High-Level

*(Detail task breakdown menyusul setelah Fase 2 punya data transaksi riil)*

- [ ] Desain data model `FinancialRecord` (modal, biaya operasional, periode)
- [ ] Build kalkulasi otomatis laba kotor (dari data `Transaction` Fase 2)
- [ ] Build input manual biaya operasional (listrik, gas, transport, dll)
- [ ] Kalkulasi laba bersih
- [ ] Build laporan periodik (harian/mingguan/bulanan/tahunan)
- [ ] Export laporan (PDF/Excel) format siap-pajak
- [ ] Dashboard visual sederhana (grafik tren, produk terlaris)
- [ ] User testing langsung dengan orang tua — pastikan UX cukup sederhana tanpa background akuntansi

---

## Catatan Bug & Lessons Learned

### Bug: konten macet tersembunyi (ditemukan 20 Juli 2026, oleh user via real-browser testing)

**Gejala:** Gambar di section "Tentang Kami" tidak pernah muncul di browser user, meski kode & asset-nya benar (dikonfirmasi lewat automation testing — server tidak error, file gambar ada dan valid).

**Root cause (2 lapis):**
1. Pola `shouldReduceMotion ? undefined : {hiddenState}` dipakai di initial/animate/whileInView hampir semua section. `useReducedMotion()` bernilai `null` (falsy) sesaat sebelum preferensi asli diketahui, jadi elemen sempat di-set ke state tersembunyi dulu. Kalau preferensi asli user ternyata "reduce motion", prop animate/whileInView berikutnya jadi `undefined` — elemen kehilangan "tujuan" untuk animasi balik ke tampak, macet tersembunyi selamanya.
2. Setelah #1 diperbaiki, section "Tentang Kami" *masih* bermasalah — ternyata `whileInView` (scroll-trigger) juga rentan tidak pernah ter-trigger tergantung ukuran layar/perilaku scroll user, dan animasi berbasis `requestAnimationFrame` (termasuk yang mount-triggered) bisa tertahan di kondisi tertentu (tab background, dsb).

**Fix final:** Section "Tentang Kami" — gambar & teks di-render statis (selalu tampak sejak awal DOM, tanpa bergantung animasi JS sama sekali). Section lain yang tadinya pakai `whileInView` (Trust Indicators, Dipercaya Oleh, peta di Kontak) diganti jadi `animate` (trigger begitu komponen mount, bukan menunggu scroll masuk viewport) — menghilangkan satu kelas kegagalan (IntersectionObserver threshold tidak pernah tercapai).

**Lesson untuk ke depan (Fase 2/3):**
- **Jangan pernah** membuat konten penting (bukan dekorasi) bergantung pada animasi untuk menjadi *terlihat*. State awal (sebelum JS animasi jalan) harus tetap dapat diterima dilihat user, bukan `opacity:0`/`clip-path` tersembunyi total.
- Hindari pola `kondisi ? undefined : {...}` untuk prop `initial`/`animate`/`whileInView` Framer Motion — kalau perlu menghormati `prefers-reduced-motion`, pastikan prop-nya **selalu berupa object yang valid** (state "tersembunyi" dan "tampak" dibuat identik saat reduce-motion aktif), jangan pernah `undefined`.
- Scroll-reveal (`whileInView`) sebaiknya dipakai untuk elemen dekoratif/nice-to-have saja. Untuk konten inti (foto produk, form, alamat, dsb), pakai animasi mount-triggered (`animate`) atau bahkan tanpa animasi sama sekali.
- Selalu lakukan smoke test di browser **nyata** (bukan cuma automation tool) sebelum menganggap sebuah fitur selesai — automation tool sesi ini punya keterbatasan (tab sering dianggap "background" oleh browser sehingga animasi ter-throttle), jadi tidak selalu merepresentasikan pengalaman user asli.

---

## Checklist Konten Dari Klien (Rekap, lihat PRD §6.3)

- [ ] Nomor WhatsApp Business
- [ ] Daftar menu lengkap + harga per kategori
- [ ] Foto produk asli (opsional, kalau ada di luar mockup)
- [ ] Alamat lengkap & jam operasional
- [ ] 3-5 testimoni pelanggan
- [ ] Izin nama/logo instansi untuk section "Dipercaya Oleh"
- [ ] Link media sosial (jika ada)
- [ ] Keputusan domain (`.id`/`.co.id`/`.com`)

---

## Log Sesi Kerja

### 20 Juli 2026 — Sesi 1 (Eksekusi Fase 1 penuh)

Landing page Fase 1 dibangun end-to-end dalam satu sesi: Phase 1-9 dari breakdown di atas selesai (kecuali item yang butuh input klien). Detail:

- Project setup (Next.js 14 + Tailwind + Prisma) → design system components → semua section (Hero, Trust Indicators, Tentang Kami, Dipercaya Oleh, Menu, Testimoni, Kontak) → integrasi CTA WhatsApp → SEO/meta → testing & QA (Lighthouse: Performance 91-93, Accessibility 100, Best Practices 100, SEO 100).
- Setelah review awal, user menemukan bug nyata lewat testing di browser sendiri: gambar section "Tentang Kami" tidak muncul. Ditelusuri dan diperbaiki (3 iterasi, root cause di pola animasi Framer Motion — detail lengkap di "Catatan Bug & Lessons Learned" di atas).
- Semua progress ter-commit rapi per Phase di git (`web/` folder), 13 commit total. Dev server terakhir jalan bersih di `localhost:3000` tanpa error.

**Belum sempat dikerjakan / lanjutan untuk sesi berikutnya:**
- Verifikasi visual mobile/tablet nyata (tool automation sesi ini tidak bisa resize viewport browser) — sebaiknya dicek manual di HP asli
- Cross-browser check Safari/Firefox (baru diverifikasi Chrome)
- Semua item "(butuh input klien)" di checklist Phase 4-8 — masih pakai data placeholder realistis, menunggu orang tua Jaee menyediakan: nomor WA asli, menu & harga final, foto produk asli, alamat & jam operasional, testimoni asli, izin logo instansi, keputusan domain
- Phase 10 (Deployment) belum dimulai — menunggu keputusan domain & hosting

**Titik mulai sesi berikutnya:** review bareng apakah placeholder data sudah mau diganti data asli, atau lanjut ke polish/QA tambahan (mobile check, cross-browser) sambil menunggu konten dari klien.

### 21 Juli 2026 — Sesi 2 (UI/UX Enhancement: Phase 11)

User minta 4 revisi interaktivitas landing page (lihat detail checklist Phase 11 di atas): navbar lebih hidup, hover effect di gambar Hero/Tentang Kami/Dipercaya Oleh, "Dipercaya Oleh" jadi 2-baris marquee siap-admin, dan efek transisi scroll berbeda-beda per section (replay tiap masuk viewport, sesuai konfirmasi user).

Karena sesi sebelumnya pernah ada bug serius (gambar macet tersembunyi akibat pola `kondisi ? undefined : {...}` pada prop animasi Framer Motion — lihat "Catatan Bug & Lessons Learned"), implementasi baru dirancang eksplisit aman: komponen baru `ScrollReveal` selalu memberi object valid ke `whileInView` (tidak pernah `undefined`), dan foto inti (Hero, Tentang Kami) serta form/peta/alamat Kontak sengaja **tidak** dipasangi scroll-reveal (hanya hover interaction lewat `TiltCard`, yang aman karena tidak menyentuh initial visibility).

Sempat ada 2 masalah teknis saat verifikasi browser, keduanya sudah diperbaiki dalam sesi ini:
1. Scroll-spy navbar awal pakai `IntersectionObserver` dengan `rootMargin` band tengah — ternyata race condition antar-callback bisa bikin underline aktif salah pindah ke item yang salah saat scroll cepat (karena urutan `NAV_ITEMS` di kode beda dari urutan section asli di halaman: "Menu" ditaruh sebelum "Tentang Kami" di navbar meski section-nya di bawah). Diganti jadi pendekatan berbasis posisi scroll (`getBoundingClientRect` + `requestAnimationFrame`, diurutkan sesuai posisi asli di DOM lewat `compareDocumentPosition`) — deterministik, tidak ada lagi race.
2. Setelah `tailwind.config.ts` ditambah keyframes marquee, dev server yang sudah lama jalan tidak me-rebuild CSS-nya (class `animate-marquee-left/right` tidak ter-generate). Fix: hentikan proses lama, hapus cache `.next`, restart `npm run dev` — marquee langsung jalan normal setelahnya.

Diverifikasi lewat Chrome browser automation: navbar hover/active underline benar, scroll-spy akurat di semua section, tilt hover di gambar Hero & Tentang Kami terasa, marquee 2 baris bergerak berlawanan arah dan pause saat hover per-baris (dicek lewat `getComputedStyle` `animationPlayState`), scroll-reveal tiap section replay dengan varian berbeda. `tsc --noEmit` dan `next lint` bersih tanpa error.

**Belum sempat diverifikasi:** tampilan mobile asli (hamburger, marquee, drawer) — tool automation sesi ini tidak bisa resize viewport browser (limitasi yang sama seperti dicatat di Phase 9 sesi sebelumnya). Logic responsive-nya tidak diubah dari breakpoint yang sudah ada, tapi tetap disarankan quick check manual di HP asli sebelum dianggap final.

**Update dalam sesi yang sama:** user cek langsung di HP asli, lapor 2 bug drawer mobile — keduanya diperbaiki, detail lengkap ada di checklist Phase 11 baris terakhir. Yang kedua (drawer transparan) baru betul-betul ketemu akar masalahnya setelah user kirim screenshot bukti (`gambar-ref/navbar trans.jpeg`) — pelajaran: untuk bug visual yang sulit direproduksi lewat automation tool, minta screenshot/bukti visual dari user itu jauh lebih efektif daripada menebak dari kode saja.

### 21 Juli 2026 — Sesi 3 (Push ke GitHub + Rancang Fase 2)

**Push ke GitHub (`monn01/Areska-Kitchen`):** Sebelumnya hanya folder `web/` yang punya git history (13 commit), sementara `PRD.md`/`DESIGN.md`/`TASKPLAN.md`/`gambar-ref/` di root belum ter-track sama sekali. Digabung jadi satu repo git tunggal di root project — riwayat commit `web/` (14 commit termasuk commit Phase 11 sesi ini) digabung lewat teknik subtree merge manual (`git read-tree --prefix=web/`, karena `git subtree add` menolak kalau folder tujuan sudah ada) supaya history lama tidak hilang, digabung dengan 1 commit awal berisi dokumen-dokumen root. Ditambah `.gitignore` root baru (exclude `.claude/settings.local.json` — config lokal, bukan source project). Push ke `main` berhasil tanpa atribusi Claude Code di commit message manapun.

**Upgrade TASKPLAN.md untuk Fase 2:** Breakdown Fase 2 (E-commerce/Ordering) di-detail-kan dari daftar high-level jadi 10 Phase (lihat bagian "FASE 2" di atas), mengacu ke PRD §7 dan schema Prisma yang sudah disiapkan sejak Fase 1 (`Product`, `Order`, `OrderItem`, `Transaction`, `User` — tinggal diaktifkan, bukan didesain ulang). Beberapa keputusan arsitektur ditandai eksplisit **(butuh keputusan)** karena berdampak besar kalau salah pilih di awal: strategi auth pelanggan (guest vs akun), hosting Postgres (VPS vs managed), dan pendekatan notifikasi WhatsApp (API resmi vs manual) — direkomendasikan diputuskan sebelum mulai koding Phase 5-7 supaya tidak ada rework.

**Keputusan user:** seluruh kode Fase 1 + Fase 2 diselesaikan dulu sebelum ada deployment production apapun — dicatat di header dokumen ini.

**Titik mulai sesi berikutnya:** Fase 2 Phase 1 (setup PostgreSQL + migrasi schema) — tapi ada beberapa **(butuh keputusan)** yang sebaiknya dikonfirmasi dulu bareng user sebelum mulai koding (lihat "Checklist Keputusan & Input Klien" di atas), khususnya soal hosting Postgres karena itu menentukan setup dev environment dari awal.

---

*Update checklist ini secara berkala. Setiap Phase selesai → commit + note progress di sini.*
