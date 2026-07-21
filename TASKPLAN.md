# TASKPLAN — Areska Kitchen Digital Platform

| | |
|---|---|
| **Versi** | 1.0 |
| **Tanggal** | 20 Juli 2026 |
| **Referensi** | PRD.md v1.0 |
| **Fokus dokumen ini** | Detail eksekusi **Fase 1 (Landing Page)**. Fase 2 & 3 masih high-level, akan di-breakdown ulang saat gilirannya tiba. |

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

## FASE 2: E-COMMERCE/ORDERING — Roadmap High-Level

*(Detail task breakdown menyusul setelah Fase 1 live & stabil)*

- [ ] Setup autentikasi (NextAuth/Auth.js) — admin & pelanggan
- [ ] Migrasi katalog produk dari statis (Fase 1) ke dinamis (CRUD admin)
- [ ] Build cart & checkout flow
- [ ] Integrasi Midtrans (Snap API)
- [ ] Flow order khusus untuk prasmanan/event besar (butuh konfirmasi manual sebelum bayar)
- [ ] Sistem status order (pending → dikonfirmasi → diproses → selesai)
- [ ] Notifikasi status order (WhatsApp API/email)
- [ ] Verifikasi bisnis untuk payment gateway (cek kesiapan NIB/NPWP)

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

---

*Update checklist ini secara berkala. Setiap Phase selesai → commit + note progress di sini.*
