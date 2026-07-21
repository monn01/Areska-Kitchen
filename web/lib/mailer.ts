/**
 * Pengiriman email lewat Resend (REST API langsung, tanpa SDK tambahan) — dipakai untuk
 * link reset password. Kalau RESEND_API_KEY belum diisi di .env (belum daftar Resend),
 * link cuma dicatat ke log server sebagai fallback dev, bukan gagal total — pola yang sama
 * seperti kunci sandbox Midtrans: kode selesai, tinggal isi API key sebelum go-live.
 */
export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL ?? "Areska Kitchen <no-reply@areskakitchen.local>";

  if (!apiKey) {
    console.log(
      `[mailer] RESEND_API_KEY belum diisi — link reset password untuk ${to}:\n${resetUrl}`,
    );
    return { sent: false as const };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject: "Reset Password Akun Areska Kitchen",
      html: `
        <p>Halo,</p>
        <p>Kami menerima permintaan reset password untuk akun Areska Kitchen Anda.</p>
        <p><a href="${resetUrl}">Klik di sini untuk atur ulang password</a> (berlaku 30 menit).</p>
        <p>Kalau Anda tidak meminta ini, abaikan saja email ini.</p>
      `,
    }),
  });

  if (!res.ok) {
    console.error(`[mailer] Gagal kirim email lewat Resend (${res.status})`, await res.text());
    return { sent: false as const };
  }

  return { sent: true as const };
}
