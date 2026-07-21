import { prisma } from "@/lib/prisma";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";

export async function Testimonials() {
  const testimonials = await prisma.testimonial.findMany({
    where: { isFeatured: true },
    orderBy: { createdAt: "desc" },
  });

  if (testimonials.length === 0) return null;

  return (
    <section id="testimoni" className="bg-cream-100 py-20 sm:py-28">
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-down" className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-500">
            Testimoni
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-green-700 sm:text-4xl">
            Apa Kata Pelanggan Kami
          </h2>
        </ScrollReveal>

        <ScrollReveal variant="scale" delay={0.1}>
          <TestimonialsCarousel testimonials={testimonials} />
        </ScrollReveal>
      </div>
    </section>
  );
}
