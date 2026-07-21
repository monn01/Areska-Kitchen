import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { deleteTestimonial } from "@/lib/actions/testimonials";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function TestimonialsAdminPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold text-green-700">Testimoni</h1>
        <Link
          href="/admin/testimonials/new"
          className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-green-900 hover:bg-orange-600"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          Tambah Testimoni
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="flex items-start justify-between gap-4 rounded-2xl bg-cream-50 p-5 shadow-[0_2px_12px_rgba(31,77,58,0.08)]"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-green-700">{t.name}</p>
                {t.role && <p className="text-sm text-green-700/60">— {t.role}</p>}
                {!t.isFeatured && (
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
                    Disembunyikan
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm italic text-green-700/80">&ldquo;{t.quote}&rdquo;</p>
            </div>
            <div className="flex shrink-0 items-center gap-4">
              <Link
                href={`/admin/testimonials/${t.id}`}
                className="flex items-center gap-1 text-sm font-medium text-green-600 hover:underline"
              >
                <Pencil className="h-3.5 w-3.5" strokeWidth={2} />
                Edit
              </Link>
              <DeleteButton
                action={deleteTestimonial.bind(null, t.id)}
                confirmMessage={`Hapus testimoni dari "${t.name}"?`}
              />
            </div>
          </div>
        ))}
        {testimonials.length === 0 && (
          <p className="rounded-2xl bg-cream-50 p-8 text-center text-green-700/60 shadow-[0_2px_12px_rgba(31,77,58,0.08)]">
            Belum ada testimoni.
          </p>
        )}
      </div>
    </div>
  );
}
