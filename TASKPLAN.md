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

### Phase 3 — Dashboard Admin: Manajemen Konten ✅ selesai 21 Juli 2026
- [x] Layout admin dengan sidebar (`app/admin/(dashboard)/layout.tsx`, route group supaya halaman login tidak ikut memakai shell sidebar)
- [x] Halaman login admin (selesai di Phase 2)
- [x] CRUD Produk (`lib/actions/products.ts` + `components/admin/ProductForm.tsx`) — nama, kategori, deskripsi, harga, URL gambar, toggle aktif. Upload gambar langsung **belum tersedia** — admin isi URL gambar yang sudah di-hosting di tempat lain (Cloudinary/Google Drive/dst); upload file asli butuh layanan storage terpisah (mis. Vercel Blob) yang belum di-setup, jadi sengaja disederhanakan dulu
- [x] CRUD Testimoni (`lib/actions/testimonials.ts` + `components/admin/TestimonialForm.tsx`) — ganti placeholder statis Fase 1
- [x] CRUD "Dipercaya Oleh" (`lib/actions/trusted-clients.ts` + `components/admin/ClientForm.tsx`) — nama, URL logo, baris 1/2, toggle tampil. **Ini yang disebut user di Fase 1 sesi sebelumnya** ("bisa diatur di dashboard admin nantinya") — komponen tampilan (marquee, `TiltCard`) dari Phase 11 sekarang tersambung ke data dinamis
- [x] List & detail order masuk (`app/admin/(dashboard)/orders/`) — read-only dengan filter status untuk Phase 3 ini; aksi ubah status (konfirmasi manual order custom/event) sengaja ditunda ke Phase 7 sesuai scope breakdown, belum ada order asli sampai Phase 5 (checkout) selesai
- Setiap Server Action diberi lapisan proteksi sendiri (`requireAdmin()` di `lib/auth.ts`) — tidak cuma andalkan middleware, karena Server Action punya endpoint sendiri yang bisa dipanggil langsung
- **Bug ditemukan & diperbaiki saat testing**: scroll wheel di atas input harga (`type="number"`) yang sedang fokus mengubah nilainya tanpa sengaja (kuirk browser bawaan HTML). Fix: `onWheel={(e) => e.currentTarget.blur()}` di `ProductForm.tsx`
- Diverifikasi end-to-end via browser: tambah/edit produk berhasil (termasuk cek data tersimpan benar di tabel), semua halaman list (Produk, Testimoni, Dipercaya Oleh, Order) menampilkan data seed dengan benar, dashboard menampilkan angka statistik akurat. Tombol Hapus tidak dites lewat automation (pakai `confirm()` native yang nge-block tool CDP — aman untuk user asli, cuma tidak kompatibel dengan automation sesi ini), diverifikasi lewat code review saja

### Phase 4 — Katalog Publik Dinamis ✅ selesai 21 Juli 2026
- [x] `Menu`/`Testimonials`/`TrustedBy` diubah jadi Server Component yang query database langsung — masing-masing dipecah jadi wrapper Server (fetch data) + sub-komponen Client (interaktivitas: tab kategori, carousel, marquee) karena Client Component tidak bisa `async`
- [x] `lib/data.ts` dibersihkan — cuma sisa `trustIndicators` & `businessInfo` yang memang tetap statis (tidak ada model Prisma untuk itu, sesuai scope PRD)
- [x] Filter kategori tetap jalan, sumber datanya sekarang dinamis (`lib/product-categories.ts` — konstanta kategori dipakai bareng oleh sisi publik & admin, hindari duplikasi)
- [x] **Bug laten ditemukan & diperbaiki**: `next.config.mjs` belum ada `images.remotePatterns`, jadi `next/image` bakal reject URL gambar eksternal yang diinput admin (semua host HTTPS sekarang diizinkan)
- [x] Section "Dipercaya Oleh" & "Testimoni" sekarang `return null` kalau tidak ada data `isVisible`/`isFeatured` — bukan lagi selalu tampil dengan placeholder (disepakati dengan user: 12 entri seed di-set `isVisible: true` supaya perilaku terlihat sama seperti sebelumnya sampai admin ganti dengan data instansi asli)

