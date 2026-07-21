import Link from "next/link";
import { MinimalHeader } from "@/components/ui/MinimalHeader";
import { businessInfo } from "@/lib/data";
import { WHATSAPP_NUMBER } from "@/lib/utils";

export const metadata = {
  title: "Kebijakan Layanan — Areska Kitchen",
  description: "Syarat & Ketentuan serta Kebijakan Privasi Areska Kitchen.",
};

export default function KebijakanLayananPage() {
  return (
    <div className="min-h-screen bg-cream-100">
      <MinimalHeader />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <h1 className="font-heading text-3xl font-semibold text-green-700">
          Kebijakan Layanan
        </h1>
        <p className="mt-2 text-sm text-green-700/60">
          Terakhir diperbarui: 21 Juli 2026
        </p>

        <nav className="mt-6 flex gap-4 text-sm font-medium">
          <a href="#syarat-ketentuan" className="text-green-600 hover:underline">
            Syarat & Ketentuan
          </a>
          <a href="#kebijakan-privasi" className="text-green-600 hover:underline">
            Kebijakan Privasi
          </a>
        </nav>

        <section id="syarat-ketentuan" className="mt-10 space-y-4 text-green-700/90">
          <h2 className="font-heading text-2xl font-semibold text-green-700">
            Syarat & Ketentuan
          </h2>

          <h3 className="font-semibold text-green-700">1. Tentang Layanan</h3>
          <p>
            {businessInfo.name} adalah usaha katering rumahan yang menyediakan nasi kotak,
            paket prasmanan, snack box, dan pempek untuk acara pribadi maupun instansi di
            wilayah Pangkalpinang dan sekitarnya. Pemesanan dapat dilakukan melalui katalog
            online di situs ini atau langsung lewat WhatsApp.
          </p>

          <h3 className="font-semibold text-green-700">2. Akun Pelanggan</h3>
          <p>
            Sebagian fitur (riwayat pesanan, alamat tersimpan, checkout online) mengharuskan
            Anda membuat akun. Anda bertanggung jawab menjaga kerahasiaan password akun Anda.
            Informasi yang Anda daftarkan (nama, email dan/atau nomor WhatsApp) harus akurat,
            supaya kami bisa menghubungi Anda terkait pesanan.
          </p>

          <h3 className="font-semibold text-green-700">3. Pemesanan & Penjadwalan</h3>
          <p>
            Pesanan untuk keesokan hari harus masuk sebelum pukul 20.00 WIB hari yang sama
            (batas waktu ini bisa berubah, akan diinformasikan di halaman checkout). Harga
            yang tercantum di katalog sudah final di luar ongkos kirim; ongkir dihitung
            berdasarkan estimasi jarak dari dapur kami ke lokasi pengantaran. Untuk pesanan
            acara/prasmanan dalam jumlah besar, tim kami akan menghubungi Anda untuk
            konfirmasi sebelum pembayaran diproses.
          </p>

          <h3 className="font-semibold text-green-700">4. Pembayaran</h3>
          <p>
            Pembayaran online diproses melalui Midtrans, penyedia payment gateway pihak
            ketiga berlisensi Bank Indonesia. Kami tidak pernah menyimpan data kartu
            pembayaran Anda di server kami sendiri — seluruh data sensitif pembayaran
            ditangani langsung oleh Midtrans.
          </p>

          <h3 className="font-semibold text-green-700">5. Pembatalan</h3>
          <p>
            Pembatalan pesanan yang sudah dikonfirmasi dapat dilakukan dengan menghubungi
            kami lewat WhatsApp sesegera mungkin. Karena bahan makanan disiapkan sesuai
            jadwal, pembatalan mendadak (kurang dari beberapa jam sebelum waktu pengantaran)
            mungkin tidak bisa direfund penuh — akan dikonfirmasikan kasus per kasus.
          </p>

          <h3 className="font-semibold text-green-700">6. Perubahan Ketentuan</h3>
          <p>
            Kami dapat memperbarui Syarat & Ketentuan ini sewaktu-waktu. Perubahan akan
            ditampilkan di halaman ini dengan tanggal pembaruan terbaru.
          </p>
        </section>

        <section id="kebijakan-privasi" className="mt-12 space-y-4 text-green-700/90">
          <h2 className="font-heading text-2xl font-semibold text-green-700">
            Kebijakan Privasi
          </h2>

          <h3 className="font-semibold text-green-700">1. Data yang Kami Kumpulkan</h3>
          <p>
            Saat Anda membuat akun atau melakukan pemesanan, kami mengumpulkan: nama, alamat
            email dan/atau nomor WhatsApp, alamat pengantaran (termasuk titik lokasi jika
            Anda mengizinkan akses lokasi browser), riwayat pesanan, dan — jika Anda daftar
            lewat Google — nama dan email dari akun Google Anda. Keranjang belanja disimpan
            sementara di penyimpanan lokal peramban Anda (localStorage), bukan di server
            kami, sampai Anda checkout.
          </p>

          <h3 className="font-semibold text-green-700">2. Penggunaan Data</h3>
          <p>
            Data di atas kami gunakan untuk: memproses & mengantarkan pesanan Anda,
            menghitung estimasi ongkos kirim, mengirim notifikasi status pesanan lewat
            WhatsApp, dan menyimpan riwayat pesanan/alamat supaya checkout berikutnya lebih
            cepat. Kami tidak menjual data Anda ke pihak ketiga mana pun.
          </p>

          <h3 className="font-semibold text-green-700">3. Pihak Ketiga</h3>
          <p>
            Data pembayaran diproses oleh Midtrans (payment gateway). Jika Anda masuk/daftar
            lewat Google, autentikasi ditangani oleh Google — kami hanya menerima nama dan
            email dasar dari akun Anda, tidak pernah melihat password Google Anda.
          </p>

          <h3 className="font-semibold text-green-700">4. Hak Anda</h3>
          <p>
            Anda berhak meminta salinan data Anda, memperbarui, atau menghapus akun Anda
            kapan saja dengan menghubungi kami lewat WhatsApp di{" "}
            <Link
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline"
            >
              +{WHATSAPP_NUMBER}
            </Link>
            .
          </p>

          <h3 className="font-semibold text-green-700">5. Keamanan</h3>
          <p>
            Password akun disimpan dalam bentuk hash (tidak pernah sebagai teks biasa).
            Kami menggunakan koneksi terenkripsi (HTTPS) untuk seluruh komunikasi antara
            peramban Anda dan server kami.
          </p>
        </section>
      </div>
    </div>
  );
}
