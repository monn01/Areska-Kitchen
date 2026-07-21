import Image from "next/image";
import { MapPin, Clock, Phone } from "lucide-react";
import { businessInfo } from "@/lib/data";
import { buildWhatsAppLink, DEFAULT_WA_MESSAGE, WHATSAPP_NUMBER } from "@/lib/utils";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-green-700 text-cream-50">
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="relative block h-9 w-9 shrink-0 overflow-hidden rounded-full">
                <Image
                  src="/logo/logo-monochrome.png"
                  alt="Areska Kitchen"
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </span>
              <span className="font-heading text-lg font-semibold">Areska Kitchen</span>
            </div>
            <p className="text-sm uppercase tracking-[0.25em] text-orange-300">
              a taste of home
            </p>
            <p className="mt-4 text-sm text-cream-100/80 leading-relaxed">
              Catering rumahan Pangkalpinang sejak 2019 — nasi kotak, prasmanan,
              snack box, dan pempek untuk setiap acara Anda.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-cream-100/70">
              Navigasi
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                ["Beranda", "#beranda"],
                ["Menu", "#menu"],
                ["Tentang Kami", "#tentang-kami"],
                ["Testimoni", "#testimoni"],
                ["Kontak", "#kontak"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="text-cream-100/80 hover:text-orange-300 transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-cream-100/70">
              Kontak
            </h3>
            <ul className="space-y-3 text-sm text-cream-100/80">
              <li className="flex gap-2">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" strokeWidth={1.5} />
                <span>{businessInfo.address}</span>
              </li>
              <li className="flex gap-2">
                <Clock className="h-4 w-4 shrink-0 mt-0.5" strokeWidth={1.5} />
                <span>{businessInfo.operationalHours}</span>
              </li>
              <li className="flex gap-2">
                <Phone className="h-4 w-4 shrink-0 mt-0.5" strokeWidth={1.5} />
                <a
                  href={buildWhatsAppLink(DEFAULT_WA_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-300 transition-colors"
                >
                  +{WHATSAPP_NUMBER}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-cream-100/70">
              Ikuti Kami
            </h3>
            <a
              href={businessInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-cream-100/80 hover:text-orange-300 transition-colors"
            >
              <InstagramIcon className="h-4 w-4" />
              @areskakitchen
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-cream-50/15 pt-6 text-xs text-cream-100/60 flex flex-col sm:flex-row justify-between gap-2">
          <p>&copy; {new Date().getFullYear()} Areska Kitchen. Semua hak dilindungi.</p>
          <p>Pangkalpinang, Kepulauan Bangka Belitung</p>
        </div>
      </div>
    </footer>
  );
}
