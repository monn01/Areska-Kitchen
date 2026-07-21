"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

const testimonialSchema = z.object({
  name: z.string().trim().min(1, "Nama wajib diisi"),
  role: z.string().trim().optional().or(z.literal("")),
  quote: z.string().trim().min(1, "Kutipan wajib diisi"),
  isFeatured: z.coerce.boolean(),
});

export type TestimonialFormState = { error?: string };

export async function createTestimonial(
  _prevState: TestimonialFormState,
  formData: FormData,
): Promise<TestimonialFormState> {
  await requireAdmin();

  const parsed = testimonialSchema.safeParse({
    name: formData.get("name"),
    role: formData.get("role"),
    quote: formData.get("quote"),
    isFeatured: formData.get("isFeatured") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid" };
  }

  await prisma.testimonial.create({ data: { ...parsed.data, role: parsed.data.role || null } });

  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(
  id: string,
  _prevState: TestimonialFormState,
  formData: FormData,
): Promise<TestimonialFormState> {
  await requireAdmin();

  const parsed = testimonialSchema.safeParse({
    name: formData.get("name"),
    role: formData.get("role"),
    quote: formData.get("quote"),
    isFeatured: formData.get("isFeatured") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid" };
  }

  await prisma.testimonial.update({
    where: { id },
    data: { ...parsed.data, role: parsed.data.role || null },
  });

  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  await requireAdmin();
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/admin/testimonials");
}