### Phase 5 — Keranjang, Checkout & Penjadwalan ✅ selesai 21 Juli 2026
- [x] `lib/cart-context.tsx` — state keranjang via React Context, persist ke localStorage, dipasang di `app/layout.tsx`
- [x] `components/cart/CartButton.tsx` — ikon + badge jumlah item di navbar, drawer slide-in (tambah/kurang qty, hapus, subtotal)
- [x] `app/checkout/page.tsx` + `components/checkout/CheckoutForm.tsx` — info pelanggan, alamat, jadwal, kode voucher, ringkasan & total
- [x] **Pembeda dua jenis order (PRD §7)**: `isCustomEvent` otomatis `true` kalau keranjang berisi produk kategori PRASMANAN — retail lanjut ke Midtrans langsung, custom/event masuk `PENDING` menunggu admin
- [x] **Penjadwalan (fitur #3, CRITICAL)**: date picker (min besok) + jam 07.00–20.00, validasi cutoff **H-1 20.00 WIB** di server (`lib/settings.ts` — `validateEventDate`), nilai cutoff disimpan di model baru `AppSetting` (single-row, diedit dari `/admin/settings`, bukan hardcode)
- [x] Tidak ada batas kapasitas harian — sebagai gantinya `AppSetting.retailCheckoutEnabled` jadi toggle darurat admin
- [x] `lib/actions/checkout.ts` — `createOrder` recompute semua harga dari database (tidak pernah percaya harga dari client), redirect ke `/order/[id]`

### Phase 6 — Ongkir & Area Pengiriman ✅ selesai 21 Juli 2026 (dengan catatan implementasi)
- [x] Hitung ongkir berbasis jarak & validasi area layanan — **implementasi berbeda dari rencana awal**: alih-alih Google Maps Platform API (butuh API key berbayar + billing account), dipakai **jarak garis lurus (Haversine, `lib/geo.ts`) + Geolocation API bawaan browser** (tombol "Gunakan Lokasi Saat Ini", gratis, tanpa API key). Titik lokasi dapur, radius, dan tarif/km disimpan di `AppSetting`, diedit dari `/admin/settings`
- [x] Kalau pelanggan tidak memberi izin lokasi, ongkir tidak dihitung otomatis — order tetap dibuat tapi masuk jalur **review manual admin** (bukan langsung ke pembayaran), konsisten dengan pola order custom/event
- [ ] **(butuh input klien)** Titik lokasi dapur/toko asli (sekarang masih default estimasi pusat kota Pangkalpinang), radius area layanan final, tarif ongkir/km final — WAJIB dikonfirmasi & diubah di `/admin/settings` sebelum go-live, angka sekarang cuma placeholder wajar
- [ ] Upgrade ke Google Maps Distance Matrix (jarak jalan asli, bukan garis lurus) tetap terbuka sebagai peningkatan nanti kalau dirasa perlu — arsitektur `estimateDeliveryFee()` di `lib/actions/checkout.ts` dirancang supaya gampang diganti tanpa mengubah pemanggilnya

### Phase 7 — Integrasi Payment (Midtrans) ✅ selesai 21 Juli 2026 (kode; verifikasi akun tertunda)
- [x] `midtrans-client` terpasang, `lib/midtrans.ts` (Snap client, sandbox by default lewat `MIDTRANS_IS_PRODUCTION`)
- [x] `lib/actions/payment.ts` — `initiatePayment` bikin transaksi Snap, simpan `midtransOrderId`/`snapToken` ke `Transaction`, redirect ke halaman bayar Midtrans
- [x] `app/api/midtrans/webhook/route.ts` — verifikasi signature SHA512 (WAJIB, sesuai dokumentasi Midtrans) sebelum update status `Transaction`/`Order`
- [x] Halaman hasil: `/order/[id]` dipakai sebagai `finish_url` sekaligus halaman tracking; tombol "Bayar Sekarang" (`RetryPaymentButton`) untuk retry kalau transaksi pertama gagal/belum selesai
- [ ] **(butuh input klien)** Verifikasi kesiapan dokumen legal bisnis (NIB/NPWP) untuk akun bisnis Midtrans production — sandbox (`MIDTRANS_SERVER_KEY`/`MIDTRANS_CLIENT_KEY` di `.env`) masih kosong, perlu didaftarkan dulu di dashboard.sandbox.midtrans.com untuk bisa dites end-to-end

### Phase 8 — Status Order & Notifikasi ✅ selesai 21 Juli 2026
- [x] Alur status lengkap jalan — webhook Midtrans otomatis set `CONFIRMED`/`CANCELLED`, admin bisa ubah manual lewat dropdown di `/admin/orders/[id]` (`components/admin/OrderStatusControls.tsx`)
- [x] Admin: tombol "Buat Link Pembayaran" untuk order custom/event (generate Snap link manual setelah admin konfirmasi, dikirim sendiri lewat WA — bukan otomatis, sesuai alur PRD §7)
- [x] Halaman tracking `/order/[id]` — bisa diakses tanpa login (order id sebagai token akses, cukup acak/tidak bisa ditebak)
- [x] Notifikasi WA manual — tombol "Kirim Notifikasi WhatsApp" di admin generate link `wa.me` ke **nomor pelanggan** (bukan nomor bisnis) dengan pesan status pre-filled. Ditambah `buildWhatsAppLinkTo()` + `normalizeIndonesianPhone()` baru di `lib/utils.ts` (fungsi lama `buildWhatsAppLink` cuma bisa ke nomor bisnis)

### Phase 9 — Akun Pelanggan & Multi-Alamat ✅ selesai 21 Juli 2026
- [x] Registrasi (`/account/register`) & login (`/account/login`) pelanggan — pakai `CredentialsProvider` yang sama dengan admin (`isAdmin: false`), tidak perlu provider terpisah
- [x] `middleware.ts` ditulis ulang dari `withAuth` jadi middleware manual (`getToken` langsung) — supaya `/admin/*` dan `/account/*` bisa redirect ke halaman login masing-masing yang berbeda, sesuatu yang tidak didukung `withAuth` (cuma satu `pages.signIn` global)
- [x] `/account` — riwayat order (query `Order.userId`) + manajemen alamat tersimpan (fitur #11: `lib/actions/addresses.ts`, model `Address` baru dengan `isDefault`)
- [x] Ikon akun ditambahkan ke navbar publik (`/account`, middleware otomatis redirect ke login kalau belum masuk)

### Phase 10 — Voucher & Promo (fitur #10) ✅ selesai 21 Juli 2026
- [x] Model `Voucher` (`DiscountType`: PERCENTAGE/FIXED, `minOrder`, `validFrom`/`validUntil`, `usageLimit`/`usageCount`)
- [x] CRUD voucher di `/admin/vouchers` (pola sama dengan CRUD Produk/Testimoni)
- [x] Validasi kode voucher saat checkout (`checkVoucher` di `lib/actions/checkout.ts`) — cek aktif, tanggal berlaku, batas pemakaian, minimum order
- [x] Ditempatkan di alur checkout yang sama dengan Phase 5-7 (dibangun bareng dalam satu batch, bukan menyusul terpisah) — tetap **tidak blocking** checkout dasar, kolom voucher opsional

### Phase 11 — Analitik Penjualan Sederhana (fitur #14) ✅ selesai 21 Juli 2026
- [x] `lib/analytics.ts` (`getSalesSummary`) — total order & pendapatan hari ini/minggu ini/bulan ini, top 5 produk terlaris (agregat `OrderItem`), cuma menghitung order berstatus CONFIRMED/PROCESSING/COMPLETED (bukan yang masih PENDING/CANCELLED)
- [x] Ditambahkan ke `/admin` (dashboard home yang sudah ada dari Phase 3, diperluas — bukan halaman baru)
- [x] **Tidak tumpang tindih dengan Fase 3**: cuma statistik order/penjualan, tidak ada kalkulasi modal/biaya operasional/laba bersih — itu tetap di FASE 3 (Dashboard Keuangan) seperti rencana awal
- [ ] Grafik tren visual (opsional, belum dibangun — angka mentah dulu, cukup untuk kebutuhan saat ini)

### Phase 12 — Pemisahan Landing Page & Toko Online (Rombak Arsitektur) ✅ selesai 21 Juli 2026
- [x] **Perubahan arsitektur atas permintaan user**: landing page (marketing) dan pengalaman belanja (katalog, keranjang, checkout) dipisah jadi dua area halaman berbeda — sebelumnya katalog produk (`Menu`/`MenuGrid`) menyatu langsung di `app/page.tsx`, dianggap user bikin landing page "terlalu penuh" dan membingungkan pengunjung
- [x] `app/katalog/page.tsx` (baru) — entry point belanja: header toko (`MinimalHeader`, sekarang berisi logo + ikon akun + `CartButton`) + `MenuGrid` (tab kategori, tambah ke keranjang) → lanjut ke `/checkout` yang sudah ada
- [x] `components/sections/Menu.tsx` (server component lama yang fetch produk + render di landing page) dihapus, diganti `components/sections/MenuCta.tsx` — masih server component (fetch produk aktif dari database), tapi cuma tampilkan **preview visual non-interaktif**: satu produk representatif per kategori (gambar + nama + harga, tanpa tab kategori/tombol tambah-keranjang) supaya pengunjung tetap bisa lihat contoh menu di landing page tanpa halaman jadi penuh — diikuti tombol besar "Lihat Menu & Pesan" ke `/katalog` untuk katalog lengkap & interaktif (revisi setelah user minta gambar menu tetap tampil di landing page)
- [x] `components/ui/Navbar.tsx` (landing, publik): `CartButton` & ikon akun dihapus (belanja tidak lagi terjadi di landing page); item nav "Menu" sekarang mengarah ke `/katalog` (bukan scroll-anchor `#menu` — scroll-spy `IntersectionObserver` disesuaikan supaya tidak mencoba `querySelector` path non-anchor); tombol tunggal "Pesan Sekarang" dipecah jadi dua tombol terpisah — **"Pesan Online"** (→ `/katalog`, primary) dan **"Chat WhatsApp"** (link `wa.me` existing, secondary) — di desktop nav, mobile drawer, dan `StickyMobileCta`
- [x] `components/sections/Hero.tsx` — CTA "Lihat Menu" (`#menu`) & "Pesan Sekarang" (WA) diganti pola dua-tombol yang sama; copy basi "Sistem pemesanan online segera hadir" dihapus (online ordering sudah ada, bukan lagi "coming soon")
- [x] `components/ui/Footer.tsx` — link navigasi "Menu" diarahkan ke `/katalog`
- [x] `components/checkout/CheckoutForm.tsx` — redirect keranjang-kosong diubah dari `/#menu` (section yang sudah tidak ada) ke `/katalog`
- [x] Diverifikasi: `tsc --noEmit` & `next lint` bersih, smoke test status code semua rute kunci (`/`, `/katalog`, `/checkout`, `/account`, `/account/login`, `/account/register`) benar, konten `/katalog` (heading, produk) render tanpa error server

### Phase 13 — Testing & QA (sebagian — verifikasi manual di tangan user mulai sekarang)
- [x] `tsc --noEmit` dan `next lint` bersih di setiap tahap (Phase 4-11)
- [x] Smoke test dasar: server boot bersih tanpa error, route inti (`/`, `/checkout`, `/admin`, `/account`, `/admin/login`, `/account/login`, `/account/register`) merespons kode HTTP yang benar (200 untuk publik, 307 redirect untuk yang terproteksi tanpa sesi), konten dari database (produk/testimoni/dipercaya-oleh) terverifikasi tampil di homepage
- [ ] **(instruksi user, berlaku mulai sesi ini)**: verifikasi fitur secara penuh di browser (klik-per-klik alur order, admin CRUD, dst.) dilakukan oleh user sendiri, bukan lewat automation tool — lebih cepat, dan feedback datang langsung dari pengguna nyata alih-alih tool otomasi yang beberapa kali kena kendala teknis di sesi-sesi sebelumnya
- [ ] Test end-to-end alur order sungguhan: browse → keranjang → checkout (dengan penjadwalan & ongkir) → bayar (sandbox Midtrans, **butuh `MIDTRANS_SERVER_KEY`/`MIDTRANS_CLIENT_KEY` diisi dulu di `.env`**) → webhook update status → konfirmasi
- [ ] Test CRUD admin (produk, testimoni, dipercaya oleh, voucher, pengaturan)
- [ ] Security review: verifikasi signature webhook (sudah diimplementasi, perlu dites dengan transaksi sandbox asli), proteksi route admin/account, tidak ada data kartu tersimpan sendiri (PCI-DSS via Midtrans)
- [ ] Test responsive mobile untuk seluruh flow baru (checkout, keranjang, admin)

### Phase 13 — Deployment (dikerjakan setelah SEMUA kode Fase 1 + Fase 2 selesai, sesuai arahan user)
- [ ] Hosting final: **Vercel (app) + Neon (Postgres)** — konsisten dengan keputusan Phase 1
- [ ] Setup domain (masih pending dari Fase 1 — `.id`/`.co.id`/`.com`)
- [ ] Migrasi Midtrans dari sandbox ke production keys
- [ ] Environment secrets production (`DATABASE_URL`, `NEXTAUTH_SECRET`, Midtrans keys, Google Maps API key)
- [ ] Deploy Fase 1 (landing page, sekarang dengan katalog dinamis) + Fase 2 (ordering) sekaligus
- [ ] Final review bareng orang tua sebelum go-live

---

## Keputusan Arsitektur Fase 2 (final, dikonfirmasi 21 Juli 2026)

Fitur bernomor (#3, #10, #11, #12, #13, #14, #15) merujuk ke daftar referensi user di `taskplan-eco-rec.md` (sudah dihapus setelah direkonsiliasi ke sini — lihat Log Sesi Kerja).

| Keputusan | Pilihan | Alasan singkat |
|---|---|---|
| Hosting database | **Neon** (managed Postgres), Docker Compose untuk lokal/dev | Gratis untuk skala bisnis ini, nol maintenance server, dibanding VPS yang selalu ada biaya bulanan sejak hari pertama meski belum ada order |
| Auth pelanggan | **Guest checkout + opsional akun**, plus multi-alamat (#11) untuk yang punya akun | Checkout tetap cepat tanpa hambatan daftar, tapi pelanggan yang mau bisa daftar untuk riwayat order & alamat tersimpan |
| Notifikasi status order | **Link WhatsApp manual/semi-otomatis** (`wa.me` pre-filled) — fitur #15 (auto-notification API resmi) ditunda | Gratis, tidak perlu verifikasi Meta Business, cukup untuk volume order awal |
| Penjadwalan (#3) | Cutoff **H-1 jam 20.00 WIB** (default, admin-configurable), tanpa batas kapasitas harian | Cukup untuk mulai; kapasitas harian bisa ditambah nanti kalau memang jadi masalah nyata, bukan diasumsikan di awal |
| Pengiriman & ongkir (#13) | Antar sendiri dengan ongkir berbasis jarak — **implementasi: Haversine + Geolocation browser**, bukan Google Maps API (keputusan diambil saat implementasi, 21 Juli 2026) | Areska Kitchen memang mengantar ke pelanggan; jarak garis lurus + geolocation gratis bawaan browser cukup akurat untuk skala kota dan tidak butuh API key berbayar/billing account Google Cloud — Google Maps Distance Matrix tetap bisa jadi upgrade nanti kalau perlu akurasi jarak jalan |
| Review produk (#12) | **Ditunda**, tidak masuk Fase 2 | Fokus ke order flow inti dulu; ditambah setelah ada transaksi nyata untuk direview |
| Voucher/promo (#10) | Masuk rencana, setelah Payment (Phase 7) | Improvement, bukan blocking checkout dasar |
| Analitik (#14) | Statistik penjualan sederhana di Fase 2; laporan laba/rugi lengkap tetap Fase 3 | Menghindari duplikasi dengan Dashboard Keuangan yang sudah direncanakan terpisah |

## Checklist Input Klien Sebelum/Selama Fase 2

- [ ] Dokumen legal bisnis (NIB/NPWP) — kesiapan untuk verifikasi akun bisnis Midtrans
- [ ] **Kunci Midtrans sandbox** (`MIDTRANS_SERVER_KEY`/`MIDTRANS_CLIENT_KEY` di `web/.env`) — daftar gratis di dashboard.sandbox.midtrans.com (tidak butuh NIB/NPWP untuk sandbox), wajib diisi sebelum alur pembayaran bisa dites end-to-end
- [ ] Titik lokasi dapur/toko asli (koordinat lat/lng — sekarang masih default estimasi pusat kota Pangkalpinang), radius area layanan final, tarif ongkir/km final — diedit sendiri dari `/admin/settings`, tidak perlu minta tolong developer tiap kali berubah
- [ ] Konfirmasi jam cutoff pemesanan H-1 20.00 WIB — apakah sudah pas atau perlu disesuaikan (diedit dari `/admin/settings`, sudah admin-configurable)
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

**Lanjutan sesi yang sama — eksekusi Phase 1-3:** Setelah keputusan arsitektur dikonfirmasi (Neon + Docker lokal, guest+opsional akun, WA manual), Phase 1 (PostgreSQL + schema diperluas + seed), Phase 2 (autentikasi admin, NextAuth v4 JWT), dan Phase 3 (dashboard admin CRUD Produk/Testimoni/Dipercaya Oleh + list Order) diselesaikan dan di-push. Dua bug nyata ditemukan & diperbaiki lewat testing browser: (1) matcher middleware yang tidak melindungi path `/admin` polos, (2) scroll wheel di atas input harga yang sedang fokus mengubah nilainya tanpa sengaja.

**Rekonsiliasi dengan `taskplan-eco-rec.md`:** User punya dokumen rencana e-commerce sendiri (`taskplan-eco-rec.md`, ditulis manual bukan oleh Claude) sebagai referensi supaya fitur yang dibangun tepat sasaran. Fitur bernomor #3 (Scheduling, ditandai CRITICAL), #10 (Voucher/Promo), #11 (Multi-alamat), #12 (Review Produk), #13 (Ongkir & Maps), #14 (Analitik), #15 (WA Auto-Notification) didiskusikan satu-satu dan direkonsiliasi ke breakdown Fase 2 di atas (Phase 5-11 baru/diperluas) — detail keputusan tiap fitur ada di tabel "Keputusan Arsitektur Fase 2". Setelah disepakati, `taskplan-eco-rec.md` dihapus (isinya sudah sepenuhnya terserap ke sini).

**Perubahan cara kerja (instruksi user, berlaku ke depan):**
- Commit & push **tidak lagi per-Phase/per-section** — selesaikan dulu satu batch pekerjaan penuh, baru commit+push sekali di akhir.
- Verifikasi fitur di browser **dilakukan oleh user sendiri**, bukan lewat automation tool sesi ini — lebih cepat, dan feedback datang langsung dari pengguna nyata alih-alih automation yang beberapa kali kena kendala teknis (viewport berbeda antar-tab, dialog native yang nge-block, state HMR yang tidak stabil).

**Lanjutan sesi yang sama — eksekusi Phase 4-11 (satu batch penuh, sesuai instruksi baru):** Seluruh sisa Fase 2 (kecuali Testing manual & Deployment) diselesaikan dalam satu rangkaian tanpa commit/push di tengah jalan. Ringkasan per Phase ada di checklist masing-masing di atas; poin-poin penting:

- **Katalog & data**: `Menu`/`Testimonials`/`TrustedBy` dipecah jadi Server Component (fetch DB) + Client Component (interaktivitas) — pola ini dipakai konsisten di semua tempat yang butuh keduanya. Ketemu & perbaiki bug laten `next.config.mjs` (gambar eksternal dari admin bakal ditolak `next/image` tanpa `remotePatterns`).
- **Ongkir/Maps (#13)**: diimplementasi pakai Haversine + Geolocation browser (gratis, tanpa API key), bukan Google Maps Platform seperti draft awal — keputusan diambil saat implementasi karena Maps API butuh billing account Google Cloud, sementara kebutuhan sebenarnya (jarak + validasi area) bisa dipenuhi tanpa itu. Google Maps tetap terbuka sebagai upgrade nanti.
- **AppSetting baru**: model single-row untuk cutoff time, lokasi dapur, radius/tarif ongkir, dan toggle darurat checkout retail — semua bisa diedit dari `/admin/settings` tanpa deploy ulang, sesuai prinsip "admin-configurable, bukan hardcode" yang ditekankan user untuk fitur #3.
- **Auth diperluas ke pelanggan**: `middleware.ts` ditulis ulang total dari `withAuth` (next-auth bawaan) jadi middleware manual, karena perlu dua halaman login berbeda (`/admin/login` vs `/account/login`) yang tidak didukung `withAuth`.
- **Midtrans**: kode integrasi (Snap transaction, webhook dengan verifikasi signature) selesai dan siap, tapi belum bisa dites end-to-end karena `MIDTRANS_SERVER_KEY`/`MIDTRANS_CLIENT_KEY` di `.env` masih kosong — perlu akun sandbox dari user (gratis, tidak butuh NIB/NPWP untuk sandbox).
- **Verifikasi**: `tsc`/`lint` bersih di setiap tahap, plus smoke test dasar (server boot, kode HTTP route inti, konten DB tampil di homepage) — **klik-per-klik penuh sengaja tidak dilakukan**, sesuai instruksi baru user bahwa verifikasi fitur di browser jadi tanggung jawab user sendiri mulai sesi ini.

**Titik mulai sesi berikutnya:** Menunggu feedback user dari testing manual. Item yang masih butuh input klien sebelum bisa go-live: kunci Midtrans sandbox, koordinat lokasi dapur + radius + tarif ongkir asli (sekarang default estimasi), NIB/NPWP untuk Midtrans production, dan checklist lama dari Fase 1 (nomor WA asli, menu & harga final, dst.). Deployment (Phase 13) tetap menunggu sampai semua ini clear, sesuai arahan user di awal Fase 2.

### 21 Juli 2026 — Sesi 4 (Bug fix: drawer keranjang transparan + halaman baru tanpa navigasi)

User cek langsung di browser dan lapor "UI berantakan, problem sidebar seperti sebelumnya kembali terjadi". Dua bug nyata ditemukan & diperbaiki:

1. **Drawer keranjang transparan (regresi dari bug Phase 11)** — `CartButton` (baru di Phase 4-11, drawer `fixed` sendiri) ditaruh di dalam `<header>` yang punya `backdrop-blur` kondisional, containing-block bug yang persis sama dengan drawer navigasi mobile yang sudah diperbaiki sebelumnya. **Fix lebih general kali ini**: drawer & overlay `CartButton` di-render lewat `createPortal` langsung ke `document.body` (`components/cart/CartButton.tsx`) — bukan cuma dipindah jadi sibling seperti fix drawer navigasi, supaya kelas bug ini tidak bisa terulang lagi di manapun tombol keranjang ini nanti diletakkan ulang.
2. **Halaman checkout/order/account tanpa navigasi** — `/checkout`, `/order/[id]`, `/account`, `/account/login`, `/account/register` tidak pernah render `<Navbar>` publik (Navbar cuma ada di `app/page.tsx`, bukan root layout), jadi terasa terputus dari situs utama. Ditambah `components/ui/MinimalHeader.tsx` (logo + link ke beranda) ke semua halaman itu.
3. **Bug tambahan ditemukan saat verifikasi fix #2**: redirect keliru di halaman checkout — `CheckoutForm` cek `items.length === 0` untuk redirect balik ke menu, tapi `CartProvider` baru selesai baca localStorage secara *async* (`useEffect`), jadi pada render pertama `items` masih `[]` walau keranjang aslinya tidak kosong → race condition, checkout ke-redirect sebelum data sempat termuat. Fix: `CartProvider` sekarang expose `isHydrated`, redirect di `CheckoutForm` menunggu itu dulu sebelum menyimpulkan keranjang kosong (`lib/cart-context.tsx`, `components/checkout/CheckoutForm.tsx`).

Diverifikasi ulang di browser: drawer keranjang solid & berfungsi (tambah item, ubah qty, ke checkout), halaman checkout tampil lengkap dengan header + data keranjang benar tanpa redirect keliru, alur registrasi pelanggan end-to-end (daftar → auto-login → `/account` dengan riwayat pesanan & alamat) berhasil, drawer navigasi mobile (hamburger) dicek ulang tidak ikut regresi. `tsc`/`lint` bersih.

**Pelajaran ditambahkan ke catatan lama**: pola "pindahkan elemen `fixed` keluar dari ancestor ber-`backdrop-filter`" itu rapuh kalau elemennya banyak/akan bertambah — solusi yang lebih tahan lama adalah **portal ke `document.body`** untuk semua drawer/modal baru ke depannya, supaya tidak perlu diingat-ingat manual setiap kali menambah komponen baru.

---

*Update checklist ini secara berkala. Setiap Phase selesai → commit + note progress di sini.*
