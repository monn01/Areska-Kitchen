"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/Button";
import {
  createTestimonial,
  updateTestimonial,
  type TestimonialFormState,
} from "@/lib/actions/testimonials";
import type { Testimonial } from "@prisma/client";

const inputClass =
  "w-full rounded-xl border border-green-200 bg-cream-50 px-4 py-2.5 text-green-700 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-orange-300";
const labelClass = "mb-1.5 block text-sm font-medium text-green-700";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="primary" disabled={pending}>
      {pending ? "Menyimpan..." : label}
    </Button>
  );
}

export function TestimonialForm({ testimonial }: { testimonial?: Testimonial }) {
  const action = testimonial ? updateTestimonial.bind(null, testimonial.id) : createTestimonial;
  const [state, formAction] = useFormState<TestimonialFormState, FormData>(action, {});

  return (
    <form action={formAction} className="max-w-lg space-y-4">
      <div>
        <label htmlFor="name" className={labelClass}>
          Nama
        </label>
        <input id="name" name="name" defaultValue={testimonial?.name} required className={inputClass} />
      </div>

      <div>
        <label htmlFor="role" className={labelClass}>
          Peran / Instansi (opsional)
        </label>
        <input id="role" name="role" defaultValue={testimonial?.role ?? ""} className={inputClass} />
      </div>

      <div>
        <label htmlFor="quote" className={labelClass}>
          Kutipan
        </label>
        <textarea
          id="quote"
          name="quote"
          defaultValue={testimonial?.quote}
          required
          rows={4}
          className={inputClass}
        />
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-green-700">
        <input
          type="checkbox"
          name="isFeatured"
          defaultChecked={testimonial?.isFeatured ?? true}
          className="h-4 w-4 rounded border-green-300 text-green-600 focus:ring-orange-300"
        />
        Tampilkan di landing page
      </label>

      {state.error && <p className="text-sm text-[#B3432E]">{state.error}</p>}

      <SubmitButton label={testimonial ? "Simpan Perubahan" : "Tambah Testimoni"} />
    </form>
  );
}
