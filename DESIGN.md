# DESIGN.md — Areska Kitchen Digital Platform

| | |
|---|---|
| **Versi** | 1.0 |
| **Tanggal** | 20 Juli 2026 |
| **Referensi** | `PRD.md` v1.0 (§9 Brand Identity, §6 Fase 1, §7 Fase 2, §8 Fase 3), `TASKPLAN.md` v1.0 (Phase 2–7), `gambar-ref/logo.png`, `gambar-ref/Mockup.png` |
| **Fokus dokumen ini** | Spesifikasi desain & interaksi. Landing Page + E-commerce = **experiential** (motion, scroll effect). Dashboard Admin = **clarity-first** (kontrol, minim distraksi). |
| **Status** | Draft — siap dipakai sebagai acuan Phase 2 (Design System) di TASKPLAN |

---

## 1. Prinsip Desain

Dua mode desain berbeda dalam satu design system, karena audiens dan tujuannya berbeda:

| Mode | Berlaku untuk | Prinsip |
|---|---|---|
| **Experiential** | Landing Page (Fase 1), E-commerce (Fase 2) | Hangat, storytelling, scroll terasa hidup — tapi tetap cepat & tidak norak. Target: instansi/corporate, sekolah, masyarakat umum. |
| **Clarity-first** | Dashboard Admin (Fase 3) | Statis, jelas, minim animasi. Target: **orang tua/owner tanpa background teknis-akuntansi** — angka harus langsung "kebaca", bukan "keren". |

Prinsip lintas-mode (berlaku di semua fase, dari PRD §9 & §12):
- **Homemade, bukan korporat-dingin** — hangat, personal, meski klien mencakup instansi pemerintah.
- **Mobile-first** — mayoritas traffic F&B lokal dari HP.
- **Performa di atas dekorasi** — semua efek visual wajib lolos budget performa di §11 sebelum dianggap "selesai".
- **`prefers-reduced-motion` dihormati di semua efek** — bukan opsional.

---

## 2. Brand Foundation

### 2.1 Sumber

Diturunkan langsung dari `gambar-ref/logo.png` (5 varian: horizontal, icon-only, monochrome, black, white) dan `gambar-ref/Mockup.png` (preview layout desktop & mobile). Hex final harus diambil ulang dari source file vector logo (Illustrator/Figma asli) — nilai di bawah adalah estimasi visual yang cukup akurat untuk mulai development (sama seperti catatan PRD §9).

### 2.2 Palet Warna — Token Skala Penuh

Base color mengikuti PRD §9. Skala tint/shade di bawah dibuat supaya UI (termasuk dashboard) punya cukup variasi kontras tanpa keluar dari identitas brand.

```css
:root {
  /* Primary — Hijau Tua (navbar, heading, tombol secondary, sidebar dashboard) */
  --green-50:  #EAF2EE;
  --green-100: #CFE3D8;
  --green-200: #A3C9B4;
  --green-300: #74AC90;
  --green-400: #4C8E72;
  --green-500: #2C6E52;
  --green-600: #1F4D3A; /* brand primary — dari logo */
  --green-700: #173B2C;
  --green-800: #10291F;
  --green-900: #0A1B14;

  /* Accent — Oranye/Gold (CTA utama, highlight tagline, status "perlu perhatian") */
  --orange-50:  #FDF3E7;
  --orange-100: #FAE3C4;
  --orange-200: #F4CB93;
  --orange-300: #EDB868;
  --orange-400: #E6AD56;
  --orange-500: #E0A24B; /* brand accent — dari logo */
  --orange-600: #C4842F;
  --orange-700: #9C6825;

  /* Background — Krem/Off-white (landing & e-commerce base) */
  --cream-50:  #FDFBF7;
  --cream-100: #F5EEE0; /* brand background */
  --cream-200: #EDE2CC;
  --cream-300: #E2D3B3;

  /* Neutral — khusus dipakai di Dashboard Admin, BUKAN turunan krem
     (krem terlalu hangat untuk teks data-dense → kontras kurang tajam) */
  --slate-50:  #F8FAFA;
  --slate-100: #EEF1F0;
  --slate-300: #C4CCC9;
  --slate-500: #6B7876;
  --slate-700: #3A4442;
  --slate-900: #1A211F;

  /* Semantik status — khusus Dashboard Admin (Fase 3) */
  --status-profit:  var(--green-600);   /* laba positif */
  --status-loss:    #B3432E;            /* laba negatif / rugi — merah bata, senada bukan merah alarm */
  --status-pending: var(--orange-500);  /* order/transaksi belum final */
  --status-neutral: var(--slate-500);
}
```

