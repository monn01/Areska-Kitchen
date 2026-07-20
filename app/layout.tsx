import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Areska Kitchen — Catering Rumahan Pangkalpinang | a taste of home",
    template: "%s | Areska Kitchen",
  },
  description:
    "Areska Kitchen adalah layanan catering rumahan di Pangkalpinang, Bangka Belitung sejak 2019. Menyediakan nasi kotak, prasmanan, snack box, dan pempek untuk acara instansi, sekolah, dan masyarakat umum.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-sans bg-cream-100 text-green-700 antialiased">
        {children}
      </body>
    </html>
  );
}
