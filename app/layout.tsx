import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { LOCAL_BUSINESS, SITE_NAME, SITE_URL } from "@/lib/site-config";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Areska Kitchen — Catering Rumahan Pangkalpinang | a taste of home",
    template: "%s | Areska Kitchen",
  },
  description: LOCAL_BUSINESS.description,
  keywords: [
    "catering Pangkalpinang",
    "nasi kotak Bangka Belitung",
    "catering rumahan Pangkalpinang",
    "prasmanan Pangkalpinang",
    "snack box Bangka Belitung",
    "pempek Bangka",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Areska Kitchen — Catering Rumahan Pangkalpinang",
    description: LOCAL_BUSINESS.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Areska Kitchen — Catering Rumahan Pangkalpinang",
    description: LOCAL_BUSINESS.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: LOCAL_BUSINESS.name,
  description: LOCAL_BUSINESS.description,
  telephone: LOCAL_BUSINESS.telephone,
  priceRange: LOCAL_BUSINESS.priceRange,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  address: {
    "@type": "PostalAddress",
    streetAddress: LOCAL_BUSINESS.streetAddress,
    addressLocality: LOCAL_BUSINESS.addressLocality,
    addressRegion: LOCAL_BUSINESS.addressRegion,
    postalCode: LOCAL_BUSINESS.postalCode,
    addressCountry: LOCAL_BUSINESS.addressCountry,
  },
  servesCuisine: "Indonesian",
  openingHours: LOCAL_BUSINESS.openingHours,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </body>
    </html>
  );
}