**Kontras (aksesibilitas, PRD §12):** `--green-600` di atas `--cream-100` = kontras tinggi (aman untuk body text). `--orange-500` di atas `--cream-100` **tidak cukup kontras untuk teks kecil** — oranye hanya untuk elemen besar (tombol CTA solid dengan teks putih, ikon, aksen), tidak pernah untuk paragraf.

### 2.3 Tipografi

| Peran | Font | Alasan |
|---|---|---|
| **Heading (landing & e-commerce)** | `Fraunces` (fallback: `Lora`, serif) | Serif dengan karakter hangat/artisanal, senada dengan serif di logotype "Areska Kitchen", lebih personal dibanding Playfair yang cenderung mewah-formal. |
| **Body & UI (semua fase)** | `Inter` | Netral, sangat legible di ukuran kecil, punya tabular figures — penting untuk angka di Dashboard Admin. |
| **Tagline/label bertema** ("a taste of home") | `Inter`, `tracking-[0.25em]`, uppercase/small-caps | Meniru wide letter-spacing di tagline logo. Dipakai terbatas: tagline, eyebrow label section, badge — **tidak untuk body text panjang**. |
| **Angka besar (Dashboard Admin)** | `Inter`, `font-variant-numeric: tabular-nums`, weight 600–700 | Supaya kolom angka rapi sejajar dan mudah dipindai cepat oleh non-akuntan. |

Skala tipografi (mobile-first, `rem`):

```css
--text-xs: 0.75rem;   --text-sm: 0.875rem;  --text-base: 1rem;
--text-lg: 1.125rem;  --text-xl: 1.25rem;   --text-2xl: 1.5rem;
--text-3xl: 1.875rem; --text-4xl: 2.25rem;  --text-5xl: 3rem;
--text-6xl: 3.75rem; /* hero headline desktop */
```

### 2.4 Logo & Ikonografi

- Gunakan varian sesuai konteks: horizontal di navbar (desktop), icon-only di navbar mobile/favicon, monochrome di atas foto/background gelap, black/white version untuk dokumen atau kondisi kontras ekstrem — semua sudah final (PRD §9.1), tidak perlu didesain ulang.
- Ikon fitur (Trust Indicators: Masakan Rumahan, Bahan Berkualitas, Higienis & Bersih, Dibuat dengan Cinta) mengikuti gaya **outline, stroke 1.5px, rounded joins** seperti terlihat di `Mockup.png` — bukan filled/solid, supaya terasa ringan dan homey, bukan korporat.

---

## 3. Motion System (dipakai Landing + E-commerce)

> Dashboard Admin **tidak memakai sistem motion ini** — lihat §6 untuk aturan motion versi dashboard yang jauh lebih minim.

### 3.1 Prinsip Motion

1. Motion punya fungsi (mengarahkan perhatian, memberi feedback, menyampaikan hierarki) — bukan dekorasi kosong.
2. Durasi pendek, easing natural. Tidak ada animasi yang menghalangi user membaca/scroll lebih dari sepersekian detik.
3. Selalu ada fallback statis via `prefers-reduced-motion: reduce`.

### 3.2 Token Motion

```css
--ease-out:    cubic-bezier(0.16, 1, 0.3, 1);   /* reveal, entrance */
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);  /* transisi antar state */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* micro-interaction, tombol */

--duration-fast: 150ms;   /* hover, tap feedback */
--duration-base: 300ms;   /* transisi komponen */
--duration-slow: 600ms;   /* scroll reveal per elemen */
--duration-hero: 900ms;   /* entrance hero saat page load */
```

