import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TestimonialForm } from "@/components/admin/TestimonialForm";

export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
  const testimonial = await prisma.testimonial.findUnique({ where: { id: params.id } });
  if (!testimonial) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-green-700">Edit Testimoni</h1>
      <div className="mt-6">
        <TestimonialForm testimonial={testimonial} />
      </div>
    </div>
  );
}
