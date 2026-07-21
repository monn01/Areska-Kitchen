import { prisma } from "@/lib/prisma";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MarqueeRow } from "@/components/sections/TrustedByMarquee";

export async function TrustedBy() {
  const clients = await prisma.client.findMany({
    where: { isVisible: true },
    orderBy: { name: "asc" },
  });

  if (clients.length === 0) return null;

  const row1 = clients.filter((c) => c.row === 1);
  const row2 = clients.filter((c) => c.row === 2);

  return (
    <section className="bg-green-50/60 py-16 sm:py-20">
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-down" className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-500">
            Dipercaya Oleh
          </p>
          <h2 className="mt-3 font-heading text-2xl font-semibold text-green-700 sm:text-3xl">
            Instansi, Sekolah, dan Masyarakat Umum
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-green-700/70">
            Areska Kitchen telah melayani berbagai jenis acara di Pangkalpinang
            dan sekitarnya — dari jamuan resmi hingga acara keluarga.
          </p>
        </ScrollReveal>

        <div className="mt-10 space-y-6 sm:space-y-8">
          {row1.length > 0 && (
            <ScrollReveal variant="scale" delay={0.05}>
              <MarqueeRow brands={row1} direction="left" />
            </ScrollReveal>
          )}
          {row2.length > 0 && (
            <ScrollReveal variant="scale" delay={0.1}>
              <MarqueeRow brands={row2} direction="right" />
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  );
}