### 3.3 Stack Teknis yang Direkomendasikan

| Kebutuhan | Library | Catatan |
|---|---|---|
| Scroll-reveal, entrance animation, micro-interaction | **Framer Motion** | Native React, integrasi mulus dengan Next.js 14 App Router. |
| Scroll-triggered sequence kompleks (pin section, timeline) | **GSAP + ScrollTrigger** | Dipakai selektif — hanya jika Framer Motion `whileInView` tidak cukup (mis. Hero parallax multi-layer). |
| Smooth scroll (opsional, desktop only) | **Lenis** | Jangan aktifkan di mobile — bisa mengganggu native scroll & aksesibilitas. |
| Reduced-motion guard | `useReducedMotion()` (Framer Motion) / CSS media query | Wajib dicek sebelum setiap animasi non-esensial dijalankan. |

---

## 4. Landing Page (Fase 1) — Spesifikasi Interaksi per Section

Mengikuti struktur `PRD.md §6.1` dan `TASKPLAN.md` Phase 3–7. Setiap section di bawah = 1 task build di taskplan.

### 4.1 Navbar (sticky)
- **Default state:** transparan/menyatu dengan background krem, logo horizontal ukuran penuh.
- **Scroll state (>80px):** navbar menyusut (`height` 88px → 64px), background jadi solid `--cream-50` + `backdrop-blur`, shadow tipis muncul. Transisi `--duration-base`, `--ease-in-out`.
- Tombol "Pesan Sekarang" tetap oranye solid, sedikit mengecil mengikuti navbar tapi tetap ukuran tap target ≥44px (aturan §11).
- Mobile: hamburger menu → drawer slide-in dari kanan, backdrop fade, item menu stagger fade-in (`--duration-fast` per item, delay 40ms bertahap).

### 4.2 Hero Section
- Entrance saat load: headline fade-up + stagger (headline → sub-headline → dual CTA → gambar produk), total durasi `--duration-hero`.
- **Parallax ringan** pada foto nasi kotak: bergerak lebih lambat dari teks saat scroll (translateY rasio ~0.15), memberi kedalaman tanpa lebay. Nonaktif di mobile (device sempit, parallax sering ganggu bukan menambah).
- Badge bulat "Homemade with Love" (terlihat di `Mockup.png`, overlap di foto): subtle idle animation — scale 1 → 1.03 loop lambat (4s, ease-in-out) supaya terasa "hidup" tanpa mengganggu.
- Dual CTA: "Lihat Menu" (secondary, outline hijau) → smooth-scroll ke section Menu. "Pesan Sekarang" (primary, oranye) → magnetic hover effect halus (tombol sedikit "menarik" ke posisi cursor, radius efek kecil, desktop only).

### 4.3 Trust Indicators (4 ikon)
- Scroll-reveal staggered: 4 ikon fade-up satu per satu (delay 100ms antar ikon) saat section masuk viewport (`whileInView`, threshold 30%).
- Hover per ikon (desktop): ikon sedikit naik (`translateY(-4px)`) + warna stroke berubah dari hijau ke oranye, `--duration-fast`.

### 4.4 Tentang Kami
- Teks dan gambar reveal dengan clip-path/mask wipe halus (bukan fade polos) saat scroll masuk — memberi kesan "cerita terbuka", cocok dengan tone homey/personal.

### 4.5 Dipercaya Oleh *(section rekomendasi PRD §6.1.5)*
- Logo instansi/sekolah ditampilkan sebagai **marquee/infinite scroll strip** horizontal (auto-scroll pelan, pause on hover) — solusi elegan kalau jumlah logo berubah-ubah/bertambah, dan terasa "credible" tanpa perlu grid statis kaku.
- Grayscale default, warna penuh saat hover (menandakan interaktif meski tidak clickable, cukup untuk engagement visual).
- **Catatan compliance:** section ini baru tampil setelah izin resmi logo instansi didapat (lihat PRD §6.3, §16.1) — sampai saat itu, fallback ke teks testimoni institusi tanpa logo.

