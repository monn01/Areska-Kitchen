"use client";

import { useEffect, useRef, useState } from "react";
import { Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function onScroll() {
      if (!track) return;
      const index = Math.round(track.scrollLeft / track.clientWidth);
      setActive(index);
    }
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (pausedRef.current) return;
      const track = trackRef.current;
      if (!track) return;
      const nextIndex = (Math.round(track.scrollLeft / track.clientWidth) + 1) % testimonials.length;
      track.scrollTo({ left: nextIndex * track.clientWidth, behavior: "smooth" });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  function goTo(index: number) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: index * track.clientWidth, behavior: "smooth" });
  }

  return (
    <section id="testimoni" className="bg-cream-100 py-20 sm:py-28">
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
            Testimoni
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-green-700 sm:text-4xl">
            Apa Kata Pelanggan Kami
          </h2>
        </div>

        <div
          ref={trackRef}
          onPointerDown={() => (pausedRef.current = true)}
          onPointerUp={() => (pausedRef.current = false)}
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
          className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="flex w-full shrink-0 snap-center justify-center px-2"
            >
              <div className="max-w-2xl rounded-3xl bg-cream-50 p-8 text-center shadow-[0_8px_30px_rgba(31,77,58,0.08)] sm:p-12">
                <Quote className="mx-auto h-8 w-8 text-orange-400" strokeWidth={1.5} />
                <p className="mt-4 font-heading text-xl italic leading-relaxed text-green-700 sm:text-2xl">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="mt-6 font-semibold text-green-700">{t.name}</p>
                <p className="text-sm text-green-700/60">{t.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              aria-label={`Lihat testimoni ${i + 1}`}
              onClick={() => goTo(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-base",
                i === active ? "w-6 bg-orange-500" : "w-2 bg-green-200 hover:bg-green-300",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
