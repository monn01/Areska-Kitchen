"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Clock, Send } from "lucide-react";
import { businessInfo } from "@/lib/data";
import { buildWhatsAppLink, cn } from "@/lib/utils";

function FloatingInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  invalid,
  as,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  invalid: boolean;
  as?: "textarea";
}) {
  const sharedClasses = cn(
    "peer w-full rounded-xl border bg-cream-50 px-4 pt-6 pb-2 text-green-700 placeholder-transparent transition-colors duration-fast focus:outline-none focus:ring-2 focus:ring-orange-300",
    invalid ? "border-[#B3432E]" : "border-green-200 focus:border-green-500",
  );

  return (
    <div className="relative">
      {as === "textarea" ? (
        <textarea
          id={id}
          placeholder={label}
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={cn(sharedClasses, "resize-none")}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={sharedClasses}
        />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-2 text-xs font-medium text-green-700 transition-all duration-fast peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-green-600 peer-focus:top-2 peer-focus:text-xs peer-focus:text-green-600"
      >
        {label}
      </label>
      {invalid && (
        <p className="mt-1 text-xs text-[#B3432E]">Mohon isi {label.toLowerCase()}.</p>
      )}
    </div>
  );
}

export function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [touched, setTouched] = useState({ name: false, phone: false, message: false });

  const invalid = {
    name: touched.name && form.name.trim() === "",
    phone: touched.phone && form.phone.trim() === "",
    message: touched.message && form.message.trim() === "",
  };

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched({ name: true, phone: true, message: true });
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) return;

    const message = `Halo Areska Kitchen, saya ${form.name} (${form.phone}).\n\n${form.message}`;
    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
  }

  return (
    <section id="kontak" className="bg-cream-50 py-20 sm:py-28">
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-500">
            Kontak
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-green-700 sm:text-4xl">
            Hubungi Kami
          </h2>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-green-600" strokeWidth={1.5} />
                <p className="text-green-700/80">{businessInfo.address}</p>
              </div>
              <div className="flex gap-3">
                <Clock className="h-5 w-5 shrink-0 text-green-600" strokeWidth={1.5} />
                <p className="text-green-700/80">{businessInfo.operationalHours}</p>
              </div>
            </div>

            <motion.div
              initial={shouldReduceMotion ? undefined : { opacity: 0 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="mt-6 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-green-100 sm:aspect-video"
            >
              <iframe
                src={businessInfo.mapsEmbedSrc}
                loading="lazy"
                title="Lokasi Areska Kitchen"
                className="h-full w-full"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <FloatingInput
              id="name"
              label="Nama Anda"
              value={form.name}
              onChange={(v) => setForm((f) => ({ ...f, name: v }))}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              invalid={invalid.name}
            />
            <FloatingInput
              id="phone"
              label="Nomor WhatsApp"
              type="tel"
              value={form.phone}
              onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
              onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
              invalid={invalid.phone}
            />
            <FloatingInput
              id="message"
              label="Pesan / Kebutuhan Acara"
              as="textarea"
              value={form.message}
              onChange={(v) => setForm((f) => ({ ...f, message: v }))}
              onBlur={() => setTouched((t) => ({ ...t, message: true }))}
              invalid={invalid.message}
            />
            <button
              type="submit"
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 font-semibold text-green-900 transition-colors duration-fast hover:bg-orange-600 sm:w-auto"
            >
              <Send className="h-4 w-4" strokeWidth={1.5} />
              Kirim via WhatsApp
            </button>
            <p className="text-xs text-green-700/80">
              Pesan akan diteruskan ke WhatsApp Business kami — belum ada
              pengiriman otomatis di Fase 1.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