### 4.6 Menu/Produk
- Tab kategori (Nasi Kotak, Prasmanan, Snack Box, Pempek & Lainnya) dengan **underline indicator yang slide** mengikuti tab aktif (`layoutId` Framer Motion untuk transisi mulus antar tab).
- Ganti kategori → grid produk transisi dengan **FLIP animation** (card lama fade-out+scale-down, card baru fade-in+scale-up, staggered), bukan hard-switch — ini titik interaksi paling sering disentuh user, jadi prioritas polish tertinggi di Fase 1.
- Product card hover (desktop): image sedikit zoom (`scale(1.05)`), shadow naik, harga & CTA singkat muncul dari bawah card.
- Fallback foto (kalau foto asli belum ada dari klien, PRD §6.3): skeleton shimmer placeholder dengan watermark subtle "Foto segera hadir" — bukan broken image icon.

### 4.7 Testimoni
- Carousel/slider dengan **scroll-snap native** (bukan library berat) + drag-swipe di mobile, autoplay lambat (6s/slide), pause on interaction.
- Kutipan muncul dengan fade+slight scale saat jadi slide aktif, dot indicator di bawah.

### 4.8 Kontak/Footer
- Google Maps embed reveal dengan fade-in saat scroll masuk (lazy-load iframe, jangan load di awal — berat untuk performance budget §11).
- Form kontak: input field dengan floating label transisi halus, validasi inline realtime (border merah lembut, bukan alert box).

### 4.9 CTA "Pesan Sekarang" → WhatsApp (TASKPLAN Phase 7)
- Klik memicu micro-interaction confirm (ikon check singkat / ripple) sebelum redirect ke `wa.me` dengan pre-filled message — memberi user kepastian aksi terekam sebelum berpindah app.
- Sticky mobile CTA bar (muncul setelah scroll melewati Hero, hilang saat mendekati Footer) — pattern umum F&B mobile commerce, memudahkan konversi kapan pun user siap.

---

## 5. E-commerce / Ordering (Fase 2) — Spesifikasi Interaksi

Baseline dari `PRD.md §7`. Mode masih **experiential** (sama DNA dengan landing page) tapi fungsional untuk transaksi — motion tidak boleh menghalangi kecepatan checkout.

| Komponen | Interaksi |
|---|---|
| **Katalog produk dinamis** | Filter/kategori sama seperti §4.6, ditambah search-as-you-type dengan debounce + skeleton loading state. |
| **Quick View produk** | Modal scale+fade dari card yang diklik (shared-element transition, `layoutId`), bukan modal generik muncul di tengah — terasa lebih terhubung ke aksi user. |
| **Keranjang (cart)** | Drawer slide-in dari kanan + backdrop blur. Tambah item → mini "flying icon" singkat dari tombol ke ikon cart (feedback visual, opsional tapi disukai user F&B/retail). Badge jumlah item pada ikon cart animasi bounce singkat tiap update. |
| **Checkout** | Stepper horizontal (Info → Pembayaran → Konfirmasi) dengan progress bar animated fill antar step. Form tetap statis/minim motion di bagian input — kecepatan & kejelasan lebih penting daripada gaya di titik pembayaran. |
| **Order khusus (prasmanan/event besar)** | Alur terpisah dari retail (PRD §7) — beri visual cue jelas (banner/label berbeda warna, misal accent oranye + copy "Perlu konfirmasi admin") supaya user tidak bingung kenapa tidak langsung checkout seperti nasi kotak. |
| **Payment gateway (Midtrans Snap)** | Gunakan Snap overlay bawaan Midtrans — jangan override styling terlalu jauh (risiko trust & PCI-DSS UX pattern yang sudah dikenal user Indonesia). |
| **Status tracking pesanan** | Timeline vertikal (pending → dikonfirmasi → diproses → selesai) dengan step aktif ter-highlight hijau + animasi draw-in garis penghubung saat status berubah (realtime via polling/websocket). |
| **Notifikasi status order** | Toast slide-in dari atas/bawah, auto-dismiss, warna sesuai status (`--status-pending` / `--status-profit` untuk selesai). |
| **Skeleton loading** | Dipakai konsisten di semua area async (katalog, cart, status order) — shimmer effect halus, bukan spinner generik, supaya perceived performance tetap tinggi. |

---

## 6. Dashboard Admin — Keuangan (Fase 3) — Clarity-First

> **Ini bukan "landing page versi admin".** Target user (PRD §4, §12): **orang tua Jaee, tanpa background teknis/akuntansi.** Prioritas mutlak: kejelasan baca, bukan keindahan visual. Kegagalan di sini = orang tua tidak bisa generate laporan sendiri (kriteria sukses PRD §13 Fase 3).

### 6.1 Aturan Motion di Dashboard (sangat dibatasi)

| Boleh | Tidak boleh |
|---|---|
| Fade-in singkat (150ms) saat data pertama kali dimuat | Scroll-reveal, parallax, marquee |
| Angka "count-up" **satu kali** saat kartu KPI pertama kali render (maks 500ms) | Count-up berulang tiap kali user scroll melewati kartu |
| Chart draw-in **satu kali** saat load (maks 600ms), lalu diam | Animasi loop/idle pada elemen data |
| Skeleton loading saat fetch data | Transisi halaman yang menunda tampilnya angka |
| Highlight singkat (background flash 300ms) saat 1 angka berubah akibat aksi user (mis. baru input biaya operasional) | Efek hover dekoratif pada kartu angka (hover boleh, tapi hanya elevasi shadow tipis, bukan scale/rotate) |

Alasan: setiap animasi ekstra = potensi *"kenapa angkanya bergerak-gerak?"* dari user non-teknis. Motion di dashboard hanya untuk **mengonfirmasi** perubahan data, bukan hiburan visual.

### 6.2 Layout Prinsip

- **Sidebar kiri statis** (bukan hamburger — orang tua perlu semua menu terlihat langsung tanpa perlu tahu ikon hamburger berarti "menu"). Label teks lengkap di sidebar, bukan cuma ikon.
- **KPI cards di baris atas** (di atas fold, tanpa scroll): Modal, Laba Kotor, Laba Bersih — 3 angka terpenting versi PRD §8 langsung terlihat begitu dashboard dibuka.
- Angka besar, **tabular-nums, weight 700**, warna semantik (`--status-profit` untuk positif, `--status-loss` untuk negatif) — **selalu disertai label teks penuh** di bawah angka ("Laba Bersih Bulan Ini"), tidak pernah hanya ikon/simbol tanpa teks.
- Setiap istilah teknis (HPP, laba bruto, laba bersih) **wajib ada tooltip/keterangan singkat berbahasa awam** saat hover/tap ikon info kecil di sebelah label — PRD §12 eksplisit: "minim jargon".
- Grafik: **line chart tren pendapatan** dan **bar chart produk terlaris** saja (PRD §8) — dua tipe chart maksimal di halaman utama, jangan tambah chart lain tanpa alasan kuat. Gunakan library chart sederhana (Recharts) dengan label sumbu jelas, tanpa legenda rumit.
- Warna chart: hijau untuk tren naik/positif, merah-bata (`--status-loss`) untuk turun — konsisten dengan kartu KPI, supaya user tidak perlu belajar mapping warna baru per komponen.
- **Export PDF/Excel** (PRD §8): tombol besar, jelas, selalu terlihat di pojok kanan atas panel laporan — bukan disembunyikan di menu titik-tiga.
- Kontras teks: gunakan skala `--slate-*` (§2.2), **bukan** `--cream-*` — krem terlalu lembut untuk teks angka finansial yang harus terbaca cepat dan akurat.
- Density sedang: cukup padat untuk efisiensi (ini alat kerja harian), tapi tetap ada whitespace jelas antar kartu/section supaya tidak terasa seperti spreadsheet mentah.
- Tap target besar (≥48px) dan font dasar tidak lebih kecil dari `--text-base` (16px) di seluruh dashboard — antisipasi user lanjut usia.

### 6.3 Validasi

Sesuai PRD §13 Fase 3 dan TASKPLAN roadmap Fase 3 item terakhir ("User testing langsung dengan orang tua") — dashboard **wajib** diuji langsung dengan owner sebelum dianggap selesai. Kriteria lolos: orang tua bisa generate laporan laba bersih bulanan **tanpa bantuan Jaee**.

---

## 7. Komponen Bersama (Design System Inti)

Mengacu TASKPLAN Phase 2. Semua komponen dipakai lintas landing/e-commerce; varian khusus dashboard dicatat terpisah.

| Komponen | Varian | Catatan motion |
|---|---|---|
| `Button` | Primary (oranye solid), Secondary (outline hijau), Ghost (dashboard-only, minim style) | Primary/Secondary: hover lift halus + magnetic (landing/e-commerce). Ghost (dashboard): hover hanya ubah background, tanpa transform. |
| `Card` | Menu item, Testimoni, **KPI (dashboard)** | Card menu/testimoni: hover elevasi + scale kecil. Card KPI: hover **hanya** shadow, tidak scale (§6.1). |
| `Badge` | Feature icon (Homemade, dll), Status order (pending/diproses/selesai — e-commerce), Status finansial (profit/loss — dashboard) | Badge status pakai warna semantik §2.2 konsisten di e-commerce & dashboard. |
| `Navbar` (landing) vs `Sidebar` (dashboard) | Terpisah total secara komponen — jangan reuse struktur yang sama, karena kebutuhan interaksi bertolak belakang (§4.1 vs §6.2). |
| `Footer` | Landing only | — |

---

## 8. Responsive Breakpoints

```css
/* Mobile-first — sesuai 2 versi mockup (desktop & mobile) di Mockup.png */
--bp-sm: 640px;   /* large phone */
--bp-md: 768px;   /* tablet */
--bp-lg: 1024px;  /* small desktop / dashboard minimum */
--bp-xl: 1280px;  /* desktop */
```

- Landing & e-commerce: didesain mobile-first murni, breakpoint di atas progressive enhancement.
- Dashboard Admin: **prioritas desktop/tablet** (owner kemungkinan besar akses dari laptop/tablet saat rekap keuangan) — tapi tetap harus tidak rusak di `--bp-lg` minimum. Tidak perlu dioptimasi seagresif landing page untuk layar <768px.

---

## 9. Aksesibilitas & Guardrail Performa

Menegaskan & memperluas PRD §12:

- Semua animasi non-esensial wajib punya guard `prefers-reduced-motion`.
- Kontras warna: body text minimal WCAG AA (4.5:1). Oranye di atas krem tidak lolos untuk teks kecil (§2.2) — hindari kombinasi ini untuk paragraf.
- Alt text wajib di semua gambar produk (PRD §12) — termasuk gambar yang dipakai dalam scroll-reveal/parallax.
- Budget performa: Lighthouse ≥90 (PRD §12) tetap berlaku **meski dengan semua motion di atas** — artinya:
  - Animasi via CSS transform/opacity saja (GPU-accelerated), hindari animasi yang trigger layout/repaint.
  - Library motion (Framer Motion/GSAP) di-load sebagai client component saja, tidak membebani initial SSR payload Next.js.
  - Marquee logo instansi (§4.5) dan efek berat lain: lazy-mount, hanya aktif setelah section masuk viewport.
- Dashboard: karena prioritasnya clarity bukan visual richness, budget performanya justru lebih longgar untuk motion (nyaris tidak ada) tapi lebih ketat untuk **akurasi & kecepatan render data** (angka finansial harus tampil benar, bukan sekadar cepat).

---

## 10. Peta Referensi ke Dokumen Lain

| Bagian DESIGN.md | Terkait dengan |
|---|---|
| §2 Brand Foundation | PRD §9, `gambar-ref/logo.png` |
| §4 Landing Page | PRD §6, TASKPLAN Phase 2–7 |
| §5 E-commerce | PRD §7, TASKPLAN Fase 2 roadmap |
| §6 Dashboard Admin | PRD §8, §12, §13 Fase 3; TASKPLAN Fase 3 roadmap |
| §9 Aksesibilitas | PRD §12 Non-Functional Requirements |

*Dokumen ini living document — update tiap ada perubahan scope, sinkron dengan versi PRD.md dan TASKPLAN.md.*
